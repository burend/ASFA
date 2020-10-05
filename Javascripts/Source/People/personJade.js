/**********************************************
Jade, Demonologist
***********************************************/
var perJade;

// Conversation responses
function RepliesJade(nR)
{
	var ret = true;
	var myName = perYou.getPersonName();
	
	if (nR == 666)
	{
		addComments(
			'"' + myName + '  do not consort with demons, you have neither the skill or training. No matter how beautiful they may be, they seek to enslave and little else. While I can work out bargains with them the cost can be very high."</p>' +
			'<p>She hesitates, "The warlock Kurndorf dealt with them but he has no compassion and would give any sacrifice for his deals"</p>' +
			'<p>You mention her calling for you,</p>' +
			'<p>"Those with magic, be they warlock, sorceror, witch or whatever name you wish, are a great prize for demons. Refuse any offer they make, there is little way for you to safely deal with them!"</p>'
		);
		this.setFlag(6);
	}
	else if (nR == 667)
	{
		addComments(
			'You tell Jade vaguely about a demon called Elian and mention something about a dream, unwilling to explain everything,</p>' +
			'"' + myName + ', names are very important in the occult world. Names are power, true-names absolute power. Demons can tell you a part of their name, as a magical link. Never say the name, never use it when you cast a spell, if you do you give <i>them</i> power over you.</p>' +
			'<p>You ask if there is any protection or some way to still use magic but limit their power. She looks at you piercingly,</p>' +
			'<p>"Really, this succubus must have a considerable pull, but then again this is the way of those dream-demons. If you <b>must</b> try using her name reversed in the spell. It is still enough to allow some effect, but will restrict her power. You will still need other protections, but I will not help you there. If you are fool enough to respond to a summoning then figure out yourself what you need."'			
		);
		this.setFlag(7);
	}
	else if (nR == 668)
	{
		addComments(
			'"' + myName + ', there are ways but are very difficult and require rare insight into demons and how they possess people. I am not foolish enough to do deminoc possessions, unlike you". You try to argue that it was not you who did it, but she dismisses you and continues speaking over you,.</p>' +
			'<p>"You need someone who has had first hand experience or is an idiot who dabbles in demoonic possessions."</p>'
		);
		this.setFlag(8);
	}
	else if (nR == 669)
	{
		if (perYourBody.NoItems < perYourBody.MaxItems) //have room
		{
			perYourBody.PutItem(5); //Give you a stone
			this.setFlag(9); // Got it
			addComments(
				'<p>She steps over and picks it up, she weighs it in her hand and tosses it to you,</p>' +
				'<p>"I know of these, they are useless to me, have it ' + myName + '"'
			);
		} else addComments("You reconsider, you can barely carry the items you have now. You will ask her another time");
	}
	else if (nR == 670)
	{
		addComments(
			'"' + myName + ',  I have a full set of dancers for the club, but we can always fit in a \'special\' dancer, midnight seems an appropriate time for a person like you, or your \'friends\'. One person a night, just let me know in advance by phone. After the performance visit me for the performance fee, the dancer will keep any tips they earn of course."</p>' +
			'<p>Tonight we are full, but any other night I can schedule a dancer for you...or you can dance.'
		);
		this.other = 'done';
		this.setFlag(10);
	}
	else if (nR == 671)
	{
		addComments(
			'Jade hands over ' + sCurrency + this.extra[0] + ' with a smirk.</p>'
		);
		AddCash(this.extra[0]);
		this.extra[0] = 0;
	}
	else if (nR == 672)
	{
		addComments(
			'You ask if Jade knows Rachael, and for a moment she looks puzzled. She then says,</p>' +
			'"You mean that one you have been having a drink with recently? I doubt her name is Rachael, it is a bit too...human"</p>' +
			'<p>Human? You ask her to explain more. She shakes her head,</p>' +
			'<p>"Once again you are consorting with things beyond your knowledge or power to control. I do not know her name, but I would guess a part of it is \'Elian\'. She is undoubtably the demon who called to you, now hunting your body and soul."</p>' +
			'<p>You ask what can you do, and she again shakes her head,</p>' +
			'<p>"Why do I care, you have little to offer now and without more of her name you are limited in what is possible. Take care around her, do not lose your soul!"</p>'
		);
		setPersonFlag("Elian", 9);
	}
	else if (nR == 673)
	{
		addComments(
			'You ask about binding demons, if you should know their complete, true name. She looks at you,</p>' +
			'<p>"Really, are you going to go the path of Kurndorf and weild the power of demons. Are you willing to make the sacrifices to learn the name and then to accept their nature?"</p>' +
			'<p>You hesitate, you certainly do not want to become another Kurndorf and have his fate, and you state that. Jade shakes her head,</p>' +
			'<p>"Demons are not human, do not expect one to become a cute "demon-girl" girlfriend, no matter how pretty and blonde they are. Their nature is torment, to punish to spread chaos"</p>' +
			'<p>You are not sure this all applies to Elian but then again how much do you know about her. Still you want to know how to proceed and ask again. Jade answers simply,</p>' +
			'<p>This a best done is a place of magical power, and have a large mirror to view their true nature. Invoke their true name and tell them the terms of your contract. What services you want, restrictions on them. They will tell you a price. Agree and it is done"</p> ' +
			'<p>Jade then tells you to leave her'
		);
		Place = 282;
		setPersonFlag("Elian", 26);
	}	
	return ret;
}

