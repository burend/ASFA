function ShowPlace357()
{
	var splace = getQueryParam("place");
	var md = WritePlaceHeader(false, splace === "" ? "td-left-large" : "");
	var perMadison = findPerson("Madison");
	var myName = perYou.getMaster();
	
	if (splace === "") {
		// At Home during delivery
		perMadison.showPerson("madison13.jpg");

		addPlaceTitle(md, "Madison Under a Spell");

		md.write(
			'<p>A devilish smile crosses her face as she completely strips of her skirt and leans against the couch seductively. ' +
			'"Does this please you...  ' + myName + '?" she asks playfully.</p>' +
			'<p>You smile at her word choice.  "Yes, in fact it does," you say with an evil grin.  "As a ' +
			'matter of fact, lets keep the ' + myName + ' thing going, shall we?" you say as you inspect the nubile young form before you.</p>' +
			'<p>"As you wish, ' + myName + '," she says, almost purring this time. ' +
			'"Is there anything else I can do to please ' + myName + '?"</p>' +
			'<p>"Well, there was one thing..." you say, stepping up and running your hands across her warm and inviting flesh.</p>' +
			'<p>Her body instantly reacts to your touch, a soft moan escaping her lips as you tease her nipples ' +
			'and your hand runs down to her moist and exposed snatch. "Do you like being my <i>slave</i>?" you whisper into her ear.</p>' +
			'<p>"Yessss..." she whispers in return as her body shudders with orgasm from your attention.</p>'
		);
			
	} else {
		// At Office
		perMadison.showPerson("madison22.jpg");

		addPlaceTitle(md, "Madison Under a Spell");

		md.write(
			'<p>A devilish smile crosses her face as she completely strips of her skirt and leans against the desk seductively. ' +
			'"Does this please you...  ' + myName + '?" she asks playfully.</p>' +
			'<p>You smile at her word choice.  "Yes, in fact it does," you say with an evil grin.  "As a ' +
			'matter of fact, lets keep the ' + myName + ' thing going, shall ' +
			'we?" you say as you inspect the nubile young form before you.</p>' +
			'<p>"As you wish, ' + myName + '," she says, almost purring this time. ' +
			'"Is there anything else I can do to please ' + myName + '?"</p>' +
			'<p>"Well, there was one thing..." you say, stepping up and running your hands across her warm and inviting flesh.</p>' +
			'<p>Her body instantly reacts to your touch, a soft moan escaping her lips as you tease her nipples ' +
			'and your hand runs down to her moist and exposed snatch. "Do you like being my <i>slave</i>?" you whisper into her ear.</p>' +
			'<p>"Yessss..." she whispers in return as her body shudders with orgasm from your attention.</p>'
		);
		
	}
	
	// Questions
	startQuestions();

	addLinkToPlace(md, "take it to the next level", 358, 'place=' + splace);

	WritePlaceFooter(md);
}