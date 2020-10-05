// Place: Hospital Basement

function ShowPlace442()
{
	var md = WritePlaceHeader();
	
	setPlaceFlag("Hospital", 3);
	addPlaceTitle(md, "Hospital Basement", "hospitalbasement.jpg");
	
	md.write(
		"<p>The basement of the hospital, it seems almost deserted, there is no-one down here. There is a chill in the air, the air-conditioning must be set too low down here.</p>" +
		"<p>There is a set of doors at one end of the corridor with a sign 'Area off limits until renovation is complete' with a logo of mayor\'s office. Dimly you can see through the glass in the door, the area looks very old-fashioned, more like the basement of some large house. It must be from the early days of Glenvale when the hospital was actually a large mansion."
	);
	if (checkPlaceFlag("Hospital", 4)) md.write(' You have a key to the door that the Mayor gave you.</p>');
	else md.write('</p>');

	startQuestions();

	addLinkToPlace(md, 'visit the morgue', 441);
	if (checkPlaceFlag("Hospital", 4)) addLinkToPlace(md, 'visit the old basement', 443);
	
	AddRightColumn(md);
	addPlaceImage(md, "elevator.jpg");
	md.write('<p style="text-align:center">Ride the ' + (isBritish() ? "lift" : "elevator") + '<br><img src="Images/elevatorbuttons.jpg" style="margin: 5px 5px;width:100%" alt="Elevator" title="The elevator"></p>');
	addLinkToPlace(md, isBritish() ? "First Floor" : "Second Floor", 444, '', '', '', '', 'hailblock');
	addLinkToPlace(md, isBritish() ? "Ground Floor" : "First Floor", 214, '', '', '', '', 'hailblock hailup');
	
	WritePlaceFooter(md);
}