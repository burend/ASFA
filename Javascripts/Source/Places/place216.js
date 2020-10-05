// Place: Park Bridge

function ShowPlace216()
{
	var md = WritePlaceHeader();
	
	var perKate = findPerson("Kate");

	addPlaceTitle(md, "Park Bridge", "park2.jpg");

	if (perYou.isShot()) {
		// Player has been shot
		md.write('<p>You enjoy the fresh air from the surrounding gardens and, for a moment, you forget about the pain in your shoulder.</p>');
	} else {
		// Other times
		md.write('<p>You enjoy the fresh air from the surrounding gardens as you cross the bridge over the river and leaving the park.</p>');
	}
	
	if (perKate.isHere()) {
		// Meet Kate?
		md.write('<p>You look around to see one of your friends, Kate, approaching from the far end of the bridge. Kate isn\'t known for her social skills, probably due to the fact she always has her head in school books, but she does know a lot about practically everything. She\'s in a hurry and hasn\'t seen you yet.</p>');
	}

	startQuestions();
	
	//  Meet Kate?
	if (perKate.place == 216) addLinkToPlaceC(md, "approach Kate", 4);

	if (nFromPlace == 47) {
		addOptionLink(md, "walk to the Hospital", 'LeaveKate4(215)');
		addOptionLink(md, "walk to the Park entrance", 'LeaveKate4(47)');
	} else {
		addOptionLink(md, "walk to the Park entrance", 'LeaveKate4(47)');	
		addOptionLink(md, "walk to the Hospital", 'LeaveKate4(215)');	
	}
	WritePlaceFooter(md);
}