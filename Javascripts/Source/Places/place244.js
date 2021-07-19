// Museum Safe

function ShowPlace244()
{
	var md = WritePlaceHeader();
	
	var perG = findPerson("Gina");

	addPlaceTitle(md, "Museum Safe", checkPlaceFlag("Museum", 3) ? "vault1.jpg" : "vault2.jpg");
	md.write('<p>The museum safe is used to keep the most valuable artifacts of Glenvale history.</p>');

	startQuestions();

	if (checkPlaceFlag("Museum", 3)) {
		// Options to open the safe  SAFE CLOSED == TRUE
		if (perG.isCharmedBy() && perG.place === 0 && !isPossess()) {
			//Guard Gina is CHARMED and @ Museum
			addQuestionCO(md, 'get your slave Gina to open the safe', "Gina", 11300);
		} else if (isPossess("Gina") || checkPlaceFlag("Museum", 8)) addQuestionCO(md, 'open the safe', "Misc", 11300);
	}

	addLinkToPlace(md, 'return to the main hall', 239);

	WritePlaceFooter(md);
}