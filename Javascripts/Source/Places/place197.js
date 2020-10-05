// Antiques & Artifacts Shop

function ShowPlace197()
{
	var md = WritePlaceHeader();
	
	var perVictoria = findPerson("Victoria");
	var clv = perVictoria.getCharmedLevel();
	var bStartEvent2 = (clv == 2 && (!perVictoria.checkFlag(10) || !perVictoria.checkFlag(11) || !perVictoria.checkFlag(12) || !perVictoria.checkFlag(13) || !perVictoria.checkFlag(14)));

	/*  PICTURE REFERENCES */
	if (clv === 0) {
		//NOT CHARMED
		if (!isShopOpen(0, 0, true)) return gotoPlaceDelayed(194, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The antiques ' + getShopStore() + ' closes and Victoria asks you to leave.');
		perVictoria.showPerson("victoria1a.jpg");
		
	} else {
		// Charmed and not an event
		if (bStartEvent2) perVictoria.showPerson("victoria4.jpg");
		else if (isNight()) perVictoria.showPerson("victoria1c.jpg");
		else if (clv == 4) perVictoria.showPerson("victoria1b.jpg");
		else perVictoria.showPerson("victoria2.jpg");
	} 

	/* TITLE LINE */
	addPlaceTitle(md, "Antiques & Artifacts");

	/* Description */
	md.write('<p>The Antique and Artifact ' + getShopStore(true) + ' is a quaint little ' + getShopStore() + ' that seems to have a little bit of everything - from the rare and valuable to the type of stuff your grandmother might have.</p>');
	if (isVisible()) {
		if (!perVictoria.checkFlag(8) && !perVictoria.isCharmedBy()) {
			//haven't met yet
			md.write(
				'<p>Your eyes and hands wander over some of the items for sale as you walk through the ' + getShopStore() + '.</p>' +
				'<p>At the back of the ' + getShopStore() + ' you run into the ' + (isBritish() ? 'shop assistant' : 'store clerk') + '. She looks up as you approach.   "Hello, can I help you with something today?"</p>'
			);
		} else if (clv === 0) {
			md.write(
				'<p>Your eyes and hands wander over some of the items for sale as you walk through the ' + getShopStore() + '.</p>' +
				'<p>You find Victoria managing the ' + getShopStore() + '.  She looks up as you approach.</p>'
			);
		} else {
			//CHARMED
			md.write(
				'<p>Only people who are interested in the occult and mysterious come where. Which is, let’s face it, a small handful of people. The ' + getShopStore() + ' stands mostly empty during the day, only one or two costumer stop by.</p>' +
				'<p>Your lovely personal assistant, Victoria, still takes care of the ' + getShopStore() + ' after she sworn herself to you. In this way, she still has a regular job to do and something to keep her occupied. It would be too much for you to handle if she would follow you around, not leaving your side. Well, maybe one day you can make her dream come true, but you can’t take risks at the moment.</p>' +
				'<p>Victoria stands behind a counter. "Hello, ' + perYou.getMaster() + '. I\'m so glad you\'re here. Is there <i>anything</i> I can do for you?"</p>'
			);
		}
	} else md.write('<p>You see Victoria ' + (isNight() ? 'sitting and reading' : 'tending to the store') + '.</p>');

	// Shoppng Options
	if (!isInvisible() && perVictoria.checkFlag(35) && !perVictoria.checkFlag(36)) {
		startQuestionsOnly("Items for sale");
		addQuestionC(md, 'buy assorted occult papers for ' + sCurrency + '50', "Victoria", -2718, 'travelblock');
		md.write('<br>');
		bQuestionsShown = false;
	}

	// Dialogue Options
	startQuestions();
	addLinkToPlace(md, 'leave the ' + getShopStore(), 194);

	WritePlaceFooter(md);
}