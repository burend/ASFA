// Place: Esmeralda's apartment - Jessica's Room

function ShowPlace348()
{
	var perJessica = findPerson("Jessica");

	var md = WritePlaceHeader();
	perJessica.showPerson("jessica-home1.jpg");
	addPlaceTitle(md, "Jessica\'s Room");

	md.write(
		'<p>Esmeralda had clearly prepared Jessica\'s room in advance. She has a dresser with clothes her own size and some old memorabilia from her own time lined up on two shelves next to her bed, but no personal items yet.</p>' +
		'<p>Jessica has been expecting you and she\'s looking like a pin up model come to life, wearing little more than elegant lingerie and an inviting smile.</p>'
	);
	startQuestions();
	addLinkToPlace(md, 'leave Jessica\'s room', 346);
	addLinkToPlace(md, "leave the apartment", 344);
	WritePlaceFooter(md);
}