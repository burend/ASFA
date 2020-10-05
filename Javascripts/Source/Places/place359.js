// Place: Glenvale Radio & Television Station

function ShowPlace359()
{
	var md = WritePlaceHeader();

	if (!isPlaceKnown("PoliceStation")) setPlaceKnown("PoliceStation");	//  Know the Police station if you don't already.
	if (!isPlaceKnown("TVStation")) setPlaceKnown("TVStation");	//  Know the TV station if you don't already.

	addPlaceTitle(md, "Glenvale Radio & Television Station", "radio1.jpg");

	md.write(
		'<p>Glenvale\'s single Radio and Television station. It may not look like much, ' +
		'but inside are some relatively cutting-edge radio productions and the town\'s ' +
		'very own news channel, MC Channel 4 at 10 O\'Clock. Not the highest-rated news show on TV, but it does have some colorful faces.</p>' +
		'<p>One of those faces happens to be your Mother\'s. Well, she isn\'t on the TV so much as a part of the production crew.</p>' +
		'<p>The building also houses the recording and production offices for the local radio station MC 550 and a small package delivery company.<p>'
	);

	startQuestions();

	addLinkToPlace(md, "enter the TV station", 371);
	addLinkToPlace(md, "walk to the police station", 167);

	WritePlaceFooter(md);
}