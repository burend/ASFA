// Place: Restaurant - Store room
// See person Jenny, Alison for events

function ShowPlace203()
{
	var md = WritePlaceHeader();

	addPlaceTitle(md, "Bavaria Hut Storeroom");

	startQuestions();
	addLinkToPlace(md, "exit the restaurant", 194);

	WritePlaceFooter(md);
}