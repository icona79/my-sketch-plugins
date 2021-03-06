var onRun = function(context) {

    var sketch = require('sketch')
    var ui = require('sketch/ui')

    var	document = sketch.getSelectedDocument();


    var data = document.sketchObject.documentData();
    var page = document.selectedPage;
    var selection = document.selectedLayers;

    var layerStyles = document.sharedLayerStyles;
    var textStyles = document.sharedTextStyles;


    console.log(selection.layers[0].index)

    var margin = 0;
    var moveby = 0;
    var lineHeightMultiplier = 1.5;

    // var GeneratedStylesArray = [];

    var create = function create(document, layer,stylename) {

      console.log("Yes/No?")
      if (layer.type === "Text"){
        var styles = document.sharedTextStyles;
      }
      if (layer.type === "ShapePath"){
        var styles = document.sharedLayerStyles;
      }

      if (layer.type === "Shape"){
        var styles = document.sharedLayerStyles;
      }


      var arrayStyleNames = styles.map(sharedstyle => sharedstyle["name"]);
      console.log(layer.name)
      console.log(arrayStyleNames.indexOf(layer.name))

      if (arrayStyleNames.indexOf(layer.name) === -1) {
        var sharedStyle = sketch["default"].SharedStyle.fromStyle({
          //name: layer.name,
          name: stylename,
          style: layer.style,
          document: document
        });
      } else {
        console.log("already existing");
      }
    }


    // var StylesArrayColors = arrayColorNamesAndValues;
    var layername = "";
    var stylename = "";
    var colorname;
    var colorindex;
    var layer;
    var textStyles;
    var styles;

    //StylesArrayColors;


    // Generate Typography and Styles
    for (c = 0; c < selection.layers.length; ++c){

      layer = selection.layers[c];

      if (layer.type === "Text"){
        stylename = layer.name;
      }
      if (layer.type === "ShapePath"){
        stylename = layer.name;
      }

      if (layer.type === "Shape"){
        stylename = layer.name;
      }

      // Add TextStyle to document
      create(document,layer,stylename);


      if (layer.type === "Text"){
        var styles = document.sharedTextStyles;
      }
      if (layer.type === "ShapePath"){
        var styles = document.sharedLayerStyles;
      }
      if (layer.type === "Shape"){
        var styles = document.sharedLayerStyles;
      }

      console.log(styles.length)

      /// map all styles IDs
      var arrayStyleIDs = styles.map(sharedstyle => sharedstyle["id"]);
      var arrayStyleNames = styles.map(sharedstyle => sharedstyle["name"]);
      var arrayStyleNamesAndIDs = styles.map(sharedstyle => [sharedstyle["name"], sharedstyle["id"]]);

      console.log("sharedStyleId + style ---------------------")

      var arrayStyleIDs = styles.map(sharedstyle => sharedstyle["id"]);
      var arrayStyleNames = styles.map(sharedstyle => sharedstyle["name"]);
      var arrayStyleNamesAndIDs = styles.map(sharedstyle => [sharedstyle["name"], sharedstyle["id"]]);

      if (arrayStyleNames.indexOf(layer.name) !== -1) {
        // update preexisting style
        layer.sharedStyleId = arrayStyleIDs[arrayStyleNames.indexOf(layer.name)];
        styles[arrayStyleNames.indexOf(layer.name)].style = layer.style;

      }

      console.log(layer.sharedStyleId)
      console.log(layer.style)
      console.log("styles + arrayStyleNames [0] ---------------------")

      // console.log(arrayStyleNames[0])

      console.log("sharedStyleId + style ---------------------")

    }

    ui.message("????: Yay! Done generating styles! ???? ????");


};
