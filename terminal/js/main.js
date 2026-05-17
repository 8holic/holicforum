// ==================================================================
// main.js – case selection via password (SHA‑256) with named steps
// ==================================================================

let currentSession = null;
let currentStepId = null;          // string key, e.g. "step_1"
let waitingForQuestion = false;
let currentExpectedHash = null;
let currentQuestionSender = null;
let currentQuestionRank = null;

let messageQueue = Promise.resolve();
let caseSelected = false;

const chatLogDiv = document.getElementById('chatLog');
const playerInput = document.getElementById('playerInput');
const sendBtn = document.getElementById('sendBtn');
const loadedSessions = {};

// ---------- helpers ----------
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function addPost(sender, content, rank = null, delayMs = 0, isImage = false, imgSrc = null, imgAlt = '') {
  messageQueue = messageQueue.then(() => new Promise((resolve) => {
    const showPost = () => {
      const postDiv = document.createElement('div');
      postDiv.className = `post ${sender === 'You' ? 'player' : ''}`;
      let authorHtml = `<div class="post-author"><div class="name">${escapeHtml(sender)}</div>`;
      if (sender !== 'You') {
        const displayRank = rank || '';
        authorHtml += `<div class="rank">${escapeHtml(displayRank)}</div>`;
      }
      authorHtml += `</div>`;
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
      }
      resolve();
    };
    if (delayMs > 0) {
      playerInput.disabled = true;
      sendBtn.disabled = true;
      setTimeout(showPost, delayMs);
    } else {
      showPost();
    }
  }));
  return messageQueue;
}

function addMessage(sender, text, rank, delayMs) {
  return addPost(sender, text, rank, delayMs, false);
}
function addImage(sender, src, alt, rank, delayMs) {
  return addPost(sender, '', rank, delayMs, true, src, alt);
}

// ---------- Session loading ----------
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

function startSession(caseId) {
  const caseItem = window.casesRegistry.find(c => c.id === caseId);
  if (!caseItem) return;
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
  currentStepId = currentSession.start;
  waitingForQuestion = false;
  currentExpectedHash = null;
  currentQuestionSender = null;
  currentQuestionRank = null;
  playerInput.disabled = false;
  sendBtn.disabled = false;
  advance();
}

// ---------- Step processing (using named steps) ----------
function advance() {
  while (currentStepId && currentSession.steps[currentStepId]) {
    const step = currentSession.steps[currentStepId];
    if (step.type === 'message') {
      const delay = step.delay || 0;
      const sender = step.sender || 'Admin';
      const rank = step.rank || null;
      addMessage(sender, step.text, rank, delay).then(() => {
        // Go to next step (could be a string or fallback to a default)
        currentStepId = step.next || null;
        advance();
      });
      return;
    } else if (step.type === 'image') {
      const delay = step.delay || 0;
      const sender = step.sender || 'Admin';
      const rank = step.rank || null;
      addImage(sender, step.src, step.alt, rank, delay).then(() => {
        currentStepId = step.next || null;
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
      break;  // stop advancing until user answers
    } else {
      console.error('Unknown step type:', step.type);
      break;
    }
  }
  if (!currentStepId) {
    // end of session
    waitingForQuestion = false;
    currentExpectedHash = null;
    currentQuestionSender = null;
    currentQuestionRank = null;
    playerInput.disabled = false;
    sendBtn.disabled = false;
  }
}

// ---------- Answer handling (with named branches) ----------
async function handleAnswer(answer) {
  if (!waitingForQuestion) {
    addMessage(currentQuestionSender || 'Admin', 'No question active. Please continue.', currentQuestionRank);
    return;
  }
  const step = currentSession.steps[currentStepId];
  const normalized = answer.trim().toLowerCase();
  addMessage('You', escapeHtml(answer), null, 0);

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
    const targetStepId = step.branches[computedHash];
    if (targetStepId !== undefined) {
      currentStepId = targetStepId;
      waitingForQuestion = false;
      currentExpectedHash = null;
      currentQuestionSender = null;
      currentQuestionRank = null;
      advance();
      return;
    } else {
      const failMsg = step.failMessage || 'Code not recognized.';
      addMessage(currentQuestionSender || 'Admin', failMsg, currentQuestionRank);
      return;
    }
  }

  // Simple hash check (single correct answer)
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
    const nextId = step.successNext || step.next || null;
    currentStepId = nextId;
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

// ---------- Case selection – password only ----------
async function trySelectCase(input) {
  const trimmed = input.trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(trimmed);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const computedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  const matched = window.casesRegistry.find(c => c.passwordHash === computedHash);
  if (matched) {
    caseSelected = true;
    document.querySelector('.session-bar').innerHTML = '<label>Session: ' + matched.name + '</label>';
    startSession(matched.id);
  } else {
    addMessage('Admin', 'Invalid code. Try again.');
  }
}

// ---------- Send button ----------
sendBtn.addEventListener('click', () => {
  const text = playerInput.value.trim();
  if (!text) return;
  playerInput.value = '';

  if (!caseSelected) {
    trySelectCase(text);
    return;
  }

  if (waitingForQuestion) {
    handleAnswer(text);
  } else {
    addMessage(currentQuestionSender || 'Admin', 'No question active right now.', currentQuestionRank);
  }
});

playerInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});

// ---------- Init ----------
addMessage('Terminal', `RESTRICTED INTERFACE<br>
Activity on this terminal is logged.<br>
Proceed only if authorized.
For New User Enter:setup`, null, 0);
addMessage('Terminal', 'Enter authorization:', null, 1500).then(() => {
  playerInput.disabled = false;
  sendBtn.disabled = false;
});