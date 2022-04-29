var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var Text = require('sketch/dom').Text
  var Shape = require('sketch/dom').Shape
  var Group = require('sketch/dom').Group
  var Page = require('sketch/dom').Page
  var Artboard = require('sketch/dom').Artboard
  // var Document = require('sketch/dom').Document
  var Style = require('sketch/dom').Style
  var doc = context.document;

  var sketchversion = sketch.version.sketch;


  var document = sketch.getSelectedDocument();


  var styleGuidePage = new Page({
    name: 'Style Guide'
  })

  styleGuidePage.parent = document

  styleGuidePage.selected = true;

  var artboardColors = new Artboard({
    name: 'Colors',
  })

  artboardColors.parent = styleGuidePage

  artboardColors.selected = true;


  var selection = document.selectedLayers;




  if (sketchversion >= 69) {
      var documentColors = document.swatches;
      var colorsArtbordName = "Color Vars"
    }
  else {
      var documentColors = sketch.getSelectedDocument().colors
      var colorsArtbordName = "Colors"

  }

  var documentTextStyles = sketch.getSelectedDocument().sharedTextStyles
  var documentLayerStyles = sketch.getSelectedDocument().sharedLayerStyles

  var fontWeights = ["----","----","Ultra light","Light","----","Regular","Medium","Medium Italic","Semibold","Bold","Heavy-ExtraBold","Condensed ExtraBold"]


  console.log(documentColors)
  console.log(documentTextStyles)
  console.log(documentLayerStyles)

  //// Temporary mapping to remove

  var layerStyles = documentLayerStyles;
  var textStyles = documentTextStyles;
  ///

  console.log("Generate color swatches from document colors")

  var layername = "";
  var stylename = "";
  var colorname;
  var colorindex;
  var layer;
  var textStyles;
  var artboardWidth = 1440;
  var artboardOffset = 400;
  var swatchOffset = 100;
  var textStylesOffset = swatchOffset;
  var swatchSize = 240;
  var swatchMargin = 100;

  artboardColors.frame.width = artboardWidth;
  artboardColors.frame.height = artboardWidth;

  var arrayColorAssetsValues = documentColors.map(ColorAsset => ColorAsset["color"]);
  var arrayColorAssetsNames = documentColors.map(ColorAsset => ColorAsset["name"]);
  var arrayColorNamesAndValues = documentColors.map(ColorAsset => [ColorAsset["name"], ColorAsset["color"]]);



  console.log(arrayColorAssetsValues)
  console.log(arrayColorAssetsNames)
  console.log(arrayColorNamesAndValues)

  arrayColorAssetsNames.sort(sortFunction)


  // Generate colors from selection
  artboardColors.name = "Document "+colorsArtbordName+": " + documentColors.length;

  var row = 0;
  var column = 0;

  for (c = 0; c < documentColors.length; ++c){
    createSwatch(c);
    if (c == ((4 * (row + 1)) - 1)) {
      row = row + 1;
      column = 0;
    }
  };


  // create artboard for text styles

  var artboardTextStyles = new Artboard({
    name: 'Text Styles',
  })

  artboardTextStyles.parent = selection.layers[0].parent;
  artboardTextStyles.frame.width = artboardWidth;
  artboardTextStyles.frame.height = artboardWidth;
  artboardTextStyles.frame.x = artboardColors.frame.x + artboardWidth +  artboardOffset;
  artboardTextStyles.frame.y = artboardColors.frame.y;

  selection.layers[0].selected = false;
  artboardTextStyles.selected = true;

  var selection = document.selectedLayers;

  createTextStyleInfo(selection);

  // create artboard for layer styles


  var artboardLayerStyles = new Artboard({
    name: 'Layer Styles',
  })

  artboardLayerStyles.parent = selection.layers[0].parent;

  selection.layers[0].selected = false;

  artboardLayerStyles.selected = true;
  artboardLayerStyles.frame.width = artboardWidth;
  artboardLayerStyles.frame.height = artboardWidth;
  artboardLayerStyles.frame.x = artboardTextStyles.frame.x + artboardWidth +  artboardOffset;
  artboardLayerStyles.frame.y = artboardColors.frame.y;

  // artboardTextStyles.parent = selection.parent

  var selection = document.selectedLayers;


  createLayerStyleInfo(selection);

  /////
  artboardColors.selected = true;
  artboardTextStyles.selected = true;
  context.document.actionsController().actionForID("MSZoomToSelectionAction").performAction(nil);



  // showInputAlert();

  ui.message("🌈: Done generating Style Guide! 🙌");


  /// END

  // Create Swatch from Document Color


  function createSwatch(c){
    console.log("create swatch");

    var swatch = new Shape({
      name: arrayColorAssetsNames[c],
    })


    swatch.parent = selection.layers[0];
    // swatch.frame.y = 0;
    // swatch.frame.x = 0;

    swatch.frame.y = swatchOffset + swatchSize * row + swatchMargin  * row;
    swatch.frame.x = swatchOffset + swatchSize * column + swatchMargin  * column;

    swatch.frame.width = swatchSize;
    swatch.frame.height = swatchSize;
    swatch.style.fills = [
      {
        color: arrayColorAssetsValues[c],
        fillType: Style.FillType.Color
      },]

      colorname = arrayColorAssetsNames[c];

    var text = new Text({
      text: arrayColorAssetsNames[c] + "\n" + arrayColorAssetsValues[c]
    })

    text.frame.x = swatch.frame.x
    text.frame.y = swatch.frame.y + swatch.frame.height + 20;
    text.parent = selection.layers[0];
    text.style.fontSize = 16;
    text.style.textColor = "#666";
    text.style.lineHeight = 24;
    text.style.alignment = "left";
    text.style.fontFamily= 'Open Sans';
    text.style.fontWeight= 5;

    text.name = arrayColorAssetsNames[c];

    column = column + 1;

    }



  function createTextStyleInfo(selection){

      ////
      var parentLocation = selection.layers[0];
      var nextX = swatchOffset;
      var nextY = swatchOffset;
      var count = 1;

      var textStylesAsCSV = "'Name','ID','Style','Used',"



      documentTextStyles.forEach((TextStyle) => {


        console.log(TextStyle.name)

        var text = new Text({
          text: TextStyle.name,
        })

        // text.frame.x = nextX

        text.frame.y = nextY
        text.parent = parentLocation;

        var simplifiedNameArray = TextStyle.name.split("/");
        var simplifiedName = simplifiedNameArray[simplifiedNameArray.length - 1]

        text.name = TextStyle.name;
        text.text = simplifiedName;

        text.sharedStyleId = TextStyle.id;
        text.style = TextStyle.style;

        text.frame.x = nextX


        var textDescription = new Text({
          text: "Notes",
        })

        textDescription.frame.x = nextX
        textDescription.frame.y = text.frame.y + text.frame.height + 24;
        textDescription.style.fontSize = 16;
        textDescription.style.textColor = "#666";
        textDescription.style.lineHeight = 24;
        textDescription.style.alignment = "left";
        textDescription.style.fontFamily= 'Open Sans';
        textDescription.style.fontWeight= 5;
        textDescription.parent = parentLocation;


        // with usage info
        var styleInstances = TextStyle.getAllInstancesLayers().length - 1 || "0"
        // textDescription.text = TextStyle.style.fontFamily + " (" + TextStyle.style.fontWeight + ") – " + TextStyle.style.fontSize + " " + TextStyle.style.alignment + "\nUsed: "+styleInstances+" times";

        var fontWeight = fontWeights[TextStyle.style.fontWeight]


        textDescription.text = TextStyle.name + "\n" +TextStyle.style.fontFamily + " " + fontWeight + " – " + TextStyle.style.fontSize + "/" + TextStyle.style.lineHeight + " "+ TextStyle.style.alignment ;
        textDescription.name = "Notes";
        textDescription.style.textColor = "#818181FF";

        /// CSS

        var textCSS = textDescription.duplicate();

        var simplifiedNameArray = TextStyle.name.split("/");
        var simplifiedName = simplifiedNameArray[simplifiedNameArray.length - 1]

        textCSS.style.fontSize = 12;
        // textCSS.style.textColor = "#666";
        textCSS.style.lineHeight = 16;


        textCSS.frame.y = text.frame.y + text.frame.height + 80;
        textCSS.text = "."+ simplifiedName.toLowerCase().replace(" ","-") + " {"+ getCleanCSS(text)+ "}";
        textCSS.text = textCSS.text.replace(")}","}");
        textCSS.name = simplifiedName;


        textStylesAsCSV = textStylesAsCSV + "\n" + "'" + TextStyle.name + "','" + TextStyle.id + "','" + TextStyle.style.fontFamily + " (" + TextStyle.style.fontWeight + ") – " + TextStyle.style.fontSize + " " + TextStyle.style.alignment + "','" + styleInstances + "',"

        nextY = textCSS.frame.y + textCSS.frame.height + 80;

        count = count+1;

      });


      // parentLocation.name = "Styles Audit ("+ documentColors.length +" Defined Colors, "+ documentTextStyles.length +" Text Styles, "+ documentLayerStyles.length +" Layer Styles)";
      parentLocation.name = "Text Styles: "+ documentTextStyles.length;

  }



  function createLayerStyleInfo(selection){

      ////
      var parentLocation = selection.layers[0];
      var nextX = swatchOffset;
      var nextY = 100;
      var count = 1;



      var layertStylesAsCSV = "'Name','ID','Style','Used',"

      var c = 0;

      var row = 0;
      var column = 0;


      ////// Sorting Layer Styles

      var arrayLayerStyleIDs = documentLayerStyles.map(ColorAsset => ColorAsset["color"]);
      var arrayLayerStyleNames = documentLayerStyles.map(ColorAsset => ColorAsset["name"]);
      var arrayColorNamesAndIDs = documentLayerStyles.map(ColorAsset => [ColorAsset["name"], ColorAsset["color"]]);


      console.log("arrayLayerStyleNames")
      console.log(arrayLayerStyleNames)
      console.log("---------------------")

      var arrayLayerStyleNamesOriginal = arrayLayerStyleNames;

      var arrayLayerStyleNamesSorted = arrayLayerStyleNames.sort(sortFunction);
      console.log(arrayLayerStyleNamesSorted);


      ///////
      console.log("---------------------")



      // for LayerStyle in documentLayerStyles

      // console.log(arrayLayerStyleNamesSorted[0])
      // console.log(arrayLayerStyleNamesSorted[arrayLayerStyleNamesSorted.length - 1])

      console.log("---------------------")

      //documentLayerStyles.forEach((LayerStyle) => {

      for (ls = 0; ls < arrayLayerStyleNamesSorted.length; ++ls){
      console.log("Style name ---------------------")
      console.log(arrayLayerStyleNamesSorted[ls])

      var layerStyleName = arrayLayerStyleNamesSorted[ls]

       console.log(ls + "LS name: " +layerStyleName)
       console.log("---------------------")

       // var index;
       // for (sn = 0; sn < arrayLayerStyleNamesSorted.length; ++sn){
        // if (layerStyleName == arrayLayerStyleNames

       var layerStyleIndex = arrayLayerStyleNames.sort(sortFunction).indexOf(layerStyleName)
       var layerStyleIndexSorted = arrayLayerStyleNamesOriginal.indexOf(layerStyleName)

       console.log(ls + " -> original index: " +layerStyleIndex)
       console.log(ls + " -> sorted index: " +layerStyleIndexSorted)

        var LayerStyle = documentLayerStyles[layerStyleIndex]
        console.log("---------------------")

        console.log(LayerStyle.name)
        console.log(LayerStyle.id)
        console.log(LayerStyle)
        console.log("---------------------")

        /// swatch
        var swatch = new Shape({
          name: LayerStyle.name,
        })


        swatch.parent = selection.layers[0];
        // swatch.frame.y = swatchOffset;
        // swatch.frame.x = swatchOffset + swatchSize * c + swatchMargin  * c;

        swatch.frame.y = swatchOffset + swatchSize * row + swatchMargin * 3  * row;
        swatch.frame.x = swatchOffset + swatchSize * column + swatchMargin  * column;



        swatch.frame.width = swatchSize;
        swatch.frame.height = swatchSize;
        console.log("LayerStyle.id");
        console.log(LayerStyle.id);
        swatch.sharedStyleId = LayerStyle.id;
        swatch.style = LayerStyle.style;


        console.log(swatch.sharedStyleId);


        // END Swatch

        var text = new Text({
          text: LayerStyle.name
        })

        text.frame.x = swatch.frame.x
        text.frame.y = swatch.frame.y + swatch.frame.height + 20;
        text.parent = selection.layers[0];
        text.style.fontSize = 16;
        text.style.textColor = "#666";
        text.style.lineHeight = 24;
        text.style.alignment = "left";
        text.style.fontFamily= 'Open Sans';
        text.style.fontWeight= 5;

        var textCSS = text.duplicate()

        textCSS.frame.y = text.frame.y + 40;
        textCSS.text = "."+ LayerStyle.name.toLowerCase().replace(" ","-").replace(" ","-").replace(" ","-").replace("/","-").replace("/","-").replace("/","-") + " {"+ getCleanCSS(swatch)+ "}";
        textCSS.text = textCSS.text.replace(")}","}");
        textCSS.name = LayerStyle.name;
        textCSS.fixedWidth = true;
        textCSS.frame.height = swatchSize;
        textCSS.frame.width = swatchSize;
        textCSS.adjustToFit();


        column = column + 1;

          if (c == ((4 * (row + 1)) - 1)) {
            row = row + 1;
            column = 0;
          }

        c = c + 1;

      };


      // });



      // documentLayerStyles.forEach((LayerStyle) => {
      //
      //
      //
      //   console.log(LayerStyle.name)
      //   console.log(LayerStyle.id)
      //   console.log(LayerStyle)
      //
      //
      //   /// swatch
      //   var swatch = new Shape({
      //     name: LayerStyle.name,
      //   })
      //
      //
      //   swatch.parent = selection.layers[0];
      //   // swatch.frame.y = swatchOffset;
      //   // swatch.frame.x = swatchOffset + swatchSize * c + swatchMargin  * c;
      //
      //   swatch.frame.y = swatchOffset + swatchSize * row + swatchMargin * 3  * row;
      //   swatch.frame.x = swatchOffset + swatchSize * column + swatchMargin  * column;
      //
      //
      //
      //   swatch.frame.width = swatchSize;
      //   swatch.frame.height = swatchSize;
      //   console.log(LayerStyle.id);
      //   swatch.sharedStyleId = LayerStyle.id;
      //   swatch.style = LayerStyle.style;
      //
      //
      //   console.log(swatch.sharedStyleId);
      //
      //
      //   // END Swatch
      //
      //   var text = new Text({
      //     text: LayerStyle.name
      //   })
      //
      //   text.frame.x = swatch.frame.x
      //   text.frame.y = swatch.frame.y + swatch.frame.height + 20;
      //   text.parent = selection.layers[0];
      //   text.style.fontSize = 16;
      //   text.style.textColor = "#666";
      //   text.style.lineHeight = 24;
      //   text.style.alignment = "left";
      //   text.style.fontFamily= 'Open Sans';
      //   text.style.fontWeight= 5;
      //
      //   var textCSS = text.duplicate()
      //
      //   textCSS.frame.y = text.frame.y + 40;
      //   textCSS.text = "."+ LayerStyle.name.toLowerCase().replace(" ","-") + " {"+ getCleanCSS(swatch)+ "}";
      //   textCSS.text = textCSS.text.replace(")}","}");
      //   textCSS.name = LayerStyle.name;
      //   textCSS.fixedWidth = true;
      //   textCSS.frame.height = swatchSize;
      //   textCSS.frame.width = swatchSize;
      //   textCSS.adjustToFit();
      //
      //
      //   column = column + 1;
      //
      //     if (c == ((4 * (row + 1)) - 1)) {
      //       row = row + 1;
      //       column = 0;
      //     }
      //
      //   c = c + 1;
      //
      // // };
      // });


      // parentLocation.name = "Styles Audit ("+ documentColors.length +" Defined Colors, "+ documentLayerStyles.length +" Text Styles, "+ documentLayerStyles.length +" Layer Styles)";
      parentLocation.name = "Layer Styles: "+ documentLayerStyles.length;

  }

  function getCleanCSS(layer) {
    var cleanCSS = layer.sketchObject.CSSAttributes().toString().split('",').join().split('"').join("").replace(/,+/g, '').replace('(', '').replace(')', '')
    // var cleanCSS = layer.sketchObject.CSSAttributes().toString()
    return cleanCSS;
  }


  function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
  }

