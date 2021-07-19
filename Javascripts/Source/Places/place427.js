// Charley's Salon

function ShowPlace427()
{
	var md = WritePlaceHeader();
	var perC = findPerson("Charley");
	var clvC = perC.getCharmedLevel();
	var nm = perC.getPersonNameShort();

	var bBlonde = !perC.checkFlag(2);
	if (clvC === 3) perC.showPerson("worklover" + (bBlonde ? "a" : "b") + ".jpg");
	else if (clvC === 0) perC.showPerson("charley1.jpg");
	else perC.showPerson("workslave" + (bBlonde ? "a" : "b") + ".jpg");
	
	addPlaceTitle(md, nm + "'s Salon");

	if (clvC === 0) md.write('<p>' + nm + '\'s Salon is a women only salon and the owner does not hesitate to tell you that. She does not force you to leave but it it clear that she does not want you there.</p>');
	else if (clvC === 3) md.write('<p>' + nm + ' greets you as you enter and gives you a cheeky flash of her panties.</p>');
	else {
		md.write(
			'<p>' + nm + ' is exposed and spread for you like you commanded her to be. Her ' + (bBlonde ? 'Blonde hair really makes her look like a dumb bimbo' : 'dark hair really brings out her eyes but you doubt that will be the first thing people notice if they walk in') + '.</p>' +
			'<p>The Salon sign still says walk-ins welcome but no one that comes in will be able to get their hair done. ' + nm + ' must stay in her pose until closing time or you command her otherwise.</p>'
		);
	}

	startQuestions();

	if (clvC > 0) {
		if (!perC.checkFlag(4)) {
			if (bBlonde) addLinkToPlace(md, (clvC == 1 ? "order" : "ask") + " her to dye her hair Brunette", Place, 'type=charleydyehair');
			else if (clvC == 3) addLinkToPlace(md, (clvC == 1 ? "order" : "ask") + " her to dye her hair Blonde", Place, 'type=charleydyehair');
		} else addTextForQuestions(md, "she has dyed her hair once already today", "center");
	}
	addLinkToPlace(md, "leave the Salon", 5);
	
	WritePlaceFooter(md);
}