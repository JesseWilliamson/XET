const {
  remote,
  electron,
  ipcRenderer
} = require('electron')
const {
  copyFileSync
} = require('fs');
const Store = require('electron-store');
const store = new Store();

WIN = remote.getCurrentWindow();
WIN.removeMenu()

primary = document.getElementById('primary')
secondary = document.getElementById('secondary')
pageText = document.getElementById('pageText')
document.documentElement.style.setProperty('--primary', store.get('primaryColor'));
document.documentElement.style.setProperty('--secondary', store.get('secondaryColor'));
document.documentElement.style.setProperty('--text', store.get('textColor'));

primary.value = store.get('primaryColor')
primary.addEventListener('change', function () {
  store.set('primaryColor', primary.value);
  ipcRenderer.sendSync('primaryPrefsUpdate')
  document.documentElement.style.setProperty('--primary', store.get('primaryColor'));
})

secondary.value = store.get('secondaryColor')
secondary.addEventListener('change', function () {
  store.set('secondaryColor', secondary.value);
  ipcRenderer.sendSync('secondaryPrefsUpdate')
  document.documentElement.style.setProperty('--secondary', store.get('secondaryColor'));
})

text.value = store.get('textColor')
text.addEventListener('change', function () {
  store.set('textColor', text.value);
  ipcRenderer.sendSync('textPrefsUpdate')
  document.documentElement.style.setProperty('--text', store.get('textColor'));
})