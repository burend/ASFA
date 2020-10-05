// Museum Security Guard

function ShowPlace277()
{
	var md = WritePlaceHeader();
	
	if (isCharmedBy("Gina")) {
		// Gina is CHARMED
		return dispPlace(304);
	}

	var perMG = findPerson("Mrs Granger");
	var perDA = findPerson("Diane");
	var perG = findPerson("Gina");
	
	if (perMG.other >= 50 && perDA.getQuestArrested() < 50) perG.showPerson("gina1c.jpg");	// Previously tried to take the vase?
	else perG.showPerson("gina1a.jpg");

	addPlaceTitle(md, "Museum Guard");

	if (isShopOpen(2, 0, true)) md.write('<p>The security guard stops you to ask your business. She is not pleased to see you wandering around.</p>');
	else md.write('<p>The security guard stops you seeming to think you are an employee of the museum working late into the night.</p>');

	// If you had Mrs Granger Jump the Guard && haven't been aquitted in court yet.
	if (perMG.other >= 50 && perDA.getQuestArrested() < 50) {
		md.write('<p>She recognizes you from the vase robbery and immediately reaches for her pistol. "Hold it right there!" she cries.</p>');
	}

	startQuestions();

	if (isShopOpen(2, 0, true)) addLinkToPlace(md, "exit the museum before you get arrested", 238);
	else addLinkToPlace(md, 'run away from her', 239);

	WritePlaceFooter(md);
}