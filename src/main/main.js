const {app} = require('electron');
const {BrowserWindow} = require('electron');

app.whenReady()
.then(() => {
  let patternsWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    // webPreferences: {
    //   preload: __dirname + "src/preloader/preloader.js"
    // },
  });

  patternsWindow.loadFile(__dirname + "/../windows/patterns/patterns.html");
  
})