// Event: Radio Quiz

function PuzzleRadio(doc)	{
	var perMadison = findPerson("Madison");
	if ((perMadison.checkFlag(33) && (doc.Puzzle.answera.selectedIndex * 44 / 25) == 1.76) ||
		 (perMadison.checkFlag(34) && doc.Puzzle.answera.value == 5) ||
		 (perMadison.checkFlag(35) && doc.Puzzle.answera.value == 3))	{
		gotoPlace(287, "type=correct");
	} else {
		gotoPlace(287, "type=wrong");
	}
}

function ShowPlace287(stype)
{
	var md = WritePlaceHeader();

	var perMadison = findPerson("Madison");

	if (perYou.getQuestRustyKey() == 900) return dispPlace(45);	//  Already failed the puzzle (so you can't keep trying)

	if (stype === "") {
		if (!perMadison.checkAnyFlags(33, 35)) perMadison.setFlag(Math.floor(Math.random() * 3) + 33);

		if (perYou.getQuestRustyKey() < 3) perYou.setQuestRustyKey(3); 	//  Set the Variable to "Trying the puzzle"
		if (!isPlaceKnown("TVStation")) setPlaceKnown("TVStation");	//Know about the radio station after trying the puzzle

		addPlaceTitle(md, "Phone Call", getThemeFolder() + 'antenna.png');

		md.write(
			'<p>You listen to the phone message.</p>' +
			'<p>"Hi," says a clear male voice. "This is local radio station MC 550. You are our lucky random call. Can you guess the answer to this puzzle for a prize stereo?"</p>'
		);

		if (!isPuzzles()) {
			md.write('<p>The person asks you to answer a word game, and you are fairly sure you know the answer.</p>');
			startQuestions();
			addLinkToPlace(md, "answer confidently", 287, "type=correct");
			addLinkToPlace(md, "ummmm...on second thoughts I do not know", 287, "type=wrong");
			WritePlaceFooter(md);
			return;
		}

		if (perMadison.checkFlag(33)) {
			md.write(
				'<p>What comes next in this sequence:</p>' +
				'<form method="POST" name="Puzzle">' +
					'<div style="text-align:center"><table style="background-image:url(' + getThemeFolder() + 'background.jpg);padding:0px;border-collapse:collapse;border-spacing:0">' +
					'<tr>' +
						'<td>Dog, Cat, Mouse, Mole, Deer, Pig,&nbsp;</td>' +
						'<td> ' +
							'<select name="answera" size="1">' +
								'<option selected value="1">Cow</option>' +
								'<option value="2">Llama</option>' +
								'<option value="3">Rabbit</option>' +
								'<option value="4">Frog</option>' +
							'</select>'
			);
		} else if (perMadison.checkFlag(34)) {
			md.write(
				'<p>What mathematical symbol can be put between 5 and 9, to get a number bigger than 5 and smaller than 9?</p>' +
				'<form method="POST" name="Puzzle">' +
					'<div style="text-align:center"><table style="background-image:url(' + getThemeFolder() + 'background.jpg);padding:0px;border-collapse:collapse;border-spacing:0">' +
					'<tr>' +
						'<td>+-*/.|&amp;,&nbsp;</td>' +
						'<td> ' +
							'<select name="answera" size="1">' +
								'<option selected value="1">+</option>' +
								'<option value="2">-</option>' +
								'<option value="3">/</option>' +
								'<option value="4">*</option>' +
								'<option value="5">.</option>' +
								'<option value="6">|</option>' +
								'<option value="7">&amp;</option>' +
							'</select>'
			);
		} else {
			md.write(
				'<p>Two men decided to take a fishing trip. Both had one son and brought him along. Everyone on the trip caught and kept at least one fish. What\'s the fewest number of fish that could have been kept?</p>' +
				'<form method="POST" name="Puzzle">' +
					'<div style="text-align:center"><table style="background-image:url(' + getThemeFolder() + 'background.jpg);padding:0px;border-collapse:collapse;border-spacing:0">' +
					'<tr>' +
						'<td>How many?&nbsp;</td>' +
						'<td> ' +
							'<select name="answera" size="1">' +
								'<option selected value="1">1</option>' +
								'<option value="2">2</option>' +
								'<option value="3">3</option>' +
								'<option value="4">4</option>' +
							'</select>'
			);
		}

		md.write(	'</td>' +
					'<td> ' +
						'<input type="button" name="button" value="Answer" onClick="PuzzleRadio(document)">' +
					'</td>' +
				'</tr>' +
				'</table>' +
				'</div>' +
			'</form><br>'
		);

		startQuestions();
		addLinkToPlace(md, "give up", 45);

	} else if (stype == "correct") {
		if (perYou.getQuestRustyKey() < 5) perYou.setQuestRustyKey(5);
		perYou.setFlag(1);
		addPlaceTitle(md, "Correct Answer!", getThemeFolder() + "antenna.png");

		if (!isPuzzles()) md.write('<p>"You got it!"</p>');
		else {
			if (perMadison.checkFlag(33)) md.write('<p>"You got it! Llama! The length of each word is the same length of the numbers one, two, three, four, five, six, etc."</p>');
			else if (perMadison.checkFlag(34)) md.write('<p>"You got it! It\'s a trick, you put a Decimal Point, 5.9 works nicely"</p>');
			else md.write('<p>"You got it! There were only three people. The son, his father, and his grandfather."</p>');
		}

		md.write('<p>"Congratulations, your prize will be delivered very soon by \'G.R USX Deliveries\' a subsidary of MC 550 Radio!"</p>');
		startQuestions();
		addLinkToPlace(md, "Hang up the phone", 45);

	} else if (stype == "wrong") {
		if (perYou.getQuestRustyKey() < 900) perYou.setQuestRustyKey(900);
		addPlaceTitle(md, "Wrong Answer!", getThemeFolder() + "antenna.png");

		md.write(
			'<p>"Bad luck. Now for our next caller..."</p><p>The person hangs up, you have lost your chance for a new stereo.</p>'
		);

		startQuestions();
		addLinkToPlace(md, "Hang up the phone", 45);

	}
	WritePlaceFooter(md);
}