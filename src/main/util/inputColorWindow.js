const { BrowserWindow } = require('electron');
const path = require('path');

function createInputColorsWindow(title) {
  const PRELOADER_PATH = path.resolve(__dirname, '..', '..', 'preloader', 'preloader.js');
  const WINDOW_FILE_PATH = path.resolve(__dirname, '..', '..', 'windows', 'input-colors', 'color-input.html');
  const WINDOW_ICON_PATH = path.resolve(__dirname, '..', '..', 'windows', 'input-colors', 'assets', 'img', 'color-input-favicon.ico');
  
  let inputColorsWindow = new BrowserWindow({
    title: title,
    width: 600,
    height: 800,
    webPreferences: {
      preload: PRELOADER_PATH
    },
    resizable: false,
    alwaysOnTop: true,
  });

  inputColorsWindow.loadFile(WINDOW_FILE_PATH)
  .then(() => {
    return inputColorsWindow;
  })
  .catch((err) => {
    console.log(err);
  });

  inputColorsWindow.setIcon(WINDOW_ICON_PATH);
}

module.exports = createInputColorsWindow;