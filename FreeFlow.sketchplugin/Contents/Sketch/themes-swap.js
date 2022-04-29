var onRun = function(context) {

  var sketch = require('sketch')
  var image = sketch.Image
  var ShapePath = sketch.ShapePath
  var Style = sketch.Style
  var Rectangle = sketch.Rectangle
  var Library = require('sketch/dom').Library;
  var ui = require('sketch/ui')


  var	document = sketch.getSelectedDocument();

  var Settings = require('sketch/settings')


  var defaultThemes = "Dark,Light,High-Contrast"

  defaultThemes = Settings.documentSettingForKey(document, 'defaultThemes') || defaultThemes



  var themesArray = defaultThemes.split(",")
  var themesArrayPopped = defaultThemes.split(",")


  var combos = []

  for (l1 = 0; l1 < themesArray.length; l1++){
    // var themesArrayPopped = themesArray.reverse()
    for (l2 = 0; l2 < themesArrayPopped.length; l2++){
      if (themesArray[l1] != themesArrayPopped[l2]) {
        combos.push(themesArray[l1] + " > " + themesArrayPopped[l2])
      }
    }
  }

  console.log(combos)


  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;

  var selectedObjects = document.selectedLayers;

  // var selectedObjects = document.selectedLayers.layers[0].sketchObject.children()



  //// Get user input
  var result; //= [] + [doc askForUserInput:instructionalTextForInput initialValue:""];
  var instructionalTextForInput = "For the selected components and styles, choose a combination 'Source Theme' > 'Target Theme'"

  ui.getInputFromUser(
    "Theme Swapper",
    {
      description: instructionalTextForInput,
      type: ui.INPUT_TYPE.selection,
      possibleValues: combos,
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


  var resultArray = result.split(" > ")

  var sourceTheme = resultArray[0]

  var targetTheme = resultArray[1]
  // var sourceTheme = "Light"

  // var targetTheme = "Dark"

  console.log("sourceTheme")
  console.log(sourceTheme)
  console.log("targetTheme")
  console.log(targetTheme)

  /// Local Symbols
  var symbols = document.getSymbols()
  var arraySymbolsId = symbols.map(layer => layer.id);
  var arraySymbolsNames = symbols.map(layer => layer.name);

  console.log("arraySymbolsId")
  console.log(arraySymbolsId)

  for (n = 0; n < selectedObjects.length; ++n){


    var selectedObject = selectedObjects.layers[n]

    /// swapping styles

    /// Replacing Text and Layer Styles

    if (selectedObject.type !== "SymbolInstance" ){

      if (selectedObject.type === "Text"){
        var styles = document.sharedTextStyles;
        var styleType = "Text";
      }

      if (selectedObject.type === "ShapePath"){
        var styles = document.sharedLayerStyles;
        var styleType = "Layer";
      }

      /// map all styles IDs
      var arrayStyleIDs = styles.map(sharedstyle => sharedstyle["id"]);
      var arrayStyleNames = styles.map(sharedstyle => sharedstyle["name"]);
      var arrayStyleNamesAndIDs = styles.map(sharedstyle => [sharedstyle["name"], sharedstyle["id"]]);
      console.log(arrayStyleIDs)
      console.log(arrayStyleNames)
      console.log(arrayStyleNamesAndIDs)

      var index;
      var currentStyleID = selectedObject.sharedStyleId;
      console.log(currentStyleID);
      // find style name

      if (selectedObject.sharedStyle) {
        var currentStyleName = selectedObject.sharedStyle.name
        console.log(currentStyleName);


        var newStyleName = currentStyleName.replace(sourceTheme,targetTheme)

        index = arrayStyleNames.indexOf(newStyleName);
        console.log(index)

        if (arrayStyleIDs[index]) {
          selectedObject.sharedStyleId = arrayStyleIDs[index];
          selectedObject.style = styles[index].style;

          console.log(selectedObject.sharedStyleId)
          console.log("---------------------")

          var styleNameArray = styles[index].name.split('/');

        }

      }


    } else {


      ///// symbol swap ////

      var sourceObjectName = selectedObject.name
      console.log("sourceObjectName")
      console.log(sourceObjectName)
      console.log("selectedObject -------")
      console.log(selectedObject)
      var sourceObjectName = document.getSymbolMasterWithID(selectedObject.symbolId).name
      console.log("sourceObjectName - Master symbol")
      console.log(sourceObjectName)


      console.log(arraySymbolsId)
      console.log(arraySymbolsNames)

      var newInstanceName = sourceObjectName.replace(sourceTheme,targetTheme)
      var newInstanceIndex = arraySymbolsNames.indexOf(newInstanceName)

      console.log("--------")
      console.log(selectedObject.name)
      console.log(newInstanceName)
      console.log(newInstanceIndex)
      console.log(arraySymbolsId[newInstanceIndex])
      console.log(symbols[newInstanceIndex].name)

      masterSymbol = symbols[newInstanceIndex];
      symbolInstance = masterSymbol.createNewInstance();


      symbolInstance.parent = selectedObject.parent;
      symbolInstance.frame = selectedObject.frame
      symbolInstance.index = selectedObject.index;

      // constraints
      var constraint =  selectedObject.sketchObject.resizingConstraint();
      console.log(constraint);
      symbolInstance.sketchObject.setResizingConstraint(constraint);

      //// Overrides
      var sourceElementOverrides = selectedObject.overrides;
      var selectionElementOverrides = symbolInstance.overrides;

      console.log(sourceElementOverrides)
      for (o = 0; o < sourceElementOverrides.length; ++o) {


        /// source values


        console.log("----- getting source values:")
        console.log("property:" + sourceElementOverrides[o].property);
        console.log("name:" + sourceElementOverrides[o].affectedLayer.name);
        console.log("value:" + (sourceElementOverrides[o].value || "none"));
        console.log("text:" + (sourceElementOverrides[o].affectedLayer.text || "none"));
        console.log("image:" + (sourceElementOverrides[o].affectedLayer.image));

        //layer.overrides[1].affectedLayer.image
        console.log("----- setting destination to:")
        console.log("name:" + selectionElementOverrides[o].affectedLayer.name);
        console.log("value:" + (selectionElementOverrides[o].value || "none"));

        if (sourceElementOverrides[o].affectedLayer.name == selectionElementOverrides[o].affectedLayer.name) {

          if (sourceElementOverrides[o].property !== "layerStyle" && sourceElementOverrides[o].property !== "textStyle") {
            console.log("text:" + (selectionElementOverrides[o].affectedLayer.text || "none"));
            selectionElementOverrides[o].value = sourceElementOverrides[o].value;
          }
          selectionElementOverrides[o].affectedLayer.text  = sourceElementOverrides[o].affectedLayer.text;
        }
        // }
      }
      // }

      symbolInstance.selected = true

      // for (o = 0; o < sourceElementOverrides.length; ++o) {
      //
      //   /// source values
      //   console.log("----- getting source values:")
      //   console.log("name:" + sourceElementOverrides[o].affectedLayer.name);
      //   console.log("value:" + (sourceElementOverrides[o].value || "none"));
      //   console.log("text:" + (sourceElementOverrides[o].affectedLayer.text || "none"));
      //   console.log("image:" + (sourceElementOverrides[o].affectedLayer.image));
      //
      //   //layer.overrides[1].affectedLayer.image
      //   console.log("----- setting destination to:")
      //   console.log("name:" + selectionElementOverrides[o].affectedLayer.name);
      //   console.log("value:" + (selectionElementOverrides[o].value || "none"));
      //   selectionElementOverrides[o].value = sourceElementOverrides[o].value;
      //   console.log("text:" + (selectionElementOverrides[o].affectedLayer.text || "none"));
      //   selectionElementOverrides[o].affectedLayer.text  = sourceElementOverrides[o].affectedLayer.text;
      //
      // }
      //
      // symbolInstance.selected = true


      selectedObject.remove()
    }
  }


  ui.message("🌈: Yay! Swapped! 👏 🚀");


};


// var predicate = NSPredicate.predicateWithFormat('className == %@ && name == %@', 'MSArtboardGroup', 'Library Preview');
// page.children().filteredArrayUsingPredicate(predicate).forEach(function (instance) {
//   return artboardGroups.addObject(instance);
// });
