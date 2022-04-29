var onRun = function(context) {
var sketch = require('sketch');
var ui = require('sketch/ui');
var Settings = require('sketch/settings');
var Document = require('sketch/dom').Document;
var	document = sketch.getSelectedDocument();

// var document = require('sketch/dom').getSelectedDocument()




// Settings.setSettingForKey('savedFullSelection', []);

// var nestedArray = [[]];

// var items = [
//   [1, 2],
//   [3, 4],
//   [5, 6]
// ];
// console.log(items[0][0]); // 1
// console.log(items[0][1]); // 2
// console.log(items[1][0]); // 3
// console.log(items[1][1]); // 4
// console.log(items);

console.log(Settings.documentSettingForKey(document, 'savedFullSelectionIDsArray'));
var arr  = Settings.documentSettingForKey(document, 'savedFullSelectionIDsArray') || [];

// var arr1 = ['00','01'];
// var arr2 = ['10','11'];
// var arr3 = ['20','21'];

// arr.push(arr1);
// arr.push(arr2);
// arr.push(arr3);

console.log(arr);



if (document.selectedLayers){
var selection = document.selectedLayers;
var parent = selection.layers[0].parent;

// console.log(selection.layers[0]);
// console.log(selection.layers[0].text);
// console.log(selection.layers[0].type);

// var savedFullSelectionIDsArrayInitial = Settings.settingForKey('savedFullSelectionIDsArray');
// var savedFullSelectionIDsArrayInitial = Settings.settingForKey('savedFullSelectionIDsArray');

//// GLOBAL OR LOCAL?????
Settings.setGlobalSettingForKey('savedFullSelectionGlobal', selection.layers);
Settings.setGlobalSettingForKey('savedFullSelectionIDsGlobal', selection.map(layer => layer.id));

Settings.setDocumentSettingForKey(document, 'savedFullSelection', selection.layers);
Settings.setDocumentSettingForKey(document, 'savedFullSelectionIDs', selection.map(layer => layer.id));
////
// Settings.setDocumentSettingForKey(document, 'my-key', 'hi')
console.log("Doc: savedFullSelectionIDs")

Settings.setDocumentSettingForKey(document, 'savedFullSelectionIDs', selection.map(layer => layer.id));
var savedFullSelectionIDs = Settings.documentSettingForKey(document, 'savedFullSelectionIDs');

console.log(savedFullSelectionIDs)


arr.push(savedFullSelectionIDs)


Settings.setDocumentSettingForKey(document, 'savedFullSelectionIDsArray', arr)

console.log(Settings.documentSettingForKey(document, 'savedFullSelectionIDsArray'));




console.log("IDs");
console.log(Settings.globalSettingForKey('savedFullSelectionIDsGlobal'));


console.log("selection.layers[0].type");
console.log(selection.map(layer => layer.id))
console.log(selection.map(layer => layer.id).length)
console.log("selection.layers[0].type END");


Settings.setGlobalSettingForKey('savedSelectionGlobal', selection.layers[0].id);
Settings.setGlobalSettingForKey('savedSelectionParentArtboardGlobal', selection.layers[0].parent.id);
Settings.setGlobalSettingForKey('savedSelectionNameGlobal', selection.layers[0].name);
Settings.setGlobalSettingForKey('savedSelectionTypeGlobal', selection.layers[0].type);
Settings.setGlobalSettingForKey('savedSelectionIndexGlobal', selection.layers[0].index);
Settings.setGlobalSettingForKey('savedSelectionTextGlobal', selection.layers[0].text);
Settings.setGlobalSettingForKey('savedSelectionDataGlobal', selection.layers[0].text);
Settings.setGlobalSettingForKey('savedSelectionFontFamilyGlobal', selection.layers[0].style.fontFamily);
Settings.setGlobalSettingForKey('savedSelectionLineHeightGlobal', selection.layers[0].style.lineHeight);
if (selection.layers[0].type === "Text" || selection.layers[0].type === "ShapePath"){
  Settings.setGlobalSettingForKey('savedSelectionColorGlobal', selection.layers[0].style.textColor || selection.layers[0].style.fills[0].color);
}
if (selection.layers[0].type === "Artboard"){
  Settings.setGlobalSettingForKey('savedSelectionColorGlobal', selection.layers[0].background.color);
  Settings.setGlobalSettingForKey('savedSelectionExportGlobal', selection.layers[0].background.includedInExport);
  Settings.setGlobalSettingForKey('savedSelectionEnabledGlobal', selection.layers[0].background.enabled);
}

if (selection.layers[0].type === "Group"){
  Settings.setGlobalSettingForKey('savedStackSpacingSettingGlobal', (Settings.layerSettingForKey(selection.layers[0], 'stackSpacingSetting') ||  16));
}

Settings.setGlobalSettingForKey('savedSelectionOpacityGlobal', selection.layers[0].style.opacity);
Settings.setGlobalSettingForKey('savedSelectionFontSizeGlobal', selection.layers[0].style.fontSize);
Settings.setGlobalSettingForKey('savedSelectionTypeGlobal', selection.layers[0].type);
Settings.setGlobalSettingForKey('savedSelectionXGlobal', selection.layers[0].frame.x);
Settings.setGlobalSettingForKey('savedSelectionXRightGlobal', selection.layers[0].parent.frame.width - (selection.layers[0].frame.x + selection.layers[0].frame.width));
Settings.setGlobalSettingForKey('savedSelectionYGlobal', selection.layers[0].frame.y);
Settings.setGlobalSettingForKey('savedSelectionYBottomGlobal', selection.layers[0].parent.frame.height - (selection.layers[0].frame.y + selection.layers[0].frame.height));
Settings.setGlobalSettingForKey('savedSelectionWidthGlobal', selection.layers[0].frame.width);
Settings.setGlobalSettingForKey('savedSelectionHeightGlobal', selection.layers[0].frame.height);
Settings.setGlobalSettingForKey('savedSelectionOverridesGlobal', selection.layers[0].overrides);
Settings.setGlobalSettingForKey('savedSelectionPinAndResizeGlobal', selection.layers[0].sketchObject.resizingConstraint());

console.log("-------");
console.log(Settings.globalSettingForKey('savedSelectionGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionFontFamilyGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionLineHeightGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionOpacityGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionColorGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionFontSizeGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionNameGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionTypeGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionIndexGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionXGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionXRightGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionYGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionYBottomGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionParentArtboardGlobal'));
console.log(Settings.globalSettingForKey('"savedSelectionOverridesGlobal"'));
console.log(Settings.globalSettingForKey('savedSelectionOverridesGlobal'));
console.log(Settings.globalSettingForKey('"END savedSelectionOverridesGlobal"'));
console.log(Settings.globalSettingForKey('savedSelectionTextGlobal'));
console.log(Settings.globalSettingForKey('savedSelectionPinAndResizeGlobal'));


ui.message("🌈: You have set '" + selection.layers[0].name + "' as reference! Now you can sync or paste selective properties to other elements! :)");
}
else {
ui.message("🌈: Hmmm... try selecting a symbol, group or layer.");
}

};
