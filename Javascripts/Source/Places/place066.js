function ShowPlace66()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Secret Stairway", "stairs.jpg");

	md.write('<p>Behind the fireplace is a secret stairway leading upwards to the first floor of Gates\' house. As you take each step you hear a low howl of wind from above.</p>');

	startQuestions();
	addLinkToPlace(md, "go up the stairs to the Attic", 67);
	addLinkToPlace(md, "go to back to the rear of the house", 20);

	WritePlaceFooter(md);
}