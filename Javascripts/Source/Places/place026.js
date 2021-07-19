// Place: Wild Ranges

function ShowPlace26()
{
	var md = WritePlaceHeader();

	if (perYou.getQuestRustyKey() == 5) perYou.setQuestRustyKey(7);	// Advance the "Rusty Key" Path

	var perMG = findPerson("Mrs Granger");
	var perKate = findPerson("Kate");

	if (perKate.other >= 12 && perKate.other < 15) {
		// Advancing Kate's Path
		perKate.other = perKate.other + 1;
		if (perKate.other == 15 && perKate.place != 9999) {
			perKate.place = 1;   // if We've reach 15 then put Kate @ home again (ready to kill you)
		}
	}

	if (!isBeasleyServant() && wherePerson("Kurndorf") === 0 && perYou.getExperience() > 3 && nMana > 1 && !isSpellKnown("Charm"))
	{
		// This only happens if v14=0 (NOT serving Mr Beasley), v132=0 (Not Started Ghost)
		//    AND v12>3 - meaning you've learned at least one spell AND you have enough mana
		//    to cast the PASS spell && you don't already know the charm spell
		movePerson("Kurndorf", 1);
	}
	if (wherePerson("OfficerBatton") == 1) {
		// Batton is out investigating Khan's Murder/Shooting
		movePerson("OfficerBatton", 168);	// Place her back at the Police station
	}

	if (perMG.place == 26) {
		// Mrs Granger is here
		perMG.showPerson(perMG.getCharmedLevel() == 1 ? "!grangerstones1c.jpg" : "!grangerstones1b.jpg");
	} else {
		addPlaceImage(md, "stones.jpg", "95%");
	}
	if (wherePerson("Kurndorf") == 1) {
		// Ghost is here
		md.write('<img src="Images/ghost2.png" style="position:absolute; width:50%;width:15vw; top:0px; left:0;margin:0px 5px;border-style:none" alt="Ghost">');
		addBackgroundImage("Images/ghost2.png", "", nTheme === 0);
	}
	md.write('<br>');

	addPlaceTitle(md, "Wild Ranges");

	md.write('<p>The stones of the Wild Ranges are the oldest landmark of the country. Nobody knows how the stones were placed, when the event occurred or who placed the remarkable structure. Some townsfolk claim that the stones were magically transported to this field by witches while most townsfolk refuse to even talk about the evil.</p>');
	if (isPlaceKnown("Tunnel")) addPlaceImage(md, "tunnel.jpg", "15%");
	md.write(
		'<p>A long walk brings you to this point. As your skin prickles with an uneasy chill the stones loom above, threatening to expose your secret needs.</p>'
	);
	if (wherePerson("Kurndorf") == 1) // Ghost is here
	{
		if (perGates.other == 600) md.write('<p>A ghostly visage suddenly appears and looks at you briefly, it is the same figure you saw at the mansion!  It seems somewhat distracted not even seeming to notice you and then moves off away from the stones.</p>');
		else md.write('<p>A ghostly visage suddenly appears and looks at you briefly, sending a cold chill down your spine and raising goosebumps on your skin.  It seems somewhat distracted for a moment and then moves off away from the stones.</p>');
		movePerson("Kurndorf", 2); // Move the Ghost
	}
	if (perMG.place == 34) {
		//  Is Mrs Granger here
		md.write('<p>You see Mrs Granger searching through the ranges, just as you commanded. She looks like she is packing up to return home, but she is aware of your gaze, so she poses seductively for you.</p>');
	}

	if (isPlaceKnown("Tunnel")) md.write('<p>You see a tunnel behind one of the stones.</p>');

	//*********************************************************
	startQuestions();

	if (perMG.place == 26) addLinkToPlaceO(md, "approach Mrs Granger", 26, 'type=mgstones');
	
	if (isPlaceKnown("Crypt")) addLinkToPlaceO(md, "enter the crypt", 247);
	addLinkToPlaceO(md, "search the stones", 86);
	addLinkToPlace(md, "visit the campsite", 25);
	if (isPlaceKnown("Tunnel")) addLinkToPlace(md, "go in the tunnel", 178);

	addLinkToPlace(md, "walk to the pathway", 63);

	WritePlaceFooter(md);
}