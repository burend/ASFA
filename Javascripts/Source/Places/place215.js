// Place: Outside Hospital

function ShowPlace215()
{
	var md = WritePlaceHeader(false, "td-left-med");

	addPlaceTitle(md, "Glenvale Hospital", "hospital1.jpg", 50);

   md.write('<p>Standing in front of the hospital you realize how old the town is. The hospital was erected more than 100 years ago.</p>');

	setPlaceKnown("Hospital");

	startQuestions();

	addLinkToPlace(md, "enter the hospital", 214);
	addLinkToPlace(md, "walk to the park bridge", 216);

	WritePlaceFooter(md);
}