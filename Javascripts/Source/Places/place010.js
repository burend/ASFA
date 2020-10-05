// Place: History Classroom

function ShowPlace10()
{
	var md = WritePlaceHeader();

	var perMonique = findPerson("Monique");
	var myName = perMonique.getYourNameFor();
	var perAbby = findPerson("Abby");
	var bMoniqueHere = isShopOpen(2) && perMonique.place == 10;

	// Images
	addPlaceImage(md, "classroom1.jpg", "", "", "History Classroom");

	if (bMoniqueHere) {
		// Is Monique in the classroom
		perMonique.showPersonFace();
	}

	// Title
	addPlaceTitle(md, "History Classroom");

	// Description

	if (perYou.getExperience() < 1) {
		md.write('<p>The classroom is deserted; everyone has gone home for the day. You look around for something to help your quest. Some papers are scattered on the teacher\'s desk and books are in the bookcase.<br><br>  You hear some footsteps outside in the corridor and you tense. It would not do you any good to be found snooping around school without a teacher present. After what seems like minutes the footsteps pass by, then fade out.</p>');
	} else md.write('<p>The classroom is deserted; everyone has gone home for the day.</p>');


	if (bMoniqueHere) {
		md.write('<p>You are startled by a noise at the front of the room. Somebody lifts their head over the teacher\'s desk. You are relieved when you realize that it\'s just Monique.</p>');
	} else {
		if (isDay()) {
			md.write('<p>As you sneak back to the classroom, you hear some voices in the room next door. Putting your ear to the wall you hear them speaking about strange happenings in Glenvale.');
			if (perYourBody.FindItem(4) > 0) md.write('  You are not sure whether they\'re talking about what you have done. <br><br>You realize that if the townsfolk find out that you have the book, then you will be in grave danger. It is becoming urgent that you find more magic or rid yourself of the book as quickly as possible.<br><br>The voices fade away, leaving you with an uneasy feeling.<br><br>');
			md.write('</p>');
		}
	}

	if (whereItem(1) == Place) md.write('<p>The topmost paper has Mr Beasley\'s name printed in bold.</p>');
	if (!checkPlaceFlag("HistoryClassroom", 8)) {
		setPlaceFlag("HistoryClassroom", 8);
		md.write('<p>You return the Stears letter you found, probably stolen by Davy Robbins.</p>');
	}

	startQuestions();

	// Books you can find
	addLinkToPlaceO(md, "examine the books in the bookcase", 27, '', '', 'passTime(true,2)');
	if (checkPlaceFlag("HistoryClassroom", 8)) addLinkToPlaceO(md, "re-read the letter from Mrs. Stears", 27, 'type=stears');
	if (checkPlaceFlag("HistoryClassroom", 5)) addLinkToPlaceO(md, "re-read 'The Settlement of Glenvale'", 27, 'type=settlement');
	if (checkPlaceFlag("Crypt", 2)) addLinkToPlaceO(md, "re-read 'The Death of Kurndorf'", 27, 'type=crypt');
	if (perAbby.getQuestDragonGem() > 0) addLinkToPlaceO(md, "re-read 'The Gem of the Dragon'", 27, 'type=gem');
	if (checkPlaceFlag("HistoryClassroom", 6)) addLinkToPlaceO(md, "re-read 'Greek Mythology'", 27, 'type=greek');
	if (checkPlaceFlag("HistoryClassroom", 9)) addLinkToPlaceO(md, "re-read 'Rituals under the Broken Inn'", 27, 'type=rituals');
	if (checkPlaceFlag("HistoryClassroom", 10)) addLinkToPlaceO(md, "re-read 'Following the Water'", 27, 'type=bookhydromancy');
	if (checkPlaceFlag("HistoryClassroom", 11)) addLinkToPlaceO(md, "re-read 'Pharmakopoeia'", 27, 'type=bookpharma');
	if (checkPlaceFlag("HistoryClassroom", 12)) addLinkToPlaceO(md, "re-read 'Witches of Pennsylvania'", 27, 'type=bookwitches');
	// Books are DONE ************************

	addLinkToPlace(md, "exit the room?", 70);

	WritePlaceFooter(md);
}