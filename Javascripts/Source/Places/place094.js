// Place: Outside City Hall

function ShowPlace94()
{
	var md = WritePlaceHeader();
	
	var perAngela = findPerson("Angela");
	var perMayor = findPerson("Mayor");
	
	setPlaceBreakIn("TownHall", false);
	if (perAngela.isCharmedBy()) perAngela.setFlag(2);
	if (perMayor.isCharmedBy("You")) perMayor.setFlag(3);
	
	if (!isPlaceKnown("Hotel")) setPlaceKnown("Hotel");							// Access to Hotel

	addPlaceTitle(md, "Glenvale Town Hall", "cityhall1.jpg", 25);

	if (perAngela.isCharmedBy() && perMayor.isCharmedBy("You")) {
		md.write(
			'<p>Glenvale’s town hall proudly stands as a symbol of your power and authority. Not from the outside, as it still looks the same fifty-four years old building as always. ' +
			'Instead, what’s inside of it changed that matters. Mayor Beatrice Thomas has had a change of heart recently and decided to become your slave. ' +
			'Her secretary, Angela, also joined her. The town hall is officially one of your strongholds, with your slaves working for you tirelessly inside it.</p>'
		);
	} else {
		md.write(
			'<p>Glenvale\'s town hall proudly stands as a symbol of unity in the community. Only fifty-four years old, the building has been occupied ' +
			'by many of the finest council management officials, including the current Mayor Beatrice Thomas. Just passing by the town ' +
			'center gives you a comfortable feeling of security and reliability.</p>'
		);
	}
	
	if (!isShopOpen(0)) md.write('<p>The town hall has a sign noting that it is closed, hours of business 8am to 6pm Monday to Friday.</p>');

	// Dialogue Options
	startQuestions();
	if (isShopOpen(0)) {
		if (checkPersonFlag("Angela", 6) && !checkPersonFlag("Mayor", 4)) addLinkToPlace(md, "enter the Town Hall for the meeting", 100, 'type=eventa');
		else addLinkToPlace(md, "enter the Town Hall", 95);
	}
	addLinkToPlace(md, "walk to the Library", 2);
	addLinkToPlace(md, "walk to the Hotel", 123);
	if (isPlaceKnown("PoliceStation")) addLinkToPlace(md, "walk to the Police Station", 167);

	WritePlaceFooter(md);
}