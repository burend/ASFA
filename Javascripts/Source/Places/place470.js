// Haven Apartments

function ShowPlace470()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Haven Apartments", "apartments2.jpg");

	md.write('<p>The Haven apartments are a small set of exclusive and thus expensive, fully serviced apartments.</p>');

	startQuestions();
	addLinkToPlace(md, 'enter the apartments', 471);
	addLinkToPlace(md, 'return to the shopping center', 194);

	WritePlaceFooter(md);
}