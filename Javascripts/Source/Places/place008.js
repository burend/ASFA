// Place: Library Reference Area

function ShowPlace8(stype)
{
	// any acts being done (if Monique present)
	var act = getQueryParam("act");

	var md = WritePlaceHeader(false, act == "fuck" ? "td-left-med" : "");

	var perMonique = findPerson("Monique");
	var clv = perMonique.getCharmedLevel();
	var myName = perMonique.getYourNameFor();
	var perAbby = findPerson("Abby");
	var bOpen = isShopOpen(2, 1, true) || act !== "";

	var s;
	var i;

	// Images
	if (bOpen && perMonique.place === 8) // Monique is in the Library
	{
		// Monique's Image
		if (perMonique.isCharmedBy()) {
			// Monique is Charmed
			if (act === "bj") perMonique.showPersonRandomRorX("monique10b", isExplicit() ? 2 : 1);
			else if (act == "lick") perMonique.showPersonRandomRorX("monique10g", 2);
			else if (act === "fuck") perMonique.showPersonRandomRorX("monique11b", 2);
			else if (act == "strap") perMonique.showPerson("monique11gc.jpg");
			else perMonique.showPerson(clv > 1 ? "monique7.jpg" : "monique9.jpg");
		} else {
			// Not charmed
			perMonique.showPerson("monique1.jpg");
		}
	} else addPlaceImage(md, "library-referencedesk.jpg", "", "", "Reference Desk");		// No one here

	// Text here
	if (act == "endcharm") {
		// Final part of charming Monique
		addPlaceTitle(md, "Slave Monique");

		md.write(
			'<p>"Please command me, ' + perMonique.getYourNameFor() + '.  I live to serve, and I serve only you."' +
			'Monique says in a honeyed voice, her fingers lightly pinching her nipples and every pore of her being dripping sex.</p>' +
			'<p>You have added a servant to your harem. Monique is eager to do whatever you want, and to please you in any and every way she can. All you have to do is command her and she is yours.</p>'
		);

	} else if (act === "bj") {
		addPlaceTitle(md, "Reference Area");
		md.write(
			'<p>Sometimes, words are not needed. Monique stands in front of you at the ready, and as you open your pants and gesture to the ground before you, your ever faithful slave immediately understands and crouches down.</p>' +
			'<p>Monique\'s tongue begins to slide eagerly over your manhood, covering you in her saliva and using her hand to get you erect, and doing a good job at it. You place one hand on your hip and drive the other through her hair, watching her as her lips wrap over the tip and begin to slide back and forth, enjoying your slaves administration.</p>' +
			'<p>“You practiced, did you?” You ask her, and the response is a muffled grunt of confirmation before she takes you in all the way to the base as if to show of the results of it. You definitely approve.</p>' +
			'<p>It doesn\'t take her long to bring you close to the edge and when the moment comes, you take a hold of her hair to keep her in place and shoot your load into her mouth.</p>' +
			'<p>Monique waits patiently, swallowing every drop as ordered and eagerly cleaning when might be left with her tongue after you let go of her.</p>'
		);

	} else if (act == "lick") {
		// Female oral service
		addPlaceTitle(md, "Reference Area");
		if (Math.random() < 0.4) {
			md.write(
				'<p>You grab Monique\'s hair and pull the woman into a kiss as a greeting before simply sitting down on her chair and ordering her to knee in front of you.</p>' +
				'<p>Monique is taken aback by your directness at first, nervously fidgeting with her fingers before quickly following up on your order and helping to undress you.</p>' +
				'<p>You smile as you wait for her to finish and lazily lean back, one of your legs now resting on her desk to present your sex to her. “You know what to do, my pet.”</p>' +
				'<p>“Y...yes Mistress.” Monique clearly isn\'t used to such a treatment, and it does take her a moment to "find her flow" so to say, but with a few subtle pointers from you, she begins to lure the first subtle moans from your lips.</p>' +
				'<p>You praise her advances and she seems to grow more confident, her tongue now flicking over your clit before she sucks it inside with her lips and decides to use her fingers to help out.</p>' +
				'<p>Soon, her efforts bear fruit, you feel your body tremble a little as your climax begins to build up and firmly take a hold of Monique\'s hair and press her closer against your twitching fold as you finally reach your peak. Once again praising your eager pets success.</p>'
			);
		} else {
			md.write(
				'<p>It doesn\'t take much for Monique to understand what it is you wish her to do as you sit in front of her with your legs spread. Leaning back she quickly gets on her knees in front of you to service your pussy. Her fingers slowly stroke along its length as she looks up at you happily. Servicing you seems to bring her a great amount of joy. Absently her fingers begin to trace letters along your clit, resulting in a faint gasp as she focuses her attention on arousing you. It isn\'t long before her lips force themselves between your labia and begin kissing the confines beneath. Such an attentive servant!</p>' +
				'<p>Her tongue slides from her mouth to poke at your opening, tracing the tip along the outer edges as she inhales deeply of your scent. Your fingers reach out and grasp hold of her hair as she teases you so. But without a little teasing then how can one be truly pleased?</p>' +
				'<p>Monique shifts position and knees at your side, sucking your clit into her mouth. Holding it trapped between her lips as her tongue dances wildly over the tiny nub. Her right arm snakes up under your leg as her thumb begins stroking along the length of your cunt, pausing only to focus on pushing against your hole before continuing to tease your dampened flesh. Devoted onto her task of pleasing you, the woman focuses upon the sounds that you make as a gauge of how well her manipulation of your body is succeeding. She definitely picked this up from somewhere...</p>' +
				'<p>Ever attentive to your body, her thumb ends teasing you and is quickly replaced by two fingers. Each thrust inward is followed with her fingers curling to rub against the ridges just as your cunt\'s opening. All while her warm breath flows out against your body. Underneath such relentless assault it doesn\'t take long for your body to succumb to orgasm. Your hips thrusting up as you cry out in pleasure. Monique isn\'t quite done with you yet, however. As she continued her sucking, licking, and fingering throughout your orgasm, quickly sending you into another.</p>' +
				'<p>Finally stopping your cunt is provided with only a moment\'s break before the feeling of her lips again returns to it. This time a much more tender succession of kisses all along your exposed sex.</p>'
			);
		}

	} else if (act === "fuck") {
		addPlaceTitle(md, "Reference Area");
		md.write(
			'<p>Monique has a rather spacious desk, and you feel like it would be a shame to not make full use of it.</p>' +
			'<p>You order her to clear a small section and undress before you simply push her to lay down on it.</p>' +
			'<p>Your faithful slave quickly realizes what you intent to do and eagerly spreads her legs, using one of her pens to play with her clit while you open your pants and free your shaft.</p>' +
			'<p>You have the woman lick it thoroughly, holding her hair until it stands fully at attention and you are ready to take her, eagerly pushing into her already wet sex and satisfy your desires.</p>'
		);

	} else if (act == "strap") {
		addPlaceTitle(md, "Reference Area");
		md.write(
			'<p>Monique has a rather spacious desk, and you feel like it would be a shame to not make full use of it.</p>' +
			'<p>You order her to clear a small section and undress before you simply push her to lay down on it.</p>' +
			'<p>Monique seems unsure what exactly you are planning at first, until you get the strap-on and a tube of lube from your sports bag and show both with a grin, causing your pet to blush heavily.</p>' +
			'<p>Taking your time to prepare, you run the freshly lubed dildo over your pets mound, spreading her folds and teasing her clit while you slowly stir the mana inside her to raise her arousal and suddenly push into her rear.</p>' +
			'<p>There is a sharp yelp of surprise from her, but thanks to your preparation, the huge rubber shaft enters her rear painlessly, and soon, she seems to quite enjoy the unexpected flood sensations. Her moans slowly growing louder as you push into her, driving your pet to a surprisingly quick orgasm.</p>'
		);

	} else {
		// Standard visit (no events)
		addPlaceTitle(md, "Reference Area");
		md.write('<p>Glenvale Library is supposed to hold one of the biggest collections of books in the county, and you can well believe it just looking through the reference area.</p>');

		if (perYou.getExperience() < 1)
		{
			md.write(
				'<p>The difficulty of finding the tome you seek begins to sink in. ' +
				'Who knows, maybe someone else already has possession of the magic and will be willing to turn it against you if you find them. As you enter the reference section, you consider these problems but are determined to try anyway.</p>'
			);
		}

		if (!bOpen || perMonique.place !== 8) {
			// Monique not in Library
			md.write('<p>The reference area is deserted. You look along the bookshelves for a clue to the mystery of magic. There does not appear to be any material on the matter here.</p>');

		}	else {
			// Monique IS in the Library

			// If Need to ask Monique about Davy (Hellgate Path) and She's Not Yet Charmed
			if (perDavy.getPathHellgate() === 5 && !perMonique.isCharmedBy()) {
				// then set v11 (Hellgate) to allow you to ask.
				perDavy.setPathHellgate(10);
			}

			// Description of Monique
			if (perMonique.other < 1) {
				md.write('<p>An attractive girl is sitting at one of the computer terminals. She\'s familiar to you; one of the staff. As you approach she startles and, too quickly, spins around to face you. Nervously you approach the girl.</p>');
			}	else if (perMonique.isCharmedBy()) {
				// Monique is charmed
				if (clv > 1) md.write('<p>Monique, ever your faithful slave' + addVisible(', stands at attention -', 'is always') + ' ready to serve you in any way you desire.</p>');
				else md.write('<p>Monique, the database administrator and now your close friend ' + addVisible('turns to face you', 'starts and glances in your direction but turns back to her computer') + '.</p>');
			} else {
				md.write('<p>Monique, the database administrator, ' + addVisible('spins around to face you', 'starts and glances in your direction but turns back to her computer') + '.</p>');
			}
		}
	}

	// Dialog Choices
	startQuestions();
	if (bOpen && perMonique.place === 8) {
		// Begin IF MONIQUE IS @ LIBRARY
		if (perMonique.other ===  0)  {
			// Introduce yourself
			s = "<p>" + perMonique.addPersonString("monique2.jpg", "20%", "right") +
				"You approach the nervous looking staff member, you have seen her a number of times before but you do not think you have spoken to her before. You introduce yourself and she looks calmer, her nervousness has passed. She replies,</p>";
			if (!perMonique.isCharmedBy()) s += '"Hello, my name is Monique," says the girl. "How may I help you?"';
			else s += '"Hello ' + perMonique.getYourNameFor() + ', how may I be of service?"';
			s += "<p>You apologise if you startled her, and she smiles,</p>" +
				'<p>"Sorry I was just reading a little on this town\'s history and Tess had recently told me some creepy stories about magic and I was a little...umm...on edge. She likes to tease me about things I am a little afraid of, things I am interested in but..well..anxious about."</p>' +
				'<p>She seems like a nice lady, but her always anxious and nervous behaviour can be irritating after a while, but her vast knowledge and interest in the history of the town makes her a pivotal person in your journey, you know that for sure.';
			addPopupLinkC(md, 'introduce yourself to the girl', "Reference Area Staff", s, false, "setPersonOther('Monique',1);dispPlace();");

		}	else if (perMonique.other == 1) {
			// Ask about the Kurndorf Book
			addQuestionC(md, 'ask where you could find the Kurndorf book', "Monique", 61);
		}

		if (!isPlaceKnown("GrangerHouse")) //Don't already know Kate's Address
		{
			if (getPersonOther("Kate") === 999) {
				//Managed to PISS OFF KATE
				addQuestionC(md, '"Could you help me find someone\'s address?"', "Monique", 999);
			} else if (getPersonOther("Kate") == 998) addQuestionC(md, '"Kate Granger. We have a project to finish and I lost her address."', "Monique", 998);
		}

		if (!perMonique.isCharmedBy()) {
			//  Have handed her Mr. Beasley's Paper & haven't charmed her yet
			if (perMonique.other == 3) addQuestionC(md, 'ask Monique what information ' + perGates.getPersonNameShort() + ' wanted', "Monique", 67);
			else if (perMonique.other == 4) addQuestionC(md, 'ask Monique if she can look for anything else on Kurdoff', "Monique", 66);
		}

		if (getBeasleyServant() >= 10 && !isPlaceKnown("Alley")) {
			//Tells you where to look for the charm spell for Mr Beasley
			addQuestionC(md, 'ask if she knows about a bull and building', "Monique", 1410);
		}
		if (perMonique.isCharmedBy()) // if Monique is Charmed
		{
			if (clv > 1 && (act === "" || act == "endcharm")) {
				if (perYou.isMaleSex()) addQuestionCO(md, 'order Monique to take you in her mouth, and take every drop',"Monique", 51);
				if (perYou.getSex() == "girl") addQuestionCO(md, 'order Monique to use her soft lips to kiss and lick you', "Monique", 51);
				if (perYou.isMaleSex()) addQuestionCO(md, 'take Monique', "Monique", 55);
				else if (perYourBody.FindItem(45) > 0) addQuestionCO(md, 'take Monique with your strap-on', "Monique", 55);
			}

			if (perMonique.getQuest() < 3) {
				// Start the process of Monique wandering around all over the place
				addQuestionCO(md, clv > 1 ? 'tell Monique to help you find more magic' : 'ask Monique to help you find more magic', "Monique", 52);
			}
			if (checkPersonFlag("Pamela",8) && !checkPersonFlag("Pamela",9) && perYourBody.FindItem(46) > 0) {
				// got the necklace, ask Monique about it
				addQuestionC(md, 'ask Monique about Pamela\'s bracelet', "Monique", 80);
			}
			if (whereItem(35) == 279 && !isSpellKnown("Shielded Charm")) {
				if (wherePerson("Hannah") == 279) {
					// Ask about the Gem, Mechanics Shop Open
					addPopupLinkC(md, '"Do you know about the dragon gem"', "Monique and the Gem",
						"<p>" + perMonique.addPersonString("monique3a.jpg", "height:max%", "right") +
						'You tell Monique about the dragon gem and the strange writing you found, and explain that you are nether able to move it, nor decipher any of the Symbols.</p>' +
						'<p>Monique asks where you left it, and as you mention Hannah\'s mechanics workshop, her eyes lighten up.</p>' +
						'“I know the place, in fact, I live right above it!” She smiles. “Me and Hannah have been roommates for a while, and I actually meant to invite you anyway and show you... something.” She suddenly looks around nervously again.</p>' +
						'“I\'ll meet you there, I\'m sure you\'ll like it, bye!”',
						true, "movePerson('Monique', 279);dispPlace();"
					);
				} else {
					// Ask about the Gem, Shop Closed
					addPopupLinkC(md, '"Do you know about the dragon gem"', "Monique and the Gem",
						"<p>" + perMonique.addPersonString("monique3a.jpg", "height:max%", "right") +
						'You tell Monique about the dragon gem and the strange writing you found, and explain that you are nether able to move it, nor decipher any of the Symbols.</p>' +
						'<p>Monique asks where you left it, and as you mention Hannah\'s mechanics workshop, her eyes lighten up.</p>' +
						'“I know the place, but it is not open now and Hannah won\'t open it especially for you. When it is open come back and ask me then, I can help you!”',
						true
					);
				}
			} else if (perMonique.checkFlag(19) && isCharmedBy("Hannah") && wherePerson("Hannah") == 279) {
				addPopupLinkC(md, '"let\'s visit Hannah"', "Visiting Hannah",
					"<p>" + perMonique.addPersonString("monique3a.jpg", "height:max%", "right") +
					"You tell Monique that is would be nice to visit Hannah at the Mechanic\'s Workshop again, and you see her smile,</p>" +
					'<p>"I\'d love to visit my friend Hannah, I\'ll change and meet you there for a ride!"</p>',
					true, "movePerson('Monique', 279);dispPlace();"
				);
			}
		}

		// Sir Reginald's Apprentice - Blue Key Plot
		//	if perGates.other == 16) md.write('<a href="#" onClick=Converse("Monique",1000)>ask about the blue key,<br>');
		
		// Found a book?
		if (perMonique.other >= 10) {	// Done other hunting around
			// Each of these should be mutually exclusive
			if (checkPersonFlag("Catherine", 5) && !checkPersonFlag("Catherine", 13)) {
				addPopupLinkC(md, "ask Monique if she has found anything else", "Researching",
					"<p><img src='UI/books/kingbook.jpg' style='width:20%;float:right;margin-left:5px;margin-bottom:1em' alt='King Book'>" +
					"You check with Monique if she has found anything else useful or magical, and she slides over a book to you,<br><br>" +
					'"I recently found this book, it is originally a fictional story of macarbe events and madness, this is an odd edition. It must be a very early edition and it is quite unlike any others I can find on record!"</p>' +
					'<p>She pauses, "Sorry I could not fully read it...it was just too spooky, I could not take it and I have been having nightmares about what I did read", she shudders. You know she is nervous about the occult but this book has really creeped her out.</p>' +
					'<p>Well it is just a work of fiction and not very long, so you sit down with her and read it....She was not kidding, it is one disturbing work of eldritch horror and madness centered around an otherworldy being, the King in Yellow living on a far dead world, spreading corruption and death at mere speaking of his name "Hastur". You put the book away, resolving to not read it <i>ever</i> again.',
					true, "setPersonFlag('Catherine',13);if(!per.checkFlag(12))perYou.addExperience(1);dispPlace();"
				);
			}
		}

		//Section to ask for help from someone if you can't figure out a puzzle
		for (i = 3; i < 6; i++) {
			if (perMonique.checkFlag(i)) {
				addQuestionC(md, 'ask Monique if she can help you with a riddle', "Monique", 21);
				break;
			}
		}

		if (perMonique.checkFlag(2)) {
			if (perMonique.checkFlag(3)) {
				if (perMonique.checkFlag(33)) addQuestionC(md, '"How would you rearrange the letters in the words \'new door\' to make one word?"', "Monique", 73);
				else if (perMonique.checkFlag(34)) addQuestionC(md, '"If it\'s information you seek, come and see me. If it\'s pairs of letters you need, I have consecutively three. Who am I?"', "Monique", 73);
				else addQuestionC(md, '"A natural state, I\'m sought by all. Go without me, and you shall fall. You do me when you spend, and use me when you eat to no end. What am I?"', "Monique", 73);
			}
			if (perMonique.checkFlag(4)) {
				if (perDavy.checkFlag(33)) addQuestionC(md, '"What is at the beginning of eternity, the end of time, the beginning of every end, and the end of every place?"', "Monique", 74);
				else if (perDavy.checkFlag(34)) addQuestionC(md, '"I\'d do anything for love ..."', "Monique", 74);
				else if (perDavy.checkFlag(35)) addQuestionC(md, '"Enter ..."', "Monique", 74);
			}
			if (perMonique.checkFlag(5)) {
				if (checkPlaceFlag("Crypt", 3)) addQuestionC(md, '"One is vain by nature, <b>teomds</b> by necessity."', "Monique", 75);
				else if (checkPlaceFlag("Crypt", 4)) addQuestionC(md, '"A maker of tablets, often said to be free <b>amnos</b>."', "Monique", 75);
				else if (checkPlaceFlag("Crypt", 5)) addQuestionC(md, '"A guard against the dead and often the living, <b>aiglcr</b>."', "Monique", 75);
			}
		}

		if (perDavy.getPathHellgate() == 10) addQuestionCO(md, 'tell Monique to look up Davy Robbins\' recent activity', "Monique", 1110);
		if (!isPlaceKnown("WildRanges") && (getPersonOther("MrBeasley") == 2 || perGates.other == 9)) addQuestionC(md, 'ask about magic stones', "Monique", 192);

		if (perYou.checkFlag(12) && !perMonique.checkFlag(17)) addQuestionC(md, 'ask about books on Hypnosis', "Monique", 200);

	}
	// End IF MONIQUE IS @ LIBRARY
	if (perAbby.getQuestDragonGem() === 1)
	{
		if (bOpen && perMonique.place === 8) {
			// Is Monique in the library?
			addQuestionC(md, 'ask Monique to look up magic gems', "Monique", 251);
		}	else {
			addQuestionCO(md, 'look for references about magic gems', "LibraryResearch", 251);
		}
	}

	if (perKurndorf.getQuestSeance() === 16 || perKurndorf.getQuestSeance() === 17) {
		if (bOpen && perMonique.place === 8) {
			// Is Monique in the library?
			addQuestionC(md, 'ask Monique to research séances', "Monique", 2717);
		} else {
			addQuestionCO(md, 'look for any reference about séances', "LibraryResearch", 2717);
		}
	}

	addLinkToPlace(md, "go to the library reception?", 3);

	WritePlaceFooter(md);
}