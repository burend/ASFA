// Place: Adam's Residence

function ShowPlace230()
{
	var md = WritePlaceHeader(false, "td-left-small");

	var perJohn = findPerson("JohnAdams");
	if (perJohn.place == 231) perJohn.place = 230;
	var nmJ = perJohn.getPersonName(false);
	var clvJ = perJohn.getCharmedLevel();
	var perTess = findPerson("Tess");
	if (perTess.place == 231) perTess.place = 230;
	
	if (perJohn.checkFlag(9) && !perJohn.checkFlag(10)) return gotoPlaceDelayed(229, '', 'Better not Risk going back until John has calmed down or you found a way to deal with him for good.');

	var bTwoCols = perJohn.place === 230 && perTess.whereNow() == 230 && perTess.other >= 25;
	if (perJohn.place === 230 && perTess.other >= 25) {
		// John Adams is HERE
		if (!perJohn.isCharmedBy()) {
			// John Adams NORMAL
			perJohn.showPerson("john1.jpg");
		} else {
			// John Adams CHARMED
			perJohn.showPerson("john2.jpg");
		}
	} else if (perTess.whereNow() !== 230) addPlaceImage(md, "livingroom4.jpg", "", "", "Living Room");	// No one here at all

	if (perTess.whereNow() == 230 && !bTwoCols) // Tess Adams is HERE
	{
		if (perTess.other == 27) perTess.showPerson("tess14a.jpg");
		else if (perTess.other == 28) perTess.showPerson("tess15.jpg");
		else perTess.showPerson("tess_driving.jpg");
	}

	// ****** DESCRIPTION ********

	addPlaceTitle(md, "Adams Residence");
	md.write('<p>Entering the Adams residence, you marvel at the neatness of the house and the expensive furniture. John and Tess Adams must earn quite a bit to afford such items.</p>');

	if (perJohn.place === 230 && perTess.other >= 25) // John Adams is HERE
	{
		if (perJohn.isCharmedBy()) // CHARMED
		{
			if (clvJ == 2) {
				md.write('<p>' + nmJ + ' welcomes you with a passionate french kiss and a hug. ' + capitalizeFirstLetter(perJohn.getHeShe()) + ' squeezes your arse just the way ' + perJohn.getHeShe() + ' knows you like it and whispers, "It is so good to have you here, Mistress."</p>');
			} else {
				md.write('<p>' + nmJ + ' eagerly welcomes you in, reaffirming once again that ' + perJohn.getHisHer() + ' home is yours and that ' + perJohn.getHeShe() + ' would do anything to please you.</p>');
			}
		}
		else 	// NOT CHARMED
		{
			if (perJohn.other === 0) {
				// Just met
				if (!perJohn.checkFlag(2)) {
					showPopupWindow("John Adams",
						perJohn.addPersonString("john0.jpg", "height:max%", "right") +
						'A man stands in the doorway. He must be Tess’s husband as the way he looks at her gives it away. Tess introduces him as John and shepherds you into the living room. You judge that the couple live well, they have a huge house with a big garden and two expensive cars. The living room is also well furnished and shows a great taste in art and style with modern paintings hanging on the walls.<br><br>' +
						'John is suspicious of you, just like anyone else when a stranger barges into their home with their wife at their side. What did you expect; a warm welcome?<br><br>' +
						'Well, John is an average looking guy and doesn’t look too muscular so if you would happen to be in a fight with him you could easily overpower him. You hope it won’t come to that and Tess can help you get what you want from him without harm.',
						"setPersonFlag('JohnAdams',2)"
					);
				}
				md.write('<p>"Hello ' + perYou.getPersonName() + '," says John. "I\'m pleased to meet you. Tess here tells me that you solved the puzzle that talking worm kept going on about. Impressive, I tried for more than a day - quite unsuccessfully I must admit."</p>');
			} else if (perJohn.other == 5 && perJohn.checkFlag(11)) md.write('<p>John looks like he is about to charge you once he\'s back on his feet.</p>');
			else if (perJohn.other == 8) md.write('<p>John eyes his wife suspiciously. The bulge in his jeans gives away his interest but he acts determined.</p><p>"What have you done to my wife?" he declares. "I should give you a beating for ordering her around."</p>');
			else if (perJohn.other == 9) md.write('<p>Tess returns as a nun, leaving John distraught and confused. "Okay," he says, giving in to you. "What do you want me to do?"</p>');
			if (perTess.whereNow() == 230 && perTess.checkFlag(13)) md.write('<p>Tess is looking uncertain and John is acting protective of her. It seems clear Tess will not leave her until you can exert more influence over John.</p>');
		}
	} else if (perTess.whereNow() == 230 && perTess.other < 10) {
		// Tess ran here after you walked out on charming her
		md.write(
			'<p>You knock on the door to the home and Mrs. Adams answers the door, looking very nervous, she looks up "John...." but her voice trails away as she sees you. She gestures nervously for you to follow her in and she sits on a chair in the lounge room near a small computer desk.</p>' +
			'<p>"Oh ' + perYou.getPersonName() + '...sorry I ran out on you, I really had to see my husband, but he is not here, but I called he will be soon...I should go and wait for him outside...."</p>'
		);

		startQuestions("You have to hurry..");
		addLinkToPlace(md, "order Tess to stay", Place, 'type=charmtess2');
		WritePlaceFooter(md);
		return;
	}

	// ************** DIALOGUE OPTIONS  ****************
	startQuestions();

	if (perJohn.place === 230 && perTess.other >= 25) {
		if (!perJohn.isCharmedBy()) // ONLY do these dialogue options if John is NOT CHARMED
		{
			if (perJohn.other === 0)	{
				addQuestionC(md, '"You don\'t happen to have any <i>more</i> magical items, do you John?"', "JohnAdams", 10400);
				addQuestionC(md, '"Like the way Tess has been dressing lately, John?"', "JohnAdams", 10405);
			}	else if (perJohn.other == 1) {
				addQuestionC(md, '"May I see the ring, John?"', "JohnAdams", 10401);
			}	else if (perJohn.other == 2) {
				addQuestionC(md, '"Tess, get the ring!"', "JohnAdams", 10402);
			}	else if (perJohn.other == 5) {
				addQuestionC(md, '"Do you like the way she\'s been dressing lately?"', "JohnAdams", 10405);
				if (perJohn.checkFlag(11)) addLinkToPlace(md, '"Tess, distract him!"', 229, 'type=exitdistract');
			}	else if (perJohn.other == 6) {
				addQuestionC(md, '"You see John, I can make Tess dress anyway I want."', "JohnAdams", 10406);
			}	else if (perJohn.other == 7) {
				//  This one is in Tess's Response Bank
				addQuestionC(md, '"Go put on something <i>nice</i> for your husband, Tess."', "Tess", 10407);
			}	else if (perJohn.other == 8) {
				addQuestionC(md, 'threaten - "Back away or I\'ll turn Tess into a prudish nun."', "JohnAdams", 10408);
			} else if (perJohn.other == 9) {
				if (perJohn.checkFlag(11)) addLinkToPlace(md, '”The ring will be enough, for now.”', 229, '', '“Fine, take it and leave my house.” John glares at you as you put the ring on your finger, but he makes no further attempt to stop you. “And this better concludes whatever business you have with my wife, too, or I swear the police will get involved.”', '', "setPersonOther('JohnAdams',10)");
				else addQuestionC(md, '”I want any other magical items you have.”', "JohnAdams", 10409);
			}
		}

		/*
		// Can be charmed or not
		if (perJohn.other == 9) {
			addQuestionC(md, '"I want you to find more magic items for me John."', "JohnAdams", 10409);
		}
		*/
	}
	
	if (perTess.whereNow() == 230 && !perJohn.isCharmedBy() && perJohn.other > 9) {
		if (perJohn.checkFlag(10)) {
			if (!perJohn.isCharmedBy() && !perTess.checkFlag(13)) {
				addQuestionC(md, '"I think I prefer you in my bedroom, Tess."', "Tess", 10420);
				if (isShopOpen(2, 1, true)) addQuestionC(md, '"Tess, let\'s meet at the library"', "Tess", 10421);
			}
			if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');
		}
	}	

	if ((perJohn.isCharmedBy() || perJohn.place != 230) && (perTess.whereNow() == 230 || perJohn.place == 230)) {
		// One of them is here, and John is charmed or left
		if (perJohn.isCharmedBy() && isItemNotHere(32, 230)) {
			// John Charmed, Don't Have Ring yet
			if (perJohn.place === 230) {
				//  John is here
				addQuestionC(md, '"Give me any other magical items you have ' + nmJ + '. Now."', "JohnAdams", 10301);
			} else if (perTess.whereNow() == 230) {
				// John is NOT here and Tess IS
				addQuestionC(md, '"Tess, are there any other magical items your husband mentioned?"', "Tess", 10301);
			}
		}
		if (perTess.whereNow() == 230) {
			addQuestionC(md, '"I think I prefer you in my bedroom, Tess."', "Tess", 10420);
			if (isShopOpen(2, 1, true) && perTess.place == 230) addQuestionC(md, '"Tess, let\'s meet at the library"', "Tess", 10421);
			if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask Tess for help deciphering the passages in the book', 'spendExperience()');
		}

		if (perJohn.place === 230) addLinkToPlace(md, 'take ' + nmJ + ' into the bedroom', 231, 'type=johnxxx');
		if (perTess.whereNow() == 230) {
			addLinkToPlace(md, 'take Tess into the bedroom', 231, 'type=tessxxx');
			if (perJohn.place === 230) addLinkToPlace(md, 'take ' + nmJ + ' and Tess into the bedroom', 231, 'type=johntessxxx');
		}
		
		if (perJohn.place === 230) {
			perJohn.addDancingLink(md, 'talk to ' + nmJ + ' about dancing in the club',
				'You ask ' + nmJ + ' about stripping in the Avernus club. ' + capitalize(perJohn.getHeShe()) + ' looks uncertain,</p>' +
				(perJohn.isMaleSex() ? '"You want me to strip there? I suppose...", he is clearly hesitant but you insist. ' :
											  '"For some reason that sounds...wrong...but also I do not see a problem, I suppose...", she is clearly troubled, more used to watching such performances as a man than giving them as a woman!. You reassure her it is fine and she will perform well. ') +
				'You immediately call Jade to arrange a dance for ' + nmJ + '.'
			);
		}
		if (perTess.whereNow() == 230 && perJohn.place === 230) {
			addSleepLink(md, "spend the night with " + nmJ + " and Tess", "",
				"<p style='position:absolute;top:0.6em;left:2%;width:96%;text-align:center;cursor:pointer;margin-top:-12px;font-size:x-large" + (perYou.isBornMale() ? "" : ";color:white;text-shadow:-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;") + "'><b>Going to Bed with " + nmJ + " and Tess</b></p>" +
				'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">Tess notices that night has fallen and suggests you spend the night, and sleep with her..and her husband. ' + nmJ + ' does not notice her hesitation and agrees. You all retire for the night, after some mutual pleasure in each others arms.',
				'bed' + (perYou.isBornMale() ? 'a' : 'b') + '.jpg', perYou.isBornMale()
			);
		} else {
			if (perTess.whereNow() == 230) {
				perTess.addSleepLink(md, "spend the night with Tess", "Going to Bed with Tess",
					'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">As you prepare to go to bed for the night, Tess lies down on the bed looking beautiful as always. She looks at you with desire and you can see you will not be sleeping for a while...',
					'tess20d.jpg', true
				);
			}
			if (perJohn.place == 230) {
				perJohn.addSleepLink(md, "spend the night with " + nmJ, "Going to Bed with " + nmJ,
					'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">As you prepare to go to bed for the night, ' + nmJ + ' lies down on the bed, ready for you' + (perJohn.isMaleSex() ? ', or at least he will be soon as you see his cock stir...' : ''),
					'johnbed.jpg', false, '', '', '', "background-color:#110705"
				);
			}
		}

	}
	if (!(perJohn.checkFlag(11) && perJohn.other == 5)) addLinkToPlace(md, 'exit the Adams home', 229);

	if (bTwoCols) // Tess Adams is HERE
	{
		AddRightColumnMed(md);
		if (perTess.other == 27) perTess.showPerson("tess14a.jpg", "95%", "right");
		else if (perTess.other == 28) perTess.showPerson("tess15.jpg", "95%", "right");
		else perTess.showPerson("tess_driving.jpg", "95%", "right");
	}

	WritePlaceFooter(md);
}