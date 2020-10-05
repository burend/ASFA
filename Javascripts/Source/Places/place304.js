// Place: Museum Security Room

function ShowPlace304()
{
	var md = WritePlaceHeader();

	var perG = findPerson("Gina");
	var myName = perYou.getMaster();

	if (perG.isCharmedBy() && perG.place === 0 && !isPossess("Gina")) {
		// Gina CHARMED and @ Museum
		perG.showPerson("gina12.jpg");
	} else {
		setPlaceFlag("Museum", 8);
		perG.showPerson("!gina5.jpg");
	}

	addPlaceTitle(md, "Museum Security Room");

	md.write('<p>Normally, this would be one of those places that would be more than a little "off limits".</p>');

	if (isPossess("Gina")) md.write('<p>Being able to <i>possess</i> people and make them do anything you want does have its privileges...</p>');
	else if (checkPlaceFlag("Museum", 8) || perG.isCharmedBy()) md.write('<p>Being able to <i>enslave</i> people and have them willingly do anything you want does have its privileges...</p>');

	if (perG.place === 0 && !isPossess() && perG.isCharmedBy()) //Gina is HERE and NOT POSSESSED
	{
		md.write('<p>Your Slave, Gina, quickly begins to remove her clothing as you enter the room. "Hello ' + myName + '," she says, her voice dripping with desire and submission.  "How can I ever thank you enough for enslaving me?  You have made my life complete.  I only hope that I may somehow be able to repay your kindness."</p>');
	}
	if (whereItem(42) == 303) md.write('<p>Evidently Gina left a note for the Mayor on the security desk.</p><br>');

	//**********************************************************************************
	startQuestions();

	if (perG.isCharmedBy() && perG.place === 0 && !isPossess()) {
		addLinkToPlaceC(md, '"Show me your gratitude again, Slave."', Place, 'type=ginaxxx');
	}

	addLinkToPlace(md, 'leave the room', 239);

	WritePlaceFooter(md);
}