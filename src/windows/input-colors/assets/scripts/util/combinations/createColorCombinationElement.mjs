export function createColorCombinationLineElement(amount) {
  const colorLine = document.createElement('article');
  colorLine.classList.add('session-data-components__color-combination');
  for (let i = 0; i < amount; i++) {
    let colorDiv = document.createElement('div');
    colorDiv.classList.add('session-data-components__single-color');
    colorLine.append(colorDiv);
  }
  const combinationDeleter = document.createElement('button');
  combinationDeleter.classList.add('session-data-components__combination-deleter');
  colorLine.prepend(combinationDeleter);
  return colorLine;
}