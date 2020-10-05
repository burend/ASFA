// Place: Museum Local History Exhibits

function ShowPlace240()
{
	var md = WritePlaceHeader();

	var perMG = findPerson("MrsGranger");
	var clv = perMG.getCharmedLevel();

	var img = checkPlaceFlag("Museum", 8) || perMG.place == 1 || !isShopOpen(2, 0, true) ? "museumroom-local1.jpg" : "museumroom-local2.jpg";

	addPlaceTitle(md, "Local History Exhibits", img, 0, false, '', true, img == "museumroom-local1.jpg" ? "90%" : "");
	md.write('<p>Looking around the museum you find lots of interesting items that must have been really useful once upon a time.</p><p>You arrive at the area for Glenvale local history, stretching from pre-history to recent times.</p><p>This area has some large windows to allow natural light into the rooms. They appear to be made of some security material like bullet-proof plastic or similar.</p>');

	if (perMG.other == 5 && whereItem(29) === 0) PlaceI(29);	//  If Mrs Granger is Looking for Vase, then its here.
	if (perMG.place == 1) {
		if (clv == 1) md.write('<p>Only Mrs. Granger is present in the area and she calls out, "Oh look dear," says Mrs. Granger. "I have found a vase. It might have something to do with the dragon gem. It is a sealed steel vase, the top is melted shut in some way. Interestingly is it warmer than it should be, but this is thought to just be a quirk of it\'s metal and color, it is not radioactive or anything like that."</p>');
		else md.write('<p>"Oh look darling," says Mrs. Granger. "I have found a vase. It might have something to do with the dragon gem. It is a sealed steel vase, the top is melted shut in some way. Interestingly is it warmer than it should be, but this is thought to just be a quirk of it\'s metal and color, it is not radioactive or anything like that."</p>');
	} else if (img == "museumroom-local1.jpg") md.write('<p>Current the area is deserted.</p>');
	else md.write('<p>Generally a popular exhibit, you see a number of people walking around looking at the exhibits.</p>');

	// Choices
	startQuestions();
	addLinkToPlace(md, 'return to the main hall?', 239);
	addLinkToPlace(md, 'explore the remainder of the museum?', 249);

	// People
	if (perMG.place == 1) {
		AddPeopleColumn();
		perMG.showPerson("granger-face.jpg", "100%", "", "!granger12a.jpg");
	}

	WritePlaceFooter(md, '', !isDay());
}