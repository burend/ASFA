// Place: Donna's Room

function ShowPlace185(stype)
{
	var md = WritePlaceHeader();
	
	var perDonna = findPerson("Donna");
	
	// Strip-tease event
	if (stype == "strip1") {
		
		setPlaceKnown("DonnasRoom");
		perDonna.showPerson("donna-hotel2.jpg");
		addPlaceTitle(md, "Donna\'s Strip-tease");
		md.write(
			'<p>After you enter Donna’s room she closes the door behind you and turns to you. In a few seconds she’s already out of her dress and leaning against the door in only her black stockings.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, '"Turn around! Make it sexy!"', 185, 'type=strip2');

	} else if (stype == "strip2") {
		
		perDonna.showPerson("donna-hotel3.jpg");
		addPlaceTitle(md, "Donna\'s Strip-tease");
		md.write(
			'<p>She flashes a smile at you, obeying your request.</p>' +
			'<p>"I know that my little clam is much better than those girls’s",  Donna teases you while slowly turns around facing the door. She puts both her hands up to give you a better look.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, '"No way! You look good, but nowhere near as good as Bambi or Miss Titus. God, she has world class tits!"', 185, 'type=strip3');

	} else if (stype == "strip3") {
		
		perDonna.showPerson("donna-hotel4.jpg");
		addPlaceTitle(md, "Donna\'s Strip-tease");
		md.write(
			'<p>You giggle to yourself knowing that Donna will try even harder now.</p>' +
			'<p>"Okay, but these legs are a thing to die for. You gotta acknowledge at least that!", she says.</p>' +
			'<p>Your ginger friend pulls her legs towards the sky, stretching them as strongly as she can.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, '"Have to agree there! You put up a nice show!"', 185, 'type=strip4');

	} else if (stype == "strip4") {
		
		perDonna.showPerson("donna-hotel5.jpg");
		addPlaceTitle(md, "Donna\'s Strip-tease");
		md.write(
			'<p>She kneels in front of the door, trying to position her naked body for the best experience you can get.</p>' +
			'<p>"And this little show is only for besties like you!", she adds, a sensation in her voice can be heard. You understand now; she is having an orgasm just by teasing you. Donna doesn’t look at you instead looking at the floor, reminding you  of your slaves.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, '"Whew! That really did the trick! I feel great! I can already forget about all those annoyances!"', 185, 'type=strip5');

	} else if (stype == "strip5") {
		
		perDonna.showPerson("donna-hotel5.jpg");
		addPlaceTitle(md, "End of Donna\'s Strip-tease");
		md.write(
			'<p>Donna looks up to you and you notice something in her eyes. The purple glow vividly dances, pointing out to you the power you have over her. And this power is growing as you can see the submissiveness in her eyes.</p>' +
			'<p>"Whenever you want it! That’s what friends are for!"</p>'
		);

		startQuestions();

	} else {

		// General visit
		if (!isDay()) perDonna.showPerson("donna8.jpg");
		else addPlaceImage(md, "hotel5.jpg");

		addPlaceTitle(md, "Donna\'s Room");

		if (isDay()) md.write('<p>Donna\'s hotel room, empty as Donna is not here, most lkely at the pool.</p>');
		else {
			if (!isPlaceKnown("DonnasRoom")) setPlaceKnown("DonnasRoom");
			md.write(
				'<p>Donna’s in her lingerie, sitting by the only table in her room. She plays with her stockings, trying to fix it when you enter.'
			);
			if (isVisible()) {
				md.write(
					'She leaves her lingerie as it is and hugs you, motioning you to sit down on her bed.</p>' +
					'<p>"' + perYou.getPersonName() + ', I’m glad to see you. Please feel at home. What’s mine is yours, as always. That includes my body too, you know…” she is trying to seduce you to bed. She is showing her pretty chest to you and holding you with both of her hands.</p>'
				);
			} else md.write('</p>');
		}
		
		startQuestions();

		if (!isDay()) {
			addLinkToPlace(md, 'enjoy Donna', Place, 'type=enjoy');
			perDonna.addSleepLink(md, "go to bed for the night with Donna", "Sleeping with Donna",
				'<p style="position:absolute;left:4%;top:2em;cursor:pointer;font-size:1.1em;width:60%">' +
				'You jump into the bed followed by Donna. Raw, friends with benefits type of sex keeps you awake through most of the night. When Donna is exhausted she goes to take a shower, finnally letting you some well deserved sleep. Your bestie joins you in your rest, tugging in and hugging you from the back.',
				"donna10.jpg", false, 124, '', 'In the morning you join your friend Donna for breakfast in the bar', "top:10%;left:5%;width:85%;height:80%;padding:0"
			);
		}
	}
	
	addLinkToPlace(md, "go to the Hotel Bar", 124);

	WritePlaceFooter(md);
}