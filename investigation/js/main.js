// Shared chat logic – forum‑style posts, SHA‑256 answers, delays

let currentSession = null;
let currentStepIndex = 0;
let waitingForQuestion = false;
let currentExpectedHash = null;
let currentQuestionSender = null;
let currentQuestionRank = null;

let messageQueue = Promise.resolve();

const chatLogDiv = document.getElementById('chatLog');
const playerInput = document.getElementById('playerInput');
const sendBtn = document.getElementById('sendBtn');
const sessionSelect = document.getElementById('sessionSelect');
const unlockBtn = document.getElementById('unlockBtn');
const casePassword = document.getElementById('casePassword');
const unlockStatus = document.getElementById('unlockStatus');

const loadedSessions = {};

// Helper: escape HTML only for author name/rank, not for message content (which may contain links)
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// ------------------------------------------------------------------
// UI: Build dropdown from casesRegistry
// ------------------------------------------------------------------
function buildDropdown() {
  sessionSelect.innerHTML = '';
  window.casesRegistry.forEach(caseItem => {
    const option = document.createElement('option');
    option.value = caseItem.id;
    if (caseItem.requiresUnlock && !loadedSessions[caseItem.id]) {
      option.disabled = true;
      option.textContent = `🔒 ${caseItem.name} (locked)`;
    } else {
      option.disabled = false;
      option.textContent = caseItem.name;
    }
    sessionSelect.appendChild(option);
  });
}

// ------------------------------------------------------------------
// Append a forum‑style post (two columns) with optional rank and delay
// ------------------------------------------------------------------
function addPost(sender, content, rank = null, delayMs = 0, isImage = false, imgSrc = null, imgAlt = '') {
  messageQueue = messageQueue.then(() => new Promise((resolve) => {
    const showPost = () => {
      const postDiv = document.createElement('div');
      postDiv.className = `post ${sender === 'You' ? 'player' : ''}`;

      // Build author column
      let authorHtml = `<div class="post-author"><div class="name">${escapeHtml(sender)}</div>`;
      if (sender !== 'You') {
        const displayRank = rank || 'Member';
        authorHtml += `<div class="rank">${escapeHtml(displayRank)}</div>`;
      }
      authorHtml += `</div>`;

      // Build content column
      let contentHtml = `<div class="post-content"><div class="bubble">`;
      if (isImage) {
        contentHtml += `<img src="${imgSrc}" alt="${escapeHtml(imgAlt)}" style="max-width: 100%; border-radius: 8px;">`;
      } else {
        contentHtml += content;
      }
      contentHtml += `</div></div>`;

      postDiv.innerHTML = authorHtml + contentHtml;
      chatLogDiv.appendChild(postDiv);
      chatLogDiv.scrollTop = chatLogDiv.scrollHeight;

      if (waitingForQuestion) {
        playerInput.disabled = false;
        sendBtn.disabled = false;
        sessionSelect.disabled = false; 
      }
      resolve();
    };

    if (delayMs > 0) {
      playerInput.disabled = true;
      sendBtn.disabled = true;
      sessionSelect.disabled = true; 
      setTimeout(showPost, delayMs);
    } else {
      showPost();
    }
  }));
  return messageQueue;
}

// Convenience wrappers
function addMessage(sender, text, rank, delayMs) {
  return addPost(sender, text, rank, delayMs, false);
}
function addImage(sender, src, alt, rank, delayMs) {
  return addPost(sender, '', rank, delayMs, true, src, alt);
}

// ------------------------------------------------------------------
// Session loading & unlocking
// ------------------------------------------------------------------
function loadSessionFile(caseId, callback) {
  const caseItem = window.casesRegistry.find(c => c.id === caseId);
  if (!caseItem) {
    callback(new Error('Case not found'));
    return;
  }
  if (loadedSessions[caseId]) {
    callback(null, loadedSessions[caseId]);
    return;
  }
  const script = document.createElement('script');
  script.src = caseItem.sessionFile;
  script.onload = () => {
    const sessionObj = window[`${caseId}Session`];
    if (sessionObj) {
      loadedSessions[caseId] = sessionObj;
      callback(null, sessionObj);
    } else {
      callback(new Error('Session object not found'));
    }
  };
  script.onerror = () => callback(new Error('Failed to load'));
  document.head.appendChild(script);
}

async function unlockCase(caseId, password) {
  const caseItem = window.casesRegistry.find(c => c.id === caseId);
  if (!caseItem) return false;
  if (!caseItem.requiresUnlock) return true;
  if (!caseItem.passwordHash) return false;
  const normalized = password.trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return computedHash === caseItem.passwordHash;
}

function startSession(caseId) {
  const caseItem = window.casesRegistry.find(c => c.id === caseId);
  if (!caseItem) return;
  if (caseItem.requiresUnlock && !loadedSessions[caseId]) {
    unlockStatus.innerText = 'This case requires a password. Enter it above and click Unlock.';
    return;
  }
  if (!loadedSessions[caseId]) {
    loadSessionFile(caseId, (err, session) => {
      if (err) {
        addMessage('Admin', `Error loading case: ${err.message}`);
        return;
      }
      currentSession = session;
      resetChat();
    });
  } else {
    currentSession = loadedSessions[caseId];
    resetChat();
  }
}

function resetChat() {
  messageQueue = Promise.resolve();
  chatLogDiv.innerHTML = '';
  currentStepIndex = 0;
  waitingForQuestion = false;
  currentExpectedHash = null;
  currentQuestionSender = null;
  currentQuestionRank = null;
  playerInput.disabled = false;
  sendBtn.disabled = false;
  sessionSelect.disabled = false; 
  advance();
}

