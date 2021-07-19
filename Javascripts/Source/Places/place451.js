// Lola's home

function ShowPlace451()
{
	var md = WritePlaceHeader();

	var perLola = findPerson("Lola");
	var clvL = perLola.getCharmedLevel();

	if (perLola.isHere()) perLola.showPerson(clvL == 4 ? "lolahome1.jpg" : "lolahome2.jpg");

	addPlaceTitle(md, "Lola\'s Home", perLola.isHere() ? "" : "livingroom5.jpg");

	md.write(
		'<p>Lola\'s home is nicely furnished and elegant. The woman clearly cared about appearances and design.</p>'
	);
	if (perLola.isHere()) {
		if (clvL == 4) md.write('<p>Lola greets you as you walk in. You see that she has truly embraced her primal nature as she is completely nude and crouched on a tiger print cushion.</p>');
		else md.write('<p>Lola greets you as you walk in, it seems she saw you approaching and she greets you in her living room, completely naked.</p>');
	} else md.write('<p>Lola is at the Museum now.</p>');

	if (isItemHere(45)) md.write('<p>You see an un-opened box containing a strap-on. Lola will not miss it if you want to take it.</p>');
	
	startQuestions();

	if (perLola.isHere()) {
		addPopupLinkC(md, clvL == 4 ? 'have her suck again' : 'ask her ' + (perYou.isMaleSex() ? 'for a blowjob' : 'to lick your pussy'), "I could get used to this",
			(perYou.isMaleSex() ? perLola.addPersonStringRorX("lolablowhb.jpg", "60%", "rightpopup") : perLola.addPersonStringRorX("lolablowhg.jpg", "width:60%", "rightpopup")) +
			(clvL == 4 ? 'This is what slaves are for!' : "Nice!"),
		);
		if (clvL == 4 && perYou.isMaleSex()) {
			addPopupLinkC(md, 'Spread her apart', "They didn\'t do this in the stoneage.",
				perLola.addPersonString("lolasplit.jpg", "60%", "rightpopup") +
				"<img src='Images/lolasplit.jpg' style='width:100%;float:right;margin:0 0 0 5px' alt='Pamela'>" +
				'She is quite flexible for an older slave.',
			);
		}
		if (perYou.isMaleSex()) {
			addPopupLinkC(md, 'fuck her ass', clvL == 4 ? "Slaves are for Ass-fucking" : "Lola\'s Ass",
				perLola.addPersonStringRorX("lolaassb.jpg", "60%", "rightpopup") +
				'It\'s time to fuck that ass!',
			);
		}
		addPopupLinkC(md, 'How about some normal fucking', "Nice tits.",
			(perYou.isMaleSex() ? perLola.addPersonStringRorX("lolafuckb.jpg", "60%", "rightpopup") : perLola.addPersonString("lolafuckg.jpg", "60%", "rightpopup")) +
			'She can\'t get enough of this.',
		);

		perLola.addSleepLink(md, "take her to bed", clvL == 4 ? "Faithful servant" : "Lola, your charmed lover",
			'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>Lola now craves being used by you, and lies on the bed ready for you to take her however you choose.</b>',
			'lolasleep.jpg', true, '', '', '', "overflow-y:hidden"
		);
	}
	
	addLinkToPlace(md, "leave her house", 38);
	WritePlaceFooter(md);
}