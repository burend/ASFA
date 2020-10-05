/**********************************************
Donna
***********************************************/

function initialiseDonna()
{
	// Donna
	addPerson("Donna",0, "Donna");
	per.whereNow = function() { return !isDay() && this.isCharmedBy() ? 185 : this.place; };
	per.hoursSinceEvent = function() {
		return Math.floor((nTime - this.extra[0]) / 12);
	};
	
	per.isPersonInfo = function() { return this.isCharmedBy(); };
	per.getPersonInfo = function() {
		return this.addPersonString("donna0.jpg", "height:max%", "right") +
			"Donna became somewhat your friend over your visits. She shows deep sympathy and caring to you, but interestingly she looks as a very close friend and not as her " + perYou.getMaster() + " as everyone else do after you’ve charmed them. Maybe she has such a strong will that it only affects her that much or does she have any magical powers that you don’t know? You have to talk her about this.<br><br>" +
			"Anyways,  she is good friend who even lets you make out with her. Deep inside you know if you’d use your powers on her a second time she would most likely be turned into your slave, but you don’t want that. It’s nice to have a \"friend\" after all those obedient, determined to please you, loyal slaves you gathered. Sometimes she calls you " + perYou.getMaster() + " as a foreplay for sex because she knows you like it and she’s a hundred percent devoted to you just like the rest!<br><br>" +
			"Donna is waving at you by the pool. She gives you kisses to both ears and asks you if you have the time to chit-chat with her.";
	};
	
	per.addPersonPhoneCall = function() {
		if (!this.isCharmedBy()) return false;		// All SMS's are post Charm for her
		if (isShopOpen(4, 0, true) && !this.checkFlag(3)) {
			var perJenny = findPerson("Jenny");
			if (perJenny.isCharmedBy("You") && Place != 196 && Place != 269 && Place != 185 && !(wherePerson("MissLogan") == 196 && getPersonOther("MissLogan") == 1)) {
				var nt = this.hoursCharmed();
				var jt = perJenny.hoursCharmed();
				if (nt > 48 && jt > 48) {
					// SMS 120 for restaurant event
					if (makeCall(true, 120)) this.setFlag(3);
				}
			}
		}
		if (this.checkFlag(6) && !this.checkFlag(4) && this.hoursSinceEvent() > (12 + Math.ceil(Math.random() * 6))) {
			// SMS 121 after restaurant event
			if (makeCall(true, 121)) {
				this.setFlag(4);
				this.extra[0] = nTime;
			}
		}
		if (this.checkFlag(4) && !this.checkFlag(5) && this.hoursSinceEvent() > (12 + Math.ceil(Math.random() * 6))) {
			// SMS 122 after last sms
			if (makeCall(true, 122)) {
				this.setFlag(5);
				this.extra[0] = nTime;
			}
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		switch(id) {
			case 120: return receiveSMS('Donna', 'Hey there lover' + perYou.getSex() + '! Meet me at the restaurant for a good time…also wanted to talk to you. Ive seen this girl Jenny shes looking hot! Dont keep me waitin…xoxo');
			case 121: return receiveSMS('Donna', 'Boy that was fun!i like you soo much buddy;P.we have to repeat this again, a friendly get together, right? PS can I borrow Jenny for a while? I could use an ass like hers…:P') + replyToSMS(' sure thing; just dont break her…:DD');
			case 122: return receiveSMS('Donna', 'Jenny is great….shes helping around the house…:P I can understand why youre sooo fond of your slaves. Anyway, love u and keep safe…:)', 'donna-jenny sms.jpg', '88%');
		}
		return '';
	};


	per.showEvent = function()
	{
		var md;
		
		if (Place == 269 && sType == "charmdonna1") {
			// Charm Donna 1
			md = WritePlaceHeader();
			this.showPerson("donna2.jpg");
			addPlaceTitle(md, "Girl Under A Spell");
			md.write(
				'<p>"Oh my gosh!" the girl exclaims. "I feel so strange. My tummy is on fire and and I have this sudden urge towards you. Who are you? Please answer me, stranger! I want to know you!”</p>' +
				'<p>The spell starts to take effect on the innocent girl. She drops the classic book she was reading and stands up to face you. The colour purple is slowly filling her eyes. Yet you have an odd feeling. Something should be different, but you don’t know what, it’s just a feeling.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "introduce yourself", Place, 'type=charmdonna2');
			addLinkToPlace(md, "go to the bar?", 124);
			WritePlaceFooter(md);			
			return true;				
		}	
		if (Place == 269 && sType == "charmdonna2") {
			// Charm Donna 2
			md = WritePlaceHeader();
			this.showPerson("donna3.jpg");
			addPlaceTitle(md, "Donna Under A Spell");
			md.write(
				'<p>"' + perYou.getPersonName() + ', pretty name for an ugly ' + (perYou.isBornMale() ? 'Guy' : 'Girl') + ' like you…"- The redhead sarcastically notes your body. She defends her statement right after she sees your pouting face.</p>' +
				'<p>"Heyy! Honey, it’s just a joke! Don’t take it too seriously. I’m Donna and I already know we are going to be great friends!”</p>' +
				'<p>What? Friends? This is rather new. She doesn’t submit like the others and she is making smart jokes on you. What is going on?</p>' +
				'<p>"Donna, don’t you feel curious? We’ve just met and you want to be my friend? You don’t even know me.” – you push the subject, you want to understand what’s going on.</p>' +
				'<p>"' + perYou.getPersonName() + ', sit down next to me. Just take a break. If I don’t know you, I will soon. It doesn’t matter. All that’s important is that we enjoy each other’s company… Hmmm, do you like my tits? I know they are not that special, but I want a friend who enjoys them.", Donna grabs your arm and makes you sit down next to her on the deckchair. She frees one of her boobs from her swimsuit and strokes it. She latches onto one of your hand and guides it onto her open breast.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "accept Donna\'s friendship", Place, 'type=charmdonna3');
			WritePlaceFooter(md);			
			return true;				
		}	
		if (Place == 269 && sType == "charmdonna3") {
			// Charm Donna 3
			md = WritePlaceHeader(false, "td-left-large");
			if (isDay()) this.showPerson("donna4.jpg");
			else if (perYou.isMaleSex()) this.showPerson("donna9b.jpg");
			else this.showPerson("donna9g.jpg");
			addPlaceTitle(md, "Donna Under a Spell");
			md.write(
				'<p>The spell completes it’s task fully and you see that it reached Donna’s soul and altered her personality. She doesn’t bow to you nor calling you names and titles. The spell changed her only so that she became rather friendly and open to you.</p>' +
				'<p>"Yes, Donna. These are a nice pair. I know we will become very close in time, but I still can’t wrap my head around something. You know, I’ve put a spell on you that should make you my slave, but it’s not the case.” You tell her the truth. You know the spell has affected her that much enough that she is caring for you and understands you.</p>' +
				'<p>"I don’t know buddy. Yes, I do feel something different inside me, but to put it this way; I don’t care. I’m your friend now and I want the best for you. We can investigate this strange phenomenon you are witnessing together! Sounds fun!” She cheers you up and for a moment you forget what’s been bothering you. After an everlasting hug, she chimes into your ear.</p>' +
				'<p>"I\'ll be here if you need me, ' + perYou.getPersonName() + '. I don’t want to be lonely so visit me when you can, bud.” She picks up the book that she threw away earlier and cuddles into your arms and continues to read it.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "go to the bar?", 124);
			WritePlaceFooter(md);			
			return true;				
		}	
		
		if (Place == 185 || Place == 269) {
			if (sType == "enjoy") {
				// Donna Hotel event
				md = WritePlaceHeader(false, isDay() ? '' : "td-left-med");
				if (isDay()) this.showPerson("donna5.jpg");
				else if (perYou.isMaleSex()) this.showPerson("donna9b.jpg");
				else this.showPerson("donna9g.jpg");

				addPlaceTitle(md, "Donna");

				md.write(
					'<p>Donna prepares herself for you. Her body is firm and ripe for you to use however you like.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, "talk to Donna?", Place);
				WritePlaceFooter(md);
				return true;				
			}
			
		}
		if (Place != 196 || !isShopOpen(4, 0, true)) return false;
		
		// Donna Restaurant event
		if ((this.checkFlag(3) && !this.checkFlag(6) && wherePerson("Jenny") == 196) || sType == "donna0") {
			// Donna Hotel event
			md = WritePlaceHeader();
			this.setFlag(6);
			this.extra[0] = nTime;
			setQueryParams('type=donna0');
			var perJenny = findPerson("Jenny");
			perJenny.showPerson("jenny10.jpg");
			addPlaceTitle(md, "A Reservation?");
			md.write(
				'<p>You open the windowed door that serves as the entrance to the Bavaria Hut and look for Donna. ' +
				'Jenny jumps at you spooking you a bit, because in your hurry you forgot that she’s always standing next to the entrance, waiting for new customers to serve. However, this customer is her ' + (perYou.isBornMale() ? 'Lord and Master' : 'Lady and Mistress') + ' so the german waitress tilts her down, greeting you like a good servant.</p>' +
				'"Please follow me ' + perYou.getMaster() + '! Donna’s been waiting for you at your private room!", she’s talking about the VIP room you own at back of the restaurant.</p>' +
				'<p>Jenny escorts you rocking her hip seductively while you check out her booty from the back. As you arrive she poses for your viewing pleasure.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'enter the room', 196, 'type=donna1');
			WritePlaceFooter(md);
			return true;

		} else if (sType == "donna1") {
			// Donna at the Restaurant 1
			md = WritePlaceHeader();
			this.showPerson("donna-resto1.jpg");
			addPlaceTitle(md, "Donna at the Restaurant");
			md.write(
				'<p>Jenny closes the door to your very own private room where you usually spend your dinner. She makes sure it is closed and puts the key away then she marches to a narrow wall part that is between two windows that lights up the room and awaits further commands.</p>' +
				'<p>You see Donna on the restaurant’s table sitting in a casual attire that consists of a simple jeans and a blouse.</p>' +
				'<p>"Finally! I’ve been waiting for you!", she tells you. You come close to her and end up hugging your friend.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"It’s nice to see you too! What have you been up to?"', 196, 'type=donna2');
			WritePlaceFooter(md);
			return true;
			
		} else if (sType == "donna2") {
			// Donna at the Restaurant 2
			md = WritePlaceHeader();
			this.showPerson("donna-resto2.jpg");
			addPlaceTitle(md, "Donna at the Restaurant");
			md.write(
				'<p>You ask Donna how she has been while you sit down to the closest chair. The room is filled with antique paintings, chairs and a big, old fashioned table where at least twelve people could sit and eat.</p>' +
				'<p>"Not much, I can’t stop thinking about you! I can’t even finish that lame book I’ve been reading without stopping at every page. I daydream of having you there, with me, talking funny like you usually do!", she’s referring to Pride and Prejudice she was reading when you first met her. Donna gently pushes her chest thus making the upper buttons on her blouse tears apart revealing her two nipples wide open to you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"I thought you were a typical uptown girl who doesn’t talk to people like me."', 196, 'type=donna3');
			WritePlaceFooter(md);
			return true;
			
		} else if (sType == "donna3") {
			// Donna at the Restaurant 3
			md = WritePlaceHeader();
			this.showPerson("donna-resto3.jpg");
			addPlaceTitle(md, "Donna at the Restaurant");
			md.write(
				'<p>You jokingly imitate a british oldschool accent as you ask her. She looks at angrily and slaps your chest with her hands.</p>' +
				'<p>"Haha, very funny ' + perYou.getPersonName() + '! You know I was… before I met you!", she playfully pats your face. After that Donna looks at Jenny questioningly, who is still standing at her place hands behind her back.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Don’t worry. She’s mine! She serves me."', 196, 'type=donna4');
			WritePlaceFooter(md);
			return true;
			
		} else if (sType == "donna4") {
			// Donna at the Restaurant 4
			md = WritePlaceHeader();
			this.showPerson("donna-resto4.jpg");
			addPlaceTitle(md, "Donna at the Restaurant");
			md.write(
				'<p>You casually explain about Jenny to Donna. Jenny looks straight at one point on the dining table without ever looking up or glancing aside to you or Donna. She doesn’t want to disturb your time with your friend. How thoughtful of her! Meanwhile Donna opens her blouse and gets rid of it quickly. She’s doing the same with her jeans too!</p>' +
				'<p>You tell her "Now we are talking! Donna, you are one horny girl and I like that in you!", you say it again with that crappy english noble accent.</p>' +
				'<p>The redhead girl teases you by pulling some of her fiery red hair to hide her nipple.</p>' +
				'<p>"Honey, It’s in my blood! Oohh… I forgot about my panty…Whoops!" with a single action she’s out of that red thong and smirks at you coyly.</p>'

			);
			startQuestions();
			addLinkToPlaceC(md, '"I do have to admire your passion for getting rid of your clothes so fast!"', 196, 'type=donna5');
			WritePlaceFooter(md);
			return true;
			
		} else if (sType == "donna5") {
			// Donna at the Restaurant 5
			md = WritePlaceHeader();
			this.showPerson("donna-resto5.jpg");
			addPlaceTitle(md, "Donna at the Restaurant");
			md.write(
				'<p>"' + perYou.getPersonName() + ', stop talking that much… and live the moment!", Donna whispers while making glances at Jenny. She puts a finger to your mouth, shutting you up for the rest of the time while you two are together.</p>' +
				'<p>"How about a little somethin’ for my oh so tired and weary hero?" Donna continues to seduce you and your feelings. You wish you could take her right here right now, but she’s your friend. Donna would be more than willing to have you fuck her, but you don’t want that. You are afraid that if you would have sex with her, your power would drastically grow over her making her a slave like the rest. So you can only have these peepshows without worrying you would control her too much.</p>'
			);
			startQuestions();
			addLinkToPlaceO(md, 'You nod your head signaling her to finish what she started.', 196, 'type=donna6');
			WritePlaceFooter(md);
			return true;
			
		} else if (sType == "donna6") {
			// Donna at the Restaurant 6
			md = WritePlaceHeader();
			this.showPerson("donna-resto6.jpg");
			addPlaceTitle(md, "Donna at the Restaurant");
			md.write(
				'<p>She zealously shows you her pussy and ass even motioning you to touch them. She gives in all she got, you clearly see her whole body tightens for your viewing pleasure.</p>' +
				'<p>Ten minutes later, after you had your fun with her you tell Donna to get dressed and thank her for her friendship. She gives you a kiss on your lips and smilingly waves you away so she put her clothes back. You leave with Jenny at your side. Your very own waitress hugs and escorts you out of the Cafe. She goes back to work and you turn to back to the important matters at hand. You start to like these private sessions with Donna more each time you visit! She’s a keeper and a close friend!</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'exit the restaurant', 194);
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
			// Hotel Pool

			if (Place == 269 && this.isHere()) {
				if (!this.isCharmedBy()) {
					// Donna (pool girl) is HERE
					if (!isSpellKnown("Shielded Charm") && wherePerson("Lauren") == 269) addComments('Don\'t cast the spell here. It is too public.');
					else CastCharmSpell("Donna", Place, 20, 'type=charmdonna1');
				} else addComments('You attempt to cast the spell, but if fizzles.');
				return "handled";
			}

			// Donna's room
			if (Place == 185) {
				if (this.isHere()) addComments("You have already <i>Charmed</i> Donna");
				else addComments('You read a spell.... but it fizzles.');
				return "handled";
			}
		}
		return "";		// do nothing
	};
}
