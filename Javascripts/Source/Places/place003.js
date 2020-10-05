// Library Reception

function ShowPlace3(stype)
{
	var md = WritePlaceHeader(true);
	md.write('<table class="table-main"><tr>');

	var perTitus = findPerson("MsTitus");
	var sName = perTitus.getPersonName();

	if (!isShopOpen(2, 1, true)) {
		if (!perTitus.isHere()) {
			// Empty
			if (!isPlaceBreakIn("Library")) return gotoPlaceDelayed(2, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The Library closes and Ms. Titus ushers you outside.');

			md.write('<td style="vertical-align:top" class="td-left">');
			addPlaceTitle(md, "Library Reception", "library-desknight.jpg");

			md.write('<p>Entering the library you see the fiction section to your right and the reference desk ahead. Otherwise the library is empty.</p>');

			addLinkToPlace(md, "go to the reference area", 8);
			addTextForQuestions(md, "<b>The doors of the Library are locked</b>", "center");

			WritePlaceFooter(md);
			return;
		}
	}

	var perMq = findPerson("Monique");
	var perTess = findPerson("Tess");
	var perKate = findPerson("Kate");

	// Alter Flags
	if (wherePerson("OfficerBatton") == 1) {
		// Batton is out investigating Khan's Murder
		movePerson("OfficerBatton", 168);	// Place her back at the Police station
	}

	// Images
	var b2Cols = perTitus.isFreeSlave();
	if (b2Cols) md.write('<td class="td-left-small">');
	else md.write('<td style="vertical-align:top" class="td-left">');

	if (perTitus.isFreeSlave()) addPlaceImage(md, "library-desknight.jpg");
	else if (perTitus.isCharmedBy()) perTitus.showPersonRandom("titus2", 3);
	else perTitus.showPerson("titus1a.jpg", "height:max");

	// Text
	addPlaceTitle(md, "Library Reception");
	md.write('<p>Entering the library you see the fiction section to your right and the reference desk ahead. To your left are some study areas often used by students, and some assorted things like a photocopier for public use.</p>');

	if (perTess.place === 0 && perYou.isQuestComplete(1) && !perTess.checkFlag(1)) md.write('<p>All is quiet when you hear a loud crash from one of the offices.</p>');

	if (!perTitus.isCharmedBy()) {
		// Normal Ms Titus
		if (perTitus.isFreeSlave()) {
			md.write('<p>Your librarian slave has bound herself to some book-shelves, more as a token of submission than of actual restraint.</p>');
			//  if (charmed monique) && (male) && Possession Spell is not (In your room) && Not (In Your Inventory)
			if (perMq.getQuest() > 2 && perYou.isBornMale() && isItemNotHere(16, 46) && isVisible()) {
				md.write('<p>"I heard that you are looking for something magical, ' + perYou.getMaster() + '," says your slave Ms. Titus, handing over a roll of parchment before resuming her prefered place bond to the bookcases. "Is this scroll of any interest to you, or am I and my tits?" ');
			}
		} else md.write('<p>The receptionist is reading a book and doesn\'t ' + addVisible('even look up', 'notice') + ' as you approach the reception desk.</p>');
	} else {
		// Charmed Ms Titus
		if (isVisible()) {
			md.write(
				'<p>You go to the main desk where she is seated and ask her casually</p>' +
				'<p>"What’s up, my slut?"</p>' +
				'<p>"' + perYou.getMaster() + ', you\'ve returned! Please, play with my tits, I’ve prepared them for you!", Ms Titus rushingly gets them out of her black, silk shirt.'
			);

			//  if (charmed monique) && (male) && Possession Spell is not (In your room) && Not (In Your Inventory)
			if (perMq.getQuest() > 2 && perYou.isBornMale() && isItemNotHere(16, 46)) {
				md.write('<br><br>"I heard that you are looking for something magical, ' + perYou.getMaster() + '," says Ms. Titus, handing over a roll of parchment. "Is this scroll of any interest to you?" ');
			}
		}
	}
	if (perKate.place === 3 && isVisible())	{
		md.write('<p><b>Kate</b> wants to study. "Let\'s go to the study area," she suggests. "I\'m having difficulty with a problem that I\'m sure you can help me with."</p>');
	}

	//*****************************************************************
	startQuestions();

	// Places to go
	addLinkToPlace(md, "go to the reference area", 8);

	// Tess @ Library and you've picked up the book
	if (perTess.place === 0 && perYou.isQuestComplete(1)) addLinkToPlace(md, !perTess.checkFlag(1) ? "go to the office where the crash occured" : "go to Mrs Adams\' office", perTess.isCharmedBy() ? 29 : 28);

	// Tess @ Home and charmed and did not lead you there
	if (perTess.place === 230 && (perTess.isCharmedBy() || perTitus.isFreeSlave()) && perTess.other < 25 && !perTitus.checkFlag(10)) addQuestionC(md, 'ask where Tess is today?', "MsTitus", 100);

	// Is Kate waiting in the library
	if (perKate.place === 3 && isVisible()) addLinkToPlaceC(md, "go to the study area with Kate", 7);
	else if (perKate.other >= 4) addLinkToPlace(md, "go to the study area", 7);

	addLinkToPlace(md, "exit the library?", 2);

	// Right column images
	if (b2Cols) {
		if (perTitus.isFreeSlave()) {
			AddPeopleColumnLarge(md);
			perTitus.showPersonRandom("titus10", 2);
		}
	}

	WritePlaceFooter(md);
}