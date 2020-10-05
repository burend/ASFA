var perBeasley;

/*****************************************************
		Mr Beasley Responses
 *****************************************************/
function RepliesBeasley(nR)
{
	var perB = per;
	//var pCharm = perB.isCharmedBy();
	var myName = perB.getYourNameFor();
	var perKate = findPerson("Kate");
	var nm = perB.getPersonName();

	var a = Math.random();
	var ret = true;

	if (nR == 190)
	{
		if ((isMurderPath() || perGates.other == 700) && perB.other < 3) perB.other = 1;
		perB.setFlag(7);
		addComments(
			'<img src="UI/books/book1.png" style="float:left;width:15%;margin:0 5px 5px 0">"The book? Oh yes the book. Where did you... never mind. Only a person who has mana can use the book. Perhaps, if you give it to me, I can help you?"</p>' +
			'<p>He looks at the book again, and continues,</p>' +
			'<p>"Give me the book to study, together we can discover the secrets it contains. I am an expert in the occult and magical practises, more so than someone like ' + perGates.getPersonName() + '"</p>' +
			'<p>He seems to be trying hard to convince you...</p?'
		);
	}
	else if (nR == 187)
	{
		WriteCommentsHeader();
		perB.setFlag(6);
		addComments('You tell him, "No way, I have the book and I will keep it!"');
	}
	else if (nR == 189)
	{
		if ((isMurderPath() || perGates.other == 700) && perB.other < 3) perB.other = 1;
		perB.setFlag(8);
		WriteCommentsHeader();
		if (perGates.other == 700) addComments('<p>Then again, you are not sure you trust Mr. Beasley.</p>');
		else addComments('<p>Then again, you are ' + perGates.getPersonName() + '\'s apprentice, and he should be able to give you all the help you need.</p>');
	}
	else if (nR == 191)
	{
		perB.other = 2;
		addComments('"You do not know what mana is! Don\'t you listen in class? It is the power of magic. Without it, a warlock is powerless."');
	}
	else if (nR == 192)
	{
		if (isMurderPath() || isConspiracyPath()) perYou.completeQuest(1);
		perB.other = 3;  // Sets this to 3 Murder && apprentice
		if (perGates.other == 9) perGates.other = 10; // Gates Alive - Apprentice Path
		setPlaceKnown("WildRanges");
		setPlaceKnown("Park");
		PlaceI(5, 26); // Set stone in the wild ranges
		addComments('"Rumour has it," he says with an overly dramatic sigh, "that mana can be found at the stones in the wild ranges, to the north of the park. Oh, and usually is stored in special stones of some kind. Now please let me get on with my work."');

	}
	else if (nR == 193)
	{
		perB.other = 4;
		addComments('"It is a complex spell called \'Possession\', one that has cost me a lot of money to research. I would, of course, require compensation for all of this effort on your behalf."');
	}
	else if (nR == 194)
	{
		perB.other = 5;
		addComments('"Oh..." he says, eyeing you up and down in a way that makes even you feel uncomfortable. "I would imagine ' + sCurrency + '100 should cover my expenses.  Sound good to you, ' + myName + '?"');

	}
	else if (nR == 195)
	{
		if (nMoney < 100) addComments('"What is this?" He asks.  "There is only ' + sCurrency + nMoney+' here.  Come back when you have enough."');
		else {
			perB.other = 6;
			AddCash(-100);
			addComments('"Pleasure doing business with you, ' + myName + '," he says as he slips your cash into his wallet.');
			if (!isRunes()) {
				bChatLeft = false;
				setQueryParams("type=learnpossession");
			} else {
				Research("Spell", "UnstrHun");
				ret = false;
			}
		}
	}
	else if (nR == 196)
	{
		addComments('"Go ahead and give it a try..."');
		if (!isRunes()) {
			bChatLeft = false;
			setQueryParams("type=learnpossession");
		} else {
			Research("Spell", "UnstrHun");
			ret = false;
		}
	}
	else if (nR == 1931) // Charmed version of learning the spell
	{
		addComments('"Yes Mistress, of course," ' + perBeasley.getHeShe() + ' says, groveling before you. "Tell me how I may serve you."');
		if (perB.other == 6 && !isDavyDefeated()) // have already paid him $100
		{
			addComments('Suddenly remembering something, he frantically begins rummaging through his pockets and desk drawers.<br>');
			addComments('"Ah, here..." he mumbles.  "Please take back your ' + sCurrency + '100, Mistress, I should not have dared ask you for it."<br>');
			addComments('Mr. Beasley gives you ' + sCurrency + '100.');
			AddCash(100); // adds cash back
		}
		else perB.other = 7;
	}
	else if (nR == 579)
	{
		addComments('"I have no idea where the book is. Leave me alone or you will regret it."');
		setPersonOther("Diane", 10);
	}
	else if (nR == 700)
	{
		addComments(
			'You ask Mr. Beasley if he knows about demonology and how to free someone from being enslaved by a demon,</p>' +
			'<p>"Well ' + myName + ', I know the basics of how to summon a demon at certain <i>thin</i> or powerful places. They will then do you will, both carnal and mundane, but you must be very careful. They will obey any deal to the letter, but will try to twist and corrupt it for their pleasure where possible."</p>' +
			'<p>This is not quite what you wanted and ask again on freeing a person, and he shakes his head "No, nothing on freeing a person"</p>'
		);
		setPersonFlag("Leanne", 11);
	}
	else if (nR == 5501)
	{
		moveDavyToHotel2();

		addComments('"Davy has taken Kate Granger to the hotel, ' + myName + '. There he stays at room 101."<br>');
	}
	else if (nR == 5502)
	{
		if (perYourBody.NoItems < perYourBody.MaxItems)	{
			if (perYourBody.FindItem(4) === 0) perYourBody.PutItem(4);
			addComments('"Of course, ' + myName + '," ' + perBeasley.getHeShe() + ' says with an evil grin.  "You can have anything you\'d like."');
		}
		else addComments('"I would love to, ' + myName + ', but - and I mean no offense - I don\'t think you could carry any more."');
	}
	else if (nR == 5503)
	{
		perYou.setFlag(25);
		perYou.extra[11] += 9;
		addComments(
			"<img src='UI/hypnosis.jpg' style='width:20%;float:right;margin-bottom:1em;margin-left:5px' alt='Hypno'>" +
			nm + ' teaches you a simple technique, a combination of a gesture, a touch and some words that augments hypnosis. It costs 1 mana, and does an instant induction, putting the person into a trance in a few seconds. They are also a little more receptive of your suggestions.'
		);
		updateRightBar();
	}
	else if (nR == 5504)
	{
		perYou.setFlag(12);
		setComments(
			'<span onclick="ClearComments();dispPlace()" class="zoom-icon" style="color:black;top:0.5em;right:5%">&#215;</span><div class="conversebubble">' +
			'<p style="margin-top:0em; margin-bottom: 0.5em;font-size:large;cursor: pointer"><b>' + perB.getPersonName() + '</b></p>' +
			"<img src='Images/" + this.getImg(this.getPossessionFace() + '.jpg') + "' style='width:20%;float:right;margin-bottom:1em;margin-left:5px' alt='Beasley'>" +
			'You order ' + nm + ' to tell more about the nature of hypnotism and altering peoples behaviours,</p>' +
			'<p>"A combination of light hypnosis combined with a magical technique I had learned from my family archives can prepare people for many things. I have been working on the Ross sisters recently, Amy thought it was to help focus on her studies, and her sister Catherine wanted help with her fear of spiders and I offered to help. I was actually trying to bring out their inner slut, to get them to focus on my coc..orders, and it had been remarkably easy."</p>' +
			'<p>A thought crosses your mind as ' + perBeasley.getHeShe() + ' says this, that your friend, Amy\'s sister Catherine has no inner slut, from how she talks about her relationships she is <b>all</b> slut! You are surprised about Amy though, but she is always reluctant to talk about relationships, changing the conversation and getting Catherine to talk about some racy details of her last lover.</p>' +
			'<p>You then ask ' + perBeasley.getHimHer() + ' to tell you more about the hypnotic technique he mentioned,</p>' +
			'<p>"' + perYou.getMaster() + ' do you understand the basics of hypnosis?", to which you tell him you do not, "Then please study the basics and come back to me for a lesson. The lesson will be the same as other <b>magical techniques</b> and will require some magical experience to learn."'
		);
		alterComments("10%", "85%", function() { ClearComments(); dispPlace(); });
		return false;
	}
	else if (nR == 5505)
	{
		perB.setFlag(9);
		if (perB.isCharmedBy()) {
			setComments(
				'<span onclick="ClearComments();dispPlace()" class="zoom-icon" style="color:black;top:0.5em;right:5%">&#215;</span><div style="margin-top:1.5em;margin-bottom:2em;margin-left:4.5em;margin-right:4.5em;margin-left:5vw;margin-right:5vw">' +
				'<p style="margin-top:0em; margin-bottom: 0.5em;font-size:large;cursor: pointer"><b>' + perB.getPersonName() + '</b></p>' +
				"<img src='Images/" + this.getImg(this.getPossessionFace() + '.jpg') + "' style='width:20%;float:right;margin-bottom:1em;margin-left:5px' alt='Beasley'>" +
				'You order ' + nm + ' to tell how he was able to charm both Amy and Catherine, there is no way he knew anything more than the basic Charm spell,</p>' +
				'<p>"I had been preparing those two for a while now, using light hypnosis combined with a magical technique I had learned from my family archives. Amy thought it was to help focus on her studies, and her sister Catherine wanted help with her fear of spiders and I offered to help. I was actually trying to bring out their inner slut, to get them to focus on my coc..orders, and it had been remarkably easy."</p>' +
				'<p>A thought crosses your mind as ' + perBeasley.getHeShe() + ' says this, that your friend, Amy\'s sister Catherine has no inner slut, from how she talks about her relationships she is <b>all</b> slut! You are surprised about Amy though, but she is always reluctant to talk about relationships, changing the conversation and getting Catherine to talk about some racy details of her last lover.</p>' +
				'<p>You then ask ' + perBeasley.getHimHer() + ' to tell you more about the hypnotic technique he mentioned,</p>' +
				'<p>"' + perYou.getMaster() + ' do you understand the basics of hypnosis?", to which you tell him you do not, "Then please study the basics and come back to me for a lesson. The lesson will be the same as other <b>magical techniques</b> and will require some magical experience to learn."'
			);
			alterComments("10%", "85%", function() { ClearComments(); dispPlace(); });
			return false;
		} else {
			addComments('"Hypnosis can be deceptively useful, many think it is a trick used by performers to make people act like chickens. It is a powerful psychological tool and with care it can be a useful gateway to memories and to altering peoples behavior...as in to treat fears and the such...Still anything more is too advanced for a student such as yourself."');
		}
	}
	else if (nR == 5600)
	{
		addComments(
			'You ask ' + nm + 'about the Book and where it is. With some reluctance ' + perBeasley.getHeShe() + ' opens the desk drawer and places the book on ' + perBeasley.getHisHer() + ' desk.</p>'
		);
		if (whereItem(4) == 76) moveItem(4, 11);
	}
	else if (nR == 1000)
	{
		if (a<0.2) addComments('\"It is not in my research,\" he replies.');
		else if (a<0.6) addComments('\"You should look it up yourself,\" he replies.');
		else addComments('\"I am too busy to do your work for you,\" he replies.');
		perB.setFlag(2);

	}
	return ret;
}

