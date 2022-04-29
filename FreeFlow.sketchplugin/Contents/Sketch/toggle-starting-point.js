var onRun = function(context) {

  var sketch = require('sketch')
  var ui = require('sketch/ui')


  var	document = sketch.getSelectedDocument();
  var selection = document.selectedLayers;
  var doc = context.document;
  var allSeleectedLayers = document.selectedLayers;

  var count = 0;

  for (j = 0; j < allSeleectedLayers.length; ++j) {
    console.log(allSeleectedLayers.layers[j].name)

    if (allSeleectedLayers.layers[j].type === "Artboard") {
      var bool = !(allSeleectedLayers.layers[j].flowStartPoint)
      allSeleectedLayers.layers[j].flowStartPoint = bool;

      if (bool) {
        count = count +  1;
      }


    }

    if (allSeleectedLayers.layers[j].type !== "Artboard") {
      var bool = !(allSeleectedLayers.layers[j].getParentArtboard().flowStartPoint)
      allSeleectedLayers.layers[j].getParentArtboard().flowStartPoint = bool;

      if (bool) {
        count = count +  1;
      }

    }



  }



  ui.message("Yay! Done toggling " + count + " Artboards as Prototyping Starting points! 👏 🚀");



};
