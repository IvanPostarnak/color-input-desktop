import { isValidColorLength, isValidColorCode, isPossibleColorStarter } from './util/combinations/isValidColorInput.mjs';
import { setDeleterButton } from './util/session/render/setDeleteButton.mjs';
import { isUniqueCombination } from './util/combinations/isUniqueCombination.mjs';
import { createDeletingScriptForCombinationDeletingButton } from './util/session/render/combinationDeletingButton.mjs';
import { toggleHashtag } from './util/combinations/toggleHashtagElement.mjs';
import { toggleAcceptionStatus } from './util/combinations/toggleAcceptionStatus.mjs';
import { setColorExample } from './util/combinations/setColorExample.mjs';
import { resetInputForm } from './util/combinations/resetInputForm.mjs';
import { fillColorLineWithData } from './util/session/render/fillColorLineWithData.mjs';
import { createColorCombinationLineElement } from './util/session/render/createColorCombinationElement.mjs';
import { revealCounterlIfNotEmpty } from './util/revealCounter.mjs';
import { reactIfEmpty } from './util/revealEmptyHolder.mjs';
import ColorCombination from './classes/ColorCombination.mjs';

const arrayOfInputLines = Array.from(document.querySelectorAll('.js-input-line'));
const inputCombinationForm = document.querySelector('.js-input-form');

const sessionDataController = document.querySelector('.js-session-data-controller');
const sessionDataCombinationsCounter = sessionDataController.querySelector('.js-combinations-data-controller-counter');
const sessionDataWindow = document.querySelector('.js-session-data-window');
const sessionDataWindowContentCombinations = sessionDataWindow.querySelector('.js-session-data-content-combinations');

let combination = new ColorCombination()

export function makeColorInputsValidateInputs() {
  arrayOfInputLines.forEach((inputLine) => {
    let inputElement = inputLine.querySelector('.js-input');

    inputElement.addEventListener('input', () => {
      let loweredInputArray = String(inputElement.value).trim().toLowerCase().split('');
      let isHashtaged = isPossibleColorStarter(loweredInputArray[0]);

      toggleHashtag(inputLine, isHashtaged, loweredInputArray.length);
      if (isHashtaged) {
        loweredInputArray.shift();
      }
      
      let isValidCode = isValidColorCode(loweredInputArray) 
                        && isValidColorLength(loweredInputArray.length)
                        && combination.contains(loweredInputArray) === false;
    
      
      toggleAcceptionStatus(inputLine, isValidCode, loweredInputArray.length);

      let colorCode = undefined;
      if (isValidCode) {
        colorCode = loweredInputArray.join('');
        combination.setColorAt(inputElement.getAttribute('id'), colorCode);
      } else {
        combination.removeColorAt(inputElement.getAttribute('id'));
      }
      
      setColorExample(inputLine, colorCode);
    })
  })
}

export function makeColorInputFormSaveCombination(combinationsHolder) {
  inputCombinationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (combination.isReadyToSave() && isUniqueCombination(combination, combinationsHolder)) {
      let saveCombination = new ColorCombination();
      combination.colors.forEach((color) => {
        if (color != null) {
          saveCombination.colors.push(color);
        }
      })
      saveCombination.length = saveCombination.colors.length;

      combinationsHolder.combinations.push(saveCombination);
      combinationsHolder.length = combinationsHolder.combinations.length;
      sessionDataCombinationsCounter.textContent = combinationsHolder.length;
      revealCounterlIfNotEmpty(sessionDataCombinationsCounter);

      let nextLine = createColorCombinationLineElement(saveCombination.length);
      fillColorLineWithData(nextLine, saveCombination);
      setDeleterButton(nextLine, combinationsHolder.length - 1);
      createDeletingScriptForCombinationDeletingButton(nextLine, combinationsHolder);

      sessionDataWindowContentCombinations.prepend(nextLine);
      reactIfEmpty(sessionDataWindowContentCombinations);

      resetInputForm(inputCombinationForm);
      combination = new ColorCombination();
    }
  })
}
