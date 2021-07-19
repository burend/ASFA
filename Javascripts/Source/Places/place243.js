// Lola's Office

function ShowPlace243()
{
	var md = WritePlaceHeader();

	var perLola = findPerson("Lola");
	var clvL = perLola.getCharmedLevel();
	var bOpen = isShopOpen(2, 0, true);
	if (bOpen) {
		if (clvL == 0) perLola.showPerson("lola1.jpg");
		else perLola.showPerson(clvL == 4 ? "lolacharm1.jpg" : "lolacharm2.jpg");
	}

	addPlaceTitle(md, "Lola\'s Office", !bOpen ? "office3.jpg" : "");

	md.write(
		'<p>Lola\'s office is large and serious looking. She has a grand looking wooden desk and various historical artifacts scattered around the shelves.</p>' +
		'<p>Looks like Lola has some equipment from the bondage display in a corner of her office. Maybe I could put it to good use.</p>'
	);
		
	if (perLola.isHere()) {
		if (clvL == 4) md.write('<p>Lola is perched on top of her desk waiting for you. No one else has the key to her office so she spends the whole day waiting to be used by you.</p>');
		else if (clvL > 0) md.write('<p>When you step into the office Lola strips off most of her clothing, to please her lover and ready for more of your attention.</p>');
		else md.write('<p>Lola looks annoyed at you. "Well... What is so urgent that you had to barge into my office.  If you dont have anything to say you can get out."</p>');
	}

	startQuestions();

	if (perLola.isHere() && perLola.isCharmedBy()) {
		if (clvL == 4) {
			// Slave
			if (!perLola.checkFlag(2)) {
				addPopupLinkToPlace(md, 'ask Lola about the bondage gear', 246, '', "Bondage Storeroom",
					perLola.addPersonString("bondage1a.jpg", "60%", "rightpopup") +
					'You ask your slave Lola about the bondage gear, and she offers to show you where the rest of the gear is stored. You agree and she leads you to a nearby storeroom.</p>' +
					'<p>She explains that she has experimented often in the past with being submissively bound or binding others dominantly. She then picks up a ball-gag and puts it on herself, she clearly feels she should be taking the submissive role and you agree completely',
					'setPersonFlag("Lola",2)'
				);
			} else addLinkToPlace(md, "go with Lola to the storeroom", 246);
			addPopupLinkC(md, 'have her suck again', "I could get used to having an office.",
				(perYou.isMaleSex() ? perLola.addPersonStringRorX("lolablowb.jpg", "60%", "rightpopup") : perLola.addPersonString("lolablowg.jpg", "60%", "rightpopup")) +
				'I\'d need some sort of tunnel under the desk for all my slaves though.'
			);

			addPopupLinkC(md, 'fuck her on the desk', "Those tits tho.",
				(perYou.isMaleSex() ? perLola.addPersonStringRorX("loladeskb.jpg", "60%", "rightpopup") : perLola.addPersonString("loladeskg.jpg", "60%", "rightpopup")) +
				'I guess this desk belongs to me now too.'
			);
			
		} else {
			// Lover
			if (!perLola.checkFlag(2)) {
				addPopupLinkToPlace(md, 'ask Lola about the bondage gear', 246, '', "Bondage Storeroom",
					perLola.addPersonString("bondage1b.jpg", "heght:max%", "rightpopup") +
					'You ask Lola about the bondage gear, and she offers to show you  the rest of the gear is stored. You agree and she gives you quick directions and says she will meet you there in a minute. You arrive at a storeroom and Lola arrives a moment later, she has dressed a bit differently and tied her hair in a ponytail.</p>' +
					'<p>She explains that she has experimented often in the past with being submissively bound or binding others dominantly and generally prefers the dominant role. She likes to wear her hair this way at times then. You are interested to see her "in action" but you are more inclined to see her dominate someone else.</p>' +
					'<p>You ask her for any suggestions, but there is really only one person, Gina who caused you so many problems over the vase! You call for Gina to join you and Lola',
					"setPersonFlag('Lola',2)"
				);
			} else addLinkToPlace(md, "go with Lola to the storeroom and call Gina to join you", 246);		
			addPopupLinkC(md, 'ask her ' + (perYou.isMaleSex() ? 'for a blowjob' : 'to lick your pussy'), "Desktop Pleasure",
				(perYou.isMaleSex() ? perLola.addPersonStringRorX("lolablowb.jpg", "60%", "rightpopup") : perLola.addPersonString("lolablowg.jpg", "60%", "rightpopup")) +
				'She seems very experienced with this!',
			);

			addPopupLinkC(md, 'fuck her on the desk.', "Her breasts are Mermerising",
				(perYou.isMaleSex() ? perLola.addPersonStringRorX("loladeskb.jpg", "60%", "rightpopup") : perLola.addPersonString("loladeskg.jpg", "60%", "rightpopup")) +
				'There is a sort of naughtiness fucking her on her own desk!',
			);
		}

	}

	addLinkToPlace(md, "leave the office", 239);
	WritePlaceFooter(md);
}