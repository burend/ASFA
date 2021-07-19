// Place: Your Bedroom

function ShowPlace46()
{
	// State changes
	var perMadison = findPerson("Madison");
	var perDebra = findPerson("DebraKelly");
	if (perDebra.checkFlag(3) && !perDebra.checkFlag(4)) {
		// Told Debra Kelly in Park to look for stone
		perDebra.setFlag(4); // Debra kelly has now found a stone
	}
	// Have you been shot?
	if (perYou.isShot() && !perYou.checkFlag(3)) {
		// Yep, put items here that were lost, EXCEPT the Book
		var itemlist = Object.getOwnPropertyNames(oBaseItems);
		for (var idx = 0; idx < itemlist.length; idx++) {
			var itm = parseInt(itemlist[idx], 10);
			if (itm == 4) continue;
			if (whereItem(itm) == 999) moveItem(itm); // Put it here
		}
		perYou.setFlag(3);
	}

	// Who is here?
	var perTanika = findPerson("MrsTanika");
	var clvT = perTanika.getCharmedLevel();
	var nmT = perTanika.getPersonName();
	var nmTs = perTanika.getPersonNameShort();
	var perTess = findPerson("Tess");
	var perAnita = findPerson("Anita");
	var perElian = findPerson("Elian");
	var clvE = perElian.getCharmedLevel();
	var totpeople = perTess.isHere() ? 1 : 0;
	if (perTanika.isHere()) totpeople++;
	if (perAnita.isHere()) totpeople++;
	if (perElian.isHere() && clvE != 4) totpeople++;
	//var clvA = perAnita.getCharmedLevel();
	var nmA = perAnita.getPersonName();
	var posA = perAnita.getCharmedLevel() == 3 ? "slut" : "subordinate";

	// Start of page

	// Images
	var td = totpeople > 1 ? "td-left-med" : "td-left";
	//if ((perAnita.isHere() && totpeople < 3 && !(perTess.isHere() && perTess.other != 27)) || (totpeople < 3 && perTess.isHere() && perTanika.isHere() && perTess.other != 27)) td = "td-left";

	var md = WritePlaceHeader(false, td);

	// Find some money if you are blocked from getting to the Mansion
	if (nMoney < 20 && !perYou.isQuestComplete(4)) {
		var csh = 20 - nMoney + 5;
		WriteComments('You sit down on your bed for a moment and you see a little bit of money that had fallen down the side of the bed. You pick up the ' + sCurrency + csh + ' and pocket it');
		AddCash(csh);
	}

	// Images

	if (totpeople > 1) {
		// 1,3: tess, anita, tanika
		// 2: anita, tanika, tess
		var id = (!isDay() ? 3 : perTess.isHere() && perTess.other == 27 ? 1 : 2);
		md.write('<img style="margin: 5px 5px 5px 5px;width:99%" src="Images/bedroom-bg-wide' + id + '.jpg">');
		if (id == 2 && perTess.isHere()) md.write('<img style="margin: 5px 5px 5px 5px;width:99%;position:absolute;float:left;top:0;left:0" src="Images/' + perTess.getImg("bedroom-tess" + id) + '.png">');
		if (perTanika.isHere()) md.write('<img style="margin: 5px 5px 5px 5px;width:99%;position:absolute;float:left;top:0;left:0" src="Images/' + perTanika.getImg("bedroom-tanika" + id) + '.png">');
		if (perAnita.isHere()) md.write('<img style="margin: 5px 5px 5px 5px;width:99%;position:absolute;float:left;top:0;left:0" src="Images/' + perAnita.getImg("bedroom-anita" + id) + '.png">');		
		if (id != 2 && perTess.isHere()) md.write('<img style="margin: 5px 5px 5px 5px;width:99%;position:absolute;float:left;top:0;left:0" src="Images/' + perTess.getImg("bedroom-tess" + id) + '.png">');
		if (perElian.isHere() && clvE != 4) md.write('<img style="margin: 5px 5px 5px 5px;width:99%;position:absolute;float:left;top:0;left:0" src="Images/' + perElian.getImg("bedroom-elian" + id) + '.png">');
	} else if (perTess.isHere()) {
		// Tess Adams is here
		if (!isDay()) perTess.showPerson("tess20a.jpg");
		else if (perTess.other == 27) perTess.showPerson("tess14b.jpg");
		else perTess.showPerson("tess7.jpg");
		perTess.setFlag(5);		// You have met her here
	} else if (perTanika.isHere()) {
		// Tanika is here
		perTanika.showPerson(clvT < 3 ? "bedroom-lover.jpg" : "bedroom-slave.jpg");
	} else if (perAnita.isHere()) {
		// Anita is here
		perAnita.showPerson("anita11.jpg");
	} else md.write('<img style="margin: 5px 36px 5px 5px;width:95%;border-style:solid;border-size:2" src="Images/bedroom7.jpg" alt="Your Bedroom">');

	// Things
	//Chest
	var cnt = 0;
	for (var i = 0 ; i < T.length ; i++) {
		if (T[i].place == 41) cnt++;
	}
	md.write('<table style="width:95%"><tr><td style="width:25%"><a href="javascript:gotoPlace(41)"><img src="Images/Items/chest.png" width=95%></a></td><td>At the end of your bed is the old storage chest you use to store assorted items and it ');
	if (cnt === 0) md.write('just contains assorted books and papers and your porn collection.');
	else md.write('contains ' + cnt + ' item' + (cnt > 1 ? 's' : '') + '.');
	md.write('You can <a href="javascript:gotoPlace(41)">open it</a> to check ' + (cnt > 0 ? 'them.' : 'the porn.') + '</td></tr></table>');
	// Stereo
	if (!perMadison.checkFlag(4) && (perMadison.checkFlag(2) || perMadison.checkFlag(3) || perMadison.checkFlag(5))) {
		if (perMadison.checkFlag(2)) md.write('<p>You see what must be the prize Tracy mentioned, from that MC 550 radio quiz. You see a stereo sitting on a shelf of your bookcase, but you notice that one of the speakers is damaged.');
		else if (perMadison.checkFlag(3)) md.write('<p>You see a stereo sitting on a shelf of your bookcase, and there is a note congratulating you on winning the Radio MC 550 quiz. Unfortunately you notice that one of the speakers is damaged.');
		else md.write('<p>You see your prize stereo sitting on a shelf of your bookcase and you are reminded of the damage the delivery-girl Madison did.');
		md.write(' You feel a little annoyed with the delivery-girl and must go and complain sometime <b>in person</b> at the radio station to her.</p>');
		perMadison.setFlag(4);
		perYou.setFlag(2);
		if (whereItem(38) == 289) moveItem(38);   //  If you didn't pick up the magnet, move it here
	} else if (perYou.checkFlag(2)) md.write('<p>You see the damaged stereo sitting on a shelf of your bookcase.</p>');

	// Title
	addPlaceTitle(md, "Your Bedroom");

	// Description
	if (totpeople === 0) md.write('<p>At last you can get away from everyone for enough time to think things through.</p>');
	else if (totpeople == 2 && perTess.isHere() && perTanika.isHere()) {
		//if Tess and Mrs Tanika’s there, general text:
		md.write(
			"<p>Your bedroom is filled with sweet aroma and perfume as you enter. Tess and Mrs Tanika are lying on your bed, having a talk in their underwear. Both of them spin up as they recognize that their " + perYou.getMaster() + " has arrived home. Like a joint operation they work together on luring you to bed and to join them in their welcoming arms. You give in to their charms and lie between them.</p>"
		);
	} else if (totpeople == 2 && perTess.isHere() && perAnita.isHere()) {
		//If Tess and Anita are there, general text:
		md.write(
			"<p>Your " + posA + " Anita opens your bedroom door for you. After stepping in, she closes it and joins Tess in properly welcoming home their " + perYou.getMaster() + " on the bed. Anita’s posture is like soldier’s, rigid with a wooden face, she is ready to receive her orders from her commander. Tess’s behaviour is more friendly, gentle. She is opening her arms, trying to charm you into the bed to join them.</p>"
		);
	} else if (totpeople == 2 && perTanika.isHere() && perAnita.isHere()) {
		//If Mrs Tanika and Anita are there, general text:
		md.write(
			"<p>Anita is standing guard at your bedroom door. Your " + posA + " Anita opens it for you and waits for you to enter. She joins your other live-in servant, Mrs Tanika in welcoming home their " + perYou.getMaster() + ". Anita’s attitude and personality must be contagious because they both salute you by waving their hands to their heads, like real soldiers do. This must be something Anita taught to Mrs Tanika. They sit down onto the bed, noiselessly awaiting their next instructions from their commander.</p>"
		);
	} else if (totpeople == 3) {
		// If Mrs Tanika, Anita and Tess are there, general text:
		md.write(
			"<p>Your " + posA + " Anita closes the door behind you. Your other two servants are on the bed, happily waiting. They all stand up to welcome you home, an event they’ve been looking for all day. Anita’s silent, coldish attitude never lets you forget that she is a guard after all. Mrs Tanika’s role shifted from your math teacher to your house maid, she is responsible for keeping your room and house clean. Tess, your elegant lover is the cheeriest of them all, bringing joy and kindness to the stiff atmosphere. All three of them try their very best on seducing you to bed to join them.</p>"
		);
	} else {
		// You + one other person
		md.write('<p>At last you can get away from everyone for enough time to think things through. Well, almost everyone. ');
		if (perTess.isHere()) {
			// Tess Adams is here
			md.write(
				'Mrs. Tess Adams is here just as you commanded. Her warm body, not to mention the look on her face, invites you to bed.</p>' +
				'<p>"Oh ' + perYou.getMaster() + '," she purrs as you fondle her breasts. "I love you so much. I want to call my husband to tell him that our marriage is off."</p>'
			);
		} else if (perTanika.isHere()) {
			// Mrs. Tanika is here
			if (clvT == 2) md.write(nmT + ', once your teacher now your ever loving girlfriend naps on your bed nakedly as you enter your room. Now you know why she was so strict to her pupils. She was afraid that she would take a liking to one of them and vice versa and could not focus on her duties. So she shove off any of the students approach and she deliberately tried to distance herself from you. She told you that she always liked your personality and had an affection towards you, but she stopped herself from doing anything stupid. Now you can be together without anything to worry about!.</p>');
			else {
				md.write(
					nmT + ', once your math teacher, she is now your slave, utterly submissive to you, thinking only how to please you. You ordered her to come to your house to live with you. She’s more of a live-in maid now than a teacher she once was,  always tidying, cleaning after you. She’s the one who you give your chores to do the every day, involving taking out the garbage, dusting and overall making your room fresh and clean. You introduced her to the family as a one night girlfriend, but after a few days they asked if she is more than that and you told them that. Tracy and Mom don’t seem to mind a helpful hand around the house.</p>' +
					'<p>Mrs. Tanika is standing next to your bed when you arrive in your room. She must have heard you came and readied herself for you. You motion her  to sit on your bed with a lazy handwave.</p>'
				);
			}
		} else md.write(nmA + ' is here just as you commanded.</p>');
	}

	// ********************* Questions ************************************************************
	startQuestions();

	// Tess Adams questions
	if (perTess.isHere())
	{
		if (isDay()) addLinkToPlaceC(md, '"I like your outfit, Tess."', Place, "type=tessprivate");
		else addLinkToPlaceC(md, '"I like your nightie, Tess."', Place, "type=tessprivate");
	}
	// Mrs.Tanika specific content
	if (perTanika.isHere())
	{
		if (clvT == 2) addLinkToPlaceC(md, "talk to Susan Tanika", Place, 'type=tanikaxxx');
		else if (clvT == 3) addLinkToPlace(md, "play with your toy, Mrs. Tanika", Place, 'type=tanikaxxx');
		else addLinkToPlaceC(md, "talk to your slave Mrs. Tanika", Place, 'type=tanikaxxx');
	}
	// Anita specific content
	if (perAnita.isHere()) addLinkToPlaceC(md, "talk to your " + posA + " Anita", Place, 'type=anitaprivate');
	// Elian specific content
	if (perElian.isHere()) addLinkToPlaceC(md, "talk to Elian", Place, 'type=elianprivate');
	else if (clvE == 4 && perElian.place < 900) addLinkToPlaceC(md, "call for Elian to join you", Place, '', 'A moment later Elian is in the room, waiting quietly for your request', '', "movePerson('Elian',46.1)");
	
	// Combined scenes (based on Mrs Tanika as her model varies here)
	if (perTess.isHere() && perTanika.isHere() && perAnita.isHere()) {
		addLinkToPlaceC(md, "ask you harem...companions to do something as a group", Place, 'type=haremsex1');
	}

	// Waiting
	if (!perYou.checkFlag(37) && !perYou.checkFlag(15)) {
		addPopupLink(md, "kill some time", "Stupid Computers",
			"<img src='UI/phonegame.jpg' style='width:40%;float:right;margin-left:5px' alt='Games'>" +
			'You look around for something to do, but you have read all the books here, and your desktop computer is, well basic, and not working right. Few games work on it, and those are very old.<br><br>' +
			'You might as well play the basic games on your phone or find something else to do!',
			false, "perYou.setFlag(37);dispPlace();"
		);
	}
	if (isDay()) addOptionLink(md, "wait for darkness", "WaitforForDayNight()");
	//addLinkToPlace(md, "wait for darkness", '', '', 'You kill time until the sun sets', '', "WaitforForDayNight()");

	// Sleeping
	if (totpeople === 0) {
		perYou.addSleepLink(md, "go to bed for the night", "Goodnight", '<p style="position:absolute;left:50%;top:10%;cursor:pointer;font-size:1.1em;width:50%;color:white">You retire to bed for the night.</p>', 
			'bed.jpg',
			false, 46
		);
	}

	// Leaving?
	addLinkToPlace(md, "go to the kitchen", 45);
	addLinkToPlace(md, "leave your house", 44);
	
	if (clvE == 4 && perElian.isHere()) {
		AddPeopleColumn(md);
		perElian.showPerson("bedroom-waiting.jpg");
	}

	WritePlaceFooter(md);
}