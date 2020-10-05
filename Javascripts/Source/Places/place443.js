// Place: Hospital Old Basement

function ShowPlace443(stype)
{
	var md = WritePlaceHeader();
		
	// General visit
	addPlaceTitle(md, "Old Basement", isPersonHere("Ghost") ? "hospitaloldbasement.jpg" : "hospitaloldbasement-empty.jpg");
	
	md.write(
		"<p>The old basement, parts are abandoned, and other parts look to have been a kitchen at one time, but long abandoned. It is very cold and damp here, and a slight mist forms in a couple of places, notably coming down an old chimney and in the corner of the kitchen area.</p>" +
		"<p>The doors back to the main basement are locked from this side as well.</p>"
	);
		
	startQuestions(checkPlaceFlag("Hospital", 4) ? undefined : 'There is no physical way out of here...');
	if (checkPlaceFlag("Hospital", 4)) addLinkToPlace(md, 'return to the main part of the basement', 442);
	
	WritePlaceFooter(md);
}