// Sharon's home

function ShowPlace468()
{
	var md = WritePlaceHeader();

	var perSharon = findPerson("Sharon");
	var clvS = perSharon.getCharmedLevel();
	var bHere = perSharon.isHere();
	var bMan = perYou.isMaleSex();
	
	if (bHere) perSharon.showPerson("sharonhome.jpg");

	addPlaceTitle(md, "Sharon\'s apartment", bHere ? '' : "sharonhouse.jpg");

	md.write('<p>Sharon\'s home is nicely furnished and feels pretty cozy. Not surprising for someone who specializes in relaxation.</p>');
	if (bHere) md.write('<p>Sharon is already kneeling on her bed with her breasts exposed. She knows that her body pleases you so she never wants to make you wait to see it.</p>');
	else md.write('<p>Sharon is at the Massage parlor now.</p>');

	startQuestions();

	if (bHere) {
		addPopupLinkC(md, 'take a bath with her', "She lives to please you.",
			(isExplicit() && bMan ? perSharon.addPersonString("sharonbath.jpg", "height:maxw%", "rightpopup") : perSharon.addPersonStringX("sharonbathb.jpg", "99%", "rightpopup")) +
			'She keeps checking to make sure she is doing everything right.',
			true, "dispPlace()"
		);
		addPopupLinkC(md, 'fuck her', "She needs to learn this technique too.",
			(bMan ? perSharon.addPersonRandomStringRorX("sharonfuckb", isExplicit() ? 2 : 1, "height:maxw%", "rightpopup") : perSharon.addPersonString("sharonfuckg.jpg", "99%", "rightpopup")) + 
			'Not that she\'s bad at it though.',
			true, "dispPlace()"
		);
		if (bMan) {
			addPopupLinkC(md, 'fuck her ass', "She needs to learn this technique too.",
				perSharon.addPersonStringRorX("sharonanalba.jpg", "height:maxw%", "rightpopup") +
				'Not that she\'s bad at it though.',
				true, "dispPlace()"
			);
		}
		if (bMan && isExplicit()) {
			perSharon.addSleepLink(md, "sleep while she sucks", "Attentive Servant",
				'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>Sharon is careful not to go too hard while you sleep because she knows you need your rest.</b>',
				'Explicit/sharonsleepb.jpg', true, '', '', '', "overflow-y:hidden"
			);
		} else {
			perSharon.addSleepLink(md, "sleep with Sharom", "Attentive Servant",
				'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>Sharon knows you need your rest.</b>',
				'sharonsleep.jpg', false, '', '', '', "overflow-y:hidden"
			);
		}
	}

	addLinkToPlace(md, "leave her apartment", 456);

	WritePlaceFooter(md);
}