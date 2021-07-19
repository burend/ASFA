/****************************************************************
						Janet Kelly
 ****************************************************************/
function RepliesJanetKelly(nR)
{
	var pCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 6800) // v68 = Janet Kelly Path
	{
		if (perKurndorf.getQuestCrypt() === 0) perKurndorf.setQuestCrypt(1); // Start the Crypt Location Plotline
		if (!isPlaceKnown("ShoppingCenter")) setPlaceKnown("ShoppingCenter");	// Know the Shops
		per.setFlag(2);

		if (!pCharm) addComments('"She didn\'t say, ' + myName + '. She went out to walk her dog and said that she had some shopping to do this evening. Maybe she has gone to the shopping centre."<br>');
		else addComments('"She didn\'t say, ' + myName + '. She went out to walk her dog and said that she had some shopping to do this evening. Maybe she has gone to the shopping centre.  Are you sure you wouldn\'t rather stay here?  I could show you my room... again."<br>');
	}
	else if (nR == 6801)
	{
		if (perKurndorf.getQuestCrypt() < 2) perKurndorf.setQuestCrypt(2); // Crypt Location Path
		per.setFlag(3);
		if (!pCharm) addComments('"No I haven\'t, but my great-grandmother\'s ancestors did a long time ago. Her name was Stears and she told us many stories about this town. Did you know that my ancestors were among the first settlers?"<br>');
		else addComments('"No ' + myName + ', I have never lived here before. My ancestors were among the first settlers of this town, though.  My grandmother told my sister and I many stories.  Her name was Mrs. Stears.<br>');
	}
	else if (nR == 6802)
	{
		per.setFlag(4);
		addComments('She smiles at you.  "Here I am telling you all about my family history and I know so little about yours.  What is your family like?" she asks, obviously avoiding the question.  Something tells you there is more to learn from this one.  If only there was a way to force her to talk.');
	}
	else if (nR == 6701) //v67 = Janet Kelly CHAMRED
	{
		perKurndorf.setQuestCrypt(5); // Crypt Location Path
		per.setFlag(5);
		addComments('"As you wish, ' + myName + '.  My mother told me that there was real magic in the Glenvale.  She said it was because the warlock, Kurndorf, was shot with a silver bullet at the old hotel."<br>');
	}
	else if (nR == 6702)
	{
		perKurndorf.setQuestCrypt(6); // Crypt Location Path
		if (!isPlaceKnown("Hotel")) setPlaceKnown("Hotel");	 // Hotel Location Known
		per.setFlag(6);
		addComments('"Yes ' + myName + '.  I heard that a witch betrayed the warlock. In revenge for this betrayal Kurndorf\'s spirit imprisoned the witch forever in the basement of the hotel.  I don\'t know if its true though; Debra and I already tried to find it and failed.  I\'m sorry ' + myName + '."');
	}
	else if (nR == 2716)
	{
		perKurndorf.setQuestSeance(17); // Sceance plot line
		addComments('"You might try the library, ' + myName + '," Janet says. She pauses, "I did sell some useless old papers and books recently to the Antiques Shop, I think one of them might of been about that."');

		if (pCharm) addComments(', her eyes adoring your every move. Could I show you my bedroom first?  Please, ' + myName + '?" she asks longingly.');
		else addComments('.');
		setPersonFlag("Victoria", 34);
	}
	return true;
}

function LeaveMinJanet(recharm)
{
	charmPerson('JanetKelly', 1);
	dispPlace(44, "");
	WriteComments('You leave the house and Janet to deal with the spell.<br/>She will be affected by the spell but you have chosen to not try to reinforce or guide her so the effect will be minimal.');
}


