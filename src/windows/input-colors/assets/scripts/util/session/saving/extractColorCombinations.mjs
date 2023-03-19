export function extractColorCombinationsIntoSavings(savings, combinationsHolder) {
  if (combinationsHolder.combinations == undefined) return;
  combinationsHolder.combinations.forEach((combination) => {
    savings.combinations.push(JSON.parse(JSON.stringify(combination)));
    savings.length += combinationsHolder.length;
  })
}