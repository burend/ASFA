// Tess Adam's Office and she IS Charmed

function ExitTessOfficeR()
{
	movePerson("MsTitus", 3); // Put the Receptionist back at her desk
	dispPlace(3, "");
	WriteComments('You leave Tess and Ms. Titus for now, and within a few minutes Ms. Titus follows looking mildly annoyed.');
}

function ShowPlace29(stype)
{
	var md = WritePlaceHeader(false, "td-left-med");

	var perTitus = findPerson("MsTitus");
	var plcTitus = perTitus.place;
	var perTess = findPerson("Tess");

	// Image
	if (plcTitus == 29) perTitus.showPerson(perTitus.checkFlag(9) ? "titus21b.jpg" : "titus21a.jpg");
	else perTess.showPerson("tess6.jpg");

	addPlaceTitle(md, "Tess Adams Under A Charm Spell");

	if (perTess.other == 5 && ((nMana < 10 && (nTime - perTess.extra[0] > 24)) || (nTime - perTess.extra[0] > 288)) && perYourBody.FindItem(24) === 0)
	{
		// Event for research completed
		// Happens 2 hrous after asking and you have < 10 mana or 24 hours later period
		PlaceI(24, 29);
		perTess.setFlag(3); // Found it, but basically unused as perTess.other is the controlling flag here
		perTess.other = 2;	// set her able to be sent to your home
		perTess.extra[0] = 0;
		perYou.addExperience(1);
		showPopupWindow("Tess\'s Research",
			perTess.addPersonString("tess5a.jpg", "height:max%", "right") +
			'"I\'m so glad that you\'ve returned ' + perYou.getPersonName() + '. Through my research I found the location of this gold stone, it was in the library archives and Monique got it for me. Please take it..." she says, her eyes straying all over your body as she begs you.</p>' +
			'<p><img src="Images/Items/stone3.png" style="float:left;width:10%;margin-right:5px" alt="Stone">' +
			'The stone is not like any other you have seen before, a gold colour but probably more like iron pyrites than actually gold. You know the difference from your days of collecting minerals, you have some of it in your collection in your room. ' +
			'You reach out to touch it and feel a tingle and you can sense the power in it, so you now know about these different sort of stones.</p>'
		);

	} else if (plcTitus !== 29) {
		// Only Tess is here
		if (stype == "continue") {
			// After 'order her to stay'
			md.write(
				'<p>"Oh , ' + perYou.getPersonName() + '." Tess says.  "I\'m so confused, I feel so much more alive when you are here. It must be the warmth in here. I... I really feel that I have to see my husband and tell him about what I\'m feeling. I have to leave.  Please?"</p>'
			);

		} else {
			if (perTess.checkFlag(8)) {
				// She has been to your bedroom
				md.write(
					'<p>"Oh , ' + perYou.getPersonName() + '." Tess says.  "I\'m so glad you\'re back."</p>' +
					'<p>"I\'ve needed you so much since you left but now that you\'re here I feel alive again. It must be the warmth in here."</p>'
				);
			} else {
				md.write(
					'<p>"Oh , ' + perYou.getPersonName() + '." Tess says.  "I\'m so glad you\'re back."</p>' +
					'<p>"I\'ve needed you so much since you left but now that you\'re here I feel alive again. It must be the warmth in here. I... I really feel that I have to see my husband and tell him about what I\'m feeling. I have to leave.  Please?"</p>'
				);
			}
		}

	} else {
		// Ms. Titus is here
		if (perTitus.checkFlag(9)) {
			// Possible submission
			md.write(
				'<p>Ms. Titus joins you in the room.  She gives you a very odd glance, before focusing her attention on Tess. She looks at Tess\'s mostly undressed state, glancing from her, to you and back again.</p>' +
				'<p>"Well Tess, I did not think you would cheat so blatantly on your husband, and with this...person. I mean I practically saw ' + perYou.getHimHer() + ' chase you out of here and then basically drag you back!"</p>' +
				'<p>Tess looks terribly embarrased and torn, she is still worried about her husband but the spell is drawing her to you. She does mutter "but I wanted to come back...". You do not know what to say, so you snap at Ms. Titus,</p>' +
				'<p>"Tess is a lovely woman and she is so excited now that she is mine. She is kind, unlike you who is a bitch who goes out of her way to taunt her friend like that. Why don\'t you just shut up!"</p>' +
				'<p>You realise you may of gone too far, but you see Tess look at you relieved that you stood up for her. Ms. Titus on the other hand looks more curious than angry,</p>' +
				'<p>"Tess is yours, like some sort of...", Ms. Titus trails away.</p>'
			);

		} else {
			md.write(
				'<p>Ms. Titus joins you in the room.  She gives you a curious glance, before focusing her attention on Tess. She looks surprised at Tess\'s mostly undressed state, glancing from her to you and back again.</p><p>"I did not know you had it in you Tess...but that aside, what is it, Tess?", she demands. "What did you want?"</p>' +
				'<p>Tess looks a bit embarrassed at Ms. Titus\'s comments and makes up an excuse about problems with her computer.  Irritated, Ms. Titus tells her to <i>dress</i> and go file incoming books while she sorts things out.</p>'
			);
		}
	}

	//*******************************************************************************
	startQuestions();

	// Charmed Path Options
	if (plcTitus != 29)
	{
		// Ms. Titus is not here
		// Haven't learned "Pass" yet
		if (!perTess.checkFlag(10) && !isSpellKnown("Pass")) addQuestionCO(md, 'tell Tess to look something up for you', "Tess", 2105);
		// Learn a training
		if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');

		if (!perTess.checkFlag(8) && perTess.other != 5) addLinkToPlaceC(md, "order Tess to stay", Place, 'type=charmtess2');
		else if (perTess.checkFlag(8)) {
			if (!checkPlaceFlag("Library", 1)) addLinkToPlaceC(md, "close the door for some private time with Tess", 29, 'type=private');
			else addLinkToPlaceC(md, "have some private time with Tess", 29, 'type=private');
		}

		if (perTess.other <= 1) addQuestionC(md, 'tell Tess to stay here and research more magic spells', "Tess", 2001);
		if (perTess.other <= 2 || perTess.checkFlag(8)) addQuestionC(md, perTess.checkFlag(8) ? 'let\'s return to my home' : 'order Tess to come to your house and wear something sexy', "Tess", 2002);
		if (perTess.other == 5) addQuestionCO(md, 'tell Tess to forget about the research', "Tess", 2005);

		// Receptionist isn't charmed yet?
		if (!(perTitus.isCharmedBy() || perTitus.isFreeSlave())) addQuestionC(md, 'tell her to invite the library receptionist in here.', "Tess", 2003);
		if (perTess.checkFlag(8)) {
			if (isCharmedBy("Monique") && wherePerson("Monique") == 8) {
				if (perTitus.isCharmedBy() || perTitus.isFreeSlave()) addLinkToPlaceC(md, "bring in all the librarians", 29, 'type=all');
				addLinkToPlaceC(md, "invite Tess to bring in Monique to further assist", 29, 'type=tessmonique');
			}
			if (perTitus.isCharmedBy() || perTitus.isFreeSlave()) addLinkToPlaceC(md, "invite Tess to bring in Ms. Titus to further assist", 29, 'type=tesstitus');
		}

		addLinkToPlace(md, "go to the reception area.", 3);

	} else {
		if (perTitus.checkFlag(9)) addLinkToPlace(md, "kiss Tess, turn your back on Ms. Titus and leave", 29, 'type=slave1');
		else addOptionLink(md, "leave them and go to the reception area.", 'ExitTessOfficeR()');
	}

	WritePlaceFooter(md);
}