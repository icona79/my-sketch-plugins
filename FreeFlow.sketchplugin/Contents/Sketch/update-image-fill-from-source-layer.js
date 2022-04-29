var onRun = function(context) {

  var sketch = require('sketch')
  var ui = require('sketch/ui')
  var Settings = require('sketch/settings')
  var Image = require('sketch/dom').Image

  var image = sketch.Image
  var ShapePath = sketch.ShapePath
  var Style = sketch.Style
  var Rectangle = sketch.Rectangle
  var {isNativeObject} = require('util')



  console.log("----- MULTIPLE FILLS BEING UPDATED BASED ON THEIR SOURCES")


  var	document = sketch.getSelectedDocument();

  var data = document.sketchObject.documentData();
  var page = document.selectedPage;
  var selection = document.selectedLayers;
  var doc = context.document;


  if (selection.length == 0) {
    ui.message("🌈: Please select a few layers to update! 😬");
    ///selection =

    var allLayersToUpdate = []

    document.pages.forEach(page => {
    const nativeLayers = page.sketchObject.children();
    nativeLayers.forEach(nativelayer => {
        const layer = sketch.fromNative(nativelayer);
        if (layer.type ==  'ShapePath' && Settings.layerSettingForKey(layer, 'sourceElementID')) {
            layer.selected = true;
            // selection.push(nativelayer)
        }
    });
  });

  selection = document.selectedLayers;
  // selection = allLayersToUpdate;


  }


  for (j = 0; j < selection.length; ++j) {


    var selectedLayer = selection.layers[j]

    console.log(selectedLayer.id)

    console.log(Settings.layerSettingForKey(selectedLayer, 'sourceElementID'))

    var storedID = Settings.layerSettingForKey(selectedLayer, 'sourceElementID')

    console.log(storedID)

    var sourceObject = selectedLayer //document.getLayerWithID(sourceElementsIDs[id])
    var selectedObject = document.getLayerWithID(storedID);

    console.log(selectedObject.name)
    console.log(selectedObject.id)


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
      frame: new Rectangle(selectedLayer.frame.x,selectedLayer.frame.y,selectedObject.frame.width,selectedObject.frame.height),
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
      parent: selectedLayer.parent
    })


    selectedLayer.style = rectangle.style;
    selectedLayer.frame = rectangle.frame;
    selectedLayer.parent.adjustToFit();

    rectangle.remove();
  }

  ui.message("🌈: Done updating " + selection.length + " layers with flattened versions of the source Artboard or Groups! 👏 🚀");

  document.selectedLayers = [];

};
