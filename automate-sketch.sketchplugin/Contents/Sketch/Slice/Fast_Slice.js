var runFastSlice = function(context) {

    var ga = require("../modules/Google_Analytics");
    ga("Slice");

    var sketch = require("sketch");
    var preferences = require("../modules/Preferences");
    var document = context.document;
    var version = sketch.version.sketch;
    var exportPresets = MSExportPreset.allExportPresets();

    // Checking if need to run setting first.
    var runSettingFirst = false;
    var sliceExportPresetIndex = preferences.get("sliceExportPresetIndex");
    var sliceExportPresetName = preferences.get("sliceExportPresetName");
    var sliceNameFormat = preferences.get("sliceNameFormat");
    if (!sliceExportPresetIndex || !sliceExportPresetName || !sliceNameFormat) {
        runSettingFirst = true;
    }
    else {
        var defaultPreset = exportPresets.objectAtIndex(sliceExportPresetIndex);
        if (defaultPreset) {
            if (String(defaultPreset.name()) != sliceExportPresetName) {
                runSettingFirst = true;
            }
        }
        else {
            runSettingFirst = true;
        }
    }
    if (runSettingFirst) {
        document.showMessage("This is your first time running Fast Slice, so you need to configure the slice settings first.");
        var setting = sliceSetting(context);
        if (setting != 1000) {
            document.showMessage("You must confirm the slice settings.");
            return;
        }
        if (setting == 1000) {
            sliceExportPresetIndex = preferences.get("sliceExportPresetIndex");
            sliceExportPresetName = preferences.get("sliceExportPresetName");
            sliceNameFormat = preferences.get("sliceNameFormat");
        }
    }

    // Checking selection
    var selection = context.selection;
    if (selection.count() == 0) {
        document.showMessage("Please select at least 1 layer.");
        return;
    }

    document.currentPage().changeSelectionBySelectingLayers(nil);

    // Add Slice
    var allSlices = [];
    var loopSelection = selection.objectEnumerator();
    var layer;
    while (layer = loopSelection.nextObject()) {

        var slice = MSSliceLayer.sliceLayerFromLayer(layer);
        slice.makeOriginIntegral();

        // layer order
        if (
            preferences.get("sliceLayerOrder") == null ||
            preferences.get("sliceLayerOrder") == "0" ||
            preferences.get("sliceLayerOrder") == "1"
        ) {
            if (
                layer.class() == "MSLayerGroup" ||
                layer.class() == "MSArtboardGroup" ||
                layer.class() == "MSSymbolMaster"
            ) {
                if (layer.class() == "MSLayerGroup") {
                    slice.exportOptions().setLayerOptions(2);
                }
                if (preferences.get("sliceLayerOrder") == "1") {
                    slice.moveToLayer_beforeLayer(layer, nil);
                } else {
                    slice.moveToLayer_beforeLayer(layer, layer.firstLayer());
                }
            } else {
                if (preferences.get("sliceLayerOrder") == "0") {
                    var newGroup;
                    if (version >= 84) {
                        newGroup = MSLayerGroup.groupWithLayers([slice, layer]);
                    } else if (version >= 83) {
                        var layerArray = MSLayerArray.arrayWithLayers([slice, layer]);
                        newGroup = MSLayerGroup.groupWithLayers(layerArray.layers());
                    } else {
                        var layerArray = MSLayerArray.arrayWithLayers([slice, layer]);
                        newGroup = MSLayerGroup.groupWithLayers(layerArray);
                    }
                    newGroup.setName(layer.name());
                    slice.exportOptions().setLayerOptions(2);
                } else if (preferences.get("sliceLayerOrder") == "1") {
                    
                    var newGroup;
                    if (version >= 84) {
                        newGroup = MSLayerGroup.groupWithLayers([layer, slice]);
                    } else if (version >= 83) {
                        var layerArray = MSLayerArray.arrayWithLayers([layer, slice]);
                        newGroup = MSLayerGroup.groupWithLayers(layerArray.layers());
                    } else {
                        var layerArray = MSLayerArray.arrayWithLayers([layer, slice]);
                        newGroup = MSLayerGroup.groupWithLayers(layerArray);
                    }
                    newGroup.setName(layer.name());
                    slice.exportOptions().setLayerOptions(2);
                } else {
                    slice.moveToLayer_beforeLayer(layer.parentGroup(), layer);
                }
            }
        }

        if (slice.parentGroup().class() == "MSLayerGroup") {
            slice.exportOptions().setLayerOptions(2);
        }

        var exportFormats = exportPresets.objectAtIndex(sliceExportPresetIndex).exportFormats();
        slice.exportOptions().setExportFormats(exportFormats);

        // Slice layer name
        var layerName = layer.name();
        // group/base_name
        if (sliceNameFormat == 0) {
            layerName = formatLayerName(layerName, "_", "/", { removeStartDigits: true });
        }
        // group/base-name
        if (sliceNameFormat == 1) {
            layerName = formatLayerName(layerName, "-", "/", { removeStartDigits: true });
        }
        // group_base_name
        if (sliceNameFormat == 2) {
            layerName = formatLayerName(layerName, "_", "_").replace(/^\d+_*/, "");
        }
        // group-base-name
        if (sliceNameFormat == 3) {
            layerName = formatLayerName(layerName, "-", "-").replace(/^\d+-*/, "");
        }
        // base_name
        if (sliceNameFormat == 4) {
            layerName = cropLayerName(layerName, "_").replace(/^\d+_*/, "");
        }
        // base-name
        if (sliceNameFormat == 5) {
            layerName = cropLayerName(layerName, "-").replace(/^\d+-*/, "");
        }
        slice.setName(layerName);

        allSlices.push(slice);

    }

    document.reloadInspector();

    document.currentPage().changeSelectionBySelectingLayers(allSlices);

};

