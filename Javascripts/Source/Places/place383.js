function ShowPlace383()
{
	var md = WritePlaceHeader();
	var perMS = findPerson("Daria");

	// TITLE
	addPlaceTitle(md, "Mother Superior\'s Secret Room", "nunroom2.jpg");

	// Description
	md.write(
		'<p>A small hidden room with a door that blends in <i>perfectly</i> with the wall around it.</p>' +
		'<p>Were it not for magic you would have never noticed it against the wall.  In fact, if you didn\'t know better you would swear it was magic that hid it from you in the first place.</p>'
	);

	if (whereItem(48) == Place) {
		//Relic is here
		md.write('<p>On a small table, with a simple white cloth, lies a small locket.  Not much to look at but, considering it\'s the only thing in the room and the amount of trouble it was to find, it has to be the Relic that she protected so fervently.</p>');
	}

	//**********************************************************************
	startQuestions();
	addLinkToPlace(md, "leave the secret room", perMS.place == 382 ? 382 : 384);

	WritePlaceFooter(md);
}