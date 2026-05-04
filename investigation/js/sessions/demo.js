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
        '80bc503c64068a97984312e77517c96becd064ff77bb09189e7fd4e4ce0d5adc': 3
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
      question: 'That’s right, so you are now at the forums. You can request a hint at certain questions. How many links on the topbar?',
      branches: {
        '7902699be42c8a8e46fbbb4501726517e86b22c56a189f7625a6da49081b2451': 5,   // Correct answer → step 5
        '3ba8d02b16fd2a01c1a8ba1a1f036d7ce386ed953696fa57331c2ac48a80b255': 5    // Hint request → step 4
      },
      failMessage: 'That is not quite right. Count the categories including home.',
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