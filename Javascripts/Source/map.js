// Map display functions

function checkVis(svg, id, label) {
	var place = svg.getElementById(id);
	var vis = "hidden";
	if (isPlaceKnown(label)) vis = "visible";
	//alert('checkVis: ' + id + ' ' + label + ' set ' + vis);
	place.setAttribute("visibility", vis);
}

function filterByValue(svg, keyvalue_pairs, list) {
	var generateExpression = function(key, value) {
		var parseValue = function(value) {
			var result = "";
			switch(value[0]) {
				case '!': case '<': case '>': case '=':
					result += value[0] + '=';
					value = value.substr(1);
					break;
				default:
					result += '==';
					break;
			}
			result += '"' + value + '"';
			return result;
		};
		var test = "";
		switch(typeof value) {
			case "object":
				test += '(';
				for (var i in value) {
					var val = value[i];
					if (Number(i))	test += "||";
					test += 'o["' + key + '"]' + parseValue(val);
				}
				test += ')';
				break;
			case "string":
				test += 'o["' + key + '"]' + parseValue(value);
				break;
		}

		return test;
	};
	var result = [];
	var keys = Object.getOwnPropertyNames(keyvalue_pairs);

	// generate code string for all objects in list
	var test = "";
	for (var k in keys) {
		var key = keys[k];
		if (Number(k))	test += "&&";
		test += '(o.hasAttribute("' + key + '")';
		var value = keyvalue_pairs[key];
		switch(typeof value) {
			case "object": case "string":
				test += "&&" + generateExpression(key, value) + ')';
				break;
			case "null":
				test += ")";
				break;
		}
	}
	for (var i in list) {
		var o = list[i];
		//var j = keys.length - 1;
		if (typeof o != "object") continue;
		if (eval(test)) result.push(o);
	}
	return result;
}

function getLayers(svg) {
	var groups = svg.getElementsByTagName("g");
	return filterByValue(svg, {"onload": "!"}, groups);
}

function checkMap()
{
	var mapd = document.getElementById("map");
	var map = null;
	try {
		if (isChrome()) map = mapd === null ? null : mapd;
		else map = mapd === null ? null : mapd.contentDocument;
		if (!map) map = mapd;
	}
	catch(err) { map = mapd === null ? null : mapd; }
	if (map === null) return;
	mapd.style.visibility = 'hidden';
	var list = getLayers(map);
	for (var i in list)
	{
		var o = list[i];
		if (typeof o != "object") continue;
		if (/\d/.test(o.id)) continue;

		if (o.hasAttribute("inkscape:label")) checkVis(map, o.id, o.getAttribute("inkscape:label"));
	}
	mapd.style.visibility = 'visible';
}

var oPlaceMap = {
	"2"  : { ar: [3,6,8,12,13,28,29] },
	"9"  : { ar: [10,11,27,69,70,74,75,76,144,145,159,160,180,234,242,252] },
	"16" : { ar: [14,15,17,18,19,20,21,65,66,67,155,191,192,199,200,201,202,290,296] },
	"26" : { ar: [25,34,86,246,247,248] },
	"42" : { ar: [53] },
	"45" : { ar: [41,46,122,149,156,170,236,287,355,356,357,358,374,408,410,411] },
	"63" : { ar: [87] },
	"94" : { ar: [95,96,97,98,99,100,110,158] },
	"112": { ar: [113] },
	"123": { ar: [124,133,134,135,136,137,138,161,162,171,173,174,181,182,184,185,193,258,267,269,339,340,341,342,343,375] },
	"167": { ar: [168,169,175,260,261] },
	"176": { ar: [80,81,82,83] },
	"177": { ar: [35,39,40,108,139] },
	"194": { ar: [195,196,197,198,203,224,225,227,237,280,281,282,283,284,344,345] },
	"215": { ar: [213,214,275,278,441,442,443,444] },
	"230": { ar: [231] },
	"238": { ar: [239,240,241,249,276,277,278,304] },
	"302": { ar: [303] },
	"317": { ar: [318,319,320,321,322,326,332,382,383,384,406] },
	"344": { ar: [345,346,347,348] },
	"359": { ar: [371,372,412,413,414,415,416,417] },
	"360": { ar: [361,369,370,394] },
	"435": { ar: [434] },
	"456": { ar: [457,458,459,460,461,462,463,464,465,466] },
	"478": { ar: [471,472,473] }
};

