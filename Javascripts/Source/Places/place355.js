function ShowPlace355()
{
	var md = WritePlaceHeader();
	
	var splace = getQueryParam("place");
	var perMadison = findPerson("Madison");
	
	if (splace === "") {
		// At Home during delivery
		perYou.setFlag(2);
		perMadison.showPerson("madison10.jpg");
	} else {
		// At Office
		perMadison.showPerson("madison20.jpg");
	}
	
	addPlaceTitle(md, "Madison Under a Spell");

	md.write(
		'<p>"What did...  I... Um...  Sorry?"  She stammers, her demeanor towards you instantly changing as the spell begins to set in.</p>' +
		'<p>"You know," she starts in after a moment to \'regain\' her senses. "You\'re kinda cute and all... ' +
		'and I\'m seriously sorry about breaking your stereo."</p>' +
		'<p>"I know, but I was seriously looking forward to using that stereo," you say, trying to look ' +
		'upset about it being broken when a much more valuable prize is right in front of you...</p>' +
		'<p>And about to be all yours.</p>' +
		'<p>"I know, I know..." she says, eyeing you up and down as if she\'s about to jump you right ' +
		'here and now. "Tell you what...  you tell me what you want for not turning me in and I\'ll do it."</p>' +
		'<p>The flash of the spell in her eyes tells you that you could literally ask for <i>anything</i> and ' +
		'she <i>would</i> do it...  but what\'s the point of rushing things...</p>'
	);
	
	// Questions
	startQuestions();

	addLinkToPlaceC(md, '"Lift your shirt and show me your breasts."', 356, 'place=' + splace);

	WritePlaceFooter(md);
}