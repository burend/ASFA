// Place: Hannah's apartment - Hannah's Room

function ShowPlace284()
{
	var perHannah = findPerson("Hannah");

	var md = WritePlaceHeader();

	perHannah.showPerson("home-room.jpg");
	addPlaceTitle(md, "Hannah's Room");

	md.write('<p>Hannah\'s room is rather basic, but lined with posters and memorabilia of various bands like Kiss, Mötley Crüe and AC/DC. She has a few cabinets for clothes, a large Sofa doubling as an extendable bed and a TV with some sort of videogame console hooked up to it.</p>');
	if (isVisible()) md.write('<p>Hannah removes most of her clothes with a cheeky smile as the two of you enter, stretching out invitingly on the Sofa and telling you to take a seat.</p>');

	startQuestions();
	addLinkToPlace(md, "leave Hannah\'s room", 237);
	addLinkToPlace(md, "leave the apartment", 194);

	WritePlaceFooter(md);
}