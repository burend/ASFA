// Place: inside Museum - Approach Guard

function ShowPlace241(stype)
{
	var md = WritePlaceHeader();

	var perGina = findPerson("Gina");
	var perMG = findPerson("MrsGranger");
	var clvMG = perMG.getCharmedLevel();

	if (stype === "") {
		// Guard pointing her gun
		perGina.showPerson("gina1c.jpg");

		addPlaceTitle(md, "Museum Guard");

		md.write('<p>As you reach for the vase a security guard leaps out, drawing a pistol. "Stop right there!" she yells, her finger itching to pull the trigger.</p>');

		if (perGina.other === 0) perGina.other = 1;  // Have run into Gina the Security Guard

		if (perGina.isCharmedBy()) {
			md.write(
				'<p>You see it is Gina, and she immediately re-holsters her pistol,</p>' +
				'<p>"Ohhh, sorry ' + perYou.getMaster() + ' I did not realise it was you! Did you want this vase? Please take it, I will report it stolen later by an unknown person!"</p>'
			);
			if (perYourBody.FindItem(29) === 0) {
				if (perYourBody.PutItem(29)) {
					moveItem(29, 0);		// Remove any loose instances of the Vase, probably at location 240
					SetVaseVariables();
				}
			}
		}

		startQuestions();

		if (perGina.isCharmedBy()) {

			// Choices
			startQuestions();
			addLinkToPlace(md, 'return to the main hall?', 239);
			addLinkToPlace(md, 'explore the remainder of the museum?', 249);


		} else {
			if (perMG.other == 5) {
				// If Mrs Granger is Here looking for the Vase.
				if (clvMG == 1) {
					startAlternatives(md);
					addLinkToPlaceC(md, 'Mrs. Granger moves to distract the guard', 241, "type=distract");
					addQuestionC(md, 'ask Mrs. Granger to go home', "MrsGranger", 236);
					endAlternatives(md);
				} else {
					startAlternatives(md);
					addLinkToPlaceC(md, 'order Mrs. Granger to attack the guard', 241, "type=attack");
					addLinkToPlaceC(md, 'Mrs. Granger moves to distract the guard', 241, "type=distract");
					addQuestionC(md, 'order Mrs. Granger to go home', "MrsGranger", 236);
					endAlternatives(md);
				}
			} else {
				// You are here on your own
				addLinkToPlace(md, 'attack the guard', 241, "type=meattack");
			}
			addLinkToPlace(md, "exit the museum before you get arrested?", 238);
		}

		// People
		if (perMG.other == 5) {
			// If Mrs Granger is Here looking for the Vase.
			AddPeopleColumn();
			if (perMG.other == 5) perMG.showPerson("granger-face.jpg", "100%", "", "!granger12a.jpg");
		}
	} else {
		var perKate = findPerson("Kate");
		if (stype != "meattack") {
			perMG.other = 50;  // Mrs Granger @ hospital
			perMG.setFlag(3);	// Arrested for theft of the Vase
			if (perKate.place != 9999) perKate.place = 1;  // Place Kate at home so you can find out about the hospital
			perKate.other = 7;  // Reset Kate's Path just in case you pissed her off at the beginning
			perKate.charmedTime = nTime;
		}
		moveItem(29, 1001);  // Remove the Dragon Vase from the museum and put it in the "safe"
		if (whereItem(34) === 0) PlaceI(34, 276); // Put the Lock of Hair @ the safe (dropped during the fight)
		setPlaceFlag("Museum", 3);	// Set the safe as LOCKED
		if (!isPlaceKnown("PoliceStation")) setPlaceKnown("PoliceStation");	//  Know the Police station if you don't already.

		// REMOVE the Book from your Inventory
		if (perYourBody.FindItem(4) > 0)	{
			// If DA is CHARMED then place the book as "Lost";
			// otherwise place the Book w/ Mr. Beasley
			perYourBody.DropItem(4, isCharmedBy("Diane") ? 999 : 76);
		}
		// REMOVE the Police Pistol from your Inventory
		if (perYourBody.FindItem(9) > 0)	perYourBody.DropItem(9, 1);	// put it back at its initial position

		if (getPersonOther("Diane") === 0) {
			setPersonOther("Diane", 1);  // Start DA White Path
			movePerson("Diane", 168);
		}

		// Arrested for WHAT...
		perYou.setArrested(3); // Attempted theft of Vase
		perYourBody.DropAllItems("Diane");

		if (stype == "meattack") {
			// You attack the guard!
			perMG.place = 177; // Puts Mrs Granger back at home
			if (perMG.other == 5) perMG.other = 4; //Advance Mrs Granger's Path

			perGina.showPerson("gina1d.jpg");

			addPlaceTitle(md, "You try to attack");

			md.write(
				'<p>You try to jump the guard but you are just too slow, she leaps aside and threatens you and you freeze as the gun it pointing at your chest and you have no hope...</p>' +
				'<p>The guard radios for assistance and quickly the police arrive. You are handcuffed and escorted to jail for attempted robbery.</p>'
			);

			startQuestions("You have no choice...");
			addLinkToPlace(md, "you are taken to the police station", 168, "arrest=true");

		} else if (stype == "attack") {
			// Mrs Granger attacks the guard!
			perMG.place = 275.5; //  @ hospital ICU
			perMG.health = 20;
			setPlaceKnown("HospitalICU");

			perMG.setFlag(1); //Mrs Granger WAS AT hospital

			perMG.showPerson("!granger12a.jpg", "height:max");

			addPlaceTitle(md, "Mrs Granger shot, and you are arrested!");

			md.write(
				'<p>Mrs Granger moves in the light of the large windows, and jumps the guard and the two blondes crash to the floor. After a brief wrestle the guard\'s pistol sounds out and Mrs Granger crumples, blood pouring from her chest.</p>' +
				'<p>The guard radios for assistance and quickly the police arrive. You are handcuffed and escorted to jail for attempted robbery. An ambulance is called to take Mrs. Granger to the hospital.</p>'
			);

			startQuestions("You have no choice...");
			addLinkToPlace(md, "you are taken to the police station", 168, "arrest=true");

		} else {
			// Mrs Granger distracts the guard
			perMG.place = 261; //  @ Jail Cell
			perMG.setFlag(4);	// Distracted Gina

			perMG.showPersonRandom("!granger12b", 2, "height:max");

			addPlaceTitle(md, "Both Arrested!");

			md.write(
				'<p>Mrs Granger moves in front of a large window and starts to do a strip-tease as the guard watches nervously. The guards eyes focus on Mrs. Granger and you make a move to take the Vase and run. ' +
				'The guard notices and shoots but her aim was off as she was absorbed in watching Mrs. Granger. The shot goes wild but she immediately re-aims and calls for you to surrender. Mrs. Granger freezes, unwilling to push further and endanger your life. The guard radios for assistance and in a surprising short time the police arrive.</p>' +
				'<p>Mrs Granger and yourself are handcuffed and escorted to jail for attempted robbery.</p>'
			);

			startQuestions("You have no choice...");
			addLinkToPlace(md, "you are taken to the police station", 168, "arrest=true");
		}
	}
	WritePlaceFooter(md);
}