/***********************************************
	Monique

***********************************************/
function HydromancyBook()
{
	if (!perYou.checkFlag(29) && isSpellKnown("Clairvoyance")) {
		addComments('</p><p>She also points out a book on the shelf about divining using water, "This book talks about scrying with water and mentions Clairvoyance and Mana, maybe it will be of interest to you?". You will have to read it when you have a bit of free time.');
	}
}

function RepliesMonique(nR)
{
	var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();
	var clv = per.getCharmedLevel();

	if (nR == 21)
	{
		// v2 = Need help w/ Puzzle.
		per.setFlag(2);
		if (clv < 4) addComments('"Sure, I love puzzles. What is it?" She asks.');
		else addComments('"Of course, ' + myName + '.  Anything you desire is yours."');
	}
	else if (nR == 51) // v5 = Monique Charmed Path
	{
		if (per.getQuest() < 2) per.setQuest(2);
		dispPlace(Place, "act=" + (perYou.isMaleSex() ? "bj" : "lick"));
		return false;
	}
	else if (nR == 52)
	{
		Place = 8;
		per.setQuest(3);
		per.place = 10;  // Changes Monique's location to the History room
		bChat = false;
		addComments(per.addPersonFace());
		addComments('"More magic," says Monique. "Yes ' + myName + ', I will search for what you need."</p><p>With that she leaves the reference desk mentioning she has some ideas of where to research some information.');
	}
	else if (nR == 53)
	{
		PlaceI(5, 10); // Puts the stone in the History Room
		per.setQuest(4);  // Advances Charmed Monique path
		addComments('Monique breathes, "I have found a strange stone ' + myName + '. I think that it is magical. Please take it."');
		HydromancyBook();
	}
	else if (nR == 54)
	{
		per.setQuest(5); // Monique charmed path
		per.place = 8; // Puts Monique back in the library until triggered again
		bChat = false;
		addComments(per.addPersonFace());
		if (per.getCharmedLevel() == 1) addComments('"Yes ' + myName + '. I will keep searching for more magic," says Monique, quickly leaving to help out her friend.');
		else addComments('"Yes ' + myName + '. I will keep searching for more magic," says Monique, quickly leaving to obey your commands.');
	}
	else if (nR == 55) // v5 = Monique Charmed Path
	{
		if (per.getQuest() < 2) per.setQuest(2);
		if (!isExplicit() && !perYou.isMaleSex()) dispPlace(Place, "act=plainfuck");
		else dispPlace(Place, "act=" + (perYou.isMaleSex() ? "fuck" : "strap"));
		return false;
	}
	else if (nR == 61)
	{
		per.other = 2;
		addComments(
		'"Mmm," murmurs Monique. "Do you know the author\'s name or the title? Or do you have any detailed <b>references or papers</b> on the book to <b>give</b> me?"</p>' +
		'<p><i>Reminder you pick up items, use or give them to another person using the inventory on the right</i></p>'
		);
		// Hint to give the paper
		if (gameState.nRightBarState != 1) showRightBar(1);
	}
	else if (nR == 63)
	{
		per.other = 11;
		if (!bCharm) addComments('"I have discovered something on the computers that you might be interested in," says Monique.');
		else addComments('"Oh ' + myName + '! I have found something on the computers!" says Monique, very pleased with herself.');
		addComments('  "According to historical records Mrs. Stears bore a son from the warlock Kurndorf. Since then seemingly magical coincidences have always revolved around the Stears family."');
		HydromancyBook();
	}
	else if (nR == 64)
	{
		per.other = 12;
		if (!bCharm) addComments('"Don\'t you know?" ');
		else addComments('"Oh ' + myName + ', thats the part I\'m so excited about!" ');
		addComments('replies Monique. "The last of the Stears was named Tara Stears.  She married a man by the name of Jeff Robbins, and has since had two children including one daughter named Geraldine."');
	}
	else if (nR == 65)
	{
		per.other = 13;
		perDavy.setQuestBlueBottle(1); // Start the Blue Bottle Path
		addComments('"Yes! Mrs. Robbins is Davy and Tina\'s mother. They are descendants of Kurndorf."');
		if (!isPlaceKnown("RobbinsHouse"))	{
			PlaceI(7);
			if (clv < 4) addComments('  Monique continues, "I took the liberty of getting their address for you from the phone book.  Here, take it."');
			else addComments('  Monique writes something down on a slip of paper.  "Here it is, ' + myName + '.  Have I done well?');
		}
	}
	else if (nR == 66)
	{
		if (per.other == 13) per.other = 14; // Telling her to keep looking after Kurdoff revelation
		else if (per.other == 4) per.other = 5;  // Asking her to keep looking for more on Kurndoff if not charmed
		if (clv < 4) addComments('<p>"I\'ll see what else I can come up with," answers Monique. "At least it gives me something to do."</p><p>"One term I did see linked to Kurndorf was \'<b>Hellgate</b>\' and a name \'<b>Legion</b>\' but these are too generic to research quickly."');
		else addComments('"As you wish, ' + myName + '. I shall do as you command." She says, a shiver of pleasure running down her spine.');
		if (per.place > 0) per.place = 8;  // Sends Monique back to the Library if she's somewhere else
	}
	else if (nR == 67)
	{
		per.other = 3.1;  // Asked about Sir Rolands information
		addComments('<img src="Images/graveyard.jpg" style="width:20%;float:right;margin-left:5px;margin-bottom:1em" alt="Graveyard">"Just a bit of silliness...", she hesitates and looks behind her startled as if there was someone or something there. She continues,<br><br>"Sorry, I felt a chill...as I was saying, it was just a silly enquiry of public information but he offered a substantial donation to the library for a detailed history of the undead in Glenvale. You know, reports of ghost sightings, supposed vampires and the such. I collated all the reports I could find and delivered them. He said the information was useful, mainly in the timings of the reports."');
		startTimedEvent("if(getPersonOther('Monique')==3.1)setPersonOther('Monique',4)", 2);		// After a small time allow you to ask her to look up Kurndorf

	}
	else if (nR == 80)   // Ask about Pamela's necklace
	{
		setPersonFlag("Pamela",9);
		addComments('Monique examines the bracelet and consults her computer, "' + myName + ', there is a small engraving, and a translation just reads "Twin Souls". I am sorry I cannot find anything else relevant.');
	}
	else if (nR == 192)
	{
		addComments('"I have found a reference to the <b>\'Wild Ranges\'</b> but I do not know where they are. I would suggest you speak to someone with more knowledge on matters of the occult. What about the person who wrote that paper you showed me before?"');
		setPlaceKnown("WildRanges");  // Open Wild Ranges
	}
	else if (nR == 200)
	{
		addComments('"There is one text book on hypnosis listed in the catalogue, \"Hypnotize this\", but it was checked out last year and it was reported as lost by the person who checked it out"</p><p>You ask who had checked the book out?,</p><p>');
		if (bCharm) addComments('"' + myName + ' the person is Gabriel Halliway, we have an old address for her, but when we last contacted her about the book it seems she had moved."</p><p>Well that is not much of a problem, Miss Halliway is your mothers personal assistant!</p>');
		else addComments('"I\'m sorry ' + myName + ', we cannot give out that information"</p>');
		per.setFlag(17);
	}
	else if (nR == 251)  // v25 = Dragon Gem
	{
		var perAbby = findPerson("Abby");
		if (perAbby.getQuestDragonGem() == 1) perAbby.setQuestDragonGem(2);

		setPlaceKnown("Museum");  //  Museum Location
		if (whereItem(29) === 0) PlaceI(29, 240); // Place the Vase @ the Museum

		if (clv < 4) addComments('<p>"Let me see," she says, turning to the computer.  After a few minutes of seemingly random clicking she perks up a bit.  "Ah, here we are."</p><p><img src="Images/Items/gem1.jpg" style="width:15%;float:right;margin-left:5px;margin-bottom:1em" alt="Gem">"It says here ');
		else addComments('<p>"Of course, ' + myName + '.  Right away." She says, turning to the computer and feverishly scouring the digital records for the information you requested.  "Here ' + myName + ', I have found something."</p><p><img src="Images/Items/gem1.jpg" style="width:15%;float:right;margin-left:5px;margin-bottom:1em" alt="Gem">"According to this ');

		addComments(
			'there was once a gem that supposedly was so hot to the touch that it would burn anyone who attempted to hold it.  They believed that the heat was a manifestation of the raw magical power held within the stone. It was kept in a secret place near Glenvale alley but was later stolen. Monique shows you an illustration that is supposed to be the magic gem in question.</p>' +
			'<p>The thieves were evidently caught, along with many other stolen artifacts, but the gem was never recovered.  Something else, it seems one of them sustained severe burns to his hands during the attempt. Odd."</p>'
		);
	}
	else if (nR == 307) // p3 == 7 - Monique is @ the hotel
	{
		bChat = false;
		per.place = 8;  // Set Monique back @ the Library again.
		setPlaceFlag("Hotel", 8);
		addComments(per.addPersonFace());
		addComments('"Hello ' + myName + '." She whispers.  "I overheard Davy asking the barmaid a few questions. Something about a hidden cellar under the hotel. I tried to find it ' + myName + ', but its evidently the <i>hidden</i> cellar for a reason.  I\'m so sorry ' + myName + '.  If only I could find the hotel blueprints, I could use it to find the cellar.", she says.</p><p>She gets up to leave - presumably to look for the hotel plans at the library.');
	}
	else if (nR == 1105) // v11 = Hellgate Pathline
	{
		perDavy.setPathHellgate(10);
		addComments('"As you wish, ' + myName + '.  I will go there immediately."');
		per.place = 8;  // sets Monique location @ the Library
	}
	else if (nR == 1110)
	{
		setQueryParams("type=readsanctuaryarms");
		if (perDavy.getPathHellgate() == 10) perDavy.setPathHellgate(11);
		addComments('"Here we go...  Oh, look ' + myName + '! Davy has been reading about Glenvale."');
	}
	else if (nR == 1410)  // v14 = Serving Mr Beasley Path
	{
		if (!isPlaceKnown("Alley")) setPlaceKnown("Alley"); // Set to know the alley

		setBeasleyServant(11);

		if (!bCharm) {
			addComments('Let me see. The computer doesn\'t say much about it. ');
		} else {
			addComments('"One moment, ' + myName + ', let me see what I can find," she says, typing away at the computer.  ');
		}
		addComments('Ah, here is something. A picture of a bull is in an old alley not far from here. That might be the answer."');
		return false;
	}
	else if (nR == 2717)  // v27 = Kurndoff Séance Path
	{
		perKurndorf.setQuestSeance(18);
		if (clv < 4) {
			addComments('"Here is some information about what you want," says Monique and places an article on the desk.');
		} else {
			addComments('"As you wish ' + myName + '," Monique says, happy to serve you in any way she can.  A short while later she hands you an article.  "This is the most complete article I could find ' + myName + '.  I hope you are pleased."');
		}
		PlaceI(26, 8); // Places Séance Article in Reference Area
	}
	else if (nR == 999)
	{
		setPersonOther("Kate", 998);
		addComments('<p>"Sure, ' + myName + '.  That\'s easy.  We\'ll just use Yahoo yellow pages.  What\'s the name?" She asks innocently as she turns back towards the screen.</p>');
	}
	else if (nR == 998)
	{
		addComments('<p>"Yep, here we go." She says, printing out the address for you and then turning back to her research.</p>');
		setPersonOther("Kate", 997);
		if (whereItem(3) != Place)
		{
			PlaceI(3);
			setPlaceFlag("Alley",6); //Can get the stone in the alley
		}  //Put the Address there.
	} else if (nR == 1000)
	{
		addComments('"It is not in my references, ' + myName + ', sorry." she replies.');
		return false;
	} else return RepliesPuzzles(nR);

	return true;
}


