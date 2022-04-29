var onRun = function(context) {
var sketch = require('sketch');
var sketchDom = require('sketch/dom')
var ui = require('sketch/ui');
var document = sketch.getSelectedDocument();

console.log("start")



var symboldStates = ["--default","--hover", "--pressed","--tab","--disabled" ]

var styleStates = ["--default","--hover", "--pressed","--tab","--disabled" ]

var states = symboldStates;

// //var states = [" --default"," --hover"," --active"," --pressed" ]
// //var states = ["--Hover","--Focus","--Selected","--Activated","--Pressed","--Disabled" ]
//
var elements = document.selectedLayers.layers;


for (e = 0; e < elements.length; ++e) {
  console.log("+")

  var symbol = elements[e];

  var originalName = symbol.name

  symbol.name = originalName + states[0];

  if (symbol.type === "Text" || symbol.type === "ShapePath") {
    symbol.name = originalName + " / $" + (originalName + states[0]).toLowerCase().replace(/\s+/g, '')
  }

  for (s = 1; s < states.length; ++s) {

    var newState = symbol.duplicate()

    newState.name = originalName + states[s];

    if (symbol.type === "Text" || symbol.type === "ShapePath") {
      newState.name = originalName + " / $" + (originalName + states[s]).toLowerCase().replace(/\s+/g, '')
    }

    newState.frame.x = symbol.frame.x + 600 * s;

    newState.index = symbol.index - s + 1
    // newState.index = symbol.index - 1

  }
}

console.log("done")

};
