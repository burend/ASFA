// Teleport

function CastingTeleport()
{
	// Use
	if (sType == "bimbobadend1" || sType == "bimbobadend2") addComments('Why would you want to leave your Mistress?');
	else if (perYou.checkFlag(31)) addComments('Why would you want to leave?');
	else if ((Place == 241 && getQueryParam("type") !== "") || Place == 66) addComments('You are handcuffed and the metal seems to block the spell from working.');
	else if (Place == 142) {
		// Anika shoots you!
		ShotByAnita();
		return "nofooter";
	} else if (perKurndorf.getQuestSeance() >= 50 && perKurndorf.getQuestSeance() < 100) addComments('You attempt to summon the power of Teleportation, but the spell fails to penetrate the power of the Séance...');	//Séance is ACTIVE
	else if (nMana === 0) addComments('Not enough mana.');
	else if (isPossess()) addComments('You cannot teleport while possessing someone else\'s body.');
	else {
		// Posession spell NOT CAST
		var plc = Place;
		if (perYou.health === 0 || gameState.nLastOut == -1) plc = 999;
		switch (plc)  //Can't TELEPORT from these places because its the end of the game
		{
			case 141:	// Sacred Clearing, attacked by a monster
				if (sType != "banshee" && sType != "monster") break;
				// fall through....
			case 109:  //Stabbed by Kate
			case 198:  //killed by Vamp
			case 995:  //Enthralled
			case 996:  //Crystal
			case 997:  //Possessed
			case 999:  //Blank
				addComments('<p>"Alas, it is too late to teleport away, for your lips will no longer form the words necessary."</p>');
				return "";
		}
		TeleportTo();
		return "nofooter";
	}
}

// Hexagrams in place
function Hexagram(nm, plc)
{
	this.name = nm;			// Their name (not saved)
	this.place = plc === undefined ? 0 : plc;			// where are they
}

function attuneHexagram(reset)
{
	setPlaceAttuned(Place);
	WaitHereOnly(reset === true ? 2 : 6);
	dispPlace();
	bChat = false;
	if (reset === true) WriteComments('You spend some time and break the attunement for this place');
	else WriteComments('You spend some time and do the ritual of attunement');
}

function enscribeHexagram(plc, nm)
{
	if (nMana > 0) {
		AddMana(-1);
		if (plc === undefined) plc = Place;
		setPlaceEnscribed(plc, nm);
		setPlaceAttuned(plc);
		WaitHereOnly(6);
		dispPlace();
		bChat = false;
		WriteComments('You spend some time and carve a hexagram into a tree using your pocketknife and then attune yourself to it');
	} else WriteComments("You do not have enough mana to power the hexagram");
}

function isPlaceAttuned(plc) {
	for (var i = 0, ie = arHexagrams.length; i < ie; i++) {
		if (Math.abs(arHexagrams[i].place) == Math.abs(plc)) return arHexagrams[i].place < 0;
	}
	return false;
}
function setPlaceAttuned(plc)
{
	for (var i = 0, ie = arHexagrams.length; i < ie; i++) {
		if (arHexagrams[i].place == plc) {
			arHexagrams[i].place = plc * -1;
			return;
		} else if (arHexagrams[i].place == (-1 * plc)) {
			arHexagrams[i].place = plc;
			return;
		}
	}
}
function isPlaceEnscribed(plc)
{
	plc = Math.abs(plc);
	for (var i = 0, ie = arHexagrams.length; i < ie; i++) {
		if (Math.abs(arHexagrams[i].place) == plc) return true;
	}
	return false;
}
function setPlaceEnscribed(plc, nm)
{
	if (isPlaceEnscribed(plc)) return;
	var hx = new Hexagram(getPlaceName(plc) !== '' ? '' : nm, plc);
	arHexagrams.push(hx);
}

