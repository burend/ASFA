// Event: Visit Madison at Work

function ShowPlace412(stype)
{
	var md = WritePlaceHeader();

	var perMadison = findPerson("Madison");

	// Images
	perMadison.showPerson(perMadison.checkFlag(13) ? "madison17be.jpg" : "madison17.jpg");

	// Title
	addPlaceTitle(md, "Madison at Work");

	// Description
	if (getQueryParam("enter") === "true") {
		if (checkPersonFlag("Mom", 26) || checkPersonFlag("Gabby", 2)) {
			if (isCharmedBy("Nina")) addComments("Nina runs a hand over her breasts and gestures to Madison's office, you walk over to the office while looking appreciatively at Nina.");
			else addComments("Annoyed, Nina gestures towards an office, you walk over and enter.");
		}
	}
	// Standard visit
	md.write(
		'<p>The office has a small sign "G.R USX Deliveries", your mother had mentioned that the Station runs a small package delivery company out of it&apos;s main office.</p>' +
		'<p>Well, it looks like Madison is quite a nasty little tigress in bed. She regularly changes her clothes, each time a dress that pleases your sexual hunger more. She often teases you by appearing half naked already when you just have entered her workplace.</p>' +
		'<p>You ordered her to continue her job as a mail and package carrier to avoid unnecessary attention from the townsfolk. She agreed and playfully added that she will personally bring any mail or packages of yours to your house without wearing any underwear. She mentioned that she will also bring an \"appetite that only you can soothe\".</p>'
	);
	if (!perMadison.checkFlag(6)) {
		// Trigger Zoey SMS
		perMadison.setFlag(6);
		setPersonFlagAfterTime("Madison", 7, true, Math.floor(Math.random() * 12) + 12);
		md.write('<p>Madison gives you her phone number, telling you that you can call her anytime you need her to deliver something special.</p>');
	}

	startQuestions();
	if (perMadison.checkFlag(8) && !isCharmedBy("Zoey") && !perMadison.checkFlag(10)) addQuestionC(md, !perMadison.checkFlag(9) ? 'ask about Zoey' : 'ask if Zoey is in the office', "Madison", 100);
	if (isCharmedBy("Zoey")) addQuestionC(md, 'ask if Zoey is in the office', "Madison", 101);
	addLinkToPlaceO(md, 'remove more clothing', 412, 'type=madisonstrip');
	addLinkToPlace(md, 'return to the station reception', 371);

	WritePlaceFooter(md);
}