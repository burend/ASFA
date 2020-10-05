// Event: Carol's Bedroom

function ShowPlace424(stype)
{
	var perCarol = findPerson("Carol");

	var md = WritePlaceHeader();

	// Enter the room
	perCarol.showPerson("carol8.jpg");
	addPlaceTitle(md, "Carol in her Bedroom");

	md.write(
		'<p>"I always have time for you, my naughty little ' + perYou.getWitch(true, true) + '." She says with an inviting smile and motions you to follow her, most of her clothes falling to the floor one way or another as she leads you into the large bedroom.</p>' +
		'<p>You are still stunned by the size and splendor of both the room itself and the bed at its center, as well as Carols dildo and sextoy collection.</p>' +
		'<p>Your main attention, however, is still focused on your beautiful plaything as she crawls onto the bed on all fours, facing you with a teasing smile and hungry look in her eyes.</p>' +
		'<p>"What naughtiness will your spell compel me to do this time, I wonder?" She asks in a playful purr and her exotic accent seems even more pronounced then usual.</p>'
	);

	// Questions
	startQuestions();
	
	addLinkToPlace(md, 'return to the living room', 420);
	addLinkToPlace(md, 'leave the house', 5);

	WritePlaceFooter(md);
}