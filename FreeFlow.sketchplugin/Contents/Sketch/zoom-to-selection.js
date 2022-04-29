var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var Page = require('sketch/dom').Page


  var doc = context.document;
  var document = sketch.getSelectedDocument();

  console.log(Settings.documentSettingForKey(document, 'savedFullSelectionIDsArray'));
  var arr  = Settings.documentSettingForKey(document, 'savedFullSelectionIDsArray') || [];
  var arrLabels  = [];
  console.log(arr);

  var currentSelectionLabelsIndex = 0;


  for (l = 0; l < arr.length; ++l) {
    console.log(arr[l]);
    var arrNumber = l;
    var arrNames = "";
    for (i = 0; i < arr[l].length; ++i) {
      var lid = arr[l][i];
      var r = document.getLayerWithID(lid);
      console.log(r.name);
      arrNames = arrNames + ", " + r.name;
    }
    arrNames = (arrNumber + 1) + ") " + arrNames.slice(1)
    arrLabels.push(arrNames);
    arrNames = "";
  }

  console.log("arrLabels")
  console.log(arrLabels)



  var arrToString = arrLabels;

  // Show Selection History as Dropdown
  ui.getInputFromUser(
    "Zoom to previously Saved Selection:",
    {
      type: ui.INPUT_TYPE.selection,
      possibleValues: arrToString.reverse(),
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      } else {
        console.log(value)
        result = value;
      }
    }
  )



  var currentSelectionIndex = result.slice(")")[0] - 1;


  console.log("currentSelectionIndex: "+ currentSelectionIndex);
  console.log("arr.length : "+ arr.length );



  console.log(arr);


  var selection = document.selectedLayers.layers;

  var selectionToUseArray = selection;

  var needle = selectionToUseArray;
  console.log(selectionToUseArray)


  var arr = Settings.documentSettingForKey(document, 'savedFullSelectionIDsArray');

  Settings.setDocumentSettingForKey(document, 'savedCurrentElementIndex', currentSelectionIndex);

  console.log("arr");
  console.log(arr);
  console.log(arr[currentSelectionIndex]);
  console.log("arr end")
  document.selectedLayers.layers = []

  for (l = 0; l < arr[currentSelectionIndex].length; ++l) {
    console.log(arr[currentSelectionIndex][l]);
    var lid = arr[currentSelectionIndex][l];
    var r = document.getLayerWithID(lid);
    console.log(r.name);
    r.selected = true;
  }


  document.selectedPage = r.getParentPage();

  document.centerOnLayer(r);
  ui.message("🌈: Zoomed to your previously saved Selection! 👏 🚀");


};