var runSliceSetting = function(context) {
    var ga = require("../modules/Google_Analytics");
    ga("Slice");
    sliceSetting(context);
};

function sliceSetting(context) {

    var preferences = require("../modules/Preferences");
    var Dialog = require("../modules/Dialog").dialog;
    var ui = require("../modules/Dialog").ui;

    // Dialog
    var dialog = new Dialog(
        "Slice Setting",
        "Fast slice add a slice with an export preset and name to url-friendly format. " +
        "Slice name will change Latin char to ASCII char, remove not ASCII char, " +
        "special sign and digits at the beginning of name.",
        300,
        ["Save", "Cancel"]
    );

    var presetLabel = ui.textLabel("Choose Export Option Preset for Slice Layer");
    dialog.addView(presetLabel);

    var exportPresets = MSExportPreset.allExportPresets().slice().map(function(item) {
        return item.name()
    });
    var preset = ui.popupButton(exportPresets, 300);
    dialog.addView(preset);

    var nameLabel = ui.textLabel("Choose Slice Layer Name Format");
    dialog.addView(nameLabel);

    var nameFormats = [
        "group/base_name",
        "group/base-name",
        "group_base_name",
        "group-base-name",
        "base_name",
        "base-name"
    ];
    var nameFormat = ui.popupButton(nameFormats, 300);
    dialog.addView(nameFormat);

    var sliceExportPresetIndex = preferences.get("sliceExportPresetIndex");
    var sliceExportPresetName = preferences.get("sliceExportPresetName");
    var sliceNameFormat = preferences.get("sliceNameFormat");
    if (sliceExportPresetIndex && sliceExportPresetName) {
        if (exportPresets[sliceExportPresetIndex] == sliceExportPresetName) {
            preset.selectItemAtIndex(sliceExportPresetIndex);
        }
    }
    if (sliceNameFormat) {
        nameFormat.selectItemAtIndex(sliceNameFormat);
    }

    var layerOrderLabel = ui.textLabel("Order of New Slice Layer");
    dialog.addView(layerOrderLabel);
    var sliceOrder = ui.popupButton(["Bottom, inside a group. (default)", "Top, inside a group.", "Top of layer list."]);
    dialog.addView(sliceOrder);
    sliceOrder.selectItemAtIndex(parseInt(preferences.get("sliceLayerOrder")) || 0);

    var responseCode = dialog.run();
    if (responseCode == 1000) {
        // Save preferences
        preferences.set("sliceExportPresetIndex", preset.indexOfSelectedItem());
        preferences.set("sliceExportPresetName", preset.titleOfSelectedItem());
        preferences.set("sliceNameFormat", nameFormat.indexOfSelectedItem());
        preferences.set("sliceLayerOrder", sliceOrder.indexOfSelectedItem());
    }

    return responseCode;
}

