const { remote, electron, ipcRenderer } = require('electron')
const { copyFileSync } = require('fs');

// import settings from 'electron-settings';
WIN = remote.getCurrentWindow();
WIN.removeMenu()



const Store = require('electron-store');
const store = new Store();
 


primary = document.getElementById('primary')
secondary = document.getElementById('secondary')
pageText = document.getElementById('pageText')

primary.value = store.get('primaryColor')
primary.addEventListener('change', function(){
  store.set('primaryColor', primary.value);
  ipcRenderer.sendSync('primaryPrefsUpdate')
})

secondary.value = store.get('secondaryColor')
secondary.addEventListener('change', function(){
  store.set('secondaryColor', secondary.value);
  ipcRenderer.sendSync('secondaryPrefsUpdate')
})

text.value = store.get('textColor')
text.addEventListener('change', function(){
  store.set('textColor', text.value);
  ipcRenderer.sendSync('textPrefsUpdate')
  console.log('textout')
})
