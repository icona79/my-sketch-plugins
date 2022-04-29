var onRun = function(context) {

  var sketch = require('sketch')
  var ui = require('sketch/ui')

  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;

  var Settings = require('sketch/settings')

  var setToFontFamily = Settings.globalSettingForKey('savedSelectionFontFamilyGlobal');
  console.log(Settings.globalSettingForKey('savedSelectionFontFamilyGlobal'))

  var allSymbols = document.selectedLayers;

  var count = 0;


  for (j = 0; j < allSymbols.length; ++j) {
    console.log(allSymbols.layers[j].name)
    console.log("Setting to font family:")
    console.log(allSymbols.layers[j].style.fontFamily = setToFontFamily);

  }

  ui.message("🌈: Done syncing selected elements' font family to the source one: "+setToFontFamily+"! 👏 🚀");


};
