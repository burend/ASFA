// Place: School hallway

function ShowPlace70()
{
	var bOpen = isShopOpen(2);
	if (!bOpen && !isPlaceBreakIn("HistoryClassroom")) return gotoPlaceDelayed(9, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The Glenvale Secondary School closes and a teacher ushers you outside the gates.');

	var md = WritePlaceHeader();

	var perL = findPerson("MissLogan");

	if (perDavy.other == 1) {
		// Increment Davy Path
		perDavy.other = 2;
	}

	addPlaceTitle(md, "School Hallway", bOpen ? "school2b.jpg" : "school2a.jpg");

	// Text if no-one else is here
	// including notes about Miss Logan's assignment
	if (!bOpen || perL.other != 1) {
		if (isDay()) md.write('<p>The school has a few students moving from class to class. As you walk down the hallway you can hear other voices and other noises in the distance.</p>');
		else md.write('<p>The school is empty at this time of night.</p>');
		if (perL.checkFlag(9)) md.write('<p>On a bulletin board is a list of students working on projects and you see your name on the list for Neurology.</p>');
		else if (perL.checkFlag(8)) md.write('<p>On a bulletin board is a list of students working on projects and you see your name on the list for the Reproductive System.</p>');
	}
	if (isDemonQuestDone() && perL.place == 269) md.write('<p>You notice a small announcement of a new swimming club being started by Miss Logan, but oddly it is set for Sundays at the Broken Inn Hotel pool. Why on earth on Sunday, you doubt many students would attend...</p>');


	// ********************************************************************

	startQuestions();

	addLinkToPlace(md, "go to the history classroom", 10);
	addLinkToPlace(md, "go to the teacher\'s lounge", 242);

	//  Asked for help on the reproductive lesson/neurology assignment
	if (isPlaceKnown("AnatomyClassroom")) {
		var clvL = perL.getCharmedLevel();
		if (clvL !== 1) addLinkToPlace(md, "go to the Anatomy classroom", 234);
		else if (perL.checkFlag(10)) addLinkToPlace(md, "go to the Anatomy classroom", 70, '', 'The classroom is locked, Miss. Loago must be somewhere else');
		else addLinkToPlace(md, "go to the Anatomy classroom", 234);
	}

	addLinkToPlace(md, "go to " + perBeasley.getPersonName() + "\'s office", 11);

	// If Room is known, or Serving Mr. Beasley Path activated
	if (isPlaceKnown("FrenchClassroom") || isBeasleyServant()) addLinkToPlace(md, "go to Ms. Jones\' office", 145);
	// Nurses Office
	if (isPlaceKnown("NursesOffice")) addLinkToPlace(md, "go to the Nurses office", 69, wherePerson("DoctorKay") == 69 && !isCharmedBy("DoctorKay") ? 'type=followntinalater' : '');

	if (bOpen) addLinkToPlace(md, "exit the school", 9);
	else addTextForQuestions(md, "<b>The doors of the school are locked</b>", "center");

	WritePlaceFooter(md);
}