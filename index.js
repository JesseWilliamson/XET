const { app, BrowserWindow, ipcMain, Menu } = require('electron')

let mainWindow = null;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#FFF',
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools({ mode: 'detach' });
  

}

app.whenReady().then(createMainWindow) 


app.on('ready', function(){
  const template = [
    {
      label: 'File',
      submenu: [ 
        {
          label: 'Open',
          click: function(){
            const { ipcMain } = require('electron');
            mainWindow.webContents.send('openFile');
          }
        },
        {
          label: 'Save As',
          click: function(){
            const { ipcMain } = require('electron');
            mainWindow.webContents.send('saveFileAs');
          }
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})
