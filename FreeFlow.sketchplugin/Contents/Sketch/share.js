var onRun = function(context) {
var sketch = require('sketch');
var ui = require('sketch/ui');
var Settings = require('sketch/settings');

openUrl("https://FreeAndWilling.com/fbmore/Tweet-FreeFlow");

function openUrl(url) {
	NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
}

ui.message("🌈: Thank you!!! 👏 🚀");

};
