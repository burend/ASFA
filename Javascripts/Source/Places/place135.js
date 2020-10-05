function ShowPlace135(stype)
{
	var md = WritePlaceHeader();
	
	var perBambi = findPerson("Bambi");

	var perMonique = findPerson("Monique");
	if (perMonique.other < 10) //Monique is < 10 so hasn't told you about the stears family history
	{
		perMonique.other = 10;  //Set it so she will eventually tell you about the Stears family history
		if (perMonique.isCharmedBy()) perMonique.place = 10; //Move Monique to the History room again for her next Show
	}
	perBambi.showPerson("bambi3.jpg");

	addPlaceTitle(md, "Bambi Under a Spell");

	if (stype == "bar") {
		md.write(
			'<p>You follow the confused barmaid into the room, her body trembling as she removes some of her clothing.</p>' +
			'<p>Bambi\'s whole body begins to quiver and she turns to face you. "What...  What did you do to me?" she asks. "I have never felt this way for anyone before, man nor woman. ' +
			'"Please..." she shudders again, "Please, just give me the money so we can be... friends."</p>' +
			'<p>You shake your head at Bambi. "I don\'t think so.  I don\'t really <i>need</i> to give you any money, now do I," you say'
		);
	} else {
		md.write(
			'<p>You cast the spell.</p>' +
			'<p>Already halfway to the door, Bambi\'s whole body begins to quiver. She stops, and turns to face you. "What...  What did you do to me?" she asks. "I have never felt this way for anyone before, man nor woman. ' +
			'"Please..." she shudders again, "Please, just give me the money so we can be... friends."</p>' +
			'<p>You shake your head at Bambi. "I don\'t think so.  I don\'t really <i>need</i> to give you any money, now do I," you say'
		);
	}
	
	if (perBambi.checkAnyFlags(33, 34))
	{
		var val = 100 + (perBambi.checkFlag(34) ? 50 : 0);
		md.write(', slipping the ' + sCurrency + val + ' you have already handed over back into your wallet');
		AddCash(val); //give the money back
		perBambi.setFlag(33, false);
		perBambi.setFlag(34, false);	//Reset it so that you only get your cash back ONCE
	}

	md.write(
		'. "Soon you will be begging for me to take you, even offering yourself to me.  Free of charge."</p>' +
		'<p>"I... I don\'t understand, ' + perYou.getPersonName() + '" she says. "I have to have the money so that we can make love." Her eyes stray up and down your body as her hands begin caressing her own. "Please, just pay me so I can... I mean you... can get some release."</p>'
	);

	startQuestions();
	addLinkToPlace(md, "wait for the spell to take hold", 136);
	addLinkToPlace(md, "go to the bar?", 124);

	WritePlaceFooter(md);
}