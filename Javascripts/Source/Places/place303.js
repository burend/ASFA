// Place: Gina's Bathroom

function ShowPlace303(stype)
{
	var md = WritePlaceHeader();
	var perG = findPerson("Gina");

	if (perG.place == 302 && !isPossess() && !perG.isCharmedBy()) {
		//Gina is AT HOME and NOT POSSESSED and NOT CHARMED
		showPopupWindow("Gina",
			perG.addPersonString("gina7a.jpg", "height:max%", "right") +
			'"Excuse me?" she says, blocking your way.  "You can\'t just barge in here and poke around!  Get out of my house!"',
			"gotoPlace(229)"
		);
		setPlaceFlag("GinasHouse", 5);   //Has thrown you out.
		WritePlaceFooter(md);  //She kicks you out of her house.
		return;
	}

	if (sType === "ginabath") {
		perG.showPersonRandom("gina-bath", 3);
		addPlaceTitle(md, "Gina\'s Bath");
	} else addPlaceTitle(md, "Gina\'s Bathroom", "bath1.jpg");
	if (sType === "ginabath") md.write('<p>Gina is bathing, well playing in the bath for your pleasure.</p>');
	else md.write('<p>A nice, well kept, and clean bathroom.  Did you expect anything less from someone like Gina?</p>');

	if (!checkPlaceFlag("GinasHouse",7)) {
		//Haven't cast PASS to open the drawer
		md.write('<p>One of the drawers beside the sink seems to be jammed shut - quite out of place in such an immaculate room.</p>');}
	else md.write('<p>The drawer now sits open...</p>');

	if (whereItem(34) == 303) {
		md.write('<p>You notice a small lock of blonde hair caught up in one of the brushes within the drawer.</p>');
	}
	if (checkPlaceFlag("GinasHouse", 6)) {
		md.write('<p>You notice a small stone in the drawer... where <i>do</i> these things come from, you can\'t help but wonder.</p>');
	}
	if (isPossess("Gina")) {
			// Possessed
		if (perG.extra[1] == 1) {
			// First time possessing her
			md.write('<p>You are in the living room of Gina&apos;s home, for some reason you feel cold.</p>');
			if (!checkPlaceFlag("GinasHouse", 3)) {
				// Shower scene
				md.write('<p>A shower is running nearby and you catch a glimpse of yourself, or should you say Gina in a mirror...</p>');
			}
		}
	}

	//**********************************************************************************
	startQuestions();

	if (isPossess("Gina")) {
		// YOU HAVE POSSESSED GINA
		if (perYourBody.FindItem(43) > 0) addQuestionC(md, 'remove the heirloom and hide it so Gina won\'t be able to find it', "Misc", 30300);
		if (perG.extra[1] == 1 && !checkPlaceFlag("GinasHouse", 3)) {
			// Shower scene
			addLinkToPlace(md, 'look in the mirror', 303, 'type=mirror');
		}
	}
	if (checkPlaceFlag("GinasHouse", 6)) addQuestionC(md, 'pick up the stone', "Misc", 1506);
	if (perG.isCharmedBy() && perG.place == 302 && sType !== "ginabath") {
		// Charmed and at home
		addLinkToPlaceC(md, 'ask Gina to join you in the bathroom', Place, 'type=ginabath', 'Gina joins you, quickly stripping and staring to run a hot bath. As the tub fills she plays with the shower-head and other bathing accessories for your entertainment.');
	}
	addLinkToPlace(md, 'leave the bathroom', 302, '', sType == "ginabath" ? 'Gina dries off and follows you in a few minutes' : '');

	WritePlaceFooter(md);
}