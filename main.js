"use: strict";

////////// DOM ELEMENTS VARIABLES //////////
const display = document.querySelector(".display");
const btnReset = document.querySelector(".reset");
const btnDelete = document.querySelector(".delete");
const btnEqual = document.querySelector(".equal");
const btnNumbers = document.querySelectorAll(".number");
const btnOperators = document.querySelectorAll(".operator");
const firstOperators = document.querySelectorAll(".first-priority");
const secOperators = document.querySelectorAll(".sec-priority");

////////// CUSTOM  VARIABLES //////////
let curDisplay,
	operator,
	tmpOperator,
	tmpResult,
	finalResult,
	operatorActive,
	lastInputOpt;

////////// FUNCTIONS //////////
// Initialize the calculator
const init = function () {
	curDisplay = operator = tmpOperator = "";
	tmpResult = finalResult = 0;
	operatorActive = false;
	lastInputOpt = true;
	btnOperators.forEach((e) => e.classList.remove("active"));
};

// Style change for active button(operators)
const styleChange = function (element) {
	if (!curDisplay) return;
	btnOperators.forEach((e) => e.classList.remove("active"));
	element.classList.add("active");
};

// Calculate Values
const calculate = function (val1 = 0, val2 = 0, opt) {
	let cal;
	val1 = Number.parseFloat(val1);
	val2 = Number.parseFloat(val2);
	switch (opt) {
		case "+":
			cal = val1 + val2;
			break;
		case "-":
			cal = val1 - val2;
			break;
		case "x":
			cal = val1 * val2;
			break;
		case "/":
			cal = val1 / val2;
			break;
	}
	return cal;
};

// Initialization
init();

// Event handlers for number inputs
btnNumbers.forEach((el) => {
	el.addEventListener("click", function () {
		if (el.textContent === ".") curDisplay = "0";
		curDisplay += el.textContent;
		display.textContent = Number.parseFloat(curDisplay);
		lastInputOpt = false;
		if (tmpOperator) {
			btnOperators.forEach((e) => e.classList.remove("active"));
		}
	});
});

// Event handlers for x and / operators
firstOperators.forEach(function (el) {
	el.addEventListener("click", function () {
		if (lastInputOpt) return;
		styleChange(el);
		if (tmpOperator) {
			tmpResult = calculate(tmpResult, curDisplay, tmpOperator);
			console.log(tmpResult);
			tmpOperator = "";
		} else {
			tmpResult = curDisplay;
		}
		tmpOperator = el.textContent;
		curDisplay = "";
		lastInputOpt = true;
	});
});

// Event handlers for + and - operators
secOperators.forEach(function (el) {
	el.addEventListener("click", function () {
		if (lastInputOpt) return;
		styleChange(el);
		if (tmpResult) {
			tmpResult = calculate(tmpResult, curDisplay, tmpOperator);
			if (operatorActive) {
				finalResult = calculate(finalResult, tmpResult, operator);
			} else {
				finalResult = tmpResult;
			}
			tmpOperator = "";
			tmpResult = 0;
		} else {
			if (operatorActive) {
				finalResult = calculate(finalResult, curDisplay, operator);
			} else {
				finalResult = curDisplay;
			}
		}
		display.textContent = Number.parseFloat(finalResult)
			.toFixed(6)
			.replace(/\.?0*$/, "");
		operator = el.textContent;
		curDisplay = "";
		operatorActive = true;
		lastInputOpt = true;
	});
});

// Event handler for equal button
btnEqual.addEventListener("click", function () {
	if (!operatorActive && !tmpResult) return;
	if (tmpResult) {
		tmpResult = curDisplay
			? calculate(tmpResult, curDisplay, tmpOperator)
			: tmpResult;
		if (operatorActive) {
			finalResult = calculate(finalResult, tmpResult, operator);
		} else {
			finalResult = tmpResult;
		}
		tmpOperator = "";
		tmpResult = 0;
	} else {
		finalResult = curDisplay
			? calculate(finalResult, curDisplay, operator)
			: finalResult;
	}
	display.textContent = Number.parseFloat(finalResult)
		.toFixed(6)
		.replace(/\.?0*$/, "");
	init();
});

// Event handler for AC button
btnReset.addEventListener("click", function () {
	init();
	display.textContent = "0";
});

// Event handler for DEL button
btnDelete.addEventListener("click", function () {
	let str = display.textContent;
	let sliceStr;
	if (str.length === 1) {
		sliceStr = "0";
		curDisplay = "";
	} else {
		sliceStr = str.slice(0, -1);
		curDisplay = sliceStr;
	}
	display.textContent = sliceStr;
});
