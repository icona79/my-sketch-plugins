var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var Document = require('sketch/dom').getSelectedDocument()

  var doc = context.document;
  var document = sketch.getSelectedDocument();

  var selectedLayers = document.selectedLayers.layers;

  var ui = require('sketch/ui')

  var	document = sketch.getSelectedDocument();

  var doc = context.document;

  var layer = selectedLayers[0]
  var spacing = 0;

  var columnWidth = 100;
  var gutterWidth = 0;


  if (layer.getParentArtboard()){

    ab = layer.getParentArtboard();

    var artboardLayout = ab.sketchObject.layout();

    if (artboardLayout === null) {
      artboardLayout = MSDefaultLayoutGrid.defaultLayout();
    }
    console.log(artboardLayout)
    // Layout Settings
    var totalWidth = artboardLayout.totalWidth();
    var numberOfColumns = artboardLayout.numberOfColumns();
    columnWidth = artboardLayout.columnWidth();
    gutterWidth = artboardLayout.gutterWidth();

  }

  if (layer.frame.width > columnWidth) {
    spacing = gutterWidth;
  }

  var newLayer = layer.duplicate();

  if (layer.type === "Artboard" || layer.type === "SymbolMaster") {
    spacing = 100;
  }

  newLayer.frame.x = layer.frame.x - layer.frame.width - spacing;

  layer.selected = false;
  newLayer.selected = true;

  // duplicates below
  // newLayer.index = newLayer.index - 1;

  ui.message("🌈: Done!!! 👏 🚀");

}
