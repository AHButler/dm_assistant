const modder = (message, roll, mod) => {
  var total = roll + mod;
  if (mod != 0) {
      message.channel.send(`With their modifier, that's ${total}`);
  }
  return total;
}

const roller = (message, opponent, dice_type, modifier) => {
  let roll = Math.ceil(Math.random() * dice_type);
  if (roll == dice_type) {
      message.channel.send(`Uff, ${opponent} rolled a natural ${dice_type}!!`);
      var score = modder(message, roll, modifier);
  // For bad luck
  } else if (roll == 1) {
      message.channel.send(`Woo, ${opponent} rolled a natural 1`);
      var score = modder(message, roll, modifier);
  // For everything else
  } else {
      message.channel.send(`${opponent} rolled ${roll}`);
      var score = modder(message, roll, modifier);
  }
  return score;
}


const roll = {
  name: 'roll_for',
  description: 'Randomised dice roller for NPCs',
  execute(message, args) {
    const opponent = args[0];
    let dice_count = Number(args[1]);
    if (isNaN(dice_count)) {
      dice_count = 1;
    }

    const dice_type = Number(args[2].replace(/\D/g, ''));
    // See if user has a modifier to their roll
    if (args.length > 3) {
        modifier = Number(args[args.length - 1]);
        if (isNaN(modifier)) {
            modifier = Number(args[args.length - 2]);
        }  // allows users more english like sytanc
    } else {
        modifier = 0;
    }

     // Roll the dice...
    if (dice_count > 1) {
      var total = 0
      for (i = 1; i <= dice_count; i++) {
          message.channel.send(`For die number ${i}...`);
          total += roller(message, opponent, dice_type, modifier);
      }
      message.channel.send(`So ${opponent}'s total score is ${total}`);
    } else {
        roller(message, opponent, dice_type, modifier);
  }

  }
};

module.exports = roll;


