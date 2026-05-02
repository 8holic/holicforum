window.demoSession = {
  name: '6 Anv Code Hunt (Demo)',
  steps: [
    // ----- Exactly your intro (unchanged) -----
    {
      id: 0,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'Hello! Welcome aboard. I am Ryan, the Community Manager.',
      delay: 200
    },
    {
      id: 1,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'Some time ago I organized a community event. You can view the announcement here: <a href="../news/anniversary-event" target="_blank">6‑Month Anniversary Event</a>',
      delay: 500
    },
    {
      id: 2,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'To get you started, let’s walk through this hunt. We will go one by one – each class reveals a piece of the gift card code.',
      delay: 500
    },

    // ----- Single master checkpoint (question) -----
    {
      id: 3,
      type: 'question',
      sender: 'Ryan',
      rank: 'Community Manager',
      question: 'I will be here. Send any class code (Warrior, Magician, Archer, Thief, Gunslinger) or the full master code. \n I will respond ASAP',
      branches: {
        // Replace these hashes with the SHA-256 of your actual answers (lowercase, trimmed)
        'fe6ca625b8f5ccfc880fc836b3b614715d9df9e4b7df6e54aa602ef110f34e50': 4,   // → step 5 (Warrior feedback)
        '1e36d01a9ac63221aeb61cda3a611edf00d834822155340d6e63a4fb264eca35': 5,  // → step 6 (Magician feedback)
        '05021cd5778c3890868be2ed9780a597fae43c669aa0a6f99169edab1c7779f4': 6,    // → step 7 (Archer feedback)
        '98afd806b1b4932202a989e279de0e82bec9008184225df180bf50a69b11ccf5': 7,     // → step 8 (Thief feedback)
        '267ecda242dc0e630b931a233df88e15c9b570e56a238bc4c456a862bb339300': 8,// → step 9 (Gunslinger feedback)
        'e4624210286351d7a66b1b1183d0609ba61c7a5df832c57cf8704c8d4017d4bb': 9      // → step 10 (final messages)
      },
      failMessage: 'Sorry I dont think that is quite right...',
      delay: 100
    },

    // ----- Feedback steps (each jumps back to step 4) -----
    {
      id: 4,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: '✅ Warrior code correct! Good job.',
      delay: 800,
      nextStepIndex: 3   // ← go back to the question
    },
    {
      id: 5,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: '✅ Magician code correct! Good job.',
      delay: 800,
      nextStepIndex: 3
    },
    {
      id: 6,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: '✅ Archer code correct! Good job.',
      delay: 800,
      nextStepIndex: 3
    },
    {
      id: 7,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: '✅ Thief code correct! Good job.',
      delay: 800,
      nextStepIndex: 3
    },
    {
      id: 8,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: '✅ Gunslinger code correct! Good job.',
      delay: 800,
      nextStepIndex: 3
    },

    // ----- Final messages (original steps 11‑13) -----
    {
      id: 9,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: '✅ You have found the gift code! I hope you enjoyed it',
      delay: 500
    },
    {
      id: 10,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'It has been expired for over 20 years though.',
      delay: 1000
    },
    {
      id: 11,
      type: 'message',
      sender: 'Ryan',
      rank: 'Community Manager',
      text: 'If you enjoyed this,please consider our upcoming physical workshop!',
      delay: 500
    }
  ]
};