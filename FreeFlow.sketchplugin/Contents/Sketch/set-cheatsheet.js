var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var Document = require('sketch/dom').Document;
  var	document = sketch.getSelectedDocument();



  if (document.selectedLayers){

    var selection = document.selectedLayers;
    // var parent = selection.layers[0].parent;


    if (selection.layers[0].type === "Artboard"){

      Settings.setDocumentSettingForKey(document, 'savedCheatsheetIDsLocal', selection.layers[0].id);

      console.log("savedCheatsheetIDsLocal")

      var savedCheatsheetIDsLocal = Settings.documentSettingForKey(document, 'savedCheatsheetIDsLocal');

      console.log(savedCheatsheetIDsLocal)

    }


    ui.message("🌈: You have set '" + selection.layers[0].name + "' as your Cheatsheet! Now you can quick paste layers from your Cheatseet to other elements! :)");
  }
  else {
    ui.message("🌈: Hmmm... try selecting an artboard.");
  }

};
