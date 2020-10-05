// Event: Take Bambi to her room - NOT Charmed

function ShowPlace133()
{
	var md = WritePlaceHeader();
	
	var perBambi = findPerson("Bambi");

	if (perBambi.isCharmedBy())  {
		// If Bambi is Charmed
		return dispPlace(182);
	}
	perBambi.showPerson("bambi1.jpg");

	addPlaceTitle(md, "Meeting Bambi");

	md.write(
		'<p>The barmaid escorts you to her hotel room, then excuses herself to freshen up. When she returns she is the icon of beauty.</p>' +
		'<p>&quot;You have made the right decision, ' + perYou.getPersonName() + '&quot; she says as softly as the wind. ' +
		'&quot;Not many people in this town can afford my company, especially students.&quot;</p>' +
		'<p>You gulp. &quot;I think that I did as well Miss Bambi. Where do we start?&quot;</p>');

	startQuestions();
	addLinkToPlaceC(md, '"Do... do we make love now?"', 134);
	addLinkToPlace(md, "go to the hotel bar", 124);

	WritePlaceFooter(md);
}