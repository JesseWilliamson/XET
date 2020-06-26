var fs = require("fs");
var insertTextAtCursor = require("insert-text-at-cursor")
var savedFilePath

const { remote, ipcRenderer } = require('electron')
WIN = remote.getCurrentWindow();

ipcRenderer.on('openFile', (event) => openFile());
ipcRenderer.on('saveFileAs', (event) => saveFileAs());
ipcRenderer.on('saveFile', (event) => saveFile());

window.$ = window.jQuery = require('jquery');

shortcut.add("Ctrl+e",function() {
  el=document.getElementById("content");
  insertTextAtCursor(el, 'foobar');
  console.log("Hi there!");
});

function wordScan() {
  var content = document.getElementById("content").value;
  var contentarr = content.split(/[\r?\n\s,\r]+/);
  var lineArr = content.split(/[\r?\n]/)
  titlearr = lineArr.filter(function (item) {
    return item.indexOf("#") == 0;
  });
  console.log(titlearr);
  vocabulary = new Set(contentarr)
  console.log(vocabulary.size)
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

var oldVal = "";
$("#content").on("change keyup paste", function() {
    var currentVal = $(this).val();
    if(currentVal == oldVal) {
        return; //check to prevent multiple simultaneous triggers
    }
    oldVal = currentVal;
    //action to be performed on textarea changed
    console.log("changed!");
    wordScan()
});

