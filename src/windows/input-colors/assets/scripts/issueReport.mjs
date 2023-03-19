import { revealSubWindow, hideSubWindow } from './util/revealHideSubWindow.mjs';
import { convertTextToStandard } from './util/issues/convertTextToStandard.mjs';
import { fillIssueNoteWithData } from './util/issues/fillIssueNoteWithData.mjs';
import { createDeletingScriptForIssueDeletingButton } from './util/issues/issueDeletingButton.mjs';
import { createIssueNoteElement } from './util/issues/createIssueNoteElement.mjs';
import { setDeleterButton } from './util/session/setDeleteButton.mjs';
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
    revealSubWindow(issueReportWindow);
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
    let issueNote = createIssueNoteElement();
    // fill color squares with colors of saved combination
    fillIssueNoteWithData(issueNote, issue);
    // set deleting button
    setDeleterButton(issueNote, issuesHolder.length - 1);
    // set script of deleting button
    createDeletingScriptForIssueDeletingButton(issueNote, issuesHolder);
    // prepend created issue note
    sessionDataWindowContentIssues.prepend(issueNote);
    // react if line is no longer empty
    reactIfEmpty(sessionDataWindowContentIssues);
    issueReportForm.reset();
    hideSubWindow(issueReportWindow);
  })
}