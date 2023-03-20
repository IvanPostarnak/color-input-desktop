const { nativeTheme } = require('electron');

function toggleMainTheme() {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light';
  } else {
    nativeTheme.themeSource = 'dark';
  }
  return nativeTheme.shouldUseDarkColors;
}

module.exports = toggleMainTheme;