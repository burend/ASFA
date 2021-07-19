// Vampyre
// Vampyre
/*
The vampire is real! Sarah was right! The spawn of darkness is standing in front of you. You cannot make out a lot because of darkness and the fogginess, but you can clearly see those eyes. They are already compelling you! You wait a few seconds while your eyes get used to the darkness and you observe the beast better. It’s definitely a she! The vampire has great curves and. You also notice her pale skin and the pair of fangs hanging out of her mouth. The typical characteristic of a vampire.
You stand beside Sarah, mouth agape. You are terrified, but you have to do something. It’s your life at stake!

Basic description of the Vampire after you enslaved her ( phase one ):

You managed to save Sarah from this creature of the night, but now the vampire has been chained to you in many ways. She’s your slave, your servant both in mind and body. You have a vampire at your command! Your very own vampire! Could you have believed that a week ago? No one would either if you haven’t charmed them or show them with their own eyes.
The vampire is a reluctant and stubborn species as you realise by your very few and short conversations with her. They are very from what a person nowadays expect them to be. She doesn’t sparkle and is not a very friendly woman all together. Nothing like Edward from the Twillight series, instead she reminds you of Dracula from those old black and white movies. She rarely speaks, only if she has to, answering to your questions with a one or two words sentences mostly. She is always on the lookout for dangers, scanning the faces she meets.
Your vampire lady follows you everywhere during the night. She’s like a shadow, stays behind only a few steps away from you. When you stop, she stops too or if you run somewhere she runs with you never leaving your side for a second.
Sometimes when you roam the town at night you forget that she’s even there! Yep, she’s that silent and careful!But she’s always watching you like a lioness protecting it’s cub from danger.
Your vampire slave usually wear a robe around her neck and a hood to hide her face. A simple tunic made from fabric protects her slim and musculine body, but her boobs are sometimes wide open. She wears red and black which fits her persona "nicely”!

*/

var perLilith;

