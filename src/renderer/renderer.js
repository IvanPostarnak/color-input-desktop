// find theme switcher
const mainThemeSwithcer = document.querySelector('.js-main-theme-switcher');

mainThemeSwithcer.addEventListener('click', async (event) => {
  event.stopPropagation();
  await window.lightMode.toggle();
  mainThemeSwithcer.classList.toggle('main-theme-switcher__icon--to-light');
})