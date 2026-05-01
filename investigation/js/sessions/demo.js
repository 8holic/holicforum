// Demo session – always available
window.demoSession = {
  name: 'Demo Tutorial',
  steps: [
    { 
      type: 'message', 
      sender: 'Admin', 
      text: 'Hello! Thank you for assisting in our investigation. My name is Ryan, a community moderator. I will guide you through our cases.' 
    },
    { 
      type: 'message', 
      sender: 'Admin', 
      text: 'Firstly, here is a link to our forum: <a href="../" target="_blank">Frontier Tavern forums</a>. Please check if you can access it.' 
    },
    { 
      type: 'question', 
      question: 'Just to verify – what is the name of our forum?', 
      answer: 'Frontier Tavern', 
      failMessage: 'That is not correct. Look at the link above, or check the forum homepage title.', 
      successNextStepIndex: 3,
      fuzzy: true   // custom flag for fuzzy matching
    },
    { 
      type: 'message', 
      sender: 'Admin', 
      text: '✅ Correct! You have confirmed access. Now you can unlock the CryptoKing case using the password provided elsewhere.' 
    }
  ]
};