var onRun = function(context) {
    var sketch = require("sketch");
    var library = require("sketch/dom").Library;

    const document = sketch.getSelectedDocument();
    const libraries = library.getLibraries();
    let activeLibraries = [];
    let activeLibrariesSymbols = [];

    for (i = 0; i < libraries.length; i++) {
        if (libraries[i].enabled === true) {
            // console.log(libraries[i].name);
            // activeLibraries.push(libraries[i]);
            // activeLibrariesSymbols.push(libraries[i].getImportableSymbolReferencesForDocument(document));
        }
    }

    let documentPages = document.pages;
    // console.log(documentPages);
    getAllLayers(documentPages);
    // let selectedLayer = document.selectedLayers.layers[0];
    // let selectedLayerSymbolId = selectedLayer.symbolId;
    // let symbolMasterLib = document.selectedLayers.layers[0].master.getLibrary();

    // console.log(symbolMasterLib);

    // if (!symbolMasterLib) {
    //     // Symbol master is in current document
    //     return;
    // }

    // let symbolRefs = myLibrary.getImportableSymbolReferencesForDocument(document);
    // let attemptToFindInLibrary = symbolRefs.find((symbol) => symbol.id == selectedLayerSymbolId);
    // let isFoundInLibrary = attemptToFindInLibrary ? true : false;

    // if (document !== undefined) {
    //     let json = JSON.stringify(document, null, 1);

    //     let pasteboard = NSPasteboard.generalPasteboard();
    //     pasteboard.clearContents();
    //     pasteboard.setString_forType(json, NSPasteboardTypeString);

    //     sketch.UI.message("📋 Data copied to clipboard.");
    // } else {
    //     sketch.UI.message("☝️ No documents found.");
    // }

    sketch.UI.message("All your Symbols has been updated.");
};

function getAllLayers(documentPages) {
    console.log(documentPages);
    for (j = 0; j < documentPages.length; j++) {
        let documentLayers = documentPages[j].layers;
        console.log(documentLayers);
        if (documentLayers[j].type === "SymbolInstance") {
            console.log("This is an instance");
        }
        if (documentLayers[j].type === "Artboard" || documentLayers[j].type === "SymbolMaster") {
            getAllLayers(documentLayers[j]);
        }
    }
    // return;
}