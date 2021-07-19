// Place: Tamara's Office at the Town Hall

function ShowPlace101(stype)
{
	var md = WritePlaceHeader();
		
	var perTammy = findPerson("Tammy");

	if (!isShopOpen(0) || !perTammy.isHere()) {
		// Empty
		if (!isShopOpen(0) && !isPlaceBreakIn("TownHall")) return gotoPlaceDelayed(94, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The Town Hall closes and you are asked to leave.');

		addPlaceTitle(md, "Town Hall Attorney's Office", "townhall-office1.jpg");

		md.write('<p>The office is empty and no-one is present at all.<p>');

		startQuestions();
		addLinkToPlace(md, "look around", '', '', 'You spend a while searching around but find nothing useful', '', 'WaitHere(5);');
		addLinkToPlace(md, 'return to reception', 95);

		WritePlaceFooter(md);
		return;
	}
	
	var clv = perTammy.getCharmedLevel();
	var nm = perTammy.getPersonName();

	// Images
	if (clv === 0) perTammy.showPerson("office1u.jpg");
	else perTammy.showPerson(clv == 4 ? "office1s.jpg" : "office1g.jpg");

	if (isInvisible()) md.write('<p>' + nm + ' is sitting at her desk.</p>');
	else if (clv === 0) {
		// Tammy - NOT CHARMED VERSION
		addPlaceTitle(md, "Town Hall Attorney's Office");
		md.write('<p>Tamara looks over to you as you enter the office she nods and continues her work.</p>');
	} else {
		// Tammy - Charmed
		addPlaceTitle(md, nm + "'s Office");
		md.write(
			'<p>' + nm + ' sees you enter and immediately sits up exposing her breasts.</p>' +
			'<p>"Hello ' + perTammy.getYourNameFor() + ', what can I do for you?”<p>'
		);
	}
	
	// **********************************************************************************
	startQuestions();

	if (clv === 0) addLinkToPlace(md, 'return to reception', 95);
	else addLinkToPlaceC(md, '“Nothing for now”', 95);
	addLinkToPlace(md, 'exit the Town Hall', 94);

	WritePlaceFooter(md);
}