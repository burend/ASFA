// Place: Tina's Bedroom

function ShowPlace83()
{
	var md = WritePlaceHeader();

	// ***********************************************************************

	addPlaceTitle(md, "Tina\' Bedroom", "bedroom10.jpg");

	startQuestions();
	addLinkToPlace(md, 'exit the bedroom', 176);

	WritePlaceFooter(md);
}