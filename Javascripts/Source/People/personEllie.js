/************************
Ellie Bartel, Bank Teller
*************************/

function RepliesEllie(nR)
{
	var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 9902) {
		setPersonFlag("Nella", 2);	// Know her name
		setPersonFlag("Nella", 4);	// Asked about 
		setPersonFlag("Nella", 6);	// Works as stripper
		addComments(
			(Place == 225 ? 'You queue up to the desk Ellie is serving ay and when you approach she smiles. You ask her about the security guard,</p><p>' : '') +
			'“Nella the security guard? I have gotten quite friendly with her but not too close yet. Let\'s see, she works a few part-time jobs as well as here, she dances over at that strip-club, and I think maybe works at the Antiques ' + getShopStore(true) + '”</p>' +
			'<p>“If you want to talk to her you might have to catch her when she is not at work <b>here</b>, ' + myName + ', just don\'t forget about me.”, she teasingly grins.'
		);
	}
	return true;
}


/***************** Initialise ******************************************************************************/

function initialiseEllie()
{
	// Ellie
	addPerson("Ellie", 225, "Ellie");
	per.Replies = RepliesEllie;
	per.charmThem(1, "Davy");	// Initially charmed by Davy
	per.getPersonName = function(full) {
		if (full === true) return "Ellie Bartel";
		if (this.isCharmedBy("You")) {
			if (this.getCharmedLevel() == 4) return "Slave Ellie";
			return "Ellie, your lover";
		}
		// If NOT Charmed
		return "Ellie";
	};

	per.getPersonAddress = function() { return checkPlaceFlag("DervishRd", 3) ? '12 Dervish Rd, Glenvale' : ''; };

	per.whereNow = function() {
		if (this.isCharmedBy("You") && (!isDay() || !isWeekDay())) return 422;
		if (Place == 422) return Place;
		if (Place == 430 && this.place == 430) return sType.indexOf("ellie") != -1 ? Place : 0;
		return this.place;
	};

	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		var s = this.addPersonString("ellie1a.jpg", "height:max%", "right");
		if (!this.isCharmed() || !this.isCharmedBy("You")) {
			return s +
				"You immediately recognise Ellie when you walk around the Bank. She was the prom queen back then in highschool when you were just a freshman. " +
				"She became the prom queen of her last year not necessarily out of her beauty (she's not bad looking, but not really the prom queen type of girl), but rather because of her charm and intelligence.<br><br>" +
				"She's the type of girl who is known by everyone and was the centre of attention on a regular basis. She attended a lot of competitions in maths and physics and done a lot of school sport races too. " +
				"So it's rather obvious that the teachers became fond of her and she rose to fame as an example of the typical \"perfect student\". However, she was praised  and loved by the school students too, because she helped to keep the school community together by programmes and events. She was extremely nice to everyone and always offered help in any kind of need.<br><br>" +
				"You, on the other hand, had not really spoken to her too much, because she always was surrounded by friends or other people who were just buzzing around her. She never was quite alone and you were too shy to talk to her longer than a minute or two.<br><br>" +
				"Strangely, she kind of disappeared from the local scene after she finished high school. You haven't seen her in years yet, but her face gave her away quickly. She hasn't changed much!";
		} else if (this.getCharmedLevel() == 2) {
			return s +
				"Ellie turned out to be a great addition to your growing number of girlfriends: She is gentle, kindhearted, surprisingly submissive, and has absolutely no problem with you 'dating' other girls.<br><br>" +
				"Her time with Davy and the things he ordered her to do, however, has left a deep impression on the woman and you have decided to keep the spell binding her as light as possible to not hurt her further. She might be coerced to love you and is far more comfortable with sexuality, but still has much of her own free will, occasionally arguing with you and certainly not following every order you give her.<br><br>" +
				"You decided to keep it slow and let her pick the pace at which she wants to be intimate, which has often led to you spending the nights cuddling and talking rather then engaging in wild sexual escapades like you are used to by now. It's kinda a pleasant change of pace, though.<br><br>" +
				"Carol and Ellie had a strained relationship for a very long time thanks to Carols long time affair with Kristin, but with Ellies new views and your subtle 'help', the two of them have begun to make up.";
			//return s +
			//	"Ellie is the perfect girlfriend material. She’s kind, caring and submissive. She is even happy that you "date” other girls too. You two have talked a lot about the relationship between Kristin and Carol. She was furious at first, but now, after you took her under your command she doesn’t mind anymore. It is just weird for her now, because she and her and mother have talked about this topic a lot. Carol raised Ellie to be always faithful to her current partner and be only interested in them. When Ellie knew that Carol is cheating her partner, Sally, she was disapointed in her. You altered Ellie’s personality a little, so she no longer feels hatred towards her mum. As if nothing ever happened between them, they again love each other like a good mom and daughter do!";
		} else {
			return s +
				"Ellie turned out to be a very submissive girl by nature and your spell only enforced this part of her personality as well as her already existing desire to submit to another person.<br><br>" +
				"She has fully devoted her life to you and your pleasure to the point that she even refers to herself in 3rd person and follows your orders without questioning and drawbacks. Well, most of them.<br><br>" +
				"You know her time with Davy has left a mark on her psyche, and while the charms effects help her to deal with what he did by filling her mind with blissful lust and obedience, you are well aware that there are a few things she will not be able and willing to do and make sure to avoid them as you find out.<br><br>" +
				"You have altered her personality just a little to get her to make up with her mother as well. The two of them had a strained relationship for far too long and you figured they will need to love each other again if they are to properly serve you.";
			//return s +
			//	"Ellie quickly found her place as a slave to you. She doesn’t care about anything other than performing your orders perfectly and without any drawbacks.<br><br>" +
			//	"You asked her about the relationship between Kristin and Carol. She was furious at first, but now, after you took her under your command she doesn’t mind anymore.<br><br>" +
			//	"It is just weird for her now, because she and her and mother have talked about this topic a lot. Carol raised Ellie to be always faithful to her current partner and be only interested in them. When Ellie knew that Carol is cheating her partner, Sally, she was disappointed in her. You altered Ellie’s personality a little, so she no longer feels hatred towards her mum. As if nothing ever happened between them, they again love each other like a good mom and daughter do!";
		}
	};
	per.passTimeDay = function() {
		if (this.isCharmedBy("You") && checkPersonFlag("Kristin", 10)) {
			var nd = Math.floor(nTime / 288) % 7;
			if (nd < 6) {
				if (this.isHere()) {
					this.place = 225;
					return this.addPersonFace() + "In the morning Ellie gives you a kiss and tells you she has to leave for her job at the Bank.</p>";
				}
				this.place = 225;
			}
		}
		return '';
	};
	per.passTimeNight = function() {
		if (this.isCharmedBy("You") && checkPersonFlag("Kristin", 10)) {
			var nd = Math.floor(nTime / 288) % 7;
			if (nd < 6) this.place = 422;
		}
		return '';
	};

	per.addPersonPhoneCall = function() {
		// All SMS messages are post charm
		// Though some of the bank phone calls at home could be
		if (!this.isCharmedBy()) return false;

		// Trio meeting
		if (!this.checkFlag(3) && isShopOpen(0)) {
			var perMT = findPerson("Mayor");
			if (perMT.checkFlag(4)) {
				var perAng = findPerson("Angela");
				if (!perAng.checkFlag(10)) {
					var perBatton = findPerson("OfficerBatton");
					var nt = this.hoursCharmed();
					var nm = perMT.hoursCharmed();
					if (perBatton.isCharmedBy("You") && perMT.isCharmedBy("You") && isCharmedBy("Kristin") && perMT.place === 110 && Place != 95 && Place != 110) {
						var nk = getHoursCharmed("Kristin");
						var tm = 72 + Math.floor(Math.random() * 5);
						if (nt > tm && nm > tm && nk > tm) {
							// SMS 140 after Mayor Thomas + Angela + Kristin + Officer Batton are charmed for 3+ days
							// TODO: review time delay...
							if (makeCall(true, 140)) this.setFlag(3);
						}

					}
				}
			}
		} else if (this.getCharmedLevel() == 2 && getDay(true) == "Mon" && !this.checkFlag(7) && isDay() && getHour() > Math.floor(9 + (3 * Math.random()))) {
			if (makeCall(true, 141)) this.setFlag(7);
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		switch(id) {
			case 140:
				return receiveSMS('Ellie', this.getYourNameFor() + '!  Kristin and I are at a meeting with the mayor and the ' + getPoliceChief().toLowerCase() + '...Kristin says that you are invited too&#9786; Join us pretty please! It would be soo good to you again!') + receiveSMS('Angela', 'Ps: Ellie is here too! She is such a cute girl! She and I have a lot in common!');
			case 141:
				return receiveSMS('Ellie', 'I hate mondays, but seeing you at work lightens up my day a bit, so here\'s a little incentive for you to visit me.;)', 'elliesms1.jpg') +
						 receiveSMS('Ellie', 'And if that\'s not enough:', 'elliesms2.jpg');
		}
		return '';
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 225) {
			if (!this.checkFlag(5)) {
			// Show Ellie's introduction if not shown before
				this.setFlag(5);
				this.showPersonInfo(mdCache);
				return true;
			}
			if (isCharmedBy("Kristin") && !this.checkFlag(8)) {
				this.setFlag(8);
				showPopupWindow("Ellie is Distracted",
					this.addPersonString("ellie1a.jpg", "height:max%", "right") +
					'You almost bump into Ellie as you leave Kristins Office, and it seems the teller had been completely absorbed by something on her phone.</p>' +
					'<p>You don\'t really catch anything of interest on the screen before she turns it off to apologize to you, but you do notice the way her eyes suddenly widen as if she just remembered something of great importance.</p>' +
					'<p>Her fingers constrict around the phone for a second before she seemingly calms herself with a breather. This might be the most nervous you\'ve ever seen her.</p>' +
					'<p>“I... uhm, I\'m sorry, I just remembered... I have to really take care of something but will be right back if you... need anything.”</p>' +
					'<p>She rushes off with a surprising burst of speed before you are even able to reply and it looks like she was dialing a number on her phone as she vanishes into the back of the bank.</p>' +
					'<p>When she returns, she tries her best to avoid looking at you, she still has her usual smile, but the way she carries herself looks... somewhat tense when you are around.</p>'
				);
			}
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		// Trio event at the Town Hall
		if (Place == 95) {
			// Meet ellie before 2
			if (sType == "ellie2" || sType == "ellie2q1" || sType == "ellie2q2") {
				md = WritePlaceHeader();
				var q1 = getQueryParam("q1");
				var q2 = getQueryParam("q2");

				this.showPerson("trioeventellie2.jpg");
				addPlaceTitle(md, "Ellie");
				if (sType == "ellie2q1") {
					md.write(
						'<p>Ellie replied "Ohh, very much! Without you, we would probably be still on a warpath with each other. Luckily, you came along and changed both of our lives forever! At work, Kristin is still my boss who can use me for mostly anything, but at nights we visit each other’s house for some \"talk\".", Ellie devilishly beams at you for a second.</p>'
					);
				} else if (sType == "ellie2q2") {
					md.write(
						'<p>Ellie replies, "Not much, apart that she was very secretive before your arrival. She wanted to do some business with our company and she visited the bank once or twice, but didn’t stay for long. She asked money from us about a project she wanted to do, something that would rebuild certain parts of the town. Miss Thomas really wished to revive this community by building new parks and  central plazas. Modernization was her thing and she took that idea seriously. I don’t know more, you should talk to her about this. After all, there are no taboos between you and your slaves..." Ellie protectively looks up to you, resting herself on the sofa.</p>'
					);
				} else {
					md.write(
						'<p>"You are right Ellie, I can do whatever I damn well please. Why are you here in the first place?", you dominantly lean on the nearbiest couch.</p>' +
						'<p>Ellie replies "Miss Kristin promoted me, I became her secretary. She needed one, after you charmed her she became obsessed serving you and your empire. She is busy managing the financials of the town and also consulting and planning on how she could help you expand and manage between the city walls without attracting audience. That’s why she needed a confidante and chose me. I follow her everywhere she goes and handle her time management, her work schedule and of course, her personal needs!", her naughty smirk is dangerously affective on your sexual needs. You reply,</p>' +
						'<p>"Ohh, I see a hierarchy has already been developing between my slaves..."</p>' +
						'<p>Ellie happily answers "Yes ' + perYou.getMaster() + '! We do need some order, don’t we? I mean you don’t have time to deal with each and every one of your slaves so it was the logical thing to do. We run our lives normally and look after each other all while perfectly following your orders. In time we will know all about you and your preferences and will look for all your needs without you having to move a muscle.", Ellie stands up from the sofa and streches her legs, the black stockings she is wearing tightens a little.</p>'
					);
				}

				startQuestions();
				if (q1 != 'asked') addLinkToPlaceC(md, '"How’s Kristin? The two of you come along now?"', 95, q2 == 'asked' ? 'type=ellie3' : 'type=ellie2q1&q1=asked&q2=' + q2);
				if (q2 != 'asked') addLinkToPlaceC(md, '"What do you know about the mayor?"', 95,  q1 == 'asked' ? 'type=ellie3' : 'type=ellie2q2&q2=asked&q1=' + q1);
				WritePlaceFooter(md);
				return true;
			}
			// Meet ellie before 3
			if (sType == "ellie3") {
				md = WritePlaceHeader();

				this.showPerson("trioeventellie3.jpg");
				addPlaceTitle(md, "Ellie");
				md.write(
					'<p>You tell Ellie, "Thanks, my dear slave, for the talk. But I have to go now...", you step towards Mayor Thomas’s office door, but Ellie interrupts you,</p>' +
					'<p>"' + perYou.getMaster() + ', don’t you want to inspect what new skills I have to offer to you?", she doesn’t even wait for your answer. Ellie lets loose her clothes, she unbuttons her grey vest while she continues talking.</p>' +
					'<p>"As I have said...it’s been so long without you, ' + perYou.getLord() + ', My ' + perYou.getMaster() + '. I have missed you with all my heart and body. You don’t know how we, your slaves, long after you when you are not in our presence...", Ellie seems determined, yet there is clear craving in her voice. Her vest and shirt are no longer held together by the buttons revealing a blue bra to you.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, '"I do know and understand Ellie"', 95,  'type=ellie4');
				WritePlaceFooter(md);
				return true;
			}
			// Meet ellie before 4
			if (sType == "ellie4") {
				md = WritePlaceHeader();

				this.showPerson("trioeventellie4.jpg");
				addPlaceTitle(md, "Ellie");
				md.write(
					'<p>You tell Ellie, "I do know and understand Ellie. Those servants of mine can be a bit more persuasive...", Ellie holds your hands and leads you back to the couch in front of the sofa. She sits down and goes on what she’s been doing.</p>' +
					'<p>"Thank you ' + perYou.getPersonName() + '! I promise to keep you entertained. Anyways, how do you like my new dress? Kristin wanted me to buy something fresh, to celebrate the beginning of my brand-new life!", her grin could melt steel. She drops both the shirt and vest, the next is the skirt.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"It’s...uhm...pretty nice!"', 95,  'type=ellie5');
				WritePlaceFooter(md);
				return true;
			}
			// Meet ellie before 5
			if (sType == "ellie5") {
				md = WritePlaceHeader();

				this.showPerson("trioeventellie5.jpg");
				addPlaceTitle(md, "Ellie");
				md.write(
					'<p>You hesitantly reply, "It’s...uhm...pretty nice! You’ve got my approval!", you are searching for words as you are looking at your slave, who looks stunning in her underwear.</p>' +
					'Ellie says, "Thank you! This is my only purpose, to help and serve you! You look a bit tired, let your mind go off a bit and just enjoy the view. This ass only wiggles for you!", she throws away her skirt too and lets you have a good look at her firm bottom. She cheekily asks,</p>' +
					'<p>How do you like them?", Ellie bounces her butt a bit and comes close to you. You can’t take it anymore, you bite into her two round ass cheeks.</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'sometime later', 95,  'type=ellie6');
				WritePlaceFooter(md);
				return true;
			}
			// Meet ellie before 6
			if (sType == "ellie6") {
				md = WritePlaceHeader();

				this.showPerson("trioeventellie6.jpg");
				addPlaceTitle(md, "Ellie");
				md.write(
					'<p>You tell Ellie, "You keep yourself in good shape. I order you to be it that way.", you are like a child who can’t enough of a good present.</p>' +
					'<p>Ellie happily replies "As my ' + perYou.getMaster() + ' commands! Now that all those stress came out from you I think it is time to go and see your other slaves. Don’t worry ' + perYou.getMaster() + ', I will be waiting here outside!"</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'you continue into the Mayor\'s office', 110);
				WritePlaceFooter(md);
				return true;
			}

			if (!this.checkFlag(6) && (this.checkFlag(3) || checkPersonFlag("Angela", 10))) {
				// Trio Event Start
				// Meet Ellie before 1
				md = WritePlaceHeader();
				var perAngela = findPerson("Angela");

				this.showPerson("trioeventellie1.jpg");
				addPlaceTitle(md, "Ellie and Angela");
				md.write(
					'<p>Angela is sitting at her usual place, typing, and seems focused on her work. Not far away from her is Ellie, the bank teller, standing near a sofa that is for visitors or guests who have to wait when they want to visit the mayor. She is looking around inquisitively, watching the pictures, the computers and the furniture. She must be impressed by all the luxury and quality of the office.</p>' +
					'<p>You two share a long gaze which is finally broken when Ellie jumps between your arms, her hair brushing in your face and gives you a welcoming kiss. Ellie then tells you,</p>' +
					'<p>"Well, lookie here! If it ain\'t my darling! The others are already in office, waiting for you. But why should you hurry when we could be to ourselves for a bit. They can wait and I haven’t seen you for a while! My body is ready to be used again!"</p>'
				);
				startQuestions();

				addPopupLinkToPlaceC(md, '"Sorry babe, I don’t have the time..."', 110, '', 'Ellie', 'you tell her &quot;Sorry babe, I don’t have the time… I’m busy. Now be a good girl and wait here while I talk with your boss.&quot;<br><br>Ellie, almost bursting out in tears holds her hands together and bows at your order. She is definitely sad that you have turned her offer down, but she is just a slave, a nobody to you and you really don&rsquo;t have the time or mood to be in her company. You barge into the Mayor&rsquo;s round, elegant office with haste.');
				addLinkToPlaceC(md, '"You are right Ellie..."', 95, 'type=ellie2');
				AddPeopleColumn(md);
				perAngela.showPerson("Small|angela1d.jpg");
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place != 430 && Place != 423) return false;

		var clv = this.isCharmedBy("You") ? this.getCharmedLevel() : 0;
		var herName = this.getPersonName();
		
		if (Place == 423) {
			
			if (sType == "elliepool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Ellie");
				md.write(
					'<p>Ellie quicky changes and joins you wearing a cute bikini, smiling as always.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is private here...', Place, 'type=elliepoolsex');
				addLinkToPlaceC(md, 'finish swimming and get dressed', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "elliepoolsex") {
				md = WritePlaceHeader();
				this.showPersonRandom("pool-sex", 2);
				addPlaceTitle(md, "Playing in and near the Pool");
				md.write(
					'<p>You ask Ellie to play with you more privately, and she seductively removes her swimsuit, ready for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'finish and get dressed', Place);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType === "pooloral") {
				md = WritePlaceHeader(false, "td-left-large");
				this.showPerson("ellie28.jpg");
				if (clv == 4) addPlaceTitle(md, herName + ' Showing Her Devotion');
				else addPlaceTitle(md, herName + ' Showing Her Love');
				
				if (clv == 4) {
					md.write(
						'<p>You order your new slave to show her obedience and devotion. Ellie looks at you, unsure what you mean, but smiles as you remove your clothing and sit down on the edge of the pool.</p>'
					);
					if (perYou.isBornMale()) {
						md.write(
							'<p>She kneels and takes over, pulling down your underwear and taking your cock and balls into her hands. She starts to lick along the entire length of your shaft, and you can tell she is no novice but also not all too practiced ether. Still, she is talented enough, and shows her somewhat playful nature as she pleases you.</p>' +
							'<p>You decide to enforce your dominance of her a little more, and while she is licking the head of your cock you firmly grasp her hair and make it clear she is to go deeper, as deep as she can. She tries to accommodate you but she has definitely not done this before. She manages to get a bit over half your length into her mouth and throat before you call out "Now swallow, Slave!" and cum into her throat. She gags a little, but manages to keep most of it inside, swallowing obediently and looking up at you, the smile returning to her face.</p>'
						);
					} else {
						md.write(
							'<p>She looks at you uncertain, hesitating until you reinforce your order and she finally steps into the pool to nervously lick your pussy.</p>' +
							'<p>Well, at least for about 5 seconds, before she backs away and lowers her head in shame. “Y..your slave apologizes, mistress. But she is not a lesbian.... she can\'t do that.</p>' +
							'<p>Well, that was unexpected, you reach down and lift her chin to check her eyes, but she is clearly under your spell, you can feel your mana flowing through her body and see the pink shine in her eyes.</p>' +
							'<p>“Slave Ellie.” You speak firmly. You will do as you are told, and not question my orders.</p>' +
							'<p>The pink glow flares up and again, her head moves forward, but to your amazement, she again resists.</p>' +
							'<p>“I... your slave really can\'t do this, mistress... It.... does not feel right...” Her head slumps down again” Sorry, mistress.”</p>' +
							'<p>So, even with the spell in full effect, she has enough willpower to deny certain orders... you admit you are somewhat impressed, and decide to relent until you know more about this, telling her that she will not be required to serve you like this... for now.</p>'
						);
					}
					md.write(
						'<p>Finally, you address her: “Slave Ellie, go and clean up and I will meet you inside"</p>' +
						'<p>Ellie smiles and walks into the house, still completely naked...</p>'
					);
					
				} else {
					// Lover
					md.write(
						'<p>You move to make her lie down on the sun-lounge, but as you try to press your body against hers, she suddenly recoils from your touch.</p>' +
						'<p>"Ouugh, I... just had a horrible vision of someone else...not you..."</p>' +
						'<p>You realize she still has some memories of Davy and suggest delaying this for a while, but she shakes her head.</p>' +
						'<p>"N...no, It\'s fine. Let me show you my love another way, instead."</p>' +
						'<p>She steps into the pool and gestures for you to sit on the edge,, reaching out with both hands to open your pants, but once again recoils after a few seconds, looking both confused and embarrassed.</p>' +
						'<p>“Come to think of it, Your mom might hear us.” You finally interrupt her, realizing that she might still be fighting both your charm and the memories of her time as Davys slave  in her subconsciousness.“ We might be taking this too fast, anyway, '
					);
					if (!perYou.isBornMale()) md.write('and you didn\'t even know you could fall for another woman until now, ');
					md.write(
						'so we better give it some time.</p>' +
						'<p>Ellie still looks a little embarrassed, but also relieved, and quickly nods. You tell her that it\'s best if the two of you return inside now, and that you can talk later.</p>' +
						'<p>Ellie smiles and agrees before she gives you a kiss and grabs her towel and swimsuit on her way into the house, not bothering to re-dress...</p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, 'leave the pool', 420);
				WritePlaceFooter(md);
				return true;
			}
			if (sType.indexOf("ellie") == -1) return false;
			
			// Charm her at the Pool
			md = WritePlaceHeader(false, sType === "ellie26" || (sType === "" && this.place == 423) ? "td-left-large" : "");
			this.showPerson(sType + ".jpg");

			if (sType === "ellie22") addPlaceTitle(md, "Ellie Freed from Davy\'s Spell");
			else addPlaceTitle(md, "Ellie Under a Charm Spell");

			if (sType === "ellie22") {
				this.unCharmThem();	// Ellie freed from Davy's control
				md.write(
					'<p>The ring glows as you clasp it in your fist and focus on the mana powering the <i>charm</i> over Ellie, absorbing it within moments.</p>' +
					'<p>Ellie looks startled, scanning the area in confusion.</p>' +
					'<p>"Where am... is this our pool?" How did I...</p>'
				);
				if (!isInvisible()) {
					md.write(
						'<p>When she finally notices you, her eyes widen in shock. "Who are you, didn\'t we meet somewhere... recently? “ It seems the memory slowly catches up with her and tears begin to form. ”Davy... he told me to... hurt you...”</p>' +
						'<p>“No...no, this is not right, what happened to me?”</p>'
					);
				}

				// Questions
				startQuestions();

			} else if (sType === "ellie23") {
				// Ellie Charmed 1
				this.place = 422;	// If you leave she moves to the lounge room
				md.write(
					'<p>You recite the words of the spell and Ellie looks at you in surprise,</p>' +
					'<p>"I know those words, they are from a song Davy sung for me... but they make me feel..."</p>' +
					'<p>Her words trail off as the spell works itself into her mind and body again. She lies down on the inflatable, deep in thought, a soft sigh coming from her.</p>' +
					'<p>You are a little torn here, she is troubled by her time under Davy\'s influence and now you are doing the same to her. You ' + (perYou.checkFlag(26) ? 'could' : 'can') + ' make her your obedient little slave as Davy did, she is very cute and will be a delightful slave.'
				);
				if (perYou.checkFlag(26)) {
					md.write(' You could also be gentler and convince her she has fallen in love with you dramatically, she will not be as obedient, but still yours and protected from Davy. It depends on what you want.');
				}
				md.write('</p>');

				startQuestions();
				addLinkToPlaceO(md, 'enslave Ellie', 423, 'type=ellie24', '', '', "charmPerson('Ellie',4);");
				if (perYou.checkFlag(26)) addLinkToPlaceO(md, 'charm Ellie', 423, 'type=ellie24', '', '', "charmPerson('Ellie',2);");

			} else if (sType === "ellie24") {
				// Ellie Charmed 2
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>Ellie stands in the shallow part of the pool, and as she does you firmly tell her "Forget about the song, it does not matter to you, all you need to do it listen to me and do what I ask you"</p>' +
						'<p>She turns to look at you surprised, her hands covering herself and she replies,</p>' +
						'<p>"What do you mean, what <b>are</b> you asking me to do?"</p>' +
						'<p>You reply firmly "It does not matter what, you just want to do anything I ask of you, don\'t you?"</p>' +
						'<p>Your words almost pound into her and for a moment her ever present smile fades, she then hesitantly says,</p>' +
						'<p>"I do...not...think I barely know you...you are ' + perYou.getPersonName() + ' right..."</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, 'ask her to remove the swimsuit', 423, 'type=ellie25');
					
				} else {
					// Lover
					md.write(
						'<p>Ellie looks thoughtful and slips off of the float to stand in the shallow part of the pool. You speak to her and she turns to face you, her hands covering herself as best she can. "Ellie, you should not worry about that song, but I can see how you are looking at me. Do you actually like me?"</p>' +
						'<p>Ellie looks at you curiously, "Well... I am feeling a bit... odd...'
					);
					if (perYou.isBornMale()) md.write('but yes you are handsome');
					else md.write('and yes, you are beautiful... but I am not really into girls');
					md.write(
						'..."</p><p>She looks at you more closely, and as the idea of you as a potential lover sinks into her mind, you reinforce it,</p>' +
						'<p>"You are a very cute girl and I did not come here expecting you to <b>fall in love with me</b>, I mean love at first sight is something for romance novels"</p>' +
						'<p>She hesitates as your words sink in more, pulling in her lower lip before she replies, "Love at first sight..." and you see a blush pass across her face, or maybe a flush of arousal.</p>'
					);
					if (!perYou.isBornMale()) md.write('<p>“N... no.” She suddenly shakes her head. “I may have two mothers, and I really believe that you should love whoever you want... but I\'m only into guys."</p>');

					startQuestions();
					addLinkToPlaceO(md, 'increase her desire', 423, 'type=ellie25');
				}

			} else if (sType === "ellie25") {
				// Ellie Charmed 3
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>Ellie looks surprised and starts to get out of the pool, and with her remaining willpower, she folds her arms in a desperate attempt to keep them from moving.</p>' +
						'<p>"No, I don\'t think so, I cannot remove my swimsuit, I barely know you ' + perYou.getPersonName() + '"</p>' +
						'<p>You focus on the magical link between you and Ellie, forcing your will on her and reply simply,</p>' +
						'<p>"You do not have to worry about these things, or think about anything other than obeying me, and you should not call me ' + perYou.getPersonName() + '"</p>' +
						'<p>She looks confused, the spell slowly taking its toll, "Why...what should I call you?"</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, 'You tell her "' + perYou.getMaster() + '"', 423, 'type=ellie26');

				} else {
					// Lover
					md.write(
						'<p>You focus on her and the magical link between you and Ellie, willing her to desire you more and more.</p><p>'
					);
					if (perYou.isBornMale()) md.write('“I feel like there is a connection between you and me, is there?”');
					else md.write('“But if we are supposed to love whoever we want, can we really afford to not take a chance to find love because of our gender?”');
					md.write(
						'<p>She contemplates your words briefly, then looks at you smiling,</p>' +
						'<p>"It is so strange how attractive you are, do you like me too?"</p>' +
						'<p>She starts to tease you, as she starts to get out of the pool leaning low to show you her cleavage and down into her swimsuit. She looks back you expectantly.</p>' +
						'<p>There is only one real answer to her question, even if you do not really mean it, yet...</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, 'Yes, and I love you', 423, 'type=ellie26');
				}

			} else if (sType === "ellie26") {
				// Ellie Charmed 4
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>She looks troubled, "' + perYou.getMaster() + ' that\'s not right, that would mean I was some sort of servant..."</p>' +
						'<p>You reply firmly,</p>' +
						'<p>"No, that means you are my slave, who will obey me, doing anything I ask at anytime.<br>And now, my slave, you will strip!"</p>' +
						'<p>She struggles, but the spell easily compels her to quickly strip out off her swimsuit, and mustering her last tiny measure of control, she almost whispers,</p>' +
						'<p>"I wont\'t...I can\'t do some things, I know there was something I had to do, but I can\'t hurt..."</p>' +
						'<p>You see how troubled she is about some orders Davy had given her before, and how there are some limits of what she will do, no matter what you say. You relent a little,</p>' +
						'<p>"I will never order you to harm another, that is not what I want from you as my slave. Obey me and only think of what I desire and my pleasure, as the slave you are."</p>' +
						'<p>She looks at you nervously, but your assurance seems to put her somewhat at ease as the spell washes away the last traces of doubt and resistance, a blissful smile forming on her lips "Yes, ' + perYou.getMaster() + '"</p>'
					);
					
					startQuestions();
					addLinkToPlaceC(md, '"Prove your obedience"', 423, 'type=ellie27');

				} else {
					// Lover
					md.write(
						'<p>Ellie looks radiantly happy and replies "I love you too!"</p>'
					);
					if (!perYou.isBornMale()) {
						md.write('<p>Ellie looks a little troubled, "Still you are a girl, I am not a lesbian or even bi-sexual, but I do love you...". You reassure her the love is love and that labels like "lesbian" do not matter. While she is still a little troubled, she puts the issue to the side.</p>');
					}
					md.write('<p>Ellie looks radiantly happy to hear this and  quickly replies "I love you too!"</p>');

					if (!perYou.isBornMale()) {
						md.write(
							'<p>The spell seems to have fully claimed her, and yet, some resistance still lingers. “I am not sure why, I <b>am</b> not a lesbian... I\'m not even Bisexual...</p>' +
							'<p>You tell her that labels like “Straight” and “Lesbian do not matter because love is love, and while she still seems a little troubled, she lets the issue rest for now.</p>'
						);
					}
					md.write(
						'<p>Ellie smiles then and starts to remove her swimsuit, turned to the side to possibly preserve a little modesty, but mainly to show off her figure. She looks at you, the arousal from the magic spell still working itself on her.</p>' +
						'<p>"Do you want more, my love?"</p>'
					);
					
					startQuestions();
					addLinkToPlaceC(md, '"Yes, I do"', 423, 'type=ellie27');
				}

			} else if (sType === "ellie27") {
				// Ellie Charmed 5
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>Ellie drops her swimsuit and sits there before you, naked and beautiful. She smiles,</p>' +
						'<p>' + perYou.getMaster() + ', what can your slave do to prove her devotion?"</p>' +
						'<p>You are a little surprised, and pleased, at the way she addresses you. She seems to have completely adopted a slave attitude, even referring to herself as a slave and not by name. You can see she is yours now, to do anything you like, as long as you do not cross a certain line and ever ask her to harm another person.</p>' +
						'<p>You look at your smiling slave and decide how to proceed,</p>'
					);

					startQuestions();
					addLinkToPlaceO(md, 'dominate her more', 423, 'type=pooloral');

				} else {
					// Lover
					md.write(
						'<p>Playfully Ellie throws away her swimsuit and sits there before you, completely naked in all her beauty, and as you admire her body, her lips form a wide smile.</p>' +
						'<p>She leans in and kisses you, but while you can feel the force of the spell still coursing though her and reinforcing her feelings, the actual kiss is brief and still hesitant.</p><p>'
					);
					if (perYou.isBornMale()) md.write('“I can\'t believe how quick I fell for you, my love...”');
					else md.write('“I\'m actually in love with another woman...”');
					md.write(
						'</p><p>She whispers as she breaks the kiss and looks deeply into your eyes, desire and love filling her expression,</p>' +
						'<p>Shall we...here?</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"Yes, I need you now"', 423, 'type=pooloral');
				}
			}
			addLinkToPlace(md, 'leave the pool', 420);
			WritePlaceFooter(md);
			return true;
		}
		
		if (this.place == 420 && clv === 0) this.place = 430;
		if (this.place == 430 && clv > 0) this.place = 422;

		if (sType === "visitellie") {
			md = WritePlaceHeader();
			this.showPerson("ellie3a.jpg");
			addPlaceTitle(md, this.getPersonName() + ' In The Spare Room');

			if (this.isCharmedBy("Davy")) {
				md.write(
					'<p>This is a small guest room with basic furniture, a bed and side table and fitted wardrobe.</p><p>Ellie is sitting on the bed looking rather annoyed at you,</p>' +
					'<p>"I see you got here like <i>a bat out of hell</i>. Get out of here, I\'ll have Kristin call the police!"</p>');
			} else {
				md.write(
					'<p>This is a small guest room with basic furniture, a bed and side table and fitted wardrobe.</p><p>Ellie is sitting on the bed looking puzzled as if she is trying to work something out. She looks up at you,</p>' +
					'<p>"Hello didn\'t we just meet somewhere, sorry I have been very forgetful recently, it seems I can only vaguely remember some recent things. Odd I normally have a good memory.<br/>Ummm...you are a friend of Aunt.. I mean of Kristin\'s, I have not seen you at the Bank...or maybe...are you a customer?"</p>');
			}
			startQuestions();
			addLinkToPlace(md, 'exit the house', 5);
			WritePlaceFooter(md);
			return true;	
		}
		
		if (sType == "elliefreed") {
			md = WritePlaceHeader();
			this.showPerson("ellie3b.jpg");
			addPlaceTitle(md, this.getPersonName() + ' In The Spare Room');

			if (getQueryParam("by") == "Tina") md.write('<p>Tina concentrates on Ellie and you feel the the mana powering the charm over Ellie flow from her into you.</p>');
			else md.write('<p>The ring glows as you clasp it in your fist and focus on the mana powering the charm over Ellie, absorbing it within moments.</p>');
			md.write(
				'<p>Ellie looks startled, scanning the room in confusion.</p>' +
				'<p>"Where am I...? Is...is this Kristins place...?"</p>' +
				'<p>When she finally notices you, her eyes widen in shock. "Who are you, didn\'t we meet somewhere... recently? “ It seems the memory slowly catches up with her and tears begin to form.” Oh no... I did... he did... I\'m so sorry!”</p>' +
				'<p>She picks up a phone from a side table and then says "I\'m Sorry, but I need to go home, need to find out what happened... maybe see Kristin first."</p>' +
				'<p>Ellie is clearly confused and pays little attention to you, if you want to charm her, this might be the last chance you get before she returns home, making it much harder, if not impossible to get her.</p>'
			);
			AddMana(5);
			this.unCharmThem();	// Ellie freed from Davy's control

			startQuestions();
			addLinkToPlace(md, 'exit the house', 5);
			WritePlaceFooter(md);
			return true;

		} else if (sType === "elliebj") {
			md = WritePlaceHeader(false, perYou.isMaleSex() || isExplicit() ? 'td-left-large' : '');
			if (perYou.isMaleSex()) this.showPersonRorX("ellie19b.jpg");
			else this.showPersonRorX("ellie19g.jpg");
			if (clv == 4) addPlaceTitle(md, this.getPersonName() + ' Showing Her Devotion');
			else addPlaceTitle(md, this.getPersonName() + ' Showing Her Love');
			this.place = 422;
			if (clv == 4) {
				// Slave
				md.write('<p>You order your new slave to show her obedience and devotion. Ellie looks at you, unsure what you mean, but smiles as you remove your clothing and sit down on the bed.</p>');
				if (perYou.isBornMale()) {
					md.write(
						'<p>She kneels and takes over, pulling down your underwear and taking your cock and balls into her hands. She starts to lick along the entire length of your shaft, and you can tell she is no novice but also not all too practiced ether. Still, she is talented enough, and shows her somewhat playful nature as she pleases you.</p>' +
						'<p>You decide to enforce your dominance of her a little more, and while she is licking the head of your cock you firmly grasp her hair and make it clear she is to go deeper, as deep as she can. She tries to accommodate you, but she has definitely not done this before.</p>' +
						'<p>She manages to get a bit over half your length into her mouth and throat before you call out "Now swallow, Slave!" and cum into her throat. She gags a little, but manages to keep most of it inside, swallowing obediently and looking up at you, the smile returning to her face.</p>'
					);
				} else {
					md.write(
						'<p>She looks at you uncertain, hesitating until you reinforce your order and she finally kneels before the bed to nervously lick your pussy.</p>' +
						'<p>Well, at least for about 5 seconds, before she backs away and lowers her head in shame. “Y..your slave apologizes, mistress. But she is not a lesbian.... she can\'t do that.</p>' +
						'<p>Well, that was unexpected, you reach down and lift her chin to check her eyes, but she is clearly under your spell, you can feel your mana flowing through her body and see the pink shine in her eyes.</p>' +
						'<p>“Slave Ellie.” You speak firmly. You will do as you are told, and not question my orders.</p>' +
						'<p>The pink glow flares up and again, her head moves forward, but to your amazement, she again resists.</p>' +
						'<p>“I... your slave really can\'t do this, mistress... It.... does not feel right...” Her head slumps down again” Sorry, mistress.”</p>' +
						'<p>So, even with the spell in full effect, she has enough willpower to deny certain orders... you admit you are somewhat impressed, and decide to relent until you know more about this, telling her that she will not be required to serve you like this... for now.</p>'
					);
				}
				md.write(
					'<p>"Slave Ellie, return to your home, I will visit you then once I am ready."</p>' +
					'<p>Ellie smiles and quickly puts on some of her clothing as she leaves the room, making sure you get a good view of her as she dresses.</p>'
				);
			} else {
				// Lover
				md.write(
					'<p>You move to make her lie down on the bed, but as you try to press your body against her, she suddenly recoils from your touch.</p>' +
					'<p>"Ouugh, I... just had a horrible vision of someone else...not you..."</p>' +
					'<p>You realize she still has some memories of Davy and suggest delaying this for a while, but she shakes her head.</p>' +
					'<p>"N...no, It\'s fine. Let me show you my love another way, instead."</p>' +
					'<p>She asks you to sit down and kneels before you, reaching out with both hands to open your pants, but once again recoils after a few seconds, looking both confused and embarrassed.</p>' +
					'<p>“Come to think of it, Kristin might hear us.” You finally interrupt her, realizing that she might still be fighting both your charm and the memories of her time as Davys slave in her subconsciousness.“ We might be taking this too fast, anyway, '
				);
				if (!perYou.isBornMale()) md.write('and you didn\'t even know you could fall for another woman until now, ');
				md.write(
					'so we better give it some time.</p>' +
					'<p>Ellie still looks a little embarrassed, but also relieved, and quickly nods. You tell her that it\'s best if she returns home now and that you will meet her later.</p>' +
					'<p>Ellie smiles and quickly puts on some of her clothing, making sure you get a good view of her as she dresses. She kisses your cheek and waves goodbye as she leaves the room.</p>'
				);
			}

			startQuestions();
			addLinkToPlace(md, 'exit the house', 5);
			WritePlaceFooter(md);
			return true;
			
		} else if (sType === "elliereturnhome") {
			md = WritePlaceHeader();
			this.showPerson("ellie20.jpg");
			addPlaceTitle(md, this.getPersonName() + ' Returns Home');
			this.place = 422;
			if (clv == 4) {
				md.write(
					'<p>You decide that it is time for your slave to leave here, and order her to return home and wait for you there. She stands and you see her there naked before the window and she says,</p>' +
					'<p>"Yes ' + perYou.getMaster() + ' this slave will return to her home, and await your presence"</p>' +
					'<p>She starts to walk out, ignoring her clothing, and you tell her that she should get dressed. She smiles "Of course ' + perYou.getMaster() + '", and dresses. You sense something of her normal self shining through the slave personna, or is it act?. She finishes dressing and with a longing glance she leaves the room.</p>'
				);
			} else {
				md.write(
					'<p>You tell Ellie not here Kristin\'s home and she agrees that she should return home and wait for you there.</p>' +
					'<p>She stands and you see her there naked before the window smiling at you and she says,</p>' +
					'<p>"' + perYou.getPersonName() + ' I really should get dressed before I leave."</p>' +
					'<p>She turns around a little giving you a good show and then dresses quickly. She gives you a kiss on the cheek and waves goodbye as she leaves the room.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, 'exit the house', 5);
			WritePlaceFooter(md);
			return true;
			
		} else if (sType.indexOf("ellie") != -1) {
			// Charm Ellie
			md = WritePlaceHeader();
			this.showPerson(sType + ".jpg");
			addPlaceTitle(md, this.getPersonName() + ' Under a Charm Spell');

			if (sType === "ellie4") {
				// Ellie Charmed 1
				md.write(
					'<p>You recite the words of the spell and Ellie looks at you in surprise,</p>' +
					'<p>"I know those words, they are from a song Davy sung for me... but they make me feel..."</p>' +
					'<p>Her words trail off as the spell works itself into her mind and body again. She turns away from you, deep in thought, a soft sigh coming from her. The bank teller gives you a lovely view of her assets as she does so.</p>' +
					'<p>You are a little torn here, she is troubled by her time under Davy\'s influence and now you are doing the same to her. You ' + (perYou.checkFlag(26) ? 'could' : 'can') + ' make her your obedient little slave as Davy did, she is very cute and will be a delightful plaything.' + (perYou.checkFlag(26) ? 'You could also be gentler and convince her she has fallen in love with you dramatically, she will not be as obedient, but still yours and protected from Davy. It depends on what you want.' : '') + '</p>'
				);

				startQuestions();
				addLinkToPlaceO(md, 'enslave Ellie', 430, 'type=ellie5', '', '', "charmPerson('Ellie',4);");
				if (perYou.checkFlag(26)) addLinkToPlaceO(md, 'charm Ellie', 430, 'type=ellie5', '', '', "charmPerson('Ellie',2);");

			} else if (sType === "ellie5") {
				// Ellie Charmed 2
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>You firmly tell Ellie "Forget about the song, it does not matter to you, all you need to do is listen to me and do what I ask you"</p>' +
						'<p>She stands up on the bed, but is shaken by the spell and needs to stretch to catch her balance,</p>' +
						'<p>"What do you mean, what <b>are</b> you asking me to do?"</p>' +
						'<p>You reply firmly "It does not matter what, you just want to do anything I ask, don\'t you?"</p>' +
						'<p>Your words almost pound into her and for a moment her ever present smile fades, she then hesitantly says,</p>' +
						'<p>"I do...not...think I barely know you...you are ' + perYou.getPersonName() + ' right..."</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, 'ask her to strip', 430, 'type=ellie6');
				} else {
					// Lover
					md.write(
						'<p>You speak to her as she stands on the bed as if looking for the song. "Ellie, you should not worry about that song, but I can see how you are looking at me. Do you actually like me?"</p>' +
						'<p>Ellie looks at you curiously, "Well... I am feeling a bit... odd...'
					);
					if (perYou.isBornMale()) md.write('but yes you are handsome');
					else md.write('and yes, you are beautiful... but I am not really into girls');
					md.write(
						'..."</p><p>She looks at you more closely, and as the idea of you as a potential lover sinks into her mind, you reinforce it,</p>' +
						'<p>"You are  very cute yourself and I did not come here expecting you to fall in love with me, I mean love at first sight is something for romance novels."</p>' +
						'<p>She hesitates as you words sink in more, pulling in her lower lip before she replies, "Love at first sight..." and you see a blush pass across her face, or maybe a flush of arousal.</p>'
					);
					if (!perYou.isBornMale()) md.write('<p>“N... no.” She suddenly shakes her head. “I may have two mothers, and I really believe that you should love whoever you want... but I\'m only into guys.</p>');

					startQuestions();
					addLinkToPlaceO(md, 'increase her desire', 430, 'type=ellie6');
				}

			} else if (sType === "ellie6") {
				// Ellie Charmed 3
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>Ellie looks at you in surprise and subconsciously takes off her top before suddenly covering herself with her last remaining willpower,</p>' +
						'<p>"No, I don\'t think so! I barely know you, ' + perYou.getPersonName() + '"</p>' +
						'<p>You focus on the magical link between you and Ellie, forcing your will on her and reply simply,</p>' +
						'<p>"You do not have to worry about these things, or think about anything other than obeying me, and you should not call me ' + perYou.getPersonName() + '"</p>' +
						'<p>She looks confused, the spell slowly taking its toll, "Why... what should I call you?"</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, 'you tell her "' + perYou.getMaster() + '"', 430, 'type=ellie7');

				} else {
					// Lover
					md.write(
						'<p>You focus on her and the magical link between you and Ellie, willing her to desire you more and more. She looks at you smiling,</p>' +
						'<p>"It is so strange how attractive you are. Well, do you like me too?"</p>' +
						'<p>She starts to tease you, removing parts of her clothes to give you a glimpse of her body and likely going much farther than she meant to under the influence of your spell. Her top soon flies off completely, and she is not wearing a bra.</p>' +
						'<p>There is only one real answer to her question, even if you do not really mean it, yet...</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"Yes, I love you"', 430, 'type=ellie7');
				}

			} else if (sType === "ellie7") {
				// Ellie Charmed 4
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>She looks troubled, "' + perYou.getMaster() + ' that\'s not right! That would mean I was some sort of servant...!"</p>' +
						'<p>You reply firmly,</p>' +
						'<p>"No, that means you are my slave, who will obey me, doing anything I ask, anytime.<br>' +
						'And now, my slave, you will strip!"</p>' +
						'<p>She lets herself fall back with a blissful gasp and removes her skirt, but still maintains some tiny measure of control, she almost whispers,</p>' +
						'<p>"I wont\'t...I can\'t do some things, I know there was something I had to do, but I can\'t...hurt..."</p>' +
						'<p>You see how troubled she is about some orders Davy had given her before and how there are some limits of what she will do, no matter what you say. You relent a little,</p>' +
						'<p>"I will never order you to harm another, that is not what I want from you as my slave. Obey me and only think of what I desire and my pleasure, and you will be happy as the slave you are."</p>' +
						'<p>She looks at you nervously, but your assurance seems to put her somewhat at ease as the spell washes away the last traces of doubt and resistance, a blissful smile forming on her lips "Yes, ' + perYou.getMaster() + '"</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"Prove your obedience"', 430, 'type=ellie9');

				} else {
					// Lover
					md.write(
						'<p>Ellie looks radiantly happy to hear this and  quickly replies "I love you too!"</p>' +
						'<p>Ellie smiles and lets herself fall back with a sigh to removes her skirt, giving you a good view of her panties. She looks at you, the arousal from the magic spell still working itself on her.</p>' +
						'<p>"Do you want to see more, my love?"</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"Yes, I do"', 430, 'type=ellie9');

				}

			} else if (sType === "ellie9") {
				// Ellie Charmed 6
				this.place = 422;
				if (clv == 4) {
					// Enslave
					md.write(
						'<p>Ellie drops the skirt and kneels there before you on the bed, almost naked and very beautiful, with a wide smile,</p>' +
						'<p>' + perYou.getMaster() + ' what can you slave do to prove her devotion?"</p>' +
						'<p>You are a little surprised, and pleased, at the way she addresses you. She seems to have completely adopted a slave attitude, referring to herself as a slave and not by name. You can see she is yours now, to do anything you like, as long as you do not cross a certain line and ever ask her to harm another person.</p>' +
						'<p>You look at your smiling slave and decide how to proceed,</p>'
					);

					startQuestions();
					addLinkToPlaceO(md, 'dominate her more', 430, 'type=elliebj');
					addLinkToPlaceC(md, 'tell her to return to her home and wait for you there', 430, 'type=elliereturnhome');

				} else {
					// Lover
					md.write(
						'<p>Playfully Ellie throws away her skirt and knees on the bed before you, nearly naked in all her Beauty and smiling as you admire her body.</p>' +
						'<p>She leans in and kisses you, but while you can feel the force of the spell still coursing though her and reinforcing her feelings, the actual kiss is brief and still hesitant.</p><p>'
					);
					if (perYou.isBornMale()) md.write('“I can\'t believe how quick I fell for you, my love...”');
					else md.write('“I\'m actually in love with another woman...”');
					md.write(
						' She whispers as she breaks the kiss and looks deeply into your eyes, desire and love filling her expression,</p>' +
						'<p>Shall we...here?</p>'
					);

					startQuestions();
					addLinkToPlaceC(md, '"I need you now"', 430, 'type=elliebj');
					addLinkToPlaceC(md, '"Not here, meet me at your home"', 430, 'type=elliereturnhome');

				}
			}
			addLinkToPlace(md, 'exit the house', 5);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		// Common questions
		if (Place == 423 && this.whereNow() == 422 && sType === "") addLinkToPlaceO(md, 'ask Ellie to join you for a swim', 423, 'type=elliepool');
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Using/Examining the Silver Ring
		if (no == 32) {
			var eNow = this.whereNow();
			if (cmd == 1) {
				// Examine the Silver Ring
				if ((Place == 421 && eNow === 421) ||
					 (Place == 81 && eNow === 81) ||
					 (Place == 430 && eNow === 430 && this.isCharmedBy("Davy")) ||
					 (Place == 423 && eNow == 423) ||
					 (Place == 225 && eNow === 225 && this.isCharmedBy("Davy")))
				{
					examineSilverRingStart();
					addComments(
						'<p>It seems to be reacting to Ellie\'s presence... getting warmer the closer you get.</p>' +
						'</td></tr></table>'
					);
					return "handled";
				}
			} else if (cmd == 2) {
				// Use the Silver Ring
				if (Place == 81 && eNow === 81)
				{
					useSilverRingStart();
					addComments('<p>You use the ring</p></td></tr></table>');
					dispPlace(81, "type=ellie10b");
					return "handled";
				}
				else if (Place == 421 && eNow === 421)
				{
					// At the Pond and Ellie is charmed
					useSilverRingStart();
					addComments('<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over Ellie.</p>');
					if (isInvisible()) addComments('<p>She looks very confused and before you can do anything, mutters,</p><p>"I know I had to hurt someone, I do not remember who."</p>');
					else addComments('<p>She looks very confused and before you can do anything, she steps over to you and slaps you hard, and then looks horrified,</p><p>"I\'m sorry, I do not know what came over me, I know I had to hurt someone, I do not remember who."</p>');
					addComments('<p>Tears come to her eyes and she runs back toward the park entrance.</p></td></tr></table>');
					AddMana(5);
					this.moveThem(420);
					return "refresh";
				}
				else if (Place == 430 && eNow === 430 && this.isCharmedBy("Davy"))
				{
					useSilverRingStart();
					addComments('<p>You use the ring</p></td></tr></table>');
					dispPlace(430, "type=elliefreed");
					return "handled";
				}
				else if (Place == 423 && eNow == 423) {
					// Ellie at the Bartel's House Swimming Pool
					useSilverRingStart();
					addComments('<p>You use the ring</p></td></tr></table>');
					dispPlace(423, "type=ellie22");
					return "handled";
				}
			}
		}

		// Casting the charm spell
		else if (no == 14 && cmd == 2) {

			//Davy's Room
			if (Place == 81) {
				// Ellie here and charmed by Davy
				if (this.whereNow() == 81 && this.isCharmedBy("Davy")) {
					addComments('<p>You recite the spell, it fails, it seems she is under the effect of a charm spell by someone else.</p>');
					return "handled";
				} else {
					CastCharmSpell("Ellie", 81, 1, "type=ellie11");		//Charm Ellie
					return "handled";
				}
			
			} else if (Place == 225 && this.isHere() && !this.isCharmedBy()) {
				addComments("You can't cast that here. Look at all the cameras!");
				if (isSpellKnown("Shielded Charm")) addComments(' Even with the Shielded Charm it would be most unwise to try and charm someone in a place like this.');  // know shielded Charm
				addComments(' You will have to try this on Ellie somewhere else.');
				setPersonFlag("Kristin", 8);


			} else if (Place == 421) {
				if (this.whereNow() == 421 && this.isCharmedBy("Davy") && isSpellKnown("Shielded Charm")) {
					addComments('<p>You recite the spell, it fails, it seems she is under the effect of a charm spell by someone else.</p>');
					return "handled";
				}

			} else if (Place == 423) {
				//Bartel's House Swimming Pool
				if (this.whereNow() == 423 && this.isCharmedBy("Davy")) addComments('<p>You recite the spell, it fails, it seems she is under the effect of a charm spell by someone else.</p>');
				else if (this.whereNow() == 423) CastCharmSpell("Ellie", 423, 1, "type=ellie23");		//Charm Ellie
				else addComments('You read a spell.... but it fizzles.');
				return "handled";

			} else if (Place == 430) {
				//Kristin's House
				// Ellie here and charmed by Davy
				if (this.whereNow() == 430) CastCharmSpell("Ellie", 430, 1, "type=ellie4");		//Charm Ellie
				else addComments('You read a spell.... but it fizzles.');
				return "handled";
			}
		}

		return "";		// do nothing
	};

}
