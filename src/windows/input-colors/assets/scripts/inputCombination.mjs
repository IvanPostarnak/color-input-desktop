import ColorCombination from './classes/ColorCombination.mjs';
import { isValidColorLength, isValidColorCode, isPossibleColorStarter } from './util/combinations/isValidColorInput.mjs';
import { setDeleterButton } from './util/session/setDeleteButton.mjs';
import { isUniqueCombination } from './util/combinations/isUniqueCombination.mjs';
import { createDeletingScriptForCombinationDeletingButton } from './util/combinations/combinationDeletingButton.mjs';
import { toggleHashtag } from './util/combinations/toggleHashtagElement.mjs';
import { toggleAcceptionStatus } from './util/combinations/toggleAcceptionStatus.mjs';
import { setColorExample } from './util/combinations/setColorExample.mjs';
import { resetInputForm } from './util/combinations/resetInputForm.mjs';
import { fillColorLineWithData } from './util/combinations/fillColorLineWithData.mjs';
import { createColorCombinationLineElement } from './util/combinations/createColorCombinationElement.mjs';
import { revealCounterlIfNotEmpty } from './util/revealCounter.mjs';
import { reactIfEmpty } from './util/revealEmptyHolder.mjs';

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
      let nextLine = createColorCombinationLineElement(saveCombination.length);
      // fill color squares with colors of saved combination
      fillColorLineWithData(nextLine, saveCombination);
      // set deleting button
      setDeleterButton(nextLine, combinationsHolder.length - 1);
      // set script of deleting button
      createDeletingScriptForCombinationDeletingButton(nextLine, combinationsHolder);
      // prepend created line
      sessionDataWindowContentCombinations.prepend(nextLine);
      // react if line is no longer empty
      reactIfEmpty(sessionDataWindowContentCombinations);
      // reset form using hand-made function because we need to clear colors
      resetInputForm(inputCombinationForm);
    } else {
      alert("Combination of colors needs at least 2 colors...");
    }
  })
}
