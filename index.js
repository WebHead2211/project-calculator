let display = document.querySelector('span');
const allButton = document.querySelectorAll('.btn')
const clearButton = document.querySelector('.btn-clear');
const delButton = document.querySelector('.btn-del');
const numButton = document.querySelectorAll('.btn-num');
const opButton = document.querySelectorAll('.btn-op');
const equalButton = document.querySelector('.btn-calc');
const decimalButton = document.querySelector('.btn-float');
const signs = ['+', '-', '*', '/', '%'];

let number = {
    numOne: 0,
    numTwo: 0,
};
let operator = null;


//NUM AND OP BUTTONS (TO SELECT EACH BUTTON)
numButtonClick();
opButtonClick();


//EQUAL BUTTON
equalButton.addEventListener('click', equalClick);

//CLEAR AND DELETE BUTTON
clearButton.addEventListener('click', clearScreen);
delButton.addEventListener('click', delClick);



//NUM AND OP BUTTON EVENT LISTENER
function numButtonClick() {
    numButton.forEach(button => {
        button.addEventListener('click', numberClick);
    });
}

function decimalButtonClick() {
    if (!operator) {
        if (!number.numOne.toString().includes('.')) {
            number.numOne = (number.numOne + '.');
            display.textContent += '.';
        }
    } else {
        if (!number.numTwo.toString().includes('.')) {
            number.numTwo = (number.numTwo + '.');
            display.textContent += '.';
        }
    }
}

function opButtonClick() {
    opButton.forEach(button => {
        button.addEventListener('click', opClick);
    })
}

//KEY EVENT LISTENER
document.addEventListener('keydown', currentKey);

function currentKey(event) {
    const currentButton = Array.from(allButton).filter(button => {
        if (event.key == 'Enter') {
            return button.textContent == '=';
        } else if (event.key == 'Backspace') {
            return button.textContent == 'CE';
        } else if (event.key == 'Delete') {
            return button.textContent == 'AC';
        } else {
            return button.textContent == event.key
        }
    });
    if (!currentButton[0]) {
        return;
    } else {
        currentButton[0].classList.add('btn-active');
        setTimeout(() => {
            currentButton[0].classList.remove('btn-active')
        }, 100);
    }
    if (+event.key >= 0 && +event.key <= 9) {
        numberKey(event);
    } else if (signs.some(value => value == event.key)) {
        opKey(event);
    } else if (event.key == 'Enter' || event.key == '=') {
        equalKey();
    } else if (event.key == 'Backspace') {
        delKey();
    } else if (event.key == 'Delete') {
        clearScreen();
    } else if (event.key == '.') {
        decimalButtonClick();
    }
}

//DECIMAL BUTTON
decimalButton.addEventListener('click', decimalButtonClick);


//NUM CLICK FUNCTION
function numberClick() {
    if (limiter(430)) {
        numButton.forEach(button => {
            button.removeEventListener('click', numberClick);
        });
    } else {
        numButtonClick();
        if (!operator) {
            if (number.numOne == null) {
                number.numOne = +this.textContent;
            } else {
                // number.numOne = ((number.numOne * 10) + (this.textContent * 1));
                number.numOne = +(number.numOne + this.textContent);
            }
            display.textContent = number.numOne;
        } else {
            number.numOne = +(number.numOne);
            // number.numTwo = ((number.numTwo * 10) + (this.textContent * 1));
            number.numTwo = +(number.numTwo + this.textContent);
            display.textContent = `${number.numOne} ${operator} ${number.numTwo}`;
        }
    }
}


//NUM KEY FUNCTION
function numberKey(event) {
    if (limiter(430)) {
        return;
    } else {
        document.addEventListener('keydown', currentKey);
        if (!operator) {
            if (number.numOne == null) {
                number.numOne = +(event.key);
            } else {
                number.numOne = +(number.numOne + event.key);
            }
            display.textContent = number.numOne;
        } else {
            number.numOne = +(number.numOne);
            number.numTwo = +(number.numTwo + event.key);
            display.textContent = `${number.numOne} ${operator} ${number.numTwo}`;
        }
    }
    numButtonClick();
}



//OP CLICK FUNCTION
function opClick() {
    if (limiter(430) && !number.numTwo) {
        opButton.forEach(button => {
            button.removeEventListener('click', opClick);
        });
    } else if (signs.some(value => value == display.textContent.charAt(display.textContent.length - 1))) {
        number.numTwo = 0;
    } else {
        if (!operator) {
            operator = this.textContent;
            display.textContent += ` ${operator}`;
        } else if ((number.numOne && number.numTwo && operator) || (number.numOne == 0) || (number.numTwo == 0)) {
            let answer = operate(number.numOne, operator, number.numTwo);
            number.numOne = answer;
            operator = this.textContent;
            number.numTwo = '';
            display.textContent = `${number.numOne} ${operator}`;
        }
        numButtonClick();
        opButtonClick();
    }
}


//OP KEY FUNCTION
function opKey(event) {
    if (limiter(430) && !number.numTwo) {
        return;
    } else if (signs.some(value => value == display.textContent.charAt(display.textContent.length - 1))) {
        number.numTwo = 0;
    } else {
        document.addEventListener('keydown', currentKey);
        if (!operator) {
            operator = event.key;
            display.textContent += ` ${operator}`;
        } else if ((number.numOne && number.numTwo && operator) || (number.numOne == 0) || (number.numTwo == 0)) {
            let answer = operate(number.numOne, operator, number.numTwo);
            number.numOne = answer;
            operator = event.key;
            number.numTwo = '';
            display.textContent = `${number.numOne} ${operator}`;
        }
    }
}


