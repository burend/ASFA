// Place: Hotel Bar

function KateConfrontsDavy()
{
	var perKate = findPerson("Kate");
	if (!perKate.checkFlag(17)) {
		perKate.place = 184;
		if (sComment !== '') WriteComments('<p>Kate is gone, you assume to confront Davy</p>');
	}
}

function ShowPlace124(stype)
{
	var md = WritePlaceHeader(false, stype == "bambichat1" ? "" : "td-left-small");

	var perM = findPerson("Monique");
	var perB = findPerson("Bambi");
	var perMia = findPerson("Mia");
	var perTess = findPerson("Tess");
	var perKate = findPerson("Kate");
	var perJessica = findPerson("Jessica");
	var perDonna = findPerson("Donna");
	var perLauren = findPerson("Lauren");
	var perBarPerson = perB.isHere() ? perB : perMia.isHere() ? perMia : undefined;

	// Monique isn't busy (@ library) && She's Charmed && Davy is here
	if (perM.place === 8 && perDavy.place === 124 && perM.getQuest() > 4 && !checkPlaceFlag("Hotel", 8)) perM.place = 124; // Place Monique here @ the hotel for a quick cameo

	//****************** DESCRIPTION *****************************
	addPlaceTitle(md, "Hotel Bar", "hotel2.jpg");

	if (perBarPerson === undefined) md.write('<p>Currently there is no-one manning the bar, but there are still a few patrons at the bar.</p><p>');

	if (perJesse.place === 0) {
		if (isNight()) {
			if (perJesse.checkFlag(10)) md.write('It looks like Jesse must have gone to bed, she is not around that you can see. ');
		} else if (!perJesse.checkFlag(10)) md.write('One of the patrons, a girl with a bored expression and an innocent look about her' + addVisible(', watches you enter. She looks kind of interested as you walk past') + '. ');
		else if (perJesse.checkFlag(10)) md.write('Jesse looks kind of bored, sitting in the corner all alone. Even given the way she is dressed you can\'t shake your impression of her as just another innocent little girl. ');
	}

	if (perDavy.place == 124) md.write('To your surprise, Davy Robbins is sitting alone at the farthest table. He is keeping to himself and does not look like he wants company. ');

	if (perM.place == 124) md.write('Monique is sitting in the corner. ' + addVisible('She beckons you over and, from the way she lifts her skirt hem, it is obvious that she is still under your control... and still reveling in her newfound slavery. '));

	if (perTess.place == 124) md.write('Mrs. Adams, wearing a cheerleader outfit, is seated at the bar' + addVisible(' and beckons you over') + '. She may have found something of interest. ');

	if (perKate.place == 124) md.write('Kate is here heading for the hotel rooms intent on her revenge on Davy.');
	md.write('</p>');

	//******************* DIALOGUE OPTIONS ****************************
	startQuestions();

	// Davy
	var s;
	if (perDavy.place == 124) {
		// Move Davy OUT of the Hotel to "no location in particular"
		s = '';
		var sj = '';
		if (perM.place != 124 && !checkPlaceFlag("Hotel", 8)) {
			s = ' You also think, there must be something important in the cellar here, if it still exists. You need to see if you can locate more recent sets of plans for the Broken Inn Hotel.';
			sj = ';setPlaceFlag("Hotel",8)';
		}
		addPopupLinkC(md, 'talk to Davy Robbins', 'Davy Robbins',
			"<img src='Images/door5.jpg' style='width:25%;float:right' alt='Door'>" +
			"You approach Davy to try to confront him about events, and as you approach you see he is looking at an old drawing of the hotel, with an area that looks like a cellar circled with the word 'witch!'. " +
			'As you approach he quickly puts it away and tries to make his getaway.<br><br>' +
			'<b>"Get away from me, ' + perYou.getPersonName() + '!"</b> Davy yells then runs out the door into the street.<br><br>' +
			'As he leaves you keep thinking, why is he so <b><i>terrified</i></b> of you? Sure you are rivals but you have not done anything to him. Davy is a smart but careful person by nature, not a coward, just cautious.' + s,
			true, 'perDavy.other=7;perDavy.place=1000' + sj + ';dispPlace()'
		);
	}

	// Monique
	if (perM.place == 124) addQuestionC(md, 'talk to Monique', "Monique", 307);

	// Bar Person options
	if (perBarPerson !== undefined) {
		if (perBarPerson.other > 0) addQuestionC(md, 'tell ' + perBarPerson.getPersonName(true) + ' "I\'d like a scotch on the rocks, please."', perBarPerson.uid, 10801);
		if (perBarPerson.isCharmedBy()) {
			// Bambi is charmed
			if (!isDay() && !isPlaceKnown("DonnasRoom") && perDonna.isCharmedBy()) {
				addPopupLinkC(md, 'ask where is Donna\'s room', "Donna",
					perDonna.addPersonString("donna-hotel1.jpg", "height:max%", "right") +
					'You make your way into the Hotel and as you head to the bar where ' + perBarPerson.getPersonName(true) + ' is attending the customers you are greeted by Donna. Her face shines when she sees you and her face is mixed with joy and seriousness.<br><br>' +
					'"' + perYou.getPersonName() + '! Where the hell have you been? I haven’t seen you for a long time!", you hear worry and playfullness. She clearly knows you are busy, but she is happy whenever you visit the Hotel.<br><br>' +
					'"I’ve been having fun! You see, I turned some hot women into my slaves and have them bend over and fuck them regularly!", you joke. You wink at ' + perBarPerson.getPersonName(true) + ' who blows a kiss to your direction and continues her work.<br><br>' +
					'"Ohh You little ' + (perYou.isBornMale() ? 'bastard' : 'bitch') + '! That’s why you don’t visit! You are occupied by having your hands buried in pussy all the time!", Donna slaps your back while laughing. It’s good to see her again! She’s not stiff as your slaves who would never say such things. They would rather die than to offend you in the slightest bit.<br><br>' +
					'"Yep, it would be a perfect life, but there are some complications that annoy me. Like, there are people who want to destroy me….", you tell your tale in five minutes becoming a bit sentimental in the process. You mention Kurndorf and your beef with Davy. Donna listens like a good puppy, her mood shifts from cheerful to grave in a second. After you are finished, she grabs your hand and leads you to the stairs where her hotel room is.<br><br>' +
					'"I know what you need! A good striptease to kill those bad things in your head!", she smiles wickedly.<br><br>',
					false, "gotoPlace(185,'type=strip1')"

				);

			}

		}
		if (perDavy.other == 10 && perDavy.getQuestBlueBottle() > 0 && perKate.place != 124 && !isDavyDefeated() && perKurndorf.getQuestSeance() >= 50) {
			// Davy was seen headed to hotel and Blue Bottle Path Started
			addQuestionC(md, '"Have you seen Davy Robbins recently?"', perBarPerson.uid, 6010);
		}
		if (isConspiracyPath() && !perB.checkFlag(5) && perLauren.checkFlag(10) && perLauren.place != 269) addQuestionC(md, '"Do you have any fine wine?"', perBarPerson.uid, 1000);
	}

	// Tess options
	if (perTess.place == 124) {
		// Tess Adam's is here
		if (perTess.other == 13) addQuestionC(md, 'ask Tess "Have you found anything I\'d be interested in?"', "Tess", 2013);
		if (perTess.other == 14) addQuestionC(md, 'take Tess to a private room to discuss what she found', "Tess", 2014);
	}

	// Kate options
	if (perKate.place == 124) {
		startTimedEvent("KateConfrontsDavy()", 1);		// One action to stop her
		perDavy.place = 184;		// Move Davy here
		addLinkToPlace(md, 'stop Kate and work out a plan', 184, 'type=plan', '', '', "setPersonFlag('Kate',17);");
	}

	// Places to go
	if (perJesse.place == 8) addOptionLink(md, 'go to Room 113', 'GoRoom113()');
	else if (isDemonQuestDone()) addOptionLink(md, 'go to Room 113', 'GoRoom113()');
	if (perDavy.place == 184) {
		// Davy Path is in hotel room 101
		addLinkToPlace(md, 'go to Room 101', 184);
	}
	if (isPlaceKnown("DonnasRoom")) addLinkToPlace(md, 'go to Donna\'s room', 185);
	if (checkPlaceFlag("Hotel", 12)) addLinkToPlace(md, 'go to Room 205', 181);
	if (wherePerson("Jessica") == 183 && perB.checkFlag(17)) addLinkToPlace(md, 'go to Room 49', 183);
	
	// Places in the Hotel
	if (checkPlaceFlag("Hotel", 10)) {
		//Used the HOTEL Plans to enter the cellar
		addLinkToPlace(md, 'go down the stairs to the cellar', 161);
	}
	addLinkToPlace(md, 'go to the hotel pool', 269);
	addLinkToPlace(md, 'exit the hotel', 123);

	// People
	if (perB.isHere() || perMia.isHere() || (perJesse.place === 0 && !isNight()) || perDavy.place == 124 || perM.place == 124 ||perTess.place == 124 || perKate.place == 124)	{
		AddPeopleColumn();
		if (perB.isHere()) {
			var be = perB.checkFlag(16) ? "be" : "";
			if (!perB.isCharmedBy()) perB.showPerson("bambi8.jpg", "100%", "", "bambi11a.jpg");
			else perB.showPerson("bambi9.jpg", "100%", "", "bambi11b" + be + ".jpg");
		} else if (perMia.isHere()) {
			if (!perMia.isCharmedBy()) perMia.showPerson("mia-face.jpg", "100%");
			else perMia.showPerson("mia-facec.jpg", "100%");
		}
		if (perJesse.place === 0 && !isNight()) perJesse.showPerson("jesse1b.jpg", "100%", "", "jesse1.jpg");
		if (perDavy.place == 124) perDavy.showPersonFace("100%");
		if (perM.place == 124) perM.showPersonFace("100%");
		if (perTess.place == 124) perTess.showPersonFace("100%");
		if (perKate.place == 124) perKate.showPerson("kate5.jpg", "100%");
	}

	WritePlaceFooter(md);
}