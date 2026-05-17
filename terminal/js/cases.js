// Registry of all cases
// Each case has:
// - id: unique identifier (used as value in dropdown)
// - name: displayed in dropdown
// - sessionFile: path to the JS file containing the session object
// - password: optional (null if no password required)
// - requiresUnlock: true if password is required, false otherwise

window.casesRegistry = [
  {
    id: 'setup',
    name: 'Introduction',
    sessionFile: 'js/sessions/setup.js',
    passwordHash: '8fb6d5f37e8055ce720bd0b1d56587f88c0071f285966ba17e72b2b12672aa73',
    requiresUnlock: false
  },
  {
    id: '1stcase',
    name: 'Ghost User',
    sessionFile: 'js/sessions/ITE2026.js',
    passwordHash: 'd9a54e9894d4849361ba15a112ca3b87cc6682138c0e35236296e4f6b1489951',
    requiresUnlock: true
  }
  // Add new cases here – no need to touch main.js
];