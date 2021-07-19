// Place: Cherise Rd

function ShowPlace37()
{
	var md = WritePlaceHeader();

	// Description
	addPlaceImage(md, "gymoutside1.jpg");
	addPlaceImage(md, "house11.jpg", "90%");
	if (isPlaceKnown("AuntsHouse")) addPlaceImage(md, "house12.jpg", "90%");
	if (isPlaceKnown("LogansHouse")) addPlaceImage(md, "house16.jpg", "90%");
	if (isPlaceKnown("MelaniesHouse")) addPlaceImage(md, "house17.jpg", "90%");
	
	addPlaceTitle(md, "Cherise Road");
	
	md.write(
		'<p>A well maintained part of town, everything seems a bit above the ordinary, wealthier than elsewhere.</p></p>The only gym in Glenvale operates at the intersection with Kollam St. Most of the locals approve of it but there was some initial resistance when it was first opened. The locals thought it would increase traffic or disturb the neighbourhood, but nothing of the sort happened.'
	);
	if (!isShopOpen(4, 2, true)) md.write(' The Gym is closed at the moment, it is open from 6am to 10pm');
	md.write(
		'</p><p>You can see 5 Cherise Rd, the Ross\'s house where your friend Amy lives with her older sister Catherine.<br>The house is quite expensive and you have been here a few times before.</p>'
	);
	if (isPlaceKnown("AuntsHouse")) md.write('<p>You can see 7 Cherise Rd, the home of your Aunt Brandi and your cousin Kylie.</p>');
	if (isPlaceKnown("MelaniesHouse")) {
		if (checkPersonFlag("Melanie", 1)) md.write('<p>You can see 9 Cherise Rd, the modest home of Melanie.</p>');
		else md.write('<p>You can see 9 Cherise Rd, the neighbour Kylie mentioned.</p>');
	}
	if (isPlaceKnown("LogansHouse")) md.write('<p>You can see 12 Cherise Rd, the modest home of your teacher Miss Logan.</p>');

	startQuestions();
	if (isShopOpen(4, 2, true)) {
		if (checkPlaceFlag("CheriseRd", 6)) {
			if (!checkPlaceFlag("CheriseRd", 9)) {
				addPopupLinkC(md, "visit the gym", 'Barred fron the Gym',
					'<img src="Images/gymoutside2.jpg" class="imgpopup">' +
					'You try to enter the Gym again and the person at the front tells you that you are not allowed access and must leave or they will call the police.</p>' +
					'<p>You are going to have to find another way to get in and meet Charlie again. The large windows would make the Pass spell not a good idea as it is likely someone would see you.' +
					(isSpellKnown("Invisibility") ? ' The invisibility spell Dest may work, but it fades when you cross doorways. Still you could just try to time things to follow a group in and then immediately cast the spell.' : ' At the moment you are not sure how to get in, you will have to wait until you work out something else.'),
					false, "setPlaceFlag('CheriseRd',9);dispPlace()"
				);	
			} else if (isInvisible()) addOptionLink(md, "invisibly visit the gym", "dispPlace(435,'','You wait for some people to enter the gym and follow them in and immediately re-cast the invisibility spell')");
			else addLinkToPlace(md, "visit the gym", Place, '', 'It is pointless <i>just</i> entering the Gym, you will just be told to leave');
		} else addLinkToPlace(md, "visit the gym", 435);
	} else if (isPlaceKnown("CharliesHouse")) addLinkToPlace(md, "visit Charlie\'s home", 434);
	if (checkPersonFlag("Catherine", 1)) addLinkToPlace(md, "visit the Ross house", 436);
	else addLinkToPlace(md, "visit the Ross house", 37, '', 'You should just see Amy or Catherine at school, you have not been invited to visit');
	if (isPlaceKnown("AuntsHouse")) {
		var perAunt = findPerson("Brandi");
		if (perAunt.isCharmedBy() || !isAtLocation(400, perAunt.whereNow())) addLinkToPlace(md, "visit your Aunt and Kylie", 400);
		else if (perAunt.checkFlag(25) && perAunt.isNympho()) addLinkToPlace(md, "visit your Aunt and Kylie", 37, '', 'There is no answer at the door, they must still be in bed');
		else if (getHour() < 6) addLinkToPlace(md, "visit your Aunt and Kylie", 37, '', 'There is no answer at the door, you were told to not return until tomorrow');
		else if (getHour() < 9 || getHour() > 21) {
				addPopupLink(md, "visit your Aunt and Kylie", 'Not Welcome',
					perAunt.addPersonString(getHour() < 12 ? "gohome-day.jpg" : "gohome-night.jpg", "height:max%", "right") +
					'You knock on the door toy Aunt Brandi and Kylie\'s home. Aunt Brandi answers the door after a minute and looks at you unimpressed,<p>' +
					'"I told your mother you may visit in the evenings. It is not the evening" and she closes the door in your face!'
				);				
		} else if (isDay() || perAunt.whereNow() != 400) addLinkToPlace(md, "visit your Aunt and Kylie", 37, '', 'There is no answer at the door, they must out, at work or school');
		else addLinkToPlace(md, "visit your Aunt and Kylie", 400);
	}
	if (isPlaceKnown("LogansHouse")) addLinkToPlace(md, "visit Miss Logan's Home", 440);
	if (isPlaceKnown("MelaniesHouse")) addLinkToPlace(md, checkPersonFlag("Melanie", 1) ? 'visit Melanie\'s house' : 'visit Aunt Brandi\'s neighbours house', 432);
	
	if (isPlaceKnown("DervishRd")) addLinkToPlace(md, 'walk to Dervish Rd', 5);
	addLinkToPlace(md, "walk to Kollam Street", 44);

	WritePlaceFooter(md);
}