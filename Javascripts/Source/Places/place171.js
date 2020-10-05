// Event: Tess in the hotel room
// stype == "" - initial visit
//       == "expose" - ask her to strip

function ShowPlace171(stype)
{
	var md = WritePlaceHeader();

	var perTess = findPerson("Tess");
	if (stype === "") perTess.showPerson("tess10.jpg");
	else perTess.showPerson("tess11a.jpg");

	addPlaceTitle(md, "Mrs. Adams In Hotel Room");

	if (stype === "") {
		// Initial visit to the room
		md.write(
			'<p>"What do you think of my outfit?" gushes Mrs. Adams. ' +
			'"I picked it especially for you. As you are so young and all, I thought that you might like a cheerleader."</p>' +
			'<p>There is a strange object on the table. It kind of looks like a worm with a human head. You could be ' +
			'mistaken in thinking that the thing is actually moving. "What is it?" you ask Mrs. Adams.</p>' +
			'<p>"Oh, you saw my little surprise. This is what my..husband found. The silly thing keeps asking questions ' +
			'that I don\'t know the answer to. He said that it might be magical but I think that it is annoying."</p>'
		);
		startQuestions();
		addLinkToPlace(md, "ask Mrs. Adams to show off more of herself", 171, "type=expose");

	} else {
		// After asking her to strip
		md.write(
			'<p>Mrs Adams removes her top to reveal her firm breasts.</p>' +
			'<p>"You are so cheeky darling," says the librarian. "I just know that we are going to have so much fun together."</p>'
		);
		startQuestions();
	}

	addLinkToPlace(md, "try to solve the worm\'s puzzle", 173, stype !== "" ? "type=" + stype : "");
	addLinkToPlace(md, "exit the room?", 124);

	WritePlaceFooter(md);
}