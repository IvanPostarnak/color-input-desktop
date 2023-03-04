const MIN_AMOUNT_OF_COLORS = 2;
let combinationLength = MIN_AMOUNT_OF_COLORS;

let firstInputLine = document.querySelector('.js-1st-input-line');
let secondInputLine = document.querySelector('.js-2nd-input-line');

    console.log(firstInputLine);
    console.log(secondInputLine);

let firstLineObject = {
  lock: firstInputLine.querySelector('.js-lock'),
  hashtag: firstInputLine.querySelector('.js-hashtag'),
  input: firstInputLine.querySelector('.js-input'),
  example: firstInputLine.querySelector('.js-example'),
  accept: firstInputLine.querySelector('.js-accept'),
  reject: firstInputLine.querySelector('.js-reject')
}

let secondLineObject = {
  lock: secondInputLine.querySelector('.js-lock'),
  hashtag: secondInputLine.querySelector('.js-hashtag'),
  input: secondInputLine.querySelector('.js-input'),
  example: secondInputLine.querySelector('.js-example'),
  accept: secondInputLine.querySelector('.js-accept'),
  reject: secondInputLine.querySelector('.js-reject')
}

    console.log(firstLineObject);
    console.log(secondLineObject);

firstLineObject.input.addEventListener('input', () => {
  let inputString = firstLineObject.input.value;

  if (isValidInput(inputString)) {
    let colorCode = extractColorCodeFromInput(inputString);
    
  }
  
});

/////////////////////////////////////////////////////////////////////////////////////

function isValidInput(input) {
  let lowerInputArray = String(input).toLowerCase().split('');
  let length = lowerInputArray.length;

  let validation = false;

  if (isValidInputLength(length)) {
    if (length === 7) {
      let fisrtSymbol = lowerInputArray.shift();
      if (isValidInputStarter(fisrtSymbol) === false) {
        return validation;
      }
    }

    if (isValidColorCode(lowerInputArray)) {
      validation = true;
    }
  }

  return validation;
}

function isValidInputLength(length) {
  const MIN_LENGTH_OF_INPUT = 6
  const MAX_LENGTH_OF_INPUT = 7

  return length >= MIN_LENGTH_OF_INPUT && length <= MAX_LENGTH_OF_INPUT ? true : false;
}

function isValidInputStarter(symbol) {
  const VALID_INPUT_STARTERS = "#";

  return VALID_INPUT_STARTERS.indexOf(symbol) > -1 ? true : false;
}

function isValidColorCode(arrayOfSymbols) {
  const VALID_COLOR_SYMBOLS = "0123456789abcdef";

  let length = arrayOfSymbols.length;

  if (isValidColorCodeLength(length)) {
    return arrayOfSymbols.every((symbol) => {
      return VALID_COLOR_SYMBOLS.indexOf(symbol) > -1;
    })
  } else {
    return false;
  }
}

function isValidColorCodeLength(length) {
  const LENGTH_OF_COLOR_CODE = 6

  return length === LENGTH_OF_COLOR_CODE ? true : false;
}

/////////////////////////////////////////////////////////////////////////////////////

function extractColorCodeFromInput(input) {
  const LENGTH_OF_COLOR_CODE = 6

  return input.length > LENGTH_OF_COLOR_CODE ? input.slice(1) : input;
}

/////////////////////////////////////////////////////////////////////////////////////