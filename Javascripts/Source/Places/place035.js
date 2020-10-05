// Place: Kate's Room - Empty

function ShowPlace35(stype)
{
	var perKate = findPerson("Kate");
	var md = WritePlaceHeader();
	if (stype === "") {
		// Empty room
		addPlaceTitle(md, "Kate\'s Bedroom", "bedroom5.jpg");

		if (perKate.checkFlag(18)) {
			if (isInvisible()) md.write('<p>You are waiting in Kate\'s room, quiet and invisible.</p>');
			else if (perYou.checkFlag(16)) md.write('<p>You are quietly hiding in the wardrobe in Kate\'s room.</p>');
			else if (perKate.checkFlag(9)) {
				if (perKate.checkFlag(21)) md.write('<p>You are in Kate\'s room, and you have finished making room in her wardrobe.</p>');
				else if (perKate.checkFlag(20)) md.write('<p>You are in Kate\'s room, there is still not enough room in her wardrobe to hide.</p>');
				else if (perKate.checkFlag(19)) md.write('<p>You are in Kate\'s room, you have quickly rearranged some stuff, but there is not enough room in the wardrobe to hide.</p>');
				else md.write('<p>You are in Kate\'s room, possibly you could make some space in her wardrobe to hide?</p>');
			} else md.write('<p>You are in Kate\'s room, but there is no way she will not see you when she returns, how can you make sure she does not notice you?</p>');
		} else md.write('<p>You wait for Kate but, as time goes by, you realise that she isn\'t coming home.</p>');

		startQuestions();

	} else if (stype == "clobbered" || stype == "clobberedvisible") {
		// You tried to charm her
		nMoney = nMoney > 0 ? 0 : nMoney;  //Kate takes ALL your cash
		AddCash(0);  //Refresh the cash counter
		perKate.place = 9999;		// Kate leaves town
		perKate.setFlag(4);		// pissed her off (duh!)

		if (perDavy.getPathHellgate() === 0) {
			//Haven't started the Hellgate Path yet
			perDavy.setPathHellgate(1);  //Start it...  alternative start to the Hellgate path in case you didn't get shot
		}

		showPopupWindow("", '::THUD:: Did someone get the license number of that TRUCK!?!', "");

		addPlaceTitle(md, "Kate\'s Empty Bedroom", "bedroom5.jpg");

		if (stype == "clobberedvisible") {
			md.write(
				'<p>You black out for a bit, and wake some time later, your head is throbbing and you are fairly sure that there is a very large <i>bump</i> on the back of your head for a while.</p>' +
				'<p>Kate saw you as she return to her room,  <i>Man she can hit hard!</i> You think to yourself.</p>' +
				'<p>A few moments later you realize Kate did more than just hit you...  it would seem she liberated your cash from your pocket before she left.</p>' +
				'<p>You see a note sitting on a side table</p>' +
				'<p>"<i>You ' + (perYou.isMaleSex() ? "bastard" : "bitch") + ', you are scum, I hope to never see you again. I getting the hell out of the town, I will sort things our with Mama</i>"');

		} else {
			md.write(
				'<p>You black out for a bit, and wake some time later, your head is throbbing and you are fairly sure that there is a very large <i>bump</i> on the back of your head for a while.</p>' +
				'<p>Kate must have noticed as you started to cast the spell.  <i>Man she can hit hard!</i> You think to yourself.</p>' +
				'<p>A few moments later you realize Kate did more than just hit you...  it would seem she liberated your cash from your pocket before she left.</p>' +
				'<p>You see a note sitting on a side table</p>' +
				'<p>"<i>You ' + (perYou.isMaleSex() ? "bastard" : "bitch") + ' I almost trusted you! The you had to do whatever that is, something like Davy. You are scum, I hope to never see you again. I getting the hell out of the town, I will sort things our with Mama</i>"');
		}
		startQuestions();

	}

	addOptionLink(md, 'wait for Kate?', "bChat = false;WaitHere();WriteComments('You wait for a bit');");
	if (perKate.checkFlag(7)) addLinkToPlace(md, 'look at the ' + (perKate.checkFlag(9) ? 'first ' : '') + 'photo album', 35, 'type=album1&page=1');
	if (perKate.checkFlag(9)) addLinkToPlace(md, 'look at the second photo album', 35, 'type=album2&page=1');

	if (perKate.checkFlag(18) && perKate.checkFlag(9) && !isInvisible() && !perYou.checkFlag(16)) {
		if (perKate.checkFlag(21)) addOptionLink(md, "hide in the wardrobe", 'perYou.setFlag(16);dispPlace();');
		else if (perKate.checkFlag(20)) addOptionLink(md, "try to make more room in the wardrobe", "setPersonFlag('Kate',21);dispPlace();");
		else if (perKate.checkFlag(19)) addOptionLink(md, "try to make more room in the wardrobe", "setPersonFlag('Kate',20);dispPlace();");
		else addOptionLink(md, "try to make room in the wardrobe", "setPersonFlag('Kate',19);dispPlace();");
	}

	if (wherePerson("MrsGranger") === 177) addLinkToPlace(md, 'look for Mrs Granger', 177);
	addLinkToPlace(md, 'exit the house?', 43);

	WritePlaceFooter(md);
}