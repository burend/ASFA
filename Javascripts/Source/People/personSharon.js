/***********************************************************************
Sharon
***********************************************************************/

function initialiseSharon()
{
	// Sharon
	addPersonTop("Sharon", 0, "Sharon");
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		if (this.isCharmedBy()) return "Milf Masseuse";
		return this.name;
	};
	per.getPersonAddress = function() { return this.isCharmedBy() ? 'Apartment 33, 42 Celeste Rd' : ''; };	
	
	per.whereNow = function() {
		if (Place == 54) return Place;
		if (isShopOpen(2, 0, true)) return 48;
		return 468;
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 48 && !this.checkFlag(2)) {
			this.setFlag(2);
			showPopupWindow("Massage parlor owner",
				this.addPersonString("sharon0.jpg", "height:max%", "right") +
				"You enter the Massage Parlor and are greeted by the owner. A vaguely asian woman with an impressive rack.</p>" +
				'<p>The owner greets you and wishes you a "Good Day" as you enter.</p>' +
				"<p>It has been a while since you had a good massage so maybe this would be a good place to get one.</p>" +
				"<p>She is probably a pretty skilled masseuse since she owns the place. Might be nice to have a woman like that around.</p>"
			);
			return true;

		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (sType == "endgame1sharon") {
			// End Game - Sharon
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Massages?");

			md.write(
				'<p>One weekend you visit Sharon in her apartment and she poses in the bright sunlight, her hand on a slight bump, showing Miss. Logan\'s teachings have spread to her as well!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);
					
			WritePlaceFooter(md);
			return true;				
		}
		
		if (Place == 269) {
			if (sType == "sharonpool") {
				WaitHereOnly(4);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Sharon");
				md.write(
					'<p>Sharon arrives, dressed in a cute bikini, and immediately jumps in for a swim beckoning for you to join her!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=sharonpoolsex');
				addLinkToPlaceC(md, 'say goodbye to Sharon', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "sharonpoolsex") {
				md = WritePlaceHeader();
				this.showPerson("pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Sharon");
				md.write(
					'<p>You tell Sharon to play with you more privately, and she kneels exposing herself as an invitation for you to take her.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Sharon', Place);
				WritePlaceFooter(md);
				return true;
			}
		}

		if (sType == "sharonask1") {
			// Ask Sharon 1
			md = WritePlaceHeader();

			this.showPerson("sharonask.jpg");
			addPlaceTitle(md, "Asking for a massage");

			md.write(
				'<p>You ask the owner "Excuse me Miss. Where are all the Masseuses?  I don\'t see anyone in here besides a few customers?" She answers,</p>' +
				'<p>"Oh we don\'t have any of those anymore. I used to be one but I switched this place over to automatic massage chairs a while back. It was just too much of a hassle to deal with horny guys all the time. You would not believe what men come in here expecting young ladies to do for them."</p>' +
				'<p>You tell her, "Oh yea guys are the worst. So there\'s no way to get a massage from a trained professional here?"</p>' +
				'<p>She smiles, "Well I do still take some clients but...no offense.. but I doubt you can afford my services.</p>'
			);

			startQuestions();
			if (nMoney >= 300) addLinkToPlaceC(md, 'pull a fat wad of cash out of your pocket', Place, 'type=sharonask2');
			if (nMoney < 300) addLinkToPlaceC(md, 'I\'ll need more cash to impress her. Leave for now.', 43);

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "sharonask2") {
			// Ask Sharon 2
			md = WritePlaceHeader();

			this.showPerson("sharon2.jpg");
			addPlaceTitle(md, "Asking for a massage");

			md.write(
				'<p>She looks at the case and says, "Oh. I\'m so sorry dear. That was quite rude of me. Please allow me to make up for it with a complimentary massage."</p>' +
				'<p>You reply, "That sounds lovely Miss.. Oh I dont think I ever caught your name?" and she says,</p>' +
				'<p>"Oh dear. Where are my manners today? My name is Sharon. Please follow me to the back room and Ill give you your free massage."</p>' +
				'<p>You smile and tell her, "Sounds great."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'follow her', Place, 'type=sharonmassage');
			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "sharonmassage") {
			// Sharon Massage
			md = WritePlaceHeader();

			this.showPersonBG("sharon3.jpg");
			this.setFlag(3);

			addPlaceTitle(md, "Free massage from Sharon");

			md.write(
			  '<p>Sharon changes into her robe and instructs you to disrobe and lie face down on the table so she can begin.</p>' +
			  '<p>She massages you but mostly sticks to your shoulders and mid back. She doesn\'t seem to want to go any lower than that.</p>' +
			  '<p>This isn\'t the high roller treatment you had hoped for.</p>' +
			  (isSpellKnown("Charm") ? '<p>Luckily you have other ways of getting what you want.</p>' : '')
			 );

			startQuestions();
			addLinkToPlace(md, 'leave unsatisfied.', 43);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "sharonmassageslave") {
			// Sharon Massage
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPersonRorX("sharonmassb.jpg");
			else this.showPerson("sharonmassg.jpg");

			addPlaceTitle(md, "Massage from your slave Sharon");

			md.write(
			  '<p>Sharon changes into her robe and instructs you to disrobe and lie face down on the table so she can begin.</p>' +
			  '<p>She has no reservations now and quickly moves to massaging lower and lower and then moving to an intimate oral \'massage\'.</p>'
			 );

			startQuestions();
			addLinkToPlace(md, "return to the lobby", 48);
			addLinkToPlace(md, 'leave satisfied.', 43);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmsharon1") {
			// Charm Sharon 1
			md = WritePlaceHeader();

			this.showPersonBG("sharon4.jpg");
			addPlaceTitle(md, "Sharon Under a Spell");

			md.write(
				'<p>You roll over to face Sharon and you can see that your spell has taken her.</p>' +
				'<p>"I wasnt quite done with your back there dear. Could you turn back over for me"</p>' +
				'<p>"Oh my back is fine. I want you to focus on my front now. I\'ll need you to go lower as well."</p>' +
				'<p>"Look I already told you that this isn\'t that kind of a massage parlor anymore. This..." She says as she places her hands on your stomach. "..is as low as I\'ll go now"</p>' +
				'<p>"I don\'t think either of us believe that your days of lewd behavior are truly behind you. Now stop messing around and ' + (perYou.isMaleSex() ? 'stroke my cock' : 'lick my pussy') + '."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'the spell takes hold', Place, 'type=charmsharon2slave');
			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmsharon2slave") {
			// Charm Sharon 2 (Slave)
			md = WritePlaceHeader();

			this.showPersonBG("sharon5.jpg");
			addPlaceTitle(md, "Sharon Being Enslaved By A Spell");

			md.write(
				'<p>"No I\'m not gonna..." she says even as she pulls off your towel and places her hands on your ' + (perYou.isMaleSex() ? 'hardening cock' : 'moistening pussy') + '.</p>' +
				'<p>"Good girl, Sharon," you say</p>' +
				'<p>"No but I didn\'t. I mean I\'m not. Why?"</p>' +
				'<p>"You can\'t deny your nature. You grew up serving men and women and you made it into a career. It\'s part of your heritage. You may as well accept it now. You will be serving me exclusively for the forseeable future."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Now undress so I can enjoy this more."', Place, 'type=charmsharon3slave');

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmsharon3slave") {
			// Charm Sharon 3 (Slave)
			md = WritePlaceHeader();

			this.showPersonBG("sharon6.jpg");
			addPlaceTitle(md, "Sharon Under a Spell");

			md.write(
				'<p>"Uhh Yes ' + (perYou.isMaleSex() ? 'Sir' : "Ma'am") + '?" She replies.</p>' +
				'<p>"Now that\'s more like it.  No reason to be shy around your new ' + perYou.getMaster() + '."</p>'
			);

			startQuestions();

			addLinkToPlace(md, '"Finish stripping and continue"', Place, 'type=charmsharon4slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmsharon4slave") {
			// Charm Sharon 4 (Slave)
			md = WritePlaceHeader();

			this.showPersonRorXBG("sharon7.jpg");
			addPlaceTitle(md, "Sharon Under a Spell");

			md.write(
				'<p>Sharon gets completely nude and goes back to stroking your ' + (perYou.isMaleSex() ? 'cock like she has so many cocks before' : 'pussy like she has so often before') + '. You groan,</p>' +
				'<p>"MMMmmmmMm you are good at this Slave.  I guess practice really does make perfect"</p>' +
				'<p>She replies, "Thank you.. M..' + perYou.getMaster() + '".</p>' +
				'<p>You tell her, "Wow I almost don\'t even need to make you suck it. I\'m still going to but the fact that I even thought about it really is a testament to your skill."</p>'
			);

			startQuestions();

			addLinkToPlaceC(md, perYou.isMaleSex() ? '"Now suck"' : '"Now lick"', Place, 'type=charmsharon5slave');

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmsharon5slave") {
			// Charm Sharon 5 (Slave)
			md = WritePlaceHeader();

			if (isExplicit && perYou.isMaleSex()) this.showPersonX("sharon8b.jpg");
			else this.showPersonBG("sharon8.jpg");
			addPlaceTitle(md, "Sharon Under a Spell");

			md.write(
				'<p>Sharon obediently begins ' + (perYou.isMaleSex() ? 'sucking your cock' : 'licking your pussy') + '. You are already so close to finishing that it does not take much time before you cant hold back any longer.</p>' +
				'<p>"Ok Slave, now here ' + (perYou.isMaleSex() ? 'it comes' : 'I cum') + '."</p>'
			);

			startQuestions();

			addLinkToPlace(md, "get your 'Happy Ending'", Place, 'type=charmsharon6slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmsharon6slave") {
			// Charm Sharon 6 (Slave)
			md = WritePlaceHeader();

			if (isExplicit && perYou.isMaleSex()) this.showPersonX("sharon9b.jpg");
			else this.showPersonBG("sharon9.jpg");
	
			addPlaceTitle(md, "Sharon Under a Spell");

			md.write(
				'<p>You ' + (perYou.isMaleSex() ? 'bust' : 'orgasm') + ' all over Sharon and yourself and she just keeps going. The spell has taken her quickly. You are her one and only high roller customer from now on..</p>' +
				'<p>While she is cleaning you off she looks up and says "Thank you ' + perYou.getMaster() + '. I needed this in my life. I have always loved helping men and women relax but serving one with all my being is truly special.".</p>' +
			  '<p>She continues "To be honest, I have actually been running an underground relaxation center out of the basement here.  There is an entrance in the alley behind the building. Come by sometime if you ever get frustrated or just bored and want to releave stress in a different way.  Oh and I live in the Celeste apartments. Visit any night."</p>'
			);

			startQuestions();
			addLinkToPlace(md, "return to the lobby", 48);
			addLinkToPlace(md, "leave", 43);

			WritePlaceFooter(md);
			return true;
		}
		return false;
	};

	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1sharon" : "";
	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			if (Place == 48 && sType === "") {
				// Sharon fail
				addComments('You attempt to cast the spell, but if fails to take effect. It is too crowded here and you don\'t know her name. You should try to get her alone.');
				return "handled";
			}
			// Sharon massage
			if (Place == 48 && sType == "sharonmassage") {
				CastCharmSpell("Sharon", Place, 4, 'type=charmsharon1'); // CHARM Sharon (Milf Masseuse), slave level
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
			gotoPlace(Place, 'type=sharonpool');
			receiveCall('', 'You call Sharon to tell her to join you at the pool for a swim, and she answers enthusiasticaly, "Certainly!" and hangs up. You take that to mean she will be there soon.');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	per.addPersonPhoneCall = function()
	{
		if (!this.checkFlag(5) && !this.isHere() && isMorning() && this.hoursCharmed() > 24) {
			if (makeCall(true, 360)) this.setFlag(5);
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 360) return receiveSMS('SharonSlave', perYou.getMaster() + ' do you like you slave dressed like this?', 'sms1.jpg');
		return '';
	};
};
