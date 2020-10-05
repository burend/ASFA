// Davy Robbins room via Pass spell

function PuzzleComputer(doc)
{
	if ((perDavy.checkFlag(33) && doc.FormChar.research.value.toLowerCase().trim() == 'e') ||
		 (perDavy.checkFlag(34) && doc.FormChar.research.value.split(" ").join("").split("'").join("").toLowerCase().trim() == 'butiwontdothat') ||
		 (perDavy.checkFlag(35) && doc.FormChar.research.value.toLowerCase().trim() == 'sandman')) {
		gotoPlace(80,"type=right");
	} else gotoPlace(80,"type=wrong");
}

function FindIt105(doc)
{
	if (isRunes()) Research("Spell", "ShioStinMur", "time1.jpg", 81);
	else ResearchOLD("P", doc.FormChar.research.value);
}

function ShowPlace80(stype)
{
	var md = WritePlaceHeader(sType === "");
	
	if (stype === "") {

		if (!perDavy.checkAnyFlags()) perDavy.setFlag(Math.floor(Math.random() * 3) + 33);

		addPlaceTitle(md, "Davy\'s Computer", '', 0, true);

		if (!isSpellKnown("Teleport")) {
			// if we don't already have the spell
			findPerson("Monique");
			per.setFlag(4);  // Set it to "have read the puzzle, need help.
		}

		md.write(
			'<p>You turn the computer on and access requires you to logon to the account. You try to guess a password but it is wrong, and a hint is shown for the correct one. If you can crack the meaning of the hint you will have access to Davy\'s files.</p>' +
			'<table class="table-main">' +
			'<tr><td class="td-left">' +
				'<img src="Images/time1.jpg" style="float:left;border-width:1px;width:95%" alt="Time">' +
			'</td>' +
			'<td class="td-center">' +
				'<p>Solve the problem:</p>' +
				'<div style="text-align:left">' +
				'<table class="table-main">' +
					'<tr><td style="text-align:center;background-image:url(' + getThemeFolder() + 'background.jpg)">'
		);
		if (perDavy.checkFlag(33)) md.write('<p style="text-align:center">What is at the beginning of eternity, the	end of time, the beginning of every end, and the end of every place?</p>');
		else if (perDavy.checkFlag(34)) md.write('<p style="text-align:center">Complete this line "I\'d do anything for love ..."</p>');
		else if (perDavy.checkFlag(35)) md.write('<p style="text-align:center">Complete this title "Enter ..."</p>');
		md.write('</td>' +
					'</tr>' +
					'<tr><td>' +
							'<form name="FormChar" onsubmit="PuzzleComputer(document);return false">' +
								'<input type="text" size="20" name="research">' +
								'<input type="submit" value="enter">' +
							'</form>' +
						'</td>' +
					'</tr>' +
				'</table>' +
				'</div><br>'
		);

		startQuestions();
		addLinkToPlace(md, "forget the password", 81);
		
	} else if (stype === "right") {

		addPlaceTitle(md, "Right Answer", '', 0, true);
		if (!perDavy.checkFlag(12)) addWallpapers(11, oImages.fixed.phonewallpapers);

		findPerson("Monique");
		per.setFlag(4, false);  // Gave the right answer, don't need help anymore

		md.write(
			'<p>You enter the correct password into the laptop and after a browsing for a while you find a couple of interesting images that you upload into your phone as wallpapers.</p>' +
			'<p>You then find a document that is called <b>"Spell to be deciphered"</b>. You examine the document and start working to decipher the spell.</p>'
		);
		if (!isRunes()) {
			md.write(
				'<div style="text-align:center">' +
					'<p style="margin-bottom:0">Unscramble the letters: hot rum is sin</p>' +
					'<table class="table-main">' +
						'<tr>' +
							'<td>' +
								'<form method="POST" name="FormChar">' +
									'<input type="text" size="20" name="research">' +
									'<input type="button" name="button" value="enter" onClick="FindIt105(document)">' +
								'</form>' +
							'</td>' +
						'</tr>' +
					'</table>' +
				'</div><br>');
		}

		startQuestions();

		if (isRunes()) addOptionLink(md, 'try to learn the spell', "FindIt105(document)");

		addLinkToPlace(md, 'forget the spell for now', 81);

	} else {
		addPlaceTitle(md, "Wrong Answer", '', 0, true);

		md.write('<p>You didn\'t get it right. Better luck next time.</p>');

		startQuestions();
	}
	
	addLinkToPlace(md, "leave Davy\'s room", 176);
	
	if (stype !== "") {
		AddRightColumnLarge();
		AddImage('time1.jpg');
	}
	
	WritePlaceFooter(md);
}