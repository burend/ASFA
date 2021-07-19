// Room 101 at the Hotel, Davy Robbins is here
// Confrontation

function BambiDominatesDavy()
{
	perDavy.setFlag(3);
	movePerson("Bambi", 184);		// Move Bambi to room 101
}

function ShowPlace184(stype)
{
	var perB = findPerson("Bambi");

	var md = WritePlaceHeader(false, stype == "interrupt" || ((perB.place == 184 || stype == "looking" || stype == "training") && !isExplicit()) ? "td-left-med" : "");

	var perKate = findPerson("Kate");
	var bKateCharmed = perKate.isCharmedBy("Davy");
	var myLord = perB.getYourNameFor();	// Bambi's way of addressing you
	setPlaceFlag("Hotel", 8);		// Fallback in case the seance path has not started

	// -----------------
	// Davy restrained in the room
	// AFTER the confrontation
	// -----------------
	if (perB.place == 184 || stype == "looking") {
		// Bambi dominates Davy, one off event
		setQueryParams("type=looking");		// For saving or checking some other pages
		perDavy.setFlag(3, false);
		perB.place = 124;
		if (isExplicit()) perDavy.showPersonRandomX("davy4", 2);
		else perDavy.showPerson("davy4.jpg");

		addPlaceTitle(md, "Bambi Looking After Davy");
		md.write(
			'<p>You go to check on Davy, wondering why Bambi is not at the hotel bar, maybe she is doing something to look after him. As you enter the room you hear,</p>' +
			'<p>"..lick it faster scum! You are nothing, a pale shadow of ' + myLord + ', but you have one use. Ahh..that is better...Ahhhh!"</p>' +
			'<p>You see Bambi is sitting on Davy\'s face, forcing him to lick her, and she just came hard on his face. She looks at you, a guilty expression forms on her face and she says.</p>'
		);
		if (checkPlaceFlag("Hotel", 8)) md.write('<p>"' + myLord + ' he asked for something to drink..."</p>');
		else {
			md.write(
				'<p>"' + myLord + ' he asked for something from the cellar, but that place has been closed for years, I am not even sure where the door to it is. I doubt there is any decent wine there, so I decided he deserved something nicer..."</p>' +
				'<p>You doubt he was asking for wine, so what was he after in the cellar? You need to see if you can locate more recent sets of plans for the Broken Inn Hotel.</p>'
			);
			setPlaceFlag("Hotel", 8);
		}
		md.write('<p>You can see from her talk previously about customers odd tastes, she must share them as well. She climbs off Davy and re-gags him.</p>');

		if (!perYou.isMaleSex()) md.write('<p>She asks you, "He has some skill but he needs more training. Would you like to train him?"');

		startQuestions();
		if (!perYou.isMaleSex()) addLinkToPlace(md, 'train Davy', 184, 'type=training');
	   addLinkToPlace(md, 'go back to the bar', 124);
		WritePlaceFooter(md);
		return;


	} else if (stype === "training") {
		// You train Davy
		var bFirst = !perDavy.checkFlag(4);
		perDavy.setFlag(4);

		perDavy.showPersonRandomRorX("davy5", 2);

		addPlaceTitle(md, "Training Davy");

		if (bFirst) {
			md.write(
				'<p>Well, Davy certainly needs to be controlled and dominated, so some more training seems a good idea, and you are feeling aroused from watching Bambi with him. You briefly talk to Bambi in another room to get suggestions and tips for training Davy and she gives you some expert information.</p>' +
				'<p>Bambi provides you with a whip and you use it on his ass while talking about how he has failed and is now worthless, that you have taken his family, and freed all the people he had charmed. You tell him how he is a complete failure, only worth serving you and your servant Bambi.</p>' +
				'<p>After a while Bambi repositions him and removes his gag. Before he can speak you sit on him, filling his mouth with your pussy and you order him "Lick"</p>' +
				'<p>Sometime later, after Davy has satisfied you, you redress and notice Bambi reward Davy, stroking his cock until he cums. You leave Davy to Bambi\'s expert attentions.</p>');
		} else {
			md.write('<p>You return to further train Davy as your slave</p>');
		}

		startQuestions();
	   addLinkToPlace(md, 'go back to the bar', 124);
		WritePlaceFooter(md);
		return;

	} else if (stype === "restrain") {
		// You ask for Bambi's help with Davy
		perDavy.place = 184;		// Put Davy explicitly in this room
		perDavy.setFlag(8);
		startTimedEvent("BambiDominatesDavy()", 10);
		perDavy.showPerson("davy3.jpg");
		addPlaceTitle(md, "Restraining Davy");
		if (!perKate.checkFlag(22) && !perKate.checkFlag(23)) md.write('<p>Kate leaves the room, saying "I am going home to pack, do not follow me!".</p>');
		md.write(
			'<p>You look at the unconscious Davy and you want to stop him from starting this all over again once he regains more Mana. While he is free from the influence of Kurndorf you have no doubt he will resume Charming people where he can and interfering with you.</p>' +
			'<p>You use the phone in the room to call the hotel bar and you ask Bambi to join you in the room, you hope she can help with Davy.</p>' +
			'<p>An excited Bambi enters the room a little later, and as she steps in she is already starting to undo her clothes, expecting something more carnal. You explain about how you need to restrain Davy for a while and ask if you can lock him in the room. She looks at Davy, and you see a grin form on her face,</p>' +
			'<p>"' + myLord + ' I know what to do here, excuse me for a few minutes while I get something"</p>' +
			'<p>She unplugs the phone in the room and gathers all of Davy\'s possessions, commenting she will lock these away.</p>' +
			'<p>About 5 minutes later she returns with a collection of ropes and other items and proceeds to expertly tie and gag Davy, tightly restraining him. As she does so she explains,</p>' +
			'<p>"' + myLord + ', I have had customers with odd tastes and I have a range of items to satisfy their needs."</p>' +
			'<p>You can see she must have had many such customers! She completes the rope work and she assures you that she will look after Davy for you.</p>');

		startQuestions();
		addLinkToPlace(md, 'you notice Davy\'s phone on a table', 184, 'type=checkphone');
		addLinkToPlace(md, 'go back to the bar', 124);
		WritePlaceFooter(md);
		return;

	} else if (stype === "restrainlater") {
		// You ask for Bambi's help with Davy
		if (perDavy.checkFlag(6)) {
			// Davy was unconscious but has escaped!
			AddImage("bedroom4.jpg");
			addPlaceTitle(md, "Davy has Escaped!");
			perDavy.place = 9999;
			perDavy.setFlag(7);
			md.write('<p>You take Bambi to the room but it is empty, is seems Davy has escaped, who knows where.</p>');
		} else {
			perDavy.place = 184;		// Put Davy explicitly in this room
			perDavy.setFlag(8);
			startTimedEvent("BambiDominatesDavy()", 10);
			perDavy.showPerson("davy3.jpg");
			addPlaceTitle(md, "Restraining Davy");
			md.write(
				'<p>You and Bambi go to room 101, and Bambi gets more and more excited as you approach, and as you open the door she is already starting to undo her clothes.</p>' +
				'<p>You explain about how you need to restrain Davy for a while and ask if you can lock him in the room. She looks at Davy, and you see a grin form on her face,</p>' +
				'<p>"' + myLord + ' I know what to do here, excuse me for a few minutes while I get something"</p>' +
				'<p>She unplugs the phone in the room and gathers all of Davy\'s possessions, commenting she will lock these away.</p>' +
				'<p>About 5 minutes later she returns with a collection of ropes and other items and proceeds to expertly tie and gag Davy, tightly restraining him. As she does so she explains,</p>' +
				'<p>"' + myLord + ', I have had customers with odd tastes and I have a range of items to satisfy their needs."</p>' +
				'<p>You can see she must have had many such customers! She completes the rope work and she assures you that she will look after Davy for you.</p>' +
				'<p>In passing you notice Davy\'s phone on a side table but it is locked and you doubt you could get him to give you the code.</p>'
			);

		}
		startQuestions();
	  addLinkToPlace(md, 'go back to the bar', 124);
		WritePlaceFooter(md);
		return;

	} else if (perDavy.checkFlag(5) && (!perDavy.checkFlag(6) && !perDavy.checkFlag(7) && !perDavy.checkFlag(8))) {
		// Davy is unconscious still
		perDavy.showPerson("davy8.jpg");
		addPlaceTitle(md, "Davy Unconscious in Hotel Room 101");
		md.write('<p>You see Davy is lying on the bed, still unconscious from Kate\'s blow.</p>');

		startQuestions();
	   addLinkToPlace(md, 'go back to the bar', 124);
		WritePlaceFooter(md);
		return;

	} else if (perDavy.checkFlag(6) || stype == "escaped") {
		// Davy was unconscious but has escaped!
		setQueryParams("type=escaped");		// For saving or checking some other pages
		AddImage("bedroom4.jpg");
		addPlaceTitle(md, "Davy has Escaped!");
		perDavy.place = 9999;
		perDavy.setFlag(7);
		md.write('<p>You see the room is empty, is seems Davy has escaped, who knows where.</p>');

		startQuestions();
	   addLinkToPlace(md, 'go back to the bar', 124);
		WritePlaceFooter(md);
		return;

	} else if (isDavyDefeated()) {
		// Davy is here and restrained
		perDavy.showPerson("davy3.jpg");
		addPlaceTitle(md, "Davy Restrained in Hotel Room 101");
		md.write('<p>You see Davy is still tightly restrained, unable to speak or move, Bambi is a very good rigger.</p>');

		startQuestions();
		if (!perYou.isMaleSex() && perDavy.checkFlag(4)) addLinkToPlace(md, 'train Davy some more', 184, 'type=training');
	   addLinkToPlace(md, 'go back to the bar', 124);
		WritePlaceFooter(md);
		return;

	// -------------------
	// Davy and/or charmed Kate in room 101
	// -------------------
	} else if (stype == "plan") {
		// Stopped Kate to plan a confrontation
		perKate.unCharmThem();
		perKate.showPerson("kate15a.jpg");
		addPlaceTitle(md, "Planning with Kate");

		md.write(
			'<p>You quickly stop Kate before she runs head-long into confront Davy, she looks at you annoyed,</p>' +
			'<p>"Not now, I need to punish an arsehole!"</p>' +
			'<p>You tell her that we need to work out how the confront him safely, he has controlled Kate before. She looks a little less certain'
		);
		if (perKate.checkFlag(15)) {
			md.write(' but then touches the silver necklace and says, "But I am safe with this, right!", you cannot argue this and she just runs towards Davy\'s room, and you follow after her');
			startQuestions();
			addLinkToPlace(md, 'follow Kate', 267, 'type=kick');
		} else {
			md.write('</p>');
			startQuestions("What will you both do?");
			startAlternatives(md);
			addTextForQuestions(md, "<b>Kate suggests</b>", "center");
			addLinkToPlaceC(md, '"I\'ll run in and kick him before he can say a word!"', 267, 'type=kick');
			addTextForQuestions(md, "<b>You suggest</b>", "center");
			addLinkToPlaceC(md, '"Let me go first and talk to him, you follow and kick him when I have him distracted"', 184, 'type=distract');
			if (perYourBody.FindItem(32) > 0 || perYourBody.FindItem(33) > 0)	addLinkToPlaceC(md, '"I\'ll take him out!"', 184, 'type=mechoose');
			if (isCharmedBy("Bambi")) addLinkToPlace(md, 'get Bambi to distract Davy with some room-service', 184, 'type=roomservice');
			endAlternatives(md);
		}
		addLinkToPlace(md, 'go back to the bar', 124, '', 'As you leave Kate looks pissed off at your apparent cowardice! and runs toward the room Davy is in', 'Kate', "setPersonFlag('Kate',4);movePerson('Kate', 4);");
		WritePlaceFooter(md);
		return;

	} else if (perKate.place == 184 && !bKateCharmed) {
		// Kate ran in and confronted Davy on her own AND is NOT wearing the necklace
		// Variation of default below
		perKate.showPerson("kate12b.jpg");
		addPlaceTitle(md, "Hotel Room 101");
		md.write(
			'<p>You step into room 101, and you see Kate has removed her clothes and is looking lustfully at Davy. She turns to you and says,</p>' +
			'<p>"Hello,have you come to join in the fun?"</p>');

		startQuestions();
		if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)	addLinkToPlace(md, 'interrupt Davy\'s fun', 184, 'type=interrupt');
		else addLinkToPlace(md, 'interrupt Davy\'s fun', 990);

	} else if (perKate.place == 184 && !bKateCharmed && perKate.checkFlag(15)) {
		// Kate ran in and confronted Davy on her own AND is wearing the necklace
		dispPlace(267);
		return;

	} else if (stype === "" && bKateCharmed) {
		// Davy and Kate are here, Kate is charmed
		perKate.showPersonRorX("kate12a.jpg", "50vw");
		addPlaceTitle(md, "Hotel Room 101");
		md.write(
			'<p>You stumble into room 101.  Kate and Davy are on the bed, <i>in flagrante delicto</i>.  The bed is shaking.</p>' +
			'<p>"Hello," says Kate, smiling a welcome to you. "Have you come to join in the fun?"</p>');

		startQuestions();
		if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)	addLinkToPlace(md, 'interrupt Davy\'s fun', 184, 'type=interrupt');
		else addLinkToPlace(md, 'interrupt Davy\'s fun', 990);

	} else if (stype == "interrupt") {
		// Davy and Kate are here and you tried to interrupt them AND you are protected
		if (isExplicit()) perKate.showPersonX("kate13.jpg");
		else perKate.showPerson("kate12a.jpg");
		addPlaceTitle(md, "Hotel Room 101");
		md.write('<p>Davy looks angry as you intrude on his activity. "You are really beginning to annoy me," he says, then you hear him whisper <i>"Dai Chu ' + perYou.getPersonName() + '"</i>.</p>');
		if (perYourBody.FindItem(46) > 0) md.write('<p>You feel a pulse of warmth in your bracelet.</p>');
		else md.write('<p>You feel a pulse of warmth from your necklace.</p>');
		md.write('<p>It takes him a moment to realize the spell didn\'t work, and you are sure you see a flash of fear in his eyes before his bravado reasserts itself.  "I\'ll give you one minute to get out of this room and leave me and my bitch alone."</p>');

		startQuestions();

	}	else if (stype == "distract") {
		// You distract him and she kicks him
		if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)	{
			perDavy.showPersonFace();
			addPlaceTitle(md, "Take Davy Out");
		} else {
			if (perYou.folder.indexOf("Nobody") != -1) perKate.showPerson("kate17b.jpg");
			else perYou.showPerson("charmedbydavy-start.jpg");
			addPlaceTitle(md, "Kate\'s Slave");
		}

		md.write(
			'<p>You enter the room and confront Davy, with the ideal of distracting him while Kate attacks. You tell him "Davy, you are a fool, I have taken you slaves, and I have the book, you are nothing!"</p>' +
			'<p>Davy looks angry as you intrude on his activity. "Rubbish!" he says, then you hear him whisper <i>"Dai Chu' + perYou.getPersonName() + '"</i>.</p>'
		);
		if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)	{
			md.write('<p>The spell has no effect on you and Davy looks very afraid...</p>');

			startQuestions();
			addLinkToPlace(md, 'Let Kate do her thing', 267, 'type=kick&after=you');

		} else {
			md.write(
				'<p>You feel a rush as the spell washes over you and you feel a surge of arousal. As you are becoming lost to the spell there is a blur as Kate runs in a drop-kicks Davy.</p>' +
				'<p>You look over at the scene, your mind a fog of arousal, and Kate looks at you annoyed, "Well you were useless, what good are you?"</p>' +
				'<p>You reply "Anything you want Mistress" and mean it as the spell locks you to the service of your beautiful mistress.</p>'
			);
			addRestartLink(md);
			WritePlaceFooter(md);
			return;
		}

		AddPeopleColumn();
		perKate.showPerson("kate15a.jpg");

		WritePlaceFooter(md);
		return;


	} else if (stype == "mechoose") {
		// You do it yourself using the ring/bottle

		if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)	{
			perDavy.showPersonFace();
			perDavy.showPersonFace();
			addPlaceTitle(md, "Take Davy Out");
		} else {
			perYou.showPerson("charmedbydavy-start.jpg");
			addPlaceTitle(md, "Kate\s Slave");
		}

		md.write(
			'<p>You enter the room with the intention of dealing with Davy yourself, Kate discretely follows you, waiting at the doorway.</p>' +
			'<p>Davy looks angry as you intrude on his activity. "You are really beginning to annoy me," he says, then you hear him whisper <i>"Dai Chu ' + perYou.getPersonName() + '"</i>.</p>'
		);
		if (perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0)	{
			md.write('<p>The spell has no effect on you and Davy looks very afraid...</p>');

			startQuestions();
			addLinkToPlace(md, 'Let Kate do her thing', 267, 'type=kick&after=you');
			AddPeopleColumn();
			perKate.showPerson("kate15a.jpg");
			WritePlaceFooter(md);
			return;

		} else {
			md.write(
				'<p>You feel a rush as the spell washes over you and you feel a surge of arousal. As you are becoming lost to the spell there is a blur as Kate runs in a drop-kicks Davy.</p>' +
				'<p>You look over at the scene, your mind a fog of arousal, and Kate looks at you annoyed, "Well you were useless, what good are you?"</p>' +
				'<p>You reply "Anything you want Mistress" and mean it as the spell locks you to the service of your beautiful mistress.</p>'
			);
			addRestartLink(md);
			AddPeopleColumn();
			perKate.showPerson("kate15a.jpg");
			WritePlaceFooter(md);
			return;
		}

	} else if (stype == "roomservice") {
		// Bambi distracts Davy
		perB.showPersonRorX("bambi13.jpg");

		addPlaceTitle(md, "Room Service");

		md.write(
			'<p>You ask Bambi to distract Davy with a little "room-service" and she eagerly agrees. You watch from nearby as she knocks on the door and enters a moment later. You wait for a discrete time and follow her into the room</p>' +
			'<p>Inside you see Bambi expertly giving Davy some complimentary "room-service". You can see Davy is quite absorbed, close to his..end of service.</p>' +
			'<p>You have a few moments to decide what to do, otherwise the angry Kate will take matters into her own hands.</p>'
		);
		startQuestions();
		addLinkToPlace(md, 'Let Kate do her thing', 267, 'type=kick&after=bambi');

		AddPeopleColumn();
		perKate.showPerson("kate15a.jpg");
		WritePlaceFooter(md);
		return;
	}

   addLinkToPlace(md, 'go back to the bar', 124, '', 'You leave Davy and Kate, and it seems likely that they will flee, given how fearful Davy has been of you', '', "perDavy.place = 9999;movePerson('Kate', 9999);");

	WritePlaceFooter(md);
}