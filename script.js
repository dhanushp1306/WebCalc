const previousValue = document.querySelector('.previous-value');
const currentValue = document.querySelector('.current-value');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            appendNumber(value);
        } 
        else if (button.classList.contains('operator')) {
            chooseOperator(value);
        } 
        else if (button.classList.contains('equals')) {
            calculate();
        } 
        else if (button.classList.contains('clear')) {
            clearAll();
        }
    });
});

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Cannot divide by zero');
                clearAll();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function updateDisplay() {
    currentValue.textContent = currentInput || '0';
    previousValue.textContent = operator ? `${previousInput} ${operator}` : '';
}
