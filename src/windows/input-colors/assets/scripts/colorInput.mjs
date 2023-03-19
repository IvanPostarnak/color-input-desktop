import { AUTHOR } from './classes/ColorCombination.mjs';
import { makeIssueOpenerOpenWindow, makeIssueReportFormSaveReport } from './issueReport.mjs';
import { makeColorInputsValidateInputs, makeColorInputFormSaveCombination} from './inputCombination.mjs';
import { makeSessionDataOpenersOpenWindow, makeSessionDataSavingButtonSaveData } from './sessionData.mjs';


// object to save all the color combinations
const combinationsHolder = {
  combinations: [],
  length: 0,
  author: AUTHOR,
  date: ""
};

// object to save all the issues
const issuesHolder = {
  issues: [],
  length: 0,
  author: AUTHOR,
  date: ""
};

// object to controll savings before sending them
const savings = {
  combinations: [],
  issues: [],
  length: 0,
  author: AUTHOR,
  date: ""
};


const sessionDataController = document.querySelector('.js-session-data-controller');
const sessionDataWindow = document.querySelector('.js-session-data-window');
const sessionDataSavingButton = sessionDataWindow.querySelector('.js-session-data-button');

makeSessionDataOpenersOpenWindow(sessionDataController, sessionDataWindow);
makeSessionDataSavingButtonSaveData(sessionDataSavingButton, combinationsHolder, issuesHolder, savings, sessionDataController, sessionDataWindow);

const issueOpener = document.querySelector('.js-issue-popup-opener');
const issueReportWindow = document.querySelector('.js-issue-report-window');
const issueReportForm = document.querySelector('.js-issue-report-form');

makeIssueOpenerOpenWindow(issueOpener, issueReportWindow);
makeIssueReportFormSaveReport(issueReportForm, issueReportWindow, issuesHolder);

const arrayOfInputLines = Array.from(document.querySelectorAll('.js-input-line'));
const inputCombinationForm = document.querySelector('.js-input-form');

makeColorInputsValidateInputs(arrayOfInputLines);
makeColorInputFormSaveCombination(inputCombinationForm, combinationsHolder);
