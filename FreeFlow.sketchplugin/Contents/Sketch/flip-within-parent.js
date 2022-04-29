var onRun = function(context) {
  var sketch = require('sketch');
  var sketchDom = require('sketch/dom')
  var ui = require('sketch/ui');
  var document = sketch.getSelectedDocument();

  var selection = document.selectedLayers;

  console.log(selection.layers[0].name);

  for (j = 0; j < selection.length; ++j){


    var layer = selection.layers[j]

    var parentWidth = layer.parent.frame.width


    layer.frame.x = parentWidth - layer.frame.x - layer.frame.width

    var newConstraint = 0;
    var newConstraint = layer.sketchObject.resizingConstraint();

    if (layer.sketchObject.resizingConstraint() === 27) {
      newConstraint = 30
    }

    if (layer.sketchObject.resizingConstraint() === 30) {
      newConstraint = 27
    }

    if (layer.sketchObject.resizingConstraint() === 59) {
      newConstraint = 62
    }

    if (layer.sketchObject.resizingConstraint() === 62) {
      newConstraint = 59
    }

    if (layer.sketchObject.resizingConstraint() === 51) {
      newConstraint = 54
    }

    if (layer.sketchObject.resizingConstraint() === 54) {
      newConstraint = 51
    }

    if (layer.sketchObject.resizingConstraint() === 9) {
      newConstraint = 12
    }

    if (layer.sketchObject.resizingConstraint() === 12) {
      newConstraint = 9
    }

    if (layer.sketchObject.resizingConstraint() === 44) {
      newConstraint = 41
    }

    if (layer.sketchObject.resizingConstraint() === 41) {
      newConstraint = 44
    }

    if (layer.sketchObject.resizingConstraint() === 35) {
      newConstraint = 38
    }

    if (layer.sketchObject.resizingConstraint() === 38) {
      newConstraint = 35
    }

    if (layer.sketchObject.resizingConstraint() === 43) {
      newConstraint = 46
    }

    if (layer.sketchObject.resizingConstraint() === 46) {
      newConstraint = 43
    }

    if (layer.sketchObject.resizingConstraint() === 57) {
      newConstraint = 60
    }

    if (layer.sketchObject.resizingConstraint() === 60) {
      newConstraint = 57
    }

    if (layer.sketchObject.resizingConstraint() === 11) {
      newConstraint = 14
    }

    if (layer.sketchObject.resizingConstraint() === 14) {
      newConstraint = 11
    }

    // APPLY CONSTRAINT
    layer.sketchObject.setResizingConstraint(newConstraint);

  }

  ui.message("🌈: Done repositioning and inverting pinning properties of " + selection.length + " layers! 👏 🚀");


};
