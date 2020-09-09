const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  shell
} = require('electron')
const contextMenu = require('electron-context-menu');

let mainWindow;
let prefWindow;

//Create the main window of the application (This is where the page, sidebar, and page stats can be seen)
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
  mainWindow.loadFile('index.html')
}

//Create the preference window when needed (This is where the user can change preferences including colour, region, and sizing)
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
}

app.whenReady().then(createMainWindow)

app.on('ready', function () {
  //create the menu bar in the main window
  const template = [{
      label: 'File',
      submenu: [{
          label: 'Open',
          accelerator: 'CmdOrCtrl+o',
          click: function () {
            mainWindow.webContents.send('openFile');
          }

        },
        {
          label: 'Save As',
          accelerator: 'CmdOrCtrl+shift+s',
          click: function () {
            mainWindow.webContents.send('saveFileAs');
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+s',
          click: function () {
            mainWindow.webContents.send('saveFile');
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [{
        label: 'Preferences',
        click: function () {
          createPrefWindow()
        }
      }]
    },
    {
      label: 'Insert',
      submenu: [{
          label: 'Date',
          accelerator: 'CmdOrCtrl+d',
          click: function () {
            mainWindow.webContents.send('insertDate');
          }
        },
        {
          label: 'Date and Time',
          accelerator: 'CmdOrCtrl+shift+d',
          click: function () {
            mainWindow.webContents.send('insertDateAndTime');
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)


  // This is the right-click menu
  contextMenu({
    showSearchWithGoogle: false,
    prepend: (defaultActions, params, browserWindow) => [{
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

//Communication with the main window and the user preferences window (both in the render process)
ipcMain.on('secondaryPrefsUpdate', (event, arg) => {
  mainWindow.webContents.send('secondaryPrefsUpdate');
  event.returnValue = "received";
})
ipcMain.on('accentPrefsUpdate', (event, arg) => {
  mainWindow.webContents.send('accentPrefsUpdate');
  event.returnValue = "received";
})
ipcMain.on('primaryPrefsUpdate', (event, arg) => {
  mainWindow.webContents.send('primaryPrefsUpdate');
  event.returnValue = "received";
})
ipcMain.on('textPrefsUpdate', (event, arg) => {
  mainWindow.webContents.send('textPrefsUpdate');
  event.returnValue = "received";
})
ipcMain.on('scrollbarBackgroundColorPrefsUpdate', (event, arg) => {
  mainWindow.webContents.send('scrollbarBackgroundColorPrefsUpdate');
  event.returnValue = "received";
})
ipcMain.on('scrollbarThumbColorPrefsUpdate', (event, arg) => {
  mainWindow.webContents.send('scrollbarThumbColorPrefsUpdate');
  event.returnValue = "received";
})
ipcMain.on('scrollbarWidthPrefsUpdate', (event, arg) => {
  mainWindow.webContents.send('scrollbarWidthPrefsUpdate');
  event.returnValue = "received";
})
ipcMain.on('fontSizePrefsUpdate', (event, arg) => {
  mainWindow.webContents.send('fontSizePrefsUpdate');
  event.returnValue = "received";
})
ipcMain.on('fontFamilyPrefsUpdate', (event, arg) => {
  mainWindow.webContents.send('fontFamilyPrefsUpdate');
  event.returnValue = "received";
})