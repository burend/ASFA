// Place: Granger home Living Room

function ShowPlace177()
{
	var md = WritePlaceHeader();

	var perMG = findPerson("Mrs Granger");
	var clv = perMG.getCharmedLevel();
	var perKate = findPerson("Kate");
	var perVamp = findPerson("Vampyre");
	var bKateHere = perMG.checkFlag(13) && perKate.place == 1;

	if (perMG.isHere()) {
		// Mrs. Granger is home
		if (clv > 0) {
			// Charmed
			if (perVamp.isHere()) {
				if (bKateHere) perVamp.showPerson("vampgrangersmeet.jpg");
				else perVamp.showPerson("vampmrsgrangermeet.jpg");
			} else if (bKateHere) perMG.showPersonRandom("!grangerfamily1", 2);
			else perMG.showPersonDN("granger-home.jpg");
		} else perMG.showPerson("granger1.jpg");
	} else addPlaceImage(md, "livingroom1.jpg");

	addPlaceTitle(md, "34 Yoolaroo Dr");
	md.write('<p>34 Yoolaroo Drive, the address of the Granger family.</p><p>');

	// Is Mrs Grainger here?
	if (perMG.isHere() && isVisible()) {
		if (clv === 0) {
			// Normal
			if (perMG.extra[1] === 0) {
				md.write(
					'It is a pleasant house with a flower garden in the front yard. Everything is neatly trimmed and painted, reminding you of a house from a movie. The front fence is made of low pickets and the gate swings open without a squeak. A concrete pathway leads to the front door where you meet Mrs. Granger.</p>' +
					'<p>Smiling, Kate\'s mother greets you and asks you into the house. Looking around you can see Mrs. Granger is alone and you curse silently to yourself. Not wanting to appear rude you wait until you are in the front room.</p>' +
					'<p>You once heard Kate mention that her mother works as an archaeologist, and you think she said her mother has a \'top\' position but only works part-time due to budget issues at her...university? Well that certainly explains where Kate got her brains from, and looking at Mrs. Granger now, at lot of her beauty as well!</p>'
				);
			} else md.write('<p>Smiling, Mrs. Granger meets you in the front room of the house.</p>');

		} else {
			// Charmed
			if (perVamp.isHere()) md.write('Mrs. Granger greets you with a kiss but is interrupted as Lilith starts to remove her clothing. She says to Lilith, "Just a moment Dear, we can play in a moment"' + (bKateHere ? ' Kate joins them stripping all of her clothing.' : '') + '</p>');
			else if (perMG.other == 23) md.write('Mrs. Granger greets you with a kiss.<br><br>"I did as you asked, dear, and I have found something at the Wild Ranges."</p>');
			else if (perMG.other == 24 || getPersonOther("Tess") == 27) md.write('Mrs. Granger greets you with a kiss.<br><br>"What else can I do for you my dear?" she asks, her eyes imploring you.</p>');
			else if (perMG.other == 21 || clv == 3) md.write('Mrs. Granger greets you as you enter. She beckons you over; you can see what she has on her mind.</p>');
			else if (clv == 3) {
				md.write(
					'Mrs. Granger invites you in seductively and you see she is wearing her ' +
					(isDay() ? 'tight blue dress' : 'blue lingerie') + '.</p>' +
					'<p>"Can I make you comfortable, dear?"</p>'
				);
			} else if (clv == 1) {
				md.write(
					'Mrs. Granger invites you in and you see she is wearing her ' +
					(isDay() ? 'top and leather pants' : 'exercise gear') + '.</p>' +
					'<p>"Why don\'t you make yourself comfortable, dear"</p>'
				);
			}
		}
		if (perMG.extra[1] == 1) {
			md.write('<p>"Hmm.  Would you like something to drink, hon?"<br>');
		}	else if (perMG.extra[1] == 1.1) {
			md.write('<p>Mrs. Granger returns with a cold glass of water.  "Need anything else, hun?" she asks.</p>');
		}	else if (perMG.extra[1] == 4) {
			if (perMG.checkFlag(33)) md.write('<p>She looks at you expectantly.  "Willing to help me out with my party planning?" she asks.</p>');
			else md.write('<p>She looks at you expectantly.  "Willing to help me out with my little problem?" she asks.</p>');
		}

	} else {
		md.write('So far your visits here have been very rewarding.');
		if (perKate.place == 1) md.write(' As you step into the room you hear a noise elsewhere in the house.');
		md.write('</p>');
	}

	if (perKate.place == 9999 && (perMG.other == 50 && perMG.checkFlag(1)) && perMG.place !== 177) {
		md.write('<p>There is a opened letter on the table, a glance at it and it tells of Mrs. Grangers hospitalisation and that she is in the ICU.</p>');
		setPlaceKnown("Hospital");  // Set the Hospital as known if not already
	}

	
	startQuestions();

	// Places to go in the house
	if (perKate.place == 1 || perKate.place == 139.5) {
		// Kate is @ Home
		if (perKate.place == 1 && perKate.other >= 15 && perKate.isCharmedBy("Davy")) addLinkToPlace(md, 'visit Kate\'s room', 108);	// Kate ready to kill you and you already know about the hospital
		else if (perKate.checkFlag(6) || perKate.checkFlag(16)) addLinkToPlace(md, 'visit Kate\'s room', 139, '', perMG.checkFlag(13) ? 'Kate follows you into her room. Mrs. Granger calls out, "Have fun!"' : '');
		else if (perKate.place == 1 && perMG.place != 177) addLinkToPlaceC(md, '"Hello! Kate are you there?"', 139, '', 'You call out to Kate, and she steps out and invites you into her room');
	} else addLinkToPlace(md, 'visit Kate\'s room', 35);
	addLinkToPlace(md, 'exit the house?', 43);

	WritePlaceFooter(md);
}