function cleanNameArray(name, options) {
    var nameArray = [];
    String(name).split(/\s*\/\s*/).forEach(function(part) {
        // Latin to ascii
        var latinToAsciiMapping = {
            "ae": "??|??|??",
            "oe": "??|??",
            "ue": "??",
            "Ae": "??",
            "Ue": "??",
            "Oe": "??",
            "A": "??|??|??|??|??|??|??|??|??|??|??",
            "a": "??|??|??|??|??|??|??|??|??|??|??",
            "C": "??|??|??|??|??",
            "c": "??|??|??|??|??",
            "D": "??|??|??",
            "d": "??|??|??",
            "E": "??|??|??|??|??|??|??|??|??",
            "e": "??|??|??|??|??|??|??|??|??",
            "G": "??|??|??|??",
            "g": "??|??|??|??",
            "H": "??|??",
            "h": "??|??",
            "I": "??|??|??|??|??|??|??|??|??|??",
            "i": "??|??|??|??|??|??|??|??|??|??",
            "J": "??",
            "j": "??",
            "K": "??",
            "k": "??",
            "L": "??|??|??|??|??",
            "l": "??|??|??|??|??",
            "N": "??|??|??|??",
            "n": "??|??|??|??|??",
            "O": "??|??|??|??|??|??|??|??|??|??|??",
            "o": "??|??|??|??|??|??|??|??|??|??|??|??",
            "R": "??|??|??",
            "r": "??|??|??",
            "S": "??|??|??|??",
            "s": "??|??|??|??|??",
            "T": "??|??|??",
            "t": "??|??|??",
            "U": "??|??|??|??|??|??|??|??|??|??|??|??|??|??|??",
            "u": "??|??|??|??|??|??|??|??|??|??|??|??|??|??|??",
            "Y": "??|??|??",
            "y": "??|??|??",
            "W": "??",
            "w": "??",
            "Z": "??|??|??",
            "z": "??|??|??",
            "AE": "??|??",
            "ss": "??",
            "IJ": "??",
            "ij": "??",
            "OE": "??",
            "f": "??",
        };
        for (var i in latinToAsciiMapping) {
            var regexp = new RegExp(latinToAsciiMapping[i], "g");
            part = part.replace(regexp, i);
        }
        // Remove no ascii character
        // part = part.replace(/[^\u0020-\u007E]/g, "");
        // Remove unsupport character
        part = part.replace(/[\u0021-\u002B\u003A-\u0040\u005B-\u005E\u0060\u007B-\u007E]/g, "");
        // Remove digits at the beginning of name
        if (options && options["removeStartDigits"] == true) {
            part = part.replace(/^\d+\s*/, "");
        }
        // Unix hidden file
        part = part.replace(/^\./, "");
        // , - . _ to space
        part = part.replace(/[\u002C-\u002E\u005F]/g, " ");
        part = part.toLowerCase();
        part = part.trim();
        if (part != "") {
            nameArray.push(part);
        }
    });
    return nameArray;
}

function formatLayerName(name, space, join, options) {
    var newNameArray = cleanNameArray(name, options).map(function(part) {
        return part.replace(/\s+/g, space);
    });
    return newNameArray.join(join);
}

function cropLayerName(name, space) {
    var newNameArray = cleanNameArray(name).map(function(part) {
        return part.replace(/\s+/g, space);
    });
    return newNameArray[newNameArray.length - 1];
}
