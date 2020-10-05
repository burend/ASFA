/****************************************************************
		Bambi Barmaid Response Base

****************************************************************/
function RepliesBambi(nR)
{
	var bCharm = per.isCharmedBy();
	var myLord = per.getYourNameFor();

	if (nR == 922)
	{
		if (!perYou.checkInjury(7)) {
			perYou.setInjury(7);
			moveItem(4, 76); // Put the book in Beasley's "office" for you to get.
			if (wherePerson("MrBeasley") !== 11) movePerson("MrBeasley", 11); // Put Mr Beasley back in his office so you can get the book.
			perYou.setFlag(8);  // Set it so that you HAVE ASKED about the book
		}
		perYou.setInjury(8);
		if (!bCharm) addComments('<p>"The teacher Mr. Beasley told me he saw you lying unconscious in the cellar. I immediately called an ambulance to take you to the hospital. I do not like to talk ill of customers so I will not further talk of Mr. Beasley."</p>');
		else addComments('<p>"Oh, ' + myLord + ', Mr. Beasley the teacher found you lying unconscious and and told me. I immediately called an ambulance and then had him leave the Hotel. Mr. Beasley is one of my customers I wish to see as little as I can outside of professional matters."</p>');
		addComments('<p>You ask about the Book but all Bambi mentions is seeing Mr. Beasley carrying a large bag when he left.');
	}
	else if (nR == 1000)
	{
		bChatLeft = false;
		per.setFlag(5);
		setPersonFlag("Mia", 5);
		addComments('"We have a wide range of wines, ' + myLord + ' but only a limited number of truly fine vintages. We have a wine rack in the cellar but one of the hotels owners recently lost the key to the rack and we have not yet got in a locksmith to sort it out. The silly person was hiking in Glenvale Park somewhere and lost it!"');
	}
	else if (nR == 2206)
	{
		perKurndorf.setQuestCrypt(10);
		addComments('"Kurndorf, ' + myLord + '? Yes. Everyone in this town knows about <i>him</i>.  I even heard he was buried somewhere around here."<br>');
	}
	else if (nR == 2210)
	{
		perKurndorf.setQuestCrypt(17);
		addComments('"I can\'t say for sure, ' + myLord + '. I remember something about him being buried in a crypt.  I\'m sorry ' + myLord + ', I\'m afraid I didn\'t pay much attention in history class.  Please forgive me.  Is there <i>anything</i> I can do to make it up to you ' + myLord + '?" she asks, glimmers of desire in her eyes as she looks at you.');
	}
	else if (nR == 11900)
	{
		movePerson("Donna", 269);
		addComments('"Oh yes, ' + myLord + '," she says with a wicked grin.</p><p>"A voluptuous girl about your age just checked in. She has quite an attitude and I would <i>love</i> to see you teach the little thing her rightful place in this world...  <i>as your slave</i>.  I believe that she is in the swimming pool at the moment, ' + myLord + ', her name is Donna.", she says with a wicked grin, very pleased with herself.');
	}
	else if (nR == 11901)
	{
		per.setFlag(6);
		startTimedEvent("movePerson('NurseMegan',275);", 12);
		movePerson("NurseMegan", 269);
		addComments('"Oh, ' + myLord + '," she says "The hotel pool is available to the general public for a modest fee. A lovely pair of slaves-to-be are there now. I think one is a nurse from the hospital and possibly the other one too, but I do not know their names they were wearing nurses uniforms when they arrived. Of course they may just be exotic performers visiting a customer with a fetish for nurses!"');
	}
	else if (nR == 6010)
	{
		moveDavyToHotel2();

		bChatLeft = false;
		if (bCharm) {
			//CHARMED
			addComments('"Why yes, ' + myLord + '.  I saw Davy Robbins enter room 101 with a pretty young girl. Oh! Could you enslave her, ' + myLord + '?  I\'m sure she would make a nice <i>pet</i> for you..."');
		} else {			//NORMAL
			addComments('"Davy Robbins?  Is he a friend of yours?" She asks, giving you a warm smile.  "Now don\'t go spreading it around that I give out stuff like this...  But he just rented room 101 a little bit ago."</p>');
		}
	}
	else if (nR == 10701)
	{
		if (!per.checkFlag(8)) //Haven't already done this
		{
			if (perYourBody.NoItems < perYourBody.MaxItems) //Have room for the stone
			{
				perYourBody.PutItem(6);
				per.setFlag(8);	//Set it as having given you the stone
				addComments('<p>"Is there anything <i>else</i> you would like, ' + myLord + '?" She asks, kneeling at your feet, then daring to look up at you with desire in her eyes.</p>');
			}
			else {
				//Don't have room for it
				addComments('<p>You reach for the stone, but realize that you don\'t have room for it in your bag.</p>');
			}
		}
	}
	else if (nR == 10702)
	{
		per.setFlag(4);	//Set it as having asked about the photo
		per.showPersonAnon("bambimother.jpg", "25%", 'left;margin-bottom:1em;margin-right:5px', '', '', false, "comments");
		addComments(
			'<p>"' + myLord + ', that is my mother, we did some photo-shoots for some magazines and websites sometime ago.", she somewhat proudly explains, kneeling at your feet.</p>' +
			'<p>"I am sorry ' + myLord + ' if you desire her you will have to wait, she is currently on holiday in New Zealand. I will present her to you once she returns home!". You are surprised at her complete lack of reservation at offering her mother to be enslaved, and actually sounding eager for it! Bambi\'s loyalty and perversion seem boundless.</p>'
		);
	}
	else if (nR == 10801)
	{
		bChatLeft = false;
		if (!bCharm) {
			//NORMAL
			if (isBritish()) {
				if (nMoney > 4) {
					addComments('"Sure that will be ' + sCurrency + '5" She says with a wink. You hand over the money, it is a bit expensive, and you can\'t keep down more than a sip.  Why do people <i>drink</i> these?');
					AddCash(-5);
				} else addComments('"Sure that will be ' + sCurrency + '5" She says with a wink. Unfortunately you do not have enough money!');
			} else addComments('"Scotch, eh?" she says, amused at your courage and taking a close look at you. "Are you sure you\'re even old enough to drink?  Why don\'t you come back when you have a few more... <i>years</i> on you." She says with a wink.');
		} else {
			// CHARMED
			if (isBritish()) addComments('"Sure thing" she says as she whips up your scotch.  "Anything else, ' + myLord + '?" She whispers as she hands you the drink.  You can\'t keep down more than a sip.  Why do people <i>drink</i> these?');
			else addComments('"Aren\'t you a little young for that?" She asks loud enough to keep up appearances as she whips up your scotch.  "Anything else, ' + myLord + '?" She whispers as she hands you the drink.  You can\'t keep down more than a sip.  Why do people <i>drink</i> these?');
		}
	}
	else if (nR == 10802)
	{
		bChatLeft = false;
		addComments('"You\'re a little forward, aren\'t you? I don\'t usually give customers extra service ' + myLord + ', but in your case..." She eyes you up and down and you suddenly feel as if you\'re nothing more than a piece of meat. Then she continues, "I think ' + sCurrency + '100 should buy you some of my time."');
		per.other = 5;
	}
	else if (nR == 10805)
	{

		AddCash(-100);
		per.setFlag(33);	// She got $100
		addComments('<p>She raises an eyebrow but still takes your money.  "Follow me." She says, leading you up to her room.</p>');
		Place = 133;
	}
	else if (nR == 10806)
	{
		AddCash(-50);
		per.setFlag(34);	// she got the extra $50
		addComments('<p>"Thank you, ' + myLord + ', it\'ll be worth it," She says as you dig into your pocket for the cash.</p>');
		Place = 182;
		setQueryParams("type=extortion");
	}
	else if (nR == 10900)
	{
		setPersonFlag("DoctorKay", 4);
		setPlaceFlag("Hotel", 12);
		bChatLeft = Place != 124;
		if (isDay()) {
			addComments(
				'You ask Bambi.</p>' +
				'<p>“Is there any news from around town or any new arrivals at the hotel that are worth knowing about?”</p>' +
				'<p>“Well, there is the new nurse of course, she is staying here in Room 205 but she is not here that often. I believe during the day she is covering for the High School nurse and if not she’s normally at the Hospital or Pool.”'
			);
		} else {
			addComments(
				'You ask Bambi,</p>' +
				'<p>“Is there any news from around town or any new arrivals at the hotel that are worth knowing about?”</p>' +
				'<p>“Well, there is the new nurse of course, she is staying here in Room 205 but she is not here that often. I saw her walk out of the hotel not long ago but I don’t know where she went.”'
			);
		}
	}

	return true;
}

