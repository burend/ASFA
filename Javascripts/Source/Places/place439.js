// Place: Adele's Room

function ShowPlace439()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Adele\'s Bedroom", "bedroom6.jpg");

	// Questions
	startQuestions();
	addLinkToPlace(md, 'leave the bedroom', 436);
	addLinkToPlace(md, 'leave the house', 37);

	WritePlaceFooter(md);
}