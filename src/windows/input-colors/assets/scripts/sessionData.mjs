import { revealSubWindow } from './util/revealHideSubWindow.mjs';
import { extractColorCombinationsIntoSavings } from './util/session/saving/extractColorCombinations.mjs';
import { extractIssuesIntoSavings } from './util/session/saving/extractIssues.mjs';
import { setDateOfSavings } from './util/session/saving/setDate.mjs';
import { sendSavings } from './util/session/saving/sendSavings.mjs';
import { setDefaultSavings, setDefaultIssuesHolder, setDefaultCombinationsHolder } from './util/setDefault.mjs';
import { revealCounterlIfNotEmpty } from './util/revealCounter.mjs';
import { clearContentSection } from './util/session/render/clearContentSection.mjs';

const sessionDataController = document.querySelector('.js-session-data-controller');
const combinationsDataOpener = sessionDataController.querySelector('.js-combinations-data-controller-opener');
const issuesDataOpener = sessionDataController.querySelector('.js-issues-data-controller-opener');
const sessionDataCombinationsCounter = sessionDataController.querySelector('.js-combinations-data-controller-counter');
const sessionDataIssuesCounter = sessionDataController.querySelector('.js-issues-data-controller-counter');

const sessionDataWindow = document.querySelector('.js-session-data-window');
const sessionDataWindowContentCombinations = sessionDataWindow.querySelector('.js-session-data-content-combinations');
const sessionDataWindowContentIssues = sessionDataWindow.querySelector('.js-session-data-content-issues');
const sessionDataSavingButton = sessionDataWindow.querySelector('.js-session-data-button');


export function makeSessionDataOpenersOpenWindow() {
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


export function makeSessionDataSavingButtonSaveData(combinationsHolder, issuesHolder, savings) {
  sessionDataSavingButton.addEventListener('click', (event) => {
    event.stopPropagation();

    extractColorCombinationsIntoSavings(savings, combinationsHolder);
    extractIssuesIntoSavings(savings, issuesHolder);
    setDateOfSavings(savings);

    let promise = sendSavings(savings);
    promise.then((response) => {
      if (response.status === 200) {
        // clearing current states of objects
        setDefaultSavings(savings);
        setDefaultIssuesHolder(issuesHolder);
        setDefaultCombinationsHolder(combinationsHolder);

        // renew counter of combinations and issues
        sessionDataCombinationsCounter.textContent = combinationsHolder.length;
        sessionDataIssuesCounter.textContent = issuesHolder.length;
        revealCounterlIfNotEmpty(sessionDataCombinationsCounter);
        revealCounterlIfNotEmpty(sessionDataIssuesCounter);

        // remove all color lines and issue notes from Session window
        clearContentSection(sessionDataWindowContentIssues);
        clearContentSection(sessionDataWindowContentCombinations);
      } else {
        setDefaultSavings(savings);
      }
    })
  })
}