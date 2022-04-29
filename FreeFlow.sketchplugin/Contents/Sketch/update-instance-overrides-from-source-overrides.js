var onRun = function(context) {

  var sketch = require('sketch')
  var ui = require('sketch/ui')
  var Settings = require('sketch/settings')
  var Image = require('sketch/dom').Image


  console.log("----- MULTIPLE INSTANCES BEING UPDATED BASED ON THEIR SOURCES")


  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;



  var sourceElementsIDs = Settings.globalSettingForKey('savedFullSelectionIDsGlobal');
  console.log(sourceElementsIDs);


  var selectionElementsIDs = selection.map(layer => layer.id);
  console.log(selectionElementsIDs);

  for (id = 0; id < selectionElementsIDs.length; ++id){

    selectionElement = document.getLayerWithID(selectionElementsIDs[id])

    // for (e = 0; e < sourceElementsIDs.length; ++e) {
    //   var layer = document.getLayerWithID(sourceElementsIDs[e])

    var sourceElementID = sourceElementsIDs[id] // Settings.layerSettingForKey(selectionElement, 'sourceElementID')
    //var sourceElementID = Settings.layerSettingForKey(selectionElement, 'sourceElementID')
    sourceElementsIDs.push(sourceElementID)
  }

  console.log(sourceElementsIDs)

  sourceElementsCount = sourceElementsIDs.length;
  var sourceElementsCounter = 0;
  selectionElementsCount = selectionElementsIDs.length;
  var selectionElementsCounter = 0;

  for (id = 0; id < selectionElementsCount; ++id){

    var sourceElement = document.getLayerWithID(sourceElementsIDs[id]);
    var selectionElement = document.getLayerWithID(selectionElementsIDs[id]);

    console.log("----- sourceElementsID:")
    console.log(sourceElementsIDs[id])
    console.log("----- END sourceElementsID:")

    var sourceElementOverrides = sourceElement.overrides;
    var selectionElementOverrides = selectionElement.overrides;

    console.log(sourceElementOverrides)

    for (o = 0; o < sourceElementOverrides.length; ++o) {

      /// source values
      console.log("----- getting source values:")
      console.log("name:" + sourceElementOverrides[o].affectedLayer.name);
      console.log("value:" + (sourceElementOverrides[o].value || "none"));
      console.log("text:" + (sourceElementOverrides[o].affectedLayer.text || "none"));
      console.log("image:" + (sourceElementOverrides[o].affectedLayer.image));

      //layer.overrides[1].affectedLayer.image
      console.log("----- setting destination to:")
      console.log("name:" + selectionElementOverrides[o].affectedLayer.name);
      console.log("value:" + (selectionElementOverrides[o].value || "none"));
      selectionElementOverrides[o].value = sourceElementOverrides[o].value;
      console.log("text:" + (selectionElementOverrides[o].affectedLayer.text || "none"));
      selectionElementOverrides[o].affectedLayer.text  = sourceElementOverrides[o].affectedLayer.text;

    }



    // if (id == sourceElementsCounter) {
    //   sourceElementsCounter= 0;
    // }


    //var count = 0;


  }



  ui.message("🌈: Done syncing override values of the selected elements to the source one! 👏 🚀");


};
