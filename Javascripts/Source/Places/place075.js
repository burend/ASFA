// Mr Beasley Threesome with students 2

function ShowPlace75()
{
	var md = WritePlaceHeader(false, isExplicit() ? "td-left-large" : "");

	perBeasley.showPersonRorX("beasley3.jpg");

	addPlaceTitle(md, "Mr. Beasley\'s Office");

	md.write('<p>Although you try to talk to Mr. Beasley, Catherine and Amy interrupt. The sisters look so aroused that their actions cannot be natural. Fearing for yourself, you back away.</p>');

	startQuestions();
	addLinkToPlace(md, "wait for the trio", 76);
	addLinkToPlace(md, "exit the room", Place, '', 'You cannot abandon your friends, and Mr. Beasley has the Book!');

	WritePlaceFooter(md);
}