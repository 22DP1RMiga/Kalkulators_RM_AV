const output = document.getElementById("output");
let currentInput = "";
let previousInput = "";
let operator = "";

function updateDisplay() {
    output.value = currentInput || "0";
}

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value) || value === ".") {
            // Numbers and decimal
            if (value === "." && currentInput.includes(".")) return;
            currentInput += value;
        } else if (value === "C") {
            // Clear
            currentInput = "";
            previousInput = "";
            operator = "";
        } else if (value === "=") {
            // Calculate
            if (currentInput && previousInput && operator) {
                currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
                previousInput = "";
                operator = "";
            }
        } else {
            // Operators
            if (currentInput) {
                previousInput = currentInput;
                currentInput = "";
                operator = value;
            }
        }

        updateDisplay();
    });
});

// Initialize display
updateDisplay();
