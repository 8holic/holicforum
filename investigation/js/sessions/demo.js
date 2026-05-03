window.demoSession = {
  name: 'Introduction',
  steps: [
    // Step 0: Greeting
    {
      id: 0,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'Hello! Welcome to the Investigation Chatroom. I’m Ryan, your guide.',
      delay: 200
    },
    // Step 1: Tutorial – explain interaction format
    {
      id: 1,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'Here’s how this works: You are in a chatroom with me. I will ask a question, and you type your answer. I will respond to what you send. For this hunt, you may need to check the forums or previous announcements for clues. Just send your answer in the chat – I’ll take it from there.',
      delay: 500
    },
    // Step 2: First question – forum name
    {
      id: 2,
      type: 'question',
      sender: 'Ryan',
      rank: 'Community Manager',
      question: 'I want you to go to the forum <a href="../" target="_blank">(link here)</a>. What is the name of the forum?',
      branches: {
        '534ece0b5897985e7b5fc1fb83c27210154377d3206dcc7aed79af710a61ef97': 3
      },
      failMessage: 'That...is incorrect. Upon arriving, look at the top left of the screen.',
      delay: 200
    },
    // Step 3: Second question – game name from News (with hint support)
    {
      id: 3,
      type: 'question',
      sender: 'Ryan',
      rank: 'Community Manager',
      question: 'That’s right, so you are now at the forums. You can request a hint at certain questions. The solution to all puzzles can be found in this forum. What is the name of the game this forum is dedicated to?',
      branches: {
        '25ae18991cdc179cae727f1613289a007ef0e1ed85e7f71d34cf83c9cf589296': 5,   // Correct answer → step 5
        'b80e0af617d0f8ff54ab3142c34c76e83eafe75c6b2cbe87a44c56bb8505dd01': 4    // Hint request → step 4
      },
      failMessage: 'That is not quite right. Look at the oldest post.',
      delay: 200
    },
    // Step 4: Hint response (loops back to step 3)
    {
      id: 4,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'You will need to go to news, and browse the oldest post.',
      delay: 200,
      nextStepIndex: 3
    },
    // Step 5: Introduce case codes and the "3rdjob" mystery
    {
      id: 5,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'Now you are familiar with the basics. Let’s give you a simple case.\n\nLook at the bar above – the case code allows you to visit certain cases and puzzles.\n\nTry the code: <strong>3rdjob</strong>\n\nThere is a relatively brief mystery for you to resolve. I encourage you to get immersed and figure things out.',
      delay: 300
    }
  ]
};