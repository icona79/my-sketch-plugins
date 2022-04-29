var onRun = function(context) {

  var sketch = require('sketch')
  var ui = require('sketch/ui')

  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;

  var Settings = require('sketch/settings')

  var setToOpacity = Settings.globalSettingForKey('savedSelectionOpacityGlobal') || 100;

  console.log(setToOpacity)


  var allSymbols = document.selectedLayers;

  var count = 0;


  for (j = 0; j < allSymbols.length; ++j) {
    console.log(allSymbols.layers[j].name)
    allSymbols.layers[j].style.opacity = setToOpacity;
  }

  ui.message("🌈:  Done setting the opacity of selected elements to match the source ("+(setToOpacity *100)+"%)! 👏 🚀");


};
