/****************************************************************
		Miss Logan (Biology Teacher)
****************************************************************/

// Timed event to auto-select assignment 'Neurology' if you do not answer
function LoganAssignment()
{
	var perL = findPersonNC("MissLogan");
	if (perL.other == 1) {
		perL.other = 5;
		perL.setFlag(9);
		perL.place = 9999;
		PlaceI(5, 141);  // Place a stone in the sacred clearing
	}
}

function RepliesMissLogan(nR)
{
	//var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 1)
	{
		bChat = false;
		addComments(
			per.addPersonFace() +
			'<p>"Good, I wish you luck with the project, not my favourite topic. Why don\'t you come to class later and I\'ll help you out?."</p>' +
			'<p>You cannot help but see she looks a little disappointed. She pauses and continues,</p>' +
			'<p>"Make it ' + (getDay(true) === "Fri" ? 'next week' : 'tomorrow') + ' sometime, I have some papers to grade now."</p>'
		);
		if (per.other < 5) per.other = 5;
		per.setFlag(9);
		per.place = 9999;
		PlaceI(5, 141);  // Place a stone in the sacred clearing
	}
	else if (nR == 2)
	{
		if (per.other < 5) per.other = 5;
		per.setFlag(8);
		PlaceI(5, 141);  // Place a stone in the sacred clearing
		bChat = false;
		per.place = 9999;
		addComments(
			per.addPersonFace() +
			'<p>"My favorite topic. Why don\'t you come to class later and I\'ll help you out?"</p>' +
			'<p>She looks brightly at you, excited by your poject. She pauses and continues,</p>' +
			'<p>"Make it ' + (getDay(true) === "Fri" ? 'next week' : 'tomorrow') + ' sometime, I have some papers to grade now."</p>'
		);
	}
	else if (nR == 6)
	{
		if (per.other == 6) per.other = 7;
		addComments(
			'<p>"Oh ' + myName + '. Are you here to discuss reproduction? ' +
			(per.isNeuro() ? ' Oh, that\'s right you decided on neurology! The mind is the seat of all desire and needs!' : 'This is not a sex-ed discussion and I am not available for practical demonstrations.') + '"<p>' +
			'<p>She leans over in a way that accentuates her figure and breasts in particular. ' + 
			(per.isNeuro() ? 'She picks up a tablet computer and refers to it often as she' : 'She then leans back crossing her legs and') +
			' starts to discuss the assignment and then details of the subject.</p>'
		);
	}
	else if (nR == 2600)
	{
		setPlaceKnown("LogansHouse");
		addComments('"Oh, ' + myName + ', it is 12 Cherise Rd, please come and visit any evening!"');
	}
	else if (nR == 2601)
	{
		per.setFlag(5);
		addComments('You comment about her desktop and the lock screen of the pregnant woman. Miss Logan says,</p><p>"I have no secrets from you, use my computer any time you like", and she tells you her password.');
	}	
	return true;
}

