/****************************************************************
		Mom's Response Base

Introduction to Mother:

 Your mother is one of the most precious thing in your life, next to Tracy. They have always been the closest ones to you, not just because they’re family, but  they were always there for you and support you in anything. Mom is especially a real sweetheart, she even slapped a Mom on the face because she called you  "a weirdo who creeps out the other kids” at the playground years ago. You can’t really imagine what she would react if you would tell her that you can control other’s minds and emotions. One day you will have to do something about it, because you will rule this town and everyone in it and everyone will be your slave! Maybe that day isn’t really that far away? You do want to share the experience and joy with her, tough. You want her to relax and have fun after she’s  been working hard for 25 years, she deserves some rest. Maybe you could give her a couple of slaves to look after her needs, but first you have to make her believe what you are doing is right.


****************************************************************/
function RepliesMom(nR)
{
	var perMom = per;
	//var perGabby = findPerson("Gabby");

	if (nR == 2600)  //v26 = Mom's Response base
	{
		this.other = 1;
		addComments('"Hello honey.  How was your day today?" she asks, rolling her eyes slightly to let you know that her day wasn\'t one of her best.');
	}
	else if (nR == 2601)
	{
		AddCash(20);
		this.other = 2;
		addComments('"I suppose twenty ' + getCurrencyName() + ' is alright but you have to pay me back as soon as you get some more money."');
	}
	else if (nR == 2605)
	{
		this.other = 5;
		addComments('<p><i>You hand your shirt over and slip a new one on.</i></p><p>"These red stains look odd," says Mom. "I had better wash it straight away."</p>');
	}
	else if (nR == 2607)
	{
		AddCash(5);
		this.other = 9;
		if (!isPlaceKnown("ShoppingCenter")) setPlaceKnown("ShoppingCenter");	// Know the Shops to turn in the Letter of Credit
		addComments('"Sure, take five ' + (isBritish() ? 'pounds' : 'dollars') + ' but don\'t forget to bring back the change."');
	}
	else if (nR == 2610)
	{
		this.other = 11;
		AddCash(20);
		if (!isPlaceKnown("ShoppingCenter")) setPlaceKnown("ShoppingCenter");	// Know the Shops to turn in the Letter of Credit
		addComments('"You always ask for money. Here, take ' + sCurrency + '20 to buy some groceries at the shops and you can keep the change for the taxi."');
	}
	if (nR == 5210)
	{
		var perK = findPerson("OfficerKhan");
		perK.setPath(15);  // Set Cherly Khan as Shot by Anita
		setPersonOther("Anita", 12);  // Place Anita on the Park Pathway in an attempt to SHOOT YOU.
		addComments('<p>"Oh, I just heard from the news room at work! That poor policewoman was shot in the back by that crazy woman Anita.  I heard that she was last seen in the park running away from the scene of the crime. I am not sure if the Officer is alive she was in a critical condition when they found her."</p>');
	}
	if (nR == 2900) //v29 = Sarah Gates Normal Path
	{
		per.setFlag(8, false);
		if (wherePerson("Sarah") == 1) {
			if (isConspiracyPath()) movePerson("Sarah", 192); // Sets Sarah Gates (Sir Ronald's Niece in town)
			else movePerson("Sarah", 17); // Sets Sarah Gates (Sir Ronald's Niece in town)
		}
		if (getPersonOther("Sarah") === 0) setPersonOther("Sarah", 1); //  Make it so you can have Officer Batton withdraw police
		if (wherePerson("AdeleRoss") === 0) movePerson("AdeleRoss", 16);	// Set Gates Estate as Blocked (to protect Sarah)
		addComments('"Oh, have you heard about the Gates family? ' + perGates.getPersonNameShort() + '\'s niece arrived from out of town and is staying at the mansion. There is lots of excitement at the estate."<br>');
	}
	if (nR == 14460) //v144 = Demon Jesse Path
	{
		movePerson("Jesse", 6); //Place Jesse (Demon) @ the house
		addComments('"Oh yes, just a little bit ago.  She was so nice I told her to wait in the living room for you.", she says.<br>');
	}
	if (nR == 2620) // Murder path, no bank manager
	{
		this.setFlag(6);
		setPersonFlag("Kristin", 12);
		addComments('"Well...I suppose I can be a guarantor for you as long as you promise to make all payments from your part-time job" She says and then she calls the bank to arrange for an appointment for you. She tells you "No appointment is needed you can visit the manager anytime you need to apply, but this is a single try!"<br>');
	}

	return true;
}

// Mom specific functions
function IncreaseMomsArousal(no, evt)
{
	var perM = findPerson("Mom");
	// delay event by 5 turns
	if (perM.extra[0] == -1) return;
	if (no === undefined) no = 1;
	if (no == -1) {
		perM.extra[0] = -1;
		perM.setFlag(1, false);
		perM.setFlag(25);
	} else startTimedEvent("addMomsArousal(" + no + "," + evt + ")", 6);
}

function addMomsArousal(no, evt)
{
	var perM = findPerson("Mom");
	if (perM.extra[0] == -1) return;
	if (no === undefined) no = 1;
	perM.extra[0] += no;
	perM.setFlag(1);
	if (evt !== undefined) perM.setFlag(evt);
}


