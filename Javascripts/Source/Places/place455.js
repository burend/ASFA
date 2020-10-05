// Celeste Road

function ShowPlace455()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Celeste Road", "street5.jpg");

	md.write('<p>Celeste Road consists of several recently build apartment houses located in the town\'s outer ring and maintained by a local company, the area has a reputation to provide quality housing for singles, students and low income families.</p>');

	startQuestions();
	addLinkToPlace(md, 'enter the apartments', 456);	// Know about the Apartments
	addLinkToPlace(md, 'walk to the Museum', 238);

	WritePlaceFooter(md);
}