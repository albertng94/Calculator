console.log(add(8, 9, 30, -10));
console.log(subtract(10, 2));
console.log(multiply(3, 4));
console.log(divide(4, 2));





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