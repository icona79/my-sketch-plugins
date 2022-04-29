          var onRun = function(context) {
            var sketch = require('sketch');
  var ui = require('sketch/ui');

  var doc = context.document;

  var	document = sketch.getSelectedDocument();

  //var data = document.sketchObject.documentData();
  //var page = document.selectedPage;
  //var selection = document.selectedLayers;
  ////
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
  ////

  /////
  var result;

  // if (selection.length == 0) {
  //   ui.message("🌈: 👉 👉 👉 Please select a Symbol or Text Layers to use as template! 👈 👈 👈");
  // }


  // var overrideLabelsSlice = overrideLabels.slice(0,overrideLabels.length-2);

  var instructionalTextForInput = "👉Paste CSV below or enter values by hand:";

  //// Get user input
  ui.getInputFromUser(
    "Create Color Vars from CSV data (Beta)",
    {
      initialValue: "color-primary: #6311B6FF;\ncolor-secondary: #D55800FF;" ,
      description: instructionalTextForInput,
      numberOfLines: 10
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return;
      } else {
        console.log(value);
        result = value;
      }
    }
  );


  console.log("result");
  //console.log(result);
  var goodQuotes = result.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
  //console.log(goodQuotes);
  result = goodQuotes;
  //console.log(result);
  //console.log("result");
  console.log(result.split("\n"));

  var array = result.split("\n")


  //document.swatches = []


  // Generate colors from selection
  for (c = 0; c < array.length; ++c){

    var colorNameAndValue = array[c].split(": "));

    console.log(colorNameAndValue[0]);
    console.log(colorNameAndValue[1].slice(0,7));

    var colorName = colorNameAndValue[0]);
    var colorValue = colorNameAndValue[1].slice(0,7));

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

    // console.log(color);
    colorname = colorName;
    color = colorValue;


    if (sketchversion >= 69) {
      const Swatch = sketch.Swatch
      var newSwatch = Swatch.from({ name: colorname, color: color })

      console.log(newSwatch)

      if (arrayColorVarNames.indexOf(colorname) === -1) {
        document.swatches.push(newSwatch)
      }
      else {
        console.log("already existing color var");
        var existingSwatch = document.swatches[arrayColorVarNames.indexOf(colorname)];  console.log(existingSwatch)
console.log(existingSwatch.name)
//existingSwatch.name = "New Color"
console.log(existingSwatch.color)
      console.log(existingSwatch.referencingColor)
      //document.swatches[0].referencingColor = "r:1.000000 g:0.000000 b:0.000000 a:1.000000"

//https://sketchplugins.com/d/2205-js-api-guide-whats-up-with-color-variables

/// UDPATES ALL PLACES WHERE COLOR VARS WERE USED :)

document.swatches[arrayColorVarNames.indexOf(colorname)].sketchObject.updateWithColor(MSColor.colorWithHex_alpha(color.slice(0,7), 1))


let swatchContainer = document.sketchObject.documentData().sharedSwatches()

// REFRESHES THE UI
swatchContainer.updateReferencesToSwatch(existingSwatch.sketchObject)

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
