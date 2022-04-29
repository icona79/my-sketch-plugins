var onRun = function(context) {
  var sketch = require('sketch');
  var ui = require('sketch/ui');
  var Settings = require('sketch/settings');

  var savedSelectionGlobal = Settings.globalSettingForKey('savedSelectionGlobal');
  var savedSelectionParentArtboardGlobal = Settings.globalSettingForKey('savedSelectionParentArtboardGlobal');

  var count = 0;
  console.log("OBJ id: " + savedSelectionGlobal);
  console.log("Artboard id: " + savedSelectionParentArtboardGlobal);


  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;

  var selectedArtboards = document.selectedLayers.layers;

  var parent = document.selectedLayers.layers[0];

  console.log(parent.name);

  console.log(selectedArtboards.length);


  console.log("-------");

  var sourceElementsIDs = Settings.globalSettingForKey('savedFullSelectionIDsGlobal');
  console.log(sourceElementsIDs);


  for (j = 0; j < selectedArtboards.length; ++j) {

    if (selectedArtboards[j].id === savedSelectionParentArtboardGlobal){
      console.log("source artboard");
    }
    else{

      for (e = 0; e < sourceElementsIDs.length; ++e) {

        //var layer = document.getLayerWithID(Settings.globalSettingForKey('savedSelectionGlobal'))
        var layer = document.getLayerWithID(sourceElementsIDs[e])

        if (layer.type === "SymbolMaster"){

          ui.message(layer.type);

          if (document.getSymbols().find(s => s.name === Settings.globalSettingForKey('savedSelectionNameGlobal')).type === "SymbolMaster" ) {

            var copiedSymbolMaster = document.getSymbolMasterWithID(Settings.globalSettingForKey('savedSelectionGlobal'));

            var symbolMaster = document.getSymbols().find(s => s.name === Settings.globalSettingForKey('savedSelectionNameGlobal'));
            console.log(symbolMaster)
            var symbolInstance = symbolMaster.createNewInstance();

            symbolInstance.parent = selectedArtboards[j];

            var symbolNameArray = symbolMaster.name.split("/");
            var symbolNameForAcronym = symbolNameArray[symbolNameArray.length-1] || symbolMaster.name;

            symbolInstance.name = symbolNameForAcronym.trim();

            symbolInstance.frame.x = 0;
            symbolInstance.frame.y = 0;

            count = count+1;


          }

        }

        if (layer.type !== "SymbolMaster"){


          console.log("duplicating" + Settings.globalSettingForKey('savedSelectionGlobal'));
          var duplicatedLayer = layer.duplicate();
          selectedArtboards[j].layers.push(duplicatedLayer);
          count = count+1;

        }
      }
    }
  }



  ui.message("🌈: Done pasting to " + count + " times! 👏 🚀");

};
