/****************************************************************
	Angela
****************************************************************/
function RepliesAngela(nR)
{
	var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 100) // Angela CHARMED Path
	{
		per.setFlag(7);
		if (bCharm) {
			setPlaceKnown("JohnAdamsOffice");
			addComments('"' + myName + ' it is down that hall, second left and 3rd door on the right!"');
			if (wherePerson("Tess") == 230) {
				setPlaceKnown("AdamsHouse");
				addComments('"' + myName + ' if you were after the lovely Mrs. Adams, she left last night to return home. I believe she might still be there."</p><p>Angela then gives you the address, on Rathdown Rd. not far from the Broken Inn Hotel');
			}
		} else addComments('"I am sorry, unless you have an appointment I cannot help you, and Mr. Adams has told me he is not accepting appointments for the indefinite future.');
	}
	else if (nR == 101)
	{
		addComments('You ask Angela for John Adam\'s home address, and she quickly looks it up and shows you the address one her computer screen "' + findPerson("JohnAdams").getPersonAddress() + '"');
		setPlaceKnown("AdamsHouse");
	}
	else if (nR == 702) // Angela CHARMED Path
	{
		per.setFlag(9);
		if (perYourBody.FindItem(5) === 0) PlaceI(5, 141);
		if (!isPlaceKnown("SacredClearing")) setPlaceKnown("SacredClearing");  // Knows where to find Sacred Clearing
		addComments('"Let me look up the historical files, ' + myName + '.  Here is something. According to these records a sacred clearing is located near ' + perGates.getPersonNameShort() + '\' estate. The sacred clearing was once a place of devil worship. You could try there, ' + myName + '."');
	}
	else if (nR == 800) // Angela Normal Path
	{
		per.other = 1;
		addComments('"Hello ' + myName + '. Please state your business. We are very busy here and I have no time to waste. Do you have any questions about the town?"');

	}
	else if (nR == 801)
	{
		if (!bCharm) addComments('"My business is none of your business, but if you must know, I am the personal assistant of Mayor Thomas."');
		else addComments('"' + myName + ', I am the personal assistant of Mayor Thomas."');
		per.other = 2;
	}
	else if (nR == 802)
	{
		if (!bCharm) addComments('"There is absolutely nothing strange about this town. If there is any criminal activity then I suggest that you');
		else addComments('"If there is any criminal activity, ' + myName + ', then you may wish to');
		addComments(' contact the police. The police station is nearby." and she gives <i>very</i> brief directions to get there.');
		per.other = 3;
		if (!isPlaceKnown("PoliceStation")) setPlaceKnown("PoliceStation");	//  Know the Police station if you don't already.
	}
	else if (nR == 1600)
	{
		if (!bCharm) addComments('"Mayor Thomas is out at the moment. If you leave me your details and why you need to see her I will organise a meeting for you. I will call you when the meeting is possible."');
		else addComments('"Mayor Thomas is out at the moment, ' + myName + '.  I\'ll set up a meeting as soon as she returns.  I\'ll make up a reason, and call when you can get in to see her." she says, winking.');
		setPersonOther("Mayor", 1); // Start Mayor Series
	}
	else if (nR == 2600)
	{
		setPlaceKnown("CelesteRd");
		setPlaceKnown("AngelasApartment");
		addComments('"Oh, ' + myName + ', it is apartment 9 at the Celeste Apartments, please come and visit any evening!"');

	}
	else if (nR == 4201)
	{
		addComments('"Of course, ' + myName + '. City Hall has plans on all municipal buildings.  There is a ' + sCurrency + '30 duplication fee, of course."');
		setPlaceFlag("Hotel", 2);
	}
	else if (nR == 4202) // Hotel Location
	{
		setPlaceFlag("Hotel", 3);
		if (!bCharm) addComments('"I am sorry but that is the price for planning permits. If there is nothing else, then I suggest you leave this office."');
		else {
			addComments('"Please, forgive my disobedience, my love.  I... I mean... ' + perYou.getMaster() + '," she says, realizing her true role in your \'relationship\'.');
			if (perYourBody.FindItem(23) === 0) {
				// Don't already have plans
				per.charmThem(4);		// Rebuked, now slave level
				perYourBody.PutItem(23);
				setPlaceFlag("Hotel", 4);  // Have the Hotel Plans
			}
		}
	}
	else if (nR == 4203)
	{
		setPlaceFlag("Hotel", 3);
		addComments('"Of course, my love!" she says, and hands the plans over to you with a kiss.');
		if (perYourBody.FindItem(23) === 0) {
			// Don't already have plans
			perYourBody.PutItem(23);
			setPlaceFlag("Hotel", 4);  // Have the Hotel Plans
		}
	}
	else if (nR == 4230) // Paying Angela $30 for the plans
	{
		if (nMoney < 30) addComments('"I\'m afraid there\'s not enough here to cover the ' + sCurrency + '30 fee.  I\'m sorry, ' + myName + '."');
		else {
			addComments('"Thank you, ' + myName + '." She says, filing away your ' + sCurrency + '30. "Here is your copy of the Broken Inn Hotel Plans."');
			if (perYourBody.FindItem(23) === 0) {
				// Don't already have plans
				AddCash(-30); //Remove $30
				perYourBody.PutItem(23);
				setPlaceFlag("Hotel", 4);  // Have the Hotel Plans
			}
		}
	}
	else if (nR == 999)
	{
		if (!bCharm) addComments('"I\'m sorry?" she says, not at all happy with your attitude. "As I told you before, there is a ' + sCurrency + '30 fee for the plans.  Now, if there is nothing else, please leave."');
		else {
			addComments('"Of course' + myName + '. I have the plans right here."');
			perYourBody.PutItem(23);
		}
	}
	return true;
}


