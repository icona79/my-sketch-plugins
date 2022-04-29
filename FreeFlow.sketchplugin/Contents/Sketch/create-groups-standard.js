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
  //Loop over the selected layers/groups and add them to the symbols page skipping the options
  // FIX turning an Artboard into a Symbol

  for (g = 0; g < selectedLayers.length; ++g) {

    console.log(selectedLayers.layers[g].length)

    var group = new Group({
      name: selectedLayers.layers[g].name,
    })

    

    group.parent = selectedLayers.layers[g].parent;

    selectedLayers.layers[g].parent = group

    group.adjustToFit();

  }

  for (g = 0; g < selectedLayers.length; ++g) {

    // Select parent Artboards
    // selectedLayers.layers[g].parent.parent.selected = true;

    // Select parent Groups
    selectedLayers.layers[g].parent.selected = true;

  }


    // console.log(selection.length)
    // count = count + 1;
    // document.selectedLayers = selectedLayers;
  //}

  ui.message("🌈: Done creating to " + selectedLayers.length + " groups! 👏 🚀");


};
