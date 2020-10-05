// Intensive Care Unit

function ShowPlace275()
{
	var md = WritePlaceHeader();
	var perMegan = findPerson("NurseMegan");
	var perMG = findPerson("MrsGranger");
	var bPatientHere = perMG.other >= 50 && perMG.other < 54 && perMG.place == 275.5;
	var myName;
	if (!perMegan.isCharmedBy()) {
		perMegan.showPerson("megan1a.jpg");	//NORMAL Megan
		if (perYou.isMaleSex()) myName = "sir";
		else myName = "miss";
	} else {
		myName = perYou.getMaster();
		perMegan.showPerson("megan8.jpg");	// CHARMED Megan
	}

	addPlaceTitle(md, "Intensive Care Unit");

	md.write('<p>Machines and tubes are all around the room plugged into unconscious patients. Doctors and nurses constantly move between the beds checking the condition of the critically ill.</p>');

	if (isInvisible()) md.write('<p>' + (perMegan.checkFlag(2) ? 'Nurse Megan' : 'The nurse') + ' is tending to her patients.</p>');
	else if (perMegan.isCharmedBy()) {
		//Nurse is CHARMED
		md.write('Megan chuckles when she sees you enter.  "Hello, ' + myName + '," she says as you pull her into a more <i>private</i> station.  "Have you come to dispense more pleasure to your slave, or just more bad pick-up lines?"</p>');
	} else {
		//Nurse is NOT CHARMED
		if (!perMegan.checkFlag(1)) perMegan.setFlag(1);
		if (perMegan.checkFlag(2)) md.write('<p>Nurse Megan intercepts you, "Excuse me, can I help you ' + myName + '?"</p>');
		else md.write('<p>A nurse intercepts you, "Excuse me, can I help you ' + myName + '?"</p>');
	}

	// *******************************************************************
	startQuestions();

	if (perMegan.isCharmedBy()) {
		//Nurse is Charmed
		addLinkToPlaceC(md, '"Display yourself for me, slave"', Place, 'type=megandisplay');
		if (!bPatientHere) {
			perMegan.addDancingLink(md, '"Slave, can you take a break and dance for me at the club?"', 
				'You talk to Megan about the Avernus club and about taking a break and dancing there for you,</p>' +
				'<p>&quot;Of course ' + perMegan.getYourNameFor() + '. I can arrange someone to take over here for a time and have a break and dance for you!&quot; and with that you call Jade to arrange a dance for Megan.'
			);
		}
	}

	addLinkToPlace(md, "leave the intensive care unit", 214);
	
	if (bPatientHere) {
		AddRightColumnMed();
		addPlaceImage(md, "icu.jpg");
	}

	WritePlaceFooter(md);
}