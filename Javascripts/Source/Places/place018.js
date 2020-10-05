// Place: Mansion Entryhall and Upstairs

function ShowPlace18(stype)
{
	var md = WritePlaceHeader();
	var perSarah = findPerson("Sarah");
	var perLauren = findPerson("Lauren");
	var myLord = perLauren.getYourNameFor();
			
	var marea = getQueryParam("area");

	if (getQueryParam("charm") == "yes") CharmLauren(md);
	else if (marea == "upstairs") {
		// Upstairs hallway
		addPlaceTitle(md, "Upstairs Hallway", "hallway1.jpg");
		md.write('<p>A hallway mostly leading to bedrooms, but the layout is quite old-fashioned with some common rooms like a shared bathroom.</p>');

		if (perSarah.place == 192 && perSarah.other == 101) md.write('<p>You notice a door is ajar and you hear the noise of running water.</p>');
		if (perSarah.place == 192 && (perSarah.other == 114 || perSarah.other == 117 || perSarah.other == 120)) md.write('<p>You do not see Lauren in the hallway. she must already be in Sarah\'s room.</p>');
		// Questions
		startQuestions();
		visitSarah(md);
		if ((perLauren.flags[0] > 1 && isMurderPath()) || (!isMurderPath() && perGates.checkFlag(3))) addLinkToPlace(md, "go to the guest room", 290);
		if (perSarah.place == 192 && perSarah.other == 101) {
			addLinkToPlaceO(md, "check the room", 296, 'stage=sarahlauren1');
			addLinkToPlace(md, "go downstairs", 18, 'area=entry', 'As you leave you hear a voice &quot;It appears this will be a boring visit&quot;', '', 'LeaveNoBath()');
			if (isDay() || !perLauren.checkFlag(8)) addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s House", 16, '', 'As you leave you hear a voice &quot;It appears this will be a boring visit&quot;', '', 'LeaveNoBath()');
		} else {
			addLinkToPlace(md, "go downstairs", 18, 'area=entry');
			if (isDay() || !perLauren.checkFlag(8)) addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s House", 16);
		}

	} else if (marea == "landing") {
		// Meet Lauren 2
		var idx = 5;
		if (perLauren.checkFlag(5)) idx++;
		if (perLauren.checkFlag(6)) idx++;

		perLauren.showPersonDN("lauren1c.jpg");
		addPlaceTitle(md, "Landing on the Stairs");
		md.write(
			'<p>You follow the maid Lauren upstairs, and you meet her readjusting her clothing after stumbling. She nervously asks you,</p>' +
			'<p>"' + myLord + ' I am in a hurry, as I said, I am summoned to Lady Sarah".</p>' +
			'<p>She blushes again, and looks at you as she takes a step up the next set of stairs,<br>');

		// Questions
		startQuestions();
		switch(idx) {
			case 5: addQuestionR(md, "tell me about yourself", "<p>She hesitates, &quot;I am sure " + myLord + " I do not have the time, and surely you are more interested in Lady Sarah?&quot;. You follow her up the stairs, telling her that you also find her fascinating", "Lauren", "setPersonFlag(\\'Lauren\\'," + idx + ");setQueryParams(\\'area=upstairs\\');"); break;
			case 6: addQuestionR(md, "why do you do these unusual services for Sarah", "<p>She blushes, &quot;I have no choice " + myLord + ", Lady Sarah has convinced me it is in my best interest to do what she desires&quot; You try to ask her more but she insists she <i>must</i> visit Sarah, and you follow her upstairs", "Lauren", "setPersonFlag(\\'Lauren\\'," + idx + ");setQueryParams(\\'area=upstairs\\')"); break;
			case 7: addQuestionR(md, "tell her she is pretty", "<p>She hesitates, &quot;My Lady Sarah would not like to hear you say that " + myLord + ", but then again she has never been a person of <i>singular</i> tastes&quot; She smiles and continues walking upstairs", "Lauren", "setPersonFlag(\\'Lauren\\'," + idx + ");setQueryParams(\\'area=upstairs\\')"); break;
		}
		addLinkToPlaceO(md, "let her go upstairs", 18, 'area=upstairs');
		addLinkToPlace(md, "go downstairs", 18, 'area=entry', '', '', "setPersonOther('Sarah', getPersonOther('Sarah')+0.1);");
		addLinkToPlaceC(md, "visit " + perGates.getPersonName(), 17, '', '', '', "setPersonOther('Sarah', getPersonOther('Sarah')+0.1);");

	} else if (marea == "locked") {
		// Front door locked
		addPlaceTitle(md, "Locked Front Door", "door4.jpg");
		perLauren.setFlag(8);
		md.write('<p>You attempt to open the front door to leave and you find it is securely locked and dead-bolted. As you consider what to do, a person interrupts you, ');
		if (perSarah.other == 1000) md.write(' a maid dressed rather scantily,');
		else md.write(' it is Lauren, Sarah\'s maid, dressed a bit differently,');
		md.write(
			'</p><p>"' + myLord + ' I am sorry to tell you the mansion is strictly locked at night, and the doors will not be unlocked until sunrise.".</p>' +
			'<p>She notices your glances at her skimpy dress, and she blushes,' +
			'<p>"Sorry, My Lady insists I wear a ummm \'night uniform\'"</p>' +
			'<p>With some embarrassment she leaves, heading upstairs.</p>'
		);

		// Questions
		startQuestions();
		addLinkToPlaceC(md, "visit " + perGates.getPersonName(), 17);
		addLinkToPlace(md, "go upstairs", 18, 'area=upstairs');
		AddRightColumnMed();
		perLauren.showPersonDN("lauren1b.jpg");
		WritePlaceFooter(md);
		return;

	} else if (perSarah.place == 192 && perSarah.other == 101) {
		// Meet Lauren
		perLauren.showPersonDN("lauren1b.jpg");
		addPlaceTitle(md, "Stopped in the Entry Hall");
		md.write(
			'"Please, ' + myLord + '! I am Lauren, my Mistress has sent me to inform you of her arrival, but she is tired and need a special bath treatment and wishes to be alone! I am here to make sure you wait in your proper place for her! She told me to tell you that you are not to <i>go upstairs</i> to the third door on the right", she says in a slight english accent.</p>' +
			'You approach the huge and long stairs that would lead you to the second and third floor of the mansion. A girl walks down from the stairs in a stunning maid uniform. The uniform is the typical one which was worn by servants a hundred years ago with the only exception being this woman’s skirt which is far more revealing and shorter than usual. You can even see that she’s not wearing any panties! Well, she must be working here so you wait at the lowest steps of the stairs.</p>' +
			'Clearly, she is the lady’s maid if the Gates family has more servants (which you are certain they do!) and that means she is responsible for her Lady’s well being. A role which she fills with relentless loyalty and determination.</p>'
		);
		//md.write('<p>Just before you leave ' + perGates.getPersonNameShort() + ' you notice Sarah has left a few minutes before you.</p><p>As you enter the entry way you are met by a young woman dressed as a maid, looking a little nervous and clearly waiting for you</p>');
		//md.write('<p>"My Lady has asked me to tell you that she is very tired from her journey here and is retiring upstairs to take a bath. She told me to make it clear that you are not to <i>go upstairs</i> to the third door on the right."</p><p>She shakes her head and continues softly "Please don\'t"</p><p>With that she leaves and walks up the stair case, you cannot avoid noticing how short her skirt is and her complete lack of panties.</p>');
		// Questions
		startQuestions();
		addLinkToPlace(md, "follow her upstairs", 18, 'area=upstairs');
		if (isDay() || !perLauren.checkFlag(8)) addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s House", 16, '', 'As you leave you hear the maid softly speak &quot;Thank you, but My Lady will be disappointed.&quot;', '', 'LeaveNoBath()');

	} else if (perSarah.place == 192 && perSarah.other == 109) {
		// Meet Lauren 2
		perLauren.showPersonDN("lauren1b.jpg");
		perSarah.other = 110;
		addPlaceTitle(md, "Met in the Entry Hall");
		md.write(
			'<p>As you enter the entry way you are met by Sarah\'s maid Lauren again, she looks quite embarrassed.</p>' +
			'<p>"My Lady has asked me to tell you that her private room is upstairs, to the left of the <i>bathroom</i>".</p>' +
			'<p>She blushes as she mentions the bathroom, and she continues,<br>' +
			'<p>"My Lady extends an invitation to visit when you are free."</p>' +
			'<p>With her message delivered she walks upstairs, once again you notice her lack of panties.</p>');
		// Questions
		startQuestions();
		addLinkToPlace(md, "go upstairs", 18, 'area=upstairs');
		addLinkToPlaceC(md, "visit " + perGates.getPersonName(), 17);
		if (isDay() || !perLauren.checkFlag(8)) addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s House", 16);
		
	} else if (perSarah.place == 192 && (perSarah.other == 114 || perSarah.other == 117 || perSarah.other == 120)) {
		// Meet Lauren later
		perLauren.showPersonDN("lauren1b.jpg");
		addPlaceTitle(md, "Met in the Entry Hall");
		md.write(
			'<p>As you enter the entry way see Sarah\'s maid Lauren she is just about to walk upstairs, she looks <b>very</b> embarrassed. You call out to her to say hello, and she almost jumps in surprise. She looks at you blushing,</p>' +
			'<p>"Sorry, My Lady has called me to her private room to...assist her with something".</p>' +
			'<p>She continues walking upstairs, and she hesitates,<br>' +
			'<p>"Please do not visit for a while."</p>' +
			'<p>She almost runs upstairs, once again you notice her lack of panties as she stumbles on the first landing of the stairs...</p>');
		// Questions
		startQuestions();
		addLinkToPlace(md, "follow her upstairs", 18, 'area=landing');
		addLinkToPlaceC(md, "visit " + perGates.getPersonName(), 17);
		if (isDay() || !perLauren.checkFlag(8)) addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s House", 16);

	} else if (perSarah.place == 192 && perSarah.other == 50 && isConspiracyPath()) {
		// (Conspiracy Path) Met by Lauren on the way to meet Sarah
		perLauren.showPersonDN("lauren1c.jpg");
		addPlaceTitle(md, "Lauren Meets you in the Entry Hall");
		md.write(
			'<p>You step through the wall but it feels very strange, different than the previous times you have used the Pass spell. It was difficult to move and it felt almost like you had to push through <i>something</i>.</p>' +
			'<p>You find you are standing in the entry way for the Mansion, a grand room to show-off the mansion. As you look around cautiously you hear some footsteps approaching, startled you look for the source, but you see it is the maid Lauren approaching. She is now dressed in a stylised and skimpy maid uniform. She looks at you and gestures towards the grand staircase,</p>'
		);
		if (perYou.FindItem(40) > 0) {
			perYou.completeQuest(6);
			md.write(
				'<p>"Good evening ' + myLord + '! Do you have the gift for My Lady?", you show her the bottle of wine. Lauren nods, "My Mis..Lady asks we be quiet and join her in her room upstairs", she says in a slight english accent.</p>' +
				'<p>She leads the way upstairs, but after climbing only a few steps she stops and bends over to pick something up off the stairs. As she does you are in a perfect position to see up her very short skirt, and to see she is <i>not</i> wearing any panties. She stands back up and glances back at you, furiously blushing, and then continues upstairs without saying a word.</p>'
			);
			// Questions
			startQuestions();
			addLinkToPlace(md, "follow her upstairs", 192);
			
		} else {
			md.write(
				'<p>"Good evening ' + myLord + '! Do you have the gift for My Lady?". Oops! you have forgotten the wine. Lauren shakes her head, "Please return another time when you have the gift"</p>' +
				'<p>She shows you to the front door and opens it, after disabling a complex security system. She politely waits for you to leave, but also making it clear that you have to leave.</p>'
			);
			// Questions
			startQuestions();
			addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s House", 16);
		}
		
	} else if (marea == "appear") {
		// (Conspiracy Path) Appeared via pass spell from outside, second or later times
		perLauren.showPersonDN("lauren1c.jpg");
		addPlaceTitle(md, "Lauren Meets you in the Entry Hall");
		md.write(
			'<p>You step through the wall but it feels very strange, different than the previous times you have used the Pass spell. It was difficult to move and it felt almost like you had to push through <i>something</i>.</p>' +
			'<p>You find you are standing in the entry way for the Mansion, a grand room to show-off the mansion. As you look around cautiously you hear some footsteps approaching, startled you look for the source, but you see it is the maid Lauren approaching. She is now dressed in a stylised and skimpy maid uniform. She looks at you and gestures towards the grand staircase,</p>' +
			'<p>"Good evening ' + myLord + '! Please follow me", she says in a slight english accent.</p>' +
			'<p>She leads the way upstairs, but this time she does not bend over.</p>'
		);
		if (perLilith.isCharmedBy("Sarah") && !this.checkFlag(12)) {
			md.write(
				'<p>At the top of the stairs Lauren hesitates and you hear her mutter "blood bitch", you are quite sure who she means and you ask her if everything is alright,</p>' +
				'<p>"No ' + myLord + ' the foul monster is determined to be the only person in my Lady\'s life, not..not that it is my place to complain...but death is not how I wish to leave this time of servitude", she shakes her head, "Please, My Lady is waiting for you"</p>'
			);
		}
		
		// Questions
		startQuestions();
		addLinkToPlace(md, "follow her upstairs", 192);

	} else if (marea === "" || marea === "entry") {
		// Entry hall
		if (perSarah.place == 192 && marea === "") {
			// Counter for events, ideally once per visit to mansion
			if (perSarah.other > 102 && perSarah.other < 115) perSarah.other = Math.floor(perSarah.other + 1);
			else if (perSarah.other > 115 && perSarah.other < 122) perSarah.other = Math.floor(perSarah.other + 1);
		}
		addPlaceTitle(md, "Entry Hall", "mansionentry.jpg");
		md.write('<p>The entry way for the Mansion, a grand room to show-off the mansion. From here you can go upstairs or to ' + perGates.getPersonNameShort() + '\'s study.</p>');

		// Questions
		startQuestions();
		if (!isMurderPath() && !isConspiracyPath()) addLinkToPlaceC(md, "visit " + perGates.getPersonName(), 17);
		addLinkToPlace(md, "go upstairs", 18, 'area=upstairs', '', '', '', 'moveblock');
		if (isDay() || !perLauren.checkFlag(8)) addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s House", 16);
	}

	WritePlaceFooter(md);
}

