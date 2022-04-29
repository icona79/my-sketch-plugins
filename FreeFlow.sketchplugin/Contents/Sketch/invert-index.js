var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var Document = require('sketch/dom').getSelectedDocument()

  var doc = context.document;
  var document = sketch.getSelectedDocument();

  var selectedLayers = document.selectedLayers.layers;


  var layersArray = selectedLayers
  var tempIndexArray = []

  for (l = 0; l < layersArray.length; ++l) {
    console.log(layersArray[l].index)

    tempIndexArray.push(layersArray[l].index)

  }

  console.log(tempIndexArray)
  console.log(tempIndexArray.reverse())

  for (l = 0; l < layersArray.length; ++l) {

    layersArray[l].index = tempIndexArray[l]

  }


  var docData = context.document.documentData();
  var command = context.command;

  ui.message("🌈: Done! 👏 🚀");



};
