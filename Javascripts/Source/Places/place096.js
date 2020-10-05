// Place: John Adams Office

function ShowPlace96()
{
	var perJohn = findPerson("JohnAdams");
	var perTess = findPerson("Tess");
	var bTessHere = perTess.place == 96;
	var md = WritePlaceHeader(false, bTessHere ? "td-left-med" : "");

	if (!bTessHere) {
		
		// Empty office
		addPlaceTitle(md, "John Adams Office", "office1.jpg");
		md.write('<p>A simple and tidy office used by John Adams.</p>');
		if (!perJohn.checkFlag(3)) {
			md.write('<p>You notice sitting on a shelf a familiar stone being used as a paper-weight</p>');
			PlaceI(5);
			perJohn.setFlag(3);
		}
		
		startQuestions();
		addLinkToPlace(md, "go to the reception area.", 95);
		
	} else {
		
		perTess.showPerson("tess1a.jpg");

		addPlaceTitle(md, "Tess Adams Hiding?");

		md.write(
			'<p>You see Mrs. Adams sitting on a chair in the office, looking very nervous, she looks up "John...." but her voice trails away as she sees you.</p>' +
			'<p>"Oh ' + perYou.getPersonName() + '...sorry I ran out on you, I really had to see my husband, but he is not here, but I called he will be soon...I should go and wait for him...."'
		);

		startQuestions("You have to hurry..");
		addLinkToPlace(md, "order Tess to stay", Place, 'type=charmtess2');
	
	}

	WritePlaceFooter(md);
}