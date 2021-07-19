/****************************************************************
Demon Elian
****************************************************************/

/***************** Initialise ******************************************************************************/
function initialiseElian()
{
	addPerson("Elian", 900, "Elian", "Succubus", false);
	
	per.extra = [0, 0];		// expanded arbitrary data
	
	per.getTeleportFrom = function() { return this.extra[0]; };
	per.setTeleportFrom = function(no) { this.extra[0] = no; };
	
	per.getPossessionFace = function() { return this.getDress() == "Succubus" ? "elian-face" : this.getCharmedLevel() == 4 ? "companion" : "clubtalk1c"; };
	
	per.getYourNameFor = function() {
		var clv = this.getCharmedLevel();
		if (clv <= 0) return perYou.getPersonName();
		if (clv == 3) return "my Love";
		return perYou.getMaster();
	};
	
	per.getPersonName = function(full) {
		return this.checkFlag(11) || this.dress == "Succubus" ? "Elian" : "Rachael";
	};
	per.getPersonNameShort = function() { return this.getPersonName(); };
	
	per.getDress = function() {
		if (Place == 900) return "Succubus";
		return this.dress;
	};
	
	per.getSuffix = function(simple) {
		var clv = this.getCharmedLevel();
		if (simple === true && clv != 4) return "";
		if (clv == 2) return "-lover";
		if (clv == 3) return "-bride";
		return "-servant";		// clv == 4
	};		
	
	per.whereNow = function() {
		if (this.checkFlag(18) && !this.isCharmedBy()) return 900;
		if (sType === "showerelian" || sType == "elianpoolmeet") return Place;		// Shower/Pool event
		if (isPossess() && this.place == -1) return perYou.place;
		if (Place == 282 && (getHour() > 21 || this.checkFlag(12)) && this.place != -1) return 0;	// Only here after midnight
		if (Place == 45) return -45;
		return Math.floor(this.place);
	};
	
	per.visitThem = function() { this.other = nTime; };
	
	per.getPersonAddress = function() { return this.checkFlag(3)  ? 'unknown' : ''; };

	per.passTimeDay = function() {
		if (this.checkFlag(15)) {
			this.setFlag(7, false);
			this.setFlag(6, false);
		}
		if (this.charmed > 0) {
			// Pact bound
			if (this.place == 1000) return '';
			var clv  = this.getCharmedLevel();
			var cost = 0;
			if (clv == 4) cost = 10;
			else if (clv == 3) cost = 1;
			else cost = 5;
			if (nMana < cost && clv != 3) this.setFlag(27);
			AddMana(cost * -1);
		}
		return '';
	};
	
	per.passTimeNight = function() {
		this.setFlag(12, false);
		this.setFlag(23, false);
		this.setFlag(24, false);
		return '';
	};
	
	// Images
	per.isPlaceImageRight = function()
	{
		// Companion
		if (this.place == -1 && sType === '') {
			// With you
			SetRightColumnSize("");
			return true;
		}
		// At the club
		return (Place == 282 && this.checkFlag(2) && this.isHere() && sType === "");
	};

	per.showPlaceImageRight = function(md)
	{
		if (this.place == -1) this.showPerson(this.getCharmedLevel() == 4 ? "companion.jpg" : "challenge1.jpg", undefined, undefined, undefined, this.getPersonName());  // Companion
		else {
			// Club
			this.showPersonRandom("club1", 2, undefined, undefined, undefined, !this.checkFlag(3) ? "Familiar Customer" : this.getPersonName());
			this.visitThem();
		}
	};
	
	// On entering a church
	per.enterChurch = function(plc, s)
	{
		this.place = 46;
		return '<p style="text-align:center"><b>Elian Waits</b></p><p>' + (this.getCharmedLevel() == 4 ? this.showPersonRandom("endgame-servant.jpg", "20%", 'right;margin-bottom:1em', '', '', false, undefined, "string") : this.showPersonRandom("waiting", 2, "20%", 'right;margin-bottom:1em', '', '', false, undefined, "string")) +
				s + ', Elian leans against a wall outside of the church, and says,<br><br>"I will wait for you back at home"';
	};
	
	per.showEventPopup = function()
	{
		if (this.place > 1001) return false;
		if (sType == "dreamdemoncome") {
			this.setFlag(1);
			showPopupWindow("Demon of Your Dreams",
				this.addPersonString("dreamdemoncome.jpg", "height:max%", "right") +
				'Your dreams are heavily erotic, filled with the sensation of a woman\'s body hotly entwined with yours. At the end you see her clearly. the demonic woman you saw in a clairvoyant vision. Huskily she says,</p>' +
				'<p>"Come to me, to the <i>thin clearing</i> in darkness and <b>teleport</b> while thinking of my name, <b>Elian</b>"</p>' +
				'<p>Your dream fades as she embraces you again, leaving you with the feeling of hot, passionate lips and an almost irresistable desire to run to that place and be at her side, forever...<p>' +
				'<p>You wake sweating and aroused, certain that was not <i>just</i> a dream, it was a message and probably <b>very</b> dangerous!'
			);
			return true;
		}
		if (sType == "pactmorning") {
			// Wake the morning after forming the pact
			var perWith = findPerson(sWho);		// Who you went to bed with. Could be null (unlikely)
			var sWName = perWith != null ? perWith.getPersonNameShort() : "";
			showPopupWindow("Good Morning...",
				this.addPersonString("morning" + this.getSuffix() + ".jpg", "60%", "right") +
				'Drowsily you wake up ' + (sWName !== "" ? 'and reach to embrace ' + sWName : ' and look at the clock') + ' but instead you see Elian lying next to you ' + (this.getCharmedLevel() == 4 ? 'dressed in a maid uniform' : 'completely naked') + '. She smiles and says,</p>' +
				'<p>"Good morning ' + this.getYourNameFor() + '"...</p>',
				"dispPlace(Place,'type=" + (Place == 46 ? "elianbedroom&morning=true" : "pactmorning2&who=" + (perWith !== null ? perWith.uid : '')) + "')"
			);				
			setQueryParams('');
			return true;
		}
		if (sType == "pactmorning2") {
			// Wake the morning after forming the pact
			var perWith = findPerson(sWho);		// Who you went to bed with. Could be null (unlikely)
			var sWName = perWith != null ? perWith.getPersonNameShort() : "";
			if (isAtLocation(45)) {
				// Home either in your bed or another in your house
				this.place = 46;
				showPopupWindow("Good Morning...",
					this.addPersonString("morning2.jpg", "height:max%", "right") +
					'You sit up surprised and Elian stands up now completely naked and says "Today is the first day of our Pact, this is your bedroom and domain"' + (Place == 46 ? '' : '. You notice you are actually in your own bedroom!') + '</p>' +
					(sWName !== "" ? '</p><p>You see ' + sWName + ' sitting at the foot of the bed, looking a little confused.' : ''),
					"dispPlace(46,'type=elianbedroom&morning=true')"
				);				
			} else {
				// Another home
				this.place = 1001;		// To allow Tracy's phone call as well
				showPopupWindow("Good Morning...",
					this.addPersonString("morning2.jpg", "height:max%", "right") +
					'You sit up surprised and she stands up now completely naked and says,</p>' +
					'<p>"Today is the first day of our Pact. Normally I would offer you some \'attention\' but this is not your home."<p>' +
					'<p>She walks away from the bed, still nude, and says "I will meet you again, in your bedroom". With that you lose sight of her as she leaves the area.' +
					(sWName !== "" ? '</p><p>You see ' + sWName + ' sitting at the foot of the bed, looking a little confused. You decide it is not the time to explain about Elian, if ever!' : '')
				);
			}
			setQueryParams('');
			return true;
		}	
		if (this.place >= 1000) return "";
		
		if (sType == "dreampostpact1") {
			this.setFlag(31);
			showPopupWindow("Demon in Your Dreams",
				this.addPersonString("dream1.jpg", "60%", "right") +
				'Your dreams are confused, for a while you are doing something with Tracy, playing some game or the other, nothing very clear.</p>' +
				'<p>The dream changes like you just turn around and you clearly hear Elian, "Wrong person to dream about, what else is a succubus but the demon of your dreams..."</p>' +
				'<p>Yuo dream is heavily erotic, filled with Elian and no-one else.'
			);
			return true;
		}
		
		if (Place == 154 && isPersonHere("Mom") && !this.checkFlag(30) && this.isCharmedBy()) {
			// Meeting Mom
			var clv = this.getCharmedLevel();
			showPopupWindow("Mom meets Elian",
				per.addPersonString("momelian" + this.getSuffix(true) + ".jpg", "height:max%", "right") +
				(clv == 4 ?
					// Servant
					'When you enter Mom\'s bedroom you see she is with Elian and looking a little annoyed.' + (isDay() ? ' She is not in her usual clothes, possibly she was going to have a bath? ' : '') + 'She addresses you,</p>' +
					'<p>"Young ' + perYou.getManWoman() + '..."' + ' sounds like you are in trouble, "Why did you hire this maid without asking. You know our household finances are limited and between you, me and Tracy we get everything done"</p>' +
					'<p>You had been thinking about how to explain this but Elian replies instead "Ma\'am, your ' + (perYou.isMan() ? 'son' : 'daughter') + ' has bargained for my services and it will not cost the household anything" Mom looks suspiciously at you and asks "What bargain..". Elian politely interrupts or at least as politely as you can interrupt,</p>'  +
					'<p>"Sorry, we have a confidential deal, we cannot go into details. It is nothing ' + perYou.getHeShe() + ' cannot manage and will not harm anyone"</p>' +
					'<p>Mom asks some more questions but Elian evades directly answering and then Elian excuses herself and leaves the room. You try to reassure and calm Mom down and do more or less.</p>' +
					'<p>When you leave Mom\'s bedroom Elian is waiting with a smile and she says "She has been played with by another" and leaves'
				: (clv == 3 ?
					'When you enter Mom\'s bedroom you see she is with Elian, standing near a window partly clothed. Mom looks oddly at you and says a little distractedly,</p>' +
					'<p>"A new one ' + perYou.getPersonName() + ' and a cute one at that." You ask what is going on, and Elian answers,</p>' +
					'<p>"Just getting acquainted with your mother. She is very responsive, I mean responsible, she knows well how to play with people like me and has before". Mom seems to not be paying attention to her words but you see her expression change.</p>' +
					'<p>Mom adjusts her clothing so she is properly dressed and says, "Oh, hello ' + perYou.getPersonName() + ' what did you and Elian want?" and she has clearly forgotten what happened before, whatever that was. You say you were just popping in to say hello, and usher Elian out of the bedroom.'
				:
					'When you enter Mom\'s bedroom you see she is with Elian, standing near a window partly clothed. Mom looks oddly at you and says,</p>' +
					'<p>"I am a bot annoyed ' + perYou.getPersonName() + ' how could you marry Elian with out inviting me or Tracy?" You explain you are not <i>really</i> married to Elian, it is just a sort of game she likes to play. Elian smiles,</p>' +
					'<p>"Hardly My Love, I am your bride in all ways that matter" As she speak Mom\'s expression changes, you are unsure if she heard the last exchange or not.</p>' +
					'<p>Mom adjusts her clothing so she is properly dressed and says, "Oh, hello ' + perYou.getPersonName() + ' what did you and Elian want?" and she has clearly forgotten what happened before, whatever that was. You say you were just popping in to say hello, and usher Elian out of the bedroom.'
				))
			);				
			this.setFlag(30);
			return true;
		}
		
		if (Place == 46 && isPersonHere("Tess") && !this.checkFlag(43) && this.hoursCharmed() > 48 && this.isCharmedBy()) {
			// Tess and Elian
			var perTess = findPerson("Tess");
			showPopupWindow("Tess and Elian Arguing",
				perTess.addPersonString("tesselian1.jpg", "height:max%", "right") +
				'You hear what is almost an argument coming from your bedroom, and when you look in you see Tess looking upset and Elian pleased. You hear Tess say,</p>' +
				'<p>"YIt\'s not like that I love John but I also love ' + perYou.getPersonName() + '" and Elian replies,</p>' +
				'<p>Tess answers a little more hesitantly, "Well I suppose, but I love ' + perYou.getPersonName() + ' and ' + perYou.getHeShe() + ' loves me.". You feel touched by her declaration and a little guilty too. Elian is sort of right, but...</p>'  +
				'<p>Elian then cruelly says "Are you sure? Sure it is not you are a hot librarian ' + perYou.getHeShe() + ' fancied who had valuable knowledge of the occult so ' + perYou.getHeShe() + '\'seduced\' for sex and magic? A cheating slut ' + perYou.getHeShe() + ' took to use as ' + perYou.getHeShe() + ' wanted?""</p>' +
				'<p>That\'s it, Elian has gone too far and you step in and tell her,</p>' +
				'<p>W"Stop it Elian, you are bound to not harm anyone I care for." You know what Tess needs to hear and you continue "And I love Tess"</p>' +
				'<p>Tess smiles, she almost glows at your words. Elian just smiles and you realise this has just been a game for her, tormenting her rival as such. Also it seems she really has a thing for adultery! Elian excuses herself and leaves the room and you step over and embrace Tess.'
			);				
			this.setFlag(43);
			return true;
		}
		
		if ((Place == 122 || Place == 374 || Place == 154 || Place == 488) && this.place != -1 && this.getCharmedLevel() == 4 && !this.checkFlag(42) && !isPersonHere()) {
			// Cleaning
			this.setFlag(42);
			showPopupWindow("Elian Cleaning",
				this.addPersonString("cleaningc.jpg", "60%", "right") +
				'You see Elian is here, and she seems to be doing housework, dusting or something. You realise she is not so much cleaning as she is performing for you as she plays with her skirt and flashing her panties.</p>' +
				'<p>Well a demon servant playing as a maid, you did not really expect her to do the vacuuming after all!'
			);
			return true;
		}
		return false;
	};
	
	per.getDefences = function()
	{
		// Challenge 1
		// 43 gina necklace
		// 44 rosary
		// 46 pamela's bracelet
		// 48 relic
		// 49 holy water
		var ndef = perYou.checkFlag(18) && nMana > 19 ? 1 : 0;
		if (perYourBody.FindItem(43) > 0) {
			ndef++;
			if (this.checkFlag(23)) ndef++;
		}
		if (perYourBody.FindItem(44) > 0) ndef++;
		if (perYourBody.FindItem(46) > 0) {
			ndef++;
			if (this.checkFlag(24)) ndef++;
		}
		return ndef;
	};
	
	per.showDefencesWarning = function(no)
	{
		if (this.getDefences() >= no) return 'you are feeling confident in your defences.';
		return 'you wonder if you have enough to protect yourself from Elian\'s challenge, but surely you must?' + (isDemonBound() ? ' You do recall how you <b>tricked</b> Legion, maybe something similar could work here?' : '');
	};
	
	per.showDefences = function(no)
	{
		var dn = 0;
		var s = 'you can feel your defences activate, ';
		if (perYou.checkFlag(18) && nMana > 19) {
			s += 'a surge in your mana as you use your training to block her attack';
			dn++;
		}
		if (dn >= no) return s;
		if (perYourBody.FindItem(43) > 0) {
			s += (dn > 0 ? dn == (no - 1) ? ' and ' : ', ' : '') + 'the necklace feels hot';
			dn++;
		}
		if (dn >= no) return s;		
		if (perYourBody.FindItem(44) > 0) {
			s += (dn > 0 ? dn == (no - 1) ? ' and ' : ', ' : '') + 'Pamela\'s bracelet tingles';
			dn++;
		}
		if (dn >= no) return s;		
		if (perYourBody.FindItem(46) > 0) {
			s += (dn > 0 ? dn == (no - 1) ? ' and ' : ', ' : '') + 'the rosary stirs on its own';
			dn++;
		}
		return s;
	};
	
	per.showEventSleep = function(wt, plc, s, param)
	{
		if (!this.checkFlag(1) && checkPersonFlag("Glenvale", 67) && isSpellKnown("Teleport")) {
			var vamp = getPersonOther("Vampyre");
			if (vamp >= 60 || (vamp == -1 && isDemonGone())) {
				// Demon Elian 'Come to me'
				// Either once you meet the vampyre or if disabled then after Legion is gone
				WaitforForDayNight(s, plc, 'type=dreamdemoncome');
				return true;
			}
		}
		if (this.place == 1000) {
			// Morning after the pact
			WaitforForDayNight(s, plc, 'type=pactmorning');
			return true;
		}
		
		if (this.isCharmedBy() && !this.checkFlag(31)) {
			// Another morning. after the pact
			WaitforForDayNight(s, plc, 'type=dreampostpact1');
			return true;
		}			
		return false;
	};

	per.showEventLair = function()
	{
		var md;		
		var clv = this.getCharmedLevel();
		
		gameState.nRightBarState = 0;
		hideRightBar();		// Hide the inventory/spells sidebar always in her lair
		
		// Initial meetings
		if (sType == "elianteleportbad") {
			// Elian Demon Bad ending
			md = WritePlaceHeaderNIP(false, "", "black");
			perYou.charmThem(4, "Demon");
			nMana = 0;
			updateLeftBar();

			this.showPerson("ending-demonslave.jpg");

			addPlaceTitle(md, "Demon\'s Slave", '', 0, false, 'white');

			md.write(
				'<p>You appear somewhere in darkness, hot, cloying darkness. A feminine presence embraces you and kisses you passionately on your lips.</p>' +
				'<p>You feel a wave of magic wash over you, overpowering any and all of your defenses' +
				(getQueryParam("naile") == "true" ? ', despite using the trick Jade told you about. Then again maybe you do not have the right defenses' : '') +
				', the woman steps back and you clearly see her, your Mistress, your one and only purpose in life!</p>' +
				'<p>She whispers, "Now cum for me my slave, my thrall!"</p>' +
				'<p>Your mind, your will, your sanity is washes away in the cataclysmic orgasm that wracks your....your Mistresses thrall\'s body!</p>' +
				'<p>You are a demon\'s plaything, happily serving her every desire without thought, without will. Better luck next time...</p>'
			);

			addRestartLink(md);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "naileteleportok") {
			// Elian Demon Bad ending
			md = WritePlaceHeaderNIP(false, "", "black");
			this.setFlag(2);
			this.place = 282;
			this.showPerson("demondefended.jpg");
			this.dress = "Catherine";

			addPlaceTitle(md, "Demon\'s Slave, Almost...", '', 0, false, 'white');

			md.write(
				'<p>You appear somewhere in darkness, hot, cloying darkness. A feminine presence embraces you and kisses you passionately on your lips.</p>' +
				'<p>You feel a wave of magic wash over you, <b>almost</b> overpowering your defenses, the woman steps back and you clearly see her, your Mistress, no...the demon who called to you.</p>' +
				'<p>She whispers, "Now cum for me my slave, my thrall!"</p>' +
				'<p>You tell her <b>"No"</b> and ' + (nMana > 9 ? 'cast the charm spell on her. The spell does nothing, washing over her' : 'smile') + '.</p>' +
				'<p>She looks puzzled, ignoring you and starts checking some of the items near her, a rod, a skull and other things. Twice you feel a wave of magic and you realise she is trying to overpower you, failing each time.</p>' +
				'<p>She softly speaks, "So a ' + perYou.getWitch() + ' of some power. Having you as my helplessly ' + (perYou.isMaleSex() ? 'cumming' : 'orgasming') + ' slave-toy will be so much sweeter...Go from here, I will take you another way"</p>' +
				'<p>She gestures with her clawed hand...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'you disappear, leaving her presence', 141);
			WritePlaceFooter(md);
			return true;
		}	
		
		// The pact
		if (sType == "elianteleporttruename") {
			// Elian's Lair
			md = WritePlaceHeaderNIP(false, "", "black");
			this.setFlag(7);	// Set some pre-pact flags to prevent certain events, or at least change to post pact versions
			this.setFlag(6);
			
			this.showPerson("demon1a.jpg");

			addPlaceTitle(md, "Elian\'s Lair", '', 0, false, 'white');

			md.write(
				'<p>You appear back in that place you first met Elian feeling very uncertain in this unknown place. You see in the distance a figure, is it her, you think it is as it seems to be how you remember her from your first visit. She is pale with horns and wearing a striped leotard type of outfit.</p><p>'
			)
			if (sWho !== "") {
				var perWith = findPerson(sWho);
				md.write('You wonder where ' + perWith.getPersonNameShort() + ' is, ' + perWith.getHeShe() + ' should be by your side, but they are nowhere to be seen. You reach for your phone to call them');				
			} else md.write('You reach for your phone');
			md.write(
				' but you realise with little concern that you seem to be carrying nothing. You are clothed but that is all and you struggle to remember any spells! Your attention is so focused on Elian...</p>' +
				'<p>You realise that she is affecting your mind, either that or this place is influencing you. You shake your head and call out "ElianIscariotAgosOmiSayla! Enough of this"</p>' +
				'<p>Your head clears but still you feel \'different\' there is still some subtle influence happening. You take a step towards her and hear in the distance to your right a passionate moan. Elian gestures for you to approach.<p>' +
				'<p>It is difficult to do anything else than approach her, and you do not feel a strong need to do other, you are here to form the pact with Elian. Anyone else here is a complete unknown and probably very dangerous.</p>'
			);
			
			startQuestions();
			addLinkToPlaceC(md, 'approach Elian', 900, 'type=elianpact1&who=' + sWho);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "elianpact1") {
			// Elian's Lair - Pact 1
			md = WritePlaceHeaderNIP(false, "", "black");

			this.showPerson("demon3.jpg");

			addPlaceTitle(md, "Elian\'s Lair", '', 0, false, 'white');

			md.write(
				'<p>You walk towards Elian and it gets brighter and you see she is holding a lantern for some reason while smiling quite broadly. You start to ask her about your possessions'
			)
			if (sWho !== "") md.write(' and companion');
			md.write(
				' and she tells you lightly,</p>' +
				'<p>"This place is for me and my possessions, you are allowed here as soon I may be your possession. Even then no-one else may enter here and no unimportant things." She hesitates,</p>' +
				'<p>"Things of blood and violence are never welcome. Spirits or faerie-folk are also barred from here."<p/>' +
				'<p>You consider the pact you are about to make and she smiles "No matter what terms you ask and you may make me a <b>thrall in heart and body</b> my mind is my own and there are things I cannot or will not do. I will never touch or be touched by a thing of blood, a fae or a spirit."</p>' +
				(isCharmedBy("Vampyre") ? '<p>The phrase "heart and body, my mind is my own" sounds very familiar, and you remember Lilith said something very similar when you bound her to you.</p>' : '') +
				'<p>She gestures and starts walking. As you follow admiring her shapely figure, you notice the red sash or ribbon around her waist, the same she wore back in Glenvale in the club...</p>'
			);
			
			startQuestions();
			addLinkToPlaceC(md, 'follow Elian', 900, 'type=elianpact2');
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "elianpact2") {
			// Elian's Lair - Pact 2
			md = WritePlaceHeaderNIP();

			this.showPerson("twofaces.jpg");

			addPlaceTitle(md, "Elian\'s Lair");

			md.write(
				'<p>You suddenly emerge into a brightly lit room and blink a little as your eyes adjust. You see Elian has changed, she is human looking again but wearing little more than her ribbon, some boots, gloves and panties. She also looks a bit different her body is a little fuller, plumper but only a bit. Her face is a little different too...</p>' +
				'<p>...then you look in the mirror she is next to and in the mirror you see she is paler and has horns, like you saw her before but she is still dressed the same, no striped leotard. She speaks a little distantly, her smile and light demeanor gone,<p/>' +
				'<p>"You have met me as the cute young woman calling herself Rachael, and here as the demon ElianIscariotAgosOmiSayla. My body and face change according to the desires of those I am with and of my own fancy. No single appearance is my true form, all are and none are"</p>' +
				'<p>Well that explains...very little...but does account for her slight variations of appearance, you guess. ' +
				(isCharmedBy("Vampyre") ? ' You start to mention how Lilith had said something similar about hunting prey, and she interrupts "Things of blood are not for here and will not be touched on"' : 'You mention how Legion had varied parts her her form, but she interrupts "This is my place, banished ones have no standing here"') + '</p>' +
				'<p>She sits up and looks a bit happier, and says "It is time!" and the room is plunged into darkness....then you hear her say,</p>'
			);
			
			startQuestions();
			addLinkToPlaceC(md, '"What service do you want?"', 900, 'type=elianpact3');
			WritePlaceFooter(md);
			return true;		
		}		
		
		if (sType == "elianpact3") {
			// Elian's Lair - Pact 3
			md = WritePlaceHeaderNIP(false, "", "black");

			this.showPerson("ending-demonslave.jpg");

			addPlaceTitle(md, "The Pact", '', 0, false, 'white');

			md.write(
				'<p>"What service do you want?", her voice echoes in the darkness, you can see little other than her looking at you expectantly.</p>' +
				'<p>You have been thinking about this long and hard and long considered the options. You want to avoid the casual evil you saw with Kurndorf and his demon summoning and also remember the scorn you heard in Jade\'s voice when you asked her advice. You are reluctant to create more thralls as you saw Legion do, and as happened to Leanne.</p>' +
				'<p>No matter what else you command of Elian you will ensure protection from her for those you care for, or control, for your lovers, family and slaves.</p>' +
				'<p>Beyond this you had considered a few alternatives...<p/>' +
				'<p><b>Your devoted lover and slave</b> - have her love and protect you and be your perfect sexual partner. This is a safe option, Elian is clearly a being of seduction and desire, a succubus in the old terms, so she will be perfect in this role, and it is largely what you have been doing with the charm spell anyway.</p>' +
				'<p><b>Your demon servant</b> - have her as your companion and at your beck and call to seduce, corrupt or even entrall anyone you ask. This also seems to be her nature, but this has perils if you are not cautious. Also it seems <b>anyone</b> with the slightest magical ability can recognise a demon.<br>' +
					'&nbsp;&nbsp;&nbsp;&nbsp;<i>Game Note: there is limited content for this option, but there is some</i></p>' +
				'<p><b>Banish her</b> - there is one other alternative, just tell her to leave town and never return or bother you or yours ever again. This will banish her and you will <b>never</b> see her again.</p>' +
				'<p>As you think on this you can feel again the influences of the place, well of Elian herself most likely, and you get the impression that she <i>wants</i> something badly here, and it is related to the love-slave choice, it seemed to be what she was trying to make you into after all. Still, you can choose what you wish and she will be bound by your choice...' +
				(isCharmedBy("Vampyre") ? 'but no matter how you do this her antipathy to Lilith will cause problems...' : '') +	
				'</p><p>She looks at you expectantly, and you tell her "Protection for those who are mine and...</p>'
			);
			
			startQuestions();
			startAlternatives();
			addLinkToPlaceC(md, '"be my devoted lover and slave"', 900, 'type=elianpactlover');
			addLinkToPlaceC(md, '"be my servant seductress"', 900, 'type=elianpactservant');
			addLinkToPlaceC(md, '"just leave town and never return"', 900, 'type=elianpactleave');
			endAlternatives();
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "elianpactleave") {
			// Elian's Lair - Pact - but just leave
			md = WritePlaceHeaderNIP();

			this.showPerson("pact-leave.jpg");
			this.place = 9999;		// She leaves
			this.unCharmThem();

			addPlaceTitle(md, "Elian Leaves");

			md.write(
				'<p>You tell Elian you wish to end your dealings with her and just ask her to leave you alone and not return to Glenvale. She looks at you with clear disappointment,</p>' +
				'<p>"Freedom is your desire then, a lonely freedom without passion. That is your right but you will regret it, as I do"</p>' +
				'<p>She turns her back to you and shakes her head. Suddenly there is a bright flash...</p>'
			);
			
			startQuestions();
			addLinkToPlaceC(md, 'you disappear from her presence', 44, '', 'and appear just outside your home!');
			WritePlaceFooter(md);
			return true;		
		}	
		
		if (sType == "elianpactlover") {
			// Elian's Lair - Pact - Lover
			md = WritePlaceHeaderNIP();

			this.showPerson("pact-lover1.jpg");
			this.charmThem(2);		// Lover charm (not actually a charm but near enough)

			addPlaceTitle(md, "Elian Your Love-Slave");

			md.write(
				'<p>You tell that you want her to take no action against the other people you care for or control and that she will now be your devoted love-slave. She will love and protect you and be your perfect sexual partner.</p>' +
				'<p>She looks quite pleased and stands in a cute, coy sort of manner. "I promise you my <b>heart and body</b>, to love and obey" She pauses for a moment and you are just about to ask about her price for the pact but instead she continues,</p>' +
				'<p>"For the duration of the pact" and continues a little more softly <i>"until death do we part"</i>. You hesitate for a moment and she says clearly,</p>' +
				'<p>"Do you agree to the term, I will answer with my price"</p>' +
				'<p>Did she mean <b>terms</b> or did she mean the duration of the pact....</p>'
			);
			
			startQuestions("You tell her");
			startAlternatives();
			addLinkToPlaceC(md, '"<i>I do</i> agree to the <b>terms</b>"', 900, 'type=elianpactlover2b');
			addLinkToPlaceC(md, '"Did you mean <b>term</b>?"', 900, 'type=elianpactlover2a');
			endAlternatives();
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "elianpactlover2a") {
			// Elian's Lair - Pact - Lover - Love Slave
			md = WritePlaceHeaderNIP(false, "", "black");

			this.showPerson("Catherine!pact-lover2a.jpg");

			addPlaceTitle(md, "Elian the Love-Slave", '', 0, false, 'white');

			md.write(
				'<p>Elian smiles but you get a hint of something, disappointment maybe, and she tells you,</p>' +
				'<p>"Then I will be you perfect lover and slave, passionately devoted to your pleasure. As this follows my nature my price is a hand-full of mana every day at dawn."</p>' +
				'<p>That seems a minor cost, a mere 5 mana per day, but then she continues,</p>' +
				'<p>"If you fail to deliver the mana the pact will be over and I will leave. I will take with me as payment one of your thralls to become mine for a long as I desire...and my desires know no bounds"</p>' +
				'<p>Oh that is the catch, and a rather steep one at that. She looks at you and asks "Do you agree?"</p>' +
				'<p>There seems little reason to refuse, 5 mana is easy to acquire per day and you agree. She leans in and kisses you passionately but briefly. She pulls back and says,</p>' +
				'<p>"This place is now yours, visit here anytime you like, from anywhere, I will always be here for you, and you may use any of my playthings. If you wish to end the pact then it must be done here."</p>' +
				'<p>Playthings? Before you can ask she says, "Now we must consummate the pact..."</p>'
			);
			
			startQuestions();
			addLinkToPlaceC(md, 'consummate the pact', Place, 'type=elianpactconsumate');
			WritePlaceFooter(md);
			return true;		
		}	
		
		if (sType == "elianpactlover2b") {
			// Elian's Lair - Pact - Lover - Demon Bride
			md = WritePlaceHeaderNIP();

			this.showPerson("Catherine!pact-lover2b.jpg");
			this.charmThem(3);		// Demon-bride charm (not actually a charm but near enough)

			addPlaceTitle(md, "Elian Your Demon Bride");

			md.write(
				'<p>Elian looks delighted, and there is a flash of light and you see her sitting wearing little more than her ribbon tied around her body and what looks like a <b>wedding</b> veil. She says,</p>' +
				'<p>"I do as well, I am yours and you are mine <b>until death do we part</b>. I will honour and obey as your pact bound demon bride"</p>' +
				'<p>What, that is not what you meant or planned for, <b>pact bound demon bride</b> this means something like a <i>wedding contract</i> but Elian is a demon and you barely know what that actually means. Before you say anything she continues,</p>' +
				'<p>"For this the price is simple, 1 mana per day and some time I will bear your children' + (!perYou.isMaleSex() ? ', it does not matter your gender, that can be altered as needed' : '') + '. I called you to me seeking a person of magical power to feed on and become my plaything. Instead you have shown your power and bound me, proving your worth. Our children will be beings to be reckoned with in your world or mine."</p>' +
				'<p>You suppose you could back out of this, but there seems no option now other than to banish her if you do not want to go through with this.</p>' +
				'<p>Before you can say anything she leans in and kisses you passionately but briefly. She pulls back and says,</p>' +
				'<p>"This place is now yours, visit here anytime you like, from anywhere, I will always be here for you, and you may use any of my playthings."</p>' +
				'<p>Playthings? Before you can ask she says, "Now we must consummate our pact..."</p>'
			);
			
			startQuestions();
			startAlternatives(md);
			addLinkToPlaceC(md, 'hesitate, but consummate the pact', Place, 'type=elianpactconsumate');
			addLinkToPlaceC(md, '"No, I can\'t do this, please just leave town and never return"', 900, 'type=elianpactleave');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "elianpactconsumate") {
			// Elian's Lair - Pact - Lover - Consumate
			md = WritePlaceHeaderNIP();
			this.place = 1000;		// Out and about for a bit

			if (this.getCharmedLevel() != 3) this.showPersonRandom("Succubus!consumate", 2);
			else this.showPersonRandom("Catherine!consumate", 2);

			addPlaceTitle(md, "Consummating the Pact");

			if (this.getCharmedLevel() == 3) {
				// Demon bride
				md.write(
					'<p>You hesitate, while you try not to think of Elian as your <b>demonic wife</b> and this is consummating your marriage, it is difficult to not think of it that way.</p>' +
					'<p>Elian leans towards you, and you just know what she wants, and you sensually undress her of what little she is wearing, even her ribbon. You pause for a moment, you realise you are following her influence, her desires, and if you continue this way you will just become a version of her slave. You focus and take back control, aware of her influence but you are in charge again. You <b>tell</b> her to now undress you and you see her smile and say "Yes ' + this.getYourNameFor() + '"</p>' +
					'<p>You embrace and quickly start to get lost in the passion and feelings of your demon lover. You do your best to keep some semblance of control but it is so difficult and you really do not want to! Still she is bound to you, she is your demon not visa-versa!</p>' +
					'<p>As you lay next to her later, it is difficult to remember anything other than the extreme pleasure you felt in her arms. She looks at you,</p>' +
					(perYou.isMaleSex() ? '"We can also explore your feminine side sometime" and you see she is slowly stroking a large cock, her cock that is.' :
												 '"We will have to experience you masculine side to fulfill the pact sometime" and you feel her reach done and start to stroke <b>your cock</b>...what...cock.') +
					' She smiles and the cock is gone and she is lying at your side.</p>'
				);
			} else {
				// Lover
				md.write(
					'<p>You chose her to be your love-slave so this is what you asked for and you lean towards Elian and you just know what she wants. You sensually undress her of what little she is wearing, even her ribbon. You pause for a moment, you realise you are following her influence, her desires, and if you continue this way you will just become a version of her slave. You focus and take back control, aware of her influence but you are in charge again. You <b>tell</b> her to now undress you and you see her smile and say "Yes ' + this.getYourNameFor() + '"</p>' +
					'<p>You embrace and quickly start to get lost in the passion and feelings of your demon lover. You do your best to keep some semblance of control but it is so difficult and you really do not want to! Still she is bound to you, she is your demon not visa-versa!</p>' +
					'<p>As you lay next to her later, it is difficult to remember anything other than the extreme pleasure you felt in her arms. She looks at you,</p>' +
					(perYou.isMaleSex() ? '"We can also explore your feminine side sometime" and you see she is slowly stroking a large cock, her cock that is.' :
												 '"We can also experience you masculine side sometime" and you feel her reach down and start to stroke <b>your cock</b>...what...umm...cock.') +
					' She smiles and the cock is gone and she is lying at your side.</p>'
				);
			}
			md.write(
				'<p>She says, "The pact will start at dawn and the price is paid. I will join you at that time or you may return here as you wish ' + this.getYourNameFor() + '"</p>' +
				'<p>There is a bright flash...</p>'
			);
			
			startQuestions();
			addLinkToPlaceC(md, 'you disappear from her presence', 44, '', 'and appear just outside your home!');
			WritePlaceFooter(md);
			return true;		
		}			
		
		if (sType == "elianpactservant") {
			// Elian's Lair - Pact - Servant
			md = WritePlaceHeaderNIP();

			this.showPerson("Catherine!pact-servant1.jpg");
			this.charmThem(4);		// Servant charm (not actually a charm but near enough)
			this.place = 1000;

			addPlaceTitle(md, "Elian Your Servant");

			md.write(
				'<p>You tell that you want her to take no action against the other people you care for or control and that she will now be your devoted servant. She will seduce anyone you ask and protect you for any threat. be your perfect servant and partner.</p>' +
				'<p>She smiles but you get the definite impression she is disappointed, but this is your decision after all, not hers. There is again a shift and she looks different, she is dressed in a stylised maid uniform and is standing in a sort of grand house or mansion. She answers,</p>' +
				'<p>"Then, ' + perYou.getMaster() + ' I will be you perfect slave-servant devoted to you and willing to do <i>anything</i> you order. My price for this is a moderate amount of mana every day at dawn, the amount used to enslave a normal person."</p>' +
				'<p>She continues "I will warn you this once, I can seduce and enslave people at your order, but they are <b>my</b> slaves, not yours. They will be yours to enjoy for the duration of the pact, but not afterwards"</p>' +
				'<p>That seems an acceptable cost, 10 mana per day, but on the enslavement this is something to be careful about. As you consider this she continues,</p>' +
				'<p>"If you fail to deliver the mana the pact will be over and I will leave. I will take with me as payment one of your thralls to become mine for a long as I desire...and my desires know no bounds"</p>' +
				'<p>Oh that is the catch, and a rather steep one at that. She looks at you and asks "Do you agree?"</p>' +
				'<p>There seems little reason to refuse, 10 mana can be done and you agree. She kneels down and seductively kisses your hand. She stands and says,</p>' +
				'<p>"This place is now yours ' + perYou.getMaster() + ', visit here anytime you like, from anywhere, I will always be here for you, and you may use any of my playthings. If you wish to end the pact then it must be done here."</p>' +
				'<p>Playthings? Before you can ask she says, "The pact will start at dawn and the price is paid. I will join you at that time or you may return here as you wish ' + perYou.getMaster() + '"</p>' +
				'<p>There is a bright flash...</p>'
			);
			
			startQuestions();
			addLinkToPlaceC(md, 'you disappear from her presence', 44, '', 'and appear just outside your home!');
			WritePlaceFooter(md);
			return true;		
		}	
		
		// Later visits
		if (sType == "elianteleportvisit") {
			// Teleport to visit her
			md = WritePlaceHeaderNIP();
			this.showPersonRandom("visit", 2);
			addPlaceTitle(md, "Visiting Elian in Her Lair");

			md.write(
				'<p>You appear back in that place you formed the pact with Elian. You see she is in her succubus form, lying down ready for your desires here in this unknown place.</p>' +
				'<p>She lies there waiting for you, wearing little other than her red ribbon.</p>'
			);
			if (!this.checkFlag(32)) {
				md.write(
					'<p>She greets you, "Welcome ' + this.getYourNameFor() + ' to my domain, everything and everyone here is yours. My heart and body is yours to command. I will alter this place, myself and yourself as is needed for your desires and mine."</p>'
				);
				this.setFlag(32);
			}
			
			startQuestions();
			// Sex
			addLinkToPlaceC(md, 'have her satisfy your desires with her lips', Place, 'type=elianvisitbj');
			if (perYourBody.FindItem(45) > 0 && !perYou.isMaleSex()) addLinkToPlaceC(md, 'have her satisfy your desires with your strap-on', Place, 'type=elianvisitstrapon');
			addLinkToPlaceC(md, 'have her satisfy your desires with her breasts', Place, 'type=elianvisittitfuck');
			addLinkToPlaceC(md, 'have her satisfy your desires with her body', Place, 'type=elianvisitfuck');
			if (this.checkFlag(38) && !this.isMaleSex()) addLinkToPlaceC(md, 'have her satisfy your desires with her body and your cock', Place, 'type=elianvisitfuck&futa=true');
			if (this.checkFlag(35)) addLinkToPlaceC(md, 'use her playthings', Place, 'type=elianvisitplaythings');
			// Talking
			addLinkToPlaceC(md, 'ask her about herself and this place', Place, 'type=elianvisitquestions');
			if (!this.checkFlag(36)) addLinkToPlaceC(md, 'tell her you wish to end the pact', Place, 'type=elianvisitendpact');
			// Leaving
			if (this.getTeleportFrom() != 46) addLinkToPlaceO(md, 'tell her it is time for you to leave', this.getTeleportFrom(), '', 'there is a flash of light and you appear in the same place you teleported from earlier!');
			addLinkToPlaceO(md, 'tell her it is time for you to go home', 46, '', 'there is a flash of light and you appear in your bedroom!');
			
			WritePlaceFooter(md);
			return true;				
		}
				
		if (sType == "elianvisitbj") {
			// Teleport to visit - Oral sex
			md = WritePlaceHeaderNIP();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("visit-bjb", isExplicit() ? 2 : 1);
			else this.showPersonRandom("visit-bjg", 3);
			addPlaceTitle(md, "Elian\'s Lips");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Elian give you a blowjob</p>'
				);
			} else {
				md.write(
					'<p>Elian licks your pussy</p>'
				);				
			}
			
			startQuestions();
			addLinkToPlaceC(md, 'talk more to Elian', Place, 'type=elianteleportvisit');
			WritePlaceFooter(md);
			return true;				
		}			
		
		if (sType == "elianvisitstrapon") {
			// Teleport to visit - Strap-On
			md = WritePlaceHeaderNIP();
			this.showPersonRandomX("visit-strapon", 2);
			addPlaceTitle(md, "Elian and your Strap-On");

			md.write(
				'<p>You fuxk Elian with your strap-on</p>'
			);				
			
			startQuestions();
			addLinkToPlaceC(md, 'talk more to Elian', Place, 'type=elianteleportvisit');
			WritePlaceFooter(md);
			return true;				
		}	
		
		if (sType == "elianvisittitfuck") {
			// Teleport to visit - Tit-fuck
			// NOTE: female players will gain a cock for the scene
			md = WritePlaceHeaderNIP();
			if (isExplicit()) this.showPersonRandomX("Catherine!home-tf", 4);
			else this.showPersonRandom("visit-tf", 2);
			addPlaceTitle(md, "Elian's Breasts");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>You fuck your demon\'s tits</p>'
				);					
			} else if (!this.checkFlag(40)) {
				this.setFlag(40);
				md.write(
					'<p>Elian smiles and says,</p>' +
					'<p>"You need something more to properly play with my breasts". You were about to grope and lick them' + (perYourBody.FindItem(45) > 0 ? ' and maybe use your strap-on between them' : '') + ' and start to explain, but she continues,</p>' +
					'<p>"You know my abilities, let me help you properly play with my breasts" and you see her usually modest breast grow a cup size or two, maybe more. You think that is it, but then you feel a sensation in your groin, and you see a large cock grow from the top of your pussy. A large and very hard cock.</p>' +
					'<p>Elian says nothing more as she takes your cock between her breasts doing all the work for you to fuck her tits, or more masturbate your cock with her tits! Quite rapidly an urgent feeling builds in your cock and suddenly you cum, spraying your load over her breasts.</p>' +
					'<p>Elian smiles and you see her breasts are back to their normal size and she comments "That is how it is done!"</p>'
				);
			} else {
				md.write(
					'<p>Elian smiles and says,</p>' +
					'<p>"Let me help you properly play with my breasts" and you see her usually modest breast grow a cup size or two, maybe more. Then you feel that sensation in your groin, and a large cock grows from the top of your pussy. A large and very hard cock.</p>' +
					'<p>Elian says nothing more as she takes your cock between her breasts doing all the work for you to fuck her tits, or more masturbate your cock with her tits! Quite rapidly an urgent feeling builds in your cock and suddenly you cum, spraying your load over her breasts.</p>' +
					'<p>Elian smiles and you see her breasts are back to their normal size.</p>'
				);				
			}
			startQuestions();
			addLinkToPlaceC(md, 'talk more to Elian', Place, 'type=elianteleportvisit');
			WritePlaceFooter(md);
			return true;				
		}	
		
		if (sType == "elianvisitfuck") {
			// Teleport to visit - Fuck
			// NOTE: female players MAY gain a cock for the scene. Guaranteed at least once for demon bride
			md = WritePlaceHeaderNIP();
			var bFuta = getQueryParam("futa") == "true"
			if (bFuta) this.showPersonRandomRorX("visit-fuckf", 1);
			else this.showPersonRandomRorX("visit-fuck", 2);
			addPlaceTitle(md, "Fucking Elian");

			if (bFuta) {
				if (this.checkFlag(38)) {
					if (clv == 3) {
						md.write(
							'<p>The memory of the first time you fucked Elian with your cock is very clear, and you feel compelled to repeat it. Elian seems to know your desire, she is a succubus after all. You feel the cock growing again from your groin, less urgent than that first time but still hard and full of desire.</p>' +
							'<p>Once again you fuck the hot demon, to pay her price, but mostly because of the amazing feeling of fucking her.</p>'
						);
					} else {
						md.write(
							'<p>The memory of the first time you fucked Elian with your cock is very clear, and you feel compelled to repeat it. Elian seems to know your desire, she is a succubus after all. You feel the cock growing again from your groin, less urgent than that first time but still hard and full of desire.</p>' +
							'<p>Once again you fuck the hot demon, because of the amazing feeling of fucking her.</p>'
						);
					}
				} else {
					if (clv == 3) {
						md.write(
							'<p>You intend to do some general love making, a bit of kissing, licking maybe some tribbing, but as you lean towards Elian she smiles,</p>' +
							'<p>"So it is time to start paying my price!" and you feel an intense urgent feeling in your groin. It intensifies and suddenly a large, hard cock erupts from above your pussy. You feel from it an intense arousal and as you look down at it Elian says,</p>' +
							'<p>"How else were you going to father a child with me?". You see her clothing is gone and she lies back spreading her legs ready for you. There is no point in stopping now, you have to pay her price and you feel an intense desire to sink your cock into her and fuck her senseless!</p>' +
							'<p>You lie on her and Elian guides your cock into her hot wetness and you start to fuck her. It is difficult to hold back, and you hear her whisper "Don\'t hold back". You urgently fuck her, with little skill, yet, and filled with urgent passion. Quite quickly you feel it building in you and you head Elian cry out in passion. That is the last straw and you powerfully cum as Elian pulls you in, make sure you cum deeply into her.</p>' +
							'<p>After Elian whispers, "Like mortal women there is no guarantee the price is paid, we will have to repeat that <b>often</b>" She is a succubus after all!</p>'
						);						
					} else {
						md.write(
							'<p>You intend to do some general love making, a bit of kissing, licking maybe some tribbing, but as you lean towards Elian she smiles,</p>' +
							'<p>"Certainly, I will use my abilities so we may do this properly" and you feel an intense urgent feeling in your groin. It intensifies and suddenly a large, hard cock erupts from above your pussy. You feel from it an intense arousal and as you look down at it Elian says,</p>' +
							'<p>"How else did you plan to fuck a succubus?". You see her clothing is gone and she lies back spreading her legs ready for you. There is no point in stopping now, you have to pay her price and you feel an intense desire to sink your cock into her and fuck her senseless!</p>' +
							'<p>You lie on her and Elian guides your cock into her hot wetness and you start to fuck her. It is difficult to hold back, and you hear her whisper "Don\'t hold back". You urgently fuck her, with little skill, yet, and filled with urgent passion. Quite quickly you feel it building in you and you head Elian cry out in passion. That is the last straw and you powerfully cum as Elian pulls you in, make sure you cum deeply into her.</p>'
						);							
					}
				}
				this.setFlag(38);
			} else if (perYou.isMaleSex()) {
				md.write(
					'<p>You fuck your hot demon</p>'
				);								
			} else {
				md.write(
					'<p>You explore your hot demon\'s body and she does the same to yours.</p>'
				);				
			}
			startQuestions();
			addLinkToPlaceC(md, 'talk more to Elian', Place, 'type=elianteleportvisit');
			WritePlaceFooter(md);
			return true;				
		}			
		
		if (sType == "elianvisitquestions") {
			// Q&A
			md = WritePlaceHeaderNIP();
			this.showPerson("visit-questions.jpg");
			addPlaceTitle(md, "Lessons in Demonology (sort of)");

			md.write(
				'<p>You tell Elian you wish to talk for a while to understand her and this place. There is a flash if light and you are back in that mirrored room you where in with her when you formed the pact. She is more or less in her human form again but in the mirror her reflection is her demon self.</p>'
			);
			
			startQuestions();
			if (!this.checkFlag(33)) {
				addPopupLinkC(md, '"Tell me about demons"', "Demonology",
					this.addPersonString("visit-talka.jpg", "height:max%", "right") +
					'You ask Elian about demons, after all you only really understand them from the occult books you have read and what little Jade has talked about. You doubt they fit into the various religious frameworks you understand, Elian does not seem to be any sort of fallen angel in the service of Satan, or a Djinn terrorising the world.</p>' +
					'<p>Elian smiles as she stands up, almost completely naked now, "I am as you see before you, anything more is not for me to teach you. We do not instruct in how to manipulate us"<p>' +
					'<p>You try to ask more about who she serves and all she says is <b>you</b> and then says "I will not tell you more, study and learn else where on demons, talk to me and learn from me to understand <b>me</b>"',
					false, 'setPersonFlag("Elian",33);dispPlace(Place,"type=elianvisitquestions")'
				);
			} else {
				if (!this.checkFlag(37)) {
					addPopupLinkC(md, 'ask about her age', "Elian's Age",
						this.addPersonString("visit-talka.jpg", "height:max%", "right") +
						'You try another approach on the nature of demons and ask Elian how old she is and when is her birthday, a normal enough question but trying to see if she is an ancient immortal being for instance. She smiles,' +
						'<p>"You know it is not polite to ask a lady her age!" and she laughs pleasantly. She then looks a but more serious and continues,</p>' +
						'<p>"These concepts are very different, but to answer the question you did not ask, I am not mortal. Death has no meaning to me, and I will not tell you how long I have existed for"' +
						(clv == 3 ? '</p><p>You ask about the pact duration "until death do we part" and she smiles and just says "My love I will be with you always". You do not quite know what to take that to mean...' : ''),
						false, 'setPersonFlag("Elian",37);dispPlace(Place,"type=elianvisitquestions")'
					);
				}
				if (!this.checkFlag(34)) {
					addPopupLinkC(md, '"What is this place?"', "Elian's Lair",
						this.addPersonString("visit-talkb.jpg", "height:max%", "right") +
						'You ask Elian about this place you are in, and it suddenly gets dark as she smiles,' +
						'<p>"This is my domain, the place of my heart and soul, it belongs nowhere, it is not \'hell\' or any other place you would understand. I have complete control over it and all who are here. As long as I exist it will exist"</p>' +
						'<p>Not exactly the answer you hoped for but it seems it is not the underworld, or even necessarily out of the normal world. You ask about the \'thin places\' that things come from in the Sacred Clearing at night and if this is one of those places. She shakes her head but says nothing more.',
						true, 'setPersonFlag("Elian",34);dispPlace(Place,"type=elianvisitquestions")'
					);
				}
			}
			if (!this.checkFlag(35)) addLinkToPlaceC(md, 'ask about her playthings', Place, 'type=elianvisitplaythingsstart');
			addLinkToPlaceC(md, 'enough talk for now', Place, 'type=elianteleportvisit');
			WritePlaceFooter(md);
			return true;				
		}	
		
		if (sType == "elianvisitendpact") {
			// Ending the pact
			md = WritePlaceHeaderNIP();
			if (clv == 3) {
				this.setFlag(36);
				this.showPerson("endpact2.jpg");
				addPlaceTitle(md, "Ending the Pact");
				md.write(
					'<p>You tell Elian you wish to end the pact now, but before you can say anything else there is a bright flash and she is sitting before you in her bridal wear you say previously. She laughs,</p>' +
					'<p>"I told you the pact is until death do we part. There are no divorces for your demon bride, is it not possible, and why would you want to!", and she laughs again, with humour but you suspect some degree of mocking. It would seem you have no way out...</p>'
				);		
				startQuestions();	
				addLinkToPlaceC(md, 'there is nothing more you can say on this', Place, 'type=elianteleportvisit');
				
			} else {
				this.showPerson("endpact1.jpg");
				addPlaceTitle(md, "Ending the Pact");

				md.write(
					'<p>You tell Elian you wish to end the pact now, and she stands, wearing very little, saying nothing but posed as if to say "and lose all of this?"</p>' +
					'<p>She asks "Are you certain ' + perYou.getMaster() + '?"</p>' +
					'<p>There is no way back if you tell her you are.</p>'
				);
				
				startQuestions();
				addLinkToPlaceC(md, '"Yes, I am sure"', Place, 'type=elianpactleave');
				addLinkToPlaceC(md, '"No, we will continue with the pact"', Place, 'type=elianteleportvisit');
			}
			WritePlaceFooter(md);
			return true;				
		}	
		
		if (sType == "elianvisitplaythingsstart") {
			// Playthings - Initial
			md = WritePlaceHeaderNIP();			
			this.setFlag(35);
			this.showPerson("!plaything1a.jpg");
			addPlaceTitle(md, "Elian\'s Playthings");
			md.write(
				'<p>Elian leads you to a darkly lit chamber organised as a sort of dungeon. You see two wonem tightly bound and gagged, one with a ring-gag, one with some sort of panel gag. The second is also blindfolded. You order Elian to tell you who these are and to free them. Elian smiles,</p>' +
				'<p>"These slaves I took long ago, they had some magical power. She gestures to the first, this one tried to bind me to her service but I won the contest and she is mine to use as I like."</p>' +
				'<p>She gestures at the second, "This one was a witch of some power, and I met her while seeking another. She was an adulterous slut and when she attacked me it was easy to use this against her and take her as my slut"</p>' +
				'<p>Elian fondly caresses the ass of the first slave, and the tells you,</p>' +
				'<p>"I told you when we formed the pact there are things I will not or cannot do. It is not my nature to free slaves. It would be pointless anyway, I have been carefully shaping their bodies and minds over the many, many years. Their will is mine, and their only desire is to be used by me. As we are pact bound now they will also desire to satisfy you however you wish <b>but</b> they are mine and mine alone"</p>' +
				'<p>You consider her words and decide to think on this before returning here.</p>'
			);		
			startQuestions();
			addLinkToPlaceC(md, 'leave Elian\'s playthings', Place, 'type=elianteleportvisit');
			AddPeopleColumnMed(md);
			this.showPerson("!plaything2a.jpg");
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "elianvisitplaythings") {
			// Playthings
			md = WritePlaceHeaderNIP();			
			this.showPerson("!plaything1a.jpg");
			addPlaceTitle(md, "Elian\'s Playthings");
			md.write(
				'<p>Elian leads you to a darkly lit chamber organised as a sort of dungeon. You see two wonem tightly bound and gagged, one with a ring-gag, one with some sort of panel gag. The second is also blindfolder. You order Elian to tell you who these are and to free them. Elian smiles,</p>' +
				'<p>"These slaves I took long ago, they had some magical power. She gestures to the first, this one tried to bind me to her service but I won the contest and she is mine to use as I like."</p>' +
				'<p>She gestures at the second, "This one was a witch of some power, and I met her while seeking another. She was an adulterous slut and when she attacked me it was easy to use this against her and take her as my slut"</p>' +
				'<p>Elian fondly caresses the ass of the first slave, and the tells you,</p>' +
				'<p>"I told you when we formed the pact there are things I will not or cannot do. It is not my nature to free slaves. It would be pointless anyway, I have been carefully shaping their bodies and minds over the many, many years. Their will is mine, and their only desire is to be used by me. As we are pact bound now they will also desire to satisfy you however you wish <b>but</b> they are mine and mine alone"</p>' +
				'<p>You command her to free them, possibly with the idea of them becoming your slaves, but Elian answers "Again they are mine and this is not my nature." She steps over to the first slave and removes her gag and asks "Slave, what do you want", and the slave answers, "What do you want Mistress?". You ask her what is her name, and she looks at you. Elian answers, "I doubt she knows anymore, I certainly do not"</p>' + 
				'<p>She replaces the slaves gag and continues, "If you want, you may play with me here as well" and she leans on a bench that she can clearly be tied onto. You consider her words and decide to think on this before returning here.</p>'
			);		
			startQuestions();
			addLinkToPlaceC(md, 'play with the first slave', Place, 'type=eliansplaything1');
			addLinkToPlaceC(md, 'play with the seocnd slave', Place, 'type=eliansplaything2');
			addLinkToPlaceC(md, 'play with Elian', Place, 'type=elianplaything');			
			addLinkToPlaceC(md, 'leave Elian\'s playthings', Place, 'type=elianteleportvisit');
			AddPeopleColumnMed(md);
			this.showPerson("!plaything2a.jpg");
			WritePlaceFooter(md);
			return true;				
		}	
		
		if (sType == "eliansplaything1") {
			// Plaything 1
			md = WritePlaceHeaderNIP();			
			this.showPersonAnon("!plaything1b.jpg");
			addPlaceTitle(md, "Elian\'s Plaything");
			md.write(
				'<p>You approach the first woman, you are reluctant to just think of her as "Elian\'s Plaything" but you know little of her aside from having once challenged Elian. Was she a demonologist, or a person like you who learned some magic?</p>' +
				'<p>You remove her gag and try asking but she does not answer, just wanting to know how she can please you. You give up asking and give her what she wants, or at least Elian has trained and shaped her to be, a sex-toy.</p>'
			);		
			startQuestions();			
			addLinkToPlaceC(md, 'leave Elian\'s playthings', Place, 'type=elianteleportvisit');
			WritePlaceFooter(md);
			return true;				
		}	
		if (sType == "eliansplaything2") {
			// Plaything 2
			md = WritePlaceHeaderNIP();			
			this.showPersonAnon("!plaything2b.jpg");
			addPlaceTitle(md, "Elian Your Plaything");
			md.write(
				'<p>You tell Elian you wish to play with her, not the women here and a moment later she is tightly boud, ass raised ready to be spanked or fucked!</p>'
			);		
			startQuestions();			
			addLinkToPlaceC(md, 'later leave the dungeon area', Place, 'type=elianteleportvisit');
			WritePlaceFooter(md);
			return true;				
		}	
		if (sType == "elianplaything") {
			// Plaything 2
			md = WritePlaceHeaderNIP();			
			this.showPersonRandom("bondageplay", 1);
			addPlaceTitle(md, "Elian\'s Plaything");
			md.write(
				'<p>You approach the second woman, you are reluctant to just think of her as "Elian\'s Plaything" but you know little of her aside from she is a witch who was apparently an adulterer. You wonder why that sin was something Elian could manipulate?</p>' +
				'<p>You remove her gag and blindfold and try asking but she does not answer, just wanting to know how she can please you. You give up asking and give her what she wants, or at least Elian has trained and shaped her to be, a sex-toy.</p>'
			);		
			startQuestions();			
			addLinkToPlaceC(md, 'leave Elian\'s playthings', Place, 'type=elianteleportvisit');
			WritePlaceFooter(md);
			return true;				
		}			
		
		return false;
	};
	
	per.showEventHome = function()
	{
		var md, nm, perVamp;
		var clv = this.getCharmedLevel();
		
		if (Place == 40) {
			// Shower scenes
			if (sType == "showerelian") {
				md = WritePlaceHeader();
				this.showPersonRandom("bath", 3);
				addPlaceTitle(md, "Company in your Bath");
				if (this.isCharmedBy()) {
					md.write(
						'<p>You decide to run a bath and relax and when you step into the bathroom you see a bath has already been run and Elian is once more waiting there for you, she smiles,</p>' +
						'<p>"Some personal service for the one who bound me, join me?"</p>' +
						'<p>Taking a hot bath with a hot demon bound to you does sound rather tempting...so of course you do!</p>'						
					);	
				} else if (this.checkFlag(25)) {
					md.write(
						'<p>You decide to run a bath and relax and when you step into the bathroom you see a bath has already been run and Elian is once more waiting there for you, she smiles,</p>' +
						(this.checkFlag(18) ? '<p>"Some personal service for the one who beat me, join me?"</p>' : '<p>"A truce for now, even I need a bath after all. Join me?"</p>') +
						'<p>No matter what, you need to be careful around her but taking a hot bath with a hot demon does sound rather tempting...so of course you do!</p>'						
					);					
				} else {
					md.write(
						'<p>You decide to run a bath and relax and when you step into the bathroom you see a bath has already been run and Elian is waiting there for you, she smiles,</p>' +
						(this.checkFlag(18) ? '<p>"Some personal service for the one who beat me, join me?"</p>' : '<p>"A truce for now, even I need a bath after all. Join me?"</p>') +
						'<p>No matter what, you need to be careful around her but taking a hot bath with a hot demon does sound rather tempting...so of course you do!</p>'						
					);	
				}
				this.setFlag(25);
				startQuestions();
				addLinkToPlace(md, 'get out of the bath and get dressed', 45, '', 'As you do and look back, Elian has gone without a word or sound');
				WritePlaceFooter(md);
				return true;			
			}
			return false;
		}		
	
		// Your bedroom
		if (sType == "elianbedroom" || (!this.checkFlag(28) && this.place == 46)) {
			if (sType != "elianbedroom") setQueryParams('type=elianbedroom');
			this.place = 46;
			this.setFlag(28);
			var perTanika = findPerson("MrsTanika");
			var perTess = findPerson("Tess");
			var perAnita = findPerson("Anita");
			var totpeople = perTess.isHere() ? 1 : 0;
			if (perTanika.isHere()) totpeople++;
			if (perAnita.isHere()) totpeople++;
			perVamp = findPerson("Vampyre");
			
			md = WritePlaceHeaderNIP();
			this.showPerson("meetingbedroom.jpg");
			addPlaceTitle(md, "Elian");

			if (getQueryParam("morning") == "true") {
				// Woke here with her in your bed
				md.write('<p>As you sit up from your bed with Elian lying next to you, once again dressed');
			} else {
				// Woke elsewhere with her
				md.write('<p>When you enter your bedroom you see Elian sitting on your bed');
			}
			var other = "";
			if (totpeople > 0) {
				md.write(' and ');
				if (perTess.isHere()) {
					other = "Tess";
					md.write("Tess looking at her curiously");
					if (totpeople > 2) md.write(", ");
					else if (totpeople > 1) md.write(" and ");
				}
				if (perTanika.isHere()) {
					other = "Mrs Tanika";
					md.write("Mrs Tanika lying on the bed seeming to not care about Elian");
					if (perAnita.isHere()) md.write(" and ");
				}
				if (perAnita.isHere()) {
					md.write("Anita looking at Elian warily");
					other = "Anita";
				}
				if (totpeople > 1) other = "the others";
				if (perTess.isHere()) md.write(". You notice Elian was looking at Tess a bit annoyed.</p>");
				else md.write(".</p>");
			} else md.write(".</p>");
			md.write(
				'<p>"' + (isMorning() ? "Good Morning " : "Welcome home ") + this.getYourNameFor() + '", she seems to have settled in. '
			);
			if (totpeople > 0) {
				md.write("You consider how to explain Elian to " + other + " but ");
				if (perTess.isHere()) md.write('Tess says "Elian is welcome here, do not worry yourself". You can tell she is concerned, she would prefer you alone, but is caring enough to accept the others. Elian looks at her with a definitely jealous expression on her face, but says nothing.');
				else if (perTanika.isHere()) md.write('Mrs. Tanika just says "The more the merrier"');
				else md.write("Anita still looks unsure about Elian but you are her superior and will accept Elian");
			}
			md.write(
				'</p><p>You welcome Elian to your home, and she then explains,</p>' +
				'<p>"This morning no payment was required but from tomorrow onwards my price will have to be paid. Now I am your '
			);
			if (clv == 2) md.write("love slave to use in any way you wish");
			else if (clv == 3) md.write("beloved <font size=-2><i>demon </i></font>bride");
			else md.write("servant to do <i>anything</i> you order, to <i>anyone</i>");
			md.write('" and she smiles');
			if (clv == 3) {
				if (perTess.isHere()) md.write(' looking pointedly at Tess');
				md.write('. You see ' + other + ' look surprised at the "bride" reference and you try to explain it is not like that, but each time you try Elian insists she is your bride. Short of explaining she is a demon it is going to be difficult to explain this one and for now you give up...</p>');
			} else md.write('</p>');
			
			if (perVamp.isHere()) {
				md.write(
					'<p>You see Elian deliberately look at Lilith, the first time you can remember her looking at Lilith directly. Lilith returns the look with considerable hostility.</p>'
				);
			} else if (clv == 4) {
				md.write(
					'<p>Elian says "I should get changed now into my uniform now I am your servant, ' + perYou.getMaster() + '!" and she immediately starts removing her clothing. She quickly changes and then announces,</p>' +
					'<p>"I will attend to duties around the house as you maid and servant. Call for me any time you require my service." With that she leaves your bedroom.</p>'
				);
				this.place = 45;		// Kitchen
			}
			startQuestions();
			if (perVamp.isHere()) addLinkToPlace(md, 'ask Lilith about Elian', Place, 'type=elianbedroomlilith&initial=true');
			else addLinkToPlace(md, 'take a seat on your bed for a moment', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "elianbedroomlilith" || (!this.checkFlag(29) && (this.place == 45 || this.place == 46 || this.place == 46.1) && isPersonHere("Vampyre") && !isCommentsShown() && !bPopupShown && sType === "")) {
			if (sType != "elianbedroomlilith") setQueryParams('type=elianbedroomlilith');
			this.setFlag(29);
			perVamp = findPerson("Vampyre");
			perVamp.setFlag(27);
			
			md = WritePlaceHeaderNIP();
			this.showPerson("meetingbedroom.jpg");
			addPlaceTitle(md, "Elian and Lilith");

			if (getQueryParam("initial") !== "true") md.write('<p>As you enter the room you see Lilith and Elian directly staring at each other, the first time you can recall them looking at each other.</p>');
			md.write(
				'<p>You ask Lilith what is wrong but she does not answer as she stares at Elian. You give up and ask Elian, but you remember her previous references to "Things of blood and violence". She looks away from Lilith and answers,</p>' +
				'<p>"I did not expect \'that\' here, you should get rid of it. Things of blood and violence are useless to us". Unusually Lilith replies,</p>' +
				'<p>"But things of death and torture are not?", she then looks at you "I will not associate with one such has that. You own my heart and body so I will not do anything to it, or ask you to do anything like end your pact with it."</p>' +
				'<p>Elian smiles at the reference to \'death and torture\', but says nothing. Lilith continues, "When that is not here I will be at your side. I will leave this room and wait nearby."</p>' +
				'<p>Lilith turns, adjusting her clothing and she is once again fully clothed and she leaves your bedroom. You wonder what she means by \'nearby\' does she mean '
			);
			if (wherePerson("Mom") == 154) md.write('with Mom, or ');
			md.write('with Tracy? You will have to go and check later.</p>');
			md.write(
				'<p>Elian says "That is better, I will have it killed then" and you tell her,</p>' +
				'<p>"Enough, Lilith is my servant and you will do nothing to her or against her. Remember the pact requires you to protect me and <b>mine</b> and that includes Lilith"</p>' +
				'<p>Elian looks distinctly annoyed but nods her head and says "Of course ' + this.getYourNameFor() + '" and leaves it there. There is really some hostility between them and you have no idea why and doubt either will explain why. It does seem best to keep them apart and Lilith\'s leaving the room does seem the best solution for now.</p>'
			);
			if (getQueryParam("initial") == "true"  && clv == 4) {
				md.write(
					'<p>Elian says "I should get changed now into my uniform now I am your servant, ' + perYou.getMaster() + '!" and she immediately starts removing her clothing. She quickly changes and then announces,</p>' +
					'<p>"I will attend to duties around the house as you maid and servant. Call for me any time you require my service." With that she leaves your bedroom.</p>'
				);
				this.place = 45;		// Kitchen
			}
			perVamp.place = 374;

			startQuestions();
			addLinkToPlace(md, 'take a seat on your bed for a moment to recover', Place);
			AddPeopleColumn(md);
			perVamp.showPerson("meetelian.jpg");
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "elianprivate") {
			// Talking to Elian
			md = WritePlaceHeader();
			var myName = this.getYourNameFor();

			// Images
			this.showPerson("private" + this.getSuffix(true) + ".jpg");

			// Title
			if (Place == 46) addPlaceTitle(md, "Elian In Your Bedroom");
			else addPlaceTitle(md, "Talking to Elian");

			// Description
			if (clv == 4) {
				if (Place == 46) md.write('<p>Elian joins you in the bedroom and sits down on some bedding and looks at you expectantly.</p>');
				else md.write('<p>You ask Elian to stop her housework and she relaxes expectantly</p>');
			} else if (clv == 3) md.write('<p>Elian stretches out and asks "What can I do for you my ' + (perYou.isMan() ? 'husband' : 'wife') + '?" You remind her you prefer if she does not use that term. She smiles but says nothing.</p>');
			else md.write('<p>Elian sits up looking at you and asks "What do you want to do to me, or for me you do to you?"</p>');

			// Questions
			startQuestions();
			this.showCommonChat(md);

			if (isNight()) {
				if (clv == 4 && !this.checkFlag(39)) {
					addPopupLinkC(md, "go to bed for the night with Elian", "Sleeping with a Demon Servant", 
						'<div style="position:absolute;bottom:0;right:0;width:100%;z-index:-1">' + this.addPersonString("bed-servant.jpg", "100%", "rightpopup") + "</div><div style='height:98%;height:calc(100% - 1.5em);width:100%;cursor:pointer;margin-bottom:-4px;font-size:1.1em;margin-top:1.5em'>",
						'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%;z-index:0">You tell Elian is it time for bed. She lies down on the bed and says "' + myName + ' you chose for me to be your sevant, not something more intimate" She gets up and leaves the room, having made her point.</b></p></div>' +
						false, 'setPersonFlag("Elian",39);movePerson("Elian",45)', false, "top:5vh;left:5%;width:85%;height:85vh;padding:0;overflow-y:hidden"
					);
				} else {
					this.addSleepLink(md, "go to bed for the night with Elian", "Sleeping with a Demon", 
							'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">You tell Elian is it time for bed. You can see a knowing smile on her face and you qualify "To Sleep". She nods and says "Of course" but you doubt she will let it remain at that <b>only</b></p>',
							"bed" + this.getSuffix() + ".jpg", true
					);
				}
			}
			addLinkToPlace(md, 'finish talking to Elian', 46);

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "elianhomebj") {
			// Home - Oral sex
			md = WritePlaceHeaderNIP();
			if (perYou.isMaleSex()) {
				if (clv == 4) {
					if (isExplicit()) this.showPersonRandomX("home-servant-bjb", 3);
					else this.showPerson("home-servant-bjba.jpg");
				} else this.showPersonRandomRorX("home-bjb", isExplicit() ? 1 : 1);
			} else this.showPersonRandomRorX("home-bjg", isExplicit() ? 1 : 1);
			addPlaceTitle(md, clv == 4 ? "Elian\'s Service" : "Elian\'s Lips");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Elian gives you a blowjob</p>'
				);
			} else {
				md.write(
					'<p>Elian licks your pussy</p>'
				);				
			}
			
			startQuestions();
			addLinkToPlaceC(md, 'talk more to Elian', Place, 'type=elianprivate');
			WritePlaceFooter(md);
			return true;				
		}			
		
		if (sType == "elianhomestrapon") {
			// Home - Strap-On
			md = WritePlaceHeaderNIP();
			this.showPersonRandomX("home" + this.getSuffix(true) + "-strapon", 2);
			addPlaceTitle(md, "Elian and your Strap-On");

			md.write(
				'<p>You fuxk Elian with your strap-on</p>'
			);				
			
			startQuestions();
			addLinkToPlaceC(md, 'talk more to Elian', Place, 'type=elianprivate');
			WritePlaceFooter(md);
			return true;				
		}	
		
		if (sType == "elianhometitfuck") {
			// Home - Tit-fuck
			// NOTE: female players will gain a cock for the scene
			md = WritePlaceHeaderNIP();
			if (isExplicit()) this.showPersonRandomX("Catherine!home" + this.getSuffix(true) + "-tf", clv == 4 ? 2 : 4);
			else this.showPersonRandom("home" + this.getSuffix(true) + "-tf", 1);
			addPlaceTitle(md, "Elian's Breasts");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>You fuck your demon\'s tits</p>'
				);					
			} else if (!this.checkFlag(40)) {
				this.setFlag(40);
				md.write(
					'<p>Elian smiles and says,</p>' +
					'<p>"You need something more to properly play with my breasts". You were about to grope and lick them' + (perYourBody.FindItem(45) > 0 ? ' and maybe use your strap-on between them' : '') + ' and start to explain, but she continues,</p>' +
					'<p>"You know my abilities, let me help you properly play with my breasts" and you see her usually modest breast grow a cup size or two, maybe more. You think that is it, but then you feel a sensation in your groin, and you see a large cock grow from the top of your pussy. A large and very hard cock.</p>' +
					'<p>Elian says nothing more as she takes your cock between her breasts doing all the work for you to fuck her tits, or more masturbate your cock with her tits! Quite rapidly an urgent feeling builds in your cock and suddenly you cum, spraying your load over her breasts.</p>' +
					'<p>Elian smiles and you see her breasts are back to their normal size and she comments "That is how it is done!"</p>'
				);
			} else {
				md.write(
					'<p>Elian smiles and says,</p>' +
					'<p>"Let me help you properly play with my breasts" and you see her usually modest breast grow a cup size or two, maybe more. Then you feel that sensation in your groin, and a large cock grows from the top of your pussy. A large and very hard cock.</p>' +
					'<p>Elian says nothing more as she takes your cock between her breasts doing all the work for you to fuck her tits, or more masturbate your cock with her tits! Quite rapidly an urgent feeling builds in your cock and suddenly you cum, spraying your load over her breasts.</p>' +
					'<p>Elian smiles and you see her breasts are back to their normal size.</p>'
				);				
			}
			startQuestions();
			addLinkToPlaceC(md, 'talk more to Elian', Place, 'type=elianprivate');
			WritePlaceFooter(md);
			return true;				
		}	
		
		if (sType == "elianhomefuck") {
			// Bedroom - Fuck
			// NOTE: female players MAY gain a cock for the scene. Guaranteed at least once for demon bride
			md = WritePlaceHeaderNIP();
			var bFuta = getQueryParam("futa") == "true"
			if (bFuta) this.showPersonRandomRorX("home-fuckf", 1);
			else if (isExplicit()) this.showPersonRandomX("home" + this.getSuffix(true) + "-fuck", 4);
			else this.showPersonRandom("home" + this.getSuffix() + "-fuck", clv == 3 ? 1 : clv == 4 ? 2 : 4);
			addPlaceTitle(md, "Fucking Elian");

			if (bFuta) {
				if (this.checkFlag(38)) {
					if (clv == 3) {
						md.write(
							'<p>The memory of the first time you fucked Elian with your cock is very clear, and you feel compelled to repeat it. Elian seems to know your desire, she is a succubus after all. You feel the cock growing again from your groin, less urgent than that first time but still hard and full of desire.</p>' +
							'<p>Once again you fuck the hot demon, to pay her price, but mostly because of the amazing feeling of fucking her.</p>'
						);
					} else {
						md.write(
							'<p>The memory of the first time you fucked Elian with your cock is very clear, and you feel compelled to repeat it. Elian seems to know your desire, she is a succubus after all. You feel the cock growing again from your groin, less urgent than that first time but still hard and full of desire.</p>' +
							'<p>Once again you fuck the hot demon, because of the amazing feeling of fucking her.</p>'
						);
					}
				} else {
					if (clv == 3) {
						md.write(
							'<p>You intend to do some general love making, a bit of kissing, licking maybe some tribbing, but as you lean towards Elian she smiles,</p>' +
							'<p>"So it is time to start paying my price!" and you feel an intense urgent feeling in your groin. It intensifies and suddenly a large, hard cock erupts from above your pussy. You feel from it an intense arousal and as you look down at it Elian says,</p>' +
							'<p>"How else were you going to father a child with me?". You see her clothing is gone and she lies back spreading her legs ready for you. There is no point in stopping now, you have to pay her price and you feel an intense desire to sink your cock into her and fuck her senseless!</p>' +
							'<p>You lie on her and Elian guides your cock into her hot wetness and you start to fuck her. It is difficult to hold back, and you hear her whisper "Don\'t hold back". You urgently fuck her, with little skill, yet, and filled with urgent passion. Quite quickly you feel it building in you and you head Elian cry out in passion. That is the last straw and you powerfully cum as Elian pulls you in, make sure you cum deeply into her.</p>' +
							'<p>After Elian whispers, "Like mortal women there is no guarantee the price is paid, we will have to repeat that <b>often</b>" She is a succubus after all!</p>'
						);						
					} else {
						md.write(
							'<p>You intend to do some general love making, a bit of kissing, licking maybe some tribbing, but as you lean towards Elian she smiles,</p>' +
							'<p>"Certainly, I will use my abilities so we may do this properly" and you feel an intense urgent feeling in your groin. It intensifies and suddenly a large, hard cock erupts from above your pussy. You feel from it an intense arousal and as you look down at it Elian says,</p>' +
							'<p>"How else did you plan to fuck a succubus?". You see her clothing is gone and she lies back spreading her legs ready for you. There is no point in stopping now, you have to pay her price and you feel an intense desire to sink your cock into her and fuck her senseless!</p>' +
							'<p>You lie on her and Elian guides your cock into her hot wetness and you start to fuck her. It is difficult to hold back, and you hear her whisper "Don\'t hold back". You urgently fuck her, with little skill, yet, and filled with urgent passion. Quite quickly you feel it building in you and you head Elian cry out in passion. That is the last straw and you powerfully cum as Elian pulls you in, make sure you cum deeply into her.</p>'
						);							
					}
				}
				this.setFlag(38);
			} else if (perYou.isMaleSex()) {
				md.write(
					'<p>You fuck your hot demon</p>'
				);								
			} else {
				md.write(
					'<p>You explore your hot demon\'s body and she does the same to yours.</p>'
				);				
			}
			startQuestions();
			addLinkToPlaceC(md, 'talk more to Elian', Place, 'type=elianprivate');
			WritePlaceFooter(md);
			return true;				
		}			
		
		if (sType == "elianservantsextalk") {
			// Ask for sex as servant
			md = WritePlaceHeaderNIP();
			this.setFlag(41);
			this.showPerson("home-servant-tfa.jpg");
			addPlaceTitle(md, "Elian Service");

			md.write(
				'<p>You tell Elian you wish to be intimate with her, and she lies on the bed, but stays clothed in her uniform. She says,</p>' +
				'<p>"Our pact has me be your devoted servant and partner, but you did not ask me to be your lover or sex-toy. I will satisfy you as much as you like in that place we formed the pact as I am there fully a succubus and creature of lust. Here I am your servant."</p>' +
				'<p>While nothing is audible in her voice or visible in her expression, you get a sense she is annoyed with you and this is her way of showing it. A very minor way as you can visit that other place anytime!. She continues,</p>' +
				'<p>"I have seen in your fiction and movies that maids can service their ' + perYou.getMaster() + ' sexually, but not in the bedroom but openly around the home, preferably where others can see or come across them. When you meet me there you may request some service at that time."</p>' +
				'<p>You argue that she is pact bound to you and it is not for her to dictate these terms. She smiles and just says "You chose me to be your servant"</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'talk of other things', Place, 'tyoe=elianprivate');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1elian") {
			// End Game scene for Elian
			if (this.getCharmedLevel() == 3) {
				// End Game - Bred Elian your Demon Bride
				md = WritePlaceHeader(false, '', 'black');
				this.showPerson("Catherine!pregnant.jpg");			
				addPlaceTitle(md, "A Pact Condition Fulfilled");
				md.write(
					'<p>One night when you visit Elian is her \'other\' place you observe your pact-bound demon has a selling belly, and you see her price has been fulfilled!</p>' +
					'<p>Elian sees very please primising to be at your side until death do we part, bearing you many children. Many, the pact just required a single child, but it is not likely she will be using any sort of birth-control. She leans over to you and whispers,</p>' +
					'<p>"My Lover, do not worry we have as much time as we need, death means nothing to my kind, and even your death means nothing, you will join me then, for as long as we are bound"</p>' +
					'<p>Suddenly the full weight of her often mentioning <b>until death do we part</b> she actually meant you will <b>never</b> leave her and there is no way out, you have fulfilled her price now...</p>'
				);
			} else if (this.getCharmedLevel() == 4) {
				// Elian your servant
				md = WritePlaceHeader();
				this.showPerson("Catherine!endgame-servant.jpg");			
				addPlaceTitle(md, "Demon Servant");

				md.write(
					'<p>Elian has proved a devoted and skilled servant, if somewhat ruthless if you are not clear in what you order her to do. She will pleasure you in bed, as well as serving your other worldly needs.</p>' +
					'<p>So far you have maintained your pact with her and see no particular reason to part with her.</p>'
				);					
			} else {
				// Elian your love slave
				md = WritePlaceHeader();
				this.showPerson("Catherine!endgame-lover.jpg");			
				addPlaceTitle(md, "Demonic Love-Slave");

				md.write(
					'<p>Elian has proved to be a passionate love-slave, willing and able to do anything you want. She wil shape herself for your pleasure or shape you for hers when you are willing.</p>' +
					(isCharmedBy("Tess") ? '<p>You still see her resentment of Tess at times, well concealed but definitely present.</p>' : '') +
					'<p>So far you have maintained your pact with her and see no particular reason to part with her.</p>'
				);					
			}
			startQuestions();	
			perYou.addEndGameOthers(md, getQueryParam("stage"));			
			WritePlaceFooter(md);
			return true;				
		}
		
		return false;
	};
	
	per.showEvent = function()
	{
		if (this.place > 1001) return false;
		if (Place != 46 && this.place == 46.1) this.place = 45;
		if (Place == 900) return this.showEventLair();
		if (nFromPlace == 900) showRightBar(2);
		if (isAtLocation(45)) return this.showEventHome();

		var md, nm, clv, perVamp;
			
		if ((Place == 269 && isDay() && !this.checkFlag(7) && sType === "") || (sType == "elianpoolmeet") || (sType == "elianpool")) {
			// Hotel Pool
			if (this.isCharmedBy()) {
				// Meet Elian after the pact
				md = WritePlaceHeaderNIP();
				this.setFlag(7);
				this.showPersonRandom("pool", 4);
				addPlaceTitle(md, "Elian in the Pool");
				if (sType == "elianpool") {
					// Swimming and she is your companion
					md.write(
						'<p>You see the pool is currently empty, except for Elian. She smiles softly says,</p>' +
						'<p>"A truce for now lets just have some fun in the pool" and she playfully splashes you. You splash her back and have a fun time as if she were any normal girl.</p>' +
						'<p>After a time she says she has to leave for "beauty sleep" and hops out of the pool and walks toward the changing rooms...</p>'
					);						
				} else {
					// Called her to go for a swim
					md.write(
						'<p>You see the pool is currently empty, except for Elian. She smiles softly says,</p>' +
						'<p>"A truce for now lets just have some fun in the pool" and she playfully splashes you. You splash her back and have a fun time as if she were any normal girl.</p>' +
						'<p>After a time she says she has to leave for "beauty sleep" and hops out of the pool and walks toward the changing rooms...</p>'
					);	
				}
				startQuestionsOnly();
				addLinkToPlaceC(md, 'watch her leave', Place);
				WritePlaceFooter(md);
				return true;
			}
			if ((this.checkFlag(5) && !this.checkFlag(15)) || (this.checkFlag(15) && Math.random() < 0.1) || (sType == "elianpoolmeet")) {
				md = WritePlaceHeaderNIP();
				this.setFlag(7);
				setQueryParams("type=elianpoolmeet");
				if (!this.checkFlag(15)) {
					// Meet 'Rachael'
					this.showPerson("poola.jpg");
					addPlaceTitle(md, "Rachael in the Pool");
					md.write(
						'<p>You see the pool is currently empty, except for Rachael. You see she is leaning against one end of the pool, more like she is posed for a photoshoot than a person going for a swim.</p>' +
						'<p>She looks at you with an odd expression, is it longing, passion or something else. You take it as a passionate look given her recent SMS and approach her. She softly says,</p>' +
						'<p>"Not yet, not here" and she climbs out of the pool and seductively walks towards the changing room.</p>'
					);
				} else {
					// Meet Elian before the pact
					this.showPersonRandom("pool", 2);
					addPlaceTitle(md, "Elian in the Pool");
					md.write(
						'<p>You see the pool is currently empty, except for Elian. She smiles softly says,</p>' +
						'<p>"A truce for now lets just have some fun in the pool" and she playfully splashes you. You splash her back and have a fun time as if she were any normal girl.</p>' +
						'<p>After a time she says she has to leave for "beauty sleep" and hops out of the pool and walks toward the changing rooms...</p>'
					);					
				}
				startQuestionsOnly();
				addLinkToPlaceC(md, 'watch her leave', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 281 && sType == "elianconfront") {
			// Confront about Elian, outside of the club
			this.setFlag(11);
			md = WritePlaceHeaderNIP();
			this.showPerson("cluboutside1.jpg");

			addPlaceTitle(md, "Elian and Rachael");

			md.write(
				'<p>You tell Rachael about a demon named Elian you had met and how she looks a lot like her, and Jade says she <i>is</i> Elian. Rachael stands smiling and gestures for you to follow and heads for the exit. You hesitate, but need to resolve this and follow her.</p>' +
				'<p>Outside the club you see Rachael down a small side alley sitting on an access stair, or more likely a sort of fire-escape. It is quite well lit here from the neon lights of the club but still it is chillingly reminiscent of that hot place where you met Elian. You also notice it is surprisingly warm, but your thoughts are interrupted when she speaks to you, softly as always,</p>' +
				'<p>"Yes, of course, <b>part</b> of my name is Elian, but Rachael is just as much my name here. Only <b>true names</b> matter, you can call me what you want here."</p>' +
				'<p>You hesitate, and they ask who summoned her and what she wants here. She smiles,</p>' +
				'<p>"No one summoned me, then again <b>you</b> summoned me in your dreams. I an not seeking a <i>Legion</i> of perversions, I only seek small things. Slaves to worship me, just as you seek out. I am seeking you and you are seeking me. The dance of seduction and slavery"</p>' +
				'<p>You suggest there may be something else she wants. You remember some of Jade\'s words, and ask about a <b>contract</b>. She looks at you,</p>' +
				'<p>"Aside from your eternal worship and unquestioning loyalty? There are a <i>Legion</i> of things I could ask but there is nothing that you have at this time."</p>' +
				'<p>Now you know who she actually is but what can you do about her?'
			);
			if (isDemonQuestDone() || isDemonBound()) md.write(' As you contemplate this she smiles "I have no interest in relics from a certain Church"</p>');
			else md.write('</p>');

			startQuestions();
			addLinkToPlace(md, 'leave Elian for now', Place, '', 'When you glance back you notice Elian is gone');
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place != 282) return false;
		
		// Avernus club
		if (!this.checkFlag(12) && ((this.checkFlag(4) && !this.checkFlag(15)) || (this.checkFlag(15) && Math.random() < 0.08)) && !this.checkFlag(6) && sType === "") {
			md = WritePlaceHeader();
			this.setFlag(6);
			if (this.checkFlag(15)) {
				this.showPerson("poledanceb.jpg");
				addPlaceTitle(md, "Elian Dancing");
				md.write(
					'<p>As you enter the club you glance at the stage and are stopped in your tracks. You see the Elian on the stage dressed in an elegant dress in a techno inspired state design of neon lights. The dress does not stay on for very long as she performs a rather traditional strip-tease, but still very erotic.</p>' +
					'<p>After her dance she joins you briefly but explains she has to leave for a little while to deal with someone, interest that this means she has others she tempting or enslaving?</p>'
				);
				if (isPersonHere("Vampyre")) md.write('<p>You notice Lilith did not even look at Elian\'s dance.</p>');				
			} else {
				this.showPerson("poledancea.jpg");
				addPlaceTitle(md, "Rachael Dancing");
				md.write(
					'<p>As you enter the club you glance at the stage and are stopped in your tracks. You see the young woman who calls herself Rachael on the stage. She is performing a very erotic strip-tease, slow and sensual. She looks at you and you see she is holding a toy, it looks like a black sheep or lamb. She must have a thing for them, give that SMS she sent you.</p>' +
					'<p>After her dance she joins you for a drink, the toy is nowhere to be seen. You ask her about it and her SMS, and she just mentions it is related to one of the meanings of her name. The way she says this is a bit playful and you do not believe her for a minute.</p>'
				);
				if (isPersonHere("Vampyre")) md.write('<p>You notice Lilith did not even look at Rachael\'s dance.</p>');
			}
			startQuestionsOnly();
			addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "talkinclubchallenge") {
			// Talk to Elian - start of Challenge
			md = WritePlaceHeaderNIP();
			this.setFlag(12);
			this.setFlag(14);
			this.showPerson("challenge-start.jpg");

			addPlaceTitle(md, "A Challenge");

			md.write(
				'<p>You go to sit with Rachael...Elian or whatever you should call her now, but as you do she gestures for you to join her in a private booth. When you get there you see she has some of the cuffs people use in bondage play. She puts them on in a sort of display of submission and as she does you notice her face is a little different. This cute blonde appearance cannot be her true form, what you saw in that other place must be her actual features. The glamour that changes her look must require some concentration and she seems excited and it must be subtly altering the illusion.</p> ' +
				'<p>She tells you seductively, "I know you want me as your slave, and I want you as my slave" she smile seductively, "What are we going to do about it? You need to know my full name to control me and I need you to accept my offer of passion and enslavement."</p>' + 
				'<p>She shakes her wrists and the chains jingle. "I propose a deal, in exchange for a series of intimacies, if you survive with your own will I will give you a part of my name."</p>' +
				'<p>This does not sound particularly fair as it seems <b>one failure</b> will mean your complete enslavement, but in return you gain a part of her name. You say this and she smiles again,</p>' +
				'<p>"Fair, you expect fairness from me. I promise you I will fill my part completely, and allow you to enslave me if you learn my full name. I will not deceive you in any way but I will do my best to make you my compliant love slave! I offer one thing, Elian is the first part of my full name!"</p>' +
				'<p>One thing crosses your mind she referred to you as a \'love slave\' while previously she has talked of you as a thrall, a slave-toy. You are unsure what she meant here, but still you agree to her challenge, it does seem the only way to deal with her, enslave or be enslaved. You ask her for her first challenge. She smiles and simply replies,</p>' +
				'<p>"Kiss me" but you remember Legion tried the same and almost took you then and there. When you decide to try this you will need to have defences, <b>significant defences</b>.</p>' +
				'<p>She smiles "If you are not ready yet, I could buy you a drink?"</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'do the first challenge, kiss her', Place, 'type=elianchallenge1');
			addLinkToPlaceC(md, 'have a drink with her', Place, 'type=eliandrink&id=1');
			addLinkToPlace(md, 'leave her for now and consider your options', Place, '', 'When you glance back you notice Elian is gone');
			WritePlaceFooter(md);
			return true;
		}
		
		var ndef;
		if (sType == "elianchallenge1") {
			// Challenge 1
			ndef = this.getDefences();
			md = WritePlaceHeaderNIP();
			this.setFlag(12);
			this.setFlag(15);
			this.setFlag(7, false);
			this.setFlag(6, false);
			
			this.showPerson(ndef > 1 ? "challenge1.jpg" : "challenge-fail.jpg");

			if (ndef > 1) {
				addPlaceTitle(md, "Challenge Won");

				md.write(
					'<p>You decide you are ready to try the challenge, confident in your protections and lean in and kiss Elian. You feel an immediate rush of desire and ' + this.showDefences(2) + '. After a lengthly embrace of unrestrained and passionate kissing, Elian pushes you back gently. She smiles,<p>' +
					'<p>"As I expected from a powerful and attractive ' + perYou.getWitch() + ', you can resist my basic controls". She sighs and continues, "Such a good kisser, you will make a wonderful love slave"</p>' +
					'<p>You reply, "You will make a cute demon play-thing and sex-toy", she laughs, "Promises, promises" and then looks at you seriously. She leans over and whispers in your ear "Iscariot"</p>' +
					'<p>She stands and leaves the table and a moment later you lose sight of her. It seems you have survived and know now the next part of her name. You wonder how many more parts there are?</p>' +
					'<p>It does cross your mind that the next challenge here will be harder still but ' + this.showDefencesWarning(3) + '.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'return to the bar', Place);
			} else {
				addPlaceTitle(md, "Challenge Unprepared For");

				md.write(
					'<p>You decide you are ready to try the challenge and lean in and kiss Elian. As you do so you feel an immediate rush of passion and a very strange feeling as if your will, your very thoughts are being drawn out of your mouth into hers. One of your last free thoughts is you <b>certainly did not have enough defences for this</b>.</p>' +
					'<p>Then again that does not matter as your Mistress is so beautiful, she is everything you desire in life and you will do anything for her. Elian smiles almost whistfully,</p>' +
					'<p>"I am surprised you were so easy to enslave my love. I was hoping for a series of challenging seductive encounters before I finally make you my slave...Follow me".</p>' +
					'<p>Your Mistress attaches a chain to your neck and leads you out of the club to your new life, past other people who think nothing of a beautiful woman leading a slave though the Avernus CLub....</p>'
				);
				startQuestionsOnly();
				addRestartLink(md);
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "elianchallenge2") {
			ndef = this.getDefences();
			md = WritePlaceHeaderNIP();
			this.setFlag(12);
			this.setFlag(16);
			
			this.showPerson(ndef > 2 ? "challenge2.jpg" : "challenge-fail.jpg");

			if (ndef > 2) {
				addPlaceTitle(md, "Challenge Won");

				md.write(
					'<p>You decide you are ready to try the challenge, confident in your protections and lean in and kiss Elian and let your hands wander lightly caressing her thighs and then breasts. You feel an immediate rush of desire but that is all as Elian passionately kisses you. Somehow you realise she has removed her outer dress and is only in her underwear, making her more available to your touch, but only touch. She is very responsive and moans delightfully and you can see no evidence she is acting.</p>' +
					'<p>After a while Elian pushes you back gently, and you notice she seems to be fully clothed again. She licks her lips and smiles,<p>' +
					'<p>"As I hoped from a powerful and attractive ' + perYou.getWitch() + ', you can resist my stronger controls". She sighs and continues, "So good, you will make a wonderful lover and slave"</p>' +
					'<p>You reply, "You will make a perfect demon lover and slave", she smiles, "Yes I would" and then looks at you seriously. She leans over and whispers in your ear "Agos"</p>' +
					'<p>She stands and leaves the table and a moment later you lose sight of her. You have survived again and know another part of her true name.</p>' +
					'<p>It does cross your mind that the next challenge here will be harder still but ' + this.showDefencesWarning(4) + '.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'return to the bar', Place);
			} else {
				addPlaceTitle(md, "Challenge Unprepared For");

				md.write(
					'<p>You decide you are ready to try the challenge and lean in and kiss Elian and start to caress her body. As you do so you feel an immediate rush of passion and a very strange feeling as if your will, your very thoughts are being drawn out of your mouth into hers. One of your last free thoughts is you <b>certainly did not have enough defences for this</b>.</p>' +
					'<p>Then again that does not matter as your Mistress is so beautiful, she is everything you desire in life and you will do anything for her. Elian smiles,</p>' +
					'<p>"I am surprised you were not so difficult to enslave my love. I was hoping for more of a challenge before I finally made you my slave...Follow me".</p>' +
					'<p>Your Mistress attaches a chain to your neck and leads you out of the club to your new life, past other people who think nothing of a beautiful woman leading a slave though the Avernus CLub....</p>'
				);
				startQuestionsOnly();
				addRestartLink(md);
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "elianchallenge3") {
			ndef = this.getDefences();
			md = WritePlaceHeaderNIP();
			this.setFlag(12);
			this.setFlag(17);
			
			this.showPerson(ndef > 3 ? "challenge3.jpg" : "challenge-fail.jpg");

			if (ndef > 3) {
				addPlaceTitle(md, "Challenge Won");

				md.write(
					'<p>You decide you are ready to try the challenge, confident in your protections and see somehow Elian is almost completely naked in and start to kiss her and then work down to her breasts and start to work lower. You feel an immediate rush of desire but that is all as Elian passionately sighs and asks for more. She moans and writhes delightfully and soon you are licking her pussy, her clit and using your fingers to explore deeper. With surprising speed she orgasms intensely, one of the strongest you have seen in a partner. She groans and looks at you with a grin, and she almost throws you onto your back. You realise your clothes are missing and she '
				);
				if (perYou.isMaleSex()) md.write(' and she wraps her lips around your already hard member. She gives you arguably the best blowjob of your life until you cum hard into her mouth.');
				else md.write(' and she now moves to your wet pussy, lickng you with almost supernatural skill (well maybe not \'almost\') until you cry out your orgasm.');
				md.write(
					'</p><p>Elian pushes you back gently. She smiles,<p>' +
					'<p>"You taste wonderful my soon to be ' + perYou.getWitch() + 'slave. Such a pity you resisted, surely it would be more fun to be my slave?". She sighs.</p>' +
					'<p>You reply, "You are one hot demon, why not just tell me your full name and become my slave", she laughs, "Not yet I still want you" and then looks at you seriously. She leans over and whispers in your ear "Omi"</p>' +
					'<p>She stands and leaves the table and a moment later you lose sight of her. It seems you have survived and know now the next part of her name. You wonder how many more parts there are?</p>' +
					'<p>It does cross your mind that the next challenge here will be harder still but ' + this.showDefencesWarning(5) + '.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'return to the bar', Place);
			} else {
				addPlaceTitle(md, "Challenge Unprepared For");

				md.write(
					'<p>You decide you are ready to try the challenge and lean in and see somehow Elian is almost completely naked. You start to kiss her and then work down to her breasts and start to work lower. As you do so you feel an immediate rush of passion and a very strange feeling as if your will, your very thoughts are being drawn out of your mouth into hers. One of your last free thoughts is you <b>certainly did not have enough defences for this</b>.</p>' +
					'<p>Then again that does not matter as your Mistress is so beautiful, she is everything you desire in life and you will do anything for her. Elian smiles almost whistfully,</p>' +
					'<p>"You were not easy enslave my love but I had hoped you could last a bit longer before I finally made you my slave...Follow me".</p>' +
					'<p>Your Mistress attaches a chain to your neck and leads you out of the club to your new life, past other people who think nothing of a beautiful woman leading a slave though the Avernus CLub....</p>'
				);
				startQuestionsOnly();
				addRestartLink(md);
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "elianchallenge4") {
			ndef = this.getDefences();
			md = WritePlaceHeaderNIP();
			this.setFlag(12);
			this.setFlag(18);
			
			this.showPerson(ndef > 4 ? "challenge4.jpg" : "challenge-fail.jpg");

			if (ndef > 4) {
				addPlaceTitle(md, "Challenge Won and...!");

				md.write(
					'<p>You decide you are ready to try the challenge, confident in your protections and lean in and kiss Elian and she then straddles you, continuing to kiss you. You feel an immediate rush of desire but that is all as Elian passionately kisses you and her clothing disappears and then yours ' 
				);
				if (perYou.isMaleSex()) md.write('and you feel Elian mount your hardening member and start to ride you, cowgirl style. You do not last long, but nor does she, and you both cum hard.');
				else md.write('and she starts to rub her pussy against yours, tribbing as it is called. Neither of you last long and you orgasm hard with her.');
				md.write(
					'</p><p>Elian pushes you back gently. She smiles,<p>' +
					'<p>"That was wonderful, you have won the last part of my name". She sighs and whispers, "Sayla", so her true name is ElianIscariotAgosOmiSayla!</p>' +
					'<p>Elian stands, her clothes are mostly back on somehow and waits...</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'what is she waiting for?', Place, 'type=elianchallengewon');
			} else {
				addPlaceTitle(md, "Challenge Unprepared For");

				md.write(
					'<p>You decide you are ready to try the challenge and lean in and see somehow Elian is almost completely naked. You start to kiss her and then she straddles you. As she does you feel an immediate rush of passion and a very strange feeling as if your will, your very thoughts are being drawn out of your mouth into hers. One of your last free thoughts is you <b>certainly did not have enough defences for this</b>.</p>' +
					'<p>Then again that does not matter as your Mistress is so beautiful, she is everything you desire in life and you will do anything for her. Elian smiles almost whistfully,</p>' +
					'<p>"You were not easy enslave my love, you lasted until the final test, I am so happy..Follow me".</p>' +
					'<p>Your Mistress attaches a chain to your neck and leads you out of the club to your new life, past other people who think nothing of a beautiful woman leading a slave though the Avernus CLub....</p>'
				);
				startQuestionsOnly();
				addRestartLink(md);
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "elianchallengewon") {
			md = WritePlaceHeaderNIP();
			this.showPerson("challenge-won.jpg");

			addPlaceTitle(md, "Challenge Finished!");

			md.write(
				'<p>Elian seems to be waiting for you but you are not sure what for, is there something needed to finalise this, beyond knowing her full name, some ritual, some token, something? You are no expert in demons though you know more than you used given everything with Kurndorf and Jade now!</p>' +
				'<p>When you hesitate Elian smiles and says, "Another time then when you work out what you want, or who. I will not return here until you decide and visit me where we first met"</p>' +
				'<p>She stands and her clothes are now fully on and she slowly leaves the table and unusually she is clearly visible as she passes though the club and leaves the exit.</p>' +
				'<p>It seems you have won her true name but what is needed now to complete the contract, assuming you actually want to do this?</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'return to the bar', Place);
			WritePlaceFooter(md);
			return true;
		}		
		
		if (sType == "talkinclub") {
			// Talk to Elian
			md = WritePlaceHeaderNIP();
			nm = this.getPersonName();
			this.setFlag(12);
			this.showPerson("clubtalk0.jpg");

			addPlaceTitle(md, "Talking to " + nm);

			md.write(
				'<p>You sit with ' + nm + ' and talk for a while with her. As always she is very attentive and firty, cute in an odd and intense way.</p>' +
				'<p>She suggests she could buy you a drink...</p>'
			);

			startQuestions();
			if (this.checkFlag(14)) {
				if (!this.checkFlag(15)) addLinkToPlaceC(md, 'do the first challenge, kiss her', Place, 'type=elianchallenge1');
				else if (!this.checkFlag(16)) addLinkToPlaceC(md, 'do the second challenge, touch her', Place, 'type=elianchallenge2');
				else if (!this.checkFlag(17)) addLinkToPlaceC(md, 'do the third challenge, lick her', Place, 'type=elianchallenge3');
				else if (!this.checkFlag(18)) addLinkToPlaceC(md, 'do the fourth and final challenge, fuck her', Place, 'type=elianchallenge4');
			}
			if (this.checkFlag(9) && !this.checkFlag(11)) addLinkToPlaceC(md, 'ask Rachael if she knows Elian or <b>is</b> Elian?', 281, 'type=elianconfront');
			addLinkToPlaceC(md, 'have a drink with ' + nm, Place, 'type=eliandrink&id=1');
			addLinkToPlace(md, 'leave ' + nm + ' for now', Place, '', 'When you glance back you notice ' + nm + ' is gone');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "eliandrink") {
			// Drinking with Elian 1 and 2
			md =WritePlaceHeaderNIP();
			var id = parseInt(getQueryParam("id"), 10);
			nm = this.getPersonName();
			this.showPersonRandom("clubtalk1", 3);

			addPlaceTitle(md, "Drinking with " + nm);

			switch(id) {
				case 1:
					md.write(
						'<p>You have a drink with ' + nm + ' it is surprisingly strong despite it looking like red wine, but it must be some sort of cocktail.</p>' +
						'<p>' + nm + ' talks to you but the drink makes it hard to focus on her words, despite this she is quite fascinating.</p>'
					);
					break;
				case 2:
					md.write(
						'<p>You do not notice the strength of the drink this time, you just feel warn and a bit turned on. ' + nm + ' chats with you but her workds just wash over you. She is very, very cute...</p>'
					);
					break;
			}
			startQuestions();
			if (id == 2) addLinkToPlaceC(md, 'have another drink with ' + nm, Place, 'type=eliandrinkbadend');
			else addLinkToPlaceC(md, 'have another drink with ' + nm, Place, 'type=eliandrink&id=' + (id + 1));
			addLinkToPlace(md, 'enough for now, excuse yourself and leave ' + nm, Place, '', 'When you glance back you notice ' + nm + ' is gone');
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "eliandrinkbadend") {
			// Elian Drinking Bad ending
			md =WritePlaceHeaderNIP(false, "td-left-large");
			nm = this.getPersonName();
			perYou.charmThem(4, "Demon");
			nMana = 0;
			updateLeftBar();
			this.showPerson("clubtalkend.jpg");
			addPlaceTitle(md, "Drunken Slave");
			md.write(
				'<p>You lose track of the night but seem to remember going somewhere with ' + nm + ', stripping off your clothing and <b>all</b> other items. You remember passionately entwined naked bodies hotly pleasuring each other and climaxing over and over.</p>' +
				'<p>You wake and see Elian lying next to you, your Mistress and lover, the <b>only</b> thought in your head is to please her. Your body aches for her touch and she looks at you smiling, "Now you are my slave, forever!" and you agree, anything to please your Mistress.</p>' +
				'<p>You are a demon\'s plaything, happily serving her every desire without thought, without will. Better luck next time...</p>'
			);
			startQuestionsOnly();
			addRestartLink(md);
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		// Cleaning
		if (sType === "" && this.place != -1 && this.place < 900 && (Place == 122 || Place == 374 || Place == 154 || Place == 488) && this.getCharmedLevel() == 4 && !isPersonHere()) {
			return this.showPersonRandom("cleaning", 5, '', '', '', '', 0, false, "string");
		}		
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		if (sType === "" && Place == 282 && this.isHere()) {
			if (!this.checkFlag(3)) md.write('<p>You see a young woman sitting at the bar drinking, she looks familiar but you cannot place her.</p>');
			else md.write('<p>You see Rachael sitting at the bar, at least that is the name she is using here.</p>');
		}
		// Cleaning
		if ((Place == 122 || Place == 374 || Place == 154 || Place == 488) && this.place != -1  && this.getCharmedLevel() == 4 && !isPersonHere()) {
			md.write(
				'<p>You see your demon maid Elian is cleaning this room, though when you say cleaning she is more posing or playing. She is posing to show her figure and expose her panties or cleavage, whatever is appropriate at the time. Certainly she is cleaning but that is of secondary importance.</p>'
			);
		}	
	};
	
	per.showCommonChat = function(md)
	{
		// Sex
		if (this.getCharmedLevel() == 4) {
			if (!this.checkFlag(41)) {
				addLinkToPlaceC(md, 'have her satisfy your desires with her lips', Place, 'type=elianservantsextalk');
				addLinkToPlaceC(md, 'have her satisfy your desires with her body', Place, 'type=elianservantsextalk');
			} else if (Place != 46) {
				addLinkToPlaceC(md, 'have her satisfy your desires with her lips', Place, 'type=elianhomebj');
				if (perYourBody.FindItem(45) > 0 && !perYou.isMaleSex()) addLinkToPlaceC(md, 'have her satisfy your desires with your strap-on', Place, 'type=elianhomestrapon');
				addLinkToPlaceC(md, 'have her satisfy your desires with her breasts', Place, 'type=elianhometitfuck');
				addLinkToPlaceC(md, 'have her satisfy your desires with her body', Place, 'type=elianhomefuck');
				if (this.checkFlag(38) && !this.isMaleSex()) addLinkToPlaceC(md, 'have her satisfy your desires with her body and your cock', Place, 'type=elianhomefuck&futa=true');
			}
			
			// General Questions as Servant
			if (this.place == -1 || this.place == Place) {
				addQuestionR(md, '"I need to do something else, please leave me for now"',
					'"Of course ' + perYou.getMaster() + (Place == 46 ? ' I will leave' : ' I will return to your home') + '". You glance away but when you look back she is gone',
					"Elian",
					"movePerson(\\'Elian\\',45)",
					""
				);
			}
			if (this.place != -1) {
				addQuestionR(md, '"Please come with me now"',
					'"Of course ' + perYou.getMaster() + '"',
					"Elian",
					"movePerson(\\'Elian\\',-1)",
					""
				);
			}
		
		} else {
			// Lover/Bride options
			addLinkToPlaceC(md, 'have her satisfy your desires with her lips', Place, 'type=elianhomebj');
			if (perYourBody.FindItem(45) > 0 && !perYou.isMaleSex()) addLinkToPlaceC(md, 'have her satisfy your desires with your strap-on', Place, 'type=elianhomestrapon');
			addLinkToPlaceC(md, 'have her satisfy your desires with her breasts', Place, 'type=elianhometitfuck');
			addLinkToPlaceC(md, 'have her satisfy your desires with her body', Place, 'type=elianhomefuck');
			if (this.checkFlag(38) && !this.isMaleSex()) addLinkToPlaceC(md, 'have her satisfy your desires with her body and your cock', Place, 'type=elianhomefuck&futa=true');
		}
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 280 && sType === "") {
			var perJade = findPerson("Jade");
			if (perJade.checkFlag(5) && perJade.isHere()) {
				// Questions and bargains
				if (this.checkFlag(1) && !perJade.checkFlag(7)) addQuestionC(md, 'ask about Elian', "Jade", 667);
				if (this.checkFlag(10) && !this.checkFlag(9)) addQuestionC(md, 'ask if she knows Rachael', "Jade", 672);
				if (this.checkFlag(18) && !this.checkFlag(26)) addQuestionC(md, 'ask about demon contracts', "Jade", 673);
			}
		} else if (sType === "" && Place == 282 && this.isHere()) {
			if (!this.checkFlag(3)) {
				addPopupLinkC(md, 'talk to the familiar woman', "Really Familiar",
					this.addPersonString("clubtalk1a.jpg", "height:max%", "right") +
					'You approach the young woman and she smiles and invites you to sit with her. She has odd, intensely blue eyes, and she seems attracted to you. You certainly feel attracted to her but she is naggingly familiar, and it is becoming very annoying.</p>' +
					'<p>You talk with her a bit, introducing yourself, but she avoids giving her name for a while. When you directly ask she smiles,</p>' +
					'<p>"Well, you can call me Rachael here, or should I use Catherine, no Rachael", well it is clearly not her actual name, but that will have to do for now.</p>' +
					'<p>You chat more, and try asking some questions to try to work out where you have met before. She smiles, but there is an edge to it, not from amusement, and she speaks softly,</p>' +
					'<p>"Yes, we have met before, I was dressed differently, and the lighting was much darker", you ask her where it was. All she would say that it was far from here and refuses to explain more.<p>' +
					'<p>You talk and she becomes more flirtatious, but then she pulls back, "Maybe another time, when we are ready". She quickly exchanges phone numbers with you and with that your encounter is over. When you glance back at her, Rachael is gone.' +
					(isPersonHere("Vampyre") ? '</p><p>You notice Rachael ignored Lilith and equally Lilith ignored Rachael' : ''),
					false, 'setPersonFlag("Elian",3);setPersonFlag("Elian",12);dispPlace()'
				);
				this.shown = false;
			} else {
				if (this.checkFlag(11) && !this.checkFlag(14)) addLinkToPlace(md, "talk to " + this.getPersonName(), Place, "type=talkinclubchallenge");
				else addLinkToPlace(md, "talk to " + this.getPersonName(), Place, "type=talkinclub");
			}
		}
		// Cleaning
		if ((Place == 122 || Place == 374 || Place == 154 || Place == 488) && this.place != -1 && this.getCharmedLevel() == 4 && !isPersonHere() && sType === "") {
			addLinkToPlace(md, "talk to your servant Elian", Place, "type=elianprivate");
		}
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		var wwho;

		// The pistol
		if (no == 9 && cmd == 2 && this.checkFlag(11)) {
			if (sType == "elianconfront" || (sType == "talkinclub" || sType == "eliandrink")) {
				if (!this.checkFlag(13)) {
					addComments(
						'You reach down and touch the handle of pistol and a thought from somewhere comes to mind,</p>' +
						'<p>"Five rounds rapid chaps" but then you think, is she even mortal, would a bullet do anything, and more importantly would you want to. She seems to only be interested in you after all!</p>' +
						'<p>You take you hand off the pistol and you see Rachael...that is Elian...smile. You decide, it will be so much better to control that smile than just to kill it.'
					);
				} else {
					addComments(
						'You doubt really the pistol would be of any use and you would prefer to control her, not kill her'
					);
					
				}
				return "handled";	
			}
		}
		
		// Casting the clairvoyance spell
		if (no == 15 && cmd == 2) {

			if (this.isHere && Place == 282) {
				// In the Avernus Club when she is there
				if (CastClairvoyanceSpell()) {
					this.setFlag(10);
					addComments('<p>The spell reveals something strange, Rachael is not human.</p>');
					return "handled";
				}
			}
		}
		
		// Casting the charm spell - only reallu valid when you think she is human
		else if (no == 14 && cmd == 2) {

			// Avernus Club
			if (Place == 282 && this.isHere()) {
				// Drinking at the club
				addComments("You try to cast the spell but there are so many people around, so loud, it is too difficult to focus it on any one person");
				return "handled";
			}
			if (Place == 269 && this.isHere()) {
				// Pool event
				this.setFlag(10);
				addComments("You try to cast the spell but it simply fails. You smell a faint odour of sulphur but it immediately passes.</p><p>Rachael smiles, &quot;I\'m not that easy...or that submissive&quot;");
				return "handled";
			}
			if (Place == 900 && (sType == "eliansplaything1" || sType == "eliansplaything2"))  {
				// Plaything 1
				addComments("You try to cast the spell on the bound woman but you do not know her name and doubt it would work, she is firmly controlled by Elian");
				return "handled";
			}
		}

		return "";		// do nothing
	};	
	
	// Phone calls
	per.isPhoneable = function() {
		// Can you call them?
		// Yes if pact bound and not here and not gone
		return (this.charmed > 0 && Place != 900 && this.place < 1000 && !this.isHere());
	};

	per.addPersonPhoneCall = function() {
		if (!this.checkFlag(3)) return false;
		
		if (Place != 282 && Place != 283 && this.hoursSince() > 12 && !isDay()) {
			if (!this.checkFlag(4)) {
				if (makeCall(true, 350)) this.setFlag(4);
			} else if (!this.checkFlag(5)) {
				if (makeCall(true, 351)) this.setFlag(5);
			} else if (!this.checkFlag(8) && this.checkFlag(7)) {
				if (makeCall(true, 349)) this.setFlag(8);
			}
			// Challenge related SMS's, should generally be received the night after a successful challenge
			if (!this.checkFlag(20) && this.checkFlag(15)) {
				if (makeCall(true, 348)) this.setFlag(20);
			} else if (!this.checkFlag(21) && this.checkFlag(16)) {
				if (makeCall(true, 347)) this.setFlag(21);
			} else if (!this.checkFlag(22) && this.checkFlag(17)) {
				if (makeCall(true, 346)) this.setFlag(22);
			}
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			case 350: 
				return receiveSMS('a lamb', 'I am feeling lost, can you find me?', 'sms1.jpg');
			case 351: 
				return receiveSMS('a lamb', 'I am lost without you, why don\'t you come to me', 'sms2.jpg');
			case 349: 
				return receiveSMS('a lamb', 'Cheers, let\'s have a drink', 'sms3.jpg');
			case 348: 
				return receiveSMS('Mistress', 'There is so much more than kissing if you just surrender. Now you must touch me...', 'sms4.jpg');	
			case 347: 
				return receiveSMS('Mistress', 'Your touch is wonderful and you will do it more if you just surrender. Now you will lick me and I you', 'sms5.jpg');
			case 346: 
				return receiveSMS('Mistress', 'You taste delicious and I will taste you over and over if you just surrender. Now for the last one, you will fuck me', 'sms6.jpg');					
		}
		return '';
	};
}
