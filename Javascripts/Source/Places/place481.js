// Place: Construction Site

function ShowPlace481(stype)
{
	var md = WritePlaceHeader();
			
	addPlaceTitle(md, "Construction Site", 'accessroad-site.jpg');

	md.write(
		'<p>This is the main construction site, with a small portable building and some construction machinery. An access road for trucks and workers leads to the south.</p>'
	);
	// Choices
	startQuestions();
	addLinkToPlace(md, "relax for a while", 481, '', 'You sit on a piece of machinery for a while', '', 'WaitHere(3)');
	addLinkToPlace(md, "walk to down the road", 480);
	if (checkPlaceFlag("Park", 5)) addLinkToPlace(md, "return all the way back to Yoolaroo Drive", 43);
	
	WritePlaceFooter(md);
}