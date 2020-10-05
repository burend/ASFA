// Place: Catacomb Tunnel

function ShowPlace323()
{
	var md = WritePlaceHeader();

	/* General Description */

	/* TITLE LINE */
	addPlaceTitle(md, "Catacomb Tunnel", "church10.jpg");

	/* Description */
	md.write(
		'<p>A long tunnel that reaches from the city graveyard all the way to the catacombs beneath the Lady of our Heavenly Father.  How the church managed to build this tunnel with no one being the wiser is a mystery.</p>'
	);

	/* Dialogue Options */
	//**********************************************************************
	startQuestions();

	addLinkToPlace(md, "walk to the church catacombs", 322);
	addLinkToPlace(md, "exit the tunnel into the mausoleum", 324);

	WritePlaceFooter(md);
}