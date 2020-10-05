// Place: Church Outer Wall

function ShowPlace320()
{
	var md = WritePlaceHeader();
	
	var perPamela = findPerson("Pamela");

	/* General Description */

	/* TITLE LINE */
	addPlaceTitle(md, "Church Outer Wall", "church8.jpg");

	/* Description */
	md.write('<p>The walls of the church go on for some time, almost endless.  The inner courtyard and cloisters must be quite large to require a wall this long.</p>');

	if (!perPamela.checkFlag(1)) {
		md.write('<p>You notice a small building in the distance, it must be the groundskeeper\'s shed.');
		if (!isDay()) md.write(' There are no lights on, no-one seems to be home.');
		md.write('</p>');
	} else {
		if (perPamela.isCharmedBy()) {
			// Charmed
			md.write('<p>You can see movement in the shed. You see a face in the window. Pamela has seen you.</p>');
		} else if (isDay()) md.write('<p>You can see movement in the shed.</p>');
		else md.write('<p>There are no lights on, no-one seems to be home.</p>');
	}

	// Choices
	//**********************************************************************
	startQuestions();

	if (isDay() || perPamela.isCharmedBy()) {
		if (!perPamela.isCharmedBy() && !perPamela.checkFlag(1)) addLinkToPlace(md, "approach the would-be gardener", 326);
		else addLinkToPlace(md, "walk up and see what Pamela is up to", 326);
	}
	addLinkToPlace(md, "walk back to the Church entrance", 317);

	WritePlaceFooter(md);
}