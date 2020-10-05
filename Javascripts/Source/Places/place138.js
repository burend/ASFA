function ShowPlace138()
{
	var md = WritePlaceHeader(false, perYou.isMaleSex() ? "" : "td-left-large");

	var perBambi = findPerson("Bambi");

	if (perYou.isMaleSex()) perBambi.showPersonRorX("bambi6b.jpg");
	else perBambi.showPersonRorX("bambi6g.jpg");

	var myName;
	if (isBritish()) myName = perYou.isBornMale() ? 'Lord and Master' : 'Lady and Mistress';
	else myName = perYou.getMaster();

	addPlaceTitle(md, "Bambi Under a Spell");

	md.write(
		'<p>You take the barmaid into your arms, and she surrounds you with insatiable passion. Never before have you had sex so good as with this girl. There is the energy and enthusiasm of youth, the calm aged passion those in mid-life, but this... This is the skillful application of years of professional experience heightened by her newfound need to please you in any and every way she can imagine.  As you submit to her ministrations she confesses her love for you. Over, and over, and over. Finally you can take it no longer and collapse.</p>' +
		'<p>As you stare into her eyes you realize that her mind is now an open book for you to rewrite however you see fit.  Unable to resist the temptation, you begin to compose upon the creature before you.  To reshape it in your image...  of the perfect slave.</p>' +
		'<p>"Bambi, you are now my slave and I am your ' + myName + '.  You <i>belong</i> to me now.  You obey me without question, without hesitation.  Serving me is the most important thing in your life, more important than your life itself.  Your body and mind are mine to use however I see fit, so I will have you whenever I like.</p>' +
		'<p>You also love to help me enslave others.  Other than servicing me, nothing gives you more pleasure than providing me with another slave to serve me as you do."  You watch in fascination as your words become ultimate truth within the malleable mind before you.  Slowly her expression begins to change from a blank, accepting stare to a sly seductive grin.  You hold her chin up and look deeply into her completely enslaved eyes.  "Do you understand?"</p>');

	myName = perBambi.getYourNameFor();

	md.write(
		'<p>She returns your question with unabashed adoration and all but purrs her answer into your ear. "Oh yes, ' + myName + ', perfectly.  Everything that I am is yours."  Then she continues with an evil little grin as she whispers, "Shall I inform you whenever a beautiful little tart decides to stay in the hotel, ' + myName + '?"</p>' +
		'<p>You just smile, quite pleased with yourself and your newest acquisition.  Then you swat her on the ass and send her back to work.  She seems disappointed at first, then realizes that to truly serve you best she must continue to work at the hotel bar and immediately brightens up.</p>');

	startQuestions();
	addLinkToPlace(md, "go to the bar?", 124);

	WritePlaceFooter(md);
}