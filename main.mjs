import {createPatternsWindow} from '/windows/patterns/patterns.msj'

const {app} = require('electron');
const {BrowserWindow} = require('electron');

app.whenReady()
.then(() => {
  const patternsWindow = createPatternsWindow();
  patternsWindow.once('ready-to-show', () => {
    patternsWindow.show();
  })
})