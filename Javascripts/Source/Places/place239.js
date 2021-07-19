// Place: inside Museum Room 2

function ShowPlace239()
{
	var md = WritePlaceHeader();
	var perGina = findPerson("Gina");

	if (!isShopOpen(2, 0, true) && !isPlaceBreakIn("Museum") && !perGina.isCharmedBy() && !isPossess()) {
		if (!perGina.isCharmedBy()) return gotoPlaceDelayed(9, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The Museum closes and the security guard makes sure everyone leaves.');
	}

	if (perYou.getQuestRustyKey() == 5) perYou.setQuestRustyKey(7);	// Advance the "Rusty Key" Path

	addPlaceTitle(md, "Museum Main Hall", "museumroom-main1.jpg");

	md.write('<p>Artifacts of ancient times fill the rooms of the small but elegantly-attired museum.</p><p>This is the central hall giving access to all the other areas of the museum.</p>');

	if (!isPlaceKnown("Aquarium")) {
		md.write('<p>You notice a sign advertising the newly refurbished Glenvale Aquarium, a new annex of the museum. You note the directions to visit the new attraction, it is outside the museum proper in a separate building.</p>');
		setPlaceKnown("Aquarium");
	}
	if (!checkPlaceFlag("Museum", 8) && perGina.isCharmedBy()) md.write('<p>You see your slave Gina waving to you and gesturing towards a door, the security office it seems.</p>');
	
	startQuestions();
	addLinkToPlace(md, 'examine the museum safe', 244);
	addLinkToPlace(md, 'check the local history exhibits', 240);
	addLinkToPlace(md, 'check the other exhibits', 242);
	if (checkPersonFlag("Lola", 4) && per.whereNow() == 243) addLinkToPlace(md, 'enter the Curator\'s office', 243);

	// Is POSSESSION SPELL CAST
	if (isPossess()) {
		// Yes, Options ONLY IF Possession is CAST
		addLinkToPlace(md, 'check out the Security Office', 245);
	} else {
		// No, not possessing anyone
		//Have met Gina and she's AT the Museum?
		if (perGina.other > 0 && perGina.place === 0 && !perGina.isCharmedBy()) addLinkToPlace(md, 'approach the security guard', Place, 'type=approachgina');
		// Know where the security office is
		if (checkPlaceFlag("Museum", 8) || perGina.isCharmedBy()) addLinkToPlace(md, 'check out the Security Office', 245);

		// Only get EXIT option if possession spell NOT CAST and the museum is open
		if (isShopOpen(2, 0, true)) addLinkToPlace(md, 'exit the museum', 238);
		else addTextForQuestions(md, "<b>The doors of the Museum are locked</b>", "center");
	}

	WritePlaceFooter(md);
}