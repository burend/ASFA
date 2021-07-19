/****************************************************************
			Davy Robbins
****************************************************************/
var perDavy;	// Davy Robbins

// Has Davy been defeated?
function isDavyDefeated() { return perDavy.isDead() || perDavy.getQuestBlueBottle() == 20 || perDavy.getQuestBlueBottle() == 21 || perDavy.other == 8 || perDavy.checkFlag(8); }
function isDavyCaptive() { return !perDavy.isDead() && perDavy.place != 9999 && !perDavy.checkFlag(6) && !perDavy.checkFlag(7) && (perDavy.getQuestBlueBottle() == 20 || perDavy.getQuestBlueBottle() == 21 || perDavy.other == 8 || perDavy.checkFlag(8)); }

function DavyEscapes()
{
	if (!perDavy.checkFlag(8)) perDavy.setFlag(6);
}

// Move Davy to the hotel to open the Hotel Cellar and the Seance
function moveDavyToHotel1()
{
	if (!isPlaceKnown("Hotel")) setPlaceKnown("Hotel");	// Add access to the hotel
	if (perDavy.other < 5) perDavy.other = 5;	// Advance Davy's Path
	perDavy.place = 124;  // Place Davy @ the hotel.
	if (!checkPersonFlag("Bambi", 10)) setPersonFlagAfterTime("Bambi", 3, undefined, Math.ceil(Math.random() * 6));	// Trigger a message from the hotel
}

// Move to the hotel with Kate
function canMoveDavyToHotel2()
{
	if (isDavyDefeated() || perDavy.other !== 6) return false;
	var perKate = findPersonNC("Kate");
	if (perKate.place == 999) return true;
	return perKate.checkFlag(40) && perKate.checkFlag(41);
}

function moveDavyToHotel2()
{
	if (isDavyDefeated() || perDavy.checkFlag(6)) return;

	if (!isPlaceKnown("Hotel")) setPlaceKnown("Hotel");	// Add access to the hotel
	setPlaceFlag("Hotel", 8);		// Fallback just in case you missed him at the Hotel so you can persue the seance
	if (perDavy.other != 8) perDavy.other = 10; // Advance Davy's Path
	perDavy.place = 184; // Place Davy in the room
	movePerson("Kate", 184); // Place Kate @ the Hotel
	setPersonOther("Kate", 99);  // Move her past trying to kill you at home
}


