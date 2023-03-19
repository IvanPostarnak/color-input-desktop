import { AUTHOR } from '../classes/ColorCombination.mjs';

export function clearObjects(savings, issuesHolder, combinationsHolder) {
  savings.combinations = [];
  savings.issues = [];
  savings.length = 0;
  savings.author = AUTHOR;
  savings.date = "";

  combinationsHolder.combinations = [];
  combinationsHolder.length = 0;
  combinationsHolder.author = AUTHOR;
  combinationsHolder.date = "";

  issuesHolder.issues = [];
  issuesHolder.length = 0;
  issuesHolder.author = AUTHOR;
  issuesHolder.date = "";
}