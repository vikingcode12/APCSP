// Function that converts decimal to binary
// Source: Jacob Ramah
//Param: Base 10 Number
//Returns: Base 2 num / Binary Number
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
// Source: Jacob Ramah
//Param: Binary Number
//Returns: Base 10 num / Standard Number
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
    let binArr = [] //str.split(' ')
    binArr.map((binSegment) => {
        let char = binSegment.charAt(0)
        console.log(char)
    })
}


function text2Binary(string) {
    let output = string.charCodeAt(0).toString(2)
    // Ensure the characters are 8 characters long allowing for proper conversion
    while (output.length < 8) {
        output = "0" + output
    }
    return output
}