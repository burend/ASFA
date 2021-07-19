// Savanna's Office

function ShowPlace102()
{
	var md = WritePlaceHeader();

	var perSavanna = findPerson("Savanna");
	var clvS = perSavanna.getCharmedLevel();
	var bHere = perSavanna.isHere();
	var bGF = perSavanna.checkFlag(4);

	if (bHere) {
		if (clvS == 0) perSavanna.showPerson(bGF ? "sav0red.jpg" : "savred1.jpg");
		else if (clvS == 2) perSavanna.showPerson("savcharm2.jpg");
		else if (clvS == 4) perSavanna.showPerson("savcharm4.jpg");
		else if (clvS == 3) perSavanna.showPerson("savred3.jpg");
	}

	addPlaceTitle(md, "Savanna\'s Office", bHere ? '' : "office.jpg");

	md.write(
		'<p>Savanna\'s office is small since she is a new intern in the Town Hall.</p>'
	);
	if (bHere) {
		if (clvS == 0) md.write('<p>Savanna greets you in her new professional attire. She is always ready to get to work even though she may not understand most of her duties.</p>');
		else if (clvS == 2) md.write('<p>Savanna greets you as you walk in. She is sitting on the couch with her legs spread to show that she is your subordinate.</p>');
		else if (clvS == 4) md.write('<p>Savanna drops to her knees as you walk in. She knows she needs to get your dick hard before any of her real duties can begin.</p>');
		else md.write('<p>Savanna was busily working at her desk as you arrive and your enchanted girlfrind looks up in her agreeable and somewhat submissive way.</p>');
	}


	startQuestions();
	addLinkToPlace(md, "leave the office", 95);

	WritePlaceFooter(md);
}