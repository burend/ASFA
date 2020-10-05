// Place: Another Pathway/Meet Debra Kelly

function ShowPlace87()
{
	var md = WritePlaceHeader();

	var perD = findPerson("DebraKelly");
	var herName = perD.getPersonName();
	var myName = perD.getYourNameFor();

	if (isDay() && perD.checkFlag(4) && !perD.checkFlag(5)) {
		// Debra found a stone
		perD.setFlag(5);
		PlaceI(5, 87);
		perD.place = 87;
	}


	// *************************************************************************

	if (!perD.isHere()) {
		// No one here
		addPlaceImage(md, "park4.jpg");
		addPlaceTitle(md, "Shady Pathway");
		md.write('<p>A pleasant pathway through the park, shaded by large trees and skirting a small lake.</p>');

		if (perD.place === 87) md.write('<p>It seems Debra is not here at this time of night. She has probably gone home, or possibly visiting a friend.</p>');

	} else {
		// Debra is here
		if (!perD.isCharmedBy()) // Debra NORMAL
		{
			perD.showPerson("debra1.jpg");
			addPlaceTitle(md, "Debra Kelly in the Park");

			if (!perD.checkFlag(1))
			{
				md.write('<p>You see a cute girl walking in the park.  She looks a little uncertain as you approach but she smiles with some confidence.</p>');
				md.write('<p>"Hi," you say. "I\'m ' + myName + '.  I haven\'t seen you around town before and thought that you might be looking for a friend."</p>');
				md.write('<p>"Um, hello, ' + myName + '," she says.  "I\'m Debra. My sister and I moved into Kollam Street last week. Glenvale is such a nice place, especially the old buildings and this park."</p>');
			}
			else //Have been Introduced
			{
				md.write('<p>You see Debra Kelly still out walking.  "Hey ' + myName + '!" She says, noticing your approach.  "Isn\'t it such a nice day out today?  I just couldn\'t stand staying all cooped up at home."</p>');
				md.write('<p>"So," she asks, "What are you up to on this fine ' + getTimeOfDay() + '?"</p>');
			}
		}
		else 	// Debra CHARMED
		{
			perD.showPerson("debra7.jpg");
			addPlaceTitle(md, "Your <i>Pet</i> " + herName );

			md.write('<p>' + herName + ' sees you and immediately drops to the ground, the pleasure of seeing her ' + myName + ' too much to resist.</p>');
			md.write('<p>"Have I been a good girl, ' + myName + '?" she asks.  "Is there anything I can do for you, anything you need?"</p>');

			if (whereItem(5) == Place)
			{
				md.write('"Oh ' + myName + '! I have done as you said!" she says, visibly very excited.  The smell of her sex suddenly reaches you.  "My dog dug up an old-looking stone.  Here, take it...</p>');
				md.write('<p>You look at the stone. It looks like one you saw somewhere else. Do you want it?<br>');
			}
		}
	}
	
	// Choices
	startQuestions();

	if (isPlaceKnown("WildRanges")) addLinkToPlace(md, 'enter the wild ranges', 26);		/* Do you know about the Wild Ranges? */
	addLinkToPlace(md, 'walk to the main park pathway?', 63);

	WritePlaceFooter(md);
}