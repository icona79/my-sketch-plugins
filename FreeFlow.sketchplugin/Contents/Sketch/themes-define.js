var onRun = function(context) {

  var sketch = require('sketch')
  var image = sketch.Image
  var ShapePath = sketch.ShapePath
  var Style = sketch.Style
  var Rectangle = sketch.Rectangle
  var Library = require('sketch/dom').Library;
  var Document = require('sketch/dom').Document;
  var	document = sketch.getSelectedDocument();

  var ui = require('sketch/ui')


  var Settings = require('sketch/settings')


  console.log(Settings.documentSettingForKey(document, 'defaultThemes'));


  var defaultThemes = "Dark,Light,High-Contrast"

  defaultThemes = Settings.documentSettingForKey(document, 'defaultThemes') || defaultThemes

  var themesArray = defaultThemes

  var instructionalTextForInput = "Define the Themes";
  var description = "Examples:\n\n– Enter \'Dark,Light,High-Contrast\' to be able to swap components between these 3 themes.";
  var initialValue = defaultThemes


  ui.getInputFromUser(
    instructionalTextForInput,
    {
      initialValue: initialValue,
      description: description,
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        ui.message("🌈: Ooops! Try again later! 😀");

        return
      } else {
        result = value;
        Settings.setDocumentSettingForKey(document, 'defaultThemes', result);


        ui.message("🌈: Yay! Defined " + result.split(",").length + " Themes: " + result + " 👏 🚀");


      }
    }
  )

  console.log(Settings.documentSettingForKey(document, 'defaultThemes'));

};
