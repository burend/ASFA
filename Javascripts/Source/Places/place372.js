// TV Station Halway

function ShowPlace372()
{
	var md = WritePlaceHeader();
	var perMom = findPerson("Mom");
	var perGabby = findPerson("Gabby");

	addPlaceTitle(md, "Radio/TV Station Hallway", "radio-corridor.jpg");

	md.write('<p>A basic hallway connecting the various studios and offices, nothing special.</p>');

	startQuestions();

	if (isDay()) {
		// Station is open
		if (perMom.place == 452) addLinkToPlace(md, "visit Mom at work", 372, '', 'Mom\'s office is... empty. That\'s strange, you know for sure that she is not back home, yet, but she appearently took the suitcase with her...</p><p>Maybe they are at Gabby\'s home on <b>11 Amaranth Pl</b>?', '', "setPlaceKnown('GabbysHouse')");
		else if ((perMom.place == 415) && (perGabby.checkFlag(26))) addLinkToPlace(md, "visit Mom at work", 372, '', "You can't bring yourself to show your face in there.");
		else if (perMom.place == 415) addLinkToPlace(md, "visit Mom at work", 415);
		addLinkToPlace(md, "return to reception", 371);
	} else {
		// Station is closed
		if (perMom.place == 452) addLinkToPlace(md, "look into Mom\'s office", 372, '', 'Mom\'s office is... empty. That\'s strange, you know for sure that she is not back home, yet, but she appearently took the suitcase with her...</p><p>Maybe they are at Gabby\'s home on <b>11 Amaranth Pl</b>?', '', "setPlaceKnown('GabbysHouse')");
		if (nMana < 2) addLinkToPlace(md, "hide somewhere within the studio until tomorrow", '', '', 'You -really- could have planned this better. The studio is still locked and without Mana you have no way to get outside, but lucky for you, it\'s a big place.</p><p>You find a quiet corner where no one would immediately find you and make sure to get out unnoticed the moment the studio opens', '', 'WaitforForDayNight();');
		addLinkToPlace(md, "return to reception", 372, '', 'The studio doors are locked and you cannot go there');
	}

	WritePlaceFooter(md);
}
