// Place: Strip Club Outside

function ShowPlace281()
{
	var md = WritePlaceHeader();

	// TITLE LINE
	addPlaceTitle(md, "Shopping Center Side Alley", "stripclub1.jpg");

	// Description
	md.write('<p>A small side alley off of the main shopping center. The only notable place is the Avernus Club you were told about. The sign notes there is a ' + sCurrency + '10 cover charge.</p>');
	if (!isShopOpen(-2, -2, true, true)) md.write('<p>The Avernus Club is closed at this time of day, it has a sign noting it is open 10pm to late</p>');

	// Dialogue Options
	//**********************************************************************
	startQuestions();
	if (isShopOpen(-2, -2, true, true)) {
		if (perYou.getCashOnHand() >= 10) addLinkToPlace(md, "enter the Avernus Club", 282, '', 'You pay the cover charge and enter', '', 'AddCash(-10)');
		else addTextForQuestions(md, 'You do not have enough money for the cover charge so you cannot enter the club');
	}
	addLinkToPlace(md, "walk back to the shopping center", 194);

	WritePlaceFooter(md);
}