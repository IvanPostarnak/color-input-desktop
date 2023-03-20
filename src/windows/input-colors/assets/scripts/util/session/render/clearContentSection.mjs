export function clearContentSection(contentSection) {
  const emptyHolder = contentSection.querySelector('.js-session-data-empty-holder');
  const cloneOfEmptyHolder = emptyHolder.cloneNode(true);
  cloneOfEmptyHolder.classList.remove('hidden');

  contentSection.textContent = "";
  contentSection.append(cloneOfEmptyHolder);
}