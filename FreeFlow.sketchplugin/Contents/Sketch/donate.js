var onRun = function(context) {
var sketch = require('sketch');
var ui = require('sketch/ui');
var Settings = require('sketch/settings');

//openUrl("https://www.paypal.me/fbmore/5");
openUrl("https://FreeAndWilling.com/fbmore/FreeFlow-Sketch-Donate");

function openUrl(url) {
	NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
}

ui.message("🌈: Thank you!!! 👏 🚀");

};
