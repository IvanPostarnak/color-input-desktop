import { revealCounterlIfNotEmpty } from './../revealCounter.mjs';
import { reactIfEmpty } from './../revealEmptyHolder.mjs';

const sessionDataWindow = document.querySelector('.js-session-data-window');
const sessionDataWindowContentIssues = sessionDataWindow.querySelector('.js-session-data-content-issues');
const sessionDataController = document.querySelector('.js-session-data-controller');
const sessionDataIssuesCounter = sessionDataController.querySelector('.js-issues-data-controller-counter');

export function createDeletingScriptForIssueDeletingButton(issueNote, issuesHolder) {
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