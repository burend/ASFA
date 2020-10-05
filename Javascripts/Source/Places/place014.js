// Place: Gate's Garage Office

function ShowPlace14(stype)
{
	var md = WritePlaceHeader();
	var perSofia = findPerson("Sofia");
	var nm = perSofia.name;
	var bMurder = isMurderPath();
	
	if (perSofia.isCharmedBy()) perSofia.showPerson("sofia_office_charmed.jpg");
	else perSofia.showPerson("sofia_office_noncharmed.jpg");
	
	addPlaceTitle(md, "Gates's Mansion Garage Office");
	md.write(
		'<p>The room looks like a small work station with few basic furniture, a coffee table, chairs, some houseplants and one or two paintings. There is a door which leads to the upper floor of the place. That is where the chauffeur\'s bedroom is located. Other than that there’s another wood-door that connects the office with garage, where the family’s cars are stored.</p>'
	);
	
	if (perSofia.isCharmedBy()) {
		md.write(
			'<p>' + nm + ' is standing between the coffee table and the chairs, already lifting up her dress, playing with her panty. She felt your arrival.</p>'
		);
	} else {
		if (bMurder) {
			if (perSofia.checkFlag(3)) md.write('<p>' + nm + ' is standing between the coffee table and the chairs, watching you suspiciously, ready to jump at you if you try anything stupid.</p>');
			else md.write('<p>The chauffeur is standing between the coffee table and the chairs, watching you suspiciously, ready to jump at you if you try anything stupid.</p>');
		} else {
			if (perSofia.checkFlag(3)) md.write('<p>' + nm + ' is standing between the coffee table and the chairs, watching you with a smile. Her jacket is draped over a nearby chair, though your eyes are more drawn to her cleavage that it is not covering anymore!</p>');
			else md.write('<p>The chauffeur is standing in front of the coffee table and the chairs, watching you with a smile. Her jacket is draped over a nearby chair, though your eyes are more drawn to her cleavage that it is not covering anymore!</p>');
		}
	}
	
	startQuestions();
	 if ((bMurder && (getHour() > 7 && getHour() < 10)) || (!bMurder && getHour() >= 8 && getHour() < 13)) addLinkToPlace(md, "leave the office", 15, '', '<img src="Images/limo.jpg" style="width:20%;float:right;margin-left:5px;margin-bottom:1em">Shortly after you leave you see the garage door open and the limo drive out. ' + nm + ' must have been called out to drive someone. You will have to return in a few hours if you wish to see her again');
	else addLinkToPlace(md, "leave the office", 15);

	WritePlaceFooter(md);
}