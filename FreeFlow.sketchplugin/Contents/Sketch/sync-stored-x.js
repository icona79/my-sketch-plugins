var onRun = function(context) {
var sketch = require('sketch')
var ui = require('sketch/ui')

var	document = sketch.getSelectedDocument();

var data = document.sketchObject.documentData();
var page = document.selectedPage;
var selection = document.selectedLayers;
var doc = context.document;

var Settings = require('sketch/settings')

var alignToX = Settings.globalSettingForKey('savedSelectionXGlobal') || 0;
//var alignToY = Settings.globalSettingForKey('savedSelectionYGlobal') || 0;

console.log(alignToX)


var allSymbols = document.selectedLayers;

var count = 0;


for (j = 0; j < allSymbols.length; ++j) {
  console.log(allSymbols.layers[j].name)
  allSymbols.layers[j].frame.x = alignToX;
}



ui.message("🌈: Done aligning selected elements' X position to the source one! 👏 🚀");

};
