// Place: New Age Store

function ShowPlace345(stype)
{
	if (!isShopOpen(-1, 1, true)) return gotoPlaceDelayed(344, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The New Age ' + getShopStore(true) + ' closes and the owner Esmeralda asks you to leave.');

	var perJessica = findPerson("Jessica");
	var plcJessica = perJessica.place;
	var perGypsy = findPerson("Gypsy");
	var perDesiree = findPerson("Desiree");
	var perLeanne = findPerson("Leanne");
	var perVamp = findPerson("Vampyre");

	var md = WritePlaceHeaderNI();

	perGypsy.showPerson("gypsy1.jpg");
	addPlaceTitle(md, "New Age " + getShopStore(true));

	var myName = perYou.getPersonName();

	// Will only have the stone to sell if you enter her shop with less than 20 mana
	if (nMana < 20) perGypsy.setFlag(7);

	md.write('<p>A small ' + getShopStore() + ' that sells a wide range of new age, occult and spiritual items. The owner is dressed as a gypsy fortune teller, either as a costume for the customers or maybe she actually is one?</p>');

	if (isVisible()) {
		md.write('<p>The Gypsy fortune teller leans forward as you enter.  "Yes ' + myName + ', how can I help you today?"</p>');

		if (perGypsy.checkFlag(7)) {
			//Wants to sell you a stone
			md.write('<p>"Oh, ' + myName + '. I noticed something in my recent shipment of stones this morning that might interest you," she says, placing a small stone on the table. "Given the nature of the item...  I believe ' + sCurrency + '100 is a fair price."</p>');
		}

		// Items for sale
		startQuestionsOnly("Items for sale");

		if (perGypsy.checkFlag(7)) addQuestionC(md, 'pay ' + sCurrency + '100 for the rustic stone', "Gypsy", 1717, 'travelblock');
		addQuestionC(md, 'pay ' + sCurrency + '45 for the quartz crystal', "Gypsy", 52, 'travelblock');
		addQuestionC(md, 'pay ' + sCurrency + '20 for some beeswax candles', "Gypsy", 54, 'travelblock');
		if (whereItem(60) == 345) addQuestionC(md, 'pay ' + sCurrency + '100 for a book on Hypnosis', "Gypsy", 51, 'travelblock');
		if (perYourBody.FindItem(49) === 0) addQuestionC(md, 'pay ' + sCurrency + '20 for some holy water from the church', "Gypsy", 49, 'travelblock');		//do not already have the holy water
	}

	// Choices
	bQuestionsShown = false;
	startQuestions(undefined, 'br');
	//startQuestions();

	if (!perGypsy.checkFlag(9)) addQuestionC(md, '"Uh, how did you know my name?"', "Gypsy", 15701);

	if (perKurndorf.getQuestGhost() >= 100 && perKurndorf.getQuestRitual() < 200) //Questions about the Ritual
	{
		if (!perGypsy.checkFlag(1)) addQuestionC(md, '"Do you have any... uhm.... Hemlock?"', "Gypsy", 1711);
		if (!perGypsy.checkFlag(2)) addQuestionC(md, '"Where can I find a silver dagger?"', "Gypsy", 1712);
		if (!perGypsy.checkFlag(3)) addQuestionC(md, '"Happen to know where I can find a human skull?"', "Gypsy", 1713);
		if (!perGypsy.checkFlag(4)) addQuestionC(md, '"Know of any way to protect someone from a...  evil spirit?"', "Gypsy", 1714);
	}

	if (!perGypsy.checkFlag(8) && perDesiree.getQuestRelic() > 0 && perDesiree.getQuestRelic() < 100) {
		//Started the Catholic Relic Path & haven't finished it yet.
		addQuestionC(md, '"Do you know anything about an old Catholic Relic at the local church?"', "Gypsy", 1718);
	}
	if (checkPersonFlag("Pamela", 11) && !checkPersonFlag("Pamela", 12)) addQuestionC(md, '"Are you looking for a \'Twin Souls\' bracelet?"', "Gypsy", 80);
	if (checkPersonFlag("Pamela", 12) && !(checkPersonFlag("Pamela", 13) || checkPersonFlag("Pamela", 14))) {
		addQuestionC(md, 'Answer: "Yes, I do"', "Gypsy", 81);
		addQuestionC(md, 'Answer: "No, <b>I</b> do not"', "Gypsy", 82);
	}
	if (whereItem(60) === 0 && perYou.checkFlag(12)) addQuestionC(md, '"Do you have any books on hypnosis"', "Gypsy", 53);
	if (perLeanne.place == 382 && !perLeanne.checkFlag(9)) addQuestionC(md, 'ask her about saving a person from demons', "Gypsy", 700);

	if (perVamp.other > 50 && !perVamp.checkFlag(10)) addQuestionC(md, '"Do you know much about Vampires"', "Gypsy", 55);
	// Jessica

	addLinkToPlace(md, 'leave the ' + getShopStore(), 344);

	WritePlaceFooter(md);
}