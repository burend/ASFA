// Place: Strip Club - Jades Room

function ShowPlace280(stype)
{
	var bOpen = isShopOpen(-2, -2, true, true);
	var perJade = findPerson("Jade");
	
	var md = WritePlaceHeader(false, bOpen ? 'td-left-med' : '');		
	if (bOpen) perJade.showPerson("jade2.jpg");

	// TITLE LINE
	addPlaceTitle(md, "Jade's Room", bOpen ? "" : "dungeon.jpg");

	// Description
	if (bOpen) {
		md.write(
			'<p>Jade is sitting waiting for you to tell her what you want.</p>'
		);
	} else md.write('<p>The room is empty at this time of day.</p>');

	// Dialogue Options
	//**********************************************************************
	startQuestions();
	addLinkToPlace(md, "return to the main area of the club", 282);

	WritePlaceFooter(md);
}