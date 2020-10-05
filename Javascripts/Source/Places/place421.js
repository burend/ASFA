// Place: Duck Pond

function ShowPlace421(stype)
{
	var perE = findPerson("Ellie");
	var herName = perE.getPersonName();
	var perKate = findPerson("Kate");

	if (perKate.place == 421 && perE.place != 421) return dispPlace(36);		// Kate ONLY
	
	var md = WritePlaceHeader();

	if (perE.place == 421 && perKate.place == 421 && stype === "") {
		// Ellie AND Kate at the Pond
		addPlaceTitle(md, "Duck Pond", "pond1.jpg");
		md.write('<p>An artificial duck pond in the park, a very pleasant place to sit and relax.</p><p>You can see Ellie sitting on a bench and around the other side of the pond Kate is walking along a path</p>');

		startQuestions();
		addLinkToPlaceC(md, "talk to Kate", 36);
		addLinkToPlaceC(md, "talk to Ellie", 421, 'type=ellie2a');
		addLinkToPlace(md, 'walk to the park entrance', 47);

		WritePlaceFooter(md);
		return;

	} else if (stype === "contemplate") {
		// Contemplate the ornamental pool
		addPlaceTitle(md, "Duck Pond", "pond2.jpg");
		md.write('<p>You look at the small ornamental pool but meditation has never been a thing for you.</p>');
		startQuestions();
		addLinkToPlaceC(md, "that is enough", 421);
		
	} else if (perE.place !== 421) {
		// No one here
		addPlaceTitle(md, "Duck Pond", "pond1.jpg");
		md.write('<p>An artificial duck pond in the park, a very pleasant place to sit and relax. There is a small ornamental pool to one side, it is one or two paces across, just meant for contemplation.</p>');
		startQuestions();
		addLinkToPlaceC(md, "contemplate the pool", 421, 'type=contemplate');

	} else {
		// Ellie only
		if (stype === "") stype = "ellie2a";

		perE.showPerson(stype + ".jpg");
		addPlaceTitle(md, herName + ' at the Duck Pond');

		if (stype == "ellie2a") md.write('<p>You see Ellie is relaxing on a seat dressed casually in the bright sunlight. She appears to be daydreaming, not studying as her mother thought. You think you hear her whisper "Davy".</p>');
		else if (stype == "ellie2b") {
			md.write(
				'<p>She looks at you, a flash of anger crosses her face, and she exclaims,</p>' +
				'<p>"That bitch!"</p>' +
				'<p>She looks at you again, and her expression changes,</p>' +
				'<p>"I\'m sorry, I do not know what has come over me recently. She is not really, I just wish she would leave my mother alone.<br/><br/>Look what you have done, ruined my fantasy here, I think I will go and see if <b>he</b> is free, please let him be and not be with <i>her</i>!"</p>' +
				'<p>She smiles at you and walks back to the park entrance.</p>'
			);
			perE.place = 81;
			perE.setFlag(2);
		}
	}

	// Questions
	startQuestions();

	if (perE.place === 421) {
		if (!perE.checkFlag(1)) addQuestionR(md, 'hello', 'She smiles brightly and replies, &quot;Hi!&quot; but then looks away back to her thoughts.', 'Ellie', "setPersonFlag(\\'Ellie\\',1);");
		if (perE.checkFlag(1) && !perE.checkFlag(2)) addLinkToPlaceC(md, '"The Bank Manager Kristin sent me..."', 421, 'type=ellie2b');
	}
	addLinkToPlace(md, 'walk to the park entrance', 47);

	WritePlaceFooter(md);
}