const MIN_AMOUNT_OF_COLORS = 2;
const MAX_AMOUNT_OF_COLORS = 6;
let combinationLength = MIN_AMOUNT_OF_COLORS;

// find all the Input Lines of the form and transform it into array
let arrayOfInputLines = Array.from(document.querySelectorAll('.js-input-line'));

// for each line's input HTML-tag add eventListener to read and validate Color Code
arrayOfInputLines.forEach((inputLine) => {
  inputLine.querySelector('.js-input').addEventListener('input', () => {
    // transform string of 7 characters into array of lowerCased symbols
    let inputArray = String(inputLine.querySelector('.js-input').value).trim().toLowerCase().split('');

    // checking the first element, and remove it if it is possible starter ("#")
    let isHashtaged = isPossibleStarter(inputArray[0]);
    if (isHashtaged) {
      inputArray.shift();
    }

    // checking the code part of inputArray on validation and...
    let isValidCode = isValidColorCode(inputArray) && isValidColorCodeLength(inputArray.length);

    // ...save it into colorCode as STRING, if it was valid
    let colorCode = undefined;
    if (isValidCode) {
      colorCode = inputArray.join('');
    }

    console.log(`hashtaged = ${isHashtaged}, isValidCode = ${isValidCode}, colorCode = ${colorCode}`);
  })
})

/////////////////////////////////////////////////////////////////////////////////////
// line of valid symbold of hexadecimal system
const VALID_COLOR_SYMBOLS = "0123456789abcdef";

// possible starter of colorcode - will be ignored by the way
const POSSIBLE_INPUT_STARTERS = "#";

// the only possible length of color code
const LENGTH_OF_COLOR_CODE = 6;

function isValidColorCodeLength(length) {
  return length === LENGTH_OF_COLOR_CODE ? true : false;
}

function isValidColorCode(arrayOfSymbols) {
  return arrayOfSymbols.every((symbol) => {
    return VALID_COLOR_SYMBOLS.indexOf(symbol) > -1;
  });
}

function isPossibleStarter(starterSymbol) {
  return POSSIBLE_INPUT_STARTERS.indexOf(starterSymbol) > -1 ? true : false;
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////