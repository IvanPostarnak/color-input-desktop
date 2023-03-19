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