function isAtLocation(plc)
{
	if (Place == plc) return true;
	var plclist = Object.getOwnPropertyNames(oPlaceMap);
	plc = oPlaceMap[plc + ""];
	if (plc.ar === undefined) return false;
	return plc.ar.indexOf(Place) != -1;
}

function getLocationOnMap(map)
{
	var plc;
	var plclist = Object.getOwnPropertyNames(oPlaceMap);
	for (var i = 0, ie = plclist.length; i < ie; i++) {
		plc = oPlaceMap[plclist[i]];
		if (plc.ar === undefined) continue;
		if (plc.ar.indexOf(Place) != -1) return parseInt(plclist[i], 10);
	}

	// check existing places/buildings
	if (map !== undefined) {
		for (var obj in map) {
			if (!map.hasOwnProperty(obj)) continue;
			if (map[obj].id == Place) return Place;
			if (!map[obj].show()) continue;
			var plcid = 0;
			map[obj].buildings.forEach(function(b) {
				if (b.id == Place) plcid = Place;
			});
			if (plcid !== 0) return Place;
		}


		// Fallback
		if (gameState.nLastOut !== 0) return gameState.nLastOut;
	}
	return Place;
}

function addPlace(id, name, color, d, text_x, text_pos, classes, hide, construction, pos)
{
	this.id			= id;	// place id
	this.name		= name;	// road name
	this.color		= color;	// road, text and building outline color
	this.d			= d;		// path coordinates
	this.text_x		= text_x;   // text starting point on path
	this.text_pos	= text_pos; // text 'up':over path, 'down' under path, number: position depending on number
	this.classes	= classes;  // additional classes - like "dash"
	this.show		= function() { return isPlaceKnown(this.id) || isPlaceKnown(this.name.replace(/_/g,'')); }; // checks if the place should be printed
	this.hide		= hide;  // hide if not visited or show grayed out?
	this.construction = construction; // position of construction sign; none if false;
	this.pos			= pos;	// Location for 'Here You are' image
	this.buildings	= [];   // buildings

	this.addBuilding = function(id, name, img, size, pos, romb)
	{
		// function to add buildings
		var building = {};
		building.id		= id;	// id number
		building.name	= name;	// name of the place
		building.img	= img;	// image url
		building.size	= size;	// image size (x,y)
		building.pos	= pos;	// x,y position of top left corner of the img
		building.romb	= romb;	// position of romb on the road
		building.show	= function() {
			// checks if the building should be printed
			var bOk = true;
			if (gameState.plcTitle == "Teleport") {
				// Special cases
				if (isPlaceAttuned(53) && this.id == 42) return true;
				else if (isPlaceAttuned(319) && this.id == 317) return true;
				bOk = isPlaceAttuned(this.id) || this.id == 45;		// Attuned or is your home!
				if (perYou.checkFlag(21)) {
					if (this.id == 42 || this.id == 26 || this.id == 123 || this.id == 176 || this.id == 177 || this.id == 230 || this.id == 9) bOk = true;
				}
			} else bOk = isPlaceKnown(this.name.replace(/_/g,''));
			return bOk;
		};
		this.buildings.push(building); // add building to the place
	};
}

function addHereHex(id, plc, x, y, clk)
{
	var svg = (plc == id ? '<image id="here" x="' + x + '" y="' + y + '" height="60" width="60" xlink:href="UI/map/here.png"/>' : '');
	if (isPlaceAttuned(id)) return svg + '<image x="' + (x + 18) + '" y="' + (y + 18) + '" height="24" width="24" xlink:href="UI/themes/theme0/symbol1.png"' + (plc != id && clk !== '' && gameState.plcTitle == "Teleport" ? ' cursor="pointer" onclick="' + clk + '"': '') + '/>';
	return svg;
}

