// Kurndorff Coffin

function GiveSkull()
{
	if (perYourBody.NoItems == perYourBody.MaxItems && perYourBody.FindItem(57) === 0) {
		//Have 20 items and NO Skull
		WriteComments('You don\'t have enough room to carry any more items.  Make room and try again.');
	} else {
		if (perYourBody.FindItem(57) === 0) perYourBody.PutItem(57, true);      //Put Skull in inventory if you don't allready have it
		perKurndorf.setFlag(1); //You have Kurndorf's skull
		dispPlace();
	}
}

function ShowPlace248()
{
	var md = WritePlaceHeader();

	if (perKurndorf.checkFlag(1)) md.write('<img src="Images/coffin2.jpg" style="margin:0px 5px;border-style:solid;border-width:2px" width="190" height="222" alt="Coffin">');
	else md.write('<img src="Images/coffin1.jpg" style="margin:0px 5px;border-style:solid;border-width:2px" width="190" height="222" alt="Coffin">');

	// Apprentice Path && Don't Already have the Box (in room, or inventory)
	if (!isMurderPath() && isItemNotHere(25, 46)) moveItem(25);

	addPlaceTitle(md, "The Coffin");

	md.write('<p>Inside the coffin are the remains of Kurndorf, the evil of Glenvale. His skeleton burns with a fierce magic that you fear to touch.</p>');

	if (whereItem(25) == 248) md.write('<p>A small wooden box lies in the coffin beneath his feet.  It seems simple enough: barely decorated but there is still something odd about it.</p>');

	//*******************************************************************
	startQuestions();

	if (perKurndorf.getQuestGhost() >= 100 && perKurndorf.getQuestRitual() < 200 && !perKurndorf.checkFlag(1)) {
		///Know about the ritual and don't already have Kurndorf's Skull
		addLinkToPlace(md, 'Carefully remove Kurndorf\'s skull', 248, '', '', '', 'GiveSkull()');
	}
	addLinkToPlace(md, 'look around the crypt?', 247);

	WritePlaceFooter(md);
}