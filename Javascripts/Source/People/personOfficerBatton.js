/*****************************************************
Officer Batton + Trial
******************************************************/

/************************ Trial *********************/
function RepliesTrial(nR)
{
	var perDA = findPerson("Diane");
	var npc = "Police Officer";
	if (nR == 3 || nR == 6) npc = "Judge Gabel";
	var perKhan = findPerson("OfficerKhan");

	if (isMurderPath()) {
		// ******************** BEGIN Accused of Murder *****************
		if (nR == 3)
		{
			npc = getOfficer() + " Khan";
			if (perKhan.getPath() > 0) {
				// Officer Khan Charmed
				npc = getOfficer() + " Mitchel";
			}
			perDA.extra[1] = 6;
			addComments('<p><b>' + npc + '</b></p>');
			addComments('<p>"Very well," says the judge. "' + npc + ', please present the evidence."</p>');
		}
		else if (nR == 6)
		{
			perDA.extra[1] = 7;
			addComments('<p><b> Judge Gabel</b></p>');
			addComments('<p>"All right. Call for your witness."</p>');
		}
		else if (nR == 71) // 7-1
		{
			addComments('<p><b>Calling a Witness</b></p>');
			addComments('<p>You call your mother to the stand."</p>');
			perDA.extra[1] = 15;
		}
		else if (nR == 72) // 7-2
		{
			perDA.extra[1] = 30;
			addComments('<p><b>Calling a Witness</b></p>');
			addComments('<p>You call Mr Beasley to the stand."</p>');
		}
		else if (nR == 151) // 15-1
		{
			perDA.extra[1] = 20;
			addComments('<p><b>Your Mother</b></p>');
			addComments('<p>"Oh my goodness!" exclaims your mother. "You didn\'t cook dinner, your sister did. You must have murdered poor ' + perGates.getPersonNameShort() + '!"</p>');
		}

		else if (nR == 152) // 15-2
		{
			perDA.extra[1] = 16;
			addComments('<p><b> Judge Gabel</b></p>');
			addComments('<p>The judge eyes your suspiciously. "If you were there and saw the murder then who did it?"</p>');
		}
		else if (nR == 161) // 16-1
		{
			perDA.extra[1] = 20;
			addComments('<p><b> Judge Gabel</b></p>');
			addComments('<p>"Lies," says the judge. "Witnesses saw Mr Beasley at the school all day. You must be the murderer yourself."</p>');
		}
		else if (nR == 162) // 16-2
		{
			perDA.extra[1] = 16;
			addComments('<p><b> Judge Gabel</b></p>');
			addComments('<p>"Nonsense," says the judge. "Please tell us now who murdered ' + perGates.getPersonName() + '."</p>');
		}
		else if (nR == 35) // Give the Judge the Threatening Letter from Davy
		{
			if (perDA.FindItem(36) != 1000) {
				AddCash(100);
				perDA.extra[1] = 35;
			}
			perDA.RemoveItem(36);

			addComments('<p><b> Judge Gabel</b></p>');
			addComments('You hand the judge your letter. A frown crosses his face as he quickly reads it.  Impressed by the evidence, he grants you ' + sCurrency + '100 in compensation for the inconvenience and help in tracking down the criminal Davy Robbins.');
		}

	} else {
		//*************  Accused of THEFT ***************
		switch (nR)
		{
			case 3:
				perDA.extra[1] = 6;
				addComments('<p><b>Museum Guard Gina</b></p>');
				addComments('<p>"Very well," says the judge. "Gina, please give your testimony."</p>');
				break;

			case 6: // Tell them that you were trying to stop Mrs Granger
				perDA.extra[1] = 7;
				break;

			case 7: // Wait for the DA to present more evidence
				perDA.extra[1] = 10;
				break;

			case 10:
				perDA.extra[1] = 30;
				addComments('<p><b>' + getProsecutor() + ' White</b></p>');
				addComments('<p>She looks at you, seemingly quite surprized.  "What?  I mean... but you confessed!?" she stammers.</p>');
				break;

			case 35:
				if (whereItem(8) != 1000) {
					// Haven't already handed him the letter
					AddCash(100);
					perDA.extra[1] = 35;
				}
				perDA.DropItem(8, 1000);

				addComments('<p><b> Judge Gabel</b></p>');
				addComments('You hand the letter to the judge. He is impressed by the evidence and rewards you ' + sCurrency + '100 for the inconvenience and help in tracking down the criminal Davy Robbins.');

			break;
		}
		// ********************** END Accused of THEFT *****************
	}
	return true;
}


