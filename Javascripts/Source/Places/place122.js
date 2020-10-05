// Tracy's Bedroom

function ShowPlace122()
{
	var perTracy = findPerson("Tracy");
	
	if (perTracy.whereNow() != 122) {
		// Empty room
		WritePlaceHeader();
		addPlaceTitle(md, "Tracy's Bedroom", "bedroom8.jpg");
		md.write(
			'<p>Tracy\'s bedroom, the typical girls room, not that tidy, Tracy is not big on housework.</p>'
		);
		startQuestions();
		
	} else {
		// Sleeping Tracy
		WritePlaceHeader(false, 'td-none');
		addPlaceTitle(md, "Sleeping Tracy");
		md.write(
			'<p>Tracy is a sound sleeper, but very disorganised, at times lying across her bed or at angles. She seldom ever wears anything in bed...</p>'
		);
		if (perTracy.getCharmedLevel() != 2) md.write('<p>You have nothing to discuss with her that cannot wait for morning and she looks so cute lying there.</p>');
		
		var sl = perTracy.checkFlag(20) ? "1" : perTracy.checkFlag(21) ? "2" : perTracy.checkFlag(23) ? "3" : perTracy.isCharmedBy() ? "4c" : "4u";
		perTracy.showPerson("sleeping" + sl + ".jpg", "70%", 'center');
		md.write('<span style="clear:both">&nbsp;</span>');
		startQuestions();
		if (perTracy.isCharmedBy() && perTracy.getCharmedLevel() == 2) addLinkToPlace(md, "wake Tracy", 122, 'type=waketracy');
	}

	// Common questions
	addLinkToPlace(md, "go to the kitchen", 45);
	addLinkToPlace(md, "go to your bedroom", 46);
	addLinkToPlace(md, "exit the house", 44);
	WritePlaceFooter(md);
}