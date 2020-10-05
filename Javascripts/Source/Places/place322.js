// Place: Catacombs

function GiveSkullFromCatacomb()
{
	if (perYourBody.NoItems == perYourBody.MaxItems && perYourBody.FindItem(57) === 0) {
		//Have 20 items and NO Skull
		WriteComments('You don\'t have enough room to carry any more items.  Make room and try again.');
	}	else {
		if (perYourBody.FindItem(57) === 0) perYourBody.PutItem(57, true);      //Put Skull in inventory if you don't already have it
		perKurndorf.setFlag(3); //You have Catacomb Skull
		WriteComments('<p>You pick up a skull from one of the recesses, feeling a bit creeped out, but you now have a skull.</p>');
		dispPlace();
	}
}

function ShowPlace322()
{
	var md = WritePlaceHeader();

	/* General Description */

	/* TITLE LINE */
	addPlaceTitle(md, "Catacombs", "catacombs2.jpg");

	/* Description */
	md.write(
		'<p>A maze of tunnels that haven\'t seen much use in over a century lie before you.</p>' +
		'<p>Everywhere you walk, you leave a footprint in the dust collecting on the floor.</p>'
	);

	/* Dialogue Options */
	//**********************************************************************
	startQuestions();
	//Not POSSESSED & Know about the ritual and don't already have Catacomb Skull
	if (!isPossess() && perKurndorf.getQuestGhost() >= 100 && perKurndorf.getQuestRitual() < 200 && !perKurndorf.checkFlag(3)) {
		addOptionLink(md, 'Search for a skull to use for the ritual', 'GiveSkullFromCatacomb()');
	}

	addLinkToPlace(md, 'go back to the church stores', 321);

	if (isPlaceKnown("ChurchTunnel") && !isPossess()) {
		// Know about the Church Tunnel && NOT POSSESSED
		addLinkToPlace(md, 'slip into the church tunnel', 323);
	}

	WritePlaceFooter(md);
}