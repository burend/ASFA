// Study Puzzle

function StudyPuzzle(doc, bTrue)
{
	var perKate = findPerson("Kate");
	if (bTrue === undefined) {
		bTrue = (perKate.checkFlag(33) && doc.Puzzle.answer.selectedIndex * 25 / 50 == 3.5) ||
			(perKate.checkFlag(34) && doc.Puzzle.answer.value == 29) ||
			(perKate.checkFlag(35) && doc.Puzzle.answer.value == 24);
	}
	if (bTrue) {
		perKate.other = 5;
		PlaceI(3, 13);
	} else {
		perKate.other = 4;
		PlaceI(3, 3);
	}
	dispPlace(13);
}

function ShowPlace12()
{
	var md = WritePlaceHeader(true);

	addPlaceTitle(md, "Mathematical Puzzle", '', 0, true);
	
	var perKate = findPerson("Kate");
	if (!perKate.checkFlag(33) && !perKate.checkFlag(34) && !perKate.checkFlag(35)) perKate.setFlag(Math.floor(Math.random() * 3) + 33);

	md.write(
		'<div style="text-align:left;">' +
		'<table class="table-main"><tr>' +
		'<td colspan="2"><p>This puzzle looks quite easy for a mathematical genius like yourself. Kate looks to you with ' +
        'hopeful expection. If only you could solve this problem she might like you a whole lot more but be careful. You only get one shot.</p>' +
		'</td></tr><tr>' +
		'<td style="width:40%">'
	);
	
	if (!isPuzzles()) {
		md.write(
			'<img src="Images/math1.jpg" width="95%" style="float:left;margin:0px 5px" alt="Math"/>' +
			'</td><td style="vertical-align:top">' +
			'<p>You study Kate\'s math problem and you can see the answer to it</p>'
		);
		startQuestions();
		addOptionLink(md, "answer the problem", "StudyPuzzle(document,true)");
		addOptionLink(md, "be distracted by Kate and get the problem wrong", "StudyPuzzle(document,false)");

	} else if (perKate.checkFlag(33)) {
		md.write(
			'<img src="Images/math1.jpg" width="95%" style="float:left;margin:0px 5px" alt="Math"/>' +
			'</td><td style="vertical-align:top">' +
			'<div style="text-align:center;">Insert the missing number: ' +
			'<table style="background-image:url(' + getThemeFolder() + 'background.jpg);padding:0px;border-collapse:collapse;border-spacing:0;border-width:0;margin-right:auto;margin-left:auto">' +
			'<tr><td style="text-align:center;width:30px"><p style="text-align:center;">6</p></td><td style="text-align:center;width:30px"><p style="text-align:center;">17</p></td><td style="text-align:center;width:30px"><p style="text-align:center;">37</p></td></tr>' +
				'<tr><td style="text-align:center;width:30px"><p style="text-align:center;">10</p></td><td style="text-align:center;width:30px"><p style="text-align:center;">10</p></td><td style="text-align:center;width:30px"><p style="text-align:center;">25</p></td></tr>' +
				'<tr><td style="text-align:center;width:30px"><p style="text-align:center;">12</p></td><td style="text-align:center;width:30px"><p style="text-align:center;">32</p></td><td style="text-align:center;width:30px"><p style="text-align:center;">?</p></td></tr>' +
				'</table></div>' +
			'<form method="POST" name="Puzzle">' +
				'<p style="text-align:center;">Answer: ' +
				'<select name="answer" size="1"> <option selected value="8">8</option><option value="12">12</option><option value="13">13</option><option value="16">16</option><option value="44">44</option><option value="52">52</option><option value="64">64</option><option value="70">70</option><option value="75">75</option><option value="90">90</option></select>'
		);
		
	} else if (perKate.checkFlag(34)) {
		AddImage("math2.jpg");
		md.write(
			'</td><td style="vertical-align:top">' +
			'<div style="text-align:center;">Insert the missing number <span style="font-size:x-small">(puzzle by Stephen Froggatt)</span>: ' +
			'<form method="POST" name="Puzzle">' +
				'<p style="text-align:center;">Answer: ' +
				'<select name="answer" size="1">' +
					'<option selected value=7">7</option>' +
					'<option value="12">12</option>' +
					'<option value="13">13</option>' +
					'<option value="16">16</option>' +
					'<option value="29">29</option>' +
					'<option value="52">52</option>' +
					'<option value="64">64</option>' +
					'<option value="70">70</option>' +
					'<option value="75">75</option>' +
					'<option value="90">90</option>' +
				'</select>'
		);
		
	} else {
		AddImage("math3.jpg");
		md.write(
			'</td><td style="vertical-align:top">' +
			'<div style="text-align:center;">Insert the missing number <span style="font-size:x-small">(puzzle by Stephen Froggatt)</span>: ' +
			'<form method="POST" name="Puzzle">' +
				'<p style="text-align:center;">Answer: ' +
				'<select name="answer" size="1">' +
					'<option selected value="8">8</option>' +
					'<option value="12">12</option>' +
					'<option value="13">13</option>' +
					'<option value="24">24</option>' +
					'<option value="44">44</option>' +
					'<option value="56">56</option>' +
					'<option value="64">64</option>' +
					'<option value="79">79</option>' +
					'<option value="75">75</option>' +
					'<option value="90">90</option>' +
				'</select>'
		);
	}
	
	if (isPuzzles()) {
		md.write(' <input type="button" name="button" value="Answer" onClick="StudyPuzzle(document)"></p></form>');
		startQuestions('If it is too hard then:');
	}
	addOptionLink(md, "go to the library reception?", "LeaveKate7()");

	WritePlaceFooter(md);
}