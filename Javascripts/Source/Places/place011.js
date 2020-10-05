// Place: Beasley's Office

function ShowPlace11()
{
	var md;
	var bCharmed = perBeasley.isCharmedBy();
	var perLeanne = findPerson("Leanne");
	
	//If (Book was lost to Beasley) && (Beasley is NOT CHARMED)
	if (whereItem(4) === 76 && (getBeasleyServant() === 50 || perYou.checkFlag(8)))
	{
		//Finished out the Beasley Apprentice Path
		//or
		//DA has told you where the book is.
		// Already done the Amy+Catherine threesome? Did you free them?
		if (!perBeasley.checkFlag(3) || isCharmedBy("Catherine", "MrBeasley")) return dispPlace(74);
	}
	// Sets if Beasley is IN or OUT of his office...
	var nm = perBeasley.getPersonName();
	if (!isShopOpen(2) || perBeasley.place !== 11) {
		// Mr Beasley is NOT in his Office
		md = WritePlaceHeader(true);
		md.write('<table class="table-main" style="vertical-align:top"><tr><td>');
		addPlaceTitle(md, nm + "'s Office", '', 0, true);
		md.write(
			'<p style="text-align:center"><img src="Images/school-beasleyoffice.jpg" style="display:block;margin-left:auto;margin-right:auto;width:30%" alt="Empty"></p>' +
			'<p>The office is empty '
		);
		if (isDay()) md.write(', Mr. Beasley must have gone somewhere with his students.</p>');
		else md.write('at this time of night.</p>');
		if (perBeasley.checkFlag(4)) md.write('<p>The desk draw is open.</p> ');
		else md.write('<p>The desk drawers are securely locked.</p> ');

		if (perBeasley.place != 11 && perYou.getExperience() > 7 && whereItem(7) === 0 && !isPlaceKnown("RobbinsHouse")) {
			// Puts Robbins Address in the Room
			PlaceI(7, 11);
		}
		if (whereItem(7) == 11) md.write('<p>Looking around the room you see an address book on his desk. ');
		if (perYou.getExperience() > 10 && !perBeasley.checkFlag(5)) {
			// 12>10 and message hasn't been deleted yet.
			md.write('Mr. Beasley\'s desk telephone light is flashing. It looks as though there is a message.</p>');
		}
		startQuestions();
		if (perYou.getExperience() > 10 && !perBeasley.checkFlag(5)) addLinkToPlace(md, "listen to the telephone message", 159);
		addLinkToPlace(md, "exit the room", 70);
		WritePlaceFooter(md);
		return;
	}

	md = WritePlaceHeader(false, sType.indexOf("gabbyaskboundbeasley") != -1 && perBeasley.checkFlag(13) ? 'td-left-med' : '');

	var ynm = perBeasley.getYourNameFor();

	if (sType.indexOf("gabbyaskboundbeasley") != -1 && perBeasley.checkFlag(13)) perBeasley.showPerson("beasley8-bondage.jpg");
	else if (bCharmed) perBeasley.showPerson("beasley7.jpg");
	else perBeasley.showPerson("beasley1.jpg");
	var bGabbyTold = checkPersonFlag("Gabby", 1) && !isArrestPossible();

	addPlaceTitle(md, nm + "'s Office");
	if (bCharmed)  // Is he charmed
	{
		if (perBeasley.checkFlag(10)) md.write('<p>Miss Beasley giggles, "Oh ' + ynm + '," she says, admiring you in the way a teacher should not. "It\'s way wrong to use that suff on your teacher. If you you keep being bad you will have to punish your teacher...I mean like I will have to do you...punish you."');
		else if (perBeasley.checkFlag(11)) md.write('<p>Your slut, Miss Beasley stands as you enter the classroom, slightly panting, she was probably masturbating while she was on her own. "Oh ' + ynm + '," she says, looking lustfully at you in the way a teacher should not. "It is wrong for you leave your teacher without doing your assignment. I told you to fuck me!"');
		else if (perBeasley.checkFlag(12)) md.write('<p>"Oh ' + perYou.getMaster() + '," she says, looking at you submissively. "What do you want your teacher to do, or do to your teacher?"');
		else md.write('<p>"Oh ' + ynm + '," ' + perBeasley.getHeShe() + ' says, admiring you in the way a teacher should not. "It is wrong for you to use magic on your teacher. If you insist on misbehaving I will have to give you a suitable punishment."');

		if (whereItem(4) == 76) md.write('<p>"Oh yes," ' + perBeasley.getHeShe() + ' says, lust in ' + perBeasley.getHisHer() + ' eyes. "' + getProsecutor() + ' White had something of yours.  I took the liberty of retrieving it for you...  for safe keeping of course."</p>');
		else if (perYou.getExperience() >= 14 && !isSpellKnown("Possession") && !perYou.isBornMale() && perBeasley.other == 3) {
			//Don't have the possession spell
			md.write('<p>"I see you still have the book. I know a spell that you might want to learn"</p>');
		}
		if (perYou.checkFlag(12) && !perYou.checkFlag(25)) {

			if (bGabbyTold && !perBeasley.checkFlag(9)) md.write("<p>You consider what Gabby told you about hypnosis and consider asking " + nm + " about it.</p>");
			else {
				md.write("<p>You consider the hypnotic technique " + nm + " talked about, but ");
				if (!perYou.checkFlag(24)) md.write("you do not know the basics of hypnosis.</p>");
				else if (!perYou.canUseExperience(true)) md.write("you are not confident you can learn it, you think you need more practise with magic first.</p>");
			}
		}

	} else {

		md.write('<p>' + nm + ' looks tired from the day\'s work. As you enter, ' + perBeasley.getHeShe() + ' groans with despair of seeing another student, then recognises you.</p><p>');

		if (perYou.checkFlag(12) && !perYou.checkFlag(25)) {
			if (bGabbyTold && !perBeasley.checkFlag(9)) md.write("You consider what Gabby told you about hypnosis and consider asking Mr Beasley about it.</p><p>");
		}

		//  Serving Mr Beasley (lost book) OR  DA path
		if (getBeasleyServant() >= 50) md.write('So you are back ' + ynm + '. I lost the book earlier. Have you seen it?');
		else if (perYou.isBornMale())
		{
			if (perYou.getExperience() < 4) md.write('"Oh hello ' + ynm + ' I suppose that you are here to ask for an extension of your assignment. You know, I am rather tied up at the moment and have better things to do than to grant foolish young man like you extensions all the time.');
			else md.write('"Well hello again ' + ynm + '," ' + nm + ' sighs.  "What do you want now?');
		}
		else  // Meaning its female
		{
			if (perYou.getExperience() < 14) md.write('"' + ynm + '. So good to see you. If it\'s about an assignment extension then please take as long as you like. I can even give you personal tutoring if you like...');
			else
			{
				md.write('<p>"So you have returned, ' + ynm + '. ');
				if (!perBeasley.checkFlag(5)) {
				// Didn't Delete Davy's Message to Mr. Beasley
					md.write('  I know what you are up to and you can not cast your spells on me. I have shielded myself against magic. ');
				}
				if (perYou.getExperience() >= 14 && !isSpellKnown("Possession") && !perYou.isBornMale() && perBeasley.other == 3) {
					//Don't have the posession spell
					md.write('I see you still have the book. I know a spell that you might want to learn,');
				}
			}
		}
		md.write('" ' + perBeasley.getHeShe() + ' says, casting ' + perBeasley.getHisHer() + ' eyes over you.');
		if (perYourBody.FindItem(1)) md.write(' ' + perBeasley.getHisHer() + ' eyes focus on the paper in your pocket and ' + perBeasley.getHeShe() + ' grins, "Make sure to return the paper when you have finished studying it, you will find it enlightening"</p>');
		else md.write('</p>');
	}

	/*****************************************************************/

	startQuestions();

	if (perYou.checkFlag(12) && !perYou.checkFlag(25) && perBeasley.checkFlag(3)) {
		if (bGabbyTold && !perBeasley.checkFlag(9)) addQuestionC(md, 'ask ' + nm + ' about Hypnosis', "MrBeasley", 5505);
	}


	if (getPersonOther("Diane") == 9) addQuestionC(md, 'ask ' + nm + ' if ' + perBeasley.getHeShe() + ' has the book', "MrBeasley", 579);

	if (perYou.FindItem(4) > 0 && (perBeasley.other === 0 || (!isMurderPath() && !perBeasley.checkFlag(7) && !perBeasley.checkFlag(8)))) {
		if (!isMurderPath()) startAlternatives(md);
		addQuestionC(md, 'tell ' + nm + ' that you have the book', "MrBeasley", 190);
		if (!isMurderPath()) {
			addQuestionC(md, 'then again, it might be best to keep it secret from ' + perBeasley.getHimHer(), "MrBeasley", 189);
			endAlternatives(md);
		}
	} else if (perYou.FindItem(4) > 0 && (!isMurderPath() || perBeasley.other === 1) && !perBeasley.checkFlag(6) && perBeasley.checkFlag(7)) {
		startAlternatives(md);
		addLinkToPlaceO(md, 'give ' + nm + ' the book', 11, 'type=givebeasleybook');
		addQuestionCO(md, 'no way, keep the book', "MrBeasley", 187);
		endAlternatives(md);
	} else {
		if (perBeasley.other === 1) addQuestionC(md, 'ask ' + nm + ' what does mana do', "MrBeasley", 191);
		else if (perBeasley.other === 2 || perGates.other === 9) addQuestionC(md, perBeasley.other === 2 ? 'ask where you can find mana' : 'ask where to find magic stones', "MrBeasley", 192);

		if (perYou.getExperience() >= 14 && !isSpellKnown("Possession") && !perYou.isBornMale())
		{
			if (!bCharmed) // has NOT been charmed
			{
				if (perBeasley.other === 3) addQuestionC(md, 'ask ' + perBeasley.getHimHer() + ' about the spell', "MrBeasley", 193);
				else if (perBeasley.other === 4) addQuestionC(md, 'ask how much "compensation" ' + perBeasley.getHeShe() + '\'s talking about', "MrBeasley", 194);
				else if (perBeasley.other === 5) addQuestionCO(md, 'pay ' + perBeasley.getHimHer() + ' ' + sCurrency + '100 to learn the spell', "MrBeasley", 195);
			}
			else  // HAS been charmed but still has not learned Posession
			{
				if (perBeasley.other < 6) addQuestionCO(md, 'tell ' + nm + ' to teach you that spell ' + perBeasley.getHeShe() + ' mentioned', "MrBeasley", 1931);
			}
		}

		if ((perBeasley.other === 6 || perBeasley.other === 7) && !perYou.isBornMale()) addQuestionCO(md, 'try and research the spell again', "MrBeasley", 196);

		if ((perGates.other === 16 || perGates.other === 17) && !perBeasley.checkFlag(2)) {
			// Sent out to get the blue key by Gates
			addQuestionC(md, 'ask about an "old key"', "MrBeasley", 1000);
		}
		if (perLeanne.place == 382 && !perLeanne.checkFlag(11)) addQuestionC(md, 'ask about saving a person from demons', "MrBeasley", 700);
	}

	addLinkToPlace(md, "exit the room?", 70);

	WritePlaceFooter(md);
}
