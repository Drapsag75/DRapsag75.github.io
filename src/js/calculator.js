// Fonction pour afficher/masquer la calculatrice
window.toggleCalculator = function() {
    const container = document.getElementById('calculator-container');
    container.classList.toggle('hidden');
};

document.addEventListener('DOMContentLoaded', () => {
    const calculator = {
        firstNumber: document.getElementById('first-number'),
        operator: document.getElementById('operator'),
        secondNumber: document.getElementById('second-number'),
        result: document.getElementById('result'),
        currentValue: '',
        isFirstNumber: true,
        operatorValue: '',
        shouldResetDisplay: false
    };

    function updateDisplay() {
        if (calculator.isFirstNumber) {
            calculator.firstNumber.value = calculator.currentValue;
        } else {
            calculator.secondNumber.value = calculator.currentValue;
        }
    }

    function appendNumber(number) {
        if (calculator.shouldResetDisplay) {
            calculator.currentValue = number;
            calculator.shouldResetDisplay = false;
        } else {
            calculator.currentValue += number;
        }
        updateDisplay();
    }

    function appendDecimal() {
        if (calculator.shouldResetDisplay) {
            calculator.currentValue = '0';
            calculator.shouldResetDisplay = false;
        }
        if (!calculator.currentValue.includes('.')) {
            if (calculator.currentValue === '') {
                calculator.currentValue = '0';
            }
            calculator.currentValue += '.';
            updateDisplay();
        }
    }

    function handleOperation(op) {
        if (!calculator.isFirstNumber) {
            calculate();
        }
        calculator.operatorValue = op;
        calculator.operator.value = op;
        calculator.isFirstNumber = false;
        calculator.shouldResetDisplay = true;
        calculator.currentValue = '';
    }

    function calculate() {
        if (calculator.operatorValue === '' || calculator.shouldResetDisplay) return;

        const num1 = parseFloat(calculator.firstNumber.value || '0');
        const num2 = parseFloat(calculator.secondNumber.value || '0');
        let calculatedResult;

        switch (calculator.operatorValue) {
            case '+':
                calculatedResult = num1 + num2;
                break;
            case '-':
                calculatedResult = num1 - num2;
                break;
            case '*':
                calculatedResult = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    alert('Division par zéro impossible !');
                    clear();
                    return;
                }
                calculatedResult = num1 / num2;
                break;
            default:
                return;
        }

        calculator.result.value = Math.round(calculatedResult * 1000000) / 1000000;
    }

    function clear() {
        calculator.currentValue = '';
        calculator.isFirstNumber = true;
        calculator.operatorValue = '';
        calculator.firstNumber.value = '';
        calculator.secondNumber.value = '';
        calculator.operator.value = '';
        calculator.result.value = '0';
        calculator.shouldResetDisplay = false;
        updateDisplay();
    }

    function backspace() {
        if (calculator.currentValue.length <= 1) {
            calculator.currentValue = '';
        } else {
            calculator.currentValue = calculator.currentValue.slice(0, -1);
        }
        updateDisplay();
    }

    document.querySelectorAll('.calc-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = button.textContent;

            if (value >= '0' && value <= '9') {
                appendNumber(value);
            } else if (value === '.') {
                appendDecimal();
            } else if (['+', '-', '*', '/'].includes(value)) {
                handleOperation(value);
            } else if (value === '=') {
                calculate();
            } else if (value === 'C') {
                clear();
            } else if (value === '←') {
                backspace();
            }
        });
    });
}); 