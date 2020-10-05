/***********************************************************************
Catherine Ross
***********************************************************************/

function initialiseCatherineRoss()
{
	// Catherine Ross
	addPerson("Catherine", 0, "Catherine", '', false);
	
	per.getPersonName = function(full) { return full === true ? "Catherine Ross" : this.name; };
	per.getPersonAddress = function() { return "5 Cherise Rd, Glenvale"; };

	per.whereNow = function() {
		if (Place == 438 && this.place != 999) return Place;
		return this.place;
	};
	
	per.showEventPopup = function()
	{
		// First visit to Amy in her home
		if (Place == 436 && sType == "catherineleaves") {
			this.place = 999;
			showPopupWindow("Catherine is going out",
				this.addPersonString("goingout" + (this.isCharmedBy() ? "c" : "u") + ".jpg", "height:max%", "right") +
				"As you walk towards Amy's bedroom Catherine calls out to you. Her party dress is rather provocative, as always,</p>" +
				'<p>"' + perYou.getPersonName() + ' I was just going out for the evening' + (wherePerson("AdeleRoss") == 999 ? ' and I have arranged with Adele for her to work tonight' : '') + '. You have the house to yourself, you do not have to worry about disturbing us!"</p>' +
				'<p>You interpret this Catherine-speak as "Fuck Amy, make her scream. Fuck her anywhere you like!". As you ponder this she waves goodbye and promises to return in the early hours sometime.',
				'dispPlace(437)'
			);
			return true;
		}
		
		//  Meet Catherine
		if (Place == 70 && !this.checkFlag(2) && isShopOpen(2) && getPersonOther("MrBeasley") > 0) {
			this.setFlag(2);
			showPopupWindow("Catherine",
				this.addPersonString("catherine0.jpg", "height:max%", "right") +
				"You see Catherine walking down the hall, and she waves at you. She is the older sister of your friend Amy and she works at the school part-time in the administration offices. She also doubles as school-nurse when needed and she is available.<br><br>" +
				"You have gotten to know her quite well, she is a friendly and outgoing person, and you have become friends with her since you met her visiting Amy\'s home. Catherine is, well, sexually liberated, enjoying a <i>wide</i> range of lovers and experiences, and enjoys chatting about them with Amy or yourself. You do know she keeps this side of her life separate from work, she strictly takes no students or teachers as lovers. She has not approached you, not wanting to damage her relationship with her sister Amy, but has commented that you are cute!<br><br>" +
				"You say 'Hi' to her, but she only has a moment to chat. She mentions something about an appointment with 'that slime Beasley', and then going to have a coffee with her other sister Adele. You have only once met Adele in passing, she never seems to be home when you visit, you assume she lives somewhere else."
			);
			return true;
		}
		
		// First visit to Catherine's bedroom
		if (Place == 438 && !this.checkFlag(15) && sType === "") {
			this.setFlag(15);
			showPopupWindow("Catherine's Book",
				this.addPersonString("catherine-shoot1.jpg", "height:max%", "right") +
				"You follow Catherine into her bedroom and she goes and sits on her bed, but as she does she knocks a glossy book onto the floor with a rather theatrical \"Oops, silly me\" and she gestures for you to pick it up for her.</p>" +
				"<p>The book is an adult photoshoot, artistic and beautifully done, but full on lesbian erotica starring your friend Catherine here! You did not realise she had ever done this sort of thing, not that it surprises you in the least!</p>" +
				"<p>You compliment the shoot and of course Catherine and she explains that she did a few of these sort of shoots for the fun. She smiles and gestures to a shelf and some videos...",
				"dispPlace(Place,'type=catherineshoot2')"
			);
			return true;
		}
		if (Place == 438 && sType === "catherineshoot2") {
			showPopupWindow("Catherine's Videos",
				this.addPersonString("catherine-shoot2.jpg", "height:max%", "right") +
				'Catherine shows you a video, "I also did a few videos, some for money, others with some friends just for the fun"</p>' +
				"<p>Once again you are not surprised in the least, Catherine has always done whatever she wanted and can always look after herself. You are just surprised she had never bragged about it in the past!</p>" +
				"<p>She shows you a few of the titles and suggest that you could always watch one with her sometime."
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (Place == 269 && sType == "catherinepool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("catherine-pool.jpg");
			addPlaceTitle(md, "Swimming with Catherine");
			md.write(
				'<p>Catherine arrives and for a moment you are surprised at how conservative she is dressed, a red one piece. Then you see how it is almost transparent and you can only think "That\'s Catherine for you". Maybe swimming is a bad idea, then again it would be a lovely sight!</p>' +
				'<p>You also know she will not let you leave without something more physical than a swim...</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '...Catherine has no modesty...', Place, 'type=catherinepoolsex');
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "catherinepoolsex") {
			md = WritePlaceHeader(false, 'td-left-large');
			if (isExplicit() && perYou.isMaleSex()) this.showPersonX("catherine-pool-sex.gif");
			else this.showPerson("catherine-pool-sex.jpg");
			addPlaceTitle(md, "Openly Fucking Catherine");
			md.write(
				'<p>Discretion has never been Catherine\'s way, so there is little neef to find an out of the way place, aside from your own modesty that is. You do your best to not scandalise those few people around, but Catherine is vocal and obviously enjoying the attention and trying to attract attention!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Catherine', Place);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "catherinebusy" || (!this.checkFlag(9) && (Place == 10 || Place == 242) && nFromPlace != Place && nTime > 288 && Math.random() < 0.25)) {
			if (!checkPersonFlag("MrBeasley", 3)) {
				if ((Place == 10 && wherePerson("Monique") != 10) || (Place == 242 && wherePerson("MrsTanika") != 242)) {
					// Catherine's quickie
					setQueryParams("type=catherinebusy");
					this.setFlag(9);
					md = WritePlaceHeader();
					this.showPerson("catherine1.jpg");
					addPlaceTitle(md, "Catherine\'s Busy");
					md.write(
						'<p>You step into the ' + (Place == 10 ? 'classroom' : 'lounge') + ' and you see it is occupied. Catherine is here with a friend, well you assume a friend, you have never seen the man before. He does not work at the school and he is too old to be a student, then again you know Catherine has her rules about mixing work and play.</p>' +
						'<p>The man is enthusiastically fucking Catherine, so lost in his passion he does not notice you. Catherine does see you and smiles, then she gestures with one hand, a waggle to say "he is so-so".</p>' +
						'<p>She returns her attention to her lover, and you back away not wanting to interrupt them. You know based on previous experience with Catherine that you will likely never see the man again, a "so-so" means he is history!</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, "leave them alone", 70);
					WritePlaceFooter(md);
					return true;
				}
			}
		} else if (Place == 481) {
			if (sType === "catherinehere") {
				// Here she is!
				this.setFlag(5);		// Met her
				md = WritePlaceHeader(false, 'td-left-med');

				this.showPerson("catherine2a.jpg");
				addPlaceTitle(md, "Catherine's Here As Promised");
				md.write(
					'<p>You turn around and there is Catherine standing next to a bulldozer dressed in some alluring shorts and top. She poses for you for a moment, and then quickly gives you a kiss,</p>' +
					'<p>"Thank you ' + perYou.getPersonName() + ' for saving Amy and me from that slimy bastard Beasley! Adele has been telling me about Kurndorf, forbidden magics and a whole lot of things. ' +
					'She make you sound like a \'Kurndorf-in-training\', an aspiring ' + (perYou.isBornMale() ? 'warlock' : 'witch') + ' seeking everyone to be their sextoys and slaves", she laughs, but she has hit a bit close to the bone. While you would not ever think of the excesses or Kurndorf, a lot of that...</p>' +
					'<p>Unaware of your thoughts Catherine continues, "I don\'t care, I love being a sextoy or playing with them, both plastic or flesh and blood. If you want to rule this town then so what. I know you and trust you will not go too far."</p>' +
					'<p>She pauses, "If you want you can use your magic on me, but from what Adele says it is a sort of super-aphrodisiac that makes you really susceptible. Well, it won\'t change a thing in me, you know I am a nymphomaniac already, and I will do anything you want, you saved us!"</p>' +
					'<p>Again she pauses, "I have never approached you in respect for Amy, but she can share, and my rule of never fucking at school I can break for you...But I ask two things of you...", she hesitates, and you ask her what,</p>' +
					'<p>"I do not care how you do it, make Beasley pay, fuck him up! ' + (isMurderPath() ? 'I do not mean hurt him or kill him, punish him!' : '') + '", you had never seen this vengeful side of Catherine before! She continues,</p>' +
					'<p>"While I would prefer if you leave Amy alone, I doubt you will, so please just be nice to her!". Well, the protective big sister emerges from Catherine you see. You ask her about Adele,</p>' +
					'<p>"Oh Adele, that stuck-up, over-protective prude! Let\'s turn her into a ' + (perYou.isMaleSex() ? 'cock-sleeve, an orgasming cock-ornament' : 'pussy-slave, a cunt-licker') + '...", you interrupt her, you get the point. You are curious, she wants to protect Amy, but not Adele, and Catherine explains,</p>' +
					'<p>"She has always tried to interfere with my hobby", you know she means fucking, "and thinks that as she is the oldest she is in charge always. She needs to loosen up, get fucked a lot, become a nice little sex-addicted slave!", you stop her again, you get her point, and again see her vengeful side.</p>' +
					'<p>Catherine smiles, she was probably just got carried away a bit, but it seems you have a new and completely willing ally. She closes her eyes and says,</p>' +
					'<p>"Ok, so waste your magic on me if you want some sort of completeness, if not let me reward you in the way I do best" and she starts unbuttoning her shorts.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "accept her reward", 481, 'type=reward1');
				WritePlaceFooter(md);
				return true;
			}
			if (sType === "meeting" || (!this.checkFlag(5) && this.checkFlag(6) && getHour() == 12)) {
				// Where is she?
				setQueryParams('type=meeting');		// so you can save here
				md = WritePlaceHeader();

				addPlaceTitle(md, "Catherine is not here?", 'accessroad-site.jpg');
				md.write(
					'<p>You look around the site, it is the agreed time but Catherine is not here! You are surprised, Catherine is usually quite punctual, except where her libido gets in the way...Possibly she met someone cute, but it is unlike her to be late and not to call or SMS.</p>' +
					'<p>You suppose you could give her a phone call, you have her number in your phone\'s <b>address book</b>...or leave and return another day.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "leave disappointed", 481, '', 'You wait for a while, and then leave disappointed', 'WaitHereOnly(3)');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcatherine1") {
				// Charm 1
				md = WritePlaceHeader();
				this.setFlag(12);
				this.showPerson("catherine3c.jpg");
				addPlaceTitle(md, "Catherine Under A Charm Spell");
				md.write(
					'<p>You recite the spell and explain to Catherine that there is always an advantage to the spell, both in what you can learn from it, and that it protects her from others casting it on her themselves. She sighs,</p>' +
					'<p>"Wow ' + perYou.getPersonName() + ' that is one hell of a rush! Adele told me it was like a super aphrodisiac and she was not kidding!", as she talks she removes her shorts and unbuttons her top. You see her eyes start to change, taking on a greenish tint as she says, "So ' + perYou.getPersonName() + ' fuck me!"</p>' +
					'<p>Now it is how do you want to proceed, Catherine is a friend, she has always been a bit of a nymphomaniac, now a highly aroused nymphomaniac. It will be difficult to talk to her about much more than sex. You decide that just enslaving her just does not quite seem right, she is a friend, but she did show that image of her in bondage.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk about domination and submission', 481, 'type=charmcatherine2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcatherine2") {
				// Charm 2
				md = WritePlaceHeader();
				this.showPerson("catherine4c.jpg");
				addPlaceTitle(md, "Catherine Under A Charm Spell");
				md.write(
					'<p>You ask Catherine to talk about that bondage picture she sent and about embracing that sort of relationship with you,</p>' +
					'<p>"If that is the sort of games you want to play ' + perYou.getPersonName() + ' that is great with me, but variety is the spice of life. Fuck me in as many ways as you can, in as many places as you can!"</p>' +
					'<p>Well that sounds like the Catherine you have always known. As you consider, she strips the rest of her clothing and poses in front of the bulldozer and continues,</p>' +
					'<p>"I told you, fuck up Beasley and be nice to Amy and I will do anything, absolutely anything for you. I\'ll be your devoted slave girl, your fucktoy, anything you want!"</p>' +
					'<p>It seems the spell is only affecting her a little, aside from her talk about it\'s aphrodisiac properties, but your words are not shaping her thoughts and mind very much. Then again you are not really trying, she will give you anything you want!</p>' +
					'<p>She urgently asks, "Come on fuck me already!!"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "take her", 481, 'type=charmcatherine3');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmcatherine3") {
				// Charm 3 (Sex)
				md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-large' : '');
				if (perYou.isMaleSex()) this.showPersonRorX("catherine5b.jpg");
				else this.showPerson(perYou.isMaleSex() ? "catherine5b.jpg" : "catherine5gc.jpg");
				addPlaceTitle(md, "Catherine Under A Charm Spell");
				md.write(
					'<p>You have often fantasised about a sexual encounter with Catherine, but you have always considered it impossible. Now now!</p>' +
					'<p>You start to remove your clothes, and Catherine almost jumps on you in her eagerness to help. Quickly she strips you naked'
				);
				if (perYou.isMaleSex()) {
					md.write(
						'and takes your manhood in hand and expertly licks and sucks you to a full erection, not that you needed much after so many daydreams.</p>' +
						'<p>She tells you that she is more than ready, pushes you down and mounts herself on your cock. She gasps as she does, her hips jerking and she groans "cumming so quickly...". After a brief pause she starts to move, commenting "...but the more the merrier..."</p>' +
						'<p>She fucks herself on you, and you fuck her, changing her mounted to you on top as she has several orgasms. She is an amazing lover, skilled and passionate and you reach your peak and cum into her as she has yet another orgasm.</p>' +
						'<p>After she comments, "Wow that is one amazing aphrodisiac, if it lasts then I am not sure I will be able to concentrate on anything besides sex!", than again you are not sure if she ever did before</p>'
					);
				} else {
					md.write(
						'she kneels to start licking and playing with your pussy, to arouse you, not that you needed much after so many daydreams.</p>' +
						'<p>She tells you that she is more than ready, and eagerly licks your pussy and clit while furiously masturbating herself. She rapidly has an orgasm, gasping into your pussy as she does, "cumming so quickly...". After a brief pause she continues licking, commenting "...but the more the merrier..."</p>' +
						'<p>She licks you to an incredible orgasm, she is an amazing lover, skilled and passionate, and you are sure she orgasms as well, again.</p>' +
						'<p>After she comments, "Wow that is one amazing aphrodisiac, if it lasts then I am not sure I will be able to concentrate on anything besides sex!", than again you are not sure if she ever did before</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, '"Let\'s discuss Adele"', 481, 'type=planadele');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "reward1") {
				// Reward 1
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPerson("catherine3r.jpg");
				addPlaceTitle(md, "Catherine's Reward");
				md.write(
					'<p>You agree, there is no need to waste mana, Catherine is true to her word and you want to deal with Mr. Beasley. There is no problem being careful around Amy, she is your friend as well. You tell Catherine that you agree to her conditions and that there is no need to use the spell, you trust her.</p>' +
					'<p>Catherine looks at you with her best seductive expression, "Well then, this is something we have both thought about so let\'s do it!"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"yes please"', 481, 'type=reward2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "reward2") {
				// Reward 1
				md = WritePlaceHeader();

				this.showPerson("catherine4r.jpg");
				addPlaceTitle(md, "Catherine's Reward");
				md.write(
					'<p>Catherine starts to strip the rest of her clothing, doing so in a exaggerated stripperish way, ending with one leg resting on the blade of the bulldizer. She looks at you and asks,</p>' +
					'<p>"Am I the only one going to be naked here?", you realise you had been so fascinated with her strip that you are still clothed. You quickly remove your clothing as well, more a quick rush than a performance like she did. As you do Catherine comments,</p>' +
					'<p>"It has been so difficult to stop myself from seducing you. It is what I do, but I have my code and there is Amy. You do know she likes you? I mean more than friends but not quite love but it was a possibility.". Your clothes are now removed and Catherine beckons to you,</p>' +
					'<p>"I had thought you were so obsessed with magic and that girl Kate, the idea of you becoming some sort of ' + perYou.getMaster() + ' of a harem...Well call me a harem-girl!"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "take your harem girl", 481, 'type=reward3');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "reward3") {
				// Reward 1
				md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-large' : '');

				if (perYou.isMaleSex()) this.showPersonRorX("catherine5b.jpg");
				else this.showPerson(perYou.isMaleSex() ? "catherine5b.jpg" : "catherine5gc.jpg");

				addPlaceTitle(md, "Catherine's Reward");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>Catherine takes your manhood in hand and expertly licks and sucks you to a full erection, not that you needed much after so many daydreams.</p>' +
						'<p>She tells you that she is more than ready, pushes you down and mounts herself on your cock. She gasps as she does, and then she starts to move, commenting "...fells like you are ready..."</p>' +
						'<p>She fucks herself on you, and you fuck her, changing her mounted to you on top as she has several orgasms. She is an amazing lover, skilled and passionate and you reach your peak and cum into her as she has yet another orgasm.</p>' +
						'<p>After she comments, "Wow, I guess magic is not the only thing you are good at!"</p>'
					);
				} else {
					md.write(
						'<p>Catherine kneels to start licking and playing with your pussy, to arouse you, not that you needed much after so many daydreams.</p>' +
						'<p>She tells you that she is more than ready, and eagerly licks your pussy and clit while furiously masturbating herself. She rapidly has an orgasm, gasping into your pussy as she does, "cumming so quickly...". After a brief pause she continues licking, commenting "...but the more the merrier..."</p>' +
						'<p>She licks you to an incredible orgasm, she is an amazing lover, skilled and passionate, and you are sure she orgasms as well, again.</p>' +
						'<p>After she comments, "Wow, I guess magic is not the only thing you are good at!"</p>'
					);
				}

				startQuestions();
				addLinkToPlaceC(md, '"Let\'s discuss Adele"', 481, 'type=planadele');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "planadele") {
				// After, discuss Adele
				md = WritePlaceHeader();

				this.showPerson(this.isCharmedBy() ? "catherine6c.jpg" : "catherine6r.jpg");
				addPlaceTitle(md, "Now For Adele!");
				md.write(
					'<p>You start to redress, but Catherine makes no such move, just holding her breasts, clearly for your pleasure.</p>'
				);
				if (this.isCharmedBy()) {
					md.write(
						'<p>Catherine\'s eyes are closed, she seems to be concentrating on the feelings of the spell as it saturates her body, "Wow ' + perYou.getPersonName() + ' this magic is such a rush. Adele is going to love and hate this, she is a bit of the control freak, and she will hate becoming just a sextoy. She will love this feeling, she once told me she loved sex! It was nice to hear we had something in common!"</p>'
					);
				} else {
					md.write(
						'<p>Catherine is smiling at you, "' + perYou.getPersonName() + ', Adele is going to love and hate being your little harem-girl, you will have to use your magic on her. She is a bit of the control freak, and she will hate becoming just a sextoy. She will love the extreme aphrodisiac feeling, she one told me she loved sex! It was nice to hear we had something in common!"</p>'
					);
				}
				md.write(
					'<p>You explain that Adele had mentioned that she is protected from magic, probably some item descended from their ancestor Lady Elizabeth Ross. You think it is probably the earrings she was wearing but you cannot be sure. Catherine thinks for a moment,</p>' +
					'<p>"Probably, those earrings are very old, handed down the female line of our family. I think I can do something, there are some very similar ones we also have, I can swap them around and it should make her available to become your ' + (this.isCharmedBy() ? 'slave' : 'harem-slave') + '. It will take a while, at the very earliest tonight or tomorrow morning. I will give you a call when it is setup"</p>' +
					'<p>You ask Catherine about Amy, explaining it is more you are concerned if she is alright, and you immediately realise you should not of. It will just sound like you want to charm Amy as well...maybe you do but that is not what you meant. Catherine cautiously answers,</p>' +
					'<p>"She is tougher than you think. She is handling it well, but she did not return home. She is staying with a friend for now...friend, well sort of a friend...I would probably use a different word...Look once Adele is out of the way as such, I\'ll tell you more."</p>' +
					'<p>What was that? You thought you knew all of Amy\'s friends but it sounds complicated. You agree to leave the question of Amy alone for now, and ask Catherine to call you when things are ready for Adele.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "say goodbye for now", 481);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place != 438) return false;
		
		if (sType == "charmcatherinelater1") {
			// Charm 1
			md = WritePlaceHeader();
			this.showPerson("catherine-charmlater1.jpg");
			addPlaceTitle(md, "Catherine Under A Charm Spell");
			md.write(
				'<p>You recite the spell and explain to Catherine that there is always an advantage to the spell, both in what you can learn from it, and that it protects her from others casting it on her themselves. She sighs,</p>' +
				'<p>"Wow ' + perYou.getPersonName() + ' that is one hell of a rush! Adele told me it was like a super aphrodisiac and she was not kidding!", as she talks she removes most of her underwear. You see her eyes start to change, taking on a greenish tint as she says, "So ' + perYou.getPersonName() + ' fuck me!"</p>' +
				'<p>Now it is how do you want to proceed, Catherine is a friend, she has always been a bit of a nymphomaniac, now a highly aroused nymphomaniac. It will be difficult to talk to her about much more than sex. You decide that just enslaving her just does not quite seem right, she is a friend, but she did show that image of her in bondage.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk about domination and submission', Place, 'type=charmcatherinelater2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmcatherinelater2") {
			// Charm 2
			md = WritePlaceHeader();
			this.showPerson("catherine-charmlater2.jpg");
			addPlaceTitle(md, "Catherine Under A Charm Spell");
			md.write(
				'<p>You ask Catherine to talk about that bondage picture she sent and about embracing that sort of relationship with you,</p>' +
				'<p>"If that is the sort of games you want to play ' + perYou.getPersonName() + ' that is great with me, but variety is the spice of life. Fuck me in as many ways as you can, in as many places as you can!"</p>' +
				'<p>Well that sounds like the Catherine you have always known. As you consider, she takes out a few things from the table besides her bed, a ball-gag and a collar. She puts the collar on, and tells you,</p>' +
				'<p>"' + perYou.getMaster() + ', I am your slave to fuck whenever you want!", and with that she puts on the ball-gag and poses sexily for you!</p>' +
				'<p>Well, with that Catherine is your charmed slave, a perfectly willing slave and friend!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk to \'Charmed\' Catherine', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "catherinebj") {
			// Blowjob/lick
			if (perYou.isMaleSex()) {
				if (isExplicit()) {
					md = WritePlaceHeader(false, 'td-left-med');
					this.showPersonRandomX("catherine-bedroom-sex-bjb", this.isCharmedBy() ? 5 : 4, '', '', '', '', this.isCharmedBy() ? 0 : 3);
				} else {
					md = WritePlaceHeader();
					this.showPerson((this.isCharmedBy() ? "catherine-bedroomc" : "catherine-bedroomu") + "-sex-bjb.jpg");
				}
				addPlaceTitle(md, "Catherine");
				md.write(
					'<p>Catherine gives you a blowjob.</p>'
				);

			} else {
				md = WritePlaceHeader(false, 'td-left-med');
				if (isExplicit()) this.showPersonRandomX("catherine-bedroom-sex-bjg", 2);
				else this.showPerson("catherine-bedroom-sex-bjg.jpg");
				addPlaceTitle(md, "Catherine");
				md.write(
					'<p>Catherine licks you.</p>'
				);
			}
			startQuestionsOnly();
			addLinkToPlace(md, 'leave the bedroom', 436);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "catherinefuck") {
			// fuck her
			if (perYou.isMaleSex()) {
				md = WritePlaceHeader();
				if (isExplicit()) this.showPersonRandomX("catherine-bedroom-sex-fuckb", this.isCharmedBy() ? 5 : 4);
				else this.showPerson("catherine-bedroom-sex-fuckb.jpg");
				addPlaceTitle(md, "Catherine");
				md.write(
					'<p>You fuck Catherine.</p>'
				);

			} else {
				md = WritePlaceHeader(false, 'td-left-med');
				if (isExplicit()) this.showPersonRandomX("catherine-bedroom-sex-fuckg", this.isCharmedBy() ? 2 : 1);
				else this.showPerson("catherine-bedroom-sex-fuckg.jpg");
				addPlaceTitle(md, "Catherine");
				md.write(
					'<p>Catherine and you have a 69</p>'
				);
			}
			startQuestionsOnly();
			addLinkToPlace(md, 'leave the bedroom', 436);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "catherinestraponfuck") {
			// strap-on fuck her
			md = WritePlaceHeader(false, 'td-left-large');
			if (isExplicit()) this.showPersonRandomX("catherine-bedroom-sex-straponfuckg", this.isCharmedBy() ? 3 : 2);
			else this.showPerson("catherine-bedroom-sex-straponfuckg.jpg");
			addPlaceTitle(md, "Catherine");
			md.write(
				'<p>You fuck Catherine with your strap-on.</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'leave the bedroom', 436);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "catherinetitfuck") {
			// tit-fuck her
			md = WritePlaceHeader();
			if (isExplicit()) this.showPersonRandomX("catherine-bedroom-sex-tf", this.isCharmedBy() ? 2 : 1);
			else this.showPerson((this.isCharmedBy() ? "catherine-bedroomc" : "catherine-bedroomu") + "-sex-tf.jpg");
			addPlaceTitle(md, "Catherine");
			md.write(
				'<p>You fuck Catherine\'s tits.</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'leave the bedroom', 436);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		}
	
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		if (this.isCharmedBy()) this.showPersonRandom("poledance", 2);
		else this.showPerson("poledancec.gif");
		addPlaceTitle(md, "Catherine's Dance");
		if (this.isCharmedBy()) md.write('<p>Catherine is wearing some exotic lingerie as she steps up onto the stage. She is looking happy and confident as she dances for you and everyone else. She is talented and really pleased to be performing!</p>');
		else md.write('<p>Catherine is wearing a stylised construction gear with a tight top as she steps up onto the stage. She is looking happy and confident as she dances and strips for you and everyone else. She is talented and really pleased to be performing!</p>');
	
		md.write('<p>After she sits with you for a while, chatting with other people here and there, she is clearly a regular here!</p>');
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};

	per.passTimeDay = function() {
		if (this.checkFlag(4) && !this.checkFlag(5)) this.setFlag(6);
		if (this.place == 999) this.place = 436;
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 436 && this.isHere() && checkPersonFlag("AdeleRoss", 6) && sType === "") {
			if (wherePerson("AdeleRoss") == 436) md.write('<p>Catherine has joined Adele in the living room' + addVisible(' to greet you') + '.</p>');
			else md.write('<p>Catherine is in the living room' + addVisible(' to greet you') + '.</p>');
		}
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if ((Place != 436 && Place != 438) || sType !== "") return;

		if (!checkPersonFlag("AdeleRoss", 6)) return;
		
		if (this.place == 999) return;
		
		if (!isPlaceKnown("NursesOffice") && checkPersonFlag("DoctorKay", 1)) {
			addQuestionR(md, 'ask Catherine about the Nurse you saw at school',
				'You ask Catherine about the nurse you saw at school,</p>' +
				'<p>&quot;Yes, Tina is a friend of mine from a club we both hang-out at, she is a doctor at the hospital but she works limited hours there. As a favour I asked if she could handle my shifts as the school nurse until that slime is dealt with&quot;</p>' +
				'<p>You have almost never been to the Nurses Office at school and ask Catherine where it is again, and she shakes her head in frustration at your idiocy and gives you directions.',
				"Catherine",
				"bChatLeft=false;setPlaceKnown(\\'NursesOffice\\');setPersonFlag(\\'DoctorKay\\',2)"
			);
		}			

		if (!this.checkFlag(11)) {
			addQuestionR(md, 'ask Catherine about Amy',
				'You ask Catherine about where is Amy? Catherine answers,</p>' +
				'<p>&quot;When we came home after..that slime Beasley..she grabbed a bag and immediately left. She refused to talk about what happened. I am fairly sure she went to stay with someone but I do not know who. She is refusing to take my phone calls. I think she blames me, thinking I was angling for a threesome or something, never with <i>him</i>, she should have known that!&quot;</p>' +
				'<p>She is clearly hurt and worried about Amy but there is nothing more you can ask really.</p>',
				"Catherine",
				(Place == 436 ? "bChatLeft=false;" : "") + "setPersonFlag(\\'Catherine\\',11)"
			);
		}
		if (perGates.checkFlag(6) && !isPlaceKnown("AvernusClub")) {
			addQuestionR(md, '"Catherine, is there a gentleman\'s club in Glenvale?"',
				'You ask Catherine about the gentleman\'s club you were told about, if anyone knows Catherine has to. Catherine answers,</p>' +
				'<p>"Of course, I have attended a number of BDSM parties there. That image I accidentally sent you was sort of related. Take care, some of the Mistresses play rough!"</p>' +
				'<p>She gives you directions to the club, it is located in a side street off the shopping center. The club is open late at night until the early hours and is by invitation only. She quickly makes a phone call, and tells you,</p>' +
				'<p>"All set, you are now my personal guest for the club, you can visit any time you want"',
				"Catherine",
				"bChatLeft=false;setPlaceKnown(\\'AvernusClub\\')"
			);
		}
		
		if (Place != 438) return;
		
		if (this.checkFlag(15)) {
			var ex = isExplicit() && Math.random() < 0.6;
			var img = (ex ? "Explicit/" : "") + "catherine-video" + Math.ceil(Math.random() * (ex ? 15 : 3)) + ".gif";
			addWatchTVLink(md, "watch one of Catherine\'s videos", "Catherine\'s Video",
				(img.indexOf("video4") != -1 || img.indexOf("video5") != -1 || img.indexOf("video6") != -1 ? 'You watch a scene of one of Catherine\'s videos, a threesome scene, but the other woman is very familiar, you could swear she is Mrs. Granger? You ask Catherine and she says</p>' +
														 '<p>"You mean Kate Granger\'s mother? Well she did not use that name when we shot this video, but then again I used a different name too!"'
									  : 'You watch one of Catherine\'s videos, she certainly did a wide range of different scenes, but we are talking here about Catherine!'),
				this.getImg(img)
			);
		}
		
		if (perYou.isMaleSex()) {
			addLinkToPlace(md, 'have sex with her', 438, 'type=catherinefuck');
			addLinkToPlace(md, 'have her give you a blowjob', 438, 'type=catherinebj');
			addLinkToPlace(md, 'get a tit-fuck', 438, 'type=catherinetitfuck');
		} else {
			addLinkToPlaceO(md, 'ask her to lick you', 438, 'type=catherinebj');
			addLinkToPlace(md, 'lick each other', 438, 'type=catherinefuck');
			if (perYou.FindItem(45) > 0) addLinkToPlace(md, 'fuck her with your strap-on', 438, 'type=catherinestraponfuck');
		}
		
		if (getCharmedLevel("AdeleRoss") == 4 && wherePerson("AdeleRoss") == 436) addLinkToPlace(md, 'call for Adele to join you', 438, 'type=catherineadelethreesome1');
		
		this.addDancingLink(md, 'talk to Catherine about dancing in the club',
			'You ask Catherine about dancing at the Avernus club and she quickly answers,</p>' +
			'<p>&quot;I have before and I will again, so definitely ' + this.getYourNameFor() + '!&quot; and with that you call Jade to arrange a dance for Catherine. Jade welcomes Catherine to dance anytime.',
			false
		);	
		this.addSleepLink(md, "sleep with Catherine", "Sleeping with Catherine",
			'<p style="position:absolute;left:25%;top:5%;cursor:pointer;font-size:1.1em;width:40%"><b>You talk to Catherine about sleeping with her, and you mean sleeping, not having sex, well not <i>only</i> having sex.</b>',
			(this.isCharmedBy() ? "catherine-bedroomc" : "catherine-bedroomu") + '-sleep.jpg', true
		);

	};

	// Cast a spell/use an item
	per.handleItem = function(no, cmd)
	{
		if (cmd != 2) return "";

		if (no == 14) {
			// Casting the charm spell
			// During her quickie event
			if (sType == 'catherinebusy') {
				addComments("There are too many people here and the spell will not work on any one person here.");
				return "handled";
			}
			if (Place == 481) {
				if (sType == "catherinehere") {
					CastCharmSpell("Catherine", 481, 1, 'type=charmcatherine1');
					return "handled";
				}
				if (sType == 'reward1' || sType == 'reward2' || sType == 'reward3' || sType == 'planadele') {
					if (!this.isCharmedBy()) addComments("Change your mind? Well, maybe, but how about another time?");
					else addComments("Catherine is already charmed!");
					return "handled";
				}
			} else if (Place == 438) {
				CastCharmSpell("Catherine", Place, 1, 'type=charmcatherinelater1', '', '', this.checkFlag(13));
				return "handled";
			} else if (Place == 436 && !this.isCharmedBy()) {
				addComments("It would be better to do this in the privacy of her bedroom");
				return "handled";
			}
		}
		return "";		// do nothing
	};

	per.isPhoneable = function() {
		// Can you call them?
		return (sType == "meeting" && Place == 481) || (checkPlaceFlag("Hotel", 11) && Place == 269 && this.checkFlag(10));
	};

	per.callThem = function() {
		if (sType == "meeting" && Place == 481) {
			gotoPlace(481, 'type=catherinehere');
			receiveCall('',
				'You call Catherine, and she immediately picks up,<br><br>' +
				'"Hi ' + perYou.getPersonName() + ', count to three and turn around!" and she hangs up.'
			);
			WriteCommentsFooter(bChat, bChatLeft);
		} else {
			if (!isDay()) WriteComments('You call Catherine to invite her to join you at the pool for a swim, and she answers enthusiasticaly, "I\'d love to, but how about in the daytime so I get get some sun as well?" You have no problems and agree to do this another time.');
			else {
				gotoPlace(Place, 'type=catherinepool');
				receiveCall('', 'You call Catherine to invite her to join you at the pool for a swim, and she answers enthusiasticaly, "I thought you\'d never ask!" and she says she will be there soon.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};

	per.addPersonPhoneCall = function() {
		if (this.checkFlag(2) && getHour() > 19 && !this.checkFlag(14)) {
			// SMS 1, after 10pm the night after meeting her
			if (makeCall(true, 160)) this.setFlag(14);
		}
		if (Place != 436 && checkPersonFlag("AdeleRoss", 5) && !this.checkFlag(4)) {
			// Phone call after meeting Adele and her rescue
			if (makeCall(false, "",
					'The call is from Catherine\'s number! You answer the call and yes, it is her,<br><br>' +
					'<b>Catherine</b><br>' +
					'"Hey there ' + perYou.getPersonName() + ' I heard you talking to Adele, she wouldn\'t let me see you. She is being an overprotective older sister, except I am the oldest. She thinks I am some sort of irresponsible slut...and I can be.<br><br>' +
					'And if you listen to her, you are some sort of figure from the old days of Kurndorf\'s coven, an evil sorcerer bent on sex and domination! ' +
					'Well so am I, well not the sorcerer part, but I do like either submission or domination, the whole range of the B and D and S and M. I just sent you an image to demonstrate and you got that one before!<br><br>' +
					'Look, I don\'t care, you are a friend and I have to properly thank you. Meet me tomorrow midday, I should be able to get away from Adele then. You know that road-works that leads off Yoolaroo Dr and runs along side the park? Take the access road for trucks off Yoolaroo, you might have to climb a fence or something.<br><br>' +
					'Take care and look forward to me"<br><br>' +
					'With that she hangs up.'))
			{
				this.setFlag(4);
				addSMS(161);
				setPlaceFlag("Park", 4);
				setTimeout("usePhone('sms')",10);
				return true;
			}
		}
		if (this.checkFlag(6) && getHour() > 12 && !this.checkFlag(5)) {
			// Missed her
			if (makeCall(true, this.checkFlag(7) ? 163 : 162))	 {
				this.setFlag(6, false);
				if (this.checkFlag(7)) this.setFlag(8);
				else this.setFlag(7);
			}
		}
		if (this.checkFlag(5) && !this.checkFlag(10) && getHour() < 10) {
			// Phone call after plotting to get Adele
			if (makeCall(true, this.isCharmedBy() ? 164 : 165)) this.setFlag(10);
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 160) {
			// SMS 1
			return receiveSMS('Catherine', 'I gasp as you grab my hair and force your cock into my slutty mouth, lewdly smacking my lips and  sucking you off.<br><br>' +
													 '“Fuck me, sir!” I beg. “Fuck my throat and slap me like the slut I am!”', 'catherinesms1.jpg') +
				replyToSMS('WTF? O_O') +
				receiveSMS('Catherine', 'Shit! That wasn\'t meant for you!') +
				replyToSMS('You don\'t say') +
				receiveSMS('Catherine', 'You can keep the pic. And if you don\'t show it around I might have another later. ;)');
		}
		if (id == 161) return receiveSMS('Catherine', 'A bit of fun', 'catherinesms2.jpg');
		if (id == 162) return receiveSMS('Catherine', 'I missed you, I gotta leave or Adele will get suspicious. See what you missed!', 'catherinesms3.jpg');
		if (id == 163) return receiveSMS('Catherine', 'I missed you again, Not sure how many more times we can do this before she stops me. You are really missing out!!', 'catherinesms4.jpg');
		if (id == 164) return receiveSMS('Catherine', 'It is done', 'catherinesms4c.jpg');
		if (id == 165) return receiveSMS('Catherine', 'It is done', 'catherinesms4r.jpg');
		if (id == 167) return receiveSMS('Catherine', perYou.getPersonName() + ' found something, not an item but Adele talked about self-hypnosis. Could you turn that against her?', 'catherinesms5.jpg');
		return '';
	};

}
