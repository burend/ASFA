// Place: Home shower

function ShowPlace40()
{
	var nLastShower = perYou.extra[13];
	var nHrsSinceLast = Math.floor((nTime - nLastShower) / 12);
	var sLast = perYou.extra[14];
	var stage = getQueryParam("stage");
	
	// Who is here?
	var perTanika = findPerson("MrsTanika");
	var perTess = findPerson("Tess");
	var perAnita = findPerson("Anita");
	var perMom = findPerson("Mom");
	var perTracy = findPerson("Tracy");
	var perMiku = findPerson("Miku");
	var perGhost = findPerson("Ghost");
	var perElian = findPerson("Elian");
	
	var ar = [];
	if (perTess.whereNow() == 46 && sLast != perTess.uid) ar.push(perTess.uid);
	if (perTanika.whereNow() == 46 && sLast != perTanika.uid) ar.push(perTanika.uid);
	if (perAnita.whereNow() == 46 && sLast != perAnita.uid) ar.push(perAnita.uid);
	if (perMom.whereNow() == 154 && sLast != perMom.uid) ar.push(perMom.uid);
	if (perTracy.place == 1 && sLast != perTracy.uid) ar.push(perTracy.uid);
	if (perMiku.whereNow() == 408 && sLast != perMiku.uid) ar.push(perMiku.uid);
	if ((perGhost.whereNow() == 408 || perGhost.place == -1 || perGhost.place == -64) && sLast != perGhost.uid) ar.push(perGhost.uid);
	if (perElian.checkFlag(14) && perElian.place < 1000 && sLast != perElian.uid) ar.push(perElian.uid);
	
	// Special case for Elian require it after the start of the challenges
	if (perElian.checkFlag(14) && !perElian.checkFlag(25)) sWho = perElian.uid;
	else if (ar.length === 0 || (nHrsSinceLast < 4 && sWho === "")) sWho = "alone";	
	else if (sWho === "") sWho = ar[Math.floor(Math.random() * ar.length)];
		
	// Shower
	var md = WritePlaceHeader();
	
	// In the bathroom
	addPlaceTitle(md, "The Bathroom", 'bath-home1.jpg');

	md.write(
		'<p>The bathroom. Mom makes sure you and your sister are keeping it clean even if she is doing extra hours at work, so everything has its place and is kept in good condition except for the door-lock, which has been busted for at least a few years by now.</p>' +
		'<p>Mom had meant to have someone fix it, but always postponed it and by now the three of you have pretty much gotten so used to it and no longer mind.</p>'
	);

	startQuestions();
	if (isPersonHere("Vampyre") && !checkPersonFlag("Vampyre", 12)) addLinkToPlace(md, 'ask Lilith to have a shower with you', 40, '', per.addPersonFace() + '"My Kin does not enjoy standing under running water. It is not pleasant to me, and I refuse to do so."</p><p>With that she leaves the bathroom.', 'Vampyre', "bChatLeft=false;setPersonFlag('Vampyre',12)");
	else if (isPersonHere("Tina")) addLinkToPlace(md, 'have a shower with Tina', 40, 'type=showertina');
	else addLinkToPlace(md, 'have a shower', 40, 'type=shower' + sWho, '', '', sWho != 'alone' ? "perYou.extra[13]=nTime;perYou.extra[14]='" + sWho + "'" : '');

	// Common choices
	addLinkToPlace(md, 'leave the bathroom', 45);
	addLinkToPlace(md, 'leave your house', 44);
	WritePlaceFooter(md);
}