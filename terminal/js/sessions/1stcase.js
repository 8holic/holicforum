window['1stcaseSession'] = {
  name: 'Third Job Advancement',
  start: 'intro',   // first step ID
  steps: {
    intro: {
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'Hello! It is me, Sancho. Your loyal Apprentice',
      delay: 200,
      next: 'delivery_image'
    },
    delivery_image: {
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: '<img src="./assets/airaven.png" alt="Delivery" width="150">',
      delay: 200,
      next: 'congrats'
    },
    congrats: {
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'I just receive a letter from the guild, congratulations you are qualified for the third job advancement!',
      delay: 200,
      next: 'forum_access'
    },
    forum_access: {
      type: 'message',
      sender: 'You',
      rank: 'Mind',
      text: 'I recall I have the ability to access a <a href="../categories/lifestyle/2007-10-04-forumn1" target="_blank">(Forum)</a> \n This should help me get the necessary information to complete the advancement.',
      delay: 200,
      next: 'lets_go'
    },
    lets_go: {
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'I see we are being told to go to the chief residence, lets go!',
      delay: 200,
      next: 'ask_chief_residence'
    },
    ask_chief_residence: {
      type: 'question',
      sender: 'You',
      rank: 'Mind',
      question: 'Now where is the chief residence?',
      branches: {
        '7ee1fb044a86a7da7f95c51267e09955299cb701cb0f298bbf64faa1c8f4acc9': 'chief_residence_ok'
      },
      failMessage: 'I felt that is not the place, lets recall harder',
      delay: 200
    },
    chief_residence_ok: {
      type: 'message',
      sender: 'You',
      rank: 'Mind',
      text: 'We made our way to Tierra Fria, and we are tasked to look for a door of dimension',
      delay: 200,
      next: 'sancho_wonder'
    },
    sancho_wonder: {
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'Hmm... but where is this door of dimension? I wonder...',
      delay: 200,
      next: 'check_forum'
    },
    check_forum: {
      type: 'message',
      sender: 'You',
      rank: 'Mind',
      text: 'I know, I will just check the forums',
      delay: 200,
      next: 'ask_door_location'
    },
    ask_door_location: {
      type: 'question',
      sender: 'You',
      rank: 'Mind',
      question: 'Now where is the door of dimension?',
      branches: {
        '13deec64a5f5bd992a59a8196ade3673237e6846b0eed2efb05172e7a74ba36e': 'door_found'
      },
      failMessage: 'That doesn\'t seem right, try again.',
      delay: 200
    },
    door_found: {
      type: 'message',
      sender: 'You',
      rank: 'Mind',
      text: 'We go to Mushroom Hill 3, defeat the fearsome foe, and find a black crystal.',
      delay: 200,
      next: 'holy_stone'
    },
    holy_stone: {
      type: 'message',
      sender: 'You',
      rank: 'Mind',
      text: 'Now we head to the holy stone.',
      delay: 200,
      next: 'sancho_cold'
    },
    sancho_cold: {
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'Brrr... this place is freezing cold, and look at that cliff!',
      delay: 200,
      next: 'stone_image'
    },
    stone_image: {
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'There\'s the holy stone! It says the sum is 34 down here \n<img src="./assets/holystonemagicsquare.jpg" alt="Holy Stone" width="150">',
      delay: 200,
      next: 'solve_magic_square'
    },
    solve_magic_square: {
      type: 'question',
      sender: 'You',
      rank: 'Mind',
      question: 'What is the solution?',
      branches: {
        'e2d0b40ba326ca656762cfc9d3fa9481e150d237b52fa30ba1592f7b92e75350': 'stone_lit'
      },
      failMessage: 'The stone remains dark. Try another answer.',
      delay: 200
    },
    stone_lit: {
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'With that answer, the stone lights up! You find a white crystal.',
      delay: 200,
      next: 'return_chief'
    },
    return_chief: {
      type: 'message',
      sender: 'You',
      rank: 'Mind',
      text: 'We return to the chief residence and receive our promotion!',
      delay: 200,
      next: 'congrats_end'
    },
    congrats_end: {
      type: 'message',
      sender: 'Sancho',
      rank: 'Mage Apprentice',
      text: 'Congratulations on your third job advancement! Thanks for playing!',
      delay: 200,
      next: null   // end
    }
  }
};