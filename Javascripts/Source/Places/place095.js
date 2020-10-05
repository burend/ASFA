// Place: Town Hall Reception
// attributes
// type
//		= 'coffee'		- ask Angela for a cup of coffee

function ShowPlace95(stype)
{
	var md = WritePlaceHeader();

	if (!isShopOpen(0)) {
		// Empty
		if (!isPlaceBreakIn("TownHall")) return gotoPlaceDelayed(94, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The Town Hall closes and you are asked to leave.');

		addPlaceTitle(md, "Town Hall Reception", "townhall-reception.jpg");

		md.write('<p>The reception is empty at night and no-one is present at all.<p>');

		startQuestions();
		addLinkToPlace(md, "look around", '', '', 'You spend a while searching around but find nothing useful', '', 'WaitHere(5);');
		addTextForQuestions(md, "<b>The doors of the Town Hall are locked</b>", "center");

		WritePlaceFooter(md);
		return;
	}
	var perAngela = findPerson("Angela");
	var clv = perAngela.getCharmedLevel();
	
	if (perAngela.place != 95) {
		
		addPlaceTitle(md, "Town Hall Reception", "townhall-reception.jpg");

		md.write('<p>The reception is empty at the moment, Angela is not present.<p>');

		startQuestions();
		if (isPlaceKnown("JohnAdamsOffice")) addLinkToPlace(md, 'visit John Adams\'s office', 96);
		if (wherePerson("Mayor") === 110) addLinkToPlace(md, 'visit the Mayor', 110);
		addLinkToPlace(md, 'exit the Town Hall', 94);
		WritePlaceFooter(md);
		return;
	}

	if (perYou.getQuestRustyKey() == 5) perYou.setQuestRustyKey(7);	// Advance the "Rusty Key" Path

	// Images
	if (clv === 0) perAngela.showPerson("angela1.jpg", "", "", "angela1a.jpg");
	else {
		if (Math.random() < 0.5) perAngela.showPerson("angela8a.jpg");
		else perAngela.showPerson("angela8b.jpg");
	}

	if (isVisible()) {
		if (clv === 0) {
			// Angela - NOT CHARMED VERSION
			addPlaceTitle(md, "Town Hall Reception");
			md.write('<p>A young lady greets you at the entrance of the town hall. She introduces herself as Angela and asks your business.</p>');
		} else {
			// Angela Charmed
			addPlaceTitle(md, "Angela at Reception");
			if (isCharmedBy("Mayor", "You")) {
				md.write(
					'<p>Over the course of the last few days you have taken control of the Town Hall. Mayor Thomas and her secretary, Angela, are your properties. Especially Miss Thomas, who has become a loyal supporter of yours, she is a puppet whose strings you control. With her influence and power, you can watch over Glenvale and know every small happenings in it.</p>'
				);
				if (clv == 4) {
					md.write(
						'<p>Angela kneels down, greeting you as you enter the office. Her smile always brightens you up a bit. She attends you to her desk and offers you some coffee. She also declares to you that the Mayor is in her office, ready to see you anytime you wish it so. She says it in an official manner, but still keeping her husky voice sexy enough.</p>'
					);
				} else {
					md.write(
						'<p>Angela smiles, greeting you as you enter the office. Her smile always brightens you up a bit. She attends you to her desk and offers you some coffee. She also declares to you that the Mayor is in her office, ready to see you anytime you wish it so. She says it in an official manner, but still keeping her husky voice sexy enough.</p>'
					);
				}
			} else md.write('<p>Angela is pleased to see that you have returned. As you enter the office she begins to rub her breast.<p>');

			if (clv == 4) {
				// Have you Rebuked Angela (asking for hotel plans back.
				md.write('<p>"Hello, ' + perYou.getMaster() + '," she says, lowering her gaze as she speaks to you.  "How may your humble slave serve you?"</p>');
			} else md.write('<p>"Oh my love," she says. "Have you come back for more?"</p>');

			if (isSpellKnown("Wealth") && perYourBody.FindItem(5) === 0 && !perAngela.checkFlag(8)) {
				/* Angela charmed and player has wealth spell and player does not have an old stone */
				perAngela.setFlag(8);
			}
		}
	} else md.write('<p>Angela is sitting at her desk.</p>');
	// **********************************************************************************
	startQuestions();

	switch (perAngela.other)
	{
		case 0:
			addQuestionC(md, 'tell Angela your name, and that you\'re interested in the Town Hall', "Angela", 800);
			break;
		case 1:
			addQuestionC(md, 'ask Angela what she does around here', "Angela", 801);
			break;
		case 2:
			if (perYou.isQuestStarted(1)) addQuestionC(md, 'ask Angela whom you should tell about the strange things you\'ve seen', "Angela", 802);
			break;
	}

	if (checkPlaceFlag("Hotel", 8) && !checkPlaceFlag("Hotel", 4)) {
		if (!checkPlaceFlag("Hotel", 2))	addQuestionC(md, 'ask Angela whether she has any records on the Broken Inn Hotel', "Angela", 4201);
		else {
			if (!checkPlaceFlag("Hotel", 3)) {
				if (clv === 0) addQuestionC(md, 'ask Angela why the plans cost so much', "Angela", 4202);
			}
			if (clv > 0) {
				addQuestionC(md, 'tell your <i>Slave</i> that you will not <i>pay</i> for the plans', "Angela", 4202);
				addQuestionC(md, 'ask your <i>lover</i> to give you the plans as a gift', "Angela", 4203);
			}
			addQuestionCO(md, 'pay Angela ' + sCurrency + '30 for the plans', "Angela", 4230);
		}
	}

	if (getPersonOther("Mayor") === 0) addQuestionC(md, 'tell Angela you would like to see the mayor', "Angela", 1600);

	if (clv > 0)  // Angela is CHARMED
	{
		if (!isPlaceKnown("AngelasApartment")) addQuestionC(md, 'ask Angela where she lives', "Angela", 2600);
		if (clv == 4) addLinkToPlaceC(md, 'tell Angela to lay back and give you some more', Place, 'type=angelamore');
		else addLinkToPlaceC(md, 'ask Angela for some more', Place, 'type=angelamore');
		if (!isPlaceKnown("BreakRoom")) addLinkToPlaceC(md, 'ask Angela for a cup of coffee', 97, 'type=coffee');
	}
	if (isPlaceKnown("BreakRoom")) addLinkToPlace(md, 'visit the break room', 97);
	if (isPlaceKnown("JohnAdamsOffice")) addLinkToPlace(md, 'visit John Adams\'s office', 96);
	if (isPlaceKnown("EmilyOffice")) addLinkToPlace(md, 'visit Emily\'s office', 99);	
	else if (wherePerson("Tess") == 96 && !perAngela.checkFlag(7)) addQuestionC(md, 'ask where is John Adams office', "Angela", 100);
	if (wherePerson("Tess") == 230 && !isPlaceKnown("AdamsHouse")) addQuestionC(md, 'ask Angela for the address for John and Tess Adams home', "Angela", 101);
	if (wherePerson("Mayor") === 110) addLinkToPlace(md, 'visit the Mayor', 110);

	if (whereItem(23) == 999)  // HOTEL MAP LOST WHEN SHOT
	{
		addQuestionC(md, 'pay Angela ' + sCurrency + '30 for the hotel plans again', "Angela", 4230);
		if (clv === 0) addQuestionC(md, 'demand another copy of the Hotel plans', "Angela", 999);
		else {
			if (clv != 4) addQuestionC(md, 'ask your <i>lover</i> to give you another copy of the plans', "Angela", 999);
			else addQuestionC(md, 'demand another copy of the Hotel plans', "Angela", 999);
		}
	}

	if (perAngela.checkFlag(8) && !perAngela.checkFlag(9)) addQuestionC(md, 'ask Angela to look for magic places', "Angela", 702);

  addLinkToPlace(md, 'exit the Town Hall', 94);

	WritePlaceFooter(md);
}