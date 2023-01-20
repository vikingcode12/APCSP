/**
 * Fills the select menu
 */
function fillSelect() {
    output = ''
    // Add 26 keys to the select box
    for (let i = 0; i < 26; i++) {
        output += `<option value="${i+1}">${i+1}</option>`
    }
    output += `<option value="vig">Vigenère</option>`
    idSelectKey.innerHTML = output
}

/**
 * Function that encrypts using the Ceaser Cipher
 * 
 * @param {string} iStr 
 * @param {string} key 
 */
function encrypt(iStr, key) {
    let string = iStr.toUpperCase();
    if (key == "vig") {
        vigKey = idVigKey.value;
        vigEncrypt(string, vigKey);
        return
    }
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let outputStr = ''
    for (let i = 0; i < string.length; i++) {
        // Get the current letter from the input string
        const ele1 = string[i]
        // Loop through all letters of the alphabet
        for (let j = 0; j < letters.length; j++) {
            const ele2 = letters[j]
            if(ele1 == ele2) {
                // If the letters match then add the key from index J then set that as the new index
                let newIndex = j + Number(key)
                // Wrap around if the index is greater than 25
                if (newIndex > letters.length - 1) newIndex = newIndex - letters.length
                outputStr += letters[newIndex]
                // Break and start looking for the next letter
                break;
                
            }
            // If it didn't match then it must be a special character so just append the special character to the output string
            else if (j == letters.length-1) outputStr += ele1 
        }
    }
    // Wrap cipher text in ct tag for cipher text styling
    idOutput.innerHTML = "<ct>" + outputStr + "</ct>";
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
        // Get the current letter from the input string
        const ele1 = string[i]
        // Loop through all letters of the alphabet
        for (let j = 0; j < letters.length; j++) {
            const ele2 = letters[j]
            if(ele1 == ele2) {
                // If the letters match then subtract the key from index J then set that as the new index
                let newIndex = j - Number(key)
                // Wrap around if the index is less than 0
                if (newIndex < 0) newIndex = newIndex + letters.length
                // Append that to the output string
                outputStr += letters[newIndex]
                // Break and start looking for the next letter
                break;
            }
            // If it didn't match then it must be a special character so just append the special character to the output string
            else if(j == letters.length-1) outputStr += ele1
        }
    }
    idOutput.textContent = outputStr.toLowerCase();
    idOutput.style.backgroundColor = 'green'
    
}

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
 * Gives a random key 1-26
 */
function getRandKey(){
    let key = `${getRandInt(1, 26)}`
    idSelectKey.value = key
}

/**
 * Toggles the instructions
 */
function toggleInstructions() {
    let txt = idInstructions.innerHTML
    // If there's no instructions show them
    if (!txt) idInstructions.innerHTML = "Type a string in the input and select a key<br>Press Encrypt to encrypt the string with a ceaser cipher using the selected key<br>Press Decrypt to decrypt the string with a ceaser cipher using the selected key"
    // If there is hide them
    else idInstructions.innerHTML = ''
}

/**
 * Function that checks if the key is Vigenère
 */
function checkKey() {
    let key = idSelectKey.value
    if (key == 'vig') {
        idVigKey.hidden = false
    }
    else {
        idVigKey.hidden = true
    }
}

/**
 * Function that checks if the key is Vigenère
 * 
 * @param {string} iStr 
 * @param {string} key
 */
function vigEncrypt(iStr, key) {
    let string = iStr
    key = key.toUpperCase()
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let outputStr = ''
    for (let i = 0; i < string.length; i++) {
        // Get the current letter from the input string
        const ele1 = string[i]
        // Loop through all letters of the alphabet
        for (let j = 0; j < letters.length; j++) {
            const ele2 = letters[j]
            if(ele1 == ele2) {
                for (let k = 0; k < letters.length; k++) {
                    console.log(key[i%3])
                    if(key[i%3] == letters[k]) {
                        newIndex = j + k
                        // COMPLETE IT I ADDED THE INDEX!
                    }
                }
            }
            // If it didn't match then it must be a special character so just append the special character to the output string
            else if (j == letters.length-1) outputStr += ele1 
        }
    }
    // Wrap cipher text in ct tag for cipher text styling
    idOutput.innerHTML = "<ct>" + outputStr + "</ct>";
    idOutput.style.backgroundColor = 'red'
}


fillSelect();