function CastTeleportSpell(sPlace, att, params)
{
	showSideBars();
	var cost = 0;
	if (sPlace == 900) cost = 0;
	else if (att === true) {
		if (Math.random() > 0.33) cost = 1;
	} else cost = 1;
	
	if (nMana >= cost)
	{
		// Reset any break-in states, possibly this should just iterate arPlaces
		setPlaceBreakIn("Aquarium", false);
		setPlaceBreakIn("Museum", false);
		setPlaceBreakIn("TownHall", false);
		setPlaceBreakIn("HistoryClassroom", false);
		setPlaceBreakIn("Library", false);
		
		if (isPossess("cast")) CancelPossession();
		// special case of confronting Davy
		checkInvisible();
		//setPersonFlag("Kate", 16, false);
		
		if (cost > 0) AddMana(cost * -1);
		
		if (Place == 192 && getQueryParam("type") == "vampboundfree") {
			Leave();
			return;
		}
		if (getPersonOther("OfficerSmith") == 100) {
			// If Officer Smith is Shot, but left w/o ambulance = Officer Smith DEAD
			per.health = 0;
			per.other = 900;
		}
		var s = '';
		var ps = '';
		if (Place == 202) Leave202();
		if (Place == 252 && wherePerson("Anita") === 0 && !isCharmedBy("Anita", "You")) LeaveLair();
		else if (Place == 247 && getPersonOther("Vampyre") == 60) setPersonOther("Vampyre", 1000);		// Vampyre flees forever
		else if (Place == 184 && getQueryParam("type") == "plan") {
			// You really piss off Kate
			setPersonFlag("Kate", 4);
			movePerson("Kate", 184);
			s = 'As you start to vanish Kate looks pissed off at your apparent cowardice! and runs toward the room Davy is in.<br>You read the spell and it works.';
			ps = 'Kate';
		} else s = 'You cast the spell and you fade out and then appear in the new place.';
		
		if (sPlace == 70 && !isShopOpen(2)) setPlaceBreakIn("HistoryClassroom");
		else if (sPlace == 177) {
			if (isCharmedBy("MrsGranger") && per.dress === "") per.dress = per.getNextDress();
		}

		if (sPlace == 900 || !perYou.checkFlag(21)) {
			// leave people behind
			var sLeft = '';
			var p;
			for (var i = 0, ie = arPeople.length - 1; i < ie; i++) {
				p = arPeople[i];
				if (p.place == -1) {
					sLeft = p.uid;
					break;
				}
			}
			if (wherePerson("Vampyre") == -1) movePerson("Vampyre", Place == 325 ? 325 : 247);
			else if (wherePerson("Diane") == -1) movePerson("Diane", 168);
			else if (wherePerson("Tina") == -1) movePerson("Tina", 83);
			if (sLeft !== '') {
				if (params === undefined) params = "who=" + sLeft;
				else params += "&who=" + sLeft;
			}
			if (sPlace == 900) findPerson("Elian").setTeleportFrom(Place);
		} else if (sPlace == 319) {
			s = EnterChurch(319, true);
			if (s !== "") ps = per.name + " Screams";
		}

		gameState.nLastOut = 0;

		dispPlace(sPlace, params === undefined ? '' : params, s, ps);

	} else {
		WriteComments('You do not have enough mana to cast the spell.');
		dispPlace();
	}
}

