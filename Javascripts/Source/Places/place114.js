// Place - Garden/TV room of the Kelly Home

function ShowPlace114()
{
	var perDebra = findPerson("DebraKelly");
	var clv = perDebra.getCharmedLevel();
	var herName = perDebra.getPersonName();
	
	var md = WritePlaceHeader();
	if (isDay()) {
		// Daytime, so it is the Garden
		perDebra.showPerson("home-garden-" + (clv == 1 ? "puppy" : "gf") + ".jpg");
		addPlaceTitle(md, herName + " in the Garden");
		if (clv == 1) md.write('<p>You tell your puppy that you will go for a walk in the garden. She looks brightly, acting the part of the excited puppy. You wonder how much of this is the spell, and how much is her playful nature. She \'sits\' and waits for her ' + perYou.getMaster() + '</p>');
		else {
			md.write('<p>You join Debra outside and then walk a little further into the well maintained garden. She partly removes her top and smiles at you, it is sunny but you are sure she is not doing this to sunbathe.</p>');
			if (!perDebra.checkFlag(9)) {
				md.write(
					'<p>You notice a skateboard nearby, it looks like someone was doing some simple maintenance or repair. Debra tells you it is hers, she has always enjoyed skateboarding and it is ready to be used. She also says she has a spare one that Janet sometimes uses, clearly an invitation for <b>you</b> to use it.</p>' +
					'<p>Then again it is a nice day and Debra enjoys the Park, maybe you could go for a walk with her there.</p>' +
					'<p>You saw some tennis rackets before and you could invite Debra to play a game over at the courts at school.</p>'
				);
			} else md.write('<p>You have already been out with Debra today so it would be best to stay home with her now.</p>');
		}
	} else {
		// Night, so TV Room
		perDebra.showPerson("home-tvroom-" + (clv == 1 ? "puppy" : "gf") + ".jpg");
		addPlaceTitle(md, herName + " in the TV Room");		
		if (clv == 1) md.write('<p>You tell your puppy that you are going to the room setup as a small home theatre or at least the TV room. She happily joins you and stands in front of the lounge waiting for your orders.</p>');		
		else md.write('<p>You ask your girlfriend Debra to join you in the room setup as a small home theatre or at least the TV room. She sits on a lounge and looks at you expectantly, it is clear she has no interest in watching a video.</p>');
	}
	
	startQuestions();
	
	if (clv == 1) {
		// Puppy
		if (perYou.isBornMale() || perYourBody.FindItem(45) > 0) addLinkToPlaceC(md, 'Debra, "Doggy-style"', Place, 'type=debrafuck');
		if (perYou.isMaleSex()) {
			addLinkToPlace(md, 'put a bone between her tits', Place, 'type=debratitsfuck');
			addLinkToPlace(md, 'lick the bone', Place, 'type=debrabj');
		} else {
			addLinkToPlace(md, 'lap dog!', Place, 'type=debrabj');
		}
		addLinkToPlaceC(md, 'Debra, "Walkies"', 44, 'type=walkies');
		if (isDay()) addLinkToPlaceC(md, 'take your puppy for a run in the park', 87, 'type=parkwalkies');

	} else {
		// Girlfriend
		if (perYou.isMaleSex()) {
			addLinkToPlaceO(md, 'make love to her', Place, 'type=debrafuck');
			addLinkToPlaceO(md, 'play with her tits', Place, 'type=debratitsfuck');
			addLinkToPlaceO(md, 'ask for some oral attention', Place, 'type=debrabj');
		} else {
			addLinkToPlace(md, 'have her lick you', Place, 'type=debrabj');
			addLinkToPlace(md, 'make love to her', Place, 'type=debrafuck');
		}
		if (!perDebra.checkFlag(9) && isDay()) {
			addLinkToPlaceC(md, 'go out skateboarding with Debra', 44, 'type=debraskateboarding1');
			addLinkToPlaceC(md, 'play tennis with Debra', 144, 'type=debratennis');
			addLinkToPlaceC(md, 'go for a walk in the Park with Debra', 87, 'type=debrawalkpark');
		}
	}
	perDebra.addDancingLink(md, 'talk to Debra about dancing in the club',
		'You speak to Debra about the Avernus club and about dancing there for you,</p>' +
		'<p>&quot;Sure, it sounds like fun!&quot; and with that you call Jade to arrange a dance for Debra.'
	);
	perDebra.addSleepLink(md, "go to bed for the night with " + perDebra.getPersonName(), clv == 2 ? "Sleeping with Debra" : "Bedding Debra",
		'<p style="position:absolute;left:2%;top:60%;cursor:pointer;font-size:1.1em;width:40%">' +
		(clv == 2 ?
			'You ask your lover Debra if you could spend the night. She looks quite happy and leads you to her very nicely furnished bedroom, and she does a little strip-tease for you before lying down. The lovely sight of her there tells you they you will not be getting to sleep soon.' :
			'You tell your puppy that it is time to take her to bed. She looks brightly at you and eagerly leads you to her bedroom.'),
		'bed1.jpg'
	);

	addLinkToPlace(md, 'return to the lounge room', 112);
	addLinkToPlace(md, 'exit the house?', 44);

	WritePlaceFooter(md);
}