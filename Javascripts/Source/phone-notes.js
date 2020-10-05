/**********************************************************************************
Your Phone's Notes
***********************************************************************************/

function getPhoneNotes(stype)
{
	var vis = perYou.extra[1];
	perYou.extra[1] = 0;
	
	var perSarah = findPerson("Sarah");
	
	var ha = Math.round(0.072 * getHeight(document));
	var wtab = 5;
	if (!gameState.bPhoneLandscape || isScreenSmall()) wtab = 10;

	function showQuestF(started, comp, desc, nobr, failed, desccomplete, hdr) {
		if (!started) return '';
		if (comp) {
			var ar = desccomplete != undefined ? desccomplete : desc;
			ar = ar.split('&nbsp;');
			ar[ar.length - 1] = '<span style="' + (hdr === true ? 'position:relative;top:0.25em;font-weight:bold;' : '') + 'text-decoration:line-through">' + ar[ar.length - 1] + '</span> ' + (failed === true ? '&#10006;' : '&#10004;');
			desc = ar.join('&nbsp;');
		} else if (hdr === true) desc = '<span style="position:relative;top:0.25em;font-weight:bold">' + desc + '</span>';
		if (nobr !== true) return desc + '<br>';
		return desc;
	}
	function showQuestFH(st, comp, desc, nobr, failed, desccomplete) { return showQuestF(st, comp, desc, nobr, failed, desccomplete, true); }
	function showQuestH(no, desc, failed, desccomplete) { return showQuestF(perYou.isQuestStarted(no), perYou.isQuestComplete(no), desc, false, failed, desccomplete, true); }
	function showQuest(no, desc, failed, desccomplete, hdr) { return showQuestF(perYou.isQuestStarted(no), perYou.isQuestComplete(no), desc, false, failed, desccomplete, hdr); }
	function addHeader(txt, s) {
		if (s !== undefined) {
			if (s === '') return '';
		} else s = '';
		return '<span style="position:relative;top:0.35em;font-weight:bold">' + txt + '</span><br style="line-height:1.5em">' + s; }
	
	// Notes header
	var sp = '';
	var s = '<script type="text/javascript">document.onkeypress = stopRKey;initLightbox();</script>' +
		'<div style="position:absolute;text-align:left;cursor:default;vertical-align:top;overflow-x:hidden;overflow-y:hidden;width:100%;height:100vh;min-height:100vh;z-index:46;border-style:none">' +
		'<div style="position:absolute;top:0px;left:0px;background-color:lightsteelblue;width:' + (wtab + 2) + '%;height:92%;margin-left:2%;margin-top:2%;"></div>' +
		'<div style="position:absolute;top:0px;left:0px;background-color:lightblue;width:90%;height:92%;margin-left:' + (wtab + 4) + '%;margin-top:2%;"></div>' +
		"<img draggable='false' style='float:left;position:absolute;max-height:99%;vertical-align:top;padding:0;width:100%;position:absolute;max-height:100vh;height:100vh;border-left:2px;border-style:solid;border-bottom:none;border-top:none;border-right:none;left:0;top:0' src='UI/phone3l.png'>" +
		addOptionLink("string", "Close", "showRightBar(-1*gameState.nRightBarState);showLeftBar();dispPlace()", "chatblock", "position:absolute;margin-top:0;top:6px;left:5px;margin-left:4%;width:20%");
		
	if (!isScreenSmall()) s +=	'<span class="zoom-icon" style="position:absolute;top:0px;right:25px;width:7%;height:5%"><img draggable="false" style="cursor:pointer;" onclick="rotatePhone();return false" src="UI/rotate.png" width="48" alt="Rotate" title="Rotate"></span>';
	s += '<div id="notdiv" style="position:absolute;top:0px;left:0px;text-align:left;margin:' + (ha + 1) + 'px -4px ' + ha + 'px ' + (wtab + 5) + '%;height:85vh;width:' + (isScreenSmall() ? "81" : "86") + '%;overflow:auto;color:black">';
	
	// Notes in your phone
	if (stype === "notes1") {
		// Personal Notes
		s += getLSD(gameState.bPhoneLandscape || isScreenSmall() ? "20%" : "35%") +
			  '<p style="font-size:medium;font-weight:bold;margin-bottom:2px">Personal Details:</p>' +
		     '<b>Name, Address</b><br>' + perYou.getPersonName() + ", 16 Kollam St, Glenvale, " + (isBritish() ? "UK" : "USA") + "<br>";
		
		if (perYou.getPersonGender() == "futa") s += "You are neither male or female, you are a fully functioning hermaphrodite.<br>";
		else s += "You are a " + perYou.getSex() + '.<br>';

		s += addHeader("Money");
		// Owe Mom money
		if (perYou.getBankBalance() !== 0) {
			s += "I have an account at the bank 'Friendly Loan Company'<br>" +
			     'I have ' + sCurrency + (perYou.getBankBalance() - 1) + ' in my account.<br>';
			var accountMax = perYou.checkFlag(9) ? -1 : (Math.floor(nTime / 288) > 30 ? -1 : 200);
			if (accountMax === -1) s += "There is no limit on my bank account.<br>";
			else s += "I can only deposit up to " + sCurrency + accountMax + " in my bank account.<br>";
		} else s += 'I do not currently have a bank account<br>';
		if (checkPersonFlag("Kristin", 13)) s += "I have a low-limit credit card.<br>";
		if (nMoney < 0) s += "I owe Mom " + sCurrency + Math.abs(nMoney) + " and will pay her back when I get some money.<br>";
		
		findPerson("MissLogan");
		sp = ''
		if (per.checkFlag(9)) sp += 'I have to do the neurology assignment for Miss Logan. I should check with her for more details.<br>';
		else if (per.checkFlag(8)) sp += 'I have to do the reproductive assignment for Miss Logan. I should check with her for more details.<br>';
		s += addHeader("School", sp);
		
		sp = '';
		if (checkPlaceFlag("Hospital", 4)) sp += "I have a key to the old hospital basement.<br>";
		if (checkPlaceFlag("Park", 5)) sp += "I have a key to the construction site.<br>";
		if (isPlaceKnown("CharliesHouse")) sp += "I have a key to Charlie\s home.<br>";
		if (isCharmedBy("Hannah")) sp += 'I have a key to Hannah\'s apartment.<br>';
		if (getCharmedLevel("Leanne") == 4) sp += 'I have a key to Leanne\'s home.<br>';
		s += addHeader("Keys", sp);
		
		s +=	'<br></div>'+		
				'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(10vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(20vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(30vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(40vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes5\');return false" src="UI/schedule.png" width="99%" alt="Schedule" title="Schedule"></span>';

	} 
	
	else if (stype === "notes2") {
		// Quests
		s += '<p style="font-size:medium;font-weight:bold;margin-bottom:2px">Things to do:</p>';

		if (perYou.getExperience() > 0) s += showQuest(4, "Find the Book, " + perGates.getPersonName() + " has it");
		else s += showQuest(4, "Find the Book");
		if (!(isConspiracyPath() && !perSarah.checkFlag(3))) s += showQuest(1, (isMurderPath() || isConspiracyPath() ? "Where can I find mana" : "Find a magic stone for " + perGates.getPersonName()) + (perYou.isQuestComplete(1) ? "" : ", maybe Mr. Beasley can help?"));
		if (isMurderPath()) s += showQuestF(perYou.isQuestStarted(1), perYou.FindItem(11) > 0, "How do I learn spells from the Book");
		s += showQuest(2, "Find an old key for " + perGates.getPersonName());
		s += showQuest(3, "Find a Magic Gem");
		s += showQuestF(getPersonOther("Mayor") > 0, getPersonOther("Mayor") > 3, "Get an appointment with Mayor Thomas");
		
		if (perDavy.other > 0) {
			s += addHeader("Davy");
			s += "&nbsp;&nbsp;&nbsp;Davy Robbins and Mr. Beasley?<br>";
			if (perDavy.checkFlag(9)) s += "&nbsp;&nbsp;&nbsp;That bastard tried to hurt me!!!<br>";
			if (isMurderPath() && perGates.other == 600) s += '&nbsp;&nbsp;&nbsp;Davy\'s woman killed ' + perGates.getPersonName() + '<br>';
			s += showQuestF(checkPlaceFlag("Hotel", 8), getPersonOther("Jessica") > 0, "&nbsp;&nbsp;&nbsp;Find out what Davy wanted in the Hotel Cellar");
			s += showQuestF(true, isDavyDefeated(), perDavy.checkFlag(6) ? "&nbsp;&nbsp;&nbsp;Davy has Fled Glenvale" : "&nbsp;&nbsp;&nbsp;Defeat Davy");
			if (isDavyCaptive()) {
				s += "&nbsp;&nbsp;&nbsp;Davy is my captive!<br>";
				s += showQuestF(true, perDavy.isCharmedBy(), "&nbsp;&nbsp;&nbsp;Charm Davy");
			}
		}
		
		if (perKurndorf.getQuestSeance() >= 16) {
			s += addHeader('Jessica');
			findPerson("Jessica");
			s += showQuestF(true, perKurndorf.getQuestSeance() >= 50, "&nbsp;&nbsp;&nbsp;Summon the ghost of Kurndorf");
			if (!per.isRival()) {
				// Bound in cellar/ally
				var riv = per.getRivalry();
				if (riv >= 0) s += showQuestF(isDemonFreed(), per.whereNow() != 161, "&nbsp;&nbsp;&nbsp;Free Jessica from the bindings");
				else s += showQuestF(true, true, "&nbsp;&nbsp;&nbsp;Jessica is my " + (riv == -1 ? "prisoner" : 'witch-toy'));
			} else {
				// Rival
				s += showQuestF(true, false, "&nbsp;&nbsp;&nbsp;Jessica is free, but is she a friend?");
			}
		}
		
		s += showQuestFH(perKurndorf.getQuestGhost() >= 100, perKurndorf.getQuestRitual() >= 200, "Perform the Ritual for Kurndorf");
		if (perKurndorf.getQuestGhost() >= 100) {
			s += '&nbsp;&nbsp;&nbsp;Use these in prison. Needed: ';
			s += showQuestF(true, perKurndorf.checkFlag(17), "Chalk", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(15), "Candles", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(12), "Chalice", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(13), "Quartz Crystal", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(14), "Silver Dagger", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(11), "Salt", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(16), "Hemlock", true) + ', ';
			s += showQuestF(true, perKurndorf.checkFlag(8), "Human Skull", true) + ', ';
			s += showQuestF(true, perYourBody.FindItem(56) > 0, "Lock of your hair");
			if (checkPlaceFlag("Crypt", 2)) s += "&nbsp;&nbsp;&nbsp;Kurndorf's crypt is in a remote wild and magical place, protected by a stone tablet<br>";
			if (perYou.getQuestAftane() >= 60 && !isMurderPath()) s += "&nbsp;&nbsp;&nbsp;" + perGates.getPersonName() + " said to use a piece of Kurndorf's own skull<br>";
		}
		
		var perGlenvale = findPerson("Glenvale");
		if (isDemonFreed()) {
			s += showQuestFH(isDemonFreed(), isDemonQuestDone(), "Deal with Legion");
			if (!isSpellKnown("Clairvoyance")) s+= "&nbsp;&nbsp;&nbsp;Learn a spell to help find Legion<br>";
			else if (isSpellKnown("Hydromancy")) s += showQuestF(true, perGlenvale.checkFlag(71), "&nbsp;&nbsp;&nbsp;cast hydromancy maybe it will help find Legion?");
			findPerson("Desiree");			
			s += showQuestF(per.getQuestRelic() > 0, per.getQuestRelic() >= 100, "&nbsp;&nbsp;&nbsp;Get a Catholic Relic for Legion");
		}
		
		findPerson("Leanne");
		s += showQuestH(5, "Save Leanne", per.isCharmedBy("Demon"));
		var bRitualReturn = per.checkFlag(8);
		if (perYou.isQuestStarted(5) && !perYou.isQuestComplete(5) && bRitualReturn) {
			s += '&nbsp;&nbsp;&nbsp;Needed: ';
			s += showQuestF(true, checkPersonFlag("Victoria", 9) || checkPersonFlag("Vampyre", 2), "Mirror of Souls", true) + ', ';
			s += showQuestF(true, whereItem(35) !== 0, "Dragon Gem", true) + ', ';
			s += showQuestF(true, whereItem(35) == -53, "Dragon Gem Bound", true) + ', ';
			s += showQuestF(true, perYou.checkFlag(21), "Can Teleport another person", true) + ', ';
			s += showQuestF(true, isPlaceAttuned(53), "Attuned the Hidden Room for teleporting", false);
		}

		if ((perSarah.isCharmedBy() && isMurderPath()) || (perSarah.other > 39 && perSarah.other < 51) || (isConspiracyPath() && perYou.isQuestStarted(6))) s += addHeader(isConspiracyPath() && !perYou.isQuestComplete(6) ? 'Noble Ally' : 'Sarah');
		if (isConspiracyPath()) {
			s += showQuestH(6, "Visit 'Noble Ally', serphoni, midnight, Sacred Clearing");
			if (perYou.isQuestStarted(6) && !perYou.isQuestComplete(6)) {
				s += '&nbsp;&nbsp;&nbsp;Needed: ';
				findPerson("Bambi");
				if (per.checkFlag(5)) s += showQuestF(true, perYou.getQuestRustyKey() >= 999, "Find the Key (Park)", true) + ', ';
				s += showQuestF(true, perYou.FindItem(40) > 0, "Bottle of Fine Wine");
			}
		}		
		if (perSarah.isCharmedBy() && isMurderPath()) {
			findPerson("Lauren");
			s += showQuestF(true, per.flags[0] > 0 || whereItem(40) == 192 , "&nbsp;&nbsp;&nbsp;Give Sarah a fine bottle of wine");
		}
		if (perSarah.other > 39 && perSarah.other < 51) s += "&nbsp;&nbsp;&nbsp;Sarah needs you to protect her within the next " + (51 - perSarah.other) + "days.</br>";
		
		if (perYou.checkFlag(12)) {
			s += showQuestFH(perYou.checkFlag(12), perYou.checkFlag(25), "Learn hypnosis techniques");
			s += '&nbsp;&nbsp;&nbsp;Needed: ';
			s += showQuestF(true, perYou.checkFlag(24), "Study the basics, find a book on hypnosis", true) + ', ';
			s += showQuestF(true, perYou.checkFlag(25), "Learn from Mr. Beasley (" + (perYou.canUseExperience(true) ? "experience available" : "more experience needed") + ")");
		}
		
		var perAdele = findPerson("AdeleRoss");	
		if (perYou.isQuestStarted(8) || (perAdele.checkFlag(4) && (perSarah.other > 0 || (isConspiracyPath() && perYou.isQuestStarted(6))))) {
			findPerson("Catherine");
			s += showQuestH(8, "Ross Sisters", false);
			// Catherine
			if (per.checkFlag(4)) s += showQuestF(true, per.checkFlag(5), "&nbsp;&nbsp;&nbsp;Wait for Catherine at the construction site at midday and call her");
			if (per.checkFlag(5)) s += showQuestF(true, per.checkFlag(10), "&nbsp;&nbsp;&nbsp;Wait for Catherine's call");			
			// Adele
			s += showQuestF(perAdele.checkFlag(4) && (perSarah.other > 0 || (isConspiracyPath() && perYou.isQuestStarted(6))), perAdele.place != 16, "&nbsp;&nbsp;&nbsp;Get rid of Adele, the Police guard at the mansion");
			if (per.checkFlag(10) && !perAdele.checkFlag(6)) s += showQuestF(true, false, "&nbsp;&nbsp;&nbsp;Visit Adele and charm her");
			if (perAdele.checkFlag(8)) s += showQuestF(true, perAdele.isCharmedBy(), "&nbsp;&nbsp;&nbsp;Charm Adele again (need hypnotic technique)");			
			// Amy
			var perAmy = findPerson("AmyRoss");
			var perCharlie = findPerson("Charlie");
			s += showQuestF(true, perCharlie.checkFlag(3), "&nbsp;&nbsp;&nbsp;Find Amy", undefined, undefined, "&nbsp;&nbsp;&nbsp;Find Amy - at Gym");
			s += showQuestF(perCharlie.checkFlag(5), perCharlie.other >= 3, "&nbsp;&nbsp;&nbsp;Convince Charlie", true);
			if (perCharlie.other < 3 && perCharlie.checkFlag(5) && (perCharlie.checkFlag(6) || perCharlie.checkFlag(7) || perCharlie.checkFlag(8))) {
				s += 'by: ';
				if (perCharlie.checkFlag(6)) s += "have <b>her</b> arrested" + (perCharlie.checkFlag(7) || perCharlie.checkFlag(8) ? ", " : "");
				if (perCharlie.checkFlag(7)) s += "disciplined by Bambi" + (perCharlie.checkFlag(8) ? ", " : "");
				if (perCharlie.checkFlag(8)) s += "hypnosis";
				s += '<br>';
			} else if (perCharlie.checkFlag(5)) s += '<br>';
		}
		
		findPerson("MissLogan");
		if (per.checkFlag(8) || per.checkFlag(9)) {
			s += showQuestFH(true, per.getCharmedLevel() > 1, "Miss Logan");
			s += showQuestF(true, per.other > 7, "&nbsp;&nbsp;&nbsp;I should visit Miss Logan in the Anatomy Classroom ");
			if (per.isNeuro()) {
				s += showQuestF(true, per.checkFlag(11), "&nbsp;&nbsp;&nbsp;check her tablet computer");
				if (per.checkFlag(11)) s += showQuestF(true, per.getCharmedLevel() > 1, "&nbsp;&nbsp;&nbsp;hypnotically refocus her obsession on me");
			}
		}
		
		findPerson("Kate");
		if (per.place != 47) {
			sp = '';
			if (per.place == 9999) sp += '&nbsp;&nbsp;&nbsp;Kate has left Glenvale forever!!<br>';
			else {
				if (per.place === 3) sp += '&nbsp;&nbsp;&nbsp;Remember to meet Kate to study in the library<br>';
				if (per.checkFlag(36) && !per.checkFlag(7)) sp += '&nbsp;&nbsp;&nbsp;I would like to see her holiday photos<br>';
				if (per.checkFlag(36) && per.checkFlag(7) && per.checkFlag(8) && !per.checkFlag(9)) sp += '&nbsp;&nbsp;&nbsp;Where is the other photo album?<br>';
				if (per.checkFlag(24) && per.place == 1000) {
					if (per.checkFlag(16)) sp += '&nbsp;&nbsp;&nbsp;Kate is unsure about me, I just have to wait for her to decide<br>';
					else sp += '&nbsp;&nbsp;&nbsp;Kate is unsure about me. Where is she? Maybe ask her mother<br>';
				}
			}
			s += addHeader('Kate', sp);
		}
		findPerson("MrsGranger");
		if (per.other >= 2) {
			s += addHeader("Mrs Granger");
			if (per.other < 2.2) s += '&nbsp;&nbsp;&nbsp;Mrs Granger is investigating the Wild Ranges.<br>';
			else s += '&nbsp;&nbsp;&nbsp;Mrs Granger investigated the Wild Ranges. &#10004;<br>';
			if (per.other == 5) s += '&nbsp;&nbsp;&nbsp;Mrs Granger is looking for the Dragon Gem at the Museum.<br>';
			else if (Math.floor(per.place) == 275 || per.place == 278) s += '&nbsp;&nbsp;&nbsp;Mrs Granger is in the hospital.<br>';
			else if (per.place == 261) s += '&nbsp;&nbsp;&nbsp;Mrs Granger is in jail!<br>';
		}		

		findPerson("Sofia");
		if (perYou.isQuestStarted(7)) {
			s += showQuestH(7, "Charm " + per.name, per.whereNow() == 999);
			if (!perYou.isQuestComplete(7)) {
				s += showQuestF(true, per.checkFlag(11), "&nbsp;&nbsp;&nbsp;Find someone who can tell you more about " + per.name);
				if (isMurderPath()) {
					if (per.checkFlag(13)) s += showQuestF(true, per.checkFlag(14), "&nbsp;&nbsp;&nbsp;Discuss your plan with someone who has authority");
					if (per.checkFlag(14)) s += showQuestF(true, per.checkFlag(15), "&nbsp;&nbsp;&nbsp;Break into Sofia’s office and search for clues against her (only between 8-10 AM)");
					if (per.checkFlag(15)) s += showQuestF(true, perYou.isQuestComplete(7), "&nbsp;&nbsp;&nbsp;Return to Kerry Batton with the information you have collected on Sofia");
				} else {
					s += showQuestF(per.checkFlag(26), per.checkFlag(14), "&nbsp;&nbsp;&nbsp;Ask someone at the church for help");
					s += showQuestF(per.checkFlag(14), per.checkFlag(13), "&nbsp;&nbsp;&nbsp;Ask someone at the church for help");
					s += showQuestF(per.checkFlag(15), per.checkFlag(14), "&nbsp;&nbsp;&nbsp;Call Sister Desiree to pickup the Bible");					
				}
			}
		}

		findPerson("Miku");
		if (per.other < 0) {
			showQuestFH(true, per.isCharmedBy(), "Charm Miku");
			s += addHeader("Miku");
			if (per.other <= -1) s += showQuestF(true, per.other < -1, "&nbsp;&nbsp;&nbsp;Research bloodlines");
			if (per.other < -1) s += showQuestF(true, per.other <= -10, "&nbsp;&nbsp;&nbsp;Speak to the Gates family");
			if (per.other <= -20) s += showQuestF(true, per.other == -100, "&nbsp;&nbsp;&nbsp;Transform Miku and charm her");
		}
		
		if (checkPersonFlag("Hannah", 8) && wherePerson("Camryn") !== 0) {
			findPerson("Camryn");
			s += addHeader("Rescue Camryn");
			s += showQuestF(true, per.place != 801, "&nbsp;&nbsp;&nbsp;Possess Camryn");
			if (per.checkFlag(21) && !per.checkFlag(22)) s += showQuestF(true, per.checkFlag(22), "&nbsp;&nbsp;&nbsp;Report to the Police");
			if (per.place == 457) s += showQuestF(true, per.isCharmedBy(), "&nbsp;&nbsp;&nbsp;Charm Camryn");
		}
		
		if (checkPersonFlag("Bambi", 7)) {
			findPerson("Mia");
			if (!per.isCharmedBy()) {
				var dc = Math.floor((nTime - this.charmedTime) / 288);		// Days charmed/since arrived
				showQuestFH(true, false, "Charm Mia after " + (7 - dc) + " days (or sooner)");
			} else showQuestFH(true, per.isCharmedBy(), "Charm Mia");
		}
		
		var perMom = findPerson("Mom");
		findPerson("Gabby");
		if (perMom.checkFlag(34)) {
			s += addHeader("Mom and Gabby");
			s += showQuestF(true, per.checkFlag(3) || per.checkFlag(4), "&nbsp;&nbsp;&nbsp;What is happening between Mom and Gabby");
			if (per.checkFlag(3) || per.checkFlag(4)) {
				s += showQuestF(true, per.checkFlag(8) || per.checkFlag(10), "&nbsp;&nbsp;&nbsp;Find out about the necklace");
				if (perMom.place == 1000) s += "&nbsp;&nbsp;&nbsp;Mom and Gabby ran away together (BAD END)";
				else if (per.checkFlag(10)) {
					// Apprentice/Conspiracy
					if (!per.isCharmedBy()) {
						if (per.checkFlag(13)) s += showQuestF(true, false, "&nbsp;&nbsp;&nbsp;Missed the press conference");
						else s += showQuestF(true, false, "&nbsp;&nbsp;&nbsp;Attend the press conference " + (per.checkFlag(23) ? "today" : "tomorrow") + " at 6pm");
					} else s += showQuestF(true, true, "&nbsp;&nbsp;&nbsp;Attend the press conference");
				}
				s += showQuestF(true, per.isCharmedBy(), "&nbsp;&nbsp;&nbsp;Charm Gabby");
			}
		}
		
		if (perGlenvale.checkFlag(67)) {
			// Elian, had the initial hydromancy vision
			var perJade = findPerson("Jade");
			findPerson("Elian");
			s += addHeader(per.checkFlag(1) ? 'Elian' : 'Demonic Visions');
			if (!per.checkFlag(1)) s += 'That vision of the demon was real and she wants me! Maybe she will come for me in my dreams.<br>';
			else {
				if (!per.checkFlag(2)) {
					s += "You could teleport from the Sacred Clearing anytime at night to Elian.<br>";
					if (perJade.checkFlag(7)) s += "Jade says to reverse her name when using teleport to weaken her power.<br>";
				} else s += "I survived meeting Elian, this time!<br>";
				if (per.checkFlag(9)) s += 'Rachael is Elian!<br>';
				if (per.checkFlag(14)) {
					s += "Elian's true name is: Elian" + (per.checkFlag(15) ? 'Iscariot' : '') + (per.checkFlag(16) ? 'Agos' : '') + (per.checkFlag(17) ? 'Omi' : '') + (per.checkFlag(18) ? 'Sayla' : '...') + '<br>';
					s += showQuestF(true, per.checkFlag(18), "Elian's Challenges, I need defences!");
					s += showQuestF(true, per.checkFlag(15), "&nbsp;&nbsp;&nbsp;Kiss her");
					s += showQuestF(per.checkFlag(20), per.checkFlag(16), "&nbsp;&nbsp;&nbsp;Touch her");
					s += showQuestF(per.checkFlag(21), per.checkFlag(17), "&nbsp;&nbsp;&nbsp;Lick her");
					s += showQuestF(per.checkFlag(22), per.checkFlag(18), "&nbsp;&nbsp;&nbsp;Fuck her");
					s += showQuestF(per.checkFlag(26), per.isCharmedBy(), "Enter a contract with Elian");
					if (per.checkFlag(26)) s += "You could teleport from the Sacred Clearing anytime at night to Elian using her true name.<br>";
				}
			}
		}

		s += '<br></div>' +		
				'<span class="zoom-icon" style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>' +
				'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:calc(10vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(20vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(30vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(40vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes5\');return false" src="UI/schedule.png" width="99%" alt="Schedule" title="Schedule"></span>';

	} 
	
	else if (stype === "notes3") {
		// Magic Notes
		s += '<p style="font-size:medium;font-weight:bold;margin-bottom:2px">Magic:</p>';
		s += showQuest(4, "Find the Book");
		if (perYou.checkFlag(11)) s += "The book seems to glow red when I can learn a new magical training<br>";		
		if (checkPersonFlag("MrsGranger", 17)) s+= 'The Wild Ranges have long been a center of magical cults<br>';
		if (getPersonOther("Vampyre") >= 60) s += 'The Sacred Clearing is <b>dangerous</b> at night!<br>';
		if (perYou.checkFlag(10)) s += 'Use magic stones in the Wild Ranges to get mana<br>';
		if (getPersonOther("Tina") > 3) s += 'Tina can drain the mana powering spells<br>';
		if (checkPersonFlag("Tina", 2)) s += 'Witches bear a mark visible only to other witches, a small tattoo like mark<br>';
		if (whereItem(35) == -53) s += 'The Hidden Room is a place of power<br>';
		if (checkPlaceFlag("Park", 6)) s += "I saw strange symbol that frightened me<br>";
		if (isCharmedBy("Ghost")) s += "Ghosts can be a source of mana<br>";

		// Magic Experience
		sp = '';
		if (perYou.checkFlag(26)) sp += "I have fine control over the charm process<br>";
		if (perYou.checkFlag(17)) sp += "Expensive spells are 1 to 2 points cheaper<br>";
		if (perYou.checkFlag(18)) sp += "I can use Mana to block spells cast on me, I need at least 20 mana to do it<br>";
		if (perYou.checkFlag(19)) sp += "I can charm men as well as women<br>";
		if (perYou.checkFlag(20)) sp += "I get more mana from magic stones<br>";
		if (perYou.checkFlag(21)) sp += "I can use teleport to more places and I can carve hexagrams<br>";
		if (perYou.checkFlag(22)) sp += "The Wealth spell gives more money for me<br>";
		if (perYou.checkFlag(23)) sp += "I can charm spirits and ghosts<br>";
		if (perYou.checkFlag(27)) sp += "I know the tricks of deciphering spells<br>";
		if (perYou.checkFlag(28)) sp += "I can stay invisible for longer<br>";
		if (perYou.checkFlag(29)) sp += "I know <b>Hydromancy</b> and I can get visions of other places if I meditate on a pool of water and cast clairvoyance<br>";
		findPerson("Leanne");
		var bRitualReturn = per.checkFlag(8);
		if (bRitualReturn) sp += "I know the Ritual of Return<br>";
		s += addHeader("Magical Knowledge:", sp);
		
		sp = '';
		if (perYou.checkFlag(24)) sp += "I understand the basics of hypnosis<br>";		
		if (perYou.checkFlag(25)) sp += "I can magically augment hypnosis<br>";
		s += addHeader("Hypnotic Knowledge:", sp);

		s += '<br></div>' +		
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(10vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>' +
				'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:calc(20vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(30vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(40vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes5\');return false" src="UI/schedule.png" width="99%" alt="Schedule" title="Schedule"></span>';

	} 
	
	else if (stype === "notes4") {
		// General Notes
		s += '<p style="font-size:medium;font-weight:bold;margin-bottom:2px">General Notes:</p>';

		if (perBeasley.checkFlag(14)) s += "I Read Mr. Beasley's lecture on Carl Kurndorf<br>";
		if (perYou.isQuestStarted(1) && (isCharmedPath() || isGoodPath())) s += "I am " + perGates.getPersonName() + "'s apprentice!<br>";
		else if (isConspiracyPath()) s += perSarah.checkFlag(1) ? "Sarah Gates is helping my researches<br>" : "I have an anonymous friend helping my researches<br>";
		else if (isMurderPath()) {
			if (perGates.other == 600) s += perGates.getPersonName() + " is dead, killed by Davy\'s woman!<br>";
			else s += perGates.getPersonName() + " is dead!<br>";
		}
		
		s += addHeader("Places");
		if (gameState.bAllPlaces) s += "I know Glenvale very well, and know where almost every place is and how to get there.<br>";
		else s += 'I do not know Glenvale very well and often need directions on how to get places.<br>';
		if (checkPlaceFlag("Museum", 8)) s += "The Mayor has closed the museum.<br>";
		if (checkPersonFlag("Kristin", 9)) s += "Kristin has closed the bank.<br>";
		if (checkPlaceFlag("Library", 2))  s += "Ms. Titus has closed the library.<br>";
		if (isPlaceKnown("AvernusClub")) s += 'The Avernus Club is open late night near the shopping center.<br>';
		if (checkPlaceFlag("Hotel", 11)) s += "I can call people to go for a swim with me in the Hotel Pool.<br>";
		
		sp = '';
		if (perSarah.other > 0) sp += "Sarah Gates is now at the Mansion<br>";
		findPerson("MsTitus");
		if (per.isFreeSlave()) sp += "Ms. Titus is my willing slave<br>";
		s += addHeader("People", sp);
		
		s += addHeader("Transport");
		if (perYou.isQuestComplete(7) && isMurderPath()) s += "Sofia, your personal chauffeur comes to your every morning. She can give you a lift anywhere around town. You can also call her anytime if you want her to come pick you up.<br>";
		else if (checkPersonFlag("Hannah", 17)) s += "Hannah can give you a ride anywhere you need, just visit her " + getShopStore() + " or apartment.<br>";
		else s += "Walking or the occasional taxi are the main way I get around.<br>";
		
		sp = '';
		if (perYou.checkFlag(38)) sp += "I have done almost everything I can in Glenvale. I could <b>end</b> my adventure for now on a <b>Sunday night at home</b>, talk to Tess or Tracy.<br>";
		s += addHeader("Other", sp);

		s += '<br></div>' +		
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(10vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(20vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>' +
				'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:calc(30vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(40vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes5\');return false" src="UI/schedule.png" width="99%" alt="Schedule" title="Schedule"></span>';
				
	} else if (stype === "notes5") {
		// Schedules
		s += '<p style="font-size:medium;font-weight:bold;margin-bottom:2px">Schedules:</p>';

		sp = '';
		if (isPlaceKnown("AvernusClub")) sp += 'The Avernus Club is open late night near the shopping center.<br>';
		s += addHeader("Places", sp);
		
		sp = '';
		findPerson("Kylie");
		if (per.checkFlag(1)) sp += "Kylie plays sports weekdays 12-2pm.";
		if (per.checkFlag(3)) sp += " You can call her in the morning on Cherise Rd to meet.<br>";
		else if (sp !== "") sp += "<br>";

		if (checkPersonFlag("Bambi", 7)) {
			sp += "Bambi is your night guard in the dungeon";
			findPerson("Anita");
			if (per.place == 161) sp += " and Anita is your day guard";
			sp += '<br>';
		}
		if (!isMurderPath() && isCharmedBy("Sofia")) sp += "Angelica is busy working in the mornings from 8am but is free after midday.<br>";
		findPerson("Alison");
		if (per.place != 0) {
			sp += "Alison works at the restaurant on weekends";
			if (per.isCharmedBy()) sp += " and works out at the Gym afternoons on Tuesdays abd Thursdays";
			sp += '<br>';
		}
		s += addHeader("People", sp);
		
		s += '<br></div>' +		
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:' + (ha + 4) + 'px;left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes1\');return false" src="UI/profile.png" width="99%" alt="Personal" title="Personal"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(10vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes2\');return false" src="UI/todo.png" width="99%" alt="ToDo" title="ToDo"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(20vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes3\');return false" src="UI/themes/theme0/mana.png" width="99%" alt="Magic" title="Magic"></span>' +
				'<span class="zoom-icon" style="width:' + (wtab - 1) + '%;position:absolute;top:calc(30vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes4\');return false" src="UI/notes.png" width="99%" alt="General" title="General"></span>' +
				'<span style="background-color:lightblue;width:' + (wtab - 1) + '%;position:absolute;top:calc(40vh + ' + (ha + 4) + 'px);left:5%"><img draggable="false" style="cursor:pointer;" onclick="usePhone(\'notes5\');return false" src="UI/schedule.png" width="99%" alt="Schedule" title="Schedule"></span>';
	}
	
	perYou.extra[1] = vis;
	return s;
}