function TeleportTo()
{
	hideSidebars();
	var plc = Place;
	var nm = '';
	if (gameState.plcTitle !== '') nm = gameState.plcTitle.split(gameState.sTown + " ").join("");
	else nm = getPlaceName(Place);

	// Is anyone here
	var bHere = false;
	var i;
	var ie;
	if (perYou.checkFlag(21)) {
		var p;
		for (i = 0, ie = arPeople.length - 2; i < ie; i++) {
			p = arPeople[i];
			if (p.isPlaceImageRight() && !p.shown && p.health !== 0) {
				bHere = true;
				break;
			}
		}
	}
	var cols = isScreenSmall() ? 1 : bHere ? 3 : 2;

	var doc = WritePlaceHeader(true, '', nTheme === 0 ? "#FFFFFF" : "");
	gameState.plcTitle = "Teleport";
	doc.write(
		'<table class="table-main">' +
			'<tr>' +
				'<td' + (cols > 1 ? ' colspan="' + cols + '"' : '') + ' style="width:100%;background-image: url(\'' + getThemeFolder() + 'background.jpg\')">' +
					'<p style="text-align:center;font-size:x-large;"><b>Teleport Spell</b></p>' +
				'</td>' +
			'</tr><tr><td' + (cols > 1 ? ' colspan="' + cols + '"' : '') + '>' +
			'<p>You murmur the words of Shio Stin Mur, causing a light mist to swirl around your feet. You can teleport ' + (perYou.checkFlag(21) ? 'yourself and other willing people' : 'yourself only') + ' to any of the places below for one mana:</p>' +
			'</td><tr><td style="' + (cols > 1 ? 'width:15%;' : '') + 'vertical-align:top">' +
			'<b>Choose a location:</b><br>'
	);

	function Teleports(doc, plc, desc, param) {
		if (isPlaceKnown(desc) && Place != plc) {
			if (param !== undefined && param !== "") plc = plc + ",undefined,'" + param + "'";
			addOptionLink(doc, desc, 'CastTeleportSpell(' + plc + ')', 'travelblock', "width:90%");
		}
	}

	// Create/Attune
	var bHex = isPlaceEnscribed(Place);
	if (isOutside() && perYou.checkFlag(21) && !bHex) addOptionLink(doc, "enscribe and attune hexagram", "showSideBars();enscribeHexagram(" + Place + ",'" + nm.split('\'').join('') + "')", "optionblock", "width:90%");
	if (bHex) addOptionLink(doc, (isPlaceAttuned(Place) ? "un-attune" : "attune") + " hexagram", 'showSideBars();attuneHexagram(' + isPlaceAttuned(Place) + ')', 'optionblock', "width:90%");

	// To Elian
	findPerson("Elian")
	if (per.isCharmedBy() && per.place < 1000) Teleports(doc, 900, "<b>ElianIscariotAgosOmiSayla</b>", 'type=elianteleportvisit');
	else if (Place == 141 && per.checkFlag(1) && !isDay() && per.place < 1000) {
		if (!per.checkFlag(2)) {
			// Initial visit 'come to me'
			Teleports(doc, 900, "<b>Elian</b>", 'type=elianteleportbad');
			if (checkPersonFlag("Jade", 7)) {
				if ((perYou.checkFlag(18) && nMana > 19) || perYourBody.FindItem(44) > 0 || perYourBody.FindItem(46) > 0) Teleports(doc, 900, "or <b>nailE</b>", 'type=naileteleportok');
				else Teleports(doc, 900, "or <b>nailE</b>", 'type=elianteleportbad&naile=true');
			}
		} else if (per.checkFlag(26)) {
			// Post knowing her true name
			Teleports(doc, 900, "<b>ElianIscariotAgosOmiSayla</b>", 'type=elianteleporttruename');
		}
	}
	// Home
	Teleports(doc, 46, "Your bedroom");

	// Hexagrams
	var arTemp = [];
	for (i = 0, ie = arHexagrams.length; i < ie; i++) {
		if (arHexagrams[i].place < 0) arTemp.push(new Hexagram(arHexagrams[i].name === '' ? getPlaceName(arHexagrams[i].place * -1) : arHexagrams[i].name, arHexagrams[i].place * -1));
	}
	// Improved Teleport locations
	if (perYou.checkFlag(21)) {
		arTemp.push(new Hexagram("Kurndorf\'s Crypt", 247));
		arTemp.push(new Hexagram("Hotel Cellar", 161));
		arTemp.push(new Hexagram("Robbins\' House", 176));
		arTemp.push(new Hexagram("Granger House", 177));
		arTemp.push(new Hexagram("Adams House", 230));
		arTemp.push(new Hexagram("School Hallway", 70));
	}
	
	// Sort and show the locations
	arTemp.sort(function(a, b) {
		return a.name > b.name;
	});
	for (i = 0; i < arTemp.length; i++) {
		Teleports(doc, arTemp[i].place, arTemp[i].name);
	}

	addOptionLink(doc, 'Cancel the spell', 'showSideBars();Leave(true);dispPlace()','optionblock', "width:90%");
	doc.write('<br></td>');
	if (cols == 1) doc.write('</tr><tr>');
	doc.write(
		'<td style="color:black;overflow-y:auto;overflow-x:auto' + (cols > 1 ? ';width:' + (bHere ? '70%' : '85%') : '') + ';background-image:url(UI/map/mapbg.jpg);background-size:cover">' +
		'<b>Click on a location with a hexagram to teleport to:</b>'
	);
	doc.write(getMapHTML("100%", "100%",
		function(id) {
			// On click of a place
			var s;
			if (id == 123 && perYou.checkFlag(21) && isPlaceKnown("Hotel Cellar")) {
				// Hotel + Cellar
				s = "WriteComments(&quot;" +
				"<div style='margin-top:1em;margin-bottom:1em;margin-left:2em;margin-right:2em;cursor:default'>" +
				"<table><tr><td width='80%'><p style='text-align:center'>Where in the Broken Inn Hotel do you focus the spell on?</p>" +
				addOptionLink("ss", 'Outside', "CastTeleportSpell(123)") +
				addOptionLink("ss", 'Cellar', "CastTeleportSpell(161)") +
				"</td><td width='20%'><img src='Images/hotel1.jpg' style='width:95%' alt='Hotel'></td></tr></table>" +
				'&quot;)';

			} else if (id == 9 && perYou.checkFlag(21)) {
				// School
				s = "WriteComments(&quot;" +
				"<div style='margin-top:1em;margin-bottom:1em;margin-left:2em;margin-right:2em;cursor:default'>" +
				"<table><tr><td width='80%'><p style='text-align:center'>Where in " + gameState.sTown + " High School do you focus the spell on?</p>" +
				addOptionLink("ss", 'Outside', "CastTeleportSpell(9)") +
				addOptionLink("ss", 'Hallway', "CastTeleportSpell(70)") +
				"</td><td width='20%'><img src='Images/school1.jpg' style='width:95%' alt='School'></td></tr></table>" +
				'&quot;)';

			} else if (id == 317 && isPlaceAttuned(319)) {
				// Church
				if (!isPlaceAttuned(317)) s = "CastTeleportSpell(319)";
				else {
					s = "WriteComments(&quot;" +
					"<div style='margin-top:1em;margin-bottom:1em;margin-left:2em;margin-right:2em;cursor:default'>" +
					"<table><tr><td width='80%'><p style='text-align:center'>Where in the Church do you focus the spell on?</p>" +
					addOptionLink("ss", 'Outside', "CastTeleportSpell(317)") +
					addOptionLink("ss", 'Courtyard', "CastTeleportSpell(319)") +
					"</td><td width='20%'><img src='Images/church1.jpg' style='width:95%' alt='Church'></td></tr></table>" +
					'&quot;)';
				}
			} else if (id == 26 && perYou.checkFlag(21) && isPlaceKnown("KurndorfsCrypt")) {
				// Wild Ranges
				if (!isPlaceAttuned(26)) s = "CastTeleportSpell(247)";
				else {
					s = "WriteComments(&quot;" +
						"<div style='margin-top:1em;margin-bottom:1em;margin-left:2em;margin-right:2em;cursor:default'>" +
						"<table><tr><td width='80%'><p style='text-align:center'>Where in the Wild Ranges do you focus the spell on?</p>" +
						addOptionLink("ss", 'Outside', "CastTeleportSpell(26)") +
						addOptionLink("ss", 'Kurndorf\'s Crypt', "CastTeleportSpell(247)") +
						"</td><td width='20%'><img src='Images/stones.jpg' style='width:95%' alt='Wild Ranges'></td></tr></table>" +
						'&quot;)';
				}

			} else if (id == 52 && !isPlaceAttuned(52)) s = "CastTeleportSpell(53)";
			else if (id == 9 && !isPlaceAttuned(9)) s = "CastTeleportSpell(70)";
			else s = "CastTeleportSpell(" + id + ")";
			return s.split('"').join('&quot;').split('<').join('&lt;').split('>').join('&gt;');
		})
	);

	if (perYou.checkFlag(21)) ShowPeople(true, "People who will teleport with you");

	WritePlaceFooter(doc, '', true, true);
	return true;
}
