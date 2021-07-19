// Foremans Office

function ShowPlace482()
{
	var md = WritePlaceHeader();

	var perAsh = findPerson("Ash");
	var clvA = perAsh.getCharmedLevel();

	if (clvA === 0) perAsh.showPerson("ash1.jpg");
	else if (!isDay()) perAsh.showPerson("ashnight.jpg");
	else perAsh.showPerson("ashday.jpg");
	
	addPlaceTitle(md, "Construction Site Office");

	if (clvA == 4) md.write('<p>Ash is now constantly trying to bribe you with her mouth or asshole. It is such a stark contrast to the prudish girl she used to be. She is your devoted slave and will truly do anything you tell her to do.</p>');
	else if (clvA == 3) md.write('<p>Ash seems grateful to you for arranging for her to work at site maintenance, "Thank you so much for the job. "I am quite sure some \'benefits\' are in order"</p>');
	else {
		md.write(
			'<p>Ash seems grateful to you, "Thank you so much for letting me stay here. If there\'s anything I can ever do for you just let me know. This means so much to me. You really are saving my life here. Anything you need is done. Just say the word"</p>' +
			'<p>You keep thinking, "Ash, you keep saying that but I don\'t think you know what anything means"</p>'
		);
	}

	startQuestions();

	if (clvA == 0) {
		addPopupLinkC(md, '"You could show me those tits"', '"This is good enough, right?"',
			perAsh.addPersonString("ashflash.jpg", "50%", "rightpopup") +
			'What are you talking about. I can\'t even see your tits. You said anything.',
		);
	} else if (clvA == 4) {
		if (perYou.isMaleSex()) {
			addPopupLinkC(md, 'suck my balls', "You can be nice.",
				perAsh.addPersonStringRorX("ashmouthba.jpg", "60%", "rightpopup") +
				'You decided to allow her some vaginal pleasure while your balls are in her mouth. It is an unusual arrangement but she seems to enjoy it.',
			);
		} else {
			addPopupLinkC(md, 'lick me', "Oral Work",
				perAsh.addPersonRandomStringRorX("ashmouthg.jpg", "50%", "rightpopup") +
				'You have Ash kneel down and probide you some oral pleasure',
			);
		}
		addPopupLinkC(md, 'let her ride you', "She has become an anal expert.",
			(perYou.isMaleSex() ? perAsh.addPersonStringRorX("ashrideb.jpg", "60%", "rightpopup") : perAsh.addPersonRandomString("ashrideg", 2, "height:max%", "rightpopup")) +
			'Ash\'s love for anal has surprised even you. She has taken to it faster than you would have expected.',
		);
	} else {
		addPopupLinkC(md, 'ask for some oral \'benefits\'', "Oral \'Benefits\'",
			(perYou.isMaleSex() ? perAsh.addPersonStringRorX("ashmouthba.jpg", "60%", "rightpopup") : perAsh.addPersonRandomStringRorX("ashmouthg.jpg", "50%", "rightpopup")) +
			'You ask Ash for a bit of oral attention',
		);
		addPopupLinkC(md, 'fuck her', "Fucking \'Benefits\'",
			(perYou.isMaleSex() ? perAsh.addPersonStringRorX("ashrideb.jpg", "60%", "rightpopup") : perAsh.addPersonRandomString("ashrideg", 2, "height:max%", "rightpopup")) +
			'Time for some sex',
		);		
	}

	if (clvA > 0) {
		addPopupLinkC(md, clvA == 4 ? '"Jiggle that ass"' : 'play around with a jackhammer', 'Bounce, Bounce',
			perAsh.addPersonString("jackhammer.jpg", "75%", "rightpopup") +
			'Ash plays around with a jackhammer, pretending it is on and jumping up and down',
		);
		perAsh.addSleepLink(md, "sleep here for the night", "Time for Bed Ash",
			'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>It\'s so peaceful here.</b>',
			'sleep.jpg', true, '', '', '', "overflow-y:hidden"
		);
	}

	addLinkToPlace(md, "Leave the building", 481);
	WritePlaceFooter(md);
}