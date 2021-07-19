/****************************************************************
		Officer Becky Smith
****************************************************************/
function RepliesOfficerSmith(nR)
{
	//var bCharm = per.isCharmedBy();
	var perOS = per;
	var perD = findPerson("Diane");
	var myName = perOS.getYourNameFor();

	if (nR == 9301)
	{
		perOS.other = 2;
		if (checkPersonFlag("MrsGranger", 4)) addComments('<p>"The museum was a mess, ' + myName + '. After you were arrested we spent two hours scanning the place, gathering evidence."</p>');
		else addComments('<p>"The museum was a mess, ' + myName + '. After the guard shot Mrs Granger we spent two hours scanning the place, gathering evidence."</p>');
	}
	else if (nR == 9302)
	{
		perOS.other = 3;
		addComments('<p>"Oh yes, ' + myName + '.  The vase was found and placed in the museum\'s safe to prevent further disturbance."</p>');
	}
	else if (nR == 93100)
	{
		bChat = false;
		if (perOS.other < 100) {
			perOS.moveThem(168);
			perOS.other = 100; // Put Smith as wounded in Station
			perD.other = 900; // DA White is Dead
			perD.health = 0;
			DAReturnItems();
			if (perYourBody.FindItem(9) === 0) PlaceI(9, 168); // If don't already have it, drop a pistol on ground
			Place = 260;  // Set location to Jail Cell (empty one)
			perYou.setArrested(0);  // No Longer Under Arrest
			if (whereItem(4) == 999) moveItem(4, 76); // Put the book in Beasley's "office" for you to get.
			if (wherePerson("MrBeasley") !== 11) {
				movePerson("MrBeasley", 11); // Put Mr Beasley back in his office so you can get the book.
				moveDavyToHotel1();
			}
			if (!perYou.checkFlag(8)) perYou.setFlag(8);  // Set it so that you HAVE ASKED about the book
		}
		addComments(perOS.addPersonFace());
		addComments('<p>' + getOfficer() + ' Smith pulls her gun out. Moving like a professional, she exits the jail. - ');
		addComments('Gun shots echo from the police station, women scream, then a soft sound of crying is heard from the office.</p>');
	}
	else if (nR == 93101)
	{
		bChat = false;
		if (perOS.other < 101) {
			perOS.other = 101;
			Place = 214;
		}
		WaitHereOnly(6);
		perOS.place = 213;
		perOS.health = 60;
		WriteCommentsHeader();
		addComments(
			'<img src="Images/ambulance.png" style="float:left;width:20%;margin:0 10px 1em 0" alt="ambulance" title="ambulance">' +
			'<p>You call for an ambulance, which arrives within minutes.</p>' +
			'<p>Feeling responsible for your slave\'s condition you travel with her to the hospital.</p>'
		);
	}
	else if (nR == 1000)
	{
		perD.place = 261;
		addComments('<p>"Yes, I will tell her you have some vital information to confess", and Becky leaves. A little while later she returns with ' + getProsecutor() + ' White who demands you quickly tell her your information.</p>');
	}
	else if (nR == 1001)
	{
		perD.place = 168;
		addComments('<p>Angrily ' + getProsecutor() + ' White turns her back on you and stomps out of the room.</p>');
	}
	return true;
}


// Initialise

