const AUTHOR = "author";

const MIN_AMOUNT_OF_COLORS = 2;
const MAX_AMOUNT_OF_COLORS = 6;
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
class ColorCombination {
  colors = [];

  static minLength = MIN_AMOUNT_OF_COLORS;
  static maxLength = MAX_AMOUNT_OF_COLORS;
  length = 0;

  quality = 100.00;
  approvedStatus = false;

  date = "";
  history = "";

  author = AUTHOR;

  constructor() {
    
  };

  isEmpty() {
    return this.length < 1 ? true : false;
  }

  isFull() {
    return this.length === this.getMaxLength() ? true : false;
  }

  isReadyToSave() {
    return this.length >= ColorCombination.getMinLength() ? true : false;
  }

  setColorAt(index, value) {
    this.colors[index] = value;
    this.length++;
  }

  removeColorAt(index) {
    if (this.colors[index] === undefined) {
      return;
    }
      
    this.colors[index] = undefined;
    this.length--;
  }

  getLength() {
    return this.length;
  }

  static getMinLength() {
    return this.minLength;
  }

  static getMaxLength() {
    return this.maxLength;
  }

  contains(colorCodeArray) {
    let colorString = colorCodeArray.join('');
    return this.colors.some((color) => {
      return color === colorString;
    })
  }
}
/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////SESSION////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// finding session controller
const sessionController = document.querySelector('.js-session-controller');

// finding 2 counters of session statistics
const combinationsCounter = sessionController.querySelector('.js-combinations-counter');
const issuesCounter = sessionController.querySelector('.js-issues-counter');

// finding 2 session buttons of session statistics
const combinationsOpener = sessionController.querySelector('.js-combinations-button');
const issuesOpener = sessionController.querySelector('.js-issues-button');

// find session-window
const sessionPopupWindow = document.querySelector('.js-session-popup-window');

combinationsOpener.addEventListener('click', (event) => {
  event.stopPropagation();
  revealPopupWindow(sessionPopupWindow);
});

issuesOpener.addEventListener('click', (event) => {
  event.stopPropagation();
  revealPopupWindow(sessionPopupWindow);
});
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function revealCounterlIfNotEmpty(counterElement) {
  console.log(`counterElement.textContent ${counterElement.textContent}`);
  console.log(`typeof ${typeof counterElement.textContent}`);
  if (counterElement.textContent === "0") {
    counterElement.classList.add('hidden');
  } else {
    counterElement.classList.remove('hidden');
  }
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// object to save all the color combinations
const combinationsHolder = {
  combinations: [],
  length: 0,
  author: AUTHOR,
  date: ""
};

// object to save all the issues
const issuesHolder = {
  issues: [],
  length: 0,
  author: AUTHOR,
  date: ""
};
/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////MAIN//////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// find all the Input Lines of the form and transform it into array
const arrayOfInputLines = Array.from(document.querySelectorAll('.js-input-line'));

// creating new object of the ColorCombination
let combination = new ColorCombination();

// find the InputCombination form on the document
const inputForm = document.querySelector('.js-input-form');

// add eventlistener for inputForm
inputForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (combination.isReadyToSave()) {
    // saving combination into new object
    let saveCombination = JSON.parse(JSON.stringify(combination));

    // renew combination valiable
    combination = new ColorCombination();

    // push combination into combinationsHolder
    combinationsHolder.combinations.push(saveCombination);
    combinationsHolder.length = combinationsHolder.combinations.length;

    // renew counter of combinations
    combinationsCounter.textContent = combinationsHolder.length;
    revealCounterlIfNotEmpty(combinationsCounter);

    console.log(`combination = ${JSON.stringify(combination)}`);
    console.log(`saveCombination = ${JSON.stringify(saveCombination)}`);
    console.log(`combinationsHolder = ${JSON.stringify(combinationsHolder)}`);
  } else {
    alert("Combination of colors needs at least 2 colors...");
  }
})

