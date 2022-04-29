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

  var colorVariations = ["900,800,700,600,500,400,300,200,100,50","50,100,200,300,400,500,600,700,800,900"]
  // var colorVariations = ["-40,-20,0,+20,+40","-30,-15,0,+15,+30","-40,-30,-20,-10,0,+10,+20,+30,+40","-30,-20,-10,0,+10,+20,+30","900,800,700,600,500,400,300,200,100,50","50,100,200,300,400,500,600,700,800,900","700,400,200,100","100,200,400,700"]
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

  var numColorVariations = colorVariations.length

  var middleIndex = parseInt(numColorVariations/2)
  if(middleIndex % 2 != 0){
    middleIndex = middleIndex - 1
  }

  var colorVariationsFirst = colorVariations[0]
  var colorVariationsLast = colorVariations[numColorVariations-1]
  var colorVariationsMiddle = colorVariations[middleIndex]
  var colorVariationsMiddleValue = colorVariations[middleIndex]
  var colorVariationsRange = colorVariationsFirst - colorVariationsLast
  var colorVariationsDeltaAbove = (colorVariationsFirst - colorVariationsMiddle)/(numColorVariations-middleIndex)
  var colorVariationsDeltaBelow = (colorVariationsMiddle - colorVariationsLast)/(middleIndex)


  console.log("----------------------------")
  console.log("numColorVariations: " + numColorVariations)
  console.log("colorVariationsFirst: " + colorVariationsFirst)
  console.log("colorVariationsLast: " + colorVariationsLast)
  console.log("colorVariationsRange: " + colorVariationsRange)
  console.log("colorVariationsDeltaAbove: " + colorVariationsDeltaAbove)
  console.log("colorVariationsDeltaBelow: " + colorVariationsDeltaBelow)
  console.log("middleIndex: " + middleIndex)
  console.log("colorVariationsMiddle: " + colorVariationsMiddle)
  console.log("----------------------------")


  var primaryColorScale = ["#D7B2FCff","#CBA3F4ff","#a170d3ff","#9964cfff","#9258ccff","#8240c4ff","#7a34c1ff","#7228bdff","#6a1cb9ff","#560f9fff","#4a0d87ff"]
  var primaryColorScaleReversed = primaryColorScale.reverse()

  // var secondaryColorScale = ["#D7B2FCff","#CBA3F4ff","#a170d3ff","#9964cfff","#9258ccff","#8240c4ff","#7a34c1ff","#7228bdff","#6a1cb9ff","#560f9fff","#4a0d87ff"]
  // var secondaryColorScaleReversed = primaryColorScale.reverse()
  //

  // Simplified primaryColorScale
  // '#d7b2fcff'
  // '#9964cfff'
  // '#8240c4ff'
  // '#6a1cb9ff'
  // '#4a0d87ff'

  // Simplified secondaryColorScale
  // '#fdc68aff'
  // '#fcaf5aff'
  // '#fb982bff'
  // '#fb8a0eff'
  // '#bf6503ff'


// 900,800,700,600,500,400,300,200,100,50
// Create-Color-Scale
// ----------------------------
// numColorVariations: 10
// colorVariationsFirst: 900
// colorVariationsLast: 50
// colorVariationsRange: 850
// colorVariationsDeltaAbove: 100
// colorVariationsDeltaBelow: 70
// middleIndex: 5
// colorVariationsMiddle: 400
// ----------------------------
// Above 500
// Below 350

// 0 ->

// var colorVariationsDelta = (colorVariationsDeltaAbove/100)*


  // Generate colors from selection
  for (c = 0; c < selection.layers.length; ++c){

    var colorName = selection.layers[c].name


    layer = selection.layers[c];

    if (layer.type === "ShapePath"){
      var color = layer.style.fills[0].color;
    }

    if (layer.type === "Shape"){
      var color = layer.style.fills[0].color;
    }

    console.log("---------------")
    console.log("color from fill: " + color )
    color = color.slice(0,7)
    console.log("color from fill: " + color )
    console.log("---------------")


    for (cv = 0; cv < colorVariations.length; ++cv){

      var indexDelta = middleIndex - cv

      var colorVariationsValue = colorVariations[cv];

      console.log("indexDelta: " + indexDelta + " ("+cv+")")
      console.log("colorVariationsValue: " + colorVariationsValue + " ("+cv+")")

        percent = colorVariationsDeltaBelow*(cv-middleIndex)/100;


        // Calculate color
        var newColor = increase_brightness(color,percent)


      // replaces middle value
      if (cv == middleIndex){
        var newColor = color;
        //increase_brightness(color,"0")
        // var newColor = primaryColorScaleReversed[middleIndex]
      }



      result =  result + ", " + newColor

      var newLayer = layer.duplicate();

      newLayer.style.fills[0].color = newColor;

      newLayer.name = colorName + " " + colorVariations[cv]
      newLayer.frame.x = layer.frame.x + (layer.frame.width * cv)

    }

    layer.remove()


  }

};


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

  console.log("RGB Orig to compare w below: " + r +","+g+","+b+";")
  //// RGB to HSL ////

  var colorHSL = RGBToHSL(r,g,b)

  console.log("colorHSL: " + colorHSL)


  var h = colorHSL[0];
  var s = colorHSL[1];
  var l = colorHSL[2];

  console.log("colorHSL Orig to compare w below: " + h +","+s+","+l+";")


  var horig = h;
  var sorig = s;
  var lorig = l;

  console.log("horig: " + horig)
  console.log("sorig: " + sorig)
  console.log("lorig: " + lorig)

  // console.log("HSL: " + h +","+s+","+l+";")

  /// Increase L in HSL ///
  l = l + percent*5;

  console.log("HSL Orig + percentage L: " + horig +","+sorig+","+l+";")

  //// HSL to RGB or HEX ////

  colorRGB = HSLToRGB(horig,sorig,l)

  console.log("colorRGB from HSL: " + HSLToRGB(h,s,l))

  var r = colorRGB[0];
  var g = colorRGB[1];
  var b = colorRGB[2];

  console.log("RGB + percentage: " + r +","+g+","+b+";")
  console.log("RGB + percentage function: " + RGBToHex(r,g,b))


  ////

  return RGBToHex(r,g,b)

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


  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;


  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  //return "hsl(" + h + "," + s + "%," + l + "%)";
  return [h, s, l];
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

  console.log("RGB from HSL")
  console.log(r+","+g+","+b)

  // return "rgb(" + r + "," + g + "," + b + ")";
  return [r, g, b];
}
