const widgets = require("widget");
const tabs = require("tabs");

var widget = widgets.Widget({
	id: "apptab_blank",
	label: "Mozilla website",
	content: " ",
	width: 50
});

function updateWidgetState(tab) {
	let view = widget.getView(tab.window);
	if (!view) return;
	view.content = tabs.activeTab.isPinned == true ? "Pinned" : "Unpinned";
}

tabs.on('ready', updateWidgetState);
tabs.on('activate', updateWidgetState);
