// Place: Leanne's living room

function ShowPlace450(stype)
{
	var md = WritePlaceHeader();
	var perLeanne = findPerson("Leanne");
	var nInf = perLeanne.getInfluenced();		// current influence

	if (!perLeanne.isHere()) {
		// House is empty
		if (nInf > 4 && sType === "" && !perLeanne.checkFlag(21) && perLeanne.place === 9999) return gotoPlaceDelayed(38, '', '<img src=\"UI/knock.png\" style=\"float:left;width:10%;margin-right:5px\">No one answers your knock and you hear no one moving, but as you try to reach Leanne on her Mobile phone, you hear it ringing inside the house.');

		addPlaceTitle(md, "Leannes Living Room", "livingroom6.jpg");
		md.write('<p>Leanne\'s very clean and stylish living room.</p>');
		startQuestions();
		addLinkToPlace(md, "leave the house", 38);
		WritePlaceFooter(md);
		return;
	}

	var bThrall = perLeanne.isCharmedBy("Demon");	// Thrall Leanne is here
	var bLost = isDemonGone();		// Leanne is lost forever

	// Thrall or as herself?
	if (bThrall) {

		// Leanne the thrall is here
		if (!perLeanne.checkFlag(13)) {
			// First meeting after she arrived here
			perLeanne.setFlag(13);
			perLeanne.showPerson("leanne13t.jpg");
			addPlaceTitle(md, "The Thrall in Leanne\'s Living Room");

			md.write('<p>Uncertain what you will find you push Leanne\'s front door open and call out her name, except you know she is not here, her body might be as controlled by the thrall, but not Leanne herself.');
			if (bLost) md.write(' You also know that Leanne will never be here again, she is lost forever.');
			md.write('</p><p>You cautiously enter the living room and your suspicion is confirmed, the thrall is standing there, dressed in some kind of red latex dress. She looks at you and unzips the front of her dress as she walks towards you,</p>');
			if (bLost) {
				// Demon has left the town, thrall is here permanently
				md.write(
					'<p>"This thrall is here as you commanded, and this body shall be the reward promised"</p>' +
					'<p>You reply, "Well, that is something you have offered before, what else can you offer? I saw you use a power I do not have in the Mother Superior\'s room, can you teach me this, or something similar?"</p>' +
					'<p>She looks at you almost sadly, "This thrall does not know how it does those abilities, it can just do them. The thrall\'s Mistress gave it small powers to seduce and tempt but little a ' + perYou.getWitch() + ' like you could not.", she pauses and continues<br>' +
					'<p>What is a slave without an owner, a thrall with no Mistress? They are nothing, this body is all that can be offered or the abilities of this thrall to seduce"</p>' +
					'<p>You reply forcefully, "Then that is it, I will give you a purpose, you will reward me with your eternal service, your slavery to me as your ' + perYou.getMaster() + '"</p>' +
					'<p>You say this as a way to control her, you have the slight hope that someday you have be able to find the demon and free Leanne, but you also know this is a false hope, she is <i>almost</i> certainly lost. At least you can prevent the thrall in her body doing harm or at least spoiling Leanne\'s good name. The thrall looks at you,</p>' +
					'<p>"The contract is agreed, this thrall, is now <i>your</i> thrall to use in any way you desire."</p>'
				);

			} else {
				// Leanne is still saveable (but you did not have the relic)
				md.write(
					'<p>"This thrall should have realised you would know this place, one place strongly in this bodies memories. Know this, you will not trick this thrall again, while this thrall\'s Mistress is gone, her orders remain."</p>' +
					'<p>You reply, "Your orders to try to corrupt the church have failed", though you are not sure that is really true considering the Mother Superior and Sister Desiree. You continue, "You have no Mistress and no purpose any more!"</p>' +
					'<p>She replies a little sadly, "You speak the truth, this thrall has no purpose and no Mistress. This thrall will stay here, another will arrive to claim it from the <i>gate</i>."</p>' +
					'<p>Well you think this is best as it will keep her from harming others, until you can work out how to free Leanne. You just need to get the thrall back to the Hidden Room some other way, teleport will not work any more.'
				);
				if (perYourBody.FindItem(48) === 0 && perYourBody.FindItem(48) != -53) md.write(' Then again you still do not have the relic...');
				md.write('</p>');
			}

		} else {
			// Later visits
			perLeanne.showPerson("leanne8t.jpg");
			addPlaceTitle(md, "The Thrall in Leanne\'s Living Room");

			if (bLost) {
				md.write(
					'<p>Your thrall is here ready to do anything you command.</p>'
				);
			} else {
				md.write('<p>The thrall is still here, you still have to work out how to deal with her');
				if (perYourBody.FindItem(48) === 0 && perYourBody.FindItem(48) != -53) md.write(', and you still do not have the relic..');
				md.write('.</p>');
			}
		}
		startQuestions();
		addLinkToPlace(md, "leave the house", 38);

		WritePlaceFooter(md);
		return;
	}

	// Leanne as herself
	var perMS = findPerson("Daria");
	var nFreed = nTime - perMS.extra[0];		// How long ago was she freed from the Church (as a thrall or herself again)
	var clv = perLeanne.getCharmedLevel();
	var bRecovered = (nTime - perMS.extra[0]) > 575;
	if (nInf > 4 && sType === "" && clv === 0) return gotoPlaceDelayed(38, '', '<img src=\"UI/knock.png\" style=\"float:left;width:10%;margin-right:5px\">You hear a rustle inside, but the door remains closed, it seems like Leanne doesn&rsquo;t want to see you right now.');

	if (clv == 1) perLeanne.showPersonDN("leanne16.jpg");
	else if (clv == 4) perLeanne.showPersonDN("leanne17.jpg");
	else perLeanne.showPerson(perLeanne.hadSexYourself() ? (isDay() ? "leanne8s.jpg" : "leanne8-night.jpg") : "leanne9.jpg");
	addPlaceTitle(md, "Leanne at Home");

	md.write('<p>Leanne has inherited a pleasant, modern home which she often laments is much to big for her to live in all alone by herself. She has openly contemplated selling it a few times, but in the end, she doesn\'t want to leave the memories behind and hopes that maybe one day it\'ll be filled with a family of her own.</p>');

	if (clv == 1) {
		md.write(
			'<p>Your lover greets you with a deep kiss right after you open the door and pulls you into the house.</p>' +
			'<p>“I missed you, ' + perYou.getPersonName() + '.” She says with a happy smile. “How have you been? Any sexy new slaves or girlfriends I should know about?”</p>'
		);

	} else if (clv == 4) {
		md.write(
			'<p>Your slave had given you a spare key to her house, and when you let yourself in and she is already expecting you. “Welcome home, ' + perYou.getMaster() + '.” She welcomes you with a soft smile, seductively lying on the sofa. “What can your little slut do for you?”</p>'
		);

	} else {
		if (perLeanne.checkFlag(17)) {
			md.write(
				'<p>Leanne asks you calmly, but rather firmly to please leave if you are not willing to help or even talk to her about it.</p>' +
				'<p>She has been rather mad about what you did during her possession/She was under enough stress after what happened, to begin with, and your unwillingness to help her surely didn\'t give you any bonus points here.</p>'
			);
		} else if (perLeanne.checkFlag(16)) {
			if (nInf === 0) md.write('<p>“Hey ' + perYou.getPersonName() + ', it\'s good to see you.” Leanne greets you with a warm hug and invites you in. “How are you, and how are your magic-stuff-studies coming along?”</p>');
			if (nInf < 5) md.write('<p>Leanne greets you warmly and invites you inside. She is still a bit guarded around you, but more calm and relaxed by now, asking you about your day and how your “magic-stuff-studies” are moving along.</p>');

		} else if (perLeanne.hadSexYourself()) {
			md.write(
				'<p>Leanne is still dealing with the aftermath of her possession and often nervous, especially while you are around. She has taken a few days off from work to deal with the dreams, anxiousness and... other feelings she is not yet willing to discuss.</p>' +
				'<p>You did offer your help, but she is understandably still rather upset with you and flatly says that the best way for you to help is giving her some time and space to work things out herself.</p>' +
				'<p>You figured it might be for the best to give her that space. The residual effect from the glamour the thrall used has not fully worn off, and the longer you are around her, the more you remember what you did when it offered her body to you, and the more you wonder what it would be like to have her again.</p>'
			);
		} else {
			md.write(
				'<p>Leanne is happy to see you, but the time as Legions thrall clearly took a toll on her.</p>' +
				'<p>She gladly asks you inside when you visit, but usually avoids talking about anything regarding the demon and often asks you to leave early or excuses herself on short notice.</p>' +
				'<p>You know that she has taken a few days off of work to deal with the dreams, anxiety and other... feelings she is unwilling to discuss, and you occasionally check in on her, but give her the space she needs, and for good reason.</p>' +
				'<p>The residual effect of the thralls glamour has still not worn off, and the longer you are with her, the more your mind drifts off, and you find it harder to not see her as she was back then, naked, beautiful, and all too willing to be taken by you.</p>'
			);
		}
	}

	startQuestions();

	switch(clv) {
		// Deww/uncharmed
		case 0:
			if (bRecovered && !perLeanne.checkFlag(16)) addLinkToPlace(md, "ask how she is holding up", 450, 'type=askher');
			addQuestionRO(md, 'pass some time chatting',
				'Leanne offers you a drink and the two of you spend some time talking about various topics, like the ' + getShopStore() + ', school or recent developments. You tend to avoid bringing up anything regarding your harem, but she is occasionally a little curious about your sexual adventures, too.</p>' +
				'<p>In the end, an hour has quickly passed.',
				"Leanne",
				"WaitHere(12)"
			);
			perLeanne.addSleepLink(md, "spend the night at Leanne\s house", "",
				"<p style='position:absolute;top:62%;left:2%;cursor:pointer;margin-top:-12px;font-size:x-large'><b>Sleeping At Leanne\'s Home</b></p>" +
				'<p style="position:absolute;left:2%;top:65%;cursor:pointer;font-size:1.1em;width:50%">' +
				'It had gotten late and Leanne offers you to spend the night in the guest room, and it\'s an offer you gladly take.<br><br>' +
				'You find the night mostly quiet, but it still takes you a while to fall asleep and you suddenly hear strange noises from inside the house.<br><br>' +
				'As you investigate, you catch a glimpse through Leanne\'s bedroom door and to your surprise, not only find it open but Leanne herself laying on top of her sheets and masturbating furiously with what seems to be no small amount of frustration about something.<br><br>' +
				'You contemplate going in, but decide that for now, it might be better to wait for her to approach you, if she even wants to, and quietly head back to bed before you are spotted.',
				"leanne-bed1.jpg"
			);
			break;

		// Lover Charm
		case 1:
			addLinkToPlace(md, "spend some sexy time with your lover", 450, 'type=sexytime');
			addLinkToPlace(md, "let her take the lead", 450, 'type=takelead');
			perLeanne.addSleepLink(md, "spend the night with Leanne", "",
				"<p style='position:absolute;top:62%;left:50%;cursor:pointer;margin-top:-12px;font-size:x-large'><b>Going to Bed with Leanne</b></p>" +
				'<p style="position:absolute;left:50%;top:65%;cursor:pointer;font-size:1.1em;width:45%">The hour grows late, and you gladly accept Leanne\'s offer to spend the night in her bed while she nestles her body against yours with a sweet smile.',
				"leanne-bed2.jpg"
			);
			break;

		// Slave Charm
		case 4:
			addLinkToPlace(md, "order her to turn around and present her pussy to you.", 450, 'type=slavepussy');
			if (perYou.isMaleSex()) addLinkToPlace(md, "order her to get on her knees and service you with her mouth", 450, 'type=oralservice');
			perLeanne.addSleepLink(md, "spend the night with Leanne", "",
				"<p style='position:absolute;top:62%;left:50%;cursor:pointer;margin-top:-12px;font-size:x-large'><b>Going to Bed with Leanne</b></p>" +
				'<p style="position:absolute;left:50%;top:65%;cursor:pointer;font-size:1.1em;width:45%">Leanne prepares the bed for the two of you and completely undresses before she slips in besides you, and the two of you spend the night in each others arms. ',
				"leanne-bed2.jpg"
			);
			break;
	}

	addLinkToPlace(md, "leave the house", 38);

	WritePlaceFooter(md);
}
