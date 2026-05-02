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
    name: '📘 6 Month Anniversary Challange(Demo)',
    sessionFile: 'js/sessions/demo.js',
    password: null,
    requiresUnlock: false
  },
  {
    id: 'cryptoking',
    name: '🔒 CryptoKing Case',
    sessionFile: 'js/sessions/cryptoking.js',
    password: '67503b871b810e6c5e6291bc81a7d49a0df0e1aaebd3ea4c1628539cbe882d5c',
    requiresUnlock: true
  }
  // Add new cases here – no need to touch main.js
];