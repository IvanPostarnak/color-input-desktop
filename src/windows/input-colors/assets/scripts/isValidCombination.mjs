// the only possible length of color code
const LENGTH_OF_COLOR_CODE = 6;

// line of valid symbold of hexadecimal system
const VALID_COLOR_SYMBOLS = "0123456789abcdef";

// possible starter of colorcode - will be ignored by the way
const POSSIBLE_INPUT_STARTERS = "#";

export function isValidColorCodeLength(length) {
  return length === LENGTH_OF_COLOR_CODE ? true : false;
}

export function isValidColorCode(arrayOfSymbols) {
  return arrayOfSymbols.every((symbol) => {
    return VALID_COLOR_SYMBOLS.indexOf(symbol) > -1;
  });
}

export function isPossibleStarter(starterSymbol) {
  return POSSIBLE_INPUT_STARTERS.indexOf(starterSymbol) > -1 ? true : false;
}