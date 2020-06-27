const { remote, electron } = require('electron')
const ElectronPrefs = require('electron-prefs');
const { copyFileSync } = require('fs');

// import settings from 'electron-settings';
WIN = remote.getCurrentWindow();
WIN.removeMenu()


// // get variable from inline style
// textbox.style.getPropertyValue("--my-var");


// var input = document.getElementById('colourinput')


// input.addEventListener('change', function(){
//   textbox.style.setProperty('--footer-color', input.value)
// })




const prefs = new ElectronPrefs({
  fileName: "config.js",
  defaults: {
    window: {
      width: 600,
      height: 300
    }
  }
});

// document.getElementById("red").onclick = rbutton;

// function rbutton() {
   
//   prefs.set('primary', 'red');
//   console.log(prefs.get('primary'));


//   textbox.style.setProperty("--my-var", 'red');
  
// }



// document.getElementById("blue").onclick = bbutton;

// function bbutton() {


   
//   prefs.set('primary', 'blue');
//   console.log(prefs.get('primary'));

//   textbox.style.setProperty("--my-var", 'blue');
  
// }


let tc = getComputedStyle(document.documentElement).getPropertyValue('--footer-color');

document.getElementById("check").onclick = cbutton;

function cbutton() {

  console.log(prefs.get('primary'));
  console.log(tc)
  document.documentElement.style.setProperty('--footer-color', 'red');
}



