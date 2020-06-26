var fs = require("fs");
var insertTextAtCursor = require("insert-text-at-cursor")


const { FindInPage } = require('electron-find')


const { remote, ipcRenderer } = require('electron')
WIN = remote.getCurrentWindow();

ipcRenderer.on('openFile', (event) => openFile());
ipcRenderer.on('saveFileAs', (event) => saveFileAs());
ipcRenderer.on('saveFile', (event) => saveFile());

window.$ = window.jQuery = require('jquery');

var region = 'en-AU';
var d = new Date();

let findInPage = new FindInPage(remote.getCurrentWebContents())

shortcut.add("Ctrl+f",function() {
  findInPage.openFindWindow()
});

shortcut.add("Ctrl+d",function() {
  el=document.getElementById("content");
  insertTextAtCursor(el, d.toLocaleDateString(region));
});

shortcut.add("Ctrl+shift+d",function() {
  el=document.getElementById("content");
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
  statsBox.innerHTML = "W:"+String(contentarr.length-1)+" "+"V:"+String(vocabulary.size-1+" "+"L:"+lineArr.length)
}

$("#content").on("change keyup paste", function() {
    var currentVal = $(this).val();
    if(currentVal == oldVal) {
        return; //check to prevent multiple simultaneous triggers
    }
    var oldVal = currentVal;
    //action to be performed on textarea changed
    wordScan()
});

