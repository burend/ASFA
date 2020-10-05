// Place: Aquarium The Oceans of the World

function ShowPlace370()
{
	var md = WritePlaceHeader();

	// TITLE LINE
	addPlaceTitle(md, "The Oceans of the World", "aquarium5.jpg");

	// Description
	md.write('<p>This display is a series of large tanks, each containing a vista from a different ocean from around the world - hence the name.  It used to be a lot more popular with the crowds but as one of the older displays it seems to have fared poorly in the Aquarium\'s popularity contest.</p>');

	// Dialogue Options
	//**********************************************************************
	startQuestions();
	
	addLinkToPlace(md, 'visit the Front Hall', 361);
	addLinkToPlace(md, 'visit the Kelp Forest display', 369);
	if (isShopOpen(2, 0, true)) addLinkToPlace(md, 'leave the Aquarium', 360);
	else addTextForQuestions(md, "<b>The doors of the Aquarium are locked</b>", "center");

	WritePlaceFooter(md);
}