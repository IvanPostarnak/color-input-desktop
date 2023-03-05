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

    // checking the first element if it is possible starter and ...
    let isHashtaged = isPossibleStarter(inputArray[0]);

    // ... change hashtag status if it was not hashtaged by user
    toggleHashtag(inputLine, isHashtaged, inputArray.length);
    
    // ... remove it from input if it was possible starter ("#")
    if (isHashtaged) {
      inputArray.shift();
    }

    // checking the code part of inputArray on validation and...
    let isValidCode = isValidColorCode(inputArray) && isValidColorCodeLength(inputArray.length);

    // ...change acception status of input line based on the isValidCode value + input.length
    toggleAcceptionStatus(inputLine, isValidCode, inputArray.length);

    // ...save it into colorCode as STRING, if it was valid
    let colorCode = undefined;
    if (isValidCode) {
      colorCode = inputArray.join('');
    }

    // change color code of js-example
    setColorExample(inputLine, colorCode);

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
function toggleAcceptionStatus(inputLine, isValidCode, lengthOfColorCode) {
  // finding 2 elements of the color line: accept and reject
  let acceptMark = inputLine.querySelector('.js-accept');
  let rejectMark = inputLine.querySelector('.js-reject');
  
  // if colorCode is empty - turn switcher off
  // otherwise choose state based on the validation status
  if (lengthOfColorCode === 0) {
    acceptMark.classList.add('unactive');
    rejectMark.classList.add('unactive');
  } else if (isValidCode) {
    acceptMark.classList.remove('unactive');
    rejectMark.classList.add('unactive');
  } else {
    acceptMark.classList.add('unactive');
    rejectMark.classList.remove('unactive');
  }
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function toggleHashtag(inputLine, isHashtaged, lengthOfColorCode) {
  // finding hashtag element of the color line
  let hashtagMark = inputLine.querySelector('.js-hashtag');
  
  // if colorCode is empty - turn switcher off
  // otherwise choose state based on the hashtaged status
  if (lengthOfColorCode === 0 || isHashtaged) {
    hashtagMark.classList.add('unactive');
  } else {
    hashtagMark.classList.remove('unactive');
  }
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// default value of the color's example
const TRANSPARENT = "transparent";

function setColorExample(inputLine, colorCode) {
  // fincdong js-example element of color line
  let exampleMark = inputLine.querySelector('.js-example');

  // if colorCode is unefined - set transparent value
  // otherwise - set color's value
  if (colorCode === undefined) {
    console.log('trying to set transparent');
    exampleMark.style.backgroundColor = TRANSPARENT;
  } else {
    exampleMark.style.backgroundColor = `#${colorCode}`;
  }
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////