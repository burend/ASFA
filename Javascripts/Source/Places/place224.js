// Place: Bank Managers Office

function ShowPlace224()
{
	var perK = findPerson("Kristin");
	var clv = perK.getCharmedLevel();

	var md = WritePlaceHeader(false, clv !== 0 && perK.getDress() == "Black" ? "td-left-large" : "");

	/*  PICTURE REFERENCES */

	/****************************************************************
	Kristin, the Bank Manager
	****************************************************************/

	if (clv === 0) {
		//NORMAL
		perK.showPerson("kristin1.jpg");
	} else {
		// Charmed
		perK.showPerson("kristin3.jpg");
	}

	/* General Description */

	/* TITLE LINE */
	if (clv === 0) {
		//NORMAL
		addPlaceTitle(md, "Bank Manager");
	} else {
		addPlaceTitle(md, "Slave Kristin");
	}

	/* Description */
	if (clv === 0) {
		//Normal
		md.write('<p>A rather beautiful woman sits before you, busily typing and clicking away at her computer, presumably checking accounts.  After a short time, she finishes whatever task held her attention and turns in your direction.</p>');
		if (perK.checkFlag(12)) {
			md.write('<p>"Yes?" she asks very professionally.  "I see you wish to apply for a credit card"</p>');
			perK.setFlag(13);
			setPersonFlag("Mom", 6, false);		// No longer available
		} else md.write('<p>"Yes?" she asks very professionally.  "What can I do for you today?"</p>');
	}	else {
		// CHARMED
		md.write('<p>"It\'s the most peculiar thing," Kristen says as you enter.  "I find I just have to show myself off to you, ' + perYou.getMaster() + '.  Why do you suppose that could be?"  She pulls her top down to show herself off again.</p>');
	}

	/* Dialogue Options */
	startQuestions();

	if (clv > 0) {
		//Charmed
		addLinkToPlace(md, 'elucidate the reasons for her behavior', Place, 'type=elucidate');
		if (perK.checkFlag(8) && !perK.checkFlag(10)) addQuestionC(md, 'ask Kristin to close the Bank', "Kristin", 2800);
		if (!perYou.checkFlag(9)) addQuestionC(md, 'ask Kristin to remove the limit on your bank account', "Kristin", 2900);
		if (!perK.checkFlag(5)) addQuestionC(md, 'ask about Ellie', "Kristin", 100);
	}

	if (!perK.checkFlag(1)) {
		addPopupLinkC(md, 'introduce yourself', "Bank Manager",
			perK.addPersonString("kristin0.jpg", "height:max%", "right") +
			'The Bank manager is a raven haired woman who is in her early thirties. Your first impression of her is that she is the typical bossy, business woman character who doesn’t take no for an answer and achieves everything she wants. Women in high and powerful places tend to be selfish and careerist and you guess the same things motivates her too.<br><br>' +
			'She’s talking on the phone when you and Ellie arrive in front of her office. Ellie knocks on the door and whispers into your ear.<br>' +
			'"Whatever you do, just don’t make her angry and always make her feel that she’s the boss around here! She can be stiff as stone if you offend her!" says Ellie and she hurridly leaves you alone with her boss.<br><br>' +
			'Ellie’s attitude did not cool you down a single bit, for one it just made you more nervous than you usually feel when you meet with new people. As you wait for the manager to finish her talk on the phone you look around in her office you realize your first thoughts of her were true. When she finally hangs up the phone she offers her hand to shake and introduces herself.<br><br>' +
			'"Hello! The name’s Kristin! What can I help you with?"',
			false, "setPersonFlag('Kristin',1);dispPlace();"
		);
	} else if (perK.checkFlag(1) && perYourBody.FindItem(27) > 0) {
		//Have the Credit Letter from Gates
		addQuestionCO(md, 'give her the Letter of Credit from Gates', "Kristin", 2701);
	} else if (clv === 0 && perK.checkFlag(1) && perK.checkFlag(12)) {
		// Apply for Credit Card
		addQuestionCO(md, 'apply for a Credit Card', "Kristin", 2802);
	}

	addLinkToPlace(md, 'leave her office', 225);
	addLinkToPlace(md, 'exit the Bank', 194);

	WritePlaceFooter(md);
}