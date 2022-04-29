var onRun = function(context) {
var sketch = require('sketch')
var ui = require('sketch/ui')

var	document = sketch.getSelectedDocument();

var data = document.sketchObject.documentData();
var page = document.selectedPage;
var selection = document.selectedLayers;
var doc = context.document;

var Settings = require('sketch/settings')

var sizeToW = Settings.globalSettingForKey('savedSelectionWidthGlobal') || 0;
var sizeToH = Settings.globalSettingForKey('savedSelectionHeightGlobal') || 0;
var sizeFontSize = Settings.globalSettingForKey('savedSelectionFontSizeGlobal') || 0;
var setToLineHeight = Settings.globalSettingForKey('savedSelectionLineHeightGlobal') || 0;

console.log(sizeToW)
console.log(sizeToH)
console.log(sizeFontSize)
console.log(setToLineHeight)


var allSymbols = document.selectedLayers;

var count = 0;


for (j = 0; j < allSymbols.length; ++j) {
  console.log(allSymbols.layers[j].name)
  allSymbols.layers[j].frame.width = sizeToW;
  allSymbols.layers[j].frame.height = sizeToH;
  allSymbols.layers[j].style.fontSize = sizeFontSize;
  allSymbols.layers[j].style.lineHeight = setToLineHeight;

}



ui.message("🌈: Done setting the size of selected elements to match the source ("+sizeToW+"x"+sizeToH+")! 👏 🚀");

};
