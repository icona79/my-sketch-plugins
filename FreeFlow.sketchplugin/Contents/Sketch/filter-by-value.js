var onRun = function(context) {

var sketch = require('sketch')
var ui = require('sketch/ui')

var	document = sketch.getSelectedDocument();

var data = document.sketchObject.documentData();
var page = document.selectedPage;
var selection = document.selectedLayers;
var doc = context.document;

var Settings = require('sketch/settings')

var defaultSpacing = 0;


var allSymbols = document.selectedLayers;

var allSymbolsDataArrayToSort = [];
var allSymbolsSorted = [];

var count = 0;

var overrideLabels = "";
var overrideValues = "";
var highestY = allSymbols.layers[0].frame.y;
var highestX = allSymbols.layers[0].frame.x;

// var yValuesArray = 0;
console.log("highestY & X")
console.log(highestY)
console.log(highestX)

for (i = 0; i < allSymbols.layers.length; ++i) {

  console.log("highestY? " + allSymbols.layers[i].frame.y)
  console.log("highestX? " + allSymbols.layers[i].frame.x)

  if (allSymbols.layers[i].frame.y <= highestY) {
    highestY = allSymbols.layers[i].frame.y;
    console.log("highestY -> " + highestY)
  }

  if (allSymbols.layers[i].frame.x <= highestX) {
    highestX = allSymbols.layers[i].frame.x;
    console.log("highestX -> " + highestX)
  }
}

// highestY = allSymbols.layers[i].frame.y;
console.log("highestY is -> " + highestY)
console.log("highestX is -> " + highestX)


if (allSymbols.layers[0].type === "SymbolInstance") {

  for (i = 0; i < allSymbols.layers[0].overrides.length; ++i) {

      if (allSymbols.layers[0].overrides[i].affectedLayer.type === "Text") {

        /// TEXT LAYER OVERRIDE VALUE
        console.log(allSymbols.layers[0].overrides[i].value)

        /// TEXT LAYER NAME/LABEL
        console.log(allSymbols.layers[0].overrides[i].affectedLayer.name)

        //overrideValues = overrideValues + allSymbols.layers[0].overrides[i].affectedLayer.text +", ";
        overrideValues = overrideValues + allSymbols.layers[0].overrides[i].value +", ";
        overrideLabels = overrideLabels + allSymbols.layers[0].overrides[i].affectedLayer.name +" ("+i+")\n\n";

      }
  }
}

console.log(overrideValues)
console.log(overrideLabels)


if (allSymbols.layers[0].type === "SymbolInstance"){

var instructionalTextForInput = "Filter Instances by Override Values";
var descriptionText = "To filter the instances by a specific text override value, enter the value below:"
// var descriptionText = "To filter the instances by a specific text override value, pick the value in between the ( ).\n\nTo sort in Descending order, add a 'd' after the number in the parenthesis:\n\n" + overrideLabels



ui.getInputFromUser(
  instructionalTextForInput,
  {
    initialValue: 0,
    description: descriptionText,
  },
  (err, value) => {
    if (err) {
      // most likely the user canceled the input
      return
    } else {
      res = value;

    }
  }
)

var result = res;

}



////

//var sortByOverrideIndex = result[0];
//var sortByDirection = "+";

// if (result[1]){
//   var sortByDirection = result[1];
// }

// console.log(sortByOverrideIndex)
// console.log(sortByDirection)




for (j = 0; j < allSymbols.length; ++j) {

  if (allSymbols.layers[j].type === "SymbolInstance"){
      var tempArray = [];
      console.log(allSymbols.layers[j].id)
      // console.log(allSymbols.layers[j].overrides[sortByOverrideIndex].value);

      for (ov = 0; ov < allSymbols.layers[j].overrides.length; ov++) {

        if result === allSymbols.layers[j].overrides[ov].value {
          tempArray.push(allSymbols.layers[j].id);
          tempArray.push(allSymbols.layers[j].frame.x);
          tempArray.push(allSymbols.layers[j].frame.y);
          tempArray.push(allSymbols.layers[j].overrides[ov].value);
          allSymbolsDataArrayToSort.push(tempArray);
        }
      }

    }
    //console.log(allSymbolsDataArrayToSort)
  //
  // else if (allSymbols.layers[j].type === "Text") {
  //     var tempArray = [];
  //     console.log(allSymbols.layers[j].id)
  //     console.log(allSymbols.layers[j].text);
  //     tempArray.push(allSymbols.layers[j].id);
  //     tempArray.push(allSymbols.layers[j].text);
  //     tempArray.push(allSymbols.layers[j].frame.x);
  //     tempArray.push(allSymbols.layers[j].frame.y);
  //     allSymbolsDataArrayToSort.push(tempArray);


  // } else {
  //   // var tempArray = [];
  //   console.log(allSymbols.layers[j].id)
  //   console.log(allSymbols.layers[j].name);
  //   tempArray.push(allSymbols.layers[j].id);
  //   tempArray.push(allSymbols.layers[j].name);
  //   tempArray.push(allSymbols.layers[j].frame.x);
  //   tempArray.push(allSymbols.layers[j].frame.y);
  //   allSymbolsDataArrayToSort.push(tempArray);
  //
  // }
}
console.log(allSymbolsDataArrayToSort)

if (sortByDirection === "d"){

  console.log("---- sorting in descending order ----")

  allSymbolsDataArraySorted = allSymbolsDataArrayToSort.sort(sortFunction).reverse();
  console.log(allSymbolsDataArraySorted);

  console.log("---- done sorting in descending order ----")

} else {
  console.log("---- sorting in ASC order ----")

  allSymbolsDataArraySorted = allSymbolsDataArrayToSort.sort(sortFunction);
  console.log(allSymbolsDataArraySorted);

  console.log("---- done sorting in ASC order ----")
}


/// NOW render selected layers based on sort order from allSymbolsDataArraySorted




for (i = 0; i < allSymbolsDataArraySorted.length; ++i) {

  console.log("ID from sorted array: " + allSymbolsDataArraySorted[i][0]);

  for (j = 0; j < allSymbols.length; ++j) {

    if (allSymbols.layers[j].id === allSymbolsDataArraySorted[i][0]) {

      console.log("this one " + allSymbols.layers[j].id + " is " + allSymbolsDataArraySorted[i][1])

      allSymbolsSorted.push(allSymbols.layers[j])

      }
  }

}

/// NOW based on vertical or horizzontal spacing setting space things nicely

if (!result[0].includes('h')) {

  for (z = 0; z < allSymbolsSorted.length; ++z) {
    // SPACING elements
    allSymbolsSorted[z].index = z - allSymbolsSorted.length;
    if (z == 0){
      // allSymbolsSorted[z].frame.y = allSymbolsSorted[0].frame.y;
      allSymbolsSorted[z].frame.y = highestY;
    }
    else {
      allSymbolsSorted[z].frame.y = allSymbolsSorted[z-1].frame.y + allSymbolsSorted[z-1].frame.height + defaultSpacing;
    }

    allSymbolsSorted[z].frame.x = allSymbolsSorted[0].frame.x;

    }

}


if (result[0].includes('h') || allSymbols.layers[0].type === "Artboard"){

  for (z = 0; z < allSymbolsSorted.length; ++z) {

    // SPACING elements
    allSymbolsSorted[z].index = z - allSymbolsSorted.length;

    if (allSymbols.layers[0].type === "Artboard"){
      defaultSpacing = 100;
    }

    if (z == 0){
      // allSymbolsSorted[z].frame.x = allSymbolsSorted[0].frame.x;
      allSymbolsSorted[z].frame.x =  highestX;
    }
    else {
      allSymbolsSorted[z].frame.x = allSymbolsSorted[z-1].frame.x + allSymbolsSorted[z-1].frame.width + defaultSpacing;
    }

    allSymbolsSorted[z].frame.y = allSymbolsSorted[0].frame.y;

    }

}


Settings.setSettingForKey('defaultSpacing', result.replace("h",""));

ui.message("Yay! Done sorting and spacing things nicely! 👏 🚀");


//// FIXME SORTING WORKS ALWAYS ALPHABETICALLY - but not for numbers across multiple digits


function sortFunction(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
  }

};
