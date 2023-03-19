export function convertTextToStandard(text) {
  const arrayOfOriginalSentences = text.trim().split('.');

  const arrayOfLoweredSentences = arrayOfOriginalSentences.map((sentence) => {
    return sentence.trim().toLowerCase();
  })

  const arrayOfCapitalizedSentences = arrayOfLoweredSentences.map((sentence) => {
    if (sentence !== '') {
      return sentence[0].toUpperCase() + sentence.slice(1);
    } else {
      return;
    }
  })

  return arrayOfCapitalizedSentences.join('. ');
}