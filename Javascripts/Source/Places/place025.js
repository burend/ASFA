// Place: Campsite in the Wild Ranges

function ShowPlace25()
{
	var md = WritePlaceHeader();
	
	var perCampers = findPerson("Campers");

	// Campsite
	addPlaceTitle(md, "Public Campsite", perCampers.isHere() ? "campsite2.jpg" : "campsite1.jpg");
	md.write('<p>The small free campsite in the Wild Ranges, it has very simple facilities, toilet, a water tank, no power. There is a short path leading to Glenvale lake.</p>');
	
	if (checkPlaceFlag("WildRanges", 5)) md.write('<p>You see the faint path leading deeper into the woods.</p>');
	else md.write('<p>You think there may be other paths into the woods but you cannot see anything <i>normally</i>.</p>');
	
	// Choices
	startQuestions();
	if (checkPlaceFlag("WildRanges", 5)) addLinkToPlace(md, 'follow the path deeper into the woods', 24);
	addLinkToPlaceO(md, "visit the lake", 23);
	addLinkToPlace(md, 'explore the rest of the Wild Ranges', 26);
	addLinkToPlace(md, 'walk to the main park pathway', 63);

	WritePlaceFooter(md);
}