// Variables for handling inputs, history and toggle effects
const inputValue = document.getElementById("user-input");
const historyList = document.getElementById("history-list");
const clearHistoryButton = document.getElementById("clear-history");
const historySection = document.getElementById("history-section");
const toggleHistoryButton = document.getElementById("toggle-history");

let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

// Function to update the display
function updateDisplay(value) {
    inputValue.innerText = value;
}

// Function to calculate and manage history
// Function to calculate and manage history
// Function to calculate and manage history
function calculate(expression) {
    try {
        // Replace percentages (e.g., 50%) with their calculated value
        const processedExpression = expression.replace(/(\d+)\s*-\s*(\d+)%/g, (match, base, percent) => {
            return `${base} - (${base} * ${percent} / 100)`;
        }).replace(/(\d+)\s*\+\s*(\d+)%/g, (match, base, percent) => {
            return `${base} + (${base} * ${percent} / 100)`;
        });

        const result = eval(processedExpression);
        if (!isNaN(result)) {
            addHistory(expression, result);
            return result;
        }
        return "Error";
    } catch {
        return "Error";
    }
}


// Function to add to history
function addHistory(expression, result) {
    const entry = { expression, result };
    history.push(entry);
    localStorage.setItem("calcHistory", JSON.stringify(history));
    renderHistory();
}

// Function to render history
function renderHistory() {
    historyList.innerHTML = "";
    history.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${entry.expression} = ${entry.result}</span>
            <button onclick="deleteHistory(${index})" class="clear_x">x</button>
        `;
        historyList.appendChild(listItem);
    });
}

// Function to delete a history entry
function deleteHistory(index) {
    history.splice(index, 1);
    localStorage.setItem("calcHistory", JSON.stringify(history));
    renderHistory();
}

// Function to clear all history
function clearHistory() {
    history = [];
    localStorage.removeItem("calcHistory");
    renderHistory();
}

// Event listeners for buttons
document.querySelectorAll(".numbers").forEach(item => {
    item.addEventListener("click", e => {
        if (inputValue.innerText === "0") {
            inputValue.innerText = "";
        }
        inputValue.innerText += e.target.innerText.trim();
    });
});

document.querySelectorAll(".operations").forEach(item => {
    item.addEventListener("click", e => {
        const operation = e.target.innerText.trim();
        const currentValue = inputValue.innerText;

        if (operation === "=") {
            updateDisplay(calculate(currentValue));
        } else if (operation === "AC") {
            updateDisplay("0");
        } else if (operation === "DEL") {
            updateDisplay(currentValue.slice(0, -1) || "0");
        } else if (operation === "(") {
            // Replace initial "0" with "(" if it's the first character
            if (currentValue === "0") {
                updateDisplay("(");
            } else {
                inputValue.innerText += operation;
            }
        } else if (operation === ")") {
            inputValue.innerText += operation;
        } else if (!isNaN(currentValue.slice(-1)) || currentValue.slice(-1) !== operation) {
            inputValue.innerText += operation;
        }
    });
});


// Updated calculate function to handle brackets
function calculate(expression) {
    try {
        // Replace percentages first (e.g., 50% => 50 * 0.01)
        const processedExpression = expression.replace(/(\d+)\s*-\s*(\d+)%/g, (match, base, percent) => {
            return `${base} - (${base} * ${percent} / 100)`;
        }).replace(/(\d+)\s*\+\s*(\d+)%/g, (match, base, percent) => {
            return `${base} + (${base} * ${percent} / 100)`;
        });

        // Evaluate the expression with brackets
        const result = eval(processedExpression);
        if (!isNaN(result)) {
            addHistory(expression, result);
            return result;
        }
        return "Error";
    } catch {
        return "Error";
    }
}


// Clear history button event
clearHistoryButton.addEventListener("click", clearHistory);

// Toggle history visibility
toggleHistoryButton.addEventListener("click", () => {
    const isHistoryVisible = historySection.style.display === "block";
    historySection.style.display = isHistoryVisible ? "none" : "block";
    toggleHistoryButton.innerText = isHistoryVisible ? "Show History" : "Hide History";
});

// Initial render of history
renderHistory();
