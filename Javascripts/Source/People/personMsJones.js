/************************************
Ms Jones
************************************/
function RepliesMsJones(nR)
{
	//var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();
	var sMaster = perYou.isMaleSex() ? 'mon Maître' : 'ma Maîtresse';

	if (nR == 1001)
	{
		setPersonOther("Anita", 101);
		addComments('"I am szorry, ' + myName + '. I have not zeen Zzhis \'Anita\'. Why do you ask?"<br>');
	}
	if (nR == 4600)
	{
		addComments('"Magic stones? You should ask zee Monsier Beasley, he knows about zuch things."<br>');
	}
	else if (nR == 1406)
	{
		setBeasleyServant(7);
		addComments('"I do not know. Monsieur Beasley is usually in school but sometimes he visits zee library. Perhaps you could try there."<br>');
	}
	else if (nR == 2000)
	{
		//ask her about her eagerness to serve
		per.other = 1;
		addComments(
			'"I think it was after I was freed from my... third or fourth owner?” She ponders. “I realized that there was no escape from it, as I could not leave the area around the gate and those with magic would always be drawn to me. Not to mention that I had come to... quite enjoy the sensation of being charmed." She pulls in her lower lip briefly.</p>' +
			'<p>"So, I decided that if I am destined to always be someones slave, I may as well enjoy myself and devoted my very being to stand out of the crowd and be the best Slave I could be, picking up skills where I could when I was free and convincing many of my owners to train me further."</p>' +
			'<p>She focuses on you. “I take pride in what I am and that I am good at it. I want to be the best servant I can be and help you be the best ' + perYou.getMaster() + ' you can be.”</p>' +
			'<p>There is an unusually serious look in her charmed eyes, and you get a sense of noble determination from your slave, at least for a few seconds, before she suddenly starts to laugh playfully.</p>' +
			'<p>"But please remember, I also want to provide you with sex, lots of it. It\'s been far too long and don\'t think I have nearly exhausted my repertoire by now, my ' + perYou.getMaster() + '."'
		);
	}
	else if (nR == 2001)
	{
		//ask her about the accent
		per.other = 2;
		addComments(
			'"Do you like it, ' + sMaster + '?" She asks with a laughter. "Every few years, I need to come up with a new look and identity, so people don\'t grow suspicious about my eternal youth. This decenium, I have decided to be Emmanuelle Félicitas Jones from beautiful France, who had come to ' + (isBritish() ? 'Angleterre' : 'Amérique') + ' to work as a maid for a few years and ended up teaching French at Glenvalle Grammar.</p>' +
			'<p>"Still have the old uniform, by the way.” She winks to you.'
		);
	}
	else if (nR == 2002)
	{
		//ask what she knows about Davy Robbins
		per.other = 3;
		addComments(
			'“I believe he has a huge ego, a larger sense of entitlement and a lot of newfound power, which is a dangerous combination." She explains in a serious tone. "He pretty much tried to charm me the day he found out about his magic powers, and when he realized I was somewhat claimed and thus protected at the time, he ran away in a  panic and has been avoiding me ever since."</p>' +
			'<p>"It is going to wreak havoc on his grades.” She adds matter of factly, then looks at you with a smile.</p>' +
			'<p>"I am so very thankful that you claimed me before he or Beasley had a chance to undo my protection, my ' + perYou.getMaster() + ', I\'d much rather be your little fucktoy then his."'
		);
	}
	else if (nR == 2003)
	{
		//<Ask about who had charmed her, if not Davy>
		per.other = 4;
		addComments(
			'"He was the son of  wealthy family from abroad, my ' + perYou.getMaster() + '. A warlock with innate magical power similar to the Robins boy, maybe even related to the same bloodline.” She seems hesitant to speak on, the memory clearly painful. “I loved him, deeply, not only because of the charm. He radiated power and potential and I was determined to help him realize it, but he was also greedy and petty, always looking for more of everything, never willing to appreciate what he had and always ranting about “someone powerful” guiding him to his destiny as the ruler of this town, no, the entire country!" She puts a mocking emphasis on the last bit.</p>' +
			'<p>"He even declared himself a divine being and formed a small cult around his person."'
		);
	}
	else if (nR == 2004)
	{
		//<I think I have seen newspaper clippings of this, the police just put it off as a depraved sexcult which dispersed after the leader died of drug overdose... wait, you were part of that?>
		per.other = 5;
		addComments(
			'"One of his enforcers and personal concubines, my ' + perYou.getMaster() + '." She says with pride, then chuckles bitterly. "And no, while plenty of drugs and orgies were part of his Cult, he “died” when he attempted an old ritual he found the gods know where that heavily damaged his very soul but kept the tether binding me intact. He is comatose and his Parents have moved away to care for him, but I know he will never wake up again"'
		);
	}
	else if (nR == 2005)
	{
		//<Why would he do that?>
		per.other = 6;
		addComments(
			'"The ritual promised power to a greedy man who only surrounded himself with people who were magically compelled to encourage and adore him. Thanks to his Harem, he thought himself infallible, and it cost him dearly."</p>' +
			'<p>She looks deep into your eyes after finishing, and you can practically feel the strands of mana binding her shiver.</p>' +
			'<p>"Do not repeat his mistake, my ' + perYou.getMaster() + ', I would hate to loose you that way, too."</p>' +
			'<p>The shivering stops, and you see the happy, adoring expression return to her. "Or be bound to someone for a small eternity with no chance of having sex with him, that was seriously the worst."</p>'
		);
	}
	else if (nR == 2100)
	{
		//<ask about Miss Logan>
		per.setFlag(6);
		addComments(
			'"We had a brief affair shortly after she had joined the school staff. Did you know she was actually rather shy and timid back then?"</p>' +
			'<p>She smiles wistfully as she speaks. "It was nothing too serious, but I enjoy teaching, she had been very eager to learn and I would not mind to be allowed to reminisce with her about old times, now that she is practically part of the family."'
		);
	}
	else if (nR == 2200)
	{
		//<ask about Mrs Tanika
		per.setFlag(8);
		addComments(
			'“It was actually not as bad as one might think, but she was constantly in my back, telling me to dress more proper, stop flirting, rebuke the advances of colleagues and students faster, not sit on the tables and generally be less.... me.”</p>' +
			'She breathes out a sigh, then smiles to you. “But now that we have found common ground in our devotion to you, my ' + perYou.getMaster() + ', we can both finally be as we are and leave our differences behind, maybe even get to know each other a little better.”'
		);
	}
	else if (nR == 3000)
	{
		//<ask about moving the ghost>
		setPersonFlag("Ghost", 10);
		addComments(
			'You ask Ms. Jones about ghosts and what keeps them tied to a particular place, and if they can move from that place,</p>' +
			'<p>"Well that is an odd question ' + perYou.getMaster() + ' are you having problems with a spirit, they are almost always harmless, unless you are in a Place of Power. Or do you know a particularly cute one?"</p>' +
			'<p>She smiles a bit mischievously, "No don\'t tell me let me fantasise about it. But it is simple, as long as you have a magical tie to them. Either an item of personal importance or a magical binding or a link of other sort. If you do, take them by the hand, and lead them wherever you desire and keep them there until dawn. The following night they will be there again and will stay there. In some cases you may need to repeat, but mostly they will stay."'
		);
	}
	return true;
}


