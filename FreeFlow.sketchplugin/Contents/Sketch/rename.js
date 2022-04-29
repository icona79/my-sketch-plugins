var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');

  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;

  var allSymbols = document.selectedLayers;

  var count = 0;

  var instructionalTextForInput = "Rename the selected elements:";
  var descriptionText = "– For symbols enter %o followed by the override number to use the value of that override (great for buttons!).\n\n– Artboards, Layers and Groups will be numbered sequentially.\n\n– Add below any string you want to add to the selected elements, if any. It's ok to leave blank.\n\nSPECIAL TOKENS:\n\n%o1 -> First override value\n%o3 -> Third override value\n\n%ln -> Layer name\n\n%v -> Text value\n\n%n -> Number (1,2,3...)\n\n%w or %h -> Width or Height\n\n%fontfamily -> Font family name\n\n%fontweight -> Font weight\n\n%alignment -> Font alignment\n\n%fontsize -> Font size\n\n%textcolor -> Text color\n\nExample:\n%fontfamily / %fontweight %fontsize - %alignment";


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


  var loremIpsum = ["Lorem ipsum dolor sit amet, consectetur adipisicing elit.","Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."];
  var emailAddresses = ["fbmore@gmail.com","janedoe@example.com","fbmore@example.com"];
  var personNames = ["Francesco Bertocci","Jane Doe","Lucy Harris"];
  var timesAgo = ["just now","2min","1hr","1d","2w","1m","4m","1y"];
  var datesInWords = ["Today","Yesterday","One week ago","Two week ago"];

  //var fontWeightsALLAVAILABLEINCLUDINGSYNONIMS = ["Ultra light","Ultra light italic","Thin","Thin italic","Light","Light italic","Book","Book italic","Regular","Italic","Medium","Medium italic","Semibold","Semibold italic","Demi bold","Demi bold italic","Bold","Bold italic","Heavy","Heavy Oblique","ExtraBold","ExtraBold italic","ExtraBold","ExtraBold italic","Condensed ExtraBold"]
  var fontWeights = ["----","----","Ultra light","Light","----","Regular","Medium","Medium Italic","Semibold","Bold","Heavy-ExtraBold","Condensed ExtraBold"];


  var basename = "";

  if (result != ""){
    var basename = result;
  }

  for (j = 0; j < allSymbols.length; ++j) {
    if (allSymbols.layers[j].type === "SymbolMaster" || allSymbols.layers[j].type === "SymbolInstance" || allSymbols.layers[j].type === "ShapePath" || allSymbols.layers[j].type === "Group" || allSymbols.layers[j].type === "Text" || allSymbols.layers[j].type === "Artboard" || allSymbols.layers[j].type === "Image"){
      count = count +1;
    }
  }

  if (count === 0 ){
    ui.message("🌈: 👉 👉 👉 Please select a Symbol, Layer, Text Layer, Artboard or Group! 👈 👈 👈");

  } else {
    count = 0;
    for (j = 0; j < allSymbols.length; ++j) {


      if (allSymbols.layers[j].type === "SymbolMaster"){
        console.log(allSymbols.layers[j].name = basename + allSymbols.layers[j].name);
        allSymbols.layers[j].name = basename.replace("%ln",allSymbols.layers[j].name).replace("%w",allSymbols.layers[j].frame.width).replace("%h",allSymbols.layers[j].frame.height).replace("%n", Number(allSymbols.layers.length - j));
        count = count +1;
      }

      if (allSymbols.layers[j].type === "SymbolInstance"){
        var overrideValue = "";
        if (allSymbols.layers[j].overrides) {
          if (allSymbols.layers[j].overrides[0]){
            var overrideValue1 = allSymbols.layers[j].overrides[0].value || "";
          }
          if (allSymbols.layers[j].overrides[1]){
            var overrideValue2 = allSymbols.layers[j].overrides[1].value || "";
          }
          if (allSymbols.layers[j].overrides[2]){
            var overrideValue3 = allSymbols.layers[j].overrides[2].value || "";
          }
          if (allSymbols.layers[j].overrides[3]){
            var overrideValue4 = allSymbols.layers[j].overrides[3].value || "";
          }
          if (allSymbols.layers[j].overrides[4]){
            var overrideValue5 = allSymbols.layers[j].overrides[4].value || "";
          }
          if (allSymbols.layers[j].overrides[5]){
            var overrideValue6 = allSymbols.layers[j].overrides[5].value || "";
          }

        }
        if (allSymbols.length > 1) {
          //allSymbols.layers[j].name = basename +  overrideValue + (allSymbols.length - j);
          allSymbols.layers[j].name = basename.replace("%o1",overrideValue1).replace("%o2",overrideValue2).replace("%o3",overrideValue3).replace("%o4",overrideValue4).replace("%o5",overrideValue5).replace("%o6",overrideValue6).replace("%ln",allSymbols.layers[j].name).replace("%w",allSymbols.layers[j].frame.width).replace("%h",allSymbols.layers[j].frame.height).replace("%n", Number(allSymbols.layers.length - j));
          //allSymbols.layers[j].name = basename.replace("%o1",overrideValue1).replace("%o2",overrideValue2).replace("%o3",overrideValue3).replace("%o4",overrideValue4).replace("%o5",overrideValue5).replace("%o6",overrideValue6);

        } else {
          //allSymbols.layers[j].name = basename + overrideValue;
          allSymbols.layers[j].name = basename.replace("%o1",overrideValue1).replace("%o2",overrideValue2).replace("%o3",overrideValue3).replace("%o4",overrideValue4).replace("%o5",overrideValue5).replace("%o6",overrideValue6).replace("%ln",allSymbols.layers[j].name).replace("%w",allSymbols.layers[j].frame.width).replace("%h",allSymbols.layers[j].frame.height).replace("%n", Number(allSymbols.layers.length - j));
          //allSymbols.layers[j].name = basename.replace("%o1",overrideValue1).replace("%o2",overrideValue2).replace("%o3",overrideValue3).replace("%o4",overrideValue4).replace("%o5",overrideValue5).replace("%o6",overrideValue6);
        }
        count = count +1;
      }

      if (allSymbols.layers[j].type === "ShapePath"){
        allSymbols.layers[j].name = basename.replace("%ln",allSymbols.layers[j].name).replace("%w",allSymbols.layers[j].frame.width).replace("%h",allSymbols.layers[j].frame.height).replace("%n", Number(allSymbols.layers.length - j));
        count = count +1;
      }

      if (allSymbols.layers[j].type === "Group"){
        allSymbols.layers[j].name = basename.replace("%ln",allSymbols.layers[j].name).replace("%w",allSymbols.layers[j].frame.width).replace("%h",allSymbols.layers[j].frame.height).replace("%n", Number(allSymbols.layers.length - j));
        count = count +1;
      }

      if (allSymbols.layers[j].type === "Image"){
        allSymbols.layers[j].name = basename.replace("%ln",allSymbols.layers[j].name).replace("%w",allSymbols.layers[j].frame.width).replace("%h",allSymbols.layers[j].frame.height).replace("%n", Number(allSymbols.layers.length - j));
        count = count +1;
      }

      if (allSymbols.layers[j].type === "Text"){

        var loremIpsumValue = loremIpsum[Math.floor(Math.random() * loremIpsum.length)] || "";
        var emailAddressValue = emailAddresses[Math.floor(Math.random() * emailAddresses.length)] || "";

        var personNamesValue = personNames[Math.floor(Math.random() * personNames.length)] || "";
        var timesAgoValue = timesAgo[Math.floor(Math.random() * timesAgo.length)] || "";
        var datesInWordsValue = datesInWords[Math.floor(Math.random() * datesInWords.length)] || "";

        var fontweightname = fontWeights[allSymbols.layers[j].style.fontWeight]

        allSymbols.layers[j].name = basename.replace("%ipsum",loremIpsumValue).replace("%email",emailAddressValue).replace("%person",personNamesValue).replace("%timeago",timesAgoValue).replace("%dateinwords",datesInWordsValue).replace("%v",allSymbols.layers[j].text).replace("%ln",allSymbols.layers[j].name).replace("%fontsize",allSymbols.layers[j].style.fontSize).replace("%textcolor",allSymbols.layers[j].style.textColor).replace("%fontfamily",allSymbols.layers[j].style.fontFamily).replace("%fontweight",fontweightname).replace("%alignment",allSymbols.layers[j].style.alignment).replace("%lineheight",allSymbols.layers[j].style.lineHeight).replace("%w",allSymbols.layers[j].frame.width).replace("%h",allSymbols.layers[j].frame.height).replace("%n", Number(allSymbols.layers.length - j));

        // allSymbols.layers[j].text = allSymbols.layers[j].name;

        console.log(allSymbols.layers[j].name)
        // console.log(fontweightname)

        count = count +1;

      }

      if (allSymbols.layers[j].type === "Artboard"){
        //console.log(allSymbols.layers[j].name = basename + (count + 1));
        allSymbols.layers[j].name = basename.replace("%ln",allSymbols.layers[j].name).replace("%w",allSymbols.layers[j].frame.width).replace("%h",allSymbols.layers[j].frame.height).replace("%n", Number(allSymbols.layers.length - j));
        count = count +1;
      }

    }

    ui.message("🌈: Done renaming " + count + " layers! 👏 🚀");

  };
}
