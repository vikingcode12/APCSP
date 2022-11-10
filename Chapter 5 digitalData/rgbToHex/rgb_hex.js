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
    while (output.length < 2) {
        output = "0" + output
    }
    return output
}

//Converts RGBa to Hexadecimal
//Param: RGBa Values
//Returns: Hexadecimal Color
function getHex(r, g, b, a = 100) {
    if(r == '' || 
    g == '' || 
    b == '') return alert("Please enter values for red blue and green")
    let hexR = convertBase10Base16(r).toString()
    let hexG = convertBase10Base16(g).toString()
    let hexB = convertBase10Base16(b).toString()
    if(a == '') a = 100
    let hexA = convertBase10Base16(Math.floor(a/100 * 255)).toString()
    if(hexA == '') hexA = "00"
    return "#"+hexR.toString()+hexG.toString()+hexB.toString()+hexA
}

function handleButtonPress(r,g,b,a = 100) {
    let hex = getHex(r,g,b, a)
    console.log(hex)
    // document.body.style.backgroundColor = `rgba(${r},${g},${b},${a})`
    // document.body.style.backgroundColor = hex
    idFakeBody.style.backgroundColor = hex
    outputMessage.textContent = `The rgb of this color is rgba(${r}, ${g}, ${b}, ${a}) and its hex is ${hex}`
}