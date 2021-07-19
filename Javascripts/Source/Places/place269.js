// Place: Hotel Pool

function ShowPlace269(stype)
{
	var md = WritePlaceHeader();
	
	var perLauren = findPerson("Lauren");
	var perDonna = findPerson("Donna");
	var clvD = perDonna.getCharmedLevel();
	var perLogan = findPerson("MissLogan");
	var clvL = perLogan.getCharmedLevel();
	var perDidi = findPerson("Didi");
	var clvDD = perDidi.getCharmedLevel();
	var plcD = perDonna.whereNow();
	var plcL = perLogan.whereNow();
	var plcDD = perDidi.whereNow();

	if (plcL == 269) perLogan.showPerson(clvL > 1 ? "poolc.jpg" : "poolu.jpg");
	else if (plcDD == 269) perDidi.showPerson(clvDD > 0 ? "poolc.jpg" : "poolu.jpg");
	else if (isDay() && plcD == 269) perDonna.showPerson(clvD > 0 ? "donna3.jpg" : "donna1.jpg");
	else if (perLauren.place == 269) perLauren.showPerson("lauren11b.jpg");
	else addPlaceImage(md, "pool1.jpg", "", "", "Pool");

	addPlaceTitle(md, "Hotel Pool");

	// General visit
	md.write('<p>Much to the envy of the rest of the town the outdoor pool is heated for the privileged guests of the hotel. The water is crystal clear and the odor of chlorine fills the air. Part of the pool is roofed over and there is an extensive lighting system so it can be brightly lit at night.</p>');

	if (isDay()) {
		if (plcL == 269) {
			if (perLogan.checkFlag(2)) md.write('<p>Miss Logan is relaxing at the pool, happily supervising her non-existant club.</p>');
			else {
				perLogan.setFlag(2);
				md.write(
					'<p>You see your teacher Miss Logan near the pool dressed in an orange polka-dot bikini and some white shorts. She notices you and looks surprised,</p>' +
					'<p>"Are you here for the swim club? Nuts...I thought no-one...I mean welcome but we have no other members so far."<p>' +
					'<p>Alright...so Miss Logan is running a club here but she expected no students to turn up on a Sunday, so she was trying to just have some time off at a pool while fulfilling some of her duties as a teacher.</p>' +
					'<p>You let her off and explain you are not here for the club, and Miss Logan looks relieved. You exchange a few words with her, but you keep getting distracted, her usual clothes at school do not emphasise her breasts quite like her bikini top does here.</p>'
				);
			}
		}
		if (perLauren.place == 269) md.write('<p>Lauren is patiently waiting for you besides the pool, wearing a very skimpy bikini.</p>');
		if (plcD == 269 && clvD === 0) {
			if (!perDonna.checkFlag(2)) {
				perDonna.setFlag(2);
				showPopupWindow("Redhead Swimmer",
					perDonna.addPersonString("donna0.jpg", "height:max%", "right") +
					"A redhead girl crawls out of the swimming pool just at the time when arrive there. She barely makes a glance towards you and goes back to her deck chair. She grabs the book \"Pride and Prejudice\" which lies on the floor and starts to read it. Ugh! You hope she is not an uptight, arrogant noble girl.<br><br>" +
					"It’s obvious you didn’t attract her attention, but this must be the girl Bambi mentioned to you. She’s all alone...with you. She’s an easy prey!"
				);
			}
			md.write('<p>A girl is climbing out of the pool. She sees you, then turns away, ignoring your presence.</p>');
		} else if (plcD == 269 && clvD > 0) {
			md.write(
				'<p>Your redhead, pale skinned friend, Donna is here. She is sitting by the pool and reading a book. She takes off her sunglasses and waves to you, shouting.</p>' +
				'<p>"Hey ' + perYou.getPersonName() + '! Came to check on your me, huh? Come on, buddy, sit down here. I want to know everything!” The purple light in her eyes dances in the sunlight.</p>'
			);
		}
	} else {
		if (perLauren.place == 269) md.write('<p>Lauren is patiently waiting for you besides the pool, wearning a very skimpy bikini.</p>');
		if (plcD == 269) md.write('<p>The pool is ' + (perLauren.place == 269 ? 'otherwise ' : '') + 'empty at this time of night, Donna is not here.</p>');
		else if (perLauren.place != 269) md.write('<p>The pool is empty at this time of night.</p>');
	}

	startQuestions();

	if (isDay() && plcD == 269) {
		if (!perDonna.checkFlag(1)) addQuestionR(md, 'introduce yourself to the girl', 'She ignores you.', 'Girl at the Pool', "setPersonFlag(\\'Donna\\',1);");
		else if (clvD > 0) addLinkToPlace(md, 'spend time with Donna', Place, 'type=enjoy');
	}
	
	// common questions
	addLinkToPlace(md, "go to the Hotel Bar", 124);

	if (isDay() && plcD == 269 && perLauren.place == 269) {
		AddPeopleColumnLarge(md);
		perLauren.showPerson("lauren11b.jpg");
	}
	if ((plcL == 269 || plcDD == 269) && isDay() && plcD == 269) {
		AddPeopleColumnLarge(md);
		if (clvD > 0) perDonna.showPerson("donna3.jpg");
		else perDonna.showPerson("donna1.jpg");
	}

	WritePlaceFooter(md);
}