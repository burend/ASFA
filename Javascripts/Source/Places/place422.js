// Event: Bartel Home Lounge room

function ShowPlace422(stype)
{
	var perCarol = findPerson("Carol");
	var bCarolCharmed = perCarol.isCharmedBy();
	var perEllie = findPerson("Ellie");
	var herName = perEllie.getPersonName();
	var clvE = perEllie.isCharmedBy() ? perEllie.getCharmedLevel() : 0;
	var myName = clvE == 4 ? perYou.getMaster() : perYou.getPersonName();

	var md = WritePlaceHeader(stype === "seecarol", stype === "carol5" || (!isExplicit() && stype == "fuck") ? "td-left-large" : "");

	var bWait = true;
	var b2Cols = false;

	if (stype === "" || stype == "visitcb" || stype == "visitc") {
		perEllie.showPersonRandom("ellie16", 2);
		addPlaceTitle(md, "Ellie in the Living-room");

		if (stype == "visitcb") {
			// Visiting while Carol is busy with Kristin
			md.write('<p>You knock on the door to the Bartel home and after a little ' + herName + ' answers and she leads you into the living room. She is not wearing very much at all.</p>');
			if (clvE == 4) md.write('<p>"Hello ' + myName + ' this slave is sorry for being so slow, her mother is currently busy with a friend of hers, the Bank Manager Kristin."</p>');
			else md.write('<p>"Hello my love! Sorry I took so long, I thought my mother was going to answer the door. Then I remembered she is busy with her friend Kristin". You notice she looks a little unhappy. You reassure her that it will be alright and she smiles and kisses you.</p>');
		} else if (stype == "visitc") {
			if (!bCarolCharmed) {
				md.write(
					'<p>Carol tells you that Ellie is in the lounge room, and steps aside as you enter the house. Before you have a chance to do anything else, she has already moved into another room and closes the door. "I just leave you two alone." You hear her comment from behind the door in a teasing voice.</p>' +
					'<p>Once again, you are surprised at the speed of the women of this family, what are they all? Hyperactive? You go to Ellie\'s room, and she greets you wearing little more than a rather sexy corset.</p>'
				);
			}
		// Visiting at another time
		} else if (clvE == 4) {
			md.write(
				'<p>You request to talk with your lover/slave in private for a bit, and Carol gives the two of you a knowing wink before she excuses herself into the Kitchen to prepare a snack.</p>' +
				'<p>Ellie opens the door to her room, obediently waiting for you to enter with her eyes still downcast, and locks it behind her.</p>' +
				'<p>You sit down on a nearby couch and watch her as she slips onto her knees again, both legs slightly spread and her arms resting on her tights, palms upward in a strangely specific looking way.</p>' +
				'<p"How may this slave be of service to you, ' + perYou.getMaster() + '?" She asks submissively, not daring to look at you directly.</p>'
			);
		} else {
			md.write(
				'<p>' + herName + ' is sitting on the lounge, and she is not wearing very much at all.</p>' +
				'<p>"Hello my love! I am really happy to see you again!!</p>'
			);
		}

		// Questions
		startQuestions();
		if (stype == "visitcb") addLinkToPlaceC(md, '"Would you interrupt your mother, I need to see her"', 420, 'type=interrupt');

		if (perYou.isMaleSex()) {
			addLinkToPlaceO(md, clvE == 4 ? 'fuck her' : 'fuck her', 422, 'type=fuck');
			addLinkToPlaceO(md, clvE == 4 ? 'have her serve you with her mouth' : 'fuck her mouth', 422, 'type=bj');
		} else {
			addLinkToPlaceO(md, clvE == 4 ? 'have her lick you' : 'have her lick you', 422, 'type=bj');
			addLinkToPlaceO(md, clvE == 4 ? 'make love to her' : 'make love to her', 422, 'type=fuck');
		}
		if (bCarolCharmed) {
			perEllie.addSleepLink(md, "go to bed for the night with Ellie", "Going to Bed with Ellie",
				'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">It is getting late and and Ellie suggests you spend the night, mentioning she prefers to sleep in the nude...',
				'ellie-bed.jpg'
			);
		}

	} else if (stype == "fuck") {
		// Fuck her
		if (!perYou.isMaleSex()) perEllie.showPerson("ellie19g.jpg");
		else if (isExplicit()) perEllie.showPersonRandomX("ellie30", 3);
		else perEllie.showPersonRandom("ellie30", 2);

		addPlaceTitle(md, herName);

		md.write(
			'<p>You fuck ' + herName + '</p>' +
			'<p></p>'
		);

		// Questions
		startQuestions();


	} else if (stype == "bj") {
		// Blowjob/Lick
		if (perYou.isMaleSex()) perEllie.showPersonRorX("ellie19b.jpg", "50vw");
		else perEllie.showPersonRorX("ellie19g.jpg", isExplicit() ? "50vw" : "");

		addPlaceTitle(md, herName);

		if (perYou.isMaleSex()) md.write('<p>' + herName + ' gives you a blowjob</p>');
		else md.write('<p>' + herName + ' licks you</p>');

		// Questions
		startQuestions();

	} else if (stype === "seecarol") {
		bWait = false;
		b2Cols = true;
		md.write('<table class="table-main"><tr><td>');
		addPlaceTitle(md, "Carol Visits", '', 0, true);
		perCarol.showPersonDN("carol1c.jpg", "60%", "center");
		perEllie.setFlag(4);
		md.write(
			'<p>Your ' + (clvE == 4 ? 'slave' : 'lover') + ' steps over to a door and asks, "Mom, do you have a moment to meet someone?"</p>' +
			'<p>Her mother Carol steps into the room a few minutes later, giving Ellie a smile as she takes a seat and stretching out with her legs up on a counter top. She looks at you with the broad smile that seems to be characteristic of the women of this family, well, that and a surprising turn of speed at times.</p>' +
			'<p>Carol says, "Well, it is the ' + perYou.getSex() + ' from the Bank, is it not? Are you and Ellie an item now? I hope so, her last boyfriend was creepy!”</p>'
		);
		if (clvE == 4) {
			md.write(
				'<p>Ellie exclaims, "Mom...what do you mean, my last boyfriend...? ' + perYou.getPersonName() + ' is not my lover, but my ' + perYou.getMaster() + '"</p>' +
				'<p>Carol lifts her eyebrows at at statement and just says "Kinky, I like!"</p>'
			);
		} else {
			md.write('<p>Ellie exclaims, "Mom... I... don\'t really like to think about my last Boyfriend, but I do love ' + perYou.getPersonName() + ' dearly, it was love at first sight."</p>');
			if (!perYou.isBornMale()) md.write('<p>Carol looks a little surprised, "Strange, my Ellie has never liked girls that way before, you must have a special way about you?</p>');
		}
		md.write('<p>Carol continues, "So tell me about yourself!"</p>');

		// Questions
		startQuestions();
		addLinkToPlaceC(md, 'talk about yourself', 422, '','You have a pleasant chat with Carol and after a while she apologies and tells you she has an appointment and has to leave, she smiles and leaves you and ' + herName + ' alone.');

	} else {
		// Charmed
		bWait = false;
		b2Cols = true;
		if (stype === "carol4") perCarol.showPersonRorXDN(stype + ".jpg");
		else if (stype === "carol5") perCarol.showPersonRorXDN(stype + ".jpg");
		else perCarol.showPersonDN(stype + ".jpg");
		addPlaceTitle(md, "Carol Under a Charm Spell");

		var sw = perYou.isMaleSex() ? "volkhov" : "vedma";

		if (stype === "carol2") {
			// Carol Charmed 1
			md.write(
				'<p>You tell Carol about your search for the Kurndorf book and the secrets of magic it contains, she smiles and tells you,</p>' +
				'<p>"You want to be be a ' + sw + ' from the old tales, a spinner of potions and spells, a talker to the vampir and wolf-skin\'s."<br>' +
				'She gently laughs, and continues in amusement, "So my little ' + sw + ' what have you found?"</p>' +
				'<p>You tell her "Here is one thing" and recite the charm spell, the sudden rush of mana entering her body taking Carol completely of guard. "Strange words those..."</p>' +
				'<p>She stands and stretches, her breasts slipping out of her tight top, she pays no attention as the spell work itself into her mind, looking around for a moment before she comments,</p>' +
				'<p>"So strange, like Svarog is here...it is so hot and I feel the pounding of his hammers...."</p>' +
				'<p>Carol grabs her short skirt and waves it around to cool her growing passions, but all she achieves is to show you her ' + (isDay() ? 'red' : 'black') + ' underwear.</p>'
			);

			// Questions
			startQuestions();
			addLinkToPlaceC(md, 'ask her "Who is Svarog"', 422, 'type=carol3');

		} else if (stype === "carol3") {
			// Carol Charmed 2
			md.write(
				'<p>You ask about the name Svarog. You think you have heard the name in mythology but cannot place it. Also, this helps to keep her mind off what is happening to her for a while.</p>' +
				'<p>"Svarog, the smith of the sky forge some say.", Her voice trails off and she continues speaking in some Slavic language until she realizes it and stops. You decide to take advantage of her confusion,</p>' +
				'<p>"If you are so hot, you should make yourself comfortable"</p>' +
				'<p>Carol removes her skirt and slides her top up further. You notice her ' + (isDay() ? 'red' : 'black') + ' panties start to slip down as well. She may have pulled them down as she removed her skirt, but your attention was focused at the time on her lovely breasts. Carol looks at you, a smile re-forming on her face,</p>' +
				'<p>"Naughty ' + sw + ' aren\'t you"</p>'
			);

			// Questions
			startQuestions();
			addLinkToPlaceC(md, 'answer "Yes I am a ' + sw + '"', 422, 'type=carol4');

		} else if (stype === "carol4") {
			// Carol Charmed 3
			perCarol.charmThem(2);
			md.write(
				'<p>You tell her "Yes I am a ' + sw + ', and you are under my spell"</p>' +
				'<p>Carol laughs, "Yes, I am enchanted by you, naughty little ' + sw + '"</p>' +
				'<p>She is just playing along with a game but not realizing how close to the actual truth she is, so you continue to play along as well, speaking in a playful manner, but never straying from the absolute truth,</p>' +
				'<p>"You are ensorcelled by me!” You lay it on thick. “A slave to my spell! And you want to do something naughty for me now."</p>'
			);

			if (isExplicit()) md.write('<p>Carol removes her panties, and while she does, Ellie hands her mother a transparent plastic item. Svarog only knows how she got it so fast, but Carol eagerly puts it to her lips and you see it is a narrow dildo. Carol begins licking playfully with surprising experience, eager to delight and arouse you.</p>');
			else md.write('<p>Carol sits down and removes her panties, as she does Ellie rearranges a chair so Carol can put her legs up. Carol spreads her legs giving you a clear view of her pussy, touching it as you watch.</p>');

			md.write('<p>Carol asks "Naughty enough, little ' + sw + '</p>');

			// Questions
			startQuestions();
			addLinkToPlaceC(md, 'of course you answer "No"', 422, 'type=carol5');

		} else if (stype === "carol5") {
			// Carol Charmed 4
			md.write(
				'<p>"No!” Your voice booms. “My spell commands you to do more!"</p>' +
				'<p>Carol laughs gently at your true words, and it is difficult to say how much it is the spell which is controlling her, or the game she thinks she is playing. In some ways it does not matter as long as she does not stop playing, and the spell should ensure to make it that way.</p>'
			);

			if (isExplicit()) md.write('<p>Carol now uses the dildo to tease her pussy, but quickly begins to do more, pushing it into her feverishly to fuck herself until she finally cries out "I cum for my little ' + sw + '!"</p>');
			else md.write('<p>Carol plays more with per pussy and ass and after a while moves and actively starts masturbating herself. After a while she cries out "I cum for my little ' + sw + '!"</p>');

			md.write(
				'<p>“Yes!” You again lay on the ham. “Cum for me! Cum and the Spell will be completed to bind you to my will! And when it is, we will play these games more often!"</p>' +
				'<p>Once again speaking the truth within the game, Carol is finally driven over the edge with a loud scream and falls back to bask in the afterglow, her now pink eyes focus on you adoringly as she replies: "Yes, we should play again.” Once more giving you a broad smile.</p>'
			);

			// Questions
			startQuestions();
		}

	}

	if (wherePerson("Kristin") === 422) {
		if (checkPersonFlag("Kristin", 14)) addLinkToPlace(md, 'go and see Kristin and Carol', 420);
	} else if (!bCarolCharmed) {
		if (!perEllie.checkFlag(4)) addLinkToPlaceC(md, 'ask to see her mother, Carol', 422, 'type=seecarol');
	}
	if (bWait) {
		addLinkToPlaceO(md, 'wait for a while', 422);
		if (bCarolCharmed) addLinkToPlaceC(md, "talk more with Carol and Ellie", 420);
	}
	addLinkToPlace(md, 'leave the house', 5);

	if (b2Cols) {
		AddPeopleColumn();
		perEllie.showPerson("ellie17.jpg", "100%");
	}

	WritePlaceFooter(md);
}