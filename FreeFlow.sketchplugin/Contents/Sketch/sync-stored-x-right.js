var onRun = function(context) {
var sketch = require('sketch')
var ui = require('sketch/ui')

var	document = sketch.getSelectedDocument();

var data = document.sketchObject.documentData();
var page = document.selectedPage;
var selection = document.selectedLayers;
var doc = context.document;

var Settings = require('sketch/settings')

var alignToXRight = Settings.globalSettingForKey('savedSelectionXRightGlobal') || 0;

console.log("alignToXRight")
console.log(alignToXRight)


var allSymbols = document.selectedLayers;

var count = 0;


for (j = 0; j < allSymbols.length; ++j) {
  console.log(allSymbols.layers[j].name)
  allSymbols.layers[j].frame.x = allSymbols.layers[j].parent.frame.width - allSymbols.layers[j].frame.width - alignToXRight;
}



ui.message("🌈: Done aligning selected elements' X position to the source one (from the right)! 👏 🚀");

};