// Servant Path
// see game.js
//function getBeasleyServant() { return getPersonOther("MrBeasley", 1); }
//function setBeasleyServant(no) { return setPersonOther("MrBeasley", no, 1); }

// Initialise
function initialiseBeasley()
{
	// Mr Beasley
	perBeasley = addPerson("Mr Beasley", 11, "Beasley", 'Male', false);
	perBeasley.Replies = RepliesBeasley;

	perBeasley.getPersonGender = function() { return this.checkAnyFlags(10, 12) ? "woman" : "man"; };
	perBeasley.isBornMale = function() { return true; };
	
	per.whereNow = function() {
		if (sType.indexOf("missloganbreeder") != -1) return Place;
		return this.place;
	};
	
	perBeasley.getDress = function(drs) {
		if (this.checkFlag(10)) return "Bimbo1";
		if (this.checkFlag(11)) return "Bimbo2";
		if (this.checkFlag(12)) return "Bondage";
		return "Male";
	};

	perBeasley.isPersonInfo = function() { return true; };
	perBeasley.getPersonInfo = function() {
		if (!this.isCharmedBy()) {
			// Uncharmed/male form
			return "<img src='Images/People/Beasley/Male/beasley11.jpg' style='width:28%;float:right;margin-left:5px' alt='Mr Beasley'>" +
				"Your least favourite teacher, Mr Beasley. It is not that he is nasty or harsh, you just cannot but help to feel he is a bit slimy; a creep." +
				"<br><br>" +
				"While there is nothing you can pin down, aside from his occasional leers at female students, and you have heard he has been reprimanded by the principal for it. It is probably more that he is so assured that he is superior to everybody, descended from the aristocracy and financially well-off." +
				"<br><br>" +
				"Yet, with all that, he is brilliant, an expert on science and oddly also matters of the occult, especially where it involves the history of Glenvale. As long as you deal with him carefully and tolerate his ways, then he could be a valuable ally.";
		} else {
			if (perBeasley.checkFlag(10)) {
				return "<img src='Images/People/Beasley/Bimbo1/beasley-transform.jpg' class='imgpopup' alt='Miss Beasley'>" +
					"The once mysterious teacher of yours, now a good natured, air-headed bimbo.";
			} else if (perBeasley.checkFlag(11)) {
				return "<img src='Images/People/Beasley/Bimbo2/beasley-transform.jpg' class='imgpopup' alt='Miss Beasley'>" +
					"The once mysterious teacher of yours, now a sex-obsessed bimbo slut.";
			} else if (perBeasley.checkFlag(12)) {
				return "<img src='Images/People/Beasley/Bondage/beasley-transform.jpg' class='imgpopup' alt='Miss Beasley'>" +
					"The once mysterious teacher of yours, now transformed into a cute woman, who seems submissive, but this seems to be on the surface only.";
			}
			return "<img src='Images/People/Beasley/Male/beasley11.jpg' class='imgpopup' alt='Mr Beasley'>" +
				"The mysterious teacher of yours has finally given in to your powers. He will no longer be an obstacle to your quest, instead he will be more than helpful with anything you wish of him. He admitted that He and Davy had been plotting against you when they first heard about that you came in contact with the power of magic. After apologizing for his previous behaviour Mr Beasley offered his vast knowledge of mind control to you. Your bald headed slave added that he can even teach you hypnotism if you can prove that you are ready for that training.";
		}

	};
	perBeasley.getPossessionFace = function() { return "beasleyface"; };

	perBeasley.getPersonName = function(full) { return this.getPersonGender() == "man" ? "Mr. Beasley" : "Miss Beasley"; };

	perBeasley.getYourNameFor = function() {
		if (this.checkFlag(12)) return perYou.getMaster();
		return perYou.getPersonName();
	};
	
	// popup events for Mr Beasley
	perBeasley.showEventPopup = function()
	{
		if (Place == 11 && this.place === 11) {
			// Show introduction if not shown before
			if (!perBeasley.checkFlag(1)) {
				perBeasley.setFlag(1);
				perBeasley.showPersonInfo(mdCache);
				return true;
			}
			
			// Futa reaction
			if (!this.checkFlag(15) && perYou.isFuta() && !perYou.isBornMale() && sType === "") {
				this.setFlag(15);
				if (this.dress == "Male") {
					showPopupWindow("Mr Beasley and Your Changes",
						perYou.addPersonString("xf-futa.jpg", "height:max%", "right") +
						'Beasley\'s leering eyes watch you intently as you undress before him, but he definitely didn\'t expect your newfound cock to suddenly plop free.</p>' +
						'<p>“How did you... is this the work of the Al Mass Spell?”</p>' +
						'<p>You confirm his guess and ask what he knows about the spell.</p>' +
						'<p>“It is another of the forbidden spells, just like the Dai Chu. The inquisition has actively destroyed every record of it for centuries and I can not fathom how you could have gotten a hold of a copy.”</p>' +
						'<p>Beasley is clearly envious of you. His expression shifts between devotion and disdain, torn by his magically induced lust for you and his desire to have the power you hold for himself.</p>' +
						'<p>It\'s time to remind him of his place, again, and on your order, he reluctantly gets on his knees.</p>' +
						'<p>“You can\'t expect me to service that... thing, ' + perYou.getPersonName() + '. I am a man!”</p>' +
						'<p>You flatly tell Beasley that he is a man who enjoys sucking cock now, and just to drive your point home, you remind him that even the part of him being a man could now easily change if you so desire.</p>' +
						'<p>“Of...of course.” The pink glow in his eyes flares up, and while he does grind his teeth at first, he soon begins to grovel before you. “I serve you however you desire.”'
					);
				} else if (this.dress == "Bondage") {
					showPopupWindow("Miss Beasley and Your Changes",
						perYou.addPersonString("xf-futa.jpg", "height:max%", "right") +
						'“You are far to reckless with the power of the Al Mass.” Miss. Beasley chastises you when she sees your cock. “Do you even know the risk\'s of...”</p>' +
						'<p>Her speech is cut off when you tell her to open her mouth wide and just keep it open, leaving her only with muffled grunts of protest as you order her to get on her knees.</p>' +
						'<p>You tell her more or less politely that her opinion has been noted, but remind her once again of her place and that she is expected to use her lips for things other than criticizing you.</p>' +
						'<p>Mrs. Beasley\'s eyes narrow as you approach her, cock out, and make sure the tip dangles right in front of her still opened mouth, ready to make her give you a demonstration of what exactly her duties will include from now on.'
					);				
				} else {
					showPopupWindow("Miss Beasley and Your Changes",
						perYou.addPersonString("xf-futa.jpg", "height:max%", "right") +
						'“Ohhh, is that a cock?” Miss Beasley licks over her lips. “I always wanted one of those! I mean, I, like, had one of those, once, I think, but now I prefer cocks from other people, not on me, but in me and....” Her mind seems to trail off trying to sort through what she just said.</p>' +
						'<p>“Uhhh... I don\'t know where I was going with this, but you should totes give me your cock, into my pussy, I mean.”'
					);					
				}
				return true;
			}
		}
		if (sType == "pickupbeasleypaper") {
			this.setFlag(14);
			showPopupWindow("Lecture Notes",
				"<img src='Images/phonenotes.jpg' class='imgpopup' alt='Notes'>" +
				"This lecture is a good starting point, you have to go and study it somewhere, unfortunately your phone is useless for anything like that.<br><br>" +
				"Your phone is at least good enough to keep a good set of notes and you regularly record important events and pieces of information in the <b>Notes</b> app there.<br><br>" +
				"Mind you, that recent problem you had reset your phone, so all previous notes were lost, you will rapidly make up for that! You will have to refill your address book as well!"
			);
			return true;
		}
		return false;
	};

	// events for Mr Beasley
	perBeasley.showEvent = function()
	{
		var md;

		// This event also is for Ms. Titus
		if (sType == "learnpossession") {
			// Learn Possession
			md = WritePlaceHeader(false, 'td-none');

			addPlaceTitle(md, "What is the Possession Phrase?");

			md.write(
				'<p>Enter the correct phrase for the possession spell:</p>' +
					'<form method="POST" name="FormChar">' +
						'<p><input type="text" size="20" name="research">' +
						'<input type="button" name="button" value="enter" onClick="ResearchOLD(\'S\',document.FormChar.research.value)"></p>' +
					'</form>' +
				'</p>'
			);

			startQuestions();

			if (perYou.isBornMale()) addLinkToPlace(md, 'try again later', 3);
			else addLinkToPlace(md, 'try again later', 11);

			AddRightColumnLarge(md);
			if (perYou.isBornMale()) findPerson("MsTitus").showPerson("titus25.jpg");
			else if (perBeasley.isCharmedBy()) this.addPersonFace();
			else this.showPerson("beasley6.jpg");

			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 11) {
			
			if (sType == "givebeasleybook") {
				md = WritePlaceHeader();
				this.showPerson("beasley1.jpg");
				perYourBody.DropItem(4, 76); // Leave the book in the room where you can get it back later
				setBeasleyServant(1); //Start "Serving Mr. Beasley Path
				setPlaceKnown("FrenchClassroom"); //Activate Ms. Jones in Office
				addComments('You give the book to Mr. Beasley.');

				addPlaceTitle(md, "Mr. Beasley With Book");
				md.write(
					'<p>Mr Beasley tears the book out of your hands in one swift motion and hastily begins to flip through the pages.</p>' +
					'<p>"Yes... I finally have it, this is indeed the legendary book of Control." Your teacher chuckles to himself. "And here is just what I need now! Dai Chu "Dai Chu ' + perYou.getPersonName() + '!"</p>'
				);
				if ((perYou.checkFlag(18) && nMana > 19) || perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0) {
					if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0) {
						md.write('<p>The spell bounces off you, warded by your protections.</p>');
						AddMana(-20);
						md.write('<p>The mana in you surges as you struggle to resist the spell. You suddenly feel the spell vanish and your mana is drained by the struggle.</p>');
					}
					md.write('<p>What else can you do then, he has the book after all.</p>');
					startQuestions();
					addLinkToPlace(md, "exit the room", 70);

				} else {
					perYou.charmThem(4, "MrBeasley");
					startQuestions();
					addLinkToPlace(md, "what was that he said?", 972);
				}
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "maleservice") {
				// Sex with Mr Beasley
				md = WritePlaceHeader();
				if (this.getCharmedLevel() == 1) this.charmThem(2);
				md = WritePlaceHeader();
				this.showPerson(perYou.isMan() ? "beasley14b.gif" : "beasley14.jpg");
				md.write(
					'<p>Mr Beasley is an aggressive lover. The moment he has your permission, he pulls you close and slips his hands under your clothes. He is obviously a man used to being in charge. His kiss is possessive and demanding, but he is good enough at it that you allow him play around for at least a moment before deciding how far he\'ll be allowed to get today.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'let him have his fun', 11, 'type=beasleysexfun');
				addLinkToPlace(md, 'remind him who is in charge', 11, 'type=beasleysexremind');
				if (perYou.isMaleSex()) addLinkToPlace(md, 'make him suck your cock', 11, 'type=malebj');
				else addLinkToPlace(md, 'make him lick you', 11, 'type=femalebj');
				addLinkToPlace(md, "tell him you have changed your mind", 11, '', 'You allow him to go on for a few seconds longer, letting his hands roam over your ass and get ready to slip under your shirt before you suddenly push him away.</p><p>You give him the most obvious non-apology for cutting this short that you were able to muster and enjoy the defeated look of frustration on his face as he assures you that he is here whenever you change your mind again.');
				WritePlaceFooter(md);
				return true;
			}				
			
			if (sType == "beasleysexfun") {
				// Male, fun, player any sex
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPerson("beasley12m.jpg");
				else this.showPerson("beasley12f.jpg");

				addPlaceTitle(md, "Mr. Beasley's Fun");

				md.write(
					'<p>You usually prefer to be in control, especially with a man, but sometimes, you do like to just lean back and let one of your lovers take charge.</p>' +
					'<p>Well, as much as they can while being spellbound to you.</p>' +
					'<p>Your lack of protest definitely emboldens your teacher, and as if afraid that you might change your mind, he hurries up, throwing off his clothes to give you a brief view of his... surprisingly well toned body before you find yourself spun around, one leg on a table and the tip of his ' + (perYou.isMaleSex() ? 'freshly lubed cock pressing against your rear.' : 'cock pressing against your entrance.') + '</p>' +
					'<p>He is huge, another thing you had not expected off him. You feel your inner walls stretch as he enters you and unintentionally exhale a soft moan when he touches your neck and presses your head against his shoulder.</p>' +
					'<p>He is holding you in place like this and you let him do it, remaining locked in his grip and pressed against his chest as he pushes into you in a rough, fast pace, his husky breath in your ear as he moves in to cover your cheek and neck in wanton kisses.</p>' +
					'<p>You are not sure if he has always been skilled or if this is another side effect of being under your spell, but he actually manages to bring you to climax quite quickly. His grip tightens when he feels your body tensing up and soon you are left twitching and gasping for air, enjoying the waves of pleasure rushing through you ' + (perYou.isMaleSex() ? 'as you shoot your own load onto the table before you' : 'As you ride out your climax') + '.</p>'
				);
					
				startQuestions();
				addLinkToPlace(md, "back to the classroom", 11);
				WritePlaceFooter(md);
				return true;				
			}
			
			if (sType == "beasleysexremind") {
				// Male, fun, player any sex
				md = WritePlaceHeader();
				if (perYou.isFuta()) this.showPerson("beasley13h.jpg");
				else if (perYou.isMaleSex()) AddImageRandom("GenericSex/sex-mm anal ", 2);
				else this.showPerson("beasley13f.jpg");

				addPlaceTitle(md, "In Charge Of Mr. Beasley's");
				
				if (this.isMaleSex()) {
					md.write(
						'<p>You push your teacher away and harshly order him undress for you. He does resent being treated like this, and much to your enjoyment it shows on his face, but he follows your order with little hesitation and you make sure to take your time to admire his physique.</p>' +
						'<p>You may not be all that interested in men, but you do appreciate a well toned body when you see one, and to your surprise, Mr. Beasley was hiding quite the sixpack under those ugly sweaters he usually wears.</p>' +
						'<p>“You are quite the good-looking piece of meat, James...”</p>' +
						'<p>You muse as you approach him, making a point of addressing him by his first name and ignoring the look of annoyance on his face as he grovels his answer.</p>' +
						'<p>“Thank you, ' + perYou.getPersonName() + '.”</p>' +
						'<p>“And it would be a waste to not make use of you occasionally, right?”</p>' +
						'<p>“I would be happy to teach... I mean be of use to you.”</p>' +
						'<p>You smile sweetly at his teeth gnashing delivery, savoring his frustration before you finally push him to sit down in his chair and straddle him.</p>' +
						'<p>Beasley\'s looks up to you in need and adoration, his fingertips digging into your ass-cheeks only to be swatted away by you.</p>' +
						'<p>“I\'m sorry.” You can feel his cock pressing at your entrance, a look of frustration on his face. “May I touch you?”</p>' +
						'<p>“You may, but If you keep getting ahead of yourself like this -I- will have to be the one to punish -you-, James...”</p>' +
						'<p>He grunts his acknowledgment, but the second you gave permission his hands were already back in place, roaming over your tights, groping your ass and massaging your breasts. The teasing has left him more eager than ever to finally touch you, and you do have to admit that he is not half bad at this.</p>' +
						'<p>He practically worships your tits with his tongue and lips, kissing, biting, pulling on your nipple, and as much as you enjoy teasing the man you have to admit that he is making you horny as hell and you want to taste the main course: His massive, throbbing cock.</p>' +
						'<p>You are still careful when you take him inside you. It\'s unusual for you to be penetrated by someone, not to mention that his size did surprise you the first time you saw it. But whenever you begin to rock your hip and feel his thick shaft sliding into your sensitive areas, such worries are quickly forgotten. The effect of the spell turns your teacher into a far more enduring and attentive lover than he would usually be, and as you approach your first climax, you have to admit that having a spellbound man under your thumb does have its perks.</p>'
					);
				} else {
					var bFuta = perYou.isFuta();
					md.write(
						'<p>You guide Mr Beasley\'s hand to your crotch and let him feel the growing bulge before you order him to undress and get on all fours, and order he is, for once, hesitant to follow.”</p>' +
						'<p>' + (!bFuta ? '“So now you are suddenly hesitant to have sex with a student, James?' : 'So now you suddenly no longer want to fuck me, James?') + '”</p>' +
						'<p>You ask in a mocking voice and Mr Beasley has to struggle for a moment before he answers.</p>' +
						'<p>“Off... course not. I am not used to this, but I... live to please you, ' + perYou.getPersonName() + '.”</p>' +
						'<p>You chuckle as he hastily discards his clothing and gets on all fours before you, a part of you quite enjoying the sight of him.</p>' +
						'<p>' + (!bFuta ? '“Don\'t worry,” You say as you use your fingers to apply some lube to his backdoor. “This may not be what you are used to, but your body is going to love this.' : 'Don\'t worry,” You say as you use your fingers to apply some lube to his backdoor. “This may not be what you have fantasized about perving on me all this time, but you are going to love this.') + '”</p>' +
						'<p>And with this, you use the spell to suddenly increase his arousal, flooding his mind with a torrent of intense sensations to further relax him just as you embed your cock into his tight rear.</p>' +
						'<p>Mr. Beasley releases a loud moan before biting his lower lip, the initial pain he must have felt quickly drowning in a sea of pleasure as your hip smacks against his ass with every rough motion.</p>' +
						'<p>He is winding himself on the floor, panting, moaning, whimpering whenever you place a slap on his ass just to drive the point home how helpless he is before you, each thrust of your hip pushing him closer and closer to climax, each slap on the ass and humiliating taunt about how much he can\'t help but love this making him moan and whimper in defeat until he finally collapses into a puddle of his own cum while you shoot your load into his ass.</p>'
					);
				}
					
				startQuestions();
				addLinkToPlace(md, "back to the classroom", 11);
				WritePlaceFooter(md);
				return true;				
			}
			
			if (sType == "malebj") {
				// Male, give blowjob to male/futa player
				md = WritePlaceHeader();
				if (perYou.isFuta()) this.showPerson("beasley8c.jpg");
				else this.showPersonRorX("beasley8b.jpg");

				addPlaceTitle(md, "Mr. Beasley's Kiss");

				md.write(
					'<p>With a smirk you order Mr. Beasley to give you his chair. The lecherous teacher\'s mind altered from the effects of your spell have altered his attraction to you, specifically. You see little reason not to capitalize on this situation and enjoy turning the tables on him. Casually you pull down your pants and sit in his chair, leaving your enthralled teacher staring at your cock hungrily.</p>' +
					'<p>Coyly you ask, “See something you like, Mr. Beasley?”</p>' +
					'<p>He is swift to reply, “Oh yes, ' + perYou.getPersonName() + '. Your cock is so beautiful...,” he trails off as if lost in thought.</p>' +
					'<p>“Then perhaps you should show me how much you admire it with your mouth,” you absently comment as you lean back in his chair. Almost the instant you settle into a relax position your teacher wraps his lips around your cock. His tongue brushes up along the underside vein before tracing lavishly stroking across the head. With a satisfied groan you taunt him, “Despite lusting for all those girls in school you are an eager cocksucker, aren\'t you?”</p>' +
					'<p>Mr. Beasley responds by moaning at your taunt. Absently his head bobs on your cock in a circular motion. His tongue sweeping across the underside of your cock and slides in similar motion up to the very tip. His hands grab hold of your hips as he worships your cock as if he were one of the girls he once lusted after.</p>' +
					'<p>“I asked you a question, Mr. Beasley,” you remind him. His mouth lifts itself from your cock as he responds barely an inch from your cock, “Yes ' + perYou.getPersonName() + ', I am your eager cocksucker.” You find a bit of amusement in this situation. You press further for reasons unknown, “That is because deep down you are a cocksucking faggot who has been waiting for a real man to put you in your proper place. On your knees sucking his cock. Isn\'t that right, Mr. Beasley?”</p>' +
					'<p>His voice takes a husky tone as he replies, “Oh god yes, ' + perYou.getPersonName() + '. I want to be on my knees worshiping your glorious cock. I need to feel it in my mouth... I want,” his voice trails off again.</p>' +
					'<p>“To be my little cocksucking whore, just like a girl. Don\'t lie to me, you\'ve always been jealous of the fact they could suck a cock while you denied that you craved to be on your knees sucking one,” your own voice taking on a more forceful tone in response.</p>' +
					'<p>“Only your cock, ' + perYou.getPersonName() + '. I want to suck your cock like the cocksucking whore I am. Please, let me!”</p>' +
					'<p>You absently allow your teacher to finish what he started. A bit of a surprise comes as his tongue lavishly bathes your balls as his right hand absently wraps around your shaft and begins to stroke it. A satisfied moan leaves your lips as you relax and enjoy the devoted worship of your very manhood. A satisfied smile crosses your lips as he licks up your length and once again engulfs the head.</p>' +
					'<p>With shameless abandon Mr. Beasley proves true to his word, having been converted into a cocksucking whore at that very moment. His head continues to bob itself down your cock as he works his tongue over the sensitive flesh as he moans in pleasure from the warm feeling of your cock gliding in his mouth. His hand encircles the base to milk it as though you had already cum. His other hand cups and massages your balls, hoping to coax his reward from the cock of his glorious student.</p>' +
					'<p>Your hips thrust upward as the barrage of pleasure from Mr. Beasley\'s mouth brings you to climax. Your cock pumping cum into his awaiting mouth while his hand attempts to milk it for every last drop. His reward for dedicated worship. Without thinking your teacher swallows very drop before bathing the head with his tongue to clean up every bit of your cum. Once he is finished the man stares up at you, “Please let me know whenever you need your cocksucker\'s mouth on your cock, ' + perYou.getPersonName() + '.”</p>'
				);
					
				startQuestions();
				addLinkToPlace(md, "back to the classroom", 11);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "femalebj") {
				// Male, lick female player
				md = WritePlaceHeader();
				this.showPerson("beasley8g.jpg");

				addPlaceTitle(md, "Mr. Beasley's Kiss");

				md.write(
					'<p>“Eager as always, James. Get on your knees.” You let him have his fun for a while before making a point of addressing your teacher by his first name, and he seems surprised himself how quickly he complies with the order.</p>' +
					'<p>Further words aren\'t really needed. You nonchalantly sit down on his own desk, remove your lower clothes and spread your legs for him, certain that he is able to figure the rest out himself.</p>' +
					'<p>And of course he does.</p>' +
					'<p>Beasley almost trips over himself trying to follow you on his knees and all too eagerly buries his face between your tights to taste you.</p>' +
					'<p>He isn\'t half-bad at this. Granted, he is lacking practice, but the spell makes him far more eager to please you than he would normally be, and he does know how and where to touch a woman to make her feel good.</p>' +
					'<p>Though of course, what you enjoy most is his submission. A man who has perved on you and your classmates during most of the final year and would have enslaved you without a second thought is now literally kneeling at your feet and eager to serve you in any way possible, and as you reach your climax, you push his head firmly against your crotch just to make sure he is well aware of that.</p>'
				);
					
				startQuestions();
				addLinkToPlace(md, "back to the classroom", 11);
				WritePlaceFooter(md);
				return true;
			}			
			
			if (sType == "femaleservice") {
				// Sex with Miss Beasley
				md = WritePlaceHeader(false, !isExplicit() && ((this.dress == "Bimbo1" && perYou.isMaleSex()) || ((this.dress == "Bondage" || this.dress == "Bimbo2") && !perYou.isMaleSex())) ? 'td-left-large' : '');
				if (this.getCharmedLevel() == 1) this.charmThem(2);

				if (isExplicit() && this.dress == "Bimbo1" && !perYou.isMaleSex()) this.showPerson("beasley8g.jpg");
				else if (perYou.isMaleSex()) this.showPersonRorX("beasley8b.jpg");
				else this.showPerson("beasley8g.jpg");

				// Post transform
				addPlaceTitle(md, "Fucking Miss Beasley");
				switch(this.dress) {
					case "Bimbo1":
						md.write(
							'<p>You answer Miss Beasley, "Yeah, let\'s \'Do you\' and your wonderful big tits", and she giggles. Previously <i>he</i> may of chuckled or laughed but never giggled. She start to peel off her top,</p>' +
							'<p>"You mean these massive, all massive, ali mass, funbags?" and she giggles again. You reply, "Yes, these magical tits"</p>' +
							'<p>She removes the rest of her clothing and kneels down before you, and'
						);
						if (perYou.isMaleSex()) {
							md.write(
								' pulls down your pants. She uses her hands, mouth and tits to arouse you. It would be hard to call it just a tit-fuck, your cock gets so enveloped by her tits! She asks "Do me now?" and you take her, and fuck your teacher until she squeals in orgasm as you cum into her.</p>'
							);
						} else {
							md.write(
								' lowers you pant and pulls down your panties. She uses her tongue, tits and hands to pleasure you. So strange as she uses her huge tits against your pussy! She asks "Do me too?" and you rub, lick and finger her until you both orgasm.</p>'
							);
						}
						break;
					case "Bimbo2":
						md.write(
							'<p>There seems little need to explain, you pull off the little clothing Miss Beasley is wearing. You know she badly, badly wants this, she seems to think about sex and little else. She groans "Hurry and fuck me!"</p>'
						);
						if (perYou.isMaleSex()) {
							md.write(
								'<p>You pull off your clothing and push her down on her desk, the slut looks up at you, begging you with her eyes. You fuck her, hard and rough, no pretense of foreplay or doing anything other than pleasuring yourself. She cries out and orgasms almost immediately, her pussy contracting around your cock. You fuck her harder as she moans lewdly, and then you cry out "Take it you slut" as you cum hard into her. You feel her orgasm again as you do, and then you pull out, your cum leaking from her pussy.</p>'
							);
						} else {
							md.write('<p>You pull off your clothing and push her down on her desk, the slut looks up at you, begging you with her eyes. You straddle her face and tell her "Lick slut!" and she frantically licks you. You glance around and see she is furiously masturbating and feel her hesitate in her licking. You see her body shaking in a self-induced orgasm, but she quickly resumes both licking and masturbating. You play with your breasts as she licks and quickly reach your own orgasm while riding her face. You step off and see she is orgasming again.</p>');
						}
						md.write(
							'<p>You look at your slut of a teacher as she sits up from your fucking, and you can tell she is ready for more.</p>'
						);
						break;
					case "Bondage":
						md.write(
							'<p>You tell Miss Beasley to strip, but she still seems to be reluctant to obey, strange for someone under your charm spell. You order her again, and this time she obeys immediately, but her face shows this is the magic, and totally against her will.</p>' +
							'<p>Well Miss Beasley is your slave, so she will have to learn to obey and enjoy it. You remove your clothing and order her to '
						);
						if (perYou.isMaleSex()) {
							md.write('suck your cock to get you ready. She does for a while, in a reasonably skilled way, but you tell her to get up and "It\'s time for your fucking". You fuck her and try to focus on the magic in her and try to enhance her arousal. You feel a change in her, she starts to moan in arousal. You fuck her harder and just as you start to cum you order her to orgasm now! She cries out and you feel her cumming on your cock.</p>');
						} else {
							md.write('lick you. She does, surprisingly expertly, and as she does you focus on the magic in her and try to enhance her arousal. You see she starts to play with her pussy and breasts and licks faster. After a while you reach your orgasm and call out to her "Orgasm now!" and you can see she shaking in her orgasm as well.</p>');
						}
						break;
				}

				startQuestions();
				if (canMoveDavyToHotel2())	addQuestionCO(md, 'ask Beasley where Davy has gone', "MrBeasley", 5501);
				addLinkToPlace(md, "exit the room?", 70);
				WritePlaceFooter(md);
				return true;
			}
		
		}

		// Is he/she here?
		if (!this.isHere()) return false;
		
		if (sType == "charmbeasley1") {
			// Cast charm on Mr Beasley
			md = WritePlaceHeader();
			var bGabbyTold = checkPersonFlag("Gabby", 1) && !isArrestPossible();
			if (bGabbyTold && perYou.checkFlag(12) && !perYou.checkFlag(25) && !this.checkFlag(3)) this.setFlag(9, false);

			this.showPerson("beasley7.jpg");

			addPlaceTitle(md, "Mr. Beasley Under a Spell");
			md.write('<p>Mr. Beasley is under your spell.</p><p>"Oh ' + perYou.getPersonName() + '," he says, suddenly admiring you in the way a teacher should not. "It is wrong for you to use magic on your teacher. If you insist on misbehaving I will have to give you a suitable punishment."</p>');

			startQuestions();
			if (!perYou.isBornMale()) addLinkToPlace(md, 'tell Mr. Beasley to kiss you', 11, 'type=service');
			else {
				startAlternatives(md);
				addLinkToPlace(md, 'tell Mr. Beasley to service you', 11, 'type=maleservice');
				addLinkToPlace(md, 'tell Mr. Beasley to serve you, but not with his body', 11, '', 'You command Mr. Beasley to always serve you, but you make it clear that this is not in a sexual way, but is in <i>all</i> other ways. He smiles, &quot;Of course ' + perYou.getMaster() + '!&quot;');
				endAlternatives(md);
			}
			if (perDavy.other === 6 && !isDavyDefeated())	addQuestionCO(md, 'ask Beasley where Davy has gone', "MrBeasley", 5501);
			addLinkToPlace(md, 'exit the room', 70);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformbimbo1") {
			CastTransform(1);
			this.setFlag(10);
			this.dress = "Bimbo1";
			md = WritePlaceHeader(true, '', 'black');
			showPopupWindow("Transformation",
				'<img src="Images/People/Beasley/Bimbo1/beasley-transform.jpg" class="imgpopup" alt="TG">' +
				'<p>You cast the spell and ' + this.getPersonName() + ' gasps and as you watch ' + this.getHisHer() + ' chest swells and grows into a huge pair of breasts. Hair grows from his previously bald head and ' + this.getHisHer() + ' figure changes to a curvy female form. He..no..she cries out as <i>her</i> shirt rips open as her breasts grow much too large for the male shirt. Her breasts are huge, probably larger even than Ms. Titus\'s are!</p>' +
				'<p>She asks you raggedly, "What did you do? Was this...umm...what is it called...Ali Massive...Al..Mass...yeah thats it." and she laughs, but it sounds nearer a giggle. She tries to cover up her exposed breasts but it looks more like she is offering them to you. You tell her it was and ask how she is feeling,</p>' +
				'<p>"Amazing...it\'s..whats that word...like...weird and so nice and big..." she squeezes her breasts. The spell seems to be clouding her mind, but then again you were thinking about bimbo\'s so maybe this is how <i>Miss. Beasley</i> is now, a good humoured air-head!</p>' +
				'<p>(further content not implemented)</p>'
			);
			setQueryParams("");
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		if (sType == "transformbimbo2") {
			CastTransform(1);
			this.setFlag(11);
			this.dress = "Bimbo2";
			md = WritePlaceHeader(true, '', 'black');
			showPopupWindow("Transformation",
				'<img src="Images/People/Beasley/Bimbo2/beasley-transform.jpg" class="imgpopup" alt="TG">' +
				'<p>You cast the spell and ' + this.getPersonName() + ' gasps and as you watch ' + this.getHisHer() + ' chest swells and grows into a large pair of inflated, almost balloon-like breasts. Hair grows from ' + this.getHisHer() + ' previously bald head and ' + this.getHisHer() + ' figure changes to a curvy female form, his lips swell into an exaggerated pout. He..no..she cries out as <i>her</i> shirt rips open as her breasts grow much too large for the male shirt. Her pants rip as her ass out-grows her previously tight pants, and she tears off her pants and shirt. Somehow her underwear has also transformed, into stockings and a garter-belt. You doubt that ' + this.getHeShe() + ' was previously wearing these!</p>' +
				'<p>She unsteadily runs out of the classroom, her breast and ass swaying and throwing off her stride. The hallway is fortunately empty at the moment and she slumps down, squatting almost completely naked and exposing her new pussy. She moans and looks terribly distracted and starts the massage her breasts in a sexual fashion. She looks at you, "Fuck me...now...fuck me!", the last is almost yelled.</p>' +
				'<p>You drag her back into the classroom and ' +
				(perYou.isMaleSex() ? 'fuck her as she demanded, hard and fast in her new pussy' : 'lick her for a few moments until she explosively climaxes. You then make her lick you and she furiously masturbates as she does') +
				'.</p><p>After, your teacher slumps against her desk and looks up at you, "Again, I still need it..." and she starts masturbating. You remember thinking about bimbo sluts as you cast the spell, and your teacher seems to now be a sex-obsessed bimbo. You are not sure how helpful she will be in future, except as a fuck-toy. Still, you give her again what she asks for.</p>' +
				'<p>(further content not implemented)</p>'
			);
			setQueryParams("");
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		if (sType == "transformbondage") {
			CastTransform(1);
			this.setFlag(12);
			this.dress = "Bondage";
			md = WritePlaceHeader(true, '', 'black');
			showPopupWindow("Transformation",
				'<img src="Images/People/Beasley/Bondage/beasley-transform.jpg" class="imgpopup" alt="TG">' +
				'<p>You cast the spell and ' + this.getPersonName() + ' gasps and as you watch ' + this.getHisHer() + ' chest swells and hair grows from ' + this.getHisHer() + ' previously bald head. ' + capitalizeFirstLetter(this.getHisHer()) + ' figure changes to a slim female form and ' + this.getHeShe() + ' unbuttons ' + this.getHisHer() + ' shirt in disbelief exposing <i>her</i> breasts. She drops her pants showing a delightful ass and you see a glimpse of a new pussy.</p>' +
				'<p>She asks you incredulously, "You cast Al Mass on me? How did you learn it, it is lost, a spell of legend, not even Kurndorf was supposed to know it!". You tell her yes it was and she advances, intent on hitting you despite the charm spell. You call out for her to stop and instantly she stops moving, a look of disbelief on her face. She demands, "What is this, why can\'t I move?"</p>' +
				'<p>You have no idea, and for an experiment you tell her to expose herself more. She immediately strips more and looks at you angrily. It seems she must obey your physical orders, interesting! You tell her to do what she wants, and she quick retreats behind her desk. She seems to be able to act normally now, but before despite being charmed she tried to hit you before! To be safe you tell her, "You can never hit me, harm me or work against me in any way" and she answers with her eyes glowing slightly,</p>' +
				'<p>"Yes ' + perYou.getMaster() + '"</p>' +
				'<p>(further content not implemented)</p>'
			);
			setQueryParams("");
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		return false;
	};
	
	perBeasley.showPersonChat = function(bGeneral, md)
	{
		if (!this.isHere() || sType !== "") return;
		
		if (Place != 11 || !this.isCharmedBy()) return;
		
		var bBookHere = whereItem(4) === 76 && (getBeasleyServant() === 50 || perYou.checkFlag(8));
	
		var nm = this.getPersonName();

		// He has been charmed
		if (this.getCharmedLevel() == 2 && this.getPersonGender() == "man") addLinkToPlaceO(md, "order " + nm + " to kiss you", 11, 'type=maleservice');
		else if (this.getPersonGender() == "woman") addLinkToPlaceO(md, "fuck " + nm, 11, 'type=femaleservice');
		if (perDavy.other == 6 && !isDavyDefeated()) addQuestionC(md, 'ask ' + nm + ' where Davy has gone', "MrBeasley", 5501);
		if (perYou.checkFlag(12)) {
			if (perYou.canUseExperience(true) && perYou.checkFlag(24) && !perYou.checkFlag(25)) addQuestionC(md, 'ask ' + nm + ' to teach you the hypnotic technique', "MrBeasley", 5503);
		} else if (this.checkFlag(3)) addQuestionC(md, 'ask ' + nm + ' about Amy and Catherine before', "MrBeasley", 5504);
		if (bBookHere) addQuestionC(md, 'ask ' + nm + ' for the Book', "MrBeasley", 5600);
		
		if (whereItem(4) == 76 && this.isCharmedBy()) {
			//Beasley has the book and IS CHARMED
			addQuestionC(md, 'demand that ' + perBeasley.getHeShe() + ' give you the book.', "MrBeasley", 5502);
		}
		
	};

	// Cast a spell on them or use an item
	perBeasley.handleItem = function(no, cmd)
	{
		// Examining the Soul Bound Crystal
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere() && !this.checkAnyFlags(10, 12)) {
					// Not transformed
					if (!this.isCharmedBy()) examineItem(no, 'The ' + s + ' trembles weakly, you suspect you need a magical link to Mr. Beasley before it will work.');
					else if (!perYou.checkFlag(25) || !checkPersonFlag("Catherine", 5)) examineItem(no, 'The ' + s + ' trembles slightly, something is needed before it will work, he has some sort of magical link to another person preventing the spell working.');
					else examineItem(no, 'The ' + s + ' vibrates softly the closer you get to Mr. Beasley.');
					return "handled";
				}
			}
		}

		// Casting the charm spell
		else if (no == 14 && cmd == 2) {
			// In his office
			if (Place == 11 || Place == 71) {
				// Mr Beasley - Can only charm if you know a technique
				if (perYou.isCharmed()) addComments("Why would you try to do that to your Master?");
				else if (perYou.checkFlag(19)) CastCharmSpell("MrBeasley", 11, 1, 'type=charmbeasley1');
				else addComments("The spell fails to work on Mr. Beasley as the spell only affects the feminine.");
				return "handled";
			}
		}

		// Casting the transform spell
		else if (no == 18 && cmd == 2) {
			// In his office
			if (this.isHere()) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over him but nothing happens, you seem to need a magical link to him");
					return "handled";
				}
				if (!perYou.checkFlag(25) || !checkPersonFlag("Catherine", 5)) {
					addComments("The spell washes over him but nothing happens, something else is needed, he has some sort of magical link to another preventing the spell working");
					return "handled";					
				}

				if (!CastTransform(1, true)) return "handled";

				setCommentsNoClick('<div class="conversebubble" style="cursor:default"><table><tr><td width="80%"><p>');
				if (this.getPersonGender() == "man") addComments('You remember Catherine\'s desire for revenge and you feel you should try to control Mr. Beasley more. Catherine wanted him "fucked up" and with this in mind you cast the spell. As you do different thoughts cross your mind, different things Catherine had said or shown you at times,</p>');
				else addComments('You wonder about changing your control over Miss. Beasley. With Catherine\'s goal of making her "fucked up" you cast the spell. As you do different thoughts cross your mind, different things Catherine had said or shown you at times,</p>');
				if (!this.checkFlag(10)) addOptionLink("comments", '...huge breasted bimbo\'s', "ClearComments();dispPlace(" + Place + ",'type=transformbimbo1')");
				if (!this.checkFlag(11)) addOptionLink("comments", '...sexy bimbo sluts', "ClearComments();dispPlace(" + Place + ",'type=transformbimbo2')");
				if (!this.checkFlag(12)) addOptionLink("comments", '...that bondage image of Catherine', "ClearComments();dispPlace(" + Place + ",'type=transformbondage')");
				addComments('</td><td width="20%">' + this.addPersonFace(false, '95%') + '</td></tr></table>');
				return "handled";
			}
		}

		return "";		// do nothing
	};
	
	// Phone calls
	
	per.isPhoneable = function() {
		// Can you call them?
		// Miss Logan not bred and is a breeder
		return Place == 440 && !checkPersonFlag("MissLogan", 1) && per.getCharmedLevel() == 2 && this.isMan();
	};

	per.callThem = function() {
		if (Place == 440) gotoPlace(Place, 'type=missloganbreeder&who=' + this.uid, 'You tell Ms. Logan that you have someone in mind to help impregnate her, and after placing the call the two of you wait for their arival.');
	};
}
