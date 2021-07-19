// Pass

function CastingPassSpell()
{
	if (isPossess()) addComments('You try to cast the spell, but for some reason it fails. Possibly it is a side-effect of the Possession spell?');
	else if (Place == 2 && !isShopOpen(2, 0, true)) {
		// Outside the library
		setPlaceBreakIn("Library");
		CastPassSpell(3);
	}
	else if (Place == 3 && !isShopOpen(2, 0, true)) {
		// Inside the library
		CastPassSpell(2);
	}
	else if (Place == 9 && !isShopOpen(2)) {
		// Outside the school
		setPlaceBreakIn("HistoryClassroom");		// Use HistoryClassroom as there is no "School"
		CastPassSpell(70);
	}
	else if (Place == 141 && checkPersonFlag("Lauren", 10)) {
		if (getHour() !== 0) addComments('The spell fails, the \'shroud\' protecting the mansion is too strong');
		else {
			if (wherePerson("Sarah") == 1) movePerson("Sarah", 192);
			if (getPersonOther("Sarah") < 50) setPersonOther("Sarah", 50);
			CastPassSpell(18, 'area=appear');
		}
	}
	else if (Place == 16 || Place == 141) {
		// Front door of the Mansion. Are we on the murder path and Sarah is home
		var perS = findPerson("Sarah");
		if (isConspiracyPath()) addComments('The spell fails, the mansion seems to be protected in some way');
		else if (isMurderPath() && wherePerson("AdeleRoss") !== 16 && perS.place > 0) {
			CastPassSpell(192, '', "You cast the spell, determined to enter the mansion even now at night. You appear somewhere inside the Mansion...");
			return "nofooterconverse";
		} else if (!isMurderPath() && wherePerson("AdeleRoss") !== 16) {
			CastPassSpell(perS.place == 192 && perS.other >= 100 ? 18 : 17, '', "You cast the spell, determined to enter the mansion even now at night. You appear somewhere inside the Mansion...");
			return isCommentsShown() ? "nofooterconverse" : undefined;
		}
	}
	else if (Place == 17 || Place == 18) {
		// Gates Mansion Study or entry hall
		CastPassSpell(16);
	}
	else if (Place == 19) {
		// Gates Mansion, with no police present (Murder Path only)
		CastPassSpell(66);
	}
	else if (Place == 20) {
		if (!isCharmedBy("OfficerKhan")) {
			// Active crime scene (back room)
			addComments('While you are alone here there are still too many police around, it is unlikely you can do this unseen.');
		} else {
			// Gates Mansion, with no (other) police present and Officer Khan is charmed
			CastPassSpell(66);
		}
	}	
	else if (Place == 37) {
		if (wherePerson("Catherine") == 436 && wherePerson("AdeleRoss") != 436) gotoPlace(37, '', 'The house is securely locked, there might be someone home but there is no answer to the door or their phones.');
		else addComments('You cast a spell.... but it fizzles.');
	}
	else if (Place == 52) {
		//Alley to the "Secret Room"
		if (isPlaceKnown("HiddenRoom")) addComments('You already know how to enter the hidden room, you can just walk there!');
		else CastPassSpell(53, '', "A wall in the alley shimmers and you realise there is a door there. The spell has unlocked the door for you. The door is very well concealed but you can now enter the room whenever you like.");
	}
	else if (Place == 43 && sType == "gate") {
		// Construction road gate, Yoolaroo Road side
		CastPassSpell(480, '', 'You cast the spell and step through the fence, avoiding the gate and the symbol. You appear near a road heading north.');
	}
	else if (Place == 43) {
		// Yoolaroo Street, outside Robbins House
		if (checkPlaceFlag("RobbinsHouse", 6)) CastPassSpell(81, 'type=teleport');
		else addComments('You cast a spell.... but it fizzles.');
	}
	else if (Place == 44) {
		// Kollam Street
		CastPassSpell(52);
	}
	else if (Place == 65) {
		// Active crime scene
		addComments('There are too many police around, there is no way you can do this unseen.');
	}
	else if (Place == 70 && !isShopOpen(2)) {
		// Inside the school
		CastPassSpell(9);
	}
	else if (Place == 11 && perBeasley.place != 11 && !perBeasley.checkFlag(4)) {
		// Mr Beasley's Office drawer isn't open
		if (CastPassSpell())	{
			PlaceI(5, 11); // puts the stone in the room
			setPersonFlag("MrBeasley", 4); // Drawer opened
			addComments('Your spell opens Mr. Beasley\'s desk drawer. There is a stone inside.');
			dispPlace(11,'');
		}
	}
	else if (Place == 81) {
		// Davy Robbin's room, exit to Yoolaroo Street
		CastPassSpell(43);
	}
	else if (Place == 82)	{
		// Mrs Robbins Bedroom
		CastPassSpell(43);
	}	
	else if (Place == 94 && !isShopOpen(0)) {
		// Outside the Town Hall
		setPlaceBreakIn("TownHall");
		CastPassSpell(95);
	}
	else if (Place == 95 && !isShopOpen(0)) {
		// Inside the Town Hall
		CastPassSpell(94);
	}
	else if (Place == 145 && getPersonOther("Anita") >= 100 && getPersonOther("Anita") < 900 && isMurderPath()) {
		// French Room after Anita is Hiding and NOT DEAD
		CastPassSpell(252);
	}
	else if (Place == 161) {
		//Hotel Cellar
		if (getPersonOther("Jessica") === 0) {
			//haven't met the Witch yet
			CastPassSpell(193);
		}	else {
			if (perKurndorf.getQuestRitual() < 200) addComments('Why waste the mana when you can just walk there?');
			else addComments('The place that was once there is no more... Too bad, it could have made an awesome hideout.');
		}
	}
	else if (Place == 176) {
		// Inside Robbins House
		if (!isCharmedBy("MrsRobbins", "You")) {
			addComments(
				per.addPersonFace() + 'As you start to cast the spell Mrs. Robbins interrupts, "What are you doing, if you have no more business with me please leave, don\'t just speak gibberish"</p>' +
				'<p>You realise you will have to try casting this somewhere else, out of the sight of Mrs. Robbins.'
			);
			setPlaceFlag("RobbinsHouse", 6);
		}
	}
	else if (Place == 191 && perYou.getQuestAftane() < 10) {
		//At the Gates family Safe and HAVEN'T CAST PASS
		if (CastPassSpell()) {
			addComments(' The sound of old rusted iron latch rings in the room as the safe door swings open.');
			perYou.setQuestAftane(10);
			PlaceI(41, 191);
			return "refresh";
		}

	}
	else if (Place == 244) addComments('You try and cast the spell... but it almost seems to <i>bounce</i> off of the safe.  Somehow it must be protected from magic.  You\'ll have to find another way.</p>');
	else if (Place == 229 && isPlaceKnown("GinasHouse")) {
		// Rathdown Road to Gina's house
		CastPassSpell(302);
	}
	else if (Place == 238) {
		// Outside the museum
		setPlaceBreakIn("Museum");
		CastPassSpell(239);
	}
	else if (Place == 239 && !isPossess()) {
		// inside the museum
		CastPassSpell(238);
	}
	else if (Place == 281 && !isShopOpen(-2, -2, true, true)) {
		// outside the strip club
		CastPassSpell(282);
	}
	else if (Place == 282 && !isShopOpen(-2, -2, true, true)) {
		// inside the strip club
		CastPassSpell(281);
	}
	else if (Place == 303 && !checkPlaceFlag("GinasHouse", 7)) {
		// Open the drawer in Gina's bathroom
		if (CastPassSpell()) {

			setPlaceFlag("GinasHouse",7);
 
			if (whereItem(34) === 0) PlaceI(34, 303);	//Lock of hair isn't Already @ the museum
			else setPlaceFlag("GinasHouse", 6);				//Lock of hair is at museum or you have it personally - available to drop stone instead

			addComments('Your spell opens the jammed drawer.');
			return "refresh";
		}
	}
	else if (Place == 324 && !checkPlaceFlag("Graveyard", 6)) {
		// Unlocking the doors of Mausoleum in the Graveyard
		if (CastPassSpell()) {
			addComments(' The sound of old rusted iron hinges accosts your ears, the mausoleum grate finally giving way to the power of the spell.');
			setPlaceFlag("Graveyard",6);
			return "refresh";
		}
	}
	else if (Place == 344 || Place == 345) {
		// Outside/Inside the New Age Store
		addComments('The spell completely fails, and you see for a moment a faint glow about the ' + getShopStore() + '. It seems the ' + getShopStore() + ' is warded in some way.');
	}
	else if (Place == 360) {
		// Outside the aquarium
		setPlaceBreakIn("Aquarium");
		CastPassSpell(361);
	}
	else if (Place == 361) {
		// inside the aquarium
		CastPassSpell(360);
	}
	else if (Place == 371 && !isDay()) {
		// inside the TV Station Reception
		CastPassSpell(372);
	}
	else if (Place == 372 && !isDay()) {
		// inside the tv station hallway
		CastPassSpell(371);
	}
	else if (Place == 412 && checkPersonFlag("Diane", 21)) {
		// from Madison's office to storage room
		if (wherePerson("Diane") == -1) movePerson("Diane", 412);
		CastPassSpell(416);
	}
	else if (Place == 442) {
		// Hospital Basement
		CastPassSpell(443);
	}
	else if (Place == 443) {
		// Hospital Old Basement
		CastPassSpell(442);
	}
	else if (Place == 452 && sType == "gabbyhouseapproach") {
		// Gabbys House (Murder patH)
		CastPassSpell(452, 'type=gabbyhousestudy1');
	}
	else if (Place == 480) {
		// Construction road to Yoolaroo Rd
		CastPassSpell(43, 'type=gate', 'You cast the spell and step through the fence, avoiding the gate and the symbol. You appear on the edge of Yoolaroo Drive.');
	}
	else if (Place == 481 && checkPlaceFlag("Park", 8)) {
		// Construction site to enter the office
		if (CastPassSpell(482)) return "nofooterrefresh";
	}	
	else addComments('You cast a spell.... but it fizzles.');

	return isCommentsShown() ? undefined : "nofooter";
}

function CastPassSpell(nPlace, type, msg)
{
	if (nMana > 1) {
		AddMana(-2);
		if (type === undefined) type = '';
		if (msg !== undefined) addComments(msg);
		//else addComments('You read the spell and it works.');
		if (nPlace !== undefined) dispPlace(nPlace, type);
		return true;
	}
	addComments('You do not have enough mana to cast this spell.');
	return false;
}
