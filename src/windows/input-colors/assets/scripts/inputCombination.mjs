export function toggleHashtag(inputLine, isHashtaged, lengthOfColorCode) {
  // finding hashtag element of the color line
  let hashtagMark = inputLine.querySelector('.js-hashtag');
  // if colorCode is empty - turn switcher off
  // otherwise choose state based on the hashtaged status
  if (lengthOfColorCode === 0 || isHashtaged) {
    hashtagMark.classList.add('unactive');
  } else {
    hashtagMark.classList.remove('unactive');
  }
}

export function toggleAcceptionStatus(inputLine, isValidCode, lengthOfColorCode) {
  // finding 2 elements of the color line: accept and reject
  let acceptMark = inputLine.querySelector('.js-accept');
  let rejectMark = inputLine.querySelector('.js-reject');
  // if colorCode is empty - turn switcher off
  // otherwise choose state based on the validation status
  if (lengthOfColorCode === 0) {
    acceptMark.classList.add('unactive');
    rejectMark.classList.add('unactive');
  } else if (isValidCode) {
    acceptMark.classList.remove('unactive');
    rejectMark.classList.add('unactive');
  } else {
    acceptMark.classList.add('unactive');
    rejectMark.classList.remove('unactive');
  }
}

export function setColorExample(inputLine, colorCode) {
  const TRANSPARENT = "transparent";
  let exampleMark = inputLine.querySelector('.js-example');
  if (colorCode === undefined) {
    exampleMark.style.backgroundColor = TRANSPARENT;
  } else {
    exampleMark.style.backgroundColor = `#${colorCode}`;
  }
}

export function resetForm(inputForm) {
  let arrayOfInputs = Array.from(inputForm.querySelectorAll('input'));
  arrayOfInputs.forEach((input) => {
    input.value = "";
    // Create and dispatch a new input event
    let event = new Event("input", { bubbles: true });
    input.dispatchEvent(event);
  })
}