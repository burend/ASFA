// Place: Ms Jones Office
// available
// - Serving Mr Beasley after learning Dai Chu
// - Murder Path after Officer Batton investigates the shooting of Officer Khan
// - Charmed Path after giving the annointed relic to the demon

function ShowPlace145(stype)
{
	var md;

	var perJ = findPerson("MsJones");
	var clv = perJ.getCharmedLevel();

	if (!perJ.isHere()) {
		md = WritePlaceHeader();
		addPlaceTitle(md, "French Classroom", "classroom3.jpg");

		if (!isShopOpen(2)) md.write('<p>The French Classroom, empty at night</p>');
		else md.write('<p>The French Classroom, empty at now, the teacher Ms. Jones is not here.</p>');

		startQuestions();
		if (isPlaceKnown("AnitasLair")) addLinkToPlace(md, 'sneak back into Anita\'s hiding place', 252);
		addLinkToPlace(md, 'exit the office', 70);

		WritePlaceFooter(md);
		return;
	}

	// Charmed or Murder Path
	// Standard visit, no event happening
	md = WritePlaceHeader(false, clv > 0 ? "" : "td-left-large");
	if (clv > 0) perJ.showPerson("jones2.jpg");
	else perJ.showPerson("jones1b.jpg");

	addPlaceTitle(md, "Ms. Jones' Office");

	if (isInvisible()) md.write("<p>Ms. Jones is doing some papers in her office. As you enter she looks directly at you, but returns to her work.</p>");
	else if (clv > 0) {
		// Charmed
		md.write(
			'<p>Ms Jones, your teacher, toy, devoted servant, cock-ornament and warrior slave has certainly acquired a lot of titles in her centuries of servitude, and sometimes seems to make up new ones just for the hell of it.</p>' +
			'<p>She always purposely follows the same ritual when you enter her classroom, quickly opening her top to put her breasts on display before sinking onto one knee in a sensual, yet disciplined looking gesture.</p>' +
			'<p>Her eyes are submissively downcast as she welcomes you, asking eagerly how she may serve you today.</p>'
			//'<p>Ms. Jones, your slave and French teacher, greets you in her office, willing to do your every desire.</p>'
		);

	} else {
		// Uncharmed (by you
		md.write(
			'<p>Ms. Jones, your French teacher, greets you in her office. Ever since she joined the staff last year every boy in class has paid a lot more attention to their lessons.</p>' +
			'<p>"Bonjour ' + perYou.getPersonName() + '. Is zere anything I can help you with?"</p>'
		);
		if (!perJ.checkFlag(2)) {
			perJ.setFlag(2);
			perJ.showPersonInfo(md);
		}
	}

	startQuestions();

	if (isPlaceKnown("AnitasLair")) addLinkToPlace(md, clv > 0 ? 'visit Anita\'s hiding place' : 'sneak back into Anita\'s hiding place', 252);
	addLinkToPlace(md, 'exit the office', 70);

	WritePlaceFooter(md);
}