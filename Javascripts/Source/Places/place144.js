// Place: School Oval

function ShowPlace144(stype)
{
	var md = WritePlaceHeader();

	var perKylie = findPerson("Kylie");
	var clv = perKylie.getCharmedLevel();

	// Description
	addPlaceTitle(md, "School Sports Fields", isShopOpen(2) ? "schoolfield2.jpg" : "schoolfield1.jpg");
	setPlaceKnown("SchoolField");

	// Default/no event
	md.write(
		'<p>The sporting fields for Glenvale High border part of the park on one side, and the school on the others. Glenvale High is proud of it\'s sporting achievements but as of yet it is not highly ranked in sports, but everyone is working to improve this. Well, almost everyone, magic has always been more interesting to you.</p>' +
		'<p>There are a variety of areas, from the ovals and volleyball and tennis courts. You have often seen matches being played on the courts at lunch time.</p>' +
		'<p>There is a simple noticeboard listing reservations for fields and courts. The list is chaotic with many changes and erasures, but there is a volleyball match fairly consistently around lunch time most school days.</p>'
	);

	startQuestions();
	if (isDay()) addLinkToPlace(md, "sit on a bench for a while and watch a game", '', '', 'You kill some time for an hour, watching a game being played', '', 'WaitHereOnly(5);');
	else addLinkToPlace(md, "sit on a bench for a while", '', '', 'You kill some time for an hour,', '', 'WaitHereOnly(5);');

	if (isShopOpen(2)) addLinkToPlace(md, "enter the School", 70);
	if (isPlaceKnown("Park")) addLinkToPlace(md, "walk into the park", 63);
	addLinkToPlace(md, "return to the front of the school", 9);

	if (perKylie.isHere()) {
		AddPeopleColumnLarge();
		perKylie.showPerson(clv > 0 ? "kylie1b.jpg" : "kylie1a.jpg");
	}

	WritePlaceFooter(md);
}