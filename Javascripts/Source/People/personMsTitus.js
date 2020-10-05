/***********************************************
	Ms Titus, Librarian Receptionist
***********************************************/
function RepliesMsTitus(nR)
{
	var bCharm = per.isCharmedBy() || per.isFreeSlave();
	var myName = per.getYourNameFor();
	bChatLeft = Place != 3 || !per.isFreeSlave();

	var ret = true;

	if (nR == 100)
	{
		per.setFlag(10);
		addComments('"Tess called in sick today, she will be staying home", you ');
		if (bCharm) {
			addComments('ask where that is and your slave tells you their address "2628 Rathdown Rd, Glenvale"');
			setPlaceKnown("AdamsHouse");
		} else addComments('consider asking for her address but you know there is no chance Ms. Titus will give you the address.');
	}
	else if (nR == 181)
	{
		per.other = 2;
		if (Math.random() < 0.5) addComments('"That book is from just a legend, try looking for tales about it in the fiction section. A web-search should find references to novels featuring it."');
		else addComments('"I believe that you are looking for the fiction section. Look it up by the author\'s name."');
	}
	else if (nR == 171) // v17 = Ms Titus Charmed Path
	{
		setPlaceFlag("Library", 2);
		addComments('"Whatever you say, ' + myName + '. I\'ll lock the door so that only you can come and go."');
	}
	else if (nR == 172)
	{
		bChat = false;
		addComments('You take the scroll. It reads something about a possession spell.');
		if (!isRunes()) {
			setQueryParams("type=learnpossession");
		} else {
			Research("Spell", "UnstrHun");
			ret = false;
		}
	}
	else if (nR == 173)
	{
		per.setFlag(6);
		per.other = 10;
		addComments('<p>Ms Titus explains, "I studied early settlements, ' + myName + '.  Did you know that this town has a lot of vague history? I wanted to find out more about what happened to the first settlers of Glenvale.  Do you know, ' + myName + '?"</p><p>You remember reading something about early settlers in History class.</p>');
	}
	else if (nR == 174) // v17 = Ms Titus Charmed Path
	{
		setPlaceFlag("Library", 2, false);
		addComments('"Whatever you say, ' + myName + '. I\'ll re-open the library for general use."');
	}
	else if (nR == 200)
	{
		per.other = 4;
		if (!bCharm) addComments('<img src="UI/books/citadelbook.jpg" style="width:20%;float:right;margin-left:5px;margin-bottom:1em" alt="Citadel">An exciting book, "\'Citadel of Servitude\' by Aran Ashe", she answers with a glint in her eyes as she shows you the cover.</p><p>You have never heard of the book, it sounds like some sort of fantasy novel, and you more prefer the reality of magic and Kurndorf\'s book. You say something non-committal and she just smiles and returns to reading.');
		else addComments('<img src="UI/books/citadelbook.jpg" style="width:20%;float:right;margin-left:5px;margin-bottom:1em" alt="Citadel">An exciting book, "\'Citadel of Servitude\' by Aran Ashe, a lovely tale of bondage and slavery", she answers with a glint in her eyes as she shows you the cover.');
	}
	else if (nR == 1811)
	{
		per.other = 12;
		if (!isPlaceKnown("SacredClearing")) setPlaceKnown("SacredClearing");  // Knows where to find Sacred Clearing
		addComments('<p>"They were buried at the sacred clearing!" exclaims Ms Titus "Amazing, that is right beside the Gates Mansion."</p>');
	}
	else if (nR == 1101)
	{
		if (perDavy.getPathHellgate() == 1) perDavy.setPathHellgate(4);
		if (!bCharm) addComments('"Davy Robbins?," she replies, annoyed at the interruption. "Let me check our database registry. Oh yes, he came in to use the computer today."');
		else addComments('"Davy Robbins?," she replies. "Yes ' + myName + ', he was in earlier asking for help using the computers today."');
	}
	else if (nR == 1104)
	{
		if (perDavy.getPathHellgate() == 4) perDavy.setPathHellgate(5);
		movePerson("Monique", 53);  //  Place Monique in the Alley Hidden Room
		if (!bCharm) addComments('<p>Ms. Titus replies, "I don\'t know what Davy used it for ' + perYou.getMaster() + '. Find Monique. She knows how to use the computer."</p>');
		else addComments('<p>Ms. Titus looks upset and begins to apologize.  "I\'m sorry, ' + myName + ' I don\'t know, and I don\'t know how to find out either."  She seems very upset with herself, then suddenly perks up.  "I know ' + myName + '! Perhaps you could convince Monique to help. She knows how to use computers much better than I."</p>');
	}
	else if (nR == 2000)
	{
		setPlaceKnown("MsTitussHouse");
		addComments('<p>Ms. Titus answers, "Of course, ' + myName + ', it is 2628 Rathdown Rd. Please visit me anytime after the Library closes."</p>');
	}

	return ret;
}

