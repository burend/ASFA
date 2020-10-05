// Place: Outside Police Station

function ShowPlace167()
{
	var md = WritePlaceHeader();

	var perSmith = findPerson("OfficerSmith");
	var perBatton = findPerson("OfficerBatton");
	var perKhan = findPerson("OfficerKhan");
	var perDA = findPerson("Diane");

	// Set flags
	if (perSmith.pther == 100) perSmith.other = 900; // If Officer Smith is Shot, but left w/o ambulance = Officer Smith DEAD
	if (perBatton.isCharmedBy()) {
		perBatton.setFlag(2);
		if (perDA.isCharmedBy() && perKhan.isCharmedBy() && perBatton.checkFlag(3)) perBatton.setFlag(5);
	}
	if (perSmith.isCharmedBy()) perSmith.setFlag(2);
	if (perDA.isCharmedBy()) perDA.setFlag(1);
	if (!isPlaceKnown("PoliceStation")) setPlaceKnown("PoliceStation");	//  Know the Police station if you don't already.

	// Images
	addPlaceImage(md, "police1station.jpg", "", "", "Police Station");

	if (perKhan.getPath() == 2) {
		if (isBritish()) md.write('<p><img src="Images/UK/policecar1.jpg" style="width:75%" alt="Police Car"></p>');
		else md.write('<p><img src="Images/US/policecar1.jpg" style="width:75%" alt="Police Car"></p>');
	}

	addPlaceTitle(md, "Glenvale Police Station");

	// Text
	if ((perSmith.isDead() || perSmith.isCharmedBy()) && (perDA.isCharmedBy() || perDA.isDead()) && perBatton.isCharmedBy() && (perKhan.isCharmedBy() || perKhan.isDead())) {
		md.write(
			'<p>You consider the newly "refurnished" police station one of your great achievements. Everytime you visit, slaves jump from every corner to look after your wishes. With the ' + getPoliceChief() + ' and the ' + getProsecutor() + ' in your hands you technically own the law enforcement in Glenvale.</p>' +
			'<p>Not long ago the police station was celebrated as the "Tidiest Cop Shop in the Country”, a title that was important to the people and something to be proud of. Maybe you should come with an award, like "Most Obedient Slaves in the Country" or "The Best Serving Police Officers". You are sure Officer Kerry wouldn’t mind an award like that.</p>'
		);
	} else {
		md.write(
			'<p>The hub of law and order in Glenvale, the police station is the finest in the ' +
			'district. With little crime and a crack team of police ' +
			'officers there is not much to worry about in this town. ' +
			'Last year the Glenvale police station was awarded with the title ' +
			'&quot;Tidiest Cop Shop in the Country,&quot; ' +
			'a title that everyone considers to be very important.</p>'
		);
	}

	if (perKhan.getPath() == 2) md.write('<p>There is a police car parked in the street.</p>');

	// Questions
	startQuestions();

	addLinkToPlace(md, "enter the Police Station", 168);
	if (isPlaceKnown("TVStation")) addLinkToPlace(md, "walk to the TV Station", 359);	// Know about the Tv Station
	addLinkToPlace(md, "walk to the Town Hall", 94);

	WritePlaceFooter(md);
}