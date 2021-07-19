/****************************************************************
		Jessica the Witch Response Base
			Currently CAN'T BE CHARMED
****************************************************************/
function RepliesJessica(nR)
{
	var myLord = per.getYourNameFor();

	if (nR == 1000) {
		//"ask her who she is"
		per.setFlag(5);
		addComments(
			'"The name is Jessica, but let\'s not talk about me now...", the woman says.</p>' +
			'<p>"Are you the one who I think you are? The one whose power will be even greater than mine in time? The true ' + perYou.getMaster() + ' of Glenvale? I know, I can feel it! You are ' + myLord + '!", Jessica continues and sinks down into a kneeling position.</p>' +
			'<p>"What?" you answer, confused by the woman\'s questioning. Jessica begins to eye you suspiciously before you correct yourself, "I mean... uh...  You must be the witch, the one Kurndorf imprisoned here. I want you to help me defeat Davy Robbins. He plans on ruining everything."'
		);
	}
	else if (nR == 12600) //v126 = Witches mana
	{
		addComments('"I have so little mana but you may have what\'s left of my power," she says.  You can feel your power growing (20 mana) as she concentrates on you for a moment.  "There.  It is yours," she says.<br>');
		if (!per.checkFlag(3)) {
			AddMana(20);
			per.setFlag(3);
		}
	}
	else if (nR == 12500) //v125 Witch Jessica Normal Path
	{
		per.other = 1;
		addComments('"Yes it is true, the foul Kurndorf returned after his death and trapped me in this jail. I have existed here ever since."<br>');
	}
	else if (nR == 12502)
	{
		per.other = 10;  // Jessica, the witch path - Séance to Summon Kurndorf
		addComments('"I used Kurndorf\'s own magic to summon and possess the gunman, who killed the warlock. After Kurndorf\'s death he discovered what I had done and cast the wicked spell from beyond."<br>');
	}
	else if (nR == 12510)
	{
		per.other = 11;
		perKurndorf.setQuestSeance(16);  // Start Séance Article Path
		addComments('"You must call the warlock back from beyond ' + myLord + '", claims Jessica. "To do that, you must learn the art of séance and bring a sacrifice to this chamber. I will aid you in the ritual. Though beware, Kurndorf is dangerous, even after death."');
	}
	else if (nR == 12511)
	{
		per.other = 11;
		perKurndorf.setQuestSeance(16);  // Start Séance Article Path
		per.setFlag(1);
		addComments('"Thank you ' + myLord + ' for asking, it has been a long time since someone was kind to me. The only way is to call the warlock back from beyond, ' + myLord + ' and that should weaken my prison" claims Jessica. "To do that, you must learn the art of séance and bring a sacrifice to this chamber. I will aid you in the ritual. Though beware, Kurndorf is dangerous, even after death."');
	}
	else if (nR == 5910) //v59 = Blue Bottle Path
	{
		perDavy.setQuestBlueBottle(perDavy.getQuestBlueBottle() + 1);

		addComments('<p>"You have found the blue bottle!" exclaims Jessica. "It is the very same bottle that was used to imprison Kurdorf\'s power so that he could be killed."</p>');
		if (perDavy.getQuestBlueBottle() == 11) {
			// Have bottle, haven\'t used it (DEFAULT FOR NOW)
			addComments('<p>"Oh no," she cries after taking a closer look.  "The seal has been broken. Kurndorf\'s power must be unleashed into the world.  Who knows what someone could do with that much power..."</p>');
		} else if (perDavy.getQuestBlueBottle() == 21) {
			// Used the bottle on Davy
			addComments('<p>"Hmm... the seal is broken, but the power is still held within. ' + myLord + ', you could do amazing things with the power held in that bottle, but not before we destroy Kurndorf forever.<p>"');
		}
	}
	else if (nR == 2749)
	{
		perKurndorf.setQuestSeance(49);
		Place = 339;
	}
	else if (nR == 2750)
	{
		movePerson("Jesse", 0);		// Reset the demon Jesse to be here
		perKurndorf.setQuestSeance(50);
		perYourBody.RemoveItem(26);	//Drop and Remove Séance Paper from game
		perKurndorf.setQuestGhost(1); //Start the Ghost of Carl Kurndorf Path
	}
	return true;
}

function examineJessicaPainting()
{
	bChat = false;
	WriteComments('<table><tr><td style="vertical-align:top;width:40%"><img src="Images/People/Jessica/' + (isExplicit(true) ? 'Explicit/' : '') + 'jessica_painting.jpg" style="width:95%;" alt="Painting"></td><td><p>An old oil painting of Jessica illustrated in lavish detail and carefully preserved. It shows the Witch another woman, straddling her and starring at the viewer with intense eyes.</p><p>The woman she is with looks familiar to you, but you are not sure where to put her. Maybe an ancestor of someone you know?</p></td></tr></table>');
}


