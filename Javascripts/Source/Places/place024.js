// Place: Abandoned Cabin and camp

function ShowPlace24()
{
	var md = WritePlaceHeader();
	var perKarma = findPerson("Karma");
	var clvK = perKarma.getCharmedLevel();
		
	if (clvK === 0) perKarma.showPerson("karma0.jpg");
	else if (!isDay()) perKarma.showPerson("karma9-night.jpg");
	else perKarma.showPerson("karma9-day.jpg");
	
	addPlaceTitle(md, "Abandoned Cabin and Campsite");
	AddImage("cabin1.jpg", "20%", "right");

	md.write(
		'<p>You had no idea this was back here until you randomly stumbled upon it. It doesn\'t look like anyone has been here in ages.</p>' +
		'<p>This would be an excellent place to lay low for a while if you ever have the need. It is very unlikely that anyone else would ever find this place.</p>' +
		'<p>You see a tent off to one side, someone must be camping in this area!</p>'
	);

	if (clvK > 0) md.write('<p>Karma loves to have her tits out for you no matter the weather. You were kind enough to alter her brain to not notice the cold,<br>');
	else {
		md.write(
			'<p>"Whats up ' + perKarma.getYourNameFor() + '. This is kinda my spot so don\'t touch anything Ok."</p>' +
			'<p>You reply "No problem Karma. I was just passing through anyway.  The weather has been quite lovely."</p>'
		);
	}

	startQuestions();
	
	addLinkToPlace(md, "return to the campsite", 25);
	WritePlaceFooter(md, 'by bologna44');
}