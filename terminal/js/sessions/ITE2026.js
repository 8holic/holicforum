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
      next: 'URLSwap2'
    },
    URLSwap2: {
      type: 'message',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      text: 'I know it has been deleted, but you can change the url from elevator3 to elevator2 to access it.',
      delay: 200,
      next: 'URLSwap3'
    },
    URLSwap3: {
      type: 'question',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      question: 'When was the last post?, answer in DDMMYY, for example 30052026',
      branches: {
        '8e49e4caffa7b14296ad1ba02854b43a5fdd7354ce96efb3429956a52c7073ff': 'URLSwapCorrect'
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
      next: 'URLSwap3'
    },
    URLSwapCorrect: {
      type: 'message',
      sender: 'Bryan',
      rank: 'Youth Network Member',
      text: 'That is it, I think that is all we have to do. Lets head to the elevator.',
      delay: 300,
      next: 'RandomBranch'
    },

    // ---- Random split ----
    RandomBranch: {
      type: 'random',
      branches: ['May28Intro', 'May30Intro'],
      delay: 100
    },

    // ========== 28 MAY ELEVATOR ==========
    May28Intro: {
      type: 'message',
      sender: 'Elevator',
      rank: null,
      text: 'It is May 28. The doors slide shut behind you, sealing you in.',
      delay: 300,
      next: 'May28Floor1'
    },
    May28Floor1: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'You are on floor 1. You see room 101 at the corner, and the location where people return books.\nThe panel shows buttons for floors 2, 3, and 4. Where do you want to go?',
      branches: {
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'May28Correct1',  // 2 → correct first move
        '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce': 'May28Floor3',   // 3
        '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a': 'May28Floor4'    // 4
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },
    // Correct sequence: 2 → 3 → 4 → 1
    May28Correct1: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'The elevator hums, a faint chill creeping into the air.\nYou are now on floor 2. Buttons for 1, 3, and 4 glow before you. Where next?',
      branches: {
        '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce': 'May28Correct2',  // 3 → correct
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'May28Floor1',   // 1
        '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a': 'May28Floor4'    // 4
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },
    May28Correct2: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'A cold draft seeps through the doors. The lights flicker briefly.\nYou are on floor 3. The dance studio hums behind you. Buttons: 1, 2, 4. Your choice?',
      branches: {
        '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a': 'May28Correct3',  // 4 → correct
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'May28Floor1',   // 1
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'May28Floor2'    // 2
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },
    May28Correct3: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'The air grows heavy. You hear something shift above the ceiling.\nYou are on floor 4. Edusave banners flutter near the roof. Buttons: 1, 2, 3. Where to?',
      branches: {
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'May28Correct4',  // 1 → final correct
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'May28Floor2',   // 2
        '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce': 'May28Floor3'    // 3
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },
    May28Correct4: {
      type: 'message',
      sender: 'Elevator',
      rank: null,
      text: 'A violent shudder runs through the elevator. The lights cut out for three full seconds. When they return, a new button glows on the panel: 13.',
      delay: 500,
      next: 'ElevatorPuzzleSuccess'
    },
    // Generic floor questions for May 28 (unchanged from your last version, but with 2000ms delay)
    May28Floor2: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'You are on floor 2. You see the conference room right in front of you and the children section on the left side.\nThe panel shows buttons for floors 1, 3, and 4. Where to?',
      branches: {
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'May28Floor1',
        '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce': 'May28Floor3',
        '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a': 'May28Floor4'
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },
    May28Floor3: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'You are on floor 3. You hear the dance studio filled with active noises, the link to Jurong Point is also this floor.\nThe panel shows buttons for floors 1, 2, and 4. Where to?',
      branches: {
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'May28Floor1',
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'May28Correct1',
        '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a': 'May28Floor4'
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },
    May28Floor4: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'You are on floor 4. You look at the roof and top floor of the CC, there seems to be some edusave event going on at the moment.\nThe panel shows buttons for floors 1, 2, and 3. Where to?',
      branches: {
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'May28Floor1',
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'May28Correct1',
        '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce': 'May28Floor3'
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },

    // ========== 30 MAY ELEVATOR ==========
    May30Intro: {
      type: 'message',
      sender: 'Elevator',
      rank: null,
      text: 'It is May 30. The doors close with a soft hiss. The air is still.',
      delay: 300,
      next: 'May30Floor1'
    },
    May30Floor1: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'You are on floor 1. You see room 101 at the corner, and the location where people return books.\nThe panel shows buttons for floors 2, 3, and 4. Where do you want to go?',
      branches: {
        '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce': 'May30Correct1',  // 3 → correct first move
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'May30Floor2',   // 2
        '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a': 'May30Floor4'    // 4
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },
    // Correct sequence: 3 → 2 → 4 → 2
    May30Correct1: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'The elevator lurches, and a low moan echoes in the shaft.\nYou are on floor 3. The Jurong Point link is quiet today. Buttons: 1, 2, 4. Where next?',
      branches: {
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'May30Correct2',  // 2 → correct
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'May30Floor1',   // 1
        '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a': 'May30Floor4'    // 4
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },
    May30Correct2: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'Frost forms on the handrail. The children\'s section on the left seems darker than it should be.\nYou are on floor 2. Buttons: 1, 3, 4. Your decision?',
      branches: {
        '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a': 'May30Correct3',  // 4 → correct
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'May30Floor1',   // 1
        '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce': 'May30Floor3'    // 3
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },
    May30Correct3: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'The air pressure drops. You feel ears pop.\nYou are on floor 4. Edusave banners sway without any breeze. Buttons: 1, 2, 3. Where to?',
      branches: {
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'May30Correct4',  // 2 → final correct
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'May30Floor1',   // 1
        '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce': 'May30Floor3'    // 3
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },
    May30Correct4: {
      type: 'message',
      sender: 'Elevator',
      rank: null,
      text: 'The elevator groans, dropping an inch before locking in place. The lights pulse once, and the 13 button glimmers into existence.',
      delay: 500,
      next: 'ElevatorPuzzleSuccess'
    },
    // Generic floor questions for May 30
    May30Floor2: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'You are on floor 2. You see the conference room right in front of you and the children section on the left side.\nThe panel shows buttons for floors 1, 3, and 4. Where to?',
      branches: {
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'May30Floor1',
        '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce': 'May30Correct1',
        '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a': 'May30Floor4'
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },
    May30Floor3: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'You are on floor 3. You hear the dance studio filled with active noises, the link to Jurong Point is also this floor.\nThe panel shows buttons for floors 1, 2, and 4. Where to?',
      branches: {
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'May30Floor1',
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'May30Floor2',
        '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a': 'May30Floor4'
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },
    May30Floor4: {
      type: 'question',
      sender: 'Elevator',
      rank: null,
      question: 'You are on floor 4. You look at the roof and top floor of the CC, there seems to be some edusave event going on at the moment.\nThe panel shows buttons for floors 1, 2, and 3. Where to?',
      branches: {
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'May30Floor1',
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'May30Floor2',
        '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce': 'May30Correct1'
      },
      failMessage: 'For a moment you were distracted, but you recall you need to decide which floor to go to.',
      delay: 2000
    },

    // ========== SUCCESS (shared) ==========
    ElevatorPuzzleSuccess: {
      type: 'message',
      sender: 'Elevator',
      rank: null,
      text: 'As a uncomfortable chill flows in the elevator, you see the 13th Story button. You press it.',
      delay: 1000,
      next: null   // for now
    },
    Floor13: {
      type: 'message',
      sender: 'You',
      rank: null,
      text: "You walk out onto the roof. It is dark out here. It looks just like the CC.<br><em>[Remind Bryan to add picture]</em>'",
      delay: 500,
      next: 'Floor13A'   // for now
    },
    Floor13A: {
      type: 'message',
      sender: 'You',
      rank: null,
      text: 'Your radio is dead. Looks like you won\'t be getting any help from Bryan. You hear a croaky voice ahead.',
      delay: 500,
      next: 'HungryGhost'
    },
    HungryGhost: {
      type: 'message',
      sender: 'Hungry Ghost',
      rank: '80-Year-Old Spirit',
      text: '“Ahhh… young one. I’ve roamed these floors for eighty years, and my mind ain’t what it was.”',
      delay: 1000,
      next: 'HungryGhost2'
    },
    HungryGhost2: {
      type: 'question',
      sender: 'Hungry Ghost',
      rank: '80-Year-Old Spirit',
      question: "I like five flavours: Long, Aromatic, Kiwi, Salty, Appetizing. Now tell me, what are they, in that order? These old bones forget so easily...",
      branches: {
        // SHA‑256 of the exact answer string (case sensitive as provided)
        '9d1ace522a007f5015daa287fc1fa9cee9b7bdac7f993267164bedf16fcd58c9': 'HungryGhostPass'
      },
      failNext: 'HungryGhostFail1',
      failMessage: '“That ain’t it, child. Back in my day, people knew their food! Let me tell you…”',
      delay: 2000
    },
    HungryGhostFail1: {
      type: 'message',
      sender: 'Hungry Ghost',
      rank: '80-Year-Old Spirit',
      text: 'That ain’t it, child. Back in my day, people knew their food! Let me tell you...',
      delay: 100,   // 10‑second punishment
      next: 'HungryGhostFail2'
    },
    HungryGhostFail2: {
      type: 'message',
      sender: 'Hungry Ghost',
      rank: '80-Year-Old Spirit',
      text: 'That ain’t it, child. Back in my day, people knew their food! Let me tell you…...The ghost launches into a rambling story about hawker stalls in the 1960s, the war. It feels like an eternity before he finally forgets what he was saying and quiets down.',
      delay: 10000,   // 10‑second punishment
      next: 'HungryGhost2'
    },
    HungryGhostPass: {
      type: 'message',
      sender: 'Hungry Ghost',
      rank: '80-Year-Old Spirit',
      text: 'Ahhh! That’s it!Laksa, I will leave you be',
      delay: 800,
      next: 'PhantomHall1'   // continue later
    },
    PhantomHall1: {
      type: 'message',
      sender: 'You',
      rank: null,
      text: 'You continue to look for Ellie Wong and you see the CC Hall,it looks like there is a party.',
      delay: 800,
      next: 'PhantomHall2'   // continue later
    },
    "PhantomHall2": {
      "type": "message",
      "sender": "You",
      "rank": null,
      "text": "You are about to enter as one of the phantoms bellows: \"NO ONE SHALL ENTER HERE!\" The men at the other doors call out:\n\nDoor 2: \"Anda tidak dibenarkan masuk sebelum ini.\"\nDoor 3: \"你不可以进来!\"\nDoor 4: \"வா சிறிய மனிதனே.\"\nDoor 5: \"汝毋通入来!\"\nDoor 6: \"നിങ്ങൾക്ക് പ്രവേശനമില്ല.\"",
      "delay": 800,
      "next": "PhantomHallQuestion"
    },
    "PhantomHallQuestion": {
      "type": "question",
      "sender": "Phantom",
      "rank": null,
      "question": "Which door will you choose? (Enter a number 1-6)",
      "branches": {
        "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a": "PhantomHallPass"
      },
      "failNext": "PhantomHallFail",
      "failMessage": "The door slams shut in your face.",
      "delay": 2000
    },
    "PhantomHallFail": {
      "type": "message",
      "sender": "Phantom",
      "rank": null,
      "text": "As you tried to enter someone tackeled you.",
      "delay": 10000,
      "next": "PhantomHallQuestion"
    },
    "PhantomHallPass": {
      "type": "message",
      "sender": "You",
      "rank": null,
      "text": "You slip through the door as the phantom behind it nods. Inside you see Ellie!",
      "delay": 800,
      "next": 'Finale1'
    },
    Finale1: {
      type: 'message',
      sender: 'Ellie Wong',
      rank: 'Member',
      text: 'Hello! It is so great to see another one alive.',
      delay: 500,
      next: 'Finale2'
    },
    Finale2: {
      type: 'message',
      sender: 'Ellie Wong',
      rank: 'Member',
      text: 'Listen, the location here is haunted by those from before the Community Center was built. They open occasionally because they require something before they can go in peace.',
      delay: 800,
      next: 'Finale3'
    },
    Finale3: {
      type: 'message',
      sender: 'Ellie Wong',
      rank: 'Member',
      text: 'See my blog post? There is something we need to do here to get out of here.',
      delay: 800,
      next: 'FinaleIntro'
    },
    FinaleIntro: {
      type: 'message',
      sender: 'You',
      rank: 'Null',
      text: 'You see nine doors ahead of you, with nine different painting.',
      delay: 800,
      next: 'FinaleIntro1'
    },
    FinaleIntro1: {
      type: 'message',
      sender: 'You',
      rank: 'Null',
      text: 'Door 1: A muscular man rowing away into the sunset',
      delay: 500,
      next: 'FinaleIntro2'
    },
    FinaleIntro2: {
      type: 'message',
      sender: 'You',
      rank: 'Null',
      text: 'Door 2: A man capturing a Jembalang',
      delay: 500,
      next: 'FinaleIntro3'
    },
    FinaleIntro3: {
      type: 'message',
      sender: 'You',
      rank: 'Null',
      text: 'Door 3: The muscular man kneeing before the Raja',
      delay: 500,
      next: 'FinaleIntro4'
    },
    FinaleIntro4: {
      type: 'message',
      sender: 'You',
      rank: 'Null',
      text: 'Door 4: A muscular man being freed by someone',
      delay: 500,
      next: 'FinaleIntro5'
    },
    FinaleIntro5: {
      type: 'message',
      sender: 'You',
      rank: 'Null',
      text: 'Door 5: A painting of swordfish stuck to a bamboo tree',
      delay: 500,
      next: 'FinaleIntro6'
    },
    FinaleIntro6: {
      type: 'message',
      sender: 'You',
      rank: 'Null',
      text: 'Door 6: A Raja passing away being mourned by the masses',
      delay: 500,
      next: 'FinaleIntro7'
    },
    FinaleIntro7: {
      type: 'message',
      sender: 'You',
      rank: 'Null',
      text: 'Door 7: The Muscular man sitting beside a boy who is stabbed through the chest with a spear and is bleeding out',
      delay: 500,
      next: 'FinaleIntro8'
    },
    FinaleIntro8: {
      type: 'message',
      sender: 'You',
      rank: 'Null',
      text: 'Door 8: The muscular man fighting his way through a garrasion',
      delay: 500,
      next: 'FinaleIntro9'
    },
    FinaleIntro9: {
      type: 'message',
      sender: 'You',
      rank: 'Null',
      text: 'Door 9: A painting of a forest with a unique tree',
      delay: 500,
      next: 'Finale10'
    },
    FinaleIntro10: {
      type: 'message',
      sender: 'You',
      rank: 'Null',
      text: 'To indicate which door, indicate exactly only the nunber eg enter 1 if you want to enter door 1',
      delay: 500,
      next: 'FinalRandom'
    },
    FinalRandom: {
      type: 'random',
      branches: ['FinalHall1', 'FinalHall2', 'FinalHall3', 'FinalHall4', 'FinalHall5', 'FinalHall6'],
      delay: 500
    },
    FinalHall1: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'You walk through the door, 9 doors stand before you.',
      branches: {
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'FinalHall11'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall2: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'The lights flickers as you walk through the door.',
      branches: {
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'FinalHall11'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall3: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'Have you been here before? You dont even know.',
      branches: {
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'FinalHall11'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall4: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'You walk past the door with Ellie...you will make it out right?',
      branches: {
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'FinalHall11'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall5: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'You go through yet another door,despite that 9 door stands before you again.',
      branches: {
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'FinalHall11'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall6: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'You think you are going in circles.',
      branches: {
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'FinalHall11'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },

    FinalHall11: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'You think you are going in circles.',
      branches: {
        'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35': 'FinalHall12'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },

    FinalHall12: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'You go through yet another door,despite that 9 door stands before you again.',
      branches: {
        '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a': 'FinalHall13'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall13: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'You walk past the door with Ellie...you will make it out right?',
      branches: {
        '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce': 'FinalHall14'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall14: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'You go through yet another door,despite that 9 door stands before you again.',
      branches: {
        'e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683': 'FinalHall15'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall15: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'The lights flickers as you walk through the door.',
      branches: {
        'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d': 'FinalHall16'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall16: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'You walk past the door with Ellie...you will make it out right?',
      branches: {
        '7902699be42c8a8e46fbbb4501726517e86b22c56a189f7625a6da49081b2451': 'FinalHall17'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall17: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'Have you been here before? You dont even know.',
      branches: {
        '19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7': 'FinalHall18'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall18: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'This is the end...you can feel it,just two more.',
      branches: {
        '2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3': 'FinalHall19'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall19: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'You think you are going in circles',
      branches: {
        '4ec9599fc203d176a301536c2e091a19bc852759b255bd6818810a42c5fed14a': 'FinalHall20'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalHall20: {
      type: 'question',
      sender: 'You',
      rank: 'Null',
      question: 'This is the final one, you can feel it',
      branches: {
        '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b': 'FinalSuccess1'
      },
      failNext: 'FinalRandom',
      delay: 1000
    },
    FinalSuccess1: {
      type: 'message',
      sender: 'Unknown',
      rank: 'Null',
      text: 'Thank you...for remembering what happen',
      delay: 500,
      next: 'FinalSuccess2'
    },
    FinalSuccess2: {
      type: 'message',
      sender: 'You',
      rank: 'Null',
      text: 'And with that,you find yourself back in the elevator. You are back!',
      delay: 500,
      next: null
    }
  }
};