// Function that converts decimal to binary
// Source: baseConversion.js - Jacob Ramah
// Param: Base 10 Number
// Returns: Base 2 num / Binary Number
function convertBase10Base2(b10){
    let output = '';
    let num = b10;
    let rm = []
    b10 = Number(b10)
    while (num > 0) {
        rm.push(num%2)
        num = Math.trunc(num/2)
        // console.log(num)   
    }
    output = rm.reverse().toString().replaceAll(',', '')
    return output
}

// Function that converts binary to decimal
// Source: baseConversion.js - Jacob Ramah
// Param: Binary Number
// Returns: Base 10 num / Standard Number
function convertBase2Base10(b2){
    let output = 0;
    //Convert to string for debugging purposes
    b2 = b2.toString();
    //Splits the string into an array of characters
    let b2Arr =  b2.split('');
    //Reverses the array to make it easier to work with for loops
    b2Arr = b2Arr.reverse();
    for (let i = 0; i < b2Arr.length; i++) {
        const element = Number(b2Arr[i]);
        //Make sure its a binary number
        if(element != 1 && element != 0) return alert("Please pass through a binary number")
        //Get the converted value for that place and add it to the output
        output += element * 2 ** i
    }
    return output
}

// Function that converts binary to ASCII
// Param: Binary
// Returns: String
function convertBin2ASCII(binStr) {
    let binArr = binStr.toString().split(' ')
    let output = ''
    while(!binArr[binArr.length - 1]) {
        binArr.pop()
    }
    binArr.map((binSegment) => {
        // Converts binary to ASCII
        // From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
        output += String.fromCharCode(convertBase2Base10(binSegment));
    })
    return output;
}

// Function that converts binary to ASCII
// Param: String
// Returns: Binary
function converttext2Binary(string) {
    let charArr = string.split('')
    let output = ''
    charArr.map((char) =>{
        output += char.charCodeAt(0).toString(2) + " "
    })
    // Ensure the characters are 8 characters long allowing for proper conversion
    while (output.length < 8) {
        output = "0" + output
    }
    return output;
}

// Function that chooses the conversion
// Param: String
// Returns: Binary
function convert(selectVal, inputValue) {
    let output;
    if(selectVal == "bin-str") output = convertBin2ASCII(inputValue) 
    else if(selectVal == "str-bin") output = converttext2Binary(inputValue) 
    idOutput.textContent = output;
}