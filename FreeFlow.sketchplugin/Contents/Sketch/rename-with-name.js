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



  for (j = 0; j < selection.length; ++j) {

    console.log(selection.layers[j].type);


    if (selection.layers[j].type === "SymbolInstance"){
      var currentInstance = selection.layers[j];
      console.log("currentInstance.name");
      console.log(currentInstance.name);
      console.log(currentInstance.id);
      console.log(currentInstance.symbolId);
      var masterSymbolFromInstance = document.getSymbolMasterWithID(currentInstance.symbolId);
      console.log(masterSymbolFromInstance.name);
      currentInstance.name = masterSymbolFromInstance.name;

    }




    if (selection.layers[j].type === "Text" || selection.layers[j].type === "ShapePath"){

      var currentInstance = selection.layers[j];

      var currentStyleID = currentInstance.sharedStyleId;
      var index;
      var name;
      if (currentInstance.type === "Text"){
        index = arrayTextStyleIDs.indexOf(currentStyleID);
        if (index != -1) {
          name = arrayTextStyleNames[index];
        } else {
          currentInstance.name = currentInstance.text
          name = currentInstance.name.split("Copy")[0];
        }
      } else {
        index = arrayLayerStyleIDs.indexOf(currentStyleID);
        if (index != -1) {
          name = arrayLayerStyleNames[index];
        } else {
          name = currentInstance.name.split("Copy")[0];
        }
      }

      currentInstance.name = name;

    }

  }

  ui.message("🌈: Done resetting Layers and Instances names! 👏 🚀");

};
