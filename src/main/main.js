const path = require('path');
const { app } = require('electron');
const { BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const { screen } = require('electron');
const { nativeTheme } = require('electron');

nativeTheme.themeSource = 'dark';

app.whenReady()
.then(() => {
  let inputColorsWindow = createInputColorsWindow();

  inputColorsWindow.once('ready-to-show', () => {
    inputColorsWindow.show();
  });
})
.catch((err) => {
  
})

app.on('window-all-closed', () => {
  app.quit();
})

ipcMain.handle('light-mode:toggle', toggleMainTheme);

function createInputColorsWindow() {
  let inputColorsWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "..", "preloader", "preloader.js")
    },
    resizable: false,
    alwaysOnTop: true
  });

  inputColorsWindow.loadFile(__dirname + "/../windows/input-colors/input-colors.html")
  .then(() => {
    return inputColorsWindow;
  })
  .catch((err) => {
    console.log(err);
  });
}

function toggleMainTheme() {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light';
  } else {
    nativeTheme.themeSource = 'dark';
  }
  return nativeTheme.shouldUseDarkColors;
}

// function createPatternsWindow() {
//   let primaryDisplay = screen.getPrimaryDisplay();
//   let {width, height} = primaryDisplay.workAreaSize;

//   let patternsWindow = new BrowserWindow({
//     title: 'Beauty Code',
//     width: width,
//     height: height,
//     webPreferences: {
//       preload: __dirname + "/../preloader/preloader.js"
//     },
//     show: false
//   });

//   patternsWindow.loadFile(__dirname + "/../windows/patterns/patterns.html")
//   .then(() => {
//     return patternsWindow;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }