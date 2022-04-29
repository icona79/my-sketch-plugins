  var onRun = function(context) {
    var sketch = require('sketch');
    var ui = require('sketch/ui');
    var Settings = require('sketch/settings');

    // var savedSelectionGlobal = Settings.globalSettingForKey('savedSelectionGlobal');
    var savedSelectionParentArtboardGlobal = Settings.globalSettingForKey('savedSelectionParentArtboardGlobal');

    var count = 0;
    // console.log("OBJ id: " + savedSelectionGlobal);
    // console.log("Artboard id: " + savedSelectionParentArtboardGlobal);


    var	document = sketch.getSelectedDocument();

    var data = document.sketchObject.documentData();
    var page = document.selectedPage;

    var selectedArtboards = document.selectedLayers.layers;


    var parent = document.selectedLayers.layers[0];



    console.log(parent.name);

    console.log(selectedArtboards.length);


    console.log("-------");

    var sourceElementsIDs = []

    console.log("savedCheatsheetIDsLocal")

    var savedCheatsheetIDsLocal = Settings.documentSettingForKey(document, 'savedCheatsheetIDsLocal');

    console.log(savedCheatsheetIDsLocal)

    var cheatsheetLayers = document.getLayerWithID(savedCheatsheetIDsLocal).layers

    var cheatsheet = cheatsheetLayers[cheatsheetLayers.length-1].id

    sourceElementsIDs.push(cheatsheet)

    console.log(sourceElementsIDs);



    for (j = 0; j < selectedArtboards.length; ++j) {

      if (selectedArtboards[j].id === savedSelectionParentArtboardGlobal){
        console.log("source artboard");
      }
      else{

        for (e = 0; e < sourceElementsIDs.length; ++e) {

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

            var indexToAssign = 0

            // if (selectedArtboards[j].type !== "Artboard" || selectedArtboards[j].type !== "Group" ){
            //   indexToAssign = selectedArtboards[j].index
            // }



            if (selectedArtboards[j].type === "Artboard" || selectedArtboards[j].type === "Group" ){

              console.log("Artboard or Group")

              var duplicatedLayer = layer.duplicate();
              selectedArtboards[j].layers.push(duplicatedLayer);

              duplicatedLayer.index = indexToAssign;

              // duplicatedLayer.parent = selectedArtboards[j]
              console.log("selectedArtboards[j].layers.length")
              console.log(selectedArtboards[j].layers.length)



              if (selectedArtboards[j].layers.length <= 1){
                console.log("selectedArtboards[j].layers.length <= 1")
                console.log(selectedArtboards[j].layers.length)
                duplicatedLayer.frame.y = 0;
                duplicatedLayer.frame.x = 0;
              }

              if (selectedArtboards[j].layers.length >> 1){
                console.log("selectedArtboards[j].layers.length >> 1")
                console.log(selectedArtboards[j].layers.length)

                var spacing = 0;

                if (selectedArtboards[j].layers.length <= 2){
                  console.log("len 2")
                  console.log(selectedArtboards[j].layers.length)
                  var spacing = 0;
                }

                if (selectedArtboards[j].layers.length >> 2){
                  console.log("len 2+")
                  console.log(selectedArtboards[j].layers[1].name)
                  console.log(selectedArtboards[j].layers[2].name)
                  console.log(selectedArtboards[j].layers[1].frame.y)
                  console.log(selectedArtboards[j].layers[1].frame.height)
                  console.log(selectedArtboards[j].layers.length)
                  var spacing = (selectedArtboards[j].layers[1].frame.y - (selectedArtboards[j].layers[2].frame.height + selectedArtboards[j].layers[2].frame.y)) || spacing;
                }

                console.log("spacing")
                console.log(spacing)
                // duplicatedLayer.frame.y = selectedArtboards[j].layers[0].frame.y + selectedArtboards[j].layers[0].frame.height + spacing;
                duplicatedLayer.frame.y = selectedArtboards[j].layers[1].frame.y + selectedArtboards[j].layers[1].frame.height + spacing;
                duplicatedLayer.frame.x = selectedArtboards[j].layers[1].frame.x;

              }

              if (duplicatedLayer.parent.type === "Group"){
                duplicatedLayer.parent.adjustToFit()
              }

              count = count+1;

          }


          }
        }
      }
    }



    ui.message("🌈: Done pasting to " + count + " times! 👏 🚀");

  };
