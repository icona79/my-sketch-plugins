var onRun = function(context) {

  var sketch = require('sketch')
  var ui = require('sketch/ui')
  var Settings = require('sketch/settings')
  var Image = require('sketch/dom').Image


  console.log("----- MULTIPLE INSTANCES")


  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;

  var sourceElementsIDs = Settings.globalSettingForKey('savedFullSelectionIDsGlobal');
  console.log(sourceElementsIDs);

  var selectionElementsIDs = selection.map(layer => layer.id);
  console.log(selectionElementsIDs);

  for (id = 0; id < sourceElementsIDs.length; ++id){

    var sourceElement = document.getLayerWithID(sourceElementsIDs[id]);
    var selectionElement = document.getLayerWithID(selectionElementsIDs[id]);


    Settings.setLayerSettingForKey(selectionElement, 'sourceElementID', sourceElementsIDs[id])

    var sourceElementsID = Settings.layerSettingForKey(selectionElement, 'sourceElementID')

    console.log("----- sourceElementsID:")
    console.log(sourceElementsID)
    console.log("----- END sourceElementsID:")

    console.log(sourceElement.name)
    console.log(selectionElement.name)

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
        // console.log("----- setting destination to:")
        // console.log("name:" + selectionElementOverrides[o].affectedLayer.name);
        // console.log("value:" + (selectionElementOverrides[o].value || "none"));
        // selectionElementOverrides[o].value = sourceElementOverrides[o].value;
        // console.log("text:" + (selectionElementOverrides[o].affectedLayer.text || "none"));
        // selectionElementOverrides[o].affectedLayer.text  = sourceElementOverrides[o].affectedLayer.text;
        //layer.overrides[1].affectedLayer.image
        console.log("----- setting destination to:")
        console.log("name:" + selectionElementOverrides[o].affectedLayer.name);
        console.log("value:" + (selectionElementOverrides[o].value || "none"));

        if (sourceElementOverrides[o].affectedLayer.name == selectionElementOverrides[o].affectedLayer.name) {

          if (sourceElementOverrides[o].property !== "layerStyle" && sourceElementOverrides[o].property !== "textStyle") {
            console.log("text:" + (selectionElementOverrides[o].affectedLayer.text || "none"));
            selectionElementOverrides[o].value = sourceElementOverrides[o].value;
          }
          selectionElementOverrides[o].affectedLayer.text  = sourceElementOverrides[o].affectedLayer.text;
        }


      }

      var sketchversion = sketch.version.sketch;

      /// Works up to v60.1
      if (sketchversion <= 61) {
        selectionElement._object.resizeToFitContentsIfNeededNoCache();
        /// Added message as otherwise on <v60 there will be no msg as following line will through an error
      }

      /// Works from v61 and up
      if (sketchversion >> 61.1) {
        selectionElement._object.resizeWithSmartLayout();
      }


    var count = 0;

  }



  ui.message("🌈: Done syncing values (text/overrides) of the selected elements to the source one! 👏 🚀");


};
