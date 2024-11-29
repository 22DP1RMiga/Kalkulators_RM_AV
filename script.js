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
function calculate(expression) {
    try {
        const result = eval(expression);
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
            <button onclick="deleteHistory(${index})">X</button>
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
        } else if (!isNaN(currentValue.slice(-1)) || currentValue.slice(-1) !== operation) {
            inputValue.innerText += operation;
        }
    });
});

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