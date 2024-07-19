let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');

let calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: null,
    operator: null,
};

display.value = calculator.displayValue; // Show initial 0 on the display

buttons.forEach(button => {
    button.addEventListener('click', handleButtonPress);
});

function handleButtonPress(event) {
    let buttonValue = event.target.textContent;

    if (buttonValue === 'C') {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.secondOperand = null;
        calculator.operator = null;
    } else if (buttonValue === '=' && calculator.operator) {
        calculator.secondOperand = parseFloat(calculator.displayValue);
        if (calculator.operator === '/' && calculator.secondOperand === 0) {
            calculator.displayValue = 'Error';
        } else {
            let result = calculate(calculator.firstOperand, calculator.secondOperand, calculator.operator);
            calculator.displayValue = result.toString();
            calculator.firstOperand = result;
        }
        calculator.secondOperand = null;
        calculator.operator = null;
    } else if (buttonValue === '=' && !calculator.operator) {
        // Do nothing if equals is pressed without an operator
    } else if (buttonValue === '.' && !calculator.displayValue.includes('.')) {
        if (calculator.displayValue === '0') {
            calculator.displayValue = '0.';
        } else {
            calculator.displayValue += '.';
        }
    } else if (['+', '-', '*', '/'].includes(buttonValue)) {
        calculator.firstOperand = parseFloat(calculator.displayValue);
        calculator.operator = buttonValue;
        calculator.displayValue = '';
    } else {
        if (calculator.displayValue === '0') {
            calculator.displayValue = buttonValue;
        } else {
            calculator.displayValue += buttonValue;
        }
    }

    display.value = calculator.displayValue;
}

function calculate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return null;
    }
}