function initialiseJade()
{
	// Jade
	perJade = addPerson("Jade", 280, "Jade", '', false);
	per.Replies = RepliesJade;
	per.other = '';
	
	per.getYourNameFor = function() { return this.checkFlag(4) ? '<i>' + perYou.getMaster() + '</i> ' + perYou.getPersonName() : perYou.getPersonName() ; };
	
	per.getPersonAddress = function() { return this.checkFlag(1) ? 'Avernus Club, Glenvale Shopping Center' : ''; };

	per.passTimeDay = function() {
		this.setFlag(3, false);
		this.other = '';
		return '';
	};
	
	per.passTimeMidnight = function() {
		if (this.other !== '' && this.other != 'done') {
			this.extra[0] += 20;
			this.other = 'done';
		}
		return '';
	};
	
	per.getDancer = function() { return this.other + ''; };
	per.setDancer = function(s) { this.other = s + ''; };
	per.isDanceAvailable = function() { return this.checkFlag(10) && this.other === ''; };
	
	// Events for Jade
	per.showEvent = function()
	{
		var md;
		
		if (Place == 282 && this.checkFlag(10) && this.other === '' && !this.checkFlag(3) && !this.checkFlag(11)) {
			// See her performing
			this.setFlag(11);
			md = WritePlaceHeader();
			this.showPerson("poledancea.jpg");
			addPlaceTitle(md, "Jade\'s Performance");
			md.write('<p>You see on the stage an act must have started a while ago, it is a femdom sort of thing, a dominatrix and her submissive male slaves. ');
			if (perYou.isMan()) md.write('Not really your thing but you watch  for a little while getting a drink.');
			else md.write('Not exactly your thing, but then again it\'s not that far from what you are doing with the charm spell.');
			md.write(
				'<p>You are not that surprised when you recognise the dominatrix as Jade, this seems entirely her kink. It is only odd to you she is doing it here on stage, but maybe there was a cancellation, or that she gets off on dominating people and loves the attention while doing so. The more the think of it, it is the second, her desire for domination.</p>' +
				'<p>You wish you could work out a way to completely dominate her, but she seems to be strongly protected from magic.</p>'
			);
			startQuestionsOnly();
			addLinkToPlace(md, 'Jade leaves the stage', 282);
			WritePlaceFooter(md);
			return true;					
		}
		
		if (Place != 280) return false;
		
		if (sType == "askjade") {
			// Meet Jade
			this.setFlag(1);
			this.setFlag(3);
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson("jade2.jpg");
			addPlaceTitle(md, "Meeting Jade");
			md.write(
				'<p>You ask a few people about a woman named Jade and you are immediately corrected "Mistress Jade" and directed to a private room at the rear of the club</p>' +
				'<p>The room is outfit as a stylised dumgeon, a fantasy of BDSM and other gear. A woman is sitting on a chair, more sprawled than sitting, looking at you with a condescending expression. Dressed in shiny leather she scream "Dominatrix" to you, especially as you were told she is "Mistress Jade"! As you are thinking this she states bluntly,</p>' +
				'<p>"You touched a demon", you start at her accurate statement. She continues "A possession here in Glenvale, like the old days"</p>' +
				'<p>You are at least a little ashamed of what happened to Jesse, and hesitate before asking her if she is a demonologist as you had been told. She looks at you,</p>' +
				'<p>"You survived the encounter, you must have some power, or luck. I think power but it is difficult to say. Yes I am a demonologist, but I am not fool enough to summon a demon and allow it to possess someone!"</p>' +
				(checkPersonFlag("Seraphina", 2) ? '<p>You ask about Seraphina the thrall and she smiles, "One of the results of your foolishness. She was sent to me to try and corrupt me and this place. I have dealt with that plan, she is mine now."</p>' : '') +
				'<p>You start to explain it was someone else, though it was partly your fault, and she interrupts,<p>' +
				'<p>"You want my help, I can, but everything has a price. Domination is what matters to demons, and to me. Submit to me in at least a token, and pay a fee of money, ' + sCurrency + '50 and I will answer your questions."<p>' +
				'<p>You ask about the token submission, and she smiles, "Lick my boots". She looks at you appraisingly, "You are young, so if money is short I am sure there is another way you can serve me instead of the payment"</p>' +
				'<p>You ask what sort of payment and she answers, "' + (perYou.isBornMale() ? 'My strap-on, your ass' : 'Dance for me in the club') + '". You look surprised, that is not something that had ever crossed your mind!</p>'
			);
			startQuestions();
			startAlternatives(md);
			addLinkToPlaceC(md, '"No way! I will not submit to you!"', Place, 'type=nosubmit');
			if (nMoney > 49) addLinkToPlace(md, 'pay the fee and lick her boots', Place, 'type=payfeemoney');
			addLinkToPlace(md, 'pay the other way and lick her boots', Place, 'type=payfeeother');
			addLinkToPlace(md, 'leave her for now', 282, '', 'As you leave she tells you to not waste her time, and the door is locked behind you. Hopefully she will allow you back another time, maybe tomorrow?');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "nosubmit") {
			// Meet Jade
			md = WritePlaceHeader();
			this.showPerson("jade1.jpg");
			addPlaceTitle(md, "Meeting Jade");
			this.setFlag(4);
			md.write(
				'<p>For looks at you with a mixture of anger and amusement,</p>' +
				'<p>"Someone so young to act like a ' + perYou.getMaster() + ' and you have done nothing to earn my respect", she looks at you and continues,</p>' +
				'<p>"I have to admire your attitude at least, all right, then ' + sCurrency + '200 and nothing else."</p>' +
				'<p>Well you have sort of negotiated just for a lot more money!' +
				(nMoney < 200 ? ' Except you do not have it of course.' : '')
			);
			startQuestions();
			startAlternatives(md);
			if (nMoney > 199) addLinkToPlace(md, 'pay the fee', Place, 'type=payfeemoneyonly');
			addLinkToPlace(md, 'leave her for now', 282);
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "payfeemoneyonly") {
			// Meet Jade
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson("jade2.jpg");
			addPlaceTitle(md, "Paying Jade");
			if (!this.checkFlag(5)) AddCash(-200);
			this.setFlag(5);
			setQueryParams();
			md.write(
				'<p>You hand over the money and she says "Our contract is complete, ask you questions or other requests"</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave her for now', 282);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "payfeemoney") {
			// Meet Jade
			md = WritePlaceHeader();
			this.showPerson("jade3.jpg");
			addPlaceTitle(md, "Paying Jade");
			if (!this.checkFlag(5)) AddCash(-50);
			this.setFlag(5);
			setQueryParams();
			md.write(
				'<p>You hand over the money and she stand and puts her foot on a stool. You then see it is not really a stool, it is a crouched man, kneeling at the feet of his Mistress.</p>' +
				'<p>You hesitate, this is not something you have done before, but you quickly kneel down and give a tentative lick of her boot. As you do you feel the handle of her whip press into your back to tell you to keep doing it. You force yourself to continue until the handle is removed.</p>' +
				'<p>As you stand, she smiles "A defiant one aren\'t you, an aspiring ' + perYou.getMaster() + ' and not a submissive it seems. Our contract is complete, ask your questions or make your requests."</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave her for now', 282);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "payfeeother") {
			// Meet Jade
			md = WritePlaceHeader(false,perYou.isBornMale() ? 'td-left-med' : '');
			if (perYou.isBornMale()) this.showPerson("jade5.jpg");
			else perYou.showPerson("poledancea.jpg");
			addPlaceTitle(md, "Paying Jade");
			this.setFlag(5);
			setQueryParams();
			md.write(
				'<p>You hand over the money and she stand and put her foot on a stool. You then see it is not really a stool, it is a crouched man, kneeling at the feet of his Mistress.</p>' +
				'<p>You hesitate, this is not something you have done before, but you quickly kneel down and give a tentative lick of her boot. As you do you feel the handle of her whip press into your back to tell you to keep doing it. You force yourself to continue until the handle is removed.</p>' +
				'<p>As you stand, she smiles "A Defiant one aren\'t you, an aspiring ' + perYou.getMaster() + ' and not a submissive it seems. Now the rest"</p>'
			);
			if (perYou.isBornMale()) {
				md.write(
					'<p>She smiles and just states, "Strip". You are having second thoughts about this and hesitate, and she swats her whip on your jean-clad ass. She smiles and repeats, "Strip"</p>' +
					'<p>You grit your teeth and decide you may as well go through with it, and strip, she has you lie down on your back and puts on her strap-on and lucricates it to your relief.<p>' +
					'<p><i>scene to follow</i></p>' +
					'<p>After she finishes, she allows you to redress and says,</p>' +
					'<p>"Our contract is complete, ask your questions or requests"</p>'
				);				
			} else {
				AddCash(10);
				md.write(
					'<p>She offers you a changing room but you initially refuse until she says that you are wearing too much to dance properly. You quickly strip off some clothing and head bac to her room, she stops you, and gestures toward the main area of the club. She meant for you to dance publically! Youstart to refuse but she stops you,</p>' +
					'<p>"You have come this far, show me your courage and your body", you suppose she is right, you might as well get this over with. You step out and Jade introduces you as "Everyone enjoy a new performer, the Witch ' + perYou.getPersonName() + '!" and there is a light applause.</p>' +
					'<p>While this is not something you have really done <b>much</b> of before, you did once play around with Tracy and she gave you a surprisigngly good lesson but it was a while ago. You start out a bit tentatively but quickly get used to it and actually start to enjoy it.<p>' +
					'<p>You finish, panting to some more applause and actually a few tips! Jade escorts you back to her room and tells you,</p>' +
					'<p>"Our contract is complete, ask your questions or requests"</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, 'leave her for now', 282);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "castcharm") {
			// Cast Carm on Jade
			this.setFlag(2);
			this.setFlag(3);
			md = WritePlaceHeader();
			this.showPerson("jade1.jpg");
			addPlaceTitle(md, "Charming Jade");
			md.write(
				'<p>You whisper the words of the charm spell, but Jade does not react except to smile,</p>' +
				'<p>"Domination and control is my expertise, that of people and demons. I know of that forbidden spell you just tried to use on me, and I am quite protected by a <b>contract</b>. You are a fool, you should control people of their own free will, it is so much more satisfying."</p>' +
				'<p>She steps over and slaps you and then prders you, "Get out"</p>' +
				'<p>You have no choice but to leave, hopefully she will calm down later.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave her for now', 282);
			WritePlaceFooter(md);
			return true;		
		}
	
		if (sType == "payment") {
			// Meet Jade
			this.setFlag(3);
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson("jade2.jpg");
			addPlaceTitle(md, "Meeting Jade");
			md.write(
				'<p>You visit the room used by Mistress Jade again, she is sitting waiting for you.</p>' +
				'<p>She is blunt, "My price is unchanged, ' +
				(this.checkFlag(4) ? sCurrency + '200' : sCurrency + '50, and lick my boots or the other way') + '</p>'
			);
			startQuestions();
			startAlternatives(md);
			if (this.checkFlag(4)) {
				if (nMoney > 199) addLinkToPlace(md, 'pay the fee', Place, 'type=payfeemoneyonly');
			} else {
				if (nMoney > 49) addLinkToPlace(md, 'pay the fee and lick her boots', Place, 'type=payfeemoney');
				addLinkToPlace(md, 'pay the other way and lick her boots', Place, 'type=payfeeother');
			}
			addLinkToPlace(md, 'leave her for now', 282, '', 'As you leave she tells you to not waste her time, and the door is locked behind you. Hopefully she will allow you back another time, maybe tomorrow?');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;		
		}
		return false;
	};
	
	// Text for a place
	per.showPersonTextHere = function(md)
	{
		if (Place == 280 && sType === "" && !this.checkFlag(9)) md.write('<p>You notice a familiar looking stone sitting on a shelf.</p>');
		if (sType !== "" || Place != 282 || this.whereNow() != 280) return;
		if (!isShopOpen(-2, -2, true, true)) return;

		if (this.checkFlag(3))  md.write('<p>Mistress Jade\'s private room seems to be closed.</p>');
		else if (this.checkFlag(1))  md.write('<p>Mistress Jade\'s private room seems to be open.</p>');
	};
	
	// Questions for Jade
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 280 && this.checkFlag(5) && this.isHere()) {
			// Questions and bargains
			if (!this.checkFlag(6)) addQuestionC(md, 'ask about demons', "Jade", 666);
			var perLeanne = findPerson("Leanne");
			if (perLeanne.place == 382 && !perLeanne.checkFlag(9)) addQuestionC(md, 'ask her about saving a person from demons', "Jade", 668);
			if (sType === "" && !this.checkFlag(9)) addQuestionC(md, 'ask about the stone', "Jade", 669);
			if (!this.checkFlag(10)) addQuestionC(md, 'ask about dancing in the club', "Jade", 670);
			if (this.extra[0] > 0) addQuestionC(md, 'ask for the performance fees', "Jade", 671);
			return;
		}
		if (sType !== "" || Place != 282) return;
		if (isShopOpen(-2, -2, true, true)) {
			 // Club is open
			 if (!this.checkFlag(1)) addLinkToPlaceC(md, 'ask around for Jade', 280, 'type=askjade');
			 else if (!this.checkFlag(3)) {
				if (this.checkFlag(5)) addLinkToPlaceC(md, 'visit Mistress Jade', 280);
				else addLinkToPlaceC(md, 'visit Mistress Jade', 280, 'type=payment');
			}                                           
			 
		} //else {
			// Club is closed
			
		//}
	};

	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Visitng
			if (Place == 280 && this.isHere()) {
				if (this.checkFlag(2)) addComments("It seems pointless to try this again!");
				else dispPlace(280, 'type=castcharm');
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	per.isPhoneable = function() {
		// Can you call them?
		return this.isDanceAvailable();
	};

	per.callThem = function() {
		receiveCall('', 'You decide the payment offered for dancing is too tempting and call Jade to arrange for a dancing session for yourself. Jade immediate agrees, but there is a tone to her voice, a superior smirk, that she feels this is one way she is superior to you. You grit your teeth and arrange the session for tonight');
		this.setDancer("You");
		WriteCommentsFooter(bChat, bChatLeft);
	};
}
