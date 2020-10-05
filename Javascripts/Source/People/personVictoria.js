/****************************************************************
Victoria (Antique Shop)
 ****************************************************************/
function RepliesVictoria(nR)
{
	var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();
	var perVictoria = per;
	var perBeasley = findPerson("Mr Beasley");

	if (nR == 1)
	{
		addComments('<p>"Let me see it ' + myName + '.  Hmm..very nice and quite old but I do not recognise it at all."</p>');
		setPersonFlag("Pamela",10);
	}
	else if (nR == 2)
	{
		addComments('<p>"Ah! It is one of those items, my \'father\' was looking for one for a long time, but he never told me why, aside from it being a perfect defence. Against what and how I do not really know.</p><p>Interestingly the owner of the New Age Shop visited recently and asked about such an item, and offered <i>anything</i> I wanted if I could locate one of these items for her</p>');
		setPersonFlag("Pamela",10);
		setPersonFlag("Pamela",11);
	}
	else if (nR == 192)
	{
		if (isConspiracyPath()) {
			addComments(
				'<p>"Magic Stones?, I just had a young woman sell me something that may be what you are asking about". You ask about the woman, but all Victoria can remember is that she was a waitress or maid. She gets out an odd little stone and shows it to you,</p>' +
				'<p>"I have heard of things like these, they are found around the place, possibly relics of the early days of Glenvale. Still they have no value and I do not consider them antiques. I have seen them for sale in one of the other shops, some people liked them as a novelty item. Here you may have it for ' + sCurrency + '10"</p>'
			);
			if (nMoney < 10) {
				if (nMoney <= 0) addComments('<p>You regretfully tell her you have no money and she smiles, and gives the stone to you, "As I said it has no real value to me, so you may have it. Come back sometime if you work out some interesting things about it."</p>');
				else addComments('<p>You regretfully tell her you do not have enough money and she smiles, and gives the stone to you, "As I said it has no real value to me, so you may have it. Come back sometime if you work out some interesting things about it."</p>');
			} else {
				AddCash(-10);
				addComments('<p>You hand her the money and she smiles, and gives the stone to you, "Come back sometime if you work out some interesting things about it."</p>');
			}
			perYourBody.PutItem(5);
			if (perBeasley.other < 3) {
				perBeasley.other = 3;  // Sets this to 3 Murder && apprentice
				perYou.completeQuest(1);
				setPlaceKnown("WildRanges");
				setPlaceKnown("Park");
				PlaceI(5, 26); // Set stone in the wild ranges
				addComments('<p>As you turn to leave Victoria calls after you, "The young woman did mention that she found this in the <b>Wild Ranges</b>, you know that place north of the Glenvale Park."</p>');
			}
		} else {
			addComments(
				'<p>"Magic Stones?", she asks, and you describe the stones as ' + (isMurderPath() ? 'Mr. Beasley' : perGates.getPersonNameShort()) + ' told you. Victoria replies,</p>' +
				'<p>"I have heard of things like that, they are found around the place, possibly relics of the early days of Glenvale. Still they have no value and I do not consider them an antique. I think I once saw them for sale in one of the other shops, some people liked them as a novelty item. Sorry ' + myName + ' I do not have any here"</p>'
			);
		}
		perVictoria.setFlag(4);
	}
	if (nR == 200)
	{
		addComments('<p>"Let me see it ' + myName + '.  Quite an interesting ring, it has quite an ancient design, but hard to date, in the style of the mythical \'Ring of Arae\', the ring of the furies of curses that is said to invoke and lift curses or other enchantments."</p>');
		perVictoria.setFlag(33);
	}
	else if (nR == 700)
	{
		addComments(
			'You ask Victoria if she knows about any items or books that may talk about how to free someone from being enslaved by a demon,</p>' +
			'<p>"Yes, ' + myName + ', I once heard a ballad, a fairy story, that told of a man stolen by a demon and how his sister went to great lengths to save him. In the end she had to use a powerful relic, a piece of a dragon, that allowed her to perform a ritual at a fairy mound. The ballad does not end well, the demon had to be present and while the man was saved, the demon required the sister to surrender and she was taken away. So the brother was won and the sister lost.</p>' +
			'<p>I would guess the part of dragon spoke of is the legendary "Dragon\'s Eye Gem" but I do not know where this may be, if it ever existed."'
		);
		setPersonFlag("Leanne", 10);
	}
	else if (nR == 701)
	{
		addComments(
			'You ask Victoria if she knows about an artifact called \'The Mirror of Souls\',</p>' +
			'<p>"Yes, ' + myName + ', it is supposed to be a mirror that shows a persons true nature. I once heard my <i>father</i> mention it watches over a dragon in a hidden place here in Glenvale."</p>'
		);
		perVictoria.setFlag(9);
	}
	else if (nR == 1851)
	{
		perVictoria.setFlag(1);
		if (!bCharm) {
			//Normal
			addComments('<p>"Catholic Relic? Around here?" She says evasively. "Well, the convent just outside of town has been around for some time, but I don\'t know of any specific artifact, no."</p>');
		} else {
			// Charmed
			addComments('<p>"A Catholic Relic, ' + myName + '?  I remember my past master mentioning something about an ancient relic but that was before I moved here.  I\'m sorry, ' + myName + '.  I wish I could tell you more."</p>');
		}
	}
	else if (nR == 1852)
	{
		perVictoria.setFlag(1);
		perVictoria.setFlag(2);
		if (!bCharm) {
			//Normal
			addComments('<p>"What\'s this?" She asks, inspecting the relic.  "Very interesting." She says, immediately pulling out a large book and leafing through it.  "Said to have power of demons if properly prepared.  Fascinating. Where did you find this?" She asks, eyeing you suspiciously.</p>');
		} else {
			// Charmed
			addComments('<p>"Give me a moment, ' + myName + '." She says, immediately opening a large tome.  "According to this the relic has <i>power over demons</i>, but it does not say any more than this.  Not being magical myself I am afraid I will be of little more help.  I am sorry, ' + myName + '. Perhaps you should seek the council of someone more... magically inclined.  Perhaps the psychic in town," She suggests.  "If, that is, she is actually a psychic."</p>');
			if (!isPlaceKnown("NewAgeStore")) setPlaceKnown("NewAgeStore"); //know about the new age shop
		}
	}
	else if (nR == 14501)
	{
		perVictoria.setFlag(3);  //asked the question
		if (!bCharm) {
			//Normal
			addComments('<p>"I\'m sorry?" She asks.  "Do you think I carry such fantastical items?  Now, if you are interested in an antique chair I <i>may</i> be able to help you." She says.  You get the <b>distinct</b> impression that she is lying to you.</p>');
		} else {
			// CHARMED
			if (perYou.getQuestAftane() === 0) perYou.setQuestAftane(1); //Start the Aftane Path
			addComments('<p>"Give me a moment, ' + myName + '." She says looking through some of her notes. "My father made some mention of such an Artifact, but once he discovered it was guarded by the Gates Family, ');
			if (perYourBody.FindItem(41) > 0) {
				//already have the Aftane
				addComments('" She says, suddenly stopping as her eyes settle on the aftane around your neck.  "And it would seem you have already found it, ' + myName + '."');
			} else {
				//Doesn't have the aftane
				addComments(' he stopped trying to get it.  Perhaps you should try there."</p>');
			}
		}
	}
	else if (nR == 800) {
		//Player: So, now you’re my personal assistant, right?
		addComments('"Correct, ' + perYou.getMaster() + ', ever since my enslavement to you I have always wanted to ask you this question…but I was too afraid, I did not want to disturb you with my needs."');
		perVictoria.setFlag(10);
	}
	else if (nR == 801) {
		//Player: So…you have wanted to be my right hand woman from the beginning, why?
		addComments('"I am a submissive girl by nature. And I felt something very powerful in you…some kind of essence that is drawing me to you and I cannot and do not want to resist it. This unexplainable force that we have talked about."');
		perVictoria.setFlag(11);
	}
	else if (nR == 802) {
		//Player: OK, now what? What happens now?
		addComments('"I will be always ready to help you. I am going to send you infos from my phone, alert you if anything mentionable happens, check on the other slaves while you are gone, take care of your legal documents and administrate anything you need…"');
		perVictoria.setFlag(12);
	}
	else if (nR == 803) {
		//Player: Like a real secretary I guess…
		addComments('"More than that ' + perYou.getPersonName() + '. I would like to take care of your emotional needs. If you ever feel the need to come by to talk to me, just do it. I am all ears and open to you anytime. Consider me your steady supporter who’s there for you any way possible."');
		perVictoria.setFlag(13);
	}
	else if (nR == 804) {
		//Player: Alright, I expect full discretion and availableness all the time.
		addComments('"Of course! I am here if you need me ' + perYou.getMaster() + '!"');
		perVictoria.setFlag(14);
	}
	else if (nR == 2718)
	{
		addComments('<p><b>Buying the Papers</b></p>');
		if (perYourBody.NoItems == perYourBody.MaxItems) {
			addComments('<p>You don\'t have enough room to carry any more items.  Make room and try again.</p>');
		}
		else if ((nMoney > 50 && perYourBody.FindItem(26) === 0) || bCharm)
		{
			if (bCharm) addComments('You ask to but the papers, but Victoria refuses and gives them to you as a gift.');
			else {
				addComments('You put the papers into your bag and pay ' + sCurrency + '50.');
				AddCash(-50);
			}
			perVictoria.setFlag(36);
			perYourBody.PutItem(26);
			perKurndorf.setQuestSeance(19);
		}
		else if (nMoney < 50) addComments('You do not have enough money. The papers cost ' + sCurrency + '50.');
	}
	else if (nR == 9903) {
		setPersonFlag("Nella", 2);	// Know her name
		setPersonFlag("Nella", 9);	// Asked about (day)
		setPersonFlag("Nella", 6);	// Works as stripper
		if (bCharm) {
			addComments(
				'“Yes, Nella the security guard...I know her quite well, we are...friends."</p>' +
				'<p>Victoria looks uncharacteristically flustered, and you could swear she blushes. Before you can ask her why she continues,</p>' +
				'<p>"She also works as a dancer most nights of the week, friday to sunday, at that strip-club nearby...Please excuse me ' + perYou.getMaster() + ' there is more I can tell you, but please forgive me but can we talk about it tonight? It is complicated and will require some time to explain and demonstrate".</p>' +
				'<p>Demonstrate? You are curious what she means but there is no urgency so you allow Victoria the delay to explain later'
			);			
		} else {
			addComments(
				'“Yes, Nella the security guard...I know her quite well, we are...friends."</p>' +
				'<p>Victoria looks uncharacteristically flustered, and you could swear she blushes. Before you can ask her why she continues,</p>' +
				'<p>"She also works as a dancer most nights of the week, friday to sunday, at that strip-club nearby.."'
			);
		}
	}
	return true;
}


