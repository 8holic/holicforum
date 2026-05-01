window.demoSession = {
  name: '6 Anv Code Hunt(Demo)',
  steps: [
    {
      id: 1,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'Hello! Welcome aboard. I am Ryan, the Community Manager.',
      delay: 200
    },
    {
      id: 2,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'Some time ago I organized a community event. You can view the announcement here: <a href="../news/anniversary-event" target="_blank">6‑Month Anniversary Event</a>',
      delay: 500
    },
    {
      id: 3,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'To get you started, let’s walk through this hunt. We will go one by one – each class reveals a piece of the gift card code.',
      delay: 500
    },

    // Warrior - id:4
    {
      id: 4,
      type: 'question',
      sender: 'Ryan',
      rank: 'Community Manager',
      question: 'Warrior: what is the first part of the code? (Enter the placeholder text)',
      hash: '4097889236a2af26c293033feb964c4cf118c0224e0d063fec0a89e9d0569ef2',
      failMessage: 'Not yet – try "PLACEHOLDER" (without quotes).',
      successNextStepIndex: 5,
      delay: 1000
    },

    // Magician - id:5
    {
      id: 5,
      type: 'question',
      sender: 'Ryan',
      rank: 'Community Manager',
      question: 'Magician: second part?',
      hash: '4097889236a2af26c293033feb964c4cf118c0224e0d063fec0a89e9d0569ef2',
      failMessage: 'Still just a placeholder. Enter "PLACEHOLDER".',
      successNextStepIndex: 6,
      delay: 700
    },

    // Archer - id:6
    {
      id: 6,
      type: 'question',
      sender: 'Ryan',
      rank: 'Community Manager',
      question: 'Archer: third part?',
      hash: '4097889236a2af26c293033feb964c4cf118c0224e0d063fec0a89e9d0569ef2',
      failMessage: 'Enter "PLACEHOLDER".',
      successNextStepIndex: 7,
      delay: 1100
    },

    // Thief - id:7
    {
      id: 7,
      type: 'question',
      sender: 'Ryan',
      rank: 'Community Manager',
      question: 'Thief: fourth part? (Look under the surface – the image holds the answer)',
      hash: '98afd806b1b4932202a989e279de0e82bec9008184225df180bf50a69b11ccf5',
      failMessage: 'That’s not correct. Examine the image in the event post carefully.',
      successNextStepIndex: 8,
      delay: 1300
    },

    // Two final messages before Gunslinger - id:8 and id:9
    {
      id: 8,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'Hey you made it to the last part, gunslinger was my primary class.',
      delay: 600
    },
    {
      id: 9,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'Anyways lets do this, what is the code to the last part?',
      delay: 800
    },

    // Gunslinger - id:10
    {
      id: 10,
      type: 'question',
      sender: 'Ryan',
      rank: 'Community Manager',
      question: 'What is the answer to the Gunslinger?',
      hash: '0629643dbe5ec250afb084fac71f8b824fd06015bc476c98b0a4dec1d4b6dde2',
      failMessage: 'Try to head to the Gunslinger destination',
      successNextStepIndex: 11,
      delay: 900
    },

    // Final messages - id:11,12,13
    {
      id: 11,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: '✅ You have found the gift code! I hope you enjoyed it',
      delay: 500
    },
    {
      id: 12,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'It has been expired for over 20 years through.',
      delay: 1000
    },
    {
      id: 13,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'Anyways they are',
      delay: 500
    }
  ]
};