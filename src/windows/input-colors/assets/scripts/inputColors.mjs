import ColorCombination from './ColorCombination.mjs';
import { convertTextToStandard } from './convertTextToStandard.mjs';
import Issue from './Issue.mjs';
import { AUTHOR } from './ColorCombination.mjs';
import { isValidColorLength, isValidColorCode, isPossibleColorStarter } from './isValidColorInput.mjs';
import { revealWindow, hideWindow } from './revealAndHideWindow.mjs';
import { clearObjects, reactIfEmpty, setDeleterButton, revealCounterlIfNotEmpty, isUniqueCombination } from './util.mjs';
import { setDateOfSavings, sendSavings, extractIssuesIntoSavings, extractColorCombinationsIntoSavings } from './savings.mjs';
import { fillIssueNote, createIssueNote } from './issueReport.mjs';
import { toggleHashtag, toggleAcceptionStatus, resetForm, setColorExample } from './inputCombination.mjs';
import { createColorCombinationLine, fillColorLine } from './sessionData.mjs';


/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////SESSION////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// finding session controller
const sessionDataController = document.querySelector('.js-session-data-controller');
const sessionDataCombinationsCounter = sessionDataController.querySelector('.js-combinations-data-controller-counter');
const sessionDataIssuesCounter = sessionDataController.querySelector('.js-issues-data-controller-counter');
const combinationsDataOpener = sessionDataController.querySelector('.js-combinations-data-controller-opener');
const issuesDataOpener = sessionDataController.querySelector('.js-issues-data-controller-opener');

combinationsDataOpener.addEventListener('click', (event) => {
  event.stopPropagation();
  // reveal combinations - hide issues
  sessionDataWindowContentCombinations.classList.remove('hidden');
  sessionDataWindowContentIssues.classList.add('hidden');
  // then reveal window
  revealWindow(sessionDataWindow);
});

issuesDataOpener.addEventListener('click', (event) => {
  event.stopPropagation();
  // hide combinations - reveal issues
  sessionDataWindowContentCombinations.classList.add('hidden');
  sessionDataWindowContentIssues.classList.remove('hidden');
  // then reveal window
  revealWindow(sessionDataWindow);
});

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// find session-window
const sessionDataWindow = document.querySelector('.js-session-data-window');
const sessionDataWindowContentCombinations = sessionDataWindow.querySelector('.js-session-data-content-combinations');
const sessionDataWindowContentIssues = sessionDataWindow.querySelector('.js-session-data-content-issues');
const sessionDataSavingButton = sessionDataWindow.querySelector('.js-session-data-button');

// send all the data onclick
sessionDataSavingButton.addEventListener('click', (event) => {
  event.stopPropagation();
  // extract combinations into savings
  extractColorCombinationsIntoSavings(savings, combinationsHolder);
  // extract issues into savings
  extractIssuesIntoSavings(savings, issuesHolder);
  // set 'deep' date for every saving item
  setDateOfSavings(savings);
  // sending data indeed
  sendSavings();
  // clearing current states of objects
  clearObjects(savings, issuesHolder, combinationsHolder);
  // renew counter of combinations and issues
  sessionDataCombinationsCounter.textContent = combinationsHolder.length;
  revealCounterlIfNotEmpty(sessionDataCombinationsCounter);
  sessionDataIssuesCounter.textContent = issuesHolder.length;
  revealCounterlIfNotEmpty(sessionDataIssuesCounter);
  // remove all color lines and issue notes form Session window
  // REWORK - it removes 'empty' holder
  sessionDataWindowContentIssues.textContent = "";
  sessionDataWindowContentCombinations.textContent = "";
})
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
/////////////////////////////////////////////////////////////////////////////////////

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
    sessionDataCombinationsCounter.textContent = combinationsHolder.length;
    revealCounterlIfNotEmpty(sessionDataCombinationsCounter);
    // react if line is no longer empty
    reactIfEmpty(sessionDataWindowContentCombinations);
  })
}
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
    sessionDataCombinationsCounter.textContent = combinationsHolder.length;
    revealCounterlIfNotEmpty(sessionDataCombinationsCounter);
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
    sessionDataWindowContentCombinations.prepend(nextLine);
    // react if line is no longer empty
    reactIfEmpty(sessionDataWindowContentCombinations);
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
    let isHashtaged = isPossibleColorStarter(inputArray[0]);
    // ... change hashtag status if it was not hashtaged by user
    toggleHashtag(inputLine, isHashtaged, inputArray.length);
    // ... remove it from input if it was possible starter ("#")
    if (isHashtaged) {
      inputArray.shift();
    }
    // checking the code part of inputArray on validation and...
    let isValidCode = isValidColorCode(inputArray) 
                      && isValidColorLength(inputArray.length)
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
  })
})
/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////ISSUE/////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// finding issue popup opener
const issueOpener = document.querySelector('.js-issue-popup-opener');
// finding popup window itself
const issuePopupWindow = document.querySelector('.js-issue-report-window');
// add eventListener to it to reveal form to report issue
issueOpener.addEventListener('click', (event) => {
  event.stopPropagation();
  revealWindow(issuePopupWindow);
});
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// finding issue-report-form
const issueReportForm = document.querySelector('.js-issue-report-form');

// making issueReportForm to save reported issue on submit
issueReportForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // standartization of input text
  let convertedName = convertTextToStandard(issueReportForm.querySelector('.js-issue-report-form-name').value);
  let convertedDescription = convertTextToStandard(issueReportForm.querySelector('.js-issue-report-form-description').value);
  // set issue variable
  let issue = new Issue();
  issue.name = convertedName;
  issue.description = convertedDescription;
  // push issue into issuesHolder
  issuesHolder.issues.push(issue);
  issuesHolder.length = issuesHolder.issues.length;
  // renew counter of combinations
  sessionDataIssuesCounter.textContent = issuesHolder.length;
  revealCounterlIfNotEmpty(sessionDataIssuesCounter);
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
  sessionDataWindowContentIssues.prepend(issueNote);
  // react if line is no longer empty
  reactIfEmpty(sessionDataWindowContentIssues);
  issueReportForm.reset();
  hideWindow(issuePopupWindow);
})
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// set script of removing evelemt from DOM and issues holder
function createDeletingScriptForDeletingIssueButton(issueNote, issuesHolder) {
  issueNote.lastChild.addEventListener('click', () => {
    // get id of deleting combination
    let deletingId = issueNote.getAttribute('id');
    // delete this combination from saved issues
    issuesHolder.issues.splice(deletingId, 1);
    issuesHolder.length = issuesHolder.issues.length;
    // delete this issueNote from the DOM
    issueNote.remove()
    // renew counter of issues
    sessionDataIssuesCounter.textContent = issuesHolder.length;
    revealCounterlIfNotEmpty(sessionDataIssuesCounter);
    // react if line is no longer empty
    reactIfEmpty(sessionDataWindowContentIssues);
  })
}