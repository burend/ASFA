// Place: Library Outside

function ShowPlace2()
{
	var md = WritePlaceHeader();
	
	var perTitus = findPerson("MsTitus");
	var perMonique = findPerson("Monique");
	var perTess = findPerson("Tess");
	
	setPlaceBreakIn("Library", false);
	if (perYou.getExperience() > 7 && !isPlaceKnown("TownHall")) setPlaceKnown("TownHall");	// Access to Town Hall

	if (!isPlaceKnown("NewAgeStore") && checkPlaceFlag("ShoppingCenter", 7)) setPlaceKnown("NewAgeStore"); // Know about the New Age shop AFTER the first visit to the Shopping Center

	if (perJesse.getDemonPath() >= 20 && perJesse.getDemonPath() < 30) perJesse.setDemonPath(perJesse.getDemonPath() + 5);  //Should take 2 trips here to advance it from 20 (leave séance) to 30 (start @ park)
	else if (perJesse.getDemonPath() >= 50 && perJesse.getDemonPath() < 60) perJesse.setDemonPath(perJesse.getDemonPath() + 5);  //Should take 2 trips here to advance it from 50 (leave park) to 60 (start @ home)

	addPlaceTitle(md, "Glenvale Library", "library1.jpg", perYou.isQuestStarted(4) && !perYou.isQuestComplete(4) ? 100 : 50);
	
	if ((perTitus.isCharmedBy() || perTitus.isFreeSlave()) && perMonique.isCharmedBy() && perTess.isCharmedBy()) {
		md.write(
			'<p>You are outside of the library and, for the first time in your life you realise how lovely the old building is in spring.</p>' +
			'<p>Especially considering the fact that this beautiful place is yours. Ever since you charmed the staff of it, you consider the Library to your property. You are the owner of it; you decide what to do with it, you control who enters and what happens inside. You don\'t even have to be there in person to run the place, your slaves will do the job for you. They always inform you of anything before they would do something so you are always up to date with the latest news.</p>'
		);
	} else {
		md.write(
			'<p>You are outside of the library and, for the first time in your life you realise how lovely the old building is in spring.' +
			'<p>Someone once told you that they closed the building down for more than twenty years until finances were raised in 1969 to renovate the interior.</p><p>'
		);
	}
	if (checkPlaceFlag("Library", 2)) md.write('<p>The Library has a sign noting that is it temporarily closed to the public</p>');
	else if (!isShopOpen(2, 1, true)) md.write('<p>The Library has a sign noting that is closed, hours of business 7am to 8pm.</p>');
	
	startQuestions();
	if (isShopOpen(2, 1, true)) addLinkToPlace(md, "enter the Library", 3);
	if (isPlaceKnown("TownHall")) addLinkToPlace(md, "walk to the Town Hall", 94);
	if (isPlaceKnown("Museum")) addLinkToPlace(md, "walk to the Museum", 238);
	addLinkToPlace(md, "walk to the School", 9);

	WritePlaceFooter(md);
}