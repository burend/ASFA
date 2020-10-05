/**********************************************
Camryn
Hannah's Sister
***********************************************/

function CamrynDoAction(ontrue) {
	findPerson("Camryn");
	per.other++;
	if (per.charmedTime < 100) per.charmedTime--;
	if (per.other > 17) {
		dispPlace(801, 'type=camrynbadend&time=out');
		return false;
	}
	if (!per.checkFlag(15)) {
		if (per.charmedTime < 0) {
			if (per.checkFlag(17)) {
				dispPlace(801, 'type=livingroombeer');
				return false;
			} else {
				per.setFlag(17);
				per.charmedTime = 2;
				dispPlace(801, 'type=livingroom&beer=call');
				return false;
			}
		}
	}
	if (ontrue !== undefined) dispPlace(801, ontrue);
	return true;
}

// Are the events for Camryn resolved for good or ill
function isCamrynDone() {
	var perC = findPersonNC("Camryn");
	return perC.place === 1000 || perC.place === 457;
}

function initialiseCamryn()
{
	// Camryn
	addPerson("Camryn", 0, "Camryn");

	per.isPersonInfo = function() { return this.isCharmedBy();	};
	per.getPersonInfo = function() {
		if (isPersonHere("Hannah")) {
			return findPerson("Hannah").addPersonString("hannahcamryn5.jpg", "height:max%", "right") +
				'<p>Hannah and Camryn turned out to be more alike than even they thought, at least in how much they enjoy having sex.</p>' +
				'<p>The two of them didn\'t always see eye to eye in the past, and while recent events and their shared devotion to you made them grow closer, there is still a bit of a rivalry going on between them. Both girls occasionally try to one up the other when it comes to eagerness, dedication or inventiveness, and you do enjoy the benefits of this.</p>' +
				'<p>The two like to put on little shows for you, but this is where their sexual interest in each other ends. They are happy to have both “found” something they really enjoy doing together and eager to explore their common interest, but treat it more like an eccentric hobby and are usually both happy to focus fully on you.';
		}
		return this.addPersonString("camryn8.jpg", "height:max%", "right") +
			'<p>Camryn has come to greatly enjoy the double life she is leading ever since you have put her under your spell.</p>' +
			'<p>She is not really all that submissive, but has a laundry list of kinks she always wanted to try, but never dared to, always fearing she would lose her families approval if her tastes came out.</p>' +
			'<p>Now that she is under your spell, though, this no longer matters. She is able to freely indulge in her newly “found” promiscuity and the only approval she really craves is yours.</p>' +
			'<p>And damn, you approve.</p>' +
			'<p>On the outside, she has redoubled her efforts to give the impression of being a morally upright and slightly prudish girl to her family, friends and coworkers and the only other person she confides in is her similarly enslaved sister Hannah.</p>' +
			'<p>The two have a rough past with each other, but having found common ground in their love for you, they are slowly mending their relationship and growing closer again. Very close at times.';
	};

	per.getPersonAddress = function() { return isPlaceKnown("CamrynsApartment") ? 'Apartment 21, 42 Celeste Rd' : ''; };

	per.passTimeDay = function() {
		if (this.checkFlag(23) && this.place == 801) this.place = 457;
		return '';
	};

	per.possessThem = function() {
		setQueryParams('type=storeroom');
		setComments('');
		Place = 801;
		return true;
	};

	per.dispossessThem = function() {
		if (sType == "camrynbadend" || sType == "camrynbadend2") return false;
		if (this.place === 801) {
			// Gave up/Done it!
			if (this.checkFlag(21)) {
				// Success!
				movePerson("Hannah", 168);	// Hannah meets you at the police station
				addComments(
					"You end the spell and after a moment of disorientation, you return to your own body.</p>" +
					"<p>You hope that Camryn is still out of it long enough to stay put in the safe-room, but you don't have any time to waste before the rest of the group returns and immediately call Hannah after the possession ended.</p>" +
					"<p>You have to dissuade Hannah from trying to have phone sex at first, but the moment you mention her sister, she is once again focused, listens to your explanations and agrees to meet you at the police station."
				);
			} else {
				// Failed
				this.moveThem(1000);		// Gone!
				movePerson("Hannah", 279);	// Hannah meets you at the police station
				addComments(
					"You end the spell and after a moment of disorientation, you return to your own body.</p>" +
					"<p>You have failed to help Camryn and her fate from now is something you would prefer to not think about."
				);
			}
		}
		return true;
	};

	per.showEventPopup = function()
	{
		// Start of the Possession
		if (Place == 801 && !this.checkFlag(1)) {
			this.setFlag(1);
			this.charmedTime = 100;
			showPopupWindow( "Possessing Camryn",
				this.addPersonString("camryn1.jpg", "height:max%", "right") +
				'It takes you a while to get adjusted to your new surroundings, and the first thing you notice that you, well, that Camryn must be horribly hungover.</p>' +
				'<p>Your head is pounding, your vision a little blurry, and it seems like Camryn herself was barely conscious before you took over her body.</p>' +
				'<p>You can always end the possession at any time, <i>click on the portrait or use the end possession link</i>, but what will that mean for Camryn?',
				"dispPlace(801,'type=storeroom')"
			);
			return true;
		}

		if (sType === "") return false;
		
		if (Place == 801 && sType == "room1invis") {
			showPopupWindow( "Invisibility",
				"<img src='Images/thug1.jpg' class='imgpopup' alt='Thug'>" +
				'You finish the incantation and hide next to the door just before it opens.</p>' +
				'<p>The man is clearly shocked to see the empty room and immediately checks the sides of the door to make sure you are not hiding here. You have to hold your breath, hoping that your plan works out.</p>' +
				'<p>He calls out to Camryn, and finally moves into the room to check behind the Cardboard stacks, giving you the chance to slip out, quickly close the door and lock him inside.',
				"CamrynDoAction('type=livingroom')"
			);
			return true;
		}
		if (Place == 801 && sType == "camrynbadend" && getQueryParam("time") == "out") {
			showPopupWindow("Too Slow",
				"<img src='Images/thug3.jpg' class='imgpopup' alt='Thug'>" +
				'You freeze as you hear a key turn in the door-lock. You must wasted too much time, and as you turn around, you see the very surprised faces of the rest of the group.</p>' +
				'<p>“Babe?” One of the men steps towards, and you can feel fear from Camryn\'s mind. “What are you doing here?”</p>' +
				'<p>You try to make up a story to weasel yourself out, but it only takes a little look around for him to realize that you tried to escape. “Don\'t worry Baby, I\'m not mad at you, this misunderstanding was probably my fault.”</p>' +
				'<p>He smiles down to you, and before you are able to say anything, he suddenly presses a piece of cloth with a weird smell against your mouth and your senses begin to cloud over.</p>' +
				'<p>You struggle against his grasp at first, more by reflex, then you realize you need to get out of Camryn\'s body, you need to end the … the... the what again?</p>' +
				'<p>Your mind is weirdly foggy, there was... something you urgently needed to do, but you don\'t know what. Good thing Gabe is here and holding you. He whispers sweet words to you about being there for him and tending to his needs...</p>' +
				'<p>They oddly make a lot of sense and you feel your body relaxing and melting in his arms. You listen to him speak, and even after he removes the cloth, you can\'t help but smile to him and listen to his oh so relaxing voice while your mind happily absorbs everything he tells you...',
				"dispPlace(801,'type=camrynbadend')", "", true
			);
			return true;
		}
		if (Place == 801 && sType == "livingroom" && getQueryParam("beer") == "call") {
			showPopupWindow("Bad, Really Bad!",
				'You are startled by a voice from the Garage: “Hey Jack, can you get me my beer?”</p>' +
				'<p>Only silence answers, and you realize that this is bad for you.',
				"dispPlace(801,'type=livingroom')"
			);
			return true;
		}
		if (Place == 801 && sType == "livingroom" && getQueryParam("act") == "ridehim") {
			showPopupWindow("Subdued",
				this.addPersonStringRorX("camryn21.jpg", "height:max%", "right") +
				'You conjure memories of your many sex filled encounters in the last days to occupy Camryn\'s mind, and focus on making her see how much she wants to do this and how great it will feel. Her resistance falters enough to allow you to take off your pants and lower your hip on the mans cock.</p>' +
				'<p>There is a brief burst of defiance from her mind as you force him into your, well, her sex, but it is no use now, and her resistance breaks as you begin to roll your hip up and down and lean back to push him against your sensitive areas.</p>' +
				'<p>It\'s better than you had imagined, the sensation of being filled, of his shaft grinding against your inner walls... you are suddenly not sure why you ever preferred women to begin with, and while you quickly reach your first climax, you find that you want more... well, -need- more.</p>' +
				'<p>The change is subtle enough for you not to notice it... is it the remainder of Camryn\'s drug filled escapades last night or the way you subdued her mind?</p>' +
				'<p>In the end, it doesn\'t matter, the cock remains rockhard even after the man comes into you, and you just keep riding him, touching your clit, your breasts your hair... everything feels so much more intense right now that you won\'t even stop as you hear the door behind you and several voices begin talking... male voices.... from men, with more cocks.</p>' +
				'<p>Something in you believes that this is a very bad thing for you, but you are not sure why, more cocks mean more of this great feeling, and the moment one of them gets close enough, you draw him towards you and rub your face against the bulge in his pants.</p>' +
				'<p>There is more talking about things you don\'t care about, and you protest at first as they drag you off  that cock, but lucky for you, two others are willing to take his place and they spend the rest of the day taking turns on you before getting ready to leave.',
 				"dispPlace(801,'type=camrynbadend')", "", true
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (Place == 269 && sType == "camrynpool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("camryn-pool.jpg");
			addPlaceTitle(md, "Swimming with Camryn");
			md.write(
				'<p>Camryn arrives, dressed in a white bikini, and she takes a seat on the side of the pool to chat with you before going for a swim.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=camrynpoolsex');
			addLinkToPlaceC(md, 'say goodbye to Camryn', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "camrynpoolsex") {
			md = WritePlaceHeader();
			this.showPerson("camryn-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Camryn");
			md.write(
				'<p>After swimming, you ask Camryn to play with you more privately, and she seductively removes all of her swimsuit and leans against the side of the pool waiting for you to embrace her.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Camryn', Place);
			WritePlaceFooter(md);
			return true;
		}


		if (Place == 237 && this.place === 0 && sType === "") {
			// are we ready to start her events?
			// Sunday && Prerequisites: Hannah charmed, Monique charmed, Possession learned
			if (isDemonFreed() && Math.floor(nTime / 288) > 5 && isSpellKnown("Possession") && isCharmedBy("Monique") && isCharmedBy("Hannah")) {
				movePerson("Hannah", 457);
				this.moveThem(801);
				return false;
			}
		}

		if (Place == 172 && sType == "waithannah") {
			md = WritePlaceHeader();
			movePerson("OfficerBatton", 168);
			WaitHereOnly(12);
			AddImage("police-waitingroom.jpg");
			addPlaceTitle(md, "Waiting with Hannah");
			md.write(
				'<p>In the next 30 minutes, the police station is abuzz, with several officers seemingly being called in from other assignments to assists with the operation while both you and Hannah are being led into a waiting room. You can see both ' + getOfficer() + ' Kahn and Ross arrive at the station to gear up and get into a police van with several other policemen, while only ' + getPoliceChief() + ' Batton and a core team stays behind to coordinate the operation.</p>' +
				'<p>The wait is grueling, and especially Hannah is often standing up from her seat and pacing through the room, occasionally asking officers passing by about any news but always getting the same answer that the operation is still underway and she will need to wait.</p>' +
				'<p>To your surprise, though, she not once asks you for sex. ' +
				(checkPersonFlag("Hannah",13) ? 'She speaks to you, and sometimes makes a suggestive comment what  she would like to do with her and you once this is over to take her mind away from the worry,' :
																				'She sometimes leans on your shoulder and definitely sees you as her emotional support,') +
				'but it does seem like there are limits to the extend the spell is able to make you the center of someones world.</p>' +
				'<p>Finally, after almost 2 hours, ' + getPoliceChief() + ' Batton enters the room.</p>'
			);
			if (isCharmedBy("OfficerBatton")) {
				md.write(
					'<p>"We did it ' + perYou.getPersonName() + '!” Kerry looks at you with pride as she enters the room. “The operation has been a full success. We managed to arrest all 5 members of the group and Ms Gifford is well and on her way to the station. We will have to keep her for a day to make sure she is fine and take her testimony, but after that, you will be able to meet her.”</p>' +
					'<p>Hannah looks like a load has been taken off her mind thanking you with a deep hug (And whispering the promise of far more later into your ear) before doing the same for Kerry and apparently apologizing for what she called her during an incident a few months back.</p>' +
					'<p>Kerry uses the opportunity to cop a feel of Hannah\'s butt while giving a playful wink to you, and gladly accepts the apology. “We are all sisters under ' + perYou.getPersonName() + '\'s care now, right? No need to hold on to old grudges.”</p>'
				);
			} else {
				md.write(
					'<p>“Ms. Gifford?” She smiles To Hannah. “The operation has been a full success. Your sister is unharmed and being taken care off, and we managed to arrest all 5 members of the group.”</p>' +
					'<p>The news takes a load of  Hannah\'s mind, and she seems close to tears as she gives you a hug and thanks the ' + getOfficer(false) + ' for her help, also mentioning an incident a while back she is apparently really sorry for, now.</p>' +
					'<p>' + getPoliceChief() + ' Batton gladly accepts the apology and explains that Camryn will have to remain in police custody for two more days to make sure she is fine and record her testimony, but Hannah will be able to see her as soon as she arrives at the station, and she thanks you for your help in finding the girl as well.</p>'
				);
			}
			startQuestions();
			addLinkToPlaceC(md, 'Return to the station main hall', 168);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 457) {
			// Charm her
			if (sType == "charmcamryn1") {
				md = WritePlaceHeader();
				this.showPerson("camryn11.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>You tell her it\'ll be easy to explain and ask for a cup of tea as you do, and while Camryn prepares it, you focus on her and quickly recite the spell in well practiced motions. “Dai Chu, Camryn!”</p>' +
					'<p>“Bless you!” She shouts from the kitchen nook, and as she returns to you, you already see the first effects of the spell as her nipples begin to press against the fabric of her top.</p>' +
					'<p>“You know, Hannah really speaks highly of you, and she told me what a big help you were in finding me.” She places the tea on the table and sits down.</p>' +
					'<p>“I know you are her ' + (perYou.isBornMale() ? 'boyfriend' : 'girlfriend') + ', but if there is -any- way I could properly thank you...” She begins to play with her pants\' belt loops, her eyes focused on you as she wets her lips.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'ask what she is implying', 457, 'type=charmcamryn2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcamryn2") {
				md = WritePlaceHeader();
				this.showPerson("camryn12.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>“Nothing!” Camryn shakes her head. “I would never dare to try to seduce my sisters lover, even if they are... really... ' + (perYou.isBornMale() ? 'handsome' : 'beautiful') + '.”</p>' +
					'<p>Camryn pulls in her lower lip and begins to pull her pants down a little, but stops herself midway.</p>' +
					'<p>“No, no, I really shouldn\'t be doing this... it\'s not right... is it?” She looks at you longingly.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'not if she wants to be a “good girl”', 457, 'type=charmcamryn3');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcamryn3") {
				md = WritePlaceHeader();
				this.showPerson("camryn13.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>“Right... right...” She nods. “Trying to be the bad girl didn\'t really work out so well, did it? And trying to seduce my own sisters gorgeous lover, now that would be naughty, would it?”</p>' +
					'<p>You point out to her that she had actually pulled down her pants completely while she spoke, and that realization seems to take her completely off guard.</p>' +
					'<p>“I\'m... just very hot! Warm! I mean, why else would I expose my long sexy legs to you?” She over-crosses her legs, slowly draws her fingers along them and straightens her body, but you can clearly see her twitch nervously as the spell alters her perception into accepting this behavior as normal. “I hope you don\'t mind the view, I\'ve been working out, you know?”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'tell her to cut the charade', 457, 'type=charmcamryn4');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcamryn4") {
				md = WritePlaceHeader();
				this.showPerson("camryn14.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>“You know what I think, Camryn?” She shivers as you speak her name. “I think you like being a bad girl. I think you actually enjoy showing your naked skin to your sisters lover and tease ' + perYou.getHimHer() + '.” You lean forward and rest your chin on both hands. “I think you actually are trying to seduce me, are you, Camryn?”</p>' +
					'<p>“What? No I...”</p>' +
					'<p>“Show me your tits.” You interrupt her, and Camryn doesn\'t waste a second before she almost tears her top open, her voice desperate as she looks at you. “Y...you are right... “She whispers. “I know I shouldn\'t... why am I doing this?”</p>'
				);
				startQuestions();
				startAlternatives(md);
				addLinkToPlaceC(md, 'tell her it\'s because she likes it', 457, 'type=charmcamryn5a');
				addLinkToPlaceC(md, 'tell her it\'s because you command her to', 457, 'type=charmcamryn5b');
				endAlternatives(md);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcamryn5a") {
				md = WritePlaceHeader();
				this.showPerson("camryn15.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>“Because you enjoy it.” You tell her. “All your life, you have been the “good girl”, have you not? Pleasing others and watching from afar while Hannah had all the fun, am I right?”</p>' +
					'<p>Camryn nods sheepishly.</p>' +
					'<p>“And you like it, you like the praise you get, you like the thought of setting a good example, meeting expectations... but deep down, you long to misbehave, to do all the naughty things Hannah got away with all her life, and not be judged for it.”</p>' +
					'<p>"Yes....” She whispers. “Yes, I do...” You watch as her eyes loose focus and the spell capitalizes on the weakness you exposed, the last of her resistance fading away.  As you rise to your feet, you see her body sliding down the chair, helplessly looking up to you. “I want you so much, I know it\'s wrong but I want you to take me and do all the naughty things with me you are doing with my sister!” She sobs. “Oh ' + perYou.getPersonName() + ', what should I do?”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'give her one last push', 457, 'type=charmcamryn6a');
				WritePlaceFooter(md);
				return true;
			}
			if (Place == 457 && sType == "charmcamryn5b") {
				//Slave charm
				this.charmThem(4);
				md = WritePlaceHeader();
				this.showPerson("camryn17.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>“You are doing this, because I want you to, Camryn. And now, I want you to turn around and present your ass to me.” Camryn seems startled by your admission, even more when she realizes that she indeed is doing as you tell her.</p>' +
					'<p>“How are you...”</p>' +
					'<p>You motion her to be quiet and rise to your feet.</p>' +
					'<p>“Well, first off, I am not Hannah\'s lover, I am her ' + perYou.getMaster() + ', and she is my slave, just as you will be.” You drive your fingers over Camryn\'s ass and she gasps as you suddenly pull her panties up into her pussylips.</p>' +
					'<p>“You can feel it, too, can you? That burning desire you can\'t explain, the rising need to be touched by me, kissed by me...” You take her hair and roughly pull back her head, your lips close to her ear. “Fucked by me.”</p>' +
					'<p>Camryn breathes faster, her heart pounding in her chest as she tries to say something, but only manages to breath out a single word. “How?”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'tell her', 457, 'type=charmcamryn6b');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcamryn6a") {
				md = WritePlaceHeader();
				this.showPerson("camryn16.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>“Be yourself, I happen to like bad girls.” You caress her cheek and she nuzzles into your touch. “You can be the “good girl” for your parents, your coworkers or your boss... but for me, you\'ll be my personal, naughty little slut, able to do all the nasty things you always wanted to while knowing with certainty that I not only won\'t disapprove, but love you for it.”</p>' +
					'<p>“But Hannah...” You place a finger on her lips. “Does not mind, in fact, she\'ll be delighted to finally have something in common with you.” You move your lips close to hers. ”This is about what you want, and you want to be mine, do you?”</p>' +
					'<p>There is a short moment of hesitation, but soon, a radiant smile forms on Camryn\'s lips as the spell claims her fully. “You are right...” She nods. “I want to be yours, I don\'t know why but I do! So please... don\'t make me wait any longer...”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'kiss her', 457, '', 'The two of you share a long passionate kiss, and as your lips untangle, you see a naughty gleam in Camryn\'s eyes, the spell having completed its work.</p><p>“I\'ll slip into something more... naughty for you, ”' + perYou.getMaster() + '”, just give me a moment.” She says in a teasing voice and vanishes in her bedroom to change out of what is left of her clothes while you sit down and happily finish your tea.');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcamryn6b") {
				md = WritePlaceHeader();
				this.showPerson("camryn18.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>“Because I\'m a ' + perYou.getWitch() + ', and I have placed a spell on your sisters mind.” You push down her panties, and give her a good slap on the rear. “She belongs to me with body, mind and soul, and after she asked me to use my magic to safe you, you became mine by right as well.”</p>' +
					'<p>You are not entirely sure how you keep coming up with these lines, but as always, you enjoy the rush of power during these games, the sensation of Mana flowing between you and her, feeling her mind struggle fruitlessly against your influence and slowly give in...</p>' +
					'<p>Camryn pleads with you for a last time, but the spell has already claimed her Mind. All you need to do is give her a light push by pulling her body close to yours, placing one hand on her clit, and focusing on the mana within her to push her into a powerful climax.</p>' +
					'<p>Her body bends and twitches in your grasp, convulsing with every pulse of pleasure you send into her, and as she finally calms down and looks up to you, her eyes only show blissful obedience.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'order her to wear something sexy and get ready for you', 457, '', '“Of course, ' + perYou.getMaster() + '!” Camryn smiles happily. “Everything for you!” She quickly vanishes inside her bedroom to find something more appropriate for her new role to wear, and you calmly sit down and take sip of your tea as you await her return. ');
				WritePlaceFooter(md);
				return true;
			}

			// Charm her with Hannah
			if (sType == "charmcamrynwithhannah1") {
				md = WritePlaceHeader();
				this.showPerson("camryn23.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>The three of you talk about the recent happenings, Camryn\'s role in it and how sorry she is, and finally, the topic falls on you and Hannah, with Camryn curiously asking how you managed to make her sister, who was never interested in ' + (perYou.isBornMale() ? 'long term relationships' : 'women') + ' fall for you like that.</p>' +
					'<p>“Ah, that\'s easy.” Hannah says before you are able to answer. “I knew that I loved ' + perYou.getHimHer() + ' the moment ' + perYou.getHeShe() + ' finished casting a spell on me which dominated my mind and bound me to ' + perYou.getHimHer() + ' as a sexslave.”</p>' +
					'<p>There is a brief moment of silence in which Hannah grins to you and Camryn tries hard to figure out if this was supposed to be a joke.</p>' +
					'<p>“So, you met ' + perYou.getHimHer() + ' at one of these Larp things you used to go to, yes?” Camryn blushes slightly. “I didn\'t know they get so... kinky.”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'show her that Hannah was quite serious', 457, 'type=charmcamrynwithhannah2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcamrynwithhannah2") {
				md = WritePlaceHeader();
				this.showPerson("camryn24.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>You tell Camryn that you indeed bound her sister to your will, and since she does not seem to believe you, you offer a demonstration and cast the spell before she is able to answer. “Dai Chu, Camryn!”</p>' +
					'<p>Camryn eyes the two of you suspiciously, but does not interfere as you guide your mana into her body and finally just breathes out an annoyed sigh. “Sorry, I\'m not sure what you are trying to do here, but I\'m really not into that “kink” and “sexy roleplay” stuff.” Her nipples begin to press against the thin fabric of her shirt as she speaks, a fact she does her best to ignore. “Even less when my big sister and her... rather sexy lover are doing it.” Her face flushes some more and you can see her briefly pulling her lower lip inside, as if contemplating something.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'she doesn\'t look like she is not into it', 457, 'type=charmcamrynwithhannah3');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcamrynwithhannah3") {
				md = WritePlaceHeader(false, 'td-left-med');
				findPerson("Hannah").showPerson("hannahcamryn7.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>“You really need to stop lying to yourself about these things, Cam. “Hannah suddenly pulls of her pants, rises from the couch and walks towards her sister before you are able to say something. “I know how you always pretended to be annoyed when I told you about my sex-life and yet never stopped me.” She sits down next to her sister and grins to you, playing with the zipper of Camryn\'s shorts.</p>' +
					'<p>“And ' + perYou.getPersonName() + ' was pretty much in your head recently, I bet ' + perYou.getHeShe() + ' saw all your dirty little secrets, right?” She looks at you, and give her a confirming nod. Well, it\'s not like you were able to really probe her mind, but she doesn\'t need to know that.</p>' +
					'<p>“What? No!” Camryn is clearly startled by her sisters boldness. ”I mean, I\'m not exactly saving myself for marriage, but I would never engage in the more... deviant acts...”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'let Hannah do this', 457, 'type=charmcamrynwithhannah4');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcamrynwithhannah4") {
				md = WritePlaceHeader();
				findPerson("Hannah").showPerson("hannahcamryn8.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>You can\'t help but think that Hannah has kind of taken control of the situation from you, but she knows her sister better than anyone, and you admit, you like the idea of watching the pair.</p>' +
					'<p>“Then why are you not stopping me now?” Hannah asks in a teasing voice as she pulls down her sisters shorts and cops a feel of her breasts. “I\'m undressing you in front of my lover, no, my ' + perYou.getMaster() + ', can it get any more “deviant” than that?”</p>' +
					'<p>Camryn gasps in shock as she realizes what is happening and tries to push Hannah away. “What... what are you doing with me?”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'no harm in telling her now', 457, 'type=charmcamrynwithhannah5');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcamrynwithhannah5") {
				md = WritePlaceHeader();
				findPerson("Hannah").showPerson("hannahcamryn9.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>“It is as your sister said.” You explain to the confused girl. “I have used a spell to turn your sister into my slave, and you will soon be mine as well.”</p>' +
					'<p>“That\'s not... please...”</p>' +
					'<p>“You can feel it, can you?” Hannah interrupts her sister and pulls down her shirt. “Your thoughts slowly changing as it takes over your mind? Just relax and let it happen, trust me, it feels really good.”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'watch the pair', 457, 'type=charmcamrynwithhannah6');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcamrynwithhannah6") {
				md = WritePlaceHeader(false, 'td-left-med');
				findPerson("Hannah").showPerson("hannahcamryn10.jpg");
				addPlaceTitle(md, "Camryn Under a Charm Spell");
				md.write(
					'<p>There is a feeble whimper from Camryn\'s lips, but she does not fight back as Hannah pushes her down onto the couch and straddles her.</p>' +
					'<p>“You can\'t do this, please sis...“ Camryn looks up to her sister with her eyes wide open as Hannah pushes her panties down, her voice turning into barely a whisper. “I... don\'t want to be a slave.”</p>' +
					'<p>“You already are, Cam.” Hannah\'s hands caress her sisters breasts and slide down her sides, luring a tender moan from her lips. “You can finally live out all those dirty little fantasies you always tried to hide from me, Mom and Dad, and we\'ll finally have something we enjoy doing together.” Hannah grins. ”So just give in, look at ' + perYou.getHimHer() + ' and tell ' + perYou.getHimHer() + ' what you are.”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'wait for her to speak', 457, 'type=charmcamrynwithhannah7');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcamrynwithhannah7") {
				md = WritePlaceHeader(false, 'td-left-med');
				findPerson("Hannah").showPerson("hannahcamryn11.jpg");
				addPlaceTitle(md, "Slave Camryn");
				md.write(
					'<p>Camryn hesitates, her chest heaving under heavy breathing as she turns to you and allows her eyes to linger.</p>' +
					'<p>“I... I am...” She pulls her lower lip inside, and Hannah gives her a little push ”' + capitalizeFirstLetter(perYou.getHisHer()) + ' Slave...”</p>' +
					'<p>“Your slave...” She speaks the words as if tasting them, and you smile in approval.</p>' +
					'<p>“Say it again.”</p>' +
					'<p>“I am your slave, ' + (perYou.isBornMale() ? 'Sir' : 'Ma\'am') + '.” Camryn repeats, her voice more firm now that the idea takes hold in her mind, and her lips form a wide smile.</p>' +
					'<p>“Hannah is right, ' + perYou.getPersonName() + ', I am already yours, please allow me to serve you at my sisters side, my ' + perYou.getMaster() + '”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'of course she may', 457, '', 'Camryn seems overjoyed as you accept her as your own, and the two sisters look at you expectantly.</p><p>“Thank you, ' + perYou.getPersonName() + '. She gives her sister a tender hug. “I will happily do whatever you want of me.”</p><p>“And don\'t hold back on her, she\'s more kinky than one might think.”</p><p>“Hannah!”</p><p>You chuckle at the banter between the two and rise from your seat, ordering the pair to head into the bedroom and prepare themselves for you.');
				WritePlaceFooter(md);
				return true;
			}

			// Sex scenes
			if (sType == "ggshow") {
				md = WritePlaceHeader();
				this.showPerson("camryn5.jpg");
				addPlaceTitle(md, "Good Girl\'s Show");
				var sm = perYou.isBornMale() ? 'sir' : 'ma\'am';
				md.write(
					'<p>You move close to Camryn and drive your fingers down her side, whispering to her. “I want you in your bedroom and on your knees, and I want your pussy to be wet when I join you, understood?”</p>' +
					'<p>You give her ass a light slap, and she makes sure to playfully wiggle it for you as she turns around. “Yes, ' + sm + '!”</p>' +
					'<p>You make sure to wait for a few seconds to allow her to get ready, and when you finally join her, you make a bit of a show inspecting her.</p>' +
					'<p>“Lovely, and rather naughty to put yourself on display like that, is it not?”</p>' +
					'<p>“Yes ' + sm + '!” Camryn chuckles softly, her body shivering in excitement as your eyes wander over it.</p>' +
					'<p>“And you love it.” You grin. “Put both hands on your ass and push your hip forward, let me see that pussy.”</p>' +
					'<p>Camryn doesn\'t even hesitate before following your order and eagerly puts her most private parts on display for you, her sex coated in a thick layer of wetness.</p>' +
					'<p>“Look how wet you are...” You tell her and drive two fingers up and down her nether-lips. “Imagine people seeing you like this. “She moans as you flick your fingers over her clit. “Imagine them seeing you present your naughty, wet, pussy to them, hearing you moan like in heat...” Your voice slowly drifts into a sensual whisper as you move behind her, pressing one knee against her hip to keep it pushed forward. “Imagine they might watch you as you begin to finger yourself, putting on a show for them, would that be naughty?”</p>' +
					'<p>“Y...yes ' + sm + '... very much...” Camryn shivers under your touch, her breath erratic and her hip twitching as she moves one hand to her sex.</p>' +
					'<p>“Then do it, show me all that passion you like to hide so much and cum for me.”</p>' +
					'<p>“Y...yes...! Oh God...” It takes her surprisingly little effort to actually reach that point. Her eyes remain close as she winds herself on the bed, feverishly driving her fingers in and out of her sex while she twitches in your arms.</p>' +
					'<p>Within moments, her body begins to tremble, her breasts bouncing with every hasty gasp until she finally explodes into a long, drawn out moan and comes to rest on your shoulder, her fingers soaked in her juices, and she wastes no time to lick them clean and make sure you have a good view of it.</p>' +
					'<p>“Good Girl.”</p>'
				);

				if (isPersonHere("Hannah")) md.write('<p><i>You notice that Hannah has been watching the two of you the whole time with a grin on her lips and her fingers resting between her folds. She looks like she had a good time as well and certainly liked what she saw.</i></p>');

				startQuestions();
				addLinkToPlaceC(md, 'talk more to Camryn', 457);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "gggirls") {
				md = WritePlaceHeader();
				this.showPerson("camryn7.jpg");
				addPlaceTitle(md, "Good Girl\'s Are Not Into Girls");
				md.write(
					'<p>“I... don\'t think I really know what to do with another girl.” Camryn admits as you lead her into the bedroom and the two of you begin to undress each other. “You are the first I fell for...”</p>' +
					'<p>“Just follow my lead.” You remove the last of her clothes and push her onto the bed. “I\'ve taught Hannah, too, and she learned marvelously.”</p>' +
					'<p>“Of course she did...” There is a chuckle from her as you mention her sister, and her eyes narrow in determination. “If she can do it, I can as well! So, uhm, what do I do?”</p>' +
					'<p>“For now, lie back, and enjoy.” You focus on the mana inside her and use it to send a wave of pleasure into Camryn\'s body the moment your tongue flicks over her clit, startling her. “How did you... oooh...”</p>' +
					'<p>Her body bends and twitches under your assault, the sensations amplified by your spell to ease her into the new situation, though you are sure you have gotten pretty good at this without relying on the spell alone, too, and soon, her body begins to tense into an arch with a loud groan as she reaches her first climax.</p>' +
					'<p>“Wow...” She slumps down, panting heavily. “You are good at... this...”</p>' +
					'<p>“At what?” You ask and tickle her clit.</p>' +
					'<p>“Licking pussy, ma\'am!” She blurts out, and the two of you share a laughter.</p>' +
					'<p>“Good,” You crawl up the bed and straddle her face.” And now let\'s see how fast you really learn....”</p>'
				);

				if (isPersonHere("Hannah")) md.write('<p><i>You notice that Hannah has been watching the two of you the whole time with a grin on her lips and her fingers resting between her folds. She looks like she had a good time as well and certainly liked what she saw.</i></p>');

				startQuestions();
				addLinkToPlaceC(md, 'talk more to Camryn', 457);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "ggswear") {
				md = WritePlaceHeader();
				this.showPersonRorX("camryn6.jpg");
				addPlaceTitle(md, "Good Girl\'s Don\'t Swear");
				md.write(
					'<p>Camryn leads you into the bedroom and the two of you undress each other sharing hot kisses.</p>' +
					'<p>“I still can\'t believe I\'m making love to my sisters lover... how naughty.”</p>' +
					'<p>You chuckle and remind her how they are pretty much sharing you, and she just grins. “Even more naughty this way.”</p>' +
					'<p>She crawls onto the bed and lies down on her stomach, presenting her rear to you. “Please don\'t make me wait, I long to feel you in my... in me.”</p>' +
					'<p>“In your what?” You smirk at her blunder and teasingly align your hip with hers, stroking your cock.”</p>' +
					'<p>“In my...” She pulls her lower lip inside for a brief moment, then just gives up in a giggle. “In my pussy!”</p>' +
					'<p>“Wait!”</p>' +
					'<p>“In my cunt! I want you to ram your thick, hard cock into my wet, needy cunt, sir!”</p>' +
					'<p>There is a brief moment of silence before the two of you share a loud laughter.</p>' +
					'<p>“You are a positively filthy woman, Ms. Gifford.” You say as you align the tip of your cock with her folds, and she grins over her shoulder.</p>' +
					'<p>“Thank you, sir, I agh...” You interrupt her by pushing her hip down to the bed and luring a sharp gasp from her as you enter her sex and start rolling your hip against her body roughly.</p>' +
					'<p>“Oh.. yes... fuck me... ” She breathes out the words, pushing her hip back and bracing herself for you. “Please fuck me, sir!”</p>' +
					'<p>Camryn reacts to every stroke with a stream of expletives, and you enjoy seeing her cut loose like that, your lips moving close to her ears as you whisper to her how much she enjoys being fucked like this, reminding her again and again that she loves being your bitch and letting you do all these nasty things to her until you both collapse on her bed in exhaustion, basking in the afterglow of your climaxes.</p>'
				);

				if (isPersonHere("Hannah")) md.write('<p><i>You notice that Hannah has been watching the two of you the whole time with a grin on her lips and her fingers resting between her folds. She looks like she had a good time as well and certainly liked what she saw.</i></p>');

				startQuestions();
				addLinkToPlaceC(md, 'talk more to Camryn', 457);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "sistersbedroom") {
				md = WritePlaceHeader(false, 'td-left-med');
				findPerson("Hannah").showPerson(perYou.isMaleSex() ? "hannahcamryn4.jpg" : "hannahcamryn3.jpg");
				addPlaceTitle(md, "Bedding the Sisters");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>The two sisters lead you into the bedroom and you pull Hannah close to you to taste her lips for a few seconds before doing the same with Camryn, both sisters trading passionate kisses with you and finally sharing one among themselves.</p>' +
						'<p>Hannah and Camryn eagerly follow as you lead them to the bed and sit down, and soon, both their lips begin to cover your neck in soft kisses, while their fingers caress your legs and drive over your abdomen, finally meeting in the middle.</p>' +
						'<p>You exhale softly as they both begin to massage your manhood and slowly let yourself fall back and   enjoy their attentions.</p>' +
						'<p>Hannah is more bold in her movements, more certain about what she needs to do after spending so much time under your care. She almost immediately begins to work on your shaft to get you fully hard and covers your entire length in her saliva while her sister watches her.</p>' +
						'<p>Camryn mostly copies her more experienced sister most of the times you are together, but she is definitely a fast learner, and occasionally surprises you with a few kinky ideas, and when you order the pair to get ready for you, she is also the one to flip Hannah on her back and straddle her, pinning her sister down for you to have some fun.</p>' +
						'<p>You take turns enjoying the sisters bodies, starting by pushing into Camryn\'s tight sex before switching to Hannah and back, always making sure to use the spell to keep their arousal at peak so none of them feels neglected, and soon, both of their bodies are heavily intertwined, their lips close to each other as they gasp and moan under your care, lost in a haze of magic and pleasure until you finally feel your own peak approach and send them over the edge. All three of you enjoying a strong, and fairly loud, climax.</p>'
					);
				} else {
					md.write(
						'<p>The two sisters lead you into the bedroom and you pull Hannah close to you to taste her lips for a few seconds before doing the same with Camryn, both sisters trading passionate kisses with you and finally sharing one among themselves.</p>' +
						'<p>Hannah and Camryn eagerly follow as you lead them to the bed and sit down, and soon, both their lips begin to cover your neck in soft kisses, while their fingers caress your legs and drive over your abdomen.</p>' +
						'<p>You allow your body to lean back and close your eyes, a soft gasp leaving your lips as you feel their lips trail over your shoulders and their hands cup your breasts, their naked bodies pressed against your side and their tongues finally flicking over your nipples.</p>' +
						'<p>Hannah is more bold in her movements, more certain about what she needs to do after spending so much time under your care, but while Camryn mostly copies her more experienced sister, she is definitely a fast learner, and you expect her to surprise both of you soon.</p>' +
						'<p>It\'s also Camryn who is the one to finally push you onto your back and her lips on yours for another deep kiss, and you enjoy the taste of her tongue while Hannah spreads your legs and flicks hers over your clit.</p>' +
						'<p>You spread out your arms and dig your fingers into the pillow behind you while the two sisters tend to all your needs, caressing your skin, kissing your neck and softly playing with your nipples, Both of them take turns tending yo your most sensitive spots, and as you reach your climax, Hannah\'s fingers are buried deeply within your sex while her sisters lips have closed around your clit. Your body tenses up under their combined touch, and both of them greatly enjoy seeing you cum.</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, 'talk more to Camryn and Hannah', 457);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "sistersshower") {
				md = WritePlaceHeader();
				findPerson("Hannah").showPerson(Math.random() < 0.5 ? "hannahcamryn1.jpg" : "hannahcamryn2.jpg");
				addPlaceTitle(md, "Hot Shower");
				md.write(
					'<p>“The bathroom is right over there.” Camryn answers quickly. “Would you like us to... help you?”</p>' +
					'<p>“Of course ' + perYou.getHeShe() + ' would.” Hannah interjects with a chuckle. “' + capitalizeFirstLetter(perYou.getHeShe()) + ' never just wants to take a shower alone, right?”</p>' +
					'<p>Hannah winks to you, and while there are moments where you prefer to shower in solitude, you admit that she was spot-on when it came to guessing your intentions.</p>' +
					'<p>“We\'ll get everything ready, ' + (perYou.isBornMale() ? 'Sir' : 'Ma\'am') + '!” Camryn jumps to her feet in excitement, and Hannah quickly follows her. “Just leave this to us.”</p>' +
					'<p>You hear some rustling and running water from the bathroom, and you use the time to undress until the two call you in, and you are greeted with quite a sight.</p>' +
					'<p>The air is humid, steam from the shower has filled the bathroom and your nose takes in a very pleasant smell you can\'t quite place, but most of your attention is taken by the two sisters, their naked bodies pressed against each other as they share a deep and passionate kiss the moment you enter.</p>' +
					'<p>Your body tingles all over from the sight alone, and you enjoy the show a little longer before they both turn to you with a smile and beckon you into the shower to join them.</p>' +
					'<p>And of course you do.</p>' +
					'<p>The three of you spend far longer in the shower than you should, but you don\'t care, you are sandwiched between two beautiful women who use their whole bodies to cover you in soap, touch every sensitive part of your skin and waste no opportunity to share passionate kisses with you.</p>' +
					'<p>It\'s truly something you could get used to.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk more to Camryn and Hannah', 457);
				WritePlaceFooter(md);
				return true;
			}
		}

		if (Place != 801) return false;

		if (sType == "storeroom") {
			md = WritePlaceHeader();
			AddImage("emptystorageroom.jpg");
			addPlaceTitle(md, "Storage Room");
			md.write('<p>You are inside a dark storage room.</p>');
			startQuestions();
			// First set
			if (!this.checkFlag(2)) {
				addQuestionR(md, 'check your surroundings',
					'You are on a makeshift bed in a windowless room, there is a small lamp offering a little light, it hurts your eyes at first as you turn it on, but they adjust.</p>' +
					'<p>You see a set of boxes, rolled up wallpaper and cans of paint, it looks like a storage room no one used until recently.</p>' +
					'<p>There is a single door, light shines through the cracks and you hear voices talking outside.',
					"",
					"setPersonFlag(\\'Camryn\\',2)"
				);
			}
			if (!this.checkFlag(3)) {
				addQuestionR(md, 'check yourself',
					'Camryn is wearing shorts and a top, but no underwear. She has no bruises, but clearly an eventful time behind her.',
					"",
					"setPersonFlag(\\'Camryn\\',3)"
				);
			}
			if (!this.checkFlag(4)) {
				addQuestionR(md, 'focus on Camryn\'s thoughts',
					'You feel confusion and fear. Camryn is apparently not sure herself what has happened in the last days.</p>' +
					'<p>As you dig deeper, you feel guilt and regret, she is thinking of her sister and what her boyfriend has done, it looks like she no longer wants to be here, but is unable to leave.</p>' +
					'<p>There is a sense of urgency, as if someone is about to return and you don\'t have a lot of time to get away. You should possible make sure to not waste time while you possess her.',
					"",
					"setPersonFlag(\\'Camryn\\',4)"
				);
			}
			if (this.checkFlag(2) && this.checkFlag(3) && this.checkFlag(4)) {
				// Second set
				addQuestionR(md, 'check the boxes',
					'Wallpaper paste, paint rollers, brushes... someone is apparently in the middle of renovating this house, but none of the tools look like they are of use to you.',
					"",
					"setPersonFlag(\\'Camryn\\',5);CamrynDoAction()"
				);
				addQuestionR(md, 'look for secret doors',
					'You spend a few minutes checking the walls for drafts or secret mechanisms, but soon realize you are just wasting precious time here. Why should a storage room have a secret entrance to begin with?',
					"",
					"setPersonFlag(\\'Camryn\\',6);CamrynDoAction()"
				);
				addPopupLinkC(md, 'masturbate', "",
					this.addPersonString("camryn2.jpg", "height:max%", "right") +
					'This might be the least efficient way to spend your limited time, but you have to admit you are curious what it will feel like ' + (perYou.isBornMale() ? 'to do this as a girl' : 'in the body of someone else') + '.</p>' +
					'<p>You pull down Camryn\'s top and squeeze your, well, her breasts with both hands, sliding your fingers over the smooth orbs and gasping softly as you touch her nipples.</p>' +
					'<p><i>“Why am I doing this?”</i></p>' +
					'<p>You feel Camryn\'s thoughts resonate through your body as you pull down her shorts, her mind still dominated by the possession, but somewhat growing aware of what you are doing.</p>' +
					'<p><i>“No... someone might come in and see me...”</i></p>' +
					'<p>You ignore her thoughts and begin to touch your... her clit ' + (perYou.isBornMale() ? 'the way you have learned it from your many girls' : 'in well practiced motions,') + ' and a shiver runs through your body.</p>' +
					'<p>“No, they\'ll see me... need to stop, why does it feel so much better than usual...”</p>' +
					'<p>You feel a sense of rising arousal from Camryn\'s mind as you begin and it only emboldens you further, so you spread your legs widely and shift your position to face the door, making sure that whoever might come in would have a good view, and you feel Camryn\'s body shiver, her mind in a frenzy, clearly heavily aroused.</p>' +
					'<p>It doesn\'t take you long like this to bring Camryn\'s body to orgasm, a different feeling to what you are used to, but very much a pleasant one, your body still trembling softly as you put the shorts back on and rise to your feet.',
					false, "setPersonFlag('Camryn',7);CamrynDoAction();dispPlace(801,'type=" + sType + "')"
				);
				addQuestionR(md, 'try to open the door',
					'The door is locked. Whoever put Camryn in here, doesn\'t want her to leave.',
					"",
					"setPersonFlag(\\'Camryn\\',8)"
				);
				addLinkToPlaceC(md, 'try to eavesdrop on the conversation outside', 801, 'type=storeroomlisten', '', '', 'CamrynDoAction()');
			}
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "storeroomlisten" || sType == "room1invis") {
			md = WritePlaceHeader();
			AddImage("emptystorageroom.jpg");
			addPlaceTitle(md, "Storage Room");
			md.write(
				'<p>You almost fall over as you stand up, but manage to steady yourself enough to make it to the door and focus on the voices outside.</p>' +
				'<p>“....still don\'t like it. Sure, the bike will fetch a pretty penny from those wannabe-military weirdos, but she knows his face and might call the police on us.” A clearly male voice speaks, and someone else answers.</p>' +
				'<p>“She dislikes the police, and even if, we\'ll be out of town before they start searching. It\'s just a pity the bike only had room to bring one of them, she\'d have had fun here, after a dose of this stuff.”</p>' +
				'<p>You are not sure what “this stuff” is, but you feel a shiver run though Camryn\'s body as it is mentioned.</p>' +
				'<p>“Bah, bad enough he brought one girl to begin with. We agreed that he may have his comfort bitches in every town as long as he keeps them from the stash, and now he\'s jeopardizing the whole operation to get revenge on some biker chick for trying to cockblock him?”</p>' +
				'<p><i>“<b>Comfort Bitches?</b> That... that... Jerk!</i>"</p>' +
				'<p>“You know what he\'s like, he tried hitting on our contact, too. Never saw him back away that fast, though.”</p>' +
				'<p>“You likely never saw someone put a shotgun barrel to his crotch, ether. This “Anita” seems to be pretty violent.”</p>' +
				'<p>“Right.” The two laugh. “But he knows how to pick them, the girl in the storage likely still thinks her sis is just being taught a lesson and will get her bike back soon.”</p>' +
				'<p><i>“No...”</i></p>' +
				'<p>“After what she drank last night I doubt she is thinking anything right now. Good thing, too, we don\'t want her to start a ruckus before we decide what to do with her. Now stop chatting, we have a lot of work to do and I want to be ready to leave this town by tonight.”</p>' +
				'<p><i>“What have I done?!? Nono, please, no...”</i></p>' +
				'<p>You can faintly feel Camryn\'s thoughts now, her consciousness is still barely there, but hearing these two talk must have brought some of it to the forefront.</p>' +
				'<p><i>“I can\'t let them do this to Hannah, where is my phone... why am I not able to move...?”</i></p>' +
				'<p>You can feel her desperation and attempts to move her body, but after a few seconds, her consciousness fades into the background again, leaving you in full control once more.</p>'
			);
			startQuestions();
			if (!this.checkFlag(5)) {
				addQuestionRO(md, 'listen some more',
					'“Right, there\'s still a few things to catalog before we are able to start loading, I\'ll take care of it here, and you get the Van ready.”</p>' +
					'<p>“Fine with me, just don\'t touch my beer until I\'m back...”</p>' +
					'<p>You hear footsteps and a door open, it seems one of the men is alone now.',
					"",
					"setPersonFlag(\\'Camryn\\',5);CamrynDoAction()"
				);
			} else if (!this.checkFlag(18)) {
				addQuestionRO(md, 'start knocking on the door',
					'You heavily  knock on the door a few more times, asking if anyone is there for effect, and finally hear footsteps closing in and the door unlocking',
					"",
					"setPersonFlag(\\'Camryn\\',18)"
				);
			} else addLinkToPlace(md, 'wait for the door to open', 801, 'type=storeroomthug', '', '', 'CamrynDoAction()');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "storeroomthug") {
			md = WritePlaceHeader();
			AddImage("thug1.jpg");
			addPlaceTitle(md, "Storage Room");
			md.write(
				'<p>The door opens and a man eyes you suspiciously.</p>' +
				'<p>“Damn Girl, you have an elephant\'s constitution to be up already... Gabe\'s gone for a bit, he said you should stay here \'till he\'s back so none of the guys get any strange ideas.”</p>'
			);
			startQuestions();
			if (!this.checkFlag(7)) {
				if (perYou.checkFlag(25) && nMana > 0) {

					addPopupLinkToPlace(md, 'use hypnotic suggestion on him', 801, 'type=livingroom', "Hypnosis",
						"<img src='Images/thug1.jpg' class='imgpopup' alt='Thug'>" +
						"<img src='Images/hypnotize1.gif' style='position:absolute;margin:0 0 0 0;filter:alpha(opacity=30);-moz-opacity:0.3;-khtml-opacity:0.3;opacity:0.3;top:13%;right:13%;height:20vh;background-color:transparent' alt='Hypno'>" +
						'You reach out for his hand and quickly utter the phrase to hypnotize the man.</p>' +
						'<p>His eyes go blank, and knowing full well you only have seconds, you order him to go into the room as you quickly run outside and lock the door behind him.',
						"AddMana(-1)"
					);
				}
				addPopupLinkToPlace(md, 'attack him', 801, 'type=camrynbadend', "Bad Idea",
					'You try to ram your knee into his crotch, but quickly find out that Camryn, more so in her current state, does not really have the muscles or reflexes to be of any danger to him.</p>' +
					'<p>He effortlessly blocks all your attempts to hit him and doesn\'t even bother to strike you back.</p>' +
					'<p>“That\'s it...” He grunts and takes out a small vial. “Gabe should have done this yesterday!”</p>' +
					'<p>Before you are able to react, he forces you to drink the blue liquid inside, and your world begins to spin, you need to end the... you are not sure what, but you are feeling really hot... Your thoughts are fading fast as he closes the door again and leaves you in the room for his friends to pick you up later.'
				);
				addQuestionRO(md, 'seduce him',
					'“But I\'m bored and it\'s cold in here...” You say, trying your best doe eyes. “Do you think you could keep me warm for at least a bit?”</p>' +
					'<p>He seems taken aback as you approach him and place one hand on his crotch with a suggestive smile. “I have been so... aroused since last night... and I don\'t even know why...”</p>' +
					'<p>“Girl, he really did a number on you, but I... don\'t think we should...”</p>' +
					'<p>You silence him by moving your lips close to his and softly whisper “please...” to him, and he does not fight back as you slip on your knees, open his pants and let them drop to the ground.',
					"",
					"setPersonFlag(\\'Camryn\\',7);CamrynDoAction()"
				);
			} else {
				addLinkToPlace(md, 'use the opportunity to trip him and get out', 801, 'type=livingroom', 'This is a chance you won\'t get again and you are sure to use it. You pretend to move your lips close to his manhood, only to suddenly rush behind the man and give him a harsh shove.</p><p>Camryn probably wouldn\'t have the strength to push him over normally, but with his pants literally down, his legs are tangled up and he falls to the ground, giving you just enough time to close the door and lock him inside.');
				addLinkToPlace(md, 'Well, while you are down here...', 801, 'type=storeroomthugnaughty', '', '', 'CamrynDoAction()');
			}
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "storeroomthugnaughty") {
			md = WritePlaceHeader();
			this.showPersonRorX("camryn25.jpg");
			addPlaceTitle(md, "Naughtiness in the Storage Room");
			md.write(
				'<p>You feel resistance from Camryn\'s Mind as your lips move closer to the mans cock, but it\'s not enough to deter you.</p>' +
				'<p><i>“Why am I doing this...?”</i></p>' +
				'<p>You flick your tongue over his tip and he groans in approval as you carefully massage his manhood with your hands to get him hard.</p>' +
				'<p>You can\'t really claim that you have a lot of experience handling one of those, '
			);
			if (perYou.isBornMale()) md.write('aside from your own, of course, but you have seen, and felt, quite enough experienced woman by now to have a good grasp of what to do.');
			else md.write('but Catherine once gave you a pretty good demonstration and a few tips, and while it was mostly meant to embarrass you, it should help now.');
			md.write(
				'</p><p>His cock grows in your hands, and you can feel a shiver run through Camryn\'s body, her subdued mind racing when he finally reaches his full size.</p>' +
				'</p><i>He\'s... big... and the others might see me... why does this turn me on...?</i></p>' +
				'</p>You hesitate for a moment, but finally wrap your lips around him and begin to move your head back and forth.</p>' +
				'</p>It\'s... different. The taste, the sensation in your mouth the way he twitches... It takes you a bit to find a good rhythm and turn that theoretical knowledge into practical application, but if the noises from above are any indication, he quite enjoys your work, and for some reason this fills you with a certain amount of pride... or is it Camryn\'s feeling? You are really unsure.</p>' +
				'</p><i>This is so naughty...</i></p>' +
				'</p>He groans loudly and you can feel him twitch in your mouth as his climax approaches, but as you try to pull back a little, he suddenly takes a hold of your hair, forces the tip against your throat and unloads himself into your mouth.</p>' +
				'</p>You gag and cough, and some of it runs down your chin, but that doesn\'t really deter him, possibly even turn him on, and as he finally lets go, you need a moment to catch your breath</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'use the opportunity to trip him and get out', 801, 'type=livingroom', 'This has probably gone on long enough, and while a part of you enjoyed the experience, well, aside from the finale, you have also wasted precious time and need to make up for it.</p><p>The mans eyes are closed as he basks in the afterglow of his climax and it doesn\'t look like he is paying any attention to you, so you suddenly rush past him and give him a harsh shove from behind.</p><p>Camryn probably wouldn\'t have the strength to push him over normally, but with his pants literally down, his legs are tangled up and he falls to the ground, giving you just enough time to close the door and lock him inside.');

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "livingroom") {
			if (this.charmedTime == 100) {
				if (this.other >= 10) this.charmedTime = 2;
				else this.charmedTime = 10 - this.other;
			}
			md = WritePlaceHeader();
			AddImage("emptylivingroom.jpg");
			addPlaceTitle(md, "Living Room");
			md.write(
				'<p>You are in what may soon be the living room of a rather large house, though it does not seem like anyone has really moved in yet.</p>' +
				'<p>The walls are covered in simple, white wallpaper and there are barely any furniture or decorative elements to be found. Heavy curtains obscure the windows and the only source of light is a single bulb on a wire attached to the ceiling.</p>' +
				'<p>Crates are scattered all over the room and there is a single table surrounded by five folding chairs in the middle.</p>' +
				'<p>You hear noises from an open door possibly leading into the garage, the 2nd man must be there.</p>'
			);
			startQuestions();
			addQuestionR(md, 'check the front door',
				'It\'s locked, would have been too easy, you guess.',
				"",
				"CamrynDoAction()"
			);
			addQuestionR(md, 'check for other rooms',
				'You find most of the rooms locked and the few that are not, like the kitchen and bathroom, bare of any furniture except for some folding chairs, tables and rolled up sleeping bags.</p>' +
				'<p>One room stands out, though, the door looks sturdy, made to withstand even intense punishment, as do the walls. It\'s likely meant to become a safe-room, and you could easily lock it from the inside. ',
				"",
				"setPersonFlag(\\'Camryn\\',8);CamrynDoAction()"
			);
			addQuestionR(md, 'check the windows',
				'Apparently, whoever build this house has a strict focus on security. The window handles are lockable, which must be great for families with lively kids or fear of burglars, but is really annoying when you try to escape from this place.</p>' +
				'<p>At least you are able to get a look outside at what seems to be a street lined with expensive looking buildings in various states of completion on the outskirts of town.',
				"",
				"CamrynDoAction()"
			);
			addQuestionR(md, 'check the crates',
				'They are full of electronic devices, watches, jewelry and other goods.</p>' +
				'<p>You remember news about a string of successful burglaries in the last two weeks, and feel Camryn\'s heart beating faster.</p>' +
				'<p><i>“Gabriel... I can\'t believe this... what have I gotten into here...”</i>',
				"",
				"CamrynDoAction()"
			);
			if (this.checkFlag(8)) {
				if (this.checkFlag(20)) {
					addLinkToPlaceC(md, 'head for the Safe-room and lock yourself in', 801, 'type=saferoom');
				} else if (!this.checkFlag(10)) {
					addQuestionR(md, 'enter the safe room',
						'No use locking Camryn in here as long as you don\'t know where she is, and time is running out, so you better not idle.',
						"",
						"setPersonFlag(\\'Camryn\\',10);"
					);
				}
			}
			if (!this.checkFlag(9)) {
				addQuestionR(md, 'check the table',
					'There\'s a half empty bottle of beer, a Laptop, a vial of strange blue liquid and some papers and brochures.',
					"",
					"setPersonFlag(\\'Camryn\\',9);"
				);
			} else {
				if (!this.checkFlag(16)) {
					if (!this.checkFlag(11)) {
						addQuestionR(md, 'check the laptop',
							'The Laptop is a newer model, sleek in appearance and from the looks of it rarely used. It seems the burglars use a prepaid web and walk stick to access the internet, but you can\'t find it.</p>' +
							'<p>It\'s also password protected... damn.',
							"",
							"setPersonFlag(\\'Camryn\\',11);CamrynDoAction()"
						);
					} else {
						addQuestionR(md, 'check the laptop',
							'You check again and see if there is a password written down nearby, nothing',
							"",
							"CamrynDoAction()"
						);
					}
				}

				if (!this.checkFlag(12) && !this.checkFlag(11)) {
					addQuestionR(md, 'check the papers',
						'You find pointless notes, a few receipts and tourist brochures advertising Glenvale and listing the cities many achievements and rich history. One stands out, as it seems to promote a newly developed area on the city outskirts where Mayor Thomas builds expensive housing, hoping to attract wealthy citizens into the town.</p>' +
						'<p>You remember seeing in the local news that it\'s quite an important project for her, but not without controversy.</p>' +
						'<p>It might be where you are, right now.',
						"",
						"setPersonFlag(\\'Camryn\\',12);CamrynDoAction()"
					);
				} else {
					addQuestionR(md, 'check the papers',
						'You check the papers to see if anything looks like it is a password noted down, but you see nothing.',
						"",
						"CamrynDoAction()"
					);
				}

				if (!this.checkFlag(13)) {
					addQuestionR(md, 'check the vial',
						'It\'s a strange, blue liquid, you twist the bottle in your fingers in search of a label, but find nothing, however you feel a shiver building up in Camryn\'s body and, focusing on her thoughts, “remember” taking a small sip and ending up completely uninhibited. You remember “Gabe” enjoying it too and decide to not dig further into the memories.',
						"",
						"setPersonFlag(\\'Camryn\\',13);CamrynDoAction()"
					);
				} else if (!this.checkFlag(19)) {
					addPopupLinkToPlaceC(md, 'drink the liquid', 801, 'type=camrynbadend', "Drinking a Strange Vial?",
						this.addPersonString("camryn20.jpg", "height:max%", "right") +
						'Curious at what this stuff may do, you down the entire bottle in one gulp and realize too late that this might not have been one of your smartest moves.</p>' +
						'<p>The effects are instant, you feel your, well, Camryn\'s folds dampen and your heart beating faster while your entire body is slowly taken over by rather pleasant tingles, and as you squeeze Camryn\'s breasts, which suddenly seemed like the natural thing to do, you are amazed by how sensitive they have become.</p>' +
						'<p>“Hey, what are you doing here?” You attention is taken away from your gorgeous breasts by the man you heard earlier, and you smile as you answer his question.</p>' +
						'<p>“Drinking... stuff, and touching my boobs.”</p>' +
						'<p>“Please tell me you did not drink the entire vial...”</p>' +
						'<p>“Sure!” That\'s an easy order to follow. “I did not drink the entire vial.”</p>' +
						'<p>You are not sure why he slaps his hand on his forehead, but Come to think of it, your mind is strangely foggy in general, it\'s so hard to concentrate on... thoughts.</p>' +
						'<p>“Fuck, girl, you are one stupid Bimbo...”</p>' +
						'<p>“I am?” You ask, and it looks like the man just realized something... which is good, because you certainly didn\'t.</p>' +
						'<p>“Yes... a dumb Bimbo, who has just enough brains to know she likes to have sex and show her tits.”</p>' +
						'<p>You take these words in and ponder them. It certainly sounds compelling. You know you really like sex and right now you are horny as hell. And you do like your boobs, even if they are not technically yours because of... reasons.</p>' +
						'<p>“So, I like getting fucked a lot?” You ask, and he nods.</p>' +
						'<p>“Yes, and you really dislike thinking about anything more complicated than being fucked, like covering yourself.</p>' +
						'<p>His words again seep into your mind, and you giggle as you pull of your top and throw it away, it didn\'t feel right wearing it anyway.</p>' +
						'<p>“Great! So like, do we fuck now?” He shakes his head and you feel a crushing wave of disappointment.</p>' +
						'<p>“No, we have to wait for the others and explain what happened, then, you\'ll be fucked, in more than one way.”</p>' +
						'<p>You happily nod and giggle again, certain that you are about to have a lot of fun.'
					);
				}
				if (!this.checkFlag(14)) {
					addQuestionR(md, 'check the beer',
						'It\'s a local brand, the bottle is still half-full.',
						"",
						"setPersonFlag(\\'Camryn\\',14);CamrynDoAction()"
					);
				} else {
					if (this.checkFlag(13) && !this.checkFlag(19) && !this.checkFlag(15)) {
						addQuestionR(md, 'spike the beer with the contents of the vial',
							'You fill about half of the liquid into the beer-bottle, now you just need to find a way to make him drink it.',
							"",
							"setPersonFlag(\\'Camryn\\',19);CamrynDoAction()"
						);
					}
				}
			}
			// Is the second thug conscious?
			if (!this.checkFlag(15)) {
				addQuestionR(md, 'peek into the garage',
					'The front door is closed, you see the other man loading crates into a van, it\'s best to not disturb him.',
					"",
					"CamrynDoAction()"
				);
				if (this.checkFlag(17) && this.checkFlag(9)) {
					if (this.checkFlag(19)) {
						addPopupLink(md, 'Bring him the beer', "Beer",
							"<img src='Images/thug2.jpg' class='imgpopup' alt='Thug'>" +
							'You quickly get the bottle, place it on the floor and knock on the door to signal him.</p>' +
							'<p>You can\'t afford to be seen, but with some luck you don\'t have to be. You make sure to hide behind the Crates and hope he doesn\'t see you as he peaks through the door-frame.</p>' +
							'<p>“You suddenly shy or what?” You hear him call out and take a large gulp from the Bottle. “Jack?”</p>' +
							'<p>“Jack... where... uhhh... hell, that stuff is...” You hear a loud “thud” and as you peak over the crates, he has fallen onto his back like a wet sack.</p>',
							true, "setPersonFlag('Camryn',15);per.charmedTime=0;CamrynDoAction('type=livingroom')"
						);
					} else {
						addPopupLinkToPlace(md, 'Bring him the beer', 801, 'type=camrynbadend', "Beer",
							"<img src='Images/thug2.jpg' class='imgpopup' alt='Thug'>" +
							'You quickly get the bottle, place it on the floor and knock on the door to signal him.</p>' +
							'<p>You can\'t afford to be seen, but with some luck you don\'t have to be. You make sure to hide behind the Crates and hope he doesn\'t see you as he peaks through the door-frame.</p>' +
							'<p>“You suddenly shy or what?” You hear him call out and take a large gulp from the Bottle. “Jack?”</p>' +
							'<p>“Oh, please tell me you are not amusing yourself with Gabe\'s Girl, he\'s gonna kill ya, man...”</p>' +
							'<p>You realize in panic that he is heading straight to the room where you locked his friend in, and that there is nothing you can do to stop him now. Soon, he has freed the other man and the two don\'t take long to spot you.</p>' +
							'<p>There is a short scuffle as you try to get away, but weakened as you are, they overpower you and douse you in a strange blue liquid, your thoughts fade....</p>'
						);
					}
				}
			} else {
				// Out like a light
				addQuestionR(md, 'search the garage',
					'The Van is halfway loaded with crates and boxes, but it would take far more time than you have to search all of these.</p>' +
					'<p>The front door to the garage is once again locked, and the van itself has no keys.</p>' +
					'<p>This room is a dead end, too.',
					"",
					"CamrynDoAction()"
				);
				addQuestionR(md, 'examine the man',
					'That dose might have been too large, his eyes are still open but unfocused and every attempt to speak to him results in gibberish. At least he is breathing steadily and... sporting a gigantic bulge in his pants.</p>' +
					'<p>You check his pockets, hoping to find keys, but you only find some pocket change and a... note.</p>' +
					'<p>“Don\'t forget, the Password to the laptop is R0ughL4nd!ng”</p>' +
					'<p>Well, that\'s better than nothing. ',
					"",
					"setPersonFlag(\\'Camryn\\',16);CamrynDoAction()"
				);
				if (this.checkFlag(16) && !this.checkFlag(26)) {
					addPopupLinkC(md, 'ride him', 'Ride\'em Cowgirl',
						'<p>You free the mans massive erection from his pants and he groans lustfully as you draw your fingers along the entire length.</p>' +
						'<p>You are not sure what compels you to do this, maybe the drugs affecting Camryn\'s body are getting to you as well, or maybe her own subconscious desires are affecting you, but you have to ride that dick while you have the chance.</p>' +
						'<p>You try take of your shorts, but for the first time, Camryn\'s presence is actually strong enough to stop you.</p>' +
						'<p>“No!”</p>' +
						'<p>You can feel her reluctance, and while you know she is not strong enough to overpower you, she is wasting time, well, more time than you are wasting already.</p>' +
						addOptionLink("string", '...abort', "setPersonFlag('Camryn',26);dispPlace(801,'type=livingroom','In retrospect, this idea was stupid to begin with, and as you step away from the man, you feel Camryn&rsquo;s presence recede.</p><p>With the possession spell, you are able to experiment as much as you like without risking the life of someone else, and you really need to focus on getting out...')") +
						addOptionLink("string", '...subdue her', "dispPlace(801,'type=livingroom&act=ridehim')"),
						false, "setPersonFlag('Camryn',26);CamrynDoAction()", true
					);
				}
				if (this.checkFlag(16)) addLinkToPlaceC(md, "unlock the laptop", 801, 'type=livingroomlaptop');

			}
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "livingroomlaptop") {
			md = WritePlaceHeader();
			this.setFlag(21);
			addPlaceTitle(md, "Laptop", "laptop.jpg");
			md.write(
				'<p>The password has been accepted and the screen comes to life, maybe you can get a clue about your whereabouts from here.</p>'
			);
			startQuestions();
			addQuestionR(md, 'check browser history',
				'City maps and tourist information about Glenvale and a few YouTube links. Nothing really helpful.',
				"",
				"CamrynDoAction()"
			);
			if (getQueryParam("emails") === "") addLinkToPlaceC(md, 'check emails', 801, 'type=livingroomlaptop&emails=true', 'There aren\'t many emails, they either don\'t communicate that way often or clear it out regularly, a few stand out, though.');
			else {
				startAlternatives(md, 'Emails');
				addQuestionR(md, 'read: Re: Re: Housing',
					'<b>It\'s the Address! Now you just need to get Camryn to a safe place.</b></p><br/>' +
					'<p>From: Wilhelm<br/>' +
					'My pleasure. It\'s Petras Road 11, you\'ll find the keys under the doormat</p>' +
					'<p>From: Gabe<br/>' +
					'Do it. I\'ll transfer payment as usual.</p>' +
					'<p>From: Wilhelm<br/>' +
					'I\'ve scouted out Glenvale and found the perfect place.</p>' +
					'<p>Looks like the mayor is building homes for rich assholes in the outskirts of town. Some of them are mostly done, but work has to rest for at least a few weeks thanks to protesters and contract disputes, and they are all empty. ' +
					'You\'ll have water and electricity, lots of space and if you make sure your van looks somewhat like an outside contractor no one is going to be suspicious of your presence.</p>' +
					'<p>One word and I\'ll organize Keys.',
					"",
					"setPersonFlag(\\'Camryn\\',20);CamrynDoAction()"
				);
				addQuestionR(md, 'read: Re: Meeting',
					'From: BaldEagle7<br>' +
					'<p>Command confirms interest in merchandise.<br/>' +
					'<p>Scheduled meeting with operative code-named Anita at designated meeting spot.<br/>' +
					'<p>Time: fourteen double-O. Do not be late or deal is off.',
					"",
					"CamrynDoAction()"
				);
				addQuestionR(md, 'read: Meeting with contact',
					(isCharmedBy("Anita") ?
						'From: Angelo<br>This “Anita” failed to show up, no idea why, she\'s usually not that unreliable. We are on our way back now and will get in touch with the buyer, no need to panic just yet, but we should get ready to skip town soon if need be.' :
						'From: Angelo<br>The meeting with “Anita” was a success, they are interested in buying as long as we are able to get everything out of town.We are on our way back, bringing beer and pizza to celebrate.'
					),	"", "CamrynDoAction()"
				);
				endAlternatives(md);
			}
			addQuestionR(md, 'check private folders',
				'You find a simple list of houses where the group suspects to find wealthy people living alone or out of town. You don\'t recognize most of the names, but it looks like the residence of the local bank manager, Kristin Kincaid, is on that list, as well as one of her direct neighbors, Sally Barthel.</p>' +
				'<p>The Gates mansion has been marked with a question-mark.</p>' +
				'<p>There\'s another list of 50 reasons why beer is better than a girlfriend and a few similarly “funny” texts but nothing of use to you.',
				"",
				"CamrynDoAction()"
			);
			addLinkToPlace(md, 'close the laptop', 801, 'type=livingroom');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "livingroombeer") {
			md = WritePlaceHeader();
			AddImage("thug2.jpg");
			addPlaceTitle(md, "Living Room");
			md.write(
				'<p>The door opens and a man eyes you suspiciously.</p>' +
				'<p>“Damn Girl, you have an elephant\'s constitution to be up already... Gabe\'s gone for a bit, he said you should stay here \'till he\'s back so none of the guys get any strange ideas.”</p>'
			);
			startQuestions();
			addPopupLinkToPlace(md, 'try to fend off the attack', 801, 'type=camrynbadend', "Attacked",
				"<img src='Images/thug2.jpg' class='imgpopup' alt='Thug'>" +
				'You try to block him, but the man very easily overpowers you, you try to reach for the vial of the Drug, and in the scuffle, he spills the ingredients on you.</p>' +
				'<p>A wave of warmth rushes through your body and your thoughts begin to fade, it\'s suddenly getting so much harder to think... you need to end the possession, but you can\'t... remember... how...'
			);
			if (this.checkFlag(13)) {
				if (perYou.checkFlag(25) && nMana > 0) {
					addPopupLinkToPlace(md, 'use hypnotic suggestion to make him drink the drug', 801, 'type=livingroom', "Hypnosis",
						"<img src='Images/thug2.jpg' class='imgpopup' alt='Thug'>" +
						"<img src='Images/hypnotize1.gif' style='position:absolute;margin:0 0 0 0;filter:alpha(opacity=30);-moz-opacity:0.3;-khtml-opacity:0.3;opacity:0.3;top:13%;right:13%;height:20vh;background-color:transparent' alt='Hypno'>" +
						'You wait for the man to get closer, and the moment he touches you, you utter the activation phrase and use the Hypnotic Technique on him.</p>' +
						'<p>You don\'t rally have a lot of options here, the trance will wear off in seconds, so you tell him to take the vial and gulp it down.</p>' +
						'<p>He follows suit without hesitation, and his mind clears just in time to realize in horror what he has done. He turns and prepares to grab you but then simply falls down like a wet sack.',
						"AddMana(-1);setPersonFlag('Camryn',15);per.charmedTime=0"
					);
				}
			}
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "saferoom") {
			md = WritePlaceHeader();
			AddImage("saferoom.jpg");
			addPlaceTitle(md, "Safe Room");
			md.write(
				'<p>You can\'t get out without the keys and you don\'t know what they will do with Camryn after what you did to the guards. Not to mention she\'ll likely pass out again once you end the possession.</p>' +
				'<p>You, however, have an exact address now, so you\'ll be able to send help once you are back in your own body. You just need a way to keep her safe, and the Safe-room looks like the best bet for that.</p>' +
				'<p>You scribble a note telling her that help is on the way and to not open the door under any circumstances and hope she\'ll adhere to it. Now you just need to end the possession.</p>'
			);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "camrynbadend") {
			md = WritePlaceHeader();
			this.showPersonRorX("camryn3.jpg");
			addPlaceTitle(md, "3 Weeks Later");
			md.write(
				'<p>Your tongue eagerly trails along the cock before you, covering it fully in your spit before your lips close around the tip and the guy begins to push it into your mouth.</p>' +
				'<p>You are not quite sure how long you have been with the boys now, but you have started to enjoy your life with them.</p>' +
				'<p>Sure, you were confused at first. Gabe insisted on dyeing your hair blond and change your appearance, nothing seemed to make sense and there were a lot of confusing thoughts and memories, but every time you drank the blue liquid, they were nice enough to explain things to you, and slowly you began to realize your place as the groups personal bitch and how much you enjoy helping them unwind after a long day.</p>' +
				'<p>The man groans in pleasure as the tip of his cock presses against your throat, a sign that you are doing good work, and you are proud how well you managed to overcome your gag reflex in the past days and keep yourself focused.</p>' +
				'<p>Sometimes, your mind still drifts off. You somewhat remember being a ' + (perYou.isBornMale() ? 'guy' : 'lesbian') + ', and you remember an entire harem of girls at your disposal. Or did you recently move into your own apartment and got a job on your own? You had sister, you think. Was her name Hannah? No wait, Tracy? It\'s confusing.</p>' +
				'<p>You also remember hearing about a comatose ' + (perYou.isBornMale() ? 'guy' :  'girl') + ' found ' + (perYou.place == 141 ? 'in the sacred clearing' : '') + ' in Glenvale and felt like this was really important somehow...</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'snap out of your memories', 801, 'type=camrynbadend2');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "camrynbadend2") {
			md = WritePlaceHeader();
			this.showPersonRorX("camryn4.jpg");
			addPlaceTitle(md, "3 Weeks Later");
			md.write(
				'<p>Of course, this is nothing you should focus on, now. Maybe Gabe is able to explain these things to you, later.</p>' +
				'<p>The mans cock plops free from your lips with a loud noise and you take the moment to breath in and focus back on your task You are here to give him a good time, and it would be unfair to them to slack off after they are taking such good care off you.</p>' +
				'<p>You lie down on the bed and enticingly spread your legs for him. Your pussy' + (perYou.isBornMale() ? ', it still feels as if your are not supposed to have one,' : '') + ' has been wet for hours, and you feel your entire body shivering in anticipation at the thought of what is to come next.</p>' +
				'<p>For a second, there is this weird presence in your mind again, subdued and equally aroused, but clearly there, but the thought fades the moment he enters your waiting folds and begins to grind his hip against you.</p>' +
				'<p>You lean back and let him take you, moaning lustfully as all the strange thoughts and memories fade into obscurity again. What matters is what is here and now. And right now, you enjoy being fucked. Maybe you are able to convince the others to have a go later, as well.</p>'
			);
			addRestartLink(md);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 168) {
			if (wherePerson("OfficerBatton") == 168 && wherePerson("Hannah") == 168 && this.checkFlag(21) && !this.checkFlag(22)) {
				if (isCharmedBy("OfficerBatton")) {
					addQuestionR(md, 'tell ' + getPoliceChief() + ' Batton about Camryn\'s whereabouts',
						'"' + perYou.getPersonName() + '! Kerry looks excited to see you, quickly wetting her lips and unbuttoning her shirt. I knew Miss Gifford was one of yours as soon as I saw her eyes, she said that you have vital information about the burglaries of the last 2 weeks?</p>' +
						'<p>She takes out a pen and begins to seductively run it over her lips. “I will of course do anything I can to help you, just say the word and we move out!”</p>' +
						'<p>You give Kerry as much information about the group\'s hideout, size and Camryn\'s hiding place as you can, and she dutifully makes notes about everything, always looking at you in amazement.</p>' +
						'<p>“Your magic is so useful, It\'s no wonder that you are my ' + perYou.getMaster() + '.” She salutes you.” We will begin the operation immediately, just leave the rest to us.”',
						"",
						"setPersonFlag(\\'Camryn\\',22);movePerson(\\'OfficerBatton\\',801)"
					);
				} else {
					addQuestionR(md, 'tell ' + getPoliceChief() + ' Batton about Camryn\'s whereabouts',
						'“Miss Gifford already told us about her sister, and now she claims you have found evidence that her disappearance is connected to the latest string of burglaries and know where to find her and the perpetrators, yes?”</p>' +
						'<p>You make up a story about Camryn managing to contact you on the phone and how you guided her to find out the address, and also tell the ' + getOfficer(false) + ' about the size of the group and Camryn\'s hiding place. While the ' + getOfficer(false) + ' seems a little suspicious of your story how you acquired the information, she does take the case itself seriously.</p>' +
						'<p>“Thank you for this information, it seems like we have little time to waste, so I will get to it. If this checks out and we find the girl, we will contact the two of you immediately.”',
						"",
						"setPersonFlag(\\'Camryn\\',22);movePerson(\\'OfficerBatton\\',801)"
					);
				}
			}
			if (wherePerson("OfficerBatton") == 801 && wherePerson("Hannah") == 168 && this.checkFlag(22) && !this.checkFlag(23)) addLinkToPlace(md, 'wait for news with Hannah', 172, 'type=waithannah');
			else if (wherePerson("OfficerBatton") == 168 && wherePerson("Hannah") == 168 && this.checkFlag(22)) {
				addQuestionR(md, 'Camryn returns to the police station',
					'It doesn\'t take long until Camryn arrives at the station, and after a tearful hug between the sisters, she is taken away to be examined by a doctor and questioned for her testimony.</p>' +
					'<p>Right now, there is no easy way to meet with her, but you figured that she deserves a bit of rest after all she has been through.</p>' +
					(checkPersonFlag("Hannah",13) ?
						'<p>You tell Hannah that you intent to collect your price soon, and order her to inform you the moment Camryn is available at home, and she dutifully agrees to do so.</p>' +
						'<p>Hannah seems... annoyed by your earlier attitude as she leaves the station, as much as the spell allows her to be, at least. She is still obedient but certainly not as enthusiastic as before, though you are sure that, come time, the spell will make her forget your behavior and she\'ll be back to her old, happily charmed self.</p>' :
						'<p>You ask Hannah to inform you once she is back at her home, and knowing full well what you likely plan to do, she happily agrees, telling you that you\'ve earned it.</p>' +
						'<p>The two of you talk for a bit longer. Hannah seems very affectionate and jokingly suggests that you should use your powers to help people for a change more often, before giving you a kiss and returning to her workshop.</p>'),
					"",
					"setPersonFlag(\\'Camryn\\',23);movePerson(\\'Hannah\\',279)"
				);
			} else if (wherePerson("OfficerBatton") == 168 && wherePerson("Hannah") != 168 && this.checkFlag(23) && !this.checkFlag(24)) {
				var bShot = getPersonOther("Anita") >= 100 && perYou.isShot();		// Shot by Anita
				addQuestionR(md, 'ask ' + getPoliceChief() + ' Batton for details about the operation',
					(isCharmedBy("OfficerBatton") ?
						'“It is actually confidential information we are not supposed to share with citizens, but of course that does not include you.” Kerry smiles brightly, jumping at another chance to please you.</p>' +
						'<p>“We are still trying to find out more about the members of the group, but it seems they have been operating in other towns as well, and the fact that we caught them is probably going to get Glenvale a bit of media attention. We have secured large amounts of goods they had stolen in the past weeks before they were able to bring them out of town, as well as what appears to be a very small stash of a new Synthetic drug, most of which has been destroyed, though.”</p>' +
						'<p>“The raid went off without casualties, all thanks to your Intel, of course, but the followup investigation will keep us busy for a while and...Oh! This has got to interest you!”</p>' +
						(bShot ?
						'<p>They wanted to meet a woman by the name of Anita, and we think she\'s that vile harpy who shot you! We are of course investigating that lead with everyone available.</p>' :
						'<p>They were supposed to meet with a woman named Anita who is still on the run. She is supposedly armed and very dangerous, so you might want her on your side before someone else gets her!</p>') +
						'<p>You make mental notes of everything and ask if there is anything else of interest, and Kerry has to think for a moment.</p>' +
						'<p>"Well, Officer Ross distinguished herself when she chased and detained the leader of the group, ' +
						(!isCharmed("AdeleRoss") ? 'you were interested in her, right?” Kerry smiles knowingly. “She seems to be a little suspicious of me recently, and I\'m not sure she knows about us, so if you want to get her, be careful, yes?”' : '“I know she is one of us, and I am always trying to keep tabs on the other girls to make sure they are safe and able to serve you.”')
						: '“I\'m Sorry, but that information is confidential and we are not permitted to share it with citizens.”</p>' +
						'<p>“I\'m sure the newspapers will bring the whole story, soon, though.”'),
					"OfficerBatton",
					"setPersonFlag(\\'Camryn\\',24)"
				);
			}
		} else if (Place == 457 && this.isHere()) {
			// Camryn's Apartment
			if (!this.checkFlag(25) && !this.isCharmedBy()) {
				addQuestionR(md, 'ask if she is well',
					'“Yes, Thank you for asking, but I\'m still not entirely sure what happened.” Camryn scratches the back of her head.</p>' +
					'<p>“The police found me passed out in a safe-room and... congratulated me on my quick thinking.”</p>' +
					'<p>“Apparently, I have locked in one of the thugs, knocked out another, hid away and called them.” She shakes her head in disbelieve. I even remember bits of it, but it\'s more like I\'m watching someone else doing all these... things.” She breathes out.</p>' +
					'<p>“I told Hannah about it and she said you might be able to shed light on things, and that I really should meet you.”',
					"Camryn",
					"setPersonFlag(\\'Camryn\\',25)"
				);
			} else if (this.isCharmedBy() && sType === "") {
				addLinkToPlaceC(md, '"Good Girls do not show their bodies"', 457, 'type=ggshow');
				if (perYou.isMaleSex()) addLinkToPlaceC(md, '"Good girls do not swear"', 457, 'type=ggswear');
				else addLinkToPlaceC(md, '"Good girls are not sleeping with other girls"', 457, 'type=gggirls');
				if (isPersonHere("Hannah")) {
					addLinkToPlaceC(md, 'take the sisters into the bedroom', 457, 'type=sistersbedroom');
					addLinkToPlaceC(md, 'ask to take a shower', 457, 'type=sistersshower');
				}
				if (!this.checkFlag(27)) {
					addQuestionR(md, 'ask "How did she end up with these Guys anyway?"',
						'The topic seems to be a wholly uncomfortable one for Camryn, and she hesitates for a while before answering your questions.</p>' +
						'<p>“I\'ve met Gabe at the Gym. He was a bit of a Jerk, but in a charming way, at least I thought so back then, and I was kind of frustrated with... everything at the time.” She explains.</p>' +
						'<p>“So we went out, had a few drinks, ended up in my bed, and started dating. I finally had a “Bad-Boy” Boyfriend, and one my sister despised, no less, and relished it. So I\'ve overlooked a lot of warning signs, and we all know what it led to.” She smiles to you suggestively.</p>' +
						'<p>“At least it led to meeting you, I bet Hannah would have kept you for herself if not for the trouble I was in.”',
						"Camryn",
						"setPersonFlag(\\'Camryn\\',27)"
					);
				}
				if (!this.checkFlag(28)) {
					addQuestionR(md, 'ask about Hannah',
						'“We have a lot of catching up to do, but it\'s great to finally share a common interest with her!” Camryn answers, clearly exited. “I fear she\'s still so much more experienced than me with things like ' + (perYou.isMaleSex() ? 'deepthroating' : 'cunnilingus') + ', or rough sex in general... it makes me a little jealous, and I feel like I shouldn\'t be.”</p>' +
						'<p>You assure her that you intent to close the gap of experience between the two of them, and a wide smile forms on the spellbound girls lips.</p>' +
						'<p>“Thank you ' + (perYou.isBornMale() ? 'Sir' : 'Ma\'am') + ', I promise I\'m not going to lose to her!”',
						"Camryn",
						"setPersonFlag(\\'Camryn\\',28)"
					);
				}
				if (!isDay()) {
					this.addSleepLink(md, "spend the night with Camryn", "Going to Bed with Camryn",
						'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%;color:black"><b>Camryn is excited as you mention you want to spend the night with her and quickly slips into a set of lingerie just for you, to make your night even more pleasant.</b>',
						"camryn22.jpg", true
					);
					if (isPersonHere("Hannah")) {
						gameState.bSleepLink = false;
						findPerson("Hannah").addSleepLink(md, "spend the night with the sisters", "Going to Bed with Hannah and Camryn",
							'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%"><b>You crawl into bed with one sister in each arm, greatly enjoying their warm, naked bodies snuggled up against yours.</b>',
							"hannahcamryn6.jpg", true
						);
					}
				}
			}
		}
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 457 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) {
				if (isPersonHere("Hannah")) return findPerson("Hannah").showPerson("hannahcamryn5.jpg", '', '', '', '', false, "string");
				return this.showPersonDN("camryn9.jpg", '', '', '', '', false, "string");
			}
			if (isPersonHere("Hannah")) return this.showPerson("camryn19.jpg", '', '', '', '', false, "string");
			return this.showPerson("camryn10.jpg", '', '', '', '', false, "string");
		}
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 457 && this.isHere()) {
			if (this.isCharmedBy()) {
				if (!isPersonHere("Hannah")) md.write('<p>By the time you have reached the right floor, Camryn has already slipped out of most of her clothes, lasciviously offering her body to you with a wicked smile on her face.</p>');
			} else {
				if (isVisible()) md.write('<p>Camryn looks like she is doing well as she lets you in. the two of you sit down and she thanks you for checking up on her, asking if she may offer you a drink.</p>');
				else md.write('<p>Camryn looks like she is doing well, she is sitting down watching some TV.</p>');
			}
		}
	};

	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the possession spell
		if (no == 63 && cmd == 2 && this.place == 801) {
			if (isPossess("cast")) {
				if (this.checkFlag(21)) addComments("You have already resued Camryn so there seems little reason to re-possess her");
				else Possession("Camryn");
				return "handled";
			}
		}

		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// In her apartment
			if (Place == 457 && this.isHere()) {
				CastCharmSpell("Camryn", 457, 2, isPersonHere("Hannah") ? 'type=charmcamrynwithhannah1' : 'type=charmcamryn1');
				return "handled";
			}
		}

		// Casting the invisibility spell
		if (no == 17 && cmd == 2) {
			// In the hideout and 'listened more'
			if (Place == 801 && this.checkFlag(18) && sType.indexOf("livingroom") == -1) {
				CastInvisibility('type=room1invis','');
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
			gotoPlace(Place, 'type=camrynpool');
			receiveCall('', 'You call Camryn to invite her to join you at the pool for a swim, and she happily agrees.');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
}