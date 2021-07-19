// Hidden farm

function ShowPlace60()
{
	var md = WritePlaceHeader();

	var perBetty = findPerson("Betty");
	var clvB = perBetty.getCharmedLevel();

	addPlaceTitle(md, "A Farm in the woods", "barn1.jpg");

	md.write(
	  '<p>You walk through the woods near a place you heard Mrs Tanika mention once.</p>' +
	  '<p>All of a sudden you come to a large clearing and see a large barn with a farmhouse next to it.</p>' +
	  '<p>There isn\'t a ton of room to grow crops so it definitely isn\'t that type of farm, maybe a hobby farm?</p>'
	);
	if (clvB == 0) md.write('<p>You see a girl on the other side of the clearing sitting on what looks like a run down piece of playground equipment.</p>');

	startQuestions();
	if (clvB > 0) addLinkToPlace(md, 'sneak into Betty\'s room', 61);
	else if (!perBetty.checkFlag(1)) addLinkToPlace(md, 'approach the girl on the playground.', 60, 'type=bettymeet1');
	else {
		if (!perBetty.checkFlag(2)) {
			addPopupLink(md, 'go into the Barn', "The Barn", 
				'<img src="Images/barn2.jpg" class="imgpopup"/>' +
				'You check the barn but everything seems locked up tight. You hear some odd noises from inside, you think there maybe someone in there...</p>' +
				'<p><i>The barn cannot be accessed in this version of the game</i></p>',
				true, 
				'setPersonFlag("Betty",2);dispPlace()'
			);
		} else addLinkToPlace(md, 'visit Betty', 60, 'type=bettymeet2');
	}
	addLinkToPlace(md, 'go back to the park', 87);
	WritePlaceFooter(md);
}
