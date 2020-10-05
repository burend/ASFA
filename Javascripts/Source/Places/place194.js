// Place: Shops

function ShowPlace194()
{
	var md = WritePlaceHeader();

	var perTess = findPerson("Tess");
	var bTessHere = isShopOpen(0) && perTess.place == 194;

	addPlaceTitle(md, "Shopping Center", isDay() ? "shops" + (Math.floor(Math.random() * 2) + 2) + ".jpg" : "shops1.jpg", 75);

	var b2Cols = bTessHere;

	md.write('<p>' + getShopStore(true) + 's line the Glenvale central shopping street. ');
	if (isDay()) md.write('At this time of day the townsfolk are browsing casually along the footpaths.</p>');
	else md.write('At this time of day there are only a few townsfolk around.</p>');

	if (!checkPlaceFlag("ShoppingCenter", 7))
	{
		setPlaceFlag("ShoppingCenter", 7);
		md.write(
			'<p>On your left is the general ' + getShopStore() + ' that sells everything from toothpaste to magazines. It is possibly the busiest ' + getShopStore() + ' on town - a constant flow of people are entering and exiting the tiny ' + getShopStore() + '.</p>' +
			'<p>Across the road is the newly opened restaurant, "Bavaria Hut." It\'s a German theme restaurant, and since it was opened last month it\'s been almost always empty. You wonder how it could possibly be turning a profit.</p>' +
			'<p>The Friendly Loan Company stands as a solid and secure symbol of the town\'s economy. Built during the boom times when farming and mining brought riches to the community, everyone is proud to call the bank their own.</p>'
		);
	}

	if (checkPersonFlag("Kristin", 9)) md.write('<p>The Friendly Loan Company has a sign saying it is temporarily <b>closed</b> for repair work. The ATM is still available to be used.</p>');
	else if (!isShopOpen(0)) md.write('<p>The Friendly Loan Company has a sign noting that it is <b>closed</b>, hours of business 8am to 6pm Monday to Friday. The ATM is still available to be used.</p>');

	if (bTessHere) md.write('<p>Tess Adams calls out to you from across the street. She is stunning in yet another outfit.</p>');

	if (!isShopOpen(2, 1, true)) md.write('<p>The General ' + getShopStore(true) + ' has a sign noting that it is <b>closed</b>, hours of business 8am to 8pm.</p>');
	if (!isShopOpen(0)) {
		md.write('<p>The Antiques ' + getShopStore(true) + ' has a sign noting that it is <b>closed</b>, hours of business 8am to 6pm Monday to Friday.');
		if (isCharmedBy("Victoria")) md.write(' As Victoria lives in an apartment over the ' + getShopStore() + ', you can still enter the ' + getShopStore() + ' anytime to visit her.');
		md.write('</p>');
		if (isPlaceKnown("MechanicsShop")) {
			md.write('<p>The Mechanics Workshop has a sign noting that it is <b>closed</b>, hours of business 8am to 6pm.');
			if (isCharmedBy("Hannah")) md.write(' You do have a key to Hannah\'s apartment so you can enter any time you like.');
			md.write('</p>');
		}
	}
	if (!isShopOpen(4, 0, true)) md.write('<p>The Restaurant has a sign noting that it is <b>closed</b>, hours of business 8am to 10pm.</p>');
	md.write('<p>The Glenvale Laundromat is open as always, it is open 24hrs a day.</p>');


	//************************************************************************
	startQuestions();

	if (b2Cols) {
		if (bTessHere) addLinkToPlaceC(md, 'talk to Tess Adams', 194, 'type=tesscar');
		md.write('<br>');
	}
	if (isShopOpen(0) || isCharmedBy("Victoria")) addLinkToPlace(md, isShopOpen(0) ? 'enter the Antique ' + getShopStore(true) : 'visit Victoria\'s apartment', 197);
	if (isShopOpen(0) && !checkPersonFlag("Kristin", 9)) addLinkToPlace(md, 'enter the Bank', 225);
	else if (perYou.getBankBalance() !== 0) addOptionLink(md, "use the ATM", 'Leave();useATM()');
	if (isShopOpen(4, 0, true)) addLinkToPlace(md, 'enter the Restaurant', 196);
	if (isShopOpen(2, 1, true)) addLinkToPlace(md, 'enter the General ' + getShopStore(true), 195);

	if (isPlaceKnown("MechanicsShop")) {
		if (isShopOpen(0)) {
			if (wherePerson("Hannah") == 457) addLinkToPlace(md, 'enter the Mechanic\'s Workshop', 194, '', 'The workshop seems to be closed and no one opens the door when you ring the apartments bell, maybe Monique knows more.');
			else addLinkToPlace(md, 'enter the Mechanic\'s Workshop', 279);
		} else if (isCharmedBy("Hannah")) addLinkToPlace(md, 'enter Hannah\'s apartment', 237);
	}
	addLinkToPlace(md, 'enter the Laundromat', 199);
	addLinkToPlace(md, "sit on a bench for a while", '', '', 'You kill some time for an hour, watching the people going by', '', 'WaitHere(5);');

	if (isPlaceKnown("NewAgeStore")) addLinkToPlace(md, 'walk to the New Age ' + getShopStore(true), 344);
	if (isPlaceKnown("AvernusClub")) addLinkToPlace(md, 'visit strip club', 281);
	if (isPlaceKnown("HavenApartments")) addLinkToPlace(md, 'visit Haven Apartments', 470);

	addLinkToPlace(md, 'walk to Kollam St', 44);
	if (isPlaceKnown("DervishRd")) addLinkToPlace(md, 'walk to Dervish Rd', 5);

	// Right column images
	if (b2Cols) {
		AddPeopleColumnMed();
		if (bTessHere) perTess.showPerson("tess9a.jpg", "100%");
	}

	WritePlaceFooter(md);
}