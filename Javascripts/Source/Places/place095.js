// Place: Town Hall Reception

function ShowPlace95()
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
	var bHere = perAngela.isHere();
	if (perYou.getQuestRustyKey() == 5) perYou.setQuestRustyKey(7);	// Advance the "Rusty Key" Path
			
	if (!bHere) {
		// Angela not here
		addPlaceTitle(md, "Town Hall Reception", "townhall-reception.jpg");
		md.write('<p>The reception is empty at the moment, Angela is not present.<p>');
		
	} else {
		// Angela is here
		// Images
		if (clv === 0) perAngela.showPerson("angela1.jpg", "", "", "angela1a.jpg");
		else if (Math.random() < 0.5) perAngela.showPerson("angela8a.jpg");
		else perAngela.showPerson("angela8b.jpg");

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
		} else {
			addPlaceTitle(md, "Angela at Reception");
			md.write('<p>Angela is sitting at her desk.</p>');
		}
	}
	// **********************************************************************************
	
	startQuestions();
	
	if (isPlaceKnown("BreakRoom")) addLinkToPlace(md, 'visit the break room', 97);
	if (isPlaceKnown("EmilyOffice")) addLinkToPlace(md, 'visit Emily\'s office', 99);	
	if (isPlaceKnown("TammyOffice")) addLinkToPlace(md, 'visit ' + (getCharmedLevel("Tammy") == 2 ? 'Tammy' : 'the Attorney') + '\'s office', 101);
	if (isPlaceKnown("JohnAdamsOffice")) addLinkToPlace(md, 'visit ' + findPerson("JohnAdams").getPersonNameShort() + ' Adams\'s office', 96);	
	else if (bHere && (wherePerson("Tess") == 96 || wherePerson("JohnAdams") == 96) && !perAngela.checkFlag(7)) addQuestionC(md, 'ask where is ' + findPerson("JohnAdams").getPersonNameShort() + ' Adams office', "Angela", 100);
	if (checkPersonFlag("Savanna", 1)) addLinkToPlace(md, 'visit Savanna\'s office', 102);
	if (bHere && wherePerson("Tess") == 230 && !isPlaceKnown("AdamsHouse")) addQuestionC(md, 'ask Angela for the address for John and Tess Adams home', "Angela", 101);
	if (wherePerson("Mayor") === 110) addLinkToPlace(md, 'visit the Mayor', 110);

   addLinkToPlace(md, 'exit the Town Hall', 94);

	WritePlaceFooter(md);
}