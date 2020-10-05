// Hotel Cellar

function FindIt161()
{
	if (isRunes()) Research("Spell", "DertPher", "", 161);
	else gotoPlace(Place, 'type=learnwealth');
}

function ShowPlace161(stype)
{
	var perAnita = findPerson("Anita");
	var perJessica = findPerson("Jessica");
	var iWitch = perJessica.getRivalry();
	var bDavySlave =  perDavy.isHere();
	var perVamp = findPerson("Vampyre");
	var perBambi = findPerson("Bambi");
	var perTina = findPerson("Tina");
	var hr = getHour();

	// Images
	var nSlaves = perJessica.isHere() && iWitch < 3 ? 1 : 0;
	if (bDavySlave) nSlaves++;
	var b2Cols = perTina.isHere() || perJesse.isHere() || nSlaves > 0;		// Is Jesse or Jessica here
	var md = WritePlaceHeader(false, b2Cols && !(perAnita.isHere() && perBambi.isHere()) ? "td-left-small" : "td-left");

	// Normal visit
	// Guard(s)
	if (perAnita.isHere() && perBambi.isHere()) perBambi.showPerson("bambianitaguard1.jpg");
	else if (perAnita.isHere()) perAnita.showPerson("anitaguard1.jpg");
	else if (perBambi.isHere()) perBambi.showPerson("bambiguard1.jpg");
	if (nSlaves < 2 && !(b2Cols && perVamp.isHere())) {
		if (checkPlaceFlag("Hotel", 9)) addPlaceImage(md, "dungeon.jpg");
		else addPlaceImage(md, "cellar1.jpg");
	}
	if (b2Cols && perVamp.isHere()) perVamp.showPerson("vamp5a.jpg");

	if (checkPlaceFlag("Hotel", 9)) {
		addPlaceTitle(md, "Hotel Dungeon");
		if (nSlaves > 1) addPlaceImage(md, "dungeon.jpg", "20%", "left");
		md.write(
			'<p>Once the Hotel\'s cellar, now has had a quick refit to be more a dungeon of some sort of BDSM fantasy, you are always surprised at the skill and depravity of Bambi.</p>' +
			'<p>The altar is still there and some wine racks, but other sort of racks have also been added. Heating has been turned on and it is a pleasant temperature now, with no obvious drafts, probably for the comfort of naked slaves.</p>'
		);
	} else {
		addPlaceTitle(md, "Hotel Cellar");
		if (nSlaves > 1) addPlaceImage(md, "cellar1.jpg", "25%", "left");
		md.write(
			'<p>Under your feet the steps creak from age and moisture. Through the dim lighting you see ' +
			'a tiny altar. A breeze blows across your ankles, almost freezing you in place.</p>'
		);
	}

	if (!isSpellKnown("Wealth")) {
		//Haven't learned the wealth spell yet
		if (checkPlaceFlag("Hotel", 6)) md.write('<p>Under the altar is a cupboard, and it is open but you have not mastered it\'s power yet.<br>');
		else md.write('<p>Under the altar is a cupboard.  You try it, but it seems it can only be opened by answering a magical puzzle.<br>');
	}	else {
		//Have the wealth spell
		md.write('<p>Under the altar is a cupboard.  The puzzle spell is broken, its power now yours to control.<br>');
	}
	if (!checkPlaceFlag("Hotel", 6)) {
		if (isPuzzles()) md.write('<i>Inscribed on the surface of the cupboard is a strange question for you to answer.</i></p>');
		else {
			md.write('<i>Inscribed on the surface of the cupboard are some strange runes that may be a spell.</i></p>');
			setPlaceFlag("Hotel", 6);
			setPersonFlag("Monique", 3, false);
		}
	}
	if (isMurderPath()) //On the Murder Path
	{
		if (perYou.getQuestRustyKey() < 999) {
			//haven't USED the key yet
			md.write('<p>There is also an old wine rack up against the wall.  It must be from quite some time ago, as the cage seems rusted shut and the one bottle left is covered in dust.</p>');
		} else md.write('<p>There is also an old wine rack up against the wall...  The key is still jammed in the lock and simply will not budge.</p>');
	} else {
		if (perYou.getQuestRustyKey() < 1001) {
			//haven't USED the key yet
			md.write('<p>There is also an old wine rack up against the wall.  It must be from quite some time ago, as the cage seems rusted shut and the one bottle left is covered in dust.</p>');
		} else md.write('<p>There is also an old wine rack up against the wall...  it is open and empty of any wine bottles.</p>');

	}
	if (perJesse.isHere()) md.write('<p>Jesse asks, "Is this the <i>exciting</i> place? It looks kind of boring to me."</p>');

	if (perKurndorf.getQuestRitual() == 200) //The ritual just ended
	{
		md.write('<p>You barely make it out of the room in time as the space <i>between places</i> closes up behind you.  Evidently without the Witch or Kurndorf maintaining it, it could no longer exist.</p>');
		perKurndorf.setQuestRitual(201); // Only print this once.
	}

	if (whereItem(52) == 161) //Crystal is still here
	{
		md.write(
			'<p><i>You can see the Crystal on the floor.  Evidently it was ejected from Kurndorf\'s prison as it closed behind you.<br>' +
			'It seems to pulse with a dark light, proof of the spirit trapped within.</i></p>');
	}

	startQuestions();

	if (!checkPlaceFlag("Hotel", 6)) addLinkToPlace(md, 'try the puzzle', 162);
	else if (!isSpellKnown("Wealth")) addOptionLink(md, 'try to learn the spell', "FindIt161()");

	if (getPersonOther("Jessica") > 0 && perKurndorf.getQuestRitual() < 200) {
		// Have entered the room & spoken with the witch && the ritual isn't over yet
		if (isVisible()) {
			if (perKurndorf.getQuestSeance() < 50) addLinkToPlace(md, 'enter the witch\'s prison', 193);
			else addLinkToPlace(md, 'visit Kurndorf\'s Ghost', 342);
		} else {
			if (perKurndorf.getQuestSeance() < 50) addLinkToPlace(md, 'enter the witch\'s prison', 161, '', 'For some reason you do not understand, you are unable to enter the prison. Possibly it is because you are invisible?');
			else addLinkToPlace(md, 'visit Kurndorf\'s Ghost', 161, '', 'For some reason you do not understand, you are unable to visit Kurndorf. Possibly it is because you are invisible?');
		}
	}

	addLinkToPlace(md, 'go back up to the hotel bar', 124);

	// Right column images
	if (b2Cols) {
		if (perJesse.isHere()) {
			AddPeopleColumnMed(md);
			perJesse.showPerson("jesse1a.jpg");
			if (perTina.isHere()) perTina.showPlaceImageRight(md);
		} else {
			// There are slaves here (temporarily or permanently)
			AddPeopleColumnLarge(md);
			if (nSlaves > 0) md.write('<table><tr>');
			if (perJessica.isHere() && iWitch < 3) {
				if (nSlaves > 0) md.write('<td style="width:50%">');
				if (iWitch == -1) perJessica.showPerson("jessica-bound1.jpg", "100%", "", "", "Witch Prisoner");
				else if (iWitch == -2) {
					switch(Math.floor(getHour() / 6)) {
						case 0: perJessica.showPerson("jessica5e.jpg","100%", "", "", "Witch-Toy"); break;
						case 1: perJessica.showPersonRorX("jessica-bound3.jpg", "100%", "", "", "Witch-Toy"); break;
						case 2: perJessica.showPersonRorX("jessica-bound5.jpg", "100%", "", "", "Witch-Toy"); break;
						case 3: perJessica.showPerson("jessica-bound2.jpg", "100%", "", "", "Witch-Toy"); break;
					}
				} else if (stype == "cut2") perJessica.showPerson("jessica2d.jpg", "100%", "", "", "Freed Witch");
				else perJessica.showPersonRandom("jessica2c", 6, "100%", "", "", "Bound Witch");
				if (perTina.isHere()) perTina.showPlaceImageRight(md);
				if (nSlaves > 0) md.write('</td>');
			}
			if (bDavySlave) {
				if (nSlaves > 0) md.write('<td style="width:50%">');
				if (perDavy.isMan()) {
					if (perDavy.isCharmedBy()) perDavy.showPersonRorX("davycellar-bound1.jpg");
					else perDavy.showPerson("davycellar-bound1.jpg");
				} else perDavy.showPersonRandom("davycellar-bound1", 2);
				if (perTina.isHere() && !perJessica.isHere()) perTina.showPlaceImageRight(md);
			}
			if (nSlaves > 0) md.write('</td></tr></table>');
		}
	}

	WritePlaceFooter(md);
}