// Debra and Janet Kelly's house

function ShowPlace112(stype)
{
	// Who is here?
	var perJanet = findPerson("JanetKelly");
	var myNameJ = perJanet.getYourNameFor();
	var clvJ = perJanet.getCharmedLevel();
	var perDebra = findPerson("DebraKelly");
	var herNameD = perDebra.getPersonName();
	//var myNameD = perDebra.getPersonName();
	var clvD = perDebra.getCharmedLevel();

	var totpeople = perJanet.place == 112 ? 1 : 0;
	if (perDebra.place == 112 && clvD != 1) totpeople++;

	var hJ = perJanet.getPersonTitle();

	var md = WritePlaceHeader(false, totpeople > 1 ? "td-left-large" : "td-left");

	md.write('<table><tr>');
	if (perJanet.place == 112) {
		// Janet is here
		md.write('<td' + (totpeople > 1 ? ' style="width:50%"' : '') + '>');
		if (clvJ > 0) {
			if (clvJ == 3) perJanet.showPerson("home-visit-bimbo.jpg", "99%");
			else if (clvJ == 5) perJanet.showPerson("home-visit-cat.jpg", "99%");
			else perJanet.showPerson("home-visit-gf.jpg", "99%");
		} else perJanet.showPerson("home-visit.jpg", "99%");
	}
	if (perDebra.place == 112 && clvD !== 1) {
		// Debra is here
		md.write('<td' + (totpeople > 1 ? ' style="width:50%"' : '') + '>');
		if (clvD === 0) perDebra.showPersonDN("debra11d.jpg", "99%", "", "debra11e.jpg");
		else if (clvD == 2) perDebra.showPersonDN("debra13b.jpg", "99%");
		else if (clvD == 3) perDebra.showPersonRandom("debra11", 2, "99%");
		md.write('</td>');
	}
	md.write('</tr></table>');

	//****************************  Kelly, v67/v68  ********************************
	addPlaceTitle(md, "Debra & Janet Kelly\'s Residence");
	md.write('<p>Furniture and boxes are strewn all over the house from the girls\' settling into their new home.</p>');

	if (perDebra.place == 112 && clvD == 1) {
		perDebra.showPersonRandom("debra11c", 2, "60%", "left");
		gameState.lFloat = '';
		md.write('<div style="float:left;width:15px;height:5em">&nbsp;<br>&nbsp;<br>&nbsp;<br></div><p>Your puppy Debra is sitting on the floor, completely naked' + addVisible(', looking at you eagerly') + '.</p>');
	}

	if (clvJ === 0) // Janet is NOT charmed
	{
		if (!perJanet.checkFlag(1)) {
			md.write('<p style="clear:both">You introduce yourself as Debra\'s friend to her sister, Janet, who invites you into the lounge room.</p>');
			perJanet.setFlag(1);
		}
		md.write('<p style="clear:both">Janet invites you to sit on one of the boxes as she hands you a glass of tea, evidently taking a break from the unpacking.</p>');
	}
	else // Janet is Charmed
	{
		if (perJanet.place == 112) {
			md.write('<p style="clear:both">You see ' + hJ + 'Janet is sitting on a chair' + addVisible(' looking at you,<br>'));
			if (isVisible()) {
				if (clvJ == 3) md.write('<p>"Like, Hi there, ' + myNameJ + ', you wanna do me?" She asks, her body and mind already responding to your presence, becoming more and more aroused every moment.</p>');
				else if (clvJ == 5) md.write('<p>"Like, Hi there, ' + myNameJ + ', you wanna do me?" She asks, her body and mind already responding to your presence, becoming more and more aroused every moment.</p>');			
				else md.write('<p>"Welcome back, ' + myNameJ + ', what can I do for you?" She asks, her body and mind already responding to your presence, becoming more and more aroused every moment.</p>');
			}
		}
	}
	if (perDebra.place == 112) {
		if (clvD === 0) {
			if (isDay()) md.write('<p>Debra is nearby taking a break from unpacking some boxes.</p>');
			else md.write('<p>Debra is nearby relaxing, wearing a rather cute nightie.</p>');
		} else if (clvD == 2) md.write(isVisible() ? '<p>Debra is standing looking at you, her lover, seductively.</p>' : '<p>Debra is standing and looking very sexy.</p>');
	}
	startQuestions();
	
	// Janet questions
	if (clvJ > 0) addLinkToPlaceO(md, (clvJ == 2 || clvJ === 0 ? "ask" : "order") + ' ' + hJ + 'Janet to show you her room again.', 113);

	// Debra Questions
	if (perDebra.place == 112) {
		if (clvD != 0) addLinkToPlaceO(md, isDay() ? "'join' Debra outside" : "'join' Debra in the TV room" , 114);
		if (clvJ > 0 && clvD > 0 && perJanet.checkFlag(8)) {
			addLinkToPlace(md, "ask them to show some sisterly affection" , 112, 'type=incestsex');
			addLinkToPlace(md, "ask them to show you some affection" , 112, 'type=threesomesex');
		}
	}

	addLinkToPlace(md, 'exit the house', 44);

	WritePlaceFooter(md);
}