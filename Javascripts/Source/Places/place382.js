// Mother Superior's Room

function ShowPlace382(stype)
{
	var perMS = findPerson("Daria");
	var perLea = findPerson("Leanne");
	
	var nPossession = isPossess() && perLea.place != 382 && perMS.checkFlag(6) ? 2 : (isPossess() ? 1 : 0);
	
	var td = '';
	if (stype == "metleanne") td = 'td-left-med';
	else if (stype == "take") td = 'td-left-large';
	else if (stype == "msmast" || (nPossession == 2 && stype === '')) td = 'td-none';
	var md;

	// Events
	if (stype == "metleanne") {
		// Initial meeting with Leanne
		md = WritePlaceHeader(false, td, td == "td-none" ? "black" : "");
		perLea.showPerson("leanne6b.jpg");
		addPlaceTitle(md, "Leanne in Mother Superior\'s Bed");

		md.write(
			'<p>The woman\'s appearance changes and you see Leanne lying on the bed, or at least the thrall in her body. You can see no sign of the rosary she had a moment ago. She laughs and speaks to you,</p>' +
			'<p>"So, this thrall\s Mistress is not the only one who can take a body. Did you enjoy devouring her soul?"</p>' +
			'<p>You deny harming Mother Superior and tell the thrall you are just borrowing her body, her mind and soul are unconscious...and then you hear something, it is the confused voice of the Mother Superior wondering what Leanne is talking about. The voice fades away as if she falls asleep. ' +
			'You are unsure what this means, it seems that she is still partly conscious. The Mother Superior is of such a strong will, or some other magical or spiritual effect, or even the presence of the thrall must allow her some awareness. As you consider this the thrall continues speaking,</p>' +
			'<p>"Are you here then to save this thrall, it cannot leave here, the holyness is oppressive, and this woman has promised to save her and she dragged this body here." She laughs cruelly, "As if that is possible". You dimly hear the Mother Superior <i>"...so hard to get an exorcist..could be weeks..I will save you Leanne..."</i></p>' +
			'<p>You ask the thrall how she came to be here, did she try to seduce one of the Brides of Christ, a nun, and she smiles,</p>' +
			'<p>"Tried, but it was this woman and she knows this body and recognised the presence of this thrall and sealed it here"</p>' +
			'<p>You hear the voice of the Mother Superior <i>"...Leanne, I need to save her, I just wish she would keep her clothes on, she is so very beautiful.."</i>. You ask the thrall about the glamour she had when you first saw her,</p>' +
			'<p>"To make this body as desirable as possible to the woman you have taken, to tempt her lust", you dimly hear the Mother Superior again <i>"..so very.."</i></p>' +
			'<p>You look at the thrall and vow to find a way to help Leanne, but as you do you hear the thrall,</p>' +
			'<p>"This body is full of lust, take it now using that woman!" and you dimly hear <i>"no..I could not..."</i></p>'
		);
		
	} else if (stype == "take") {
		// Take the Thrall
		md = WritePlaceHeaderNIP(false, td, td == "td-none" ? "black" : "");
		perLea.showPerson("leanne6c.jpg");
		addPlaceTitle(md, "Thrall and Mother Superior");
		if (perLea.checkFlag(5)) md.write('<p>Once again you tell yourself that this is not your friend Leanne, it is her body, but this is a thrall of the demon Legion, not Leanne.');
		else md.write('<p>You tell yourself that this is not your friend Leanne, it is her body, but this is a thrall of the demon Legion, not Leanne. You keep telling yourself that as you approach her.');
		md.write(' Furthermore this is the Mother Superior not you who will be doing it, you wonder how the Mother Superior will react to this act of carnality, especially as she seems to not quite be aware that you are possessing her body, or more sharing her body.');
		if (perYou.isBornMale()) md.write(' You do feel a bit nervous, you are possessing a woman and are going to have lesbian sex with the thrall possessing your best friend. You hope the porn you have seen helps here, as will the thrall.');
		
		md.write(
			'</p><p>You are unsure how the robes of the nun\'s habit tied or fastened and as you start to fumble you hear the Mother Superior <i>"...I suppose I should rest.."</i> and you feel your/her hand more surely move to remove the robes. The thrall watches with considerable relish, and you see her fingers start to caress her pussy.</p>' +
			'<p>As you remove the last layers you realise the Mother Superior is wearing almost no underwear just a simple shift, and you also can feel she has a rather nice figure. You hear her think <i>"..got to keep fit..but wait Leanne is here..Daria what were you thinking, keep focus..."</i>. Despite that her words fade away, at least you know now her given name is Daria and she still seems unaware of your presence.</p>' +
			'<p>Maybe you should stop, but then again this may help to <b>weaken</b> the Mother Superiors resolve as she seems to think she is doing this herself!</p>'
		);
		
		startQuestions();
		addLinkToPlaceC(md, '"No", stop this', 382);
		addLinkToPlaceC(md, '"<i>We</i> will do this"', 382, 'type=take2');
		WritePlaceFooter(md, '', true, true);
		return;

	} else if (stype == "take2") {
		// Take the Thrall
		md = WritePlaceHeader(false, td, td == "td-none" ? "black" : "");
		perLea.setFlag(6);
		perMS.setFlag(1);
		perLea.showPerson("leanne6d.jpg");
		addPlaceTitle(md, "Take the Thrall with Mother Superior");
		
		if (perYou.isBornMale()) md.write('<p>You approach the thrall, still nervous as to how to do this, but you trust the thrall will lead the way and maybe Mother Superior too.</p>');
		md.write(
			'<p>You reach out and embrace the thrall, as you do she passionately kisses the Mother Superior...you..and you are aware of the hot lust in her lips and body.</p>' +
			'<p>You can hear the Mother Superior trying to deny this and you can sense she is fully feeling everything, but still seems unaware of your presence. You decide to try something, you break the kiss and tell the thrall,</p>' +
			'<p>"I want you, and I am so aroused", and the thrall replies seeming to understand what you are trying to do,</p>' +
			'<p>"Everyone feels desire, our bodies need sex and we should give in to desire", and with that she lies you down and buries her face in your groin. licking and kissing with great expertise. You hear the Mother Superior, and her words almost echo yours. <i>I had not thought Leanne was bi-sexual..</i> and her words tail away into incoherent sounds of pleasure.</p>' +
			'<p>The thrall teases you and Daria, the Mother Superior, bringing you near to ecstasy and then pulling back and kissing you for a time, then bringing you to the brink again. She repeat this until you both are begging her to let you cum, the Mother Superior stridently in your head, and you loudly.</p>' +
			'<p>With a wicked grin the thrall takes you to a powerful orgasm, and barely had you recovered and she repositions herself so her pussy is above your face for you to do the same to her, except you immediately realise she is more positioned so you can both pleasure each other.</p>' +
			'<p>Later as you are relaxed in the after-glow of your orgasms, and the thrall is lying content from hers, you realise the Mother Superior had stopped resisting, and denying thing and was actively enjoying the experience, and you dimly hear her words <i>..well, I do not believe I gave in to temptation so easily, and loved it so much..</i></p>' +
			'<p>You wonder if maybe you could do this again, and \'train\' her to be less inhibited and more receptive to you. Then again, the thrall is probably going to be an issue, wanting to corrupt the Mother Superior for her Mistress, not...well...for you. It would probably be best to first save Leanne!</p>'
		);
		
	} else if (stype == "msmast") {
			// Masturbate scene for Mother Suerior
			md = WritePlaceHeaderNIP(false, td, td == "td-none" ? "black" : "");
			addPlaceTitle(md, "Remembering Leanne", '', 0, false, 'white');
			perMS.showPersonRandomRorX('mothersuperior3', 2, "30%", "left");
			perMS.setFlag(2);
			perMS.moveThem(384);

			md.write(
				'<p>You do your best to remember when you had sex with the thrall while possessing Daria, about the pleasure and your and the Mother Superiors orgasms. As you do you can feel a building arousal in Daria/your body, your thoughts are having an effect! Daria again interrupts,</p>' +
				'<p><i>"I...I...should not dwell on this, it has been difficult to stop thinking about...I am feeling the sinful lust again.."</i></p>' +
				'<p>You try to continue thinking but now more about satisfying your current lust. About there is nothing sinful really, it is just how you act on lust that may be sinful. Bodies are created to feel this way, so why not....</p>' +
				'<p><i>"...I do not think that is right...but it is so hard to think clearly recently...I really want to..."</i></p>' +
				'<p>You push again, why not, we were created to feel this way, and it is a glorious feeling, and that is it. You feel Daria stop resisting and her hands move to her groin and she starts to urgently masturbate. In your determination to encourage her you had not noticed how very, very aroused she/you were becoming.</p>' +
				'<p>You can hear her incoherent thoughts, and then brokenly <i>"God...Leanne..."</i>, and you are shocked by her intense orgasm</p>' +
				'<p>Her fingers gently rub and caress her pussy and you hear her think "<i>maybe once more..</i>" and you insistently think "twice" and you hear her, <i>"well..let\'s be damned for more...twice"</i></p>' +
				'<p>She starts to more urgently rub, but as she does you can feel her thoughts fade....</p>'
			);
			startQuestions("Your vision fades");
			addOptionLink(md, "...and the spell ends", "Dispossession()");

			WritePlaceFooter(md);
			return;

	} else if (stype == "mswander") {
			// Masturbate scene for Mother Suerior
			md = WritePlaceHeaderNIP(false, td, td == "td-none" ? "black" : "");
			perMS.showPerson('mothersuperior5b.jpg');
			addPlaceTitle(md, "Mother Superior Taking a Stroll");
			perMS.setFlag(3);
			perMS.moveThem(384);

			md.write(
				'<p>You think that it is best to finish dressing back in your room, and that there is no-one else around. Daria seems shocked at this thought,</p>' +
				'<p><i>"..n..no..I couldn\'t just walk through the church naked!...It is so naughty...sinfull..."</i></p>' +
				'<p>You agree, it\'s so naughty, but it is not a sin is it? If no-one is around then is it just walking somewhere after all?</p>' +
				'<p>Daria steps out of the vestry into the church proper, and she starts to walk nervously down the central pathway, despite common assumptions this is not called the aisle!</p>' +
				'<p>Daria\'s nerves settle down as she walks towards the archway leading to the cloisters and her room, but she hesitates looking around the church, and you can feel she is enjoying this naughty experience.</p>' +
				'<p>Suddenly there is a noise, the main door of the church opens, and with a burst of speed Daria runs out of the church, along the cloister pathway and quickly into her room and slams the door shut behind her.</p>' +
				'<p><i>"Who was that...a parishoner...Pamela...a Sister...I am so embarrassed"</i></p>' +
				'<p>Despite her thoughts, you can feel her excitement and arousal. You try to encourage her further, but as you start the feelings fade...</p>'
			);
			
			startQuestions("Your vision fades");
			addOptionLink(md, "...and the spell ends", "Dispossession()");
			addLinkToPlace(md, "No!!! Concentrate on her arousal and Leanne", 382, 'type=msmast');
			WritePlaceFooter(md, '', true, true);
			return;

	} else {
		// General, no specific event
		
		// Popup events
		if (!isPossess() && !perMS.checkFlag(1)) {
			// Have never taken the thrall using Mother Superior
			md = WritePlaceHeaderNIP(false, td, td == "td-none" ? "black" : "");
			showPopupWindow("Mother Superior",
				perMS.addPersonString("mothersuperior1d.jpg", "40%", "right") +
				"Mother Superior hears your enter her room and immediately forces you back out.<br>" +
				'"How dare you!" she cries, her voice breaking from the strain of her illness. "Get out, you perverted creature!"',
				"dispPlace(318)"
			);
			WritePlaceFooter(md, '', true, true);
			return;
		}
		// Have you been here before?
		if (!isPlaceKnown("MotherSuperiorsRoom")) {
			// No, meet en-thralled Leanne
			md = WritePlaceHeaderNIP(false, td, td == "td-none" ? "black" : "");
			setPlaceKnown("MotherSuperiorsRoom");		// Visited her room
			showPopupWindow("Familiar Woman",
				perLea.addPersonString("leanne6a.jpg", "height:max%", "right") +
				"You become aware of standing in a room, dressed in heavy robes. You are in Mother Superior\'s body and her private room! " +
				"You did feel a great resistance as the spell completed and you became aware. Mother Superior has a very strong will and it seems unlikely you could possibly repeat this unless she were <b>weakened</b> in some way.</p>" +
				'<p>You hear a voice and see a familiar looking woman lying on her bed, naked except for a rosary, looking at you seductively, and she says</p>' +
				'<p>"It is you...no need for this glamour", and her appearance shimmers...',
				"dispPlace(382,'type=metleanne');"
			);
			perLea.place = 382;		// Move her here (most likely from the Graveyard)
			WritePlaceFooter(md, '', true, true);
			return;
		}
		
		if (perMS.checkFlag(1) && !isPossess()) {
			// Visit after the first possession, as yourself, but before the second
			// Leanne may still be here
			md = WritePlaceHeaderNIP(false, td, td == "td-none" ? "black" : "");
			perMS.showPerson('mothersuperior2.jpg');
			addPlaceTitle(md, "Mother Superior\' Penance");

			md.write('<p>Mother Superior is still in her room, her habit only partially replaced from your earlier possession of her. She seems lost deep in prayer.</p>');
			
		} else if (nPossession == 2) {
			// Second possession, Mother Superior on her own
			md = WritePlaceHeaderNIP(false, td, td == "td-none" ? "black" : "");
			addPlaceTitle(md, "Mother Superior Changing", '', 0, false, 'white');
			perMS.showPerson('mothersuperior5a.jpg', "30%", "right");

			md.write(
				'<p>For a long while you experience nothing, just blackness and silence. Gradually you start to see and you are in some sort of room in the church. To your distress you have no control, you try to turn, reach out a hand and nothing happens. You then hear Daria, the Mother Superior\s thoughts,</p>' +
				'<p><i>"..he always leaves the vestry in a mess. I will have to get Desiree to tidy up here. She has been a problem lately, claiming to have a revelation but being unwilling to talk about it, just waiting there in the courtyard..."</i></p>' +
				'<p>You are clearly in her body, but it seems the possession has barely worked, her iron will seems to still be there and almost prevented you possessing her. It seems <b>unlikely</b> you will be able to possess her again.</p>' +
				'<p>Your thoughts are interrupted by Daria,</p>' +
				'<p><i>"in her body...Leanne...I should not think about that...."</i></p>' +
				'<p>Did she hear you, but she seemed to think it was her own thoughts. Then you feel a chill in her, your, both of your body,</p>' +
				'<p><i>"Blessed draft...I should finish dressing...", and she looks at a mirror and you see she is only partly dressed in the light from a large stained-glass window.</i></p>' +
				'<p>You wonder if you can influence her thoughts more...</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'remember sex with the Thrall Leanne', 382, 'type=msmast');
			addLinkToPlace(md, 'dress back in my room', 382, 'type=mswander');
			addLinkToPlace(md, 'discipline Desiree', 332, 'type=discipline');
			WritePlaceFooter(md, '', true, true);
			return;
			
		} else {
			// During the first possession
			md = WritePlaceHeader(false, td, td == "td-none" ? "black" : "");
			addPlaceTitle(md, "Mother Superior\'s Room", "nunroom1.jpg");

			md.write('<p>A very simple room decorated in a way that would most generously be called "spartan".</p><p>For a moment you are amazed at how few trappings these Nuns live with.</p>');
			if (perMS.checkFlag(4)) md.write('<p>A small bowl of chicken soup sits on a table next to the bed, evidently her way of nursing herself back to health.</p>');
		}
		
		// Common text (while Leanne is here)
		if (perLea.isHere()) {
			md.write('<p>How can you help Leanne? You doubt you could just walk with her out of here, and even if you did, you have no hold over her. ');
			if (isDemonInTown()) md.write('After all the demon is still in Glenvale and would just take control over her again, so you would just be freeing her for the demon to use.');
			else if (perYou.checkFlag(21)) md.write('You could teleport with her out of here but where to and how to free Leanne of the spell. At least here she is safe and unable to harm others. You really need to seek other peoples <b>advice</b>.</p>');
		}
	}

	// Choices
	startQuestions();
	
	// Is the thrall here
	if (perLea.isHere() && stype != "take2") {
		perYou.startQuest(5);		// Fallback in case you did not meet her in the Graveyard
		if (isPossess()) addLinkToPlace(md, 'take the thrall', 382, 'type=take');
		if (perLea.checkFlag(6) && !isPlaceKnown("MotherSuperiorsSecretRoom") && !isSpellKnown("Clairvoyance")) addQuestionC(md, '"Do you know where the relic is"', "Leanne", -100);
		if (perLea.checkFlag(8)) {
			if (nMana > 0 && isPlaceAttuned(53) && perYou.checkFlag(21) && whereItem(35) == -53 && !isPossess()) addLinkToPlace(md, 'teleport with the thrall to the Hidden Room', 53, 'type=teleportthrall');
			else addTextForQuestions(md, 'You know the ritual to save Leanne but not everything is ready for it');
		}
	}

	if (isPlaceKnown("MotherSuperiorsSecretRoom")) addLinkToPlace(md, 'enter the secret room', 383);	//Know about the secret room
	addLinkToPlace(md, 'walk back to the cloisters', 406);
	
	if (perLea.isHere() && stype === "") {
		AddPeopleColumnLarge();
		perLea.showPerson("leanne6b.jpg");
	}

	WritePlaceFooter(md);
}
