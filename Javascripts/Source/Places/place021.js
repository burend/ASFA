// Police guard on Gates Mansion/Sacred Clearing (after Sarah Gates arrives)

function ShowPlace21(stype)
{
	var md = WritePlaceHeader();

	var perAR = findPerson("AdeleRoss");
	perAR.setFlag(4);
	
	perAR.showPerson("adele1.jpg");
		
	if (stype == "sacred") {
		addPlaceTitle(md, "Sacred Clearing");
		md.write('<p>As you enter the clearing, you are approached by a policewoman. You think she is your friend Amy\'s older sister Adele, but you have only met her once quite a while ago.</p>');
		
	} else {
		addPlaceTitle(md, "Gates Estate");
		md.write('<p>Before you can enter the house, you are barred by a policewoman. You think she is your friend Amy\'s older sister Adele, but you have only met her once quite a while ago.</p>');
	}
	
	if (isMurderPath()) {
		md.write(
			'<p>There are a couple of other officers in the area, apparently searching the grounds.</p>' +
			'<p>No matter how much you plead, you are not allowed to enter.</p>'
		);
	} else {
		md.write('<p>She tells you that this place is under police protection and no one is permitted entry to the estate without prior approval.</p>');
		if (isCharmedPath()) md.write('<p>Unfortunately you now realise you do not have ' + perGates.getPersonNameShort() + '\'s phone number and a quick check shows his number is unlisted.</p>');
	}

	startQuestions();

	if (isPlaceKnown("Tunnel") && stype == "sacred") addLinkToPlace(md, 'go in the tunnel', 178);
	addLinkToPlace(md, "return to the grounds?", 16);

	WritePlaceFooter(md);
}