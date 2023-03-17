import ColorCombination from './ColorCombination.mjs';
import { isValidColorLength, isValidColorCode, isPossibleColorStarter } from './isValidColorInput.mjs';
import { reactIfEmpty, setDeleterButton, revealCounterlIfNotEmpty, isUniqueCombination } from './util.mjs';

const sessionDataController = document.querySelector('.js-session-data-controller');
const sessionDataCombinationsCounter = sessionDataController.querySelector('.js-combinations-data-controller-counter');
const sessionDataWindow = document.querySelector('.js-session-data-window');
const sessionDataWindowContentCombinations = sessionDataWindow.querySelector('.js-session-data-content-combinations');

// creating new object of the ColorCombination
let combination = new ColorCombination()
export function makeColorInputsValidateInputs(arrayOfInputLines) {
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
}

export function makeColorInputFormSaveCombination(inputCombinationForm, combinationsHolder) {
  // add eventlistener for inputCombinationForm
  inputCombinationForm.addEventListener('submit', (event) => {
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
      resetForm(inputCombinationForm);
    } else {
      alert("Combination of colors needs at least 2 colors...");
    }
  })
}

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

function setColorExample(inputLine, colorCode) {
  const TRANSPARENT = "transparent";
  let exampleMark = inputLine.querySelector('.js-example');
  if (colorCode === undefined) {
    exampleMark.style.backgroundColor = TRANSPARENT;
  } else {
    exampleMark.style.backgroundColor = `#${colorCode}`;
  }
}

function resetForm(inputForm) {
  let arrayOfInputs = Array.from(inputForm.querySelectorAll('input'));
  arrayOfInputs.forEach((input) => {
    input.value = "";
    // Create and dispatch a new input event
    let event = new Event("input", { bubbles: true });
    input.dispatchEvent(event);
  })
}

function createColorCombinationLine(amount) {
  const colorLine = document.createElement('article');
  colorLine.classList.add('session-data-components__color-combination');
  for (let i = 0; i < amount; i++) {
    let colorDiv = document.createElement('div');
    colorDiv.classList.add('session-data-components__single-color');
    colorLine.append(colorDiv);
  }
  const combinationDeleter = document.createElement('button');
  combinationDeleter.classList.add('session-data-components__combination-deleter');
  colorLine.prepend(combinationDeleter);
  return colorLine;
}

function fillColorLine(line, combination) {
  let i = 1;
  combination.colors.forEach((color) => {
    line.childNodes[i].style.backgroundColor = `#${color}`;
    i++;
  })
}