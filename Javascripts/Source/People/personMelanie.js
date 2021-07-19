/***********************************************************************
Melanie
***********************************************************************/

function initialiseMelanie()
{
	// Melanie
	addPerson("Melanie", 432, "Melanie", '', false);
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv == 4) return "Slave Milf Melanie";
		if (clv == 3) return "Milf Melanie";
		return this.name;
	};
	
	per.getPersonAddress = function() { return isPlaceKnown("MelaniesHouse") ? '9 Cherise Rd, Glenvale' : ''; };
	
	per.getSuffix = function() {
		var clv = this.getCharmedLevel();
		if (clv == 3) return "gf";
		return "slave";
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 432 && !this.checkFlag(1)) {
			this.setFlag(1);
			showPopupWindow("Neighborhood Milf",
				this.addPersonString("mel0.jpg", "height:max%", "right") +
				"You knock on the door and a busty blonde milf opens it. You saw on the mailbox that her last name is Thomas.</p>" +
				'<p>"Hello Miss Thomas" you say. She smiles and replies,</p>' +
				'<p>"Oh please call me Melanie. What can I do for you today."</p>' +
				"<p>You think to yourself, why can't they all be this easy?</p>"
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (Place == 269) {
			if (sType == "melaniepool") {
				WaitHereOnly(4);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Melanie");
				md.write(
					'<p>Melanie joins you wearing a lovely bikini and she poses for you before going for a swim.</p>' +
					'<p>After you wonder if you should take it a bit further...</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'of course you should', Place, 'type=melaniepoolsex');
				addLinkToPlaceC(md, 'say goodbye to Melanie', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "melaniepoolsex") {
				md = WritePlaceHeader();
				this.showPerson("pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Melanie");
				md.write('<p>Of course you do and ask Melanie to remove the rest of her bikini and play together at the edge of the pool!</p>');
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Melanie', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (sType == "charmmel1slave") {
			// Charm Melanie 1 (Slave)
			md = WritePlaceHeader();
			this.showPerson("mel2.jpg");
			addPlaceTitle(md, "Melanie Under a Spell");

			md.write(
				'<p>Melanie asks, "I\'m sorry I didn\'t understand what you said?"</p>' +
				'<p>You tell her, "That\'s ok Melanie, you didn\'t need to understand it. Now <b>take off those clothes</b> and show me what youre workin with under there"</p>' +
				'<p>She exclaims, "EXCUSE ME Young ' + perYou.getManWoman() + '. That is no way to speak to a lady.  Leave my house this instant!" Despite her words she starts to unconsciously lift her skirt.</p>' +
				'<p>You tell her "Hold on there don\'t get your panties in a bunch...actually you should do that.  You will take them off and throw them away..."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Present yourself to me naked."', Place, 'type=charmmel2slave');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmmel2slave") {
			// Charm Melanie 2 (Slave)
			md = WritePlaceHeader();
			this.showPerson("mel3s.jpg");
			addPlaceTitle(md, "Melanie Being Enslaved By A Spell");

			md.write(
				'<p>"No I wont" she says even as she rips off all of her clothes.</p>' +
				'<p>"Good girl, Melanie" you say."</p>' +
				'<p>She cries out, "Stop. Fuck off and leave me alone. Why am I naked."</p>' +
				'<p>You tell her "Shut up now. Your voice is annoyiing. You will do whatever I say because I am your owner now. Maybe you need more proof"</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'bind her arms and legs', Place, 'type=charmmel3slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmel3slave") {
			// Charm Melanie 3 (Slave)
			md = WritePlaceHeader();
			this.showPerson("mel4s.jpg");
			addPlaceTitle(md, "Melanie Enslaved By a Spell");

			md.write(
				'<p>"This can\'t be possible" she says as she looks around the room confused.</p>' +
				'<p>You tell her, "What\'s wrong bitch. how can you still be confused. It\'s pretty obvious at this point. I guess I need to make it more clear that you are my bitch."</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'make her look like a bitch', Place, 'type=charmmel4slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmel4slave") {
			// Charm Melanie 4 (Slave)
			md = WritePlaceHeader();
			this.showPerson("mel5s.jpg");
			addPlaceTitle(md, "Melanie Under a Spell");

			md.write(
				'<p>You bind your bitch and put her on a leash and tell her,</p>' +
				'<p>"There ya go bitch.  Now do you understand your position?"</p>' +
				'<p>"MMmmm Hmm" she whimpers  "pllllssss lllltt mmmmm ggggoo".</p>' +
				'<p>You tell her, "Oh but if I let you go then you will be a bitch without a ' + perYou.getMaster() + ' and we can\'t have that. I know what will cheer you up."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Lets play a game"', Place, 'type=charmmel5slave');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmmel5slave") {
			// Charm Melanie 5 (Slave)
			md = WritePlaceHeader();

			this.showPerson("mel6s.jpg");
	
			var myName = perYou.getMaster();
			addPlaceTitle(md, "Melanie Under a Spell");

			md.write(
				'<p>"Fetch" you yell as you throw the ball across the room.  She has no choice but to obey since you issued a command. You have not made her enjoy any of this but you dont really care.  "You are really slow at fetch. I\'ll have to get you in better shape. You will be kept on a strict exercise regiment from now on."</p>'
			);

			startQuestions();
			addLinkToPlace(md, "make her exercise", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmmel1gf") {
			// Charm Melanie 1 (Girlfriend)
			md = WritePlaceHeader();
			this.charmThem(3);
			this.showPerson("mel2.jpg");
			addPlaceTitle(md, "Melanie Under a Spell");

			md.write(
				'<p>You tell her "I am Aunt Brandi\'s '  + (perYou.getManWoman() == "man" ? 'nephew' : 'niece') + ' and she told me to tell you Dia Chu!" as you cast the charm spell.</p>' +
				'<p>Melanie asks, "I\'m sorry I didn\'t understand what you said?"</p>' +
				'<p>You tell her, "That\'s ok Melanie, I must have misunderstood her or said it wrong. She did not say how pretty you are and I was distracted"</p>' +
				'<p>She smiles broadly, she does have a lovely smile! "You really shouldn\'t flirt with older women, I am old enough to be your mother" she replies.</p>' +
				'<p>You answer with the line about she barely old enough to be your sister, a line you both recognise, but the spell is making her more receptive.</p>' +
				'<p>You comment on her figure...how she works-out at the gym with Aunt Brandi and she brushes her skirt and it flies up giving you a glimpse of her panties. You think this was unconscious, but the spell would of helped...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'she looks back at you', Place, 'type=charmmel2gf');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmmel2gf") {
			// Charm Melanie 2 (Girlfriend)
			md = WritePlaceHeader();
			this.showPerson("mel3gf.jpg");
			addPlaceTitle(md, "Melanie Being Seduced By A Spell");

			md.write(
				'<p>She says in an exaggerated way "Oops, silly me" and continues smiling. It seems flipping her dress was not so unconscious. </p>' +
				'<p>You say there was nothing wrong and you like the colour red. Melanie looks back at you and you can see she is getting more and more affected by the spell. She tells you after a short hesitation,</p>' +
				'<p>"Don\'t tell your Auntie" and raises up her skirt fully exposing her panties. You promise not to tell Aunt Brandi, why would you?</p>' +
				'<p>You tell her how beautiful she is, but again she refers to herself being too old for you, but with less force than before.</p>' +
				'<p>You answer...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Not at all, I love women of all ages"', Place, 'type=charmmel3gf');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmel3gf") {
			// Charm Melanie 3 (Girlfriend)
			md = WritePlaceHeader();
			this.showPerson("mel4gf.jpg");
			addPlaceTitle(md, "Melanie Seduced By a Spell");

			md.write(
				'<p>She looks at you and seems to have reached a decision "Promise you will not tell Brandi"</p>' +
				'<p>You promise and she starts to remove the rest of her clothing. Curiously you ask why she is so insistent to not tell Aunt Brandi, not that you had ever planned to. She has stripped to just her panties and tells you,</p>' +
				'<p>"She is so very protective of Kylie, and while I did not know she had other family here in Glenvale, I would think she will be equally protective of them as well"</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'with that answered, embrace her', Place, 'type=charmmel4gf');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmel4gf") {
			// Charm Melanie 4 (Girlfriend)
			md = WritePlaceHeader();
			this.showPersonRorXBG("mel5gf.jpg");
			addPlaceTitle(md, "Melanie Under a Spell");

			md.write(
				'<p>Nothing more is needed to be said, and you embrace your enchanted lover and you take pleasure from her body as she takes it from yours.</p>' +
				'<p>Afterwards she invites you to return anytime, but once again makes you promise not not tell your Aunt. You guess she has never met your mother as she makes no mention of any other members of your family.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "melaniebj") {
			// Oral sex
			md = WritePlaceHeader();
			this.showPersonRandomRorXBG("home-bj", isExplicit() ? (perYou.isMaleSex() ? 4 : 2) : 1);
			addPlaceTitle(md, "Melanie");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Melanie gives you a blowjob.</p>'
				);
			} else {
				md.write(
					'<p>Melanie licks you</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, "talk more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "melaniefuck") {
			// Fuck
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("home-fuckb", isExplicit() ? 4 : 1);
			else this.showPersonRandom("home-fuckg", 1);
			addPlaceTitle(md, "Melanie");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>You fuck Melanie.</p>'
				);
			} else {
				md.write(
					'<p>Melanie and you fuck each other.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, "talk more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "melanietitfuck") {
			// Tit-Fuck
			md = WritePlaceHeader();
			this.showPersonRandomRorX("home-tf", isExplicit() ? 3 : 1);
			addPlaceTitle(md, "Melanie");

			md.write(
				'<p>You fuck Melanie\'s tits</p>'
			);
	
			startQuestions();
			addLinkToPlace(md, "talk more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "melaniestraponfuck") {
			// Strap-on Fuck
			md = WritePlaceHeader();
			this.showPersonRandomX("home-strapon", 1);
			addPlaceTitle(md, "Melanie");

			md.write(
				'<p>You fuck Melanie with your strap-on</p>'
			);
	
			startQuestions();
			addLinkToPlace(md, "talk more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "melaniebath") {
			// Bath time
			md = WritePlaceHeader();
			this.showPerson("melbath-gf.jpg");
			addPlaceTitle(md, "Bath-time");

			md.write(
				'<p>You ask Melanie to have a bath with her. She goes and runs the bath and calls you to join her when it is ready. You see she is rather aroused and touching herself as you approach the tub.</p>'
			);
	
			startQuestions();
			addLinkToPlace(md, "talk more to Melanie", 432);
			addLinkToPlace(md, "leave her house", 37);
			WritePlaceFooter(md);
			return true;
		}			
		
		if (sType == "endgame1melanie") {
			// End Game - Melanie
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Milfs?");

			md.write(
				'<p>One day you visit your older lover Melanie and you see while older, she is not too old to learn from Miss. Logan!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);		
			WritePlaceFooter(md);
			return true;				
		}
		
		return false;
	};

	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("poledance", 2);
		addPlaceTitle(md, "Melanie's Dance");
		md.write(
			'<p>Melanie takes the stage dressed in some exotic dance gear, she seems to be quite familiar with the needed outfits.!</p>' +
			'<p>Melanie is a very experienced dancer, older than most of the danders here but very skilled!</p>' +
			'<p>After she collects her tips and joins you for a while buying some drinks with them.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.getCharmedLevel() == 3 ? "endgame1melanie" : "";
	}
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Melanie's House
			if (Place == 432 && this.isHere()) {
				var txt = '<div style="color:black;margin-top:1em;margin-bottom:1em;margin-left:4em;margin-right:2em;cursor:default;">' +
					'<table><tr><td width="80%;margin-right:2em"><p>You cast the spell and you see Melanie start to be affected by it. As she does you tell her...</p>' +
					addOptionLink("string", '"Take off your clothes."', "dispPlace(432,'type=charmmel1slave')") +
					(perYou.checkFlag(26) ? addOptionLink("string", '"I am Aunt Brandi\'s ' + (perYou.getManWoman() == "man" ? 'nephew' : 'niece') + '..."', "dispPlace(432,'type=charmmel1gf')") : '') +
					'<br></td><td width="20%">' + this.addPersonFace(false, "80%") + '</td></tr></table>';
				CastCharmSpell("Melanie", '', 4, '', txt);
				return "handled";
			}
		}

		return "";		// do nothing
	};

	// Phone calls
	
	per.isPhoneable = function() {
		// Can you call them?
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.getCharmedLevel() == 3;
	};

	per.callThem = function() {
		if (Place == 269) {
			gotoPlace(Place, 'type=melaniepool');
			receiveCall('', 'You call Melanie to ask her to join you at the pool for a swim, and she answers, "Sure why not!".');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};	
	
	per.addPersonPhoneCall = function()
	{
		if (!this.checkFlag(2) && this.getCharmedLevel() == 3 && !this.isHere() && isNight() && this.hoursCharmed() > 24) {
			if (makeCall(true, 355)) this.setFlag(2);
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 355) return receiveSMS('MelMILF', 'Still looking good for my age?', 'sms1.jpg');
		return '';
	};
}
