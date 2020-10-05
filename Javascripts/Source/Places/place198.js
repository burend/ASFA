// Place: Shopping Center – Antique Shop - Nella's Room

function ShowPlace198()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Nella's Room", "bedroom1.jpg");

	md.write(
		'<p>Nella\'s room is is a simple spare room, she has not really settled in yet.</p>'
	);

	startQuestions();
	addLinkToPlace(md, "leave Nella\'s room", 197);
	addLinkToPlace(md, 'leave the ' + getShopStore(), 194);

	WritePlaceFooter(md);
}