function initialiseOfficerSmith()
{
	// Officer Smith
	addPerson("Officer Smith", 261, "OfficerSmith", '', false);
	per.Replies = RepliesOfficerSmith;

	per.getPersonName = function(full) { return full !== true && this.isCharmedBy() ? "Slave Becky" : getOfficer() + " Rebecca Smith"; };

	per.getPossessionFace = function() { return "polg-face"; };
	
		// Popup evets for Bambi
	per.showEventPopup = function()
	{
		if (sType == "beckytransformbodyhaley") {
			CastTransform(1);
			this.dress = "Alanah";	
			showPopupWindow("Transformed",
				this.addPersonString("polg8.jpg", "height:max%", "right") +
				'Officer Smith\'s body starts to subtly change, filling out and becoming rounder, and her breast growing. Her face completely changes as if a different person is standing in fromt of you.<p>' +
				'<p>You tentatively as if she is alright and she replies and she is definitely still the same person she was before',
				'dispPlace()'
			);
			return true;
		}	
		if (sType == "beckytransformbodyalanah") {
			CastTransform(1);
			this.dress = "Haley";
			showPopupWindow("Transformed",
				this.addPersonString("polg8.jpg", "height:max%", "right") +
				'Officer Smith\'s body starts to subtly change, her breasts shrinking, and her figure slimming down. Her face changes as if a different person is standing in fromt of you.<p>' +
				'<p>You tentatively as if she is alright and she replies and she is definitely still the same person she was before',
				'dispPlace()'
			);
			return true;
		}
		
		if (sType !== "") return false;
		
		if (Place == 261 && this.dress === "") {
			showPopupWindow("Where is the guard?",
				"<img src='Images/People/OfficerSmith/pick.jpg' class='imgpopup' alt='Who'>" +
				'You look around for the guard and notice a photo stuck up on one wall, you see two women in the photo and one of them is quite familiar. You cannot quite place her.</p>' +
				'<p>You hear the guard approaching and you are sure one of them is the guard, but which one...' +
				addOptionLink("string", 'the one on the left', "findPerson('OfficerSmith').dress='Haley';bPopupShown=false;dispPlace(261)", "chatblock", "width:30%;margin-left:10%") +
				addOptionLink("string", 'the one on the right', "findPerson('OfficerSmith').dress='Alanah';bPopupShown=false;dispPlace(261)", "chatblock", "width:30%;margin-left:10%"),
				'', '', true, true, true
			);
			return true;
		}
		
		if (Place == 261 && !this.checkFlag(1)) {
		// Introduction for Becky Smith
			this.setFlag(1);
			showPopupWindow(getOfficer() + " Smith",
				this.addPersonString("polg0.jpg", "height:max%", "right") +
				getOfficer() + " Becky Smith is the youngest " + getOfficer(false) + " in the police department. She's a cadet and just recently finished her studies at the police academy.<br><br>" +
				"You know her from school, she was a senior year student when you just started your first year. You barely spoke to each other and you don’t think she would recognize you now, but you used to hang out once or twice when there was a big event in the school. " +
				"She was quite sure that she wanted to be an " + getOfficer(false) + " of the law back then already. She was really ambitious and was passionately interested in making the world a better, safer place. Maybe that comes from her father who’s a navy veteran.<br><br>" +
				"It looks like she's the jail guard here. They usually give the most boring jobs to the young cadets just so they can learn the ropes. She looks strict and serious patrolling between the jail cells every ten minutes."
			);
			return true;
		}
		if (Place == 261 && this.isCharmedBy() && this.checkFlag(2) && !this.checkFlag(3)) {
			showPopupWindow(this.getPersonName(),
				this.addPersonString("polg8.jpg", "height:max%", "right") +
				'"Your father wanted you to become a soldier, right?", you always wanted to ask that to her, but you were afraid you would hurt her feelings. Not anymore.<br><br>' +
				'"That’s right, Sir! My father trained me at home for years, he wanted me to join the navy SEALS just like he did to keep up the family traditions!", she answers monotonically. You come close to her and after you give a sheepish grin you start to rub your fingers against her pussy through her dress.<br><br>' +
				'"What happened then?", you ask curiously, rubbing your fingers harder.<br><br>' +
				'"I am a girl, Sir! He told me I am not good enough because I’m a girl and I can’t do all those hard and exhausting exercises right! After years and years of training he gave up and lost interest in me, Sir.", she tells you, her face still serious and doesn’t show any sign of feelings.<br><br>' +
				'"Does that make you unhappy? That’s why you chose to be an ' + getOfficer(false) + ' instead?", you ask again. You try your best to get her to climax, but it looks like she doesn’t feel anything!<br><br>' +
				'"Yes, Sir! I wanted to impress him, to show him I’m a good fighter too! But he did not want accept that and we became distant over the years, Sir!", she answers again like a machine. You stop what you’re doing and stand in front of her.<br><br>' +
				'"You don’t look sad or lost now, why? And what’s up with your sexual attitude? Aren’t you horny?", you ask her, she’s still wearing her statue-like face, but you know you have her full attention.<br><br>' +
				'"That’s because I am your slave, Sir! When you charmed me you gave me a new purpose in my life. To serve you, Sir!", Becky stops for a second.<br><br>' +
				'"If you want me to feel horny or sexual, you have to tell me, Sir! Order me, command me how and what to feel, Sir!", she continues.<br><br>' +
				"It seems when you charmed her, something in her personality has changed. You feel you have achieved what her father always wanted. She’s the perfect soldier and " + getOfficer(false) + " and she’s all yours!",
				"setPersonFlag('OfficerSmith',3)"
			);
			return true;
		}
		
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		// Recovery from the hospital
		if (Place == 213 && this.health == 99) {
			// She is recovered and can leave hospital
			this.health = 100;	// Fully well
			this.place = 261;		// To work
			md = WritePlaceHeader();
			this.showPerson("polg7-leaving.jpg");
			addPlaceTitle(md, "Discharging " + getOfficer() + " Smith");
			md.write(
				'<p>Becky Smith is standing next to her bed and looks like she starting to get dressed. Starting as she is wearing little more than her underwear that is. She sees you and cries out,</p>' +
				'<p>"' + perYou.getMaster() + '! you are here to see me off! The doctors cleared me and I am returning back to work on the police force!"</p>' +
				'<p>She is looking happy and reasonably healthy and you congratulate her on her recovery. She finishes dressing and you walk with her out of the ward. She asks you to come and see her at the police station whenever you can.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave the ward', 214);
			WritePlaceFooter(md);
			return true;
		}
		if (Place != 261) return false;
		
		if (sType == "beckystrip") {
			// Repeat sex scene
			md = WritePlaceHeader();
			this.showPerson("polg6.jpg");
			addPlaceTitle(md, getOfficer() + " Rebecca Smith");
			md.write(
				'<p>Becky pretends to lock herself in the cell. ' +
				'&quot;Oh take me ' + perYou.getMaster() + ', &quot; she begs. &quot;Make me do those nasty, disgusting things. Make me your bitch.&quot;</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, "talk more with Becky", 261);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmbecky1") {
			md = WritePlaceHeader();
			this.showPerson("polg2.jpg");
			addPlaceTitle(md, getOfficer() + " Smith Under a Spell");

			md.write(
				'<p>You cast a charm spell at the cop. She staggers as the magic takes effect.</p>' +
				'<p>Taking advantage of her weakness you order her to unlock the cell door. Unable to control her actions, she unlatches the lock.</p>' +
				'<p>"I don\'t know why I\'m doing this" she says. "Wait...I do know you...Do I?!"</p>' +
				'<p>She tries to reason what is going on. "You are ' + perYou.getPersonName() + '! From school!," ' +
				'she says, arousal coursing through her body. ' +
				'""You know me...I’m Becky. I went to the same school as you did!""</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, "order Becky to strip", Place, 'type=charmbecky2');
			if (!perYou.isArrested()) addLinkToPlace(md, "exit the jail?", 168);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmbecky2") {
			md = WritePlaceHeader();
			this.showPerson("polg3.jpg");
			addPlaceTitle(md, getOfficer() + " Smith Under a Spell");

			md.write(
				'<p>Becky begins to remove her clothes. She says, &quot;I suppose that, if you insist, ' +
				'then I have to follow orders. A good ' + getOfficer() + ' always does ' +
				'what she is told. Let me show you how we do a strip search in the police force.&quot;</p>' +
				'<p>She momentarily loses her speech as a wave of pleasure makes her body shudder.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "take Becky", Place, 'type=charmbecky3');
			if (!perYou.isArrested()) addLinkToPlace(md, "exit the jail?", 168);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmbecky3") {
			md = WritePlaceHeader(false, perYou.isMaleSex() && !isExplicit() ? "" : "td-left-large");	
			if (perYou.isMaleSex()) this.showPersonRorX("polg4b.jpg");
			else this.showPerson("polg4b.jpg");
			addPlaceTitle(md, getOfficer() + " Smith Under a Spell");

			md.write(
				'<p>You enjoy the pleasures Becky\'s body has to offer. You learn about her fantasies of ' +
				'being controlled by a dominant ' + perYou.getManWoman() +
				' and you swear to her that you are the ' + perYou.getMaster() +
				' she has been waiting for all her life.</p>' +
				'<p>Becky reacts excitedly by declaring her undying loyalty ' +
				'as your devoted slave...  between barely-muffled moans of pleasure, of course.</p>' +

				'<p>Her fitness is superb and her body seems insatiable as her sexual energy reaches multiple climaxes.</p>' +
				'<p>Unable to control herself, Becky cries out a loud moan. From the police station ' +
				'office you hear someone call out, &quot;Is everything alright in there Rebecca?&quot;</p>'
			);

			startQuestions();
			addLinkToPlace(md, "talk more with Becky", 261);
			if (!perYou.isArrested()) addLinkToPlace(md, "exit the jail?", 168);
			WritePlaceFooter(md);
			return true;
		}
		
		return false;
	};
	
	// Questions for Becky Smith
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place != 168 || sType !== "") return;

		if (this.other == 100) addQuestionC(md, 'call an ambulance for ' + getOfficer() + ' Smith', "OfficerSmith", 93101);

	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Using/Examining the Silver Ring
		if (no == 32 && cmd == 1) {
			// Examine the Silver Ring
			if (this.isHere() && this.isCharmedBy()) {
				examineSilverRingStart();
				addComments(
					'<p>It seems to be reacting to Becky\'s presence... getting warmer the closer you get.</p>' +
					'</td></tr></table>'
				);
				return "handled";
			}
		}

		// Casting the charm spell
		else if (no == 14 && cmd == 2) {
			// Jail Cells
			if (Place == 261) {
				if (wherePerson("Diane") != 261) {
					// Yell for attention
					CastCharmSpell("OfficerSmith", Place, 1, 'type=charmbecky1'); // Cast it on Officer Becky
					return "handled";
				}
			}
		}
		
		// Casting the transform spell
		else if (no == 18 && cmd == 2) {

			if (this.isHere()) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her.");
					return "handled";
				}
				if (!CastTransform(1, true)) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(Place, 'type=beckytransformbody' + this.dress.toLowerCase());
				return "nofooter";
			}
		}


		return "";		// do nothing
	};
}
