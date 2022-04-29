var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var Document = require('sketch/dom').getSelectedDocument()

  var doc = context.document;
  var document = sketch.getSelectedDocument();
  //  var user = sketch.getUserInfo();

  var selectedLayers = document.selectedLayers.layers;


  var layer1 = selectedLayers[0]
  var layer2 = selectedLayers[1]

  //var tempx1 = layer.frame.x
  //var tempy1 = layer.frame.y
  var tempframe1 = layer1.frame
  var tempindex1 = layer1.index

  var tempframe2 = layer2.frame
  var tempindex2 = layer2.index

  layer1.frame = tempframe2
  layer1.index = tempindex2

  layer2.frame = tempframe1
  layer2.index = tempindex1

  //  var documentColors = sketch.getSelectedDocument().colors;

  var docData = context.document.documentData();
  var command = context.command;


  ui.message("🌈: Done! 👏 🚀");


};
