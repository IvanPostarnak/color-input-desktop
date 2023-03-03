const {app} = require('electron');
const {BrowserWindow} = require('electron');

app.whenReady()
.then(() => {
  let patternsWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    // webPreferences: {
    //   preload: __dirname + "src/preloader/preloader.js"
    // },
  });

  patternsWindow.loadFile(__dirname + "/../windows/patterns/patterns.html");
  
})