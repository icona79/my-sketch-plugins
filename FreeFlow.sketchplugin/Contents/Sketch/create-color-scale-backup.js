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

  console.log("Generate color scale from selection")

  var layername = "";
  var stylename = "";
  var colorname;
  var colorindex;
  var layer;
  var textStyles;

  var colorVariations = ["-40,-20,0,+20,+40","-30,-15,0,+15,+30","-40,-30,-20,-10,0,+10,+20,+30,+40","-30,-20,-10,0,+10,+20,+30","900,800,700,600,500,400,300,200,100,50","50,100,200,300,400,500,600,700,800,900","700,400,200,100","100,200,400,700"]
  //colorVariations = colorVariations +


  // 900,800,700,600,500,400,300,200,100,50

  var result;

  var instructionalTextForInput = "Choose a Color scale pattern you'd like to use, the name and color of the selected layers will be used as starting point."

  ui.getInputFromUser(
    "Generate a Color Scale",
    {
      description: instructionalTextForInput,
      type: ui.INPUT_TYPE.selection,
      possibleValues: colorVariations,
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      } else {
        console.log(value)
        result = value;
      }
    }
  )

  colorVariations = result.split(",")



  // Generate colors from selection
  for (c = 0; c < selection.layers.length; ++c){

    var colorName = selection.layers[c].name


    layer = selection.layers[c];


    console.log("What is it?")
    // if (layer.type === "Text"){
    //   var color = layer.style.textColor;
    // }
    if (layer.type === "ShapePath"){
      var color = layer.style.fills[0].color;
    }

    if (layer.type === "Shape"){
      var color = layer.style.fills[0].color;
    }

    //console.log(RGBToHSL(255,255,255))

    var numColorVariations = colorVariations.length

    console.log("numColorVariations: " + numColorVariations)


    var middleIndex = parseInt(numColorVariations/2)

    if(middleIndex % 2 != 0){
      middleIndex = middleIndex - 1
    }

    var colorVariationsMiddleValue = colorVariations[middleIndex]



    console.log("middleIndex: " + middleIndex)
    console.log("colorVariationsMiddleValue: " + colorVariationsMiddleValue)


    for (cv = 0; cv < colorVariations.length; ++cv){

      var indexDelta = middleIndex - cv

      var colorVariationsValue = colorVariations[cv];

      console.log("indexDelta: " + indexDelta + " ("+cv+")")
      console.log("colorVariationsValue: " + colorVariationsValue + " ("+cv+")")


      if (colorVariationsValue >= 50){
        colorVariationsValue = colorVariationsValue/10;
        colorVariationsMiddleValue = colorVariationsMiddleValue/10;
      }

      // if (colorVariations[cv] > colorVariationsMiddleValue){
        // var delta = colorVariations[cv] - colorVariationsMiddleValue;
        var delta = indexDelta * 10
        /// (colorVariations[cv] - colorVariationsMiddleValue)
        //*(colorVariations[cv] - colorVariationsMiddleValue);
        var newColor = increase_brightness(color,delta)
      // }
      // } else {
      //   // var delta = colorVariationsMiddleValue - colorVariations[cv];
      //   var delta = indexDelta * 10 * (colorVariations[cv] - colorVariationsMiddleValue);
      //   var newColor = increase_brightness(color,delta)
      // }

      // if (colorVariationsValue < 0){
      //   colorVariationsValue = colorVariationsValue/10;
      // } else {
      //   colorVariationsValue = colorVariationsValue/10;
      // }

      // var newColor = increase_brightness(color,colorVariationsValue)

      // if (colorVariationsValue < 0){
      //   var newColor = increase_brightness(color,delta)
      // }
      //
      // if (colorVariationsValue > 0){
      //   var newColor = increase_brightness(color,delta)
      // }


      // replaces middle value
      if (cv == middleIndex){
        var newColor = increase_brightness(color,"0")
      }





      // if (colorVariations[1] < 100) {
      //
      //   var newColor = increase_brightness(color,colorVariations[cv])
      //
      // } else {
      //
      //   // if (colorVariations[cv] > 700) {
      //   //   var newColor = increase_brightness(color,colorVariations[cv]/40)
      //   // } else {
      //     var newColor = increase_brightness(color,colorVariations[cv]/30)
      //   // }
      //
      // }


      result =  result + ", " + newColor

      var newLayer = layer.duplicate();

      newLayer.style.fills[0].color = newColor;

      newLayer.name = colorName + " " + colorVariations[cv]
      newLayer.frame.x = layer.frame.x + (layer.frame.width * cv)

    }

    layer.remove()


  }

};

// function decrease_brightness(hex, percent){
//   // strip the leading # if it's there
//   hex = hex.replace(/^\s*#|\s*$/g, '');
//
//   // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
//   if(hex.length == 3){
//     hex = hex.replace(/(.)/g, '$1$1');
//   }
//
//   var r = parseInt(hex.substr(0, 2), 16),
//   g = parseInt(hex.substr(2, 2), 16),
//   b = parseInt(hex.substr(4, 2), 16);
//
//   return '#' +
//   ((0|(1<<8) + r + (r - 256) * percent / 100).toString(16)).substr(1) +
//   ((0|(1<<8) + g + (g - 256) * percent / 100).toString(16)).substr(1) +
//   ((0|(1<<8) + b + (b - 256) * percent / 100).toString(16)).substr(1);
// }

function increase_brightness(hex, percent){
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if(hex.length == 3){
    hex = hex.replace(/(.)/g, '$1$1');
  }

  var r = parseInt(hex.substr(0, 2), 16),
  g = parseInt(hex.substr(2, 2), 16),
  b = parseInt(hex.substr(4, 2), 16);

  /// Convert to HSL
  var colorHSL = RGBToHSL(r,g,b)
  console.log(colorHSL)

  var h = colorHSL.split("hsl(")[1].split(",")[0]
  var s = colorHSL.split(",")[1].replace("%","")
  var l = colorHSL.split("%,")[1].replace("%)","")

  //l = l
  console.log(h + "," + s + "," + l)
  console.log("HSLToRGB(h,s,l)")
  var colorRGB = HSLToRGB(parseInt(h),parseInt(s),parseInt(l))
  console.log(colorRGB)

  console.log("HSLToRGB(h,s,l+10)")
  var colorRGB = HSLToRGB(parseInt(h),parseInt(s),parseInt(l)+10)
  console.log(colorRGB)
  // returns "rgb(" + r + "," + g + "," + b + ")";
  // var r = colorRGB.split("rgb(")[1].split(",")[0]
  // var g = colorRGB.split(",")[1]
  // var b = colorRGB.split(",")[1].replace(")","")
  // console.log("RGB values")
  // console.log(r + "," + g + "," + b)

  // return colorRGB

  // return '#' +
  // ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
  // ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
  // ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
    return '#' +
    ((0|(1<<8) + r + (r - 256) * percent / 100).toString(16)).substr(1) +
    ((0|(1<<8) + g + (g - 256) * percent / 100).toString(16)).substr(1) +
    ((0|(1<<8) + b + (b - 256) * percent / 100).toString(16)).substr(1);

}

/// RGBToHex

function RGBToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

/// RGBToHSL

function RGBToHSL(r,g,b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
}


/// HSLToRGB

function HSLToRGB(h,s,l) {
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return "rgb(" + r + "," + g + "," + b + ")";
}
