/**********************************************
Emily Primrose
Town Hall HR staff
/***********************************************/

function initialiseEmily()
{
	addPerson("Emily", 0, "Emily", "LongSkirt", false);
	
	per.getPossessionFace = function() { return "!poledancea"; };
	
	per.whereNow = function()
	{
		if (this.place == 199) {
			if (isEvening()) return this.place;
			return 0;
		}
		if (!isShopOpen(0)) return 461;
		return this.place;
	};
	
	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		switch (this.getCharmedLevel()) {
			case 0:
				// Uncharmed
				return this.addPersonString("emily0n.jpg", "height:max%", "right") +
					"Emily is the new member of the HR team. She does seem a bit flirty, perhaps that is why your Mayor chose her for the role. The fiery red head is sitting in her office in a white shirt that barely contains her ample chest.";
			case 4:
				// Charmed
				return this.addPersonString("emily0c.jpg", "height:max%", "right") +
					"Your slave Emily is the Head of Town Halls HR team and will help hire new girls for your harem. The moment you enter the room she stands up and pulls a breast out of her shirt to greet you.";
		}
	};

	per.getPersonAddress = function() { return isPlaceKnown("EmilysApartment") ? 'Apartment 10, 42 Celeste Rd' : ''; };
	
	per.getNextDress = function(drs) {
		if (drs == "LongSkirt") return "Glasses";
		else if (drs == "Glasses") return "Cougar";
		return "LongSkirt";
	};
	
	per.getDress = function(drs) {
		if (Place == 199) return "Laundromat";
		return this.dress;
	};
	
	per.passTimeDay = function() {
		if (this.isCharmedBy() && isWeekDay()) this.dress = this.getNextDress(this.dress);
		return '';
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 461 && this.isHere() && sType === "") return this.showPerson("!home1.jpg", '', '', '', '', false, "string");
		else if (Place == 199 && this.isHere() && sType === "") return this.showPerson("emily1.jpg", '', '', '', '', false, "string");
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 461 && this.isHere()) {
			if (isVisible()) md.write('<p>Emily greets you, and invites you in, offering you anything you want, including her!</p>');
			else md.write('<p>Emily is doing some housework.</p>');
		} else if (Place == 199 && this.isHere() && sType === "") md.write('<p>You see Emily from the Town Hall is here doing her laundry.</p>');
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("!poledance", 3);
		addPlaceTitle(md, "Emily\'s Dance");
		md.write(
			'<p>Emily takes the stage dressed in a fishnet sort of dress, \'sort of\' as in it barely covers anything so she is hardly dressed!</p>' +
			'<p>Emily is not an experienced dancer but she is well endowed and entertains the audience well. She is a lot more focused on you than the general audience, dancing as your little slave-girl</p>' +
			'<p>After she collects her tips and offers them to you, but you know Jade has a performance fee for you, and besides, Emily needs the money for her dancing costumes!</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	per.showEvent = function()
	{
		var md;
	
		if (Place == 269 && sType == "emilypool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPersonRandom("!pool", 2);
			addPlaceTitle(md, "Swimming with Emily");
			md.write(
				'<p>Emily arrives, dressed in a red bikini, and she suggest you sit in the hot-tub to have a chat.</p>'			
			);
			startQuestions();
			addLinkToPlaceC(md, 'say goodbye to Emily', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 461) {
			// Emily's apartment
			if (sType == "emilyhomefuck") {
				// Fuck her at home
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRandomRorX("!home-sex", isExplicit() ? 3 : 2);
				else this.showPersonRandom("!home-sex", 2);

				addPlaceTitle(md, "Home with Emily");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>“Yes ' + perYou.getMaster() + '!” Emily says with glee</p>' +
						'<p>She immediately lays down on the lounge for you. You take her from behind and pound away until you are done.</p>'
					);
				} else {
					md.write(
						'<p>“Yes ' + perYou.getMaster() + '!” Emily says with glee</p>' +
						'<p>She immediately lays down on the lounge for you. You take her there until you both orgasm loudly.</p>'
					);
				}
				
				// Questions
				startQuestions();
				addLinkToPlaceC(md, '“I want more from you”', Place);
				addLinkToPlace(md, 'leave the apartment', 456);
				WritePlaceFooter(md);
				return true;
			} 	
			if (sType == "emilyhomebj") {
				// Fuck her at home
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRandomRorX("!home-bjb", isExplicit() ? 3 : 1);
				else this.showPersonRandomRorX("!emily-bj-female1", isExplicit() ? 1 : 2);

				addPlaceTitle(md, "Home with Emily");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>“Yes ' + perYou.getMaster() + '!” Emily says with glee</p>' +
						'<p>She immediately kneels down before you and takes your cock into her mouth.</p>'
					);
				} else {
					md.write(
						'<p>“Yes ' + perYou.getMaster() + '!” Emily says with glee</p>' +
						'<p>She immediately kneels down before you and enthusiastically licks and sucks on your pussy</p>'
					);
				}
				
				// Questions
				startQuestions();
				addLinkToPlaceC(md, '“I want more from you”', Place);
				addLinkToPlace(md, 'leave the apartment', 456);
				WritePlaceFooter(md);
				return true;
			} 				
		}
		
		if (Place != 99 && Place != 199) return false;
		
		if (sType == "meetemily1") {
			// Initial meeting
			md = WritePlaceHeader();
			this.showPerson("emily1n.jpg");
			addPlaceTitle(md, "Emily's Interview");
			md.write(
				'<p>Emily looks over to you as you enter the office. “Oh, so you are the new intern then?”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '“Yes, my name is ' + perYou.getPersonName() + '”', Place, 'type=meetemily2');
			addLinkToPlaceC(md, '“No, sorry my mistake”', 95, 'type=emilygone');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "meetemily2") {
			// Initial meeting 2
			md = WritePlaceHeader();
			this.showPerson("emily1n.jpg");
			addPlaceTitle(md, "Emily's Interview");
			md.write(
				'<p>“Oh, it is a pleasure to meet you ' + perYou.getPersonName() + '.” Emily says and smiles rather seductively. But then gets back to business. “Do you know what this job entails?”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '“No, actually I don\'t think this is for me”', 95, 'type=emilygone1');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmemily1") {
			// Charm Emily 1
			this.place = 99;
			md = WritePlaceHeader();
			setPlaceKnown("EmilyOffice");
			this.showPerson("emily2.jpg");
			addPlaceTitle(md, "Emily Under a Charm Spell");
			if (Place == 199) {
				md.write(
					'<p>You quietly say “Dai Chu Emily” and after many uses of this spell and the receptiveness of Emily\'s mind you feel your power quickly taking hold and decide to push on quickly.</p>' +
					'<p>“It is rather hot in this laundromat isn\'t it.” You say to her.</p>' +
					'<p>“Yes, it is rather. I hope you don\'t mind if I get a little more comfortable?” Her mind seems to take your suggestion very quickly and she releases her breasts from her shirt.</p>' +
					'<p>“Not at all.” you reply, very much enjoying her assets on show.</p>' +
					'<p>“Now...I need to check my laundry...” she attempts to continue but you interrupt with.</p>'
				);
				
			} else {
				md.write(
					'<p>You quietly say “Dai Chu Emily” and after many uses of this spell and the receptiveness of Emily\'s mind you feel your power quickly taking hold and decide to push on quickly.</p>' +
					'<p>“It is rather hot in this office isn\'t it.” You say to her.</p>' +
					'<p>“Yes, it is rather. I hope you don\'t mind if I get a little more comfortable?” Her mind seems to take your suggestion very quickly and she releases her breasts from her shirt.</p>' +
					'<p>“Not at all.” you reply, very much enjoying her assets on show.</p>' +
					'<p>“Now... about this intern position...” she attempts to continue but you interrupt with.</p>'
				);
			}
			startQuestions();
			if (Place == 199) addLinkToPlaceC(md, '“Not now, it\'s about the actual position I\'ll be taking!”', Place, 'type=charmemily2');
			else addLinkToPlaceC(md, '“Ah, that is not the actual position I\'ll be taking!”', Place, 'type=charmemily2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmemily2") {
			// Charm Emily 2
			md = WritePlaceHeader();
			this.showPerson("emily3.jpg");
			addPlaceTitle(md, "Emily Under a Charm Spell");
			md.write(
				'<p>“It\'s not?” She seems shocked placing a hand on top of her chest, not even realising her state of undress.</p>' +
				'<p>“No, I\'m going to be taking more of a leadership role. Mayor Thomas felt you are someone who needed a little instruction. I am someone who can provide that. For example if I instructed you to lift your skirt, I\'m sure you\'d do it without question” you say, forcing your power deeper into her mind.</p>' +
				'<p>“Well, yes... if that\'s how it\'s going to be, I suppose.” She says trying to rationalise as she does as she\'s told, she turns to the side and shows the garter holding up her stocking.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '“Now how about you sit down there and put that mouth to some use' + (perYou.isMaleSex() ? ' sucking my cock' : '') + '!”', Place, 'type=charmemily3');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmemily3") {
			// Charm Emily 3
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("emily-bj-male1", isExplicit() ? 2 : 1);
			else this.showPersonRandomRorX("!emily-bj-female1", isExplicit() ? 1 : 2);
			addPlaceTitle(md, "Emily Under a Charm Spell");
			md.write(
				'<p>The spell has fully taken hold now and she isn\'t even questioning your instructions.</p>'
			);
			if (perYou.isMaleSex()) {
				md.write(
					'<p>She sits down and pulls your cock out of your pants, at first she licks it, then quickly starts bobbing her head up and down, making sure to give attention to every inch!</p>' +
					'<p>“Now, if you are to be following my orders like a slave like this, what does that make me?” you ask her</p>' +
					'<p>She pauses from sucking your cock and looks up to you and says. “My... ' + perYou.getMaster() + '?”</p>'
				);
			} else {
				md.write(
					'<p>She sits down and pulls down your pants and panties, at first she enthusiastically licks your pussy and clit!</p>' +
					'<p>“Now, if you are to be following my orders like a slave like this, what does that make me?” you ask her</p>' +
					'<p>She pauses from licking your pussy and looks up to you and says. “My... ' + perYou.getMaster() + '?”</p>'
				);			
			}
			md.write(
				'<p>“That\'s right and that is what you\'ll call me from now on!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '“Now lay on the floor and I\'ll use you like the slave you are!”', Place, 'type=charmemily4');
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "charmemily4") {
			// Charm Emily 4
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("emily-sex-male1", 2);
			else this.showPerson("!emily-sex-female1a.jpg");
			addPlaceTitle(md, "Emily Under a Charm Spell");
			if (perYou.isMaleSex()) {
				md.write(
					'<p>“Yes ' + perYou.getMaster() + '!” she quickly lays down and takes off her panties while you lay down behind her and begin to take her as you see fit.</p>'
				);
			} else {
				md.write(
					'<p>“Yes ' + perYou.getMaster() + '!” she quickly lays down and takes off her panties while you lay down on her and begin to use her as you see fit.</p>'
				);				
			}
			md.write(
				'<p>Once you are done you get up and say to her.</p>' +
				'<p>“Now, I\'m sure Mayor Thomas can fill you in on your role here, but in short you will be finding new slaves for me!”</p>' +
				'<p>She simply responds “Yes, ' + perYou.getMaster() + '!”'
			);
			if (Place == 199) md.write('You nod and leave the laundromat.</p>');
			else md.write('You nod and leave the room.</p>');
			startQuestions();
			if (Place == 199) addLinkToPlace(md, 'leave the laundromat', 194);
			else addLinkToPlace(md, 'return to reception', 95);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "emilyfuck") {
			// Fuck her
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("emily-sex-male1", 2);
			else this.showPerson("!emily-sex-female1a.jpg");

			addPlaceTitle(md, "Emily");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>“Yes ' + perYou.getMaster() + '!” Emily says with glee</p>' +
					'<p>She immediately takes her panties off and lays down on the floor for you. You take her from behind and pound away until you are done.</p>'
				);
			} else {
				md.write(
					'<p>“Yes ' + perYou.getMaster() + '!” Emily says with glee</p>' +
					'<p>She immediately takes her panties off and lays down on the floor for you. You take her there until you both orgasm loudly.</p>'
				);
			}
			
			// Questions
			startQuestions();
			addLinkToPlaceC(md, '“I have more for you”', 99);
			addLinkToPlace(md, 'leave the office', 95);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "emilybj") {
			// Blowjob/Lick
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("emily-bj-male1", isExplicit() ? 3 : 1);
			else this.showPersonRandomRorX("!emily-bj-female1", isExplicit() ? 1 : 2);
			addPlaceTitle(md, "Emily");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>“Yes, of course ' + perYou.getMaster() + '!”</p>' +					
					'<p>Emily kneels down on the floor and begins sucking your cock with great care and attention.</p>'
				);
			} else {
				md.write(
					'<p>“Yes, of course ' + perYou.getMaster() + '!”</p>' +
					'<p>Emily kneels down on the floor and pulls down your pants and panties, and begins licking your pussy with great care and attention.</p>'
				);
			}

			// Questions
			startQuestions();
			addLinkToPlaceC(md, '“I have more for you”', 99);
			addLinkToPlace(md, 'leave the office', 95);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "emilytitfuck") {
			// Blowjob/Lick
			md = WritePlaceHeader();
			this.showPersonRorX("emily-tfa.jpg");
			addPlaceTitle(md, "Emily\'s Breasts");

			md.write(
				'<p>“Yes, of course ' + perYou.getMaster() + '!”</p>' +					
				'<p>Emily kneels down on the floor and takes your cock between her large breasts.</p>'
			);

			// Questions
			startQuestions();
			addLinkToPlaceC(md, '“I have more for you”', 99);
			addLinkToPlace(md, 'leave the office', 95);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "emilyangelathreesome") {
			// Threesome with Angela
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("!emilyangelab", isExplicit() ? 2 : 1);
			else this.showPersonRandom("!emilyangelag", 2);
			addPlaceTitle(md, "Emily and Angela");

			md.write(
				'<p>“Yes, of course ' + perYou.getMaster() + '!” and she calls Angela. A couple of minute later Angela steps into the office looking uncertain, but she seems Emily removing her clothing and you gesturing for her to come in. With that she understands what Emily wanted or to be more accurate what you wanted.</p>' +
				'<p>Emily embraces Angela and whispers "I have always wanted to do this with you" and starts to seductively remove Angela\'s clothing ready for you to receive their devotion and passion.</p>'
			);

			// Questions
			startQuestions();
			addLinkToPlaceC(md, '“I have more for you”', 99);
			addLinkToPlace(md, 'leave the office', 95);
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if ((Place == 110 || Place == 176) && this.place === 0 && checkPersonFlag("Angela", 12) && sType === "" && isPersonHere("Mayor")) addQuestionC(md, 'ask Mayor Thomas about ' + per.getHisHer() + ' news', "Mayor", 9900);
		else if (Place == 110 && wherePerson("Emily") == 99 && !isPlaceKnown("EmilyOffice") && sType === "") addLinkToPlaceC(md, "tell Mayor Thomas to setup a meeting with Emily", 99, 'type=meetemily1');
		else if (this.isHere() && Place == 99 && this.isCharmedBy() && sType === "") {
			// Emily's Office
			if (this.checkFlag(4) && !isPlaceKnown("TammyOffice")) {
				if (wherePerson("Tammy") == 999) addLinkToPlaceC(md, 'ask about the attorney', 101, 'type=meettammy');
				else addLinkToPlaceC(md, 'ask about the attorney', Place, '', '"Sorry ' + perYou.getMaster() + ' she is due here Friday afternoon, she just visits for a time and lives in another city"', "Emily");
			}
			if (perYou.isMaleSex()) {
				addLinkToPlaceC(md, '“Let\'s Fuck”', Place, 'type=emilyfuck');
				addLinkToPlaceC(md, '"Suck my Cock"', Place, 'type=emilybj');
				addLinkToPlaceC(md, '“Titfuck me”', Place, 'type=emilytitfuck');
			} else {
				addLinkToPlaceC(md, '"Lick me"', Place, 'type=emilybj');
				addLinkToPlaceC(md, '“Let\'s Fuck”', Place, 'type=emilyfuck');
			}
			if (isCharmedBy("Angela") && wherePerson("Angela") == 95) addLinkToPlace(md, '"Call Angela to join us"', Place, 'type=emilyangelathreesome');
			this.addDancingLink(md, 'talk to Emily about dancing in the club',
				'You ask Emily about the Avernus club and being a good little slave and dancing there for you,</p>' +
				'<p>&quot;Of course ' + perYou.getMaster() + ' I will do anything you ask!&quot; and with that you call Jade to arrange a dance for Emily.'
			);
			if (!isPlaceKnown("EmilysApartment")) {
				addQuestionR(md, 'ask Emily where she lives',
					'"Oh, ' + perYou.getMaster() + ', it is apartment 10 at the Celeste Apartments, please come and visit any evening!"',
					'Emily',
					"setPlaceKnown(\\'EmilysApartment\\')"
				);
			}
			if (this.hoursCharmed() > 48 && !checkPersonFlag("Savanna", 2)) addLinkToPlace(md, 'Emily suggests hiring an intern', Place, 'type=internsav');
			
		} else if (Place == 461 && this.isHere() && sType === "") {
			// Emily's apartment
			addLinkToPlaceC(md, '"I want you!"', Place, 'type=emilyhomefuck');
			if (perYou.isMaleSex()) addLinkToPlaceC(md, '"I want you to suck my cock!"', Place, 'type=emilyhomebj');
			else addLinkToPlaceC(md, '"I want you to lick me!"', Place, 'type=emilyhomebj');
			this.addDancingLink(md, 'talk to Emily about dancing in the club',
				'You ask Emily about the Avernus club and being a good little slave and dancing there for you,</p>' +
				'<p>&quot;Of course ' + perYou.getMaster() + ' I will do anything you ask!&quot; and with that you call Jade to arrange a dance for Emily.'
			);
			this.addSleepLink(md, "bed Emily", "Sleeping with Emily",
				'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Emily to bed for the night.</b>',
				'!emily-bed1.jpg', true, '', '', '', "overflow-y:hidden"
			);
		}
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Emily's Office
			if (Place == 99 && this.isHere()) {
				CastCharmSpell("Emily", Place, 4, 'type=charmemily1');
				return "handled";
			}
			// Laundromat
			if (Place == 199 && this.isHere()) {
				CastCharmSpell("Emily", Place, 4, 'type=charmemily1');
				return "handled";
			}				
		}
		return "";		// do nothing
	};
	
	// Phone calls
	per.isPhoneable = function() {
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.isCharmedBy();
	};

	per.callThem = function()
	{
		if (Place == 269) {
			// Time for a swim
			gotoPlace(Place, 'type=emilypool');
			receiveCall('', 'You call Emily to invite her to join you at the pool for a swim, and she happily agrees' + (isShopOpen(0) ? ' she can get away from the office for a while.' : '.'));
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};

	per.addPersonPhoneCall = function() {
		if (!this.isCharmedBy()) {
			if (this.place != 1000) return false;
			if (this.hoursSince() > 24 && isEvening()) {
				// Laundromat SMS
				if (makeCall(true, 332)) this.place = 199;
			}
			return false;
			
		}
		if (!this.isHere() && !this.checkFlag(4) && this.hoursCharmed() > 12 && getDay(true) == "Fri" && isMorning()) {
			// Phone call about Tammy
			if (makeCall(false, "",
					'The call is from Emily at the Town Hall! You answer the call and she tells you,<br><br>' +
					'<b>Emily</b><br>' +
					'"' + perYou.getMaster() + ' the city has an attorney who visits to consult with the Mayor and other on legal matters. We do not have a lot of these so she only visits every friday and often only in the afternoon!<br><br>' +
					'I have just been asked to assign her an office for this afternoon. So come and see me and I will introduce you to her?"<br><br>' +
					'With that she has little more to say and with your permission she hangs up.'))
			{
				this.setFlag(4);
				addSMS(333);
				setTimeout("usePhone('sms')",10);
				return true;
			}
		}
		var hr = getHour();
		var no;
		if (this.hoursCharmed() > 72 && hr < 9) {
			if (!this.checkFlag(2)) {
				// First morning after charm, SMS
				if (makeCall(true, 330)) this.setFlag(2);
			}
		} else if (this.hoursCharmed() > 72 && hr > 19) {
			if (!this.checkFlag(3)) {
				// second morning after charm, SMS
				if (makeCall(true, 331)) this.setFlag(3);
			}			
		} else if (getDay(true) == "Sat" && isMorning() && Place != 461 && !this.checkFlag(5) && getCharmedLevel("Tammy") == 2) {
			if (makeCall(true, 335)) this.setFlag(5);
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		switch(id) {
			case 330:
				return receiveSMS('Emily', 'Good morning ' + perYou.getMaster() + '!', 'sms1.jpg');
			case 331:
				return receiveSMS('Emily', 'Good night ' + perYou.getMaster() + '!', 'sms2.jpg');
			case 332:
				return receiveSMS('Angela', 'Emily just texted, her washing machine broke and she is using the laundromat in town in the evenings. You could talk to her there!') + receiveSMS('Angela', 'This is the image she sent with her text.', 'sms3.jpg');
			case 335:
				return receiveSMS('Emily', perYou.getMaster() + ' I had Tammy over for a sleep-over last night!', 'sms4.jpg');
		}
		return '';
	};
}
