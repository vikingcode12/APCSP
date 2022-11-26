const mongoose = require('mongoose');
const levelingSchema = require('./leveling-sys-schema.js');

function createNewUser(UID, GID, XP, LVL) {
    const user = {
        userId: UID,
        guildId: GID,
        xp: XP,
        level: LVL
    }
    return user
}

async function addXP(userId, guildId) {
    const user = await levelingSchema.findOne({ userId: userId, guildId: guildId })
  if(!user) {
    const newUser = levelingSchema(createNewUser(userId, guildId, 5, 1))
    await newUser.save().catch(e => console.log(`Failed to create user: ${e}`));
  }
  else{
    user.xp += parseInt(5, 10);
    await user.save().catch(e => console.log(`Failed to append xp: ${e}`) );
  }
}

async function checkLvl(userId, guildId){
    const LEVELS = [20, 50, 100, 150, 200, 420, 800, 1200, 1600, 2100, 2700, 3500, 4300, 5000, 6900, 7900, 8900, 9900, 10000, 69420]
    const user = await levelingSchema.findOne({ userId: userId, guildId: guildId })
    if(!user) {
        const newUser = levelingSchema(createNewUser(userId, guildId, 5, 1))
        await newUser.save().catch(e => console.log(`Failed to create user: ${e}`));
    }
    else {
        let newlvl = false;
        let lvl;
        for (let i = LEVELS.length-1; i >= 0; i--) {
            const element = LEVELS[i];
            if (user.xp >= element) {
                if (user.level == Number(i) + 2) break;
                user.level = Number(i) + 2
                newlvl = true;
                lvl = user.level
                await user.save().catch(e => console.log(`Failed to update level: ${e}`) );
                break;
            }
        }
        return {
            status: newlvl,
            lvl: lvl
        };
    }
}

module.exports = {addXP, checkLvl};