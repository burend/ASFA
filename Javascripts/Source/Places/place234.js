// Place: Anatomy Classroom

function ShowPlace234()
{
	var md = WritePlaceHeader();
		
	addPlaceTitle(md, "Anatomy Classroom", "classroom3.jpg");

	md.write(
		'<p>Your favorite class. You have enjoyed many hours in this room watching Miss Logan explain about things that are usually banned at home. Vandals have defaced the chalkboard. Again.</p>'
	);

	startQuestions();
	WritePlaceFooter(md);
}