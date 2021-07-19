// Savanna's apartment

function ShowPlace469()
{
	var md = WritePlaceHeader();

	var perSavanna = findPerson("Savanna");
	var clvS = perSavanna.getCharmedLevel();
	var bHere = perSavanna.isHere();

	if (bHere) {
		if (clvS == 4) perSavanna.showPerson("savhome4.jpg");
		else perSavanna.showPerson("savhome2.jpg");
	}

	addPlaceTitle(md, "Savanna\'s apartment", bHere ? '' : "livingroom1.jpg");

	md.write(
		'<p>Savanna\'s apartment is well furnished, surprisingly so for this apartment building.</p>'
	);
	if (bHere) {
		if (clvS == 2) md.write('<p>Savanna greets you as you walk in. She is grateful for the job but she is off the clock now so she just really wants to go to bed. Apparently tying the charm spell to the job wasn\'t the best idea.</p>');
		else if (clvS == 4) md.write('<p>Savanna is kneeling on her new pink beadspread and already has her tits out. Thats the great thing about being a personal cum slut. She\'s always on the clock.</p>');
		else md.write('<p>Your enchanted girlfriend Savanna greets you as you walk in. She is dressed quite casually and she offers you a drink, or <i>anything</i> you would like!</p>');
	} else md.write('<p>Savanna is at the Town Hall now.</p>');


	startQuestions();

	addLinkToPlace(md, "leave her apartment", 456);
	WritePlaceFooter(md);
}