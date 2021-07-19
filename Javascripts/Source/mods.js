// Mods for the game

// List of mods in the game
// In index.html it is the list of all possible mods
// In gameplay it is only the mod that is active
var oModsDetails = { };

// General person object for the mod, optional can be undefined
var perMod = undefined;

// Add the current mod
function addDetails(name, description, version) {
	oModsDetails[name] = { "name": name, "description": description, "version": version };
}

// Cheat menu, change mod for a current game
function toggleModNew()
{
	var modlist = Object.getOwnPropertyNames(oModsDetails);
	var ic = 0;
	if (gameState.sMod !== '') {
		for (var i = 0, ie = modlist.length; i < ie; i++) {
			var itm = oModsDetails[modlist[i]];
			if (itm.name.split(" ").join("") == gameState.sMod) {
				ic = i + 1;
				break;
			}
		}
	}
	if (ic >= modlist.length) return 'Base Game';
	else return oModsDetails[modlist[ic]].name.split(" ").join("");
}
function toggleMod() {
	gameState.sMod = toggleModNew();
	if (gameState.sMod == "Base Game") gameState.sMod = '';
	var s = getSaveString("MODCHANGE");
	var d = LZString.decompressFromEncodedURIComponent(s);
	DoRestartAndLoad('', d);
}

// General function to setup the current mod in the game
function setupMods(mod) {
	perMod = undefined;
	// Loop over all mods functions and call their initialisation function
	for (var m in window) {
		try {
			if (typeof window[m] == "function" && window.hasOwnProperty(m)) {
				if (window[m].name.indexOf("initialiseMod") != -1) perMod = window[m](mod);
			}
		} catch(e) {
			// do nothing
		}
	}
}
