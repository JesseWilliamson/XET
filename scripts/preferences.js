// const { remote, electron } = require('electron')
// const ElectronPrefs = require('electron-prefs');
// const { copyFileSync } = require('fs');

// // import settings from 'electron-settings';
// WIN = remote.getCurrentWindow();
// WIN.removeMenu()



document.getElementById("red").onclick = rbutton;

function rbutton() {
  console.log('epic');
}


// const prefs = new ElectronPrefs({
//   fileName: "config.js",
//   defaults: {
//     window: {
//       width: 600,
//       height: 300
//     }
//   }
// });
 
// prefs.set('foo', 'bar');
// console.log(prefs.get('foo'));
// //=> bar
 
// console.log(prefs.get("window"));
// //=> { width: 600, height: 300 }
 
// // use dot-notation to access nested properties
// prefs.set('window.width', 700);
// console.log(prefs.get("window"));
// //=> { width: 700, height: 300 }
// console.log(prefs.get('window.width'));
// //=> 700
 
// prefs.delete('foo');
// console.log(prefs.get('foo'));
// //=> undefined
 
