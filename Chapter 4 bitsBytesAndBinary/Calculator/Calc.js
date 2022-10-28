let output = ""
// declare a global variable named "output" and initialize it to an empty string
// NOTE: THIS VARIABLE WILL STORE THE CALCULATOR'S ON-SCREEN HISTORY

/** 
 * add(num1,num2) parses its arguments as numbers,
 * then returns the sum of these numbers
 *
 * Parameters: two strings
 * Return value: a number (the sum of the arguments, parsed as numbers)
 */	
function add(num1,num2){
    num1 = Number(num1);
    num2 = Number(num2);
    return num1 + num2
}

function subtract(num1,num2){
    // TO DO: IMPLEMENT THE STEPS FOR subtract(num1,num2)
    num1 = Number(num1);
    num2 = Number(num2);
    return num1 - num2
}

function multiply(num1,num2){
    // TO DO: IMPLEMENT THE STEPS FOR subtract(num1,num2)
    num1 = Number(num1);
    num2 = Number(num2);
    return num1 * num2
}

function divide(num1,num2){
    // TO DO: IMPLEMENT THE STEPS FOR subtract(num1,num2)
    num1 = Number(num1);
    num2 = Number(num2);
    return num1 / num2
}

function exponent(num1,num2){
    // TO DO: IMPLEMENT THE STEPS FOR subtract(num1,num2)
    num1 = Number(num1);
    num2 = Number(num2);
    return num1 ** num2
}

function intDivision(num1,num2){
    // TO DO: IMPLEMENT THE STEPS FOR subtract(num1,num2)
    num1 = Number(num1);
    num2 = Number(num2);
    //Explaination for ~~ found at: https://stackoverflow.com/questions/5971645/what-is-the-double-tilde-operator-in-javascript#:~:text=That%20~~%20is%20a%20double,the%20same%20result%20as%20Math.
    //By users RealHandy and ghoppe
    return ~~(num1 / num2)
}

function remainder(num1,num2){
    // TO DO: IMPLEMENT THE STEPS FOR subtract(num1,num2)
    num1 = Number(num1);
    num2 = Number(num2);
    return num1 % num2
}

// TO DO: IMPLEMENT EACH OF THE FOLLOWING:
// multiply(num1,num2)
// divide(num1,num2)
// exponentiate(num1,num2)
// integerDivision(num1,num2)
// remainder(num1,num2)

// NOTE: HERE ARE THE SYMBOLS FOR THE BASIC OPERATIONS IN JS:
// ADDITION IS +
// SUBTRACTION IS -
// MULTIPLICATION IS *
// DIVISION IS /
// EXPONENTIATE IS **
// INTEGER DIVISION IS //
// REMAINDER DIVISION (ALSO KNOWN AS MOD) IS %

/** 
 * concatenateAndDisplay(item1,item2,item3,item4) concatenates  
 * a long output string using its arguments, then displays it
 * between the tags <div id=idCalcDiv> and </div>
 * two strings passed to it as arguments
 *
 * Parameters: two strings
 * Return/Output: display the value of the output string in the innerHTML of the <div> tags
 */		
function concatenateAndDisplay(item1,item2,item3,item4){
    output += item1 + " "; 

    output += item2 + " "; 

    output += item3 + " ";
    
    output += "= ";
    
    output += item4;

    output += "<br>";
    
    // display the value of "output" in the innerHTML of the <div> tags
    idCalcDiv.innerHTML = output
}

/** 
 * calculate() stores the values of the two <input type="text"
 * textboxes in the webpage and the <select> dropdown menu as variables
 * then uses these values to call the appropriate calculator function(s) from above 
 * then displays an appropriate output string
 *
 * Parameters: none
 * Return value: none
 */		
function calculate(){
    let first = idNum1.value 
    let operation = idSelectBox.value 
    let second = idNum2.value 
    if(isNaN(first) || isNaN(second)) return alert("Please use numbers")
    // declare a variable named "first" and initialize it to the value of the textbox with an ID of 'idNum1'
    // declare a variable named "operation" and initialize it to the value of the select box with an ID of 'idSelectBox'
    // declare a variable named "second" and initialize it to the value of the textbox with an ID of 'idNum2'

    let result;
    
    if (operation == "+"){
        result = add(first,second);
    }
    else if (operation == "-"){
        result = subtract(first, second);
    }
    else if (operation == "*")
    {
        result = multiply(first, second);
    }
    else if (operation == "/")
    {
        result = divide(first, second);
    }
    else if (operation == "/")
    {
        result = divide(first, second);
    }
    else if (operation == "^")
    {
        result = exponent(first, second);
    }
    else if (operation == "//")
    {
        result = intDivision(first, second);
    }
    else if (operation == "%")
    {
        result = remainder(first, second);
    }
    // TO DO: ADD THE REST OF THE NECESSARY "ELSE IF"
    //        STATEMENTS HERE
    
    concatenateAndDisplay(first,operation,second,result);			
    
}

// this function should clear all on-screen calculator history
// setting the innerHTML between the tags <div 'idCalcDiv'> and </div>
// to an empty string, ""
//
// you should also replace this comment with one of your own
//
function clearHistory(){
    // set the value of output to an empty string
    output = ""
    // display the value of "output" in the innerHTML of the <div> tags
    idCalcDiv.innerHTML = output
}