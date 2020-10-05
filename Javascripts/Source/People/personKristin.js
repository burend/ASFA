/****************************************************************
Kristin, the Bank Manager
****************************************************************/
function RepliesKristin(nR)
{
	var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 100) {
		this.setFlag(5);
		addComments(
			'“Ellie Bartel? She is a bright girl, usually very social, though of late she has been rather withdrawn, always walking straight home and rarely showing interest in anyone.”</p>' +
			'<p>“If you want to talk to her you might have to catch her when she is not at work, ' + myName + ', just don\'t forget about me.” She teasingly licks her upper lip.'
		);
	}
	else if (nR == 2701) //talking or Giving her the $$$ Letter of Credit
	{
		AddCash(100);
		perYourBody.DropItem(27, 0);
		if (!bCharm) {
			//NORMAL
			addComments('"Oh, I see you have an approval notice from ' + perGates.getPersonNameShort() + ' for a disbursement of ' + sCurrency + '100," says the manager as she types a few things into the computer. "Everything seems to be in order.  Here you are, ' + myName + '."');
		}	else {
			//CHARMED
			addComments('"Yes, ' + myName + '.  All I need are the... here they are," she says as she looks at the letter. "Everything is in order now, ' + myName + '.  Here is the ' + sCurrency + '100.  Will there be... anything else?" she asks expectantly, ready to serve.</p>');
		}
	}
	else if (nR == 2800)
	{
		addComments(
			'“Anything you want, ' + myName + ', but I will only be able to close for a limited amount of time, I\'m only the manager, not the owner after all.”</p>' +
			'<p>Kristin performs a quick phone-call, then turns to you.</p>' +
			'<p>“I have explained that there is an electrical problem, this won\'t work more than once but will give you some time. Just visit me at my home in 10 Dervish Rd once you are ready to reopen. Ellie, the teller you were interested in, lives right next to me with her mothers Carol and Sally, by the way.”</p>' +
			'<p>She gets ready to close the Bank and finally asks you to leave as well.'
		);
		per.setFlag(9);
		setPlaceKnown("DervishRd");
		setPlaceFlag("DervishRd", 2);	// Know Kristins address
		setPlaceFlag("DervishRd", 3); // Know Ellies address
		per.place = 430;
		movePerson("Ellie", 1000);		// limbo until mother approached
		Place = 194;
	}
	else if (nR == 2801)
	{
		per.setFlag(10);
		per.setFlag(9, false);
		
		if (isDay()) {
			addComments('<p>"Yes ' + myName + '. I will do so immediately."</p><p>You walk out with her as she leaves to reopen the Bank</p>');
			per.place = 224;
			movePerson("Ellie", 225);
			Place = 5;
		} else addComments('<p>"Yes ' + myName + '. I will do so first thing in the morning."</p><p>She makes a few calls and sends some messages and emails, and the returns to you.</p>');

	}
	else if (nR == 2802)
	{
		addComments('<p>"Yes we can approve a credit card for you ' + myName + '. but given your income I can only approve a small limit of ' + sCurrency + '50 but this can be increased in a month."</p><p>You fill out the paperwork and are given the card, and make an immediate cash withdrawal of the balance from the card. You do wonder a little about the beautiful manager but you have no further reason to see her for another month.</p>');
		AddCash(50);
		per.setFlag(13);
		setPersonFlag("Mom", 6, false);
		Place = 194;
	}
	else if (nR == 2900)
	{
		addComments('<p>"Of course ' + myName + ' just give me a moment" and she types a transaction into her computer and tells you "It is done, the limit is removed from your account."</p>');
		perYou.setFlag(9);
	}
	else if (nR == 9901) {
		// Nella
		setPersonFlag("Nella", 2);	// Know her name
		setPersonFlag("Nella", 3);	// Asked about 
		if (bCharm) {
			addComments(
				'“The bank\'s owners decided we needed to increase security, so they hired Nella to help out.”</p>' +
				'<p>You ask Kristin for some more information on Nella, and she smiles,</p>' +
				'“You want her ' + myName + '? Of course you do, but I do not have much to tell. You may wish to ask Ellie, I saw them chatting a few times, they seemed quite friendly. I once heard her mention her friend Vicky. But if you want I can always ask her into my office and I can leave her to you.”'
			);			
		} else {
			addComments(
				'“The bank\'s owners decided we needed to increase security, so they hired Nella to help out.”</p>' +
				'<p>You ask Kristin for some more information on Nella, but she refuses to discuss more,</p>'
			);
		}
	}
	return true;
}

function LaterCall()
{
	setPersonFlag("Kristin", 15);
}


// Initialise

