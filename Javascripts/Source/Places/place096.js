// Place: John Adams Office

function ShowPlace96()
{
	var md = WritePlaceHeader();
	var perJohn = findPerson("JohnAdams");
	var perTess = findPerson("Tess");
	var nm = perJohn.getPersonNameShort();

	if (!perJohn.isHere()) {	
		// Empty office
		addPlaceTitle(md, nm + " Adams Office", "office1.jpg");
		md.write('<p>A simple and tidy office used by ' + nm + ' Adams.</p>');
		if (!perJohn.checkFlag(3)) {
			md.write('<p>You notice sitting on a shelf a familiar stone being used as a paper-weight</p>');
			PlaceI(5);
			perJohn.setFlag(3);
		}
		
		startQuestions();
		addLinkToPlace(md, "go to the reception area.", 95);
		
	} else {
		// John is here working
		var clv = perJohn.getCharmedLevel();
		perJohn.showPersonRorX("office1.jpg");

		addPlaceTitle(md, nm + " Adams Office");

		md.write(
			'<p>You see ' + nm + ' is here and ' + perJohn.getHeShe() + ' is happy to see you and starts to remove ' + perJohn.getHisHer() + ' clothing for your pleasure!</p>'
		);
		if (clv == 1) md.write('<p>' + capitalize(perJohn.getHeShe()) + ' does know that there is nothing more you wish of ' + perJohn.getHimHer() + ' but the arousal of the charm spell compels ' + perJohn.getHimHer() + ' to be ready just in case you change your mind.</p>');
		md.write('<p>' + nm + ' asks how ' + perJohn.getHeShe() + ' can help you?');
		if (clv == 1) md.write(' You just tell ' + perJohn.getHimHer() + ' you are just visiting');
		md.write('</p>');
		
		startQuestions();
		if (clv != 1) {
			addLinkToPlace(md, '"Here to Fuck"', Place, 'type=johnofficesex');
		} 
		addLinkToPlace(md, "go to the reception area.", 95);
	}

	WritePlaceFooter(md);
}