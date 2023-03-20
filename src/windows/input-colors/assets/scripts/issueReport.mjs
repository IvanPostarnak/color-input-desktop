import { revealSubWindow, hideSubWindow } from './util/revealHideSubWindow.mjs';
import { convertTextToStandard } from './util/issues/convertTextToStandard.mjs';
import { revealCounterlIfNotEmpty } from './util/revealCounter.mjs';
import { createIssueNoteElement } from './util/session/render/createIssueNoteElement.mjs';
import { fillIssueNoteWithData } from './util/session/render/fillIssueNoteWithData.mjs';
import { setDeleterButton } from './util/session/render/setDeleteButton.mjs';
import { createDeletingScriptForIssueDeletingButton } from './util/session/render/issueDeletingButton.mjs';
import { reactIfEmpty } from './util/revealEmptyHolder.mjs';
import Issue from './classes/Issue.mjs';

const issueOpener = document.querySelector('.js-issue-popup-opener');
const issueReportWindow = document.querySelector('.js-issue-report-window');
const issueReportForm = document.querySelector('.js-issue-report-form');

const sessionDataController = document.querySelector('.js-session-data-controller');
const sessionDataIssuesCounter = sessionDataController.querySelector('.js-issues-data-controller-counter');
const sessionDataWindow = document.querySelector('.js-session-data-window');
const sessionDataWindowContentIssues = sessionDataWindow.querySelector('.js-session-data-content-issues');


export function makeIssueOpenerOpenWindow() {
  issueOpener.addEventListener('click', (event) => {
    event.stopPropagation();
    revealSubWindow(issueReportWindow);
  });
}


export function makeIssueReportFormSaveReport(issuesHolder) {
  issueReportForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let originalIssueName = issueReportForm.querySelector('.js-issue-report-form-name').value;
    let originalIssueDescription = issueReportForm.querySelector('.js-issue-report-form-description').value;
    let convertedIssueName = convertTextToStandard(originalIssueName);
    let convertedIssueDescription = convertTextToStandard(originalIssueDescription);

    let createdIssue = new Issue();
    createdIssue.name = convertedIssueName;
    createdIssue.description = convertedIssueDescription;

    issuesHolder.issues.push(createdIssue);
    issuesHolder.length = issuesHolder.issues.length;
    sessionDataIssuesCounter.textContent = issuesHolder.length;
    revealCounterlIfNotEmpty(sessionDataIssuesCounter);

    let issueNote = createIssueNoteElement();
    fillIssueNoteWithData(issueNote, createdIssue);
    setDeleterButton(issueNote, issuesHolder.length - 1);
    createDeletingScriptForIssueDeletingButton(issueNote, issuesHolder);

    sessionDataWindowContentIssues.prepend(issueNote);
    reactIfEmpty(sessionDataWindowContentIssues);

    issueReportForm.reset();
    hideSubWindow(issueReportWindow);
  })
}