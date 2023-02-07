const readline = require('readline-sync');

// Converts a character to the binary equivilant of the ASCII character 
// Param: ASCII Value
// Returns: Binary character
function text2Binary(string) {
    let output = string.charCodeAt(0).toString(2)
    // Ensure the characters are 8 characters long allowing for proper conversion
    while (output.length < 8) {
        output = "0" + output
    }
    return output
}


// Converts base 10 numbers to base 64
// Param: Base 10 Num
// Returns: Base 64 Num
function convertToBase64Char(b10) {
    const BASE_64_KEY = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    
    for (let i = 0; i < BASE_64_KEY.length; i++) {
        if(b10 == i) {
            return BASE_64_KEY[i]
        }
    }
}


// Encodes a string into base 64
// Param: String
// Returns: A base 64 encoded string
function encodeBase64(str) {
    let strArr = str.toString().split('');
    let binArr = []

    // Convert string to binary
    for (let i = 0; i < strArr.length; i++) {
        const element = strArr[i];
        binArr.push(text2Binary(element))
    }

    for (let i = 0; i < binArr.length; i++) {
        // Ensure spaces are represented correctly
        if(binArr[i] == "0000000 ") binArr[i] = "00100000"
    }

    // Turn it into a string
    let binString = binArr.join('')

    // Split the string in pairs of six 
    // The {1,6} allows for remainders
    let lengthSixBinArr = binString.match(/.{1,6}/g)

    // Make sure all are 6 characters long
    for (let i = 0; i < lengthSixBinArr.length; i++) {
        while (lengthSixBinArr[i].length < 6) {
            lengthSixBinArr[i] = lengthSixBinArr[i] + "0"
        }   
    }

    let baseTenArr = lengthSixBinArr

    // Turn the binarry into base 10
    for (let i = 0; i < baseTenArr.length; i++) {
        baseTenArr[i] = parseInt(baseTenArr[i],2) 
    }
    
    let base64Arr = baseTenArr;
    
    // Convert base 10 into base 64
    for (let i = 0; i < base64Arr.length; i++) {
        base64Arr[i] = convertToBase64Char(base64Arr[i]) 
    }

    let base64Str = base64Arr.join("");


    return console.log(base64Str);
    
}

// encodeBase64("Hello I'm Jacob, yoroshiku onegaishimasu")


var name = readline.question("What do you want to encode? ");

encodeBase64(name)