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