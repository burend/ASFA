// Place: Aquarium Front Hall

function ShowPlace361()
{
	if (!isShopOpen(2, 0, true) && !isPlaceBreakIn("Aquarium") && !isCharmedBy("Melissa")) return gotoPlaceDelayed(360, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The Glenvale Aquarium closes and you have to leave for now.');

	var md = WritePlaceHeader();

	var plcM = wherePerson("Melissa");
	if (plcM != 361) addPlaceImage(md, "aquarium4.jpg");
	if (plcM  == 369 || plcM == 370) AddImage("cleaning.png", "20%", "left");
	addPlaceTitle(md, "Glenvale Aquarium Front Hall");

	md.write(
		'<p>The front hall of the aquarium has always been a rather daunting place.  Large tanks of water loom within stylized displays as fish of every sort lazily swim around in the clear prisons.</p>' +
		'<p>There are a few displays that were always town favorites: one is the Kelp Forest, and Oceans of the World is the other.</p>'
	);
	if (!isShopOpen(2, 0, true)) md.write('<p>The information desk is empty while the aquarium is closed.</p>');
	else {
		md.write('<p>There is a small information desk to one side, with a helpful young woman attending.</p>');
		if (isCharmedBy("Abby")) md.write('<p>You overhear a man say he is going to ask for some information, and you hear his girlfriend reply &quot;Don\'t you dare!&quot;.</p>');		
	}
	if (plcM  == 369 || plcM == 370) md.write('<p>You see a sign at the entrance to the ' + (plcM == 369 ? 'Kelp Forest' : 'Oceans of the World') + ' display noting it is being cleaned.</p>');

	// Dialogue Options
	startQuestions();

	addLinkToPlace(md, 'visit the Kelp Forest display', 369);
	addLinkToPlace(md, 'visit the Oceans of the World display', 370);
	if (isShopOpen(2, 0, true)) {
		if (isInvisible()) addLinkToPlace(md, 'go to the information desk', 394);
		else addLinkToPlace(md, 'ask for help from the information desk', 394);
		addLinkToPlace(md, 'leave the Aquarium', 360);
	} else {
		if (isCharmedBy("Melissa")) addLinkToPlaceC(md, 'ask Melissa to let you out of the Aquarium', 360);
		else addTextForQuestions(md, "<b>The doors of the Aquarium are locked</b>", "center");
	}

	WritePlaceFooter(md);
}