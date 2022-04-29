var onRun = function(context) {

  var sketch = require('sketch')
  var ui = require('sketch/ui')

  var	document = sketch.getSelectedDocument();

  var doc = context.document;

  var Settings = require('sketch/settings')

  var defaultSpacing = Settings.settingForKey('defaultSpacing');


  var data = document.sketchObject.documentData();
  var page = document.selectedPage;

  // var sketch = require('sketch')
  // var ui = require('sketch/ui')
  //
  // // var sketch = require('sketch')
  //
  // var	document = sketch.getSelectedDocument();
  //
  // // var doc = context.document;
  //
  // var Settings = require('sketch/settings')
  //
  //
  // var data = document.sketchObject.documentData();
  // var page = document.selectedPage;

  //var selection = document.selectedLayers;
  var result;

  var defaultStackSpacing;

  // var selection = document.selectedLayers.layers[0];
  var selection = document.selectedLayers.layers[0]
  console.log("defaultStackSpacing for Selection")
  // defaultStackSpacing = Settings.layerSettingForKey(selection, 'stackSpacingSetting')
  //console.log(Settings.layerSettingForKey(selection, 'stackSpacingSetting'));

  // var stackSpacing = result;
  // Settings.setLayerSettingForKey(selection, 'stackSpacingSetting', stackSpacing)
  //
  //
  // console.log("stackSpacing")
  console.log(Settings.layerSettingForKey(selection, 'stackSpacingSetting'))



  if (document.selectedLayers.length == 1) {
    console.log(document.selectedLayers.length)
    /// select on child and finds siblings
    // var selection = document.selectedLayers.layers[0]

    if (document.selectedLayers.layers[0].type === "Group") {

      console.log(document.selectedLayers.layers[0].type)
      var selection = document.selectedLayers.layers[0]

      // console.log("forcing layer setting to 0:")
      // Settings.setLayerSettingForKey(selection, 'stackSpacingSetting', 0)

      defaultStackSpacing = Settings.layerSettingForKey(selection, 'stackSpacingSetting')
      console.log("defaultSpacing for Group")
      // console.log(defaultStackSpacing)
      // console.log(selection.name)
    } else {
      var selection = document.selectedLayers.layers[0].parent
      defaultStackSpacing = Settings.layerSettingForKey(selection, 'stackSpacingSetting')
      console.log("defaultSpacing for Anything else")
      // console.log(defaultStackSpacing)

    }



    console.log("Settings.layerSettingForKey(selection, 'stackSpacingSetting')");
    console.log(Settings.layerSettingForKey(selection, 'stackSpacingSetting'));
    // defaultStackSpacing = Settings.layerSettingForKey(selection, 'stackSpacingSetting');
    console.log(defaultStackSpacing);
    console.log(" END defaultStackSpacing");


    // result = [] + [doc askForUserInput:"How much space between the selected elements?\n\nExamples:\n\n– Enter \'16\' to stack elements vertically by default.\n\n– Enter \'h16\' to stack elements 'h'orizontally" initialValue: Settings.layerSettingForKey(selection, 'stackSpacingSetting') ||  defaultSpacing];


    // var instructionalTextForInput = "How much space between the selected elements?\n\nExamples:\n\n– Enter \'16\' to stack elements vertically by default.\n\n– Enter \'h16\' to stack elements 'h'orizontally";
    // var initialValue = Settings.layerSettingForKey(selection, 'stackSpacingSetting') ||  defaultSpacing;


    // var initialValue = Settings.layerSettingForKey(selection, 'stackSpacingSetting') ||  defaultSpacing;
    var initialValue = defaultStackSpacing;


      // ui.getInputFromUser(
      //   instructionalTextForInput,
      //   {
      //     initialValue: initialValue,
      //   },
      //   (err, value) => {
      //     if (err) {
      //       // most likely the user canceled the input
      //       return
      //     } else {
      //       result = value;
      //       Settings.setSettingForKey('stackSpacingSetting', result);
      //
      //     }
      //   }
      //
      // )


    //// Set a layer's stacking properties
    var stackSpacing = initialValue;//result;
    Settings.setLayerSettingForKey(selection, 'stackSpacingSetting', stackSpacing)
    ///console.log(Settings.layerSettingForKey(selection, 'stackSpacingSetting'))
    console.log(defaultStackSpacing)

  } else {

    var selection = document.selectedLayers;

    selection = selection.reverse()

    // result = [] + [doc askForUserInput:"How much space between the selected elements?\n\nExamples:\n\n– Enter \'16\' to stack elements vertically by default.\n\n– Enter \'h16\' to stack elements 'h'orizontally" initialValue: defaultSpacing];

    // var instructionalTextForInput = "How much space between the selected elements?\n\nExamples:\n\n– Enter \'16\' to stack elements vertically by default.\n\n– Enter \'h16\' to stack elements 'h'orizontally";

    // var defaultSpacing = Settings.settingForKey('defaultSpacing')

    // var initialValue = Settings.layerSettingForKey(selection, 'stackSpacingSetting') ||  defaultSpacing;
    var initialValue = defaultStackSpacing;


    console.log(selection.name)
  }


  console.log(selection.name)
  console.log(selection)


    var result = Settings.layerSettingForKey(selection, 'stackSpacingSetting') || "16"



    if (!result[0].includes('h')){

      for (j = 0; j < selection.layers.length; ++j){

        if (j == 0){
          selection.layers[j].frame.y = selection.layers[0].frame.y;
        }
        else {
          selection.layers[j].frame.y = selection.layers[j-1].frame.y + selection.layers[j-1].frame.height + Number(result.replace("h",""));
        }

        selection.layers[j].frame.x = selection.layers[0].frame.x;

      }

    } else {

      for (j = 0; j < selection.layers.length; ++j){

        if (j == 0){
          selection.layers[j].frame.x = selection.layers[0].frame.x;
        }
        else {
          selection.layers[j].frame.x = selection.layers[j-1].frame.x + selection.layers[j-1].frame.width + Number(result.replace("h",""));
        }

        selection.layers[j].frame.y = selection.layers[0].frame.y;
      }
    }


    if (document.selectedLayers.length == 1) {

      if (selection.type != "Group"){
        selection = selection.parent;
      }

      var selection = document.selectedLayers.layers[0];
      if (selection.type === "Group"){
        selection.adjustToFit();
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

  //Settings.setSettingForKey('defaultSpacing', result.replace("h",""));


  // Settings.setSettingForKey('defaultSpacing', result);

  ui.message("Yay! Done spacing things nicely by " + result.replace("h","") + " pixels! 👏 🚀");

};
