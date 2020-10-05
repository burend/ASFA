// Witch's Prison

function ShowPlace193()
{
	var perJessica = findPerson("Jessica");
	if (perJesse.place == 161) perJesse.place = 193; // Place Jesse here permanently so she won't leave with you.
	var b2Cols = perJesse.place == 193;

	var md = WritePlaceHeader(false, b2Cols ? "td-left-small" : "td-left");
	var bLonely = perJessica.checkFlag(1) && !perJessica.checkFlag(7) && perJessica.checkFlag(6) && perJessica.other > 10 && perJesse.place != 193;
	if (bLonely) perJessica.showPerson("jessica1c.jpg", "height:max");
	else perJessica.showPerson(perJessica.checkFlag(1) ? "jessica1b.jpg" : "jessica1a.jpg", "height:max");

	var myName = perJessica.getYourNameFor();

	//********************** Description **********************
	addPlaceTitle(md, "Dungeon");
	md.write('<p>You pass through a magic door into a dungeon hidden under the hotel. ');
	if (bLonely) {
		perJessica.setFlag(7);
		md.write(
			'Jessica is sitting on a chair and looking up at you a little sadly. You ask her what is the matter, and she smiles a little,</p>' +
			'<p>"Welcome back ' + perJessica.getYourNameFor() + ', do not worry, I have been here too long, and you kind words before affected me. I was thinking about what could have been if I was not trapped here, and what could be if I can finally be freed."</p>' +
			'<p>You ask if there is anything you can do for her now, or just if she would like to talk. She smiles,</p>' +
			'<p>"Thank you again ' + perJessica.getYourNameFor() + ', please just do your best to find how to perform the summoning."</p>'
		);
	} else if (perJessica.checkFlag(1)) md.write('Jessica looks at you with a gentle smile, "Welcome back ' + perJessica.getYourNameFor() + '.". She seems to have altered her clothing for you.</p>');

	if (perJessica.other === 0)
	{
		md.write(
			'From the shadow and mist comes out a lady dressed in black. You are already feeling anxious just by standing there alone with her. She slowly eyes you up and down, her calm and otherworldy presence makes you even more afraid. She’s someone powerful who you don’t want to cross paths with in a bad way!</p>' +
			'<p>She\'s staying mostly in the darkness, but you can still make out her pale white face and red hair whose colour reminds you of blood. Her dress looks like something from the previous century. Maybe she knows something about Kurndorf? You have to be careful, though, because she could be a magic wielder too!</p>' +
			'<p>She\'s waiting patiently without a single word leaving her mouth, it looks like she wants you to make the first move.</p>'
		);

	}

	if (perJesse.place == 193) {
		md.write(
			'<p>Jessica exclaims, "Oh ' + myName + ', I knew that you would bring another for our séance. Lets get started, do you have the information we need?"</p>' +
			'<p>Jesse says "What you mean like with a Ouija Board and all that, sounds like fun!", and Jessica answers,</p>' +
			'<p>"Yes young lady, something like that. We need a person to play the part of the Medium, are you happy to do this for ' + myName + ' and myself?", and Jess laughs,</p>' +
			'<p>"That\'s funny, ' + myName + ' you said! Sure let\'s have some fun!"</p>'
		);
	}

	// *******************************************************************************
	startQuestions();

	if (!perJessica.checkFlag(5)) addQuestionC(md, 'ask her who she is', "Jessica", 1000);
	else {
		if (perJessica.other === 0) addQuestionC(md, 'ask Jessica if she is the witch from the legend', "Jessica", 12500);
		else {
			if (!perJessica.checkFlag(3)) addQuestionC(md, 'ask Jessica where you can find more mana', "Jessica", 12600);
			if (perJessica.other == 1) addQuestionC(md, 'ask Jessica why Kurndorf put her in this prison', "Jessica", 12502);
			else if (perJessica.other == 10) {
				startAlternatives(md);
				addQuestionC(md, 'ask how you could learn Kurndorf\'s spells', "Jessica", 12510);
				addQuestionC(md, 'ask how you can help free her', "Jessica", 12511);
				endAlternatives(md);
			}
		}
	}

	//Start of the Actual Séance
	// oyjrt == 11 Means witch is waiting for your return
	// perYourBody.FindItem(26) > 0 Means you Have the séance article
	// 121 == 6 means Jesse is HERE in the place
	if (perJessica.other == 11 && perJesse.place == 193 && perYourBody.FindItem(26) > 0) addQuestionC(md, 'say, "I have everything we need.  Let\'s get this séance started."', "Jessica", -2749);

	if ((perDavy.getQuestBlueBottle() == 10 || perDavy.getQuestBlueBottle() == 20) && perYourBody.FindItem(33) > 0) {
		// Have the blue bottle.
		addQuestionC(md, 'ask Jessica about the blue bottle', "Jessica", 5910);
	}

	addLinkToPlace(md, 'leave the dungeon', 161, '', '', '', "setPersonFlag('Jessica',6)");

	// Right column images
	if (b2Cols) {
		AddPeopleColumnMed();
		perJesse.showPerson("jesse1a.jpg");
	}

	WritePlaceFooter(md);
}