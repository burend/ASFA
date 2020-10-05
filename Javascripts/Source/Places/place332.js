// Place: With Sister Desiree

function Exit332()
{
	var perSister = findPerson("Desiree");
	if (perSister.other < 5) perSister.other = 5; //Now introduced
}

function ShowPlace332(stype)
{
	var md = WritePlaceHeader(false, stype == "discipline" ? "td-none" : "");
	
	var perSister = findPerson("Desiree");
	var perMS = findPerson("Daria");

	if (perSister.other == 10) perSister.other = 9;  //Reset it so you can still ask for forgiveness

	if (perSister.place !== 332) return dispPlace(319);	//Desiree is NOT here

	// Is there STUFF here from Mother Superior?
	var bThereIsStuffHere = perSister.NoItems > 0;

	/******************************************
	Sister Desiree
	*****************************************

	PICTURE REFERENCES */

	if (isPossess()) perSister.showPerson("sister2.jpg");		// While possessing Mother Superior the first time
	else if (perSister.isCharmedBy()) perSister.showPerson("sister9.jpg");
	else perSister.showPerson("sister1.jpg");

	/*  General Description */

	/* TITLE LINE */
	if (perSister.isCharmedBy()) //CHARMED
	{
		addPlaceTitle(md, "Desiree - Disciple of Desire");
		if (isPossess()) {
			//Possession Description
			md.write('<p>You can hear your disciple Desiree quickly putting her habit back on as you approach.  "Yes Mother Superior?" she asks, unable to completely mask the sound of the pleasure still coursing through her body.</p>');
		} else {   	// Normal CHARMED description
			if (isInvisible()) 	md.write('<p>As you approach you can see Desiree playing with herself and moaning in pleasure.  You smile with satisfaction at what her pleasure must mean.</p>');
			else if (perSister.getQuestRelic() == 20) {
				//Back from "Looking for the Relic" but didn't find it
				md.write('<p>Desiree sees you approach, the look on her face one of pure anguish.  You have a sinking suspicion that she could not find the relic.</p>');
			} else if (perSister.getQuestRelic() == 35 || perSister.getQuestRelic() == 36) {
				//Back from getting Mother superior's Rosary
				md.write('<p>As you approach you can see Desiree playing with herself and moaning in pleasure.  You smile with satisfaction at what her pleasure must mean.</p>');
			} else {
				md.write('<p>Your disciple\'s robes part the moment she sees that her Angel has returned.  Her crucifix is glistening wetly. "Hello, ' + perYou.getMaster() + '," she croons.  "What do you desire of me?"</p>');
			}
			md.write('<p> You\'re not sure why but you can\'t help but pause for a moment, almost taken aback by the strength of her faith in you.  Of course, you know its all just the spell, but she seems to have taken it to such a level that it\'s almost...  palpable.  Impressive.  Even for you.</p>');
		}

		if (!isPossess() && bThereIsStuffHere) {
			//Possession Spell NOT Cast and STUFF IS HERE
			md.write('<p>You notice a few things hidden under a bush.  "Oh yes, my Angel, Mother Superior quite unexpectedly entrusted a few things to my care.  Of course you may take them if you wish, they are rightfully yours after all."</p>');
		}
	}
	else
	{
		addPlaceTitle(md, "The Good Sister");


		if (isInvisible()) md.write('<p>In this corner of the garden, near the hedge maze, a lovely nun stands in prayer.</p>');
		else if (perSister.other < 5) // haven't introduced yourself yet
		{
			md.write(
				'<p>In this corner of the garden, near the hedge maze, a lovely nun stands in prayer.  She stops when she sees you, evidently surprised to see anyone other than her sisters and the Mother Superior.</p>' +
				'"Hello," she says uncertainly.  "Are you lost?  This area is typically off-limits to outsiders'
			);
			if (perYou.isBornMale()) md.write(', particularly men');
			md.write(
				'."</p>' +
				'<p>"My name is ' + perYou.getPersonName() + '," you say.  "What\'s yours?"</p>' +
				'<p>"I am Sister Desiree," she says, then frowns.  "But I do not see why-"</p>' +
				'<p>"The Mother Superior sent me back here to speak with you," you interrupt, lying smoothly.</p>' +
				'<p>"Oh," she says, visibly relaxing.  "Then how can I be of service?"</p>'
			);
		}
		else
		{
			md.write(
				'<p>In this corner of the garden, near the hedge maze, the lovely Sister Desiree stands in prayer.  She stops when she sees you, evidently surprised to see anyone other than her sisters and the Mother Superior.</p>' +
				'<p>"Good morrow, ' + perYou.getPersonName() + '," the beautiful Sister greets you pleasantly, if a little formally.</p>'
			);
		}
	}

	//**********************************************************************
	startQuestions();

	if (perSister.isCharmedBy() && !isPossess()) //Only have the CHARMED options when NOT POSSESSING Mother Superior
	{
		addLinkToPlaceC(md, '"Recite your scripture once more, my Disciple"', 332, 'type=recite');

		// Demon Relic Questions
		if (perSister.getQuestRelic() >= 5)
		{
			if (perSister.getQuestRelic() < 10) addQuestionC(md, '"Tell me where the relic is, Desiree."', "Desiree", 18309);
			else if (perSister.getQuestRelic() == 20) {
				// Back from Looking for the Relic
				addQuestionC(md, '"Did you fail me, my Disciple?"', "Desiree", 18320);
			} else if (perSister.getQuestRelic() == 35 && perSister.getQuestRelic() == 36) {
				//She has found the Relic
				addQuestionC(md, '"I believe you have something for me."', "Desiree", 18335);
			}
			if (bThereIsStuffHere) {
				addQuestionC(md, 'take the items Mother Superior left', "Desiree", 137);
			}
		}
		
		perSister.addDancingLink(md, 'talk to Desiree about dancing in the club',
			'You ask Sister Desiree about the Avernus club and about dancing there for you, maybe not openly asa Nun but then again people would assume it was just a costume!</p>' +
			'<p>&quot;Of course ' + perSister.getYourNameFor() + ' I will do anything you ask!&quot; and with that you call Jade to arrange a dance for Desiree, not mentioning her "job".'
		);
		perSister.addSleepLink(md, "take Desiree to her cell for the night", "Cloistered with Sister Desiree",
			'<p style="position:absolute;left:2%;top:10%;cursor:pointer;font-size:1.1em;width:90%">You take Desiree back her her cell and join her for the night. She worships you and your body until you both fall into an exhausted sleep.<br><br>In the morning you see her lying next to you almost like an angel!.',
			'sister-bed.jpg', true
		);
	//  **** Send her to Preach her scriptures to the world (and enlist more slaves)

	}
	else if (!isPossess()) //No POSSESSION
	{
		addLinkToPlace(md, 'request absolution for your sins', 332, 'type=absolution', '', '', 'Exit332()');
		if (bThereIsStuffHere && !perSister.checkFlag(7)) {
			addQuestionC(md, '"Did Mother Superior Give you anything?"', "Desiree", 136);
		}
	} else if (isPossess("Daria")) {
		//POSSESSED MOTHER SUPERIOR DIALOGUE
		if (perMS.NoItems > 0) {
			//Mother Superior is carrying stuff
			addQuestionCO(md, 'Give Desiree what you are carrying.', "Desiree", 1368);
		}
	}

	addLinkToPlace(md, 'leave her be', 319, '', '', '', 'Exit332()');

	WritePlaceFooter(md, '', !bThereIsStuffHere);
}