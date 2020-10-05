// Event: Sarah/Lauren Bath

function LeaveNoBath(plc, cmt)
{
	setPersonOther("Sarah", 1000);
	setPersonFlag("Lauren", 2);
}

function ShowPlace296()
{
	var stage = getQueryParam("stage");
	var md = WritePlaceHeader(false, stage == "sarahlauren1" || stage == "sarahlauren5" ? "td-left-large" : "");

	var perS = findPerson("Sarah");

	var bMan = perYou.isBornMale();

	perS.showPerson(stage + ".jpg", stage == "sarahlauren1" || stage == "sarahlauren5" ? "" : "height:max");
	addPlaceTitle(md, "Sarah Bathing");

	perS.other += 1;

	if (stage == "sarahlauren1") {
		md.write(
			'<p>You approach the door and you can see something is holding the door in place. As you decide if you should open the door and openly enter the room, you hear voices inside, and your eyes are drawn to what to can see through the doorway,</p>' +
			'<p>"I think ' + perYou.getHeShe() + ' saw my.."<br/>' +
			'"<i>Of course, now lather my back and..</i>"<br/>' +
			'"Yes, My Lady..oh..um..I could not close the door it is blocked."<br/>' +
			'In a slightly louder voice "<i>Well no one is looking at us <b>only</b> looking</i>"<br/>' +
			'"Yes, My Lady, after this do you think I could wear pa..."<br/>' +
			'"<i>No!</i>"</p>' +
			'<p>You think this means that Sarah does not want you to enter the bathroom</p>'
		);
		stage = "sarahlauren2";
	}	else if (stage == "sarahlauren2") {
		md.write(
			'<p>You continue to watch as best you can, Sarah never looks at you, but you notice the maid glance in your direction, or is it just the open door. She then starts to apply soap to Sarah\'s back while Sarah presses herself against the shower\'s glass wall.</p>' +
			'<p>"<i>That\'s right, make sure to lather my bum as well Lauren.</i>"<br/>' +
			'"Yes, My Lady, but do I really have to.."<br/>' +
			'In a stern tone<br/>"<i>Yes you do and you well know why!</i>"<br/>' +
			'"Yes, My Lady"<br/>' +
			'"<i>Do you think it is too <b>' + (bMan ? "hard" : "wet") + '</b> now?</i>"<br/>' +
			'<p>Sarah then moans softly, and you know what she means by '  + (bMan ? "hard" : "wet") + '!</p>'
		);
		stage = "sarahlauren3";
	} else if (stage == "sarahlauren3") {
		md.write(
			'<p>As you think about either leaving, entering the room or masturbating, Sarah turns around and kisses her maid Lauren. Lauren resists for a moment before returning the kiss. Their breasts rub together, nipples rubbing against each other. While still kissing Sarah take some soap and start applying it to Lauren\'s stomach and works lower and lower.</p>' +
			'<p>"<i>Now I think it is time for something better.</i>"<br/>' +
			'"Yes, My Lady"<br/>' +
			'"<i>Remember what I have told you to call me at these times</i>"<br/>' +
			'"Yes, M..mistress"<br/>'
		);
		stage = "sarahlauren4";
	} else if (stage == "sarahlauren4") {
		md.write(
			'<p>Lauren kneels down and applies soap to Sarah\'s stomach and then to her groin. She then uses the shower head and her hands to wash Sarah carefully and completely. You cannot see clearly but you think she also uses her mouth and tongue for a little while. Sarah moans and sighs as Lauren cleans her, until she huskily says,</p>' +
			'<p>"<i>Enough for <b>now</b> I will now clean you</i>"<br/>' +
			'"My...Mistress there is no need"<br/>' +
			'"<i>This is not a request!</i>"<br/>' +
			'"Yes, M..mistress"</p>' +
			'As Lauren says this she looks directly at you and immediately glances away</p>'
		);
		stage = "sarahlauren5";
	} else if (stage == "sarahlauren5") {
		md.write(
			'<p>Sarah makes Lauren lie down and uses a combination of soap, fingers and the shower to arouse Lauren. She kisses her mouth, breasts and starts to strongly manipulate, well masturbate Lauren.</p>' +
			'<p>"Ah..Mistress please stop, I do not want to..in front..."<br/>' +
			'"<i>You will</i>"<br/>' +
			'"Ahhh"</p>' +
			'<p>Lauren orgasms under Sarah\'s strict but caring touch and Sarah tenderly kisses her. Then Sarah says,</p>' +
			'"<i>Well Lauren, isn\'t that a good showing of what a lover could expect. I am sure you can work out how to close the door now. I am sure there is no-one there to stop you.</i>"</p>' +
			'<p>"Yes Mistress"</p>' +
			'<p>Lauren walks over and closes the door. As she does she looks directly at you, looking very, very embarrassed. As you start to leave you hear through the door, spoken louder than normal</p>' +
			'<p>"<i>Lauren you can finish cleaning me <b>now</b>, I really want to be finished, maybe a couple of times.</i>"</p>'
		);
		stage = "end";
	} else if (stage == "sarahlauren6") {
		md.write(
			'<p>You open the door and walk in. You see Sarah and her maid in the shower. Sarah is looking at you disappointed and the maid looks embarrassed. Sarah tells you,</p>' +
			'<p>"Impatient aren\'t we. No more playtime for you."</p>' +
			'<p>The maid awkwardly walks over and escorts you out of the bathroom and closes the door.</p>'
		);
		stage = "end";
	}

	//Choices
	startQuestions();

	if (stage !== "end") {
		addLinkToPlace(md, 'enter the bathroom', 296, 'stage=sarahlauren6');
		addLinkToPlace(md, 'continue watching', 296, 'stage=' + stage);
		addLinkToPlace(md, 'go downstairs', 18, '', 'As you leave you hear a voice &quot;It appears this will be a boring visit&quot;', '', 'LeaveNoBath()');
	} else addLinkToPlace(md, 'go downstairs', 18);

	WritePlaceFooter(md);
}