const path = require('path');
const { app } = require('electron');
const { BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const { nativeTheme } = require('electron');
const { Menu } = require('electron');

const createInputColorsWindow = require('./util/inputColorWindow');


const TITLE = 'Color Input';

nativeTheme.themeSource = 'dark';
Menu.setApplicationMenu(false);

app.whenReady()
.then(() => {
  let inputColorsWindow = createInputColorsWindow(TITLE);

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



function toggleMainTheme() {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light';
  } else {
    nativeTheme.themeSource = 'dark';
  }
  return nativeTheme.shouldUseDarkColors;
}