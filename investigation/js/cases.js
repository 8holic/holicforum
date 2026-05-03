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
    name: 'Introduction',
    sessionFile: 'js/sessions/demo.js',
    passwordHash: null,
    requiresUnlock: false
  },
  {
    id: '3rdjob',
    name: '3rd Job Advancement',
    sessionFile: 'js/sessions/3rdjob.js',
    passwordHash: '696ca8b246eca2f42031e6d210ff2805cd7069155115dc01d6d3692e94038282',
    requiresUnlock: true
  }
  // Add new cases here – no need to touch main.js
];