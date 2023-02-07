const randomAdjectives = ["pretty", "kind", "stylish", "charismatic", "dilligent", "funny", "humble", "jovial", "compassionate", "ambitious", "helpful", "understanding"]
var cName = "",
cAdjList = []


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
 * @param {Boolean} cList
 *  
 * @returns {String}
 */
function formatList(list, cList=false) {
    let output = '<br>'
    for (let i = 0; i < list.length; i++) {
        output += list[i] + "<br>";
    }

    if(cList == true){
        output = "<span class=customList>" + output + "</span>"
    }
    return output;
}

/**
 * Function that composes the valentine.
 * 
 * @param {String} sender 
 * @param {String} recipient 
 * @param {Array} list 
 * 
 * @returns {String}
 */
function composeValentine(list, recipient="John", sender="Anonymous") {
    let fStatus = '<span class=customList>a nice</span>'
    if (list.length > 5) {
        list[getRandInt(0, list.length -1)] = "❤️❤️❤️"
        fStatus = "<span class=customList>my best</span>"
    }
    let contents = `Dear ${recipient}, happy Valentines Day! On days like this we should lift others up. So here are some qualities that I like about you. You are ${formatList(list, idCustomList.checked)} Thank you for being ${fStatus} friend, <br>Sincerely, ${sender}`
    return contents
}

/**
 * Function to obtain the valentine
 * 
 * @param {String} recipient 
 */
function getValentine(recipient=idRecipient.value) {
    let adj = 0;
    if(recipient == "Andrew") adj = 4
    else if(recipient == "Jean") adj = 2
    else if(recipient == "Nick") adj = 8
    else if(recipient == "Custom") {
        recipient = cName
        if(idCustomList.checked) {
            let adjArr = scrambleArr(cAdjList)
            let valentine = composeValentine(adjArr, recipient)
            idDivLetter.innerHTML = valentine
            cName = ""
            cAdjList = []
            idNameCheck.innerHTML = ""
            idAdjectiveCheck.innerHTML = ""
            return
        }
        adj = idCAdjNum.value
    }
    let adjArr = generateRandomAdjectiveList(adj)
    let valentine = composeValentine(adjArr, recipient)
    idDivLetter.innerHTML = valentine
}

/**
 * Saves the name in the cName variable and displays it for the user to check
 * 
 * @param {String} recipient 
 */
function saveName(recipient) {
    idNameCheck.innerHTML = `Send To: <span class='customtomo'>${recipient}</span>`
    cName = `<span class='customtomo'>${recipient}</span>`
}

/**
 * Saves the adjective in the cAdjList variable and displays it for the user to check
 * 
 * @param {String} adj 
 */
function saveAdj(adj) {
    idAdjectiveCheck.innerHTML += `<span class='customList'>${adj}</span><br>`
    cAdjList.push(adj)
}

/**
 * Scrambles the order of an array
 * 
 * @param {Array} array 
 */
function scrambleArr(array) {
    for(let i = 0; i < array.length; i++) {
        const randInt = getRandInt(0, array.length-1);
        [array[i], array[randInt]] = [array[randInt], array[i]];
    }
    return array
}