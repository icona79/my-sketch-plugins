var onRun = function(context) {
  var sketch = require('sketch')
  var document = sketch.getSelectedDocument();
  var ui = require('sketch/ui')
  var doc = context.document;
  var selectedLayers = document.selectedLayers;
  var selectedCount = selectedLayers.length;
  var selection = context.selection;
  var selections = selection.objectEnumerator();
  var count = 0;
  var sketchversion = sketch.version.sketch;

  console.log(selection.length);

  //
  // var	document = sketch.getSelectedDocument();
  //
  // var doc = context.document;

  console.log(document.selectedLayers.length)
  console.log(sketch.version.sketch)

  document.selectedLayers.forEach(function (Layer) {
      console.log("it's a " + Layer.type)
      if (Layer.type === "Group"){
        console.log("it's a " + Layer.type)
        Layer.adjustToFit()
      }

      if (Layer.type === "SymbolInstance"){
        console.log("it's a " + Layer.type)
        // finds master symbol
        console.log(document.getSymbolMasterWithID(Layer.symbolId));
        var masterSymbol = document.getSymbolMasterWithID(Layer.symbolId);

        // resets to original width and height
        console.log("it's a " + Layer.frame)
        var tempx = Layer.frame.x
        var tempy = Layer.frame.y
        Layer.frame.width = masterSymbol.frame.width;
        Layer.frame.height = masterSymbol.frame.height;

        /// Works up to v60.1
        if (sketchversion <= 61) {
          Layer._object.resizeToFitContentsIfNeededNoCache();
          /// Added message as otherwise on <v60 there will be no msg as following line will through an error
        }

        /// Works from v61 and up
        if (sketchversion >> 61.1) {
          Layer._object.resizeWithSmartLayout();
        }

        // if (sketchversion >> 61.1) {
        //   Layer._object.resizeWithSmartLayout();
        // }



        Layer.frame.x = tempx;
        Layer.frame.y = tempy;


      }

      if (Layer.type === "Artboard"){
        console.log("it's a " + Layer.type)
         Layer.adjustToFit();
      }

      if (Layer.type === "SymbolMaster"){
        console.log("it's a " + Layer.type)
         Layer.adjustToFit();
      }

      if (Layer.type === "Text"){
        console.log("it's a " + Layer.type);
        Layer.adjustToFit();
        console.log(Layer.frame);
        var totalHeight = 0;
        var totalWidth = 0;
        var widthsArray = [];

        var array1 = [1, 3, 2];
        console.log("Max " + Math.max(...array1));

        Layer.fragments.forEach(function (textFragment) {
          //console.log(textFragment);
          totalHeight = totalHeight + textFragment.rect.height;
          widthsArray.push(textFragment.rect.width);
          console.log(totalHeight);
          console.log(widthsArray);
          console.log(totalWidth = Math.max(...widthsArray));
        });

        Layer.frame.height = totalHeight;
        Layer.frame.width = totalWidth;




      }

        count = count + 1;

  });


  ui.message("🌈: Done fitting " + count + " elements to their contents! 👏 🚀");


};
