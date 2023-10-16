//General variables that are used by "operate" and "execute" functions.
let number1Arr = [];
let number2Arr = [];
let operator = [];
let displayValue = [];
let resultsArr = [];
let resultsArrToDisp = [];
let result = [];


const buttons = document.querySelectorAll("button");
const displayDiv = document.getElementById("calculation");
const resultDiv = document.getElementById("result");


execute();


//Function execute is called whenever the calculator buttons are clicked by the user. The result will vary according to the pressed button.
function execute() {
    buttons.forEach((button) => {
        button.addEventListener("click", () => {           
            if (button.id === "ac") {
                number1Arr.splice(0, number1Arr.length);
                number2Arr.splice(0 ,number2Arr.length);
                operator.splice(0, operator.length);
                resultsArrToDisp.splice(0, resultsArrToDisp.length);
                resultsArr.splice(0, resultsArr.length);
                result.splice(0, result.length);
                displayDiv.textContent = "";
                resultDiv.textContent = "";
            }

            else if (button.id === "erase") {
                if (number2Arr[0]) {
                    if (result[0]) {
                        number2Arr.splice(-1, 1);
                        let number1 = resultsArrToDisp[resultsArrToDisp.length-1];
                        let number2 = number2Arr.join("");
                        let oper = operator[0] === "*" ? "x" : operator[0]
                        number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                        number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                        displayValue = `${number1} ${oper} ${number2}`;
                        resultDiv.textContent = `${displayValue}`;
                    } else {
                        number2Arr.splice(-1, 1);
                        let number1 = number1Arr.join("");
                        let number2 = number2Arr.join("");
                        let oper = operator[0] === "*" ? "x" : operator[0]
                        number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                        number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                        displayValue = `${number1} ${oper} ${number2}`;
                        resultDiv.textContent = `${displayValue}`;
                    }
                } 
                
                else if (operator[0]) {
                    if (result [0]) {
                        operator.splice(0, 1);
                        number1Arr.push(result[0]);
                        let number1 = number1Arr.join("");
                        number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                        displayValue = `${number1}`;
                        resultDiv.textContent = `${displayValue}`;
                    } else {
                        operator.splice(-1, 1);
                        let number1 = number1Arr.join("");
                        number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                        displayValue = `${number1}`;
                        resultDiv.textContent = `${displayValue}`;
                    }
                }
                            
                else { 
                    if (result[0]) {
                        result.splice(0, 1);
                        number1Arr.splice(0, number1Arr.length);
                        resultDiv.textContent = "";
                    } else {
                        number1Arr.splice(-1, 1);
                        let number1 = number1Arr.join("");
                        number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                        displayValue = `${number1}`;
                        resultDiv.textContent = `${displayValue}`;
                    }
                }
            }
        

            //If "=" button is clicked and number2Arr has a value, execute "operate" taking into account the values accumulated in arrays numberArr1, operator, and numberArr2. Push the whole operation to the displayDiv and the result to the resultDIv
            else if (button.id === "=" && number2Arr[0]) {
                if (result[0]) {
                    let number1 = resultsArr[resultsArr.length-1];
                    let number1ToDisp = resultsArrToDisp[resultsArrToDisp-1];
                    let number2 = number2Arr.join("");
                    let oper = operator[0];
                    result.splice(0, result.length);
                    operate(Number(number1), Number(number2), oper);
                    oper = operator[0] === "*" ? "x" : operator[0];
                    number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                    if (resultsArrToDisp[resultsArrToDisp.length-1] === undefined) {
                        resultDiv.textContent = "Error: cannot divide by zero.";
                        operator.splice(0, operator.length);
                        resultsArrToDisp.splice(0, resultsArrToDisp.length);
                        resultsArr.splice(0, resultsArr.length);
                        result.splice(0, result.length);
                    } else {
                        displayValue = `${number1ToDisp} ${oper} ${number2} = ${resultsArrToDisp[resultsArrToDisp.length-1]}`; 
                        displayDiv.textContent = `${displayValue}`;
                        resultDiv.textContent = `${resultsArrToDisp[resultsArrToDisp.length-1]}`;
                    }
                    number1Arr.splice(0, number1Arr.length);  
                    number2Arr.splice(0, number2Arr.length);

                } else {
                    let number1 = number1Arr.join("");
                    let number2 = number2Arr.join("");
                    let oper = operator[0];
                    operate(Number(number1), Number(number2), oper);
                    oper = operator[0] === "*" ? "x" : operator[0];
                    number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                    number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                    if (resultsArrToDisp[resultsArrToDisp.length-1] === undefined) {
                        resultDiv.textContent = "Error: cannot divide by zero.";
                        operator.splice(0, operator.length);
                        resultsArrToDisp.splice(0, resultsArrToDisp.length);
                        resultsArr.splice(0, resultsArr.length);
                        result.splice(0, result.length);
                    } else {
                        displayValue = `${number1} ${oper} ${number2} = ${resultsArrToDisp[resultsArrToDisp.length-1]}`; 
                        displayDiv.textContent = `${displayValue}`;
                        resultDiv.textContent = `${resultsArrToDisp[resultsArrToDisp.length-1]}`;
                    }
                    number1Arr.splice(0, number1Arr.length);  
                    number2Arr.splice(0, number2Arr.length); 
                    operator.splice(0, operator.length);
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
                        let number2 = number2Arr.join("");
                        let oper = operator[0];
                        result.splice(0, result.length);
                        operate(Number(number1), Number(number2), oper);
                        oper = operator[0] === "*" ? "x" : operator[0];
                        if (number1.includes(".") === true) {
                            number1 = Number(number1);
                            number1 = (number1.toFixed(2)).toString();
                            number1 = number1.replace(".", ","); 
                        };
                        number2 = number2.includes(".") ? number2.replace(".", ",") : number2;

                        if (resultsArrToDisp[resultsArrToDisp.length-1] === undefined) {
                            resultDiv.textContent = "Error: cannot divide by zero.";
                            operator.splice(0, operator.length);
                            resultsArrToDisp.splice(0, resultsArrToDisp.length);
                            resultsArr.splice(0, resultsArr.length);
                            result.splice(0, result.length);
                        } else {
                            displayValue = `${number1} ${oper} ${number2} = ${resultsArrToDisp[resultsArrToDisp.length-1]}`;  
                            displayDiv.textContent = `${displayValue}`;
                            operator.splice(0, 1, button.id);
                            oper = operator[0] === "*" ? "x" : operator[0];
                            resultDiv.textContent = `${resultsArrToDisp[resultsArrToDisp.length-1]} ${oper}`;
                        }
                        number1Arr.splice(0, number1Arr.length);  
                        number2Arr.splice(0, number2Arr.length);                    
                    } else {
                        number1Arr.push(result[0]);
                        operator.splice(0, 1, button.id);
                        let number1 = number1Arr.join("");
                        let oper = operator[0] === "*" ? "x" : operator[0];
                        number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                        result.splice(0, 1);
                        displayValue = `${number1} ${oper}`;
                        resultDiv.textContent = `${displayValue}`;
                    }
                }

                else if (operator[0]) {
                    if (number1Arr[0] && number2Arr[0]) {
                        let number1 = number1Arr.join("");
                        let number2 = number2Arr.join("");
                        let oper = operator[0];
                        operate(Number(number1), Number(number2), oper);
                        oper = operator[0] === "*" ? "x" : operator[0];
                        number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                        number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                        if (resultsArrToDisp[resultsArrToDisp.length-1] === undefined) {
                            resultDiv.textContent = "Error: cannot divide by zero.";
                            operator.splice(0, operator.length);
                            resultsArrToDisp.splice(0, resultsArrToDisp.length);
                            resultsArr.splice(0, resultsArr.length);
                            result.splice(0, result.length);
                        } else {
                            displayValue = `${number1} ${oper} ${number2} = ${resultsArrToDisp[resultsArrToDisp.length-1]}`;  
                            displayDiv.textContent = `${displayValue}`;
                            operator.splice(0, 1, button.id);
                            oper = operator[0] === "*" ? "x" : operator[0];
                            resultDiv.textContent = `${resultsArrToDisp[resultsArrToDisp.length-1]} ${oper}`;
                        }
                        
                        number1Arr.splice(0, number1Arr.length);  
                        number2Arr.splice(0, number2Arr.length);   
                    } else if (number1Arr[0]) {
                        operator.splice(0, 1, button.id);
                        let number1 = number1Arr.join("");
                        let oper = operator[0] === "*" ? "x" : operator[0];
                        number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                        displayValue = `${number1} ${oper}`;
                        resultDiv.textContent = `${displayValue}`;
                    }
                }

                else if (number1Arr[0]) {
                    operator.push(button.id);
                    let number1 = number1Arr.join("");
                    let oper = operator[0] === "*" ? "x" : operator[0];
                    number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
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
                        if (!number2Arr[0] && button.id === ".") {
                            let oper = operator[0] === "*" ? "x" : operator[0];
                            displayValue = `${resultsArrToDisp[resultsArrToDisp.length-1]} ${oper}`;
                            resultDiv.textContent = `${displayValue}`;
                        }
                        else if (button.id === "." && number2Arr.includes(".")) {
                            let number2 = number2Arr.join("");
                            let oper = operator[0] === "*" ? "x" : operator[0];
                            number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                            displayValue = `${resultsArrToDisp[resultsArrToDisp.length-1]} ${oper} ${number2}`;
                            resultDiv.textContent = `${displayValue}`;
                        } else {
                            if (button.id === "negative") {
                                if (number2Arr.includes("-")) {
                                    number2Arr.splice(0, 1);
                                    let number2 = number2Arr.join("");
                                    let oper = operator[0] === "*" ? "x" : operator[0];
                                    number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                                    displayValue = `${resultsArrToDisp[resultsArrToDisp.length-1]} ${oper} ${number2}`;
                                    resultDiv.textContent = `${displayValue}`;
                                } else {
                                    number2Arr.unshift("-");
                                    let number2 = number2Arr.join("");
                                    let oper = operator[0] === "*" ? "x" : operator[0];
                                    number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                                    displayValue = `${resultsArrToDisp[resultsArrToDisp.length-1]} ${oper} ${number2}`;
                                    resultDiv.textContent = `${displayValue}`;
                                }
                            
                            } else {
                                number2Arr.push(button.id);
                                let number2 = number2Arr.join("");
                                let oper = operator[0] === "*" ? "x" : operator[0];
                                number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                                displayValue = `${resultsArrToDisp[resultsArrToDisp.length-1]} ${oper} ${number2}`;
                                resultDiv.textContent = `${displayValue}`;
                            }
                        }
                    } else {
                        if (!number2Arr[0] && button.id === ".") {
                            let number1 = number1Arr.join("");
                            let oper = operator[0] === "*" ? "x" : operator[0];
                            number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                            displayValue = `${number1} ${oper}`;
                            resultDiv.textContent = `${displayValue}`;
                        } else if (button.id === "." && number2Arr.includes(".")) {
                            let number1 = number1Arr.join("");
                            let number2 = number2Arr.join("");
                            let oper = operator[0] === "*" ? "x" : operator[0];
                            number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                            number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                            displayValue = `${number1} ${oper} ${number2}`;
                            resultDiv.textContent = `${displayValue}`;
                        } else {
                            if (button.id === "negative") {
                                if (number2Arr.includes("-")) {
                                    number2Arr.splice(0, 1);
                                    let number1 = number1Arr.join("");
                                    let number2 = number2Arr.join("");
                                    let oper = operator[0] === "*" ? "x" : operator[0];
                                    number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                                    number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                                    displayValue = `${number1} ${oper} ${number2}`;
                                    resultDiv.textContent = `${displayValue}`;
                                } else {
                                    number2Arr.unshift("-");
                                    let number1 = number1Arr.join("");
                                    let number2 = number2Arr.join("");
                                    let oper = operator[0] === "*" ? "x" : operator[0];
                                    number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                                    number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                                    displayValue = `${number1} ${oper} ${number2}`;
                                    resultDiv.textContent = `${displayValue}`;
                                }
                            } else {
                                number2Arr.push(button.id);
                                let number1 = number1Arr.join("");
                                let number2 = number2Arr.join("");
                                let oper = operator[0] === "*" ? "x" : operator[0];
                                number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                                number2 = number2.includes(".") ? number2.replace(".", ",") : number2;
                                displayValue = `${number1} ${oper} ${number2}`;
                                resultDiv.textContent = `${displayValue}`;
                            }
                        }
                    }
                    
                } else {
                    if (result[0]) {
                        if (!number1Arr[0] && button.id === ".") {
                            displayValue = `${resultsArrToDisp[resultsArrToDisp.length-1]}`;
                            resultDiv.textContent = `${displayValue}`;
                        } else if (button.id === "." && number1Arr.includes(".")) {
                            let number1 = number1Arr.join("");
                            number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                            displayValue = `${number1}`;
                            resultDiv.textContent = `${displayValue}`;
                            result.splice(0, 1);
                        } else {
                            if (button.id === "negative" && number1Arr[0]) {
                                if (number1Arr.includes("-")) {
                                    number1Arr.splice(0, 1);
                                    let number1 = number1Arr.join("");
                                    number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                                    displayValue = `${number1}`;
                                    resultDiv.textContent = `${displayValue}`;
                                    result.splice(0, 1);
                                } else {
                                    number1Arr.unshift("-");
                                    let number1 = number1Arr.join("");
                                    number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                                    displayValue = `${number1}`;
                                    resultDiv.textContent = `${displayValue}`;
                                    result.splice(0, 1);
                                }
                            } else {
                                number1Arr.push(button.id);
                                let number1 = number1Arr.join("");
                                number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                                displayValue = `${number1}`;
                                resultDiv.textContent = `${displayValue}`;
                                result.splice(0, 1);
                            }
                        }
                    } else {
                        if (button.id === "negative" && number1Arr[0]) {
                            if (number1Arr.includes("-")) {
                                number1Arr.splice(0, 1);
                                let number1 = number1Arr.join("");
                                number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                                displayValue = `${number1}`;
                                resultDiv.textContent = `${displayValue}`;
                            } else {
                                number1Arr.unshift("-");
                                let number1 = number1Arr.join("");
                                number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                                displayValue = `${number1}`;
                                resultDiv.textContent = `${displayValue}`;
                            }
                        } else {
                            if (button.id === "negative") {
                                number1Arr.push("-");
                                let number1 = number1Arr.join("");
                                number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                                displayValue = `${number1}`;
                                resultDiv.textContent = `${displayValue}`;
                            } else {
                                if (!number1Arr[0] && button.id === ".") {
                                    resultDiv.textContent = "";
                                } else if (button.id === "." && number1Arr.includes(".")) {
                                    let number1 = number1Arr.join("");
                                    number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                                    displayValue = `${number1}`;
                                    resultDiv.textContent = `${displayValue}`;
                                } else {
                                    number1Arr.push(button.id);
                                    let number1 = number1Arr.join("");
                                    number1 = number1.includes(".") ? number1.replace(".", ",") : number1;
                                    displayValue = `${number1}`;
                                    resultDiv.textContent = `${displayValue}`;
                                }
                            }
                        }
                    }
                }
            
            }
        });
    });
}



