export function revealSubWindow(subWindowElement) {
  subWindowElement.classList.remove('hidden');

  document.addEventListener('click', (event) => {
    if (event.target === subWindowElement) {
      hideSubWindow(subWindowElement);
    }
  });
}

export function hideSubWindow(subWindowElement) {
  subWindowElement.classList.add('hidden');
}