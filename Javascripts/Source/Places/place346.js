// Place: Esmeralda's apartment

function ShowPlace346()
{
	var perJessica = findPerson("Jessica");
	var perEsmeralda = findPerson("Gypsy");

	var md = WritePlaceHeader();
	addPlaceTitle(md, "Esmeralda's Apartment", 'home-esmeralda.jpg');

	md.write(
		'<p>Unlike Esmeralda\'s store, the living space behind it is well lit and employs a mix of modern and antique furniture and styles.</p>' +
		'<p>You see plenty of occult items neatly sorted on various shelves around the house as well as several books on Glenvale\'s history and the Arcane.</p>' +
		'<p>The place is pretty large, and considering the prices for property on the city center, Esmeralda must be pretty well off to be able to afford it.</p>'
	);
	if (perJessica.isHere()) md.write('<p>You hear noises from Jessica\'s room.</p>');
	if (perEsmeralda.isHere()) md.write('<p>There is a light coming from Esmeralda\'s room.</p>');

	startQuestions();
	if (perEsmeralda.isHere()) addLinkToPlace(md, 'enter Esmeralda\'s room', 347);
	else addLinkToPlace(md, 'enter Esmeralda\'s room', Place, '', 'Esmeralda\'s door is locked');
	if (perJessica.whereNow() == 348) addLinkToPlace(md, 'enter Jessica\'s room', 348);
	addLinkToPlace(md, "leave the apartment", 344);

	WritePlaceFooter(md);
}