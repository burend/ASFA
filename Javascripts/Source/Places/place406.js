// Place: Church Cloisters

function ShowPlace406()
{
	var md = WritePlaceHeader();
	var perMS = findPerson("Daria");

	// TITLE LINE
	addPlaceTitle(md, "Church Cloisters", "cloisters.jpg");

	// Description
	md.write(
		'<p>The cloisters are a set of covered walkways almost always associated with monasteries and convents. Commonly the walkways surround a courtyard and have a set of small rooms, or cells, that the devoted study or live in.</p>' +
		'<p>There is a very large courtyard, and the church makes one wall and the cloisters the other three sides. There are many small rooms lining the walkways, all with an air of quiet contemplation.</p>');

	if (!isPossess()) //NOT possessing anyone
	{
		if (!perMS.checkFlag(4) || (perMS.checkFlag(7) && !perMS.isCharmedBy())) {
			// Mother Superior has NOT been POISONED
			setPlaceFlag("Church", 5); //Mother Superior has blocked you from her room;
			showPopupWindow("Mother Superior",
				perMS.addPersonString("mothersuperior1c.jpg", "height:max%", "right") +
				"The sound of your footsteps echo off the walls as you move down the cloister's walkway. Suddenly Mother Superior appears out of nowhere and stops you. <br><br>" +
				'"What do you think you\'re doing here? Get Out!" she yells.',
				"dispPlace(318)"
			);
			WritePlaceFooter(md);
			return;
		}
	}

	// Choices
	startQuestions();

	if (isPlaceKnown("MotherSuperiorsRoom")) {
		if (perMS.place == 384 && !perMS.checkFlag(9)) {
			var s = '<img src="Images/spiralstair.jpg" class="imgpopup" alt="Spiral">' +
				'<p style="position:absolute;cursor:pointer;font-size:1.1em;color:white;width:60%">' +
				"As you approach the Mother Superior\'s room you notice her room seems to be at the base of a tower, with a <b>spiral</b> staircase leading upwards.<br><br>" +
				'You have to wonder if you are ready to confront her now in person, what after possessing her and hopefully either confusing or weakening her will at least a little.<br><br>' +
				'Will the charm spell be enough, her will is so strong, and you know there is no way she will trust you for something a little more mundane? Magic is definitely needed somehow!';
			addPopupLink(md, "visit Mother Superior's Room", "Spiral Staircase", s, false, "setPersonFlag('Daria',9);dispPlace();");

		} else addLinkToPlace(md, 'visit Mother Superior\'s Room', perMS.place == 382 ? 382 : 384);
	}
	addLinkToPlace(md, 'walk into the Courtyard', 319);
	addLinkToPlace(md, 'walk back into the Church proper', 318);

	WritePlaceFooter(md);
}