function renderPlace(p, plc, clkfn)
{
	// p:place
	// returns svg for the road p
	// if the road is not yet visible then depending on p.hide it's printed grayed out (hide:false) or not at all (hide:true)
	// if the road is visible then it's printed in color defined for the road and with name
	// visibility is checked with p.show() which fires isPlaceKnown() for p.id nad p.name
	var text_pos;
	switch (p.text_pos) {
		case 'up': text_pos = -3; break;
		case 'down': text_pos = 8; break;
		default: text_pos = p.text_pos; break;
	}
	var classes = p.classes ? 'class="' + p.classes + '"' : "";
	var color = p.show() ? p.color : "#b3b3b3";

	if (!p.show() && p.hide) return "";

	var clk = '';
	if (clkfn !== undefined) clk = clkfn(p.id);

	var svg = '<path id="' + p.name + '" ' + classes + ' style="stroke:' + color + ';" d="' + p.d + '"/>';
	if (p.show()) svg += '<text xml:space="preserve" dx="' + p.text_x + '" dy="' + text_pos + '" fill="' + p.color + '" ><textPath xlink:href="#' + p.name + '">' + p.name.split('').join(' ').replace(/_/g,' ') + '</textPath></text>';
	if (p.pos !== undefined) svg += addHereHex(p.id, plc, p.pos.x, p.pos.y, clk);
	
	if (p.show() && p.construction) {
		var romb = addRomb(p,p.construction, true);
		var romb2 = addRomb(p,p.construction + 70, true);
		return svg + '<rect x="' + (romb.p.x - 1) + '" y="' + (romb.p.y - 1) + '" width="' + (romb2.p.x - romb.p.x + 2.5) + '" height="' + (romb2.p.y - romb.p.y + 2.5) + '" fill="url(#construction)" />' + romb.print + romb2.print + '<text xml:space="preserve" dx="' + (p.construction + 10) + '" dy="-3" fill="url(#construction)" ><textPath xlink:href="#' + p.name + '">Construction</textPath></text>';
	}
	return svg;
}

function renderBuilding(p, b, plc, clkfn)
{
	// p:place; b:building;
	// returns svg for building b with romb on road p - connected with line to the center of the image of building
	if (!b.show()) return "";
	var bOk = gameState.plcTitle == "Teleport";

	var svg = "";

	if (b.romb >= 0) {
		var romb = addRomb(p, b.romb, false);
		var pos2 = { x: (b.pos.x + (b.size.x / 2)), y: (b.pos.y + (b.size.y / 2)) };
		svg = '<line x1="' + romb.p.x + '" y1="' + romb.p.y + '" x2="' + pos2.x + '" y2="' + pos2.y + '" style="stroke:' + p.color + '; stroke-width:2;" />' + romb.print;
	}
	// Add Onclick?
	var clk = '';
	if (clkfn !== undefined) clk = clkfn(b.id);
	//svg+= '<rect  x="'+b.pos.x+'" y="'+b.pos.y+'" height="'+b.size.y+'" width="'+b.size.x+'" style="stroke:none; fill:#ffffff; " />'; // white background behind images in case the dimensions aren't right;
	return svg +
		'<image x="' + b.pos.x + '" y="' + b.pos.y + '" height="' + b.size.y + '" width="' + b.size.x + '" xlink:href="' + b.img + (plc != b.id && clk !== '' ? '" cursor="pointer" onclick="' + clk : '') + '"> <title role="tooltip">' + b.name.replace(/_/g,' ') + '</title></image>' +
		'<rect  x="' + b.pos.x + '" y="' + b.pos.y + '" height="' + b.size.y + '" width="' + b.size.x + '" style="stroke:' + p.color + '; stroke-width:2; fill:none; " />' +
		(plc == b.id ? '<image id="here" x="' + (b.pos.x - 23) + '" y="' + (b.pos.y + b.size.y - 60) + '" height="60" width="60" xlink:href="UI/map/here.png"/>' : '') +
		(bOk ? '<image x="' + b.pos.x + '" y="' + b.pos.y + '" height="18" width="18" xlink:href="UI/themes/theme0/symbol1.png"/>' : '');
}

