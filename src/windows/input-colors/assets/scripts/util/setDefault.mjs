import { AUTHOR } from '../classes/ColorCombination.mjs';

export function setDefaultSavings(savings) {
  savings.combinations = [];
  savings.issues = [];
  savings.length = 0;
  savings.author = AUTHOR;
  savings.date = "";
}

export function setDefaultIssuesHolder(issuesHolder) {
  issuesHolder.issues = [];
  issuesHolder.length = 0;
  issuesHolder.author = AUTHOR;
  issuesHolder.date = "";
}

export function setDefaultCombinationsHolder(combinationsHolder) {
  combinationsHolder.combinations = [];
  combinationsHolder.length = 0;
  combinationsHolder.author = AUTHOR;
  combinationsHolder.date = "";
}