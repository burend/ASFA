/****************************************************************
		Zoey
****************************************************************/

// Initialise
function initialiseZoey()
{
	// Zoey
	addPerson("Zoey", 0, "Zoey");
	
	per.getPersonAddress = function() { return isPlaceKnown("ZoeysApartment") ? 'Apartment 28, 42 Celeste Rd' : ''; };	

	per.whereNow = function() {
		if (Place == 414 || (Place == 412 && sType == "zoey") || sType == "callzoey" || sType == "callmadisonzoey") return Place;
		return isShopOpen() ? this.place : 466;
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 466 && this.isHere() && sType === "") return this.showPerson("home1" + (this.checkFlag(1) ? "-be" : "") + ".jpg", '', '', '', '', false, "string");
		return '';
	};

	per.showEvent = function()
	{
		var md;
		
		if (Place == 269) {
			if (sType == "zoeypool") {
				md = WritePlaceHeader();
				this.showPerson("pool" + (this.checkFlag(1) ? "-be" : "") + ".jpg");
				addPlaceTitle(md, "Pool-Girl Zoey");
				md.write(
					'<p>Zoey arrives and quickly changes into her cute yellow bikini and poses for you near one of the windows of the pool area.</p>' +
					'<p>You have a fun time relaxing and playing with your delivery-girl!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=zoeypoolsex');
				addLinkToPlaceC(md, 'say goodbye to Zoey', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "zoeypoolsex") {
				md = WritePlaceHeader();
				this.showPerson("pool-sex" + (this.checkFlag(1) ? "-be" : "") + ".jpg");
				addPlaceTitle(md, "Being Discrete and Private with Zoey");
				md.write(
					'<p>You ask your delivery girl to play with you more privately, and she seductively removes most of her bikini, ready for you!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Zoey', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 466) {
			if (sType == "zoeyfuck") {
				// Sex scenes at her home
				var bStrap = perYou.FindItem(45) > 0 && Math.random() < 0.4 && !perYou.isMaleSex();
				md = WritePlaceHeader(false, bStrap ? '' : 'td-left-med');
				if (bStrap) this.showPerson("home-sex-strapon.jpg");
				else this.showPerson("home-sex" + (this.checkFlag(1) ? "-be" : "") + ".jpg");
				addPlaceTitle(md, "Zoey");
				if (bStrap) {
					md.write(
						'<p>You take out your strap-on and show it to Zoey, she says that she has never tried one of them, but she mentions Madison once talked about them, or was it Nina?</p>' +
						'<p>You put it on and she kneels down and helps to lubricate it, mostly using her mouth. You then gently push her down so you can fuck her with the now moist member. Zoey seems to enjoy the new experience, and you certainly do as you both orgasm loudly.</p>'
					);
				} else if (perYou.isMaleSex()) {
					md.write(
						'<p>You enjoy yourself with Zoey, she is not a very experienced lover but is eager to learn what you want.</p>'
					);
				} else {
					md.write(
						'<p>You enjoy yourself with Zoey, she seems not very familiar with the ways of sex with another woman. You are quite happy to teach her and she eagerly learns how to pleasure you.</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, 'talk more with Zoey', Place);
				addLinkToPlace(md, 'exit the apartment', 456);
				WritePlaceFooter(md);
				return true;
			}

		}

		if ((Place == 414 || Place == 466) && sType == "transformbreasts") {
			// BE Transformation
			CastTransform(1);
			md = WritePlaceHeader(true, '', 'black');
			if (!this.checkFlag(1)) {
				this.setFlag(1);
				showPopupWindow("Transformation",
					'<img src="Images/GenericSex/be c.gif" style="width:50%;float:left;margin-right:6px;margin-top:1em;margin-bottom:2em" alt="BE">' +
					'<p>You cast the spell and Zoey cries out, "What the hell is happening?" and pulls apart her top. You see her breasts swelling, growing larger and larger, her modest sized breasts growing to quite large.</p>' +
					'<p>As she groans you thought you heard some laughing but maybe it was Nina. Zoey gasps as her breasts stop growing, and she remarks,<p>' +
					'<p>"Well, if this is permanent, I am going to need a new wardrobe.", and she rips her top off and continues, "How about giving them a spin!". You happily give them that and more.</p>'
				);
			} else {
				this.setFlag(1, false);
				showPopupWindow("Transformation",
					'<img src="Images/GenericSex/bs c.gif" style="width:50%;float:left;margin-right:6px;margin-top:1em;margin-bottom:2em" alt="BE">' +
					'<p>You cast the spell and Zoey cries out, "What the hell is happening?" and pulls apart her top. You see her breasts diminishing, becoming smaller and smaller, her huge sized breasts growing to a modest size.</p>' +
					"<p>As she groans you thought you heard some laughing but maybe it was Nina. Zoey gasps as her breasts stop diminishing, and she remarks,<p>" +
					'<p>"Well, if this is permanent, I am going to need my old clothes back.", and she discards her loose top off and continues, "How about giving them a spin!". You happily give them that and more.</p>')
			}
			setQueryParams("");
			WritePlaceFooter(md, '', true, true);
			return true;
		}

		if (sType == "callzoey") {
			md = WritePlaceHeader();
			this.showPerson(perYou.isMaleSex() ? "zoey-call-b.jpg" : "zoey-call-g.jpg");
			addPlaceTitle(md, "Dial-up Delivery Girl Zoey");
			md.write(
				'<p>Zoey arrives and she glances around and then gestures towards an out of the way place' + (perYou.isMaleSex() ? ', a small grassy area' : '') + '.</p>' +
				'<p>She removes her clothing, despite being in a public area and then she starts to do the same for you. Her intention is clear and you let her deliver her service to you, a skilled if very public ' + (perYou.isMaleSex() ? 'blowjob' : 'pussy-lick') + '.</p>'
			);
			startQuestions();
			this.addDancingLink(md, 'tell Zoey to dance for you in the club',
				'You tell your delivery-girl about the Avernus club and that you want her to dance for you there tonight,</p>' +
				'<p>&quot;Yes of course ' + perYou.getMaster() + '!&quot; and with that you call Jade to arrange a dance for Zoey.'
			);
			addLinkToPlace(md, 'let Zoey continue on her way', Place);
			AddRightColumnMed(md);
			this.showPerson("zoey0c.jpg");
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPerson("poledance" + (this.checkFlag(1) ? "b" : "a") + ".jpg");
		addPlaceTitle(md, "Zoey's Dance");
		md.write(
			'<p>Zoey is wearing some black lingerie as she steps onto the stage, she acts shy, but you can see it is more a game, being a tease. She is a fairly skilled dancer, but not a very experienced stripper and she ignores the pole. Still, she is sexy and entertaining!</p>' +
			'<p>After she sits with you for a while, attentively serving you as needed!</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 466 && this.isHere()) {
			if (isVisible()) md.write('<p>Zoey welcomes you, and invites you in.</p>');
			else md.write('<p>Zoey seems to be getting ready for bed.</p>');
		}
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 466 && this.isHere() && sType === "") {
			// Zoey's apartment
			addLinkToPlaceC(md, 'accept her hospitality', Place, 'type=zoeyfuck');
			this.addSleepLink(md, "go to bed with Zoey", "Sleeping with Zoey",
				'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Zoey to bed for the night.</b>',
				this.checkFlag(1) ? 'bed2.jpg' : 'bed1.jpg', true, '', '', '', "overflow-y:hidden"
			);
		}
	};	

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Examining the Soul Bound Crystal
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere() && perKurndorf.getQuestRitual() >= 200) {
					if (!this.isCharmedBy()) examineItem(no, 'The ' +  s + ' trembles weakly, you suspect you need a magical link to Zoey before it will work.');
					else if ((Place != 414 && Place != 466) || sType != "visitzoey") examineItem(no, 'The ' +  s + ' trembles slightly, maybe it would react better in another location with Zoey.');
					else examineItem(no, 'The ' +  s + ' vibrates softly the closer you get to Zoey.');
					return "handled";
				}
			}
		}

		// Casting the charm spell
		else if (no == 14 && cmd == 2) {

			if (Place == 412) {
				// Zoey in Madisons Office
				if (sType == "madisonzoey" && !isCharmedBy("Zoey")) CastCharmSpell("Zoey", 414, 4, "type=charm1");
				else addComments('You read a spell.... but it fizzles.');
				return "handled";
			}
		}

		// Casting the transform spell
		else if (no == 18 && cmd == 2) {

			// In the office at the TV Station
			if (Place == 466 || (Place == 414 && (sType == "visitzoey" || sType === ""))) {
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
	
	per.isPhoneable = function() {
		// Can you call them?
		return this.isCharmedBy() && !this.isHere();
	};

	per.callThem = function() {
		if (Place == 465) gotoPlace(Place, 'type=callmadisonzoey');
		else if (!isDay()) WriteComments("You call Zoey but there is no answer, you would guess she is at home and the number you have for her is probably her work number.");
		else if (Place == 269) {
			gotoPlace(Place, 'type=zoeypool');
			receiveCall('', 'You call Zoey to invite her to join you at the pool for a swim, and she immediately answers, "' + (isDay() ? 'Sure, I can take a break, see you soon' : 'Sure, I can use a dip') + '"');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (!isOutside()) WriteComments("You call Zoey but there is no answer, you should try again somewhere else. Your phone is not the best and you are getting a poor signal here inside.");
		else {
			gotoPlace(Place, 'type=callzoey');
			receiveCall('', 'You call Zoey and she immediately answers, and promises to be there in 15 minutes and deliver you something really <b>hot</b>');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	per.addPersonPhoneCall = function() {
		if (isMorning() && !this.checkFlag(2) && this.isCharmedBy()) {
			// SMS 79
			if (makeCall(true, 79)) {
				this.setFlag(2);
				setPlaceKnown("ZoeysApartment");
			}
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		if (id == 70) return receiveSMS('Madison', 'You know ' + perYou.getMaster() + ' I\'m not the only delivery-girl. Do you like Zoey, Nina really really does!', 'sms1.jpg');
		if (id == 71) return receiveSMS('Madison', perYou.getMaster() + ' she\'s here!', 'sms2.jpg');
		if (id == 79) return receiveSMS('Zoey', perYou.getMaster() + ' cleaning up here, maybe I can clean something for you..or you', 'sms3.jpg') + replyToSMS("Where are you?") + receiveSMS('Zoey', perYou.getMaster() + ' at home, Apartment 33 Celeste Apartments, visit me anytime');
		return '';
	};
}
