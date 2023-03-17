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