// Apartment building foyer

function ShowPlace456()
{
	var md = WritePlaceHeader(false, 'td-left-large');

	addPlaceTitle(md, "Apartment Building", "apartments1-foyer.jpg");

	setPlaceBreakIn("Apartments", false);
	setPlaceKnown("Apartments");  // Set the Apartments as known

	md.write('<p>The foyer of the apartment building, surprisingly clean and well maintained.</p>');

	startQuestions();
	if (isPlaceKnown("CamrynsApartment")) addLinkToPlace(md, 'visit Camryn\'s apartment', 457);
	if (isPlaceKnown("MiasApartment")) {
		if (wherePerson("Mia") == 458) addLinkToPlace(md, 'visit Mia\'s apartment', 458);
		else addLinkToPlace(md, "visit Mia's apartment", 456, '', 'There is no answer at the bell, she is probably not home.');
	}
	if (isPlaceKnown("AbbysApartment")) {
		if (wherePerson("Abby") == 459) addLinkToPlace(md, 'visit Abby\'s apartment', 459);
		else addLinkToPlace(md, "visit Abby's apartment", 456, '', 'There is no answer at the bell, she is probably not home.');
	}
	if (isPlaceKnown("AngelasApartment")) {
		if (wherePerson("Angela") == 460) addLinkToPlace(md, 'visit Angela\'s apartment', 460);
		else addLinkToPlace(md, "visit Angela's apartment", 456, '', 'There is no answer at the bell, she is probably not home.');
	}
	if (isPlaceKnown("EmilysApartment")) {
		if (wherePerson("Emily") == 461) addLinkToPlace(md, 'visit Emily\'s apartment', 461);
		else addLinkToPlace(md, "visit Emily's apartment", 456, '', 'There is no answer at the bell, she is probably not home.');
	}
	if (isPlaceKnown("NinasApartment")) {
		if (wherePerson("Nina") == 462) addLinkToPlace(md, 'visit Nina\'s apartment', 462);
		else addLinkToPlace(md, "visit Nina's apartment", 456, '', 'There is no answer at the bell, she is probably not home.');
	}
	if (isPlaceKnown("LouisesApartment")) {
		if (wherePerson("Louise") == 463) addLinkToPlace(md, 'visit Louise\'s apartment', 463);
		else addLinkToPlace(md, "visit Louise's apartment", 456, '', 'There is no answer at the bell, she is probably not home.');
	}	
	if (isPlaceKnown("AlisonsApartment")) {
		if (wherePerson("Alison") == 464) addLinkToPlace(md, 'visit Alison\'s apartment', 464);
		else addLinkToPlace(md, "visit Alison's apartment", 456, '', 'There is no answer at the bell, she is probably not home.');
	}	
	if (isPlaceKnown("MadisonsApartment") && !isPersonHere("Madison")) {
		if (wherePerson("Madison") == 465) {
			if (isCharmedBy("Madison")) addLinkToPlace(md, 'visit Madison\'s apartment', 465);
			else addLinkToPlace(md, 'knock on Madison\'s door', 465, 'type=madisonknock');
		} else addLinkToPlace(md, "visit Madison's apartment", 456, '', 'No one answers the door, you suspect that Madison is at work.');
	}
	if (isPlaceKnown("ZoeysApartment")) {
		if (wherePerson("Zoey") == 466) addLinkToPlace(md, 'visit Zoey\'s apartment', 466);
		else addLinkToPlace(md, "visit Zoey's apartment", 456, '', 'There is no answer at the bell, she is probably not home.');
	}
	if (isPlaceKnown("JennysApartment")) {
		if (wherePerson("Jenny") == 467) addLinkToPlace(md, 'visit Jenny\'s apartment', 467);
		else addLinkToPlace(md, "visit Jenny's apartment", 456, '', 'There is no answer at the bell, she is probably not home.');
	}	
	if (isCharmedBy("Sharon")) {
		if (wherePerson("Sharon") == 468) addLinkToPlace(md, 'visit Sharon\'s apartment', 468);
		else addLinkToPlace(md, "visit Sharon's apartment", 456, '', 'There is no answer at the bell, she is probably not home.');
	}

	addLinkToPlace(md, 'leave the apartment building', 455);

	WritePlaceFooter(md);
}