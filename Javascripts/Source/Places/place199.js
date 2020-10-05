// Place: Laundromat

function ShowPlace199(stype)
{
	var md = WritePlaceHeader();

	// Description
	addPlaceTitle(md, "Glenvale Laundromat", "laundromat.jpg");
	
	md.write(
		'<p>A clean plublic laundromat. There are few people around at the moment, and there have been the few times you have been here.</p>'
	);

	startQuestions();
	addLinkToPlace(md, "leave the laundromat", 194);
	WritePlaceFooter(md);
}