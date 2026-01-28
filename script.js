let currentInput = '';
let previousInput = '';
let operator = null;
let memory = 0;

const previousValue = document.querySelector('.previous-value');
const currentValue = document.querySelector('.current-value');
const numberButtons = document.querySelectorAll('.btn.number');
const operatorButtons = document.querySelectorAll('.btn.operator');
const equalsButton = document.querySelector('.btn.equals');
const clearButton = document.querySelector('.btn.clear');

const mPlusBtn = document.getElementById('m-plus');
const mMinusBtn = document.getElementById('m-minus');
const mrBtn = document.getElementById('mr');
const mcBtn = document.getElementById('mc');

const historyBtn = document.getElementById('history-btn');
const historyPanel = document.getElementById('history-panel');
const historyList = document.getElementById('history-list');
let history = [];

function updateDisplay() {
    previousValue.textContent = previousInput + (operator || '');
    currentValue.textContent = currentInput || '0';
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
}

function chooseOperator(op) {
    if (currentInput === '' && previousInput !== '') {
        operator = op;
        updateDisplay();
        return;
    }
    if (currentInput === '') return;
    if (previousInput !== '') compute();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function compute() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (operator) {
        case '+': result = prev + current; break;
        case '−': result = prev - current; break;
        case '×': result = prev * current; break;
        case '÷': result = current === 0 ? 'Error' : prev / current; break;
        default: return;
    }

    if (result !== 'Error') addToHistory(`${prev} ${operator} ${current}`, result);

    currentInput = result.toString();
    operator = null;
    previousInput = '';
}

function clearAll() { currentInput = ''; previousInput = ''; operator = null; }

function addMemory() { memory += parseFloat(currentInput) || 0; }
function subtractMemory() { memory -= parseFloat(currentInput) || 0; }
function recallMemory() { currentInput = memory.toString(); }
function clearMemory() { memory = 0; }

function addToHistory(expression, result) {
    const li = document.createElement('li');
    li.textContent = `${expression} = ${result}`;
    historyList.prepend(li);
    history.push(`${expression} = ${result}`);
}

// Toggle history panel
historyBtn.addEventListener('click', () => {
    historyPanel.style.display = historyPanel.style.display === 'block' ? 'none' : 'block';
});

// Event Listeners
numberButtons.forEach(btn => btn.addEventListener('click', () => { appendNumber(btn.textContent); updateDisplay(); }));
operatorButtons.forEach(btn => btn.addEventListener('click', () => { chooseOperator(btn.textContent); updateDisplay(); }));
equalsButton.addEventListener('click', () => { compute(); updateDisplay(); });
clearButton.addEventListener('click', () => { clearAll(); updateDisplay(); });

mPlusBtn.addEventListener('click', () => { addMemory(); });
mMinusBtn.addEventListener('click', () => { subtractMemory(); });
mrBtn.addEventListener('click', () => { recallMemory(); updateDisplay(); });
mcBtn.addEventListener('click', () => { clearMemory(); });

updateDisplay();
