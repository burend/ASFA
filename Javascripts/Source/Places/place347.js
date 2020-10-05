// Place: Esmeralda's apartment - Esmeralda's Room

function ShowPlace347()
{
	var perEsmeralda = findPerson("Gypsy");

	var md = WritePlaceHeader();
	perEsmeralda.showPerson('gypsy5.jpg');
	addPlaceTitle(md, "Esmeralda's Room");

	md.write(
		'<p>Esmeralda has traded the elaborate Gypsy attire for a more comfortable looking dress. She puts the book she had been reading aside to greet you as you enter her room.</p>'
	);
	
	startQuestions();
	addLinkToPlace(md, 'leave Esmeralda\'s room', 346);
	addLinkToPlace(md, "leave the apartment", 344);
	WritePlaceFooter(md);
}