//EQUAL BUTTON CLICK FUNCTION
function equalClick() {
    if (number.numOne && number.numTwo && operator) {
        let answer = operate(number.numOne, operator, number.numTwo);
        display.textContent = answer;
        number.numOne = answer;
        number.numTwo = '';
        operator = null;
    } else if ((number.numOne == 0 || number.numTwo == 0) && operator) {
        let answer = operate(number.numOne, operator, number.numTwo);
        display.textContent = answer;
        number.numOne = answer;
        number.numTwo = '';
        operator = null;
    } else if (!operator && !number.numTwo) {
        if (number.numOne == 0) {
            display.textContent = '0';
        }
        display.textContent = `${number.numOne}`;
    }
    numButtonClick();
}


//EQUAL KEY FUNCTION
function equalKey() {
    if (number.numOne && number.numTwo && operator) {
        let answer = operate(number.numOne, operator, number.numTwo);
        display.textContent = answer;
        number.numOne = answer;
        number.numTwo = '';
        operator = null;
    } else if ((number.numOne == 0 || number.numTwo == 0) && operator) {
        let answer = operate(+number.numOne, operator, +number.numTwo);
        display.textContent = answer;
        number.numOne = answer;
        number.numTwo = '';
        operator = null;
    } else if (!operator && !number.numTwo) {
        if (number.numOne == 0) {
            display.textContent = '0';
        }
        display.textContent = `${number.numOne}`;
    }
    document.addEventListener('keydown', currentKey);
}


//DEL CLICK FUNCTION
function delClick() {
    numButtonClick();
    opButtonClick();
    display.textContent = removeCharAt(display.textContent);
    if (number.numOne && operator && number.numTwo) {
        // number.numTwo = removeNumber(number.numTwo);
        // number.numTwo = +(removeCharAt(number.numTwo.toString()));
        if (number.numTwo.toString().includes('.')) {
            number.numTwo = (display.textContent.replace(`${number.numOne.toString()} ${operator}`, ''));
        } else {
            number.numTwo = +(display.textContent.replace(`${number.numOne.toString()} ${operator}`, ''));
        }
    } else if (operator && !number.numTwo) {
        display.textContent = removeCharAt(display.textContent);
        display.textContent = removeCharAt(display.textContent);
        operator = null;
    } else if (!operator) {
        if (number.numOne < 0 && number.numOne > -10) {
            number.numOne = 0;
        }
        // number.numOne = removeNumber(number.numOne);
        // number.numOne = +(removeCharAt(number.numOne.toString()))
        if (number.numOne.toString().includes('.')) {
            number.numOne = (display.textContent + '');
        } else {
            number.numOne = +display.textContent;
        }
        operator = null;
    }
}


//DELETE KEY FUNCTION
function delKey() {
    document.addEventListener('keydown', currentKey);
    display.textContent = removeCharAt(display.textContent);
    if (number.numOne && operator && number.numTwo) {
        // number.numTwo = removeNumber(number.numTwo);
        // number.numTwo = +(removeCharAt(number.numTwo.toString()));
        if (number.numTwo.toString().includes('.')) {
            number.numTwo = (display.textContent.replace(`${number.numOne.toString()} ${operator}`, ''));
        } else {
            number.numTwo = +(display.textContent.replace(`${number.numOne.toString()} ${operator}`, ''));
        }
    } else if (operator && !number.numTwo) {
        display.textContent = removeCharAt(display.textContent);
        display.textContent = removeCharAt(display.textContent);
        operator = null;
    } else if (!operator) {
        if (number.numOne < 0 && number.numOne > -10) {
            number.numOne = 0;
        }
        // number.numOne = removeNumber(number.numOne);
        // number.numOne = +(removeCharAt(number.numOne.toString()))
        if (number.numOne.toString().includes('.')) {
            number.numOne = (display.textContent + '');
        } else {
            number.numOne = +display.textContent;
        }
        operator = null;
    }
}


function removeNumber(number) {
    return Math.floor(number / 10);
}

function removeCharAt(string) {
    const strLength = string.length;
    let tmpStr = string.split('');
    tmpStr.splice(strLength - 1, 1);
    return tmpStr.join('');
}

//TO CLEAR SCREEN AND RESET TO DEFAULT
function clearScreen() {
    display.textContent = 0;
    number.numOne = '';
    number.numTwo = '';
    operator = null;
    numButtonClick();
    opButtonClick();
    document.addEventListener('keydown', currentKey);
}



//CALCULATION FUNCTION
function operate(num1, op, num2) {
    switch (op) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            if (num2 == 0) {
                window.alert('You cant divide by 0!');
                clearScreen();
                break;
            }
            return divide(num1, num2);
        case '%':
            return modulus(num1, num2);
    }
}


//MATH FUNCTIONS
function add(a, b) {
    if (!b) {
        return a;
    } else {
        return (a + b).toFixed(2).replace(/[.,]00$/, "");
    }
}

function subtract(a, b) {
    return (a - b).toFixed(2).replace(/[.,]00$/, "");
}

function multiply(a, b) {
    return (a * b).toFixed(2).replace(/[.,]00$/, "");
}

function divide(a, b) {
    return (a / b).toFixed(2).replace(/[.,]00$/, "");
}

function modulus(a, b) {
    return (a % b).toFixed(2).replace(/[.,]00$/, "");
}

function limiter(maxWidth) {
    return display.clientWidth > maxWidth;
}