// Place: Rathdown Rd

function ShowPlace229()
{
	var md = WritePlaceHeader(true);
	
	md.write(
		'<table cellspacing="5">' +
		'<tr>' +
			'<td colspan=2 style="vertical-align:top">' +
				'<p style="text-align:center;font-size:x-large;margin-bottom:-1px;margin-top:0px"><b>Rathdown Rd</b></font></p>' +
			'</td>' +
		'</tr>' +
		'<tr>' +
			'<td colspan=2>' +
				'<p style="margin-bottom:-1px">A quiet place in Glenvale. Most of the residents on Rathdown Road work and do not have children. ' +
				'It is rare to see any cars or people here during the	week.</p><br>' +
			'</td>' +
		'</tr>' +
		'<tr><td class="td-left-xsmall">');

	if (!isPlaceKnown("RathdownRd")) setPlaceKnown("RathdownRd");	// if don't know Rathdown Rd, set to known

	if (isPlaceKnown("AdamsHouse"))  // told Tess to take her to her husband
	{
		addPlaceImage(md, "house5.jpg", "90%");
		md.write('</td><td><p style="margin-bottom:-1px;margin-top:0px">2121 Rathdown Rd.  Tess & John Adams\' Residence.</p>');
		if (getPersonOther("JohnAdams") < 20) {
			// Still home - haven't sent him out after Davy
			md.write('<p>You can see a car parked in front of the house.  Evidently someone is home.</p>');
		}
		md.write('</td></tr><tr>');
	}
	if (isPlaceKnown("MsTitussHouse"))  // Know where Ms Titus lives
	{
		if (isPlaceKnown("AdamsHouse")) md.write('<td>');
		addPlaceImage(md, "house13.jpg", "90%");
		md.write('</td><td><p style="margin-bottom:-1px;margin-top:0px">2628 Rathdown Rd.  Ms Titus\'s Residence.</p>');
		md.write('</td></tr><tr>');
	}

	if (isPlaceKnown("GinasHouse")) { // Know of Guard Gina's House
		if (isPlaceKnown("AdamsHouse") || isPlaceKnown("MsTitussHouse")) md.write('<td>');
		addPlaceImage(md, "house6.jpg", "90%");
		md.write('</td><td><p style="margin-bottom:-1px;margin-top:0px">2138 Rathdown Rd.  Residence of Gina James, the Museum Guard. A surprisingly modern and luxurious home for a security guard.</p>');
		if (wherePerson("Gina") == 302) {
			// Gina is @ Home
			md.write('<p>A light is on and you can see someone moving through the front window.</p>');
		}	else {
			md.write('<p>The lights are out and there is no sign of movement inside.</p>');
		}
		md.write('</td></tr><tr><td>');
	} else if (!isPlaceKnown("AdamsHouse") && !isPlaceKnown("MsTitussHouse")) addPlaceImage(md, "street4.jpg");
	else md.write('<td>');
		
	md.write('</td><td>');

	startQuestions();

	if (isPlaceKnown("AdamsHouse")) addLinkToPlace(md, 'enter the Adams residence', 230);
	if (isPlaceKnown("MsTitussHouse")) {
		if (checkPersonFlag("MsTitus", 18) && getHour() >= 21 && !checkPersonFlag("MsTitus", 19)) addLinkToPlace(md, 'go to the meeting with Karen and Kristin', 228, 'type=karenkristin1');
		else addLinkToPlace(md, 'enter Ms. Titus\'s residence', 228);
	}
	if (isPlaceKnown("GinasHouse")) addLinkToPlace(md, 'enter Gina\'s residence', 302, wherePerson("Gina") !== 302 ? "type=locked" : '');

	addLinkToPlace(md, "walk to Amaranth Pl", 38);
	addLinkToPlace(md, 'walk to the Hotel', 123);
	
	WritePlaceFooter(md);
}