/***************** Initialise ******************************************************************************/
function initialiseJessica()
{
	// Jessica the Witch
	addPerson("Jessica", 193, "Jessica", '', false);
	
	per.extra = [0, 0, 0];		// expanded arbitrary data
	
	per.Replies = RepliesJessica;
	
	per.getYourNameFor = function() { return perYou.getLord(); };
	
	per.getPersonName = function(full) { return full !== true && this.isCharmedBy() ? "Jessica Enslaved" : "Jessica the Witch"; };
	
	per.startRival = function() {
		this.place = 1000;  //Jessica Leaves out and about
		this.extra[0] = 0;
		this.extra[1] = 1;
		this.charmedTime = nTime;
	};
	per.startAlly = function() {
		this.place = 161;  //Jessica bound in cellar (initially)
		this.extra[0] = 1;
		this.extra[1] = 0;
		this.charmedTime = nTime;
	};
	per.isRival = function() { return this.extra[1] > 0; };
	per.getRivalry = function() { return this.extra[1] > 0 ? this.extra[1] : this.extra[0]; };
	per.setRivalry = function(no) {
		this.charmedTime = nTime;
		if (this.extra[1] !== 0) this.extra[1] = no;
		else this.extra[0] = no;
	};
	
	per.isPersonInfo = function() { return this.getRivalry() < 0; };
	per.getPersonInfo = function() {
		if ( this.getRivalry() == -1) {
			return this.addPersonString("jessica-bound1.jpg", "height:max%", "right") +
				"Jessica endures her continued imprisonment stoically.</p>" +
				"<p>She doesn\'t speak much, to you or Bambi, and neither is she willing to answer questions or share information about anything of interest.</p>" +
				"<p>Bambi is taking care of her, per your orders. She is making sure that Jessica has food and drink, but remains meticulous about keeping her always shackled in some way to prevent her from escaping.</p>" +
				"<p>It\'s a stalemate. Jessica has been imprisoned for over 400 years, and a few months or years more will not do much to break her, but at least she won't be in your way.";
		} else {
			return this.addPersonString("jessica3b.jpg", "height:max%", "right") +
				"Jessica is now completely at your mercy, and you couldn't enjoy it more.</p>" +
				"<p>With Legion's magic dampening shackles left in place, and Bambi literally keeping a tight lock on her at all times, the once powerful witch is now little more than a toy for your amusement even without the Dai Chu controlling her mind.</p>" +
				"<p>You have given Bambi leeway to train and punish her as she sees fit, but so far, the witch has proven to be resilient towards any attempts to get her to share a means to fully enslave her and thus end her predicament, stoically enduring her predicament with little struggle, but also showing no sign of breaking any time soon and most likely just bidding her time.</p>" +
				"<p>You are not bothered by her defiance, though. The witch is safely locked away and you'll have a lot of time to either break her or find a way to put her under your control for good.</p>" +
				"<p>Still, sometimes seeing her gives you pause. Jessica wasn't an enemy, and you occasionally do wonder if locking up and sexually torturing someone like her is something you also would have done a few weeks ago before getting the book.";
		}
	};
	
	/*
	per.whereNow = function()
	{
		if (Place == 348) return Place;
		return this.place;
	};
	*/
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 183 && this.isHere()) return this.showPerson("jessica8.jpg", '', '', '', '', false, "string");
		return '';
	};
	
	per.isPlaceImageRight = function()
	{
		return this.place == -1;
	};
	
	per.showPlaceImageRight = function(md)
	{
		this.showPerson("jessica-face.jpg", undefined, undefined, undefined, undefined, undefined, md);
	};
	
	// Popup events
	per.showEventPopup = function()
	{
		//If the Player tries to:
		//enter the Tunnel at the Graveyard.
		//Enter the school 
		//walk towards the park.
		//Enter the Alley at Kollam street
		if (this.place == -1) {
			if (Place != nFromPlace && (Place == 52 || Place == 47 || Place == 323 || Place == 70)) {
				showPopupWindow("Jessica Halts",
					this.addPersonString("jessicabg.png", "height:max%", "right") +
					'“This path does not seem to lead us towards the target of my tracking spell.” Jessica gently speaks up.</p>' +
					'<p>“I am not able to keep the link up for long, ' + perYou.getLord() + '. If you have urgent business in this area, I will need to follow it by myself.”' +
					addOptionLink("string", 'send Jessica off by herself', "movePerson('Jessica',345);bPopupShown=false;dispPlace(Place,'','“Then I will be on my way.” Jessica nods to you.</p><p>“I Thank you for freeing me, ' + perYou.getLord() + ', and I shall contact you as soon as I have found the one I am looking for.”')", "chatblock", "width:40%;margin-left:10%") +
					addOptionLink("string", 'keep accompanying her', "bPopupShown=false;dispPlace(nFromPlace,'','“I thank you, ' + perYou.getLord() + '. Let us be on our way.”')", "chatblock", "width:40%;margin-left:10%"),
					'', '', true, true, true
				);
				return true;
			}
			if (Place == 9 && !this.checkFlag(21)) {
				this.setFlag(21);
				showPopupWindow("Jessica Halts",
					this.addPersonString("jessicabg.png", "height:max%", "right") +
					'Jessica stops in front of the School, concentrating briefly and reaching out with her hand, then pointing towards Kollam Street.</p>' +
					'<p>“It is that way, we are certainly getting closer.” She stops briefly. “Pray tell, technology appears to have progressed immensely... how familiar are the people of this time with magic, or the supernatural in general?”</p>' +
					'<p>You try to explain the state of the world as good as you can, how magic is mostly seen as a part of fairy tails and charlatanry, and she answers with a thoughtful. “I see.” </p>' +
					'<p>“This is good news. It gives us plenty of time to prepare and work in the shadows.”'
				);
				return true;
			}
		
			if (Place == 194) {
				showPopupWindow("Jessica",
					findPerson("Glenvale").addPersonString((isDay() ? "townspeople-exhibitionist1" : "townspeople-exhibitionist2") + ".jpg") +
					(isDay() ? 'The shopping center is abuzz with people during this time of the day, there is noise, street performers and the smell of food all vying for your attention. You had expected Jessica to be affected by all the new stimuli around her, but she remains calm and focused on the tracking spell, even as a woman casually flashes her breasts to the two of you with a playful wink. It looks like she is blocking out everything around her for the time being.' :
								  'The Shopping Center is nearly empty during this time of the day with only a handful of people still around, which does suit you and Jessica just fine.</p>' +
									'<p>You pass by a handful of store-owners closing shop for the night, a few clubgoers and even a woman flashing her ass to the two as you pass her by, but none of it seems to even remotely bother Jessica, who is focused entirely on following her tracking spell.'
					) + '“We are nearly there...” She says, deep in concentration and still holding her hand in front of her. “The target of the link is... in this direction.” You follow her gesture towards an all too familiar building: Esmeralda\'s new Age store.',
					"movePerson('Jessica',345);dispPlace(344)", '', true
				);				
				return true;
			}
			
			if (isPersonHere("Vampyre") && !this.checkFlag(28)) {
				this.setFlag(28);
				if (checkPersonFlag("Vampyre", 7)) {
					showPopupWindow("Jessica",
						findPerson("Vampyre").addPersonString("vamp11b.jpg", "height:max%", "right") +
						'“You have freed the witch, I see... poor choice.” Lilith\'s voice is cold, dripping with disdain and the only noise you hear her make as she emerges from the darkness uncomfortably close to you. “She would be a source of tremendous power for us, had you kept her chained and allowed me to feed on her.”</p>' +
						'<p>“Power for her, she means.” Jessica eyes the Vampyre warily. “Creatures like this one do not share, ' + perYou.getLord() + ', and the stronger you allow them to be, the more likely they are to...” Jessica is interrupted when the Vampyre lounges towards her with a loud hiss, startling her to the point that she almost falls over, only to stop before you even had a chance to react.</p>' +
						'<p>“So weak... so helpless...”Lilith chuckles coldly. “Don\'t worry, “dear” as long as you are under ' + perYou.getMaster() + '\'s protection, you are safe from me...”</p>' +
						'<p>Her eyes narrow after these words.</p>' +
						'<p>“Pray to whatever power you revere that they do not change their mind.”</p>' +
						'<p>You angrily admonish Lilith for her behavior, but the Vampyre seems completely unaffected by your words, just casting a last glare towards Jessica before slipping back into the shadows and preparing to follow you as usual.'
					);				
				} else {
					showPopupWindow("Jessica",
						findPerson("Vampyre").addPersonString("vamp11b.jpg", "height:max%", "right") +
						'"You feel your neck-hair standing up, a sense of impending danger creeping through your entire body as the night\'s darkness envelops you, and while you do not hear or see her coming, you sense her presence just in time to react.</p>' +
						'<p>“LILITH! STOP!”</p>' +
						'<p>The Vampyre comes to a halt mere inches away from of a startled Jessica, fangs barred, emitting a growl somewhere between annoyance and rage before taking a step back but keeping her eyes on her prey.</p>' +
						'<p>“Let me feed off the witch!” She demands. “Her blood is ancient... powerful! It smells like the purest of Ambrosia!”</p>' +
						'<p>You order the Vampyre to stand down and she begrudgingly complies, and only then does Jessica seem to regain her voice.</p>' +
						'<p>“This is a... how did you...? Why is it...?”</p>' +
						'<p>You do your best to assure Jessica that you have the creature under control and that she has nothing to fear from it, adding that Lilith is not allowed to feed on her or any other witch without your permission and speaking loud enough for the Vampyre to hear you, and it does calm her down a little.</p>' +
						'<p>Lilith, on her end, though, just scoffs at your words, but she does give you a cold “As you wish...” before her gaze returns to Jessica.</p>' +
						'<p>“You are under ' + perYou.getMaster() + '\'s protection... pray to whatever power you revere that they do not change their mind.”'
					);	
				}
				return true;
			}
		}
		
		if (Place == 183) {
			if (!this.checkFlag(4)) {
				showPopupWindow("Jessica",
					this.addPersonString("jessica6.jpg", "height:max%", "right") +
					"To your surprise, the door was still unlocked, and after knocking twice without a reaction from anyone inside, you simply open the door to room 049 and find... Jessica on her knees with one hand between her legs.</p>" +
					"<p>You are briefly stunned by the display and simply watch as she caresses herself, her body gently twitching under each haggard breath while her fingers meticulously roam over her pale skin.",
					"setPersonFlag('Jessica',4);dispPlace(Place,'type=watchjessica2')", '', true
				);				
				return true;
			}
			if (sType == "watchjessica2") {
				showPopupWindow("Jessica",
					this.addPersonString("jessica7.jpg", "height:max%", "right") +
					"After the initial shock, you notice that Jessica remains oddly focused even as she must be getting close to climax. Her eyes meet yours briefly in the seconds before she reaches her peak, and you could swear you see the faintest of smiles on her lips before her head rolls back with a sensual, drawn out moan.",
					"dispPlace(Place,'type=watchjessica3')", '', true
				);				
				return true;
			}
			if (sType == "watchjessica3") {
				showPopupWindow("Jessica",
					this.addPersonString("jessica8.jpg", "height:max%", "right") +
					"Jessica's body is taken by a blissful shudder, and yet, she never seems to fully give up her focus as she draws her fingertips over her body all the way from her hip up to her head and places both hands onto the ground before her.</p>" +
					"<p>Only now do you realize there is a small salt circle in front of her.",
					"dispPlace()", '', true
				);				
				return true;
			}	
			if (sType == "jessicaguide") {
				showPopupWindow("Guiding Jessica",
					this.addPersonString("jessica9.jpg", "height:max%", "right") +
					'A few minutes pass before Jessica enters the Bar, having used the time to sufficiently freshen up and pick something suiting her tastes from Bambi\'s stash.</p>' +
					'<p>“I thank you for your patience, ' + perYou.getLord() + '.” She bows her head politely. “This garment is very... “different” to what a woman would wear in my time, but I hope it is acceptable attire to traverse the Town in, nowadays.”</p>' +
					'<p>You assure her that it is and Bambi even chimes in, mentioning that she could stand to show some more skin as it not the Middle Ages anymore and Jessica certainly no old Lady, prompting a soft chuckle from the witch.</p>' +
					'<p>“I shall keep your words in mind, servant, and I thank you for your... assistance in the last days, even if the circumstances of my stay have been less than optimal.”</p>' +
					'<p>Bambi and Jessica say their farewells to each other, and while Bambi seems genuinely sad to see Jessica go, you do not get the feeling that Jessica would ever be willing to return into her care."',
					"movePerson('Jessica',-1);setPersonFlag('Jessica',16);dispPlace(124)", '', true
				);				
				return true;	
			}
		}
		
		
		if (Place == 348) {
			// Her bedroom
			if (!this.checkFlag(22)) {
				showPopupWindow("Jessica",
					this.addPersonString("jessica-home2.jpg", "height:max%", "right") +
					"You are greeted with an all too inviting view of Jessica's backside as she is about to put on some sexy looking underwear.</p>" +
					"<p>It is possible you just happened to walk in on her while she was about to get dressed, but something tells you that she is not the type of woman who \"accidentally\" allows herself to be caught like this.</p>" +
					"<p>It's an impression further underlined when she does not look to be in the least surprised upon seeing you and just simply closes the clasp on her back and turns to you with a smile, bidding you welcome.",
					"setPersonFlag('Jessica',22)", '', true
				);				
				return true;
			}
			
			// Futa reaction
			if (!this.checkFlag(39) && perYou.isFuta(true) && !perYou.isBornMale()) {
				this.setFlag(39);
				showPopupWindow("Jessica and Your Changes",
					this.addPersonString("jessica-home1.jpg", "height:max%", "right") +
					'“Curious.” Jessica examines your new cock with interest. “You have used a Soulstone to power the Al Mass spell, have you not?”</p>' +
					'<p>You confirm Jessica\'s guess, and she laughs.</p>' +
					'<p>“Kurndorf had been looking for a copy of that spell for years, to think his soul may now be used to power that very spell for someone else is delightful. Still...”</p>' +
					'<p>Her expression turns more serious.</p>' +
					'<p>“A soulbound crystal is not an unbreakable prison. Use it too often and a more powerful soul might find means to escape, and I need not remind you that Kurndorf was very powerful.</p><p>' +
					(findPerson("Ghost").place == -64 ? 'You tell Jessica that you already found a more secure means to power the spell, alleviating her concerns somewhat.'
																: 'You promise Jessica to take her warning to heart. The thought of being able to transform other as you wish is appealing, but she is right when it comes to Kurndorf and the risk.') +
					'<p>“Wonderful.” Jessica\'s expression shifts back into a smile. “And I hope you have some time to stay with me. It has been far too long since I have been able to experience the pleasure a man\'s tool can give, and to receive such from a woman would surely be a delightful experience.”'
				);
				return true;
			}	
		
			if (sType == "jessicalay2") {
				this.extra[2] = nTime;
				showPopupWindow("Pleasuring Jessica",
					this.addPersonStringRorX(perYou.isMaleSex() ? "jessica-sex1m.jpg" : "jessica-sex1f.jpg", perYou.isMaleSex() ? "height:max%" : "60%", "right") +
					'Jessica is one of the very few women among your partners who are not under the effects of the Dai chu when you have sex with them.</p>' +
					'<p>There are no shortcuts to increase her arousal, no easy ways to make her cum with a simple thought or to send her mind into a sexual frenzy with a flick of your finger. You have to take it slow with her, get her ready with gentle touches and soft kisses starting at her tights and working your way upwards to her hip, belly, breasts and neck.',
					"dispPlace(Place,'type=jessicalay3')", '', true
				);				
				return true;
			}
			if (sType == "jessicalay3") {
				showPopupWindow("Pleasuring Jessica",
					this.addPersonStringRorX(perYou.isMaleSex() ? "jessica-sex2m.jpg" : "jessica-sex2f.jpg", perYou.isMaleSex() ? "height:max%" : "60%", "right") +
					'Of course, you have had ample opportunity to practice in the last weeks. Many of the women under your control were all to eager to teach you in more or less subtle ways, and if the way Jessica\'s body moves and twitches under your skilled touch is any indication, it\'s paying off.</p>' +
					'<p>Jessica visibly enjoys your attention. She\'s gasping and moaning, stretching herself out before you to offer herself to your touch, spreading her legs and encouraging you to take her in no subtle words until finally...',
					"dispPlace(Place,'type=jessicalay4')", '', true
				);				
				return true;
			}
			if (sType == "jessicalay4") {
				showPopupWindow("Pleasuring Jessica",
					this.addPersonStringRorX(perYou.isMaleSex() ? "jessica-sex3m.jpg" : "jessica-sex3f.jpg", perYou.isMaleSex() ? "height:max%" : "60%", "right") +
					(perYou.isMaleSex() ?
						'...you effortlessly push into her.</p>' +
						'<p>Jessica exhales a loud moan, her eyes widening in surprise at the sudden, harsh motion while her fingers dig into the pillow behind her and your hips begin to roll forward.</p>' +
						'<p>Jessica\'s legs wrap around your body, all to eager to feel you inside her and more than happy to let you take control of the act, to dictate how rough, fast and deep you want to take her.</p>' +
						'<p>It doesn\'t take long until you see the telltale signs of an impending climax on her, breath quickening, lips quivering... her eyes almost begging as she locks her gaze onto yours and you move to push her over the edge, making her climax only a blink before your own begins to build up, and you unload yourself into her tightness.'
					:	'...you push your folds against hers.</p>' +
						'<p>Jessica lets herself fall back with a long, drawn out moan as you begin to rub yourself against her clit, spreading her legs to offer herself to you and all too happy to let you choose how you want to take her, to allow you to dictate the pace and rhythm, to control how rough and gentle you want to be.</p>' +
						'<p>Lewd moans and gasps fill the room with every passing minute, and you soon see the telltale signs of an impending climax on her. Breath quickening, lips quivering... her eyes almost begging as she locks her gaze onto yours and you move to push her over the edge, making her climax only a blink before your own begins to build up, and you collapse on top of each other covered in sweat and gasping for air.</p>'
					)
				);				
				return true;
			}			
		}
		return false;
	};

	// events for Jessica
	per.showEvent = function()
	{
		var md;
		
		if (sType == "jessicatownhall" || (this.place == -1 && Place == 94 && !this.checkFlag(18))) {
			// Follower and passed Town Hall
			setQueryParams("type=jessicatownhall");
			this.setFlag(18);
			md = WritePlaceHeader();
			findPerson("Glenvale").showPerson(isDay() ? "townspeople-couple1.jpg" : "townspeople-couple2.jpg");
			addPlaceTitle(md, "Jessica at the Town Hall");
			if (isDay()) md.write('<p>“It does the soul well to see the sun again, and yet...”</p>');
			else md.write('<p>“All those lights... I can feel no magical energy in them, and yet they make the night as bright as day...”</p>');
			md.write(
				'<p>Jessica\'s attention constantly shifts from one thing to another as you walk down the street, clearly fascinated by what she’s seeing.</p>' +
				'<p>“The Town has changed so much during my imprisonment. The air smells different, vehicles now move by themselves, and I seriously had thought your servant was doing a jest when she said that revealing garments and public displays of affection are no longer a taboo.”</p>' +
				'<p>Her eyes linger a little too long on a young pair of women kissing across the street, and you could have sworn you saw a blush beginning to creep into her usually stoic features.</p>'
			);
			startQuestions();
			if (!this.checkFlag(19)) {
				addQuestionR(md, 'ask Jessica if she is into women',
					'“Jessica hesitates for a moment, carefully considering her answer. “It is a “deviancy” of mine that I have long come to accept and even embrace.”</p>' +
					'<p>“I very much do enjoy the company of men as well, so it was easy to keep that secret, but there is something very pleasureful about laying with another woman, and the more confident I had become with my increasing abilities, the more I begun to question those preaching to me that my feelings are somehow “wrong”.”</p>' +
					(perYou.isMaleSex() ? '<p>“I would normally not share such information about myself, my Lord, but from the looks of it, affection between two women, or two men, is indeed no longer seen as sinful.”</p>' :
												 '<p>“And from the way I saw you interact with your servant at the hotel, I do believe our attraction to the fair sex is something we have in common, my Lady” Jessica smiles briefly.'),
					"Jessica",
					"setPersonFlag(\\'Jessica\\',19)",
					'type=jessicatownhall', false
				);
			}			
			if (!this.checkFlag(20)) {
				addQuestionR(md, 'ask her if she might miss living in her time-period',
					'“' + perYou.getLord() + ', in my time many people believed a woman bleeds once a month because her innate wickedness is overflowing from her body.” She answers matter of factly.</p>' +
					'<p>“A man would work himself to exhaustion and death on someone else\'s field to meet the tax demands of a noble who rules by decree of their supposedly superior blood and not their ability or power and the peasants were sacrificed in petty squabbles for influence and “honor”.” She shakes her head.</p>' +
					'<p>“I do not yet know much about your time, but I know that this...” She points to a “Vote ' + findPerson("Mayor").getPersonNameShort() + ' Thomas for Mayor” election poster. “Would have been unthinkable in it.”</p>' +
					'<p>“Is she by the way under your control, ' + perYou.getLord() + '? You will need influential people like her on your side, after all.”</p>' +
					'<p>Jessica seems to make a mental note as you give her your answer, and you get the feeling that she is quite interested in the Mayor.',
					"Jessica",
					"setPersonFlag(\\'Jessica\\',20)",
					'type=jessicatownhall', false
				);
			}
			addLinkToPlace(md, 'continue on', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (Place == 345 && this.place == 345) {
			if (sType === "") {
				// Meeting Esmeralda (initial meeting)
				this.charmedTime = nTime;
				md = WritePlaceHeader();
				findPerson("Gypsy").showPerson("gypsy1.jpg");
				addPlaceTitle(md, "Meeting Esmeralda");
				md.write(
					'<p>Esmeralda greets you the moment you enter her store, her eyes immediately moving to Jessica, curiously looking her over, then smiling.</p>' +
					'<p>“Welcome again, ' + perYou.getPersonName() + '. I see you are not alone this time, would you like to introduce us?”</p>'
				);
				startQuestions();
				if (!this.checkFlag(23)) {
					addQuestionR(md, 'tell her that Jessica is a visitor from another Town',
						'“No, she is not.” Esmeralda says flatly. “She is important, to me, to you, to the Town, I know that much, so please, let us not play games.”',
						"Esmeralda",
						"setPersonFlag(\\'Jessica\\',23)"
					);
				}
				addLinkToPlace(md, 'tell her that Jessica is her ancestor', Place, 'type=meetesmeralda2a');
				addLinkToPlace(md, 'let Jessica Introduce herself', Place, 'type=meetesmeralda2b');
				AddPeopleColumn(md);
				this.showPerson('jessicabg.png');
				WritePlaceFooter(md);
				return true;				
			}
			if (sType.indexOf("meetesmeralda2") != -1) {
				// Meeting Esmeralda (initial meeting)
				md = WritePlaceHeader();
				findPerson("Gypsy").showPerson("gypsy1.jpg");
				addPlaceTitle(md, "Talking to Esmeralda and Jessica");
				if (sType == "meetesmeralda2a") {
					this.setFlag(23);
					md.write(
						'<p>Esmeralda remains silent as you say that, carefully scrutinizing a visibly tense Jessica before giving you a simple nod.</p>' +
						'<p>“Yes, it is indeed her.”</p>' +
						'<p>Esmeralda rises to her feet and bows deeply towards the witch.</p>' +
						'<p>“I have long awaited the day we would meet, and I welcome you into my home as a guest, Lady Jessica.” She turns to you</p>' +
						'<p>“And you as well, ' + perYou.getPersonName() + '. You, too, are welcome to my home, as a token of my gratitude for your part in freeing her.”</p>'
					);
				} else if (sType == "meetesmeralda2b") {
					this.setFlag(23);
					md.write(
						'<p>“Lady Esmeralda.” Jessica inclines her head politely. “My name is Jessica, and I am...” Jessica hesitates for just long enough to compel Esmeralda to finish the sentence for her.</p>' +
						'<p>“The legendary witch of Glenvale, slayer of the Warlock Kurndorf... and my ancestor.”</p>' +
						'<p>Esmeralda smiles widely as she rises to her feet and bows deeply towards the visibly stunned Jessica.</p>' +
						'<p>“I have long awaited the day we would meet, and I welcome you into my home as a guest, Lady Jessica.” She turns to you.</p>' +
						'<p>“And you as well, ' + perYou.getPersonName() + '. You, too, are welcome to my home, as a token of my gratitude for your part in freeing her.”</p>'
					);
				} else if (sType == "meetesmeralda2c") {
					this.setFlag(24);
					md.write(
						'<p>Esmeralda smiles.</p>' +
						'<p>“You do not still doubt my abilities, do you, ' + perYou.getPersonName() + '?”</p>' +
						'<p>“Granted, this was only one of many possible outcomes, but it is the one that will be best for all of us, including you, I assure you.”</p>'
					);
				} else if (sType == "meetesmeralda2d") {
					this.setFlag(25);
					md.write(
						'<p>“It is my pleasure, ' + perYou.getPersonName() + '.”</p>' +
						'<p>“You are free to visit the areas of my home beyond the store, and the wards will let you pass through at night until I feel the need to revoke those privileges.”</p>' +
						'<p>“I do warn you, though. Do not take anything from my home, or my store without my explicit permission. You have garnered a lot of goodwill, but I do not take kindly to thieves.”</p>'
					);
				} else if (sType == "meetesmeralda2e") {
					if (getQueryParam("ask") == "esmeralda") {
						md.write(
							'<p>“One of the men who had “joined” Kurndorf\'s cult reportedly became obsessed with this woman after the Warlock\'s death. He painted several pictures of her in the following months, but the church had most of them destroyed due to their obscene nature.”</p>' +
							'<p>“This was one of the few that survived. My mother bought it several years back, feeling a connection to it, and it has been in my family ever since.”</p>'
						);						
					} else if (getQueryParam("ask") == "jessica") {
						md.write(
							'<p>“There is no doubt that this is me, and I do remember the girl as a minor witch and lover of mine.” Jessica muses. “But I have never posed naked for a painting, let alone with another woman...” Her eyes are locked on the picture in Esmeralda\'s hands in morbid fascination.</p>' +
							'<p?“Knowing that several pictures like these were made after my... disappearance... It is a bit unsettling. But I do admit that the artistic craftsmanship is exceptional, and it is not an unpleasant memory to recall.</p>'
						);						
					} else {
						this.setFlag(26);
						md.write(
							'<p>“I -am- a true psychic, ' + perYou.getPersonName() + '.” Esmeralda speaks with gravitas in her voice. “The mysteries of the past present and future routinely unfurl before me.”</p>' +
							'<p>“Oh, and I also have this.”</p>' +
							'<p>“Esmeralda steps into an obscured area of the store and returns with on old oil-painting, carefully preserved and very clearly showing Jessica, completely naked with another woman.</p>'
						);
					}
				} else if (sType == "meetesmeralda2f") {
					md.write(
						'<p>“I thank you for your hospitality, Lady Esmeralda.” Jessica inclines her head. “I did not have much hope to actually find a descended of mine, much less someone aware of the arcane, and it is truly a pleasure to meet you.”</p>' +
						'<p>“The pleasure is all mine. Our family has always felt a connection to Glenvale, and even those who left would always return to where our roots lie.”</p>' +
						'<p>“Our family...” This seems to have hit a nerve with Jessica. “How much can you tell me about my descendants? About my daughter?”</p>' +
						'<p>“Enough to fill at least the rest of the day.” Esmeralda finally turns to you again.</p>' +
						'<p>“I do not want to appear impolite after all you have done, but I would like to speak to Lady Jessica in private, if you do not mind.”</p>' +
						'<p>“Yes, please.” Jessica nods. “There are many personal questions I had never thought I would find answers for, and I promise will contact you tomorrow, ' + perYou.getLord() + '.”</p>'
					);
				}

				startQuestions();
				if (sType == "meetesmeralda2e") {
					var ask = getQueryParam("ask");
					if (ask != "esmeralda") addLinkToPlace(md, 'ask Esmeralda about the picture', Place, ask == "" ? 'type=meetesmeralda2e&ask=esmeralda' : 'type=meetesmeralda2');				
					if (ask != "jessica") addLinkToPlace(md, 'ask Jessica about the picture', Place, ask == "" ? 'type=meetesmeralda2e&ask=jessica' : 'type=meetesmeralda2');
				} else if (sType == "meetesmeralda2f") addLinkToPlace(md, 'take your leave', 344, '', 'You say your goodbyes to the two women and leave them alone to get acquainted.</p><p>You don\'t think you have ever seen Jessica smile like this in the short time since you know her and you are confident that you did win a powerful ally by setting her free... as long as your goals don\'t stray too far from her own, that is.');
				else {
					if (!this.checkFlag(24)) addLinkToPlace(md, '"Did she really foresee Jessica\'s return?"', Place, 'type=meetesmeralda2c');
					if (!this.checkFlag(25)) addLinkToPlace(md, 'thank Esmeralda for the invitation', Place, 'type=meetesmeralda2d');
					if (!this.checkFlag(26)) addLinkToPlace(md, '"How did she recognize Jessica?"', Place, 'type=meetesmeralda2e');
					if (this.checkFlag(24) && this.checkFlag(25) && this.checkFlag(26)) addLinkToPlace(md, 'let Jessica speak to her', Place, 'type=meetesmeralda2f', '', '', "setPersonFlag('Jessica',27)");
				}
				AddPeopleColumn(md);
				this.showPerson('jessicabg.png');
				WritePlaceFooter(md);
				return true;				
			}			
			
		}
		
		if (Place == 348) {
			if (sType.indexOf("talkjessica") != -1) {
				// Talking with Jessica
				md = WritePlaceHeader();
				this.showPerson("jessica-home2.jpg");
				addPlaceTitle(md, "Talking to Jessica");
				if (sType == "talkjessica1") {
					this.setFlag(29);
					md.write(
						'<p>“It goes better than I had expected, but it is still a “culture shock”, as they apparently call it, ' + perYou.getLord() + '.”</p>' +
						'<p>“The world has changed in ways I would have never been able to predict in the last 400 years. People casually communicate over long distances, carts move by themselves, people fly in... metal tubes with wings around the world.” She exhales a calming breather.</p>' +
						'<p>“-Around- the world... ' + perYou.getPersonName() + ', The world is actually a sphere! Circling around the sun! In a supposedly infinite void where every star we see is actually another sphere that may or may not be like ours, shattering our existing notion that we are the center of creation and...”</p>' +
						'<p>Jessica gets increasingly agitated as she talks, but stops upon realizing it and quickly composes herself.</p>' +
						'<p>“There is a lot to take in, ' + perYou.getLord() + '. Esmeralda has given me a... she called it a “crash course” on the present, but I will need some time to get accustomed to the... nuances of modern society.”</p>' +
						'<p>“I intent to not let it get in my or your way. There is also opportunity for the likes of us in this new world.”</p>'
					);
				} else if (sType == "talkjessica1a") {
					md.write(
						'<p>“Yes, Magic has been but forgotten by all except a few people.”</p>' +
						'<p>“Where in my time, the common-folk were quick to call out others as witches and warlocks, they now rationalize its existence away, treating it as superstition.”</p>' +
						'<p>“Though it is not like many of those they actually “caught” in my time were truly magically gifted.” She adds with no small amount of bile.</p>' +
						'<p>“It will be easier than ever to forge a place that is safe for our kind, and I had meant it when I said that you will be the true ' + perYou.getMaster() + ' of this town.”</p>'
					);
				} else if (sType == "talkjessica1b") {
					md.write(
						'<p>Jessica scoffs.</p>' +
						'<p>“Kurndorf was much more than a power hungry warlock, out to carve himself a small kingdom in a remote small town.”</p>' +
						'<p>“You have seen how casually he associates with Demons, or how careless he was in his excesses. He did not care about the church or government sending troops to Glenvale because he was certain that he or maybe even his demonic “Allies” would deal with them once he had brought them into this world.”</p>' +
						'<p>Her expression goes grim.</p>' +
						'<p>“The consequences of his hunger for power would have been disastrous, not only for Glenvale, but the entire world.”</p>'
					);
				} else if (sType == "talkjessica1c") {
					md.write(
						'<p>“Because you, ' + perYou.getLord() + ', are special.” Jessica smiles.</p>' +
						'<p>“You surely have noticed it? How people are drawn to you even without being affected by your magic? How quickly they are willing to help and assist you?”</p>' +
						'<p>“You have a great destiny ahead of you, ' + perYou.getPersonName() + '. What it will be, I can not tell, but even those not attuned to the supernatural world can feel it on a subconscious level and react accordingly.”</p>'
					);
				} else if (sType == "talkjessica1d") {
					md.write(
						'<p>“Hopefully that of an ally, maybe a teacher, if you so wish, or at the least a “companion”.” She speaks the last word in a rather suggestive tone.</p>' +
						'<p>“Not even Esmeralda is able to truly foresee where your destiny will take you, but you have already overcome several trials and defeated enemies far more powerful than you are, and I will be more than a little interested to see where your path shall take you, ' + perYou.getLord() + '.”</p>'
					);
				} else if (sType == "talkjessica") {
					md.write(
						'<p>“Hopefully that of an ally, maybe a teacher, if you so wish, or at the least a “companion”.” She speaks the last word in a rather suggestive tone.</p>' +
						'<p>“Not even Esmeralda is able to truly foresee where your destiny will take you, but you have already overcome several trials and defeated enemies far more powerful than you are, and I will be more than a little interested to see where your path shall take you, ' + perYou.getLord() + '.”</p>'
					);
				}

				startQuestions();
				if (sType == "talkjessica1") addLinkToPlaceC(md, '“Opportunity?”', Place,'type=talkjessica1a');				
				else if (sType == "talkjessica1a") addLinkToPlace(md, '"Come to think of it, didn\'t she kill Kurndorf for taking over the Town?"', Place,'type=talkjessica1b');
				else if (sType == "talkjessica1b") addLinkToPlace(md, '"Why me?"', Place,'type=talkjessica1c');
				else if (sType == "talkjessica1c") addLinkToPlace(md, '"What is her role in all of this going to be?"', Place,'type=talkjessica1d');
				else {
					var bDone;
					if (!this.checkFlag(30)) {
						bDone = this.checkFlag(31) && this.checkFlag(32);
						addQuestionR(md, 'what could she offer as an Ally?',
							'“The demon has drained some of my strength, but it will return over time, and then be at your disposal, and even without it, I am still able to offer you my knowledge.”',
							"Jessica",
							"setPersonFlag(\\'Jessica\\',30)",
							bDone ? '' : 'type=talkjessica', !bDone
						);
					}
					if (!this.checkFlag(31)) {
						bDone = this.checkFlag(30) && this.checkFlag(32);
						addQuestionR(md, 'what could she offer as an Teacher?',
							'“Every ' + perYou.getWitch() + ' with minor talent is able to learn basic evocations, and the more talented, like you, are even able to perform strong ones without much training.” Jessica explains.</p>' +
							'<p>“But to perform the most powerful of incantations, to bend the perceived laws of nature to your will, you need to have a clear understanding of the very nature of magic.”</p><p>' +
							(isCharmedPath() ? '“I know you have a teacher, but do you think he truly wants for you to reach your full potential?' :
								(isConspiracyPath() ? 'I know you have a partner, but she is hardly more than an apprentice herself.' :
								 							 'I know you don\'t have a formal teacher, but you will need to learn, if you wish to face the challenges ahead.')) +
							'</p><p>“It will take time to unlock your potential, years, most likely, but I am not afraid of grooming your power, ' + perYou.getLord() + ', like others might be. In fact, I wish to see you reach your highest potential, to make this town your domain and keep those within safe from those that might threaten them.”',
							"Jessica",
							"setPersonFlag(\\'Jessica\\',31)",
							bDone ? '' : 'type=talkjessica', !bDone
						);
					}
					if (!this.checkFlag(32)) {
						bDone = this.checkFlag(30) && this.checkFlag(31);
						addQuestionR(md, 'what could she offer as a Companion?',
							'Jessica smiles.</p>' +
							'<p>“I will not beat about the bush, ' + perYou.getLord() + '. I have spent 400 years in solitude, only kept company by dreams and visions from the outside.”</p>' +
							'<p>“I wish to lay with someone, to experience physical contact again, and who better to share such intimacy with, than the valiant youth who has freed this fair maiden from her otherworldly prison?”</p>' +
							'<p>Jessica Chuckles.</p>' +
							'<p>“It would be like the ending to many fairy tales, the true ending the puritans prefer to have removed, that is. Just with the rescued damsel also being the wicket witch.”',
							"Jessica",
							"setPersonFlag(\\'Jessica\\',32)",
							bDone ? '' : 'type=talkjessica', !bDone
						);
					}					
				}
				WritePlaceFooter(md);
				return true;				
			}
			
			if (sType == "jessicatraining") {
				// Training
				WaitHereOnly(12);
				md = WritePlaceHeader();
				this.showPerson("jessica-home4.jpg");
				addPlaceTitle(md, "Training with Jessica");
				md.write(
					'<p>Jessica is keeping her promise to train you, and you spend about an hour taking in her lessons.</p>' +
					'<p>Jessica has means to spice things up a little, her being mostly naked helps a lot to keep your attention, but as a whole the training is... kind of dull. It is mostly magical theory, breathing techniques to improve your focus and learning about the fundamentals of Magic that will, so she claims, help you master it and even develop your own spells in the future.</p>' +
					'<p>You hadn\'t expected something that you have picked up so easily to end up being so complicated to master. It\'s like having an entire new subject at school with homework, extra study time and everything else, but unlike many things you\'ve learned at school, what Jessica teaches you may actually be useful in the future.</p>'
				);
				startQuestions();
				if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Jessica for help deciphering the passages in the book', 'spendExperience()');
				addLinkToPlace(md, 'talk of other things with Jessica', Place);
				WritePlaceFooter(md);
				return true;				
			}
			
			if (sType == "jessicahistory") {
				// History lesson
				md = WritePlaceHeader();
				this.showPerson("jessica-home3.jpg");
				addPlaceTitle(md, "History LEssons with Jessica");
				md.write(
					'<p>“This will take a while, so why do we not get comfortable?”</p>' +
					'<p>Jessica sits down on her bed and offers you to take a seat as well.</p>' +
					'<p>“What do you wish to know about?”</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'what is the Hellgate?', Place, 'type=jessicahistoryhellgate');
				if (this.checkFlag(33)) {
					addLinkToPlace(md, 'what is the Veil between worlds?', Place, 'type=jessicahistoryveil');
					addLinkToPlace(md, 'how was the gate sealed?', Place, 'type=jessicahistorysealed');
				}
				if (this.checkFlag(34)) addLinkToPlace(md, 'how did Kurndorf rise to power.', Place, 'type=jessicahistorypower');
				if (this.checkFlag(35)) addLinkToPlace(md, 'what happened after Kurndorf\'s death?', Place, 'type=jessicahistoryhappenedafter');
				addLinkToPlace(md, 'enough lessons for now', Place);
				WritePlaceFooter(md);
				return true;				
			}	
			if (sType == "jessicahistoryhellgate") {
				// History Lesson: Hellgate
				WaitHereOnly(12);
				this.setFlag(33);
				md = WritePlaceHeader();
				this.showPerson("jessica-home3.jpg");
				addPlaceTitle(md, "History Lessons with Jessica");
				md.write(
					'<p>For a second, there is a strange change in Jessica\'s expression when you say the word, it\'s gone rather quickly, though.</p>' +
					'<p>“We have to go far back.” She begins. “Even before my time. I may not be able to relay the circumstances surrounding the Gate\'s opening first-hand, but have spoken to people who could.</p>'
				);
				this.showPersonAnon("history1.jpg", "40%", "right");
				md.write('<p>“Glenvale was founded by British settlers on soil formerly claimed by the ' + (isBritish() ? 'Scots' : 'Spanish') + ' and often had to suffer raids and border skirmishes.</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history2.jpg", "40%", "right");
				md.write('<p>The ' + (isBritish() ? 'Scots' : 'Spanish') + ', however, were not their only hardship. Rumors of perverse rituals at nighttime rose steadily, Settlers vanished, animals were found dead in the morning, people would speak of nightmares and visions, of a sense of danger.</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history3.jpg", "40%", "right");
				md.write(
					'<p>History books simply speak of a Satanic cult stealing supplies and occasionally kidnapping people, but the truth was much more sinister, for you see, the veil between worlds is thin in this area.</p>' +
					'<p>Messages, artifacts and even creatures may pass over from other worlds. Most of them harmless, some dangerous, and some even promising gifts and power to those willing to assist them.</p>' +
					'<p>Lured by the promise of power and protection from the crown, the ' + (isBritish() ? 'Scots' : 'Spanish') + ' and the church, A coven of witches had gathered, intent to help one of the more powerful creatures gain entry into our world.<p style="clear:both"><br></p>'
				);
				this.showPersonAnon("history4.jpg", "40%", "right");
				md.write('<p>All they needed was a fitting sacrifice, a “vessel” strong enough to house the creature, yet still innocent and unsullied, and when they finally found someone who had fit that profile, they Kidnapped her.</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history5.jpg", "30%", "right");
				md.write('<p>Violated her in any way possible...</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history6.jpg", "30%", "right");
				md.write('<p>And finally offered the desecrated body to the demon.</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history7.jpg", "40%", "right");
				md.write(
					'<p>The ritual worked, however, the demon had no intention to be controlled by a group of mortals, no matter how powerful they believed themselves to be.</p>' +
					'<p>It wasted no time asserting control over the coven, stealing the souls of the lesser members...<p style="clear:both"><br></p>'
				);
				this.showPersonAnon("history8.jpg", "30%", "right");
				md.write('<p>...and Dominating the minds of those it believed to be useful for its plans.</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history9.jpg", "40%", "right");
				md.write('<p>For you see, in their folly, not only did those witches summon a beast they were unable to control, they also had opened a small path to its home plane. A crack, so you will. Too small for others of its kind to follow through, but easily opened further, if you put enough pressure on it.</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history10.jpg", "40%", "right");
				md.write('<p>In the coming years, the demon kept a low profile working through its agents and slowly corrupting the Town from the inside. Glenvale prospered, outwardly at least. The Spanish/Scots were driven away, the crops more plentiful than ever, and more and more settlers arrived as word spread of the settlement\'s success.</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history11.jpg", "30%", "right");
				md.write('<p>On the inside, however, the Town was a twisted place of debauchery, death and defilement, and many of the new arrivals found themselves at the demon\'s mercy to be turned into thralls...</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history12.jpg", "30%", "right");
				md.write('<p>...servants...</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history13.jpg", "40%", "right");
				md.write('<p>...or toys for its amusement.</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history14.jpg", "40%", "right");
				md.write('<p>Finally, with enough souls gathered and corrupted, the demon performed a last, powerful ritual, one that would sacrifice the lives of the entire populace and break the existing crack wide open to create a gateway to it\'s home plane that would later be known as the hellgate.</p><p style="clear:both"><br></p>');
				startQuestions();
				addLinkToPlace(md, 'continue with the lessons', Place, 'type=jessicahistory');
				WritePlaceFooter(md);
				return true;				
			}			
			if (sType == "jessicahistoryveil") {
				// History Lesson: Veil
				WaitHereOnly(12);
				md = WritePlaceHeader();
				this.showPerson("jessica-home3.jpg");
				addPlaceTitle(md, "History Lessons with Jessica");
				this.showPersonAnon("history15.jpg", "40%", "right");
				md.write(
					'<p>“The Veil between worlds is the natural barrier between our world and the spirit world, a realm vastly different to what we perceive as reality.</p>' +
					'<p>We have little information about what lies beyond it. Some say our souls pass on into the spirit world after we die, and that Heaven, Hell, Tartarus, Valhalla and all other afterlives lie within their own pockets of it, others theorize that it is a place entirely alien to ours where the monsters and fey creatures of yore reside, and others yet claim that our realms exist at the same time and space, and that we are just unaware of each other\'s presence.</p><p style="clear:both"><br></p>'
				);
				this.showPersonAnon("history16.jpg", "40%", "right");
				md.write(
					'<p>The density of the veil changes throughout the year, and is usually the thinnest on Samhain, or all hallow\'s eve, as it is called now. Glenvale, however, is one of the few areas where the spirit world and mortal world are close, so the veil is naturally thin, and the effects are manifold.</p>' +
					'<p>Spirits may be visible and in some cases even affect reality around them. People sometimes see visions of past lives and distant places in their dreams and it is easier to tab into magical energies, leaving some to speculate that they originate from the spirit world to begin with.</p><p style="clear:both"><br></p>'
				);
				this.showPersonAnon("history17.jpg", "40%", "right");
				md.write(
					'<p>Creatures may pass over into our realm, but it usually requires an “anchor” to hold them here and someone on our side actively working to grant them access, especially for stronger entities.</p>' +
					'<p>However, the opening of the “hellgate”, something only possible in areas like Glenvale, has further eroded that barrier, so at a place that is naturally close to the spirit world like the sacred clearing and during nighttime where the veil is thinner than usual, “things” might stumble into our world, and many of them will be dangerous.</p>' +
					'<p>Keep that in mind when you travel at night.</p><p style="clear:both"><br></p>'
				);
				startQuestions();
				addLinkToPlace(md, 'continue with the lessons', Place, 'type=jessicahistory');
				WritePlaceFooter(md);
				return true;				
			}						
			if (sType == "jessicahistorysealed") {
				// History Lesson: Sealing the Gate
				WaitHereOnly(12);
				this.setFlag(34);
				md = WritePlaceHeader();
				this.showPerson("jessica-home3.jpg");
				addPlaceTitle(md, "History Lessons with Jessica");
				md.write(
					'<p>For a second, there is a strange change in Jessica\'s expression when you say the word, it\'s gone rather quickly, though.</p>' +
					'<p>“We have to go far back.” She begins. “Even before my time. I may not be able to relay the circumstances surrounding the Gate\'s opening first-hand, but have spoken to people who could.</p>'
				);
				this.showPersonAnon("history18.jpg", "40%", "right");
				md.write('<p>Lucky for humanity, an event of this magnitude cause what I can best describe as “ripples” within the magical fabric of the world. After the Gate had been opened it was no longer possible to hide the corruption seeping into the land, and humanity was not as defenseless as the Demon had thought.</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history19.jpg", "40%", "right");
				md.write('<p>A family clan of mystics had found out about the gate, and upon realizing what had happened they gathered what allies they could muster in a short time and assaulted the Town.</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history20.jpg", "30%", "right");
				md.write('<p>They did not have much time to prepare, and while they fought valiantly against the demon and the creatures it brought forth against them...</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history21.jpg", "30%", "right");
				md.write('<p>..many still fell, lost their souls, or were even made to turn against their brothers and sisters.</p><p style="clear:both"><br></p>');
				AddImage("Items/artifact2.jpg", "20%", "right");
				md.write('<p>The remaining mystics, however, managed to get close enough to the creature to execute their plan. They had prepared an artifact, hastily created before the battle and heavily enchanted to hold the demon within. They did not manage to trap the creature itself, but they did take most of its essence and power, forcing it to flee back into its own world.</p><p style="clear:both"><br></p>');
				this.showPersonAnon("history22.jpg", "40%", "right");
				md.write(
					'<p>After their victory, they created a seal around the Hellgate to keep other things from breaking into our world and began the long process of purifying the surrounding land.</p>' +
					'<p>The seal itself would over time be fortified and a structure erected around it that would also serve as their headquarters called the Sanctuary Arms. Glenvale recovered as new settlers joined the Mystics. And while the strange disappearance of the entire populace would become one of the Town\'s great mysteries, the truth of what really happened to them was never shared with any but a select few.</p><p style="clear:both"><br></p>'
				);
				startQuestions();
				addLinkToPlace(md, 'continue with the lessons', Place, 'type=jessicahistory');
				WritePlaceFooter(md);
				return true;				
			}	
			if (sType == "jessicahistorypower") {
				// History Lesson: Rise to Power
				WaitHereOnly(12);
				this.setFlag(35);
				md = WritePlaceHeader();
				this.showPerson("jessica-home3.jpg");
				addPlaceTitle(md, "History Lessons with Jessica");
				md.write(
					'<p>“This is the time period I am personally familiar with, as I, too, arrived in Glenvale during that time.” Jessica begins.</p>'
				);
				this.showPerson("history23.jpg", "40%", "right");
				md.write(
					'<p>“After the sealing ritual, It would be 32 years before new Settlers would learn of the abandoned town and the population slowly began to recover.”</p>' +
					'<p>“Glenvale became a novelty during this time. A place were the magically gifted would congregate and work behind the scenes without fear of prosecution, simply because their power was needed.”</p><p style="clear:both"><br></p>'
				);
				this.showPerson("history24.jpg", "40%", "right");
				md.write(
					'<p>“The seals holding the gate close needed to be renewed occasionally, pockets of the demon\'s corruption still remained and had to be purified, and strange artifacts from his reign, like the dragon Gem, were frequently discovered in abandoned buildings and needed to be taken care off.”</p>' +
					'<p>“It was... turbulent, but overall not a bad life. Good enough to settle down, have a child...” Jessica looks thoughtfully into the distance for a moment.</p><p style="clear:both"><br></p>'
				);
				this.showPerson("history25.jpg", "30%", "right");
				md.write(
					'<p>“Anyway, one of these artifacts happened to be the book of control, unearthed by an Old Mystic named Volker Kurndorf.”</p>' +
					'<p>“The rule was for all these Books to be collected and sealed away or even destroyed, but for whatever reason, he did not, deciding to hide it instead to be found after his death by his son, Carl.”</p><p style="clear:both"><br></p>'
				);
				this.showPerson("history26.jpg", "40%", "right");
				md.write('<p>“Carl Kurndorf studied the Book\'s secrets, in particular, of course, the Dai Chu, and it didn\'t take long for him to do the first, careful tests on the local populace.”</p><p style="clear:both"><br></p>');
				this.showPerson("history27.jpg", "30%", "right");
				md.write('<p>“To great effect, as you might imagine.”</p><p style="clear:both"><br></p>');
				this.showPerson("history28.jpg", "30%", "right");
				md.write('<p>“Over the next years, he would slowly build up his power behind the scenes. Collecting Mana, charming people in key positions and forging alliances with Noblemen like the Halliwell family. All under the noses of the Mystics as they were preparing a final ritual that would close the Hellgate for good.”</p><p style="clear:both"><br></p>');
				this.showPerson("history29.jpg", "40%", "right");
				md.write(
					'<p>“On the night of the ritual, the Warlock attacked.” Jessica looks grim as she recounts the last part.</p>' +
					'<p>“It was a massacre. Only a handful of the original family escaped his coup, and although Kurndorf was immediately arrested by the city guard in the followup, he had of course arranged for Magistrate Metin to let him go free due to a “lack of evidence”.”</p><p style="clear:both"><br></p>'
				);
				this.showPerson("history30.jpg", "40%", "right");
				md.write('<p>“Without anyone left to oppose him, and most of the populace being at best vaguely aware of what was actually happening behind Glenvale\'s scenes, it was easy for him to fully take over the Town. Judges, constables, Nobles and government officials were easily charmed and the “Cult of Kurndorf”, outwardly just a hedonistic sect with a charismatic leader, ruled the city from the shadows.”</p><p style="clear:both"><br></p>');
				this.showPerson("history37.jpg", "30%", "right");
				md.write('<p>“In the following months, Kurndorf would study the Gate in an attempt to harness its power for himself, claiming that it was the key for those magically gifted to not only truly be free from prosecution, but take their place as rightful rulers of the common-folk.”</p><p style="clear:both"><br></p>');
				this.showPerson("history31.jpg", "30%", "right");
				md.write('<p>“It was a message that resonated with many of the Towns witches and warlocks, and those who did not share his believes either fled or were made to come around to his way of thinking.”</p><p style="clear:both"><br></p>');
				this.showPerson("history32.jpg", "40%", "right");
				md.write(
					'<p>“Kurndorf himself, however, changed during that time. No longer satisfied wielding his power in secret, he slowly began to openly exercise it. He would hold massive Orgies and had women kidnapped from their homes and brought before him to be charmed.</p>' +
					'<p>“Fear of him and the Cult began to spread through the populace, and while his slaves managed to intercept most messages to the church and district officials, it was only a matter of time until they would be aware of the events transpiring within Glenvale.”</p>' +
					'<p>“Not that he was bothered by it. In fact, he was very confident that he would have the means to overcome any challenge to his rule... in retrospect I believe he had already found an “ally” in Legion or another demon at this point, and prepared to open the Gate once more to let them in.”</p>' +
					'<p>“Because of this, I could no longer remain quiet. Had he been allowed to continue, either the Church would bring the inquisition to Glenvale, or the demonic forces the madman had allied himself with would enslave us. So, during one of his orgies, I did posses a guardsman and shot the warlock with the man\'s gun, ending his reign, but also dooming myself as he used his final breath to cast the curse that would bind me to my magical prison...”</p><p style="clear:both"><br></p>'
				);
				this.showPerson("history33.jpg", "40%", "right");

				startQuestions();
				addLinkToPlace(md, 'continue with the lessons', Place, 'type=jessicahistory');
				WritePlaceFooter(md);
				return true;				
			}	
			if (sType == "jessicahistoryhappenedafter") {
				// History Lesson: What Happened After
				WaitHereOnly(12);
				md = WritePlaceHeader();
				this.showPerson("jessica-home3.jpg");
				addPlaceTitle(md, "History Lessons with Jessica");
				md.write(
					'<p>“I am sorry but, I do not know much. I have sometimes received visions of things that may have been or may be, like a premonition of your arrival, but aside from those I was entirely isolated from the outside world.”</p>'
				);
				this.showPersonAnon("history34.jpg", "40%", "right");
				md.write('<p>“I know the Cult fell into chaos as Kurndorf\'s death freed his slaves from his spell, with many of them being admitted into the district asylum. Some of them fled to other towns, as did those capable of wielding magic when the Church arrived and witch hunts became commonplace.”</p><p style="clear:both"><br></p>');

				AddImage("church1.jpg", "40%", "right");
				md.write('<p>“The Inquisition has build the “Lady of our Heavenly Father” to keep watch over the town. I do not know how much the current generation of Nuns know about their past duties, though.”</p><p style="clear:both"><br></p>');

				this.showPersonAnon("history35.jpg", "40%", "right");
				md.write('<p>“Esmeralda told me that the remaining Mystics were forced to hand over the artifact containing the Demon\'s essence to the church and go into hiding, as they now lacked the strength to protect it. However, they remained in Glenvale, integrating into the populace and continuing to fight the outliers of Kurndorf\'s Cult, and as it turned out now, the machinations of his Ghost.”</p><p style="clear:both"><br></p>');
				
				this.showPersonAnon("history36.jpg", "40%", "right");
				md.write('<p>“They have taken the family name “Gates” as a reminder of their duty to safeguard the Hellgate. A name I believe you are quite familiar with. And though their strength has diminished further over time, they have been Glenvales shadowy protectors for decades, until now, that is.”</p><p style="clear:both"><br></p>');
				startQuestions();
				addLinkToPlace(md, 'continue with the lessons', Place, 'type=jessicahistory');
				WritePlaceFooter(md);
				return true;				
			}	
			
			if (sType == "jessicalay") {
				// Sex
				md = WritePlaceHeader();
				this.showPerson("jessica-home5.jpg");
				addPlaceTitle(md, "Laying Jessica");

				if (this.hoursSince(this.extra[2]) < 4) {
					md.write(
						'<p>You would love to do it again right away, but while Jessica doesn\'t look particularly avert to the idea, she gently declines your request.</p>' +
						'<p>“As much as I would like to, I will require some time to recuperate, ' + perYou.getLord() + ', and there other things that need to be taken care off as well.”</p>' +
						'<p>It\'s kind of disappointing, but well, Jessica is not under the effect of the dai chu. You can\'t expect her to be ready for you 24/7.</p>'
					);	
				} else {
					md.write(
						'<p>“I was hoping that you would like to join me, ' + perYou.getLord() + '.” Jessica begins taking off her underwear with an inviting smile. “Let us enjoy the pleasures of the flesh together.”</p>'
					);						
				}
				startQuestions();
				if (this.hoursSince(this.extra[2]) < 4) addLinkToPlace(md, 'talk of other things with Jessica', Place);
				else addLinkToPlace(md, 'pleasure Jessica', Place, 'type=jessicalay2');
				WritePlaceFooter(md);
				return true;	
			}
		}
		
		if (Place != 161) return false;
		
		var perBambi, be;
		
		if (sType == "checkjessica") {
			var iWitch = this.getRivalry();
			md = WritePlaceHeader();
			if (iWitch == -1) this.showPerson("jessica-bound1.jpg", "100%", "", "", "Witch Prisoner");
			else if (iWitch == -2) {
				switch(Math.floor(getHour() / 6)) {
					case 0: this.showPerson("jessica5e.jpg","100%", "", "", "Witch-Toy"); break;
					case 1: this.showPersonRorX("jessica-bound3.jpg", "100%", "", "", "Witch-Toy"); break;
					case 2: this.showPersonRorX("jessica-bound5.jpg", "100%", "", "", "Witch-Toy"); break;
					case 3: this.showPerson("jessica-bound2.jpg", "100%", "", "", "Witch-Toy"); break;
				}
			} else this.showPersonRandom("jessica2c", 6, "100%", "", "", "Bound Witch");

			addPlaceTitle(md, "Jessica in the Cellar");
			md.write(
				'<p>Jessica is your prisoner here in the Hotel cellar...well now dungeon. Hannah alterd her bonds but you wonder if this was a wise idea, but as you look at her helpless before you, those thoughts leave your mind.</p>'
			);
			if (isPersonHere("Bambi")) md.write('<p>Bambi is here taking care of Jessica, strict and with lots of discipline.</p>');
			if (isPersonHere("Anita")) md.write('<p>Anita is here guarding Jessica, impartially.</p>');

			startQuestions();
			var iWitch = this.getRivalry();
			if (iWitch == -1) {
				// Jessica is enslaved - Prisoner
				addQuestionR(md, 'speak to Jessica',
					'“I have nothing to say to you.” Jessica says with barely constrained anger. “I had high hopes for your future, and I would have gladly helped you overcome the trials that I know are headed your way and become the ' + perYou.getMaster() + ' you were meant to be... but not like this.”',
					"Jessica",
					'bChatLeft=false'
				);
				addPopupLinkC(md, "release Jessica", "A Good Idea?",
					"<p>" + this.addPersonString("jessica-bound1.jpg", "height:max%", "right") +
					"Are you sure this is a good idea? Jessica is still weakened and won't be able to attack you right away, but you have really angered her and freeing her now will do little to change that.'</p>" +
					addOptionLink("string", 'release her anyway', "dispPlace(Place,'type=releasejessicprisoner')", "chatblock", "width:50%;margin-left:10%") +
					addOptionLink("string", 'on second thought, better not', "dispPlace(Place,'','Well, some things can not really be taken back once they have been done, and imprisoning a powerful Witch right after she had been freed from her previous prison seems like one of these things.</p><p>No, Jessica better stays where she is until you have a way to ensure her loyalty.')", "chatblock", "width:50%;margin-left:10%"),
					true, "", true
				);
				addPopupLinkC(md, "prepare your witch-toy to play with it", "A Good Idea?",
					"<p>" + this.addPersonString("jessica-bound1.jpg", "height:max%", "right") +
					"Are you sure? Jessica is not yet charmed and you don't think she will forgive you for this. Once you've made that decisions, there is really no turning back.</p>" +
					addOptionLink("string", 'yes, you are sure', "dispPlace(Place,'type=jessicwitchtoy')", "chatblock", "width:50%;margin-left:10%") +
					addOptionLink("string", 'better not', "dispPlace(Place,'','No, this is still a line you do not want to cross. Jessica is safely secured and there is really no need to be cruel for the sake of cruelty.')", "chatblock", "width:50%;margin-left:10%"),
					true, "", true
				);			
			} else if (iWitch == -2) {
				// Jessica is enslaved - Witch-toy
				addLinkToPlace(md, 'make Jessica scream', 161, 'type=jessicascream');
				if (!perYou.isMaleSex()) addLinkToPlace(md, 'force Jessica to pleasure you', 161, 'type=jessicapleasure');
				addLinkToPlace(md, 'fuck Jessica', 161, 'type=jessicafuck');
				addLinkToPlace(md, 'humiliate Jessica', 161, 'type=jessicahumiliate');
			} 

			addLinkToPlace(md, 'that is all for now', 161);
			WritePlaceFooter(md);			
			return true;
		}
		
		if (sType == "cut2answer1") {
			// Witch-toy - initial answer 'because you can\'t trust her'
			md = WritePlaceHeader();
			this.showPersonRandom("jessica3", 2, "", "", "", "Witch-Toy");
			addPlaceTitle(md, "Enslaving Jessica");
			md.write(
				'<p>Kurndorf had the Town at his fingertips, until Jessica killed him, that is. As valuable an ally as she could be, she\'d also be a dangerous foe if your own goals don\'t align with hers, and you won\'t risk being the next ' + perYou.getWitch() + ' to suddenly receive a bullet to the head.</p>' +
				'<p>Jessica snorts angrily as you explain your reasons to her. You don\'t get the feeling she understands your point of view, and sure, if she\'d ever get away she might grow into a terrible foe with a justified grudge against you, but there must be ways to charm even a true witch like her. Until then, keeping her locked up tightly is better than have her potentially plot against you.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'call Bambi into the cellar', Place, 'type=cut2callbambi');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "cut2answer2") {
			// Witch-toy - initial answer 'because she\'s more useful as a slave than an ally'
			md = WritePlaceHeader();
			this.showPersonRandom("jessica3", 2, "", "", "", "Witch-Toy");
			addPlaceTitle(md, "Enslaving Jessica");
			md.write(
				'<p>Jessica may have pledged her service to you, but when it comes down to it, she is another witch, and one who may have a lot more power than you do.</p>' +
				'<p>You tell her that it\'s nothing personal, but as she said, -you- are the true ' + perYou.getMaster() + ' of Glenvale, and you don\'t need unreliable alliances, you need slaves who do whatever you want them to do.</p>' +
				'<p>Jessica replies with a defiant grunt, her eyes challenging, knowing full well that she can\'t be charmed easily, but that just means you need to find a way to break through her defenses, or break her by other means.</p>' +
				'<p>And until you know how to do that, she\'s better kept close where you can have an eye on her and she won\'t be in your way.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'call Bambi into the cellar', Place, 'type=cut2callbambi');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "cut2answer3") {
			// Witch-toy - initial answer 'because you can'
			md = WritePlaceHeader();
			this.showPersonRandom("jessica3", 2, "", "", "", "Witch-Toy");
			addPlaceTitle(md, "Enslaving Jessica");
			md.write(
				'<p>Really what is there to explain? Jessica was at your mercy, you had the power to do whatever you wanted with her, and so you did, because that\'s the way the world works.</p>' +
				'<p>You feel a little like a movie villain gloating over their beaten foe, but you can\'t deny that you enjoy the rush it brings and really, who can blame you for not wanting to let a potential rival run free when you can keep her here for your amusement?</p>' +
				'<p>Your answer seems to both infuriate and terrify Jessica, and you assure her that your stay with you will be at least a lot less boring than her previous prison.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'call Bambi into the cellar', Place, 'type=cut2callbambi');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "cut2answer4") {
			// Witch-toy - initial answer 'You don't have to explain yourself to her'
			md = WritePlaceHeader();
			this.showPersonRandom("jessica3", 2, "", "", "", "Witch-Toy");
			addPlaceTitle(md, "Enslaving Jessica");
			md.write(
				'<p>You simply ignore the witch. Why waste time trying to explain your actions if it doesn\'t change the situation for any of you?</p>' +
				'<p>All that matters is that Jessica is your prisoner now, and that you need to take measures to keep it that way.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'call Bambi into the cellar', Place, 'type=cut2callbambi');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "cut2callbambi") {
			// Witch-toy - Call Bambi in
			perBambi = findPerson("Bambi");
			this.extra[2] = nTime;
			be = perBambi.checkFlag(16) ? "be" : "";
			setPlaceFlag('Hotel', 9);
			md = WritePlaceHeader();
			this.showPersonRandom("jessica3", 2, "", "", "", "Witch-Toy");
			addPlaceTitle(md, "Bambi and Enslaving Jessica");
			md.write(
				'<p>“Yes, ' + perYou.getLord() + ', what may I do for you?” Bambi doesn\'t waste a second when you call out for her, and a wicket smile plays on her lips upon seeing that Jessica had been released from the wall and yet was still bound and gagged.</p>' +
				'<p>“Or... do with her?”</p>' +
				'<p>There is an undeniably predatory spark in Bambi\'s eyes that even manages to shake Jessica, and she is definitely hopeful as she turns to you. “She is not one of yours, yet, but I would be -very- happy to assist if you wish to play with her nevertheless.” She casts another sideways glance to Jessica.</p>' +
				'<p>“In fact I would love to help her “integrate” her into your harem, one way or another.”</p>' +
				'<p>You sometimes wonder if Bambi\'s eagerness to provide new slaves for you really only comes from your orders, or if she is simply living out kinks she always had without inhibitions, now.</p>' +
				'<p>There is also the question of how far you are willing to go. You would lie to yourself if you pretend that something within you doesn\'t want to take Jessica, charmed or not... That you wouldn\'t want to dominate this powerful witch helplessly bound before you, and yet...</p>' +
				'<p>From a purely logical standpoint, you don\'t really hold a grudge towards her. You have your reasons for keeping her locked up, but she is not your enemy, and without the spell forcing her to enjoy it, whatever Bambi has in store for her would most likely be a pretty harrowing experience, for her at least.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'tell Bambi to make sure the prisoner does not escape, but is also not harmed', Place, 'type=cut2prisoner');
			addLinkToPlace(md, 'tell Bambi to make sure your new witch-toy is always ready for you to play with', Place, 'type=cut2witchtoy');
			AddPeopleColumnLarge();
			perBambi.showPerson("bambi11b" + be + ".jpg");
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "cut2prisoner") {
			// Witch-toy - Prisoner
			perBambi = findPerson("Bambi");
			be = perBambi.checkFlag(16) ? "be" : "";
			this.setRivalry(-1);
			md = WritePlaceHeader();
			this.showPersonRandom("jessica3", 2, "", "", "", "Witch-Toy");
			addPlaceTitle(md, "Bambi and Enslaving Jessica");
			md.write(
				'<p>Well, Jessica will still need to be restricted, and certainly not enjoy her stay, but torturing someone who you feel doesn\'t deserve it is one line you don\'t feel comfortable crossing.</p>' +
				'<p>You order Bambi to make sure Jessica remains tied up in some way, stressing the importance of the magic inhibiting bindings but explicitly forbidding any form of training or torture unless you permit it.</p>' +
				'<p>Bambi is clearly disappointed. You get the feeling she was looking forward to having a slave to train, but she still dully goes to work restraining Jessica.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'look around the cellar more', 161);
			addLinkToPlace(md, 'go back up to the hotel bar', 124);
			AddPeopleColumnLarge();
			perBambi.showPerson("bambi11b" + be + ".jpg");
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "cut2witchtoy") {
			// Witch-toy - Toy
			perBambi = findPerson("Bambi");
			be = perBambi.checkFlag(16) ? "be" : "";
			this.setRivalry(-2);
			md = WritePlaceHeader();
			this.showPersonRandom("jessica3", 2, "", "", "", "Witch-Toy");
			addPlaceTitle(md, "Bambi and Enslaving Jessica");
			md.write(
				'<p>It doesn\'t take much for you to dismiss your doubts. After all, what difference does the way you claim her make if the end result is the same?</p>' +
				'<p>You order a very exited Bambi to prepare the witch for training, explicitly permitting her to do whatever she feels is necessarily to break her, but making sure to point out that she is to avoid permanent blemishes and to ensure that you are able to “play” with her whenever you want to.</p>' +
				'<p>Bambi immediately makes a list of tools she needs to properly train the now visibly agitated Jessica, and you have to admit her enthusiasm is infectious. You let your eyes wander over the helpless witch before you with the same predatory look you have seen in Bambi\'s eyes earlier, very much enjoying how little Jessica\'s angry glare is able to hide the worry on her face, as you firmly tell her:</p>' +
				'<p>“Looks like I have a new, beautiful and powerless witch-toy!”</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'look around the cellar more', 161);
			addLinkToPlace(md, 'go back up to the hotel bar', 124);
			AddPeopleColumnLarge();
			perBambi.showPerson("bambi11b" + be + ".jpg");
			WritePlaceFooter(md);
			return true;
		}			
		
		if (sType == "jessicascream") {
			// Make her scream
			md = WritePlaceHeader(false, this.checkFlag(8) && perYou.isMaleSex() ? "td-left-large" : "");
			if (perYou.isMaleSex()) this.showPerson("jessica5" + (this.checkFlag(8) ? "d" : "f") + ".jpg");
			else if (!isExplicit()) this.showPerson("jessica5a.jpg");
			else this.showPersonRorX("jessica5" + (this.checkFlag(8) ? "a" : "b") + ".jpg");
			this.setFlag(8, !this.checkFlag(8));
			addPlaceTitle(md, "Playing with your Witch-Toy");

			md.write(
				'<p>Bambi gave you a crash-course on what she calls “painplay”, but it didn\'t really do the actual thing justice.</p>' +
				'<p>The devious woman always finds creative ways to tie Jessica into sexy, helpless positions, and under her oversight, you learn how to properly handle a flogger, apply clamps or simply administer a classic spanking without leaving lasting marks or blemishes.</p>' +
				'<p>Jessica screams, moans and gasps heavily for air every time a cane or flogger hits her skin or a new clamp is attached to a sensitive area, and while you, for now, stay away from the more potentially dangerous stuff, the feeling of having nearly complete control over her body, to dominate every sensation she feels, every burst of pain, every blissful shudder and every orgasm is intoxicating!</p>' +
				'<p>The fact that she is unwilling does not deter you. If any, it turns you on even more, and you can\'t wait to push her further once you become more experienced.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'that is all for now', 161);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "jessicapleasure") {
			// Force her to pleasure you
			md = WritePlaceHeader(false, "td-left-large");
			this.showPersonRorX("jessica10f.jpg");
			addPlaceTitle(md, "Playing with your Witch-Toy");

			md.write(
				'<p>You can\'t really order Jessica to just lick you and trust that she keeps her teeth out of it, but thanks to Bambi\'s stash of toys, there are ways to circumvent that problem.</p>' +
				'<p>Bambi ties Jessica up in a way that forces her to kneel before you and secures what is essentially a Dildo gag to her head, turning her into a helpless toy for you to play with.</p>' +
				'<p>You take a hold of Jessica hair and roughly use her head to pleasure yourself.</p>' +
				'<p>Granted, there are more comfortable ways to use a dildo, but the confused look of indignation on Jessica\'s face as you use her like a glorified sexdoll combined with the knowledge that there is still no way for her to stop you makes the whole thing a lot more enjoyable.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'that is all for now', 161);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "jessicafuck") {
			// Fuck her
			md = WritePlaceHeader(false, "td-left-large");
			this.showPerson(perYou.isMaleSex() ? "jessica11m.jpg" : "jessica11f.jpg");
			addPlaceTitle(md, "Playing with your Witch-Toy");

			md.write(
				'<p>Jessica grunts in muffled protest as you help Bambi drag her to a mattress and begin securing her arms and limbs to keep her locked in place on all fours.</p>' +
				'<p>Bambi prepares Jessica\'s pussy for you, teasing the witch with her tongue and fingers while you ' + (perYou.isMaleSex() ? 'take of your clothes.' : 'secure a double-sided strap-on to your waist.') + '</p>' +
				'<p>She shoots you an angry glare as you walk behind her and get into position, driving your fingers over her moistened folds with a teasing chuckle and finally pushing into her with a single, rough motion.</p>' +
				'<p>The helpless woman bites into her gag and emits a muffled grunt as you push into her, pinning her to the ground and letting your hip slap against her ass with every thrust.</p>' +
				'<p>She doesn\'t enjoy it.</p>' +
				'<p>Sure, her body reacts to the stimuli, and you know well enough how to hit the right spots to make her moan and shiver under the pleasure and even force her to orgasm when you feel like it, but this isn\'t about her pleasure, or even yours. It\'s about control.</p>' +
				'<p>You want to make sure she knows her place, knows that you can take her whenever you want and that there is nothing she can do to stop you, that the only way out of this is to submit, to allow you to spellbind her mind, so she can be a happily blissful slave under your care.</p>' +
				'<p>You finally feel your own climax approaching and lean forward, both arms roughly pinning Jessica down as you ' + (perYou.isMaleSex() ? 'release your load inside her' : 'let your climax wash over you') + ' with a blissful moan, reminding her that she is yours once again and leaving Bambi to clean her up.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'that is all for now', 161);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "jessicahumiliate") {
			// Force her to pleasure you
			md = WritePlaceHeader(false, perYou.isMaleSex() ? "td-left-large" : "");
			this.showPerson(perYou.isMaleSex() ? "jessica12m.jpg" : "jessica12f.jpg");
			addPlaceTitle(md, "Playing with your Witch-Toy");

			md.write(
				'<p>Jessica still seems to believe she is getting out of this somehow, that if she just endures long enough someone might free her before you figure out how to spellbind her completely, and the defiant stares she keeps giving you are, frankly, annoying.</p>' +
				'<p>You push the witch to the floor and firmly order her to ' + (perYou.isMaleSex() ? 'drink milk from a bowl on the floor' : 'lick your boots') + ' as a little reminder of her position.</p>' +
				'<p>Of course, she is reluctant, well, downright hostile towards the notion, shivering in disgust as you push her head down and keeping her tongue firmly inside her mouth.</p>' +
				'<p>“Do I need to call Bambi down again?” You ask in a vaguely threatening voice, knowing full well the implication of harsher punishment it carries, and after a brief moment of consideration... she gives in.</p>' +
				'<p>You smile as you watch her ' + (perYou.isMaleSex() ? 'messily smear the milk all over her face trying to drink it' : 'lick your boots in revulsion') + '. Sure, every single one of your spellbound girls would do this with more care and enthusiasm, probably even enjoy every second of it.</p>' +
				'<p>But there is just... something in you that relishes being able to force someone powerful like her to humiliate herself like that... and you have to admit that maybe... this is less about teaching her a lesson, and more about the rush you get from it.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'that is all for now', 161);
			WritePlaceFooter(md);
			return true;
		}			
		
		if (sType == "releasejessicprisoner") {
			// Release her as a prisoner
			md = WritePlaceHeader();
			this.showPerson("jessica2d.jpg");
			addPlaceTitle(md, "Releasing Jessica");
			this.startRival();

			md.write(
				'<p>Jessica looks highly suspicious as you remove the chains holding her in place, and even more when you tell her that she may go free.</p>' +
				'<p>“What kind of game are you playing?” She asks, and you simply shake your head.</p>' +
				'<p>“No game,” you tell her, you\'ve made a mistake locking her up to begin with, and she is free to go, now.</p>' +
				'<p>Jessica is... perplexed by your change of heart, probably just as much as you are, her eyes still show anger as they trail towards her shackles, but she calms herself with a long breather.</p>' +
				'<p>“Very well, I... thank you.” The words come out reluctantly. “Trust is easily lost, but I believe we both will still need each other for what is to come, so I shall... overlook this.”</p>' +
				'<p>You don\'t feel like she has forgiven you, but neither do you think you run the risk of being turned into a toad as soon as she gets the shackles off, also what the hell is that thing “about to come”?</p>' +
				'<p>“I do not know yet, but call it a premonition, like when I foresaw your arrival in my prison.”</p>' +
				'<p>“You will need me, and I shall contact you once I know more... until then...” There is a noticeable break. “...farewell, ' + perYou.getPersonName() + '.”</p>' +
				'<p>Jessica bows politely and leaves the cellar, and you hope you made the right choice.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'that is all for now', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "jessicwitchtoy") {
			// Release her as a prisoner
			md = WritePlaceHeader();
			this.showPerson("jessica5e.jpg");
			addPlaceTitle(md, "Jessica the Witch-toy");
			this.setRivalry(-2);

			md.write(
				'<p>In the end, It didn\'t take much for you to dismiss your doubts. After all, what difference does the way you claim her make if the end result is the same?</p>' +
				'<p>You call a very exited Bambi into the cellar and order her to prepare the witch for training, explicitly permitting her to do whatever she feels is necessarily to break her, but making sure to point out that she is to avoid permanent blemishes and to ensure that you are able to “play” with her whenever you want to.</p>' +
				'<p>Bambi immediately makes a list of tools she needs to properly train the now visibly agitated Jessica, and you have to admit her enthusiasm is infectious. You let your eyes wander over the helpless witch before you with the same predatory look you have seen in Bambi\'s eyes earlier and very much enjoy how little Jessica\'s angry glare is able to hide the worry on her face as you firmly tell her:</p>' +
				'<p>“I have a new, beautiful and powerless witch-toy. Might as well play with it.”</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'that is all for now', Place);
			WritePlaceFooter(md);
			return true;
		}		
		
		return false;
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 46 && this.checkFlag(36) && !this.checkFlag(37) && sType === "") {
			md.write('<p>You see a small package on your bed.<img src="Images/Items/parcel.jpg" style="float:right;width:10%"></p>');
		}
		if (sType === '' && this.isHere() && isOutside()) addBackgroundImage("Images/People/Jessica/jessicabg.png", "80% 0%");

		var iWitch = this.getRivalry();
		if (Place == 161 && this.isHere() && sType === "") {
			if (iWitch == 1) {
				md.write(
					'<p>You see Jessica is here, the demon ignored her as she left. Jessica is still bound and chained to the cellar walls. You try to locate any sort of locks or ways of freeing her but everything is seamless metal or other material. There is nothing to open, even the gag is tight and cannot be gotten free. You try to pull the chain free, but they are sunken into the walls.</p>' +
					'<p>It seems you will have to find help to free her...unless you want to have your own personal witch-toy...but the Demon is free and Kurndorf is in the next room, so it is a dangerous place to play.</p>' +
					'<p>You tell Jessica that you will return with help to free her, though to yourself you are still thinking of <b>not</b> freeing her.</p>'
				);
				this.setRivalry(2);
			} else if (iWitch == -1) {
				// Prisoner
				md.write('<p>Jessica\'s eyes follow you wherever you go. Bambi has allowed her to cover up, and even removed the gag, but her new outfit still very much fits the dungeon aesthetic, and she is definitely not happy to see you.</p>');
			} else if (iWitch == -2) {
				// Witch Toy
				switch(Math.floor(getHour() / 6)) {
					case 0:
						md.write(
							'<p>Muffled moans and the constant, low buzz of a vibrator greet you as you enter the cellar, and you find Jessica tied up tightly with a thick vibrator locked between her legs.</p>' +
							'<p>You don\'t know how long she has been forced to stand like this but it must have been a while and despite her best attempts to not show it she must be pretty desperate to cum by now.</p>'
						);
						break;
					case 1:
						md.write(
							'<p>The sound of scraping metal and rustling chains fills the room when you come in, and you find Jessica locked in a small cage a few meters above ground, arms and legs tied above her head while she desperately tries to either get rid of the vibrator between her legs or to push it more firmly against her pussy.</p>'
						);
						break;
					case 2:
						md.write(
							'<p>Jessica has been forced to sit down on what is essentially a fucking machine. Leather cuffs keep her body in place as a spinning mechanism relentlessly drives a Dildo in and out of her soaked sex.</p>' +
							'<p>The machine has probably forced her to climax a few times by now, and if her ragged breathing is any indication, another one isn\'t far away.</p>'
						);
						break;
					case 3:
						md.write(
							'<p>Jessica has been tied up with an elaborate rope harness and put on display on top of a small podium.</p>' +
							'<p>Bambi hasn\'t added any clamps or vibrators, this time, giving her some semblance of rest while still leaving her very exposed to your view.</p>'
						);
						break;						
				}
			} else {
				// Awaiting rescue
				md.write('<p>Jessica is here, naked, chained and gagged, and waiting for you to free her.</p>');
			}
		} else if (Place == 183 && this.isHere()) {
			// Room 49 in the Hotel
			if (sType === "") {
				md.write(
					"<p>Jessica remains prone before you, both hands kept firmly on the ground in front of the circle, she looks focused, but her attention is now on you.</p>" +
					"You can see the air fluctuating around the salt circle, the amount of magical energy used is faint, but visible to someone who knows what to look for.</p>"
				);
			} else if (sType == "jessicaquestions2") {
				this.setFlag(11);
				md.write(
					'<p>“I am preparing a simple thaumathurgic spell to find something important to me.” She begins to explain.</p>' +
					'<p>“The circle isolates a small amount of magical power from the random energies surrounding it, allowing me to refine and focus it in a more precise manner than an evocation would allow me to, similar to what we did when we joined hands to form a circle during the ritual.”</p>'
				);	
			} else if (sType == "jessicaquestions3thaum") {
				this.setFlag(12);
				md.write(
					'<p>Jessica blinks at you, then her eyes widen in realization.</p>' +
					'<p>“You are using powerful spells like the Dai Chu without knowledge of the basics? I am impressed.” She gives you a respectful nod. “Not many are able to do that, and it is good to see I was not mistaken about your potential as a ' + perYou.getWitch(true) + ', so let me try to explain it.”</p>' +
					'<p>“An evocation is a quick and direct manner of casting spells without ritual or preparation. You just gather your Mana and use it to achieve the effect you require, like going through walls or revealing objects hidden from your direct view.”</p>' +
					'<p>She speaks calmly, her eyes on you but her hands move along the edges of the circle in well practiced motions as she prepares her spell.</p>' +
					'<p>“Thaumaturgy means you create a link to something by using an object with a connection to it, usually to make something happen on a small scale and cause an effect on a large scale elsewhere.”</p>' +
					'<p>“Unlike evocations, which require line of sight, Thamuaturgy allows us to affect things or people that are far away. It could allow you to affect a person using a personal item of theirs and even posses their body if cast from a place of sufficient power.”</p>' +
					'<p>“I am, however, simply using the link for a tracking spell.”</p>'
				);					
			} else if (sType == "jessicaquestions3mast") {
				this.setFlag(13);
				md.write(
					'<p>“I was left without Mana, but a true witch knows to draw power from strong emotions like love, hatred, and of course lust, if need be, and I only needed a small amount.”</p>' +
					'<p>“It is why the Dai Chu has such a strong sexual component instead of just dominating the mind. By keeping the person in a state of perpetual arousal, the spell does power itself. Without that effect, a Witch would need to renew the incantation regularly.”</p>' +
					'<p>Well, that does answer a question you didn\'t even know you had, though you are certain the warlocks of old were not particularly averse to this “side effect”.</p>'
				);					
			} else if (sType == "jessicaquestions3looking") {
				this.setFlag(14);
				md.write(
					'<p>For a brief moment, you see her stoic expression falter as she breathes out before continuing to speak in the same calm and collected manner as always. “I had a daughter. She was only 3 years old when Kurndorf sealed me away and I have no idea what became of her afterwards.”</p>' +
					'<p>“If she survived the no doubt tumultuous time that had followed his death and if she had kids of her own and if their kids remained in Glenvale... I might be able to find a descendant of mine in this era.”</p>' +
					'<p>That\'s a lot of “ifs” to be sure, but you can see why Jessica would make it a priority to search for survivors of her family now that she is finally free.</p>'
				);					
			} else if (sType == "jessicaquestions4") {
				this.setFlag(15);
				md.write(
					'<p>Jessica\'s attention shifts back towards the circle after you have no more questions, and uttering a single word, she drags her fingers through the ring of salt, breaking the circle and releasing the spell she had shaped inside it.</p>' +
					'<p>You feel a brief tingle going through your body, as if an invisible shock wave flows through the room and disperses at the walls while Jessica closes her eyes to focus.</p>' +
					'<p>There is a palpable tension in the air as the seconds pass. Jessica looks tense, holding her breath for the entire duration, and then smiles.</p>' +
					'<p>“I can feel a feint trickle of energy moving towards the town\'s center.” She points roughly into the direction of the Shopping Center.</p>' +
					'<p>“Someone of my blood is currently alive and resides within Glenvale... I must speak with that person.”</p>' +
					'<p>Jessica looks at you.</p>' +
					'<p>“' + perYou.getLord() + '. I will need to get dressed and make my way to the city center. However, I am unfamiliar with this time period and would appreciate your company on the way, so you are willing to provide it.”</p>'
				);					
			}				
		}
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 46 && this.checkFlag(36) && sType === "") {
			if (!this.checkFlag(38)) {
				addQuestionR(md, 'examine the package',
					'It\'s clearly addressed to you, but has no sender and you are sure you didn\'t order anything. It may be a gift from one of your girls, but they would certainly want you to know who send it.',
					"",
					"setPersonFlag(\\'Jessica\\',38)"
				);
			} else if (!this.checkFlag(37)) {
				addQuestionR(md, 'open the package',
					'It\'s a mana stone, and a big one, too!</p>' +
					'<p>The markings are the same as all the other\'s you found, but sharper and less worn out, it might contain more mana than others, too.</p>' +
					'<p>Aside from the stone, you only find a small note in the package.</p>' +
					'<p>“The wheels of fate have been put into motion. May this help you find the right path so the city may prosper.”</p>' +
					'<p>It\'s not signed by anyone...</p>' +
					'<p>You seriously wonder why everyone involved in the supernatural always tries has to be all secretive and mysterious, but you won\'t scoff at extra mana.',
					"",
					"PlaceI(68);setPersonFlag(\\'Jessica\\',37)"
				);
			}					
		}
		if ((Place == 161 && sType == "checkjessica")|| (sType === "" && (Place == 124 || Place == 182))) {
			if (this.getRivalry() < 0 && !this.checkFlag(9) && isPersonHere("Bambi") && this.hoursCharmed("skip") > (48 + (Math.random(2) * 24))) {
				addQuestionR(md, 'ask Bambi how Jessica is doing',
					'““She\'s a stubborn one, I give her that much, but I know a closeted painslut when I see one, and she is a good one.”</p>' +
					'<p>“She claims that you will need her, before long, and that you will regret treating her like this when the time comes. Of course, she will not tell me why and I suspect she\'s bluffing and always punish her appropriately for it.',
					"Bambi",
					"setPersonFlag(\\'Jessica\\',9)"
				);
			}
		}
		if (!this.isHere()) return;
		
		if (Place == 161 && sType === "") {
			// Bound in the Cellar
			if (this.getRivalry() < 0) addLinkToPlace(md, 'check on Jessica', 161, 'type=checkjessica');
		}
		
		if (Place == 183) {
			// Room 49 in the Hotel
			if (!this.checkFlag(10)) {
				addQuestionR(md, 'examine the Circle',
					'<img draggable="false" style="float:left;max-width:10%" src="Images/saltcircle.jpg" alt="Circle"/>A small circle, created by emptying out a saltshaker Jessica must have snatched from somewhere in the hotel. The air surrounding it seems to be fluctuating with energy once you look more closely, and you see a few strains of red hair in the middle.',
					"",
					"setPersonFlag(\\'Jessica\\',10)"
				);
			}
			if (!this.checkFlag(11)) addLinkToPlaceC(md, 'ask her what she is doing', Place, 'type=jessicaquestions2');
			else if (!this.checkFlag(12) || !this.checkFlag(13) || !this.checkFlag(14)) {
				if (!this.checkFlag(12)) addLinkToPlaceC(md, '"Evocation? Thaumaturgy?"', Place, 'type=jessicaquestions3thaum');
				if (!this.checkFlag(13)) addLinkToPlaceC(md, '"Why did she masturbate?"', Place, 'type=jessicaquestions3mast');
				if (!this.checkFlag(14)) addLinkToPlaceC(md, '"What is she trying to find?"', Place, 'type=jessicaquestions3looking');
			} else if (!this.checkFlag(15)) addLinkToPlaceC(md, 'wait for Jessica to cast her spell', Place, 'type=jessicaquestions4');
			else {
				startAlternatives();
				addLinkToPlaceC(md, 'you are otherwise occupied', 124, '', '“Then I shall find another guide.” Jessica nods to you.</p><p>“I Thank you for freeing me, ' + perYou.getLord() + ', and I shall contact you as soon as I have found the one I am looking for.”</p><p>“There is still much we need to discuss, not the least of how I would be able to properly repay you.”</p><p>With that your discussion is over and you make your way back to the bar.', '', "setPersonFlag('Jessica',17);movePerson('Jessica',345);setPersonFlag('Jessica',27);per.charmedTime=nTime;");
				addLinkToPlaceC(md, 'you will gladly be her guide', Place, 'type=jessicaguide', '“I Thank you, ' + perYou.getLord() + '. Please wait for me to get dressed, then we may go.”');
				endAlternatives();
			}
		}
		
		if (Place == 348 && sType === "") {
			if (!this.checkFlag(29)) addLinkToPlaceC(md, 'ask how she is settling in', Place, 'type=talkjessica1');
			if (this.checkFlag(31)) {
				// Training
				addLinkToPlace(md, 'ask for information about Glenvales History', Place, 'type=jessicahistory');
				addLinkToPlace(md, 'spend some time training with Jessica', Place, 'type=jessicatraining');
			}
			if (this.checkFlag(32)) {
				// Sex
				addLinkToPlace(md, '“Lay” with Jessica', Place, 'type=jessicalay');
			}
			this.addSleepLink(md, "sleep with Jessica", "Sleeping with Jessica",
				'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%">Esmeralda only has one guest-bed, but Jessica gladly offers to share it with you for the night, and who would want to refuse an offer like this?',
				'jessica-bed1.jpg', true, '', '', '', "overflow-y:hidden"
			);			
		}
	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Witches Prison
			if (Place == 193) {
				addComments('A spell of this magnitude has no effect on true witches. You will need something much more powerful!');
				return "handled";
			}
			// During the séance
			if (Place == 339) {
				addComments('The magic of the séance disrupts the spell and it completely fails to have any affect.');
				return "handled";
			}
			// Hotel Cellar
			if (Place == 161 && this.isHere()) {
				addComments('A spell of this magnitude has no effect on true witches. You will need something much more powerful!');
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls
	per.addPersonPhoneCall = function() {
		if (this.place == 345 && isMorning() && this.checkFlag(27) && this.hoursCharmed("skip") > 12) {
			// Phone call after meeting Esmeralda
			if (makeCall(false, "",
					'You are called by an unfamiliar number, but immediately recognize Jessica\'s voice at the other end.</p>' +
					'<p>“The annoying tone has stopped, does that mean... Ah so ' + perYou.getHeShe() + ' can hear me, now? ' + perYou.getPersonName() + ', are you able to hear me now?”</p>' +
					'<p>You suppress a chuckle and say hello to Jessica.</p><p>“This is a marvelous device.” Jessica sounds astonished. ' +
					(this.checkFlag(16) ? '“I had wanted to summon an ethereal Raven to deliver my message, but Lady Esmeralda assured me that it is more expedient to do it this way.”</p><p>Well, you know little about ethereal Ravens, but she is probably right.' :
												 '“Anyway, I have found the person I was looking for. She is working as a local psychic by the name of Esmeralda.</p><p>Wait... -that- Esmeralda?') +
					'</p><p>“I would like to invite you to visit me whenever you are available, and I will be waiting in the back of Lady Esmeralda\'s store.”</p>' +
					'<p>You assure her that you will be on your way as soon as you are able to make the time, and Jessica thanks you.</p>' +
					'<p>“I look forward to your arrival, farewell ' + perYou.getLord() + '<br>' +
					'“How does one deactivate this device?”<br>' +
					'“You mean this button?”</p>' +
					'<p>You hear several beeping noises.</p>' +
					'<p>“I think it may still be activated.”<br>' +
					'“The red button?”<br>' +
					'“Like this?”<br>' +
					'*Click*'))
			{
				this.moveThem(348);
				return true;
			}
		}
		if (Place != 46 && this.extra[0] < 0 && this.hoursCharmed("skip") > 72 && !this.checkFlag(36) && !isPersonHere("Tracy")) {
			// SMS 23, start of Bimbo Curse
			if (makeCall(true, 23)) this.setFlag(36);
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			// Technically from Sarah
			case 92: 
				return receiveSMS('noble ally', 'A painting $%@$ time of the cults, $@$@$ the witch Jessica', 'jessica0.jpg');
		}
		return '';
	};

}