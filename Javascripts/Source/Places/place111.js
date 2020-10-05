function ShowPlace111()
{
	var md = WritePlaceHeader();

	if (wherePerson("Mayor") === 0) movePerson("Mayor", 110); // Put the Mayor in her office

	addPlaceTitle(md, "Phone Message", getThemeFolder() + "phone2.png");

	md.write(
		'<p>You listen to the message on your machine.</p>' +
		'<p>"Hello," says a sweet voice. "This is Angela from the municipal office. Mayor Thomas is very keen to meet with you and asks that you come immediately to the town hall. Have a nice day."</p>'
	);
	
	startQuestions();
	addLinkToPlace(md, "go to the kitchen", 45);

	WritePlaceFooter(md);
}