var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var	document = sketch.getSelectedDocument();
  var libraries = require('sketch/dom').getLibraries()

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;

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

  var symbols = document.getSymbols()

  var arraySymbolsID = symbols.map(layer => layer.id);
  console.log(arraySymbolsID)


  console.log(symbols.length)

  var masterSymbol;
  var symbolInstance;
  var symbolNameArray;
  var symbolNameForAcronym;

  console.log(selection.layers[0].type);

  /// Replacing Symbol Instances

  if (selection.layers[0].type === "SymbolInstance"){
    var currentInstance = selection.layers[0];
    console.log("currentInstance.name");
    console.log(currentInstance.name);
    console.log(currentInstance.id);
    console.log(currentInstance.symbolId);
    var masterSymbolFromInstance = document.getSymbolMasterWithID(currentInstance.symbolId);
    console.log(masterSymbolFromInstance.name);
    console.log("--------");

    var e = arraySymbolsID.indexOf(masterSymbolFromInstance.id) + 1;
    if (e == arraySymbolsID.length){
      e = 0;
    }
    console.log("next: " + e);

    masterSymbol = symbols[e];
    symbolInstance = masterSymbol.createNewInstance();
    symbolInstance.parent = selection.layers[0].parent;
    symbolInstance.index = selection.layers[0].index;
    // symbolInstance.overrides = selection.layers[0].overrides;
    console.log(selection.layers[0].overrides);


    symbolNameArray = masterSymbol.name.split("/");
    symbolNameForAcronym = symbolNameArray[symbolNameArray.length-1] || masterSymbol.name;

    symbolInstance.name = symbolNameForAcronym.trim();

    console.log("width:" + currentSymbolWidth)
    console.log("height:" + currentSymbolHeight)

    symbolInstance.frame.x = selection.layers[0].frame.x;
    symbolInstance.frame.y = selection.layers[0].frame.y;


    selection.layers[0].remove();

    symbolInstance.selected = true;

    count = count+1;

    currentX = 0;
    currentY = 0;

    ui.message("🌈: Done replacing Symbol Instance with previous Symbol Instance: "+symbolInstance.name+"! 👏 🚀");
  }

  /// Replacing Text and Layer Styles

  if (selection.layers[0].type === "Text" || selection.layers[0].type === "ShapePath"){

    if (selection.layers[0].type === "Text"){
      var styles = document.sharedTextStyles;
      var styleType = "Text";
    }

    if (selection.layers[0].type === "ShapePath"){
      var styles = document.sharedLayerStyles;
      var styleType = "Layer";
    }

    //console.log(styles)
    /// map all styles IDs
    var arrayStyleIDs = styles.map(sharedstyle => sharedstyle["id"]);
    var arrayStyleNames = styles.map(sharedstyle => sharedstyle["name"]);
    var arrayStyleNamesAndIDs = styles.map(sharedstyle => [sharedstyle["name"], sharedstyle["id"]]);
    console.log(arrayStyleIDs)
    console.log(arrayStyleNames)
    console.log(arrayStyleNamesAndIDs)

    arrayStyleNamesAndIDs.sort(sortFunction);

    function sortFunction(a, b) {
      if (a[0] === b[0]) {
        return 0;
      }
      else {
        return (a[0] < b[0]) ? -1 : 1;
      }
    }

    console.log("Alpha sorted")
    console.log(arrayStyleNamesAndIDs)

    var index;
    var currentStyleID = selection.layers[0].sharedStyleId;
    console.log(currentStyleID);
    //
    index = arrayStyleIDs.indexOf(currentStyleID);
    console.log(index)

    index = index + 1;

    console.log("incremented: " +index)
    if (index == arrayStyleIDs.length){
      index = 0;
    }

    console.log(index)


    // Not perfect as Sketch doesn't update the appearance atm (requires to deselect and reselect a layer)
    selection.layers[0].sharedStyleId = arrayStyleIDs[index];
    selection.layers[0].style = styles[index].style;
    console.log(selection.layers[0].sharedStyleId)

    console.log("---------------------")

    var styleNameArray = styles[index].name.split('/');

    ui.message("🌈: Replaced Current "+styleType+" Style with previous "+styleType+" Style: "+ styleNameArray[styleNameArray.length-1] +"! 👏 🚀");

  }

};
