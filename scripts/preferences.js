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

regions = [
  'en-029', 
  'en-AU',
  'en-BZ', 
  'en-CA',  
  'en-GB',
  'en-IE', 
  'en-IN',  
  'en-JM',
  'en-MY', 
  'en-NZ',  
  'en-PH',
  'en-SG', 
  'en-TT',  
  'en-US',
  'en-ZA', 
  'en-ZW'
]

console.log(regions)


var select = document.getElementById("selectRegion");
for(var i = 0; i < regions.length; i++) {
    var opt = regions[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}


uregion = document.getElementById('selectRegion')
primary = document.getElementById('primary')
secondary = document.getElementById('secondary')
pageText = document.getElementById('pageText')
document.documentElement.style.setProperty('--primary', store.get('primaryColor'));
document.documentElement.style.setProperty('--secondary', store.get('secondaryColor'));
document.documentElement.style.setProperty('--text', store.get('textColor'));

uregion.value = store.get('suregion')
uregion.addEventListener('change', function () {
  store.set('suregion', uregion.value);
  ipcRenderer.sendSync('primaryPrefsUpdate')
})


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