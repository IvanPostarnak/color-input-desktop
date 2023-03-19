import { revealWindow } from './util/revealAndHideWindow.mjs';
import { clearObjects } from './util/util.mjs';
import { revealCounterlIfNotEmpty } from './util/revealCounter.mjs';

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
    revealWindow(sessionDataWindow);
  });
  
  issuesDataOpener.addEventListener('click', (event) => {
    event.stopPropagation();
    // hide combinations - reveal issues
    sessionDataWindowContentCombinations.classList.add('hidden');
    sessionDataWindowContentIssues.classList.remove('hidden');
    revealWindow(sessionDataWindow);
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
}

export function extractColorCombinationsIntoSavings(savings, combinationsHolder) {
  if (combinationsHolder.combinations == undefined) return;
  combinationsHolder.combinations.forEach((combination) => {
    savings.combinations.push(JSON.parse(JSON.stringify(combination)));
    savings.length += combinationsHolder.length;
  })
}

export function extractIssuesIntoSavings(savings, issuesHolder) {
  if (issuesHolder.issues == undefined) return;
  issuesHolder.issues.forEach((issue) => {
    savings.issues.push(JSON.parse(JSON.stringify(issue)));
    savings.length += issuesHolder.length;
  })
}

export function setDateOfSavings(savings) {
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

export function sendSavings() {

}