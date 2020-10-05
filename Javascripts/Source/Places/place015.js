// Place: Gate's Garage Outside

function ShowPlace15(stype)
{
	var md = WritePlaceHeader();
	
	addPlaceTitle(md, "Gates's Mansion Garage", "mansiongarage.jpg");
	md.write(
		'<p>This house must have been built much later than the mansion. It looks stylish, simple and modern. The three huge doors give away this building’s purpose; it’s a garage. Interestingly, it has an office area and one upper floor which is for living you presume. This must mean that a servant or one of the help lives here.</p>'
	);
	
	var perSarah = findPerson("Sarah");
	var bSarahMet = perSarah.checkFlag(7);
	if (isCharmedPath() && perSarah.other < 110) bSarahMet = false;
	else if (isConspiracyPath() && !perSarah.checkFlag(1)) bSarahMet = false;
	
	var perSofia = findPerson("Sofia");
	var nm = perSofia.name;
	var bMurder = isMurderPath();

	startQuestions();
	if (perSofia.whereNow() == 999) {
		addPopupLinkC(md, 'go to the entrance door', "Garage Office",
			"<p><img src='Images/steeldoor.jpg' style='width:40%;float:right;margin-left:5px' alt='Garage Door'>" +
			"There is a reinforced steel door which prevents you from entering an office area. The office is empty, " + nm + " is gone.",
			false
		);
	} else if (bSarahMet && perSofia.whereNow() === 0) {
		if (bMurder) {
			addPopupLinkC(md, 'go to the entrance door', "Garage Office",
				"<p><img src='Images/steeldoor.jpg' style='width:30%;float:right;margin-left:5px' alt='Garage Door'>" +
				"The steel door is unlocked from the inside and it’s slightly open, leaving an opportunity to you to check around. Someone is in the office! As you approach you notice a garage door opening but that is somehow different, an alternate view of the same..." +
				addOptionLink("string", 'go into the office', "movePerson('Sofia', 14);gotoPlace(14)", "chatblock", "width:30%;margin-left:10%") +
				addOptionLink("string", 'check the garage alternative', "findPerson('Sofia').dress='Angelica';movePerson('Sofia', 14);gotoPlace(14,'','As you approach the garage you hear someone call out to you from the office and you instead go into the office.')", "chatblock", "width:30%;margin-left:10%"),
				false, '', true
			);
		} else {
			addPopupLinkC(md, 'go to the entrance door', "Garage Office",
				"<p><img src='Images/steeldoor.jpg' style='width:30%;float:right;margin-left:5px' alt='Garage Door'>" +
				"The steel door is unlocked from the inside and it’s slightly open, leaving an opportunity to you to check around. Someone is in the office and calls for you to enter.",
				false, bMurder ? 'movePerson("Sofia", 14);gotoPlace(14)' : 'movePerson("Sofia", 14);per.dress="Angelica";gotoPlace(14)'
			);
		}
	} else if (!bSarahMet) {
		addPopupLinkC(md, 'go to the entrance door', "Garage Office",
			"<p><img src='Images/steeldoor.jpg' style='width:40%;float:right;margin-left:5px' alt='Garage Door'>" +
			"There is a reinforced steel door which prevents you from entering an office area. As you look through one of the windows you feel like you are not missing out on anything interesting.</p><p>The place looks empty and no one’s here.",
			false
		);
	} else if ((bMurder && (getHour() > 7 && getHour() < 10)) || (!bMurder && getHour() >= 8 && getHour() < 13)) {
		addPopupLinkC(md, 'go to the entrance door', "Garage Office",
			"<p><img src='Images/steeldoor.jpg' style='width:40%;float:right;margin-left:5px' alt='Garage Door'>" +
			"This reinforced steel door is impossible to break. You have to get in there in an another way.</p>" + 
			"<p>You see a small sign, \"out of the office, back in a few hours\"",
			false
		);
	} else addLinkToPlace(md, "enter the garage office", 14);
	addLinkToPlace(md, "return to the mansion entrance", 16);

	WritePlaceFooter(md);
}