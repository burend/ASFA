/********************************************************************
Lauren
*********************************************************************/
function CharmLauren(md)
{
	var perLauren = findPerson("Lauren");
	var myLord = perLauren.getYourNameFor();
	if (Place == 18) setPersonOther('Sarah', getPersonOther('Sarah') + 0.1);
	AddMana(-10);
	perLauren.extra[0] = perLauren.extra[0] + 1;
	if (perLauren.extra[0] == 1) {
		setQueryParams();		// and she leaves
		showPopupWindow("Charming Lauren",
			perLauren.addPersonString("lauren10-1.jpg", "height:max%", "right") +
			"You attempt to cast the spell, and the maid starts to react looking at you with some desire, but then she shakes her head and touches a ring on one of her fingers.<br><br>" +
			"You see the protection you were told about is there, a weak protection, but sufficient.<br><br>" +
			"With some confusion Lauren leaves you, seeming to agree that you want her...to leave."
		);
	} else if (perLauren.extra[0] == 2) {
		setQueryParams();		// and she leaves
		showPopupWindow("Charming Lauren",
			perLauren.addPersonString("lauren10-2.jpg", "height:max%", "right") +
			"You attempt to cast the spell, and the maid definitely reacts as she looks at you with desire, but then she shakes her head and touches a ring on one of her fingers, fiddling with it, almost removing the ring.<br><br>" +
			"You see the protection you were told about is there, but only barely.<br><br>" +
			"With some confusion Lauren leaves you, seeming to agree that you want her...to leave."
		);
	} else {
		perLauren.charmThem(4);
		showPopupWindow("Charming Lauren",
			perLauren.addPersonString("lauren10-3.jpg", "height:max%", "right") +
			"You cast the spell, and the maid reacts as she looks at you with lust, and she touches a ring on one of her fingers and purposely removes it. She proceeds to strip some of her clothing,<br><br>" +
			'"Yes, ' + myLord + ' how may I serve you"<br><br>' +
			"She seems completely under the influence of the spell, no slow submission, instantly your slave, with no real control or choice!" +
			(Place == 18 ? "<br><br>Lauren takes you to the guest room so she can better <b>serve</b> you there." : ""),
			"gotoPlace(290,'type=laurenplay')"
		);
	}
}


// maid Lauren