function addRomb(p, x, construction)
{
	// adds romb on road
	// if construction is set to false it's the same color as road with white fill
	// if construction is set to true it's red romb with exclamation
	// p - place; x - position on road; construction - true if construction romb
	// returns svg for printing (.print) and position of the center of the romb (.p.x, .p.y)
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttributeNS(null, "d", p.d);
	var point = path.getPointAtLength(x);
	var rombsize = 3;
	var color = construction ? "#860000" : p.color;
	var fill  = construction ? "#ff0000" : "#ffffff";

	var svg = '<g transform="translate(' + (point.x - rombsize) + ',' + (point.y - rombsize) + ')">' +
		'<path style="fill:' + fill + '; stroke:' + color + ';stroke-width:1;" d="m' + rombsize + ',0 L' + (2 * rombsize) + ',' + rombsize + ' L' + rombsize + ',' + (2 * rombsize) + ' L0,' + rombsize + ' Z"/>' +
		(construction ? '<path style="fill:#ffffff;stroke:none;" d="M2.8,3.1L2.7,2.1c0-0.2,0-0.3,0-0.4c0-0.1,0-0.2,0.1-0.3S2.9,1.4,3,1.4c0.1,0,0.2,0,0.2,0.1s0.1,0.2,0.1,0.3 		c0,0.1,0,0.2,0,0.3l-0.1,1c0,0.1,0,0.2-0.1,0.3S3.1,3.4,3,3.4c-0.1,0-0.1,0-0.1-0.1S2.8,3.2,2.8,3.1z M3,4.4c-0.1,0-0.1,0-0.2-0.1 	S2.7,4.2,2.7,4.1c0-0.1,0-0.1,0.1-0.2S2.9,3.8,3,3.8s0.2,0,0.2,0.1S3.3,4,3.3,4.1c0,0.1,0,0.2-0.1,0.2S3.1,4.4,3,4.4z"/>' : '') +
		'</g>';
	return { print:svg, p:point };
}

