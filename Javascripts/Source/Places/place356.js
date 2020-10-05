function ShowPlace356()
{
	var md = WritePlaceHeader();
	var splace = getQueryParam("place");
	var perMadison = findPerson("Madison");
	
	if (splace === "") {
		// At Home during delivery
		perMadison.showPerson("madison11.jpg");
	} else {
		// At Office
		perMadison.showPerson("madison21.jpg");
	}
	
	addPlaceTitle(md, "Madison Under a Spell");

	md.write(
		'<p>She hesitates for only a moment before the heightened desire from the spell banishes all ' +
		'modesty that may have gotten in the way.  "Anything you say," she says, flashing you a grin.</p>' +
		'<p>Moments later she not only has her shirt and bra lifted up but has managed to hick up her ' +
		'skirt and slightly pulled down her panties.</p>' +
		'<p>You\'re not sure if she even realizes how far she has already fallen. "Not a bad start," you say, ' +
		'challenging her for more.</p>' +
		'<p>"Oh yeah," she says, rising to the bait.  "Not enough for you, huh?  Good thing you\'re so cute.  Normally ' +
		'I wouldn\'t dare do stuff like this," she says, her voice completely missing the concern that you would ' +
		'expect in that statement. "So, what else do I have to do to keep from getting turned in?"</p>'
	);
	
	// Questions
	startQuestions();

	addLinkToPlaceC(md, '"Display yourself for my viewing pleasure."', 357, 'place=' + splace);

	WritePlaceFooter(md);
}