// Place: Construction Road

function ShowPlace480(stype)
{
	var md = WritePlaceHeader();
			
	addPlaceTitle(md, "Access Road", 'accessroad.jpg');

	md.write(
		'<p>The access road has some construction machinery parked in places, looking almost abandoned. There is a fence to the south and beyond that Yoolaroo Drive. To the north is a clearing with a small portable building and some more machinery.</p>'
	);
	// Choices
	startQuestions();
	addLinkToPlace(md, "walk to the construction site", 481);
	if (checkPlaceFlag("Park", 5)) addLinkToPlace(md, "return all the way back to Yoolaroo Drive", 43);
	
	WritePlaceFooter(md);
}