/****************************************************************
	Police Chief Officer Batton
****************************************************************/
function RepliesOfficerBatton(nR)
{
	var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();
	var perBatton = per;
	var perKhan = findPerson("OfficerKhan");

	if (nR == 5215) // v52 = 15 Officer Khan Path, Shot by Anita and DEAD
	{
		if (this.other < 10) this.other = 10;

		if (this.place === 168) this.place = 1;  // Kerry is @ the station, now Kerry is out investigating Officer Khan's Murder

		movePerson("Sarah", 1); // Sets Sarah Gates (Sir Ronald's Niece in town)
		movePerson("AdeleRoss", 16);	// Set Gates Estate as Blocked (to protect Sarah)
		setPersonFlag("AdeleRoss", 1);
		perKhan.health = 0;
		perKhan.place = 1000;

		bChat = false;
		addComments(this.addPersonFace());
		if (!bCharm) {
			// Officer Batton Normal
			addComments('"You heard she was murdered?  From whom?  Wait, never mind," she says, nodding her head decisively. "I\'m going to get to the bottom of this myself."<br>');
		} else addComments('"Murder?" She asks, then nods her head decisively.  "Yes ' + myName + '.  I will see what I can find out."<br>');
	}
	if (nR == 5216) // v52 = 15 Officer Khan Path, Shot by Anita, and ALIVE
	{
		if (this.other < 10) this.other = 10;

		if (this.place === 168) this.place = 1;  // Kerry is @ the station, now Kerry is out investigating Officer Khan's Murder

		movePerson("Sarah", 1); // Sets Sarah Gates (Sir Ronald's Niece in town)
		movePerson("AdeleRoss", 16);	// Set Gates Estate as Blocked (to protect Sarah)
		setPersonFlag("AdeleRoss", 1);
		perKhan.health = 60;
		perKhan.place = 213;

		bChat = false;
		addComments(this.addPersonFace());
		if (!bCharm) {
			// Officer Batton Normal
			addComments('"You heard she was shot and in hospital?  From whom?  Wait, never mind," she says, nodding her head decisively. "I\'m going to get to the bottom of this myself."<br>');
		} else addComments('"Shot?" She asks, then nods her head decisively.  "Yes ' + myName + ', she is badly wounded and in hospital.  I will see what I can find out."<br>');
	}
	else if (nR == 5750) //v57 DA Path = Throwing the DA into Jail
	{
		addComments('"As you wish, ' + myName + '," she says, with an evil grin - immediately cuffing the ' + getProsecutor() + ' and dragging her off to the jail cell.  You delight in listening to Ms. White\'s angry and confused protestations as they leave.');

		setPersonOther("Diane", 50);	 // Sets the DA White Path as her being in Jail
		DAReturnItems();
		perYou.setArrested(0); // Sets you as NOT under arrest
	}
	else if (nR == 9910) // v99 = 10  Officer Batton getting back from investigating Khan's murder
	{
		if (!bCharm) addComments('"I\'m not at liberty to discuss an ongoing investigation, especially with a civilian," she says, turning back to her work and ignoring you.  You doubt there is any way to get her to talk through <i>normal</i> means.');
		else {
			this.other = 11; //Batton's Path

			//If she's still alive Put Anita in her hiding place in the French Classroom
			var perA = findPerson("Anita");
			if (perA.other != 101 && perA.other < 900) {
				if (perKhan.isDead()) addComments('"Several witnesses claim that they saw Anita, the alleged murderer, run to the school," she says as she presses her ample breasts against your body.  Evidently her desire for your attention outweighs her concern for her deceased co-worker.</p><p>"She was last seen entering Ms Jones\'s office, but there was no trace of her there."');
				else addComments('"Several witnesses claim that they saw Anita, the alleged shooter, run to the school," she says as she presses her ample breasts against your body.  Evidently her desire for your attention outweighs her concern for her injured co-worker.</p><p>"She was last seen entering Ms Jones\'s office, but there was no trace of her there."');
				perA.other = 100;
				perA.place = 252;
				movePerson("MsJones", 145);
				setPlaceKnown("FrenchClassroom");  // Set Ms Jones, French Classroom as known
			}
			else if (perA.other >= 900) //She was shot dead, currently in the Park
			{
				if (perA.other === 900) perA.other = 901;  //Her body is still in the park, "Move" her body
				addComments('<p>"Her body was found in the park, ' + myName + ', a bullet wound in her chest.  She was still clutching her gun with her so the ' + getProsecutor() + ' has decided to rule her death a justifiable homicide and is not investigating further."</p>');
			}

		}
	}
	else if (nR == 10201) // Is Gates Estate Blocked by Police.
	{
		movePerson("AdeleRoss", 436);	// Leave the estate and go home
		setPersonFlag("AdeleRoss", 2);
		addComments(
			'"The Mayor insisted that we give extra protection to the Gates mansion after the recent string of burglaries, but if they are in your way, I will of course remove them immediately."</p>' +
			'<p>As you wish, ' + myName + '.  I will call her back from the estate immediately," she says, picking up her radio and calling in the order,</p>'
		);
		if (checkPersonFlag("MrBeasley", 3)) addComments('<p>"' + getOfficer() + ' Ross, please return to the station...What about your sister...Alright you may take the rest of today off duty".</p>');
		addComments('<p>She tells you, "It is done, ' + myName + '.  Would you like to play with me some more?"');
	}
	else if (nR == 10202) // Is she the older sister of Amy Ross
	{
		setPersonFlag("AdeleRoss", 3);
		addComments('"Oh, you know her sister? ');
		if (checkPersonFlag("MrBeasley", 3)) addComments(getOfficer() + ' Ross asked to go home as her sister has gone missing". You explain how Amy is a friend of yours but had not heard she was doing anything. You will have to check with her big-sister when you have the time.');
		else addComments(' Is she one of your slaves too?"');
	}
	else if (nR == 9000) // v90 = Has been shot - response given after getting out of hospital
	{
		if (whereItem(31) === 0) PlaceI(31, 45); // Put the whistle in the Kitchen

		bChat = false;
		addComments(this.addPersonFace());
		if (bCharm) addComments('"I am so sorry I could not protect you, ' + myName + '," she whispers to you, tears welling up in her eyes from her shame. "Here take this whistle.  One blow and police will be there to protect you. Be careful ' + myName + ', your attacker is still out there."</p><p>Your slave then leaves to finish her other duties.');
		else addComments('"I understand your situation,' + myName + '," says ' + getPoliceChief() + ' Batten. "You do not want to get shot again and your attacker is still on the loose. Here, take this whistle in case you need police assistance.  One blow and we\'ll be there as fast as we can."</p><p>' + getPoliceChief() + ' Batton then quickly leaves to continue the search.');
	}
	else if (nR == 1131) //Hint about the Dragon Vase being IN the safe after the scuffle
	{
		//This only fires if Batton is CHARMED
		setPlaceFlag("Museum", 3);
		setPlaceFlag("Museum", 4);
		if (checkPersonFlag("MrsGranger", 1)) addComments('"Oh yes, ' + myName + '.  Mrs. Granger is still in the ICU, I believe." She says, trying to tempt you with her body.</p><p>"And the vase was locked in the safe for protection.  Oh my!" She says realizing she may have done something wrong.</p><p>"You didn\'t <i>want</i> the vase did you ' + myName + '?  I\'m so sorry!"</p>');
		else if (wherePerson("MrsGranger") == 261) addComments('"Oh yes, ' + myName + '.  Mrs. Granger is locked in the jail." She says, trying to tempt you with her body.</p><p>"And the vase was locked in the safe for protection.  Oh my!" She says realizing she may have done something wrong.</p><p>"You didn\'t <i>want</i> the vase did you ' + myName + '?  I\'m so sorry!"</p>');
		else addComments('"Oh yes, ' + myName + ', she says, trying to tempt you with her body. "The vase was locked in the safe for protection.  Oh my!" She says realizing she may have done something wrong.</p><p>"You didn\'t <i>want</i> the vase did you ' + myName + '?  I\'m so sorry!"</p>');

		var perS = findPerson("OfficerSmith");
		if (perS.isCharmedBy() && perS.other < 3) {
			//Officer Becky IS CHARMED and you haven't asked this question already
			perS.other = 3;  //Make it so you can\'t ask her the question as well
		}
	} else if (nR == 2000)
	{
		movePerson("Diane", 441);	// to the morgue
		WaitHereOnly(6);
		addComments(
			'<img src="Images/ambulance.png" style="float:left;width:20%;margin:0 10px 1em 0" alt="ambulance" title="ambulance">' +
			'As you wish, ' + myName + '.  I will have her body taken to the morgue"'
		);
	} else if (nR == 2001)
	{
		movePerson("OfficerSmith", 441);	// to the morgue
		WaitHereOnly(6);
		addComments(
			'<img src="Images/ambulance.png" style="float:left;width:20%;margin:0 10px 1em 0" alt="ambulance" title="ambulance">' +
			'As you wish, ' + myName + '.  I will have her body taken to the morgue"'
		);
	}

	return true;
}