// Initialise
function initialiseDavyRobbins()
{
	// Davy
	perDavy = addPerson("Davy", 9, "Davy", "Male/Uncharmed", false);
	per.extra = [0, 0, 0];		// 1 = Blue Bottle. 2 = Hellgate

	per.getPersonName = function(full) { return "Davy Robbins"; };
	per.getPersonAddress = function() { return isPlaceKnown("RobbinsHouse") ? '36 Yoolaroo Dr, Glenvale' : ''; };
	
	per.getPossessionFace = function() { return this.isMaleSex() ? "Male/Uncharmed!davy1" : "Female/Charmed!charm1"; };

	// Gender
	per.getPersonGender = function() { return this.checkFlag(11) ? "woman" : "man"; };
	per.isBornMale = function() { return true; };

	per.getQuestBlueBottle = function() { return this.extra[1]; };
	per.setQuestBlueBottle = function(no) { this.extra[1] = no; };

	per.getPathHellgate = function() { return this.extra[2]; };
	per.setPathHellgate = function(no) { this.extra[2] = no; };
	
	per.passTimeDay = function() {
		this.setFlag(13);
		return '';
	};

	// Events for Davy
	per.showEvent = function()
	{
		var md, idx, sHe, sHis, sHim;

		if (Place == 144 && sType == 'follow') {
			// Follow to the sports fields
			setPlaceKnown("SchoolField");
			md = WritePlaceHeader();
			addPlaceTitle(md, "Davy at the School Sports Fields", "schoolfield1.jpg");

			// Follow Davy
			md.write(
				'<p>You realise Davy is taking a shortcut to the school sporting fields so you hurry along a slightly different path to avoid being seen by him. You quickly get a clear view of the playing fields, but Davy is nowhere to be seen. You quickly double back, and for a moment you thought you saw him, but you lose sight of him. A moment later you hear him speak to you from off to one side,</p>' +
				'<p>"' + perYou.getPersonName() + ', he warned me about you, to stay away from you. But I had to tell you, ' + (isCharmedBy("Kate", "Davy") ? 'they are both mine, I didn\'t lie' : 'she will be mine as well') + ' and you cannot stop me."</p>' +
				'<p>You see him vaguely in the trees and then he steps out of sight. You think he says something but you cannot hear it clearly.</p>' +
				'<p>Strange how he spoke, like he was taunting you.</p>'
			);
			startQuestions();
			startAlternatives(md, "How do you react?");
			addLinkToPlaceO(md, "approach Davy", Place, 'type=followhurt');
			if (perGates.other == 600) addLinkToPlaceO(md, "retreat, this might be an ambush", 9, '', 'Davy might have his woman hiding around here somewhere, so you quickly retreat to the public areas in front of the school. Nothing happens, there is no sign that you were followed');
			addLinkToPlaceO(md, "what was that he said?", Place, 'type=followok');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;

		}
		if (Place == 144 && (sType == 'followok' || sType == 'followhurt')) {
			// Davy's trap
			md = WritePlaceHeader();
			perDavy.setFlag(9);
			addPlaceTitle(md, "Stormwater Drain", "drain.jpg");

			if (sType == 'followok') {
				md.write(
					'<p>You hesitate, Davy said something odd it sounded like an arcane word, maybe. Suddenly you feel a hand on your back shove you but you just stumble a little. You notice in front of you a stormwater drain, open with no protective grate! You look around to see Davy somehow now standing behind you. He looks disappointed and says after a pause,</p>' +
					'<p>"Look out for the drain", and before you can react he just walks away. You try to follow and you hear him say the words again and lose sight of him, you look around but Davy is gone, you have no idea where he went. You wonder if the slime was trying to push you into the drain?</p>' +
					'<p>You move the protective grate mostly back in place over the drain, and then make a quick phone call to the school admin office to report the problem.</p>'
				);

			} else {
				// Stumble and slightly hurt
				perYou.health = 90;
				perDavy.setFlag(10);
				md.write(
					'<p>You step towards Davy to confront him about what he was talking about and stumble on the edge of an open stormwater drain right in front of you, you almost fell in! Suddenly you feel a hand on your back shove you but while you fall, you do not fall in to the drain. There is a sharp pain in your ankle and you look around to see Davy, somehow now standing behind you. He looks disappointed and says after a pause,</p>' +
					'<p>"Look out for the drain", and before you can react or stand he walks away. With some pain you get back to your feet, it does not feel like anything is broken or seriously hurt but you will have a bit of a limp for a while. Davy is gone, you have no idea where he went, but the slime pushed you! You would not be surprised if her opened the drain as well, there should be a protective grate over it, but you see it has been pushed aside.</p>' +
					'<p>With some pain you move the protective grate mostly back in place over the drain, and then make a quick phone call to the school admin office to report the problem.</p>'
				);
			}
			md.write(
				'<p><img style="float:right;width:5%;margin-left:5px" src="' + getThemeFolder() + 'symbol1.png" alt="Hexagram" title="Hexagram">After a quick but nervous check of the area, all you can find is carved on an ancient tree near to where you think you saw him a glyph of some sort, a symbol you think you have seen in a book somewhere but do not recognise. It is very old, the bark has almost grown back over it, but it does appear to have been crudely re-cut more recently.</p>'
			);
			startQuestions();
			if (isShopOpen(2)) addLinkToPlace(md, "enter the School", 70);
			if (isPlaceKnown("Park")) addLinkToPlace(md, "walk into the park", 63);
			addLinkToPlace(md, "return to the front of the school", 9);
			WritePlaceFooter(md);
			return true;

		}

		if (Place == 184 && sType === "checkphone") {
			// Checking Davy's phone
			md = WritePlaceHeader(false, 'td-left-med');
			for (var i = 241; i < 250; i++) addSMSToPhotos(i);
			AddImage(perYou.isBornMale() ? "phoneb.jpg" : "phoneg.jpg");
			addPlaceTitle(md, "Checking Davy's Phone");
			md.write(
				'<p>You pickup Davy\'s phone, he seems to have been taking photos and it is still active. You quickly check and see he has a few of his mother and sister, and a lot of photos and short videos of Kate, though he does seems to have been fascinated with photographing her submissive to him'
			);
			if (isExplicit()) md.write(' and showing it...orally');
			md.write(
				'</p><p>You quickly send copies of the more interesting images to your phone. You then try checking other things, like his SMS\'s or other data but as you do his phone locks up asking for a code. You doubt you will get it from him, so give up for now. You leave the phone here with the rest of his items.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'go back to the bar', 124);
			WritePlaceFooter(md);
			return true;
		}

		if (Place != 161) return false;
		
		sHe = this.getHeShe();
		sHis = this.getHisHer();
		sHim = this.getHimHer();

		if (sType == "checkdavy") {
			md = WritePlaceHeader();
			if (this.isMan()) {
				if (this.isCharmedBy()) this.showPersonRorX("davycellar-bound1.jpg");
				else this.showPerson("davycellar-bound1.jpg");
			} else this.showPersonRandom("davycellar-bound1", 2);
			addPlaceTitle(md, "Davy in the Cellar");
			md.write(
				'<p>Well, Davy is your prisoner here in the Hotel cellar...well now dungeon. ' + (this.isMan() ? "He" : "She") + ' has been securely bound by Bambi, you keep being impressed by Bambi\'s skills!</p>'
			);
			if (isPersonHere("Bambi")) md.write('<p>Bambi is here taking care of Davy, strict and with lots of discipline.</p>');
			if (isPersonHere("Anita")) md.write('<p>Anita is here guarding Davy, you can see her dislike of Davy, bordering on hatred.</p>');

			startQuestions();
			if (isPersonHere("Bambi")) addLinkToPlace(md, 'have Bambi train Davy', 161, 'type=playdavybambi');
			if (wherePerson("Anita") == 161) {
				addLinkToPlace(md, 'Anita "Show me how Bambi has trained you"', 161, 'type=playdavyanita');
				if (isPersonHere("Bambi")) addLinkToPlace(md, 'have Bambi and Anita team up to train Davy', 161, 'type=playdavyteam');
			}
			addLinkToPlace(md, 'that is all for now', 161);
			WritePlaceFooter(md);			
			return true;
		}
			
		if (sType == "charmdavy1") {
			// Charm in the Hotel Cellar 1		
			this.dress = (this.checkFlag(11) ? "Female" : "Male") + "/Charmed";
			md = WritePlaceHeader(false, this.checkFlag(11) ? '' : 'tf-left-med');
			this.showPerson("charm1.jpg");
			addPlaceTitle(md, "Finally, Davy Under A Charm Spell");
			
			md.write(
				'<p>Finally Davy is free of the leftover magic from Kurndorf, and ' + sHe + ' is powerless and unable to defend ' + sHim + 'self magically. You tell Davy, "It is time" and you cast the charm spell.</p>' +
				(this.checkFlag(11) ? '<p>You remove her ball-gag and ' : '<p>') +
				'Davy sighs in a sort of resigned way, ' + sHe + ' knows there is nothing ' + sHe + ' can do and has no defence. ' + capitalize(sHe) + ' says,</p>' +
				'<p>"Is this revenge for Kate? I know you always wanted her but I got her before you" and weakly laughs. You reply,</p>' +
				'<p>"And I \'got\' Tina before you, and you are now mine as well"</p>' +
				'<p>You watch and ' + sHis + ' eyes change to a green colour as the spell more strongly takes effect ' + 
				(this.checkFlag(11) ? 'and you replace her ball-gag</p>' : '</p>')
			);

			startQuestions();
			addLinkToPlaceC(md, 'time to finish this', Place, 'type=charmdavy2');
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "charmdavy2") {
			// Charm in the Hotel Cellar 2
			md = WritePlaceHeader(false, this.checkFlag(11) ? '' : 'tf-left-med');
			this.showPerson("charm2.jpg");
			addPlaceTitle(md, "Davy Under A Charm Spell, Final");
			
			md.write(
				'<p>Davy looks at you ' + sHe + ' has given up, and you tell ' + sHim + ' firmly that ' + sHe + ' is your slave now, to use and command as you want. You pause, and say,</p>' +
				'<p>"Yes this is revenge for Kate, I will make you do all the perverted things you did to her over and over. You are my slave now"</p>' +
				'<p>While you feel guilty for a moment, gloating like that felt really good! Davy is completely defeated, and yours. For now you will leave ' + sHim + ' bound here. There is still a nagging suspicion that maybe the residule of Kurndorf may affect ' + sHim + ' but given time you will gain confidence in your new slave.<p>' +
				'<p><i>nothing more implmentented</i></p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'that is all, Davy is your slave', 161);
			WritePlaceFooter(md);
			return true;		
		}		

		if (sType == "playdavyanita") {
			// Play with Davy
			if (perDavy.isMan()) {
				md = WritePlaceHeader();
				if (isExplicit()) this.showPersonRandomX("davycellar-male-train2", 2);
				else this.showPerson("davycellar-male-train2.jpg");
			} else {
				idx = String.fromCharCode(Math.floor(Math.random() * 4) + 97);
				md = WritePlaceHeader(false, idx == 'a' ? 'td-left-med' : '');
				this.showPerson("davycellar-female-train1" + idx + ".jpg");
			}
			addPlaceTitle(md, "Anita with Davy");

			if (perDavy.isMan()) {
				md.write(
					'<p>Davy is clearly afraid of Anita, and you can\'t really blame him for it. Hell, you are, too at times, and she is your devoted slave, but it is probably this fear that makes him fall in line so easily. Anita doesn\'t so much “train” him as that she is throwing him around, dragging him from place to place all while spitting demeaning expletives in his face.</p>' +
					'<p>You know that Bambi has restricted usage of the more painful and probably damaging tools in her arsenal, and Anita often makes her frustration about that known. Her hands are tightly wrapped around Davy\'s balls while she sits on his face and explains what she will do to him if he is unable to bring her to climax, and you have to admit you occasionally feel sorry for the poor guy, but not much.</p>'
				);
			} else {
				md.write(
					'<p>Davy is clearly afraid of Anita, and you can\'t really blame her for it. Hell, you are, too at times, and she is your devoted slave, but it is probably this fear that makes her fall in line so easily. Anita doesn\'t so much “train” her as that she is throwing her around, dragging her from place to place all while spitting demeaning expletives in her face.</p>' +
					'<p>You know that Bambi has restricted usage of the more painful and probably damaging tools in her arsenal, and Anita often makes her frustration about that known. She sits on Davy\'s face and explains what she will do to her if she is unable to bring her to climax, and you have to admit you occasionally feel sorry for the poor girl, but not much.</p>'
				);
			}
			if (isMurderPath()) md.write('<p>Still, it makes you think. Anita very clearly hates Davy for what he did to her and is pretty much only held back from doing him serious harm by your orders. The thought that she might ever be freed off the spell and that hatred shifts to you is... chilling.</p>');
			else md.write('<p>Still, it makes you think. Davy is Anita\'s enemy because you told her he is, and that order alone seems to be enough to make her hate him with scary passion. The thought that she might ever be freed off the spell and that hatred shifts to you is... chilling.</p>');


			startQuestions();
			addLinkToPlaceC(md, 'that is all for now', 161);

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "playdavybambi") {
			// Play with Davy
			if (perDavy.isMan()) {
				if (isExplicit()) {
					md = WritePlaceHeader('td-left-med');
					this.showPersonRandomX("davycellar-male-train1", 3);
				} else {
					idx = String.fromCharCode(Math.floor(Math.random() * 2) + 97);
					md = WritePlaceHeader(idx == 'a' ? 'td-left-med' : '');
					this.showPerson("davycellar-male-train1" + idx + ".jpg");
				}
			} else {
				idx = String.fromCharCode(Math.floor(Math.random() * 4) + 97);
				md = WritePlaceHeader(false, idx == 'a' ? 'td-left-med' : '');
				this.showPerson("davycellar-female-train1" + idx + ".jpg");
			}
			addPlaceTitle(md, "Bambi with Davy");

			md.write(
				'<p>“I know you are still unwilling to submit to our ' + perYou.getLord() + ', my ' + this.getSex() + '.” Bambi\'s fingers tenderly touch Davy\'s naked chest, slide over ' + this.getHisHer() + ' neck and caress ' + this.getHisHer() + ' cheek. “But I am sure you will not mind if we perform a little... show for ' + perYou.getHimHer() + ', do you?”</p>' +
				'<p>Davy\'s body trembles under her touch' + (this.isMaleSex() ? ', and you can see his cock twitching a little' : '') + ', yet ' + this.getHeShe() + ' remains hesitant. ' + capitalize(this.getHisHer()) + ' eyes spitefully rest on you and ' + this.getHeShe() + ' refuses to answer.</p>' +
				'<p>“I see.” Bambi smiles cruelly. “Perhaps I should get miss Anita to...”</p>' +
				'<p>“No!” Davy shouts hastily. “N... no need...”</p>' +
				'<p>Bambi\'s frowns at ' + this.getHimHer() + (this.isMaleSex() ? ', her fingers starting to constrict around Davy\'s scrotum without a word' : ', her fingers starting to painfully pinch her nipple without a word') + '.</p>' +
				'<p>“No need, Ma\'am!” ' + capitalize(this.getHeShe()) + ' quickly adds, and Bambi\'s fingers relax. “I... play along.”</p>' +
				'<p>“Good ' + capitalize(this.getSex()) + '.”</p>'
			);
			if (this.isMaleSex()) {
				md.write(
					'<p>Bambi\'s lips barely touch Davy\'s in a fleeting kiss before she gives you a wink and turns away to get a few items, and even though Davy is less than pleased with his treatment, you can see his manhood already standing halfway at attention and his body trembling all over as he follows the sway of her hip.</p>' +
					'<p>In the next minutes, Bambi demonstrates the depths of her skills and experience. Her whip strikes Davy\'s shoulders, chest and tights with finesse and precision, never breaking skin or leaving lasting marks but definitely letting ' + this.getHimHer() + ' feel the sting of its impact.</p>' +
					'<p>Davy twitches, screams, and occasionally moans in pleasure whenever Bambi grants ' + this.getHimHer() + ' a moment of respite to tenderly caress his by now rockhard cock or place soft kisses to his skin, and as the scene goes on, his body seems to fall deeper into a haze of pain and pleasure.</p>' +
					'<p>Clamps are being attached to his nipples and other parts, a flogger hits his increasingly reddened skin... You expect him to protest when Bambi gets the strap on for the grand finale. But his mind seems barely there when she uses it to finally bring him to climax and force him to shoot his load all over his own body.</p>'
				);
			}
			md.write(
				'<p>When Bambi is done with ' + this.getHimHer() + ', ' + this.getHeShe() + ' looks as if slowly awakening from a weird dream, ' + this.getHisHer() + ' eyes glassy and watching her in a mix of fear and adoration as she tends to ' + this.getHisHer() + ' bruises, ' + this.getHisHer() + ' resistance broken down a little more.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'that is all for now', 161);

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "playdavyteam") {
			// Play with Davy
			if (perDavy.isMan()) {
				md = WritePlaceHeader();
				this.showPerson("davycellar-male-train3a.jpg");
			} else {
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPerson("davycellar-female-train3a.jpg");
			}

			addPlaceTitle(md, "Bambi and Anita with Davy");
			md.write(
				'<p>Anita and Davy team up to train Davy</p>' +
				'<p style="font-size:x-small">Actual scenes to be implemented</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'that is all for now', 161);

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformgender") {
			CastTransform(1);
			md = WritePlaceHeaderNIP(true, '', 'black');
			if (!this.checkFlag(11)) {
				this.setFlag(11);
				this.dress = "Female/" + (this.isCharmedBy() ? "Charmed" : "Uncharmed");
				showPopupWindow("Transformation",
					addImageRandomString('GenericSex/tgm2f', oImages.GenericSex.tgm2f, "50%") +
					'<p>You cast the spell and Davy cries out, muffled by his gag. As you watch his body changes, growing thinner and your see his cock shrinking. His chest expands as you see breasts grow and his face softens to a feminine appearance.</p>' +
					'<p>After some time you can no longer call Davy a <b>he</b>, now <b>she</b> is very definitely female, nothing masculine is left, she is completely a woman! <i>She</i> looks at you shocked at the transformation.'
				);
			} else {
				this.setFlag(11, false);
				this.dress = "Male/" + (this.isCharmedBy() ? "Charmed" : "Uncharmed");
				showPopupWindow("Transformation", 
					addImageRandomString('GenericSex/tgf2m', oImages.GenericSex.tgf2m, "50%") +
					"<p>You cast the spell and Davy cries out, muffled by his gag. As you watch his body changes, growing larger and your see his cock growing. His chest diminishes as you see breasts disappear and his face hardens to a masculine appearance.</p>" + 
					"<p>After some time you can no longer call Davy a <b>she</b>, now <b>he</b> is very definitely male, nothing feminine is left, he is completely a ,an! <i>SHe</i> looks at you relieved at the transformation."
				);
			}
			setQueryParams("");
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (!this.isHere()) return;

		// Cellar only
		if (Place == 161) {
			if (sType === "") addLinkToPlace(md, 'check on Davy', 161, 'type=checkdavy');
		}
	};

	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the clairvoyance spell
		if (no == 15 && cmd == 2) {

			if (!this.isHere()) return '';
			
			if (Place == 161 && this.place == 161) {
				// In the cellar
				if (CastClairvoyanceSpell()) {
					if (!this.checkFlag(14)) addComments('<p>The spell reveals Davy is under a powerful spell.</p>');
					else if (!this.checkFlag(15)) addComments('<p>The spell reveals Davy is under a moderate spell.</p>');
					else if (this.sCharmedBy == "You") addComments('<p>The spell reveals that Davy is under the influence of <b>your</b> charm spell.</p>');
					else addComments('<p>The spell reveals Davy has a small residual magical effect but very little.</p>');
					return "handled";
				}
			}
			addComments('<p>The spell reveals Davy is under a powerful spell.</p>');
			return "handled";
		}
		
		// Examining the Soul Bound Crystal
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere()) {
					if (Place != 161) examineItem(no, 'The ' +  s + ' trembles slightly, maybe it would react better in another location with Davy.');
					else examineItem(no, 'The ' +  s + ' vibrates softly the closer you get to Davy.');
					return "handled";
				}
			}
		}

		// Casting the transform spell
		if (no == 18 && cmd == 2) {

			// In the cellar?
			if (Place == 161 && this.place == 161) {
				if (!CastTransform(1, true)) return "handled";

				ClearComments();
				dispPlace(Place, 'type=transformgender');
				return "nofooter";
			}
			// Is he present somewhere else?
			if (this.isHere()) {
				if (!CastTransform(1, true)) return "handled";		// You cannot cast the spell
				addComments("The spell does not work, but there is an effect, you believe it may work at another time.");
				return "handled";
			}
		}
		
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			if (Place == 184) {
				//Hotel Room 101; Davy and Kate
				addComments("You read the spell, but nothing happens.  Davy must have some sort of magical protection.");
				return "handled";
			}
			if (Place == 161 && this.place == 161) {
				if (!this.checkFlag(16) || this.checkFlag(13)) {
					if (!this.checkFlag(16)) addComments("Davy seems to be under a powerful spell that is blocking the charm spell");
					else addComments("The spell fails, Davy seems to have some sort of defense, possibly he can use his mana to protect him?");
					return 'handled';
				}
				CastCharmSpell("Davy", Place, 1, "type=charmdavy1");
				return "handled";
			}
		}

		return "";		// do nothing
	};

}
