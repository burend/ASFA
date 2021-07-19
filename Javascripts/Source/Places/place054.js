// Place: Relaxation Center

function ShowPlace54()
{
	var md = WritePlaceHeader();

	var perSharon = findPerson("Sharon");
	perSharon.showPerson("stress.jpg");
	addPlaceTitle(md, "A Relaxation Center");

	md.write('<p>You enter the hidden door that Sharon told you about. You walk through into a dirty basement where Sharon greets you and welcomes you to her Relaxation center. She says that all their facilities are yours to use free of charge.</p>');

	startQuestions();

	addPopupLinkC(md, 'have Sharon massage you', "True Relaxation.",
				(perYou.isMaleSex() ? perSharon.addPersonStringRorX("sharonmassb.jpg", "100%") : perSharon.addPersonString("sharonmassg.jpg")) +
				'No wonder she does this professionally.',
				true, "dispPlace()"
	);

	addPopupLinkC(md, 'turn Sharon into an exhibit', "It\'s only fair.",
		(perYou.isMaleSex() && isExplicit() ? perSharon.addPersonStringX("sharontiedb.jpg", "100%", "rightpopup") : perSharon.addPersonString("sharontied.jpg", "height:max%", "rightpopup")) +
		'I\'m taking it easy on her though.',
		true, "dispPlace()"
	);


	addLinkToPlace(md, "Head back to the alley", 52);

	WritePlaceFooter(md);
}