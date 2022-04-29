var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var	document = sketch.getSelectedDocument();


  if (document.selectedLayers){
    var selection = document.selectedLayers.layers;

    for (s = 0; s < selection.length; ++s) {
      // console.log(selection[s].name)
      var layer = selection[s];

      if (layer.type !== "Artboard" && layer.type !== "SymbolMaster") {

        layer.frame.width = layer.parent.frame.width;
        layer.frame.height = layer.parent.frame.height;

        layer.frame.x = (layer.parent.frame.width - layer.frame.width)/2;
        layer.frame.y = (layer.parent.frame.height - layer.frame.height)/2;

        // Set correct pinning to all edges
        var layerResizingConstraint = 18;

        layer.sketchObject.setResizingConstraint(layerResizingConstraint);


        ui.message("🌈: Sized Elements to dimensions of parent element (and centered)! 👏 🚀");

      } else {
        ui.message("🌈: Please select layers or groups! 😅");
      }

    }

  } else {
    ui.message("🌈: Please select layers or groups! 😅");
  }

};
