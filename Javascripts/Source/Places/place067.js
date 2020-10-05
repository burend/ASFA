function ShowPlace67()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Gates\' Attic", "attic1.jpg");

	md.write('<p>At the top of the stairs is an attic. A wheelchair is situated in the middle of the floor - otherwise it appears to be an empty room. After a search you notice a small leather bound diary.</p>');

	if (!perYou.checkFlag(4)) md.write('<p>The shadows of the room also reveal a small rustic stone on the floor, evidently misplaced long ago.</p>');

	startQuestions();
	addLinkToPlace(md, "read the diary", Place, 'type=readdiary');
	if (!perYou.checkFlag(4)) addQuestionCO(md, 'pick up the stone', "Misc", 1891);
	addLinkToPlace(md, "go down the stairs to " + perGates.getPersonNameShort() + "\'s secret stairway", 66);
	WritePlaceFooter(md);
}