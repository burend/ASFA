// Officer Khan's Office

function ShowPlace169(stype)
{
	var md = WritePlaceHeader(false, stype == "bj" || stype == "fuck" ? "td-left-large" : "");

	var perOK = findPerson("OfficerKhan");

	if (stype === "") {
		// Visit her in the office
		perOK.showPerson("pol10a.jpg");

		addPlaceTitle(md, getOfficer() + " Khan\'s Office");

		md.write('<p>' + getOfficer() + ' Khan swoons over to you, seeking to satisfy your desire. Anything you ask for is yours.</p>');

		// Questions
		startQuestions();
		if (perOK.getPath() == 2 && !isDavyDefeated()) addQuestionC(md, 'tell her to arrest Davy and bring him here', "OfficerKhan", 522);

		addLinkToPlaceC(md, '"I desire you!"', 169, 'type=desire');

	} else if (stype == "desire") {
		// Desire (repeatable sex scenes)
		perOK.showPerson("pol10b.jpg");

		addPlaceTitle(md, "Desiring " + getOfficer() + " Khan");

		md.write('<p>Cheryl starts to strip her clothing, "How is this for a strip search, what do you want me to search now?"</p>');

		// Questions
		startQuestions();
		if (perYou.isMaleSex()) addLinkToPlaceC(md, '"Let me do internal search of you!"', 169, 'type=fuck');
		addLinkToPlaceC(md, 'Gesture and "Search this!"', 169, 'type=bj');

	} else if (stype == "bj") {
		// Blowjob/Lick
		if (perYou.isMaleSex()) perOK.showPerson("pol14b.jpg");
		else perOK.showPersonRorX(isBritish() ? "pol6ga.jpg" : "pol6gb.jpg");

		addPlaceTitle(md, getOfficer() + " Khan's Search");

		md.write('<p>Cheryl thoroughly searches your groin making sure to touch, stroke and lick everything to make sure no orgasm remains concealed.</p>');

		// Questions
		startQuestions();

	} else if (stype == "fuck") {
		// Fuck her!
		perOK.showPersonRorX("pol15b.jpg");

		addPlaceTitle(md, "Searching " + getOfficer() + " Khan");

		md.write('<p>You give ' + getOfficer() + ' Khan a very thorough internal examination. You do not find anything, except a mutual orgasm.</p>');

		// Questions
		startQuestions();

	}

	addLinkToPlace(md, "exit " + getOfficer() + " Khan\'s office?", 168);

	WritePlaceFooter(md);
}