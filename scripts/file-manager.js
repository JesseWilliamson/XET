var fs = require("fs");
var savedFilePath
window.$ = window.jQuery = require('jquery');

function readFile(filepath) {
    fs.readFile(filepath, "utf-8", (err, data) => {
      if (err) {
        console.log("error");
        return;
      }
      content.value = data;
      wordScan()
    });
}

async function openFile() {
    var content = document.getElementById("content").value;
    const paths = remote.dialog.showOpenDialogSync(WIN, {
      properties: ["openFile", "multiSelections"],
    });
    savedFilePath = paths[0];
    console.log('opening: '+paths[0]);
    readFile(paths[0]);

}

async function saveFileAs(){
    var content = document.getElementById("content").value;
    let { filePath } = await remote.dialog.showSaveDialog({
      buttonlabel: "Save file",
    });
    
    savedFilePath = filePath
    fs.writeFile(filePath, content, () => console.log("Saved File"));
    console.log("saved sucessfully!");
    console.log(content);
}
  
async function saveFile(){
  if (savedFilePath != null) {
    var content = document.getElementById("content").value;
    fs.writeFile(savedFilePath, content, () => console.log("Saved File"));
  } else {
    saveFileAs()
  }

}
