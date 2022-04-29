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
  //var selection = context.selection;
  //var selections = selection.objectEnumerator();

  console.log(selectedLayers.layers[0].name)
  console.log(selectedLayers.layers[0].type)

  var selectedElementName = selectedLayers.layers[0].name;
  var selectedElementType = selectedLayers.layers[0].type;
  // console.log(selectedLayers)


  var count = 0;
  var referenceObjName = selectedElementName; //Settings.globalSettingForKey('savedSelectionNameGlobal');
  var referenceObjType = selectedElementType; //Settings.globalSettingForKey('savedSelectionTypeGlobal');

  count = page.layers.filter(l => l.name === referenceObjName).length;

  var allItems_with_same_type = util.toArray(page.sketchObject.children()).filter(l => String(l.name()) === referenceObjName).map(l => sketch.fromNative(l)).filter(l => l.type === referenceObjType);

  document.selectedLayers = allItems_with_same_type;

  ui.message("🌈: You selected "+ allItems_with_same_type.length +" elements with same name and type of the reference one! 👏 🚀");

};
