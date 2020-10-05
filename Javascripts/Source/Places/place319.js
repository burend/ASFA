// Place: Church Courtyard

function ShowPlace319()
{
	var md = WritePlaceHeader();
	
	setPlaceKnown("ChurchCourtyard");
	var perDesiree = findPerson("Desiree");

	// TITLE LINE
	addPlaceTitle(md, "Church Courtyard", "church3.jpg");

	// Description
	md.write(
		'<p>The inner courtyard of the Lady of our Heavenly Father.  It is almost unbelievable, the vista that lies before you.  Beautiful fountains, sculptures and even a large hedge maze all lie within a short walk.  Surprisingly there are not many people moving around such a large area, giving you the feeling of privacy even out in the open air.</p>' +
		'<p>A lovely fountain of crisp clear water bubbles away near the west wall of the courtyard.</p>'
	);

	if (perDesiree.place === 332) {
		//Nun is AT CHURCH
		if (perDesiree.isCharmedBy()) {
			// Nun is CHARMED
			md.write('<p>Your Disciple, Desiree, stands near the bushes in further contemplation of the temptations of the flesh...  especially <i>your</i> flesh.</p>');
		} else {
			// Nun is NORMAL
			if (perDesiree.other === 0) md.write('<p>Near a maze you can see one of the Sisters, evidently lost in prayer - presumably some esoteric and or spiritual tribulation that is just <i>consuming</i> her soul...</p>');
			else md.write('<p>You can see Sister Desiree standing near the hedge maze, still lost in her thoughts.</p>');
		}
	}

	if (perDesiree.place == 1000) {
		// Have Sent Desiree off to find the Catholic Relic
		md.write('<p><i>Normally you would find your "disciple" Desiree here, but you sent her off in search of something and she has not yet returned.  Perhaps you should find something to keep you busy.</i></p>');
	} else if (perDesiree.place == 384) md.write('<p>You heard the Mother Superior tell Sister Desiree to follow her, so she is very likely with her now.</p>');

	// Choices
	startQuestions();

	if (perDesiree.place === 332) {
		// Desiree is here @ Church
		if (perDesiree.isCharmedBy() && !isPossess()) {
			//CHARMED and NOT POSSESSING Mother Superior
			addLinkToPlace(md, 'minister to your faithful Disciple', 332);
		} else {
			if (perDesiree.other === 0) addLinkToPlace(md, 'approach the good Sister', 332);
			else addLinkToPlace(md, 'approach Sister Desiree', 332);
		}
	}

	addLinkToPlace(md, 'enter the cloisters', 406);
	addLinkToPlace(md, 'walk back into the Church proper', 318);
	
	if (isPlaceKnown("ChurchSecretDoor") && !isPossess()) {
		//know about "back door" and NOT POSSESSED
		addLinkToPlace(md, 'walk out the secret door through the wall', 320);
	}

	WritePlaceFooter(md);
}