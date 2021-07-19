// Anita's Lair (School storeroom)

function ShowPlace252(stype)
{
	var m

	var perAnita = findPerson("Anita");

	if (perAnita.place !== 252) {
		// Empty
		md = WritePlaceHeader();
		addPlaceTitle(md, "Empty Storeroom", "storage.jpg");

		md.write('<p>This is a disused storeroom, once Anita\'s Lair, she must have left here to go somewhere else. Assorted useless things are stored here and there.</p>');
		if (whereItem(47) == 252) md.write('<p>You see a sports bag left here, probably abandoned by Anita.</p>');

		startQuestions();
		addLinkToPlace(md, 'return to Ms Jones\' office', 145);

	} else if (!perAnita.isCharmedBy("You")) {
		// Anita is here and NOT charmed
		md = WritePlaceHeaderNI();
		perAnita.showPerson("anita3.jpg");
		addPlaceTitle(md, "Anita\'s Lair");

		if (whereItem(21) === 0 && perAnita.other < 900) {
			//Blue key hasn't appeared yet && Anita is still ALIVE
			PlaceI(21);
		}

		if (!isPlaceKnown("AnitasLair")) setPlaceKnown("AnitasLair"); // Anita's Lair now KNOWN

		md.write('<p>You catch Anita unawares, she was in the process of changing clothes. She awkwardly tries to cock the shotgun but seems to be confused about the weapon.</p>');
		if (whereItem(21) == Place) {
			//Blue key is HERE
			md.write('<p>Amidst her naive fumbling you notice the sparkle of a small blue key as it falls to the floor.</p>');
		}

		md.write('<p>You only have moments before she comes to her senses, what do you do?</p>');

		startQuestions();
		addLinkToPlace(md, 'jump her!', 252, 'type=shotjump');
		addLinkToPlace(md, 'return to Ms Jones\' office', 145, '', '', '', 'LeaveLair()');
		WritePlaceFooter(md);
		return;

	} else {
		// Anita is here and IS charmed
		md = WritePlaceHeader();
		perAnita.showPerson("anita8.jpg", "height:max");
		addPlaceTitle(md, "Anita\'s Lair");

		md.write('<p>Your slave Anita is waiting for you in the abandoned storeroom, ready for anything, but also completely naked</p>');

		if (whereItem(47) == 252) md.write('<p>You see an empty sports bag sitting on a dusty shelf.</p>');
		if (whereItem(21) == 252) md.write('<p>You see an odd key hanging on a hook, on it you see a small engraving of a pentagram.</p>');

		startQuestions();
		addLinkToPlaceC(md, 'order her "Prove your loyalty!"', 252, 'type=proveit');
		if (perAnita.checkFlag(7)) addLinkToPlaceC(md, 'redeploy her', 252, 'type=deploy');
		addLinkToPlace(md, 'return to Ms Jones\' office', 145);
	}

	WritePlaceFooter(md);
}