function initialiseLauren()
{
	// Lauren
	addPerson("Lauren", 0, "Lauren");
	
	per.getYourNameFor = function() { return perYou.getLord(); };
	per.extra[0] = -1000;

	per.isPersonInfo = function() { return this.isCharmedBy(); };
	per.getPersonInfo = function() {
		return this.addPersonString("lauren1b.jpg", "height:max%", "right", undefined, '', true) +
			'Lauren is the faithful servant to the Gates family and now a devoted slave to you! Through serving Sarah she serves you because you ordered her to be a companion to Sarah and be with her. She was reluctant at first as her desire was to move into your Mother’s house to be YOUR family’s maid. Imagine a personal maid at your whim! Keeping the house fresh and clean, she can even cook some great food not mentioning the sexual services she could offer. Though the idea was tempting you talked Lauren out of this. You need someone who keeps an eye on ' + (isMurderPath() ? 'Sarah. She' : 'Sir Ronald and Sarah. Both') + ' can be quite secretive at times.<br><br>' +
			'Lauren has been working for Sir Gates for years and has and has a bizarre relationship with Sarah as she likes to describe it. She vaguely mentioned some kind of blackmailing involved between them, but she didn’t talk about more. You should ask her about that, because it really is strange that the Madame of such importance as Sarah would regularly have sex with a lowkeep servant like Lauren.<br><br>' +
			'Lauren curtsy you at the instant moment she sees you. She whispers you, her ' + perYou.getLord() + ', about what ' + (isMurderPath() ? 'Sarah has' : 'the Gates have') + ' been doing today, feeding you information about anything important she came across. She does this everytime she meets you, so you can be up to date with what is happening at the Mansion.';
	};

	per.getPersonAddress = function() { return this.checkFlag(1) || this.checkFlag(10) || getPersonOther("Sarah") >= 101  ? 'Gate\'s Mansion' : ''; };

	per.whereNow = function()
	{
		if (Place == 290) {
			if (isMurderPath() || this.isCharmedBy() || sType == "escort") return Place;
		}
		if (Place == 192) {
			if (isMurderPath() && !this.checkFlag(1)) return 0;
			return Place;
		}
		return this.place;
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "" || Place != 124) return false;

		// Lauren options
		if (isConspiracyPath() && perYou.FindItem(26) > 0 && !this.checkFlag(10)) {
			// (Conspiracy Path)
			// You have the seance article and have not met Lauren here yet
			showPopupWindow("Meeting Lauren",
				this.addPersonString("lauren11a.jpg", "height:max%", "right") +
				'The Broken Inn Hotel has a few customers around the bar area, and your eyes are drawn to an attractive young lady. You have never seen her before, but she seems to know you as she walks towards you with clear purpose. For a moment you feel uncertain, is she working for Davy or someone else? You prepare for the worst,<br><br>' +
				'"Hello ' + perYou.getLord() + ', and \'' + (perYou.isBornMale() ? 'Mr' : 'Miss') + ' Not Apprentice\' I was asked to meet you by my Lady and she told me to call you that and say that she is your ally.", suddenly you realise she is from your mysterious benefactor and \'co-conspirator\'! You ask her who she is and what she wants, and she answers awkwardly,<br><br>' +
				'"' + perYou.getLord() + ' I am Lauren, Maid to Lady...to my Lady. I have been asked to deliver you a message but not here, there are too many people. My Lady ordered..told me that the pool is often empty and there are many private places to..to..talk. I will go there, please join me there when you can...I must...must change, my Lady <i>insisted</i>.."<br><br>' +
				'She blushes and looks very embarrassed but then covers up her discomfort and gives you a little curtsy and walks off towards the pool area.<br><br>' +
				'Odd, it seems this maid has a strange relationship with your \'noble ally\'. You wonder if she might be the young lady Victoria at the Antiques ' + getShopStore(true) + ' talked about who sold the old stone?'
			);
			this.place = 269;
			this.setFlag(10);
			return true;
		}
		return false;
	};
	
	per.showEvent = function()
	{
		var md, chc;
		
		if (Place == 269) {
			// Hotel Pool
			var perDonna = findPerson("Donna");

			if (sType == "lauren1") {

				md = WritePlaceHeader();
				this.place = 0;		// Leave the hotel after this scene
				movePerson("Sarah", 1);
				movePerson("AdeleRoss", 16);	// Set Gates Estate as Blocked (to protect Sarah)
				setPersonFlag("AdeleRoss", 1);
				setPersonFlag("Mom", 8);
				perYou.startQuest(6);	// Start quest to visit Sarah

				this.showPerson("lauren11b.jpg");
				addPlaceTitle(md, "Hotel Pool with Lauren");

				if (!isDay()) md.write('<p>The pool area is brightly lit by lighting scattered around, and ');
				else if (perDonna.place != 269) md.write('<p>The pool area ');
				else md.write('<p>');

				if (isDay() && perDonna.place == 269) md.write('Lauren gestures to follow her to a more discrete place away from anyone else. You find an isolated area partly shielded by some plants and Lauren kneels down in front of you.');
				else md.write('is fairly empty now but you both move to a more discrete place. You find an isolated area partly shielded by some plants and Lauren kneels down in front of you.');
				md.write(
					'<p> She is wearing a very revealing bikini, little more than fishnets, almost completely exposing her breasts and privates. Lauren sees you looking at her swimsuit and deeply blushes, but you also observe her nipples stiffen a little. She hesitantly speaks,</p>' +
					'<p>"My Mistr...My Lady told me to wear this, as an appropriate attire for her servant and as a gift to you. Please can we not dwell on it....", she hesitates before taking a deep breath and continuing,</p>' +
					'<p>"My Lady has asked me to warn you that it is very dangerous trying to summon the dead. Her family has extensive history dealing with the Veil and the creatures who try to cross into this world...very extensive...very..She says that without powerful wards it would be impossible to safely deal with the more powerful spirits like the ghost of a witch or warlock."</p>' +
					'<p>She pauses, and you think she is troubled by what she just talked about, maybe she has had personal experience with the dead in some way. She looks at you and moves her arms to modestly cover her breasts but the gesture just accentuates her breasts, drawing your attention to them.</p>' +
					'<p>"My Lady believes it is time for you to meet her, but it is a delicate thing to do this, you will not be able to openly visit in the daytime and <i>all</i> doors of the <b>mansion</b> are closed at night. My Lady tells me that umm...Serphoni...will be needed, but it will only work during the midnight hour, when the shroud protecting the mansion is thinnest. You must also use the side entrance from the Sacred Clearing'
				);
				if (!isPlaceKnown("SacredClearing")) {
					md.write(
						'"</p><p>You interrupt and ask where the Sacred Clearing is, you have heard of it but do not know exactly where it is. Lauren explains,</p>' +
						'<p>"It is an ancient ritual area to the west of the mansion" and she gives some brief directions before continuing, "I am surprised, My Lady seemed to assume you knew of that place but I digress... '
					);
					setPlaceKnown("SacredClearing");
				}

				md.write(
					'My Lady asks that you visit so you may trade things you have learned and so she can offer a ward against the dead."</p>' +
					'<p>You heard her say <b>mansion</b> and you ask if she means the Gate\'s Mansion, does her Lady live there? You were not aware anyone else lived there other than ' + perGates.getPersonName() + '. Maybe your mother has heard something?</p>' +
					'<p>She just nods her head, "Yes, and My Lady asks one thing of you, a gift in return for what she has given you...and..and..me. You must bring her a bottle of the finest wine. Please bring it with you when you visit....", she trails off, ' +
					'and does not say anything as she looks at you. She is hesitating, unable or unwilling to say anything more.'
				);

				startQuestions();
				addLinkToPlaceC(md, '"Is there anything more?"', Place, 'type=lauren2');
				WritePlaceFooter(md);
				return true;

			} else if (sType == "lauren2") {

				md = WritePlaceHeader();
				this.showPerson("lauren11c.jpg");
				addPlaceTitle(md, "Hotel Pool with Lauren");

				md.write(
					'<p>She blushes and adjusts her bikini top or at least the collection of strings that she is wearing and exposes her breasts completely. She stretches and says nervously,</p>' +
					'<p>"My..my..Lady has ordered...asked...me to tell you that I am to offer you any service you desire now I have delivered my message, <i>any desire</i>.."</p>' +
					'<p>She is clearly aroused but also very nervous, expecting and possibly wanting you to take her up on her offer of <i>any desire</i>, but also reluctant and uncertain.</p>'
				);
				startQuestions("Will you accept her offer?");
				addLinkToPlace(md, "certainly!", Place, 'type=lauren3');
				addLinkToPlace(md, "refuse and go to the Hotel Bar", 124, '', 'An odd mixture of expressions pass over Lauren&rsquo;s face as you refuse and start to leave, relief and disappointment. She softly says &quot;Thanks...I think&quot;');
				WritePlaceFooter(md);
				return true;

			} else if (sType == "lauren3") {

				md = WritePlaceHeader();
				this.setFlag(11);
				perYou.addCorruption(1);
				this.showPerson(perYou.isMaleSex() ? "lauren11db.jpg" : "lauren11dg.jpg");
				addPlaceTitle(md, "Lauren\'s Service");

				md.write(
					'<p>It would seem rude to refuse your ally and Lauren seems aroused and wants this too, she is just nervous. You tell her that you desire her, that this has nothing to do with her Lady, it is just your desire for her. You do not think she really believes you, but accepts your words.</p>' +
					'<p>She removes more of her \'swimsuit\' and makes a little bit of a show for you. She is clearly nervous still and is a little awkward as she displays herself.</p>' +
					'<p>You take her, she is passionate if awkward and uncertain at times. She is no virgin but a little inexperienced and despite her nerves orgasms quite strongly.</p>' +
					'<p>After, as she redresses in more normal clothes, you remember that at times her skin felt odd, and you swear you saw a faint glow when she orgasmed. As you are looking at her she blushes again, curtseys,</p>' +
					'<p>"' + perYou.getLord() + ' I must return to My Lady now", and she leaves the pool area.</p>'
				);

				startQuestions();
				addLinkToPlace(md, "go to the Hotel Bar", 124);
				WritePlaceFooter(md);
				return true;
			}			
			return false;
		}
		
		if (Place != 290) return false;

		// Guest Room at the mansion
		if (sType == "charmlauren1") {
			// Charm Lauren
			md = WritePlaceHeader();
			this.showPerson("lauren2.jpg");

			addPlaceTitle(md, "Guest Room");
			md.write(
				'<p>Giving her a bit of a smirk, you cross your arms and speak the simple syllables, &quot;Dai Chu Lauren!&quot;</p>' +
				'<p>A look of confusion flashes momentarily across her face as the first wave of desire lightly rises up within ' +
				'her, the power of the magic slowly causing her body to warm in spite of herself. Her lips suddenly dry, she takes ' +
				'a slow moment to lick them before resuming her hard stare, though the icy edge has dulled from across it, ' +
				'&quot;Look, take yourself and your sneezes somewhere else and I\'ll just forget about this, all right?&quot;</p>' +
				'<p>Even as she says this, her eyes are losing some of their determination, slowly losing focus as the force of ' +
				'the magic swells up within her. The mana slowly eating away ' +
				'at her resistance, yet she struggles, fighting against the sudden urges, eyes flashing with a confused anger as ' +
				'the sensations penetrate into the walls of her self-control, making her grow hotter and hotter. Finally, in a ' +
				'voice that almost trembles she manages to force out a command: &quot;Leave now! ... please...?&quot;</p>'
			);

			startQuestions();
			addLinkToPlace(md, "tell her to show her panties", Place, 'type=charmlauren2');
			addLinkToPlace(md, "exit the guest room", 192);
			WritePlaceFooter(md, "Script by EH");
			return true;
		}
		if (sType == "charmlauren2") {
			// Charm Lauren
			md = WritePlaceHeader();
			this.showPerson("lauren7.jpg");

			addPlaceTitle(md, "Guest Room");
			md.write(
				'<p>Sensing the tremor of uncertainty that had entered her voice, you decide to push things a bit further as you ' +
				'tell her to show you her panties. Almost immediately she balks, eyes flashing angrily at your outrageous demand ' +
				'while her body almost immediately turns and bends over, ' +
				'one hand sliding the skirt up. She wasn\'t wearing any panties ' +
				'underneath the abbreviated skirt. As she notices her actions, her eyes take a wild look, trying to force her ' +
				'hands to drop the skirt back down, only to find them resistant, not following her commands as they instead ' +
				'continue to hold it high giving you a nice, long show.</p>' +
				'<p>Finally, a slow smile builds across her face as the magic tightens its grip upon her mind, pulsing ' +
				'again, causing her to wonder what she had been so upset about to begin with.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "tell her to show you her breasts", Place, 'type=charmlauren3');
			addLinkToPlace(md, "exit the guest room", 192);
			WritePlaceFooter(md, "Script by EH");
			return true;
		}
		if (sType == "charmlauren3") {
			// Charm Lauren
			md = WritePlaceHeader();
			this.showPerson("lauren3.jpg");

			addPlaceTitle(md, "Guest Room");
			md.write(
				'<p>Seeing that the magic has increased its control over ' +
				'her, you tell her to drop her skirt down once more, then remove her top and hop on the counter.</p>' +
				'<p>As her hands eagerly move to carry out your command, her face loses its happy smile, her mind struggling free ' +
				'of the magic holding it for a moment, trying to escape ' +
				'the building fires of lust and submission. And, surprisingly for one who spends her days in the service ' +
				'of another, she fights back harder than any other you have yet enthralled. Still, her fight doesn\'t stop her ' +
				'instincts to obey, heightened by the magic of your spell, ' +
				'from quickly following any task you give it, her voice the only sign that she still resists as she crawls up onto the ' +
				'granite, kneeling there in her light stockings as she begins to slowly pull off her uniform.</p>' +
				'<p>&quot;S-stop.... Please...&quot; her eyes water as her ' +
				'voice breaks into a half sobbing plea, &quot;Please don\'t do this to me... please...&quot;</p>'
			);

			startQuestions();
			addLinkToPlace(md, "order her to submit to you", Place, 'type=charmlauren4');
			addLinkToPlace(md, "exit the guest room", 192);

			WritePlaceFooter(md, "Script by EH");
			return true;
		}
		if (sType == "charmlauren4") {
			// Charm Lauren
			md = WritePlaceHeader();
			this.showPerson("lauren8.jpg");

			addPlaceTitle(md, "Lauren");

			md.write(
				'<p>Her pleas fall on deaf ears as you become drunk with the tantalizing power you hold over her. Not even the ' +
				'wild pleading of her eyes reaches you, so lost is your mind in the sea of magic flowing from between your bodies. As ' +
				'you order her down upon all fours on the bed, you can see ' +
				'the magic asserting itself, the spell finalizing its hold upon her panicked mind.</p>' +
				'<p>Still slightly caught up in her own rebellion against the seemingly unstoppable force of the spell, she watches ' +
				'helplessly as you approach her. A broken groan escapes her lips as she finds herself responding to your touch, ' +
				'and she closes her eyes. Her body has already been lost to the ' +
				'crashing waves of sensation you send through her, pounding against her sense of self, slowly eroding it bit ' +
				'by bit, weakening her resolve as she grows slick with anticipation.</p>' +
				'<p>When you at last take her, the crash of pleasure carries away that last bit of resistance, smashing it ' +
				'into oblivion as she begins to return your use with a ' +
				'hungry enthusiasm, though when her eyes open again they carry of a note of resigned sadness.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "exit the guest room", 192);
			WritePlaceFooter(md, "Script by EH");
			return true;
		}			
		
		if (sType == "laurenplay") {
			// Repeat sex scene
			chc = Math.floor(Math.random() * 3);
			md = WritePlaceHeader();
			if (chc === 0) {
				if (isMurderPath()) this.showPerson("lauren5-day.jpg", "height:max");
				else this.showPersonDN("lauren5.jpg", "height:max");
			} else if (perYou.isMaleSex()) this.showPersonRandomRorX("lauren9b", isExplicit() ? 3 : 2);
			else this.showPersonRorX("lauren9g.jpg");

			addPlaceTitle(md, "Guest Room");
			md.write(
				'<p>"I am so proud to service you," claims the maid. She breathes faster as you take her in your arms. Without pause her lips meet yours to plunge her tongue into your mouth.</p>'
			);

			// Questions
			startQuestions();
			addLinkToPlaceC(md, "talk to Lauren", 290);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "laurentfplay") {
			// Repeat tf sex scene
			md = WritePlaceHeader();
			this.showPerson("sex-tfa.jpg");

			addPlaceTitle(md, "Service with her Breasts");
			md.write(
				'<p>"I am so proud to service you," claims the maid. She breathes faster as you take her in your arms. Without pause her lips meet yours to plunge her tongue into your mouth and then your cock between her breasts.</p>'
			);

			// Questions
			startQuestions();
			addLinkToPlaceC(md, "talk to Lauren", 290);
			WritePlaceFooter(md);
			return true;
		}		
		
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("poledance", 4);
		addPlaceTitle(md, "Lauren's Dance");
		md.write(
			'<p>Lauren takes the stage dressed in a version of exotic dancing wear, not that she keeps it on for long!</p>' +
			'<p>Lauren is a surprisingly experienced dancer and her large breasts and agile moves greatly appeal to the audience. Lauren seems to like the audience approval but in an awkwards way, she is a lot more focused on you than the general audience!</p>' +
			'<p>After she collects her tips and offers them to you, but you know Jade has a performance fee for you, and Lauren deserves her tips.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	// She is tried to be fed on
	per.fedUponEvent = function(perV) {
		if (perV.uid == "tina") return false;
		// Vampyre tries to feed on her
		var md = WritePlaceHeaderNIP(false, "", "black");
		this.setFlag(13);
		showPopupWindow("Feeding on Lauren",
			this.addPersonString("feedon.jpg", "height:max%", "right") +
			"You ask Sarah to allow Lilith to feed on Lauren, she hesitates but agrees. Lilith approaches Lauren and unusually she tears off Lauren's skirt exposing her lovely rear. Lauren cries out,</p><p>" +
			(isMurderPath() ? '"Please, no my Lady, please" and you call Lilith back. Lauren looks fearful and a little aroused, but she definitely does not wish to be fed upon!' 
								 : '"No! Never by that bitch, never!" and you call Lilith back. Lauren looks somewhat disgusted but still a little aroused. She was unusually forceful in her refusal!') +
			'</p><p>You decide it would be best to not try to have Lilith feed on her again'
		);
		WritePlaceFooter(md);
		return true;
	};
	
	// Can you chat with Lauren
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 269 && this.place == 269) addLinkToPlace(md, 'speak to Lauren', Place, 'type=lauren1');
		
		if (Place != 290 || !this.isHere() || sType !== "") return;
		
		if (!this.isCharmedBy()) return;
		
		addLinkToPlaceC(md, "ask Lauren for service", 290, 'type=laurenplay');
		if (perYou.isMaleSex()) addLinkToPlaceC(md, "ask Lauren for service with her breasts", 290, 'type=laurentfplay');

		this.addSleepLink(md, "go to bed for the night", "Sleeping with some Service",
			'<p style="position:absolute;left:25%;top:15%;cursor:pointer;font-size:1.1em;width:50%">' +
			'You start to prepare for bed and as you do you see the maid Lauren silently start to remove her clothing and their lies on the bed awaiting you, ready to serve you however you wish.', 
			Math.random() < 0.5 ? "lauren-bed1.jpg" : "lauren-bed2.jpg", true
		);
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Pool
			if (Place == 269 && this.place == Place) {
				addComments('You attempt to cast the spell on Lauren, but it does nothing as if Lauren cannot be affected by the spell.');
				return 'handled';
			}
			// Guest Room @ Gates Mansion (the maid)
			if (Place == 290) {
				if (isMurderPath()) {
					CastCharmSpell("Lauren", Place, 1, 'type=charmlauren1');
					return "handled";
				}
				else if (getQueryParam("type") == "escort") {
					// Lauren
					if (nMana > 9) {
						dispPlace(Place, "type=escort&charm=yes");
						return "nofooter";
					} else addComments('You do not have enough mana to cast the spell.');
				} else addComments('You read a spell.... but it fizzles.');
				return "handled";
			}
			
			if (Place == 18) {
				var marea = getQueryParam("area");
				var ws = wherePerson("Sarah");
				var so = getPersonOther("Sarah");
				if (marea == "appear") {
					addComments('You attempt to cast the spell on the maid Lauren, but it does nothing as if she cannot be affected by the spell.');
					return "handled";
				} else if ((ws == 17 && so == 101) || marea == "locked") {
					// Lauren initial meeting (completely uncharmable)
					addComments('You attempt to cast the spell the maid starts to react but then she shakes her head and touches a ring on one of her fingers. You realise she is protected in some way, a weak protection, but sufficient.');
					return "handled";
				} else {
					// Is Lauren here
					if (ws == 192 && (marea == "landing") || (so == 110 || so == 114 || so == 117 || so == 120)) {
						if (!(this.checkFlag(8) || perGates.checkFlag(3))) addComments('You attempt to cast the spell the maid starts to react but then she shakes her head and touches a ring on one of her fingers. You realise she is protected in some way, a weak protection, but sufficient.');
						else 	if (nMana > 9) {
							dispPlace(Place, "charm=yes");
							return "nofooter";
						} else {
							addComments('You do not have enough mana to cast the spell.');
							return "handled";
						}
					}
				}
				addComments('You attempt to cast the spell, but it fizzles.');
				return "handled";
			}
		}
		
		return "";		// do nothing
	};
}