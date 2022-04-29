var onRun = function(context) {

  var sketch = require('sketch')
  var sketch = require('sketch')
  var ui = require('sketch/ui')

  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;

  var Settings = require('sketch/settings')

  var setToColor = Settings.globalSettingForKey('savedSelectionColorGlobal') || "#000";

  console.log(setToColor)


  var allSymbols = document.selectedLayers;

  var count = 0;


  for (j = 0; j < allSymbols.length; ++j) {
    console.log(allSymbols.layers[j].name)
    console.log(allSymbols.layers[j].type)
    if (allSymbols.layers[j].type === "Text"){
      allSymbols.layers[j].style.textColor = setToColor;
    }
    if (allSymbols.layers[j].type === "ShapePath"){
      allSymbols.layers[j].style.fills[0].color = setToColor;
    }
    if (allSymbols.layers[j].type === "Shape"){
      allSymbols.layers[j].style.fills[0].color = setToColor;
    }
    if (allSymbols.layers[j].type === "Artboard"){
      console.log("color")
      console.log(setToColor)
      allSymbols.layers[j].background.color = setToColor;
      allSymbols.layers[j].background.enabled = true;
      allSymbols.layers[j].background.includedInExport = true;
    }

  }

  ui.message("🌈:  Done setting the color of selected elements to match the source ("+(setToColor)+")! 👏 🚀");


};