// ------------------------------------------------------------------
// Step processing with delays
// ------------------------------------------------------------------
function advance() {
  while (currentStepIndex < currentSession.steps.length) {
    const step = currentSession.steps[currentStepIndex];
    if (step.type === 'message') {
      const delay = step.delay || 0;
      const sender = step.sender || 'Admin';
      const rank = step.rank || null;
      addMessage(sender, step.text, rank, delay).then(() => {
        currentStepIndex = step.nextStepIndex !== undefined ? step.nextStepIndex : currentStepIndex + 1;
        advance();
      });
      return;
    } else if (step.type === 'image') {
      const delay = step.delay || 0;
      const sender = step.sender || 'Admin';
      const rank = step.rank || null;
      addImage(sender, step.src, step.alt, rank, delay).then(() => {
        currentStepIndex++;
        advance();
      });
      return;
    } else if (step.type === 'question') {
      waitingForQuestion = true;
      currentExpectedHash = step.hash;
      currentQuestionSender = step.sender || 'Admin';
      currentQuestionRank = step.rank || null;
      const delay = step.delay || 0;
      addMessage(currentQuestionSender, step.question, currentQuestionRank, delay).then(() => {
        playerInput.disabled = false;
        sendBtn.disabled = false;
      });
      break;
    }
  }
  if (currentStepIndex >= currentSession.steps.length) {
    waitingForQuestion = false;
    currentExpectedHash = null;
    currentQuestionSender = null;
    currentQuestionRank = null;
    playerInput.disabled = false;
    sendBtn.disabled = false;
  }
}

// ------------------------------------------------------------------
// Answer handling (no success message, optional wrong-message mapping)
// ------------------------------------------------------------------
async function handleAnswer(answer) {
  if (!waitingForQuestion) {
    addMessage(currentQuestionSender || 'Admin', 'No question active. Please continue.', currentQuestionRank);
    return;
  }
  const step = currentSession.steps[currentStepIndex];
  const normalized = answer.trim().toLowerCase();

  // Show player's answer
  addMessage('You', escapeHtml(answer), null, 0);

  // ========== NEW: Branching support (multiple answers, each jumps to different step) ==========
  if (step.branches) {
    let computedHash = null;
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(normalized);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (err) {
      addMessage(currentQuestionSender || 'Admin', `Error: ${err.message}`, currentQuestionRank);
      return;
    }
    const targetStepIndex = step.branches[computedHash];
    if (targetStepIndex !== undefined) {
      // Jump to the target step (could be a feedback message that returns later)
      currentStepIndex = targetStepIndex;
      waitingForQuestion = false;
      currentExpectedHash = null;
      currentQuestionSender = null;
      currentQuestionRank = null;
      advance();
      return;
    } else {
      // No matching branch – show fail message and stay on same step
      const failMsg = step.failMessage || 'Code not recognized.';
      addMessage(currentQuestionSender || 'Admin', failMsg, currentQuestionRank);
      return;
    }
  }
  // ========== End of branching support ==========

  // Original single‑hash logic (unchanged)
  let isCorrect = false;
  let computedHash = null;
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    isCorrect = (computedHash === step.hash);
  } catch (err) {
    addMessage(currentQuestionSender || 'Admin', `Error: ${err.message}`, currentQuestionRank);
    return;
  }

  if (isCorrect) {
    const nextIndex = step.successNextStepIndex || currentStepIndex + 1;
    currentStepIndex = nextIndex;
    waitingForQuestion = false;
    currentExpectedHash = null;
    currentQuestionSender = null;
    currentQuestionRank = null;
    advance();
  } else {
    let failMsg = step.failMessage || 'Incorrect. Try again.';
    if (step.wrongMessages && step.wrongMessages[computedHash]) {
      failMsg = step.wrongMessages[computedHash];
    }
    addMessage(currentQuestionSender || 'Admin', failMsg, currentQuestionRank);
  }
}
// ------------------------------------------------------------------
// Event listeners
// ------------------------------------------------------------------
sendBtn.addEventListener('click', () => {
  const text = playerInput.value.trim();
  if (!text) return;
  playerInput.value = '';
  if (waitingForQuestion) {
    handleAnswer(text);
  } else {
    addMessage(currentQuestionSender || 'Admin', 'No question active right now.', currentQuestionRank);
  }
});

playerInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});

sessionSelect.addEventListener('change', (e) => {
  startSession(e.target.value);
});

unlockBtn.addEventListener('click', async () => {
  const selectedId = sessionSelect.value;
  const caseItem = window.casesRegistry.find(c => c.id === selectedId);
  if (!caseItem) return;
  if (!caseItem.requiresUnlock) {
    unlockStatus.innerText = 'This case does not need a password.';
    return;
  }
  const pwd = casePassword.value.trim();
  if (await unlockCase(selectedId, pwd)) {
    loadSessionFile(selectedId, (err, session) => {
      if (err) {
        unlockStatus.innerText = `Error: ${err.message}`;
        return;
      }
      unlockStatus.innerText = '✅ Case unlocked!';
      unlockStatus.style.color = '#aaffaa';
      const option = sessionSelect.querySelector(`option[value="${selectedId}"]`);
      option.disabled = false;
      option.textContent = caseItem.name;
      startSession(selectedId);
    });
  } else {
    unlockStatus.innerText = 'Wrong password.';
    unlockStatus.style.color = '#ffaaaa';
    setTimeout(() => { unlockStatus.innerText = ''; }, 2000);
  }
});

// ------------------------------------------------------------------
// Initialise
// ------------------------------------------------------------------
buildDropdown();
startSession('demo');