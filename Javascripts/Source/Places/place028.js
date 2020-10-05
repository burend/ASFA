// Tess Adam's Office NOT Charmed

function ShowPlace28()
{
	var perTess = findPerson("Tess");

	if (perTess.isCharmedBy()) return dispPlace(29);	// If Tess is Charmed then change location

	var md = WritePlaceHeader(false, !perTess.checkFlag(1) ? "td-left-med" : "");

	/****************************************************************
	Tess Adam's
	place === 0 IN LIBRARY, 1 @ Your Room, 2 @ Hotel, 3 @ John Adams' House, 4 Shops
	****************************************************************/

	perTess.showPerson(perTess.checkFlag(1) ? (checkPlaceFlag("Library", 1) ? "tess1b.jpg" : "tess1.jpg") : "tess1c.jpg");

	addPlaceTitle(md, "Tess Adams");

	if (!perTess.checkFlag(1)) {
		// haven't spoken w/ Tess at all yet.
		md.write('<p>The crash comes from the far end of the library. You wander over to the office and open the door to see what has caused the noise.</p>');
	}

	if (!perTess.checkFlag(1)) md.write('<p>A pile of discs, along with the rack that held them, have toppled off the desk and onto the floor.</p>');

	md.write(
		'<p>Mrs. Tess Adams turns to you. Everyone knows that Mrs. Adams got her job at the library because her husband has a high position in the local council. She is often seen flitting about the otherwise silent library pushing a trolley of books or resorting the shelves into alphabetical order.</p>' +
		'<p>Ever since the young couple settled into Glendale Mrs. Adams has been the talk of the town. Her outgoing, sweet nature is only surpassed by her awkwardness. It is impossible for anyone who goes to the library to avoid meeting (or bumping into) the charming young lady.</p>'
	);

	if (checkPlaceFlag("Library", 1)) md.write('<p>The door is closed behind you making the office very private.</p>');

	//*******************************************************************************

	startQuestions();

	if (!perTess.checkFlag(1)) addQuestionC(md, '"Can I help you with anything, Mrs. Adams?"', "Tess", 2100);
	else if (!perTess.checkFlag(2)) addQuestionC(md, '"Mrs. Adams, do you know any magic?"', "Tess", 2101);
	else if (perTess.checkFlag(2) && !perTess.checkFlag(10)) {
		// Set to 10 when you learn Pass from her
		addQuestionC(md, '"Mrs. Adams, could you help me look something up?"', "Tess", 2105);
	}
	if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');

	if (!checkPlaceFlag("Library", 1)) {
		addQuestionCO(md, 'close the door to Mrs. Adams\' office', "Tess", 6900);
		addLinkToPlace(md, "go to the reception area.", 3);
	} else addLinkToPlaceO(md, "open the door and go to the reception area.", 3, '', '', '', "setPlaceFlag('Library',1,false);");	// Leave the door OPEN when you leave

	WritePlaceFooter(md);
}