// Place: Church Groundskeeper

function ShowPlace326()
{
	var md = WritePlaceHeader();

	var perPamela = findPerson("Pamela");
	var bCharmed = perPamela.isCharmedBy();
	var myName = perPamela.getYourNameFor();
	var perSister = findPerson("Desiree");

	if (perSister.getQuestRelic() == 35 && perSister.place === 332 && !checkPersonFlag("Daria", 4)) {
		//Desire has the Rosary and Poisoned Mother Superior to get it.
		setPersonFlag("Daria", 4); //Set Mother Superior as "sick"
	}

	/****************************************************************
	Pamela (Church Wall Girl)
	****************************************************************/

	if (!bCharmed) perPamela.showPerson("pamela1.jpg");
	else if (!isDay()) perPamela.showPerson("pamela7c.jpg");
	else perPamela.showPerson(perPamela.checkFlag(8) ? "pamela7b.jpg" : "pamela7a.jpg");


	// TITLE LINE
	addPlaceTitle(md, "Pamela - the Church Groundskeeper");

	// Description
	if (bCharmed)
	{
		md.write('<p>Your Slave Pamela sees you as you approach.  Your very presence seems to bring a blush to her cheeks as she raises her shirt, displaying herself for your viewing pleasure.</p>');

		if (!isPlaceKnown("ChurchSecretDoor") && checkPlaceFlag("Church", 7) && bCharmed) md.write('<p>"Would you like me to show you into the courtyard, ' + myName + '?" she asks, oh-so-willing to do that and... well... anything else you would like.</p>');
	}
	else if (!perPamela.checkFlag(1)) md.write('<p>You see what must be the church grounds keeper taking a break inside the shed.  She notices you as you approach and smiles warmly in your direction.</p>');
	else md.write('<p>You see Pamela working tidying up her tools.  She notices you as you approach and smiles warmly in your direction.</p>');

	if (perSister.getQuestRelic() == 35 && wherePerson("Desiree") === 332) {
		// Desiree is back from getting the rosary
		md.write('<p>"Oh, ' + myName + '!  Did you hear about the Mother Superior?" she asks, concerned.  "She has quite suddenly taken very ill.');
		if (bCharmed) {
			//Pamela is Charmed
			md.write(' I mentioned that I knew of a great healer, but the others didn\'t seem interested," she says, sounding quite disappointed that she wasn\'t able to help.</p>');
		} else md.write('"</p>');

	}

	/* Dialogue Options */
	startQuestions();

	if (isPlaceKnown("ChurchSecretDoor")) addOptionLink(md, 'enter the church courtyard', "EnterChurch(319);");
	addLinkToPlace(md, 'walk to the church entrance', 317);

	WritePlaceFooter(md);
}