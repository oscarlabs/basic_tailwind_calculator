const darkMode = document.getElementById("dark-mode");
const calculatorContainer = document.getElementById("calculator-container");
const textNumber = document.getElementById("text-number");
const screenNumber = document.getElementsByClassName("screen-number");
const labelDarkMode = document.getElementById("dark-mode-label");
const buttonNumber = document.getElementsByClassName("button-number");
const buttonOperation = document.getElementsByClassName("button-operation");
const resetButton = document.getElementById("reset-button");
const borderScreen = document.getElementById("border-screen");
const lastOperationScreen = document.getElementById("last-operation-screen");
let lastOperation = '';
let currentValue = 0;
let operationFlag = 0;

/*dark mode listener*/
darkMode.addEventListener("click", function() {
    if(darkMode.checked === true){
        calculatorContainer.classList.remove("bg-gray-200");
        calculatorContainer.classList.add("bg-gray-900");
        borderScreen.classList.remove("bg-white");
        borderScreen.classList.add("bg-black");
        borderScreen.classList.remove("border-gray-200");
        borderScreen.classList.add("border-black");
        labelDarkMode.classList.remove("text-gray-700");
        labelDarkMode.classList.add("text-white");

        for (let text of screenNumber) {
            text.classList.add("bg-black");
            text.classList.remove("text-grey-darkest");
            text.classList.add("text-white");
        }

    }else{
        calculatorContainer.classList.remove("bg-gray-900");
        calculatorContainer.classList.add("bg-gray-200");
        borderScreen.classList.remove("bg-black");
        borderScreen.classList.add("bg-white");
        borderScreen.classList.remove("border-black");
        borderScreen.classList.add("border-gray-200");
        labelDarkMode.classList.remove("text-white");
        labelDarkMode.classList.add("text-gray-700");

        for (let text of screenNumber) {
            text.classList.remove("bg-black");
            text.classList.remove("text-white");
            text.classList.add("text-grey-darkest");
        }
    }
    darkMode.blur();
}, false);

/*adds function listeners to each number button*/
for (let button of buttonNumber) {
    button.addEventListener("click", function(){
        selectNumber(button.dataset.number);
        button.blur();
    }, false);
}

/*action to select numbers*/
function selectNumber(number){
    if(operationFlag == 1){
        textNumber.value = '';
    }

    if(textNumber.value.length < 10 && (number != "." || textNumber.value.indexOf(".") < 0)){
        textNumber.value += number;
    }
        
    operationFlag = 0;
}

/*adds listener to AC button*/
resetButton.addEventListener("click", function(){
    textNumber.value = '';
    currentValue = 0;
    cleanLastOperationScreen();
    resetButton.blur();
}, false);

/*adds listener for mathematical operations with args*/
for (let button of buttonOperation) {
    button.addEventListener("click", function(){
        switch(button.dataset.operation){
            case "+":
                operation("+");
                break;
            case "-":
                operation("-");
                break;
            case "*":
                operation("*");
                break;
            case "/":
                operation("/");
                break;
            case "=":
                equal();
                break;
            case "+-":
                changeSign();
                break;
            case "%":
                percentage();
                break;
        }
        button.blur();
    }, false);
}

/*function to process the operation*/
function operation(arg){
    if(operationFlag == 0 && textNumber.value != ''){
        if(currentValue == 0){
            captureCurrentValue();
        }else{
            operate(lastOperation, parseFloat(textNumber.value));
        }
        captureLastOperation(arg);
        textNumber.value = '';
        operationFlag = 1;
    }
}

/*operation function*/
function operate(arg, newValue){
    switch(arg){
        case "+":
            currentValue += newValue;
            break;
        case "-":
            currentValue -= newValue;
            break;
        case "*":
            currentValue = (currentValue * newValue).toFixed(4);
            break;
        case "/":
            currentValue = (currentValue / newValue).toFixed(4);
            break;
        case "=":
            equal();
            break;
    }
}

/*function for change sign*/
function changeSign(){
    if(textNumber.value != ''){
        textNumber.value = parseFloat(textNumber.value) * -1;
    }
}

/*function to get percentage*/
function percentage(){
    if(textNumber.value != ''){
        textNumber.value = parseFloat(textNumber.value) / 100;
    }
}

/*equal function*/
function equal(){
    if(operationFlag == 0){
        operate(lastOperation, parseFloat(textNumber.value));
        cleanLastOperationScreen();
        textNumber.value = (parseFloat(currentValue)/1000)*1000;
        currentValue = 0;
        lastOperation = '';
        //operationFlag = 1
    }
}

/*function to capture current value*/
function captureCurrentValue(){
    if(textNumber.value != ''){
        currentValue = parseFloat(textNumber.value);
        textNumber.value='';  
    }
}

/*function to capture the last operation*/
function captureLastOperation(arg){
    lastOperation = arg;
    lastOperationScreen.innerHTML = currentValue + '&nbsp;' + arg;    
}

/*function to clear the log screen*/
function cleanLastOperationScreen(){
    lastOperationScreen.innerHTML = '&nbsp;';
}