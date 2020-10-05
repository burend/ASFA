// Place: Park Pathway

function ShowPlace63()
{
	var md = WritePlaceHeader();

	var perDebra = findPerson("DebraKelly");
	var perKate = findPerson("Kate");
	//var bKateHere = perKate.other < 4;

	if (perJesse.getDemonPath() == 30 && perJesse.place == 10) perJesse.place = 2;	//Ready to start the First Demon encounter
	if (wherePerson("Kurndorf") == 2) movePerson("Kurndorf", 3);// Ghost is here
	if (getPersonOther("Anita") == 12) setPersonOther("Anita", 13); // Advance the Anita Plot

	addPlaceTitle(md, "Park Pathway", whereItem(37) === 0 ? "park3kite.jpg" : "park3.jpg");

	md.write(
		'<p>A pathway takes you along a small river. The surroundings have a soothing effect on your well-being ' +
		'and for a moment you wonder about what life would be like '
	);
	if (isSpellKnown("Charm")) md.write('without mind control.');
	else md.write('without your hunt for the spells in the Book of Control.');
	md.write(' Such a silly notion doesn\'t last very long and you set your mind back to your goal.</p>');

	if (whereItem(37) === 0) md.write('<p>A kite is caught in a tree.</p>');

	if (perKate.isHere()) {
		// Meet Kate?
		md.write('<p>You look around to see one of your friends, Kate, approaching from the far end of the park. Kate isn\'t known for her social skills, probably due to the fact she always has her head in school books, but she does know a lot about practically everything. She\'s in a hurry and hasn\'t seen you yet.</p>');
	}
	
	if (getPersonOther("Anita") == 900) md.write('<p>Anita lies still, a bullet hole in her heart.</p>');
	else if (getPersonOther("Anita") == 901) {
		md.write('<p>The police have cleared the scene of Anita\'s murder.  You can still see the slight stain in the grass where her body fell to the ground, the sound of the shot echo\'s in your ears like a ghost.</p>');
	}

	if (perJesse.place == 2) {
		//Demon in the Park
		md.write('<p>You can see the face of Jesse peeking out from behind a tree - her eyes still glowing with the presence of the demon hiding within her body.</p>');
	}
	if (perYou.getExperience() > 0) {
		//Debra at the pathway
		if (perDebra.place === 87 && isDay()) {
			if (!isPlaceKnown("KellyHouse")) md.write('<p>You see another pathway curving away and a girl walking along it.</p>');
			else md.write('<p>You see Debra walking in the distance.</p>');
		} else md.write('<p>You see another pathway curving away.</p>');
	}

	//***************************************************************************
	startQuestions();
	addLinkToPlace(md, "sit on a bench for a while", '', '', 'You kill some time for an hour, enjoying the park', '', 'WaitHere(5);');

	if (perJesse.place === 2) addLinkToPlaceC(md, "approach Jesse behind the tree", 63, 'type=jessepark');
	if (perKate.isHere()) addLinkToPlaceC(md, "approach Kate", 4);	//  Meet Kate?
	else if (whereItem(37) === 0) addQuestionCO(md, 'pull the kite out of the tree', "Misc", 63);

	if (perYou.getExperience() > 12) {
		// Can Debra be here?
		if (perDebra.place === 87 && isDay()) {
			var herName = perDebra.getPersonName();
			if (!isPlaceKnown("KellyHouse")) {
				// Haven't spoken w/ Debra at all yet cause you don't know her address.
				addLinkToPlaceC(md, "approach the girl on the other pathway", 87);
			}	else {
				// Has already met Debra
				addLinkToPlaceC(md, "approach " + herName, 87);
			}
		} else addLinkToPlace(md, "walk to the other pathway", 87);
	}
	if (isPlaceKnown("WildRanges")) addOptionLink(md, "enter the wild ranges", 'LeaveKate4(26)', 'moveblock');	// Do you know about the Wild Ranges?
	addOptionLink(md, "walk to the park entrance", 'LeaveKate4(47)');

	WritePlaceFooter(md);
}