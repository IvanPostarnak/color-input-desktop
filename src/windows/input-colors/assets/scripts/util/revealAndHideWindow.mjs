export function revealWindow(window) {
  window.classList.remove('hidden');

  document.addEventListener('click', (event) => {
    if (event.target === window) {
      hideWindow(window);
    }
  });
}

export function hideWindow(window) {
  window.classList.add('hidden');
}