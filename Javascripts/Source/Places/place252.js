// Anita's Lair

function LeaveLair()
{
	// Anita flees town
	var perAnita = findPerson("Anita");
	perAnita.place = 9999;
}

function ShowPlace252(stype)
{
	var md = WritePlaceHeader();

	var perAnita = findPerson("Anita");
	var bCharmed = perAnita.isCharmedBy("You");
	var bNoShow = false;
	var myName = perYou.isBornMale() ? "Sir" : "Ma\'am";

	if (perAnita.place !== 252) {
		// Empty
		addPlaceTitle(md, "Empty Storeroom", "storage.jpg");

		md.write('<p>This is a disused storeroom, once Anita\'s Lair, she must have left here to go somewhere else. Assorted useless things are stored here and there.</p>');
		if (whereItem(47) == 252) md.write('<p>You see a sports bag left here, probably abandoned by Anita.</p>');

		startQuestions();
		addLinkToPlace(md, 'return to Ms Jones\' office', 145);

	} else if (stype == "deploy") {
		// Move her to your bedroom
		perAnita.showPerson("anita6.jpg");
		addPlaceTitle(md, "Anita\'s Deployment");

		perAnita.moveThem(45);
		md.write(
			'<p>You tell Anita that you have new orders for her, and she stands to attention. You walk around, inspecting her assets, and tell her,</p>' +
			'<p>"Soldier, I need you to redeploy as a guard for myself. Go to my home and wait for me in my bedroom, make sure to wear something appropriate. You will be undercover as my girlfriend, so wear something sexy."</p>' +
			'<p>You tell her your address and remind her to dress before leaving. She looks at you, and replies "Yes ' + myName + '!"</p>' +
			'<p>She quickly gathers some gear and dresses and leaves you with a salute.</p>'
		);

		bNoShow = true;
		startQuestions();
		addLinkToPlace(md, 'return to Ms Jones\' office', 145);

	} else if (stype == "freed") {
		// Freed via Silver Ring
		perAnita.showPerson("anita4.jpg");
		addPlaceTitle(md, "Anita\'s Lair");

		md.write(
			'<p>Anita looks puzzled, her clothes covering little of her body. She rests the shotgun on her shoulder and asks you,</p>' +
			'<p>"Who the hell are you, why have you brought me here! Did you drug me, is that why I feel this hatred towards you, despite I have never seen you before!"</p>' +
			'<p>You point out that <i>she</i> is the one with the weapon and put your hands up. She looks startled and seems to just then realise she is holding the shotgun, and continues talking,</p>' +
			'<p>"Well I guess you are right, I can see some of my gear around here too. I must have really, really got drunk last night!! So did we....you know...?"</p>'
		);

		bNoShow = true;
		startQuestions();
		addLinkToPlaceC(md, '"No, no I just found you here in this storeroom"', 145, '', '&quot;Well then, excuse me while I get dressed and get the hell out of here, I was only supposed to be in the town overnight, I need to get going&quot;<br>With that she kicks you out of the storeroom.', 'Anita', 'LeaveLair()');
		addLinkToPlace(md, 'return to Ms Jones\' office', 145, '', '', '', 'LeaveLair()');

	} else if (stype == "shotjump" || stype == "shotcharm") {
		perAnita.showPerson("anita1.jpg", "height:max");
		addPlaceTitle(md, "Shot!");

		if (stype == "shotjump") {
			md.write(
				'<p>You leap at Anita, with the idea of wrestling the gun from her in her confusion, but her expression immediately hardens at the threat. ' +
				'Anita immediately reacts, the shotgun swings up and there is a devastating roar as the blast hits you in the chest. You collapse, your life blood pouring from the wound.</p>'
			);

		} else {
			md.write(
				'<p>You read a spell.... but it nothing happens, she must already be under the effects of a charm spell.</p>' +
				'<p>Anita immediately reacts to your words, the shotgun swings up and there is a devastating roar as the blast hits you in the chest. You collapse, your life blood pouring from the wound.</p>'
			);

		}
		md.write(
			'<p>You can\'t believe that after all this play the ' +
			'game has ended this way. Your life ebbs away and all you can ' +
			'think of is revenge in the afterlife.</p>' +
			'<p>Better luck next time...</p>'
		);

		bNoShow = true;
		addRestartLink(md);

	} else if (stype === "" && !bCharmed) {
		perAnita.showPerson("anita3.jpg");
		addPlaceTitle(md, "Anita\'s Lair");

		if (whereItem(21) === 0 && perAnita.other < 900) {
			//Blue key hasn't appeared yet && Anita is still ALIVE
			PlaceI(21);
		}

		if (!isPlaceKnown("AnitasLair")) setPlaceKnown("AnitasLair"); // Anita's Lair now KNOWN

		md.write('<p>You catch Anita unawares, she was in the process of changing clothes. She awkwardly tries to cock the shotgun but seems to be confused about the weapon.</p>');
		if (whereItem(21) == Place) {
			//Blue key is HERE
			md.write('<p>Amidst her naive fumbling you notice the sparkle of a small blue key as it falls to the floor.</p>');
		}

		md.write('<p>You only have moments before she comes to her senses, what do you do?</p>');

		bNoShow = true;
		startQuestions();
		addLinkToPlace(md, 'jump her!', 252, 'type=shotjump');
		addLinkToPlace(md, 'return to Ms Jones\' office', 145, '', '', '', 'LeaveLair()');

	} else if (stype === "" && bCharmed) {
		perAnita.showPerson("anita8.jpg", "height:max");
		addPlaceTitle(md, "Anita\'s Lair");

		md.write('<p>Your slave Anita is waiting for you in the abandoned storeroom, ready for anything, but also completely naked</p>');

		if (whereItem(47) == 252) md.write('<p>You see an empty sports bag sitting on a dusty shelf.</p>');
		if (whereItem(21) == 252) md.write('<p>You see an odd key hanging on a hook, on it you see a small engraving of a pentagram.</p>');

		startQuestions();
		addLinkToPlaceC(md, 'order her "Prove your loyalty!"', 252, 'type=proveit');
		if (perAnita.checkFlag(7)) addLinkToPlaceC(md, 'redeploy her', 252, 'type=deploy');
		addLinkToPlace(md, 'return to Ms Jones\' office', 145);

	} else {
		// Charmed

		if (stype === "anita5") {
			// Anita Charmed 1
			perAnita.showPerson(stype + ".jpg");
			addPlaceTitle(md, "Anita Under <i>Your</i> Charm Spell");

			md.write(
				'<p>You tell her,<br>"No we did not <i>last night</i>" and she looks at you unsure why you stressed <i>last night</i>. She looks like she is about to ask you something, and you recite the words of the charm spell.</p>' +
				'<p>Anita looks startled, and swings the shotgun so it is ready, but she is not directly pointing it at you. She asks in an urgent manner,</p>' +
				'<p>"Did you hear that, I am sure I heard the word of command, but you are not my commander"</p>' +
				'<p>It would seem Anita here is a member of the military, but something there seems wrong, and you suspect she is more member of some sort of para-military group or militia, especially how she talked before. Still it does not matter at all what sort of unit or group she is with, your answer is the same,</p>' +
				'<p>"Yes I am a soldier! How dare you forget!"</p>' +
				'<p>She hesitates, but the power of the spell works itself through her mind, she stutters,</p>' +
				'<p>"' + myName + '...sorry...' + myName + '"</p>' +
				'<p>You look at her partially clothed body and smile, and order her,</p>' +
				'<p>"Don\'t forget again, for your punishment, remove your clothing, now!"</p>' +
				'<p>Anita hesitates, but the quickly removes her jacket and stands there before you, completely naked, holding her shotgun.</p>' +
				'<p>"Yes ' + myName + '"</p>' +
				'<p>You need to exert more control over her, especially as she is still armed.</p>'
			);

			// Questions
			bNoShow = true;
			startQuestions();
			addLinkToPlaceC(md, '"Put the weapon down!"', 252, 'type=anita6');

		} else if (stype === "anita6") {
			// Anita Charmed 2
			perAnita.showPerson(stype + ".jpg");
			addPlaceTitle(md, "Anita Under <i>Your</i> Charm Spell");

			md.write(
				'<p>You order Anita to put the shotgun down and she hesitates, you order her again, and she engages the safety, then carefully puts the shotgun down.</p>' +
				'<p>You think \'Good she is disarmed\', except you see her get something from a bag and when she stands up facing away from you, she is holding a pistol. While you appreciate the view of her from behind (and her behind) you again order her to disarm. She replies immediately,</p>' +
				'<p>"You cannot do that! No commander of mine would order me to be defenceless!"</p>' +
				'<p>You realise that this is an important point for her and decide not to press the matter, and tell her,</p>' +
				'<p>"Yes of course, I was just checking your dedication. You must obey my orders in every other way, no matter what I order you to do!"</p>' +
				'<p>Again without hesitation, she replies,</p>' +
				'<p>"I will do absolutely <i>anything</i> you order, <i>anything</i>, just order me"</p>'
			);

			// Questions
			bNoShow = true;
			startQuestions();
			addLinkToPlaceC(md, 'Order her "Prove it!"', 252, 'type=anita7');

		} else if (stype === "anita7" || stype == "proveit") {
			// Anita Charmed 3
			if (stype === "proveit") perAnita.setFlag(7);
			if (!isExplicit()) perAnita.showPerson("anita7.jpg", "50vw");
			else if (perYou.isMaleSex()) perAnita.showPersonRandomX("anita7b", 3);
			else perAnita.showPersonX("anita7g.jpg", "50vw");
			addPlaceTitle(md, "Anita\'s Proof");
			md.write('<p>For a moment you reconsider your order, given Anita\'s shown violence, but she drops to her knees ');
			if (perYou.isMaleSex()) {
				// Blowjob
				md.write(
					'and undoes your trousers and takes your stiff cock into her mouth. She proceeds to give you a skilled blowjob until you explode in her mouth. She swallows and then asks,</p>' +
					'<p>"Would ' + myName + ' now like my ass or pussy?"</p>' +
					'<p>You of course reply "Both!"</p>' +
					'<p>You sate yourself on your new subordinates body, and she also experiences considerable pleasure, both from the effects of the spell and also as she seems to very, very much like sex!</p>'
				);
			} else {
				// Cunnilingus
				md.write(
					'and undoes your pants and with a little hesitation licks your pussy. She is probably not experienced with a woman but still she makes you come quickly to a shuddering climax. She then asks,</p>' +
					'<p>"Would ' + myName + ' now like my ass or pussy or shall I prove myself again?"</p>' +
					'<p>You of course reply "All of them!"</p>' +
					'<p>You sate yourself on your new subordinates body, and she also experiences considerable pleasure, despite, or maybe because of her lack of experience with women.</p>'
				);
			}

			// Questions
			bNoShow = stype === "anita7";
			startQuestions();
			if (isMurderPath() && perGates.other == 600 && !perAnita.checkFlag(4)) addLinkToPlaceC(md, "ask her about the killing of " + perGates.getPersonNameShort(), 252, '', 'You ask her about what happened at the mansion</p><p>&quot;' + myName + '! Sorry ' + myName + ', I do not remember that well, my memory is not clear. I am sure my last commander ordered the execution of an enemy, but it was ordered by his superior. I did as ordered, as I always will, ' + myName + '&quot;</p><p>It is a little chilling her casual reply about the murder, as if it is something normal for her...</p>', 'Anita', "setPersonFlag('Anita',4)");
			else addLinkToPlace(md, 'talk more to Anita', 252);

		}
		addLinkToPlace(md, 'return to Ms Jones\' office', 145);

	}

	WritePlaceFooter(md, '', bNoShow);
}