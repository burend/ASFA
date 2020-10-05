/****************************************************************
					DA White Responses
****************************************************************/
function RepliesDAWhite(nR)
{
	var perDA = per;
	var bCharm = perDA.isCharmedBy();
	var myName = perDA.getYourNameFor();
	var bCharmBatton = isCharmedBy("OfficerBatton");
	var plcBatton = wherePerson("OfficerBatton");
	bChatLeft = plcBatton != 168;

	// From Replies 29
	if (nR == 5701)
	{
		perDA.other = 2;
		addComments('<p>"I\'m glad to hear that you want to help," says the ' + getProsecutor() + '.</p><p>"We have evidence that you have been involved in criminal activity.');

		// If you were arrested and had the book on you
		if (perYou.getArrested() == 3) {
			if (wherePerson("MrsGranger") == 177) addComments(' The security guard at the museum gave a statement that you tried to attack her.  What do you have to say to this?"</p>');
			else addComments(' The security guard at the museum gave a statement that you ordered Mrs. Granger to attack her.  What do you have to say to this?"</p>');
		} else addComments(' We found property, a book, on you that we have been led to believe was stolen from the Gates Estate. Can you explain how you obtained that property?"</p>');
	}
	else if (nR == 5702) // Trying to leave the Station while She's Grilling you
	{
		perDA.other = 10;
		if (perYou.getArrested() === 0) {
			if ((whereItem(4) === 999 || whereItem(4) === 76) && isBeasleyServant()) {
				// If book was taken (Shot/or Confiscated)
				if (isMurderPath()) perYou.setArrested(2);  // Arrested for MURDER
				else perYou.setArrested(1);  // Attempted theft of Book
			} else perYou.setArrested(3); // Attempted theft of Vase
		}

		addComments('<p>"Trying to run away, are we? I don\'t think so," says the DA, motioning for ' + getPoliceChief() + ' Batton to handcuff you.</p><p>"You are under arrest. You have the right to..."');

	}
	else if (nR == 5703)  // Where is the book now
	{
		if (perDA.other === 15 || perDA.other === 3) perDA.other += 1; //Increment the path so you can't keep asking the stupid question
		if (!perYou.checkFlag(8)) perYou.setFlag(8);  // Set it so that you HAVE ASKED about the book


		if (!bCharm) // NOT CHARMED
		{
			addComments(
				'"Oh, I spoke to Mr. Beasley, the school teacher and occult expert about the Book, even I have heard the rumours about it.</p><p>' +
				'I was about to return the Book to the evidence locker and he offered to take the book to '
			);
			if (isMurderPath()) addComments('Miss Gates at the Estate. ');
			else addComments(perGates.getPersonName() + '. ');
			addComments(
				' He pointed out that an artifact of that value must have been stolen in the first place. I agreed to give him the Book...what...why did I do that it is against proceedures..."' +
				', the ' + getProsecutor() + ' says a little confused.'
			);
			if (perDA.other > 10) addComments('</p><p>"Now please go, you have no business here."');

			if (perDA.other < 4) perDA.other = 4;
			if (whereItem(4) === 999) moveItem(4, 76);  // Place the book with Mr. Beasley, ready to be picked up again
			if (wherePerson("MrBeasley") !== 11) {
				movePerson("MrBeasley", 11); // Put Mr Beasley back in his office so you can get the book.
				moveDavyToHotel1();
			}

		}
		else   			//  IS CHARMED
		{
			if (whereItem(4) == 76 || whereItem(4) == 999) // Lost the book and beasley has it
			{
				if (whereItem(4) == 999) moveItem(4, 76); // Put the book in Beasley's "office" for you to get.
				addComments(
					'"I spoke to Mr. Beasley, the school teacher and occult expert about the Book, even I have heard the rumours about it.</p><p>' +
					'I was about to return the Book to the evidence locker and he offered to take the book back to its original owner, ' + myName + '.  Please forgive me, ' +
					'I agreed to give him the Book...what...why did I do that it is against proceedures...I never should have given away what was rightfully yours.",' +
					', the ' + getProsecutor() + ' says a little confused.'
				);
				if (wherePerson("MrBeasley") !== 11) {
					movePerson("MrBeasley", 11); // Put Mr Beasley back in his office so you can get the book
					moveDavyToHotel1();
				}
			}
			else
			{
				moveItem(4, 168); // Place the book in the police station with you
				addComments('"I kept it safe for you ' + perYou.getMaster() + '.  I knew you would come to get it and I did not want anyone else to have a chance of stealing it away from you," she says, smiling.  "Have I done well?"');
			}
		}
	}
	else if (nR == 5704)
	{
		perDA.other = 15;  // Set to "Exhonerated
		DAReturnItems();
		perYou.setArrested(0); // Set you as NO LONGER UNDER ARREST

		setPlaceKnown("Hospital");	// Learn about the Hospital

		addComments(getProsecutor() + ' White glares at you. "I suppose it\'s just her word against yours since the only other witness, Mrs. Granger, is in ICU at the hospital."  She turns away from you dismissively.</p><p>"You\'re free to go, ' + perYou.getPersonName() + ' but don\'t leave town. Collect your possessions on the way out."');
	}
	else if (nR == 5705)
	{
		perDA.other = 10; // DA Has called for your Arrest
		if (perYou.getArrested() === 0) perYou.setArrested(3); // Under arrest for Attempted theft now.

		if (plcBatton === 168) {
			// Batton is @ the station
			addComments('<p>"A likely story," says the ' + getProsecutor() + ', motioning for ' + getPoliceChief() + ' Batton to handcuff you. "You are under arrest. You have the right to..."');
		} else {
			addComments('<p>"A likely story," says the ' + getProsecutor() + ', moving to handcuff you. "You are under arrest. You have the right to..."');
		}

		if (!bCharmBatton) Place = 260; // Officer Batton is NOT Charmed She Automatically Succeeds, Then you are thrown in jail
	}
	else if (nR == 5710)
	{
		perDA.other = 10;  // She tries to arrest you
		if (perYou.getArrested() === 0) {
			if ((whereItem(4) === 999 || whereItem(4) === 76) && isBeasleyServant()) {
				// If book was taken (Shot/or Confiscated)
				if (isMurderPath()) perYou.setArrested(2);  // Arrested for MURDER
				else perYou.setArrested(1);  // Attempted theft of Book
			} else perYou.setArrested(3); // Attempted theft of Vase
		}

		if (plcBatton === 168) addComments('<p>"A likely story," says the ' + getProsecutor() + ', motioning for ' + getPoliceChief() + ' Batton to handcuff you. "You are under arrest. You have the right to..."');
		else addComments('<p>"A likely story," says the ' + getProsecutor() + ', moving to handcuff you. "You are under arrest. You have the right to..."');

		if (!bCharmBatton) Place = 260; // Officer Batton is NOT Charmed She Automatically Succeeds, Then you are thrown in jail
	}
	else if (nR == 5711)
	{
		if (!isMurderPath()) {
			// Sir Ronald ALIVE
			addComments('"Let me verify that," says the ' + getProsecutor() + '. She calls ' + perGates.getPersonNameShort() + ' on her phone. After a brief discussion she hangs up and turns to you. "Yes, ' + perGates.getPersonNameShort() + ' says that it is true ');
			if (checkPersonFlag("MrsGranger", 4)) {
				perDA.other = 10; // DA Has called for your Arrest
				perYou.setArrested(3); // Under arrest for Attempted theft now.
				addComments(' but there is still the matter of your attempt to steal the Dragon Vase from the museum and we have the guards testimony." She stands ');
				if (plcBatton === 168) addComments('motioning for ' + getPoliceChief() + ' Batton to handcuff you. "You are under arrest. You have the right to..."');
				else addComments('moving to handcuff you. "You are under arrest. You have the right to..."');

			} else {
				addComments('. You may go without further questioning."');
				perDA.other = 15;
			}
		}
		else
		{
			perDA.other = 10;
			if (perYou.getArrested() === 0) {
				if (isMurderPath()) perYou.setArrested(2); // Gates DEAD,  Arrested for MURDER
				else if (perYourBody.FindItem(4) === 0 && (whereItem(4) == 76 || whereItem(4) == 46)) perYou.setArrested(3); // Doesn't have the book, so just attempted theft of Vase
				else perYou.setArrested(1); // Has book, So alleged theft of book
			}
			addComments('<p>"A likely story," says the ' + getProsecutor() + ', motioning for ' + getPoliceChief() + ' Batton to handcuff you. "You are under arrest. You have the right to..."');

			if (!bCharmBatton) Place = 260; // Officer Batton is NOT Charmed She Automatically Succeeds,  Then you are thrown in jail
		}
	}
	else if (nR == 5712) // DA escorts you to jail (batton not in the station)
	{
		bChat = false;
		addComments('You allow the ' + getProsecutor() + ' to escort you to the jail cell.');
		Place = 260;
	}
	else if (nR == 5713)
	{
		bChat = false;
		addComments(getPoliceChief() + ' Batton moves up, slaps cuffs on your wrists, and escorts you rather unceremoniously to the jail cell.');
		Place = 260;
	}
	else if (nR == 5714)
	{
		bChat = false;
		addComments(getPoliceChief() + ' Batton moves up and puts cuffs loosely around your wrists.  "You have the right to remain silent, and any time you say I will hold you against me..." she whispers into your ear as you move towards the cells.');
		Place = 260;
	}
	else if (nR == 5750) // Response For her After Being Thrown in Jail By Officer Batton
	{
	}
	else if (nR == 6000) // Response For her After Being Thrown in Jail By Officer Batton
	{
		if (wherePerson("MrsGranger") == 261) {
			movePerson("MrsGranger", 177);
			addComments('"Of course ' + myName + ' she is free to go and all charges are dropped"');
		} else {
			addComments('"Of course ' + myName + ' all charges are dropped and the police guarding her is recalled"');
			if (isCharmedBy("OfficerKhan")) movePerson("OfficerKhan", 168);
			else movePerson("OfficerKhan", 999);
		}
		setPersonFlag("MrsGranger", 3, false);
	}
	else if (nR == 7000)
	{
		perDA.other = 15;  // Set to "Exhonerated
		DAReturnItems();
		perYou.setArrested(0); // Set you as NO LONGER UNDER ARREST
		addComments('Diane White apologises and returns your possessions to you');
	}
	else if (nR == 9002)
	{
		if (perYou.isShot()) {
			// Lost book from being shot
			addComments('"I know that you do not have the book. It was taken from you after you were shot and taken to the hospital. That is why I am questioning you."');
			perYou.setInjury(3);
		} else addComments('"I know, we confiscated it from you when you were arrested for attempting to steal the vase from the museum."');

		perDA.other = 3;
	}
	return true;
}

