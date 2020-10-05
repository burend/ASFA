// Event: Party Puzzle

function PuzzleParty(doc) {
	var perMG = findPerson("MrsGranger");
	if (perMG.checkFlag(33)) {
		if ((doc.Puzzle.answer.value * 40 / 5) == 56) gotoPlace(39,'type=right');
		else gotoPlace(39,'type=wrong');
	} else {
		if (doc.Puzzle.answer.value == 3) gotoPlace(39,'type=right');
		else gotoPlace(39,'type=wrong');
	}
}

function ShowPlace39()
{
	var md = WritePlaceHeader(true);
	
	var perMG = findPerson("MrsGranger");
	
	if (sType == "right") {
		addPlaceTitle(md, "Right Answer", '', 0, true);

		AddCash(5);
		perMG.extra[1] = 10;

		if (perMG.checkFlag(33)) {
			// Party
			md.write(
				'<table class="table-main"><tr><td style="width:70%">' +
				'<p>Mrs. Granger is overjoyed with the help that you gave her. <p>&quot;How did you figure it out?&quot; she asks. &quot;The party ' +
				'will consist of 2 little girls and a boy, their father and mother, and their father\'s father and mother. Now I ' +
				'can have a party with my family. Here, let me give you ' + sCurrency + '5 for your help.&quot;</p>' +
				'<p>You thank the lady for the money and slip the cash ' +
				'into your wallet. It might not be much but you never know when it will come in handy.</p>' +
				'<p>&quot;It\'s such a pleasure to have you visit ' + perYou.getPersonName() + ',&quot; Mrs. Granger says, smiling in gratitude.</p>' +
				'<p>She moves to sit down, but seems to have another idea, "One last question, what sort of hostess do you think I will make at the party?"</p>'
			);
			startQuestions("You answer");
			addLinkToPlaceC(md, '"An elegant hostess"', 177, "", "She smiles at your compliment and sits down to talk more with you", "Mrs. Granger");
			addLinkToPlaceC(md, '"A beautiful hostess"', 177, "", "She smiles at your compliment and sits down to talk more with you", "Mrs. Granger");
			addLinkToPlaceC(md, '"A sexy hostess"', 177, "", "She blushes, &quot;You should not let Kate hear you say that, Hon&quot; and leans in and gives you a kiss on your cheek. You notice she slipped an extra " + sCurrency + "5 in your pocket as she did.", "Mrs. Granger", "setPersonFlag('MrsGranger',2);AddCash(5);");
		} else {
			// Pantie
			md.write(
				'<table class="table-main"><tr><td style="width:70%">' +
				'<p>Mrs. Granger is overjoyed with the help that you gave her. <p>&quot;That makes sense, ' +
				'at the worst case I take out a white pair then a pink pair. The next pair will match one of the previous picks&quot; she says.' +
				'"Here, let me give you ' + sCurrency + '5 as a reward.&quot;</p>' +
				'<p>You thank the lady for the money and slip the cash into your wallet. It might not be much but you never know when it will come in handy.</p>' +
				'<p>&quot;It\'s such a pleasure to have you visit ' + perYou.getPersonName() + ',&quot; Mrs. Granger says, "Fortunately I do not <i>have</i> to work today".</p>' +
				'<p>She moves to sit down, and a wicked smile forms on her face, "One last question, what colour am I wearing today?"</p>'
			);
			startQuestions("You answer");
			addLinkToPlaceC(md, '"White"', 177, "", "She smiles &quot;Not today&quot; and sits down to talk more with you", "Mrs. Granger");
			addLinkToPlaceC(md, '"Pink"', 177, "", "She smiles &quot;Not today&quot; and sits down to talk more with you", "Mrs. Granger");
			addLinkToPlaceC(md, '"You are not wearing any"', 177, "", "She smiles and leans over and whispers in your ear, &quot;As if I would do that&quot; but does not correct your answer. She gives you a kiss on your cheek and returns to where she was sitting. You notice she slipped an extra " + sCurrency + "5 in your pocket as she did.", "Mrs. Granger", "setPersonFlag('MrsGranger', 2);AddCash(5);");
		}

		addLinkToPlace(md, "decline to answer and talk to Mrs. Granger some more", 177);
		AddRightColumnMed(md);
		perMG.showPerson("granger4b.jpg");

	} else if (sType == "wrong") {

		perMG.extra[1] = 9;

		addPlaceTitle(md, "Wrong Answer", '', 0, true);

		md.write(
			'<table class="table-main"><tr><td style="width:70%">' +
			'Mrs. Granger is disappointed..<p>&quot;Kate told me how clever you are!&quot; she sighs. &quot;Well maybe you are clever ' +
			'compared to the other youth of today but you are of no help to me.&quot;</p>' +
			'<p>Embarrassed about your mistake, you mumble apologies. It is a shame that you got the wrong answer. After a ' +
			'moment of discomfort Mrs. Granger smiles her forgiveness.</p>'
		);

		startQuestions();
		addLinkToPlace(md, "talk to her some more", 177);
		AddRightColumnMed(md);
		perMG.showPerson("granger4b.jpg");
		
	} else {

		if (perMG.extra[1] > 6) return dispPlace(177);

		addPlaceTitle(md, perMG.checkFlag(33) ? "Party Puzzle" : "Panty Puzzle", '', 0, true);
		
		if (perMG.checkFlag(33)) {
			// Party
			md.write(
				'<table class="table-main" style="vertical-align:top"><tr><td>' +
				'I want to invite a family to a party.<br><br>' +
				'The family has 1 grandfather, 1 grandmother, 2 fathers, 2 mothers, 4 children, 3 grandchildren, ' +
				'1 brother, 2 sisters, 2 sons, 2 daughters, 1 father-in-law, 1 ' +
				'mother-in-law, and 1 daughter-in-law.<br><br>A total of 23 ' +
				'people, you might think, but that\'s not correct. Oh, how ' +
				'many people are there?' +
				'<form method="POST" name="Puzzle">' +
					'<p style="text-align:center">Answer: <select name="answer" size="1">' +
						'<option selected value="1">1</option>' +
						'<option value="2">2</option>' +
						'<option value="3">3</option>' +
						'<option value="4">4</option>' +
						'<option value="5">5</option>' +
						'<option value="6">6</option>' +
						'<option value="7">7</option>' +
						'<option value="8">8</option>' +
						'<option value="9">9</option>' +
						'<option value="10">10</option>' +
						'<option value="11">11</option>' +
						'<option value="12">12</option>' +
						'<option value="13">13</option>' +
						'<option value="14">14</option>' +
						'<option value="15">15</option>' +
						'<option value="16">16</option>' +
						'<option value="17">17</option>' +
						'<option value="18">18</option>' +
						'<option value="19">19</option>' +
						'<option value="20">20</option>' +
						'<option value="21">21</option>' +
						'<option value="22">22</option>' +
						'<option value="23">23</option>' +
					'</select> ');
		} else {
			// Panty
			md.write(
				'<table class="table-main" style="vertical-align:top"><tr><td>' +
				'I am curious about getting dressed for work. I do like my short skirts and my job can be quite messy. So I <i>have</i> to wear panties to work and I usually take a spare pair in case of problems on a dig.<br><br>' +
				'My drawer contains 10 pairs of white panties and 10 pairs of pink panties and I usually get dressed when it is still a bit dark. I take one pair at a time and check their colour after I take them out of the drawer. How many pairs do I need to take out to be guaranteed I have two pairs the same colour?' +
				'<form method="POST" name="Puzzle">' +
					'<p style="text-align:center">Answer: <select name="answer" size="1">' +
						'<option selected value="1">1</option>' +
						'<option value="2">2</option>' +
						'<option value="3">3</option>' +
						'<option value="4">4</option>' +
						'<option value="5">5</option>' +
						'<option value="6">6</option>' +
						'<option value="7">7</option>' +
						'<option value="8">8</option>' +
						'<option value="9">9</option>' +
						'<option value="10">10</option>' +
						'<option value="11">11</option>' +
						'<option value="12">12</option>' +
						'<option value="13">13</option>' +
						'<option value="14">14</option>' +
						'<option value="15">15</option>' +
						'<option value="16">16</option>' +
						'<option value="17">17</option>' +
						'<option value="18">18</option>' +
						'<option value="19">19</option>' +
						'<option value="20">20</option>' +
					'</select> ');
		}

		md.write('<input type="button" name="button" value="Go" onClick="PuzzleParty(document)"></p></form>');

		AddRightColumnMed(md);
		perMG.showPerson("granger4a.jpg", "height:max");
	}

	WritePlaceFooter(md);
}