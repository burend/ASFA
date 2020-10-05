// Place: Hospital Morgue

function ShowPlace441()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Hospital Morgue", "hospitalmorgue.jpg");

	md.write("<p>The morgue, used for all deaths in Glenvale. This is one creepy place that you cannot wait to leave.</p>");

	if (wherePerson("Sarah") > 0 && isMurderPath()) {
		if (perGates.other == 600) md.write("<p>Nervously you notice one of the drawers is labeled '" + perGates.getPersonName() + "'.</p>");
		else md.write("<p>With some guilt you notice one of the drawers is labeled '" + perGates.getPersonName() + "'.</p>");
	}
	if (getPersonOther("Anita") == 901) md.write("<p>You have mixed feelings when you see the drawer labeled 'Anita (unknown last name)'.</p>");
	if (getPersonOther("Diane") == 900 && wherePerson("Diane") == 441) md.write("<p>You are troubled to see the drawer labeled 'Diane White'.</p>");
	if (getPersonOther("OfficerSmith") == 900 && wherePerson("OfficerSmith") == 441) md.write("<p>You are troubled to see the drawer labeled '" + getOfficer() + " Becky Smith'.</p>");

	startQuestions();

	addLinkToPlace(md, 'exit the morgue', 442);

	WritePlaceFooter(md);
}