function initialiseVampyre()
{
	// Vampyre
	perLilith = addPerson("Vampyre", 0, "VampyreLilith", '', false);
	
	per.getPersonName = function(full) { return "The Vampyre"; };
	per.getPersonNameShort = function() { return "Lilith"; };
	
	per.isVampyre = function() { return true; };
	
	per.extra = [0, 0];
	per.health = -1;
	per.getRespect = function() { return this.extra[1]; };
	per.setRespect = function(no) { this.extra[1] = no; };
	
	per.getPossessionFace = function() { return 'vamp5a'; };	

	per.whereNow = function()
	{
		if (this.isCharmedBy("Sarah")) return !isDay() ? 192 : 0;
		if (Place == 450) return 38;
		if (this.place == -1) {
			if (Place == 40 && this.checkFlag(12)) return 0;
			if (isPossess()) return perYou.place;
			if (!isOutside() && (!this.checkFlag(13) || isInvisible()))  return 0;
		}
		if (Place == 196 || Place == 203 || isAtLocation(344)) return 0;
		var perMG = findPersonNC("MrsGranger");
		if (isAtLocation(177) && !perMG.isCharmedBy()) return 0;
		return this.place;
	};

	per.isMonstersInSacredClearing = function ()
	{
		if (sType == "monster" || (this.other >= 60 && !isDay())) return true;
		return false;
	};

	per.isPlaceImageRight = function() {
		if (Place != 464 && Place != 372 && Place != 450 && Place != 374 && sType === '' && this.isHere()) {
			SetRightColumnSize("");
			return true;
		}
		return false;
	};
	per.showPlaceImageRight = function(md) {
		if (Place != 192) this.showPerson(Place == 46 ? "bedrooma.jpg" : "vamp5a.jpg", undefined, undefined, undefined, undefined, undefined, md);
		else if (this.isCharmedBy("Sarah")) {
			if (checkPersonFlag("Sarah", 2)) this.showPersonRandom("sarahslave3", 2, isPersonHere("Lauren") ? "42%" : undefined, undefined, undefined, undefined, undefined, md);
			else this.showPerson("sarahslave1.jpg", isPersonHere("Lauren") ? "42%" : undefined, undefined, undefined, undefined, undefined, md);
		} else this.showPerson("youslave.jpg", isPersonHere("Lauren") ? "42%" : undefined, undefined, undefined, undefined, undefined, md);
		if (isPossess() || sPlaceParams !== '' || this.isCharmedBy("Sarah")) return;
		var p;
		var plc;
		var b = false;
		var wid = Place == 192 && isPersonHere("Lauren") ? "42%;margin-left:5%" : "90%";
		for (var i = 0; i < arPeople.length - 2; i++) {
			p = arPeople[i];
			if (p.uid == this.uid) continue;
			if (p.isDead() || p.isVampyre()) continue;		// Maybe override for vampire turning later
			plc = p.whereNow();
			if (plc == Place && p.health > 0 && !p.isVampyre() && Place != 282) {
				// Add query like 'Allow the Vampyre to feed on Debra'
				if (p.uid == "lauren") {
					if (p.checkFlag(13)) continue;
				} else if (!p.isCharmedBy("You")) {
					if (!(Place == 192 && p.uid == "sarah")) continue;
				}
				if (p.uid == "sarah" && p.checkFlag(13)) continue;
				if (!b) md.write('<div style="clear:both;">');
				if (p.uid == "sarah" && p.checkFlag(12)) addLinkToPlace(md, "'feed' with Sarah", Place, "type=vampsarahthreesome", '', '', '', "bloodblock", "width:" + wid + ";max-width:90%;position:relative;top:-0.5em;" + (b ? "margin-top:10px" : ""));				
				else if (p.uid == "alison" && !p.checkFlag(8)) addLinkToPlace(md, "'bite' Alison", Place, "type=bitealison", '', '', '', "bloodblock", "width:" + wid + ";max-width:90%;position:relative;top:-0.5em;" + (b ? "margin-top:10px" : ""));
				else addLinkToPlace(md, "feed on " + p.getPersonNameShort(), Place, "type=feedOn&by=" + this.uid + "&who=" + p.uid, '', '', '', "bloodblock", "width:" + wid + ";max-width:90%;position:relative;top:-0.5em;" + (b ? "margin-top:10px" : ""));
				b = true;
			}
		}
		if (!b) {
			md.write('<div style="clear:both;">');
			md.write(addOptionLink("string", "talk to her", "gotoPlace(" + Place + ",'type=chatvampyre')", "chatblock", "width:" + wid + ";max-width:90%;position:relative;top:-0.5em"));
		}
		md.write('</div>');
	};

	per.passTimeNight = function() {
		if (this.other > 39 && this.other < 51) this.other++;
		else if (this.other == 51 || this.other == 60) this.other = 59;
		else if (this.other == 50.5) this.other = 51;
		if (this.place == 247) {
			if ((Place > 316 && Place < 339) || (Place > 381 && Place < 386) || Place == 406) {
				this.place = 325;
				return '';	// You are in the church
			}
			if (this.checkFlag(27)) {
				this.place = 374;
				return '';
			}
			this.place = -1;
			if (Place != 247) return "<p>The vampyre rejoins you as night falls." + this.addPersonFace(false, "15%") + "</p>";
		}
		return '';
	};
	per.passTimeDay = function() {
		setPlaceFlag("SacredClearing", 2, false);
		this.setFlag(16, false);
		if (this.isHere()) {
			this.place = 247;
			if (Place != 247) return "<p>The vampyre leaves you and returns to the crypt until night falls" + this.addPersonFace(false, "15%") + "</p>";
		} else if (this.place == 325 || this.place == 374) this.place = 247;
		return '';
	};

	per.isPersonInfo = function() { return this.isCharmedBy();	};
	per.getPersonInfo = function() {
		var s = this.addPersonString("vamp1b.jpg", "height:max%", "right") +
			"She is a menacing predator that exudes sexuality as much as she is dangerous.<br><br>";
		if (this.sCharmedBy == "Sarah") {
			return s + "She is bound body and soul to Sarah, to Sarah\' discomfort.";
		} else {
			return s + "She is bound body and soul to you. At night she follows you at all times, except into holy places. In the daytime rests in the crypt.";
		}
	};
	
	// On entering a church
	per.enterChurch = function(plc, s)
	{
		if (plc == 319) {
			// teleport with vampyre into the church courtyard!
			// she runs away in fear
			this.moveThem(Place == 325 ? 325 : 247);
			s = this.showPerson("vamp10a.jpg", "20%", 'left;margin-bottom:1em;margin-right:5px', '', '', undefined, "string", "none") + s + ' the vampyre lets out an unearthly scream of pain and horror. In a blur of inhuman spped she leap and run over the cloisters and gets out of the church in a matter of seconds.';
			if (!this.checkFlag(8)) {
				s += '<br><br>You have heard the legends of vampires being repulsed by a holy cross, so it seems at least partly this is true.';
				this.setFlag(8);
			}
			return s;
		}
		this.place = 325;
		s = '<p style="text-align:center"><b>Vampyre Stops</b></p><p>' + this.showPerson("vamp5b.jpg", "20%", 'right;margin-bottom:1em', '', '', undefined, "string", "none") +
			 s + ', the vampyre stops, and says,<br><br>"This place reeks of the holy, I can..will not enter. I will wait for you in the graveyard"';
		if (!this.checkFlag(8)) {
			this.setFlag(8);
			return s + '<br><br>You think it best to not to push and try to force her to follow you. After all, you have heard the legends of vampires being repulsed by a holy cross, so it seems at least partly this is true.';
		}
		return s;
	};
	
	// Event, called from showEvent but also in one case directly
	per.feedOnEvent = function(ps)
	{
		var q = getQueryParam("ask");

		var md;

		var perF = findPerson(ps);
		var herName = perF.getPersonName();

		if (q == "create") {
			md = WritePlaceHeaderNIP(false, "", "black");
			this.setFlag(4);
			this.showPerson("vamp1b.jpg");
			addPlaceTitle(md, "Vampyre Questioning", '', 0, false, 'white');
			md.write(
				'<p>You ask about what she means by you creating new vampyres, and she looks at you, her expression an unreadable mask of cruelty,</p>' +
				'<p>"There are always ways for a ' + (perYou.isBornMale() ? 'sorcerer' : 'witch') + ' to do many things. you have enslaved the living and the dead. Demons have ways with the living and there are ways to transmigrate and borrow bodies.<br><br>Seek others of your kind if you do not understand, I am a predator, not a witch."</p>'
			);
			startQuestionsOnly(undefined, 'white', md);

		} else if (q == "heal") {

			// Healing
			md = WritePlaceHeaderNIP(false, "", "black");
			this.showPersonRandom("vamp8", 2, "height:max");

			addPlaceTitle(md, "The 'Gift of Life'", '', 0, false, 'white');

			md.write(
				'<p>The vampyre looks at ' + herName + ' with some distaste and tells you, "I would never do this except for your request"</p>' +
				'<p>After expressing her distaste, the vampyre embraces ' + herName + ' and sinks her fangs into ' + herName + '\'s neck.</p>' +
				'<p>After a moment ' + herName + 'breathes deeply and looks up. The vampyre steps away and turns her back on ' + herName + '. You look and ' + herName + ' looks completely healed, no sign of injury, tiredness or anything.</p>'
			);
			this.health += 100 - perF.health;
			perF.health = 100;
			switch(perF.uid) {
				case "mrsgranger":
					if (wherePerson("OfficerKhan") == 278 && !isMurderPath()) {
						movePerson("OfficerKhan", 168);
						perF.place = 261;
						md.write('<p>The police guard looks confused but after a while and a checkup by the nurse she escorts ' + herName + ' off to jail.</p>');
					} else {
						md.write('<p>You tell ' + herName + ' to return home and you will see them there later. After they dress and leave after a longing glance at you, and a fearful glance at the vampyre.</p>');
						perF.place = 177;
					}
					break;
				case "officerkhan":
					md.write('<p>You tell ' + herName + ' to return to the police station and you will see them there later. After they dress and leave after a longing glance at you, and a fearful glance at the vampyre.</p>');
					perF.place = 168;
					break;
				case "officersmith":
					md.write('<p>You tell ' + herName + ' to return to the police station and you will see them there later. After they dress and leave after a longing glance at you, and a fearful glance at the vampyre.</p>');
					perF.place = 261;
					perF.other = 103;
					break;
			}
			startQuestionsOnly(undefined, 'white', md);

		} else if (perF.health < 100) {
			// No Feeding
			md = WritePlaceHeaderNIP(false, "", "black");
			this.showPerson("vamp8c.jpg");

			addPlaceTitle(md, "Vampyre and " + herName, '', 0, false, 'white');

			if (perF.health <= 60) {
				// Someone injured
				if (!this.checkFlag(5)) {
					md.write(
						'<p>The vampyre looks at ' + herName + ' and looks at you,</p>' +
						'<p>"Your thrall is badly injured and would not live through my feeding. It in unlikely they would rise after even if I was permitted to do that.<br><br>' +
						'Did you value this thrall? If so I could give them the Gift of Life. Instead of taking I can give my own life\'s blood to heal them. I need to have enough to feed them so I need to be satiated enough."</p>'+
						'<p>She looks at you with a cruel smile, you know what she means by being satiated.</p>'
					);
					this.setFlag(5);
				}
				if ((perF.health + -1 * (this.health + 1)) >= 100) {
					md.write(
						'<p>The vampyre looks at ' + herName + ' and looks at you, waiting but saying nothing.</p>'
					);
				} else {
					md.write(
						'<p>The vampyre looks at ' + herName + ', "I have not had enough"</p>'
					);
				}
				startQuestionsOnly(undefined, 'white', md);
				if ((perF.health + -1 * (this.health + 1)) >= 100) addLinkToPlace(md, "ask the Vampyre to use the 'Gift of Life'", Place, "type=feedOn&by=vampyre&ask=heal&who=" + perF.uid, '', '', '', "bloodblock");


			} else {

				// A person fed on before
				if (!this.checkFlag(3)) {
					md.write(
						'<p>The vampyre looks at ' + herName + ' and looks at you,</p>' +
						'<p>"I will not feed on this one again, I cannot choose to take their life and create a new vampyre thrall. You control my heart and body, only you can do this now."</p>' +
						'<p>You are not sure if you would even want that, after all it seems that ' + herName + ' would die. Then again, your vampyre slave is desirable and has as much free will and determination as ' + herName + '. Trouble is, how would to do it, even if you wanted?</p>'
					);
					this.setFlag(3);
				} else {
					md.write(
						'<p>The vampyre looks at ' + herName + ' and looks at you,</p>' +
						'<p>"I will not feed on this one again, Once again I cannot do this."</p>'
					);
				}
				startQuestionsOnly(undefined, 'white', md);
				if (!this.checkFlag(4)) addLinkToPlace(md, "ask the Vampyre what she means by you creating vampyres", Place, "type=feedOn&by=vampyre&ask=create&who=" + perF.uid, '', '', '', "bloodblock");
			}

		} else {
			// Feeding			
			this.health -= 20;
			perF.health -= 20;
			if (this.health < -100) {
				// Full (Bad End)
				md = WritePlaceHeaderNIP(false, "", "black");
				this.showPersonRandom("vamp10", 3);

				addPlaceTitle(md, "Vampyre Feeding", '', 0, false, 'white');
				md.write(
					'<p>Once again the vampyre feeds, but this time as she finished she screams in ecstasy and drops ' + herName + ' to the ground unmoving, possibly dead. The vampyre looks at you triumphantly,</p>' +
					'<p>"Feeding is my unlife, the power of my soul. I am now sated and empowered. Now your petty spell can now longer control me, but it has some influence. Join me now in the darkness as a fellow vampyre and lover"</p>' +
					'<p>You start to tell her No! and she laughs, "You do not control me, and you have no choice now!"</p>' +
					'<p>With inhuman speed she puts her arms around you and sinks her fangs into your neck...</p>' +
					'<p>...sometime later, you revive as a vampyre and lover of your once slave. Nothing can stop the two of you using the Book, your magic and her savagery. Glenvale is yours to enslave, to feed on and satisfy all your lusts, or at least all <b>her</b> lusts, but they are yours now too.</p>'
				);

				startQuestionsOnly(undefined, 'white', md);
				addRestartLink(md);
				WritePlaceFooter(md);
				return;

			} else {
				// Feeding ok
				if (perF.fedUponEvent(this)) return;
				md = WritePlaceHeaderNIP(false, "", "black");
				this.showPersonRandom("vamp8", 2, "height:max");

				addPlaceTitle(md, "Vampyre Feedng on " + herName, '', 0, false, 'white');

				md.write(
					'<p>' + herName + ' looks uncertainly, and you reassure them as the vampyre approaches with lust on her face. With no hesitation, she embraces ' + herName + ' and sinks her fangs into ' + herName + '\'s neck.</p>' +
					'<p>After a surprising short time, the vampyre looks up at you, still holding ' + herName + '. Her face is still full of lust, but different. She steps away from ' + herName + ' who looks strange, a mixture of ecstasy and complete exhaustion, and they immediately sit down.</p>' +
					'<p>The vampyre looks at you, "My blood-lust has receded, but my other lusts are rising. Normally I would seduce my prey, but power is so much more arousing. Take me!"</p>'
				);
				startQuestions(undefined, 'white', md);
				addLinkToPlace(md, "satisfy her lust with your body", Place, "type=vampfuck&who=" + perF.uid, '', '', '', "bloodblock");
				if (perYourBody.FindItem(45) > 0) addLinkToPlace(md, "satisfy her lust on your plastic cock", Place, "type=vampfuck&strapon=true&who=" + perF.uid, '', '', '', "bloodblock");
			}
		}

		addOptionLink(md, "enough of that", "setQueryParams('');DoReturn()", "bloodblock");

		WritePlaceFooter(md);
	};


	// Any text to add for the current location for the vampyre
	per.showPersonTextHere = function(md) {

		if (sType === '' && this.isHere() && isOutside()) addBackgroundImage("Images/People/VampyreLilith/vampbg.png", "80% 0%");

		if (Place == 192) {
			// With Sarah Gates
			var perSarah = findPerson("Sarah");
			if (this.other == 50) {
				if (perSarah.isCharmedBy()) {
					// charmed Sarah
					var myName = perSarah.getYourNameFor();
					md.write('<p>"' + myName + '..." She says, concern in her voice.  "You know that Magic is real ' + myName + ', but I am afraid vampires are as well."</p></p>When you do not rebuke her for her insolence she continues her story.  "Part of my families responsibility was to keep the <i>creature</i> within its crypt.  But to do so we must use the book.  If we do not..." A shiver visibly runs down her back. "I can not bear to think of it."</p>');
				} else {
					// Not charmed Sarah
					md.write('<p>"What?" She asks quickly.  "Magic is real, but vampires are just myths?"</p></p>"It is quite simple.  I must have the book by then or I am doomed, and potentially the town along with me."</p><p>"Please," She begs, "There is barely enough time to prepare as it is');
					if (isMurderPath()) md.write(' and the vampyre will know that Uncle Ronny is not here');
					md.write('. We are all in great danger!"');
				}
			} else if (this.other == 51) {
				md.write(
					'<p>The color suddenly fades from Sarah Gates\' face as she watches the sun set below the horizon - taking her confidence and resolve along with. The howl of a wolf is heard from a distance.</p>' +
					'<p>This is a very scary experience, but you have promised to protect Sarah. Then again you could leave and wait at home and check back later.</p>'
				);
				if (perSarah.FindItem(4) === 0) md.write('<p>Once again Sarah asks you for the Book.</p>');
			}

			if (this.isCharmedBy("Sarah") && !isDay()) {
				md.write('<p>The vampyre is looking at Sarah and completely ignoring you.</p>');
				return;
			}
		}

		if (!this.isHere() || Place == 435) return;

		if (Place == 53) {
			// Hidden Room reflections
			if (!this.checkFlag(2)) {
				this.setFlag(2);
				md.write('<p>You also notice the vampyre <b>does not reflect</b> in the mirrors as well, confirming the old legends. She notices you looking at the mirrors and smiles at you, a cruel smile, and says,<br>"The mirrors of the soul"<br>You ask her to explain and she smiles again, but says nothing.</p>');
			} else md.write('<p>The vampyre looks at you smiling, no reflection of her is visible in any of the mirrors.</p>');

		} else if (Place == 325) {
			if (this.place == 325) {
				this.place = -1;
				md.write('<p>You see the vampyre step out from behind a large tombstone, and silently she joins you.</p>');
			}
		}

		if (isOutside() && this.place == -1 && isDay()) {
			this.place = 247;
			WriteComments("<p>The vampyre leaves you and returns to the crypt until night falls</p>");
		}
		if (Place == 26 && this.place == 247 && !isDay()) this.place = -1;

		if (isPossess() || sPlaceParams !== '') return;

		// Any people here to feed on?
		// NOTE: list of multiple people a bit simple 'a,b,c' not 'a,b and c'
		var s = '';
		var bLook = false;
		var p;
		var plc;
		for (var i = 0; i < arPeople.length - 2; i++) {
			p = arPeople[i];
			if (p.uid == this.uid) continue;
			if (p.isDead() || p.isVampyre()) continue;
			plc = p.whereNow();
			if (plc == Place && p.place != -1) {
				if (p.uid == "seraphina" || p.uid == "lucy") continue;
				if (bLook) s += ', ' + p.getPersonNameShort();
				else {
					if (p.uid == "alison") s += '<p>The vampyre looks at Alison with a slight smile';
					else if (p.uid == "elian") {
						if (p.checkFlag(3)) s += '<p>The vampyre ignores ' + p.getPersonName();
						else continue;
					} else s += '<p>The vampyre looks intensely at ' + p.getPersonNameShort();
					if (p.uid == "miku") s += '. Miku returns the vampyres gaze unflinching, never taking her eyes off her';
				}
				bLook = true;
			}
		}
		if (bLook) md.write(s + '.</p>');
	};

	per.showEvent = function()
	{
		if (Place == 192) return this.showEventSarah();
		
		var md;
			
		// Events anywhere, generally when she is following you
		
		if (sType == "chatvampyre") {
			// Chat to her while she is your follower OR in the lounge room at home
			md = WritePlaceHeaderNIP();
			if (Place == 374) {
				this.showPerson("loungec.jpg");
				addPlaceTitle(md, "Chatting with Lilith");
				md.write(
					'<p>You sit on another chair and talk to Lilith for a little.</p>'
				);
			} else {
				this.showPerson("vamp5b.jpg");
				addPlaceTitle(md, "Chatting with the Vampyre");
				md.write(
					'<p>You stop for a moment to talk to the vampyre.</p>'
				);				
			}
			startQuestionsOnly();

			// General Questions
			addQuestionR(md, '"I need to do something else, please leave me for now"',
				'"Of course ' + perYou.getMaster() + '"' +
				(isPersonHere("Tracy") ? ' To your surprise Lilith says goodbye to Tracy' : ''),
				"Vampyre",
				"movePerson(\\'Vampyre\\',247)",
				""
			);
			if (this.place != -1 && Place != 247) {
				addQuestionR(md, '"Please come with me now"',
					'"Of course ' + perYou.getMaster() + '"',
					"Vampyre",
					"movePerson(\\'Vampyre\\',-1)",
					""
				);
			}

			if (this.checkFlag(25) || this.checkFlag(17)) {
				if (!this.checkFlag(13)) {
					addQuestionR(md, '"You can accompany me when I enter a building"',
						'"Yes ' + perYou.getMaster() + '"',
						"Vampyre",
						"setPersonFlag(\\'Vampyre\\',13)",
						""
					);
				} else {
					addQuestionR(md, '"Please wait outside when I visit someone"',
						'"I prefer the night ' + perYou.getMaster() + ', I will wait for you until needed"',
						"Vampyre",
						"setPersonFlag(\\'Vampyre\\',13,false)",
						""
					);				
				}
			}
			if (!this.checkFlag(28) && this.checkFlag(29)) {
				// Ask about Elian
				addPopupLinkC(md, "ask about her hostility to Elian", "Lilith and Elian",
					this.addPersonString("vamp11b.jpg", "height:max%", "right") +
					'You ask her about her hostility to Elian, and she almost snarls as ahe bares her fangs. She really does not like Elian! She angrily says,</p>' +
					'<p>"I will <b>never</b> touch it and I will not attack unless you command me to", you ask again, as she did not really answer your question. She says,</p>' +
					'<p>"Demons hunt like a predator, but they toy and torture and kill for a whim or pleasure. A demon is not a person, it is a thing from beyond, a watcher from beyond the gates. I will not deal with them, and it is a mistake to deal with them."</p>' +
					'<p>She refuses to discuss it any more',
					false, 'setPersonFlag("Vampyre",28);dispPlace()'
				);
			}
			if (checkPlaceFlag("Hotel", 11) && Place == 269) {
				if (!this.checkFlag(14)) {
					addPopupLinkC(md, 'ask if she would like to go for a swim', "Vampyres and Swimming",
					this.addPersonString("pool-ask.jpg", "20%", "right") +
					'She looks at you as if you are out of your mind, and then says "Not in water, and it would require a lot of people to fill this with blood". She turns her back on you dismissively.</p>' +
					'<p>Well you can just let it go but at times her attitude is frustrating, she says she is yours, heart and body, but refuses you more often than not.</p>' +
					addOptionLink("string", 'accept it', "setPersonFlag('Vampyre',14);dispPlace(Place)", "chatblock", "width:50%;margin-left:10%") +
					addOptionLink("string", 'force the issue', "setPersonFlag('Vampyre',14);dispPlace(Place,'type=forcevampyre')", "chatblock", "width:50%;margin-left:10%"),
					false, "", true);
				}
				if (this.checkFlag(15)) {
					if (this.checkFlag(16)) addLinkToPlace(md, 'tell her we are going for a swim', Place, '', 'She looks at you, "We already have today" and turns her back on you');
					else addLinkToPlace(md, 'tell her we are going for a swim', Place, 'type=vampyrepool');	
				}
			}
			if (Place == 281 || Place == 282 || Place == 280) {
				this.addDancingLink(md, 'talk to Lilith about dancing',
					'You talk to Lilith about dancing here, and you expected her to snarl and refuse or make some cruel remark, instead she says,</p>' +
					'<p>&quot;Certainly, to seduce and attract our prey are our art. I will show you how we hold they eye before the final kill...or other act&quot; You speak to Jade and arrange for Lilith to dance, not mentioning anything about Lilith\'s nature, but then again if Jade is as knowledgeable as she claims she should realise what Lilith is anyway.'
				);
			}
			if (this.checkFlag(18) && !this.checkFlag(19)) {
				addPopupLinkC(md, 'ask why she did not enter the restaurant', "Vampyres and Restaurants",
					this.addPersonString("notinvited.jpg", "20%", "right") +
					'You ask Lilith why she did not follow you into the restaurant. She stares at you without answering, so you stare back waiting for her answer. She hisses a reply,</p>' +
					'<p>"The place reeks and I hate that caterwalling they call music there."</p>' +
					'<p>No way, she is lying to you, and then you realise what it is, the restaurant uses garlic a lot...enough that it may repel Lilith, or at least make it repulsive for her...and you are not sure you disagree with her about the music. Alright then you will allow her to wait for you outside when you enter the restaurant.',
					false, "setPersonFlag('Vampyre',19)"
				);
			}
			if (this.checkFlag(24) && !this.checkFlag(25)) {
				addPopupLinkC(md, 'ask why she did not follow you inside', "Vampyres and Invisibility",
					this.addPersonString("notinvited.jpg", "20%", "right") +
					'You ask Lilith why she did not follow you into the building. She replies,</p>' +
					'<p>"Your cloak means you wish to hunt alone, I will wait for you outside"</p>' +
					'<p>You try to tell her she can come inside with you if you are invisible, but she flatly refuses with no explanation or discussion',
					false, "setPersonFlag('Vampyre',25)"
				);
			}			
			if (Place == 38) {
				var perLeanne = findPerson("Leanne");
				if (perLeanne.place == 450 && perLeanne.isCharmedBy("Demon") && !isDemonGone()) {
					// Leanne is saveable and the Vampyre is here
					addLinkToPlaceC(md, 'tell the vampyre "Go inside and bring the thrall"', 53, 'type=vampabduct');
				}
			}
			
			addLinkToPlace(md, 'continue on', Place);
			WritePlaceFooter(md);			
			return true;
		}

		// Sex with the Vampyre
		if (sType == "vampfuck") {
			var perWith = findPerson(sWho);		// Who else is here, ie just go fed on
			md = WritePlaceHeaderNIP(false, "", "black");

			if (getQueryParam("strapon") == "true") this.showPersonRandomX("strapon", 2);
			else if (isExplicit()) {	
				if (perYou.isMaleSex()) this.showPersonRandomX("vamp9b", 2);
				else this.showPersonRandomX("vamp9g", 2);
			} else if (perYou.isMaleSex()) this.showPerson("vamp9b.jpg");
			else this.showPersonRandom("vamp9g", 2);

			addPlaceTitle(md, "Lust of the Vampyre", '', 0, false, 'white');
			md.write(
				'<p>Still dazed from the feeding, ' + perWith.getPersonNameShort() + ' watches in morbid fascination as Lilith pushes you to sit on the ground and straddles you, wasting no time to remove your top and pressing her lips against yours in a wild, hungry kiss.</p>' +
				'<p>Her skin touches yours, flawless, wonderfully silken to the touch, and yet strangely cold. She has no heartbeat or breath but feels very much alive, her mere presence intoxicating to you as her tongue passionately mingles with your own. You quickly feel yourself getting swept away by the moment until she suddenly pushes your shoulders roughly to the ground and her lips come to rest on your neck. You realize her fangs are briefly scraping over your skin, forcing a weirdly pleasant shiver to rush through your entire body, and a strange part of you is almost disappointed as she recoils with a frustrated hiss.</p>' +
				'<p>“You did not actually expect that to work?” You ask, with maybe a little more worry in your voice than you had intended, and she gives you a wide predatory grin as she pulls off your pants. “No, not today, ' + perYou.getMaster() + '.”</p>' +
				'<p>Before you are able to speak further, her teeth briefly dig into your inner thigh. She doesn\'t draw blood, but there is a brief rush of pain followed by a wave of intense euphoria washing through your entire body as ' + (perYou.isMaleSex() ? 'her long fingers reach for your rock-hard cock and guide it into her pussy.' : 'her sharp fingernails carefully slide over your folds and legs before she presses her own pussy forcefully against yours.') + '</p>' +
				'<p>Suffice to say, she does not feel cold everywhere. The two of you engage in a rough, passionate act of animistic sexuality, almost more of a sexual struggle who will be on top in the end, while ' + perWith.getPersonNameShort() + ' begins to slowly pleasure herself, her eyes still drowsy as she stares at the surreal scenario before her.</p>'
			);
			startQuestionsOnly(undefined, 'white', md);
			addOptionLink(md, "enough of that", "setQueryParams('');DoReturn()", "bloodblock");

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "feedOn" && getQueryParam("by") == this.uid) {
			this.feedOnEvent(sWho);
			return true;
		}
		
		// Location specific events
		
		// Avernus club
		if (Place == 282 && sType == "clubtakevampyre") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRorX("poledance-sexb.jpg");
			else this.showPerson("poledance-sexg.jpg");
			this.setFlag(16);
			addPlaceTitle(md, "Take the Vampyre");
			md.write(
				'<p>Lilith is urgent and more dominant than usual as you arrive in the private booth. She almost tears your clothing off and pushes you down. You consider asserting your control and dominance here and start to resist. Uncharacteristically she says one word, one she seldom if ever says "Please".</p>' +
				'<p>You let her have this and she '
			);
			if (perYou.isMaleSex()) md.write('aggressively and passionately mounts you. She rides your cock, bouncing on your lap urgently in her lust.');
			else md.write('mounts your face, riding your tongue as you lick her. She urgently moves her hips, fucking herself on your face in her lust.');
			md.write(' She cries out in her lust and orgasm and bends down and sinks her fangs into your neck. She immediately pulls away saying, "Just a taste", and then moves ');
			if (perYou.isMaleSex()) md.write('down on your cock as she expertly makes you cum in her mouth.');
			else md.write('down to your pussy, licking you to your own orgasm.');
			md.write('</p><p>When you see her again, she has re-dressed in her usual cloak and clothing, her makeup also normal with blood-red lipstick. The urgency gone from her face and she asks. "' + perYou.getMaster() + ' where do you want to go now?"</p>');
			startQuestions();
			addLinkToPlace(md, 'return to the public area of the club', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (Place == 269) {
			//Hotel swimming pool
			if (sType == "vampyrepool") {
				WaitHereOnly(4);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Ordering Lilith to Swim");
				md.write(
					'<p>At your orders Lilith removed her robe and put on a sort of swimsuit...well if you call the collection of straps a swimsuit and poses at the edge of the pool. She is clearly reluctant to actually swim.</p>' +
					'<p>As you stated when insisting, this is for swimming so you you tell her to follow you into the pool. She does and it seems she has little skill in swimming so you keep to the shallows. After a little while you allow her to leave and you follow her out. As you start to dry off she states,</p>' +
					'<p>"Satisfied? You have seen my wet body and your lusts must now be aroused, will you take me as well?"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'as she says, take her!', Place, 'type=vampyrepoolsex');
				addLinkToPlace(md, 'redress and continue on', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "vampyrepoolsex") {
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRorX("pool-sex-male.jpg");
				else this.showPerson("pool-sex-female.jpg");
				this.setFlag(16);
				addPlaceTitle(md, "Take the Vampyre by the Pool");
				md.write(
					'<p>Your vampyre is cool to the touch but a bit warmer than usually, the pool was heated. Despite how cool to the touch she is, she is hot!</p>' +
					'<p>You are amazed at times of her skill and passion but then again how long has she been around, learning these wonderful erotic talents, years, decades, centuries?</p>' +
					'<p>Later she puts back on her hooded robe and quietly waits for you to dress and to leave this place. It is difficult at times to read her expression, did she enjoy it, does that matter to you or not...</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'redress and continue on', Place);
				WritePlaceFooter(md);
				return true;
			}
		}

		// Sacred clearing
		if (Place == 141 && this.isMonstersInSacredClearing() && sType === "" && !checkPlaceFlag("SacredClearing", 2)) {
			// Guarding against monsters?
			// Will guard if you have charmed her or you are on the conspiracy path and she is charmed by Sarah
			var bGuarded = (isConspiracyPath() && this.isCharmedBy("Sarah")) || (this.isCharmedBy("You") && this.isHere());
			if (bGuarded) {
				// You are guarded!
				if (this.isCharmedBy("Sarah")) {
					// Sarah is her mistress!
					md = WritePlaceHeaderNIP(true, '', 'black');
					if (this.checkFlag(9)) {
						// a later encounter
						showPopupWindow("<i>Too Thin</i> Sacred Clearing",
							"<img src='Images/People/VampyreLilith/vamp11a.jpg' style='position:absolute;width:100%;bottom:0;right:0' alt='Vampyre'>" +
							'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:55%">' +
							"You see movement in the darkness, and there is a blur of red as the vampyre appears from the darkness. There is an explosion of blood and gore and you see the vampyre covered in blood, she looks at you and laughs and disappears into the darkness.<br><br>" +
							"Nothing whatsoever is left of who or what she attacked.",
							'dispPlace()', "left:5%;width:85%"
						);
					} else {
						// First encounter where she guards you
						showPopupWindow("<i>Too Thin</i> Sacred Clearing",
							"<img src='Images/People/VampyreLilith/vamp11a.jpg' style='position:absolute;width:100%;bottom:0;right:0;margin-left:5px' alt='Vampyre'>" +
							'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:55%">' +
							'The Sacred Clearing feels different to you, oppressive and chill. You think you can hear something moving in the darkness, and a figure rapidly approaches, a thing of decayed flesh and bones, an animated corpse of some horrible nightmare.<br><br>' +
							'It reaches for you with inhuman speed but as it does another figure appears, their arm stretches out and grabs the thing by the back of it\'s neck and it halts unable to move. It flails around trying to claw at it\'s captor, but the other figure continues to restrain it with easy. You hear the figure speak to you with contempt in <i>her</i> voice,.<br><br>' +
							'"My Mistress has commanded that I am to protect you from the wanderers. Why I do not understand, a weakling that needs protection from these deserves death". You recognise the voice, it is the vampyre and you see her more clearly, looking terrible and beautiful and with a complete look of disgust on her face..<br><br>' +
							'"My Mistress also told me to tell you, the walls of the veil and the gate are thin here in this place and they can cross into this land during the nighttime hours.".<br><br>' +
							'With that said she makes a casual gesture and you hear a sickening crack as the creature she is restraining is flung to one side, it\'s neck snapped. She then pounces on the body and there is a loud sound of wet tearing and a splattering of something. You step back, and a little while later the vampyre moves towards you, covered in blood, looking more a monster than the thing that tried to attack you. Almost with glee in her voice she says,.<br><br>' +
							'"I will feed on you, and kill you and rend your flesh. My Mistress will forget or give an order that is badly worded. Your pitiful life will be gone in a moment". She laughs and retreats into the darkness, but you know she is still there.....<br><br>',
							'setPersonFlag("Vampyre",9);dispPlace()', "left:5%;width:85%"
						);
					}
				} else if (this.place == -1) {
					// You are her master/mistress
					md = WritePlaceHeaderNIP(true, '', 'black');
					if (this.checkFlag(9)) {
						showPopupWindow("<i>Too Thin</i> Sacred Clearing",
							"<img src='Images/People/VampyreLilith/vamp11a.jpg' style='position:absolute;width:100%;bottom:0;right:0;margin-left:5px' alt='Vampyre'>" +
							'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:55%">' +
							"You see movement in the darkness, and the vampyre moves to position herself between you and whatever it is. The movement stops as if to retreat.<br><br>" +
							"With inhuman speed the vampyre moves, and there is an explosion of blood and gore and you see her standing covered in the blood of whatever that was. She looks at you with a cruel smile, and the blood coating her fades away and she redresses.<br><br>" +
							"She resumes her place at your side,<br><br>smiling but there is no mirth in that expression",
							'dispPlace()', "left:5%;width:85%"
						);
					} else {
						showPopupWindow("<i>Too Thin</i> Sacred Clearing",
							"<img src='Images/People/VampyreLilith/vamp11a.jpg' style='position:absolute;width:100%;bottom:0;right:0;margin-left:5px' alt='Vampyre'>" +
							'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:55%">' +
							"You see movement in the darkness, and the vampyre moves to position herself between you and whatever it is. The movement stops as if to retreat.<br><br>" +
							'The vampyre tells you, "A thing from beyond the veil, charged with the power of this place. It would kill you in an instant"<br><br>' +
							"With inhuman speed the vampyre moves, and there is an explosion of blood and gore and you see her standing covered in the blood of whatever that was. She looks at you with a cruel smile, and the blood coating her fades away and she redresses.<br><br>" +
							'She resumes her place at your side, smiling as she says,<br><br>"Your life is in my hands"',
							'setPersonFlag("Vampyre",9);dispPlace()', "left:5%;width:85%"
						);
					}

				} else return false; 
				setPlaceFlag("SacredClearing", 2);
				WritePlaceFooter(md);
				return true;
			}
			return false;
		}

		if (Place == 247) {
			// Crypt
			if (sType == "bound") {
				md = WritePlaceHeaderNP(false, "", "black");
				this.showPerson("vamp1b.jpg", "height:max");

				this.moveThem(-1);
				this.charmThem(4);
				this.other = 100;
				setPersonOther("Sarah", 116);

				addPlaceTitle(md, "Vampyre Bound", '', 0, false, 'white');

				md.write(
					'<p>You start to recite the spell Sarah taught you, and the vampyre screams and collapses onto the floor crying out in pain or ecstasy and you finish the spell.</p>' +
					'<p>The Vampyre stands with inhuman grace, and she partially removes her clothing, leaving a hood in place to cover most of her face. She has a beautiful, if pale body, and black hair, but her hair had odd qualities, and can appear reddish at times.</p>' +
					'<p>She stands and looks intensely at you, and speaks, her voice sensual but with a dangerous quality,<br>' +
					'<p>"' + perYou.getMaster() + ', that was the spell of Necromancy the charm of \'Bind the Dead\', or \'Unlife Enspelled\'. It has made me your thrall, in body and heart. I will do anything you command, my mind is my own but I still must obey and love you."</p>' +
					'<p>You ask her what her name is, and she replies, "That I will never tell you, no spell will compel me to reveal that ultimate truth. You may call me Lilith for the woman from legend."</p>' +
					'<p>You ask the vampyre where she came from, and she replies, "' + perYou.getMaster() + ', I am yours to command, let us return to the witch-girl before, I will kill them, and you can make them a loyal thrall. <b>You</b> may command me to do anything, except answer questions."</p>' +
					'<p>She continues, "I am yours, I will follow you to the grave, but in the daytime I must rest here."</p>' +
					'<p>She looks at you closely, "' + perYou.getMaster() + ', the ways are opening, the <i>thin</i> places will be very dangerous, and those of power, do not venture there without me, then again, I will never leave your side..."</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'examine the coffin', 248);
				addLinkToPlace(md, 'exit the crypt?', 26);
				WritePlaceFooter(md);
				return true;
			}

			if (this.other == 60 && sType === "") {
				md = WritePlaceHeader(false, "td-left-large", "black");

				// Vampyre is here!
				if (perYourBody.FindItem(46) !== 0 || perYourBody.FindItem(44) !== 0) {
					this.showPerson("vamp4a.jpg");

					addPlaceTitle(md, "Vampyre At Bay", '', 0, false, 'white');

					md.write(
						'<p>As you enter the crypt a black shadow leaps at you, the female vampyre. Again she recoils at the last moment, unable to quite approach you. She desperately struggles to approach and kill you!</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, 'flee the crypt?', 26, '', '', '', "setPersonOther('Vampyre', 1000);");
					WritePlaceFooter(md);
					return true;

				} else {
					// You left your defenses elsewhere
					this.showPerson("vamp2.jpg");
					addPlaceTitle(md, "Vampyre Attacks", '', 0, false, 'white');

					md.write(
						'<p>You enter the dark crypt and a black shadow leaps at you, a female with bared fangs, the vampyre! She pounces on your throat!</p>' +
						'<p>Your life drains away, you did not have any <b>defenses</b> against the vampyre, you were an easy prey for the vampyre.</p>' +
						'<p style="text-align:center"><b>This is the end, there is nothing left for you, you can only try again.</p>'
					);

					startQuestionsOnly();
					addRestartLink(md);
				}
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 464) {
			// Alison's home
			if (sType == "bitealison") {
				setPersonFlag('Alison', 8);
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPersonRandom("vampalison-lesbian", 2);
				addPlaceTitle(md, "Alison and 'Lily' bite each other");
				md.write(
					'<p>Alison is eager to play with \'Lily\' and calls out to you, "Cutie, watch these stacked babes bite each other"</p>' +
					'<p>She quickly removes what little she has on and then equally quickly removes Lilith\'s clothes, commenting how cute and Goth they are. Lilith shakes her head but says nothing, her usual laconic self.</p>' +
					'<p>Alison tells \'Lily\', "Let me bite you first..." kisses her, working her way down to Lilith\'s pussy and proceeds to skilfully lick, suck and finger her. She pauses and comments, "It must be cold outside, babe, let me warm you up". Lilith briefly replies, "You will" and pushes Alison down.</p>' +
					'<p>Alison almost laughs, "Oh, it\'s my time to be bitten?" and Liith smiles and kisses her breasts, then working down to Alison\'s pussy. She licks expertly and Alison quickly approaches her orgasm, but just before she does Lilith stops and moves up, lying on top of Alison. Her fangs poised at Alison\'s neck and fingers buried in Alison\'s pussy. Alison cries out in orgasm and Lilith sinks her fangs into Alison\'s neck. Alison almost screams in ecstacy.</p>' +
					'<p>Once Alison comes down she kisses Lilith and says, "Babe, you can bite me any time!"</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'let them redress', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "vampalisonthreesome") {
				setPersonFlag('Alison', 8);
				var rnd = Math.random() < 0.3 && isExplicit() && perYou.isMaleSex();
				md = WritePlaceHeader(false, rnd ? '' : 'td-left-med');
				if (!perYou.isMaleSex() || !isExplicit()) this.showPersonRandom("vampalison-threesome", 2);
				else if (rnd) this.showPersonX("vampalison-threesomebc.jpg");
				else this.showPersonRandomX("vampalison-threesomeb", 2);
				addPlaceTitle(md, "We all bite each other");
				md.write(
					'<p>Alison is eager to play with \'Lily\' and yourself and says, "Cutie, let these stacked babes give you a good bite"</p>' +
					'<p>She quickly removes what little she has on and then equally quickly removes Lilith\'s clothes, commenting how cute and Goth they are. Lilith shakes her head but says nothing, her usual laconic self, but she approaches you and strips off your clothing. As she does Alison slaps her ass and you see Lilith look at her angrily, and you immediately tell her to stop. Alison just laughs, "Cool down, you are hot stuff, but cool to the touch, calm down and we can have a good \'bite\'". Lilith looks back at you and continues removing your clothes. You wonder what would of happened if you had not stopped her...</p>'
				);
				if (perYou.isMaleSex()) md.write('<p>Between the two of them they very effectively and erotically \'bite\' your cock before you change to fucking Alison as she \'bites\' \'Lily\'</p>');
				else md.write('<p>The two take turns \'biting\' your pussy and each others. At one point Lilith sinks her fangs into Alison\'s rear-end but she just takes it as sex-play as it possibly was.</p>');
				md.write('<p>After Alison looks happy and says "Cutie, you have to bring more friends around to play!"</p>');
				startQuestions();
				addLinkToPlace(md, 'redress and talk to them more', Place);
				WritePlaceFooter(md);
				return true;
			}	
		}
		return false;
	};
	
	per.showEventSarah = function()
	{
		// Sarah's room
		var perSarah = findPerson("Sarah");
		var md, perB, myName;
		
		if (sType == "vampsarahthreesome") {
			perSarah.setFlag(13);
			md = WritePlaceHeader();
			if (!perYou.isMaleSex()) this.showPersonRandom("vampsarahthreesomeg", this.isCharmedBy() ? 1 : 2);
			else this.showPersonRandomRorX("vampsarahthreesomeb", isExplicit() ? 5 : 1);
			addPlaceTitle(md, "Feeding on Each Other");
			md.write(
				'<p>Sarah is excited to \'feed\' with Lilith and yourself but there is some awkwardness around Lilith, the great adversary of her family, but so, so desirable! </p>' +
				'<p>She quickly removes her clothing and as she does Lilith strips down naked. Sarah obviously wants Lilith but is also clearly torn about approaching her, so instead she moves to you and Lilith does the same, using you as a buffer of sort between them, allowing them to get close but with you as a short of shield, a very pleasureable experience for you!</p>'
			);
			if (perYou.isMaleSex()) md.write('<p>Between the two of them they very effectively and erotically \'feed\' on your cock before you change to fucking Sarah or Lilith, whoever is available and not licking the other or sucking your cock!</p>');
			else md.write('<p>The two take turns \'feeding\' on your pussy and each others. At one point Lilith tries to sink her fangs into Sarah but recoils and instead bite you!</p>');
			if (isPersonHere("Lauren")) md.write('<p>You see at one point the maid Lauren watching with an expression of disgust mixed with desire, hatred and lust in equal measures.</p>');
			startQuestions();
			addLinkToPlace(md, 'redress and talk to them more', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType === "vampnotbound") {
			// Vamyre is bound
			md = WritePlaceHeader();
			this.showPerson("vamp1b.jpg");

			addPlaceTitle(md, "Vampyre");

			md.write(
				'<p>You know you can free the vampyre and bind her with magic, but you are not sure how to restrain her after freeing her with the Silver Ring. If only you know more of bondage or knew someone skilled in these arts or at least talented as a courtesan.</p>' +
				'<p>You will have to leave it here, until you can work out a way to restrain the vampyre.</p>'
			);

			//Choices
			startQuestions();
			addLinkToPlaceC(md, "leave it there for now", 192);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType === "vampbound") {
			// Vamyre is bound
			perB = findPerson("Bambi");
			md = WritePlaceHeader();
			this.showPersonRandom("vamp6", 3);

			myName = perB.getYourNameFor();

			addPlaceTitle(md, "Vampyre Bound");

			md.write(
				'<p>You remember that Bambi has mentioned some experience in BDSM and phone her to join you here with Sarah. She eagerly agrees, and tells you she will be there as soon as she can. Maybe 30 mintes later there is a knock at the door and Bambi enters carrying a bag and dressed...differently. She looks around and says,</p>' +
				'<p>"Not what I expected ' + myName + ' I thought we were going to play with Miss Gates! Since I came here to play, how do you like my old school uniform? It still fits me!"</p>' +
				'<p>She giggles in a theatrical way, and continues,</p>' +
				'<p>"So is it this woman or Miss Gates who is to be the center of attention?"</p>' +
				'<p>The vampyre looks at Bambi with a murderous expression, and starts to, well, stalk towards Bambi. Sarah orders her to stop, and let Bambi tie her up. The vampyre stops with great reluctance, it seems she is near the limits of the control of the spell. Still, she sits still as Bambi gets out her bondage gear. You tell Bambi to make sure she is <b>very</b> tightly tied, <b>very</b>. Bambi winks, and continues, but Bambi being Bambi she first strips the vampyre naked before tying her extremely tightly.</p>' +
				'<p>After a while you look and the vampyre is securely bound and Bambi asks, continuing her role-playing "What kind of game are we going to play?"</p>'
			);

			//Choices
			startQuestions();
			addLinkToPlaceC(md, '"No, no, not now!"', 192, '', 'You tell Sarah and Bambi that you will forget it now and try this later');

			AddPeopleColumnMed();
			perB.showPerson("bambi14a.jpg");
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType === "vampboundfree") {
			// Vamyre is bound
			perB = findPerson("Bambi");
			md = WritePlaceHeader();
			this.showPersonRandom("vamp6", 3);
			startTimedEvent("dispPlace(192,'type=vampfree')", 1);
			AddMana(5);

			addPlaceTitle(md, "Freed Vampyre Bound");

			md.write(
				'<p>The silver ring absorbs the power of the spell binding the vampyre. Immediately the vampyre screams, a sound of fury and lust and you hear her bindings creak as she strains with her inhuman strength to break them, and kill everyone in this room.</p>' +
				'<p>Bambi looks confused, "Strange games you are playing here!"</p>' +
				'<p>You hear something snap in the vampyres bindings and you realise you only have a moment before she breaks free...</p>'
			);

			//Choices
			startQuestions();
			addLinkToPlaceC(md, "tell Bambi to leave", 192, 'type=vampfree');
			addLinkToPlaceC(md, "ask Sarah what is wrong", 192, 'type=vampfree');

			AddPeopleColumnMed();
			perB.showPerson("bambi14a.jpg");
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType === "vampyours" || (sType == "vampfree" && this.isCharmedBy("You"))) {
			perB = findPerson("Bambi");
			md = WritePlaceHeader();
			this.showPerson("vamp1b.jpg");

			addPlaceTitle(md, "Your Vampyre");

			this.place = -1;
			this.other = 100;
			perSarah.other = 116;
			this.charmThem(4);
			perSarah.setFlag(8);

			md.write(
				'<p>The vampyre stops stuggling and you realise she is yours. With a sligh hesitation you tell Bambi to untie the vampyre, she looks at you, having no idea what has just happened,</p>' +
				'<p>"What, no games?"</p>' +
				'<p>You tell her that you will play another time, and she looks disappointed, but she unties the vampyre who looks intensely and hungrily at Bambi. You tell the vampyre to stop, and then order Bambi to leave and return to the hotel. Still unsure what is happening Bambi gets her things and leaves, waving you goodbye.</p>' +
				'<p>The vampyre stands and pointedly ignores Sarah, she clearly remembers everything and appears to be feeling scorned by Sarah, her ex-mistrsss and ex-lover. She looks at you intensely, as she partially removes her clothing, leaving a hood in place to cover most of her face. She has a beautiful, if pale body, and black hair, but her hair had odd quailities, and can appear reddish at times.</p>' +
				'<p>"' + perYou.getMaster() + ', that was the spell of Necromancy the charm of \'Bind the Dead\', or \'Unlife Enspelled\'. It has made me your thrall, in body and heart. I will do anything you command, my mind is my own but I still must obey and love you."</p>' +
				'<p>You ask the vampyre where she came from, and she replies, "' + perYou.getMaster() + ', I am yours to command, <b>you</b> may command me to do anything, except answer questions."</p>' +
				'<p>She continues, "I am yours, I will follow you to the grave, but in the daytime I must rest in the crypt."</p>' +
				'<p>Without looking at Sarah she states, "' + perYou.getMaster() +  ' I will now kill the witch-girl"</p>' +
				'<p>You order her to stop and she will only kill at your command, never at any other time!. The vampyre smiles cruely, you think more for Sarah, "Of course ' + perYou.getMaster() + '"</p>'
			);

			//Choices
			startQuestions();

			addLinkToPlaceC(md, "speak to Sarah", 192);

			AddPeopleColumnMed();
			perB.showPerson("bambi14a.jpg");
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType === "vampfree") {
			md = WritePlaceHeader();
			this.showPerson("vamp3b.jpg");

			addPlaceTitle(md, "Vampyre Breaks Free");

			md.write(
				'<p>The vampyre screams as her bindings all break, and she leaps on you with inhuman speed. All goes dark...</p>' +
				'<p>...briefly you awaken to see the vampyre and Sarah embracing as they are standing over Bambi\'s body. There are fang marks on Sarah\'s neck and blood is flowing into her mouth from the vampyre.</p>' +
				'<p>They notice you are awake, and there is a blur as the vampyre attacks, killing you in an instant...</p>' +
				'<p>That would seem to be it, darkness falls over your eyes and over Glenvale as a plague of vampyres descend. You were just too slow in binding the vampyre.</p>'
			);

			//Choices
			addRestartLink(md);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType === "vampfree2") {
			md = WritePlaceHeader();
			this.showPerson("vamp3b.jpg");

			addPlaceTitle(md, "Vampyre Freed");

			md.write(
				'<p>The vampyre screams as you free her at the wrong time, and she leaps on you with inhuman speed. All goes dark...</p>' +
				'<p>...briefly you awaken to see the vampyre and Sarah embracing as they are standing over Bambi\'s body. There are fang marks on Sarah\'s neck and blood is flowing into her mouth from the vampyre.</p>' +
				'<p>They notice you are awake, and there is a blur as the vampyre attacks, killing you in an instant...</p>' +
				'<p>That would seem to be it, darkness falls over your eyes and over Glenvale as a plague of vampyres descend. You were just too slow in binding the vampyre.</p>'
			);

			//Choices
			addRestartLink(md);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "stakevampyre") {
			md = WritePlaceHeader();
			this.showPerson("vampdead.jpg");

			addPlaceTitle(md, "Your Vampyre");

			this.place = 1000;
			this.health = 0;
			perSarah.other = 116;
			this.unCharmThem();
			perSarah.setFlag(8);

			md.write(
				'<p>You tell Bambi to leave as you grab a heavy ornament and take out one of the stakes you had made. You briefly hesitate, you are after all going to kill this person, but she is a fiend, and terrible vampire!</p>' +
				'<p>You hammer the stake but to little effect, and the vampyre looks around and strains at her bonds with her inhuman strength. You hea a snap and then another, and with desperation you hammer at the stake again. Somehow how it sinks into her flesh and she screams and falls limp. You do not know if she is dead, or well more dead, or not. You finish the ill-deed until the stake is deeply embedded in her and Sarah tells you,</p>' +
				'<p>"Stop, that is enough ' + perSarah.getYourNameFor() + ', she is lain to rest. I did not expect you to do this..."</p>' +
				'<p>TSarah looks rather surprised and a little shocked. She skaes her head as she regains her composure and tells you, a little hesitantly,</p>' +
				'<p>"It is the taks of my family to guard against these creatures...I will have the body dealt with...but can you leave me for a while...please."</p>'
			);

			//Choices
			startQuestions();
			if (checkPersonFlag("Lauren", 3)) addLinkToPlace(md, 'go to the guest room', 290, '', '', '', '', 'moveblock');
			addLinkToPlace(md, 'exit the house', 16);
			WritePlaceFooter(md);
			return true;
			
		} 
		
		if (sType == "vampnohelp") {
			md = WritePlaceHeader();
			this.showPerson("vamp9s.jpg");

			addPlaceTitle(md, "Sarah and her Vampyre");

			perSarah.other = 116;
			perSarah.setFlag(8);

			md.write(
				'<p>You tell Sarah that the idea of controlling a vampyre is distateful to you and she should do her best to get her slave under her control. You promise to help her in any way you can, but not to the extent of taking the vampyre from Sarah.</p>' +
				'<p>TSarah looks disappointed,</p>' +
				'<p>"It is the taks of my family to guard against these creatures, I will just have to lean to control Lilith here better. I wish you had of take her, but so be it!"</p>'
			);

			//Choices
			startQuestions();

			addLinkToPlaceC(md, "speak to Sarah", 192);
			WritePlaceFooter(md);
			return true;
		}


		if (sType == "vampyreattackenslaved") {
			// Vampyre Awakens
			// attacks, but Sarah has the book AND you can defend here (ie have the rosay or Pamela's bracelet)
			// Binding the Vampyre
			if (!isConspiracyPath()) passTimeNight();
			md = WritePlaceHeaderNIP(false, "td-left-med", "black");

			this.showPerson("vamp1a.jpg");
			this.charmThem(4, "Sarah");
			this.other = 100;		// Vampyre bound

			addPlaceTitle(md, "Vampyre Awakes", '', 0, false, 'white');

			md.write(
				'<p>Silence envelops the night, freezing the air and chilling your spine. Sarah reaches for the book, barely ' +
				'grasping it before the sound of old timber is heard from somewhere above. She quickly starts to search the book for something.</p>' +
				'<p>You are too scared to move, and then you see a black shadow and a female form leaps to attack you, her fangs bared to bite you and drain your life away. Suddenly she recoils away from you, blocked by some force...</p>' +
				'<p>Sarah starts to recite a complex spell, and the vampire reacts and leaps to attack her. You step in the way and the vampyre recoils again. The vampyre tries again to reach Sarah, but again you stop her.</p>' +
				'<p>The vampyre screams and collapses onto the floor crying out in pain or ecstasy as Sarah finishes the spell.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, "ask Sarah what she did", Place, "type=askvampyre");
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "askvampyre") {

			md = WritePlaceHeaderNIP(false, "", "black");
			this.showPerson("vamp1b.jpg", "height:max");
			this.moveThem(192);

			addPlaceTitle(md, "Vampyre Bound", '', 0, false, 'white');

			perSarah.other = 116;
			perSarah.DropItem(4, "You");
			md.write(
				'<p>As you ask Sarah, you see the Vampyre stand, and partially remove her clothing, leaving a black hooded cloak in place to cover her. She has a beautiful, if pale body with large breasts and black hair. Her appearance is strange, her cloak seems to waver in colour and her skin seems to be changing in how pale it is.</p>' +
				'<p>She stands with a distant expression on her face and looks at Sarah, completely ignoring you. She is utterly silent and motionless as Sarah answers you,</p>' +
				'<p>"That is a spell I knew was in the book, and I knew the key to deciphering it. According to my family history it is supposed to protect us from the dead in some way"</p>' +
				'<p>Sarah returns the Book to you, and as she does the vampyre speaks to Sarah, her voice sensual but with a dangerous quality,<br>' +
				'<p>"Mistress, that was the spell of Necromancy the charm of \'Bind the Dead\', or \'Unlife Enspelled\'. It has made me your thrall, in body and heart. I will do anything you command, my mind is my own but I must obey and love you."</p>' +
				'<p>Sarah asks the vampyre her name, "That I will never tell you, no spell will compel me to reveal that ultimate truth. You may call me Lilith for the woman from legend."</p>' +
				'<p>You ask the vampyre where she came from, and she glances at you, like a lion at a piece of meat, and turns away ignoring you, and speaks to Sarah, "Mistress, I am yours to command, take the charms from the witchling and I will kill them, and make them a loyal thrall for you. <b>You</b> may command me to do anything, except answer questions.</p>' +
				'<p>Mistress, the ways are opening, the <i>thin</i> places will be very dangerous, and those of power, do not venture there without me, then again, I will never leave your side..."</p>'
			);
			if (perSarah.isCharmedBy()) md.write('<p>Sarah tells the vampyre, "' + perYou.getPersonName() + '" is my ' + perYou.getMaster() + ' so you will obey them as if I were ordering you.", to which the vampyre simply replies "No"</p>');
			else if (isConspiracyPath()) md.write('<p>Sarah tells the vampyre, "' + perYou.getPersonName() + '" is my ally so you will obey them as if I were ordering you.", to which the vampyre simply replies "No"</p>');
			else md.write('<p>Sarah tells the vampyre, "' + perYou.getPersonName() + '" is my Uncle\'s apprentice so you will obey them as if I were ordering you.", to which the vampyre simply replies "No"</p>');

			startQuestions();
			addLinkToPlaceC(md, "talk more to Sarah", 192);

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "vampyreattackdefeat") {
			// You take the book OR you never gave it to her
			// Vampyre attacks and either kills you or runs away for now
			// ie cannot be defeated
			//
			// OR
			//
			// Sarah has the book but you have no defences
			var bKilled = perYourBody.FindItem(46) === 0 && perYourBody.FindItem(44) === 0 && !this.checkFlag(11);
			if (!isConspiracyPath()) passTimeNight();
			myName = perSarah.isCharmedBy() ? perYou.getMaster() : perYou.getPersonName();

			md = WritePlaceHeaderNIP(false, !bKilled ? "td-left-large" : "", "black");
			ClearComments();

			if (bKilled) {
				// No defence - killed, Sarah can have the book or not here
				// Does she have the book?
				this.showPerson(perSarah.FindItem(4) > 0 ? "vamp3a.jpg" : "vamp2.jpg");
				addPlaceTitle(md, "Vampyre Awakes", '', 0, false, 'white');
				if (isConspiracyPath()) md.write('<p>You wait nervously, the fear rising in your heart, ');
				else md.write('<p>Darkness falls and the fear rises in your heart, ');
				if (perSarah.FindItem(4) === 0) {
					// Took it
					md.write(
						'and Sarah is looking anxiously at you,</p>' +
						'<p>"Please ' + myName + ' give me the book..."</p>' +
						'<p>A black shadow leaps through the window, a female with bared fangs, a vampyre! She pounces on your throat!</p>' +
						'<p>Your life drains away, you did not have any <b>defenses</b> against a vampyre and Sarah could not help, and were an easy prey for her.</p>' +
						'<p style="text-align:center"><b>This is the end, there is nothing left for you, you can only try again.</p>'
					);
				} else {
					// Sarah has the book but you cannot protect her
					md.write(
						'and Sarah is looking anxiously at you, and then she opens the book, looking for something.</p>' +
						'<p>A black shadow leaps through the window, a female with bared fangs, a vampyre! She looks at Sarah and then at you. Sarah starts to recite a spell, a quite complex one, and the vampyre leaps at her. You jump in the way and the vampyre pounces on your throat. As she drains your blood, she strikes Sarah down with a casual swipe of her hand.</p>' +
						'<p>Your life drains away, you did not have any <b>defenses</b> against a vampyre and Sarah could not help, you were an easy prey for the vampyre.</p>' +
						'<p>As are about to close your eyes for the last time you see a vision of how things will come to pass, the vampyre with her new servant in death, Sarah...</p>' +
						'<p style="text-align:center"><b>This is the end, there is nothing left for you, you can only try again.</p>'
					);

				}
				startQuestionsOnly();
				addRestartLink(md);

			} else {
				// Protected, and Sarah does not have the book, so the vampyre flees
				this.showPerson("vamp4a.jpg", "100%");
				addPlaceTitle(md, "Vampyre Awakes", '', 0, false, 'white');
				this.other = 60;
				this.moveThem(1000); // hiding for now

				md.write(
					'<p>Selfishly, you keep the book, despite Sarah\'s begging.</p>' +
					'<p>Silence envelops the night, freezing the air and chilling your spine. Sarah reaches to take to book from you ' +
					'and then you see a black shadow and a female form leap to attack you, her fangs bared to bite you and drain your life away.</p>' +
					'<p>Suddenly she recoils away from you, held back by some force, the flesh of her face and body rending and dissolving in places</p>' +
					'<p>Wordlessly the vampyre flees with inhuman speed back out the window, before you can act. Sarah looks at you with fear on her face but also a growing look of relief.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, "reassure Sarah", Place, 'type=reassure');
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "reassure") {

			md = WritePlaceHeaderNIP(false, "", "black");
			this.showPerson("vamp4b.jpg");
			addPlaceTitle(md, "Vampyre Repelled", '', 0, false, 'white');

			md.write(
				'<p>In the distance you see the vampyre looking back at you with hatred in her eyes, her injuries almost healed and the she is gone. Sarah signs raggedly, and you tell her,</p>' +
				'<p>"I will always protect you Sarah. I will find that vampyre and make sure she never returns."</p>' +
				'<p>Sarah looks grateful, and she warns you, "Now the ways are opening, the <i>thin</i> places will be very dangerous, I warn you to not visit the <b>Sacred Grove</b> at night, and the <b>Wild Ranges</b> might be risky while the vampyre is free, then again they will likely always be dangerous at night from now. The vampyre will have a hiding place but I have no idea where it would be, a tomb or similar place.</p>' +
				'<p>You ask Sarah why she wanted the Book, and she tells you,</p>' +
				'<p>"That is a spell I knew was in the book, and I knew the key to deciphering it. According to my family history it is supposed to protect us from the dead in some way"</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, "talk more to Sarah", 192);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "freedvampyre") {
			// Freed the vampyre with Sarah
			md = WritePlaceHeader();
			perYou.health = 0;
			this.showPerson("vamp3c.jpg");

			addPlaceTitle(md, "Vampyre Freed");

			md.write(
				'<p>The vampyre screams as you free her, and she leaps on you with inhuman speed. All goes dark...</p>' +
				'<p>...briefly you awaken to see the vampyre and Sarah embracing as they are standing over Bambi\'s body. There are fang marks on Sarah\'s neck and blood is flowing into her mouth from the vampyre.</p>' +
				'<p>They notice you are awake, and there is a blur as the vampyre attacks, killing you in an instant...</p>' +
				'<p>That would seem to be it, darkness falls over your eyes and over Glenvale as a plague of vampyres descend. You were just too slow in binding the vampyre.</p>'
			);

			//Choices
			startQuestionsOnly();
			addRestartLink(md);
			WritePlaceFooter(md);
			return true;
		}
		if (this.other == 59) {
			passTimeNight();
			md = WritePlaceHeader(false, "", "black");
			ClearComments();

			// Were you here or had left the room?
			if (nFromPlace != 192) {
				// Enter her room after dark
				this.showPerson("vamp3a.jpg");
				addPlaceTitle(md, "Vampyres", '', 0, false, 'white');

				md.write(
					'<p>You return to Sarah, and you see she is looking rather different, and a woman you have never seen is embracing her. Before you can do anything, they both pounce on you, biting your throat and draining your life away.</p>' +
					'<p>As are about to close your eyes for the last time you cannot help but regret leaving Sarah on her own...</p>' +
					'<p style="text-align:center"><b>This is the end, there is nothing left for you, you can only try again.</p>'
				);
			} else {
				// You are in the room as night falls
				this.showPerson("vamp10a.jpg");
				addPlaceTitle(md, "Prepared Vampyre", '', 0, false, 'white');

				md.write(
					'<p>You notice night has fallen, and you think about where is the vampyre, and you see a blur of movement. Sarah cries out as she crumples to the ground. For a moment you see the vampyre looking at you, the personification of power and fury.</p>' +
					'<p>You are confident of your defenses and spells to protect you, but before you can utter a word of a spell she rushes you. Any defenses you have she ignores, she must have prepared herself and is it now night when she is trongest. You collapse as she strikes and the last thing you see is he fangs as she goes to sink her teeth into your neck. If only you had sought her out when she was weaker...</p>' +
					'<p style="text-align:center"><b>This is the end, there is nothing left for you, you can only try again.</p>'
				);
			}
			addRestartLink(md);
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};

	per.showEventPopup = function()
	{
		if (isInvisible() && this.isHere() && !this.checkFlag(23)) {
			showPopupWindow("Vampyre Senses",
				this.addPersonString("pool-ask.jpg", "height:max%", "right") +
				'You are standing under the cloak of the invisibility spell and you feel the cold, dangerous presence of the vampyre Lilith standing at your side.</p>' +
				'<p>For a moment you think nothing of it and start walking and she follows you...but you are invisible, how did she realise where you are? You ask her, and she responds calmly at your voice apparently coming out of thin air,</p>' +
				'<p>"My senses are greater than those of my prey...' + perYou.getMaster() + '" and she smiles.</p>' +
				'<p>You notice she is not directly looking at you, so her vision at least may be limited, so you would assume her smell and hearing are very acute. You once heard..in a story..about a vampire hearing a mortals heartbeat. This is assuming she does not have other more supernatural powers like the second sight.',
				"setPersonFlag('Vampyre',23)"
			);
			return true;
		}
		
		if (Place == 374 && this.isHere()) {
			// Lounge room at your home and she is waiting here for you
			var perTracy = findPerson("Tracy");
			if (!this.checkFlag(28) && !this.checkFlag(29) && !perTracy.isHere()) {
				// Tracy is in bed/not here
				this.setFlag(28);
				showPopupWindow("Lilith in the Lounge Room",
					this.addPersonString("loungeb.jpg", "height:max%", "right") +
					'You see Lilith is sitting on one of the plush chairs in the lounge room in a corner, looking surprisingly relaxed. So this is what she meant by waiting nearby.</p>' +
					'<p>You ask her about her hostility to Elian, and she almost snarls as ahe bares her fangs. She really does not like Elian! She angrily says,</p>' +
					'<p>"I will <b>never</b> touch it and I will not attack unless you command me to", you ask again, as she did not really answer your question. She says,</p>' +
					'<p>"Demons hunt like a predator, but they toy and torture and kill for w whim or pleasure. A demon is not a person, it is a thing from beyond, a watcher from beyond the gates. I will not deal with them, and it is a mistake to deal with them."</p>' +
					'<p>She refuses to discuss it any more'
				);
				return true;
			}
			if (!this.checkFlag(29) && perTracy.isHere()) {
				// Tracy is here
				// Two versions, did you previously see Lilith here or not
				this.setFlag(29);
				perTracy.setFlag(18);
				perTracy.setFlag(19);
				showPopupWindow("Tracy and Lilith in the Lounge Room",
					perTracy.addPersonString("loungeteasea.jpg", "height:max%", "right") +
					'As you walk toward the lounge room you hear some muffled words like "quick..almost here" and movement. You step into the room and you see Tracy and Lilith posed on the couch a bit provocatively. Tracy smiles, and says,</p>' +
					'<p>"Hey Little ' + perTracy.getYourNameFor() + ' Lilith and I were just...exercising, did you want to join us? Three is always more fun than two?" Tracy is just being a tease as usual, but you are surprised Lilith went along with it! You say you will happily give them a workout later and Tracy laughs and returns to sitting on the couch.</p>' +
					'<p>You see Lilith walks over and sits on one of the plush chairs in the corner, looking surprisingly relaxed. So this is what she meant by waiting nearby.</p>' +
					(!this.checkFlag(28) ? '<p>You think about asking her about Elian, but decide you should do this elsewhere and Tracy is not around</p>' : '') +
					'<p>Tracy chats to Lilith and yourself, though Lilith says little, <b>but</b> she does reply at times. Tracy comments,</p>' +
					'<p>"Lilith is a cool companion here, she\'s not very talkative but you really know what she means or wants. She really hates nicknames, don\'t call her Lilly or something like that. She really likes action movies, the more violence the better. Despite her dress horror is not her thing!"</p>' +
					'<p>Somehow Tracy and Lilith get on well together, you have no idea why, but they clearly do get on!'
				);
				return true;				
			}			
		}
		
		if (Place == 450 && isCharmedBy("Leanne", "Demon") && nFromPlace == 38 && this.place == -1) addComments('<p style="margin-top: 0em; margin-bottom: 0.5em;font-size:large;cursor: pointer;"><b>Vampyre</b></p>“This place... I will not be able to get past its threshold.” Lilith seems annoyed.</p><p>“I shall wait outside, do not take too long, ' + perYou.getMaster() + '". Maybe you should talk to her when you finish inside.');
		else if (Place != 178 && !this.checkFlag(13) && !isOutside() && isOutside(nFromPlace) && this.place == -1 && sType === "") {
			if (!this.checkFlag(17)) {
				showPopupWindow("An invitation",
					this.addPersonString("notinvited.jpg", "height:max%", "right") +
					'You notice the vampyre Lilith is not with you and see she is still outside. You join her and ask why,</p>' +
					'<p>"My kind requires at least a token of an invitation to enter another\'s domain"</p>' +
					'<p>She looks annoyed and continues, "It is our nature, but you can offer the invitation and allow me to enter"</p>' +
					'<p>You are aware of the old legends about this and in future you can control your vampyre and allow her access to a place or not. For now you ask her to follow you inside.</p>',
					"setPersonFlag('Vampyre',17);setPersonFlag('Vampyre',13);dispPlace()"
				);
				return true;				
			} else if (isInvisible() && !this.checkFlag(24)) {
				this.setFlag(24);
				addComments("You notice Lilith the vampyre did not follow you inside");				
			} else addComments('<p style="margin-top: 0em; margin-bottom: 0.5em;font-size:large;cursor: pointer;">' + this.addPersonFace() + '<b>Vampyre</b></p>“As you commanded, I will wait for you outside, ' + perYou.getMaster() + '"');
		} else if (this.checkFlag(13) && Place == 196 && nFromPlace != 196 && this.place == -1) {
			if (!this.checkFlag(18)) {
				this.setFlag(18);
				addComments("You notice Lilith the vampyre did not enter the restaurant with you");
			} else if (this.checkFlag(19)) addComments('<p style="margin-top: 0em; margin-bottom: 0.5em;font-size:large;cursor: pointer;">' + this.addPersonFace() + '<b>Vampyre</b></p>“I will wait for you outside, ' + perYou.getMaster() + '"');
		} else if (Place == 375 && nFromPlace == 124 && this.place == -1 && !this.checkFlag(13)) addComments('<p style="margin-top: 0em; margin-bottom: 0.5em;font-size:large;cursor: pointer;">' + this.addPersonFace() + '<b>Vampyre</b></p>“I will not go in there ' + perYou.getMaster() + '" She refuses to explain more.');
		else if (Place == 177 && nFromPlace != 177 && this.place == -1 && !this.checkFlag(13) && !this.checkFlag(26)) {
			var perMG = findPersonNC("MrsGranger");
			if (!perMG.isCharmedBy()) {
				this.setFlag(26);
				addComments('<p style="margin-top: 0em; margin-bottom: 0.5em;font-size:large;cursor: pointer;">' + this.addPersonFace() + '<b>Vampyre</b></p>“I will wait outside ' + perYou.getMaster() + '" You ask why not and she replies cryptically "She knows too much and too little, make her yours and I will follow"');
			}
		} else if (this.checkFlag(13) && Place == 346 && nFromPlace != 346 && this.place == -1) {
			if (!this.checkFlag(21)) {
				this.setFlag(21);
				addComments('<p style="margin-top: 0em; margin-bottom: 0.5em;font-size:large;cursor: pointer;">' + this.addPersonFace() + '<b>Vampyre</b></p>“I cannot enter there. I will wait for you outside, ' + perYou.getMaster() + '"');
			} else addComments('<p style="margin-top: 0em; margin-bottom: 0.5em;font-size:large;cursor: pointer;">' + this.addPersonFace() + '<b>Vampyre</b></p>“I will wait for you outside, ' + perYou.getMaster() + '"');
		}
		
		if (sType === "forcevampyre") {
			// Force her to go swimming
			showPopupWindow("Vampyre Obeys",
				this.addPersonString("pool-force.jpg", "height:max%", "right") +
				'You have had enough of her attitude, and while she is frightening you cannot let her dominate as much as she does. You cover what fear you are feeling and trust to the spell she is under and tell her,</p>' +
				'<p>"Enough, I am your ' + perYou.getMaster() + ' and you will do as I command. This is not running water and will not harm you. You will go swimming with me any time I so command."</p>' +
				'<p>She snarls and you realise you just called the predatory vampyre a coward. You cover your fear and quickly continue, "A powerful vampyre like you is unaffected by still water and if I want to see your body or use it for my pleasure, then I will. You are mine, heart and body!". You remind her of her own words.</p>' +
				'<p>She looks at you oddly, is that a smile or even a look of respect. No, more likely of contempt well hidden. She answers,</p>' +
				'<p>"Yes ' + perYou.getMaster() + ', as you command." and she starts stripping her robe...',
				"setPersonFlag('Vampyre',15);dispPlace(Place,'type=vampyrepool')"
			);
			return true;
		}
		
		if (Place == 464 && !checkPersonFlag("Alison", 7) && this.isHere()) {
			// Alison and Lilith meet
			showPopupWindow("Alison and Lilith",
				this.addPersonString("meetalison.jpg", "height:max%", "right") +
				'Alison opens the door and greets you, "Hi there Cutie, her for some fun?" she smiles as she sees Lilith following you into her apartment. She starts to remove her clothing and asks,</p>' +
				'<p>"You brought someone else for us to play with! A Goth-chick too, pale skin, wearing vampire fangs, gorgeous but sooo goth." and she starts to undress Lilith, removing her cloak. You tell Lilith,</p>' +
				'<p>"Lilith restrain yourself", and ALison exclaims, talking to the vampyre, "Lilith, wow, a lovely Goth name, but I think I\'ll call you Lily!"</p?' +
				'<p>You almost laugh, but hold it back. Fortunately Lilith seems amused by Alison, smiling slightly, but saying nothing. You see Alison has quickly stripped them of mostly of their clothing, they are standing, breasts pressed together, and Alison tells you,</p>' +
				'<p>"Two stacked and hot chicks, I bet you can barely hold yourself back, you lucky ' + perYou.getSex() + '"</p>' +
				'<p>You have to agree and are still surprised at Lilith\'s attitude here, and then Alison tells Lilith something that clears it up for you,<p>' +
				'<p>""Lily, are you going to bite me? That sounds so hot...as long as you do not mind me biting you, or licking..."',
				"setPersonFlag('Alison',7)",
				'background-color:white;color:black', false
			);
			return true;			
		}
		
		if (Place == 177 && !checkPersonFlag("MrsGranger", 20) && this.isHere()) {
			// Mrs Granger and Lilith meet
			var perMG = findPersonNC("MrsGranger");
			var perKate = findPersonNC("Kate");
			var bKate = perKate.place == 1;
			var bKateC = bKate && perMG.checkFlag(13);
			showPopupWindow("Mrs. Granger" + (bKateC ? ", Kate" : "") + " and Lilith",
				this.addPersonString(bKateC ? "vampgrangersmeet.jpg" : "vampmrsgrangermeet.jpg", "height:max%", "right") +
				'Mrs Granger invites you in and notices Lilith, she smiles and offers to take her cape. Lilith ignores her and Mrs Granger continues on,<.p>' +
				'<p>"Hi Hon, who is this dark beauty? She is the spitting image of someone I saw in a drawing in an old history of Glenvale. An ancestor of hers no doubt" and she offers you both a drink.' + (bKate ? bKateC ? ' You notice Kate watching from a doorway nearby and she steps out to join you.' : 'You notice Kate watching nearby but see her step back into the passage leading to her room' : '') + '</p>' +
				'<p>Lilith smiles at her words, both that the drawing is probably of <b>her</b> and exactly what she wants for a drink. You explain to Mrs. Granger the Lilith does not speak much and it probably was her...ancestor...and that she has a dark personality but is loyal to you. Mrs. Granger smiles, and tells you,</p>' +
				'<p>"Well the Hon, let\'s get comfortable..." and as she says this Lilith steps towards her, pulling a cord and most of her clothes dropping away. Lilith quickly removes most of Mrs. Granders clothes' + (bKateC ? ' and then Kate\'s clothes' : '') + ' and stands there with them, a lot more comfortable you guess, or at least a lot more available!</p>' +
				'<p>Mrs Granger laughs "A woman of few words but straight to the point!"',
				"setPersonFlag('MrsGranger',20)",
				'background-color:white;color:black', false
			);
			return true;			
		}
		
		if (Place == 46 && !this.checkFlag(22) && !this.checkFlag(27) && this.isHere()) {
			// Visiting the bedroom for the first time
			if (getTotalPeopleHere(true) > 0) {
				// Someoe else is here (Tess etc)
				showPopupWindow("Lilith in Your Bedroom",
					this.addPersonString("bedroom-intro.jpg", "height:max%", "right") +
					'You lead Lilith into your bedroom and as you put your things down and take a seat you hear a noise, and you see Lilith\'s clothes drop to the ground and she rearranges her cloak red side out. Actually the cloak is odd you cannot even see the black outer layer any more!</p>' +
					'<p>She has done this without saying a word, and she poses for a moment before she also sits, well kneels near an old sculpture you had got some years ago, a stylised skull you bought when you started your interest in the occult.</p>' +
					(isPersonHere("Tess") ? '<p>Tess looks curiously at Lilith and says "Hi, I am Tess" and waits for a reply, but Lilith says nothing. You are not sure how to explain but Tess knows of the occult, so you tell her Lilith is here to help with your research and lean in and whisper to Tess, "She is not quite human". Lilith smiles and says "Not at all" to a surprised looking Tess as she notices Lilith\'s fangs. Tess whispers, "Is she a..." and Lilith says "Yes". You tell Lilith that is enough, but Tess is reluctant to discuss more, but you often see her looking at Lilith.</p>' : '') +
					(isPersonHere("MrsTanika") ? '<p>Mrs Tanika looks at Lilith, but just shrugs, she is more interested in you. She just says "Hello" to Lilith and looks away, not careing for a response or getting one.</p>' : '') +
					(isPersonHere("Anita") ? '<p>Anita looks at Lilith but nothing more as she returns her attention back to her superior officer once she sees Lilith is a fellow subordinate.</p>' : ''),
					"setPersonFlag('Vampyre',22)"
				);
			} else {
				// No one else is here, just you and her
				showPopupWindow("Lilith in Your Bedroom",
					this.addPersonString("bedroom-intro.jpg", "height:max%", "right") +
					'You lead Lilith into your bedroom and as you put your things down and take a seat you hear a noise, and you see Lilith\'s clothes drop to the ground and she rearranges her cloak red side out. Actually the cloak is odd you cannot even see the black outer layer any more!</p>' +
					'<p>She has done this without saying a word, and she poses for a moment before she also sits, well kneels near an old sculpture you had got some years ago, a stylised skull you bought when you started your interest in the occult.</p>' +
					'<p>You ask her why she has changed, and she just looks at you sitting on the bed. Does she assume you have brought her here for sex...not that it has not crossed your mind...?</p>' +
					'<p>You again ask and insist she reply, and she simply says "This is your bed-chamber and I do not need sleep"',
					"setPersonFlag('Vampyre',22)"
				);
			}
			return true;
		}
		
		if (Place != 161) return false;

		if (this.isHere() && wherePerson("Jessica") == 161 && sType === "") {
			// Hotel Cellar with Jessica
			if (!this.checkFlag(7)) {
				var perJessica = findPerson("Jessica");
				var bWitchSlave = perJessica.getRivalry() == -1;
				showPopupWindow("Vampyre and Jessica",
					this.showPersonString("vamp5c.jpg", "height:80vh", 'right') +
					'The vampyre looks at Jessica, helplessly bound and you see a smile form on her lips, and she stalks towards the helpless witch. As she does you see her lips develop a green colouration and her hood falls away revealing her beautiful face.<br><br>' +
					(!bWitchSlave ? 'If you do not stop her you can say goodbye to any sort of good relationship with Jessica and you might as well keep her as your personal witch slave!' : 'Well Jessica is your slave so there seems little harm, but the vampyre is acting oddly.') + '<br><br>' +
					'You only have a moment to react, what do you do?<br>' +
					addOptionLink('string', "allow the vampyre to feed on Jessica", isMurderPath() ? "setPersonFlag('Vampyre',7);gotoPlace(161,'type=nostopvamp')" : "setPersonFlag('Vampyre',7);per.feedOnEvent('Jessica')", "bloodblock") +
					addOptionLink('string', "ask the vampyre to stop", "setPersonFlag('Vampyre',7);gotoPlace(161,'type=stopvamp')", "bloodblock") +
					addOptionLink('string', 'stand between them, "No"', "setPersonFlag('Vampyre',7);gotoPlace(161,'type=stopvamp')", "bloodblock"),
					"", "", true, true, true
				);
				return true;
			}

		} else if (sType === "stopvamp") {
			this.setFlag(20);
			showPopupWindow("Vampyre Obeys",
				this.showPerson("vamp5b.jpg", "40%", 'right', '', '', undefined, "string") +
				'The vampyre stops, her complexion returns to normal, her lips blood-red as always.<br><br>' +
				'"Yes, ' + perYou.getMaster() + ', but a witch! Their blood is like a drug, the ultimate pleasure, aside from being in your service of course."<br><br>' +
				'You mention how her lips changed colour and she smiles, "I could taste the last witch I drained, their blood glows green to those with the sight. I can still taste her dying ecstasy as I drank the last of her...", she makes a guttural sound of pleasure."'
			);
			return true;

		} else if (sType === "nostopvamp") {
			showPopupWindow("Vampyre Feeds",
				this.showPerson("vamp5b.jpg", "40%", 'right', '', '', undefined, "string") +
				'The vampyre stops, her complexion returns to normal, her lips blood-red as always.<br><br>' +
				'"Yes, ' + perYou.getMaster() + ', but a witch! Their blood is like a drug, the ultimate pleasure, aside from being in your service of course."<br><br>' +
				'You mention how her lips changed colour and she smiles, "I could taste the last witch I drained, their blood glows green to those with the sight. I can still taste her dying ecstasy as I drank the last of her...", she makes a guttural sound of pleasure."'
			);
			return true;
		}

		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var chc = getImagePicked(this.showPersonRandom("poledance"), "poledance");
		addPlaceTitle(md, "Lilith\'s Dance");
		AddCash(10);
		md.write('<p>You lose track of Lilith for a moment and then she gracefully takes to the stage, her makeup is different ');
		if (chc == "poledancea") md.write('and she is wearing an outfit made of straps and her cloak. She dramatically bares her fangs, and you hear people near whispering "A vampire costume, a bit cliché but still hot". You have to agree.');
		else md.write('looking more \'human\' and dressed in a top and shorts, the \'Daisy Duke\' look, and damn it looks hot on her! You do hear someone comment "Has she got fangs?", they must be very observant, you did not notice any.');
		md.write(
			'</p><p>You have to admit her confident talk about seducing people is completely shown here. She dances in a highly erotic way, emphasising her agility and strength. She dances to show her erotic power over her audience, and that she has!</p>' +
			'<p>After joins you, wearing very little, most eyes in the club still on her. She tells you,</p>' +
			'<p>"Their lusts and mine are enflamed. Take me, or I will have one of them take me"</p>' +
			'<p>You consider her decree, and wonder if anyone else she takes will survive the encounter ' + (isMurderPath() ? 'alive' : 'uninjured') + '.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'take her in a private booth', Place, 'type=clubtakevampyre?chc=' + chc);
		addLinkToPlaceC(md, 'let her go with another', Place, '', 'She leaves you and gestures to an audience member and they leave the club for an encounter. Maybe 10 minutes later she returns without her companion.');
		WritePlaceFooter(md);
	};

	// Can you chat with the vampyre
	per.showPersonChat = function(bGeneral, md)
	{
		//if (!bGeneral) return;
		if (Place == 192 && perYou.health !== 0 && sType === "") {
			// Vampire story
			var perS = findPerson("Sarah");
			if ((perS.other == 10 || perS.other > 114 || (perS.other > 50 && perS.other < 100)) && this.other === 0 && isDemonFreed()) addQuestionC(md, '"Why do you keep looking out the window?"', "Sarah", 2910);
			if (this.other == 1) {
				// Vamp path just started
				addPopupLinkC(md, '"What is out there?"', 'Dark Shadows',
					'<img src="Images/graveyard2.jpg" class="imgpopup">' +
					'"Night is the time when the undead rise from the sacred clearing." She says, then continues quickly when she noticed your obvious disbelief.</p>' +
					'<p>"You know magic is real, and I can assure you creatures of legend like vampyres do exist, <i>elsewhere</i> and visit through places like the Sacred Clearing." She looks at you and you wonder how you can help here? You doubt the charm spell will be enough and while you are fit, you are not a trained fighter like Kate...</p><p>' +
					(perYourBody.FindItem(46) !== 0 || perYourBody.FindItem(44) !== 0 ? 'You do have some items that may help protect from a supernatural creature, so it might be alright?' : 'You have no idea at the moment of how to protect Sarah, or yourself! Possibly there are items of the old tale, of magic or holiness that may help?') +
					'</p><p>Maybe you should check around for information, then again you have your magic so you can probably take on the creature!',
					false, "setPersonOther('Vampyre',39);dispPlace()"
				);	

			} else if (this.other == 39) {
				startAlternatives(md);
				addQuestionC(md, '"Don\'t worry, I\'ll help you stop the vampyre, Sarah."', "Sarah", 1350);
				addQuestionC(md, '"Do we have any time?"', "Sarah", 1351);
				endAlternatives(md);
			} else if (this.other > 43 && this.other < 51) addQuestionC(md, '"Don\'t worry, I\'ll help you stop the vampyre, Sarah."', "Sarah", 1350);
			else if (this.other == 51) {
				var msg = isConspiracyPath() ? 'protect Sarah' : 'wait for darkness';
				if (perS.FindItem(4) > 0) {
					// Sarah has the book
					if (perYourBody.FindItem(46) === 0 && perYourBody.FindItem(44) === 0 && !this.checkFlag(11)) addLinkToPlaceO(md, msg, Place, 'type=vampyreattackdefeat');
					else addLinkToPlaceO(md, msg, 192, 'type=vampyreattackenslaved');
				} else {
					// Sarah does not
					addLinkToPlaceO(md, msg, Place, 'type=vampyreattackdefeat');
				}
			} else if (this.other >= 60 && !isConspiracyPath()) {
				if (!isDay()) addLinkToPlaceO(md, 'wait for daytime', '', '', '', '', "WaitforForDayNight('',192,'wait=true')");
				else addOptionLink(md, 'wait for darkness', "WaitforForDayNight('',192,'wait=true')");
			}
			if ((this.other == 100 || this.other == 60) && !isSpellKnown("Unlife Enspelled")) {
				if (perYourBody.FindItem(4) > 0) addLinkToPlaceO(md, 'try to learn the spell', Place, 'type=learnunlifeenspelled', 'I see no reason not to, here let me help you look it up', 'Sarah');		// Learn Bind the Dead
				else addQuestionR(md, 'try to learn the spell', '<p>You don&rsquo;t have the spellbook. You need the spellbook to make any progress in your research.</p>', '', '', '', '', 'optionblock');
			}
			if (this.isCharmedBy("Sarah") && perS.checkFlag(2) && perYourBody.FindItem(32) > 0) addLinkToPlaceC(md, '"I can deal with the Vampyre"', 192, 'type=vamptroubles');
		}

		if (this.isCharmedBy("Sarah") || !this.isHere()) return;

		if (Place == 453 && sType.indexOf("gabbyhousestudy") != -1 && sType != "gabbyhousestudy10" && sType != "gabbyhousestudy1") addLinkToPlaceC(md, 'order Lilith to help you', 452, 'type=vamphelpgabby');

		// After meeting Miku
		if (!checkPersonFlag("Miku", 28) && checkPersonFlag("Miku", 26) && this.isHere()) {
			addQuestionR(md, 'ask Lilith what she meant by “malkblood”',
				'“Your...” She spits the next word out in distaste. “...familiar\'s blood bears the stench of the Malkin.”</p>' +
				'<p>“They are dangerous hunters, devious, cunning, able to steal the souls of their kills.” She lovers her eyes. “But of course, the one you keep is but a pale shadow of what its ancestor must have been like, and her fickle nature will be more of a liability to you in the long run.”',
				"Vampyre",
				"bChatLeft=false;setPersonFlag(\\'Miku\\',28)"
			);
		}
				
	};


	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Using/Examining the Silver Ring
		if (no == 32) {
			var eNow = this.whereNow();
			if (cmd == 1) {
				// Examine the Silver Ring
				if (Place == 192 && eNow === 192 && this.isCharmedBy("Sarah"))
				{
					examineSilverRingStart();
					addComments(
						'<p>It seems to be reacting to the Vampyre\'s presence... getting warmer the closer you get.</p>' +
						'</td></tr></table>'
					);
					return "handled";
				}
			} else if (cmd == 2) {
				// Use the Silver Ring
				if (Place == 192 && this.isCharmedBy("Sarah")) {
					if (sType == "vamptroubles") {
						// Vampyre
						dispPlace(192, "type=freedvampyre");
						return "nofooter";
					} else if (sType == "vampbound") {
						this.unCharmThem();
						AddMana(5);
						dispPlace(192,"type=vampboundfree");
						return "nofooter";
					} else {
						// Freed the vampyre but she is not bound
						dispPlace(192,"type=vampfree2");
						return "nofooter";
					}
				}
			}
		}

		// Casting the unlife enspelled spell
		else if (no == 10 && cmd == 2) {

			if (Place == 247 && this.other == 60 && !this.isCharmedBy("You")) {
				CastUnlifeEnspelledSpell(247, 'type=bound');
				return "nofooter";
			}
			else if (Place == 192) {
				if (!this.isCharmed()) {
					CastUnlifeEnspelledSpell(192, 'type=vampyours');
					return "nofooter";
				} else if (this.isCharmed()) {
					addComments('<p>The Vampyre is already bound to ' + this.sCharmedBy + '.</p>');
					return "handled";
				}
			}
		}

		return "";		// do nothing
	};
}