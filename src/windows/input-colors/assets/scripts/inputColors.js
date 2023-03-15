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

// find session-popup-content combinations section
const sessionWindowContentCombinations = document.querySelector('.js-session-popup-content-combinations');

// find session-popup-content issues section
const sessionWindowContentIssues = document.querySelector('.js-session-popup-content-issues');

// find session submit savings button
const sessionWindowButton = document.querySelector('.js-session-popup-button');

combinationsOpener.addEventListener('click', (event) => {
  event.stopPropagation();

  // toggle content of session window to combinations
  sessionWindowContentCombinations.classList.remove('hidden');
  sessionWindowContentIssues.classList.add('hidden');

  // reveal window
  revealPopupWindow(sessionPopupWindow);
});

issuesOpener.addEventListener('click', (event) => {
  event.stopPropagation();
  
  // toggle content of session window to issues
  sessionWindowContentCombinations.classList.add('hidden');
  sessionWindowContentIssues.classList.remove('hidden');

  // reveal window
  revealPopupWindow(sessionPopupWindow);
});

// add event listener to send all the data onclick
sessionWindowButton.addEventListener('click', (event) => {
  event.stopPropagation();
  
  // extract combinations into savings
  extractColorCombinationsIntoSavings(savings, combinationsHolder);

  // extract issues into savings
  extractIssuesIntoSavings(savings, issuesHolder);

  // set 'deep' date for every saving item
  setDateOfSavings(savings);

  // sending data indeed
  sendSavings();

  console.log(`savings: ${JSON.stringify(savings)}`);

  // clearing current states of objects
  clearObjects(savings, issuesHolder, combinationsHolder);

  // renew counter of combinations and issues
  combinationsCounter.textContent = combinationsHolder.length;
  revealCounterlIfNotEmpty(combinationsCounter);
  issuesCounter.textContent = issuesHolder.length;
  revealCounterlIfNotEmpty(issuesCounter);

  // remove all color lines and issue notes form Session window
  sessionWindowContentIssues.textContent = "";
  sessionWindowContentCombinations.textContent = "";

  hidePopupWindow(sessionPopupWindow);
})
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// function to reveal and hide 'empty' status of the content section
function reactIfEmpty(contentSection) {
  // finding empty holder on the page
  const empty = contentSection.querySelector('.js-empty-holder');

  // react on the situation
  if (contentSection.children[0] == empty) {
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
  }
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function extractColorCombinationsIntoSavings(savings, combinationsHolder) {
  if (combinationsHolder.combinations == undefined) return;
  combinationsHolder.combinations.forEach((combination) => {
    savings.combinations.push(JSON.parse(JSON.stringify(combination)));
    savings.length += combinationsHolder.length;
  })
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function extractIssuesIntoSavings(savings, issuesHolder) {
  if (issuesHolder.issues == undefined) return;
  issuesHolder.issues.forEach((issue) => {
    savings.issues.push(JSON.parse(JSON.stringify(issue)));
    savings.length += issuesHolder.length;
  })
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function setDateOfSavings(savings) {
  if (savings.length === 0) return;
  let timeOfSendingSavings = new Date();
  
  if (savings.combinations != undefined) {
    savings.combinations.forEach((combination) => {
      combination.date = timeOfSendingSavings;
    })
  }

  if (savings.issues != undefined) {
    savings.issues.forEach((issue) => {
      issue.date = timeOfSendingSavings;
    })
  }

  savings.date = timeOfSendingSavings;
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function sendSavings() {

}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function clearObjects(savings, issuesHolder, combinationsHolder) {
  savings.combinations = [];
  savings.issues = [];
  savings.length = 0;
  savings.author = AUTHOR;
  savings.date = "";

  combinationsHolder.combinations = [];
  combinationsHolder.length = 0;
  combinationsHolder.author = AUTHOR;
  combinationsHolder.date = "";

  issuesHolder.issues = [];
  issuesHolder.length = 0;
  issuesHolder.author = AUTHOR;
  issuesHolder.date = "";
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function revealCounterlIfNotEmpty(counterElement) {
  if (counterElement.textContent === "0") {
    counterElement.classList.add('hidden');
  } else {
    counterElement.classList.remove('hidden');
  }
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// function to create new color combination line for amount colors
function createColorCombinationLine(amount) {
  // creating color line itself
  const colorLine = document.createElement('article');
  colorLine.classList.add('session-buttons__color-combination');

  // creating div's to hold colors
  for (let i = 0; i < amount; i++) {
    let colorDiv = document.createElement('div');
    colorDiv.classList.add('session-buttons__single-color');
    colorLine.append(colorDiv);
  }

  // creating deleting button
  const combinationDeleter = document.createElement('button');
  combinationDeleter.classList.add('session-buttons__combination-deleter');
  colorLine.prepend(combinationDeleter);

  return colorLine;
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// function to fill created color line with colors
function fillColorLine(line, combination) {
  let i = 1;
  combination.colors.forEach((color) => {
    line.childNodes[i].style.backgroundColor = `#${color}`;
    i++;
  })
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// just bound deleting button to 
function setDeleterButton(line, id) {
  // bounding color line to combination itself using id
  line.setAttribute('id', id);
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// set script of removing evelemt from DOM and combinations holder
function createDeletingScriptForDeletingCombinationButton(line, combinationsHolder) {
  line.childNodes[0].addEventListener('click', () => {
    // get id of deleting combination
    let deletengId = line.getAttribute('id');
    console.log(`deleting id: ${deletengId}`);

    // delete this combination from saved combinations
    combinationsHolder.combinations.splice(deletengId, 1);
    combinationsHolder.length = combinationsHolder.combinations.length;
    console.log(`combinationsHolder = ${JSON.stringify(combinationsHolder)}`);

    // delete this line from the DOM
    line.remove()

    // renew counter of combinations
    combinationsCounter.textContent = combinationsHolder.length;
    revealCounterlIfNotEmpty(combinationsCounter);

    // react if line is no longer empty
    reactIfEmpty(sessionWindowContentCombinations);
  })
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

// object to controll savings before sending them
const savings = {
  combinations: [],
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

  if (combination.isReadyToSave() && isUniqueCombination(combination, combinationsHolder)) {
    // saving combination into new object
    let saveCombination = new ColorCombination();

    // clear saveCombination from null-s
    combination.colors.forEach((color) => {
      if (color != null) {
        saveCombination.colors.push(color);
      }
    })
    saveCombination.length = saveCombination.colors.length;

    // renew combination valiable
    combination = new ColorCombination();

    // push combination into combinationsHolder
    combinationsHolder.combinations.push(saveCombination);
    combinationsHolder.length = combinationsHolder.combinations.length;

    // renew counter of combinations
    combinationsCounter.textContent = combinationsHolder.length;
    revealCounterlIfNotEmpty(combinationsCounter);

    // add colorLine of new combination into session window
    // create one color line using JS
    let nextLine = createColorCombinationLine(saveCombination.length);

    // fill color squares with colors of saved combination
    fillColorLine(nextLine, saveCombination);

    // set deleting button
    setDeleterButton(nextLine, combinationsHolder.length - 1);

    // set script of deleting button
    createDeletingScriptForDeletingCombinationButton(nextLine, combinationsHolder);

    // prepend created line
    sessionWindowContentCombinations.prepend(nextLine);

    // react if line is no longer empty
    reactIfEmpty(sessionWindowContentCombinations);

    // reset form using hand-made function because we need to clear colors
    resetForm(inputForm);

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

    // change color code of js-example
    setColorExample(inputLine, colorCode);

    // console.log(`hashtaged = ${isHashtaged}, isValidCode = ${isValidCode}, colorCode = ${colorCode}`);
  })
})
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function resetForm(inputForm) {
  let arrayOfInputs = Array.from(inputForm.querySelectorAll('input'));
  arrayOfInputs.forEach((input) => {
    input.value = "";

    // Create and dispatch a new input event
    let event = new Event("input", { bubbles: true });
    input.dispatchEvent(event);
  })
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// function to check if color combination was not saved yet
function isUniqueCombination(combination, combinationsHolder) {
  let combinationAsString = JSON.stringify(combination);
  return combinationsHolder.combinations.every((combo) => {
    return combinationAsString != JSON.stringify(combo);
  })
}
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

  // add colorLine of new combination into session window
  // create one color line using JS
  let issueNote = createIssueNote();

  // fill color squares with colors of saved combination
  fillIssueNote(issueNote, issue);

  // set deleting button
  setDeleterButton(issueNote, issuesHolder.length - 1);

  // set script of deleting button
  createDeletingScriptForDeletingIssueButton(issueNote, issuesHolder);

  // prepend created issue note
  sessionWindowContentIssues.prepend(issueNote);

  // react if line is no longer empty
  reactIfEmpty(sessionWindowContentIssues);

  issueReportForm.reset();
  hidePopupWindow(issuePopupWindow);
})

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// function to create new issue note
function createIssueNote() {
  // creating issue note itself
  const issueNote = document.createElement('article');
  issueNote.classList.add('session-buttons__issue-note');

  // creating h2 tag for name of issue
  const issueNoteName = document.createElement('h2');
  issueNoteName.classList.add('session-buttons__issue-note-name');
  issueNote.append(issueNoteName);

  // creating p tag for text of issue
  const issueNoteDescription = document.createElement('p');
  issueNoteDescription.classList.add('session-buttons__issue-note-name');
  issueNote.append(issueNoteDescription);

  // creating deleting button
  const issueNoteDeleter = document.createElement('button');
  issueNoteDeleter.classList.add('session-buttons__issue-note-deleter');
  issueNote.append(issueNoteDeleter);

  return issueNote;
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// function to fill IssueNote with actual data
function fillIssueNote(issueNote, issue) {
  issueNote.childNodes[0].textContent = issue.name;
  issueNote.childNodes[1].textContent = issue.description;
}
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// set script of removing evelemt from DOM and issues holder
function createDeletingScriptForDeletingIssueButton(issueNote, issuesHolder) {
  issueNote.lastChild.addEventListener('click', () => {
    // get id of deleting combination
    let deletengId = issueNote.getAttribute('id');
    console.log(`deleting id: ${deletengId}`);

    // delete this combination from saved issues
    issuesHolder.issues.splice(deletengId, 1);
    issuesHolder.length = issuesHolder.issues.length;
    console.log(`issuesHolder = ${JSON.stringify(issuesHolder)}`);

    // delete this issueNote from the DOM
    issueNote.remove()

    // renew counter of issues
    issuesCounter.textContent = issuesHolder.length;
    revealCounterlIfNotEmpty(issuesCounter);

    // react if line is no longer empty
    reactIfEmpty(sessionWindowContentIssues);
  })
}
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
//////////////////////////////THEME SWITCHER/////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