// Initialise
function initialiseMom()
{
	// Mom
	addPerson("Mom", 0, "Mom", '', false);
	per.Replies = RepliesMom;

	per.getPersonName = function(full) { return full === true ? "Mom" : "Your Mother"; };

	per.getPersonAddress = function() { return "16 Kollam St, Glenvale"; };

	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		if (this.getCharmedLevel() == 1) return this.addPersonString("mom37.jpg", "height:max%", "right") + "After all that had happened, you felt like it was the right choice to place Mom under your power as well. After all, she is now well protected from those who would want to take advantage of her, not to mention perfectly okay with whatever you do with your magic, including the charmed girls you bring home.</p><p>The two of you have yet to break the final taboo and become intimate, but she is clearly a lot less inhibited now. In fact, she went from just being unashamed of nudity to openly teasing and sometimes downright flirting with you and even Tracy, opting to often wear sexy outfits to work and little more than racy underwear inside the house, if anything all.";
		if (this.isCharmedBy()) return this.addPersonString("mom9-night.jpg", "height:max%", "right") + "After what your Mom’s been through it was the best for her to be brought under your power. You postponed the inevitable, but you knew since the beginning that you have to do this one day. It’s not that bad if you think about it; you have your mother, who’s always been a great Mom to you, ready to live her life fully. Not to mention that she’s a definite MILF and an experienced lover, she can bring love and tenderness only a mother can do to her child.</p><p>Your Mom is sitting comfortably in her chair in her bedroom. As you come across her room she drags you in and kisses you, after the full on mouth to mouth action she asks you how day’s going so far and slowly licks your ears seductively. She perfectly knows how to treat you!";
		return this.addPersonString("mom7-day.jpg", "height:max%", "right") + "Your Mom, Alexandra, she is a production manager at the local TV station.";
	};

	per.getArousal = function() { return this.extra[0]; };
	
	per.getPossessionFace = function() { return "mom6a"; };
	
	per.whereNow = function()
	{
		if (Place == 45 && getQueryParam("event") === "mombreakfast") return 45;
		return this.place;
	};

	per.passTimeDay = function() {
		if (this.checkFlag(26)) this.setFlag(20);
		this.setFlag(16, false);
		if (Math.floor(this.hoursCharmed("skip") / 24) >= 6 && this.checkFlag(19) && !this.checkFlag(32)) {
			if (!isCharmedBy("Gabby")) {
				if (!isMurderPath() && checkPersonFlag("Gabby", 7) && !checkPersonFlag("Gabby", 13)) return '';		// Waiting for the conference
				// Too late!
				this.moveThem(998);
				movePerson("Gabby", 998);
			}
		}
		return '';
	};
	
	per.passTimeNight = function() {
		if (this.checkFlag(14)) {
			if (this.place == 415) {
				this.place = 154;
				if (wherePerson("Gabby") != 347) movePerson("Gabby", 452);		// Return Gabby home
				if (Place == 45 || Place == 46) return 'You hear Mom return home from the T.V Station.';
			}
		}
		return '';
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (getQueryParam("event") === "mombreakfast") return this.showPersonString("mom30.jpg");
		return '';
	};

	per.showEventPopup = function()
	{
		// Mom helps with the taxi
		if (sType == "momtaxi") {
			AddCash(-10);
			showPopupWindow("Mom's Help",
				this.addPersonString(Place == 45 ? 'momtaxi2.jpg' : 'momtaxi1.jpg', "height:max%", "right") +
				'<p>You find a taxi and explain your lack of money and that your Mom has promised to pay for it on arrival. The driver looks uncertain but eventually agrees to taking you, but not before threatening calling the police if you do not pay!</p><p>You arrive ' +
				(Place == 45 ? 'home and Mom is waiting outside with a smile and she pays the taxi driver.' : 'at the TV Station and Mom is waiting for you in the parking lot, she pays the taxi driver and is clearly annoyed at being disturbed, unusually so!') +
				'</p><p>You apologise to Mom and make a note in your phone to pay her back as soon as you can. She gives you a kiss and ' + (Place == 45 ? 'returns inside your home' : 'heads back to work') + '.</p>'
			);			
			return true;
		}
		// Going to work?
		if (this.place == 154 && this.checkFlag(14) && getHour() > 7 && getHour() < 18) {
			var d = getDay(true);
			if (d != "Sat" && d != "Sun") {
				this.place = 415;		// At work now
				if (wherePerson("Gabby") != 247) movePerson("Gabby", 415);		// Gabby is there too
				if (sType === "" && (Place == 45 || Place == 46)) {
					// You see her leave (lounge room or your bedroom)
					WriteComments(this.addPersonFace() + "Mom gives you a kiss goodbye as she heads off to work");
					return true;
				}
			}
		}

		if (sType === "" && Place == 45 && !this.checkFlag(15) && getHour() >= 6 && getHour() < 8 && this.isCharmedBy() && isCharmedBy("Tracy")) {
			showPopupWindow("Mom's Breakfast",
				this.addPersonString("mom29.jpg", "height:max%", "right") +
				'<p>“Good Morning, hun!” Mom is up early and greets you wearing little more than a happy smile and some see-through lingery as you enter the kitchen.</p>' +
				'<p>“You\'ve been working so hard off late, Ive felt the least I could do is make sure you\'ll get a hearty breakfast each morning, so just sit down and let your Mother pamper you a little.”</p>' +
				'<p>She gives you a playful wink and turns around, leaning forward just enough to invitingly present her ass to you...</p>' +
				'<p>There are moments you just love being a ' + perYou.getWitch(true),
				"dispPlace(45,'event=mombreakfast')", '', true
			);
			this.setFlag(15);
			return true;			
		}
		
		if (sType == "momgabbyoffice2") {
			showPopupWindow("Mom and Gabby",
				findPerson("Gabby").addPersonString("gabby-mom10.jpg", "height:max%", "right") +
				'“' + perYou.getPersonName() + ' is right.” She states with a husky voice and begins to undress. “I\'m so horny I can barely work.”</p>' +
				'<p>“B... but...” Gabby stammers, taken aback by Mom\'s boldness.</p>' +
				'<p>“No buts!” Gabby\'s bra lands on the floor next to you. “The sooner we make each other cum the sooner we can get back to work.”',
				"dispPlace(Place,'type=momgabbyoffice3')", '', true
			);				
			return true;
		}
		if (sType == "momgabbyoffice3") {
			showPopupWindow("Mom and Gabby",
				findPerson("Gabby").addPersonString("gabby-mom11.jpg", "height:max%", "right") +
				'“Mom presses Gabby\'s head against her breasts before she is able to say anything else, and after a moment of hesitation, the smaller woman\'s tongue begins to play with her nipples.</p>' +
				'<p>“Your... ' + (perYou.isBornMale() ? 'Son' : 'Daughter') + ' is still watching us, Alex...” She whispers in-between licks, her body starting to tremble under Mom\'s firm touch.</p>' +
				'<p>“And it turns you on that ' + perYou.getHeShe() + ' does.”</p>' +
				'<p>That certainly was more of a statement than a question.',
				"dispPlace(Place,'type=momgabbyoffice4')", '', true
			);				
			return true;
		}
		if (sType == "momgabbyoffice4") {
			showPopupWindow("Mom and Gabby",
				findPerson("Gabby").addPersonString("gabby-mom12.jpg", "height:max%", "right") +
				'What little cloth still remained quickly flies into various corners of the room, and while Gabby refused to comment on Mom\'s last words, her silence probably says it all.</p>' +
				'<p>When Mom finally goes down on her, your presence seems almost forgotten safe for occasional glances into your direction.</p>' +
				'<p>Gabby spreads her legs widely to make sure you have a good view, and as Mom begins to playfully flick her tongue over her assistance\'s little nub you realize: she is good at this...</p>' +
				'<p>Mom never spoke about having other lovers than your father, but she is definitely not doing this for the first time. Her tongue is skilled, and she knows exactly where to touch and stimulate another woman to the point that Gabby has a hard time to not scream her pleasure into the room. Mom brings her to climax in record time and with a satisfied smile on her lips as she gives you a knowing wink.',
				"WaitHereOnly(3)", '', true
			);				
			return true;
		}
		
		if (Place == 371 && sType == "byesuitcase") {
			showPopupWindow("Mom",
				this.addPersonString("mom15.jpg", "height:max%", "right") +
				'This was... weird, to say the least. This isn\'t the first all-nighter Mom did during a busy week, and it\'s absolutely not like her to let it affect her. Not to mention, while she was always shameless when it came to her body, you don\'t recall her ever acting sexually or teasing towards you (Unlike Tracy).</p>' +
				'<p>And of course, the way she looked at Gabby didn\'t escape you either.</p>' +
				'<p>You are still contemplating what might be happening on your way to the reception area, but Nina catches your attention.</p>' +
				'<p>“And she\'s, like, making a huge fuss out of some people seeing ghosts, you know?”</p>' +
				'<p>“Yes! As if crazy people believing magic and ghosts and stuff is real are all that unusual in Glenvale... And now she\'s having the whole station in a buzz, keeping people on the field all day and...',
				'dispPlace(371,"type=byesuitcase2")'
			);
			return true;
		}
		
		if (sType !== "") return false;
		
		if (Place == 415 && Math.floor(this.hoursCharmed("skip") / 24) >= 5 && this.checkFlag(26) && !this.checkFlag(32)) {
			// Visit on the 5th day
			showPopupWindow("Mom",
				"<img src='Images/radio-corridor.jpg' class='imgpopup' alt='Hall'>" +
				'You knock on the door once, then twice and finally a third time before one of the studio staff notices you.</p>' +
				'<p>“The manager and her assistant are out today, something about having to do important preparations.”</p>' +
				'<p>It\'s strange, Mom didn\'t say anything about that, and when you ask where they are, he doesn\'t seem to know.</p>' +
				'<p>“Sorry, Miss Halliway tends to be secretive about these things, and of late she seems to have the manager wrapped around her finger so much she\'ll go along with everything, if you ask me.”</p>' +
				'<p>“They have always made sure to be back by nightfall before the studio gets closed to finish their work, though.”',
				'dispPlace(371)'
			);
			return true;		
		}

		if (this.checkFlag(25) && this.checkFlag(3) && !this.checkFlag(27)) {
			if (!isAtLocation(45) && getPersonOther("Sarah") > 0 && isCharmedBy("Tina")) {
				if (isMurderPath()) {
					var perKhan = findPerson("OfficerKhan");
					if (perKhan.getPath() >= 15 || isDavyDefeated())  this.setFlag(27);
				} else this.setFlag(27);
			}
		}

		// At home and visit her bedroom
		if (Place == 154 && this.isHere()) {
			// Introduction when you first 'meet' her in the game
			if (!this.checkFlag(10)) {
				this.setFlag(10);
				showPopupWindow("Mom",
					this.addPersonString((isDay() ? "mom1a-day" : "mom1a-night") + ".jpg", "height:max%", "right") +
					'Your mother Alexandra, Alex to her friends and Mom to you, is one of the most precious thing in your life, next to Tracy. They have always been the closest ones to you, not just because they’re family, but they were always there for you and support you in anything.</p>' +
					'<p>Mom is especially a real sweetheart, she even slapped another mom on the face because she called you  "a weirdo who creeps out the other kids" at the playground years ago.</p>' +
					//'You can\'t really imagine what she would react if you would tell her that you can control other’s minds and emotions. One day you will have to do something about it, because you will rule this town and everyone in it and everyone will be your slave! Maybe that day isn’t really that far away? You do want to share the experience and joy with her, tough. You want her to relax and have fun after she’s  been working hard for 25 years, she deserves some rest. Maybe you could give her a couple of slaves to look after her needs, but first you have to make her believe what you are doing is right.' :
					'You can\'t really imagine what she would react if told her about your quest for the spells in the Book. You do want to share the experience and joy with her, tough. You want her to relax and have fun after she’s been working hard for 25 years, she deserves some rest.'
				);
				return true;
			}
			if (perYou.isShot() && !this.checkFlag(12)) {
				// Mom greeting after you return home after being shot
				this.setFlag(12);
				perYou.setInjury(4);
				AddCash(5);
				showPopupWindow("Tracy Looks Worried",
					this.addPersonString("momshot1.jpg", "height:max%", "right") +
					'Mom looks like she has just got out of the shower, she just drops her towel and embraces you,</p>' +
					'<p>"' + perYou.getPersonName() + ' never do that again!", she is clearly upset, but you are a little distracted, she is after all completely naked. Then again she has little modesty around you and Tracy.</p>' +
					'<p>She lets you go and retrieves her towel, not covering herself but to start to dry herself off. As she does she asks you to tell her all about what happened. You do, well as much as you think you should...</p>' +
					'<p>When you finish Mom tells you "The police said that you were robbed before they found you...Here, take this ' + sCurrency + '5.00.  I know its not much, but at least you\'re not broke anymore."</p>'
				);
				return true;
			}
			// Futa reaction
			if (!this.checkFlag(39) && perYou.isFuta(true) && !perYou.isBornMale() && this.isCharmedBy() && sType === "") {
				this.setFlag(39);
				showPopupWindow("Mom and Your Changes",
					this.addPersonString("mom23.jpg", "height:max%", "right") +
					'You decide that it\'s best to prepare your mother for what she is about to see, explaining to her that your body has undergone a few changes of late, and making sure to point out that it\'s nothing she should be worried about.</p>' + 
					'<p>"Oh hunny." Mom listens to everything you say with a gentle, motherly smile, watching you as you undress. "Our bodies are always changing. It is perfectly normal and I\'m so happy that you feel comfortable coming to me with... What is that!"</p>' + 
					'<p>Mom\'s eyes widen in shock as you expose your newly formed, magical cock to her.</p>' + 
					'<p>"This is a... how can this...?"</p>' + 
					'<p>You try to calm her down, reminding her of her words that changes are normal, but she doesn\'t quite see it that way, now.</p>' + 
					'<p>"This is not a normal change. We have to get you to a hospital and...and..."</p><p>' +
					(perYou.FindItem(67) > 0 ?	'You take out the necklace and order her to look at it. The spell\'s hold on her mind is numbing any resistance, and with the familiar sight of the necklace you are able to put her into a  light trance faster than Gabby ever could.'
													 : 'Mom\'s voice trails off as you use the spell to increase her arousal and order her to look into your eyes. You may have forgotten Gabby\'s necklace, but with the spells hold on her mind and knowledge of her triggers, you can still put her into a light albeit fragile trance.') +
					'</p><p>"Everything is fine, Mom." You begin to speak in a calm voice. "Your daughter\'s new cock is nothing to be worried about."</p>' + 
					'<p>"Nothing... to be worried about." Mom repeats the words absentmindedly, empty eyes starring forward. "But..."</p>' + 
					'<p>"Your daughter has made a decision, and you are happy that she is happy with her new cock."</p>' + 
					'<p>"I am happy when she is happy with her new... cock..."</p>' + 
					'<p>You make her repeat both sentences several times, turning them into a mantra to be engraved into her spellbound mind.</p>' + 
					'<p>"My daughter\'s cock is nothing to be worried about. I am happy that she is happy."</p>' + 
					'<p>Mom repeats the words for one last time and smiles at you with a blissfully empty expression, having calmed down enough that you feel comfortable breaking the trance.</p>' + 
					'<p>Uh... what... I..." She is confused at first, her eyes only slowly regaining focus. "I may have spaced out... where were... oh right!"</p>' + 
					'<p>"Anyway, I am happy if you are happy with this change, hun, and if you ever need a way to..." Her eyes wander down to your half erect shaft. "...find release, just remember that Mommy is still here to help you, no matter how much your body may change."'
				);
				return true;
			}			
		}


		// Remaining events are all in the living room when Mom is at home
		if (Place != 45 || this.place != 154) return false;

		// Delivery for Mom to show Zoey and reference Mom's job
		if (!this.checkFlag(9) && isDay() && nFromPlace == 44) {
			showPopupWindow("A Delivery for Mom",
				findPerson("Zoey").addPersonString("zoey0b.jpg", "height:max%", "right") +
				'<p>As you approach your front door, you see a cute delivery girl knocking on the door' + (checkPersonFlag("Madison", 8) ? ', the same girl from before' : '') + '. You ask her what she wants and she turns,<br><br>' +
				'"Hello, I have a document package from the TV Station", your mother often gets some papers delivered to your home. For some reason the TV Station refuses to embrace the online world. The delivery girl asks you to sign for the package and hands it to you.<br><br>' +
				(isSpellKnown("Charm") ? 'Unfortunately the girl did not give her name and she is not wearing a name badge, so you cannot even consider trying to cast a spell on her, even if it was not quite so public here.<br><br>' : '') +
				'With her business done she leaves you, riding off on a small scooter towards the shopping center. You take the package inside to drop it off in your mother\'s room.',
				"setPersonFlag('Mom',9);dispPlace()"
			);
			return true;
		}

		// Events when you enter the living areas
		var bTracyHere = wherePerson("Tracy") == 45 || wherePerson("Tracy") == 156;
		var perTess = findPerson("Tess");
		var perTanika = findPerson("MrsTanika");
		var perAnita = findPerson("Anita");
		var perMiku = findPerson("Miku");
		// how many already here
		//var totpeople = perTess.place == 46 ? 1 : 0;
		//if (perTanika.place == 46) totpeople++;
		//if (perAnita.place == 46) totpeople++;
		// First meeting with Tess at home?
		if (perTess.place == 45 && !perTess.checkFlag(7)) {
			// Mom and or Tracy meets Tess
			showPopupWindow("",
				findPerson("Tess").addPersonString("tess21.jpg", "height:max%", "right") +
				"<p style='text-align:center;margin-top:-12px;font-size:x-large'><b>Tess with Mom" + (bTracyHere ? " and Tracy" : "") + "</b></p>" +
				'As you enter the ' + (nFromPlace == 44 ? 'front door of your home' : 'living room') + ', you hear some voices in conversation, your mother is talking to someone,</p>' +
				'<p>"...so your relationship with ' + perYou.getPersonName() + '"</p>' +
				'<p>"Yes, I love ' + perYou.getHimHer() + ' it was love at first sight!" and you recognise the voice as Mrs. Adams, that is Tess.</p>' +
				(bTracyHere ? '<p>"What do you see in my Little ' + (perYou.isBornMale() ? 'Bro' : 'Sis') + '?" you hear Tracy ask. Mom must have not heard Tracy clearly and quickly tells her "' +  perYou.getPersonName() + ' is not yours only!"</p>' : '') +
				'<p>Mom continues, "What about your husband? But more to the point, why should we let you have ' + perYou.getPersonName() + '?", Mom has an odd sound to her voice, but she must be teasing Tess, so you step in and say "Mom please go easy on Tess!"</p>' +
				'<p>Tess sees you and almost leaps to her feet in her happiness, and immediately trips over. You smile and help your beautiful klutz to her feet as your mother ' + (bTracyHere ? 'and Tracy watch' : 'watches') + '. Tess glances at her and to make a point embraces you and kisses you passionately.</p>' +
				'<p>Your mother tells Tess, "Well in that case you are welcome, visit any time you like", from her expression she seems to genuinely likes Tess.</p>' +
				'<p>Tess smiles at your mother and then looking you she says, "I will wait for you in your <i>bedroom</i>" and she leaves you with your mother. You mother looks at you and just says,<br><br>' +
				'"You are one lucky ' + perYou.getSex() + '"' +
				(bTracyHere ? '<p>Tracy adds "Unbelievably lucky!"</p>' : ''),
				"setPersonFlag('Tess',7);movePerson('Tess',46)"
			);
			return true;
		}
		if (perTanika.place == 45 && !perTanika.checkFlag(2) && !isDay()) {
			// Tanika here
			var clvT = perTanika.getCharmedLevel();
			// Commom part
			var s = perTanika.addPersonString((this.isCharmedBy() ? 'meetmomc' : 'meetmomu') + '.jpg', "height:max%", "right") + '<p>' +
				(bTracyHere ? 'When you enter the lounge room Tracy greets you, "You are in trouble little ' + (perYou.isBornMale() ? 'Bro' : 'Sis') + ', one of your teachers is here! It is Mrs. Ice Queen, she is in Mom\'s bedroom with her". She used a nickname she used for Mrs. Tanika back when she attended your school.' :
								  'You enter the lounge room and no one is there. You realise the noise is coming from your mothers\'s bedroom.') +
			  '</p><p>You step towards the bedroom and you hear your Mom say something angrily but before you get there the door opens and Mrs. Tanika and your mother step out. Mom looks annoyed but when she sees you she looks a little embarrassed,</p>' +
			  '<p>"' + perYou.getPersonName() + '! I was just..talking to your teacher...and...and she tells me that you promised that she could temporarily sleep here on our couch, something about an argument with her husband and how you offered. Really, you should ask me first, especially for <i>her</i>, I mean you should have asked!" she looks over at Mrs. Tanika. You remember in the past your mother had some arguments with Mrs. Tanika, some dispute when Mom was doing some volunteer work at the school. You would not be surprised it was just that they both have...forceful personalities. Mrs. Tanika smiles at you,</p><p>';

			if (clvT == 2) {
				// Lover
				s += '"Well, ' + perYou.getPersonName() + ' is a good student, except for ' + perYou.getHisHer() + ' grades, and I am sure I can tutor ' + perYou.getHimHer() + ' to repay, there are some ' + (perYou.isBornMale() ? ' particularly \'hard\' problems' : '\'oral\' quizzes') + ' I can help with"</p>' +
					'<p>Mom still looks annoyed but finally agrees and she retreats to her room' + (bTracyHere ? ' and Tracy chuckles and she goes into the kitchen to get some ice cream, asking if you want some too, but you are too distracted' : '') + '. Mrs Tanika leans over an whispers "I packed some lingerie, let me model them for you" and she heads over to your room.';
			} else {
				// slave
				s += '"' + (!perYou.isBornMale() ? 'Mistre..Miss' : 'Master...Mister') + ' ' + perYou.getPersonName() + ' is my best student and I am sure I can tutor ' + perYou.getHimHer() + ' however they want of me"</p>' +
					'<p>Mom still looks annoyed, and surprised at the "best student" bit, your grades are not really that good. At least Mom did not seem to notice your slave\'s odd turn of phrase and finally agrees before she retreats to her room' + (bTracyHere ? ' and Tracy looks curiously at Mrs. Tanika but she shrugs and goes into the kitchen to get some ice cream, asking if you want some too, but you are too distracted' : '') + '. Mrs Tanika leans over an whispers "' + perYou.getMaster() + ' I am yours, I will wait in your bedroom" and she heads over to your room.';
			}
			showPopupWindow("Mrs Tanika with Mom" + (bTracyHere ? " and Tracy" : ""), s, "setPersonFlag('MrsTanika',2);movePerson('MrsTanika',46)", "color:black;background-color:white");
			return true;
		}
		if (perAnita.place == 45 && !perAnita.checkFlag(9)) {
			// Mom and or Tracy meets Anita
			showPopupWindow("Anita with Mom" + (bTracyHere ? " and Tracy" : ""),
				perAnita.addPersonString("anita9c.jpg", "height:max%", "right") +
				'As you enter the ' + (nFromPlace == 44 ? 'front door of your home' : 'living room') + ', you hear your mother yelling,</p>' +
				'<p>"...What do you mean, you only answer to ' + perYou.getPersonName() + '! This is my house you little..."</p>' +
				(bTracyHere ? '<p>Tracy quick interrupts "What Mom means is what is your relationship with my Little ' + (perYou.isBornMale() ? 'Bro' : 'Sis') + '?". Mom quickly tells Tracy "That\'s not what I meant!"</p>' : '') +
				'<p>You quickly decide that you must get involved and call out to Mom, "Mom, let me explain!", as you frantically try to work out how to explain Anita. Anita of course just makes it worse,</p>' +
				'<p>"Commander, I am here as you ordered!", ' + (bTracyHere ? 'As one Mom and Tracy say' : 'Mom exclaims') + ' Commander, ordered?"</p>' +
				'<p>You look pointedly at Anita, "Anita, very funny. Mom, Anita is a bit of a nut about military things and gets carried away. We are just working together on a history project at school about...militia organisations in the 20th century. If it is ok can she overnight sometimes, her home is under going major renovations?"</p>' +
				'Mom looks at you suspiciously, but she reluctantly agrees. You can tell, she really dislikes Anita, you will have to take care to not give her an excuse to kick Anita out of the house.</p>' +
				(bTracyHere ? '<p>Tracy adds "I\'m sure you will be working together on an <b>organ</b>isation. Well Commander Little ' + (perYou.isBornMale() ? 'Bro' : 'Sis') + ', what are your orders?" and she laughs as she waves and goes into her room.</p>' : ''),
				"setPersonFlag('Anita',9);movePerson('Anita',46)", "background-color:white;color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;"
			);
			return true;
		}
		if (perMiku.place == 408 && perMiku.checkFlag(6) && !perMiku.checkFlag(20) && Math.floor((nTime - perMiku.charmedTime) / 12) > 24) {
			showPopupWindow("Miku with Mom" + (bTracyHere ? " and Tracy" : ""),
				perMiku.addPersonString("miku9.jpg", "height:max%", "right") +
				'It looks like Mom has been interrogating Miku for a while when you return home, and they are still in full swing.</p>' +
				'<p>“So,” you hear her voice from the living room. “You have been living with a friend who kicked you out and ' + perYou.getPersonName() + ' offered you to live in our attic so you don\'t have to move back in with your parents in Somerton?”</p>' +
				'<p>“That is correct, Ma\'am.”</p>' +
				'<p>“And you are not actually interested in each other?”</p>' +
				'<p>You hear Miku giggle. “Well, your ' + (perYou.isBornMale() ? 'son' : 'daughter') + ' is very attractive, as you surely know, but I believe that ' + perYou.getHeShe() + ' already has a lover, and I really need to focus on passing the final year and finding a source of income.”</p>' +
				'<p>There is a short pause in which you are sure your Mom gives Miku a scrutinizing look, but in the end, she sounds pleased.</p>' +
				'<p>“That is a very responsible attitude, Ms. Nakamoto.”</p>' +
				'<p>“Please, just call me Miku.”</p>' +
				'<p>“Well, Miku, Welcome to our home, and don\'t worry about the rent for now. We\'ll work something out.”</p>' +
				'<p>You enter the living room just as both of them are about to leave it, and Mom takes you aside for a moment.</p>' +
				'<p>“Your friend is really a well-behaved and polite young lady. I admit I had my doubts about her living here, but I think she will fit in just fine.”</p>' +
				'<p>You look to Miku, who smiles back to you, and wonder for a moment if Mom really spoke to the same girl you got to know... but at least there will be no problem with her living here...</p>' +
				'<p>Well, for now.',
				"setPersonFlag('Miku',20)"
			);
			return true;
		}

		return false;
	};
	
	per.showEventGabbysHome = function()
	{
		var md;
		var stage = getQueryParam("stage");
		
		if (sType === "" || sType == "freeingmom") {
			// memmerised Mom
			md = WritePlaceHeader();
			this.showPerson("mom16.jpg");
			addPlaceTitle(md, "Mom");
			md.write(
				'<p>Mom is calmly kneeing in Gabby\'s living room, her eyes vacant and her body unmoving, waiting for Gabby to return. She looks confused when she sees you instead, but otherwise barely acknowledges your presence.</p>' +
				'<p>You address her, and she reacts with an affirming hum, her voice calm and her mind open, it would be easy to just undo Gabby\'s programming now and return her, mostly, to her old self, on the other hand... her mind is completely defenseless now... and putting her under your spell would allow you to... protect her.</p>'
			);
			startQuestionsOnly();
			switch(stage) {
				case "": 
					addQuestionR(md, 'speak to her',
						'"Can you hear me, Mom?"</p>' +
						'<p>"...Yes."</p>' +
						'<p>Mom stirs as you address her, but remains in trance, her body swaying slightly.</p>' +
						'<p>"How do you feel?"</p>' +
						'<p>"I feel good. Very sexy... and submissive." She mumbles the words with a dazed smile, adding after a moment. "A sexy woman obeys her mistress, after all."',
						"",
						"setQueryParams(\\'type=freeingmom&stage=stage2\\')"
					);
					break;
				case "stage2": 
					addQuestionR(md, 'wake her up',
						'If you wake her up now Mom will still be Gabby\'s slave, and you don\'t really know if she\'ll allow you to put her under again.</p>' +
						'<p>Better to make sure she is either free of Gabby\'s influence or otherwise protected. ',
						"",
						"setQueryParams(\\'type=" + sType + "&stage=stage3\\')"
					);
					break;
			}
			addLinkToPlaceC(md, 'leave for now', 38);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "momnecklace" || sType == "momnecklacemaster") {
			// Freeing Mom
			md = WritePlaceHeader();
			this.setFlag(32);
			this.showPerson("mom16.jpg");
			addPlaceTitle(md, "Freeing Mom");
			md.write(
				'<p>Mom\'s attention focuses on the little trinket, her eyes following it\'s every move. “Mistresses Necklace...” Her lips form a dazed smile. ”Makes me feel... tingly.”</p>' +
				'<p>“It\'s mine now.” You explain. “Miss Halliway has become my ' + (getCharmedLevel("Gabby") == 4 ? 'Slave' : 'Lover') + ' and gave it to me.”</p>' +
				'<p>Mom\'s head rolls to the side, even more confused now.</p>'
			);
			startQuestionsOnly();
			
			if (sType != "momnecklacemaster") {
				startAlternatives(md);
				addLinkToPlaceC(md, '"I am your ' + perYou.getMaster() + ' now"', Place, 'type=momnecklacemaster', '“No, you are not.”</p><p>Well, that was a surprisingly firm answer for someone who is in a highly suggestible state of mind.</p><p>“I can not... with my own ' + (perYou.isBornMale() ? 'Son' : 'Daughter') + '. Would be... wrong.”</p><p>Mom\'s body stirs, and you notice a spark of awareness in her eyes. You consider pushing further, but the trance alone seems to not be enough to make her break that last taboo.');
				addLinkToPlaceC(md, '"Forget everything Gabby told you and be yourself again"', Place, 'type=momnecklacefree');
				endAlternatives(md);
			} else addLinkToPlaceC(md, 'leave for now', 38);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "momnecklacefree") {
			// Freeing Mom
			md = WritePlaceHeader();
			this.showPerson("mom16.jpg");
			addPlaceTitle(md, "Freeing Mom");
			md.write(
				'<p>You slowly swing the necklace from side to side in a steady rhythm, waiting for Mom\'s eyes to be completely focused on its movements.</p>' +
				'<p>“Things have changed, you do not desire Gabby, and you are not submissive to anyone.”</p>' +
				'<p>“But... A sexy woman obeys her mistress...” She repeats her mantra yet again, and you shake your head.</p>' +
				'<p>“A sexy woman does what she wants and has fun.”</p>' +
				'<p>“I\'d... like to have fun... again.” She smiles.</p>' +
				'<p>“That\'s right, you just focus on enjoying life, there is no need to submit to anyone for that, you are in charge.”</p>' +
				'<p>“I am in charge...” The last one seems to resonate especially well with her, as expected.</p>' +
				'<p>“You are... right... stupid to... forget that.”</p>' +
				'<p>“And you\'ll remind Gabby that you are in charge when you see her?”</p>' +
				'<p>“Yes, ' + perYou.getPersonName() + '. I am in charge I am a sexy woman in charge of her own life.”</p>' +
				'<p>Well, that must be days of mental reprogramming undone with a simple reminder just how much Mom likes to be on top.</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, 'count to three and wake her up', Place, 'type=momnecklacefree2');
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "momnecklacefree2") {
			// Freeing Mom 2
			md = WritePlaceHeader();
			this.showPerson("mom17.jpg");
			this.setFlag(14);
			addPlaceTitle(md, "Mom Freed");
			md.write(
				'<p>“Oh... I think I dozed off. Where...” Mom looks around in confusion, and quickly closes her blouse “' + perYou.getPersonName() + '? Why are you here?”</p>' +
				'<p>You tell her that Gabby has told you to check on her, and make up a story about how she was really tired and needed a quiet place to rest.</p>' +
				'<p>“Is that... so?” Mom obviously doesn\'t remember any of it happening. “The long times really must be getting to me, I better tell Gabby that I have to cut back a little.</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, 'sounds like a good idea', 38, '', '“I agree. But for now, I need to finish things up at work.” Mom rises to her feet. “Thank you for checking up on me, honey. I\'ll appreciate it.</p><p>You two trade kisses to the cheek and Mom walks out of the door with the promise to cook something nice for you and Tracy tonight.</p><p>You\'ll may have to come clear with her about what is happening sooner or later, and maybe find a way to protect her without, but for now, you are happy that she is still herself.</p><p>You follow her out of the house to check on other things.', '', "movePerson('Mom',154);movePerson('Gabby',452)");
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "momghcharm1") {
			// Charm 1
			md = WritePlaceHeader();
			this.showPerson("mom18.jpg");
			this.setFlag(1, false);
			this.setFlag(14);
			this.charmedTime = 0;		// Counter for the full version
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>Mom\'s body is twitching under the sudden surge of arousal building inside her, and your heart beats faster as she subtly shifts position to spread her legs some more.</p>' +
				'<p>“So... hot...”</p>' +
				'<p>It\'s working. Her back straightens, and her blouse slips down as she rolls her shoulders back to push her chest forward with an audible gasp, but she is still in trance, defenseless and acting completely on instinct.</p>' +
				'<p>“What... is happening?”</p>' +
				'<p>Her eyes focus on you, and even with her mind the way it is you can see the struggle between her growing desire and her subconscious telling her that something is very wrong, and maybe it is...</p>' +
				'<p>Maybe you should leave it at that.</p>' +
				'<p>She is protected against the likes of Gabby, Davy and Legion.</p>' +
				'<p>She will be very accepting of whatever you do with your magic.</p>' +
				'<p>There is no need to go any further, unless...</p>'
			);
			startQuestionsOnly();
			startAlternatives(md);
			addLinkToPlaceC(md, 'stop here, there are lines that should not be crossed', Place, 'type=momghcharmmin1');
			addLinkToPlaceC(md, 'go all the way', Place, 'type=momghcharmfull1');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;	
		}
		
		if (sType == "momghcharmmin1") {
			// Charm - Minimal 1
			md = WritePlaceHeader();
			this.charmThem(1);
			this.showPerson("mom19.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>You tell your Mom to not be alarmed. The last days have been stressful, and she just needs to relax.</p>' +
				'<p>“Relax...” Mom smiles, her posture easing up.</p>' +
				'<p>“That\'s right, you do not desire Gabby, and you do not desire me. You are not submissive to anyone.”</p>' +
				'<p>“A sexy woman obeys her mistress...” She repeats her mantra yet again, and you shake your head.</p>' +
				'<p>“A sexy woman does what she wants and has fun.”</p>' +
				'<p>“I\'d... like to have fun... again.” She smiles.</p>' +
				'<p>“That\'s right, you just focus on enjoying life, there is no need to submit to anyone for that, you are in charge.”</p>' +
				'<p>“I am in charge...” The last one seems to resonate especially well with her, as expected.</p>' +
				'<p>“You are... right... stupid to... forget that.”</p>' +
				'<p>“And you\'ll remind Gabby that you are in charge when you see her?”</p>' +
				'<p>“Yes, ' + perYou.getPersonName() + '. I am in charge I am a sexy woman in charge of her own life.”</p>' +
				'<p>Well, that must be days of mental reprogramming undone with a simple reminder just how much Mom likes to be on top.</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, 'count to three and wake her up', Place, 'type=momghcharmmin2');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmmin2") {
			// Charm - Minimal 2
			md = WritePlaceHeader();
			this.showPerson("mom27.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>“Oh... I think I dozed off. Where...” Mom looks around in confusion, not bothering to close her blouse. “' + perYou.getPersonName() + '? Why are you here?”</p>' +
				'<p>You tell her that Gabby has told you to check on her, and make up a story about how she was really tired and needed a quiet place to rest.</p>' +
				'<p>“Is that... so?” Mom obviously doesn\'t remember any of it happening, but it doesn\'t look like she is particularly bothered by it.</p>' +
				'<p>“Well, thanks for checking on me, I\'m feeling good... great even.” Mom smiles. “I think we are also nearing the end of our crunch, so I\'ll be home a bit more.”</p>'
			);
			startQuestionsOnly();
			addPopupLink(md, 'looking forward to it',  "Leaving",
				this.addPersonString("mom26.jpg", "height:max%", "right") +
				'“Me too. But for now, I need to finish things up at work.” Mom rises to her feet and begins walking towards the door as she is, only stopping when you remind her to close her blouse and pull up her pants.</p>' +
				'<p>“Oh right, we don\'t want anyone to see something naughty.” She gives you a... playful wink. “I\'ll see you at home tonight and make sure to cook something nice.',
				false, "movePerson('Mom',154);movePerson('Gabby',452);dispPlace(38)"
			);
			WritePlaceFooter(md);
			return true;				
		}
		
		if ((sType.indexOf("momghcharmfull") != -1 && this.charmedTime > 3 && !this.isCharmedBy()) || sType == "momghcharmfail1") {
			// Oops, crossed the line
			this.charmThem(1);
			setQueryParams("type=momghcharmfail1");
			md = WritePlaceHeader();
			this.showPerson("mom18.jpg");
			addPlaceTitle(md, "Too far - Mom Partly Under A Charm Spell");
			md.write(
				'<p>“No.”</p>' +
				'<p>Something is not right, Mom doesn\'t even allow you to finish speaking, and her eyes are no longer on the necklace.</p>' +
				'<p>“I know that it is common for teenagers to lust after their parents or siblings, but we can not go that far, no matter how much I... how much you want it.”</p>' +
				'<p>You pushed too hard. She has clearly broken the trance, and even in her highly aroused state, she manages to look at you sternly, blocking any attempt to explain yourself.</p>'
			);
			if (this.checkFlag(29)) md.write('<p>“No backtalk!” She interrupts you again. “You have your sister. I know how intimate you two have become, and I am willing to turn a blind eye to it, no matter how hot... I mean, how wrong it is what you two... do.” She shudders blissfully from the memory, but remains dead set in her ways. “But I am off limits your desires, understood?”</p>');
			else md.write('<p>“No backtalk!” She interrupts you again. “You have other girls around you, like that cute, sexy blonde who...” She trails off as if her mind remembers something for a second, pulling in her lower lip briefly before speaking on. “Who visited us.”</p><p>“But I am off limits your desires, understood?”</p>');
			md.write(
				'<p>“Yes Mom.”</p>' +
				'<p>It\'s the last word Mom is willing to speak of it. The spell clearly worked, you can feel the effect within her, but the time when you are able to influence her the most has passed and you doubt you can get her to break the last Taboo, now.</p>' +
				'<p>And maybe that\'s even for the best.</p>'
			);			
			startQuestionsOnly();
			addLinkToPlaceC(md, 'let her get dressed and ready to leave', Place, 'type=momghcharmfail2');
			WritePlaceFooter(md);
			return true;					
		}
		if (sType == "momghcharmfail2") {
			// Oops, crossed the line 2
			md = WritePlaceHeader();
			this.showPerson("mom26.jpg");
			addPlaceTitle(md, "Too far - Mom Partly Under A Charm Spell");
			md.write(
				'<p>Whatever hard feelings Mom may have are quickly forgotten. You tell her that Gabby has told you to check on her, and make up a story about how she was really tired and needed a quiet place to rest, and how you just found her the way she was.</p>' +
				'<p>Mom obviously doesn\'t remember any of it happening, but it doesn\'t look like she is particularly bothered by it.</p>' +
				'<p>“Well, thanks for checking on me, I\'m feeling good... great even.” Mom smiles. “I think we are also nearing the end of our crunch, so I\'ll be home a bit more.”</p>'
			);			
			startQuestionsOnly();
			addPopupLink(md, 'looking forward to it',  "Leaving",
				this.addPersonString("mom26.jpg", "height:max%", "right") +
				'“Me too. But for now, I need to finish things up at work.” Mom rises to her feet and begins walking towards the door as she is, only stopping when you remind her to close her blouse and pull up her pants.</p>' +
				'<p>“Oh right, we don\'t want anyone to see something naughty.” She gives you a... playful wink. “I\'ll see you at home tonight and make sure to cook something nice.',
				false, "movePerson('Mom',154);movePerson('Gabby',452);dispPlace(38)"
			);
			WritePlaceFooter(md);
			return true;					
		}
		
		var q1 = getQueryParam("q1");
		var q2 = getQueryParam("q2");
		var q3 = getQueryParam("q3");

		if (sType == "momghcharmfull1") {
			// Charm - Full 1
			md = WritePlaceHeader();
			this.showPerson("mom18.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>No, you want more.</p>' +
				'<p>You have to finally admit it to yourself: You didn\'t just cast that spell to protect her, you did it for the same reason you always do: You want to claim this woman as your own, dominate her mind and do things with her no ' + (perYou.isBornMale() ? 'son' : 'daughter') + ' should want to do with ' + perYou.getHisHer() + ' mother.</p>' +
				'<p>And why should you not? She is quite attractive and has never been shy about it around you, so it\'s only natural to desire her... right?</p>' +
				'<p>You let this thought rest in your head for a moment. Did you always have these... feelings and just never dared to act on them or did they develop recently after you have learned to use magic?</p>' +
				'<p>It doesn\'t mater, you have made your decision, and you will follow up on it, of course, that may be easier said than done.</p>' +
				'<p>Mom can be stubborn. She wants to always be in charge and incest is a big taboo to break through. You will need to choose your words a lot more carefully than you usually do.</p>'
			);
			startQuestionsOnly();
			if (q1 != "asked") addLinkToPlaceC(md, '"Everything is fine, just relax"', Place, 'type=momghcharmfull1&q1=asked&q2=' + q2 + '&q3=' + q3, '“Everything... fine... okay...” Mom smiles to you, her posture changing subtly.', 'Mom');
			if (q2 != "asked") addLinkToPlaceC(md, '”You want to do what I say.”', Place, 'type=momghcharmfull1&q1=' + q1 + '&q2=asked&q3=' + q3, '“No...” She says firmly. “I\'m not taking... orders... from.... my own kids.”</p><p>Even now she has to be in charge? Damn...', 'Mom', "findPerson('Mom').charmedTime++");
			if (q3 != "asked") addLinkToPlaceC(md, '"I want to fuck you, now!"', Place, 'type=momghcharmfull1&q1=asked&q2=' + q2 + '&q3=asked', '“What!?!” Mom\'s eyes rush open.</p><p>“You can\'t be serious young ' + (perYou.isBornMale() ? 'Man' : 'Lady') + ', you and I will have to... have to...</p><p>The pink glow in her eyes flares up, and she focuses her attention back on the necklace, slowly drifting back into her trance.</p><p>“...talk... later...”</p><p>That was too close, without the spell she would have surely woken up and even like this you know she\'ll be a lot more guarded against the idea of incest.</p><p>Brute force is not going to help you here.', 'Mom', "findPerson('Mom').charmedTime++");
			addLinkToPlaceC(md, '”I think you are very sexy, I could look at your body all day.”', Place, 'type=momghcharmfull2');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmfull2") {
			// Charm - Full 2
			md = WritePlaceHeader();
			this.showPerson("mom18.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>Mom blushes slightly. “Thanks, but you... shouldn\'t... It\'s wrong...” She stirs a little, but it doesn\'t look like she is waking up</p>'
			);
			startQuestionsOnly();
			if (q1 != "asked") addLinkToPlaceC(md, '"Id love to do a lot of “wrong” things with you"', Place, 'type=momghcharmfull2&q1=asked&q2=' + q2 + '&q3=' + q3, 'Mom\'s body twitches,.“No... not in this case... not with your own...” Her eyes are showing awareness, and you quickly roll back.</p><p>“It\'s alright, just relax, you will not have to do anything “wrong”, Mom.”</p><p>“Not do... anything wrong.... okay...”</p><p>Phew, that was close, you need to be more careful.', 'Mom', "findPerson('Mom').charmedTime++");
			if (q2 != "asked") addLinkToPlaceC(md, '”How can it be wrong when it feels so right?”', Place, 'type=momghcharmfull2&q1=' + q1 + '&q2=asked&q3=' + q3, '“Doesn\'t... feel right... feels wrong you should stop, I should...”</p><p>Mom attempts to cover herself, but you quickly interrupt her, telling her to focus back on the necklace and relax.</p><p>“I should... relax... not worry... A sexy woman is not ashamed of her body...”</p><p>That was a close call. You\'ll have to wear down her resistance first.”', 'Mom', "findPerson('Mom').charmedTime++");
			if (q3 != "asked") {
				if (this.checkFlag(28))	addLinkToPlaceC(md, 'So was watching me and Tracy”', Place, 'type=momghcharmfull3');
				else addLinkToPlaceC(md, '”I can\'t help it, you keep teasing me”', Place, 'type=momghcharmfull3');
			}
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmfull3") {
			// Charm - Full 3
			md = WritePlaceHeader();
			this.showPerson("mom18.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			if (this.checkFlag(28)) {
				md.write(
					'<p>“My beautiful children...” Her mind seems to drift off into the memory “So sexy... but... it wasn\'t right...”</p>' +
					'<p>“Should have stopped them...” She looks rather uncomfortable, so you proceed carefully.</p>' +
					'<p>“But you didn\'t, why not?”</p>' +
					'<p>“So... sexy... Had to... watch, had to...” Her blush deepens. “Touch myself.” She breathes in to calm herself. “I am... a bad mother. “</p>'
				);				
			} else {
				md.write(
					'<p>“I... I am...?”</p>' +
					'<p>“Yes, you keep showing off your sexy body around the house, how could I not desire you?”</p>' +
					'<p>“...” Mom is silent, contemplating your words.</p>' +
					'<p>“You are a sexy woman who is not ashamed of her beautiful body. It is only natural for me to want you.”</p>' +
					'<p>“...”</p>' +
					'<p>“I shouldn\'t... I\'m a bad mother...”</p>'
				);
			}
			startQuestionsOnly();
			if (q1 != "asked") addLinkToPlaceC(md, '”You are a great mother!”', Place, 'type=momghcharmfull3&q1=asked&q2=' + q2 + '&q3=' + q3, '“Thank you... but...” She hesitates.</p><p>“...but these feelings... they are.... wrong...”', 'Mom');
			if (q2 != "asked") addLinkToPlaceC(md, '"Sometimes it\'s good to be bad"', Place, 'type=momghcharmfull3&q1=' + q1 + '&q2=asked&q3=' + q3, '“No!”</p><p>That was surprisingly firm.</p><p>“Can\'t... shouldn\'t...”</p><p>This was clearly the wrong approach, you manage to calm her before she wakes up, but she is likely more guarded now.', 'Mom', "findPerson('Mom').charmedTime++");
			if (q3 != "asked") addLinkToPlaceC(md, '"Having needs is not \"bad\""', Place, 'type=momghcharmfull4');
			WritePlaceFooter(md);
			return true;				
		}

		if (sType == "momghcharmfull4") {
			// Charm - Full 4
			md = WritePlaceHeader();
			this.showPerson("mom18.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>You assure her that there is nothing wrong with what she feels, that she is a sexy, confident woman, and should not be worried if someone desires her, even if it\'s her own children.</p>' +
				'<p>“A sexy woman is not afraid to show off her sexuality...” She repeats another part of her Mantra with a smile.</p>' +
				'<p>“And it\'s okay if you return those feelings. It is only natural to be physically attracted to those you love, and you do love your children.”</p>' +
				'<p>“So... proud of them...” Mom has a wide smile on her lips. “Such good... kids...”</p>'
			);
			startQuestionsOnly();
			if (q1 != "asked") addLinkToPlaceC(md, '”Kids who have sexual needs their mother should fulfil”', Place, 'type=momghcharmfull4&q1=asked&q2=' + q2, '“What? No!” Mom stirs. “I don\'t... I won\'t...”</p><p>You pushed her too quickly, and if not for the charm muddling her thoughts and the necklace keeping her mind focused, she might even have awoken from her trance...</p><p>Better be more careful.', 'Mom', "findPerson('Mom').charmedTime++");
			if (q2 != "asked") addLinkToPlaceC(md, '“Kids who have become attractive grown-ups.”', Place, 'type=momghcharmfull5');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmfull5") {
			// Charm - Full 5
			md = WritePlaceHeader();
			this.showPerson("mom18.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>“...yes.” Mom hesitates before answering.</p>' +
				'<p>“Sexy, even. Just like their mother.”</p>' +
				'<p>“...”</p>' +  
				'<p>“Yes.”</p>' +
				'<p>“And it is not unnatural to be attracted to someone sexy, so there is nothing to be ashamed off.”</p>' +
				'<p>“No... It\'s not”</p>' +
				'<p>“Even if they are family.”</p>' +
				'<p>Mom stirs again, something in her still fighting the idea, but she agrees.</p>' +
				'<p>“No... being attracted to family... is nothing to be ashamed off.”</p>' +
				'<p>This feels like a breakthrough, maybe you can push her a little more.</p>'
			);
			startQuestionsOnly();
			if (q1 != "asked") addLinkToPlaceC(md, 'ask her to suck your ' + (perYou.isMaleSex() ? 'cock' : 'clit'), Place, 'type=momghcharmfull5&q1=asked&q2=' + q2 + '&q3=' + q3, '“I would never...!” Young ' + (perYou.isBornMale() ? 'Man' : 'Lady') + ', how can you even... think... that... ahhhh.”</p><p>You needed to intensify the effect of the spell to scatter her focus this time, and even as her eyes return to the swinging Necklace, they clearly show more awareness than before.', 'Mom', "findPerson('Mom').charmedTime++");
			if (q2 != "asked") addLinkToPlaceC(md, 'ask her to do a backflip', Place, 'type=momghcharmfull5&q1=' + q1 + '&q2=asked&q3=' + q3, 'Mom just stares at you in a mix of confusion and annoyance, and you have to admit that this was a really dumb joke.');
			if (q3 != "asked") addLinkToPlaceC(md, 'ask her to undress', Place, 'type=momghcharmfull6');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmfull6") {
			// Charm - Full 6
			md = WritePlaceHeader();
			this.showPerson("mom20.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>“Well... We are family...”</p>' +
				'<p>Mom removes her jeans and blouse, and while you have seen her naked many times, this time it is different.</p>' +
				'<p>She is actively posing for you, pressing her chest out and letting the straps of her bra fall down her shoulders, her eyes showing hints of her awareness returning, but also barely restrained desire.</p>' +
				'<p>“This is... more comfortable...”</p>' +
				'<p>“And Sexy.” You add.</p>' +
				'<p>“Yes... sexy...”</p>'
			);
			startQuestionsOnly();
			if (q1 != "asked") addLinkToPlaceC(md, '"You are a bit of an exhibitionist slut, are you not?"', Place, 'type=momghcharmfull6&q1=asked&q2=' + q2 + '&q3=' + q3, '“I am an exhibitionist...” Mom Stops mid sentence. “I am NOT a slut!”</p><p>Her eyes sharpen in outrage.</p><p>“How can you even say something like that to your own mother? I should.... should...”</p><p>“You should focus on the necklace, forget what I just said.”</p><p>“Focus... on necklace... forget...”</p><p>This was too close, you should have known that Mom reacts badly to being called a slut...', 'Mom', "findPerson('Mom').charmedTime++");
			if (q2 != "asked") addLinkToPlaceC(md, '"There is nothing as sexy as a woman who is not afraid to show her sexuality.."', Place, 'type=momghcharmfull5&q1=' + q1 + '&q2=asked&q3=' + q3, '“There is nothing as sexy as a woman who is not afraid to show her sexuality...” Mom calmly repeats this part her Mantra, falling a bit deeper back into her trance but not making any progress.');
			if (q3 != "asked") addLinkToPlaceC(md, '"Do you like it when me and Tracy look at your naked body?"', Place, 'type=momghcharmfull7');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmfull7") {
			// Charm - Full 7
			md = WritePlaceHeader();
			this.showPerson("mom20.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>There is a moment of hesitation before she answers.</p>' + 
				'<p>“Yes...”</p>' +
				'<p>“In fact you want them to, right? You like to feel sexy, to feel desired.”</p>' +
				'<p>“Yes.... but... I shouldn\'t...”</p>' +
				'<p>“Look at the necklace, and repeat it again: being attracted to family members is nothing to be ashamed off.”</p>' +
				'<p>“Being attracted to.... family is nothing to be ashamed off.”</p>' +
				'<p>“And it\'s only natural to desire more, to want to be closer.”</p>' +
				'<p>“Only natural... to want more... to be close.”</p>' +
				'<p>Her bra slips down, and you are pretty sure you nearly have her, only one final push.</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, 'show her that she wants more', Place, 'type=momghcharmfull8');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmfull8") {
			// Charm - Full 8
			md = WritePlaceHeader();
			this.showPerson("mom21.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>“I... not some... hussy lusting after her own ' + (perYou.isBornMale() ? 'Son' : 'Daughter') + '.... no matter how... attractive ' + perYou.getHeShe() + ' grew up to be.”</p>' +
				'<p>“But you are showing off to me now.”</p>' +
				'<p>“Just... more comfortable... I...”</p>' +
				'<p>“You have masturbated to the thought of me having sex with Jesse.”</p>' +
				'<p>“...” Mom is silent, but her underwear is stained by wetness and her breathing quick and erratic.</p>'
			);
			if (this.checkFlag(28)) {
				md.write(
					'<p>“You have watched me and Tracy, and it aroused you.”</p>' +
					'<p>“It... did...” Mom blushes heavily now.</p>'
				);
			}
			md.write(
				'<p>“You need to be true to your feelings, Mom. Your children are grown-ups, now, and just like you, they have needs and desires, just like you. And no one should be ashamed of their desires.”</p>' +
				'<p>“Yes... no one... should be ashamed... among family...”</p>'
			);
			startQuestionsOnly();
			if (q1 != "asked") addLinkToPlaceC(md, 'tell her she is a slave to your desires.', Place, 'type=momghcharmfull8&q1=asked&q2=' + q2, '“I am a slave to... what?!” Mom\'s eyes rush open.</p><p>“Young ' + (perYou.isBornMale() ? 'Man' : 'Lady') + ', this is not going to happen, I am... am... ahhh...”</p><p>You actually have to bring her close to orgasm this time to get her to calm down, and it takes you even longer to get her to focus back on the necklace. Just how did Gabby do this?</p><p>It may just be easier to get her to submit to her coworker than to her kids... after all, Mom always makes it clear she is in charge around the house...', 'Mom', "findPerson('Mom').charmedTime++");
			if (q2 != "asked") addLinkToPlaceC(md, 'assure her that she is in charge of her desires.', Place, 'type=momghcharmfull9');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmfull9") {
			// Charm - Full 9
			md = WritePlaceHeader();
			this.charmThem(4);
			this.showPerson("mom21.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>If there is one thing you know about Mom, it is that she is always in charge, at least around the house. She has to be, and you doubt that even the Dai Chu could change that, so this is the best angle to play.</p>' +
				'<p>She is in control, she has to think that she it is her desire to become intimate with her children, and maybe it even is.</p>' +
				'<p>“I am in charge... it is my decision to become... closer to my Kids.”</p>' +
				'<p>“As a Mother, you want to guide them and be there for them, help them understand their sexuality.”</p>' +
				'<p>“I want to... be there, help them... understand... sexuality...”</p>' +
				'<p>“And there is nothing wrong with it, it is only natural for family to be this close.</p>' +
				'<p>“Yes... only... natural... nothing... to be ashamed off...”</p>' +
				'<p>“Good, and now, as I count to three, you will slowly wake up. You will remember to have called me here, and that you decided to await me as you are now.</p>' +
				'<p>“Yes...”</p>' +
				'<p>“You will remember your desires and not be ashamed of them. You want your children to be happy, you want to fulfill their needs.”</p>' +
				'<p>“Fulfill... their needs...” Mom looks about ready to burst with arousal, and you begin your countdown.</p>' +
				'<p>One.</p>' +
				'<p>Two.</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, 'Three', Place, 'type=momghcharmfull10');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmfull10") {
			// Charm - Full 10
			md = WritePlaceHeader();
			this.showPerson("mom22.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>“' + perYou.getPersonName() + '?” Moms eyes snap back into focus, and she looks around in confusion. “Why am I naked in Gabby\'s house and... why are you here?”</p>' +
				'<p>“You called me here Mom, remember?” You do your best to play ignorant, Mom may be fully under the effect of the spell, as you can see in her eyes, but it\'s still best to let her take the initiative. “You said you needed me for something.”</p>' +
				'<p>“Right, of course I... wanted to talk to you.” Mom doesn\'t even seem to notice that you are shamelessly ogling her naked body. “I had... time to think in the last days, and I know you have become very sexually... active.”</p>'
			);
			if (this.checkFlag(28)) md.write('<p>“Not only with other girls, but also with your sister, which I... don\'t disapprove. Family should be able to share such things, after all.”</p>');
			md.write(
				'<p>You try to say something, but she shushes you. “Do not interrupt me, I have raised you better than that!”</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, '"Sorry Mom"', Place, 'type=momghcharmfull11');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmfull11") {
			// Charm - Full 11
			md = WritePlaceHeader();
			this.showPerson("mom23.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>“That\'s better.”</p>' +
				'<p>“As I was trying to say,” She takes off her panties as she speaks. “...it made me realize how I... never have spoken to both of you on matters of Sexuality. You are growing up so fast, and as a good mother I need to... help you understand these things.”</p>' +
				'<p>She approaches you with a seductive sway of her hip, her eyes full of lust as she moves closer.</p>' +
				'<p>“Now, undress, and no backchat!” As if you would even dream of it. “This may seem unusual, but I am your mother, and I know what is best for you.”</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, '"Yes, Mom"', Place, 'type=momghcharmfull12');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmfull12") {
			// Charm - Full 12
			md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : isExplicit() ? 'td-left-large' : '');
			if (perYou.isMaleSex()) {
				if (isExplicit()) this.showPersonX("mom24m.jpg");
				else this.showPerson("mom12b.jpg");
			} else if (isExplicit()) this.showPersonX("mom24f.jpg");
			else this.showPerson("mom12g.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			if (perYou.isMaleSex()) {
				md.write(
					'<p>A part of you can\'t believe that this is actually happening. Your own mother knees in front of you and sucks on your cock with a vigor you\'ve never seen from her. Engorging herself on your shaft and even forcing it deeply into her throat at one point, something you\'d have never imagined her knowing how to do.</p>' +
					'<p>“You\'ve grown into such a big ' + perYou.getSex() + ', hun.” She pulls back with a silent plop and guides you to lay down on your back. “Now just relax and let Mommy take care of you.”</p>'
				);				
			} else {
				md.write(
					'<p>A part of you can\'t believe that this is actually happening. Your own mother knees in front of you and licks your pussy with enthusiasm you\'ve never expected to see from her. Flicking her tongue skillfully over your clit, and caressing your folds with enough skill to make you wonder just how much experience with other women she must have kept secret from you and Tracy.</p>' +
					'<p>“You\'ve grown into such a beautiful woman, hun.” She places a last kiss to your little nub and pulls you off the couch. “Now just relax and let Mommy take care of you.”</p>'
				);
			}
			startQuestionsOnly();
			addLinkToPlaceC(md, 'lie down and follow her lead', Place, 'type=momghcharmfull13');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmfull13") {
			// Charm - Full 13
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRorX("mom11bb.jpg");
			else this.showPerson("mom25f.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			if (perYou.isMaleSex()) {
				md.write(
					'<p>Mom is a good lover: Attentive, caring and far more sensual than you have ever imagined it.</p>' +
					'<p>She straddles you and quickly removes what remains of your clothing, drawing her fingers over your chest and placing soft kisses to your neck before finally guiding your cock into her womanhood with a soft gasp.</p>' +
					'<p>The experience is as hot as it is surreal. She moves slowly at first, carefully, but as you both adjust to each others movements, lust and passion take over. For a few precious minutes you allow yourself to get lost within the moment, enjoying her warmth, her smell, and the feel of every motion bringing you closer to the peak.</p>' +
					'<p>As you finally climax, she pulls you into a kiss and comes to rest on top of you, gasping for air, not daring to speak.</p>'
				);				
			} else {
				md.write(
					'<p>Mom is a good lover: Attentive, caring and far more sensual than you have ever imagined it.</p>' +
					'<p>Her fingers caress your legs as she spreads them apart and aligns her hip with yours, and a soft gasp leaves your lip as her warm folds press against your own and you feel your most sensetive spots touch.</p>' +
					'<p>The experience is as hot as it is surreal. She moves slowly at first, carefully, but as you both adjust to each others movements, lust and passion take over. For a few precious minutes you allow yourself to get lost within the moment, enjoying her warmth, her smell, and the feel of every motion bringing you closer to the peak.</p>' +
					'<p>As you finally climax, she pulls you into a kiss and comes to rest on top of you, gasping for air, not daring to speak.</p>'
				);	
			}
			startQuestionsOnly();
			addLinkToPlaceC(md, 'just rest for a bit', Place, 'type=momghcharmfull14');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "momghcharmfull14") {
			// Charm - Full 14
			md = WritePlaceHeader();
			this.showPerson("mom26.jpg");
			addPlaceTitle(md, "Mom Under A Charm Spell");
			md.write(
				'<p>“I needed that...” Mom breathes out after a while and sits up. “I... still have work to do at the studio, but thank you for... coming.”</p>' +
				'<p>It\'s probably silly to have to giggle at that, doesn\'t keep you from doing it, though.</p>' +
				'<p>“Work is almost wrapped up, and I\'ll be back home again.” Both of you get up and dressed, and even now you still see her casting you longing glances.</p>' +
				'<p>“I hope I see you tonight, hun.” She gives you a kiss on the lips. “We have a lot to make up for. Take care.”</p>' +
				'<p>And with that, she\'s out of the house and back to work. Things are going to be very different back home now, but overall it\'s been a very successful day.</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, 'Leave Gabby\'s home', 38, '', '', '', "movePerson('Mom',154);movePerson('Gabby',452)");
			WritePlaceFooter(md);
			return true;				
		}
		
		return false;
	};
	
	per.showEvent = function()
	{
		var md, d, stage;
		
		if (Place == 40) {
			// Shower scenes
			if (sType == "showermom") {
				md = WritePlaceHeader();

				if (this.isCharmedBy()) this.showPerson("mom-shower1b.jpg");
				else this.showPerson("mom-shower1a.jpg");
				addPlaceTitle(md, "Shower Interrupted By Mom");
				md.write(
					'<p>You had just activated the water when you hear someone knocking on the bathroom door, followed by Mom\'s voice.</p>' +
					'<p>“' + perYou.getPersonName() + '?” You hear her ask from outside. “I need to freshen myself up, do you mind if I come in?”</p>' +
					'<p>You really don\'t. Nudity has never been a big issue in your family and you have all seen each other naked often enough to not be bothered by it. Hell, it doesn\'t even surprise you that Mom enters the room already undressed and slightly bends over the sink to do her makeup.</p>'
				);
				startQuestions();
				addLinkToPlace(md, "turn around and finish showering", Place, 'type=showermomfinish');
				if (this.isCharmedBy()) {
					addLinkToPlace(md, "watch her", Place, 'type=showermomwatch');
					if (this.getCharmedLevel() != 1) addLinkToPlace(md, "ask her to have a shower with you", Place, 'type=showermomjoin');
				}
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showermomfinish") {
				md = WritePlaceHeader();
				perYou.showPerson("shower.jpg");
				addPlaceTitle(md, "Showering");
				md.write(
					'<p>You decide to give her some privacy and face the wall for thew rest of the shower. Mom leaves before you are done and both of you remain silent for most of the time.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'get out of the shower and dressed', 40);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showermomwatch") {
				md = WritePlaceHeader();
				this.showPerson("mom-shower2.jpg");
				addPlaceTitle(md, "Watching Mom");
				md.write(
					'<p>“You look good, Mom.” You make sure that she is aware that your eyes are on her, and judging from the slight blush on her cheeks, it does have the desired effect.</p>' +
					'<p>“Thank you, hun, but you shouldn\'t... Nevermind.” She stops mid sentence and bites her lower lip, looking at you with uncertainty for a moment before turning around and once more tending to her make up.</p>' +
					'<p>Mom keeps casting furtive glances into your direction via the mirror as she proceeds, and you watch as she slowly begins to pose in front of it, pushing her chest out, rolling her shoulders... caressing her breasts. She acts as if she is just checking herself out, but the way her eyes keep moving towards your reflection make it obvious who she is really doing all this for.</p>'
				);
				if (this.getCharmedLevel() == 1) {
					md.write(
						'<p>It makes you think... you may not have fully claimed her, but the spell obviously is affecting her mind and might one day even do more.</p>' +
						'<p>The question is just if you really want that.</p>'
					);
				} else {
					md.write(
						'<p>Mom gives you a knowing wink when she is done and may even be a little disappointed that you didn\'t take it a step further, but there will be plenty of opportunity\'s for that.</p>' +
						'<p>You can\'t spoil her too much, after all.</p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, 'get out of the shower and get dressed', 40);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showermomjoin") {
				md = WritePlaceHeader(false, 'td-left-med');
				if (perYou.isMaleSex()) this.showPersonRorX("mom-shower3m.jpg");
				else this.showPerson("mom-shower3f.jpg");
				addPlaceTitle(md, "Sharing the Shower with Mom");
				md.write(
					'<p>“Taking a shower together?” Mom thinks for a moment. “Well, it would save water, and maybe you would like help with... something else?”</p>' +
					'<p>You play reluctant, telling her that you are fine and just want to have a quick shower while fully expecting her to not buy that at all. And of course you are right.</p>' +
					'<p>“Don\'t lie to me, hun.” She says sternly. “I can tell that you have some... desires and it\'s not good to keep those bottled up.” She makes you sit down in the shower with a stern look. “So just let Mommy take care of it.”</p>' +
					'<p>This is, of course, exactly what you wanted, but even when charmed, mom doesn\'t necessarily like being ordered around. So for now you prefer to give her a reason to at least pretend that it\'s her idea.</p>'
				);
				if (perYou.isMaleSex()) {
					md.write(
						'<p>Your mother straddles you, back pressed against your chest and head rolling back to let the water flow over her skin as she guides you into her waiting mound with a soft gasp, savoring the sensation for a brief moment before starting to rock her hips.</p>' +
						'<p>You wrap your arms around her to keep her close, fondling her soaked breasts, teasing her clit and caressing her skin. Each little motion lures another gasp or moan from her lips and you are enjoying the way her wet body rubs against you with every thrust until she finally arches back with a series of loud moans as the two of you reach your peak.</p>'
					);
				} else {
					md.write(
						'<p>Mom presses her lips to yours for a brief kiss and slowly moves down, her lips brushing over your wet skin and her tongue flicking over your nipples until she finally buries her face between your legs.</p>' +
						'<p>You always love the way she treats you. Her touch is tender and experienced as her fingers slide over your sensitive areas, flick over your clit and push deep into your wetness.</p>' +
						'<p>It takes her only a second to find just the right spot and tease it with quick, fast paced motions, her tongue circling the little nub with every stroke of her fingers as you lean back and enjoy her attention, the warm water from the shower washing over your breasts as they twitch with every soft moan while she slowly drives you to climax.</p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, 'finish the shower together and get dressed', 40);
				WritePlaceFooter(md);
				return true;			
			}			
			return false;
		}
		
		if (sType == "mompool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("mom-poolu.jpg");
			addPlaceTitle(md, "Swimming with Mom");
			md.write(
				'<p>Mom arrives and changes into her one-piece swimsuit, but she is not in any hurry to swim, she is just happy to chat and take a break..</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, 'say goodbye to Mom', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 415) {
			if (sType == "givesuitcase1" || sType == "givesuitcase2") {
				// Deliver the suitcase day 1 or 2, first part
				stage = getQueryParam("stage");
				md = WritePlaceHeader();
				this.showPerson("mom14.jpg");
				addPlaceTitle(md, "Delivering the Suitcase");
				md.write(
					'<p>Mom goes over the suitcase to make sure everything is in there, and her cheeks suddenly erupt into a deep blush when she finds the lacy underwear you packed.</p>' +
					'<p>“Honey... where did you find these?”</p>'
				);

				startQuestionsOnly();
				if (stage == "") addLinkToPlace(md, 'show her the list she made', Place, 'type=' + sType + '&stage=stage2', '“I... wrote that?” Mom looks genuinely confused for a moment. “I guess I did.” She scratches the back of her head. “In any case, thank you for getting everything on such short notice, you are a lifesaver.”');
				else if (stage == "stage2") addLinkToPlace(md, 'ask if she is alright', Place, 'type=' + sType + '&stage=stage3', '“Yes, honey, don\'t worry. I think the work-stress is just getting to me a little.”Mom chuckles uneasily as she puts the underwear away. “I\'m even missing a few hours last night, and Gabby told me I fell asleep on my desk. So I may just have been a little distracted when I made that list.”');
				else {
					startAlternatives(md);
					addLinkToPlace(md, 'tell her that you think she would look sexy in those clothes, if it\'s any consolation', Place, 'type=' + sType + 'next', 'Mom laughs and gives you a surprisingly playful wink. “Thank you, dear. Maybe I should start wearing some of these around the house and...”');
					addLinkToPlace(md, 'tell her that finding them was a little awkward', Place, 'type=' + sType + 'next', '“Hey, even a mother might want to feel sexy once in a while, you know?” Mom actually seems a little offended by your words. “Maybe I need to wear some of these around the house so you and Tracy get used to...');
					endAlternatives(md);
				}
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "givesuitcase1next" || sType == "givesuitcase2next") {
				// Deliver the suitcase day 1 or 2, second part
				md = WritePlaceHeader();
				findPerson("Gabby").showPerson("gabby1.jpg");
				addPlaceTitle(md, "Delivering the Suitcase");
				md.write(
					'<p>“This would hardly be appropriate, right Alex?” You didn\'t even notice Gabby around... just how long had she been listening?</p>' +
					'<p>“Right... it would not be.” Mom suddenly looks somehow confused, again, and you notice that she doesn\'t look at Gabby directly, but rather at the necklace she wears. “I\'m not even sure why I suggested this...”</p>' +
					'<p>“The long hours are just getting to both of us.” Gabby replies with a kind voice before turning to you, her features hardening a little.</p>' +
					'<p>“Thank you for your help, ' + perYou.getPersonName() + ' but your mother and I really need to get to work and can not afford any more delays. You will have plenty of time to catch up later, I am sure.”</p>' +
					'<p>You are about to reply, but Mom cuts you off.</p>' +
					'<p>“I hate to admit it, but she\'s right, honey.” Mom closes the suitcase and gives you a kiss on the cheek. “Thank you again for the help. I promise we\'ll talk later!”</p>'
				);

				startQuestionsOnly();
				addLinkToPlace(md, 'say your goodbyes and leave.', 371, 'type=byesuitcase');
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "givesuitcase3" || sType == "givesuitcase4") {
				// Deliver the suitcase day 3 or 4, first part
				md = WritePlaceHeader();
				this.showPerson("mom14.jpg");
				addPlaceTitle(md, "Delivering the Suitcase");
				md.write(
					'<p>Mom goes over the suitcase to make sure everything is in there and, to your surprise, doesn\'t even flinch when she sees the lacy underwear she asked you to pack.</p>' +
					'<p>Hell, she even takes one of the more revealing pieces out and has a long, thoughtful look at it.</p>' +
					'<p>“I haven\'t really had an opportunity to wear these in a while, you know, do you think I would still look sexy in them, Hun?"</p>'
				);

				startQuestionsOnly();
				startAlternatives(md);
				addLinkToPlace(md, '"Of course!"', Place, 'type=' + sType + 'next', '“You are a little charmer, dear.” Did... your Mom just give you a playful wink? “Maybe... you would like me to model some of these? I have been feeling a little...');
				addLinkToPlace(md, '"This is awkward..."', Place, 'type=' + sType + 'next', '“Now, don\'t be like this, Hun.” Mom is striking a... sexy pose? “I tell you what, maybe I should model some of these. That way you get to decide if it\'s really....');
				endAlternatives(md);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "givesuitcase3next" || sType == "givesuitcase4next") {
				// Deliver the suitcase day 3 or 4, second part
				md = WritePlaceHeader();
				findPerson("Gabby").showPerson("gabby1.jpg");
				addPlaceTitle(md, "Delivering the Suitcase");
				md.write(
					'<p>“This would hardly be appropriate, right, Alex?” You didn\'t even notice Gabby around... just how long had she been listening?</p>' +
					'<p>“Right... it would not be.” Mom suddenly looks somehow confused, again, and you notice that she doesn\'t look at Gabby directly, but rather at the necklace she wears. “I don\'t know what I was thinking, mistr... Miss Halliwell.”</p>' +
					'<p>“It\'s okay, the long hours are just getting to both of us.” Gabby replies with a kind voice before turning to you, her features hardening a little.</p>' +
					'<p>“Thank you for your help, ' + perYou.getPersonName() + ' but your mother and I really need to get to work and can not afford any more delays. You will have plenty of time to catch up later, I am sure.”</p>' +
					'<p>You are about to reply, but Mom cuts you off.</p>' +
					'<p>“I hate to admit it, but she\'s right, honey.” Mom closes the suitcase and gives you a kiss on the cheek. “Thank you again for the help. I promise we\'ll talk later!”</p>'
				);

				startQuestionsOnly();
				addLinkToPlace(md, 'say your goodbyes and leave.', 371, 'type=byesuitcase');
				WritePlaceFooter(md);
				return true;			
			}

		}
		
		if (Place == 452 && this.isHere()) return this.showEventGabbysHome();
		
		if (sType === "" && Place == 45 && this.checkFlag(15) && !this.checkFlag(16) && getHour() >= 6 && getHour() < 8) setQueryParams('event=mombreakfast');
		
		if (sType == "breakfastfun") {
			md = WritePlaceHeader();
			this.showPerson("mom31.jpg");
			this.setFlag(16);
			addPlaceTitle(md, "Mom for Breakfast");
			if (perYou.isMaleSex()) {
				md.write(
					'<p>“Good Morning, Mom.” She surely offers an enticing view, and you make sure she knows just how enticing she is by greeting her with a long hug her from behind and pressing the growing bulge in your pants against her rear, making her gasp in surprise.</p>' +
					'<p>“Oh dear...” Mom rubs her backside against your crotch. “You are so hard already... but that can\'t be helped at your age, right?” She briefly bites her lower lip, contemplating. “Well, Mommy is here for you if you need some... relive. Just so you know.”</p>' +
					'<p>This is not something you need to hear twice. You move what little cloth she wears out of the way and bend your Mom over the countertop, her body trembling in anticipation as you tease her with the tip of your cock for a few seconds and finally push into her wetness.</p>' +
					'<p>Mom moans softly as you begin to move your hip, bracing herself against your thrusts while both her hands spread her asscheeks for you, and with such a sexy view, it really doesn\'t take long until you climax and shoot your load into her.</p>'
				);
			} else {
				md.write(
					'<p>“Good Morning, Mom.” You move in to give her a tender hug from behind. “Thank you for all the hard work.”</p>' +
					'<p>“You are welcome, dear, it\'s a pleas...sure...” Mom suppresses a soft moan as your hands wander to her breasts, pushing her bra out of the way and playing with her nipples. “Hunny, this is not the time to... ohhh... I need to...”</p>' +
					'<p>You press soft kisses to the back of her neck and nestle your body against her, one hand wandering down, fingertips brushing over her stomach and sliding into her panties.</p>' +
					'<p>“W...wait! This is... H...how do you make this feel so... ahhhhh...”</p>' +
					'<p>Your usually fairly domineering mother is completely helpless under your skilled touch, and within seconds, whatever protest she might have is replaced by soft gasps and sensual moans as you insert your fingers into her warm folds and play with her little nub, enjoying the feel of her body twitching in your arms and trembling under one lustful shudder after another as you bring her closer to the peak, turn her head to the side to give her a deep kiss and finally bring her to climax.</p>'
				);				
			}
			if (isPersonHere("Tracy")) md.write('<p>As you pull away, you notice that Tracy has been watching the two of you, eyes wide and her fingers between her legs. “Wow... I\'m a bit jealous now...” She chuckles. “But I\'m still happy to see you and Mom bonding like that.”</p>');
			if (wherePerson("Miku") == 408) md.write('<p>Miku is sporting one of the biggest grins you\'ve ever seen on her, she gives you a wink as you move back to your seat before moving towards the countertop and help Mom with the rest of breakfast.</p><p>“I love this place.”</p>');

			startQuestionsOnly();
			addLinkToPlace(md, 'help her clean up', 45);
			WritePlaceFooter(md);
			return true;				
		}

		
		if (Place != 154) return false;
		
		var perTracy = findPerson("Tracy");
		var clvT = perTracy.getCharmedLevel();
		var perGabby = findPerson("Gabby");
		var clvG = perGabby.getCharmedLevel();
		
		if (sType == "searchclothes") {
			// Pack Mom=s suitcase for work
			md = WritePlaceHeader();
			AddImage("mom-underwear.jpg");
			this.setFlag(21);
			addPlaceTitle(md, "Resist!");
			md.write(
				'<p>The first part of the list contains nothing too outlandish. A lady\'s skirt, a pair of pants, blouses and 2 towels. You don\'t really know your way around Mom\'s room, but everything is where you might expect it to be and easy to find.</p>' +
				'<p>The second part is... strange, though.</p>' +
				'<p>The other items are not exactly hidden, but placed in a way that no one would just stumble upon them by chance. You certainly wouldn\'t have found them without Mom\'s instructions, and as it turns out that\'s with good reason.</p>' +
				'<p>You have found your mothers secret drawer for “ladies underwear”. Lacy Bra\'s, form fitting lingerie, a few thongs, garter belts and even a bunch of small sex toys...</p>' +
				'<p>You, frankly, have no idea why Mom would guide you to these items, or why she would need any of them at work...</p>' +
				'<p>Hell, until now you had no idea she even owns a collection like this. Sure, she was never the bashful type, and she does like sexy outfits, but finding this is...</p>'
			);

			startQuestionsOnly();
			startAlternatives(md);
			addLinkToPlace(md, "Hot! You really want to see her wearing this!", 154, 'type=searchclothesimagine');
			addLinkToPlace(md, 'Awkward... better hurry up and just be done with it.', 45, '', 'You -really- don\'t want to imagine your own Mom in sexy lace underwear and playing with some of the... items in there, so you do your best to ignore whatever implication they might have as you put everything into a small suitcase and go on your way to deliver everything.', '', 'perYou.AddItem(66,true)');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;			
		}
		if (sType == "searchclothesimagine") {
			// Pack Mom=s suitcase for work
			md = WritePlaceHeader();
			this.showPerson("mom13.jpg");
			addPlaceTitle(md, "Imagining...");
			md.write(
				'<p>You really should just get everything you need from the list and get out, and yet, your fantasy is going wild as you dig deeper into the naughty little treasure trove.</p>' +
				'<p>You know it is wrong, but thinking back to legions visit, to walking in on her as she, well...</p>' +
				'<p>You can\'t help but see her less as your Mom and more as the sexy woman she is...</p>' +
				'<p>…Someone with needs and desires you are sure she has put aside to tend to her family far too long, and you wonder... just maybe...</p>' +
				'<p>… you could help her fulfill these desires, allow her to relax a little and just... let herself go.</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'Focus and gather the things you need', 45, '', 'You quickly shake yourself out of your fantasies and neatly place everything on the list into one of moms suitcases.</p><p>Having thoughts like this is... weird. Did you always have these desires and just never admitted to them, or is more happening to you than you are wiling to admit to yourself?</p><p>You may have to confront these feelings sooner or later, but that as it may, you got everything you came for and should head over to the TV station. ', '', 'perYou.AddItem(66,true)');
			WritePlaceFooter(md);
			return true;			
		}

		if (sType == "mresist") {
			// Tell Mom to resist the influence
			md = WritePlaceHeader();
			this.showPerson("mom4b.jpg");
			this.setFlag(29);
			addPlaceTitle(md, "Resist!");
			md.write(
				'<p>You tell Mom to try and resist the influence she is under, the glamour or other effect from Jesse. She does not seem to question exactly what you mean but your words seem to strongly affect her. She sits up and stops caressing herself, one hand is resting on her pussy, but it might be more modesty. She tells you,</p>' +
				'<p>"Yes, it is so much clearer, so much...less hot...I will try to stop thinking about such things"</p>' +
				'<p>Interesting, it seems she was still under some sort of spell from the demon but it seems to have been more subtle, influencing her not controlling her. Subtle and appears easily broken. You think Mom will be back to normal from now.</p>'
			);

			IncreaseMomsArousal(-1);

			startQuestionsOnly();
			addLinkToPlace(md, 'leave your Mom to calm down', 45);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "mgivein") {
			// Tell Mom to give in (indirectly)
			md = WritePlaceHeader();
			this.setFlag(29);
			this.showPerson("mom4c.jpg");
			addPlaceTitle(md, "Nothing wrong at all!");
			IncreaseMomsArousal(1);
			md.write(
				'<p>You tell Mom that feeling...odd...is completely normal, and there is nothing wrong with how she has been feeling. In fact you are happy to see this side of her since she seldom speaks of sex. After all Mothers and their children should be able to freely talk of their feelings and sex.</p>' +
				'You see that you words visibly affect her, interesting, it seems she is still under some sort of spell from the demon but it seems to have been more subtle, influencing her not controlling her. Mom moves, her breasts hanging beautifully as kneels on her chair, and she says a little hesitantly,</p>' +
				'<p>"Alright...but Mommy really, really needs to do something, please leave me for now, we can...talk...later"</p>' +
				'<p>You see why she is so hesitant, one of her hands is furiously rubbing her pussy. She looks at you imploringly, you wonder if it is to touch her or to leave, but you decide you should leave for now. You slowly step to the door and look back and see your mother orgasming, biting her lip to try to be quiet. You see no sign she is slowing down her masturbation, it would seem your mother is multi-orgasmic...</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'leave your Mom to what she is doing', 45);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "tracy") {
			// Talk about Tracy
			md = WritePlaceHeader();
			this.setFlag(31);
			this.showPersonDN("mom1e.jpg");
			addPlaceTitle(md, "Mom Asking About Tracy");
			md.write(
				'<p>Mom asks you "Tracy has been acting strangely recently, often wearing little or no clothing around the house. ' +
				'Do you know why, she has been quite evasive with me but did accidently mention your name as if you might know something."</p>' +
				'<p>You wonder how to answer her, anything from deny everything to the truth.</p> '
			);

			startQuestionsOnly();
			addLinkToPlaceC(md, 'Lie - "I have no idea"', 154, 'type=tracydeny');
			addLinkToPlaceC(md, 'Partial - "Davy was blackmailing her"', 154, 'type=tracydavy');
			if (clvT == 2) addLinkToPlaceC(md, 'Almost True - "Tracy and I are now lovers"', 154, 'type=tracylovers');
			else addLinkToPlaceC(md, 'Mostly True - "I have helped protect her"', 154, 'type=tracyprotect');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "tracydeny") {
			// Talk about Tracy, deny anything happened
			md = WritePlaceHeader();
			this.setFlag(25);
			this.showPersonDN("mom1e.jpg");
			addPlaceTitle(md, "Denial");
			md.write(
				'<p>You tell Mom that you have no idea why Tracy is acting differently, and that she is probably just a way she is deciding to act now.</p> ' +
				'<p>You can see Mom does not believe you at all, but she leaves it there and does not press the issue.</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'leave your Mom\'s bedroom', 45);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "tracydavy" || sType == "tracyprotect") {
			// Talk about Tracy, davy did it, or I protected her
			md = WritePlaceHeader();
			this.setFlag(25);
			this.showPersonDN("mom1e.jpg");
			addPlaceTitle(md, "Davy\'s Fault");
			md.write(
				'<p>You tell Mom that Davy had been influencing Tracy recently, possibly using blackmail but you do not know the exact details. You have spoken to Tracy and have been able to sort the issue out and broken Davy\'s hold over her. Tracy should start acting more normal (at leave she will when you tell her to do so around Mom).</p> ' +
				'<p>Mom seems happier, but she expresses some anger at Davy and tries to get you to report this to the police or at least to the school. You tell her Tracy did not want to do anything like this and Mom leaves the issue, for now.</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'leave your Mom\'s bedroom', 45);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "tracylovers") {
			// Talk about Tracy, we are lovers
			md = WritePlaceHeader();
			this.showPersonDN(this.extra[0] > 0 ? "mom1f.jpg" : "mom1a.jpg");
			addPlaceTitle(md, "Lovers");
			md.write('<p>You tell Mom that Tracy and you have recently become lovers. ');
			if (this.extra[0] > 0) {
				IncreaseMomsArousal(1, 30);
				md.write('Mom looks a little flustered and replies, "You know that is very hot...I mean wrong. Don\'t let anyone else know", and you see she blushes. She then asks you to leave her alone.</p>');
			} else {
				md.write('Mom looks surprised, "That is wrong, you must end your relationship immediately, promise me!", you tell her you will, but actually meaning you will keep it better hidden.</p>');
				this.setFlag(30);	// told her you are lovers
			}

			startQuestionsOnly();
			addLinkToPlace(md, 'leave your Mom\'s bedroom', 45);
			WritePlaceFooter(md);
			return true;
		}
				
		if (this.checkFlag(27) && !this.checkFlag(26) && (((Math.floor(nTime / 288) % 7) != 4) && ((Math.floor(nTime / 288) % 7) != 5))) {

			// Mom is off to work, Sunday to Thursday only
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson("mom1g.jpg");
			addPlaceTitle(md, "Mom Leaving");
			md.write(
				'<p>You check your mothers room and the door is locked, and you hear her call out, "I\'m here ' + perYou.getPersonName() + '"</p>' +
				'<p>You see her near the front door, with a bag, clearly about to leave. You ask where she is going,</p>'
			);

			if (this.isCharmedBy()) {
				md.write(
					'<p>"With all this strange stuff going on around town I have been called in to help put together some special reports for the News, both for radio and TV.</p>' +
					'<p>This could be a long shift, so I have taken a change of clothes, I\'ll change at work. Now make sure to come and visit me at work, I am sure we can arrange to..talk..privately."</p>' +
					'<p>You tell her goodbye, and as she steps out you hear her make a phone call "Gabby, I\'ll be there soon.", you have met her assistant Gabriella a few times, or Gabby for short. She was always very focused on work and seems devoted to your mother.</p>'
				);

			} else {
				md.write(
					'<p>"With all this strange stuff going on around town I have been called in to help put together some special reports for the News, both for radio and TV.</p>' +
					'<p>This could be a long shift, so I have taken a change of clothes, I\'ll change at work. Stay in contact, I will let you know when I should get back home."</p>' +
					'<p>You tell her goodbye, and as she steps out you hear her make a phone call "Gabby, I\'ll be there soon.", you have met her assistant Gabriella a few times, or Gabby for short. She was always very focused on work and seems devoted to your mother.</p>'
				);
			}
			md.write(
				'<p>You then hear your mother briskly walking away, you have always told her to get a car, but she keeps telling you to exercise more, it is good for your figure.</p>'
			);
			this.moveThem(415);		// Her office at work
			this.setFlag(26);
			this.charmedTime = 0;

			startQuestionsOnly();
			addLinkToPlace(md, 'close the front door', 45);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "momfuck") {
			// Fuck her
			var chc = Math.floor(Math.random() * 2);
			md = WritePlaceHeader(false, (!perYou.isMaleSex() || (chc === 0 && isExplicit() && perYou.isMaleSex())) ? 'td-left-large' : '');
			if (isExplicit()) {
				if (perYou.isMaleSex()) this.showPersonX(chc === 0 ? "mom11ba.jpg" : "mom11bb.jpg");
				else this.showPersonRandomX("mom11g", 2);
			} else if (perYou.isMaleSex()) this.showPersonRandom("mom11b", 2);
			else this.showPerson("mom11ga.jpg");

			addPlaceTitle(md, "Alone time with Mom");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Words aren\'t needed, in fact, they rarely are ever since your mother has been placed under your spell. Mom knows what you need the moment you enter the room, and within seconds, you find yourself naked on the bed and her crawling on top of you.</p>' +
					'<p>You share a deep, loving kiss with her, tasting her lips and letting her play with your tongue as your manhood begins to press against her crotch.</p>' +
					'<p>“' + (perYou.isMan() ? 'My son has grown into such a big, strong man' : 'My little girl has grown into such a beautiful, young woman') + '...” She whispers sensually. “I couldn\'t be more proud.”</p>' +
					'<p>Her fingers trace over the thick shaft, clearly enjoying the effect she has on you, and her lips touch yours for a last, feint kiss before she straddles you, guiding your cock into her waiting folds and starting to rhythmically move her hips.</p>' +
					'<p>It feels wonderful.</p>' +
					'<p>You know Mom has not been with a man for years, but she is still an experienced lover and knows exactly what to do to push your buttons, allowing you to just let yourself fall back as she tends to your needs, her fingers caressing your arms and chest and her lips pressing soft kisses to your neck and shoulders all while she never stops moving her hips until both of you share an intense climax.</p>'
				);
			} else {
				md.write(
					'<p>Words aren\'t needed, in fact, they rarely are ever since your mother has been placed under your spell. Mom knows what you need the moment you enter the room, and within seconds, you find yourself naked on the bed and her crawling on top of you.</p>' +
					'<p>You share a deep, loving kiss with her, tasting her lips and letting her play with your tongue as her knee pushes between your tights to slowly spread your legs.</p>' +
					'<p>“My little girl has grown into such a beautiful, young woman...”She whispers softly. “I couldn\'t be more proud.”</p>' +
					'<p>You feel her fingers brushing over your folds and teasing your clit, a soft gasp leaving your lips as she delves deeper into your sex and begins to massage you.</p>' +
					'<p>It feels wonderful.</p>' +
					'<p>You don\'t know just how much experience your Mom has with younger lovers or other women, but she knows exactly what to do to push your buttons and drive you crazy, using her fingers, lips and whole body to tend to your every need and expertly bring you to climax.</p>'
				);

			}
			startQuestionsOnly();
			addLinkToPlace(md, 'talk more with Mom', 154);
			addLinkToPlace(md, 'leave your Mom\'s bedroom', 45);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "mombj") {
			// Oral
			md = WritePlaceHeader(false, !perYou.isMaleSex() && isExplicit() ? 'td-left-large' : '');
			if (isExplicit()) this.showPersonRandomX(perYou.isMaleSex() ? "mom12b" : "mom12g", 2);
			else this.showPerson(perYou.isMaleSex() ? "mom12b.jpg" : "mom12g.jpg");

			addPlaceTitle(md, "Alone time with Mom");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Mom seems to know of your intent even before you speak the words and gestures you to come closer with a soft smile.</p>' +
					'<p>“Oh honey,” She purrs softly, her hands brushing over the growing bulge in your pants. “It is hard on a young man to live in a house with so many sexy women, isn\'t it?” You don\'t really need to answer that, her hands are already on your zipper and her lips close to your crotch.</p>' +
					'<p>“Just relax and let Mommy take care of this, you\'ll feel better in a moment.”</p>' +
					'<p>It still feels like a weird dream to do this, but it\'s a sexy one. Your mothers lips eagerly wrap around your cock and push forward all the way to the base until the tip enters her throat and remains there for precious seconds before she pulls back to catch some air.</p>' +
					'<p>She is enjoying this.</p>' +
					'<p>Mom alternates between using her hands, her tongue and her lips to coat your manhood in saliva and pleasure you, bringing you closer and closer to climax until it is finally too much to bear and you unload yourself into her mouth, making her swallow every drop.</p>'
				);
			} else {
				md.write(
					'<p>Mom seems to know of your intent even before you speak the words and gestures you to come closer with a soft smile.</p>' +
					'<p>“Don\'t worry, I know what I was like at your age, hun.” She speaks softly and pulls you into a gentle embrace. “Just relax and let Mommy take care of your needs, you\'ll feel better in a moment.”</p>' +
					'<p>It still feels like a weird dream to do this, but it\'s a sexy one. Your mother kisses you on the lips and moves behind you to help you out of your clothes, her lips teasing your neck and earlobe, moving down to your shoulder-blades and the small of your back as more and more of your clothes are taken off and finally pressing a soft kiss to the spot right above your buttocks.</p>' +
					'<p>She knows how to press your buttons in a way only a mother could, and as you turn around and sit down on the bed, you are wet enough that no further preparation is needed. Her tongue caresses your folds and playfully flicks over your clit, only stopping to place tender kisses all over your tights to allow you to briefly catch your breath.</p>' +
					'<p>You gasp and moan, cling to the sheets and bite your lower lip as your mother plays with your most sensitive parts, drags out the final moments agonizingly long and finally pushes you into an intense, satisfying orgasm.</p>'

				);
			}
			startQuestionsOnly();
			addLinkToPlace(md, 'talk more with Mom', 154);
			addLinkToPlace(md, 'leave your Mom\'s bedroom', 45);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "momtracythreesome") {
			// Mom/Tracy Threesome
			md = WritePlaceHeader(false, 'td-left-large');
			this.showPerson("momtracya.jpg");

			addPlaceTitle(md, "Alone time with Mom");

			md.write(
				'<p>“You\'ve started without me!” Tracy pulls a cute pout when she sees you and Mom already naked in each others arms, and jokingly has you promise to make it up to her before joining you on the bed.</p>' +
				'<p>Tracy is one of the very few, if not the only other woman in your life Mom unconditionally accepts next to her. You had expected that you would need to convince both of them to”grow closer as a family” the first time, but they had already made up their minds long before you even brought it up, and getting both of them into the same bed was just a formality.</p>' +
				'<p>Even with your ever growing harem of girls, Mom and Tracy still hold a special place in your heart. You are just as focused on making sure the two enjoy themselves as they are on your pleasure, and especially Mom takes great care to split her attention evenly between you and your sister.</p>' +
				'<p>You trade sloppy kisses and tender affections with both of them, enjoying their eager hands on your skin, their lips on your neck, chest and cock/pussy and make sure to give back to your family as much as you get. For the next half hour, Mom\'s bedroom is filled with sensual moans, lewd smacking noises and the occasional lighthearted giggle as you redefine “family time” in a way none of you would have ever even dreamed off.</p>' +
				'<p>And it certainly does make you “come” closer together.</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'talk more with Mom', 154);
			addLinkToPlace(md, 'leave your Mom\'s bedroom', 45);
			WritePlaceFooter(md);
			return true;
		} 
			

		if (sType == "momgabbywatch") {
			// Watch Mom and Gabby
			md = WritePlaceHeader();
			perGabby.showPerson("gabby-mom1.jpg");

			addPlaceTitle(md, "Watching Mom and Gabby");

			md.write(
				'<p>Gabby looks exited, but uncertain, and Mom seems hesitant as well until you explain how you could learn something about sex from watching two beautiful and experienced women make love, which easily convinces her to let you stay.</p>' +
				'<p>It\'s probably one of the rare cases where Gabby is the more hesitant one, but both woman are still easily swept away by their lust and the spells effects as they begin to touch and kiss each other.</p>' +
				'<p>You watch as your mother pins Gabby to the bed and kisses her inner thighs, her lips moving closer to her partners folds, tracing them and suckling on her clit to make the other woman moan in delight.</p>' +
				'<p>Soon, the only indication that they even remember you are here is the way they both make sure that you always have a good view at what they do, always posing a little and presenting their most intimate areas for your enjoyment.</p>'

			);
			startQuestionsOnly();
			addLinkToPlace(md, 'talk more with Mom', 154);
			addLinkToPlace(md, 'leave your Mom\'s bedroom', 45);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "momgabbyjoin") {
			// Join Mom and Gabby
			md = WritePlaceHeader();
			perGabby.showPerson("gabby-mom6.jpg");

			addPlaceTitle(md, "Joining Mom and Gabby");

			md.write(
				'<p>“Of course, family should always share.” Mom is a lot more enthusiastic about this than Gabby, but the later would never dare argue with her on any of these matters, and by heightening her lust with the Dai Chu, you quickly get her to warm up to the idea as well.</p>' +
				'<p>Mom is in charge of course, especially in bed, and you get to lean back and have two beautiful mature women tend to your every need. Both your Mom and her lover take turns pleasuring you, and you enjoy how they press their naked bodies against yours while they trade kisses and tender affections with you and each other.</p>' +
				'<p>Time just flies as their hands travel all over you skin and their lips and tongues play with your ' + (perYou.isMaleSex() ? 'cock' : 'pussy') + ', inevitably rushing into the grand finale where all three of you are brought to climax one after the other and you all snuggle up together to bask in the afterglow.</p>'

			);
			startQuestionsOnly();
			addLinkToPlace(md, 'talk more with Mom', 154);
			addLinkToPlace(md, 'leave your Mom\'s bedroom', 45);
			WritePlaceFooter(md);
			return true;
		}
		
		if (!this.checkFlag(1)) return false;		// No masturbation scene
		if (perGabby.isHere()) {
			// Rest any masturbation scenes
			this.setFlag(1, false);
			return false;
		}
		if (!this.isHere()) return false;		// Not here
		
		// A Masturbation scene when visiting Mom (several variations)
		if (this.checkFlag(2) && !this.checkFlag(3)) {
			// Post Jesse Masturbation scene, key event for all following events
			md = WritePlaceHeader();
			// Images
			if (isExplicit()) this.showPersonRandomX("mom3", 3);
			else this.showPerson("mom3.jpg");
			this.setFlag(1, false);
			this.setFlag(3);
			
			// Description
			addPlaceTitle(md, "Interrupting Mom In Her Bedroom");
			md.write(
				'<p>After your meeting with the demon you are worried about your mother and open the door to check she is alright. You stifle an exclamation as you look in and see your mother has removed her clothes and is frantically masturbating and softly talking to herself,</p>' +
				'<p>"why have I been feeling so strange since that girl visited...oh yes, ' + perYou.getPersonName() + (perYou.isBornMale() ? " must have fucked her" : " must have licked her") + ', oh it\'s so bad of me to think about it...I can\'t stop...don\'t want to stop"</p>' +
				'<p>She cries out, but quickly covers her mouth as her hips thrust as she has a massive orgasm, copious fuilds squirting out her passion. She collpases in the aftermath of her impressive orgasm.</p>'
			);

			// Choices
			startQuestionsOnly();
			addLinkToPlace(md, 'quietly close the door, aroused', 45, '', 'You leave the room, finding it difficult to put what you just saw out of your mind', '', "setPersonFlag('Mom',3);setPersonFlag('Mom', 1, false)");
			addLinkToPlace(md, 'quickly close the door, embarrassed', 45, '', 'You leave her room, determined to put what you saw out of your mind, she is your mother!', '', "setPersonFlag('Mom',3);setPersonFlag('Mom', 1, false);IncreaseMomsArousal(-1)");
			WritePlaceFooter(md);
			return true;

		} else if (this.checkFlag(4) && !this.checkFlag(5)) {
			// Post Tracy Masturbation scene
			md = WritePlaceHeader();
			// Images
			if (isExplicit()) this.showPersonRandomX("mom3", 3);
			else this.showPerson("mom3.jpg");
			this.setFlag(1, false);
			this.setFlag(5);

			// Description
			addPlaceTitle(md, "Visiting Mom In Her Bedroom");
			md.write(
				'<p>After your love-making with Tracy you cannot help but think more about your mother and you are drawn to talk more to her, especially after those events with the Demon,</p>' +
				'<p>"oh yes, Tracy and ' + perYou.getPersonName() + ' I saw them, lovers in each others arms, oh it\'s so bad of me to think about it...to watch it...I can\'t help it..."</p>' +
				'<p>She cries out, but quickly covers her mouth as her hips thrust as she has a massive orgasm, copious fuilds squirting out her passion. She collpases in the aftermath of her impressive orgasm.</p>' +
				'<p>You consider confronting her, but you doubt she will be receptive, as she has always avoided discussing matters of her sexuality with you.</p>'
			);

			// Choices
			startQuestionsOnly();
			addLinkToPlace(md, 'quietly close the door', 45);
			WritePlaceFooter(md);
			return true;

		} else if (this.checkFlag(30) && !this.checkFlag(29)) {
			// Post 'We are lovers' Masturbation scene
			md = WritePlaceHeader(false, 'td-left-med');
			// Images
			this.showPerson("mom4a.jpg");
			this.setFlag(25);

			// Description
			addPlaceTitle(md, "Visiting Mom In Her Bedroom");
			md.write(
				'<p>You tap on Moms door and hear a sound, thinking she said "Come In", walking in you see her naked body shuddering, as she is more like "Cumming".</p>' +
				'<p>Mom looks up and notices you, and looks flustered, embarrassed but you notice her hand is slowly rubbing her pussy and her other hand is still cupping one of her breasts. It is clear she is struggling to work out what to say, but then she says,</p>' +
				'<p>"' + perYou.getPersonName() + ' please leave Mommy alone, I want...don\'t want you here now...Sorry I have been feeling so, odd, recently, just leave me alone"</p>' +
				'<p>You see her hand is rubbing her pussy faster, she does not seem to be aware she is doing it. Her other hand pinches one of her nipples.</p>' +
				'<p>What do you do?</p>'
			);

			// Choices
			startQuestionsOnly();
			addLinkToPlaceC(md, '"Mom, Jesse affected you, try to resist it"', 154, 'type=mresist', '', '', "setPersonFlag('Mom', 1, false)");
			addLinkToPlaceC(md, '"We all feel <i>odd</i> in that way"', 154, 'type=mgivein', '', '', "setPersonFlag('Mom', 1, false)");
			addLinkToPlace(md, 'leave as she asks', 45);
			WritePlaceFooter(md);
			return true;
			
		} else {
			// General Masturbation scene (repeatable, on her own)
			// Images
			md = WritePlaceHeader();
			if (isExplicit()) this.showPersonRandomX("mom3", 3);
			else this.showPerson("mom3.jpg");
			this.setFlag(1, false);

			// Description
			addPlaceTitle(md, "Visiting Mom In Her Bedroom");
			md.write(
				'<p>You step in to visit your mother, and you see she is a bit distracted,</p>' +
				'<p>"oh yes, ' + perYou.getPersonName() + ' yes, that is it...just there..."</p>' +
				'<p>She cries out, but quickly covers her mouth as her hips thrust as she has a massive orgasm, copious fuilds squirting out her passion. She collpases in the aftermath of her impressive orgasm.</p>'
			);
			if (!this.isCharmedBy()) {
				md.write(
					'<p>You consider confronting her, but you doubt she will be receptive, as she has always avoided discussing matters of her sexuality with you.</p>'
				);
			}

			// Choices
			startQuestionsOnly();
			if (this.isCharmedBy()) addLinkToPlace(md, 'watch and talk to Mom when she is finished', 154);
			addLinkToPlace(md, 'quietly close the door', 45);
			WritePlaceFooter(md);
			return true;
		}
		
		//return false;
	};
	
	per.showDancing = function()
	{
		this.setFlag(38);
		var md = WritePlaceHeader();
		this.showPersonRandom("poledance", 2);
		addPlaceTitle(md, "Mom\'s Dance");
		md.write(
			'<p>You wait with a little nervousness, Mom is charmed but still she is your mother, and asking her to do an exotic dance...well strip-tease in public...</p>' +
			'<p>Mom steps out onto the stage dressed in some black lingerie that you think you recognise from home. As she does you hear someone in the audience say "Hey a hot MILF, just my type". You restrain calling out that she is your MILF and there is no \'like\' about it, you \'do\'!</p>' +
			'<p>Despite your slight discomfort and distraction from the audience members, Mom does an effective and alluring dance. She does not quite strip naked, odd as she has no reservations over being naked at home.</p>' +
			'<p>After she joins you for a drink, and you cautiously mention her dance and how far she went. She says, "Anything more is for home, not here".</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);	
	};

	per.showPersonTextHere = function(md) {
		// Has someone arrived and being 'interviewed' by Mom
		if (Place == 46 && (wherePerson("Tess") == 45 || (wherePerson("MrsTanika") == 45 && !isDay()) || wherePerson("Anita") == 45)) {
			md.write('<p>You hear some noise from the living room, it sounds like Mom ' + (wherePerson("Tracy") == 45 || wherePerson("Tracy") == 156 ? 'and Tracy ' : '') + 'talking to someone.</p>');
		} else if (Place == 45 && getQueryParam("event") == "mombreakfast") md.write('<p>Your mother is bending over the countertop, focused on preparing breakfast.</p>');
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (!this.checkFlag(35) && !this.checkFlag(32) && isPersonHere("Tracy") && this.checkFlag(26) && this.place >= 998 && (Math.floor(this.hoursCharmed("skip") / 24) > 5)) {
			if (this.place != 999) {
				addQuestionR(md, 'ask Tracy if she has heard anything from Mom',
					'“Oh, yes. She actually just called and told me that she needs a vacation and will be gone for at least a few weeks.”</p>' +
					'<p>“It took me by surprise as well, but she said the last days at work were really stressful, and she almost had a breakdown. So she took her extra hours and remaining vacation days while her assistant booked a last minute flight and took care of the rest.”</p>' +
					'<p>“Gabb... Miss Halliway is actually going on vacation with Mom, who would have expected that?.”',
					"Tracy",
					"movePerson(\\'Mom\\',999)"
				);
			} else {
				addQuestionR(md, '"Did she tell you where she\'s going?"',
					'“Come to think of it... no, and neither did she tell me how to contact her.” Tracy looks thoughtful.</p>' +
					'<p>“That\'s really not like Mom at all, is it? I mean, it might just be the accumulated stress, but I hope she\'s alright.”',
					"Tracy",
					"movePerson(\\'Mom\\',1000);setPersonFlag(\\'Mom\\',35)"
				);
			}
		}
		
		if (Place == 45 && getQueryParam("event") == "mombreakfast") addLinkToPlace(md, 'have some “fun” with Mom', 154, 'type=breakfastfun');
		
		// Common to any location
		if (this.isHere() && Place != 452 && this.other > 0 && sType === "") {
			if ((isSpellKnown("Charm") || checkPersonFlag("Kylie", 7)) && !this.checkFlag(18)) {
				addQuestionR(md, '"Do we have other family here in Glenvale?"',
					'You are fairly sure one of Mom\'s sisters and her family recent moved to Glenvale, but Mom has not really talk about them. Recently you think she visited them but on her own, so you ask Mom about it. Mom reples,</p>' +
					'<p>"Brandi and your cousin Kylie recently moved here. Brandi and I have been having difficulties for a while but I think we have it sorted out...somewhat."</p>'  +
					'<p>You were never told any details of these difficulties, neither Mom or Tracy ever told you. While you think on this Mom continues,</p>' +
					'<p>"You may run across your cousin, she recently started at your school. She is quite athletic so you may play against her, if I can convince you to join a team this year."</p>' + 
					'<p>An old argument, so you leave the topic there.',
					"Family",
					"setPersonFlag(\\'Mom\\',18)"
				);
			} else if (checkPersonFlag("Kylie", 7) && !this.checkFlag(17)) {
				addQuestionR(md, '"Can you arrange for me to visit Aunt Brandi\'s"',
					'You mention to Mom about meeting Kylie, not anything more, and about how Kylie would not let you visit her home. It seems Aunt Brandi does not allow Kylie to have many visitors. Mom reples,</p>' +
					'<p>"Brandi has alway been over-protective of Kylie, and any family members. It\'s a bit silly try to restrict a girl of Kylie\'s age from seeing people, Brandi cannot control Kylie all the time"</p>'  +
					'<p>Considering your encounter at the fields and street you have to agree with Mom, but refrain from saying anything other than a general agreement.</p>' +
					'<p>Mom continues, &quot;Ok, I\'ll speak to Brandi and arrange something, not sure how soon." <i>more not implemented</i>',
					"Mom and Kylie",
					"setPersonFlag(\\'Mom\\',17)"
				);
			}
		}
		
		if (Place == 372 && !isDay() && this.whereNow() == 415) {
			var d = Math.floor(this.hoursCharmed("skip") / 24) + 1;		// Days she has left for work, 1,2,3 etc
			if (checkPersonFlag("Gabby",26)) addLinkToPlace(md, "enter Mom's office", 415, 'type=gabbyofficebadend1');
			else if ((d < 3 && checkPersonFlag("Gabby", 3)) || (d > 2 && checkPersonFlag("Gabby", 4))) addLinkToPlace(md, 'look into Mom\'s office', Place, '', 'You check but just seem Mom and Gabby working, and decide it is best not to interrupt them');
			else addLinkToPlace(md, 'look into Mom\'s office', 415, 'type=lookmomgabby' + (d < 3 ? "1" : "2"));		// Note: a Gabby event
		}
		
		if (Place != 154) return;
		
		if (!this.isHere() && this.checkFlag(19) && !this.checkFlag(21)) addLinkToPlaceC(md, 'look for the items from Mom\'s list', 154, 'type=searchclothes');
		
		if (!this.isHere()) return;
		
		var perKhan = findPerson("OfficerKhan");
		var perGabby = findPerson("Gabby");
		var clvG = perGabby.getCharmedLevel();
		
		if (!this.isCharmedBy()) {
			if  (this.other === 0) addQuestionC(md, '"Hey Mom"', "Mom", 2600);
			else if (this.other == 1) addQuestionC(md, '"Know how to make a little cash, Mom?"', "Mom", 2601);

			if (perYou.getExperience() > 7 && this.other < 7) {
				addQuestionC(md, '"Have any cash so I could run some errands at the ' + getShopStore() + 's, Mom?"', "Mom", 2607);
			}

			if (perYou.getExperience() > 12 && this.other < 10 && nMoney < 20) {
				addQuestionC(md, '"Could I have a bit of cash for the taxi?"', "Mom", 2610);
			}

			if (perJesse.getDemonPath() == 60 && perJesse.place != 6) {
				//Asking about the demon
				addQuestionC(md, '"A visitor, Mom?  Who? When was this?"', "Mom", 14460);
			}
			if (isCharmedBy("Tracy") && !this.checkFlag(31)) addLinkToPlaceC(md, '"What about Tracy"', 154, 'type=tracy');
			
		} else {
			if (this.getCharmedLevel() == 4) {
				if (perYou.isMaleSex()) {
					addLinkToPlace(md, 'be a motherfucker', 154, 'type=momfuck');
					addLinkToPlace(md, 'ask for a blowjob', 154, 'type=mombj');
				} else {
					addLinkToPlace(md, 'ask her to lick you', 154, 'type=mombj');
					addLinkToPlace(md, 'be a motherfucker', 154, 'type=momfuck');
				}
			}			
			if (perGabby.isHere()) {
				if (this.getCharmedLevel() > 0) addLinkToPlace(md, 'ask if you may watch', 154, 'type=momgabbywatch');
				if (this.getCharmedLevel() != 1) addLinkToPlace(md, 'ask if you may join', 154, 'type=momgabbyjoin');
			} else if (this.getCharmedLevel() != 1 && getCharmedLevel("Tracy") == 2) addLinkToPlace(md, 'call in Tracy for some family time', 154, 'type=momtracythreesome');

		}
		
		if (perKhan.getPath() == 10) {
			// Sent her to arrest davy - this sets her as "SHOT"
			addQuestionC(md, '"Hey Mom, what did you hear about ' + getOfficer() + ' Khan?"', "Mom", 5210);
		}

		// If (Sarah Gates set as in town && haven't opened up the
		if (this.checkFlag(8) || (wherePerson("Sarah") == 1 && getPersonOther("Sarah") === 0)) {
			addQuestionC(md, '"Any news from around town, Mom?"', "Mom", 2900);
		}

		if (this.other > 1 && this.other < 5 && isMurderPath()) {
			// Talked to Mom, but haven't cleaned shirt
			addQuestionC(md, '"Could you, uh... possibly wash my shirt for me?"', "Mom", 2605);
		}

		if (this.other > 0 && !isCharmedPath() && !this.checkFlag(6) && perYou.getBankBalance() > 0 && !checkPersonFlag("Kristin", 13)) {
			// Murder path, Have and account and Bank Manager not accessible
			addQuestionC(md, '"Do you think you could help me get a credit card?"', "Mom", 2620);
		}
		
		if (this.getCharmedLevel() == 4) {
			this.addDancingLink(md, 'talk to Mom about dancing in the club',
				'You mention to Mom about the Avernus club and the dancers there, and she looks at you knowingly,</p>' +
				'<p>&quot;And you want to see your mother dance, don\'t you ' + this.getPersonName() + '! Well, why not, for this once.&quot; and with that you call Jade to arrange a dance for Mom..well for Alex.'
			);
		}

		if (perGabby.isHere() && this.isCharmedBy()) {
			addSleepLink(md, "ask to share the bed this night", "Sleeping with Mom and Gabby",
				'<p style="position:absolute;left:25%;top:85%;cursor:pointer;font-size:1.1em;width:70%">' +
				'You sleep tightly, snuggled between your hot Mom and her equally hot lover with lots of lewd dreams.',
				'People/Gabby/gabby-mom7.jpg'
			);			
		} else if (this.getCharmedLevel() > 1) {
			this.addSleepLink(md, "ask Mom to spend the night", "Sleeping with Mom",
				'<p style="position:absolute;left:5%;top:75%;cursor:pointer;font-size:1.1em;width:90%">' +
				'You ask Mom if you can sleep in her bed tonight,<br>' +
				'"Like when you were a child", she asks, knowing well that it will not be the same.',
				'mom-bed1.jpg'
			);
		}
		
	};
	
	per.showEventSleep = function(wt)
	{
		if ((Place !== 46 && Place !== 170) && !perYou.checkFlag(14) && this.whereNow() == 154) {
			// First time spending the night away from home
			perYou.setFlag(14);
		}
		return false;
	};
	
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			if (Place == 154) {
				//Mom's Room
				if (this.isCharmedBy()) addComments('<img src="Images/' + this.getImg('mom6a.jpg') + '" style="float:left;width:20%;margin-bottom:1em;margin-right:5px">Your mother is already under your charm spell');
				else if (this.extra[0] < 1 && !this.checkFlag(2)) addComments('<img src="Images/' + this.getImg('mom6a.jpg') + '" style="float:left;width:20%;margin-bottom:1em;margin-right:5px">Not your mother!');
				else if (!this.checkFlag(7)) {
					
					var cost = perYou.checkFlag(17) ? 9 : 10;
					if (nMana < cost) addComments('You do not have enough mana to cast the spell.');
					else {
						setCommentsNoClick(
							'<div style="margin-top:1em;margin-bottom:1em;margin-left:2em;margin-right:2em;cursor:default;">' +
							'<table><tr><td width="80%"><p>You decide to take the step and...protect..your mother and quietly recite the spell. You smell a faint smell of brimstone...</p>'
						);
						addOptionLink("comments", '...but otherwise nothing happens', "setPersonFlag('Mom',7);dispPlace(undefined,'','<img src=\\\'Images/" + this.getImg('mom6a.jpg') + "\\\' style=\\\'width:20%;float:right;margin-bottom:1em;margin-left:5px\\\' alt=\\\'Mom\\\'>The spell fails, that demon must still be affecting her in some way!</p><p>If you want to...protect...her then you will have to find another way.')");
						//addOptionLink("comments", '...and your mother looks at you surprised', "CastCharmSpell('Mom',154,1,'type=charm1')");
						addComments('</td><td width="20%"><img src="Images/' + this.getImg('mom6a.jpg') + '" style="width:95%;" alt="Mom"></td></tr></table>');
					}
				} else if (this.checkFlag(32) && !this.isCharmedBy()) addComments("<img src='Images/" + this.getImg('mom6a.jpg') + "' style='width:20%;float:right;margin-bottom:1em;margin-left:5px' alt='Mom'>You decided not to charm Mom at Gabby\'s home, so that is it, no point in changing your mind now.");
				else addComments("<img src='Images/" + this.getImg('mom6a.jpg') + "' style='width:20%;float:right;margin-bottom:1em;margin-left:5px' alt='Mom'>The spell still fails, the effects of the demon must be still present");
				return "handled";
			} 
			// Mom at Gabby's home
			else if (Place == 452 && !this.isCharmedBy()) {
				if (sType == "momnecklacemaster" || sType == "momnecklace") {
					CastCharmSpell("Mom", Place, 1, 'type=momghcharm1');
					return "handled";
				} else if (!this.checkFlag(32)) {
					addComments('You might need the necklace to undo Gabby\'s hypnosis, better get it before using the spell.');
					return 'handled';
				}
			} else if (Place == 415) {
				// Mom (at her office) with Gabby
				if (sType.indexOf("lookmomgabby") != -1) {
					addComments(
						"You whisper the words and begin to cast the spell but something... is not right. A strange feeling of dread washes over you, as if it would be a really bad idea to use that spell now...</p>" +
						"<p>Maybe Gabby has some sort of protection in place? You can't risk it, better learn more about her and the necklace, first."
					);
				} else if (this.checkFlag(32) && !this.isCharmedBy()) addComments("<img src='Images/" + this.getImg('mom6a.jpg') + "' style='width:20%;float:right;margin-bottom:1em;margin-left:5px' alt='Mom'>You decided not to charm Mom at Gabby\'s home, so that is it, no point in changing your mind now.");
				else if (this.isCharmedBy() && !isCharmedBy("Gabby")) addComments('The spell has no effect at all! Gabby looks at you oddly "What was that?" but is otherwise unaffected. Does this mean she is protected or that there is something else odd.');
				else if (!this.isCharmedBy()) addComments('You cannot charm both your mother and Gabby at once, you will have to separate them.');
				else addComments('You read a spell.... but it fizzles.');
				return 'handled';
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls
	per.isPhoneable = function() {
		// Can you call them?
		if ((this.place == 154 || this.place == 415) && perYou.isStuck()) return true;
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.whereNow() == 154;
	};

	per.callThem = function() {
		if (Place == 269) {
			gotoPlace(Place, 'type=mompool');
			receiveCall('', 'You call Mom to invite her to join you at the pool for a swim, and she immediately answers, "Sure ' + perYou.getPersonName() + ', why not. I\'ll be there in a while!"');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (perYou.isStuck()) {
			if (isAtLocation(16)) {
				// Mansion
				if (this.checkFlag(36)) {
					receiveCall('', 
						'You have no idea how to get back to town and call Mom for help,</p>' +
						'<p>"Ok, ' + perYou.getPersonName() + ' I can afford it this once, but you will have to pay me back! Tell the taxi driver I will pay the fare and have them call me if they doubt you."</p>' + 
						addLinkToPlace("string", '"Thanks Mom', wherePerson("Mom") == 154 ? 45 : 359, 'type=momtaxi') +
						addOptionLink("string", '"Not yet Mom, I\'ll call you back"', "dispPlace()")
					);					
				} else {
					this.setFlag(36);
					receiveCall('', 
						'You realise you are a bit stuck and cannot quite work out how to get back to town, not enough money for the taxi ' + (isSpellKnown("Teleport") ? 'or mana to teleport somewhere else' : '') + '. You decide to call Mom for help. When she answers you avoid directly asking but Mom reaslises something is up and gets you to explain. She tells you,</p>' +
						'<p>"' + perYou.getPersonName() + ' you know money is tight, it would be difficult for me to pay for a taxi for you. Is there anyone else there who can help you out? Please check and I will see if I can afford to pay for a taxi for you. Call me back if you cannot work out anything."'
					);
				}
			// Church
			} else if (this.checkFlag(37)) {
				receiveCall('', 
					'You have no idea how to get back to town and call Mom for help,</p>' +
					'<p>"Ok, ' + perYou.getPersonName() + ' I can afford it this once, but you will have to pay me back! Tell the taxi driver I will pay the fare and have them call me if they doubt you."</p>' + 
					addLinkToPlace("string", '"Thanks Mom', wherePerson("Mom") == 154 ? 45 : 359, 'type=momtaxi') +
					addOptionLink("string", '"Not yet Mom, I\'ll call you back"', "dispPlace()")
				);				
			} else {
				this.setFlag(37);
				receiveCall('', 
					'You realise you are a bit stuck and cannot quite work out how to get back to town, not enough money for the taxi ' + (isSpellKnown("Teleport") ? 'or mana to teleport somewhere else' : '') + '. You decide to call Mom for help. When she answers you avoid directly asking but Mom reaslises something is up and gets you to explain. She tells you,</p>' +
					'<p>"' + perYou.getPersonName() + ' you know money is tight , it would be difficult for my to pay for a taxi for you. Is there anyone else there who can help you out? Please check and I will see if I can afford to pay for a taxi for you. Call me back if you cannot work out anything."'
				);				
			}
			WriteCommentsFooter(bChat, bChatLeft);

		}
	};

	per.addPersonPhoneCall = function() {
		if (perYou.checkFlag(14) && !this.checkFlag(11)) {
			// One-off SMS, the morning after spending the night elsewhere
			if (makeCall(true, 200)) this.setFlag(11);
		}
		if (this.checkFlag(20) && !this.checkFlag(19) && !bNewSMS) {
			// Phone call morning after leaves for work
			if (makeCall(false, "Mom", 
				'“Hello ' + perYou.getPersonName() + '!” Mom\'s voice chimes out of the phone. “I\'m sorry honey, but it seems I have miscalculated just how long I will be needed here, could you do me a favor and get a few extra clothes from home?”</p>' +
				'<p>Of course, it\'s no problem, and Mom sends you a small list of items with descriptions where to find them. She apologizes several times for not being at home for a few days, telling you where to find food, to do homework and not forget to study until you hear Gabby\'s voice in the background, impatiently calling her back to work.</p>' +
				'<p>“I\'m sorry, ' + perYou.getPersonName() + '!.” Mom laughs. “My “beloved” assistant sometimes forgets that she is not the one in charge. I\'ll see you in a bit!”</p>' +
				'<p>Mom hangs up, and you quickly open the list she had sent you. It contains enough clothes for 5 days, so this is likely how long she\'ll be with Gabby, but you may really want to bring everything to her as soon as possible."'))
			{
				this.setFlag(19);
				this.charmedTime = nTime;
				return true;
			}
		}
		if (this.checkFlag(20) && (!this.checkFlag(21) || perYou.FindItem(66) > 0) && getHour() >= 18 && !this.checkFlag(32)) {
			// Not delivered the clothing yet (got them or given them)
			var d = Math.floor(this.hoursCharmed("skip") / 24) + 1;		// Days she has left for work, 1,2,3 etc
			switch (d) {
				case 1:
					if (!this.checkFlag(22)) {
						if (makeCall(true, 201)) this.setFlag(22);
					}
					break;
				case 2:
					if (!this.checkFlag(23)) {
						if (makeCall(true, 202)) this.setFlag(23);
					}
					break;
				case 4:
					if (!this.checkFlag(24)) {
						if (makeCall(true, 203)) this.setFlag(24);
					}
					break;
			}
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		if (id == 200) return receiveSMS('Mom', 'Hey ' + perYou.getPersonName() + ' tell me if you are not going to spend the night at home, I missed you') + replyToSMS('Sorry Mom!');		
		if (id == 201) return receiveSMS('Mom', 'It\'s getting late, hun. Did something happen?') + replyToSMS('Agh, sorry Mom, something came up and I didn\'t make it.') + receiveSMS('Mom', 'Don\'t worry about it. They lock the studio now for security reasons, but please make sure you bring everything tomorrow.') + replyToSMS('Will do.');
		if (id == 202) return receiveSMS('Mom', perYou.getPersonName() + '? I\'m still waiting for you, and you are usually not that unreliable. Is everything alright?') + replyToSMS('Yes, of course. I must have gotten caught up in my homework, I\'ll bring everything by tomorrow.') + receiveSMS('Mom', 'Please do so. Will it help if I promise to model the underwear?') + replyToSMS('What?') + receiveSMS('Mom', 'Please ignore the last text, I really don\'t know why I wrote this.');
		if (id == 203) return receiveSMS('Mom', 'You don\'t need to worry about the clothes anymore, dear. It turned out I really didn\'t need much to wear, anyway.') + replyToSMS('What do you mean?') + replyToSMS('Mom?');	
		return '';
	};

}
