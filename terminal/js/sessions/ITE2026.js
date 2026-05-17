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
        'b58cfb2755f836608040fb7303f0560f8ae6059aec7da187a34ade5633dbd34d': 'URLSwap1'
      },
      failNext: 'StartA3Wrong',
      failMessage: 'That doesn\'t seem right, try again.',
      delay: 200
    },
    StartA3Wrong: {
      type: 'message',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      text: 'We search far and wide for that member...I dont think they are Ellie bud',
      delay: 5000,
      next: 'StartA3'
    },
    URLSwap1: {
      type: 'message',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      text: 'That indeed looks like her. I recall she posted recently as well. Can you look up the post?',
      delay: 1000,
      next: 'URLSwap2'          // <-- was unquoted, now fixed
    },
    URLSwap2: {
      type: 'message',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      text: 'I know it has been deleted, but you can add a -a to the url to access it.',
      delay: 200,
      next: 'URLSwap3'          // <-- fixed
    },
    URLSwap3: {
      type: 'question',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      question: 'When was the last post?, answer in DDMMYY, for example 30052026',
      branches: {
        '0b15db5add967cdc3e40eb5a5f692097d737c1ebe496e0583b3bacf468647213': 'URLSwapCorrect'
      },
      failNext: 'URLSwapWrong',
      failMessage: 'That doesn\'t seem right, try again.',
      delay: 200
    },
    URLSwapWrong: {
      type: 'message',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      text: 'This...seems to be wrong, go through her post carefully.',
      delay: 1200,
      next: 'URLSwap3'          // <-- fixed
    },
    URLSwapCorrect: {
      type: 'message',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      text: 'That is it, I think that is all we have to do. Lets head to the elevator.',
      delay: 300,
      next: null         // <-- fixed
    },
  }
};