// Place: Amy's Room

function ShowPlace437()
{
	var md = WritePlaceHeader();
	addPlaceTitle(md, "Amy\'s Bedroom", "bedroom9.jpg");
			
	startQuestions();
	addLinkToPlace(md, 'leave the bedroom', 436);
	addLinkToPlace(md, 'leave the house', 37);

	WritePlaceFooter(md);
}