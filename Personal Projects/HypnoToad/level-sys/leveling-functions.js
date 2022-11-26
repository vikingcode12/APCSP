const mongoose = require('mongoose');
const levelingSchema = require('./leveling-sys-schema.js');

const LEVELS = [20, 50, 100, 150, 200, 420, 800, 1200, 1600, 2100, 2700, 3500, 4300, 5000, 6900, 7900, 8900, 9900, 10000, 69420]

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
            newlvl,
            lvl: lvl
        };
    }
}

/**
 * 
 * @param {string} userId - Discord User's ID
 * @param {string} guildId - Discord Server's ID
 * @returns The an object containing the user's level status
 */

async function fetchStatus (userId, guildId) {
    const user = await levelingSchema.findOne({ userId: userId, guildId: guildId })
    if (!user) return null;
    const lb = await fetchLeaderboard(guildId)
    let place = 0;
    for (let i = 0; i < lb.length; i++) {
        const element = lb[i].userId
        if(element == userId){
            place = Number(i)+1
        }
    }
    return {
        lvl: user.level,
        xp: user.xp,
        xpNeeded: LEVELS[user.level - 1],
        place
    };
}

async function fetchLeaderboard (guildId) {
    const list = await levelingSchema.find({ guildId: guildId })
    const lb = sortLeaderBoard(list)
    return lb
}

function sortLeaderBoard(lb) {
    var i, j;
    var len = lb.length;
    if(len < 2) return
    var swapped = false;
    for(i =0; i < len; i++){

        swapped = false;

        for(j = 0; j < len; j++){
            if(lb[j].xp > lb[j + 1]?.xp){
            var temp = lb[j]
            lb[j] = lb[j+1];
            lb[j+1] = temp;
            swapped = true;
            }
        }

        // IF no two elements were swapped by inner loop, then break
        if(!swapped){
        break;
        }
    }
    return lb.reverse()
}

module.exports = {addXP, checkLvl, fetchStatus, };