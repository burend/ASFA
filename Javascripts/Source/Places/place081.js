// Place: Davy's Room
function LetHer81()
{
	movePerson("Ellie", 430);
	gotoPlace(81);
	WriteComments("She quickly dresses and leaves the room");
}

function ShowPlace81(stype)
{
	var md = WritePlaceHeader(false, stype == "oral" && (perYou.isMaleSex() || (!perYou.isMaleSex() && isExplicit())) ? "td-left-med" : "");

	var perE = findPerson("Ellie");
	var herName = perE.getPersonName();
	var clv = perE.getCharmedLevel();

	setPlaceKnown("DavysRoom"); //Have been into Davy's Room

	if (stype === "oral") {
		if (perYou.isMaleSex()) perE.showPersonRorX("ellie19b.jpg");
		else perE.showPersonRorX("ellie19g.jpg");
		if (clv == 4) addPlaceTitle(md, herName + ' Showing Her Devotion');
		else addPlaceTitle(md, herName + ' Showing Her Love');
		perE.place = 422;
		if (clv == 4) {
			// Slave
			md.write(
				'<p>You order your new slave to show her obedience and devotion. Ellie looks at you, unsure what you mean, but smiles as you remove your clothing and sit down on the bed.</p>'
			);
			if (perYou.isBornMale()) {
				md.write(
					'<p>She kneels and takes over, pulling down your underwear and taking your cock and balls into her hands. She starts to lick along the entire length of your shaft, and you can tell she is no novice but also not all too practiced ether. Still, she is talented enough, and shows her somewhat playful nature as she pleases you.</p>' +
					'<p>You decide to enforce your dominance of her a little more, and while she is licking the head of your cock you firmly grasp her hair and make it clear she is to go deeper, as deep as she can. She tries to accommodate you, but she has definitely not done this before.</p>' +
					'<p>She manages to get a bit over half your length into her mouth and throat before you call out "Now swallow, Slave!" and cum into her throat. She gags a little, but manages to keep most of it inside, swallowing obediently and looking up at you, the smile returning to her face.</p>'
				);
			} else {
				md.write(
					'<p>She looks at you uncertain, hesitating until you reinforce your order and she finally kneels before the bed to nervously lick your pussy.</p>' +
					'<p>Well, at least for about 5 seconds, before she backs away and lowers her head in shame. “Y..your slave apologizes, mistress. But she is not a lesbian.... she can\'t do that.</p>' +
					'<p>Well, that was unexpected, you reach down and lift her chin to check her eyes, but she is clearly under your spell, you can feel your mana flowing through her body and see the pink shine in her eyes.</p>' +
					'<p>“Slave Ellie.” You speak firmly. You will do as you are told, and not question my orders.</p>' +
					'<p>The pink glow flares up and again, her head moves forward, but to your amazement, she again resists.</p>' +
					'<p>“I... your slave really can\'t do this, mistress... It.... does not feel right...” Her head slumps down again” Sorry, mistress.”</p>' +
					'<p>So, even with the spell in full effect, she has enough willpower to deny certain orders... you admit you are somewhat impressed, and decide to relent until you know more about this, telling her that she will not be required to serve you like this... for now.</p>'
				);
			}
			md.write(
				'<p>"Slave, return to your home, I will visit you then when I want."</p>' +
				'<p>Ellie smiles and quickly puts on some of her clothing and leaves the room. She makes sure you get a good view of her as she dresses.</p>'
			);

		} else {
			md.write(
				'<p>You move to make her lie down on the bed, but as you try to press your body against hers, she suddenly recoils from your touch.</p>' +
				'<p>"Ouugh I... just had a horrible vision of someone else...not you..."</p>' +
				'<p>You realize she still has some memories of Davy and suggest delaying this for a while, but she shakes her head.</p>' +
				'<p>"N...no, It\'s fine. Let me show you my love another way, instead."</p>' +
				'<p>She asks you to sit down and kneels before you, reaching out with both hands to open your pants, but once again recoils after a few seconds, looking both confused and embarrassed.</p>' +
				'<p>“Come to think of it, Tina and Mrs. Robbins might hear us.” You finally interrupt her, realizing that she might still be fighting both your charm and the memories of her time as Davy\'s slave in her subconsciousness.“ We might be taking this too fast, anyway, '
			);
			if (!perYou.isBornMale()) md.write('and you didn\'t even know you could fall for another woman until now, ');
			md.write(
				' so we better give it some time.</p>' +
				'<p>Ellie still looks a little embarrassed, but also relieved, and quickly nods. You tell her that it\'s best if she returns home now and that you will meet her later.</p>' +
				'<p>Ellie smiles and quickly puts on some of her clothing, making sure you get a good view of her as she dresses. She kisses your cheek and waves goodbye as she leaves the room.</p>'
			);

		}

		startQuestions();

	} else if (stype === "returnhome") {
		perE.showPerson("ellie20.jpg");
		addPlaceTitle(md, herName + ' Returns Home');
		perE.place = 422;
		if (clv == 4) {
			md.write(
				'<p>You decide that it is time to leave here, and order your slave to return home and wait for you there. She stands and you see her there naked before the window and she says,</p>' +
				'<p>"Yes ' + perYou.getMaster() + ' this slave will return to her home, and await your presence"</p>' +
				'<p>She starts to walk out, ignoring her clothing, and you tell her that she should get dressed. She smiles "Of course ' + perYou.getMaster() + '", and dresses. You sense something of her normal self shining through the slave personna, or is it act?. She finishes dressing and with a longing glance she leaves the room.</p>'
			);
		} else {
			md.write(
				'<p>You tell Ellie not here in Davy\'s room and she agrees that she should return home and wait for you there.</p>' +
				'<p>She stands and you see her there naked before the window smiling at you and she says,</p>' +
				'<p>"' + perYou.getPersonName() + ' I really should get dressed before I leave."</p>' +
				'<p>She turns around a little giving you a good show and then dresses quickly. She gives you a kiss on the cheek and waves goodbye as she leaves the room.</p>'
			);
		}
		startQuestions();

	} else if (perE.place !== 81) {
		// No one here
		addPlaceTitle(md, "Davy's Room", "bedroom6.jpg");
		if (stype == "teleport") md.write("<p>The pass spell transfers you into Davy Robbins\' room. ");
		else md.write('<p>You slip into Davy Robbins\' room. ');
		md.write('There\'s a mess everywhere: games, clothes and papers clutter the tiny room, making it very difficult to move around.</p><p>There are a few posters on the wall and inside a cupboard, you guess Davy has a taste for hard rock and metal music across a wide range of periods. A poster for Meatloaf\'s "Bat Out of Hell II" is on the wall. as is one for "Metallica" and a little known parody band "Barbarion".</p>');
		if (checkPlaceFlag("RobbinsHouse", 8)) {
			md.write('<p>In the far corner you see a laptop');
			if (isSpellKnown("Teleport")) md.write(' but you have already found everything useful in it');
			md.write('.</p>');
		}
		// Questions
		startQuestions();

		if (!checkPlaceFlag("RobbinsHouse", 8)) addQuestionR(md, 'search the mess', 'You search through the mess and you find buried an old model laptop.', 'Search the Room', "setPlaceFlag(\\'RobbinsHouse\\', 8);");
		else if (!isSpellKnown("Teleport")) {
			if (isPuzzles()) addLinkToPlace(md, 'check the laptop', 80);
			else addLinkToPlace(md, 'check the laptop', 80, 'type=right', 'You remember one time at school Davy mentioned something about passwords, so you enter what he had mentioned');
		}

	} else {
		// Ellie is here (and under Davy's comtrol)
		if (stype === "") stype = "ellie10a";

		perE.showPerson(stype + ".jpg");

		if (stype === "ellie10a") {
			// Davy's room and Ellie is charmed
			addPlaceTitle(md, herName + ' in Davy\' Robbins Room');
			md.write(
				'There\'s a mess everywhere: games, clothes and papers clutter the tiny room, making it very difficult to move around.</p><p>There are a few posters on the wall and inside a cupboard, you guess Davy has a taste for hard rock and metal music across a wide range of periods. A poster for Meatloaf\'s "Bat Out of Hell II" is on the wall. as is one for "Metallica" and a little known parody band "Barbarion".</p>' +
				'<p>You see Ellie is relaxing on Davy\'s bed, wearing sheer pale blue lingerie, her clothes neatly pile on a chair nearby.</p>'
			);
			if (!isInvisible()) {
				md.write('<p>She looks at you curiously, "Why are you here?", and she looks thoughtful for a moment. She reaches over to the bedside table and picks up her phone and starts looking for something in the phone, an image you think.</p>');
				startQuestions();
				addLinkToPlace(md, 'Look over her shoulder at the phone', 81, 'type=ellie10c');
			} else {
				// Questions
				startQuestions();
			}
		} else if (stype === "ellie10c") {
			// Davy's room and Ellie is charmed - clobbered
			perE.place = 430;
			addPlaceTitle(md, herName + ' in Davy\' Robbins Room');
			md.write(
				'<p>You see the image in her phone: it\'s a picture of you, and you have about a second to wonder why before Ellie swings the phone around with surprising force and speed, striking you in the side of your head.</p>' +
				'<p>You collapse, a dazed thought flits though your head about how fast she is while Ellie stands over you, a troubled look on her face while she reaches for a baseball bat.</p>' +
				'<p>"I know what he told me to do if I meet you... and I would do anything for love, I\'d run right into hell and back...”</p>' +
				'<p>She begins to recite the words and tears well in her eyes as she lifts the bat, and while your vision is blurry, you can see her hands shaking.</p>' +
				'<p><i>“I would do anything for... love...”</i> She pauses.<i>“but I... won\'t do... do that...”</i> She stumbles back, clenching her forehead as if in pain and the baseball bat falls out of her hands. “I do not know why he hates you so much, but I can\'t... his mother can deal with you!</p>' +
				'<p>She gives you a firm kick into the stomach and as you are taken by a mix of pain and nausea, you are once again surprised by the force this sweet looking woman is able to muster. When you finally get back on your feet, she is already gone.</p>'
			);

			startQuestions();
			if (!perYou.isBornMale() && isCharmedBy("MrsRobbins", "Davy")) addLinkToPlace(md, 'You wake sometime later', 82, '', '', '', 'setPlaceFlag("RobbinsHouse", 9, false);');
			else addLinkToPlace(md, 'You wake sometime later', 43);
			WritePlaceFooter(md);
			return;

		} else if (stype === "ellie10b") {
			// Used silver ring
			addPlaceTitle(md, herName + ' in Davy\' Robbins Room');

			md.write(
				'<p>The ring glows as you clasp it in your fist and focus on the mana powering the charm over Ellie, absorbing it within moments.</p>' +
				'<p>Ellie looks startled, scanning the room in confusion.</p>' +
				'<p>"Where am I...? And Why am I dressed like this?"</p>' +
				'<p>When she finally notices you, her eyes widen in shock. "Who are you, didn\'t we meet somewhere... recently? “ It seems the memory slowly catches up with her and tears begin to form.” Oh no... This room... Davy... !”</p>' +
				'<p>She picks up her phone from a side table and looks at you "I\'m sorry, but I need to go see Kristin, need to find out what happened... and why I\'m even here.</p>'
			);
			AddMana(5);
			perE.unCharmThem();	// Ellie freed from Davy's control

			// Questions
			startQuestions();
			addOptionLink(md, 'Let her leave', 'LetHer81()');

		} else {
			// Charmed
			addPlaceTitle(md, herName + ' Under a Charm Spell');

			if (stype === "ellie11") {
				// Ellie Charmed 1
				md.write(
					'<p>You recite the words of the spell and Ellie looks at you in surprise,</p>' +
					'<p>"I know those words, they are from a song Davy sung for me... but they make me feel..."</p>' +
					'<p>Her words trail off as the spell works itself into her mind and body again. She turns away from you, deep in thought with a soft sigh coming from her. The bank teller gives you a lovely view of her assets as she does so.</p>' +
					'<p>You are a little torn here, she is troubled by her time under Davy\'s influence and now you are doing the same to her. You ' + (perYou.checkFlag(26) ? 'can' : 'could') + ' make her your obedient little slave as Davy did, she is very cute and will be a delightful plaything.' + (perYou.checkFlag(26) ? 'You could also be gentler and convince her she has fallen in love with you dramatically, she will not be as obedient, but still yours and protected from Davy. It depends on what you want.' : '') + '</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'enslave Ellie', 81, 'type=ellie12', '', '', "charmPerson('Ellie',4);");
				if (perYou.checkFlag(26)) addLinkToPlace(md, 'charm Ellie', 81, 'type=ellie12', '', '', "charmPerson('Ellie',2);");

			} else if (stype === "ellie12") {
				// Ellie Charmed 2
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>You firmly tell Ellie "Forget about the song, it does not matter to you, all you need to do it listen to me and do what I ask you"</p>' +
						'<p>She turns to look at you surprised, her hands covering herself as she replies,</p>' +
						'<p>"What do you mean, what <b>are</b> you asking me to do?"</p>' +
						'<p>You reply firmly "It does not matter what, you just want to do anything I ask, don\'t you?"</p>' +
						'<p>Your words almost pound into her and for a moment her ever present smile fades, she then hesitantly says,</p>' +
						'<p>"I do...not...think I barely know you...you are ' + perYou.getPersonName() + ' right..."</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, 'Ask her to strip', 81, 'type=ellie13');

				} else {
					// Lover
					md.write(
						'<p>You speak to her and she turns to face you, her hands covering herself as best she can. "Ellie, you should not worry about that song, but I can see how you are looking at me. Do you actually like me?"</p>' +
						'<p>Ellie looks at you curiously, "Well...I am feeling a bit odd...'
					);
					if (perYou.isBornMale()) md.write('but yes you are handsome');
					else md.write('and yes, you are beautiful... but I am not really into girls');
					md.write(
						'..."</p><p>She looks at you more closely, and as the idea of you as a potential lover sinks into her mind, you reinforce it,</p>' +
						'<p>"You are a very cute girl and I did not come here expecting you to <b>fall in love with me</b>, I mean love at first sight is something for romance novels"</p>' +
						'<p>She hesitates as you words sink in more, pulling in her lower lip before she replies, "Love at first sight..." and you see a blush pass across her face, or maybe a flush of arousal.</p>'
					);
					if (!perYou.isBornMale()) md.write('<p>“N... no.” She suddenly shakes her head. “I may have two mothers, and I really believe that you should love whoever you want... but I\'m only into guys.</p>');

					startQuestions();
					addLinkToPlace(md, 'Increase her desire', 81, 'type=ellie13');
				}

			} else if (stype === "ellie13") {
				// Ellie Charmed 3
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>Ellie looks surprised and involuntarily starts to remove the lingerie she is wearing, only stopping herself briefly with her remaining willpower,</p>' +
						'<p>"No, I don\'t think so, I barely know you ' + perYou.getPersonName() + '"</p>' +
						'<p>You focus on the magical link between you and Ellie, forcing your will on her and reply simply,</p>' +
						'<p>"You do not have to worry about these things, or think about anything other than obeying me, and you should not call me ' + perYou.getPersonName() + '"</p>' +
						'<p>She looks confused, the spell slowly taking its toll, "Why... what should I call you?"</p>'
					);

					startQuestions();
					addLinkToPlace(md, 'You tell her: "' + perYou.getMaster() + '"', 81, 'type=ellie14');

				} else {
					// Lover
					md.write(
						'<p>You focus on her and the magical link between you and Ellie, willing her to desire you more and more. '
					);
					if (perYou.isBornMale()) md.write('“I feel like there is a connection between you and me, is there?”');
					else md.write(' “But if we are supposed to love whoever we want, can we really afford to not take a chance to find love because of our gender?”');
					md.write(
						'</p><p>She contemplates your words briefly, then looks at you smiling,</p>' +
						'<p>"It is so strange how attractive you are. Well, do you like me too?"</p>' +
						'<p>She starts to tease you, moving as if to remove her lingerie and not quite remembering how little she really has on. Once again she shows you her firm and round bottom as she looks back you expectantly.</p>' +
						'<p>There is only one real answer to her question, even if you do not really mean it, yet..</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"Yes, and I love you"', 81, 'type=ellie14');
				}

			} else if (stype === "ellie14") {
				// Ellie Charmed 4
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>She looks troubled, "' + perYou.getMaster() + ' that\'s not right! That would mean I was some sort of servant...!"</p>' +
						'<p>You reply firmly,</p>' +
						'<p>"No, that means you are my slave, who will obey me, doing anything I ask, at anytime.<br>' +
						'And now, my slave, you will strip!"</p>' +
						'<p>She almost tears off her lingerie at your order, but still maintains some tiny measure of control, she almost whispers,</p>' +
						'<p>"I wont\'t...I can\'t do some things, I know there was something I had to do, but I can\'t...hurt..."</p>' +
						'<p>You see how troubled she is about some orders Davy had given her before, and how there are some limits of what she will do, no matter what you say. You relent a little,</p>' +
						'<p>"I will never order you to harm another, that is not what I want from you as my slave. Obey me and only think of what I desire and my pleasure, and you will be happy as the slave you are."</p>' +
						'<p>She looks at you nervously, but your assurance seems to put her somewhat at ease as the spell washes away the last traces of doubt and resistance, a blissful smile forming on her lips "Yes, ' + perYou.getMaster() + '"</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"Prove your obedience"', 81, 'type=ellie15');

				} else {
					// Lover
					md.write(
						'<p>Ellie looks radiantly happy to hear this and  quickly replies "I love you too!"</p>' +
						'<p>Ellie smiles then and mostly removes her lingerie, just holding it in front of herself to cover her breasts and groin. She looks at you, the arousal from the magic spell still working itself on her.</p>' +
						'<p>"Do you want more, my love?"</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"Yes, I do"', 81, 'type=ellie15');

				}

			} else if (stype === "ellie15") {
				// Ellie Charmed 5
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>Ellie drops the lingerie she was wearing and kneels there before you, naked and beautiful with a wide smile on her lips,</p>' +
						'<p>' + perYou.getMaster() + ' what can you slave do to prove her devotion?"</p>' +
						'<p>You are a little surprised, and pleased, at the way she addresses you. She seems to have completely adopted a slave attitude, referring to herself as a slave and not by name. You can see she is yours now, to do anything you like, as long as you do not cross a certain line and ever ask her to harm another person.</p>' +
						'<p>You look at your smiling slave and decide how to proceed,</p>'
					);

					startQuestions();
					addLinkToPlace(md, 'Dominate her more', 81, 'type=oral');
					addLinkToPlaceC(md, 'Tell her to return to her home and wait for you there', 81, 'type=returnhome');

				} else {
					// Lover
					md.write(
						'<p>Playfully Ellie throws away her lingerie and sits there before you, completely naked in all her Beauty, and as you admire her body she smiles at you.</p>' +
						'<p>She leans in and kisses you, but while you can feel the force of the spell still coursing though her and reinforcing her feelings, the actual kiss is brief and still hesitant.</p>'
					);
					if (perYou.isBornMale()) md.write('“I can\'t believe how quick I fell for you, my love...”');
					else md.write('“I\'m actually in love with another woman...”');
					md.write(
						'<p>She whispers as she breaks the kiss and looks deeply into your eyes, desire and love filling her expression,</p>' +
						'<p>Shall we...here?</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"I need you now"', 81, 'type=oral');
					addLinkToPlaceC(md, '"Not here, meet me at your home"', 81, 'type=returnhome');

				}
			}
		}
	}

	// Common Questions
	if (!isCharmedBy("MrsRobbins", "You")) addTextForQuestions(md, "<b>as you are breaking in, leaving through the house is a bad idea</b>", "center");
	addLinkToPlace(md, isCharmedBy("MrsRobbins", "You") ? 'leave Davy\'s room' : 'run out of the house!', 176);

	WritePlaceFooter(md);
}