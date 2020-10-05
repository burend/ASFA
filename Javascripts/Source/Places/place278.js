// Mrs Granger in Ward 1 West

function ShowPlace278()
{
	var md = WritePlaceHeader();

	var perMG = findPerson("Mrs Granger");
	var perOK = findPerson("OfficerKhan");

	if (perMG.place == 278) perMG.showPerson(perMG.health < 75 ? "!granger14a.jpg" : "!granger14b.jpg");
	else if (perOK.place == 278) perOK.showPerson(perOK.isCharmedBy() ? "pol13b.jpg" : "pol13a.jpg");

	addPlaceTitle(md, "Ward 1 West");

   md.write(
		'<p>The west ward is for the female patients of the hospital.</p>'
	);
	if (perOK.place == 278) {
		if (perOK.isCharmedBy()) md.write("<p>Your slave " + getOfficer() + " Cheryl Khan is waiting for you here.</p>");
		else if (perMG.place == 278) md.write("<p>A " + getOfficer(false) + " is on guard to watch Mrs. Granger who is under arrest for theft.</p>");
	}

	// Questions
	startQuestions();

	addLinkToPlace(md, "exit the ward", 214);

	if (perMG.place == 278 && perOK.place == 278) {
		AddRightColumnLarge(md);
		perOK.showPerson(perOK.isCharmedBy() ? "pol13b.jpg" : "pol13a.jpg");
	}

	WritePlaceFooter(md);
}