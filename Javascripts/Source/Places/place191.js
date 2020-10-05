// Gates Safe (Murder Path)

function ShowPlace191()
{
	var md = WritePlaceHeader();

	if (perYou.getQuestAftane() < 10) addPlaceImage(md, "safe-closed.jpg");
	else addPlaceImage(md, "safe-open.jpg");
	
	/* TITLE LINE */
	addPlaceTitle(md, "Gates Family Safe");

	/* Description */
	md.write('<p>You see a small safe, relatively unmentionable... aside from the fact that you don\'t know where the key is nor does Sarah.  However will you get it open?</p>');

	if (perYou.getQuestAftane() < 10) md.write('<p>The safe seems to be stuck, or shall we say... locked...  shut.</p>');
	else md.write('<p>The safe seems to have just "popped" open...</p>');

	//**********************************************************************
	startQuestions();
	addLinkToPlace(md, "revisit Sarah in the main room", 192);

	WritePlaceFooter(md);
}