// Initialise Janet Kelly
function initialiseJanetKelly()
{
	// Janet Kelly
	addPerson("Janet Kelly", 112, "JanetKelly", '', false);
	per.Replies = RepliesJanetKelly;
	per.extra = [0, 0];		// expanded arbitrary data
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv == 4) return "Slave Janet";
		if (clv == 3) return "Janet, the bimbo";
		if (clv == 5) return "Janet, your pet pussy";
		if (clv == 2) return "Janet, your lover";
		if (clv > 0) return "Janet";
		return this.name;
	};
	per.getPersonTitle = function() {
		var clv = this.getCharmedLevel();
		if (clv == 2) return "your lover ";
		else if (clv == 3) return "your bimbo ";
		else if (clv == 4) return "your slave ";
		else if (clv == 5) return "your pet ";
		return "";
	};
	
	per.getPersonAddress = function() { return isPlaceKnown("KellyHouse") && this.checkFlag(1) ? '22 Kollam St, Glenvale' : ''; };
	
	per.whereNow = function() {
		if (Place == 113 || (Place == 44 && sType == "janetshowoff")) return Place;
		return this.place;
	};
	
	per.getPossessionFace = function() { return "janet-face"; };
	
	per.isPersonInfo = function() { return this.isCharmedBy(); };
	per.getPersonInfo = function() {
		if (this.getCharmedLevel() == 3) {
			return this.addPersonString("janetsmsbimbo3.jpg", "height:max%", "right") +
				"Janet has been dumbed down to a level of a complete slut. You played with her mind so much that you have successfully turned her your airhead bimbo. She craves for sex and can’t really think of anything else other that your \"godly huge penis\" as she likes to describe. Her clothes has changed too, she is wearing the classic bimbo outfit that comes with a lollipop to suck on.<br><br>" +
				"Janet jumps on you at the moment she sees you, pushing her boobs right in your face.<br><br>" +
				'"Like, ' + perYou.getMaster() + ', it\'s soo good to see you! Let me help ya relaxin’ a bit!", she smiles, her accent slightly resembles the typical texas one.';
		} else {
			return this.addPersonString("janet2.jpg", "height:max%", "right") +
				"Janet turned out to be a caring, loyal lover whose capability of emotions are much wider than you first thought. She still has some bimboness, but that’s her charm. She’s one of the very best in bed and also a great stress reliever, she can gives great massages to you. Now you can freely about her family’s history. It is why you have charmed her int he first place, right? Or was it her smoking hot body and tits? Never mind, she is yours forever now and open to you anytime, anywhere.";
		}
	};
	
	per.visitThem = function() {
		this.extra[1] = nTime;
		this.setFlag(7, false);
	};
	
	per.passTimeDay = function() {
		this.setFlag(9, false);
		return '';
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;
		
		if (Place == 44 && !checkPlaceFlag("KellyHouse", 2) && !this.checkFlag(1) && getPersonOther("Tracy") > 0) {
			// In Kollam St, have met Tracy, and have not met Janet, see the removal truck for the Kelly house
			setPlaceFlag("KellyHouse", 2);
			showPopupWindow("Removal Truck",
				addImageString("removals.jpg", "width:30%", "right") +
				"Interesting, you see a removal truck just up the road from your home, someone must be moving in to the house there. You can only see the workers doing the move, no-one else.</p>" +
				'<p>You will have to check out your new neighbours some other time!'
			);
			return true;
		}
		
		// Threesome invitation
		if (Place == 112 && this.isCharmedBy() && !this.checkFlag(8) && isCharmedBy("DebraKelly") && per.isHere()) {
			this.setFlag(8);
			var clv = this.getCharmedLevel();
			showPopupWindow("Janet and Debra",
				this.addPersonString("janetdebra-talk" + (isDay() ? "a" : "b") + ".jpg", "height:max%", "right") +
				"On entering the Kelly house you are greeted by a delightful scene, Janet and Debra naked and embracing each other. Janet explains,</p>" +
				'<p>"' + (clv == 3 ? 'Like, you know, Debra and I were talking about you and stuff you do with us apart, and we said, why not all of us do it together!"' :
							 clv == 4 ? perYou.getMaster() + ', Debra and I were talking about you, and we agree you can have us together anytime you want' :
							 clv == 5 && getCharmedLevel("DebraKelly") != 2 ? 'Debra and I want to be your pets together, and want you to play with us togther, Meow!' :
							 'Debra and I were talking and we both want you, we want you together or apart, but would prefer we are all together' + (clv == 5 ? ', Meow' : '')) +
				'"</p><p>Debra looks at her sister and you, smiling her complete agreement.'
			);
			return true;
		}
		
		return false;
	};
	
	per.showEvent = function()
	{
		var md, clv, myName, hJ, img;
		
		if (Place == 269) {
			if (sType == "janetpool") {
				WaitHereOnly(4);
				md = WritePlaceHeader();
				this.showPerson("janet-pool.jpg");
				addPlaceTitle(md, "Swimming with Janet");
				md.write(
					'<p>Janet arrives, dressed in a polka-dot bikini, and immediately jumps in for a swim. When she gets out, she gives you a very nice view!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=janetpoolsex');
				addLinkToPlaceC(md, 'say goodbye to Janet', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "janetpoolsex") {
				md = WritePlaceHeader();
				this.showPerson("janet-pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Janet");
				md.write(
					'<p>You ask Janet to play with you more privately, and she lies back exposing herself as an invitation for you to take her.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Janet', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 44) {
			if (sType == "janetshowoff") {
				this.setFlag(9);
				WaitHereOnly(6);				
				md = WritePlaceHeader();
				img = String.fromCharCode(Math.floor(Math.random() * 4) + 97);
				this.showPerson("showoff1" + img + ".jpg");
				addPlaceTitle(md, "Showing Off Your Bimbo Janet");
				md.write('<p>Bimbos should be happy to flaunt their body, for their pleasure and to arouse others. You talk to Janet bout going out for a while and tell her to put something skimpy on and she does not argue. The spell has her mind in bimbo-mode so this is perfectly normal for her and quite arousing too.</p><p>');
				switch(img) {
					case "a": md.write('Janet puts on a tiyy white bikini, and you go for a walk along Kollam Street, passing some of your neighbours and their parked cars.'); break;
					case "b": md.write('Janet wears done denim shorts and a bikini top, looking very \'Daisy Duke\' and you go for a walk with her towards the school.'); break;
					case "c": md.write('Janet puts on a sheer white top and shorts and you walk just to the front yard before she picks up the hose and playfully sprays you and her. The top clings to her and you can see she is not wearing any underwear at all.'); break;
					case "d": md.write('Janet puts on a sort of cheer-leader outfit, she could certainy of been one in the past. A string sports-bra would of been needed...'); break;
				}
				startQuestions();
				addLinkToPlace(md, 'have her show more', 44, 'type=janetshowoffmore&img=' + img);
				addLinkToPlace(md, 'return to the Kelly\'s home', 112);
				WritePlaceFooter(md);
				return true;
			}			
			if (sType == "janetshowoffmore") {
				md = WritePlaceHeader();
				img = getQueryParam("img");
				this.showPerson("showoff2" + img + ".jpg");
				addPlaceTitle(md, "Showing Off Your Bimbo Janet Even More");
				md.write('<p>Janet takes you meaning, removing some more of her clothing, not quite stripping naked. She could quickly redress if someone passes or you ask her, not that you are likely to...</p>');
				startQuestions();
				addLinkToPlace(md, 'return to the Kelly\'s home', 112);
				WritePlaceFooter(md);
				return true;
			}				
		}
		
		if (Place == 113) {
			myName = this.getYourNameFor();
			var herName = this.getPersonName();
			clv = this.getCharmedLevel();
			var bMan = perYou.isMaleSex();
			hJ = this.getPersonTitle();
			
			if (sType == "janetshower1") {
				this.setFlag(9);
				md = WritePlaceHeader();
				this.showPersonRandom("shower1", 2);
				addPlaceTitle(md, "Having a Shower with " + hJ + "Janet");
				md.write(
					'<p>You take Janet up on her offer and step into her en-suite bathroom, there is a shower, no bath here, Janet comments that Debra got the room with a bath as she prefers them.</p>' +
					'<p>Janet starts to remove her clothing, but she does it more as a strip-tease to your considerable pleasure. As she does you also remove your clothing, trying to also be entertaining for her, but Janet is much better, and better...endowed..for this!</p>' +
					'<p>Janet gestures for you to join her in the shower...</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'have a shower with Janet', Place, '', 'You have a shower with Janet, but little more than a little caressing and kisses are exchanged');
				addLinkToPlace(md, 'have Janet in the shower', Place, 'type=janetshowersex');
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == "janetshowersex") {
				md = WritePlaceHeader();
				this.showPersonRandom("shower2", 2);
				addPlaceTitle(md, "Having " + hJ + "Janet in the Shower");
				md.write(
					'<p>You join Janet in the shower, but you quickly realise she wants more than to get clean, more like she wants to get down and dirty!</p>' +
					'<p>You embrace her and a hot time of soapy large breast and asses follows as you passionately apply soap and other things to every part of Janet\'s body.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'get dressed and return to the bedroom', Place);
				WritePlaceFooter(md);
				return true;
			}				
			
			if (sType == "janetbj") {
				// Blowjob/lick
				if (bMan) {
					md = WritePlaceHeader(false, !isExplicit() ? 'td-left-large' : '');
					this.showPersonRandomRorX("home-bjb", isExplicit() ? 3 : 1);
					addPlaceTitle(md, clv == 3 ? "Oral on the Stairs" : 'Bedroom Blowjob');
					md.write('<p>You tell ' + herName + ' to use her mouth to pleasure you. She expertly takes your length into her mouth and you do not take long to release into her mouth. She swallows and lies back and says, ');
					if (clv == 3) md.write('"Like totally thanks ' + myName + '".</p>');
					else if (clv == 5) md.write('"Love you, meow!".</p>');
					else md.write('"I love you ' + myName + '".</p>');
				} else {
					md = WritePlaceHeader();
					this.showPersonRandomRorX("home-bjg", 2);
					addPlaceTitle(md, clv == 3 ? "Oral on the Stairs" : 'Oral in the Bedroom');
					md.write('<p>You tell ' + herName + ' to use her tongue to pleasure you and she does and she also starts to play with herself. To your delight and surprise she is an expert at pleasuring women and she makes you reach the peak of ecstasy quickly. After she lies back and says, ');
					if (clv == 3) md.write('"Neat!".</p>');
					else if (clv == 5) md.write('"Love you, meow!".</p>');
					else md.write('"I love you".</p>');
				}
				startQuestions();
				addLinkToPlace(md, 'talk more to Janet', Place);
				addLinkToPlace(md, 'go downstairs', 112);
				addLinkToPlace(md, 'exit the house?', 44);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "janetfuck") {
				// fuck her
				md = WritePlaceHeader(false, 'td-left-med');
				if (bMan) {
					this.showPersonRandomRorX("home-fuckb", 2);
					addPlaceTitle(md, clv == 3 ? "Sex on the Stairs" : 'Bedroom Sex');
					md.write('<p>You happily agree to take her and you sink you manhood into her delightful pussy, ramming into her over and over. You feel her shudder in her release and that is the final straw and you pour your passion into her depths.');
				} else {
					if (!isExplicit()) this.showPersonRandom("home-fuckb", 2);
					else this.showPersonRandomX("home-fuckg", 2);
					addPlaceTitle(md, clv == 3 ? "Sex on the Stairs" : 'Bedroom Sex');
					md.write('<p>You decide to explore ' + herName + '\'s body as you make each other experience peak after peak.');
				}
				if (clv == 3) md.write(' Afterwards Janet says "Like wow!".</p>');
				else if (clv == 5) md.write(' Afterwards Janet says "Meow!".</p>');
				else md.write(' Afterwards Janet kisses you and says "Love you..."</p>');

				startQuestions();
				addLinkToPlace(md, 'talk more to Janet', Place);
				addLinkToPlace(md, 'go downstairs', 112);
				addLinkToPlace(md, 'exit the house?', 44);
				WritePlaceFooter(md);
				return true;				
			}
			
			if (sType == "janettitfuck") {
				// tit fuck her
				md = WritePlaceHeader();
				this.showPersonRorX("home-tf" + (clv == 3 ? "b" : clv == 5 ? "c" : "a") + ".jpg");
				addPlaceTitle(md, clv == 3 ? "Breasts on the Stairs" : 'Bedroom Tits');
				md.write('<p>You decide to explore ' + herName + '\'s breasts as she uses them to masturbate your cock to a pleasurable climax.');
				if (clv == 3) md.write(' Afterwards Janet says "Like wow!".</p>');
				else if (clv == 5) md.write(' Afterwards Janet says "Meow!".</p>');
				else md.write(' Afterwards Janet kisses you and says "Love you..."</p>');

				startQuestions();
				addLinkToPlace(md, 'talk more to Janet', Place);
				addLinkToPlace(md, 'go downstairs', 112);
				addLinkToPlace(md, 'exit the house?', 44);
				WritePlaceFooter(md);
				return true;				
			}			
		}

		if (Place != 112) return false;

		if (sType == "charmjanet1") {
			// Charm Janet 1
			md = WritePlaceHeader();
			this.showPerson("janet2.jpg");

			addPlaceTitle(md, "Janet Under a Spell");

			md.write(
			  '<p>Janet falls under the spell. She starts to say something, then trails off after the first word, and shakes her head.</p>' +
			  '<p>She tries again and asks, "Do you want to take me upstairs?"</p>' +
			  '<p>What she really means is obvious. Everything says it: her gasping breaths, her stance, her gaze.</p>'
			 );

			startQuestions();
			addLinkToPlace(md, 'follow her up the stairs', 112, 'type=charmjanet2');
			addOptionLink(md, "exit the house", 'LeaveMinJanet(false)');			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmjanet2") {
			// Charm Janet 2
			md = WritePlaceHeader();
			this.showPerson("janet3.jpg");

			// default now to slave level charm
			this.charmThem(4);

			addPlaceTitle(md, "Janet Under a Spell");

			md.write(
			  '<p>Janet doesn\'t get farther than the top of the stairs. She turns to face you again. ' +
			  'By now her excitement is evident to anyone and she says,</p>' +
			  '<p>"Forget the bedroom!"</p>'
			 );

			startQuestions();
			if (perYou.checkFlag(26)) addLinkToPlaceC(md, '"You forget where your room is, don\'t you"', 112, 'type=charmjanet3', '', '', "charmPerson('JanetKelly', 3);");
			addLinkToPlaceC(md, '"Yes, I want you now too!"', 112, 'type=charmjanet3', '', '', "charmPerson('JanetKelly',2);");
			addLinkToPlace(md, "take her now", 112, 'type=charmjanet3');		
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmjanet3") {
			// Charm Janet 3
			md = WritePlaceHeader();
			clv = this.getCharmedLevel();
			this.showPerson("janet5.jpg");
			myName = this.getYourNameFor();

			addPlaceTitle(md, "Janet Under a Spell");

			if (clv == 2) {
				// Lover
				md.write(
					'<p>Passion overcomes the girl, causing her to fall to the ground. "Oh god!" she exclaims, holding the raging excitement in her stomach.</p>' +
					'<p>"I want you so much, and that you want me too is so <b>hot</b>" she says, the excitement building.</p>' +
					'<p>"Please make love to me ' + myName + '. I want you, I need you, so badly."</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'make love to Janet', 112, 'type=charmjanet4');

			} else if (clv == 3) {
				// Bimbo
				md.write(
					'<p>Passion overcomes the girl, causing her to fall to the ground. "What do you mean...my room..."</p>' +
					'<p>You quickly interrupt her "You don\'t remember, your sister looked after these things for you. After all you are more interested in your appearance, in being sexy than smart."</p>' +
					'<p>She looks confused as the spell reinforces your words, and also as it seems they are at least in some part the truth. She tries to deny your words,</p>' +
					'<p>"Well I like looking good, but it is not like I am some sort of..."</p>' +
					'<p>Again you interrupt her "A bimbo...a beautiful sexy woman who knows what is important in life, looking good and pleasing others"</p>' +
					'<p>She looks at you, "A bimbo...well I love being sexy and how others look at me...I suppose you could call me that...yes...I am a bimbo!!"</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'let your bimbo service you', 112, 'type=charmjanet4');


			} else if (clv == 4) {
				// Slave
				md.write(
					'<p>Passion overcomes the girl, causing her to fall to the ground. "Oh god!" she exclaims, holding the raging excitement in her stomach. "I feel like such a cheap slut, like <i>your</i> cheap slut, your whore, your... <i>slave</i>," she says, relishing the word as it rolls off her tongue.</p>' +
					'<p>"Please take me ' + myName + '. I want you, I need... to serve you, so badly."</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'order your slave to serve you?', 112, 'type=charmjanet4');
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmjanet4") {
			// Charm Janet 4
			md = WritePlaceHeader(false, "td-left-large");

			clv = this.getCharmedLevel();
			myName = this.getYourNameFor();
			hJ = this.getPersonTitle();
			var sJ = "order";
			if (clv == 2 || clv === 0) sJ = "ask";

			this.showPerson("janet6.jpg");
			addPlaceTitle(md, "Janet Under a Spell");

			if (clv == 2) {
				// Lover
				md.write(
					'<p>Janet sheds her clothes and embraces you willingly. You enjoy yourselves utterly.</p>' +
					'<p>Afterwards, she looks up at you happily. "We\'re lovers, ' + myName + '" she says declares.</p>'
				);

			} else if (clv == 3) {
				// Bimbo
				md.write(
					'<p>Janet sheds her clothes at your command and allows you to take her willingly. You enjoy yourself utterly.</p>' +
					'<p>Afterwards, she looks up at you happily. "I\'m like a bimbo, ain\'t I ' + myName + '" she says smiling.</p>'
				);

			} else if (clv== 4) {
				// Slave
				md.write(
					'<p>Janet sheds her clothes at your command and allows you to take her willingly. You enjoy yourself utterly.</p>' +
					'<p>Afterwards, she looks up at you happily. "I\'m yours, ' + myName + '. I belong to you now," she says again.</p>'
				);
			}


			startQuestions();

			if ((this.checkFlag(3) || this.checkFlag(4)) && !this.checkFlag(5)) addQuestionC(md, sJ + ' ' + hJ + 'Janet to tell you about her ancestors', "JanetKelly", 6701);
			else if (this.checkFlag(5) && !this.checkFlag(6)) addQuestionC(md, sJ + ' ' + hJ + 'Janet to tell you more about the warlock', "JanetKelly", 6702);

			addLinkToPlace(md, 'go downstairs with Janet', 112);
			addLinkToPlace(md, 'exit the house', 44);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "recharmjanet1") {
			// Re-charm Janet 1
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			this.showPerson("janet-recharm1.jpg");
			addPlaceTitle(md, "Janet Under A Charm Spell - Again");
			md.write(
				'<p>Once again Janet falls under the spell. She starts to say something, then trails off after the first word, and shakes her head.</p>' +
				'<p>She tries again and asks, "Do you want to take me upstairs?"</p>' +
				'<p>What she really means is obvious. Everything says it: her gasping breaths, her stance, her gaze.</p>'
			);
			if (clv != 5 && getCharmedLevel("DebraKelly") != 2 && wherePerson("DebraKelly") == 112) md.write('<p>You see her glance over at Puppy Debra, and she says, "While you do, I have a costume...that would compliment Debra..."</p>');
			 
			startQuestions();
			if (clv != 2) addLinkToPlaceC(md, 'tell Janet "Yes, I want you now too!"', Place, 'type=recharmjanet2', '', '', "charmPerson('JanetKelly',2);");
			if (clv != 3) addLinkToPlaceC(md, 'tell Janet "You forget where your room is, don\'t you"', Place, 'type=recharmjanet2', '', '', "charmPerson('JanetKelly',3);");
			if (clv != 4) addLinkToPlaceC(md, "order Janet to go upstairs", Place, 'type=recharmjanet2', '', '', "charmPerson('JanetKelly',4);");
			if (clv != 5 && getCharmedLevel("DebraKelly") != 2 && wherePerson("DebraKelly") == 112) addLinkToPlaceC(md, '"Try on the costume for me"', Place, 'type=recharmjanet2', '', '', "charmPerson('JanetKelly',5);");
			if (clv != 1) addOptionLink(md, "exit the house and let Janet get used to the spell", 'LeaveMinJanet()');			
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "recharmjanet2") {
			// Re-charm Janet 2
			clv = this.getCharmedLevel();
			md = WritePlaceHeader(false, "td-left-large");
			this.showPerson(clv == 5 ? "janet-recharm3.jpg" : "janet-recharm2.jpg");
			addPlaceTitle(md, "Janet Under A Charm Spell - Again");
			myName = this.getYourNameFor();
			switch(this.getCharmedLevel()) {
				case 2:
					// Lover
					md.write(
						'<p>Passion overcomes the girl, causing her to fall to the ground. "Oh god!" she exclaims, holding the raging excitement in her stomach.</p>' +
						'<p>"I want you so much, and that you want me too is so <b>hot</b>" she says, the excitement building.</p>' +
						'<p>"Please make love to me ' + myName + '. I want you, I need you, so badly."</p>'
					);					
					break;
				case 3:
					// Bimbo
					md.write(
						'<p>Passion overcomes the girl, causing her to fall to the ground. "What do you mean...my room..."</p>' +
						'<p>You quickly interrupt her "You don\'t remember, your sister looked after these things for you. After all you are more interested in your appearance, in being sexy than smart."</p>' +
						'<p>She looks confused as the spell reinforces your words, and also as it seems they are at least in some part the truth. She tries to deny your words,</p>' +
						'<p>"Well I like looking good, but it is not like I am some sort of..."</p>' +
						'<p>Again you interrupt her "A bimbo...a beautiful sexy woman who knows what is important in life, looking good and pleasing others"</p>' +
						'<p>She looks at you, "A bimbo...well I love being sexy and how others look at me...I suppose you could call me that...yes...I am a bimbo!!"</p>'
					);						
					break;
				case 4:
					// Slave
					md.write(
						'<p>Passion overcomes the girl, causing her to fall to the ground. "Oh god!" she exclaims, holding the raging excitement in her stomach. "I feel like such a cheap slut, like <i>your</i> cheap slut, your whore, your... <i>slave</i>," she says, relishing the word as it rolls off her tongue.</p>' +
						'<p>"Please take me ' + myName + '. I want you, I need... to serve you, so badly."</p>'
					);					
					break;
				case 5:
					// Cat
					md.write(
						'<p>Passion overcomes the girl, and she quickly lead you upstairs to her bedroom. She almost tears off her clothing and she takes out a skimpy costume and put it on. As she does the arousal from the spell makes her caress her breasts and her hot sex and you think she has a small orgasm just from thhat.</p>' +
						'<p>You see she is dressed in a stylised cat-girl costume, complete with ears and a tail. So now you are a kitten sister to compliment her puppy sister!</p>' +
						'<p>"Please take me ' + myName + '. I want you, I need you, so badly, Meow.". You almost laugh at the "Meow" but it is so cute!</p>'
					);
					break;
			}
			startQuestions();
			addLinkToPlaceC(md, "talk more to her", 112);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "incestsex") {
			// Debra + Janet sex
			md = WritePlaceHeader(false, isExplicit() ? "td-left-large" : "");
			this.showPersonRandomRorX("janetdebra-lesbian", isExplicit() ? 2 : 1);
			addPlaceTitle(md, "Sisterly Affections");

			var clvJ  = this.getCharmedLevel();
			hJ = this.getPersonTitle();

			if (getCharmedLevel("DebraKelly") == 2) {
				// Lover Debra
				md.write('<p>You ask ' + hJ + 'Janet and ' + findPerson("DebraKelly").getPersonName() + ' to put on a show for you, and kiss each other. You smile, and ');
				if (clvJ != 2) {
					// Bimbo/Slave Janet
					md.write(
						hJ + 'Janet is perfectly happy to!. Debra looks at you reluctantly, until Janet tells her,</p>' +
						'<p>"You know, you are totally hot, let\'s put on a show for ' + perYou.getPersonName() + '!"</p>' +
						'<p>This seems to convince Debra and they kiss, every so often looking over at you, but their passion quickly builds, and they concentrate in each other more and more. A little later they are licking each other to mutual orgasms, while calling out for you!</p>'
					);
				} else {
					// Lover Janet
					md.write(
						'they both look reluctant, and you remind them it is just a little show for you, a game. Janet looks at Debra and tells her,</p>' +
						'<p>"Why not, you know we have practised together before. Let\'s put on a show for ' + perYou.getPersonName() + '!"</p>' +
						'<p>The seems to decide Debra and they kiss, every so often looking over at you, but their passion quickly builds, and they concentrate in each other more and more. A little later they are licking each other to mutual orgasms, while calling out for you! You wonder how much they have \'practised\' in the past.</p>'
					);
				}
			} else {
				// Puppy Debra
				md.write('<p>You ask ' + hJ + 'Janet to play with her sister. At this Debra looks brightly at you and Janet, playing the part of a good puppy ');
				if (clvJ != 2) {
					// Bimbo/Slave Janet
					md.write('and ' + hJ + 'Janet is perfectly happy to!. Initially they just actually play, and wrestle a little, but quickly their lips meet, and play turns to passionate kisses. As you watch them enthusiastically lick each other to mutual orgasms, you wonder if they have some history of mutual exploration.</p>');
				} else {
					// Lover Janet
					md.write('and ' + hJ + 'Janet looks a bit embarrassed, blushing but it does not stop her from patting Debra on her head, and telling her, "Good girl!". With Janet clearly in charge, they just actually play, and wrestle a little, but quickly their lips meet, and play turns to passionate kisses. As you watch them enthusiastically lick each other to mutual orgasms, you wonder if they have some history of mutual exploration.</p>');
				}
			}

			// Choices
			startQuestions();
			addLinkToPlace(md, "now ask them to show you some affection" , 112, 'type=threesomesex');
			addLinkToPlace(md, 'return to the Kelly\'s home', 112);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "threesomesex") {
			// Debra + Janet threesome
			md = WritePlaceHeader(false, isExplicit() ? "" : "td-left-large");
			this.showPersonRandomRorX("janetdebra-threesome", isExplicit() ? 2 : 1, '', '', '', '', isExplicit() && perYou.isMaleSex() ? 1 : 0);
			addPlaceTitle(md, "Sister\'s Affections");

			var clvJ  = this.getCharmedLevel();
			hJ = this.getPersonTitle();
			md.write('<p>You decide to take up ' + hJ + 'Janet and ' + findPerson("DebraKelly").getPersonName() + '\'s offer to be \'together\' with them. Who could turn down sex with two beautiful sisters!</p><p>');

			if (getCharmedLevel("DebraKelly") == 2) {
				// Lover Debra
				if (clvJ == 5) {
					// Catgirl Janet
				} else if (clvJ != 2) {
					// Bimbo/Slave Janet
					md.write(
						capitalize(hJ) + 'Janet is perfectly happy to! Debra looks at you reluctantly, until Janet tells her,</p>' +
						'<p>"You know, you are totally hot, let\'s put on a show for ' + perYou.getPersonName() + '!"</p>' +
						'<p>This seems to convince Debra and they kiss, every so often looking over at you, but their passion quickly builds, and they concentrate in each other more and more. A little later they are licking each other to mutual orgasms, while calling out for you!</p>'
					);
				} else {
					// Lover Janet
					md.write(
						'they both look reluctant, and you remind them it is just a little show for you, a game. Janet looks at Debra and tells her,</p>' +
						'<p>"Why not, you know we have practised together before. Let\'s put on a show for ' + perYou.getPersonName() + '!"</p>' +
						'<p>The seems to decide Debra and they kiss, every so often looking over at you, but their passion quickly builds, and they concentrate in each other more and more. A little later they are licking each other to mutual orgasms, while calling out for you! You wonder how much they have \'practised\' in the past.</p>'
					);
				}
			} else {
				// Puppy Debra
				if (clvJ == 5) {
					// Catgirl Janet
				} else if (clvJ != 2) {
					// Bimbo/Slave Janet
					md.write('and ' + hJ + 'Janet is perfectly happy to!. Initially they just actually play, and wrestle a little, but quickly their lips meet, and play turns to passionate kisses. As you watch them enthusiastically lick each other to mutual orgasms, you wonder if they have some history of mutual exploration.</p>');
				} else {
					// Lover Janet
					md.write('and ' + hJ + 'Janet looks a bit embarrassed, blushing but it does not stop her from patting Debra on her head, and telling her, "Good girl!". With Janet clearly in charge, they just actually play, and wrestle a little, but quickly their lips meet, and play turns to passionate kisses. As you watch them enthusiastically lick each other to mutual orgasms, you wonder if they have some history of mutual exploration.</p>');
				}
			}

			// Choices
			startQuestions();
			addLinkToPlace(md, 'return to the lounge room', 112);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		if (this.getCharmedLevel() == 5) this.showPerson("poledancec.jpg");
		else this.showPersonRandom("poledance", 2);
		addPlaceTitle(md, "Janet\'s Dance");
		if (this.getCharmedLevel() == 5) md.write('<p>Janet Janet is dressed in another cat costume when she take to the stage, a black cat costime. Her large breasts and the catgirl costume work very well and the audience appears to love her performance, though you suspect her large breasts are the \'largest\' factor.</p>');
		else md.write('<p>Janet confidently takes the stage dressed in very little more than a bra and panties, and the bra does not last long. She emphasises her large breasts, even wrapping them around one of the poles!</p>');
		md.write(
			'<p>After she looks excited and really happy, promising to do this again, and promising to do you anytime!</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place != 112 || sType !== "" || this.place != 112) return;
		
		var clvJ = this.getCharmedLevel();
		var perDebra = findPerson("DebraKelly");
		var hJ = this.getPersonTitle();
		var sJ = "order";
		if (clvJ == 2 || clvJ === 0) sJ = "ask";

		// Janet questions
		if (perDebra.place != 112 && !this.checkFlag(2)) addQuestionC(md, 'ask ' + hJ + 'if Debra is home', "JanetKelly", 6800);

		if (!this.checkFlag(3)) addQuestionC(md, 'ask ' + hJ + 'Janet if she has ever lived in Glenvale before', "JanetKelly", 6801);
		else if (clvJ === 0 && !this.checkFlag(4)) {
			// ask about her family but is NOT charmed
			addQuestionC(md, 'ask ' + hJ + 'Janet to tell you more about her ancestors', "JanetKelly", 6802);
		}

		if (clvJ > 0) {
			if ((this.checkFlag(3) || this.checkFlag(4)) && !this.checkFlag(5)) addQuestionC(md, sJ + ' ' + hJ + 'Janet to tell you about her ancestors', "JanetKelly", 6701);
			else if (this.checkFlag(5) && !this.checkFlag(6)) addQuestionC(md, sJ + ' ' + hJ + 'Janet to tell you more about the warlock', "JanetKelly", 6702);
		}
		if (perKurndorf.getQuestSeance() == 16) addQuestionC(md, sJ + ' ' + hJ + 'Janet to tell where you could learn about séances', "JanetKelly", 2716);

	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// Janet @ Debra & Janet Kelly's Residence
			if ((Place == 112 || Place == 113) && this.isHere()) {
				var perD = findPerson("DebraKelly");
				var clvD = perD.getCharmedLevel();
				// Who can be charmed
				if (clvD !== 0 || !perD.isHere()) {
					CastCharmSpell("JanetKelly", 112, 1, 'type=charmjanet1', '', 'type=recharmjanet1');
					return "handled";
				} else {
					// Both are present
					if (clvD === 0 && !this.isCharmedBy()) {
						if (isSpellKnown("Shielded Charm")) CastCharmSpell("JanetKelly", 112, 1, 'type=charmjanet1', 'You cast the spell on Janet while Debra is busy with some unpacking', 'type=recharmjanet1');
						else addComments('With the two sisters here you cannot cast the spell, you will have try something else.');
						return "handled";
					}
				}
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
			gotoPlace(Place, 'type=janetpool');
			receiveCall('', 'You call Janet to invite her to join you at the pool for a swim, and she answers enthusiasticaly, "Damn right!" and hangs up. You take that to mean she will be there soon.');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	per.addPersonPhoneCall = function() {
		var clv = this.getCharmedLevel();
		if (clv === 0) return false;		// All SMS's are post Charm for her
		var hr = getHour();
		if ((nTime - this.extra[1]) > 24 && hr > 6 && !this.checkFlag(7) && this.extra[0] < 3) {
			// SMS, 2+ hrs after your last visit
			// Show each sequentially then at random
			hr = this.extra[0];
			//if (hr == 3) hr = Math.floor(Math.random() * 3);
			if (makeCall(true, 10 + hr)) {
				//if (this.extra[0] < 3)
				this.extra[0]++;
				this.setFlag(7);
				return true;
			}
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		var clv = this.getCharmedLevel();
		switch(id) {
			case 10:
				if (clv == 2) return receiveSMS('Janet', 'Hey ' + perYou.getPersonName() + ' missing you, come and visit', 'janetsmsgf1.jpg', '88%');
				else return receiveSMS('Janet', 'Feeling horny, cum and fuck me', 'janetsmsbimbo1.jpg', '88%');
				break;
			case 11:
				if (clv == 2) return receiveSMS('Janet', 'Hi, ' + perYou.getPersonName() + ' taking a break and thinking of you', 'janetsmsgf2.jpg', '88%');
				else return receiveSMS('Janet', 'Do ya like, they are my best part', 'janetsmsbimbo2.jpg', '88%');
				break;
			case 12:
				if (clv == 2) return receiveSMS('Janet', 'I just had a shower, sorry you were not here to join me', 'janetsmsgf3.jpg', '88%');
				else return receiveSMS('Janet', 'Trying on lingerie, let me show you them on and then off', 'janetsmsbimbo3.jpg');
				break;
		}
		return '';
	};
}
