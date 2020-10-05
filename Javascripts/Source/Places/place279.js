// Place: Mechanics Shop

function ShowPlace279(stype)
{
	var md = WritePlaceHeader();

	var perHannah = findPerson("Hannah");
	var clv = perHannah.getCharmedLevel();
	if (stype === "" && clv === 0 && !isShopOpen(0)) return gotoPlaceDelayed(194, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The Mechanics Workshop closes and Hannah asks you to leave.');

	if (clv === 0) perHannah.showPerson("hannah1.jpg", '', '', 'hannah1a.jpg');
	else perHannah.showPerson("hannah6.jpg");

	addPlaceTitle(md, "Mechanic\'s Shop");

	if (!perHannah.isHere()) {
		md.write(
			'<p>The place is very clean for a mechanics workshop. Parts, tools and cars are reasonably well-kept and you walk through the office to the workshop without picking up any grease or dirt.</p>'
		);
	}

	// Choices
	startQuestions();
	addLinkToPlace(md, "exit the workshop?", 194);

	WritePlaceFooter(md);
}