/****************************************************************
		 Asking for help on REPEATABLE Puzzles
 ****************************************************************/
function RepliesPuzzles(nR)
{
	findPerson("Monique");

	if (Place == 8) addComments('<p><b>Monique</b></p>');
	else if (Place == 45) addComments('<p><b>Your Sister, Tracy</b></p>');

	if (nR == 73) // Wealth Spell in Hotel Cellar
	{
		if (per.checkFlag(33)) addComments('"That\'s a hard one. I know, it must be \'one word\' What do you think?"');
		else if (per.checkFlag(34)) addComments('"That\'s a hard one. I know, it must be a \'bookkeeper\' What do you think?"');
		else if (per.checkFlag(35)) addComments('"That\'s a hard one. I know, it must be \'balance\' What do you think?"');

		per.setFlag(3, false);   // Don't need help anymore
	}
	else if (nR == 74) // Teleport Spell in Davy's Room
	{
		if (perDavy.checkFlag(33)) addComments('"That\'s easy. I think that it is the letter, \'e\' Am I right?"');
		else if (perDavy.checkFlag(34)) addComments('"That\'s easy. it is from a song by Meatloaf "I\'d do anything for love, but I won\'t do that", so try \'but I wont do that\' Am I right?"');
		else if (perDavy.checkFlag(35)) addComments('"There are not many clues there, but you say he likes various type of Heavy Metal music, so do I by the way. My guess is this is from Metallica\'s song "Enter Sandman". I think that it is the word, \'Sandman\' Am I right?"');
		per.setFlag(4, false);   // Don't need help anymore
	}
	else if (nR == 75) // Tablet for the crypt
	{
		if (checkPlaceFlag("Crypt", 3)) addComments('"That\'s easy. it is the word, \'modest\' Am I right?"');
		else if (checkPlaceFlag("Crypt", 4)) addComments('"That\'s easy. it is the word, \'mason\' Am I right?"');
		else addComments('"That\'s easy. it is the word, \'garlic\' Am I right?"');
		per.setFlag(5, false);   // Don't need help anymore
	}

	per.setFlag(2, false);  // Set "Help w/ Puzzle" to FALSE

	return true;
}

