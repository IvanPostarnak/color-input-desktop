// combination - object of ColorCombination class
// combinationsHolder - combinationsHolder object itself
export function isUniqueCombination(combination, combinationsHolder) {
  const SINGLE_COLOR_MATCH = 1;
  const SINGLE_COLOR_NOT_MATCH = 0;

  return combinationsHolder.combinations.every((combinationFromHolder) => {
    let singleColorMatchingStatuses = [];
    if (combination.length != combinationFromHolder.length) {
      return true;
    } else {
      combination.colors.forEach((color, index) => {
        if (combinationFromHolder.colors.includes(color)) {
          singleColorMatchingStatuses[index] = SINGLE_COLOR_MATCH;
        } else {
          singleColorMatchingStatuses[index] = SINGLE_COLOR_NOT_MATCH;
        }
      });
      // false if every color matches
      return singleColorMatchingStatuses.includes(SINGLE_COLOR_NOT_MATCH);
    }
  })
}