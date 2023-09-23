let number1 = 4;
let number2 = 2;
let operator = "+";


let result = [];


function operate() {
    if (operator === "+") {
        result.push(add(number1, number2));
    } else if (operator === "-") {
        result.push(subtract(number1, number2));
    } else if (operator === "x") {
        result.push(multiply(number1, number2)); 
    } else if (operator === "/") {
        result.push(divide(number1, number2));
    }
    return result[result.length-1];
}

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