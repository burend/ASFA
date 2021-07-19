// Ritual

function EndRitual()
{
	if (perDavy.other == 7) perDavy.other = 6;		// Allow questions to move Davy to hotel finally
	perKurndorf.setQuestRitual(200); //Ritual is over
	PlaceI(52, 161); // Place the crystal with Kurndorf's spirit in the cellar
	var perNS = findPerson("NurseSandra");
	if ((perYourBody.FindItem(4) > 0 && !checkPersonFlag("MrBeasley", 3)) || (perNS.other == 0 && !perNS.isCharmedBy())) {
		perYou.setInjury(5);
		if (perYourBody.FindItem(4) > 0) perYourBody.DropItem(4, 76);
		perNS.setFlag(1);
		showPopupWindowNow0();
	} else gotoPlace(161);
}

function ShowPlace343()
{
	var md = WritePlaceHeaderNI(false, "", "black");

	var mySex = perYou.getSex();

	if (perKurndorf.getQuestRitual() == 999) return dispPlace(996);  //Lost the game and can't "win" the ritual

	/*  PICTURE REFERENCES */
	if (perKurndorf.getQuestRitual() < 190) md.write('<img src="Images/People/Kurndorf/kurndorf.jpg" style="float:left;margin:0px 5px" alt="Kurndorf">');
	else md.write('<img src="Images/People/Kurndorf/kurndorf2.jpg" style="float:left;margin:0px 5px" alt="Kurndorf">');

	/* General Description */
	/* TITLE LINE */
	addPlaceTitle(md, "Ritual of Binding");

	/* Description */
	if (perKurndorf.getQuestRitual() === 0)
	{
		md.write(
			'<p>Kurndorf\'s Ghost makes an audible sigh in preparation for the ritual.  For a moment you\'re tempted to remind him that he doesn\'t really breathe anymore, but something tells you a quip of that sort would not be the most appropriate thing to say at that particular moment.</p>' +
			'<p>After gathering himself for a moment, Kurndorf turns his gaze to you.  "Now, are you sure you are ready to begin? Is everything in place?" he asks.  Is that genuine concern in his voice?  "Once we start the ritual it can not be stopped...  Magic does make certain demands, as I\'m sure you have realized by now."</p>'
		);
	}
	else if (perKurndorf.getQuestRitual() == 5)
	{
		md.write(
			'<p>"Very well then," he says, beginning to summoning his power.  A dark aura immediately forms around his hands as he chants a few words.  Within moments a swirl of water fills the chalice on the altar.</p>' +
			'<p>"Purest water," he tells you before you have the chance to ask.  "I am not entirely out of tricks yet, my ' + mySex + '.  Now," he says, motioning towards the hemlock, "Mash a few leaves of that herb on the altar and mix them into the cup with the dagger.  Careful now, don\'t use too much - you\'ll be drinking that later."</p>'
		);
	}
	else if (perKurndorf.getQuestRitual() == 10)
	{
		md.write('<p>Kurndorf takes a moment to gauge the progress of the ritual so far.  Evidently satisfied with the results he continues his instruction.  "Next, add a pinch of that salt on the altar to the chalice.  Sprinkle a bit over the crystal as well, then - repeat after me...</p>');
	}
	else if (perKurndorf.getQuestRitual() == 15)
	{
		md.write(
			'<p>You chant the words that he tells you and begin to feel the power within the room growing...  just a tingle at the back of your neck, and then more as shivers begin to run up and down your spine.</p>' +
			'<p>For a ghost, Kurndorf seems to be quite pleased with the results of your efforts so far.</p>' +
			'<p>"And next..." he says between chanting his own mantra in a language you do not understand.  "You must drink from the chalice.  Only a few sips my ' + mySex + ', must not over do it just yet. We wouldn\'t want any harm to come to that body of yours," he says absently.</p>'
		);
	}
	else if (perKurndorf.getQuestRitual() == 20)
	{
		md.write(
			'<p>Within moments of partaking of the tincture you can feel it begin to take effect, its poison speeding through your system as the room begins to darken and swirls of energy begin to show themselves as they whisk around the room as if moths drawn to a flame.</p>' +
			'<p>"Almost there, my ' + mySex + '," he says, excitement beginning to show through his attempt at stoic control...  Or perhaps it was always there and you just didn\'t notice it before.</p>' +
			'<p>"There," he says, pointing at the silvered knife.  "Pick that up and use it to prick your finger, then anoint the waters within the chalice with your blood.  Then you must also smear the crystal itself."</p>'
		);
	}
	else if (perKurndorf.getQuestRitual() == 25)
	{
		md.write(
			'<p>The power in the room is now unmistakable.  Your altered vision is near blinding, all of the colors within the room spinnig so fast it almost makes you dizzy.</p>' +
			'<p>Even the candles seem to be responding, their flame being whipped around by the moving energy as if a strong breeze were passing through the room.</p>' +
			'<p>Then the room almost <i>thickens</i>, as if all of the power had begun to press in on you - as if it were attempting to stop you from completing your task.</p>' +
			'<p>"Yes, Yes!" Kurndorf almost hisses in anticipation.  "Now - for the last step - the moment of truth."  His eyes look upon you as if you were nothing more than a fine meal for his ravenous hunger.  "You must use an item of the soul to be bound...  something from their person."</p>'
		);
		if (perYourBody.FindItem(56) > 0) {
			//Allready have the lock of hair
			md.write('<p>"The lock of hair, it is from you, yes?  Excellent!  ');
		} else {
			md.write('<p>"Quickly, use those scissors to take a lock of your hair!  ');
		}
		md.write('Drop it into the Chalice, my ' + mySex + '.  Do it <b>now</b>!!"</p>');
	}
	else if (perKurndorf.getQuestRitual() == 30)
	{
		md.write(
			'<p>Kurndorf looks down at you expectantly, his aura pulsing with power, desire, anticipation and.... hunger?</p>' +
			'<p>He has instructed you to drop an item of the person to be bound into the chalice.<br>Your gaze settles upon the altar as the final moment draws near.</p>'
		);

		if (perKurndorf.checkFlag(18)) {
			//Have Kurndorf's skull on the table
			md.write('<p><i>You notice that a small piece of Kurndorf\'s skull has chipped off and lies in stark contrast against the white linen cloth on the altar</i></p>');
		}

		if (perYourBody.FindItem(56) === 0) {
			md.write('<p><i>You need to use the scissors to take a clipping of your hair if you wish to use it.</i></p>');
		}

	}
	else if (perKurndorf.getQuestRitual() == 195)
	{
		md.write(
			'<p>You reach out to the altar and grab the small piece of Kurndorf\'s skull, quickly throwing it into the Chalice.  Bubbles and steam immediately begin to rise out of the cup as the color turns to a dark black.</p>' +
			'<p>The crystal begins to emit a slight hum that seems to quickly rise in intensity.</p>' +
			'<p>Kurndorf, moments before assured of his victory, now cries against his eminent defeat.  "Nooo!" he screams, "How could one such as you defeat me?!?"</p>' +
			'<p>The spirit of Carl Kurndorf stretches before your eyes, within moments drawn completely within its new crystal prison.  As you watch you hear the last paranoid accusations flee from the Warlocks mouth as he is pulled to his fate.</p>' +
			'<p>"That Witch! She has crossed me yet again hasn\'t she!  Or some other creature intent on my fate?  Surely the church did not warn you..."  his cries fade to nothing as the last of him is sucked into the crystal.</p>' +
			'<p>It would seem that the threat of Kurndorf has been thwarted once more, but for how long?  Even death did not defeat him before... will his new prison be any more permanent?</p>' +
			'<p><b>The room begins to shake, torn at its very foundations, and about to crumble down upon you!</b></p>'
		);

	}

	/* BEGIN - Dialogue Options */
	//**********************************************************************
	startQuestions();

	if (perKurndorf.getQuestRitual() === 0)
	{
		addQuestionC(md, '"Lets do this thing."', "Kurndorf", 14900);
		addLinkToPlace(md, 'Reconsider... and talk some more', 342);
	}
	if (perKurndorf.getQuestRitual() == 5)
	{
		if (perKurndorf.getQuestGhost() < 105) addQuestionC(md, '"Uhmm... and exactly what other tricks <i>do</i> you have up your sleeve?"', "Kurndorf", 143105);
		addLinkToPlace(md, 'Mash the hemlock and drop it into the chalice', 343, '', '', '', 'perKurndorf.setQuestRitual(10);');
	}

	if (perKurndorf.getQuestRitual() == 10)
	{
		if (perKurndorf.getQuestGhost() < 110) addQuestionC(md, '"This isn\'t going to be some lame mantra or something is it?"', "Kurndorf", 143110);
		addLinkToPlace(md, 'Add the salt and follow his instructions', 343, '', '', '', 'perKurndorf.setQuestRitual(15);');
	}

	if (perKurndorf.getQuestRitual() == 15)
	{
		if (perKurndorf.getQuestGhost() < 115) addQuestionC(md, '"Don\'t want anything to happen to my <i>body</i>? You mean <i>me</i>, right?"', "Kurndorf", 143115);
		addLinkToPlace(md, 'Drink from the chalice', 343, '', '', '', 'perKurndorf.setQuestRitual(20);');
	}

	if (perKurndorf.getQuestRitual() == 20)
	{
		if (perKurndorf.getQuestGhost() < 120) addQuestionC(md, '"But you just said you <i>didn\'t</i> want me to get hurt! Now you want me to cut myself?"', "Kurndorf", 143120);
		addLinkToPlace(md, 'Prick your finger and anoint the chalice and crystal', 343, '', '', '', 'perKurndorf.setQuestRitual(25);');

	}

	if (perKurndorf.getQuestRitual() == 25)
	{
		if (perKurndorf.getQuestGhost() < 125) addQuestionC(md, '"Impatient much?"', "Kurndorf", 143125);
		addLinkToPlace(md, 'Look at the altar for a moment and gather your power', 343, '', '', '', 'perKurndorf.setQuestRitual(30);');

	}

	if (perKurndorf.getQuestRitual() == 30)
	{
		if (perKurndorf.checkFlag(18)) {
			// Have Kurndorf's skull
			if (perYourBody.FindItem(56) > 0) startAlternatives(md);
			addLinkToPlace(md, 'Drop the chip of Kurndorf\'s skull into the chalice', 343, '', '', '', 'perKurndorf.setQuestRitual(195);');
		}
		if (perYourBody.FindItem(56) > 0) {
			// Has the Lock of Hair
			addLinkToPlace(md, 'Drop the lock of your hair into the chalice', 996);
			if (perKurndorf.checkFlag(18)) endAlternatives(md);
		}
	}

	addPopupWindow(md, "Caught!",
		"<img src='Images/fallingrocks.jpg' class='imgpopup' alt='Collapse!'>" +
		"You try to run but you are hit by a part of the crumbling room. You stagger and fall out of the room into the cellar.</p>" +
		"<p>You cry out in pain and fall to the ground, the last thing you see is the eeriely glowing crystal...</p>" +
		'<a style="color:white;" href="javascript:closePopupWindowNow0()">unconsciousness claims you</a>',
		"gotoPlace(213);", undefined, true, false, true
	);

	if (perKurndorf.getQuestRitual() == 195) addOptionLink(md, 'Leave everything and <b>RUN</b>!!', 'EndRitual()');

	WritePlaceFooter(md);
}