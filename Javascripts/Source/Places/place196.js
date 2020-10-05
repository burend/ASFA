// Place: Restaurant
// See Alison, Jenny, Miss Logan for events/images/text

function ShowPlace196(stype)
{
	if (!isShopOpen(4, 0, true)) return gotoPlaceDelayed(194, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The Bavaria Hut restaurant closes and all customers are asked to leave.');

	var md = WritePlaceHeader();
	
	addPlaceTitle(md, "Bavaria Hut");
			
	startQuestions();

	addLinkToPlace(md, 'exit the restaurant', 194);

	WritePlaceFooter(md);
}