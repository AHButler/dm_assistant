const roll = {
    name: 'roll',
    description: 'Randomised dice roller',
    execute(message, args) {
        dice_type = Number(args[0]);

        // See if user has a modifier to their roll
        if (args.length > 1) {
            modifier = Number(args[1]);
        } else {
            modifier = 0;
        }
        // Roll the dice...
        const roll = Math.ceil(Math.random() * dice_type);
        // For natural max of the decided die size
        if (roll == args[0]) {
            message.reply(`Wow, you rolled a natural ${args[0]}!!`)
            if (args.length > 1) {
                message.reply(`With your modifier, that's ${roll + modifier}!`)
            }
        // For bad luck
        } else if (roll == 1) {
            message.reply(`Uff, you rolled a natural 1`)
            if (args.length > 1) {
                message.reply(`With your modifier, that's ${roll + modifier}, sorry!`)
            }
        // For everything else
        } else {
            message.reply(`You rolled ${roll + modifier}`)
        }
    }
}

module.exports = roll