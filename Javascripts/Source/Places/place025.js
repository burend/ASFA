// Place: Campsite in the Wild Ranges

function ShowPlace25()
{
	var md = WritePlaceHeader();
	
	var perGlenvale = findPerson("Glenvale");

	// Campsite
	addPlaceTitle(md, "Public Campsite", perGlenvale.checkFlag(34) ? "campsite2.jpg" : "campsite1.jpg");
	md.write('<p>The small free campsite in the Wild Ranges, it has very simple facilities, toilet, a water tank, no power.</p>');
	if (perGlenvale.checkFlag(34) && perGlenvale.place != 25) md.write('<p>You see the tent and gear of the campers you previously met, but they do not appear to be here.</p>');
	
	// Choices
	startQuestions();
	addLinkToPlace(md, 'explore the rest of the wild ranges', 26);
	addLinkToPlace(md, 'walk to the main park pathway', 63);

	WritePlaceFooter(md);
}