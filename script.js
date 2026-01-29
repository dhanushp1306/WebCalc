const prevDisplay = document.getElementById("previous-value");
const currDisplay = document.getElementById("current-value");

const historyPanel = document.getElementById("history-panel");
const historyList = document.getElementById("history-list");

const numberButtons = document.querySelectorAll(".btn.number");
const operatorButtons = document.querySelectorAll(".btn.operator");
const equalsButton = document.querySelector(".btn.equals");
const clearButton = document.querySelector(".btn.clear");
const historyButton = document.getElementById("history-btn");

const mPlusBtn = document.getElementById("m-plus");
const mMinusBtn = document.getElementById("m-minus");
const mrBtn = document.getElementById("mr");
const mcBtn = document.getElementById("mc");

let currentValue = "";
let previousValue = "";
let operator = null;
let memory = 0;

/* -------- Display helpers -------- */
function updateDisplay() {
    currDisplay.textContent = currentValue || "0";
    prevDisplay.textContent = previousValue;
}

/* -------- Number input -------- */
numberButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.dataset.number === "." && currentValue.includes(".")) return;
        currentValue += btn.dataset.number;
        updateDisplay();
    });
});

/* -------- Operator input -------- */
operatorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (currentValue === "" && btn.dataset.operator === "-") {
            // allow negative numbers
            currentValue = "-";
            updateDisplay();
            return;
        }

        if (currentValue === "") return;

        if (previousValue !== "") calculate();

        operator = btn.dataset.operator;
        previousValue = `${currentValue} ${operator}`;
        currentValue = "";
        updateDisplay();
    });
});

/* -------- Calculation -------- */
function calculate() {
    if (previousValue === "" || currentValue === "") return;

    const expression = previousValue + currentValue;

    try {
        const result = Function(`return (${expression})`)();
        addHistory(expression + " = " + result);
        currentValue = result.toString();
        previousValue = "";
        operator = null;
        updateDisplay();
    } catch {
        currentValue = "Error";
        previousValue = "";
        updateDisplay();
    }
}

equalsButton.addEventListener("click", calculate);

/* -------- Clear -------- */
clearButton.addEventListener("click", () => {
    currentValue = "";
    previousValue = "";
    operator = null;
    updateDisplay();
});

/* -------- Memory -------- */
mPlusBtn.addEventListener("click", () => {
    memory += Number(currentValue || 0);
});

mMinusBtn.addEventListener("click", () => {
    memory -= Number(currentValue || 0);
});

mrBtn.addEventListener("click", () => {
    currentValue += memory.toString();
    updateDisplay();
});

mcBtn.addEventListener("click", () => {
    memory = 0;
});

/* -------- History -------- */
function addHistory(entry) {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.prepend(li);
}

historyButton.addEventListener("click", () => {
    historyPanel.style.display =
        historyPanel.style.display === "block" ? "none" : "block";
});

/* -------- Keyboard input -------- */
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) || key === ".") {
        if (key === "." && currentValue.includes(".")) return;
        currentValue += key;
        updateDisplay();
    }

    if (["+", "-", "*", "/"].includes(key)) {
        if (currentValue === "" && key === "-") {
            currentValue = "-";
            updateDisplay();
            return;
        }
        if (currentValue === "") return;

        if (previousValue !== "") calculate();

        operator = key;
        previousValue = `${currentValue} ${operator}`;
        currentValue = "";
        updateDisplay();
    }

    if (key === "Enter") {
        e.preventDefault();
        calculate();
    }

    if (key === "Backspace") {
        currentValue = currentValue.slice(0, -1);
        updateDisplay();
    }

    if (key === "Escape") {
        currentValue = "";
        previousValue = "";
        operator = null;
        updateDisplay();
    }
});
