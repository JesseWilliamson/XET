var app = require("electron").remote;
var dialog = app.dialog;
var fs = require("fs");
// var $ = require("jquery")
// const {writeFile} = require('fs');
// const {readFile} = require('fs');
WIN = app.getCurrentWindow();

window.$ = window.jQuery = require('jquery');

wordScan()

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
    list += "<li>" + titlearr[i] + "</li>";
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
  const paths = dialog.showOpenDialogSync(WIN, {
    properties: ["openFile", "multiSelections"],
  });
  console.log(paths[0]);
  readFile(paths[0]);
}

async function saveFile(){
  var content = document.getElementById("content").value;
  console.log("Save button");
  let { filePath } = await dialog.showSaveDialog({
    buttonlabel: "Save file",
  });
  console.log(filePath);
  fs.writeFile(filePath, content, () => console.log("we done fam"));
  console.log("saved sucessfully!");
  console.log(content);
}

document.getElementById("save").onclick = saveFile;
document.getElementById("open").onclick = openFile;



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