// for each line's input HTML-tag add eventListener to read and validate Color Code
arrayOfInputLines.forEach((inputLine) => {
  // finding input html-element of the input-color-line
  let inputElement = inputLine.querySelector('.js-input');

  inputElement.addEventListener('input', () => {
    // transform string of 7 characters into array of lowerCased symbols
    let inputArray = String(inputElement.value).trim().toLowerCase().split('');

    // checking the first element if it is possible starter and ...
    let isHashtaged = isPossibleStarter(inputArray[0]);

    // ... change hashtag status if it was not hashtaged by user
    toggleHashtag(inputLine, isHashtaged, inputArray.length);
    
    // ... remove it from input if it was possible starter ("#")
    if (isHashtaged) {
      inputArray.shift();
    }

    // checking the code part of inputArray on validation and...
    let isValidCode = isValidColorCode(inputArray) 
                      && isValidColorCodeLength(inputArray.length)
                      && combination.contains(inputArray) === false;

    // ...change acception status of input line based on the isValidCode value + input.length
    toggleAcceptionStatus(inputLine, isValidCode, inputArray.length);

    // ...save it into colorCode as STRING, if it was valid
    let colorCode = undefined;
    if (isValidCode) {
      colorCode = inputArray.join('');
      combination.setColorAt(inputElement.getAttribute('id'), colorCode);
    } else {
      combination.removeColorAt(inputElement.getAttribute('id'));
    }

    console.log(`combination = ${JSON.stringify(combination)}`);

    // change color code of js-example
    setColorExample(inputLine, colorCode);

    // console.log(`hashtaged = ${isHashtaged}, isValidCode = ${isValidCode}, colorCode = ${colorCode}`);
  })
})
/////////////////////////////////////////////////////////////////////////////////////
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
    exampleMark.style.backgroundColor = TRANSPARENT;
  } else {
    exampleMark.style.backgroundColor = `#${colorCode}`;
  }
}
/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////ISSUE/////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// finding issue popup opener
const issueOpener = document.querySelector('.js-issue');

// finding popup window itself
const issuePopupWindow = document.querySelector('.js-issue-popup-window');

// add eventListener to it to reveal form to report issue
issueOpener.addEventListener('click', (event) => {
  event.stopPropagation();
  revealPopupWindow(issuePopupWindow);
});

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// popup revealer
function revealPopupWindow(popupWindow) {
  popupWindow.classList.remove('hidden');

  document.addEventListener('click', (event) => {
    if (event.target === popupWindow) {
      hidePopupWindow(popupWindow);
    }
  });
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// popup hider
function hidePopupWindow(popupWindow) {
  popupWindow.classList.add('hidden');
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
class Issue {
  name = "";
  description = "";
  attachments = [];

  status = "created";
  date = "";
  history = "";
  author = AUTHOR;

  constructor() {
    
  };
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// finding issue-report-form
const issueReportForm = document.querySelector('.js-issue-report-form');
console.log(`issuePortForm : ${issueReportForm}`);

// making issueReportForm to save reported issue on submit
  issueReportForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // standartization of input text
  let convertedName = convertToStandard(issueReportForm.querySelector('.js-issue-report-form-name').value);
  let convertedDescription = convertToStandard(issueReportForm.querySelector('.js-issue-report-form-description').value);

  // set issue variable
  let issue = new Issue();
  issue.name = convertedName;
  issue.description = convertedDescription;

  // push issue into issuesHolder
  issuesHolder.issues.push(issue);
  issuesHolder.length = issuesHolder.issues.length;

  // renew counter of combinations
  issuesCounter.textContent = issuesHolder.length;
  revealCounterlIfNotEmpty(issuesCounter);

  console.log(`issue = ${JSON.stringify(issue)}`);
  console.log(`issuesHolder = ${JSON.stringify(issuesHolder)}`);
})
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// template of universal function to convert input text into appropriate format
function convertToStandard(text) {
  let startedArrayOfSentences = text.trim().split('.');
  // console.log(`startedArray: ${startedArrayOfSentences}`);

  let loweredArrayOfSentences = startedArrayOfSentences.map((sentence) => {
    return sentence.trim().toLowerCase();
  })
  // console.log(`loweredArray: ${loweredArrayOfSentences}`);

  let capitalizedArrayOfSentences = loweredArrayOfSentences.map((sentence) => {
    if (sentence === '') {
      return;
    };
    return sentence[0].toUpperCase() + sentence.slice(1);
  })
  // console.log(`capitalArray: ${capitalizedArrayOfSentences}`);

  return capitalizedArrayOfSentences.join('. ');
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
