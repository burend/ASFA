/**********************************************
Abby
***********************************************/

function LeaveMinAbby()
{
	findPerson("Abby");
	per.charmThem(1);
	dispPlace(361, "");
	WriteComments('You leave the information desk and the girl to deal with the spell.<br/>She will be affected by the spell but you have chosen to not try to reinforce or guide her so the effect will be minimal.');
}

function initialiseAbby()
{
	// Abby
	addPerson("Abby", 394, "Abby");
	
	per.getQuestDragonGem = function() { return this.extra[0]; };
	per.setQuestDragonGem = function(no) { this.extra[0] = no; };

	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		if (!this.isCharmedBy()) {
			return this.addPersonString("abby0.jpg", "height:max%", "right") +
				"The Aquarium’s receptionist is a youthful woman of asian ancestry named Abby. When you ask about directions and exhibitions in the Aquarium she gladly helps you out. " +
				"Maybe a little too much; it is clear that she is a talkative one and very open on helping others, but her non stop monologues about nothing can be frustrating after a while.<br><br>" +
				"Also, she’s suspiciously open and positive about offering help to the visitors, including you of course. She told you she can escort you to the exhibitions you are interested in and she can be a guide if you would like that. She’s an overly attached girlfriend type, but something in you keeps interested in her. You have to figure that out." +
				(isSpellKnown("Charm") ? "Maybe you could \"persuade\" her to join the hordes of slaves following you? You have to be careful though, it’s a public place after all!" : "");

		} else {
			return this.addPersonString("abby3d.jpg", "height:max%", "right") +
				"Yep, just what you thought. Abby is an overly attached girl who’s emotions lead her instead of her mind. The tiny asian girl is way in over her head when you come to check on her. She throws herself into your open arms and strikes up a conversation with you where you usually listen to her problems. She only stops for a few short breaks asking you if you need anything or how could she serve you. You usually refuse and let her continue her rant which is mostly about her working conditions and everyday life.<br><br>" +
				"You admit to yourself; you’re only here because she works naked! You can see her body exposed to everyone and everything! You made her transfer herself to an another department in the Aquarium so now she works alone and you don’t have to worry about getting caught visiting her!<br><br>" +
				"Abby is tossing some papers around on her table when you arrive at her room. She stands up, bows and comes to you to talk. All while she plays with her completely naked body to your pleasure!";
		}
	};
	
	per.getPersonAddress = function() { return isPlaceKnown("AbbysApartment") ? 'Apartment 8, 42 Celeste Rd' : ''; };

	per.whereNow = function()
	{
		if (isShopOpen(2, 0, true)) return this.place;
		if (isDay()) return 459;
		return 459;
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 459 && this.isHere() && sType === "") return this.showPerson("abby-home1.jpg", '', '', '', '', false, "string");
		return '';
	};
	
	per.isPlaceImageRight = function()
	{
		return Place == 279 && sType == "abbygem";
	};

	per.showPlaceImageRight = function(md)
	{
		this.showPerson("abby11a.jpg");
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 279 && sType == "abbygem") md.write('<p>Abby is looking around curiously, uncharacteristicly quiet.</p>');
		else if (Place == 459 && this.isHere()) {
			if (isInvisible()) md.write('<p>Abby is doing some housework, completely naked as always.</p>');
			else md.write('<p>Abby seductively greets you, but then spoils the moment a bit as she starts chatting about her neighbours.</p>');
		}
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 394 && !this.checkFlag(1)) {
			this.setFlag(1);
			this.showPersonInfo(mdCache);
			return true;
		}

		return false;
	};


	per.showEvent = function()
	{
		var md, stage;

		if (Place == 394) {
			
			if (sType == "charmabby1") {
				// Cast Charm on Abby 1
				md = WritePlaceHeader();
				this.showPerson("abby2.jpg");
				addPlaceTitle(md, "Information Girl Under a Spell");
				md.write(
					'<p>You cast the charm spell on the girl at the information desk. ' +
					'She hears you mumble the incantation but just smiles and ignores the words and she says something to you, but it is a language you do not recognise, not Chinese but another Asian language. She gives a small laugh and repeats herself in English,</p>' +
					'<p>&quot;Hi! I\'m Abby! I really, really want to help you, it is my hearts desire to help you, please?&quot;</p>' +
					'<p>You see her hands fidgeting at the base of her white top and her jeans, but despite the desire the spell is causing to flood her mind, she is still smiling.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Yes you can help me"', Place, 'type=charmabby2&stage=abby3a');
				addOptionLink(md, "exit the information desk", "LeaveMinAbby()");
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmabby2") {
				// Cast Charm on Abby 2
				md = WritePlaceHeader();
				stage = getQueryParam("stage");
				this.showPerson(stage + ".jpg");
				addPlaceTitle(md, "Abby Under a Spell");
				md.write('<p>');
				var ostage = stage + '';
				if (stage === "abby3a") {
					md.write(
						'Abby smiles again and says.</p>' +
						'<p>&quot;I know how I want to assist you, would it help you for me to remove my top?&quot;</p>' +
						'<p>Before you answer she starts removing her top, the magic if the spell is arousing her and bending her to your will but she is not letting you say much as she cheerfully offers her help.</p>'
					);
					stage = "abby3b";
				} else if (stage == "abby3b" || stage == "abby3c" ) {
					md.write('Abby happily removes more clothing as she continually talks, about how much she is eager to help you, about how clothing is an anachronism, and asking if this is helping you?</p>');
					if (stage == "abby3b") stage = "abby3c";
					else if (stage == "abby3c") stage = "abby3d";
				} else if (stage === "abby3d") {
						md.write('Abby is standing naked before you looking completely comformatable and happy, and excited. You start to tell her to show more, but maybe it is time to move to the next level when she just talks over you,</p><p>"Would you like me to give you a little show here, or maybe elsewhere?"</p>');
						stage = "abby3e";
				} else if (stage === "abby3e") {
						md.write('Abby turns around to show you more of her shapely rear, and notice her tattoo. You start to ask her about it, and again she talks over you,</p><p>"My tattoo is a family thing, all women get one like this, the men get much more extensive ones. It&apos;s a heritage of a rough time in our past, the designs are always related to the legends of our family past. Mine is a tale of a dragon, the daichunai that would steal the heart and souls of people, and how a brave ancestor of mine was finally able to defeat it."</p>');
						stage = "abby4";
				} else if (stage === "abby4") {
					md.write('Abby continues,</p><p>"Of course I thought that was just a legend, but you have the dragon power, so you must be a descendant of the hero, a far distant relative of mine. I will help you in anything you need, in any way I can!');
					if (perYourBody.FindItem(24) === 0) PlaceI(24);
					md.write(
						' Maybe this will be of help to you, it is supposed to be a fragment of dragon bone.' +
						'"</p><p>Abby stands and gestures to you,</p><p>"Let me help you now in <i>another</i> way" and she starts to walk towards the back of the office.</p>'
					);
				}
				// Choices
				startQuestions();
				if (ostage !== "abby4") {
					if (ostage === "abby3d" || stage == "abby3e") addLinkToPlace(md, 'tell her to put on the show', Place, 'type=charmabby2&stage=' + stage);
					else addLinkToPlace(md, 'tell her to help a bit more', Place, 'type=charmabby2&stage=' + stage);
					addLinkToPlace(md, 'tell her we will take it to the next level', Place, 'type=charmabby3');
				} else {
					addLinkToPlace(md, 'follow her', Place, 'type=charmabby3');
				}
				WritePlaceFooter(md);
				return true;
			}			
			if (sType == "charmabby3") {
				// Cast Charm on Abby 3
				md = WritePlaceHeader(false, "td-left-large");
				ClearComments();
				this.showPersonRandom("abby5", 2);
				addPlaceTitle(md, "Abby Under a Spell");
				md.write(
					'<p>Abby sits on a couch comfortably and with no self-consciousness, clearly offering herself to you.</p>' +
					'<p>"There are many more ways I can help you, with joy and our great pleasure. You are the ' + perYou.getMaster() + ', my ' + perYou.getMaster() + ', order me to do anything you want or desire."</p>' +
					'<p>Her dedication was sincere, you are not sure if it is from the magic or something else. Despite her sincerity she is still smiling and continues talking about nothing, about everything, waiting for your response, but talking while doing so.</p>'
				);
				// Choices
				startQuestions();
				addLinkToPlace(md, "accept her dedication", Place, 'type=charmabby4');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmabby4") {
				// Cast Charm on Abby 4
				md = WritePlaceHeader();
				if (isExplicit() && !perYou.isMaleSex()) this.showPersonRandomX("abby6", 2);
				else this.showPerson("abby6.jpg");
				addPlaceTitle(md, "Abby Under a Spell");
				md.write(
					'<p>Abby lies back and passionately and noisily accepts your body and brings you both to the peak of ecstasy. A little disconcertingly, but not surprisingly, she talks and yells her way the entire time, begging you, telling you or just crying out her joy.</p>' +
					'<p>She lies back sated after your pleasure is complete, and as you get dressed she says,</p>' +
					'<p>"My dedication to my ' + perYou.getMaster() + ' will stay for all to see!"</p>'
				);
				// Choices
				startQuestions();
				addLinkToPlace(md, "return to the front hall", 361);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "gem") {

				md = WritePlaceHeader();
				this.showPerson("abby1d.jpg", "", "", "", "Information Girl");
				addPlaceTitle(md, "Dragon Gem");

				if (this.checkFlag(7)) {
					md.write(
						'<p>You again ask Abby about Dragon Gem and if she can move it for you to help save Leanne.</p>' +
						'<p>"Yes of course, let\'s go!"'
					);

				} else {
					md.write(
						'<p>You ask Abby if she has heard of the Dragon Gem and why it is so hot and untouchable.</p>' +
						'<p>"Yes the legends of my family mention how the dragon used a gem to store it\'s power. The fate of the gem was not told of, and lost to history, but if you have found it, then you are truly the descendant of the hero!<br><br>' +
						'The power of the dragon would infuse the gem, and you could not touch it. But I think I might know how, let me try?"</p>' +
						'<p>It would seem Abby can help you, but she makes it difficult to decide, as she continues to happily talk, nothing related to this, just telling you about nothing and everything.</p>'
					);
				}

				startQuestions();
				addLinkToPlaceC(md, '"let\'s go to the Mechanic\'s Workshop"', 279, 'type=abbygem', 'Abby happily agrees and starts to follow you, still completely naked. You suggest she might like to get dressed, and she replies, &quot;No I wouldn&rsquo;t!&quot; and patiently waits for you. You give up and you both head to the workshop');
				addLinkToPlaceC(md, '"no need, I will look after it for now"', 394, '', 'Abby looks at you happily, and resumes chatting about everything and nothing', 'Abby', "setPersonFlag('Abby',7)");
				addLinkToPlace(md, "return to the front hall", 361);
				WritePlaceFooter(md);
				return true;
			}
		}
		if ((Place == 459 || Place == 394) && this.isHere()) {

			if (sType == "abbyfuck") {
				// Sex scenes at her home
				md = WritePlaceHeader(false, !perYou.isMaleSex() ? isExplicit() ? "td-left-large" : "" : "td-left-large");

				if (Place == 394) {
					// Aquarium
					if (perYou.isMaleSex()) {
						this.showPerson("abby-home-sex-b.jpg");
						addPlaceTitle(md, "Abby's Office Help");
					} else {
						this.showPersonRorX("abby-home-sex-g.jpg");
						addPlaceTitle(md, "Abby's Office Help");
					}					
				} else {
					// Her apartment
					if (perYou.isMaleSex()) {
						this.showPerson("abby-home-sex-b.jpg");
						addPlaceTitle(md, "Abby's Home Help");
					} else {
						this.showPersonRorX("abby-home-sex-g.jpg");
						addPlaceTitle(md, "Abby's Home Help");
					}
				}
				md.write(
					'<p>There are very few ways to get Abby to be quiet for a moment, but this one has so far never failed:</p>' +
					'<p>You pull Abby close to you, simply press your lips against hers, and after a brief grunt of protest, she quickly melts into the shared kiss, her naked body eagerly nestling against you.</p>' +
					'<p>“Wow... “Abby looks at you wide-eyed as you break the kiss. “You... needed my help with something?”</p>' +
					'<p>“Yes, and I also wanted to enjoy the quiet for a while.”</p>' +
					'<p>“Oh...”</p>' +
					'<p>There is a moment of silence where Abby doesn\'t seem to quite know what to do with you, now that she isn\'t talking. She is still remaining close, but occasionally looks around and pulls her lower lip in, as if she wants to say or ask something, but doesn\'t.</p>' +
					'<p>Finally, you move to the couch and pull her into your lap. The two of you share another brief kiss, and before Abby is able to say more, you press two fingers to her lips to silence her and guide her head down to your hip.</p>' +
					'<p>Abby nods to you with a wide smile and opens your pants, extending her tongue and slowly running it ' + (perYou.isMaleSex() ? 'along the entire length of your manhood' : 'over your folds, finishing off with a playful flick over your clit') + '.</p>'
				);
				if (perYou.isMaleSex()) {
					md.write(
						'<p>From then on, you not only enjoy the silence, but also the feel of Abby\'s lips wrapped around your manhood as her head moves back and forth.</p>' +
						'<p>You occasionally give her a small pointer, and while she is inexperienced, she is a fast learner and very eager to please you. It doesn\'t take long for you to reach your peak, and she eagerly swallows your load, happy to have indeed been able to help you.</p>'
					);
				} else {
					md.write(
						'<p>From then on, you not only enjoy the silence, but also the feel of Abby\'s tongue tracing your folds and slowly circling your clit.</p>' +
						'<p>You occasionally give her a small pointer, and while she is inexperienced, she is a fast learner and very eager to please you. It doesn\'t take long for you to reach your peak, and as you do, you press her head firm against your hip, telling her to make sure to clean you well, and she eagerly follows suit, happy to have indeed been of help.</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, 'unavoidably talk more with Abby', Place);
				if (Place != 394) addLinkToPlace(md, 'exit the apartment', 456);
				WritePlaceFooter(md);
				return true;
			}
		}


		if (Place != 279) return false;

		if (sType == "abbygem2") {
			md = WritePlaceHeader(false, "td-left-med");
			this.showPerson("abby11b.jpg");
			this.setFlag(8);
			this.setFlag(9);
			setPlaceFlag("Alley", 9);
			AddMana(5);

			addPlaceTitle(md, "Abby and the Gem");

			md.write(
				'<p>Abby kneels down to look at the gem, and cheekily looks back at you to ensure you get a good view of her shapely rear.</p>' +
				'<p>She reaches out and casually picks up the gem, no discomfort showing on her face and she looks at the gen closely, turning it over. She throws it from one hand to the other, smiling and tells you,</p>' +
				'<p>"It\'s not hot at all to me, but I did feel a tingle, like when we first chatted <i>personally</i>."</p>' +
				'<p>She steps over to you and kisses you on the lips and you feels a surge of power, as some magic floods into you.' +
				' She tells you "The gem is shaped to fit into some sort of socket.", and then she then says,</p><p>"Anything more, or shall I return to work?".');
			if (checkPlaceFlag("Alley", 8) && checkPlaceFlag("Alley", 9)) md.write('Maybe you could ask her to relocate the gem?</p>');
			else md.write('You cannot think of anything more and ask her to return and promise to visit later.</p>');

			// Choices
			startQuestions();
			if (checkPlaceFlag("Alley", 8) && checkPlaceFlag("Alley", 9) && whereItem(35) == 279) addLinkToPlaceC(md, '"Can you move the dragon gem for me"', 53, 'type=movegem');
			addLinkToPlace(md, "exit the workshop?", 194);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPerson("poledancea.jpg");
		addPlaceTitle(md, "Abby\'s Dance");
		md.write(
			'<p>When Abby arrives there are two unusual things you notice immediately, she is dressed in a harem-girl outfit, unusualy as she seems to have lost all interest in clothing since being charmed. The other thing is she is smiling but is quiet, and she does not talk for her entire performance!</p>' +
			'<p>You enjoy her performance, both for she excellent dance and for the lack of her chatter. She is cute and sexy but if only she would be quiet like she is now more often!</p>' +
			'<p>After she joins you for a while, not bothering to re-dress but also resuming her cherrful conversation!</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);	
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 279 && sType === "abbygem") {
			if (!this.checkFlag(9)) addLinkToPlaceC(md, "ask Abby to check the gem", 279, 'type=abbygem2');
			else if (checkPlaceFlag("Alley", 8) && checkPlaceFlag("Alley", 9) && whereItem(35) == 279) addLinkToPlaceC(md, '"Can you move the dragon gem for me"', 53, 'type=movegem');
		} else if (Place == 459 && this.isHere() && sType === "") {
			// Abby's apartment
			addLinkToPlaceC(md, 'ask Abby for some help', Place, 'type=abbyfuck');
			this.addSleepLink(md, "bed Abby", "Sleeping with Abby",
				'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Abby to bed, though it takes a while before she runs out of things to say!</b>',
				'abby-bed.jpg', true, '', '', '', "overflow-y:hidden"
			);	
		} else if (Place == 394 && sType === "" && this.isCharmedBy() && !isPersonHere("Miku")) addLinkToPlaceC(md, 'ask Abby for some help', Place, 'type=abbyfuck');
	};

	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// At the Aquarium Information Desk and she is present?
			if (Place == 394 && this.place == 394 && (!this.isCharmedBy() || !isPersonHere("Miku"))) {
				if (!isSpellKnown("Shielded Charm")) addComments('Don\'t cast the spell here. It is too public.');
				else CastCharmSpell("Abby", Place, 1, 'type=charmabby1'); //Charm the information girl
				return "handled";
			}
		}
		return "";		// do nothing
	};

	// Phone calls
	per.addPersonPhoneCall = function() {
		if (!this.isCharmedBy()) return false;		// All SMS's are post Charm for her
		if (!isDay() && checkPersonFlag("Miku", 4) && !this.checkFlag(2)) {
			// SMS 260, Night after trying to charm Miku
			if (makeCall(true, 260)) {
				this.setFlag(2);
				setPlaceKnown("AbbysApartment");
			}
		} else if (this.checkFlag(2) && !this.checkFlag(3)) {
			// SMS 261, immediately after the last SMS
			if (makeCall(true, 261)) this.setFlag(3);
		} else if (!this.checkFlag(4) && getHour() == 12 && Math.random() < 0.2) {
			// SMS 262, lunch time
			if (makeCall(true, 262)) this.setFlag(4);
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		switch(id) {
			case 260:
				// SMS 260 after Miku charm
				return receiveSMS('Abby', 'Doing some work around my apartment, care to help me out my hero?', 'abbysms1.jpg') + replyToSMS("At least you are wearing an apron") + receiveSMS('Abby', 'Had to!') + replyToSMS("Who is taking the photo?") + receiveSMS('Abby', 'A neighbour.');
			case 261:
				// SMS 261 immediately after
				return receiveSMS('Abby', 'Do you think the ladder is like a wooden horse? We do! I sent you my address, it is in the apartments on Celeste Rd. Come soon and have a ride!', 'abbysms2.jpg');
			case 262:
				// SMS 262 randomly at lunch time
				return receiveSMS('Abby', 'Love having lunch in the Park, people keep looking at me oddly when I chat with them', 'abbysms3.jpg');
				
		}
		return '';
	};
}
