const screen = document.querySelector('.calculatorScreen input');
const buttons = document.querySelectorAll('.keys');

// Variables for calculations
let currentInput = "";
let operator = "";
let previousInput = "";

// Updating screen
const updateScreen = (value) => {
    console.log("Updating Screen:", value); // Debugging
    screen.value = value; // Update screen content
};

// Add event listeners to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;
        console.log("Button Clicked:", buttonText); // Debugging

        // Handling numbers & decimals
        if (!isNaN(buttonText) || buttonText === ".") {
            if (buttonText === "." && currentInput.includes(".")) return;
            currentInput += buttonText;
            updateScreen(currentInput);
        }
        // Clear screen
        else if (buttonText === "AC") {
            currentInput = "";
            operator = "";
            previousInput = "";
            updateScreen("0");
        }
        // Handling operators
        else if (["+", "-", "x", "÷"].includes(buttonText)) {
            if (currentInput === "") return;
            operator = buttonText === "x" ? "*" : buttonText === "÷" ? "/" : buttonText;
            previousInput = currentInput;
            currentInput = "";
        }
        // Equals (=) button
        else if (buttonText === "=") {
            if (previousInput === "" || currentInput === "") return;
            let result;
            switch (operator) {
                case "+": result = parseFloat(previousInput) + parseFloat(currentInput); break;
                case "-": result = parseFloat(previousInput) - parseFloat(currentInput); break;
                case "*": result = parseFloat(previousInput) * parseFloat(currentInput); break;
                case "/": result = parseFloat(previousInput) / parseFloat(currentInput); break;
                default: return;
            }
            updateScreen(result);
            currentInput = result.toString();
            previousInput = "";
            operator = "";
        }
        // Additional operations
        else if (buttonText === "+/-") {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateScreen(currentInput);
        } else if (buttonText === "%") {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateScreen(currentInput);
        } else if (buttonText === "x²") {
            currentInput = (parseFloat(currentInput) ** 2).toString();
            updateScreen(currentInput);
        } else if (buttonText === "√x") {
            currentInput = Math.sqrt(parseFloat(currentInput)).toString();
            updateScreen(currentInput);
        } else if (buttonText === "π") {
            currentInput = Math.PI.toFixed(6);
            updateScreen(currentInput);
        }
    });
});


