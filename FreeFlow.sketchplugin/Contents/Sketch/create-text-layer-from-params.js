var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');
  var Text = require('sketch/dom').Text
  var Shape = require('sketch/dom').Shape
  var Group = require('sketch/dom').Group
  var Page = require('sketch/dom').Page
  var Artboard = require('sketch/dom').Artboard
  // var Document = require('sketch/dom').Document
  var Style = require('sketch/dom').Style
  var doc = context.document;

  var sketchversion = sketch.version.sketch;


  var document = sketch.getSelectedDocument();

  var selection = document.selectedLayers;

  createText()

  function createText() {
    textX = 10;
    textY = 10;
    textParent = selection.layers[0];
    textFontSize = 16;
    textColor = "#666";
    textLineHeight = 24;
    textAlignment = "left";
    textFontFamily = 'Open Sans';
    textFontWeight = 5;
    textValue = "Hello!";
    textName = "Text Layer";

    var text = new Text({
      text: textValue
    })

    text.frame.x = textX
    text.frame.y = textY
    text.parent = textParent;
    text.style.fontSize = textFontSize;
    text.style.textColor = textColor;
    text.style.lineHeight = textLineHeight;
    text.style.alignment = textAlignment;
    text.style.fontFamily= textFontFamily;
    text.style.fontWeight= textFontWeight;

    text.name = textName;

  }


};
