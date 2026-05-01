// Registry of all cases
// Each case has:
// - id: unique identifier (used as value in dropdown)
// - name: displayed in dropdown
// - sessionFile: path to the JS file containing the session object
// - password: optional (null if no password required)
// - requiresUnlock: true if password is required, false otherwise

window.casesRegistry = [
  {
    id: 'demo',
    name: '📘 Demo Tutorial',
    sessionFile: 'js/sessions/demo.js',
    password: null,
    requiresUnlock: false
  },
  {
    id: 'cryptoking',
    name: '🔒 CryptoKing Case',
    sessionFile: 'js/sessions/cryptoking.js',
    password: 'frontier2025',
    requiresUnlock: true
  }
  // Add new cases here – no need to touch main.js
];