// Place: Hotel Pool talking to Lauren

function ShowPlace258(stype)
{
	var md = WritePlaceHeader(false, stype == "lauren3" ? 'td-left-large' : '');

	var perLauren = findPerson("Lauren");
	var perDonna = findPerson("Donna");

	if (stype == "lauren1") {

		perLauren.place = 0;		// Leave the hotel after this scene
		movePerson("Sarah", 1);
		movePerson("AdeleRoss", 16);	// Set Gates Estate as Blocked (to protect Sarah)
		setPersonFlag("AdeleRoss", 1);
		setPersonFlag("Mom", 8);
		perYou.startQuest(6);	// Start quest to visit Sarah

		perLauren.showPerson("lauren11b.jpg");
		addPlaceTitle(md, "Hotel Pool with Lauren");

		if (!isDay()) md.write('<p>The pool area is brightly lit by lighting scattered around, and ');
		else if (perDonna.place != 269) md.write('<p>The pool area ');
		else md.write('<p>');

		if (isDay() && perDonna.place == 269) md.write('Lauren gestures to follow her to a more discrete place away from anyone else. You find an isolated area partly shielded by some plants and Lauren kneels down in front of you.');
		else md.write('is fairly empty now but you both move to a more discrete place. You find an isolated area partly shielded by some plants and Lauren kneels down in front of you.');
		md.write(
			'<p> She is wearing a very revealing bikini, little more than fishnets, almost completely exposing her breasts and privates. Lauren sees you looking at her swimsuit and deeply blushes, but you also observe her nipples stiffen a little. She hesitantly speaks,</p>' +
			'<p>"My Mistr...My Lady told me to wear this, as an appropriate attire for her servant and as a gift to you. Please can we not dwell on it....", she hesitates before taking a deep breath and continuing,</p>' +
			'<p>"My Lady has asked me to warn you that it is very dangerous trying to summon the dead. Her family has extensive history dealing with the Veil and the creatures who try to cross into this world...very extensive...very..She says that without powerful wards it would be impossible to safely deal with the more powerful spirits like the ghost of a witch or warlock."</p>' +
			'<p>She pauses, and you think she is troubled by what she just talked about, maybe she has had personal experience with the dead in some way. She looks at you and moves her arms to modestly cover her breasts but the gesture just accentuates her breasts, drawing your attention to them.</p>' +
			'<p>"My Lady believes it is time for you to meet her, but it is a delicate thing to do this, you will not be able to openly visit in the daytime and <i>all</i> doors of the <b>mansion</b> are closed at night. My Lady tells me that umm...Serphoni...will be needed, but it will only work during the midnight hour, when the shroud protecting the mansion is thinnest. You must also use the side entrance from the Sacred Clearing'
		);
		if (!isPlaceKnown("SacredClearing")) {
			md.write(
				'"</p><p>You interrupt and ask where the Sacred Clearing is, you have heard of it but do not know exactly where it is. Lauren explains,</p>' +
				'<p>"It is an ancient ritual area to the west of the mansion" and she gives some brief directions before continuing, "I am surprised, My Lady seemed to assume you knew of that place but I digress... '
			);
			setPlaceKnown("SacredClearing");
		}

		md.write(
			'My Lady asks that you visit so you may trade things you have learned and so she can offer a ward against the dead."</p>' +
			'<p>You heard her say <b>mansion</b> and you ask if she means the Gate\'s Mansion, does her Lady live there? You were not aware anyone else lived there other than ' + perGates.getPersonName() + '. Maybe your mother has heard something?</p>' +
			'<p>She just nods her head, "Yes, and My Lady asks one thing of you, a gift in return for what she has given you...and..and..me. You must bring her a bottle of the finest wine. Please bring it with you when you visit....", she trails off, ' +
			'and does not say anything as she looks at you. She is hesitating, unable or unwilling to say anything more.'
		);

		startQuestions();
		addLinkToPlaceC(md, '"Is there anything more?"', 258, 'type=lauren2');

	} else if (stype == "lauren2") {

		perLauren.showPerson("lauren11c.jpg");
		addPlaceTitle(md, "Hotel Pool with Lauren");

		md.write(
			'<p>She blushes and adjusts her bikini top or at least the collection of strings that she is wearing and exposes her breasts completely. She stretches and says nervously,</p>' +
			'<p>"My..my..Lady has ordered...asked...me to tell you that I am to offer you any service you desire now I have delivered my message, <i>any desire</i>.."</p>' +
			'<p>She is clearly aroused but also very nervous, expecting and possibly wanting you to take her up on her offer of <i>any desire</i>, but also reluctant and uncertain.</p>'
		);
		startQuestions("Will you accept her offer?");
		addLinkToPlace(md, "certainly!", 258, 'type=lauren3');
		addLinkToPlace(md, "refuse and go to the Hotel Bar", 124, '', 'An odd mixture of expressions pass over Lauren&rsquo;s face as you refuse and start to leave, relief and disappointment. She softly says &quot;Thanks...I think&quot;');


	} else if (stype == "lauren3") {

		perLauren.setFlag(11);
		perYou.addCorruption(1);
		perLauren.showPerson(perYou.isMaleSex() ? "lauren11db.jpg" : "lauren11dg.jpg");
		addPlaceTitle(md, "Lauren\'s Service");

		md.write(
			'<p>It would seem rude to refuse your ally and Lauren seems aroused and wants this too, she is just nervous. You tell her that you desire her, that this has nothing to do with her Lady, it is just your desire for her. You do not think she really believes you, but accepts your words.</p>' +
			'<p>She removes more of her \'swimsuit\' and makes a little bit of a show for you. She is clearly nervous still and is a little awkward as she displays herself.</p>' +
			'<p>You take her, she is passionate if awkward and uncertain at times. She is no virgin but a little inexperienced and despite her nerves orgasms quite strongly.</p>' +
			'<p>After, as she redresses in more normal clothes, you remember that at times her skin felt odd, and you swear you saw a faint glow when she orgasmed. As you are looking at her she blushes again, curtseys,</p>' +
			'<p>"' + perYou.getLord() + ' I must return to My Lady now", and she leaves the pool area.</p>'
		);

		startQuestions();
		addLinkToPlace(md, "go to the Hotel Bar", 124);
	}

	WritePlaceFooter(md);
}