const { Schema, model, models } = require('mongoose')

const levelShema = new Schema({
    userId: {
        // The ID of the User, which is used to identify their level later on.
        type: String,
        required: true
    },
    // Server ID
    guildId: {
        type: String,
        required: true
    },
    // XP of the user.
    xp: {
        type: Number,
        required: false
    },

    level: { 
        type: Number,
        required: false
    }

});

const name = "lvl-sys";

module.exports = models[name] || model(name, levelShema);