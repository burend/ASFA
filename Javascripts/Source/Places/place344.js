// Place: Outside New Age Shop

function ShowPlace344()
{
	var perJ = findPerson("Jessica");
	var md = WritePlaceHeader(false, "td-left-med");

	// TITLE LINE
	addPlaceTitle(md, "The New Age " + getShopStore(true), "newage2.jpg");

	// Description
	md.write('<p>A small ' + getShopStore() + ' a short walk away from the rest of the shopping center.  Now that you think about it, you have heard stories of the psychic that owns the ' + getShopStore() + '.  It would seem she has a reputation of being the "real thing."</p><p>A few days ago you would have balked at such a statement.  But with recent events, it leaves you wondering if perhaps she may be yet another magical individual in town.</p><p>Could she even be a threat?  Only time will tell.</p>');
	if (!isShopOpen(0, 0, true) || (perJ.place == 345 && perJ.checkFlag(27))) {
		md.write('<p>The New Age ' + getShopStore(true) + ' has a sign noting that is closed, hours of business 7am to 5pm.');
		if (perJ.place == 345 && !perJ.checkFlag(27)) md.write(' Despite this you see the shop appears open.');
		md.write('</p>');
	}
	// Dialogue Options
	//**********************************************************************
	startQuestions();
	if (perJ.place == 345 && perJ.checkFlag(27) && isShopOpen(-1, 1, true)) addLinkToPlace(md, "enter the " + getShopStore(), Place, '', 'The door is locked');
	else {
		if (isShopOpen(-1, 1, true) || perJ.place == 345) addLinkToPlace(md, "enter the " + getShopStore(), 345);
		if (perJ.place == 348) addLinkToPlace(md, "enter the Esmeralda's Home", 346);
	}
	addLinkToPlace(md, "walk back to the shopping center", 194);

	WritePlaceFooter(md);
}