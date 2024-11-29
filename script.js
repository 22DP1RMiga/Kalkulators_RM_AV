const inputValue = document.getElementById("user-input");

// Function to calculate the result
function calculate(expression) {
    try {
        return eval(expression); // Simple evaluation for arithmetic expressions
    } catch {
        return "Error"; // Return "Error" for invalid expressions
    }
}

// Handle number buttons
document.querySelectorAll(".numbers").forEach(function (item) {
    item.addEventListener("click", function (e) {
        if (inputValue.innerText === "NaN" || inputValue.innerText === "0") {
            inputValue.innerText = "";
        }
        inputValue.innerText += e.target.innerHTML.trim();
    });
});

// Handle operations
document.querySelectorAll(".operations").forEach(function (item) {
    item.addEventListener("click", function (e) {
        const operation = e.target.innerHTML.trim();
        let lastValue = inputValue.innerText.slice(-1);

        if (operation === "=") {
            // Use the calculate() function to get the result
            inputValue.innerText = calculate(inputValue.innerText);
        } else if (operation === "AC") {
            inputValue.innerText = "0";
        } else if (operation === "DEL") {
            inputValue.innerText = inputValue.innerText.slice(0, -1) || "0";
        } else if (!isNaN(lastValue) || (lastValue !== operation && operation !== "=")) {
            // Avoid adding multiple operators in sequence
            inputValue.innerText += operation;
        }
    });
});
