// Place: Your Kitchen

function Leave45()
{
	if (perYou.getQuestRustyKey() == 7 && isDay()) {
		setPersonFlag('Madison', 1);
		perYou.setQuestRustyKey(10);
	}
}

function ShowPlace45(stype)
{
	var md = WritePlaceHeader();

	var perMom = findPerson("Mom");
	var perTracy = findPerson("Tracy");
	var perTess = findPerson("Tess");

	if (perYou.getQuestRustyKey() == 8 && whereItem(38) == 0) moveItem(38, 45);   // Didn't pick up magnet from Madison yet, then put it in the kitchen instead
	else if (perYou.getQuestRustyKey() == 900 && perYou.getExperience() > 12) PlaceI(38, 45); // Got the message wrong, game reasonably advanced, place Magnet in Kitchen

	var bImg = false;
	if (getQueryParam("event") == "") {
		if (perTracy.place == 1) // Sister Path Active
		{
			if (perTracy.whereNow() != 45) {
				// Sister in Laundry/Lounge
				//addPlaceImage(md, "kitchen1.jpg", "", "", "Kitchen");
				//md.write('<br>');
			} else {
				if (perTracy.isCharmedBy("You") > 0) perTracy.showPersonRandomDN("tracy5", isDay() ? 1 : 2);
				else perTracy.showPersonRandomDN("tracy1", 2);
				bImg = true;
			}
		} //else addPlaceImage(md, "kitchen1.jpg", "", "", "Kitchen");
	}

	var loanCompany = 0;
	if (nMoney < 25 && Math.random() < 0.1) loanCompany = 1; 	// If Less than $25 then 10% chance for bank message

	if (perYou.getExperience() > 5 && perMom.other === 0) {
		// If you don't know where Mom is, then now you do
		perMom.moveThem(154);
	}

	//  *********************************** Description ****************************

	addPlaceTitle(md, "26 Kollam Street Kitchen", !bImg ? "kitchen1.jpg" : "");
	md.write('<p>At home. Coming into your house always means passing through the kitchen.</p><p>');

	if (whereItem(31) === 0 && perYou.isShot()) {
		// Don't have the whistle yet, and HAVE been shot
		md.write('<p>' + getPoliceChief() + ' Kerry Batton, from the local police station, greets you as you enter. She is concerned as she tells you that Anita is still looking for you.</p>');
	}

	if (perMom.whereNow() == 154) {
		if (perMom.checkFlag(1)) md.write('<p>You hear a soft voice and some noise coming from your mother\'s bedroom.</p>');
		else md.write('<p>You hear a noise coming from your mother\'s bedroom. She must be home.</p>');
	} else if (perMom.place > 0) md.write('<p>Your mother is out of the house and her bedroom is locked.</p>');

	if (isDay() && perYou.getQuestRustyKey() == 1) {
		// Radio Quiz Message (to get Magnet)
		md.write('<p>The home telephone is ringing.</p>');
	}
	if ((isShopOpen(0) && ((getPersonOther("Mayor") === 3 && wherePerson("Mayor") === 0) || loanCompany === 1)) || getBeasleyServant() === 7  || getBeasleyServant() === 11) {
		md.write('<p>The home phone has a light indicating there is a voice message.</p>');
	}

	if (isDay() && perYou.getQuestRustyKey() == 7) md.write('<p>You hear the sound of a delivery van, then a knock on the door</p>');
	else if (perYou.getQuestRustyKey() == 900 && whereItem(38) == 45) md.write('<p>One of the fridge magnets has fallen off and broken on the floor.  The decoration is ruined, but the magnet seems fine.</p>');

	//**********************  Dialogue Options ********************************

	startQuestions();
	if (getHour() > 5 && getHour() < 8 && !perTracy.checkFlag(1) && (perMom.whereNow() == 154 || perTracy.place == 1 || perTess.place == 46)) addLinkToPlace(md, 'have breakfast', 45, 'type=breakfast');

	if (getBeasleyServant() == 7) {
		addListenMessage(md,
			'<b>Phone Message</b><br>' +
			'You listen to the message on the answering machine.</p>' +
			'<p>&quot;Hello,&quot; says a rough voice. It sounds like Mr. ' +
			'Beasley. &quot;I wanted to thank you for the book ' + perYou.getPersonName() + '.</p>' +
			'<p>As you can guess by now, I know a spell or two myself and, thanks to your little gift, I can learn ' +
			'more. I bumped into Ms. Jones, who said that you are trying to ' +
			'find me. I advise you to stop or you will lose more than just an old book.&quot;</p>' +
			'<p>Mr. Beasley\'s voice takes an evil twist, making a chill run down	your spine.</p>' +
			'<p>After a slight pause the message continues, &quot;I am truly ' +
			'grateful for what you have given me so far and I may have a ' +
			'position open for another assistant if you prove useful. Help me find one ' +
			'more thing and I promise you a reward that you will remember for a ' +
			'long time. In the book I have read the words <em>Dai Chu</em>. I ' +
			'must have the meaning of these words. Tell me where I can find ' +
			'this information and I will reward you handsomely.&quot;</p>',
			'', 
			'if (getBeasleyServant() == 7) setBeasleyServant(8);'
		);
	} else if (getBeasleyServant() == 11) {
		addListenMessage(md,
			'<p>You listen to the message on the answering machine. It is Mr. Beasley again.</p>' +
			'<p>&quot;So ' + perYou.getPersonName() + ', you have ' +
			'served me well already. If I knew that you had such a knack for ' +
			'finding things I may have employed you earlier than today. Not ' +
			'only did you get the book away from ' + perGates.getPersonNameShort() + ' but you have found ' +
			'the location of the Dai Chu spell as well. I would never have thought of ' +
			'the alley. I really have to thank you for that.&quot;</p>' +
			'<p>You wonder how Mr. Beasley could have found out about the spell\'s ' +
			'location before you told him. Did somebody see you reveal the ' +
			'secret? <b>Only Tracy knew that you found the location</b>.</p>' +
			'<p>Mr. Beasley\'s message continues, &quot;In appreciation of your ' +
			'work I have arranged the reward as promised. Come to the school ' +
			'and claim the satisfaction of every youngster.&quot;',
			'', 
			"setPlaceKnown(\\'FrenchClassroom\\');if (getBeasleyServant() == 11) setBeasleyServant(30);"
		);
	} else if (isDay() && loanCompany == 1) {
		var chance = Math.random();
		if (nMoney > 19) chance = 1;
		if (chance < 0.5) {
			addListenMessage(md,
				'<p>&quot;Hello ' + perYou.getPersonName() + ',\" says the bank manager. \"Congratulations for winning our saver of the minute prize. We have sent ' + sCurrency + '2.00 to your house. Spend it wisely.&quot;</p>' +
				'<p>An envelope slides through your front door letter latch. You pick it up and incredibly find ' + sCurrency + '2.00.</p>',
				'',
				'AddCash(2)'
			);
		} else {
			addListenMessage(md,
				'<p>\"Hello ' + perYou.getPersonName() + ',\" says the bank manager. \"We want to tell you that the Friendly Loan Company is the bank of your choice.\"</p>'
			);
		}
	}
	else if (isDay() && perYou.getQuestRustyKey() == 1) addLinkToPlaceC(md, 'answer the home telephone', 287);

	if (perMom.place == 154 || perMom.other > 0) {
		if (getQueryParam("event") == "mombreakfast") addLinkToPlace(md, 'go to Mom\'s bedroom', 45, '', 'Mom is making breakfast so no need to visit her room now');
		else if (perMom.place == 899) addLinkToPlace(md, 'go to Mom\'s bedroom', 45, '', 'Mom is still out with Aunt Brandi so no need to visit her room now');
		else addLinkToPlace(md, 'go to Mom\'s bedroom', 154, '', '', '', "Leave45()");
	}

	addLinkToPlace(md, 'look in the attic', 408);
	if (perJesse.whereNow() !== 6) addLinkToPlace(md, 'go to the living room', 374, '', '', '', "Leave45()");
	addLinkToPlace(md, "enter the bathroom", 40, '', checkPersonFlag("Vampyre", 12) && isPersonHere("Vampyre") ? 'The Vampyre leaves the bathroom, hissing something about running water, that she will wait for you in the kitchen and telling you to hurry.' : '', checkPersonFlag("Vampyre", 12) && isPersonHere("Vampyre") ? 'Vampyre' : '');

	if (perYou.getQuestRustyKey() == 7 && isDay()) addLinkToPlace(md, 'leave your house', Place, 'type=madisondelivery1&met=true');
	else addLinkToPlace(md, 'leave your house', 44);

	if (whereItem(31) === 0 && perYou.isShot()) {
		// Officer Batton is there to give the whistle
		AddPeopleColumnMed(md);
		var perBatton = findPerson("OfficerBatton");
		perBatton.showPerson("polb1.jpg");
	}

	WritePlaceFooter(md);
}