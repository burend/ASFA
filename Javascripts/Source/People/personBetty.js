/***********************************************************************
Betty
***********************************************************************/

function initialiseBetty()
{
	// Betty
	addPerson("Betty", 60, "Betty");
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv > 0) return "Your personal farmgirl";
		return this.name;
	};
	
	per.whereNow = function() {
		if (!this.isCharmedBy("You") && sType.indexOf("bettymeet2") != -1) return 60;
		return 61;
	};
	
	per.showEventPopup = function()
	{
		if (Place == 197 && isShopOpen(0) && !isPlaceKnown("Barn") && wherePerson("MrsTanika") != 0 && isCharmedBy("Victoria") && sType === "" && wherePerson("Diane") != -1) {
			// Reveal the Barn
			setPlaceKnown("Barn");
			showPopupWindow("New Item in Stock",
				findPerson("Victoria").addPersonString("victoria1b.jpg", "height:max%", "left") +
				addImageString("Items/churn.jpg", "height:max%", "right") +
				"You see Victoria setting up a new display, it seems to be a piece of antique kitchenalia, a butter churn you think. You ask her what she is doing,</p>" +
				'<p>"Hello ' + perYou.getMaster() + ', this is a new item I just got in from a farm on the outskirts of town." You were not aware of any farms nearby and ask her about it. She explains it is a small farm on the west side of the park. She gives brief directions to get there through the park pathways.</p>' +
				'<p>Interesting, you wonder what they farm there and who lives there?'
			);
			return true;
		}
		if (Place == 60 && sType == "bettymeet1") {
			// Introduction To Betty
			this.setFlag(1);
			showPopupWindow("Farmers Daughter",
				this.addPersonString("betty0.jpg", "height:max%", "right") +
				"You approach the girl on the playground. She turns to look you up and down and says.</p>" +
				'<p>"What are you doing here. You must be one of my Dad\'s friends that come to visit his secret barn?"</p>' +
				'<p>You reply, "Secret Barn?  No Miss. I just kinda got lost in the woods and stumbled on this nice little farm here. Pleased to meet you."</p>' +
				'<p>"Oh really?" She replies. "Well could you visit his barn and tell me what goes on in there. He never lets me go over there and wont even tell me anything about it. My names Betty by the way. Nice to meet you."</p>'
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (Place == 269 && sType == "bettypool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("bettypool.jpg");
			addPlaceTitle(md, "Swimming with Betty");
			md.write(
				'<p>Betty arrives, and immediately removes her top so that she can shake her tits for you.</p>' +
				'<p>She doesn\'t look like swimming is what she has in mind.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"I didn\'t want to swim anyway"', Place, 'type=bettypoolsex');
			addLinkToPlaceC(md, 'say goodbye to Betty', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "bettypoolsex") {
			md = WritePlaceHeader();
			if (isExplicit() && perYou.isMaleSex()) this.showPersonX("bettypool2.jpg");
			else this.showPerson("bettypool2.jpg");
			addPlaceTitle(md, "Betty at the pool");
			if (perYou.isMaleSex()) md.write('<p>Betty is quite content to just suck your cock by the water.</p>');
			else md.write('<p>Betty is quite content to just lick your pussy by the water.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Betty', Place);
			WritePlaceFooter(md);
			return true;
		}

		
		// Meet Betty
		if (sType == "bettymeet2") {
			md = WritePlaceHeader();
			this.showPerson("betty1.jpg");

			addPlaceTitle(md, "Farmers Daughter Betty");

			 md.write(
			  '<p>Betty asks, "Hey there, did you go check out the barn? Can you tell me what\'s in there?"</p>' +
			  '<p>You could tell her to trust and <b>obey</b> her father as you <i>originally</i> thought. '
			 );
			 if (perYou.checkFlag(26)) md.write('Then again you could offer the <b>cute</b> woman to help her work out what is in the barn later</p>');
			 else md.write('While you could do other approaches, you are unsure you can control the charm spell enough to make use of them.</p>');

			startQuestions('You tell her');
			addLinkToPlace(md, '"Trust your father"', Place, 'type=bettymeet2a');
			if (perYou.checkFlag(26)) addLinkToPlace(md, '"Let me help you"', Place, 'type=bettymeet2b');
			addLinkToPlace(md, 'leave her alone', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "bettymeet2a") {
			md = WritePlaceHeader();
			this.showPerson("betty1.jpg");

			addPlaceTitle(md, "Farmers Daughter Betty");

			 md.write(
			  '<p>"I\'m sure your father has good reasons why he doesn\'t tell you about his work. Maybe you should just trust him."</p>' +
			  '<p>She replies, "Wow Okay. So typical. Men always think they know best and always try to keep women down."</p>' +
			  '<p>You tell her "Makes sense to me. Women just aren\'t as strong as men so they should be protected... or used"</p>' +
			  '<p>She looks annoyed, "You\'re really startin to creep me the fuck out.  If you\'re not gonna help me can you just get out of here."</p>'
			 );

			startQuestions();
			addLinkToPlace(md, 'leave her alone', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "bettymeet2b") {
			md = WritePlaceHeader();
			this.showPerson("betty1.jpg");

			addPlaceTitle(md, "Farmers Daughter Betty");

			 md.write(
			  '<p>Toy tell her "I\'m sorry the barn is closed and I cannot see what is in there. I promise I will try to find out what is there and tell you when I find out"</p>' +
			  '<p>She smiles "Thank\'s I\'ll help out if you need anything" s she does you have to admire how attractive she is!</p>' 
			 );

			startQuestions();
			addLinkToPlace(md, 'leave her alone', Place);
			WritePlaceFooter(md);
			return true;
		}		

		if (sType == "bettypublic") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("bettypublic1.jpg");
			addPlaceTitle(md, "Outside with Betty");
			md.write(
				'<p>Betty meets you in a secluded outside area. She has her tits out before you even see her approaching,</p>' +
				'<p>"Thanks for the call ' + perYou.getMaster() + '. Can I pleasure you now?"</p>'
			);
			startQuestions();
			
			addPopupLinkC(md, 'Face fuck her.', "That is good enough for her.",
				perBetty.addPersonStringX('bettypublic2b.jpg', "100%") +
				'She doesn\'t mind the rough stuff.',
			);

			addLinkToPlaceC(md, 'send her back home', Place);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmbetty1slave") {
			// Charm Betty 1 )Slace)
			md = WritePlaceHeader();

			this.showPerson("betty2.jpg");
			addPlaceTitle(md, "Betty Under a Spell");

			md.write(
				'<p>You cast the spell, "Dai Chu Betty. Turn and face me now."</p>' +
				'<p>She answers annoyed, "Chill out. You don\'t have to be so bossy."</p>' +
				'<p>You start to shape the effect of the spell, "I don\'t have to but I do prefer it that way. It just makes things more simple when one person gives orders and the other follows them. Don\'t you agree."</p>' +
				'<p>She replies uncertainly, the spell starting to effect her, "I mean.. It might be simple but its pretty fucked up. Why can\'t we be equals."</p>' +
				'<p>You reinforce the spell, "We could be equals but then that would be quite boring for me when I already have the power.  Here let me demonstrate."</p>' +
				'<p>You tell her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Show me your panties"', Place, 'type=charmbetty2slave');		
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmbetty2slave") {
			// Charm Betty 2 (Slave)
			md = WritePlaceHeader();

			this.showPerson("betty3.jpg");
			addPlaceTitle(md, "Betty Being Enslaved By A Spell");

			md.write(
				'<p>Betty replies, "Eww no You can fuck right off... Err what the hell." but she lifts up her skirt to reveal her yellow panties even as her mind scrambles to make sense of the situation.</p>' +
				'<p>You tell her "See. Now wasn\'t that simple. I give an order and you obey. It doesn\'t need to be complicated. You could even learn to enjoy it."</p>' +
				'<p>She answers, "Why the fuck would I enjoy following your orders?"</p>' +
				'<p>You tell her, further shaping her thoughts, "Oh right. You should enjoy MY orders because I am your ' + perYou.getMaster() + ' now. Sorry if I didn\'t make that clear. Obeying their ' + perYou.getMaster() + ' is a slave\'s ultimate goal in life so it makes sense that it should make them happy.  Lets try again."</p>' +
				'<p>You tell her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Pull out your tits"', Place, 'type=charmbetty3slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmbetty3slave") {
			// Charm Betty 3 (Slave)
			md = WritePlaceHeader();

			this.showPerson("betty4.jpg");
			addPlaceTitle(md, "Betty Under a Spell");

			md.write(
				'<p>Betty pulls down her top and a smile begins to spread across her face.  Her eyes flash with the color of your charm spell and you know she feels the pleasure.</p>' +
				'<p>She says, "Ohhh Ok.. Maybe you have a point there but this is still really weird."</p>' +
				'<p>You tell her...</p>'
			);

			startQuestions();
			addLinkToPlace(md, '"True. But who cares. Show me your pussy"', Place, 'type=charmbetty4slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmbetty4slave") {
			// Charm Betty 4 (Slave)
			md = WritePlaceHeader();

			this.showPerson("betty5.jpg");
			addPlaceTitle(md, "Bettys Under a Spell");

			md.write(
				'<p>Betty obeys instantly and cannot hide the pleasure she is feeling.</p>' +
				'<p>"OOOHH yess. More.  Please ' + perYou.getMaster() + '. Command me more."</p>' +
				'<p>"Well that was quick. Ok Slave. As you wish."</p>' +
				'<p>You tell her...</p>'
			);

			startQuestions();
			addLinkToPlace(md, '"Take it all off"', Place, 'type=charmbetty5slave');
			WritePlaceFooter(md);
			return true;

		}

		if (sType == "charmbetty5slave") {
			// Charm Betty 5 (Slave)
			md = WritePlaceHeader();

			this.showPerson("betty7.jpg");
			addPlaceTitle(md, "Betty Under a Spell");

			md.write(
				'<p>"Yes ' + perYou.getMaster() + '."</p>' +
				'<p>She jumps up and rips off what clothes were left and stands in front of you anxiously waiting for her next command.</p>' +
				'<p>"Now lets see what those tits can do."</p>'
			);

			startQuestions();
			if (perYou.isMaleSex()) addLinkToPlace(md, '"Give me a tit job"', Place, 'type=charmbetty6bslave');
			else addLinkToPlace(md, '"Go down on me"', Place, 'type=charmbetty6gslave');
			WritePlaceFooter(md);
			return true;

		}

		if (sType == "charmbetty6bslave") {
			// Charm Betty 6 (Slave) - male player
			md = WritePlaceHeader();
			setPersonFlagAfterTime("Betty", 6, true, 288);
			this.showPersonRorX("betty6b.jpg");
			addPlaceTitle(md, "Betty Under a Spell");

			md.write(
				'<p>Betty uses her whole body to move her tits up and down your cock to make sure you feel as good as possible.</p>' +
				'<p>"Good Girl"</p>' +
				'<p>Your praise sends shivers down her spine which makes her boobs jiggle a bit. You relax until you cum all over her face and tell her to go inside and wait for you there with her tits on display.  You figure its easy enough to sneak past the farmer into her room. She knows that waiting there was a direct order from you so she will be kept in constant pleasure until you return. </p>'
			);

			startQuestions();
			addLinkToPlace(md, 'leave', 60);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmbetty6gslave") {
			// Charm Betty 6 (Slave) - female player
			md = WritePlaceHeader();
			setPersonFlagAfterTime("Betty", 6, true, 288);
			this.showPerson("betty6g.jpg");
			addPlaceTitle(md, "Betty Under a Spell");

			md.write(
				'<p>Betty uses her whole body to move her tits over your body and rubs her nipples over your pussy as she sucks on your breasts.</p>' +
				'<p>"Good Girl"</p>' +
				'<p>Your praise sends shivers down her spine which makes her boobs jiggle a bit. You tell her to go inside and wait for you there with her tits on display.  You figure its easy enough to sneak past the farmer into her room. She knows that waiting there was a direct order from you so she will be kept in constant pleasure until you return.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'leave', 60);
			WritePlaceFooter(md);
			return true;
		}	

		if (sType == "charmbetty1gf") {
			// Charm Betty 1 (Girlfriend)
			md = WritePlaceHeader();

			this.showPerson("betty2.jpg");
			addPlaceTitle(md, "Betty Under a Spell");

			md.write(
				'<p>You cast the spell, "Dai Chu" and she turns to face you unsure what you said. You then promise again to help her work out the secret of the barn.</p>' +
				'<p>She smiles, "It\'s alright for now, it just annoys me my father does not trust me to tell me what he is doing there"</p>' +
				'<p>You tell her how stupid he is to not trust is very cute daughter and she blushes a little. The spell is definitely affecting her.</p>' +
				'<p>She replies, "I mean.. Why can\'t he treat me as an equal in the farm?"</p>' +
				'<p>You reinforce the spell, "He is probably a bit old fashioned." and go on talking about how attractive she is.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'she plays with her skirt', Place, 'type=charmbetty2gf');		
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmbetty2gf") {
			// Charm Betty 2 (Girlfriend)
			md = WritePlaceHeader();

			this.showPerson("betty3.jpg");
			addPlaceTitle(md, "Betty Being Seduced By A Spell");

			md.write(
				'<p>Betty briefly lifts up her skirt and flashes her yellow panties and then blushes and drops her skirt, ""Well it can get a bit lonely out here, we do not get many visitors and all of those are my father\'s friends."</p>' +
				'<p>You tell her lines about how it is the town\'loss that more people cannot meet her, and continue to reinforce the spell, shaping her thoughts towards being your lover....</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'she strips down her dress', Place, 'type=charmbetty3gf');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmbetty3gf") {
			// Charm Betty 3 (Girlfriend)
			md = WritePlaceHeader();

			this.showPerson("betty4.jpg");
			addPlaceTitle(md, "Betty Under a Spell");

			md.write(
				'<p>Betty pulls down her top and a smile begins to spread across her face.  Her eyes flash with the color of your charm spell and you know she feels the pleasure.</p>' +
				'<p>She says, "Ohhh Ok.. Maybe...I find you attractive too"</p>' +
				'<p>You ask her...</p>'
			);

			startQuestions();
			addLinkToPlace(md, '"Are you dating anyone"', Place, 'type=charmbetty4gf');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmbetty4gf") {
			// Charm Betty 4 (Girlfriend)
			md = WritePlaceHeader();
			this.showPerson("betty7.jpg");
			addPlaceTitle(md, "Betty Seduced By a Spell");

			md.write(
				'<p>The spell seems to have fully taken effect, "No, no-one at all"</p>' +
				'<p>You ask her to be your girlfriend, and she does not answer, she just strips the rest of her clothing"</p>'
			);

			startQuestions();

			if (perYou.isMaleSex()) addLinkToPlace(md, 'she gives you a tit job', Place, 'type=charmbetty5bgf');
			else addLinkToPlace(md, 'she goes down on you', Place, 'type=charmbetty5ggf');
			WritePlaceFooter(md);
			return true;

		}

		if (sType == "charmbetty5bgf") {
			// Charm Betty 6 (Girlfriend) - male player
			md = WritePlaceHeader();
			setPersonFlagAfterTime("Betty", 6, true, 288);
			this.showPersonRorX("betty6b.jpg");
			addPlaceTitle(md, "Betty Under a Spell");

			md.write(
				'<p>Betty uses her whole body to move her tits up and down your cock to make sure you feel as good as possible.</p>' +
				'<p>You suggest doing something for her now, and she asks you follow her into her bedroom. She grabs her clothing and walks into the farmhouse.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'follow', 60);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmbetty5ggf") {
			// Charm Betty 6 (Girlfriend) - female player
			md = WritePlaceHeader();
			setPersonFlagAfterTime("Betty", 6, true, 288);
			this.showPerson("betty6g.jpg");
			addPlaceTitle(md, "Betty Under a Spell");

			md.write(
				'<p>Betty uses her whole body to move her tits over your body and rubs her nipples over your pussy as she sucks on your breasts.</p>' +
				'<p>You suggest doing something for her now, and she suggest you follow her into her bedroom for something more. She gabs her clothing and walks into the farmhouse.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'follow', 60);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "endgame1betty") {
			// End Game - Betty
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Farming?");

			md.write(
				'<p>One day you receive a message from your girlfriend Betty, showing her slightly pregnant belly. Miss. Logan strikes again!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);		
			WritePlaceFooter(md);
			return true;				
		}
		
		if (Place != 61) return false;
		
		if (sType == "bettytf") {
			// Tit-fuck
			md = WritePlaceHeader();

			this.showPersonRandomRorX("home-tf", isExplicit() ? 4 : 1);
			addPlaceTitle(md, "Betty\'s Breasts");

			md.write(
				'<p>Betty gives you a tit-fuck.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'talk more to Betty', Place);

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "bettybj") {
			// Blowjob
			md = WritePlaceHeader();

			this.showPersonRandomRorXBG("home-bj", isExplicit() ? 3 : 1);
			addPlaceTitle(md, "Betty");

			md.write(
				'<p>Betty gives you a ' + (per.isMaleSex() ? 'blowjob' : 'lick') + '</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'talk more to Betty', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "bettyfuck") {
			// Tit-fuck
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPersonRandomRorX("home-fuckb", isExplicit() ? 3 : 1);
			else this.showPerson("home-fuckga.jpg");
			addPlaceTitle(md, "Betty");

			md.write(
				'<p>You fuck Betty</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'talk more to Betty', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "bettybath") {
			// Tit-fuck
			md = WritePlaceHeader();

			this.showPersonRandom("bath", 3);
			addPlaceTitle(md, "Betty Bathing");

			md.write(
				'<p>You ask Betty to take a bath with her and she runs one. When you arrive she has assed something to the water so it looks almost milky. She is waiting for you in the bath.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'later talk more to Betty', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "bettybondage") {
			// Tit-fuck
			md = WritePlaceHeader();

			this.showPersonRandom("bondageplay", 4);
			addPlaceTitle(md, "Betty Bondage");

			md.write(
				'<p>Betty suggests some rodeo-games, and shows you a rope and collar. She suggests playing "Damsel in Distress"</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'talk more to Betty', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		
		if (sType == "bettyrecharm") {
			// Recharm Ash
			md = WritePlaceHeader();
			this.showPerson("recharm.jpg");			
			addPlaceTitle(md, "Betty Under a Charm Spell Again");
			if (this.getCharmedLevel() == 4) {
				this.charmThem(3);
				md.write(
					'<p>She asks, "what was that?"</p>' +
					'<p>You tell her, "Nothing, nothing, but I was just wondering if we can come to an arrangement. I can speak to the Mayor and even arrange for you you do maintenance work here, giving you a job and entitling you to live here if you wanted"</p>' +
					'<p>She suspiciously asks, "That sounds great but what did you want for this arrangement, I told you I\'m not a whore.  Saying I\'ll do anything is just an expression. Like I owe ya one."</p>' +
					'<p>You try to reassure her as the spell starts to affect her, "That is not what I meant, just to be friends, and sometimes when we both feel like it \'with benefits\'"</p>' +
					'<p>She answers, "Well it can get lonely here at times"...</p>'
				);
			} else {
				this.charmThem(4);
				md.write(
					'<p>She angrily cries out, "what the heck did you just say?"</p>' +
					'<p>You tell her, "Oh that was just something that is going to help teach you that words have meanings. You said you would do anything for me and now I have to show you what that actually means."</p>' +
					'<p>She sighs, "You need to relax! I am happy to show you my bra but I\'m not a whore.  Saying I\'ll do anything is just an expression. Like I owe ya one. It doesn\'t mean you can make me do whatever you want"</p>' +
					'<p>You calmly tell her, "You may be right about that but the spell I just cast actually does mean that."</p>'				);
			}

			startQuestions();	
			addLinkToPlaceC(md, 'talk more to Ash', Place);		
			WritePlaceFooter(md);
			return true;				
		}
		
		return false;
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.getCharmedLevel() == 3 ? "endgame1betty" : "";
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// Outside
			if (Place == 60 && this.isHere() && sType.indexOf("bettymeet2") != -1) {
				if (!isSpellKnown("Shielded Charm")) addComments('Don\'t cast the spell here. Her father might be watching.');
				else {
					if (sType != "bettymeet2b") CastCharmSpell("Betty", 60, 4, 'type=charmbetty1slave'); // CHARM Betty (Personal Cow), slave level
					else CastCharmSpell("Betty", 60, 3, 'type=charmbetty1gf'); // CHARM Betty (girlfriend)
				}
				return "handled";
			}
			// Betty's room
			if (Place == 61 && this.isHere()) {
				CastCharmSpell("Betty", 61, 4, '', '', 'type=bettyrecharm');
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls
	per.isPhoneable = function() {
		// Can you call them?
		return this.isCharmedBy() && !this.isHere();
	};

	per.callThem = function() {
		if (Place == 269) {
			receiveCall('', 'You call Betty and invite her to the pool. She gladly accepts.');
			gotoPlace(Place, 'type=bettypool');
			WriteCommentsFooter(bChat, bChatLeft);
		} if (this.getCharmedLevel() == 4) {
			if (!isOutside()) WriteComments("You call Betty but there is no answer, you should try again somewhere else. Your phone is not the best and you are getting a poor signal here inside.");
			else {
				gotoPlace(Place, 'type=bettypublic');
				receiveCall('', 'You call Betty and tell her to meet up with you.  She was at home waiting for you anyway so she will be right over');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
		
	};
	
}
