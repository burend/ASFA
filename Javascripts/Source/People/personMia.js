/**********************************************
Mia
Bambi's mother
***********************************************/

// Responses
function RepliesMia(nR)
{
	var bCharm = per.isCharmedBy();
	var myLord = per.getYourNameFor();

	if (nR == 1000)
	{
		bChatLeft = false;
		per.setFlag(5);
		setPersonFlag("Bambi", 5);
		addComments('"We have a lot here that is aged to perfection", she smiles as she adjusts her top, exposing her breasts a little more. "But the wine is limited to only a few truly fine vintages. We have a wine rack in the cellar but before I arrived someone lost the key to the rack and they have not yet got in a locksmith to sort it out. The person was communing with nature in Glenvale Park near the Witch Stones and lost it!"');
	}
	else if (nR == 6010)
	{
		moveDavyToHotel2();

		bChatLeft = false;
		addComments('"Davy Robbins?  An odd young man checked in some time ago, I think that was his name", she answers and then smiles, "Not sure the name of his lady friend though, but I sent some drinks to their room not long ago, Room 101."</p><p>She hesitates, "Hmm, I am sure Bambi said something about not giving out customers details, so what!"</p>');
	}
	else if (nR == 10801)
	{
		bChatLeft = false;
		if (!bCharm) {
			//NORMAL
			if (!this.checkFlag(1)) {
				addComments('<img src="Images/spill1.jpg" width="20%" style="float:left;margin-right:4px">"Sure have one on the house, she says with a smile. She passes the drink over to you and as you reach out you knock it over, spilling the drink, some of it on Mia\'s sleeve.</p><p>She looks at her sleeve, "I\'ll have to go and wash up, give me a couple of minutes". She steps in to back and returns a few minutes later and comments "Just as well it was only the sleeve, I might of had to take a shower if it was worse"</p><p>You consider you could &rsquo;accidentally&rsquo; splash her with a drink to get her somewhere private, you doubt you could do this more than <b>once</b>');
				this.setFlag(1);
			} else addComments('"Sure thing, have one on the house" she says as she whips up your scotch.  You can\'t keep down more than a sip.  Why do people <i>drink</i> these?');
		} else {
			// CHARMED
			if (isBritish()) addComments('"Sure thing" she says as she whips up your scotch.  "Anything else, ' + myLord + '?" She whispers as she hands you the drink.  You can\'t keep down more than a sip.  Why do people <i>drink</i> these?');
			else addComments('"Sure, you are quite young looking aren\'t you" She says loud enough to keep up appearances as she whips up your scotch.  "Anything else, ' + myLord + '?" She whispers as she hands you the drink.  You can\'t keep down more than a sip.  Why do people <i>drink</i> these?');
		}
	}
	else if (nR == 10803)
	{
		bChatLeft = false;
		if (bCharm) {
			// Charmed
			addComments('"The courts are this way ' + myLord + '" She leads you to the access door and gives you a small keycard to access the private courts');
			setPlaceKnown("TennisCourts");
		} else {
			// Normal
			addComments('"The courts are available to paying guests of the Hotel and select other people" and that seems to not include you.');
		}
	}
	return true;
}


// Initialise