/****************************************************************
		Responses to Random Research Questions in Library
****************************************************************/
function RepliesLibraryResearch(nR)
{
	addComments('<p><b>References</b></p>');

	if (nR == 251)
	{
		var perAbby = findPerson("Abby");
		if (perAbby.getQuestDragonGem() == 1) perAbby.setQuestDragonGem(2);

		setPlaceKnown("Museum");  //  Museum Location
		if (whereItem(29) === 0) PlaceI(29, 240); // Place the Vase @ the Museum

		addComments(
			'<p>One old history book mentions that there was once a gem that supposedly was so hot to the touch that it would burn anyone who attempted to hold it.  The people of that time, being much more superstitious than today, believed that this heat was a manifestation of the raw magical power held within the stone. For many years the gem was imprisoned in a secret place near Glenvale alley until some thieves raided the cell and took the gem.' +
			'<br>The thieves were caught, along with many other stolen artifacts, but the gem has never been recovered.  Interestingly, a medical report written shortly after the thieves\' capture mentions that one had sustained severe burns to his hands very recently.</p>'
		);
	}
	else if (nR == 2717)
	{
		perKurndorf.setQuestSeance(18); // Kurndorf Séance Path
		addComments('After searching for almost an hour you locate an article in the mythology journal section that you think might work.');
		PlaceI(26, 8); // Places Séance Article in Reference Area
	}
	return true;
}

/****** Charming her **********/

function LeaveMoniqueMin()
{
	findPerson("Monique").charmThem(1);
	dispPlace(3, "");
	WriteComments('You leave the reference area and Monique to deal with the spell.<br/>She will be affected by the spell but you have chosen to not try to reinforce or guide her so the effect will be minimal.');
}

/***************** Initialise ******************************************************************************/

