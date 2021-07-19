// Place: Kylie's Room

function ShowPlace401()
{
	var perKylie = findPerson("Kylie");
	var bHereK = perKylie.isHere();
	var perBrandi = findPerson("Brandi");
	
	var md = WritePlaceHeader();
	
	if (bHereK) perKylie.showPerson(perBrandi.isCharmedBy() ? 'bedroom2.jpg' : 'bedroom1.jpg');
	addPlaceTitle(md, "Kylie\'s Bedroom", bHereK ? '' : "bedroom12.jpg");
	md.write(
		'<p>Kylie\'s bedroom is what you would expect from a girl\'s room, some old stuffed toys, a definite pink theme, but there are signs of her sporting interests. You see a volleyball on the floor and some other sporting equipment in one corner.</p>'
	);
	
	startQuestions();
	addLinkToPlace(md, 'leave the bedroom', 400);
	addLinkToPlace(md, 'leave the house', 37);

	WritePlaceFooter(md);
}