function FindIt342()
{
	if (isRunes()) Research("Spell", "Dest", "kurndorf.jpg", 342);
	else gotoPlace(342, 'type=learninvisibility');
}

function ShowPlace342()
{
	var md = WritePlaceHeaderNI(false, "", "black");

	var mySex = perYou.getSex();

	md.write('<img src="Images/People/Kurndorf/kurndorf.jpg" style="float:left;margin:0px 5px" alt="Kurndorf">');

	// BEGIN - General Description
	// TITLE LINE
	addPlaceTitle(md, "Ghost of Carl Kurndorf");

	// Description
	md.write('<p>The ghost of Kurndorf hovers weightlessly before you.  Even though the Séance is over it would seem that he still has enough power to maintain his presence here, at least for now.</p>');

	if (perKurndorf.getQuestGhost() == 85) // Describing the Ritual
	{
		md.write(
			'<p>"You see, my ' + mySex + ', before I was so rudely interrupted by that backstabbing witch Jessica I was about to cast a powerful spell that would have solidified my control of the entire town."</p>' +
			'<p>"Once that spell had been cast I would have been unstoppable within my own domain - the very town itself would have been <i>bound</i> to me, as if an extension of my will.</p>' +
			'<p>"Think of it," he says, a glint of reverence in his eyes. "To have any person in the town at my command.  To not have to seek out individuals and cast a spell over and over, slowly gathering followers and scrounging for every ounce of magical power. ' +
			'Instead, with this ritual, you would already have your fingers inside the minds of every citizen of the town - needing only to flex your own will to bow others to your control.</p>' +
			'<p>He looks at you, trying to gauge your reaction to his tale.  "So, what do you say?  Shall I instruct you in how to cast this spell yourself?" he asks.</p>'
		);
	}

	var nPrep = setBitFlag(0, 1, perKurndorf.checkFlag(11));
	nPrep = setBitFlag(nPrep, 2, perKurndorf.checkFlag(12));
	nPrep = setBitFlag(nPrep, 3, perKurndorf.checkFlag(13));
	nPrep = setBitFlag(nPrep, 4, perKurndorf.checkFlag(14));
	nPrep = setBitFlag(nPrep, 5, perKurndorf.checkFlag(15));
	nPrep = setBitFlag(nPrep, 6, perKurndorf.checkFlag(16));
	nPrep = setBitFlag(nPrep, 7, perKurndorf.checkFlag(17));
	nPrep = setBitFlag(nPrep, 8, perKurndorf.checkFlag(8));

	if (perKurndorf.getQuestGhost() >= 100) //Ritual Preparation has begun
	{
		if (nPrep < 255) {
			//Still haven't collected everything
			md.write(
				'<p>Kurndorf looks at you for a moment.  "Yes.  To begin, you must collect a few items.  Namely you will need to find chalk, salt, a chalice of some sort, a silver dagger, a large quartz crystal, a small branch of hemlock, some candles, a lock of your hair... Oh yes, and a human skull.</p>' +
				'<p>Kurndorf waits patiently for you to return with all of the requirements for the ritual.</p><p><i>When you have an item, <b>use</b> it here to prepare for the ritual</i></p><p>'
			);
		} else {
			md.write('<p>"Excellent, my ' + mySex + '. It would seem you have everything we need... ');
			if (perYourBody.FindItem(56) === 0) md.write(' Well, almost everything.  You will still need a piece of the individual subject of the ritual.  In this case, <i>you</i>.  A cutting of your hair perhaps?"</p>');
			else md.write('"</p>');
		}

		if (nPrep > 0)
		{
			if (perKurndorf.checkFlag(17)) md.write(' <i>The chalk circle and pictograms have been drawn on the floor.</i><br>');
			if (perKurndorf.checkFlag(15)) md.write(' <i>The beeswax candles have been placed and lit.  They seem to burn forever.</i><br>');
			if (perYourBody.FindItem(56) > 0) md.write(' <i>You have a lock of your hair</i>');
			else if (perYourBody.FindItem(55) > 0) md.write(' <i>You have some scissors that you can use to cut a lock of your hair</i>');
			md.write('<br>Things on the Altar: ');

			if (perKurndorf.checkFlag(12)) md.write('<i>Ritual Chalice,</i> ');
			if (perKurndorf.checkFlag(13)) md.write('<i>the Crystal,</i> ');
			if (perKurndorf.checkFlag(14)) md.write('<i>the Dagger,</i> ');
			if (perKurndorf.checkFlag(11)) md.write('<i>the Salt,</i> ');
			if (perKurndorf.checkFlag(16)) md.write('<i>the Hemlock,</i> ');
			if (perKurndorf.checkFlag(8)) md.write('<i>the Skull</i>');

			md.write('</p><br>');
		}
	}

	// Dialogue Options
	//**********************************************************************
	startQuestions();

	if (isItemHere(57, 342)) {
		//The skull has been "USED" here
		addLinkToPlace(md, 'examine</i> the skull on the altar', 342, '', '', '', 'perKurndorf.setFlag(8,false);perKurndorf.setFlag(18,false);perYourBody.RemoveItem(57);perYourBody.PutItem(57);');
	}
	if (perKurndorf.getQuestSeance() == 100) addQuestionC(md, '"Uhm, why are you still here?"', "Kurndorf", 27100);
	else if (perKurndorf.getQuestSeance() == 105) addQuestionC(md, '"So does that mean you can leave?"', "Kurndorf", 27105);
	else if (perKurndorf.getQuestSeance() == 110) addQuestionC(md, '"What exactly did Jessica do?"', "Kurndorf", 27110);
	else if (perKurndorf.getQuestSeance() == 115) addQuestionC(md, '"Is that the reason the Dai chu..."', "Kurndorf", 27115);

	if (perKurndorf.getQuestGhost() == 50) addQuestionC(md, '"Why did you help me before?"', "Kurndorf", 14350);
	else if (perKurndorf.getQuestGhost() == 55) addQuestionC(md, '"Why would you want to save my life?"', "Kurndorf", 14355);
	else if (perKurndorf.getQuestGhost() == 60) addQuestionC(md, '"You didn\'t answer my question."', "Kurndorf", 14360);
	else if (perKurndorf.getQuestGhost() == 65) addQuestionC(md, '"Help you?  Why would I help you?"', "Kurndorf", 14365);
	else if (perKurndorf.getQuestGhost() == 70) addQuestionC(md, '"And what would you want in return?"', "Kurndorf", 14370);
	else if (perKurndorf.getQuestGhost() == 75) addQuestionC(md, '"You would give up magic just to have a body?"', "Kurndorf", 14375);
	else if (perKurndorf.getQuestGhost() == 80) addQuestionC(md, '"What can you teach me?"', "Kurndorf", 14380);
	else if (perKurndorf.getQuestGhost() == 101) {
		//Blocked from Chalice - needs Invisibility
		addQuestionC(md, '"I can\'t get all the stuff for the ritual."', "Kurndorf", 143101);
	} else if (perKurndorf.getQuestGhost() == 102) addQuestionC(md, '"Is there anything you can <i>teach</i> me that might help?"', "Kurndorf", 143102);

	if (perKurndorf.getQuestGhost() == 103 && !isSpellKnown("Invisibility")) {
		if (perKurndorf.checkFlag(22) || perKurndorf.checkFlag(23)) addOptionLink(md, 'try to learn the spell', "FindIt342()");
		else {
			startAlternatives(md);
			if (perYourBody.FindItem(41) > 0 && ((perYou.checkFlag(18) && nMana > 19) || perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)) addLinkToPlaceC(md, 'reluctantly agree to his price', Place, 'type=kurndorfprice');
			else addLinkToPlaceC(md, 'reluctantly agree to his price', Place, 'type=kurndorfpricebadend');
			addQuestionC(md, '"No, never!"', "Kurndorf", 143103);
			endAlternatives(md);
		}
	}
	if (perKurndorf.getQuestGhost() > 80 && perKurndorf.getQuestGhost() < 100) {
		//After you know about it but BEFORE you START it.
		addQuestionC(md, '"Teach me the ritual.  Tell me what I have to do."', "Kurndorf", 143100);
	}

	if (perKurndorf.getQuestGhost() >= 100 && perKurndorf.getQuestGhost() < 200 && nPrep == 255 && (perYourBody.FindItem(55) > 0 || perYourBody.FindItem(56) > 0)) {
		//Ritual has started and all the pieces are there.
		addLinkToPlace(md, 'start the ritual', 343);
	}
	addLinkToPlace(md, 'leave Kurndorf\'s "prison"', 161);

	WritePlaceFooter(md);
}