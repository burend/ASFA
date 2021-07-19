// Place: Kollam Street

function ShowPlace44()
{
	var md = WritePlaceHeader();

	var perSofia = findPerson("Sofia");
	var bSofia = isMurderPath() && getHour() > 5 && getHour() < 8 && perYou.isQuestComplete(7);

	// Placing the pictures

	// Your home
	addPlaceImage(md, "house4.jpg");
	if (wherePerson("Kurndorf") == 5) {
		// Ghost is here
		md.write('<img src="Images/ghost2.png" style="float:left;position:absolute;width:30%;width:10vw; top:10; left:0;margin:0px 5px;border-style:none" alt="Ghost">');
		addBackgroundImage("Images/ghost2.png", "", nTheme === 0);
	}
	// Kelly Residence
	if (isPlaceKnown("KellyHouse")) addPlaceImage(md, "house7.jpg");	// Know of the Kelly house


	// Description
	addPlaceTitle(md, "Kollam Street", '', 25);
	md.write('<p>Your neighborhood. You have lived on Kollam Street ever since your parents moved into number 26. The first years of life were tough. When you were nine years old your father left your mother for another woman. Then, thanks to the friendliness of the folks on Kollam Street, your family pulled through.</p>');

	if (wherePerson("Kurndorf") == 5) {
		// Ghost is here
		md.write('<p>You see the ghostly man again. He notices you watching him and then moves on into the alley...</p>');
		if (!isPlaceKnown("Alley")) setPlaceKnown("Alley"); // Set to know the alley
		movePerson("Kurndorf", 6); // Move the Ghost
	}

	if (isPlaceKnown("KellyHouse")) {
		// Know of the Kelly house
		md.write('<p>You can see 22 Kollam Street, the Kellys\' house.<br>All is peaceful from the outside; you can hear a little dog barking from behind the fence but no one is in sight.</p>');
	}
	if (bSofia) md.write('<p>A glorious, beautiful white car is parked at your house’s ramp. It once belonged to Sir Ronald, now it’s yours. With an expensive car comes a good chaueffuer. ' + perSofia.getPersonNameShort() + ' is standing next to the vehicle, waiting for your arrival. "Good morning , mi ' + (perYou.isBornMale() ? 'amo' : 'Señora') + '! Your car’s prepared and I’m ready to take you anywhere you want!”</p>');

	startQuestions();

	// Houses
	addLinkToPlace(md, "enter your house", 45);

	if (bSofia) addOptionLink(md, "enter " + perSofia.getPersonNameShort() + "’s car", "carRide('Sofia', '" + perSofia.getPersonNameShort() + " patiently waits for you to enter the car. She closes the door for you and after saluting to you, she occupies the driver’s seat and turns her head. &quot;Where do you wish to go?&quot;','. After you have chosen a selected designation and you arrive at said destination.</p><p>After opening the door for you and waits for you to ready yourself, " + perSofia.getPersonNameShort() + " hops back into the car and drives off to let you stay low profile.')");

	if (isPlaceKnown("KellyHouse")) addLinkToPlace(md, "enter the Kelly\'s Residence", 112);	/* Does the player have the address of 22 Kollam Street? */

	if (isPlaceKnown("Alley")) addLinkToPlace(md, "walk to the alley", 52);		/* Does the player know about the alley */
	if (isPlaceKnown("ShoppingCenter")) addLinkToPlace(md, "walk to the " + getShopStore() + 's', 194);		/* Does the player know about the shops? */
	addLinkToPlace(md, "walk to Cherise Rd", 37);
	addLinkToPlace(md, "walk to the School", 9);

	if (bSofia) {
		AddPeopleColumn(md);
		perSofia.showPerson("sofia_waiting.jpg");
	}

	WritePlaceFooter(md);
}