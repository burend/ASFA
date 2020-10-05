// Place: Mausoleum

function ShowPlace324()
{
	var md = WritePlaceHeader();

	//Where was the last PLACE you were coming from [Tunnel(323) or Graveyard(325)]
	if (nFromPlace == 323) {
		//From Tunnel
		setPlaceKnown("Graveyard");
	}

	/* General Description */

	/* TITLE LINE */
	// (isPlaceKnown("Graveyard") && !checkPlaceFlag("Graveyard", 6)) = Church tunnel and the doors are still locked
	// else The graveyard (locked or not, doesn't matter)
	addPlaceTitle(md, "Mausoleum", isPlaceKnown("Graveyard") && !checkPlaceFlag("Graveyard", 6) ? "mausoleum2.jpg" : "mausoleum.jpg");

	/* Description */
	md.write('<p>Presumably intended for the internment of a relatively famous person in the town\'s history, the actual occupant of this mausoleum has passed into the annals of history.</p>');

	if (isPlaceKnown("ChurchTunnel")) {
		//Tunnel KNOWN
		md.write('<p>Now, and presumably for some time, it serves as the hiding place of a tunnel that leads to the catacombs beneath an old Church.</p>');
	} else md.write('<p>The crypt inside has seen better days, most of the decorations having been destroyed many years ago.  Even the stone coffin has fallen apart, the bodies inside presumably moved long ago - or lost to the elements.</p>');

	if (!checkPlaceFlag("Graveyard",6)) {
		//Have you opened the doors with PASS yet
		md.write('<p>The doors of the crypt are locked and rusted through.  It would seem they have not been opened in many, many years.</p>');
	} else md.write('<p>The aged, rusty iron doors of the crypt stand open - but still not quite inviting, if you know what I mean.  You take a peek inside but there\'s not much to see.  Seems to have been fairly well ransacked some time ago and evidently there are no living relatives around to clean the place up.  Too bad.</p>');

	/* Dialogue Options */
	//**********************************************************************
	startQuestions();

	if (isPlaceKnown("ChurchTunnel")) {
		//Tunnel is known
		addOptionLink(md, "enter the secret tunnel to the church", "EnterChurch(323);");
	}

	 // Came from the graveyard or have all ready used the pass spell to open the gate
	if (isPlaceKnown("Graveyard") || checkPlaceFlag("Graveyard",6)) {
		addLinkToPlace(md, "walk through the graveyard", 325);
	}

	WritePlaceFooter(md);
}