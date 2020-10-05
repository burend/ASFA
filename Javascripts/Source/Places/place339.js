// Séance

function ShowPlace339()
{
	if (perKurndorf.getQuestGhost() == 999) return dispPlace(997);

	var perJessica = findPerson("Jessica");
	var b2Cols = perJessica.place === 193 || perJessica.place === 161 || perKurndorf.getQuestGhost() == 49 || perKurndorf.getQuestGhost() == 25;
	var md = WritePlaceHeader(false, b2Cols ? "td-left-small" : "td-left", "black");

	//  PICTURE REFERENCES
	if (perJesse.getDemonPath() > 0 && perJesse.getDemonPath() < 10) {
		//Demon is here
		md.write('<img src="Images/demon1.jpg" alt="Demon" style="width:25%;margin:5px 5px" alt="Demon">');
	}

	if (perKurndorf.getQuestGhost() > 0) {
		//Séance has STARTED && Kurndorf is here
		if (perJesse.getDemonPath() > 0 && perJesse.getDemonPath() < 10) md.write('<img src="Images/People/Kurndorf/kurndorf.jpg" alt="Ghost" style="float:right;width:60%;margin:5px 5px" alt="Kurndorf">');
	}

	if (perKurndorf.getQuestSeance() < 50) perJesse.showPerson("jesse1a.jpg", "", "", "", "Jesse");
	else if (perKurndorf.getQuestSeance() >= 70) perJesse.showPerson("jesse2.jpg", "", "", "", "Jesse");
	else perJesse.showPerson("jesse2a.jpg", "", "", "", "Jesse");

	// TITLE LINE
	addPlaceTitle(md, "Séance of Carl Kurndorf");

	if (perKurndorf.getQuestGhost() <= 15)
	{
		if (perKurndorf.getQuestSeance() < 50) {
			md.write(
				'<p>"As you wish," she says."</p>' +
				'<p>Jessica begins to prepare for the Séance, following the instructions you gleaned from your research.</p>' +
				'<p>The three of you form a circle and hold hands within the magical prison.</p>' +
				'<p>The Witch looks at you, apparently genuine concern in her voice. "Ready?  Once we begin we must finish or there will be grave consequences..." she says, letting the warning lie in the silence.</p>'
			);
			
		}	else if (perKurndorf.getQuestSeance() == 50) {
			md.write('<p>The Witch begins to chant, power rising around the three of you.  A quick glance at Jesse, your naive guest, reveals that the power seems to be flowing through her - leaving her quite unaware of what is happening around her.  Her eyes quickly begin to glaze over from the magical onslaught.</p>' +
				'<p>Within moments a ghostly form begins to appear within the circle.  Carl Kurndorf has graced you with his presence.</p>'
			);
			
		} else if (perKurndorf.getQuestGhost() == 15) md.write('<p>Kurndorf begins to chant something in a language that almost pulses with power, it is certainly a spoken form of the language the Book is written in.  You can feel the fear rising up within Jessica even as she stands frozen within the circle.</p>');
			
		else if (perKurndorf.getQuestSeance() > 50)	{
			md.write('<p>The spirit of Carl Kurndorf hovers in the room before you...  Who knows what power such a creature has, even in death.</p>');
			
		}	else if (perKurndorf.getQuestGhost() == 10)	{
			md.write('<p>"What!?!" Kurndorf yells in anger.  "How?  How have you stopped me?" he rails.');
			
		}
		if (perKurndorf.getQuestGhost() > 0) md.write('<img src="Images/People/Kurndorf/' + (perKurndorf.getQuestGhost() == 15 ? 'kurndorf-red' : 'kurndorf') + '.jpg" alt="Ghost" style="display:block;width:30%;margin-left:auto;margin-right:auto;margin-top:-1em;margin-bottom:0.5em" alt="Kurndorf">');
		
	} else {
		
		if (perKurndorf.getQuestGhost() == 20) {
			md.write(
				'<p>"That was me calling in a favor..." Kurndorf says smiling.</p>' +
				'<p>The Warlock laughs as a dark energy swirls within the room. The hair on the back of your neck begins to rise as you hear an alien laughing noise invade the room.</p>' +
				'<p>Within moments there is a 5th presence in the room, and a demon begins to flit around the room making lewd suggestions about different body parts among those present.</p>' +
				'<p>"Settle Down!" Kurndorf yells. "And take <i>care</i> of that <i>witch</i>!!"</p>' +
				'<p>The Demon hisses in displeasure at being told what to do, but it obeys the Warlock\'s order and rushes towards Jessica, it\'s claws tearing away her clothes without leaving a single mark on her skin.</p>'
			);
			
		}	else if (perKurndorf.getQuestGhost() == 21) {
			md.write(
				'<p>The demon\'s disturbing laughter reverberates from the prison\'s walls as it allows Jessica to stumble away from it, watching the now naked witch trying to reach the door.</p>' +
				'<p>“Yes little witch! Struggle! Run! Make it fun for us!”</p>' +
				'<p>A chain forms within the creatures hand and surges towards Jessica\'s neck at impossible speed, giving her no chance to react before the attached leather collar snaps close around her.</p>'
			);
			
		} else if (perKurndorf.getQuestGhost() == 22 || perKurndorf.getQuestGhost() == 23) {
			if (perKurndorf.getQuestGhost() == 22) md.write('<p>The Demon doesn\'t even bother to look into your direction, remaining completely focused on playing with his witch-toy.</p>');
			md.write(
				'<p>The Demon tautens the chain, taking a perverse pleasure in both Jessica\'s futile attempts to free herself and your own powerlessness as it slowly pulls the witch towards him.</p>' +
				'<p>You can see panic in Jessica\'s eyes. She\'s looking at you for help, her hands wrapped around the chain, struggling against the creature\'s pull and even managing to get a few more steps away until...</p>' +
				'<p>“Stop playing around and subdue her already!”</p>' +
				'<p>...until Kurndorf barks out another order towards the demon. The creature emits an annoyed hiss, and the chain begins to vibrate within it\'s hand.</p>'
			);
			
		} else if (perKurndorf.getQuestGhost() == 24) {
			md.write(
				'<p>A wave of what can only be described as pure lustful energy rushes through the prison. You were not even the target, but the sensation is strong enough to make your cock harden/folds wet and your knees go wobbly.</p>' +
				'<p>You can only guess what it must have felt like for Jessica as she took the brunt of it.</p>' +
				'<p>“Your mortal bodies enjoy this, do they?” The demon laughs. “Your kind is so easily overcome by strong emotions.”</p>' +
				'<p>Jessica threshes around, gasping for air and breathing out several throaty moans as the chain\'s vibration intensifies, overwhelming her mind with a torrent of intense sensations.</p>' +
				'<p>“Let us now see how long it will take for your mind... to break!”</p>' +
				'<p>You can feel the air within the magic prison grow thicker, harder to breath in as the demon moves closer to Jessica and hovers over her, gloating as another rush of pleasure shakes her body and the color begins to drain from her pupils.</p>'
			);			

		}	else if (perKurndorf.getQuestGhost() == 25 || perKurndorf.getQuestGhost() == 26) {
			if (perKurndorf.getQuestGhost() == 25) {
				md.write(
					'<p>This is getting too dangerous. The demon is about to... finish doing whatever it is doing to Jessica, which will leave you alone with both it and Kurndorf in a magical prison.</p>' +
					'<p>You have to get out while the creature is distracted... but that it easier said than done. Your attempt to break down the magical door by pure force is met with laughter from Kurndorf, and no matter how much you look, there seems to be no other way out of this place...</p>'
				);
			}
			md.write(
				'<p>You\'ve had actual sex that felt less intense than watching Jessica right now.</p>' +
				'<p>The witch is feverishly ramming her fingers into her pussy, screaming, moaning, begging. Her face contorted into a grimace of pain and pure lust as the chain keeps vibrating, pushing her mind and body closer and closer to its limits.</p>' +
				'<p>At this point, you know you can do little more but watch, both horrified and fascinated as a more primitive part of your brain can\'t help but think about the exquisite pleasure Jessica must be experiencing right now, how it must feel to lose oneself to it like this...</p>' +
				'<p>It\'s a feeling you quickly lock away into the deepest depths of your mind.</p>' +
				'<p>You can\'t afford to lose focus now... you are locked in a magical prison with this creature, and who knows what Kurndorf will order it to do once it\'s done with Jessica?</p>' +
				'<p>The witch seems close to the breaking point, her body twitching under the impending climax, chest heaving with every breather taken... when she suddenly reaches for the chain.</p>'
			);
			
		} else if (perKurndorf.getQuestGhost() == 27) {
			md.write(
				'<p>“You imbecilic creature!” The ghost screams. “She is...”</p>' + 
				'<p>You are not exactly sure what happens in the next seconds, but you feel a rush of pure power emanating from Jessica as she yanks the chain out of the demon\'s hands. The creature charges towards her with an angry growl, the witch shouts a single word, there is a bright flash of light disorienting you...</p>' +
				'<p>And after your eyes adjust enough to see again, Jessica is... gone?</p>'
			);	
			
		} else if (perKurndorf.getQuestGhost() == 28) {
			md.write(
				'<p>Kurndorf\'s ghost is screaming in impotent rage as his plan unravels before... well, what amounts to his eyes, cursing both the witch and the demon with a plethora of expletives.</p>' + 
				'<p>The demon\'s expression is hard to read, but it\'s posture suggests that it wants to tear into the incorporeal body before it, yet is not able to.</p>' + 
				'<p>“The Witch will be found and punished, as agreed upon.” It growls, the creature\'s eyes falling on the innocent still left motionless within the circle, then on you. “After we take this vessel. The one you have so generously provided for us.”</p>' + 
				'<p>The Demon begins to swirl around Jesse\'s helpless body faster and faster, it\'s voice exited, hissing in pleasure.</p>' + 
				'<p>“Yes... this one will be sooo tasty...!”</p>'
			);				
			
		}	else if (perKurndorf.getQuestGhost() == 29 || perKurndorf.getQuestGhost() == 30) {
			if (perKurndorf.getQuestGhost() == 29) md.write('<p>You rush towards Jesse, but it\'s already too late and even Kurndorf is taken by surprise by the creature\'s sudden movement.</p>');
			else md.write('<p>You are frozen in horror by what is happening, but it seems you could not have stopped the creature if you had tried, as even Kurndorf is taken by surprise.</p>');
			md.write(
				'<p>"Noo!" The Warlock bellows as the demon\'s spirit enters the young woman, her eyes beginning to glow red with presence of the demon within.</p>' + 
				'<p>"You will OBEY me!" he yells, pumping his fists towards the demon.</p>' + 
				'<p>Terrified, Jesse screams for help, but you can only watch powerlessly as the demon dives into her mouth. Her scream is cut off mid breath, and the fear in her eyes slowly fades, to be replaced by a horrible red glow.</p>' + 
				'<p>"Aaaah. Yes..." what used to be Jesse says, stretching the limbs of its new body. “It has been far too long since we were free to walk this realm.” The creature looks towards Kurndorf and snorts contemptuously, ignoring any further attempts by the Ghost to get its attention.</p>'
			);
			
		} else if (perKurndorf.getQuestGhost() == 40) {
			// Help Jessica
			if (gameState.bAllowUndo) {
				// Easy
				md.write(
					'<p>You really don\'t know how much good this is going to do, but you\'ll be damned if you just sit by and gawk while that thing does... whatever it\'s doing to Jessica.</p>' + 
					'<p>You position yourself between the witch and the Demon, and, unsure what else to do, grab the chain to pull it away from the creature.</p>' + 
					'<p>It works, sort off. The demon\'s spell is distorted as you yank the chain out of its hands, but the moment your hand touches it, you are hit by what can only be described as a wave of pure, carnal lust washing over you.</p>' + 
					'<p>You gasp for air, desperate to keep your wits about you as the demonic energy courses through your  body, your vision blurring as what might be a thousand tiny orgasm\'s explode within every part of you only to suddenly stop the moment the chain slips from your hand.</p>' + 
					'<p>You are still completely dizzy from the experience, and suddenly hear Jessica scream...</p>'
				);
			} else {
				// Hard
				md.write(
					'<p>You really don\'t know how much good this is going to do, but you\'ll be damned if you just sit by and gawk while that thing does... whatever it\'s doing to Jessica.</p>' + 
					'<p>You position yourself between the witch and the Demon, and, unsure what else to do, grab the chain to pull it away from the creature.</p>' + 
					'<p>It works, sort off. The demon\'s spell is distorted as you attempt to yank the chain out of its hands, but the moment your hand touches it, you are hit by what can only be described as a wave of pure, carnal lust washing over you.</p>' + 
					'<p>You gasp for air, desperate to keep your wits about you as the demonic energy courses through your  body, your vision blurring as what might be a thousand tiny orgasm\'s explode within every part of you, threatening to overwhelm your senses.</p>' +
					(perYou.checkFlag(18) ? '' : '<p>If only you knew some form of <b>protection</b> from this magical assault, but you have not learnt anything...</p>')
				);
			}
			
		} else if (perKurndorf.getQuestGhost() == 41) {
				// Help Jessica - Easy
				md.write(
					'<p>The Demon hovers over you, It\'s eyes scanning you with a mix of anger and bemusement at what you did. You take a step back and see it stretch out its arm, another chain starting to form when...</p>' + 
					'<p>“Ignore that one!” Kurndorf\'s interruption is met with another angry growl. “Bring the witch back in here, she has not nearly suffered enough!”</p>' + 
					'<p>The creature\'s eyes wander to the Ghost, and you get the feeling it\'s claws would tear into the specter if it could, but Instead, it\'s gaze falls on the innocent still left motionless within the circle.</p>' + 
					'<p>“I\'d much rather feed first, and this one will be sooo tasty...”</p>' + 
					'<p>The Demon picks up speed swirling around Jesse\'s helpless body faster and faster.</p>'
				);

		} else if (perKurndorf.getQuestGhost() == 42) {
			// Help Jessica - Hard
			md.write(
				'<p>You try to withstand the assault on your senses, but without a way to block whatever demonic energy is flowing into you, all you are able to do is let go of the chain and stumble back, your body still shivering from the intense sensation you just felt.</p>' + 
				'<p>“Your mortal bodies enjoy this, do they?” The demon laughs. “Your kind is so easily overcome by strong emotions. Like this...”</p>' + 
				'<p>Jessica threshes around, gasping for air and breathing out several throaty moans as the chain\'s vibration intensifies, overwhelming her mind with a torrent of intense sensations.</p>' + 
				'<p>“Let us now see how long it will take for her mind... to break!”</p>' + 
				'<p>You can feel the air within the magic prison grow thicker, harder to breath in as the demon moves closer to Jessica and hovers over her, gloating as another rush of pleasure shakes her body and the color begins to drain from her pupils.</p>'
			);
			
		} else if (perKurndorf.getQuestGhost() == 43) {
			// Help Jessica - Hard
			md.write(
				'<p>You have to think rationally... calm your mind... some... energy is invading your body, it\'s not like Mana, but maybe you can block it just like a spell?</p>' + 
				'<p>You begin reciting the words Allison taught you. In your mind at first, then whispered, then out loud, focusing your mana to block the Demon\'s assault and finally yanking the chain from it\'s hand.</p>' + 
				'<p>The assault on your senses stops the moment you yank the chain away and let it slips from your hand, but you are still completely dizzy from the experience. Your vision is blurry, but you hear an annoyed growl from the demon, and for a second it seems like it\'s rushing towards you, only to pass you by.</p>' + 
				'<p>Then you hear Jessica scream...</p>'
			);
			
		} else if (perKurndorf.getQuestGhost() == 49) {
			md.write('<p>The Ghost of Kurndorf floats in the air, seemingly unattached from his cares for the first time since he was summoned.</p>');
			md.write('<p>"Well, my ' + perYou.getSex() + '," He says almost amicably. "Better than I was a few short days ago I must say, but still not as well-off as I would have hoped."</p>');

			if (perJesse.place === 0)	{
				// Demon still here
				md.write('<p>A sweet pungent smell begins to tease your nose as the Demon within Jesse continues its exploration, its eyes passing around the room and pausing each time to gaze over your body - a hungry look crossing her face.</p>');
			}
		}
	}

	//**********************************************************************
	startQuestions();

	if (perKurndorf.getQuestSeance() < 50) {
		addQuestionCO(md, 'start the séance', "Jessica", -2750);
		addLinkToPlace(md, 'go back to the cellar', 193);
	}

	if (perKurndorf.getQuestGhost() == 1) addQuestionC(md, 'introduce yourself', "Kurndorf", 14301);
	else if (perKurndorf.getQuestGhost() == 5) addQuestionC(md, 'ask him why he was helping you', "Kurndorf", 14305);
	else if (perKurndorf.getQuestGhost() == 10) addQuestionC(md, 'tell him about the aftane', "Kurndorf",14310);
	else if (perKurndorf.getQuestGhost() == 15) addQuestionC(md, 'uuuuh... what was that', "Kurndorf", -14315);
	else if (perKurndorf.getQuestGhost() == 20) {
		startAlternatives(md);
		addQuestionCO(md, 'order Kurndorf to stop this', "Kurndorf", -14321);
		addQuestionCO(md, 'watch powerlessly as the events unfold', "Kurndorf", -14320);
		endAlternatives(md);
	
	} else if (perKurndorf.getQuestGhost() == 21) {
		startAlternatives(md);
		addOptionLink(md, 'get the Demon\'s attention', 'perKurndorf.setQuestGhost(22);dispPlace()');
		addOptionLink(md, 'try to help Jessica', "findPerson('Jessica').startAlly();perKurndorf.setQuestGhost(40);dispPlace()");
		addOptionLink(md, 'look at Jessica', 'perKurndorf.setQuestGhost(23);dispPlace()');
		
	} else if (perKurndorf.getQuestGhost() == 22 || perKurndorf.getQuestGhost() == 23) {
		startAlternatives(md);
		addPopupLink(md, "look at Jesse", "Jesse",
		"<p>" + perJesse.addPersonString("jesse23.jpg", "height:max%", "right") +
			"<p>The Demon's aura seems to have a strong effect on Jesse.</p>" +
			"<p>The girl is clearly shocked and just sits in the circle with her clothes disheveled, staring wide-eyed at Jessica and the Demon, unable, or maybe even unwilling to move.</p>",
			true, "perKurndorf.setQuestGhost(24);dispPlace()"
		);
		addOptionLink(md, 'try to help Jessica', "findPerson('Jessica').startAlly();perKurndorf.setQuestGhost(40);dispPlace()");
		addOptionLink(md, 'what is happening?', 'perKurndorf.setQuestGhost(24);dispPlace()');
		endAlternatives(md);
		
	} else if (perKurndorf.getQuestGhost() == 24) {
		startAlternatives(md);
		addOptionLink(md, 'look for a way to escape', 'perKurndorf.setQuestGhost(25);dispPlace()');
		addOptionLink(md, 'watch the demon finish its work', 'perKurndorf.setQuestGhost(26);dispPlace()');
		endAlternatives(md);

	} else if (perKurndorf.getQuestGhost() == 25 || perKurndorf.getQuestGhost() == 26) {
		startAlternatives(md);
		addLinkToPlace(md, 'stop whatever she is doing', 993);
		addOptionLink(md, 'wait and see what she is doing', 'perKurndorf.setQuestGhost(27);dispPlace()');
		endAlternatives(md);

	} else if (perKurndorf.getQuestGhost() == 27) {
		addOptionLink(md, 'what has happened?', "findPerson('Jessica').startRival();perKurndorf.setQuestGhost(28);dispPlace()");
		
	} else if (perKurndorf.getQuestGhost() == 28) {
		startAlternatives(md);
		addOptionLink(md, 'try to stop it', 'perKurndorf.setQuestGhost(29);dispPlace()');
		addOptionLink(md, 'just watch', 'perKurndorf.setQuestGhost(30);dispPlace()');
		endAlternatives(md);
		
	} else if (perKurndorf.getQuestGhost() == 29 || perKurndorf.getQuestGhost() == 30) {
		addQuestionC(md, 'ask Kurndorf how he\'s doing', "Kurndorf", 14325);
	
	} else if (perKurndorf.getQuestGhost() == 40) {
		// Help Jessica
		if (gameState.bAllowUndo) {
			startAlternatives(md);
			addPopupLink(md, "why did jessica cry out", "Jessica",
				"<p>" + perJessica.addPersonString("jessica2ca.jpg", "height:max%", "right") +
				'<p>"You are not sure how she did it, but Jessica has somehow staggered out of her prison into the doorway to the cellar, not that it did her much good.</p>' +
				'<p>You see a swirling around her of dust and items, some chains flying in to wrap around her arms and feet. Long boots appear on her legs, black, shiny and with odd heels while similar styled gloves now adorn her arms. She cries out in pain as a pair of metal clamps bites into her nipples and a ballgag flies into her mouth the moment she opens it.</p>' +
				'<p>Kurndorf laughs, “Anti Magic Bindings... It seems you made the Demon want to toy with his witch a little longer, I wish her all the torment and pain of hell!”</p>' +
				'<p>The Demon\'s eyes now focus on you, and the creature is moving closer...</p>',
				true, "perKurndorf.setQuestGhost(41);dispPlace()"
			);
			addOptionLink(md, 'where is the demon', 'perKurndorf.setQuestGhost(41);dispPlace()');
			endAlternatives(md);
		} else {
			if (perYou.checkFlag(18)) {
				startAlternatives(md);
				if (nMana >= 20) addOptionLink(md, 'use Alison\'s chant to protect yourself', 'AddMana(-20);perKurndorf.setQuestGhost(43);dispPlace()');
				else addLinkToPlace(md, 'use Alison\'s chant to protect yourself', Place, '', 'You do not have enough mana!');
			}
			addOptionLink(md, 'let go of the chain', 'perKurndorf.setQuestGhost(42);dispPlace()');
			if (perYou.checkFlag(18)) endAlternatives(md);
		}

	} else if (perKurndorf.getQuestGhost() == 41) {
			// Help Jessica - Easy 2/Hard 3
			startAlternatives(md);
			addOptionLink(md, 'try to stop it', 'perKurndorf.setQuestGhost(29);dispPlace()');
			addOptionLink(md, 'just watch', 'perKurndorf.setQuestGhost(30);dispPlace()');	
			endAlternatives(md);

	} else if (perKurndorf.getQuestGhost() == 42) {
		addOptionLink(md, 'watch the demon finish its work', 'perKurndorf.setQuestGhost(26);dispPlace()');
	
	} else if (perKurndorf.getQuestGhost() == 43) {
		// Help Jessica Hard 2
		addPopupLink(md, "why did jessica cry out", "Jessica",
			"<p>" + perJessica.addPersonString("jessica2ca.jpg", "height:max%", "right") +
			'<p>"You are not sure how she did it, but Jessica has somehow staggered out of her prison into the doorway to the cellar, not that it did her much good.</p>' +
			'<p>You see a swirling around her of dust and items, some chains flying in to wrap around her arms and feet. Long boots appear on her legs, black, shiny and with odd heels while similar styled gloves now adorn her arms. She cries out in pain as a pair of metal clamps bites into her nipples and a ballgag flies into her mouth the moment she opens it.</p>' +
			'<p>Kurndorf laughs, “Anti Magic Bindings... It seems you made the Demon want to toy with his witch a little longer, I wish her all the torment and pain of hell!”</p>' +
			'<p>The Demon\'s eyes now focus on you, and the creature is moving closer...</p>',
			true, "perKurndorf.setQuestGhost(41);dispPlace()"
		);	
	}
	if (perJesse.getDemonPath() > 1 && perJesse.place === 0) addLinkToPlace(md, 'talk to Jesse, uhm, the demon', 340);	//Jesse has been possessed && is here

	// Right column images
	if (b2Cols) {
		AddPeopleColumnMed();
		// Witch is here
		if (perKurndorf.getQuestGhost() == 49 || perKurndorf.getQuestGhost() == 25) md.write('<img src="Images/People/Kurndorf/kurndorf.jpg" style="float:left;width:100%;margin:5px 5px" alt="Kurndorf">');
		if (perJessica.place === 193) perJessica.showPerson(perKurndorf.getQuestGhost() < 20 ? "jessica2a.jpg" : "jessica2b.jpg", "", "", "", "Witch");
		else if (perJessica.place === 161) {
			if (perKurndorf.getQuestGhost() == 22 || perKurndorf.getQuestGhost() == 23) perJessica.showPerson("jessica_leash2.jpg", "", "", "", "Bound Witch");
			else if (perKurndorf.getQuestGhost() == 24 || perKurndorf.getQuestGhost() == 42) perJessica.showPerson("jessica_leash3.jpg", "", "", "", "Bound Witch");
			else if (perKurndorf.getQuestGhost() == 25 || perKurndorf.getQuestGhost() == 26) perJessica.showPerson("jessica_leash4.jpg", "", "", "", "Bound Witch");
			else if (perKurndorf.getQuestGhost() == 27) perJessica.showPerson("jessica_leash5.jpg", "", "", "", "Bound Witch");
			else perJessica.showPerson("jessica_leash1.jpg", "", "", "", "Bound Witch");
		}
	}

	WritePlaceFooter(md);
}