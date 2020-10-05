// Place: Aquarium Information Desk

function ShowPlace394(stype)
{
	var perAbby = findPerson("Abby");
	var perMiku = findPerson("Miku");
	var bCharm = perAbby.isCharmedBy();

	var md = WritePlaceHeader(false, perMiku.isHere() ? "" : "td-left-large");

	if (perMiku.isHere()) perAbby.showPerson("abby1d.jpg", "", "", "", "Information Slave Girl");
	else if (bCharm) perAbby.showPersonRandom("abby1", 3, "", "", "", "Information Slave Girl");
	else perAbby.showPerson("abby1.jpg", "", "", "", "Information Girl");

	addPlaceTitle(md, "Aquarium Information Desk");

	if (perMiku.isHere()) md.write('<p>Abby and Miku are completely engaged in their conversation, well, Abby is, while Miku does her best to keep up and occasionally nods. She seems surprisingly unconcerned with Abby\'s nudity' + addVisible(' and right now pretty distracted from you') + '.</p>');
	else if (bCharm) md.write('<p>You visit the information desk and see Abby' + addVisible(' is happy to see you') + '. She is completely naked with her clothes neatly folded on a desk.</p>' + addVisible('<p>She smiles and joins you ready to assist you in any way she can.</p><p>She brightly talks about all the ways she can <i>help</i> you and how you can <i>help</i> her. As always she continuously talks and talks and talks.</p>'));
	else md.write('<p>You visit the information desk and see the cute young woman attending the desk ready to answer ' + addVisible('your questions about the aquarium.</p><p>Before you ask anything she brightly gives you advice about new exhibits and almost will not let you get a word in amongst all her recommendations', 'people\'s questions, she is talking at length to a customer') + '.</p>');

	startQuestions();
	if (bCharm && whereItem(35) == 279 && !perAbby.checkFlag(9)) addLinkToPlaceC(md, perAbby.checkFlag(7) ? '"Again can we talk about the dragon gem"' : '"Do you know about the dragon gem"', 394, 'type=gem');
	if (checkPlaceFlag("Alley", 9) && whereItem(35) == 279 && perAbby.checkFlag(9)) {
		if (isConspiracyPath() && !checkPlaceFlag("Alley", 8)) addLinkToPlaceC(md, '"There is a Dragon Statue, can you look at it for me"', 53, 'type=checkstatue');
		if (checkPlaceFlag("Alley", 8)) addLinkToPlaceC(md, '"Can you move the dragon gem for me"', 53, 'type=movegem');
	}

	addLinkToPlace(md, "return to the front hall", 361);

	WritePlaceFooter(md);
}