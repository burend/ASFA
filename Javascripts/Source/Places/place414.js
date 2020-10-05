// Event: Charm Zoey/Visit Zoey

function ShowPlace414(stype)
{
	var md = WritePlaceHeader(false, stype == "threesome" || stype == "fuck" ? 'td-left-large' : '');

	var perMadison = findPerson("Madison");
	var perZoey = findPerson("Zoey");
	var bZDay = getHour() < 16;

	if (stype == "charm1") {
		// Charm Zoey step 1
		if (getHour() < 16) perZoey.showPerson("zoey2-noon.jpg");
		else perZoey.showPerson("zoey2-afternoon.jpg");
		addPlaceTitle(md, "Zoey Under a Spell");

		md.write(
			'<p>You recite the charm spell "Dai Chu Zoey" and she starts to say "Gesundheit..." but looks at you uncertainly. Madison speaks before you can start to mold Zoey,</p>' +
			'<p>"Hear that Zoey, it means you are going to be ' + perYou.getMaster() + '\'s slut and mine when ' + perYou.getHeShe() + ' allows it."</p>' +
			'<p>You tell Madison "Shut up Madison, it is for me to decide if she is to be a slut or slave, or both". Madison grins and answers "Yes ' + perYou.getMaster() + '!"</p>' +
			'<p>Zoey looks amused, "Maddy, again I am not into BDSM or just Domination games, but how you two are talking now is kind of hot....", you can hear in her voice the spell is taking effect on her.</p>' +
			'<p>It is time to assert yourself, and take Zoey\'s attention from Madison. You tell her firmly,</p>' +
			'<p>"It does not matter what you are into, a slave has no choice how their ' + perYou.getMaster() + ' wants them to act. Strip your clothing slave!"</p>' +
			'<p>With an almost unconscious motion Zoey removes her ' + (bZDay ? 'skirt' : 'pants') + ' and looks at you surprised and aroused.'
		);
		if (perYou.checkFlag(26)) md.write(' It is time to further re-inforce this, and you consider Madison\'s original words.</p>');
		else md.write('</p>');

		startQuestions();
		if (perYou.checkFlag(26)) addLinkToPlaceC(md, '"You are our slut now"', 414, 'type=charm2slut');
		addLinkToPlaceC(md, '"You are my slave now"', 414, 'type=charm2slave');

	} else if (stype == "charm2slave" || stype == "charm2slut") {
		// Charm Zoey step 2
		if (stype == "charm2slut") perZoey.charmThem(2);		// Slut charm
		if (getHour() < 16) perZoey.showPerson("zoey3-noon.jpg");
		else perZoey.showPerson("zoey3-afternoon.jpg");

		if (stype == "charm2slut") {
			addPlaceTitle(md, "Slut Zoey Under a Spell");
			md.write(
				'<p>As you tell Zoey that she is now your slut, Madison comments, "' + perYou.getMaster() + ' I am pretty sure she was already a slut!"</p>' +
				'<p>Zoey looks confused and again you say "Madison shut up, she is my slut first". Zoey looks at Madison and says,</p>' +
				'<p>"Maddy..don\'t be rude, just because I love sex and like a lot of lovers, it does not mean I am a slut"</p>' +
				'<p>Again you focus her attention on yourself, "Yes it does Zoey, you are a wanton slut who lives for sex, look you are stripping naked in front of me"</p>' +
				'<p>She continues to strip in response to your words, but she tried to deny it, "No...no...I just like....", you interrupt,</p>' +
				'<p>"Yes..yes..would anyone except a slut now be naked in front of a stranger. A stranger that they are now going to ' + (perYou.isMaleSex() ? 'suck their cock' : 'eat their pussy') + '?"</p>' +
				'<p>'
			);
			if (isExplicit()) AddImage(perYou.isMaleSex() ? 'GenericSex/Explicit/sex-mf blowjob d.jpg' : 'GenericSex/Explicit/sex-ff lick d.jpg', perYou.isMaleSex() ? '25%' : '40%', 'left');
			else AddImage(perYou.isMaleSex() ? 'GenericSex/sex-mf blowjob blonde hair-b.jpg' : 'GenericSex/sex-ff lick a.jpg', perYou.isMaleSex() ? '25%' : '40%', 'left');
			if (perYou.isMaleSex()) {
				md.write(
					'Zoey kneels down as you unzip and take out your cock. To your surprise and delight she gives you an expert blowjob and then starts to deep-throat you, she has clearly done this before.</p>' +
					'<p>As your pleasure builds you tell Zoey, "Ahh, very good, you are a true slut". She buries herself balls-deep on your cock and you feel her tongue lick your balls. You cry out in ecstasy "Here it comes slut, the first of many...ahhhh". You pull out, Zoey breaths deeply and looks up at you.</p>'
				);
			} else {
				md.write(
					'<p>Zoey kneels down as you lower your pants and expose your pussy. To your surprise and delight is very skilled, Madison had mentioned she was bisexual, she is clearly right.</p>' +
					'<p>As your pleasure builds you tell Zoey, "Ahh, very good, you are a true slut". She works your pussy and clit with redoubled vigour. You cry out in ecstasy "Ahh cumming you slut, you will be doing this a lot...ahhhh". Zoey leans back and looks up at you.</p>'
				);
			}

		} else {
			addPlaceTitle(md, "Slave Zoey Under a Spell");
			md.write(
				'<p>As you tell Zoey that she is now your slave, Madison comments, "Zoey you will love being a slave, sex is so much more intense and there is no need for dating, you have ' + perYou.getMaster() + ' now!"</p>' +
				'<p>Zoey looks confused and again you say "Madison shut up, she is my slave". Zoey looks at Madison and says,</p>' +
				'<p>"Maddy..I don\'t like those sort of games..."</p>' +
				'<p>Again you focus her attention on yourself, "Of course you do Zoey, you have been obeying my orders to strip and it is turning you on. You love the idea of submitting to me, and only to me. Strip more slave!"</p>' +
				'<p>She continues to strip in response to your words, but she tried to deny it, "No...no...I am not...I just like....", you interrupt,</p>' +
				'<p>"You like submitting and obeying like the slave you are. You are now be naked in front of your ' + perYou.getMaster() + '. Now prove your submission, ' + (perYou.isMaleSex() ? 'suck my cock' : 'eat my pussy') + '!"</p>' +
				'<p>'
			);
			if (isExplicit()) AddImage(perYou.isMaleSex() ? 'GenericSex/Explicit/sex-mf blowjob d.jpg' : 'GenericSex/Explicit/sex-ff lick d.jpg', perYou.isMaleSex() ? '25%' : '40%', 'left');
			else AddImage(perYou.isMaleSex() ? 'GenericSex/sex-mf blowjob blonde hair-b.jpg' : 'GenericSex/sex-ff lick a.jpg', perYou.isMaleSex() ? '25%' : '40%', 'left');
			if (perYou.isMaleSex()) {
				md.write(
					'Zoey kneels down as you unzip and take out your cock, she looks confused but obeys. To your surprise and delight she gives you an expert blowjob and then starts to deep-throat you, she has clearly done this before.</p>' +
					'<p>As your pleasure builds you tell Zoey, "Ahh, very good slave". She buries herself balls-deep on your cock and you feel her tongue lick your balls. You cry out in ecstasy "Here it comes slut, the first of many...ahhhh". You pull out, Zoey breaths deeply and looks up at you, the confusion gone from her eyes.</p>'
				);
			} else {
				md.write(
					'<p>Zoey kneels down as you lower your pants and expose your pussy, she looks confused but obeys. To your surprise and delight is very skilled, Madison had mentioned she was bisexual, she is clearly right.</p>' +
					'<p>As your pleasure builds you tell Zoey, "Ahh, very good slave". She works your pussy and clit with redoubled vigour. You cry out in ecstasy "Ahh cumming you slut, you will be doing this a lot...ahhhh". Zoey leans back and looks up at you, the confusion gone from her eyes.</p>'
				);
			}
		}

		startQuestions();
		if (stype == "charm2slut") addLinkToPlaceC(md, '"Good slut!"', 414, 'type=charm3slut');
		else addLinkToPlaceC(md, '"Good slave!"', 414, 'type=charm3slave');

	} else if (stype == "charm3slut" || stype == "charm3slave") {
		// Charm Zoey step 3
		if (getHour() < 16) perZoey.showPerson("zoey4-noon.jpg");
		else perZoey.showPerson("zoey4-afternoon.jpg");

		if (stype == "charm3slut") {
			addPlaceTitle(md, "Slut Zoey");
			md.write(
				'<p>Your new slut stands before you, almost completely naked, "Well, I admit it, I am a slut, how about your fuck me now?"</p>'
			);
		} else {
			addPlaceTitle(md, "Slave Zoey");
			md.write(
				'<p>You tell your new slave to stand, and she looks at you smiling, "' + perYou.getMaster() + ' want do you want me to do to you or Madison?"</p>'
			);
		}
		md.write(
			'<p>Zoey is yours, to take, to use as you wish! You see Madison looking at Zoey expectantly, so you order,</p>' +
			'<p>"Zoey it is time to reward Madison for bringing you to me"</p>' +
			'<p>'
		);
		if (isExplicit()) AddImage('GenericSex/Explicit/sex-ff lick e.jpg', '40%', 'right');
		else AddImage('GenericSex/sex-ff lick a.jpg', '40%', 'right');
		md.write(
			'Madison almost squeals in delight as she pulls off the rest of her clothing and practically forces her exposed pussy into Zoey\'s face. Madison cries out,<br><br>' +
			'"Thank you ' + perYou.getMaster() + ', office work is going to be a lot more fun now!"</p>'
		);
		md.write('<p>Afterwards Zoey gives you her phone number, telling you that you can call her anytime you need her.</p>');


		startQuestions();
		addLinkToPlace(md, 'return to the station reception', 371);


	} else if (stype == "fuck") {
		// Sex with Zoey
		perZoey.showPerson("zoey7.jpg");
		addPlaceTitle(md, "Fucking Zoey");

		md.write(
			'<p>Zoey quickly changes into her delivery uniform and makes a show of her short skirt and in the end she shows off her panties as she waits for your touch.</p>' +
			'<p>You touch her, and more as you take her and yourself to the heights of ecstacy before you leave Zoey and Madison for now.</p>'
		);

		startQuestions();
		addLinkToPlace(md, 'return to the station reception', 371);

	} else if (stype == "threesome") {
		// Threesome with Zoey and Madison
		if (!isExplicit()) perZoey.showPerson("GenericSex/threesome1.jpg");
		else if (perYou.isMaleSex()) AddImage("GenericSex/Explicit/sex-mff threesome e.gif");
		else AddImage("GenericSex/Explicit/sex-fff threesome a.jpg");
		addPlaceTitle(md, "Fucking Zoey and Madison");

		md.write(
			'<p>There is no need to just have Madison watch so you call her over to join in.</p>' +
			'<p>The three of you take each other to the heights of ecstacy before you leave Zoey and Madison for now.</p>'
		);

		startQuestions();
		addLinkToPlace(md, 'return to the station reception', 371);

	} else if (stype == "visitzoey" || stype === "") {
		// Visit Zoey
		if (getHour() < 16) perZoey.showPerson(perZoey.checkFlag(1) ? "zoey6-noon.jpg" : "zoey5-noon.jpg");
		else perZoey.showPerson(perZoey.checkFlag(1) ? "zoey6-afternoon.jpg" : "zoey5-afternoon.jpg");
		addPlaceTitle(md, "Zoey Visits");

		md.write(
			'<p>Zoey arrives and starts removing her clothing, and begs you,<br/>&quot;' + perYou.getMaster() + ' please...&quot;</p>'
		);

		startQuestions();
		addLinkToPlace(md, '"I\'d prefer you in your uniform"', 414, 'type=fuck');
		addLinkToPlace(md, '"I want both you and Madison', 414, 'type=threesome');
		if (isCharmedBy("Nina") && checkPersonFlag("Nina", 4)) addLinkToPlace(md, '"let\'s visit Nina for some more practise"', 371, 'type=ninazoey2');
		addLinkToPlace(md, 'return to the station reception', 371);
	}


	// Madison is always present
	if (sType !== "threesome") {
		AddRightColumnMed(md);
		perMadison.showPerson(perMadison.checkFlag(13) ? "madison18be.jpg" : "madison18.jpg");
	}

	WritePlaceFooter(md);
}