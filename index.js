let display = document.querySelector('p');
const clearButton = document.querySelector('.btn-clear');
const delButton = document.querySelector('.btn-del');
const numButton = document.querySelectorAll('.btn-num');
const opButton = document.querySelectorAll('.btn-op');
const equalButton = document.querySelector('.btn-calc');

let number = {
    numOne: null,
    numTwo: null,
};
let operator = null;




clearButton.addEventListener('click', clearScreen);

delButton.addEventListener('click', () => {
    display.textContent = removeCharAt(display.textContent);
    if(number.numOne && operator && number.numTwo){
        number.numTwo = removeNumber(number.numTwo);
    } else if (operator){
        operator = null; 
    } else {
        number.numOne = removeNumber(number.numOne);
    }
});



function removeNumber(number){
    return Math.floor(number / 10);
}

function removeCharAt(string){
    const strLength = string.length;
    let tmpStr = string.split('');
    tmpStr.splice(strLength - 1, 1);
    return tmpStr.join(''); 
}


//Add numbers to display
numButton.forEach(button => {
    button.addEventListener('click', numberClick);
});


function numberClick(){
    if(!operator){
        if(number.numOne == null){
            number.numOne = +this.textContent;
        } else {
            number.numOne = ((number.numOne * 10) + (this.textContent * 1));
        }
        display.textContent = number.numOne;
    } else {
        number.numTwo = ((number.numTwo * 10) + (this.textContent * 1));
        display.textContent = `${number.numOne} ${operator} ${number.numTwo}`;
    } console.log(number);
}

opButton.forEach(button => {
    button.addEventListener('click', function(){
        if(!operator){
            operator = this.textContent;
            display.textContent += ` ${operator}`;
        } else if((number.numOne && number.numTwo && operator)){
            let answer = operate(number.numOne, operator, number.numTwo);
            number.numOne = answer;
            operator = this.textContent;
            number.numTwo = null;
            display.textContent = `${number.numOne} ${operator}`;
        }
        console.log(operator);
    });
})

equalButton.addEventListener('click', function(){
    if (number.numOne && number.numTwo && operator){
        let answer = operate(number.numOne, operator, number.numTwo);
        display.textContent = answer;
        number.numOne = answer;
        number.numTwo = null;
        operator = null;
    } else if (number.numOne == 0 || number.numTwo == 0){
        let answer = operate(number.numOne, operator, number.numTwo);
        display.textContent = answer;
        number.numOne = answer;
        number.numTwo = null;
        operator = null;
    } 
    else {
        display.textContent = 'INVALID';
    }
});


let stringLength = display.textContent.length;
if (stringLength > 10){
   display.textContent = stringLength;
}




//Calculation Functions
function operate(num1, op, num2){
    switch (op){
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            if(num2 == 0){
                window.alert('You cant divide by 0!');
                clearScreen();
                break;
            }
            return divide(num1, num2);
        case '%':
            return modulus(num1, num2);   
    }
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function modulus(a, b){
    return a % b;
}

function clearScreen(){
    display.textContent = '';
    number.numOne = null;
    number.numTwo = null;
    operator = null;
}