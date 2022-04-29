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

  var setToIndex = Settings.globalSettingForKey('savedSelectionIndexGlobal') || 0;

  console.log(setToIndex)


  var allSymbols = document.selectedLayers;

  var count = 0;


  for (j = 0; j < allSymbols.length; ++j) {
    console.log(allSymbols.layers[j].name)
    allSymbols.layers[j].index = setToIndex;
  }

  ui.message("🌈:  Done setting the index of selected elements to match the source ("+(setToIndex)+")! 👏 🚀");


};