function DAReturnItems()
{
	var perDA = findPerson("Diane");
	perDA.DropAllItems("You");
}

/***************** Initialise ******************************************************************************/

// Diane White
function initialiseDianeWhite()
{
	addPerson("Diane", 0, "Diane");
	per.extra = [0, 0, 0];		// expanded arbitrary data, 0 flags 32-64, 1 trial 2 arrest
	per.Replies = RepliesDAWhite;

	per.getPersonName = function(full) { return full !== true && this.isCharmedBy() ?  "Slave Diane" : getProsecutor() + " Diane White"; };
	per.getPersonAddress = function() { return this.checkFlag(30) ? 'Apartment 2, Haven Apartments' : ''; };

	per.getQuestArrested = function() { return this.extra[2]; };
	per.setQuestArrested = function(no) { this.extra[2] = no; };

	per.whereNow = function()
	{
		if (this.place == -1 || !this.checkFlag(30)) return this.place;
		if (isNight()) return 472;
		return this.place;
	};

	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		if (this.isCharmedBy()) {
			if (isCharmedBy("Gina"))
				return this.addPersonString("diane9.jpg", "height:max%", "right") +
					"The " + getProsecutor() + " sure has changed a lot since her becoming your pet. Gone are her fears and suspicions of you, instead she looks at you with sheer devotion and joy. Her knowledge of the law and order will come in handy in the fights you will face.<br><br>" +
					"She asked for a small room in the building so she can work privately without anyone to disturb her. She told you she wants to live here, close to you, so she’s always in reach if you need her.";
			else
				return this.addPersonString("diane9.jpg", "height:max%", "right") +
					"The " + getProsecutor() + " sure has changed a lot since her becoming your pet. Gone are her fears and suspicions of you, instead she looks at you with sheer devotion and joy. Her knowledge of the law and order will come in handy in the fights you will face.<br><br>" +
					"She asked for a small room in the building so she can work privately without anyone to disturb her. She told you she wants to live here, close to you, so she’s always in reach if you need her. She mentioned that she’s working on a case involving you. Gina, the museum guard filed a report against you, she wants to stop you from entering the museum area. Ms. White assured you that she will fix this little issue, but it can take some time…";
		} else return this.addPersonString("diane1.jpg", "height:max%", "right") + "The " + getProsecutor() + " investigating you, a smug-looking cool blonde lawyer.";
	};

	per.passTimeDay = function() {
		if (this.checkFlag(30)) this.setFlag(31);
		return '';
	};

	per.getPossessionFace = function() {
		if (!this.isCharmedBy()) return "diane8";
		return isOutside() ? "diane7-out" : "diane7-in";
	};

	per.isPlaceImageRight = function() {
		if (this.place == -1) {
			SetRightColumnSize("");
			return true;
		}
		return false;
	};

	per.showPlaceImageRight = function(md) {
		this.showPerson(isOutside() ? "diane7-out.jpg" : "diane7-in.jpg", undefined, undefined, undefined, undefined, undefined, md);
		if (sType !== "" && sType != "victoriascar") return;
		md.write('<div style="clear:both;">');
		addOptionLink(md, "talk to Diane", "gotoPlace(" + Place + ",'type=chatdiane" + (sType == "victoriascar" ? "&car=true" : "") + "')", "chatblock", "width:90%;max-width:90%;position:relative;top:-0.5em");
		md.write('</div>');
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 472 && this.isHere() && sType === "") return this.showPerson("diane-home.jpg", '', '', '', '', false, "string");
		return '';
	};

	per.showEventPopup = function()
	{
		if (Place != 168) return false;	// Police Station only
		
		// Under Arrest?
		if (getQueryParam("arrest") == "true") {
			// Arrived here and you are under arrest
			if (this.isCharmedBy() || (this.other == 900 && isCharmedBy("OfficerBatton"))) {
				// DA White is charmed so a little pointless being under arrest, show
				//Mrs. Granger, is in ICU at the hospital."
				if (this.other == 900) {
					showPopupWindow("Under Arrest, No You're Not!",
						findPerson("OfficerBatton").addPersonString("polb6.jpg", "height:max%", "right") +
						"Kerry Batton greets you are you are brought in to the Police Station,<br><br>" +
						'"Welcome ' + perYou.getMaster() + ' I see you have been getting into trouble again!"<br><br>' +
						'She gives orders that you are to be released and your arrest was a mistake.<br><br>' +
						'"Sorry ' + perYou.getMaster() + ', ' + (wherePerson("MrsGranger") == 275.5 ? 'Mrs. Granger, is in ICU at the hospital."' : ' please enjoy your visit here, and me."'),
						"setPersonFlag('OfficerBatton',4);dispPlace()"
					);
				} else {
					showPopupWindow("Under Arrest, No You're Not!",
						this.addPersonString("diane9.jpg", "height:max%", "right") +
						getProsecutor() + " White greets you are you are brought in to the Police Station,<br><br>" +
						'"Welcome ' + perYou.getMaster() + ' I see you have been getting into trouble again!"<br><br>' +
						'She gives orders that you are to be released and your arrest was a mistake.<br><br>' +
						'"Sorry ' + perYou.getMaster() + ', ' + (wherePerson("MrsGranger") == 275.5 ? 'Mrs. Granger, is in ICU at the hospital."' : ' please enjoy your visit here, and me."'),
						"setPersonFlag('OfficerBatton',4);dispPlace()"
					);
				}
				DAReturnItems();
				perYou.setArrested(0); // Set you as NO LONGER UNDER ARREST
				setPlaceKnown("Hospital");	// Learn about the Hospital
				return true;
			}
			return false;
		}

		if (sType == 'daappears') {
			// DA White appears (after asking to have Adele removed
			this.other = 31;
			this.place = 168;
			showPopupWindow(getProsecutor() + ' White',
				this.addPersonString("diane0.jpg", "height:max%", "right") +
				getPoliceChief() + ' Batton looks behind you as you give the order, and you hear a voice behind you. You turn and see a smug looking blond-haired woman,<br><br>' +
				'"Well I thought I was the ' + getProsecutor() + ' here, and I thought I knew all the people in the police force here. Why are you ordering my Officer here around?"<br><br>' +
				'You recognise her, Ms. Diane White the ' + getProsecutor() + ', she lives in a bigger city not far away from here, but this town is still under her supervision, that means every homicide case in the area comes directly to her. She seems suspicious of you, maybe you can alter her attitude towards you and show her a new world…the world of servitude.<br><br>' +
				'You apologise, explaining it was bad phrasing, and that you were requesting the removal of the ' + getOfficer() + ' so you can visit a friend at the Mansion.<br><br>' +
				'While you doubt she believes a word of what you said, she dismisses you, with terse words about police procedures and it is none of your business.'
			);
			return false;
		}
		if (sType == 'daappears2') {
			// DA White appears (after 'tell Kerry it\'s a bust' and later in the game)
			this.other = 31;
			this.place = 168;
			showPopupWindow(getProsecutor() + ' White',
				this.addPersonString("diane0.jpg", "height:max%", "right") +
				getPoliceChief() + ' Batton looks behind you as you give the order, and you hear a voice behind you. You turn and see a smug looking blond-haired woman,<br><br>' +
				'"Well I thought I was the ' + getProsecutor() + ' here, and I thought I knew all the people in the police force here. Why are you ordering my Officer here around?"<br><br>' +
				'You recognise her, Ms. Diane White the ' + getProsecutor() + ', she lives in a bigger city not far away from here, but this town is still under her supervision, that means every homicide case in the area comes directly to her. She seems suspicious of you, maybe you can alter her attitude towards you and show her a new world…the world of servitude.<br><br>' +
				'You apologise, explaining you were just joking around with Kerry.<br><br>' +
				'While you doubt she believes a word of what you said, she dismisses you, with terse words about how this is a police station not a <i>high-school</i> playground.'
			);
			return false;
		}

		if (sType !== "") return false;

		if (this.isCharmedBy() && this.checkFlag(1) && !this.checkFlag(2)) {
			showPopupWindow("Diane White",
				this.addPersonString("diane9.jpg", "height:max%", "right") +
				'"Talk to me, who are you? I haven’t seen you around here before…", you ask your ever loving lawyer.<br><br>' +
				'"My boss and friend offered me the case about you. She told me it was an easy case and it would gain me fame and reputation quickly.", Ms. White tells you and she stops working on her paperwork and seductively runs her finger through her hair.<br><br>' +
				'"Who’s this boss of yours?", you ask while you instruct her to lift her skirt and show you her panty.<br><br>' +
				'"She’s Helena Stone, ' + perYou.getMaster() + '. She’s well known and recognised in our community because she had some famous cases involving celebrities. The thing is; she always won no matter what side she was on, so in a few years she became a household name.", she smiles while she’s giving you a clear show of her panty and pussy. Her skirt is no longer on her.<br><br>' +
				'"Yeah, I’ve heard about her on the news. How did you become her assistant attorney?", you clap her for the show she put on for you and laughly ask.<br><br>' +
				'"It was simple, ' + perYou.getMaster() + '. She was looking for help and I was looking for a job. We became close friends and she says she doesn’t want to get rid of me because of the dedication she sees in me, ' + perYou.getMaster() + '.", your lawyer slave answers you, putting back the skirt and fixing her dress as you have ordered.<br><br>' +
				'"Hmm… could she be a problem? Won’t it be suspicious to her that you don’t want to return and want to live here?", you speculate.<br><br>' +
				'"Don’t worry for even a second, my ' + perYou.getMaster() + '! I will call her up and have a long chat with her. I’m going to cook up a great story to distract her!", Ms. White answers, her face is full of eagerness and passion to you .<br><br>' +
				"You wave your hand to continue her work, but you don’t feel all that relieved. You should return and ask her again about this problem later.",
				"setPersonFlag('Diane',2)"
			);
			return true;
		}
		if (this.other == 30) {
			// DA White appears (after charming Gina)
			this.other = 31;
			this.place = 168;
			showPopupWindow(getProsecutor() + ' White',
				this.addPersonString("diane0.jpg", "height:max%", "right") +
				'You see a tall blond haired woman talking to ' + getPoliceChief() + ' Batton, you recognise her as Ms. Diane White the ' + getProsecutor() + ', she lives in a bigger city not far away from here, but this town is still under her supervision, that means every homicide case in the area comes directly to her. She seems suspicious of you, maybe you can alter her attitude towards you and show her a new world…the world of servitude.<br><br>'
			);
			return true;
		}

		return false;
	};

	per.showEvent = function()
	{
		var md, perBatton, jailed, perMadison;
		
		if (Place == 269 && sType == "dianepool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("diane-pool.jpg");
			addPlaceTitle(md, "Swimming with Diane");
			md.write(
				'<p>Diane arrives and changes into a brightly coloured bikini and lays a towel and kneels while waiting for you to join her. She asks you,</p>' +
				'<p>"It is late and few are here, we could do more than just swim?"</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'well it is fairly private here', Place, 'type=dianepoolsex');
			addLinkToPlaceC(md, 'say goodbye to Diane', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "dianepoolsex") {
			md = WritePlaceHeader(false, 'td-left-large');
			this.showPerson("diane-pool-sex.jpg");
			addPlaceTitle(md, "More Than Swimming With Diane");
			md.write(
				'<p>You accept Diane\'s invitation to play here near the pool, just not in the water!</p>' +
				'<p>Later you do go for a swim with her, for a break as such.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'say goodbye to Diane', Place);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 168) {
			if (sType == "askaboutgina") {
				// Start of the missing document quest
				md = WritePlaceHeader();
				this.setFlag(17);
				this.moveThem(-1);
				this.extra[1] = 0;		// Reset queries for this quest
				this.showPerson("diane5.jpg");
				addPlaceTitle(md, "Gina\s Case");
				md.write(
					'<p>You ask, "Diane, how’s those charges against me holding up?"</p>' +
					'<p>Diane replies "Not well, ' + perYou.getMaster() + '! I’m trying my best here, to somehow smother it, but Gina seems relentless about it! That stupid woman thinks she can mess with you! Don’t worry, ' + perYou.getMaster() + '. I’m still working on it and I will find a sollution."</p>' +
					'<p>You ask, "You don’t need to…I have paid Gina a visit and let’s just say that I have reasoned with her and she decided to give in to my powers."</p>' +
					'<p>Diane replies "Wonderful, ' + perYou.getMaster() + '! That’s why you’re our leader after all. You solve every problem so quickly. So that bitch finally understands that you are the power around here!- the blonde bombshell beams at you with a proud look."</p>' +
					'<p>You ask, "That means I don’t have to worry about that anymore, right?"</p>' +
					'<p>Diane replies "Not quite, ' + perYou.getLord(false) + '! She could have already sent the required papers to the police or someone else before you brainwashed her! You did not her ask about that, right ' + perYou.getLord(false) + '?"</p>' +
					'<p>From the worried look on your face and your headshake she understands and continues."</p>' +
					'<p>Diane replies "You have to talk to her. Ask her…and maybe punish her for her arrogance! You must act quickly ' + perYou.getMaster() + '! If this blows wide open you are going to be in trouble and I won’t allow that! I’m going to fight for you till my last breath, but it would be convenient if we could prevent it!"</p>' +
					'<p>You ask, "Okay, I’m going to pay Gina a visit right now.- you notice Diane’s odd smirk and strange mimicry as if she is expecting something."</p>' +
					'<p>Diane replies "' + perYou.getMaster() + '! Please, take me with you. I could be useful to you! I will be your silent servant who watches your back and aid you, just what a servant does. Follows her ' + perYou.getMaster() + ' to the end of the world. Please, I need to be around! I can’t help it!"</p>' +
					'<p>You ask, "All right, tag along! Just for now! And we have to be very discreet, I don’t want to attract anymore unnecessary attention. Let’s go!</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'let\'s go', 167);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmdiane1") {
				// Charm Diane 1
				md = WritePlaceHeader();
				perBatton = findPerson("OfficerBatton");
				this.showPerson("diane2.jpg");
				addPlaceTitle(md, getProsecutor() + " White Under a Charm Spell");
				jailed = "";
				perYou.setArrested(0);	// No longer under arrest
				if (this.other < 15) this.other = 15; // Put DA Path @ Exonderated and Free
				else if (this.other == 50) {
					// DA was thrown in jail
					this.other = 49;  // No longer shows up in the Jail cell
					jailed = "&jailed=yes";
				}
				md.write(
					'<p>The ' + getProsecutor() + '\'s demeanor changes as you cast ' +
					'the spell. Fidgeting, she shrugs out of her jacket. "I\'ve been kind of ' + (perYou.isMaleSex() ? 'hard on' : 'strict with') + ' you," she ' +
					'says with a smile, one hand baring a nipple. &quot;And I think it\'s time for you to be ' + (perYou.isMaleSex() ? 'hard on' : 'strict with') + ' me.&quot;</p>'
				);
				if (perBatton.place == 168 && !perBatton.isCharmedBy()) {
					// Batton is NOT charmed & still here.
					md.write('<p>' + getProsecutor() + ' White looks over at ' + getPoliceChief() + ' Batton.  "I can handle this, Officer.  Why don\'t you go check on the cells in the back," she says.  ' + getPoliceChief() + ' Batton reluctantly agrees and heads off to the back of the station.</p>');
				}
				startQuestions();
				if (perYou.isMaleSex()) addLinkToPlace(md, "tell Diane White that you <i>are</i> hard", Place, 'type=charmdiane2' + jailed);
				else addLinkToPlace(md, "tell Diane White that you are <i>strict</i>", Place, 'type=charmdiane2' + jailed);
				addLinkToPlace(md, "exit the police station", 167, '', 'You leave ' + getProsecutor() + ' White for now and on the way out you retrieve your possessions', '', "DAReturnItems()");
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmdiane2") {
				// Charm Diane 2
				jailed = getQueryParam("jailed") == "yes" ? "&jailed=yes" : "";
				md = WritePlaceHeader();
				var bWasArrested = perYou.checkFlag(36);
				var bReturn = bWasArrested && this.NoItems > 0;
				if (bReturn) DAReturnItems();

				this.showPerson("diane3.jpg");
				addPlaceTitle(md, getProsecutor() + " White Under a Charm Spell");
				md.write(
					'<p>"Ohh" sighs the ' + getProsecutor() + '. "So you do want to play. Perhaps I can show you how the law works." She poses on the desk, her lips in a slight pout.</p>' +
					'<p>You smile smugly, the former ice queen transformed into another plaything.</p>'
				);
				if (bReturn) md.write('<p>Before you have her show you what the law is capable of, you ask her for your possessions that were confiscated. She hands you a box containing your items. You are distracted by the beautiful woman in front of you and put them to the side for now.</p>');
				startQuestions();
				addLinkToPlaceC(md, "ask Diane to show you what the law can do", Place, 'type=charmdiane3' + jailed);
				addLinkToPlace(md, "exit the police station", 167, '', 'You leave ' + getProsecutor() + ' White for now and on the way out you retrieve your possessions', '', "DAReturnItems()");

				WritePlaceFooter(md);
				return true;
			}			
			if (sType == "charmdiane3") {
				// Charm Diane 3
				jailed = getQueryParam("jailed") == "yes" ? "&jailed=yes" : "";
				md = WritePlaceHeader();
				this.showPerson("diane4.jpg");
				addPlaceTitle(md, getProsecutor() + " White Under a Charm Spell");
				md.write(
					'<p>&quot;I\'m so pleased that you asked,&quot; says Diane, removing the last item of her clothing. ' +
					'&quot;Let\'s get to it. Take me, ' + perYou.getMaster() + '.&quot;</p>'
				);
				startQuestions();
				addLinkToPlace(md, "take her", 168, "type=dianetake");
				addLinkToPlace(md, "return to the station reception area", 168);
				addLinkToPlace(md, "exit the police station", 167);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "dianelaw") {
				md = WritePlaceHeader();
				this.showPerson("diane4.jpg");

				addPlaceTitle(md, getProsecutor() + " White Under a Charm Spell");
				md.write(
					'<p>&quot;I\'m so pleased that you asked,&quot; says Diane, removing the last item of her clothing. ' +
					'&quot;Let\'s get to it. Take me, ' + perYou.getMaster() + '.&quot;</p>'
				);

				startQuestions();
				if (perYou.isMaleSex()) {
					addLinkToPlaceC(md, 'time for a de-briefing', Place, 'type=dianefuck');
					addLinkToPlaceC(md, 'ask her to work on a hard case', Place, 'type=dianebj');
					addLinkToPlaceC(md, 'she needs to get something off her chest', Place, 'type=dianetf');
				} else {
					addLinkToPlaceC(md, 'time for a de-briefing', Place, 'type=dianefuck');
					addLinkToPlaceC(md, 'ask her to lick a case', Place, 'type=dianebj');
					addLinkToPlaceC(md, 'you need to get something off your chest', Place, 'type=dianetf');
				}
				addLinkToPlace(md, "return to the station reception area", 168);
				addLinkToPlace(md, "exit the police station", 167);
				WritePlaceFooter(md);
				return true;
			} 
			
			if (sType == "dianefuck") {
				// Fuck her
				md = WritePlaceHeader(false, perYou.isMaleSex() ? '' : 'td-left-large');
				if (!isExplicit()) this.showPersonRandom("diane6" + (perYou.isMaleSex() ? "b" : "g"), 2);
				else this.showPersonRandomX("diane6" + (perYou.isMaleSex() ? "b" : "g"), perYou.isMaleSex() ? 3 :  2);

				addPlaceTitle(md, "Taking the Law");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You educate the ' + getProsecutor() + ' in the law, your law!</p>' +
						'<p></p>'
					);
				} else {
					md.write(
						'<p>You educate the ' + getProsecutor() + ' in the law, your law!</p>' +
						'<p></p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, "return to the station reception area", 168);
				addLinkToPlace(md, "exit the police station", 167);
				WritePlaceFooter(md);
				return true;
			} 
			
			if (sType == "dianebj") {
				// Oral
				md = WritePlaceHeader(false, 'td-left-large');
				if (isExplicit()) this.showPersonRandomX("diane10" + (perYou.isMaleSex() ? "b" : "g"), perYou.isMaleSex() ? 2 : 4);
				else if (perYou.isMaleSex()) this.showPerson("diane10ba.jpg");
				else this.showPerson("diane6ga.jpg");

				addPlaceTitle(md, "Taking the Law");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>You educate the ' + getProsecutor() + ' in the law, your law!</p>' +
						'<p></p>'
					);
				} else {
					md.write(
						'<p>You educate the ' + getProsecutor() + ' in the law, your law!</p>' +
						'<p></p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, "return to the station reception area", 168);
				addLinkToPlace(md, "exit the police station", 167);
				WritePlaceFooter(md);
				return true;
			} 
			
			if (sType == "dianetf") {
				// Titfuck/Breast play
				md = WritePlaceHeader(false, sType == "tf" && !perYou.isMaleSex() ? "td-left-large" : "");
				if (isExplicit()) this.showPersonRandomX("diane11" + (perYou.isMaleSex() ? "b" : "g"), 2);
				else if (perYou.isMaleSex()) this.showPerson("diane11ba.jpg");
				else this.showPerson("diane11ga.jpg");

				addPlaceTitle(md, "Taking the Law");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>You educate the ' + getProsecutor() + ' in the law, your law!</p>' +
						'<p></p>'
					);
				} else {
					md.write(
						'<p>You educate the ' + getProsecutor() + ' in the law, your law!</p>' +
						'<p></p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, "return to the station reception area", 168);
				addLinkToPlace(md, "exit the police station", 167);
				WritePlaceFooter(md);
				return true;
			} 
			
			if (sType == "dianetake") {

				md = WritePlaceHeader(false, "td-left-large");
				if (!isExplicit()) this.showPersonRandom("diane6" + (perYou.isMaleSex() ? "b" : "g"), 2);
				else this.showPersonRandomX("diane6" + (perYou.isMaleSex() ? "b" : "g"), perYou.isMaleSex() ? 3 :  2);

				addPlaceTitle(md, "Taking the Law");
				md.write('<p>You educate the ' + getProsecutor() + ' in the law, your law!</p>');
				startQuestions();
				addLinkToPlace(md, "return to the station reception area", 168);
				addLinkToPlace(md, "exit the police station", 167);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 472 && this.isHere()) {

			if (sType == "fuck") {
				// Sex scenes at her home
				md = WritePlaceHeader(false, isExplicit() && !perYou.isMaleSex() ? "" : "td-left-large");

				if (perYou.isMaleSex()) {
					if (isExplicit()) this.showPersonRandomX("diane-home-sex-b", 3);
					else this.showPerson("diane-home-sex-b.jpg");
					addPlaceTitle(md, "Diane's Advice");
					md.write('<p>You fully enjoy the body of Diane</p>');
				} else {
					this.showPersonRorX("diane-home-sex-g.jpg");
					addPlaceTitle(md, "Diane's Advice");
					md.write('<p>You fully enjoy the body of Diane</p>');
				}
				startQuestions();
				addLinkToPlaceC(md, 'talk more with Diane', Place);
				addLinkToPlace(md, 'exit the apartment', 471);
				WritePlaceFooter(md);
				return true;
			}
		}

		if (this.place != -1) return false;

		var perGina = findPerson("Gina");
		var perVictoria = findPerson("Victoria");

		if (sType == "victoriascar") {
			// In Victoria's Car
			md = WritePlaceHeader();
			perVictoria.showPerson("victoria_inside_car_beforesexscene.jpg");
			addPlaceTitle(md, "Victoria\'s Car");
			md.write(
				'<p>The car is a comfortable looking, simple, yet elegant black BMW. The three of you have easily enough space to yourselves without feeling claustrophobic.</p>' +
				'<p>"At last! I could use a rest! All this for a little paper that shouldn’t have to exist in the first place!", you say to your slaves as you drive through the town. Victoria, who silently watched over you the whole time, opens her mouth to ask something. She’s your personal secretary and closest slave, so you left her with a bit a free will, you know she uses that to serve you even better. That’s why she can ask questions anytime to you.</p>' +
				'<p>Victoria replies, "Ohh, ' + perYou.getMaster() + '! You look so tired! You definitely need a good sleep! I will take care of you. What’s this all about?" she politely asks, the look of sympathy and compassion on her face tells that she worried a lot while driving to you.</p>' +
				'<p>"Long story short, Gina, a security guard at the museum reported me for stealing an old artefact. She sent the compromising files to the media headquarters and I… had to retrieve myself…", you glance over to Diane who cast down her eyes to car’s floor in embarrassement.</p>' +
				'<p>You continue, "But at least Diane proved to be useful, she helped me out a lot." you add and you can see the hope coming back to Diane’s eyes. Without a word, she tenderly caresses your back and puts her head to back of your seat. She seems sentimental and emotional for a moment. You let her rest.</p>' +
				'<p>"So, when can I greet this Gina into our fold?" Victoria wickedly smiles. She knows you have already charmed Gina, she doesn’t rob your time to ask silly questions like that. How thoughtful of her!</p>' +
				'<p>You answer, "Soon, I guess. First, we have finish this what we started!"  Victoria thinks for a second and asks.</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, '"How about a little fun for the end of the day?"', 194, "type=victoriascarsex1");
			WritePlaceFooter(md);
			return true;
		}
		if (sType.indexOf("victoriascarsex") != -1) {
			// Sex in Victoria's Car
			var id = sType.substr(15);
			md = WritePlaceHeader(false, (perYou.isMaleSex() && id != "5") || id == "4" ? 'td-left-large' : '');
			if (perYou.isMaleSex()) {
				if (id == "1" || id == "3") perVictoria.showPerson("victoria_male" + id + ".jpg");
				else if (isExplicit()) perVictoria.showPersonX("victoria_male" + id + ".jpg");
				else if (id == "2") perVictoria.showPerson("victoria_male1.jpg");
				else perVictoria.showPerson("victoria_male3.jpg");
			} else perVictoria.showPerson("victoria_female" + id + ".jpg");
			addPlaceTitle(md, "Sex in Victoria\'s Car");
			if (perYou.isMaleSex()) {
				switch(id) {
				case "1":
					md.write(
						'<p>Victoria asks "How about a little fun for the end of the day? ' + perVictoria.getPersonName() + '! I know what you need right now!". Victoria bends over and starts to unbutton your jeans.</p>' +
						'<p>"Humph…you read my mind Victoria!", you ease yourself, open the up the safety belt and let yourself into Victoria’s capable hands!</p>' +
						'<p>Victoria says, "That’s why I’m your personal servant after all…", she sexily grins and tapes her mouth around your already erect penis. She is as gentle as an angel. She carefully adjust her body to not disturb you while you drive.</p>'
					);
					startQuestionsOnly();
					addLinkToPlaceC(md, '"Hmh…Diane…whatcha doing back there?!"', 194, "type=victoriascarsex2");
					break;
				case "2":
					md.write(
						'<p>You ask Diane without turning your head.</p>' +
						'<p>Diane answers, "I watch and learn, ' + perYou.getMaster() + '. I’m learning from Victoria on how to be a better slave for you!". Diane watched the whole show without interfering. You think she only needs a paper and a pen and she would even draw the postures to herself to later memorize them for you. That’s more than passion!</p>'
					);
					startQuestionsOnly();
					addLinkToPlaceC(md, '"All…right…! We are here…!"', 194, "type=victoriascarsex3");
					break;
				case "3":
					md.write(
						'<p>You can’t hold yourself anymore. You quickly find a place at the parking lot and finish your encounter with Victoria. You pull Victoria up and let her ride you.</p>' +
						'<p>Victoria says, "I’ve read some books about how to satisfy a men. Look!" Victoria doesn’t stop and takes you to the top, the two of you kiss. You let her off of your penis and fuck her on car’s seat. The elegant dress she was wearing is no longer visible, she pulled it down to her legs. Victoria starts to moan like a baby cat.</p>'
					);
					startQuestionsOnly();
					addLinkToPlaceC(md, '"I can see that! Diane, go see to that we are not disturbed!"', 194, "type=victoriascarsex4");
					break;
				case "4":
					md.write(
						'<p>You bark over to Diane, who was still in the car. She jumps out of the car and starts to patrol around the car casually. A normal person would think she’s waiting for someone.</p>' +
						'<p>Diane says, "Take your time, ' + perYou.getMaster() + '! Let yourself loose!" she encourages you from the other side of the car.</p>'
					);
					startQuestionsOnly();
					addLinkToPlaceC(md, '"That’s it! I can’t take it anymore!"', 194, "type=victoriascarsex5");
					break;
				case "5":
					md.write(
						'<p>You put Victoria to her knees and let your load onto her face. She smiles and swallows evertyhing she can!</p>' +
						'<p>"Did I do good? Tell me what to change next, anything!" she eagerly plays with a bit of drool left in her hair and starts to pull her dress up.</p>'
					);
					startQuestionsOnly();
					addLinkToPlaceC(md, 'You finish up', 197, "type=afterquest1",
						'<p>You hop out of the car and tell Victoria to show you the way to her place. You and Diane follow her, until the three of you are in her home at last. Victoria immediately pulls your hand and drags you into the bedroom, where she frees you from your clothes and puts you into bed. She even tugs you in. It all happens so fast, you can’t even react to it. You find yourself in your slaves’s oddly comfortable bed in a minute.</p>' +
						'<p>"I will take care of everything ' + perYou.getPersonName() + '! You just rest now. Diane and I will sort out the files and we are going to find the one you need! You need to sleep, you’ve been through a lot lately.</p>' +
						'<p>"Gee, okay Mom…" you laugh at the bit absurd situation you are in.</p>' +
						'<p>"He even has time for jokes…I can’t believe it… I have the best ' + perYou.getMaster() + ' in the world!" she dreamily says, like some kind of a fangirl.</p>' +
						'<p>Victoria closes the door and you sleep in a few moments later. You really were that tired!</p>',
						'', 'if (isDay()) { passTimeNight(); };passTimeDay(8);'
					);
					break;
				}
			} else {
				switch(id) {
				case "1":
					md.write(
						'<p>Victoria asks "How about a little fun for the end of the day? ' + perVictoria.getPersonName() + '! I know what you need right now!". and within a single second, Victoria is already vigorously masturbating next to you.</p>' +
						'<p>"Darling…what you are doing…turns me on so much!", you can’t take your eyes off her. Your beautiful slave puts up a lust-filled show for you. Right next to you!</p>' +
						'<p>"I know Mistress! Just enjoy it! This is what I live for…to please you!", she pulls up her black, silk dress revealing to you that she doesn’t wear panties. You just understand now how that dress fits her so well.</p>'
					);
					startQuestionsOnly();
					addLinkToPlaceC(md, '"What’s with this dress? Why are so elegant?"', 194, "type=victoriascarsex2");
					break;
				case "2":
					md.write(
						'<p>"What’s with this dress? Why are so elegant?" you ask, gathering all your willpower to focus on the road, while often glancing at Victoria.</p>' +
						'<p>Victoria answers "Ohh… I’m…I’m always…this elegant…needs….to…be for you, Mistress! I’m your…closest slave…after all…I…need to be… pretty for you anytime…" she spits out the words, struggling to maintain herself, she touches your crotch with her other hand.</p>'
					);
					startQuestionsOnly();
					addLinkToPlaceC(md, '"Turn over, show me that round ass of yours! "', 194, "type=victoriascarsex3");
					break;
				case "3":
					md.write(
						'<p>You order Victoria and she does as you have told so. Her legs are now in your lap, you can hardly control the wheel anymore.</p>' +
						'<p>"Hmphm…yesss…- she teases you more. Luckily, for the safety of you and your slaves, you arrive to your destination. You find a good spot to park the car and turn your attention to your slaves.</p>'
					);
					startQuestionsOnly();
					addLinkToPlaceC(md, '"That was…intense! Intense and dangerous. We could have crashed!"', 194, "type=victoriascarsex4");
					break;
				case "4":
					md.write(
						'<p>You tell them a bit, while recover yourself from the experience.</p>' +
						'<p>Victoria: Don’t worry ' + perYou.getPersonName() + '! Diane was watching over us, am I right?" Victoria winks at Diane, who hasn’t said a word on the way.</p>' +
						'<p>Diane answers, "That’s right, Mistress! Victoria and I shared a glance when she started her act to you! No harm would have come to you as I was looking to the road and would have grabbed the wheel from you in any risky case.". Diane answers truthfully. They both reassure you that you were safe the whole time. Victoria pulls you even closer, looks into your eyes and gives you a mouthfull kiss.</p>'
					);
					startQuestionsOnly();
					addLinkToPlaceC(md, '"It was a wild ride then! Let’s go, we’ve got things to do!"', 197, "type=afterquest1",
						'<p>You hop out of the car and tell Victoria to show you the way to her place. You and Diane follow her, until the three of you are in her home at last. Victoria immediately pulls your hand and drags you into the bedroom, where she frees you from your clothes and puts you into bed. She even tugs you in. It all happens so fast, you can’t even react to it. You find yourself in your slaves’s oddly comfortable bed in a minute.</p>' +
						'<p>"I will take care of everything ' + perYou.getPersonName() + '! You just rest now. Diane and I will sort out the files and we are going to find the one you need! You need to sleep, you’ve been through a lot lately.</p>' +
						'<p>"Gee, okay Mom…" you laugh at the bit absurd situation you are in.</p>' +
						'<p>"He even has time for jokes…I can’t believe it… I have the best ' + perYou.getMaster() + ' in the world!" she dreamily says, like some kind of a fangirl.</p>' +
						'<p>Victoria closes the door and you sleep in a few moments later. You really were that tired!</p>',
						'', 'if (isDay()) { passTimeNight(); };passTimeDay(8);'
					);
					break;
				}
			}
			WritePlaceFooter(md);
			return true;
		}
		if (sType.indexOf("afterquest") != -1) {
			// After the quest at Victoria's Apartment
			setPlaceKnown("DianesApartment");
			var ida = sType.substr(10);
			md = WritePlaceHeader(false, ida == "1" || ida == "3" || ida == "6" || ida == "7" ? "td-left-med" : "");
			this.showPerson("diane_victorias_home" + ida + ".jpg");
			addPlaceTitle(md, "Diane in Victoria\s Home");
			switch(ida) {
				case "1":
					md.write(
						'<p>Victoria’s home is a fancy and cozy apartment in the same time. It’s not too big, but it’s more than enough for one person. It’s a place of elegancy and style, with lots and lots of contemporary paintings and furniture. There’s only one bedroom, a living room, another single room and a medium-sized balcony, but they’re all designed perfectly.</p>' +
						'<p>After you wake up, you only find Diane in the living room, she looks tired. There’s documents scattered around the sofa she’s sitting in, she’s holding one in hand. Victoria is nowhere to be seen.</p>' +
						'<p>"Heyy Diane! Where’s Victoria?"</p>' +
						'<p>Diane answers "Good Morning sleepy-head! Ohh…I’m sorry, I didn’t want to call you sleepy-head, forgive me…you are the perfect ' + perYou.getManWoman() + ' in the world! Victoria is at the Antique ' + getShopStore(true) + ', attending to customers. She left me here to look after you.". Diane looks amazing, even when she’s exhausted from staying all night and working. She looks around nervously, bowing her to you in shame.</p>' +
						'<p>"Come on, you are now a bit too submissive… You don’t have to be, you’ve earned that yesterday, you’ve done well. And where’s all the naughtiness in you, I liked it when you’ve sent me all those slutty SMS\'s."</p>' +
						'<p>Diane exclaims "' + perYou.getMaster() + '! It’s complicated…it’s different when I’m around you, as if the aura around you commands me to behave like any other slaves."</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, '"I’m ordering you then, to behave like yourself and not like \'any other servant\'"', 197, "type=afterquest2");
					break;
				case "2":
					md.write(
						'<p>You then ask "Now, what about those papers?"</p>' +
						'<p>Diane answers, "I’m holding the ones in my hand, ' + perYou.getMaster() + '. Gina wrote some nasty things about you… Here they are!". Diane hands you the documents.</p>' +
						'<p>You ask "I don’t want to read them. I don’t care…destroy them. I charge you to destroy them and be careful about it!</p>' +
						'<p>Diane answers "As you wish, ' + perYou.getPersonName() + '! I’m going to collect my things and return to police station…"</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, '"No-no…Let’s celebrate first, if you know what I mean!"', 197, "type=afterquest3");
					break;
				case "3":
					md.write(
						'<p>"Ohh, yes! I’ve been waiting for you saying that!" Diane answers your order with confidence. She stands up and goes to window.</p>' +
						'<p>Diane continues "I don’t like it when others are watching. This body is only yours to watch and enjoy!" she rolls up the shutters on the window.</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, '"I can’t believe my eyes! That’s roundest ass I’ve ever seen!"', 197, "type=afterquest4");
					break;
				case "4":
					md.write(
						'<p>Diane replies, "Well! I do work out a lot at the gym! You could get a couple of nice asses like this there if you can’t get enough of mine!" She is dead serious and she drops her bra to the floor.</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, '"Hmm…continue!"', 197, "type=afterquest5");
					break;
				case "5":
					md.write(
						'<p>"Let’s get rid of these knickers, shall we, ' + perYou.getMaster() + '?" Diane drops her knickers on the floor too, next to her bra. She’s wearing only stockings and high heels.</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, '"Daaamn, I’m the luckiest ' + perYou.getManWoman() + ' in the world! Weren’t you a model or something before I met you?"', 197, "type=afterquest6");
					break;
				case "6":
					md.write(
						'<p>"No, I always wanted to keep myself to the perfect man. I never thought it would be you, but here you are and I’m naked. I can be YOUR model if you want." Diane lays down on the sofa, covering her naked breasts.</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, '"I knew you had a good body back at the police station..."', 197, "type=afterquest7");
					break;
				case "7":
					md.write(
						'<p>You tell her "I knew you had a good body back at the police station, when I first met you, but boy, did you topped my expectations!"</p>' +
						'<p>Diane replies, "Feast your eyes on me as long as you want. I’m not going anywhere, my love! This is your victory show!". Diane shows her pussy to you at last.</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, '"Oh, well… sit up Diane. I like how the sun lights your body."', 197, "type=afterquest8");
					break;
				case "8":
					this.place = 168;
					md.write(
						'<p>Diane answers "A true artist…' + perYou.getMaster() + ', what AREN’T you? You are so perfect!" she casually sits on the sofa, modeling for you.</p>' +
						'<p>You tell her, "Okay, that was enough! I have to go now, but don’t worry I will be watching you…and maybe bang you once in a while." you know this creepy and weird at the same time, but you don’t care and you know she certainly doesn\'t!</p>' +
						'<p>Before you lean Diane quicly take a card from her purse, "' + perYou.getMaster() + ' I work long hours but please visit some night at my home. I live in the Haven Apartments, in the Glenvale town center. Bang me up as much as you want there!". The card is a keycard type of access for an expensive security system, and she also writes down a password for you if needed.</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, 'leave the apartment', 194);
					break;
			}
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 302 && this.checkFlag(16) && !this.checkFlag(18) && !this.checkFlag(15) && !this.checkFlag(19)) {
			md = WritePlaceHeader();
			perGina.showPerson("ginaathome" + (this.extra[1] + 1) + ".jpg");
			addPlaceTitle(md, "Gina and Diane");
			md.write(
				'<p>You and Diane enter Gina’s front door. You call out for Gina, hoping that she’s home in this late hour. After a few seconds of silence and darkness, Gina turns on the light’s switch in the ante-room. She doesn’t recognise you first, but you can see her face changes from cautious to surprised then finally, delighted. She’s wearing only some underwear, it’s obvious you woke her up from her sleep. But you don’t care, you have business with her at once. Gina bows down in front of her ' + perYou.getMaster() + ', you hastily nod to that and order her to stand up. Gina smiles at you, but realizes your shadowy face.</p>' +
				'<p>' + perYou.getMaster() + '! To what do I owe the pleasure of having you in my home? How can I serve? – she doesn’t take her eyes from yours, but she quickly nods to Diane, greeting her fellow slave.</p>' +
				'<p>I’m in no mood for chit-chat! I have some questions and you have the answers! So just be on with it. – your sullen attitude makes her realize the urgency of this meeting. She leads you and Diane into her bedroom and offers you her bed to sit on it. You accept and lay down on her comfortable king-sized bed. Diane stands in attention, wordlessly waiting for an order, while Gina sits on the other size of the bed.</p>'
			);
			startQuestions();
			switch (this.extra[1]) {
			case 0:
				addQuestionR(md, '"Where are those documents?"',
					'"Where are those documents, Gina? The ones you have sent to the police!" you ask impatiently from Gina.</p>' +
					'<p>Gina replies, "Oh, damn it! I knew it that it will cause me trouble…' + perYou.getMaster() + ', please understand me… I already gave them to the TV station, to have the media broadcast it in the news. It was all before you…before you changed me, my ' + perYou.getMaster() + '! Please forgive me!</p>',
					"Gina",
					"setPersonOther(\\'Diane\\',1,2)"
				);
				break;
			case 1:
				addQuestionR(md, '"What? Why the TV station?"',
					'"The Police wasn’t convinced by the proof I brought, they said I was lying and to mind my own business. So I thought no other way than to go to the media. So people would talk about you and your actions."</p>',
					"Gina",
					"setPersonOther(\\'Diane\\',2,2)"
				);
				break;
			case 2:
				addQuestionR(md, '"So the police ' + getOfficer(false) + ' hushed you away?"',
					'"Yes, ' + perYou.getMaster() + '. They were already your servants at the time and I knew you had some magical powers, some wizardry was going on…"</p>' +
					'<p>You ask, "How?"</p>' +
					'<p>Gina replies, "My family is close with magic, my ancestors knew of mages and warlocks who possesed such powers, but my family members didn’t. So they only knew how to protect themselves from them. With amulets, trinkets and such. My mother used to tell stories of powerful wizards who controlled entire villages and they were ' + perYou.getMaster() + 's to thousands of slaves. I knew I had to expose your doings, because you are a magic handler yourself."</p>' +
					'<p>You ask, "Whew! Aaand you almost got me… Who is this pretty girl who took these papers?"</p>' +
					'<p>Gina replies, "Her name is Madison I believe…and yes it’s such a luck that you turned me into a slave before I could make my actions possible. If you would have waited a little longer, my terrible, bitchy old self would have caused you a lot of trouble. I regret anything I have done in the past…please, let me make try to fix them. I’m a good slave, I promise!"</p>' +
					'<p>You ask, "I know you are, but not now, I have to fix this mess you caused. Then I want to talk to you about your family and your history with magics."</p>' +
					'<p>Gina replies, "Of course! Anytime ' + perYou.getPersonName() + '! Anything to make it up to you!"</p>' +
					'<p>With that, you stand up and leave Gina’s house. You got all the info needed you needed, but you promised the lovely museum guard that you will return to her. Diane follows your trail, she is a bit occupied in her mind, maybe you should discuss it with her.',
					"Gina",
					"setPersonFlag(\\'Diane\\',19);gotoPlace(229)"
				);
				break;
			}
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 412 && this.place == -1 && !this.checkFlag(20)) {
			md = WritePlaceHeader();
			perMadison = findPerson("Madison");
			this.setFlag(20);
			perMadison.showPerson(perMadison.checkFlag(13) ? "madison17be.jpg" : "madison17.jpg");
			addPlaceTitle(md, "Madison and Diane");
			md.write(
				'<p>When you see Madison you call out, "Ahh, it’s good that you are here! I need you to help me out, now!", you don’t want to take your time with formalities like her kneeling before you. You get straight to the point just as you come into Madison’s room.</p>' +
				'<p>Madison answers, "Yes, I see ' + perYou.getPersonName() + '! How can I help ' + perYou.getMaster() + '?", she was packing her bag, she must have wanted to leave soon. It’s of great luck that you have catched her!"</p>' +
				'<p>You tell her, "Gina, the security guard at the museum has dropped a package full of records and papers at the post office and said you brought them here. I need them!"</p>' +
				'<p>Madison exclaims, "Ohh, yes! I didn’t know they were important to you, so I put them away to our storage area. It’s right behind my office, but the door’s closed and the TV station manager has the key to it.", she doesn’t hesitate a lot and doesn’t rave on about unimportant details. She’s straight on point. You can see she’s really trying to help.</p>' +
				'<p>You get to the point, "Right, where can I find the manager?"</p>' +
				'<p>Madison says, "She rarely comes. Once a week, and she already came by yesterday. I’m sorry ' + perYou.getMaster() + ', but no one else has keys to storage. Maybe we could pry the door open? Just tell me what to do ' + perYou.getMaster() + '." Madison smile is washed away, she’s serious and is ready to follow any instructions you give her.</p>' +
				'<p>She can’t help anymore, Diane, on the other hand, seems like wants to talk to you. Perhaps it would be wise to discuss with her on how to progress further…</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'return to the station reception', 371);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 412 && this.place == -1 && !this.checkFlag(20) && sType == "askdocuments") {
			md = WritePlaceHeader();
			perMadison = findPerson("Madison");
			this.setFlag(20);
			perMadison.showPerson(perMadison.checkFlag(13) ? "madison17be.jpg" : "madison17.jpg");
			addPlaceTitle(md, "Madison and Diane");
			md.write(
				'<p>"Now, will you help me now, slut?!" you deliver the words with anger, you are mad because Madison’s just wasting your time.</p>' +
				'<p>Madison replies, "Ohh, of course, ' + perYou.getMaster() + '! So sorry, for me being so ignorant! I did pick up the documents, but they’re in the storage room, right behind my office. The door to is closed though, and only the manager has the rights to open it."</p>' +
				'<p>You ask, "Aww, come on! Where’s this manager then?!"</p>' +
				'<p>Madison tells you, "She rarely comes. Once a week and she already came by yesterday. I am…so terribly sorry. If I can be useful in any way, just tell me, let me try to correct my previous behavior. I will stand guard until you come up with something, ' + perYou.getMaster() + '!"</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'return to the station reception', 371);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 304 && this.checkFlag(16) && !this.checkFlag(18) & !this.checkFlag(15) && !this.checkFlag(19)) {
			md = WritePlaceHeader();
			perGina.showPerson("ginamuseum" + (this.extra[1] + 1) + ".jpg");
			addPlaceTitle(md, "Gina and Diane");
			md.write(
				'<p>Diane opens the Museum entrance doors for you and follows you inside. You nervously look around for Gina, but all you see are a few tourists and visitors. Diane points to the security office and you rush towards there. You open the door and enter the somewhat small, yet oddly comfortable room. Gina is sitting in her chair, reviewing some papers. She turns around to check on who came in. When Gina notices you, she jumps from her chair and hurries to you. The curvy blonde museum guard stops right in front of you, kneels down and greets you.</p>' +
				'<p>' + perYou.getMaster() + ', you caught me off guard! I didn’t sense you were coming! How can I be of help to you?" she is like in heaven, you can feel it. Interestingly she is wearing a different uniform than usual. However you are still mad at her the things she done, so you order her to stand up.</p>'
			);
			startQuestions();
			switch (this.extra[1]) {
			case 0:
				addQuestionR(md, '"Where are those documents?"',
					'"Where are those documents, Gina? The ones you have sent to the police!" you ask impatiently from Gina.</p>' +
					'<p>Gina answers, "Ohh, so this is about the lawsuit…my ' + perYou.getMaster() + '…I think… I think I failed you. Please! Don’t be angry at me, but I have already forwarded the papers to TV station! A pretty girl from there previously picked them up from the post office and took them with her. It all happened before you have put me under your spell, but please… I was reckless and stupid…."</p>',
					"Gina",
					"setPersonOther(\\'Diane\\',1,2)"
				);
				break;
			case 1:
				addQuestionR(md, '"What? Why the media instead of the police?"',
					'"They acted strange, I knew something was not right. You see, ' + perYou.getMaster() + ', my family has a history with magic, we are not users of it, but we can sense when someone uses it. My family members could only protect themselves from magic by using enchanted necklaces, rings, bracelets and such.',
					"Gina",
					"setPersonOther(\\'Diane\\',2,2)"
				);
				break;
			case 2:
				addLinkToPlaceC(md, '"So you knew that ' + getPoliceChief() + ' Batton was in my power?"', 238, '',
					'<p>You ask, "So you knew that ' + getPoliceChief() + ' Batton was in my power? And I also  see why you could see through Diane’s lies…"</p>' +
					'<p>Gina replies, "Yes, ' + perYou.getMaster() + '. Excuse this worthless slave for wanting to expose your actions. This all happened before you made me realize what’s important in life; You."</p>' +
					'<p>You ask, "We will have to talk about your family’s history later… it’s interesting. However, let’s not change the subject, where can I get the documents? I need to destroy any evidence of the crime…"</p>' +
					'<p>Gina replies, "I understand. A pretty delivery girl from the TV station picked them up from the post office. I believe her name was Madison. Can I come with you, ' + perYou.getMaster() + '? I could protect you from any harm… I’m a skilled fighter."</p>' +
					'<p>You ask, "Of course not, I have enough unwanted attention as it is. And I already have Diane, who doesn’t leave my side a for second.", you half-jokingly grumble to yourself and sign to Diane to get ready to leave.</p>' +
					'<p>Gina replies, "I’m sorry, ' + perYou.getMaster() + '! I want to make it up to you! I promise I will come up with something!"</p>' +
					'<p>You let Gina kiss your hand and leave her office. It’s time to stop by at the TV station. Maybe Diane has a plan…',
					"Gina",
					"setPersonFlag('Diane',19)"
				);
				break;
			}
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "chatdiane") {
			// Chat to her while she is your follower
			md = WritePlaceHeader();
			this.showPerson("dianechat1.jpg");
			addPlaceTitle(md, "Chatting with Diane");
			md.write(
				'<p>You stop for a moment to talk to Diane.</p>'
			);
			startQuestionsOnly();
			// General Questions
			if (!this.checkFlag(24)) {
				addQuestionR(md, '"Can’t we just put a bail on this one?"',
					'You ask Diane, "Can’t we just put a bail on this one? I mean I practically own the police, so no harm would come to me. I could just leave the jail anytime I want if they would imprison me…."</p>' +
					'<p>Diane, "Technically, yes my ' + perYou.getMaster() + ', you could, but a procedure like this would take ages. You would have to go to court several times to prove you’re innocent or not and after that there would be still people who would keep an eye on you. I’m sure of it."</p>' +
					'<p>You ask, "I could just enslave the judge, the jury and everyone else…."</p>' +
					'<p>Diane, "You are not strong enough to charm a group of people at the same time. Your mana would deplete fast and you would fall into a swoon in an instant. I wouldn’t advise that, my ' + perYou.getMaster() + '!"</p>' +
					'<p>You ask, "It’s off to hunting documents then…what a great day!"</p>' +
					'<p>Diane, "Forgive me for dragging you into this, my wise ' + perYou.getMaster() + '. I know how terribly occupied you are with much important things, but this could not wait any longer."',
					"Diane",
					"setPersonFlag(\\'Diane\\',24)"
				);
			}
			if (!this.checkFlag(26)) {
				addQuestionR(md, '"How come you are so useless?"',
					'You ask Diane, "How come you are so useless? You can’t even deal with something so simple as this. You are a lawyer after all and this would be just an easy routine work for you…"</p>' +
					'<p>Diane, "I really tried my best, ' + perYou.getMaster() + '! I gave a shot to any idea I could think of. I tried to bribe her, I tried to threatened her. I even thought of accusate her for false claims, but nothing worked. She seemed reluctant and also relentless on punishing you. Gina hated you from the bottom of her heart."</p>' +
					'<p>You ask, "Why? I just tried to steal a vase. It’s not that big of a deal…"</p>' +
					'<p>Diane, "It is to her. Maybe you didn’t leave a great first impression on her, but she smelled something fishy when I visited her at her home. As if she knew that I’m your thrall."</p>' +
					'<p>You ask, "What did you do? I hope you didn’t slap her on the face or something…"</p>' +
					'<p>Diane, "No! Of course not, my Lord and ' + perYou.getMaster() + '! I introduced myself as the attorney who got your case and that I’m the one leading the investigation. But she didn’t buy it. I even  told her I didn’t like you too and tried to convince Gina that I’m on her side. I hated that part…having to say such things about you ' + perYou.getMaster() + '."</p>' +
					'<p>You ask, "Gina will be much more friendly from now on I assure you of that. But next time don’t let me come down and deal with petty things like this."</p>' +
					'<p>Diane, "I understand ' + perYou.getMaster() + '! Forgive me one last time for being incompetent…and I will also forget how Gina’s been a pain in the ass. She’s yours now and I will cooperate with her if I need to.',
					"Diane",
					"setPersonFlag(\\'Diane\\',26)"
				);
			}
			// At the TV Station
			if (getLocationOnMap() == 359 && !this.checkFlag(25)) {
				addQuestionR(md, '"It’s so strange, my Mum works here..."',
					'You explain to Diane, "It’s so strange, my Mum works here and I’ve been here a few times, but I didn’t know that they have a storage room or a mail-system."</p>' +
					'<p>Diane answers, "It’s obvious, ' + perYou.getMaster() + '. A lot of people write to the media for help or any other reasons. It’s a smaller town so the folks don’t really have much other option if they want something. It’s either the police or the Tv…"</p>' +
					'<p>You consider, "Yes, still it’s weird that how powerful the media can be."</p>' +
					'<p>Diane smiles, "Maybe you should consider owning the place, if you get my meaning. Imagine the possibilites." Diane naughtily lets out a giggle.',
					"Diane",
					"setPersonFlag(\\'Diane\\',25)"
				);
			}
			if (!isCharmedBy("Madison") && this.checkFlag(19) && !this.checkFlag(27)) {
				addQuestionR(md, '"You know this Madison?"',
					'Diane answers, "I’m not sure…the name doesn’t ring a bell, but I may have know her by face. We will have to see…"</p>' +
					'<p>You ask, "Hurry then…we might still find her at the station."</p>' +
					'<p>Diane says, "We need to be careful, ' + perYou.getMaster() + '. You may need to use your powers on her. We need to go prepared, so I advise that you replenish some of your mana if you can now. It’s all just for your good!"',
					"Diane",
					"setPersonFlag(\\'Diane\\',27)"
				);
			}
			if (!isCharmedBy("Madison") && this.checkFlag(19) && !this.checkFlag(28)) {
				addQuestionR(md, '"It’s useless to go to the police now, right?"',
					'You ask Diane, "It’s useless to go to the police now, right? I mean Miss Batton could assist us somehow."</p>' +
					'<p>Diane says, "I don’t think it’s a good idea to waste your time going there, My dear ' + perYou.getMaster() + '! We will run out of time."</p>' +
					'<p>You ask, "I hope you are right. I don’t want to go unprepared."</p>' +
					'<p>Diane says, "I’m here for you! ' + perYou.getPersonName() + ' I can handle many situations, just trust me ' + perYou.getMaster() + '! I won’t fail!"',
					"Diane",
					"setPersonFlag(\\'Diane\\',28)"
				);
			}
			if (this.checkFlag(20) & !this.checkFlag(21)) {
				addQuestionR(md, '"We are stuck…what should we do? We are running out of options here!!"',
					'Don’t panic ' + perYou.getMaster() + '! I’m here for you! We will find a way! Let me think… What about your magic powers? Could you use them here somehow? Do you have any spells that would help? – Diane remains cool, she is focusing on a solution rather than go to hysteria mode like yourself.</p>' +
					'<p>You rely, "Diane! You are a genius! I could kiss you! – you burst out in joy. In all the hurry, you forgot that you are magician and that such obstacle as a door would be no match for your powers.</p>' +
					'<p>Diane says, "I’m happy to serve ' + perYou.getMaster() + '! That’s why I’m here for! To have a clear head when you need it! – Miss White grins. A rush of excitement rushes through her body, she feels useful for her ' + perYou.getMaster() + '.</p>' +
					'<p>You quickly kiss your very own private lawyer, your slave as a gratitude and now focus on getting through that damned door.',
					"Diane",
					"setPersonFlag(\\'Diane\\',21)"
				);
			}
			if (getQueryParam("car") == "true" && !this.checkFlag(29)) {
				addQuestionR(md, '"Diane, how many files are in there?"',
					'<p>Diane says, "I haven’t counted yet ' + perYou.getPersonName() + '! Around a hundred or so. It will take some time to find the right one."</p>' +
					'<p>You ask, "Yeah, I know. Don’t worry, Victoria will help us. After we are done, you will need to bring back the box and it’s content to the station. Just tell Madison it’s the ' + perYou.getMaster() + '’s order. She will know what to do."</p>' +
					'<p>Diane says, "Yes, I will do as you want. It will be done in no time!"',
					"Diane",
					"setPersonFlag(\\'Diane\\',29)"
				);
			}
			if (getQueryParam("car") != "true") {
				addQuestionR(md, '"Diane, I need to do something else, please return to the Police Station for now"',
					'"Of course ' + perYou.getMaster() + ', but please hurry!"',
					"Diane",
					"movePerson(\\'Diane\\',168)",
					""
				);
			}
			addLinkToPlace(md, 'continue on', Place, getQueryParam("car") == "true" ? "type=victoriascar" : "");
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		return false;
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 168 && this.isHere()) {
			if (this.checkFlag(16) && !this.checkFlag(17)) addLinkToPlaceC(md, '"Diane, how\'s those charges against me holding up?"', Place, 'type=askaboutgina');
			else if (this.checkFlag(17) && !this.checkFlag(30) && this.place !== -1) {
				addQuestionR(md, '"Diane, let\'s get back to finding those documents"',
					'"Of course ' + perYou.getMaster() + '"',
					"Diane",
					"movePerson(\\'Diane\\',-1)"
				);
			}
		}
		if (Place == 416 && this.place == 412) addOptionLink(md, "open the door for Diane", "movePerson('Diane',-1);dispPlace()");
		else if (Place == 416 && this.place == -1) addLinkToPlace(md, 'take the box full of documents', 194, 'type=victoriascar', 'Now that you have the necessary items, all in a box, you decide it’s time to leave. You and Diane leave the storage room. Madison has been already instructed to open the backdoor for you to leave quietly. She tells you that everything is going to be all right and she will clear up after you. She ensures that no evidence of you being in the storage-room will remain. You let out a tired sigh and get a hold of yourself. You kiss Madison on the cheek as she closes the backdoor behind you. Victoria is already there, in the parking lot of the TV station. She waves at you and opens the car’s doors for your arrival. Diane sits in the back, right behind the driver’s seat, while you order Victoria to take the passenger’s seat. You drive, because you want to be at Victoria’s place as soon as possible.');
		else if (Place == 471 && this.checkFlag(30)) addLinkToPlace(md, "visit Diane's apartment", 472);
		else if (Place == 472 && sType === "") {
			if (this.isHere()) {
				// Diane's apartment
				addLinkToPlaceC(md, 'ask Diane for legal advice', Place, 'type=fuck');
				this.addSleepLink(md, "bed Diane", "Sleeping with Diane",
					'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:60%"><b>You take Diane to bed, but you see she wears a blind-fold, she explains she finds it helps her sleep, and also comes in useful for other \'kinkier\' things!</b>',
					'diane-bed.jpg', true, '', '', '', "overflow-y:hidden"
				);
			} else if (!checkPlaceFlag("ShoppingCenter", 4)) {
				addPopupLinkC(md, 'read the book', "Reading 'The Voynich Manuscript'",
					"<p><img src='UI/books/voynichbook.jpg' style='width:30%;float:right;margin-left:5px' alt='Book'>" +
					'You pick up the book and spend a while reading it, you had heard it was an old grimoir written in an untranslated code. You hoped your recent work with the Sacred Book of Control may give you an insight. Unfortunately it makes no sense to you, it has strange drawings and written in something that looks like an unknown language. The early part of the book discusses the grimoir and suggests it was a con-game to sell a rich person, a book purely created to defraud, skillfully made but gibberish. Probably this is what attracted Diane\'s interest, the fraud and the mystery.<br><br>' +
					'You are about to put it down as interesting but useless, and at the end of the book there is one of the strange symbols. For a moment the symbol glows and then fades as you feel a surge of mana flow into you. So mana can be enscibed on paper, but the symbol is just a drawing, there must have been some other knack to doing this not just the symbol...',
					false, "setPlaceFlag('ShoppingCenter',4);AddMana(10);WaitHere(6)");
			}
		}
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 416 && this.place == -1) {
			md.write(
				'<p>Now joined by Diane, the two of you look around, searching for the package. After a few bitter minutes of unsuccessful hunt for the papers, you sadly state to Diane,</p>' +
				'<p>"We will never find it here. We don’t have the time look through all this mess! Look at this; they are not even labeled! And what if someone sees us?!"</p>' +
				'<p>Diane says, "Don’t worry ' + perYou.getMaster() + '! Madison is standing guard outside. No one will notice for a while, but you are right. We don’t have much time. How about bringing all these packages to a safe place and dig through them there?"</p>' +
				'<p>You tell her, "No can do… there are camera outside! They would see us carrying huge bags of documents. Though I know someone who can help! I call Victoria, while you collect every document that has the date adressed in this month! She will come and pick up us!"</p>' +
				'<p>Diane answers, "At once! Give me a few minutes and it will be done!"</p>'
			);
			if (!this.checkFlag(22)) {
				addSMS(105);
				usePhone('sms');
				this.setFlag(22);
			}
		}
		if (Place == 472 && sType === "") {
			// Diane's apartment
			if (this.isHere()) {
				if (isVisible()) md.write('<p>Diane is waiting for you, wearing some lovely lingerie.</p>');
				else md.write('<p>Diane is relaxing, wearing some lovely lingerie.</p>');
			}
			if (!this.isHere() && !checkPlaceFlag("ShoppingCenter", 4)) {
				md.write('<p style="clear:both">');
				AddImage("UI/books/voynichbook.jpg", "20%", "left");
				md.write('You see some books neatly arrayed in a bookcase. Most are legal works of no interest to you but there are a few other general works. One attracts your attention, "The Voynich Manuscript", you have heard of it as claimed to be a grimoir.</p>');
			}
		}

	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			//Jail Cell
			if (Place == 260 || Place == 261) {
				if (this.other == 50)
				{
					if (CastCharmSpell("Diane", 168, 1, 'type=charmdiane1')) {
						// charm the DA
						this.other = 49; // Move her out of the jail cell
						perYou.setArrested(0); // No longer Under Arrest
					}
					return "handled";
					
				} else if (Place == 261) {
					if (this.isHere()) {
						if (CastCharmSpell("Diane", 168, 1, 'type=charmdiane1')) {
							// charm the DA
							this.moveThem(168);
							perYou.setArrested(0); // No longer Under Arrest
						}
						return "handled";
					}
				}
			}
			// Police Reception Area
			else if (Place == 168) {
				if (this.other > 0 && this.other < 900) {
					// DA White Path Active
					if (wherePerson("OfficerBatton") !== 168) {
						// Officer Batton is NOT HERE
						CastCharmSpell("Diane", Place, 1, 'type=charmdiane1');  // charm the DA
						return "handled";
					} else {
						// BOTH Officer Batton && DA White are HERE
						if (isCharmedBy("OfficerBatton")) {
							//Officer Batton is Charmed
							CastCharmSpell("Diane", Place, 1, 'type=charmdiane1');  // charm the DA
							return "handled";
						} else if (!this.isCharmedBy()) {
							// Neither are Charmed
							if (isSpellKnown("Shielded Charm")) {
								// Know Shielded Charm
								CastCharmSpell("Diane", Place, 1, 'type=charmdiane1');  // charm the DA
								return "handled";
							} else {
								addComments("Don't cast the spell here. It is too public.");
								return "handled";
							}
						}
					}
				}
			}
		}
		return "";		// do nothing
	};
	

	// Phone calls
	
	per.isPhoneable = function() {
		// Can you call them?
		return checkPlaceFlag("Hotel", 11) && Place == 269;
	};

	per.callThem = function() {
		if (Place == 269) {
			if (!(this.checkFlag(30) && isNight())) WriteComments("You call Diane to invite her to join you at the pool for a swim, but she apologies that she is busy with legal work." + (this.checkFlag(30) ? " She suggest you call back tonight and she will be happy to join you" : ""));
			else {
				gotoPlace(Place, 'type=dianepool');
				receiveCall('', 'You call Dian to invite her to join you at the pool for a swim, and she immediately answers that she will meet you there as soon as she can."');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};

	per.addPersonPhoneCall = function() {
		if (!this.isCharmedBy()) return false;		// All SMS's are post Charm for her
		var hr = getHour();
		var tm = this.hoursCharmed();
		var rnd = Math.floor(Math.random() * 72);
		if (tm > (12 + rnd) && hr > 19 && !this.checkFlag(3)) {
			// SMS 100, evening and 12 hrs after being charmed
			if (makeCall(true, 100)) this.setFlag(3);
		} else if (tm > (24 + rnd) && hr < 9 && !this.checkFlag(4)) {
			// SMS 101, morning and 24 hrs after being charmed
			if (makeCall(true, 101)) this.setFlag(4);
		} else if (tm > (12 + rnd) && !this.checkFlag(5)) {
			// SMS 102, anytime
			if (makeCall(true, 102)) this.setFlag(5);
		} else if (tm > (12 + rnd) && !this.checkFlag(6) && isCharmedBy("OfficerBatton")) {
			// SMS 103, anytime
			if (makeCall(true, 103)) this.setFlag(6);
		} else if (this.isCharmedBy() && isCharmedBy("Gina") && isCharmedBy("Victoria") && Place != 168 && getHour() < 9 && !this.checkFlag(16)) {
			// Ready for the Missing Document quest
			if (makeCall(true, 104)) this.setFlag(16);
		} else if (this.checkFlag(31) && !this.checkFlag(32)) {
			// after Missing Document quest
			if (makeCall(true, 106)) this.setFlag(32);

		}
		return false;
	};

	per.getPersonSMS = function(id) {
		switch(id) {
			case 100:
				return receiveSMS('Diane', 'Argh…all these paperwork can wait...im just having a break and dream about u being here… i miss u! the only thing keeping me here and not leaving immediately to kneel at your feet and worship is that u have commanded me to stay, to be ur personal attorney...', 'dianesms_allthesepaperwork.jpg') +
						 replyToSMS("I know it’s hard without me…:) But there’s tons of desk work needed to be done and this is how you can help me the best at the moment:)") +
						 receiveSMS('Diane', 'I know...im a good slave and i obey without question, i understand that you are busy but still...if i could lick ur feet for a minute…anyways…Love you ' + perYou.getMaster() + '!');
			case 101:
				return receiveSMS('Diane', 'Goooood morning to the ' + (perYou.isBornMale() ? 'handsomest, ' : '') + 'most beautiful ' + perYou.getManWoman() + ' in the world and the one makes my heart beat harder every second…my ' + perYou.getMaster() + '! Ur whore lawyer is currently dressing up for todays work…hope u can come by today:P', 'dianesms_morninglawyer.jpg');
			case 102:
				return receiveSMS('Diane', 'Are these the boobs u are looking for? yes! these are the boobs and body u are looking for!! aandd their yours to claim! Love u!', 'dianesms_boobsyouarelookfor.jpg');
			case 103:
				return receiveSMS('Diane', 'Kerry, the chief, sent me this….still laughing:))) she caught me….', (perYou.isBornMale() ? 'dianesms_howthemaster' : 'dianesms_howthemistress') + '.jpg', '88%');
			case 104:
				return receiveSMS('Diane', perYou.getMaster() + ', please come by my office when you can. We need to talk about Ginas court case againts you!!! Ohh '  + perYou.getManWoman() + ' im worried about it!');
			case 105:
				return replyToSMS("Slave! i need you to come and get us! we are in the tv station…come with a car now!") +
							 receiveSMS('Victoria', 'On my way, ' + perYou.getMaster() + '!') +
							 replyToSMS("Wait for us at the back of the building…madison gonna open the backyard door for us") +
							 receiveSMS('Victoria', 'Yes ' + perYou.getMaster() + '!');
			case 106:
				return receiveSMS('Diane', 'Its done ' + perYou.getMaster() + '…you are no longer reported for anything:DD have fun! xoxo, Diane');

		}
		return '';
	};

}

