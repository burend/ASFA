// Haven Apartments building foyer

function ShowPlace471()
{
	var md = WritePlaceHeader(false, 'td-left-large');

	addPlaceTitle(md, "Haven Apartments Foyer", "apartments2-foyer.jpg");

	setPlaceKnown("HavenApartments");  // Set the Haven Apartments as known

	md.write('<p>The foyer of the Haven Apartments, spotlessly clean and well maintained.</p>');

	startQuestions();
	addLinkToPlace(md, 'leave the apartments', 470);

	WritePlaceFooter(md);
}