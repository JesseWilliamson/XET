var insertTextAtCursor = require("insert-text-at-cursor")

var region = 'en-AU';

function insertDate(){
  var d = new Date();
  el = document.getElementById("page");
  insertTextAtCursor(el, d.toLocaleDateString(region));
}

function insertDateAndTime(){
  var d = new Date();
  el = document.getElementById("page");
  insertTextAtCursor(el, d.toLocaleString(region));
}