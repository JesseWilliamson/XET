const { app, BrowserWindow, ipcMain, Menu } = require('electron')

let mainWindow = null;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#FFF',
    width: 1000,
    height: 700,
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
            mainWindow.webContents.send('openFile');
          }
          
        },
        {
          label: 'Save As',
          accelerator: 'CmdOrCtrl+shift+s',
          click: function(){
            mainWindow.webContents.send('saveFileAs');
          }
        },
        {
          label: 'save',
          accelerator: 'CmdOrCtrl+s',
          click: function(){
            mainWindow.webContents.send('saveFile');
          }
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})
