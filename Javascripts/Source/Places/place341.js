function DemonLeaves341()
{
	perJesse.place = 10; //Demon is "Out and About"
	perKurndorf.setQuestSeance(100); // End the Seance (Can now Teleport again)
	perKurndorf.setQuestGhost(50);
	if (!isMurderPath() && wherePerson("Sarah") === 0) {
		movePerson("Sarah", 1);		// Sarah Gates is now visiting her Uncle
		movePerson("AdeleRoss", 16);	// Set Gates Estate as Blocked (to protect Sarah)
		setPersonFlag("AdeleRoss", 1);
	}
}

function ShowPlace341()
{
	var md = WritePlaceHeader(false, "", "black");

	//  PICTURE REFERENCES
	perJesse.showPerson("jesse5a.jpg");

	// General Description
	// TITLE LINE
	addPlaceTitle(md, "Jesse the Demon");

	// Description
	md.write('<p>Jesse sits down and motions for you to come over to her as she begins to slowly expose more of her delicious flesh.</p>');

	if (perJesse.getDemonPath() < 20)
	{
		md.write('<p>"Yessss, little thrall.  Come to LEGION...  Taste of Us..." she whispers to you.  The strength of your desire, and the heat in your loins, increases with every step you take towards your dark fate.</p>');
	}
	else if (perJesse.getDemonPath() == 20)
	{
		md.write(
			'<p><b>"No you fool!"</b> Kurndorf yells.</p>' +
			'<p>A gut-wrenching nausea passes through you as the Ghost of Kurndorf passes through you, distracting you from the target of your desire.  It takes every ounce of self-control to keep from losing your lunch on the stone floor.</p>' +
			'<p>"Nooo!  You treacheroussss fool!" Jesse hisses in fury.  "You will pay for thisss!" Then she turns to you, her spell over you completely shattered.  "We will meet again, ' + perYou.getPersonName() + '. We promise you thisss...." she says, quickly gathering her things and fleeing out into the world.'
		);
	}

	// Dialogue Options
	//**********************************************************************
	startQuestions();

	if (perJesse.getDemonPath() < 20) addQuestionCO(md, 'kiss her', "Kurndorf", -14420);
	else {
		addPopupLink(md, 'try and stop her', "Demon",
			perJesse.addPersonString("jesse5b.jpg", "height:max%", "right") +
			'"No!" she hisses, locking her eyes on you as they begin to pulse red with hate.</p>' +
			'<p>"You shall face us soon enough, <i>mortal</i>," she says, yanking her arm from you and escaping out into the town.</p>' +
			'<p>You wonder if ' + (!isSpellKnown("Clairvoyance") ? 'some spell may help find her but you will have to find one first' : 'if clairvoyance can help you find her' + (isSpellKnown('Hydromancy') ? ', maybe using hydromancy' : '') + '?'),
			true, "DemonLeaves341();gotoPlace(342);"
		);
	}

	AddPeopleColumnMed();
	md.write('<img src="Images/People/Kurndorf/kurndorf.jpg" alt="Ghost" style="float:left;width:90%;margin:5px 5px" alt="Kurndorf">');

	WritePlaceFooter(md);
}