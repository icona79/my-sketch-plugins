var onRun = function(context) {
  var sketch = require('sketch')
  var ui = require('sketch/ui')
  var Settings = require('sketch/settings')
  var Group = require('sketch/dom').Group

  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;

  var doc = context.document;
  var movebyx;
  var movebyy;
  var rows;
  var columns;
  // var marginx = 0;
  // var marginy = 0;

  var result;

  var defaultGridSettings = Settings.settingForKey('defaultGridSettings') || "3*3,16,24";

  var instructionalTextForInput = "Clone to Rows, Columns or Grid.";
  var description = "Example:\n\n3*2 creates 3 columns and 2 rows\n\n💡3*2,20,40 creates 3 columns and 2 rows adding a horizontal spacing of 20 and vertical spacing of 40\n\nChange values as you see fit! :)\n\nAdded bonus:\nthe duplicated items are named based on the initial item name and include row and column indexes so you can easily select all elements in your a column or in a row. Useful for large tables for example.";
  var initialValue = defaultGridSettings; //"3*3";

  ui.getInputFromUser(
    instructionalTextForInput,
    {
      initialValue: initialValue,
      description: description
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      } else {
        result = value;
        Settings.setSettingForKey('defaultGridSettings', result);

      }
    }

  )

  console.log(result)

  getColumnsRowsAndSpacing(result)
  console.log("getColumnsRowsAndSpacing(result)")

  console.log(getColumnsRowsAndSpacing(result))
  console.log("Columns/Rows etc")
  // console.log(resultArraySpacing[0])
  console.log(rows = resultArray[1] || 1)
  console.log(columns = resultArray[0] || 1)
  console.log(marginx = resultArraySpacing[1])
  console.log(marginy = resultArraySpacing[2])
  // console.log(resultArraySpacing[3])



  // if (result.includes(',')) {
  //   resultArraySpacing = result.split(",");
  //   marginx = Number(resultArraySpacing[1]) || 0;
  //   marginy = Number(resultArraySpacing[2]) || 0;
  //   console.log(marginx)
  //   console.log(marginy)
  //   if (resultArraySpacing[0].includes('*')) {
  //     resultArray = resultArraySpacing[0].split("*");
  //   } else {
  //     // nada
  //   }
  //
  // } else {
  //   if (result.includes('*')) {
  //     resultArray = result.split("*");
  //   } else {
  //     // nada
  //   }
  //
  // }



  var tempSelection;

  // console.log(resultArray)
  // console.log(marginx)
  // console.log(marginy)


  for (r = 0; r < rows; ++r) {

    for (c = 0; c < columns; ++c) {

      movebyx = selection.layers[0].frame.width * c;
      // console.log("height")
      movebyy = selection.layers[0].frame.height * r;

      // console.log(c)
      // console.log(r)

      var duplicatedLayer = selection.layers[0].duplicate()

      duplicatedLayer.frame.x = selection.layers[0].frame.x + movebyx + (marginx * c);
      duplicatedLayer.frame.y = selection.layers[0].frame.y + movebyy + (marginy * r);

      duplicatedLayer.name = duplicatedLayer.name + " r-" + (r+1) + " c-" + (c+1);
      // tempSelection.push(duplicatedLayer)

      duplicatedLayer.selected = true;
    }
  }

  selection = document.selectedLayers;

  // new Group()




  // selection.


  //selection.layers[0].name = selection.layers[0].name + " " + (1) + " " + (1)
  selection.layers[0].remove()

  // var group = new Group({
  //   name: "Grid",
  // })
  //
  // group.parent = selection.layers[0].parent;
  //
  // selection.layers[0].parent = group
  //
  // selection.parent = group;


};

function getColumnsRowsAndSpacing(result) {
  //
  if (result.includes(',')) {
    resultArraySpacing = result.split(",");
    console.log("resultArraySpacing")
    console.log(resultArraySpacing)
    var marginx = Number(resultArraySpacing[1]) || 0;
    var marginy = Number(resultArraySpacing[2]) || 0;
    console.log("gutters")
    console.log(marginx)
    console.log(marginy)
    if (resultArraySpacing[0].includes('*')) {
      resultArray = resultArraySpacing[0].split("*");
    } else {
      // nada
    }

  } else {
    if (result.includes('*')) {
      resultArray = result.split("*");
      // resultArraySpacing = [0,0]
    } else {
      // nada
    }
  }

  // return [resultArray, marginx, marginy];
  // return resultArraySpacing;

}
