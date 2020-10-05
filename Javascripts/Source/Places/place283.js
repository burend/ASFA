// Place: Hannah's apartment - Monique's Room

function ShowPlace283()
{
	var perMonique = findPerson("Monique");
	var clv = perMonique.getCharmedLevel();

	var md = WritePlaceHeader();

	perMonique.showPerson(clv < 4 ? "moniquehome1.jpg" : "monique15.jpg");
	addPlaceTitle(md, "Monique's Room");

	if (clv === 0) {
		// Not charmed
		md.write(
			'<p>It is interesting to see Monique owns a small collection of car models, though otherwise the room\'s interior is somewhat spartan. She has just the necessary furniture to store clothes, her bed in one corner and a book rack above the rather large computer desk in another.</p>' +
			'<p>Monique is dressed casually' + addVisible(' and she stands as you enter, "Hello, I did not know you were a friend of Hannah, you should of mentioned"') + '</p>'
		);
		startQuestions();

	} else {
		// Charmed
		md.write(
			'<p>Monique mentioned being into cars, so it\'s probably no surprise that she owns a small collection of models, though otherwise the room\'s interior is somewhat spartan. She has just the necessary furniture to store clothes, her bed in one corner and a book rack above the rather large computer desk in another.</p>'
		);
		if (clv > 1) md.write('<p>Your Faithful servant ' + addVisible('quickly rises from her PC as she sees you and almost pushes over her chair, quickly performing a small bow and asking what she may do for you.', 'is sitting at her PC.') + '</p>');
		else md.write('<p>Monique is dressed casually' + addVisible(' and she stands as you enter, "Hello, ' + perYou.getPersonName() + ' it is very nice to see you"') + '</p>');

		startQuestions();
		if (clv > 1) {
			if (!perYou.isMaleSex()) {
				addLinkToPlaceC(md, 'order Monique to use her soft lips on you', 283, 'type=moniquebj');
				if (perYourBody.FindItem(45) > 0) addLinkToPlaceC(md, 'take Monique with your strap on', 283, 'type=moniquefuck');
			} else {
				addLinkToPlaceC(md, 'order Monique to give you a blowjob', 283, 'type=moniquebj');
				addLinkToPlaceC(md, 'take Monique on her bed', 283, 'type=moniquefuck');
			}
			perMonique.addSleepLink(md, "go to bed for the night with Monique", "Going to bed with Monique", 
				'<p style="position:absolute;right:0;top:35%;cursor:pointer;font-size:1.1em;width:75%;color:black;text-align:right">You notice that night has fallen,<br>and tell Monique that you will spend the night with her.</p>',
				"moniquebed.jpg"
			);
		}
	}

	addLinkToPlace(md, "leave Monique\'s room", 237);
	addLinkToPlace(md, "leave the apartment", 194);

	WritePlaceFooter(md);
}