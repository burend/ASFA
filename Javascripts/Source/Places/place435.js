// Place: King's Gym

function ShowPlace435(stype)
{
	var md = WritePlaceHeader();
		
	// Standard visit

	// Description
	addPlaceTitle(md, "Kings\'s Gym", "gyminside.jpg");
	
	md.write(
		'<p>A clean and modern gym with a wide range of equipment for your fitness needs, at least that is what their adverts say! Your friend Amy works here part-time.</p>'
	);

	startQuestions();
	addLinkToPlace(md, "leave the gym", 37);

	WritePlaceFooter(md);
}