var onRun = function(context) {

  var sketch = require('sketch')
  var ui = require('sketch/ui')
  var Image = require('sketch/dom').Image


  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;

  var Settings = require('sketch/settings')


  var objectType = Settings.globalSettingForKey('savedSelectionTypeGlobal');
  var objectText = Settings.globalSettingForKey('savedSelectionTextGlobal');
  var symbolOverrides = Settings.globalSettingForKey('savedSelectionOverridesGlobal');

  var allSymbols = document.selectedLayers;

  console.log("----- selectedDestinationOverrides and values")

  var selectedDestinationOverrides = context.document.documentData().selectedOverrides(); //

  console.log(selectedDestinationOverrides);

  for (o = 0; o < selectedDestinationOverrides.length; ++o) {
    console.log("----- selected")
    console.log(selectedDestinationOverrides[o].layers)
    console.log("----- END selected")
    if (selectedDestinationOverrides[o].affectedLayer.selected === true){
      console.log(selectedDestinationOverrides[o].affectedLayer.selected)
      console.log(selectedDestinationOverrides[o].affectedLayer.name)
      console.log(selectedDestinationOverrides[o].affectedLayer.value = objectText)
    }
  }


  console.log("----- END selectedDestinationOverrides and values")



  if (symbolOverrides !== undefined) {
    var symbolOverrides_length = symbolOverrides.length;
  } else {
    var symbolOverrides_length = 0;
  }

  console.log("----- symbolOverrides and values")
  console.log(objectType)
  console.log(objectText)
  console.log(symbolOverrides)
  console.log("----- END symbolOverrides")


  //var selection = document.selectedLayers;


  var count = 0;


  for (j = 0; j < allSymbols.length; ++j) {
    console.log("----- Symbol name:")
    console.log(allSymbols.layers[j].name)
    console.log(allSymbols.layers[j].objectType)

    /// WORKS BUT NEED TO ITERATE
    //console.log(allSymbols.layers[j].overrides[0].value = objectText)
    console.log("----- END Symbol name")
    //console.log("----- overrides length:" + symbolOverrides.length)

    if (objectType === "Text") {
      console.log(allSymbols.layers[j].text = objectText)
      console.log(allSymbols.layers[j].value = objectText)
    }

    if (objectType === "ImageData") {
      console.log("ImageData")
      console.log(allSymbols.layers[j])
    }

    for (o = 0; o < symbolOverrides_length; ++o) {


      console.log("name:" + symbolOverrides[o].affectedLayer.name);
      console.log("value:" + (symbolOverrides[o].value || "none"));
      console.log("text:" + (symbolOverrides[o].affectedLayer.text || "none"));
      console.log("image:" + (symbolOverrides[o].affectedLayer.image));

      //layer.overrides[1].affectedLayer.image
      console.log("----- setting to:")
      console.log(symbolOverrides[o].value);
      console.log(allSymbols.layers[j].overrides[o].value);
      console.log(allSymbols.layers[j].overrides[o].affectedLayer.image);


      if (symbolOverrides[o].property != "image") {
          if (symbolOverrides[o].property === allSymbols.layers[j].overrides[o].property) {
            console.log(allSymbols.layers[j].overrides[o].value = symbolOverrides[o].value);
          }
      } else {
        /// set image override
        console.log("----- Image Data:")

        var docPathArray = document.path.split("/");

        console.log("File name:")
        var fileName,docPath;
        console.log(fileName = docPathArray[docPathArray.length-1])
        console.log("File Path:")
        console.log(docPath = docPathArray.join("/"))
        console.log("Doc Path:")
        console.log(docPath = docPath.replace(fileName,""))
        console.log("--------")

        console.log(symbolOverrides[o].value)
        console.log(symbolOverrides[o].value.nsimage)
        console.log(symbolOverrides[o].image)
        console.log(symbolOverrides[o].id)
        console.log(symbolOverrides[o].nsimage)
        console.log(symbolOverrides[o].nsdata)

        console.log("----- Image Data END")


      }




      console.log("----- done setting to")
    }
  }



  ui.message("🌈: Done syncing values (text/overrides) of the selected elements to the source one! 👏 🚀");


};
