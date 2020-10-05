/****************************************************************
	Bank Security Guard, Nella
 ****************************************************************/

 function RepliesNella(nR)
{
	//var bCharm = per.isCharmedBy();
	//var myName = per.getYourNameFor();

	return true;
}


/***************** Initialise ******************************************************************************/
function initialiseNella()
{
	// Esmeralda the New Age Store Owner
	addPerson("Nella", 0, "Nella", '', false);
	per.Replies = RepliesNella;
	
	per.getPossessionFace = function() { return "!nella-face"; };
	
	per.getDress = function() {
		if (Place == 225 || Place == 224) return "Guard";		// Security Guard
		if (Place == 282) return "Dancer" + this.other;
		if (Place == 197) return "Bondage" + (this.checkFlag(13) ? "3" : (this.checkFlag(12) ? "2" : "1"));
		return this.dress;
	};
	
	per.whereNow = function() {
		if (sType == "invitenella" || sType.indexOf("charmnella") != -1 || sType.indexOf("bondageplaynella") != -1 || sType == "privatedance") return Place;
		var p = per;
		var pM = findPerson("Kristin");
		per = p;
		if (isShopOpen(0) && !pM.checkFlag(9) && this.place == 225) return this.place;
		if (this.checkFlag(6)) {
			var d = Math.floor(nTime / 288) % 7;
			if (getHour() < 6 && (d === 0 || d > 4)) return 282;
		}
		if (this.checkFlag(15)) return 198;
		return 0;
	};
	
	per.passTimeDay = function() {
		var d = Math.floor(nTime / 288) % 7;
		if (d === 0 || d > 4) {
			this.other++;
			if (this.other > 5) this.other = 1;
			this.setFlag(8, false);
		}
		this.setFlag(10, false);
		if (this.isCharmedBy()) {
			if (this.checkFlag(12)) {
				this.setFlag(13);
				this.setFlag(12, false);
			} else if (this.checkFlag(13)) this.setFlag(13, false);			
			else this.setFlag(12);
		}
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		if (sType !== "") return;
		if (Place == 282 && this.checkFlag(7) && !this.checkFlag(8)) {
			var d = Math.floor(nTime / 288) % 7;
			if ((getHour() < 8 && d === 0 || d > 4) || (getHour() > 21 && d > 3)) md.write('<p>Nella, or Jana as she is known here, should be dancing later tonight in the early hours of the morning.</p>');
			else md.write('<p>Nella, or Jana does not work here today.</p>');
		}
		if (Place == 197) {
			if (this.whereNow() == 282) md.write('<p>Nella must be at the Avernus club dancing.</p>');
			if (this.whereNow() == 225) md.write('<p>Nella must be working at the bank.</p>');
		}
		
		if (!this.isPlaceImageRight()) return;
		if (Place == 225) {
			if (this.isCharmedBy()) md.write('<p>Your slave Nella is patrolling the bank.</p>');
			else if (this.checkFlag(2)) md.write('<p>Nella, the security guard is patrolling the bank.</p>');
			else md.write('<p>The security guard is patrolling the bank.</p>');
		}
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 198 && this.isHere() && sType === "") return this.showPerson("home1.jpg", '', '', '', '', false, "string");
		return '';
	};

	per.isPlaceImageRight = function()
	{
		return Place == 225 && this.isHere() && sType === "";
	};

	per.showPlaceImageRight = function(md)
	{
		if (Place == 225) this.showPerson("onduty" + (this.isCharmedBy() ? "c" : "u") + ".jpg");
	};

	per.showEventPopup = function()
	{
		if (Place == 225 && this.place === 0 && isShopOpen(0) && !this.checkFlag(1) && !checkPersonFlag("Kristin", 9) && wherePerson("Camryn") !== 0) {
			// Initial meeting with the security guard
			this.setFlag(1);
			this.place = 225;
			showPopupWindow("New Security Guard",
				this.addPersonString("ondutyu.jpg", "height:max%", "right") +
				"You see a new security guard on duty in the Bank, she seems to be a private guard hired to increase security here after the talk about burglaries and other similar problems around town."
			);
			return true;
		}
		if (Place == 197 && sType == "checkthephone") {
			addSMSToPhotos(340);
			setPersonFlag("Victoria", 37);
			this.setFlag(5);
			showPopupWindow("Bondage Games",
				this.addPersonString("!phone.jpg", "height:max%", "right") +
				'The phone is showing an image of Nella bound with a large ball-gag in her mouth. Victoria makes a soft moan as she stirs in her bindings. She softly explains,</p>' +
				'<p>"We often get together in the evenings to practise rigging and the various techniques of bondage, binding each other, and often both of us together in self-bondage."</p>' +
				'<p>She certainly seems aroused by her talk of bondage and submission. She finishes,</p>' +
				'<p>"' + perYou.getMaster() + ' I can always arrange something with Nella, so you can play with your two bound slaves!"</p>' +
				'<p>You forward the image from Victoria\'s phone to your own, and then turn your attention to your beautiful bound slave...'
			);
			return true;			
		}
		return false;
	};
	
	per.showEvent = function()
	{
		var md;
		
		if (Place == 269) {
			if (sType == "nellapool") {
				WaitHereOnly(4);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Nella");
				md.write(
					'<p>Nella arrives, dressed in a striped black and white bikini, wearing sunglasses. She seductively poses for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=nellapoolsex');
				addLinkToPlaceC(md, 'say goodbye to Nella', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "nellapoolsex") {
				md = WritePlaceHeader(false, 'td-left-large');
				if (!perYou.isMaleSex()) this.showPersonRorX("pool-sex.jpg");
				else this.showPerson("pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Nella");
				md.write(
					'<p>You ask your security guard to play with you more privately, and she seductively removes her swimsuit and lies back waiting for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Nella', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 224) {
			if (sType == "invitenella") {
				md = WritePlaceHeader();
				this.showPerson("office.jpg");
				addPlaceTitle(md, "Kristin and Nella the Bank's Security Guard");
				
				md.write(
					'<p>Kristin calls Nella and asks her you join you in her office. A little while later Nella enters the room,</p>' +
					'<p>"Yes Ma\'am is there a problem?", and she looks at you cautiously, probably expecting to have to excort you from the building or even arrest you.</p>' +
					'<p>Kristin smiles, "No not at all, I just wanted you to join me here"</p>' +
					'<p>Nella looks puzzled, "Well I have, can I return back to my duty?". Again she glances at you, clearly wondering who you are.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, '"Thank you Nella, you may go"', 224);
				AddPeopleColumn(md);
				findPerson("Kristin").showPerson('kristin2.jpg');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "charmnellaoffice1") {
				// Charm in Kristin's Office
				md = WritePlaceHeader();
				this.showPerson("charm1.jpg");
				addPlaceTitle(md, "Nella Under A Charm Spell");
				
				md.write(
					'<p>You recite the charm spell as Nella looks at Kristin with a surprised expression, as Kristin quickly strips out of her clothing. Nella asks Kristin,</p>' +
					'<p>"Ma\'am I do not know what you are thinking...you are very attractive but..." but Kristin interrupts her,<p>' +
					'<p>"Do not worry Nella, this is just what is needed to join me here, as a loyal slave to ' + perYou.getMaster() + ' ' + perYou.getPersonName() + '"</p>' +
					'<p>Nella looks surprised and is about to say something and you decide it is time to take control and you tell them,</p>' +
					'<p>"Kristin, enough, as you say I am the ' + perYou.getMaster() + '! Now Nella let us discuss how much you have wanted to be dominated, to submit to another. While we do you should also remove your clothing.."</p>' +
					'<p>She looks surprised, "How did you know...I have fantasised and played at being a prisoner or controlled. Often played with my friend..." As she says this she unconsciously starts to strip.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'tell her to strip more', Place, 'type=charmnellaoffice2');
				AddPeopleColumnMed(md);
				findPerson("Kristin").showPerson('invite1.jpg');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmnellaoffice2") {
				// Charm in Kristin's Office
				md = WritePlaceHeader();
				this.showPerson("charm2.jpg");
				addPlaceTitle(md, "Nella Under A Charm Spell");
				
				md.write(
					'<p>You ask about her friend, and distractedly she says "Vicky" and you are sure she means Victoria at the Antiques ' + getShopStore(true) + '.</p>' +
					'<p>By now she has stripped amost completely naked but she is still holding her batton, although somewhat suggestively. You continue to talk about her fantasy, playing up to it,</p>' +
					'<p>"You can see now that I am completely in control of my slave Kristin" and you look at her. Kristin answers and she reaslises where you are going "Completely ' + perYou.getMaster() + ', as I am in charge of Nella, her job and her finances"<p>' +
					'<p>This is just playing to Nella\'s fantasy to reinforce the charm and your control over her, Kristin had explained before she had not directly employed Nella. Nella smiles, you are unsure why, does she realise this or is it the spell? She says,</p>' +
					'<p>"No, you cannot do that to me, force me to do all those perverted, humiliating things so I can keep my job!"</p>' +
					'<p>No matter the reason she is fully playing to the spell and the fantasy.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, '"Yes I can and will"', Place, 'type=charmnellaoffice3');
				AddPeopleColumnMed(md);
				findPerson("Kristin").showPerson('invite1.jpg');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmnellaoffice3") {
				// Charm in Kristin's Office
				md = WritePlaceHeader();
				this.showPerson("charm3.jpg");
				addPlaceTitle(md, "Nella Under A Charm Spell");
				
				md.write(
					'<p>You play to her fantasy, and her new reality. You tell her "Yes I can and to prove it, Kristin-slave cum for me". Kristin smailes happy to play her part in controlling Nella for you and says "Yes ' + perYou.getMaster() + '"</p>' +
					'<p>Kristin make a play of maturbating for you and she is clearly very aroused, she reaches her orgasm quickly and loudly. Once she does she looks at you and you tell her "Well done slave"</p>' +
					'<p>You look at Nella and she is practically standing at attention as she intently watches Kristin. You tell her that it is her turn now as your slave.</p>' +
					'<p>She looks at you and moves her batton to start to pleasure herself, a mixture of reluctance and pleasure on her face.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'Nella reluctantly complies', Place, 'type=charmnellaoffice4');
				AddPeopleColumnMed(md);
				findPerson("Kristin").showPerson('invite2.jpg');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmnellaoffice4") {
				// Charm in Kristin's Office
				md = WritePlaceHeader();
				this.showPerson("charm4.jpg");
				addPlaceTitle(md, "Nella Under A Charm Spell");
				
				md.write(
					'<p>Nella starts to almost ride her batton as if it were a long dildo, a slight look of defiance in her expression still. This is still playing to her fantasy of reluctant submission so you do not push that, but order her to masturbate.</p>' +
					'<p>Nella is also obviously arounsed, both from the spell and from watching Kristin, and she quickly orgasms, holding in any cries or moans as part of her play at reluctance.</p>' +
					'<p>After you can see she is your slave, just with this air of defiance and reluctance, but deep down you feel there is nothing like that, she is your slave.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'dismiss Nella and talk to Kristin more', Place);
				AddPeopleColumnMed(md);
				findPerson("Kristin").showPerson('invite1.jpg');
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (sType == "privatedance") {
			// Arranged a private dance
			md = WritePlaceHeader(false, this.isCharmedBy() ? "td-left-med" : "");
			this.showPerson(this.isCharmedBy() ? "private2.jpg" : "private1.jpg");
			addPlaceTitle(md, "Nella's Private Dance");
			
			if (this.isCharmedBy()) md.write('<p>The booth is fairly private and she asks you to sit down. Before she starts she makes it perfectly clear this is to be a <b><i>hands-on</i> performance.</p></b>');
			else md.write('<p>The booth is fairly private and she asks you to sit down. Before she starts she makes it perfectly clear this is to be a <i>hands-off</i> performance.</p>');
			md.write(
				'<p>She then gives you an erotic and up close performance. You have to admit, as a security guard, she makes an excellent exotic dancer!</p>'
			);
			if (this.isCharmedBy()) {
				md.write(
					'<p>The dance becomes more and more erotic and then an open invitation to something more intimate.</p>'
				);
			}

			startQuestions();
			addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmnelladancing1") {
			// Charm during the private dance
			md = WritePlaceHeader();
			this.showPerson("charm1.jpg");
			addPlaceTitle(md, "Nella Under A Charm Spell");
			
			md.write(
				'<p>You recite the spell but with the music and general noise you doubt Nella noticed, not that it matters. Almost immediately her dance becomes more sensual and she removes more of her clothing.</p>' +
				'<p>She moans a number of times and looks very aroused as she leans over and whispers to you,</p>' +
				'<p>"This is turning me on a lot more than usually...maybe you can touch a bit..."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'touch her', Place, 'type=charmnelladancing2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmnelladancing2") {
			// Charm during the private dance
			md = WritePlaceHeader();
			this.showPerson("charm2.jpg");
			addPlaceTitle(md, "Nella Under A Charm Spell");
			
			md.write(
				'<p>By now she is ' + (this.getDress() == "Dance1" ? 'completely' : 'almost') + ' naked and you have to admire her body. She dances and then sits on your lap and you reach out and run your hands over her lovely bottom and then breasts. She cries out as an intense orgasm crashes over her, powered by the spell and her own arousal. She gasps,</p>' +
				'<p>"Wow..I mean wow..what a...", and she gets up looking aroused and embarrassed. She continues "Sorry, I am not this sort of...I am a dancer not..well you know. I have to go". She starts to pick up her clothing giving you a marvelous look at her bottom again, but you interrupt her. It is time to steer this as you want.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"No you don\'t"', Place, 'type=charmnelladancing3');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmnelladancing3") {
			// Charm during the private dance
			AddCash(80);
			md = WritePlaceHeader();
			this.showPerson("charm3.jpg");
			addPlaceTitle(md, "Nella Under A Charm Spell");
			
			md.write(
				'<p>She stops, "What, you are going to report me?" and you can immediately feel something though the spell, and see her arousal. You try to follow up on this,</p>' +
				'<p>"Yes and if you do not do more you could lose your job, here <b>and at the bank</b>, I know Kristin very well", and you can see and feel she likes to play the part of the reluctant person, made to do things against her will.<p>' +
				'<p>Before she answers you reinforce this and the spell, but lighten up a little, implying that this <i>might</i> just be a game. Nella objects but you realise she is both playing but also she has surrendered and is now yours. Maybe she is not a slave as such, but she will do as you want, just pretending to object.<p>' +
				'<p>Here in the club is difficult to take things further with her submission, so you decide to leave it here and will have to contine this next time you meet. You will have to work out somewhere else though...</p>' +
				'<p>Just before you dismiss her, you mention the money you paid for her private dance. Nella immediately returns it to you...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'let Nella leave, <i>for now</i>', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 198 || Place == 197) {
			// Her room			
			if (sType == "nellasex") {
				md = WritePlaceHeader(false, perYou.isMaleSex() && !isExplicit() ? 'td-left-med' : '');
				this.showPersonRorX("!home-sex" + (perYou.isMaleSex() ? "b" : "g") + ".jpg");
				addPlaceTitle(md, "Playing with Nella");
				
				md.write(
					'<p>You play with Nella and her body</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'talk more to Nella', Place);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "nellabj") {
				md = WritePlaceHeader();
				if (perYou.isMaleSex())	this.showPersonRorX("home-bjb.jpg");
				else this.showPersonRandom("!home-bjg", 2);
				addPlaceTitle(md, "Playing with Nella's Mouth");
				
				md.write(
					'<p>You play with Nella\'s mouth</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'talk more to Nella', Place);
				WritePlaceFooter(md);
				return true;			
			}			
			if (sType == "nellavictoriaplay") {
				md = WritePlaceHeader();
				this.showPersonRandom("!nellavictoriales-", 2);
				addPlaceTitle(md, "Victoria and Nella");
				
				md.write(
					'<p>You call in Victoria to play with Nella while you watch.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'talk more to Nella', Place);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "nellavictoriathreesome") {
				md = WritePlaceHeader();
				if (perYou.isMaleSex())	this.showPerson("!nellavictoriathree-b.jpg");
				else if (!isExplicit()) this.showPerson("!nellavictoriathree-g.jpg");
				else this.showPersonRandomX("!nellavictoriathree-g", 2);
				addPlaceTitle(md, "Threesome with Victoria and Nella");
				
				md.write(
					'<p>You call in Victoria to play with Nella and yourself.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk more to Nella', Place);
				WritePlaceFooter(md);
				return true;			
			}	
		}
		
		if (Place != 197) return false;
		
		if (sType == "bondageplaynella") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("play0.jpg");
			addPlaceTitle(md, "Victoria and Nella");
			this.setFlag(14);
			md.write(
				'<p>Victoria makes a call to Nella and you hear her invite Nella over. She then asks you to wait in her bedroom while she prepares and and warn Nella that they would have and audience.</p>' +
				'<p>You wait for a little while, no more than 30 minutes later and hear a call to come in.</p>' +
				'<p>In front of you are two bound women, Victoria and Nella naked aside from panties, collar and armbinders. You have to wonder how they managed to both get bound this way, though you see some of Victoria\'s bindings seem looser than Nella\'s so you step over and adjust them. Victoria says,</p>' +
				'<p>"Thank you ' + perYou.getMaster() + ', allow me to introduce to you Slave Nella"</p>' +
				'<p>Nella looks at her and says "Vicky, I thought we were doing the \'home invasion\' thing tonight? I know you like domination/submission play but you know I like \'reluctance\' play, where we are helplessly awaiting them and the promise or threat of being forced into perverted things"<p>' +
				'<p>She then tells you "Sorry we seem to have got our wires, or leather straps in this case, crossed! Untie us and we will do this another time"</p>' +
				'<p>Vicky..that is Victoria looks at you, "' + perYou.getMaster() + ' when you are ready, she is yours". Nella looks at her a but frustrated.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'enjoy the sight, untie Victoria and leave', 194);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "bondageplaynellacharmed") {
			md = WritePlaceHeader();
			this.showPerson("play1.jpg");
			addPlaceTitle(md, "Victoria and Nella");
			this.setFlag(14);
			md.write('<p>Victoria calls Nella in to join her, but asks you to wait in her bedroom for a little as they plan things. A little while later they call you in.</p>');
			switch (this.getDress()) {
				case 'Bondage1': 
					md.write(
						'<p></p>'
					);
					break;
				case 'Bondage2': 
					md.write(
						'<p></p>'
					);
					break;
				case 'Bondage3': 
					md.write(
						'<p></p>'
					);
					break;
			}
			startQuestions();
			addLinkToPlaceC(md, 'enjoy the sight, untie Victoria and Nella', Place);
			WritePlaceFooter(md);
			return true;			
		}		
		
		if (sType == "charmnellabondage1") {
			// Charm during bondage play
			md = WritePlaceHeader();
			this.showPerson("play1.jpg");
			addPlaceTitle(md, "Nella Under A Charm Spell");
			
			md.write(
				'<p>To Nella it sounds like you are playing along with the bondage game they are playing but what you say is the literal truth</p>' +
				'<p>"I am a powerful ' + perYou.getWitch(true) + ' and I am going to use my magic to corrupt your mind and body, making you into a sex-obsessed servant and slave", and you recite the charm spell. Nella plays along with the game that is also the truth,</p>' +
				'<p>"No, you cannot do that, you cannot use my helpless body and use you evil sorceries on me", she struggles in her binds in a very sensual and plain erotic fashion. Victoria writhes, enjoying her bondage and explains to Nella,</p>' +
				'<p>"' + perYou.getMaster() + ' has already enspelled me and made me into ' + perYou.getHisHer() + ' loyal servant and slave, ' + perYou.getHisHer() + ' willing plaything and ' + (perYou.isMaleSex() ? 'cock-sleeve' : 'pussy-licker') + '"</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'praise Victoria', Place, 'type=charmnellabondage2');
			WritePlaceFooter(md);
			return true;			
		}
		if (sType == "charmnellabondage2") {
			// Charm during bondage play
			md = WritePlaceHeader();
			this.showPerson("play2.jpg");
			addPlaceTitle(md, "Nella Under A Charm Spell");
			
			md.write(
				'<p>You praise Victoria as a loyal slave and servant and she bows deeply still bound and looking anxiously at you. Nella is kneeling, looking at you, he spell is definitely affecting her. She tells you, still playing along but also speaking the truth,</p>' +
				'<p>"You are not my ' + perYou.getMaster() + ' I will fight, but your magics are so powerful, I can feel the arousal flooding through my body. Vicky help me to resist...". Victoria answers simply,</p>' +
				'<p>"Do not resist, accept ' + perYou.getMaster() + ' and join me as ' + perYou.getHisHer() + ' personal sex-toy". You can see some of Nella\'s words here are her game of reluctant submission, but some of it is mixed with the effects of the spell.</p>' +
				'<p>It is time to end this, and you tell Nella...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"My magic is too powerful, you are mine"', Place, 'type=charmnellabondage3');
			WritePlaceFooter(md);
			return true;			
		}
		if (sType == "charmnellabondage3") {
			// Charm during bondage play
			md = WritePlaceHeader();
			this.showPerson("play3.jpg");
			addPlaceTitle(md, "Nella Under A Charm Spell");
			
			md.write(
				'<p>You do not know if Nella is playing the game or acually submitting, you doubt there really is a difference now. She positions herself behind Victoria and they both bow. Nella says,</p>' +
				'<p>"I will never submit but your magic is too powerful, I cannot resist and have to do anything you want". You see her whisper to Victoria, "Wow this is such turn-on we have to play this more often" and you hear Victoria reply, "Always and forever"</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'take both Victoria and Nella', Place, 'type=nellavictoriathreesome');
			addLinkToPlaceC(md, 'talk more to Victoria', Place);
			WritePlaceFooter(md);
			return true;			
		}		
		
		return false;
	};	
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.setFlag(8);
		this.showPerson(this.isCharmedBy() ? "charm1.jpg" : "dance1.jpg");
		addPlaceTitle(md, "\"Jana's\" Dance");
		switch (this.other) {
			case 1:
				md.write(
					'<p>Nella takes the stage dressed in a silver top and pants, very disco and very attractive!</p>' +
					'<p>Nella is a very experienced dancer, erotic and entertaining as she dances and strips, as her performance is definitely a strip-tease than an athletic pole-dance.!</p>'
				);
				break;
			case 2:
				md.write(
					'<p>Nella takes the stage dressed in a silver top and pants, very disco and very attractive!</p>' +
					'<p>Nella is a very experienced dancer, erotic and entertaining as she dances and strips, as her performance is definitely a strip-tease than an athletic pole-dance.!</p>'
				);
				break;
			case 3:
				md.write(
					'<p>Nella takes the stage dressed in a silver top and pants, very disco and very attractive!</p>' +
					'<p>Nella is a very experienced dancer, erotic and entertaining as she dances and strips, as her performance is definitely a strip-tease than an athletic pole-dance.!</p>'
				);
				break;
			case 4:
				md.write(
					'<p>Nella takes the stage dressed in a silver top and pants, very disco and very attractive!</p>' +
					'<p>Nella is a very experienced dancer, erotic and entertaining as she dances and strips, as her performance is definitely a strip-tease than an athletic pole-dance.!</p>'
				);
				break;
			case 5:
				md.write(
					'<p>Nella takes the stage dressed in a silver top and pants, very disco and very attractive!</p>' +
					'<p>Nella is a very experienced dancer, erotic and entertaining as she dances and strips, as her performance is definitely a strip-tease than an athletic pole-dance.!</p>'
				);
				break;
		}
		if (!this.isCharmedBy()) md.write('<p>After the performance you ask her to join you...</p>');
		startQuestions();
		if (!this.isCharmedBy()) {
			if (perYou.getCashOnHand() >= 80) addLinkToPlaceC(md, 'ask her for a private dance', Place, 'type=privatedance&who=' + this.uid, 'She tells you it will cost ' + sCurrency + '80, and you hand it over. She leads you to a private booth', '', 'AddCash(-80)');
			else addLinkToPlaceC(md, 'ask her for a private dance', Place, '', 'She tells you it will cost ' + sCurrency + '80, but you do not have enough. She smiles and leaves');
		} else addLinkToPlaceC(md, 'ask her for a private dance', Place, 'type=privatedance&who=' + this.uid, 'She tells you it free for you, and leads you to a private booth');
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (!this.checkFlag(1) || sType !== "") return;
		var d;
		if (Place == 224 || Place == 430) {
			// Questions for Kristin
			if (!isPersonHere("Kristin")) return;	// Probably unnecessary but just to be sure
			if (!this.checkFlag(3)) addQuestionC(md, 'ask Kristin about the security guard', "Kristin", 9901);
		}
		if (Place == 224 && this.checkFlag(3) && isCharmedBy("Kristin") && !this.isCharmedBy() && this.whereNow() == 225) addLinkToPlaceC(md, 'ask Kristin to invite in the security guard Nella', Place, 'type=invitenella');
		else if (Place == 225 || Place == 422) {
			// Questions for Ellie
			if (!isPersonHere("Ellie") || !isCharmedBy("Ellie")) return;
			if (!this.checkFlag(4)) addQuestionC(md, 'ask Ellie about the security guard', "Ellie", 9902);
		}
		else if (Place == 197) {
			// Questions for Victoria
			if (!this.checkFlag(5)) {
				if (isShopOpen(0)) {
					if (!this.checkFlag(9)) addQuestionC(md, 'ask Victoria about ' + (this.checkFlag(2) ? 'Nella' : 'the security guard'), "Victoria", 9903);
				} else {
					var perV = findPerson("Victoria");
					addPopupLinkC(md, 'ask Victoria about ' + (this.checkFlag(2) ? 'Nella' : 'the security guard'), "Victoria's Hobby",
						"<p>" + perV.addPersonString("bondageplay1a.jpg", "height:max%", "right") +
						'You ask Victoria about ' + (this.checkFlag(2) ? 'Nella' : 'the security guard') +
						(this.checkFlag(9) ? ' again. Victoria explains, "Please excuse me ' + perYou.getMaster() + ' there is more I can tell you, but it is complicated and will require some time to explain and demonstrate"' :
							'“Yes, Nella the security guard...I know her quite well, we are...friends."</p>' +
							'<p>Victoria looks uncharacteristically flustered, and you could swear she blushes. Before you can ask her why she continues,</p>' +
							'<p>"She also works as a dancer most nights of the week, friday to sunday, at that strip-club in town...Please excuse me ' + perYou.getMaster() + ' there is more I can tell you, but it is complicated and will require some time to explain and demonstrate"'
						) + 
						' She asks you to wait here and steps into her bedroom.</p><p>A while later Victoria calls for you to join her, and you go to her, and you see she has hadcuffed herself to a chain from the roof and her feet are also bound. She is smiling and explains,</p>' +
						'<p>"' + perYou.getMaster() + ', my previous Master had a taste for binding me before doing other things of a sexual nature. Over time I found I also enjoyed the experience, so much so that when I met Nella we discovered our mutual like of domination and submission play. Please check my phone on the table over there, it is not locked."</p>' +
						addOptionLink("string", 'check the phone', "dispPlace(Place,'type=checkthephone')", "chatblock", "width:50%;margin-left:10%"),
						true, '', true
					);
				}
			} else if (!isShopOpen(0) && !this.checkFlag(10)) {
				d = Math.floor(nTime / 288) % 7;
				if ((getHour() < 8 || getHour() > 22) && (d === 0 || d > 4)) addLinkToPlaceC(md, 'ask Victoria to arrange to play with Nella', Place, '', 'Victoria calls Nella but she says Nella is not free at the moment, she is doing her evening job as an exotic dancer.');
				else addLinkToPlaceC(md, 'ask Victoria to arrange to play with Nella', Place, this.isCharmedBy() ? 'type=bondageplaynellacharmed': 'type=bondageplaynella');
				if (this.checkFlag(15) && this.whereNow() == 198) addLinkToPlace(md, "go to Nella's room", 198);
			}
		} else if (Place == 198 && this.isHere()) {
			addLinkToPlace(md, 'play with Nella\'s body', Place, 'type=nellasex');
			addLinkToPlace(md, 'play with Nella\'s mouth', Place, 'type=nellabj');
			addLinkToPlace(md, 'have Victoria play with Nella', Place, 'type=nellavictoriaplay');
			addLinkToPlace(md, 'play with both Victoria and Nella', Place, 'type=nellavictoriathreesome');
			this.addSleepLink(md, "go to bed for the night with Nella", "Going to bed with Nella",
				'<p style="position:absolute;left:15%;top:6%;cursor:pointer;font-size:1.1em;width:75%;color:white">You notice that night has fallen, and tell Nella that you will spend the night with her.</p>',
				Math.random() < 0.5 ? 'bed1.jpg' : 'bed2.jpg'
			);	
		}
		else if (Place == 282 && this.checkFlag(6) && !this.checkFlag(7)) addQuestionC(md, 'ask about Nella', "Misc", 9950);
		else if (Place == 282 && this.checkFlag(7) && !this.checkFlag(8)) {
			d = Math.floor(nTime / 288) % 7;
			if ((getHour() < 8 && d === 0 || d > 4) || (getHour() > 21 && d > 3)) addLinkToPlace(md, "wait for \"Jana's\" dance", 282, 'type=clubdancing&who=' + this.uid, '', '', 'passTimeMidnight(false,1)');
		}

	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{		
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// Bank
			if (Place == 225 && this.isHere()) {
				// On duty
				addComments("You can't cast that here. Look at all the cameras!");
				if (isSpellKnown("Shielded Charm")) {
					// know shielded Charm
					addComments(' Even with the Shielded Charm it would be most unwise to try and charm someone in a place like this.');
				}
				if (!this.isCharmedBy()) addComments(' You will have to try this on the security guard somewhere else.');
				setPersonFlag("Kristin", 8);
				return "handled";
			}
			// Bank, Kristin's Office
			if (Place == 224 && this.isHere()) {
				CastCharmSpell("Nella", Place, 1, "type=charmnellaoffice1");		//Charm Nella
				return "handled";
			}
			// Club while dancing
			if (Place == 282 && sType == "clubdancing") {
				if (sWho == this.uid) {
					addComments("In the middle of her dance, while everyone is watching? Not a good idea!");
					return "handled";					
				}
			}
			if (Place == 282 && sType == "privatedance") {
				if (sWho == this.uid) {
					CastCharmSpell("Nella", Place, 1, "type=charmnelladancing1");		// Charm Nella
					return "handled";
				}
			}	
			// Victoria's place
			if (Place == 197 && sType == "bondageplaynella") {
				CastCharmSpell("Nella", Place, 1, "type=charmnellabondage1");		// Charm Nella
				return "handled";
			}
		}

		return "";		// do nothing
	};
	
	// Phone calls
	per.isPhoneable = function() {
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.isCharmedBy();
	};

	per.callThem = function()
	{
		if (Place == 269) {
			// Time for a swim
			if (this.whereNow() == 225) WriteComments("You call Nella to invite her to join you at the pool for a swim, but she replies, \"Sorry " + perYou.getMaster() + " I am on duty. I cannot take time off, after work certainly but not now!\". She apologies and promises to another time. ");
			else {
				gotoPlace(Place, 'type=nellapool');
				receiveCall('', 'You call Nella to invite her to join you at the pool for a swim, and she happily agrees.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};
	
	per.addPersonPhoneCall = function() {
		if (!this.isCharmedBy()) return false;		// Only sent when she is your personal assistant
		if (this.checkFlag(14) && !this.checkFlag(15) && isMorning()) {
			if (makeCall(true, 341)) this.setFlag(15);
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		if (id == 340) return receiveSMS('', '', 'sms1.jpg');
		if (id == 341) return receiveSMS('Victoria', perYou.getMaster() + ' I was talking with Nella and we have decided she will move into my spare bedroom, so we can both be available to serve you whenever you need', 'sms2.jpg');
		return '';
	};
}
