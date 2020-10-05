// Event: Kristin's Home

function ShowPlace430(stype)
{
	var md = WritePlaceHeader();

	// Kristin (always charmed here)
	var perKristin = findPerson("Kristin");
	var myNameK = perKristin.getYourNameFor();
	var herNameK = perKristin.getPersonName();

	// Ellie if she has fled here
	var perEllie = findPerson("Ellie");
	var bEllieCharmed = perEllie.isCharmedBy("You");
	if (perEllie.place == 420 && !bEllieCharmed) perEllie.place = 430;
	if (perEllie.place == 430 && bEllieCharmed) perEllie.place = 422;

	if (!perKristin.isHere()) {
		// Kristin not home now
		if (!perKristin.checkFlag(11) && whereItem(5) === 0) {
			// No stone here
			PlaceI(5, 430);
			perKristin.setFlag(11);
		}
		addPlaceTitle(md, herNameK + '\'s Home', "livingroom3.jpg");
		md.write('<p>Kristin is not at home now and her elegant home is empty.</p>');
		if (whereItem(5) == 430) md.write('<p>You see an ornament on a shelf, it is a familiar looking stone.</p>');
		startQuestions();
		if (perEllie.place == 430) addLinkToPlace(md, 'visit Ellie', 430, 'type=visitellie');
		addLinkToPlace(md, 'exit the house', 5);
		WritePlaceFooter(md);
		return;
	}
	
	perKristin.showPerson("!kristin10a.jpg");
	addPlaceTitle(md, herNameK + '\'s Home');

	if (isVisible()) {
		md.write(
			'<p>Kristin is eager to see you and has dressed herself in an attractive set of pink lingerie for you.</p>' +
			'<p>"Hello ' + myNameK + ' have you come to check my interest rates or to discuss '
		);
		if (perYou.isMaleSex()) md.write('a matter of inflation and to make a deposit');
		else md.write('liquidating assets');
		md.write('?"</p>');
		if (perEllie.place == 430) md.write('<p>She also mentions "Ellie from next-door is visiting, she used to visit a lot when she was arguing with her mother or upset, but not a lot recently. She looked confused and upset and she is now in the spare room."</p>');
	} else md.write('<p>Kristin is has dressed herself in an attractive set of pink lingerie.</p>');

	// Questions
	startQuestions();		
	if (perEllie.place == 430) addLinkToPlace(md, 'visit Ellie', 430, 'type=visitellie');
	addLinkToPlace(md, 'exit the house', 5);

	WritePlaceFooter(md);
}