var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var Document = require('sketch/dom').getSelectedDocument()

  var doc = context.document;
  var document = sketch.getSelectedDocument();

  var selectedLayers = document.selectedLayers.layers;

  var layer = selectedLayers[0]

  var columnWidth = 0;
  var gutterWidth = 0;


  // var layerResizingConstraint = layer.sketchObject.resizingConstraint();
  // console.log(layerResizingConstraint);


  layer.frame.y = (layer.parent.frame.height - layer.frame.height)/2;

  if (layer.parent.type === "Group"){
    layer.parent.adjustToFit();
  }

  // layer.frame.x = layer.parent.frame.width - layer.frame.width;
  // layer.sketchObject.setResizingConstraint(21);
//
  var layerResizingConstraint = layer.sketchObject.setResizingConstraint(21);

  console.log(layerResizingConstraint);



  ui.message("🌈: Centered vertically within parent Group! 👏 🚀");



};
