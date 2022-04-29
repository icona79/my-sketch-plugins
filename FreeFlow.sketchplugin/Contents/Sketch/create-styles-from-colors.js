// var onRun = function(context) {
//
//   var sketch = require('sketch')
//     var ui = require('sketch/ui')
//
//     var	document = sketch.getSelectedDocument();
//
//     var data = document.sketchObject.documentData();
//     var page = document.selectedPage;
//     var selection = document.selectedLayers;
//     var documentColors = sketch.getSelectedDocument().colors;
//
//     var SharedStyle = require('sketch/dom').SharedStyle
//
//
//     // Detect Sketch Version to create colors or color vars
//     var sketchversion = sketch.version.sketch;
//
//    var layerStyles = document.sharedLayerStyles;
//   //  var textStyles = document.sharedTextStyles;
//     var sharedStyles = document.sharedLayerStyles;
//
//
//
//     console.log("Generate styles (single fills) from Color Variables")
//
//     var layername = "";
//     var stylename = "";
//     var colorname;
//     var colorindex;
//     var layer;
//     var textStyles;
//
//     var arrayColorAssetsValues = documentColors.map(ColorAsset => ColorAsset["color"]);
//     var arrayColorAssetsNames = documentColors.map(ColorAsset => ColorAsset["name"]);
//     var arrayColorNamesAndValues = documentColors.map(ColorAsset => [ColorAsset["name"], ColorAsset["color"]]);
//
//     if (sketchversion >= 69) {
//       var arrayColorVarNames = document.swatches.map(Swatch => Swatch["name"]);
//       var arrayColorVarNamesAndValues = document.swatches.map(Swatch => [Swatch["name"], Swatch["color"]]);
//     }
//
//     console.log(arrayColorAssetsValues)
//     console.log(arrayColorAssetsNames)
//     console.log(arrayColorNamesAndValues)
//
//
//
//     // Generate styles from selection/colors
//     for (c = 0; c < documentColors.length; ++c){
//
//       var documentColor = documentColors[c]
//
//       if (sharedStyle.style.fills[0]) {
//         var color = sharedStyle.style.fills[0].color;
//         console.log(color);
//         colorname = sharedStyle.name;
//
//         // if (arrayColorAssetsNames.indexOf(colorname) === -1) {
//         //   documentColors.push({type: 'ColorAsset', name: colorname, color: color});
//         // } else {
//         //   console.log("already existing color");
//         // }
//
//
//         document.sharedLayerStyles.push({
//           name: '00000',
//           style: layer.style,
//         })
//
//         if (sketchversion >= 69) {
//           const Swatch = sketch.Swatch
//           var newSwatch = Swatch.from({ name: colorname, color: color })
//
//           console.log(newSwatch)
//
//           if (arrayColorVarNames.indexOf(colorname) === -1) {
//             document.swatches.push(newSwatch)
//             }
//             else {
//               console.log("already existing color var");
//             }
//         }
//
//         else {
//           if (arrayColorAssetsNames.indexOf(colorname) === -1) {
//               documentColors.push({type: 'ColorAsset', name: colorname, color: color});
//             } else {
//               console.log("already existing color");
//             }
//
//         }
//         /////
//
//       } else {
//         console.log("not a real fill");
//       }
//
//     }
//
//
//     // ui.message("🌈: Yay! You now have " + documentColors.length + " colors available! 👏 🚀");
//
//     if (sketchversion >= 69) {
//       ui.message("🌈: Yay! You now have " + document.swatches.length + " color variables available! 👏 🚀");
//     } else {
//       ui.message("🌈: Yay! You now have " + documentColors.length + " colors available! 👏 🚀");
//     }
//
//
//
//
// };
