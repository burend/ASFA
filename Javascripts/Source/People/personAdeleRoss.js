// Adele Ross
// Lady Elizabeth Ross, previous owner of the Mansion

function examinePainting()
{
	bChat = false;
	WriteComments('<table><tr><td style="vertical-align:top;width:40%"><img src="Images/amyancestor1.jpg" style="width:95%;" alt="Painting"></td><td><p>The painting is of a young woman, whom you assume is Lady Elizabeth Ross. She is holding a small book, and on the cover you can just make out some symbols, they look very much like those in the Sacred Book of Control!</p><p>The symbols are too fragmentary to reveal anything except that it appears Lady Elizabeth must have been a witch!</p></td></tr></table>');
}

function initialiseAdeleRoss()
{
	// Adele Ross
	addPerson("Adele Ross", 0, "Adele/Setting", '', false);
	
	per.getPersonNameShort = function() { return "Adele"; };

	per.getPersonAddress = function() { return this.getCharmedLevel() == 4 ? "5 Cherise Rd, Glenvale" : ""; };

	per.whereNow = function() {
		if (sType == "pretrance") return 901;
		if (Place == 439 && this.isCharmedBy() && this.place == 436) return Place;
		return this.place;
	};

	per.passTimeDay = function() {
		if (this.checkFlag(9) && !this.checkFlag(10) && (nTime - this.charmedTime) > 300) this.setFlag(10);
		if (this.getCharmedLevel() == 4 || (this.place == 436 && !this.isCharmedBy() && this.checkFlag(7) && isDay())) {
			this.place = 900;
			if (Place == 436 || Place == 439 || Place == 438) return (this.getCharmedLevel() == 4 ? 'Your slave ' : '') + 'Adele leaves to attend her duties as a police officer';
		}
		if (this.place == 999) this.place = 436;
		return '';
	};

	per.passTimeNight = function() {
		if (this.place == 900) {
			this.place = 436;
			if (Place == 436 || Place == 439 || Place == 438) return (this.getCharmedLevel() == 4 ? 'Your slave ' : '') + 'Adele returns home from her duties as a police ' + getOfficer(false) + ' and resumes her duties as your slave';
		}
		return '';
	};

	per.showEventPopup = function()
	{
		//  Meet Adele
		if (Place == 26 && !this.checkFlag(13) && checkPersonFlag("Catherine", 2) && !isSpellKnown("Charm")) {
			this.setFlag(13);
			showPopupWindow("Is That Adele?",
				this.addPersonString("meeting.jpg", "height:max%", "right") +
				"A woman is nearby, she has just been jogging and is taking a breather. She must be really fit to have come this far out! You admire her fit and curvaceous figure for a moment...</p>" +
				"<p>Wait a moment, isn\'t she Adele, Catherine and Amy\'s sister? You only met her once, and do not quite remember what she does or where she lives.</p>" +
				'<p>She looks at you with a smile, but there is an edge to it, like "That\'s enough pervert" but she does not say anything and resumes jogging back towards the town. You guess she did not recognise you, so again you admire her gorgeous figure as she jogs away.'
			);
			return true;
		}
		
		//  After she frees herself
		if (Place == 436 && this.isHere() && this.checkFlag(7) && !this.checkFlag(8)) {
			this.setFlag(8);
			showPopupWindow("Adele Back Home?",
				this.addPersonString("adele7.jpg", "height:max%", "right") +
				"<p>You see Adele is home from her shift as a police officer, this is despite her being charmed as your slave! She looks at you and you expect some major confrontation, and she smiles,<p>" +
				'<p>"Hi ' + perYou.getPersonName() + ' nice to see you. Catherine is in her room for once, sorry but Amy is staying with a friend and is not home now.". She waves and she walks away. Ummm..what was that?</p>' +
				'<p>Catherine joins you and explains,</p>' +
				'<p>"Adele seems a bit confused, she has forgotten about protecting Amy and myself, and about you and the slime Beasley. She just remembers you as a family friend, and bears no hostility to you. She seems to be staying here now and has taken one of the spare bedrooms. I tried to talk to her about magic and slaves, but she just refused to talk about it. I did catch her masturbating one time, and she just smiled at me. She has never been so open about sex before."</p>' +
				'<p>It would seem Adele has somehow been freed from the spell, but she is affected in some way, her memory is confused in some way and she probably still wants to protect her sisters but she is not sure from what. So she has decided to stay in the house for sometime.</p>'
			);
			return true;
		}
		if (sType == "recharmfail") {
			this.setFlag(9);
			this.charmedTime = nTime;
			setQueryParams();
			showPopupWindow("Trying to Charm Adele",
				this.addPersonString("adele7.jpg", "height:max%", "right") +
				"<p>You cast the spell again on Adele, but nothing happens, nothing at all! Adele does not seem to notice and but looks at you and smiles, so maybe she noticed a little.<p>" +
				'<p>You ask Catherine if she remembers anything more about how Adele seems to have freed herself,</p>' +
				'<p>"No nothing. Let me see if I can find anything. She is more talkative recently. I\'ll give you a call when I find something out."</p>' +
				'<p>You will have to leave it to Catherine to see what she can find.</p>'
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		var perCatherine;
		
		if (Place == 269 && sType == "adelepool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("adele-pool.jpg");
			addPlaceTitle(md, "Swimming with Adele");
			md.write(
				'<p>Adele arrives dressed in a bikini, you are alway impressed with her figure, well cleavage. You go for a pleasant swim with the police officer.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'say goodbye to Adele', Place);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "adelecall") {
			// Phone call, anywhere outside
			WaitHereOnly(1);
			md = WritePlaceHeader();
			this.showPerson("adele-call.jpg");
			addPlaceTitle(md, "Adele On-Call");
			md.write(
				'<p>Adele meets you in the open, she is on foot as well. As she arrives she starts to remove her clothing without you saying a word.</p>' +
				'<p>It is a bit too public here so you instruct her to get dressed again, and she asks how she can help you? You just explain that you wanted to see her and there was nothing in particular you wanted.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'let Adele return to her duties', Place);
			WritePlaceFooter(md); 
			return true;
		}

		if (Place == 438) {
			if (sType == "catherineadelethreesome1") {
				// Threesome (start)
				md = WritePlaceHeader();
				if (isExplicit()) this.showPersonRandomX("adelecatherine", isBritish() ? 1 : 2);
				else this.showPerson("adelecatherine" + (isBritish() || !isCharmedBy("Catherine") ? "" : "c") + ".jpg");
				addPlaceTitle(md, "Watching Catherine and Adele");
				md.write(
					'<p>You call Adele to join Catherine and yourself. You tell Adele to put on a show for you with Catherine. You know there is no need to ask Catherine, she is always interested and loves to play with Adele.</p>' +
					'<p>As always Catherine takes the lead, making Adele pleasure her. Adele obeys to Catherines considerable enjoyment.</p>' +
					'<p>You wonder if this is from their family dynamic, Adele had seemed quite controlling before, and did not seem to get on well with Catherine.</p>'
				);
				startQuestionsOnly();
				addLinkToPlaceC(md, 'join them', Place, 'type=catherineadelethreesome2');
				addLinkToPlace(md, 'leave the bedroom', 436);
				addLinkToPlace(md, 'leave the house', 37);
				WritePlaceFooter(md);
				return true;
			}
			if (Place == 438 && sType == "catherineadelethreesome2") {
				// Threesome
				if (!isExplicit()) {
					md = WritePlaceHeader(false, isBritish() ? 'td-left-med' : '');
					this.showPerson("adelecatherineyou.jpg");
				} else if (perYou.isMaleSex()) {
					md = WritePlaceHeader(false, 'td-left-large');
					if (isBritish()) this.showPersonRandomX("adelecatherineyou-b", 2);
					else this.showPersonX("adelecatherineyou-b.jpg");
				} else {
					md = WritePlaceHeader(false, isBritish() ? 'td-left-large' : '');
					this.showPersonX("adelecatherineyou-g.jpg");
				}
				addPlaceTitle(md, "Catherine, Adele and You");
				md.write(
					'<p>You decide that is enough, it is time to get involved in this, how can you resist these two buxom and beautiful sisters!</p>'
				);
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You have a threesome with Catherine and Adele.</p>'
					);
				} else {
					md.write(
						'<p>You have a threesome with Catherine and Adele.</p>'
					);
				}
				startQuestionsOnly();
				addLinkToPlace(md, 'leave the bedroom', 436);
				addLinkToPlace(md, 'leave the house', 37);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 439) {
			// Her bedroom
			if (sType == "adelebj") {
				// Blowjob/lick
				if (isBritish()) {
					// UK
					md = WritePlaceHeader();
					if (!isExplicit()) {
						if (perYou.isMaleSex()) this.showPerson("adele-bedroom-sex-bjb.jpg");
						else this.showPerson("adele-bedroom-sex-bjg.jpg");
					} else {
						if (perYou.isMaleSex()) this.showPersonRandomX("adele-bedroom-sex-bjb", 3);
						else this.showPersonRandomX("adele-bedroom-sex-bjg", 3);
					}
				} else {
					// US
					if (!isExplicit()) {
						md = WritePlaceHeader();
						if (perYou.isMaleSex()) this.showPerson("adele-bedroom-sex-bjb.jpg");
						else this.showPerson("adele-bedroom-sex-bjg.jpg");
					} else {
						md = WritePlaceHeader();
						if (!perYou.isMaleSex()) this.showPerson("adele-bedroom-sex-bjg.jpg");
						else this.showPersonRandomX("adele-bedroom-sex-bjb", 5);
					}
				}
				if (perYou.isMaleSex()) {
					addPlaceTitle(md, "Adele");
					md.write(
						'<p>Adele gives you a blowjob.</p>'
					);

				} else {
					addPlaceTitle(md, "Adele");
					md.write(
						'<p>Adele licks you.</p>'
					);
				}
				// Questions
				startQuestions();
				addLinkToPlace(md, 'leave the bedroom', 436);
				addLinkToPlace(md, 'leave the house', 37);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "adelefuck") {
				// fuck her
				if (!isExplicit()) {
					md = WritePlaceHeader();
					if (perYou.isMaleSex()) this.showPerson("adele-bedroom-sex-fuckb.jpg");
					else this.showPerson("adele-bedroom-sex-fuckg.jpg");
				} else {
					md = WritePlaceHeader();
					if (isBritish()) {
						// UK
						if (perYou.isMaleSex()) this.showPersonRandomX("adele-bedroom-sex-fuckb", 2);
						else this.showPersonRandomX("adele-bedroom-sex-fuckg", 2);
					} else {
						// US
						if (perYou.isMaleSex()) this.showPersonRandomX("adele-bedroom-sex-fuckb", 6);
						else this.showPerson("adele-bedroom-sex-fuckg.jpg");
					}
				}
				if (perYou.isMaleSex()) {
					addPlaceTitle(md, "Adele");
					md.write(
						'<p>You fuck Adele.</p>'
					);

				} else {
					addPlaceTitle(md, "Adele");
					md.write(
						'<p>Adele and you have a 69</p>'
					);
				}
				// Questions
				startQuestions();
				addLinkToPlace(md, 'leave the bedroom', 436);
				addLinkToPlace(md, 'leave the house', 37);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "adeletf") {
				// tit-fuck her
				md = WritePlaceHeader();
				if (!isExplicit()) this.showPerson("adele-bedroom-sex-tf.jpg");
				else this.showPersonRandomX("adele-bedroom-sex-tf", isBritish() ? 3 : 4);

				addPlaceTitle(md, "Adele");
				md.write(
					'<p>You fuck Adele\'s large breasts.</p>'
				);

				// Questions
				startQuestions();
				addLinkToPlace(md, 'leave the bedroom', 436);
				addLinkToPlace(md, 'leave the house', 37);
				WritePlaceFooter(md);
				return true;
			}
			return false;
		}

		if (Place !== 436) return false;

		if (sType == "trance") {
			// Put her into a trance
			perCatherine = findPerson("Catherine");
			AddMana(-1);
			md = WritePlaceHeader();
			this.showPerson("adele8.jpg");
			addPlaceTitle(md, "Adele In a Trance");
			if (isBritish()) {
				md.write(
					'<p>Catherine leads you to a small room that is set aside as a library. It has books from many generations of the family, from old dusty tomes, to trashy romance novels. If you did not already know you would thing the romance novels were Catherine\'s but some time ago Amy confessed having a guilty pleasure reading trashy novels.</p>' +
					'<p>You see Adele is there reading a book, one of the old tomes but as you enter the room she closes the book and stands, looking at you curiously as if to ask "why are you here?"</p>' +
					'<p>Before she asks you call out "Look an Aardvark" and grab her arm and use the magically augment hypnotic technique. Instantly she falls into a trance.</p>'
				);
			} else {
				md.write(
					'<p>Catherine leads you to a large very white bathroom and you see Adele in in her black underwear putting on her make-up. You are quite impressed by the display of her impressive cleavage.</p>' +
					'<p>You touch her elbow and say "It\'s raining cucumbers" and use the magically augment hypnotic technique. Instantly she falls into a trance.</p>'
				);
			}
			md.write(
				'<p>She starts to some words, they sound a little like those from the Book, but they are incoherent. You start talking to her in a firm and measured way, focusing her attention on you. Using the methods you learned of hypnosis you talk to her about her self-hypnosis and what she was doing. She answers quickly, she must be very easy to hypnotise,</p>' +
				'<p>"It helps me to focus on my objectives and cut though distractions"</p>' +
				'<p>That is it, you need now the cast the spell and use this hypnotic state and her words here to shape her mind to your desires.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'or you could let the trance end', 37);
			AddPeopleColumn(md);
			perCatherine.showPerson(perCatherine.isCharmedBy() ? "catherine-watching1c.jpg" : "catherine-watching1.jpg");
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmadele2x1") {
			// Charm 2, step 1
			perCatherine = findPerson("Catherine");
			md = WritePlaceHeader(false, !isBritish() ? 'td-left-med' : '');
			this.showPerson("adele9.jpg");
			addPlaceTitle(md, "Adele Under A Hypnotic Charm Spell");
			md.write(
				'<p>You are certainly not going to pass up this opportunity by letting the trance end, so you cast the charm spell again on Adele. She definitely reacts, and you see her eyes begin to take on a green tint, but she starts to say the words again like a mantra.</p>' +
				'<p>You calmly interrupt, continuing the hypnotic trance and talking to her about the objectives she mentioned. She starts to talk about protecting her sisters, and you reassure her that they are safe and you will ensure they are always protected. She sighs and starts to say how she has to protect them, and you instead talk to her about her desires aside from this.</p>' +
				'<p>Adele says, "Learn magic like Lady Elizabeth and use it to defend my family". Again you ask what else she wants, she is not only a police officer, a protector, she is also a woman with desires and wants. You emphasise this as hopefully the arousal of the spell is affecting her.</p>' +
				'<p>Adele reacts strongly, "I am not a slut like Catherine...but I do have desires..." '
			);
			if (isBritish()) {
				md.write(
					' Adele undoes her skirt and it drops to the floor, then she opens her top to remove it. For someone who looked so prim and proper as she was reading, her underwear and stockings are rather sexy. Her nickers are almost transparent!</p>'
				);
			} else {
				md.write(
					'Adele almost collapses and kneels on the bathroom floor, one hand tracing along her very ample cleavage.</p>'
				);
			}
			md.write(
				'<p>Catherine starts to speak, in her defense or to argue, it does not matter what. You gesture for her to stop, you need Adele to focus on you and only you. Catherine stops after a few words.</p>' +
				'<p>You continue talking calmly and firmly to maintain the hypnotic trance, and you talk more about her desires. Clearly Catherine\'s sexuality, or over-sexuality, is a sore point for Adele. You focus on her desires and lusts and <i>never</i> mention protecting anyone.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Adele listens', 436, 'type=charmadele2x2');
			AddPeopleColumn(md);
			perCatherine.showPerson(perCatherine.isCharmedBy() ? "catherine-watching1c.jpg" : "catherine-watching1.jpg");
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmadele2x2") {
			// Charm 2, step 2
			perCatherine = findPerson("Catherine");
			md = WritePlaceHeader(false, !isBritish() ? 'td-left-med' : '');
			this.showPerson("adele10.jpg");
			addPlaceTitle(md, "Adele Under A Hypnotic Charm Spell");
			md.write(
				'<p>You build on the talk of her desires and her needs and directly talk about her <b>sexual</b> desires and needs.</p>' +
				'<p>You can immediately see the spell is fully affecting her and the arousal of the magic is flooding through her body.</p>'
			);
			if (isBritish()) {
				md.write(
					'<p>Adele pulls off her bra and sits on the desk she was just earlier at reading. She cries out as her body shudders in an involuntary orgasm and she slumps against the bookshelf.</p>'
				);
			} else {
				md.write(
					'<p>Adele grasps her breasts and leans back against the bathroom wall. She cries out as her body shudders in an involuntary orgasm and she slumps against the wall.</p>'
				);
			}
			md.write(
				'<p>You push on in the afterglow of her orgasm, telling her about how she can rely on you to protect <b>her</b> and all she has to do is agree to be your <i>slave</i>, your lovely and beautiful <i>slave</i>.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Adele agrees', 436, 'type=charmadele2x3');
			AddPeopleColumn(md);
			perCatherine.showPerson(perCatherine.isCharmedBy() ? "catherine-watching2c.jpg" : "catherine-watching2.jpg");
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmadele2x3") {
			// Charm 2, step 3
			perCatherine = findPerson("Catherine");
			this.setFlag(12, false);
			md = WritePlaceHeader(false, !isBritish() ? 'td-left-med' : '');
			this.showPerson("adele11.jpg");
			addPlaceTitle(md, "Adele Under A Hypnotic Charm Spell");
			if (isBritish()) {
				md.write(
					'<p>Adele removes the rest of her clothing and looks at you, "Yes ' + perYou.getMaster() + '"</p>'
				);
			} else {
				md.write(
					'<p>Adele leans towards you almost on all fours, and her breasts almost falling out of her bra, "Yes ' + perYou.getMaster() + '"</p>'
				);
			}
			md.write(
				'<p>You have her, she is your slave and you doubt she will get free again. The hypnosis should of reinforced your control to the level that she cannot break it. She respectfully asks you,</p>' +
				'<p>"' + perYou.getMaster() + ', being a Police ' + getOfficer() + ' is important to me, and in my duties may be able to help you. You can <b>call me</b> anytime you need me. May I keep my duties and also stay in the police?" You consider for a moment and Catherine adds in,</p>' +
				'<p>"' + perYou.getPersonName() + ', Adele has always loved being in the police, please allow it". You were not really considering refusing, another police-slave seems an excellent idea. You pretend reluctance,</p>' +
				'<p>"Well Adele, you will have to do something to pay for this. Alright, you must be naked when at home <b>always</b>, and of course...." You start removing your clothing.</p>' +
				'<p>Catherine tries something as she says, "Obey me as well as ' + perYou.getPersonName() + '!". You look to see if Adele objects but she just looks at you, and you allow Catherine this, "Yes, obey Catherine"<p>' +
				'<p>You take Adele for the first time, finally she allows you to satisfy yourself with her body. As you step away Catherine says "Now for my turn"</p>'
			);
			startQuestions();
			addPopupLinkToPlace(md, 'let Catherine enjoy Adele and then talk to them', 436, '', 'Catherine\'s Turn', 
				this.addPersonStringRorX("adelecatherine" + (isBritish() || isExplicit() ? "" : "c") + (isExplicit() ? "a" : "") + ".jpg", "height:max%", "right") +
				"Dutifully Adele kneels to service her sister, this is not something she is doing out of passion, but to obey her " + perYou.getMaster() + ".</p>" +
				'<p>Catherine on the other hand delights in her sisters attention, joyfully orgasming from Adele\'s tongue and fingers. You can see she would happily continue but as you as here she redresses, telling Adele, \"Later, much more later\"'
			);
			AddPeopleColumn(md);
			perCatherine.showPerson(perCatherine.isCharmedBy() ? "catherine-watching3c.jpg" : "catherine-watching3.jpg");
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "pretrance" || (Place == 436 && this.isHere() && this.checkFlag(11) && !this.isCharmedBy())) {
			setQueryParams("type=pretrance");
			perCatherine = findPerson("Catherine");
			md = WritePlaceHeaderNIP();
			perCatherine.showPerson(perCatherine.isCharmedBy() ? "catherine-watching4c.jpg" : "catherine-watching4.jpg");
			addPlaceTitle(md, "Catherine and Adele");
			md.write(
				'<p>Catherine greets you, and tells you Adele is in the '
			);
			if (isBritish()) md.write('library reading some old books');
			else md.write('bathroom getting ready to go out with some friends');
			md.write(
				' and asks if you are ready? Catherine being who she is gives you a flash of her underwear, silently asking if you are ready for her too.</p><p>'
			);
			if (perYou.checkFlag(25)) {
				if (nMana > 10) md.write('You are sure you are and tell Catherine to lead you to Adele.</p>');
				else md.write('You are sure you could, if you had enough mana.</p>');
			} else {
				md.write('You have nothing else than the normal charm spell so there is no use in trying anything now.');
				if (perYou.checkFlag(24)) md.write(' While you know the basics of hypnosis, you doubt Adele would let you take all that time to put her into a trance. You need something different, faster...');
				md.write('</p>');
			}

			startQuestions();
			if (perYou.checkFlag(25) && nMana > 10) addLinkToPlace(md, 'hypnotise Adele', 436, 'type=trance');
			addLinkToPlace(md, 'not now', 37);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "initialmeeting" || (Place == 436 && this.isHere() && !this.checkFlag(5))) {
			setQueryParams("type=initialmeeting");
			this.setFlag(5);
			perYou.startQuest(8);
			md = WritePlaceHeaderNI();
			this.showPerson("adele2.jpg");
			addPlaceTitle(md, "Adele Protecting Her Sisters");

			if (wherePerson("Catherine") == 436) {
				md.write(
					'<p>You decide to visit Amy and Catherine to see how they are after the incident with Mr. Beasley, so you knock on the door. There is a brief delay and the door is opened by a police officer, for a moment you feel worried for them, but you immediately recognise her as their older sister Adele. She looks at you suspiciously,</p>' +
					'<p>"Hello...ummm..' + perYou.getPersonName() + ', we are not receiving visitors, please leave."</p>' +
					'<p>She then gestures for you to leave the house, but you ask after Amy and Catherine telling her you know they were...had a problem with Mr. Beasley,</p>' +
					'<p>"Catherine told me when she returned home that something strange happened. I called Amy, and she just told me to speak to Catherine, but that you had helped them."</p>' +
					'<p>She looks at you uncertain,</p>' +
					'<p>"Still, for now you cannot see them, I want to keep them safe from any other sort of magical assault."</p>' +
					'<p>What, did she say magical? She notices your reaction, and smiles,</p>' +
					'<p>"Did you think I am ignorant of the ways of magic? Or that you are a novice ' + perYou.getWitch() + '? People now days dismiss magic as a thing of fairy tales and fiction, but I am a descendant of Lady Elizabeth Ross, a sorceress of power. Some of her secrets were passed down through the years, my sisters ignored these, more interested in school or sex. I did not, especially when I found about some rare crimes of sorcery and that there was no way to prosecute them."</p>' +
					'<p>She touches her earring, "I am well protected, and I will protect my sisters from slavery, either by a lecherous teacher, or a lustful friend!"</p>' +
					'<p>You try to argue you were just concerned for your friends, but she clearly does not believe your <i>lie</i>.</p>'
				);
			} else {
				md.write(
					'<p>You decide to visit Amy and Catherine as you overheard their sister Adele concerned for Amy, so you knock on the door. There is a brief delay and the door is opened by a police officer, for a moment you feel worried, but you immediately recognise her as the older sister Adele. She looks at you suspiciously,</p>' +
					'<p>"Hello...ummm..' + perYou.getPersonName() + ', I am busy at the moment, please leave."</p>' +
					'<p>She then gestures for you to leave the house, but you ask after Amy, saying you heard there was a problem,</p>' +
					'<p>"Yes, there is, I heard from Amy at work but that issue should be sorted now."</p>' +
					'<p>She looks at you uncertain,</p>' +
					'<p>"Still, for now it is best that you do not see Amy or Catherine, I want to keep them safe from any other sort of magical assault."</p>' +
					'<p>What, did she say magical? She notices your reaction, and smiles,</p>' +
					'<p>"Did you think I am ignorant of the ways of magic? Or that you are a novice ' + perYou.getWitch() + '? People now days dismiss magic as a thing of fairy tales and fiction, but I am a descendant of Lady Elizabeth Ross, a sorceress of power. Some of her secrets were passed down through the years, my sisters ignored these, more interested in school or sex. I did not, especially when I found about some rare crimes of sorcery and that there was no way to prosecute them."</p>' +
					'<p>She touches her earring, "I am well protected, and I will protect my sisters from slavery, either by a lecherous teacher, or a lustful friend!"</p>' +
					'<p>You try to argue you were just concerned for Amy, but she clearly does not believe your <i>lie</i>.</p>' +
					'<p style="font-size:small">nothing more available yet for the Ross sisters</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, "leave the house", 37);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmadele1x1") {
			// Charm 1, step 1
			perCatherine = findPerson("Catherine");
			md = WritePlaceHeader();
			this.setFlag(6);
			this.setFlag(12, false);
			this.showPerson("adele3.jpg");
			addPlaceTitle(md, "Adele Under A Charm Spell");
			md.write(
				'<p>You recite the spell and Adele looks at you annoyed,</p>' +
				'<p>"I told you before, I am protec...ted...what...you ' + (perYou.isBornMale() ? 'bastard' : 'bitch') + '! How..."</p>' +
				'<p>You notice Catherine has entered the room, just dressed in a nightie, looking quite pleased. You decide to try to make things a little easier for them, and tell Adele a lie,</p>' +
				'<p>"Yes, I worked out how to bypass your protection, so stop questioning how, and accept that you are now my slave!"</p>' +
				'<p>Catherine cannot help commenting, "Slave to ' + (perYou.isBornMale() ? 'his cock' : 'her pussy') + '!". You look at her a bit annoyed.</p>' +
				'<p>You look back at Adele and you see she has pulled down the top of her uniform, the spell is taking effect, <b>but</b> you cannot see any effect in her eyes...</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Adele struggles...', 436, 'type=charmadele1x2');
			AddPeopleColumn(md);
			perCatherine.showPerson(perCatherine.isCharmedBy() ? "catherine-watching1c.jpg" : "catherine-watching1.jpg");
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmadele1x2") {
			// Charm 1, step 2
			perCatherine = findPerson("Catherine");
			md = WritePlaceHeader();
			this.showPerson("adele4.jpg");
			addPlaceTitle(md, "Adele Under A Charm Spell");
			md.write(
				'<p>Adele knows what is happening to her and is struggling against the spell, trying to ignore you as you try to instruct her and shape the spell. Catherine meanwhile calls out,</p>' +
				'<p>"Adele, Adele, calm down, it will be fun and you will make a lovely sex-toy!", you look at her, "Catherine, you are not helping!"</p>' +
				'<p>Adele has been unable to resist part of the effects and has removed some more of her clothing, and she looks at you, a mixture of lust and hatred,</p>' +
				'<p>"I am not a sex-toy, I am a Police ' + getOfficer() + ' and I will arrest you for this...but first I have to...No! I do not have to, I am not like \'Cat in Heat\' there". A nickname for Catherine you guess, and then Catherine confirms,</p>' +
				'<p>"Ice Queen Adele, I told you not to call me that, how about we call you..", and you interrupt, it is for you to shape this, not Catherine,</p>' +
				'<p>"Enough Catherine, Adele is mine to shape and use as I want"</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Adele looks at you with hatred', 436, 'type=charmadele1x3');
			AddPeopleColumn(md);
			perCatherine.showPerson(perCatherine.isCharmedBy() ? "catherine-watching2c.jpg" : "catherine-watching2.jpg");
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmadele1x3") {
			// Charm 1, step 3
			perCatherine = findPerson("Catherine");
			md = WritePlaceHeader();
			this.showPerson("adele5.jpg");
			addPlaceTitle(md, "Adele Under A Charm Spell");
			md.write(
				'<p>Adele looks at you in hatred and is about to say something but you stop her,</p>' +
				'<p>"Quiet slave! Your lust and desire for me is all that matters now. Pleasuring my body is all you need to work on, and your only duty"</p>' +
				'<p>Adele removes more of her clothing, and starts to kneel, reaching out towards your pants, but she pulls back. She is firmly under the spell, but she is still resisting. Again you try to make her submit sexually, but again she almost does but pulls back. You decide you may have to leave it for now.</p>' +
				'<p>Catherine looks at you seductively, "You can always have me instead! I will talk to Adele and convince her that everything is ok and to accept her place, under you, <i>and me</i>"</p>' +
				'<p>Alright, it is a matter of time before Adele submits, and Catherine should be able to help, you will have to check back at a later time.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"have" Catherine', 438, 'type=catherinefuck');
			addLinkToPlaceC(md, 'talk to the sisters', 436);
			AddPeopleColumn(md);
			perCatherine.showPerson(perCatherine.isCharmedBy() ? "catherine-watching3c.jpg" : "catherine-watching3.jpg");
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("poledance", 2);
		addPlaceTitle(md, "Adele's Dance");
		md.write(
			'<p>Adele is wearing a sort of club outfit as she steps on stage, more the sort of thing Catherine would wear out. You wonder if Adele borrowed it from her but Adele is well endowed, but so is Catherine and when you think of it Amy too. Large breasts must run in their family and you are grateful for that!.</p>' +
			'<p>Adele is smiling as she often does, and she strips for you and everyone else. Her figure, well large breasts, make her a popular dancer, but you get the feeling she is doing this for you as your loyal slave, not any other reason.</p>' +
			'<p>After she sits with you for a while, attentive to you but she seem quite familiar with the place. You wonder if it is in her role as a police officer?</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 436 && this.isHere() && (sType === "" || sType == "gabbyaskadele2" || sType == "gabbyaskadele3")) {
			if (this.isCharmedBy()) {
				gameState.plcTitle = "Adele, your Slave";
				if (this.checkFlag(7) && this.getCharmedLevel() == 4) return this.showPerson("adele12.jpg", '', '', '', '', false, "string");
				else return this.showPerson("adele6.jpg", '', '', '', '', false, "string");
			}
			if (this.checkFlag(7)) {
				gameState.plcTitle = "Adele is Home";
				return this.showPerson("adele7.jpg", '', '', '', '', false, "string");
			}
			gameState.plcTitle = "Adele Protecting Her Sisters";
			return this.showPerson("adele2.jpg", '', '', '', '', false, "string");
		}
		if (Place == 439 && this.isHere() && sType === "") {
			// Adele's bedroom
			return this.showPersonRandom("adele-bedroom", 2, '', '', '', '', 0, false, "string");
		}		
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 436 && sType === "" && this.isHere()) {
			if (this.isCharmedBy()) {
				// Charmed
				if (this.checkFlag(7)) md.write('<p>Adele is waiting here, naked and accepting of her role in the house.</p>');
				else md.write('<p>Adele is waiting here, looking troubled and completely naked.</p>');

			} else {
				// Here and un-charmed
				if (this.checkFlag(7)) {
					md.write('<p>Adele is home from her duties');
					if (isVisible()) {
						md.write(
							', and in passing comments,</p>' +
							'<p>"Hi there ' + perYou.getPersonName() + ', here to see Catherine again? Sorry, Amy is not home, <i>still</i>"'
						);
					};
					md.write('.</p>');
				} else md.write('<p>Adele is still here, barring you from visiting her sisters.</p>');
			}
		} else if (Place == 439 && sType === "") {
			if (this.place != 436) md.write('<p>Adele\'s bedroom, or at least the room she is using now, is neat and tidy. On her bedside table is a book of the occult, a work describing practises and rituals. Nothing on par with the Book!</p>');
			else {
				if (isVisible()) {
				md.write(
						'<p>Adele kneels on her bed,</p>' +
						'<p>"' + perYou.getMaster() + ', how can I serve you?”</p>'
					);
				}
			}
			if (!this.isHere() && !checkPlaceFlag("CheriseRd", 4)) setPlaceFlag("CheriseRd", 3);
			if (checkPlaceFlag("CheriseRd", 3) && !checkPlaceFlag("CheriseRd", 4)) {
				md.write('<p style="clear:both">');
				AddImage("UI/books/kybalionbook.jpg", "20%", "left", '', '', undefined, md, 'none');
				md.write('Adele has many other books on occult topics but few attract your attention, only one seems possibly interesting, you think you have heard of it, "The Kybalion".</p>');
			}
		}
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if ((Place != 436 && Place != 439) || sType !== "") return;

		if (!checkPersonFlag("Catherine", 11)) return;

		if (this.place !== 900 && this.place != 999 && !this.checkFlag(12)) {
			if (this.isCharmedBy()) {
				if (this.getCharmedLevel() == 1) {
					addQuestionR(md, 'ask Adele about Amy',
						'You ask Adele about where is Amy, but she just shakes her head. You are not sure if this means she does not know or will not answer.</p>',
						"AdeleRoss",
						"setPersonFlag(\\'AdeleRoss\\',12)"
					);
				} else {
					addQuestionR(md, 'ask Adele about Amy',
						'You ask Adele about where is Amy? She answers</p>' +
						'<p>&quot;' + perYou.getMaster() + ', I have spoken to her on the phone and once in person. She is staying with her employer Charlie. She claimed to not trust Catherine and was in fear of Mr. Beasley. She asked me to thank you for your help, whatever it was you did.&quot;</p>' +
						'<p>Alright, you will have to check at the Gym for this Charlie! You have not heard Amy mention her bosses name before, but she has mentioned liking them, but not \'that way\'</p>',
						"AdeleRoss",
						"setPersonFlag(\\'AdeleRoss\\',12);setPersonFlag(\\'Charlie\\',3);movePerson(\\'Charlie\\',435);"
					);
				}
			} else {
				addQuestionR(md, 'ask Adele about Amy',
					'You ask Adele about where is Amy? She answers casually,</p>' +
					'<p>&quot;Amy? I think she is at work, don\'t worry she will be home soon&quot;</p>' +
					'<p>Her memory must be confused, she does not realise Amy has left and seems to be hiding.</p>',
					"AdeleRoss",
					"setPersonFlag(\\'AdeleRoss\\',12)"
				);
			}
		}
		if (Place == 439 && checkPlaceFlag("CheriseRd", 3) && !checkPlaceFlag("CheriseRd", 4) && sType === "") {
			addPopupLinkC(md, 'read the book', "The Kybalion",
				"<p><img src='UI/books/kybalionbook.jpg' style='width:30%;float:right;margin-left:5px' alt='Book'>" +
				'You pick up the book try reading it, it is hard going! It describes the seven principals of Hermetic Philospphy and should be something you enjoy. Actually you found it uninteresting with clues and glimpses of useful knowledge. Despite this you finish the book and put it down, never to read it again!',
				false, "setPlaceFlag('CheriseRd',4);WaitHere(6)");
		}
		if (Place == 439 && this.isHere()) {
			if (perYou.isMaleSex()) {
				addLinkToPlace(md, 'take her', 439, 'type=adelefuck');
				addLinkToPlace(md, 'take her mouth', 439, 'type=adelebj');
				addLinkToPlace(md, 'enjoy her breasts', 439, 'type=adeletf');
			} else {
				addLinkToPlace(md, 'tell her to lick you', 439, 'type=adelebj');
				addLinkToPlace(md, 'lick each other', 439, 'type=adelefuck');
			}
			this.addDancingLink(md, 'tell Adele to dance for you in the club',
				'You ask Catherine about dancing at the Avernus club and she quickly answers,</p>' +
				'<p>&quot;I have before and I will again, so definitely ' + this.getYourNameFor() + '!&quot; and with that you call Jade to arrange a dance for Catherine. Jade welcomes Catherine to dance anytime.'
			);	
			this.addSleepLink(md, "sleep with Adele", "Sleeping with Adele",
				'<p style="position:absolute;left:2%;top:85%;cursor:pointer;font-size:1.1em;width:66%">You tell Adele that you will spend the night with her.',
				'adele-sleep.jpg', true, 436
			);
		}
	};


	// Cast a spell/use an item
	per.handleItem = function(no, cmd)
	{
		if (cmd != 2) return "";

		// Casting the charm spell
		if (no == 14) {
			// Guarding the Mansion, Gates Estate Blocked
			if (Place == 21) {
				if (isMurderPath()) {
					if (!isSpellKnown("Shielded Charm")) addComments("There are a couple of other officers around doing some work on the scene, it is just too public.");
					else addComments("You attempt to cast the spell and nothing happens. You notice the " + getOfficer() + "absently scratch one of her ears and you see a glint of an earring.");
				} else addComments("You attempt to cast the spell and nothing happens. You notice the " + getOfficer() + " absently scratch one of her ears and you see a glint of an earring.");
				return "handled";
			}
			// Ross House
			else if (Place == 436) {
				var perCatherine = findPerson("Catherine");
				// Before Catherine's help
				if (this.isHere() && !perCatherine.checkFlag(10)) {
					addComments("You attempt to cast the spell and nothing happens. You notice Adele absently scratch one of her ears and you see a glint of an earring.");
					return "handled";
				}
				// first charm attempt
				if (this.isHere() && perCatherine.checkFlag(10) && !this.isCharmedBy() && !this.checkFlag(7)) {
					CastCharmSpell("AdeleRoss", 436, 1, 'type=charmadele1x1');
					return "handled";
				}
				// first charm attempt
				if (this.isHere() && perCatherine.checkFlag(10) && !this.isCharmedBy() && this.checkFlag(7)) {
					if (sType == "trance") CastCharmSpell("AdeleRoss", 436, 4, 'type=charmadele2x1');
					else if (!this.checkFlag(9)) {
						dispPlace(436, 'type=recharmfail');
						return "nofooterrefresh";
					} else 	addComments("Once again the spell fails, you will need something different to charm her.");
					return "handled";
				}
			}
		}
		return "";		// do nothing
	};

	// Phone calls
	per.isPhoneable = function() {
		// Can you call them?
		return this.place == 900 || (checkPlaceFlag("Hotel", 11) && Place == 269 && this.isCharmedBy());
	};

	per.callThem = function() {
		if (Place == 269) {
			gotoPlace(Place, 'type=adelepool');
			receiveCall('', 'You call Adele to invite her to join you at the pool for a swim, and she happily agrees.');
			WriteCommentsFooter(bChat, bChatLeft);
		}		
		if (isOutside()) {
			gotoPlace(Place, 'type=adelecall');
			receiveCall('',
				'You call Adele, and she answers promptly, promising to be there soon.<br><br>' +
				'15 minutes later she arrives...'
			);
			WriteCommentsFooter(bChat, bChatLeft);
		} else {
			receiveCall('', 'You call Adele but you are getting a bad signal, maybe try again outside?');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};

	per.addPersonPhoneCall = function() {
		if (Place != 436 && Place != 438 && this.checkFlag(6) && !this.checkFlag(7) && Math.random() < 0.1 && getHour() < 9 && getHour() > 6 && this.hoursCharmed() > 9) {
			// SMS when she gets free again, this is actually a SMS from Catherine
			if (makeCall(true, 166)) {
				this.unCharmThem();
				this.setFlag(7);
				this.setFlag(12, false);
			}
		}
		if (Place != 436 && Place != 438 && this.checkFlag(10) && !this.checkFlag(11)) {
			// SMS when Catherine works out, again actually from Catherine
			if (makeCall(true, 167)) this.setFlag(11);
		}
		return false;
	};

	per.isSMSImageDressVersion = function(id) { return true; };
	
	per.getPersonSMS = function(id) {
		// Actually from Catherine but use Adele's image
		if (id == 166) return receiveSMS('Catherine', perYou.getPersonName() + ' Adele is acting strange, she just went to work. She seems to have forgotten what you did. This is her getting ready for work. Don\'t know where she is, check back tonight', 'sms1.jpg');
		return '';
	};
}
