// Event: Bartel Home

function Selling() {
	var perCarol = findPerson("Carol");
	perCarol.setFlag(2);
	bChat = false;
	WriteComments(perCarol.addPersonFace() + 'With no other idea, you tell her that you are here selling magazine subscriptions door to door. Carol smiles but refuses saying she reads everything now online. Before you can say more she says a polite goodbye and closes the door.</p>');
	dispPlace(5);
}

function ShowPlace420(stype)
{
	var md = WritePlaceHeader();

	var perCarol = findPerson("Carol");
	var bCarolCharmed = perCarol.isCharmedBy();
	//var myNameC = perCarol.getYourNameFor();
	var herNameC = perCarol.getPersonName();

	var perEllie = findPerson("Ellie");
	var bEllieCharmed = perEllie.isCharmedBy("You");
	var herNameE = perEllie.getPersonName();
	//var clvE = perEllie.getCharmedLevel();

	if (!bEllieCharmed && perEllie.place == 81) perEllie.place = 430;		// Move UnCharmed Ellie to Kristin's home
	if (perEllie.place == 430 && bEllieCharmed) perEllie.place = 422;
	if (perEllie.place == 81 && bEllieCharmed) perEllie.place = 422;

	var plcEllie = perEllie.whereNow();

	if (wherePerson("Kristin") === 420) {
		if (checkPersonFlag("Kristin", 14)) {
			// Received call to see Carol/Kristin
			if (stype === "") return dispPlace(420, "type=kristincarol2");

		} else if (plcEllie == 422) return dispPlace(422, "type=visitcb");
		else {
			WriteComments("There is no answer at the door");
			return dispPlace(5);
		}
	}

	
	if (bEllieCharmed && bCarolCharmed && plcEllie == 422) perCarol.showPersonRandom("carolellie1", 2, "height:max");
	else if (bCarolCharmed) perCarol.showPersonDN("carol1d.jpg");
	else perCarol.showPersonDN("carol1a.jpg");

	if (!perCarol.checkFlag(1)) {
		// First visit
		addPlaceTitle(md, "Bartel Home Doorstep");
		md.write(
			'<p>You approach the house and again you cannot help but admire the fairly new and large house, It is a little bit of a contrast to some of the older homes in the area. You notice an expensive yellow sports car in the driveway.</p><p>You knock on the door, a little unclear on how you are going to approach Ellie but sure you can wing something. The door opens and you see a tall gorgeous blonde woman smiling at you. She speaks to you with a slight accent that you cannot quite place,</p>' +
			'<p>"Hello there I\'m Carol Bartel, nice day! What is it you want? If you are for my wife Sally, she is away doing a business trip."</p>' +
			'<p>She has not invited you into the house yet so you are standing on the front door-step. As you consider your reply your eyes are almost unconsciously drawn to her large and you would guess natural breasts. You quickly look back up, and you see her smile, she must be very used to people admiring her.</p>');
		perCarol.setFlag(1);
	} else if (!bCarolCharmed) {
		// Later visits
		addPlaceTitle(md, "Bartel Home Doorstep");
		md.write(
			'<p>"Hello again! What is it you want this time?"</p>' +
			'<p>She has not invited you into the house yet so you are standing on the front door-step.</p>');
	} else {
		if (bEllieCharmed && plcEllie == 422) {
			// Carol and Ellie Charmed
			addPlaceTitle(md, "Bartel Home");
			md.write('<p>You visit ' + herNameC + ' and ' + herNameE + ' in the living room. They address you in practised unison,</p>');
			md.write('<p>"Hello ' + perYou.getMaster() + ' what can we do to you this time?"</p>');

		} else {
			// Carol Charmed
			addPlaceTitle(md, isDay() ? "Bartel Home Kitchen" : "Bartel Home Living Room");
			var sw = perYou.isMaleSex() ? "Volkhov" : "Vedma";
			md.write(
				'<p>When you arrive ' + herNameC + ' seems happy that you visit her and gestures you to follow into the kitchen. You see her stretch seductively on the way, inevitably pulling up her top and making no effort to return it into place.</p>' +
				'<p>"It\'s really nice to have some company, my ' + sw + ' would you like me to get you something? A drink, snack, lots of dirty sex?"</p>'
			);
		}
	}
	// Questions
	startQuestions();
	if (!perCarol.checkFlag(2) && !perCarol.checkFlag(3)) {
		addOptionLinkC(md, '"ummm..I am selling magazine subscriptions"', 'Selling()');
		addLinkToPlaceC(md, '"oh..I\'m from the Bank and I need to speak to Ellie"', 420, 'type=bank');
	}
	if (plcEllie == 422) {
		if (bEllieCharmed && bCarolCharmed) {
			addLinkToPlaceC(md, 'speak to Ellie privately', 422);
			addLinkToPlaceC(md, 'speak to Carol privately', 424);
			addLinkToPlaceC(md, 'let us play together', 420, 'type=threesome');
			addLinkToPlaceC(md, 'mother daughter time', 420, 'type=motherdaughter');
		} else addLinkToPlaceC(md, '"I am here to visit Ellie, she invited me over"', 422, (bCarolCharmed ? '' : 'type=visitc'));
	} else if (bCarolCharmed) addLinkToPlaceC(md, 'speak to Carol privately', 424);
	if (plcEllie == 423) addLinkToPlaceC(md, '"Is Ellie at home?"', 423);
	else if (bEllieCharmed || perCarol.checkFlag(12)) addLinkToPlace(md, 'check the pool', 423);
	
	// common questions
	addLinkToPlace(md, 'leave the house', 5);

	WritePlaceFooter(md);
}