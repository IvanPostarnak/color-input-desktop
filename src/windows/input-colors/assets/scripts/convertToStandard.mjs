// template of universal function to convert input text into appropriate format
export default function convertToStandard(text) {
  let startedArrayOfSentences = text.trim().split('.');
  // console.log(`startedArray: ${startedArrayOfSentences}`);

  let loweredArrayOfSentences = startedArrayOfSentences.map((sentence) => {
    return sentence.trim().toLowerCase();
  })
  // console.log(`loweredArray: ${loweredArrayOfSentences}`);

  let capitalizedArrayOfSentences = loweredArrayOfSentences.map((sentence) => {
    if (sentence === '') {
      return;
    };
    return sentence[0].toUpperCase() + sentence.slice(1);
  })
  // console.log(`capitalArray: ${capitalizedArrayOfSentences}`);

  return capitalizedArrayOfSentences.join('. ');
}