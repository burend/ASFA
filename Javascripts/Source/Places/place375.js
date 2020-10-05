// Room 113

function GoRoom113()
{
	if (perJesse.getDemonPath() == 150) {
		perJesse.flags[0] = 0; //Reset the Dialogue Switch
		perJesse.setFlag(10);		// well not strictly needed but she has been introduced
	}

	if (perJesse.getDemonPath() < 500) perJesse.setFlag(1);	//Demon is still active, Set Jesse as "Distracted" when you walk in
	else perJesse.setFlag(1, false);

	perJesse.setFlag(5, false);  //Reset the "Distract her" so you can anoint set
	perJesse.setFlag(7, false);  //Reset the "playing with the thrall" for when v144>500
	gotoPlace(375); //Reset page to actual location
}

function ShowPlace375(stype)
{
	var md = WritePlaceHeader();

	var perLucy = findPerson("Lucy");

	var bDemonHere = perJesse.place == 8;

	/*  PICTURE REFERENCES */
	if (bDemonHere) {
		//Jesse is still here
		if (perJesse.checkFlag(5)) {
			//Told to "Enjoy herself"
			perLucy.showPerson("lucy12a.jpg");
			perLucy.showPerson("lucy12b.jpg");
			perLucy.showPerson("lucy12c.jpg");
		}	else if (perJesse.checkFlag(1)) {
			//Is she distracted
			perJesse.showPerson("jesse10.jpg");
		//}	else if (perJesse.checkFlag(6)) {
			//Waited for her to finish after "enjoying" herself
		//	perJesse.showPerson("jesse13.jpg");
		}	else perJesse.showPerson("jesse11.jpg");
	} else {
		// Demon Jesse is Gone, either left town or ill
		if (perJesse.getDemonPath() < 600 || isDemonGone()) {
			//just the Thrall now, Jesse is recovering or the Demon has fled the town
			perLucy.showPerson("lucythrall1.jpg");
		} else {
			// Jesse has recovered and the Thrall is here
			perJesse.showPerson("jesse22.jpg");
		}
	}

	// General Description
	// TITLE LINE
	addPlaceTitle(md, "Room 113 At the Broken Inn Hotel");

	/* Description */
	if (bDemonHere) {
		// The Demon is here with her Thrall
		if (perJesse.getDemonPath() < 500) {
			//Demon is still here
			md.write('<p>A familiar scent assails your senses as you step through the door.  Jesse must have been here for a while to have this strong of an effect without a potential victim to enthrall.  Or, perhaps she was simply preparing for <i>your</i> arrival.</p>');
		}
		if (perJesse.getDemonPath() == 150)	{
			perJesse.setDemonPath(151);
			md.write('<p>"So, ' + perYou.getPersonName() + '.  We know you have the artifact. We have been keeping our eyes on you. Do you have it with you?  May We have it?" she asks, her voice quickly developing a commanding tone. "Give it to Us," she demands, her arms idly playing with her latest thrall.</p>');

		} else if (perJesse.getDemonPath() < 500) {
			if (!perJesse.checkFlag(5)) {
				md.write(
					'<p>Jesse looks at you expectantly, her entire form almost seems to quiver in anticipation - conjuring images of a tiger about to pounce on its unsuspecting prey.</p>' +
					'<p>"Do you have it?" she asks.  "Give it to Us."</p>'
				);

			} else {
				md.write(
					'<p>"Not that We need <i>your</i> permission," she hisses, turning to her thrall.</p>' +
					'<p>The thrall begins to move in a hollow mockery of a strip tease. It\'s movements are awkward and filled with sudden jerks; a puppet with invisible strings. Jesse watches with a look of intense concentration on her face and her scent thick in the air. Directly manipulating her thrall, while obviously pleasurable, requires great focus on her part.</p>'
				);
			}
		}

	} else if (isDemonQuestDone()) {
		// Demon is trapped or gone
		if (perJesse.getDemonPath() == 500) {
			md.write('<p>Moments later, the locket falls to the floor as Jesse opens her eyes.  For the first time since the séance she is in control of her own body, her eyes no longer colored red with the demon\'s malice.  "Oh my god!" she gasps.  She runs to the bathroom, and you can here the sounds of retching.  You decide to leave her be, at least for the moment.  She\'s had a rough day.</p>');
		}
		if (perJesse.getDemonPath() == 900) {
			// Gave the relic to Jesse and the Thrall alone is here now
			md.write(
				'<p>The thrall that the demon left behind still hovers in the room her Mistress left her in.</p>' +
				'<p>She comes up to you and presses her warm body against you, and try as you might you can\'t help but become aroused when in its presence.</p>' +
				'<p>Only the eyes betray the otherworldly nature of what used to be a young woman - before the demon devoured her soul and turned her into this creature of pure sexual appitite.</p>'
			);
			if (perLucy.checkFlag(1)) {
				//Thrall wants to give you a stone
				md.write('<p>As she leans forward you notice she has something in her hand.  She holds it out to you as if presenting you with a offering in supplication.</p>');
			}
		} else if (perJesse.getDemonPath() < 600) {
			// Thrall only here (with ill Jesse)
			md.write(
				'<p>The thrall that the demon left behind still hovers in the room her Mistress left her in.</p>' +
				'<p>She comes up to you and presses her warm body against you, and try as you might you can\'t help but become aroused when in its presence.</p>' +
				'<p>Only the eyes betray the otherworldly nature of what used to be a young woman - before the demon devoured her soul and turned her into this creature of pure sexual appitite.</p>'
			);
			if (perLucy.checkFlag(1)) {
				//Thrall wants to give you a stone
				md.write('<p>As she leans forward you notice she has something in her hand.  She holds it out to you as if presenting you with a offering in supplication.</p>');
			}
			switch(perJesse.getDemonPath()) {
				case 501: md.write('<p>Jesse is still in the bathroom, the occasional sound of her retching can be heard.</p>'); break;
				case 504:
				case 502: md.write('<p>Jesse is still in the bathroom, and she is weakly washing herself.</p>'); break;
				case 503: md.write('<p>Jesse is still in the bathroom, a renewed bout of illness has stuck her.</p>'); break;
				default:  md.write('<p>Jesse is lying on a bed, awake but she does not seem to be paying any attention, lost in her illness and her memories of her time possessed.</p>'); break;
			}
			if (perJesse.getDemonPath() == 500) perJesse.setDemonPath(501); //Show this line only once
		} else if (perJesse.getDemonPath() >= 600) {
			// Jesse has recovered
			if (perJesse.getDemonPath() == 600) {
				// Jesse has recovered
				md.write(
					'<p>Jesse and her \'friend\' Lucy cheerfully greet with Jesse sating</p>' +
					'<p>"Hi, I was just starting to feel a little bored! What\'s going on?"'
				);
			} else {
				// Recovered, later visits
				md.write(
					'<p>Jesse and her \'friend\' Lucy cheerfully greet with Jesse sating</p>' +
					'<p>"Hi, I was just starting to feel a little bored! What\'s going on?"'
				);
			}
			if (perLucy.checkFlag(1)) {
				//Thrall wants to give you a stone
				md.write('<p>As she leans forward you notice she has something in her hand.  She holds it out to you as if presenting you with a offering in supplication.</p>');
			}
		}
	}

	/* Dialogue Options */
	//**********************************************************************
	startQuestions();

	addLinkToPlace(md, 'walk back to the bar', 124);
	addLinkToPlace(md, 'leave the hotel', 123);

	WritePlaceFooter(md);
}