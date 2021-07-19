// Charley's House

function ShowPlace428()
{
	var md = WritePlaceHeader();

	var perC = findPerson("Charley");
	var bHere = perC.isHere();
	var bMan = perYou.isMaleSex();
	var bBlonde = !perC.checkFlag(2);
	var nm = perC.getPersonNameShort();
	var clvC = perC.getCharmedLevel();

	if (bHere) {
		if (bBlonde) perC.showPerson("charleyhomea.jpg" );
		else perC.showPerson("charleyhomeb.jpg");
	}

	addPlaceTitle(md, nm + "\'s House", bHere ? '' : "bedroomc.jpg");

	md.write('<p>' + nm + '\'s house is modest but fairly cozy. You could see yourself spending some good quality time here.</p>');
	if (bHere) {
		if (clvC == 1) md.write('<p>' + nm + ' reluctantly greets you as you walk in. She has her tits on full display as you have instructed her. She has no choice but to wait for your next command.</p>');
		else md.write('<p>' + nm + ' greets you as you walk in. She has her tits on full display as she knows you enjoy.</p>');
	} else md.write('<p>' + nm + ' is across the street at the Salon now though.</p>');

	startQuestions();

	if (bHere) {
		if (clvC == 1) {
			addPopupLinkC(md, 'have her ' + (perYou.isMaleSex() ? 'suck your cock' : 'lick your pussy'), "Good Bitch.",
				perC.addPersonStringRorXBG("charley8" + (perC.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup") +
				'Doesn\'t seem like she will ever accept this.',
				true, "dispPlace()"
			);
			if (bMan) {
				addPopupLinkC(md, 'make her use her tits', "Still feels great.",
					perC.addPersonStringRorX("charley9" + (perC.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup") +
					'She doesn\'t even try to hide that she hates it.',
					true, "dispPlace()"
				);
				if (!bBlonde) {
					addPopupLinkC(md, 'fuck her face', "No Hands.",
						perC.addPersonStringRorX("charley11b.jpg", "height:maxw%", "rightpopup") +
						'She can\'t look disgusted if she can\'t control her face.',
						true, "dispPlace()"
					);
				}

				addPopupLinkC(md, 'cum on her face', "Splatter her.",
					perC.addPersonStringRorX("charley10" + (perC.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup") +
					'Maybe I should make her drink it too.',
					true, "dispPlace()"
				);

			}
			perC.addSleepLink(md, clvC == 1 && bMan ? "sleep while she sucks" : 'sleep with ' + nm, "A good nights rest",
				'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%">' + (clvC == 1 && bMan ? '<b>You command her to deepthroat your cock while you sleep on her couch.</b>' : '<b>You command her to go to bed with you.</b>'),
				(bMan && isExplicit() ? 'Explicit/' : '') + 'charleysleep' + (perC.checkFlag(2) ? "b" : "a") + '.jpg', false
			);
		} else {
			addPopupLinkC(md, 'ask her to ' + (perYou.isMaleSex() ? 'suck your cock' : 'lick your pussy'), "Milf Oral",
				perC.addPersonStringRorXBG("charley8" + (perC.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup") +
				nm + ' is clearly quite experienced at time and seems to enjoy pleasuring her lover with her mouth, tongue and hands',
				true, "dispPlace()"
			);
			if (bMan) {
				addPopupLinkC(md, 'ask her to use her tits', "Feels great!",
					perC.addPersonStringRorX("charley9" + (perC.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup") +
					'You suspect this may not be something she particularly enjoys, but she is happy to please her lover with her ample breasts.',
					true, "dispPlace()"
				);
			}
			addPopupLinkC(md, 'have sex with your milf lover', "Sexy Milf-Time",
				(isExplicit() ? perC.addPersonStringXBG("homefuck" + (perC.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup") :
									 perC.addPersonString("homefuck" + (perC.checkFlag(2) ? "b" : "a") + ".jpg", "height:maxw%", "rightpopup")) +
				'You have sex with your milf-lover, playing with her ample breasts and luscious body',
				 true, "dispPlace()"
			);			
			perC.addSleepLink(md, 'sleep with ' + nm, "A good nights rest",
				'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You ask ' + nm + ' to go to bed with you, and then to sleep for the night.</b>',
				'charleysleep' + (perC.checkFlag(2) ? "b" : "a") + '.jpg', false
			);
		}

	}
	addLinkToPlace(md, "leave her house", 5);

	WritePlaceFooter(md);
}