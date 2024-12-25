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
            if (operator) {
                // Se houver uma operação, calcula o valor percentual baseado no firstValue
                currentInput = (parseFloat(firstValue) * (parseFloat(currentInput) / 100)).toString();
                display.textContent = currentInput;
            } else {
                // Se não houver operação, apenas converte o valor atual em porcentagem
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.textContent = currentInput;
            }
            resetDisplay = true;
            break;
        case "^": 
            result = firstNum ** secondValue; // Potência (exponenciação)
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
// function factorial(n) {
//     if (n < 0) return "Erro";
//     let fact = 1;
//     for (let i = 1; i <= n; i++) {
//         fact *= i;
//     }
//     return fact;
// }


function handlePercent() {
    if (firstValue && operator && currentInput) {
        // Calcula a porcentagem em relação ao firstValue (ex.: 10% de 100)
        currentInput = ((parseFloat(firstValue) * parseFloat(currentInput)) / 100).toString();
        display.textContent = currentInput;
    } else {
        // Converte o número atual em porcentagem (ex.: 100% -> 1)
        currentInput = (parseFloat(currentInput) / 100).toString();
        display.textContent = currentInput;
    }
    resetDisplay = true;
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
                    handlePercent();
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
                // case "sqrt":
                //     display.textContent = Math.sqrt(parseFloat(display.textContent));
                //     resetDisplay = true;
                //     break;
                // case "pi":
                //     display.textContent = Math.PI.toFixed(8); // Limita o valor de PI a 8 casas decimais
                //     resetDisplay = true;
                //     break;
                case "power":
                    operator = "^";
                    prepareForNextInput();
                    break;
                // case "factorial":
                //     displayFactorial();
                //     break;
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
                // case "sqrt":
                //     display.textContent = Math.sqrt(parseFloat(display.textContent));
                //     resetDisplay = true;
                //     break;
                // case "pi":
                //     display.textContent = Math.PI.toFixed(8); // Limita o valor de PI a 8 casas decimais
                //     resetDisplay = true;
                //     break;
                case "power":
                    if (operator) {
                        calculate();
                    }
                    firstValue = display.textContent;
                    operator = "^";
                    currentInput = "";
                    resetDisplay = true;
                    break;
                // case "factorial":
                //     const num = parseInt(display.textContent);
                //     display.textContent = factorial(num);
                //     resetDisplay = true;
                //     break;
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
// function displayFactorial() {
//     const num = parseInt(display.textContent);
//     if (num < 0) {
//         display.textContent = "Erro";
//     } else {
//         let factorial = 1;
//         for (let i = 1; i <= num; i++) {
//             factorial *= i;
//         }
//         display.textContent = factorial;
//     }
//     resetDisplay = true;
// }

// Função para lidar com expressão e resultado
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o display e os botões
    const expressionDisplay = document.getElementById("expression");
    const resultDisplay = document.getElementById("result");
    let expression = "";

    // Função para atualizar o display da expressão
    function updateExpressionDisplay() {
        expressionDisplay.textContent = expression || "0";
    }

    // Função para calcular o resultado da expressão
    function calculateExpressionResult() {
        try {
            const sanitizedExpression = expression
                .replace(/÷/g, "/")  // Substitui "÷" por "/"
                .replace(/×/g, "*")  // Substitui "×" por "*"
                .replace(/\^/g, "**") // Substitui "^" por "**"
                .replace(/,/g, ".");  // Substitui vírgula por ponto

            const result = eval(sanitizedExpression);
            resultDisplay.textContent = `= ${result}`;
        } catch (error) {
            resultDisplay.textContent = "Erro";
        }
    }

    // Adiciona eventos de clique para os botões
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
                expression = ""; // Limpa a expressão após o cálculo
            } else if (action) {
                // Adiciona operadores à expressão
                expression += 
                    action === "add" ? "+" :
                    action === "subtract" ? "-" :
                    action === "multiply" ? "*" :
                    action === "divide" ? "/" :
                    action === "percent" ? "%" :
                    action === "power" ? "^" : "";
            } else if (value) {
                // Adiciona números
                expression += value;
            }

            updateExpressionDisplay();

            // Calcula resultado automaticamente (sem pressionar "=")
            if (action !== "equals" && expression) {
                calculateExpressionResult();
            }
        });
    });
});
