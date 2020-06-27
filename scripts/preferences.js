const { remote, electron } = require('electron')
const ElectronPrefs = require('electron-prefs');
const { copyFileSync } = require('fs');

// import settings from 'electron-settings';
WIN = remote.getCurrentWindow();
WIN.removeMenu()

const prefs = new ElectronPrefs({
  fileName: "config.js",
  defaults: {
    window: {
      width: 600,
      height: 300
    }
  }
});

document.getElementById("red").onclick = rbutton;

function rbutton() {
   
  prefs.set('primary', 'red');
  console.log(prefs.get('primary'));
  
}



document.getElementById("blue").onclick = bbutton;

function bbutton() {


   
  prefs.set('primary', 'blue');
  console.log(prefs.get('primary'));
  
}




document.getElementById("check").onclick = cbutton;

function cbutton() {

  console.log(prefs.get('primary'));
  
}
