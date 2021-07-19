// Place: Aquarium Kelp Forest

function ShowPlace362()
{
	var md = WritePlaceHeader();

	// TITLE LINE
	addPlaceTitle(md, "The Kelp Forest", "aquarium2.jpg");

	// Description
	md.write('<p>This display is a blatant knock-off from the one in California, but that doesn\'t keep it from being a Glenvale favorite.</p>');
	if (isShopOpen(2, 0, true)) md.write('<p>There are always people milling about in front of the displays - watching as the kelp sways slightly in the simulated waves as all the little fish swim around.</p>');
	else md.write('<p>There are usually people milling about in front of the displays - watching as the kelp sways slightly in the simulated waves as all the little fish swim around, but not now.</p>');

	// Dialogue Options
	//**********************************************************************
	startQuestions();
	addLinkToPlace(md, "sit and watch the kelp", '', '', 'You sit for a while, almost mesmerised by the swaying kelp', '', 'WaitHere(5);');

	addLinkToPlace(md, 'visit the Front Hall', 361);
	addLinkToPlace(md, 'visit the Oceans of the World display', 363);
	if (isShopOpen(2, 0, true)) addLinkToPlace(md, 'leave the Aquarium', 360);
	else addTextForQuestions(md, "<b>The doors of the Aquarium are locked</b>", "center");

	WritePlaceFooter(md);
}