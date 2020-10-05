// Place: Tunnel

function ShowPlace178()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Tunnel", "tunnel1.jpg");

	md.write('<p>Through the limestone of Glenvale you walk in the	gloomy tunnel, a tunnel that must have been carved by the first inhabitants of the town.</p>');

	startQuestions();

	if (nFromPlace == 141) {
		addLinkToPlace(md, "go to the wild ranges", 26);
		addLinkToPlace(md, "go to the sacred clearing", 141);
	} else {
		addLinkToPlace(md, "go to the sacred clearing", 141);		
		addLinkToPlace(md, "go to the wild ranges", 26);
	}
	WritePlaceFooter(md);
}