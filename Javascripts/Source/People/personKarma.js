/***********************************************************************
Karma
***********************************************************************/

function initialiseKarma()
{
	// Karma
	addPerson("Karma", 24, "Karma");
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv == 4) return "Tattooed Slut Karma";
		else if (clv == 3) return "Tattooed Girlfriend Karma";
		return this.name;
	};
	
	per.getYourNameFor = function() {
		if (this.getCharmedLevel() == 4) return perYou.getMaster();
		return perYou.isMan() ? "dude" : "girl";
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 24 && !this.checkFlag(1)) {
			this.setFlag(1);
			showPopupWindow("Sexy Camper",
				this.addPersonString("karma0.jpg", "height:max%", "right") +
				"You walk through the brush and come out into a nice clearing where a girl covered in tattoos greets you.</p>" +
				'<p>"Hey there ' + this.getYourNameFor() + '. You can come through here but don\'t touch my stuff ok."</p>' +
				'<p>"Oh yea no problem. So what are you doing here Miss..." you say with a questioning tone trying to draw out her name. She replies,</p>' +
				'<p>"Oh you can call me Karma. I\'m just looking to get back into nature. I\'ve kinda had it with the whole city lifestyle so I was just looking for a change of pace."</p>'
			);
			return true;

		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (sType == "karmapool") {
			WaitHereOnly(4);
			md = WritePlaceHeader();
			this.showPerson("karmapool.jpg");
			addPlaceTitle(md, "Swimming with Karma");
			md.write(
				'<p>Karma immediately shows her breasts to you. "Oh ' + this.getYourNameFor() + '. Thanks for bringing me here. I love swimming. I used to do laps all the time. I can hold my breath for such a long time."</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Well show me then.."', Place, 'type=karmapoolsex');
			addLinkToPlaceC(md, '"See you later Karma"', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "karmapoolsex") {
			md = WritePlaceHeader();
			this.showPersonRorX("karmapoolsex" + (perYou.isMaleSex() ? "b" : "g") + ".jpg");
			addPlaceTitle(md, "Very Impressive");
			if (perYou.isMaleSex()) md.write('<p>Karma goes underwater and starts sucking your cock for what seems like hours but is probably only a few minutes.  It is still wildly impressive.</p>');
			else md.write('<p>Karma goes underwater and starts sucking on your pussy for what seems like hours but is probably only a few minutes.  It is still wildly impressive.</p>');
			startQuestions();
			addLinkToPlaceC(md, '"See you later Karma"', Place);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "karmaoutdoor") {
			WaitHereOnly(4);
			md = WritePlaceHeader();
			this.showPerson("karmaoutside.jpg");
			addPlaceTitle(md, "Meet up with Karma");
			md.write(
				'<p>Karma steps inside and kneels for you when only her panties remain. She lifts up her tits for your viewing pleasure' + (this.getCharmedLevel() == 4 ? ' and patiently awaits your next command' : '') + '.</p>'
			);
			startQuestions();
			
			addPopupLinkC(md, 'Have her ' + (perYou.isMaleSex() ? 'suck' : 'lick'), "She may as well stay on her knees",
				(perYou.isMaleSex() ? this.addPersonStringRorX("karmabathroombjb.jpg", "height:max", "rightpopup") : this.addPersonString("karmabathroombjg.jpg", "50%", "rightpopup")) +
				'Not sure why I decided to stand up for this.',
			);

			if (!perYou.isMaleSex()) {
				addPopupLinkC(md, 'fuck her', "A Bit of Tribbing",
					this.addPersonString("karmabathroomsitg.jpg", "60%", "right") +
					'You put a towel down on the floor and go for it! The multitude of feelings here is a little overwhelming for you.',
				);
			} else {
				addPopupLinkC(md, 'Sit while she rides', "You sit on the toilet and she rides your cock.",
					this.addPersonStringRorX("karmabathroomsitb.jpg", "60%", "rightpopup") +
					'The multitude of feelings here is a little overwhelming for you.',
				);				
			}

			addLinkToPlaceC(md, 'See you later Karma', Place);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "karmacharm1") {
			// Charm Karma 1
			md = WritePlaceHeader();
			PlaceI(6, 23);		// Add Rustic Stone to the Lake

			this.showPerson("karma1.jpg");
			addPlaceTitle(md, "Karma Under a Spell");

			md.write(
				'<p>Karma says, "Bless you. You got allergies or something?"</p>' +
				'<p>You reply, "Thank you. I\'m doing just fine though.  Actually I think I can help you." and Karma says,</p>' +
				'<p>"Oh yea how\'s that?"</p>' +
				'<p>You tell her, "You mentioned you were looking for a change of pace from your old life right." and she answers,</p>' +
				'<p>"Yea I did. Thats why I\'m here after all."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Get comfortable and I\'ll explain."', Place, 'type=karmacharm2slave');	
			if (perYou.checkFlag(26)) addLinkToPlaceC(md, '"Everyone needs company"', Place, 'type=karmacharm2gf');	
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "karmacharm2slave") {
			// Charm Karma 2 (Slave)
			md = WritePlaceHeader();

			this.showPerson("karma2.jpg");
			addPlaceTitle(md, "Karma Being Enslaved By A Spell");

			md.write(
				'<p>Karma replies, "Ok. I was getting a bit hot anyway."</p>' +
				'<p>"Good girl, Karma," you say, but she looks annoyed."</p>' +
				'<p>"Hey cut it out with that bullshit ' + this.getYourNameFor() + '". You answer her,</p>' +
				'<p>"No but don\'t you see. That is the change you need.  You were probably super uptight and bossy in your old life in the city. You changed the location but your attitude stayed the same. You won\'t truly have peace until you give up control and let someone else tell you what to do."</p>' +
				'<p>She hesitates, the spell coursing though her mind and body. She answers, "Well I...guess that makes sense in a creepy sort of way.  I\'m guessing you wanted to be the one to make my decisions for me?"</p>' +
				'<p>You firmly answer "Well I am a pretty busy ' + perYou.getManWoman() + ' but I think I can carve out some extra time for a pretty girl like you.  For starters you can take off those clothes. You won\'t need to cover up your boobs ever again."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'tell her to invite you into the tent', Place, 'type=karmacharm3slave');

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "karmacharm3slave") {
			// Charm Karma 3 (Slave)
			md = WritePlaceHeader();

			this.showPerson("karma3.jpg");
			addPlaceTitle(md, "Karma Under a Spell");

			md.write(
				'<p>She leads you into the tent and says,</p>' +
				'<p>"I don\'t know why I agreed to this but not having to think does kinda make me feel good in a tingly warm kinda way."</p>' +
				'<p>You tell her, "Yep that\'s the power of giving up control.  Your mind was getting in the way of your happiness.  Things will be much better now."</p>' +
				'<p>Then you tell her...</p>'
			);

			startQuestions();
			addLinkToPlace(md, '"Now show me everything. Pleasing me will feel good"', Place, 'type=karmacharm4slave');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "karmacharm4slave") {
			// Charm Karma 4 (Slave)
			md = WritePlaceHeader();

			this.showPerson("karma4.jpg");
			addPlaceTitle(md, "Karma Under a Spell");

			md.write(
				'<p>She lies down with you and spreads her ass for you to see all of her naughty bits and exclaims,</p>' +
				'<p>"OoooHH yea that feels good ' + this.getYourNameFor() + '"</p>' +
				'<p>You tell her, "Oh I almost forgot.  You will call me ' + perYou.getMaster() + ' from now on".</p>' +
				'<p>She replies, "umm alright. I guess that\'s fine but why ' + perYou.getMaster() + '....uuuunnnnnhhhhhh oh god. Why did that feel so good... ' + perYou.getMaster() + '? UUUUUUUUUHHHHHHHHH Yeeeaa!"</p>' +
				'<p>You reinforce the message, "See?  It feels good to give up control doesn\'t it?  You will keep your outbursts under control from now on though wont you slave?"</p>' +
				'<p>She answers, "Yes ' + perYou.getMaster() + '...unn I will try"</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Now it\'s time to pleasure me"', Place, 'type=karmacharm5slave');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "karmacharm5slave") {
			// Charm Karma 5 (Slave)
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPersonRorX("karma5b.jpg");
			else this.showPerson("karma5g.jpg");
			addPlaceTitle(md, "Karma Under a Spell");

			md.write(
				'<p>She gasps, "Oh yes ' + perYou.getMaster() + '. Right away. I\'ll ' + (perYou.isMaleSex() ? 'suck your cock' : 'lick your pussy') + ' all day and night if it makes you feel like you make me feel"</p>' +
				'<p>Afterwards your new slave talks a little about the area and mentions the nearby Lake and some odd stories she has heard about it. Nothing very specific little more than your fireside ghost story or odd sightings sort of things.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "leave the Tent", 24);
			addLinkToPlace(md, "return to the campsite", 25);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "karmacharm2gf") {
			// Charm Karma 2 (Girlfriend)
			md = WritePlaceHeader();
			this.charmThem(3);

			this.showPerson("karma2.jpg");
			addPlaceTitle(md, "Karma Being Enchanted By A Spell");

			md.write(
				'<p>Karma replies, "It is getting a bit hot here, isn\'t it?"</p>' +
				'<p>You agree, in both meanings of "hot", and Karma smiles. You compliment her and then explain</p>' +
				'<p>"This is the change you need.  You were probably super uptight and bossy in your old life in the city. You changed the location but now you are just on your own and lonely, right?"</p>' +
				'<p>She hesitates, the spell coursing though her mind and body. She answers, "Well I. guess I do miss other people and companionship"</p>' +
				'<p>You suggest it would be cooler in the tent...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'ask her to invite you into the tent', Place, 'type=karmacharm3gf');

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "karmacharm3gf") {
			// Charm Karma 3 (Girlfriend)
			md = WritePlaceHeader();

			this.showPerson("karma3.jpg");
			addPlaceTitle(md, "Karma Under a Spell");

			md.write(
				'<p>She leads you into the tent and says,</p>' +
				'<p>"I don\'t know why I agreed to this but I suppose it is nice having a ' + (perYou.isMan() ? 'handsome' : 'beautiful') + ' visitor."</p>' +
				'<p>You thank her and compliment her figure and her curvacious rear end. She then removes the rest of her clothing and gestures to you...</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'join her on the bedding', Place, 'type=karmacharm4gf');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "karmacharm4gf") {
			// Charm Karma 4 (Girlfriend)
			md = WritePlaceHeader();

			this.showPerson("karma4.jpg");
			addPlaceTitle(md, "Karma Under a Spell");

			md.write(
				'<p>She lies down and spreads her ass for you to see all of her naughty bits and exclaims,</p>' +
				'<p>"OoooHH yea that feels good ' + this.getYourNameFor() + '"</p>' +
				'<p>You talk of how attractive she is and how she needs company, a friend, a lover. As you do she starts to unbutton your clothing...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'take her in your arms', Place, 'type=karmacharm5gf');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "karmacharm5gf") {
			// Charm Karma 5 (Girlfriend)
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPersonRorX("karma5b.jpg");
			else this.showPerson("karma5g.jpg");
			addPlaceTitle(md, "Karma Under a Spell");

			md.write(
				'<p>She gasps, "Oh yes ' + perYou.getPersonName() + ' you make me feel so sexy, alive and hot". The spell is clearly working through her body, and you embrace her.</p>' +
				'<p>Afterwards Karma talks a little about the area and mentions the nearby Lake and some odd stories she has heard about it. Nothing very specific little more than your fireside ghost story or odd sightings sort of things.</p>'
			);
			
			startQuestions();
			addLinkToPlace(md, "leave the Tent", 24);
			addLinkToPlace(md, "return to the campsite", 25);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "endgame1karma") {
			// End Game - Karma
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Sexy Campers?");

			md.write(
				'<p>One weekend you visit Karma at her campsite and she is standing there with a prominent baby bump, your camper slave has been paying attention to Miss. Logan\'s teachings!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);
					
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "karmarecharm") {
			// Recharm Karma
			md = WritePlaceHeader();
			this.showPerson("recharm.jpg");			
			addPlaceTitle(md, "Karma Under a Charm Spell Again");
			if (this.getCharmedLevel() == 4) {
				this.charmThem(3);
				md.write(
					'<p>Karma comments, "It is getting a bit hot here, isn\'t it?"</p>' +
					'<p>You agree, in both meanings of "hot", and Karma smiles. You compliment her and then explain</p>' +
					'<p>"This is the change you need.  You were probably super uptight and bossy in your old life in the city. You changed the location but now you are just on your own and lonely, right?"</p>' +
					'<p>She hesitates, the spell coursing though her mind and body. She answers, "Well I. guess I do miss other people and companionship"</p>' +
					'<p>You talk of how attractive she is and how she needs company, a friend, a lover. As you do she starts to unbutton your clothing. You take your new girlfriend into your arms!</p>'

				);
			} else {
				this.charmThem(4);
				md.write(
					'<p>Karma comments, "I was getting a bit hot here."</p>' +
					'<p>"Good girl, Karma," you say, but she looks annoyed."</p>' +
					'<p>"Hey cut it out with that bullshit ' + this.getYourNameFor() + '". You answer her,</p>' +
					'<p>"No but don\'t you see. That is the change you need.  You were probably super uptight and bossy in your old life in the city. You changed the location but your attitude stayed the same. You won\'t truly have peace until you give up control and let someone else tell you what to do."</p>' +
					'<p>She hesitates, the spell coursing though her mind and body. She answers, "Well I...guess that makes sense in a creepy sort of way.  I\'m guessing you wanted to be the one to make my decisions for me?"</p>' +
					'<p>You firmly answer "Well I am a pretty busy ' + perYou.getManWoman() + ' but I think I can carve out some extra time for a pretty girl like you.  For starters you can take off those clothes. You won\'t need to cover up your boobs ever again."</p>'
				);
			}

			startQuestions();	
			addLinkToPlaceC(md, 'talk more to Karma', Place);		
			WritePlaceFooter(md);
			return true;				
		}		
		
		return false;
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 24 && this.isCharmedBy() && sType === "") {
			addPopupLinkC(md, 'Suck me in the tent', "Ahh the great outdoors.",
				(isExplicit() && perYou.isMaleSex() ? this.addPersonStringX("karmamouth.jpg", "width:50%", "right") : this.addPersonString("karma5" + (perYou.isMaleSex() ? "b" : "g") + ".jpg", "width:50%", "right")) +
				'This is the life.',
			);

			addPopupLinkC(md, 'Use her ass', "Back it up hard.",
				(perYou.isMaleSex() ? this.addPersonStringRorX("karmaass.jpg", "height:max", "right") : this.addPersonString("karmaass.jpg", "height:max", "right")) +
				'I prefer her mouth but this is a close second.',
			);

			this.addSleepLink(md, "Sleep in the tent", "Bedding Karma",
				'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>Its so peaceful here.</b>',
				'karmasleep.jpg', true, '', '', '', "overflow-y:hidden"
			);
		}
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() ? "endgame1karma" : "";
	};
	
	// Phone calls
	per.isPhoneable = function() {
		// Can you call them?
		if (!checkPlaceFlag("Hotel", 11) && Place == 269) return false;
		return this.isCharmedBy("You");
	};


	per.callThem = function() {
		if (Place == 269) {
			gotoPlace(Place, 'type=karmapool');
			receiveCall('', 'You call Karma and tell her to meet you at the hotel pool for a swim, and she immediately answers, "' + (isDay() ? 'Sure, I love swimming, see you soon' : 'Sure, I love the feel of cool water on my tits') + '"');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (!isOutside()) WriteComments("You call Karma but there is no answer, you should try again somewhere else. Your phone is not the best and you are getting a poor signal here inside.");
		else {
			gotoPlace(Place, 'type=karmaoutdoor');
			receiveCall('', 'You call Karma and say you want to ' + (this.getCharmedLevel() == 4 ? 'use her body' : 'get together') + '. You tell her to meet you near a public bathroom you know. She says she will head over right away.');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// Karma's Campsite
			if (Place == 24 && this.isHere()) {
				if (!this.checkFlag(1)) addComments("You do not know her name, so the spell will not work.");
				else CastCharmSpell("Karma", 24, 4, 'type=karmacharm1', '', 'type=karmarecharm'); // CHARM Karma (outdoor slave)
				return "handled";
			}
		}

		return "";		// do nothing
	};

}
