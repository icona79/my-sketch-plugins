var onRun = function(context) {
  var sketch = require('sketch')
  var ui = require('sketch/ui')

  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;

  var Settings = require('sketch/settings')


  var alignToYBottom = Settings.globalSettingForKey('savedSelectionYBottomGlobal') || 0;

  console.log("alignToYBottom")
  console.log(alignToYBottom)


  var allSymbols = document.selectedLayers;

  var count = 0;


  for (j = 0; j < allSymbols.length; ++j) {
    console.log(allSymbols.layers[j].name)
    allSymbols.layers[j].frame.y = allSymbols.layers[j].parent.frame.height - allSymbols.layers[j].frame.height - alignToYBottom;

  }



  ui.message("🌈: Done aligning selected elements' Y position to the source one (from the bottom)! 👏 🚀");

};
