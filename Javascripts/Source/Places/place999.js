// Bad Ending - General

function ShowPlace999()
{
	var md = WritePlaceHeader(true);

	addPlaceTitle(md, "The End Of the Road", '', 0, true);

	md.write(
		'<p>Congratulations for finding the end of the road. Unfortunately ' +
		'this means that you can\'t get any farther in the game yet but I\'m ' +
		'busily creating the rest for you as you read this page.</p>' +
		'<p>The plot, dialogue and pictures have been added to the game ' +
		'from people just like you. So why don\'t you join in with our ' +
		'discussion forum and post your ideas.</p>'
	);

	addOptionLink(md, 'Return to the game.', 'Place = nFromPlace;history.back()');

	WritePlaceFooter(md);
}
