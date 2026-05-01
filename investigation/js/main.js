// Shared chat logic – works with any session defined in cases.js

let currentSession = null;
let currentStepIndex = 0;
let waitingForQuestion = false;
let currentAnswer = null;

const chatLogDiv = document.getElementById('chatLog');
const playerInput = document.getElementById('playerInput');
const sendBtn = document.getElementById('sendBtn');
const sessionSelect = document.getElementById('sessionSelect');
const unlockBtn = document.getElementById('unlockBtn');
const casePassword = document.getElementById('casePassword');
const unlockStatus = document.getElementById('unlockStatus');

// Map to store loaded session objects
const loadedSessions = {};

// Populate dropdown from casesRegistry
function buildDropdown() {
  sessionSelect.innerHTML = '';
  window.casesRegistry.forEach(caseItem => {
    const option = document.createElement('option');
    option.value = caseItem.id;
    // If password required and not yet unlocked, show as locked
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

// Load a session's JS file dynamically
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
    // Assuming the session file sets window[caseId + 'Session']
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

// Unlock a case by password
function unlockCase(caseId, password) {
  const caseItem = window.casesRegistry.find(c => c.id === caseId);
  if (!caseItem) return false;
  if (!caseItem.requiresUnlock) return true; // already unlocked
  if (caseItem.password === password) {
    return true;
  }
  return false;
}

// Load and start a session (if unlocked or no password)
function startSession(caseId) {
  const caseItem = window.casesRegistry.find(c => c.id === caseId);
  if (!caseItem) return;
  
  // If requires unlock and not yet loaded, need to unlock first
  if (caseItem.requiresUnlock && !loadedSessions[caseId]) {
    unlockStatus.innerText = 'This case requires a password. Enter it above and click Unlock.';
    return;
  }
  
  if (!loadedSessions[caseId]) {
    // Load it (for cases without password)
    loadSessionFile(caseId, (err, session) => {
      if (err) {
        addMessage('System', `Error loading case: ${err.message}`);
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
  currentStepIndex = 0;
  waitingForQuestion = false;
  currentAnswer = null;
  chatLogDiv.innerHTML = '';
  playerInput.disabled = false;
  sendBtn.disabled = false;
  advance();
}

// --- Chat functions (same as before, but addImage etc. included) ---
function addMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender === 'Admin' ? 'admin' : (sender === 'You' ? 'player' : 'system')}`;
  msgDiv.innerHTML = `<div class="sender">${sender}</div><div class="bubble">${text}</div>`;
  chatLogDiv.appendChild(msgDiv);
  chatLogDiv.scrollTop = chatLogDiv.scrollHeight;
}

function addImage(sender, src, alt) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender === 'Admin' ? 'admin' : 'player'}`;
  msgDiv.innerHTML = `<div class="sender">${sender}</div><div class="bubble"><img src="${src}" alt="${alt}" style="max-width: 100%; border-radius: 8px;"></div>`;
  chatLogDiv.appendChild(msgDiv);
  chatLogDiv.scrollTop = chatLogDiv.scrollHeight;
}

function renderCurrentStep() {
  chatLogDiv.innerHTML = '';
  for (let i = 0; i <= currentStepIndex; i++) {
    const step = currentSession.steps[i];
    if (!step) continue;
    if (step.type === 'message') {
      addMessage(step.sender, step.text);
    } else if (step.type === 'question') {
      if (i === currentStepIndex && waitingForQuestion) {
        addMessage('Admin', step.question);
      }
    } else if (step.type === 'image') {
      addImage(step.sender, step.src, step.alt);
    }
  }
}

function advance() {
  while (currentStepIndex < currentSession.steps.length) {
    const step = currentSession.steps[currentStepIndex];
    if (step.type === 'message') {
      addMessage(step.sender, step.text);
      currentStepIndex++;
    } else if (step.type === 'question') {
      waitingForQuestion = true;
      currentAnswer = step.answer;
      addMessage('Admin', step.question);
      break;
    } else if (step.type === 'image') {
      addImage(step.sender, step.src, step.alt);
      currentStepIndex++;
    }
  }
  if (currentStepIndex >= currentSession.steps.length) {
    waitingForQuestion = false;
    currentAnswer = null;
  }
  renderCurrentStep();
}

function handleAnswer(answer) {
  if (!waitingForQuestion) {
    addMessage('System', 'No question active.');
    return;
  }
  const normalized = answer.trim().toLowerCase();
  const expected = currentAnswer.trim().toLowerCase();
  const step = currentSession.steps[currentStepIndex];
  let isCorrect = false;
  
  if (step.fuzzy) {
    // Fuzzy match: answer must contain the expected string (case-insensitive)
    isCorrect = normalized.includes(expected);
  } else {
    isCorrect = normalized === expected;
  }
  
  if (isCorrect) {
    addMessage('You', answer);
    addMessage('System', '✅ Correct!');
    const nextIndex = step.successNextStepIndex ? step.successNextStepIndex : currentStepIndex + 1;
    currentStepIndex = nextIndex;
    waitingForQuestion = false;
    currentAnswer = null;
    advance();
  } else {
    addMessage('You', answer);
    const failMsg = step.failMessage || 'Incorrect. Try again.';
    addMessage('System', `❌ ${failMsg}`);
  }
}

// Event listeners
sendBtn.addEventListener('click', () => {
  const text = playerInput.value.trim();
  if (!text) return;
  playerInput.value = '';
  if (waitingForQuestion) {
    handleAnswer(text);
  } else {
    addMessage('System', 'No question right now.');
  }
});
playerInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendBtn.click();
});

sessionSelect.addEventListener('change', (e) => {
  startSession(e.target.value);
});

unlockBtn.addEventListener('click', () => {
  const selectedId = sessionSelect.value;
  const caseItem = window.casesRegistry.find(c => c.id === selectedId);
  if (!caseItem) return;
  if (!caseItem.requiresUnlock) {
    unlockStatus.innerText = 'This case does not need a password.';
    return;
  }
  const pwd = casePassword.value.trim();
  if (unlockCase(selectedId, pwd)) {
    // Load the session file
    loadSessionFile(selectedId, (err, session) => {
      if (err) {
        unlockStatus.innerText = `Error: ${err.message}`;
        return;
      }
      unlockStatus.innerText = '✅ Case unlocked!';
      unlockStatus.style.color = '#aaffaa';
      // Enable dropdown option and update text
      const option = sessionSelect.querySelector(`option[value="${selectedId}"]`);
      option.disabled = false;
      option.textContent = caseItem.name; // remove locked marker
      // Start session
      startSession(selectedId);
    });
  } else {
    unlockStatus.innerText = 'Wrong password.';
    unlockStatus.style.color = '#ffaaaa';
    setTimeout(() => { unlockStatus.innerText = ''; }, 2000);
  }
});

// Initialize: build dropdown, load demo (no password required)
buildDropdown();
startSession('demo');