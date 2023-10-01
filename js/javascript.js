//General variables that are used by "operate" and "execute" functions.
let number1Arr = [];
let number2Arr = [];
let operator = [];
let displayValue = [];
let resultsArr = [];
let result = [];

const buttons = document.querySelectorAll("button");
const displayDiv = document.getElementById("calculation");
const resultDiv = document.getElementById("result");

//Execution of main function "execute".
execute();


console.log(number1Arr);
console.log(operator);
console.log(number2Arr);
console.log(displayValue);
console.log(result);

//Function execute is called whenever the calculator buttons are clicked by the user. The result will vary according to the pressed button.
function execute() {
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            //If AC button is clicked, reset all variables value and clear the display divs.
            if (button.id === "ac") {
                number1Arr.splice(0, number1Arr.length);
                number2Arr.splice(0 ,number2Arr.length);
                operator.splice(0, operator.length);
                resultsArr.splice(0, resultsArr.length);
                result.splice(0, result.length);
                displayDiv.textContent = "";
                resultDiv.textContent = "";
            }
            
            //If "=" button is clicked and number2Arr has a value, execute "operate" taking into account the values accumulated in arrays numberArr1, operator, and numberArr2. Push the whole operation to the displayDiv and the result to the resultDIv
            else if (button.id === "=" && number2Arr[0]) {
                if (result[0]) {
                    let number1 = resultsArr[resultsArr.length-1];
                    let number2 = Number(number2Arr.join(""));
                    let oper = operator[0];
                    result.splice(0, result.length);
                    operate(number1, number2, oper);
                    displayValue = `${number1} ${oper} ${number2} = ${resultsArr[resultsArr.length-1]}`; 
                    displayDiv.textContent = `${displayValue}`;
                    resultDiv.textContent = `${resultsArr[resultsArr.length-1]}`;
                    number1Arr.splice(0, number1Arr.length);  
                    number2Arr.splice(0, number2Arr.length);

                } else {
                    let number1 = Number(number1Arr.join(""));
                    let number2 = Number(number2Arr.join(""));
                    let oper = operator[0];
                    operate(number1, number2, oper);
                    displayValue = `${number1} ${oper} ${number2} = ${resultsArr[resultsArr.length-1]}`; 
                    displayDiv.textContent = `${displayValue}`;
                    resultDiv.textContent = `${resultsArr[resultsArr.length-1]}`;
                    number1Arr.splice(0, number1Arr.length);  
                    number2Arr.splice(0, number2Arr.length); 
                }
            } 
            
            //If a button with class "operator" is clicked, execute function "operate" whenever variale "result" and "number2Arr" have content. Display the operation in displayDiv and the result in resultDiv.
            //Else if variable result has content but number2Arr doesn't, display the result's content + the last clicked operator in the resultDiv.
            //Else if operator already has a value, and number1Arr and number2Arr do too, execute operate, display whole operation with operator's previous value in the displayDiv, and display the result and new operator in the resultDiv.
            //Else if operator already has a value but only number1Arr does too, replace the value of "operator" with the newest clicked operator and display number1 + operator in the resultDiv.
            //Else if number1Arr has content, display number1 + operator.
            //Else (whenever an operator is clicked without any number being clicked previously nor any result calculated and stored), display error message: "Please, input a number first.".
            else if (button.classList.contains("operator")) {
                if (result[0]) {
                    if (number2Arr[0]) {
                        let number1 = resultsArr[resultsArr.length-1];
                        let number2 = Number(number2Arr.join(""));
                        let oper = operator[0];
                        result.splice(0, result.length);
                        operate(number1, number2, oper);
                        displayValue = `${number1} ${oper} ${number2} = ${resultsArr[resultsArr.length-1]}`;  
                        displayDiv.textContent = `${displayValue}`;
                        operator.splice(0, 1, button.id);
                        oper = operator[0];
                        resultDiv.textContent = `${resultsArr[resultsArr.length-1]} ${oper}`;
                        number1Arr.splice(0, number1Arr.length);  
                        number2Arr.splice(0, number2Arr.length);                    
                    } else {
                        number1Arr.push(result[0]);
                        operator.splice(0, 1, button.id);
                        let number1 = Number(number1Arr.join(""));
                        let oper = operator[0];
                        result.splice(0, 1);
                        displayValue = `${number1} ${oper}`;
                        resultDiv.textContent = `${displayValue}`;
                    }
                }

                else if (operator[0]) {
                    if (number1Arr[0] && number2Arr[0]) {
                        let number1 = Number(number1Arr.join(""));
                        let number2 = Number(number2Arr.join(""));
                        let oper = operator[0];
                        operate(number1, number2, oper);
                        displayValue = `${number1} ${oper} ${number2} = ${resultsArr[resultsArr.length-1]}`;  
                        displayDiv.textContent = `${displayValue}`;
                        operator.splice(0, 1, button.id);
                        oper = operator[0];
                        resultDiv.textContent = `${resultsArr[resultsArr.length-1]} ${oper}`;
                        number1Arr.splice(0, number1Arr.length);  
                        number2Arr.splice(0, number2Arr.length);   
                    } else if (number1Arr[0]) {
                        operator.splice(0, 1, button.id);
                        let number1 = Number(number1Arr.join(""));
                        let oper = operator[0];
                        displayValue = `${number1} ${oper}`;
                        resultDiv.textContent = `${displayValue}`;
                    }
                }

                else if (number1Arr[0]) {
                    operator.push(button.id);
                    let number1 = Number(number1Arr.join(""));
                    let oper = operator[0];
                    displayValue = `${number1} ${oper}`;
                    resultDiv.textContent = `${displayValue}`;
                }

                else {
                    resultDiv.textContent = "Please, input a number first.";
                }
            } 
            
            //If the button clicked contains class "num", fill and display variables number1Arr/number2Arr according to conditions such as having already an operator and a result or not, having a result but no operator, or not having any of those conditions. 
            else if (button.classList.contains("num")) {
                if (operator[0]) {
                    if (result[0]) {
                        number2Arr.push(button.id);
                        let number2 = Number(number2Arr.join(""));
                        let oper = operator[0];
                        displayValue = `${resultsArr[resultsArr.length-1]} ${oper} ${number2}`;
                        resultDiv.textContent = `${displayValue}`;
                    } else {
                        number2Arr.push(Number(button.id));
                        let number1 = Number(number1Arr.join(""));
                        let number2 = Number(number2Arr.join(""));
                        let oper = operator[0];
                        displayValue = `${number1} ${oper} ${number2}`;
                        resultDiv.textContent = `${displayValue}`;
                    }
                    
                } else {
                    if (result[0]) {
                        number1Arr.splice(0, number1Arr.length);
                        number1Arr.push(button.id);
                        let number1 = Number(number1Arr.join(""));
                        displayValue = `${number1}`;
                        resultDiv.textContent = `${displayValue}`;
                        result.splice(0, 1);
                    } else {
                        number1Arr.push(Number(button.id));
                        let number1 = Number(number1Arr.join(""));
                        displayValue = `${number1}`;
                        resultDiv.textContent = `${displayValue}`;
                    }
                }
            
            }
        });
    });
}



//Function "operate" executes the different operation functions (add, subtract, multiply or divide) based on the arguments values (a number1, a number2, and an operator). Depending on the value of the operator, it will choose which operation function to process.
function operate(num1, num2, op) {
    if (op === "+") {
        resultsArr.push(add(num1, num2));
        result.push(add(num1, num2));
    } else if (op === "-") {
        resultsArr.push(subtract(num1, num2));
        result.push(subtract(num1, num2));
    } else if (op === "*") {
        resultsArr.push(multiply(num1, num2)); 
        result.push(multiply(num1, num2));
    } else if (op === "/") {
        resultsArr.push(divide(num1, num2));
        result.push(divide(num1, num2));
    }
    console.log(resultsArr[resultsArr.length-1]);
    console.log(result[result.length-1]);
}


//Operation functions:

function add(...args) {
    let sum = 0;
    for (let arg of args) sum += arg;
    return sum;
}

function subtract(...args) {
    let subtract = args.reduce((final, current) => final - current);
    return subtract;
}

function multiply(...args) {
    let multiply = args.reduce((final, current) => final * current);
    return multiply;
}

function divide(...args) {
    let divide = args.reduce((final, current) => final / current);
    return divide;
}