function initialiseTitus()
{
	// Ms Titus
	addPerson("Ms. Titus", 3, "MsTitus", '', false);

	per.Replies = RepliesMsTitus;
	per.getPersonAddress = function() { return isPlaceKnown("MsTitussHouse") ? '2628 Rathdown Rd, Glenvale' : ''; };

	per.isFreeSlave = function() { return this.checkFlag(8); };

	per.getYourNameFor = function() {
		if (this.isFreeSlave()) return perYou.getMaster();
		if (!this.isCharmedBy()) return perYou.getPersonName();
		return perYou.getMaster();
	};
	per.getPersonName = function(full) {
		if (full !== true && this.isFreeSlave()) return "Your slave, " + this.name;
		return this.name;
	};


	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		if (this.isFreeSlave()) {
			// A willing slave/submissive
			return this.addPersonString("titus12.jpg", "height:max%", "right") +
			"Ms. Titus has willing become your slave, she loves domination and submission. She has moved to a dark areas at the end of a row of book-shelves so she can be tied up as your slave.";

		} else if (!this.isCharmedBy()) {
			// Not charmed or a slave
			return this.addPersonString("titus8.jpg", "height:max%", "right") +
			"Ms. Titus runs the main desk of the library, but you know little more about her, she is very business-like and tolerates no chit-chat." +
			"<br><br>" +
			"Your eyes are always drawn to the most obvious thing about her, her large cleavage, but you know Ms. Titus does not respond well to any sort of flirtation. Still you have daydreamed about her cleavage and what you would do if you got your hands on it.";

		} else {
			// Charmed
			return this.addPersonString("titus2b.jpg", "height:max%", "right") +
			"Ms. Titus, or Karen Titus as she revealed to you her full name during one of your sex-filled adventure with her, runs the main desk of the library, one time you thought she was calm and business-like. Now you know she is an experienced slut, eager for sex at anytime. She no longer hush you away or tells you that she doesn’t have time for you. During sex you realized she\'s quite experienced in the ways of pleasing a man or a woman, " +
			(perYou.isMaleSex() ? "her blowjobs are one of the best you’ve ever had. " : "she can lick your pussy better than anyone ever has. ") +
			"She has sex toys below her desk for quiet times in the library. That’s when she closes the place for \"breakfast or dinner time\" and only the staff can enter, so she has to take her toys to the bathroom. That is the room where she has her fun time for fifteen minutes if you’re not there to give her a hand. " +
			"<br><br>" +
			"Your eyes are always drawn to her large cleavage, you no longer have to daydream about getting your hands on them.";
		}
	};

	per.whereNow = function() {
		if (isShopOpen(2, 1, true)) return this.place;
		// Library is closed
		if (Place == 3 && (!isPlaceBreakIn("Library") && (this.isCharmedBy() || this.isFreeSlave()))) return Place;
		return 228;	
	};
	per.getPossessionFace = function() { return "titus25"; };

	per.passTimeDay = function() {
		setPlaceFlag("Library", 2, false);	// Open the library on a new day
		if (Place == 228 && isShopOpen(2, 1, true)) return capitalizeFirstLetter(this.getPersonName()) + ' leaves you to head off to the library';
		return '';
	};

	per.passTimeNight = function() {
		this.setFlag(11, !this.checkFlag(11));
		if (Place == 228 && !isShopOpen(2, 1, true)) return capitalizeFirstLetter(this.getPersonName()) + ' returns home from the library and resumes her duties as your slave';
		return "";
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 228) {
			if (sType !== "") return "";
			var s;
			if (this.isHere()) s = this.showPerson("titus-home" + (this.isFreeSlave() ? "-free" : "") + (this.checkFlag(11) ? "2" : "1") + ".jpg", '', '', '', '', false, "string");
			else s = "<img draggable='false' style='float:left;position:relative;max-height:99%;vertical-align:top;padding:0;width:95%' src='Images/livingroom5.jpg' alt='livingroom5'>";
			if (checkPlaceFlag("RathdownRd", 4)) {
				s += AddImage("Items/bowl.jpg", "20%", "left", '', '', undefined, "string", 'none') +
						"<p>The ornamental bowl is sitting outside on the patio.</p>";
			}
			return s;
		}
		return "";
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 228 && sType === "") {
			// Ms Titus's house
			if (this.isHere()) {
				if (this.isFreeSlave()) {
					md.write(
						'<p>Karen Titus is waiting for you, she has tied and gagged herself as she likes to do. She is wearing some skimpy lingerie that does not really contain her cleavage.</p>'
					);
				} else {
					md.write(
						'<p>Karen Titus is waiting for you, wearing some lovely lingerie that barely contains her cleavage.</p>'
					);
				}
			}
			if (this.isHere() && this.checkFlag(14) && !checkPlaceFlag("RathdownRd", 5)) {
				md.write('<p style="clear:both">');
				AddImage("UI/books/alchemybook.jpg", "20%", "left", '', '', undefined, md, 'none');
				md.write('You see collection of books piled in an irregular stack. One attracts your attention "Carnal Alchemy".</p>');
			}
		}
	};
	
	per.showEventPopup = function()
	{
		if (Place == 3 && sType == "flee") {
			showPopupWindow("Mrs. Adams Flees",
				findPerson("Tess").addPersonString("tess1d.jpg", "height:max%", "right") +
				'You step out of Mrs. Adams office leaving her to deal with the effects of the charm spell and you hear her softly say something like "John..."<br><br>' +
				'As you return to the main area of the library you hear someone running in high-heels, but for a moment Ms. Titus\'s cleavage distracts you.<br><br>' +
				'You tear your eyes away and see Mrs. Adams run through the front door of the library. You run after her, and hear Ms. Titus<br><br>"No running in the library!".<br><br>At the door you see Mrs. Adams getting into an expensive car, slamming the door and driving away quickly to the north, towards the business and civic area of town.<br><br>' +
				'You ask Ms. Titus where she ran off to and she answers, "Shhh!...but probably to meet her husband at his office in the Town Hall"'
			);
			setPlaceKnown("TownHall");
			movePerson("Tess", 96);
			return true;
		}
		
		if (sType !== "") return false;
		
		if (Place != 3 || !isShopOpen(2, 1, true)) return false;
		
		// Library reception events
		
		if ((this.isCharmedBy() || this.isFreeSlave()) && isSpellKnown("Shielded Charm") && !isCharmedBy("Kristin") && !this.checkFlag(15)) {
			this.setFlag(15);
			showPopupWindow("Ms. Titus on the phone",
				this.addPersonString("titus27.jpg", "width:40%", "right") +
				'Ms Titus is not at her usual spot when you enter the library, and it takes a bit of looking around until you find her in one of the backrooms. You are treated you to quite a sight, though.</p>' +
				'<p>She is pleasantly chatting on the phone and wearing little more than her stockings and shoes with only her own hand covering her sex.</p>' +
				'<p>It takes her a moment to notice you, and when she does, she quickly signals you to wait as she finishes the call.</p>' +
				'<p>“Sorry babe, someone needs a hand... no it\'s not me.”</p>' +
				'<p>“Yes, tonight still good?”</p>' +
				'<p>“Oh yes, I actually may have a ' + (perYou.isMaleSex() ? 'big one' : 'cute thing') + ' for you as well.” You notice her looking at you as she says that.</p>' +
				'<p>“Right, looking forward to it, bye.”</p>' +
				'<p>She smacks her lips in a pretend kiss and finally puts the phone down, turning to you without making any effort to actually stop touching herself.</p>' +
				'<p>“' + perYou.getMaster() + '! What can your faithful slut do for you?”'
			);
			return true;
		}
		
		if (this.checkFlag(1) && !this.checkFlag(2)) {
			showPopupWindow(this.getPersonName(),
				this.addPersonString((this.isFreeSlave() ? "titus12" : "titus9") + ".jpg", "40%", "right") +
				'"Tell me,what’s the deal with those huge juggs of yours?", you ask Karen Titus.<br><br>' +
				'"Ohh, you mean these, ' + perYou.getMaster() + '?", she plays with them for your entertainment. They’re always out of her shirts if you are there.<br><br>' +
				'"It’s genetics. My mother has a little bit bigger pair than mine’s and my sister also has a lovely big pair too! Are they bothering you? I can make them smaller if you want, just tell the word an I will go to a doctor.", she says gesturing you to come closer and touch them.<br><br>' +
				'"What?! No! They’re one lovely pair! Don’t change them! And what’s with the submissivness? I feel I could have made you my slave without having to charm you. It’s like you really wanted to give in, in a sluttiest way possible!", you ask, but you’re mesmerized by those breasts of her. You cannot take your eyes of them.<br><br>' +
				'"You are correct, my dear! I have always been interested in a BDSM relationship. I had a partner for a year who made me do things like binding my hands, tying me to a pole while he fucked me and do slave poses in front of him. He even punished me if I behaved naughty. Those were my best moments of my life up until I met you, my ' + perYou.getMaster() + '!", she says excitedly.<br><br>' +
				'You play with the idea of taking her right here and right now, but you’ve got some important things to do so you order her to continue her work. However you feel you two will have a wonderful relationship. Her experience and your enthusiasm will surely click together perfectly.',
				"setPersonFlag('MsTitus',2)"
			);
			return true;
		} 
		
		var perTess = findPerson("Tess");
		if (isPlaceKnown("JohnAdamsOffice") && !(this.isCharmedBy() || this.isFreeSlave()) && !this.checkFlag(9) && perTess.place === 0 && perYou.isQuestComplete(1) && perTess.hoursCharmed() < 3) {
			// Event on returning to the library after following Tess to the Town Hall AND must be within 2 hours of the start of charming her
			showPopupWindow("Ms. Titus Watches",
				this.addPersonString("titus1b.jpg", "height:max%", "right") +
				'As you are walking towards Tess\'s office you notice the librarian Ms. Titus looking at you oddly. Her dress, which is shorter than you had noticed before, has ridden up exposing her panties. If this were someone other than the business-like Ms. Titus you would have thought that you had interrupted her masturbating or something like that!<br><br>' +
				'You consider talking to her, and take a step towards her, not quite sure what to ask her. She shakes her head and puts a finger to her lips in an exaggerated \"Shhhh\" gesture, or more likely \"Go away I do not want to talk to you\".',
				"setPersonFlag('MsTitus',9)"
			);
			return true;
		}
		
		
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (Place == 282 && sType == "poledancesex") {
			md = WritePlaceHeader();
			if (isExplicit()) this.showPersonX("poledance-sex" + (isMaleSex() ? "b" : "g") + ".jpg");
			else if (perYou.isMaleSex()) this.showPerson("kristintitus1m.jpg");
			else this.showPerson("poledance-sexg.jpg");
			addPlaceTitle(md, "Enjoy Ms. Titu's Service");
			md.write(
				'<p>Karen is completely shameless and openly in the club kneels down and ' +
				(perYou.isMaleSex() ? 'takes out your cock from your pants ands her hands and tongue along your length.' :
											 'removes your pants and panties and licks along your folds.') +
				' You are initially embarrassed here in public but notice <i>no-one</i> pays any attention, as if this is routine and expected. You relax into her attentions and she expertly brings you to a satisfactory if awkward and public climax.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'relax and enjoy the club', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (Place == 269) {
			if (sType == "tituspool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("titus-pool.jpg");
				addPlaceTitle(md, "Swimming with Ms. Titus");
				md.write(
					'<p>Ms. Titus arrives, dressed is a one piece swimsuit, you suppose she needs something to contain her cleavage properly, or is that just you fantasising. She joins you on a lounge by the poolside, ready for anything as always.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=tituspoolsex');
				addLinkToPlaceC(md, 'say goodbye to Karen', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "tituspoolsex") {
				md = WritePlaceHeader(false, 'td-left-large');
				this.showPerson("titus-pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Ms. Titus");
				md.write(
					'<p>You ask your large breasted librarian to play with you more privately, and she seductively removes most of her swimsuit and lies back waiting for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Karen', Place);
				WritePlaceFooter(md);
				return true;
			}
		}

		if (sType == "charmtitus1") {
			md = WritePlaceHeader();

			this.other = 10;  // add access to further questions
			this.place = 3; // Move her back out into the Reception in case she's in Tess' Office
			
			this.showPerson("titus22.jpg");

			addPlaceTitle(md, "Ms. Titus Under a Spell");
			md.write(
				'<p>Miss Titus turns around. "What did you say?" she asks.</p>' +
				'<p>You remain silent and wait for the spell to take effect. After a moment, Ms. Titus does an elaborate stretch, thrusting out her already prominent chest, and she looks at '
			);
			if (Place != 3) md.write('Tess and then at you. She is smiling and waiting for one of you to explain or at least speak. Tess looks at you.</p>');
			else md.write('you. She is smiling and waiting for you to explain or at least speak.</p>');

			startQuestions();
			addLinkToPlace(md, "force Ms. Titus to submit to your commands", Place, 'type=charmtitus2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmtitus2") {
			md = WritePlaceHeader(false, "td-left-large");

			this.showPerson("titus23.jpg");
			addPlaceTitle(md, "Ms. Titus Under a Spell");
			md.write(
				'<p>You order Ms. Titus to submit completely and utterly to your commands. To your surprise she replies,</p>' +
				'<p>"Oh submission!" replies Ms. Titus. "You should have said so. I have always wanted to be dominated, I fantasise about it all the time. You are just the one to be my ' + perYou.getMaster() + '."</p>' +
				'<p>You nod mutely, she\'s pulled down her top, and breasts fill your vision and have taken your voice for a moment.</p>'
			);
			
			startQuestions();
			addLinkToPlaceC(md, "order your new slave to surrender completely", Place, 'type=charmtitus3');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmtitus3") {
			md = WritePlaceHeader(false, isExplicit() ? "td-left-large" : "");

			setPersonFlagAfterTime("MsTitus", 1, true, 288);

			if (perYou.isMaleSex()) {
				this.showPersonRorX("titus24b.jpg");
				addPlaceTitle(md, "Ms. Titus Under a Spell");
				md.write('<p>Ms. Titus does not wait for a second longer.  Reaching over, she expertly undoes your fly and pulls out your cock.  With a satisfied grin she expertly swallows you whole.  Despite your best efforts, you do not last long.</p>');

			} else {
				this.showPerson("titus24g.jpg");
				addPlaceTitle(md, "Ms. Titus Under a Spell");
				md.write('<p>Ms. Titus can not contain herself and yanks up her skirt. Leaning back and giving you a lascivious grin she offers all that she is. "Oh please ' + perYou.getMaster() + '," she begs, "Use me, dominate me!"</p>');
			}

			startQuestions();
			if (Place == 3) addLinkToPlace(md, "speak more to Ms. Titus", 3, '');
			else {
				if (isCharmedBy("Tess")) addLinkToPlace(md, "talk to Tess Adams", 29, 'type=continue');
				addLinkToPlace(md, "return to the library reception", 3);
			}
			WritePlaceFooter(md);
			return true;
		}			

		if (Place == 228) {
			if (sType == "fuck") {
				// Sex scenes at her home
				md = WritePlaceHeader();

				if (perYou.isMaleSex()) {
					this.showPersonRorX("titus-home-sex-b" + (this.isFreeSlave() && !isExplicit() ? "-free" : "") + ".jpg");
					addPlaceTitle(md, "Karen Titus");
					md.write('<p>You fully enjoy the body of your librarian Karen Titus</p>');
				} else {
					this.showPerson("titus-home-sex-g" + (this.isFreeSlave() ? "-free" : "") + ".jpg");
					addPlaceTitle(md, "Karen Titus");
					md.write('<p>You fully enjoy the body of your librarian Karen Titus</p>');
				}
				startQuestions();
				addLinkToPlaceC(md, 'talk more to Karen', 228);
				addLinkToPlace(md, 'exit the house', 229);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "slavecharm") {
				// Charm her as a free slave at home
				md = WritePlaceHeader(false, 'td-left-med');
				this.setFlag(8, false);		// No longer a Free slave

				this.showPerson("titus-charm-free" + (this.checkFlag(11) ? "2" : "1") + ".jpg");
				addPlaceTitle(md, "Your Slave Ms. Titus Under a Charm Spell");
				md.write(
					'<p>While it is a waste of mana, you decide it is best to be safe and charm Ms. Titus. You step over to the bed she has tied herself to and recite the spell. There is no need to talk to her about submission and slavery, she is already your slave!</p>' +
					'<p>She looks up at you and spreads her legs, "I do not know what that was ' + perYou.getMaster() + ' but I like it! Take me please!"</p>' +
					'<p>Again you enjoy your slave and her submission. Afterwards she changes her lingerie and unties herself. She has clearly been affected by the spell but you are unsure why she decided to change. You ask her but she does not really know why, just that she wanted to.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'talk more to your charmed slave', Place);
				WritePlaceFooter(md);
				return true;

			}
			if (sType == "contemplate") {
				// Contemplate the bowl
				md = WritePlaceHeader();
				AddImage("Items/bowl.jpg");
				addPlaceTitle(md, "Meditating on the Patio");
				md.write('<p>You look at the bowl of water but meditation has never been a thing for you.</p>');
				startQuestions();
				addLinkToPlaceC(md, "that is enough", Place);
				WritePlaceFooter(md);
				return true;
				
			}
			if (sType == "interrupted") {
				// Contemplate the bowl, but interrupted
				md = WritePlaceHeader();
				this.showPerson("titus-home" + (this.isFreeSlave() ? "-free" : "") + (this.checkFlag(11) ? "2" : "1") + "-interrupt.jpg");
				addPlaceTitle(md, "Trying to Meditate");
				md.write(
					'<p>You try to meditate but as you do is feeling lonely and tried to attract your attention back to her. It is impossible to meditate, you will have to try this another time when she is not around.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "another time then", Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "karenkristin1") {
				// Titus/Kristin scene
				this.setFlag(19);
				md = WritePlaceHeader();
				this.showPerson("titus26.jpg");
				addPlaceTitle(md, "Ready for the Party?");
				md.write(
					'<p>Ms Titus opens the door for you practically naked and pulls you into her house. “Welcome to my humble abode, ' + perYou.getMaster() + '.” She leads you into the bedroom. “Kristin should be here in about half an hour and I told her the door will be unlocked, so...” She suddenly throws you on the bed and crawls on top of you, getting ready to pull off your shirt. “...we do have a bit of time to kill.”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "ask what she has in mind", Place, 'type=karenkristin2');
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == "karenkristin2") {
				// Titus/Kristin scene 2
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPersonRorX("kristintitus1" + (perYou.isMaleSex() ? "m" : "f") + ".jpg");
				addPlaceTitle(md, "Waiting for Kristin");
				md.write(
					'<p>Karen doesn\'t reply and instead pulls down your pants with enthusiasm while you take off your shirt. She wastes absolutely no time and eagerly begins to run her tongue over your ' + (perYou.isMaleSex() ? 'manhood' : 'folds') + '.</p>' +
					'<p>' + (perYou.isMaleSex() ? 'It doesn\'t take long to get you hard with her skilled lips and fingers trailing the thick veins on your shaft, but the moment her lips wrap around the tip' : 'It doesn\'t take long for to get you wet with her skilled lips and fingers spreading and caressing your folds, but the moment her lips wrap around your clit') + ', you hear the doorbell, followed by the sound of the front door opening.</p>' +
					'<p>“I\'m a bit early.” A voice from the entry hall shouts. “Should I wait in the living room?”</p>' +
					'<p>Karen looks up to you with a curious gaze, her lips still wrapped around your ' + (perYou.isMaleSex() ? 'cock' : 'clit') + ', and you simply nod.</p>' +
					'<p>“It\'s alright babe.” She pulls back from you. “I\'m in the bedroom and passing time with the “' + (perYou.isMaleSex() ? 'big one' : 'cute thing') + '” I mentioned. Feel free to join me any time.”</p>' +
					'<p>Karens lips go dutifully back to work, and you hear footsteps coming closer.</p>' +
					'<p>“Glad to hear it, I thought you were still getting... ready...”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "Kristin appears in the doorway", Place, 'type=karenkristin3');
				WritePlaceFooter(md);
				return true;
			}	
			
		} else if (Place == 29) {
			if (sType == "slave1") {
				md = WritePlaceHeader();
				this.setFlag(8);		// Free slave
				this.setFlag(14);		// Free slave
				this.charmedTime = nTime;

				this.showPerson("titus11.jpg");
				addPlaceTitle(md, "Ms. Titus Submits");
				perYou.addCorruption(-1);

				md.write(
					'<p>You tell Tess to wait here and start to leave, and you feel a hand on your shoulder and then a pair of large breasts pressed against your back. You hesitate, and Ms. Titus whispers in your ear,</p>' +
					'<p>"You took her as your own! I have always wanted to be dominated, I fantasise about it all the time. You could be the one who could be my ' + perYou.getMaster() + '".</p>' +
					'<p>She gestures towards a dark area between some book-shelves. You nod and lead the way and when you arrive you turn around to confront her, expecting she is making fun of you. Instead you see Ms. Titus has stripped her clothes down to a sheer black camisole and some panties. You are speechless for a moment and before you can speak she says,</p>' +
					'<p>"' + perYou.getMaster() + ' what can your slave do for you, or to you?"</p>' +
					'<p>You have fantasised about this yourself, when you would be able to claim her and her magnificent breasts. You are surprised and delighted that it seems it was so simple, she was just waiting to be dominated. No magic needed to encourage or force her!</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, '"Strip slave! I want to see your breasts"', 29, 'type=slave2');

				WritePlaceFooter(md);
				return true;

			} else if (sType == "slave2") {
				md = WritePlaceHeader();
				setPersonFlagAfterTime("MsTitus", 1, true, 288);		// Timer for follow up event
				this.place = 3; // Put the Receptionist back at her desk

				this.showPerson("titus13.jpg");
				addPlaceTitle(md, "Ms. Titus\'s Breasts");

				md.write(
					'<p>"Yes ' + perYou.getMaster() + ' my tits are yours to touch, to lick, to slap, to beat. I am your tit-slave, yours to command, to punish, to fuck, to humiliate, to do anything to!"</p>' +
					'<p>You realise she has really been fantasising about being a slave, and she may know more about being your slave than you know about being her ' + perYou.getMaster() + ', but you are happy to learn!</p>' +
					'<p>She strips away her camisole leaving just her panties and you reach out and grab one of her breasts, there seems no reason to be gentle, this is not fore-play it is domination and submission play. ' +
					'Her breast weighs heavily in your hand and Ms. Titus looks up at you adoringly as she lowers her panties ready for something more.</p>'
				);
				md.write(
					'<p>You oblige her, and take your unexpected slave! After Ms. Titus tells you,</p>' +
					'<p>"Call me what you want, Karen, slut, slave, they are all my name"</p>'
				);

				startQuestions();
				addLinkToPlace(md, "return to talk more to Tess", 29, 'type=continue');
				addLinkToPlace(md, "go to the reception area.", 3);

				WritePlaceFooter(md);
				return true;

			}

		} else if (Place !== 3) return false;
		
		if (sType == "slavecharm") {
			// Charm her as a free slave in the library
			md = WritePlaceHeader();
			this.setFlag(8, false);		// No longer a Free slave

			this.showPerson("titus-charm-freelib.jpg");
			addPlaceTitle(md, "Your Slave Ms. Titus Under a Charm Spell");

			md.write(
				'<p>While it is a waste of mana, you decide it is best to be safe and charm Ms. Titus. You step over to the bookshelf she has tied herself to and recite the spell. There is no need to talk to her about submission and slavery, she is already your slave!</p>' +
				'<p>She looks up at you, "I do not know what that was ' + perYou.getMaster() + ' but I like it! Take me please!"</p>' +
				'<p>Again you enjoy your slave and after she returns to her desk in the reception area. You realise as you watch that she is going there as it is easier for her to masturbate and play with herself, the arousal of the magic is clearly affecting her.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'talk more to your charmed slave', 3);

			WritePlaceFooter(md);
			return true;
		}
		
		var herNameT = this.getPersonName();

		if (sType == "bj") {
			// Blowjob/lick
			if (perYou.isMaleSex()) {
				md = WritePlaceHeader();
				if (isExplicit()) this.showPersonRandomX("titus5b", this.isFreeSlave() ? 4 : 5, "", "", "", "", this.isFreeSlave() ? 4 : 0);
				else this.showPerson("titus5b.jpg");
				addPlaceTitle(md, "Playing with Ms. Titus");
				md.write('<p>You tell ' + herNameT + ' to use her mouth to pleasure you while she continues to play with herself. She expertly takes your length into her mouth while playing with her large breasts and pussy. You do not take long to release into her mouth, and as you do so she cries out her ecstasy, muffled by your manhood and your fluids. She swallows and lies back and says, "Thank you ' + perYou.getMaster() + '".</p>');
			} else {
				md = WritePlaceHeader();
				this.showPerson(this.isFreeSlave() ? "titus5gf.jpg" : "titus5g.jpg");
				addPlaceTitle(md, "Playing with Ms. Titus");
				md.write('<p>You tell ' + herNameT + ' to use her tongue to pleasure you as she continues to play with herself. To your delight and surprise she is an expert at pleasuring women and she makes you reach the peak of ecstasy quickly. At the same time she cries out her pleasure, muffled by your pussy, and after she lies back and says, "Thank you!".</p>');
			}
			startQuestions();
			addLinkToPlace(md, sType == "monique" ? 'tell them that is enough for now' : 'tell Ms. Titus she\'s had enough for now', 3);
			WritePlaceFooter(md);
			return true;
			
		}
		if (sType == "fuck") {
			// fuck her
			if (perYou.isMaleSex()) {
				md = WritePlaceHeader();
				if (isExplicit()) this.showPersonX("titus4b.jpg");
				else this.showPerson("titus4b.jpg", "height:max");
				addPlaceTitle(md, "Playing with Ms. Titus");
				md.write('<p>You happily agree to take her and you sink you manhood into her delightful pussy, ramming into her over and over. You feel her shudder in her release and that is the final straw and you pour your passion into her depths.</p>');
			} else {
				md = WritePlaceHeader(false, "td-left-med");
				this.showPersonRorX(this.isFreeSlave() ? "titus4gf.jpg" : "titus4g.jpg");
				addPlaceTitle(md, "Playing with Ms. Titus");
				md.write('<p>You agree and decide to use your strap-on to explore ' + herNameT + '\'s lovely ass. You find she is very accommodating and very experienced with this, be it by man or woman. She very much enjoys your strap-on, reaching her peak not long after you do.</p>');
			}
			startQuestions();				
			addLinkToPlace(md, sType == "monique" ? 'tell them that is enough for now' : 'tell Ms. Titus she\'s had enough for now', 3);
			WritePlaceFooter(md);
			return true;
			
		}
		if (sType == "titsfuck") {
			// Tits Fuck (Male only)
			md = WritePlaceHeader();
			if (isExplicit()) this.showPersonRandomX("titus7", 3, "", "left", "", "", this.isFreeSlave() ? 1 : 0);
			else this.showPerson(this.isFreeSlave() ? "titus7f.jpg" : "titus7.jpg");
			addPlaceTitle(md, "Playing with Ms. Titus");
			md.write('<p>' + herNameT + '\'s large breasts are difficult to ignore, so you ask her to use her breasts to pleasure you. This seems to be something she is <i>very</i> familiar with and she uses her very large bossom to please you until you release all over her breasts and face.</p>');
			startQuestions();
			addLinkToPlace(md, sType == "monique" ? 'tell them that is enough for now' : 'tell Ms. Titus she\'s had enough for now', 3);
			WritePlaceFooter(md);
			return true;
			
		} 
		var perMonique = findPerson("Monique");
		if (sType == "monique") {
			// Threesome with Monique
			var img;
			if (perYou.isMaleSex()) {
				if (isExplicit()) img = this.showPersonRandomX("titusmoniqueb", 3, "", "", "", "", undefined, false, "string");
				else img = this.showPerson("titusmoniqueb.jpg", "", "", "", "", false, "string");
			} else img = this.showPerson("titusmoniqueg.jpg", "", "", "", "", false, "string");
			md = WritePlaceHeader();
			md.write(img);
			addPlaceTitle(md, "Playing with Monique and Ms. Titus");
			md.write('<p>You call ' + perMonique.getPersonName() + ' to join ' + herNameT + ' and yourself. They both eagerly do their best to pleasure you and themselves in an wonderful blur or mouths, breasts, asses and pussies.</p>');
			startQuestions();
			addLinkToPlace(md, sType == "monique" ? 'tell them that is enough for now' : 'tell Ms. Titus she\'s had enough for now', 3);
			WritePlaceFooter(md);
			return true;				
		}
		if (sType === "playwithherself") {
			// Play with herself (default entry point for this)
			md = WritePlaceHeader();
			this.showPersonRandomRorX("titus6", 2, "height:max", "", "", "", this.isFreeSlave() && !isExplicit() ? 2 : 0);
			addPlaceTitle(md, "Playing with Ms. Titus");
			md.write('<p>Obeying your command, Ms. Titus eagerly begins to strip. She plays with her large breasts and pussy, performing for you to arouse herself and you. She nears the peak of her pleasure and stops. She begs you, "Take me, ' + perYou.getMaster() + '!".</p>');
			startQuestions();
			if (perYou.isMaleSex()) {
				addLinkToPlace(md, 'fuck her', 3, 'type=fuck');
				addLinkToPlace(md, 'fuck her breasts as she masturbates', 3, 'type=titsfuck');
				addLinkToPlace(md, 'fuck her mouth as she masturbates', 3, 'type=bj');
			} else {
				addLinkToPlace(md, 'lick you as she masturbates', 3, 'type=bj');
				if (perYourBody.FindItem(45) > 0) {
					// own the strap-on
					addTextForQuestions(md, 'or maybe you would prefer to');
					addLinkToPlace(md, 'fuck her with your strap-on', 3, 'type=fuck');
				}
			}
			if (perMonique.place === 8 && perMonique.isCharmedBy()) addLinkToPlace(md, 'call Monique to join you', 3, 'type=monique');
			addLinkToPlace(md, sType == "monique" ? 'tell them that is enough for now' : 'tell Ms. Titus she\'s had enough for now', 3);
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("!poledance", 3);
		addPlaceTitle(md, "Karen's Dance");
		md.write(
			'<p>Karen\'s dance is athletic and makes good use of her large G-cup breasts. The audience is <i>very</i> appreciative.</p>' +
			'<p>After she joins you almost sitting at your feet in a show of subnission. For some this would be her playing a game, but from her nature and the spell this <b>is</b> submission. Karen offers to help you relax even more...</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'accept Ms. Titus\'s offer', Place, 'type=poledancesex');
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 3 && this.isHere() && sType === "") {
			if (this.other === 0) {
				addPopupLinkC(md, 'say hello to the receptionist', "Ms. Titus",
					this.addPersonString("titus8.jpg", "height:max%", "right") +
					"You approach the main desk of the library, usually it is staffed by the woman in front of you. Her name is Ms.Titus but you know little more about her, she is very business-like and tolerates no chit-chat. You notice that she is always reading a book in her freetime. It looks like she has a lot of that, because not many people visit the library anymore." +
					"<br><br>" +
					"Your eyes are drawn to the most obvious thing about her, her large cleavage, but drag your eyes away, as you know Ms. Titus does not respond well to any sort of flirtation. Still you have daydreamed about her cleavage and what you would do if you got your hands on it." +
					"<br><br>You say hello to her, and as usual she only responds with." +
					'<br><br>"Shh!"',
					false, "setPersonOther('MsTitus',1);dispPlace();"
				);
			} else if (this.other === 1) addQuestionC(md, 'ask where you could find the Kurndorf book', "MsTitus", 181);
			else if (this.other === 2) addQuestionCO(md, 'lookup novels featuring the Kurndorf book', "Misc", 182);
			else if (this.other == 3 && perYou.isQuestComplete(1)) addQuestionC(md, '"What book are you reading?"', "MsTitus", 200);
			else if (this.other === 11) addQuestionCO(md, 'tell ' + this.getPersonName() + ' about the early settlers', "MsTitus", 1811);
	
			if (perDavy.getPathHellgate() === 1) {
				// Start of Hellgate Path (after being shot somewhere else)
				addQuestionC(md, 'ask ' + this.getPersonName() + ' if Davy Robbins has been in today', "MsTitus", 1101);
			} else if (perDavy.getPathHellgate() == 4) {
				addQuestionC(md, 'ask ' + this.getPersonName() + ' what Davy Robbins found on the computer', "MsTitus", 1104);
			}
			
			// Ms. Titus questions
			if (this.isCharmedBy() || this.isFreeSlave()) {
				// Ms. Titus is charmed only questions
				if (!checkPlaceFlag("Library", 2)) this.addQuestionC(md, 'ask ' + this.getPersonName() + ' to <b>close</b> the library', 171);
				else this.addQuestionC(md, 'ask ' + this.getPersonName() + ' to <b>open</b> the library', 174);
				addLinkToPlaceC(md, 'tell ' + this.getPersonName() + ' to play with herself', 3, 'type=playwithherself');
				if (findPerson("Monique").getQuest() > 2 && perYou.isBornMale() && !isSpellKnown("Possession")) addQuestionCO(md, 'take the scroll from ' + this.getPersonName() + '', "MsTitus", 172);
				if (this.checkFlag(7) && !this.checkFlag(6)) addQuestionCO(md, 'ask ' + this.getPersonName() + ' what she was working on before', "MsTitus", 173);
				if (isPlaceKnown("RathdownRd") && !isPlaceKnown("MsTitussHouse")) addQuestionC(md, 'ask ' + this.getPersonName() + ' where she lives', "MsTitus", 2000);
			}
			
			if (this.checkFlag(15)) {
				if (!this.checkFlag(16)) {
					this.addQuestionR(md, '"Planning a wild night?"',
						'“Indeed, I\'m meeting with a woman named Kristin, an old  on and off affair of mine.</p>' +
						'<p>She\'s the manager of the local Bank and quite a tigress in bed, I might say.',
						"setPersonFlag(\\'MsTitus\\',16)"
					);
				} else if (!this.checkFlag(17)) {
					this.addQuestionR(md, '"You seemed to have had an idea earlier..."',
						'“Perceptive as always, ' + perYou.getMaster() + '.” Karen grins</p>' +
						'<p>“These meetings are much more fun with a ' + (perYou.isMaleSex() ? 'cock' : 'third set of boobs') + ' to play with, and with a little “magical help” she would surely enjoy having you there, and you would surely enjoy having her.”</p>' +
						'<p>She gives you a wink and leans forward. “Soooo, would you like to visit me at home and add another soon to be slut to your fold?” ',
						"setPersonFlag(\\'MsTitus\\',17)"
					);
				} else if (!this.checkFlag(18)) {
					this.addQuestionR(md, '"How could you say no to this offer?"',
						'Great! The library closes at 8 pm, so I\'ll be waiting for you at home after 9.' + (!isPlaceKnown("MsTitusHouse") ? ' The address is 2628 Rathdown road' : ' You know the address'),
						"setPersonFlag(\\'MsTitus\\',18);setPlaceKnown(\\'MsTitusHouse\\')"
					);
				}
			}
		}
		else if (Place == 228 && sType === "") {
			// Ms Titus's house
			if (this.isHere()) {
				addLinkToPlaceC(md, 'enjoy the librarian', 228, 'type=fuck');
			}
			if (checkPlaceFlag("RathdownRd", 4)) {
				if (perYou.checkFlag(29)) addLinkToPlaceC(md, "meditate on the bowl", Place, this.isHere() ? 'type=interrupted' : 'type=contemplate');
			} else {
				if (this.isHere()) {
					addPopupLink(md, 'check out the house', "Ms. Titus\'s Home",
						this.addPersonString("titus-home" + (this.isFreeSlave() ? "-free" : "") + (this.checkFlag(11) ? "2" : "1") + "-interrupt.jpg", "height:max%", "right") +
						"You start to look around the house but as you do Ms. Titus distracts you as she does not want to be neglected. You give up looking around for now and resolve to try again another time.",
						false
					);					
				} else {
					addPopupLink(md, 'check out the house', "Ms. Titus\'s Home",
						"<img src='Images/Items/bowl.jpg' class='imgpopup' alt='Bowl'>" +
						"Ms. Titus is not much of a housekeeper, everywhere is a little untidy, and there are unwashed dishes in the kitchen. Aside from this there is little remarkable about her home, comfortable and mid-range would be the simple description.<br><br>" +
						'She has books scattered all over the place, all with a bondage/dominance theme, and a few items here and there, a ball-gag and similar items.<br><br>' +
						"Outside is a slightly overgrown yard with a patio and some outdoor furniture. One area looks to have been a Zen meditation type area, with a large ornamental bowl of water to help with meditation. It is well maintained and clear, she appears to use this area at times.",
						false, "setPlaceFlag('RathdownRd', 4);dispPlace();"
					);
				}
			}
			if (this.isHere() && this.checkFlag(14) && !checkPlaceFlag("RathdownRd", 5)) {
				addPopupLinkC(md, 'read the book', "Carnal Alchemy",
					"<p><img src='UI/books/alchemybook.jpg' style='width:30%;float:right;margin-left:5px' alt='Book'>" +
					'You pick up the book and your slave Karen comments, "Interesting book I have been reading, but too much alchemy and not enough carnality!"<br><br>' +
					'You read though the book with Ms. Titus pointing out some bits, carnal and obscene! It is a quick read and surprisingly there are some interesting things that seem to touch on passages you have read in the Book.<br><br>' +
					'You put the book down on the pile of mostly BDSM works and feel you have learned a little of the occult, and more of the carnality of Ms. Titus.',
					false, "setPlaceFlag('RathdownRd',5);perYou.addExperience(1);WaitHere(6)");
			}
			if (this.isHere()) {
				if (checkPersonFlag("MsTitus", 18) && getHour() >= 12 && !checkPersonFlag("MsTitus", 19)) addLinkToPlace(md, 'ask about the meeting with Kristin', 228, 'type=karenkristin1');
				this.addDancingLink(md, 'talk to Karen about dancing in the club',
					'You ask Karen about the Avernus club and about dancing there for you,</p>' +
					'<p>&quot;I know the place well, I go there often, not for the dancing but for the BDSM parties. Sure ' + this.getMaster() + ' I\'d love to my bootie and boobies!&quot; and with that you call Jade to arrange a dance for Karen. Jade is quite familiar with Karen...'
				);					
				this.addSleepLink(md, "sleep with Ms. Titus", "Sleeping with Karen",
					(this.isFreeSlave() ?
						'<p style="position:absolute;left:50%;top:80%;cursor:pointer;font-size:1.1em;width:45%"><b>You order your slave to prepare herself for bed as you will spend the night here. Karen ties herself to the bed ready for you' :
						'<p style="position:absolute;left:10%;top:80%;cursor:pointer;font-size:1.1em;width:40%"><b>You ask Karen about spending the night and she welcomes you into her bed.') + '</b>',
					'titus-sleep' + (this.isFreeSlave() ? '-free' : '') + (this.checkFlag(11) ? "2" : "1") + '.jpg', true, '', '', '', "overflow-y:hidden"
				);
			}
		}
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// Miss Titus in the Library reception
			if (Place == 3 && isShopOpen(2, 1, true)) {
				if (isSpellKnown("Shielded Charm") || checkPlaceFlag("Library", 2)) {
					if (this.isFreeSlave()) CastCharmSpell("MsTitus", 3, 1, 'type=slavecharm', '', '', true);
					else CastCharmSpell("MsTitus", Place, 1, 'type=charmtitus1');
				} else addComments("Don't cast the spell here. It is too public.");
				return "handled";

			} else if (Place == 29 && this.place == 29) {
				// Tess Adam's Room AFTER CHARMING HER
				if (this.isFreeSlave()) {
					addComments("Why waste the mana, she is your slave just as much as if you cast the spell.");
				} else CastCharmSpell("MsTitus", Place, 1, 'type=charmtitus1');
				return "handled";

			} else if (Place == 228 && this.isHere()) {
				// At her home
				CastCharmSpell("MsTitus", 228, 1, 'type=slavecharm', '', '', true);
				return "handled";
			}
		}

		return "";		// do nothing
	};
	
	
	// Phone calls
	per.isPhoneable = function() {
		// Can you call them?
		return checkPlaceFlag("Hotel", 11) && Place == 269 && (this.isCharmedBy() || this.isFreeSlave());
	};

	per.callThem = function() {
		if (Place == 269) {
			if (isShopOpen(2, 1, true)) WriteComments("You call Ms. Titus to invite her to join you at the pool for a swim, but she replies, \"Damn, " + perYou.getMaster() + " I am tied up here, wish it was <b>really</b> tied up!\". She apologies and promises to another time. ");
			else {
				gotoPlace(Place, 'type=tituspool');
				receiveCall('', 'You call Ms. Titus to invite her to join you at the pool for a swim, and she answers enthusiasticaly, "Hell yeah!" and hangs up. You take that to mean she will be there soon.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};

	per.addPersonPhoneCall = function() {
		if (!this.isCharmedBy() && !this.isFreeSlave()) return false;		// All SMS's are post Charm for her
		if ((nTime - this.charmedTime) > 20 && !this.checkFlag(3)) {
			// SMS 1, 20 turns after charming her
			if (makeCall(true, 1)) this.setFlag(3);
		} else if ((nTime - this.charmedTime) > 100 && !this.checkFlag(4)) {
			// SMS 2, 100 turns after charming her
			if (makeCall(true, 2)) this.setFlag(4);
		} else if ((nTime - this.charmedTime) > 200 && !this.checkFlag(5)) {
			// SMS 3, 200 turns after charming her
			if (makeCall(true, 3)) this.setFlag(5);
		} else if ((nTime - this.charmedTime) > 300 && !this.checkFlag(12)) {
			// SMS 4, 200 turns after charming her
			if (makeCall(true, 4)) this.setFlag(12);
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		switch(id) {
			case 1:
				// SMS 1, 20 turns after charming her
				if (this.isFreeSlave()) return receiveSMS('hornyslave', 'Take me like I was at the party', 'titussms1-free.jpg') + replyToSMS("Looking good!");
				return receiveSMS('hornylibrarian', 'Longing for you ' + perYou.getMaster() + ' &#128525;', 'titussms1.jpg') + replyToSMS("Looking good!");
			case 2:
				// SMS 2, 100 turns after charming her
				return receiveSMS(this.isFreeSlave() ? 'hornyslave' : 'hornylibrarian', 'Something special I can offer', 'titussms2' + (this.isFreeSlave() ? '-free' : '') + '.jpg');
			case 3:
				// SMS 3, 200 turns after charming her
				return receiveSMS(this.isFreeSlave() ? 'hornyslave' : 'hornylibrarian', 'Remember me?', 'titussms3.jpg', '88%');
			case 4:
				// SMS 4, 300 turns after charming her
				return receiveSMS(this.isFreeSlave() ? 'hornyslave' : 'hornylibrarian', 'Like my Halloween costume from last year?', 'titussms4.jpg');

		}
		return '';
	};

}
