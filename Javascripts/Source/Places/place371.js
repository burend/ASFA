// TV Station

function ShowPlace371()
{
	var md = WritePlaceHeader();

	var perMom = findPerson("Mom");

	if (sType !== "byesuitcase2" && !isShopOpen()) {
		addPlaceTitle(md, "Radio/TV Station Reception", "radioreception.jpg");
		if (!isDay()) {
			// Night visit
			md.write(
				'<p>The reception area of the TV and Radio Station is not staffed at night. There are few people around in this part of the building.</p>' +
				'<p>The hallway into the office area is locked at this time of night.</p>'
			);
		} else {
			// Otherwise closed
			md.write(
				'<p>The reception area of the TV and Radio Station is not staffed at the moment. There are few people around in this part of the building.</p>' +
				'<p>The hallway into the office area is locked when the reception is not staffed.</p>'
			);			
		}
		startQuestions();

	} else {
		// Daytime
		var perNina = findPerson("Nina");
		var perMadison = findPerson("Madison");
		var nNinaCharm = perNina.getCharmedLevel();

		/****************************************************************
		Nina (Tv Reception)
		****************************************************************/
		if (nNinaCharm === 0) perNina.showPerson("nina1.jpg");
		else perNina.showPerson("nina9.jpg");

		// General Description
		addPlaceTitle(md, "Radio/TV Station Reception");

		// Description
		if (!perNina.checkFlag(1)) {
			//Haven't introduced yourself yet
			md.write('<p>The sound of bells signals your entrance into the building.  A lovely young lady is sitting at the reception desk, chatting on the phone.  She doesn\'t look up.</p>');
		}
		else if (nNinaCharm === 0) md.write('<p>Nina is still chatting on the phone.</p>');
		else {
			md.write('<p>The sound of the door bells lets Nina know that someone is there.');
			if (isVisible()) {
				md.write(
					'Seeing that it\'s you, she leans on her desk and smiles.  She\'s no longer wearing panties.</p>' +
					'<p>Now she doesn’t hang on the phone like she used to do, instead she’s trying to prove her worth to you by throwing herself at your feet and nagging you by always asking questions or telling you ideas how she could serve. She’s still really annoying, so if you have some freetime you should train Nina to be your personal whore rather than a disturbing bimbo who she is at the moment!'
				)
			}
			md.write('</p>');
		}

		// Dialogue Options
		//**********************************************************************
		startQuestions();

		if (perMadison.isCharmedBy()) addLinkToPlaceC(md, 'ask to see Madison', 412, 'enter=true');
		else if (perYou.checkFlag(2)) {
			// Stereo was delivered damaged and you did not charm Madison
			addLinkToPlaceC(md, 'ask to see the person who delivered your prize', 413, 'enter=true');
		} else if (wherePerson("Diane") == -1) addLinkToPlaceC(md, 'ask to see Madison', 413, 'enter=true');
		
		// Common questions (day and night)
		if (perMom.place == 415) addLinkToPlace(md, "go to the office hallway", 372);
	}


	addLinkToPlace(md, "leave the station", 359);

	WritePlaceFooter(md);
}