// Initialise

function initialiseVictoria()
{
	addPerson("Victoria", 197, "Victoria");
	per.Replies = RepliesVictoria;
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		return this.isCharmedBy() ? "Slave Victoria" : "Victoria, " + (isBritish() ? "Shop Assistant" : "Store Clerk");
	};

	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		var s = "<p>" + this.addPersonString((this.isCharmedBy() ? "victoria2" : "victoria0") + ".jpg", "height:max%", "right");
		if (this.isCharmedBy()) {
			var clv = this.getCharmedLevel();
			if (clv == 2) return s + 'Victoria, your loyal and trusted servant bows her head whenever you meet her. She’s been most helpful both emotionally and socially.<br><br>Still, it takes her time to adjust to you, she often asks you about how your day went or any special needs you want. She’s still in the cognition part of your relationship with her. Victoria works hard to explore what you like and what you don’t, but sometimes she does things without any instructions or order from you and these moments and actions shows that in time she will know what to do just by looking at her ' + perYou.getMaster() + '.<br><br>So she’s on the right path to fully know you!';
			return s + 'Victoria told you her story when you enslaved her. Now you understand why she looked at you so passionately before her ultimate surrender to you. She said she felt a strong a presence in you, and warned you that a dominant spirit like yours needs to be trained and well preserved. She offered her services for you without any price.<br><br>Just by a few visits to her shop you realized that Victoria is not only beautiful, but quite bright for her age. She learned a great deal about wizardry, magic and the power of control because her father used her as a spy against his enemies. She showed you around the shop while you two talked about the items on the shelves and the knowledge she has about them. You can always ask her about occultism and magic and she will help you out. Victoria is standing behind her desk, quietly waiting for your commands. She is more submissive than your other slaves and you know she would kill for you if it would bring the slightest smile on your face.<br><br>You just have to ask”!';
		} else return s + "Victoria, the lovely owner of the Antiques & Artifacts " + getShopStore(true);
	};

	per.getPersonAddress = function() { return this.isCharmedBy() ? 'above the Antiques ' + getShopStore(true) + ', Glenvale Shopping Center' : ''; };

	// Can you chat with Victoria
	per.showPersonChat = function(bGeneral, md)
	{
		if (!this.isHere() || sType !== "") return;
		
		if (!this.checkFlag(8)) {
			addPopupLinkC(md, 'introduce yourself', "Victoria",
				this.addPersonString("victoria0.jpg", "height:max%", "right") +
				"As you search through the aisles containing strange relics and antique artefacts you come across the owner of the " + getShopStore() + ". The tall brunette lady greets you wholeheartedly,<br><br>" +
				'"Nice to meet you ' + perYou.getPersonName() + '.  My name is Victoria, my father used to own this ' + getShopStore() + ' before I inherited it.  Now, is there something I can help you with?"<br><br>' +
				"You answer that you are just browsing, so she tells you to look around and have fun.<br><br>" +
				"Victoria seems nice, she even flashes a blush to you, but she is busy keeping the " + getShopStore() + " together so you two don’t have enough time to get acquainted. But you certainly do feel a vibe for her and you know her affections are the same.",
				false, "setPersonFlag('Victoria', 8);dispPlace();"
			);
			return;
		}
		
		var clv = this.getCharmedLevel();
		var perDesiree = findPerson("Desiree");
		var perLeanne = findPerson("Leanne");
		
		//Catholic Relic Questions
		if (perDesiree.getQuestRelic() > 0 && !this.checkFlag(1)) {
			// Started the Catholic Relic Path
			addQuestionC(md, '"Do you know anything about an old Catholic relic around here?"', "Victoria", 1851);
		}
		if (perYourBody.FindItem(48) > 0 && !this.checkFlag(2)) {
			addQuestionC(md, 'show her the Relic - "Know anything about this?"', "Victoria", 1852);
		}

		//Aftane of the Dead MURDER Path - so that you can get the aftane on the murder path
		if (isMurderPath()) {
			//On the Murder path
			if (perKurndorf.getQuestSeance() >= 16 && !this.checkFlag(3)) {
				//Seance path has STARTED
				addQuestionC(md, '"Do you know of any relics that can protect from evil spirits?"', "Victoria", 14501);
			}
		}

		if (checkPersonFlag("Pamela", 8) && !checkPersonFlag("Pamela", 9) && !checkPersonFlag("Pamela", 10) && !checkPersonFlag("Pamela", 11) && perYourBody.FindItem(46) > 0) {
			// Ask about the bracelet but do not know the name
			addQuestionC(md, '"Do you know anything about this bracelet?"', "Victoria", 1);
		}
		if (checkPersonFlag("Pamela",  8) && checkPersonFlag("Pamela",  9) && !checkPersonFlag("Pamela",  11) && perYourBody.FindItem(46) > 0) {
			// Ask about the bracelet but do not know the name
			addQuestionC(md, '"Do you know anything about this bracelet, it is called a \'Twin Souls\' bracelet?"', "Victoria", 2);
		}
		if (perLeanne.place == 382 && !perLeanne.checkFlag(10)) addQuestionC(md, 'ask Victoria about saving Leanne', "Victoria", 700);
		if (perLeanne.place == 382 && perLeanne.checkFlag(8) && !this.checkFlag(9) && !checkPersonFlag("Vampyre", 2)) addQuestionC(md, "ask Victoria about the 'Mirror of Souls'", "Victoria", 701);
		
		if (!this.checkFlag(33) && perYourBody.FindItem(32) > 0) addQuestionC(md, 'ask about the silver ring', "Victoria", 200);
		
		if (perYou.isQuestStarted(1) && this.checkFlag(8) && !this.checkFlag(4)) addQuestionC(md, 'ask if she has any magic stones', "Victoria", 192);
		
		// Seance Papers
		if (this.checkFlag(34) && !this.checkFlag(35) && perKurndorf.getQuestSeance() > 17) {
			// Gone!
			addQuestionR(md, 'ask Victoria about the papers Janet sold',
				'She replies, &quot;Oh, I am sorry ' + this.getYourNameFor() + ' I do not really deal in old books that much. I sold them onto a specialist dealer and shipped them out to their shop in France"</p><p>Well that seems to be it, they are gone, you will have to find another source of the information.',
				"Victoria",
				"setPersonFlag(\\'Victoria\\',35);setPersonFlag(\\'Victoria\\',36)"
			);
		}
		if (this.checkFlag(34) && !this.checkFlag(35)) {
			if (perKurndorf.getQuestSeance() == 17) {
				if (clv > 0) {
					addPopupLinkC(md, 'ask Victoria about the papers Janet sold', "Old Papers",
						"<img src='Images/antiquepapers.jpg' style='height:80vh;float:right;margin-left:5px' alt='Papers'>" +
						"You ask Victoria about the papers Janet sold and she shows you a small display case with some books and papers,</p>" +
						'<p>"Here they are, I was going to sell them on to a specialist dealer in books but you are lucky, they are still here. Did you want them?"</p>' +
						'<p>She opens the case and you check through them. Little is of interest, but there is a document discussing séances and it looks exactly like the information you are seeking. You place the document in your bag.</p>' +
						'<p>Victoria closes the case, "Is there anything else you want ' + perYou.getMaster() + ', including me?"',
						false, "setPersonFlag('Victoria',35);setPersonFlag('Victoria',36);perYourBody.PutItem(26);perKurndorf.setQuestSeance(19);dispPlace();"
					);
				} else {
					addPopupLinkC(md, 'ask Victoria about the papers Janet sold', "Old Papers",
						"<img src='Images/antiquepapers.jpg' style='height:80vh;float:right;margin-left:5px' alt='Papers'>" +
						"You ask Victoria about the papers Janet sold and she shows you a small display case with some books and papers,</p>" +
						'<p>"Here they are, I am probably going to sell them on to a specialist dealer in books but you are lucky, they are still here. Are you interested in purchasing them? For a quick sale they are ' + sCurrency + '50?"',
						false, "setPersonFlag('Victoria',35);dispPlace();"
					);				
				}
			}
		}

		if (clv == 2) {
			if (!this.checkFlag(10)) addQuestionC(md, '"So, now you’re my personal assistant, right?"', "Victoria", 800);
			else if (!this.checkFlag(11)) addQuestionC(md, '"So...you have wanted to be my right hand woman from the beginning, why?"', "Victoria", 801);
			else if (!this.checkFlag(12)) addQuestionC(md, '"OK, now what? What happens now?"', "Victoria", 802);
			else if (!this.checkFlag(13)) addQuestionC(md, '"Like a real secretary I guess..."', "Victoria", 803);
			else if (!this.checkFlag(14)) addQuestionC(md, '"Alright, I expect full discretion and availableness all the time."', "Victoria", 804);
		}
		if (clv > 0) {
			addLinkToPlaceO(md, 'examine Victoria\'s merchandise again', Place, 'type=victoriasex');
			if (this.checkFlag(37)) addLinkToPlaceO(md, 'wrap up Victoria\'s merchandise', Place, 'type=victoriabondagesexplay');			
			if (!isShopOpen(0)) {
				// Night, shop is closed and she is charmed, so you are in her apartment
				if (!isDay() && clv > 0) {
					addPopupLink(md, "spend the night with Victoria", "Going to Bed with Victoria",
						'<img src="Images/People/Victoria/victoriabed1.jpg" style="position:absolute;width:100%;bottom:0" alt="Victoria">' +
						'You tell your beautiful slave that you will sleep here tonight. She lies down awaiting you to sample her wares in bedding.',
						true, "sleepForNight()", false, undefined, "background-color:darkgrey;top:10%;left:5%;width:85%;height:80%;padding:0");
				}
			}
		}
	};


	per.passTimeDay = function() {
		this.setFlag(6, Place != 197);	// allow a new morning SMS IF you are not spending the night
		this.setFlag(7, false);	// allow a new evening SMS
		return '';
	};
	
	per.showEventPopup = function()
	{
		if (sType == "askvictorianella") {
			setPersonFlag("Nella", 2);	// Know her name
			setPersonFlag("Nella", 5);	// Asked about 
			showPopupWindow("Asking Victora",
				this.addPersonString("bondageplay1a.jpg", "height:max%", "right") +
				'When you enter the building you see before you a dark haired beauty. By the way she\'s dressed you immediately recognise her as the secretary around here. The white blouse, the skirt, silk stockings and the high heels give that away. ' +
				'You see a nametag on her desk; <b>Angela</b>.<br><br>Her stiff and serious appearance tells you that she\'s the type of girl who lives for her work. However you feel aroused just by looking at her, Angela\'s soft and slim body makes you fantasize about having her as your own secretary. ' +
				'A servant who would be always well informed about you and your needs and ready to do any kind of chores you\'d give to her and would know you personally.<br><br>' +
				'While you daydream about her, she doesn\'t seem to notice you, she\'s clearly into her work and just types something casually on the computer.'
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md, myname;
		
		if (Place == 269 && sType == "victoriapool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("victoria-pool.jpg");
			addPlaceTitle(md, "Swimming with Victoria");
			md.write(
				'<p>Victoria arrives, dressed in a lovely yellow bikini, and she sits on a lounge to have a chat with you before going for a swim.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=victoriapoolsex');
			addLinkToPlaceC(md, 'say goodbye to Victoria', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "victoriapoolsex") {
			md = WritePlaceHeader(false, 'td-left-large');
			if (isExplicit() && perYou.isMaleSex()) this.showPersonX("victoria-pool-sex.gif");
			else this.showPerson("victoria-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Victoria");
			md.write(
				'<p>You ask Victoria to play with you more privately, and she seductively removes most of her swimsuit and lies back waiting for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Victoria', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (!this.isHere()) return false;
		
		if (sType == "charmvictoria1") {
			// CHARM Victoria 1
			md = WritePlaceHeader();
			this.showPerson("victoria2.jpg");
			this.setFlag(8);  //Advance Normal Path to "introduced"
			if (perKurndorf.getQuestSeance() >= 16) this.setFlag(3, false);  //can ask about aftane again
			addPlaceTitle(md, "Victoria Under a Spell");
			md.write(
				'<p>She looks at you, seemingly much more in control of herself than any other you have seen when the spell takes hold.</p>' +
				'<p>"You... you just said <i>Dai Chu Victoria</i>,didn\'t you," she says, more than asks. "I... I can feel ' +
				'it working inside me, filling me with desire I did not have only moments ago."</p>' +
				'<p>"I, uhm.... I mean to say..." you stammer, caught off-guard by someone who knows so much about ' +
				'something you have only recently uncovered.  But does this mean that she knows of magic as well?</p>' +
				'<p>"Do not be afraid," she says.  Curious that she would try to console <i>you</i> considering that ' +
				'you just cast a spell that will eventually enslave her.  "After all, in a few moments I will be your ' +
				'willing slave and would no longer be a threat to you, even if I were magical myself," she says, as if reading your mind.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Uhm...  You\'re not reading my mind, are you?"', Place, 'type=charmvictoria2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmvictoria2") {
			// CHARM Victoria 2
			md = WritePlaceHeader();
			this.showPerson("victoria3.jpg");
			addPlaceTitle(md, "Victoria Under a Spell");
			md.write(
				'<p>She smiles at you. "No, I am not reading your mind," she says as she begins to undress. "My name is Victoria,'
			);
			if (!this.checkFlag(8)) {
				//Don't know her name yet.
				md.write(' as you know, ' + perYou.getMaster() + ', but of course you will call me whatever you wish.  Is that what I should call you from now on? ' + perYou.getMaster() + '?"</p>');
				this.setFlag(8);
			} else {
				md.write(perYou.getMaster() + ', but of course you will call me whatever you wish.  Is that what I should call you from now on? ' + perYou.getMaster() + '?"</p>');
			}
			md.write(
				'<p>"Uhm...  Well...  Yes, that is what you shall call me from now on.  And, as for you, I suppose Victoria is fine.  Or slave," you stammer.  "But, I reserve the right to change my mind ' +
				'at any time," you say, trying to reassert control over the situation. ' +

				'<p>"Of course, ' + perYou.getMaster() + '," she says.  "You shall do whatever you wish, and I will aid you in any way I can.  Shall I finish undressing for you now?" she asks.</p>' +

				'<p>"I can feel the spell still working within me, my desire is greatly increasing. I am almost ready for you to take me and complete my enslavement."</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Yes, uhm...  continue undressing..."', Place, 'type=charmvictoria3');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmvictoria3") {
			// CHARM Victoria 3
			md = WritePlaceHeader();
			this.showPerson("victoria4.jpg");
			addPlaceTitle(md, "Victoria Under a Spell");
			md.write(
				'<p>"Do you like what you see, ' + perYou.getMaster() + '?"' +
				'she asks as she removes the last of her clothing.</p>' +
				'<p>"Yes, I do," you say, slowly beginning to recover from your initial surprise.  "How do you ' +
				'know so much about what is happening to you?"</p>' +
				'<p>"Ah, yes.  I should have realized you would be curious about my reaction and informed you ' +
				'earlier.  Please forgive my failure ' + perYou.getMaster() + '."</p>' +
				'<p>"You are forgiven, Slave, as long as you quit talking around my question and actually ' +
				'answer it," you say, beginning to get somewhat annoyed with her altogether stoic reaction to your spell.</p>' +
				'<p>"Yes, of course," she says.  "The reason that I am reacting in such an uncharacteristic ' +
				'manner to the feelings coursing through me is because it is not the first time that I have ' +
				'experienced them," she says as she drops the last of her clothing to the ground.  "You see, ' +
				'I have been a <i>slave</i> before, victim of the very spell you have used on me yet again."</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Tell me more, and play with yourself to prepare for your ' + perYou.getMaster() + '."', Place, 'type=charmvictoria4');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmvictoria4") {
			// CHARM Victoria 4
			md = WritePlaceHeader();
			this.showPerson("victoria5.jpg");
			addPlaceTitle(md, "Victoria Under a Spell");
			md.write(
				'<p>"As you wish, ' + perYou.getMaster() + '," she says as she lays across ' +
				'one of the antique chairs and begins to fondle her breasts.  "Is this what you wanted?"</p>' +
				'<p>"That will do for now," you say, feeling more and more comfortable around your newest aquisition. ' +
				'"Now, you were telling me about your past enslavement?"</p>' +
				'<p>"Yes.  The man that I once called my \'father\' was actually something of a warlock himself, or at ' +
				'least he tried to be.  He knew less than a handful of spells and never amounted to much - but he was ' +
				'always searching for more magical items."</p>' +
				'<p>"Is that why he started an antique ' + getShopStore() + '?  As a front for his search?"</p>' +
				'<p>"Yes.  And when he died a few years ago I \'inherited\' the ' + getShopStore() + ' and moved it here to get away from ' +
				'him and the life that I led with him.  But it would seem that I was destined to be a <i>slave</i>," she says ' +
				'smiling.  "A destiny that I now fully embrace once more."</p>' +
				'<p>"Do you wish to use me now, ' + perYou.getMaster() + '?" she asks, the smell of ' +
				'sex suddenly assailing you and reminding you why you cast the spell in the first place.'
			);

			startQuestions();
			addLinkToPlace(md, '<i>use</i> your new slave in as many ways as you can think of', Place, 'type=charmvictoria5');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmvictoria5") {
			// CHARM Victoria 5
			md = WritePlaceHeader();
			this.showPerson("victoria6.jpg");
			addPlaceTitle(md, "Victoria Under a Spell");
			myName = perYou.getMaster();
			md.write(
				'<p>"Oh ' + myName + '," she cries as you take her, over and over again.</p>' +
				'<p>Sometime later, and after some of the most interactive sex play you have had in some time, you finally ' +
				'find yourself sitting across from her in another chair.</p>' +
				'<p>Although you are exhausted, it would seem that your new slave has more energy and training than you ' +
				'previously thought possible.  "So, was that the spell or do I have your \'father\' to thank for all of that?"</p>' +
				'<p>"The spell certainly helps to keep me perpetually ready for you, ' + myName +
				' and I was one of my fathers favorite pets," she says thoughtfully.  "But there is... something... about you ' +
				'that brings out the animal in me," she says, albeit in her usual stoic tone of voice.</p>' +
				'<p>You barely stifle a bout of laughter, not sure what was more humorous... the entire situation, or the way ' +
				'that she said "animal" with so <i>little</i> emotion that it makes you wonder if she is capable of emotion	at all.</p>' +
				'<p>"I am <i>yours</i> now, ' + myName + '.  In every way possible.  Just the same ' +
				'as every other piece of merchandise in what is now <i>your</i> ' + getShopStore() + ' as well.  Which I will continue to watch over ' +
				'as long as you wish it of me. I live in an apartment upstairs of the ' + getShopStore() + ', you make inspect me anytime, day or night."</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'speak with Victoria of other matters', 197);
			addLinkToPlace(md, 'leave the ' + getShopStore() + ' in Victoria\'s capable hands', 194);
			WritePlaceFooter(md);
			return true;
		}		
		
		if (sType == "victoriasex") {
			// Repeat Sex
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) {
				if (isExplicit()) this.showPersonRandomX("victoria7b", 2);
				else this.showPerson("victoria7b.jpg");
			} else this.showPersonRorX("victoria7g.jpg");

			myName = this.getYourNameFor();

			addPlaceTitle(md, "Playing with Slave Victoria");

			md.write(
				'<p>"You wish to use me again, ' + myName + '?" she asks.  "What would you like	this time?"</p>' +
				'<p>"Surprise me, Victoria, my pet.  Show me another trick you picked up somewhere along the way."</p>' +
				'<p>The closest thing to a gleeful look crosses her face as her desire flushes to the surface. ' +
				'"It shall be as you desire, ' + myName + '," she says, stripping what little ' +
				'clothing she was wearing off and quickly disrobing you as well.</p>' +
				'<p>A little more than an hour later you find yourself once again exhausted and Victoria still willing and able for more.</p>' +
				'<p>"Amazing as ever, pet," you say, and her face once again flushes at your praise.  "Thank you, ' +
				myName + '," is all she says, as usual with little to no emotion.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'speak with Victoria of other matters', 197);
			addLinkToPlace(md, 'leave the ' + getShopStore(), 194);

			WritePlaceFooter(md);
			return true;
		}
		if (sType == "victoriabondagesexplay") {
			// Bondage Games
			md = WritePlaceHeader();

			this.showPersonRandom("bondageplay1", 7);

			myName = this.getYourNameFor();

			addPlaceTitle(md, "Bondage Play with Slave Victoria");

			md.write(
				'<p>"You wish to use me again, ' + myName + '?" she asks.  "What would you like	this time?"</p>' +
				'<p>"Surprise me, Victoria, my pet.  Show me another trick you picked up somewhere along the way."</p>' +
				'<p>The closest thing to a gleeful look crosses her face as her desire flushes to the surface. ' +
				'"It shall be as you desire, ' + myName + '," she says, stripping what little ' +
				'clothing she was wearing off and quickly disrobing you as well.</p>' +
				'<p>A little more than an hour later you find yourself once again exhausted and Victoria still willing and able for more.</p>' +
				'<p>"Amazing as ever, pet," you say, and her face once again flushes at your praise.  "Thank you, ' +
				myName + '," is all she says, as usual with little to no emotion.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'speak with Victoria of other matters', 197);
			addLinkToPlace(md, 'leave the ' + getShopStore(), 194);
			WritePlaceFooter(md);
			return true;
		}		
		
		var clv = this.getCharmedLevel();
		if (((clv == 4 || clv == 1) && (nTime - this.charmedTime) > 48) || sType == "victoriaevent1") {
			setQueryParams("type=victoriaevent1");
			md = WritePlaceHeader(false, 'td-none');
			addPlaceTitle(md, "Victoria");
			this.showPerson("victoria4.jpg", "30%", "left");
			this.charmThem(2);

			// Description
			md.write(
				'<p>Victoria is eager to fulfill your every desire, she booms and moans all the time when she sees you. You know she wets her panties in an instant. She constantly tells you how she misses immediately after you leave her ' + getShopStore() + '. You know that it’s just the charm effect that’s talking, but it feels good hearing it.</p>' +
				'<p>You are standing in front of her at the moment, mouth agape as she is wearing nothing. Her naked body presented to you like an offering.</p>' +
				'<p>"My love! Welcome! I hope this body is to your liking!", Victoria shouts in joy as she sees you. ' +
				'You are still shocked how stunning she looks. You never thought that she has such a nice figure  before.</p>' +
				'<p>"I wanted to please you! I know you have commanded me to stay put and wait further commands, but I thought you would be happy seeing me naked!", her last words are filled with little moans. You know that just by looking at you fills her with orgasms.</p>' +
				'<p>"Yes, you have pleased me, my dear! I… you see… you’ve done well.", you stammer a bit.</p>' +
				'<p>"You know, you don’t have to stand there! These are all yours!", she jiggles her boobs a bit and smiles.</p>' +
				'<p>"' + perYou.getPersonName() + '! I feel an urge to get to know you better. I want to understand you. Your desires, your dreams, your needs. I want to be the person whom you could always rely on, who always got your back. A girl who listens to you anytime and interested in your emotions.", Victoria runs a finger through your chest. ' +
				'You realise she really wants more than just being your girlfriend. Not just a sex toy or a slave like most of the others you have charmed, but a person who supports you. It comes to you that she wants to be your personal caretaker or assistant.</p>' +
				'<p>You grin at her and embrace her for a minute. The two of you silently caressing each other.</p>' +
				'<p>"All right, my dear. But enough talk for now! Let’s have some fun!", you break the silence with a laugh. ' +
				'Victoria doesn’t say a word, she just opens comes close to you and shows you her pair of round tits and gives you a mouthful kiss. You don’t even have to tell her what you want, she’s just doing it all by herself! She’s like reading your mind by trying to please you on her own without your say in it and you like it so far!'
			);

			// Dialogue Options
			startQuestions();
			addLinkToPlace(md, 'talk more to Victoria', 197);
			addLinkToPlace(md, 'leave the ' + getShopStore(), 194);
			WritePlaceFooter(md);
		}

		return false;
	};
			
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Antique Store
			if (Place == 197 && this.isHere())  {
				if (!this.checkFlag(8)) addComments("You do not know her name, so the spell will not work.");
				else CastCharmSpell("Victoria", Place, 4, 'type=charmvictoria1');
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
			if (isShopOpen(0)) WriteComments("You call Victoria to invite her to join you at the pool for a swim, but she replies, \"Sorry, " + this.getYourNameFor() + ", the Antiques Store is open now, can we do this another time?\". You agree and will have to call her another time.");
			else {
				gotoPlace(Place, 'type=victoriapool');
				receiveCall('', 'You call Victoria to invite her to join you at the pool for a swim, and she happily agrees.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};
	per.addPersonPhoneCall = function() {
		if (this.getCharmedLevel() != 2) return false;		// Only sent when she is your personal assistant
		var hr = getHour();
		var no;
		if ((nTime - this.charmedTime) > 72 && hr < 9 && !this.checkFlag(6)) {
			if (!this.checkFlag(5)) {
				// First morning after becoming personal assistant, SMS
				if (makeCall(true, 50)) {
					this.setFlag(5);
					this.setFlag(6);
				}
			} else {
				var ar = [];
				for (var i = 51; i < 55; i++) {
					if (!this.checkFlag(15 + i - 51)) ar.push(i);
				}
				if (ar.length > 0) {
					no = ar[Math.floor(Math.random() * ar.length)];
					if (makeCall(true, no)) {
						this.setFlag(6);
						this.setFlag(15 + no - 51);
					}
				}
			}
		} else if (hr > 19 && this.checkFlag(5) && !this.checkFlag(7) && (!this.checkFlag(25) || !this.checkFlag(26)) && Place != 197) {
			if (this.checkFlag(25)) {
				if (makeCall(true, 56)) {
					this.setFlag(7);
					this.setFlag(26);
				}
			} else if (this.checkFlag(26)) {
				if (makeCall(true, 55)) {
					this.setFlag(7);
					this.setFlag(25);
				}
			} else {
				no = Math.floor(Math.random() * 2);
				if (makeCall(true, 55 + no)) {
					this.setFlag(7);
					this.setFlag(25 + no);
				}
			}
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		switch(id) {
			case 50: return receiveSMS('Victoria', 'Good morning, ' + perYou.getMaster() + '! I hope you had a wonderful dream! I got your number from the telephone book! I hope you don’t mind! I am changing my apartment to be more of an office. You can come through the shop, it’s on the first floor! The door is always open for you!', 'victoriasmsfirstmessage.jpg', '88%');
			case 51: return receiveSMS('Victoria', 'I hope I am not disturbing your morning routine, my ' + perYou.getMaster() + '! I just wanted to check in if you need anything! My body is longing for you, but I certainly understand that you are busy!', "victoriasmslongingbody.jpg");
			case 52: return receiveSMS('Victoria', 'It\'s me again ' + perYou.getMaster() + '! I just had a beautiful dream with you in it! In it you were the king of a realm and thousands and thousands of women were laying at your feet, ready for your command! It was wonderful! I wish you ' + perYou.getMaster() + ' a happy and productive day!', 'victoriasmsijusthadadream.jpg', '88%');
			case 53: return receiveSMS('Victoria', 'Good morning, my ' + perYou.getMaster() + '! I know this is usually the time that you wake up and I wanted to remind you how happy I am being your slave! I am ready to do my everyday routine, but if you wish anything I shall be happy to be of service!', 'victoriasmshappyworkingforyou.jpg');
			case 54: return receiveSMS('Victoria', 'It is a wonderful morning ' + perYou.getMaster() + '! I’ve been a good secretary and I made you breakfast. That’s what secretaries do, right Master? It’s bread and butter with lemon juice ( I made it myself). Yummy! If you are hungry, come and visit me!:))', 'victoriasmsmorningbreakfast.jpg');
			case 55: return receiveSMS('Victoria', 'I hope all is well with you ' + perYou.getPersonName() + '! I wish you a great goodnight sleep! And I am sending you a picture of me to help you sleep, my ' + perYou.getMaster() + '!:)', 'victoriasmsgreatgoodnightsleep.jpg');
			case 56: return receiveSMS('Victoria', 'It’s been a long day, but I wanted to know if everything is alright, ' + perYou.getMaster() + '! I am going to sleep, but here’s me only in my night dress! I know you like it you naughty, naughty ' + perYou.getMaster() + '! :PP', 'victoriasmseveningdress.jpg');
		}
		return '';
	};

}
