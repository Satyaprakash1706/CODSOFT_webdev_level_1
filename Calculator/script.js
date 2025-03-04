const screen = document.querySelector('.calculatorDisplay'); // Fixed selector
const buttons = document.querySelectorAll('.keys');

// Variables for calculations
let currentInput = "";
let operator = "";
let previousInput = "";
let memory = 0; // Memory storage for M+, M-, MR, MC

// Function to update the screen with the full equation
const updateScreen = () => {
    if (previousInput && operator) {
        screen.value = `${previousInput} ${operator} ${currentInput}`;
    } else {
        screen.value = currentInput || "0"; // Default display if empty
    }
};

// Function to handle calculations
const calculateResult = () => {
    if (previousInput === "" || currentInput === "") return;
    
    let result;
    let num1 = parseFloat(previousInput);
    let num2 = parseFloat(currentInput);

    switch (operator) {
        case "+": result = num1 + num2; break;
        case "-": result = num1 - num2; break;
        case "*": result = num1 * num2; break;
        case "/": 
            if (num2 === 0) {
                screen.value = "Error"; // Show error for division by zero
                return;
            }
            result = num1 / num2;
            break;
        default: return;
    }

    result = Number(result.toFixed(6)); // Fix floating-point precision
    screen.value = `${previousInput} ${operator} ${currentInput} = ${result}`;
    currentInput = result.toString();
    previousInput = "";
    operator = "";
};

// Add event listeners to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent.trim();
        console.log("Button Clicked:", buttonText); // Debugging

        // Handling numbers & decimals
        if (!isNaN(buttonText) || buttonText === ".") {
            if (buttonText === "." && currentInput.includes(".")) return;
            currentInput += buttonText;
            updateScreen();
        }
        // Clear screen (AC)
        else if (buttonText === "AC") {
            currentInput = "";
            operator = "";
            previousInput = "";
            updateScreen();
        }
        // Handling operators
        else if (["+", "-", "x", "÷"].includes(buttonText)) {
            if (currentInput === "" && previousInput === "") return;
            if (currentInput !== "") {
                if (previousInput !== "") calculateResult(); // Auto-calculate if an equation is ongoing
                previousInput = currentInput;
                currentInput = "";
            }
            operator = buttonText === "x" ? "*" : buttonText === "÷" ? "/" : buttonText;
            updateScreen();
        }
        // Equals (=) button
        else if (buttonText === "=") {
            calculateResult();
        }
        // Backspace (⌫) to remove last character
        else if (buttonText === "⌫") {
            currentInput = currentInput.slice(0, -1);
            updateScreen();
        }
        // Additional operations
        else if (buttonText === "+/-") {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateScreen();
            }
        } else if (buttonText === "%") {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateScreen();
            }
        } else if (buttonText === "x²") {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) ** 2).toString();
                updateScreen();
            }
        } else if (buttonText === "√x") {
            if (currentInput) {
                currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                updateScreen();
            }
        } else if (buttonText === "π") {
            currentInput = (parseFloat(currentInput) || 0) * Math.PI;
            updateScreen();
        }
        // Memory Operations
        else if (buttonText === "M+") {
            if (currentInput) memory += parseFloat(currentInput);
        } else if (buttonText === "M-") {
            if (currentInput) memory -= parseFloat(currentInput);
        } else if (buttonText === "MR") {
            currentInput = memory.toString();
            updateScreen();
        } else if (buttonText === "MC") {
            memory = 0;
        }
    });
});
