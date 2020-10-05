// Place: Outside Glenvale Secondary School

function ShowPlace9()
{
	var md = WritePlaceHeader();

	setPlaceBreakIn("HistoryClassroom", false);

	addPlaceImage(md, "school1.jpg");

	if (wherePerson("Kurndorf") == 4) movePerson("Kurndorf", 5);  // advance the Ghost

	addPlaceTitle(md, "Glenvale Secondary School");
	md.write('<p>Glenvale Secondary School, famous for its high academic achievers and its teachers\' poor sense of humour, is the pride of the county.<br><p>');
	if (perYou.getExperience() === 0)
	{
		md.write('Every year at least one student graduates to go on to Harvard, Miskatonic or Oxford university. Expectations for staff and students are high and those who falter soon retire from the pressures of the county\'s finest educational institution.<p>');
		md.write('As you see the grand entrance you are reminded of these facts and cringe. Your grades are borderline and several teachers are beginning to ask questions about your ability to make it through your final year. If you can find that cursed book and write a thesis on the Kurndorf happenings you are sure to push some of those grades up.<p>');
	}
	if (!isShopOpen(2)) md.write('<p>The school is closed, open generally from 8am to 8pm Monday to Friday.</p>');
	else if (wherePerson("Kurndorf") == 4 && perDavy.other == 1 && !perKurndorf.checkFlag(21)) {
		md.write('<p>For a fleeting moment you thought you saw the <b>ghost</b> at the school entrance looking in. The aparition fades as it moves away to the south, maybe?</p>');
		perKurndorf.setFlag(21);
	}

	if (perDavy.other === 2 && perDavy.place === 9) {
		md.write('<p>Farther along the foot path you see Davy Robbins. He recognizes you, almost says something, then runs behind some trees.');
		if (perGates.other == 600) md.write(' You feel nervous, wondering if his woman and accomplice is nearby.');
		md.write('</p>');
		startTimedEvent("perDavy.other = 3;perDavy.place = 1000;", 1);
	}

	//********************************************************

	startQuestions();
	if (isShopOpen(2)) addLinkToPlace(md, "enter the School", 70);

	if (perDavy.other === 2 && perDavy.place === 9) addLinkToPlace(md, "follow Davy", 144, 'type=follow');
	else if (isPlaceKnown("SchoolField")) addLinkToPlace(md, "walk to the school sports fields", 144);

	if (isPlaceKnown("Park")) addLinkToPlace(md, "walk to the Park", 47);

	addLinkToPlace(md, "walk to the Library", 2);
	addLinkToPlace(md, "walk to Kollam Street", 44);

	if (perDavy.other === 2 && perDavy.place === 9) {
		// Davy in front of school
		AddPeopleColumnMed();
		perDavy.showPersonFace("100%");
	}

	WritePlaceFooter(md);
}