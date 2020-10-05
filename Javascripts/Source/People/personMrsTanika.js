/************************************
Mrs Susan Tanika
************************************/
function initialiseMrsTanika()
{
	// Mrs Tanika
	addPerson("Mrs. Tanika", 0, "MrsTanika", "");
	per.getPossessionFace = function() { return "tanika-face"; };

	per.getPersonName = function(full) {
		if (full === true) return this.name;
		if (this.isCharmedBy()) {
			// if Charmed
			var clv = this.getCharmedLevel();
			if (clv == 4) return "Slave Tanika";
			if (clv == 3) return "Fuck-toy Tanika";
			if (clv == 2) return "Susan Tanika, your lover";
			return "Mrs. Tanika, your servant";
		} else return this.name;	// If NOT Charmed
	};
	per.getPersonNameShort = function() {
		if (this.isCharmedBy()) {
			// if Charmed
			var clv = this.getCharmedLevel();
			if (clv == 4) return "Slave Tanika";
			if (clv == 3) return "Fuck-toy Tanika";
			if (clv == 2) return "Susan Tanika";
			return "Mrs. Tanika";
		} 
		return this.name;	// If NOT Charmed
	};

	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		switch(this.getCharmedLevel()) {
			case 0:
				// Un-charmed
				return this.addPersonString("intro-uncharmed.jpg", "height:max%", "right") +
					"Mrs. Tanika, your math teacher, you do not really like her, she is a rather strict and standoff-ish teacher who seldom smiles. She has a body to die for but she is either uncaring or looks down on her students. Your friend Catherine once suggested she might get off on humiliating people, and be a closet dominatrix. Then again Catherine always assumes people are kinky, maybe she is right.";

			case 1:
			case 2:
				// Lover
				return this.addPersonString("intro-lover.jpg", "height:max%", "right") +
					"Mrs. Tanika, your math teacher, and now lover. She is still strict and stand-offish to others, but she is your lover now!";

			case 3:
				// Fuck toy
				return this.addPersonString("bedroom-slave.jpg", "height:max%", "right") +
					"Mrs. Tanika, once your math teacher and married woman, now she is your fuck-toy, a plaything to satisfy all your sexual desires.";

			case 4:
				// Slave
				return this.addPersonString("bedroom-slave.jpg", "height:max%", "right") +
					"Mrs. Tanika, once your math teacher, she is now your slave, utterly submissive to you, thinking only how to please you.";

		}
	};

	per.whereNow = function() {
		return !isDay() && !this.isCharmedBy() ? 0 : this.place;
	};

	per.passTimeDay = function() {
		if ((this.place == 46 || this.place == 45) && this.getCharmedLevel() == 2) {
			this.place = 242;
			if (Place == 46 && this.place == 46) return "<p>In the morning Mrs Tanika gives you a kiss and tells you she is off to work.</p>";
		}
		return '';
	};
	per.passTimeNight = function() {
		// Is she at the school and is your lover
		if (this.place == 242 && this.getCharmedLevel() == 2 && !this.checkFlag(4)) {
			this.place = this.checkFlag(2) ? 46 : 45;
			if (Place == 242) return "<p>As night falls Mrs Tanika leaves school for the day.</p>";
		}
		return '';
	};
	
	per.showEventPopup = function()
	{
		// Initial meeting in the Garage Office
		if (Place == 242 && this.isHere() && this.dress === "") {
			showPopupWindow("Someone is there",
				"<img src='Images/People/MrsTanika/Diana/intro-uncharmed.jpg' class='imgpopup' style='float:left;margin-right:5px' alt='Who' title='Slim'>" +
				"<img src='Images/People/MrsTanika/Katarina/intro-uncharmed.jpg' class='imgpopup' alt='Who' title='Large'>" +
				'<p>As you are about to enter the room you hear a voice, it sounds like Mrs. Tanika unfortunately...your least favourite teacher.</p>' +
				'<p>Then again you do admire her...' +
				addOptionLink("string", '&#8592; slim figure', "findPerson('MrsTanika').dress='Diana';dispPlace(242)", "chatblock", "width:30%;margin-left:35%") +
				addOptionLink("string", 'large breasts &#8594;', "findPerson('MrsTanika').dress='Katarina';dispPlace(242)", "chatblock", "width:30%;margin-left:35%"),
				'', '', true, true, true
			);
			return true;
		}
		return false;
	}
	
	per.showEvent = function()
	{
		var md, clv, mtn, type;
		
		if (Place == 40) {
			// Shower scenes
			if (sType == "showermrstanika") {
				md = WritePlaceHeader();
				this.showPerson("tanika-shower1.jpg");
				addPlaceTitle(md, "Shower Interrupted By Mrs. Tanika");
				md.write(
					'<p>You have barely finished undressing when Susan enters the room, towel in hand and seemingly ready to head straight for the shower herself.</p>' +
					'<p>“Oh!”</p>' +
					'<p>She tries to act surprised when she sees you, but keeps the expression up for a little too long and is absolutely not able to hide the hunger in her eyes, so you are sure that she knew you were in here from the start.</p>'
				);
				startQuestions();
				addLinkToPlace(md, "tell her to wait until you are done", Place, 'type=showermrstanikafinish');
				if (!isCharmed("Mom")) addLinkToPlace(md, "you can\'t really risk it here, for now", Place, 'type=showermrstanikarisk');
				if (this.getCharmedLevel() == 2) addLinkToPlace(md, "Ask her to come in", Place, 'type=showermrstanikajoinlover');
				else addLinkToPlace(md, "order her to come in", Place, 'type=showermrstanikajoinslave');
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showermrstanikafinish") {
				md = WritePlaceHeader();
				perYou.showPerson("shower.jpg");
				addPlaceTitle(md, "Showering Alone");
				md.write(
					'<p>Susan looks a little disappointed when you send her away, but you don\'t really have time for her right now.</p>' +
					'<p>You\'ll get a chance to have some fun with her another time.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'get out of the shower and dressed', 40);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showermrstanikarisk") {
				md = WritePlaceHeader();
				perYou.showPerson("shower.jpg");
				addPlaceTitle(md, "Risky...");
				md.write(
					'<p>You are already stretching your luck with Susan being here, and Mom is more than a little suspicious of her.</p>' +
					'<p<Without a lock on the door she might easily catch you two in the act and you don\'t want to deal with the fallout from that.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'get out of the shower and get dressed', 40);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showermrstanikajoinlover") {
				md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
				if (perYou.isMaleSex()) this.showPerson("tanika-shower2m.jpg");
				else this.showPerson("tanika-shower2f.jpg");
				addPlaceTitle(md, "Sharing the Shower with Susan");
				md.write(
					'<p>“Well, this is... quite the coincidence, is it?” Susan has already begun taking off her clothes before you were even able suggest it and is giving you her best bedroom eyes. “Do you mind if I... take a shower as well, my love?”</p>' +
					'<p>You, of course, do not mind at all and soon find yourself standing under a warm stream of water with Susan\'s naked body pressed against yours and her fingers traveling all over your skin.</p>' +
					'<p>You trade hot and steamy kisses with her, feeling up her ass, kneading ' + (perYou.isMaleSex() ? 'her breasts' : 'each others breasts') + ' and enjoying her fingers brushing over your ' + (perYou.isMaleSex() ? 'manhood' : 'womanhood') + '.</p>' +
					'<p>Neither of you reach a climax, but it was not what you were working towards to begin with. You enjoy your teachers newfound eagerness to please you and spend a lot more time in the shower than you had intended, though in your defense: Who wouldn\'t have?</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'finish the shower together and get dressed', 40);
				WritePlaceFooter(md);
				return true;			
			}	
			if (sType == "showermrstanikajoinslave") {
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRorX("tanika-shower3m.jpg");
				else this.showPerson("tanika-shower3f.jpg");
				addPlaceTitle(md, "Sharing the Shower with " + this.getPersonName());
				var sf = this.getCharmedLevel() == 4 ? 'slave' : 'fuck-toy';
				md.write(
					'<p>Your ' + sf + ' quickly enters the bathroom, eyes kept downcast but trembling in anticipation as you order her to undress.</p>' +
					'<p>“You will be on ' + (perYou.isMaleSex() ? 'cocksucking' : 'pussylicking') + ' duty.” You explain calmly as you pull her into the shower and make her knee down in front of you. “Understood, my ' + sf + '?”</p>' +
					'<p>“Of Course, ' + perYou.getMaster() + '.”</p>' +
					'<p>Susan obediently moves into position and begins to tend to your cock, her lips eagerly wrapping around the shaft and her head starting to roll back and forth. She is still not the most experienced women when it comes to this, and the water running down her face surely doesn\'t help with her performance, but you certainly enjoy just how much control you have over your teacher in these situations.</p>' +
					'<p>As you are nearing the end, you decide to help her out a little by placing one hand on her head and take a firm hold of her hair while you use the other ' + (perYou.isMaleSex() ? 'to jerk of your cock and shoot your load right into her face, watching as the water washes the white streaks away.' : 'stimulate your clit, locking her head in place as you push yourself over the edge and smear your juices all over her face.') + '</p>' +
					'<p>Susan even thanks you for doing so, and obediently stays behind when you order her to clean herself and the shower as you leave.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'leave the bathroom to let her work', 45);
				WritePlaceFooter(md);
				return true;			
			}				
			return false;
		}

		if (sType == "tanikaxxx") {

			clv = this.getCharmedLevel();
			var tn = this.getPersonNameShort();
			mtn = clv == 3 ? "your toy, Mrs. Tanika" : (clv != 4 ? tn : "your slave, Mrs. Tanika");
			var bSchool = this.place == 242;

			if (bSchool) {
				// At school
				md = WritePlaceHeader();
				this.showPerson("intro-lover.jpg");
				addPlaceTitle(md, tn + " In The Teacher's Lounge");
				// Description
				md.write('<p>' + capitalize(mtn) + ' stands, showing off her body for you.</p>');

			} else {
				// In your bedroom
				switch(clv) {
					case 1: 
						// Minimal (Teacher with benefits)
						md = WritePlaceHeader();
						this.showPerson("talk-minimal.jpg");
						addPlaceTitle(md, tn + " In Your Bedroom");
						md.write('<p>Your teacher kneels on the bed, making herself available to give her student a test.</p>');
						break;
					case 2: 
						// Lover
						md = WritePlaceHeader(false, 'td-left-large');
						this.showPerson("talk-lover.jpg");
						addPlaceTitle(md, tn + " In Your Bedroom");
						md.write('<p>' + tn + ' kneels on the bed, making herself available for her lover.</p>');
						break;
					case 3: 
						// Fuck-toy
						md = WritePlaceHeader();
						this.showPerson("talk-toy.jpg"); 
						addPlaceTitle(md, tn + " In Your Bedroom");
						md.write('<p>' + tn + ' kneels on the bed, making herself available for her ' + perYou.getMaster() + '.</p>');
						break;
					case 4:
						// Slave
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPerson("talk-slave.jpg"); 
						addPlaceTitle(md, tn + " In Your Bedroom");
						md.write('<p>' + tn + ' steps into the bathroom for a moment, and emerges partly bound with a gag and lies on the bed, making herself available for her ' + perYou.getMaster() + '.</p>');						
						break;
				}				
			}

			// Questions
			startQuestions();

			if (clv < 3) {
				// Lover
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'fuck her', Place, 'type=tanikafuck');
				addLinkToPlaceO(md, 'ask her to ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you'), Place, 'type=tanikabj');
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'ask her to fuck her breasts', Place, 'type=tanikatf');
			} else if (clv == 4) {
				// Slave
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'fuck your slave', Place, 'type=tanikafuck');
				addLinkToPlaceO(md, 'Have your slave orally service you', Place, 'type=tanikabj');
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'fuck your slave\'s tits', Place, 'type=tanikatf');				
			} else {
				// Fuck-toy
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'fuck your toy', Place, 'type=tanikafuck');
				addLinkToPlaceO(md, 'use your fucktoy&apos;s mouth', Place, 'type=tanikabj');
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'toy with your toy\'s tits', Place, 'type=tanikatf');				
			}
			// Both Tess and Mrs Tanika
			if (wherePerson("Tess") == 46 && !bSchool) {
				addLinkToPlace(md, "ask " + tn + " and Tess to work together for you", 170, 'type=tesstanikathreesome');
				addLinkToPlace(md, "ask " + tn + " and Tess to play with each other", 170, 'type=tanikatesssex');
			}

			if (clv == 2) {
				if (bSchool && this.checkFlag(4)) {
					addQuestionR(md, '"Why don\'t you visit me at home tonight?"',
						'You suggest that Susan could visit your home again tonight, and she smiles. "I\'d love to, see you there tonight"</p>',
						"MrsTanika",
						"setPersonFlag(\\'MrsTanika\\',4,false)"
					);
				} else if (!bSchool && !this.checkFlag(4)) {
					addQuestionR(md, '"Could you stop visiting at night for a while?"',
						'You apologies but ask that Susan stop visiting at night for a while, explaining that things are complicated and you may not be home often for a while. She is disappointed but agrees for now.</p>',
						"MrsTanika",
						"setPersonFlag(\\'MrsTanika\\',4)"
					);
				}
			}
			if (!isDay() && !bSchool) {
				mtn = clv == 3 ? "your toy, Mrs. Tanika" : (clv == 2 ? tn : "your slave, Mrs. Tanika");
				addPopupLinkC(md, "take " + mtn + " to bed for the night", "Bedding " + tn,
					'<img src="Images/' + this.getImg(clv == 3 ? 'bedb' : 'beda') + '.jpg" style="position:absolute;width:100%;bottom:0" alt="Tanika"></p>' +
					'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:50%">As you prepare to go to bed for the night you call ' + (clv == 2 ? ' ' : 'your ') + mtn + ' to join you. You are still surprised how sexy and passionate your once cold and distant teacher is.',
					true, "setQueryParams();sleepForNight(46)", false, "background-color:#48250F;color:white;top:10%;left:5%;width:85%;height:80%;padding:0"
				);
			}
			if (clv == 3) addLinkToPlaceO(md, 'finish playing with your toy', Place);
			else if (clv == 4) addLinkToPlaceO(md, 'finish talking to your slave', Place);
			else addLinkToPlaceO(md, 'finish talking to Mrs. Tanika', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "tanikafuck" || sType == "tanikabj" || sType == "tanikatf") {
			md = WritePlaceHeader();
			clv = this.getCharmedLevel();

			if (sType == "tanikafuck") {
				// Fuck
				if (perYou.isMaleSex()) this.showPersonRandomRorX("tanika8b", isExplicit() ? 4 : 1);					
				else this.showPersonRandomRorX("tanika8g", isExplicit() ? 4 : 2);

				if (clv == 3) {
					addPlaceTitle(md, "Fucking your Fuck-Toy");
					if (perYou.isMaleSex()) md.write('<p>You mount your fuck-toy, telling her how that now she is truly a cock-ornament and how great she looks. You then slap her ass and start to fuck her, concentrating on your own pleasure. As you are getting close to cumming, you feel your slut shudder in orgasm and that triggers your orgasm and cum hard into her pussy. As you pull out you tell her that she is a good cum-dump.</p>');
					else md.write('<p>You put on your strap-on and mount your new fuck-toy. Mrs. Tanika is clearly inexperienced with this and you tell her that she will have to get used to this and pleasing you in other ways. You find the strap-on is pleasurable and as you near your orgasm you hear Mrs. Tanika cry out her orgasm. This triggers you orgasm and you orgasm hard. As you remove your strap-on you tell Mrs. Tanika that she is a good toy.</p>');
				} else if (clv == 4) {
					addPlaceTitle(md, "Your slave Mrs. Tanika");
					if (perYou.isMaleSex()) md.write('<p>You mount your slave, and tell her how sexy she is. You then slap her ass and start to fuck her and she enthusiastically participates. She orgasms twice before you finally cum into her pussy. As you pull out you tell her that she is a good slave.');
					else md.write('<p>You put on your strap-on and mount your new slave. Mrs. Tanika is clearly inexperienced with this and you tell her you will teach her everything she needs to know as a good slave. You both orgasm close to each other, Mrs. Tanika looking relieved and you tell her she is a good slave!</p>');
				} else {
					addPlaceTitle(md, "Fucking Mrs. Tanika");
					if (perYou.isMaleSex()) md.write('<p>You move behind Mrs. Tanika and caress her ass, and tell her how sexy she is. You then slap her ass and start to fuck her and she enthusiastically participates. She orgasms twice before you finally cum into her pussy. As you pull out she raggedly tells you that she loves you.');
					else md.write('<p>You put on your strap-on and move behind Mrs. Tanika and caress her ass. Mrs. Tanika is clearly inexperienced with this and you tell her you will teach her everything she needs to know. You both orgasm close to each other, Mrs. Tanika looking relieved and tells you that she loves you</p>');
				}
			} else if (sType == "tanikabj") {
				// Blowjob
				this.showPersonRandomRorX(perYou.isMaleSex() ? "tanika9b" : "tanika9g", perYou.isMaleSex() ? (isExplicit() ? 4 : 1) : 2);
				
				if (clv == 4) {
					addPlaceTitle(md, "Your slave Mrs. Tanika");
					if (perYou.isMaleSex()) md.write('<p>You tell your slave to give you a blowjob! She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth. Without a word from you she swallows.</p>');
					else md.write('<p>You tell her that she will now lick you to an orgasm. She kneels uncertain how to proceed and you sit down and give her instructions to service you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm. You tell her she is a good slave and that you will teach her and do better in future.</p>');
				} else if (clv == 3) {
					addPlaceTitle(md, "Your Toy Mrs. Tanika");
					if (perYou.isMaleSex()) md.write('<p>You tell her she is a cum-dump, and a cock-sucker and to demonstrate! She kneels and gives you a surprisingly expert blowjob and you cum hard in the sluts mouth. You tell your fuck-toy to swallow, and she does.</p>');
					else md.write('<p>You tell her she is a lesbian toy, and that she will now lick your to an orgasm. She kneels uncertain how to proceed and you sit down and give her instructions to service you. While she is inexperieced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm. You tell her she is a good fuck-toy and that she will have to learn and do better in future.</p>');
				} else {
					addPlaceTitle(md, "Mrs. Tanika's Oral Exam");
					if (perYou.isMaleSex()) md.write('<p>You ask Mrs. Tanika to give you a blowjob and with a slight frown she says "Alright I suppose this once.." She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth. You look at your surprising skilled teacher and watch her swallow with pleasure.</p>');
					else md.write('<p>You ask Mrs. Tanika to lick your pussy, and she looks a bit uncertain. She kneels and you sit down and give her some instructions. While she is inexperieced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm. You look at her and she is smiling a little awkwardly, not yet comfortable with this.</p>');
				}
			} else {
				// Titfuck
				if (perYou.isMaleSex()) this.showPersonRandomRorX("bedroom-sex-tf", isExplicit() ? 3 : 1);
				else this.showPerson("tanika8ga.jpg");
				
				if (clv == 4) {
					addPlaceTitle(md, "Your slave Mrs. Tanika\'s Tits");
					if (perYou.isMaleSex()) md.write('<p>You tell your slave to give you a tit-fuck! She kneels as you take out your cock and she rather expertly put it between her breasts and uses them to massage your cock until you cum all over her tits.</p>');
					else md.write('<p>You tell her that you want to play with her tits and she looks a little surprised as you put on your strap-on. She realises what you are ordering and she kneels before you and puts your plastic coc between her tits as if giving you a tit-fuck. She licks the dildo in preparation of you deciding to do something else with it...</p>');
				} else if (clv == 3) {
					addPlaceTitle(md, "Toying with Mrs. Tanika\'s Tits");
					if (perYou.isMaleSex()) md.write('<p>You tell her that you will now use her big tits to make you cum! She kneels and you push your cock between her tits and fuck them quickly until you cum over her face and tits. You tell your fuck-toy to lick it up, and she does.</p>');
					else md.write('<p>You tell her that you want to use her tits and she looks a little surprised as you put on your strap-on. She realises what you are ordering and she kneels before you and puts your plastic coc between her tits as if giving you a tit-fuck. She licks the dildo in preparation of you deciding to do something else with it...</p>');
				} else {
					addPlaceTitle(md, "Mrs. Tanika Up Close and Personal");
					if (perYou.isMaleSex()) md.write('<p>You ask Mrs. Tanika to give you a tit-fuck and with a slight frown she says "Alright I suppose I can.." She kneels and gives you a surprisingly expert tit-fuck and you cum hard over her tits. You look at your surprising skilled teacher and watch her lick your cum off her own tits with pleasure.</p>');
					else md.write('<p>You ask Mrs. Tanika to play a game with your strap-on and her tits and she looks a perplexed. She realises what you are asking and she kneels before you and puts your plastic coc between her tits as if giving you a tit-fuck. She licks the dildo in preparation of you deciding to do something else with it...</p>');
				}				
			}

			// Questions
			startQuestions();
			if (clv == 3) {
				addLinkToPlaceO(md, 'continue playing with your toy', Place, 'type=tanikaxxx');
				addLinkToPlaceO(md, 'finish playing with your toy', Place);
			} else if (clv == 4) {
				addLinkToPlaceO(md, 'continue talking to your slave', Place, 'type=tanikaxxx');
				addLinkToPlaceO(md, 'finish talking to your slave', Place);
			} else {
				addLinkToPlaceO(md, 'continue talking to Mrs. Tanika', Place, 'type=tanikaxxx');
				addLinkToPlaceO(md, 'finish talking to Mrs. Tanika', Place);
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "tanikatesssex" && (Place == 170 || Place == 46)) {
			// Event: Tanika/Tess Lesbian scene
			md = WritePlaceHeader();

			var sTanika = this.getPersonName();
			this.showPersonRandomRorX("tanikatess", 2);

			addPlaceTitle(md, "Tess and " + sTanika + " Playing Together");

			md.write(
				'<p>You ask Tess and ' + sTanika + ' to play with rach other for your pleasure. Tess looks a little uncertain, but responds "For you my love, anything".</p>' +
				'<p>' + sTanika + ' is not very experienced at this and confesses to seldom having sex with a woman before, and Tess is even more reserved. After a little while they get more involved and bring each other to orgasm.</p>');

			startQuestions();
			addLinkToPlace(md, "return to your bedroom", 46);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "tesstanikathreesome" && (Place == 170 || Place == 46)) {
			// Event: Tanika/Tess Threesome from your bedroom
			md = WritePlaceHeader();

			var sTanika = this.getPersonName();
			if (perYou.isMaleSex() && isExplicit()) this.showPersonRandomX("tesstanikathreesome", 4);
			else this.showPersonRandom("tesstanikathreesome", 2);

			addPlaceTitle(md, "Tess and " + sTanika + " Working Together");

			md.write(
				'<p>You ask Tess and ' + sTanika + ' to both pleasure yourself and each other. Tess looks a little uncertain, but responds "For you my love, anything".</p>' +
				'<p>The three of you play with each others bodies to many mutual climaxes. ' + sTanika + ' is not very experienced at this and confesses to only having sex with a single partner before. Tess is more reserved, more focused on you and your pleasure, her desires and thoughts only on you.</p>');

			startQuestions();
			addLinkToPlace(md, "return to your bedroom", 46);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place != 242) return false;
		
		if (sType == "charmmrstanika1") {
			md = WritePlaceHeader();
			this.setFlag(1);		// Implicitly done the introduction now
			
			this.showPerson("tanika4.jpg");
			addPlaceTitle(md, "Mrs. Tanika Under a Spell");
			md.write(
				'<p>You recite the spell while concentrating on Mrs. Tanika and she looks up at you annoyed. She is a rather strict and standoff-ish teacher who dislikes to be interrupted. She stands with the intention of disciplining you,</p>' +
				'<p>"Young ' + perYou.getManWoman() + ', who do you think you are doing here and interrupting my reading..."</p>' +
				'<p>Her voice trails off a little as the magic works itself into her mind and body, and she looks you up and down, appraising you. She recovers her demeanour and continues,</p>' +
				'<p>"Leave this room now! I want..need to be alone to...finish my paperwork."</p>' +
				'<p>You can see the arousal of the spell has swept through her quickly and she probably wants to try to relieve it herself. You could just leave her, the magic will still affect her and she will obey you in future. Then again this is your opportunity to completely control her.</p>'
			);

			startQuestions();
			if (perYou.checkFlag(26)) addLinkToPlaceC(md, '"You look troubled can I help you?"', Place, 'type=charmmrstanika2&ctype=help');
			addLinkToPlaceC(md, '"NO!" and slap her', Place, 'type=charmmrstanika2&ctype=dominate');
			addLinkToPlace(md, 'exit the teachers lounge', Place, 'type=charmmrstanikaleave');
			WritePlaceFooter(md);
			return true;			
		}

		if (sType == "charmmrstanika2") {
			// Event: Cast Charm on Mrs Tanika 2
			md = WritePlaceHeader();
			type = getQueryParam("ctype");
			if (type == "help") this.showPerson("tanika5.jpg");
			else this.showPerson("tanika5a.jpg");

			if (type == "help") addPlaceTitle(md, "Mrs. Tanika Under a Spell");
			else addPlaceTitle(md, "Dominating Mrs. Tanika With A Spell");

			if (type === "help") {
				md.write(
					'<p>Mrs. Tanika is a little confused by the magic coursing through her,</p>' +
					'<p>"Yes, I am feeling very <b>hot</b> and I very much would like you to help me with that"</p>' +
					'<p>She starts to open her white woolen top a little, and you step over to <i>assist</i> her and instead you open it completely and it starts to slip off her shoulders. She stifles a moan at your touch, and you ask if this is helping her and suggest that she needs more.</p>' +
					'<p>She openly moans as you lift her skirt, explaining it will allow you to help her a lot more.</p>'
				);
			} else {
				md.write(
					'<p>You have had enough of her attitude, she is a disciplinarian who enjoys punishing her students. You firmly tell her "No" you will not leave the room and you slap her while focusing on the spell and reciting it again. She staggers, but the slap was not that hard, she moans as the magic rushes through her more and more. You tell her,</p>' +
					'<p>"I am your ' + perYou.getMaster() + ' and you are mine to order as I like!"</p>' +
					'<p>You are a little surprised at your forcefulness here, it is more from your history with her and the stories you have heard about her. She says,</p>' +
					'<p>"I am <span style="font-size:small">...not...</span> yours to order around like a slut, a toy, a plaything"</p>' +
					'<p>She does not sound very certain, and you flip up her skirt and start spanking her and you tell her "Yes, you are!". She cries out, but not in pain, as her body shudders in orgasm.</p>'
				);
			}
			// Choices
			startQuestions();
			if (type === "help") addLinkToPlaceO(md, 'push her more', Place, 'type=charmmrstanika3&ctype=help');
			else {
				addLinkToPlaceC(md, 'tell her she is your slave', Place, 'type=charmmrstanika3&ctype=slave');
				if (perYou.checkFlag(26)) addLinkToPlaceC(md, 'tell her she is your fucktoy', Place, 'type=charmmrstanika3&ctype=fucktoy');
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmmrstanika3") {
			// Event: Cast Charm on Mrs Tanika 3
			type = getQueryParam("ctype");
			md = WritePlaceHeader();
			if (type == "help") this.showPerson("tanika6.jpg");
			else this.showPerson("tanika6a.jpg");

			if (type == "help") addPlaceTitle(md, "Mrs. Tanika Under a Spell");
			else if (type == "slave") addPlaceTitle(md, "Enslaving Mrs. Tanika With A Spell");
			else addPlaceTitle(md, "Mrs. Tanika, your Fuck-Toy");

			if (type === "help") {
				this.charmThem(2);
				md.write(
					'<p>You tell Mrs. Tanika that really what she is feeling is her love and desire for you and how much she must want you above and instead of <i>anyone</i> else,</p>' +
					'<p>"Yes, that is it, but it\'s wrong, I thought I loved my husband, but now I can only think of you"</p>' +
					'<p>She removes more of her clothing and spreads herself, offering herself to you blatantly.</p>');
			} else if (type == "slave") {
				this.charmThem(4);
				md.write(
					'<p>You tell her that she is your slave, who is utterly obsessed with you and will do absolutely anything for you. No-one and nothing else matters anymore in her life!</p>' +
					'<p>"You are my ' + perYou.getMaster() + ', my husband is nothing to me now and you are everything to me. Please take me!</p>');
			} else {
				this.charmThem(3);
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You tell her she is a cock-ornament, a cum-dump, a slut who&apos;s purpose is to provide you sexual pleasure! You tell her she will always be aroused and ready for your cock. To your surprise she smiles,</p>' +
						'<p>"I am your fuck-toy, my past life, my husband means nothing. Fuck me!</p>');
				} else {
					md.write(
						'<p>You tell her she is a lesbian toy, a slut who&apos;s purpose is to make you orgasm with tongue, fingers or body. You tell her she will always be aroused and ready for your strap-on or to lick you when ordered. A look of defiance passes over her face,</p>' +
						'<p>"I am a married woman, I am not a lesbian toy!"</p>' +
						'You order her, "Of course you are!" and she looks uncertain, but starts to smile.</p>');
				}
			}

			// Choices
			startQuestions();
			if (type === "help") addLinkToPlaceO(md, 'take her', Place, 'type=charmmrstanika4&ctype=take');
			else if (type == "slave") {
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'fuck your slave', Place, 'type=charmmrstanika4&ctype=fuck');
				else if (!perYou.isMaleSex() || (perYou.isMaleSex() && isExplicit())) addLinkToPlaceO(md, 'have your slave orally service you', Place, 'type=charmmrstanika4&ctype=bj');
			} else {
				if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'fuck your toy', Place, 'type=charmmrstanika4&ctype=fuck');
				if (!perYou.isMaleSex() || (perYou.isMaleSex() && isExplicit())) addLinkToPlaceO(md, 'use your fucktoy&apos;s mouth', Place, 'type=charmmrstanika4&ctype=bj');
			}
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "charmmrstanika4") {
			// Event: Cast Charm on Mrs Tanika 4
			type = getQueryParam("ctype");
			md = WritePlaceHeader();
			clv = this.getCharmedLevel();
			var bMan = perYou.isMaleSex();
			if (type == "take" || type == "fuck") {
				if (bMan) this.showPersonRandomRorX("tanika8b", isExplicit() ? 3 : 1);
				else this.showPersonRandomRorX("tanika8g", isExplicit() ? 4 : 2);
			} else this.showPersonRandomRorX(bMan ? "tanika9b" : "tanika9g", bMan ? (isExplicit() ? 4 : 1) : 2);

			if (type === "take") {
				// Lover charm
				addPlaceTitle(md, "Mrs. Tanika Under a Spell");
				if (bMan) md.write('<p>You explore Mrs. Tanika\'s, that is Susan\'s body and she experiences peak after peak of pleasure before you reach yours and pour your lust into her</p>');
				else md.write('<p>Mrs. Tanika, that is Susan is nervous and inexperienced but learns quickly how to pleasure another woman and herself in the process. To her surprise, she reaches multiple peaks of ecstasy before you achieve yours.</p>');
				md.write('<p>You ask Mrs. Tanika..Susan to remain here at school until you return for her.</p>');
			} else {
				// Slave/Fuck-toy charm
				if (clv == 4) addPlaceTitle(md, "Your slave Mrs. Tanika");
				else addPlaceTitle(md, "Fucking your Fuck-Toy");				
				if (type == "fuck") {
					// Fuck
					if (clv == 3) {
						if (bMan) md.write('<p>You mount your fuck-toy, telling her how now she is truly a cock-ornament and how great she looks. You then slap her ass and start to fuck her, concentrating on your own pleasure. As you are getting close to cumming, you feel your slut shudder in orgasm and that triggers your orgasm and cum hard into her pussy. As you pull out you tell her that she is a good cum-dump.</p>');
						else md.write('<p>You put on your strap-on and mount your new fuck-toy. Mrs. Tanika is clearly inexperienced with this and you tell her that she will have to get used to this and pleasing you in other ways. You find the strap-on is pleasurable and as you near your orgasm you hear Mrs. Tanika cry out her orgasm. This triggers you orgasm and you orgasm hard. As you remove your strap-on you tell Mrs. Tanika that she is a good toy.</p>');
						md.write('<p>You tell your fuck-toy to get dressed and to go to your home and wait in your bedroom.</p>');
					} else {
						if (bMan) md.write('<p>You mount your slave, a tell her how sexy she is. You then slap her ass and start to fuck her and she enthusiastically participates. She orgasms twice before you finally cum into her pussy. As you pull out you tell her that she is a good slave.');
						else md.write('<p>You put on your strap-on and mount your new slave. Mrs. Tanika is clearly inexperienced with this and you tell her you will teach her everything she needs to know as a good slave. You both orgasm close to each other, Mrs. Tanika looking relieved and you tell her she is a good slave!</p>');
						md.write('<p>You tell your slave to get dressed and to go to your home and wait in your bedroom.</p>');
					}
				} else {
					// Blowjob/lick
					if (clv == 4) {
						if (bMan) md.write('<p>You tell your slave to give you a blowjob! She kneels and gives you a surprisingly expert blowjob and you cum hard in her mouth. Without a word from you she swallows.</p>');
						else md.write('<p>You tell her that she will now lick you to an orgasm. She kneels uncertain how to proceed and you sit down and give her instructions to service you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm. You tell her she is a good slave and that you will teach her and do better in future.</p>');
						md.write('<p>You tell your slave to get dressed and to go to your home and wait in your bedroom.</p>');
					} else {
						if (bMan) md.write('<p>You tell her she is a cum-dump, and a cock-sucker and to demonstrate! She kneels and gives you a surprisingly expert blowjob and you cum hard in the sluts mouth. You tell your fuck-toy to swallow, and she does.</p>');
						else md.write('<p>You tell her she is a lesbian toy, and that she will now lick you to an orgasm. She kneels uncertain how to proceed and you sit down and give her instructions to service you. While she is inexperienced she has clearly received this sort of attention before and is able to bring you to a pleasant orgasm. You tell her she is a good fuck-toy and that she will have to learn and do better in future.</p>');
						md.write('<p>You tell your fuck-toy to get dressed and to go to your home and wait in your bedroom.</p>');
					}
				}
				// Relocate to your house
				this.moveThem(45);
				if (isDay()) md.write('<p>' + this.getPersonNameShort() + ' apologises and explains that she has duties here at school and asks if she can finish up here before obeying your order to go to your bed. You consider and decide it is best that she tidies up any of her business before assuming her duties of pleasuring you!. She thanks you and mentions also picking up some items at her home on the way, some items you will really like. She promises to be in your bed no later than this evening.</p>');
			}

			// Choices
			startQuestions();
			addLinkToPlace(md, "leave the Teacher\'s Lounge", 70);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "charmmrstanikaleave") {
			// Event: Cast Charm on Mrs Tanika - Leave
			md = WritePlaceHeader();
			
			this.showPerson("tanika7.jpg");
			addPlaceTitle(md, "Leaving Mrs. Tanika Alone");
			md.write(
				'<p>You leave Mrs. Tanika to deal with the spell. She will be affected by the spell but you have chosen to not try to reinforce or guide her so the effect will be minimal.</p>' +
				'<p>You leave the room and she closes the door quickly behind you but it was not closed properly and re-opens a little. Through the gap you see Mrs. Tanika has stripped off her clothing and is frantically masturbating. She comes to a shuddering, gasping orgasm, and you are sure you heard her say your name as she reached her peak.</p>' +
				'<p>She is panting from the exertion and she looks toward the door, you are not sure if she can see you or not, you think she can. Her fingers move back to her pussy as she starts to masturbate again and she looks you directly in the eyes. Again she quickly orgasms due to the power of the spell, and as she does she kicks the door and it closes.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "leave Mrs. Tanika for now", 70);
			WritePlaceFooter(md);
			return true;
		}
		
		return false;
	};
	
	
	per.showPersonTextHere = function(md)
	{
		if (this.whereNow() == 46 && (sType == "tessplaymore" || sType == "anitabj" || sType == "anitafuck")) md.write('<p>Susan always looks like she is taking mental notes when you are with someone else. Your ' + (this.getCharmedLevel() == 2 ? 'lover' : this.getCharmedLevel() == 4 ? 'slave' : 'fucktoy') +' is rather attentive, though you are not sure if she intents to learn something herself or will give lessons to your other women later.</p>');
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// In the teacher lounge
			if (Place == 242 && this.isHere()) {
				// Mayor is charmed so Tanika is here
				CastCharmSpell("MrsTanika", Place, 1, 'type=charmmrstanika1');
				return "handled";
			}
		}

		return "";		// do nothing
	};

}
