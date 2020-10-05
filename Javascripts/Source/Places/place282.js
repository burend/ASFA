// Place: Strip Club Inside

function ShowPlace282()
{
	var md = WritePlaceHeader();
	var bOpen = isShopOpen(-2, -2, true, true);
	if (!bOpen) return gotoPlaceDelayed(281, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The club closes and bouncer ushers you outside.');


	// TITLE LINE
	addPlaceTitle(md, "Avernus Club", bOpen ? "stripclub2.jpg" : "stripclub3.jpg");

	// Description
	if (bOpen) {
		md.write(
			'<p>The Avernus strip-club, a place you did not even know existed until recently. Invitation only, but hardly high-class! There is a theme for some of the items on the walls, a light BDSM feel, a whip, a mask, a photo of a light bondage scene, and so on. After all, you are aware the name "Avernus" is one of many names of Hell.</p>' +
			'<p>There are dancers on the main stage, but there are other girls around, some with light bondage fetish clothes.</p>'
		);
	} else md.write('<p>The Avernus strip-club, empty at this time of day.</p>');
	
	var perPerformer;
	if (perJade.other == "done") md.write('<p>The \'special\' performance is over for tonight, just the normal dancers are performing.</p>');
	else if (perJade.other != '') {
		if (perJade.other == "You") {
			perPerformer = perYou;
			md.write('<p>You are scheduled for a \'special\' performance a midnight tonight.</p>');
		} else {
			perPerformer = findPerson(perJade.other);
			md.write('<p>' + perPerformer.getPersonName() + ' is scheduled for a \'special\' performance a midnight tonight.</p>');
		}
	}

	// Dialogue Options
	//**********************************************************************
	startQuestions();
	if (perPerformer == perYou) addLinkToPlace(md, "wait for your dance", 282, 'type=clubdancing&who=you', '', '', 'passTimeMidnight()');
	else if (perPerformer != undefined) addLinkToPlace(md, "wait for " + perPerformer.getPersonNameShort() + "'s dance", 282, 'type=clubdancing&who=' + perPerformer.uid, '', '', 'passTimeMidnight()');
	if (bOpen) addLinkToPlace(md, "exit the Avernus Club", 281);
	else addTextForQuestions(md, "<b>the door is locked and you cannot leave the club</b>", "center");

	WritePlaceFooter(md);
}