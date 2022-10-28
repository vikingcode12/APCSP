//Converts base 10 num to base 2 num
//Param: Base 10 Number
//Returns: Base 2 num / Binary Number
function convertBase10Base2(b10){
    let output = '';
    let num = b10;
    let rm = []
    b10 = Number(b10)
    for (let i = 0; num > 0; i++) {
        rm.push(num%2)
        num = Math.trunc(num/2)
        // console.log(num)   
    }
    output = rm.reverse().toString()
    return output
}

//Converts a character to the binary equivilant of the ASCII code 
//Param: Base 10 Number
//Returns: Binary character
function text2Binary(string) {
    // console.log(string.charCodeAt(0).toString(2))
    return string.charCodeAt(0).toString(2)
}

function encodeBase64(str) {
    let strArr = str.toString().split('');
    // console.log(strArr);
    let binArr = []
    for (let i = 0; i < strArr.length; i++) {
        const element = strArr[i];
        if(isNaN(Number(element))) binArr.push(text2Binary(element))
        else binArr.push(convertBase10Base2(element))

    }
    console.log(binArr)
}

encodeBase64('ASDF12')