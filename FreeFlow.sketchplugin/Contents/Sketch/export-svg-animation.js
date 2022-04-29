var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var doc = context.document;

  var document = sketch.getSelectedDocument();


  var documentColors = sketch.getSelectedDocument().colors
  var documentTextStyles = sketch.getSelectedDocument().sharedTextStyles
  var documentLayerStyles = sketch.getSelectedDocument().sharedLayerStyles


  var selectedLayers = document.selectedLayers.layers;

  var count = selectedLayers.length;

  if (count >> 0) {

    var documentColorsFormatted = "// Document Colors\n";
    var ffcolorswatches = ".ffcolorswatches{display: grid;grid-template-columns: repeat(6, 1fr);grid-template-rows: 1fr;grid-column-gap: 24px;grid-row-gap: 48px;}";
    var ff = ".ff{font-family:'SF Pro Text','Open Sans'}";
    var ff12 = ".ff12{font-size:12px;opacity:1}";
    var ff10 = ".ff10{font-size:10px;opacity:1}";
    var ffbranding = ".ffbranding{position:fixed;bottom:4px;left:16px;z-index:10000;}";
    var p = "p{margin:16px;}";
    var a = "a{text-decoration:none;}";
    var ffa = "ffa{transition: .5s; transition-timing-function: ease-in-out;} a:hover{letter-spacing: 1px; text-decoration:1px dotted}";
    var expand = ".showcontentonhover {display: none; width: 100%; max-width: 640px; max-height: 300px;} .showcontentonhover:target {display: block;}";



    var ffcolorsswatch = ".ffcolorsswatch{width:200px;height:200px;}";
    var ffcolorstitle = ".ffcolorstitle{font-size:16px;opacity:.5;margin-top: 200px;background-color:white;width:100px;height:40px;padding:16px;}";
    var documentColorsFormattedRoot = "";
    var documentTextStyleFormatted = "";
    var documentLayerStyleFormatted = "";
    var textstylesexamples = "";
    var layerstylesexamples = "";
    var colorsexamples = "";

    var layersToSVGFrames = "";


    var ffHTMLStyling = "body { color: gray; background-color: #f4f4f4;"
    + "margin: 0px;\n"
    + "}\n\n";

    var ffCSSFRames = "\n\n"+ "svg {width:100%; background-color: white;}"+"\n\n"


    console.log(selectedLayers.length)

    var selection = document.selectedLayers;

    var overridesArray;

    var sizeAndViewBoxValues = "width='" + selectedLayers[0].frame.width + "px' height='" + selectedLayers[0].frame.height + "px' viewBox='0 0 " + selectedLayers[0].frame.width + " " + selectedLayers[0].frame.height + "'";
    var svgVersion = "version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'"

    // var keyTimesValues='0;0.33;0.66;1'
    var keyTimesValues = "0;"
    var defaultFrameDuration = 250;
    // var defaultTotalDuration = 0.1
    var totalDuration = 0;

    for (i = 0; i < selection.length; ++i) {

      if (selection.layers[i].name.includes("[ms")) {
        var customFrameDuration = parseInt(selection.layers[i].name.split("[ms ")[1].replace("]",""))
        totalDuration = totalDuration + customFrameDuration
        console.log(totalDuration);
      } else {
        totalDuration = totalDuration + defaultFrameDuration;
        console.log(totalDuration);
      }


      // if (selection.layers[i].layers[0].type === "SymbolInstance"){
      //     if (selection.layers[i].layers[0].name === "animation_properties"){
      //       totalDuration = totalDuration + parseInt(selection.layers[i].layers[0].overrides[0].value))
      //     } else {
      //       totalDuration = totalDuration + defaultFrameDuration;
      //     }
      //   }
      //   else {
      //     totalDuration = totalDuration + defaultFrameDuration;
      //   }
    }

    console.log("totalDuration")
    console.log(totalDuration)


    // for (i = 0; i < selection.length -1; ++i) {
    //
    //   console.log("selection.layers[0].type")
    //   console.log(selection.layers[i].layers[0].name)
    //   if (selection.layers[i].layers[0].type === "SymbolInstance"){
    //       if (selection.layers[i].layers[0].name === "animation_properties"){
    //         console.log(selection.layers[i].layers[0].type)
    //         console.log(selection.layers[i].layers[0].name)
    //         console.log(selection.layers[i].layers[0].overrides[0].value)
    //         console.log(parseInt(selection.layers[i].layers[0].overrides[0].value))
    //
    //       } else {
    //
    //       }
    //     }
    // }



    console.log("-------- POINTS ----------")
    var pointDuration = 0;
    var elapsedTimeAtPoint = 0;
    var elapsedTimeAtPointNormalized = 0;


    for (kv = 0; kv < selection.length-1; ++kv){
      console.log("point " + kv)
      console.log(selection.layers[kv].layers[0].type)
      console.log(selection.layers[kv].layers[0].name)


      if (selection.layers[kv].name.includes("[ms")) {
        var customFrameDuration = parseInt(selection.layers[kv].name.split("[ms ")[1].replace("]",""))
        pointDuration = customFrameDuration;
      }
      else {
        pointDuration = defaultFrameDuration;
      }


      elapsedTimeAtPoint = elapsedTimeAtPoint + pointDuration

      console.log(pointDuration + " / " + elapsedTimeAtPoint  + " / " + totalDuration )

      // pointInTime = pointInTime

      // elapsedTimeAtPoint = elapsedTimeAtPoint + pointDuration;

      // if (selection.layers[kv].layers[0].type === "SymbolInstance") {
      //     if (selection.layers[kv].layers[0].name === "animation_properties"){
      //       pointDuration = (parseInt(selection.layers[kv].layers[0].overrides[0].value)))
      //       console.log("custom point")
      //       console.log(pointInTime)
      //       elapsedTimeAtPoint = elapsedTimeAtPoint + pointDuration;
      //     }
      // }

      keyTimesValues = keyTimesValues + elapsedTimeAtPoint/totalDuration +";"
      console.log("elapsedTimeAtPoint")
      console.log(elapsedTimeAtPoint)
      console.log("keyTimesValues so far")
      console.log(keyTimesValues)
    }
    console.log("-------- keyTimesValues ----------")

    keyTimesValues = keyTimesValues + "1"

    console.log(keyTimesValues)


    totalDuration = totalDuration /1000;


    for (c = 0; c < selectedLayers.length; ++c){

      // selectedLayers.forEach((Layer) => {
      console.log(selectedLayers[c].name)

      var layerToSVG;
      var slice = selectedLayers[c];
      var options = {
        formats: "svg",
        output: false
      }

      var svgCode = sketch.export(slice, options).toString();

      // SVG content ONLY
      // console.log("SVG w g elements only:\n" + svgCode.split("</title>")[1].split("</svg>")[0]);
      layerToSVG = svgCode.split("</title>")[1].split("</svg>")[0];

      var layerAnimationValues = ""
      for (v = 0; v < selectedLayers.length + 1; ++v){
        if (v === c) {
          layerAnimationValues = layerAnimationValues + "inline;"
        } else {
          layerAnimationValues = layerAnimationValues + "none;"
        }
      }

      // layerAnimationValues =  "inline;" + layerAnimationValues


      var layerAnimaion = "<animate id='"+ selectedLayers[c].name +"' attributeName='display' values='" + layerAnimationValues +"' keyTimes='" + keyTimesValues +"' dur='"+ totalDuration +"s' begin='0s' repeatCount='indefinite' />"

      // SVG w description
      // console.log("SVG w description:\n" + svgCode);
      layersToSVGFrames = layersToSVGFrames + "<g>" + layerToSVG + layerAnimaion  +"</g>";

    };


    var svgContent = "<?xml version='1.0' encoding='UTF-8'?>\n" + "<svg "+ sizeAndViewBoxValues +" "+ svgVersion +" >" + layersToSVGFrames + "</svg>";


    var metatags = "<meta content='width=device-width, initial-scale=1, user-scalable=no' name='viewport'>\n<meta content='yes' name='apple-mobile-web-app-capable'>\n<meta content='FreeFlow Animation' name='apple-mobile-web-app-title'>\n<meta name='apple-mobile-web-app-status-bar-style' content='default'>"


    var htmlpage = "<!DOCTYPE html><html><head><title>FreeFlow Animation</title>"+metatags+"<style type='text/css'>" + ":root {\n" + documentColorsFormattedRoot + "}\n\n"
    + ffHTMLStyling + "\n\n"
    + ffCSSFRames + "\n\n"
    + ff
    + ff12
    + ff10
    + ffbranding
    + p
    + a

    + expand
    + "\n\n"+ "</style></head><body>\n\n"
    + "\n\n"+ "<!–– Animation made with FreeFlow for Sketch ––>\n\n"
    + "\n\n"+ "<!–– Copy the SVG animation below ––>\n\n"
    + svgContent
    + "\n\n"+ "<!–– Copy the SVG animation above ––>\n\n"
    + "\n\n<p class='ff ff10 ffa' ><a href='http://free-flow.co?ref=animation' alt='Made with 🌈 FreeFlow for Sketch' title='Made with 🌈 FreeFlow for Sketch'>🌈</a>"
    + "&nbsp;&nbsp;–&nbsp;&nbsp;<a class='ff ff10 ffa' alt='Get SVG animation code' title='Get SVG animation code' href='#svgcodearea'>⚙️&nbsp;</a>"
    + "<br><br>"
    + "<textarea class='showcontentonhover' id='svgcodearea' name='svgcodetocopy' rows='60' cols='200'>"
    + svgContent
    +"</textarea></p>"
    + "</body></html>";


    var htmlContent = NSString.stringWithString_(htmlpage);
    var filepath = NSTemporaryDirectory() + "FreeFlowAnimation" + ".html";
    htmlContent
    .dataUsingEncoding_(NSUTF8StringEncoding)
    .writeToFile_atomically_(filepath, true);
    var file = NSURL.fileURLWithPath(filepath);
    NSWorkspace.sharedWorkspace().openFile(file.path());

    ui.message("🌈: Done exporting " + count + " artboards to an SVG animation! 👏 🚀");
    NSWorkspace.sharedWorkspace().openFile(file.path());

  } else {
    // ui.message("🌈: Please select at least 1 layer to export as an SVG animation! 👏 🚀");

    var instructionalTextForInput = "FreeFlow Export Animation"
    var descriptionText = "Please select at least 1 Artboard to export as an SVG animation.\n\nAppend an optional custom duration to each artboard name. For example:\n\nArtboard Name [ms 250] -> 1/4 of second;\n\nArtboard Name [ms 500] -> 1/2 second;\n\nArtboard Name [ms 1000] -> 1 second;\n\nTip: If fonts look funny convert to outline before exporting."


    ui.alert(instructionalTextForInput, descriptionText)

  }


};
