// Place: Tennis Courts

function ShowPlace125(stype)
{
	var md = WritePlaceHeader();

	var perAunt = findPerson("Brandi");
	var clv = perAunt.getCharmedLevel();

	// Description
	addPlaceTitle(md, "Tennis Courts", isDay() && !isMorning() ? "tenniscourtb.jpg" : "tenniscourta.jpg");

	// Default/no event
	md.write(
		'<p>The hotel\'s tennis courts seem to be well equipped and in perfect condition. Guests and paying customers are permitted to play here, but the general public are not usually allowed access.</p>'
	);

	startQuestions();
	if (isDay()) addLinkToPlace(md, "sit on a bench for a while and watch a game", '', '', 'You kill some time for an hour, watching a game being played', '', 'WaitHereOnly(5);');
	else addLinkToPlace(md, "sit on a bench for a while", '', '', 'You kill some time for an hour,', '', 'WaitHereOnly(5);');

	addLinkToPlace(md, "return to the hotel bar", 124);


	WritePlaceFooter(md);
}