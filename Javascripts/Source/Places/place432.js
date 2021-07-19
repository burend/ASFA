// Melanie's House

function ShowPlace432()
{
	var md = WritePlaceHeader();

	var perMelanie = findPerson("Melanie");
	var clvM = perMelanie.getCharmedLevel();

	if (clvM === 0) perMelanie.showPerson("mel1.jpg");
	else if (!isDay()) perMelanie.showPerson("mel9-" + perMelanie.getSuffix() + "-night.jpg");
	else perMelanie.showPerson("mel9-" + perMelanie.getSuffix() + "-day.jpg");
	
	addPlaceTitle(md, "Melanie\'s Home");

	if (clvM == 4) md.write('<p>Your Milf slave is locked in her exercise machine. You require your slaves to maintain peak physical condition so that they may please you better.</p>');
	else if (clvM == 3) md.write('<p>Your Milf-friend Melanie is very happy to see her younger lover.</p>');
	else md.write('<p>"Hello young ' + perYou.getManWoman() + '. Did you need something or have something to deliver. I wasnt expecting visitors today."</p>');

	startQuestions();

	if (clvM == 4) {
		// Slave
		addPopupLinkC(md, 'give the sweaty Milf a bath', "C\'mon bitch. relax. I made this nice warm bath just for you.",
			perMelanie.addPersonString("melbath-slave.jpg", "60%", "rightpopup") +
			'Ungrateful whores these days.',
		);

		if (perYou.isMaleSex()) {
			addPopupLinkC(md, 'use her face', "Open your throat more bitch.",
				perMelanie.addPersonRandomStringRorX("melfaceb", isExplicit() ? 2 : 1, "50%", "rightpopup") +
				'You\'ll learn to love this.',
			);
		} else if (perYourBody.FindItem(45) > 0) {
			addPopupLinkC(md, 'use her face', "Open your throat more bitch.",
				perMelanie.addPersonString("melfacegs.jpg", "60%", "rightpopup") +
				'You\'ll learn to love this.',
			);
		} else {
			addPopupLinkC(md, 'use her face', "Lick bitch",
				perMelanie.addPersonString("melfacegn.jpg", "60%", "rightpopup") +
				'You\'ll learn to love this.',
			);
		}

		perMelanie.addSleepLink(md, "sleep here tonight", "Sleeping with Melanie",
			'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You decide to give Melanie the night off from her bondage and let her suck our cock while you sleep.</b>',
			(perYou.isMaleSex() && isExplicit() ? 'Explicit/' : '') + 'melsleep.jpg', true
		);
	} else if (clvM == 3) {
		// Girlfriend
		addLinkToPlaceC(md, "ask her " + (perYou.isMaleSex() ? "for a blowjob" : "to lick you"), Place, 'type=melaniebj');
		addLinkToPlaceC(md, "fuck your milf lover", Place, 'type=melaniefuck');
		if (perYou.isMaleSex()) addLinkToPlaceC(md, "fuck your milf lover's tits", Place, 'type=melanietitfuck');
		else if (perYourBody.FindItem(45) > 0) addLinkToPlaceC(md, "fuck your milf lover with a strap-on", Place, 'type=melaniestraponfuck');
		addLinkToPlaceC(md, "have a bath with Melanie", Place, 'type=melaniebath');
		
		perMelanie.addDancingLink(md, 'talk to Melanie about dancing at the club?', 
			'You talk to Melanie about the Avernus club and about if she wants to have some fun and dance there,</p>' +
			'<p>&quot;Did Brandi tell you I used to work as an exotic dancer when I was studying?&quot; You deny talking to Aunt Brandi about this, but no matter it is agreed she will dance in the club later on for you.'
		);
		perMelanie.addSleepLink(md, "sleep here tonight", "Sleeping with Melanie",
			'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You decide to spend the night with Melanie.</b>',
			'sleep.jpg', true
		);		
	}

	addLinkToPlace(md, "leave her house", 37);

	WritePlaceFooter(md);
}