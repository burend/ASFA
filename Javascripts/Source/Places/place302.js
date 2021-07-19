// Place: Gina's Home

function ShowPlace302(stype)
{
	var md;

	var perG = findPerson("Gina");
	var clv = perG.getCharmedLevel();

	if (stype == "locked") {
		//Gina is NOT AT HOME and NOT POSSESSED and NOT CHARMED
		md = WritePlaceHeaderNI();
		showPopupWindow("Gina",
			"<img src='Images/door3.jpg' style='width:25%;float:right;margin-left:5px' alt='Gina\'s House'>" +
			'There is no answer at the door, there does not seem to be anyone at home. You are no burglar so there is no way in.',
			"gotoPlace(229)"
		);
		WritePlaceFooter(md);  // Gina is not home and door is locked
		return;

	}
	
	md = WritePlaceHeader();
	var myName = "";
	if (perG.place == 302) // Gina is HOME
	{
		if (isPossess("Gina")) {
			// Gina is POSSESSED
			perG.showPerson("!gina9.jpg");
		} else if (clv > 0) {
			// Charmed
			perG.showPerson("gina20.jpg");
			myName = perYou.getMaster();
		}	else if (perG.other < 10) {
			// Still wearing her Necklace
			perG.showPerson("gina7a.jpg");
			myName = "young " + perYou.getManWoman();
		}	else {
			// No necklace
			perG.showPerson("gina7.jpg");
			myName = "young " + perYou.getManWoman();
		}
	}	else {
		// Not here
		perG.showPerson("!gina9.jpg");
	}

	// Description
	addPlaceTitle(md, "2138 Rathdown Rd");
	if (stype == "visitorkickout") md.write('<p>You make some excuse about feeling ill and kick the guy out of Gina\'s house and body.<br>');
	else md.write('<p>Gina, the Museum Guard, calls this place home.  She seems to have made a pretty good life for herself here. <br> Of course it helps that she doesn\'t have any family or children to tie her down.<br>');

	if (perG.place == 302 && !isPossess("Gina")) // Gina is HOME && Not possessed
	{
		if (clv === 0) {
			// Normal
			if (isInvisible()) {
				//Invisible - meaning you just cast it in front of her
				md.write(
					'<p>Gina looks around, evidently very confused by the fact that you just <i>disappeared</i> right in front of her.</p>' +
					'<p>You hear her whisper under her breath.  "What the..."</p>'
				);
			}
			else {
				//Visible
				md.write(
					'<p>Gina looks up at you as you enter, evidently quite surprised to have a visitor.</p>' +
					'<p>"Excuse me, ' + myName + '," she says flatly.  "What do you think you\'re doing here?"</p>'
				);
				if (checkPlaceFlag("GinasHouse",5)) {
					//has thrown you out allready
					md.write('<p>"I told you last time," she says forcefully.  <b>"Get. Out."</b></p>');
				}
			}
		}	else {
			// Charmed
			if (isInvisible()) {
				//Invisible - meaning you just cast it in front of her
				md.write('<p>"But ' + myName + '," she asks with a look of confusion on her face as you disappear.  "Where did you go?  How can I serve you if I can not <i>see</i> you?"</p>');
			}	else {
				md.write(
					'<p>Gina looks up at you, a flash of lust and desire crossing her face.</p>' +
					'<p>"Hello ' + myName + '," she says with a hungry voice.  "Is there <i>anything</i> I can do for you?"</p>'
				);
			}
		}
	}
	else if (!isPossess("Gina")) {
		// Not Possessed
		md.write('<p>There doesn\'t seem to be anyone home at the moment.</p>');
	} else {
		// Possessed
		if (perG.extra[1] == 1) {
			// First time possessing her
			md.write('<p>You are in the living room of Gina&apos;s home, for some reason you feel cold.</p>');
			if (!checkPlaceFlag("GinasHouse", 4)) {
				// Cell phone message
				md.write('<p>Through an open door you see a bed with some clothes and a cell phone, flashing with a message.</p>');
			}
		} else md.write('<pYou are in the living room of Gina&apos;s home</p>');
	}
	//************************************************************************************

	startQuestions();

	// Gina is HOME
	if (perG.place == 302) {

		//  CHARMED OPTIONS
		if (!isPossess() && clv > 0) {
			addLinkToPlaceC(md, '"Prove your gratitude again, Slave."', Place, 'type=ginaxxx');

			perG.addSleepLink(md, "go to bed for the night with Gina", "Sleeping with Gina",
				'<p style="position:absolute;left:45%;bottom:2em;cursor:pointer;font-size:1.1em;width:50%">You tell you large breasted slave that you will be spending the night here tonight. Gina leads you to her bedroom, making no reply, aside from once you arrive stripping most of her clothes and positioning herself on the bed, ready for you.',
				"gina29.jpg", true
			);
		}
	}

	addLinkToPlace(md, 'go to the bathroom', 303);
	if (!isPossess()) {
		//Possession spell is NOT CAST
		addLinkToPlace(md, 'leave the house', 229);
	} else if (perG.extra[1] == 1) {
		if (!checkPlaceFlag("GinasHouse", 4)) addQuestionR(md, 'check the message', 'You see the message is from an id Biker1 and it is just saying that they are running late and will be another half an hour.', 'Gina', "setPlaceFlag(\\'GinasHouse\\', 4, true);");
	}

	WritePlaceFooter(md);
}