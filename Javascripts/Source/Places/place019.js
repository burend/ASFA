function ShowPlace19()
{
	var md = WritePlaceHeader();

	if (wherePerson("Kurndorf") == 141) {
		// Enter the study after he is killed by Anita
		movePerson('Kurndorf', 0);
		updatePath();
		perGates.setFlag(1);  // Starts Murder Path
		perYou.startQuest(1);
		perGates.other = 600;
		charmPerson("Anita", 1, "Davy");
		charmPerson("Mayor", 1, "Davy");
		PlaceI(4, 19);  // places book in the room
		PlaceI(22, 19);  // places $10 in the room
		if (!isPlaceKnown("ShoppingCenter")) setPlaceKnown("ShoppingCenter");	// Know the Shops to turn in the Letter of Credit

		addPlaceTitle(md, "Through the Looking Glass...Door", "gatesstairs1.jpg");

		md.write(
			'<p>It was a strange feeling walking <i>through</i> the door, but you are now back inside the mansion. Hopefully you can convince ' + perGates.getPersonNameShort() + ' to let you study the book, or maybe apologise to him.</p>' +
			'<p>You hear voices, one of them sounds like Davy Robbins, the other you do not recognise,</p>' +
			'<p>"..did you find it?"</p>' +
			'<p>"No Sir, he refused to tell me so I dealt with him"</p>' +
			'<p>"What..I mean..<i>he</i> wanted that..but I did not tell you to...Look let\'s get out of here, I do not know if the spell will work again, I think it is distorted, or just I learned it wrong, we could only go here or back, not anywhere."</p>' +
			'<p>He calls out a strange word and you see them both fade from view and just vanish! You wonder what the woman meant by \'dealt with\' and walk over to where they were. You immediately stumble and fall, and you land on the dead body of ' + perGates.getPersonName() + ' shot through the heart!</p>' +
			'<p>Your shirt is covered in his blood as you scramble back to your feet, and you realise there is no-one who is going to believe you walked through a closed door to witness the killers vanish into thin air!!</p>' +
			'<p>A murder scene is not the place to be and you are frightened of someone entering the room and blaming you, but you are still obsessed with the book. You look around where you saw it before, and notice a drawer nearby, you open it and inside you see the Book!!</p>'
		);


	} else {
		// Sir Roland's study, he is dead and no police yet
		addPlaceTitle(md, "Dead " + perGates.getPersonName() + "\'s House", perYourBody.FindItem(4) === 0 ? "gatesroom2.jpg" : "gatesroom1.jpg");

		var perKhan = findPerson("OfficerKhan");
		if (perKhan.getPath() < 2) {
			// haven't had Cheryl Khan drive you to police yet
			md.write('<p>' + perGates.getPersonName() + ' lies dead on the floor. A bullet hole in his chest oozes out blood.');
		}

		md.write('<p>A murder scene is not the place to be and you are frightened of someone entering the room.</p>');
	}

	startQuestions();
	addLinkToPlace(md, "exit the house", 16);


	WritePlaceFooter(md);
}