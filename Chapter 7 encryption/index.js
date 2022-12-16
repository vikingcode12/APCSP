/**
 * Fills the select menu
 */
function fillSelect() {
    output = ''
    for (let i = 0; i < 26; i++) {
        output += `<option value="key${i+1}">${i+1}</option>`
    }   
    idSelectKey.innerHTML = output
}

/**
 * Function that encrypts using the Ceaser Cipher
 * 
 * @param {string} iStr 
 * @param {string} key 
 */
function encrypt(iStr, key) {
    console.log(iStr)
    let string = iStr.toUpperCase();
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let outputStr = ''
    for (let i = 0; i < string.length; i++) {
        const ele1 = string[i]
        for (let j = 0; j < letters.length; j++) {
            const ele2 = letters[j]
            if(ele1 == ele2) {
                let newIndex = j + Number(key.charAt(key.length - 1))
                console.log(newIndex)
                if (newIndex > letters.length - 1) newIndex = newIndex - letters.length
                outputStr += letters[newIndex]
                break;
            }
        }
    }
    idOutput.textContent = outputStr;
    idOutput.style.backgroundColor = 'red'
}

/**
 * Function that decrypts using the Ceaser Cipher
 * 
 * @param {string} iStr 
 * @param {number} key 
 */
function decrypt(iStr, key) {
    let string = iStr.toUpperCase();
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let outputStr = ''
    for (let i = 0; i < string.length; i++) {
        const ele1 = string[i]
        for (let j = 0; j < letters.length; j++) {
            const ele2 = letters[j]
            if(ele1 == ele2) {
                let newIndex = j - Number(key.charAt(key.length - 1))
                console.log(newIndex)
                if (newIndex < 0) newIndex = newIndex + letters.length
                outputStr += letters[newIndex]
                break;
            }
            else if(j == letters.length) outputStr += ele1
            console.log(j == letters.length)
        }
    }
    idOutput.textContent = outputStr.toLowerCase();
    idOutput.style.backgroundColor = 'green'
    
}

/**
 * Function that gets a random int
 * 
 * From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

function getRandKey(){
    let key = `key${getRandInt(1, 26)}`
    idSelectKey.value = key
}
  
function toggleInstructions() {
    let txt = idInstructions.innerHTML
    if (!txt) idInstructions.innerHTML = "Encrypt will make the input uppercase and Decrypt makes input lowercase. <br> More will be added later"
    else idInstructions.innerHTML = ''
}


fillSelect();