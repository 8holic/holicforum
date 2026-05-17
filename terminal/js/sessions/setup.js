window.setupSession = {
  name: 'Introduction',
  start: 'post1',
  steps: {
    post1: {
      type: 'message',
      sender: 'Virgil',
      rank: 'Community Manager',
      text: 'You’ve accessed a restricted terminal. I’m Virgil, your guide.',
      delay: 200,
      next: 'post2'
    },
    post2: {
      type: 'question',
      sender: 'Virgil',
      rank: 'Community Manager',
      question: 'Head to the <a href="../" target="_blank">forum</a>. What is the name of the forum on the top left?',
      branches: {
        '80bc503c64068a97984312e77517c96becd064ff77bb09189e7fd4e4ce0d5adc': 'post3',
        '950d7b94ef8c46a9673e1c54ee925fd0171015cb4b25ba0b6d013f170359eeec': 'post3'
      },
      failMessage: 'Take another look – right at the top left corner.',
      delay: 300
    },
    post3: {
      type: 'message',
      sender: 'Virgil',
      rank: 'Community Manager',
      text: "That’s right, welcome to the Lamplight.<br><br>For your first case, find the passcode in the Announcement forum.<br>The title is: <strong>IMPORTANT ANNOUNCEMENT - [For initiates only]</strong>.<br><br>Once you have the code, refresh this page and enter it into the terminal.<br><br>I hope to see you on the other side.",
      delay: 300,
      next: null   // end of session
    }
  }
};