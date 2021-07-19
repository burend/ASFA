// Place: Ross home, living room

function ShowPlace436()
{
	var perAdele = findPerson("AdeleRoss");
	var perCatherine = findPerson("Catherine");
	var bAdeleHere = perAdele.isHere();
	
	if (perCatherine.isHere() && !bAdeleHere && !perAdele.checkFlag(6)) return gotoPlaceDelayed(37, '', '<img src=\"UI/knock.png\" style=\"float:left;width:10%"><br>The house is securely locked, there might be someone home but there is no answer to the door or to their phones.');

	var md = bAdeleHere ? WritePlaceHeaderNI() : WritePlaceHeader();

	addPlaceTitle(md, "Ross Home Living Room", "livingroom5.jpg");
	md.write('<p>Amy and Catherine live in a lovely old house. You are now in the living room, it is very clean and stylish.</p>');
	
	startQuestions();
	if (perAdele.checkFlag(6)) {
		addLinkToPlaceC(md, 'visit Amy\'s room', 437);
		if (perCatherine.isHere()) addLinkToPlaceC(md, 'visit Catherine\'s room', 438);
		else addLinkToPlaceC(md, 'visit Catherine\'s room', 436, '', 'Catherine is not here now and there is little reason to enter her room without her');
	}
	if (perAdele.getCharmedLevel() == 4) addLinkToPlaceC(md, 'visit Adele\'s room', 439);
	addLinkToPlace(md, "leave the house", 37);
	
	if (perAdele.checkFlag(6) && perCatherine.isHere()) {
		AddPeopleColumnMed(md);
		perCatherine.showPerson(perCatherine.isCharmedBy() ? "catherine-watching1c.jpg" : "catherine-watching1.jpg");
	}

	WritePlaceFooter(md);
}
