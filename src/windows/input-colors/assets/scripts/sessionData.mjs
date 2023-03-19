import { revealSubWindow } from './util/revealHideSubWindow.mjs';
import { setDefaultSavings } from './util/setDefault.mjs';
import { setDefaultIssuesHolder } from './util/setDefault.mjs';
import { setDefaultCombinationsHolder} from './util/setDefault.mjs';
import { revealCounterlIfNotEmpty } from './util/revealCounter.mjs';
import { extractColorCombinationsIntoSavings } from './util/session/saving/extractColorCombinations.mjs';
import { extractIssuesIntoSavings } from './util/session/saving/extractIssues.mjs';
import { setDateOfSavings } from './util/session/saving/setDate.mjs';
import { sendSavings } from './util/session/saving/sendSavings.mjs';

export function makeSessionDataOpenersOpenWindow(sessionDataController, sessionDataWindow) {
  const combinationsDataOpener = sessionDataController.querySelector('.js-combinations-data-controller-opener');
  const issuesDataOpener = sessionDataController.querySelector('.js-issues-data-controller-opener');
  const sessionDataWindowContentCombinations = sessionDataWindow.querySelector('.js-session-data-content-combinations');
  const sessionDataWindowContentIssues = sessionDataWindow.querySelector('.js-session-data-content-issues');

  combinationsDataOpener.addEventListener('click', (event) => {
    event.stopPropagation();
    // reveal combinations - hide issues
    sessionDataWindowContentCombinations.classList.remove('hidden');
    sessionDataWindowContentIssues.classList.add('hidden');
    revealSubWindow(sessionDataWindow);
  });
  
  issuesDataOpener.addEventListener('click', (event) => {
    event.stopPropagation();
    // hide combinations - reveal issues
    sessionDataWindowContentCombinations.classList.add('hidden');
    sessionDataWindowContentIssues.classList.remove('hidden');
    revealSubWindow(sessionDataWindow);
  });
}

export function makeSessionDataSavingButtonSaveData(savingButton, combinationsHolder, issuesHolder, savings, sessionDataController, sessionDataWindow) {
  const sessionDataCombinationsCounter = sessionDataController.querySelector('.js-combinations-data-controller-counter');
  const sessionDataIssuesCounter = sessionDataController.querySelector('.js-issues-data-controller-counter');
  const sessionDataWindowContentCombinations = sessionDataWindow.querySelector('.js-session-data-content-combinations');
  const sessionDataWindowContentIssues = sessionDataWindow.querySelector('.js-session-data-content-issues');

  savingButton.addEventListener('click', (event) => {
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
    setDefaultSavings(savings);
    setDefaultIssuesHolder(issuesHolder);
    setDefaultCombinationsHolder(combinationsHolder);
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
}