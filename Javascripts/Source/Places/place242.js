// Place: Assorted exhibits

function ShowPlace242(stype)
{
	var md = WritePlaceHeader();

	var nRoom = stype !== "egypt" && checkPlaceFlag("Museum", 5) ? Math.floor(Math.random() * 2) + 3 : 4;

	addPlaceTitle(md, "Museum Exhibits", "museumroom" + nRoom + ".jpg");

	if (nRoom == 3) md.write('<p>Artifacts celebrating Glenvale\'s ties to Asia and its small Chinese community.</p>');
	else {
		md.write(
			'<p>A small Egyptology exhibit, mostly donated long ago by Lady Elizabeth Ross. Your friend Amy once mentioned this ancestor of hers, but you forget whatever she told you.</p>' +
			'<p>There is a painting near the entrance of the exhibit of Lady Elizabeth Ross, noted as a copy of a work held by the Ross estate. The copy is credited to the renowned artist Samuel James, probably the best known artist that Glenvale ever produced. The original work is noted as by an unknown artist.</p>'
		);
		setPlaceFlag("Museum", 5);
		setQueryParams('type=egypt');
	}

	startQuestions();

	addLinkToPlace(md, "examine the exhibits", '', '', 'You spend an hour looking at all the exhibits for anything useful for your quest.', '', 'WaitHere(5);');

	addLinkToPlace(md, 'check the local history exhibits', 240);
	addLinkToPlace(md, 'return to the main hall?', 239);
	
	WritePlaceFooter(md);
}