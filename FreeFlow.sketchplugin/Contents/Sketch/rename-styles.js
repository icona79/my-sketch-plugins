var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var	document = sketch.getSelectedDocument();
  var libraries = require('sketch/dom').getLibraries()

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;

  var textStyles = document.sharedTextStyles;
  var layerStyles = document.sharedLayerStyles;

  var arrayTextStyleIDs = textStyles.map(sharedstyle => sharedstyle["id"]);
  var arrayTextStyleNames = textStyles.map(sharedstyle => sharedstyle["name"]);
  var arrayTextStyleNamesAndIDs = textStyles.map(sharedstyle => [sharedstyle["name"], sharedstyle["id"]]);

  var fontWeights = ["----","----","Ultra light","Light","----","Regular","Medium","Medium Italic","Semibold","Bold","Heavy-ExtraBold","Condensed ExtraBold"];


  var arrayLayerStyleIDs = layerStyles.map(sharedstyle => sharedstyle["id"]);
  var arrayLayerStyleNames = layerStyles.map(sharedstyle => sharedstyle["name"]);
  var arrayLayerStyleNamesAndIDs = layerStyles.map(sharedstyle => [sharedstyle["name"], sharedstyle["id"]]);



  var count = 0;
  var nextX = 0;
  var nextY = 0;
  var nextXincrement = 100;
  var nextYincrement = 200;
  var currentSymbolWidth = 0;
  var currentSymbolHeight = 0;
  var previousSymbolWidth = 0;
  var previousSymbolHeight = 0;
  var currentX = 0;
  var currentY = 0;

  var library = libraries[0];


  var masterSymbol;
  var symbolInstance;
  var symbolNameArray;
  var symbolNameForAcronym;


  /// Renaming StylesArray
  var count = 0;

  var instructionalTextForInput = "Rename Text Styles in this document";
  var descriptionText = "Find and replace any string in your Text Style names.\n\nFor example enter:\n\nChange String>This String\n\nWe'll find any Style name including 'Change String' and replace it with 'This String'.\n\nLeave 'This String' empty to just remove 'Change_String'.\n\n🤗 Keep in mind that it's Case Sensitive."
  //\n\nSPECIAL TOKENS:\n%ln -> Layer name\n\n%n -> Number (1,2,3...)\n\n%fontfamily -> Font family name\n\n%fontweight -> Font weight\n\n%alignment -> Font alignment\n\n%fontsize -> Font size\n\n%textcolor -> Text color\n\nExample:\n%fontfamily / %fontweight %fontsize - %alignment";


  ui.getInputFromUser(
    instructionalTextForInput,
    {
      initialValue: "",
      description: descriptionText,
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      } else {
        result = value;

      }
    }
  )


  for (j = 0; j < arrayTextStyleNames.length; ++j) {

      var resultArray = result.split(">")
      console.log("resultArray")
      console.log(resultArray)

      var style = document.sharedTextStyles[j].style;
      var stylename = document.sharedTextStyles[j].name;
      console.log(style.fontWeight);
      var fontweightname = fontWeights[style.fontWeight]
      console.log(fontweightname);

      var changeString = resultArray[0] || "";
      var thisString = resultArray[1] || "";

      console.log(style);

      // thisString = thisString.replace("%sn",stylename).replace("%fontsize",style.fontSize).replace("%textcolor",style.textColor).replace("%fontfamily",style.fontFamily).replace("%fontweight",fontweightname).replace("%alignment",style.alignment).replace("%lineheight",style.lineHeight);
      // changeString = changeString.replace("%sn",stylename).replace("%fontsize",style.fontSize).replace("%textcolor",style.textColor).replace("%fontfamily",style.fontFamily).replace("%fontweight",fontweightname).replace("%alignment",style.alignment).replace("%lineheight",style.lineHeight);
      // if (thisString.includes("%sn")){
      //   thisString = thisString.replace("%sn",stylename);
      // }

      thisString = thisString.replace("%fontsize",style.fontSize).replace("%textcolor",style.textColor).replace("%fontfamily",style.fontFamily).replace("%fontweight",fontweightname).replace("%alignment",style.alignment).replace("%lineheight",style.lineHeight);
      // thisString = thisString.replace("%fontsize",style.fontSize)

      console.log(thisString);

      document.sharedTextStyles[j].name = stylename.replace(changeString,thisString)

  }



  ui.message("🌈: Done cleaning up Layers and Instances names! 👏 🚀");



};
