function ShotByAnita()
{
	showPopupWindowNow0();

	// REMOVE the Book from your Inventory
	if (perYourBody.FindItem(4) > 0)	{
		// The book is now lost to be with Mr Beasley/Sarah depending
		perYourBody.DropItem(4, 999);
		if (wherePerson("MrBeasley") !== 11) movePerson("MrBeasley", 11); // Put Mr Beasley back in his office so you can get the book.
	}
	perYourBody.DropAllItems(999);

	nMoney = nMoney > 0 ? 0 : nMoney; //Lose all your money
	perYou.setInjury(1);  // Player has been SHOT ( part of Hellgate path pre-reqs )
	findPerson("Anita");
	per.other = 100;  // Place Anita in her hiding spot
}

function ShowPlace142()
{
	var md = WritePlaceHeader();

	findPerson("Anita");
	per.other = 13;

	per.showPerson("anita1.jpg", "height:max");

	addPlaceTitle(md, "Anita");

	md.write(
		'<p>A girl jumps out from behind a rock. You recognize her from the description as Anita, and she is sporting a large shotgun. She aims at your head.</p>' +
		'<p>"So scumbag," she yells. "You are here to steal my master Davy\'s treasure. He told me that you might come and he ordered your death. Say goodbye to the world!"</p>' +
		'<p>You are trapped and she is watching you very closely.</p>'
	);

	startQuestions();
	addOptionLink(md, "duck and run!", "ShotByAnita()");
	addOptionLink(md, "surrender to Anita", "ShotByAnita()");

	addPopupWindow(md, "Shot!",
		"<img src='Images/shot1.jpg' style='width:30%;float:right;margin-left:5px' alt='Shot'>" +
		"A shot rings out before you can act, then blackness consumes you.<br><br>" +
		'<a style="color:white;" href="javascript:closePopupWindowNow0()">unconsciousness claims you</a>',
		"gotoPlace(213);", undefined, true, false, true
	);

	WritePlaceFooter(md);
}