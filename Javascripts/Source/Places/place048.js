// Massage Parlor

function ShowPlace48()
{
	var md = WritePlaceHeader();

	var perSharon = findPerson("Sharon");
	var clvS = perSharon.getCharmedLevel();

	if (clvS > 0) perSharon.showPerson("sharongreet.jpg");
	else perSharon.showPerson("sharon1.jpg");

	addPlaceTitle(md, "Massage Parlor");

	if (clvS === 0) md.write('<p>The owner of the Parlor greets you as you enter. "Welcome. Please come in and prepare to be relaxed."  You look around the place and there doesn\'t seem to be anyone else here besides customers and the owner.</p>');
	else {
		md.write(
			'<p>Sharon pulls her gorgeous tits out for you as you enter the parlor. She is ready to do anything you ask.</p>' +
			'<p>"Hello again ' + perYou.getMaster() + '. Would you like another massage?"</p>'
		);
	}

	startQuestions();

	if (!perSharon.checkFlag(3)) addLinkToPlaceC(md, 'ask about getting a massage from her', Place, 'type=sharonask1');
	else if (clvS === 0) addLinkToPlaceC(md, 'get another massage from Sharon.', Place, 'type=sharonmassage');

	if (clvS > 0) {
		addPopupLinkC(md, 'have her suck', "She kneels down right in the lobby.",
			(perYou.isMaleSex() ? perSharon.addPersonStringRorX("sharonblowb.jpg", "height:maxw%", "rightpopup") : perSharon.addPersonRandomStringRorX("sharonblowg", isExplicit() ? 2 : 1, "height:maxw%", "rightpopup")) +
			'The other customers can wait.',
			true, "dispPlace()"
		);
		addPopupLinkC(md, 'bend her over', "Right over her fancy massage couch.",
			(perYou.isMaleSex() ? perSharon.addPersonRandomStringRorX("sharonfuckb", isExplicit() ? 2 : 1, "height:maxw%", "rightpopup") : perSharon.addPersonString("sharonfuckg.jpg", "height:maxw%", "rightpopup")) +
			'She has a nice ass too.',
			true, "dispPlace()"
		);
		addLinkToPlaceC(md, 'get another massage from Sharon', Place, 'type=sharonmassageslave');
	}

	addLinkToPlace(md, "leave the Parlor", 43);

	WritePlaceFooter(md);
}