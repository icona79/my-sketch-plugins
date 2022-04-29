var onRun = function(context) {
var sketch = require('sketch');
var ui = require('sketch/ui');
var Settings = require('sketch/settings');
var	document = sketch.getSelectedDocument();
const util = require('util');
var page = document.selectedPage;

var count = 0;
var referenceObjName = Settings.globalSettingForKey('savedSelectionNameGlobal');
var referenceObjType = Settings.globalSettingForKey('savedSelectionTypeGlobal');

count = page.layers.filter(l => l.name === referenceObjName).length;

var allItems_with_same_type = util.toArray(page.sketchObject.children()).filter(l => String(l.name()) === referenceObjName).map(l => sketch.fromNative(l)).filter(l => l.type === referenceObjType);

document.selectedLayers = allItems_with_same_type;

ui.message("🌈: You selected "+ allItems_with_same_type.length +" elements with same name and type of the reference one! 👏 🚀");

};
