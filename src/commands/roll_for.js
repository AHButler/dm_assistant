const roll = {
  name: 'roll_for',
  description: 'Randomised dice roller for NPCs',
  execute(message, args) {
    dice_type = Number(args[1]);

    // See if user has a modifier to their roll
    if (args.length > 2) {
      modifier = Number(args[2]);
    } else {
      modifier = 0;
    }
    // Roll the dice...
    const roll = Math.ceil(Math.random() * dice_type);
    // For natural max of the decided die size
    if (roll == args[0]) {
      message.reply(`Uff, ${args[0]} rolled a natural ${args[1]}!!`);
      if (args.length > 1) {
        message.reply(`With their modifier, that's ${roll + modifier}!`);
      }
      // For bad luck
    } else if (roll == 1) {
      message.reply(`Woo, ${args[0]} rolled a natural 1`);
      if (args.length > 1) {
        message.reply(`With their modifier, that's ${roll + modifier}!`);
      }
      // For everything else
    } else {
      message.reply(`${args[0]} rolled ${roll + modifier}`);
    }
  },
};

module.exports = roll;
