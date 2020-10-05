// Place: Emily's Office at the Town Hall (HR)

function ShowPlace99(stype)
{
	var md = WritePlaceHeader();

	if (!isShopOpen(0)) {
		// Empty
		if (!isPlaceBreakIn("TownHall")) return gotoPlaceDelayed(94, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The Town Hall closes and you are asked to leave.');

		addPlaceTitle(md, "Town Hall Human Resources Office", "townhall-office1.jpg");

		md.write('<p>The office is empty at night and no-one is present at all.<p>');

		startQuestions();
		addLinkToPlace(md, "look around", '', '', 'You spend a while searching around but find nothing useful', '', 'WaitHere(5);');
		addLinkToPlace(md, 'return to reception', 95);

		WritePlaceFooter(md);
		return;
	}
	
	var perEmily = findPerson("Emily");
	var clv = perEmily.getCharmedLevel();

	if (!perEmily.isHere()) {

		addPlaceTitle(md, "Town Hall Human Resources Office", "townhall-office1.jpg");

		md.write('<p>The office is empty at the moment, Emily is not present.<p>');

		startQuestions();
		addLinkToPlace(md, 'return to reception', 95);
		addLinkToPlace(md, 'exit the Town Hall', 94);
		WritePlaceFooter(md);
		return;
	}

	// Images
	if (clv === 0) perEmily.showPerson("emily1n.jpg");
	else perEmily.showPerson("emily1c.jpg");

	if (isInvisible()) md.write('<p>Emily is sitting at her desk.</p>');
	else if (clv === 0) {
		// Emily - NOT CHARMED VERSION
		addPlaceTitle(md, "Town Hall Human Resources Office");
		md.write('<p>Emily looks over to you as you enter the office. “Oh, so you are the new intern then?”</p>');
	} else {
		// Emily - Charmed
		addPlaceTitle(md, "Emily's Office");
		md.write(
			'<p>Emily sees you enter and immediately leans over her desk and pulls one of her breasts out of her top.</p>' +
			'<p>“Yes ' + perYou.getMaster() + ', how may I help you?”<p>'
		);
	}
	
	// **********************************************************************************
	startQuestions();

	if (clv === 0 || sType !== "") addLinkToPlace(md, 'return to reception', 95);
	else addLinkToPlaceC(md, '“Nothing for now”', 95);
	addLinkToPlace(md, 'exit the Town Hall', 94);

	WritePlaceFooter(md);
}