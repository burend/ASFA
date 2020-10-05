/**********************************************
Melissa
Cleaner for the Aquarium
***********************************************/

function initialiseMelissa()
{
	// Melissa
	addPerson("Melissa", 0, "Melissa", '', false);
	
	per.getPossessionFace = function() { return "melissa13"; };
	
	per.isPersonInfo = function() { return this.isCharmedBy(); };
	per.getPersonInfo = function() {
		var s = "<img src='Images/People/Melissa/" + (this.getCharmedLevel() == 4 ? "melissa10" : "melissa12") + ".jpg' style='width:30%;float:right;margin-left:5px' alt='Melissa'>";
		if (this.getCharmedLevel() == 4) {
			return s + "Melissa turned out to be a very submissive girl, even before you have placed her under your spell, and adjusted to her new role as your slave with ease.</p>" +
					"<p>She can be a little passive, almost shy until you give a direct order. And if you don't, she'll usually just do her work and occasionally casts furtive glances into your direction as you enjoy the attractions of the empty aquarium.</p>" +
					"<p>Of course, she's one of those attractions now. Melissa has begun working in the nude even if you are not around and admitted to you that she enjoys the thrill of it. She has always liked her body, but was apprehensive about the way other people might view her to the point where she always wore clothes concealing her curves when outside and only worked the night-shift to avoid colleagues and customers.</p>" +
					"<p>Under your spell, however, she no longer cares about what other people may think. Your opinion is the only one that matters to her now, and she works hard to gain your approval.</p>";
		} else {
			return s + "Melissa is a very submissive girl.</p>" +
					"<p>Even as your lover she happily and completely devotes herself to you and only scarcely seems willing to make her own desires known.</p>" +
					"<p>Still, she is a great companion. Thanks to her, you now have free access to the aquarium during after hours and not only get to see the usual attractions in peace, but also Melissa doing her work with no or very few clothes on her.</p>" +
					"<p>Melissa loves her curves. She loves to be naked, and she loves to be watched, especially by you, but a part of her was always apprehensive about the way other people might see her, so she always worked the night-shift to avoid colleagues and customers.</p>" +
					"<p>Now, under your spell and encouragement, she is slowly growing to be more and more exhibitionistic. You occasionally see her in sexy outfits even outside of work, and she is more than willing to remove them for a quickie, too.</p>";
		}
	};

	per.getPersonNameShort = function() { return this.checkFlag(2) ? this.name : "the cleaner"; };
	
	per.whereNow = function() { 
		if (isDay()) return this.place;
		var day = (Math.floor(nTime / 288) % 7 + 1) % 3;
		if (day === 0 || day == 1) return 369;
		return 370;
	};
	
	per.passTimeDay = function() {
		this.setFlag(3, false);
		
		return '';
	};
	
	// Popup events
	per.showEventPopup = function()
	{
		if (sType == "watchmelissa2") {
			showPopupWindow("Working",
				"<img src='Images/People/Melissa/" + (this.getCharmedLevel() == 4 ? "melissa23.jpg" : "melissa14.jpg") + "' class='imgpopup' alt='Melissa'>" +
				'It takes her a while to notice that you have your eyes on her the whole time, watching her as she crawls on the floor or stretches herself to reach certain spots. She is apprehensive of it at first, she quickly seems to grow accustomed to your gaze.',
				"WaitHereOnly(6);dispPlace(Place,'type=watchmelissa3')", '', true
			);				
			return true;
		}
		if (sType == "watchmelissa3") {
			showPopupWindow("Working",
				"<img src='Images/People/Melissa/" + (this.getCharmedLevel() == 4 ? "melissa24.jpg" : "melissa15.jpg") + "' class='imgpopup' alt='Melissa'>" +
				'Soon, you find her actively presenting herself to you, pushing her sizable bust forward, swaying her hip teasingly as she walks and even wiggling her ass whenever she needs to pick something off the ground, which coincidentally happens pretty often now.',
				"WaitHereOnly(6);dispPlace(Place,'type=watchmelissa4')", '', true
			);				
			return true;
		}
		if (sType == "watchmelissa4") {
			showPopupWindow("Working",
				"<img src='Images/People/Melissa/" + (this.getCharmedLevel() == 4 ? "melissa25.jpg" : "melissa16.jpg") + "' class='imgpopup' alt='Melissa'>" +
				'After about an hour of work, she is visibly aroused. Her folds are coated in her fluids and the way she moves is downright provocative and sensual. Melissa clearly enjoys being watched. Maybe it\'s just be the spell affecting her will, but chances are she has had a little exhibitionist streak all along.',
				"WaitHereOnly(6)", '', true
			);				
			return true;
		}
		if (!this.isHere()) return false;

		// Initial meeting at the Pool, daytime mon-sat after ending 1 offered
		if (!this.checkFlag(1)) {
			this.setFlag(1);
			showPopupWindow("Someone Else Here",
				"<img src='Images/People/Melissa/melissa1.jpg' class='imgpopup' alt='Cleaner'>" +
				"As it appears, the aquarium is not as empty at night as you had suspected, and you barely manage to duck out of sight before you are spotted by what must be the cleaning lady.<br><br>" +
				"Lucky for you, she is completely absorbed in her work, sweeping the floor with a bored expression and barely looking up to check her surroundings.<br><br>" +
				"You manage to get a good look from your hiding spot, and while her presence is a bit of an inconvenience, you do like what you see. Her uniform is rather snug, and definitely not big enough to contain her massive breasts. She has pulled down the zipper, if she had ever managed to pull it up to begin with, and you have a great look at her cleavage and the surprisingly racy bra she wears.<br><br>" +
				"For a moment, you wonder if you should approach her, but in the end, that might be unwise. You are not supposed to be here, after all, and if she causes a ruckus you have no way to stop her without knowing her name."
			);
			return true;
		}
		return false;
	};
	
	per.showEvent = function()
	{
		var md;
		
		if (Place == 269 && sType == "melissapool") {
			WaitHereOnly(4);
			md = WritePlaceHeader();
			this.showPerson("melissa-pool.jpg");
			addPlaceTitle(md, "Swimming with Melissa");
			md.write(
				'<p>Melissa arrives, dressed in a bikini with her hair tied back, smiling and looking quite different in the daylight.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=melissapoolsex');
			addLinkToPlaceC(md, 'say goodbye to Melissa', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "melissapoolsex") {
			md = WritePlaceHeader();
			this.showPerson("melissa-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Melissa");
			md.write(
				'<p>You ask Melissa to play with you more privately, and she seductively removes her swimsuit and sits waiting for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Melissa', Place);
			WritePlaceFooter(md);
			return true;
		}

		if (this.isHere()) {
			
			if (sType == "charmmelissa1") {
				// Charm at the Aquarium 1
				md = WritePlaceHeader();
				this.showPerson("melissa3.jpg");
				addPlaceTitle(md, "Melissa Under a Spell");
				md.write(
					'<p>“H...hello?” Melissa looks around the room uneasily as the first traces of the familiar pink glow begin to flicker in her eyes. “Is... is someone there?”</p>' +
					'<p>After a few seconds of silence she tries to resume her work, and you watch with a smile as the spell begins to slowly take effect and she absentmindedly touches herself.</p>' +
					'<p>She\'s trying to keep her fingers in check at first. A squeeze here, a pinch there... nothing too naughty, but her cheeks are reddening more and more with every minute, and soon, she is barely able to keep her hands off her own body.</p>' +
					'<p>“No... no... what am I doing...” She shakes her head, casting another uneasy glance across the room and, after maybe another minute of trying to focus back on her work, she hastily pulls down her bra with a deep, relaxing sigh.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, "watch her touching herself", Place, 'type=charmmelissa2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmmelissa2") {
				// Charm at the Aquarium 2
				md = WritePlaceHeader();
				this.showPerson("melissa4.jpg");
				addPlaceTitle(md, "Melissa Under a Spell");
				md.write(
					'<p>Melissa reveals her breasts and massages them eagerly, kneading the massive orbs with both hands and lustfully moaning into the room. You can feel the spell building up her lust with every passing second, and soon, fondling her breasts no longer seems to be enough.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, "keep watching", Place, 'type=charmmelissa3');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmmelissa3") {
				// Charm at the Aquarium 3
				md = WritePlaceHeader();
				this.showPerson("melissa5.jpg");
				addPlaceTitle(md, "Melissa Under a Spell");
				md.write(
					'<p>“S... someone is here, right?”  She calls out into the empty aquarium.  “Someone is watching me... making me do these... things....”</p>' + 
					'<p>Her voice is dripping with need and arousal, and as she speaks, she begins rubbing her fingers against her folds through her underwear, moaning lustfully.</p>' +
					'<p>“Making me... touch myself... pleasure myself.”</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, "wait just a little longer", Place, 'type=charmmelissa4');
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == "charmmelissa4") {
				// Charm at the Aquarium 4
				md = WritePlaceHeader();
				this.showPerson("melissa6.jpg");
				addPlaceTitle(md, "Melissa Under a Spell");
				md.write(
					'<p>The spell has begun to form a connection and Melissa\'s eyes keep twitching into your direction, aware of your presence, but no longer bothered by it.</p>' + 
					'<p>You watch as she kicks her panties away, seats herself on a nearby chest and begins to put her body on display for you, a shiver of pure lust rushing through her as she removes the rest of her uniform, roughly kneads her breasts and caresses her skin while spreading her folds and circling her, to your surprise, pierced clit.</p>' + 
					'<p>She is almost ready, and her mind as malleable as it will ever be. Now is the time to put a finishing touch on her enspellment.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, "show yourself", Place, 'type=charmmelissa5');
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == "charmmelissa5") {
				// Charm at the Aquarium 5
				md = WritePlaceHeader();
				this.showPerson("melissa7.jpg");
				addPlaceTitle(md, "Melissa Under a Spell");
				md.write(
					'<p>She is close to her climax as you step out of your hiding spot, her eyes going wide, cheeks flushed and her mouth wide open in pure awe as she falls on her knees in front of the chest.</p>' + 
					'<p>“I... I have been waiting for you...I think...” She whispers in a husky voice, her entire body trembling in anticipation. “I can\'t explain it but...” She stops mid sentence.</p>' + 
					'<p>“Please, I need to know who you are, what is your name?”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "tell your new lover your name", Place, 'type=charmmelissa6lover');
				addLinkToPlaceC(md, "tell your new slave to call you " + perYou.getMaster(), Place, 'type=charmmelissa6slave');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmmelissa6lover") {
				// Charm at the Aquarium 6 (Lover Charm)
				md = WritePlaceHeader();
				this.showPerson("melissa8.jpg");
				addPlaceTitle(md, "Lover Melissa Under a Spell");
				md.write(
					'<p>“I\'m ' + perYou.getPersonName() + '.” You tenderly drive your fingers through her hair, and she releases a soft sigh, her eyes focused on you,</p>' + 
					'<p>“' + perYou.getPersonName() + '...” She smiles brightly. “I\'m Melissa... but I believe you already know that, and I... I am usually not like this but I think I\'m in love with you...!” She bites her lower lip, her expression suddenly a little insecure. “Do you... love me, too?”</p>' + 
					'<p>“Of course.” You answer gently. “I love all the girls in my harem.”</p>' + 
					'<p>“Your... Harem...?” There is a brief moment of uncertainty on her face, but it quickly fades into a grimace of lust and pleasure as you focus on the mana inside her and finally make her climax.</p>' + 
					'<p>“A....ahhh...” You watch her hip twitch and her eyes loose focus, waiting patiently as her entire body convulses from the powerful torrent of sensations rushing through her. When she finally regains her focus, whatever doubt may have been left had vanished.</p>' + 
					'<p>“That was amazing! You... I... I would love to be part of your harem! I\'d do anything to get to feel like that again!”</p>' + 
					'<p>Your only response is a smile as you drive your fingers through her hair, of course you have quite a few ideas what she could do.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "talk to Melissa of your ideas", Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmmelissa6slave") {
				// Charm at the Aquarium 6 (Slave Charm)
				md = WritePlaceHeader();
				this.charmThem(4);
				this.showPerson("melissa8.jpg");
				addPlaceTitle(md, "Slave Melissa Under a Spell");
				md.write(
					'<p>“You can call me ' + perYou.getMaster() + '.” You gently caress her cheek as you say those words, and her eyes widen in shock.</p>' + 
					'<p>“' + perYou.getMaster() + '?!?”</p>' + 
					'<p>“Yes, is that not what a slave calls their owner?” You drive your thumb over her lips, and she closes her eyes with a sigh.</p>' + 
					'<p>“It... it is...”</p>' + 
					'<p>“And you want to be my slave, do you?” You focus on the mana inside her, using her build up arousal to keep her on the edge of her climax, your every word shaping her mind.</p>' + 
					'<p>“You want to give yourself to me with body mind and soul, Melissa. You want to obey everything I say and serve my every desire unquestioningly, right?”</p>' + 
					'<p>“Yeff...” She has begun suckling on your fingers, her eyes foggy as the last of her resistance melts into a haze of lust. “I... I do... but...”</p>' + 
					'<p>You push Melissa over the edge before she is able to finish the thought, and she almost falls over the moment the pent-up torrent of sensations washes through her body, twitching, moaning and screaming her lust into the aquarium loud enough to startle a few of the fishes.</p>' + 
					'<p>When she is finally able to focus again, the spell has finished remolding her mind, her eyes full of devotion and her body still trembling from the aftereffects of her climax.</p>' + 
					'<p>“This was amazing...” She whispers demurely, quickly lowering her head. “I would love to be your slave! Please, tell me how to serve you further, ' + perYou.getMaster() + '!”</p>' + 
					'<p>You have some ideas...</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "talk to Melissa of your ideas", Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "melissafuck") {
				// Repeat Fuck
				md = WritePlaceHeader();
				this.showPersonRorX(perYou.isMaleSex() ? "melissa17.jpg" : "melissa21.jpg");
				addPlaceTitle(md, "Melissa");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You take Melissa right on the freshly cleaned floor, pushing into her with fast, rough strokes and enjoying the view of her massive bust jiggling with every motion.</p>'
					);
				} else {
					md.write(
						'<p>Melissa may be inexperienced with other women, but, as you quickly found out, knows her own body rather well and is more than eager to apply that knowledge to satisfy your desires.</p>'
					);
				}
				startQuestions();
				addLinkToPlaceO(md, "let her resume work", Place);
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == "melissabj") {
				// Repeat Oral
				md = WritePlaceHeader();
				this.showPersonRorX(perYou.isMaleSex() ? "melissa18.jpg" : "melissa20.jpg");
				addPlaceTitle(md, "Melissa");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>Melissa greedily takes your cock into her mouth. She is a little sloppy and inexperienced, but you do enjoy her attentions nonetheless.</p>'
					);
				} else {
					md.write(
						'<p>Melissa eagerly buries her face between your tights, and after a bit of experimenting, brings you to climax with surprising ease.</p>'
					);
				}
				startQuestions();
				addLinkToPlaceO(md, "let her resume work", Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "melissatits") {
				// Repeat Tit Fuck
				md = WritePlaceHeader();
				this.showPersonRorX("melissa19.jpg");
				addPlaceTitle(md, "Melissa");
				md.write(
					'<p>You place your cock between Melissa\'s massive orbs and she happily squeezes them together to provide you with a good old-fashioned titjob.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, "let her resume work", Place);
				WritePlaceFooter(md);
				return true;
			}	
		}
	};
	
	// Image on the left
	per.addPlaceImageLeft = function(lit)
	{
		if (this.isHere() && sType === "") {
			if (this.isCharmedBy()) return this.showPerson(this.getCharmedLevel() == 4 ? "melissa11.jpg" : "melissa9.jpg", '', '', '', '', false, "string");
			return this.showPerson("melissa2.jpg", '', '', '', '', false, "string");
		}
		return '';
	};
	
	// Text shown in a location
	per.showPersonTextHere = function(md)
	{
		if (this.isHere() && sType === "") {
			if (!this.isCharmedBy()) {
				if (!this.checkFlag(2)) md.write('<p>The cleaning lady seems to be completely focused on her work, but you shouldn\'t linger here for too long if you don\'t want her to see you.</p>');
				else md.write('<p>Melissa remains focused on her work as always, It would be easy now to cast the spell unnoticed, if you wish to do so.</p>');
			} else if (this.getCharmedLevel() == 4) md.write("<p>Melissa falls onto her knees and straightens herself after she has let you in.  She doesn't dare to resume her work unless you give her the explicit order to do so, and even as she does, she is doing her best to impress you, occasionally casting over a quick, nervous glance.</p>");
			else md.write("<p>Melissa is, more or less, resuming her work after she has let you inside. However, her attention is mostly on you. She had taken off most of her clothes even before you came in and occasionally looks at you with a dreamy smile.</p>");
		}
	};
	
	// Dialogue options
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 394 && this.checkFlag(1) && !this.checkFlag(2) && sType === "" && isPersonHere("Abby")) {
			addQuestionR(md, 'ask Abby about the cleaning lady',
				(isCharmedBy("Abby") ? "“Oh, you mean Melissa?” Abby beams in excitement. “She hasn't been with us long, but she surely turns heads! I don't think there is a single man on the staff who has not wanted to help her with her uniform, and she does act all flustered and embarrassed if people stare but if you ask me she totally likes it because have you seen her bras?” She gestures to the front of her chest. “They are all lacy and partly see through and that's totally not part of the uniform!”</p>" +
											"<p>You expect her to need a breather, but she just goes on.</p>" +
											"<p>“And those uniforms are archaic anyway, I told you that, right? I mean why should she bother with them when she is working all alone at night? I bet secretly she would love to just throw off these antiquated notions of “modesty” as well, but when I told her, she acted all flustered and told me she has work to do and that management wouldn't allow it anyway and she is probably even right on the last bit but it's not like anyone would see her so she knows I am right and just won't admit it.”</p>" +
											"<p>Abby would likely continue her rant for a while longer, but at least you got what you needed out of it, and while she is a little disappointed when you tell her that you don't have that much time to talk, she is happy to have been of help and quick to ask she may help you with anything else."
										: 	"“Oh, that's Melissa.” Abby answers without a second of hesitation. “But don't get your hopes up if you want to ask her out, she's really... reserved. Always comes in, does her work and leaves without ever talking much, not even to me, and I tried to get her to talk a lot. She is polite about it, but I know she totally isn't interested.</p>" +
											"<p>Abby goes on for a while about Melissa, other cleaning staff and the aquarium in general, but it's mostly gossip and complains, so the most useful information you get is that Melissa apparently has a way to make even Abby understand that she is not interested in a conversation... which is quite the feat.</p>" +
											"<p>At least you finally know her name."),
				"Abby",
				"setPersonFlag(\\'Melissa\\',2)"
			);
		}
		if (this.isHere() && this.isCharmedBy() && sType === "") {
			if (!this.checkFlag(3)) {
				addPopupLink(md, 'watch her work', "Working",
					"<img src='Images/People/Melissa/" + (this.getCharmedLevel() == 4 ? "melissa22.jpg" : "melissa13.jpg") + "' class='imgpopup' alt='Melissa'>" +
					'You tell Melissa to not mind your presence. You are just here to take in the sights, and she should just keep on working as usual, and while she does look disappointed, she quickly nods and goes back to cleaning the floor.',
					true, "WaitHereOnly(6);dispPlace(Place,'type=watchmelissa2')");				
			}
			if (perYou.isMaleSex()) {
				addLinkToPlace(md, 'enjoy her pussy', Place, 'type=melissafuck');
				addLinkToPlace(md, 'enjoy her mouth', Place, 'type=melissabj');
				addLinkToPlace(md, 'enjoy her tits', Place, 'type=melissatits');
			} else {
				addLinkToPlace(md, 'enjoy her body', Place, 'type=melissafuck');
				addLinkToPlace(md, 'enjoy her tongue', Place, 'type=melissabj');
			}
		}
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// At the aquarium
			if (this.isHere()) {
				if (!this.checkFlag(2)) addComments("No point in casting the spell if you don't know her name, it won't work.");
				else CastCharmSpell("Melissa", Place, 2, 'type=charmmelissa1');
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
			if (!isDay()) WriteComments("You call Melissa to invite her to join you at the pool for a swim, but she replies, \"Sorry " + perYou.getMaster() + " I am working and I cannot afford to take time off!\". She apologies and promises to another time. ");
			else {
				gotoPlace(Place, 'type=melissapool');
				receiveCall('', 'You call Melissa to invite her to join you at the pool for a swim, and after a delay she sleepily answers, "Ok, why not!" and promises to be there soon.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};

}
