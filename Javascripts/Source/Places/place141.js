// Place: Sacred Clearing

function PickUpPebble()  // Pickup the granite pebble
{
	var s = isDay() || sType === "" ? '' : 'You reach down to pick up a pebble, and as you do a ghostly hand reaches up out of the ground and tries to grab the pebble. You almost leap back in surprise, but the hand vanishes so you steel yourself to try again.</p><p>';

	if (perYourBody.FindItem(25) !== 0 && perYou.checkFlag(6) && perYourBody.FindItem(6) !== 0) WriteComments(s + 'The rustic stone you have glows, but otherwise nothing happens to the pebble. You drop the useless thing.');
	else {
		perYourBody.PutItem(6);
		perYou.setFlag(6, false);
		WriteComments(s + 'You place the pebble into the wooden box. The pebble transforms into a rustic stone.');
		dispPlace();
	}
}
function PickUpPebbleNoUse()  // Pickup the granite pebble
{
	var s = isDay() || getQueryParam("type") === "" ? '' : 'You reach down to pick up a pebble, and as you do a ghostly hand reaches up out of the ground and tries to grab the pebble. You almost leap back in surprise, but the hand vanishes so you steel yourself to try again. ';

	if (perYourBody.FindItem(25) !== 0 && !perYou.checkFlag(6)) {
		if (!isDay()) WriteComments(s + 'You reach down to pick up a pebble, and as you do a ghostly hand reaches up out of the ground and tries to grab the pebble pick up the pebble but you have no use for the stone, and the wooden box is closed. You casually throw it away.');
		else WriteComments(s + 'You pick up the pebble but you have no use for the stone, and the wooden box is closed. You casually throw it away.');
	} else {
		WriteComments(s + 'You pick up the pebble but you have no use for the stone, and nothing to put it in. You casually throw it away.');
	}
}


