var onRun = function(context) {

  var sketch = require('sketch')

  var	document = sketch.getSelectedDocument();

  context.document.actionsController().actionForID("MSRemoveAllOverridesAction").performAction(nil);

  ui.message("🌈: Yay! You have reset all overrides for the selected elements! 👏 🚀");


};
