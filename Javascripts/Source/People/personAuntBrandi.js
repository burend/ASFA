/**********************************************
Aunt Brandi
Your aunt, your mothers younger sister and Kylie's mother
***********************************************/

function initialiseAuntBrandi()
{
	// Aunt Brandi
	addPerson("Brandi", 400, "AuntBrandi");
	
	per.getPersonName = function(full) {
		if (full === true) return "Aunt Brandi";
		return this.isCharmedBy() ?  "Brandi, Your " + (this.checkFlag(18) ? "Slut" : "Slave") + "-Aunt" : "Aunt Brandi";
	};
	per.getPersonNameShort = function() { return "Aunt Brandi"; };

	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		if (this.isCharmedBy()) {
			if (this.checkFlag(18)) return "<p>" + this.addPersonString("brandi0a.jpg", "height:max%", "right") + "Aunt Brandi, your mother\'s younger sister and mother of Kylie. Athletic and now completely submissive to you, your Slave-Aunt.";
			return "<p>" + this.addPersonString("brandi0a.jpg", "height:max%", "right") + "Aunt Brandi, your mother\'s younger sister and mother of Kylie. Athletic and now a complete nymphomaniac who enjoys watching her daughter with you or anyone else. She is you Slut-Aunt.";
		}
		return "<p>" + this.addPersonString("brandi0a.jpg", "height:max%", "right") + "Aunt Brandi, your mother\'s younger sister and mother of Kylie. Athletic and controlling of her daughter.";
	};
	
	per.getPersonAddress = function() { return isPlaceKnown("AuntsHouse") ? '7 Cherise Rd, Glenvale' : ''; };
	
	per.isNympho = function() { return this.checkFlag(18); };
	
	per.getSuffix = function(simple) {
		if (!this.isCharmedBy() && !this.checkFlag(18) && !this.checkFlag(19)) return "";
		if (simple === true) return this.checkFlag(18) ? "" : "-slave";
		return this.checkFlag(18) ? "-nympho" : "-slave";
	};
	
	per.whereNow = function()
	{
		if (Place == 435) {
			if (isShopOpen(4, 2, true) && this.checkFlag(1) && this.checkFlag(3)) {
				var p = findPersonNC("Alison");
				if (p == null || p.isHere()) return false;
				var hr = this.hoursSince(this.other);
				if ((hr <= 2 || hr > 40) && !isMorning()) return 435;
			}
		}
		if (Place == 402) return Place;
		if (Place == 125 && isMorning() && isWeekDay() && sType === "") {
			if (!this.checkFlag(29)) return 125;
		}
		return this.place;
	};
	
	per.passTimeDay = function() {
		// Fallback in case the Mom version does not 'fire'
		if (this.place == 899) this.place = 400;
		this.setFlag(25, false);
		this.setFlag(29, false);
		return '';
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 125 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) {
				if (findPerson("Glenvale").checkFlag(37)) return this.showPersonRandom("lesson-nude", 2, '', '', '', '', 0, false, "string");
				return this.showPersonRandom("lesson", 3, '', '', '', '', 0, false, "string");
			} else return this.showPerson("lessona.jpg", '', '', '', '', false, "string");
		}		
		return '';
	};

	per.showEventPopup = function()
	{	
		// Dreams
		if (sType == "brandidream1") {
			this.setFlag(5);
			showPopupWindow("Dreaming",
				this.addPersonString("dream1.jpg", "height:max%", "right") +
				'You remember having a dream and Aunt Brandi featured heavily. Her domination and control of Kylie must of got to you as the dream centered around her being bound helplessly and submissively bowing to all your perverted desires.' +
				(sComment !== '' ? '</p><p>' + sComment : '')
			);
			return true;
		}
		if (sType == "brandidream2") {
			this.setFlag(6);
			showPopupWindow("Dreaming",
				this.addPersonString("dream2.jpg", "height:max%", "right") +
				'You remember having an erotic dream of many people, with writing flesh and carnal desires fulfilled. Few of their faces are clear in your memory but one stood out, your Aunt Brandi...' +
				(sComment !== '' ? '</p><p>' + sComment : '')
			);
			return true;
		}	
		if (sType == "brandidream3") {
			this.setFlag(14);
			showPopupWindow("Dreaming",
				this.addPersonString("dream3.jpg", "height:max%", "right") +
				'You remember having dream about Aunt Brandi, it felt very nice and she was very affectionate. You do clearly remember though that she was very pregnant...' +
				(sComment !== '' ? '</p><p>' + sComment : '')
			);
			return true;
		}			
		
		if (Place == 400 && !this.checkFlag(9)) {
			this.setFlag(9);
			this.place = 402;
			this.extra[0] = nTime;
			movePersonfterTime("Brandi", 400, 5);
			showPopupWindow("Visiting",
				this.addPersonString("initialvisit.jpg", "height:max%", "right") +
				'You knock on the door and Aunt Brandi answers looking a bit wary and she escorts you into the living room. You see Kylie sitting on the couch, she must be waiting for you. Aunt Brandi tells you,</p>' +
				'<p>"All right young ' + perYou.getManWoman() + ' a few ground rules. You can hang out with Kylie here or in her room with the door open." She then looks at Kylie and says "Cousins are not ok" and you see Kylie look resigned, they must have discussion something on these lines. She looks back at you,</p>' +
				'<p>"I have to catch up with some housework, do not bother me while I am working". You make a token offer to help, and while she smiles briefly she immediately refuses commenting there is not much left to do. She leaves the living room but you can hear her nearby somewhere.</p>' +
				'<p>Kylie says "She won\'t be long but until then we are almost alone, almost"'
			);
			return true;
		}
		if (this.hoursSince(this.extra[0]) < 12 && Place == 401 && this.place == 400 && !this.checkFlag(13)) {
			// Finished cleaning and you are in Kylie's room
			this.setFlag(13);
			showPopupWindow("Aunt Looking In",
				this.addPersonString("peek.jpg", "height:max%", "right") +
				'You are sitting with Kylie on her bed and you hear something. Suddenly Kylie talks about mathematics and you turn and see Aunt Brandi at the door. You would swear she is looking flushed and her clothing is a bit disarrayed. Well she has just been doing some house work, but could she have been watching?</p>' +
				'<p>She says "You are here to study and hang-out, not to hook-up. Kylie is your cousin remember!"</p>' +
				'<p>Kylie assures her you were just talking and studying and you say something in agreement. Aunt Brandi shakes her head and leaves. You must expect you expected a worse reaction considering how Kylie is dressed!</p>'
			);
			return true;
		}
		
		if (isAtLocation(400) && getHour() > 21 && !this.isCharmedBy()) {
			showPopupWindow("Time to go",
				this.addPersonString("questions.jpg", "height:max%", "right") +
				'Aunt Brandi ' + (Place == 401 ? 'steps into the bedroom and ' : '') + 'says,</p>' +
				'<p>"It is getting late I said you can only visit in the evening and it is past that now. Goodbye and say hello to Alex for me"</p>' +
				'<p>There is not room for compromise or bargaining in her tone. You say goodbye to her and Kylie and leave.</p>',
				'gotoPlace(37)'
			);
		}
		
		if (Place == 400 && !this.isCharmedBy() && !this.checkFlag(30) && (this.checkFlag(18) || this.checkFlag(19))) {
			this.setFlag(30);
			showPopupWindow("The Approach",
				this.addPersonString("loungeu" + this.getSuffix() + ".jpg", "height:max%", "right") +
				'You see Kylie and Aunt Brandi but now you have decided Aunt Brandi is ' +
				(this.isNympho() ? 'a bit of a slut or even a nymphomaniac, you are going to have to provoke her, to tease her with Kylie. Get her so aroused the spell will push her over the limit and actually work!' :
										 'domineering, stubborn and controlling. You are reminded of a dream you had of her submissive and bound. You think you can charm her but you need to weaken her resistance. Hypnosis seems the most likely way to proceed. You think you could ask Kylie to help, and maybe teach her enough so she can start the process and then later on you can finish the process.') +
										 '</p><p>You will have to talk to Kylie privately, and this is likely to take  while, possibly a few days...'
			);
			return true;
		}
		return false;
	};
	
	per.showEventLounge = function()
	{
		var md;
		
		if (sType == "questionjob") {
			md = WritePlaceHeader();
			makeCall(true, 370, '', true);
			this.setFlag(11);
			newSMS();
			this.showPerson("questions.jpg");
			addPlaceTitle(md, "Aunt Brandi's Work");
			md.write(
				'<p>You ask Aunt Brandi about what so does for a living. You once heard she was a sportswoman but you do not know what in and ask if she still competes?</p>' +
				'<p>She actually smiles "I was a tennis player on the pro circuit, playing against some of the world\'s best." She looks thoughtful for a moment, it seems to be happy memories from her expression. You ask how well she ranked,</p>' +
				'<p>She looks a little regretful, "I was fairly low ranked and after a while realised I was not going to be able to reach number 1 or anywhere near. I played my best and competed as long as I could before I retired. It was a wonderful time in my life..."</p>' +
				'<p>She continues, "I work currently as a private tennis instructor mostly, but I have investments from my time on the circuit that keep us comfortable." She looks at Kylie and continues,</p>' +
				'<p>"Kylie is quite good at her sports, volleyball particularly. If only she would train properly she could make a go of it" Kylie looks a little frustrated, clearly a conversation they have had often and she replies,</p>' +
				'<p>"Mum you know I enjoy the games, I just do not want to do it seriously". You try to distract a little from the tension and ask where Aunt Brandi usually gives her lessons. As you do you notice Kylie doing something on her phone.</p>' +
				'<p>Aunt Brandi does not notice and answers "Usually at the courts at the \'Broken Inn\' but sometimes at a client\'s home if they have a court but usually at the hotel." Interesting, you had not noticed any tennis courts at the hotel!</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'agree Kylie looks good on the volleyball court', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "questionoccult") {
			md = WritePlaceHeader();
			this.showPerson("questions.jpg");
			addPlaceTitle(md, "Aunt Brandi's and the Occult");
			md.write(
				'<p>You know Mom said Aunt Brandi is not into the occult but you have to check, there must be something protecting her, something magical you assume.</p>' +
				'<p>You talk about your interest in the occult and the Kurndorf cult but before you get far Aunt Brandi says,</p>' +
				'<p>"Yes, yes, we all heard this stuff in history class, it is just old tales, and exaggerations. I prefer to think of the present and what is <b>real</b>"</p>' +
				'<p>That "<b>real</b>" bit shows she is totally opposed to any ideas around magic. You try to approach a different way like you are a collector of items of the time and ask if she has any old family items or other jewelery from the time. She shakes her head,</p>' +
				'<p>"Our family is not from Glenvale until recently, and I much prefer modern jewelry. I am not into antiques."<p>' +
				'<p>Well that seems that, any sort of protective item is almost impossible, as it any sort of magical protection and she would not of submitted or gotten involved in any ritual.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'comment how you like her jewelry and talk of something else', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "augmentedhypno1") {
			md = WritePlaceHeader();
			this.setFlag(21);
			this.showPerson("loungeu" + this.getSuffix() + ".jpg");
			addPlaceTitle(md, "Trying to Hypnotise Aunt Brandi");
			md.write(
				'<p>You prepare the spell and call out to her and then firmly grasp her arm to complete the induction...except she agiliy steps to the side. After all she was a professional athlete and is very fit, and very likely stronger than you are! She looks around and asks what is it? You make up some lame story about an insect and swatting it away. She does not look quite convinced but does not disbelieve enough to call you a liar.</p>' +
				'<p>It seems that this is not going to work, at least not until she will trust you more, but then it strikes you, she trusts Kylie. You could teach Kylie some hypnotic techniques, you doubt teaching her the magic technique is a good idea, would the spell <b>she is under</b> interfer. Still you can teach her though it may take a while given her difficulty to focus on non-sexual things while you are around. Then again from what she has told you she may not of been much different before the spell...</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'leave Aunt Brandi for now', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "augmentedhypno2") {
			md = WritePlaceHeader();
			this.showPerson("loungeu" + this.getSuffix() + ".jpg");
			addPlaceTitle(md, "Putting Aunt Brandi into a Trance");
			md.write(
				'<p>You prepare the spell and call out to her and then firmly grasp her arm to complete the induction. and this time it works, she does not avoid your touch!</p>' +
				'<p>Oddly she looks the same but there is a slight distance to her expression, and a test question confirms she is in a trance!</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'end the trance', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmbrandinympho1") {
			md = WritePlaceHeader();
			this.showPerson("charm1n.jpg")
			addPlaceTitle(md, "Aunt Brandi Under a Spell");
			md.write(
				'<p>You cast the spell on your aroused Aunt and you see her lean in towards you, a definite look of desire in her expression and you see her eyes flash, it seems to be working.</p>' +
				'<p>You start to talk of her about how you desire her and she desires you, but she is not paying much attention to your words, just to your body...</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'ask her to remove some of her clothes', Place, 'type=charmbrandinympho2');
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "charmbrandinympho2") {
			md = WritePlaceHeader();
			this.showPerson("charm2n.jpg")
			addPlaceTitle(md, "Aunt Brandi Under a Spell");
			md.write(
				'<p>With little hesitation she starts to lower her tight dress exposing her bra and she says,</p>' +
				'<p>"You should not be doing these things with Kylie..." and you ask if she means <b>only</b> with Kylie?</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'she exposes her panties', Place, 'type=charmbrandinympho3');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmbrandinympho3") {
			md = WritePlaceHeader();
			this.showPerson("charm3n.jpg")
			addPlaceTitle(md, "Aunt Brandi Under a Spell");
			md.write(
				'<p>Aunt Brandi smiles but says,</p>' +
				'<p>"I am sure Kylie does not know as much as I do or have as much experience as I do, but you are my sisters child, we are family"</p>' +
				'<p>You tell her that does not matter, and there is nothing illegal here, and nothing you think of as wrong!. She smiles...</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'she removes her panties', Place, 'type=charmbrandinympho4');
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "charmbrandinympho4") {
			md = WritePlaceHeader();
			this.showPerson("charm4n.jpg")
			addPlaceTitle(md, "Aunt Brandi Seduced By a Spell");
			md.write(
				'<p>Aunt Brandi removed her panties and leans in the couch in a clear invitation, and you happily accept! You claim you new lover, your nymphomaniac Aunt!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk more to the mother and daughter', Place);
			WritePlaceFooter(md);
			return true;
		}		
		
		if (sType == "charmbrandislave1") {
			md = WritePlaceHeader();
			this.showPerson("charm1s.jpg")
			addPlaceTitle(md, "Aunt Brandi Under a Spell");
			md.write(
				'<p>While she is in the trance you cast the charm spell and she sighs but says nothing, but you clearly see a flash in her eyes, it seems to be working.</p>' +
				'<p>You talk to her about trust and how she can completely rely on you, after all Kylie does, and Kylie says "Completely!". You talk about how you are family and you can alway trust family.</p>' +
				'<p>You check and the trance is still in place and her eyes are still altered. You do a test...</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'tell her to take off her jacket', Place, 'type=charmbrandislave2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmbrandislave2") {
			md = WritePlaceHeader();
			this.showPerson("charm2s.jpg")
			addPlaceTitle(md, "Aunt Brandi Further Under a Spell");
			md.write(
				'<p>She goes to remove her jacket but she is not wearing it, so silently she instead removes her top, and quietly looks at you smiling but distant in her trance.</p>' +
				'<p>You continue talking to her about trust and how she can implicitly and absolutely trust and rely on you, about how you will do anything to help and protect her and Kylie.</p>' +
				'<p>You continue weaving your words surrounding her thoughts in complete trust in you and more and more in how she should rely on you and that whatever you say is in her best interest.</p>' +
				'<p>You take the next step...</p>'
				
			);
			startQuestions();
			addLinkToPlaceC(md, 'tell her she desires you', Place, 'type=charmbrandislave3');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmbrandislave3") {
			md = WritePlaceHeader();
			this.showPerson("charm3s.jpg")
			addPlaceTitle(md, "Aunt Brandi Being Enslaved Under a Spell");
			md.write(
				'<p>You tell her she is very, very desirable and how much you desire her and how much she desires you. As you she she removes more of her clothing and says something dreamily but troubled "Kylie..." and you can see she is aware of your relationship with Kylie though not completely.</p>' +
				'<p>You tell her there is nothing to worry about, no need for jealousy, Kylie trusts you and desires you as should her mother. You can desire both and they can both desire and trust you.</p>' +
				'<p>She smiles again as she stands there only in her bra and then you tell her she also needs to...</p>'
				
			);
			startQuestions();
			addLinkToPlaceC(md, '"love and obey me"', Place, 'type=charmbrandislave4');
			WritePlaceFooter(md);
			return true;
		}	

		if (sType == "charmbrandislave4") {
			md = WritePlaceHeader();
			this.showPerson("charm4s.jpg")
			addPlaceTitle(md, "Aunt Brandi Enslaved By a Spell");
			md.write(
				'<p>You tell her she should love and obey you implicitly and that obeying you is very arousing for her. She starts to react, resisting so you tell her "Remove your bra, my Slave-Aunt"</p>' +
				'<p>She gasps and you see her pussy glisten with her wetness and you are fairly sure she just had an orgasm. She removes her bra and shudders, she seems to have orgasmed again.</p>'				
			);
			startQuestions();
			addLinkToPlaceC(md, 'claim her as your slave', Place, 'type=charmbrandislave5');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmbrandislave5") {
			md = WritePlaceHeader();
			this.showPerson("charm5s.jpg")
			addPlaceTitle(md, "Aunt Brandi Enslaved By a Spell");
			md.write(
				'<p>You tell that it is time for you to claim her body and soul. You embrace your Aunt while Kylie watches slowly starting to masturbate.</p>' +
				'<p>You take your Aunt and as you reach your peak you look into Kylie\'s eyes as you ' + (perYou.isMaleSex() ? 'unload into your Aunt\'s womb' : 'orgasm on your Aunt\'s face') + '. You see Kylie also orgasm from her fingers!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk to your new slave and her daughter', Place);
			WritePlaceFooter(md);
			return true;
		}		

		if (sType == "branditflounge") {
			md = WritePlaceHeader();
			this.showPersonRandomRorX("lounge-tf", isExplicit() ? 4 : 1);
			addPlaceTitle(md, "Aunt Brandi\'s Tits");
			md.write(
				'<p>Aunt Brandi gives you a tit-fuck</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk more with them', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "brandifucklounge") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) {
				if (this.isNympho() || !isExplicit()) this.showPersonRandomRorX("lounge-fuckb", isExplicit() ? 5 : 1);
				else this.showPersonRandomX("lounge-slave-fuckb", 2);
			} else this.showPersonRandom("lounge-fuckg", 3);
			addPlaceTitle(md, "Fucking your Aunt");
			md.write(
				'<p>You fuck Aunt Brandi</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk more with them', Place);
			WritePlaceFooter(md);
			return true;
		}			
		if (sType == "brandibjlounge") {
			md = WritePlaceHeader();
			if (!isExplicit()) this.showPersonRandomBG("lounge-bj", 1);
			else if (perYou.isMaleSex()) this.showPersonRandomX("lounge" + this.getSuffix(true) + "-bjb" , this.isNympho() ? 6 : 3);
			else this.showPersonRandomRorX("lounge-bjg", 1);
			addPlaceTitle(md, "aunt Brandi\'s Blowjob");
			md.write(
				'<p>Aunt Brandi gives you a blowjob</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk more with them', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "brandikylielounge") {
			md = WritePlaceHeader();
			this.showPersonRandomRorX("brandikylie", 3);
			addPlaceTitle(md, "Kylie and Aunt Brandi");
			md.write(
				'<p>Kylie and Aunt Brandi put on a show for you</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk more with them', Place);
			WritePlaceFooter(md);
			return true;
		}		
		if (sType == "threesomelounge") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("threesomekylieb", isExplicit() ? 5 : 1);
			else this.showPersonRandomRorX("threesomekylieg", isExplicit() ? 3 : 1);
			addPlaceTitle(md, "Mother/Daughter Threesome");
			md.write(
				'<p>You have a threesome with Kylie and Aunt Brandi</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk more with them', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "tease1") {
			// Tease Aunt Brandi 
			perKylie = findPerson("Kylie");
			md = WritePlaceHeaderNIP();
			this.setFlag(22);
			this.setFlag(25)
			perKylie.showPerson("tease1.jpg");
			addPlaceTitle(md, "Teasing Kylie");
			this.showPerson("tease1.jpg", "30%", "right");
			md.write(
				'<p>You talk about teasing Aunt Brandi with Kylie and she loves the idea and enthusiastically discussed what to do, taking the lead really.</p>' +
				'<pYou wait for Aunt Brandi to leave the lounge room, then you both got out there an Kylie has you tie her up with some clothing and partly remove her shirt.</p>' +
				'<p>You wait for Aunt Brandi to return and start an exaggerated "' + perYou.getMaster() + ' and slave-girl" sort of game, particularly talking about what you are going to do sexually to your helpless slave.</p>' +
				'<p>Aunt Brandi hesitates and sits on a chair looking \'bothered\' and then tells you both to stop the game, and she pointedly tells you to leave and not return, tonight. You note the <b>tonight</b>, not to never return, just for tonight!</p>' +
				'<p>You definitely got somewhere with Aunt Brandi, you think you need to just keep it up, and decide to try again tomorrow.</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'Kicked out of the home', 37);
			WritePlaceFooter(md);
			return true;
		}			
		
		if (sType == "tease2") {
			// Tease Aunt Brandi 
			perKylie = findPerson("Kylie");
			md = WritePlaceHeaderNIP();
			this.setFlag(23);
			this.setFlag(25);
			perKylie.showPersonBG("tease2.jpg");
			addPlaceTitle(md, "Teasing Kylie");
			this.showPerson("tease2.jpg", "30%", "right");
			md.write(
				'<p>You talk about teasing Aunt Brandi with Kylie and she loves the idea and enthusiastically discussed what to do, taking the lead really.</p>' +
				'<p>Kylie dresses in a school uniform and you wait for Aunt Brandi to leave the lounge room, then you both got out there and Kylie kneels down and removes some of her clothes.</p>' +
				'<p>You wait for Aunt Brandi to return and Kylie talks ask if she is about to do something sexually to you, something oral, but not directly using the words, just innuendo and implication.</p>' +
				'<p>Aunt Brandi hesitates and sits down looking <b>very</b> \'bothered\'. For a moment she lifts her skirt exposing her panties, and it looks like she is about to start masturbating. She shakes her head and pulls down her skirt and then tells you both to stop the game, and she pointedly tells you to leave and not return, tonight. You note the <b>tonight</b>, not to never return, just for tonight!</p>' +
				'<p>You definitely got somewhere with Aunt Brandi, she was more affected than last time and you think you need to do this probably one more time, and decide to try again tomorrow.</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'Kicked out of the home', 37);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "tease3") {
			// Tease Aunt Brandi 
			perKylie = findPerson("Kylie");
			md = WritePlaceHeaderNIP();
			this.setFlag(24);
			perKylie.showPerson("tease3.jpg");
			addPlaceTitle(md, "Teasing Kylie");
			this.showPerson("tease2.jpg", "30%", "right");
			md.write(
				'<p>You talk about teasing Aunt Brandi with Kylie and she loves the idea and enthusiastically discussed what to do, taking the lead really.</p>' +
				'<p>Kylie strips off completely and you wait for Aunt Brandi to leave the lounge room, then you both got out there an Kylie has you tie her up in a soft domination/submission sort of play.</p>' +
				'<p>You wait for Aunt Brandi to return and start a "' + perYou.getMaster() + ' /slave" sort of exchange, trying to be erotic but not overtly sexual.</p>' +
				'<p>Aunt Brandi hesitates looking <b>extremely</b> \'bothered\' and she sits down and pulls up her skirt and starts masturbating while watching you. She says nothing, just watches.</p>' +
				'<p>If now is not the time to charm her then you should very soon!</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'it is time!', Place);
			WritePlaceFooter(md);
			return true;
		}	
		return false;
	};

	per.showEventBedroom = function()
	{
		var md;

		if (sType == "brandifuckbed") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("bedroom-fuckb", isExplicit() ? 7 : 1);
			else this.showPersonRandom("bedroom-fuckg", 2);
			addPlaceTitle(md, "Fucking your Aunt");
			md.write(
				'<p>You fuck Aunt Brandi</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk more Aunt Brandi', Place);
			WritePlaceFooter(md);
			return true;
		}			
		if (sType == "brandibjbed") {
			md = WritePlaceHeader();
			if (!isExplicit() || !perYou.isMaleSex()) this.showPersonRandomBG("bedroom-bj", 1);
			else this.showPersonRandomX("bedroom" + this.getSuffix(true) + "-bjb" , this.isNympho() ? 4 : 2);
			addPlaceTitle(md, "aunt Brandi\'s Blowjob");
			md.write(
				'<p>Aunt Brandi gives you a blowjob</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk more Aunt Brandi', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "branditfbed") {
			md = WritePlaceHeader();
			this.showPersonRandomRorX("bedroom-tf", isExplicit() ? 2 : 1);
			addPlaceTitle(md, "Aunt Brandi\'s Tits");
			md.write(
				'<p>Aunt Brandi gives you a tit-fuck</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk more Aunt Brandi', Place);
			WritePlaceFooter(md);
			return true;
		}	
		
		return false;
	};
	
	per.showEvent = function()
	{
		if (Place == 400) return this.showEventLounge();
		if (Place == 402) return this.showEventBedroom();
		
		var md, perKylie;
		
		
		if (Place == 269) {
			// Pool
			if (sType == "brandipool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Aunt Brandi");
				md.write(
					'<p>Aunt Brandi arrives, dressed in an attractive bikini, smiling as she waits for you to join her.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=brandipoolsex');
				addLinkToPlaceC(md, 'say goodbye to Aunt Brandi', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "brandipoolsex") {
				md = WritePlaceHeader();
				this.showPerson("pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Aunt Brandi");
				md.write(
					'<p>You ask your aunt to play with you more privately, and she seductively removes most of her swimsuit as you move to embrace her.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Aunt Brandi', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 435) {
			if ((sType === "" && isShopOpen(4, 2, true) && !isPersonHere("Alison") && isPlaceKnown("MelaniesHouse") && !this.checkFlag(3) && this.hoursSince(this.other) > 20) || sType === "meetgym") {
				// Meeting at the Gym, 1 days after seeing her working out
				// Not when Alison is here
				this.setFlag(3);
				this.other = nTime;
				setQueryParams("type=meetgym");
				md = WritePlaceHeader();
				this.showPerson("gym-meetinga.jpg");
				addPlaceTitle(md, "Aunt Brandi Working Out");
				md.write(
					'<p>You look over and admire a woman working out, an older woman that most people would call a MILF. As you watch you suddenly realise she is more like an AILF as in "Aunt I\'d Like To...." as it is Aunt Brandi, you did not recognise her immediately!</p>' +
					'<p>You have to admire her determination and how toned and athletic she is looking and how much you would like to...introduce yourself to her. Then again maybe a spell?</p>'
				);
				startQuestions();
				addLinkToPlace(md, '"Hello Aunt Brandi"', Place, 'type=meetgymtalk');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "meetgymtalk" || sType == "meetgymtalkcast") {
				md = WritePlaceHeader();
				this.showPerson("gym-talk1.jpg");
				if (sType == "meetgymtalkcast") {
					this.setFlag(7);
					addPlaceTitle(md, "Aunt Brandi not charmed!");
					md.write(
						'<p>Aunt Brandi looks up at you, possibly she heard you recite the spell but she seem completely unaffected, as she still works her weights. She is either completely focused and the spell cannot get through somehow, or she is otherwise protected?</p>'
					);
				} else addPlaceTitle(md, "Aunt Brandi");
				if (!this.checkFlag(4)) {
					this.setFlag(4);
					md.write(
						'<p>She responds a little cautiously "Hello, you are Alex\'s youngest ' + perYou.getSex() + ', ' + perYou.getPersonName() + ' right? Kylie mentioned meeting you recently.". Not exactly a warm reunion but then again it has been a long time since you met her, you were quite young then. You cannot even clearly remember what she does as a job, but you know when younger she was a professional athlete but you do not know how far she got or even what sport it was. You sort of remember she liked tennis but do not think it was that sport.</p>' +
						'<p>Before you can reply she continues, "I once heard a competitor talk about their cousin explaining how there is nothing illegal there and it is not incest, not even for Aunt\'s as well. Let me tell you it is <b><i>completely out of bounds</i></b> you may not touch, date, fantasise about Kylie, nothing."</p>' +
						'<p>She looks at you, but then smiles "Still Kylie asked about you visiting, and as long as there is supervision I think it is alright. I will call Alex and discuss this and we will let you know."</p>' +
						'<p>With that she largely returns to her workout, every so often glancing at you.</p>'
					);
				}
				md.write('<p>You think you will have to ask Mom for some more help here, to reassure Aunt Brandi' + (this.checkFlag(7) ? ' and see if she has any thoughts on anything \'odd\' that may account for Aunt Brandi\'s resistance to the spell' : '') + '</p>');
				startQuestions();
				addLinkToPlace(md, 'let her finish her workout', Place,);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "workout") {
				// A 'workout' with Aunt Brandi
				md = WritePlaceHeaderNIP();
				if (perYou.isMaleSex()) this.showPersonRandomRorX("workout", isExplicit() ? 3 : 1);
				else this.showPerson("workouta.jg");
				addPlaceTitle(md, "Aunt Brandi\'s \'Work-out\'");
				md.write(
					'<p>Aunt Brandi invites you to join her and you do some weight training with her for a while. After a bit you change the training to something \'else\' but still a workout.</p>'
				)
				startQuestionsOnly();
				addLinkToPlace(md, 'after the \'workout\' you leave the gym', 37);
				WritePlaceFooter(md);
				return true;				
			}
		}
		
		if (sType == "seebrandi1") {
			md = WritePlaceHeader();
			this.setFlag(1);
			this.other = nTime;
			this.showPerson("brandi0a.jpg");
			addPlaceTitle(md, "Working Out");
			md.write(
				'<p>You see through a large set of windows an athletic woman doing stretching exercises. A damned fine looking woman with a toned, well-built body. As you look admiringly you think she is familiar...and then Kylie says,</p>' +
				'<p>"Mom\'s working out again, we both like to keep fit! Then again she was a tennis pro when she was younger!", and you recognise her, it is been a long while, she is your Aunt Brandi, your mother\'s younger sister and Kylie\'s mother. You feel Kylie\'s hand on your shoulder pulling you back literally and figuratively as she demands your attention.</p>' +
				'<p>You talk and joke around with Kylie for a bit longer, but your thoughts do keep drifting back to her mother. Again you suggest visiting her home, but Kylie shakes her head and avoids discussing it. She leaves you shortly after, clearly there is some tension there and you will have to find another way to visit.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'return to Cherise Rd.', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "seebrandi2") {
			md = WritePlaceHeader(false, 'td-left-large');
			this.other = nTime;
			this.setFlag(2);
			this.showPerson("brandi0b.jpg");
			addPlaceTitle(md, "Aunt Brandi Sun-bathing");
			md.write(
				'<p>You look and see Aunt Brandi sun-bathing on a lounge in their backyard. There are some high shrubs and trees making the yard private, but not entirely as you can see in.</p>' +
				'<p>The reason privacy came to mind, aside from what you had just been doing with Kylie, is that Aunt Brandi is completely naked, going for that full-body tan you guess. She is smiling at Kylie and said something, but you are a little too far for conversation aside from a yelled \'Hi\', or spells for that matter...if you felt so inclined, but looking at her fit body how could they not come to mind...</p>' +
				'<p>It strikes you that Aunt Brandi has some things in common with your mother, an almost complete lack of modesty...and a fine figure.</p>'
			);
			if (!isPlaceKnown("MelaniesHouse")) {
				setPlaceKnown("MelaniesHouse");
				md.write(
					"<p>Kylie mentions as you are watching,</p>" +
					'<p>"She is quite friendly with our neighbour, they often go swimming together. I am sure all the boys drool over them, two gorgeous blondes in their bikini\'s!"<p>' +
					'<p>You are quite sure she is fishing for a compliment and you tell her how cute she looked playing volleyball, and at all times. She smiles and gives you a quick kiss.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, 'say goodbye to Kylie for now', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "seebrandi3") {
			md = WritePlaceHeader();
			if (!this.checkFlag(3)) this.other = nTime;
			this.showPersonRandom("workout", 2);
			addPlaceTitle(md, "Aunt Brandi Working-out");
			md.write(
				'<p>Aunt Brandi is is doing set of exercises in her backyard and it is clear Kylie chose this place to meet you as it is somewhere she could be seen by her neighbours or her mother.</p>' +
				"<p>Kylie mentions as you are watching,</p>" +
				'<p>"I mentioned our neighbour Mel, they often workout together at the gym. Imagine them sweating away together!"<p>' +
				'<p>You do but probably in a different way than Kylie meant, then again Kylie\'s not exactly an innocent!</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'say goodbye to Kylie for now', Place);
			WritePlaceFooter(md);
			return true;
		}
				
		if (sType == "askbrandidecider") {
			md = WritePlaceHeader();
			this.showPerson("watch1.jpg");
			addPlaceTitle(md, "Talking to Mom about Aunt Brandi, Again");
			this.showPerson("watch2.jpg", "25%", "right");
			setPersonFlag("Mom", 45);
			this.setFlag(15);
			md.write(
				'<p>You talk more with Mom about Aunt Brandi trying to work out what it is about her that is unusual.</p>' +
				'<p>You have seen how determined and stubborn she is and both Mom and Kylie have echoed this. Possibly her <b>willpower</b> is protecting her?</p>' +
				'<p>Then again you saw her watching you and Kylie and she was definitely aroused. The charm spell increases the targets lust and manipulates them to be susceptible due to that lust. You would guess she maybe cold, and passionless but this seems very unlikely. When you ask Mom a little more she mentions how Aunt Brandi was <i>very</i> popular when she was younger and dated a <i>lot</i>. Maybe it is the exact opposite, she has so much passion the spell is only altering her within her normal range as such. You know others you charmed were certainly <i>very</i> passionate, so for this to be true Aunt Brandi would have to be a near <b>nymphomaniac</b>!</p>' +
				'<p>You are unsure how to decide but it does occur to you to sometime <b>watch her tennis lessons</b>.</p>' + 
				'<p>As you ponder this Mom shows you a picture in her phone, an image of Aunt Brandi from when they went out drinking on the weekend. Maybe you can arrange something for the next time they go out to meet them after or before, say of you can get <b>hold of a limo</b>?</p>' +
				'<p>You talk a little more to Mom but nothing else comes to mind for now.</p>'
			);

			startQuestionsOnly();
			addLinkToPlace(md, 'consider what to do now', Place);
			WritePlaceFooter(md);
			return true;						
		}
		
		// Limo
		if ((isAtLocation(45) && this.checkFlag(20) && !this.checkFlag(17) && isEvening() && !isWeekDay()) || sType == "watchlimo") {
			// Limo watch event
			md = WritePlaceHeaderNIP();
			setQueryParams("type=watchlimo");
			setPersonFlag("Mom", 43);		// Disable the Mom/Brandi normal version
			movePerson("Mom", 899);
			this.setFlag(17);
			this.place = 899;
			this.showPerson("watch-limo.jpg");
			addPlaceTitle(md, "Limo is here!");
			md.write(
				'<p>There is a knock at the door and the limo you arranged is here. You do not recognise the driver for some reason another driver is here!</p>' +
				'<p>Mom finishes getting ready and you both get in the limo and a short drive later you are at Aunt Brandi\'s. You tell Mom you will go and get her and step out of the limo You see Aunt Brandi at the front door, she must of seen it arrive. She looks at you puzzled and asks,</p>' +
				'<p>"Why are you here, I was just spending the evening with Alex", hardly an invitation to joining them but you did not expect one. You explain that you arranged the limo and thought she would not mind if you share it for the trip out, and you would leave them once you reach the club. Aunt Brandi looks a bit annoyed but quickly hides it and boards the limo, and you follow.</p>' +
				'<p>It is not a very long drive but Mom asks the driver to take "the scenic route" as she wants to enjoy the experience of the limo. Good, that gives you some more time to observe them.</p>' +
				'<p>During the trip Aunt Brandi and Mom chat about past events you are not familiar with, but that is fine you are more trying to catch Aunt Brandi unguarded.</p>' +
				(!this.checkFlag(17) ? '<p>You suppose it could be too hard to work out anything here and find <b>nothing</b>, and try to observe her when she teaches tennis.</>' : '') +
				'<p>You suppose she could  be <b>dominant</b> sister in their relationship.</p>' +
				'<p>You could decide she is just turned-on a bit and wanting to look her best and <b>exposing</b> as much as she can for their outing.</p>'
			)

			startQuestionsOnly();
			startAlternatives(md);
			if (!this.checkFlag(16)) addLinkToPlace(md, 'nothing in particular', 194, '', 'Eventually you are dropped off, but you notice nothing about Aunt Brandi, maybe you need to try somewhere else?');
			addLinkToPlace(md, 'she dominates the conversation', 194, 'type=watchlimowill');
			addLinkToPlace(md, 'she keeps adjusting her dress, exposing herself', 194, 'type=watchlimonympho');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "watchlimowill") {
			// Limo watch event - Strong Will
			md = WritePlaceHeaderNIP();
			this.setFlag(19);
			this.showPerson("watch-limo-will.jpg");
			addPlaceTitle(md, "Aunt Brandi Dominates");
			md.write(
				'<p>During the ride you notice how Aunt Brandi controls the conversation sometimes telling Mom what they will talk about or that they will not discuss that. While not "mean" and it just seems to be the way they talk together and Mom is used to it.</p>' +
				'<p>This <b>decides</b> the matter for you, Aunt Brandi is <b>stubborn, controlling and strong willed</b>. She must be able to control herself enough that the spell has little effect and fades away quickly. You are going to have to work out a way to alter this in some way.</p>' +
				(perYou.checkFlag(12) ? '<p>Maybe you could use hypnosis in some way, but there is no way she would permit you to use it on her?' + (perYou.checkFlag(25) ? ' Maybe the augmented version? It is worth a try!</p>' : '</p>') : '')
			)

			startQuestionsOnly();
			addLinkToPlace(md, 'you are dropped off', 194);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "watchlimonympho") {
			// Limo watch event - Strong Will
			md = WritePlaceHeaderNIP();
			this.setFlag(18);
			this.showPerson("watch-limo-nympho.jpg");
			addPlaceTitle(md, "Aunt Brandi\'s Panties");
			md.write(
				'<p>During the ride you notice how Aunt Brandi keeps adjusting her dress, it seems to you she is trying to make it accentuate her figure but cannot quite get it right. Mom comments,</p>' +
				'<p>"Don\'t worry they will love you as always, you are fit and fantastic!", you have to agree but think it best to not say it out loud.</p>' +
				'<p>Still she fusses and at least once you see her panties and another time most of one breast. You see her look at you and flash a smile, and realise she is teasing you!</p>' +
				'<p>This <b>decides</b> the matter for you, Aunt Brandi must be a bit of a <b>slut or even a nymphomaniac</p>. So the charm spell is the proverbial \'drop in the bucket\' when it enhances her arousal, and she dismisses it and the other effects do little to her. You are going to have to do something to really, really get her turned on, so the spell puts her over the limit.</p>' +
				'<p>You saw how she was aroused see you with Kylie, so you think what you have to do it \'play\' with Kylie with Aunt Brandi watching until she is put over her limit!</p>'
			)

			startQuestionsOnly();
			addLinkToPlace(md, 'you are dropped off', 194);
			WritePlaceFooter(md);
			return true;
		}			
		
		// Tennis Court
		if (Place == 125) {
			if (sType == "lesson") {
				// A 'lesson'
				md = WritePlaceHeaderNIP();
				if (perYou.isMaleSex()) this.showPersonRandomRorX("lesson-sex", 2);
				else this.showPersonRandom("lesson-sex", 2);
				addPlaceTitle(md, "Aunt Brandi\'s \'lesson\'");
				md.write(
					'<p>Aunt Brandi makes a quick phone call canceling her lesson. She then proceeds to teach you, but not really about tennis...</p>'
				)
				startQuestionsOnly();
				addLinkToPlace(md, 'after the \'lesson\' you leave the courts', 124);
				WritePlaceFooter(md);
				return true;				
			}			
			
			// Watching
			if ((!this.isCharmedBy() && this.checkFlag(15) && !this.checkFlag(16) && isMorning() && isWeekDay()) || sType == "watchtennis") {
				// Tennis watch event
				md = WritePlaceHeaderNIP();
				setQueryParams("type=watchtennis");
				this.setFlag(16);
				this.setFlag(29);
				this.showPerson("watch-tennis.jpg");
				addPlaceTitle(md, "Aunt Brandi Giving Lessons");
				md.write(
					'<p>You see Aunt Brandi is giving a lesson to a man you do not recognise. She is wearing that very short skirt and outfit you saw in the SMS from Kylie.</p>' +
					'<p>She is very hands-on in her lesson, brushing against her student and at times asking him to hold her arm or hips to demonstrate a particular swing. The man is very attentive but you are unsure if this is because she is a good teacher or because she is a hot woman.</p>' +
					(!this.checkFlag(17) ? '<p>You suppose it could be too hard to work out anything here and find <b>nothing</b>, and try to observe her when she goes out with Mom</>' : '') +
					'<p>You suppose she could be very skilled and it is just her physical nature not sexuality, and she is very carefully <b>controlling</b> him.</p>' +
					'<p>You could decide she is just very appreciative of his attention and is somewhat turned-on and <b>flirting</b> while teaching the lesson.</p>'
				)

				startQuestionsOnly();
				startAlternatives(md);
				if (!this.checkFlag(17)) addLinkToPlace(md, 'nothing in particular', 124, '', 'Eventually you grow tired of the lesson, but you notice nothing about Aunt Brandi, maybe you need to try somewhere else?');
				addLinkToPlace(md, 'she controls the lesson', 125, 'type=watchtenniswill');
				addLinkToPlace(md, 'she flirts with her student', 125, 'type=watchtennisnympho');
				endAlternatives(md);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "watchtenniswill") {
				// Tennis watch event - Strong Will
				md = WritePlaceHeaderNIP();
				this.setFlag(19);
				this.showPerson("watch-tennis-will.jpg");
				addPlaceTitle(md, "Aunt Brandi Dominates");
				md.write(
					'<p>During the lesson you see the male student place a hand on Aunt Brandi suggestively, but she firmly removes it and continues the lesson. Her skimpy attire and hands-on approach seems to be just that, an approach, a way to appeal to customers, <b>not</b> to flirt with them!</p>' +
					'<p>This <b>decides</b> the matter for you, Aunt Brandi is <b>stubborn, controlling and strong willed</b>. She must be able to control herself enough that the spell has little effect and fades away quickly. You are going to have to work out a way to alter this in some way.</p>' +
					(perYou.checkFlag(12) ? '<p>Maybe you could use hypnosis in some way, but there is no way she would permit you to use it on her?' + (perYou.checkFlag(25) ? ' Maybe the augmented version? It is worth a try!</p>' : '</p>') : '')
				)

				startQuestionsOnly();
				addLinkToPlace(md, 'you leave the lesson', 124);
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == "watchtennisnympho") {
				// Tennis watch event - Strong Will
				md = WritePlaceHeaderNIP();
				this.setFlag(18);
				this.showPerson("watch-tennis-nympho.jpg");
				addPlaceTitle(md, "Aunt Brandi Flirting");
				md.write(
					'<p>During lesson you see she is clearly flirting with her student, making seductive references and brushing seductively against him. One time when she bends over to pick up a ball you clearly see she is <b>not</b> wearing any panties! You are not sure her student is aware of this but then you see him looking as well. You decide you have to do something and call out to her "Hi there Aunt Brandi". She looks back at you surprised and asks why you are here. You explain Bambi is a friend of yours and suggested playing a game. She looks at you suspiciously but says nothing and returns to the lesson. She tones down her flirting a lot from them onwards.</p>' +
					'<p>This <b>decides</b> the matter for you, Aunt Brandi must be a bit of a <b>slut or even a nymphomaniac</b>. So the charm spell is the proverbial \'drop in the bucket\' when it enhances her arousal, and she dismisses it and the other effects do little to her. You are going to have to do something to really, really get her turned on, so the spell puts her over the edge.</p>' +
					'<p>You saw how she was aroused when she saw you with Kylie, so you think what you have to do is \'play\' with Kylie with Aunt Brandi watching until she is put over her limit!</p>'
				)

				startQuestionsOnly();
				addLinkToPlace(md, 'after the lesson you leave the courts', 124);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (sType == "teachhypno1") {
			// Teach Hypnosis to Kylie 1
			WaitHereOnly(24);
			perKylie = findPerson("Kylie");
			md = WritePlaceHeaderNIP();
			this.setFlag(22);
			perKylie.showPerson("study1.jpg");
			addPlaceTitle(md, "Teaching Kylie");
			md.write(
				'<p>As you get ready to study hypnosis with Kylie she takes out some glasses and puts them on, you did not know she needed glasses, you have never seen her wearing them before! She also dresses in some of her school clothes to help her concentrate she says.</p>' +
				'<p>You take out the book on hypnosis and start to teach Kylie some of the basics with some small aspects from the augmented version to enhance the effectiveness.</p>' +
				'<p>From what you have heard Kylie is a good student with high grades, but tonight she finds it difficult to concentrate, after a while she starts to slowly strip as you teach her. She really plays well at "slutty student and attractive teacher" sort of game...then again maybe it is not so much a game!</p>' +
				'<p>Despite the distraction of Kylie\'s game you get through a good amount and realise you will have to finish for the night before Aunt Brandi will ask you to leave. You discuss with Kylie some initial hypnosis sessions to try with her mother, initially to get her comfortable and start to make her less wary of yourself.<p>' +
				'<p>Kylie seems to take it all in but then talks about how she has been a "bad student" and meeds to be corrected. Before she can say anything more Aunt Brandi steps in and tells you it is time to leave!</p>' +
				'<p>Reluctantly you say your goodbyes and leave the home.</p>'
			)

			startQuestionsOnly();
			addLinkToPlace(md, 'leave the home', 37);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "teachhypno2") {
			// Teach Hypnosis to Kylie 2
			WaitHereOnly(24);
			perKylie = findPerson("Kylie");
			md = WritePlaceHeaderNIP();
			this.setFlag(23);
			perKylie.showPerson("study2.jpg");
			addPlaceTitle(md, "Teaching Kylie More");
			md.write(
				'<p>As you get ready to study more hypnosis with Kylie she again gets ready, putting on her glasses and her school clothes.</p>' +
				'<p>You take out the book on hypnosis and start to teach Kylie more of the techniques emphasising how to subtly influence the subject.</p>' +
				'<p>Again she is quite distracted, and she starts to strip earlier in the session, but the end she is wearing little besides some red panties, offering you her bra but you realise you will have to finish for the night before Aunt Brandi will ask you to leave. You discuss with Kylie some hypnosis sessions to try with her mother, building trust.<p>' +
				'<p>Kylie seems to take it all in but then talks about how her desktop computer has a problem and <i>she</i> needs to be serviced. Before she can say anything more Aunt Brandi steps in and tells you it is time to leave!</p>' +
				'<p>Reluctantly you say your goodbyes and leave the home.</p>'
			)

			startQuestionsOnly();
			addLinkToPlace(md, 'leave the home', 37);
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "teachhypno3") {
			// Teach Hypnosis to Kylie 3
			WaitHereOnly(24);
			perKylie = findPerson("Kylie");
			md = WritePlaceHeaderNIP();
			this.setFlag(24);
			perKylie.showPerson("study3.jpg");
			addPlaceTitle(md, "Teaching Kylie Complete");
			md.write(
				'<p>As you get ready to study more hypnosis with Kylie she again gets ready, putting on her glasses and her school clothes but you know they will not stay on for long!</p>' +
				'<p>You take out the book on hypnosis and start to teach Kylie the remaining techniques emphasising how to subtly influence the subject.</p>' +
				'<p>Again she is quite distracted, and she starts to strip earlier in the session, and in the end she is wearing nothing at all, offering you herself to "teach" more. You realise you will have to finish for the night before Aunt Brandi will ask you to leave. You try to discuss hypnosis with her but she is not interested, only in being "taught" other things.<p>' +
				'<p>Reluctantly you know Aunt Brandi will be here soon so you tell her to dress and as she starts Aunt Brandi steps in and tells you it is time to leave!</p>' +
				'<p>Reluctantly you say your goodbyes and leave the home.</p>'
			)

			startQuestionsOnly();
			addLinkToPlace(md, 'leave the home', 37);
			WritePlaceFooter(md);
			return true;
		}			
		
		return false;
	};		
	
	per.showEventSleep = function(wt, plc, s, param)
	{
		if (param) return false;		// An event is pending, do nothing tonight
		
		// Dream 1 - automatic after meeting in the Gym
		if (this.checkFlag(3) && !this.checkFlag(5)) {
			WaitforForDayNight(s, plc, 'type=brandidream1');
			return true;
		}
		
		// Dreams disabled by pink noise app
		if (perYou.checkFlag(40)) return false;
		
		// Dream 2 random
		if (this.checkFlag(5) && !this.checkFlag(6) && Math.random() < 0.5 ) {
			WaitforForDayNight(s, plc, 'type=brandidream2');
			return true;
		}
		
		// Dream 2 random
		if (this.checkFlag(9) && !this.checkFlag(14) && Math.random() < 0.5 ) {
			WaitforForDayNight(s, plc, 'type=brandidream3');
			return true;
		}
		
		return false;
	};

	per.isPlaceImageRight = function()
	{
		return Place == 435 && this.isHere() && sType === "";
	};

	per.showPlaceImageRight = function(md)
	{
		if (this.hoursSince(this.other) > 40) this.other = nTime;
		if (this.isCharmedBy() && findPerson("Glenvale").checkFlag(37)) this.showPersonRandom("gym-meeting-nude", 4);
		else this.showPersonRandom("gym-meeting", 4);
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 435 && this.isHere() && sType === "") {
			md.write('<p>Aunt Brandi is doing an intense workout nearby.</p>');
		}
		if (Place == 125 && this.isHere() && sType === "") {
			if (this.isCharmedBy() && findPerson("Glenvale").checkFlag(37)) md.write('<p>Aunt Brandi is here getting ready for a lesson. You see she has completely embraced the law changes on nudism!</p>');
			else md.write('<p>Aunt Brandi is here getting ready for a lesson.</p>');
		}
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 400 && this.isHere() && sType === "") {
			// Living room
			if (this.isCharmedBy()) {
				// Charmed
				if (this.isNympho()) {
					addLinkToPlaceC(md, "ask Aunt Brandi for a blowjob", Place, 'type=brandibjlounge');
					addLinkToPlaceC(md, "fuck your Aunt-slut", Place, 'type=brandifucklounge');
					if (perYou.isMaleSex()) addLinkToPlaceC(md, "fuck your Aunt\'s tits", Place, 'type=branditflounge');
					addLinkToPlaceC(md, "ask Aunt Brandi and Kylie to play-around", Place, 'type=brandikylielounge');					
				} else {
					addLinkToPlaceC(md, "order your Slave-Aunt to give you a blowjob", Place, 'type=brandibjlounge');
					addLinkToPlaceC(md, "fuck your Aunt-slave", Place, 'type=brandifucklounge');
					if (perYou.isMaleSex()) addLinkToPlaceC(md, "fuck your slaves tits", Place, 'type=brandirflounge');
					addLinkToPlaceC(md, "tell Aunt Brandi to have sex with Kylie", Place, 'type=brandikylielounge');
				}
				addLinkToPlaceC(md, "mother-daughter threesome time", Place, 'type=threesomelounge');
				
			} else {
				// Uncharmed
				if (sType === "") {
					this.addLinkToPlaceF(md, 10, 'ask Aunt Brandi about her work', Place, 'type=questionjob');
					if (this.checkFlag(10)) this.addLinkToPlaceF(md, 12, 'talk about the occult', Place, 'type=questionoccult');
					if (this.checkFlag(19)) {
						if (perYou.checkFlag(25)) {
							this.addLinkToPlaceF(md, 21, 'put Aunt Brandi into a hypnotic trance using Mr Beasley\'s technique', Place, 'type=augmentedhypno1');
							if (this.checkFlag(22) && this.checkFlag(23) && this.checkFlag(24)) addLinkToPlace(md, 'put Aunt Brandi into a hypnotic trance using Mr Beasley\'s technique', Place, 'type=augmentedhypno2');
						}
					}
				}
			}
			return;
		}
		if (Place == 402 && this.isHere() && sType === "") {
			// Charmed only
			if (this.isNympho()) {
				addLinkToPlaceC(md, "ask Aunt Brandi for a blowjob", Place, 'type=brandibjbed');
				addLinkToPlaceC(md, "fuck your Aunt-slut", Place, 'type=brandifuckbed');	
				if (perYou.isMaleSex()) addLinkToPlaceC(md, "fuck your Aunt\'s tits", Place, 'type=branditfbed');
			} else {
				addLinkToPlaceC(md, "order your Slave-Aunt to give you a blowjob", Place, 'type=brandibjbed');
				addLinkToPlaceC(md, "fuck your Aunt-slave", Place, 'type=brandifuckbed');
				if (perYou.isMaleSex()) addLinkToPlaceC(md, "fuck your slaves tits", Place, 'type=brandirfbed');
			}
		
			this.addSleepLink(md, "sleep with your aunt", "Sleeping with Aunt Brandi",
				'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Aunt Brandi to bed for the night.</b>',
				'bed1.jpg', true
			);
		}
		if (Place == 401 && isPersonHere("Kylie") && this.checkFlag(21) && !(this.checkFlag(22) && this.checkFlag(23) && this.checkFlag(24)) && sType === "") {
			if (perYourBody.FindItem(60) == 0) addLinkToPlaceC(md, "teach Kylie the basics of hypnosis", Place, '', 'You realise you will need the textbook on Hypnosis to teach her properly. You will have to go an get it');
			else if (getHour() >= 21) addLinkToPlaceC(md, "teach Kylie the basics of hypnosis", Place, '', 'You realise you do not have enough time to teach her before Aunt Brandi will ask you to leave');
			else if (!this.checkFlag(22)) addLinkToPlaceC(md, "teach Kylie the basics of hypnosis", Place, 'type=teachhypno1');
			else if (!this.checkFlag(23)) addLinkToPlaceC(md, "teach Kylie more about hypnosis", Place, 'type=teachhypno2');
			else if (!this.checkFlag(24)) addLinkToPlaceC(md, "teach Kylie the remaining bits of hypnosis", Place, 'type=teachhypno3');
		}
		if (Place == 401 && isPersonHere("Kylie") && this.checkFlag(18) && !(this.checkFlag(22) && this.checkFlag(23) && this.checkFlag(24)) && sType === "") {
			if (!this.checkFlag(22)) addLinkToPlaceC(md, "tease Aunt Brandi with Kylie", 400, 'type=tease1');
			else if (!this.checkFlag(23)) addLinkToPlaceC(md, "tease Aunt Brandi with Kylie", 400, 'type=tease2');
			else if (!this.checkFlag(24)) addLinkToPlaceC(md, "tease Aunt Brandi with Kylie", 400, 'type=tease3');
		}	
		if (Place == 125 && this.isHere() && sType === "") {
			if (!this.isCharmedBy()) this.addLinkToPlaceF(md, 29, "ask Aunt Brandi for a lesson", 125, '', 'Aunt Brandi apologies and says she is waiting for a client and cannot spare the time');
			else this.addLinkToPlaceF(md, 29, "ask Aunt Brandi for a lesson", 125, 'type=lesson');
		}
		if (Place == 435 && this.isHere() && sType === "") {
			if (!this.isCharmedBy()) addLinkToPlace(md, "ask Aunt Brandi to work-out with her", 435, '', 'Aunt Brandi apologies and says she prefers a solo workout');
			else addLinkToPlace(md, "ask Aunt Brandi to work-out with her", 435, 'type=workout');
		}

	};
	
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			if (Place == 435 && this.isHere() && (sType.indexOf("meetgym") != -1 || sType === "")) {
				// Gym meeting
				if (this.isCharmedBy()) addComments(this.addPersonFace() + 'Your Aunt is already under your charm spell');
				else if (!isSpellKnown("Shielded Charm")) addComments(this.addPersonFace() + 'You should try to get her somewhere more private.');
				else if (sType == "meetgym") {
					// You try to cast charm and no effect
					gotoPlace(Place, 'type=meetgymtalkcast');
					return "nofooter";
				} else if (sType == "meetgymtalk") addComments(this.addPersonFace() + '"Out of Bounds!" You cast the spell with the intention of either saying "Nothing is out of bounds" or "Suck on this!" but to your annoyance nothing happens! She is either completely focused and the spell cannot get through somehow, or she is otherwise protected?');
				else {
					addComments(this.addPersonFace() + 'Aunt Brandi looks up at you briefly, possibly she heard you recite the spell but she just returns to her workout, looking completely absorbed in her training. She is either completely focused and the spell cannot get through somehow, or she is otherwise protected?' + (checkPersonFlag("Mom", 17) ? '' : '</p><p>Possibly Mom can offer some ideas of what is happening?'));
					this.setFlag(7);
				}
				return 'handled';
			}
			if (Place == 400 && this.isHere()) {
				if (this.checkFlag(22) && this.checkFlag(23) && this.checkFlag(24)) {
					if (this.isNympho()) CastCharmSpell("Brandi", Place, 1, 'type=charmbrandi' + (this.checkFlag(18) ? 'nympho' : 'slave') + '1');
					else if (sType !== "augmentedhypno2") addComments(this.addPersonFace() + 'Aunt Brandi looks up at you briefly, possibly she heard you recite the spell but she just looks away unaffected');
					else CastCharmSpell("Brandi", Place, 1, 'type=charmbrandi' + (this.checkFlag(18) ? 'nympho' : 'slave') + '1');
					return "handled";
				}
				this.setFlag(7);
				addComments(this.addPersonFace() + 'Aunt Brandi looks up at you briefly, possibly she heard you recite the spell but she just looks away unaffected');
				return 'handled';
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls
	
	per.isPhoneable = function() {
		// Can you call them?
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.isCharmedBy();
	};

	per.callThem = function() {
		if (Place == 269 && checkPlaceFlag("Hotel", 11)) {
			gotoPlace(Place, 'type=brandipool');
			receiveCall('', 'You call Aunt Brandi and ' + (this.isNympho() ? 'invite' : 'order') + ' her to join you at the pool for a swim, and she immediately answers, "I\'ll be there soon!"');
			WriteCommentsFooter(bChat, bChatLeft);
			
		}
	};
	
	per.addPersonPhoneCall = function() {
		if (this.checkFlag(10) && !this.checkFlag(11)) {
			if (makeCall(true, 370, '', true)) this.setFlag(11);
		}	
		// Folloing 3 are actually from Kylie
		if (this.checkFlag(22) && !this.checkFlag(26) && isMorning()) {
			if (makeCall(true, 294, '', true)) this.setFlag(26);
		}
		if (this.checkFlag(23) && !this.checkFlag(27) && isMorning()) {
			if (makeCall(true, 295, '', true)) this.setFlag(27);
		}
		if (this.checkFlag(24) && !this.checkFlag(28) && isMorning()) {
			if (makeCall(true, 296, '', true)) this.setFlag(28);
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		// Logically from Kylie
		if (id == 292) return receiveSMS('Kylie', 'Snapped this earlier, thought you might like it. Mom though I was texting someone as I walked in on her \"accidentally\"', 'sms1.jpg');
		if (id == 294) return receiveSMS('Kylie', 'We just had a session, took a bit to talk her into it, but she eventually agreed. I convinced her to take a photo after ', 'smstease1.jpg');
		if (id == 295) return receiveSMS('Kylie', 'Another session, she is loosening up a bit. She agreed to send this to you!', 'smstease2.jpg');
		if (id == 296) return receiveSMS('Kylie', 'Another session, I talked her into a kiss, a familial peck but the session helped make it a bit more', 'smstease3.jpg');
		if (id == 370) return receiveSMS('Kylie', 'Mom at a recent training session! Look at that outfit!', 'sms2.jpg');
		return '';
	};
};
