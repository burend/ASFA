// Beasley's Office, phone message

function ExitPhoneMessage()
{
	var perB = findPerson("Mr Beasley");
	if (!perB.checkFlag(5))	{
		// Davy's Message was Deleted
		perB.setFlag(5);
	}
}

function ShowPlace159()
{
	var md = WritePlaceHeader();

	moveDavyToHotel1();

	var myName = perYou.getPersonName();
	var HisHer = perYou.getHisHer();
	var HeShe  = perYou.getHeShe();
	var HimHer = perYou.getHimHer();

	addPlaceTitle(md, "Davy\'s Telephone Message", getThemeFolder() + "phone2.png");
	md.write('<p>You listen to the telephone message. It is Davy Robbins\' voice.</p>');

	if (isMurderPath()) // Gates Dead
	{
		md.write('<p>"Beasley," the message begins. "' + perGates.getPersonNameShort() + ' is dead and the police are looking for you. Someone tipped them off about your argument with ' + perGates.getPersonNameShort() + ', so they think you are the murderer. I know it\'s not true because I brought several people under my control. The taxi driver was especially useful: he tipped me off that he drove that idiot ' + myName + ' to the Gates estate. I remembered what you told me about ' + myName + ' asking about the book so I turned ' + HisHer + ' sister into my slave. ' + myName + '\'s clothes were covered with blood when ' + HeShe + ' returned home and ' + HeShe + ' was carrying something large in ' + HisHer + ' bag."</p>');
		if (perGates.other == 600) md.write('<p>You pause the message to catch your breath. Davy is trying to frame you for what his woman did! It might not be long before the police are told. You play the message along.</p>');
		else md.write('<p>You pause the message to catch your breath. If Davy knows about what you have done then it might not be long before the police are told. You play the message along.</p>');
		md.write('<p>Davy\'s voice continues, "We must not let anyone find out about the magic. I have charmed several people including the mayor. They will do whatever they can to rescue the book from ' + myName + ' and they will keep everything quiet. I am scared to go near ' + myName + ' in case ' + HeShe + ' uses the magic against me. I have no mana left so I am going to the Broken Inn Hotel to look for some more. I\'ll meet you there."</p>');
	}
	else
	{
		md.write(
			'<p>"Beasley," the message begins. "I got your message about ' + myName + ' asking questions about magic.  I\'ve looked into it and I think Mr Gates may have found the "apprentice" he was looking for."  There is a pause in Davy\'s voice as if he\'s not sure how to continue.  "I brought several people under my control to find out what ' + HeShe + '\'s been up to. The taxi driver was especially useful.  He tipped me off that he drove that idiot ' + myName + ' to the Gates estate.  Just to be sure, I also turned ' + HisHer + ' sister into my slave to keep an eye on ' + HimHer + ' at home.  The sister told me that ' + HeShe + ' was carrying something large in ' + HisHer + ' bag when he came home."</p>' +
			'<p>Davy\'s voice continues, "We must not let anyone find out about magic or that book. I have charmed several other people in town.  I tried to get the mayor but she wasn\'t in her office and I didn\'t have the time to wait for her.  I\'ve instructed all of them to do whatever they can to get the book from ' + myName + ' and they will keep everything as quiet as possible." He pauses for a moment again.</p>' +
			'<p>"I am scared to go near ' + myName + ' in case ' + HeShe + ' tries to cast a spell on me. I have no mana left so I am going to the Broken Inn Hotel to look for some more. I\'ll meet you there."</p>'
		);
	}

	startQuestions();

	var perB = findPerson("Mr Beasley");
	if (!perB.checkFlag(5)) {
		addListenMessage(md,'<p>You delete Davy\'s telephone message and hang up the phone.</p>',
			'', 
			"ExitPhoneMessage();Place=11",
			'delete the message'
		);
	}
	addLinkToPlace(md, "hang up the telephone", 11);

	WritePlaceFooter(md);
}