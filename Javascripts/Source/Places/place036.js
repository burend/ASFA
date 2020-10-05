// Kate in the park

function ShowPlace36(stype)
{
	var md;

	var perKate = findPerson("Kate");
	perKate.setFlag(41);

	if (stype === "") {
		// Standard meeting, she is charmed by Davy to lure you to her home
		if (perDavy.other == 7) perDavy.other = 6;
		md = WritePlaceHeader();
		perKate.showPerson("kate4a.jpg");

		addPlaceTitle(md, "Kate Granger");

		if (perKate.place == 47) md.write('<p>Kate is walking through the park in a heavy trenchcoat.');
		else md.write('<p>Kate is walking along the edge of the pond in a heavy trenchcoat.');
		md.write(
			' She looks anxious and a little scared.</p>' +
			'<p>"Hello ' + perYou.getPersonName() + '," she says nervously. "Thank god I ran into you. You weren\'t at your house and nobody knew where you\'d gone. I\'m so frightened ' + perYou.getPersonName() + '."</p>' +
			'<p>"People are acting strangely; something strange is happening in town. I don\'t know what it is but Mr. Beasley said something about magic. I think that we should call the police, don\'t you?"</p>' +
			'<p>What do you want to do about the nervous Kate?</p>');

		startQuestions();

		if (perKate.other == 10) addQuestionCO(md, 'ask Kate if she knows anything about Davy', "Kate", 5410);
		else if (perKate.other == 11) addQuestionCO(md, 'tell her to go home to hide from danger', "Kate", 5411);
		addLinkToPlace(md, "return to the park and forget it", 47);


	} else if (stype == "freed") {
		if (perDavy.other == 7) perDavy.other = 6;
		md = WritePlaceHeader();
		perKate.showPerson("kate4b.jpg");
		addPlaceTitle(md, "Kate Freed from Davy\'s Control!");

		AddMana(5);
		//perKate.other = 12; //Advance her plot to "go home"
		perKate.place = 1000; //Put her back in the "out and about" and ready to head home for next encounter
		var bFreedBefore = getQueryParam("before") === "true";
		FreeKate();
		if (getQueryParam("by") === "Tina") md.write('<p>Tina concentrates and she absorbs the mana powering the <i>charm</i> over Kate and transfers it to you.</p>');
		else md.write('<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over Kate.</p>');
		md.write('<p>"Oh my god!" Kate cries as you free her from Davy\'s control.  "The things he made me do!  I can\'t believe this, its not possible!" She says, and starts to run away.</p>');

		startQuestions();
		if (bFreedBefore) {
			addLinkToPlaceC(md, "&quot;Wait!! I can protect you from Davy!&quot;", 36, "type=waitprotect");
			addLinkToPlaceC(md, "&quot;Wait!! I love you!&quot;", 36, "type=waitlove");
		}
		addLinkToPlace(md, "try to follow Kate", 47, '', '', '', "charmPerson('Kate', 4, 'Davy')");


	} else if (stype == "waitprotect") {
		// "Wait!!! - I can protect you"
		md = WritePlaceHeader();
		perKate.showPerson("kate4c.jpg");
		addPlaceTitle(md, "Kate Hesitates");
		perKate.setFlag(13);

		md.write(
			'<p>You call out to Kate, "Wait, don\'t go I love you and want to help you!"</p>' +
			'<p>She hesitates and looks at you with a smile,  "I..don\'t know how to answer that, I am so angry at that <b>bastard</b> I just want to pound his face ');

		if (isKateTrusting()) {
			md.write(
				'but I do like you too, and maybe I was starting to fall... It is just Davy has messed with me and my emotions I do not know what to do.</p>');

			startQuestions();

			if (perYourBody.FindItem(43) !== 0) {
				// You have the silver necklace
				addLinkToPlaceC(md, "&quot;I can give you this necklace&quot;", 36, "type=waitprotectnecklace");
			}
			addLinkToPlaceC(md, "&quot;I can protect you by casting Charm on you&quot;", 36, "type=waitprotectcharm");

		} else {
			perKate.setFlag(12);
			md.write(
				'but I do not trust you. You seem to have some of the same abilities as Davy does and I do not know what you can or have done with them. Maybe I was starting to fall for you, but this has messed us around and I doubt I can ever trust someone with those powers ever again.</p>' +
				'<p>You try to reassure her of your feelings and that you will never used your magic on her but she is too angry and confused. She looks at you and resumes walking out, intent on her revenge against Davy.</p>'
			);
			startQuestions();
		}

		addLinkToPlace(md, "try to follow Kate", 47, '', '', '', "charmPerson('Kate', 4, 'Davy')");


	} else if (stype == "waitprotectcharm") {
		// "Wait!!! - I can charm you"
		md = WritePlaceHeader();
		perKate.showPerson("kate4e.jpg");
		addPlaceTitle(md, "Kate Refuses");

		perKate.setFlag(12);
		md.write(
			'<p>You tell her you know something of how Davy did what he did to her and can protect her by using the same spell on her, but just to protect her, doing nothing more. She replies suspiciously,</p>' +
			'<p>"I see, but I could never let anyone have that sort of power over me ever again. No one, not you, Davy, anyone!!"</p>' +
			'<p>You see you have lost any trust she had in you, she turns her back on you and leaves, certainly going to punish Davy.</p>');

		startQuestions();
		addLinkToPlace(md, "try to follow Kate", 47, '', '', '', "charmPerson('Kate', 4, 'Davy')");


	} else if (stype == "waitprotectnecklace") {
		// "Wait!!! - give necklace"
		md = WritePlaceHeader();
		perYourBody.DropItem(43, "Kate");
		perKate.setFlag(15);
		perKate.place = 124;

		perKate.showPerson("kate17i.jpg");
		addPlaceTitle(md, "Give Kate the Necklace");

		md.write(
			'<p>You show Kate the heirloom necklace you are wearing and without explaining how you got it, you describe how it protects from magic spells being cast on you. You remove it and offer it to her. She looks surprised, them smiles,</p>' +
			'<p>"I do not know how to thank you! I will properly \'thank\' you later, once I have beaten Davy and heard him beg to apologise to me!"</p>' +
			'<p>I am not sure where he is at the moment, he has been very cautious, he said how afraid of you he was, but also mentioned his mentor protecting him. If I find him before you I will call you. Do not dare attack him without me, I must punish him myself!"</p>' +
			'<p>She quickly kisses you on your lips, and then runs to hunt down Davy.</p>'
		);

		startQuestions();
		addLinkToPlace(md, "try to follow Kate", 47);


	} else if (stype == "waitlove") {
		// "Wait!!! - I love you"
		md = WritePlaceHeader();
		if (isKateTrusting()) perKate.showPerson("kate4d.jpg");
		else perKate.showPerson("kate4e.jpg");
		addPlaceTitle(md, "Kate Hesitates");

		md.write(
			'<p>You call out to Kate, "Wait, don\'t go I love you and want to help you!"</p>' +
			'<p>She hesitates and looks at you with a smile,  "I..don\'t know how to answer that, I am so angry at that <b>bastard</b> I just want to pound his face ');

		if (isKateTrusting()) {
			md.write(
				'but I do like you too, and maybe I was starting to fall... It is just Davy has messed with me and my emotions I do not know what to do.</p>' +
				'<p>You once again try to reassure her of your feelings and she looks at you,</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, "&quot;I love you, everything I have been doing is to help you!&quot;", 36, "type=waitloveyou");
			addLinkToPlaceC(md, "&quot;I love you, I will defeat Davy!&quot;", 36, "type=waitlovewait");

		} else {
			perKate.setFlag(12);
			md.write(
				'but I do not trust you. You seem to have some of the same abilities as Davy does and I do not know what you can or have done with them. Maybe I was starting to fall for you, but this has messed us around and I doubt I can ever trust someone with those powers ever again.</p>' +
				'<p>You try to reassure her of your feelings and that you will never used your magic on her but she is too angry and confused. She looks at you and resumes walking out, intent on her revenge against Davy.</p>'
			);
			startQuestions();
		}

		addLinkToPlace(md, "let her go and return to the park", 47, '', '', '', "charmPerson('Kate', 4, 'Davy')");


	} else if (stype == "waitlovewait") {
		// "Wait!!! - I love you" - "I love you, I will defeat Davy!"
		md = WritePlaceHeader();
		perKate.showPerson("kate4e.jpg");
		addPlaceTitle(md, "Kate Leaves");

		md.write(
			'<p>You tell Kate, "I do love you and I am working to defeat Davy and rob him of his powers. Just wait here and I will call for you when he is beaten."</p>' +
			'<p>Kate smiles and replies, "Thank you, but the only person who is going to beat Davy is me!" and she walks away.');

		startQuestions();

		addLinkToPlace(md, "let her go and return to the park", 47, '', '', '', "charmPerson('Kate', 4, 'Davy')");


	} else if (stype == "waitloveyou") {
		// "Wait!!! - I love you" - "I love you, everything I have been doing is to help you!"
		md = WritePlaceHeader();
		perKate.showPerson("kate4d.jpg");
		addPlaceTitle(md, "Kate");

		md.write(
			'<p>You tell Kate, "Everything I have been doing is to help you, I love you!"</p>' +
			'<p>She looks at you smiling and replies, "I might love you as well, but...I should go..."</p>');

		startQuestions();
		addLinkToPlace(md, "kiss her", 36, "type=waitlovekiss");

		addLinkToPlace(md, "let her go and return to the park", 47, '', '', '', "charmPerson('Kate', 4, 'Davy')");


	} else if (stype == "waitlovekiss") {
		// "Wait!!! - I love you" - "Kiss Her"
		md = WritePlaceHeader(false, perYou.isMaleSex() ? "" : "td-left-med");
		perKate.showPerson(perYou.isMaleSex() ? "kate4f.jpg" : "kate17gg.jpg");
		addPlaceTitle(md, "A Kiss");

		md.write(
			'<p>You take the uncertain Kate in your arms and you kiss her. She hesitates for a moment and then returns your kiss.</p>' +
			'<p>After a time you part and Kate looks calmer, the anger gone from her face, and she says,</p>' +
			'<p>"After everything with Davy this is so confusing, but I do want to thank you properly"</p>' +
			'<p>You look at her, she is unusually nervous, she is usually very clear minded, if impulsive.</p>'
		);

		startQuestions();
		addLinkToPlace(md, "embrace her", 36, "type=waitloveembrace");

		addLinkToPlace(md, "let her go and return to the park", 47, '', '', '', "charmPerson('Kate', 4, 'Davy')");

	} else if (stype == "waitloveembrace") {
		// "Wait!!! - I love you" - "Embrace"
		md = WritePlaceHeader(false, isExplicit() ? "td-left-med" : "");
		perKate.setFlag(14);
		perKate.place = 124;

		if (isExplicit()) perKate.showPersonRandomX(perYou.isMaleSex() ? "kate4g" : "kate17hg", 2);
		else perKate.showPersonRandom("kate4g", 2);
		addPlaceTitle(md, "Passionate Embrace");

		md.write(
			'<p>You take Kate into your arms and passionately kiss her, and you both start to strip each others clothing. You touch her large breasts and she sighs in passion, but when you touch her lower down, she shys away, and says,</p>' +
			'<p>"For now just let me please you...another time for...you know.."</p>');
		if (perYou.isMaleSex()) {
			md.write(
				'<p>Kate kneels and gives you a practised blowjob, clearly not her first time by a long way. You quickly cum, splattering her face and tits.</p>'
			);
		} else {
			md.write(
				'<p>Kate has you lie back and she leans in and starts licking your pussy. She is remarkably skilled and you quickly orgasm hard on her face.</p>'
			);
		}
		md.write(
			'<p>Kate looks at you and smiles and she quickly re-dresses. Once dressed she tells you,</p>' +
			'<p>"I will be back soon, once I have beaten Davy for what he did to me!"</p>' +
			'<p>Before you can complain or warn her she leaves.</p>');

		startQuestions();

		addLinkToPlace(md, "let her go and return to the park", 47, '', '', '', "charmPerson('Kate', 4, 'Davy')");
	}

	WritePlaceFooter(md);
}