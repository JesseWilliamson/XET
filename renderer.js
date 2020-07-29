var fs = require("fs");
var insertTextAtCursor = require("insert-text-at-cursor")
const {
  FindInPage
} = require('electron-find')
const {
  remote,
  ipcRenderer
} = require('electron')
const reload = require('electron-css-reload');
const Store = require('electron-store');
const store = new Store();
WIN = remote.getCurrentWindow();

ipcRenderer.on('openFile', (event) => openFile());
ipcRenderer.on('saveFileAs', (event) => saveFileAs());
ipcRenderer.on('saveFile', (event) => saveFile());
ipcRenderer.on('secondaryPrefsUpdate', (event) => secondaryPrefsUpdate());
ipcRenderer.on('primaryPrefsUpdate', (event) => primaryPrefsUpdate());
ipcRenderer.on('textPrefsUpdate', (event) => textPrefsUpdate());

var region = 'en-AU';


window.$ = window.jQuery = require('jquery');

document.documentElement.style.setProperty('--primary', store.get('primaryColor'));
document.documentElement.style.setProperty('--secondary', store.get('secondaryColor'));
document.documentElement.style.setProperty('--text', store.get('textColor'));



let findInPage = new FindInPage(remote.getCurrentWebContents())

shortcut.add("Ctrl+f", function () {
  findInPage.openFindWindow()
});

shortcut.add("Ctrl+d", function () {
  var d = new Date();
  el = document.getElementById("content");
  insertTextAtCursor(el, d.toLocaleDateString(region));
});

shortcut.add("Ctrl+shift+d", function () {
  var d = new Date();
  el = document.getElementById("content");
  insertTextAtCursor(el, d.toLocaleString(region));
});

function wordScan() {
  var content = document.getElementById("content").value;
  var contentarr = content.split(/[\r?\n\s,\r]+/);
  var lineArr = content.split(/[\r?\n]/)
  titlearr = lineArr.filter(function (item) {
    return item.indexOf("#") == 0;
  });
  vocabulary = new Set(contentarr)
  let ListBox = document.getElementById("ListBox");
  let list = "<ul>";
  for (let i = 0; i < titlearr.length; i++) {
    list += "<li>" + titlearr[i] + "</li>" + "<br>";
  }
  list += "</ul>";
  ListBox.innerHTML = list;
  let statsBox = document.getElementById("statsBox")
  statsBox.innerHTML = "W:" + String(contentarr.length - 1) + " " + "V:" + String(vocabulary.size - 1 + " " + "L:" + lineArr.length)
}

$("#content").on("change keyup paste", function () {
  var currentVal = $(this).val();
  if (currentVal == oldVal) {
    return; //check to prevent multiple simultaneous triggers
  }
  var oldVal = currentVal;
  //action to be performed on textarea changed
  wordScan()
});









function secondaryPrefsUpdate() {
  console.log(store.get('secondaryColor'));
  document.documentElement.style.setProperty('--secondary', store.get('secondaryColor'));
};

function primaryPrefsUpdate() {
  console.log(store.get('primaryColor'));
  document.documentElement.style.setProperty('--primary', store.get('primaryColor'));
};

function textPrefsUpdate() {
  console.log(store.get('textColor'));
  document.documentElement.style.setProperty('--text', store.get('textColor'));
  console.log('textin')
};