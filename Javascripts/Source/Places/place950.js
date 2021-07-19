// Trial

function NotGuilty()
{
	var perDA = findPerson("Diane");
	perYou.setArrested(0); // Set to NOT under arrest again
	if (perDA.extra[1] < 30) perDA.extra[1] = 30;
	if (perDA.other < 15) perDA.other = 15;  // Set the DA's Path to 15 so that she doesn't try and arrest you again.
	perDA.setQuestArrested(50); // Court Trial is now OVER
	DAReturnItems();
}

function ShowPlace950()
{
	var md = WritePlaceHeader(false, "td-left-small");

	var perDA = findPerson("Diane");

	if (perDA.extra[1] === 0) perDA.extra[1] = 3;	// Start the Trial Dialogue Path

	//*********************************************************************
	if (isMurderPath()) // ************* ACCUSED OF MURDER *********************
	{
		if (perDA.extra[1] == 6 || perDA.extra[1] == 10) {
			// Presentation of Evidence
			if (isCharmedBy("OfficerKhan")) {
				// Normal Officer Khan
				findPerson("OfficerKhan").showPerson("pol11.jpg");
			} else {
				if (isBritish()) md.write('<img src="Images/UK/judge1.jpg" style="margin:0px 5px;width:95%" alt="Judge">');
				else md.write('<img src="Images/US/judge1.jpg" style="margin:0px 5px;width:95%" alt="Judge">');
			}
		}
		else if (perDA.extra[1] == 15) {
			// Calling Mom as witness
			findPerson("Mom").showPerson("mom2");
		}	else if (perDA.extra[1] == 30) {
			// Calling Beasley as witness
			findPerson("MrBeasley").showPerson("beasley10.jpg");
		}	else {
			if (isBritish()) md.write('<img src="Images/UK/judge1.jpg" style="margin:0px 5px;width:95%" alt="Judge">');
			else md.write('<img src="Images/US/judge1.jpg" style="margin:0px 5px;width:95%" alt="Judge">');
		}

	} else //Accused of THEFT
	{
		if (isBritish()) md.write('<img src="Images/UK/judge1.jpg" style="margin:0px 5px;width:95%" alt="Judge">');
		else md.write('<img src="Images/US/judge1.jpg" style="margin:0px 5px;width:95%" alt="Judge">');

		switch (perDA.extra[1])
		{
			case 6:
			case 7:
				// Presentation of Evidence
				md.write('</td><td class="td-left-small">');
				findPerson("Gina").showPerson("gina-m-face.jpg");
				break;
			case 10:
				md.write('</td><td class="td-left-small">');
				perDA.showPerson("diane7-in.jpg");
				break;
		}
	}

	//*********************************************************************
	//       v130 = Trial Path
	//*********************************************************************

	addPlaceTitle(md, "Court Room");

	if (perDA.extra[1] == 3)	{
		passTimeDay();
		md.write(
			'<p>The trial begins. Present in court are Judge Gabel, ' + getOfficer() + ' Khan and yourself.</p>' +
			'<p>Judge Gabel turns towards you to say, "' + perYou.getPersonName() + ', you are accused of '
		);
		if (isMurderPath()) md.write('murder');
		else md.write('attempted theft');
		md.write('. How plead you?');
	}

	if (!isMurderPath()) {
		// ACCUSED OF SIMPLE THEFT
		// museum guards testimony @ 15 instead of Mom's
		if (perDA.extra[1] == 6)	{
			md.write(
				'<p>Museum Guard Gina steps forward to present her testimony.</p>' +
				'<p>"I noticed the accused and Mrs. Granger in the History of Town display area.  They were discussing something, then I saw the accused reaching for the vase in an apparent attempt to steal the artifact." She seems to pause for dramatic effect.</p>'
			);

			if (wherePerson("MrsGranger") == 177) {
				// You attacked
				md.write(
					'<p>"It was at this point that I ordered the accused to freeze and told ' + perYou.getHimHer() + ' that ' + perYou.getHeShe() + ' was under arrest.  Then, after conferring with the accused Mrs. Granger left the museum.  That was when the accused attempted to use force and I was forces to restrain ' + perYou.getHimHer() + ' and shortly thereafter other guards arrived and took the accused off to jail."</p>'
				);
			} else if (wherePerson("MrsGranger") == 261) {
				md.write(
					'<p>"It was at this point that I ordered the accused to freeze and told ' + perYou.getHimHer() + ' that ' + perYou.getHeShe() + ' was under arrest.  Then, after conferring with the accused, Mrs. Granger attempted to distract me so I arrested her and the accused. Shortly thereafter other guards arrived and took the accused and Mrs. Granger off to jail."</p>'
				);
			} else {
				md.write(
					'<p>"It was at this point that I ordered the accused to freeze and told ' + perYou.getHimHer() + ' that ' + perYou.getHeShe() + ' was under arrest.  Then, after conferring with the accused, Mrs. Granger leapt at me in an attempt to distract me.  That was when Mrs. Granger was injured and shortly thereafter other guards arrived and took the accused off to jail."</p>'
				);
			}
		}
		else if (perDA.extra[1] == 7)	{
			md.write(
				'<p>Judge Gabel looks at Gina. "Did you witness anything that would refute this account of events?" he asks.</p>' +
				'<p>Gina looks confused for a moment.  "No, I suppose he <i>could</i> have been trying to stop her," she says reluctantly.</p>' +
				'<p>Judge Gabel looks at the ' + getProsecutor() + ' and asks "Do you have any further incriminating evidence?"</p>'
			);
		}
		else if (perDA.extra[1] == 10)	{
			md.write(
				'<p>' + getProsecutor() + ' White takes the stand and frowns down at you.  "The accused was questioned at the local police station concerning the events in question.  When I asked ' + perYou.getHimHer() + ' about the theft ' + perYou.getHeShe() + ' responded with, and I quote - \'Mrs. Granger was doing my bidding\'." ' +
				'<p>The ' + getProsecutor() + ' pauses, seemingly for dramatic effect before finishing.  "At first I was taken aback by ' + perYou.getHisHer() + ' candor, but after a few moments when ' + perYou.getHeShe() + ' didn\'t recant I immediately called for ' + perYou.getHisHer() + ' arrest."<p>' +
				'<p>She seems quite confident that she has sealed your fate with her testimony.</p>' +
				'<p>Judge Gabel looks at you.  "What do you have to say about this, ' + perYou.getPersonName() + '?" he asks.</p>'
			);

		}
		else if (perDA.extra[1] == 30)	{
			md.write('<p>"No further questions," says Judge Gabel. "The accused is obviously innocent. You may go home ' + perYou.getPersonName() + '."</p>');
		}

	}
	else  					// ACCUSED OF MURDER
	{
		if (perDA.extra[1] == 6)
		{

			if (isCharmedBy("OfficerKhan")) // Khan Charmed
			{
				md.write(
					'<p>Police ' + getOfficer() + ' Mitchell steps forward to present the evidence. ' +
					'"It is my opinion," he says deliberately. "That ' + perYou.getPersonName() + ' murdered ' + perGates.getPersonName() + '. ' + perYou.getPersonName() + ' was found at the scene and knew about the crime, and his clothing was seen covered with blood."</p>' +
					'<p>The judge asks you, "Do you confirm these allegations?'
				);
			}
			else 	// NOT CHARMED
			{
				md.write(
					'<p>Police ' + getOfficer() + ' Khan steps forward to present her evidence. ' +
					'"It is my opinion," she says deliberately. "That ' + perYou.getPersonName() + ' murdered ' + perGates.getPersonName() + '. ' + perYou.getPersonName() + ' was found at the scene and knew about the crime, and ' + perYou.getHisHer() + ' clothing was seen covered with blood."</p>' +
					'<p>The judge asks you, "Do you confirm these allegations, or would you like to call a witness in your defense?"'
				);

			}
		}

		if (perDA.extra[1] == 7) md.write('<p>Judge Gabel calls a brief recess while you decide to choose a witness. Who would support you the most?</p>');

		if (perDA.extra[1] == 15) {
			md.write(
				'<p>Your mother takes the stand and looks at you with concern on her face.</p>' +
				'<p>Judge Gabel asks her, "Can you please explain to the court why the accused knew about the murder at the Gates estate."</p>' +
				'<p>"I can\'t, ' + perYou.getPersonName() + ' came home this afternoon with a bloodstained shirt. It was disgusting so I washed it."</p>' +
				'<p>"Hmm," says Judge Gabel looking at you. "Can you explain the blood?</p>'
			);
		}

		if (perDA.extra[1] == 16) md.write('<p>Everyone it the court waits for your answer as to who murdered ' + perGates.getPersonNameShort() + '. You know that if you slip up then they will know you are guilty and it is the end of your journey.</p>');

		if (perDA.extra[1] == 30) {
			md.write(
				'<p>Mr. Beasley takes the stand. He looks over at you and smiles.</p>' +
				'<p>Judge Gabel asks, "Mr. Beasley,can you please explain to the court why the accused knew about the murder at the Gates estate."</p>' +
				'<p>"Certainly,  ' + perYou.getPersonName() + ' visited me earlier today. I had heard that ' + perGates.getPersonNameShort() + ' was murdered and told  ' + perYou.getPersonName() + '. As you are aware, ' + perGates.getPersonNameShort() + ' is my cousin and I heard of his passing through my family.</p>' +
				'<p>"No further questions," says Judge Gabel. "The accused is obviously innocent." You are amazed at Mr. Beasley\'s lie and the Judge\'s acceptance.</p>'
			);
		}
	}//**************** END OF ACCUSED OF MURDER *****************************

	if (perDA.extra[1] == 20) md.write('<p>Everyone is appalled at your crime. Your mother breaks down and cries. Judge Gabel declares that there is more than enough evidence to begin the grand jury and orders you held over for criminal trial.</p>');

	if (perDA.extra[1] == 35) md.write('<p>"No further questions," says Judge Gabel. "The accused is obviously innocent." You are relieved to be let free and glad to have received ' + sCurrency + '100 compensation.</p>');

	//*********************************************************************
	startQuestions();

	if (!isMurderPath()) {
		// ***********  Accused of Attempted Theft *************
		switch (perDA.extra[1]) {
			case 3:
				startAlternatives(md);
				addLinkToPlace(md, 'plead guilty', 999);
				addQuestionC(md, 'plead <i>NOT</i> guilty', "Trial", 3);
				endAlternatives(md);
				break;
			case 6:
				if (wherePerson("MrsGranger") == 177) addLinkToPlace(md, 'admit that you tried to get the vase', 999);
				else {
					startAlternatives(md);
					addLinkToPlace(md, 'admit that Mrs Granger was doing your bidding', 999);
					addQuestionC(md, 'claim that you noticed her odd behavior and were trying to stop her', "Trial", -6);
					endAlternatives(md);
				}
				break;
			case 7:
				if (perYourBody.FindItem(8) > 0) startAlternatives(md);
				addQuestionC(md, 'wait for the ' + getProsecutor() + ' to present more evidence', "Trial", -7);
				if (perYourBody.FindItem(8) > 0) {
					addQuestionC(md, 'give the judge the letter from Davy', "Trial", 35);
					endAlternatives(md);
				}
				break;
			case 10:
				startAlternatives(md);
				if (perYourBody.FindItem(8) > 0) addQuestionC(md, 'give the judge the letter from Davy', "Trial", 35);
				if (wherePerson("MrsGranger") == 177) addLinkToPlace(md, 'admit that you tried to get the vase', 999);
				else addLinkToPlace(md, 'admit that Mrs. Granger was doing your bidding', 999);
				addLinkToPlace(md, 'claim that you were just joshing with the ' + getProsecutor() + ', and apologize for not taking the charges seriously at the time', 950, '', '', '', "Converse('Trial',10)");
				endAlternatives(md);
				break;

		}
		//  ************* End Accused of Theft ********************
	} else {
		// ***************** BEGIN ACCUSED OF MURDER ********************
		switch (perDA.extra[1]) {
			case 3:
				startAlternatives(md);
				addLinkToPlace(md, 'plead guilty', 999);
				addQuestionC(md, 'plead <i>NOT</i> guilty', "Trial", 3);
				endAlternatives(md);
				break;
			case 6:
				startAlternatives(md);
				addLinkToPlace(md, 'confirm the allegations', 999);
				addQuestionC(md, 'call for a witness', "Trial", 6);
				if (perYourBody.FindItem(36) > 0) {
					// Have Davy's Threatening Letter
					addQuestionC(md, 'give the judge the letter from Davy', "Trial", 35);
				}
				endAlternatives(md);
				break;
			case 7:
				startAlternatives(md);
				addQuestionC(md, 'call your Mother to the stand', "Trial", 71);
				addQuestionC(md, 'call Mr. Beasley to the stand', "Trial", 72);
				if (perYourBody.FindItem(36) > 0) {
					// Have Davy's Threatening Letter
					addQuestionC(md, 'give the judge the letter from Davy', "Trial", 35);
				}
				endAlternatives(md);
				break;
			case 15: // called your mother to the stand
				startAlternatives(md);
				addQuestionC(md, 'say that you cut yourself cooking dinner', "Trial", 151);
				addQuestionC(md, 'say that you saw ' + perGates.getPersonNameShort() + ' get murdered', "Trial", 152);
				endAlternatives(md);
				break;
			case 16:
				startAlternatives(md);
				addQuestionC(md, 'tell them that Mr Beasley did it', "Trial", 161);
				addQuestionC(md, 'tell them that Police ' + getOfficer() + ' Khan did it', "Trial", 162);
				endAlternatives(md);
				break;
		}
		// ******************* END ACCUSED OF MURDER **************
	}
	if (perDA.extra[1] == 20) {
		// Found GUILTY - Go To Prison
		addLinkToPlace(md, 'go to jail', 260);
	} else if (perDA.extra[1] >= 30) {
		// Found NOT GUILTY - Can leave
		addLinkToPlace(md, 'go home', 46, '', '', '', 'NotGuilty()');
	}

	WritePlaceFooter(md);
}