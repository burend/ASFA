// Event: Home/Office – Kitchen [Madison's Enthrallment Strap-on Delivery]

function Leave411()	{
	if (whereItem(45) == 411) moveItem(45, 46);		// leave it in your bedroom for later
}
function LeaveTakeStrapOn() {
	if (perYourBody.FindItem(45) === 0) perYourBody.PutItem(45, true);	// implied you want it, so pick it up
}

function ShowPlace411()
{
	var md = WritePlaceHeader();
	var splace = getQueryParam("place");
	var perMadison = findPerson("Madison");

	if (splace === "") {
		// At Home during delivery

		perMadison.showPersonX("madison16.jpg");

		addPlaceTitle(md, "Madison's Gift");
		md.write(
			'<p>You tell Madison you would like to fuck her but you lack any toys to do this with. Madison grins at this and quickly puts on her jacket and skirt and asks if she can get you a present. A little surprised you let her. She leaves and a few minutes later returns with a package she was due to deliver to someone else and gives it to you.</p>' +
			'<p>"Don\'t worry our insurance will cover it" she says while removing her clothing again eagerly. You see the package is from a well known internet site for adult products. It is labelled as a "Delux Strap-on" and included are several different appendages to use.</p>' +
			'<p>"Now you can fuck me...please Mistress?"</p>'
		);

	} else {
		// At Office

		perMadison.showPersonX("madison24.jpg");

		addPlaceTitle(md, "Madison's Gift");
		md.write(
			'<p>You tell Madison you would like to fuck her but you lack any toys to do this with. Madison grins at this and quickly puts on her jacket and skirt and asks if she can get you a present. A little surprised you let her. She leaves and a few minutes later returns with a package and turns her back while opening it and doing something with it. When she turns around she is loosely wearing a strap-on, with a box on the desk labeled "Delux Strap-on" with several different appendages still in the box</p>' +
			'<p>"Nina has bought this for her lover but never got up the courage to give it to her. They have broken up and Nina had regretted getting it. Don\'t worry if she notices I will pay her", she says.</p>' +
			'<p>"Now I can fuck you, or please, you can fuck me Mistress?"</p>'
		);
	}

	if (whereItem(45) === 0) PlaceI(45);		// Add it here, if it was not already delivered

	// Questions
	startQuestions();
	addLinkToPlaceC(md, '"Yes, I will fuck you"', 410, 'type=fuck&place=' + splace, '', '', 'LeaveTakeStrapOn()');
	if (wherePerson("Diane") != -1) {
		if (splace === "") addLinkToPlaceC(md, 'order her "Go back to the station and wait for me there."', 45, '', '', '', 'Leave411()');
		else addLinkToPlaceC(md, 'leave after you order her "Change clothes and always deliver me pleasure"', 371, '', '', '', 'Leave411()');
	}

	WritePlaceFooter(md);
}