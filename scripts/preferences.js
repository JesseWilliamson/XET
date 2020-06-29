const { remote, electron, ipcRenderer } = require('electron')
const { copyFileSync } = require('fs');

// import settings from 'electron-settings';
WIN = remote.getCurrentWindow();
WIN.removeMenu()



const Store = require('electron-store');
const store = new Store();
 
document.documentElement.style.setProperty('--footer-color', store.get('secondaryColor'));

secondary = document.getElementById('secondary')
secondary.value = store.get('secondaryColor')
secondary.addEventListener('change', function(){
  store.set('secondaryColor', secondary.value);
   
  ipcRenderer.sendSync ('prefsUpdate')
  document.documentElement.style.setProperty('--footer-color', secondary.value);
})

document.getElementById("red").onclick = rbutton;

function rbutton() {
  store.set('secondaryColor', 'red');
   
  ipcRenderer.sendSync ('prefsUpdate')
  document.documentElement.style.setProperty('--footer-color', store.get('secondaryColor'));
  
  let tc = getComputedStyle(document.documentElement).getPropertyValue('--footer-color');
  console.log(tc)
}



document.getElementById("blue").onclick = bbutton;

function bbutton() {
  store.set('secondaryColor', 'blue');
   
  ipcRenderer.sendSync ('prefsUpdate')
  document.documentElement.style.setProperty('--footer-color', store.get('secondaryColor'));
  
  let tc = getComputedStyle(document.documentElement).getPropertyValue('--footer-color');
  console.log(tc)
}




document.getElementById("check").onclick = cbutton;

function cbutton() {
  let tc = getComputedStyle(document.documentElement).getPropertyValue('--footer-color');

  console.log(store.get('secondaryColor'));
  console.log(tc)
}



