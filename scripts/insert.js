var insertTextAtCursor = require("insert-text-at-cursor")



function insertDate(){
  var region = store.get('suregion');
  console.log(region)
  var d = new Date();
  el = document.getElementById("page");
  insertTextAtCursor(el, d.toLocaleDateString(region));
}

function insertDateAndTime(){
  var region = store.get('suregion');
  console.log(region)
  var d = new Date();
  el = document.getElementById("page");
  insertTextAtCursor(el, d.toLocaleString(region));
}

