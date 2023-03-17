// function to reveal and hide 'emptyHolder' status of the content section
export function reactIfEmpty(contentSection) {
  // finding empty holder in content section
  const emptyHolder = contentSection.querySelector('.js-session-data-empty-holder');

  // react on the situation
  if (contentSection.children[0] == emptyHolder) {
    emptyHolder.classList.remove('hidden');
  } else {
    emptyHolder.classList.add('hidden');
  }
}

export function revealCounterlIfNotEmpty(counterElement) {
  if (counterElement.textContent === "0") {
    counterElement.classList.add('hidden');
  } else {
    counterElement.classList.remove('hidden');
  }
}

export function setDeleterButton(line, id) {
  line.setAttribute('id', id);
}

// function to check if color combination was not saved yet
export function isUniqueCombination(combination, combinationsHolder) {
  let combinationAsString = JSON.stringify(combination);
  return combinationsHolder.combinations.every((combo) => {
    return combinationAsString != JSON.stringify(combo);
  })
}

function clearObjects(savings, issuesHolder, combinationsHolder) {
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