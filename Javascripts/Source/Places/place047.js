// Place: Park Entrance

function ShowPlace47(stype)
{
	var md = WritePlaceHeader();
	
	var perKate = findPerson("Kate");

	addPlaceImage(md, "park1.jpg", "90%", "", "Park");

	if (wherePerson("Kurndorf") == 3) {
		// Ghost is here
		md.write('<img src="Images/ghost2.png" style="float:left;position:absolute;width:50%;width:15vw; top:0px; left:0;margin:0px 5px;border-style:none" alt="Ghost">');
		addBackgroundImage("Images/ghost2.png", "", nTheme === 0);
	}

	addPlaceTitle(md, "Glenvale Park Entrance");

	if (stype === "") {
		md.write('<p>Glenvale park is the pride of the town. Mayor Thomas has proclaimed that the gardens are the best in the region and that everyone should take care not to litter. Any help in maintaining the park is graciously rewarded. ');
		if (isDay()) md.write('There are people browsing through the walkways and sitting on the park benches.</p>');
		else md.write('The park is a safe and peaceful place at night, with the occasional couple meeting for a romantic rendezvous.</p>');

		if (wherePerson("Kurndorf") == 3) {
			// Ghost is here
			md.write('<p>You see the ghostly man again. He notices you watching him and then moves on...</p>');
			movePerson("Kurndorf", 4); // Move the Ghost
		}

		if (perKate.place == 47) {
			//Kate is in the Park Pathway (You "send her home" to hide)
			md.write('<p>You see Kate walking down one of the park trails. She seems very distracted, constantly looking over her shoulder and yet not seeming to notice your approach.</p>');
		} else if (perKate.place == 421) {
			//Kate is in the Park Pond (You "send her home" to hide)
			md.write('<p>You see Kate walking on the path leading to the duck pond. She seems very distracted, constantly looking over her shoulder and yet not seeming to notice your approach.</p>');
		} else if (perKate.whereNow() == 216) {
			// Is she at the bridge?
			md.write('<p>You see in the distance one of your friends, Kate riding her bike on the bridge.</p>');
		}
		if (isPlaceKnown("DuckPond")) {
			// Ellie is at the park
			md.write('<p>You see the path leading to the duck pond.</p>');
		}
		
	} else if (stype == "clobbered") {
		// You tried to charm her
		nMoney = nMoney > 0 ? 0 : nMoney;  //Kate takes ALL your cash
		AddCash(0);  //Refresh the cash counter
		perKate.place = 9999;		// Kate leaves town
		perKate.setFlag(4);		// pissed her off (duh!)

		if (perDavy.getPathHellgate() === 0) {
			//Haven't started the Hellgate Path yet
			perDavy.setPathHellgate(1);  //Start it...  alternative start to the Hellgate path in case you didn't get shot
		}

		showPopupWindow("", '::THUD:: Did someone get the license number of that TRUCK!?!', '');

		md.write(
			'<p>You black out for a bit, and wake some time later, not quite sure where you are or how you got here. Your head is throbbing and you are fairly sure that there is a very large <i>bump</i> on the back of your head for a while.</p>' +
			'<p>Kate must have noticed as you started to cast the spell.  <i>Man she can hit hard!</i> You think to yourself.</p>' +
			'<p>A few moments later you realize Kate did more than just hit you...  it would seem she liberated your cash from your pocket before she left.</p>' +
			'<p>You see a note stuck into one of your pockets</p>' +
			'<p>"<i>You ' + (perYou.isMaleSex() ? "bastard" : "bitch") + ' I almost trusted you! The you had to do whatever that is, something like Davy. You are scum, I hope to never see you again. I getting the hell out of the town, I will sort things our with Mama</i>"'
			);
	}

	startQuestions();

	if (perKate.place == 47) {
		// Kate in the Park
		addLinkToPlaceC(md, "talk to Kate", 36);
	}
	if (isPlaceKnown("DuckPond")) addLinkToPlace(md, "visit the pond", 421);	// Duck pond

	addLinkToPlace(md, "walk to the park bridge", 216);

	if (getPersonOther("Anita") === 12 && !perYou.isShot()) addLinkToPlace(md, "walk to the park pathway", 142);
	else addLinkToPlace(md, "walk to the park pathway", 63);
	addLinkToPlace(md, "walk to the school", 9);

	WritePlaceFooter(md);
}