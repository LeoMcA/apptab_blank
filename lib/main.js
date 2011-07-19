const w = require("widget");
const p = require("panel");
const t = require("tabs");
const d = require("self").data;

exports.main = function() {
	
	var panel = p.Panel({
		contentURL: d.url("panel.js")
	});
	
	var widget = w.Widget({
		id: "apptab_blank",
		label: "Click to disable for certain websites",
		panel: panel,
		contentURL: "http://www.mozilla.org/favicon.ico"
	});

}