// Initialise
function initialiseBambi()
{
	// Bambi
	addPerson("Bambi", 124, "Bambi", '', false);
	per.Replies = RepliesBambi;

	per.getYourNameFor = function() { return perYou.getLord(); };
	per.getPersonName = function(full) {
		if (full === true) return "Bambi";
		return this.isCharmedBy() ?  "Slave Bambi" : "Bambi, the Barmaid";
	};

	per.isPersonInfo = function() { return this.isCharmedBy();	};
	per.getPersonInfo = function() {
		if (Place == 161 && this.checkFlag(7)) {
			return this.addPersonString("bambiguard1.jpg", "height:max%", "right") +
				"Bambi became a loyal soldier in your regiment of slaves. She explained that she knows that the Hotel will be an important place in your quest. The cunning redhead reassured you that she feels stupid that she tried to outsmart you and understands now that resistance against you is futile. Bambi is a smart lady and has a great deal of information about Davy that she is ready to give you anytime you wish. She told you that Davy is regularly visiting the Hotel for reasons still unknown. She already tried to seduce him, but Davy wasn’t interested in her which is strange because not many people can resist the charms of Bami.<br><br>" +
				"Bambi is watching over your slaves in the dungeon. She acknowledges your presence and offers you a riding crop to use on a slave\'s ass.<br><br>" +
				'"How can I serve you ' +  perYou.getLord() + '!?", she grins mischievously.';
		}
		return this.addPersonString("bambi11a.jpg", "height:max%", "right") +
			"Bambi became a loyal soldier in your regiment of slaves. She explained that she knows that the Hotel will be an important place in your quest. The cunning redhead reassured you that she feels stupid that she tried to outsmart you and understands now that resistance against you is futile. Bambi is a smart lady and has a great deal of information about Davy that she is ready to give you anytime you wish. She told you that Davy is regularly visiting the Hotel for reasons still unknown. She already tried to seduce him, but Davy wasn’t interested in her which is strange because not many people can resist the charms of Bami.<br><br>" +
			"Bambi is standing behind the bar table serving drinks to guests. She acknowledges your presence and guides you to a free chair. She runs a hand through your shoulders and back, but quickly returns to other side of the bar table so no one can see your intimate moment with her.<br><br>" +
			'"How can I serve you ' +  perYou.getLord() + '!?", she grins mischievously.';
	};

	per.getPersonAddress = function() { return this.isCharmedBy()  ? 'Broken In Hotel' : ''; };

	per.getPossessionFace = function() {
		if (this.isCharmedBy()) return "bambi9";
		return "bambi8";
	};

	per.whereNow = function()
	{
		if (Place == 182) return Place;
		if (this.place == 124 && this.checkFlag(7) && !isDay()) {
			var p = findPersonNC("Jessica");
			var nSlaves = p.whereNow() == 161 ? 1 : 0;
			if (perDavy.whereNow() == 161) nSlaves++;
			if (nSlaves > 0) return 161;		// Bambi is on night guard duty
		}
		return this.place;
	};

	per.passTimeDay = function() {
		this.setFlag(12, false);		// reset visit gym today
		this.setFlag(15, false);		// reset ask about Mia
		return '';
	};

	// Popup evets for Bambi
	per.showEventPopup = function()
	{
		if (sType !== "") return false;
		
		var be;
		
		if (Place == 124 && this.dress === "") {
			showPopupWindow("Where is the person in charge",
				"<img src='Images/People/Bambi/bambipick.jpg' class='imgpopup' alt='Who'>" +
				"You look around for the barmaid or anyone else in charge. You see two people near the bar who could be.</p>" +
				'<p>One is a slim figured young woman in a black, slightly inappropriate dress. You hear her say something, possibly she has an Australian accent?</p>' +
				'<p>The other has larger breasts and is wearing a top and shorts, also inappropriate. You definitely hear an American accent in her voice.</p>' +
				'<p>Which one do you approach?' +
				addOptionLink("string", 'the slim figure', "findPerson('Bambi').dress='Kiki';bPopupShown=false;dispPlace(124,'','As you approach you see the other your woman leave, she must have been a customer. It sounds like she is leaving the hotel and Glenvale')", "chatblock", "width:30%;margin-left:10%") +
				addOptionLink("string", 'the full figure', "findPerson('Bambi').dress='Jessica';bPopupShown=false;dispPlace(124,'','As you approach you see the other your woman leave, she must have been a customer. It sounds like she is leaving the hotel and Glenvale')", "chatblock", "width:30%;margin-left:10%"),
				'', '', true, true, true
			);
			return true;
		}
		
		// Futa reaction
		if (Place == 182 && !this.checkFlag(18) && perYou.isFuta(true) && !perYou.isBornMale()) {
			this.setFlag(18);
			be = this.checkFlag(16) ? "be" : "";
			showPopupWindow("Bambi and Your Changes",
				this.addPersonString("bambi5" + be + ".jpg", "height:max%", "right") +
				'“My lady... this is fascinating...” Bambi is more curious than surprised when you unpack your new cock before her and quickly falls onto her knees for a close examination.</p>' +
				'<p>“Clearly a man\'s tool, and yet...” You feel her fingers caress the hardening meat before sliding between your legs and entering your folds. “You are still a woman...”</p>' +
				'<p>You drive your fingers through her hair as she examines you, and when you ask if it gives her any good ideas, her eyes light up.</p>' +
				'<p>“Plenty, my Lady. I have had she-males and transsexuals among my clients, but never anything like this...” Her lips trail over the tip while her fingers drive deeper into your folds, luring a soft moan from your lips. “There is much to discover about this. Your body most likely reacts different to stimuli now, and I would love to... no, I can not possibly ask that off my lady, but maybe...</p>' +
				'<p>Bambi\'s mind has trailed off thinking about everything she could be doing with someone like you, and you have to remind her that you are still in the room to get her to focus again.</p>' +
				'<p>“I apologize my lady.” She bows her head in shame. “Whenever you have time, please come by so that I may learn how to best serve you now.”'
			);
			return true;
		}

		if (this.isCharmedBy() && Place == 123 && !this.checkFlag(1)) this.setFlag(1);

		// Ask about helping Jessica in the Cellar
		if (this.isHere() && this.isCharmedBy()){
			be = this.checkFlag(16) ? "-be" : "";
			var perJessica = findPerson("Jessica");
			if (perJessica.getRivalry() > 0 && !checkPlaceFlag("Hotel", 9)) {
				var s = this.addPersonString("bambi11b.jpg", "height:max%", "right") +
					"You speak to Bambi and ask her to secure the cellar, and let no one into it except for yourself.";
				if (!perJessica.isRival()) {
					s += "<br><br>You also tell her about Jessica who is bound and chained there and ask her to look after Jessica while you sort out how to free her.<br><br>Bambi smiles,<br>" +
						'"Of course, everyone needs a slave in a basement. I will take care of her with all my skill. This is an opportunity to tidy and refit the cellar for a better use."';
				}
				showPopupWindow("Bambi and the Cellar", s, "setPlaceFlag('Hotel', 9);");
			}

			if (isDavyDefeated() && perDavy.place != 184 && !this.checkFlag(9) && !checkPersonFlag("Anita", 6) && checkPersonFlag("Anita", 8)) {
				// Anita has been here and moved/killed Davy
				this.setFlag(9);
				if (perDavy.isDead()) {
					// Killed him
					showPopupWindow("Anita is here?",
						this.addPersonString("bambi11b.jpg", "height:max%", "right") +
						'You are curious about Davy and Anita and head towards the hotel room Davy is in but Bambi stops you respectfully,</p>' +
						'<p>"' + this.getYourNameFor() + ', if you are after the guest Davy Robbins, he is no longer in the room. I noticed recently when I checked on him that he was gone, but I cannot locate him. I was about to call you, even though I know I would disappoint you with my failure.</p>' +
						'<p>A strange young woman was at the bar recently, I suspected she may of been one of your servants but she did not want to talk, she just had a few drinks and then left sometime later.</p>' +
						'<p>I am sorry ' + this.getYourNameFor() + ', please punish me for allowing him to escape, I can suggest many interesting ways of punishment and offer a wide range of tools?"</p>' +
						'<p>You realise Anita has taken Davy somewhere, you are just not sure where? You reassure Bambi that she has done well as always and that the young woman was working on your orders. Bambi looks disappointed, commenting that you can still punish her if you wish, now to reward her for doing well!'
					);
					MoveAnitaToBedroom();
				} else {
					// moved him to cellar
					movePerson("Anita", 161);		// Move Anita to the cellar
					movePerson("Davy", 161);		// Move Davy to the cellar
					var be = this.checkFlag(16) ? "be" : "";
					showPopupWindow("Anita is here?",
						this.addPersonString("bambi18" + be + ".jpg", "height:max%", "right") +
						'You are curious about Davy and Anita and head towards the hotel room Davy is in but Bambi stops you respectfully,</p>' +
						'<p>"' + this.getYourNameFor() + ', if you are after the guest Davy Robbins, your servant Anita visited recently to guard him. I made some suggestions of a more effective way to watch over him and I have give her a change of clothing and some useful equipment. They are downstairs in the cellar"</p>' +
						'<p>She gestures, "If you would wait a few minutes ' + this.getYourNameFor() + ' I will check and then take you to them." You agree and she ' +
						(!checkPlaceFlag("Hotel", 9) ? 'hesitates and says "' + this.getYourNameFor() + ' I did some improvements to the cellar that would improve the experience, I hope that meet your approval.' : 'leaves.') +
						'</p><p>A little while later one of the other staff tells you Bambi would like to see you. This does remind you that Bambi is not the only employee here, but there is no time so you head down to the cellar...',
						'dispPlace(161)'
					);
				}
				return true;
			}
		}
		return false;
	};

	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("poledance", this.dress == "Kiki" ? 3 : 1);
		addPlaceTitle(md, "Bambi\'s Dance");
		md.write(
			'<p>Bambi expertly takes the stage, this is something she is very familar with and has done many times before.</p>' +
			'<p>Bambi is athletic, agile and erotic, everything you would hope from an exotic dancer. Furthermore she very much appears to enjoy dancing her for you and the audience!</p>' +
			'<p>After she collects her tips and offers them to you, but you know Jade has a performance fee for you, and you feel Bambi earned them!</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);	
	};

	// events for Bambi
	per.showEvent = function()
	{
		var md, be;
		
		if (Place == 269 && sType == "bambipool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			be = this.checkFlag(16) ? "be" : "";
			this.showPerson("bambi-pool" + be + ".jpg");
			addPlaceTitle(md, "Swimming with Bambi");
			md.write(
				'<p>Bambi arrives, dressed in a striped bikini, and she seductively poses for you, "' + this.getYourNameFor() + ' like what you see?"</p>' +
				'<p>You swim for a little with Bambi, but you can clearly see that she is more interested in something else more private.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=bambipoolsex');
			addLinkToPlaceC(md, 'say goodbye to Bambi', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "bambipoolsex") {
			md = WritePlaceHeader(false, 'td-left-large');
			this.showPerson("bambi-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Bambi");
			md.write(
				'<p>Bambi knows all the private places here, so you retire to a discrete place for some pool-side alone-time with your lovely bar-maid.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Bambi', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 267 && sType == "kateko101") {
			// Broken Inn Hotel – Bambi's Room [Tried to Charm Kate after defeating Davy – and she KO'd you]
			md = WritePlaceHeader();

			if (!perDavy.checkFlag(2))
			{
				nMoney = nMoney > 0 ? 0 : nMoney;	//Kate takes ALL your cash
				AddCash(0);  //Refresh the cash counter
				perDavy.setFlag(2);

				if (perDavy.getPathHellgate() === 0) {
					//Haven't started the Hellgate Path yet
					perDavy.setPathHellgate(1);  //Start it...  alternative start to the Hellgate path in case you didn't get shot
				}

				showPopupWindow("", '::THUD:: Did someone get the license number of that TRUCK!?!', '');
			}

			if (this.isCharmedBy()) this.showPerson("bambi9.jpg");		//Bambi is CHARMED
			else addPlaceImage(md, "hotel5.jpg", "", "", "Hotel Room");

			if (this.isCharmedBy()) {
				// Bambi is charmed
				addPlaceTitle(md, "Waking up in Bambi\'s Arms");
				md.write(
					'<p>You hear the soft voice of your slave Bambi as she caresses your head.</p>' +
					'<p>"There, there, ' + this.getYourNameFor() + '," She says, concern in your voice.  "I was about to call an ambulance, are you alright?"</p>'
				);
			} else {
				// No she is not
				addPlaceTitle(md, "Waking up in an empty room");
			}
			md.write(
				'<p>Your head is throbbing and you are fairly sure that there is a very large <i>bump</i> on the back of your head for a while.</p>' +
				'<p>Evidently Kate made good on her threat.  <i>Man she can hit hard!</i> You think to yourself.</p>' +
				'<p>A few moments later you realize Kate did more than just sock you with a book...  it would seem she liberated your cash from your pocket before she left.</p>' +
				'<p><i>Either that, or Davy did.</i> You think, realizing that Davy is no longer in the room either.</p>'
			);

			startQuestions();
			if (this.isCharmedBy()) addLinkToPlace(md, "take Bambi to her room for a little <i>tender loving care</i>", 182);	//Bambi is Charmed
			addLinkToPlace(md, "head back to the Hotel Bar", 124);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 161 && this.whereNow() == 124 && isDavyDefeated() && perDavy.place != 184 && this.checkFlag(9) && !checkPersonFlag("Anita", 6)) {
			// Anita is here and moved Davy
			setPersonFlag("Anita", 6);
			md = WritePlaceHeader(false, "td-left-med");
			perDavy.showPerson("davycellar.jpg");
			addPlaceTitle(md, "Davy in the Cellar");
			if (!checkPlaceFlag("Hotel", 9)) {
				setPlaceFlag("Hotel", 9);
				md.write(
					'<p>You descend the stairs into the cellar and you see Bambi has arranged a quick refit so it is more a dungeon of some sort of BDSM fantasy. You are always surprised at the skill and depravity of Bambi.</p>'
				);
			} else md.write('<p>The cellar or more accurately now the hotel dungeon is mostly dark, but with spot lighting on selected areas and people.</p>');

			md.write(
				'<p>You see Davy securely bound and gagged against one wall of the cellar. Standing in front of him are Bambi and Anita dressed in revealing leather outfits, a fantasy of dominatrix pleasures. Bambi you have no doubt has such an outfit, but Anita? Then you realised, of course Bambi has loaned Anita something from her collection.</p>' +
				'<p>Bambi greets you "' + perYou.getLord() + ' your servant Anita is somewhat lacking in skills to properly restrain and punish your slave here. I will train her with all my skill to become the best possible guardian of your slave."</p>' +
				'<p>Anita asks you "Are you sure ' + (perYou.isBornMale() ? 'Sir' : "Ma'am") + ' that this is what you want? Surely it would be simpler to beat him and then...", you stop her,</p>' +
				'<p>"No soldier! I want him here and controlled, not tortured. In all matters of guarding your prisoner you will obey Bambi, she is your superior for this duty." Anita salutes you and address Bambi,</p>' +
				'<p>"Ma\'am I am your to command!", you notice a mischievous glint in Bambi\'s eye and you caution her "Bambi, for this duty, remember that"</p>' +
				'<p>"Of course ' + perYou.getLord() + '", but you know how "imaginative" she is so you will have to check on things here occasionally.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'check the rest of the cellar dungeon', 161);
			addLinkToPlace(md, 'go back up to the hotel bar', 124);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 182 && sType == "extortion") {
			// Bambi's extortion
			md = WritePlaceHeader();
			
			this.showPerson("bambi10.jpg", "height:max");
			addPlaceTitle(md, "Bambi");

			md.write(
				'<p>Bambi takes your money, then begins a seductive strip tease. ' +
				'&quot;Well here are the twins, ' + perYou.getPersonName() + ',&quot; she says, removing her top.</p>' +
				'<p>She stops dancing. &quot;Now that you have a taste for what I can give you, how about five hundred for the rest?&quot;</p>' +
				'<p>"You\'ve got to be are kidding me!" you reply. "I have to get out of here."</p>'
			);

			if (isItemNotHere(6, 182) && nMana < 50) PlaceI(6, 182);		// Stone NOT here, and don't have one in inventory
			if (whereItem(6) == 182) md.write('<p>As you turn to leave you see something on the floor, a stone being used as a door-stop.</p>');

			//****************************************************************
			startQuestions();
			addLinkToPlace(md, "go to the bar", 124);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 182 && sType == "talkmia1") {
			// Discussing Mia (first encounter)
			md = WritePlaceHeader();

			this.setFlag(15);
			this.showPerson("bambi19" + (this.checkFlag(16) ? "be" : "") + ".jpg");
			addPlaceTitle(md, "Bambi\'s Request");

			this.showPersonAnon("bambimother.jpg", "25%", "right");
			md.write(
				'<p>You ask Bambi about her message and the other familiar woman, and she gestures for you to follow. She takes you to her private room and as usual starts to remove her clothing. To your surprise she is not stripping for your pleasure but to change her clothing. Well also for your delight but not as the main reason. She gestures at the picture of her mother and herself you have noticed before, and you almost smack yourself. The woman in the SMS message is Bambi\'s Mother! Bambi addresses you in her customary respectful fashion,</p>' +
				'<p>"' + perYou.getLord() + ' I see you recognise her now. My mother Mia is visiting town and I have been trying to convince her to stay here in town. She is a free-spirit, a wanderer who never stays long in one place, earning her way as a model, a dancer, a waitress and other odd jobs. She does not do the sort of work I do aside from my work at the bar, though her dancing can be quite \'exotic\' if you know what I mean."</p>' +
				'<p>You take that to mean she does some stripping but does not prostitute herself. Bambi continues dressing, putting on some characteristically skimpy clothes that could be considered athletic, hot pants and a bikini type top, but tight enough for athletic wear. Bambi continues,</p>' +
				'<p>"Of course ' + perYou.getLord() + ' you want us to become your incestuous mother/daughter sex slaves, something I welcome eagerly! My mother has danced with me in the past but nothing more despite a cautious suggestion I made."</p>' +
				'<p>She finishes dressing and looks at you with some determination in her eyes,</p>' +
				'<p>"I will now take you to her, we are meeting at the Gym to workout together, and it is your right to take her then and there. Except, please I ask you to delay for a while. I want to spend some time to convince her to stay here of her own free will, to be with her daughter. I can promise you payment to delay, just for one week ' + perYou.getLord() + '. I can train and guard your slaves in the dungeon'
			);
			if (wherePerson("Anita") == 161) md.write(' allowing your slave Anita to attend you in your bed');
			md.write(
			 '. While teaching your slaves how to better serve you my mother can tend the bar. ' + perYou.getLord() + ' these are yours no matter what, I am your loyal servant, but again please give me the time?"</p>' +
			 '<p>She is determined, but she will also serve you even if you take her mother immediately. Still, can delaying a week hurt? She gestures towards the door and says one last thing,</p>' +
			 '<p>"Shall we leave for the Gym, I have called a taxi to take us there. Before we go, there is one more thing, my mother does own a small gem, set in a ring, that is said to have once been owned by the Warlock Kurndorf. It will be yours once she joins us"</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'follow her to the Gym', 435, 'type=bambimiagym1');
			addLinkToPlaceC(md, '"Not now Bambi', 124, '', 'You tell Bambi you will think about it and will meet her another time. Bambi looks disappointed but redresses and returns with you to the bar');
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 182 && sType == "talkmia2") {
			// Discussing Mia (later encounters)
			md = WritePlaceHeader();
			this.setFlag(15);
			var perMia = findPerson("Mia");
			var dc = Math.floor((nTime - perMia.charmedTime) / 288);		// Days since arrived, 1 = AFTER one day
			if (!checkPersonFlag("Mia", 6) && dc < 7) dc = 1;
			else if (dc == 1 && checkPersonFlag("Mia", 6)) dc = 2;
			be = this.checkFlag(16) ? "be" : "";
			setPersonFlag("Mia", 6);
			switch (dc) {
				case 1:
					// Mandatory first conversation
					this.showPerson("bambi17" + be + ".jpg");
					addPlaceTitle(md, "About Bambi\'s Mother");
					md.write(
						'<p>You ask Bambi about how things are going with her mother, she smiles,</p>' +
						'<p>"Do not worry, she will be your slave soon enough"</p>' +
						'<p>You explain you were not just asking about <i>that</i>, and Bambi smiles again,</p>' +
						'<p>"' + this.getYourNameFor() + ' I know, I was just kidding. Having my mother around has put me in a good mood!"</p>' +
						'<p>You ask her to tell you some more about Mia. Bambi replies,</p>' +
						'<p>"Mia has always been a free-soul, care-free and uninhibited, a flower-child in spirit if not in actual time. As a mother she was the \'cool mom\' laying few restrictions on me. I love her but she seldom stays in one place for long, easily getting tired of experiences, jobs, people."</p>' +
						'<p>You ask about her jobs, how Bambi had mentioned dancing and modeling?</p>' +
						'<p>"Mia has done a range of exotic dancing, mainly burlesque and stripping. She has modeled in glamour and soft-nude type shoots."</p>' +
						'<p>You talk a little more to Bambi but nothing more important is discussed.</p>'
					);
					break;
				// Rest are day dependent
				case 2:
					this.showPerson("bambi17" + be + ".jpg");
					addPlaceTitle(md, "About Bambi\'s Mother");
					md.write(
						'<p>You ask Bambi about how things are going with her mother, she smiles,</p>' +
						'<p>"Do not worry, she will be your slave soon enough"</p>' +
						'<p>You explain you were not just asking about <i>that</i>, and you talk a little more to Bambi but nothing more important is discussed.</p>'
					);
					break;
				case 3:
					this.showPerson("miabambi3.jpg");
					addPlaceTitle(md, "Bambi and Mia");
					if (Place == 124) md.write('<p>You ask Bambi about how things are going with her mother, and with a smile suggest you discuss this in her room. She takes your hand and when you get there you ask again, ');
					else md.write('<p>You ask Bambi about how things are going with her mother, and she smiles, ');
					md.write(
						'and then you hear a voice from another room,</p>' +
						'<p>"Nosy one isn\'t ' + perYou.getHeShe() + ' Bambi?"</p>' +
						'<p>Bambi calls out "Yes Mum, but no more than you are!", and Mia steps out of the bathroom and joins the two of you.</p>' +
						'<p>Bambi explains, "Mum is just visiting to catch up a bit". You have a chat with them both, but find out very little, but have a pleasant time with the mother and daughter pair.</p>'
					);
					break;
				case 4:
					this.showPerson("miabambi2.jpg");
					addPlaceTitle(md, "Happy Birthday");
					if (Place == 124) md.write('<p>You ask Bambi about how things are going with her mother, and with a smile suggest you discuss this in her room. As you approach her room, ');
					else md.write('<p>');

					md.write(
						'<p>Bambi explains Mai is here again, it is Mia\'s birthday and she start to remove her clothing. You look at her curiously, and puts a finger to her mouth to say "not now"</p>' +
						'<p>You follow her into the bedroom and Mia is sitting on the bed with some packages, and Bambi joins her. Mia notices you and says "Hi there, Bambi said you might join us"</p>' +
						'<p>They start opening the presents and you see it is lingerie, underwear and some sex-toys. Mia grins, "Gifts we can all enjoy. Maybe sometime I\'ll model them for you". She glances at Bambi she smiles and says "Go for it, why not now?"</p>' +
						'<p>Mia seems to consider it, but shakes her head, "Not now, another time", and changes the subject. Not long later she excuses herself and leaves. Bambi explains,</p>' +
						'<p>"Mum avoids anything overtly sexual with me around, such a shame!". You otherwise leave things there for now!</p>'
					);
					break;
				case 5:
					this.showPerson("bambi17" + be + ".jpg");
					addPlaceTitle(md, "About Bambi\'s Mother");
					md.write(
						'<p>You ask Bambi about how things are going with her mother, she smiles,</p>' +
						'<p>"Do not worry, she will be your slave soon enough"</p>' +
						'<p>You explain you were not just asking about <i>that</i>, and you talk a little more to Bambi but nothing more important is discussed.</p>'
					);
					break;
				case 6:
					this.showPerson("miabambi1.jpg");
					addPlaceTitle(md, "Mother and Daughter");
					if (Place == 124) md.write('<p>You ask Bambi about how things are going with her mother, and with a smile suggest you discuss this in her room. As you approach her room, ');
					else md.write('<p>');
					md.write(
						'<p>Bambi explains Mai is here again, and as she does Mia steps out, completely naked. As you look appreciatively you see out of the corner of your eye Bambi stripping, and then she joins her mother. Before you a pair of beautiful women, all the more attractive as they are mother and daughter.</p>' +
						'<p>You hope this will lead somewhere physical, but Mia shakes her head gently, and you know this still means "not with Bambi". Still they remain completely naked and sit down and expect you to have a pleasant chat with them, not mentioning why the nakedness.</p>'
					);
					break;
				default:
				case 7:
					this.showPerson("bambi17" + be + ".jpg");
					addPlaceTitle(md, "About Bambi\'s Mother");
					md.write(
						'<p>You ask Bambi about how things are going with her mother, she smiles,</p>' +
						'<p>"' + this.getYourNameFor() + ', thank you, I have had enough time. I was unable to convince my mother to stay in town. Please will you make her your slave so she stays here?"</p>' +
						'<p>You ask about the promised reward, and she says she will give it once Mia is your slave.</p>'
					);
					if (!isPlaceKnown("MiasApartment")) {
						setPlaceKnown("MiasApartment");
						md.write('<p>She continues, "My mother has an apartment on Celeste Rd" and she gives you the address. "You could visit her there to \'convince\' her to stay"</p>');
					}
					break;
			}
			startQuestions();
			addLinkToPlace(md, 'talk to Bambi about other things', 182);
			WritePlaceFooter(md);
			return true;
		}

		if (this.isHere() && sType == "transformbreasts") {
			// BE Transformation
			CastTransform(1);
			md = WritePlaceHeader(true, '', 'black');
			if (!this.checkFlag(16)) {
				this.setFlag(16);
				showPopupWindow("Transformation",
					'<img src="Images/GenericSex/be c.gif" style="width:50%;float:left;margin-right:6px;margin-top:1em;margin-bottom:2em" alt="BE">' +
					'<p>You cast the spell and Bambi groans, "Ah ' + perYou.getLord() + ' what is this?" and pulls apart her top. You see her breasts swelling, growing larger and larger, her modest sized breasts growing to quite large.</p>' +
					'<p>As she groans you thought you heard some laughing, a customer elsewhere in the hotel maybe. Bambi sighs as her breasts stop growing, and she says, panting a little,<p>' +
					'<p>"' + perYou.getLord(true) + ' I am yours anyway, but I had always liked my breasts as they were. If I thought customers wanted more I would of sought augmentation. I know men prefer larger generally, but not all. Still, if you could do this on demand, you could make a fortune!."</p>' +
					'<p>A business doing magical augmentations? You do not think you could control the spell enough to do this reliably, and there is the question of mana. You look at Bambi, she seems to have recovered and accepted her new attributes, and is weighing up the possibilities.</p>'
				);
			} else {
				this.setFlag(16, false);
				showPopupWindow("Transformation",
					'<img src="Images/GenericSex/bs d.gif" style="width:50%;float:left;margin-right:6px;margin-top:1em;margin-bottom:2em" alt="BE">' +
					'<p>You cast the spell and Bambi groans, "Ah ' + perYou.getLord() + ' what is this?" and pulls apart her top. You see her breasts diminishing, smaller and smaller, her huge sized breasts diminishing to quite normal.</p>' + 
					"<p>As she groans you thought you heard some laughing, a customer elsewhere in the hotel maybe. Bambi sighs as her breasts stop diminishing, and she says, panting a little,<p>" + '<p>"' + perYou.getLord(true) + ' I am yours anyway, but I had always liked my breasts as they were! I know men prefer larger generally, but not all. Still, if you could do this on demand, you could make a fortune!."</p>' +
					"<p>A business doing magical augmentations? You do not think you could control the spell enough to do this reliably, and there is the question of mana. You look at Bambi, she seems to have recovered and accepted her old attributes back.</p>"
				);
			}
			setQueryParams("");
			WritePlaceFooter(md, '', true, true);
			return true;
		}

		return false;
	};

	// Questions for Bambi
	per.showPersonChat = function(bGeneral, md)
	{
		if (sType !== "" || !this.isHere()) return;

		var myLordB = this.getYourNameFor();
		var be = this.checkFlag(16) ? "-be" : "";

		if (Place == 124 && !this.isCharmedBy("You")) {
			// Bambi NOT CHARMED
			if (this.other === 0) {
				addPopupLinkC(md, 'introduce yourself to the barmaid', "Bambi",
					this.addPersonString("bambi11a.jpg", "height:max%", "right") +
					'"Well hello there, ' + myLordB + '.  My name\'s Bambi.  What would you like to drink ' + (isDay() ? "today" : "tonight") + '" She asks with a smile.<br><br>' +
					'You look at the barmaid, she is dressed rather scantily for a good quality hotel as you understand the \'Broken Inn Hotel\' is <b>now</b>. She spoke formally, she is an odd mixture of the polite and the erotic.<br><br>' +
					(isBritish() ? 'You could order a drink, but so far you have not really developed a taste for it' : 'You are not yet old enough to legally drink, but you could try to order a drink, you look old enough...hopefully') + '.<br><br>' +
					'As you consider you notice on one of the shelves a riding crop, you had not heard there was any horse riding in the immediate area. The barmaid notices your glance,<br><br>' +
					'"A gift from a grateful customer, for a lesson", so you ask her if she gives riding lessons. She smiles,<br><br>"Yes ' + myLordB + ', <i>riding</i> and also other lessons too"',
					false, "setPersonOther('Bambi', 1);dispPlace();"
				);
			}
			if (this.other == 1) addQuestionC(md, 'tell Bambi "Is there any way I could get to know you a little better?"', "Bambi", 10802);
			if (this.other == 5 && nMoney >= 100) {
				//Can slip her the money, and have enough to do so.
				addQuestionC(md, 'slip ' + sCurrency + '100 across the bar - "This enough?"', "Bambi", 10805);
			}
			return;
		}

		// Bambi is CHARMED
		// Common to 161,124
		if (Place == 161 || Place == 124) {
			addLinkToPlace(md, 'take your slave Bambi to her room', 182);
		}
		// Common 161,124,182
		if (Place == 161 || Place == 124 || Place == 182) {
			if (perDavy.checkFlag(5) && (!perDavy.checkFlag(7) && !perDavy.checkFlag(8))) {
				// Davy is unconscious
				addLinkToPlaceC(md, '"Can you help me with Davy"', 184, 'type=restrainlater');
			}
			if (perYou.checkInjury(5) && !perYou.checkInjury(8)) addQuestionC(md, 'ask Bambi what happened in the cellar', "Bambi", 922);
			if (Place != 124 && this.checkFlag(7) && !this.checkFlag(15) && !isCharmedBy("Mia")) addLinkToPlaceC(md, '"Bambi, how are things with your mother?"', 182, 'type=talkmia2');
			if (perGates.checkFlag(6) && !isPlaceKnown("AvernusClub")) {
				addQuestionR(md, '"Is there a gentleman\'s club in Glenvale?"',
					'You ask Bambi about the gentleman\'s club you were told about, it seems likely she would know given her side business entertaining customers. Bambi promptly answers,</p>' +
					'<p>"Of course, I used to work there reguarly as a dancer. I had a falling out with someone there, <font size="-1"><i>that bitch</i></font> so I no longer work there."</p>' +
					'<p>She gives you directions to the club, it is located in a side street off the shopping center. The club is open late at night until the early hours and is by invitation only. She quickly makes a phone call, and tells you,</p>' +
					'<p>"I still have friends there, you are now my personal guest for the club, you can visit any time you want"',
					"Bambi",
					"setPlaceKnown(\\'AvernusClub\\')" + (Place == 124 ? ";bChatLeft=false" : "")
				);
			}
			if (checkPersonFlag("Catherine", 10) && !checkPersonFlag("DoctorKay", 4)) addQuestionC(md, 'ask Bambi if there is anyone new around', "Bambi", 10900);
			// Moving Davy (fallback)
			var perAnita = findPerson("Anita");
			if (!isDay() && this.checkFlag(7) && isDavyCaptive() && perDavy.place == 184 && (perAnita.place == 9999 || perAnita.other >= 900 || (perAnita.checkFlag(8) && perAnita.place == 46))) {
				// Fallback to move Davy to the cellar
				addPopupLinkC(md, '"Could we do something different with Davy?"', "Relocating Davy",
					this.addPersonString("bambiguard2.jpg", "height:max%", "right") +
					"You decide ask Bambi about doing something else with Davy, just leaving him in a hotel room seems a bit risky. You both go into the room with Davy and Bambi suggests moving him to the cellar, and how she could take care of him there now Mia is around to help out.</p>" +
					'<p>You both take Davy down to the cellar and Bambi secures him in this, well a dungeon than a cellar now.',
					false, 'movePerson("Davy",161);setPlaceFlag("Hotel",9);dispPlace(161);', undefined, "background-color:white;color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;"
				);
			}
			// Jessica
			var perJessica = findPerson("Jessica");
			if (perJessica.whereNow() == 183 && !this.checkFlag(17)) {
				addPopupLinkC(md, 'ask Bambi about Jessica', "Jessica",
					this.addPersonString("bambi11b" + be + ".jpg", "height:max%", "right") +
					'“The lovely Slavegirl you had tied up in the cellar?” Bambi\'s eyes lighten up. “She asked for some privacy to prepare something and get dressed, so I had Marisa guide her to Room 049.” She gives you the spare key.</p>' +
					'<p>“But...” Bambi hesitates for a moment, biting her lower lip. “Are you really letting her go, My ' + perYou.getLord() + '?”</p>' +
					'<p>“I have come enjoy the sight of her chained body when I come down to tend to her... and quite frequently masturbated to the fantasy of finally being allowed to train her into a perfect little toy for you.”' +
					addLinkToPlaceC("string", 'tell her that you will see if you can find a suitable replacement for her', 124, '', '&quot;You are spoiling me My ' + perYou.getLord() + '.&quot; Bambi grins mischievously. &quot;If there is anything you require, or if you change your mind and need her restrained again, just call me over.&quot;', "Bambi", "bChatLeft=false;setPersonFlag('Bambi',17)", "width:50%;margin-left:10%") +
					addLinkToPlaceC("string", 'ask your <b>slave</b> if she is questioning your decisions.', 124, '', '&quot;Of course not My ' + perYou.getLord() + '.&quot; Bambi eyes widen in horror at the thought that she might have displeased you. &quot;I apologize for my words and fully defer to your judgment.&quot;', "Bambi", "bChatLeft=false;setPersonFlag('Bambi',17)", "width:50%;margin-left:10%"),
					false, '', true
				);
			}
			this.addDancingLink(md, 'talk to Bambi about dancing in the club',
				'You talk to Bambi about the Avernus club, realising she will know about the club already. In particular you as her about dancing there,</p>' +
				'<p>&quot;Of course ' + myLordB + ' I have before and I am pleased you want me to dance for you!&quot; and with that you call Jade to arrange a dance for Bambi. Unsurprisingly Jade is familiar with Bambi and welcomes her dancing anytime.'
			);
		}
		// Bar only
		if (Place == 124) {
			if (this.checkFlag(11) && wherePerson("Mia") === 0) addLinkToPlaceC(md, '"Bambi, about your message?"', 182, 'type=talkmia1');
			else if (this.checkFlag(7) && !this.checkFlag(12) && isShopOpen(4, 2, true)) addLinkToPlaceC(md, '"Bambi, do you plan to go to the Gym today?"', 435, 'type=bambimiagym2');
		}
		// Her bedroom only
		else if (Place == 182) {
			if (this.checkFlag(1) && !this.checkFlag(2)) addLinkToPlaceC(md, 'ask Bambi about her career', 182, 'type=bambichat1');
		}
	};

	// Text in a location
	per.showPersonTextHere = function(md)
	{
		if (Place == 124 && this.isHere()) {
			if (this.other === 0) md.write('<p>At this time of the day there are only a few patrons at the bar. The barmaid ' + addVisible('welcomes you to the hotel and asks what you would like', 'is serving some customers') + '.</p><p>');
			else md.write('<p>At this time of the day there are only a few patrons at the bar.' + addVisible(' Bambi welcomes you to the hotel and asks what you would like.') + '</p><p>');
		} else if (Place == 161 && this.isHere() && perDavy.isHere() && sType === "") {
			if (wherePerson("Anita") == 161) md.write('<p>Your rival Davy is bound against one wall, guarded by your loyal slaves Bambi and Anita.</p>');
			else md.write('<p>Your rival Davy is bound against one wall, guarded by your loyal slave Bambi.</p>');
		}
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Examining the Soul Bound Crystal
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere()) {
					if (this.dress != "Kiki") examineItem(no, 'The ' +  s + ' trembles weakly, you suspect it might be possible but not for <i>this</i> Bambi, whatever that means...');
					else if (!this.isCharmedBy()) examineItem(no, 'The ' +  s + ' trembles weakly, you suspect you need a magical link to Bambi before it will work.');
					else if (Place != 182) examineItem(no, 'The ' +  s + ' trembles slightly, maybe it would react better in another location with Bambi.');
					else examineItem(no, 'The ' +  s + ' vibrates softly the closer you get to Bambi.');
					return "handled";
				}
			}
		}

		// Casting the charm spell
		else if (no == 14 && cmd == 2) {
			// In her room
			if (Place == 133 || Place == 134 || Place == 182) {
				CastCharmSpell("Bambi", 135, 1);
				return "handled";
			}
		}

		// Casting the transform spell
		else if (no == 18 && cmd == 2) {
			// In her room or at the bar
			if (Place == 182 || (Place == 124 && this.isHere())) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her");
					return "handled";
				}
				if (this.dress != "Kiki") {
					addComments("The spell washes over her but nothing happens, you feel it could work, but not for <i>this</i> Bambi, whatever that means...");
					return "handled";
				}					
				if (Place == 124) {
					addComments("The spell washes over her but nothing happens, for some reason it does not work in such a public place as the bar.");
					return "handled";
				}
				if (!CastTransform(1, true)) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(Place, 'type=transformbreasts');
				return "nofooter";
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
			receiveCall('', 'While you could just walk out and talk to Bambi you call her anyway to invite her to join you at the pool for a swim, and she answers, "Yes ' + per.getYourNameFor() + ', I will take a break and join you.". A couple of minutes later she joins you..');
			gotoPlace(Place, 'type=bambipool');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	per.addPersonPhoneCall = function()
	{
		if (this.checkFlag(3)) {
			if (makeCall(true, 80)) {
				this.setFlag(3, false);
				this.setFlag(10);
			}
		}
		if (isDay() && this.checkFlag(4) && !this.checkFlag(11) && Place != 124 && Place != 133) {
			// Do you have a slave, if Davy is not there we need to wait until he cannot be there
			var perAnita = findPerson("Anita");
			if (perAnita.place == 161 || perAnita.place == 9999 || perAnita.other >= 900 || (perAnita.checkFlag(8) && perAnita.place == 46) || perDavy.place == 9999) {
				// Davy is moved or dead or fled, Anita is dead or fled, or you did not get Anita to do it
				var perJessica = findPerson("Jessica");
				var jr = perJessica.getRivalry();
				if (perJessica.isRival() || (!perJessica.isRival() && perJessica.getRivalry() < 0) || isDavyDefeated()) {
					// You have a slave in the cellar, Jessica (permanent) and/or Davy is alive | Davy cannot be moved there, start Mia story line
					if (makeCall(true, 81)) this.setFlag(11);
				}
			}
		}
		if (this.checkFlag(11) && this.checkFlag(7) && !this.checkFlag(13) && !isCharmedBy("Mia")) {
			if (Math.floor((nTime - per.charmedTime) / 288) > 6) {
				if (makeCall(true, 82)) this.setFlag(13);
			}
		}
		if (this.checkFlag(7) && !this.checkFlag(14) && this.whereNow() == 161 && Place != 161) {
			if (makeCall(true, 83)) this.setFlag(14);
		}

		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 80) return receiveSMS('Broken Inn Hotel', 'Congratulations you have been selected to receive a free nights accommodation at the historic Broken Inn Hotel. Our friendly staff will be happy to cater to all your needs. Ask about our wedding packages! ', 'hotel3.jpg');
		if (id == 81) return receiveSMS('DevotedBambi', this.getYourNameFor() + ' may I see you when you have some time? I have something to offer, in return for a small favour', 'bambisms1.jpg') +
									replyToSMS('Who is the woman with you Bambi, she looks familiar? A customer?') +
									receiveSMS('DevotedBambi', 'No, she can have anything I offer for free. She is what I want to discuss, but please, in person');
		if (id == 82) return receiveSMS('DevotedBambi', this.getYourNameFor() + ', thank you, it has been enough, she can be yours now', 'bambisms2.jpg');
		if (id == 83) return receiveSMS('DevotedBambi', 'Guarding can be so hot and hard, want to show me the ropes?', 'bambisms3.jpg');
		return '';
	};
	
	per.isSMSImageDressVersion = function(id) { return id != 80; };
}