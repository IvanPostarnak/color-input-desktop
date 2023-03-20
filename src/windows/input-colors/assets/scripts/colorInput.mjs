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


makeSessionDataOpenersOpenWindow();
makeSessionDataSavingButtonSaveData(combinationsHolder, issuesHolder, savings);

makeIssueOpenerOpenWindow();
makeIssueReportFormSaveReport(issuesHolder);

makeColorInputsValidateInputs();
makeColorInputFormSaveCombination(combinationsHolder);
