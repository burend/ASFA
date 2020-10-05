function ShowPlace134()
{
	var md = WritePlaceHeader();

	var perBambi = findPerson("Bambi");
	
	perBambi.showPerson("bambi2.jpg");

	addPlaceTitle(md, "Meeting Bambi");

	md.write(
		'<p>Bambi seats herself beside you. Her legs are stunning and she blushes like a teenager. You can\'t ' +
		'resist touching her feather-light shawl.</p>' +
		'<p>&quot;I think you misunderstood me, ' + perYou.getPersonName() + '&quot; she says, her ' +
		'voice taking on a harder tone. "The one hundred ' + getCurrencyName() +
		' is for my company. It will cost you fifty more if you want more than a talk.&quot;</p>' +
		'<p>&quot;Fifty ' + getCurrencyName() + '! You have to be kidding.&quot; For ' +
		'the first time you see the cunning in the woman of your dreams.</p>' +
		'<p>&quot;Don\'t you think that I\'m worth it?&quot; she ' +
		'replies innocently. &quot;A ' + perYou.getSex() + ' of your means should not balk at giving a little cash.&quot;</p>');

	startQuestions();
	if (perBambi.other == 5 && nMoney >= 50) {
		//Can slip her the money, and have enough to do so.
		addQuestionCO(md, 'hand over another ' + sCurrency + '50', "Bambi", 10806);
	}

	addLinkToPlace(md, "head back to the Hotel Bar", 124);


	WritePlaceFooter(md);
}