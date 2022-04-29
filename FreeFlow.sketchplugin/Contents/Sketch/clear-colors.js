var onRun = function(context) {

  var sketch = require('sketch')
  var ui = require('sketch/ui')


  var	document = sketch.getSelectedDocument();


  // Detect Sketch Version to create colors or color vars
  var sketchversion = sketch.version.sketch;

  if (sketchversion >= 69) {

    var documentColorVars = document.swatches;

    document.swatches = []

    ui.message("🌈: Yay! You have removed " + documentColorVars.length + " color vars from your document! 👏 🚀");


  } else {
    var documentColors = sketch.getSelectedDocument().colors;

    sketch.getSelectedDocument().colors = []
    ui.message("🌈: Yay! You have removed " + documentColors.length + " colors from your document palette! 👏 🚀");
  }

};
