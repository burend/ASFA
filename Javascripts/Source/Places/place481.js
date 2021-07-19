// Place: Construction Site

function ShowPlace481(stype)
{
	var md = WritePlaceHeader();
			
	addPlaceTitle(md, "Construction Site", 'accessroad-site.jpg');

	md.write(
		'<p>This is the main construction site, with a small portable building, a small office, and some construction machinery. An access road for trucks and workers leads to the south.</p>' +
		'<p>You heard construction is \'on hold\' but it is not clear why or for how long. There were rumours of financial problems, bribery and some management incompetence.</p>'
	);
	if (checkPlaceFlag("Park", 8)) md.write('<p>The office appears to be occupied, there appears to be a light on and you notice a shadow pass one of the windows.</p>');
	
	// Choices
	startQuestions();
	addLinkToPlace(md, "relax for a while", 481, '', 'You sit on a piece of machinery for a while', '', 'WaitHere(3)');
	if (checkPlaceFlag("Park", 7)) addLinkToPlace(md, "visit the office", 482);
	else if (checkPlaceFlag("Park", 8)) addLinkToPlace(md, "knock on the door of the office", 481, '', 'There is no answer at the door, they are clearly ignoring you.');
	addLinkToPlace(md, "walk to down the road", 480);
	if (checkPlaceFlag("Park", 5)) addLinkToPlace(md, "return all the way back to Yoolaroo Drive", 43);
	
	WritePlaceFooter(md);
}