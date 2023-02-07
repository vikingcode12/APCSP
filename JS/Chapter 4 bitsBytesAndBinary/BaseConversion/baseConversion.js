//Master Convert Function
//Params: Input Number
//Returns: None
function convert(num) {
    let output;
    let base = idSelectBase.value;
    if(base == "none") return// alert("Please select a conversion")
    else if(base == "b2-b10") output = convertBase2Base10(num);
    else if(base == "b8-b10") output = convertBase8Base10(num);
    else if(base == "b16-b10") output = convertBase16Base10(num);
    else if(base == "b10-b2") output = convertBase10Base2(num);
    else if(base == "b10-b8") output = convertBase10Base8(num);
    else if(base == "b10-b16") output = convertBase10Base16(num);
    else if(base == "b2-b16") output = convertBase2Base16(num);
    else if(base == "b16-b2") output = convertBase16Base2(num);
    else if(base == "b2-b8") output = convertBase2Base8(num);
    else if(base == "b8-b2") output = convertBase8Base2(num);
    idOutputNum.value = output;
}


//Converts base 2 num to base 10 num
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

//Converts base 8 num to base 10 num
//Param: Base 8 Number
//Returns: Base 10 num / Standard Number
function convertBase8Base10(b8){
    let output = 0;
    //Convert to string for debugging purposes
    b8 = b8.toString();
    //Splits the string into an array of characters
    let b8Arr =  b8.split('');
    //Reverses the array to make it easier to work with for loops
    b8Arr = b8Arr.reverse();
    for (let i = 0; i < b8Arr.length; i++) {
        const element = Number(b8Arr[i]);
        //Make sure its a octal number
        if(element > 7 || element < 0) return alert("Please pass through an octal number")
        //Get the converted value for that place and add it to the output
        output += element * 8 ** i
    }
    return output
}

//Converts base 16 num to base 10 num
//Param: Base 16 Number
//Returns: Base 10 num / Standard Number
function convertBase16Base10(b16){
    let output = 0;
    //Convert to string for debugging purposes
    b16 = b16.toString().toUpperCase();
    //Splits the string into an array of characters
    let b16Arr =  b16.split('');

    // A far easier way to convert to b10 from b16
    // let isB16 = parseInt(b16Arr.toString().replaceAll(',', ""), 16)

    //Reverses the array to make it easier to work with for loops
    b16Arr = b16Arr.reverse();

    for (let i = 0; i < b16Arr.length; i++) {
        let element = b16Arr[i];
        if(element == "A") element = 10;
        else if(element == "B") element = 11;
        else if(element == "C") element = 12;
        else if(element == "D") element = 13;
        else if(element == "E") element = 14;
        else if(element == "F") element = 15;
        
        //Get the converted value for that place and add it to the output
        output += Number(element * 16 ** i)
    }
    return output
}

//Converts base 10 num to base 2 num
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

//Converts base 10 num to base 8 num
//Param: Base 10 Number
//Returns: Base 8 num / Octal Number
function convertBase10Base8(b10){
    let output = '';
    let num = b10;
    let rm = []
    b10 = Number(b10)
    while (num > 0) {
        rm.push(num%8)
        num = Math.trunc(num/8)
        // console.log(num)   
    }
    output = rm.reverse().toString().replaceAll(',', '')
    return output
}

//Converts base 10 num to base 16 num
//Param: Base 10 Number
//Returns: Base 16 num / Hexadecimal Number
function convertBase10Base16(b10){
    const BASE_16_KEY = "0123456789ABCDEF"
    let output = '';
    let num = b10;
    let remainder;
    let rmArr = []
    b10 = Number(b10)
    while (num > 0) {
        remainder = num%16
        rmArr.push(BASE_16_KEY[remainder])
        num = Math.trunc(num/16)
    }
    output = rmArr.reverse().toString().replaceAll(',', '')
    return output
}

function convertBase16Base2(b16) {
    let b10Num = convertBase16Base10(b16)
    return convertBase10Base2(b10Num)
}

function convertBase2Base16(b2) {
    let b10Num = convertBase2Base10(b2)
    return convertBase10Base16(b10Num)
}

function convertBase8Base2(b8) {
    let b10Num = convertBase8Base10(b8)
    return convertBase10Base2(b10Num)
}

function convertBase2Base8(b2) {
    let b10Num = convertBase2Base10(b2)
    console.log(b10Num)
    return convertBase10Base8(b10Num)
}