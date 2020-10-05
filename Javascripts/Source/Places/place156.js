// Tracy in the laundry

function ShowPlace156()
{
	var md = WritePlaceHeader(false, "td-left-med");
	
	var perTracy = findPerson("Tracy");

	// **********************************************************
	// This conditional should be for when the crime scene starts
	// **********************************************************
	var bMurderKnown = perYou.getExperience() > 9;

	perTracy.showPersonDN("tracy7.jpg");

	var myName;
	if (perYou.isBornMale()) myName = 'little brother';
	else myName = 'little sister';

	addPlaceTitle(md, "Tracy In The Laundry");

	md.write('<p>Tracy is in the laundry-room, studying. ');

	if (getPersonOther("Mom") >= 5 && !perYou.checkFlag(35)) {
		// If you haven't had your mother clean your shirt then she doesn't say these things.
		perYou.setFlag(35);
		md.write('You recognise your cleaned shirt on top of a nearby pile of clothes.</p>');

		if (!bMurderKnown)	{
			md.write('<p>"Hey there ' + myName + '," says Tracy. "You never can tell what is going to happen, can you? Here I am doing your washing. Don\'t think that it is going to happen every day. I only did it because Mom asked me to. Your shirt was a mess. Did you have had a mammoth bloody nose or something?"</p>');
			md.write('<p>You gulp and wonder whether Tracy will figure out the connection with ' + perGates.getPersonNameShort() + '\'s murder.</p>');
		}	else {
			md.write('<p>"Well you\'re back,' + myName + '" says your sister. "Did you hear about what happened at the Gates\' place? There was a murder, someone chopped ' + perGates.getPersonNameShort() + '\'s head off and shoved it though a mincer. The cops are everywhere, trying to find out who did it."</p>');
			md.write('<p>You ignore your sister\'s exaggerated version of the murder and grab your shirt out of the washing basket.</p>');
		}
	} else if (perYou.checkFlag(35)) md.write('<p>"Hey there ' + myName + '," says Tracy.</p>');

	//****************************************************************************************
	startQuestions();

	if (getPersonOther("Tina") >= 4) {
		// Can Tina Robbins De-Charm ppl?
		addQuestionC(md, '"Hey Tracy, I ran into Davy and he asked me to have you meet him at his house."', "Tracy", 8906);
	}

	// Beasley Servant options
	if (getBeasleyServant() == 8) addQuestionC(md, '"Hey Tracy, could you help me find the meaning of <i>Dai Chu</i>?"', "Tracy", 1408);
	else if (getBeasleyServant() == 12) addQuestionC(md, '"Hey Sis, did Mr. Beasley say anything about <i>mana</i>?"', "Tracy", 1412);

   addLinkToPlace(md, 'exit the laundry room', 45);

	WritePlaceFooter(md);
}