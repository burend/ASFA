// Crime scene at the Mansion

function ShowPlace65(stype)
{
	var perK = findPerson("OfficerKhan");
	var md;

	if (stype == "arrested") {
		// You are arrested
		md = WritePlaceHeader();

		perK.showPerson("pol2.jpg");

		findPerson("Diane");
		if (per.getQuestArrested() < 10) per.setQuestArrested(10);

		perYourBody.DropAllItems("Diane");
		perYou.setArrested(2);		// Reason for being ARRESTED = Murder

		addPlaceTitle(md, "Under Arrest");
		md.write('<p>The ' + getOfficer(false) + ' quickly grabs your wrists and slaps handcuffs on before you realise what has happened. Fear grips your heart and you let yourself be led to jail.</p>');

		startQuestions();
		addLinkToPlace(md, "go to jail?", 260);

		WritePlaceFooter(md);
		return;
	}

	if (getPersonOther("Mom") < 5 && !isCharmedBy("OfficerKhan")) {
		// bloody shirt and Khan NOT charmed??
		md = WritePlaceHeader();
		perK.showPerson("pol2.jpg");

		addPlaceTitle(md, "Evidence");

		md.write(
			'<p>A police ' + getOfficer(false) + ' eyes you and sees that you have blood stains on your shirt.</p>' +
			'<p>"Stop in the name of the law!" she yells. Her gun points at your face. "You are under arrest for suspicion of murder."</p>' +
			'<p>There is nowhere to run and police surround you before you can cast a spell.</p>'
		);

		startQuestions();
		addLinkToPlace(md, "go calmly", 65, 'type=arrested');
		addLinkToPlace(md, "run from " + perGates.getPersonNameShort() + "\'s estate?", 16);

		WritePlaceFooter(md);
		return;
	}

	if (perK.isCharmedBy()) {
		md = WritePlaceHeader();
		perK.showPerson("pol8.jpg");
	} else if (getPersonOther("Mayor") == 10 || perK.other == 11) {
		md = WritePlaceHeader();
		perK.showPerson("pol3.jpg");
	} else {
		md = WritePlaceHeader(false, "td-left-med");
		perK.showPerson("pol1.jpg");
	}

	addPlaceTitle(md, "Crime Scene");

	if (perK.isCharmedBy()) {
		// If Khan is CHARMED
		md.write('<p>' + getOfficer() + ' Khan meets your gaze. "Oh ' + perYou.getMaster() + '," she gasps between deep breaths. "Please tell me what you want of me."</p>');
		if (getPersonOther("Mom") < 5) md.write('<p>"Oh, ' + perYou.getMaster() + ', your clothes?!?  They\'re still covered in blood.  Leave quickly before one of the other officers notices!"</p>');
	}	else {
		if (!perK.checkFlag(1)) {
			perK.setFlag(1);
			showPopupWindow("Police " + getOfficer(),
				perK.addPersonString("pol13a.jpg", "height:max%", "right") +
				"You recognise Ms Khan is the " + getOfficer(false) + " standing in front of you. She used to live next door to your house. Your mother talked to her a lot back in the day and sometimes Ms Khan even visited your house for dinner. " +
				"From these visits you learned that she did not want to be an " + getOfficer(false) + " first, she was more interested in becoming a soldier. However, her dominant nature and harsh attitude made her realize that by becoming a police " + getOfficer(false) + " she could exercise her power over the people quicker and easier. So, yeah, your first impressions of her were not so good...she’s and uptight and arrogant bitch who’s hunger for power could only be matched by her heavenly body and appearance and it looks like she hasn’t changed a bit. " +
				"She worked her way through the ladder and is now the right hand woman to " + getPoliceChief() + " Batton.<br><br>" +
				"She comes to you and shakes your hand, introducing herself in the process. She doesn’t seem to recognise you. What a surprise!",
				'setPersonFlag("OfficerKhan",1);'
			);
		}

		md.write(
			'<p>A police ' + getOfficer(false) + ' stops you. She has been inspecting the body of ' + perGates.getPersonNameShort() + ' which lies nearby.' +
			'<p>You nervously gulp with the guilt of committing a murder. ' + perGates.getPersonNameShort() + ' lies still, blood drying on his clothes. Remembering the blood stains on your own clothes, you look down to check if any are on your jeans. They are clean.</p>'
		);

		if (perK.other === 10) {
			// Offered to help the mayor w/ the investigation
			md.write(
				'<p>"The Mayor sent you to help, eh?  Perhaps you can give me a hand," she says. The forensics expert looks over, curious.' +
				'"Shot at point-blank range by the look of it ," says the ' + getOfficer(false) + '. "You can\'t see much else from the body, but I\'d like to turn him over."</p>'
			);
		}	else if (perK.other == 11) md.write('<p>' + getOfficer() + ' Khan waits patiently for you to analyse the crime scene.</p>');
		else md.write('<p>There is a forensics investigator nearby, analysing the scene.</p>');
	}

	if (perK.other === 0 && !perK.isCharmedBy()) md.write('<p>The ' + getOfficer(false) + ' looks at you with a suspicious eye. "Excuse me," she says. "This is a crime scene and we are looking for witnesses. Can I have your name please?"</p>');

	// ************************************************************************
	startQuestions();

	if (perK.isCharmedBy()) addQuestionC(md, 'order Cheryl to take you to the police station', "OfficerKhan", 521);

	if (perK.other === 0) addQuestionC(md, 'tell the ' + getOfficer(false) + ' your name and ask what is going on', "OfficerKhan", 530);
	else if (perK.other == 1) addQuestionC(md, 'ask how ' + perGates.getPersonNameShort() + ' was murdered', "OfficerKhan", 531);
	if (perK.other == 2) {
		// Haven't told the mayor you want to help
		addQuestionC(md, 'tell the ' + getOfficer(false) + '  that the mayor sent you to help', "OfficerKhan", 1610);
	}
	if (perK.other === 10) {
		// Told mayor you wanted to help
		addQuestionC(md, 'tell her you can\'t work with all these people around.', "OfficerKhan", 5310);
	}

	addLinkToPlace(md, perK.isCharmedBy() ? 'go to the rear of the house' : 'sneak past the police to the rear of the house', 20);

	if (isPlaceKnown("SacredClearing")) {
		/* Know about the sacred clearing */
		addLinkToPlace(md, 'walk to the Sacred Clearing', 141);
	}

	addLinkToPlace(md, 'exit ' + perGates.getPersonNameShort() + '\'s estate?', 16);

	WritePlaceFooter(md);
}