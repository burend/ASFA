/****************************************************************
		Gina
****************************************************************/
function RepliesGina(nR)
{
	//var pCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 11300)
	{
		bChat = false;
		setPlaceFlag("Museum", 3, false);	// Set safe as Open   SAFE CLOSED = FALSE
		moveItem(29, 244);  // Place the Vase in that location
		Place = 244;
		addComments('<table><tr><td>' + this.addPersonString("gina3.jpg", "30%") + '</td><td>');
		addComments('Gina moves to open the safe for you.  "Anything else ' + myName + '?" she asks quickly, a longing look on her face.</td></tr></table>');
	}
	return true;
}


// Gina functions
function GinasVisitor() { setPlaceFlag("GinasHouse", 9); }


/***************** Initialise ******************************************************************************/
function initialiseGina()
{
	// Gina
	addPerson("Gina", 0, "Gina", "");
	per.extra = [0, 0];
	per.Replies = RepliesGina;
	
	per.getPersonName = function(full) {
		if (full === true) return "Gina James";
		return this.isCharmedBy() ?  "Slave Gina" : "Gina, the Museum Guard";
	};
	per.getPersonNameShort = function() { return this.checkFlag(2) ? this.name : "the guard"; };

	per.getPersonAddress = function() { return isPlaceKnown("GinasHouse") ? '2138 Rathdown Rd, Glenvale' : ''; };

	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		var s = '<p>' + this.addPersonString("ginaintro.jpg", "height:max%", "right");
		if (this.isCharmedBy()) {
			return s + "It was a bit tricky to get Gina under your influence, but the reward was worth it. You own a blonde babe who is ready to take any commands you give her! Her boobs are only rivaled by Ms Titus, both in quality and size! The fun doesn’t stop there, she rocks a body that would make every man turn their heads. It is quite clear that she trains and exercises a lot and has a great physique. Interestingly enough she told you that she was a bodyguard for the rich and famous before she became a museum security. She can prove useful in hand to hand combat if needed and she can also use guns aswell.<br><br>" +
					 "She curtsies to you every time she sees you and silently comes to your side to protect and follow you. No words needed, she knows her job all too well!";
		} else return s + "Gina, the museum security guard.";
	};
	
	per.whereNow = function() {
		if ((Place == 241 || Place == 245) && this.place == 0) return Place;
		if (Place == 303 && sType == "ginabath") return Place;
		return this.place;
	};

	per.possessThem = function() {
		if (this.place === 0)
		{
			this.extra[0] += 1;
			Place = 239;
			addComments("<p>You possess the guard, Gina James. You may move Gina within the museum.</p>");
		} else {
			this.extra[1]  += 1;
			if (this.extra[1] == 1) startTimedEvent("GinasVisitor()", 40);		// 20 turns to repossess her
			if (this.extra[1]  == 2 && !checkPlaceFlag("GinasHouse", 9)) setQueryParams('type=visitor1');
			Place = 302;
			addComments("<p>You possess the security guard Gina James while she is at home. You may move Gina within her house.</p>");
		}
		return true;
	};

	per.dispossessThem = function() {
		if (this.place === 1) {
			// Possessed at home
			if (this.extra[1] === 1) {
				setPlaceFlag("GinasHouse", 4);	// set phone message as read for Gina
				setPlaceFlag("GinasHouse", 3);	// set shower scene as done
			}
		}
		return true;
	};

	per.getPossessionFace = function() {
		if (this.place === 0) {
			//Gina is @ the Museum
			return 'gina-m-face';
		} else {
			//Gina is @ HOME
			return 'gina-h-face';
		}
	};

	per.showEventPopup = function()
	{
		if (sType == "ginatransformbody") {
			CastTransform(1);
			if (this.dress == "Shyla") this.dress = "Bridgette";	
			else this.dress = "Shyla";
			showPopupWindow("Transformed",
				this.addPersonString("gina12.jpg", "height:max%", "right") +
				'Gina\'s body starts to subtly change, her face completely changes as if a different person is standing in fromt of you.<p>' +
				'<p>You tentatively as if she is alright and she replies and she is definitely still Gina, still an attractive blonde and the same person she was before',
				'dispPlace()'
			);
			return true;
		}
		
		if (sType !== "") return false;

		if (Place == 239 && !this.checkFlag(1) && this.place === 0) {
			// See the security guard
			
			showPopupWindow("Security Guard",
				"<img src='Images/People/Gina/Shyla/ginaintro.jpg' class='imgpopup' style='float:left;margin-right:5px' alt='Who' title='Classic'>" +
				"<img src='Images/People/Gina/Bridgette/ginaintro.jpg' class='imgpopup' alt='Who' title='New'>" +
				'You see patrolling around an armed guard, it is surprising the level of security for this museum. There are bars covering many exhibits and a range of security systems.<br><br>' +
				'The museum guard is, for your surprise, a woman! Hell, she\'s the hottest guard you\'ve ever seen! The blonde bombshell walks around with a gun in her holster and wearing a rigid, cold face. She stops only to look around for unusual or suspicious visitors, like yourself. She is really precise in her job! You know she would kick your ass in a minute if you were to touch any of the museum artefacts.</p>' +
				'<p>When you look at her closer, was she standing near a notice board or in front of a exhibit with bars?' +
				addOptionLink("string", '&#8592; notices', "setPersonFlag('Gina',1);per.dress='Shyla';dispPlace(239)", "chatblock", "width:30%;margin-left:35%") +
				addOptionLink("string", 'exhibit &#8594;', "setPersonFlag('Gina',1);per.dress='Bridgette';dispPlace(239)", "chatblock", "width:30%;margin-left:35%"),
				'', '', true, true, true
			);
			return true;
		}
		if (Place == 302 && this.dress === "" && this.place === 302) {
			// Met first at home
			showPopupWindow("Security Guard at Home",
				"<img src='Images/People/Gina/Shyla/gina7a.jpg' class='imgpopup' style='float:left;margin-right:5px;max-width:30%' alt='Who' title='Classic'>" +
				"<img src='Images/People/Gina/Bridgette/gina7a.jpg' class='imgpopup' style='max-width:30%' alt='Who' title='New'>" +
				'Gina looks up at you as you enter, evidently quite surprised to have a visitor. She is quite the blonde bombshell!</p>' +
				'<p>When you look closer, is she standing in front of a door, or is she near a wall?' +
				addOptionLink("string", '&#8592; door', "setPersonFlag('Gina',1);per.dress='Shyla';dispPlace(302)", "chatblock", "width:30%;margin-left:35%") +
				addOptionLink("string", 'wall &#8594;', "setPersonFlag('Gina',1);per.dress='Bridgette';dispPlace(302)", "chatblock", "width:30%;margin-left:35%"),
				'', '', true, true, true
			);
			return true;
		}		
		return false;
	};
	
	per.showEvent = function()
	{
		var md, bMuseum;
		
		if (Place == 269 && sType == "ginapool") {
			WaitHereOnly(4);
			md = WritePlaceHeader();
			this.showPerson("gina-pool.jpg");
			addPlaceTitle(md, "Swimming with Gina");
			md.write(
				'<p>Gina arrives, dressed in a white bikini, and she seductively poses for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=ginapoolsex');
			addLinkToPlaceC(md, 'say goodbye to Gina', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "ginapoolsex") {
			md = WritePlaceHeader();
			this.showPerson("gina-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Gina");
			md.write(
				'<p>You ask your large breasted security guard to play with you more privately, and she seductively removes most of her swimsuit and lies back waiting for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Gina', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 302) {
			if (sType == "visitor1") {
				// Second possession
				md = WritePlaceHeader();
				if (isExplicit()) this.showPersonRandomRorX("gina28", 3);
				else this.showPersonRandom("gina28", 2);

				addPlaceTitle(md, "Gina has a visitor");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>You become aware in Gina\'s body and you feel a strange sensation a fullness you have never felt before. You feel yourself bouncing and look down, you are naked and you see Gina is impaled on a large cock, riding the man on top. As you hesitate, he firmly grabs your hips and starts thrusting from below, and you hear him say, "Hey babe, not now I am close"</p>' +
						'<p>You also feel a strong sense of arousal, and a tension that you are also very close to something as well...</p>'
					);

				} else {
					md.write(
						'<p>You become aware in Gina\'s body and you are unmistakably being fucked, riding a man on top, his large cock thrusting into you. You hesitate in surprise, and he firmly grabs your hips and starts thrusting from below, and you hear him say, "Hey babe, not now I am close"</p>' +
						'<p>You also feel a strong sense of arousal, and you know you are close to your orgasm as well...</p>'
					);
				}

				startQuestions();
				addLinkToPlaceC(md, 'well...while he is here...', 302, 'type=visitor2');
				addLinkToPlaceC(md, 'stop! make and excuse and get him out', 302, 'type=visitorkickout');
				WritePlaceFooter(md);
				return true;

			} else if (sType == "visitor2") {
				// Second possession
				md = WritePlaceHeader();
				if (isExplicit()) this.showPersonX("gina26bb.jpg");
				else this.showPerson("gina28c.jpg");

				addPlaceTitle(md, "Gina has a visitor");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>What the hell, he is here and fucking you are you are really close. You start to awkwardly ride him but he makes up for it from below.</p>' +
						'<p>A few minutes later your body convulses in an intense orgasm, and you hear him call out "Ahh, take it, take my load" as you feel another strange sensation as he cums in you.</p>'
					);

				} else {
					md.write(
						'<p>What the hell, he is here and fucking you are you are really close. You start to ride him but he makes up for it from below.</p>' +
						'<p>A few minutes later your body convulses in an intense orgasm, and you hear him call out "Ahh, take it, take my load" as you feel him cum in you.</p>'
					);
				}
				md.write('<p>The guy quickly kisses you, and says, "I gotta run, message me again when you have time off and feeling horney!". He quickly dresses and leaves you.</p>');

				startQuestions();
				addLinkToPlaceC(md, 'get dressed', 302, 'type=');
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 303) {
			if (sType == "mirror") {
				md = WritePlaceHeaderNI();
				this.showPerson("gina27.jpg");
				addPlaceTitle(md, "Gina\'s Bathroom Mirror");
				md.write('<p>In the mirror you see Gina, or actually yourself possessing Gina. You are wearing a bathtowel and it appears nothing else. Gina&apos;s large breasts are keeping the towel from falling or is it that the towel is barely containing them?');
				if (perYou.isBornMale()) md.write(' Being a large breasted blonde woman is a very strange experience for you, to say the least!');
				md.write('</p>');

				setPlaceFlag("GinasHouse", 3);	// set shower scene as done
				startQuestions();
				addLinkToPlace(md, 'look closer', 303, 'type=mirror1');
				addLinkToPlace(md, 'look away', 303, 'type=');
				WritePlaceFooter(md);
				return true;

			} else if (sType == "mirror1") {
				md = WritePlaceHeaderNI();
				this.showPerson("ginashower1.jpg");
				addPlaceTitle(md, "Gina\'s Bathroom Mirror");
				md.write('<p>You look fascinated and see out of the corner of your eye there is a full length mirror nearby and you hear the shower is running. You look in the mirror and see Gina, or is it you?</p>');

				startQuestions();
				addLinkToPlace(md, 'well... while you are here', 303, 'type=mirror2');
				addLinkToPlace(md, 'No, no get back what you were here for', 303, 'type=');
				WritePlaceFooter(md);
				return true;				

			} else if (sType == "mirror2") {
				md = WritePlaceHeaderNI();
				this.showPersonRandom("ginashower2", 2);
				addPlaceTitle(md, "Gina\'s Bathroom Mirror");
				md.write('<p>You step into the shower and lean against the glass wall, pressing Gina\'s...your breasts against the glass wall. In the mirror you can see the lovely sight.</p>');

				startQuestions();
				addLinkToPlace(md, '...she was just about to have a shower...', 303, 'type=mirror3');
				addLinkToPlace(md, 'No, no get back what you were here for', 303, 'type=');
				WritePlaceFooter(md);
				return true;				

			} else if (sType == "mirror3") {
				md = WritePlaceHeaderNI();
				this.showPerson("ginashower3.jpg");
				addPlaceTitle(md, "Gina\'s Bathroom Mirror");
				md.write('<p>You feel the shower on your body and start to rub your body with hands and soap. You start to feel very aroused, especially when you touch your large breasts.</p>');

				startQuestions();
				addLinkToPlace(md, 'you have to explore more...', 303, 'type=mirror4');
				addLinkToPlace(md, 'No, no get back what you were here for', 303, 'type=');
				WritePlaceFooter(md);
				return true;
				
			} else if (sType == "mirror4") {
				md = WritePlaceHeaderNI();
				this.showPersonRorX("ginashower4.jpg");
				addPlaceTitle(md, "Gina\'s Bathroom Mirror");
				md.write('<p>You touch your pussy, well Gina\'s, and feel a surge of arousal. quickly feeling close to your first orgasm in her body...</p>');

				startQuestions();
				addLinkToPlace(md, '...what is that over there...', 303, 'type=mirror5');
				addLinkToPlace(md, 'No, no get back what you were here for', 303, 'type=');
				WritePlaceFooter(md);
				return true;				

			} else if (sType == "mirror5") {
				md = WritePlaceHeaderNI();
				this.showPerson("ginashower5.jpg");
				addPlaceTitle(md, "Gina\'s Bathroom Mirror");
				md.write('<p>You see a dildo sitting on a shelf nearby, ready for use...</p>');

				startQuestions();
				addLinkToPlace(md, '...well Gina uses it...', 303, 'type=mirror6');
				addLinkToPlace(md, 'No, no get back what you were here for', 303, 'type=');
				WritePlaceFooter(md);
				return true;			

			} else if (sType == "mirror6") {
				md = WritePlaceHeaderNI();
				this.showPersonRorX("ginashower6.jpg");
				addPlaceTitle(md, "Gina\'s Bathroom Mirror");
				md.write('<p>You play with the dildo for a little, but very quickly ');
				if (perYou.isBornMale()) md.write(' come to your first powerful orgasm as a woman!');
				else md.write(' orgasm in Gina\'s body, it feels wonderful, similar but different!');
				md.write('.</p>');

				startQuestions();
				addLinkToPlace(md, '...ummm...', 303, 'type=mirror7');
				WritePlaceFooter(md);
				return true;

			} else if (sType == "mirror7") {
				md = WritePlaceHeaderNI();
				this.showPerson("ginashower7.jpg");
				addPlaceTitle(md, "Gina\'s Bathroom Mirror");
				md.write('<p>You look at Gina in the mirror in the afterglow of your orgasm, vowing to try this again sometime...</p>');

				startQuestions();
				addLinkToPlace(md, 'Enough for now, get back to what you were here for', 303, 'type=');
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (sType == "ginaxxx") {
			md = WritePlaceHeader();
			bMuseum = (this.place === 0);		// At the museum

			if (bMuseum) this.showPerson("gina10.jpg");			//At the Museum
			else this.showPerson("gina26.jpg");		//At Home

			addPlaceTitle(md, "Slave Gina Showing her Gratitude");

			var myName = perYou.getMaster();
			
			// Start of scene
			md.write(
				'<p>"Oh yes!" she cries, instantly removing her clothing, and carefully assisting ' +
				'in the removal of yours. "How shall I please you today, ' + myName +
				'?" she asks as she lies back in her chair, displaying her naked body just the way you like it.</p>'
			);

			if (perYou.isMaleSex())
			{
				md.write(
					'<p>"Shall I swallow your cum again, ' + myName + '?  I so love the taste of it."</p>' +
					'<p>"Or would you like to take me from behind as I lean over the chair?  That always reminds me that I am not a real person, but a slave, an object for your use... and I <i>love</i> being reminded of that," she says, beginning to work herself into a fit.</p>'
				);
			}
			else
			{
				md.write('<p>"Shall I drink of your juices once more, ' + myName + '?  I so love the way you taste!"</p>');
				if (this.place === 0) md.write('<p>"Or shall we lay on the floor and use a double ended dildo, the thought of you fucking yourself on this poor worthless slave is almost more than I can stand," she says,  beginning to work herself into a fit.</p>');
			}

			md.write(
				'<p>Or shall I simply run my hands all over the body of my ' + myName + ', worshiping every inch as if it was my sole purpose in life?  Which it is," she says smiling.</p>' +
				'<p>You think of your options for a while,</p>'
			);
			//before finally saying, "You decide," -- allowing your slave to determine how best to please her ' + myName + '.</p>');

			startQuestions();
			if (bMuseum) //@ the Museum
			{
				if (perYou.isMaleSex()) {
					addLinkToPlaceC(md, '"I will take you"', Place, "type=ginafuck");
					addLinkToPlaceC(md, '"swallow my cum"', Place, "type=ginabj");
				} else {
					addLinkToPlaceC(md, '"get the dildo"', Place, "type=ginafuck");
					addLinkToPlaceC(md, '"drink my juices"', Place, "type=ginabj");
				}
				addLinkToPlaceC(md, '"play with yourself"', Place, "type=ginaplay");
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 245);
				addLinkToPlace(md, "leave the Museum", 238);
			}
			else //@ home
			{
				if (perYou.isMaleSex()) {
					addLinkToPlaceC(md, '"We will sixty-nine"', Place, "type=ginasixtynine");
					addLinkToPlaceC(md, '"I will take you"', Place, "type=ginafuck");
					addLinkToPlaceC(md, '"swallow my cum"', Place, "type=ginabj");
				} else {
					addLinkToPlaceC(md, '"drink my juices"', Place, "type=ginabj");
				}
				addLinkToPlaceC(md, '"play with yourself"', Place, "type=ginaplay");
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 302);
				addLinkToPlace(md, "leave the house", 229);
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "ginafuck") {
			// Anywhere, any gender
			md = WritePlaceHeader();
			bMuseum = (this.place === 0);		// At the museum
		
			if (isExplicit()) {
				if (bMuseum) {
					//At the Museum
					if (perYou.isMaleSex()) this.showPersonRandomX("gina12b", 2);
					else this.showPersonX("gina10gb.jpg");
				} else {
					//At Home
					if (perYou.isMaleSex()) this.showPersonX("gina26bb.jpg");
					else this.showPersonX("gina26g.jpg");
				}
			} else {
				if (bMuseum) this.showPerson("gina10.jpg");			//At the Museum
				else this.showPerson("gina26.jpg");		//At Home
			}
			addPlaceTitle(md, "Slave Gina Showing her Gratitude");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>You fuck Gina</p>' +
					'<p></p>'
				);
			} else {
				md.write(
					'<p>You fuck Gina with the dildo</p>' +
					'<p></p>'
				);
			}
			startQuestions();
			if (bMuseum) {
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 245);
				addLinkToPlace(md, "leave the Museum", 238);
			} else {
				//@ home
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 302);
				addLinkToPlace(md, "leave the house", 229);
			}
			WritePlaceFooter(md);
			return true;

		} else if (sType == "ginabj") {
			// Anywhere, any gender
			md = WritePlaceHeader();
			bMuseum = (this.place === 0);		// At the museum
			if (isExplicit()) {
				if (bMuseum) {
					//At the Museum
					if (perYou.isMaleSex()) this.showPersonRandomX("gina10b", 2);
					else this.showPersonX("gina10ga.jpg");
				} else {
					//At Home
					if (perYou.isMaleSex()) this.showPersonX("gina26bc.jpg");
					else this.showPersonX("gina26g.jpg");
				}
			} else {
				if (bMuseum) this.showPerson("gina10.jpg");			//At the Museum
				else this.showPerson("gina26.jpg");		//At Home
			}

			addPlaceTitle(md, "Slave Gina Showing her Gratitude");
			
			if (perYou.isMaleSex()) {
				md.write(
					'<p>Gina gives you a blowjob</p>' +
					'<p></p>'
				);
			} else {
				md.write(
					'<p>Gina licks you</p>' +
					'<p></p>'
				);
			}
			startQuestions();
			if (bMuseum) {
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 245);
				addLinkToPlace(md, "leave the Museum", 238);
			} else {
				//@ home
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 302);
				addLinkToPlace(md, "leave the house", 229);
			}
			WritePlaceFooter(md);
			return true;
			
		} else if (sType == "ginasixtynine") {
			// Home & Male only
			md = WritePlaceHeader();
			bMuseum = (this.place === 0);		// At the museum
			if (isExplicit() && sType !== "") {
				if (bMuseum) {
					//At the Museum
					if (perYou.isMaleSex()) this.showPersonRandomX("gina12b", 2);
					else this.showPersonX("gina10gb.jpg");
				} else {
					//At Home
					if (perYou.isMaleSex()) this.showPersonX("gina26ba.jpg");
					else this.showPersonX("gina26g.jpg");
				}
			} else {
				if (bMuseum) this.showPerson("gina10.jpg");			//At the Museum
				else this.showPerson("gina26.jpg");		//At Home
			}			
			addPlaceTitle(md, "Slave Gina Showing her Gratitude");
			md.write(
				'<p>Eagerly Gina removes what little she is wearing and then almost rips your clothing off in her desire to obey you. She almost forcefully pushes you down and straddles your chest. You feel her hot, moist mouth envelope your hardening cock. She pushes her equally moist pussy towards your face.</p>' +
				'<p>You firmly reassert your control as you slap her ass and tell her to take your cock as deeply as she can. You grab her ass and start to lick her dripping folds. As you do she takes your cock deeper and deeper with long practised skill.</p>' +
				'<p>Gina is very talented and it does not take long before you are cumming hard down your slaves throat. As you do you feel a splash of her juices and see her pussy pulsing in her orgasm.</p>' +
				'<p>You both redress and Gina looks at you, "Thank you ' + perYou.getMaster() + '!"</p>'
			);
			startQuestions();
			if (bMuseum) {
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 245);
				addLinkToPlace(md, "leave the Museum", 238);
			} else {
				//@ home
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 302);
				addLinkToPlace(md, "leave the house", 229);
			}
			WritePlaceFooter(md);
			return true;
			
		} else if (sType == "ginaplay") {
			// Anywhere, any gender
			md = WritePlaceHeader();
			bMuseum = (this.place === 0);		// At the museum
			if (bMuseum) this.showPersonRorX("gina11a.jpg");
			else this.showPersonRorX("gina11b.jpg");
			addPlaceTitle(md, "Slave Gina Showing her Gratitude");
			if (bMuseum) {
				md.write(
					'<p>Gina steps off of the desk and starts to play with herself, making a big show of her large breasts. She is mainly playing for your attention, and not focusing much on her pleaure.</p>' +
					'<p>Still, her passion grows, you can see it in her nipples, her moistness and her breathing. She looks at you "' + perYou.getMaster() + ' are you ready for me to cum?". You tell her "Yes, cum for me slave".</p>'
				);
			} else {
				md.write(
					'<p>Gina quickly removes what little she is wearing and sits on the couch and intently plays with her pussy and breasts. She seems to be less playing for your entertainment than to arouse herself.</p>' +
					'<p>She quickly reaches the edge of her climax and she looks at you "Can I cum for you, and only you?". You see no reason to deny your big-breasted slave and tell her to cum. She cries out "' + perYou.getMaster() + '" and has a strong orgasm.</p>'
				);
			}
			startQuestions();
			if (bMuseum) {
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 245);
				addLinkToPlace(md, "leave the Museum", 238);
			} else {
				//@ home
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 302);
				addLinkToPlace(md, "leave the house", 229);
			}
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmgina1") {
			// Event: Charm Gina 1
			//place - 0=@ Museum   1=@ Home
			md = WritePlaceHeader();
					
			// Is it now possible for your player to be arrested in the game?
			if (!isArrestPossible()) {
				// Is the DA in the game
				if (getPersonOther("Diane") === 0) {
					// No, and never would be otherwise
					if (wherePerson("AdeleRoss") == 436 || wherePerson("AdeleRoss") >= 900) {
						// Adele Ross is already at home
						// So move Diane White to the Police Station
						// Just set other, not place so as to trigger an event on entering the station
						setPersonOther("Diane", 30);
					}
				}
			}
			// Image
			if (this.place === 0) this.showPerson("gina1b.jpg");	//At the Museum
			else this.showPerson("gina22.jpg");	//At Home
			// Title
			addPlaceTitle(md, "Gina Under a Spell");
			// Description
			if (this.place === 0) {
				//Charmed at museum
				md.write('<p>"What did you say?" she asks authoritatively, leaving her hands on her gun for the moment.</p>');
			}	else {
				// Charmed at Home
				md.write('<p>"I\'m sorry, what was that?" she asks, suddenly finding herself very attracted to the ' + perYou.getManWoman() + ' standing before her - her hand unconsciously sneaking up to her face flirtatiously.</p>');
			}
			md.write(
				'<p>"Oh... nothing," you lie, buying time for the spell to set in.  "I just said \'look at you\' is all."</p>' +
				'<p>"Look at me?" she asks, confused.  "Wha... What do you mean?"</p>' +
				'<p>"Oh, it\'s just that I was admiring how strong and independent you seem to be.  I imagine that must make you a very attractive woman, for some people."</p>' +
				'<p>"Yes," she says authoritatively. "Strong.  Independent.  Yes, I vowed as a young woman to never let myself be taken advantage of when people thought that just because I was a woman, that made me weak."</p>' +
				'<p>"Thats right.  And a strong, independent woman only does what <i>she</i> wants, doesn\'t she?" you ask, beginning to lead her down the path to her enslavement.</p>' +
				'<p>"Correct...  Yes..." she says, her body beginning to visibly quiver with desire.</p>' +
				'<p>"So... if someone were to tell you to do something, you would only do it if you <i>wanted</i> to, right?"</p>' +
				'<p>"Of course... only if I wanted to."</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Show me what you have on under those clothes, then."', Place, 'type=charmgina2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmgina2") {
			md = WritePlaceHeader();
			if (this.place === 0) this.showPerson("gina2.jpg");	//At the Museum
			else this.showPerson("gina23.jpg");	//At Home
			
			addPlaceTitle(md, "Gina Under a Spell");
			md.write(
				'<p>Without thinking, and driven by the desire welling up within her, Gina immediately ' +
				'begins to reveal what she\'s wearing underneath her clothing.</p>' +
				'<p>"Now.  Why are you doing that Gina?  Why are you doing what I told you to do?"</p>' +
				'<p>"Be... Because I wanted to.  I am a strong, independent woman and I only do what I ' +
				'want to do?" she says, although this time finishing the statement as a question, as if already seeking your approval.</p>' +
				'<p>"We\'ll see," you say.  "But if you <i>wanted</i> to do that, then what does that ' +
				'mean about me?  Why would you be stripping just for me?"</p>' +
				'<p>"Uhmm..." she says, confused, then her expression changes as she finally finds a ' +
				'target for her blooming desire.  "Because I am trying to seduce you," she finally gets out.</p>' +
				'<p>"Seduce me?" you ask. "Well, you would be much more effective at that if you didn\'t ' +
				'tell me you were trying first.  Besides, I don\'t think you\'re trying to seduce me.  At least ' +
				'not very hard," you say somewhat derisively.  "I\'m not really even attracted to you."</p>' +
				'<p>She is somewhat taken aback.  From her looks, you would guess she has never been told that before.  "Not attracted...  Why not?  What should I do, what <i>are</i> you attracted to?" she whimpers.</p>' +
				'<p>"I go more for the submissive type... the type that does what she is told <i>because</i> she is told to do it."</p>' +
				'<p>"Tell me what to do!" she cries.  "I have to have you!"</p>'
			);

			startQuestions();
			if (this.place === 0) {
				//@ Museum
				addLinkToPlaceC(md, '"Well, why don\'t you play with yourself for me."', Place, 'type=charmgina3');
			} else {
				addLinkToPlaceC(md, '"Well, why don\'t you take off your pants, turn around, and show me that ass of yours."', Place, 'type=charmgina3');
			}
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmgina3") {
			md = WritePlaceHeader();
			if (this.place === 0) this.showPerson("gina3.jpg");	//At the Museum
			else this.showPerson("gina24.jpg");	//At Home
			//**************************
			//place (0=@ Museum   1=@ Home) 
			addPlaceTitle(md, "Gina Under a Spell");
			md.write('<p>Gina quickly does as you ordered - ');
			if (this.place === 0) {
				//@ Museum
				md.write(' unbuttoning her trousers and sliding her hand down. The sudden onset of pleasure is amplified by the spell and she quickly begins to moan.</p>');
			} else {
				md.write(' pushing her pants to the floor and then turning to give you a better view.  You run your hands across her soft flesh, quickly drawing out moans of passion as the spell amplifies the pleasure of your touch.</p>');
			}
			md.write(
				'<p>"That\'s better," you say, running your eyes up and down her form as if inspecting a slab of meat. "But now I\'m afraid I am a bit confused."</p>' +
				'<p>"Con... con...  confused?" she tries say, stuttering as her mind and body are racked with wave after wave of pleasure as she continues to follow your order.</p>' +
				'<p>"Yes.  I thought you said that you were a strong, independent woman who only did things that she wanted to do." you say, smacking her on the ass as you do. ' +
				'"But now its looks more like you\'re a weak, submissive woman who will do anything she is told to do. - Something I find very attractive, by the way," you say, knowing how much you are teasing her mind with the idea that she is pleasing you.</p>' +
				'<p>"So which is it?" you ask as you walk circles around her.  "The strong woman that I find completely unattractive - or the submissive slave that is crying out for a ' + perYou.getMaster() + '?"'
			);
			startQuestions();
			addLinkToPlace(md, "wait for her to reply", Place, 'type=charmgina4');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmgina4") {
			md = WritePlaceHeader();
			if (this.place === 0) this.showPerson("gina4.jpg");			//At the Museum
			else this.showPerson("gina25.jpg");		//At Home

			var myName = perYou.getMaster();

			addPlaceTitle(md, "Gina Under a Spell");

			md.write(
				'<p>"Oh, the submissive slave!" she says, turning to face you between shudders of pleasure.</p>' +
				'<p>"The slave?" you ask. "But what happened to the strong woman from before?"</p>' +
				'<p>"That was all an act!" she cries out in desperation.  "I\'ve always been a submissive woman, ' +
				'looking for someone to tell me what to do.  But I didn\'t know who I could trust.  I had to protect myself."</p>' +
				'<p>"Well then...  If you\'ve always been a slave, then who is your ' + myName + ' then?"</p>' +
				'<p>"I don\'t have a ' + myName + '," she says, almost breaking down in tears. ' +
				'"Wait! Would you be my ' + myName + '? Oh please!?!"</p>' +
				'<p>"I don\'t know," you say, pretending to consider the offer.  "You were lying before, how can I trust ' +
				'you now?  What could you possibly do for me as my slave?"</p>' +
				'<p>"I swear I will serve you faithfully and truthfully.  Please!  Ask anything of me and I will do it! ' +
				'I would live to serve you, to be anything you wanted me to be.  Your guard, your slave, your slut, your ' +
				'plaything.  I am whatever you want me to be!  Please, I can not be a slave without a ' +
				myName + '!" she cries.  It almost makes you feel sorry for her.  Almost.</p>' +
				'<p>"Fine then, <i>Slave</i>, come and pleasure your ' + myName + '," you say forcefully.'
			);

			if (perYou.isMaleSex()) md.write('"Prove your devotion to your new ' + myName + ' as you suck my cock and swallow every drop!"</p>');
			else md.write('"Prove your devotion to your new ' + myName + ' as you drink every last drop from my wet slit!"</p>');

			// Choices
			startQuestions();
			if (this.place === 0) //@ the Museum
			{
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 245);
				addLinkToPlace(md, "leave the Museum", 238);
			} else {
				//@ home
				addLinkToPlace(md, "let her finish, then speak with Gina some more", 302);
				addLinkToPlace(md, "leave the house", 229);
			}
			WritePlaceFooter(md);
			return true;
		}	
	
		if (sType == "asklola") {
			md = WritePlaceHeader();
			this.showPerson("ginamuseum2.jpg");
			setPersonFlag("Lola", 4);
			addPlaceTitle(md, "Gina gives information on the Curator");

			md.write(
			  '<p>Oh ' + perYou.getMaster() + ' I think you will like the curator of the museum. Her name is Lola and she is a huge history nerd. I think she has a kinky side though. It was actually her idea to set up bondage displays in the Museum.</p>' +
			  '<p>You ask, "Interesting.  And where can I find her."</p>' +
			  '<p>Gina answers, "Oh her office is right off of the Main Lobby of the Museum.  She is almost always in there if the museum is open. I can give you the key that unlocks it so you can walk right in."</p>' +
			  '<p>You compliment her, "Thank you slave. You have been most helpful."</p>'
			 );

			startQuestions();
			addLinkToPlace(md, 'talk more to Gina', 245);
			WritePlaceFooter(md);
			return true;
		}
		
		// Museum Security Guard

		if (sType == "approachgina") {
			md = WritePlaceHeader();
			
			if (this.isCharmedBy()) {
				// Gina is CHARMED
				return dispPlace(245);
			}

			var perMG = findPerson("Mrs Granger");
			var perDA = findPerson("Diane");
			
			if (perMG.other >= 50 && perDA.getQuestArrested() < 50) this.showPerson("gina1c.jpg");	// Previously tried to take the vase?
			else this.showPerson("gina1a.jpg");

			addPlaceTitle(md, "Museum Guard");

			if (isShopOpen(2, 0, true)) md.write('<p>The security guard stops you to ask your business. She is not pleased to see you wandering around.</p>');
			else md.write('<p>The security guard stops you seeming to think you are an employee of the museum working late into the night.</p>');

			// If you had Mrs Granger Jump the Guard && haven't been aquitted in court yet.
			if (perMG.other >= 50 && perDA.getQuestArrested() < 50) {
				md.write('<p>She recognizes you from the vase robbery and immediately reaches for her pistol. "Hold it right there!" she cries.</p>');
			}

			startQuestions();

			if (isShopOpen(2, 0, true)) addLinkToPlace(md, "exit the museum before you get arrested", 238);
			else addLinkToPlace(md, 'run away from her', 239);

			WritePlaceFooter(md);
			return true;
		}
		
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonName();
		this.showPersonRandom("poledance", 1);
		addPlaceTitle(md, "Gina's Dance");
		md.write(
			'<p>' + nm + ' takes the stage dressed in a version of exotic dancing wear!</p>' +
			'<p>' + nm + ' is not an experienced dancer but she entertains the audience well. ' + nm + ' is a lot more focused on you than the general audience, dancing almost as your private dancer!</p>' +
			'<p>After she collects her tips and offers them to you, but you know Jade has a performance fee for you, and ' + nm + ' deserves ' + this.getHisHer() + ' tips.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Museum Guard Gina
			if (Place == 241 || Place == 245 || (Place == 239 && sType == "approachgina") || Place == 302) {
				if (isPossess("Gina")) ddComments("You are currently Possessing Gina, there is no-one else around.");
				else {
					if (this.FindItem(43) > 0) {
						// Still wearing her Necklace
						addComments("You attempt to cast the spell...  And it seems to bounce off of her.  It's as if there is something protecting her from your magic.");
					} else {
						// No longer wearing her necklace
						if (!this.checkFlag(2)) addComments("You do not know the guards name, so the spell will not work.");
						else CastCharmSpell("Gina", Place, 1, 'type=charmgina1');
					}
				}
				return "handled";
			}
		}
		// Casting the transform spell
		if (no == 18 && cmd == 2) {

			if (this.isHere()) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her.");
					return "handled";
				}
				if (!CastTransform(1, true)) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(Place, 'type=ginatransformbody');
				return "nofooter";
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
			if (this.place === 0) WriteComments("You call Gina to invite her to join you at the pool for a swim, but she replies, \"Sorry " + perYou.getMaster() + " I am on duty. I cannot take time off, maybe if I was home on a holiday, but not now!\". She apologies and promises to another time. ");
			else {
				gotoPlace(Place, 'type=ginapool');
				receiveCall('', 'You call Gina to invite her to join you at the pool for a swim, and she answers enthusiasticaly, "Damn right!" and hangs up. You take that to mean she will be there soon.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};
	
}
