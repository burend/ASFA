// Mayor Thomas shoots you

function ShowPlace991(stype)
{
	var md = WritePlaceHeader();

	perYou.health = 0;		// Dead
	perYourBody.DropItem(4, "Mayor");

	findPerson("Mayor").showPerson("mayor6a.jpg");

	addPlaceTitle(md, "Shot!");

	md.write(
		'<p>You hand the book to the mayor, who snatches it away. Before you can respond a bullet strikes you in the chest, then ' +
		'penetrates out the other side of your body, taking ribbons of flesh with it. You can\'t believe that after all this play the ' +
		'game has ended this way. Your life ebbs away and all you can think of is revenge in the afterlife.</p>' +
		'<p>Better luck next time...</p>'
	);

	addRestartLink(md);
	WritePlaceFooter(md);
}