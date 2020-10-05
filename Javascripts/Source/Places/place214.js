// Place: Hospital Foyer

function ShowPlace214(stype)
{
	var md = WritePlaceHeader();
	var perMG = findPerson("MrsGranger");
	var perOK = findPerson("OfficerKhan");
	var perNS = findPerson("NurseSandra");
	var ele = isBritish() ? "lift" : "elevator";

	// Images + Title
	addPlaceImage(md, "hospdesk.jpg");

	if (perMG.other >= 54 && perMG.place == 278 && !isMurderPath() && perMG.checkFlag(3) && checkPlaceFlag("Hospital", 2)) {
		md.write('<p style="text-align:center">Ride the ' + ele + '<br><img src="Images/elevatorbuttons.jpg" style="margin: 5px 5px;width:75%" alt="Elevator" title="The elevator"></p>');
		addLinkToPlace(md, isBritish() ? "First Floor" : "Second Floor", 444, '', '', '', '', 'hailblock');
		addLinkToPlace(md, "Basement", 442, '', '', '', '', 'hailblock hailup');
	}

	addPlaceTitle(md, "Hospital Foyer");

	// Description
	md.write(
		'<p>The public areas of the hospital, with visitor access to the various wards and a desk for reception. You have never seen someone at the desk, this hospital is a little understaffed at times.</p>' +
		'<p>There is ' + (isBritish() ? "a lift" : "an elevator") + ' leading to the other levels of the hospital, but you have had little reason to visit them.</p>'
	);
	if (!checkPlaceFlag("Hospital", 2)) {
		md.write("<p>You notice a black framed picture of a pretty nurse near the front desk.</p>");
	}


	if (perMG.other >= 54 && perMG.place == 278 && !isMurderPath() && perMG.checkFlag(3)) {
		if (perOK.isCharmedBy()) md.write("<p>You notice up the corridor in front of Ward 1 East, your slave " + getOfficer() + " Cheryl Khan.</p>");
		else md.write("<p>You notice up the corridor in front of Ward 1 East, a police " + getOfficer(false) + " on guard.</p>");
	}

	// Question
	startQuestions();
	addLinkToPlace(md, "wait for a while", '', '', 'You sit in the waiting area for a time', '', 'WaitHere(5);');

	if (!checkPlaceFlag("Hospital", 2)) {
		addPopupLink(md, 'look at the picture', "In Memory Of Keana",
			"<img src='Images/" + findPerson("Ghost").getImg('ghostnurse0.jpg') + "' style='width:40%;float:right;margin-left:5px' alt='Nurse'>" +
			"The picture bears a short message<br><br>" +
			'"In memory of our friend Keana, a beautiful and talented nurse. Her life was tragically cut short, we all miss her terribly"',
			true, 'setPlaceFlag("Hospital",2);dispPlace(214' + (perYou.isShot() ? ')' : ',"type=meetsandra")')
		);
	}

	if (perMG.other >= 50 && perMG.checkFlag(1)) {
		if (!perMG.checkFlag(5) && !isMurderPath() && perMG.checkFlag(3)) {
			perOK.setFlag(1);
			perOK.place = 278;
			showPopupWindow("Police Officer",
				perOK.addPersonString("pol13a.jpg", "height:max%", "right") +
				"You notice a police " + getOfficer() + " leaving the Intensive Care Unit, and she turns and talks to someone still inside,<br><br>" +
				'"..alright, contact me when she is moved into a regular Ward. I will return then."' +
				"<br><br>" +
				"Before you can do anything, hide or ask her if she is talking about Mrs. Granger, the " + getOfficer(false) + " quickly walks away." +
				"<br><br>" +
				"You recognise the " + getOfficer(false) + " as Ms Khan . She used to live next door to your house. Your mother talked to her a lot back in the day and sometimes Ms Khan even visited your house for dinner. " +
				"From these visits you learned that she did not want to be an " + getOfficer(false) + " first, she was more interested in becoming a soldier. However, her dominant nature and harsh attitude made her realize that by becoming a police " + getOfficer(false) + " she could exercise her power over the people quicker and easier. So, yeah, your first impressions of her were not so good...she’s and uptight and arrogant bitch who’s hunger for power could only be matched by her heavenly body and appearance and it looks like she hasn’t changed a bit. " +
				"She worked her way through the ladder and is now the right hand woman to " + getPoliceChief() + " Batton.<br><br>" +
				"She did not notice you, and you have to admire the dress-code of the local police!",
				'setPersonFlag("MrsGranger",5);dispPlace()'
			);
		}
		addLinkToPlace(md, 'enter the Intensive Care Unit', 275);
	} else if (isPlaceKnown("HospitalICU")) addLinkToPlace(md, 'enter the Intensive Care Unit', 275);

	if (perMG.other >= 54 && perMG.place == 278) addLinkToPlace(md, 'enter Ward 1 West', 278);
	if (perYou.isShot() || perOK.place == 213 || wherePerson("OfficerSmith") == 213 || perNS.checkFlag(1) || perNS.isCharmedBy()) {
		// You've been shot or Officer smith is here or Officer Khan
		addLinkToPlace(md, 'enter Ward 1 East', 213);
	}

	addLinkToPlace(md, 'exit the hospital', 215);

	// Right col, people/places
	if (perMG.other >= 54 && perMG.place == 278 && !isMurderPath() && perMG.checkFlag(3)) {
		AddRightColumnLarge(md);
		if (checkPlaceFlag("Hospital", 2)) addPlaceImage(md, "elevator.jpg", "50%");
		perOK.showPerson(perOK.isCharmedBy() ? "pol13b.jpg" : "pol13a.jpg");
	} else if (checkPlaceFlag("Hospital", 2)) {
		AddRightColumn(md);
		addPlaceImage(md, "elevator.jpg");
		md.write('<p style="text-align:center">Ride the ' + ele + '<br><img src="Images/elevatorbuttons.jpg" style="margin: 5px 5px;width:100%" alt="Elevator" title="The elevator"></p>');
		addLinkToPlace(md, isBritish() ? "First Floor" : "Second Floor", 444, '', '', '', '', 'hailblock');
		addLinkToPlace(md, "Basement", 442, '', '', '', '', 'hailblock hailup');
	}

	WritePlaceFooter(md);
}