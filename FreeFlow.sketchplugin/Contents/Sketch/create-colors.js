var onRun = function(context) {
  var sketch = require('sketch')
  var ui = require('sketch/ui')

  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var documentColors = sketch.getSelectedDocument().colors;

  // Detect Sketch Version to create colors or color vars
  var sketchversion = sketch.version.sketch;

  var layerStyles = document.sharedLayerStyles;
  var textStyles = document.sharedTextStyles;

  console.log("Generate colors from selection")

  var layername = "";
  var stylename = "";
  var colorname;
  var colorindex;
  var layer;
  var textStyles;


  // Generate colors from selection
  for (c = 0; c < selection.layers.length; ++c){

    var arrayColorAssetsValues = documentColors.map(ColorAsset => ColorAsset["color"]);
    var arrayColorAssetsNames = documentColors.map(ColorAsset => ColorAsset["name"]);
    var arrayColorNamesAndValues = documentColors.map(ColorAsset => [ColorAsset["name"], ColorAsset["color"]]);

    if (sketchversion >= 69) {
      var arrayColorVarNames = document.swatches.map(Swatch => Swatch["name"]);
      var arrayColorVarNamesAndValues = document.swatches.map(Swatch => [Swatch["name"], Swatch["color"]]);
    }

    console.log(arrayColorAssetsValues)
    console.log(arrayColorAssetsNames)
    console.log(arrayColorNamesAndValues)

    layer = selection.layers[c];


    console.log("What is it?")
    if (layer.type === "Text"){
      var color = layer.style.textColor;
    }
    if (layer.type === "ShapePath"){
      var color = layer.style.fills[0].color;
    }

    if (layer.type === "Shape"){
      var color = layer.style.fills[0].color;
    }

    console.log(color);
    colorname = layer.name;


    if (sketchversion >= 69) {
      const Swatch = sketch.Swatch
      var newSwatch = Swatch.from({ name: colorname, color: color })

      console.log(newSwatch)

      if (arrayColorVarNames.indexOf(colorname) === -1) {
        document.swatches.push(newSwatch)
        }
        else {
          console.log("already existing color var");
        }
    }

    else {
      if (arrayColorAssetsNames.indexOf(colorname) === -1) {
          documentColors.push({type: 'ColorAsset', name: colorname, color: color});
        } else {
          console.log("already existing color");
        }

    }

  }


  if (sketchversion >= 69) {
    ui.message("🌈: Yay! You now have " + document.swatches.length + " color variables available! 👏 🚀");
  } else {
    ui.message("🌈: Yay! You now have " + documentColors.length + " colors available! 👏 🚀");
  }

};