function initialiseKristin()
{
	// Kristin
	addPerson("Kristin", 224, "Kristin", '', false);
	per.Replies = RepliesKristin;
	per.getPersonName = function(full) { return full !== true && this.isCharmedBy() ?  "Slave Kristin" : "Kristin"; };
	per.getPersonAddress = function() { return checkPlaceFlag("DervishRd", 2) ? '10 Dervish Rd, Glenvale' : ''; };

	per.isPersonInfo = function() { return this.isCharmedBy();	};
	per.getPersonInfo = function() {
		if (Place == 430) {
			return this.addPersonString("!kristin10c.jpg", "height:max%", "right") +
				'Kristin serves you a cold orange juice while you two talk. She knows you are not allowed to drink yet, but she still wants you to feel at home when you visit her. Her house is a modern, elegant house with 4 rooms. It is more of a small palace than an actual house. You asked why she needed that big of a house and she answered honestly. She wanted to show off to the people how rich she is. She knew this kind of luxury was not necessary for her, but she went with it anyway.<br><br>' +
				'Kristin is standing right in front of you in her pink lingerie and nylon stockings. Her bossy demeanor is still present, but it’s more of a show to you rather than her real persona. She’s still dominant to other people; she told you it is easier for her to make your plans a reality.<br><br>' +
				'Kristin also mentioned briefly that she has a somewhat intimate relationship with Ellie’s mother, Carol. You should discuss this matter further if you have the time.';
		} else {
			return this.addPersonString("kristin4.jpg", "height:max%", "right") +
				'Kristin, the manager of the bank sits before you as you enter her office without knocking. You don’t have to anymore, because she raised you the idea that why would you need to go through the security protocols when you practically own this place. She even talked to Ellie and told her to grant you free access to the manager’s office anytime.<br><br>' +
				'Kristin changed a bit, however she still plays the innocent, confused woman who doesn’t understand what’s been happening to her lately. Deep inside, you know it’s all just an act so you can visit her more often to \"elucidate her behaviour\" and \"educate her personally\". You are sure that she is your slave just like the others, but she does this act to have you around her.';
		}
	};
	
	per.getDress = function() {
		if (this.place == 224) {
			if ((Math.floor(nTime / 288) % 2) == 1) return "Black";
			return "Grey";
		}
		return this.dress;
	};
	
	per.whereNow = function() {
		if (Place == 430 && sType.indexOf('ellie') != -1) return 0;
		if (this.place != 420 && (!isDay() || !isWeekDay())) return 430;
		return this.place;
	};
	
	per.passTimeDay = function() {
		if (this.isCharmedBy()) {
			this.setFlag(16, false);
			this.setFlag(17, false);
			if (this.checkFlag(10)) {
				var nd = Math.floor(nTime / 288) % 7;
				if (nd < 6) {
					if (this.isHere()) {
						this.place = 224;
						return this.addPersonFace() + "In the morning Kristin gives you a kiss and tells you she has to leave for her job at the Bank.</p>";
					}
					this.place = 224;
				}
			}
			if (this.place == 420 && this.checkFlag(2) && !this.checkFlag(4) && !this.checkFlag(6) && Place != 430) this.setFlag(7);
		}
		return '';
	};
	per.passTimeNight = function() {
		if (this.isCharmedBy() && this.checkFlag(10)) {
			var nd = Math.floor(nTime / 288) % 7;
			if (nd < 6) this.place = 430;
		}
		return '';
	};

	per.showEventHome = function() {
		// Event: Kristin's Home
		var myNameK = this.getYourNameFor();
		var herNameK = this.getPersonName();

		if (sType === "neighbours") {
			// Ask about neighbours
			md = WritePlaceHeader();
			this.setFlag(2);
			this.showPerson("!kristin10b.jpg");
			addPlaceTitle(md, herNameK + '\'s Home');
			md.write(
				'<p>Kristin seems a little uncomfortable as she answers,</p>' +
				'<p>"' + myNameK + ' they are good friends of mine, I have known them since Ellie was quite young, I sometimes baby-sat for her as a child.<br/><br/>Carol\'s wife Sally is a very successful business woman with a large international company. She travels on business a lot and has a habit of taking Carol for granted.<br/><br/>Carol is a <b>very</b> good friend of mine'
			);
			if (perYou.isBornMale()) md.write(', sorry ' + myNameK + ' she has no interest in men at all');
			else md.write('I\'m sure she will like you ' + myNameK);
			md.write(
				'.<br/><br/>She is the birth mother of Ellie, I understand she used a sperm bank or some such to conceive, against Sally\'s preferences."</p>' +
				'<p>You notice her emphasis about being <b>very</b> good friends with Carol, and you ask her to tell you more. She hesitates,</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Order her to tell you', Place, 'type=carolorder');
			addLinkToPlaceC(md, 'Ask her again', Place, 'type=carolask');
			addLinkToPlace(md, 'talk to Kristin about something else', Place);
			WritePlaceFooter(md);
			return true;
		}

		if (sType === "carolorder" || sType === "carolask") {
			// Ask about neighbours
			md = WritePlaceHeader();
			if (sType == "carolorder") this.setFlag(4);
			this.setFlag(3);
			this.showPerson("!kristin10b.jpg");
			addPlaceTitle(md, herNameK + '\'s Home');
			if (sType == "carolorder") md.write('<p>You order your slave to tell you, and Kristin realises your authority over her,</p>');
			else md.write('<p>You ask her again to please tell you,</p>');
			md.write('<p>"' + myNameK + ', Carol is a trophy wife and unhappy with her marriage. We have been lovers for over a year, she knows I take other lovers, men and women. Ellie knows of our relationship, she is not happy but accepts it and has kept our secret.</p>');
			startQuestions();
			addLinkToPlace(md, 'talk more to Kristin', Place);
			WritePlaceFooter(md);
			return true;			
		} 
		
		if (sType === "neighboursagain") {
			// Ask about neighbours
			md = WritePlaceHeader();
			this.setFlag(4);
			this.showPerson("!kristin10b.jpg");
			addPlaceTitle(md, herNameK + '\'s Home');
			md.write(
				'<p>Again you talk about her neighbours, the Bartels and this time she is more open,</p>' +
				'<p>"' + myNameK + ' they are good friends of mine, I have known them since Ellie was quite young, I sometimes baby-sat for her as a child.<br/><br/>Carol\'s wife Sally is a very successful business woman with a large international company. She travels on business a lot and has a habit of taking Carol for granted.<br/><br/>Carol is a <b>very</b> good friend of mine.</p>' +
				'<p>"' + myNameK + ', Carol is a trophy wife and unhappy with her marriage. We have been lovers for over a year, she knows I take other lovers, men and women. Ellie knows of our relationship, she is not happy but accepts it and has kept our secret.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'talk more to Kristin', Place);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType === "kristinhomebj") {
			// Blowjob/lick
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) {
				if (isExplicit()) this.showPersonRandomX("!kristin12b", 3);
				else this.showPerson("!kristin12b.jpg");
				addPlaceTitle(md, "An Oral Deposit");

				md.write('<p>You tell ' + herNameK + ' to use her mouth to pleasure you. She skillfully takes your length into her mouth  and you do not take long to release into her mouth. She swallows and lies back and says, "Thank you ' + myNameK + '".</p>');
			} else {
				this.showPersonRandomRorX("!kristin12g", isExplicit() ? 3 : 2);
				addPlaceTitle(md, "A Bank Servicing");
				md.write('<p>You tell ' + herNameK + ' to use her tongue to pleasure you and while she is not very experienced she does have some skill she makes you reach the peak of ecstasy quickly. After she lies back and says, "Thank you!".</p>');
			}
			startQuestions();
			addLinkToPlace(md, 'talk more to Kristin', Place);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType === "kristinhomefuck") {
			// fuck her
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) {
				// Male
				this.showPersonRandomRorX("!kristin11b", isExplicit() ? 3 : 2);
				addPlaceTitle(md, "Making a Deposit");
				md.write(
					'<p>You readily agree to take her and you sink you manhood into her delightful pussy, ramming into her over and over. You feel her shudder in her release and that is the final straw and you pour your passion into her depths.</p>'
				);
			} else {
				// Strap-on fuck
				this.showPersonRandomRorX("!kristin11g", isExplicit() ? 2 : 1);
				addPlaceTitle(md, "An Asset Meeting");
				md.write(
					'<p>You put on your strap-on and tell Kristin to mount herself on it and ride you cowgirl style.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, 'talk more to Kristin', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType === "kristinhometitfuck") {
			// Tit-fuck her
			md = WritePlaceHeader();
			this.showPersonRandomRorX("!kristin13b", isExplicit() ? 4 : 1);
			addPlaceTitle(md, "Depositing on her Breasts");
			md.write(
				'<p>You readily agree to take her and you sink you manhood between her breasts. You delight in her soft cleavage and quickly spill over her ample breasts.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'talk more to Kristin', Place);
			WritePlaceFooter(md);
			return true;			
		}
		if (sType === "kristinhomedoublefuck") {
			// Double ended dildo
			md = WritePlaceHeader();
			this.showPersonRandomRorX("!kristin13g", isExplicit() ? 2 : 1);
			addPlaceTitle(md, "Mutual Assets");
			md.write(
				'<p>You readily agree and ask her to get out a dildo for you to you. Kristin gets out a double ended dildo for you both to use!</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'talk more to Kristin', Place);
			WritePlaceFooter(md);
			return true;			
		}		

		return false;
	};

	per.showEvent = function()
	{
		if (sType === "") return false;	
		if (Place == 430) return this.showEventHome();
		
		var md;
		if (Place == 269) {
			if (sType == "kristinpool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPersonRandom("!kristin-pool", 2);
				addPlaceTitle(md, "Swimming with Kristin");
				md.write(
					'<p>Kristin arrives, dressed in a bikini, and you have a pleasant swim together.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=kristinpoolsex');
				addLinkToPlaceC(md, 'say goodbye to Kristin', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "kristinpoolsex") {
				md = WritePlaceHeader();
				this.showPerson("!kristin-pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Kristin");
				md.write(
					'<p>You ask Kristin to play with you more privately, and she seductively removes most of her swimsuit and lies back waiting for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Kristin', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 5) {
			// Dervish Rd (usually near the Bartel home)
			if (sType == "kristinvisit") {
				md = WritePlaceHeader();
				WaitHereOnly(6);
				this.setFlag(16);
				this.other = nTime;
				this.showPerson(isCharmedBy("Carol") ? "!kristincarol1c.jpg" : "!kristincarol1.jpg");
				addPlaceTitle(md, "Kristin visits Carol");
				if (isCharmedBy("Carol")) {
					// Repeat with a charmed Carol
					md.write(
						'<p>Kristin dresses casually and you both leave her house and go next door. As you arrive you are met by Carol, Kristin must have texted her. Carol warmly welcomes you both into her home</p>' + 
						'<p>She offers you some wine and they both offer a toast to you!</p>'
					);						
				} else if (this.checkFlag(4)) {
					// Later time
					md.write(
						'<p>Kristin dresses casually and you both leave her house and go next door. As you arrive you are met by Carol, Kristin must have texted her. Carol almost pointedly welcomes Kristin and just nods at you. Kristin tells you that it is time and she will see you later, her way of telling you to leave them alone for now. You see them walk back into Carol\'s home</p>' +
						'<p>A minute later you get a text from Kristin apologising and asking you to wait a little for her to convince Carol again.</p>'
					);				
				} else {
					// First time
					this.setFlag(4);
					md.write(
						'<p>Kristin dresses casually and you both leave her house and go next door. As you arrive you see Carol has changed and is leaving her house and walking over to the sports car in the driveway. Kristin walks over to her, and they talk for a little while, just small talk, ignoring you entirely. Kristin glances over to you and quickly shows her phone to you, she must mean she will call you when things are ready. She then waves to you, and she and Carol enter into Carol\'s home, just before the door closes you see them kissing.</p>' +
						'<p>You will have to kill some time until Kristin calls. You suppose you could wait in Kristin\'s house or go for a walk, you doubt you will have to wait for long.</p>'
					);
				}
				if (isCharmedBy("Carol")) {
					addLinkToPlace(md, 'drink the wine and let them start', 420, 'type=kristincarolrepeat2');
					addLinkToPlace(md, 'leave them to play together', 5);
				} else {
					this.moveThem(420);
					this.setFlag(15, false);	// Allow the follow up call
					this.setFlag(14, false);	// Allow the follow up call
					setPersonFlagAfterTime("Kristin", 15, undefined, 10);		// Trigger call after 10 turns

					startQuestions();
					addLinkToPlace(md, 'return to Dervish Rd', 5);
				}
				WritePlaceFooter(md);
				return true;
			} 
		}
		
		if (Place == 420) {
			
			if (sType == "kristincarolrepeat2") {
				// Repeat event
				WaitHereOnly(3);
				md = WritePlaceHeader(false, 'td-left-med');		
				movePerson("Kristin", 430);		// Return home
				this.showPersonRorX("!kristincarolrepeat1.jpg");
				addPlaceTitle(md, "Kristin and Carol Together");

				md.write(
					'<p>The two are skilled and practised lovers, knowing exactly what the other wants and how to bring them the most pleasure.</p>' +
					'<p>After a while yo feel a bit left out, they are so focused on each other. You should either leae them to each other, or remind them who is the ' + perYou.getMaster() + ' and make them focus on you instead...</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'interrupt them', 420, 'type=kristincarolrepeat3');
				if (isCharmedBy("Ellie")) addLinkToPlace(md, 'call in Ellie to help interrupt them', 420, 'type=kristincarolellie');
				addLinkToPlace(md, 'leave them to play together', 5);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "kristincarolrepeat3") {
				// Repeat event threesome
				// non- kristinevent8ba (wide)
				// ex - kristincarolba (wide)
				// non/ex Explicit/kristinevent8g ''
				WaitHereOnly(6);
				md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
				if (perYou.isMaleSex()) {
					if (isExplicit()) this.showPersonRandomX("!kristincarolb", 3);
					else this.showPerson("kristinevent8ba.jpg");
				} else if (isExplicit()) this.showPersonX("kristincarolga.jpg");
				else this.showPersonX("kristinevent8g.jpg");		// Not actually explicit
				addPlaceTitle(md, "Joining Kristin and Carol");

				md.write(
					'<p>You interrupt and remind them you are here, and they both break off and immediately move to you. Carol smiles as she always does and says "Naughty us, mighty ' + perYou.getWitch(true, true) + ' wants us now" Kristin looks at her amused and agrees, "Yes we raally need to pay ' + perYou.getHimHer() + ' some interest"</p>' +
					'<p>With that your two MILF slaves completely focus on your pleasure and devotedly bring you to ecstatic peaks over and over.</p>' +
					'</p>Later you redress and leave them to ther games and the house for now.</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'leave them to play together', 5);
				WritePlaceFooter(md);
				return true;
			}	
			
			if (sType == "kristincarolellie") {
				// Foursome Kristin, Carol, Ellie
				WaitHereOnly(6);
				md = WritePlaceHeader();
				if (!isExplicit()) AddImageRandom("GenericSex/foursome", 2);
				else if (perYou.isMaleSex()) this.showPersonRandomX("!kristincarolellieb", 2);
				else this.showPersonX("kristincarolelliega.jpg");
				addPlaceTitle(md, "Ellie Helping with Kristin and Carol");

				md.write(
					'<p>You call Ellie to come in and help with Kristin and Carol. She looks a bit distracted and you remember her discomfort at Kristin and Carol\'s relationship. You quickly assert control and tell all of them it is time for them to attend to you..</p>' +
					'<p>Ellie immediately drops to her knees and starts to remove your clothing. Carol and Kristin break off and Carol says, "Like daughter, like mother", and Kristin smiles but otherwise says nothing as she joins.</p>' +
					'<p>It is a complicated but very pleasurable thing to be the center of attention of three women and you quickly lose track of who is licking who or sucking what amidst the mass of mouths, breasts, pussies and asses.</p>' +
					'</p>Later you redress and leave as the others dress and return to their homes or rooms.</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'leave them to finish', 5);
				WritePlaceFooter(md);
				return true;
			}				
		}
		
		if (Place == 228) {
			var perTitus;
			if (sType == "karenkristin3") {
				// Titus/Kristin scene 3
				md = WritePlaceHeader();
				this.showPerson("!kristin14.jpg");
				addPlaceTitle(md, "Kristin\s Here");
				md.write(
					'<p>Kristin wears a sexy miniskirt, an elegant blazer she already had halfway opened and a pronounced look of surprise on her face as she walks into the room and recognizes the two of you, her head tilting to the side.</p>' +
					'<p>“You... really need to start telling me in advance when you do this, Karen...”</p>' +
					'<p>The situation doesn\'t seem to be particularly new for her, but also not one she likes finding herself in. Still, with her stunned, you <b>now</b> have the perfect opportunity to charm her.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "ask her to join in", Place, '', '“Uhm... you are ' + perYou.getPersonName() + ' right?” Kristin shakes her head “I still want to be able to look your mom in the eyes, so, sorry, but no.</p><p>And with that, Kristin is out of the frontdoor and in her car too fast for you to catch up.</p><p>You at least spend a very pleasant night with Karen, who quickly forgets her disappointment and helps you forget about charming Kristin for the rest of it.');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmkristintitus1") {
				// Charm Kristin at Ms Titus's House 1
				md = WritePlaceHeader();
				this.showPerson("!kristin15.jpg");
				addPlaceTitle(md, "Kristin Enspelled");
				if (this.flags[0] < 5) {
					//Haven't introduced yourself yet
					this.setFlag(1); //Now you have
				}
				md.write(
					'<p>“Dai Chu, Kristin!” You quickly weave the spell before Kristin has a chance to make up her mind and watch as her expression turns from surprise to confusion.</p>' +
					'<p>“Uhm, Daichu to you as well, I should... ohhh...” Her cheeks begin to flush and she bites her lower lip as the mana begins to spread through her body, her eyes now fixed on Karen, ' + (perYou.isMaleSex() ? 'whose head is slowly moving up and down your cock' : 'whose tongue is playfully flicking over your clit') + '.</p>' +
					'<p>“You should undress.” You finish the sentence for her, and she returns her attention to you.</p>' +
					'<p>“No I don\'t, and I really don\'t like where this is going...” She protests, but her fingers have already opened the remaining buttons of her blazer, revealing both a rather nice pair of tits and a lack of underwear.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'assure her that she actually does like where this is going', Place, 'type=charmkristintitus2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmkristintitus2") {
				// Charm Kristin at Ms Titus's House 2
				md = WritePlaceHeader();
				this.showPerson("!kristin16.jpg");
				addPlaceTitle(md, "Kristin Enspelled");
				md.write(
					'<p>“Oh, you do like it, in fact, deep inside you, you really want to trade places with Karen, do you?” You tenderly caress Ms Titus hair, who finally chimes in.</p>' +
					'<p>“Oh, she does, there is a slut in there just waiting to get out.”</p>' +
					'<p>Kristin had already removed her blazer and was in the process of  taking off her skirt, but suddenly hesitates.</p>' +
					'<p>“I do... but I\'m no slut... it makes no sense that... I would want to...” Her voice trails off and she bites her lower lip again as if hoping to keep herself from speaking, desperately clinging on to her skirt with both hands.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'push her further', Place, 'type=charmkristintitus3');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmkristintitus3") {
				// Charm Kristin at Ms Titus's House 3
				md = WritePlaceHeader();
				this.showPerson("!kristin17.jpg");
				addPlaceTitle(md, "Kristin Enspelled");
				md.write(
					'<p>“Get on your knees and ' + (perYou.isMaleSex() ? 'suck my cock' : 'lick my pussy') + '?” “Lie down on the bed and beg me to fuck you?” You smile sweetly to her. “Submit to me in all matters and become my ever willful plaything?”</p>' +
					'<p>“Yesss.... No! I mean...” It clearly doesn\'t take much now, Kristin almost tears off her skirt and gazes at you longingly, but still holds herself back, her eyes glassy with traces of pink swirling inside. “This is confusing...”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'order Karen to bring her to you', Place, 'type=charmkristintitus4');
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == "charmkristintitus4") {
				// Charm Kristin at Ms Titus's House 4
				perTitus = findPerson("MsTitus");
				md = WritePlaceHeader(false, 'td-left-med');
				if (isExplicit() && !perYou.isMaleSex()) perTitus.showPerson("kristintitus2f.jpg");
				else perTitus.showPersonRorX("kristintitus2" + (perYou.isMaleSex() ? "m" : "f") + ".jpg");
				addPlaceTitle(md, "Kristin Enspelled with Karen");
				md.write(
					'<p>Kristin hesitates for maybe a second, but otherwise does not resist as her friend guides her to the bed, ' + (perYou.isMaleSex() ? 'pushes her down and comes to lay on top of her' :  'spins around to let herself fall onto it and pushes her face between her legs') + '.</p><p>' +
					(perYou.isMaleSex() ? '“Let us review the facts.” You tell Kristin, who hungrily looks up at your cock. “You are right now naked before me, Your friend is about to suck my cock...” Karen wastes no time taking it into her mouth as you say that. “...you took off your clothes because I ordered you to and the only reason you are not all over my cock as well is because I did not order it, yet.”' :
												 '“Let us review the facts.” You tell Kristin, who seems almost mesmerized by Karen\'s pussy. “You are right now naked before me, your head between one of my slaves legs, and your ass pushed up for me to do this.” You push two fingers into Kristins wet sex, luring a soft moan from her lips. “You took off your clothes because I ordered you to and the only reason you are not trying your best to lick Karen to orgasm, is because I did not order it, yet.”') + '</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'Kristin ponders your words', Place, 'type=charmkristintitus5');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmkristintitus5") {
				// Charm Kristin at Ms Titus's House 5
				perTitus = findPerson("MsTitus");
				md = WritePlaceHeader(false, 'td-left-med');
				if (isExplicit() && !perYou.isMaleSex()) perTitus.showPerson("kristintitus3f.jpg");
				else perTitus.showPersonRorX("kristintitus3" + (perYou.isMaleSex() ? "m" : "f") + ".jpg");
				addPlaceTitle(md, "Kristin Enspelled with Karen");
				md.write(
					'<p>“Which is mystifying, is it?” Kristin says absentmindedly while her tongue trails over her lips ' + (perYou.isMaleSex() ? 'and she looks barely able keep herself from tasting you' : 'and her hip grinds back against your fingers') + '. “I barely know you, so why am I doing this?”</p>' +
					'<p>“It\'s because you want to be ' + perYou.getHisHer() + ' slave.” Ms Titus interrupts in a teasing voice.</p>' +
					'<p>“Hm... I do?” Kristin seems to be almost in a trance, and her “resistance” is more for show by now. She wraps her arms around ' + (perYou.isMaleSex() ? 'your hip and eagerly licks your ballsack.' : 'Karen\'s legs and eagerly begins to lick her clit.') + '</p><p>' +
					(perYou.isMaleSex() ? '“Yes, you do.” You press your manhood into Kristin\'s face and both her and Karen\'s tongues and lips begin to slide over it. “In fact,” You caress her cheeks with both hands. “...you have been my slave from the moment I first laid eyes on you in the Bank, you just did not realize it, until now.”' :
												 '“Yes, you do.” You place a slap onto Kristins rear and move your lips close to her ear,“In fact,” You take a hold of her hair to keep her in place. “...you have been my slave from the moment I first laid eyes on you in the Bank, you just did not realize it, until now.”') +
					'</p><p>“I see...” Kristin seems lost in the moment, her eyes closed and her body ' + (perYou.isMaleSex() ? 'eagerly grinding against Karen, who seems to take great pleasure feeling her new slavesister squirm under her massive jugs' : 'shivering from your touch and clinging to Karen, who watches her with a grin') + '.</p>' +
					'<p>When she finally opens her eyes, the pink glow has fully formed and the spell completely taken over her mind, washing away any traces of doubt and hesitation she might have had left.</p>' +
					'<p>“Good thing you two explained it to me...” She smiles to both of you. “I never would have figured this on my own.”</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'take your new slave properly', Place, 'type=charmkristintitus6');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmkristintitus6") {
				// Charm Kristin at Ms Titus's House 6
				perTitus = findPerson("MsTitus");
				md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
				if (perYou.isMaleSex()) perTitus.showPersonRorX("kristintitus4m.jpg");
				else perTitus.showPerson("kristintitus4f.jpg");
				addPlaceTitle(md, "Kristin Enspelled with Karen");
				md.write(
					'<p>“This is why we are here, are you ready to become mine, Kristin?” You pull back and look down to her, your fingers driving though her hair</p>' +
					'<p>“Yes... ' + perYou.getMaster() + '...”</p>' +
					'<p>“Good, now come.”</p>'
				);
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You sit down on the bed and Pull Kristin on top of you, pressing her back against your chest and squeezing her breasts firmly in both hands while Karen takes your manhood and begins to rub the tip along Kristin\'s folds and clit.</p>' +
						'<p>“P..please Master.” She breathes out, her mind lost in a haze as she desperatly grinds her hip against your cock until you finally give Karen the signal to guide it into her and she pushes down on you with a deep sigh of relive.</p>' +
						'<p>Karen was not joking when she called Kristin a tigress. She rides you with a passion you would not have expected to be in her when you met at the bank. Her moans are unrestrained and lewd, filling the room while Karen\'s tongue flicks over her clit, and as she reaches her peak, she grabs her friends hair with both hands and pushes her lips against her widely spread labia.</p>'
					);
				} else {
					md.write(
						'<p>You guide Kristin to lie down on her back and both you and Karen begin to cover her skin with kisses, your hands exploring every part of her beautiful body, squeezing her breasts and tracing her collarbones, while Karen caresses her sex.</p>' +
						'<p>Kristin moans lewdly with every touch, her body winding itself on the bed as she spreads out her arms behind her and digs both hands into the sheets. You realize quickly why Karen called her a tigress in bed, the usually all so domineering woman is melting under your combined touch, allowing herself to drift away into a haze of pleasure quickly leading her into a powerful orgasm, her entire body arching through with a loud groan of pure lust.</p>'
					);
				}
				md.write(
					'<p>It takes her a moment to calm down and catch her breath, and Karen uses the time to trade kisses with both of you.</p>' +
					'<p>“I\'m glad you like your new slave ' + perYou.getMaster() + ', but don\'t forget about me, yes?</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"How could I?"', Place, 'type=charmkristintitus7');
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == "charmkristintitus7") {
				// Charm Kristin at Ms Titus's House 7
				perTitus = findPerson("MsTitus");
				md = WritePlaceHeader(false, 'td-left-med');
				perTitus.showPerson("kristintitus5.jpg");
				addPlaceTitle(md, "Kristin Enspelled with Karen");
				md.write(
					'<p>You order both of your slaves to bend over in front of you, driving your hands over their asses and giving both of them a firm slap before you unceremoniously ' + (perYou.isMaleSex() ? '' : 'push your fingers') + ' into Karen\'s eager mound.</p>' +
					'<p>It marks the beginning of an entire night full of passion. Skin rubbing against skin and lewd noises of all kind filling the house as the three of you enjoy each others bodies.</p>' +
					'<p>Both women seem insatiable, with Kristin being rather aggressive and domineering, unless you reign her in a little, and Karen being her usual self, enjoying whatever the two of you give and focusing everything on pleasing both of you.</p>' +
					'<p>For a while, it feels like they are filled with endless reserves of energy, kissing and touching each other long after you had to pull away, but even they finally grow tired and collapse happily in your arms to drift off to sleep.</p>' +
					'<p>The next day, Kristin and Karen both head back to work, but not before Kristin reminds you that she can be a little forgetful occasionally, so you might want to drop by her office at times to remind her of what happened today.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'leave the house', 229);
				WritePlaceFooter(md);
				return true;
			}				
			
		}

		// Remaining events are in her office
		if (Place != 224) return false;
		
		if (sType == "elucidate") {
			// Repeat sex scene
			md = WritePlaceHeader();
			this.showPerson(perYou.isMaleSex() ? "!kristin9b.jpg" : "!kristin9g.jpg");
			addPlaceTitle(md, "Taking Kristin Again");
			md.write(
				'<p>Your hands and tongue heighten your slave\'s arousal and obedience, and she does ' +
				'her best to please you in turn.</p>' +
				'<p>As you and she find yourselves crying out with ' +
				'the joy of your activity, you have the passing concern that the "shield" over your ' +
				'charm will not extend to the street, where people can no doubt hear you.</p>' +
				'<p>If they do, however, nobody mentions it.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'Put your clothes back on and return to the front desk', 225);
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
		
		if (sType == "charmkristin1") {
			// Charm Kristin 1
			md = WritePlaceHeader();
			this.showPerson("kristin2.jpg");

			addPlaceTitle(md, "Kristin Enspelled");
			if (this.flags[0] < 5) {
				//Haven't introduced yourself yet
				this.setFlag(1); //Now you have
			}

			md.write(
				'<p>The shielded spell pulses outward, and suddenly everybody but you and your victim ' +
				'has something better to do than look into the bank manager\'s office.  Kristin, for ' +
				'her part, is looking a little flushed in your presence and, perhaps in some desperate ' +
				'attempt to resist these feelings, studies the accounts on her desk.</p>' +
				'<p>"Well, ah, if you have no further business..." she bites her lip, needful, and after ' +
				'a furtive glance her passion gets the better of her.  "Nothing else you want me for..."</p>' +
				'<p>You rise to the invitation, standing and leaning over her desk.  "As a matter of fact, ' +
				'there is," you say.  Lithe and catlike (at least in her eyes), you crawl onto her desk.</p>' +
				'<p>She leans back in her seat and gazes up at you, surprised and uncertain.</p>' +
				'<p>"You look confused," you tell her, and she nods her assent, her smile matching yours in spite of the shock.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Is there something that doesn\'t add up?"', Place, 'type=charmkristin2');
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
		if (sType == "charmkristin2") {
			// Charm Kristin 2
			md = WritePlaceHeader(false, this.getDress() == "Black" ? "td-left-large" : "");
			this.showPerson("kristin3.jpg");

			addPlaceTitle(md, "Kristin Enspelled");
			md.write(
				'<p> "Yes," she says.  "It makes no sense that a customer would be on my desk."</p>' +
				'<p>"But I am," you laugh.  "And you don\'t mind in the least that I\'m up here."</p>' +
				'<p>"Of course," she agrees, but you can see the quick, logical mind spinning behind ' +
				'her glowing eyes.  "But it doesn\'t add up that I wouldn\'t mind, either.  I\'m very ' +
				'picky about who I allow to approach me, and I certainly would never let someone stay ' +
				'on my desk long enough to be seen - it could cost me my job!"</p>' +
				'<p> "You know what else makes no sense?" you chuckle.  "Nobody\'s looking at us, even with the door open."</p>' +
				'<p>The two of you share a puzzled moment, looking out the door as a subaccountant ' +
				'walks past with a cup of water from the water-cooler, and waves out of habit but doesn\'t look in.</p>' +
				'<p>"You\'re right," she gasps.</p>' +
				'<p>"And it doesn\'t make sense that I know so much about what\'s going on," you ' +
				'continue.  "Or the way that you have to take off your clothes."</p>' +
				'<p>"Seriously," she gripes, pulling down her top to reveal one large, perfect breast. "This is really mystifying."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Would you like me to <i>explain</i> it to you?"', Place, 'type=charmkristin3');
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
		if (sType == "charmkristin3") {
			// Charm Kristin 3
			md = WritePlaceHeader();
			this.showPerson("kristin4.jpg");

			addPlaceTitle(md, "Kristin Enspelled");
			md.write(
				'<p>"Please do?" she says, her voice oddly pleading as once more her attraction ' +
				'to you rises to the surface.</p>' +
				'<p>"Well, let\'s review our facts, shall we?  I\'m sure everything will make ' +
				'perfect sense if I list everything properly and you listen to me," you say, and she nods.</p>' +
				'<p>"You don\'t mind that I am on your desk, nobody is paying attention to our ' +
				'behavior, you are taking your clothes off for me, I understand everything ' +
				'perfectly, you are listening carefully to me so that you can understand as well-"</p>' +
				'<p>"Oh!" she interrupts you.  "Perhaps I\'m dreaming?"</p>' +
				'<p>"You should play with your breasts," you recommend, and she does.  Her face ' +
				'remains passive, though her breath comes a little heavier.</p>' +
				'<p>"I thought pinching was how you tested whether you were dreaming."</p>' +
				'<p>"It\'s a question of sensation," you explain.  "You can tell you aren\'t ' +
				'dreaming now, because you feel your hands kneading your breasts, arousing you, ' +
				'making you want to obey me more with every touch."</p>' +
				'<p>"Obey?" she says, her voice quavering.  "Why would my hands make me want to obey?"</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Come up here a moment and I\'ll explain it in more detail."', Place, 'type=charmkristin4');
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
		if (sType == "charmkristin4") {
			// Charm Kristin 4
			md = WritePlaceHeader();
			this.showPerson("kristin5.jpg");

			addPlaceTitle(md, "Kristin Enspelled");
			md.write(
				'<p>She continues to disrobe and crawls onto the desk with you.</p>' +
				'<p>"It isn\'t your hands, specifically," you say, running your hands across her ' +
				'shoulders, her stomach, teasingly up and down her inner thigh.  "My hands make ' +
				'you want to obey even more effectively."  She shudders with rapture, helpless ' +
				'against her magic-induced yearning.</p>' +
				'<p>"Ohh...yes..." she gasps.</p>' +
				'<p>"And the more you listen, the less resistance you have, until you have no ' +
				'desire to disobey me at all.  You enjoy listening to me talk, and now that ' +
				'I\'ve explained things you\'re perfectly content because all of those things ' +
				'you were worried about make perfect sense."</p>' +
				'<p>"Ah," she says, as if you\'ve actually explained any of what she asked ' +
				'about.  "That would make ours a slave/' + perYou.getMaster() + ' ' +
				'relationship, then. Interesting.  When did I become your slave?"</p>' +
				'<p>"You\'ve always been my slave," you lie easily.  "You simply didn\'t ' +
				'understand it completely until I explained it to you, just now."</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'command your slave to show herself off', Place, 'type=charmkristin5');
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
		if (sType == "charmkristin5") {
			// Charm Kristin 5
			md = WritePlaceHeader();
			this.showPerson("kristin7.jpg");

			addPlaceTitle(md, "Kristin Enslaved");
			md.write(
				'<p>Kristin shows off her well-groomed body for your pleasure.  "I\'m so glad ' +
				'you explained my enslavement to me, ' + perYou.getMaster() + '.' +
				'Smart as I am, it was so  confusing that I might never have figured it out on my own.  You\'re so clever!"</p>' +
				'<p>"Yes," you agree, blithely drawing her near again.  "Yes I am," you whisper ' +
				'into her ear, as the two of you begin to go at it.</p>' +
				'<p>At some point, the mail is delivered, but the mailman doesn\'t notice ' +
				'the sounds and never looks up from the floor, where he leaves the mailbin.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'leave your oh so understanding slave', 225);
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}		
		
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var img = this.showPersonRandom("!poledance", 2);
		addPlaceTitle(md, "Kristin's Dance");
		md.write(
			'<p>Kristin confidently steps on the stage in ' + (img.indexOf("poledancea") != -1 ? 'some lingerie' : 'a rather exotic outfit with a mask and feathers') + ', not that she keeps it on for very long. She does an elegant and skillful dance, she must be a trained dancer!</p>' +
			'<p>After she sits with you happily for a while and talks about how she worked as a dancer before her career as a banker. This is not something you had expected and it was a very pleasant surprise.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 430 && this.isHere() && sType === "") {
			// Sex
			if (perYou.isMaleSex()) {
				addLinkToPlaceO(md, 'make a deposit', Place, 'type=kristinhomefuck');
				addLinkToPlaceO(md, 'keep a breast of deposits', Place, 'type=kristinhometitfuck');
				addLinkToPlaceO(md, 'orally negotiate a deposit', Place, 'type=kristinhomebj');
			} else {
				addLinkToPlaceO(md, 'have her service your assets', Place, 'type=kristinhomebj');
				addLinkToPlaceO(md, 'discuss mutual assets', Place, 'type=kristinhomedoublefuck');
				if (perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'ream her assets', Place, 'type=kristinhomefuck');
			}
			// Other questions
			if ((checkPersonFlag("Carol", 2) || (checkPersonFlag("Ellie", 4) && !isCharmedBy("Carol"))) && !this.checkFlag(2)) addLinkToPlaceC(md, 'ask about her neighbours', Place, 'type=neighbours');
			if (this.checkFlag(6) && !this.checkFlag(4)) addLinkToPlaceC(md, 'ask again about her neighbours', Place, 'type=neighboursagain');
			if (this.checkFlag(9) && !this.checkFlag(10)) addQuestionC(md, 'ask Kristin to re-open the Bank', "Kristin", 2801);
			
			if (this.checkFlag(3) && !this.checkFlag(4)) addLinkToPlaceC(md, '"Can you get me into Carol\'s house?"', 5, 'type=kristinvisit');
			else if (this.checkFlag(4) && !isCharmedBy("Carol")) {
				if (this.checkFlag(16)) addLinkToPlaceC(md, '"Can you visit Carol again and let me watch?"', Place, '', 'Kristin apologises and says that Carol is only available some of the time and suggests tomorrow?');
				else addLinkToPlaceC(md, '"Can you visit Carol again and let me watch?"', 5, 'type=kristinvisit');
			} else if (isCharmedBy("Carol") && this.checkFlag(3)) {
				if (this.checkFlag(16)) addLinkToPlaceC(md, '"Can you visit Carol again and let me watch?"', Place, '', 'Kristin apologises and says that Carol is only available some of the time and suggests tomorrow?');
				else addLinkToPlaceC(md, '"Can you visit Carol again and let me watch?"', 5, 'type=kristinvisit');
			}
				
			this.addDancingLink(md, 'ask Kristin to dance for you in the club',
				'You ask Kristin about dancing in the Avernus club and that you want her to dance for you there tonight,</p>' +
				'<p>&quot;Yes of course ' + perYou.getMaster() + ' anytime!&quot; and with that you call Jade to arrange a dance for Kristin.'
			);
			this.addSleepLink(md, "go to bed for the night with Kristin", "Going to Bed with Kristin",
				'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">It is getting late and Kristin suggests you may wish to spend the night to further assess her portfolio. When you agree and join her in her bedroom she demonstrates to you her preferred sleeping atire, nothing at all.',
				'bed1.jpg'
			);
			
			// Invisible options (with improved invisibility AND was inivisble outside)
			addPopupLinkIx('watch what Kristin is doing', 'Invisible with Kristin', 
				(!this.checkFlag(17) ?
					this.addPersonRandomStringRorX("!invisible-masturbate", 1, "height:max%", "right") +
					'You watch Kristin for a while, invisibly sitting nearby. After a little while she starts to get restless and you hear her whisper something like "where are you".</p>' +
					'<p>After a little longer she gets more restless and adjusts her lingerie, running her fingers lightly over her groin and breasts, she whispers, "' + perYou.getMaster() + ' come and take me...". Her hands more with more purpose, she is masturbating thinking about you! She frantically rubs herself and cries out "' + perYou.getMaster() + ' come for me!" and she orgasms. For a moment you thought her eyes glowed brighter but as she pants in her satisfaction they return tp normal.</p>' +
					'<p>She adjusts her lingerie and picks up some papers, probably some work from the bank'
				:
					this.addPersonString("!kristin10c.jpg", "height:max%", "right") +
					'Kristin is doing some paperwork now. You suspect that is all for now, maybe check back later, or even tomorrow.</p>' +
					'<p>Either that or end the invisibility spell!'
				),	true, "setPersonFlag('Kristin',17);dispPlace();"
			);
		}
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			//Friendly Loan Company (BANK) - Kristin, Manager
			if (Place == 224 && this.isHere() && sType != "invitenella")  {
				if (isSpellKnown("Shielded Charm")) {
					// Know shielded Charm
					CastCharmSpell("Kristin", Place, 1, 'type=charmkristin1');
				} else addComments('Even though she has her own office, the bank is still a <i>very</i> public place.  Perhaps if you had a more powerful spell...');
				return "handled";
			}
			if (Place == 228 && sType == "karenkristin3") {
				CastCharmSpell("Kristin", Place, 1, 'type=charmkristintitus1');
				return "handled";
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
		if (Place == 269) {
			if (this.whereNow() == 224) WriteComments("You call Kristin to invite her to join you at the pool for a swim, but she explains she is working at the Bank and will have to take a rain-check.");
			else {
				gotoPlace(Place, 'type=kristinpool');
				receiveCall('', 'You call Kristin to invite her to join you at the pool for a swim, and she answers that it is agreeable and will be there in a while.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};
	per.addPersonPhoneCall = function() {
		if (this.checkFlag(15) && !this.checkFlag(14)) {
			if (makeCall(false, "Kristin", '"' + perYou.getMaster() + ' I have convinced Carol to allow you to \'watch\', come on back to the house!"')) {
				this.setFlag(14);
				return true;
			}
		}
		if (this.place == 420 && this.checkFlag(2) && !this.checkFlag(4) && this.checkFlag(7) && !this.checkFlag(6) && Place != 430) {
			if (makeCall(true, 310)) this.setFlag(6);
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		if (id == 310) return receiveSMS('Kristin', this.getYourNameFor() + ' I was just thinking, and I am sorry about before when we talked about my neighbours. I did not tell you everything. Come by and talk to me again.', 'kristinsms1.jpg');
		return '';
	};

}
