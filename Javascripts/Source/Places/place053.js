// Place: Hidden Room

function ShowPlace53(stype)
{
	var md = WritePlaceHeader(false, stype == "look" ? "" : "td-left-med");

	var perMonique = findPerson("Monique");
	var perAbby = findPerson("Abby");
	var perLeanne = findPerson("Leanne");
	var perVamp = findPerson("Vampyre");

	if (stype == "look") {
		// Looking in the mirror
		addPlaceTitle(md, "Looking in the Mirror", "mirror.jpg");
		md.write('<p>You look in the mirrors and for a moment you do not even see your own reflection, but you realise it is just a matter of angles. You see your own reflection');
		var cor = perYou.getCorruption();
		if (cor < 5) md.write(' and it is clear and bright despite the dark colouring of the mirrors');
		else if (cor < 10) md.write(' and it is little odd, slightly distorted, the mirrors must have an imperfect surface');
		else if (cor < 20) md.write(' and it is distorted with an odd sort of faint double image, almost like there is someone standing behind you');
		else md.write(' and it is distorted with an odd double image, it looks almost like the ghostly image you have seen of Kurndorf');
		md.write(
			'.</p><p>For no reason you understand a number suddenly comes to mind, ' + cor + ', but just as quickly it fades and you can barely remember it.</p>' +
			'<p>You also get an impression of energy in yourself and a number of ' + perYou.getExperience() + ' and a building feeling and another number ' + (perYou.other - perYou.extra[11]) + '. You have no idea what this means, maybe something related to your magical abilities?</p>' +
			'<p>You look away a little bit creeped out. As you do you swear you saw the statue twist and look at you, but you quickly look and it is fixed in the same place as always, still <b>not reflecting</b> in the mirrors.</p>'
		);
		startQuestions();
		addLinkToPlace(md, 'look away', 53);

	} else if (stype == "movegem") {

		// Abby placing the Dragon Gem in the statue
		addPlaceTitle(md, "Moving the Dragon Gem", "hiddenroom1b.jpg");
		moveItem(35, -53);

		md.write(
			'<p>You realise that since Abby can carry the Dragon Gem then you can move it from the Mechanics Workshop. You have seen how the gem is shaped to fit into a socket and that the dragon statue in the hidden room in the alley has eye sockets around the right size to fit the gem. You ask Abby if she will come with you to move the gem and see if it fits in the statue. She says happily,</p>' +
			'<p>"Of course, but there is only one gem, so the Dragon will not awaken! By the way, did you hear about Sally Bartel..."</p>' +
			'<p>She continues on gossiping about townsfolk and an affair she heard rumours about. It is hard to really focus on what Abby says as she talks about everything, and jumps from person to news story to jokes all the time.</p>' +
			'<p>You leave with Abby following, naked as always, and quickly walk to the Mechanics Workshop where Abby casually picks up the gem, again not noticing the extreme heat of the gem, treating it as any other stone. Hannah watches curiously, but you do not have time to satisfy her curiosity, and you leave with Abby and walk to the alley.</p>' +
			'<p>You enter the hidden room with Abby and she approaches the statue with a little hesitation, she is visibly frightened. She reaches out with the gem towards the nearest eye-socket. She is acting like she is reaching out to a lion, expecting it to bite her hand off or something. With an audible click the gem seats securely into the eye-socket and Abby leaps backward.</p>' +
			'<p>The gem sits there, softly glowing, and for a moment you thought you saw something in one of the mirrors, but when you look more closely, nothing is there. Abby asks if she can leave now, still very frightened. You allow her to leave and you see her walk out of the room, completely naked as always. Just before she leaves she says,</p>' +
			'<p>"The claws of the Dragon are meant to hold something, but it will not be me. I heard they can rip your soul out of your body!"</p>' +
			'<p>After she leaves you can feel the room has changed, power infuses the room...</p>'
		);
		startQuestions();

	} else if (stype == "checkstatue") {

		// Abby placing the Dragon Gem in the statue
		addPlaceTitle(md, "Checking the Dragon Statue", "hiddenroom1a.jpg");
		setPlaceFlag("Alley", 8);

		md.write(
			'<p>You tell Abby about the Dragon statue in the Hidden Room and how she has talked about the legendary dragon, and that the statue seems to be an asian style dragon. You ask Abby if she will come with you to examine the statue and see if she can work out anything more about the statue. She says happily,</p>' +
			'<p>"Of course, but you know that gem at the Mechanics looks like a dragons eye? By the way, did you hear that Tess Adams is having an affair..."</p>' +
			'<p>She continues on gossiping about townsfolk and an affair too close for comfort. It is hard to really focus on what Abby says as she talks about everything, and jumps from person to news story to jokes all the time.</p>' +
			'<p>You leave with Abby following, naked as always, and quickly walk to the Hidden Room. Immediately she looks rather afraid,</p>' +
			'<p>"The Dragon...the eyes of the Dragon are empty, they have been plucked out to make it sleep. But it is horrible, a thing to devour your soul!"</p>' +
			'<p>She is rather afraid and you decide to let her leave, and she almost runs out of the Hidden Room. After she leaves you can clearly see the eyes of the statue are sockets intended to put something into.</p>'
		);
		startQuestions();

	} else if (stype == "teleportthrall" || stype == "vampabduct") {
		if (stype !== "vampabduct") {
			AddMana(-1);
			setPersonOther("Daria", nTime, 1);
		}
		if (isDemonGone()) {
			// Demon has left town with the relic
			perLeanne.moveThem(450);
			addPlaceImage(md, "hiddenroom1b.jpg");
			perLeanne.showPerson("leanne6e.jpg");
			addPlaceTitle(md, "Freeing the Thrall");
			md.write(
				'<p>You tell the thrall that you are going to free her from the church, they you will take her away from here,</p>' +
				'<p>"Yes, I will reward you to our pleasure.", she tells you seductively.</p>' +
				'<p>You cast the spell and you teleport with the thrall into the Hidden Room. As you appear she looks around curiously, and then with suspicion at the statue. You tell her,</p>' +
				'<p>"Leave here, your former Mistress is gone, she has abandoned you. You promised to reward me, go somewhere, I will find you, until then do nothing, you must reward me first!". She looks at you and replies,</p>' +
				'<p>"Of course, this thrall knows the demon has left, this thrall is of no use any more. What is a thrall with no Mistress?", and she leaves the Hidden Room.</p>'
			);

		} else if (perYourBody.FindItem(48) === 0) {
			// Here but without the relic
			perLeanne.moveThem(450);
			addPlaceImage(md, "hiddenroom1b.jpg");
			perLeanne.showPerson("leanne6e.jpg");
			addPlaceTitle(md, "Attempting the Ritual of Return");
			md.write(
				'<p>You tell the thrall that you are going to free her from the church, they you will take her away from here,</p>' +
				'<p>"Yes, I will reward you to our pleasure.", she tells you seductively.</p>' +
				'<p>You cast the spell and you teleport with the thrall into the Hidden Room. As you appear she looks around curiously, and then with suspicion at the statue. You quickly start to prepare for the ritual, but you realise you do not have the relic with the demon bound into it. The thrall laughs,</p>' +
				'<p>"Foolish ' + perYou.getWitch() + '!", and she runs out of the door into the alleyway. You try to follow but she is very fast and quick gets out of your sight.</p>' +
				'<p>Well, you have messed up, where would the thrall go, back to the graveyard, or somewhere else?</p>'
			);

		} else {
			// Here with the relic, it is locked here (for now)
			perYourBody.DropItem(48, -53);
			perLeanne.moveThem(53);
			perLeanne.unCharmThem();
			addPlaceImage(md, "hiddenroom1d.jpg");
			perLeanne.showPerson("leanne6e.jpg");
			if (stype == "vampabduct") {
				addPlaceTitle(md, "The Vampyre and The Ritual of Return");
				md.write(
					'<p>You tell the vampyre to go inside Leanne\'s house and grab the thrall. For a moment she looks at you with distaste and then in a blur of inhuman speed the vampyre enters the house and has embraced the thrall from behind, holding her securely, and somewhat sensually. You follow and see the thrall looking perplexed,,</p>' +
					'<p>"This is not necessary, this body is yours, or that of your undead slave, though it is unlikely she will feed on this body". The vampyre looks a little disgusted,</p>' +
					'<p>"This body is tainted, I will not feed on her. Do you want this thing slain ' + perYou.getMaster() + '?"</p>' +
					'<p>You tell here to bring the thrall with you, and you leave Leanne\'s house and quickly cross the town to the Hidden Room. The thrall makes no effort to struggle initially, but as you get near to the alley she starts to try to break free, pointlessly. The vampyre has her securely held with overwhelming strength. Fortunately it is night time and few people around to notice your odd little group.</p>' +
					'<p>In the Hidden Room you tell the vampyre to keep the thrall held but unharmed. You quickly start to prepare for the ritual, and you hang the relic on claws of the statue, the only place it will easily fit. The thrall starts to speak, but the relic glows as you also start to recite the words Ms. Jones taught you. As you do the thrall seems to freeze, and you see an eerie image form in one of the mirrors. A ghostly figure that is only visible in the mirror, an indistinct female figure, it has to be Leanne!</p>' +
					'<p>You call out the last of the words and the thrall lets out a muffled cry, and slumps in the vampyre\'s arms and vomits. After a short vomit she looks up,</p>' +
					'<p>"' + perYou.getPersonName() + ' I am free, you saved me, thank you, thank you!"</p>' +
					'<p>You tell the vampyre to release Leanne and then ask Leanne how she is feeling and what she remembers,'
				);
			} else {
				addPlaceTitle(md, "The Ritual of Return");
				md.write(
					'<p>You tell the thrall that you are going to free her from the church, they you will take her away from here,</p>' +
					'<p>"Yes, I will reward you to our pleasure.", she tells you seductively as she throws on something simple.</p>' +
					'<p>You cast the spell and you teleport with the thrall into the Hidden Room. As you appear she looks around curiously, and then with suspicion at the statue.</p>' +
					'<p>You quickly start to prepare for the ritual, and you hang the relic on claws of the statue, the only place it will easily fit. The thrall starts to speak, but the relic glows as you also start to recite the words Ms. Jones taught you. As you do the thrall seems to freeze, and you see an eerie image form in one of the mirrors. A ghostly figure that is only visible in the mirror, an indistinct female figure, it has to be Leanne!</p>' +
					'<p>You call out the last of the words and the thrall lets out a muffled cry, and slumps to the ground and vomits. After a short vomit she looks up,</p>' +
					'<p>"' + perYou.getPersonName() + ' I am free, you saved me, thank you, thank you!"</p>' +
					'<p>You ask how she is feeling and what she remembers,'
				);
			}
			if (perLeanne.hadSexYourself()) md.write(' especially how you had had sex with her when she was the thrall,');
			md.write(
				'<p>"I remember everything...it is like I was asleep but when I woke up I could remember this very vivid dream, but I know it was real, just not what I was doing...'
			);
			if (perLeanne.hadSexYourself()) {
				md.write(
					'I remember what you did with <i>her</i> very clearly."</p>' +
					'<p>She looks at you very embarrassed, and continues,</p>' +
					'<p>"We will never speak of it."</p>'

				);
			} else md.write('"</p>');
			md.write('<p>You tell Leanne it would be best if she return home and clean up and that you will visit her later.');
			if (perLeanne.hadSexYourself()) md.write(' She blushes and agrees.</p>');
			else md.write(' She agrees readily.</p>');
			perYou.completeQuest(5);
		}

	} else {

		// General visits
		setPlaceKnown("HiddenRoom"); // Have entered the Secret Room
		var img = whereItem(35) == -53 ? (whereItem(48) == -53 ? "hiddenroom1c.jpg" : "hiddenroom1b.jpg") : "hiddenroom1a.jpg";
		addPlaceImage(md, img, "", "", "Hidden Room");
		if (perMonique.isHere()) {
			// Monique is here (Hellgate Path)
			perMonique.showPersonFace();
		}

		// **** Description ****
		addPlaceTitle(md, "Hidden Room");
		md.write('<p>You enter a strange room with an unusual asian style dragon sculpture perched upon a pedestal. ');
		if (whereItem(35) == -53) md.write('One of the eyes of the statue is filled with the dragon gem, the other is empty.');
		else md.write('You notice the eyes of the statue are empty sockets.');
		md.write(' Lining the walls are large tinted mirrors that reflect the room darkly. ');
		if (checkPersonFlag("Victoria", 9) || perVamp.checkFlag(2)) md.write('You now know these are called the \'Mirrors of the Soul\'. ');
		md.write('To your great discomfort you see the sculpture <b>does not reflect</b> in any of the mirrors.</p>');
		if (!checkPlaceFlag("Alley", 8)) md.write('<p>You have a feeling there is something in the room, odd reflections in the mirrors and shifting shadows. Whatever it is you can never quite see it.</p>');
		else md.write('<p>There are still odd reflections and shifting shadows, but you can now see they are all centered on the statue in some way.</p>');
		if (!isSpellKnown("Charm")) {
			// Don't Know Charm Spell Yet
			md.write('As you examine the room you see a note scribbled onto the frame of one of the mirrors.</p>');
		}

		if (perMonique.isHere()) {
			// Monique is here
			md.write('<p>Monique greets you. "I can\'t find any magic ' + perYou.getMaster() + '. Please forgive me."');
		}

		// **** Choices ****

		startQuestions();
		addLinkToPlace(md, 'look in the mirrors', 53, 'type=look');

		if (!isSpellKnown("Charm")) {
			// Don't Know Charm Spell Yet
			if (isRunes()) addOptionLink(md, 'examine the note', "Research(\'Spell\', \'DaiChu\');");
			else {
				md.write(
					'<p style="text-align:center">What are the strange words in the note?<br>' +
					'<form method="POST" name="FormChar" style="text-align:center"><input type="text" size="20" name="research"> <input type="button" name="button" value="enter" onClick=ResearchOLD(\"H\",document.FormChar.research.value)></form></p>'
				);
			}
		}
		if (perMonique.isHere()) addQuestionCO(md, 'tell Monique to look up the library files for Davy', "Monique", 1105);
	}
	if (whereItem(48) == -53) addOptionLink(md, "remove the relic", "perYourBody.PutItem(48);gotoPlace(53)");
	if (perLeanne.isHere()) addOptionLink(md, "say goodbye to Leanne for now", "movePerson('Leanne',450);gotoPlace(53)");
	addLinkToPlace(md, 'exit the room?', 52);

	if (stype == "movegem" || stype == "vampabduct" || stype == "checkstatue") {
		AddPeopleColumnMed(md);
		if (stype == "vampabduct") perVamp.showPerson("vamp1b.jpg");
		else perAbby.showPerson("abby11a.jpg");
	}

	WritePlaceFooter(md);
}