// Initialise
function initialiseMissLogan()
{
	// Miss Logan
	addPerson("Miss Logan", Math.random() < 0.5 ? 70 : 196, "MissLogan", "Natural");
	per.getPossessionFace = function() { return "logan-face"; };
	per.Replies = RepliesMissLogan;
	
	per.isNeuro = function() { return this.checkFlag(9); };
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		return this.isCharmedBy() ? (this.getCharmedLevel() == 1 ? this.name : (this.getCharmedLevel() == 4 ? this.name + ", your Slave" : this.name + ", your Breeder")) : this.name;
	};
	
	per.getPersonAddress = function() { return isPlaceKnown("LogansHouse") ? '16 Cherise Rd, Glenvale' : ''; };

	per.whereNow = function() {
		if (!isShopOpen(2) && getDay(true) != "Sun") return 440;
		if (this.place == 196 || this.place == 70) {
			if (!isShopOpen(2)) return 440;
			return this.place;
		}
		if (isDemonQuestDone() && getDay(true) == "Sun" && isDay()) {
			if (this.getCharmedLevel() > 1) return 269;
		}
		if (this.place == 0) return 234;
		return this.place;
	};
	
	per.passTimeDay = function() {
		if (this.other == 5) {
			this.other = 6; // Miss logan path
			setPlaceKnown("AnatomyClassroom"); /* Access Anatomy classroom */
			this.place = 234;
		} else if (this.other >= 7) {
			this.setFlag(10, false);
			this.setFlag(15, false);
		}
		return '';
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (sType !== "" || !this.isHere()) return '';
		
		if (Place == 70 && this.other == 1 && isShopOpen(2)) {
			// Miss Logan in the school hallway
			return this.showPerson("hallway2.jpg", '', '', '', '', false, "string");
			
		} else if (Place == 440) {
			// Her home and she is there optionally also Lilith
			if (isPersonHere("Vampyre")) return this.showPerson("loganlilith1.jpg", '', '', '', '', false, "string");
			return this.showPerson("home1a.jpg", '', '', '', '', false, "string");
			
		} else if (Place == 234) {
			// Anatomy classroom and she is here
			var clv = this.getCharmedLevel();
			var bNeuro = this.isNeuro();
			if (clv == 4) return this.showPerson(bNeuro ? "class-neurology-charmed.jpg" : "class-reproduction-charmed.jpg", '', '', '', '', false, "string");
			else if (clv == 2) return this.showPerson(bNeuro ? "class-neurology-charmedbreeder.jpg" : "class-reproduction-charmedbreeder.jpg", '', '', '', '', false, "string");
			else if (clv == 1) return this.showPerson("class-neurology3.jpg", '', '', '', '', false, "string");
			else if (this.other == 6) return this.showPerson(bNeuro ? "class-neurology1.jpg" : "class-reproduction1.jpg", '', '', '', '', false, "string");
			else if (this.other == 7) return this.showPerson(bNeuro ? "class-neurology2.jpg" : "class-reproduction2.jpg", '', '', '', '', false, "string");
		}
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		var clv, bNeuro;
		
		if (this.other == 1 && ((isShopOpen(2) && this.place == 70 && Place == 70) || (this.place == 196 && Place == 196 && isShopOpen(4)))) {
			if (Place == 70) md.write('<p>Miss Logan, your anatomy teacher, greets you in the hallway.</p>');
			else md.write('<p>Miss Logan, your anatomy teacher, greets you.</p>');
			md.write('<p>She asks which project you are interested in. The options are Neurology or The Reproductive System.</p>');
		} else if (Place == 440) {
			if (this.isHere()) {
				if (!isVisible()) md.write('<p>Miss Logan is here, she seems to be browsing on her computer.</p>');
				else {
					md.write('<p>Miss Logan greets you, and eagerly suggest she teaches you more about reproduction');
					if (isPersonHere("Vampyre")) {
						md.write(', she pauses when she sees Lilith following you, "Ah another student for our studies"</p>');
					}
					if (this.getCharmedLevel() == 2 && !this.checkFlag(1)) {
						if (perYou.isMaleSex()) md.write("<p>You can do the deed yourself, but maybe you want to call someone else to be the father?</p>");
						else md.write("<p>You don't really have the means to impregnate her yourself, but maybe you could <b>call</b> someone to do it instead</p>");
					}
					if (this.checkFlag(6)) md.write('<p>You notice her desktop computer nearby but Miss Logan is too insistent to teach you to use the computer.</p>');
				}
			} else {
				this.setFlag(6);
				md.write('<p style="clear:both">');
				AddImage("Images/People/MissLogan/logon.jpg", "20%", "left", '', '', undefined, md, 'none');
				md.write('You see Miss Logan\'s desktop computer ready to be logged on. ' + (this.checkFlag(5) ? 'You know the password and can logon anytime' : 'You do not know the password') + '.</p>');
			}
		} else if (Place == 234 && this.isHere()) {
			// Classroom
			clv = this.getCharmedLevel();
			if (sType === "") {
				bNeuro = this.checkFlag(8);
				if (clv > 1) {
					if (clv == 4) {
						// Basic slave
						md.write('<p>After you took over her mind, Miss Logan rapidly forgot about that project that she gave to you. However you two have discussed the idea of some private lessons about the only thing that interests you in anatomy; Her. Miss Logan liked the idea so much that she doesn’t even care about the other students or her normal lessons. She’s always well prepared for your arrival to these kind of sessions. By dressing sexy and letting you fuck her anytime you want she slowly turns into your servant.</p>');
						if (isVisible()) md.write('<p>Miss Logan is patiently sitting next to her desk, waiting for you when you enter the somewhat run down empty classroom. She gently kisses you on the lips (her way of welcoming you) and asks you if you want your extra coaching or you want something more.</p>');
					} else {
						// Breeder
						md.write('<p>After you took over her mind, Miss Logan rapidly forgot about that project that she gave to you. However you two have discussed the idea of reproduction, and breeding, breeding her that is.</p>');
						if (perYou.isMaleSex()) {
							if (this.checkFlag(1)) md.write('<p>With luck you have already bred her, but if not you can always try again!. Miss Logan is standing near her desk waiting for more discussions on breeding.</p>');
							else md.write('<p>You have not yet tried to  breed her, and you look forward to fulfilling her desire! Miss Logan is standing near her desk waiting for more discussions on breeding.</p>');
						} 	else md.write('<p>While you cannot breed her personally, you have promised to find a good slave to breed her! Miss Logan is standing near her desk waiting for more discussions on breeding.</p>');
					}
				} else if (this.other == 6) md.write('<p>Miss. Logan is sitting at her desk, busy marking some papers. She does not seem to have noticed you enter the classroom.</p>');
				else if (isVisible() && this.other >= 7) {
					if (bNeuro) md.write('<p>Miss. Logan is absorbed in something on her tablet computer. She briefly looks up and asks, "How is that project going? Do you need any help?"</p>');
					else md.write('<p>She looks up and asks, "How is that project going? Do you need any help?"</p>');
				} else if (this.other >= 7) {
					if (bNeuro) md.write('<p>Miss. Logan is absorbed in something on her tablet computer.</p>');
					else md.write('<p>Miss. Logan is sitting at her desk, busy marking some papers.</p>');
				}
			}
			if (this.checkFlag(11) && clv == 1) {
				// Have seen her tablet and can potentially charm her now in these events
				md.write("<p>You now know the charm spell has focused Miss. Logan on her interest in reproduction, and made it an obsession. ");
				if (perYou.checkFlag(24)) md.write('Possibly you can try to use your knowledge of hypnosis to refocus her, on you!</p>');
				else md.write('If only you knew a different way to influence a person\'s thoughts and obsessions?</p>');
			}
		}
		
	};
		
	// Can you chat with Miss Logan
	per.showPersonChat = function(bGeneral, md)
	{
		if (sType !== "") {
			return;
		}
		
		var clv, bNeuro, bBreed;
		
		// Miss Logan Path 1=Just Met
		if (this.other == 1 && ((isShopOpen(2) && this.place == 70 && Place == 70) || (this.place == 196 && Place == 196 && isShopOpen(4)))) {
			startAlternatives(md, "How do you respond to Miss. Logan");
			addQuestionC(md, 'ask to do the neurology assignment', "MissLogan", 1);
			addQuestionC(md, 'ask to do the reproductive assignment', "MissLogan", 2);
			endAlternatives(md);
			return;
		}
		// Charmed, in her home
		if (Place == 440) {
			bBreed = this.getCharmedLevel() == 2;
			bNeuro = this.checkFlag(8);
			clv = this.getCharmedLevel();
			if (this.isHere()) {
				// At her home
				bNeuro = this.checkFlag(8);
				if (!this.checkFlag(15) && isPersonHere("Vampyre")) {
					addLinkToPlaceC(md, "let Lilith study with Miss. Logan", Place, "type=vamploganles");
					addLinkToPlaceC(md, '"Let\'s all study together"', Place, 'type=vamploganthreesome');
				}
				if (this.checkFlag(6) && !this.checkFlag(5)) addQuestionC(md, 'ask Miss. Logan about her home desktop computer', "MissLogan", 2601);
				addLinkToPlaceC(md, 'ask her for a lesson', Place, 'type=loganfuck');
				if (perYou.isMaleSex()) {
					addLinkToPlaceC(md, bBreed ? 'breed Miss Logan' : '"Let\'s study reproduction"', Place, "type=loganfuck");
					addLinkToPlaceC(md, bBreed ? 'breasts are important for your breeder' : 'Study how breasts are needed for reproduction', Place, "type=logantitfuck");
					addLinkToPlaceC(md, bBreed ? '"Get me ready to breed you"' : '"Could you orally test me?"', Place, "type=loganbj");
				} else {
					addLinkToPlaceC(md, bBreed ? '"Let\'s practice getting ready for breeding"' : '"Could you orally test me"', Place, "type=loganbj");
				}

				this.addSleepLink(md, "bed Miss Logan", "Sleeping with the Teacher",
					'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Miss Logan to bed for the night.</b>',
					bNeuro ? 'home-bed2.jpg' : 'home-bed1.jpg', true, '', '', '', "overflow-y:hidden"
				);				
			} else {
				// At her home on your own
				if (this.checkFlag(5)) addLinkToPlaceC(md, 'check out her desktop computer', Place, 'type=checkloganpc');
			}
			return;
		}
		// Charmed, at Pool or classroom
		if (this.isHere() && this.getCharmedLevel() > 1) {
			// Repeat sex
			if (Place == 269) addLinkToPlaceC(md, this.getCharmedLevel() == 4 ? "ask Miss Logan to participate in the 'club'" : "discuss water based reproduction with Miss Logan", Place, 'type=loganxxx');
			else addLinkToPlaceC(md, clv == 4 ? "ask Miss Logan for a lesson" : "discuss reproduction with Miss Logan", Place, 'type=loganxxx');

			if (!isPlaceKnown("LogansHouse")) addQuestionC(md, 'ask Miss. Logan where she lives', "MissLogan", 2600);
			if (this.checkFlag(6) && !this.checkFlag(5)) addQuestionC(md, 'ask Miss. Logan about her home desktop computer', "MissLogan", 2601);
		} 
		// Anatomy classroom, Other
		if (Place == 234) {
			if (this.isHere() && sType === "" && this.getCharmedLevel() < 2) {
				// General conversation
				if (this.other == 6) {
					addQuestionCO(md, 'cough to get Miss Logan\'s attention', "MissLogan", 6);
					addLinkToPlaceM(md, "exit the room before she notices you", 70);
				} else if (this.other == 7) {
					addLinkToPlaceM(md, "make an excuse and promise to work another time", 70, '', 'You make up an excuse and explain you will return another day. Miss. Logan waves goodbye as she continues to use her tablet computer');
				} else if (this.other >= 9) {
					if (this.other > 9 && !this.checkFlag(11)) addLinkToPlaceI("invisibly check what Miss. Logan is looking at", Place, 'type=checktablet1b');
					if (this.checkFlag(11) && perYou.checkFlag(24)) {
						// Have seen her tablet and can potentially charm her now in these events
						addLinkToPlaceC(md, "discuss the assignment with Miss Logan and while doing so try to put her in a trance", Place, 'type=loganhypno');
					}			
					addLinkToPlaceC(md, "work on the assignment and observe Miss Logan", Place, 'type=workassignment');
					addLinkToPlaceM(md, "make an excuse and promise to work another time", 70, '', 'You make up an excuse and explain you will return another day. Miss. Logan waves goodbye as she continues to use her tablet computer');
				} else addLinkToPlace(md, "exit the room", 70);
			} else addLinkToPlace(md, "exit the room", 70);
		}
	};
	
	
	per.isPlaceImageRight = function()
	{
		if (this.other == 1 && this.whereNow() == 196 && sType === "" && Place == 196) {
			SetRightColumnSize("large");
			return true;
		}
		return false;
	};
	
	per.showPlaceImageRight = function(md)
	{
		this.showPerson(Place == 196 ? "restaurant2.jpg" : "hallway2.jpg");
	};

	per.showEventPopup = function()
	{
		var sState;
		
		if (sType == "transformage") {
			CastTransform(1);
			this.dress = "Younger";
			showPopupWindow("Rejuvenated!",
				this.addPersonString(Place == 269 ? "pool-charm1.jpg" : "class-reproduction-sex-tfa.jpg", "height:max%", "right") +
				'Miss. Logan\'s appearance shifts but it is only subtle, and after a minute you realise she is looking younger. Nothing else is changed but she looks 10 years younger!</p>' +
				'<p>You ask how she is feeling and she replies she is feeling fit, fertile and wonderful!',
				'dispPlace()'
			);
			return true;
		}
		
		// Futa reaction
		if (sType == "loganxxx" && !this.checkFlag(7) && perYou.isFuta(true) && !perYou.isBornMale()) {
			this.setFlag(7);
			showPopupWindow("Miss Logan and Your Changes",
				perYou.addPersonString("xf-futa.jpg", "height:max%", "right") +
				'You have a surprise for Miss Logan. A big surprise already halfway erect when you undress and raking its mushroom head towards your Teacher.</p>' +
				'<p>“Wait, that is...” Miss Logan takes a step back from you. “' + perYou.getPersonName() + ' why do you have a penis?”</p>' +
				'<p>You smile and wrap your fingers around your new cock, slowly stroking it and letting it grow in your hand.</p>' +
				'<p>“To impregnate you, of course.” You tell her. “What else would one use a big, hard cock like this for?”</p>' +
				'<p>“But this is... it\'s...” Miss Logan is clearly confused, struggling with the weirdness of the whole situation when the pink glow in her eyes suddenly flares up and you watch her bend over with a long, drawn out moan.</p>' +
				'<p>“It\'s wonderful!” Doubt and confusion have vanished from her face as she looks back up to you, replaced with a greedy hunger as her eyes rest on your now fully erect cock.</p>' +
				'<p>“I\'ve always thought that we would find someone to impregnate both of us, but this is so much better!” She takes your hand and drags you into the bedroom. “Let\'s examine your new reproductive organs. You must have so many questions and I can\'t wait to answer them hands on.”'
			);
			return true;
		}
		
		if (this.other > 13 && this.getCharmedLevel() == 1) {
			// Public activities
			if (Place == 9 && isShopOpen(2) && !this.checkFlag(16) && !this.checkFlag(10)) {
				// Public Car
				this.setFlag(16);
				this.setFlag(10);
				showPopupWindow("Miss Logan in the Car Park",
					this.addPersonStringRorX("public-cara.jpg", "height:max%", "right") +
					'You notice a small van parked in a guest parking area, and think nothing of it as you approach heading into the school. As you get closer you see a couple inside kissing, and you see one of them is Miss. Logan! ' +
					'You see she is naked and the woman she is with is also naked and clearly they are doing a lot more than just kissing. You hear Miss. Logan talking,</p>' +
					'<p>"Come on make me cum, I need it so much...I did you so come on..."</p>' +
					'<p>As you watch you see her obviously orgasm, closing her eyes. When she reopens them she looks directly at you with a smile. She then looks back at her partner,</p>' +
					'<p>"Let\'s go and see if we can find a cock or two, and not a student\'s. Maybe Karen can hook us up" and shortly after they drive off.</p><p>' +
					(isCharmedBy("MsTitus") ? 'Karen? Could she mean your slave Karen Titus?' : 'You wonder who Karen is?')
				);
				return true;
			}
		}
		
		if (Place == 234) {
			if (sType == "checktablet1" || sType == "checktablet1a" || sType == "checktablet1b") {
				this.setFlag(11);
				sState = (sType == "checktablet1a" ? 'a' : sType == "checktablet1b" ? 'b' : '');
				showPopupWindow("Miss Logan's Tablet",
					this.addPersonString("!tablet1.jpg", "height:max%", "right") +
					(sState == 'b' ?
						"You watch over Miss. Logan's shoulder as she browses images in her tablet, sighing every so often as she does." :
						sState == 'a' ? 'Miss. Logan looks up as you stand, "Oh...you are finished...I have got and research some details on reproduction..." and she ushers you out into the hallway.</p>' +
									"You notice Miss. Logan left the classroom door open and that she also left her tablet on the desk. You quickly go over and browse the images on the tablet before it locks." :
									"You take the table from Ms. Jones and browse though the images Miss. Logan was looking at.") +
					" The images are all of pregnant women, some artistic but many are more pornographic, sex scenes with other women or men.</p>" +
					"<p>It would be difficult to consider these to be educational, except in the way some people refer to checking porn as 'for education'</p>" +
					"<p>While considering this you notice that all the women in the images are blonde...",
					"dispPlace(Place,'type=checktablet2" + sState + "')", '', true
				);
				return true;			
			} else if (sType == "checktablet2" || sType == "checktablet2a" || sType == "checktablet2b") {
				sState = (sType == "checktablet2a" ? 'a' : sType == "checktablet2b" ? 'b' : '');
				showPopupWindow("Miss Logan's Tablet",
					this.addPersonString("!tablet2.jpg", "height:max%", "right") +
					"The next is a video of a blonde woman riding a man cowgirl style and it must be Miss. Logan is fantasising this is her.</p>" +
					"<p>You think the charm spell may of affected Miss. Logan and altered her interest in anatomy and reproduction into an obsesssion and particularly of her being pregnant, of being bred! It does not seem she requires you to be involved in any way, despite the charm spell should of concentrated her attention on you, but instead she is now breeding obsessed!</p>" +
					"<p>The more you think about it the more certain you are! " +
					(perYou.checkFlag(24) ? "Maybe you can use your knowledge of hypnosis to adjust her obsession, so you are the focus of her obsession, but you think she will still want to be bred!" : "If only you could work out some way to refocus her obsession but the charm spell does not seem to work here, you need something else. Possibly some form of hypnosis?") + "</p><p>" +
					(sState == 'b' ? "You return to your desk and leave Miss. Logan to her browsing." :
						sState == 'a' ? "As you put the tablet down you hear Miss. Logan enter the classroom and ask you to pass her the tablet, and you do unsure if she saw you looking at it or not. She asks you to leave the classroom as she is going to lock it up now." :
						"You hand the tablet back to Ms. Jones and after teasing Miss Logan a little more returns it to her and then leaves the two of you alone with a farewell comment,</p>" +
						'<p>"Enjoy your study of reproduction, is a practical test in order?"'),
					sState === "a" ? "dispPlace(70)" : "dispPlace(234,'type=workassignment')"
				);
				return true;			
			}
		}
		
		if (Place == 440 && !this.checkFlag(14) && isPersonHere("Vampyre")) {
			// Miss Logan and Lilith meet
			showPopupWindow("Miss Logan and Lilith",
				this.addPersonString("loganlilith1.jpg", "height:max%", "right") +
				'Miss Logan opens the door and greets you, but looks surprised as she sees Lilith following you into her home. She looks at you and asks,</p>' +
				'<p>"Another woman to join us in our studies tonight, I am happy to teach, but why the vampire costume?" Lilith, looks distinctly annoyed and steps behind Miss Logan embracing her. You see her smile as she bares her fangs as she goes to prove she is a vampire. Before she sinks her fangs into Miss Logan\'s neck she looks at you for permission.</p>' +
				'<p>"Lilith restrain yourself", and Miss. Logan almost purrs, "So forceful! Are you going to teach us then tonight. Has Lilith been naughty and needs correction?"</p>' +
				'<p>Thoughts of what Lilith may of done before you enspelled her' + (isMurderPath() ? ', the people she has killed and any other vio;ent deeds' : '') + ' make you hesitate. You see Lilth smile as she must have had the same thought. Miss. Logan continues, oblivious to the truth of her words, she is just being playful after all,</p>' +
				'<p>"Well it seems I will have two students tonight, you lucky ' + perYou.getSex() + ' I am sure we can arrange some group exercises."</p>',
				"setPersonFlag('MissLogan',14)",
				'background-color:white;color:black', false
			);
			return true;			
		}
		
		if (sType !== "") return false;
		
		if (Place == 70 && this.other == 7) this.other = 6;

		//  Miss Logan Path 1=Just Met
		// if Mrs Robbins Freed from Davy -AND- Tess Adams Sent to your room or later -AND- later and Logan Path hasn't started yet
		if ((Place == 70 || Place == 196) && !isCharmedBy("MrsRobbins", "Davy") && getPersonOther("Tess") >= 10 && this.other === 0) {
			if (Place == 70 && isShopOpen(2) && this.place == 70) {
				this.other = 1; // Start Miss Logans path
				startTimedEvent('LoganAssignment()', 20);
				showPopupWindow("Miss Logan",
					this.addPersonString("hallway1.jpg", "height:max%", "right") +
					"In the hallway you see Miss. Logan your anatomy teacher, a teacher who most of her classes drool over her anatomy.</p>" +
					"<p>She is a very casual teacher with an easy air of friendship who is happy to spend one-on-one time with her students. You have never heard any rumours about her, so strictly professional one-on-one time. She is a little flirty at times, using innuendo often but not crossing the line.</p>" +
					"<p>You have been avoiding her, there is a project you must complete, but you have been more interested in your pursuit of the Kurndorf Book. " +
					"She told you many times that she sees something in you and thinks that you have a great talent in literature and biology and she prodded you way too many times to count to pursue this line of things. However, you never did care about the stuff she tried to ram into your head and overall, you were just too lazy to care about these boring topics. Then again, you are afraid of disappointing her and that’s why you are trying to hide from her.</p>" +
					"<p>Miss. Logan comes to a halt as she notices you and runs towards you. This is it! You’re busted! You\'ve got to think something up about that unmade project! Or maybe she wants something else and there’s nothing to worry about? As you run through a series of options in your head Miss. Logan arrives right in front of you."
				);
				return true;
			}
			if (Place == 196 && this.place == 196 && isShopOpen(4) ) {
				this.other = 1; // Start Miss Logans path
				startTimedEvent('LoganAssignment()', 20);
				showPopupWindow("Miss Logan",
					this.addPersonString("restaurant1.jpg", "height:max%", "right") +
					"As you step into the Restaurant you come across your anatomy teacher, a teacher who most of her classes drool over her anatomy. Miss. Logan dining alone, absorbed into her thoughts and doesn’t recognise you at first. " +
					"She is casually dressed as usual, you would guess she is here get some food. One time your friend Catherine mentioned Miss Logan is fond of bratwurst, though as usual she implied that your teacher was fond of the long sausage more as a cock substitute!</p>" +
					"<p>Miss Logan is a very casual teacher with an easy air of friendship who is happy to spend one-on-one time with her students. You have never heard any rumours about her, so strictly professional one-on-one time. She is a little firty at times, using innuendo often but not crossing the line.</p>" +
					"<p>It’s fortunate she has not noticed you because you are trying to avoid her, because there is a project you must complete, but you have been more interested in your pursuit of the Kurndorf Book.</p>" +
					"<p>You try to sneak past her as silently as you can without disturbing her, but all of a sudden she looks up and points a finger at you then motions you to come to her. You despondently walk towards her, knowing that there is a high chance that she will be angry with you over the undone project. " +
					"Now, what was it? Reproductive or Neurology topics that was assigned to you?"
				);
			}
		}

		return false;
	};
	
	per.showEvent = function()
	{
		var md, sg;
		
		if (Place != 269 && Place != 234 && Place != 440 && Place != 196) return false;
		
		var bPool = Place == 269;	
		var bBreed = this.getCharmedLevel() == 2;
		
		if (sType == "charmloganpartial1") {
			// Event: Charm Miss Logan: partially
			// Can only be in the Biology classroom
			md = WritePlaceHeader();
			this.setFlag(10);
			this.other = 9;

			this.showPerson("class-neurology-charm1.jpg");
			addPlaceTitle(md, "Miss Logan Charmed...Maybe?");
			md.write(
				'<p>As you cast the spell Miss Logan is staring at her tablet computer, absorbed in something she is browsing. You hear her sigh and lick her lips and see a flicker of change in her eyes, but she continues to look at the screen.</p>' +
				'<p>You try to get her attention and guide her as the spell takes effect, but she just waves to you dismissively as if to say "not now". She then looks up at you, holding the tablet in one hand, and a pen in the other she had been using as a stylus. You get a impressive view of her cleavage and she looks at you, but you see her eyes are unchanged as she says,</p>' +
				'<p>"Did you want me...I mean did you have any more questions for now. I have to go and take care of something..."</p>' +
				'<p>It does seem she is under the spell but there is something odd, she is unfocused and you see she glances again at her tablet. Again you try to focus her back on you,</p>' +
				'<p>"Yes Miss Logan, I need you to...." but you see she has stood up and gathered her papers and the tablet, and she interrupts you,</p>' +
				'<p>"Sorry I really have to go and...I have to go. Come back ' + (getDay(true) === "Fri" ? 'Monday' : 'tomorrow') + ' and we can continue discussing your assignment.". Before you can try to say more she leaves the classroom.</p>' +
				'<p>You have a thought that she probably wants to leave and take care of her arousal in private, but she almost did not care you were there. You wonder if somehow whatever she was looking at on the tablet interfered with the spell, or at least distorted the effect. You will have to check with her another time and see how she is and try and reinforce the spell on her.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, "no use staying here, follow her out of the classroom", 70);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "workassignment") {
			// Work on the assignment
			md = WritePlaceHeader();
			this.setFlag(10);
			this.other += 1;
			passTime(12);		// 1hr

			if (this.other < 13) this.showPerson("class-neurology4.jpg");
			else this.showPerson("class-neurology5.jpg");
			addPlaceTitle(md, "Working with Miss Logan");
			md.write('<p>You sit down and start working on your neurology assignment again. Miss. Logan initially discusses where you are up to and goes over ideas and discusses the field.</p>');
			if (this.other == 10) {
				// First time
				md.write(
					'<p>You can definitely see her attitude is different than usual, more sensual, and she drifts when discussing the subject more into the psychology of seduction and physiology of arousal. While she is not <i>quite</i> flirting with you, it gets a bit borderline. You try to encourage her but she pulls back and returns to her desk, and does paperwork for a bit before returning to browsing something on her tablet computer.</p>' +
					'<p>She answers any questions you have but she gets more and more engrossed in whatever she is looking at. Unfortunately from where you are sitting you cannot make out what that is.</p>' +
					'<p>Towards the end of the session you realise you probably only need one or two more to finish the assignment, but you could pad it out to three more, so you should try to work out what is happening here and how to complete Miss Logan\'s charm.</p>' +
					'<p>You notice she is very engrossed and you hear a slight noise from her, was that a moan? You cannot see one of her hands, could she be touching herself, here in class? The spells arousal is definitely in her! Maybe as she was distracted?...</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "quietly walk over and check the screen", 70, '', this.addPersonFace(true) + 'Unfortunately Miss. Logan looks up, &quot;Oh...you are finished for now...I have got to finish my, um, work so let\'s finish this later!&quot; and she ushers you out into the hallway, without getting a clear view of the screen, it was pictures of someone...you think');
			} else if (this.other == 11) {
				// First time
				md.write(
					'<p>Miss. Logan is very distracted this time, and she is definitely aroused, but still it is not turned towards you. You know it is something to do with her tablet computer and whatever she is so obsessed by. Your guess is she is distracted by whatever that is and it is stopping her focusing on much else or at least that is what the spell has done to enhance what was previously an interest and blown it up into a full blown obsession. Unfortunately not an obsession with <i>you</i> but with something else!</p>' +
					'<p>You know you cannot delay much more, probably only one or two more session at most, is there another spell you could use, or someone who could help?</p>'
				);
				startQuestions();
				if (this.checkFlag(11) && perYou.checkFlag(24)) {
					// Have seen her tablet and can potentially charm her now in these events
					addLinkToPlaceC(md, "discuss the assignment with Miss Logan and while doing so try to put her in a trance", Place, 'type=loganhypno');
				}			
				addLinkToPlaceC(md, "finish up for now and leave the classroom", 70, '', this.addPersonFace(true) + 'Miss. Logan looks up as you stand, &quot;Oh...you are finished...I have got and research some details on reproduction...&quot; and she ushers you out into the hallway.');
			} else if (this.other == 12) {
				// Last time
				md.write(
					'<p>Miss. Logan pays little attention during this session, she answers any questions but is a little brief. Then again, you are essentially finished anyway and are just making up queries try to find out about her.</p>' +
					'<p>Towards the end of the session you realise you only need one more to finish the assignment and doubt you can pad it out any more.</p>' +
					'<p>Miss Logan is very fascinated with whatever she is looking at in her tablet, often smiling and sighing as she studies whatever it is.</p>'
				);
				startQuestions();
				if (this.checkFlag(11) && perYou.checkFlag(24)) {
					// Have seen her tablet and can potentially charm her now in these events
					addLinkToPlaceC(md, "discuss the assignment with Miss Logan and while doing so try to put her in a trance", Place, 'type=loganhypno');
				}			
				addLinkToPlaceC(md, "finish up for now and leave the classroom", 70, '', this.addPersonFace(true) + 'Miss. Logan looks up as you stand, &quot;Oh...you are finished...I have got and research some details on reproduction...&quot; and she ushers you out into the hallway.');
			} else if (this.other >= 13) {
				// Last time
				md.write(
					'<p>Miss. Logan pays little attention during this session, she answers any questions but is a little brief. Then again, you are essentially finished anyway and are just making up queries try to find out about her.</p>' +
					'<p>Eventually you can delay no longer and finish the assignment and hand it in. Miss Logan powers off her tablet and smiles,</p>' +
					'<p>"Well done, I am sure it is an excellent report and I will email you your marks later....Such a pity it was not about reproduction, I really could use some breeding, that is discussion of breeding."</p>' +
					'<p>You notice she is very engrossed and you hear a slight noise from her, was that a moan? You cannot see one of her hands, could she be touching herself, here in class? The spells arousal is definitely in her! Maybe as she is distracted...</p>'
				);
				startQuestions();
				if (this.checkFlag(11) && perYou.checkFlag(24)) {
					// Have seen her tablet and can potentially charm her now in these events
					addLinkToPlaceC(md, "discuss the assignment with Miss Logan and while doing so try to put her in a trance", Place, 'type=loganhypno');
				}			
				addLinkToPlaceC(md, "finish up for now and leave the classroom", this.checkFlag(11) ? 70 : 234, this.checkFlag(11) ? '' : 'type=checktablet1a', this.checkFlag(11) ? this.addPersonFace(true) + 'Miss. Logan looks up as you stand, &quot;Oh...you are finished...I have got and research some details on reproduction...&quot; and she ushers you out into the hallway.' : '');
			}
			WritePlaceFooter(md);
			return true;
		}	
		if (sType === "loganhypno") {
			// Event: Hypnotise Miss Logan
			// Can only be in the Biology classroom
			md = WritePlaceHeader();

			this.showPerson("hypno.jpg");
			addPlaceTitle(md, "Miss Logan Entranced");
			if (getQueryParam("from") == "restaurant") {
				md.write(
					'<p>You step over and touch her elbow and tell her "purple apple" and then call on your mana and she instantly goes into a trance.</p>' +
					'<p>You calmly ask her to dress and to walk with you to the school as you feel the Anatomy classroom will be a place she is comfortable with and will give the best results. She does and on the way to talk to her about reproduction and mention avoiding other peoples help.</p>' +
					'<p>You reach the Anatomy class room and you test she is still in the trance and suggest her top is ripped and needs to adjust it. Instead she pulls it down exposing her breasts, and you hear her say something unclear, but probably "better to feed..." and you are sure she is still in a trance.</p>'
				);	
			} else if (getQueryParam("from") == "class") {
				md.write(
					'<p>You step over and touch her elbow and tell her "green aardvaark" and then call on your mana and she instantly goes into a trance.</p>' +
					'<p>You calmly talk to her about reproduction and mention avoiding other peoples help and you notice she starts to put her clothing back on as you do.</p>' +
					'<p>You test that she is deeply in the trance and suggest her top is ripped and needs to adjust it. Instead she pulls it down exposing her breasts, and you hear her say something unclear, but probably "better to feed..." and you are sure she is still in a trance.</p>'
				);	
			} else {
				md.write(
					'<p>You ask Miss. Logan some questions, carefully speaking with a tone and cadence to lead Miss. Logan into a trance. You start tapping you knee loud enough to just be heard and continue talking to Miss. Logan.</p>' +
					'<p>You see she is starting to respond and you ask a question directly on reproduction and suggest she close her eyes while she considers her answer. She does and smiles, and you are sure thoughts and images of pregnancy are passing though her mind. You talk to her calmly, suggesting she relax a little and she think more and more on the answer but do not reply yet.</p>' +
					'<p>You look at her and you are sure she is in a light trance now, and you test and suggest her top is ripped and needs to adjust it. Instead she pulls it down exposing her breasts, and you hear her say something unclear, but probably "better to feed..." and you now are sure she is in a trance.</p>'
				);
			}
			md.write(
				'<p>You talk to her about her interest in reproduction and suggest that you could help her to study it in depth. In her trance she replies,</p>' +
				'<p>"Hard and deep research, very hard and deep..."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, "tell her you want to help her study it", Place, "type=loganhypno2");
			if (perYou.checkFlag(26)) addLinkToPlaceC(md, 'tell her you want to help in a \'practical\' way', Place, "type=loganhypno2breeder");
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType === "loganhypno2" || sType === "loganhypno2breeder") {
			// Event: Hypnotise Miss Logan 2
			// Can only be in the Biology classroom
			md = WritePlaceHeader();
			bBreed = sType == "loganhypno2breeder";
			if (bBreed) this.charmThem(2);		// now a breeder
			else this.charmThem(4);		// now a slave
		
			this.showPerson("class-neurology-charm2.jpg");
			addPlaceTitle(md, "Miss Logan More Entranced");
			md.write('<p>You continue talking about her interest in reproduction, emphasising how you can help her and <b>only</b> you. You are the only help she needs');
			if (bBreed) md.write(' with any practical exercises');
			else md.write(' studying reproduction techniques');
			md.write(
				'. She distantly agrees, she is still in the trance. You decide it is time to see if it has worked to refocus the effects of the charm spell and focus her on you, not just on reproduction in general. You talk to her and count down as you end the hypnotic trance.</p>' +
				'<p>On the count of One! she looks up at you rather seductively and removes her skirt. She is still a bit dazed from the trance, but she is awake, and looking at you with clear desire.</p>'
			);
			if (bBreed) {
				// Breeder
				if (perYou.isMaleSex()) {
					md.write(
						'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may..."</p>' +
						'<p>You remember telling her about a practical exercise and ask "You mean impregnate her, breed her?". Miss Logan looks at you and down at your growing erection. A wave of desire crushes the last of your teacher\'s will.</p>' +
						'<p>"Just take me ' + perYou.getPersonName() + '! Fuck me and cum in me, I am not taking contraceptives!"</p>'
					);
				} else {
					md.write(
						'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may..."</p>' +
						'<p>You remember telling her about a practical exercise and ask "You mean impregnate her, breed her?". Miss Logan looks at you and a wave of desire crushes the last of your teacher\'s will.</p>' +
						'<p>"Let me show you how to make a man really hot, so he can breed us! All men love to see two women together!"</p>'
					);
				}
				
			} else {
				// Standard
				if (perYou.isMaleSex()) {
					md.write(
						'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
						'<p>A wave of desire crushes the last of your teacher\'s will. "Just take me ' + perYou.getPersonName() + '! Take me now!"</p>'
					);
				} else {
					md.write(
						'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
						'<p>A wave of desire crushes the last of your teacher\'s will. "Let me show you how to make a man really hot, ' + perYou.getPersonName() + '! All men love to see two women together!"</p>'
					);
				}
			}

			startQuestions();
			addLinkToPlace(md, bBreed ? (perYou.isMaleSex() ? "breed Miss Logan" : "study reproduction") : "take Miss Logan", Place, 'type=charmlogan3');
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "charmlogan1") {
			// Event: Charm Miss Logan: part 1
			// Can be either in the Biology classroom or at the Broken Inn Hotel Pool			
			md = WritePlaceHeader();
			setPlaceKnown("AnatomyClassroom");
			
			if (bPool) {
				// Hotel Pool
				this.showPerson("pool-charm1.jpg");
				addPlaceTitle(md, "Miss Logan Charmed");
				md.write(
					'<p>Miss Logan shakes her head and looks over at you. Somewhat confused, she steps over and asks you,</p>' +
					'<p>"You are doing a project on the brain, right? Are you sure you would not prefer to do a study of anatomy?"</p>' +
					'<p>She suggestively squeezes her breasts together as she leans in toward you,</p>' +
					'<p>"I think that you need some help in reproduction," she claims. "Have you thought of a practical project?"</p>' +
					'<p>You\'re unsure exactly what she means but you get a pretty good idea...</p>'
				);
				
			} else {
				// Anatomy Classroom
				this.showPerson("class-reproduction-charm1.jpg");
				addPlaceTitle(md, "Miss Logan Charmed");
				md.write(
					'<p>Miss Logan shakes her head. Somewhat confused, she tries to remember what she was talking about. ' +
					'As her mind shifts she climbs onto her desk like a panther.</p>' +
					'<p>"I think that you need some help in reproduction," she claims. "Have you thought of a practical project?"</p>' +
					'<p>You\'re unsure exactly what she means...</p>'
				);
			}

			startQuestions();
			addLinkToPlaceC(md, "ask your teacher what she means", Place, 'type=charmlogan2');
			if (perYou.checkFlag(26)) addLinkToPlaceC(md, '"practical about reproduction?"', Place, "type=charmlogan2breeder");
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmlogan2" || sType == "charmlogan2breeder") {
			// Event: Charm Miss Logan: part 2
			// Can be either in the Biology classroom or at the Broken Inn Hotel Pool			
			md = WritePlaceHeader();
			bBreed = sType == "charmlogan2breeder";
			if (bBreed) this.charmThem(2);		// now a breeder
			
			if (bPool) {
				// Hotel Pool
				this.showPerson("pool-charm2.jpg");
				addPlaceTitle(md, "Miss Logan Charmed");
				md.write(
					'<p>As you look at your teacher you remember a time a while ago Amy had whispered to you during a lesson that she thought Miss Logan was a lesbian. Catherine had dramatically told her <b>not</b> to spread rumours about the lesbian affair between two teachers, and proceeded to tell her lurid details.</p>' +
					'<p>Then again one time when you went to the Gym to meet Amy you saw Miss Logan flirting with some guy...</p>' +
					'<p>Your attention is drawn back to the present as Miss Logan slips off her bikini top, exposing her large breasts, larger than you had thought from school! You notice a couple of other people looking appreciatively at her. You are going to have to find somewhere more private.</p>'
				);
				if (bBreed) {
					// Breeder
					if (perYou.isMaleSex()) {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may..."</p>' +
							'<p>You remember her offer of a practical and ask "You mean impregnate her, breed her?". Miss Logan looks at you and down at your growing erection. A wave of desire crushes the last of your teacher\'s will.</p>' +
							'<p>"Just take me ' + perYou.getPersonName() + '! Fuck me and cum in me, I am not taking contraceptives!"</p>'
						);
					} else {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may..."</p>' +
							'<p>You remember her offer of a practical and ask "You mean impregnate her, breed her?". Miss Logan looks at you and a wave of desire crushes the last of your teacher\'s will.</p>' +
							'<p>"Let me show you how to make a man really hot, so he can breed us! All men love to see two women together!"</p>'
						);
					}	
					
				} else {
					// Standard
					if (perYou.isMaleSex()) {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
							'<p>A wave of desire crushes the last of your teacher\'s will. "Just take me ' + perYou.getPersonName() + '! Take me now!"</p>'
						);
					} else {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
							'<p>A wave of desire crushes the last of your teacher\'s will. "Let me show you how to make a man really hot, ' + perYou.getPersonName() + '! All men love to see two women together!"</p>'
						);
					}
				}
				
			} else {
				// Anatomy Classroom
				this.showPerson("class-reproduction-charm2.jpg");
				addPlaceTitle(md, "Miss Logan Charmed");
				md.write(
					'<p>As you look at your teacher you remember a time a while ago Amy had whispered to you during a lesson that she thought Miss Logan was a lesbian. Catherine had dramatically told her <b>not</b> to spread rumours about the lesbian affair between two teachers, and proceeded to tell her lurid details.</p>' +
					'<p>Then again one time when you went to the Gym to meet Amy you saw Miss Logan flirting with some guy...</p>' +
					'<p>Your attention is drawn back to the present as Miss Logan starts to unbutton her top,</p>'
				);
				if (bBreed) {
					// Breeder
					if (perYou.isMaleSex()) {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may..."</p>' +
							'<p>You remember her offer of a practical and ask "You mean impregnate her, breed her?". Miss Logan looks at you and down at your growing erection. A wave of desire crushes the last of your teacher\'s will.</p>' +
							'<p>"Just take me ' + perYou.getPersonName() + '! Fuck me and cum in me, I am not taking contraceptives!"</p>'
						);
					} else {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may..."</p>' +
							'<p>You remember her offer of a practical and ask "You mean impregnate her, breed her?". Miss Logan looks at you and a wave of desire crushes the last of your teacher\'s will.</p>' +
							'<p>"Let me show you how to make a man really hot, so he can breed us! All men love to see two women together!"</p>'
						);
					}
					
				} else {
					// Standard
					if (perYou.isMaleSex()) {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
							'<p>A wave of desire crushes the last of your teacher\'s will. "Just take me ' + perYou.getPersonName() + '! Take me now!"</p>'
						);
					} else {
						md.write(
							'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
							'<p>A wave of desire crushes the last of your teacher\'s will. "Let me show you how to make a man really hot, ' + perYou.getPersonName() + '! All men love to see two women together!"</p>'
						);
					}
				}
			}

			startQuestions();
			addLinkToPlace(md, bBreed ? (perYou.isMaleSex() ? "breed Miss Logan" : "discuss reproduction") : "take Miss Logan", Place, 'type=charmlogan3');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmlogan3") {
			// Event: Charm Miss Logan: part 3
			// Can be either in the Biology classroom or at the Broken Inn Hotel Pool			
			md = WritePlaceHeaderNIP();
			passTime(true);	// TODO: only once?
			setPlaceKnown("LogansHouse");

			if (bPool) {
				// Hotel Pool
				if (isExplicit()) {
					if (perYou.isMaleSex() && bBreed) this.showPersonRandomX("pool-sex-fuckb", 2);
					else if (perYou.isMaleSex()) this.showPersonRandomX("pool-sex-tf", 2);
					else this.showPersonRandomX("pool-sex-fuckg", 2);
				} else if (perYou.isMaleSex() && bBreed) this.showPersonRandom("pool-sex-fuckb", 2);
				else if (perYou.isMaleSex()) this.showPerson("pool-sex-tfa.jpg");
				else this.showPerson("pool-sex-fuckga.jpg");
				addPlaceTitle(md, "Miss Logan Charmed");

				if (bBreed || !perYou.isMaleSex()) {
					md.write(
						'<p>Miss Logan is losing all control, but this is a public place. You tell Miss Logan you need to continue this in a more private place. She refits her bikini top and grabs your hand and drags you to the hotel front desk. She quick rents a room, and you see a knowing look on the person at the desk, while this is no \'love hotel\' or one that rents by the hour, still they must get quite a number of people having private...lessons.</p>' +
						'<p>A little later you are in the room, Miss Logan tearing off her clothing....</p>'
					);
				} else {
					md.write(
						'<p>Miss Logan is losing all control, but this is a public place. You glance around and see a more secluded area, out of the sight of the other people using the pool.</p>'
					);
				}
				if (bBreed) {
					// Breeder
					if (perYou.isMaleSex()) {
						this.setFlag(1);
						md.write(
							'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes, as she instructs you in the best positions and ways to maximise the chance of pregnancy.</p>' +
							'<p>After she seems confident you have successfully bred her, but that is more the influence of the spell on her mind. Still there is nothing stopping you trying again and again if she is not. As far as you know the charm spell does not affect the fertility of women you cast it on...</p>'
						);
					} else {
						md.write(
							'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes, and she instruct you in the best positions to increase the chance of pregnancy. She emphasises that if you orgasm it may increase the chance of conception. You had thought you had heard conflicting information on this, but Miss Logan is adamant, and besides she is very good at making you orgasm!</p>' +
							'<p>After she is a little disappointed that you could not breed her, and asks if you can arrange it with a friend of yours? It is impressive how the spell has shaped her mind, created this considerable desire, at leasts as far as you know the charm spell does not affect the fertility of women you cast it on...</p>'
						);
					}
					md.write('<p>As you dress you have to think that in all of the years of attending school you never dreamed that an anatomy lesson could be so much fun.</p>');
				} else {
					// Standard
					md.write(
						'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes.</p>' +
						'<p>In all of the years of attending school you never dreamed that an anatomy lesson could be so much fun.</p>'
					);
				}
				md.write(
					'<p>Miss Logan tells you in her \'teacher\' voice, "Make sure to visit me in the Anatomy Class tomorrow for a lesson...about my anatomy"</p>' +
					'<p>She continues, "You can also come and fuck me at my home, 12 Cherise Rd when I am at home!"</p>'
				);
				startQuestions();
				addLinkToPlace(md, "return to the pool", 269);

			} else {
				// Anatomy Classroom
				if (perYou.isMaleSex()) {
					if (this.isNeuro()) this.showPersonRandomRorX("class-neurology-sex-fuckb", 2);
					else this.showPersonRandomRorX("class-reproduction-sex-fuckb", 2);
				} else if (this.isNeuro() && !isExplicit()) this.showPersonRandom("class-neurology-sex-fuckg", 1);
				else this.showPersonRandomRorX("class-reproduction-sex-fuckg", isExplicit() ? 2 : 1);
				addPlaceTitle(md, "Miss Logan Charmed");
				if (bBreed) {
					// Breeder
					if (perYou.isMaleSex()) {
						this.setFlag(1);
						md.write(
							'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes, as she instructs you in the best positions and ways to maximise the chance of pregnancy.</p>' +
							'<p>After she seems confident you have successfully bred her, but that is more the influence of the spell on her mind. Still there is nothing stopping you trying again and again if she is not. As far as you know the charm spell does not affect the fertility of women you cast it on...</p>'
						);
					} else {
						md.write(
							'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes, and she instruct you in the best positions to increase the chance of pregnancy. She emphasises that if you orgasm it may increase the chance of conception. You had thought you had heard conflicting information on this, but Miss Logan is adamant, and besides she is very good at making you orgasm!</p>' +
							'<p>After she is a little disappointed that you could not breed her, and asks if you can arrange it with a friend of yours? It is impressive how the spell has shaped her mind, created this considerable desire, at leasts as far as you know the charm spell does not affect the fertility of women you cast it on...</p>'
						);
					}
					md.write('<p>As you dress you have to think that in all of the years of attending school you never dreamed that an anatomy lesson could be so much fun.</p>');
				} else {
					// Standard
					md.write(
						'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes.</p>' +
						'<p>In all of the years of attending school you never dreamed that an anatomy lesson could be so much fun.</p>'
					);
				}
				md.write('<p>She tells you, "You can also come and fuck me at my home, 12 Cherise Rd when I am at home!"</p>');
				startQuestions();
				addLinkToPlace(md, "exit the room", 70);
			}
			if (bBreed && perYou.isMaleSex()) {
				AddRightColumn(md);
				AddImageRandom("GenericSex/creampie", 2);
			}
			WritePlaceFooter(md);
			return true;
		}

		
		if (sType == "recharmlogan1") {
			// Re-charm Mis Logan
			if (bBreed) {
				this.charmThem(4);
				bBreed = false;
			} else {
				this.charmThem(2);
				bBreed = true;
			}
			md = WritePlaceHeader();
			this.showPersonRorX("pool-recharm" + (perYou.isMaleSex() ? "b" : "g") + ".jpg");
			addPlaceTitle(md, "Miss Logan Under A Charm Spell - Again");
			
			md.write(
				'<p>Once again you cast the spell on your teacher, ' + (bBreed ? 'this time with the intent of further following up her talk of reproduction and breeding' : 'this time to calm down her obsession with reproduction, if that is possible.') + '</p>' +
				'<p>As you talk about this Miss Logan loses all control, but this is a public place. You tell Miss Logan you need to continue this in a more private place. She refits her bikini top and grabs your hand and drags you to the hotel front desk. She quick rents a room, and you see a knowing look on the person at the desk, while this is no \'love hotel\' or one that rents by the hour, still they must get quite a number of people having private...lessons. Fortunately a room is available, not yet ready for a customer so the bed it still being readied and some other cleaning materials are around.</p>' +
				'<p>A little later you are in the room, Miss Logan tearing off her bikini....</p>'
			);
			if (bBreed) {
				if (perYou.isMaleSex()) {
					this.setFlag(1);
					md.write(
						'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes, as she instructs you in the best positions and ways to maximise the chance of pregnancy.</p>' +
						'<p>After she seems confident you have successfully bred her, but that is more the influence of the spell on her mind. Still there is nothing stopping you trying again and again if she is not. As far as you know the charm spell does not affect the fertility of women you cast it on...</p>'
					);
				} else {
					md.write(
						'<p>You enjoy the pleasures of Miss Logan for the next twenty minutes, and she instruct you in the best positions to increase the chance of pregnancy. She emphasises that if you orgasm it may increase the chance of conception. You had thought you had heard conflicting information on this, but Miss Logan is adamant, and besides she is very good at making you orgasm!</p>' +
						'<p>After she is a little disappointed that you could not breed her, and asks if you can arrange it with a friend of yours? It is impressive how the spell has shaped her mind, created this considerable desire, at leasts as far as you know the charm spell does not affect the fertility of women you cast it on...</p>'
					);
				}
			} else {
				// Standard
				if (perYou.isMaleSex()) {
					md.write(
						'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
						'<p>A wave of desire crushes the last of your teacher\'s will. "Just take me ' + perYou.getPersonName() + '! Take me now!"</p>'
					);
				} else {
					md.write(
						'<p>"Oh ' + perYou.getPersonName() + '," says Miss Logan, losing control of her social constraints. "Let me show you how reproduction occurs. Firstly the female is hot... prepares herself for her mate by... enticing him to her so that he may. Oh god!"</p>' +
						'<p>A wave of desire crushes the last of your teacher\'s will. "Let me show you how to make a man really hot, ' + perYou.getPersonName() + '! All men love to see two women together!"</p>'
					);
				}
				md.write('<p>You enjoy the pleasures of Miss Logan for the next twenty minutes.</p>');
			}
			md.write('<p>As you dress you have to think that in all of the years of attending school you never dreamed that an anatomy lesson could be so much fun.</p>');

			startQuestionsOnly();
			addLinkToPlace(md, "return to the pool", 269);
			if (perYou.isMaleSex() && bBreed) {
				AddRightColumn(md);
				AddImageRandom("GenericSex/creampie", 2);
			}			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "loganxxx") {
			md = WritePlaceHeader();

			this.showPerson(Place == 269 ? 'pool-talk.jpg' : this.isNeuro() ? "class-neurology-talk.jpg" : "class-reproduction-talk.jpg");
			addPlaceTitle(md, "Miss Logan");

			md.write(
				'<p>"I\'m always ready to teach," says the teacher in heat. "All you have to do is ask and it is all yours."</p>'
			);

			startQuestions();
			if (perYou.isMaleSex()) {
				addLinkToPlaceC(md, bBreed ? 'breed Miss Logan' : '"How about a test on reproduction"', Place, "type=loganfuck");
				addLinkToPlaceC(md, bBreed ? 'breasts are important for your breeder' : '"Teach me the purpose of breasts"', Place, "type=logantitfuck");
				addLinkToPlaceC(md, bBreed ? '"Get me ready to breed you"' : '"Can I have an oral exam"', Place, "type=loganbj");
			} else {
				addLinkToPlaceC(md, bBreed ? '"Let\'s practice getting ready for breeding"' : '"Can I have an oral exam"', Place, "type=loganbj");
				addLinkToPlaceC(md, bBreed ? 'breasts are important for your breeder' : '"Teach me the purpose of breasts"', Place, "type=logantitfuck");
			}
			
			if (Place == 269) addLinkToPlace(md, "return to the pool", 269);
			else addLinkToPlace(md, "exit the room", 70);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "loganbj") {
			// Blowjob/oral sex (all genders)
			md = WritePlaceHeader();
			sg = perYou.isMaleSex() ? 'b' : 'g';
			if (Place == 440) this.showPersonRandomRorX("home-sex-bj" + sg, isExplicit() ? (sg === "b" ? 4 : 2) : 1);
			else if (Place == 269) this.showPersonRandomRorX("pool-sex-bj" + sg, isExplicit() ? (sg === "b" ? 3 : 2) : 1);
			else if (this.isNeuro()) this.showPersonRandomRorX("class-neurology-sex-bj" + sg, isExplicit() ? (sg === "b" ? 3 : 2) : 1);
			else this.showPersonRandomRorX("class-reproduction-sex-bj" + sg, isExplicit() ? (sg === "b" ? 3 : 2) : 1);

			addPlaceTitle(md, "Miss Logan's Oral Lesson");

			md.write(
				'<p>Miss Logan examines you orally.</p>' +
				'<p></p>'
			);
			startQuestions();
			if (Place == 269) addLinkToPlace(md, "return to the pool", 269);
			else addLinkToPlace(md, "talk more to Miss Logan", Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "logantitfuck") {
			// Tit-fuck. Female only in class or home
			md = WritePlaceHeader();
			if (!perYou.isMaleSex()) gameState.bExplicitNow = false;		// Force non-explicit for female cases
			if (Place == 269) this.showPersonRandomRorX("pool-sex-tf", isExplicit() ? 2 : 1);
			else if (Place == 440) this.showPersonRandomRorX("home-sex-tf", isExplicit() ? 2 : 1);
			else if (this.isNeuro()) {
				if (!perYou.isMaleSex()) this.showPerson("class-neurology-sex-tfb.jpg");
				else this.showPersonRandomRorX("class-neurology-sex-tf", 2);
			} else this.showPersonRandomRorX("class-reproduction-sex-tf", isExplicit() ? 2 : 1);

			addPlaceTitle(md, "Miss Logan on the Anatomy of Breasts");

			md.write(
				'<p>Miss Logan demonstrates an important function of breasts.</p>' +
				'<p></p>'
			);
			startQuestions();
			if (Place == 269) addLinkToPlace(md, "return to the pool", 269);
			else addLinkToPlace(md, "talk more to Miss Logan", Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "loganfuck") {
			md = WritePlaceHeader();
			if (Place == 440) {
				if (perYou.isFuta()) this.showPersonRorX("home-sex-fuckfa.jpg");
				else if (isExplicit()) {
					if (perYou.isMaleSex()) this.showPersonRandomX("home-sex-fuckb", 2);
					else this.showPersonRandom("home-sex-fuckg", 2);
				} else if (perYou.isMaleSex()) this.showPersonRandom("home-sex-fuckb", 1);
				else this.showPersonRandom("home-sex-fuckg", 2);
			} else if (Place == 269) {
				// At the Pool
				if (isExplicit()) {
					if (perYou.isMaleSex() && bBreed) this.showPersonRandomX("pool-sex-fuckb", 2);
					else if (perYou.isMaleSex()) this.showPersonRandomX("pool-sex-tf", 2);
					else this.showPersonRandomX("pool-sex-fuckg", 2);
				} else if (perYou.isMaleSex() && bBreed) this.showPersonRandom("pool-sex-fuckb", 2);
				else if (perYou.isMaleSex()) this.showPerson("pool-sex-tfa.jpg");
				else this.showPerson("pool-sex-fuckga.jpg");
			} else {
				// At the classroom
				if (perYou.isMaleSex()) {
					if (this.isNeuro()) this.showPersonRandomRorX("class-neurology-sex-fuckb", 2);
					else this.showPersonRandomRorX("class-reproduction-sex-fuckb", 2);
				} else if (this.isNeuro() && !isExplicit()) this.showPersonRandom("class-neurology-sex-fuckg", 1);
				else this.showPersonRandomRorX("class-reproduction-sex-fuckg", isExplicit() ? 2 : 1);
			}
			if (bBreed && perYou.isMaleSex()) this.setFlag(1);

			addPlaceTitle(md, "Miss Logan");

			md.write(
				'<p>Miss Logan gives you a practical test on methods of reproduction.</p>' +
				'<p></p>'
			);
			startQuestions();
			if (Place == 269) addLinkToPlace(md, "return to the pool", 269);
			else addLinkToPlace(md, "talk more to Miss Logan", Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "checkloganpc") {
			// Browse her PC
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPersonAnon("!desktop.jpg");
			addPlaceTitle(md, "Miss Logan's Computer");

			md.write(
				'<p>Miss Logan is a reasonable current model PC and you see after you logon she has an image set as her desktop wallpaper, from a Japanese game your think. A bit of a \'noisy\' image for a wallpaper really.</p>' +
				'<p>You browse around and mostly see a routine system, a range of standard applications installed and so on. A better system than you have at home! "Mostly" routine as she does seem to have quite a lot of porn linked on her desktop and bookmarked in her browser. <b>All</b> of it is pregnancy related, images of pregnant women posing or sexually active!</p>' +
				'<p>One thing you do note, the images she has saved and almost all of blonde women, and you cannot help but wonder is this is how your blonde teacher fantasises.</p>' +
				'<p>You also find a folder of home videos...well more like sex-tapes...</p>'
			);
			startQuestions();
			addLinkToPlace(md, "browse the porn", Place, 'type=checkloganpcporn&stage=1');
			addWatchTVLink(md, 'watch one of the videos', 'Miss Logan\'s home video',
				'Only one of the videos will play at the moment, and it seems to be a fairly old one, Miss Logan is noticably younger</p>' +
				'<p>You see her masturbating while watching a video on her computer, she definitely likes her porn and seems to like recording herself!</p>' +
				(!isExplicit() ? '<p>Unfortunately the video must be damaged and cuts out after a little while.</p>' : ''),
				this.getImg((isExplicit() ? "Explicit/" : "") + '!video1.jpg')
			);
			addLinkToPlace(md, "logoff the computer", Place);
			WritePlaceFooter(md);
			return true;			
		}
		if (sType == "checkloganpcporn") {
			// Browse her PC porn
			var stg = parseInt(getQueryParam("stage"), 10);
			md = WritePlaceHeader();
			this.showPersonAnon("!pc" + stg + ".jpg");
			addPlaceTitle(md, "Miss Logan's Porn");
			md.write(
				'<p>Miss Logan\'s porn of pregnant women...all of them blonde like Miss. Logan...</p>'
			);
			var iPC = oImages.People.MissLogan.pc;
			var iPCTitus = oImages.People.MissLogan.pctitus;
			if (stg == iPCTitus) md.write('<p>Just a minute, is that Ms. Titus in that image, it certainly looks like her!</p>');
			stg++;
			if (stg > iPC) stg = 1;
			startQuestions();
			addLinkToPlace(md, "check some more", Place, 'type=checkloganpcporn&stage=' + stg);
			addLinkToPlace(md, "logoff the computer", Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "vamploganles") {
			md = WritePlaceHeader();
			this.showPerson("loganlilith-threesomeg.jpg");
			addPlaceTitle(md, "Miss. Logan and Lilith study together");
			md.write(
				'<p>You tell then you would like to see a practical demonstration and have Miss. Logan and Lilith practise on each other. You see a trickle of blood as Lilith bites into Miss Logan\'s breasts, you doubt it was an accident.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'let them redress', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "vamploganthreesome") {

			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomX("loganlilith-threesomeb", isExplicit() ? 2 : 1);
			else this.showPerson("loganlilith-threesomeg.jpg");
			addPlaceTitle(md, "Group Study");
			md.write(
				'<p>Miss. Logan and Lilith join you for a thorough study of reproduction</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'redress and talk to them more', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (this.other > 13 && this.getCharmedLevel() == 1) {
			// Public activities
			if (Place == 196 && (sType === "" && !this.checkFlag(10) && (getHour() > 11 && getHour() < 14)) || sType == "loganrestaurant1") {
				// Restaurant between 12 and 2
				setQueryParams("type=loganrestaurant1");
				this.setFlag(10);
				md = WritePlaceHeader();
				this.showPersonRandomRorX("public-restaurant", 1);
				addPlaceTitle(md, "Miss Logan\'s Sausage");
				md.write(
					'<p>As you enter the restaurant there is a bit of activity, the customers seem disturbed, louder than usual. You look around but do not clear see any reason but as you walk further inside you catch a glimpse off to one side of a couple passionately embracing. They are not exactly in plain view but are hardly hidden from view. Many customers are avoiding looking at them, but others are openly watching.</p>' +
					'<p>You get a little clearer view and it is Miss Logan and some man you do not know, while you thought \'passionately embracing\' before, no that is not the case. They are fucking in the restaurant, probably more openly than they intended but still openly. Both have lost most of their clothing and Miss Logan is enthusiastically riding the man\'s cock, but at least she is doing so relatively quietly.</p>' +
					'<p>It would seem your anatomy teacher has sought out someone to study reproduction with. You can just leave them \'alone\' but then again she is supposed to be <b>yours</b> so you could try to interrupt them before their study comes to a conclusion?</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'leave them alone', 195, '', 'You decide to leave the restaurant for now, and as you are walking nearby you notice Miss Logan leave as well, you guess then were almost finished their studies when you arrived...');
				addLinkToPlace(md, 'interrupt them', Place, 'type=loganrestaurant2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "loganrestaurant2") {
				// Restaurant
				md = WritePlaceHeader();
				this.showPersonRandomRorX("public-restaurant-interrupt", 1);
				addPlaceTitle(md, "Miss Logan Interruptus");
				md.write(
					'<p>You call out to Miss Logan as you walk towards them, saying there is something important you need to discuss. She look up quite annoyed at you, and the man she is with look more embarrassed. You guess he was lost in the moment and as you approach he hurriedly dresses and then just leaves without a word.</p>' +
					'<p>Miss Logan asks what you want and as you look at her '
				);
				if (perYou.checkFlag(25)) md.write(' you could put her into a trance quick using Mr Beasley\'s technique.')
				else if (perYou.checkFlag(24)) md.write(' you doubt she would respond to basic hypnosis at the moment, also other people around would make it difficult for you.');
				else md.write(' you are uncertain what to do.');
				md.write('</p><p>It does cross your mind that at least you prevented this breeding attempt!</p>');
				startQuestions();
				if (perYou.checkFlag(25)) {
					// Have seen her tablet and can potentially charm her now in these events
					addLinkToPlaceC(md, "use the technique to put her into a trance", 234, 'type=loganhypno&from=restaurant');
				}
				addLinkToPlace(md, 'apologise and leave her alone', 195, 'You apologise that you have forgotten what you needed to ask her and leave the restaurant for now, and as you are walking nearby you notice Miss Logan leave as well.');
				WritePlaceFooter(md);
				return true;
			}
			if (Place == 234 && (sType === "" && !this.checkFlag(10)) || sType == "loganclasssex1" && (getHour() < 12 || getHour() >= 14)) {
				// Anatomy class before 12 and after 2pm
				setQueryParams("type=loganclasssex1");
				this.setFlag(10);
				md = WritePlaceHeader();
				this.showPersonRandomRorX("public-class", 2);
				addPlaceTitle(md, "Miss Logan\'s Parent Teacher Meeting");
				md.write(
					'<p>As you enter the classroom you see Miss Logan with two men, you think they are parents of students here, from the lower classes, but you are not quite sure, but you are fairly sure they are not students. They are quite simply fucking, Miss Logan is doing her best to satisfy both of them at once and seems to be handling them with skill and experience.</p>' +
					'<p>It would seem your anatomy teacher has sought out people to study reproduction with. Doubly so as you hear her muffled exclamaition, "Creampie me, both of you!"</p>' +
					'<p>You can just leave them \'alone\' but then again she is supposed to be <b>yours</b> so you could try to interrupt them before their meeting comes to the end she just asked for?</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'leave them alone', 70, '', 'You decide to leave the classroom for now, and return to the hallway. You must have been noticed as you hear the classroom door being locked behind you.');
				addLinkToPlace(md, 'interrupt them', Place, 'type=loganclasssex2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "loganclasssex2") {
				// Classroom
				md = WritePlaceHeader();
				this.showPersonRandom("public-class-interrupt", 1);
				addPlaceTitle(md, "Miss Logan Interruptus");
				md.write(
					'<p>You call out to Miss Logan as you walk towards them, saying there is something important you need to discuss. She look up quite annoyed at you, and the men she is with look more embarrassed. You guess they was lost in the moment and as you approach they hurriedly dress and then just leaves without a word.</p>' +
					'<p>Miss Logan asks what you want and as you look at her '
				);
				if (perYou.checkFlag(25)) md.write(' you could put her into a trace quick using Mr Beasley\'s technique.')
				else if (perYou.checkFlag(24)) md.write(' you doubt she would respond to basic hypnosis at the moment, also other people around would make it difficult for you.');
				else md.write(' you are uncertain what to do.');
				md.write('</p><p>It does cross your mind that at least you prevented this breeding attempt!</p>');
				startQuestions();
				if (perYou.checkFlag(25)) {
					// Have seen her tablet and can potentially charm her now in these events
					addLinkToPlaceC(md, "use the technique to put her into a trance", Place, 'type=loganhypno&from=class');
				}
				addLinkToPlace(md, 'apologise and leave her alone', 70, 'You apologise that you have forgotten what you needed to ask her and leave the classroom for now, and as you do you hear the door closed and locked behind you.');
				WritePlaceFooter(md);
				return true;
			}			
		}

		var perBreeder;
		if (sType == "missloganbreeder") {
			// Breed her with someone else
			perBreeder = findPerson(sWho);
			md = WritePlaceHeader();

			switch(sWho) {
			case "mrbeasley":
				perBreeder.showPerson("beasley14b.gif");
				addPlaceTitle(md, "Miss Logan's Breeder, Mr Beasley");
				md.write(
					'<p>"I\'m... not sure about this."</p>' +
					'<p>Miss Logan is understandably hesitant when you propose that a colleague should impregnate her, probably even more when that colleague is Mr Beasley, but you can be quite convincing if need be.</p>' +
					'<p>You pitch your teacher like he is some sort of breeding animal, much to his annoyance, praising his physique and girth while at the same time making sure to mention that his shoddy personality won\'t be much of an issue since all you need him for is his sperm anyway.</p>' +
					'<p>Mr. Beasley grinds his teeth at being forced to endure this indignity, but you do manage to convince Miss Logan that he would be a good sperm donor, making her all the more enthusiastic about doing this.</p>' +
					'<p>"You\'re right, let\'s not wait any longer and have your stud breed me already!" Miss Logan takes off the rest of her clothes and smiles to you. "And you should join us, too! The more the merrier and I don\'t care who knocks me up!/We could get pregnant together and have lots of Babies!"</p>'
				);
				break;
			case "johnadams":
				if (isExplicit()) perBreeder.showPersonX("breed.jpg");
				else perBreeder.showPerson("john4.jpg");
				addPlaceTitle(md, "Miss Logan's Breeder, John Adams");				
				md.write(
					'<p>Miss Logan takes a long, scrutinizing look at John, ordering the visibly bewildered man to take of his shirt and spin around.</p>' +
					'<p>“I like this one, but he looks like he may get clingy after knocking me up.”</p>' +
					'<p>You shush John as he tries to answer and speak for him instead, explaining that he has a wife to return to and is just doing this as a favor for you.</p>' +
					'<p>“Oh, so an open relationship! I\'ve been in one of those, too!” Miss Logan is visibly exited now. ”My partner was amazing and taught me so much about sexuality and how to entice potential breeding partners.”</p>' +
					'<p>Again, John tries to insert himself, but this time, it\'s Ms, Logan who interrupts him.</p>' +
					'<p>“I\'ve learned so much from her and will gladly pass on all I know to you so you can give your wife lots and lots of Babies as well!”</p>' +
					'<p>Miss Logan takes John\'s hand and drags him with her towards the bedroom.”</p>' +
					'<p>“And with ' + perYou.getPersonName() + ' here we can learn even more. ' + (perYou.isMaleSex() ? 'Two cocks have a much higher chance to impregnate a woman, after all.' : 'It\'s always good to have another female around to help entice the male. And maybe she\'ll get pregnant as well!') + '”</p>'
				);				
				break;	
			case "charlie":
				perBreeder.showPerson("gym2.jpg");
				addPlaceTitle(md, "Miss Logan's Breeder, Charlie");				
				md.write(
					'<p>“M... Miss Logan?”</p>' +
					'<p>Charlie\'s eyes go wide when he sees Miss Logan before him in little more than her underwear, and while it seemingly takes her a moment, she does recognize him, too.</p>' +
					'<p>“Charlie King? Oh yes, it -is- you!” She smiles brightly. “I haven\'t seen you since you graduated! And oh my, you have grown into a fine looking young man.”</p>' +
					'<p>“Th...thank you, Ma\'am.” Charlie is visibly flustered seeing his former teacher practically undress him with her eyes, especially when those eyes linger on the bulge involuntarily forming in his pants, and his head quickly snaps to you. “You didn\'t tell me that the chi... the lady you want me to... to have sex with would be my former biology teacher!”</p>' +
					'<p>You didn\'t know that, either, but before you are able to answer, Miss Logan is already addressing it.</p>' +
					'<p>“This isn\'t suddenly a problem, is it? I remember quite well how you and your friends looked at me when I began dressing more openly, or what you were saying you wanted to do with me and Emanuelle when you thought we couldn\'t hear you.”</p>' +
					'<p>“This was... we were...”</p>' +
					'<p>“...having urges that I was not allowed to properly teach you boys about, I know.” Miss Logan again interrupts him, and by now Charlies head is a deep shade of red.</p>' +
					'<p>“If I remember correctly, you once said you\'d “love to bend me over my desk” and “pound my pussy until I scream”. So let\'s start with that and work ourselves up from there.”</p>' +
					'<p>Charlie is completely dumbstruck as his former teacher pushes him towards the bedroom, but with the spell affecting him, there is no way he could deny her even if he wanted to, and Miss Logan won\'t take no for an answer anyway.</p>' +
					'<p>“You\'re joining in, too, right, ' + perYou.getPersonName() + '?” You hear her shout from the bedroom. ' + (perYou.isMaleSex() ? '“I like to keep my chances high!' : '“We could get pregnant together!') + '”</p>'
				);				
				break;	
			case "daria":
				perBreeder.showPerson("mothersuperior7f.jpg");
				addPlaceTitle(md, "Miss Logan's Breeder, Daria");				
				md.write(
					'<p>Miss Logan looks skeptical when a nun enters her house, but only about until the Mother Superior takes off her habit and reveals she is wearing nothing underneath besides her magically gifted cock.</p>' +
					'<p>“I did not expect this... have you always been...”</p>' +
					'<p>“...blessed like this?” Daria interrupts her. “No, this divine tool has only recently been gifted to me, but I have already shared its blessings with many of my sisters and disciples, and I will gladly share them with you as well.”</p>' +
					'<p>Miss Logan chuckles at that, but she is clearly intrigued by how much Daria\'s cock grows as she begins stroking it.</p>' +
					'<p>“You are either really dedicated to an erotic roleplay, or at the center of some Cult, but if ' + perYou.getPersonName() + ' believes you to be a good choice to impregnate me I will gladly receive your “blessing”.”</p>' +
					'<p>“You will find ' + perYou.getHimHer() + ' wise beyond ' + perYou.getHisHer() + ' years when it comes to the joys of the flesh. And if you do enjoy my blessings, I would love to regularly see you at church, too.”</p>' +
					'<p>Miss Logan says that she will at least consider it, and as she vanishes into her bedroom, Daria takes you aside.</p>' +
					'<p>“' + perYou.getMaster() + ', will you assist me with this potential disciple of the flesh? Nothing would please me more to spread the gospel by your side.”</p>'
				);				
				break;
			case "louise":
				perBreeder.showPerson(perBreeder.checkFlag(4) ? "poledancebefuta.jpg" : "poledancefuta.jpg");
				addPlaceTitle(md, "Miss Logan's Breeder, Louise");				
				md.write(
					'<p>Miss Logan welcomes Louise into her home, but it\'s obvious that she didn\'t expect you to invite another woman.</p>' +
					'<p>“' + perYou.getPersonName() + ' said you will help impregnate me, ' + (perYou.isMaleSex() ? 'and I\'m always happy to have another girl with me to entice my stud and maybe bear another child.”' : 'but I\'m not sure how anyone of us could become pregnant without a man present.”') + '</p>' +
					'<p>“I\'m not here to be impregnated, I think?” Louise looks to you for a moment, and there is a sign of relive on her face as you nod.</p>' +
					'<p>“' + perYou.getMaster() + ' wants me to be here because of this.”</p>' +
					'<p>Miss Logan\'s eyes go wide when Louise reveals her already half erect cock and begins to slowly stroke it, small drips of precum already leaking off.</p>' +
					'<p>“This is... unexpected, I would never have thought that you are....</p>' +
					'<p>“I\'m a woman!” Louise interrupts her, the cock growing to an impressive length under her attention.</p>' +
					'<p>“' + perYou.getPersonName() + ' likes my... dick, so I like it, too, but I am still a woman.”</p>' +
					'<p>There is a certain tension in Louise\'s voice, but she is still not able to stop stroking herself while in your presence. Luckily, Miss Logan gets the hint. “I was going to say “so well-endowed”, of course you are a woman.”</p>' +
					'<p>The comment seems to relax Louise somewhat, and she turns her attention back to you.</p>' +
					'<p>“I am still a little unsure about... this.” She gestures vaguely towards her crotch. “But if you want me to impregnate one of your other slaves or girlfriends I happily do it for you, ' + perYou.getMaster() + '.”</p>' +
					'<p>“Will you be with me when I do it?</p>'
				);				
				break;
			case "jenny":
				perBreeder.showPerson("jenny11.jpg");
				addPlaceTitle(md, "Miss Logan's Breeder, Jenny");				
				md.write(
					'<p>“Jenny!”</p>' +
					'<p>Miss Logan, half naked as she is, rushes to the door to give the waitress a hug. “I had no idea that you\'re a friend of ' + perYou.getPersonName() + '.”</p>' +
					'<p>“' + capitalize(perYou.getHeShe()) + '\'s a regular at the Bavaria Hut, just like you.” Jenny seems to be completely unphased by your teachers nudity. The two women trade kisses to the cheek like old friends and Miss Logan quickly asks the waitress to join her inside.</p>' +
					'<p>“I heard that you decided to actually have a baby, now.”</p>' +
					'<p>Jenny waste no time getting to the point, and Miss Logan beams as she answers.</p>' +
					'<p>“Yes. I\'m not sure why but it feels like a good time to start a family.”</p>' +
					'<p>“And live out your long held secret fetish.”</p>' +
					'<p>“That too.”</p>' +
					'<p>The two woman share a laugh. You knew that Miss Logan likes to eat at the Bavaria Hut, but only now you see that the Bratwurst may not be the main reason.</p>' +
					'<p>“Nunja, thanks to ' + perYou.getPersonName() + '...” She motions to you conspiratorially. “...I may be able to help with that.”</p>' +
					'<p>Jenny makes a big show out of slowly pulling up her skirt as more and more of her magic cock becomes visible, and while Miss Logan seems to be bemused at first, she quickly realizes that this is not just a very realistic strap on.</p>' +
					'<p>“But... this is... how...?” She looks from Jenny to you and back, her eyes wide. “You definitely didn\'t have that last summer at the hotel pool.”</p>' +
					'<p>“Nunja...” Jenny scratches the back of her head. “I\'m not sure how ' + perYou.getPersonName() + ' did it, but it\'s working just like a man\'s tool. We tested it... a lot.”</p>' +
					'<p>Miss Logan looks dumbstruck for a moment. You think you notice the pink glow in her eyes flashing up as if the spell reasserts dominance over her mind, but after that, she has a very enthusiastic smile on her lips.</p>' +
					'<p>“Well, I\'d love for you to be the mother of my children, Jenny. And I can\'t wait to...” There is a short pause.” ...deinen harten Schwanz in meiner feuchten Fotze zu spüren? Was that correct?”</p>' +
					'<p>“If you wanted to be -really- vulgar, yes.” Again, the two women share a laugh before Jenny turns to you.</p>' +
					'<p>“Thank you for letting me help the two of you, ' + perYou.getMaster() + '. Do you want to join in, or just watch?” She grins mischievously. “I love being watched, you know, but I love sex with you even more.”</p>'
				);				
				break;				
			}
			startQuestions();
			addLinkToPlace(md, "stay out of it and just watch", Place, 'type=missloganbreederwatch&who=' + sWho);
			addLinkToPlace(md, "join in", Place, 'type=missloganbreederjoin&who=' + sWho);			
			addLinkToPlace(md, "reconsider and send " + perBreeder.getPersonName() + " away", Place, '', 'Maybe you reconsidered the suitability of the breeder or maybe you want to keep Miss Logan for yourself. Either way, you decide it\'s best to send ' + perBreeder.getPersonName() + ' away and promise Miss Logan to ' + (perYou.isMaleSex() ? 'impregnate her yourself' : 'find another mate for her') + '.');
			WritePlaceFooter(md);
			return true;			
		}
		if (sType == "missloganbreederwatch") {
			// Breed her with someone else - do it
			perBreeder = findPerson(sWho);
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson(perBreeder.isFuta() ? "loganbreed2.jpg" : "loganbreed1.jpg");
			addPlaceTitle(md, "Miss Logan's Breeding");
			md.write(
				'<p>Miss Logan\'s initial disappointment doesn\'t last long. And soon, she finds herself on all fours with ' + perBreeder.getPersonName() + '\'s cock deeply inside her,</p>' +
				'<p>She is very enthusiastic, begging and moaning and demanding to be fucked harder and deeper and faster in a way that would probably cause ' + perBreeder.getPersonName() + ' some performance anxiety if not for the spell keeping them perpetually hard even after they reach a climax.</p>' +
				'<p>In fact, you make sure to use it to increase their arousal even further to the point where they seem barely able to think of anything but pounding your teacher\'s pussy and shooting their load into her.</p>' +
				'<p>And well, they get to do that a lot.</p>' +
				'<p>It takes more than one go until Miss Logan is satisfied, and she has put a scary amount of thought into this. ' + perBreeder.getPersonName() + ' gets to take her in several positions that may or may not improve fertility with little to no break in-between orgasms, and even under the spell the whole session leaves them visibly exhausted.</p>' +
				'<p>In the end, Miss Logan does look satisfied, in more than one way, but ' + perBreeder.getPersonName() + ' has to promise her to be back and try again until they have been successful.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "send " + perBreeder.getPersonName() + " home and tend to your teacher", Place);
			WritePlaceFooter(md);
			return true;			
		}	
		if (sType == "missloganbreederjoin") {
			// Breed her with someone else - join in
			perBreeder = findPerson(sWho);
			md = WritePlaceHeader();
			this.showPerson(perYou.isMaleSex() ? "loganbreed3.jpg" : "loganbreed4.jpg");
			addPlaceTitle(md, "Miss Logan's Breeding");
			if (perYou.isMaleSex()) {
				md.write(
					'<p>Miss Logan demands that no drop is wasted, so you and ' + perBreeder.getPersonName() + ' take turns ravaging her pussy in a variety of positions she claims will improve the odds of getting pregnant. It\'s very apparent that your teacher has put a scary amount of thought into this, and with the spell essentially eliminating whatever had kept her from living out that fantasy, she has a lot to catch up on.</p>' +
					'<p>Essentially, Miss Logan doesn\'t care about the actual sex as much as she loves the feeling of someone cumin inside her, and she will make that very clear whenever she feels that one of you is taking too long to do just that.</p>' +
					'<p>Luckily, two cocks are more than enough to keep her happy. ' + perBreeder.getPersonName() + '\'s presence for once allows you to occasionally catch a breather with her, and in the end, the two of you are leaving her more than satisfied, at least for the day.</p>'
				);
			} else {
				md.write(
					'<p>Miss Logan\'s eyes light up when you agree to join her, and before you are able to say anything more, she has already pulled you into a tight embrace.</p>' +
					'<p>“It\'s just as we practiced it, ' + perYou.getPersonName() + '.” She whispers conspiratorial while her hands slip under your top. “When the females are getting hot, they put on a show to entice the male to breed them.”</p>' +
					'<p>Before you know it, Miss Logan has you spun around to face ' + perBreeder.getPersonName() + ', taking off your top in one swift motion and squeezing your breasts.</p>' +
					'<p>“Men love it when we play with each others breasts...” You feel her nipples harden under her touch, her fingertips expertly teasing you. “If done right...” She princes your nipples just enough to cause a brief jolt of pain and make your gasp. “Their cocks will harden and signal a willingness to mate.”</p>' +
					'<p>This is not the first time Miss Logan has turned sex with you into a lesson on how to put on a show for a potential mate, but seeing ' + perBreeder.getPersonName() + ' actually getting hard and taking out their cock is something else entirely, and you can\'t help notice that she has taken control of the situation away from you.</p>' +
					'<p>Miss Logan shushes you when you try to speak and, to your surprise, ignores any further attempt to exert control, her desire to see herself, and possibly you, impregnated stronger than even her compulsion to obey.</p>' +
					'<p>You catch a faint glimpse of ' + perBreeder.getPersonName() + ' undressing as Miss Logan pushes you to the ground and removes what remains of your clothes, her naked body now on top of you.</p>' +
					'<p>“Of course, most importantly, the female needs to be wet.”</p>' +
					'<p>You moan softly as you feel her fingers spread your folds and playfully circle your clit, and your reaction only encourages her.</p>' +
					'<p>“Good, relax just as we\'ve practiced it.” She pushes deeper into you, and you can\'t deny that as weird as this situation is, she very much knows what she is doing. “As the female\'s arousal increases, her body gets ready for the male\'s cock...” You are gasping for air when her fingers retreat and Miss Logan shifts position to spread your legs and lift your hip. “Who should by now be sufficiently enticed to play his part.”</p>' +
					'<p>' + perBreeder.getPersonName() + ', of course, understands the hint. You see him get into position behind Miss Logan, and feel her twitch on top of you the moment he enters her.</p>' +
					'<p>“Hmmmyes! Please breed me... breed us!”</p>' +
					'<p>You feel Miss Logans clit brush against yours with every trust before ' + perBreeder.getPersonName() + ' pulls out and finally pushes into your own tunnel as well. Their thick shaft stretching you for several strokes before They once again switches back to your teacher, luring a loud moan from her lips.</p>' +
					'<p>In the next half hour, ' + perBreeder.getPersonName() + ' alternates between the two of you while you and Miss Logan trade deep and passionate kisses, you feel him cum inside you several times, and you are sure he services your teacher just as often, but she is nigh insatiable and with the spell keeping their arousal at peak, your chosen stud is always ready to go for another round.</p>' +
					'<p>By the time you feel the last load flow into you, all three of you are sweaty and exhausted. ' + perBreeder.getPersonName() + ' looks ready to sleep for several days straight, but you don\'t think you\'ve ever seen Miss Logan as content as she is now.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, "send " + perBreeder.getPersonName() + " home and tend to your teacher", Place);
			WritePlaceFooter(md);
			return true;			
		}			
		
		return false;
	};
	
	// Cast a spell on Miss Logan
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// At the School Hallway and she is present?
			if (Place == 70 && this.isHere()) {
				if (this.other == 1) {
					// Miss Logan in the hallway
					if (isSpellKnown("Shielded Charm")) addComments('Even using Shielded Charm, it is really just too public here. It would be best to find a more private place.');
					else addComments('It is really just too public here. It would be best to find a more private place.');
					return "handled";
				}
			}
			// At the Restaurant public area and she is present?
			if (Place == 196 && this.isHere()) {
				if (!isSpellKnown("Shielded Charm")) addComments('Even using Shielded Charm, it is really just too public here. It would be best to find a more private place.');
				else addComments('It is really just too public here. It would be best to find a more private place.');
				return "handled";
			}
			
			//Anatomy Classroom
			if (Place == 234 && this.other > 5 && this.isHere()) {
				// Miss Logan Path Active & In the room
				if (this.getCharmedLevel() == 1) {
					addComments("Miss Logan is under your charm spell, but not under your control for some reason. The spell does nothing washing over her and the mana returning to you.");
					return "handled";
				} else if (sType === "") {
					if (this.getCharmedLevel() == 2) addComments("Miss Logan is already under your charm spell, and she is focused on breeding and reproduction. You do not think you will be able to shake her of this obsession.");
					else if (this.getCharmedLevel() == 4) addComments("Miss Logan is already under your charm spell, but it is possible you may be able to firther discuss reproduction with her, but for some reason you think you will have to do this somewhere else...");
					else if (this.other == 6) addComments("Miss Logan seems to be distracted, while the spell may work it would be better to have her attention to better influence her.");
					else if (!this.isNeuro()) {
						CastCharmSpell("MissLogan", Place, 4, 'type=charmlogan1');
						return "handled";
					} else {
						CastCharmSpell("MissLogan", Place, 1, 'type=charmloganpartial1');
						return "handled";
					}
					return "handled";
				}
			}
			
			// The Pool
			if (Place == 269 && this.isHere()) {
				// Miss Logan is HERE
				if (!isSpellKnown("Shielded Charm")) addComments('Don\'t cast the spell here. It is too public.');
				else if (!isCharmedBy("Bambi", "You")) addComments("You may need access to a room here at the hotel, and they are out of your price range. Talk to the staff first, well by talk, maybe more like charm!");
				else CastCharmSpell("MissLogan", Place, 2, '', '', 'type=recharmlogan1');
				return "handled";
			}

		}
		
		// Casting the transform spell
		else if (no == 18 && cmd == 2) {

			// At the general store?
			if (this.isHere()) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her");
					return "handled";
				}
				if (!CastTransform(1, true)) return "handled";

				// It can be cast
				setCommentsNoClick(
					'<div class="conversebubble" style="cursor:default">' +
					'<table><tr><td width="80%"><p>You decide to try the transformation spell on Miss Logan and tell her to prepare herself. As you start to recite the spell she falls into a sort of trance, and you get a clear impression that this change is <b>irreversible</b>.</p>'
				);
				addOptionLink("comments", 'let\'s do it', "ClearComments();dispPlace(" + Place + ",'type=transformage')");
				addOptionLink("comments", "do not do it", "ClearComments();dispPlace()");
				addComments('</td><td width="20%">' + this.addPersonString(Place == 269 ? "pool-talk.jpg" : "class-reproduction-charmedbreeder.jpg") + '</td></tr></table>');
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	per.addPersonPhoneCall = function() {
		if (this.isCharmedBy() && !this.checkFlag(4) && this.whereNow() == 440) {
			// SMS 1 day later when she is at home
			if ((this.hoursCharmed() > 24 && this.getCharmedLevel() > 2) || (this.getCharmedLevel() == 1)) {
				if (makeCall(true, 43)) this.setFlag(4);
			}
		}
		if (this.other == 12 && !this.checkFlag(12) && this.getCharmedLevel() == 1 && !isDay()) {
			// SMS 2 day after second study session (neurology)
			if (makeCall(true, 44)) this.setFlag(12);
		}
		if (this.other == 1 && !this.checkFlag(13) && this.getCharmedLevel() == 1 && !isDay()) {
			// SMS 2 day after second study session (neurology)
			if (makeCall(true, 45)) this.setFlag(13);
		}		
		return false;
	};

	per.getPersonSMS = function(id) {
		switch(id) {
			case 42:
				// Miss Logan part of exchange with Ms Jones
				return receiveSMS('FascinatingAnatomy', 'Both Ms. Jones and me are always ready for private tutoring, of course. You don\'t have to worry about your grades, but that does not mean you shouldn\'t strife to improve yourself!', 'smsjones1.jpg');

			case 43: 
				// SMS 24 hrs after charming her
				if (this.getCharmedLevel() == 1) return receiveSMS('MissLogan', 'I was just thinking about your assignment and our discussion, we really need to get together, I really need it as soon as possible', 'smsneuro1.jpg');
				if (this.getCharmedLevel() == 2) return receiveSMS('BreedingBitchLogan', perYou.isMaleSex() ? 'I was just thinking why not cum here...and often' : 'I was thinking we need more practice and also someone to knock us up', 'smsrepro1.jpg');
				return receiveSMS('Miss Logan', 'I was just thinking of all the things I could teach you', 'smsrepro1.jpg');
				
			case 44:
				// SMS after study session 2 (neuro)
				return receiveSMS('MissLogan', 'You should be finished your assignment soon, unfortunately we are not discussing reproduction. Maybe after you are done...', 'smsneuro2.jpg');
				
			case 45:
				// SMS after last study session (neuro)
				return receiveSMS('HotForTeacher', 'Hey there, like what you see, I need it hard and deep...', 'smsneuro3.jpg') + receiveSMS('MissLogan', perYou.getPersonName() + ', sorry, please delete my last message, you are not the one I need for this...');
		}
		return '';
	};
}