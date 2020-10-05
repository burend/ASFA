function FindIt246(doc)
{
	var sText = doc.FormChar.research.value.toLowerCase().trim();
	if ((checkPlaceFlag("Crypt", 3) && sText == "modest") ||
		 (checkPlaceFlag("Crypt", 4) && sText == "mason") ||
		 (checkPlaceFlag("Crypt", 5) && sText == "garlic"))
	{
		if (perKurndorf.getQuestCrypt() == 18) perKurndorf.setQuestCrypt(19); // Bambi path set to "have entered crypt"
		setPlaceKnown("Crypt");  // Sets it so you can Enter the Crypt
		var perMonique = findPerson("Monique");
		perMonique.setFlag(5, false);
		gotoPlace(247, '', "Correct! The ground shakes as the great tablet before you crumbles to dust beneath your feet. You have discovered an ancient crypt.");
	}
}

function ShowPlace246()
{
	var md = WritePlaceHeader();
	
	var perMonique = findPerson("Monique");
	perMonique.setFlag(5);

	addPlaceTitle(md, "Tablet Puzzle", "Items/tablet.jpg");

	if (!checkPlaceFlag("Crypt", 3) && !checkPlaceFlag("Crypt", 4) && !checkPlaceFlag("Crypt", 5)) setPlaceFlag("Crypt", Math.floor(Math.random() * 3) + 3);
	
	md.write('<p>Embossed are the words, ');
	if (checkPlaceFlag("Crypt", 3)) md.write('&quot;One is vain by nature, <b>teomds</b> by necessity.&quot;');
	else if (checkPlaceFlag("Crypt", 4)) md.write('&quot;A maker of tablets, often said to be free <b>amnos</b>.&quot;');
	else md.write('&quot;A guard against the dead and often the living, <b>aiglcr</b>.&quot;');

	md.write(
		'</p><form method="POST" name="FormChar"><p>Unscramble the letters:</p>' +
		'<p><input type="text" size="20" name="research"><input type="button" name="button" value="please" onClick="FindIt246(document)"></p></form>'
	);

	startQuestions();
	addLinkToPlace(md, 'go to the wild ranges?', 26);

	WritePlaceFooter(md);
}