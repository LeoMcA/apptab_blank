const widgets = require("widget");
const tabs = require("tabs");
const storage = require("simple-storage");
const parseUri = require("parseUri");

exports.main = function () {

	function toggleActivation() {
		blankIsOn = !blankIsOn;
		return blankIsOn;
	}

	function updateWidgetState(tab) {
		let view = widget.getView(tab.window);
		if (!view) return;
		view.content = tabs.activeTab.isPinned == true ? "Pinned" : "Unpinned";
		if (tabs.activeTab.isPinned == true) {
			storage.storage.blanks.forEach( function (element) {
				if (element == parseUri.parseUri(tabs.activeTab.url).host) {
					view.content = storage.storage.blanks;
				}
			});
		};
	}

	function removeFromStorage () {
		var index = storage.storage.blanks.indexOf(parseUri.parseUri(tabs.activeTab.url).host);
		if(index!=-1) storage.storage.blanks.splice(index, 1);
	}

	var widget = widgets.Widget({
		id: "apptab_blank",
		label: "Click here to toggle apptab_blank for this tab",
		content: " ",
		contentScriptWhen: "ready",
		contentScript: "self.on('click', self.port.emit('clicked'));",
		width: 1000
	});

	var blankIsOn = false;

	if (!storage.storage.blanks) storage.storage.blanks = [];

	tabs.on('ready', updateWidgetState);
	tabs.on('activate', updateWidgetState);

	widget.on("click", function () {
		if (tabs.activeTab.isPinned == true) {
			let view = widget.getView(tabs.activeTab.window);
			if (toggleActivation() == true) {
				view.content = "Clicked";
				storage.storage.blanks.push(parseUri.parseUri(tabs.activeTab.url).host);
			}
			else {
				view.content = "Deleted";
				removeFromStorage();
			}
			//view.content = toggleActivation() ? "Deleted" : "Clicked";
			//toggleActivation() ? removeFromStorage() : storage.storage.blanks.push(parseUri.parseUri(tabs.activeTab.url).host);
		};
	});
}