/// from cheat sheet

// function sortFunction(a, b) {
//     if (a[0] === b[0]) {
//         return 0;
//     }
//     else {
//         return (a[0] < b[0]) ? -1 : 1;
//     }
// }
//
// //a.sort(compareSecondColumn);
//
// function compareSecondColumn(a, b) {
//     if (a[1] === b[1]) {
//         return 0;
//     }
//     else {
//         return (a[1] < b[1]) ? -1 : 1;
//     }
// }





  // function showInputAlert() {
  //
  //   var alertMessage = "\n\n– "+ documentColors.length +" Defined Colors\n\n– "+ documentTextStyles.length +" Text Styles\n\n– "+ documentLayerStyles.length +" Layer Styles\n\n";
  //
  //   var instructionalTextForInput = "\nIn this Document there are:" + alertMessage + "\n" + "Copy and paste in a spreadsheet:");
  //
  //   //// Get user input
  //   var result;
  //
  //   ui.getInputFromUser(
  //     "FreeFlow Text Styles Audit – Beta\n(Colors and Layers Styles coming soon)",
  //     {
  //       initialValue: textStylesAsCSV,
  //       description: instructionalTextForInput,
  //       numberOfLines: 10
  //     },
  //     (err, value) => {
  //       if (err) {
  //         return
  //       } else {
  //         console.log(value)
  //         result = value;
  //       }
  //     }
  //   )
  //
  // }

};
