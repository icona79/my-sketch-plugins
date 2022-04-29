var onRun = function(context) {
    var sketch = require("sketch");

    var document = context.document;

    var documentData = document.documentData();
    var allImportedSymbols = documentData.foreignSymbols();
    if (allImportedSymbols.count() == 0) {
        sketch.UI.message("You have no imported symbols.");
        return;
    }

    var assetLibraryController = AppController.sharedInstance().librariesController();
    var availableLibraries = assetLibraryController.availableLibraries();
    var sortDescriptor = NSSortDescriptor.sortDescriptorWithKey_ascending_selector("name", true, "localizedStandardCompare:");
    availableLibraries = availableLibraries.sortedArrayUsingDescriptors([sortDescriptor]);
    if (availableLibraries.count() == 0) {
        sketch.UI.message("You have no available libraries.");
        return;
    }

    var allImportedSymbolsMissLibrary = allImportedSymbols.mutableCopy();
    var allImportedSymbolsNotFound = allImportedSymbols.mutableCopy();
    var loopAllImportedSymbols = allImportedSymbols.objectEnumerator();
    var importedSymbol;

    while ((importedSymbol = loopAllImportedSymbols.nextObject())) {
        if (sketch.version.sketch >= 49) {
            var libraryForSymbol = assetLibraryController.libraryForShareableObject(importedSymbol.symbolMaster());
        } else {
            var libraryForSymbol = assetLibraryController.libraryForSymbol(importedSymbol.symbolMaster());
        }
        if (libraryForSymbol) {
            allImportedSymbolsMissLibrary.removeObject(importedSymbol);
            if (libraryForSymbol.enabled() == false) {
                allImportedSymbolsNotFound.removeObject(importedSymbol);
            }
            if (importedSymbol.masterFromLibrary(libraryForSymbol)) {
                allImportedSymbolsNotFound.removeObject(importedSymbol);
            }
        } else {
            allImportedSymbolsNotFound.removeObject(importedSymbol);
        }

        // console.log(allImportedSymbolsMissLibrary);

        // var originalLibrary = assetLibraryController.libraryForShareableObject(importedSymbol.symbolMaster());

        // var originalLibraryID = importedSymbol.libraryID();
        // var originalLibraryName = importedSymbol.sourceLibraryName();

        var finalLibraryID = "0BC9ADD4-ABCE-47B2-9CDF-DBF5A76AA302";
        var finalLibraryName = "Rinascente-PatternLibrary";

        // console.log(importedSymbol);
        importedSymbol.setLibraryID(finalLibraryID);
        importedSymbol.setSourceLibraryName(finalLibraryName);
    }
    sketch.UI.message("All your Symbols has been updated.");
};