const { app } = require('electron');
const { BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const { screen } = require('electron');


app.whenReady()
.then(() => {
  let patternsWindow = createPatternsWindow();
  let inputColorsWindow = createInputColorsWindow();

  inputColorsWindow.once('ready-to-show', () => {
    inputColorsWindow.show();
  });

  // patternsWindow.once('ready-to-show', () => {
  //   patternsWindow.show();
  // });

})
.catch((err) => {
  
})


function createPatternsWindow() {
  let primaryDisplay = screen.getPrimaryDisplay();
  let {width, height} = primaryDisplay.workAreaSize;

  let patternsWindow = new BrowserWindow({
    title: 'Beauty Code',
    width: width,
    height: height,
    webPreferences: {
      preload: __dirname + "/../preloader/preloader.js"
    },
    show: false
  });

  patternsWindow.loadFile(__dirname + "/../windows/patterns/patterns.html");

  return patternsWindow;
}

function createInputColorsWindow() {
  let inputColorsWindow = new BrowserWindow({
    title: 'Input colors...',
    width: 1000,
    height: 600,
    webPreferences: {
      preload: __dirname + "/../preloader/preloader.js"
    },
  });

  // inputColorWindow.loadFile(__dirname + "/../windows/patterns/patterns.html");

  return inputColorsWindow;
}