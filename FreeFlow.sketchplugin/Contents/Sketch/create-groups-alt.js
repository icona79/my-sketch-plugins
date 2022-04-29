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

  var newGroup = new Group({
    name: "temp",
  })


  for (g = 0; g < selectedLayers.length; ++g) {

    console.log("name")
    console.log(selectedLayers.layers[g].name)
    // newGroup.name = selectedLayers.layers[g].name
    console.log(selectedLayers.layers[g].parent.name)
    newGroup.parent = selectedLayers.layers[g].parent;

    if (g === 0) {
      selectedLayers.layers[g].parent = newGroup
    } else {

      if (selectedLayers.layers[g].parent === selectedLayers.layers[g-1].parent) {

        selectedLayers.layers[g].parent = newGroup
        newGroup.parent = selectedLayers.layers[g].parent;
      }
      else {
        var newGroup2 = new Group({
          name: "temp",
        })
        selectedLayers.layers[g].parent = newGroup2
      }
      newGroup2.parent = selectedLayers.layers[g].parent;
    }

    newGroup.name = selectedLayers.layers[g].name

    //   if (g == 0 ) {
    //
    //     console.log(g)
    //
    //   // }
    //
    //
    //   newGroup.parent = selectedLayers.layers[g].parent;
    //   selectedLayers.layers[g].parent = newGroup
    //
    //   var prevGroup = newGroup
    //
    //   // prevGroup.adjustToFit();
    //
    // } else {

    // var pred = g - 1;

    // console.log("pred")
    // console.log(pred)
    //
    // if (selectedLayers.layers[g].getParentArtboard().id === selectedLayers.layers[pred].getParentArtboard().id) {
    //   var newGroup2 = new Group({
    //     name: selectedLayers.layers[g].name,
    //   })
    //
    //   selectedLayers.layers[g].parent = newGroup2
    //
    //   var prevGroup = newGroup2
    //
    // } else {
    //   selectedLayers.layers[g].parent = prevGroup;
    // }

  }

  // prevGroup.adjustToFit();

  // console.log("not 0")
  // console.log(g)
  // console.log("selectedLayers.layers[g].parent.id: " + selectedLayers.layers[g].getParentArtboard().id )
  // console.log("selectedLayers.layers[g-1].parent.id: " + selectedLayers.layers[g-1].getParentArtboard().id )


  //
  // newGroup.adjustToFit();
  //
  // if (selectedLayers.layers[g].parent.id == selectedLayers.layers[g-1].parent.id){
  //     console.log("same parent")
  //     selectedLayers.layers[g].parent = newGroup
  //   }
  // else {
  //
  //   var newGroup2 = new Group({
  //     name: selectedLayers.layers[g].name,
  //   })
  //
  //   selectedLayers.layers[g].parent = newGroup2
  //
  //   newGroup = newGroup2
  //
  // }
  //
  //
  // }



  // }

  for (g = 0; g < selectedLayers.length; ++g) {

    // Select parent Groups
    // selectedLayers.layers[g].parent.selected = true;

  }




  ui.message("🌈: Done creating to " + selectedLayers.length + " groups! 👏 🚀");


};
