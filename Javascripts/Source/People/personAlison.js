/****************************************************************
Alison - Waitress @ Cafe (Weekend)
****************************************************************/

// Initialise
function initialiseAlison()
{
	// Alison
	addPerson("Alison", 0, "Alison", '', false);
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		return this.isCharmedBy() ?  "Alison, Your Fuckbuddy" : "Alison, Your Waitress";
	};
	per.getPersonNameShort = function() { return this.checkFlag(1) ? this.name : "the waitress"; };

	per.isPersonInfo = function() { return this.place != 435; };
	per.getPersonInfo = function() {
		var s = "<p>" + this.addPersonString((this.isCharmedBy() ? "alison2a" : "alison1a") + ".jpg", "height:max%", "right") + "Alison, the waitress of the Bavaria Hut who works the weekend shifts, ";
		if (this.isCharmedBy()) return s + "your fuckbuddy.";
		else return s + "the beautiful weekend idol of the restaurant.";
	};
	
	per.getPersonAddress = function() { return isPlaceKnown("AlisonsApartment") ? 'Apartment 20, 42 Celeste Rd' : ''; };	
	
	per.whereNow = function()
	{
		if (this.place === 0) return 0;		// Not encountered
		var d = getDay(true);
		if (this.isCharmedBy()) {
			if (d == "Sat" || d == "Sun") {
				// Weekend and working at the restaurant
				if (!isShopOpen(4, 0, true)) return 464;
				if (Place == 203) return Place;
				return this.place;
			} else if (d == "Tues" || d == "Thurs") {
				if (isShopOpen(4, 2, true) && getHour() > 11 && !this.checkFlag(2)) return 435;
			}
			return 464;
		} else {
			if (!isShopOpen(4, 0, true)) return 464;
			if (d != "Sat" && d != "Sun" && this.place != 435) {
				// Weekday and she is working at the restaurant
				return 464;
			}
		}
		if (Place == 203) return Place;
		return this.place;
	};

	per.isPlaceImageRight = function()
	{
		return Place == 435 && this.whereNow() == 435 && sType === "";
	};

	per.showPlaceImageRight = function(md)
	{
		if (this.place == 435) this.showPerson("alison0b.jpg");
		else this.showPerson("alison-gym1.jpg");
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		// new break ok after lunch
		if (getHour() == 12) this.setFlag(2, false);

		// Initial meeting at the Gym, on a weekday after meeting Jenny
		if (Place == 435 && this.place === 0 && getPersonOther("Jenny") > 0) {
			var d = getDay(true);
			if (d != "Sat" && d != "Sun") {
				this.place = 435;
				setPersonFlag("Jenny", 3);
				showPopupWindow("I Love Gyms",
					this.addPersonString("alison0a.jpg", "height:max%", "right") +
					"A really hot woman flashes you a smile as you are walking through the gym. She has a curvy figure and has a number of tatoos. She is older than you, but that does not matter, she is hot!<br><br>" +
					"You hear her singing, or maybe chanting something, it is in some sort of archaic language and is oddly compelling. There is something almost <b>nagical</b> about it.<br><br>" +
					"You take a step towards her but before you get close another young woman speaks to her,<br>" +
					'"Enough flirting sister, remember you have that interview for the weekend shift at the Bavaria Hut soon. You had better get the job, you can help me to \'meet\' that blonde hottie working there..."<br><br>' +
					"The woman looks annoyed at her friend and then smiles at you regretfully and shakes her head. She starts to work-out, wanting to finish her session before she has to leave for her appointment. You will have to see if she gets her new job."
				);
				return true;
			}
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;

		// Left the Gym after the initial meeting (and not knowing her name)
		if (this.place == 435 && Place != 435) this.place = 196;
		
		else if (Place == 269) {
			if (sType == "alisonpool") {
				WaitHereOnly(4);
				md = WritePlaceHeader();
				this.showPerson("alison-pool.gif");
				addPlaceTitle(md, "Swimming with Alison");
				md.write(
					'<p>Alison joins you wearing a lovely bikini and she sits down and asks, well tells you, "Hey cutie, model for me your sexy figure!". You plans were the other way round, but Alison always takes the lead, and it dord not matter really, so you make a play of posing for her.</p>' +
					'<p>She comments, "Nice, now how about I model for you but in something less...more naked"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Of course!"', Place, 'type=alisonpoolsex');
				addLinkToPlaceC(md, 'say goodbye to Alison', Place, '', 'Alison looks a bit annoyed that you do not take it further, and leaves you alone at the pool');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "alisonpoolsex") {
				md = WritePlaceHeader(false, isExplicit() ? '' : 'td-left-med');
				if (isExplicit()) this.showPersonX("alison-pool-sex.mp4");
				else this.showPerson("alison-pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Alison");
				md.write(
					'<p>You agree and your busty waitress seductively removes most of her bikini, ready for you for some more intimate games.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Alison', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		if (Place == 464) {
			if (sType == "alisonfuck") {
				// Sex scenes at her home
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPersonRandom("home-sex", 4);
				addPlaceTitle(md, "Fun with Alison");
				md.write(
					'<p>You enjoy yourself with Alison</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk more with Alison', Place);
				addLinkToPlace(md, 'exit the apartment', 456);
				WritePlaceFooter(md);
				return true;
			}

		}
		if (Place == 203 && this.isHere()) {

			if (sType == "bj" || sType == "fuck" || sType == "titsfuck") {
				// Sex scenes at the Restaurant
				this.setFlag(2);
				md = WritePlaceHeader(false, isExplicit() ? "" : "td-left-large");

				if (sType == "bj") {
					// Blowjob/lick
					if (perYou.isMaleSex()) {
						this.showPersonRandomRorX("alison6b", isExplicit() ? 2 : 1);
						addPlaceTitle(md, "An Energetic Chat");
						md.write('</p><p>You instead ask Alison to use her mouth to pleasure you. She eagerly agrees and she is not inexperienced and skillfully pleasures you until you release into her mouth. She happily swallows as the good slave she is.');
					} else {
						this.showPersonRandomRorX("alison6g", 2);
						addPlaceTitle(md, "An Energetic Chat");
						md.write('</p><p>You accept Alison\' suggestion and ask her to use her fingers and tongue to pleasure you. To your surprise and delight she appears quite skilled at this and you enjoy her attentions until you cry out your pleasure.');
					}

				} else if (sType == "fuck") {
					// Fuck (Male Only)
					this.showPersonRandomRorX("alison5b", isExplicit() ? 2 : 1);
					addPlaceTitle(md, "An Energetic Chat");
					md.write(
						'</p><p>You accept Alison\'s offer, and you energetically discuss matters of your cock and her pussy.</p>'
					);

				} else if (sType == "titsfuck") {
					// Tits Fuck (Male only)
					if (isExplicit()) this.showPerson("alison7b.jpg");
					else this.showPersonRandomX("alison7b", 2);
					addPlaceTitle(md, "An Energetic Chat");
					md.write(
						'<p>You ask Alison to play with her tits, but instead she plays with them around your cock, once again taking control, but you your considerable pleasure.</p>'
					);
				}
				md.write(
					'<p>Afterwards Alison chats with you on less sexual matters but she avoids discussing her mother or chants before she has to leave and return to work.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'exit the restaurant', 194);
				WritePlaceFooter(md);
				return true;

			} else if (sType == "chant") {
				// Learn the spell defences
				md = WritePlaceHeader();
				this.showPerson("alison2c.jpg");
				addPlaceTitle(md, "Alison\'s Chant");
				md.write(
					'<p>You ask Alison about the chant she used that she said her mother taught her. She looks at you with some mixed feelings,.</p>' +
					'<p>"If we must, I am sure there is something else we could be doing orally of more interest."</p>' +
					'<p>She avoids talking about her mother and instead just recites the chant to you as best as she can remember. She definitely has it a little garbled in places, the words are wrong so you have to concentrate on her words.</p>'
				);
				if (!perYou.canUseExperience(true)) {
					md.write(
						'<p>Trouble is you cannot quite work out what it should be. You just cannot concentrate with this beautiful woman in front of you, but probably it is more you are just not experienced enough with magic to work it out. Once you have practiced more with magic maybe you should return and try again.</p>'
					);

				} else {
					perYou.setFlag(18);
					perYou.extra[11] += 9;
					md.write(
						'<p>That is it, you have worked out the words and you think they are a way to summon mana you have to block a spell cast on you. It requires you to have a substantial reserve of mana, at least 20 points. What she actually said may of been a slight protection, or maybe she just did not have the mana before.</p>'
					);
					addComments("You now know how to protect yourself magically, as long as you have at least 20 mana");
				}
				md.write(
					'<p>Alison looks at you a little impatiently,</p>' +
					'<p>"Enough fucking around with this, let\'s actually fuck around! You want to pick how?"</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'exit the restaurant', 194);
				updateRightBar();
				WritePlaceFooter(md);
				return true;

			} else  if (sType == "charmalison1") {
				// Charm at Restaurant 1
				md = WritePlaceHeader();
				this.showPerson("alison3.jpg");
				addPlaceTitle(md, "Alison Under a Spell?");
				md.write(
					'<p>You cast the charm spell on Alison, and she just smiles brightly at you and says "Just a minute", and steps over to the bar. She exchanges a few words and you hear something about taking a break. A moment later a young man steps out the back and starts serving the tables.</p>' +
					'<p>Alison returns to you, takes you by the hand and leads you into a small room at the back. It is a brightly lit store area, but it also seems to double as a change room. There is a large couch there and she sits you down. As you do she rearranges her top, exposing her breasts. Alright, the spell must be affecting her and you start to tell her about how she dreams about submission as the start of making her your slave. Alison smiles and laughs,</p>' +
					'<p>"Very funny, we came here because I wanted to, now you are a cute ' + perYou.getSex() + ' and you like me. I like you, while I am not asking to date you, yet, for now let\'s be fuckbuddies. I have some free time and all this running around flashing my cleavage and panties at the customers really turns me on."</p>' +
					'<p>Ummm, what is happening, is she actually under the effects of the spell? Her eyes have changed, but she is not reacting otherwise, unless this offer of being fuckbuddies is part of the arousal the spell causes? You try to exert some control here and talk about being your girlfriend, how she wants to date you...and she interrupts,</p>' +
					'<p>"Look cutie, I barely know you but I want you. Don\'t put words in my mouth, but you are welcome to put something else there"</p>' +
					'<p>Well, this is strange, she is under the spell, you think, but your words mean nothing. She is though willing and ready to fuck your brains out...</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, "Alison starts to strip...", 203, 'type=charmalison2');
				WritePlaceFooter(md);
				return true;

			} else if (sType == "charmalison2") {
				// Charm 2
				md = WritePlaceHeader();
				this.showPerson("alison4.jpg");
				addPlaceTitle(md, "Alison Under a Spell, Probably");
				md.write(
					'<p>Alison stands, but doing do in such a way to show off her figure and her delicious ass,</p>' +
					'<p>"Don\'t get me wrong cutie, I\'m not some kind of nympho, it is just today has been particularly stimulating. I do not want to ride this issue of dating, I would prefer to be riding your ' + (perYou.isMaleSex() ? "cock" : "face") + ' now."</p>' +
					'<p>Right? The spell has affected her, she is just very resistant in some way. As you think this Alison looks at you,</p>' +
					'<p>"Come on cutie, if you are not turned on yet let me dance a little for you. Tell me about yourself a bit, the potted summary"</p>' +
					'<p>You tell her a little, your name, about your interest in Kurndorf and the cults and Alison brightly interrupts again,</p>' +
					'<p>"When I was a girl I loved that stuff, my Mum too, she always talked about occult stuff, but it was beyond me. Mental disciplines blah blah blah, psychic defences blah blah blah, save your virginity till marriage blah blah blah. I grew out of it once she...left...Anyway, enough for now, it\'s time!"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'Time you ask? "Time to fuck" she says', 203, 'type=charmalison3');
				WritePlaceFooter(md);
				return true;

			} else if (sType == "charmalison3") {
				// Charm 3 (end)
				this.setFlag(2);
				md = WritePlaceHeader(false, !isExplicit() ? 'td-left-large' : '');
				this.showPersonRandomRorX(perYou.isMaleSex() ? "alison5b" : "alison6g", isExplicit() ? 2 : (perYou.isMaleSex() ? 1 : 2));
				addPlaceTitle(md, "Alison Under a Spell-ish");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>Alison steps over and starts to pull down your trousers telling you "It\'s time to get to the point, your point cutie".</p>' +
						'<p>In short order you are unclothed enough and Alison mounts herself on you, riding you and fucking herself on you. While she is very skilled and it feels wonderful, she is firmly in control. At one point you try to exert some control yourself, but she moans "No, no, let me, I\'m the experienced older woman..."</p>'
					);
				} else {
					md.write(
						'<p>Alison steps over and starts to pull down your pants telling you "It\'s time to get to the nub of this matter, your nub cutie".</p>' +
						'<p>In short order you are unclothed enough and Alison hesitates, "Cutie, I am the experienced older woman, so let me show you some tricks. You can replay me another time". She plays with and licks you, and has you mount her face as she lick you urgently. Despite this or because of this, she is firmly in control of your passion and hers.</p>'
					);
				}
				md.write(
					'<p>A little before the end, both yours and hers, you hear her whisper some incoherent words, but to your surprise they sound like the strange words in the Book! Your attention is distracted from the words by urgent feelings...</p>' +
					'<p>Afterwards she is sitting straddling your lap and kissing you. You pull back and ask about the words,</p>' +
					'<p>"Those are a little chant my mother taught me, I am not sure what it was for, but it makes things really nice, doesn\'t it cutie?"</p>' +
					'<p>You have to agree and try to ask more but she kisses you and then stands and starts dressing, "I\'ve really got to get back to my shift. Come and visit for a another break anytime.". She gestures to a door, "You can take the side door if you want to avoid the crowd in the restaurant, see you!" She finishes dressing, flashes you a smile and returns to the restaurant.</p>' +
					'<p>Those words...did they protect her a little...she is definitely under the spell, but she is no lust-filled slave, well maybe lust-filled but the spell may not be responsible for that!</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'exit the restaurant', 194);
				WritePlaceFooter(md);
				return true;
			}

		} else if (sType == "alisoncatherine1" || (Place == 436 && checkPersonFlag("AdeleRoss", 6) && isWeekDay() && !isDay() && this.isCharmedBy() && !this.checkFlag(4) && sType === "")) {
			// Scene with Alison and Catherine - Enter House
			this.setFlag(4);
			setQueryParams("type=alisoncatherine1");
			var perAdele = findPerson("AdeleRoss");
			md = WritePlaceHeader();
			if (perAdele.isCharmedBy()) perAdele.showPerson("adele12.jpg");
			else perAdele.showPerson("adele6.jpg");
			addPlaceTitle(md, "Adele but no Catherine");
			if (perAdele.isCharmedBy()) {
				md.write(
					'<p>Adele is sitting reading as you enter the house, completely naked as you had ordered. She immediately puts her book down and stangs to pose for you. She gestures toward Catherine\'s room,</p>' +
					'<p>' + perYou.getMaster() + ' I am ready for your commands, but Catherine is currently enjoying herself with a friend, or a stranger most likely. She told me to join them but this is for you to choose, not her"</p>' +
					'<p>You can see she is still resisting Catherines advances, this is something you will have to address later.</p>'
				);
			} else {
				md.write(
					'<p>Adele is sitting reading a book as you enter the house. She waves to you, and says with a slight sound of frustration in her voice,</p>' +
					'<p>"If you are here to see Catherine she is currently \'entertaining\' a friend or more likely a stranger she picked up, <i>again</i>. It\'s her hobby, but I would of appreciated her not inviting me to join then..."</p>' +
					'<p>She glances towards Catherine\'s room and returns yo reading, but you see a flush on her cheeks.</p>'
				);
			}
			md.write('<p>You know Catherine will not mind if you watch, join in, or leave them alone.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'check Catherine\'s room', 438, "type=alisoncatherine2");
			if (perAdele.getCharmedLevel() == 4) addLinkToPlaceC(md, 'forget it and visit Adele\'s room', 439);
			addLinkToPlace(md, "forget it, leave the house", 37);
			WritePlaceFooter(md);
			return true;

		} else if (Place == 438 && sType == "alisoncatherine2") {
			// Scene with Alison and Catherine - Enter Catherine's Room
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson("alisoncatherine1a.jpg");
			addPlaceTitle(md, "Catherine and Alison");
			md.write(
				'<p>You quietly enter Catherine\'s room intending to check what is happening. Whle Catherine will not mind, whoever she is with might object to your presence. To your surpise you see Alison, she is in the process of stipping off Catherine\'s clothing. Catherine is enjoying herself and does not notice you but Alison does and calls out,</p>' +
				'<p>"Hi there Cutie! You know Catherine too?", Catherine looks over and says "' + perYou.getPersonName() + ' you also know Alison, is she one of yours or are you another of her fuckbuddies?"</p>' +
				'<p>You tell her "Both!" and Alison laughs,</p>' +
				'<p>"Well, whatever that means! So we all know each other, let\'s <i>know</i> each others brains out! Or if you want sit back and enjoy the show!"</p>' +
				'<p>It had not crossed your mind before, Alison and Catherine have a lot in common, both have a <i>very</i> healthy sex-drive and of course <b>you</b>. Well do you want to join them or watch these two beautiful women?</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'watch them', 438, "type=alisoncatherine3");
			addLinkToPlaceC(md, 'join them', 438, "type=alisoncatherine4");
			addLinkToPlace(md, 'leave them and the bedroom', 436);
			addLinkToPlace(md, 'leave them and the house', 37);
			WritePlaceFooter(md);
			return true;

		} else if (Place == 438 && sType == "alisoncatherine3") {
			// Scene with Alison and Catherine - Watch
			md = WritePlaceHeader();
			this.showPerson("alisoncatherine1b.jpg");
			addPlaceTitle(md, "Watching Catherine and Alison");
			md.write(
				'<p>You tell them that you would like to watch this time, and Alison shrugs,</p>' +
				'<p>"Your loss, jump in and grab some ass if you change your mond"</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave the bedroom', 436);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;

		} else if (Place == 438 && sType == "alisoncatherine4") {
			// Scene with Alison and Catherine - Join
			md = WritePlaceHeader(false, (perYou.isMaleSex() && isExplicit()) || !perYou.isMaleSex() ? 'td-left-large' : '');
			if (perYou.isMaleSex()) this.showPersonRorX("alisoncatherine1c.jpg");
			else this.showPerson("alisoncatherine1d.jpg");
			addPlaceTitle(md, "Joining Catherine and Alison");
			md.write(
				'<p>That is a no-brainer, you shed your clothes and join the beautiful pair.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave the bedroom', 436);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;

		} else if (Place == 435) {
			if (sType == "chant") {
				// Learn the spell defences
				md = WritePlaceHeader();
				this.setFlag(2);
				this.showPerson("alison-gym2.jpg");
				addPlaceTitle(md, "Alison\'s Chant");
				md.write(
					'<p>You ask Alison about the chant she used that she said her mother taught her. She looks at you with some mixed feelings,.</p>' +
					'<p>"If we must, I am sure there is something else we could be doing orally of more interest."</p>' +
					'<p>She avoids talking about her mother and instead just recites the chant to you as best as she can remember. She definitely has it a little garbled in places, the words are wrong so you have to concentrate on her words.</p>'
				);
				if (!perYou.canUseExperience(true)) {
					md.write(
						'<p>Trouble is you cannot quite work out what it should be. You just cannot concentrate with this beautiful woman in front of you, but probably it is more you are just not experienced enough with magic to work it out. Once you have practiced more with magic maybe you should return and try again.</p>'
					);

				} else {
					perYou.setFlag(18);
					perYou.extra[11] += 9;
					md.write(
						'<p>That is it, you have worked out the words and you think they are a way to summon mana you have to block a spell cast on you. It requires you to have a substantial reserve of mana, at least 20 points. What she actually said may of been a slight protection, or maybe she just did not have the mana before.</p>'
					);
					addComments("You now know how to protect yourself magically, as long as you have at least 20 mana");
				}
				md.write(
					'<p>Alison looks at you a little impatiently,</p>' +
					'<p>"Enough fucking around with this, let\'s actually fuck around!"</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'exit the gym', 37);
				updateRightBar();
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "gymsex") {
				// Repeat sex in the gym
				this.setFlag(2);
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRandomRorX("alison-gym3b", 2);
				else {
					if (isExplicit()) this.showPersonRandomX("alison6g", 2);
					else this.showPersonRandom("alison-gym3b", 2);
				}
				addPlaceTitle(md, "An Energetic Break");
				md.write(
					'<p>You ask Alison if she is up for a break and she replies'
				);
				if (perYou.isMaleSex()) md.write(' looking at you groin,</p><p>"Sure cutie, as long as you are \'up\' as well!"</p>');
				else md.write(',</p><p>"Sure, anytime cutie!"</p>');
				md.write(
					'<p>You try to find a secluded area in the gym, though Alison does not really seem to care if anyone or everyone watched. You try to have her keep her cries of passion down, but it seems to encourage her to become more enthusiastic and \'pornstar\' like.</p>' +
					'<p>Afterwards, Alison gives you a kiss, "I have had plenty of a work-out, see you for another, here or at work!"</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'exit the gym after her', 37);
				WritePlaceFooter(md);
				return true;
			}
		}

		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("poledance", 2);
		addPlaceTitle(md, "Alison\'s Dance");
		md.write(
			'<p>Alison confidently takes the stage dressed in a metallic blue top and pants, little more than a bikini really. The music she picked is disco inspired and her clothes fit the theme well, at least for the time she is still wearing them.</p>' +
			'<p>She does an exciting strip-tease and erotic dance after. She may not be as expert as some of the dancers here, but more than makes up for it with her figure, confidence and enthusiasm.</p>' +
			'<p>After she looks excited and really happy, promising to do this again, and promising to do you anytime!</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};

	per.passTimeDay = function() {
		this.setFlag(2, false);
		this.setFlag(8, false);
		return '';
	};

	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// At the Gym and she is present?
			if (Place == 435 && this.place == 435 && sType === "") {
				addComments("She is certainly cute, but what is her name again? The spell will not work if you do not know her name.");
				return "handled";		// Ignore any standard action otherwise
			}
			// At the Restaurant public area and she is present?
			if (Place == 196 && this.isHere()) {
				if (!isSpellKnown("Shielded Charm")) addComments("Don't cast the spell here.  Its too public.");
				else if (!this.checkFlag(1)) addComments("You do not know her name, so the spell will not work.");
				else CastCharmSpell("Alison", 203, 1, 'type=charmalison1');
				return "handled";
			}
			// At the Restaurant public area and she is present?
			if (Place == 203 && this.isHere()) {
				if (!this.checkFlag(1)) addComments("You do not know her name, so the spell will not work.");
				else CastCharmSpell("Alison", 203, 1, 'type=charmalison1');
				return "handled";
			}
		}
		return "";		// do nothing
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 203 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) return this.showPerson("alison2b.jpg", '', '', '', '', false, "string");
			return this.showPerson("alison1b.jpg", '', '', '', '', false, "string");
		}
		if (Place == 196 && this.isHere()) {
			// Alison is working at the Restaurant
			if (this.isCharmedBy()) return this.showPerson("alison2a.jpg", '', '', '', '', false, "string");
			return this.showPerson("alison1a.jpg", '', '', '', '', false, "string");
		}		if (Place == 464 && this.isHere() && sType === "") {
			// Alison at Home
			if (isPersonHere("Vampyre")) return this.showPersonRandom("home2", 2, '', '', '', '', 0, false, "string");
			return this.showPersonRandom("home1", 2, '', '', '', '', 0, false, "string");
		}		
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 203 && this.isHere()) {
			if (this.isCharmedBy()) {
				// Charmed - 'take a break'
				md.write(
					'<p>The back room is a small storeroom and break area, well lit with some large windows and a large couch/collapsible bed. Alison flashes you her bright smile and asks,</p>' +
					'<p>"Hi there ' + perYou.getPersonName() + ' did you want to have a chat, or me?"</p>' +
					'<p>She seems to have already decided your answer as she starts stripping off her clothing.</p>'
				);
				if (!perYou.checkFlag(18)) md.write('<p>You are reminded by the chant she used when you first...chatted...with her.</p>');
			} else {
				// Not charmed - 'there is a problem with this bratwurst'
				md.write(
					'<p>Alison asks you to step into a small backroom to discuss this out of the noise of the restaurant.</p>' +
					'<p>"Sorry about this ' + perYou.getPersonName() + ', here have a free replacement"</p>' +
					'<p>She gives you another bratwurst to replace the one you were given. She takes the old one and puts it way, probably in a bin.</p>'
				);
			}
		}
		else if (Place == 196 && this.isHere()) {
			if (this.isCharmedBy()) {
				// Charmed Alison
				md.write(
					'<p>You enter the Bavaria Hut and you notice Alison is waiting on customers, the restaurant is still busy.</p>' +
					'<p>When she sees you, she flashes you a bright smile, and joins you as soon as she finished her current order. She gives you a quick flash of her tits, and whispers to you, '
				);
				if (!this.checkFlag(2)) {
					md.write(
						'"I can take a quick break ' + perYou.getPersonName() + ' so we can have a chat, and maybe something else. The restaurant is so busy recently, let\'s go to the backroom."</p>'
					);
				} else {
					md.write(
						'"Sorry I can\'t take another break, I am allowed one in the morning and one in the afternoon. We can have a chat and you know another time"'
					);
				}

			} else {
				// Uncharmed Alison
				md.write(
					'<p>You enter the cafe and look around for a seat. The restaurant is very busy, they have some sort of promotion on and just about every table is full.</p> ' +
					'<p>The waitress approaches you from the front of the restaurant.</p>'
				);
			}

		} else if (Place == 435 && sType === "") {
			// Uncharmed
			if (this.place == 435) md.write('<p>The woman you almost met is just finishing up her work-out with her friend.</p>');
			else if (this.isHere()) md.write('<p>Alison is taking a break from her work-out, and she invites you to join her.</p>');
		} else if (Place == 464) {
			// Home
			if (isPersonHere("Vampyre")) {
				md.write('<p>Alison sees \'Lily\' follow you in and immediately starts to strip herself and \'Lily\'. Lilith says nothing but gives you a slight smile.');
				if (this.checkFlag(8)) md.write(' You have had them \'bite\' each other and while it is only part of a feeding you should hold off any more such play tonight.');
				md.write('</p>');
			} else md.write('<p>Alison is waiting for you to have some fun.</p>');
		}
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 203 && this.isHere()) {
			if (this.isCharmedBy() && (sType === "" || sType == "chant")) {
				if (sType != "chant" && !perYou.checkFlag(18)) addLinkToPlaceC(md, '"Ask about the chant"', 203, 'type=chant');
				if (perYou.isMaleSex()) {
					addLinkToPlaceC(md, '"You"', 203, 'type=fuck');
					addLinkToPlaceC(md, '"Your breasts"', 203, 'type=titsfuck');
					addLinkToPlaceC(md, '"Let\'s chat in a different way"', 203, 'type=bj');
				} else {
					addLinkToPlaceC(md, '"You"', 203, 'type=bj');
				}
			}
		} else if (Place == 196 && this.isHere()) {
			if (this.isCharmedBy()) {
				// Charmed Alison
				if (!this.checkFlag(2) && sType === '') addLinkToPlaceC(md, '"Have a break?"', 203);
			} else {
				// Uncharmed Alison
				if (sType === "" && !this.checkFlag(1)) {
					addPopupLinkC(md, 'talk to the waitress', "Your Waitress, Alison",
						this.addPersonString("alison0c.jpg", "height:max%", "right") +
						"As you approach you recognise the waitress as the young woman you saw in the Gym, so she did get the job!<br><br>" +
						'She smiles at you brightly, "We meet again, I am Alison and I will be your waitress, or at least I will be when a table opens up. I think table 6 will be free in 5 or 10 minutes. Why not take a seat at the bar and have a drink on the house while you wait"<br><br>' +
						"She is very cheerful and you think she is actually interested in you, or she is a very good waitress. Then again from the Gym before she did look interested, and interesting.<br><br>" +
						"You take a seat at the bar for a little, but ignore the offer of a drink, more thinking about other things Alison could offer you.",
						false, "setPersonFlag('Alison', 1);dispPlace();"
					);
				}
				else if (getPersonOther("Jenny") >= 3) addLinkToPlaceC(md, '"There was something wrong with the bratwurst I bought..."', 203);
			}
		} else if (Place == 435 && this.isHere() && this.isCharmedBy() && sType === "") {
			// Charmed and at the Gym
			if (sType != "chant" && !perYou.checkFlag(18)) addLinkToPlaceC(md, '"Ask about the chant"', Place, 'type=chant');
			addLinkToPlaceC(md, '"Alison, Let\'s take a break"', Place, 'type=gymsex');
			
		} else if (Place == 464 && this.isHere() && sType === "") {
			// Alison's apartment
			if (!this.checkFlag(8) && isPersonHere("Vampyre")) {
				addLinkToPlaceC(md, "let Lilith 'bite' Alison", Place, "type=bitealison");
				addLinkToPlaceC(md, '"Let\'s all bite each other"', Place, 'type=vampalisonthreesome');
			}
			addLinkToPlaceC(md, 'have some fun with Alison', Place, 'type=alisonfuck');
			this.addDancingLink(md, 'talk to Alison about dancing in the club',
				'You ask Alison about the Avernus club and about dancing there for you,</p>' +
				'<p>&quot;Sure cutie, it sounds like fun!&quot; and with that you call Jade to arrange a dance for Alison.'
			);
			this.addSleepLink(md, "bed Alison", "Sleeping with Alison",
				'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Alison to bed for the night.</b>',
				'bed1.jpg', true, '', '', '', "overflow-y:hidden"
			);
			if (isPersonHere("Vampyre")) {
				addSleepLink(md, "bed Alison and Lilith", "Sleeping with Alison and \'Lily\'",
					'<p style="position:absolute;left:10%;top:7%;cursor:pointer;font-size:1.1em;width:60%"><b>Since Lilith is here and you are feeling tired you decide to go to bed with Alison and also ask Lilith to join you. She does not sleep but can still join you in bed.<br><br>In the morning Lilith is gone<br>back to the crypt...</b>',
					findPerson("Vampyre").getImg('bedwithalison.jpg'), true, '', '', '', "overflow-y:hidden"
				);
			}
		}
	};

	// Phone calls
	per.isPhoneable = function() {
		// Can you call them?
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.isCharmedBy();
	};

	per.callThem = function() {
		if (Place == 269) {
			if (this.whereNow() == 196) WriteComments("You call Alison to invite her to join you at the pool for a swim, but someone else picks up and says Alison is busy serving customers and for you to call back later.");
			else {
				gotoPlace(Place, 'type=alisonpool');
				receiveCall('', 'You call Alison to invite her to join you at the pool for a swim, and she answers conifdently, "I\'d love to see you in your swimwear, I\'ll be there".');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};
	
	per.addPersonPhoneCall = function() {
		if (!this.checkFlag(3) && this.isCharmedBy()) {
			if (makeCall(true, 130)) this.setFlag(3);
		} else if (this.isCharmedBy() && !this.checkFlag(5) && this.whereNow() == 435) {
			if (makeCall(true, 131)) this.setFlag(5);
		} else if (this.isCharmedBy() && !this.checkFlag(6) && this.hoursCharmed() > 168 && !isShopOpen(4, 0, true)) {
			if (makeCall(true, 132)) {
				this.setFlag(6);
				setPlaceKnown("AlisonsApartment");
			}
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		if (id == 130) return receiveSMS('Alison', 'Hey cutie, like this picture I took on my last holiday!', 'alisonsms1.jpg');
		if (id == 131) return receiveSMS('Alison', 'Hey cutie, I\'m working out, I do a couple of times a week, why not join me and work up a sweat!', 'alisonsms2.jpg');
		if (id == 132) return receiveSMS('Alison', 'Hey cutie, I am at my apartment and feeling lonely, why not join me for some fun, Celeste apartments, apartment 20', 'alisonsms3.jpg');
		return '';
	};

}