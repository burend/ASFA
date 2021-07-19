/****************************************************************
	Nurse Keana, the Ghost
 ****************************************************************/

// Initialise

function getSoulBoundCrystal(no) {
	if (no == 52 && perKurndorf.getQuestRitual() >= 200) return "Soul Bound Crystal";
	findPerson("Ghost");
	if (no == 64 && per.place == -64) return "Soul Bound Crystal Ring";
	return "";
}	

function initialiseGhost()
{
	// Ghost/Nurse Keana
	addPerson("Ghost", 443, "NurseGhost", '', false);
	per.health = -1;
	per.isDead = function() { return true; };		// Only needed for old saves

	per.passTimeDay = function() {
		this.setFlag(19, false);
		this.setFlag(20, false);
		this.setFlag(1, false);
		this.setFlag(7, false);
		if (this.checkFlag(13) && !this.checkFlag(14) && isCharmedBy("Desiree")) {
			movePerson("Desiree", 444);
			this.setFlag(14);
		}
		// If she is following send her back to her default place
		if (this.place == -1) {
			this.place = this.checkFlag(16) ? 408 : 443;
			return "<p>Keana fades from sight as dawn breaks.</p>";
		}
		return '';
	};

	// Where is she. In the daytime she is not available, anywhere
	per.whereNow = function()
	{
		if (this.place == -64 || this.place == -1) return Place;
		if (isDay()) return 0;
		return this.place;
	};

	// Show the left image for the current location
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 443 && this.isCharmedBy() && this.isHere() && sType === '' && this.place != -1) {
			if (!this.checkFlag(7) && !this.checkFlag(8)) return this.showPerson("ghostnurse7.jpg", '', '', '', '', false, "string");
			else return this.showPerson("ghostnurse3.jpg", '', '', '', '', false, "string");
		}
		if (Place == 408 && this.isCharmedBy() && this.isHere() && wherePerson("Miku") != 408 && sType === '' && this.place != -1) {
			if (!this.checkFlag(7) && !this.checkFlag(8)) return this.showPerson("ghostnurse7.jpg", '', '', '', '', false, "string");
			else return this.showPerson("ghostnurse3.jpg", '', '', '', '', false, "string");
		}
		return '';
	};

	per.isPlaceImageRight = function()
	{
		return this.whereNow() == -1 || (this.isHere() && wherePerson("Miku") == 408 && Place == 408);
	};

	per.showPlaceImageRight = function(md)
	{
		if (this.whereNow() == -1) this.showPersonFace('', '', '', 'Keana, the ghost', md);
		else this.showPerson("ghostnurse3.jpg");
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;
		
		if (Place == 408 && this.isHere() && !this.checkFlag(17) && perYou.FindItem(64) > 0) {
			this.setFlag(17);
			showPopupWindow("Keana and the Ring",
				"<img src='Images/Items/crystalring-glow.jpg' style='width:30%;float:right;margin-left:5px' alt='Ring'>" +
				'You feel something odd, the crystal ring on your finger feels cold and when you hold it up to examine it, it gets colder. You realise it seems to be reacting to the presence of Keana.<br><br>' +
				'Does this mean it is some sort of ghost detector? Keana looks at at are reaches out to touch it. As she does her fingers distort, but she dos not seem in pain or otherwise affected.<br><br>' +
				'You do not know what this means, you could try manipulating the ring further',
				'dispPlace()'
			);
			return true;			
		}

		if (this.place == -1 && Place == 408) {
			this.place = 408;
			if (!this.checkFlag(16)) {
				this.checkFlag(16);
				showPopupWindow("Keana in the Attic",
					"<img src='Images/" + this.getImg('ghostnurse4.jpg') + "' style='width:34%;float:right;margin-left:5px' alt='Keana'>" +
					'Keana quickly walks from behind you and walk into the storage room and takes a seat on a box. She looks content and you hear her voice faintly,<br><br>' +
					'"...here...your home...let me stay here..."<br><br>' +
					'Well it would seem she likes it here, so you wait with her until dawn to make sure this is sealed as her new \'haunt\'',
					'passTimeDay();dispPlace()'
				);
			} else {
				showPopupWindow("Keana in the Attic",
					"<img src='Images/" + this.getImg('ghostnurse4.jpg') + "' style='width:34%;float:right;margin-left:5px' alt='Keana'>" +
					'Keana returns to her place, the storage room, looking content, you hear her faint voice,<br><br>' +
					'"...home..."<br><br>' +
					'Just to be sure you spend the rest of the night with her, to make sure this is sealed as her \'haunt\'',
					'passTimeDay();dispPlace()'
				);
			}
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (Place == 282 && sType == "clubdancing" && !this.checkFlag(19)) {
			if (this.place != -1 && this.place != -64) return false;
			// Keana is here, either following or in the Crystal Ring and you are waiting on someone elses dance
			if (sWho == "nursesandra" || sWho == "miku") {
				md = WritePlaceHeader();
				this.setFlag(19);
				var perNext = findPerson(sWho);
				this.showPersonRandom("!poledance", 2);
				addPlaceTitle(md, "Keana's Dance");
				md.write(
					'<p>You are sitting waiting for ' + perNext.getPersonName() + '\'s dance and as the last dancer is leaving the stage you see a figure forming. It is Keana and she posing with the stripper-pole, she must want to dance with her friend ' + perNext.getPersonName() + '!</p>' +
					'<p>You look around but no-one else seems to be noticing Keana, somehow she is just performing for you. She is completely naked and dances around the pole with surprising skill and a playful attitude.</p>' +
					'<p>She only dances briefly, tantalising you before ' + perNext.getPersonName() + ' starts her performance.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, perNext.getPersonName() + ' now takes the stage', Place, 'type=clubdancing&who=' + sWho);
				WritePlaceFooter(md);
				return true;
			}
			return false;
		}
		
		if (Place == 269 && gameState.bLastSex && !this.checkFlag(20)) {
			if (this.place != -1 && this.place != -64) return false;
			// Keana is here, either following or in the Crystal Ring and you just had sex with someone at the pool
			md = WritePlaceHeader();
			this.setFlag(20);
			var perNext = findPerson(sWho);
			this.showPerson("pool.jpg");
			addPlaceTitle(md, "Keana\'s Bikini");
			md.write(
				'<p>You are just resting after your last encounter and a vapour starts to form, is it a fog from the heated pool? Then you realise that it is not as you can see Keana forming from the vapours.</p>' +
				'<p>She must have been aroused by your last visitor, and you see she seems to be wearing a white bikini, then again what other colour would a ghost wear? She poses for you sexily but she starts to fade back into vapour, so this visit was more a tease than anything else...</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, 'she fades away', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 40) {
			// Shower scene
			if (sType == "showerghost") {
				md = WritePlaceHeader();
				this.showPerson("shower1.jpg");
				addPlaceTitle(md, "A Haunted Shower!");
				md.write(
					'<p>You start running the shower while you get undressed so it is running hot before you enter. A bit of steam forms in the stall and fogs the shower screen a bit</p>' +
					'<p>You move to enter the show and suddenly you see a ghostly transparent figure in the shower leaning against the glass. It has to be Keana though she difficult to see clearly. Despite the realisation you start in surprise and you hear her soft laughter. You tell her,</p>' +
					'<p>“Very funny Keana, now let me have my shower” and you have your shower.</p>' +
					'<p>Every so often during the shower you feel a faint caress and see the impression of a figure in the water and steam. Keana is still with you, making for a strange but pleasant experience.</p>'
				);
				startQuestions();
				addLinkToPlace(md, "finish up and get dressed", Place);
				WritePlaceFooter(md);
				return true;			
			}
		}
		
		if (Place == 141 && this.place == -1 && !checkPlaceFlag("SacredClearing", 2) && findPerson("Vampyre").isMonstersInSacredClearing()) {

			// Guarding against monsters
			md = WritePlaceHeaderNIP(true, '', 'black');
			showPopupWindow("<i>Too Thin</i> Sacred Clearing",
				"<img src='Images/" + this.getImg('ghostnurse10.jpg') + "' style='float:right;width:35%;margin-left:5px' alt='Ghost'>" +
				"You see movement in the darkness, and you feel a hand on your shoulder. Startled you see Keana looking very bright and solid. She steps in front of you wrapped in ectoplasm holding out her hands warding whatever it is away.<br><br>" +
				"The shape in the darkness retreats and vanishes into the darkness. Keana steps back to your side and rests her hand on your shoulder."
			);
			setPlaceFlag("SacredClearing", 2);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ghostclairvoyance1" && Place == 141) {
			if (!this.checkFlag(1)) {
				if (this.extra[0] === 0) this.extra[0] = Math.floor(Math.random() * 3) + 1;
				else {
					this.extra[0]++;
					if (this.extra[0] > 5) this.extra[0] = 1;
				}
			}

			md = WritePlaceHeaderNIP(false, this.extra[0] != 3 ? "td-left-large" : "");

			// See the ghost
			AddImage("stones4" + String.fromCharCode(this.extra[0] + 96) + ".jpg");
			addPlaceTitle(md, "A Presence");
			this.setFlag(1);		// Limit one vision per night
			md.write('<p>You cast the spell and ');
			switch(this.extra[0]) {
				case 1: md.write('see an ethereal shape moving near one of the stones, as she(?) passes behind the stone, the apparition does not emerge from the other side.....</p>'); break;
				case 2: md.write('see an ethereal shape standing near the stones, she(?) just stands there, not moving in any way, but you feel they are staring at you....</p>'); break;
				case 3: md.write('see in the trees an ethereal shape slowly moving. The figure is heavily shrouded and you cannot make out anything about the ghostly figure.....</p>'); break;
				case 4: md.write('see in the trees an ethereal shape slowly moving. The figure is indistinct, a person but you can make out little more.....</p>'); break;
				case 5: md.write('some of the swirling mist seems to form into a vaguely human form or at least you hope human.....</p>'); break;
			}

			startQuestions();
			addLinkToPlace(md, 'explore the sacred clearing more', 141);
			addLinkToPlace(md, 'go to ' + perGates.getPersonNameShort() + '\'s estate', 16);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "ghostcharmsex" && Place == 141) {
			md = WritePlaceHeaderNIP(false, !perYou.isMaleSex() && isExplicit() ? "td-left-large" : "");

			// Charm the ghost
			if (isExplicit()) this.showPersonRandomAnon("Explicit/" + (perYou.isMaleSex() ? "ghost5b" : "ghost5g"), 3);
			else this.showPersonAnon("ghost5.jpg");
			addPlaceTitle(md, "Charming Ghost");
			AddMana(15);
			md.write('<p>You cast the unlife enspelled spell and direct it at the ethereal shape ');
			switch(this.extra[0]) {
				case 1: md.write('and you have sex with the ghost.</p>'); break;
				case 2: md.write('and you have sex with the ghost.</p>'); break;
				case 3: md.write('and you have sex with the ghost.</p>'); break;
				case 4: md.write('and you have sex with the ghost.</p>'); break;
				case 5: md.write('and you have sex with the ghost.</p>'); break;
			}
			md.write('<p>As you step away, the figure vanishes, and as it does you feel a surge of mana as the spell dissolves but there is more mana than you put into the spell!</p>');

			//**************************************************************
			startQuestions();
			addLinkToPlace(md, 'explore the sacred clearing more', 141);
			addLinkToPlace(md, 'go to ' + perGates.getPersonNameShort() + '\'s estate', 16);
			WritePlaceFooter(md);
			return true;
		}
		
		if ((Place == 408 || Place == 443) && this.isHere() && sType == "ghostfuck") {

			md = WritePlaceHeader();
			if (!this.checkFlag(8)) this.showPerson("ghostnurse8.jpg");
			else if (perYou.isMaleSex() && isExplicit()) this.showPersonRandomX("ghostnurse6b", 2);
			else this.showPerson("ghostnurse6.jpg");

			addPlaceTitle(md, "Communing with the dead");

			this.setFlag(7);
			AddMana(5);
			if (this.checkFlag(8)) {
				// Normal version
				md.write(
					'<p>As you look at Keana you see she is looking more and more solid, and you reach out to test and you rest your hand on her shoulder, it feels like flesh and blood, a little cool but just like any girl.</p>' +
					'<p>When you touch her, Keana makes an inarticulate noise, and she reaches up and takes your hand and puts it to her lips and kisses it. A strangely cool but passionate action, her cool touch and lips, but done with passion and joy.</p>' +
					'<p>You look her in the eyes and she looks at you with arousal in her expression. She kisses you and as she does you feel her move your hand to one of her breasts. There is a swirling of ectoplasm as the veils surround you both.</p>' +
					'<p>You make love to her again in a strangely passionate but almost silent way, the only noises those of your own passion and faint sighs of Keana. You will never again think of her as being \'cold\' or \'lifeless\', she is a wild and passionate lover who just happens to be a ghost.</p>'
				);
				if (!this.checkFlag(9)) {
					md.write('<p>You are struck that this old basement is not really a pleasant place to \'commune\' with Keana, it would be nicer if she could meet you somewhere else. You try to talk to her about following you to another place, but she seems to not understand, but when you finally explain, she shakes her head. It may be that ghosts are really limited to haunting a particular place, but then again you are no expert in these things.</p>');
					this.setFlag(9);
				}
			} else {
				// Nurse version
				md.write(
					'<p>Keana is dressed in her old nurses uniform and the way she is posing for you and how she looks, you feel she is doing this as a gift for you.</p>' +
					'<p>Then again the term dressed is generous, she was exposing her breasts for you after all. Your ghostly lover does a sensual if somewhat eerie dance as she strips her uniform, and at the end she is kneeling before you, ready for you.</p>' +
					'<p>You reach out, unsure as she is still partly transparent, but you solidly caress her ass. You hear her sigh faintly and then a soft voice <i>"...please..."</i>.</p>' +
					'<p>You make love to her again, but it is so strange. She is transparent, but full of flesh and passion, cool but hot with arousal.</p>' +
					'<p>After you see she has resumed her naked appearance, draped in ectoplasmic veils. Equally transparent as before but somehow \'less\' present.</p>'
				);
			}
			this.setFlag(8);
			startQuestions(checkPlaceFlag("Hospital", 4) ? undefined : 'There is no physical way out of here...');
			if (Place == 408) addLinkToPlace(md, 'return to the attic', 408);
			else if (checkPlaceFlag("Hospital", 4)) addLinkToPlace(md, 'return to the main part of the basement', 442);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 443 && (sType == "ghostcharm" || (this.isHere() && this.place != -1))) {
			// Hospital basement
			var perNS = findPerson("NurseSandra");
			var frm = getQueryParam("from");
			if (frm == "sandra" && sType == "ghostcharm") {
				sType = "charm1";
				this.place = 443;
			}

			if (sType.substr(0, 5) == "charm") {
				// Charm spell
				md = WritePlaceHeaderNIP();
				var idx = parseInt(sType.charAt(5), 10) + 3;
				if (idx == 4) this.showPersonRorX("ghostnurse4.jpg");
				else this.showPerson("ghostnurse" + idx + ".jpg");
				addPlaceTitle(md, "Charming a Ghost");

				if (sType == "charm1") {
					// and now charmed
					this.charmThem(4);
					this.setFlag(7);
					AddMana(11);

					md.write(
						'<p>You say "Don\'t worry Sandra" and cast the Unlife Enspelled incantation. Immediately the ghost of Keana stops and turns to look at you. You cannot help but feel a chill as a ghost stares at you, the first time she has looked at you directly..</p>' +
						'<p>As she stares at you, you feel a surge of mana as all the mana you used in the spell returns to you, maybe a little more. You fear this means the spell has failed but she is looking at you. As a test you tell her to sit down.</p>' +
						'<p>With a fluid gracefulness Keana the ghost sits down in a chair, wrapped in ectoplasm but otherwise naked. She seems a little more solid than before.</p>' +
						'<p>You remember something you had read while studying the Book about the spell, it said that ghosts and ectoplasm are a manifestation of mana, and in passing talked about using ghosts. You assumed as some sort of servant or information source, but maybe it meant as a source!</p>' +
						'<p>You try to test your control more...</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"Dance Keana"', 443, "type=charm2");

				} else if (sType == "charm2") {

					md.write(
						'<p>The ghost seems to solidify even more, just her limbs are slightly trans Old Japanese ghost stories come to mind, where you cannot see the feet of a ghost. As you ponder this Keana starts to dance, weaving her ectoplasmic veil in some sort of arabian inspired dance, but since she is completely naked already it is only a vague inspiration.</p>' +
						'<p>Sandra whispers "Boss, Kea was always a great dancer. Ummm Boss, please be kind to her"</p>' +
						'<p>You hear a faint noise, like a faint wind but it is Keana\'s voice, "Sandy...nice..' + perYou.getMaster() + '"</p>'
					);

					startQuestions();
					addLinkToPlaceO(md, 'she is yours', 443, "type=charm3");

				} else if (sType == "charm3") {

					md.write(
						'<p>You know Keana is yours, or at least the ghost of Keana if there is a difference or that it matters. As you are looking at her you see she is looking more and more solid, and you reach out to test and you rest your hand on her shoulder, it feels like flesh and blood, a little cool but just like any girl.</p>' +
						'<p>When you touch her, Keana makes an inarticulate noise, and she reaches up and takes your hand and puts it to her lips and kisses it. A strangely cool but passionate action, her cool touch and lips, but done with passion and joy.</p>' +
						'<p>You look her in the eyes and she looks at you with arousal in her expression. She kisses you and as she does you feel her move your hand to one of her breasts. There is a swirling of ectoplasm as the veils surround you both, and dimly you hear Sandra "No fair, lemme see".</p>' +
						'<p>You make love to her in a strangely passionate but almost silent way, the only noises those of your own passion and faint sighs of Keana. You will never again think of her as being \'cold\' or \'lifeless\', she is a wild and passionate lover who just happens to be a ghost.</p>' +
						'<p>Later the ectoplasm clears, and you see Sandra with tears in the corner of her eyes. You ask what is troubling her, and she replies, "Nothin\' Boss, I am just happy Keana is with us, thank you Boss!"</p>'
					);

					startQuestions();
					addLinkToPlaceO(md, "look around the basement", 443, '', perNS.addPersonFace() + '<b>Sandra</b><br><br>&quot;Boss. I should go back to my ward&quot;');

				}

				AddPeopleColumnMed(md);
				perNS.showPerson("sandra10.jpg");

				WritePlaceFooter(md);
				return true;

			} else if (sType == "seeghost") {
				md = WritePlaceHeader();
				this.showPerson("ghostnurse1.jpg", "height:max");
				addPlaceTitle(md, "Haunted Basement");

				md.write(
					'<p>You cast the clairvoyance spell, and it is almost like your eyes focus and the mist clears and becomes the figure of a pale woman standing in the corner. She is draped in a white ectoplasmic veil but is otherwise completely naked. She slowly moves around, completely unaware of your presence, she is slowly moving, she might be looking for something.</p>'
				);
				if (!this.checkFlag(2)) {
					this.setFlag(2);
					md.write(
						'<p>You have no idea what she is looking for, you will have to see if you can research it or speak to her friends or relatives.</p>'
					);
				}
				startQuestions();
				addLinkToPlaceO(md, 'the spell ends and the ghost disappears...', 443);
				if (checkPlaceFlag("Hospital", 4)) addLinkToPlace(md, 'return to the main part of the basement', 442);
				WritePlaceFooter(md);
				return true;

			} else if (sType == "ghostcharm") {
				md = WritePlaceHeader();
				this.showPerson("ghostnurse2.jpg", "height:max");
				addPlaceTitle(md, "A Charming Ghost");

				var cost = perYou.checkFlag(17) ? 9 : 10;
				AddMana(cost);
				md.write(
					'<p>You cast the spell and the ghost stops what she is doing, and looks almost ecstatic for a moment, the ectoplasm swirling around her. It is like she poses for you, but the moment passes and she continues her slow wander around the room, ignoring you again. You feel a surge as the mana returns back to you.</p>' +
					'<p>During this she never looked at you once.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'the clairvoyance spell ends and the ghost disappears...', 443);
				if (checkPlaceFlag("Hospital", 4)) addLinkToPlace(md, 'return to the main part of the basement', 442);
				WritePlaceFooter(md);
				return true;

			} else if (sType == "sandra") {
				md = WritePlaceHeader();
				this.place = 1000;		// Gone!
				this.setFlag(6);
				this.showPerson("ghostnurse2.jpg");
				addPlaceTitle(md, "Sandra and the Ghost");

				md.write(
					'<p>You ask Sandra to come with you to the basement,</p>' +
					'<p>"Sure thing Boss, I need to make it up with Kea. Gimme a bit, I need to change out of my uniform, the basement is dirty!"</p>' +
					'<p>You quickly go with her upstairs to change and then down to the basement. Sandra unlocks the door to the old basement, and you both are there!</p>' +
					'<p>You start to recite the Clairvoyance spell, but before you do, the ghost eerily appears, wrapped still in ectoplasm and completely naked. She looks directly at Sandra, who seems very nervous as she speaks,</p>' +
					'<p>"Kea, I\'m..I\'m sorry I took your ring, I just wanted a keepsake. I missed you so much! Here have it back!"</p>' +
					'<p>The ghost smiles faintly, and shakes her head and the blows a kiss at Sandra, who almost cries, "Don\'t go Kea"</p>' +
					'<p>Despite her plea the ghost of Keana looks happy and she starts to fade away....</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'well that is solved', 443, '', perNS.addPersonFace() + '<b>Sandra</b><br><br>&quot;Sorry Boss...I..I will go back to my ward&quot;');
				if (checkPlaceFlag("Hospital", 4)) addLinkToPlace(md, 'return to the main part of the basement', 442);
				AddPeopleColumnMed(md);
				perNS.showPerson("sandra10.jpg");

				WritePlaceFooter(md);
				return true;
			}
		}

		return false;
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 443 && this.isHere() && this.isCharmedBy() && this.place != -1) {

			if (!this.checkFlag(7) && !this.checkFlag(8)) {
				md.write('<p>Keana is waiting for you, she is not naked as before, but she is wearing her old nurses uniform. She is quite transparent though.</p>');
			} else {
				md.write('<p>Keana is eerily waiting here for you, she looks ');
				if (!this.checkFlag(7)) md.write('almost solid, except for her limbs');	// Have not 'met' her today
				else md.write('a little faint and transparent');	// Have 'met' her today
				md.write('.</p>');
			}
		} else if (Place == 408 && this.place == 408) {
			if (isDay()) md.write('<p>Keana rests during the day, there is no trace of her to be seen.</p>');
			else {
				if (getPersonOther('Miku') == -100) md.write('<p>Living with Miku seems to have had an effect on Keana, the ghost seems more... lively, so to say, and is often tangible even before you enter the room.</p>');
				else md.write('<p>Keana\'s transparent form slowly phases into sight as you enter the room, and she silently greets you with a graceful bow.</p>');
			}
		}
	};

	per.showPersonChat = function(bGeneral, md)
	{
		switch(Place) {

		case 17:
			if (this.place == 443 && this.checkFlag(9) && !this.checkAnyFlags(10, 12)) addQuestionC(md, "ask about ghosts", "SirRonald", 3000);
			break;

		case 192:
			if (this.place == 443 && this.checkFlag(9) && !this.checkAnyFlags(10, 12)) addQuestionC(md, "ask about ghosts", "Sarah", 3000);
			break;

		case 145:
			if (this.place == 443 && wherePerson("MsJones") == 145 && isCharmedBy("MsJones")) {
				// Ask about moving the ghost
				if (this.checkFlag(9) && !this.checkAnyFlags(10, 12)) addQuestionC(md, "ask about ghosts", "MsJones", 3000);
			}
			break;

		case 332:
			if (this.place == 443 && this.checkFlag(12) && !this.checkFlag(13)) addQuestionC(md, "ask about ghosts", "Desiree", 3000);
			break;

		case 384:
			if (this.place == 443) {
				// Ask about moving the ghost
				if (this.checkFlag(9)) {
					if (!this.checkAnyFlags(10, 12)) addQuestionC(md, "ask Daria about ghosts", "Daria", 3000);
					else if (this.checkFlag(12) && !this.checkFlag(13) && wherePerson("Desiree") == 384 && !checkPersonFlag("Desiree", 1)) addQuestionC(md, "ask Desiree about ghosts", "Desiree", 3000);
				}
			}
			break;

		case 408:
		case 443:
			if (this.isHere() && this.isCharmedBy() && sType === '' && this.place != -1) {
				if (!this.checkFlag(7)) addLinkToPlaceO(md, 'commune with Keana', Place, 'type=ghostfuck');
				if (this.checkFlag(15) || (this.checkAnyFlags(10, 12) && Place == 443)) {
					if (!this.checkFlag(7)) {
						// Ok she is solid enough
						addPopupLinkC(md, 'take her by the hand', "Leading Keana Away",
							"<img src='Images/" + this.getImg('ghostnurse9.jpg') + "' style='width:30%;float:right;margin-left:5px' alt='Ghost'>" +
							'You reach out to take Keana\'s hand and she steps up and holds your hands, as if it is a prelude to intimacy.<br><br>' +
							(Place == 443 ? "You firmly lead her out of the old basement, as you approach the door to the main area it just opens as if it was an automatic door. You hear a faint sign from Keana like a very faint laugh.<br><br>" : "") +
							'As you step into the more brightly lit area you feel her other hand rest on your shoulder and you lose grasp of the hand you were holding. Looking around she is standing very closely behind you, looking a little nervous. She is standing close enough that she is almost leaning on your back, almost embracing you.<br><br>' +
							'The question is now where will you take her?' + (Place == 408 ? ' First you lead her downstairs to get her away from her current haunt. You should be careful to only return to the attic with her unless you wish to rebound her to it.' : ''),
							false, "movePerson('Ghost', -1);dispPlace(" + (Place == 408 ? 45 : '') + ");"
						);
					} else {
						// She is too faint
						addPopupLinkC(md, 'take her by the hand', "Trying to Lead Keana Away",
							"<img src='Images/" + this.getImg('ghostnurse3.jpg') + "' style='width:35%;float:right;margin-left:5px' alt='Ghost'>" +
							"You reach out to take Keana\'s hand but she is very faint and your hand just passes though her. She seems only vaguely aware of you and just stands there waiting.<br><br>" +
							'You will have to return another time when you have not communed with her and drained her physically and magically',
							false
						);
					}
				}
			}
			break;
		}

	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the unlife enspelled spell
		if (no == 64 && cmd == 2) {
			if (!this.checkFlag(17)) return "";
			if (isDay()) {
				// Nothing happens in the daytime
				addComments("Nothing happens, but then again it is the daytime...");
				return "handled";
			}
			if (this.place == -64) {
				// In the ring
				addComments('There is a sudden flash and Keana is standing in front of you');
				if (Place != 408) addComments(' and she whispers "...home...attic..." and vanishes from your sight.');
				addComments('</p><p>The ring returns to it\'s original appearance');
				this.place = 408;
				getBaseItemObj(64).image = 'crystalring.jpg';
				return "refresh";
			}
			if (this.isHere()) {
				if (!this.checkFlag(18)) {
					addComments(
						'You hold the ring out to Keana and focus on it as she again reaches out to touch it. Suddenly there is a flash of light and she is gone. You are worried, have you harmed her, or killed her?</p>' +
						'<p>The ring is gently glowing and you touch it with your other hand. Immediately you feel the presence of Keana, and hear a soft whisper "...nice...." and feel comforted, she seems fine.</p>' +
						'<p>You concentrate again and she reappears, smiling. You try again and there is the flash and she is gone, once more she is in the ring.'
					);
					if (isSpellKnown("Transform")) addComments('</p><p>You wonder does this now count as a soul-bound crystal? If so then possibly Keana will help to power it as she is a source of mana, though only once per day.');
				} else addComments('You hold the ring out to Keana and focus on it as she again reaches out to touch it. Suddenly there is a flash of light and she is gone, bound into the ring again. The ring is gently glowing and you feel the presence of Keana.');
				this.place = -64;
				getBaseItemObj(64).image = 'crystalring-glow.jpg';
				return "refresh";
			}
		}	

		// Casting the clairvoyance
		if (no == 15 && cmd == 2) {
			// At the Sacrd Clearning?
			if (Place == 141 && !isDay() && getPersonOther("Vampyre") >= 0) {
				if (!this.checkFlag(1)) {
					dispPlace(141,'type=ghostclairvoyance1');
					return "nofooter";
				} else {
					addComments('After your last encounter, nothing more is revealed, at least for this night.');
					return "handled";
				}
			}
			if (Place == 443 && getPersonOther("Vampyre") >= 0)
			{
				if (!checkPlaceFlag("Hospital", 2)) {
					addComments('Why would you want to? There is nothing here in this abandoned place');
					return "handled";
				} else if (isDay()) {
					addComments('The spell reveals nothing during the daytime');
					return "handled";
				} else if (wherePerson("Ghost") == 443 && !isCharmedBy("Ghost")) {
					dispPlace(443, 'type=seeghost');
					return "nofooter";
				}
			}
		}
		
		// Casting the unlife enspelled spell
		if (no == 10 && cmd == 2) {

			if (Place == 141 && !isDay()) {
				if (sType == "ghostclairvoyance1") {
					if (perYou.checkFlag(23)) {
						CastUnlifeEnspelledSpell(141, 'type=ghostcharmsex');
						return "handled";
					} else {
						addComments('<p>You are not skilled enough to affect spirits, the spell has no effect.</p>');
						return "handled";
					}
				}
			}
			else if (Place == 443) {
				if (sType == "seeghost" || sType == "sandra") {
					if (perYou.checkFlag(23)) {
						CastUnlifeEnspelledSpell(443, 'type=ghostcharm&from=' + sType);
						return "handled";
					} else {
						addComments('<p>You are not skilled enough to affect spirits, the spell has no effect.</p>');
						return "handled";
					}
				}
			}
		}

		return "";		// do nothing
	};


}
