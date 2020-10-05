// Study puzzle =
// Kate other 5 = Correct Answer
//				  4 = Wrong

function ExitStudyPuzzle()
{
	if (whereItem(3) == 13) moveItem(3, 3); // Move Kate's Address to the Library Reception if you leave w/o getting it
	gotoPlace(3);
}

function ExitStudyPuzzleWrong()
{
	gotoPlace(3);
	WriteComments(
		'<p>Kate storms out of the study area and you follow behind her embarassed. As you decide what to do next the librarian at the reception desk calls out to you.</p>' +
		'<p>"Excuse me, your friend dropped this, will you please give it to her or put it in the bin"</p>' +
		'<p>You see it is some papers, just some notes, nothing she needs and also an envelope, nothing inside it. It was addressed to Kate at her home, you now know her address.</p>'
	);
}

function ShowPlace13(stype)
{
	var md = WritePlaceHeader(false, "td-center");
	var perKate = findPerson("Kate");

	if (perKate.other == 4) {
		// Wrong!!
		perKate.place = 1000; // Move Kate out of the Library so that you can't try again if you leave.
		perKate.charmThem(4, "Davy");	// now charmed by Davy
		perKate.other = 999; //Put Kate at the "end" of her path
		setPlaceKnown("GrangerHouse"); // Sets it so that you will always know where Kate's address is
		setPlaceKnown("Alley");  //Know the Alley
		perKate.setFlag(4);		// Really pissed her off!!!

		perKate.showPerson("kate3b.jpg");

		addPlaceTitle(md, "Wrong Answer");

		md.write(
			'<p>Kate glares.</p>' +
			'<p>"You liar!" she exclaims. "How dare you lie to me about your mathematics exam. I should have known better than to trust an imbecile like you. Ha! If ever I see your face again then it will be one too many times!"</p>' +
			'<p>Speechless about being discovered, you try to back away. You are so embarrassed you can not answer her accusations.</p>'
		);

		startQuestions();
		addOptionLink(md, "go to the library reception?", "ExitStudyPuzzleWrong()");
	} else if (stype === "") {
		// got the puzzle right

		perKate.place = 1;  // Place Kate @ Home

		addPlaceTitle(md, "Right Answer", '', 0, true);

		md.write(
			'<p>Kate beams a smile. "Oh!" she exclaims. "How did you ever solve it so quickly? I have been working on this problem since Tuesday. You must be a genius."</p>' +
			'<p>You brag about your finesse in mathematics and how you could solve as many problems as anyone could dish out.</p>' +
			'<p>Seeing Kate respond so favourably you start to wonder whether the rumours about her are really true. Maybe she is as horny as Davy Robbins has claimed.' +
			'You feel your ' + (perYou.isMaleSex() ? 'dick' : 'nipples') +
			' stiffen in arousal as she leans towards you, and you find it difficult to avoid staring at her cleavage. You begin to wonder what it would be like to have the school nerd for your own.</p>' +
			'<p>"Maybe we could spend some more time together?" she suggests, handing you a slip of paper.</p><p>' +

			'<p>You look at the paper. It has Kate\'s address on it. "Thanks!" you reply, almost too keenly. "I\'m actually doing some research into the old book that Mr Beasley talked about today. Can you help me by finding out what magic is around town?"</p>' +
			'<p>"Sure, ' + perYou.getPersonName() + '. I\'ll look around the library and let you know what I find."</p>' +
			'<p>You reply, "Much appreciated."</p>' +

			'<p>Your eyes are drawn back towards Kate\'s cleavage, and you think she might have noticed, you are tempted to look more openly and be damned for doing! Then again her rear is very round and tempting...</p>'
		);

		startQuestions();
		addLinkToPlaceO(md, 'look at her cleavage', 13, 'type=cleavage');
		addLinkToPlaceO(md, "'accidentally' touch her ass", 13, 'type=ass');
		addOptionLink(md, "go to the library reception?", "ExitStudyPuzzle()");


		AddRightColumnLarge(md);
		perKate.showPerson("kate3c.jpg");

	} else if (stype == "cleavage") {

		// Staring
		perKate.setFlag(5);

		addPlaceTitle(md, "Damn!", '', 0, true);

		md.write(
			'<p>You know Kate saw you looking at her breasts, so you decide you might as well be shouted at or slapped for the works. You look at her large breasts with great appreciation, making no effort to hide it, fully expecting to pay for it in pain, either verbal or physical.</p>' +
			'<p>Kate stands up, and just says "I..I should leave now, I need to get some things back at home"</p>' +
			'<p>You are surprised, she does not look angry! As you look she straghtens her top and accidentally does so in a way that further accentuates her breasts. It has to be an accident, doesn\'t it?</p>' +
			'<p>As you puzzle this over, Kate leaves giving you a little wave goodbye and says \'See you soon?\'</p><p>'
		);

		startQuestions();
		addOptionLink(md, "go to the library reception?", "ExitStudyPuzzle()");

		AddRightColumnLarge(md);
		perKate.showPerson("kate3d.jpg");

	} else if (stype == "ass") {

		// Touch
		perKate.setFlag(5);

		addPlaceTitle(md, "Oops!", '', 0, true);

		md.write(
			'<p>You know Kate saw you looking at her breasts, so you look away and walk with her back towards the main area of the library. As she steps ahead, you reach out and \'accidentally\' put your hand on her rear. You immediately expect to be slapped but it was worth it!</p>' +
			'<p>Kate looks around at you and just says "I..I should leave now, I need to get some things back at home"</p>' +
			'<p>She looks a little annoyed but to your surprise she does not look angry! As you look she almost poses to accentuate her figure and her lovely rear-end. It has to be an accident, doesn\'t it?</p>' +
			'<p>As you puzzle this over, Kate leaves and says \'See you soon?\'</p><p>'
		);

		startQuestions();
		addOptionLink(md, "go to the library reception?", "ExitStudyPuzzle()");

		AddRightColumnLarge(md);
		perKate.showPerson("kate3e.jpg");

	}

	WritePlaceFooter(md);
}