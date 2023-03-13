const { contextBridge } = require('electron');
const { ipcRenderer } = require('electron');

// change of main theme
contextBridge.exposeInMainWorld('lightMode', {
  toggle: () => ipcRenderer.invoke('light-mode:toggle')
})