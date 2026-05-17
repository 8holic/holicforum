window['ITE2026Session'] = {
  name: 'The Case of Ellie Wong',
  start: 'StartA1',
  steps: {
    StartA1: {
      type: 'message',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      text: 'On 18th May 2026, Ellie Wong suddenly vanished. She was last seen at The Frontier CC',
      delay: 200,
      next: 'StartA2'
    },
    StartA2: {
      type: 'message',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      text: 'On that day, she went inside the elevator and never exited',
      delay: 200,
      next: 'StartA3'
    },
    StartA3: {
      type: 'question',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      question: 'We know she is a poster on the <a href="../" target="_blank">lamplight forum</a>, can you locate her?',
      branches: {
        'b58cfb2755f836608040fb7303f0560f8ae6059aec7da187a34ade5633dbd34d': 'ProfileB1'
      },
      failNext: 'StartA3Wrong',      // on wrong answer, go here
      failMessage: 'That doesn\'t seem right, try again.', // optional fallback if failNext not defined
      delay: 200
    },
    StartA3Wrong: {
      type: 'message',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      text: 'We search far and wide for that member...I dont think they are Ellie bud',
      delay: 5000,
      next: 'StartA3'      // go back to the same question after punishment
    },
    URLSwap1: {
      type: 'message',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      text: 'That indeed looks like her. I recall she posted recently as well.',
      delay: 1000,
      next: null
    }
  }
};