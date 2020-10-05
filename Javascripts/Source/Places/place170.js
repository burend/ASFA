// Talking to Tess

function ShowPlace170(stype)
{
	var md = WritePlaceHeader();

	var perJ = findPerson("JohnAdams");
	var perTess = findPerson("Tess");
	var perTanika = findPerson("MrsTanika");
	var clvT = perTanika.getCharmedLevel();
	var nmT = perTanika.getPersonName();
	var nmTs = perTanika.getPersonNameShort();

	var myName = perTess.getYourNameFor();

	// State changes
	if (perTess.other == 10) perTess.other = 11; //  Opening up the option for Tess to Talk about her husband.

	// Comments
	if (stype === "enter") {
		WriteComments('"I\'m so glad that you like it '+ myName +'. Here, do you want to kiss these?" She asks, exposing her breasts for your viewing pleasure.<br>');
		setQueryParams('');
	}

	// Images
	if (!isDay()) perTess.showPerson("tess20b.jpg");
	else if (perTess.other == 27) perTess.showPerson("tess14c.jpg");
	else perTess.showPerson("tess8.jpg");

	// Title
	addPlaceTitle(md, "Mrs. Adams In Your Bedroom");

	// Description
	md.write('<p>Mrs. Adams holds her breasts out for you to play with. You take your time to explore her mounds and she groans as your fingers touch each nipple.</p>');

	// Questions
	startQuestions();
	addLinkToPlace(md, 'play with Tess even more', 170, 'type=tessplaymore');
	// Both Tess and Mrs Tanika
	if (perTanika.whereNow() == 46) {
		addLinkToPlace(md, "ask Tess and " + nmTs + " to work together for you", 170, 'type=tesstanikathreesome');
		addLinkToPlace(md, "ask " + nmTs + " and Tess to play with each other", 170, 'type=tanikatesssex');
	}

	if (perTess.other == 11) addQuestionC(md, '"Tess, do you have any magic artifacts?"', "Tess", 2011);
	else if (perTess.other == 12) addQuestionC(md, '"Ask your husband for magic, but do <b>NOT</b> tell him about <i>us</i>."', "Tess", 2012);
	else if (isDay() && perJ.checkFlag(2)) addLinkToPlaceC(md, 'Tess, "Maybe you could change your outfit?"', 46, '', '&quot;Of course my love, I will change for you immediately&quot;', '', 'TessChangeClothes();');
	if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');

	if (perTess.other > 24) {
		if (isShopOpen(2, 1, true)) addQuestionC(md, '"Tess, let\'s meet at the library"', "Tess", 10421);
		if (wherePerson("JohnAdams") == 230) addQuestionC(md, '"Tess, let\'s visit ' + findPerson("JohnAdams").getPersonName() + '"', "Tess", 10422);
	}
	//if (!isMurderPath()) addOptionLinkC(md, '"Tess, can you take me somewhere in your car?"', "carRide('Tess','Tess smiles at you. &quot;Where do you want to go, my love?&quot;',', she looks at you longingly as you leave the car. She blows you a kiss and drives back to your home')");
	perTess.addDancingLink(md, 'talk to Tess about dancing in the club',
		'You ask Tess about dancing and mention the Avernus club. She looks uncertain,</p>' +
		'<p>&quot;My love, I could dance for you here, but for others...&quot; and you tell her how beautiful she is and you want to show her off to everyone. She is still not sure but replies,</p>' +
		'<p>"It\'s ok, I will give it a try" and with that you call Jade to arrange a dance for Tess.'
	);
	perTess.addSleepLink(md, "go to bed for the night with Tess", "Going to Bed with Tess", '<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">As you prepare to go to bed for the night, Tess lies down on the bed looking beautiful as always. She looks at you with desire and you can see you will not be sleeping for a while...</p>', 'tess20c.jpg', true, 46);

	addLinkToPlace(md, 'finish playing with Tess', 46);

	WritePlaceFooter(md);
}