// Bad End - Possessed during Seance

function ShowPlace997()
{
	perYou.setFlag(31);
	
	var md = WritePlaceHeader();

	addPlaceTitle(md, "The End Of the Road", "crypt1.jpg");

	md.write(
		'<p>You find yourself trapped within your own body as the spirit of Carl Kurndorf ' +
		'slips in through your mouth and quickly takes total control.</p>' +
		'<p>The Witch had warned you...  <i>"Even in death Kurndorf is dangerous,"</i> she said.</p>' +
		'<p>If only you had listened...  If only you had found some way of protecting yourself from ' +
		'his influence.  Surely there must have been some spell or artifact that could have shielded you ' +
		'from him once he had been summoned.</p>' +
		'<p>But its too late now.  Within your body your soul cringes at the thought of the evil ' +
		'you have just unleashed upon the world.  And from somewhere within you can hear the ' +
		'evil laughter of the Warlock as he stretches the limbs of his new body.</p>'
	);

	addRestartLink(md);
	WritePlaceFooter(md);
}