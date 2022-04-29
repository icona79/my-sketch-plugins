var onRun = function(context) {

var sketch = require('sketch')
var ui = require('sketch/ui')
var Settings = require('sketch/settings');
var	document = sketch.getSelectedDocument();


var image = sketch.Image
var ShapePath = sketch.ShapePath
var Style = sketch.Style
var Rectangle = sketch.Rectangle
var {isNativeObject} = require('util')

///

var savedSelectionGlobal = Settings.globalSettingForKey('savedSelectionGlobal');
var savedSelectionParentArtboardGlobal = Settings.globalSettingForKey('savedSelectionParentArtboardGlobal');

var count = 0;
console.log("OBJ id: " + savedSelectionGlobal);
console.log("Artboard id: " + savedSelectionParentArtboardGlobal);

var parent = document.selectedLayers.layers[0];

var selectedObjects = document.selectedLayers.layers[0];

///////
var sourceElementsIDs = Settings.globalSettingForKey('savedFullSelectionIDsGlobal');
console.log(sourceElementsIDs);


//////////
var selectedObject = document.getLayerWithID(sourceElementsIDs[0])

sketch.export(selectedObject)

//const options = { scales: '1, 2, 3', formats: 'png, jpg' }

console.log(selectedObject.name)

const options = { scales: '2', formats: 'png', output: false }
var buffer = sketch.export(selectedObject, options)
// var buffer = sketch.export(, options)

var image = buffer

console.log(Buffer.isBuffer(buffer));


ui.message("🌈: Yay! Inserted flattend version of the selected Artboard or Group! 👏 🚀");


let nsImage
    if (isNativeObject(image)) {
      if (image.isKindOfClass(NSImage)) {
        nsImage = image
      } else if (image.isKindOfClass(NSData)) {
        nsImage = NSImage.alloc().initWithData(image)
      } else if (image.isKindOfClass(NSURL)) {
        nsImage = NSImage.alloc().initWithContentsOfURL(image)
      } else if (image.isKindOfClass(MSImageData)) {
        return ImageData.fromNative(image)
      } else {
        throw new Error(
          `Cannot create an image from a ${String(image.class())}`
        )
      }
    } else if (typeof image === 'string' || (image && image.path)) {
      nsImage = NSImage.alloc().initByReferencingFile(image.path || image)
    } else if (image && image.base64) {
      try {
        const data = NSData.alloc().initWithBase64EncodedString_options(
          image.base64,
          NSDataBase64DecodingIgnoreUnknownCharacters
        )
        nsImage = NSImage.alloc().initWithData(data)
      } catch (err) {
        throw new Error(err)
      }
    } else if (Buffer.isBuffer(image)) {
      nsImage = NSImage.alloc().initWithData(image.toNSData())
    } else {
      throw new Error('`image` needs to be a Buffer')
    }




    let rectangle = new ShapePath({
      name: selectedObject.name + "-flattened",
      frame: new Rectangle(0,0,selectedObject.frame.width,selectedObject.frame.height),
      style: {
        fills: [{
          fill: 'Pattern',
          pattern: {
            // patternType: Style.PatternFillType.Tile,
            //patternType: Style.PatternFillType.Fit,
            patternType: Style.PatternFillType.Fill,
            image: nsImage,
          }
        }]
      },
      parent: parent
    })

    Settings.setLayerSettingForKey(rectangle, 'sourceElementID', sourceElementsIDs[0])

    console.log(Settings.layerSettingForKey(rectangle, 'sourceElementID'));


};
