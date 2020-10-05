// Place: Kelly House - Stairs/Bedroom

function ShowPlace113(stype)
{
	var perJanet = findPerson("JanetKelly");
	var herName = perJanet.getPersonName();
	var clv = perJanet.getCharmedLevel();
	var hJ = perJanet.getPersonTitle();

	var md = WritePlaceHeader();
	perJanet.showPerson("home-bedroom-" + (clv == 5 ? "cat" : clv == 3 ? "bimbo" : "gf") + ".jpg");
	addPlaceTitle(md, herName + (clv == 3 ? " on the Stairs" : "'s Bedroom"));

	if (clv == 3) {
		md.write(
			'<p>Janet begins leading you up the stairs, getting more and more excited with every step.</p>' +
			'<p>"Uh...  I forget where it is again..." she says, throwing her clothes off as she speaks.  "Just take me here, ' + perYou.getMaster() + ', please!" she moans.</p>'
		);
	} else {
		md.write('<p>Janet leads you upstairs to her bedroom, getting more and more excited as you approach.</p>');
		if (clv == 5) {
			md.write(
				'<p>She throws off her clothes and lies on the bed,  "Meow, take me here, ' + perYou.getMaster() + ', please!" she purrs.</p>'
			);		
		} else {
			md.write(
				'<p>She throws off her clothes and slips quickly into some white lingerie,  "Take me here, ' + perYou.getMaster() + ', please!" she moans.</p>'
			);		
		}
	}
	
	startQuestions();

	if (clv == 5) {
		// Cat
		if (perYou.isMaleSex()) {
			addLinkToPlaceO(md, 'fuck the pussy', 113, 'type=fuck');
			addLinkToPlaceO(md, 'play with her tits', 113, 'type=janettitfuck');
			addLinkToPlace(md, '"Time for some cream"', 113, 'type=janetbj');
		} else {
			addLinkToPlace(md, 'have her lick you clean', 113, 'type=janetbj');
			addLinkToPlace(md, 'pussy to pussy', 113, 'type=fuck');
		}		
	} else if (clv == 3) {
		// Bimbo
		if (perYou.isMaleSex()) {
			addLinkToPlace(md, 'fuck your bimbo', 113, 'type=janetfuck');
			addLinkToPlace(md, 'fuck her bimbo tits', 113, 'type=janettitfuck');
			addLinkToPlace(md, 'use her bimbo mouth', 113, 'type=janetbj');
		} else {
			addLinkToPlace(md, 'have her lick you', 113, 'type=janetbj');
			addLinkToPlace(md, 'have sex with the bimbo', 113, 'type=janetfuck');
		}		
	} else if (clv == 2) {
		// GF
		if (perYou.isMaleSex()) {
			addLinkToPlaceO(md, 'make love with her', 113, 'type=janetfuck');
			addLinkToPlaceO(md, 'ask to play with her tits', 113, 'type=janettitfuck');
			addLinkToPlaceO(md, 'ask her for some oral pleasure', 113, 'type=janetbj');
		} else {
			addLinkToPlaceO(md, 'ask her for some oral pleasure', 113, 'type=janetbj');
			addLinkToPlaceO(md, 'make love to her', 113, 'type=janetfuck');
		}		
	} else if (perYou.isMaleSex()) {
		addLinkToPlaceO(md, 'fuck her', 113, 'type=janetfuck');
		addLinkToPlaceO(md, 'fuck her tits', 113, 'type=janettitfuck');
		addLinkToPlaceO(md, 'fuck her mouth', 113, 'type=janetbj');
	} else {
		addLinkToPlaceO(md, 'order her lick you', 113, 'type=janetbj');
		addLinkToPlaceO(md, 'have sex with her', 113, 'type=janetfuck');
	}
	if (!perJanet.checkFlag(9)) {
		if (clv == 3) {
			// Bimbo events
			addLinkToPlaceC(md, 'show off your Bimbo Janet', 44, 'type=janetshowoff');
		} else {
			// Other type evemts
			addLinkToPlaceC(md, hJ + 'Janet says "I need a shower, join me?"', 113, 'type=janetshower1');
		}
	}
	
	perJanet.addDancingLink(md, 'talk to ' + hJ + 'Janet about dancing in the club',
		'You speak to ' + hJ + 'Janet about the Avernus club and about dancing there for you,</p><p>"' +
		(clv == 3 ? 'Like Sure, it sounds real fun!' : clv == 5 ? 'Sure, it sounds purrfect!' : 'Sure, whatever you want, it sounds fun.') +
		'" and with that you call Jade to arrange a dance for Janet.'
	);
	perJanet.addSleepLink(md, "go to bed for the night with " + hJ + "Janet", "Going to Bed with Janet",
		'<p style="position:absolute;left:5%;top:5%;cursor:pointer;font-size:1.1em;width:50%">You tell ' + hJ + 'Janet that you will sleep here tonight. She lies down awaiting for you to join her.',
		clv == 5 ? 'bed2.jpg' : 'bed1.jpg', undefined, 112
	);

	addLinkToPlace(md, 'go downstairs', 112);
	addLinkToPlace(md, 'exit the house?', 44);

	WritePlaceFooter(md);
}