// Initialise

function initialiseOfficerBatton()
{
	// Officer Batton
	addPerson("Officer Batton", 168, "OfficerBatton/Setting");
	per.charmThem(1, "Davy");
	per.Replies = RepliesOfficerBatton;
	per.getPossessionFace = function() { return "polb-face"; };

	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		if (this.isCharmedBy())
			return this.addPersonString("polb0.jpg", "height:max%", "right") +
				this.getPersonName() + " turned out to be a sex-crazy slut, that is after you charmed her of course, but it looks like you brought her inner hunger for sex. Her warm personality still remain though and immediately announced herself as your slave.</p><p>She offered that she would be glad to send all " + getOfficer() + "s away awhile in the police station away just so you two can have your fun together without worrying, but you stopped her, because you knew it’s too risky and told her that eventually you will own this place soon enough." +
				"</p><p>She’s now standing in attention, even saluting you in her (now yours) station. After that she sinks to her knees playing with her tits for you and begs for her " + perYou.getMaster() + " to fuck her.</p><p>You never thought it would be that easy to enslave the police chief, but here she is, waiting for you to command her.";
		else if (this.isCharmedBy("!You"))
			return this.addPersonString("polb0e.jpg", "height:max%", "right") +
				this.getPersonName() + ", the athletic and wary head of the Glenvale police force. Tall and well-built, especially her breasts...";
		else
			return this.addPersonString("polb0.jpg", "height:max%", "right") +
				this.getPersonName() + ", the athletic and surprisingly helpful head of the Glenvale police force. Tall and well-built, especially her breasts...";
	};

	per.getPersonName = function(full) {
		if (full === true) return getPoliceChief() + ' Kerry Batton';
		return getPoliceChief() + ' Batton';
	};
	per.getPersonNameShort = function() { return 'Kerry Batton'; };

	per.showEventPopup = function()
	{
		if (Place != 168 || sType !== "") return false;
		
		if (getQueryParam("arrest") == "true") return false;

		var perDA = findPerson("Diane");
		
		if (!this.checkFlag(1)) {
			// Introduction for Officer Batton
			this.setFlag(1);
			if (perDA.other === 0) {
				// Introduction (not shown if part of the arrest process, ie never visited the station before being arrested)
				if (!this.isCharmedBy("!You")) {
					showPopupWindow(this.getPersonName(),
						this.addPersonString("polb0.jpg", "height:max%", "right") +
						getPoliceChief() + " Batton is the kind of woman who you don’t want to mess with. She’s the head of the police department in this town. That means she knows every legal and illegal activities that happens here. She could be a serious opposition if she learns about your powers  and you have read in a newspaper article that she was a " + (isBritish() ? "Specialist Firearms Operations" : "SWAT") + " member before accepting this job; so she would easily kick your butt in a fight. " +
						"However; you can’t get your mind off her. Imagine if the " + getPoliceChief() + " in charge of this town would be yours to command. You could use all the manpower, weapons and vehicles of the police force against your battle with Kurndorf , Davy or anyone else who stands in your way. Committing crimes without punishments and partying all the time without having to worry about the law is just a bonus.<br><br>" +
						"As you watch her fit physique in that uniform standing in front of you and thinking about your options makes you horny. Suddenly her gaze meets with yours. She stands up from her chair and comes to you.<br><br>" +
						'"Hey there! Do you have something to tell me or report?"<br>' +
						"she asks warmly. You nervously hesitate to answer, but her friendly face and words relaxes you a bit.<br><br>" +
						'"If there’s nothing you want to say or report that’s fine. You can hang around if you want, but please don’t disturb my partners and don’t touch anything!"<br>' +
						"with a gentle smile she pats your shoulder and turns around going back to her office.<br><br>" +
						"Whoa. You never thought she’s that kind." +
						(isSpellKnown("Charm") ? "You realize now; she could be easily persuaded to join your ranks." : "")
					);
				} else {
					// Charmed by someone else
					showPopupWindow(this.getPersonName(),
						this.addPersonString("polb0e.jpg", "height:max%", "right") +
						getPoliceChief() + " Batton is the kind of woman who you don’t want to mess with. She’s the head of the police department in this town. That means she knows every legal and illegal activities that happens here. She could be a serious opposition if she learns about your powers  and you have read in a newspaper article that she was a " + (isBritish() ? "Specialist Firearms Operations" : "SWAT") + " member before accepting this job; so she would easily kick your butt in a fight. " +
						"However; you can’t get your mind off her. Imagine if the " + getPoliceChief() + " in charge of this town would be yours to command. You could use all the manpower, weapons and vehicles of the police force against your battle with Kurndorf , Davy or anyone else who stands in your way. Committing crimes without punishments and partying all the time without having to worry about the law is just a bonus.<br><br>" +
						"As you watch her fit physique in that uniform standing in front of you and thinking about your options makes you horny. Suddenly her gaze meets with yours. She stands up from her chair and comes to you.<br><br>" +
						'"Hey there! Do you have something to tell me or report...what is your name?". You answer and she replies "Just a moment while I check my records?"<br>' +
						"She looks up her records and then back at you, \"Strange, I was sure there was a warrant for you...nothing...strange, maybe " + (this.isCharmedBy("Davy") ? "<b>he</b" : "<b>she</b>") + "...\"<br><br>" +
						'"She trails off and shakes her head "Sorry about that, I have been arous...busy...recently and thought you were someone else. My apologies"<br>' +
						"While she is apologetic she still looks at you warily." +
						(isSpellKnown("Charm") ? "You wonder if she could be persuaded to join your ranks." : "")
					);
				}
				return true;
			} else if (this.isCharmedBy("!You")) {
			}
		} 
		
		// Staff meeting with all police (except Adele)
		if (this.place == 168 && perDA.isCharmedBy() && this.isCharmedBy() && wherePerson("OfficerKhan") == 168 && isCharmedBy("OfficerKhan") && this.checkFlag(5) && !this.checkFlag(4)) {
			showPopupWindow("Police Staff Meeting",
				this.addPersonString("polb9.jpg", "height:max%", "right") +
				getPoliceChief() + " approaches you, her second in command, " + getOfficer() + " Khan and " + getProsecutor() + " White accompany her, following slightly behind her.<br><br>" +
				'"' + perYou.getMaster() + '! I’m so happy that you’ve added Ms. White and Ms. Khan to your harem! I don’t have to work secretly for you anymore.", Chief Batton runs and hugs you.<br><br>' +
				'"I can give you anything you want without having to worry that Ms Khan here would become suspicious of my actions.", she adds while you burst into laughter at her statement and happiness.<br><br>' +
				'"That’s right! The police office is now yours to do with as you please! We will inform you with any new information or detail we get. You’re the boss from here on out!", Ms Khan nodding heavily.<br><br>' +
				'"Don’t forget about me! I’m doing all your official business and paperwork in your name!", ' + getProsecutor() + ' White tells while curtsying to you.<br><br>' +
				"After that you send them away to continue their work  you feel a sensation of power and dominance fills your whole body and mind as you watch your three slaves shaking their ass for you while they go back to their work.",
				"setPersonFlag('OfficerBatton',4);dispPlace()"
			);
			return true;
		}
		
		if (this.checkFlag(2) && !this.checkFlag(3) && this.isCharmedBy() && (perDA.isCharmedBy() || (perDA.other === 0 || perDA.other >= 900))) {
			// Post charm conversation, happens when you re-visit the police station after charming Officer Batton
			showPopupWindow(this.getPersonName(),
				this.addPersonString("polb9.jpg", "height:max%", "right") +
				'"What else can you give me other than yourself? Enlighten me, my dear", you ask your slave and motion her to kneel before you while you two talk.<br><br>' +
				'"Anything, ' + perYou.getMaster() + '! If you need help in your quest I can promise you, my police ' + getOfficer(false) + 's and our transportation are at your disposal. If you are in tricky situation and need help, or maybe when you want someone dead you can come to me anytime for protection.", ' + getPoliceChief() + ' Batton eagerly lists the things to you. You stolidly fiddle with the handcuffs attached to her skirt.<br><br>' +
				'"Go on, continue, don’t stop there!", you order her in an impassive tone. You just like it when your slaves see you are not impressed  and try their best to please you.<br><br>' +
				'"Well, if you need to trace something or someone down and you’re in middle of your investigation you you should know that the our equipment; radios, tracking devices, computers, sensors and cameras are available to you 24/7…", you can see she’s desperately trying to win your attention. While she speaks, she unhooks the handcuffs and offers them to you to play with. You casually whirl it around your fingers.<br><br>' +
				'"You have free access to places which are forbidden to outsiders and you can have me issue out search warrants or close down streets or houses. However I would advise you ' + perYou.getMaster() + ', to charm other important figures of the town like my right-hand man ' + getOfficer() + ' Khan, the mayor Ms Thomas and Kristin the bank manager. This would make things more  simple; to have them cooperate with the police easily and it would improve your influence over the people around here.", it looks like she’s running out of ideas so you toss the handcuffs back and thank her for her help.<br><br>' +
				'"Hmm… thanks for the tip! I will see what I can do. I will be in touch.", with that you sit back to your chair comfortably.<br><br>' +
				"She makes a silent nod, understanding your orders and kneels back, assuming the position of a good slave.",
				"setPersonFlag('OfficerBatton',3)"
			);
			return true;
		}
		return false;
	};
	
	per.showEvent = function()
	{
		if (Place != 168) return false;
		
		var md;
		
		if (sType == "charmbatton1") {
			// Police Station – Reception [Officer Kerry's Enthrallment 01]
			md = WritePlaceHeader();

			this.showPerson("polb2.jpg");
			addPlaceTitle(md, "Kerry Under a Charm Spell");

			md.write(
				'<p>Your spell works, and quickly takes hold of ' + getPoliceChief() + ' Batton. ' +
				'"God, I\'m horny," says the firm-looking police woman. ' +
				'"It must have been something in the coffee to make me feel this good.."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, "tell Kerry that she looks hot", Place, 'type=charmbatton2');
			addLinkToPlace(md, "exit the police station", 167);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmbatton2") {
			// Police Station – Reception [Officer Kerry's Enthrallment 02]
			md = WritePlaceHeader();
			this.showPerson("polb3.jpg");
			addPlaceTitle(md, "Kerry Under a Charm Spell");
			md.write(
				'<p>&quot;Do you think so?&quot; Kerry says.  She turns and puts her gun ' +
				'on the desk &quot;Not many people know this but I have a ' +
				'fantasy about arresting someone like you and. . . Well ' +
				'let\'s just say that I have a terrific imagination. Do you ' +
				'want to see what I mean?&quot;</p>'
			);

			startQuestions();
			addLinkToPlace(md, "ask Kerry to show you", Place, 'type=charmbatton3');
			addLinkToPlace(md, "exit the police station", 167);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmbatton3") {
			// Police Station – Reception [Officer Kerry's Enthrallment 03]
			md = WritePlaceHeader();
			this.showPerson("polb4.jpg");
			addPlaceTitle(md, "Kerry Under a Charm Spell");
			if (isBritish()) {
				// UK version top on with pussy exposed
				md.write(
					'<p>Kerry pulls off her skirt exposing her natural, unshaven pussy. You can see her large breasts moving in her white shirt.</p>' +
					'<p>"This is the first part of my fantasy," she says, her voice becoming husky. "I arrest my subject. Show ' + perYou.getHimHer() + ' my beautiful pussy then tease the hell of ' + perYou.getHimHer() + ' by masturbating while all ' + perYou.getHeShe() + ' can do is watch me get off."</p>'
				);
			} else {
				// US version with breasts exposed with panties
				md.write(
					'<p>Kerry pulls off her top and her huge breasts fall out of the bra.</p>' +
					'<p>"This is the first part of my fantasy," she says, her voice becoming husky. "I arrest my subject. Show ' + perYou.getHimHer() + ' my beautiful big titties then tease the hell of ' + perYou.getHimHer() + ' by masturbating while all ' + perYou.getHeShe() + ' can do is watch me get off."</p>'
				);
			}
			startQuestions();
			addLinkToPlaceC(md, "tell Kerry to show you", Place, 'type=charmbatton4');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmbatton4") {
			// Police Station – Reception [Officer Kerry's Enthrallment 04]
			// Charm her, step 4
			md = WritePlaceHeader(false, isBritish() ? "" : "td-left-med");
			this.showPerson("polb5.jpg");
			addPlaceTitle(md, "Kerry Under a Charm Spell");
			md.write('<p>"Well watch me then." Kerry says. Her hand snakes down to a place between her legs. Staring into your eyes, she pushes herself to the limit - groaning and thrusting her hips until she cries out your name, "Oh ' + perYou.getPersonName() + ', fuck me!"</p>');
			startQuestions();
			addLinkToPlace(md, "take her", Place, "type=charmbatton4take");
			addLinkToPlaceC(md, "talk more with Kerry", 168);
			addLinkToPlace(md, "exit the police station", 167);
			WritePlaceFooter(md);
			return true;
		}		
		if (sType == "charmbatton4take") {
			// Police Station – Reception [Officer Kerry's Enthrallment 04]
			// Take her
			if (perYou.isMaleSex()) {
				md = WritePlaceHeader(false, isBritish() && !isExplicit() ? "" : "td-left-med");
				this.showPersonRorX("polb7b.jpg");
			} else if (isBritish()) {
				md = WritePlaceHeader(false, isExplicit() ? "" : "td-left-med");
				this.showPersonRandomRorX("polb7g", isExplicit() ? 3 : 1);
			} else {
				md = WritePlaceHeader(false, isExplicit() ? "" : "td-left-med");
				this.showPersonRandomRorX("polb7g", 1);
			}
			addPlaceTitle(md, "Enjoying your new Slave");
			md.write('<p>You cannot refuse her invitation and you sate yourself on her body, and she upon yours.</p>');
			startQuestions();
			addLinkToPlaceC(md, "talk more with Kerry", 168);
			addLinkToPlace(md, "exit the police station", 167);
			WritePlaceFooter(md);
			return true;
		}		
		
		if (sType == "freebatton") {
			// Use the silver ring on her
			md = WritePlaceHeader();
			this.showPerson("freed.jpg");
			addPlaceTitle(md, 'Freeing ' + getPoliceChief() + ' Batton');
			
			if (getQueryParam("by") === "Tina") md.write('<p>Tina steps back as the spell fades from ' + getPoliceChief() + ' Batton, looking to you.</p>');
			else md.write('<p>The ring glows as you clasp it in your fist and focus on the mana powering the charm over ' + getPoliceChief() + ' Batton, absorbing it within moments.</p>');
			md.write(
				'<p>' + getPoliceChief() + ' Batton looks startled, scanning the room in confusion.</p>' +
				'<p>"What was that...I had something I had to do, someone to arrest...Sorry have we met, you look familiar but I cannot quite remember you?"</p>' +
				'<p>She seems to not remember much of her time charmed, but she is now free willed again...unless you wish to change that!</p>'
			);
			AddMana(5);
			this.unCharmThem();
			// Questions
			startQuestions();
			addLinkToPlace(md, 'talk to the now freed officer', 168);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "kerrydianethreesome") {
			// Kerry + Diane
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPersonRorX("polb8.jpg");
			addPlaceTitle(md, "Legal Procedures");

			md.write(
				'<p>Kerry and Diane escort you to a small room that is set aside for officers to rest, it has a small bed and simple other furnishings.</p>' +
				'<p>They immediately remove their clothing and give you an enthusiastic and mutually orgasmic demonstration of some joint legal proceedures.</p>'
			);
			startQuestions();

			addLinkToPlace(md, 'return to the police reception', 168);
			addLinkToPlace(md, 'exit the Police Station', 167);

			WritePlaceFooter(md);
			return true;
		}
	
		if (sType == "kerryfuck") {
			// Officer Kerry "It's a Bust"
			if (perYou.isMaleSex()) {
				md = WritePlaceHeader(false, isBritish() && !isExplicit() ? "" : "td-left-large");
				this.showPersonRorX("polb7b.jpg");
			} else {
				md = WritePlaceHeader(false, isExplicit() ? "" : "td-left-large");
				if (isBritish()) this.showPersonRandomRorX("polb7g", isExplicit() ? 3 : 1);
				else this.showPersonRandomRorX("polb7g", 1);
			}

			addPlaceTitle(md, getPoliceChief() + " Kerry Batton");

			md.write(
				'<p>"So you want a bust darling," says Kerry. "You have come to the right place. Here, have some of these."</p>'
			);
			startQuestions();

			addLinkToPlace(md, 'return to the police reception', 168);
			addLinkToPlace(md, 'exit the Police Station', 167);
			WritePlaceFooter(md);
			return true;
		}
		
		return false;
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 45 && whereItem(31) === 0 && perYou.isShot()) {
			// No Whistle and BEEN SHOT
			addQuestionC(md, 'ask ' + getPoliceChief() + ' Batton for some help', "OfficerBatton", 9000);
		}
	};
	
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Using/Examining the Silver Ring
		if (no == 32) {
			if (cmd == 2) {
				// Use the Silver Ring
				if (this.isHere() && this.isCharmedBy("!You"))
				{
					useSilverRingStart();
					addComments('<p>You use the ring on ' + getPoliceChief() + ' Batton</p></td></tr></table>');
					dispPlace(168, "type=freebatton");
					return "handled";
				}
			}
		}

		// Casting the charm spell
		else if (no == 14 && cmd == 2) {
			// Police Reception
			if (Place == 168) {
				if (getPersonOther("Diane") === 0 || getPersonOther("Diane") >= 900 || isCharmedBy("Diane")) {
					CastCharmSpell("OfficerBatton", Place, 1, 'type=charmbatton1');  //Charm Officer Batton
					return "handled";
				}
			}
		}

		return "";		// do nothing
	};


	// Phone calls
	per.getPersonSMS = function(id) {
		if (id == 210) return receiveSMS('KerryBatton', perYou.getMaster() + '! It’s Kerry! Leave now! Sofia is on her way home!');
		return '';
	};
}
