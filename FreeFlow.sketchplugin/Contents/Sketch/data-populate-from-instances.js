var onRun = function(context) {

  var sketch = require('sketch')
  var ui = require('sketch/ui')
  var Settings = require('sketch/settings')
  var Image = require('sketch/dom').Image
  var Group = require('sketch/dom').Group



  console.log("----- MULTIPLE INSTANCES")


  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;

  ///////////////////////////////////////////////////////////////////////////

  // var	document = sketch.getSelectedDocument();

  //var data = document.sketchObject.documentData();
  // var page = document.selectedPage;
  // var selection = document.selectedLayers;

  var result;

  if (selection.length == 0) {
    ui.message("🌈: 👉 👉 👉 Please select a Symbol or Text Layers to use as template! 👈 👈 👈");
  }

  // var doc = context.document;

  var startx = 0;
  var starty = 0;
  var parent = selection.layers[0];

  var overrideLabels = "";
  var overrideLabelsIndex = [];
  var overrideLabelsExample = "";

  /// IF NOT AN INSTANCE TURN ELEMENT INTO A TEMPORARY INSTANCE
  if (selection.layers[0].type !== "SymbolInstance") {

    var tempSymbol = 1;

    // console.log("hi")
    /// selection
    var selectedLayers = selection;
    var selectedCount = selectedLayers.length;
    var selection2 = context.selection;
    var selections = selection2.objectEnumerator();
    var count = 0;

    console.log(selection2.length)
    //Loop over the selected layers/groups and add them to the symbols page skipping the options
    // FIX turning an Artboard into a Symbol
    while (s = selections.nextObject()) {
      var symbols = MSLayerArray.arrayWithLayers([s]);
      var symbolName = s.name();
      var createSymbol = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(symbols, symbolName, true);
      var simplifiedNameArray = symbolName.split("/");
      var simplifiedName = simplifiedNameArray[simplifiedNameArray.length - 1]
      createSymbol.name = simplifiedName;
      console.log(selection.length)
      count = count + 1;
      //document.selectedLayers = selectedLayers;
    }


  }

  var overridesArray = selection.layers[0].overrides;
  // var overridesArray = createSymbol.overrides;

  for (i = 0; i < overridesArray.length; ++i) {
    console.log("TYPE:");
    console.log(overridesArray[i].affectedLayer.type);
    console.log("Editable:");
    console.log(overridesArray[i].editable);

    /// Retrieve Override Labels
    if (overridesArray[i].editable && overridesArray[i].property === "stringValue" && overridesArray[i].affectedLayer.type === "Text") {
      overrideLabels = overrideLabels + overridesArray[i].affectedLayer.name +", ";
    }

    /// Create Override Examples
    if (overridesArray[i].editable && overridesArray[i].property === "stringValue" && overridesArray[i].affectedLayer.type === "Text") {
      overrideLabelsExample = overrideLabelsExample +"\"" + overridesArray[i].affectedLayer.name +" value\", ";
    }

    console.log("overrideLabelsIndex at Override: " + i);
    if (overridesArray[i].editable) {
      overrideLabelsIndex.push(i);
    }
    console.log(overrideLabelsIndex);
    console.log(overridesArray[i].affectedLayer.locked);
    console.log(overridesArray[i].affectedLayer.editable);
  }

  var overrideLabelsSlice = overrideLabels.slice(0,overrideLabels.length-2);

  var instructionalTextForInput = "👉 Enter the desired override values this way:\n\n1\) Separated by a comma \(,\) \n\n2\) Each row generates an instance :\)\n\n3\) If values are longer than 1 word or contain a comma \(,\) make sure they are between double quotes \(\" \"\)\n\nIn this order:\n\n" + overrideLabelsSlice + "\n\n👇Paste CSV below or enter values by hand:";

  //// Get user input
  // ui.getInputFromUser(
  //   "Populate Selected Instance with CSV data (Beta)",
  //   {
  //     initialValue: overrideLabelsExample + "\n" + overrideLabelsExample + "\n" + overrideLabelsExample,
  //     description: instructionalTextForInput,
  //     numberOfLines: 10
  //   },
  //   (err, value) => {
  //     if (err) {
  //       // most likely the user canceled the input
  //       return;
  //     } else {
  //       console.log(value);
  //       result = value;
  //     }
  //   }
  // );


  /// Get imput from Source Symbol


  var sourceElementsIDs = Settings.globalSettingForKey('savedFullSelectionIDsGlobal');
  console.log(sourceElementsIDs);

  var selectionElementsIDs = selection.map(layer => layer.id);
  console.log(selectionElementsIDs);

  for (id = 0; id < sourceElementsIDs.length; ++id){

    var sourceElement = document.getLayerWithID(sourceElementsIDs[id]);

    var symbolMaster = document.getSymbolMasterWithID(sourceElement.symbolId)

    // var data_from_symbol = symbolMaster


    // var selectionElement = document.getLayerWithID(selectionElementsIDs[id]);
    var selectionElement = selection.layers[0];

    /// SETS SOURCE ELEMENT ID for each instance
    // Settings.setLayerSettingForKey(selectionElement, 'sourceElementID', sourceElementsIDs[id])

    var sourceElementsID = Settings.layerSettingForKey(selectionElement, 'sourceElementID')

    console.log("----- sourceElementsID:")
    console.log(sourceElementsID)
    console.log("----- END sourceElementsID:")

    console.log(sourceElement.name)
    console.log(selectionElement.name)

    var sourceElementOverrides = sourceElement.overrides;
    var selectionElementOverrides = selectionElement.overrides;

    console.log(sourceElementOverrides)



    // for (o = 0; o < sourceElementOverrides.length; ++o) {
    for (o = 0; o < sourceElementOverrides.length; ++o) {
    //
    //     /// source values
        console.log("----- getting source values:")
        console.log("name:" + sourceElementOverrides[o].affectedLayer.name);
        console.log("value:" + (sourceElementOverrides[o].value || "none"));
        console.log("text:" + (sourceElementOverrides[o].affectedLayer.text || "none"));

        result = sourceElementOverrides[o].affectedLayer.text;

        ///
        ///console.log("image:" + (sourceElementOverrides[o].affectedLayer.image));
    //
    //     //layer.overrides[1].affectedLayer.image
    //     console.log("----- setting destination to:")
    //     console.log("name:" + selectionElementOverrides[o].affectedLayer.name);
    //     console.log("value:" + (selectionElementOverrides[o].value || "none"));
    //     selectionElementOverrides[o].value = sourceElementOverrides[o].value;
    //     console.log("text:" + (selectionElementOverrides[o].affectedLayer.text || "none"));
    //     selectionElementOverrides[o].affectedLayer.text  = sourceElementOverrides[o].affectedLayer.text;
    //
    //
    //   }

      // var sketchversion = sketch.version.sketch;
      //
      // /// Works up to v60.1
      // if (sketchversion <= 61) {
      //   selectionElement._object.resizeToFitContentsIfNeededNoCache();
      //   /// Added message as otherwise on <v60 there will be no msg as following line will through an error
      // }
      //
      // /// Works from v61 and up
      // if (sketchversion >> 61.1) {
      //   selectionElement._object.resizeWithSmartLayout();
      // }


    // var count = 0;

    }
  }



  ///////


  console.log("result");
  console.log(result);
  var goodQuotes = result.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
  console.log(goodQuotes);
  result = goodQuotes;
  console.log(result);
  console.log("result");


  /**
  * Convert data in CSV (comma separated value) format to a javascript array.
  *
  * Values are separated by a comma, or by a custom one character delimeter.
  * Rows are separated by a new-line character.
  *
  * Leading and trailing spaces and tabs are ignored.
  * Values may optionally be enclosed by double quotes.
  * Values containing a special character (comma's, double-quotes, or new-lines)
  *   must be enclosed by double-quotes.
  * Embedded double-quotes must be represented by a pair of consecutive
  * double-quotes.
  *
  * Example usage:
  *   var csv = '"x", "y", "z"\n12.3, 2.3, 8.7\n4.5, 1.2, -5.6\n';
  *   var array = csv2array(csv);
  *
  * Author: Jos de Jong, 2010
  *
  * @param {string} data      The data in CSV format.
  * @param {string} delimeter [optional] a custom delimeter. Comma ',' by default
  *                           The Delimeter must be a single character.
  * @return {Array} array     A two dimensional array containing the data
  * @throw {String} error     The method throws an error when there is an
  *                           error in the provided data.
  */

  csv = result;

  var array = csv2array(csv);

  console.log(array);

  function csv2array(data, delimeter) {
    // Retrieve the delimeter
    if (delimeter == undefined)
    delimeter = ',';
    if (delimeter && delimeter.length > 1)
    delimeter = ',';

    // initialize variables
    var newline = '\n';
    var eof = '';
    var i = 0;
    var c = data.charAt(i);
    var row = 0;
    var col = 0;
    var array = new Array();

    while (c != eof) {
      // skip whitespaces
      while (c == ' ' || c == '\t' || c == '\r') {
        c = data.charAt(++i); // read next char
      }

      // get value
      var value = "";
      if (c == '\"') {
        // value enclosed by double-quotes
        c = data.charAt(++i);

        do {
          if (c != '\"') {
            // read a regular character and go to the next character
            value += c;
            c = data.charAt(++i);
          }

          if (c == '\"') {
            // check for escaped double-quote
            var cnext = data.charAt(i+1);
            if (cnext == '\"') {
              // this is an escaped double-quote.
              // Add a double-quote to the value, and move two characters ahead.
              value += '\"';
              i += 2;
              c = data.charAt(i);
            }
          }
        }
        while (c != eof && c != '\"');

        if (c == eof) {
          // ui.message("Unexpected end of data, double-quote expected")
          ui.message("🌈: Please check your CSV data and try again. A double quote is expected in row " + (row+1) + ", after character number " + i );

          throw "Unexpected end of data, double-quote expected";
        }

        c = data.charAt(++i);
      }
      else {
        // value without quotes
        while (c != eof && c != delimeter && c!= newline && c != ' ' && c != '\t' && c != '\r') {
          value += c;
          c = data.charAt(++i);
        }
      }

      // add the value to the array
      if (array.length <= row)
      array.push(new Array());
      array[row].push(value);

      // skip whitespaces
      while (c == ' ' || c == '\t' || c == '\r') {
        c = data.charAt(++i);
      }

      // go to the next row or column
      if (c == delimeter) {
        // to the next column
        col++;
      }
      else if (c == newline) {
        // to the next row
        col = 0;
        row++;
      }
      else if (c != eof) {
        // unexpected character
        ui.message("🌈: Please check your CSV data and try again. A delimiter is expected after character " + i);
        throw "Delimiter expected after character " + i;
      }

      // go to the next character
      c = data.charAt(++i);
    }

    return array;
  }

  // text.text = ""+ array + array.length;


  console.log(array.length);

  //var selection = document.selectedLayers;

  //console.log(selection.layers[0].index)

  var moveby = selection.layers[0].frame.height;
  var margin = 0;

  //// CREATE GROUP TO HOLD INSTANCES AND REFERENCE TO DATA SOURCE & SPACING IF ANY

  new Group();

  var group = new Group({
    name: sourceElement.name,
  });


  group.parent = selection.layers[0].parent;

  selection.layers[0].parent = group

  //// END OF GROUP

  for (row = 0; row < array.length; ++row) {

    console.log("------");


    if (row === 0) {
      var duplicatedLayer = selection.layers[0];
      selection.layers[0].frame.y = selection.layers[0].frame.y;

      /// SETS SOURCE ELEMENT ID
      Settings.setLayerSettingForKey(group, 'sourceElementID', sourceElementsIDs[id])

    } else {
      duplicatedLayer = selection.layers[0].duplicate();
      selection.layers[0].frame.y = selection.layers[0].frame.y + moveby + margin;
    }


    selection.layers[0].name = "" + array[row].join(", ").slice(0, -2);

    rowCsv = array[row];

    var columnsArray = rowCsv;


    for (o = 0; o < overrideLabelsIndex.length; ++o) {

      if (selection.layers[0].overrides[o]){
        // console.log("entering value for row:" + row + " column:" + c + "-->" + columnsArray[c])
        // console.log(overridesArray[i].affectedLayer.type)

        /// Overrides only text layers that are allowed to be overridden
        if (selection.layers[0].overrides[o].editable && selection.layers[0].overrides[o].affectedLayer.type === "Text" && selection.layers[0].overrides[o].property === "stringValue") {
          selection.layers[0].overrides[o].value = columnsArray[overrideLabelsIndex.indexOf(o)];
        }

        /// Uncomment to allow overrding symbols as well
        // if (selection.layers[0].overrides[c].affectedLayer.type === "SymbolInstance" ) {
        //   selection.layers[0].overrides[c].value = columnsArray[c];
        // };

      } else {
        break;
      }
    }

  }

  /// Sets Group size to its contents and selects it
  group.adjustToFit();


  // Remove Temp Symbol if one had been created
  if (tempSymbol === 1) {
    var symbolMaster = document.getSymbolMasterWithID(selection.layers[0].symbolId);
    var tempArtboard = symbolMaster.toArtboard();
    tempArtboard.remove();

  }

  if (tempSymbol === 1) {
    document.selectedLayers = group
  } else {
    document.selectedLayers = group.parent;
  }




  /////


  if (array.length  >> 0) {
    ui.message("🌈: Added " + array.length  + " instances with the data you provided! 👏 🚀");
  }


  // console.log("Settings.layerSettingForKey(group, 'sourceElementID')")
  //
  // var setting2 = Settings.layerSettingForKey(group, 'sourceElementID');
  //
  // console.log(setting)



  ///////////////////////////////////////////////// SYNC DATA ///////////////

  // var sourceElementsIDs = Settings.globalSettingForKey('savedFullSelectionIDsGlobal');
  // console.log(sourceElementsIDs);
  //
  // var selectionElementsIDs = selection.map(layer => layer.id);
  // console.log(selectionElementsIDs);
  //
  // for (id = 0; id < sourceElementsIDs.length; ++id){
  //
  //   var sourceElement = document.getLayerWithID(sourceElementsIDs[id]);
  //   var selectionElement = document.getLayerWithID(selectionElementsIDs[id]);
  //
  //
  //   Settings.setLayerSettingForKey(selectionElement, 'sourceElementID', sourceElementsIDs[id])
  //
  //   var sourceElementsID = Settings.layerSettingForKey(selectionElement, 'sourceElementID')
  //
  //   console.log("----- sourceElementsID:")
  //   console.log(sourceElementsID)
  //   console.log("----- END sourceElementsID:")
  //
  //   console.log(sourceElement.name)
  //   console.log(selectionElement.name)
  //
  //   var sourceElementOverrides = sourceElement.overrides;
  //   var selectionElementOverrides = selectionElement.overrides;
  //
  //   console.log(sourceElementOverrides)
  //
  //   for (o = 0; o < sourceElementOverrides.length; ++o) {
  //
  //       /// source values
  //       console.log("----- getting source values:")
  //       console.log("name:" + sourceElementOverrides[o].affectedLayer.name);
  //       console.log("value:" + (sourceElementOverrides[o].value || "none"));
  //       console.log("text:" + (sourceElementOverrides[o].affectedLayer.text || "none"));
  //       console.log("image:" + (sourceElementOverrides[o].affectedLayer.image));
  //
  //       //layer.overrides[1].affectedLayer.image
  //       console.log("----- setting destination to:")
  //       console.log("name:" + selectionElementOverrides[o].affectedLayer.name);
  //       console.log("value:" + (selectionElementOverrides[o].value || "none"));
  //       selectionElementOverrides[o].value = sourceElementOverrides[o].value;
  //       console.log("text:" + (selectionElementOverrides[o].affectedLayer.text || "none"));
  //       selectionElementOverrides[o].affectedLayer.text  = sourceElementOverrides[o].affectedLayer.text;
  //
  //
  //     }
  //
  //     var sketchversion = sketch.version.sketch;
  //
  //     /// Works up to v60.1
  //     if (sketchversion <= 61) {
  //       selectionElement._object.resizeToFitContentsIfNeededNoCache();
  //       /// Added message as otherwise on <v60 there will be no msg as following line will through an error
  //     }
  //
  //     /// Works from v61 and up
  //     if (sketchversion >> 61.1) {
  //       selectionElement._object.resizeWithSmartLayout();
  //     }
  //
  //
  //   var count = 0;
  //
  // }






  // ui.message("🌈: Done syncing values (text/overrides) of the selected elements to the source one! 👏 🚀");


};
