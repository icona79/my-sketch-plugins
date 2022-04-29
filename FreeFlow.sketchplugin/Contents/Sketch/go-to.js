var onRun = function(context) {
var sketch = require('sketch');
var ui = require('sketch/ui');
var Settings = require('sketch/settings');

var document = sketch.getSelectedDocument();

var selectedLayer = document.selectedLayers.layers[0];



// openUrl("https://FreeAndWilling.com/fbmore/freeview");
if (selectedLayer.text.includes("http") || selectedLayer != undefined){
	openUrl(selectedLayer.text);

	function openUrl(url) {
		NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
	}

	ui.message("🌈: Opening URL from text layer!!! 👏 🚀");

} else {
	ui.message("🌈: Please select a text layer with a valid URL and try again. 🙏")
}


};