function renderMap(clkfn)
{
	var map = {};

	// streets definitions
	map['Amaranth_Place']	= new addPlace(38,	'Amaranth_Place',		'#ff0066', "M569.1,542.8v-29.4c0-5.1,2.5-9,9-9l173-0.1", 15, 'up', false, false, false, {x:600, y:450});
	map['Cherise_Road']		= new addPlace(37,	'Cherise_Road',		'#0066ff', "M305.8,576.9h48.8c4.3,0,8-4,8-8V445.7 c0-4.5-3.1-8.3-8.3-8.3h-83.1", 85, 'up', false,false, false, {x:335, y:400});
	map['Tunnel']				= new addPlace(178,	'Tunnel',				'#000080', "M271.1,187.1l-0.3-96.7", 45, 'up', "dash", true, false);
	map['Catacomb_Tunnel']	= new addPlace(323,	'Catacomb_Tunnel',	'#202090', "M516.3,482.4h180.9c7.7,0,10.2-2.6,10.2-10.2l0-61.9", 115, "down", "dash", true, false);
	map['Park_Bridge']		= new addPlace(216,	'Park_Bridge',			'#9a00c0', "M271.1,227.8h81", 5, 'down', false, false, false);
	map['Park']					= new addPlace(47,	'Park',					'#cd00ff', "M271.1,318.4V187.1", 45, 'up', false, false, false);
	map['Kollam_Street']		= new addPlace(44,	'Kollam_Street',		'#ff0000', "M271.1,318.4v180.6", 55, 'down', false, false, false, {x:241, y:330});
	map['Scholastic_Road']	= new addPlace(2,		'Scholastic_Road',	'#01fa01', "M271.1,318.4h187.5", 45, 'down', false, false, false);
	map['Rathdown_Road']		= new addPlace(229,	'Rathdown_Road',		'#aa0088', "M458.5,543.8h110.6", 5, 'up', false, false, false, {x:500, y:490});
	map['Dervish_Road']		= new addPlace(5,		'Dervish_Road',		'#00aa88', "M178.4,499.6l-0.1,77.1c0,16.4,7.6,18.6,18.3,18.6 h90.3c12.1,0,18.9-4.2,18.9-18.3", 115, 'up', false, false, false, {x:168, y:540});
	map['Alleyway']			= new addPlace(42,	'Alleyway',				'#000080', "M154.3,369.4l116.8-0.1", 5, 'up', false, true, false);
	map['Church_Lane']		= new addPlace(317,	'Church_Lane',			'#00ccff', "M751.1,356.1v148.3", 5, 'up', false, false, 80);
	map['Broken_Oar_Street']= new addPlace(123,	'Broken_Oar_Street',	'#ff00cc', "M458.6,318.4v224.8", 5, 'up', false, false, false);
	map['Main_Street']		= new addPlace(94,	'Main_Street',			'#ff6600', "M458.6,318.1l86.4,0c48.4,0,59.3,38.3,99.7,38.2 l106.3-0.3", 120, 'up', false, false, 230);
	map['Shopping_Center']	= new addPlace(194,	'Shopping_Center',	'#00ffcc', "M178.4,498.9l118.2,0.3c6.5,0,9.2,2.8,9.2,10v67.8", 5, 'down', false, false, false);
	map['Yoolaroo_Drive']	= new addPlace(43,	'Yoolaroo_Drive',		'#800000', "M178.4,498.9l-0.1-38.6c0-19.1-34.4-22.9-34.4-59.1 l0.4-22.4c0,0.9-9.3-4.9-9.3-9.3c0-4.4,4.9-9.3,9.3-9.3c3.9,0,9.4,5.3,9.6,9.3c0.2,4.4-9.6,9.3-9.6,9.3", 25, 'down', false, false, false, {x:120, y:350});
	map['Oakpine_Road']		= new addPlace(1001,	'Oakpine_Road',		'#0b830b', "M458.5,318.3v-79.9c0-54.5,86.1-47.5,86.1-81.1V90.5", 100, 'up', false, false, false);
	map['Parkview_Road']		= new addPlace(1002,	'Parkview_Road',		'#000000', "M224.2,90.5h320.4", 60, 'down', false, false, 250);
	map['Radio_Drive']		= new addPlace(1003,	'Radio_Drive',			'#aa4300', "M545,318.4v82.8c0,19.9,17.4,13.5,17.4,39.5", 5, 'up', false, false, false);
	map['Celeste_Road']		= new addPlace(455,	'Celeste_Road',		'#4b834b', "M544.6,109.2h236.8v91", 5, 'up', false, false, false, {x:594,y:49});

	// buildings definitions
	map['Oakpine_Road'].addBuilding(		360,	"Glenvale Aquarium",			"Images/aquarium1.jpg",	{x:90, y:60 }, {x:445, y:100}, 228);
	map['Oakpine_Road'].addBuilding(		238,	"Glenvale Museum",			"Images/museum.jpg",		{x:72, y:60 }, {x:555, y:120}, 215);

	map['Celeste_Road'].addBuilding(		456,	"Apartments",					"Images/apartments1.jpg",{x:60, y:60 }, {x:555, y:35}, 41);

	map['Kollam_Street'].addBuilding(	45,	"Home",							"Images/house4.jpg",		{x:70, y:(70/600*370) }, {x:280, y:330}, 33);
	map['Kollam_Street'].addBuilding(	112,	"Kellys' House",				"Images/house7.jpg",		{x:70, y:(70/600*382) }, {x:280, y:380}, 83);
	
	map['Alleyway'].addBuilding(			42,	"Alley",							"Images/alley1.jpg",		{x:46, y:60}, {x:190, y:369.5}, -1); //width="460" height="600"
	map['Church_Lane'].addBuilding(		317,	"Lady of Our Heavenly Father","Images/church1.jpg",{x:80, y:79}, {x:665, y:365}, 45); // width="737" height="721"
	map['Main_Street'].addBuilding(		94,	"Glenvale Town Hall",		"Images/cityhall1.jpg", {x:60, y:(60/472*576)}, {x:540, y:240}, 77);// width="472" height="576"

	map['Cherise_Road'].addBuilding(		435,	"Gym",							"Images/gymoutside1.jpg",{x:55, y:(55/785*600)}, {x:280, y:445}, 270); // width="785" height="600"
	map['Cherise_Road'].addBuilding(		440,	"Logan House",					"Images/house16.jpg",	{x:75, y:(75/6*4)}, {x:373, y:430}, 176); // width="600" height="400"	
	map['Cherise_Road'].addBuilding(		436,	"Ross' House",					"Images/house11.jpg",	{x:75, y:(75/6*4)}, {x:373, y:490}, 114); // width="600" height="400"
	map['Cherise_Road'].addBuilding(		433,	"Aunt's House",				"Images/house12.jpg",	{x:70, y:70/450*339}, {x:373, y:550}, 50); // width="600" height="400"

	map['Park'].addBuilding(				47,	"Glenvale Park",				"Images/park1.jpg",		{x:45, y:60}, {x:280, y:250}, 38); // width="450" height="600"
	map['Park'].addBuilding(				63,	"Park Pathway",				"Images/park3.jpg",		{x:35, y:(35/256*375)}, {x:225, y:226}, 90.5); // width="256" height="375"
	map['Park'].addBuilding(				26,	"Wild Ranges",					"Images/stones.jpg",		{x:70, y:70}, {x:190, y:150}, 140); //width="439" height="434"
	map['Scholastic_Road'].addBuilding(	9,		"Glenvale High School",		"Images/school1.jpg",	{x:60, y:(60/491*600)}, {x:200, y:283}, 0); //width="491" height="600"
	map['Scholastic_Road'].addBuilding(	2,		"Glenvale Library",			"Images/library1.jpg",	{x:99, y:66}, {x:350, y:245}, 70); //width="660" height="440"
	map['Park_Bridge'].addBuilding(		215,	'Glenvale Hospital',			"Images/hospital1.jpg",	{x:88, y:(88/640*427)}, {x:350, y:162}, 1000);// width="640" height="427"
	map['Park_Bridge'].addBuilding(		216,	"Park Bridge",					"Images/park2.jpg",		{x:48, y:(48/665*799)}, {x:280, y:162}, 33);// width="665" height="799"
	map['Broken_Oar_Street'].addBuilding(325,	"Glenvale Graveyard",		"Images/graveyard.jpg",	{x:68, y:43}, {x:468, y:440}, 143); // width="800" height="528"
	map['Broken_Oar_Street'].addBuilding(123,	"Broken Inn Hotel",			"Images/hotel1.jpg",		{x:85, y:70}, {x:365, y:350}, 70); // width="500" height="400"

	map['Yoolaroo_Drive'].addBuilding(	177,	"Granger's House",			"Images/house3.jpg",		{x:75, y:(75/600*365)}, {x:50, y:347}, 145); // width="600" height="365"
	map['Yoolaroo_Drive'].addBuilding(	176,	"Robbins' House",				"Images/house1.jpg",		{x:75, y:(75/600*377)}, {x:60, y:400}, 85); // width="600" height="377"
	map['Yoolaroo_Drive'].addBuilding(	460,	"Tanika's House",				"Images/house15.jpg",	{x:75, y:(75/600*453)}, {x:90, y:455}, 15); // width="600" height="377"

	map['Dervish_Road'].addBuilding(		420,	"Bartel's House",				"Images/house2.jpg",		{x:75, y:(75/8*6)}, {x:95, y:525}, 53); //width="800" height="600"
	map['Dervish_Road'].addBuilding(		430,	"Kristin's House",			"Images/house8.jpg",		{x:(50/412*600), y:50}, {x:187, y:515}, 43);// width="600" height="412"

	map['Shopping_Center'].addBuilding(	194,	"Shopping Center",			"Images/shops1.jpg",		{x:(50/123*189), y:50}, {x:270, y:515}, -1); //width="189" height="123"
	map['Shopping_Center'].addBuilding(	470,	"Haven Apartments",			"Images/apartments2.jpg",{x:50, y:50 }, {x:195, y:440}, 42);
	
	map['Parkview_Road'].addBuilding(	16,	"Mansion",						"Images/mansion.jpg",	{x:93.6, y:60}, {x:280, y:22}, 55); // width="936" height="600"
	map['Parkview_Road'].addBuilding(	141,	"Sacred Clearing",			"Images/stones3.jpg",	{x:98, y:60}, {x:170, y:22}, 47); // width="491" height="301"
	map['Tunnel'].addBuilding(				178,	"Tunnel",						"Images/tunnel1.jpg",	{x:50, y:42.6}, {x:271, y:105}, -1); // width="250" height="213"

	map['Rathdown_Road'].addBuilding(	230,	"Adams' House",				"Images/house5.jpg",		{x:(55/377*600), y:55}, {x:550, y:553}, 150);// width="600" height="377"
	map['Rathdown_Road'].addBuilding(	302,	"Gina's House",				"Images/house6.jpg",		{x:(55/466*720), y:55}, {x:454, y:553}, 36);//  width="720" height="466"
	map['Rathdown_Road'].addBuilding(	228,	"Ms Titus's House",			"Images/house13.jpg",	{x:(45/466*720), y:45}, {x:478, y:488}, 55);//  width="720" height="466"

	map['Amaranth_Place'].addBuilding(	450,	"Leanne's House",				"Images/house10.jpg",	{x:(60/45*60), y:60}, {x:740, y:513}, 210);// width="600" height="450"
	map['Amaranth_Place'].addBuilding(	452,	"Gabby's House",				"Images/house9.jpg",		{x:(60/45*60), y:60}, {x:650, y:513}, 131);// width="600" height="450"

	map['Radio_Drive'].addBuilding(		167,	"Police Station",				"Images/police1station.jpg", {x:50, y:(50/215*287)}, {x:485, y:330}, 45);// width="215" height="287"
	map['Radio_Drive'].addBuilding(		359,	"TV &amp; Radio Station",	"Images/radio1.jpg",		{x:85, y:(85/277*237)}, {x:570, y:403}, 1000); //width="277" height="237"

	var cPS = 20; // constructionPatternSize

	// svg definitions
	var mapSvg =
		"<?xml version=\"1.0\" encoding=\"utf-8\"?><svg class=\"shadow\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 860 620\" xml:space=\"preserve\"><defs>" + 
		'<pattern id="construction" patternUnits="userSpaceOnUse" width="' + cPS + '" height="' + cPS + '"><rect x="0" y="0" width="' + cPS + '" height="' + cPS + '" fill="#000000" /><path style="stroke:#ffff00; stroke-width:' + (cPS / 3) + ';" d="M-4,4 l8,-8 M0,' + cPS + ' l' + cPS + ',-' + cPS + ' M' + (cPS - 4) + ',' + (cPS + 4) + ' l8,-8\" /></pattern>' +
		"<style type=\"text/css\">	path {fill: none;stroke-width:2;stroke-linecap: round;stroke-linejoin: round;} text {font-family:Tahoma, Arial;font-size:8px;font-weight:bold;letter-spacing:0px;stroke:none;} #outside {stroke:#b3b3b3;} .dash {stroke-dasharray:5,4;}</style></defs>" +
		// dashed outside roads
		'<g id="outside" class="dash">' +
			'<path d="M64.7,90.5l159.3,0"/>' +
			'<path d="M124,90.5v57.7 c0,10.3,1.4,24.5-23.4,24.4c-70.5-0.2-73.1,125.7,0,125.7h44.2V360"/>' +
			(Place >= 480 && Place <= 481 ? addHereHex(Place, Place, 30, 200, '') : '') +
			'<path d="M683.5,356.2V224.6h-37.2"/>' +
			'<path d="M683.5,246.6h107.7"/>' +
		'</g>';

	var plc = getLocationOnMap(map);

	// print roads
	for (var obj in map) {
		if (map.hasOwnProperty(obj)) mapSvg += renderPlace(map[obj], plc, clkfn);
	}

	// print visible buildings
	for (var objb in map) {
		if (!map.hasOwnProperty(objb)) continue;
		if (!map[objb].show()) continue;
		map[objb].buildings.forEach(function(b) { mapSvg += renderBuilding(map[objb], b, plc, clkfn); });
	}

	if (mapSvg.indexOf("here.png") != -1) return mapSvg + '<use xlink:href="#here"><title role="tooltip">You are here</title></use></svg>';
	return mapSvg + '</svg>';
}

function getMapHTML(wid, hei, clkfn)
{
	if (isSafari()) return '<object height="' + wid + '" width="' + hei + '" style="visibility:hidden" id="map" type="image/svg+xml" data="UI/map/map.svg"></object>';

	var parser = new DOMParser();
	var doc = parser.parseFromString(renderMap(clkfn), "image/svg+xml");
	if (doc.documentElement.outerHTML === undefined) {
	  var temp = document.createElement('div');
	  temp.style.cssText = 'height:' + wid +';width:' + hei;
	  var dnode = doc.documentElement.cloneNode(true);
	  temp.appendChild(dnode);
	  return temp.innerHTML;
	}
	return doc.documentElement.outerHTML;
}
