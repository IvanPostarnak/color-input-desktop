export function reactIfEmpty(contentSection) {
  const emptyHolder = contentSection.querySelector('.js-session-data-empty-holder');

  if (contentSection.children[0] == emptyHolder) {
    emptyHolder.classList.remove('hidden');
  } else {
    emptyHolder.classList.add('hidden');
  }
}