import {createPatternsWindow} from '/windows/patterns/patterns.msj'

const { default:app} = await import('electron');
const { default:BrowserWindow } = await import('electron');

app.whenReady()
.then(() => {
  const patternsWindow = createPatternsWindow();
  patternsWindow.once('ready-to-show', () => {
    patternsWindow.show();
  })
})