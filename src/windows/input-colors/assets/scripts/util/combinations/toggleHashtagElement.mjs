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