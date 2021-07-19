// Place: General Store

function ExitGeneralShop()
{
	var perLea = findPerson("Leanne");
	if (perLea.other == 1) perLea.other = 5;
}

function ShowPlace195()
{
	var md = WritePlaceHeaderNI();

	var perLou = findPerson("Louise");
	var clvLou = perLou.getCharmedLevel();
	var perLea = findPerson("Leanne");
	//var clvLea = perLea.getCharmedLevel();
	var perAnita = findPerson("Anita");
	var myName = perYou.getPersonName();
	if (perAnita.isHere()) {
		if (!perAnita.checkFlag(1)) startTimedEvent("movePerson('Anita',1000)", 40);		// Only here for a limited time shopping
		else if (perAnita.setFlag(11) && !perAnita.checkFlag(10)) startTimedEvent("movePerson('Anita',1000)", 40);		// Only here for a limited time shopping
	}

	// ****** Left Images *******
	if (perLea.place == 195) {
		//Still Leanne
		perLea.showPerson(Math.random() < 0.5 ? "leanne1b.jpg" : "leanne1c.jpg");
	} else {
		//Louise
		if (!perLou.checkFlag(1)) perLou.place = 195;
	}

	// **** Title ****
	addPlaceTitle(md, "General " + getShopStore(true));

	// **** Descriptions ****
	if (perLea.place == 195) {
		// Leanne is here
		md.write('<p>Leanne, your friend and part-time shopkeeper');
		if (isVisible()) {
			md.write(', greets you as you enter the general ' + getShopStore() + '. In her normal bubbly manner she smiles and asks ');

			if (perLea.other === 0 && nMoney < 20 && perLea.checkFlag(25)) {
				// Haven't watched the store yet and have less than $20.
				md.write('if you could look after the ' + getShopStore() + ' while she goes out to the back to take care of something.</p>');
			} else {
				md.write('"What are you looking for today, ' + myName + '?"</p>');
			}
			if (perLea.other == 2) {
				// Already took the $20 from the Till
				md.write('<p>Leanne hesitates for a moment, then asks "' + myName + ', you didn\'t notice anyone near the register before, did you?  I seem to be short ' + sCurrency + '20."</p>');
			} else if (perLea.other == 5) {
				md.write('<p>Leanne smiles warmly at you. "Thank you so much for watching the ' + getShopStore() + ' for me, ' + myName + '.  If I can ever help you out just let me know."</p>');
			}
		} else md.write(' is tending the store</p>');

	}
	if (perLou.place == 195) {
		//Its now Louise
		if (clvLou === 0) {
			//Louise Normal
			md.write('<p>The ' + getShopStore() + ' is almost deserted this time of day and Leanne has stepped out.  The only employee present is Louise, ' + (isVisible() ? 'who smiles companionably at you as she mops' : ' who is mopping') + 'the floor.</p>');
			if (isVisible()) {
				if (perLou.checkFlag(2)) md.write('<p>"Hey, ' + perYou.getPersonName() + '.  How\'s my favorite co-worker doing?"</p>');
				else md.write('<p>"Hey, ' + perYou.getPersonName() + '.  How\'re you doing?"</p>');
			}
		} else if (perLou.checkFlag(4)) md.write('<p>The ' + getShopStore() + ' is almost deserted this time of day and Leanne has stepped out.  The only employee present is your slave Louise' + addVisible(', who smiles eagerly and opens her uniform to show her newly enlarged breasts for your viewing pleasure') + '.</p>');
		else if (perLou.checkFlag(5)) md.write('<p>The ' + getShopStore() + ' is almost deserted this time of day and Leanne has stepped out.  The only employee present is your slave Louise' + addVisible(', who smiles eagerly and opens her uniform to show her body and her new cock for your viewing pleasure') + '.</p>');
		else md.write('<p>The ' + getShopStore() + ' is almost deserted this time of day and Leanne has stepped out.  The only employee present is your slave Louise' + addVisible(', who smiles eagerly and lifts the edge of her outfit discreetly for your viewing pleasure') + '.</p>');
	}
	if (perAnita.isHere()) {
		if (!perAnita.checkFlag(1)) {
			// First sighting of Anita at the shop
			md.write('<p>You notice a young woman doing some shopping in the ' + getShopStore() + ', wearing a tight green dress. She attracted your attention, aside from her figure, because she is looking a bit nervous and glancing around. You hear her mutter something about "cops" and "gotta be quick", it seems she may be wanted or maybe just paranoid.</p>');
			perAnita.setFlag(1);
		} else if (perAnita.checkFlag(11) && !perAnita.checkFlag(10)) {
			// Second sighting of Anita at the shop
			md.write('<p>You notice the young woman you saw the other day doing some more shopping in the ' + getShopStore() + ', wearing the same tight green dress. You hear her mutter something about "almost time to get out...".</p>');
			perAnita.setFlag(10);
		} else md.write('<p>You notice the young woman wearing the tight green dress is quickly doing her shopping.</p>');

	} else if (perAnita.checkFlag(1) && !perAnita.isCharmedBy() && !perAnita.checkFlag(3)) {
		md.write('<p>It seems the customer in the tight green dress has finished her shopping and left.</p>');
		perAnita.setFlag(3);
	}

	//************************ Shop Items for Sale *******************************************************
	// Update inventory of the store
	if (whereItem(30) == 999) moveItem(30, 195);	// Put the Shovel back here if lost when shot
	if (perYou.getExperience() > 9 && whereItem(28) === 0) PlaceI(28, 195);

	// Show purchase options
	if (whereItem(28) == 195) md.write('<p>An object catches your eye. Inside of a glass paperweight you see a stone that looks familar.</p>');

	if (!checkPlaceFlag("ShoppingCenter", 2) && isCharmedBy("Monique")) {
		setPlaceFlag("ShoppingCenter", 2);
		md.write('<p>You notice that quite a few headlines in the newspaper stand refer to a series of <b>burglaries</b> within the last 2 weeks. The police is openly asking for leads in the investigation and advises everyone to double check doors and windows at night.</p>');
	}

	if (isVisible()) {
		startQuestionsOnly("Items for sale");

		if (whereItem(28) == 195) addQuestionC(md, 'buy a paperweight for ' + sCurrency + '3', "Leanne", -19528, 'travelblock');
		addQuestionC(md, 'buy a shovel for ' + sCurrency + '15', "Leanne", -19530, 'travelblock');
		addQuestionC(md, 'buy a pair of scissors for ' + sCurrency + '5', "Leanne", -19555, 'travelblock');
		if (whereItem(47) == 195) addQuestionC(md, 'buy a sports bag for ' + sCurrency + '10', "Leanne", -19556, 'travelblock');
		if (checkPersonFlag("Vampyre", 10)) addQuestionC(md, 'buy some garlic for ' + sCurrency + '2', "Leanne", -19557, 'travelblock');
		//md.write('<br>');
	}

	//********* Choices **********
	bQuestionsShown = false;
	startQuestions(undefined, 'br');
	if (perLea.other === 0 && perLea.place == 195 && nMoney < 20 && perLea.checkFlag(25)) addLinkToPlaceC(md, 'agree to look after the ' + getShopStore(), Place, 'type=mindstore');
	if (perAnita.isHere()) {
		if (!perAnita.checkFlag(2)) addQuestionR(md, 'say hello to the customer', 'You approach the girl and say hello, she looks at you, clearly thinking you are trying to pick her up. Angrily she tells you <i>&quot;Get lost ' + (perYou.isMaleSex() ? 'man ' : '') + 'slut!&quot;</i><br><br>She turns her back to you and ignores you.', 'Girl', "bChatLeft=false;setPersonFlag(\\'Anita\\',2);");
		else if (!perAnita.checkFlag(5)) addQuestionR(md, '"Well lady, you\'re a bitch"', 'You snap back calling her a bitch, <i>&quot;I&rsquo;m no lady, I am a pat..I am Anita. Get lost or you will be in a world of pain!&quot;</i><br><br>She turns her back to you again. You do not doubt her words.', 'Girl', "bChatLeft=false;setPersonFlag(\\'Anita\\',5);");
	}

	addLinkToPlace(md, 'exit the general ' + getShopStore(), 194);

	// ******** Right col images *******
	if (perAnita.isHere()) {
		AddPeopleColumnLarge();
		perAnita.showPerson("anita10a.jpg", "100%", "", "", "Customer");
	}

	WritePlaceFooter(md);
}