function ShowPlace141(stype)
{
	if (wherePerson("AdeleRoss") == 16) return dispPlace(21, 'type=sacred');

	if (!isPlaceKnown("SacredClearing")) setPlaceKnown("SacredClearing");  // Knows where to find Sacred Clearing

	var perVamp = findPerson("Vampyre");
	var perLauren = findPerson("Lauren");

	var bMonster = perVamp.isMonstersInSacredClearing() && !checkPlaceFlag("SacredClearing", 2);

	var md = WritePlaceHeader();

	if (bMonster && !bPopupShown) {
		// A monster attacks, game over!!
		setQueryParams("type=monster");		// To disable teleport spell and for saving
		AddImageRandom("monster", oImages.fixed.monsters, "height:max");
		addPlaceTitle(md, "<i>Too Thin</i> Sacred Clearing");
		md.write(
			//'<p>You enter the clearing and you can feel the magic permeating this place. You notice a moving figure, and you can sense the magic swirling around like it is charming the shape. Before you can react it is upon you, rending your flesh and your very soul.</p>' +
			//'<p>As the final darkness descends, you think you should have listened to Sarah\'s warning...</p>'
			'<p>The clearing is shrouded in an unusually thick fog as you enter it, but the distance between the tunnel and the Gates mansion is not that large, you tell yourself. Nothing will dare to get too close to the mansion and if you hurry, you will make it even during the night, right?</p>' +
			'<p>You step into the fog despite the nagging feeling that this is not a good idea and soon find yourself swallowed by darkness.</p>' +
			'<p>A foreboding sense of dread fills you, and as you turn around, you can see neither the entry to the tunnel nor the Gates mansion... have you really already moved away that far? Can this even be?</p>' +
			'<p>Your heart beats faster and you feel panic swell within you, until you suddenly hear the music.</p>' +
			'<p>Faint at first, far in the distance but clearly audible, alluring and quite... enthralling. You follow the melody without a second thought, and as you run deeper into the darkness strange shapes begin to surround you... you hear shuffling, growls, things getting closer, but you don\'t care. The song is what\'s important! So lovely, so wonderful, luring you deeper into the darkness, away from the mansion, away from those who might help you... but you don\'t need help! You need to find the source of the song! The creature whose lovely voice fills your mind and claims your very soul...</p>' +
			'<p>But you never reach her.</p>' +
			'<p>A ghostly figure appears in the distance, nimble, alluring, beckoning you closer with a seductive smile, but as you have nearly reached her, something tackles you to the ground and you sense other... things getting closer. Sharp teeth flash before your eyes and a sharp pain rushes through you, but the song is still there, even louder than before and soothing your final moments as you come to one last epiphany:</p>' +
			'<p>You should have listened to Sarah...</p>'
		);
		addRestartLink(md);

		WritePlaceFooter(md);
		return;
	}

	if (wherePerson("Kurndorf") == 16) movePerson("Kurndorf", 141);

	// Is Officer Khan following you to the clearing?
	var img = getPersonOther("OfficerKhan") == 11 ? "stones3a.jpg" : "stones3.jpg";
	if (wherePerson("Kurndorf") == 141) {
		addPlaceImage(md, img);
		md.write('<img src="Images/ghost2.png" style="float:left;position:absolute;width:50%;width:10vw; top:5; left:0;margin:0px 5px;border-style:none" alt="Ghost">');
		addBackgroundImage("Images/ghost2.png", "", nTheme === 0);
	}
	addPlaceTitle(md, "Sacred Clearing", wherePerson("Kurndorf") == 141 ? '' : img);

	if (wherePerson("Kurndorf") == 141) {
		// Ghost is here
		md.write(
			'<p>The ghost leads you between the groves of ' + perGates.getPersonName() + '\'s estate and you see a clearing. Stones circle the clearing and, from the markings on one of the stones, you believe that it is a sacred site of druids or witches.</p>' +
			'<p>The ghost seems brighter, more solid once it enters the clearing, but still ethereal. Again it gestures and you can see through some trees the side of the mansion and a door with large panes of glass in it.</p>' +
			'<p>The ghost approaches the door and you see it fade and flicker, and the way it is moving it seems to be a great effort for it to get close. It stops near to the wall and then holds up a hand, showing 4 fingers, then it closes one finger, waits, and closes another. The ghost is counting down, and looking at you expectantly. Unsure you approach it, and as it closes all fingers there is a shimmer and you see the door blur and become transparent. The ghost gestures forcefully at the door and you see the door starts to waver and slowly become more solid again.</p>'
		);

	} else {
		md.write('<p>Between the groves of ' + perGates.getPersonNameShort() + '\'s estate you see a clearing. Stones circle the clearing and, from the markings on one of the stones, you believe that it is a sacred site of druids or witches, and said to be the home of the fairy-folk.</p>');
		if (!isDay()) {
			md.write('<p>It is quite eerie here at night, the shadows seem to move in what light is available, once you were sure you saw a figure crouched on top of one of the stones, but it must have been your imagination, nothing was there when you looked again.</p>');
		}

		if (getPersonOther("OfficerKhan") == 11) {
			/* Is Officer Khan following you to the clearing? */
			md.write('<p>' + getOfficer() + ' Khan has followed you into the clearing. There is nobody else around in this secluded place.</p>');
		}

	}

	if (perLauren.checkFlag(10)) md.write('<p>You see through some trees the side of ' + perGates.getPersonNameShort() + '\'s Mansion.</p>');
	md.write('<p>Granite pebbles lie scattered on the ground, possibly weathered parts of the Stones.</p>');

	//**************************************************************
	startQuestions();

	if (wherePerson("Kurndorf") == 141) {
		addLinkToPlace(md, 'quickly jump through the door', 19);
		addLinkToPlace(md, 'ignore the ghost and go to the front of the estate', 141, 'type=banshee');

	} else {

		addOptionLink(md, 'enter ' + perGates.getPersonNameShort() + '\'s House', 'EnterMansion()');

		if (isPlaceKnown("Tunnel")) addLinkToPlace(md, 'go in the tunnel', 178);

		if (perYourBody.FindItem(25) !== 0 && perYou.checkFlag(6)) {
			/* Player has opened box and has no rustic stone */
			addOptionLink(md, 'pick up a granite pebble', 'PickUpPebble()');
		} else {
			/* Player has opened box and has no rustic stone */
			addOptionLink(md, 'pick up a granite pebble', 'PickUpPebbleNoUse()');
		}

		addLinkToPlace(md, "sit on a fallen stone for a while", '', '', 'You sit for a time on a cold stone', '', 'WaitHere(2);');
		addLinkToPlace(md, 'go to ' + perGates.getPersonNameShort() + '\'s estate', 16);
	}

	WritePlaceFooter(md);
}