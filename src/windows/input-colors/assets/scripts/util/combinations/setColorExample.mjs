export function setColorExample(inputLine, colorCode) {
  const TRANSPARENT = "transparent";
  let exampleMark = inputLine.querySelector('.js-example');
  if (colorCode === undefined) {
    exampleMark.style.backgroundColor = TRANSPARENT;
  } else {
    exampleMark.style.backgroundColor = `#${colorCode}`;
  }
}