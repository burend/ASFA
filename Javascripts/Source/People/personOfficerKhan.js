/****************************************************
			Officer Khan Responses
 ****************************************************/
function RepliesOfficerKhan(nR)
{
	//var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 521)  // v52 = Officer Khan CHARMED PLOT
	{
		per.setPath(2); // Officer Khan Charmed Plot
		if (!isPlaceKnown("PoliceStation")) setPlaceKnown("PoliceStation");	//  Know the Police station if you don't already.
		per.place = 168; // Place Officer Khan @ the police station
		if (isDavyDefeated()) {
			var perS = findPerson("Sarah");
			if (perS.place === 0) {
				perS.moveThem(1); // Sets Sarah Gates (Sir Ronald's Niece in town)
				movePerson("AdeleRoss", 16);	// Set Gates Estate as Blocked (to protect Sarah)
				setPersonFlag("AdeleRoss", 1);
			}
		}
		Place = 167;
		addComments('"As you wish, ' + myName + '.  I\'ll take you there in my police car."');
	}
	else if (nR == 522)
	{
		bChat = false;
		per.setPath(10);
		Place = 168;
		per.place = 999; // Out Looking for Davy
		addComments(per.addPersonFace() + '"Whatever you want, my ' + myName + '. I have some evidence I could use to justify the arrest to the authorities."');
	}
	else if (nR == 530) // v53 = Normal Officer Khan Plot
	{
		per.other = 1; //  NEED THE CHARMED RESPONSE
		addComments('<p>"There has been a crime here and we are surveying the area for evidence."</p>');
	}
	else if (nR == 531)
	{
		per.other = 2;
		addComments('<p>"I\'m sorry, I\'m not at liberty to discuss an ongoing investigation.  Now, where were you at..."</p>');
	}
	else if (nR == 1610) // v16 = Mayor Path 10 = Has offered to help w/ investigation
	{
		addComments('"The Mayor sent you?" she says, looking you up and down.  "Not likely.  Now, as I was about to say.  Where were you at..."</p>');
		per.other = 3;
	}
	else if (nR == 5310)
	{
		if (!isPlaceKnown("SacredClearing")) setPlaceKnown("SacredClearing");  // Knows where to find Sacred Clearing
		per.other = 11;      // Khan now charmeable
		addComments('<p>"Alright," says the ' + getOfficer(false) + '. "I\'ll clear everyone out."</p>');
		addComments('<p>She begins barking orders, and one by one the other ' + getOfficer(false) + 's leave.</p>');
	}
	return true;
}


/***************** Initialise ******************************************************************************/

