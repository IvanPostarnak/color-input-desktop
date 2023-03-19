const MIN_AMOUNT_OF_COLORS = 2;
const MAX_AMOUNT_OF_COLORS = 6;
export const AUTHOR = "author";


export default class ColorCombination {
  colors = [];

  static minLength = MIN_AMOUNT_OF_COLORS;
  static maxLength = MAX_AMOUNT_OF_COLORS;
  length = 0;

  quality = 100.00;
  approvedStatus = false;

  date = "";
  history = "";

  author = AUTHOR;

  constructor() {
    
  };

  isEmpty() {
    return this.length < 1 ? true : false;
  }

  isFull() {
    return this.length === this.getMaxLength() ? true : false;
  }

  isReadyToSave() {
    return this.length >= ColorCombination.getMinLength() ? true : false;
  }

  setColorAt(index, value) {
    this.colors[index] = value;
    this.length++;
  }

  removeColorAt(index) {
    if (this.colors[index] === undefined) {
      return;
    }
      
    this.colors[index] = undefined;
    this.length--;
  }

  getLength() {
    return this.length;
  }

  static getMinLength() {
    return this.minLength;
  }

  static getMaxLength() {
    return this.maxLength;
  }

  contains(colorCodeArray) {
    let colorString = colorCodeArray.join('');
    return this.colors.some((color) => {
      return color === colorString;
    })
  }
}