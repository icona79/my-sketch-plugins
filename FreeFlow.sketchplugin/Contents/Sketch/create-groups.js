var onRun = function(context) {
  var sketch = require('sketch')
  var document = sketch.getSelectedDocument();
  var ui = require('sketch/ui')
  var Group = require('sketch/dom').Group



  var doc = context.document;
  var selectedLayers = document.selectedLayers;
  var selectedCount = selectedLayers.length;
  var selection = context.selection;
  var selections = selection.objectEnumerator();
  var count = 0;

  console.log(selection.length)


  /// Iterate through selected Artboards

  var genGroupsArray = []

  for (g = 0; g < selectedLayers.length; ++g) {

    var tempArray = []


    var newGroup = new Group({
      name: "temp",
    })

    genGroupsArray.push(newGroup.id)


    console.log("name")
    console.log(selectedLayers.layers[0].name)

    /// Iterate layers for each selected Artboard

    for (c = 0; c < selectedLayers.layers[g].layers.length; ++c) {
      console.log("layer name")
      console.log(selectedLayers.layers[g].layers[c].name)

      tempArray.push(selectedLayers.layers[g].layers[c].id)

    }

    for (a = 0; a < tempArray.length; ++a) {
      console.log("layer id")
      console.log(tempArray[a])

      var sourceElement = document.getLayerWithID(tempArray[a]);


      sourceElement.parent = newGroup;

    }



    newGroup.parent = selectedLayers.layers[g];

    newGroup.name = selectedLayers.layers[g].name + " Group"

    newGroup.adjustToFit();


  }


  document.selectedLayers = []

  for (g = 0; g < genGroupsArray.length; ++g) {

    console.log("group name")

    var sourceElement = document.getLayerWithID(genGroupsArray[g]);

    console.log(sourceElement.name)

    // Select Groups
    sourceElement.selected = true;

  }




  ui.message("🌈: Done creating to " + selectedLayers.length + " groups! 👏 🚀");


};
