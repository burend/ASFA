// Ward 1 East

function ShowPlace213()
{
	var md = WritePlaceHeader(false, "td-left-small");

	var perNS = findPerson("NurseSandra");
	var clv = perNS.getCharmedLevel();
	var perOS = findPerson("OfficerSmith");
	var perKhan = findPerson("OfficerKhan");
	var perGhost = findPerson("Ghost");
	var bPatientHere = perOS.place == 213 || perKhan.place == 213;

	if (clv === 0) perNS.showPerson("sandra1.jpg"); // Normal NURSE SANDRA
	else perNS.showPerson("sandra5.jpg"); // CHARMED NURSE SANDRA

	addPlaceTitle(md, "Ward 1 East");

	if (perOS.place == 213) {
		if (perKhan.place == 213) md.write('<div style="text-align:right">');
		perOS.showPerson("polg7.jpg", "height:30vh", "right");
		if (perKhan.place == 213) md.write('</div><div style="clear:both;">');
	}

	if (perYou.checkInjury(1) && !perYou.checkInjury(2))
	{
		endInvisibility();
		md.write('You wake up from the blackness. Slowly your eyes make out shapes until you see that you are in a hospital ward. A sharp pain stabs at you from your shoulder and you remember the bullet piercing you there. ');
		perYou.setInjury(2);
		WaitHereOnly(288 + Math.floor(Math.random() * 12));		// 1 day and a bit
		perNS.other = 1; // Start the Nurse Dialogue
		if (getPersonOther("Diane") === 0) {
			setPersonOther("Diane", 1); // Start DA White Path as well
			movePerson("Diane", 168);
		}
	} else if (perYou.checkInjury(5) && !perYou.checkInjury(6))
	{
		md.write('You wake up from the blackness. Slowly your eyes make out shapes until you see that you are in a hospital ward. A sharp pain stabs at you from your shoulder probably from some rock as the prison was collapsing. ');
		perYou.setInjury(6);
		WaitHereOnly(12 + Math.floor(Math.random() * 12));		// 1 hr and a bit
	}

	md.write('<p>Stark white walls greet you in the hospital room.</p>');

	if (perNS.other == 1) // start the Nurse Dialogue path
	{
		if (clv > 0) {
			// Charmed
			md.write('<p>Your slave Nurse Sandra approaches your bed very concerned and examines your chart for a moment before moving to your side.  "Please Boss, be careful.  Your injuries have not yet healed."  Her eyes well up with tears as she looks at you.  "Boss, I was so worried!</p>');
		} else {
			md.write('<p>A nurse approaches you. She checks her notes and exclaims, "You should stay still! Your not yet recovered from your injury. Let Nurse Sandra take care of you!"</p>');
		}
	} else {

		// Becky Smith
		if (perOS.place == 213 && perOS.other == 101)	{
			if (isInvisible()) md.write('<p>' + getOfficer() + ' Rebecca Smith is lying in one of the bed.</p>');
			else if (clv > 0) {
				//Charmed
				md.write('<p>Your slave Sandra looks at you. "Are you here for Officer Rebecca Smith, Boss? Does she serve you as I do Boss?</p>');
			} else {
				md.write('<p>The nurse asks you whether you have come to visit ' + getOfficer() + ' Rebecca Smith.</p>');
			}
		} else if (perOS.place == 213) md.write('<p><b>' + getOfficer() + ' Smith could lose her life.</b></p>');
		// Officer Khan
		if (perKhan.place == 213) {
			if (isInvisible()) md.write('<p>' + getOfficer() + ' Cheryl Khan is lying in one of the bed.</p>');
			else if (clv > 0) {
				//Charmed
				md.write('<p>Your slave Sandra looks at you. "Are you here for ' + getOfficer() + ' Cheryl Khan, Boss? Does she serve you as I do Boss?</p>');
			} else {
				md.write('<p>The nurse asks you whether you have come to visit ' + getOfficer() + ' Cheryl Khan.</p>');
			}
		} else if (perOS.place != 213) {
			if (isInvisible()) md.write('<p>' + (clv > 0 ? 'Your slave Sandra is tending to her patients' : 'The nurse is tending to her patients') + '</p>');
			else if (clv > 0) md.write('<p>Your slave Sandra looks at you. "Are here to visit a patient Boss?"</p>');
			else md.write('<p>The nurse asks if you are here to visit a patient?</p>');
		}
	}
	if (perKhan.place != 213) md.write('<div style="clear:both;">');

	//**********************************************************
	startQuestions();

	if (clv > 0) {
		addLinkToPlace(md, 'have Sandra give you a checkup', Place, 'type=sandracheckupsex');
		if (!bPatientHere) {
			perNS.addDancingLink(md, '"Sandra, can you take a break and dance for me at the club?"', 
				'You ask Sandra about the Avernus club and about taking a break and dancing there for you,</p>' +
				'<p>&quot;Sure Boss, I can arrange someone to take over here for a time and have a break and dance for you!&quot; and with that you call Jade to arrange a dance for Sandra.'
			);
		}
	}
	if (perYou.checkInjury(6) && !perYou.checkInjury(7)) addQuestionC(md, 'ask the nurse what happened', "NurseSandra", 922);
	else if (perNS.other == 1) addQuestionC(md, 'ask the nurse what happened', "NurseSandra", 921);

	if (perOS.place == 213 && perOS.other == 101) addQuestionC(md, 'ask Nurse Sandra about Becky\'s condition', "NurseSandra", 93102);

	if (perGhost.checkFlag(2) && !perGhost.checkFlag(3)) addQuestionC(md, 'tell the nurse about seeing the ghost', "NurseSandra", 100);
	if (!isDay() && clv > 0 && perGhost.checkFlag(5) && !perGhost.checkFlag(6)) addLinkToPlaceC(md, 'ask her to come with you to the basement', 443, 'type=sandra');

	addLinkToPlace(md, 'exit the ward', 214);
	if (perOS.place == 213) md.write("</div>");

	if (perKhan.place == 213) // Officer Khan is HERE
	{
		AddPeopleColumnLarge(md);
		perKhan.showPerson("pol12.jpg", "", "right");
	}


	WritePlaceFooter(md);
}