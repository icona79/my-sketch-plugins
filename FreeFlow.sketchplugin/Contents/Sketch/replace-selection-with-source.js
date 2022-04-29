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

  for (j = 0; j < selectedArtboards.length; ++j) {

    if (selectedArtboards[j].id === savedSelectionParentArtboardGlobal){
      console.log("source artboard");
    }
    else{
      var layer = document.getLayerWithID(Settings.globalSettingForKey('savedSelectionGlobal'))

      if (layer.type === "SymbolMaster"){

        ui.message(layer.type);

        if (document.getSymbols().find(s => s.name === Settings.globalSettingForKey('savedSelectionNameGlobal')).type === "SymbolMaster" ) {

          var copiedSymbolMaster = document.getSymbolMasterWithID(Settings.globalSettingForKey('savedSelectionGlobal'));

          var symbolMaster = document.getSymbols().find(s => s.name === Settings.globalSettingForKey('savedSelectionNameGlobal'));
          console.log(symbolMaster)
          var symbolInstance = symbolMaster.createNewInstance();



          var symbolNameArray = symbolMaster.name.split("/");
          var symbolNameForAcronym = symbolNameArray[symbolNameArray.length-1] || symbolMaster.name;

          symbolInstance.name = symbolNameForAcronym.trim();

          symbolInstance.parent = selectedArtboards[j].parent;
          symbolInstance.frame.x = selectedArtboards[j].frame.x;
          symbolInstance.frame.y = selectedArtboards[j].frame.y;
          symbolInstance.frame.width = selectedArtboards[j].frame.width;
          symbolInstance.frame.height = selectedArtboards[j].frame.height;
          symbolInstance.index = selectedArtboards[j].index;
          selectedArtboards[j].remove();

          count = count+1;


        }

      }

      if (layer.type !== "SymbolMaster"){

        console.log("duplicating" + Settings.globalSettingForKey('savedSelectionGlobal'));
        var duplicatedLayer = layer.duplicate();

        duplicatedLayer.parent = selectedArtboards[j].parent;
        duplicatedLayer.frame.x = selectedArtboards[j].frame.x;
        duplicatedLayer.frame.y = selectedArtboards[j].frame.y;
        duplicatedLayer.frame.width = selectedArtboards[j].frame.width;
        duplicatedLayer.frame.height = selectedArtboards[j].frame.height;
        duplicatedLayer.index = selectedArtboards[j].index;
        selectedArtboards[j].remove();
        count = count+1;

        ui.message("🌈: Done replacing " + count + " elements! 👏 🚀");


      }
    }

  }

  // ui.message("🌈: Done replacing " + count + " elements! 👏 🚀");

};
