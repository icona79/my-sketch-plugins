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
  var count = 0;

  var columnWidth = 0;
  var gutterWidth = 0;


  if (layer.getParentArtboard()){

    ab = layer.getParentArtboard();

    var artboardLayout = ab.sketchObject.layout();

    if (artboardLayout === null) {
      artboardLayout = MSDefaultLayoutGrid.defaultLayout();
    }
    // console.log(artboardLayout)
    // Layout Settings
    var totalWidth = artboardLayout.totalWidth();
    var numberOfColumns = artboardLayout.numberOfColumns();
    columnWidth = artboardLayout.columnWidth();
    gutterWidth = artboardLayout.gutterWidth();

  }

  // if (layer.frame.width > columnWidth) {
  //   spacing = gutterWidth;
  // }

  var newLayer = layer.duplicate();


  if (layer.type === "SymbolMaster") {
    spacing = 100;
  }

  if (layer.type === "Artboard") {
    spacing = 400;
  }


  if (newLayer.parent.type === "Artboard" || newLayer.parent.type === "Group") {


      console.log("Parent is Artboard or Group")

      var duplicatedLayer = newLayer;

      // newLayer.parent.layers.push(duplicatedLayer);
      // var indexToAssign = 0

      // duplicatedLayer.index = indexToAssign;

      // duplicatedLayer.parent = newLayer.parent
      console.log("newLayer.parent.layers.length")
      console.log(newLayer.parent.layers.length)



      if (newLayer.parent.layers.length <= 1){
        console.log("newLayer.parent.layers.length <= 1")
        console.log(newLayer.parent.layers.length)
        duplicatedLayer.frame.y = 0;
        duplicatedLayer.frame.x = 0;
      }

      if (newLayer.parent.layers.length >> 1){
        console.log("newLayer.parent.layers.length >> 1")
        console.log(newLayer.parent.layers.length)

        var spacing = 0;

        if (newLayer.parent.layers.length <= 2){
          console.log("len 2")
          console.log(newLayer.parent.layers.length)
          var spacing = 0;
        }

        if (newLayer.parent.layers.length >> 2){
          console.log("len 2+")
          console.log(newLayer.parent.layers[1].name)
          console.log(newLayer.parent.layers[2].name)
          console.log(newLayer.parent.layers[1].frame.y)
          console.log(newLayer.parent.layers[1].frame.height)
          console.log(newLayer.parent.layers.length)
          var spacing = (newLayer.parent.layers[1].frame.y - (newLayer.parent.layers[2].frame.height + newLayer.parent.layers[2].frame.y)) || spacing;
        }

        console.log("spacing")
        console.log(spacing)
        // duplicatedLayer.frame.y = newLayer.parent.layers[0].frame.y + newLayer.parent.layers[0].frame.height + spacing;
        duplicatedLayer.frame.y = newLayer.parent.layers[1].frame.y + newLayer.parent.layers[1].frame.height + spacing;
        duplicatedLayer.frame.x = newLayer.parent.layers[1].frame.x;

      }

      if (duplicatedLayer.parent.type === "Group"){
        duplicatedLayer.parent.adjustToFit()
      }

      count = count+1;



    //spacing = 100;
  }


  // newLayer.frame.x = layer.frame.x + layer.frame.width + spacing;
  newLayer.frame.y = layer.frame.y + layer.frame.height + spacing;

  layer.selected = false;
  newLayer.selected = true;

  // duplicates below
  newLayer.index = newLayer.index - 1;

  ui.message("🌈: Duplicated " + newLayer.name + " with " + spacing + "px spacing!!! 👏 🚀");

}
