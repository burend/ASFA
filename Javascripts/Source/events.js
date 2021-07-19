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

// Pick an event
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
	

var oLastEvent, sLastTier;

function GeneralEvent(oEvent, oEventExplicit, sTier)
{
	var idNew = 10;
	var ids = getQueryParam("id");
	var sChild = getQueryParam("child");
	var id = ids === '' ? 0 : parseInt(ids, 10);
	if (oEvent === undefined) oEvent = oLastEvent;
	if (sTier === undefined) sTier = sLastTier;
	else sLastTier = sTier;

	var bExplicit = isExplicit() && oEventExplicit !== undefined;
	oLastEvent = bExplicit ? oEventExplicit : oEvent;
	var oSelected = scanEvents(oLastEvent, id, sTier);
	if (idNew != 10) {
		// Initialise id's, only should happen once per playthrough
		scanEvents(isExplicit() ? oEventExplicit : oEvent, 0, '');
		scanEvents(isExplicit() ? oEvent : oEventExplicit, 0, '');
	}
	if (oSelected === undefined && bExplicit) {
		bExplicit = false;
		oLastEvent = oEvent;
		oSelected = scanEvents(oEvent, id, sTier);
	}
	
	// Show the found event
	
	// Do any updates for the event
	if (oSelected.update !== undefined) oSelected.update();
	
	// Image
	var imar = oSelected.image.split(",");
	var md = WritePlaceHeader();
	for (var im = 0; im < imar.length; im++) imar[im] = (bExplicit ? "Explicit/" : "") + imar[im];
	AddImageArray(imar, "", "", '', '', undefined, md, 'none');
	addPlaceTitle(md, oSelected.title);

	// Text
	md.write('<p>' + oSelected.text + '</p>');

	// Questions
	startQuestions();
	addLinkToPlaceC(md, oSelected.button !== undefined ? oSelected.button : 'you continue on', Place, oSelected.event !== undefined ? 'type=generalevent&child=true&id=' + oSelected.event.id : '');
	WritePlaceFooter(md);
	return true;
}