var onRun = function(context) {

  var sketch = require('sketch')
  var ui = require('sketch/ui')

  document = sketch.getSelectedDocument();

  var documentStyles = document.sharedLayerStyles;

  console.log(documentStyles);

  ui.message("🌈: Yay! You have removed " + documentStyles.length + " layer styles from your document! 👏 🚀");

  document.sharedLayerStyles = []

};
