var onRun = function(context) {
  var sketch = require('sketch')
  var ui = require('sketch/ui')

  var	document = sketch.getSelectedDocument();

  var doc = context.document;

  var Settings = require('sketch/settings')

  var defaultSpacing = Settings.settingForKey('defaultSpacing') || 16


  var data = document.sketchObject.documentData();
  var page = document.selectedPage;

  //var selection = document.selectedLayers;

  if (document.selectedLayers.length == 1) {
    console.log(document.selectedLayers.length)
    /// select on child and finds siblings
    var selection = document.selectedLayers.layers[0]
    console.log(selection.name)

    // var instructionalTextForInput = "How much space between the selected elements?\n\nExamples:\n\n– Enter \'16\' to stack elements vertically by default.\n\n– Enter \'h16\' to stack elements 'h'orizontally";
    // var initialValue = Settings.layerSettingForKey(selection, 'stackSpacingSetting') ||  defaultSpacing
    //Settings.layerSettingForKey(selection, 'stackSpacingSetting') ||  defaultSpacing;
    var instructionalTextForInput = "How much space between the selected elements?";
    var description = "Examples:\n\n– Enter \'16\' to stack elements vertically by default.\n\n– Enter \'h16\' to stack elements 'h'orizontally";
    var initialValue = Settings.layerSettingForKey(selection, 'stackSpacingSetting') ||  defaultSpacing


      ui.getInputFromUser(
        instructionalTextForInput,
        {
          initialValue: initialValue,
          description: description,

        },
        (err, value) => {
          if (err) {
            // most likely the user canceled the input
            return
          } else {
            result = value;
            Settings.setSettingForKey('stackSpacingSetting', result);

          }
        }
      )


    //// Set a layer's stacking properties
    var stackSpacing = result;
    Settings.setLayerSettingForKey(selection, 'stackSpacingSetting', stackSpacing)
    ///console.log(Settings.layerSettingForKey(selection, 'stackSpacingSetting'))
    console.log(stackSpacing)

  } else {
    var selection = document.selectedLayers;

    // result = [] + [doc askForUserInput:"How much space between the selected elements?\n\nExamples:\n\n– Enter \'16\' to stack elements vertically by default.\n\n– Enter \'h16\' to stack elements 'h'orizontally" initialValue: defaultSpacing];

    var instructionalTextForInput = "How much space between the selected elements?";
    var description = "Examples:\n\n– Enter \'16\' to stack elements vertically by default.\n\n– Enter \'h16\' to stack elements 'h'orizontally";
    var initialValue = Settings.layerSettingForKey(selection, 'stackSpacingSetting') ||  defaultSpacing
    //Settings.layerSettingForKey(selection, 'stackSpacingSetting') ||  defaultSpacing;


      ui.getInputFromUser(
        instructionalTextForInput,
        {
          initialValue: initialValue,
          description: description,
        },
        (err, value) => {
          if (err) {
            // most likely the user canceled the input
            return
          } else {
            result = value;
            Settings.setSettingForKey('stackSpacingSetting', result);

          }
        }
      )






    console.log(selection.name)
    Settings.setLayerSettingForKey(selection, 'stackSpacingSetting', stackSpacing)

  }

  console.log(selection)

  if (selection) {
    ui.message("👉 👉 👉 Please select a symbol, layer, group or artboard! 👈 👈 👈");
  }

  var originalx = selection.frame.x
  var originaly = selection.frame.y


  // selection

  var selection_layers = selection.layers;


  if (!result[0].includes('h')){

    for (j = 0; j < selection_layers.length; ++j){

      if (j == 0){
        selection_layers[j].frame.y = selection_layers[0].frame.y;
      }
      else {
        selection_layers[j].frame.y = selection_layers[j-1].frame.y + selection.layers[j-1].frame.height + Number(result.replace("h",""));
      }

      selection_layers[j].frame.x = selection_layers[0].frame.x;

    }

  } else {

    for (j = 0; j < selection_layers.length; ++j){

      if (j == 0){
        selection_layers[j].frame.x = selection_layers[0].frame.x;
      }
      else {
        selection_layers[j].frame.x = selection_layers[j-1].frame.x + selection_layers[j-1].frame.width + Number(result.replace("h",""));
      }

      selection_layers[j].frame.y = selection_layers[0].frame.y;
    }
  }


  if (document.selectedLayers.length == 1) {

    if (selection.type != "Group"){
      selection = selection.parent;
    }

    var selection = document.selectedLayers.layers[0];
    if (selection.type === "Group"){
      selection.adjustToFit();
      selection.frame.x = originalx;
      selection.frame.y = originaly;
    }
    if (selection.parent.type === "Group"){
      selection.parent.adjustToFit();
    }
    if (selection.parent.parent.type === "Group"){
      selection.parent.parent.adjustToFit();
    }


  } else {
    var selection = document.selectedLayers.layers[0].parent;
    if (selection.type === "Group"){
      selection.adjustToFit();
    }
    if (selection.parent.type === "Group"){
      selection.parent.adjustToFit();
    }
    if (selection.parent.parent.type === "Group"){
      selection.parent.parent.adjustToFit();
    }
  }




  Settings.setSettingForKey('defaultSpacing', result.replace("h",""));

  // Settings.setSettingForKey('defaultSpacing', result);

  var stackSpacing = result;
  Settings.setLayerSettingForKey(selection, 'stackSpacingSetting', stackSpacing)


  console.log("stackSpacing")
  console.log(Settings.layerSettingForKey(selection, 'stackSpacingSetting'))

  // defaultSpacing = Settings.layerSettingForKey(selection, 'stackSpacingSetting');



  ui.message("Yay! Done spacing things nicely by " + result.replace("h","") + " pixels! 👏 🚀");

};
