// Place: Church Stores

function ShowPlace321()
{
	var md = WritePlaceHeader();

	/* General Description */

	/* TITLE LINE */
	addPlaceTitle(md, "Church Stores", "church4.jpg");

	/* Description */
	md.write('<p>The basement floor beneath the church.  This is where the church keeps all of their supplies for the services and maintenance of the church.</p>');

	/* Dialogue Options */
	//**********************************************************************
	startQuestions();

	addLinkToPlace(md, "walk up the stairs", 318);
	addLinkToPlace(md, "enter the Catacombs", 322);

	WritePlaceFooter(md);
}