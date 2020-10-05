// Place: School Oval

function ShowPlace144(stype)
{
	var md = WritePlaceHeader();

	var perKylie = findPerson("Kylie");
	var clv = perKylie.getCharmedLevel();

	if (stype.substr(0, 5) == "charm") {
		// Charm spell
		var idx = parseInt(stype.charAt(5), 10) + 1;
		perKylie.showPerson("kylie" + idx + ".jpg");
		addPlaceTitle(md, "Cousin Kylie Under a Charm Spell");

		if (stype == "charm1") {

			md.write(
				'<p>You call out to your cousin Kylie and ask her to join you for a little. She looks at you and smiles,</p>' +
				'<p>"Sure ' + perYou.getPersonName() + ' but don\'t think that we are going to be \'Kissing Cousins\', family is out of the question!". She is smiling, this is more her way of joking around with you than a warning.</p>' +
				'<p>You do not agree though with her, she is virtually a stranger and very cute, so you tell her "Dai Chu Kylie!"</p>' +
				'<p>She looks at you oddly, "Ehhh what was that Cuz" and she glances around and you see the other players have left the court and you are almost alone now. She continues,</p>' +
				'<p>"Cuz, we are not really close family are we", and she partly pulls down the back of her shorts. "It is strange, I really feel like I would like to get to know you better, so maybe a little making out and touching..."</p>' +
				'<p>Wow, she has fallen under the spell quickly, maybe she already liked you a bit</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'touch her', 144, "type=charm2");
			WritePlaceFooter(md, '', false, true);
			return;

		} else if (stype == "charm2") {

			md.write(
				'<p>You reach out to touch her tantilising ass, but she laughs and amost dances away as she pulls up her shorts. She gestures to you in a \'come this way\' fashion and leads you to a partly secluded bench. You start to talk to her about obedience, but she laughs,</p>' +
				'<p>"Hey Cuz, who wants to talk about boring who is in charge stuff. I am more interested in talk of who is on <i>top</i>!"</p>' +
				'<p>Your immediate thought is what is it with the women of your family, everyone wants to be in charge. As you think this she sits rather provocatively, pulling aside her shorts showing her cleanly shaven pussy and a lack of panties.</p>' +
				'<p>"Well Cuz, isn\'t this a better thing to talk about. How about you kiss your cousin, in a more <i>personal</i> way?"</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'kiss your cousin', 144, "type=charm3");
			WritePlaceFooter(md, '', false, true);
			return;

		} else if (stype == "charm3") {

			if (!perKylie.checkFlag(2)) {
				PlaceI(5);
				perKylie.setFlag(2);
			}

			md.write(
				'<p>Kylie guides you to kiss her <i>intimately</i> and passionately! Together you explore and enjoy each others bodies. As children you may of last hugged, but now as adults you can truly embrace each other.</p>' +
				'<p>Later you dress and Kylie <i>mostly</i> does, her shorts removed and showing her delightful ass for your, and her, enjoyment.</p>' +
				'<p>As she shows off to you, Kylie stumbles and picks up something partially buried in the sand of the volleyball court</p>' +
				'"It\'s one of these silly things, carved by someone who knows nothing about art!", and she drops the familiar looking stone.</p>'
			);


		}

	} else {

		// Description
		addPlaceTitle(md, "School Sports Fields", isShopOpen(2) ? "schoolfield2.jpg" : "schoolfield1.jpg");
		setPlaceKnown("SchoolField");

		// Default/no event
		md.write(
			'<p>The sporting fields for Glenvale High border part of the park on one side, and the school on the others. Glenvale High is proud of it\'s sporting achievements but as of yet it is not highly ranked in sports, but everyone is working to improve this. Well, almost everyone, magic has always been more interesting to you.</p>' +
			'<p>There are a variety of areas, from the ovals and volleyball and tennis courts. You have often seen matches being played on the courts at lunch time.</p>' +
			'<p>There is a simple noticeboard listing reservations for fields and courts. The list is chaotic with many changes and erasures, but there is a volleyball match fairly consistently around lunch time most school days.</p>'
		);
		if (perKylie.isHere()) {
			if (clv > 0) {
				md.write(
					'<p>Kylie is waiting for you near the courts,<br>' +
					'"Hey Cuz, how about we explore the term \'Kissing Cousins\'?"</p>'
				);
			} else {
				md.write(
					'<p>Your cousin Kylie is over at the volleyball court, playing a game with some friends. She flashes you a cute smile.</p>'
				);
			}
		}
	}

	startQuestions();
	if (sType === "") {
		if (isDay()) addLinkToPlace(md, "sit on a bench for a while and watch a game", '', '', 'You kill some time for an hour, watching a game being played', '', 'WaitHereOnly(5);');
		else addLinkToPlace(md, "sit on a bench for a while", '', '', 'You kill some time for an hour,', '', 'WaitHereOnly(5);');
	}

	if (perKylie.isHere()) {
		if (clv > 0) addLinkToPlace(md, "kiss your cousin", 144, 'type=kiss');
	}
	if (isShopOpen(2)) addLinkToPlace(md, "enter the School", 70);
	if (isPlaceKnown("Park")) addLinkToPlace(md, "walk into the park", 63);
	addLinkToPlace(md, "return to the front of the school", 9);

	if (perKylie.isHere() && stype != "charm3") {
		AddPeopleColumnLarge();
		perKylie.showPerson(clv > 0 ? "kylie1b.jpg" : "kylie1a.jpg");
	}

	WritePlaceFooter(md);
}