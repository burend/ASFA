// Mods for the game

// List of mods in the game
// In index.html it is the list of all possible mods
// In gameplay it is only the mod that is active
var oModsDetails = { };

// Add the current mod
function addDetails(name, description, version) {
	oModsDetails[name] = { "name": name, "description": description, "version": version };
}

function setupMods() {
	// Loop over all mods functions and call their initialisation function
	for (var m in window) {
		try {
			if (typeof window[m] == "function" && window.hasOwnProperty(m)) {
				if (window[m].name.indexOf("initialiseMod") != -1) window[m]();
			}
		} catch(e) {
			// do nothing
		}
	}
}
