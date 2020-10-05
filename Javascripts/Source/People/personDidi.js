/**********************************************
Didi
Pool girl, easter egg post end game offer
***********************************************/

function initialiseDidi()
{
	// Didi
	addPerson("Didi", 0, "Didi");
	
	per.getPossessionFace = function() { return "!sms1"; };
		
	per.whereNow = function() { return !isDay() || getDay() == "Sunday" ? 0 : this.place; };
	
	per.getNextDress = function(drs) {
		if (drs == "Yellow") return "Turquoise";
		else if (drs == "Turquoise") return "String";
		else if (drs == "String") return "Multi";
		else if (drs == "Multi") return "Jaguar";
		else if (drs == "Jaguar") return "Blue";
		return "Yellow";
	};
	
	per.passTimeDay = function() {
		if (this.place == 999) {
			if (this.getCharmedLevel() == 4) {
				if (this.dress != "Naked") this.dress = this.getNextDress(this.dress);
			} else if (this.getCharmedLevel() == 1) {
				var ar = [];
				if (!this.checkFlag(2)) ar.push("Yellow");
				if (!this.checkFlag(4)) ar.push("Turquoise");
				if (!this.checkFlag(3)) ar.push("String");
				if (!this.checkFlag(5)) ar.push("Multi");
				if (!this.checkFlag(6)) ar.push("Jaguar");
				if (!this.checkFlag(7)) ar.push("Blue");
				for (var i = 0; i < ar.length; i++) {
					this.dress = this.getNextDress(this.dress);
					for (var j = 0; j < ar.length; j++) {
						if (ar[j] == this.dress) {
							this.place = 269;		// Return to the pool
							return '';
						}
					}
				}
				this.dress = ar[0];				
			} else this.dress = this.getNextDress(this.dress);
			this.place = 269;		// Return to the pool
		}
		return '';
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		// Initial meeting at the Pool, daytime mon-sat after ending 1 offered
		if (Place == 269 && this.isHere() && !this.checkFlag(1)) {
			this.setFlag(1);
			this.dress = "Yellow";
			showPopupWindow("Welcome to the Pool",
				"<img src='Images/People/Didi/introduction.jpg' class='imgpopup' alt='Didi'>" +
				"You see a new face at the pool, well a bit more than that as she is mostly naked. The woman just came out of the changing area for the public, wearing nothing more than a towel. She looks around and sees yourself and smiles,<br><br>" +
				'"Ahh silly me, swimsuits are not optional here are they!", and she steps back into the changing room. A very short time later she returns, barely wearing her swimsuit. She smiles again,<br><br>' +
				'"Cute isnt\'t it? I\'m Didi, you coming for a swim?". She speaks with a lovely accent, possibly Welsh, and she is definitely cute, curvy and busty with some tattoos at her waist. The tattoos catch your attention but you cannot quite say why.'
			);
			return true;
		}
		return false;
	};
	
	per.showEvent = function()
	{
		var md;

		if (Place == 269 && this.isHere()) {
			
			// Times charmed (previously will include current instance)
			var cnt = this.checkFlag(2) ? 1 : 0;
			if (this.checkFlag(3)) cnt++;
			if (this.checkFlag(4)) cnt++;
			if (this.checkFlag(5)) cnt++;
			if (this.checkFlag(6)) cnt++;
			if (this.checkFlag(7)) cnt++;


			if (sType == "charmdidi1") {
				// Charm at pool 1
				if (this.dress == "Yellow") this.setFlag(2);
				else if (this.dress == "String") this.setFlag(3);
				else if (this.dress == "Turquoise") this.setFlag(4);
				else if (this.dress == "Multi") this.setFlag(5);
				else if (this.dress == "Jaguar") this.setFlag(6);
				else if (this.dress == "Blue") this.setFlag(7);
				cnt++;
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPerson("charm1.jpg");
				addPlaceTitle(md, "Didi Under a Spell" + (cnt > 1 ? " Again" : ""));
				if (cnt > 1) md.write("<p>Once again you cast the charm spell on Didi hopeful it will work this time. She seems to have no memory of the previous time you cast charm on her.");
				else md.write("<p>You cast the spell on Didi and you feel something odd, but spell does seem to work.");
				md.write(
					' Didi looks at you and smiles. Before you can say anything she removes part of her swimsuit, what little there is. She asks you,</p>' +
					'<p>"Isn\'t that better? Who needs swimwear, and I like to show-off my body"</p>' +
					'<p>You have to admit her body is worth being displayed and she should be proud of it. You compliment her and start to talk to her about desire and obedience. While she does not ignore you, she pays little attention, more showing off for your pleasure. You play along and suggest she should just completely forget the swim-wear completely</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, "Didi strips...", 269, 'type=charmdidi2');
				WritePlaceFooter(md);
				return true;

			} else if (sType == "charmdidi2") {
				// Charm 2
				md = WritePlaceHeader();
				this.showPerson("charm2.jpg");
				addPlaceTitle(md, "Didi Under a Spell" + (cnt > 1 ? " Again" : ""));
				if (cnt > 1) md.write('<p>Again this seems to play out the same as before, Didi has no recollection of the presious time. ');
				else md.write('<p>');
				md.write(
					'Didi agrees and completely strips off naked, exposing her lovely figure and ample breasts. As you look she says,</p>' +
					'<p>"While my name is short for Dierdre, most people assume it is a reference to my measurements"</p>' +
					'<p>Well double D seems about right, but you tell her it is hard to be sure that she is true to her nick-name. She grins,</p>' +
					'<p>"Come on how about a hands-on check?"</p>' +
					'<p>You can only agree and step over to her and cup her large breasts,</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'DD is about right...', 269, cnt == 3 ? 'type=charmdidi3' : 'type=charmdidisex');
				WritePlaceFooter(md);
				return true;
				
			} else if (sType == "charmdidi3") {
				// Charm Final
				md = WritePlaceHeader();
				this.showPerson("charm3.jpg");
				addPlaceTitle(md, "Didi Under a Spell" + (cnt > 1 ? " Again" : ""));
				this.charmThem(4);
				this.dress = "Naked";
				this.moveThem(999);
				md.write(
					'<p>You notice Didi rub the tattoo on her hip and you step back and ask her about it. She lies back in the water of the pool and looks up at you,</p>' +
					'<p>"I do not know, but you are really, really sexy..."</p>' +
					'<p>Something is different this time, so you suggest that maybe she would like to explore her submissive nature. She shakes her head,</p>' +
					'<p>"Not really, I have never been into that sort of stuff, but I do not mind a little role-playing, ' + perYou.getMaster() + '"</p>' +
					'<p>Interesting, the tattoo has allowed her to retain some independence, but she seems under the influence of the spell. Didi stands and gives you a kiss and says "Sorry I gotta go and get back to work. I hope to see you another time, ' + perYou.getMaster() + '". With that she picks up her swimsuit and leaves.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'Didi leaves again...', 269);
				WritePlaceFooter(md);
				return true;

			} else if (sType == "charmdidisex") {
				// Charm Sex (end)
				md = WritePlaceHeader(false, !perYou.isMaleSex() && !isExplicit() ? 'td-left-med' : '');
				if (perYou.isMaleSex()) this.showPersonRandomRorX("!pool-sexb", isExplicit() ? 2 : 1);
				else if (isExplicit()) this.showPersonX("!pool-sexga.jpg");
				else this.showPersonRandom("!pool-sexg", 2);
				this.moveThem(999);

				addPlaceTitle(md, "Didi Under a Spell" + (cnt > 1 ? " Again" : ""));
				if (perYou.isMaleSex()) {
					md.write(
						'<p>Didi steps over and starts to pull down your trousers and in short order you are unclothed and fucking the busty and naked woman.</p>'
					);
				} else {
					md.write(
						'<p>Didi steps over and starts to pull down your pants and in short order you are licking and being licked by the busty and naked woman.</p>'
					);
				}
				md.write('<p>A little before the end, you notice her tatto is slighly glowing.');
				if (cnt == 1) {
					md.write(
						' Afterwards you ask her about the tattoo and she tells you,</p>' +
						'<p>"I met this girl one time, she was called Faye, and called herself a fae. Well she may of been deluded and thought she was one of the y Tylwyth Teg, but more likely an eccentric. Still she was cute and we hung out and had a lot of fun. She gave me this tattoo, telling me it was a protective charm that would shield me from curses, but only a few times!"' +
						'<p>Well this Faye may of had some knowledge of magic and the tattoo may be a <b>ward</b>, but possibly only for a limited time. Possibly you should try this again another day?'
					);
				}
				md.write('</p><p>Didi gives you a kiss and says "Sorry I gotta go and get back to work. I hope to see you another time". With that she picks up her swimsuit and leaves.</p>');
			
				startQuestions();
				addLinkToPlace(md, 'Didi leaves', 269);
				WritePlaceFooter(md);
				return true;
			}	else if (sType == "chattodd") {
				// Chat to Didi
				md = WritePlaceHeader();
				this.showPerson("pool-talk.jpg");
				addPlaceTitle(md, "Chatting with Didi");
				md.write(
					'<p>You notice Didi rub the tattoo on her hip and you step back and ask her about it. She lies back in the water of the pool and looks up at you,</p>' +
					'<p>"I do not know, but you are really, really sexy..."</p>' +
					'<p>Something is different this time, so you suggest that maybe she would like to explore her submissive nature. She shakes her head,</p>' +
					'<p>"Not really, I have never been into that sort of stuff, but I do not mind a little role-playing, ' + perYou.getMaster() + '"</p>' +
					'<p>Didi stands and gives you a kiss and says "Sorry I gotta go and get back to work. I hope to see you another time, ' + perYou.getMaster() + '". With that she picks up her swim-suit and leaves.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Let\'s fuck"', 269, 'type=charmdidisex');
				if (this.dress == "Naked") {
					addPopupLink(md, '"I want to see you in bikini\'s again"', "Changing",
						"<img src='Images/People/Didi/pool-change.jpg' style='width:50%;float:right;margin-left:5px' alt='Didi'>" +
						'You ask Didi to start wearing her bikini\'s again and she nods her head,<br><br>' +
						'"Sure, but it is a pitty to cover up all this", she stands to show you what you will be missing. She blows you a kiss and walks off to the changing room. You expect her to return wearing a bikini, but a little later she calls you to say "See you". While she is under the spell, she has certainly retained some independence.',
						true, "movePerson('Didi',999);per.dress=''");
				} else {
					addPopupLink(md, '"I want to see you naked again"', "Changing",
						"<img src='Images/People/Didi/pool-change.jpg' style='width:50%;float:right;margin-left:5px' alt='Didi'>" +
						'You ask Didi to stop wearing her bikini\'s again and she nods her head, and simply removes her bikini!',
						true, "findPerson('Didi').dress='Naked'");
				}
				addLinkToPlaceC(md, 'leave Didi for now', 269, '', 'As you leave you notie Didi heads off to the changing room', '', "movePerson('Didi',999)");
				WritePlaceFooter(md);
				return true;
			}
		}

		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonName();
		this.showPersonRandom("!poledance", 1);
		addPlaceTitle(md, "Didi's Dance");
		md.write(
			'<p>' + nm + ' takes the stage dressed in a version of exotic dancing wear!</p>' +
			'<p>' + nm + ' is not an experienced dancer but she entertains the audience well. ' + nm + ' is a lot more focused on you than the general audience, dancing almost as your private dancer!</p>' +
			'<p>After she collects her tips and offers them to you, but you know Jade has a performance fee for you, and ' + nm + ' deserves ' + this.getHisHer() + ' tips.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	// Text shown in a location
	per.showPersonTextHere = function(md)
	{
		if (Place == 269 && this.isHere() && sType === "" && this.checkFlag(1)) md.write('<p>You see Didi enjoying herself in the pool.</p>');
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 269 && this.isHere() && sType === "" && this.getCharmedLevel() == 4) addLinkToPlaceC(md, 'talk to Didi', 269, 'type=chattodd');
	};

	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// At the pool
			if (Place == 269 && this.isHere() && sType === "") {
				CastCharmSpell("Didi", 269, 1, 'type=charmdidi1');
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls
	per.addPersonPhoneCall = function()
	{
		// Inital charm attempts
		if (this.place != 999 && this.getCharmedLevel() == 1) {
			var cnt = this.checkFlag(2) ? 1 : 0;
			if (this.checkFlag(3)) cnt++;
			if (this.checkFlag(4)) cnt++;
			if (this.checkFlag(5)) cnt++;
			if (this.checkFlag(6)) cnt++;
			if (this.checkFlag(7)) cnt++;

			if (makeCall(true, cnt > 1 ? 281 : 280)) {
				this.unCharmThem();
				AddMana(10);
			}
		}
		// Final charm SMS
		if (this.place != 999 && this.getCharmedLevel() == 4 && !this.checkFlag(10)) {
			if (makeCall(true, 282)) this.setFlag(10);
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 280) return receiveSMS('DD', 'Hey there, I found your number in my phone. Did we hook up yesterday? Sorry I must have been drunk I do not really remember it. Sorry', 'sms1.jpg');
		if (id == 281) return receiveSMS('DD', 'We did hook up at the pool yesterday? Not sure I remember...gotta go my hip itches...', 'sms2.jpg');
		if (id == 282) return receiveSMS('DD', "Hey " + this.getYourNameFor() + ', come and see me at the pool sometime', perYou.isMaleSex() ? 'sms3b.jpg' : 'sms3g.jpg');
		return '';
	};
}
