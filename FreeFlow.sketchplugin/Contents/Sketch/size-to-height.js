var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var	document = sketch.getSelectedDocument();

  if (document.selectedLayers){
    var selection = document.selectedLayers.layers;

    for (s = 0; s < selection.length; ++s) {

      var layer = selection[s];
      if (layer.type !== "Artboard" && layer.type !== "SymbolMaster") {
        var layerResizingConstraint = layer.sketchObject.setResizingConstraint(87);
        layer.frame.height = layer.parent.frame.height;
        layer.frame.y = 0;

        ui.message("🌈: Sized to Height of parent element (& pinned)! 👏 🚀");

      } else {
        ui.message("🌈: Please select layers or groups! 😅");
      }

    }

  }  else {
      ui.message("🌈: Please select layers or groups! 😅");
    }



};
