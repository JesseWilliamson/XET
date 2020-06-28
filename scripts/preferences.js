const { remote, electron, ipcRenderer } = require('electron')
const { copyFileSync } = require('fs');

// import settings from 'electron-settings';
WIN = remote.getCurrentWindow();
WIN.removeMenu()



const Store = require('electron-store');
const store = new Store();
 
document.documentElement.style.setProperty('--footer-color', store.get('unicorn'));



document.getElementById("red").onclick = rbutton;

function rbutton() {
  store.set('unicorn', 'red');
   
  ipcRenderer.sendSync ('prefsUpdate')
  document.documentElement.style.setProperty('--footer-color', store.get('unicorn'));
  
  let tc = getComputedStyle(document.documentElement).getPropertyValue('--footer-color');
  console.log(tc)
}



document.getElementById("blue").onclick = bbutton;

function bbutton() {
  store.set('unicorn', 'blue');
   
  ipcRenderer.sendSync ('prefsUpdate')
  document.documentElement.style.setProperty('--footer-color', store.get('unicorn'));
  
  let tc = getComputedStyle(document.documentElement).getPropertyValue('--footer-color');
  console.log(tc)
}




document.getElementById("check").onclick = cbutton;

function cbutton() {
  let tc = getComputedStyle(document.documentElement).getPropertyValue('--footer-color');

  console.log(store.get('unicorn'));
  console.log(tc)
}



