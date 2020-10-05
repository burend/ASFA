function ShowPlace137()
{
	var md = WritePlaceHeader();

	findPerson("Bambi");
	per.showPerson("bambi5.jpg");

	addPlaceTitle(md, "Bambi Under a Spell");

	md.write(
		'<p>"That\'s right, Bambi, take off your clothes. You belong to me now and I\'m not going to pay a cent for you."</p>' +
		'<p>"Whatever you say," she replies. "I need it so bad ' + perYou.getPersonName() + ' I need you to fuck me. Please!"</p>'
	);

	startQuestions();
	addLinkToPlace(md, "fuck Bambi", 138);

	WritePlaceFooter(md);
}