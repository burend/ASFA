// Place: Amaranth Pl

function ShowPlace38()
{
	var md = WritePlaceHeader();

	var perLeanne = findPerson("Leanne");

	// Placing the pictures
	addPlaceImage(md, "house10.jpg", "90%");
	addPlaceImage(md, "house9.jpg", "90%");
	addPlaceImage(md, "house11.jpg", "90%");

	// Description
	addPlaceTitle(md, "Amaranth Place");

	md.write('<p>An average suburban part of town, the area is tidy and the houses well looked after. ');
	if (isDay()) md.write('You see some children playing in one of the houses front yards.</p>');
	else md.write('There is little going on here at this time of night.</p>');
	md.write('<p>You can see 3 Amaranth Pl, the home of your friend Leanne.<br>The house is pleasant but you have seldom been there.');
	if (perLeanne.whereNow() == 450 || perLeanne.whereNow() == 9999) {
		if (perLeanne.isCharmedBy("Demon") && !perLeanne.checkFlag(13)) md.write(' You see that the front door of Leanne\'s house is partly open.');
		else if (perLeanne.whereNow() == 450) md.write(' It looks like Leanne is home.');
	}
	if (isPlaceKnown("GabbysHouse")) {
		md.write('</p><p>11 Amaranth Pl is the home of Gabrielle Halliway, your mothers Assistant. She usually doesn\'t receive visitors and you have only ever seen it from afar.');
	}
	if (isPlaceKnown("LolasHouse")) {
		md.write('</p><p>23 Amaranth Pl is the home of Lola, the museum curator.');
	}	
	md.write('</p>');

	// Questions
	startQuestions();

	if (perLeanne.whereNow() == 450 || perLeanne.whereNow() == 9999) addLinkToPlace(md, perLeanne.isCharmedBy("Demon") && !perLeanne.checkFlag(13) ? "check Leanne's house" : "visit Leanne's house", 450);
	else {
		if (perLeanne.isCharmedBy("Demon")) addLinkToPlace(md, "visit Leanne's house", 38, '', 'There is no answer at the door');
		else if (isShopOpen(2, 1, true)) addLinkToPlace(md, "visit Leanne's house", 38, '', 'There is no answer at the door, she is probably at the General ' + getShopStore(true));
		else addLinkToPlace(md, "visit Leanne's house", 38, '', 'You should probably visit another time, she has been a bit depressed recently and has preferred to be left alone when she is feeling that way.');
	}
	if (isPlaceKnown("GabbysHouse")) {
		if (isMurderPath() && wherePerson("Gabby") == 453 && !isCharmedBy("Gabby")) addLinkToPlace(md, "approach Gabby\'s house", 452, 'type=gabbyhouseapproach');
		else if (!isMurderPath() && checkPersonFlag("Gabby", 13)) addLinkToPlace(md, "visit Gabby's house", 38, '', 'No one seems to be home!');
		else addLinkToPlace(md, "visit Gabby's house", 452);
	}
	if (isPlaceKnown("LolasHouse")) addLinkToPlace(md, "visit Lola's house", 451);
	addLinkToPlace(md, "walk to Rathdown Road", 229);

	WritePlaceFooter(md);
}