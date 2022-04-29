var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var Document = require('sketch/dom').getSelectedDocument()

  var doc = context.document;
  var document = sketch.getSelectedDocument();

  var selectedLayers = document.selectedLayers.layers;

  //var sketch = require('sketch')
  var ui = require('sketch/ui')

  var	document = sketch.getSelectedDocument();

  var doc = context.document;


  var layer = selectedLayers[0]

  var columnWidth = 0;
  var gutterWidth = 0;


  // var layerResizingConstraint = layer.sketchObject.resizingConstraint();
  // console.log(layerResizingConstraint);

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




  //ab = layer.getParentArtboard();

  //var artboardLayout = ab.sketchObject.layout(); // class: MSLayoutGrid

  // Layout Settings
  // var totalWidth = artboardLayout.totalWidth();
  // var numberOfColumns = artboardLayout.numberOfColumns();
  // var columnWidth = artboardLayout.columnWidth();
  // var gutterWidth = artboardLayout.gutterWidth();
  // //console.log(artboardLayout.gutterWidth());

  // Additional layout settings
  console.log(artboardLayout.guttersOutside());
  console.log(artboardLayout.isEnabled());

  //// Get user input
  var result; //= [] + [doc askForUserInput:instructionalTextForInput initialValue:""];
  // var instructionalTextForInput = "🌈 Your current Artboar Layout setttings.\n\nColumns:" + numberOfColumns + "\n\nGutter: " + numberOfColumns + "px" + "\n\n How many columns do you want " + layer.name + "to span?"
  var instructionalTextForInput = "Current Artboard Layout setttings:\n\nColumns: " + numberOfColumns +"\n\nColumn Width: " + columnWidth + "px\n\nGutter Width: " + gutterWidth + "px" + "\n\nHow many columns do you want " + layer.name + "to span?\n\n*You can also choose a percentage, for example 30% (we'll round it for you. Fancy we know!)";


  ui.getInputFromUser(
    "How wide do you want \n" + layer.name + " to be?",
    {
      initialValue: "3",
      description: instructionalTextForInput,
      // numberOfLines: 1
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        result = 3;
        return
      } else {
        console.log(value)
        result = value;
      }
    }
  )


  if (result.includes("%")) {

    var percentage = result.replace("%","")
    layer.frame.width = Math.round(layer.parent.frame.width * (percentage/100));
  } else {

    layer.frame.width = result * columnWidth + gutterWidth * (result - 1);
  }




  ui.message("🌈: Done! 👏 🚀");



};
