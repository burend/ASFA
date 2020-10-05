// Place: Graveyard

function ShowPlace325(stype)
{
	var md = WritePlaceHeader(false, stype == "fuck" ? "td-left-large" : "");

	var perLea = findPerson("Leanne");
	if (perLea.isHere() && perJesse.getDemonPath() >= 50) {
		// Meeting with Jesse at the park has happened, if not already a thrall make her so
		perLea.charmThem(4, "Demon");
	}
	var bDemonCharm = perLea.isCharmedBy("Demon");

	if (stype == "talk") {
		// Talk to Leanne
		perLea.setFlag(4);
		perLea.showPerson("leanne3b.jpg");

		addPlaceTitle(md, "Leanne at the Graveyard");
		md.write(
			'<p>You approach Leanne and she looks at you sadly. Without a word you place an arm around her shoulders. After a little while you speak words of sympathy and comfort as best as you can. Leanna smiles in a slightly strained way and in a slightly broken voice,</p>' +
			'<p>"Sorry, it is just I keep hearing strange rumours, Louise said she saw a ghost the other day, and I heard someone saw weird shapes in the park and an unearthly scream like a banshee. It got me to thinking about death and the dead..."</p>' +
			'<p>You try to reassure her, but she continues,</p>' +
			'<p>"You know my father\'s, great-grandfather, or was it great-great-grandfather...I can never remember this ancestry stuff...he was in the coven, a servant of that warlock Kurndorf. My mother\'s ancestors were even there too, but in a less...corrupt way...as..servants.. This talk of ghosts and banshee makes me think of these and my family..."</p>' +
			'<p>You try to change the topic of the conversation, it is too close to what is going on for comfort, and Leanna tells you,</p>' +
			'<p>"It\'s alright, when I am finished here I think I will go and seek God\'s guidance, the Mother will help as always."</p>' +
			'<p>You talk a little more with her, nothing of import, just to try to help her if you can. After a little while you part company with your friend.</p>'
		);
		// Choices
		startQuestions();
		addLinkToPlace(md, "walk through the Graveyard", 325);


	} else if (stype == "fuck") {
		// Take the Thrall
		perLea.setFlag(5);
		if (perYou.isMaleSex()) perLea.showPerson("leanne5b.jpg");
		else perLea.showPerson("leanne5g.jpg");
		addPlaceTitle(md, "Thrall at the Graveyard");
		md.write(
			'<p>You tell yourself that this is not your friend Leanne, it is her body, but this is a thrall of the demon Legion, not Leanne. You keep telling yourself that as you approach her.</p>' +
			'<p>You are rather confused and disturbed, you do not know if your friend is like this permanently, but you have always felt attracted to her, not that you would ever of considered doing anything before this. As you hesitate you see Leanne...the thrall smile and gesture for you to approach.</p>' +
			'<p>You step onto the stony wall or is it a decaying scarcophagus, and kneel awkwardly on part of Leanne\'s dress. You smell a faint hint of sulphur and look uncertainly at the thrall. She reaches up and undoes your pants, and then ' + (perYou.isMaleSex() ? 'strokes your hardening cock' : 'rubs your moistening pussy') + ' and says "You want this body, take it"</p>' +
			'<p>Your hesitation evaporates, though not all your discomfort and you push the thrall down and '
		);
		if (perYou.isMaleSex()) {
			md.write(
				'sink your hard cock into her hot and very wet pussy. She lewdly moans and rakes her fingernails over your back. You pound your cock into her, fucking her with wild abandon, this is just your lust for Leanne..the thrall, a being driven by lust. You feel you climax rapidly approaching and the thrall painfully digs her nails into your back and you feel her orgasm, strong pulsations of her pussy and you grunt as you cum, unloading your lust and balls deeply into her.</p>'
			);
		} else {
			md.write(
				'straddle her face. She eagerly and skillfully licks your pussy lips and clit. You are aware she is masturbating herself but this is about lust and about the thrall satisfying your lust for Leanne..the thrall, a being driven by lust. Your orgasm builds quickly and irresistibly, and your scream of passion echoes through the graveyard. You slump and then see her pussy as she lowers it onto your face. You reach up to lick and at the touch of your tongue the thrall lewdly moans and you see her pussy intensely orgasm, pulsing with small squirts of unnaturally hot liquid.</p>'
			);
		}
		md.write(
			'<p>Awkwardly and a little embarrassed you climb off her and redress. She looks at you "Desire remains, always"</p>'
		);
		// Choices
		startQuestions();
		addLinkToPlace(md, "walk through the Graveyard", 325);

	} else {

		// Otherwise
		if (perLea.isHere() && bDemonCharm && !perLea.checkFlag(3)) perLea.showPerson("leanne4a.jpg");
		else if (perLea.isHere() && bDemonCharm) perLea.showPerson("leanne4b.jpg");
		else if (perLea.isHere() && !perLea.checkFlag(2)) perLea.showPerson("leanne3a.jpg");
		else addPlaceImage(md, "graveyard.jpg", "", "", "Graveyard");

		addPlaceTitle(md, "Graveyard");

		// Description
		md.write(
			'<p>The large graveyard of the city.  Many of the graves are so old and broken down that they must have been from the original settlers of the city before it was <i>rebuilt</i>.</p>' +
			'<p>There are any number of graves of different types, including more than a few mausoleums of people whose families were rich enough to not force their loved ones to endure interment <i>within</i> the earth, but rather above it.</p>');

		if (perLea.isHere()) {
			if (bDemonCharm) {
				if (!perLea.checkFlag(3)) {
					perYou.startQuest(5);
					perLea.setFlag(3);
					md.write(
						'<p>You see Leanne is still here, leaning against a wall. She seems to have had a problem with her clothes, her belt must have broken or the lower part ripped. You approach her to offer some assistance and she looks at you, a smile on her face. You are about to talk to her and you see her eyes, blank like the Demon Legion\'s thralls. Did the demon take your friend, turning her into a soul-less being of pure desire, with no free-will a puppet of the demon? As you look at her in horror, she speaks, her voice still that of Leanne but different, more sensual,</p>' +
						'<p>"Mistress told this thrall to wait here but not for you. This one once here wanted you but would not take you, some pointless things called \'friendship\' and \'family\'. Mistress took that. Now this thrall waits for one of the brides to come here and submit to <b>her</b>. They come here, sneaking though a secret way, when they want to escape that place and the laws they must follow."</p>' +
						'<p>She looks at you, and you call for Leanne to resist the demons influence');
					if (perYourBody.FindItem(32) > 0) md.write(', and try the silver ring but it fails to do anything');
					md.write(
						'. Leanne, or is it the thrall, replies,</p>' +
						'<p>"Quiet, all of that one is gone, Mistress has her to devour when it is time to <i>leave</i>."</p>' +
						'<p>The thrall, you can no longer call her Leanne, looks at you hungrily,</p>' +
						'<p>"Desire remains and this thrall has time, this body is yours"</p>' +
						'<p>The thrall removes the rest of Leanne\s clothing and lies down on them, waiting for you.</p>'
					);
				} else md.write('<p>You see the thrall in Leanne\'s body lying on her clothes, naked and waiting sensuously, for you, or for her prey.</p>');
			} else if (!perLea.checkFlag(2)) {
				md.write('<p>You see Leanne near a ruined mausoleum, or maybe it is a disused part of the old church. She is walking thoughtfully towards her family graves, where her parents are buried and those of several generations of her kin. She has not noticed you yet.</p><p>You feel sad for your friend, she regularly visits the graves, probably too often but she takes some comfort here.</p>');
				perLea.setFlag(2);
			} else if (perLea.checkFlag(4)) md.write('<p>You see Leanne is still here visiting her families graves, you cannot think of a reason to interrupt her again.</p>');
			else md.write('<p>You see Leanne is still here visiting her families graves.</p>');
		}
		// Choices
		startQuestions();

		if (perLea.isHere()) {
			if (bDemonCharm) addLinkToPlace(md, "take the thrall", 325, 'type=fuck');
			else if (!perLea.checkFlag(4)) addLinkToPlaceC(md, "talk to Leanne", 325, 'type=talk');
		}
	}

	// Common choices/images
	addLinkToPlace(md, "walk to the Broken Inn Hotel", 123);

	if (isPlaceKnown("Mausoleum")) {
		//Know about Mausoleum (via clairvoyance spell from Graveyard or otherwise)
		addLinkToPlace(md, "inspect the Mausoleum", 324);
	}

	if (perLea.isHere() && !perLea.shown) {
		AddPeopleColumnLarge();
		if (bDemonCharm) perLea.showPerson("leanne4b.jpg");
		else perLea.showPerson("leanne3b.jpg");
	}

	WritePlaceFooter(md);
}