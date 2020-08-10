const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron')
const contextMenu = require('electron-context-menu');

let mainWindow;
let prefWindow;

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

}

const createPrefWindow = () => {
  prefWindow = new BrowserWindow({
    width: 800,
    height: 500,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  // and load the index.html of the app.
  prefWindow.loadFile('preferences.html')

  prefWindow.webContents.openDevTools({ mode: 'detach' });
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
          label: 'Save',
          accelerator: 'CmdOrCtrl+s',
          click: function(){
            mainWindow.webContents.send('saveFile');
          }
        },
        {
          label: 'Preferences',
          click: function(){
            createPrefWindow()
          }
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  


  contextMenu({
    options: (showSearchWithGoogle = false),
    prepend: (defaultActions, params, browserWindow) => [
      {
        label: 'Search Google for “{selection}”',
        // Only show it when right-clicking text
        visible: params.selectionText.trim().length > 0,
        click: () => {
          shell.openExternal(`https://google.com/search?q=${encodeURIComponent(params.selectionText)}`);
        }
      },
      {
        label: 'Search DuckDuckGo for “{selection}”',
        // Only show it when right-clicking text
        visible: params.selectionText.trim().length > 0,
        click: () => {
          shell.openExternal(`https://duckduckgo.com/?q=${encodeURIComponent(params.selectionText)}`);
        }
      }
    ]
  });
})


ipcMain.on('secondaryPrefsUpdate', (event, arg) => {
  mainWindow.webContents.send('secondaryPrefsUpdate');
  event.returnValue = "received";
})
ipcMain.on('primaryPrefsUpdate', (event, arg) => {
  mainWindow.webContents.send('primaryPrefsUpdate');
  event.returnValue = "received";
})
ipcMain.on('textPrefsUpdate', (event, arg) => {
  mainWindow.webContents.send('textPrefsUpdate');
  event.returnValue = "received";
  console.log('textind')
})