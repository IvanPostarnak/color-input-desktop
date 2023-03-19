import { revealCounterlIfNotEmpty } from '../revealCounter.mjs';
import { reactIfEmpty } from '../revealEmptyHolder.mjs';

const sessionDataController = document.querySelector('.js-session-data-controller');
const sessionDataCombinationsCounter = sessionDataController.querySelector('.js-combinations-data-controller-counter');
const sessionDataWindow = document.querySelector('.js-session-data-window');
const sessionDataWindowContentCombinations = sessionDataWindow.querySelector('.js-session-data-content-combinations');

export function createDeletingScriptForCombinationDeletingButton(line, combinationsHolder) {
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