// Initialise
function initialiseAngela()
{
	// Angela
	addPerson("Angela", 95, "Angela", "Small");

	per.Replies = RepliesAngela;

	per.getPersonAddress = function() { return isPlaceKnown("AngelasApartment") ? 'Apartment 9, 42 Celeste Rd' : ''; };

	per.getPersonName = function(full) {
		if (full === true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv > 1) {
			// if Charmed at lover or more
			if (clv == 4) return "Angela Enslaved";
			return "Angela Enamoured";
		} else {
			// If NOT Charmed
			return "Angela at Reception";
		}
	};

	per.getPossessionFace = function() { return "!angela-face"; };

	per.whereNow = function() {
		if (!isShopOpen(0)) return 460;
		if (Place == 97 && this.place == 95) return Place;
		return this.place;
	};

	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		switch (this.getCharmedLevel()) {
			case 0:
				// Un-charmed
				return this.addPersonString("angela1b.jpg", "height:max%", "right") +
					"Angela, the secretary to Mayor Thomas. A dark haired beauty, her stiff and serious appearance tells you that she\'s the type of girl who lives for her work. However you feel aroused just by looking at her, Angela\'s soft and slim body makes you fantasize about having her as your own secretary.";
			case 4:
				return this.addPersonString("Small!angela8a.jpg", "height:max%", "right") +
					"Making her your slave was a great idea. Not only that she can support you with any kind of information you need on basically anything via the database she has on the computer but her being the secretary to the Mayor means that she knows every news and rumours around town.<br><br>" +
					"Not even mentioning that she’s an eager little slave who’s pretty good in bed too. Now she’s patiently sitting on the chair, her ass up in the air just as you like it. She knows her place and job and she does them flawlessly.";

			default:
				return this.addPersonString("Small!angela1c.jpg", "height:max%", "right") +				
					"Angela, your ever loving girlfriend (well, one of the many girlfriends) is waiting at her desk when you arrive at the Mayor’s office. She told you last time that she can’t focus on her work anymore, her mind is always filled thoughts of you. You asked her to work for you instead of the Mayor and do your paperwork and bills, but still hold the position she has as the  head secretary of the office, because she can provide you with valuable information here.<br><br>" +
					"She was disappointed at first, but she understood that you can’t be always with her. When she sees you now, she bursts into a big laugh and assumes the position that you like the best; her ass up in the air. So all you have to do is reach out and touch her.";
		}
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 97 && this.isHere() && sType === "") return this.showPersonRandom("!angela11", 4, '', '', '', '', 0, false, "string");
		if (Place == 460 && this.isHere() && sType === "") return this.showPerson("angela-home1.jpg", '', '', '', '', false, "string");
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 97 && this.isHere() && sType === "") md.write('<p>Angela joins you and gets a cup of coffee for herself.</p>');
		else if (Place == 460 && this.isHere()) {
			if (isVisible()) md.write('<p>Angela greets you, and invites you in for a drink, or something else, or someone else.</p>');
			else md.write('<p>Angela is relaxing in her apartment.</p>'	);
		}
	};

	per.showEventPopup = function()
	{
		if (Place != 95) return false;
		
		if (sType == "emilygone1") {
			movePerson("Emily", 1000);	// Away
			findPerson("Emily").other = nTime;
			showPopupWindow("Angela on the Phone",
				this.addPersonString("!phone1.jpg", "height:max%", "right") +
				'You leave Emily\s office and return back to reception and as you do you hear Angela is on the phone. She is aware of your presence and make a show of herself while talking on the phone. She speaks clearly and you can easily overhear here side of the conversation,</p>' +
				'<p>"Yes Emily, very cute...", and she looks at you smiling, "...Oh that is right, your business trip.". Angela type a little on her computer, "Ok I sent the details to your phone...you are out of the office already...I will let the Mayor know, see you when you return."</p>' +
				'<p>You ask her about the call and she explains how Emily had a short trip for the Mayor that had to be advanced, and she will be out of town for a while. Angela promises to tell you when Emily returns.</p>' +
				'<p>You comment on Angela\'s...phone technique...and she smiles, "Let me show you more ' + this.getYourNameFor() + '!"...',
				"dispPlace(Place,'type=emilygone2')", '', true
			);		
			return true;
		}
		if (sType == "emilygone2") {
			showPopupWindow("Angela\'s Phone Technique",
				this.addPersonString("!phone2.jpg", "height:max%", "right") +
				'Angela demonstrates another technique on the phone, promising to show you how she can also use it elsewhere, like on you!'
			);		
			return true;
		}		
		
		if (sType !== "") return false;

		if (!this.checkFlag(1)) {
			// Introduction for Angela
			this.setFlag(1);
			showPopupWindow("Town Hall Receptionist",
				this.addPersonString("angela1b.jpg", "height:max%", "right") +
				'When you enter the building you see before you a dark haired beauty. By the way she\'s dressed you immediately recognise her as the secretary around here. The white blouse, the skirt, silk stockings and the high heels give that away. ' +
				'You see a nametag on her desk; <b>Angela</b>.<br><br>Her stiff and serious appearance tells you that she\'s the type of girl who lives for her work. However you feel aroused just by looking at her, Angela\'s soft and slim body makes you fantasize about having her as your own secretary. ' +
				'A servant who would be always well informed about you and your needs and ready to do any kind of chores you\'d give to her and would know you personally.<br><br>' +
				'While you daydream about her, she doesn\'t seem to notice you, she\'s clearly into her work and just types something casually on the computer.'
			);
			return true;

		} else if (this.checkFlag(2) && !this.checkFlag(3) && this.isCharmedBy()) {
			// Post charm conversation, happens when you re-visit the town hall after charming Angela
			showPopupWindow(this.getPersonName(),
				this.addPersonString("Small!angela1c.jpg", "height:max%", "right") +
				'"So, tell me, how do you like working for the Mayor?", you ask your slave while you hop down in one of the chairs in the office.<br><br>' +
				'"It is a frustrating job, ' + perYou.getMaster() + '. Mayor Thomas is a pain in the neck. She\'s constantly barking to anyone who doesn\'t do one hundred percent on their work. She says her biggest achievement will be when her office will be filled with workaholics like her not with lazy assholes as she likes to call us. So we all are afraid of her and try our best.", Angela answers obediently. Then suddenly she walks in front of the chair where you sit and gently grabs your hand and motions it between her tits.<br><br>' +
				'"I would be the happiest girl in the world if I could be <b>your</b> personal secretary and servant than that harlot’s underpaid worker. If I could be with you all day, follow you around everywhere you go, make you happy….", she says in husky voice while she slowly starts to unbutton her blouse.<br><br>' +
				"You grope her tits for a little, both of you silently enjoying each other for a few seconds, but you know her wish can’t happen so you stand up and hush her away from you.<br><br>" +
				'"Nahh, I need you here. Be my eyes and ears, tell me everything you hear, any interesting info or detail about events or people. Update me regularly, do you understand?"<br><br>' +
				'"Of course, ' + perYou.getMaster() + '. Whatever you say I will do it perfectly for you!", she quickly fixes her dress and sits back to her desk. She gives you an ear to ear smile and waits for your further commands.',
				"setPersonFlag('Angela',3)"
			);
			return true;

		} else if (this.checkFlag(5) && !this.checkFlag(4)) {
			// This scene happens only after you charmed Angela, Ms Thomas and Chief Batton (after you charmed Batton it triggers on your first visit to the Town Hall)
			showPopupWindow('Angela with Mayor Thomas',
				findPerson("Mayor").addPersonString("mayor6b.jpg", "height:max%", "right") +
				"Angela comes to you and after you greet each other with a kiss she starts.<br><br>" +
				'"' + perYou.getPersonName() + '!  Ms Thomas wanted to talk to you about something. It seemed important!", she tell you and gives you short kiss on your cheek and goes back to her work. You hurry up to the mayor’s office, you notice she has removed her clothing in anticipation. After Ms Thomas gives you an obedient bow and asks you to sit down.<br><br>' +
				'"' + (perYou.isMaleSex() ? 'Sir' : 'Ma\'am') + '! I have received this email a few hours ago and I just wanted to tell you that I feel this relationship will be a long and productive one! I’m sure of it!", she seems excited than the usual and after she sees your confused face she turns her computer screen to you. It’s an email from ' + getPoliceChief() + ' Batton.<br><br>' +
				'<div style="color:black;background-color:white;text-shadow:-1px 0px white, 0px 1px black, 1px 0px white, 0px -1px white"><b>Subject: ' + perYou.getMaster() + '</b><br>Dear Ms Thomas,<br>' +
				'or sister slave, it\'s more appropriate. It has come to my knowledge that you are also a member of ' + perYou.getPersonName() + '\'s harem. ' + perYou.getPersonName() + ' just opened my eyes to a new reality ; the world of obedience and giving pleasures. I feel like I am burning with pride knowing that I am ' + (perYou.isMaleSex() ? 'his' : 'hers') + ' forever and I constantly have an urge to do something to our ' + perYou.getMaster() + '. Do you feel the same way too? What do you recommend? What should I do to gain ' + perYou.getPersonName() + '\'s favor?<br><br>' +
				'Also, I suppose we will work together in the future a lot and I am so relieved that we don’t have to hide behind lies! Our first common mission is to find out more about Kurndorf as the ' + perYou.getMaster() + ' has interest in him and the tales surrounding him. You look after the files and documents and I shall be the one who ensures ' + perYou.getPersonName() + '\'s safety and protection.<br><br>' +
				'Have a great day, dear sister and may we serve ' + perYou.getPersonName() + ' forever!<br>' +
				'<hr><b>' + getPoliceChief() + ' Kerry Batton</b></div><br>' +
				'You smile a sly smile and ask her the important question.<br><br>' +
				'"That\'s great, now I can have you two collaborate on anything without any problem! How has your investigation gone?", you ask.<br><br>' +
				'"I’ve just recently started it ' + perYou.getMaster() + '! I am going to search through the old mails and papers of the Town Hall! I will call you if I learn anything!", she answers, duty and passion coming from her voice.',
				"setPersonFlag('Angela',4)"
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;

		if (Place == 269 && sType == "angelapool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("angela-pool.jpg");
			addPlaceTitle(md, "Swimming with Angela");
			md.write(
				'<p>Angela arrives, dressed in a pink and white bikini, and she seductively poses for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=angelapoolsex');
			addLinkToPlaceC(md, 'say goodbye to Angela', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "angelapoolsex") {
			md = WritePlaceHeader();
			this.showPerson("angela-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Angela");
			md.write(
				'<p>You ask the cute secretary to play with you more privately, and she seductively removes most of her swimsuit and lies back waiting for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Angela', Place);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 97 && sType == "coffee") {
			md = WritePlaceHeader();
			this.showPerson(this.checkFlag(11) ? "!angela11b.jpg" : "!angela11a.jpg");
			addPlaceTitle(md, "Coffee Break");
			passTime(false, true);
			passTime(false, true);
			setPlaceKnown("BreakRoom");		// Have been here
			md.write(
				'<p>Angela leads to to the nearby break room and gestures to the coffee machine. You poke the coffee machine with your finger. It’s filled with still hot, freshly mixed coffee. It’s a newer model, an automatic, the easiest one to use. She grabs a mug from the shelf and pours some of the container’s content into the mug. Angela hands it to your hands, kneeling like a good slave in front of you. After you grab the offering, without a word, she takes off her dress only leaving on her underwear and stockings. You slurp the hot brew down your throat in just a few minutes while she stands before, mutely, but happily waiting for you to say something.<p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'follow Angela back to reception', 95);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 460) {
			if (sType == "angelafuck") {
				// Sex scenes at her home
				md = WritePlaceHeader();
				this.showPerson("angela-home-sexa.jpg");
				addPlaceTitle(md, "Angela");
				md.write(
					'<p>You enjoy yourself with Angela\'s body</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk more with Angela', Place);
				addLinkToPlace(md, 'exit the apartment', 456);
				WritePlaceFooter(md);
				return true;
			}

		}

		if (this.isHere() && sType == "transformbreasts") {
			// BE Transformation
			CastTransform(1);
			md = WritePlaceHeaderNIP(true, '', 'black');
			if (!this.checkFlag(11)) {
				this.setFlag(11);
				this.dress = "Large";
				showPopupWindow("Transformation",
					addImageString('GenericSex/be c.jpg', "50%") +
					'<p>You cast the spell and Angela groans, "Ah ' + perYou.getLord() + ' what is this?" and pulls apart her top. You see her breasts swelling, growing larger and larger, her modest sized breasts growing to quite large.</p>' +
					'<p>As she groans you thought you heard some laughing, ' + (Place == 95 ? 'the Mayor' : 'a neighbour') + '? Angela sighs as her breasts stop growing, and she says, panting a little,<p>' +
					'<p>"' + this.getYourNameFor() + ', these will have to take some getting used to...maybe you would like to help me?"</p>'
				);
			} else {
				this.setFlag(11, false);
				this.dress = "Small";
            showPopupWindow("Transformation",
					addImageString('GenericSex/be d.jpg', "50%") +
					'<p>You cast the spell and Angela groans, "Ah ' + perYou.getLord() + ' what is this?" and pulls apart her top. You see her breasts diminishing, becoming smaller and smaller, her huge sized breasts growing to a modest size.</p>' +
					"<p>As she groans you thought you heard some laughing, " + (Place ==	95 ? "the Mayor" : "a neighbour") +
					"? Angela sighs as her breasts stop diminishing, and she says, panting a little,<p>" + '<p>"' + this.getYourNameFor() + ', these will be quite easy to get used to...maybe you would like to help me?"</p>'
				);
			}
			setQueryParams("");
			WritePlaceFooter(md);
			return true;
		}

		if (Place != 95) return false;

		if (sType == "angelamore") {
			// Repeat sex scene
			var rnd = Math.random() < 0.5;
			md = WritePlaceHeader(false, (perYou.isMaleSex() && rnd) || (this.checkFlag(11) && !perYou.isMaleSex() && !isExplicit()) ? "" : "td-left-large");

			if (perYou.isMaleSex()) {
				if (rnd) this.showPersonRorX("angela7ba.jpg");
				else this.showPersonRorX(!perYou.isMaleSex() ? "angela7g.jpg" : "angela7bb.jpg");
			} else if (isExplicit()) this.showPersonX("angela7g.jpg");
			else this.showPerson("angela10.jpg");

			addPlaceTitle(md, "Angela\'s Service");

			md.write(
				'<p>With a surprisingly quick reaction time from Angela, she positions herself on the chair and shoves her legs into the air. She is quite the looker already, but she reveals her pussy to you. It’s one fine, tight vagina! There’s a pen in her hand which somehow lands into her beaver. She twists and twirls the pen around which eventually makes her gasp for air. Not much time has to pass when you decide to join in her fun. You touch her skin, notably, her face and tits while she is pleasuring herself.  Angela’s already occupied with upcoming orgasms and she doesn’t mind you touching her. You play with her tits through her blouse and carefully let her suck one of your thumb. Her tongue wets your palm as she licks it like a thirsty dog, Angela’s eagerness is unquestionable.</p>'
			);

			startQuestions();
			if (wherePerson("Mayor") == 110) addLinkToPlace(md, 'visit the Mayor', 110);
			addLinkToPlace(md, 'talk to Angela', 95);
			addLinkToPlace(md, 'exit the Town Hall', 94);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmangela1") {
			md = WritePlaceHeader();
			this.setFlag(7, false);

			this.showPerson("angela2.jpg");
			addPlaceTitle(md, "Angela Under a Spell");

			md.write(
				'<p>You cast the charm spell on Angela. She hears you mumble the incantation but ignores the words.</p>' +
				'<p>&quot;I really have no time for nonsense,&quot; she says sternly before the first signs of the spell\'s effects begin to show. ' +
				'&quot;I... I have a lot to do.&quot;</p>'
			);
			startQuestions();
			addLinkToPlace(md, "wait for the spell to take effect", Place, 'type=charmangela2');
			addLinkToPlace(md, "exit the town hall", 94, "", 'You leave the town hall and Angela to deal with the spell.<br/>She will be affected by the spell but you have chosen to not try to reinforce or guide her so the effect will be minimal.');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmangela2") {
			md = WritePlaceHeader();

			this.charmThem(2);		// Lover level of charm

			this.showPerson("angela3.jpg");

			addPlaceTitle(md, "Angela Under a Spell");

			md.write(
				'<p>&quot;Oh god!&quot; exclaims Angela. &quot;What a rush. My body is on fire. ' +
				'You really must forgive me but I feel so excited at the moment. I\'m not normally attracted to other people so quickly.&quot;</p>' +
				'<p>You smile back at the young lady. &quot;That\'s alright, Angela. I sometimes have ' +
				'this effect on people and I think that we can be very good friends.&quot;</p>'
			);

			startQuestions();
			addLinkToPlace(md, "tell Angela to enjoy herself", Place, 'type=charmangela3');

			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmangela3") {
			md = WritePlaceHeader();

			this.showPerson("angela4.jpg");
			addPlaceTitle(md, "Angela Under a Spell");

			md.write(
				'<p>Angela\'s clothes start to fall away from her body as the desire increases. Her ' +
				'attraction to you is obviously growing by the minute.</p>' +
				'<p>&quot;You are so kind to think of me enjoying myself but it would not be right if you didn\'t enjoy yourself too. I would love to bring you ' +
				'happiness, my dear. Nobody is here so why don\'t we... You know...&quot; says Angela, her voice taking on a husky tone.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "accept Angela\'s offer", Place, 'type=charmangela4');

			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmangela4") {
			md = WritePlaceHeader();

			this.showPerson("angela5.jpg");

			addPlaceTitle(md, "Angela Under a Spell");

			md.write(
				'<p>&quot;Thank you my love.&quot; Angela replies. &quot;You are such a ' +
				'considerate lover. After all, we have only just met but you ' +
				'want me anyway. You must think that I\'m a slut doing this ' +
				'but I promise I have never felt this way before. In fact ' +
				'my boyfriend says that I am a cold fish. If only he could see me now.&quot;</p>' +
				'<p>The secretary is a fine catch for your net. Your own arousal grows as you watch her undress and you want to take her.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, "tell Angela that she is very hot", Place, 'type=charmangela5');

			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmangela5") {
			md = WritePlaceHeader();

			this.showPerson("angela6.jpg");

			addPlaceTitle(md, "Angela Under a Spell");

			md.write(
			 '<p>Your words send a shiver down the secretary\'s spine. She shudders with what could be her first orgasm, then starts to moan to herself.</p>' +
			 '<p>You ask, &quot;Are you alright Angela? You sound kind of funny.&quot;</p>' +
			 '<p>&quot;Hmm funny,&quot; she replies to herself. &quot;I feel fucking fantastic you adorable ' + perYou.getSex() + '. Why don\'t we get on with it? I want it right now.&quot;</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, "order Angela to remove the last of her clothes", Place, 'type=charmangela6');

			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmangela6") {
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPersonRorX("angela7ba.jpg", "height:max");
			else this.showPerson("angela7g.jpg", "height:max");

			addPlaceTitle(md, "Angela Under a Spell");

			md.write(
				'<p>Angela opens herself to you. She warmly welcomes you into her arms and breasts. ' +
				'Her passion is tireless and demanding even after you are spent. Awkwardly you climb off her as she begs for more.</p>'
			);

			startQuestions();

			addLinkToPlaceC(md, "talk to Angela more", 95);
			addLinkToPlace(md, "exit the town hall", 94);

			WritePlaceFooter(md);
			return true;
		}

		return false;
	};

	per.showPersonChat = function(bGeneral, md)
	{
		var clv;
		if (Place == 460 && this.isHere() && sType === "") {
			// Angela's apartment
			clv = this.getCharmedLevel();
			addLinkToPlaceC(md, 'ask for "someone"', Place, 'type=angelafuck');
			this.addSleepLink(md, "bed Angela", "Sleeping with Angela",
				'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Angela to bed for the night.</b>',
				'angela-bed1.jpg', true, '', '', '', "overflow-y:hidden"
			);
			return;
		}
		if (Place != 95 || !this.isHere() || sType !== "") return;
		
		// Town Hall (open and she is there)
		clv = this.getCharmedLevel();
		
		switch (this.other)
		{
			case 0:
				addQuestionC(md, 'tell Angela your name, and that you\'re interested in the Town Hall', "Angela", 800);
				break;
			case 1:
				addQuestionC(md, 'ask Angela what she does around here', "Angela", 801);
				break;
			case 2:
				if (perYou.isQuestStarted(1)) addQuestionC(md, 'ask Angela whom you should tell about the strange things you\'ve seen', "Angela", 802);
				break;
		}

		if (checkPlaceFlag("Hotel", 8) && !checkPlaceFlag("Hotel", 4)) {
			if (!checkPlaceFlag("Hotel", 2))	addQuestionC(md, 'ask Angela whether she has any records on the Broken Inn Hotel', "Angela", 4201);
			else {
				if (!checkPlaceFlag("Hotel", 3)) {
					if (clv === 0) addQuestionC(md, 'ask Angela why the plans cost so much', "Angela", 4202);
				}
				if (clv > 0) {
					addQuestionC(md, 'tell your <i>Slave</i> that you will not <i>pay</i> for the plans', "Angela", 4202);
					addQuestionC(md, 'ask your <i>lover</i> to give you the plans as a gift', "Angela", 4203);
				}
				addQuestionCO(md, 'pay Angela ' + sCurrency + '30 for the plans', "Angela", 4230);
			}
		}

		if (getPersonOther("Mayor") === 0) addQuestionC(md, 'tell Angela you would like to see the mayor', "Angela", 1600);

		if (whereItem(23) == 999)  // HOTEL MAP LOST WHEN SHOT
		{
			addQuestionC(md, 'pay Angela ' + sCurrency + '30 for the hotel plans again', "Angela", 4230);
			if (clv === 0) addQuestionC(md, 'demand another copy of the Hotel plans', "Angela", 999);
			else {
				if (clv != 4) addQuestionC(md, 'ask your <i>lover</i> to give you another copy of the plans', "Angela", 999);
				else addQuestionC(md, 'demand another copy of the Hotel plans', "Angela", 999);
			}
		}

		if (this.checkFlag(8) && !this.checkFlag(9)) addQuestionC(md, 'ask Angela to look for magic places', "Angela", 702);
		if (clv > 0)  // Angela is CHARMED
		{
			if (!isPlaceKnown("AngelasApartment")) addQuestionC(md, 'ask Angela where she lives', "Angela", 2600);
			if (clv == 4) addLinkToPlaceC(md, 'tell Angela to lay back and give you some more', Place, 'type=angelamore');
			else addLinkToPlaceC(md, 'ask Angela for some more', Place, 'type=angelamore');
			if (!isPlaceKnown("BreakRoom")) addLinkToPlaceC(md, 'ask Angela for a cup of coffee', 97, 'type=coffee');
		}

	};

	// Items
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			if (Place == 95 && this.isHere()) {
				// Angela @ Town Hall Reception
				CastCharmSpell("Angela", 95, 1, 'type=charmangela1');
				return "handled";
			}
		}
		
		// Examining the Soul Bound Crystal [Ring]
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere()) {
					examineItem(no, 'The ' + s + ' vibrates softly the closer you get to Angela.');
					return "handled";
				}
			}
			return "";
		}

		// Casting the transform spell
		else if (no == 18 && cmd == 2) {
			// In her room or at the bar
			if (this.isHere()) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her");
					return "handled";
				}
				if (!CastTransform(1, true)) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(Place, 'type=transformbreasts');
				return "nofooter";
			}
		}

		return "";		// do nothing
	};

	// Phone calls
	per.addPersonPhoneCall = function() {
		var perMT, nt, nm, nk;
		if (isShopOpen(0) && getPersonOther("Mayor") === 3 && wherePerson("Mayor") === 0) {
			if (makeCall(true, 112)) movePerson("Mayor", 110); // Put the Mayor in her office
		} else if (isShopOpen(0) && this.isCharmedBy()) {
			perMT = findPerson("Mayor");
			nt = this.hoursCharmed();
			nm = perMT.hoursCharmed();
			if (!this.checkFlag(6) && perMT.isCharmedBy("You") && isCharmedBy("Kristin") && perMT.place === 110 && Place != 95 && Place != 110) {
				nk = getHoursCharmed("Kristin");
				if (nt > 24 && nm > 24 && nk > 24) {
					// SMS 110 after Mayor Thomas + Angela + Kristin are charmed for 1+ days
					// TODO: review time delay...
					if (makeCall(true, 110)) this.setFlag(6);
				}

			}
			if (!this.checkFlag(5) && perMT.isCharmedBy("You") && nt > 0 && this.checkFlag(3) && nm > 24 && isCharmedBy("OfficerBatton") && Place != 95 && Place != 110) {
				if (makeCall(true, 111)) this.setFlag(5);
			}
			// Trio meeting
			if (!this.checkFlag(10)) {
				perMT = findPerson("Mayor");
				if (perMT.checkFlag(4)) {
					var perEllie = findPerson("Ellie");
					if (!perEllie.checkFlag(3)) {
						var perBatton = findPerson("OfficerBatton");
						nt = this.hoursCharmed();
						nm = perMT.hoursCharmed();
						if (perEllie.isCharmedBy("You") && perBatton.isCharmedBy("You") && perMT.isCharmedBy("You") && isCharmedBy("Kristin") && perMT.place === 110 && Place != 95 && Place != 110) {
							nk = getHoursCharmed("Kristin");
							var tm = 72 + Math.floor(Math.random() * 5);
							if (nt > tm && nm > tm && nk > tm) {
								// SMS 110 after Mayor Thomas + Angela + Kristin are charmed for 3+ days
								// TODO: review time delay...
								if (makeCall(true, 113)) {
									this.setFlag(10);
									findPerson("Emily").other = nTime;
								}
							}

						}
					}
				}
			}
			// Emily available
			if (this.checkFlag(10) && !this.checkFlag(12)) {
				// SMS after the Trio meeting
				if (Math.floor((nTime - findPerson("Emily").other) / 12) > 24) {
					perMT = findPerson("Mayor");
					if (isShopOpen(0) && perMT.place === 110 && Place != 95 && Place != 110) {
						// One day later
						if (makeCall(true, 114)) this.setFlag(12);
					}
				}
			}

		}
		return false;
	};

	per.isPhoneable = function() {
		// Can you call them?
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.isCharmedBy();
	};

	per.callThem = function() {
		if (Place == 269) {
			if (isShopOpen(0)) WriteComments("You call Angela to invite her to join you at the pool for a swim, but she replies, \"Sorry, " + this.getYourNameFor() + ", things are real busy here in the Town Hall!\". She apologies and promises to another time. ");
			else {
				gotoPlace(Place, 'type=angelapool');
				receiveCall('', 'You call Angela to invite her to join you at the pool for a swim, and she happily agrees.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};
	per.getPersonSMS = function(id) {
		switch(id) {
			case 110:
				return receiveSMS('Angela', perYou.getMaster() + '! I have to inform you that Miss Thomas would like to have a talk with you. She says it’s important. We are waiting for your arrival anytime, please come when your time permits.');
			case 111:
				if (this.getCharmedLevel() == 4) return receiveSMS('Angela', perYou.getMaster() + '! I have to inform you that your slave, Mayor Thomas would like to speak with you privately about something important. Please visit us if you have the time and not too tired of your quest yet!');
				return receiveSMS('Angela', 'My love! Your little mayor slut just told me that she has some interesting information that she wants to share with you! I had to make her sit down because she was hyperventilating. Come check us out soooon pleaaaasee because she wants to tell you first and I’m super curious !!!');
			case 112:
				//Angela’s message to you when Mayor Thomas is available ( not charmed version ) via SMS:
				if (this.getCharmedLevel() === 0) return receiveSMS("Town Hall", "Hi! This is Angela, the Mayor’s secretary. I have tried calling you on your home phone, but I could not contact you so I am sending this message too! Mayor Thomas wants to see you and is ready to greet you personally!");
				//Angela’s message to you when Mayor Thomas is available ( charmed version, as your lover) via SMS:
				if (this.getCharmedLevel() == 2) return receiveSMS("Angela", "My love! Mayor Thomas is back and wants to meet you personally! That witch will finally gets what she deserves and learn her place, won’t she my love?! :)");
				//Angela’s message to you when Mayor Thomas is available ( charmed version, as your slave) via SMS:
				return receiveSMS("Angela", perYou.getMaster() + "! I hope I’m not disturbing you, but I did as you have commanded and learned that Mayor Thomas is ready to greet you! I am soo happy, soon she will be yours…like me…:)");
			case 113:
				return receiveSMS('Angela', 'Angela here, ' + this.getYourNameFor() + '! Mayor Thomas, ' + getPoliceChief() + ' Batton and Kristin are waiting for you in the Thomas’s office for a group meeting. They won’t start without their ' + perYou.getMaster() + ' so come by whenever you feel like it! With my deepest regards, Angela!.');
			case 114:
				return receiveSMS('Angela', this.getYourNameFor() + '! Mayor Thomas has some news for you and would like to see you in her office when you are free...so would I', 'sms1.jpg');

		}
		return '';
	};
}