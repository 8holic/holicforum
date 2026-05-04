window['3rdjobSession'] = {
  name: 'Third Job Advancement',
  steps: [
    {
      id: 0,
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'Hello! It is me, Sancho. Your loyal Apprentice',
      delay: 200
    },
    {
      id: 1,
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: '<img src="./assets/airaven.png" alt="Delivery" width="150">',
      delay: 200
    },
    {
      id: 2,
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: '\nI just receive a letter from the guild, congurations you are qualified for the third job advancement!',
      delay: 200
    },
    {
      id: 3,
      type: 'message',
      sender: 'You',
      rank: 'Mind',
      text: 'I recall I have the ability to access a x <a href="../lifestyle_general/2007-10-04-forumn1" target="_blank">(Forum)</a> \n This should help me get the necessary information to complete the advancement. ',
      delay: 200
    },
    {
      id: 4,
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'I see we are being told to go to the chief residence, lets go!',
      delay: 200
    },
    {
      id: 5,
      type: 'question',
      sender: 'You',
      rank: 'Mind',
      question: 'Now where is the chief residence?',
      branches: {
        '7ee1fb044a86a7da7f95c51267e09955299cb701cb0f298bbf64faa1c8f4acc9': 6
      },
      failMessage: 'I felt that is not the place, lets recall harder',
      delay: 200
    },
    {
      id: 6,
      type: 'message',
      sender: 'You',
      rank: 'Mind',
      text: 'We made our way to Tierra Fria, and we are tasked to look for a door of dimension',
      delay: 200
    },
    {
      id: 7,
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'Hmm... but where is this door of dimension? I wonder...',
      delay: 200
    },
    {
      id: 8,
      type: 'message',
      sender: 'You',
      rank: 'Mind',
      text: 'I know, I will just check the forums',
      delay: 200
    },
    {
      id: 9,
      type: 'question',
      sender: 'You',
      rank: 'Mind',
      question: 'Now where is the door of dimension?',
      branches: {
        '13deec64a5f5bd992a59a8196ade3673237e6846b0eed2efb05172e7a74ba36e': 10
      },
      failMessage: 'That doesn\'t seem right, try again.',
      delay: 200
    },
    {
      id: 10,
      type: 'message',
      sender: 'You',
      rank: 'Mind',
      text: 'We go to Mushroom Hill 3, defeat the fearsome foe, and find a black crystal.',
      delay: 200
    },
    {
      id: 11,
      type: 'message',
      sender: 'You',
      rank: 'Mind',
      text: 'Now we head to the holy stone.',
      delay: 200
    },
    {
      id: 12,
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'Brrr... this place is freezing cold, and look at that cliff!',
      delay: 200
    },
    {
      id: 13,
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'There\'s the holy stone! It says the sum is 34 down here \n<img src="./assets/holystonemagicsquare.jpg" alt="Holy Stone" width="150">',
      delay: 200
    },
    {
      id: 14,
      type: 'question',
      sender: 'You',
      rank: 'Mind',
      question: 'What is the solution?',
      branches: {
        'e2d0b40ba326ca656762cfc9d3fa9481e150d237b52fa30ba1592f7b92e75350': 15
      },
      failMessage: 'The stone remains dark. Try another answer.',
      delay: 200
    },
    {
      id: 15,
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'With that answer, the stone lights up! You find a white crystal.',
      delay: 200
    },
    {
      id: 16,
      type: 'message',
      sender: 'You',
      rank: 'Mind',
      text: 'We return to the chief residence and receive our promotion!',
      delay: 200
    },
    {
      id: 17,
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'Congratulations on your third job advancement! Thanks for playing!',
      delay: 200
    }
  ]
};