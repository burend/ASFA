// Outside Museum

function ShowPlace238()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Glenvale Museum", "museum.jpg");
	setPlaceBreakIn("Museum", false);

	setPlaceKnown("Museum");  // Set the Museum as known

	md.write('<p>Glenvale museum stands proudly, representing the community spirit of the town\'s people. For the last seventy years local groups and councils having lovingly cared for its contents.</p>');

	// Museum is CLOSED?
	if (checkPlaceFlag("Museum", 8)) md.write('<p>There is a big yellow sign on the front steps.  "MUSEUM CLOSED TO THE PUBLIC"</p>');
	else if (!isShopOpen(2, 0, true)) md.write('<p>The Museum has a sign noting that is closed, hours of business 8am to 8pm.</p>');

	startQuestions();
	if (isShopOpen(2, 0, true) && !checkPlaceFlag("Museum", 8)) addLinkToPlace(md, 'enter the Museum', 239);
	if (isPlaceKnown("Aquarium")) addLinkToPlace(md, 'walk to the Aquarium', 360);	// Know about the Aquarium
	if (isPlaceKnown("CelesteRd")) addLinkToPlace(md, 'walk down Celeste Road', 455);	// Know about Celeste Road
	addLinkToPlace(md, 'walk to the Library', 2);

	WritePlaceFooter(md);
}