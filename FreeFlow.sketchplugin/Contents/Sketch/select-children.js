var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var	document = sketch.getSelectedDocument();
  const util = require('util');
  var page = document.selectedPage;

  var doc = context.document;
  var selectedLayers = document.selectedLayers;
  var selectedCount = selectedLayers.length;

  console.log(selectedLayers.layers[0].name)
  console.log(selectedLayers.layers[0].type)

  var selectedElementName = selectedLayers.layers[0].name;
  var selectedElementType = selectedLayers.layers[0].type;
  // console.log(selectedLayers)


  var count = 0;
  var referenceObjName = selectedElementName; //Settings.globalSettingForKey('savedSelectionNameGlobal');
  var referenceObjType = selectedElementType; //Settings.globalSettingForKey('savedSelectionTypeGlobal');

  // selectedLayers
  var allItems_with_same_type = [];



  var children = [];
  var allChildren = []
  var originalSelection = selectedLayers.layers

  for (g = 0; g < selectedLayers.length; ++g) {


    children = selectedLayers.layers[g].layers

    console.log(children.length)
    for (c = 0; c < children.length; ++c) {
      console.log(children[c].name)
      allChildren.push(children[c])
    }

  }


  for (c = 0; c < originalSelection.length; ++c) {
    console.log(originalSelection[c].name)
    originalSelection[c].selected = false
  }

  for (c = 0; c < allChildren.length; ++c) {
    console.log(allChildren[c].name)
    allChildren[c].selected = true
  }


  ui.message("🌈: You selected "+ allChildren.length +" children elements to the selection! 👏 🚀");

};
