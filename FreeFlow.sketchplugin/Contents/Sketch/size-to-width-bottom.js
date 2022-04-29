var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var	document = sketch.getSelectedDocument();


  if (document.selectedLayers){
    var selection = document.selectedLayers.layers;

    // console.log(selection);

    for (s = 0; s < selection.length; ++s) {
      // console.log(selection[s].name)
      var layer = selection[s];
      if (layer.type !== "Artboard" && layer.type !== "SymbolMaster") {
        var layerResizingConstraint = layer.sketchObject.setResizingConstraint(34);
        // layer.frame.y = 0;
        layer.frame.y = layer.parent.frame.height - layer.frame.height;
        layer.frame.x = 0;
        // layer.frame.x = (layer.parent.frame.width - layer.frame.width)/2;
        layer.frame.width = layer.parent.frame.width;
        ui.message("🌈: Pinned to Bottom & Sized to Width of parent element! 👏 🚀");
      } else {
        ui.message("🌈: Please select layers or groups! 😅");
      }
    }

  } else {
    ui.message("🌈: Please select layers or groups! 😅");
  }


};
