const {default:BrowserWindow} = await import('electron');

export async function createPatternsWindow() {
  let patternsWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: __dirname + "windows/patterns/scripts/patternsPreloader.mjs"
    },
    show: false
  });

  patternsWindow.loadFile("./patterns.html");

  return patternsWindow;
}