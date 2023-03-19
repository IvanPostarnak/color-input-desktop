export function fillColorLineWithData(line, combination) {
  let i = 1;
  combination.colors.forEach((color) => {
    line.childNodes[i].style.backgroundColor = `#${color}`;
    i++;
  })
}