var onRun = function(context) {
var sketch = require('sketch');
var ui = require('sketch/ui');
var Settings = require('sketch/settings');

var document = sketch.getSelectedDocument();

//var selectedLayer = document.selectedLayers.layers[0];

var chatService = "https://meet.jit.si/"

// openUrl("https://FreeAndWilling.com/fbmore/freeview");
//if (selectedLayer.text.includes("http") || selectedLayer != undefined){
	openUrl(chatService+document.id);

	function openUrl(url) {
		NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
	}

	ui.message("🌈: Starting chat!!! 👏 🚀");


};
