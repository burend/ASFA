// Betty's Room

function ShowPlace61()
{
	var md = WritePlaceHeader();

	var perBetty = findPerson("Betty");
	var clvB = perBetty.getCharmedLevel();

	if (clvB == 3) perBetty.showPerson("bettyroomd.jpg");
	else perBetty.showPersonRandom("bettyroom", 3);
	addPlaceTitle(md, "Betty\'s Room");

	if (clvB == 4) md.write('<p>Betty is kneeling on a cushion with her huge tits pressed together. Any freetime she has is spent right here patiently awaiting her ' + perYou.getMaster() + '\'s return.</p>');
	else md.write('<p>Betty welcomes you in, she is partly dressed as a cow-girl, you refrain from any comments about her breasts and how appropriate.</p>');

	startQuestions();

	if (clvB == 4) {
		if (perYou.isMaleSex()) {
			addPopupLinkC(md, 'lie down for a blowjob', "You could almost go to sleep like this",
				perBetty.addPersonRandomStringX('home-bjb', 2, "100%", '', '', '', 1) +
				'But she is pretty aggressive so probably not.',
			);
			addPopupLinkC(md, 'deepthroat her', "She basically face fucks herself.",
				perBetty.addPersonStringX('home-bjba.jpg', "100%") +
				'My kind of woman.',
			);
		}
		addPopupLinkC(md, 'show her what it could be like in the barn', "She hangs there for an hour or so.",
			perBetty.addPersonString('bettytied.jpg', "100%") +
			'She will learn to not question her father.',
		);
	} else {
		if (perYou.isMaleSex()) addLinkToPlace(md, "ask for a tit-fuck", Place, 'type=bettytf');
		addLinkToPlace(md, "ask " + (perYou.isMaleSex() ? "for a blowjob" : "to lick you"), Place, 'type=bettybj');
		addLinkToPlaceC(md, "make love to Betty", Place, 'type=bettyfuck');
		addLinkToPlaceC(md, "take a bath with Betty", Place, 'type=bettybath');
		addLinkToPlaceC(md, "some bondage play", Place, 'type=bettybondage');
	}


	perBetty.addSleepLink(md, "sleep with Betty", "Bedtime",'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Betty to bed for the night.</b>',
		'bed.jpg', true
	);

	addLinkToPlace(md, "leave her house", 60);
	WritePlaceFooter(md);
}