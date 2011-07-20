self.port.on("tabProperties", function(tabProperties) {
	console.log("conting app tabs (from within panel.js)");
	var body = document.getElementsByTagName("body")[0];
	var table = document.getElementsByTagName("table")[0];
	var tbody = document.getElementsByTagName("tbody")[0];
	var oldTr = document.getElementsByTagName("tr");
	for (var x = 1; x < oldTr.length; x++) {
		while(oldTr[x].firstChild) {
			oldTr[x].removeChild(oldTr[x].firstChild);
		}
		tbody.removeChild(oldTr[x]);
	}
	for (var j = 0; j < tabProperties.length; j++) {
		var tr = document.createElement("tr");
		for (var i = 0; i < 3; i++) {
			var td = document.createElement("td");
			if (i==0) {
				var icon = document.createElement("img");
				icon.setAttribute("src", tabProperties[j][0]);
				td.appendChild(icon);
			}
			if (i==1) {
				var text = document.createTextNode(tabProperties[j][1]);
				td.appendChild(text);
			}
			if (i==2) {
				var input = document.createElement("input");
				input.setAttribute("type", "checkbox");
				input.setAttribute("name", tabProperties[j][1]);
				input.setAttribute("class", "input");
				input.setAttribute("checked", "checked");
				td.appendChild(input);
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
});
document.getElementsByClassName("submit")[0].onClick = function () {
	console.log("from panel.js (on hide)");
	var checked = [];
	var enabled = [];
	checked = document.getElementsByClassName("input").checked;
	checked.forEach(function(element) {
		disabled.push(element.getAttribute("name"));
	});
	self.port.emit("enabled", enabled);
};
