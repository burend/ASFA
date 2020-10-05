// Place: Outside Mansion

//***************************************************
//          Gates Estate "Front Door"
//***************************************************
function EnterMansion()
{
	if (isPossess("cast")) CancelPossession();
	var plcAR = wherePerson("AdeleRoss");
	var perS = findPerson("Sarah");

	if (!isMurderPath()) {
		// Gates is still alive
		if (plcAR === 16) dispPlace(21);  // Gates Estate blocked
		else if (perGates.other >= 499 && perGates.other <= 700) WriteComments("The front door is locked and there is no answer to the door bell. You would guess you are not welcome back.");
		else if (!isDay()) {
			WriteComments("The front door is locked and there is no answer to the door bell. You would guess they are not accepting visitors at night.");
			perGates.setFlag(5);
		} else if ((perS.place == 192 && perS.other >= 100) || perGates.checkFlag(3)) dispPlace(18);
		else gotoPlace(17);
	} else {
		// Sir Ronald Gates is DEAD
		if (perS.place > 0) {
			// Sarah Gates has arrived
			if (plcAR === 16) dispPlace(21);  // Gates Estate blocked
			else if (!isDay()) WriteComments("The front door is locked and there is no answer to the door bell. You would guess they are not accepting visitors at night.");
			else visitSarah();  // Sarah Gates Main
		}	else {
			// Sarah Gates NOT IN GAME YET
			// Have learned first two spells and got book for the first time && haven't had Khan drive you to Police station
			var perKhan = findPerson("OfficerKhan");
			if (perYou.getExperience() > 6 && perKhan.getPath() < 2) gotoPlace(65);  // Active Crime Scene
			else gotoPlace(19);  // Sir Ronald Gates DEAD
		}
	}
}

function LeaveMansionStudy()
{
	var perS = findPerson("Sarah");
	if (perS.place == 192 && perS.other >= 100) {
		if (perS.other == 100) perS.other = 101;
		gotoPlace(18);
	} else if (perGates.other >= 499 && !isMurderPath()) {
		// Conspiracy path or Soft Murder
		if (perGates.other > 499) {
			// Soft Murder
			movePerson("Kurndorf", 16);		// allows soft murder path
			gotoPlace(16, 'type=startsoftmurder');
		} else {
			// Conspiracy
			gotoPlace(16, 'type=startconspiracy');
		}
	} else gotoPlace(16, '', !isDay() ? "As you leave you hear a loud clacking as multiple locks as secured on the front door. Seems that further visits are not welcome tonight" : '');
}

function ShowPlace16()
{
	var md = WritePlaceHeader();
	var plcAR = wherePerson("AdeleRoss");

	addPlaceImage(md, "mansion.jpg");
	if (wherePerson("Kurndorf") == 16) {
		// Ghost is here
		md.write('<img src="Images/ghost2.png" style="float:left;position:absolute; width:30%;width:10vw; top:10; left:0;margin:0px 5px;border-style:none" alt="Ghost">');
		addBackgroundImage("Images/ghost2.png", "", nTheme === 0);
	}
	addPlaceTitle(md, perGates.getPersonName() + "\' House", "", isPlaceKnown("Tunnel") ? 25 : 100);

	md.write(
		'<p>The house is one of the oldest and most prestigious buildings of the town. ' +
		'Built originally as the country estate of a powerful noble family, it has weathered many years of use. It has passed from family to family over the centuries, some of the gentiles who have lived here include: Lord Geoff Halliway, Lord Percy Halliway, Lady Elizabeth Ross and Lord Beasley before bankruptcy caused the last noble family to sell the house. ' +
		'A wealthy industrialist had the house moved brick by brick to the outskirts of Glendale in the late 19th century, including the family graves. The industrialist in turn went bust in the Great Depression, and several wealthy families have owned it since then.</p>' +
		'<p>There is a set of garages inside a courtyard next to the mansion proper.</p>'
	);

	if (wherePerson("Kurndorf") == 16) {
		md.write('<p>You see a ghostly figure standing a distance away from the mansion, possibly a man, but it is so indistinct and barely visible.. The figure beckons to you and moves to lead you somewhere into the trees at one side of the mansion. As you do not immediately follow the figure waits, very slowly gesturing for you to follow.</p>');
	} else {
		// Sir Ronald Gates is NOT DEAD and you haven't yet given him a stone on the apprentice path
		if (!isMurderPath() && perGates.other < 11) {
			md.write('<p>' + perGates.getPersonName() + ' occupies the estate now and has done so for the last twenty-five years. A rather elusive man, he is not often seen visiting the town, preferring to send one of his servants to perform the menial task. Someone once said that ' + perGates.getPersonNameShort() + ' was a cranky old bugger with no friends or relatives, and that is why the house lights always go out soon after dusk.</p>');
		}

		// Gates DEAD && ( Crime Scene Still Active )
		else if (isMurderPath() && perYou.getExperience() > 6 && plcAR == 16) {
			md.write('<p>There is a lot of bustle around the perimeter of the house as a police investigation is underway. Nervously you look for a way to slip away unseen./p>');
		}
	}

	// ******************************************************************
	startQuestions();

	addOptionLink(md, "enter " + perGates.getPersonNameShort() + "\'s House", 'EnterMansion()');

	if (wherePerson("Kurndorf") == 16) addLinkToPlaceO(md, "follow the ghost", 141);
	else {
		addLinkToPlace(md, "visit the Garage area", 15);
		if (isPlaceKnown("SacredClearing")) addLinkToPlace(md, "go to the sacred clearing", 141);	// know Sacred clearing
	}


	WritePlaceFooter(md);
}