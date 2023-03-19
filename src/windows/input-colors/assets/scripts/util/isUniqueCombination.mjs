export function isUniqueCombination(combination, combinationsHolder) {
  let combinationAsString = JSON.stringify(combination);
  return combinationsHolder.combinations.every((combo) => {
    return combinationAsString != JSON.stringify(combo);
  })
}