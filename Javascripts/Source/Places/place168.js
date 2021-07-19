// Place: Police Station Reception

function ShowPlace168(stype)
{
	var perSmith = findPerson("OfficerSmith");
	//var clvSmith = perSmith.getCharmedLevel();
	var perBatton = findPerson("OfficerBatton");
	var clvBatton = perBatton.getCharmedLevel();
	var perKhan = findPerson("OfficerKhan");
	var perDA = findPerson("Diane");
	var clvDA = perDA.getCharmedLevel();
	var bDAHere = perDA.place == 168 && (perDA.other > 0 && perDA.other < 900) && perDA.other != 50;
	var perAR = findPerson("AdeleRoss");
	var plcAR = perAR.place;
	var bArrest = getQueryParam("arrest") == "true";
	var perMG = findPerson("MrsGranger");

	var tot = perBatton.place == 168 ? 1 : 0;
	if (stype == 'daappears' || stype == 'daappears2') bDAHere = true;
	if (bDAHere) tot++;
	if (perKhan.place == 168) tot++;

	var md = WritePlaceHeader();

	// ***********************  BEGIN PICTURE PLACEMENT  ****************************
	if (clvBatton > 0 && perBatton.place == 168 && bDAHere) // Both Charmed & here, DA Still Alive
	{
		perBatton.showPerson("polb6.jpg");
	}
	else if (bDAHere) // DA White Path Started after Trial and not DEAD
	{
		if (clvDA > 0) {
			// DA IS CHARMED
			if (clvBatton <= 0) {
				// Chief Batton NOT Charmed
				if (perBatton.place == 168) {
					// Batton is HERE
					perBatton.showPerson("polb1.jpg"); // Baton Normal
				} else perDA.showPerson("diane5.jpg"); // DA Charmed
			} else {
				if (perBatton.place == 168) perBatton.showPerson("polb6.jpg"); // Baton Charmed
				else perDA.showPerson("diane5.jpg"); // DA Charmed
			}
		}
		else   // DA NOT Charmed
		{
			if (perBatton.place == 168) {
				// Batton @ Station
				if (clvBatton == -1) perBatton.showPerson("polb1e.jpg");	// Chief Batton Charmed by someone else
				else if (clvBatton === 0) perBatton.showPerson("polb1.jpg");	// Chief Batton NOT Charmed
				else {
					if (perDA.other != 50) perBatton.showPerson("polb2.jpg");    // Chief Batton (modest)
					else perBatton.showPerson("polb6.jpg"); // Baton Charmed
				}
			} else if (perDA.other != 50) perDA.showPerson("diane1.jpg"); // DA Normal
		}
	}
	else if (perBatton.place == 168) {
		// Police Chief Batton is @ Station
		if (clvBatton == -1) perBatton.showPerson("polb1e.jpg");	// Chief Batton Charmed by someone else
		else if (clvBatton === 0) perBatton.showPerson("polb1.jpg");	// NOT charmed
		else perBatton.showPerson("polb6.jpg");		// Charmed
	}
	if (perKhan.place == 168 && tot > 2) {
		// Is officer Khan @ the Police Station
		perKhan.showPerson("pol9.jpg");
	}
	
	// *******************  START DESCRIPTION ***************************
	addPlaceTitle(md, "Police Station Reception", tot === 0 ? "police2station.jpg" : "");

	// if DA WHITE PATH is active && She is NOT IN JAIL
	if (bDAHere)
	{
		if (clvDA > 0 && clvBatton > 0 && perBatton.place == 168) // Both DA and Chief Batton CHARMED & Batton @ Station
		{
			md.write('<p>' + getProsecutor() + ' White and ' + getPoliceChief() + ' Batton greet you as you enter. Both slaves displaying themselves for your enjoyment, both willing and eager to do whatever you ask.</p>');
		}
		else if (clvDA > 0 && (clvBatton <= 0 || perBatton.place !== 168)) // DA Charmed, Officer Baton NOT or Officer Batton not at the station
		{
			md.write('<p>' + getProsecutor() + ' White looks you over as you enter, her eyes still betraying her slavery and loyalty to you. You know she would do anything you asked her to.</p>');
		}
		else if (clvBatton > 0 && clvDA === 0 && perBatton.place == 168) // Baton Charmed, DA Normal
		{
			md.write('<p>' + getPoliceChief() +' Kerry Batton smiles at you as you enter, running her tongue over her lips and discreetly exposing her bra for your enjoyment.  Only the presence of the ' + getProsecutor() + ' keeps her from throwing off her clothes and begging you to take her again.</p>');
		}
		if (clvDA === 0) // DA WHITE NOT CHARMED
		{
			if (perDA.other == 1)
			{
				md.write('<p>A smug-looking lady stands ');
				if (perBatton.place == 168) md.write('between you and ' + getPoliceChief() + ' Batton');
				else md.write('before you');
				md.write(
					'. The blond haired woman introduces herself to you as Diane White the ' + getProsecutor() + ' who got the case of the '
				);
				if (perYou.getArrested() == 2) md.write('murder of ' + perGates.getPersonName());
				else if (perYou.getArrested() == 3) md.write('museum "accident"');
				else md.write('theft of a certain Book');
				md.write(
					'. Ms. White as it turns out to be, is living in a bigger city not far away from here, but this town is still under her supervision, that means every  homicide case in the area comes directly to her. She seems suspicious of you and you have strange feeling that won’t stand a chance against her in court. If, she wants to take the case to court of course …but that depends on her. Maybe you can alter her attitude towards you and show her a new world…the world of servitude. She must also understand that the vase belongs to you. She will see that you did not commit any crime and you could always use a good lawyer. Who knows what mess will you get into next time?</p>' +
					'<p>She is eyeballing you warily, but after the formal introduction she asks: "Can we talk, ' + perYou.getPersonName() + '? Because we’ve got a lot to discuss."</p>'
				);

			} else if (perDA.other > 1)
			{
				if (perBatton.place == 168) md.write('<p>' + getProsecutor() + ' White stands between you and ' + getPoliceChief() + ' Batton. She looks you over with a contemptuous sneer');
				else md.write('<p>' + getProsecutor() + ' White looks you over with a contemptuous sneer');
			}

			if (perDA.other == 10) // DA White just said to arrest you.
			{
				md.write(' and orders your arrest. "You have the right to..."</p>');
				if (perBatton.place == 168) // Officer Batton HERE
				{
					if (clvBatton <= 0) {
						// Officer Batton NORMAL
						md.write('<p>' + getPoliceChief() + ' Batton steps up and throws handcuffs around your hands.  It seems you have no choice.</p>');
					}	else md.write('<p>' + getPoliceChief() + ' Batton looks at you, her devotion obviously outweighing the order from the ' + getProsecutor() + ' to arrest you.');
				}
			}
			else if (perDA.other > 1) md.write('.</p>');
		}
	}// END DA WHITE PATH
	
	// BEGIN Normal Officer Kerry Path
	if (perDA.other === 0 || perDA.other >= 15)  // DA not started, or DA Path Finished
	{
		if (clvBatton <= 0)
		{
			// Officer Kerry Batton NOT CHARMED
			md.write('<p>Due to a recent increase in budget the station has been renovated and refurbished. It could almost be a pleasant place to visit if it were not for the cops.</p>');
			if (perBatton.place == 168)  // Is Officer Batton in the Station??
			{
				if (clvBatton < 0) {
					// Officer Kerry Batton NOT CHARMED by YOU but is by someone else
					md.write('<p>As you enter the police reception you are warily studied by ' + getPoliceChief() + ' Kerry Batton, the policewoman in charge. ');

				} else {
					// Officer Kerry Batton NOT CHARMED by YOU or anyone else
					md.write('<p>As you enter the police reception you are greeted by ' + getPoliceChief() + ' Kerry Batton, the policewoman in charge. ');
				}

				// Common if uncharmed or is by another
				if (perKhan.getPath() == 2 || (!isMurderPath() && perKhan.place == 168)) {
					// Officer Khan Drove you to Police Station (and is still there)
					md.write(' The threatening woman acknowledges you before she turns back to her work.</p>');
				} else if (perKhan.getPath() == 15 && perBatton.other < 10) {
					// Officer Khan was sent after Davy and shot dead by Anita && She doesn't know why yet
					md.write(' She asks you whether you have seen ' + getOfficer() + ' Khan, who is missing. You stay quiet but feel that you should ask around for any news.</p>');
				}
			}
		}
		else  // BEGIN Officer Batton CHARMED path
		{
			if (perBatton.place == 168)   // Is Officer Batton in the Station??
			{
				if (isBritish()) md.write('<p>Kerry greets you with the eagerness of a slave. She opens her shirt and shows you her breasts to please her ' + perYou.getMaster() + '. ');
				else md.write('<p>Kerry greets you with the eagerness of a slave. She holds her breasts up as an offering to you as her ' + perYou.getMaster() + '. ');
				if (perKhan.isCharmedBy() || perKhan.getPath() == 15) {
					// Officer Khan Charmed, or Dead.
					md.write(' She begs you to fuck her.</p>');
				}
				if (perKhan.getPath() == 15 && perBatton.other < 10) {
					md.write('<p>"' + perYou.getMaster() + '," she begs, "I do not mean to bother you, but one of my ' + getOfficer(false) + 's is missing: ' + getOfficer() + ' Khan.  Have you seen her?  As her superior I am responsible for her safety.  Please, ' + perYou.getPersonName() + ', tell me if you hear of anything?"</p>');
				}
				md.write('<p>You ignore her for now, knowing you can have her any time you wish. There are more important things to deal with for the time being.</p>');
			}
			else md.write('<p>Papers and pens are scattered over Kerry Batton\'s desk from your playing around.</p>');
		}
	} // END Normal Officer Kerry Path

	if (perDA.other === 0 || perDA.other >= 15)  // DA not started, or DA Path Finished
	{
		if (perKhan.getPath() == 2) md.write(getOfficer() + ' Khan leads you through the reception area.</p>');
		else if (!isMurderPath() && perKhan.place == 168) md.write(getOfficer() + ' Khan greets you and offers to take you through to her office.</p>');
	}

	// ****** Dead Body Section ******

	if (perDA.other == 900 && perDA.isHere()) {
		// DA White is DEAD and still lying there
		md.write('<p>' + getProsecutor() + ' Diane White lies dead beside the counter.</p>');
	}
	if (perSmith.other == 100) md.write('<p>' + getOfficer() + ' Rebecca Smith is rolling around on the floor. Her chest is red with blood flowing from a fresh bullet wound.</p>');
	else if (perSmith.other == 900 && perSmith.isHere()) md.write('<p>' + getOfficer() + ' Rebecca Smith lies dead on the floor, the pool of blood beneath her a reminder of her sacrifice for you.</p>');

	// *******************     Begin Conversation Options    **************************************
	startQuestions();

	// if DA WHITE PATH is active
	if (bDAHere)
	{
		var bookQ = false;

		if (perDA.other == 1) addQuestionC(md, 'help ' + getProsecutor() + ' White with the investigation', "Diane", 5701);
		else {
			// Arrested
			// 1	- Attempted theft of Book
			// 2	- Arrested for MURDER
			// 3	- Attempted theft of Vase
			if (perYou.getArrested() != 3) { 	//if (whereItem(4) == 999 || whereItem(4) == 76) {
				// Arrested suspicion of stealing the book
				// Had the book, but Lost it (shot/confiscated on arrest)
				if (perYourBody.FindItem(4) === 0 && perDA.other < 3) {
					// Lost Book & haven't already said this
					addQuestionC(md, 'tell her that you do not have the book', "Diane", 9002);
				}

				if (perDA.other < 10 )
				{
					addQuestionC(md, 'tell her that you found the book in the alley', "Diane", 5710);
					addQuestionC(md, 'tell her that ' + perGates.getPersonNameShort() + ' gave you the book', "Diane", 5711);
				}

			}
			else {
				// Arrested for attempt to steal the vase
				if (perMG.place == 177) {
					addQuestionC(md, 'tell her you had nothing to do with it', "Diane", 5705);
				} else if (perDA.other == 2) {
					addQuestionC(md, 'tell her you had nothing to do with it', "Diane", perMG.checkFlag(4) ? 5705 : 5704);
					addQuestionC(md, 'tell her Mrs. Granger was obeying your commands like a good slave', "Diane", 5705);
				}
			}

			if ((perDA.other == 3 || perDA.other == 15) && !perYou.checkFlag(8) && perYourBody.FindItem(4) === 0) {
				addQuestionC(md, 'ask ' + getProsecutor() + ' White where the book is now', "Diane", 5703);
				bookQ = true;
			}
		}

		if (perDA.other == 10)  // begin "UNDER ARREST" options
		{
			if (perBatton.place !== 168) {
				// Baton NOT HERE
				addQuestionC(md, 'give in and go to the jail cell', "Diane", 5712);
			} else {
				//  Batton IS HERE
				if (clvBatton <= 0)  {
					// and NOT CHARMED
					addQuestionC(md, 'give in and go to the jail cell', "Diane", 5713);
				} else {
					// Officer Batton is CHARMED
					startAlternatives(md);
					addQuestionC(md, 'play along and go to the jail cell', "Diane", 5714);
					addQuestionC(md, 'order ' + getPoliceChief() + ' Batton to throw the ' + getProsecutor() + ' in jail instead', "OfficerBatton", 5750);
					endAlternatives(md);
				}
			}
		}  // end "UNDER ARREST" options

		if (clvDA > 0 && clvBatton > 0 && perBatton.place == 168) // Both DA and Chief Batton CHARMED & Batton @ Station
		{
			// DA White and Batton playing w/ each other
			addLinkToPlace(md, 'tell ' + getPoliceChief() + ' Kerry and Diane to demonstrate some legal procedures', 168, 'type=kerrydianethreesome');
		}
		if (clvDA > 0) {
			// Charmed and here
			if (!bookQ && !perYou.checkFlag(8) && (whereItem(4) == 168 || whereItem(4) == 999 || whereItem(4) == 76)) {
				// Charmed DA w/o asking where the book is
				addQuestionC(md, 'ask ' + getProsecutor() + ' White where the book is again', "Diane", 5703);
			}
			if (clvBatton > 0 || perBatton.place !== 168) addLinkToPlaceC(md, 'discuss the law with Diane', Place, 'type=dianelaw');

			if (perMG.place == 261) addQuestionC(md, 'ask ' + getProsecutor() + ' White to free Mrs. Granger', "Diane", 6000);

			if (perDA.NoItems > 0) addQuestionC(md, '"May I have my possessions back"', "Diane", 7000);

		}
	}// END DA WHITE PATH

	 // BEGIN Normal Officer Kerry Options
	if (perBatton.place == 168 && (perDA.other === 0 || perDA.other >= 15))
	{
		if (clvBatton <= 0) // NOT CHARMED
		{
			//if (prtBatton.isCharmed()) {
				// Officer Batton charmed by someone else
				
			//}
			if (perKhan.getPath() == 15 && perBatton.other < 10) {
				// Khan killed by Anita
				startAlternatives(md);
				addQuestionC(md, 'tell ' + getPoliceChief() + ' Batton you heard ' + getOfficer() + ' Khan was killed', "OfficerBatton", 5215);
				addQuestionC(md, 'tell ' + getPoliceChief() + ' Batton you heard ' + getOfficer() + ' Khan was shot', "OfficerBatton", 5216);
				endAlternatives(md);
			}
			if (perBatton.other == 10) addQuestionC(md, 'ask ' + getPoliceChief() + ' Batton if she has heard anything about Officer Khan', "OfficerBatton",9910);
		} else {
			// CHARMED
			if (perKhan.getPath() == 15 && perBatton.other < 10) {
				// Khan killed by Anita
				startAlternatives(md);
				addQuestionC(md, 'order Kerry to investigate ' + getOfficer() + ' Khan\'s murder', "OfficerBatton", 5215);
				addQuestionC(md, 'order Kerry to investigate ' + getOfficer() + ' Khan\'s shooting', "OfficerBatton", 5216);
				endAlternatives(md);
			}
			if (perBatton.other == 10) addQuestionC(md, 'ask Kerry what her investigation revealed', "OfficerBatton", 9910);

			if (plcAR == 16 && perAR.checkFlag(4)) {
				// Is the DA in the game
				if (getPersonOther("Diane") === 0 && !isArrestPossible()) {
					// Not possible otherwise for her to appear, so have her appear!
					addLinkToPlaceC(md, 'order Kerry to withdraw the police from the Gates estate', 168, 'type=daappears');
				} else if (clvDA > 0 || perDA.other === 0 || perDA.other == 900 || perDA.other == 50) addQuestionC(md, 'order Kerry to withdraw the police from the Gates estate', "OfficerBatton", 10201);
			} else if (perAR.checkFlag(2) && !perAR.checkFlag(3)) addQuestionC(md, '"' + getOfficer() + ' Ross, do you mean the older sister of Amy Ross?"', "OfficerBatton", 10202);

			if (clvDA > 0 || perDA.other >= 50) {
				// DA Charmed or in Jail
				addLinkToPlace(md, 'tell Kerry it\'s a bust', 168, 'type=kerryfuck');
			} else if (perDA.place === 0 && getPersonOther("Diane") === 0 && !isArrestPossible() && (plcAR == 436 || plcAR >= 900)) {
				if (isMurderPath() && perBatton.other > 10) addLinkToPlace(md, 'tell Kerry it\'s a bust', 168, 'type=daappears2');
				else if (!isMurderPath()) addLinkToPlace(md, 'tell Kerry it\'s a bust', 168, 'type=daappears2');
			}

			if (perDA.other >= 50 && perMG.place == 261) addQuestionC(md, 'ask Kerry to free Mrs. Granger', "Diane", 6000);

			//Mrs Granger Jumped Gina @ the Museum so the Dragon Vase is LOCKED IN SAFE
			if (checkPlaceFlag("Museum", 3) && !checkPlaceFlag("Museum", 4)) addQuestionC(md, 'ask Kerry about the incident at the Museum', "OfficerBatton", 1131);
			if (perDA.other == 900 && perDA.isHere()) addQuestionC(md, 'ask Kerry to call an ambulance to remove ' + getProsecutor() + ' White\'s body', "OfficerBatton", 2000);
			if (perSmith.other == 900 && perSmith.isHere()) addQuestionC(md, 'ask Kerry to call an ambulance to remove ' + getOfficer() + ' Smith\'s body', "OfficerBatton", 2001);

			if (perGates.checkFlag(6) && !isPlaceKnown("AvernusClub")) {
				addQuestionR(md, 'ask about the gentleman\'s club',
					'You ask her about the gentlemans\'s club you were told about. Kerry looks a little annoyed,</p>' +
					'<p>"Yes, yes, it is such a pain. Not the club itself, it seems to be clean and well run. It is just we get complaints and petitions to close it. The complaints are unfounded, it is the \'moral\' people in town trying to get it closed! Well, it is law abiding and we have no problems with it, so it will stay open!"</p>' +
					'<p>She gives you directions to the club, it is located in a side street off the shopping center. The club is open late at night until the early hours and is by invitation only. She quickly makes a phone call, and tells you,</p>' +
					'<p>"I just asked the bartender there to consider you an invited guest in the club, you can visit any time you want"',
					"OfficerBatton",
					"setPlaceKnown(\\'AvernusClub\\')"
				);
			}
		}
	} // END Normal Officer Kerry Options

	// *************  Incidentals ****************

	if (clvBatton >= 0) {
		if (perDA.other === 0 || perDA.other >= 15) {
			// DA not started, or DA Path Finished
			if (perKhan.place == 168 || perKhan.getPath() == 2) addLinkToPlace(md, "go to " + getOfficer() + " Khan's office", 169);
		}		
		/* NOT Under arrest */  /* Off. Smith CHARMED */
		if (perDA.other != 10 && (!perYou.isArrested() || perSmith.other > 0 || isPlaceKnown("JailCell"))) addLinkToPlace(md, 'visit the jail cells', 260);
		if (isPlaceKnown("PoliceInterrogationRoom")) addLinkToPlace(md, 'visit the interrogation room', 175);
	}
	if (clvDA === 0 && perDA.other > 0 && perDA.other < 15) {
		// DA White NOT CHARMED, still grilling you, and not yet exhonerated
		addQuestionCO(md, 'exit the police station', "Diane", 5702);
	} else {
		// DA isn't Trying to Arrest you && She's NOT CHARMED
		addLinkToPlace(md, 'exit the police station', 167);
	}

	if (tot > 1) {
		AddPeopleColumnLarge(md);
		if (clvDA > 0 && clvBatton > 0 && perBatton.place == 168 && perDA.other < 900) perDA.showPerson("diane5.jpg");
		else if (perDA.other > 0 && perDA.other < 900 && perBatton.place == 168) {
			// DA White Path Started after Trial and not DEAD
			if (clvDA > 0) perDA.showPerson("diane9.jpg"); // DA Charmed (modest)
			else if (perDA.other != 50) perDA.showPerson("diane1.jpg"); // DA Normal
		}
		if (perKhan.place == 168 && tot < 3) {
			// Is officer Khan @ the Police Station
			perKhan.showPerson("pol9.jpg");
		}
	}

	WritePlaceFooter(md);
}