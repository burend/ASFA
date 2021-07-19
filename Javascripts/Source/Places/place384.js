// Mother Superior's Room (post possessions)

function ShowPlace384(stype)
{
	var perMS = findPerson("Daria");
	perMS.setFlag(7);
	var img;
	var clv = perMS.getCharmedLevel();
	var perSister = findPerson("Desiree");
	var bDesireeHere = perSister.isHere() && !perSister.checkFlag(1);
	var be = perMS.checkFlag(11) ? "-be" : "";
	var futa = perMS.getPersonGender() == "futa" ? "f" : "g";
	var fb = futa + be;

	var md = WritePlaceHeader();

	if (bDesireeHere) {
		// Mother Superior and Sister Desiree
		if (clv > 0) {
			perMS.showPerson('mothersuperior7' + fb + '.jpg');
			addPlaceTitle(md, "Mother Superior and Sister Desiree");
			md.write(
				'<p>Daria and Sister Desiree are waiting for you.</p>'
			);

			startQuestions();
			if (clv > 0 && perMS.checkFlag(12) && !perMS.checkFlag(14) && perMS.other < oChurch.cult.length) {
				if (nMana >= 10) addLinkToPlace(md, 'Mother Superior has an offering for the \'Cult of Flesh\'', Place, "type=newcultmember");
				else addLinkToPlace(md, 'Mother Superior has an offering for the \'Cult of Flesh\'', Place, '', 'Unfortunately you do not have enough mana at the moment to charm a new member of the cult');
			}			
			if (perYou.isMaleSex()) addLinkToPlace(md, 'fuck Daria', 384, 'type=fuck');
			addLinkToPlace(md, perYou.isMaleSex() ? 'get a blowjob from Daria' : 'Desiree will lick you', 384, 'type=bj');
			if (perYou.isMaleSex()) addLinkToPlace(md, 'fuck Desiree', 384, 'type=fuckdesiree');
			addLinkToPlace(md, perYou.isMaleSex() ? 'get a blowjob from Desiree' : 'Desiree will lick you', 384, 'type=bjdesiree');

			addLinkToPlace(md, 'observe them worship each other', 384, 'type=lesbianboth');
			if (perYou.isMaleSex()) addLinkToPlace(md, 'anoint them', 384, 'type=fuckboth');
			addLinkToPlace(md, 'a double blessing', 384, 'type=bjboth');
			addLinkToPlace(md, 'watch Mother Superior apply discipline', 384, 'type=watchdiscipline');
			
			addSleepLink(md, "go to bed for the night with Daria", "Cloistered with Daria",
				'<p style="position:absolute;left:2%;top:10%;cursor:pointer;font-size:1.1em;width:90%">You notice night has fallen, and wonder what it would be like to spend the night in a Nun\'s cell, well room as this is the Mother Superior after all.<br><br>You join Daria in her narrow and not particularly comfortable bed but she does her best to make you comfortable as she worships your body.',
				perMS.getImg('mothersuperior-bed.jpg')
			);

		} else {

			perMS.showPerson('mothersuperior4c.jpg');
			addPlaceTitle(md, "Mother Superior and Sister Desiree");

			md.write(
				'<p>Daria, the Mother Superior is sitting and showing quite a lot of leg for some reason, was she getting dressed? She looks at you coldly,</p>' +
				'"What are you doing here, I am in the middle of chastising one of my Nuns. Get out!", and she actually blushes as she glances to one side.</p>' +
				'<p>You see Sister Desiree, naked and her ass red from caning. She is lightly bound, more a token to show her submission to the Mother Superior. Despite the welts on her ass she is smiling, she seems to be enjoying her punishment. When she sees you her smile broadens.</p>' +
				'<p>Well, you did not come here just to watch, now did you?</p>'
			);
			startQuestions();
			if (clv > 0 && perMS.checkFlag(12) && !perMS.checkFlag(14) && perMS.other < oChurch.cult.length) {
				if (nMana >= 10) addLinkToPlace(md, 'Mother Superior has an offering for the \'Cult of Flesh\'', Place, "type=newcultmember");
				else addLinkToPlace(md, 'Mother Superior has an offering for the \'Cult of Flesh\'', Place, '', 'Unfortunately you do not have enough mana at the moment to charm a new member of the cult');
			}
		}

	} else {
		// Only Mother Superior
		if (clv > 0) {
			// Charmed
			perMS.showPerson('mothersuperior7' + fb + '.jpg');
			addPlaceTitle(md, "Mother Superior in her Room");

			md.write(
				'<p>Daria, the Mother Superior is waiting for you.</p>'
			);

			startQuestions();
			if (clv > 0 && perMS.checkFlag(12) && !perMS.checkFlag(14) && perMS.other < oChurch.cult.length) {
				if (nMana >= 10) addLinkToPlace(md, 'Mother Superior has an offering for the \'Cult of Flesh\'', Place, "type=newcultmember");
				else addLinkToPlace(md, 'Mother Superior has an offering for the \'Cult of Flesh\'', Place, '', 'Unfortunately you do not have enough mana at the moment to charm a new member of the cult');
			}			
			if (perYou.isMaleSex()) addLinkToPlace(md, 'fuck her', 384, 'type=fuck');
			addLinkToPlace(md, perYou.isMaleSex() ? 'get a blowjob' : 'Daria will lick you', 384, 'type=bj');
			
			addLinkToPlace(md, 'talk to Daria about Sister Desiree\'s obedience', Place, 'type=laterdiscipline');
			
			addSleepLink(md, "go to bed for the night with Daria", "Cloistered with Daria",
				'<p style="position:absolute;left:2%;top:10%;cursor:pointer;font-size:1.1em;width:90%">You notice night has fallen, and wonder what it would be like to spend the night in a Nun\'s cell, well room as this is the Mother Superior after all.<br><br>You join Daria in her narrow and not particularly comfortable bed but she does her best to make you comfortable as she worships your body.',
				perMS.getImg('mothersuperior-bed.jpg')
			);

		} else {
			// Not charmed
			if (perMS.checkFlag(3)) perMS.showPerson('mothersuperior4a.jpg');
			else perMS.showPerson('mothersuperior4c.jpg');
			addPlaceTitle(md, "Mother Superior in her Room");

			if (perMS.checkFlag(3)) md.write('<p>As you walk into the room you see Daria, the Mother Superior is partially undressed. She looks at you embarrassed,</p>');
			else md.write('<p>Daria, the Mother Superior is sitting and showing quite a lot of leg for some reason, was she getting dressed? She looks at you coldly,</p>');
			md.write(
				'"What are you doing here in my private room. Get out now!"</p>' +
				'<p>Well, you did not come here just to leave, now did you?</p>'
			);
		}

	}

	// Common questions
	if (clv === 0 && perMS.checkFlag(8) && perYou.checkFlag(25)) addLinkToPlace(md, 'hypnotise the Mother Superior', 384, 'trance=yes');

	if (bDesireeHere && stype === "") {
		
		perSister.addDancingLink(md, 'talk to Desiree about dancing in the club',
			'You ask Sister Desiree about the Avernus club and about dancing there for you, maybe not openly asa Nun but then again people would assume it was just a costume!</p>' +
			'<p>&quot;Of course ' + perSister.getYourNameFor() + ' I will do anything you ask!&quot; and with that you call Jade to arrange a dance for Desiree, not mentioning her "job".'
		);		
		addSleepLink(md, "take Desiree to her cell for the night", "Cloistered with Sister Desiree",
			'<p style="position:absolute;left:2%;top:10%;cursor:pointer;font-size:1.1em;width:90%">You take Desiree back her her cell and join her for the night. She worships you and your body until you both fall into an exhausted sleep.<br><br>In the morning you see her lying next to you almost like an angel!.',
			perSister.getImg('sister-bed.jpg'), true
		);
	}
	
	if (isPlaceKnown("MotherSuperiorsSecretRoom")) addLinkToPlace(md, 'enter the secret room', 383, '', '', '', '', "moveblock");	//Know about the secret room
	addLinkToPlace(md, 'walk back to the cloisters', 406);

	if (bDesireeHere && stype === "") {
		AddPeopleColumnLarge();
		perSister.showPerson("sister12b.jpg");
	}

	WritePlaceFooter(md);
}
