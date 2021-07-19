/***********************************************************************
Lola, museum curator
***********************************************************************/

function initialiseLola()
{
	// Lola
	addPerson("Lola", 243, "Lola");
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv > 0) return "Curious Curator";
		return this.name;
	};
	
	per.whereNow = function() {
		if (isShopOpen(2, 0, true)) return 243;
		//if (isDay()) return 451;
		return 451;
	};
	
	per.getPersonAddress = function() { return isPlaceKnown("LolasHouse") ? '23 Amaranth Pl, Glenvale' : ''; };
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		// Introduction to Lola
		if (Place == 243 && this.isHere() && !this.checkFlag(1)) {
			this.setFlag(1);
			showPopupWindow("Lola the Curator",
				this.addPersonString("lola0.jpg", "height:max%", "right") +
				"Lola is busy working at her desk when you enter her office. She spins around when you enter.</p>" +
				"<p>\"That door was locked. How did you get in here?\"</p>" +
				"<p>You explain that the guard let you in because you have urgent business with her.</p>"
			);
			return true;
		}
		return false;
	};

	per.showEventStoreroom = function()
	{
		var md;
		var perGina = findPerson("Gina");
		
		if (sType == "ginawhip") {
			md = WritePlaceHeader();
			if (!this.checkFlag(3)) perGina.showPerson("bondage-whip.jpg");
			else this.showPerson("bondage-whip.jpg");
			addPlaceTitle(md, "Lola Whipping Gina");
			md.write(
				'<p>Lola whips Gina</p>'
			);
			this.setFlag(3, !this.checkFlag(3));
			startQuestions();
			addLinkToPlace(md, "pick something else", Place);
			addLinkToPlace(md, "return to Lola\'s office", 243);
			addLinkToPlace(md, "leave the storeroom", 239);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "ginavibe") {
			md = WritePlaceHeader();
			if (!this.checkFlag(3)) perGina.showPerson("bondage-vibe.jpg");
			else this.showPersonRandom("bondage-vibe", 3);
			addPlaceTitle(md, "Lola Uses a Vibrator on Gina");
			md.write(
				'<p>Lola uses a wand type vibrator on Gina</p>'
			);
			this.setFlag(3, !this.checkFlag(3));
			startQuestions();
			addLinkToPlace(md, "pick something else", Place);
			addLinkToPlace(md, "return to Lola\'s office", 243);
			addLinkToPlace(md, "leave the storeroom", 239);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "ginafacesit") {
			md = WritePlaceHeader();
			this.showPersonRandomRorX("bondage-facesitting", isExplicit() ? 1 : 3);
			addPlaceTitle(md, "Lola Uses Gina\'s Face");
			md.write(
				'<p>Lola sits on Gina\'s face and makes Gina lick her pussy/p>'
			);
			startQuestions();
			addLinkToPlace(md, "pick something else", Place);
			addLinkToPlace(md, "return to Lola\'s office", 243);
			addLinkToPlace(md, "leave the storeroom", 239);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "ginalick") {
			md = WritePlaceHeader();
			this.showPersonRandom("bondage-lick", 3);
			addPlaceTitle(md, "Lola Makes Gina Lick Her");
			md.write(
				'<p>Lola makes Gina lick her pussy.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "pick something else", Place);
			addLinkToPlace(md, "return to Lola\'s office", 243);
			addLinkToPlace(md, "leave the storeroom", 239);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "ginafeet") {
			md = WritePlaceHeader();
			this.showPersonRandom("bondage-foot", 2);
			addPlaceTitle(md, "Lola Makes Gina Lick Her Feet");
			md.write(
				'<p>Lola has Gina lick her feet</p>'
			);
			startQuestions();
			addLinkToPlace(md, "pick something else", Place);
			addLinkToPlace(md, "return to Lola\'s office", 243);
			addLinkToPlace(md, "leave the storeroom", 239);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "ginastrapon") {
			md = WritePlaceHeader();
			this.showPersonRandomX("bondage-strapon", 5);
			addPlaceTitle(md, "Lola Fucks Gina With a Strap-On");
			md.write(
				'<p>Lola fucks Gina with a Strap-on</p>'
			);
			startQuestions();
			addLinkToPlace(md, "pick something else", Place);
			addLinkToPlace(md, "return to Lola\'s office", 243);
			addLinkToPlace(md, "leave the storeroom", 239);
			WritePlaceFooter(md);
			return true;
		}			
		
		return false;
	};
	
	per.showEvent = function()
	{
		if (Place == 246) return this.showEventStoreroom();
		var md;
		
		if (Place == 269) {
			if (sType == "lolapool") {
				WaitHereOnly(4);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Lola");
				md.write(
					'<p>Lola joins you wearing a lovely striped bikini and she models for you, performing a strip-tease.</p>' +
					'<p>You wonder if you should take it a bit further...</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'of course you should', Place, 'type=lolapoolsex');
				addLinkToPlaceC(md, 'say goodbye to Lola', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "lolapoolsex") {
				md = WritePlaceHeader();
				this.showPersonRorX("pool-sex" + (perYou.isMaleSex() ? "b" : "g") + ".jpg");
				addPlaceTitle(md, "Being Discrete and Private with Lola");
				if (this.getCharmedLevel() == 4) md.write('<p>Of course you do and order Lola to remove the rest of her bikini and serve you at the edge of the pool!</p>');
				else md.write('<p>Of course you do and ask Lola to remove the rest of her bikini and play together at the edge of the pool!</p>');
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Lola', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (sType == "charmlola1slave") {
			// Charm Lola 1
			md = WritePlaceHeader();
			if (whereItem(45) === 0 && isExplicit()) PlaceI(45, 451);		// Add a strap-on to her home

			this.showPerson("lola2.jpg");
			addPlaceTitle(md, "Lola Under a Spell");

			md.write(
				'<p>"Dai Chu Lola."</p>' +
				'<p>Lola cocks her head to the side. "What was that. I\'m not familiar with that native american tribe"</p>' +
				'<p>You reply, "No, No it\'s not that. I have come to discuss primal man and his desire for power. You have studied primitive cultures before. Right?"</p>' +
				'<p>She answers shortly, "Yes of course. My speciality is the Paleolithic era."</p>'
			);
			if (perYou.isMaleSex()) {
				md.write(
					'<p>You tell her, "Perfect. Then you must know how they treated their women?"</p>' +
					'<p>"I suppose I know more than the average person. Yes. The men were quite savage. They took the women whenever they wanted and did with them as they pleased."  You can see that she is becoming aroused thinking about this now that the charm spell is taking over her body.</p>'
				)
			} else {
				md.write(
					'<p>You tell her, "Perfect. Then you must know how many of these societies appear to have been matriarchies"</p>' +
					'<p>"Well there is definite evidence of fertility cults and worship of female idols" You answer,</p>' +
					'<p>"Then you must see how the people then worshipped and submitted in all things to their \'queen\' or whatever term they used. How they would be used as the Queen wanted" You can see that she is becoming aroused thinking about this now that the charm spell is taking over her body.</p>'
				)
			}
			md.write(
				'<p>You tell her, "That is exactly right. Isn\'t that amazing. What must it have been like to be a woman in those days? What if I told you I could let you experience that primal passion."</p>' +
				'<p>She stammers, "Th..That wouldn\'t be appropriate. But how could you do that. Just out of curiosity."</p>' +
				'<p>You smile and reply, "Oh I have already begun. You see I can control you now and every time you obey me you will feel what it would have been like to be one of those submissive primitive women."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Now open your blouse"', Place, 'type=charmlola2slave');
			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmlola2slave") {
			// Charm Lola 2 (Slave)
			md = WritePlaceHeader();

			this.showPerson("lola3.jpg");
			addPlaceTitle(md, "Lola Being Enslaved By A Spell");

			md.write(
				'<p>Lola opens up her blouse and she cannot help but allow a smile to creep across her lips as she says,</p>' +
				'<p>"This is wrong. We live in a civilized world now. People should not be owned."</p>' +
				'<p>You tell her, "Maybe they shouldn\'t be. But isn\'t that what makes the sensation that much more enjoyable. You like being controlled. You crave it now."</p>' +
				'<p>She answers but looks uncertain, "It was an interesting experience but I\'m afraid I must ask you to leave now."</p>' +
				'<p>You firmly tell her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"I\'m just getting started. Undress Now."', Place, 'type=charmlola3slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmlola3slave") {
			// Charm Lola 3 (Slave)
			md = WritePlaceHeader();

			this.showPerson("lola4.jpg");
			addPlaceTitle(md, "Lola Under a Spell");

			md.write(
				'<p>Lola removes her skirt and shirt and sits on her desk. You tell her "Good Girl"</p>' +
				'<p>She says confused, "I don\'t understand how you can do this and also why does it make me feel good."</p>' +
				'<p>You tell her, "Oh well the first bit is magic but the second part is because I am tapping into people\'s primal desire to be controlled. Secretly you all crave domination."</p>' +
				'<p>Lola has become visibly wet in her panties so you ask her to continue stripping and then you tell her...</p>'
			);

			startQuestions();
			addLinkToPlace(md, '"I\'ll allow you to play with yourself now"', Place, 'type=charmlola4slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmlola4slave") {
			// Charm Lola 4 (Slave)
			md = WritePlaceHeader();

			this.showPerson("lola5.jpg");
			addPlaceTitle(md, "Lola Under a Spell");

			md.write(
				'<p>"Thank you ' + perYou.getSir() + '." She blurts out instinctively. You then tell her</p>' +
				'<p>"I will now ask you to do one thing for me and if you refuse then I will leave you alone and never return."</p>' +
				'<p>"MMmmMm HHHmmm."  She moans. "What is it?". You tell her</p>' +
				'<p>"I ask that you ' + (perYou.isMaleSex() ? 'suck my cock' : 'lick my pussy') + ' right now. I will not force you to do so and I will leave if you refuse but if you accept you will become my obedient slave and I will show you all the pleasure and pain that comes with that."</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'wait for her answer', Place, 'type=charmlola5slave');
			WritePlaceFooter(md);
			return true;

		}

		if (sType == "charmlola5slave") {
			// Charm Lola 5 (Slave)
			md = WritePlaceHeader();
			setPlaceKnown("LolasHouse");
			if (perYou.isMaleSex()) this.showPersonRorX("lolablowb.jpg");
			else this.showPerson("lolablowg.jpg");
			addPlaceTitle(md, "Lola Under a Spell");

			md.write(
				'<p>Lola hesitates for only a second. The promise of more pleasure is too much for her to resist. ' +
				'<p>She begins ' + (perYou.isMaleSex() ? 'sucking your cock' : 'licking your pussy') + ' right at her own desk. She knows she does not deserve a desk anymore.  Her place is under it at your feet.</p>' +
				'<p>You sigh and tell her, "You have made a wise decision Lola."</p>' +
				'<p>She answers, "Thank you so much ' + perYou.getMaster() + '"</p>' +
				'<p>You let your new slave enjoy servicing you for a while before you head out of her office. As you leave she gives you a copy of her house key with her address on it. She must figure that you own it now too. It\'s on Amaranth Place.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'leave the office', 239);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmlola1gf") {
			// Charm Lola 1 (Lover)
			md = WritePlaceHeader();
			this.charmThem(3);

			this.showPerson("lola2.jpg");
			addPlaceTitle(md, "Lola Under a Spell");

			md.write(
				'<p>"Dai Chu Lola."</p>' +
				'<p>Lola cocks her head to the side. "What was that. I\'m not familiar with that native american tribe"</p>' +
				'<p>You reply, "No, No it\'s not that. It is from an arcane language, they are words of desire"</p>' +
				'<p>Technically you told the truth, and continue, "Gina told me about how beautiful you are and I can see she did not exaggerate."</p>' +
				'<p>You continue flattering her and then notice the spell is taking effect and she is becoming aroused at your words. You suggest if she is feeling "hot" she may like to...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'loosen her blouse', Place, 'type=charmlola2gf');
			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmlola2gf") {
			// Charm Lola 2 (Lover)
			md = WritePlaceHeader();

			this.showPerson("lola3.jpg");
			addPlaceTitle(md, "Lola Falling Under A Spell");

			md.write(
				'<p>Lola opens up her blouse more than she probably intended under the influence of the spell and she cannot help but allow a smile to creep across her lips as she says,</p>' +
				'<p>"This is wrong, we have not met before or gone out together..."</p>' +
				'<p>You tell her, "Maybe but that does not matter if I like you and you seem to like me as well. We have all heard of love at first sight?"</p>' +
				'<p>You continue on emphasising how love can be spontaneous and how it seems to you she desires you as you desire her.</p>' +
				'<p>She exclaims, "Damn it, forget wrong!" and...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'she starts removing her clothing', Place, 'type=charmlola3gf');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmlola3gf") {
			// Charm Lola 3 (Lover)
			md = WritePlaceHeader();

			this.showPerson("lola4.jpg");
			addPlaceTitle(md, "Lola Fallen Under a Spell");

			md.write(
				'<p>Lola removes her skirt and shirt and sits on her desk just in her underwear, and she says a bit confused but clearly aroused,</p>' +
				'<p>"I don\'t understand this is happening and why does it make me feel so good."</p>' +
				'<p>You tell her, "There is no reason to question our primal desires, we want each other, you have fallen for me"</p>' +
				'<p>Lola has become visibly wet in her panties so you ask her to continue stripping and then you tell her...</p>'
			);

			startQuestions();
			addLinkToPlace(md, '"Let\'s make love"', Place, 'type=charmlola4gf');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmlola4gf") {
			// Charm Lola 4 (Lover)
			md = WritePlaceHeader();
			setPlaceKnown("LolasHouse");
			if (perYou.isMaleSex()) this.showPersonRorX("lolafuckb.jpg");
			else this.showPerson("lolafuckg.jpg");
			
			addPlaceTitle(md, "Lola Completely Under You and a Spell");

			md.write(
				'<p>With that she loses all restraint and you embrace your new charmed lover and take her on her own desk.</p>' +
				'<p>After she looks satisfied and you promise to visit soon and she gives you a copy of her house key with her address on it. It\'s on Amaranth Place.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'leave the office', 239);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1lola") {
			// End Game - Lola
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Curators?");

			md.write(
				'<p>One day you receive a message from your ' + (this.isSlave() == 4 ? 'slave' : 'lover') + ' Lola, showing her swollen pregnant belly. Miss. Logan strikes again!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);
					
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "lolarecharm") {
			// Recharm Lola
			md = WritePlaceHeader();
			this.showPerson("recharm.jpg");			
			addPlaceTitle(md, "Lola Under a Charm Spell Again");

			if (this.getCharmedLevel() == 4) {
				this.charmThem(3);
				md.write(
					'<p>You tell Lola, "Gina told me about how beautiful you are and I can see she did not exaggerate."</p>' +
					'<p>You continue flattering her and then notice the spell is taking effect and she is becoming aroused at your words.</p>'
				);
			} else {
				this.charmThem(4);
				md.write(
					'<p>You tell Lola, "I have come to discuss primal man and his desire for power. You have studied primitive cultures before. Right?"</p>' +
					'<p>She answers shortly, "Yes of course. My speciality is the Paleolithic era."</p>'
				);
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You tell her, "Perfect. Then you must know how they treated their women?"</p>' +
						'<p>"I suppose I know more than the average person. Yes. The men were quite savage. They took the women whenever they wanted and did with them as they pleased."  You can see that she is becoming aroused thinking about this now that the charm spell is taking over her body.</p>'
					)
				} else {
					md.write(
						'<p>You tell her, "Perfect. Then you must know how many of these societies appear to have been matriarchies"</p>' +
						'<p>"Well there is definite evidence of fertility cults and worship of female idols" You answer,</p>' +
						'<p>"Then you must see how the people then worshipped and submitted in all things to their \'queen\' or whatever term they used. How they would be used as the Queen wanted" You can see that she is becoming aroused thinking about this now that the charm spell is taking over her body.</p>'
					)
				}
				md.write(
					'<p>You tell her, "That is exactly right. Isn\'t that amazing. What must it have been like to be a woman in those days? What if I told you I could let you experience that primal passion."</p>' +
					'<p>She stammers, "Th..That wouldn\'t be appropriate. But how could you do that. Just out of curiosity."</p>' +
					'<p>You smile and reply, "It is done! You see I can control you now and every time you obey me you will feel what it would have been like to be one of those submissive primitive women."</p>'
				);
			}
							md.write(
					'<p>You tell Lola, "I have come to discuss primal man and his desire for power. You have studied primitive cultures before. Right?"</p>' +
					'<p>She answers shortly, "Yes of course. My speciality is the Paleolithic era."</p>'
				);

			startQuestions();	
			addLinkToPlaceC(md, 'talk more to Lola', Place);
					
			WritePlaceFooter(md);
			return true;				
		}		

		return false;
	};

	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1lola" : "";
	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// Lola's Office
			if (Place == 243 && this.isHere()) {
				var txt = '<div style="color:black;margin-top:1em;margin-bottom:1em;margin-left:4em;margin-right:2em;cursor:default;">' +
					'<table><tr><td width="80%;margin-right:2em"><p>You cast the spell and you see Lola start to be affected by it. As she does you tell her...</p>' +
					addOptionLink("string", '"I have come to discuss primal man..."', "dispPlace(243,'type=charmlola1slave')") +
					(perYou.checkFlag(26) ? addOptionLink("string", '"I heard you were so beautiful..."', "dispPlace(243,'type=charmlola1gf')") : '') +
					'<br></td><td width="20%">' + this.addPersonFace(false, "80%") + '</td></tr></table>';
				CastCharmSpell("Lola", '', 4, '', txt, 'type=lolarecharm');
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
			gotoPlace(Place, 'type=lolapool');
			if (this.isSlave()) receiveCall('', 'You call Lola to order her to join you at the pool for a swim, and she answers promptly, "I\'ll be there shortly ' + perYou.getMaster() + '".');
			else receiveCall('', 'You call Lola to ask her to join you at the pool for a swim, and she answers, "Sure, I could use a break, I\'ll be there soon".');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};

}
