const modder = (message, roll, mod) => {
    var total = roll + mod;
    if (mod != 0) {
        message.reply(`With your modifier, that's ${total}`);
    }
    return total;
}

const roller = (message, dice_type, modifier) => {
    let roll = Math.ceil(Math.random() * dice_type);
    if (roll == dice_type) {
        message.reply(`Wow, you rolled a natural ${dice_type}!!`);
        var score = modder(message, roll, modifier);
    // For bad luck
    } else if (roll == 1) {
        message.reply(`Uff, you rolled a natural 1`);
        var score = modder(message, roll, modifier);
    // For everything else
    } else {
        message.reply(`You rolled ${roll}`);
        var score = modder(message, roll, modifier);
    }
    return score;
}


const roll = {
    name: 'roll',
    description: 'Randomised dice roller',
    execute(message, args) {
        try {
            dice_count = Number(args[0]);
        } catch (e) {
            dice_count = 1; // makes 'a' a valid input for a single die
        }
        
        dice_type = Number(args[1].replace(/\D/g, ''));
        // See if user has a modifier to their roll
        if (args.length > 2) {
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
                message.reply(`For die number ${i}...`);
                total += roller(message, dice_type, modifier);
            }
            message.reply(`So your total score is ${total}`);
        } else {
            roller(message, dice_type, modifier);
        }
        
    }
}

module.exports = roll