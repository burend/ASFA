// Place: Jail Cell, Becky Smith present

function ShowPlace261()
{
	var md = WritePlaceHeader();

	var perS = findPerson("OfficerSmith");
	var clvS = perS.getCharmedLevel();
	var perDA = findPerson("Diane");
	var clvDA = perDA.getCharmedLevel();
	var perMG = findPerson("MrsGranger");
	var perAbby = findPerson("Abby");
	var perBatton = findPerson("OfficerBatton");
	var clvBatton = perBatton.getCharmedLevel();
	var perCharlie = findPerson("Charlie");

	if (!isPlaceKnown("JailCell")) setPlaceKnown("JailCell"); // Set Jail Cell as Known if not already

	if (clvS > 0) perS.showPerson("polg5.jpg");
	else perS.showPerson("polg1.jpg");

	addPlaceTitle(md, "Jail Cell");


	if (clvS === 0)
	{
		md.write('<p">A cop stops by to check on you. ');
		if (perYou.isArrested()) {
			// You're UNDER ARREST
			md.write('"What\'s all of the commotion?" she asks. "If you don\'t shut up then I\'ll shut you up."</p>');
		}	else md.write(getOfficer() + ' Becky Smith steps out from one of the back rooms. "Is there something I can help you with?" she asks politely, as if you were touring the police station.</p>');

	} else {
		md.write(
			"<p>Your slave " + getOfficer() + " Becky Smith stops by to check on you. " +
			"It wasn’t hard to persuade her even though she looks quite buffed and very athletic like so you thought she has a strong will too. Instead, she broke and gave in to your powers after a few seconds.</p>" +
			"<p>Now, she is making her ten minute round, but when she sees you she stops and makes a soldier-like salute to you and stands in attention, her hands behind her beck. You feel like her attitude is more of a soldier’s than a police " + getOfficer(false) + "’s.</p>" +
			"<p>Anyway, she has the keys to all cells so escaping from here is no longer a problem to you. You can leave anytime.</p>"
		);
	}

	if (perDA.other == 50) md.write('<p>' + getProsecutor() + ' White stares out at you from another cell. "Let me out of here you <i>monster</i>," she rails.  "I don\'t know how you...  you...  just let me out of here!"</p>');
	else if (perDA.place == 261 && !perDA.isCharmedBy()) md.write('<p>' + getProsecutor() + ' White is waiting for you to tell her your information</p>');
	if (perMG.place == 261) md.write('<p>You see Mrs Granger watching you in a nearby cell.</p>');
	if (perCharlie.place == 261) md.write('<p>You see Charlie looking nervous in one of the cells.</p>');

	startQuestions();

	//If Smith is CHARMED and Mrs Granger Jumped Gina @ the Museum and you do not have the vase
	if (clvS > 0 && perMG.other >= 50 && (perMG.checkFlag(1) || perMG.checkFlag(4)) && !isPlaceKnown("MechanicsShop"))
	{
		if (perS.other === 0) addQuestionC(md, 'ask Becky about the Museum', "OfficerSmith", 9301);
		if (perS.other == 2) addQuestionC(md, 'ask if the vase was found', "OfficerSmith", 9302);
	}

	if (clvS > 0)
	{
		if (perYou.isArrested() && clvDA === 0) {
			// Under Arrest and DA white is NOT CHARMED
			if (isMurderPath()) addQuestionC(md, 'order Becky to take out ' + getProsecutor() + ' White', "OfficerSmith", 93100);
			else if (clvDA === 0 && clvBatton === 0 && perBatton.place == 168 && perDA.place != 261) addQuestionC(md, 'order Becky to get ' + getProsecutor() + ' White in here', "OfficerSmith", 1000);
		}
		addLinkToPlace(md, 'order Becky to strip again', 261, 'type=beckystrip');
	}

	if (perDA.place == 261 && !perDA.isCharmedBy()) addQuestionC(md, 'refuse to tell ' + getProsecutor() + ' White anything', "OfficerSmith", 1001);
	else {
		if (clvS > 0) addLinkToPlaceC(md, '"That is all for now Becky"', 260);
		else addLinkToPlaceC(md, '"Nothing more ' + getOfficer() + '"', 260);

		if (perMG.place == 261 && (perMG.other == 54 || perAbby.getQuestDragonGem() == 5)) {
			//Ready to talk about the Dragon Vase or HAVE it on you
			addQuestionC(md, 'ask Mrs. Granger about the dragon vase', "MrsGranger", 2354);
		}

		if (!perYou.isArrested() || clvS > 0) {
			// NOT under arrest, or Becky is CHARMED
			addLinkToPlace(md, 'exit the jail cell', 168);
		}
	}

	if (perDA.other == 50 || perMG.place == 261 || (perDA.place == 261 && !perDA.isCharmedBy()) || perCharlie.place == 261) {
		AddRightColumnLarge(md);
		if (perDA.other == 50 || perDA.place == 261) perDA.showPerson("diane8.jpg");
		if (perMG.place == 261) perMG.showPerson("!granger-jail1.jpg");
		if (perCharlie.place == 261) perCharlie.showPerson("break-jail2.jpg");
	}

	WritePlaceFooter(md);
}