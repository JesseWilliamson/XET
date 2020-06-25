// var app = require("electron").remote;
// var dialog = app.dialog;
var fs = require("fs");
var insertTextAtCursor = require("insert-text-at-cursor");
var Mousetrap = require("mousetrap")
var savedFilePath
// var ipcRenderer = require("electron").ipcRenderer;


const { remote, ipcRenderer } = require('electron')

// var dialog = remote.dialog;


// var $ = require("jquery")
// const {writeFile} = require('fs');
// const {readFile} = require('fs');
WIN = remote.getCurrentWindow();



// const { ipcRenderer } = window.require('electron');
ipcRenderer.on('openFile', (event) => openFile());
ipcRenderer.on('saveFileAs', (event) => saveFileAs());
ipcRenderer.on('saveFile', (event) => saveFile());



window.$ = window.jQuery = require('jquery');

wordScan()

shortcut.add("Ctrl+e",function() {
  el=document.getElementById("content");
  insertTextAtCursor(el, 'foobar');
  console.log("Hi there!");
});




$(document).ready(function(){
    
    var content = document.getElementById("content").value;

    $(content).change(function(){
        console.log("text changed!")
    });

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

function readFile(filepath) {
  fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) {
      console.log("error");
      return;
    }
    console.log(data);
    content.value = data;
  });
}

async function openFile() {
  var content = document.getElementById("content").value;
  const paths = remote.dialog.showOpenDialogSync(WIN, {
    properties: ["openFile", "multiSelections"],
  });
  savedFilePath = paths[0];
  console.log(paths[0]);
  readFile(paths[0]);
}

async function saveFileAs(){
  var content = document.getElementById("content").value;
  console.log("Save button");
  let { filePath } = await remote.dialog.showSaveDialog({
    buttonlabel: "Save file",
  });
  
  savedFilePath = filePath
  fs.writeFile(filePath, content, () => console.log("we done fam"));
  console.log("saved sucessfully!");
  console.log(content);
}

async function saveFile(){
  var content = document.getElementById("content").value;
  fs.writeFile(savedFilePath, content, () => console.log("we done fam"));
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

