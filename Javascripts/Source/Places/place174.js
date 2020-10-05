// Answer to the Gold Worm

function ShowPlace174(stype)
{
	var md = WritePlaceHeader(stype != "sex", stype == "sex" ? "td-left-large" : "");

	var perTess = findPerson("Tess");
	var bRight = perTess.other == 20;    // Got it right

	if (stype == "sex") {
		// Sex!
		perTess.showPerson("tess11c.jpg");
		addPlaceTitle(md, "Making love to Tess");

		md.write(
			'<p>Tess lies back sefuctively and you embrace her and you make love to your mutual ecstasy.</p>' +
			'<p>Later Tess tells you of her love for you, and how she will check for more magic. '
		);
		if (isDay()) {
			md.write('She gets out of the bed, trips over, and then redresses. She is an adorable clutz, and when you are ready she links her arm with yours and says "Shall we go?"</p>');
			startQuestions();
			if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');
			addLinkToPlace(md, "walk with Tess to the hotel bar", 124);
		} else {
			md.write(' She looks at you and asks,</p><p>"Night has fallen, why not spend the night here with me?"</p><p>A decidedly tempting proposition, like her last...</p>');
			startQuestions();
			if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');
			addSleepLink(md, "spend the night with Tess", "",
				"<p style='position:absolute;top:74%;left:55%;cursor:pointer;margin-top:-12px;font-size:x-large'><b>Going to Bed with Tess</b></p>" +
				'<p style="position:absolute;left:45%;top:75%;cursor:pointer;font-size:1.1em;width:55%">You spend the night with Tess in the hotel, to her delight and your equally great pleasure. In the morning you have a light breakfast with her in the hotel dining room before she leaves to speak to Victoria.',
				perTess.getImg('tess11d.jpg'), false, 124
			);

			addLinkToPlace(md, '"Not tonight Tess" and walk with Tess to the hotel bar', 124, '', 'She gets out of the bed, trips over, and then redresses. She is an adorable clutz, and when you are ready she links her arm with yours and says &quot;Shall we go?&quot;');
		}

	}
	if (stype == "answer1" || stype == "answer2") {
		// Answer to the Gold Worm
		addPlaceTitle(md, "Golden Worm Answer", '', 0, true);

		md.write('<table class="table-main"><tr><td>&nbsp;</td><td><img src="Images/goldworm2.png" alt="Gold Worm"></td><td style="vertical-align:top">');
	}
	if (stype == "answer1") {
		if (bRight) {
			// Correct answer
			md.write(
				'<p>"Correct!" says the worm. "Never before has a human been so clever. Your reward is forthcoming. My power is yours to use as you wish."</p>' +
				'<p>You absorb twenty mana points from the worm.</p>' +
				'<p>The worm then whispers to you, strange words, magical secrets of some sort that expand your magical knowledge.</p>'
			);
			if (isSpellKnown("Transform")) stype = "answer2";		// Already know it
			else {
				// Don't Know The Transform Spell Yet
				md.write('<p>In the words of the worm you realise there is a secret knowledge that could yeild a spell, but you will only get one chance!</p>');
				startQuestions();
				if (perYou.FindItem(4) > 0) {
					if (isRunes()) addOptionLink(md, 'learn the spell', "Research('Spell','AlMass','',174,'type=answer2');");
					else {
						md.write(
							'<p>What are the strange words you heard?</p>' +
							'<p><form method="POST" name="FormChar"><input type="text" size="20" name="research"><input type="button" name="button" value="enter" onClick=ResearchOLD(\"AM\",document.FormChar.research.value)></form></p>'
						);
					}
				} else addLinkToPlace(md, 'unfortunately you do not have the Book', 174, 'type=answer2', 'Regretfully you do not have the book...');

				AddRightColumnLarge();
				perTess.showPerson("tess11b.jpg");
			}

		} else {
			// Wrong answer
			md.write(
				'<p>"Fool!", yells the worm. "Such idiocy deserves nothing. Goodbye, you weak link of the human species"</p>' +
				'<p>You got the answer wrong. Better luck next time you play the game.</p>');
				stype = "answer2";
		}
	}
	if (stype == "answer2") {

		md.write(
			'<p>The worm freezes in place and falls silent. You start to ask Tess if there were any other items like this, and you notice Tess has removed some more of her clothing and is looking at you expectantly. She tells you,</p>' +
			'<p>"I think Victoria may be able to help me, but Love, we have this room for as long as we want, make love to me..."</p>'
		);
		startQuestions();
		addLinkToPlace(md, 'no words are needed, embrace her', 174, 'type=sex');
		addLinkToPlace(md, '"Later Tess" and go to the hotel bar', 124, '', 'Tess looks disappointed, but she smiles and gives you a quick kiss before dressing and then insists on walking arm-in-arm to the Bar');

		AddRightColumnLarge();
		perTess.showPerson("tess11b.jpg");
	}
	if (stype === "") return gotoPlace(124);

	WritePlaceFooter(md);
}