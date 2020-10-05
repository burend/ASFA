// Event: Home/Office – Kitchen [Madison's Enthrallment 04]

function ShowPlace358()
{
	var md = WritePlaceHeader();
	var splace = getQueryParam("place");
	var myName = perYou.getMaster();
	var perMadison = findPerson("Madison");

	if (splace === "") {
		// At Home during delivery
		perMadison.showPerson("madison14.jpg");
	} else {
		// At Office
		perMadison.showPerson("madison23.jpg");
	}

	addPlaceTitle(md, "Madison Under a Spell");

	md.write(
		'<p>"Oh my <i>god</i>," she says as you step away from her.  "No one has <i>ever</i> ' +
		'made me feel like that."  And you watch as she shudders from just thinking about ' +
		'the orgasm she just experienced.  "You <i>have</i> to do that again."</p>' +

		'<p>"I don\'t <i>have</i> to do anything," you say forcefully.  "You are <i>my</i> ' +
		'slave, remember?  I can get you fired at any time."</p>' +

		'<p>"But, but," she stutters, looking like a toddler that just had her favorite toy taken away.</p>' +

		'<p>"But nothing, slave.  I am your ' + myName + ' now, ' +
		'and you will do anything and everything I say just for the <i>hope</i> of pleasure ' +
		'the likes of which I just gave you."  Fear and doubt flash across her face as you ' +
		'continue.  "Remember, you broke <i>my</i> radio..."</p>' +

		'<p>"Besides," you say, stepping up and running your hand down over her breast.  "Its ' +
		'not as if you didn\'t <i>like</i> being my slave and that was for just a moment.  Think ' +
		'of what it would be like to be my slave... permanently.  You\'d like that, wouldn\'t you."</p>' +

		'<p>It takes her a moment, but she eventually wispers... "Yes," ever-so-quietly.</p>' +

		'<p>"Yes... what?" you whisper flatly in her ear.</p>' +

		'<p>"Yes ' + myName + '," she says, finally looking you in the eye ' +
		'before you give her a deep, deep kiss.  You can feel her body shudder from yet another ' +
		'orgasm as she finally gives in and accepts her fate.</p>' +

		'<p>"What do you wish of me, ' + myName + '?" she asks finally.</p>'
	);

	// Questions
	startQuestions();
	addLinkToPlaceC(md, 'order her "Now you will make me cum"', 410, 'type=oral&place='+ splace);
	if (!perYou.isMaleSex() && perYourBody.FindItem(45) === 0 && isExplicit(true)) addLinkToPlaceC(md, 'order her "Now I\'d like to fuck you"', 411, 'type=fuck&place='+ splace);
	else if (perYou.isMaleSex() || (!perYou.isMaleSex() && perYourBody.FindItem(45) > 0)) addLinkToPlaceC(md, 'order her "Now I will fuck you"', 410, 'type=fuck&place='+ splace);
	if (!perYou.isMaleSex()) addLinkToPlaceC(md, 'ask her "Let us make love"', 410, 'type=sex&place='+ splace);
	if (wherePerson("Diane") != -1) {
		if (splace === "") addLinkToPlaceC(md, 'order her "Go back to the station and wait for me there."', 45);
		else addLinkToPlaceC(md, 'leave after you order her "Change clothes and always deliver me pleasure"', 371);
	}
	WritePlaceFooter(md);
}