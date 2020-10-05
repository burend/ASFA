// Place: Mayors Office

function ShowPlace110()
{
	var md = WritePlaceHeader();

	var perAbby = findPerson("Abby");
	var perAngela = findPerson("Angela");
	var perKhan = findPerson("OfficerKhan");
	var perMayor = findPerson("Mayor");
	var sCharmedBy = perMayor.sCharmedBy;
	var bMayorYours = sCharmedBy == "You";
	var bMayorDavy = sCharmedBy == "Davy";

	if (!bMayorYours) {
		// NOT charmed
		perMayor.showPerson("mayor1.jpg");
	} else {
		// IS charmed
		perMayor.showPerson("mayor5.jpg");
	}

	//******* Mayor Thomas, v15/v16/p6 (1==in office) ****************

	addPlaceTitle(md, "Mayor Thomas");
	md.write('<p>Mayor Beatrice Thomas greets you as you enter her office ');

	if (!bMayorYours) // Not Charmed
	{
		md.write(', she looks quite concerned and unsure of your visit.</p>');
		if (isMurderPath()) // On Murder Path
		{
			if (perMayor.other == 6 || perMayor.other == 11) {
				if (!perMayor.checkFlag(6)) md.write('<p>She looks at you expectantly.  "So, did you bring the book with you this time?" she asks, running her tongue over her lips as if she is about to win a prize.<p>');
				else md.write('<p>She looks at you expectantly.  "Well, go and get the book" she asks, running her tongue over her lips.<p>');
			}
			if (!bMayorDavy) md.write('<p>"What happened, ' + perYou.getPersonName() + '?  That boy, Davy...  Why did I?" she says, shaking her head in confusion.  "Everything was so fuzzy, but now I can think clearly again!</p>');
		}
	} else {
		md.write(
			'The once cold leader of the town is now rubbing her tits and pussy through her black panties for you, ready to serve your every desire.</p>' +
			'<p>"Welcome ' + perYou.getMaster() + '! Please take a seat. How can I be of service?", she lovingly asks as she still plays with her pussy, it’s her way of welcoming you.</p>'
		);
	}

	startQuestions();

	if (perMayor.other == 3) addQuestionC(md, 'say hello to the mayor', "Mayor", 1603);
	if (checkPersonFlag("Gina", 1) && !checkPersonFlag("Gina", 2)) addQuestionC(md, 'ask about the museum security guard', "Mayor", 100);

	if (isMurderPath() && perMayor.other > 3 && bMayorDavy) // Sir Ronald MURDERED && introduced
	{
		if (perMayor.other == 4 && perKhan.other < 10) {
			// Haven't apologized and haven't already offered to help.
			addQuestionC(md, 'ask to help out with the murder investigation', "Mayor", 5310);
		}
		if (perMayor.other == 4) addQuestionC(md, 'apologize for bothering her', "Mayor", 1601);
		else if ((perMayor.other == 5  || perMayor.other == 10) && perYourBody.FindItem(4) > 0)  {
			// Mayor UNDER DAVY's control and you have the book
			addQuestionC(md, 'tell the mayor that you have the book', "Mayor", 1602);
		}	else if (!perMayor.checkFlag(6) && (perMayor.other == 6 || perMayor.other == 11))	{
			if (perYourBody.FindItem(4) > 0) {
				startAlternatives(md);
				addQuestionC(md, 'tell the Mayor you have the book right here in your backpack', "Mayor", 16999);
			}
			addQuestionC(md, 'tell the Mayor that you don\'t have it on you at the moment', "Mayor", 1606);
			if (perYourBody.FindItem(4) > 0) endAlternatives(md);
		}
		if (perMayor.other < 10 && getPersonOther("Tina") >= 4) {
			// Didn't apologize before, and Tina can un-charm people
			addQuestionC(md, 'tell the mayor to go to the Robbins house', "Mayor", 6104);
		}

	} else {
			// Apprentice path
	}

	if (bMayorYours && sType === "") // if Mayor is charmed
	{
		addLinkToPlace(md, 'ask Mayor Thomas for more', 110, 'type=askmore');

		if (isMurderPath() && perKhan.other < 10) {
			//Haven't apologized and haven't already offered to help.
			addQuestionC(md, 'ask to help out with the murder investigation', "Mayor", 5310);
		}

		if (isPlaceKnown("Museum") && perAbby.getQuestDragonGem() > 0) //Know about the Museum && Know about Dragon Gem
		{
			if (!checkPlaceFlag("Museum", 8)) {
				//Museum is OPEN
				addQuestionC(md, 'tell the Mayor to <i>close</i> the Museum to the public', "Mayor", 13400);
			}	else {
				//Museum is CLOSED
				addQuestionC(md, 'tell the Mayor to <i>re-open</i> the Museum', "Mayor", 13401);
			}
		}
		if (checkPlaceFlag("Hospital", 3) && !checkPlaceFlag("Hospital", 4)) addQuestionC(md, 'ask the Mayor for a key to the hospital basement', "Mayor", 44201);
		if (checkPlaceFlag("Park", 6) && !checkPlaceFlag("Park", 5)) addQuestionC(md, 'ask the Mayor for a key to the construction site', "Mayor", 44202);
	}

	addLinkToPlace(md, 'go to the reception', 95);

	WritePlaceFooter(md);
}