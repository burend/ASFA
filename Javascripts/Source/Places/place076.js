// Mr Beasley Threesome with students 3

function ShowPlace76(stype)
{
	var bCharmed = perBeasley.isCharmedBy();

	var md = WritePlaceHeader(false, stype == "freed" && bCharmed ? "td-none" : "td-left-med");
	
	if (stype === "") {

		perBeasley.showPersonRorX("beasley4.jpg");

		if (whereItem(4) == 999) moveItem(4, 76);

		addPlaceTitle(md, "Mr. Beasley\'s Office");

		md.write('<p>Mr. Beasley loses interest in you as his servants do whatever they can to satisfy him. Moans escape the sisters lips as they gyrate their bodies and play a game that could cause their master to lose his most valued possession.</p>');
		
	} else if (stype == "freed") {

		var perAmy = findPerson("AmyRoss");
		if (!bCharmed) perAmy.showPersonAnon("amycatherinebeasley1.jpg");
		addPlaceTitle(md, "Catherine and Amy");
		if (bCharmed) perAmy.showPersonAnon("amycatherinebeasley1.jpg", "30vw", "left");
		
		if (whereItem(4) == 999) moveItem(4, 76);
		unCharmPerson("AmyRoss");		// Free her
		perAmy.setFlag(1);				// Has been freed
		perAmy.moveThem(435);			// To Gym
		unCharmPerson("Catherine");	// Free her
		setPersonFlag("Catherine", 1);// Has been freed
		movePerson("Catherine", 436);	// To home
		setPlaceKnown("CheriseRd");	// Know of Cherise Rd
		setPlaceKnown("AmaranthPl");	// Know of Amaranth Pl
			
		if (bCharmed) {
			perYou.setFlag(12);

			md.write(
				'<p>You order Mr. Beasley to tell you what he is doing, he replies a little reluctantly,</p>' +
				'<p>"I have been preparing these two for a while now, using light hypnosis combined with a magical technique I had learned from my family archives. Amy thought it was to help focus on her studies, and her sister Catherine wanted help with her fear of spiders and I offered to help. I was actually trying to bring out their inner slut, to get them to focus on my coc..orders, and it has been remarkably easy so far.</p>' +
				'<p>These two are almost ready for my ... your ... our ... pleasure ... orders."</p>' +
				'<p>No matter how tempting this might be, there is no way you want Mr. Beasley to have control over your friends, if anyone is going to control them it will be you! You order Mr. Beasley to end the trance and sit at his desk. He looks at you very reluctantly and briefly speaks to the girls. As he does you notice they had been removing their clothing.</p>' +
				'<p>A thought crosses your mind as he walks away, that your friend, and Amy\'s sister Catherine has no inner slut, from how she talks about her relationships she is <b>all</b> slut! You are surprised about Amy though, but she is always reluctant to talk about relationships, changing the conversation and getting Catherine to talk about some racy details of her last lover.</p>' +
				'<p>Your friends look at you as Mr. Beasley walks away, and you step over and whisper to them to get out of here and avoid Mr. Beasley. You tell them you will speak to them later and "explain" more. They nod and quickly leave the room, clothes bundled in their arms.</p>' +
				'<p>You turn to Mr. Beasley and ask where the Book is and he reluctantly removes it from his desk and puts it down, "Here it is ' + perYou.getMaster() + '"</p>' +
				'<p>You then ask him to tell you more about the hypnotic technique he mentioned,</p>' +
				'<p>"' + perYou.getMaster() + ' do you understand the basics of hypnosis?", to which you tell him you do not, "Then please study the basics and come back to me for a lesson. The lesson will be the same as other <b>magical techniques</b> and will require some magical experience to learn."</p>'
			);
		} else {
			md.write(
				'<p>Mr. Beasley has slumped in the afterglow of his session with Catherine and Amy, and is no longer paying attention.</p>' +
				'<p>The sisters look at you, confused and a little angry at what just happened, and you quietly step over and whisper to them to get out of here and avoid Mr. Beasley. You tell them you will speak to them later and "explain" more. They nod and quickly leave the room, clothes bundled in their arms.</p>' +
				'<p>You realise that trying to charm them here with Mr. Beasley present would be a very bad idea.</p>'
			);
		}
		
	}

	startQuestions();
	if (whereItem(4) == 76) addLinkToPlace(md, "exit the room", Place, '', 'You cannot just leave the Book here!');
	else addLinkToPlace(md, "exit the room", 70);

	WritePlaceFooter(md);
}