var onRun = function(context) {
  var sketch = require('sketch')
  var ui = require('sketch/ui')

  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;

  var Settings = require('sketch/settings')

  //var alignToX = Settings.globalSettingForKey('savedSelectionXGlobal') || 0;
  var pinAndResize = Settings.globalSettingForKey('savedSelectionPinAndResizeGlobal') || 0;

  //console.log(alignToX)
  console.log(pinAndResize)

  var allSymbols = document.selectedLayers;

  var count = 0;


  for (j = 0; j < allSymbols.length; ++j) {
    console.log(allSymbols.layers[j].name)
    allSymbols.layers[j].sketchObject.setResizingConstraint(pinAndResize)

  }



  ui.message("🌈: Done setting pinning and resizing properties of selected to the source one! 👏 🚀");

};