function initialiseMonique()
{
	// Monique
	addPerson("Monique", 8, "Monique");
	per.extra = [0, 0];

	per.Replies = RepliesMonique;
	
	per.getQuest = function() { return this.extra[1]; };
	per.setQuest = function(no) { this.extra[1] = no; };
	
	per.isPersonInfo = function() { return this.other > 0; };
	per.getPersonInfo = function() {
		var s = this.addPersonString("monique2.jpg", "height:max%", "right");
		if (this.getCharmedLevel() == 1) return s + "Monique now considers herself a good friend, with a somewhat sensual attitude.</p><p>She is a little nervous and often teased for it by the other staff members.";
		if (this.isCharmedBy()) return s + "Monique is your ever faithful slave, ready to serve you in any way you desire.</p><p>She is a little nervous and often teased for it by the other staff members.";
		return s + "Monique is the database administrator for the Glenvale Library.<br></p><p>A lovely woman with a nervous disposition.";
	};
	
	per.getPersonName = function(full) {
		return full !== true && this.sCharmedBy == "You" && this.getCharmedLevel() != 1 ? "Slave " + this.name : this.name;
	};

	
	per.whereNow = function() {
		if (this.place != 8 && this.place != 237)	return isDay() ? this.place : 237;
		if (isShopOpen(2, 1, true)) return 8;
		return 237;
	};
	
	per.passTimeNight = function() {
		if (this.place == 279 && Place != 279) {
			this.place = 8;
			return '<table><tr><td style="width:15%;vertical-align:top"><img src="UI/phonecall.png" style="width:95%" alt="Phone Call"></td><td><p><b>Phone call from Monique</b><br>"Hannah is closing the shop, I will have to go home now, please let us do this another day ' + this.getYourNameFor() + '"</p></td></tr></table>';
		}
		return '';
	};

	per.isPlaceImageRight = function()
	{
		return this.whereNow() == 279 && Place == 279;
	};

	per.showPlaceImageRight = function(md)
	{
		this.showPerson("monique12a.jpg");
	};

	per.showPersonTextHere = function(md)
	{
		if (this.whereNow() == 279 && Place == 279) {
			// Monique is here with Hannah
			if (!this.checkFlag(19)) {
				// First time at the shop
				md.write(
					'<p>Hannah seems to be talking to a friend, and only after they turn around to face you, you actually recognize the other person as Monique, whose new outfit is the complete opposite of everything you have seen her in so far.</p>' +
					'<p>“' + perYou.getPersonName() + '!” Monique jumps as she sees you, fidgeting nervously for a moment while her eyes dart between Hannah and you, before she places both hands on her hips and tries to assume a confident posture.</p>' +
					'<p>“I... bought these a while back but never really had the courage to wear it... or show it to someone... how do I look?”</p>' +
					'<p>“Like you\'re ready to ' + (perYou.isMan() ? 'suck his cock' : 'lick her pussy') + '.” Hannah chimes in before you are able to answer, and Monique\'s head turns into a deep shade of red. “Hannah!”</p>' +
					'<p>“Bitch, I already told you that you look gorgeous, stop being so nervous and enjoy it.” The two share a laughter, and you agree that you really like Monique\'s look, putting her more at ease'
				);
				if (!isSpellKnown("Shielded Charm")) {
					md.write(
						' as she takes you aside and whispers.</p>' +
						'<p>"There is writing on the back of the gem and it describes a ritual, let me help you to learn it..." Hannah cheekily interrupts, "Hey this is my customer, no touting for business here Ho!", and she laughs, it would seem they enjoy some crude banter...</p>'
					);
				} else md.write('.</p>');
				this.setFlag(19);
			} else {
				md.write('<p>You see Hannah. the mechanic, and Monique chatting, discussing some repair work on a truck. The friends are laughing and talking animatedly to each other. ');
				if (!isCharmedBy("Hannah")) {
					md.write('Hannah tears herself away and turns to you with her "talking to the customer" smile.  "Can I help you with something?" she asks.</p>');
					if (!isSpellKnown("Shielded Charm")) {
						md.write(
							'<p>Monique steps over and whispers to you,<br/>' +
							'"There is writing on the back of the gem, it describes a ritual, let me help you to learn it..."'
						);
					} else md.write('<p>Monique smiles at you, waiting for your next request and starts to speak...');
				} else {
					md.write('Hannah seems excited that you have returned.  "How may this humble servant be of service?  Perhaps you would like me to... check your fluids?" she asks, a hint of mischief in her eyes.</p>');
					if (!isSpellKnown("Shielded Charm")) {
						md.write(
							'<p>Monique tells you,<br/>' +
							'"There is writing on the back of the gem, it describes a ritual, let me help you to learn it?"</p>'
						);
					} else md.write('<p>Monique smiles at you, waiting for you next request and starts to speak...</p>');
					md.write('<p>Hannah cheekily says, "Maybe we can work together to service your ride?"</p>');
				}
			}
		}
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (this.whereNow() == 279 && Place == 279 && sType === "") {
			if (!isSpellKnown("Shielded Charm")) addOptionLinkC(md, "ask Monique to teach you the spell", isRunes() ? "Research('Spell', 'NeoOne')" : "dispPlace(Place,'type=learnshieldedcharm&who=monique')");
			addPopupLinkC(md, "ask Monique to return to the library", "Monique Leaves",
				"<p>" + this.addPersonString("monique12b.jpg", "height:max%", "rightpopup") +
				"You casually tell Monique to return back to the library, and you see she quickly pulls off her top,</p>" +
				'<p>"I will have to change, but when you next visit the Library I hope you will take me for a ride!"</p>' +
				'<p>Hannah comments "You go girl!"</p>',
				true, "movePerson('Monique',8);dispPlace();");
			if (!isCharmedBy("Hannah")) addLinkToPlaceC(md, "perform a quick stress-test with Monique", Place, "type=moniquecheck");
		}
		if (this.isHere() && wherePerson("Hannah") == 457 && !this.checkFlag(20)) {
			addQuestionR(md, "ask about Hannah",
				'"Hannah said she has to visit relatives for a few days. She didn\'t seem happy about it, though, and I have no idea when she will be back.“</p>' +
				'<p>“Of course.“ She smiles sweetly.“This means we have the whole apartment to ourselves right now.“',
				"Monique",
				"setPersonFlag(\\'Monique\\',20);setPersonFlagAfterTime(\\'Hannah\\',6,true,35)"
			);
		}

		if (Place == 10 && isShopOpen(2) && this.isHere()) {
			// History Classroom
			if (this.getQuest() == 3) addQuestionC(md, 'ask Monique if she has found anything', "Monique", 53);
			if (this.other == 10) addQuestionC(md, 'ask Monique what she is doing back at the school', "Monique", 63);
			else if (this.other == 11) addQuestionC(md, 'ask "What about the Stears family?"', "Monique", 64);
			else if (this.other == 12) addQuestionC(md, 'ask "So...  That means Mrs Robbins is ..."', "Monique", 65);
			else if (this.other == 13) addQuestionC(md, 'tell Monique to research more about the Robbinses', "Monique", 66);
			else if (this.getQuest() === 4 || this.getQuest() === 5) {
				if (this.getCharmedLevel() > 1 && this.getQuest() === 4 && !this.checkFlag(18)) {
					startAlternatives(md);
					addPopupLinkC(md, 'tell Monique to play with herself as a reward', "Rewarding Monique",
						this.addPersonStringRorX("monique14.jpg", "height:max%", "right") +
						'Monique does as she is ordered. "Oh thank you ' + this.getYourNameFor() + '," she cries.' +
						"<br><br>" +
						"Monique enjoys herself, thanking you for being so kind.",
						true, "setPersonFlag('Monique',18);dispPlace();"
					);
					addPopupLinkC(md, 'tell Monique she may pleasure you as a reward', "Rewarding Monique",
						this.addPersonStringRorX((!perYou.isMaleSex() && isExplicit() ? "monique10ga" : "monique14b") + '.jpg', "height:max%", "right") +
						'Monique does as she is ordered, for her your pleasure is her pleasure. "Oh thank you ' + this.getYourNameFor() + '," she cries.' +
						"<br><br>" +
						"Monique enjoys herself giving you pleasure and afterwards thanking you for being so kind.",
						true, "setPersonFlag('Monique',18);dispPlace();"
					);
					endAlternatives(md);
				}
				addQuestionC(md, (this.getCharmedLevel() > 1 ? 'order' : 'ask') + ' Monique to find you some more magic', "Monique", 54);
			}
		}
	};
	
	per.showEventPopup = function()
	{
		if (Place != 8) return false;
		
		if (sType == "moniquereadingharder") {
			showPopupWindow("Monique Reading",
				this.addPersonString("monique3a.jpg", "height:max%", "right") +
				"You see the book, Fifty Shades of Grey on Monique’s desk and you become curious.<br><br>" +
				'"Why are you reading that?", you point to the book, acting somewhat angered.<br><br>' +
				'"Ohh, ' + this.getYourNameFor() + ', it was before you came along that I’ve read that book! It\'s such a famous book I knew I had to read to it! And I always had a thing for erotic novels, especially ones featuring BDSM.", she says defensively.<br><br>' +
				'"For a moment I thought I couldn\'t satisfy your needs, that\'s why you\'re reading it.", you tell her cunningly. You want her to feel bad and shameful. ' +
				"Monique spins around, rushing towards you and start to kneel in front of you, bowing at your feet.<br><br>" +
				'"Forgive me, ' + this.getYourNameFor() + '! That was not my intention, this book was just lying around. I didn\'t even like it! Please, forgive this slut of yours for her wrong doing!", Monique says, begging you.<br><br>' +
				'"Well, from now on, you don\'t need these types of damn books! All you need is me to live out your desires. Do you understand?", you ask your librarian.<br><br>' +
				'"Yes, of course!", she bows her head while simultaneously kissing your feet.<br><br>' +
				'"I am very disappointed in you. You have to earn my trust again!", you say. You see she\'s fighting with her tears, so after a few seconds of silent waiting you hug her and give her a kiss on her pretty face.<br><br>' +
				'"I understand, ' + this.getYourNameFor() + '! I should have known better that there can be nothing else in my life except you!", she says somewhat relieved. ' +
				"You tell her to go back to work. She bows one last time and returns to her desk, but with one quick action she throws the book into the garbage bin. You smile to yourself. You know it was all just a play to encourage her to work harder. You have done what you wanted, now she will be extremely focused to earn back your attention and trust.",
				"setPersonFlag('Monique',16)", "top:5vh;height:85vh"
			);
			return true;
		}
		if (sType == "moniquereadingkinks") {
			showPopupWindow("Monique Reading",
				this.addPersonString("monique3a.jpg", "height:max%", "right") +
				'You see the book, Fifty Shades of Grey on Monique’s desk and become curious.</p>' +
				'<p>"Why are you reading that?" You ask, and inevitably startle her.</p>' +
				'<p>“Ohhh, ' + this.getYourNameFor() + ', it was before you came along that I’ve read that book! It\'s such a famous book I knew I had to read to it! And I always had a thing for erotic novels, especially ones featuring BDSM." she says defensively.</p>' +
				'<p>“BDSM?” You smirk. “You are not keeping any kinky desires a secret from me, are you, Monique?”</p>' +
				'<p>“No!” Monique spins around and almost falls off her chair. “I mean, I would never intentionally keep secrets from you! The topic is fascinating but that doesn\'t mean I would want you to tie me up and spank me or even “want” you to do anything and I didn\'t even like that book so please forgive me, I..."</p>' +
				'<p>You interrupt her before she can talk herself into a nervous frenzy and assure her that you are not mad at her, calming her a little before asking the essential question.</p>' +
				'<p>“Be honest, Monique, do you fantasize about being tied up and dominated?”</p>' +
				'<p>“I...Yes.” Monique is clearly struggling with herself before she admits it. “B-... but I would never dare to actually demand of you to...”</p>' +
				'<p>“Simple answers.” You interrupt her, and she falls silent. “I expect you to tell me of such desires in the future, and if you are a good slave, and I am able to, I may even fulfill them.”</p>' +
				'<p>Monique\'s eyes light up s you say that, and she looks up to you with utter devotion now. “Of course! I mean, I don\'t think I\'m ready for...” She looks at the book. “...this just yet, but thank you, ' + this.getYourNameFor() + ', Thank you!”</p>' +
				'<p>The two of you share a hug and a brief kiss before Monique heads back to work with renewed devotion for you. Finding out about her hidden desires is a good step towards making her enjoy her enslavement even more, and who wouldn\'t like to have a happy, kinky slavegirl?"',
				"setPersonFlag('Monique',16)", "top:5vh;height:85vh"
			);
			return true;
		}
		
		if (sType !== "") return false;
		
		if (isShopOpen(2, 1, true) && this.isHere() && this.getCharmedLevel() == 1 && !this.checkFlag(1)) {
			// First meeting after minimal charm
			showPopupWindow("Monique Reading",
				this.addPersonString("monique13.jpg", "height:max%", "right") +
				'You enter the reference area and you see Monique sitting at her desk, looking very relaxed, almost if she was daydreaming. Then again as you have cast the charm spell on her, her libido would be increased so it is even possible she was masturbating.</p>' +
				'<p>She notices you but does not look surprised or embarrassed, so it is more likely she was just daydreaming. She says,</p>' +
				'<p>"Hi ' + perYou.getPersonName() + ', how nice for you to visit, my charming friend. Is there anything I can help you to research?" As she says this she sits back up straight at her desk, as she comes out of the daydream she was having.<p>' +
				'<p>It seems she is affected by the spell, no longer a helpful librarian, now she considers you a good friend, but also with a more sensual attitude than before.',
				"setPersonFlag('Monique',1)", "top:5vh;height:85vh"
			);			
			return true;
		}
			
		if (isShopOpen(2, 1, true) && this.isHere() && this.getQuest() > 4 && !this.checkFlag(16) && this.getCharmedLevel() > 1) {
			showPopupWindow("Monique Reading",
				"<img src='UI/books/shadesbook.jpg' style='width:15%;float:right;margin-left:5px' alt='Book'>" +
				"You see the book, Fifty Shades of Grey on Monique’s desk and you become curious.</p>" +
				addOptionLink("string", 'This is a good opportunity to get her to work even harder', "dispPlace(Place,'type=moniquereadingharder')", "chatblock", "width:50%;margin-left:10%") +
				addOptionLink("string", 'This is a good opportunity to learn about her kinks', "dispPlace(Place,'type=moniquereadingkinks')", "chatblock", "width:50%;margin-left:10%") +
				addOptionLink("string", 'On second thought, you just ignore it', "setPersonFlag('Monique',16);dispPlace(Place,'','Monique really may enjoy whatever books she likes, no need to interfere here.')", "chatblock", "width:50%;margin-left:10%"),
				'', '', true, true
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md, bHome;
		
		if (Place == 269) {
			if (sType == "moniquepool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("monique-pool.jpg");
				addPlaceTitle(md, "Swimming with Monique");
				md.write(
					'<p>Monique steps out of the changing room dressed in a sexy bikini, looking a bit more confident than usual. Unfortunately spoiled a little when she starts as she glances over at a noise, it was just someone diving into the pool.</p>' +
					'<p>You encourage her to join you for a swim, but you canny help but admire her figure'
				);
				if (this.getCharmedLevel() > 1) md.write('and that areas here are quite disrete and private...');
				md.write('</p>');
				
				startQuestions();
				if (this.getCharmedLevel() > 1) addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=moniquepoolsex');
				addLinkToPlaceC(md, 'chat to her and then say goodbye to Monique', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "moniquepoolsex") {
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPerson("monique-pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Monique");
				md.write(
					'<p>You ask your nervous librarian to play with you more privately, and she seductively removes most of her bikini, ready for you!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Monique', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 8) {
			if (sType == "readsancturaryarms") {
				md = WritePlaceHeader(true);

				md.write(
					'<table class="table-main"><tr><td style="vertical-align:top;background-color:#C0C0C0;color:black">' +
					'<p style="text-align:center;font-size:x-large"><b>History of the Sanctuary Arms</b></p>' +
					'<p>When Glenvale was first founded a dark coven of witches opened a hellgate. Arrogant in their ' +
					'power and curiosity, the coven believed that they could control the forces that they had unleashed. It was not so.</p>' +
					'<p>An ancient family of mystics found out about the gate, managed to close it with a mystic ' +
					'artifact that locked it down, and remained in Glenvale to ' +
					'make sure that it would never be reopened. To aid in this task, they built a building called The Sanctuary Arms.</p>' +
					'<p>Later an evil warlock, Carl Kurndorf, stole the artifact and managed to kill the most powerful ' +
					'of the guardian family through treachery and unholy alliances while they were trying to prevent the Hellgate ' +
					'from opening. The guardian\'s apprentice and lover managed a barrier spell that trapped her in the dungeon beneath ' +
					'the building to prevent the gate from opening. Her presence ' +
					'is a cork to stop the hellgate\'s opening. Since the apprentice was trapped, and the other protectors were ' +
					'murdered, Carl Kurndorf took over the town. He set ' +
					'himself up as ruler in the very building which guards the hellgate and from which he stole the artifact.</p>' +
					'<p>Carl Kurndorf renamed the building which became his seat of power to commemorate this major event ' +
					'in his life: The building known as The Broken Inn Hotel.</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'exit the reference area', 3);
				WritePlaceFooter(md);	
				return true;
			}
		}
		
		if (Place == 8 || Place == 283) {
			if (sType == "charmmonique1") {
				// Event: Charm Monique 1
				bHome = Place != 8;
				this.setQuest(1);
				this.setFlag(1, false);
				md = WritePlaceHeader();
				if (this.checkFlag(17)) this.setFlag(17, false);		// can ask again

				this.showPerson(bHome ? "moniquehome2.jpg" : "monique9.jpg");
				addPlaceTitle(md, "Monique Under A Spell");
				md.write(
					'<p>As the spell takes hold of Monique she struggles to keep her identity. ' +
					'She sways ' + (bHome ? 'in place' : 'in her chair') + ', trying to prevent the telepathic control, ' +
					'but the spell is overwhelming and her movements gradually slow.</p>' +
					'<p>&quot;Can you hear me?&quot; you ask, cautious of the spell\'s effect.</p>' +
					'<p>&quot;Yes,&quot; she replies, her voice a flat, distant tone. She has stopped moving to listen to you.</p>'
				);

				startQuestions();
				addLinkToPlaceO(md, "increase Monique\'s arousal", Place, 'type=charmmonique2');
				if (!bHome) addOptionLink(md, "go to to the reference area?", "LeaveMoniqueMin()");
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmmonique2") {
				// Event: Charm Monique 2
				bHome = Place != 8;
				md = WritePlaceHeader();
				if (bHome) this.showPerson("moniquehome3.jpg");
				else this.showPerson("monique3a.jpg", "", "", "monique3b.jpg");

				addPlaceTitle(md, "Monique Under A Spell");
				md.write(
					'<p>You tell the entranced woman, &quot;You are feeling very sexually aroused, Monique. You are feeling so sexy ' +
					'that you want to take your clothes off and screw me,&quot;</p>' +
					'<p>Monique fights your orders. &quot;No,&quot; she claims. &quot; I... I shouldn\'t... I don\'t...&quot; But ' +
					'even as she speaks her body betrays her and her legs begin to part.</p>' +
					'<p>Urgently you prompt her on, &quot;You are feeling sexy Monique. You want to please me.&quot;</p>' +
					'<p>Her movements become sensual despite her willpower.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, "order Monique to relax", Place, 'type=charmmonique3');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmmonique3") {
				// Event: Charm Monique 3
				bHome = Place != 8;
				md = WritePlaceHeader();
				this.showPerson(bHome ? "moniquehome4.jpg" : "monique4.jpg");
				addPlaceTitle(md, "Monique Under A Spell");
				md.write(
					'<p>Monique\'s tension vanishes on your order, freeing her increased desire. A whimper escapes her lips, then a soft moan.</p>' +
					'<p>"Oh ' + perYou.getPersonName() + '," Monique whispers. "I can\'t believe this is happening to me. I\'ve never felt so horny for a '
				);
				if (perYou.isMan()) md.write('man before."</p>');
				else md.write('woman. Does this mean that I\'m a lesbian?"</p>');
				md.write('<p>As Monique ' + (bHome ? 'removes the top of her dress' : 'unbuttons her top') + ' her will resurfaces in denial. "No!" she says. "This is can\'t be right. You have done something to me. You must have!"</p>');

				startQuestions();
				addLinkToPlaceO(md, "increase Monique\'s arousal", Place, 'type=charmmonique4');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmmonique4") {
				// Event: Charm Monique 4
				bHome = Place != 8;
				md = WritePlaceHeader();
				this.showPerson(bHome ? "moniquehome5.jpg" : "monique5.jpg");
				addPlaceTitle(md, "Monique Under A Spell");
				md.write(
					'<p>You increase Monique\'s arousal to a new level.</p><p>"You can\'t do this to me "' +
					perYou.getPersonName() + '" the librarian says, but her passion is already destroying her last inhibitions.'
				);
				if (!bHome) md.write(' The woman is so caught up in desire that she no longer cares if people see her or that her job is on the line.');
				md.write('</p>');

				startQuestions();
				addLinkToPlace(md, "order her to remove the rest of her clothes?", Place, 'type=charmmonique5');
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == "charmmonique5") {
				// Event: Charm Monique 5
				bHome = Place != 8;
				md = WritePlaceHeader(false, bHome ? "td-left-med" : "");
				this.showPerson(bHome ? "moniquehome6.jpg" : "monique6.jpg");
				
				addPlaceTitle(md, "Monique Under A Spell");
				md.write(
					'<p>"Remove your panties," you command the woman.</p>' +
					'<p>Monique obeys, all resistance gone from her mind. A servant to your orders, she pulls the thin cloth down until it drops to her feet, then waits expectantly for your next command.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, "order Monique to become your perfect slave - To obey you without question or hesitation, to live only to serve you, with your pleasure as her only ambition?", bHome ? 283 : 8, bHome ? "type=endcharm" : "act=endcharm");
				WritePlaceFooter(md);
				return true;
			}				
		}

		if (Place == 283) {
			if (sType == "recharm1") {
				// Re-charm Monique (Minimal to Slave)
				this.charmThem(4);
				md = WritePlaceHeader();
				this.showPerson("moniquehome3.jpg");
				addPlaceTitle(md, "Monique Under A Charm Spell - Again");
				md.write(
					'<p>As the spell takes hold of Monique she struggles to keep her identity. ' +
					'She sways ' + (bHome ? 'in place' : 'in her chair') + ', trying to prevent the telepathic control, ' +
					'but the spell is overwhelming and her movements gradually slow.</p>' +
					'<p>&quot;Can you hear me?&quot; you ask, cautious of the spell\'s effect.</p>' +
					'<p>You tell the entranced woman, &quot;You are feeling very sexually aroused, Monique. You are feeling so sexy ' +
					'that you want to take your clothes off and screw me,&quot;</p>' +
					'<p>Monique fights your orders. &quot;No,&quot; she claims. &quot; I... I shouldn\'t... I don\'t...&quot; But ' +
					'even as she speaks her body betrays her and her legs begin to part.</p>' +
					'<p>Urgently you prompt her on, &quot;You are feeling sexy Monique. You want to please me.&quot;</p>' +
					'<p>Her movements become sensual despite her willpower.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, "order Monique to become your perfect slave - To obey you without question or hesitation, to live only to serve you, with your pleasure as her only ambition?", 283 , "type=endcharm");
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "moniquebj") {
				// Oral in Moniques room
				md = WritePlaceHeader();
				if (isExplicit()) {
					if (perYou.isMaleSex()) this.showPersonX("monique14b.jpg");
					else this.showPersonRandomX("monique10g", 2);
				} else if (perYou.isMaleSex()) this.showPerson("monique14b.jpg");
				else this.showPersonRandom("monique10g", 2);

				addPlaceTitle(md, "Monique\'s Soft Lips");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>Sometimes, words are not needed. Monique stands in front of you at the ready, and as you open your pants and gesture to the ground before you, your ever faithful slave immediately understands and crouches down.</p>' +
						'<p>Monique\'s tongue begins to slide eagerly over your manhood, covering you in her saliva and using her hand to get you erect, and doing a good job at it. You place one hand on your hip and drive the other through her hair, watching her as her lips wrap over the tip and begin to slide back and forth, enjoying your slaves administration.</p>' +
						'<p>“You practiced, did you?” You ask her, and the response is a muffled grunt of confirmation before she takes you in all the way to the base as if to show of the results of it. You definitely approve.</p>' +
						'<p>It doesn\'t take her long to bring you close to the edge and when the moment comes, you take a hold of her hair to keep her in place and shoot your load into her mouth.</p>' +
						'<p>Monique waits patiently, swallowing every drop as ordered and eagerly cleaning when might be left with her tongue after you let go of her.</p>'
					);
					if (wherePerson("Hannah") == 237) md.write('<p>At one point during the session, you see Hannah passing by the door with a snack in hand, giving the two of you a thumbs up and remaining there to watch for a while before heading back into her own room.</p>');
				} else {
					md.write(
						'<p>You grab Monique\'s hair and pull the woman into a kiss as a greeting before simply sitting down on her chair and ordering her to knee in front of you.</p>' +
						'<p>Monique is taken aback by your directness at first, nervously fidgeting with her fingers before quickly following up on your order and helping to undress you.</p>' +
						'<p>You smile as you wait for her to finish and lazily lean back, one of your legs now resting on her desk to present your sex to her. “You know what to do, my pet.”</p>' +
						'<p>“Y...yes Mistress.” Monique clearly isn\'t used to such a treatment, and it does take her a moment to “find her flow” so to say, but with a few subtle pointers from you, she begins to lure the first subtle moans from your lips.</p>' +
						'<p>You praise her advances and she seems to grow more confident, her tongue now flicking over your clit before she sucks it inside with her lips and decides to use her fingers to help out.</p>' +
						'<p>Soon, her efforts bear fruit, you feel your body tremble a little as your climax begins to build up and firmly take a hold of Monique\'s hair and press her closer against your twitching fold as you finally reach your peak. Once again praising your eager pets success.</p>'
					);
					if (wherePerson("Hannah") == 237) md.write('<p>At one point during the session, you see Hannah passing by the door with a snack in hand, giving the two of you a thumbs up and remaining there to watch you for a while before heading back into her own room.</p>');
				}
				startQuestions();
				addLinkToPlace(md, "talk more to Monique", 283);
				addLinkToPlace(md, "leave Moniques\'s room", 237);
				addLinkToPlace(md, "leave the apartment", 194);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "moniquefuck") {
				// Fuck/strapon in Moniques room
				md = WritePlaceHeader(false, isExplicit() ? "" : "td-left-large");
				if (perYou.isMaleSex()) this.showPersonRorX("monique18.jpg");
				else this.showPersonRandom("monique11g", 3);

				addPlaceTitle(md, "Take Monique");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>Well, for starters,” You tell her with a smile. “...you could slip out of your clothes, lie down on the bed and let me fuck you, my lovely servant.”</p>' +
						'<p>There is a moment of hesitation in which Monique seems to process what you just said and a profound blush appears on her cheeks.</p>' +
						'<p>“Oh! Of course!” She hastily pushes her nightie over her head.” Please pardon the delay, ' + perYou.getMaster() + ', I did not mean to make you wait!”</p>' +
						'<p>You admit that it\'s cute how she still gets nervous and is taken aback by direct orders like these, but still tell her that you expect better of your servants, and order her to put on a bit of a show while you remove your own clothes to make up for the delay, and Monique eagerly complies.</p>' +
						'<p>Monique is no professional stripper and her nerves sometimes get the better of her when she serves you like this, but she tries her best to move sensually, and you certainly enjoy watching her slowly remove that nightie, take off her glasses and finally recline with a gentle moan and push up her hip to remove her panties.</p>' +
						'<p>“Lovely show, my pet.” You comment her and slip on the bed, aligning your cock with her folds. “Is your pussy ready for me?”</p>' +
						'<p>“Y....yes ' + perYou.getMaster() + '.” Monique nods quickly and bites her lower lips, watching you expectantly.</p>' +
						'<p>“Good girl.” You push into her without further delay and begin to grind your hip against her body, your motions quickly picking up in pace.</p>' +
						'<p>“Ohhh, Thank... thank you, ' + perYou.getMaster() + '.” Monique rolls her head back and just lets you take her, her lovely breasts jiggling with every rough motion you make and her fingers feverishly rubbing over her clit to stimulate her further.</p>' +
						'<p>It doesn\'t take long for both of you to reach your climax, and as you do, you place one of her legs against her shoulder and lean forward, embedding your cock as deeply into her as you can as you shoot of your load while her body twitches underneath you.</p>'
					);
					if (wherePerson("Hannah") == 237) md.write('<p>Monique\'s body slowly comes to rest, and you see that Hannah has apparently decided to check on the two of you, likely attracted by Monique\'s moans. She is standing in the doorway, breasts exposed and her hand deep inside her pants, giving you a sly grin as she realizes you finally noticed her.</p>');

				} else {
					md.write(
						'<p>“Well, for starters,” You tell her with a smile. “...you could slip out of your clothes, lie down on the bed and let me fuck you, my lovely servant.”</p>' +
						'<p>There is a moment of hesitation in which Monique seems to process what you just said and a profound blush appears on her cheeks.</p>' +
						'<p>“Oh! Of course!” She hastily pushes her nightie over her head.” Please pardon the delay, Mistress, I did not mean to make you wait!”</p>' +
						'<p>You admit that it\'s cute how she still gets nervous and is taken aback by direct orders like these, but still tell her that you expect better of your servants, and order her to put on a bit of a show while you remove your own clothes to make up for the delay, and Monique eagerly complies.</p>' +
						'<p>Monique is no professional stripper and her nerves sometimes get the better of her when she serves you like this, but she tries her best to move sensually, and you certainly enjoy watching her slowly remove that nightie, take off her glasses and finally recline with a gentle moan and push up her hip to remove her panties.</p>' +
						'<p>You use the time to undress and prepare your trusty strap on, making sure Monique has a good view as you fasten the straps and spread a bit of lube around it.</p>' +
						'<p>“You know what happens next, do you?” You ask in a teasing voice, and Monique quickly nods. “Yes Mistress”.</p>' +
						'<p>“Turn around!”</p>' +
						'<p>Your pet immediately complies and presents her rear to you, her legs slightly spread and her body shaking in anticipation as you move behind her and begin to rub the tip of the strap-on over her clit and folds and finally push all the way into her with a single, rough motion.</p>' +
						'<p>Monique reacts beautifully, Her body jerks forward, but she immediately catches herself and pushes her hip against yours while you begin to move, her fingers digging into sheets with every rough motion.</p>' +
						'<p>“Hmmyesyesyes... thank you mistress.” Monique groans, screams, and occasionally gives a little yelp when you slap her rear or pull her hair, enjoying every little bit of stimulation and quickly reaching her peak, her entire body shuddering under the sensation and finally collapsing on the bed, gasping for air.</p>'
					);
					if (wherePerson("Hannah") == 237) md.write('<p>Monique\'s body slowly comes to rest, and you see that Hannah has apparently decided to check on the two of you, likely attracted by Monique\'s moans. She is standing in the doorway, breasts exposed and her hand deep inside her pants, giving you a sly grin as she realizes you finally noticed her.</p>');
				}

				startQuestions();
				addLinkToPlace(md, "talk more to Monique", 283);
				addLinkToPlace(md, "leave Moniques\'s room", 237);
				addLinkToPlace(md, "leave the apartment", 194);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "endcharm") {
				// End of charming her
				md = WritePlaceHeader();
				this.showPerson("moniquehome7.jpg");

				addPlaceTitle(md, "Slave Monique");

				md.write(
					'<p>"Please command me, ' + this.getYourNameFor() + '.  I live to serve, and I serve only you."' +
					'Monique says in a honeyed voice, her fingers lightly pinching her nipples and every pore of her being dripping sex.</p>' +
					'<p>You have added a servant to your harem. Monique is eager to do whatever you want, and to please you in any and every way she can. All you have to do is command her and she is yours.</p>'
				);
				startQuestions();
				addLinkToPlace(md, "talk more to Monique", 283);
				addLinkToPlace(md, "leave Moniques\'s room", 237);
				addLinkToPlace(md, "leave the apartment", 194);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place != 279) return false;

		if (sType == "learnshieldedcharm") {
			// Learn Shielded Charm
			md = WritePlaceHeader(false, 'td-none');
			addPlaceTitle(md, "Gem Spell");
			md.write(
				'<form method="POST" name="FormChar">' +
					'<p>Tiny words are printed behind the gem. Some of the letters are faded. It reads <em>... One.</em></p>' +
					'<p><input type="text" size="20" name="research"><input type="button" name="button" value="please" onClick="ResearchOLD(\'X\', document.FormChar.research.value)"></p>' +
				'</form>'
			);
			addLinkToPlace(md, 'Never mind...', 279);
			AddRightColumnMed(md);
			
			if (sWho == "monique") this.showPerson("monique12a.jpg");
			else md.write('<img src="Images/Items/gem1.jpg" style="width:100%" alt="Gem">');
			WritePlaceFooter(md);
			return true;
		}

		if (this.whereNow() != Place) return false;

		if (sType == "moniquecheck") {
			// Sex in the garage
			md = WritePlaceHeader();
			this.showPersonRorX(perYou.isMaleSex() ? "monique17.jpg" : "monique16.jpg");
			addPlaceTitle(md, "Monique\s Test");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>You tell Monique that you want to look further into the stones writing and take her to the back of the workshop, where a Van had been rather conveniently placed. It\'s deep enough inside to be safe from nosy passersby\', and large enough to block even Hannah\'s view, which gives you an idea.</p>' +
					'<p>Monique begins to dutifully spread out her notes and opens one page of the book, pretty much oblivious to the fact that you have already opened your pants and letting your manhood hang down freely behind her head.</p>' +
					'<p>Suffice to say, she is startled when she spins around and comes face to face with your half erect cock, her eyes widening with a gasp and rolling up to you.</p>' +
					'<p>“Here?” She whispers, and you simply nod.</p>' +
					'<p>“But...” She looks around if anyone might see her, and you shake your head. “No one will notice, if you can be quiet.”</p>' +
					'<p>Monique pulls her lower lip in and once more glances around, her hands shaking a little as she reaches for your shaft, and begins to thoroughly wet it with her tongue until it stands fully erect and her lips wrap around it.</p>' +
					'<p>You allow her to move her head a few times, but don\'t intend to let her off that easy, firmly grabbing her hair to pull her away from you while motioning her to take off her pants.</p>' +
					'<p>Monique nervously looks around once more, but follows suit surprisingly fast, getting rid of her jeans while you sit down, and straddling you when you pull her closer.</p>' +
					'<p>She wastes no time to guide the tip of your cock to her sex and push her hip down, barely able to muffle a lewd noise as she does so, and begins to push her body up and down.</p>' +
					'<p>“Surprisingly eager all of the sudden...” You teasingly whisper to her ear and place two fingers on her clit, and this time you need to stifle her moan by placing your other hand on her lips.</p>' +
					'<p>“Shhh...” you remind her playfully. “Or do you want your friend to find you?”</p>' +
					'<p>Monique shakes her head, but her face is flushed red and, all nervousness aside, you are not sure you have ever seen her so aroused. Her pussy is almost clamping down on your intruding manhood with every motion she makes while her entire body trembles in your grasp.</p>' +
					'<p>She spreads her lips and begins to suck on your fingers, doing her best to stifle the amount of noise she makes until you suddenly feel her folds constrict harder around her, her Climax sudden and powerful, even without the need to amplify it with the spell, and quickly dragging you along with it.</p>' +
					'<p>You like this side of the usually ever nervous Monique, and as she begins to redress, you tell her that you will keep her underwear as a reminder of this little adventure, stiffing any protest by pressing a finger to her lips and smiling at her.</p>' +
					'<p>Monique returns the smile and nods, taking her clothes and returning to the front of the ' + getShopStore() + ', where Hannah is still working on her Bike, none the wiser... well... maybe... did she just give Monique a wink?</p>'
				);
			} else {
				md.write(
					'<p>You tell Monique that you want to look further into the writing and take her to the back of the workshop, where a Van had been rather conveniently placed. It\'s deep enough inside to be safe from nosy passersby\', and large enough to block even Hannah\'s view, which gives you an idea.</p>' +
					'<p>Monique begins to dutifully spread out her notes and opens one page of the book, pretty much oblivious to the fact that you have already stripped out of your clothing, and just wait for her to turn around.</p>' +
					'<p>Suffice to say, she is startled when she finally does and comes face to face with your already waiting mound, her eyes widening with a gasp and rolling up to you.</p>' +
					'<p>“Here?” She whispers, and you simply nod.</p>' +
					'<p>“But...” She looks around if anyone might see her, and you shake your head. “No one will notice, if you can be quiet.”</p>' +
					'<p>Hannah pulls her lower lip in and once more glances around, her hands shaking a little as she reaches to spread your folds and begins to drag her tongue along the entire length.</p>' +
					'<p>You allow her to lick you a few times, her tongue tickling your clit, just like practiced, you but don\'t intend to let her off that easy, firmly grabbing her hair after a while to pull her away and motioning for her to take off her pants.</p>' +
					'<p>Monique nervously looks around once more, but follows suit surprisingly fast, getting rid of her jeans while you open the door to the back of the van and order her to spread her legs for you.</p>' +
					'<p>Monique pulls in her lower lip and complies while you start to tease her with your fingers, spreading her folds to massage her inner walls and rubbing over her clit before placing one knee onto the van and pulling her hip against yours with a forceful yank.</p>' +
					'<p>Monique barely stifles a moan as your folds begin to rub against her pussy, your thumb still flicking over her clit as you lean in to press a finger to her lips.</p>' +
					'<p>“Shhh...” you remind her playfully. “Or do you want your friend to find you?”</p>' +
					'<p>Monique shakes her head, but her face is flushed red, but all nervousness aside, you are not sure you have ever seen her so aroused. Her entire body is trembling as you push two fingers past her lips for her to suck on and begin to grind your hip against hers</p>' +
					'<p>Her tongue lewdly trails around your fingers while she does her best to stifle the amount of noise she makes with decreasing efficiency, her muffled moans getting louder the moment your free hand returns to her clit, and her Climax sudden and powerful, even without the need to amplify it with the spell.</p>' +
					'<p>You like this side of the usually ever nervous Monique, and as she begins to redress, you tell her that you will keep her underwear as a reminder of this little adventure, stiffing any protest by pressing your soaked finger to her lips and smiling at her.</p>' +
					'<p>Monique returns the smile and nods, taking her clothes and returning to the front of the ' + getShopStore() + ', where Hannah is still working on her Bike, none the wiser... well... maybe... did she just give Monique a wink?</p>'
				);
			}
			startQuestions();
			addLinkToPlaceC(md, "talk to Hannah some more", 279);
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Monique - Library Closed (now private) OR Shielded Charm
			if (Place == 8 && this.isHere()) {
				if (checkPlaceFlag("Library", 2) || isSpellKnown("Shielded Charm")) {
					if (this.other ===  0) addComments("You do not know her name, so the spell will not work.");
					else if (this.getCharmedLevel() == 1) addComments("Strange, the spell failed, maybe you need somewhere more private with Monique.");
					else CastCharmSpell("Monique", Place, 4, 'type=charmmonique1');
				} else addComments("Don't cast the spell here. It is too public.");
				return "handled";		// Ignore any standard action otherwise
				
			} else if (Place == 283) {
				// Monique - Her room in the apartment
				if (this.other ===  0) addComments("You do not know her name, so the spell will not work.");
				else CastCharmSpell("Monique", Place, 4, 'type=charmmonique1', '', (this.getCharmedLevel() == 1 ? 'type=recharm1' : ''));
				return "handled";		// Ignore any standard action otherwise
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
			if (this.place != 8) WriteComments("You call Monique to invite her to join you at the pool for a swim, but there is no answer");
			else if (isShopOpen(2, 1, true)) WriteComments("You call Monique to invite her to join you at the pool for a swim, but she timidly answers that the library is open now, but once it closes she can");
			else {
				gotoPlace(Place, 'type=moniquepool');
				receiveCall('', 'You call Monique to invite her to join you at the pool for a swim, and she answers hesitantly, "Ok, I\'ll be there soon".');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};
	
	per.addPersonPhoneCall = function() {
		// Only if she is charmed (any way) and you are not there
		if (!this.isCharmedBy() || this.isHere()) return false;
		
		if (!this.checkFlag(21) && isEvening() && this.hoursCharmed() > 96) {
			if (makeCall(true, 191)) this.setFlag(21);
		}
		if (!this.checkFlag(22) && isMorning() && this.hoursCharmed() > 144) {
			if (makeCall(true, 192)) this.setFlag(22);
		}		
		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 190) {
			return receiveSMS('Monique', 'Okay... It\'s a little embarrassing, but I really hope you like it, ' + this.getYourNameFor() + '.', 'moniquesms1.jpg') +
								  replyToSMS("It\'s lovely. :)") +
								  receiveSMS('Monique', 'Thank you, ' + this.getYourNameFor() + ' And Hannah was right, this is exciting!');
		}
		if (id == 191) return receiveSMS('Monique', 'Do you like cupcakes and strawberries. I do', 'moniquesms2' + (this.getCharmedLevel() == 1 ? 'm' : 'c') + '.jpg') + (this.getCharmedLevel() == 1 ? '' : receiveSMS('Monique', 'Sorry, I do not know why I sent that, it was naughty'));
		if (id == 192) return receiveSMS('Monique', 'I usually ride my bike to work in the morning', 'moniquesms3' + (this.getCharmedLevel() == 1 ? 'm' : 'c') + '.jpg') + (this.getCharmedLevel() == 1 ? '' : receiveSMS('Monique', 'Sorry, I forgot I was still getting dressed'));
		return '';
	};
}
