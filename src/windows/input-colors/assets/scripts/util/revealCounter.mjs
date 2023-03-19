export function revealCounterlIfNotEmpty(counterElement) {
  if (counterElement.textContent === "0") {
    counterElement.classList.add('hidden');
  } else {
    counterElement.classList.remove('hidden');
  }
}