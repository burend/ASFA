// Place: Jail Cell, no police present

function ShowPlace260()
{
	var md = WritePlaceHeader();
	
	var perS = findPerson("OfficerSmith");
	var clv = perS.getCharmedLevel();
	var perDA = findPerson("Diane");
	var perMG = findPerson("MrsGranger");
	var perAbby = findPerson("Abby");
	var perCharlie = findPerson("Charlie");

	if (!isPlaceKnown("JailCell")) setPlaceKnown("JailCell");	// Set Jail Cell as Known if not already

	if (perDA.getQuestArrested() === 0 && perYou.isArrested()) {
		// If Court Path = 0 and Have Been Arrested
		perDA.setQuestArrested(1); // Start the Court Path if not already
	}

	addPlaceTitle(md, "Jail Cell", "jail2.jpg");

	if (perYou.isArrested())
	{
		if (isMurderPath()) md.write('<p>You are arrested, and accused of murder.');
		else md.write('<p>You are arrested, and awaiting trial for theft.');

		if (clv > 0) {
			// Becky is charmed
			md.write(' Becky has left the cell door open... allowing you to leave anytime you want.</p>');
		} else {
			md.write(' Desperately you try to escape without success.</p>');
		}
	}

	if (perDA.other == 50) md.write('<p>' + getProsecutor() + ' White stares out at you from another cell. "Let me out of here you <i>monster</i>," she rails.  "I don\'t know how you...  you...  just let me out of here!"</p>');
	if (perMG.place == 261) md.write('<p>You see Mrs Granger watching you in a nearby cell.</p>');
	if (perCharlie.place == 261) md.write('<p>You see Charlie looking nervous in one of the cells.</p>');

	if (!perYou.isArrested()) {
		//NOT under arrest OR Becky is CHARMED
		md.write('<p>The jail cell door stands open... allowing you to leave anytime you want.</p>');
	}

	// **************************************************************************
	startQuestions();

	if (perS.place == 261 && perS.other != 100) {
		// Officer Smith still @ jail (hasn't rushed the DA)
		if (clv > 0) addLinkToPlace(md, "call for Becky", 261);
		else addLinkToPlace(md, "yell for attention", 261);
	}
	if (perMG.place == 261) {
		if (perMG.other == 54 || perAbby.getQuestDragonGem() == 5) {
			//Ready to talk about the Dragon Vase or HAVE it on you
			addQuestionC(md, 'ask Mrs. Granger about the dragon vase', "MrsGranger", 2354);
		}
	}

	if (perYou.isArrested()) {
		// Under arrest
		if (perDA.getQuestArrested() > 0 && perDA.getQuestArrested() < 50) addLinkToPlace(md, "wait for your trial?", 950);
		else addLinkToPlace(md, "give up the game?", 999);

		if (clv > 0 && perS.place == 261) {
			// Becky Charmed && still here
			addLinkToPlace(md, "walk out through the open door your slave Becky left for you", 168);
		}
	}
	else addLinkToPlace(md, "exit the jail?", 168);
	
	
	if (perDA.other == 50 || perMG.place == 261 || perCharlie.place == 261) {
		AddPeopleColumnLarge(md);
		if (perDA.other == 50) perDA.showPerson("diane8.jpg");
		if (perMG.place == 261) perMG.showPerson("!granger-jail1.jpg");
		if (perCharlie.place == 261) perCharlie.showPerson("break-jail2.jpg");
	}

	WritePlaceFooter(md);
}