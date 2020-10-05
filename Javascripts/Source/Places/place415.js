// Event: Visit Mom at Work

function ShowPlace415()
{
	var md = WritePlaceHeader();
	var perMom = findPerson("Mom");
	perMom.setFlag(13);
	var perGabby = findPerson("Gabby");
	var bBothCharmed = perMom.isCharmedBy() && perGabby.isCharmedBy();

	if (bBothCharmed) perGabby.showPerson("gabby-mom3.jpg");
	else perMom.showPersonRandom("mom5", 2);
	addPlaceTitle(md, "Mom at Work");

	if (bBothCharmed) {
		md.write(
			'<p>Your mothers\' office is a good size, as befits her role as a senior member of the production staff.</p>' + 
			'<p>She is, as usual, absorbed in conversation with Gabby, but the two are obviously a lot more “familiar” with each other now and it takes them a while to notice you.</p>' +
			'<p>“Oh, hi ' + perYou.getPersonName() + ', we are still busy, but do you need anything from us?”</p>' +
			'<p>Gabby still looks annoyed when you visit, but even she is somewhat excited to see you, now.</p>'
		);		
	} else if (perGabby.isCharmedBy()) {
		md.write(
			'<p>Your mothers\' office is a good size, as befits her role as a senior member of the production staff.</p>' + 
			'<p>Both women are clearly absorbed in their work, but Gabby twitches a little as you enter the room. You see her pressing her legs together as she greets you, and Mom quickly follows suit.</p>' +
			'<p>“Oh, hi ' + perYou.getPersonName() + ', we still have a lot to do, but if you need anything I can make some time.”</p>'
		);
	} else {
		md.write(
			'<p>Your mothers\' office is a good size as befits her role as a senior member of the production staff.</p>' +
			'<p>You see her absorbed in conversation with her assistant Gabby Halliway and it takes a moment for her to realise you are there,</p>'
		)
		if (perMom.checkFlag(19) && !perMom.checkFlag(34) && whereItem(66) >= 0) {
			md.write(
				'<p>"Hi ' + perYou.getPersonName() + ',  did you bring the clothes I asked for?"</p>' +
				'<p>You apologise that you had not got around to it. You notice that Gabby looks annoyed at the interruption.</p>'
			);
		} else if (perGabby.checkFlag(24) && perGabby.checkFlag(25) && !perGabby.checkFlag(26)){
			md.write(
				'<p>Gabby looks extremely irritated at your interruption.</p>'+
				'<p>"Would you get out of here!" she snaps, "Some of us have work to do."</p>'+
				"<p>Normally you'd say something back, for some reason today you're instead filled by a deep sense of shame at your unwanted intrusion.</p>"
			);
			startQuestions();
			addLinkToPlaceC(md, "Yes, Mistress Halliway",415, 'type=calledgabbymistress');
			WritePlaceFooter(md);
			return true;
		}else {
			md.write(
				'<p>"Hi ' + perYou.getPersonName() + ', sorry but Mommy is really busy, can you come back later?"</p>' +
				'<p>You agree, and you notice that Gabby looks annoyed at the interruption.</p>'
			);
		}
	}

	startQuestions();
	if (bBothCharmed) {
		addLinkToPlace(md, 'ask Mom if you may “use” her assistant for a moment', Place, 'type=usegabbyoffice');
		if (perMom.getCharmedLevel() > 1) addLinkToPlace(md, 'tell Mom you need help in releasing some pent-up desire', Place, 'type=momdesireoffice');
		if (perGabby.getCharmedLevel() == 1) {
			addPopupLink(md, 'tell them to not mind you and proceed', "Mom and Gabby",
				perGabby.addPersonString("gabby-mom9.jpg", "height:max%", "right") +
				'You know by now how your presence affects those under the Dai-Chu, and even though Mom and Gabby are both hesitant to give in to their needs, it only takes a small push to convince them they\'d work way more efficiently when they make sure to release all that pent-up lust distracting them, and Mom is the first to take action, silencing her assistant\'s protest with a deep kiss that\'s leaving her breathless.',
				true, "dispPlace(Place,'type=momgabbyoffice2')"
			);
		}

	}
	addLinkToPlace(md, 'return to the hallway', 372);
	WritePlaceFooter(md);
}
