import { revealWindow, hideWindow } from './util/revealAndHideWindow.mjs';
import { convertTextToStandard } from './util/convertTextToStandard.mjs';
import { setDeleterButton } from './util/util.mjs';
import { revealCounterlIfNotEmpty } from './util/revealCounter.mjs';
import { reactIfEmpty } from './util/revealEmptyHolder.mjs';
import Issue from './classes/Issue.mjs';

const sessionDataController = document.querySelector('.js-session-data-controller');
const sessionDataIssuesCounter = sessionDataController.querySelector('.js-issues-data-controller-counter');
const sessionDataWindow = document.querySelector('.js-session-data-window');
const sessionDataWindowContentIssues = sessionDataWindow.querySelector('.js-session-data-content-issues');

export function makeIssueOpenerOpenWindow(issueOpener, issueReportWindow) {
  issueOpener.addEventListener('click', (event) => {
    event.stopPropagation();
    revealWindow(issueReportWindow);
  });
}

export function makeIssueReportFormSaveReport(issueReportForm, issueReportWindow, issuesHolder) {
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
    hideWindow(issueReportWindow);
  })
}

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

// function to fill IssueNote with actual data
function fillIssueNote(issueNote, issue) {
  issueNote.childNodes[0].textContent = issue.name;
  issueNote.childNodes[1].textContent = issue.description;
}

// function to create new issue note
function createIssueNote() {
  // creating issue note itself
  const issueNote = document.createElement('article');
  issueNote.classList.add('session-data-components__issue-note');

  // creating h2 tag for name of issue
  const issueNoteName = document.createElement('h2');
  issueNoteName.classList.add('session-data-components__issue-note-name');
  issueNote.append(issueNoteName);

  // creating p tag for text of issue
  const issueNoteDescription = document.createElement('p');
  issueNoteDescription.classList.add('session-data-components__issue-note-name');
  issueNote.append(issueNoteDescription);

  // creating deleting button
  const issueNoteDeleter = document.createElement('button');
  issueNoteDeleter.classList.add('session-data-components__issue-note-deleter');
  issueNote.append(issueNoteDeleter);

  return issueNote;
}