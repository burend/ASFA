/***********************************************************************
Ash
***********************************************************************/

function initialiseAsh()
{
	// Ash
	addPerson("Ash", 482, "Ash");
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv > 0) return "Worker slut Ash";
		return this.name;
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 482 && !this.checkFlag(1)) {
			this.setFlag(1);
			showPopupWindow("A Lone Construction Worker",
				this.addPersonString("ash0.jpg", "height:max%", "right") +
				"You cast the spell and walk though the door into the office and as you do you are startled by a blonde construction worker. She seems just as surprised by you. Your experience thus far has taught you to act confident even when you don\'t know what\'s going on so you say \"Hello Miss. What are you doing here. This construction site has been shut down for weeks\"<p>" +
				'<p>She stammers " Uhhh Oh I forgot my hardhat at the office when we shut down construction and I needed to come back for it.  I know I shouldn\'t be here but... Hey wait a minute. Why are you here. This is private property."</p>' +
				'<p>You make up a story and reply "Yes I am well aware of that. Mayor Thomas has asked me to do an inspection so that the construction can continue." You look around the room and notice that she has made this area into a makeshift bedroom and continue.  "Are you living here?  That is trespassing and a violation of several local ordinances. You know that don\'t you. Ill have to call the police."</p>' +
				'<p>She replies, "Please don\'t do that. I don\'t have anywhere else to go. I lost my job when the construction shut down and got evicted when I couldn\'t pay my rent. I just moved here until I can find a new job"</p>' +
				'<p>You tell her, "Ok, Ok spare me the sob story. I can be reasonable. What\'s your name. I\'m sure we can work something out"</p>' +
				'<p>She tells you, "My name is Ash. At least that\'s what everyone calls me nowadays"</p>'
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (Place == 269 && sType == "ashpool") {
			WaitHereOnly(4);
			md = WritePlaceHeader();
			this.showPerson("pool.jpg");
			addPlaceTitle(md, "Swimming with Ash");
			md.write(
				'<p>Ash arrives wearing a cute bikini, happy to show off her figure for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'suggest moving to a private area', Place, 'type=ashpoolsex');
			addLinkToPlaceC(md, 'let her return to the construction site', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "ashpoolsex") {
			md = WritePlaceHeader();
			this.showPerson("pool-sex.jpg");
			addPlaceTitle(md, "Private Time with Ash");
			md.write(
				'<p>You spend an enjoyable time privately with Ash.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'let her return to the construction site', Place);
			WritePlaceFooter(md);
			return true;
		}


		if (sType == "ashcharm1slave") {
			// Charm Ash 1 (Slave)
			md = WritePlaceHeader();

			this.showPerson("ashstart1.jpg");
			addPlaceTitle(md, "Ash Under a Spell");

			md.write(
				'<p>She angrily cries out, "what the heck did you just say?"</p>' +
				'<p>You tell her, "Oh that was just something that is going to help teach you that words have meanings. You said you would do anything for me and now I have to show you what that actually means."</p>' +
				'<p>She sighs, "You need to relax! I am happy to show you my bra but I\'m not a whore.  Saying I\'ll do anything is just an expression. Like I owe ya one. It doesn\'t mean you can make me do whatever you want"</p>' +
				'<p>You calmly tell her, "You may be right about that but the spell I just cast actually does mean that."</p>' +
				'<p>She replies confused, "What the fuck are you talking about?" and you tell her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Take your top off"', Place, 'type=ashcharm2slave');
			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashcharm2slave") {
			// Charm Ash 2 (Slave)
			md = WritePlaceHeader();

			this.showPerson("ashstart2.jpg");
			addPlaceTitle(md, "Ash Being Enslaved By A Spell");

			md.write(
				'<p>Ash removes her shirt but stops at the bra and covers her breasts with her hands. She says,</p>' +
				'<p>"Yea right, I already said I\'d do that for you. No need to pretend to be some kind of wizard about it."</p>' +
				'<p>You tell her, "Oh my dear I think you misunderstood me. I want you to remove everything covering your breasts. You are not allowed to cover them anymore while I am around."</p>' +
				'<p>Ash\'s hands seem to be struggling against themselves as they grab at her bra strings and begin tearing it off. You <b>order</b> her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Obey me now Slave"', Place, 'type=ashcharm3slave');

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "ashcharm3slave") {
			// Charm Ash 3 (Slave)
			md = WritePlaceHeader();

			this.showPerson("ash2.jpg");
			addPlaceTitle(md, "Ash Under a Spell");

			md.write(
				'<p>She cries out, "Why can\'t I stop my hands. I shouldn\'t be showing you my breasts. I can\'t cover them up either. What the hell!"</p>' +
				'<p>You firmly tell her, "You really don\'t listen well do you. I guess that doesn\'t matter too much anymore. As long as I say it to you your body will take over whether you understand it or not."</p>' +
				'<p>You continue and order her...</p>'
			);

			startQuestions();

			addLinkToPlace(md, '"Now show me that dumptruck of an ass you have"', Place, 'type=ashcharm4slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "ashcharm4slave") {
			// Charm Ash 4 (Slave)
			md = WritePlaceHeader();

			this.showPerson("ash3.jpg");
			addPlaceTitle(md, "Ash Under a Spell");

			md.write(
				'<p>She turns around and pulls her shorts down, and calls out,</p>' +
				'<p>"No please don\'t look. I don\'t let anyone look at that. It is disgusting"</p>' +
				'<p>You tell her, "Oh my poor darling. I didn\'t know you were so confused. Your asshole is a beautiful thing. It is a source of great pleasure for you and everyone else lucky enough to spend time with it."</p>' +
				'<p>She again cries out, "Nooo, it\'s dirty and nasty"</p>' +
				'<p>You tell her, "How about this. I will amplify the pleasure you feel with your asshole. This way it will feel much better than normal sex. Actually just to be safe Ill make it so the only way you can feel pleasure is through your asshole. How does that sound?"</p>' +
				'<p>She pleads, "Oh Please don\'t do that. Anything but that."</p>' +
				'<p>You ignore plea, "Shush now. Stop whining. There you go saying anything again. Haven\'t you learned yet that that can get you into trouble. Im done messing aroung. Time to get busy."</p>' +
				'<p>You order her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Shove a finger in your ass to test it out"', 482, 'type=ashcharm5slave');

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashcharm5slave") {
			// Charm Ash 5 (Slave)
			md = WritePlaceHeader();

			this.showPersonRorX("ash4.jpg");
	
			var myName = perYou.getMaster();
			addPlaceTitle(md, "Ash Under a Spell");

			md.write(
				'<p>She cries out, "OOOOOoooOOhhh nooo. Why does that feel so good. This is perverted and depraved. I shouldn\'t enjoy this."</p>' +
				'<p>You tell her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Ok my turn"', 482, 'type=ashcharm6slave');

			WritePlaceFooter(md);
			return true;
		}
		if (sType == "ashcharm6slave") {
			// Charm Ash 6 (Slave)
			md = WritePlaceHeader();
						setPlaceFlag("Park", 7);

			if (isExplicit() && !perYou.isMaleSex()) this.showPersonX(perYourBody.FindItem(45) > 0 ? "ash5gs.jpg" : "ash5gd.jpg");
			else if (!perYou.isMaleSex()) this.showPerson("ash5gd.jpg");
			else this.showPersonRorX("ash5b.jpg");
	
			var myName = perYou.getMaster();
			addPlaceTitle(md, "Ash Under a Spell");

			md.write(
				'<p>You grab Ash by the hips and begin savagely fucking her asshole. She moans in pleasure and has to bite down on her sheets to keep from grinding her teeth. You continue for as long as you can hold off your orgasm. It isn\'t especially long since her virgin asshole was the tightest you had ever felt.</p>' +
				'<p>When you finally let up she says, "Okay I get it now. You really are a wizard and you control me now."</p>' +
				'<p>You ask her, "And what are your thoughts on that realization?"</p>' +
				'<p>She replies, "As long as you fuck me good every once in a while I am perfectly happy to be your slave. I\'ve never felt pleasure like that before... Thank You ' + perYou.getMaster() + '."</p>' +
				'<p>She then gives you a spare key to the office.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk to Ash some more", 482);
			addLinkToPlace(md, "leave the building", 481);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashcharm1gf") {
			// Charm Ash 1 (Girlfriend)
			md = WritePlaceHeader();
			this.charmThem(3);

			this.showPerson("ashstart1.jpg");
			addPlaceTitle(md, "Ash Under a Spell");

			md.write(
				'<p>She asks, "what was that?"</p>' +
				'<p>You tell her, "Nothing, nothing, but I was just wondering if we can come to an arrangement. I can speak to the Mayor and even arrange for you you do maintenance work here, giving you a job and entitling you to live here if you wanted"</p>' +
				'<p>She suspiciously asks, "That sounds great but what did you want for this arrangement, I told you I\'m not a whore.  Saying I\'ll do anything is just an expression. Like I owe ya one."</p>' +
				'<p>You try to reassure her as the spell starts to affect her, "That is not what I meant, just to be friends, and sometimes when we both feel like it \'with benefits\'"</p>' +
				'<p>She answers, "Well it can get lonely here at times"...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'she starts to take her top off', Place, 'type=ashcharm2gf');
			
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashcharm2gf") {
			// Charm Ash 2 (Girlfriend)
			md = WritePlaceHeader();

			this.showPerson("ashstart2.jpg");
			addPlaceTitle(md, "Ash Being 'Friended' By A Spell");

			md.write(
				'<p>Ash removes her shirt but stops at the bra and covers her breasts with her hands. She says,</p>' +
				'<p>"Well, I already said I\'d show you, but being \'friends with benefits\' could work."</p>' +
				'<p>You kill for time for the spell to take further effect so you ' + (isCharmedBy("Mayor") ? 'call the Mayor to quickly arrange for Ash to look after things here.' : 'pretend to call the Mayor to arrange to Ash to work here') + '</p>' +
				'<p>You see Ash is looking more aroused and ask her...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"How about a little more"', Place, 'type=ashcharm3gf');

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "ashcharm3gf") {
			// Charm Ash 3 (Girlfriend)
			md = WritePlaceHeader();

			this.showPerson("ash3.jpg");
			addPlaceTitle(md, "Ash 'Friended' By A Spell");

			md.write(
				'<p>She turns around a bit seductively and pulls her shorts down, and says,</p>' +
				'<p>"Thank you a lot for arranging the job, I am really gradteful. I\'m no whore but at least here is a bit more for your viewing pleasure"</p>' +
				'<p>Again you assure here you do not want her to be a whore, just a friend, with the occasional \'benefit\'...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'she says "How about some \'benefits\'"', 482, 'type=ashcharm4gf');

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ashcharm4gf") {
			// Charm Ash 4 (Girlfriend)
			md = WritePlaceHeader();
			setPlaceFlag("Park", 7);

			if (isExplicit() && !perYou.isMaleSex()) this.showPersonX(perYourBody.FindItem(45) > 0 ? "ash5gs.jpg" : "ash5gd.jpg");
			else if (!perYou.isMaleSex()) this.showPerson("ash5gd.jpg");
			else this.showPersonRorX("ash5b.jpg");
	
			addPlaceTitle(md, "Ash Under a Spell With 'Benefits'");

			md.write(
				'<p>With that you and your enchanted \'friend\' have some mutually pleasurable \'benefits\'</p>' +
				'<p>Afterwards Ash gives you a spare key to the office.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk to Ash some more", 482);
			addLinkToPlace(md, "leave the building", 481);
			WritePlaceFooter(md);
			return true;
		}		
		
		if (sType == "endgame1ash") {
			// End Game - Ash
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Construction?");

			md.write(
				'<p>One day you receive a message from your ' + (this.isSlave() == 4 ? 'slave' : 'friend') + ' Ash, showing her swollen pregnant belly. Miss. Logan strikes again!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);		
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "ashrecharm") {
			// Recharm Ash
			md = WritePlaceHeader();
			this.showPerson("recharm.jpg");			
			addPlaceTitle(md, "Ash Under a Charm Spell Again");
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
		return this.getCharmedLevel() == 3 ? "endgame1ash" : "";
	}
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// Ash House
			if (Place == 482 && this.isHere()) {
				var txt = '<div style="color:black;margin-top:1em;margin-bottom:1em;margin-left:4em;margin-right:2em;cursor:default;">' +
					'<table><tr><td width="80%;margin-right:2em"><p>You cast the spell and you see Ash start to be affected by it. As she does you tell her...</p>' +
					addOptionLink("string", '"Words matter..."', "dispPlace(482,'type=ashcharm1slave')") +
					(perYou.checkFlag(26) ? addOptionLink("string", '"We can come to an understanding..."', "dispPlace(482,'type=ashcharm1gf')") : '') +
					'<br></td><td width="20%">' + this.addPersonFace(false, "80%") + '</td></tr></table>';
				CastCharmSpell("Ash", '', 4, '', txt, 'type=ashrecharm');	// CHARM Ash (construction slave), slave/gf level
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
			gotoPlace(Place, 'type=ashpool');
			receiveCall('', 'You call Ash to ' + (this.getCharmedLevel() ? 'order' : 'ask') + ' her to join you at the pool for a swim, and she answers promptly, "I\'ll be there shortly ' + perYou.getMaster() + '".');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
}
