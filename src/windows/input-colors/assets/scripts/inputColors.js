const MIN_AMOUNT_OF_COLORS = 2;
const MAX_AMOUNT_OF_COLORS = 6;
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
  let inputArray = String(firstLineObject.input.value).trim().toLowerCase().split('');
  let colorCode = undefined;
  
  let isHashtaged = isValidStarter(inputArray[0]);
  if (isHashtaged) inputArray.shift();

  let isValidCode = isValidColorCode(inputArray) && isValidColorCodeLength(inputArray.length);
  if (isValidCode) {
    colorCode = inputArray.join('');
  }
  console.log(`hashtaged = ${isHashtaged}, isValidCode = ${isValidCode}, colorCode = ${colorCode}`);
});

/////////////////////////////////////////////////////////////////////////////////////
const VALID_COLOR_SYMBOLS = "0123456789abcdef";
const VALID_INPUT_STARTERS = "#";
const LENGTH_OF_COLOR_CODE = 6;

function isValidColorCodeLength(length) {
  return length === LENGTH_OF_COLOR_CODE ? true : false;
}

function isValidColorCode(arrayOfSymbols) {
  return arrayOfSymbols.every((symbol) => {
    return VALID_COLOR_SYMBOLS.indexOf(symbol) > -1;
  });
}

function isValidStarter(starterSymbol) {
  return VALID_INPUT_STARTERS.indexOf(starterSymbol) > -1 ? true : false;
}

/////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////