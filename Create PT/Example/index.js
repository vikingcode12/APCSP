var customName = '',
customList = [],
randomAdjectives = ["pretty", "kind", "stylish", "charismatic", "dilligent", "funny", "humble", "jovial", "compassionate", "ambitious", "helpful", "understanding"]

/**
 * Function that gets a random int inclusive of min and max
 * 
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * Accessed on 12/19/22
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {integer}
 */
function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

/**
 * Function that returns the inputted amount of randomly selected adjectives in an Array 
 * 
 * @param {Number} num 
 * @param {Array} list
 * 
 * @returns {Array}
 */
function generateRandomAdjectiveList(num, list=randomAdjectives) {
    let outputList = []
    for (let i = 0; i < num; i++) {
        let randadj = list[getRandInt(0, list.length - 1)]
        while(outputList.includes(randadj)) {
            randadj = list[getRandInt(0, list.length - 1)]
        }
        outputList.push(randadj)
    }
    return outputList
}

/**
 * Function that returns the formatted l
 * 
 * @param {Array} list
 *  
 * @returns {String}
 */
function formatList(list) {
    let output = ''
    for (let i = 0; i < list.length; i++) {
        output += list[i] + " "
    }
    return output
}

function composeValentine(name, list)
