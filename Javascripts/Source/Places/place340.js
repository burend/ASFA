// Jesse the Demon Temptation

function ShowPlace340()
{
	var md = WritePlaceHeader(false, "", "black");

	//  PICTURE REFERENCES
	perJesse.showPerson("jesse4.jpg");

	// General Description
	// TITLE LINE
	addPlaceTitle(md, "Jesse the Demon");

	/* Description */
	md.write(
		'<p>The creature that was once an innocent, beautiful young woman stand before you... Now every pore seems to be dripping with sex, the smell of it immediately assaulting your senses.</p>' +
		'<p>"Hello there little one..." she almost hisses in your direction. "You like this body, yesss?  Would you like to play with this body?  We would like to play with you... Oh yessss."</p>' +
		'<p>The closer she gets to you the stronger the smell becomes, soon beginning to overwhelm what little reason you may have had to resist her advances.  You can feel '
	);
	if (perYou.isMaleSex()) md.write('your member getting hard in anticipation, your desires rising to the surface.</p>');
	else md.write('your nipples getting hard and your panties quickly becoming soaked in anticipation, your desires rising to the surface.</p>');

	// Dialogue Options
	//**********************************************************************
	startQuestions();

	if (perJesse.getDemonPath() == 10) addQuestionC(md, 'ask her what you should call her', "Jesse", 14410);
	addLinkToPlace(md, "give in to the temptation and take Jesse up on her offer", 341);

	WritePlaceFooter(md);
}