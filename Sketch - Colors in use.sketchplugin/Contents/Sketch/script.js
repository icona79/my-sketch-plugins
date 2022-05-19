var onRun = function(context) {
    const sketch = require("sketch");
    const { message } = require("sketch/ui");
    var colors = [];
    var shapes;

    // Shapes check
    shapes = sketch.find("ShapePath");
    for (i = 0; i < shapes.length; i++) {
        let fills = shapes[i].style.fills;
        // console.log(fills);
        for (j = 0; j < fills.length; j++) {
            let color = fills[j].color;
            color = color.substring(0, color.length - 2);
            if (colors.length > 0) {
                if (colors.indexOf(color) !== -1) {} else {
                    colors.push(color);
                }
            } else {
                colors.push(color);
            }
        }
    }

    // Texts check
    var shapes = sketch.find("Text");

    for (i = 0; i < shapes.length; i++) {
        let fills = shapes[i].style.fills;
        for (j = 0; j < fills.length; j++) {
            let color = fills[j].color;
            color = color.substring(0, color.length - 2);

            if (colors.length > 0) {
                if (colors.indexOf(color) !== -1) {} else {
                    colors.push(color);
                }
            } else {
                colors.push(color);
            }
        }
        let textColor = shapes[i].style.textColor;
        textColor = textColor.substring(0, textColor.length - 2);
        if (textColor !== "") {
            if (colors.length > 0) {
                if (colors.indexOf(textColor) !== -1) {} else {
                    colors.push(textColor);
                }
            } else {
                colors.push(textColor);
            }
        }
    }

    if (colors.length > 0) {
        let json = JSON.stringify(colors, null, 1);

        let pasteboard = NSPasteboard.generalPasteboard();
        pasteboard.clearContents();
        pasteboard.setString_forType(json, NSPasteboardTypeString);

        message("📋 Data copied to clipboard.");
    } else {
        message("☝️ No colors found.");
    }
};