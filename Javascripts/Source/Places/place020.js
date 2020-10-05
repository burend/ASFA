function ShowPlace20()
{
	var md = WritePlaceHeader();
	var perKhan = findPerson("OfficerKhan");
	
	addPlaceTitle(md, "Dead " + perGates.getPersonName() + "\'s House", perYourBody.FindItem(4) === 0 ? "gatesroom2.jpg" : "gatesroom1.jpg");

	if (perKhan.getPath() < 2) {
		// haven't had Cheryl Khan drive you to police yet
		md.write('<p>The rear of the house is tastefully decorated.  You can hear police working several rooms away, though they\'re not currently searching this portion of the building.');
	}
	md.write('<p>The idea of Gate\'s body lying several rooms away give you the creeps.  Best not to linger long.</p>');

	startQuestions();
	if (perKhan.getPath() < 2) addLinkToPlace(md, "return to the crime scene", 65);
	addLinkToPlace(md, "exit the house", 16);

	WritePlaceFooter(md);
}