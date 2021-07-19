// Inside Mansion - the Study with Ronald Gates

function ShowPlace17()
{
	if (isMurderPath()) return EnterMansion(); //  If Sir Ronald Gates is Dead - move to the "dead" version, redirect to the Gates "Front Door"

	var md = WritePlaceHeader();

	var perSarah = findPerson("Sarah");
	var bMetLauren = perSarah.place == 192 && perSarah.other >= 101;
	var perLauren = findPerson("Lauren");
	var perLeanne = findPerson("Leanne");
	var bLocked = !isDay() && (bMetLauren || perSarah.other == 1000);

	if (perSarah.place == 17 && perSarah.other == 1) {
		// First meeting with Sarah Gates (charmed path)
		perSarah.place = 192;
		perSarah.setFlag(7);		// Met her (common flag)
		perSarah.showPerson("sarah1b.jpg");
		addPlaceTitle(md, "Hallway to meet " + perGates.getPersonName());
		md.write(
			'<p>You are walking through the mansion to meet ' + perGates.getPersonName() + ' and a young woman steps in front of you and challenges you,</p>' +
			'<p>"What are you doing in my Mansion? Get out before I call the police!"</p>' +
			'<p>You explain who you are and that you are here to see ' + perGates.getPersonName() + ', and ask "What do you mean <i>your</i> Mansion, this is ' + perGates.getPersonNameShort() + '\'s home!" She looks startled,</p>' +
			'<p>"My apologies ' + (perYou.isMaleSex() ? "Sir" : "Miss") + ' Apprentice, I am Sarah Gates, ' + perGates.getPersonNameShort() + '\'s neice. Uncle Ronny has told me <i>all</i> about you. Why don\'t you follow me to see him!</p>');
		startQuestionsOnly();
		addLinkToPlaceO(md, "follow her", 17, '', 'On your way to see ' + perGates.getPersonName() + ', the girl says you may call her Sarah, and that she is here visiting her uncle for a few days. She softly giggles and says how boring she <i>thought</i> it was going to be.', 'Sarah', 'bChatLeft=false;');

	} else {
		// Meet Sir Ronald
		if (perSarah.place == 192 && perSarah.other < 100) perSarah.other = 100;
		perGates.showPerson("gates2.jpg");
		addPlaceTitle(md, perGates.getPersonName());
		if (perGates.other === 0)
		{
			md.write(
				'<p>An elderly gentleman is sitting behind a large desk made from oak. The whole room is stuffed with things from the past. Paintings and pictures from 19th century decorate the walls and a great Chandelier hangs from the ceiling. The dark blue  color of the walls and the smell of old wood sets the mood of the place. It is certainly a very old room!</p>' +
				'<p>The old man must be ' + perGates.getPersonNameShort() + ' himself! He’s kind of a legend around here, becoming part of the mythos involving the witches and warlocks of the past. Some say he is a warlock himself who’s here to guard something very important. On a more earthly plane, some people claim that ' + perGates.getPersonNameShort() + ' served in army intelligence while others believe that he worked for S-Biomed, the elusive FBI branch dedicated to preempting chemical warfare. Nobody knows how he earned his knighthood and, if ' + perGates.getPersonNameShort() + ' has anything to do with it, they will never find out.</p>' +
				'<p>The moustached man looks at you with wise eyes. You can feel his commanding presence even though he looks to be in his 70’s. He has a wooden pipe in his hands, toying with it while glancing at you. After a while he stops, puts the pipe in his mouth, and lights it. Finally he gestures for you to approach. You know he can be an influential ally… or a powerful enemy if you anger him.</p>' +
				'<p>"Welcome," he says with a silvery voice. "I don\'t get to receive guests very often, and even less often do I receive uninvited guests. I assume that you are here to sell me something. Well, as I told the last salesman, I have all that I need right here."</p>' +
				'<p>Something catches your eye; beside ' + perGates.getPersonNameShort() + '\'s desk is a book. Could it be the one? It is, you are sure it is!</p>'
			);
		}
		else if (perGates.other < 3) // Also means != 0 since its an If-Then-Else
		{
			md.write('<p>' + perGates.getPersonNameShort() + ' smiles warmly toward you. The old man has taken a liking to your good manners.');
		}
		else if (perGates.other == 3)
		{
			md.write('<p>The old man waits for you reply. Are you brave enough to accept his challenge?');
		}
		else if (perGates.other == 5)
		{
			md.write('<p>' + perGates.getPersonNameShort() + ' is very annoyed at your disturbance.');
		}
		else if (perGates.other >= 9 && perGates.other <= 13)
		{
			md.write(
				'<p>The old man is waiting for you, his apprentice, to return with a <b>magic stone</b> to prove your worth and begin your training.' +
				'<p>"Well then, my ' + perYou.getSex() + '," he says jovially.  "Have you found a stone yet?"</p>');
		}
		else if (perGates.other == 14)
		{
			md.write(
				'<p>' + perGates.getPersonNameShort() + ' gives you a warm smile.</p>' +
				'<p>&nbsp;"Ahh a young person with integrity," he says, "Thank you ' + perYou.getPersonName() + '. Now it is time for you to  your first spell."</p>' +
				'<p>"Are you ready?"<\p>');
		}
		else if (perGates.other == 15)
		{
			md.write('<p>"Go ahead," says ' + perGates.getPersonNameShort() + '. "Try to learn the spell"<\p>');
		}
		else if (perGates.other == 16)
		{
			md.write('<p>' + perGates.getPersonNameShort() + ' nods his head. "You are doing well my apprentice."</p><p>"Now use your power to find me a special artifact. It is an <b>old key</b> that was stolen from me two years ago."</p>');
		}
		else if (perGates.other == 17)
		{
			md.write('<p>' + perGates.getPersonNameShort() + ' nods his head in greeting. "You are doing well, my apprentice. Have you found the key that was stolen from me?."</p>');
		}
		else if (perGates.other > 18 && perGates.other < 21)
		{
			md.write('<p>The old man is very concerned. "My dear ' + perYou.getSex() + '," he says. "I have put you in grave danger. My enemy has broken into my vault, and even killed my guard in an attempt to steal the book.  Luckily I had already given it to you. I fear that my enemy will come after both of us."</p>');
			if (perYourBody.FindItem(39) === 0)
			{
				md.write(
					'<p>You are very confused by the statements and want to know more.<\p>' +
					'<p>' + perGates.getPersonNameShort() + ' dismisses your questions to order you, "Find the old key. It is our only hope."</p>');
			}
			else
				md.write('<p>"Do you have the key? Give it to me now!" says ' + perGates.getPersonNameShort() + '.<\p>');
		}
		else if (perGates.other >= 500 && !isMurderPath())  // Demanded book but still alive
		{
			md.write('<p>' + perGates.getPersonNameShort() + ' is taken aback by your rudeness and seems very intent on <i>not</i> allowing you to leave with the book.  He glares at you in an attempt to be menacing.  You\'re not sure if you should be laughing at him, or afraid of what he might do next.');
			if (perGates.other == 501)
			{
				md.write('<p>Unexpectedly, ' + perGates.getPersonNameShort() + ' stands up with a gun in his hand and aims it at your stomach. "I will <b>not</b> give you the book, and I suggest that you leave <b>immediately</b>!!" he declares defiantly.');
			}
		}
		else
		{
			if (perGates.other < 499) md.write('<p>' + perGates.getPersonNameShort() + ' greets his apprentice, "I hope that you are learning the magic arts." He gives you a wink. ');
			else md.write('<p>' + perGates.getPersonNameShort() + ' looks at you disappointed, waiting for you to leave his house. ');

			if (perGates.other < 23) md.write('"Whatever you do, never lose that book."<\p>');

			if (perYou.getQuestAftane() == 25) {
				md.write('<p>This is a most interesting and dangerous development.  Did anything else happen at the summoning of Kurndorf\'s spirit?"</p>');
			} else if (perYou.getQuestAftane() >= 50 && perKurndorf.getQuestRitual() < 200) {
				//ritual is ACTIVE
				md.write(
					'<p>' + perGates.getPersonNameShort() + ' looks at you, all humor gone from his face.  "As long as Kurndorf remains free in this realm he is a great threat to everyone in the city.  And beyond."</p>' +
					'<p>"You must go to him, offer to help him - but be warned," He says, waving a finger at you as if to stab you in the chest, "Kurndorf is a master manipulator.  He will lie, cheat, and steal to get his way."</p>' +
					'<p>"Trust <i>nothing</i> he says.  He will try to mislead you.  You <i>must</i> find a way to trick him and turn his plan against him." He says leaning back in his chair in exhaustion.  You find yourself realizing for the fist time how truly <i>old</i> ' + perGates.getPersonNameShort() + ' must be...  It is no wonder he was searching for your help.  He seems all but powerless to do much himself.</p>');
			}

			if (perYou.getQuestAftane() == 60 &&  perKurndorf.getQuestRitual() < 200)
			{
				if (!perKurndorf.checkFlag(1)) {
					md.write('<p>"You must find the skull from Kurndorf\'s own crypt," He says.  "You may be able to use it against him.  If only my own collection were complete," he rails, "I\'m afraid I do not have any history book that might give us a clue to its location."</p>');
				} else {
					md.write('<p>"You have it, don\'t you.  I can <i>feel</i> it on you." He says, motioning towards your backpack.  "Keep it close, and let us hope that Kurndorf is not paying close enough attention to recognize his own... face."</p>');
				}
			}
			if (perSarah.place == 192) md.write('<p>Sarah Gates is standing to one side of the room watching with interest. She seems to be trying to attract your attention.</p>');

		}
		/**************************  Response Section  *************************/

		startQuestions();

		if (perGates.other == 500) addQuestionC(md, '"I <i>must</i> have the book!"', "SirRonald", 500);
		else if (perGates.other == 501) addQuestionCO(md, 'wrestle for the gun', "SirRonald", 501);
		if (perGates.other > 5 && perGates.other < 499 && !perGates.checkFlag(2)) addQuestionC(md, '"What sort of mundane assistance can you offer?"', "SirRonald", 37);

		//If you've accepted his apprenticeship && Haven't Demanded the book,
		//and Have < $20, and don't already have Letter of Credit && its not already here
		if (perGates.other > 5 && perGates.other < 499 && perGates.checkFlag(2)) {
			if (nMoney < 20 && isItemNotHere(27, 17)) addQuestionC(md, '"Thanks again, ' + perGates.getPersonNameShort() + ', can I ask for some more assistance."', "SirRonald", 35);
			addLinkToPlace(md, "study the books in " + perGates.getPersonNameShort() + "'s library", '', '', '<img src="UI/books/occult' + String.fromCharCode(Math.floor(Math.random() * oImages.fixed.occult_books) + 97) + '.jpg" style="width:20%;float:right;margin-left:5px;margin-bottom:1em" alt="Occult Book">You read some of the occult works, occasionally asking questions of ' + perGates.getPersonNameShort() + '. Time flies by and an hour has passed before you know it', '', 'WaitHere(6);');
		}

		//The Blue Bottle Path Questions
		if (perDavy.getQuestBlueBottle() == 4) {
			//Know that Mrs Robbins sold the bottle to Sir Ronald Gates
			addQuestionC(md, '"' + perGates.getPersonNameShort() + '...  Did you recently, uh...  acquire  a little blue bottle?"', "SirRonald", 5904);
		} else if (perDavy.getQuestBlueBottle() == 5) {
			addQuestionC(md, '"I think that it was the source of Davy\'s power... I may be able to stop him with it."', "SirRonald", 5905);
		}

		if (perGates.other < 5) {
			startAlternatives(md);
			addQuestionC(md, '"I <i>demand</i> you give me the book!"', "SirRonald", 499);
		}
		if (perGates.other === 0) addQuestionC(md, "introduce yourself", "SirRonald", 30);
		else if (perGates.other == 1) addQuestionC(md, '"What do you mean, looking for someone?"', "SirRonald", 31);
		else if (perGates.other == 2) addQuestionC(md, '"What <i>gift</i> are you talking about?"', "SirRonald", 32);
		else if (perGates.other == 3) {
			addQuestionC(md, '"' + perGates.getPersonNameShort() + ', I accept your apprenticeship"', "SirRonald", 33);
			addQuestionC(md, '"' + perGates.getPersonNameShort() + ', I refuse your apprenticeship"', "SirRonald", 800);
		}
		//if (perGates.other < 5)	addOptionLinkC(md, "exit the house", 'LeaveMansionStudy()');
		if (perGates.other < 5)	endAlternatives(md);
		
		// Stuck!
		if (perYou.isStuck()) addOptionLink(md, '"' + perGates.getPersonNameShort() + ', I am not sure how to get back to town?"', "WaitforForDayNight('', 194,'type=limolift')");
				
		// Learn clairvoyance
		if (perGates.other == 14 || perGates.other == 15) addQuestionCO(md, 'try and learn the spell', "SirRonald", 314);
		else if (whereItem(4) == 999) {
			// Lost the book when shot
			addQuestionC(md, '"' + perGates.getPersonNameShort() + ', I have lost the book!"', "SirRonald", 999);
		}
		
		// Charmed spell query
		if (isSpellKnown("Charm") && !perGates.checkFlag(7)) addLinkToPlace(md, 'ask ' + perGates.getPersonNameShort() + ' about the Charm spell', Place, "type=askcharm");

		if (perYourBody.FindItem(39) > 0) {
			//Have the Rusty Key
			addOptionLink(md, "give " + perGates.getPersonNameShort() + " the old rusty key", "HandleItem(39,3,false)");
		}

		if (perYou.getQuestAftane() == 1) addQuestionC(md, '"What is in the safe?"',"SirRonald", 901);
		else if (perYou.getQuestAftane() == 10) addQuestionC(md, '"What am I supposed to do with the talisman?"', "SirRonald", 910);
		if (perKurndorf.getQuestGhost() >= 50) //Kurndorf Path (Seance and after)
		{
			if (perYou.getQuestAftane() == 11) addQuestionC(md, '"You know that enemy of yours?  I think he\'s back."', "SirRonald", 911);
			else if (perYou.getQuestAftane() == 12)
			{
				startAlternatives(md);
				addQuestionC(md, '"I... I was greedy.  I summoned him with a seance. I\'m so sorry!"', "SirRonald", 912);
				addQuestionC(md, '"That witch <i>tricked</i> me!  She summoned him and he tried to kill me!"', "SirRonald", 913);
				endAlternatives(md);
			}
			else if (perYou.getQuestAftane() == 15)
			{
				startAlternatives(md);
				addQuestionC(md, '"He offered to teach me the spell he was about to cast before he was killed...  A mass charm spell."', "SirRonald", 915);
				addQuestionC(md, '"He offered me nothing.  I left him there to rot in his own prison."', "SirRonald", 916);
				endAlternatives(md);
			}
			else if (perYou.getQuestAftane() == 20)
			{
				addQuestionC(md, '"Yes.  He would have taken over my body were it not for the Aftane."', "SirRonald", 920);
			}
			else if (perYou.getQuestAftane() == 25)
			{
				startAlternatives(md);
				addQuestionC(md, 'Lie - "No."', "SirRonald", 925);
				addQuestionC(md, 'Truth - "Well...  on the subject of creatures..."', "SirRonald", 926);
				endAlternatives(md);
			}
			else if (perYou.getQuestAftane() == 30) addQuestionC(md, '"Yes he did.  I tried to stop it, but it possessed a young girl and got away.  How can I stop it?"', "SirRonald", 930);
			else if (perYou.getQuestAftane() == 50 && perKurndorf.getQuestGhost() >= 100 && perKurndorf.getQuestRitual() < 200) addQuestionC(md, 'tell him about the ritual Kurndorf described', "SirRonald", 950);
			else if (perYou.getQuestAftane() == 51 && perKurndorf.getQuestGhost() >= 100 && perKurndorf.getQuestRitual() < 200) addQuestionC(md, '"What trick? Please tell me."', "SirRonald", 951);
		}
		if (perYourBody.FindItem(4) > 0 && perYou.checkFlag(11) && perYou.canUseExperience()) addOptionLink(md, 'ask ' + perGates.getPersonNameShort() + ' for help deciphering the passages in the book', 'spendExperience()');

		if (isDemonFreed() && !perGates.checkFlag(6)) addQuestionC(md, 'ask ' + perGates.getPersonNameShort() + ' about demons', "SirRonald", 666);
		
		if (perSarah.place == 192 && perSarah.other > 101 && !perGates.checkFlag(3) && (perLauren.checkFlag(8) || perGates.checkFlag(5))) addQuestionC(md, '"' + perGates.getPersonNameShort() + ' why is the Mansion locked at night?"', "SirRonald", 600);
		if (perLeanne.place == 382 && !perLeanne.checkFlag(7)) addQuestionC(md, 'ask ' + perGates.getPersonNameShort() + ' about saving Leanne', "SirRonald", 700);
		
		if (checkPersonFlag("Brandi", 15) && (!per.checkFlag(17) && !per.checkFlag(18) && !per.checkFlag(19) && !per.checkFlag(20))) addQuestionC(md, 'ask ' + perGates.getPersonNameShort() + ' to borrow his limo on the weekend', "SirRonald", 960);

	}

	if (perSarah.place == 192 && perSarah.other >= 101) {
		if (!perGates.checkFlag(3) && !perLauren.checkFlag(8) && bLocked) {
			addLinkToPlace(md, "go to the entry hall", 18, 'area=locked');
			addLinkToPlace(md, "exit the house", 18, 'area=locked');
		} else addLinkToPlace(md, "go to the entry hall", 18, 'area=entry');
		if (!bLocked) addLinkToPlace(md, "exit the house", 16);
	} else if (perGates.other > 499) addOptionLink(md, "back down and exit the house", 'LeaveMansionStudy()');
	else if (perGates.other >= 5) addOptionLink(md, "exit the house", 'LeaveMansionStudy()');

	if (perSarah.place == 192 && perSarah.other >= 100) {
		AddPeopleColumn();
		if (Math.random() < 0.5) perSarah.showPerson("sarah9b.jpg", "", "", "sarah1c.jpg");
		else perSarah.showPerson("sarah9b.jpg", "", "", "sarah1d.jpg");
	}

	WritePlaceFooter(md);
}