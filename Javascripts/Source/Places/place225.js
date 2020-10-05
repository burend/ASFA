// Place: Bank

function ShowPlace225()
{
	if (!isShopOpen(0)) return gotoPlaceDelayed(194, '', '<img src=\"UI/closed.png\" style=\"float:left;width:15%;margin-right:5px\">The Friendly Loan Company closes and all customers are asked to leave.');

	var md = WritePlaceHeader();

	var perEllie = findPerson("Ellie");
	var bEllieCharmed = perEllie.isCharmedBy("You");
	var myName = perEllie.getYourNameFor();
	//var herName = perEllie.getPersonName();
	var clv = perEllie.getCharmedLevel();

	// Image
	if (bEllieCharmed) perEllie.showPerson("ellie1b.jpg", "", "", "ellie1c.jpg");
	else perEllie.showPerson("ellie1.jpg", "", "", "ellie1a.jpg");

	// Title
	addPlaceTitle(md, "Friendly Loan Company");

	// Description
	md.write('<p>Looking around you can see a lot of CCTv cameras.  It would seem that the "Friendly Loan Company" isn\'t taking any chances with their money.</p>');

	if (isVisible()) {
		if (bEllieCharmed) {
			md.write('<p>After waiting in line for a short while you finally meet up with one of the desk attendants, ' + (clv == 4 ? 'your slave' : 'your lover') + ' Ellie, who is happy to explain the range of bank services.  "And what would you like me to help you with today ' + myName + '?" she asks.</p>');
		} else {
			md.write(
				'<p>After waiting in line for a short while you finally meet up with one of the desk attendants, who turns out to be Ellie, a familiar face from your school.</p>' +
				'<p>She formally asks "And what would you like me to help you with today?"</p>'
			);
		}
		if (perYou.getBankBalance() > 0) {
			// Have an account
			md.write('<p>"If you\'d like to make deposits or withdrawals from your account, please use our ATM located in the corner," she says cheerfully.</p>');
		}
		if (checkPersonFlag("Kristin", 12) && checkPersonFlag("Mom", 6)) {
			md.write('<p>You can go to see the manager about your credit card application, after a short wait.</p>');
		} else if (perYourBody.FindItem(27) === 0) {
			md.write('<p>It would seem that you don\'t have any <i>official</i> business to attend to here.</p>');
		}
	}

	// Choices
	startQuestions();

	if (perYou.getBankBalance() === 0) {
		//Do not have an account yet
		addQuestionR(md,
			'&quot;I\'d like to start an account, please.&quot;',
			'&quot;Of course,&quot; she says cheerfully. &quot;I will just need a few pieces of information.&quot;<br/>Within moments she has your account up and running.',
			'Bank ' + (isBritish() ? "Teller" : "Clerk") + ' Ellie',
			"perYou.changeBankBalance(0);");

	} else addOptionLink(md, "use the ATM", 'Leave();useATM()');

	if (perYourBody.FindItem(27) > 0) addLinkToPlace(md, "show her the letter of credit from " + perGates.getPersonNameShort(), 224);	// Have the notice from Gates
	if (checkPersonFlag("Mom",6) || (isCharmedBy("Kristin") && wherePerson("Kristin") === 224)) addLinkToPlace(md, "speak with the bank manager", 224);
	addLinkToPlace(md, "exit the Bank", 194);

	WritePlaceFooter(md);
}