//Function "operate" executes the different operation functions (add, subtract, multiply or divide) based on the arguments values (a number1, a number2, and an operator). Depending on the value of the operator, it will choose which operation function to process. It pushes the results to different arrays to be later used by function "execute".
function operate(num1, num2, op) {
    let solution;

    if (op === "+") {
        solution = `${add(num1, num2)}`;
        if (solution.includes(".") === true) {
            solution = Number(solution);
            solution = (solution.toFixed(2)).toString();
            solution = solution.replace(".", ",");
            resultsArrToDisp.push(solution);
            resultsArr.push(add(num1, num2).toFixed(2));
            result.push(add(num1, num2).toFixed(2));
        } else {
            solution = Number(solution);
            resultsArrToDisp.push(solution);
            resultsArr.push(add(num1, num2));
            result.push(add(num1, num2));
        }
    } else if (op === "-") {
        solution = `${subtract(num1, num2)}`;
        if (solution.includes(".") === true) {
            solution = Number(solution);
            solution = (solution.toFixed(2)).toString();
            solution = solution.replace(".", ",");
            resultsArrToDisp.push(solution);
            resultsArr.push(subtract(num1, num2).toFixed(2));
            result.push(subtract(num1, num2).toFixed(2));
        } else {
            solution = Number(solution);
            resultsArrToDisp.push(solution);
            resultsArr.push(subtract(num1, num2));
            result.push(subtract(num1, num2));
        }
    } else if (op === "*") {
        solution = `${multiply(num1, num2)}`;
        if (solution.includes(".") === true) {
            solution = Number(solution);
            solution = (solution.toFixed(2)).toString();
            solution = solution.replace(".", ",");
            resultsArrToDisp.push(solution);
            resultsArr.push(multiply(num1, num2).toFixed(2));
            result.push(multiply(num1, num2).toFixed(2));
        } else {
            solution = Number(solution);
            resultsArrToDisp.push(solution);
            resultsArr.push(multiply(num1, num2));
            result.push(multiply(num1, num2));
        }
    } else if (op === "/") {
        if (num2 === 0) {
            solution = undefined;
            resultsArrToDisp.push(solution);
        } else {
            solution = `${divide(num1, num2)}`;
            if (solution.includes(".") === true) {
                solution = Number(solution);
                solution = (solution.toFixed(2)).toString();
                solution = solution.replace(".", ",");
                resultsArrToDisp.push(solution);
                resultsArr.push(divide(num1, num2).toFixed(2));
                result.push(divide(num1, num2).toFixed(2));
            } else {
                solution = Number(solution);
                resultsArrToDisp.push(solution);
                resultsArr.push(divide(num1, num2));
                result.push(divide(num1, num2));
            }
        }
    }
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





// In case erase function would go ack to previous results and operations, this code would be a starter (located inside erase (operate[0] condition)):

// if (result[0]) {
                        // if (resultDiv.textContent.includes(`${operator[0]}`)) {
                        //     operator.splice(0, 1);
                        //     let number1 = resultsArrToDisp[resultsArrToDisp.length-1];
                        //     displayValue = `${number1}`;
                        //     resultDiv.textContent = `${displayValue}`;
                        // } else {
                        //     resultsArrToDisp.splice(-1, 1);
                        //     resultsArr.splice(-1, 1);
                        //     let prevOperation = (displayDiv.textContent).split("");
                        //     console.log(prevOperation);
                        //     if (prevOperation.includes("+")) {
                        //         let index1 = prevOperation.indexOf("+");
                        //         for (let i = 0; i < index1; i++) {
                        //             if (prevOperation[i] !== " ") {
                        //                 number1Arr.push(prevOperation[i]);
                        //             }
                        //         }
                        //         let index2 = prevOperation.indexOf("=");
                        //         for (let j = index2-1; j > index1; j--) {
                        //             if (prevOperation[j] !== " ") {
                        //                 number2Arr.unshift(prevOperation[j]);
                        //             }
                        //         }
                        //         result.splice(0, 1);
                        //         let number1 = number1Arr.join("");
                        //         let number2 = number2Arr.join("");
                        //         let oper = operator[0];
                        //         displayValue = `${number1} ${oper} ${number2}`;
                        //         displayDiv.textContent = "";
                        //         resultDiv.textContent = `${displayValue}`;

                        //     } else if (prevOperation.includes("-")) {
                        //         let index1 = prevOperation.findIndex((element) => element === " ");
                        //         console.log(index1);
                        //         for (let i = 0; i < (index1+1); i++) {
                        //             if (prevOperation[i] !== " ") {
                        //                 number1Arr.push(prevOperation[i]);
                        //             }
                        //         }
                        //         let index2 = prevOperation.indexOf("=");
                        //         for (let j = index2-1; j > index1+1; j--) {
                        //             if (prevOperation[j] !== " ") {
                        //                 number2Arr.unshift(prevOperation[j]);
                        //             }
                        //         }
                        //         result.splice(0, 1);
                        //         let number1 = number1Arr.join("");
                        //         let number2 = number2Arr.join("");
                        //         let oper = operator[0];
                        //         displayValue = `${number1} ${oper} ${number2}`;
                        //         displayDiv.textContent = "";
                        //         resultDiv.textContent = `${displayValue}`;

                        //     } else if (prevOperation.includes("x")) {
                        //         let index1 = prevOperation.indexOf("x");
                        //         for (let i = 0; i < index1; i++) {
                        //             if (prevOperation[i] !== " ") {
                        //                 number1Arr.push(prevOperation[i]);
                        //             }
                        //         }
                        //         let index2 = prevOperation.indexOf("=");
                        //         for (let j = index2-1; j > index1; j--) {
                        //             if (prevOperation[j] !== " ") {
                        //                 number2Arr.unshift(prevOperation[j]);
                        //             }
                        //         }
                        //         result.splice(0, 1);
                        //         let number1 = number1Arr.join("");
                        //         let number2 = number2Arr.join("");
                        //         let oper = operator[0].replace("*", "x");
                        //         displayValue = `${number1} ${oper} ${number2}`;
                        //         displayDiv.textContent = "";
                        //         resultDiv.textContent = `${displayValue}`;

                        //     } else if (prevOperation.includes("/")) {
                        //         let index1 = prevOperation.indexOf("/");
                        //         for (let i = 0; i < index1; i++) {
                        //             if (prevOperation[i] !== " ") {
                        //                 number1Arr.push(prevOperation[i]);
                        //             }
                        //         }
                        //         let index2 = prevOperation.indexOf("=");
                        //         for (let j = index2-1; j > index1; j--) {
                        //             if (prevOperation[j] !== " ") {
                        //                 number2Arr.unshift(prevOperation[j]);
                        //             }
                        //         }
                        //         result.splice(0, 1);
                        //         let number1 = number1Arr.join("");
                        //         let number2 = number2Arr.join("");
                        //         let oper = operator[0];
                        //         displayValue = `${number1} ${oper} ${number2}`;
                        //         displayDiv.textContent = "";
                        //         resultDiv.textContent = `${displayValue}`;
                        //     }
                        // }
                    // } else {