function setEventID(evt, id)
{
	evt.id = id++;
	if (evt.event !== undefined) return setEventID(evt.event, id);
	return id;
}
function findEventID(evt, id)
{
	if (evt.id == id) return evt;
	if (evt.event !== undefined) return findEventID(evt.event, id);
	return undefined;
}

// Pick a vision
function scanEvents(oBase, id, sTier)
{
	var bVision = sTier == "plot" || sTier == "mixed" || sTier == "light" || sTier == "hard";
	var perGlenvale = findPerson("Glenvale");
	var ar = [];
	var eventslist = Object.getOwnPropertyNames(oBase);
	
	for (var i = 0, ie = eventslist.length; i < ie; i++) {
		// Get the tier
		var tiername = eventslist[i];
		if (sTier !== '' && tiername != sTier) continue;		// Not the desired tier

		var oTier = oBase[tiername];
		// Iterate the visions in the list for the tier
		for (var j = 0, iej = oTier.length; j < iej; j++) {
			var oThis = oTier[j];
			// Initialse id field
			if (oThis.id === undefined) {
				idNew = setEventID(oThis, idNew);
				if (sTier === '') continue;
			}
			// Are we at the selected id (and one is selected!)
			if (id !== 0) {
				var oSel = findEventID(oThis, id);
				if (oSel !== undefined) return oSel;
			}
			// Allowed by flag?
			if (bVision) {
				if (perGlenvale.checkFlag(oThis.id + 64)) continue;
			}
			// Allowed by other criteria
			if (oThis.available !== undefined) {
				if (!oThis.available()) continue;
			}

			// Got a valid one!
			ar.push(oThis);
		}
	}
	
	// Pick a candidate at random
	if (ar.length > 0) return ar[Math.floor(Math.random() * ar.length)];
	return undefined;
}
	

function GeneralEvent(oEvent, oEventExplicit)
{
	var perGlenvale = findPerson("Glenvale");
	var idNew = 10;
	var ids = getQueryParam("id");
	var sChild = getQueryParam("child");
	var id = ids === '' ? 0 : parseInt(ids, 10);

	// Select the Tier
	var sTier = '';

	var bExplicit = isExplicit() && sTier !== "plot";
	var oSelected = scanVisions(bExplicit ? oVisionsExplicit : oVisions, id, sTier);
	if (idNew != 10) {
		// Initialise id's, only should happen once per playthrough
		scanEvents(isExplicit() ? oVisionsExplicit : oVisions, 0, '');
		scanEvents(isExplicit() ? oVisions : oVisionsExplicit, 0, '');
	}
	if (oSelected === undefined && bExplicit) {
		bExplicit = false;
		oSelected = scanEvents(oVisions, id, sTier);
	}

	// One found?
	if (oSelected === undefined) {
		// None left, reset flags for non-plot events and try again
		for (var i = 75; i < (perGlenvale.flags.length * 32); i++) perGlenvale.setFlag(i, false);
		return GeneralEvent(oEvent, oEventExplicit);
	}

	// Set details/flags
	setQueryParams('type=hydromancy&id=' + oSelected.id);
	perGlenvale.setFlag(oSelected.id + 64);
	
	// Show the found event
	var imar = oSelected.image.split(",");
	var md = WritePlaceHeader(false, "td-left" + (oSelected.width !== undefined && oSelected.width !== "" ? "-" + oSelected.width : ""));
	if (oSelected.image.indexOf("Images/") == -1) {
		for (var im = 0; im < imar.length; im++) imar[im] = "Visions/" + (bExplicit ? "Explicit/" : "") + imar[im];
		AddImageArray(imar, "", "", '', '', undefined, md, 'none');
	} else AddImageArray(imar, "", "", '', '', undefined, md, 'none');
	addPlaceTitle(md, oSelected.title);

	// Text
	if (sChild === "" && oSelected.nostart !== true) md.write('<p>As you cast the spell a vision starts to form in the water, and it quickly expands and the vision is all you can see and hear.</p>');
	md.write('<p>' + oSelected.text + '</p>');
	if (oSelected.event === undefined && oSelected.noend !== true) md.write('<p>The vision starts to recede back and you can see normally and just see fragments in the pool of water that are slowly fading.</p>');

	// Questions
	startQuestions();
	if (oSelected.event === undefined) {
		addLinkToPlaceC(md, oSelected.button !== undefined ? oSelected.button : 'the vision ends...', Place);
		if (nMana > 0 && oSelected.nomore !== true) addLinkToPlaceC(md, 'focus on more visions...', Place, 'type=hydromancy', '', '', 'CastClairvoyanceSpell(undefined,1)');
	} else addLinkToPlaceC(md, oSelected.button !== undefined ? oSelected.button : 'the vision changes...', Place, oSelected.event !== undefined ? 'type=hydromancy&child=true&id=' + oSelected.event.id : '');
	WritePlaceFooter(md);
	return true;
}