function initialiseMia()
{
	addPerson("Mia", 0, "Mia", 'Natural', false);
	per.Replies = RepliesMia;

	per.getYourNameFor = function() { return perYou.getLord(); };

	per.getPersonAddress = function() { return isPlaceKnown("MiasApartment") ? 'Apartment 12, 42 Celeste Rd' : ''; };

	per.whereNow = function()
	{
		if (this.place == 124 && this.checkFlag(7)) {
			if (sType.indexOf("miagym") != -1) return 435;
			return !isDay() ? 124 : 458;
		}
		return this.place;
	};

	per.showEventPopup = function()
	{
		if (sType == "miatransformagenatural") {
			CastTransform(1);
			this.dress = "Younger";	
			showPopupWindow("Rejunenated!",
				this.addPersonString("mia-facec.jpg", "height:max%", "right") +
				'Mia\'s appearance shifts but it is only subtle, and after a minute you realise she is looking younger, like you have seen in old family photos. Nothing else is changed but she looks 10 maybe 20 years younger!</p>' +
				'<p>You ask how she is feeling and she replies she is feeling fit and energetic!',
				'dispPlace()'
			);
			return true;
		}	
		if (sType == "miatransformageyounger") {
			CastTransform(1);
			this.dress = "Natural";
			showPopupWindow("Restored!",
				this.addPersonString("mia-facec.jpg", "height:max%", "right") +
				'Mia\'s appearance shifts but it is only subtle, and after a minute you realise she is looking older, returning back to how she was before you cast the transform spell on her before, back to her natural age!</p>' +
				'<p>You ask how she is feeling and she replies she is feeling fine, maybe a little tired',
				'dispPlace()'
			);
			return true;
		}
		
		return false;
	};
	
	// Events for Mia
	per.showEvent = function()
	{
		var md, days, perBambi;
		
		if (Place == 269 && sType == "miapool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("mia-pool.jpg");
			addPlaceTitle(md, "Swimming with Mia");
			md.write(
				'<p>Mia arrives dressed in a bikini that look a lot like the one you say in the picture in Bambi\'s room, "' + perYou.getPersonName() + ' like what you see?"</p>' +
				'<p>You swim for a little with Mia'
			);
			if (perYou.isMaleSex() && isExplicit()) md.write(' and you suggest something else, she seems uncomfortable until you point out a private area where Bambi will not interrupt...</p>');
			else md.write(' and while normally you would assume she would be interested in something else, she seems uncomfortable when you make a suggestion. You drop the idea, after all Bambi is around!</p>');
			startQuestions();
			if (perYou.isMaleSex() && isExplicit()) addLinkToPlaceC(md, 'go to the private area', Place, 'type=miapoolsex');
			addLinkToPlaceC(md, 'say goodbye to Mia', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "miapoolsex") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPersonX("mia-pool-sexb.jpg");
			addPlaceTitle(md, "Private Area with Mia");
			md.write(
				'<p>You retreat to the private area and indulge with Mia and explore her \'private area\'!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'say goodbye to Mia', Place);
			WritePlaceFooter(md);
			return true;
		}		

		if (Place == 458 && this.isHere() && sType === "") {
			SetLeftColumnSize("large");
			return false;
		}

		if (Place == 435 && sType == "bambimiagym1") {
			// Meeting Mia (first encounter)
			this.charmedTime = nTime;	// Start 1 week timer
			this.moveThem(124);
			this.setFlag(7);	// Now nighttime barmaid
			perBambi = findPerson("Bambi");
			perBambi.setFlag(7);	// Nighttime guard
			perBambi.setFlag(12);	// Been to the Gym today
			//if (perDavy.place == 184) perDavy.place = 161;

			md = WritePlaceHeader(false, 'td-left-med');
			perBambi.showPerson("miabambi6.jpg");
			addPlaceTitle(md, "Bambi and her Mother, Mia");

			md.write(
				'<p>You take the taxi Bambi had called, it is a short 10 minute drive. During the ride Bambi is a bit restless, probably both anxious and excited. Anxious as she wants you to fill her request, excited as you may refuse and she will soon be having sex with her mother.</p>' +
				'<p>At the gym she makes a quick phone call to confirm where her mother is and leads you in. She asks you to wait for a moment as she finds her mother. You wait near a set of exercise machines and a translucent toughened glass wall. The gym has these around the place to provide some noise reduction and for the interior design appeal.</p>' +
				'<p>You hear a voice, it is Bambi, but muffled a bit. She is at the machines on the other side of the glass wall, starting to exercise with her mother. Mia is as you expected, an attractive woman a little shorter than Bambi, with a similar figure to her daughter and a prominent tattoo on her hip.</p>' +
				'<p>As they work out you see them chatting, both glancing at you regularly, but the words are indistinct. The impression you get is the standard sort of teasing a mother can do for her daughters lover, and a daughter in reply. Bambi has clearly not discussed issues of magic, mind-control and dungeons.</p>' +
				'<p>You take a seat for a while, you are not dressed for a work-out, as they finish their work-out. Mia approaches you with Bambi following and making a \'shush\' gesture, clearly wanting you to make a normal conversation.</p>' +
				'<p>"Hello, I\'m Mia, so you are fucking my daughter, good for you, just do not expect her to <i>only</i> fuck you!". Not quite the approach you expected, and you hesitate and reply a basic hello. She smiles grabs her daughter and puts an arm around her shoulders,</p>' +
				'<p>"Well, who she fucks is none of my business. But about business, she tells me you have some interest in the Hotel and that old fuck-wit Kurndorf. He was no leader, he let himself get shot, the fool.", she shakes her head,</p>' +
				'<p>"Somewhere I have a trinket he was supposed to own, but I suspect it is like pieces of the True Cross, there are a forest of them around. Still, I am sure we can come to terms if you want it". You certainly will, your terms not hers! You say some words about discussing it in the future, and she smiles,<p>' +
				'<p>"Sure, I will be working at the bar of the Broken Inn Hotel for a while. Bambi has asked me to help out for a while, she has some night job and wants me to help out. I\'ll be in town for a couple of weeks, I have a job planned then so I can hang around until then and help out."</p>' +
				'<p>Bambi joins in, "Thank you Mum, but you can stay as long as you like, the job can be yours permanently!". She pauses and looks at you "' + perYou.getPersonName() + ' I\'ll see you back at the hotel some time?"</p>' +
				'<p>She is asking you to let them go, as-is and agree to her request.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave the Gym', 37);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 435 && sType == "bambimiagym2") {
			// Bambi and Mia working out, later days
			perBambi = findPerson("Bambi");
			perBambi.setFlag(12);	// Been to the Gym today

			md = WritePlaceHeader(false, this.isCharmedBy() ? '' : 'td-left-med');
			if (this.isCharmedBy()) perBambi.showPerson("miabambi7.jpg");
			else perBambi.showPerson("miabambi6.jpg");
			addPlaceTitle(md, "Bambi and Mia");

			if (this.isCharmedBy()) {
				// After charming Mia
				md.write(
					'<p>You go with Bambi to meet Mia at the gym and they play at working out, but it more a strip-tease to arouse and entertain you. After some time they are naked and inviting you to give them a good work-out!</p>'
				);

			} else {
				// Before charming Mia
				md.write(
					'<p>Once again Bambi takes you to the gym while she works out with Mia. This time you take a change of gear so you can work out, and not just watch the two women, not that you do not watch them appreciatively.</p>'
				);
			}
			startQuestions();
			if (this.isCharmedBy()) {
				addLinkToPlaceC(md, '"let\'s see some team work here in the gym"', 435, 'type=teamwork');
				addLinkToPlaceC(md, '"play together"', 37, 'type=playtogether');
				addLinkToPlaceC(md, '"let\s all play"', 37, 'type=allplay');
			}
			addLinkToPlace(md, 'leave the Gym', 37);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 435 && sType == "charmmiagym1") {
			// Charm Mia at the Gym with Bambi 1
			this.other = 1;
			perBambi = findPerson("Bambi");
			md = WritePlaceHeader(false, 'td-left-large');
			perBambi.showPerson("miabambi7.jpg");
			addPlaceTitle(md, "Mia Under A Charm Spell");

			if (days < 7) {
				md.write(
					'<p>You cast the spell and you notice Bambi looks disapointed. She says "As you wish ' + perYou.getLord() + '"</p>'
				);
			} else {
				md.write(
					'<p>You cast the spell and you see Bambi smile and comment "About time ' + perYou.getLord() + '"</p>'
				);
			}
			md.write(
				'<p>Mia asks "What\'s that Bambi?...Did it just get hot in here?". Bambi leans over her smiling and slides off the straps of Mia\'s top and says,</p>' +
				'<p>"We are two <b>hot</b> women" and she laughs as she looks over at you.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'you have to agree', 435, 'type=charmmiagym2&time=' + getQueryParam("time"));
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 435 && sType == "charmmiagym2") {
			// Charm Mia at the Gym with Bambi 2
			md = WritePlaceHeader();
			perBambi = findPerson("Bambi");
			perBambi.showPerson("miabambi8.jpg");
			addPlaceTitle(md, "Mia Under A Charm Spell");

			md.write(
				'<p>Bambi tells Mia, "Look there is no-one else around, let\'s cool off and heat ' + perYou.getPersonName() + ' up"</p>' +
				'<p>The spell is coursing though Mia\'s body but she looks uncertain, so you say "You both look so <i>hot</i>..."</p>' +
				'<p>Mia needs no more encouragement and they both do a very skilled strip-tease, mostly separately, but Bambi keeps trying to assist her mother and keeping contact. You watch with pleasure, and as they finish sitting naked on one of the exercise machines you tell them,</p>' +
				'<p>"Beautifully done, I hope to see more teamwork like that in the future"</p>' +
				'<p>Bambi answers "Anytime ' + perYou.getLord() + '" but Mia looks reluctant and says "Well sometimes...but only...", and you interrupt,</p>'
			);
			startQuestions();
			addLinkToPlace(md, '"When I ask, certainly"', 435, 'type=charmmiagym3&time=' + getQueryParam("time"));
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 435 && sType == "charmmiagym3") {
			// Charm Mia at the Gym with Bambi 3
			days = parseInt(getQueryParam("time"), 10);		// days since Bambi's request

			md = WritePlaceHeader(false, 'td-left-large');
			perBambi = findPerson("Bambi");
			perBambi.showPerson("miabambi9.jpg");
			addPlaceTitle(md, "Mia Under A Charm Spell");

			md.write(
				'<p>Bambi tells Mia, "Yes, anytime our ' + (perYou.isBornMale() ? 'Lord' : 'Lady') + ' wants us, anytime!"<p>' +
				'<p>The spell reinforces your words and Bambi\'s and Mia answers "Anytime you want me...us" and the mother and daughter line themselves up. Delightful asses presented for you to use as you want...and you want!</p>' +
				'<p>Afterwards, you ask Mia about the gem you had talked about with Bambi. Mia reaches out to her clothing, '
			);
			if (days < 7) md.write('and grabs a crystalline ring but it slips out of her sweaty fingers and rolls immediately under a machine. You try to get it but the machine shifts and the ring shatters into useless fragments. She shrugs, "Oh well, it was just a trinket, I doubt it was really owned by that warlock."</p>');
			else {
				if (whereItem(64) === 0) PlaceI(64);
				md.write('and picks up a crystalline ring but it slips out of her sweaty fingers. It rolls towards a machine but lodges at the edge and sits there. She comments "Oops, but it is fine. It is probably worthless, but you can have it!". It is sitting precariously, you had better pick it up.</p>');
			}
			startQuestions();
			addLinkToPlace(md, 'leave the gym', 37);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 435 && sType == "teamwork") {
			// Teamwork in the Gym
			var b = Math.random() < 0.5;
			md = WritePlaceHeader(false, b ? 'td-left-large' : '');
			perBambi = findPerson("Bambi");
			perBambi.showPerson(b ? "miabambi9.jpg" : "miabambi8.jpg");
			addPlaceTitle(md, "Mia and Bambi");

			md.write(
				'<p>You ask Bambi and Mia to show you some teamwork and the mother daughter team do a very skilled strip-tease, mostly separately, but Bambi keeps trying to assist her mother and keeping contact. You watch with pleasure, and as they finish naked, waiting for you to join them.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave the gym', 37);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 37 && sType == "playtogether") {
			// Playing together
			md = WritePlaceHeader();
			perBambi = findPerson("Bambi");
			perBambi.showPerson("miabambi4.jpg");
			addPlaceTitle(md, "Mia and Bambi Playing");

			md.write(
				'<p>You notice there are quite a few people around and the changing rooms are also busy. Bambi takes your hand and Mia\'s and leads you to a small alley that runs along-side the gym. You can easily guess what she has been doing with others out here before.</p>' +
				'<p>You ask them to play together, and they strip off, and as you watch they caress and play with themselves. As they do they takj about what they want or have fantasised about you doing to them singly or together!</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave the alley', 37);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 37 && sType == "allplay") {
			// Playing with them
			md = WritePlaceHeader();
			perBambi = findPerson("Bambi");
			perBambi.showPerson("miabambi5.jpg");
			addPlaceTitle(md, "Playing with Mia and Bambi");

			md.write(
				'<p>You notice there are quite a few people around and the changing rooms are also busy. Bambi takes your hand and Mia\'s and leads you to a small alley that runs along-side the gym. You can easily guess what she has been doing with others out here before.</p>' +
				'<p>They quickly strip off and line themselves up, assess, pussies and bodies ready for you to take however you want!</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave the alley', 37);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 458 && sType == "charmmiahome1") {
			// Charm Mia at her apartment 1
			this.other = 1;
			md = WritePlaceHeader(false, 'td-left-large');
			this.showPerson("mia9.jpg");
			addPlaceTitle(md, "Mia Under A Charm Spell");

			md.write(
				'<p>Mia looks at you "If only Bambi and you were not involved..." and you cast the spell "Dai Chu Mai", and she looks at you,</p>' +
				'<p>"You could dump her, she has many lovers..." and you interrupt, "No, I will not dump her, but what is the problem with a complex relationship"</p>' +
				'<p>Mia moves as the arousal of the spell starts to affect her and smiles, "Well, I do not see an issue if we are discrete I suppose..."</p>' +
				'<p>You tell her "By all means, but why not simplify things" and she asks how. You answer,</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Simple as ' + perYou.getMaster() + ' and slave"', 458, 'type=charmmiahome2');
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 458 && sType == "charmmiahome2") {
			// Charm Mia at her apartment 2
			days = parseInt(getQueryParam("time"), 10);		// days since Bambi's request

			md = WritePlaceHeader();
			this.showPerson("mia10.jpg");
			addPlaceTitle(md, "Mia Under A Charm Spell");

			md.write(
				'<p>She answers, "Well I have played with Domination/Submission but not really my thing" and you tell her</p>' +
				'<p>"As you say it is just a game, I would be your strong ' + perYou.getMaster() + ' and you my beautiful slave?", and she shakes her head,</p>' +
				'<p>"Well the occasional game can be fun..." and she sits up as she starts to strip off more of her lingerie. You tell her "Bambi enjoys the game as well, she always calls me ' + perYou.getLord() + ' and considers herself my slave!"</p>' +
				'<p>She says, "I would of thought Bambi would enjoy being a Domme than a Sub" and you tell her,</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Bambi loves both"', 458, 'type=charmmiahome3');
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 458 && sType == "charmmiahome3") {
			// Charm Mia at her apartment 3
			md = WritePlaceHeader();
			this.showPerson("mia11.jpg");
			addPlaceTitle(md, "Mia Under A Charm Spell");

			md.write(
				'<p>Mia removes the rest of her clothing and simply says "' + perYou.getMaster() + '"</p>' +
				'<p>You embrace her and claim her body, she may not be quite your slave in name, but the spell has made her so in all other ways.</p>' +
				'<p>After you talk about Bambi and playing with both your slave girls. Mia seems reluctant for a moment, but answers, "It can be good to play new games ' + perYou.getPersonName() + '...' + perYou.getMaster() + '...sometimes"</p>' +
				'<p>You ask Mia about the gem you had talked about with Bambi. Mia reaches out to her side table, and picks up a crystalline ring and puts it on the bed between you. She comments "It is probably worthless, but you can have it!"</p>'
			);
			if (whereItem(64) === 0) PlaceI(64);

			startQuestions();
			addLinkToPlace(md, 'talk more to Mia', 458);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 458 && sType == "miasex") {
			// Sex with Mia in her apartment (Charmed)
			md = WritePlaceHeader();
			if (perYou.isMaleSex() && isExplicit()) this.showPersonArrayX(['miasex1.jpg','miasex2.jpg','miasex3.jpg','miasex4.jpg']);
			else this.showPersonArray(['miasex1.jpg','miasex2.jpg']);
			addPlaceTitle(md, "Enjoying Mia");

			md.write(
				'<p>You enjoy your slaves\' body.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'talk more to Mia', 458);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1mia") {
			// End Game - Lola
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Bartenders?");

			md.write(
				'<p>One day you receive a message from Mia to meet her at a beach. She has been a lot more active since her transformation, both in and out of bed. Recently she has been travelling a bit bit keeping in touch regularly.</p>' +
				'<p>When you meet her at the beach you see the transform spell has allowed her to learn from Miss. Logan as you see her swollen pregnant belly.</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);
					
			WritePlaceFooter(md);
			return true;				
		}

		// Hotel
		if (Place != 124) return false;

		if (sType == "spilldrink") {
			// deliberately spill your drink on her
			this.other = 1;		// Cannot do it again

			md = WritePlaceHeader();
			this.showPerson("mia5.jpg");
			addPlaceTitle(md, "Mia in the Shower");

			md.write(
				'<p>You pick up the drink and \'accidentally\' drop it so most of it spills on Mia\'s dress. You apologise and she tells you mostly in jest, "Clumsy little ' + (isBritish() ? 'bugger' : 'bastard') + '! I will have to go and change, and probably have a quick shower.". You suggest Bambi\'s room as a place to go and she agrees.</p>' +
				'<p>She leaves the bar after giving you a smile, you wait a couple of minutes and cautiously follow her to Bambi\'s room.</p>' +
				'<p>When you enter you hear the distinct sound of the shower running. You look in and you can see Mia through the frosted glass quickly showering. You feel a bit like some pervert peeking at a woman in the shower...</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'leave her showering and return to the bar', 124, '', 'You leave her and return to the bar. Not long after Mia returns to her place behind the bar.');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmiashower1") {
			// Charm Mia in the shower 1
			md = WritePlaceHeader();
			this.showPerson("mia6.jpg");
			addPlaceTitle(md, "Mia Under A Charm Spell");

			md.write(
				'<p>You recite the spell, and it is unlikely Mia heard it over the sound of the shower. You call out for her and slide the door of the shower open and see she is just applying some body lotion. You ask her if it feels good,</p>' +
				'<p>"Yes, very, very nice ' + perYou.getPersonName() + '", she does not seem to care you are there. You are unsure if this is the spell or just her uninhibited nature. You try to exert some influence to guide the spell a little, and <i>tell</i> her to massage it into her breasts for <b>you</b>.</p>' +
				'<p>Without looking at you she works the lotion onto her breasts, massaging sensually, and you see her nipples become hard as her arousal quickly builds. She sighs, and says softly,</p>' +
				'<p>"I know Bambi will not care, but it is usually against my rules to get involved with her lovers..." and you interrupt her,</p>' +
				'<p>"Rules are to be broken, we should be free to do whatever we want!". You are building on her nature and the spell to bind her to you. She looks at you,</p>' +
				'<p>"It\'s not a hard and fast rule, more a general guide I suppose".</p>'
			);
			startQuestions('You tell her');
			addLinkToPlaceC(md, '"Let\'s break some rules"', 124, 'type=charmmiashower2&time=' + getQueryParam("time"));
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmmiashower2") {
			// Charm Mia in the shower 2
			days = parseInt(getQueryParam("time"), 10);		// days since Bambi's request

			md = WritePlaceHeader();
			this.showPerson("mia7.jpg");
			addPlaceTitle(md, "Mia Under A Charm Spell");

			md.write(
				'<p>You remove your clothing and join Mia in the shower, you embrace her slick body and kiss her. After the kiss she starts caressing you and whispers to you,</p>' +
				'<p>"While you have the daughter sometimes and the mother now, you are not going to get anything mother/daughter, that is a..." and you quickly interrupt her, you are the one shaping her mind now,</p>' +
				'<p>"Rule you will not break? I told you rules are meant to be broken, I know Bambi wants you, and she has suggested it in the past, hasn\'t she? She is sexy and so are you.". You see her eyes glow a little, and feel her nipples stiffen against your ' + (perYou.isBornMale() ? 'chest' : 'breasts') + '. She sighs,</p>' +
				'<p>"Well, maybe a threesome now and then would not be so bad...", and you have to agree, not bad at all! You kiss her again '
			);
			if (perYou.isMaleSex()) md.write('and feel her hand on your cock. Time for talk has passed, you lift up one of her legs and thrust your cock into her hot, wet pussy. She gasps as you fuck her to an intense and mutual climax.');
			else md.write('and feel her fingers sliding along your folds and into your pussy. Time for talk has passed, and you rub, slide, kiss and lick each other to intense, mutual orgasms.');
			md.write('</p><p>Afterwards, you ask Mia about the gem you had talked about with Bambi. Mia reaches out to her clothing, ');
			if (days < 7) md.write('and grabs a crystalline ring but it slips out of her wet fingers and rolls immediately into the drain! Maybe a plumber could recover it, but you doubt it. She shrugs, "Oh well, it was just a trinket, I doubt it was really owned by that warlock."</p>');
			else {
				if (whereItem(64) === 0) PlaceI(64);
				md.write('and picks up a crystalline ring but it slips out of her wet fingers. It rolls towards the drain but lodges at the edge and sits there. She comments "Oops, but it is fine. It is probably worthless, but you can have it!". It is sitting precariously, you had better pick it up.</p>');
			}
			md.write(
				'<p>As you start redressing you notice Mia is starting to put on some high boots first, and you ask her why, "They look good on me, and I wanted to show off to you, after all I have to compete with Bambi now!"</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'return to the bar', 124, '', '', '', 'if (whereItem(64) == 124) moveItem(64,0);');
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("!poledance", 1);
		addPlaceTitle(md, "Mia's Dance");
		md.write(
			'<p>Mia takes the stage dressed in a sort of sports wear, but she does not keep it on for version long!</p>' +
			'<p>Mia is definitely an experienced dancer, not as much as Bambi or the other professionals but she practiced and entertaining. She seems to really enjoy performing for the audience and for you!</p>' +
			'<p>After she sits with you for a while, not bothering to redress, a naked MILF dancer!</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 458 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) return this.showPerson("mia-homec.jpg", '', '', '', '', false, "string");
			return this.showPerson("mia-homeu.jpg", '', '', '', '', false, "string");
		}
		return '';
	};

	// Questions for Mia
	per.showPersonChat = function(bGeneral, md)
	{
		if (sType !== "" || !this.isHere()) return;

		//var myLordB = this.getYourNameFor();

		if (Place == 124) {
			// The hotel
			if (!this.isCharmedBy("You")) {
				// Mia NOT CHARMED
				if (this.other === 0) {
					if (!this.checkFlag(1)) addQuestionC(md, 'tell Mia "I\'d like a scotch on the rocks, please."', "Mia", 10801);
					else addLinkToPlaceC(md, 'tell Mia "I\'d like a scotch on the rocks, please." and spill it on her dress', 124, 'type=spilldrink');
				}
				//if (this.other == 1) addQuestionC(md, 'tell Bambi "Is there any way I could get to know you a little better?"', "Bambi", 10802);
				return;
			} else {
				// Mia is CHARMED
			}
		} else if (Place == 458) {
			// Her apartment
			if (this.isCharmedBy()) {
				addLinkToPlaceC(md, '"I want you"', 458, 'type=miasex');
				this.addDancingLink(md, 'talk to Mia about dancing in the club',
					'You ask Mia about the Avernus club and about dancing there for you,</p>' +
					'<p>&quot;Well Bambi is more the expert there but I have before and also once or twice with Bambi. Sure ' + this.getYourNameFor() + ' why not, it sounds like fun!&quot; and with that you call Jade to arrange a dance for Mia.'
				);				
				this.addSleepLink(md, "spend the day with Mia", "",
					"<p style='position:absolute;top:62%;left:2%;cursor:pointer;margin-top:-12px;font-size:x-large'><b>Going to Bed with Mia</b></p>" +
					'<p style="position:absolute;left:2%;top:65%;cursor:pointer;font-size:1.1em;width:50%">You spend the day in the arms of Mia',
					"mia9.jpg"
				);
			}
		}
	};

	// Text in a location
	per.showPersonTextHere = function(md)
	{
		if (Place == 124 && this.isHere()) {
			md.write('<p>At this time of the day there are only a few patrons at the bar.' + addVisible(' Mia welcomes you and asks what you would like.') + '</p><p>');
		} else if (Place == 458 && this.isHere()) {
			if (isInvisible()) md.write('<p>Mia is lying on her bed relaxing.</p>');
			else if (this.isCharmedBy()) md.write('<p>Your MILF slave Mia welcomes you to her apartment, and offers you anything you wish, a drink, her, anything.</p>');
			else md.write('<p>Mia welcomes you to her apartment, She is dressed in her nightie, though it looks more like lingerie. After all she works nights so generally sleeps in the day.</p>');
		}
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() && this.dress == "Younger" ? "endgame1mia" : "";
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Using/Examining the Silver Ring
		if (no == 32 && cmd == 1) {
			// Examine the Silver Ring
			if (this.isHere() && this.isCharmedBy()) return examineSilverRingReacts("Mia");
		}

		// Casting the charm spell
		else if (no == 14 && cmd == 2) {
			var dc = Math.floor((nTime - this.charmedTime) / 288);		// Days charmed/since arrived, 1 = 1 day AFTER initial meeting
			// In the bar
			if (Place == 124 && this.isHere()) {
				if (sType == "spilldrink") {
					CastCharmSpell("Mia", 124, 1, 'type=charmmiashower1&time=' + dc);
					return "handled";
				}
				if (!isSpellKnown("Shielded Charm")) return "public";
				if (!this.isCharmedBy()) {
					// Mia isn't already charmed
					addComments("You try to cast the spell, and for a moment it seems to affect Mia, but then someone calls out for a drink and she seems to just shake the effect and goes to serve them.</p><p>You do not think she is protected as such but it may be a combination of a strong will and that she is easily distracted. You will have to try somewhere else where you can get her on her own.");
				} else {
					// Already charmed
					addComments('You have already <i>Charmed</i> Mia.');
				}
				return "handled";
			}
			// At the Gym
			else if (Place == 435 && (this.isHere() || sType == "bambimiagym1")) {
				if (!isSpellKnown("Shielded Charm")) return "public";
				CastCharmSpell("Mia", 435, 1, 'type=charmmiagym1&time=' + dc);
				return "handled";
			}
			// At her apartment (post time window)
			else if (Place == 458 && this.isHere()) {
				CastCharmSpell("Mia", 458, 1, 'type=charmmiahome1');
				return "handled";
			}
		}
		
		// Casting the transform spell
		else if (no == 18 && cmd == 2) {

			// At home and charmed
			if ((Place == 124 || Place == 458) && this.isHere() && sType === "") {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her");
					return "handled";
				}
				if (!CastTransform(1, true)) return "handled";

				// It can be cast
				//ClearComments();
				dispPlace(Place, 'type=miatransformage' + this.dress.toLowerCase());
				return "handled";
			}
		}

		return "";		// do nothing
	};

	// Phone calls
	per.isPhoneable = function() {
		// Can you call them?
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.isCharmedBy();
	};

	per.callThem = function() {
		if (Place == 269) {
			receiveCall('', 'You call Mia to invite her to join you at the pool for a swim, and she answers, "Love to!". A couple of minutes later she joins you..');
			gotoPlace(Place, 'type=miapool');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	per.addPersonPhoneCall = function()
	{
		if (!this.checkFlag(3) && this.checkFlag(6) && !this.isHere() && !isDay()) {
			if (makeCall(true, 88)) this.setFlag(3);
		}
		if (!this.checkFlag(4) && this.isCharmedBy() && !this.isHere()) {
			if (makeCall(true, 89)) {
				this.setFlag(4);
				setPlaceKnown("MiasApartment");
			}
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 88) return receiveSMS('MIaLF', 'Bambi said you asked about my modeling, enjoy!', 'miasms1.jpg');
		if (id == 89) return receiveSMS('MIaLF', 'I am yours anytime you want, visit me at Apartment 12, 42 Celeste Rd', 'miasms2.jpg');
		return '';
	};
}
