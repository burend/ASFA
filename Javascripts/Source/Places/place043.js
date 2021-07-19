// Place: Yoolaroo Drive

function ShowPlace43()
{
	var md;
	
	if (sType == "gate") {
		// Gate to access the construction road
		md = WritePlaceHeader();
		addPlaceTitle(md, "Access Road Gate", 'accessroad-fence.jpg');

		md.write(
			'<p>The access road is fenced off and locked to prevent unauthorised access. The fence is nothing very sturdy and you could easily climb over it.</p>' +
			'<p>There is an odd symbol on one of the signs, it feels...almost scary...</p>'
		);
		// Choices
		startQuestions();
		if (!checkPlaceFlag("Park", 6)) addPopupLinkToPlace(md, 'climb the fence', 43, 'type=gate', "A Strange Feeling", "<img src='Images/ward.jpg' style='width:20%;float:right;margin:0 0 2em 5px' alt='Ward'>As you touch the fence you feel an odd tingling and then an intense fear come over you. Nothing you can quite pin down, just a sense of dread.</p><p>You back away and your eyes are drawn to the symbol on the sign on the gate. You do not know how, but you know it is that symbol somehow doing it.</p><p>You have to consider another way in.", "setPlaceFlag('Park',6)");
		if (checkPlaceFlag("Park", 5)) addLinkToPlace(md, "unlock the gate and walk down the road", 480);
		addLinkToPlace(md, "return to Yoolaroo Drive", 43);
		WritePlaceFooter(md);
		return;
	}
	
	// Yoolaroo Dr in general
	md = WritePlaceHeader(false, 'td-none');

	addPlaceTitle(md, "Yoolaroo Drive");

	md.write('<p style="margin-bottom:-1px">A quiet suburban street. Looking around, ');
	if (isDay()) md.write('you see parents and their children bustling about the neighborhood. The sound of a lawn mower can be heard in the distance as well as someone calling out to his family.');
	else md.write('you see no-one around the neighborhood, everyone must be inside their homes with their families.');
	md.write('</p>');

	if (isPlaceKnown("GrangerHouse")) {
		// Does the player have Kates Address
		var perMG = findPerson("Mrs Granger");
		var clv = perMG.getCharmedLevel();
		if (clv > 0 && perMG.dress != perMG.getNextDress()) {
			perMG.dress = perMG.getNextDress();
			perMG.setFlag(6, false);
		}
		var perKate = findPerson("Kate");

		md.write('<p style="clear:both">');
		addPlaceImage(md, "house3.jpg", "20%");

		md.write('You can see the Granger\'s house.<br><br>');
		if (!isDay()) {
			if (perMG.place === 177 || perKate.place == 1 || perKate.place == 139.5) md.write('Lights are on in the house so someone is home.</p>');
			else md.write('There are no lights on in the house.</p>');
		} else if (clv === 0) {
			// She is NOT charmed
			if (isDay()) md.write('Mrs. Granger is standing at the doorway. She waves to you and, for a moment, you see the housewife as she could be instead of the mother of your friend. You wave back and receive a smile from Mrs. Granger. You cannot see Kate at the house or along the street.</p>');
			else md.write('The front door is open to let in the breeze, with a light security door in place.</p>');
		}
	}
	if (isPlaceKnown("RobbinsHouse")) {
		// Does the player have Mrs Robbins Address
		md.write('<p style="clear:both">');
		addPlaceImage(md, "house1.jpg", "20%");

		md.write('You can see the Robbins house. <br><br>Looking around the street, you cannot see Davy or any other members of the family.</p>');
		if (perDavy.checkFlag(9) || isSpellKnown("Teleport")) md.write('<p><img style="float:left;height:1.5em" src="' + getThemeFolder() + (isPlaceAttuned(Place) ? 'symbol2' : 'symbol1') + '.png" alt="Hexagram" title="Hexagram"> You see a symbol carved into a tree in the front yard.</p>');
	} else if (!isPlaceKnown("GrangerHouse")) {
		md.write('<p style="clear:both">');
		addPlaceImage(md, "house3.jpg", "20%");
		md.write('</p>');
	}
	md.write('<p style="clear:both">' + addPlaceImage("string", "massage.jpg", "15%", '', '', undefined, true) + 'The local massage parlor is here and it is ' + (isShopOpen(2, 0, true) ? 'open' : 'closed') + ', opening times listed as 8am to 8pm.</p><p style="clear:both"> </p>');

	
	startQuestions(undefined, "clear");
	if (isPlaceKnown("GrangerHouse")) addLinkToPlace(md, "enter the Granger\'s residence", 177);	// Does the player have Kate's address?
	if (isPlaceKnown("RobbinsHouse")) addLinkToPlace(md, "enter the Robbins residence", 176);		// Does the player have Mrs Robbins address
	if (isShopOpen(2, 0, true)) addLinkToPlace(md, "visit the massage parlor", 48);
	if (checkPlaceFlag("Park", 4)) addLinkToPlace(md, "check the construction access road", 43, 'type=gate');
	if (isPlaceKnown("DervishRd")) addLinkToPlace(md, "walk to Dervish Rd", 5);
	
	addLinkToPlace(md, "walk to the alley", 52);

	WritePlaceFooter(md);
}