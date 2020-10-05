// Place: Outside Hotel

function ShowPlace123()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Broken Inn Hotel", "hotel1.jpg", 75);

	md.write(
		'<p>The reputed establishment of the darkest hour of Glenvale, ' +
		'the Broken Inn Hotel was once ruled by the tyrant Carl Kurndorf. There is a rumour ' +
		'around town that the cellar is haunted by Kurndorf since ' +
		'his bloody death in the early hours of a grim September morning. ' +
		'From the exterior the building looks friendly enough and most of the tourists prefer to stay in the old style accommodation.</p>'
	);

	if (!isPlaceKnown("Hotel")) setPlaceKnown("Hotel");	// Sets Hotel Location as known if not already

	startQuestions();
	
	addLinkToPlace(md, "enter the Hotel", 124);
	if (isPlaceKnown("RathdownRd")) addLinkToPlace(md, "walk to Rathdown Road", 229);
	if (isPlaceKnown("Graveyard")) addLinkToPlace(md, "walk to the Graveyard", 325);
	addLinkToPlace(md, "walk to the Town Hall", 94);

	WritePlaceFooter(md);
}