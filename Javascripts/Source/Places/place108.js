// Place: Kate's Room and she is home, and is charmed and going to kill you

function ShowPlace108(stype)
{
	var md = WritePlaceHeader();
	var perKate = findPerson("Kate");
	var perMG = findPerson("MrsGranger");
	if (perDavy.other == 7) perDavy.other = 6;
	perKate.setFlag(40);

	
	if (stype == "leave" || stype == "embrace") {
		// Kate kills you
		perKate.other = 900;  // SHE HAS STABBED YOU - END OF GAME

		perKate.showPerson("kate17e.jpg");

		addPlaceTitle(md, "Stabbed!");
		if (stype === "leave") md.write('<p>Something about how she is acting troubles you and you make and excuse and turn to walk out of her room. As you do something cold and sharp pierces between your ribs. ');
		else md.write('<p>You embrace Kate. Her warm lips surround yours and she wraps her arms around you before something cold and sharp pierces between your ribs. ');
		
		md.write(
			'You stagger backward and try to grasp the handle of a dagger lodged in your left side. Your bloodied fingers fail to grip, slipping off the hilt.</p>' +
			'<p>Kate sneers at your passing life. &quot;You conceited fool,&quot; she says. &quot;How could you ever think that I could ' +
			'love anyone else but my master Davy?&quot;</p>' +
			'<p>You\'re unsure how you have failed to finish your journey or how you could ever win against the villains conspiring against you.</p>' +
			'<p>Better luck next time.</p>'
		);

		addRestartLink(md);

		
	} else {

		// Kate is charmed and trying to kill you!
		if (perDavy.other == 7) perDavy.other = 6;
		perKate.showPerson("kate17a.jpg", "", "", "kate17c.jpg");

		addPlaceTitle(md, "Kate At Her House");

		md.write(
			'<p>Kate is waiting for you in her bedroom. Although she\'s changed her clothes again she looks much calmer than the last time you saw her.</p>' +
			'<p>"Hello," she says. "I\'m so glad you\'re here. I was thinking that I have never met anyone quite as nice as you ' + perYou.getPersonName() +
			'. You know, we have a lot in common and, at times like this, it\'s ' +
			'only natural for two people to find an attraction to one another. I know that you think that I\'m a little ' +
			'forward but I want to know you a lot better ' + perYou.getPersonName() + '. Would you like to get to know me	too?"</p>'
		);

		if (perMG.other >= 50 && perMG.checkFlag(1)) {
			setPlaceKnown("Hospital");
			md.write("<p>&quot;By the way, I hope you've visited my mother in the hospital.  She kept saying your name in her sleep when I visited her there. I didn\'t know the two of you were so close.&quot;</p>");
		}

	  startQuestions();

		if (perKate.other == 15 || perKate.other == 999) addQuestionC(md, 'tell Kate that you like her too', "Kate", 5415);
		else if (perKate.other == 50) addLinkToPlace(md, 'embrace your friend', 108, 'type=embrace');
		if (perMG.whereNow() === 177) addLinkToPlace(md, 'look for Mrs. Granger', 108, "type=leave");
		addLinkToPlace(md, 'exit the house', 108, "type=leave");
	}

	WritePlaceFooter(md);
}