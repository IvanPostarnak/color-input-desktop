const { app } = require('electron');
const { BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const { screen } = require('electron');


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

  patternsWindow.loadFile(__dirname + "/../windows/patterns/patterns.html")
  .then(() => {
    return patternsWindow;
  })
  .catch((err) => {
    console.log(err);
  });
}

function createInputColorsWindow() {
  let inputColorsWindow = new BrowserWindow({
    title: 'Input colors',
    width: 600,
    height: 800,
    webPreferences: {
      preload: __dirname + "/../preloader/preloader.js"
    },
    resizable: false
  });

  inputColorsWindow.loadFile(__dirname + "/../windows/input-colors/input-colors.html")
  .then(() => {
    return inputColorsWindow;
  })
  .catch((err) => {
    console.log(err);
  });
}