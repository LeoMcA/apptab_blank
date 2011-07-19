const w = require("widget");
const p = require("panel");
const t = require("tabs");
const d = require("self").data;
const pu = require("parseUri");

exports.main = function() {
	
	var panel = p.Panel({
		contentURL: d.url("panel.html"),
		contentScriptFile: d.url("panel.js"),
	});
	
	var widget = w.Widget({
		id: "apptab_blank",
		label: "Click to disable for certain websites",
		panel: panel,
		contentURL: "http://www.mozilla.org/favicon.ico",
	});
	
	function countAppTabs() {
		let tabProperties = [];
		let count = 0;
		for each (tab in t) {
			if (tab.isPinned == true) {
				tabProperties[eval(count)] = [];
				tabProperties[eval(count)][0] = tab.favicon;
				tabProperties[eval(count)][1] = pu.parseUri(tab.url).host;
				tabProperties[eval(count)][2] = " ";
				count++;
			}
		}
		panel.port.emit("tabProperties", tabProperties);
	}
	
	widget.on('click', countAppTabs);
}
