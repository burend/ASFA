// Place: Aunt Brandi's Room

function ShowPlace402()
{
	var perKylie = findPerson("Kylie");
	var perBrandi = findPerson("Brandi");
	
	var md = WritePlaceHeader();
	
	if (perBrandi.isHere()) perBrandi.showPerson("bedroom" + perBrandi.getSuffix() + ".jpg");
	
	addPlaceTitle(md, "Aunt Brandi\'s Bedroom", perBrandi.isHere() ? "" : "bedroom7.jpg");
	
	md.write(
		"<p>Aunt Brandi's room is unremarkable, very tidy and little of a personal nature is displayed. Maybe a little remarkable for a person's bedroom to be so plain.</p>"
	);
	
	startQuestions();
	addLinkToPlace(md, 'leave the bedroom', 400);
	addLinkToPlace(md, 'leave the house', 37);

	WritePlaceFooter(md);
}