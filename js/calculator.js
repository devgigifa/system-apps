// Seleciona o display e os botões
const display = document.getElementById("display-text");
const buttons = document.querySelectorAll(".btn");

// Variáveis para armazenar valores e operação atual
let currentInput = "";
let firstValue = "";
let operator = null;
let resetDisplay = false;

// Função para atualizar o display
function updateDisplay(value) {
    if (resetDisplay) {
        display.textContent = value;
        resetDisplay = false;
    } else {
        display.textContent = display.textContent === "0" ? value : display.textContent + value;
    }
}

// Função para limpar o display e resetar valores
function clearCalculator() {
    display.textContent = "0";
    currentInput = "";
    firstValue = "";
    operator = null;
    resetDisplay = false;
}

// Função para realizar o cálculo
function calculate() {
    let result;
    const secondValue = parseFloat(currentInput);
    const firstNum = parseFloat(firstValue);

    switch (operator) {
        case "+":
            result = firstNum + secondValue;
            break;
        case "-":
            result = firstNum - secondValue;
            break;
        case "*":
            result = firstNum * secondValue;
            break;
        case "/":
            result = secondValue === 0 ? "Erro" : firstNum / secondValue;
            break;
        case "%":
            result = firstNum % secondValue;
            break;
        case "^":
            result = Math.pow(firstNum, secondValue);
            break;
        default:
            return;
    }

    display.textContent = result;
    currentInput = result.toString();
    operator = null;
    resetDisplay = true;
}

// Função para calcular o fatorial
function factorial(n) {
    if (n < 0) return "Erro";
    let fact = 1;
    for (let i = 1; i <= n; i++) {
        fact *= i;
    }
    return fact;
}

// Função para manipular os cliques nos botões
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (!action) {
            // Número
            currentInput += value;
            updateDisplay(value);
        } else {
            switch (action) {
                case "clear":
                    clearCalculator();
                    break;
                case "delete":
                    // Apaga o último dígito
                    if (display.textContent.length > 1) {
                        display.textContent = display.textContent.slice(0, -1);
                        currentInput = display.textContent;
                    } else {
                        clearCalculator();
                    }
                    break;
                case "add":
                    operator = "+";
                    prepareForNextInput();
                    break;
                case "subtract":
                    operator = "-";
                    prepareForNextInput();
                    break;
                case "multiply":
                    operator = "*";
                    prepareForNextInput();
                    break;
                case "divide":
                    operator = "/";
                    prepareForNextInput();
                    break;
                case "percent":
                    operator = "%";
                    prepareForNextInput();
                    break;
                case "equals":
                    calculate();
                    break;
                case "decimal":
                    if (!currentInput.includes(".")) {
                        currentInput += ".";
                        updateDisplay(".");
                    }
                    break;
                case "sqrt":
                    display.textContent = Math.sqrt(parseFloat(display.textContent));
                    resetDisplay = true;
                    break;
                case "pi":
                    display.textContent = Math.PI.toFixed(8); // Limita o valor de PI a 8 casas decimais
                    resetDisplay = true;
                    break;
                case "power":
                    operator = "^";
                    prepareForNextInput();
                    break;
                case "factorial":
                    displayFactorial();
                    break;
            }
        }
    });
});

// Função para manipular os cliques nos botões
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (!action) {
            // Número
            currentInput += value;
            updateDisplay(value);
        } else {
            switch (action) {
                case "clear":
                    clearCalculator();
                    break;
                case "delete":
                    // Apaga o último dígito
                    if (display.textContent.length > 1) {
                        display.textContent = display.textContent.slice(0, -1);
                        currentInput = display.textContent;
                    } else {
                        clearCalculator();
                    }
                    break;
                case "add":
                case "subtract":
                case "multiply":
                case "divide":
                case "percent":
                    if (operator) {
                        calculate();
                    }
                    firstValue = display.textContent;
                    operator = action === "add" ? "+" : action === "subtract" ? "-" : action === "multiply" ? "*" : action === "divide" ? "/" : "%";
                    currentInput = "";
                    resetDisplay = true;
                    break;
                case "equals":
                    calculate();
                    break;
                case "decimal":
                    if (!currentInput.includes(".")) {
                        currentInput += ".";
                        updateDisplay(".");
                    }
                    break;
                case "sqrt":
                    display.textContent = Math.sqrt(parseFloat(display.textContent));
                    resetDisplay = true;
                    break;
                case "pi":
                    display.textContent = Math.PI.toFixed(8); // Limita o valor de PI a 8 casas decimais
                    resetDisplay = true;
                    break;
                case "power":
                    if (operator) {
                        calculate();
                    }
                    firstValue = display.textContent;
                    operator = "^";
                    currentInput = "";
                    resetDisplay = true;
                    break;
                case "factorial":
                    const num = parseInt(display.textContent);
                    display.textContent = factorial(num);
                    resetDisplay = true;
                    break;
            }
        }
    });
});



// Prepara a calculadora para a próxima entrada
function prepareForNextInput() {
    firstValue = display.textContent;
    currentInput = "";
    resetDisplay = true;
}

// Função para exibir o fatorial
function displayFactorial() {
    const num = parseInt(display.textContent);
    if (num < 0) {
        display.textContent = "Erro";
    } else {
        let factorial = 1;
        for (let i = 1; i <= num; i++) {
            factorial *= i;
        }
        display.textContent = factorial;
    }
    resetDisplay = true;
}

// Função para lidar com expressão e resultado
document.addEventListener("DOMContentLoaded", function () {
    const expressionDisplay = document.getElementById("expression");
    const resultDisplay = document.getElementById("result");
    let expression = "";

    // Função para atualizar o display
    function updateExpressionDisplay() {
        expressionDisplay.textContent = expression || "0";
    }

    // Função para calcular o resultado
    function calculateExpressionResult() {
        try {
            const sanitizedExpression = expression
                .replace(/÷/g, "/")
                .replace(/×/g, "*")
                .replace(/−/g, "-")
                .replace(/,/g, ".");
            
            const result = eval(sanitizedExpression);
            resultDisplay.textContent = `= ${result}`;
        } catch (error) {
            resultDisplay.textContent = "Erro";
        }
    }

    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", () => {
            const action = button.dataset.action;
            const value = button.dataset.value;

            if (action === "clear") {
                expression = "";
                resultDisplay.textContent = "";
            } else if (action === "delete") {
                expression = expression.slice(0, -1);
            } else if (action === "equals") {
                calculateExpressionResult();
                expression = ""; // Limpa a expressão depois de mostrar o resultado final
            } else if (action) {
                expression += 
                action === "add" ? "+" : 
                action === "subtract" ? "-" : 
                action === "multiply" ? "*" : 
                action === "divide" ? "/" : 
                action === "percent" ? "%" : 
                action === "parentheses" ? "()" : 
                action === "factorial" ? "!" :"erro";
                action === "pi" ? "π" :
                action === "power" ? "^" :
                action === "sqrt" ? "√" :
                action === "decimal" ? "." :
                "erro";
            } else if (value) {
                expression += value;
            }

            updateExpressionDisplay();

            if (action !== "equals" && expression) {
                calculateExpressionResult();
            }
        });
    });
});
