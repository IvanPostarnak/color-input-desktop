export function isValidColorLength(length) {
  const LENGTH_OF_COLOR_CODE = 6;
  return length === LENGTH_OF_COLOR_CODE ? true : false;
}

export function isValidColorCode(arrayOfSymbols) {
  const VALID_COLOR_SYMBOLS = "0123456789abcdef";
  return arrayOfSymbols.every((symbol) => {
    return VALID_COLOR_SYMBOLS.indexOf(symbol) > -1;
  });
}

export function isPossibleColorStarter(starterSymbol) {
  const POSSIBLE_COLOR_STARTERS = "#";
  return POSSIBLE_COLOR_STARTERS.indexOf(starterSymbol) > -1 ? true : false;
}