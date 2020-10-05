function FindItCupboard2(doc)
{
	var sBody = doc.FormChar.research.value.toLowerCase().trim();
	var perMonique = findPerson("Monique");
	if ((perMonique.checkFlag(33) && sBody == "one word") ||
		 (perMonique.checkFlag(34) && sBody == "bookkeeper") ||
		 (perMonique.checkFlag(35) && sBody == "balance"))
	{
		setPlaceFlag("Hotel", 6);
		perMonique.setFlag(3, false);
		sBody = "Correct, wise one! You may now attempt to learn a new spell.  May your wisdom serve you well.";
		Place = 161;
	} else {
		sBody = "Incorrect. Try again.";
	}
	gotoPlace(Place, '', sBody);
}

function ShowPlace162()
{
	var md = WritePlaceHeader();
	
	var perMonique = findPerson("Monique");
	perMonique.setFlag(3);
	if (!perMonique.checkAnyFlags(33, 35)) perMonique.setFlag(Math.floor(Math.random() * 3) + 33);
			
	// Title
	addPlaceTitle(md, "Cupboard Puzzle", "cupboard.jpg");

	// Description
	md.write(
		'<p style="text-align:center">Only the wise one could know the meaning of the word.</p>' +
		'<form method="POST" name="FormChar">'
	);
	
	if (perMonique.checkFlag(33)) md.write('<p style="text-align:center">How would you rearrange the letters in the words new door to make one word?</p>');
	else if (perMonique.checkFlag(34)) md.write('<p style="text-align:center">If it\'s information you seek, come and see me. If it\'s pairs of letters you need, I have consecutively three. Who am I?</p>');
	else md.write('<p style="text-align:center">A natural state, I\'m sought by all. Go without me, and you shall fall. You do me when you spend, and use me when you eat to no end. What am I?</p>');
	
	md.write(
			'<p style="text-align:center"><input type="text" size="20" name="research">' +
			'<input type="button" name="button" value="please" onClick="FindItCupboard2(document)"></p>' +
		'</form>'
	);

	startQuestions();
	addLinkToPlace(md, "look around the cellar", 161);

	WritePlaceFooter(md);
}