// Initialise
function initialiseMsJones()
{
	// Ms Jones
	addPerson("Ms. Jones", 0, "MsJones", 'Black', false);
	per.Replies = RepliesMsJones;
	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		if (!this.isCharmedBy())
			return this.addPersonString("jones1a.jpg", "height:max%", "right") +
				"Ms. Jones has an office in one of the older parts of the school, and when you enter the room you see Ms. Jones sitting on her desk. It is strange how often you see Ms. Jones doing something...eccentric. It is not that she is a playful free-spirit, just that she is a little odd. Odd, but very sensual who borderline flirts with her students to get them to pay attention and work harder. Well something is certainly <i>harder</i> for her." +
				"<br><br>" +
				"The other distinct thing about her is her French accent, some would say outrageous and over the top, others cute and sensual. One time your friend Amy mentioned she had gone on a holiday to France with her family, and people there did not speak how Ms. Jones does. Then again there are many regional dialects and accents in France from what you have looked up." +
				"<br><br>" +
				"You wonder how easily you could learn French if she would be devoted to you. She could even give you private lessons and could tutor you. If her over attached and too playful character would not drive you mad of course because she can be a little bit annoying at times. It depends solely on what you want to do with her.";
		else
			return this.addPersonString("jones1c.jpg", "height:max%", "right") + 
				"Ms Jones, formerly known to be an eccentric french teacher with an exaggerated accent, is now your devoted slave. An over 400 Year old slave, bound to something she calls “the gate”and maintaining an extensive knowledge of History, Linguistics, Firearms, Martial Arts and the occult which is only eclipsed by her almost scary expertise with even the most obscure aspects of sexuality and her eagerness to apply it.<br><br>" +
				"You know the majority of people under your charm spell are barely able to keep their hands off you or even themselves for long most of the time when you are around, yet, Ms Jones now carries herself with a refined sense of purpose and discipline while still oozing barely constrained passion and desire just waiting to break through on your command.<br><br>" +
				"Over time, you have come to realize that despite being fully devoted to you and your needs, she has managed to never neglect her other duties, diligently tending to her classes and taking the time to keep her own skills sharp. She even insists on providing private lessons in actual French to you, despite your grades being pretty much safe now, and while most of them ether end or start with both of you naked on various furniture, you do find your grasp of the language vastly improving, as well as other skills.<br><br>" +
				"She had been claimed by several of the Witches and Warlocks drawn here by the gate in the past centuries, and you have begun to wonder if she will remember you as just another footnote in her long line of masters and mistresses, or something more.";
	};
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		return this.isCharmedBy() ? "Ms Jones, your Slave" : "Ms Jones, French Teacher";
	};
	
	per.getPossessionFace = function() { return "!jones-face"; };
	
	per.whereNow = function() {
		if (!isShopOpen(2)) return 0;
		return this.place;
	};
	
	per.passTimeDay = function() {
		if (this.checkFlag(19)) {
			if (isWeekDay()) {
				if (this.dress == "White") this.dress = "Black";
				else this.dress = "White";
			}
		} else if (getCharmedLevel("MissLogan") == 1) {
			// Partial charm of Miss Logan
			if (per.other === 9) this.dress = "White";
		} else if (per.getCharmedLevel() > 1) {
			if (this.isCharmedBy()) this.setFlag(19);
		}
		return '';
	};

	per.showEventPopup = function()
	{
		// Futa reaction
		if (sType == "proveexperience" && !this.checkFlag(18) && perYou.isFuta(true) && !perYou.isBornMale()) {
			this.setFlag(18);
			showPopupWindow("Ms. Jones and Your Changes",
				this.addPersonString("jones8b.jpg", "height:max%", "right") +
				'"Oh!" Miss Jones looks at you in surprise as you unwrap your new cock. "I did not know that you had learned Al Mass. That spell is was thought to have been lost."</p>' +
				'<p>You ask if many of her former Masters knew it, and she shakes her head.</p>' +
				'<p>"Some did, but as a soul bound to a gemstone is needed to power it, and the inquisition heavily persecuted those who created such trinkets and burned every record of the practice, none of them had the means to actually use it.</p>' +
				'<p>You try to explain where you have the stone from, but Ms. Jones interrupts you.</p>' +
				'<p>"No need to explain anything to me, my Mistress, but know that even a bound soul still harbors the will to be free, and if you rely on its power too much, the cage holding it may well break down."</p>' +
				'<p>"Of course, that does not mean you should not have fun with your abilities. Just be mindful of the dangers and always remember to practice moderation where applicable."'
			);
			return true;
		}	
		
		if (sType !== "") return false;

		if (Place == 72 && !this.checkFlag(11) && isShopOpen(2) && this.isHere()) {
			showPopupWindow("Ms Jones",
				this.addPersonString("!jones14.jpg", "height:max%", "right") +
				'Miss Emanuelle-Felicitas Jones, your french teacher, has been using the teachers lounge for the last few weeks while her own office is undergoing renovations. She had one of the spare desks moved into the room, so it is no surprise that you find her sorting through her students homework as you enter it.</p>' +
				'<p>Ms Jones is a very sensual but also rather odd teacher, who borderline flirts with her students, both male and female, to get them to pay attention and work harder.</p>' +
				'<p>Her outfits are usually about as revealing as she is able to get away with as a teacher and you remember how a group of parents once tried to get her expelled for it.</p>' +
				'<p>She is always speaking in a thick, french accent somewhere between playfully sensual and outrageously over the top, and your friend Amy, who once spend a family vacation in France, claims no one there spoke the way Ms. Jones does. Then again, you know that there are many regional accents to be taken into account.</p>' +
				'<p>The students in your class love to come up with wild theories about her being a foreign spy, a stripper trying to turn over a new leaf or even an undercover cop, but there is one thing they all agree on: She has an amazing body.</p>' +
				'<p>You have often fantasized about what it would be like get “private lessons” from her, and now that you have learned the Dai Chu, it is hard to resist the temptation to make these fantasies come true.'
			);
			this.setFlag(11);
			return true;
		}
		if (isShopOpen(2) && !this.checkFlag(2) && Place == 145 && this.isHere()) {
			// Introduction
			this.setFlag(2);
			if (!this.checkFlag(11)) this.showPersonInfo(mdCache);
			else {
				showPopupWindow("Ms Jones",
					this.addPersonString("!jones14.jpg", "height:max%", "right") +
					'You find Ms. Jones in her office in one of the older parts of the school, and when you enter the room you see her sitting on her desk.</p>' +
					'<p>It is strange how often you see that woman doing something...eccentric. It is not that she is a playful free-spirit, just that she is a little odd.</p>' +
					'<p>At least she is one of the very few teachers who is always happy to meet her students, even after classes, and she welcomes you with a warm smile, asking if you need any help in her usual over the top accent.'
				);				
			}
			return true;
		}
		if (Place == 145 && !this.checkFlag(5) && this.hoursCharmed() > 8 && getCharmedLevel("MissLogan") > 1 && this.isHere()) {
			showPopupWindow("Ms Jones knows...",
				this.addPersonString("jones1a.jpg", "height:max%", "right") +
				'“' + perYou.getMaster() + '!” As per usual, Ms. Jones falls onto one knee and lowers her head the moment you enter her classroom.</p>' +
				'<p>“I trust Miss Logan is still expertly skilled in the art of ' + (perYou.isMaleSex() ? 'sucking cocks' : 'licking pussies') + '?”</p>' +
				'<p>You are a little taken aback by the directness of her question, but have to admit to her that she, coarse language aside, is indeed correct about her assumption.</p>' +
				'<p>“Wonderful! I assure you that she will be one of your most delightful playthings, and if you are so inclined....” She looks up to you with a cheeky wink.”You may always thank me later.”</p>'
			);
			this.setFlag(5);
			this.extra[0] = nTime;
			return true;
		}
		if (Place == 145 && !this.checkFlag(7) && this.hoursCharmed() > 8 && isCharmedBy("MrsTanika") && this.isHere()) {
			showPopupWindow("Ms Jones knows...",
				this.addPersonString("jones4a.jpg", "height:max%", "right") +
				'Ms Jones looks excited as you enter her classroom, cheerfully following her usual ritual and getting down on one knee to greet you.<br><br>' +
				'“I have noticed you have taken Susan into the fold, a marvelous decision, my ' + perYou.getMaster() + '.”<br><br>' +
				'You caress her cheek, telling her how you are glad that she approves, but ask why it gets her so exited. A question your slave happily answers:<br><br>' +
				'“She is -much- easier to work with now.” She kisses your hand and rises to her feet. “She always had such a huge stick up that sexy ass of hers and definitely needed a little bit of attitude adjustment. In Fact...” She smashes her ruler into the palm of her hand with a wide grin. “If you allow me, I would -love- to help you with that. There is -much- I could teach her and I bet she has no idea how to properly use that barbed tongue of hers.”'
			);
			this.setFlag(7);
			return false;
		}
	};

	per.showEvent = function()
	{
		var md;
		var clv;
		var perLeanne;
		
		if (sType == "msjonespool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("jones-pool.jpg");
			addPlaceTitle(md, "Swimming with Ms. Jones");
			md.write(
				'<p>Ms. Jones arrives and changes into her bikini, ready to serve you in any way you wish!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'she is certainly willing to do more..', Place, 'type=msjonespoolsex');
			addLinkToPlaceC(md, 'say goodbye to Ms. Jones', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "msjonespoolsex") {
			md = WritePlaceHeader(false, 'td-left-large');
			if (isExplicit() && perYou.isMaleSex()) this.showPersonX("!jones-pool-sex.jpg");
			else this.showPerson("!jones-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Ms. Jones");
			md.write(
				'<p>You ask your teacher to play with you more privately, and she seductively removes most of her swimsuit and lies back waiting for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Ms. Jones', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 234 && sType == "msjonesneuro") {
			md = WritePlaceHeader();
			this.showPerson("!loganneuro1.jpg");
			this.dress = "White";
			this.setFlag(19);
			addPlaceTitle(md, "Ms. Jones\'s Help");
			md.write(
				'<p>Ms. Jones walks up to Miss. Logan who does not immediately notice her. Ms. Jones tells her while gently lifting Mis.. Logan\'s chin to make her look up,</p>' +
				'<p>"Naughty, naughty professeure, what are ze looking at in class. Are ze looking at somezing moi whould not look at, or your would show your students?"</p>' +
				'<p>Miss Logan looks very embarrassed and denies doing anything inappropriate, saying she was just reviewing course details, but everyone can tell she is lying. Ms. Jones takes the tablet from her hands with little resistance, and looks at the screen, swiping a few times,</p>' +
				'<p>"Really, zis is for your course, I did not know your taught ze étudiant here about pornographie..." and she hands you the tablet. She continues to tease Miss. Logan, giving you time to check the tablet. Miss Logan tries to deny,</p>' +
				'<p>"This is all about anatomy and the psychology of sexuality", Ms Jones chuckles, "Ze thoughts of fucking you mean"...</p>'
			);
			startQuestions();
			addLinkToPlace(md, "check what Miss. Logan is looking at while they talk", Place, 'type=checktablet1');
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place != 145) return false;
		
		if (this.checkFlag(3) && !this.checkFlag(4)) {

			// Meeting about the vampyre
			this.setFlag(4);
			md = WritePlaceHeader();
			var perV = findPerson("Vampyre");

			this.showPerson("jones11.jpg");
			// Is the vampye here?
			if (perV.isHere()) {
				// Yes!
				addPlaceTitle(md, "Ms. Jones and the Vampyre");
				perV.showPerson("vamp11b.jpg", "25%", "right");

				md.write(
					'<p>You walk into the classroom, silently followed by the vampyre. You almost feel it as the vampyre suddenly moves to one side. The as you look to see what is happening you see Ms. Jones leap to her feet holding a ruler as a weapon, as a wooden stake!</p>' +
					'<p>The vampyre looks ready to attack, and the way Ms. Jones looks you would say she is perfectly ready and able to defend herself! You have to stop whatever is happening and call out,</p>' +
					'<p>"Stop this now!", but for a long moment nothing happens, and then the vampyre steps to your side. Ms. Jones sits on her desk, but you can see both seem to be ready to attack or defend at a moments notice, so it is more a cease fire than a truce. You demand Ms. Jones explain,</p>' +
					'<p>"Yes ' + perYou.getMaster() + ', I felt the gate open, the one the demon created all those years ago that I...witnessed. Things passed though and the power of the gate would have revived others. I wanted to warn you to avoid places of power like the Sacred Clearing as those creatures will be drawn there, but I see you have found one of those beings. Is it under your control?..."</p>' +
					'<p>The vampyre interrupts, "Demon Bitch! I am controlled by no-one, this ' + perYou.getWitch() + ' is my plaything, they think I am under their spell...What are you still doing here, I slew you 300 years ago"</p>' +
					'<p>Ms. Jones looks at you, "This thing does not have the power to slay me, and like all of it\'s kind lies whenever it speaks. It is a powerful slave for you ' + perYou.getMaster() + ' take care not to feed it too much or it may overcome your <b>control</b>!"</p>' +
					'</p>You decide you had better separate these two as quickly as possible. You had forgotten how Ms. Jones has described how she was a warrior in the past, and this has shown she is very capable in that way. You thank her for her warning, but as you do you see the venomous gaze of the vampyre on her, and</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'chastise Ms. Jones, the vampyre is a \'she\' and a powerful ally', 70, '', 'Ms. Jones apologises and says she will call the thing a she in future. The vampyre almost hisses, but follows you out of the classroom, with a slight smile on her lips', '', "setPersonOther('Vampyre',getPersonOther('Vampyre',1) + 1, 1)");
				addLinkToPlaceO(md, 'order the vampyre to never attack without your command', 70, '', 'The vampyre says nothing as she follows you out of the classroom, you think a sign she has agreed.', '', "setPersonOther('Vampyre',getPersonOther('Vampyre',1) + 5, 1)");

			} else {
				// You waited for the daytime, simpler version
				addPlaceTitle(md, "Ms. Jones on the Vampyre");

				md.write(
					'<p>Ms. Jones is waiting for you in the classroom, uncharacteristically serious looking. You ask what she wanted to talk to you about,</p>' +
					'<p>' + perYou.getMaster() + ', I felt the gate open, the one the demon created all those years ago that was in my body. Things passed though and the power of the gate would have revived others. I wanted to warn you to avoid places of power like the Sacred Clearing as those creatures will be drawn there. Take care some creatures will of wakened from long slumbers and be a threat to you."</p>' +
					'<p>You consider mentioning the vampyre to her, but reconsider, it is just an odd feeling you are getting from her. She continues,</p>' +
					'<p>"' + perYou.getMaster() + ' I have been extensively trained in the ways of a warrior, my body is trained for more than sex, I keep fit for combat as well as love. If you need protection call upon me at any time!"</p>' +
					'<p>You remember how she had mentioned about being a warrior previously when you first charmed her, and thank her for her warnings and offer of protection.</p>'
				);
				startQuestions();
				if (isPlaceKnown("AnitasLair")) addLinkToPlace(md, 'visit Anita\'s hiding place', 252);
				addLinkToPlace(md, 'exit the office', 70);
			}
			WritePlaceFooter(md);
			return true;

		} else if (sType == "askleanne") {
			perLeanne = findPerson("Leanne");
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			if (clv > 0) this.showPerson("jones10b.jpg");
			else this.showPerson("jones10a.jpg");
			addPlaceTitle(md, perLeanne.checkFlag(9) ? "Asking the High Priestess" : "Asking Ms. Jones");
			md.write('<p>You ask Ms. Jones about demons and the nature of how they enslave people.');
			if (perLeanne.checkFlag(9)) md.write(' As you do you are struck by the similarity of the image on the tarot card Esmeralda showed you and Ms. Jones.');
			md.write('</p>');
			if (clv > 0) {
				md.write('<p>Your beautiful slave stands and looks thoughtful and then she seductively strips off her clothing, making a show for you. At the end she takes a book off a shelf and opens it and sits down, resting her full breasts on it. She looks at you');
				if (perLeanne.checkFlag(9)) md.write(' and again you are struck by the similarity as she has raised one hand like you saw in the image on the card. Your thought is interrupted');
				md.write(',</p><p>"Of course, I remember well the ways of the demon that possessed me, and rituals both obscene and mundane. What you seek is complex, first you must ensure the demon who did this is gone, bound or exorcised."</p>');
				if (isDemonInTown()) {
					md.write(
						'<p>You tell her the demon is still loose, and she looks at you sadly,</p>' +
						'<p>"Then there is little you can do, if you try the demon will reassert their control and you will lose them again. You will also need the person\'s soul, preferably along with the soul of the demon. Be warned about trying to bargain with the demon for it, they will ask a steep price."</p>' +
						'<p>You tell her you will return once you have dealt with the demon</p>'
					);
				} else {
					perLeanne.setFlag(8);
					if (isDemonGone()) {
						md.write(
							'<p>You tell her the demon is gone, fled from the town, and she looks at you sadly,</p>' +
							'<p>"Then all is lost, the soul you seek is lost with the demon, your friend is no more."</p>' +
							'<p>This terrible news strikes you hard, and you tell Ms. Jones about Leanne and how she has become a demonic thrall and being held at the Church pending the arrival of an exorcist. Ms. Jones looks almost disgusted,</p>' +
							'<p>"I once encountered an exorcist, it was..unpleasant...There is nothing they can do for what was your friend, and very likely any exorcism will harm what remains of your friend."</p>' +
							'<p>You think it may be best to just free Leanne...that is the thrall...but keep her under control in some way.</p>'
						);
					} else {
						// Demon bound
						md.write(
							'<p>You tell her the demon is bound into the relic and show her the item, she does not touch it and tells you,</p>' +
							'<p>"The it is possible to save them, you will need some items, a \'Mirror of the Soul\' and a powerful source of magic power, say the legendary \'Dragon Gem\', that is bound to the place of power. I suggest you check the place using your magic.</p>' +
							'<p>When you have these all there, bring the thrall, and perform a ritual I will teach you, it will free their soul and return it to their body. This must be done at midnight"</p>' +
							'<p>She then teaches you a simple ritual, called the \'Ritual of Return\' and then asks,</p>' +
							'<p>"' + perYou.getMaster() + ', please reward me now with your ' + (perYou.isMaleSex() ? 'cock' : 'body') + '?"</p>'
						);
						// Had you talked to Abby about the gem but decided not to have her move it
						if (whereItem(35) == 279 && per.checkFlag(8)) {
							// Yes, allow you to ask her to move it
							setPersonFlag("Abby", 7);
							setPersonFlag("Abby", 8, false);
						}
					}
				}
			} else {
				perLeanne.setFlag(8);	// No re-asking until you charm her
				md.write(
					'<p>Ms. Jones stands and takes a seat on her desk, and her skirt rides up, exposing her green panties. She must not of noticed as she makes no effort to cover up and you are not about to correct her. She tells you,</p>' +
					'<p>"' + perYou.getPersonName() + ' why would moi know anything about zis. I cannot tell ze anthing about zis"</p>' +
					'<p>You get an odd feeling, like she is deliberately trying to distract you with her show of panties, but she will not answer anything more, just repeating how she cannot say anything.</p>'
				);
			}
			startQuestions();
			if (isPlaceKnown("AnitasLair")) addLinkToPlace(md, clv > 0 ? 'visit Anita\'s hiding place' : 'sneak back into Anita\'s hiding place', 252);
			addLinkToPlace(md, 'exit the office', 70);
			WritePlaceFooter(md);
			return true;

		} else if (sType.substr(0, 5) == "jones") {
			// Charming her
			if (sType == "jones5a" || sType == "jones5b") {
				md = WritePlaceHeader(false, !isExplicit() ? "" : !perYou.isMaleSex() ? "td-left-large" : "");
				if (isExplicit()) {
					if (perYou.isMaleSex()) this.showPersonRandomX("jones6", 3);
					else this.showPersonRandomX("!jones9", 4);
				} else this.showPerson("jones5.jpg");
			} else {
				md = WritePlaceHeader(false, sType == "jones3" ? "td-left-large" : "");
				this.showPerson(sType + ".jpg");
			}
			addPlaceTitle(md, "Ms. Jones Under a Charm Spell");

			var wt = perYou.isMaleSex() ? "Sorcier" : "Sorcière";
			var fm = perYou.isMaleSex() ? "mon Maître" : "ma Maîtresse";

			if (sType === "jones2") {
				// Ms Jones Charmed 1
				perLeanne = findPerson("Leanne");
				perLeanne.setFlag(8, false);		// Allow so you can ask about saving Leanne again

				md.write(
					'<p>You can feel the mana entering your teachers body as you recite the spell, and yet, Ms. Jones reacts very little, at least her expression and voice do not. What she does do, however, is immediately open her blouse to expose her breasts and as she speaks to you, you notice her accent is much less noticeable than it was before.</p>' +
					'<p>"Oui ' + perYou.getMaster() + ', You \'ave no idea \'ow <i>grand</i> zis feels... how do you want me?"</p>' +
					'<p>You are surprised at her immediate submission and ask what made her accept you as her ' + perYou.getMaster() + ' so fast. She looks at you with a smile as she answers,</p>' +
					'<p>"Of course I accept you as ' + fm + ', a ' + wt + ' like you \'as to be." She seems to be incredibly enthusiastic about the prospect. "I \'ave been ze servant, toy, warrior, cock-ornament, pussy-slave to many over the decades"</p>' +
					'<p>You look at her quizzically as your brain begins to reboot, all you can think is "what?"</p>'
				);

				// Questions
				startQuestionsOnly();
				addLinkToPlaceC(md, 'ask her to elaborate on "over the decades"', 145, 'type=jones3');

			} else if (sType === "jones3") {
				// Ms Jones Charmed 2
				md.write(
					'<p>Ms. Jones looks in her late 30\'s so her talk of many masters over the decades is kind of confusing to you. You ask her to explain, and as she does, her accent is almost completely gone,</p>' +
					'<p>"Oui, a Sorcière such as you first bound me to them four hundred years ago, and after using my Body, they performed a terrible ritual to let a demon take over my heart and mind. After years of debauchery, death and defilement, the demon did it\'s own ritual, with more blood and death than you can imagine."</p>' +
					'<p>It is likely the effect of the spell as it is steadily taking hold in her mind, but her voice is far more sensual then it seems appropriate for such a story. She, however, clearly does not seem to mind as she continues.</p>' +
					'<p>"A gate had formed, a passage to hell itself and the same one Kurndorf would use a long time later. I was freed, but my body was somehow bound to the gate, unable to travel far from it, and from then on, also unchanged by the passing years."</p>' +
					'<p>The spell seems to have finally taken a full hold over her mind and her voice grows almost orgasmic during the last words, after which she looks at you with blissful devotion. You see the familiar pink sheen in her eyes while her hands trail over her full breasts as if she is testing something and very satisfied with the results.</p>' +
					'<p>"Since then my link to the gate has made me attractive to many witches and warlocks and I have been bound to them time after time just as I am bound to you now."</p>' +
					'<p>It was a very thorough explanation and pretty much has left you stunned, staring at her and not sure if you should believe her. She is definitely under the power of the spell, though, and as you order her to tell you the truth, and she simply replies by squeezing her breasts together.</p>' +
					'<p>"I swear upon my heart and soul that I tell the truth."</p>' +
					'<p>As she says this you feel a surge of mana flow into you.</p>'
				);

				AddMana(5);

				// Questions
				startQuestionsOnly();
				addLinkToPlaceC(md, 'ask her what she will do now', 145, 'type=jones4');

			} else if (sType === "jones4") {
				// Ms Jones Charmed 3
				md.write(
					'<p>These revelations have been rather confusing and you need some time for your mind to take all that in. Finally, you ask her what she will do now, and Ms. Jones gestures quite clearly, as she explains:</p>' +
					'<p>"The spell has fully taken hold, and I am now your slave for as long as you want. This is usually the moment where I am ordered by mon ' + wt + ' to show my great and long experience as a sexual plaything."</p>' +
					'<p>You blink a few times, then ask her if she really doesn\'t want something more than just being a sex toy for Sorcière after Sorcière, but she simply smiles while unbuttoning the rest of her top.</p>' +
					'<p>"One time I did, but one of these does not exclude the other. Zere is a joy in serving, and even more in sex, and I have had <i>so</i> much sex!"</p>' +
					'<p>Well, you find it hard to refuse such an offer...</p>'
				);

				// Questions
				startQuestionsOnly();
				addLinkToPlaceC(md, 'order her to prove her experience', 145, 'type=jones4a');

			} else if (sType === "jones4a") {
				// Ms Jones Charmed 4
				md.write(
					'<p>Ms. Jones has apparently been eagerly waiting for you to do this ever since the moment you had placed her under your spell, and before you were even able to finish speaking, you find yourself pinned onto one of the classes tables by your teachers warm body.</p>' +
					'<p>"Je ferai tout pour vous, ' + fm + ' ." She breathes into your ear in a seductive tone, sensual enough to send shivers through your entire body as you feel her fingers tenderly caressing your skin, sliding under your clothes to remove them piece by piece.</p>' +
					'<p>"Hmmm... aah..." You try to say something, but her lips silence you with a deep, intoxicating kiss, the sheer skill of her tongue leaving you breathless. “Rester immobile et amusez-vous. Just lay still, and enjoy yourself, ' + perYou.getMaster() + '." She whispers to you with a playful wink, pushing your hands out of the way to the side of the table before she teasingly drives her fingernails along your bare arms and shoulders.</p>'
				);

				// Questions
				startQuestionsOnly();
				addLinkToPlaceO(md, 'let yourself fall back and allow her to take charge', 145, 'type=jones5a');

			} else if (sType === "jones5a") {
				// Ms Jones Charmed 5a
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You let your head sink back with a soft sigh, barely noticing her casting off the already opened blazer and the rest of her underwear.</p>' +
						'<p>What you do notice, however, are her full breasts coming to rest on top of growing erection and her fingers caressing your stomach, sliding up to trace your collarbones and shoulders while she places a kiss on top of your navel.</p>' +
						'<p>You notice her lips further exploring your body, placing soft kisses all over your skin as she whispers sweetly in french, her voice even more lascivious then you ever heard her in class, and even though you do not understand everything she says, the sensual timbre is making your heart beat faster all the same.</p>' +
						'<p>Finally, you definitely notice her hand on your by now throbbing manhood, expertly driving her fingers along your veins while her body moves back down, her tongue licking some precum from the tip with a delightful hum before her lips finally close around it. It takes her only a few moments until you let out a loud growl of pleasure, her fingers, lips and tongue working in unison to stimulate your manhood with well practiced motions until your body rushes into a powerful climax, leaving you desperately holding on to the sides of the small table, gasping for air.</p>'
					);
				} else {
					md.write(
						'<p>You let your head sink back with a soft sigh, barely noticing her casting off the already opened blazer and the rest of her underwear.</p>' +
						'<p>What you do notice, however, is her leg pushing forward to part your tights and her fingers tracing your shoulders and collarbones, cupping your breasts and caressing your stomach.</p>' +
						'<p>You notice her lips exploring your body, placing soft kisses all over your skin as she whispers sweetly in french, her voice even more lascivious then you ever heard her in class, and even though you do not understand everything she says, the sensual timbre is making your heart beat faster all the same.</p>' +
						'<p>Finally, you definitely notice her fingers parting your folds, diving deep into your already soaked sex and carefully exploring your most sensitive parts. It takes her only a few moments until you scream in pleasure, her fingertips expertly finding your most receptive areas, stimulating them with well practiced motions until your body rushes into a powerful climax, leaving you desperately holding on to the sides of the small table, gasping for air.</p>'
					);
				}

				// Questions
				startQuestionsOnly();
				addLinkToPlaceO(md, 'okay, you admit she is good...', 145, 'type=jones5b');

			} else if (sType === "jones5b") {
				// Ms Jones Charmed 5b
				if (perYou.isMaleSex()) {
					md.write(
						'<p>"And we \'ave only just begun, mon Maître." You see her lips closing in, and once again, find any form of potential protest muffled by another sensual kiss as your teacher drags you off the table onto the ground. Within the next hour, you are touched and kissed in places of which you didn\'t even know how receptive to these sensations they were, a woman with literally centuries of experience playing your body like a fiddle, making you even forget who is supposed to be in charge as she expertly carries you from one orgasm to the next and putts even your, ever since you picked up the book rather impressive, stamina to the test.</p>' +
						'<p>Finally, you both collapse on top of each other, both your bodies still trembling from her last climax while she pulls you into a last, deep kiss, tired, but very satisfied.</p>' +
						'<p>"Well?" She asks with an exhausted smile on her face, Her accent completely gone as she coos into your arms "Do you believe me now, my Master?"</p>' +
						'<p>You nod silently, wrapping your arms around your new pets wonderful body to hold her close. You have to admit: You are a believer.</p>'
					);
				} else {
					md.write(
						'<p>"And we \'ave only just begun, ma maîtresse." You see her lips closing in, and once again, find any form of potential protest muffled by another sensual kiss as your teacher drags you off the table onto the ground. Within the next hour, you are touched and kissed in places of which you didn\'t even know how receptive to these sensations they were, a woman with literally centuries of experience playing your body like a fiddle, making you even forget who is supposed to be in charge as she expertly carries you from one orgasm to the next.</p>' +
						'<p>Finally, you both collapse on your backs, chests heaving slowly with every breather and your legs intertwined, dripping folds rubbing against each other as the last climax curses through  your bodies, leaving the two of you exhausted, but very satisfied.</p>' +
						'<p>"Well?" She asks with an tired smile on her face, Her accent completely gone as she crawls into your arms "Do you believe me now, my Mistress?"</p>' +
						'<p>You nod silently, wrapping your arms around your new pets wonderful body and have to admit: You are a believer.</p>'
					);
				}
				startQuestionsOnly();
				if (isPlaceKnown("AnitasLair")) addLinkToPlace(md, 'visit Anita\'s hiding place', 252);
				addLinkToPlace(md, 'exit the office', 70);
			}
			WritePlaceFooter(md);
			return true;

		}
		
		if (sType == "msjonesreward1" || (sType === "" && Place == 145 && getBeasleyServant() == 30 && this.isHere())) {
			// Serving Mr Beasley
			// Special "Reward" from Mr Beasley
			md = WritePlaceHeader();
			this.showPerson("jones2.jpg");
			if (getBeasleyServant() == 30) setBeasleyServant(31);
			if (!isPlaceKnown("FrenchClassroom")) setPlaceKnown("FrenchClassroom");

			addPlaceTitle(md, "Ms. Jones In French Classroom");
			md.write(
				'<p>Ms. Jones greets you in the classroom. There is something odd about her eyes and her expression is a ' +
				'mixer of hunger and despair. The teacher\'s body is ' +
				'swaying in time to music played on the radio, a wicked grin escaping her lips.</p>' +
				'<p>&quot;Ms. Jones,&quot; you gasp. &quot;What are you doing here? Did you find Mr. Beasley?&quot;</p>' +
				'<p>&quot;Mmm, Monsier Beasley,&quot; the teacher moans to herself. She begins to play with her breasts. ' +
				'&quot;Yes I have found zee wonderful M. Beasley ' +
				'and he taught me some things I did not know about myself. Hmmm.&quot;</p>' +
				'<p>&quot;Ms. Jones! Are you alright?&quot;</p>' +
				'<p>&quot;Oh yes ' + perYou.getPersonName() + 'I am feeling very well and I am glad zat you are here. I ' +
				'must instruct you in some very important lessons about zee French.&quot;</p>' +
				'<p>You are not sure which way to turn, either out of the door or wait to see what lessons Ms. Jones has for you.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "wait for the lesson", Place, 'type=msjonesreward2');
			addLinkToPlace(md, "exit the room", 70);

			if (!this.checkFlag(2)) {
				this.setFlag(2);
				this.showPersonInfo(md);
			}

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "msjonesreward2") {
			// Serving Mr Beasley
			// Special "Reward" from Mr Beasley
			md = WritePlaceHeader(false, "td-left-large");

			this.showPerson("jones3.jpg");
			addPlaceTitle(md, "Ms. Jones' Lesson");

			md.write(
				'<p>You jump a little as Ms. Jones violently frees her breasts.</p>' +
				'<p>&quot;Relax,&quot; she coos. &quot;Zee lesson I have ' +
				'today is about earning rewards ' + perYou.getPersonName() + '. If you do zee good work ' +
				'for zee teachers we do work for you.&quot; She reaches over and fondles your crotch.</p>' +
				'<p>&quot;Please don\'t, Ms. Jones,&quot; you say, trying to ' +
				'push her hand away. &quot;You don\'t know what you are doing. Mr. Beasley has done something to you.&quot;</p>' +
				'<p>&quot;Ohh, Monsieur Beasley,&quot; she says again, her ' +
				'expression increasing with desire. &quot;He did do something to me. Something very special. Zat is why I ' +
				'have to give you something special too.&quot;</p>' +
				'<p>&quot;No Ms. Jones! Mr. Beasley is a thief and you should not do this.&quot;</p>' +
				'<p>Ms. Jones is clearly under the influence of a spell. You should leave her alone before her actions go too far.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "stay with Ms Jones", Place, 'type=msjonesreward3');
			addLinkToPlace(md, "exit the room", 70);
			WritePlaceFooter(md);
			return true;
		}		
		
		if (sType == "msjonesreward3") {
			// Serving Mr Beasley
			// Special "Reward" from Mr Beasley
			md = WritePlaceHeader();

			this.showPerson("jones4.jpg");

			addPlaceTitle(md, "Ms. Jones' Lesson");

			md.write(
				'<p>&quot;You are right ' + perYou.getPersonName() + ',&quot; ' +
				'says Ms. Jones. &quot;I am a very naughty girl and you should teach me a lesson.&quot;</p>' +
				'<p>The grabs a ' + (isBritish() ? 'metre' : 'yard') + ' stick from her desk and begins spanking her crotch. &quot;Punish me, ' +
				perYou.getPersonName() + ', just like this.&quot;</p>' +
				'<p>Hesitatingly, you take the ' + (isBritish() ? 'metre' : 'yard') + ' stick from her hand.</p>' +
				'<p>&quot;Ow! Zat\'s a little hard darling. Ow! Yes zat is just right. Oh please take me ' +
				'before my panties get all wet.&quot;</p>');

			startQuestions();
			addLinkToPlace(md, "take Ms. Jones", Place, 'type=msjonesreward4');
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "msjonesreward4") {
			// Serving Mr Beasley
			// Special "Reward" from Mr Beasley
			md = WritePlaceHeader(false, "td-left-large");

			this.showPerson("jones5.jpg");
			addPlaceTitle(md, "Ms. Jones' Lesson");

			md.write('<p>Your French teacher leans over the desk. &quot; Oh my little pussy aches so much you wicked ');
			if (perYou.isMaleSex()) md.write('boy. Your next lesson is to make it better with that juicy cock of yours.');
			else md.write('girl. Your next lesson is to lick it better.');
			md.write(
				'. .&quot;</p>' +
				'<p>You do as your teacher orders, with her gasping out instructions between orgasms. ' +
				'Only one thing annoys you: Every time Ms. Jones climaxes she screams out for Beasley.</p>' +
				'<p>The lesson leaves you feeling satisfied but there are more adventures waiting so you have to get going.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "exit the room", 70);
			WritePlaceFooter(md);
			return true;
		}
		
		// Repeatable sex scenes with Ms. Jones
		var herName = this.getPersonName();
		//var wt = perYou.isMaleSex() ? "Sorcier" : "Sorcière";

		if (sType === "proveexperience") {
			// More Proof
			md = WritePlaceHeader();
			this.showPerson("prove.jpg");

			addPlaceTitle(md, herName);

			md.write(
				'<p>You barely had a chance to finish speaking as she had already begun to discard her clothes in simple and yet deliberately erotic motions, straightening her back with her arms crossed behind her and her legs slightly spread.</p>' +
				'<p>"I am always <i>very</i> eager to provide another demonstration, my ' + perYou.getMaster() + '." She draws the last two words out into a sensually vibrating purr. "How may I prove myself worthy of you?"</p>'
			);

			// Questions
			startQuestions();
			if (perYou.isMaleSex()) {
				addLinkToPlaceC(md, '"With your body"', Place, 'type=fuck');
				addLinkToPlaceC(md, '"With your tongue"', Place, 'type=bj');
				addLinkToPlaceC(md, '"With your tits"', Place, 'type=titsfuck');
			} else {
				addLinkToPlaceC(md, '"With your tongue"', Place, 'type=bj');
				addLinkToPlaceC(md, '"With your body"', Place, 'type=fuck');
				if (perYou.FindItem(45) > 0) addLinkToPlaceC(md, '"With a strap-on"', Place, 'type=strapon1');
			}
			startQuestions();
			addLinkToPlaceC(md, '"Actually, I just want to ask a few questions."', 145, "post=true", '&quot;Of course, my ' + perYou.getMaster() + '.&quot; She can barely hide her disappointment, but quickly returns most of her clothes to the way they were, looking at you expectantly with an eager smile.', 'Ms Jones');
			if (isPlaceKnown("AnitasLair")) addLinkToPlace(md, 'visit Anita\'s hiding place', 252);
			addLinkToPlace(md, 'exit the office', 70);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "fuck") {
			// Fuck her
			md = WritePlaceHeader(false, perYou.isMaleSex() && !isExplicit() ? "" : "td-left-large");
			if (!perYou.isMaleSex()) this.showPerson("!jones12.jpg");
			else if (isExplicit()) this.showPersonRandomX("jones6", 2, '', '', '', '', 3);
			else this.showPerson("!jones6.jpg");

			addPlaceTitle(md, herName + '\'s Body');

			if (perYou.isMaleSex()) {
				md.write(
					'<p>You know Ms Jones always enjoys a challenge, but also that she is at her best when allowed to use all the assets at her disposal, and as usual, she does not disappoint.</p>' +
					'<p>Within seconds, you find her on top of her teachers desk, enticingly tracing the ruler over her naked body and gesturing you to come closer, though it is not that you need this encouragement by now. Moments later, you are taking her roughly, the ruler now in your hands occasionally placing a slap onto her clit to make her squeal in delight while she whispers sweet lewdities to you, some in French, some in English, but always making your skin crawl in the most delightful way possible.</p>' +
					'<p>You love how devoted she is to pleasing you and yet, you have started to suspect that she has also been somehow guiding you, teaching you subtly how to please her and by extend the rest of your Harem.</p>' +
					'<p>You have yet to confront her about it and got to admit that you are in no hurry to do so. The things you pick up are proving to be very useful and she is just too good for you to care...</p>'
				);
			} else {
				md.write(
					'<p>You know Ms Jones always enjoys a challenge, but also that she is at her best when allowed to use all the assets at her disposal, and as usual, she does not disappoint.</p>' +
					'<p>Within minutes, you find yourself on the floor behind your teachers desk, your naked bodies intertwined as you both touch, kiss and caress each others skin with all her attention fully focused on you and your pleasure alone. You love how she is coming up with new and inventive ways to send pleasant shivers all over your body or make you scream in ecstasy every time you meet, and yet, you have started to suspect that  that she is also somehow guiding you, teaching you subtly how to please her and by extend the rest of your Harem.</p>' +
					'<p>You have yet to confront her about it and got to admit that you are in no hurry to do so. The things you pick up are proving to be very useful and she is just too good for you to care...</p>'
				);
			}
			startQuestions();
			addLinkToPlaceC(md, '"Actually, I just want to ask a few questions."', 145, "post=true", '&quot;Of course, my ' + perYou.getMaster() + '.&quot; She can barely hide her disappointment, but quickly returns most of her clothes to the way they were, looking at you expectantly with an eager smile.', 'Ms Jones');
			if (isPlaceKnown("AnitasLair")) addLinkToPlace(md, 'visit Anita\'s hiding place', 252);
			addLinkToPlace(md, 'talk more with Ms. Jones', Place);
			WritePlaceFooter(md);
			return true;			
		} 
		
		if (sType == "strapon1") {
			// She fucks you with a Strap-On, part 1
			md = WritePlaceHeader();
			this.showPersonX("!jones13.jpg");

			addPlaceTitle(md, herName + '\'s Strap-On');

			md.write(
				'<p>Usually, you are the one using this toy, but you\'ll be damned if you\'d pass up an opportunity to see what Ms Jones is able to do with it.</p>' +
				'<p>Her eyes lighten up like a child\'s on Christmas as you hand it over and tell her that she is allowed to use it on you for being such a good slave.</p>' +
				'<p>She doesn\'t hesitate a second to put it on, swinging her hip to let the dildo waggle around with a gleeful giggle before her eyes focus on you with an almost predatory sheen.</p>' +
				'<p>She gently takes your hands and walks backwards, guiding you to the teachers desk, only to suddenly move behind you and push your body against it in a swift, rough motion. You gasp as her hands slide under your clothes, eagerly playing along as she removes and carelessly throws them to the side.</p>' +
				'<p>Your heart is beating faster as she spreads your legs and guides your upper body slightly forward, wrapping her arms around you tenderly. You feel her lips on the back of your neck, her breasts pressed against your back, and the tip of the strap on against your damp folds.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Do it"', Place, 'type=strapon2');
			WritePlaceFooter(md);
			return true;

		} else if (sType == "strapon2") {
			// She fucks you with a Strap-On, part 2
			md = WritePlaceHeader();
			this.showPersonX("!jones13.jpg");

			addPlaceTitle(md, herName + '\'s Strap-On');

			md.write(
				'<p>You roughly breath out the order and she all to eagerly complies, fully pushing the toy cock into you with a long, delightful purr. She whispers to you to relax, let yourself go and allow her to read your body language as she begins to drive the toy in and out of you, subtly adjusting her position until you can\'t help but release some of the most lewd noises you ever heard escaping your lips every time she pushes forward.</p>' +
				'<p>As the seconds pass, her motions grow faster and more confident, having developed a good feel for your reactions, she ably begins to play with your body, driving you on a seemingly endless wave of pleasure until you are no longer able to hold back, collapsing on her desk in a powerful climax.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Actually, I just want to ask a few questions."', 145, "post=true", '&quot;Of course, my ' + perYou.getMaster() + '.&quot; She can barely hide her disappointment, but quickly returns most of her clothes to the way they were, looking at you expectantly with an eager smile.', 'Ms Jones');
			if (isPlaceKnown("AnitasLair")) addLinkToPlace(md, 'visit Anita\'s hiding place', 252);
			addLinkToPlace(md, 'talk more with Ms. Jones', Place);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "titsfuck") {
			// Tits-fuck her
			var idx = Math.floor(Math.random() * 4);
			var img = "jones7" + String.fromCharCode(idx + 97) + ".jpg";
			md = WritePlaceHeader(false, isExplicit() && idx < 2 ? "td-left-large" : "");
			if (isExplicit()) this.showPersonX(img);
			else this.showPerson("!jones7.jpg");

			addPlaceTitle(md, herName + '\'s Tits');

			md.write(
				'<p>"I know just the thing, my Master." She eagerly helps you undress and pushes you to the ground behind the teachers desk. You watch her curiously as she straddles your legs and gathers a small bottle of oil from one of the drawers and makes sure to push out her chest and crotch invitingly while slowly pouring the contents over her breasts, moaning sensually when the oil touches her skin and making a huge show out of spreading it over both her full orbs.</p>' +
				'<p>You try to touch her breasts, but she just pushes your hand aside and teasingly waggles a finger before leaning down do rub her oiled breasts over your body.</p>' +
				'<p>It may not be as inventive as many of the things she usually does, but you really enjoy the sensation of her naked body sliding all over you nevertheless, your fingers caressing her sides and squeezing her rear as it gets into range until she slides down all the way and traps your manhood between her glistering tits.</p>' +
				'<p>You see a sly grin on her lips as she begins to move them, massaging your trapped member with slow, skillful motion to finally drive you over the edge.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Actually, I just want to ask a few questions."', 145, "post=true", '&quot;Of course, my ' + perYou.getMaster() + '.&quot; She can barely hide her disappointment, but quickly returns most of her clothes to the way they were, looking at you expectantly with an eager smile.', 'Ms Jones');
			if (isPlaceKnown("AnitasLair")) addLinkToPlace(md, 'visit Anita\'s hiding place', 252);
			addLinkToPlace(md, 'talk more with Ms. Jones', Place);
			WritePlaceFooter(md);
			return true;			
		} 
		
		if (sType == "bj") {
			// Oral
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("jones8", isExplicit() ? 5 : 2);
			else if (isExplicit()) this.showPersonRandomX("!jones9", 4);
			else this.showPerson("!jones9.jpg");

			addPlaceTitle(md, herName + '\'s Tongue');

			if (perYou.isMaleSex()) {
				md.write(
					'<p>"You wish to examine moi experteez in français, mon Maître?" She playfully falls back into her discarded accent and presses her naked body against yours with a hungry look in her eyes. "It eez one of moi <i>many</i> specialties, you know?"</p>' +
					'<p>You can feel her heart already racing in anticipation as she wraps her arms around you, her lips briefly brushing over yours, and yet, before you are able to return her affection, you find your body spun around with almost scary ease and quickly coaxed to sit on the teacher\'s desk. You gasp as she places gentle kisses on your chin and neck while her hands expertly remove whatever piece of clothing was standing between her and your growing hard on.</p>' +
					'<p>In the next minutes, you once again experience the full impact of centuries of experience combined with a completely uninhibited mind focused only this task. Several times, you find yourself close to orgasm and your hands clamping at the desk in anticipation, only for her tongue and fingers to make a seemingly minor shift in her approach to keep you in suspense and prolong your release a little longer, skillfully toying with your manhood for a bit until she finally pushes you over the edge.</p>'
				);
			} else {
				md.write(
					'<p>"You wish to examine moi experteez in français, ma maîtresse?" She playfully falls back into her discarded accent and presses her naked body against yours with a hungry look in her eyes. "It eez one of moi -many- specialties, you know?"</p>' +
					'<p>You can feel her heart already racing in anticipation as she wraps her arms around you, her lips briefly brushing over yours, and yet, before you are able to return her affection, you find your body spun around with almost scary ease and quickly coaxed to sit on the teacher\'s desk. You gasp as she places gentle kisses on your chin and neck while her hands expertly remove whatever piece of clothing was standing between her and your dampening folds.</p>' +
					'<p>In the next minutes, you once again experience the full impact of centuries of experience combined with a completely uninhibited mind focused only this task. Several times, you find yourself close to orgasm and your hands clamping at the desk in anticipation, only for her tongue and fingers to make a seemingly minor shift in her approach to keep you in suspense and prolong your release a little longer, skillfully toying with you for a bit until she finally pushes you over the edge.</p>'
				);
			}
			startQuestions();
			addLinkToPlaceC(md, '"Actually, I just want to ask a few questions."', 145, "post=true", '&quot;Of course, my ' + perYou.getMaster() + '.&quot; She can barely hide her disappointment, but quickly returns most of her clothes to the way they were, looking at you expectantly with an eager smile.', 'Ms Jones');
			if (isPlaceKnown("AnitasLair")) addLinkToPlace(md, 'visit Anita\'s hiding place', 252);
			addLinkToPlace(md, 'talk more with Ms. Jones', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var ap = Math.random() < 0.5;
		if (ap) this.showPerson("!poledancea.jpg");
		else this.showPerson("!poledanceb.jpg");
		addPlaceTitle(md, "Ms. Jones' Dance");
		if (ap) md.write('<p>Ms. Jone is wearning a sot os stylised gangster outfit and some a skilled strip-tease. She is very focused and an excellent stripper but you are briefly distracted by the thought that she could have dressed this way during the actual era she is dressed for...</p>');
		else md.write('<p>Ms. Jone is wearning a costume, a fantasy take on Catwoman, then again is any Catwoman costume worn for anthing else. She is an excellent dancer and can really handle that whip!</p>');
	
		md.write('<p>After she sits with you for a while, not really paying attention to anyone else in the club but happy to be with you and serve you.</p>');
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 145 && this.isHere()) { 
			// Questions if charmed or not
			var perLeanne = findPerson("Leanne");
			if (isMurderPath()) {
				if (getPersonOther("Anita") == 100) addQuestionC(md, 'ask Ms. Jones if she has seen Anita', "MsJones", 1001);
			}
			if (!isPlaceKnown("WildRanges")) addQuestionC(md, 'ask Ms. Jones if she knows about magic stones', "MsJones", 4600);
			if (getBeasleyServant() == 6) addQuestionC(md, 'ask Ms. Jones where Mr. Beasley went', "MsJones", 1406);	// Don't know about Wild Ranges
			if (perYou.isQuestStarted(5) && perLeanne.place == 382 && !perLeanne.checkFlag(8)) addLinkToPlaceC(md, 'ask Ms. Jones about saving Leanne', 145, 'type=askleanne');

			if (this.isCharmedBy()) {
				// Charmed only questions
				if (getQueryParam("post") === "" && sType === "") addLinkToPlace(md, 'let her prove her experience again', Place, 'type=proveexperience');
				if (this.other === 0) addQuestionC(md, 'ask her about her eagerness to serve', "MsJones", 2000);
				else if (this.other == 1) addQuestionC(md, 'ask her about the accent', "MsJones", 2001);
				else if (this.other == 2) addQuestionC(md, 'ask what she knows about Davy Robbins', "MsJones", 2002);
				else if (this.other == 3) addQuestionC(md, 'ask about who had charmed her, if not Davy', "MsJones", 2003);
				else if (this.other == 4) addQuestionC(md, '"I think I have seen newspaper clippings of this, the police just put it off as a depraved sexcult which dispersed after the leader died of drug overdose... wait, you were part of that?"', "MsJones", 2004);
				else if (this.other == 5) addQuestionC(md, '"Why would he do that?"', "MsJones", 2005);
				if (this.checkFlag(5) && !this.checkFlag(6)) addQuestionC(md, 'ask about her and Miss Logan', "MsJones", 2100);
				if (this.checkFlag(7) && !this.checkFlag(8)) addQuestionC(md, 'ask about her relationship with Susan Tanika', "MsJones", 2200);
				
				this.addDancingLink(md, 'talk to Ms. Jones about dancing in the club',
					'You ask your teacher-slave about dancing at the Avernus club and she quickly answers,</p>' +
					'<p>&quot;Of course, of course ' + this.getYourNameFor() + ', I am your to command as you will!&quot; and with that you call Jade to arrange a dance for Ms. Jones.'
				);	
				
				var perL = findPerson("MissLogan");
				if (perL.isNeuro() && perL.other > 9 && perL.other < 13 && !perL.checkFlag(11) && sType === "") {
					if (perL.checkFlag(10)) addLinkToPlace(md, 'ask her for help with Miss. Logan and her tablet', Place, '', this.addPersonFace(true) + ' You explain about Miss. Logan and the charm spell failing and her fascination with her tablet computer since then. You ask Ms. Jones to distract Miss. Logan so you can get a look at the tablet. She eagerly agrees, but you have already met with Miss. Logan today so you will have to leave this until another time.');
					else addLinkToPlace(md, 'ask her for help with Miss. Logan and her tablet', 234, 'type=msjonesneuro', this.addPersonFace(true) + ' You explain about Miss. Logan and the charm spell failing and her fascination with her tablet computer since then. You ask Ms. Jones to distract Miss. Logan so you can get a look at the tablet. She eagerly agrees and follows you into the classroom');
				}
			}
		}
		
		if (Place != 72 || !this.isHere() || sType !== "") return;

		if (!this.checkFlag(12)) {
			addQuestionR(md, 'Say hello to Ms. Jones',
				'“Ah, bonjour, ' + (perYou.isBornMale() ? 'Monsieur' : 'Mademoiselle') + ' ' + perYou.getPersonName() + '.” She looks up from her papers with an inviting smile.” Iz zere somezing I can \'elp you wiz?”',
				"MsJones",
				"setPersonFlag(\\'MsJones\\',12)"
			);
		} else {
			if (!this.checkFlag(13)) {
				addQuestionR(md, 'Ask about her Office',
					'“The artisan says it should be ready soon, but I enjoy it \'ere.“</p>' +
					'<p>“You are more likely to meet ze students and have a conversation during work and I \'ope they will still occasionally visit moi office.”',
					"MsJones",
					"setPersonFlag(\\'MsJones\\',13)"
				);
			}
			if (!this.checkFlag(14)) {
				addQuestionR(md, 'Ask her where you stand in her class',
					'“You are a better student zan your grades imply, ' + perYou.getPersonName() + ',  but I am sure you know that you will need to focus if you wish to make it through the year.”</p>' +
					'<p>She leans forward and invitingly presents her neckline to you.<p>' +
					'<p>“I would be saddened to lose a smart student like you early. You \'ave potential many others do not, but you will \'ave to... \'ow do zey say it... grap it.”',
					"MsJones",
					"setPersonFlag(\\'MsJones\\',14)"
				);
			}
			if (!this.checkFlag(15)) {
				addQuestionR(md, 'Ask if she knows anything about magic',
					'“La magie?” She sits back and just happens to roll her shoulders back in a way that pushes her breasts forward. “Ah, Je suis désolé, I am sorry ' + perYou.getPersonName() + ' But I am not able to tell you anything about zese topics.”',
					"MsJones",
					"setPersonFlag(\\'MsJones\\',15)"
				);
			}
		}
	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// In the teachers lounge
			if (Place == 72 && this.isHere()) {
				if (nMana < (perYou.checkFlag(17) ? 9 : 10)) {
					addComments('You do not have enough mana to cast the spell.');
					return "handled";
				} else {
					addComments(
						'You collect the mana, speak the words, and you are absolutely certain you did everything right... and yet, the spell failed. Is she protected somehow... or did someone else already put a spell on her?</p>' +
						'<p>Ms Jones looks surprised for about a second, regards you curiously, and then smiles.</p>' +
						'<p>“À tes souhaits, ' + perYou.getPersonName() + '. Don\'t catch a cold.”'
					);
					this.setFlag(16);
					this.setFlag(17);
					return "refresh";
				}
				
			} else if (Place == 145 && this.isHere()) {
				//Ms Jones in the French Classroom
				if (!this.isCharmed() && this.checkFlag(1)) CastCharmSpell("MsJones", 145, 1, "type=jones2");		//Charm Ms. Jones
				else if (!this.isCharmed() && !this.checkFlag(1)) addComments('You read the spell.... but it nothing happens, she must already be under the effects of a charm spell.');
				else return '';
				return "handled";
			}
		} else 
		
		// Using/Examining the Silver Ring
		if (no == 32 && cmd == 2) {
			// Use the Silver Ring
			if (Place == 145 && this.isHere() && !this.isCharmedBy() && !this.checkFlag(1)) {
				useSilverRingStart();
				addComments(
					'<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over Ms Jones.</p>' +
					'<p>She looks momentarily confused, and then smiles. You are surprised at how little she reacts.</p>' +
					'</td></tr></table>'
				);
				this.setFlag(1);
				AddMana(5);
				return "refresh";
			}
		}

		return "";		// do nothing
	};
	
	
	// Phone calls
	
	per.isPhoneable = function() {
		// Can you call them?
		if (!this.isCharmedBy("You")) return false;
		if (Place == 234) {
			var perL = findPerson("MissLogan");
			return (perL.isNeuro() && perL.other > 9 && perL.other < 13 && !perL.checkFlag(11));
		}
		return checkPlaceFlag("Hotel", 11) && Place == 269;
	};

	per.callThem = function() {
		if (Place == 269) {
			gotoPlace(Place, 'type=msjonespool');
			receiveCall('', 'You call your teacher and slave Ms. Jones to invite her to join you at the pool for a swim, and she immediately answers that she will be there soon');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (Place == 234) {
			var perL = findPerson("MissLogan");
			if (perL.isNeuro() && perL.other > 9 && perL.other < 13 && !perL.checkFlag(11)) {
				// Ask for help with Miss Logan
				gotoPlace(Place, 'type=msjonesneuro');
				receiveCall('', 'You send a SMS to your teacher and slave Ms. Jones and tell her you need help with Miss. Logan and want her to distract Miss. Logan so you can see her tablet computer. She replies immediately that she will be there in a few minutes.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};

	per.addPersonPhoneCall = function() {
		if (!this.isCharmedBy()) return false;		// All SMS's are post Charm for her
		if (!this.checkFlag(3) && (nTime % 288) > 239 && isCharmedBy("Vampyre", "You")) {
			// SMS about vampyre
			if (makeCall(true, 40)) this.setFlag(3);
		} else if (this.checkFlag(5) && !this.checkFlag(9) && ((nTime - this.extra[0]) / 12) > 12 && getHour() < 10) {
			if (makeCall(true, 41)) {
				this.setFlag(9);
				this.extra[0] = nTime;
			}
		} else if (this.checkFlag(9) && !this.checkFlag(10) && (nTime - this.extra[0]) > 4) {
			if (makeCall(true, 42)) this.setFlag(10);
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		switch(id) {
			case 40:
				// SMS about vampyre
				return receiveSMS('frenchisfun', 'The gate opened, please visit me at the school, tonight', 'jonessms1.jpg');
			case 41:
				// Miss Logan SMS
				return receiveSMS('frenchisfun', 'Ms Logan and I are getting ready for classes and we hope to see you there. (You still have some catching up to do, but If you are busy I will compile everything you need to know for later.)', 'jonessms2.jpg') +
						 receiveSMS('frenchisfun', 'PS: Thank you so much again for charming her, my ' + perYou.getMaster() + ', class breaks have been so much more enjoyable. &#94;_&#94; ');
		}
		return '';
	};
}