// Officer Khan
function initialiseOfficerKhan()
{
	// Officer Khan
	addPerson("Officer Khan", 65, "OfficerKhan/Setting", '', false);
	per.extra = [0, 0];		// expanded arbitrary data
	per.Replies = RepliesOfficerKhan;
	
	per.getPath = function() { return this.extra[1]; };
	per.setPath = function(no) { this.extra[1] = no; };

	per.isPersonInfo = function() { return this.isCharmedBy();	};
	per.getPersonInfo = function() {
		if (isMurderPath())
			return this.addPersonString("pol13b.jpg", "height:max%", "right") +
				getOfficer() + " Khan welcomes you with  a salutation. You changed her pesky and irritating personality into a helpful, obedient one. She no longer wants to be top of the \"food chain\", she seems way more interested in you. She obediently helped you out clearing the investigation in the Gates manor even though she " + (isMurderPath(true) ? "believes" : "knows") + " you killed Sir Gates. But she would never betray her " + perYou.getMaster() + ".</p>" +
				"<p>After her salutation, she unbuttons her uniform just until you can have a clear look at her cleavage. The second in command officer is happy to see you!";
		else
			return this.addPersonString("pol13b.jpg", "height:max%", "right") +
				getOfficer() + " Khan welcomes you with  a salutation. You changed her pesky and irritating personality into a helpful, obedient one. She no longer wants to be top of the \"food chain\", she seems way more interested in you. She even settled with doctors in the hospital that you can roam around in the building and have access to every room there. The way to visit Mrs Granger anytime you want is longer an issue to you.</p>" +
				"<p>After her salutation, she unbuttons her uniform just until you can have a clear look at her cleavage. The second in command officer is happy to see you!";
	};

	per.getPersonName = function(full) { return full !== true && this.isCharmedBy() ? "Slave Cheryl" : getOfficer() + " Khan"; };
	per.getPossessionFace = function() { return "pol9"; };

	per.passTimeDay = function() {
		if (this.place == 1000 && (getDay(true) == "Wed" || getDay(true) == "Sat")) this.place = 435;
		return '';
	};
	per.passTimeNight = function() {
		if (this.place == 435) this.place = 1000;
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 435 && this.isHere()) md.write('<p>You see ' + getOfficer() + ' Khan working out on one of the exercise machines.</p>');
	};

	per.showEvent = function()
	{
		var md;
		
		// Recovery from the hospital
		if (Place == 213 && this.health == 99 && isMurderPath()) {
			// She is recovered and can leave hospital
			this.health = 100;	// Fully well
			this.place = 168;		// To work
			md = WritePlaceHeader();
			this.showPerson("pol12-leaving.jpg");
			addPlaceTitle(md, "Discharging " + getOfficer() + " Khan");
			md.write(
				'<p>Cheryl Khan is standing next to her bed and looks like she starting to get dressed. Starting as she is wearing little more than her underwear that is. She sees you and cries out,</p>' +
				'<p>"' + perYou.getMaster() + '! you are here to see me off! The doctors cleared me and I am returning back to work on the police force!"</p>' +
				'<p>She is looking happy and reasonably healthy and you congratulate her on her recovery. She finishes dressing and you walk with her out of the ward. She asks you to come and see her at the police station whenever you can.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave the ward', 214);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 65 || Place == 67 || Place == 278) {
			if (sType == "charmkhanother1") {
				// Charm Officer Khan 1
				this.setPath(1);
				if (isMurderPath() && this.other != 12) {
					this.other = 12;
					PlaceI(9, 65);    // Place Pistol @ Crime Scene for you
				}

				md = WritePlaceHeader();
				if (isBritish()) this.showPerson("pol4.jpg");
				else this.showPerson(isMurderPath() ? "pol4m.jpg" : "pol4c.jpg");

				addPlaceTitle(md, getOfficer() + " Khan Under a Spell");

				md.write(
					'<p>You cast the charm spell on the ' + getOfficer(false) + '. She is confused by the new sensations ' +
					'pulsing through her body, making her think of thoughts that defy her normally rather conservative sensibilities.</p>' +
					'<p>&quot;You are acting very suspiciously,&quot; she says in a tone suddenly quite lacking authority. ' +
					'&quot;What is your full name and address?&quot;</p>' +
					'<p>&quot;' + perYou.getPersonName() + ', and I live on ' +
					'Kollam Street. What is your name, ' + getOfficer(false) + '?&quot; you ask with a smile</p>' +
					'<p>The policewoman resists for a moment before confessing, ' +
					'&quot;Cheryl. Cheryl Khan. You shouldn\'t ask me the questions. I am in charge here.&quot;</p>' +
					'<p>&quot;Whatever you say ' + getOfficer() + ' Khan.&quot;</p>'
				);
				startQuestions();
				addLinkToPlace(md, "wait for the spell to take effect", Place, 'type=charmkhanother2');
				if (isMurderPath()) addLinkToPlace(md, "exit " + perGates.getPersonNameShort() + "\'s estate?", 16);
				else addLinkToPlace(md, "exit the ward", 214);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "charmkhanother2") {
				// Charm Officer Khan 2
				md = WritePlaceHeader();
				if (isBritish()) this.showPerson("pol5.jpg");
				else this.showPerson(isMurderPath() ? "pol5m.jpg" : "pol5c.jpg");

				addPlaceTitle(md, getOfficer() + " Khan Under a Spell");

				md.write(
					'<p>' + getOfficer() + ' Khan turns away, steadying herself against ' + (isMurderPath() ? 'Gate\'s' : 'a') + ' desk.  When she turns back her eyes are glassy. ' +
					'"I am in charge and... you are... uhm... under arrest. Yes. We are going to the police station to..." Khan trails off, lost. ' +
					'"Oh! I have to handcuff you so that we could... I am in charge of this situation!  Please believe me ' + perYou.getPersonName() + '. I\'m not a '
				);
				if (perYou.isBornMale()) md.write('whore');
				else md.write('lesbian');
				md.write(
					', who fucks her suspects."</p>' +
					'<p>Watching the waves of desire wash through ' + getOfficer() + ' Khan amuses you. You tease her, "I didn\'t say anything about screwing, ' + getOfficer(false) + '. Who do you want to screw?"</p>' +
					'<p>Khan\'s whole body shifts, as she loses ground against your magical compulsion. "I... Nobody. I don\'t want to screw anybody. Now, spread your legs.  I need to frisk you to...  uh...  make sure you don\'t have any weapons."</p>'
				);

				startQuestions();
				addLinkToPlace(md, "obey the " + getOfficer() + "?", Place, 'type=charmkhanother3');
				WritePlaceFooter(md);
				return true;			
			}	
			if (sType == "charmkhanother3") {
				// Charm Officer Khan 3
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRandomRorX("pol6b", isExplicit() ? (isBritish() ? 2 : 3) : 1, "45vw");
				else if (isBritish()) this.showPersonRorX("pol6ga.jpg", "45vw");
				else if (isMurderPath()) this.showPersonRandomRorX("pol6g", 2, "30vw,45vw");
				else this.showPersonRorX("pol6gb.jpg", "45vw");

				addPlaceTitle(md, getOfficer() +  " Khan Under a Spell");

				var myName = perYou.isBornMale() ? 'handsome' : 'beautiful';

				md.write(
					'<p>You spread your legs.</p>' +
					'<p>Arousal crashes over ' + getOfficer() + ' Khan, causing her first climax as she runs her hands all over your body, tugging at your clothes.'
				);
				if (perYou.isMaleSex()) {
					md.write(
						'<p>When your cock springs into view she loses all pretense that this is a normal frisk.  She looks up at you with lust in her eyes.' +
						'<p>I order you to fuck my mouth, ' + perYou.getPersonName() + '. Fuck it, make me your slut, your whore, your <i>slave</i>. I\'ll do anything you want me to do, just fuck my mouth."</p>'
					);
				} else md.write('<p>"Oh, you are so ' + myName + '" she confesses. She quickly tugs off her uniform. "I order you to screw me, ' + perYou.getPersonName() + '. Screw me so hard that I have to scream. Take me, make me your slut, your whore, your <i>slave</i>. I\'ll do anything you want me to do. Anything! Take me ' + perYou.getMaster() + '. Please!"</p>');

				startQuestions();
				if (isMurderPath()) {
					addOptionLink(md, "enter " + perGates.getPersonNameShort() + "\'s House", 'EnterMansion()');
					addLinkToPlace(md, 'exit the estate', 16);
				} else addLinkToPlace(md, "exit the ward", 214);
				WritePlaceFooter(md);
				return true;			
			}				
		}

		if (Place != 435) return false;

		 if (sType == "charmkhangym1") {
			// Charm Officer Khan 1
			this.setPath(1);
			md = WritePlaceHeader();
			this.showPerson("pol17.jpg");
			addPlaceTitle(md, getOfficer() + " Khan Under a Spell");
			md.write(
				'<p>You cast the charm spell on the ' + getOfficer(false) + '. She is confused by the new sensations ' +
				'pulsing through her body, making her think of thoughts that defy her normally rather conservative sensibilities.</p>' +
				'<p>She stops working on the exercise machine,</p>' +
				'<p>"You are acting very suspiciously", she says in a tone suddenly quite lacking authority. "I am in charge here, please move along"</p>' +
				'<p>You are not about to do that, so you remind her this is a public place, a gym, after all. You then comment on how hot she is looking, from her exercise that is. She replies, sounding distracted,</p>' +
				'<p>"Yes, very hot...maybe I can rearrange my outfit a little. Please move along, nothing to see here"</p>' +
				'<p>You take a step to the side and she immediately ignores you, seeming to assume you have left. She starts to remove part of the gym clothes, sensuously wiping the sweat from her exposed skin. Quickly she has exposed a lot more skin than she probably intended. The spell is clearly influencing her.</p>'
			);
			startQuestions();
			addLinkToPlaceO(md, "wait for the spell to take effect", 435, 'type=charmkhangym2');
			WritePlaceFooter(md);
			return true;

		} else if (sType == "charmkhangym2") {
			// Charm Officer Khan 2
			md = WritePlaceHeader();
			this.showPerson("pol18.jpg");
			addPlaceTitle(md, getOfficer() + " Khan Under a Spell");
			md.write(
				'<p>You step closer to her and you can see the arousal of the spell is hitting her hard. She has stripped more of her gym clothes, ignoring the curious glances of a couple of the other gym members who have noticed. You decide it is best to keep this a little more private and ask her,</p>' +
				'<p>' + getOfficer() + '", can you please help me, there is something suspicious, let\'s move along over there", you know it is a lame approach but she is distracted by the spell. Barely keeping her outfit on she follows you to a more private area. You notice the other gym members looking at you enviously, but who cares about them, ' + getOfficer() + ' Khan is now yours!</p>' +
				'<p>In the more private location she looks around uncertain, and letting her outfit mostly fall away,</p>' +
				'<p>"There is nothing to see here, nothing that needs my attention here".</p>'
			);
			startQuestions("You decide to forget the subtlety:");
			addLinkToPlaceC(md, '"Yes there is, ' + (perYou.isMaleSex() ? 'my cock' : 'my pussy') + '"', 435, 'type=charmkhangym3');
			WritePlaceFooter(md);
			return true;

		} else if (sType == "charmkhangym3") {
			// Charm Officer Khan 3 (end)
			md = WritePlaceHeader(false, 'td-left-large');
			this.place = 168;
			this.showPerson("pol19.jpg");
			addPlaceTitle(md, getOfficer() + " Khan Under a Spell");
			md.write(
				'<p>You spread your legs.</p>' +
				'<p>Arousal crashes over ' + getOfficer() + ' Khan, causing her first climax as she runs her hands all over your body, tugging at your clothes.'
			);
			if (perYou.isMaleSex()) {
				md.write(
					'<p>When your cock springs into view she loses all pretense that this is some sort of police business.  She looks up at you with lust in her eyes.' +
					'<p>I order you to fuck my mouth, ' + perYou.getPersonName() + '. Fuck it, make me your slut, your whore, your <i>slave</i>. I\'ll do anything you want me to do, just fuck my mouth."</p>'
				);
			} else md.write('<p>"Oh, you are so beautiful" she confesses. "I order you to screw me, ' + perYou.getPersonName() + '. Screw me so hard that I have to scream. Take me, make me your slut, your whore, your <i>slave</i>. I\'ll do anything you want me to do. Anything! Take me ' + perYou.getMaster() + '. Please!"</p>');
			md.write(
				'<p>Sometime later, you try decide what to do with your new slave, but she speaks up a little breathlessly,</p>' +
				'<p>"' + perYou.getMaster() + ' I am due back for a shift at the police station, may I leave?"</p>' +
				'<p>You decide it is probably best for her to go there for now, if nothing else having a slave police ' + getOfficer(false) + ' can always be useful!</p>'
			);
			startQuestions();
			addLinkToPlace(md, "leave the gym", 37);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 37 && this.place == 435 && nFromPlace == 435) {
			// Just left the Gym and Officer Khan was there
			WriteComments('As you leave you notice ' + getOfficer() + ' Khan packing her gear to leave as well');
			if (this.isCharmedBy()) this.moveThem(168);
			else this.moveThem(1000);
			return false;
		}

		// Initial meeting at the Gym
		if (Place == 435 && this.isHere() && !this.checkFlag(1)) {
			showPopupWindow("A Familiar Woman",
				this.addPersonString("pol16.jpg", "height:max%", "right") +
				"You notice a woman working out on one of the machines, she looks familiar but for a moment you cannot place her. As you admire her, you recognise her as Ms. Khan. She used to live next door to your house. Your mother talked to her a lot back in the day and sometimes Ms Khan even visited your house for dinner. " +
				"From these visits you learned that she did not want to be an " + getOfficer() + " first, she was more interested in becoming a soldier. However, her dominant nature and harsh attitude made her realize that by becoming a police " + getOfficer(false) + " she could exercise her power over the people quicker and easier. So, yeah, your first impressions of her were not so good...she’s and uptight and arrogant bitch who’s hunger for power could only be matched by her heavenly body and appearance and it looks like she hasn’t changed a bit. " +
				"She worked her way through the ladder and is now the right hand woman to " + getPoliceChief() + " Police Chief Batton.<br><br>" +
				"She must be working out here to maintain her fitness for the police force, and is so focused on this she does not appear to have noticed you.",
				'setPersonFlag("OfficerKhan",1);dispPlace()'
			);
			return true;
		}
		return false;
	};

	per.isPlaceImageRight = function()
	{
		if (this.place == 435 && this.isHere()) {
			SetRightColumnSize("large");
			return true;
		}
		return false;
	};
	per.showPlaceImageRight = function(md)
	{
		if (this.place == 435) {
			this.showPerson("pol16.jpg");
		}
	};

		// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			var bShielded = isSpellKnown("Shielded Charm");
			if (Place == 65 || Place == 67) {
				// Crime Scene
				if (bShielded) {
					// Know shielded Charm
					CastCharmSpell("OfficerKhan", Place, 1, 'type=charmkhanother1');	// Charm Officer Khan
				} else if (getPersonOther("OfficerKhan") == 11) {
					//Officer Khan has cleared everyone out
					CastCharmSpell("OfficerKhan", Place, 1, 'type=charmkhanother1');	// Charm Officer Khan
				} else addComments("Don't cast the spell here. There are too many people around.");
				return "handled";		// Ignore any standard action otherwise
			}
			// At the Gym and she is present?
			else if (Place == 435 && this.place == 435 && sType === "") {
				if (!bShielded) addComments('Don\'t cast the spell here. It is too public.');
				else CastCharmSpell("OfficerKhan", Place, 1, "type=charmkhangym1");		//Charm Officer Khan
				return "handled";		// Ignore any standard action otherwise
			}
			// Hospital Foyer
			else if (Place == 214) {
				findPerson("MrsGranger");
				if (per.other >= 54 && per.place == 278 && !isMurderPath() && per.checkFlag(3)) {
					if (!bShielded) addComments('Don\'t cast the spell here. It is too public.');
					else addComments('The ' + getOfficer(false) + ' is too far away. When you approach she steps into the Ward, you will have to go there if you want to charm her.');
					return "handled";
				}
			}
			// Ward 1 West
			else if (Place == 278) {
				if (!isMurderPath() && !this.isCharmedBy() && checkPersonFlag("MrsGranger", 3)) {
					CastCharmSpell("OfficerKhan", Place, 1, 'type=charmkhanother1');
					return "handled";
				}
			}
		}
		return "";		// do nothing
	};
}
