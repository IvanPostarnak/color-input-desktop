// popup revealer
export function revealPopupWindow(popupWindow) {
  popupWindow.classList.remove('hidden');

  document.addEventListener('click', (event) => {
    if (event.target === popupWindow) {
      hidePopupWindow(popupWindow);
    }
  });
}

// popup hider
export function hidePopupWindow(popupWindow) {
  popupWindow.classList.add('hidden');
}