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
accent = document.getElementById('accent')
pageText = document.getElementById('pageText')
scrollbarBackgroundColor = document.getElementById('scrollbarBackgroundColor')
scrollbarThumbColor = document.getElementById('scrollbarThumbColor')
scrollbarWidth = document.getElementById('scrollbarWidth')
document.documentElement.style.setProperty('--primary', store.get('primaryColor'));
document.documentElement.style.setProperty('--secondary', store.get('secondaryColor'));
document.documentElement.style.setProperty('--accent', store.get('accentColor'));
document.documentElement.style.setProperty('--text', store.get('textColor'));
document.documentElement.style.setProperty('--scrollbarBackgroundColor', store.get('storeScrollbarBackgroundColor'));
document.documentElement.style.setProperty('--scrollbarThumbColor', store.get('storeScrollbarThumbColor'));
document.documentElement.style.setProperty('--scrollbarWidth', store.get('storeScrollbarWidth'));


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

accent.value = store.get('accentColor')
accent.addEventListener('change', function () {
  // console.log('accent update')
  // console.log(store.get(accentColor))
  store.set('accentColor', accent.value);
  ipcRenderer.sendSync('accentPrefsUpdate')
  document.documentElement.style.setProperty('--accent', store.get('accentColor'));
})

text.value = store.get('textColor')
text.addEventListener('change', function () {
  store.set('textColor', text.value);
  ipcRenderer.sendSync('textPrefsUpdate')
  document.documentElement.style.setProperty('--text', store.get('textColor'));
})




scrollbarBackgroundColor.value = store.get('storeScrollbarBackgroundColor')
scrollbarBackgroundColor.addEventListener('change', function () {
  store.set('storeScrollbarBackgroundColor', scrollbarBackgroundColor.value);
  ipcRenderer.sendSync('scrollbarBackgroundColorPrefsUpdate')
})

scrollbarThumbColor.value = store.get('storeScrollbarThumbColor')
scrollbarThumbColor.addEventListener('change', function () {
  store.set('storeScrollbarThumbColor', scrollbarThumbColor.value);
  ipcRenderer.sendSync('scrollbarThumbColorPrefsUpdate')
})


scrollbarWidth.value = store.get('storeScrollbarWidth')
scrollbarWidth.addEventListener('change', function () {
  store.set('storeScrollbarWidth', scrollbarWidth.value);
  ipcRenderer.sendSync('scrollbarWidthPrefsUpdate')
})
