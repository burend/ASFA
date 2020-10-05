/****************************************************************
		Gabby's Response Base
****************************************************************/
function RepliesGabby(nR)
{
	var perGabby = per;
	//var perMom = findPerson("Mom");

	if (nR == 100)	{
		this.setFlag(1);
		addComments(
			'<table><tr><td style="vertical-align:top;width:20%"><img src="Images/Items/spiralpendant.jpg" style="width:95%;" alt="Pendant"></td><td><p>' +
			'You ask Gabby about the book on hypnosis from the library, she looks at you surprised,</p>' +
			'<p>"How did you know...well, I lost it, that is all. I paid the fine, but I do not see why you are interested."</p>' +
			'<p>You start to reply and you notice a small pendant she is wearing underneath her white top, a silver spiral. For an instant you feel a warmth, and know it is slightly magical. You decide it is best to leave off asking her anything more. She continues,</p>' +
			'<p>"We have a lot of work to get to, can you leave now?"</p>' +
			'<p>Your mother looks at her sternly, "Calm down Gabby ' + perYou.getHeShe() + ' is just being curious, now ' + perYou.getPersonName() + ' it is nice to see you but as she rudely said, we have work to do."' +
			'</td></tr></table>'
		);
	}
	else if (nR == 101) {
		this.setFlag(1);
		perYou.setFlag(12);
		if (perBeasley.place == 1000) perBeasley.place = 11;
		addComments(
			'<table><tr><td style="vertical-align:top;width:20%"><img src="Images/Items/spiralpendant.jpg" style="width:95%;" alt="Pendant"></td><td><p>' +
			'You ask Gabby about the book on hypnosis on her desk, she looks at you startled,</p>' +
			'<p>"It is interesting, my family has always been in to the occult."</p><p>' +
			(this.isCharmedBy() ? '' : 'She glances at your mother and you notice the small pendant she is wearing underneath her white top, a silver spiral. For an instant you feel a warmth, and know it is slightly magical. You decide it is best to leave off asking her anything more.') + ' She continues,</p>' +
			'<p>"We have a lot of work to get to, you can buy a book like that yourself, try the New Age ' + getShopStore(true) + '. Can you leave now?"</p>' +
			'<p>Your mother looks at her sternly, "Calm down Gabby ' + perYou.getHeShe() + ' is just being curious, now ' + perYou.getPersonName() + ' it is nice to see you but as she rudely said, we have work to do."' +
			'</td></tr></table>'
		);
	}
	return true;
}

function GabbyGotInformation()
{
	movePerson('Gabby',isMurderPath() ? 453 : 452);
	movePerson('Mom',452);
	setPersonFlag('Gabby',8);
	if (isMurderPath()) setQueryParams();
	else setPersonFlag("Gabby", 10);
}

// Initialise
function initialiseGabby()
{
	// Gabby, Mom's personal assistant
	addPerson("Gabby", 415, "Gabby", '', false);
	per.Replies = RepliesGabby;
	
	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		if (!this.isCharmedBy()) {
			return "<p><img src='Images/People/Gabby/gabby1.jpg' class='imgpopup' alt='Gabby'>Gabrielle Halliway (“Gabby”, for short, but she doesn't like it when anyone calls her that) Is your Mom's Assistant.</p>" +
				"<p>You've come to know her as a control freak who orders others around not because she particularly likes doing it, but because she believes that her way is usually the most efficient way to do something and thus should be adhered to, no exceptions.</p>" +
				"<p>She is dedicated and punctual, with a mind for numbers and appointments, but has little patience for delays and can get pretty abrasive when annoyed... and she seems to be annoyed quite often.</p>" +
				"<p>Mom is pretty much the only person you know who, for some reason, gets along well with her, and the two are pretty much inseparable while at work.</p>" +
				"<p>The Halliway family actually used to own the Gates Mansion during the times of Kurndorf and were said to be devoted servants him, but when you tried to ask Gabby about it, she refused to waste time with “Fairy tales of warlocks and magic”.";
		}
		if (this.isCharmedBy("Vampyre")) {
			return "<p><img src='Images/People/Gabby/gabby-ghoul1.jpg' class='imgpopup' alt='Gabby'>The Ghoul is... unsettling.</p>" +
				"<p>Gabby is able to perform her duty at work in pretty much the same way she used to be, but as soon as her shift is over she will wordlessly walk towards the park and take her place at the Vampyre's side.</p>" +
				"She doesn't have a will of her own anymore and her skin is a lot more pale when the Vampyre exerts full control over her. ";
		}
		if (this.getCharmedLevel() == 2) {
			return "<img src='Images/People/Gabby/gabby16.jpg' class='imgpopup' alt='Gabby'>" +
				"You had always suspected that there is a storm brewing under Gabby's skin, and the Dai Chu appears to have unleashed it.</p>" +
				"<p>While most girls under your spell are barely able to even consider criticizing you, Gabby has no problems letting you know she disapproves of pretty much anything you do with your magic and doesn't see any reason to be nice or polite about it.</p>" +
				"<p>At the same time, however, she is of course still feeling the full effects of the spell. Your mere presence sends her libido into overdrive, and she longs for you to take her just as much as any other woman you have charmed, which brings you to something you had not expected about her:</p>" +
				"<p>Gabby loves rough sex.</p>" +
				"<p>From spanking and hair-pulling to degrading positions. She can be surprisingly vicious for a 1,52 m woman at one time and oddly affectionate at another, just don't expect her to submit easily.</p>" +
				"<p>Gabby is still a Dom by nature, the spell could not change that, and given the chance she will definitely try to exert that.";
		} else if (this.getCharmedLevel() == 4) {
			return "<img src='Images/People/Gabby/gabby23.jpg' class='imgpopup' alt='Gabby'>" +
				"The spell wasn't able to fully turn Gabby into a submissive, but she still has been bound to you.</p>" +
				"<p>She is not able to disobey direct orders, at least as far as you know, and has come to crave the rush of pain to the point that it is literally possible to whip her to orgasm.</p>" +
				"<p>It started off as punishment administered for what she did, but you quickly discovered that you have quite some talent for this. By now, you've come to enjoy testing out how far you are able to push her, and while Gabby can't help but relish every strike administered, a fact that seems to greatly annoy her.</p>" +
				"<p>Aside from that, though, she is still not all to fond of you, which is unusual for someone affected by the Dai Chu. She doesn't sabotage you but still has a sharp tongue and no problem using it.</p>" +
				"<p>Of course, that may just be her way of asking for more “punishment”. ";
		} else if (this.getCharmedLevel() == 1) {
			return "<img src='Images/People/Gabby/gabby24.jpg' class='imgpopup' alt='Gabby'>" +
				(isMurderPath() ? "You have decided to not break up Mom and Gabby, and while the later is annoyed that you have put her under your spell, she is at least happy to be with Mom and a lot more amiable towards you."
									 : "You had wanted to give your Mom a devoted servant for a while, And Gabby, already being her assistant, was the perfect choice. She is pretty much doing what she always did, but with more enthusiasm and a lot less ulterior motives.") +
				"</p><p>Gabby hasn't really become a submissive under the spell. She has always had a rather dominant personality and without you actively guiding the spell, that hardly changed, but she does listen to you and Mom and is devoted to assist you in any way she can, though obviously leans more towards Mom than you.";
		}
		return '';
	};
	
	per.getPersonAddress = function() { return isPlaceKnown("GabbysHouse") ? '11 Amaranth Pl, Glenvale' : ''; };
	
	per.whereNow = function()
	{
		var perMom = findPersonNC("Mom");
		//if (this.getCharmedLevel() != 1 || !perMom.checkFlag(32) || !perMom.isCharmedBy()) return this.place;
		if (this.getCharmedLevel() != 1 || !perMom.checkFlag(26) || !perMom.isCharmedBy()) return this.place;
		var d = getDay(true);
		if (d == "Sat" || d == "Sun") return 154;
		return this.place;
	};
	
	per.passTimeDay = function() {
		if (this.checkFlag(10)) this.setFlag(23);		// Day of conference
		else if (this.checkFlag(23) && !this.isCharmedBy()) this.setFlag(13);		// Missed the conference
		return '';
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 452 && this.isHere() && sType === "") {
			if (this.getCharmedLevel() == 2) return this.showPerson("gabby15.jpg", '', '', '', '', false, "string");
			else if (this.getCharmedLevel() == 4) return this.showPerson("gabby22.jpg", '', '', '', '', false, "string");
			else if (this.getCharmedLevel() == 1) return this.showPerson("gabby24.jpg", '', '', '', '', false, "string");
		}
		if (Place == 247 && this.isHere() && sType === "") return this.showPerson("gabby-ghoul1.jpg", '', '', '', '', false, "string");
		return '';
	};
	
	per.showEventPopup = function()
	{
		// Going to work?
		if (this.place == 452 && checkPersonFlag("Mom", 14) && getHour() > 7 && getHour() < 18) {
			var d = getDay(true);
			if (d != "Sat" && d != "Sun") {
				if (Place == 452 && this.getCharmedLevel() == 1) {
					this.place = 415;		// At work now
					WriteComments(this.addPersonFace() + "Gabby tells you she is leaving for work");
					return true;
				}
				if (Place != 452) {
					this.place = 415;		// At work now
					if (sType === "" && (Place == 45 || Place == 46)) {
						// You see her leave (lounge room or your bedroom)
						WriteComments(this.addPersonFace() + "Mom gives you a kiss goodbye as she heads off to work");
						return true;
					}
				}
			}
		}
		
		if (Place == 45 && this.whereNow() == 154 && !this.checkFlag(16)) {
			showPopupWindow("Mom and Gabby",
				this.addPersonString("gabby26.jpg", "height:max%", "right") +
				"To your surprise, you see Gabby just on her way out of the kitchen as you enter your home. She's naked, clearly on her way to Mom's bedroom, and only stopping when you call out and ask her what's she's doing here.</p><p>" +
				(isMurderPath() ? '“Well, there is no longer any need to keep our relationship secret from you now, is there?” She turns her head around. “Alex asked me to spend the weekend with her, and she didn\'t want to leave you and Tracy alone the whole time, so... I\'ll be visiting now occasionally.” She chuckles at how weird that is.'
									 : '“Mistr... Alex actually asked me to spend the weekend with her.” She turns her head around. “Ever since you have used that spell on her as well, she has been more open about her needs, and my...” She really seems to dislike using that word. “...duties as her servant had to be expanded.”') +
				'</p><p>“We will spend most of our time in her bedroom, so you won\'t even notice me being here unless you want to... watch.”',
				'setPersonFlag("Gabby", 16)'
			);
			return true;			
		}
		if (Place == 110) {
			if (sType == "waitconfmayor2") {
				showPopupWindow("Waiting with the Mayor",
				findPerson("Mayor").addPersonString((perYou.isMaleSex() && isExplicit() ? "Explicit/mayor13" : "mayor14") + ".jpg", "height:max%", "right") +
					"...with Beatrice all to eager to provide a bit of stress relief for you and her.",
					'dispPlace(Place,"type=waitconfmayor3")'
				);
				return true;
			}
			if (sType == "waitconfmayor3") {
				showPopupWindow("Waiting with the Mayor",
					findPerson("Mayor").addPersonString("mayor15.jpg", "height:max%", "right") +
					'"As the event draws near, both of you go over the plan once again.</o>' +
					"<p>You will be introduced as Miss Thomas's personal aide, for the time being, which should allow you to move freely around the building without being questioned. You will receive a signal as soon as Gabby is alone and ready to be charmed.</o>" +
					"<p>Mayor Thomas will make sure that Gabby is in a room far away from the rest of the gathering and delay whoever she is supposed to meet, so all you need to do is charm her.",
					'dispPlace(98,"type=startconference")'
				);
				return true;
			}
		}
		if (sType == "waitconfsarah2") {
			showPopupWindow("Waiting with the Mayor",
				findPerson("Sofia").addPersonString("sofia_office_noncharmed.jpg", "height:max%", "right") +
				'Finally, when the time has come, you take a seat in a spacious limousine, earning a suspicious look from the chauffeur as you are on the way to the Town Hall.',
				'dispPlace(98,"type=startconference")'
			);
			return true;
		}			
					
		if (sType == "conferencecallout") {
			showPopupWindow("A Reporter",
				"<img src='Images/People/Julie/julie1.jpg' class='imgpopup' alt='Julie'>" +
				"You actually recognize this woman.</p>" +
				"<p>Julie Luna, at least that's her pen-name, is a writer for the Midwestern Gazette, a tabloid popular especially among fans of the arcane and paranormal. The paper itself deals mostly in celebrity gossip and strange conspiracy stories around haunted areas, occult rituals and the ever popular Alien abductions, but occasionally they do hit gold with a story. Julie's articles in particular are usually quite entertaining and as well researched as the subject matter allows. She did manage to earn some renown for it, and many question why she would waste her talent writing stories about Bigfoot's dietary habits instead of shooting for a bigger publication.</p>" +
				"<p>Still, to see someone like her here is surprising, you'd think Mayor Thomas would want to avoid gossipers and tabloids right now. ",
				'dispPlace(Place,"type=conferencetalkjulie1")'
			);
			return true;			
		}
		
		if (sType == "conferencemayor") {
			if (getQueryParam("stage") == "stage3") {
				showPopupWindow("Other Help",
					'<img src="Images/People/Mayor/' + (perYou.isMaleSex() && isExplicit() ? 'Explicit/' : '') + 'mayor18.jpg" style="width:' + (perYou.isMaleSex() && isExplicit() ? '50%' : '25%') + ';float:left;margin-right:5px" alt="Mayor">' +
					'It\'s quick and dirty. No foreplay, no long-winded buildup. You just throw her on the desk and go at it, trading kisses, rolling around on the bed and feeling each others skin. You are ' + (perYou.isMaleSex() ? 'inside her' : 'grinding against her') + ' sex within seconds and roughly take the woman with forceful motions.',
					'dispPlace(Place, "type=conferencemayor&stage=stage4")'
				);
				return true;
			} else if (getQueryParam("stage") == "stage4") {
				showPopupWindow("Other Help",
					'<img src="Images/People/Mayor/' + (perYou.isMaleSex() && isExplicit() ? 'Explicit/' : '') + 'mayor19.jpg" style="width:' + (perYou.isMaleSex() && isExplicit() ? '50%' : '25%') + ';float:left;margin-right:5px" alt="Mayor">' +
					'Both of you climax not even 5 minutes in, taking a brief moment to bask in the afterglow before you part with a final kiss. There\'s work to be done, but this surely was a pleasant distraction.',
					'dispPlace(Place, "type=conferencemayor&stage=stage5")'
				);
				return true;
			}
		}
		
		if (sType !== "") return false;

		// Initial meeting at the TV Station
		if (!checkPersonFlag("Mom", 26) && (Place == 413 || (Place == 412 && getQueryParam("enter") == "true")) && !this.checkFlag(2)) {
			this.setFlag(2);
			showPopupWindow("Mom's Assistant",
				"<img src='Images/People/Gabby/gabby1.jpg' class='imgpopup' alt='Gabby'>" +
				(Place == 412 && getQueryParam("enter") == "true" ? (isCharmedBy("Nina") ? "Nina runs a hand over her breasts and gestures to Madison's office, you walk over to the office while looking appreciatively at Nina.</p><p>" : "Annoyed, Nina gestures towards an office, you walk over.</p><p>") : "") +
				"You run right into probably the worst person to meet in the Studio, your Mom's ever faithful assistant.</p>" +
				"<p>Her name is Gabrielle Halliway, “Gabby” to the very few people she likes. And no, you are not among those. She hates tardiness, disorder and meddling kids and can be surprisingly intimidating for a 1.52m woman, but she must be good at her job. People in the studio rarely complain about her behavior and Mom even gets along with her fairly well.",
				'dispPlace(Place,"type=meetgabby")'
			);
			return true;
		}
		
		return false;
	};
	
	per.showEventConference = function()
	{
		var md;
		
		var perSarah = findPerson("Sarah");
		var perMayor = findPerson("Mayor");
		var bSarah = this.checkFlag(12);		// Here with Sarah
		var stage = getQueryParam("stage");
		
		if (sType == "startconference") {
			// Start of the conference
			// Set time to 6pm if we are earlier
			this.moveThem(98);
			var tm = nTime % 288;
			if (tm < 240) nTime += 242 - tm;
			md = WritePlaceHeader();
			addPlaceTitle(md, "The Press Gathering", "townhall-conferenceroom.jpg");
			md.write(
				'<p>Mayor Thomas surely likes it posh. The large conference room has been decorated lavishly, and if not for the many camera crews, this would almost seem like a high society party with the fancy dresses, buffet and  hired caterers serving drinks.</p>' +
				'<p>Press personal, contractors and socialites make the bulk of the attendees, and you quickly mingle into the crowd to not draw too much attention.</p>' +
				'<p>There\'s some time before you will be able to meet with Gabby, so you might as well look around a bit.</p>'
			);
			var img = "townhall-conferenceroom-people" + String.fromCharCode(Math.floor(Math.random() * 5) + 97);
			switch(img) {
				case "townhall-conferenceroom-peoplea": md.write('<p>A group of wealthy looking contractors has gathered in a corner of the room.</p>'); break;
				case "townhall-conferenceroom-peopleb": md.write('<p>A hired caterer briefly smiles to you before moving on to take another order.</p>'); break;
				case "townhall-conferenceroom-peoplec": md.write('<p>A security guard speaks into his microphone.</p>'); break;
				case "townhall-conferenceroom-peopled": md.write('<p>Two socialites have moved away from the main gathering to talk, from the looks of it about someone\'s wardrobe.</p>'); break;					
				case "townhall-conferenceroom-peoplee": md.write('<p>A camera team prepares their equipment.</p>'); break;				
			}
			startQuestions();
			if (!this.checkFlag(21) || !this.checkFlag(22)) startAlternatives(md);
			if (!this.checkFlag(21)) addLinkToPlaceC(md, 'look for Sarah', Place, 'type=conferencesarah');
			if (!this.checkFlag(22)) addLinkToPlaceC(md, 'look for Mayor Thomas', Place, 'type=conferencemayor');
			addLinkToPlaceC(md, 'mingle with the crowd and wait for the signal', Place, 'type=conferencemingle');
			if (!this.checkFlag(21) || !this.checkFlag(22)) endAlternatives(md);
			AddPeopleColumn(md);
			AddImage(img + '.jpg');
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "conferencesarah") {
			// Look for Sarah
			md = WritePlaceHeader();
			this.setFlag(21);
			perSarah.showPerson("sarah14.jpg");
			addPlaceTitle(md, "Talking to Sarah");
			md.write(
				'<p>Sarah Gates clearly knows how to navigate a crowd like this. She is smiling, answering questions and occasionally posing for pictures without ever appearing to be bored or impolite.</p>'
			);
			if (!bSarah) md.write('<p>Her Maid is usually not far away from her, but looks a lot more nervous. Her posture is stiff and her cheeks slightly red, you also notice that her eyes are frequently darting around.</p>');
			startQuestions();
			switch(stage) {
				case "":
					addQuestionR(md, 'talk to Sarah',
						(bSarah ? 'Sarah introduces you to the people she has been talking to as her temporary assistant and excuses herself to speak with you for a moment.</p>' +
									 '“We do have a bit of time before my interview, Mayor Thomas wants to impress people and is poised to give a few exclusives herself before the actual conference begins.” She smirks mischievously.”I will find you when the time comes, so feel free to mingle or stay.”'
								  : '“Ah, ' + perYou.getPersonName() + '.” Sarah approaches you the moment she sees you. “I am surprised to actually see you here, you are quite resourceful, it seems.” She keeps her voice low, and gestures for her maid to come over. “Lauren, be so good and get us something to drink.”</p>' +
									 '<p>The maid nods demurely and walks towards the buffets with a strangely stiff gait, and you notice Sarah flipping a switch on a sort of small item in her hand.'),
						"Sarah",
						bSarah ? "setQueryParams(\\'type=" + sType + "&stage=stage5\\')" : "setQueryParams(\\'type=" + sType + "&stage=stage2\\')"
					);
					break;
				case "stage2":
					addQuestionR(md, 'ask if everything goes well',
						'“I am bored out of my mind.” Sarah says matter of factly, yet never breaks the smile. “But uncle Ronnie would never think of attending these events, so I\'m the one stuck here.” She flicks something on the little stick again, and you could have sworn you\'ve seen Lauren stagger a bit at the same moment.',
						"Sarah",
						"setQueryParams(\\'type=" + sType + "&stage=stage3\\')"
					);
					break;
				case "stage3":
					addQuestionR(md, 'ask about the device in her hand',
						"<img src=Images/People/Lauren/lauren-o_face.jpg style=\\'width:10%\\'>" +
						'“Oh, that is just a fidget toy to keep my fingers busy.” Again she flicks a switch on her toy, and your, as well as other peoples, eyes are drawn towards an audible moan coming from the maid, who is pressing her tights together and barely able to balance the glasses. “It\'s nothing special, but it breaks up boredom a little.”',
						"Sarah",
						"setQueryParams(\\'type=" + sType + "&stage=stage4\\')"
					);
					break;
				case "stage4":
					addQuestionR(md, 'enjoy your drinks and have a short chat',
						'Lauren\'s face has taken on an even deeper shade of red when she delivers the glasses to you and you occasionally see her twitch and bite her lower lip.</p>' +
						'<p>However, when you ask her if she is well, she just nods quickly, explaining in few words that crowds make her a bit nervous and making sure to stay out of your sight behind Sarah for the rest of the conversation, which in itself turned out to be rather pleasant.</p>' +
						'<p>You talk about this and that, staying clear of certain topics while within the public and never really touching anything of importance, but it is a pleasant way to pass the time.',
						"Sarah",
						"setQueryParams(\\'type=" + sType + "&stage=stage5\\')"
					);
					break;
				case "stage5":
					addLinkToPlaceC(md, 'check out the rest of the conference', Place, 'type=startconference');
					break;
			}
			if (stage !== "" && stage != "stage5") addLinkToPlaceC(md, 'leave her for now', Place, 'type=startconference');
			AddPeopleColumn(md);
			if (!bSarah) findPerson("Lauren").showPerson("lauren13.jpg");
			else AddImageRandom("townhall-conferenceroom-people", 5);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "conferencemayor") {
			// Look for Mayor Thomas
			md = WritePlaceHeader();
			this.setFlag(22);
			perMayor.showPerson(isCharmedBy("Mayor") ? "mayor15.jpg" : "mayor16.jpg");
			addPlaceTitle(md, "Talking to Mayor Thomas");
			md.write(
				'<p>Mayor Thomas is by herself, overlooking the premise and making sure the hired personal is serving drinks and handing out fliers to the attendees.</p>'
			);
			startQuestions();
			switch(stage) {
				case "":
					addQuestionR(md, 'approach the Mayor',
						(bSarah ? (perMayor.isCharmedBy() ?
										'“' + perYou.getPersonName() + '?” The Mayor is surprised when she notices you. “I had no idea you wanted to be here I...” She looks around briefly to make sure no one is listening in and lowers her voice. “I could have made sure you gain VIP access, please don\'t tell me you went to someone else for help.”</p>' +
										'<p>You tell her about Sarah, and after a short look over to her, in which you are sure Beatrice created an extensive profile based on a million tiny details about how much of a threat Sarah might be to her, she turns back to you.</p>' +
										'<p>“She is not even one of, well, yours.” She casts another nervous look to Sarah. “Are you really sure it is wise to involve outsiders and not use the resources available? Like me?”</p>' +
										'<p>You assure her that you intent to use her many times, but for this one, Sarah seemed like the better choice, which seems to cause her no small amount of discomfort.</p>' +
										'<p>“Of course, but if there is anything I can do to assist you, please don\'t hesitate to ask!”'
									 : '“Please, I am very busy making sure that everything is perfect. So, unless you have an appointment for a personal interview you will have plenty of time to ask questions during the conference.”</p>' +
										'<p>You ponder for a moment to insist on talking to her, but the way she looks over to the security personal makes you think better of it.'
									 )
								  : 'Mayor Thomas turns to you with a conspiratorial smile. “Everything is going just as planned, ' + perYou.getPersonName() + '. Miss Halliway will be alone in one of the rooms to conduct an interview, and I made sure that the person she is set to meet will be sufficiently delayed, to give you all the time you need.“ Miss Thomas is positively exhilarated.</p>' +
									 '<p>“Thank you so much, again, ' + perYou.getPersonName() + ', this little event was close to become a disaster, but if I am able to help you expand your harem, all will be worth it.”'),
						"Mayor",
						"setQueryParams(\\'type=" + sType + '&stage=' + (perMayor.isCharmedBy() ? "stage2" : 'stage5') + "\\')"
					);
					break;
				case "stage2":
					addPopupLink(md, 'maybe she can help you in some “other” ways',  "Other Help",
						perMayor.addPersonString("mayor17.jpg", "height:max%", "right") +
						'Mayor Thomas looks uncertain whether she should really leave the crowd alone, even for a while, but of course her desire wins over.</p>' +
						'<p>She tells you to meet her in 5 minutes inside one of the empty rooms to avoid suspicion, and when you follow her, she is already nearly undressed and ready for you.',
						false, "dispPlace(Place,'type=conferencemayor&stage=stage3')"
					);
					addLinkToPlaceC(md, 'leave her for now', Place, 'type=startconference');
					break;
				case "stage5":
					addLinkToPlaceC(md, 'check out the rest of the conference', Place, 'type=startconference');
					break;
			}
			AddPeopleColumn(md);
			AddImageRandom("townhall-conferenceroom-people", 5);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "conferencemingle") {
			// Mingle in general
			md = WritePlaceHeader();
			addPlaceTitle(md, "Mingling At The Press Gathering", "townhall-conferenceroom.jpg");
			md.write(
				'<p>At this point, all you can do is keep ready and hope that everything goes to plan. Gabby should soon be on the way to a room in the back of the Town Hall, so you just move aside, try not to be noticed and apparently fail spectacularly at that.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'someone calls out to you', Place, 'type=conferencecallout');
			AddPeopleColumn(md);
			AddImageRandom("townhall-conferenceroom-people", 5);
			WritePlaceFooter(md);
			return true;		
		}		
		
		if (sType == "conferencetalkjulie1") {
			// Stopped by Julie 1
			md = WritePlaceHeader();
			AddImage("People/Julie/julie1.jpg");
			addPlaceTitle(md, "A Reporter");
			switch(stage) {
				case "":
					md.write(
						'<p>The journalist\'s eyes are inquisitive, but she approaches you with a friendly smile and open demeanor.</p>' +
						'<p>“Julie Luna, from the Midwestern Gazette.” She immediately introduces herself. “Excuse my boldness, but I had thought I\'d know every face I would meet here, so you kind of picked my curiosity.”</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, 'introduce yourself', Place, 'type=conferencetalkjulie1&stage=stage2');
					break;
				case "stage2":
					md.write(
						'<p>You think about sending her away, but if her reputation is anything to go by, this will only make her more curious. So you politely introduce yourself using your cover story.</p>'
					);
					if (bSarah) md.write('<p>“So, you are Miss Gates\'s new assistant?” Her interest is clearly perked now. “This makes you about 30% more interesting than anyone else in here, including the mayor.”</p>');
					else md.write('<p>“So you are Miss Thomas\'s new Aide?” She gives you a curious one-over. “I\'m impressed, she has a reputation for being picky and pretty tough on her staff, you must have made quite the impression.”</p>');
					startQuestions();
					addLinkToPlaceC(md, 'ask about her own work', Place, 'type=conferencetalkjulie1&stage=stage3');
					break;
				case "stage3":
					md.write(
						'<p>You try to lead the conversation away from yourself and ask Julie about her own work. After all, the gazette is not really known to take an interest in politics and housing projects.</p>' +
						'<p>“You see right through me.” She smirks. “Glenvale has always been a place of interest for myself and our readers, with the Kurndorf myth and the towns lively past, but right now the place seems abuzz with rumors of strange happenings from ghost sightings to people vanishing under mysterious circumstances.”</p>' +
						'<p>“In fact.” Her expression turns more serious. “A local blogger I wanted to meet is among those missing as well, a girl named Jesse.”</p>'
					);
					startQuestions();
					addLinkToPlaceC(md, '"A local blogger?"', Place, 'type=conferencetalkjulie2');
					break;					
			}
			AddPeopleColumn(md);
			AddImageRandom("townhall-conferenceroom-people", 5);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "conferencetalkjulie2") {
			// Stopped by Julie 2
			md = WritePlaceHeader();
			perJesse.showPerson("jesse-photo.jpg");
			addPlaceTitle(md, "A Reporter");
			md.write(
				'<p>You really hope she did not notice how your stomach just made a double back-flip when you heard the name, but if she did, she doesn\'t show it and gladly gives you more information.</p>' +
				'<p>“Yes, she was last seen at the Broken Inn and completely went off the grid a few days back with not even her father knowing where she is.” She shows you a photo on her smartphone, and your heart sinks even further seeing an all to familiar face.</o>' +
				'<p>“It\'s also part of the real reason I wanted to talk to you. '
			);
			if (!bSarah) md.write('The mayors staff is always tight-lipped about everything, but I\'m sure they are well-informed, and if you overhear something, I would appreciate it if you can give me a hint.</p>');
			else md.write('The Gates family has a reputation for being involved in the paranormal, but they don\'t exactly speak with our paper. If my gut feeling is right and Jesse\'s disappearance is linked to the weird things happening around town, they might hear something, in that case I would appreciate a hint.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'try to answer her', Place, 'type=conferencetalkjulie3', 'You are not sure how to answer this, so it\'s probably a stroke of luck that you are interrupted the moment you try to.');
			AddPeopleColumn(md);
			AddImageRandom("townhall-conferenceroom-people", 5);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "conferencetalkjulie3") {
			// Stopped by Julie 3
			md = WritePlaceHeader();
			if (bSarah) perSarah.showPerson("sarah14.jpg");
			else findPerson("Angela").showPerson('!angela15' + (isCharmedBy("Angela") ? 'a' : 'b') + '.jpg');
			addPlaceTitle(md, "An Interruption");
			if (bSarah) {
				md.write(
					'<p>“' + perYou.getPersonName() + ', Miss Luna.” Sarah gives Julie a very terse nod before turning to you. “It is time for the interview, we should be going.”</p>' +
					'<p>“Of course, Miss Gates, but I never meant to infringe on your staff for too long and shall take my leave.” The two women exchange brief glances before Julie bids you farewell and vanishes back into the crowd while Sarah takes you with her to the back of the future hotel.</p>' +
					'<p>“Be careful around the press, especially her.” Sarah remarks with a neutral voice, but it doesn\'t look like she wishes to talk more about Julie. “For now, let\'s focus on getting that naughty little hypnotist on your side, I\'ve been looking forward to it all night.”</p>'
				);
			} else {
				md.write(
					'<p>“' + perYou.getPersonName() + '.” Angela interrupts you before you are able to say anything. “Miss Thomas wishes to let you know that you are needed during the next appointment, please follow me.”</p>' +
					'<p>“You apologies to Julie for cutting the talk short, but she is quite understanding and quickly vanishes into the crowd as Angela leads you to the back of the Town hall.</p>'
				);
			}
			startQuestions();
			addPopupLinkToPlaceC(md, 'follow ' + (bSarah ? 'Sarah' : 'Angela'), 97, 'type=conferencegabby', "Break Room",
				'<img src="Images/door1.jpg" style="width:25%;float:right;margin-left:5px" alt="Dress">' +
				'You follow ' + (bSarah ? 'Sarah' : 'Angela') + ' through a long corridor, past several doors and way from the prying eyes of the crowd until you stand in front of a door to a break room of the Town Hall. ' +
				(bSarah ? 'Sarah goes in first, telling you to give her a few minutes before following to make sure she has Gabby\'s full attention.'
						  : 'Angela tells you that your “appointment” is waiting inside and takes her leave to help with preparations, and you take a short look around to make sure that really no one is watching.') +
				'</p><p>You open the door....</p>'
			);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "conferencegabby") {
			// Gabby at the Conference!
			md = WritePlaceHeader();
			this.showPerson('gabby2.jpg');
			addPlaceTitle(md, "Gabby");
			md.write(
				'<p>Gabby turns towards the door and recognizes you instantly, a look of surprise on her face.</p>'
			);
			if (bSarah) md.write('<p>Sarah is sitting next to her, waiting for you to make your move.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'leave the room', 94, '', 'Well... what did you expect to happen? The moment you leave the room, Gabby rushes out, almost running you over and out of sight with surprising speed, most likely to get Mom and run. That could have gone better...', '', "movePerson('Gabby',998);movePerson('Mom',998)");
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "conferencecharm1") {
			// Charm Gabby at the conference 1
			md = WritePlaceHeader();
			this.showPerson('gabby3.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell...Maybe");
			md.write(
				'<p>Doubt begins to gnaw on you as you speak the incantation, a strange feeling as if this is not the best course of action, that you might be making a horrible mistake by casting that spell on Gabby.</p>' +
				'<p>Does she really deserve this? What if she has defenses you don\'t know about? Your eyes fall on her necklace, and for a second, you don\'t think you should go through with this.</p>'
			);
			if (bSarah) md.write('<p>Sarah is sitting next to her, watching.</p>');
			startQuestions();
			if (this.checkFlag(8)) addLinkToPlaceC(md, 'ignore it and push through', Place, 'type=conferencecharm2');
			else addLinkToPlaceC(md, 'stop and let the mana disperse', 94, '', 'You don\'t know what is coming over you, but you can\'t finish the spell...</p><p>The mana dissipates and you are left with an uncomfortable, hollow feeling inside.</p><p>Gabby, on her end, doesn\'t take long to connect the dots and figure out what you were trying to do, and before you know it she\'s tackled you aside with for her stature surprising force and is on her way out of the building.', '', "movePerson('Mom',998)");
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "conferencecharm2") {
			// Charm Gabby at the conference 2
			md = WritePlaceHeader();
			this.showPerson('gabby4.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>The spell on the necklace capitalizes on your own uncertainty, but knowing for sure that it\'s all smoke and mirrors thanks to your research, you easily push those feelings away and finish the spell, and not a second too late.</p>' +
				'<p>“Dai Chu? Is this some sort of joke, ' + perYou.getPersonName() + '?” Gabby asks in a condescending tone. “I don\'t know what you are hoping to achieve here, but you will step aside and let me leave this instant.”</p>' +
				'<p>There is a sharp edge to her voice, but while she may approach you aggressively, you can already see specks of pink flashing behind her eyes.”</p>'
			);
			if (bSarah) md.write('<p>Sarah is sitting next to her, watching.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'close the door and tell her to stay here', Place, 'type=conferencecharm3');
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "conferencecharm3") {
			// Charm Gabby at the conference 3
			md = WritePlaceHeader();
			this.showPerson('gabby5.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>Gabby stops in her tracks and just stares at you incredulously, her mind racing in an attempt to wrap itself around what is happening until her eyes suddenly widen in shock.</p>' +
				'<p>“You... you actually do know the Dai Chu...” She backs away from you. “That\'s why all the girls Alex told me about seem to flock to you...“ She desperately looks for an exit, her arm occasionally twitching as if intending to hit you, but never pulling through.</p>'
			);
			if (bSarah) md.write('<p>Sarah is sitting next to her, watching.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'Order her to tell you about Mom', Place, 'type=conferencecharm4');
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "conferencecharm4") {
			// Charm Gabby at the conference 4
			md = WritePlaceHeader();
			this.showPerson('gabby6.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>“How do you....” Gabby shoots you an angry glare, clearly struggling with herself before she blurts out the answer. “Yes, I have been hypnotizing her to be my slave, happy now?” You ask why she did it, and Gabby just snarls. “Who doesn\'t want to do that to their boss? She would have loved to worship this body.” She tears off her top and poses for you. “I would have made her scream in pure ecstasy at my feet, pushing her from one blissful climax to the next! She\'d be in heaven.”</p>' +
				'<p>Yeah, that\'s not a mental image you necessarily wanted to have, but at least she doesn\'t try to resist the spell, now that you got her ranting.</p>'
			);
			if (bSarah) md.write('<p>Sarah is sitting next to her, watching.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'play with her ego to keep her ranting', Place, 'type=conferencecharm5');
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "conferencecharm5") {
			// Charm Gabby at the conference 5
			md = WritePlaceHeader();
			this.showPerson('gabby7.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>You didn\'t know Gabby could be passionate about anything, but there is clearly some pent-up frustration she is finally letting out and you decide to goat her further play on her ego a bit.</p>' +
				'<p>“As if you don\'t  desire me, too.” Gabby throws her top away and begins to push down her pants. “You would not have used that spell on me if you didn\'t, am I right, ' + perYou.getPersonName() + '? So have a good look!”</p>' +
				'<p>“Look at all this and tell me to my face that you don\'t want to fuck me!” Her eyes show a strange mix of anger and lust, and you are not quite what she wants to do more at this point, fuck you, or kill you.</p>'
			);
			if (bSarah) md.write('<p>Sarah is sitting next to her, watching.</p>');
			startQuestions();
			startAlternatives(md);
			addLinkToPlaceC(md, 'order your her to sit down on the bed and behave, like a good slave', Place, 'type=conferencecharmslave1');
			if (perYou.checkFlag(26)) {
				addLinkToPlaceC(md, 'rile her up even further', Place, 'type=conferencecharmlover1');
				addLinkToPlaceC(md, 'actually, tell her she\'ll serve your Mom instead', Place, 'type=conferencecharmmomservant1');
			}
			endAlternatives(md);
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "conferencecharmleave") {
			// Charm Gabby at the conference and leave
			md = WritePlaceHeader();
			this.showPerson('gabby7.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>Your refusal doesn\'t really improve Gabby\'s already sour mood, and she glares daggers towards you when you tell her to finish up whatever she still had to do and that you will seek her out later.</p>'
			);
			if (bSarah) {
				md.write(
					'<p>“Fine... I believe I still had to conduct my interview with Ms Gates anyway.” She turns to Sarah, who just smirks. “I have no idea why you would help ' + perYou.getHimHer() + ', but I presume you are still here for the interview?”</p>' +
					'<p>“If you stay like this all the more, Miss Halliway.”</p>' +
					'<p>You are amazed that Gabby is still able to go through her questions with a straight face as you pick up the keys and prepare to leave through the open door... wait, didn\'t you close it?</p>' +
					'<p>In any case, you got the keys and the address, time to look for Mom.</p>'
				);
			} else {
				md.write(
					'<p>“Fine, I still have to conduct an interview anyway, and you are probably responsible for the holdup.”</p>' +
					'<p>The two of you agree to meet later, and as... well, angry as Gabby is, you might actually want to follow up on it before she chases you down.</p>' +
					'<p>It\'s not a mistake you should make too often, but in any case, you got the keys and the address, time to look for Mom.</p>'
				);
			}
			startQuestions();
			startAlternatives(md);
			addLinkToPlaceC(md, 'leave the room', 94, '', 'You gather up what you need and leave through the open door... didn\'t you close it?</p><p>You are not sure, but at least no one walked in on you.');
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}

		if (sType == "conferencecharmslave1") {
			// Charm Gabby at the conference - Slave 1
			this.charmThem(4);
			if (whereItem(67) === 0) PlaceI(67);
			md = WritePlaceHeader();
			this.showPerson('gabby8.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>Gabby follows suit, much to her own surprise, keeping her legs spread and sitting still like a good girl.</p>' +
				'<p>“The spell has already progressed this far... I\'m about to become some stupid teenager\'s fucktoy...” The realization hits her hard, and she suddenly bursts out laughing. “This is rich... to think that you of all people had the potential to be a ' + perYou.getWitch() + ' all this time while I had to rely on silly trinkets...” She throws the Necklace onto the floor with an angry grunt and tries to focus. “And to think this stupid spell makes even you look... absolutely radiant...”</p>'
			);
			if (bSarah) md.write('<p>Sarah is sitting next to her, watching.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'push her further', Place, 'type=conferencecharmslave2');
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}

		if (sType == "conferencecharmslave2") {
			// Charm Gabby at the conference - Slave 2
			md = WritePlaceHeader();
			this.showPerson('gabby9.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>“It\'s fascinating is it not? How your body is getting hot and flustered, trembling with need and desire as your mind is being claimed by a true ' + perYou.getWitch() + '?”</p>' +
				'<p>Yep, you didn\'t expect to find this sore spot, but you are sure as hell going to hit it.</p>' +
				'<p>“How you want your ' + perYou.getMaster() + ' to punish you for the bad things you did, how you want ' + perYou.getHimHer() + ' to make you scream in pain in pleasure, how your body yearns to be claimed by your betters?”</p>' +
				'<p>“You are not...” Gabby rises to her feet only to be stopped by another harsh command.</p>' +
				'<p>“Sit down, slave!”</p>' +
				'<p>She immediately sits back on the bed, glaring daggers at you.</p>' +
				'<p>“I am. And you will accept that, slave.”</p>' +
				'<p>Gabby\'s body is taken by a lustful shudder  as you say the last word, her underwear showing red wet stains.</p>' +
				'<p>“You will yearn for me to take you, punish you and treat you like a little painslut. And you will get off from it like you never did before.</p>'
			);
			if (bSarah) md.write('<p>Sarah is sitting next to her, watching.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'Gabby glares at you', Place, 'type=conferencecharmslave3');
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}

		if (sType == "conferencecharmslave3") {
			// Charm Gabby at the conference - Slave 3
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson('gabby10.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>“F...fuck you!... I... I...” She is still fighting, nominally at least, “I will... I am... Oh, to hell with it...!” Gabby tears off what is left of her clothes and turns around.</p>' +
				'<p>“Yes, I want to show myself off to you and be punished like a slutty, dirty slave!” She slaps her own ass. “Happy now, you damn, cheating, teenage ' + (perYou.isBornMale() ? 'bastard' : 'bitch') + '? Happy to have ruined everything I\'ve worked towards for months?”</p>' +
				'<p>Wow, you did not expect an outburst like that, Gabby must have had a ton of pent-up frustration under the cold exterior.</p>' +
				'<p>“I\'m yours now, “' + perYou.getMaster() + '”.” There is not a hint of submission in her voice, but she still offers herself to you. “Fuck me, spank me, punish me and better make it count. I sure as hell wouldn\'t have went easy on you!”</p>'
			);
			if (bSarah) md.write('<p>Sarah is sitting next to her, watching.</p>');
			startQuestions();
			if (!this.checkFlag(14)) {
				addQuestionR(md, '"First things first, where\'s Mom?"',
					'“Alex is at my home on 11 Amaranth place, awaiting her full indoctrination.” Gabby reluctantly hands you the keys. “Do with her as you wish.“</p><p>You might have to do something about that attitude, but for now, Mom is more important.',
					"",
					"setPersonFlag(\\'Gabby\\',14);setPlaceKnown(\\'GabbysHouse\\')"
				);
			} else {
				startAlternatives(md);
				addLinkToPlaceC(md, 'tell Gabby to meet you at her house once her business here is concluded', 94, '', 'Gabby looks annoyed that you don\'t follow up right away, but she will require some proper disciplining, for which you now simply lack the time. Not to mention that you might need some help to employ certain ideas.</p><p>Nevertheless, you have what you needed, time to head out and find Mom.');
				if (!bSarah) addLinkToPlaceC(md, 'take her up on her offer', Place, 'type=conferencecharmslave5');
				else addLinkToPlaceC(md, 'take her up on her offer', Place, 'type=conferencecharmslave4');
			}
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}
	
		if (sType == "conferencecharmslave4") {
			// Charm Gabby at the conference - Slave 4 - Sarah's request
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson('gabby10.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>Before you do anything more, “I can leave if you want.” Sarah interjects with a smirk. “Though I\'d much rather stay.”.</p>'
			);
			startAlternatives(md);
			addLinkToPlaceC(md, 'ask her to join in', Place, 'type=conferencecharmslave5&stage=sarah1');
			addLinkToPlaceC(md, 'tell her to leave', Place, 'type=conferencecharmslave5&stage=nosarah', '“Fine with me, just remember that we still have an interview scheduled.”</p><p>Sarah leaves the room through the open door and... wait, didn\'t you close it?</p><p>Maybe not. In any case, you are now alone with Gabby', 'Sarah');
			addLinkToPlaceC(md, 'allow her to stay', Place, 'type=conferencecharmslave5&stage=sarahwatch', 'Sarah smiles at you brightly and leans back on the chair, gesturing for you to proceed.');
			AddPeopleColumn(md);
			perSarah.showPerson("sarah15.jpg");
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "conferencecharmslave5") {
			// Charm Gabby at the conference - Slave 5 - End
			md = WritePlaceHeader(false, stage == "sarah1" || (perYou.isMaleSex() && !isExplicit()) ? '' : 'td-left-med');
			if (stage == "sarah1") perSarah.showPerson("sarah16.jpg");
			else if (stage == "sarah2") {
				if (perYou.isMaleSex()) this.showPersonX("gabby-sarahm.jpg");
				else this.showPerson("gabby-sarahf.jpg");
			} else if (perYou.isMaleSex()) {
				if (isExplicit()) this.showPersonX("gabby14m.jpg");
				else this.showPersonX("gabby19.jpg");
			} else this.showPerson("gabby14f.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			if (stage == "sarah1") {
				md.write(
					'<p>“Hmh, it is my first chance to play with a charmed woman, is it?”</p>' +
					'<p>Sarah rises from her chair and begins to take off her clothes, her eyes on you. “One rule, though. I am saving my virginity, so no penetration of any kind, understood?”</p>' +
					'<p>You are a little surprised to hear that. Sarah isn\'t exactly an example of virginal purity, but the way she looks at you suggests that she takes this rule very serious, and you\'ll have your hands full with Gabby anyway.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Understood"', Place, 'type=conferencecharmslave5&stage=sarah2');

			} else {
				if (stage == "sarah2") {
					md.write(
						'<p>Gabby is... intense.</p>' +
						'<p>With the spell having effectively eliminated her inhibitions, she is aggressive and often vicious in a way few other women you have been with are. She is openly struggling for dominance, but with you and Sarah working against her, it is easy to keep her under control.</p>' +
						'<p>Sarah in particular is interesting to watch. She seems to know how to handle someone like her and does so with both tender playfulness and sadistic glee, taking intense pleasure in both the control she has over the struggling, charmed woman and watching you take advantage of her.</p>' +
						'<p>You trade sloppy kisses with both women, and while Sarah makes sure to direct most of your attention to Gabby at first, she grows more open as time passes, both accepting your affections and repaying them as the three of you bring each other to orgasm and finally collapse together.</p>'
					);
					
				} else {
					md.write(
						'<p>Gabby is... intense.</p>' +
						'<p>She wants to hurt you as much as she wants you to enjoy yourself, and the sex feels more like a struggle for dominance than anything you have done so far.</p>' +
						'<p>And you kinda like it.</p>' +
						'<p>Your adrenaline is pumping as you pin each other to the bed, roll around, pull hair and trade sloppy kisses. Your body aching from both the strain and the many times she slapped your ass or dug her fingertips into your muscles, both gestures you made sure to repay in kind, and as you reach your peak, you are certain you\'ll both feel this workout for a while.</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, 'gather your things and leave', 94, '', 'Gabby still has her interview to conduct, which you are sure will be interesting, so you\'ll leave her at the Town hall for now and agree to meet with her later, after you found Mom.');
			}
			if (stage == "sarahwatch") {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "conferencecharmlover1") {
			// Charm Gabby at the conference - Lover 1
			this.charmThem(2);
			if (whereItem(67) === 0) PlaceI(67);
			md = WritePlaceHeader();
			this.showPerson('gabby11.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>You are just here to get her away from Mom, at least that\'s what you tell her, explaining further that you\'ve known her long enough to easily suspect that she is probably stiff as a plank in bed and just about as passionate as one.</p>' +
				'<p>It has the desired effect, if you wanted to make her furious, that is.</p>' +
				'<p>“You little ' + (perYou.isBornMale() ? 'bastard' : 'bitch') + '...” Gabby throws more of her clothes off, including the Necklace as she approaches you. “How is that for passion?”</p>' +
				'<p>Your vision blurs as her palm suddenly connects with your face and you feel a dull pain spreading through the left half of it.</p>'
			);
			if (bSarah) md.write('<p>You are pretty sure you hear Sarah giggling</p>');
			md.write(
				'<pGabby just slapped you, and with quite some force.</p>' +
				'<p>You lift your arms in reflex, but she just brushes them aside, grabs your shirt and pushes your already dazed body against the wall behind you with a loud thud.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'order her to stop', Place, 'type=conferencecharmlover2');
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}

		if (sType == "conferencecharmlover2") {
			// Charm Gabby at the conference - Lover 2
			md = WritePlaceHeader();
			this.showPerson('gabby12.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>“Too passionate?” Gabby whispers in a condescending voice as she presses her naked body against you. “Or too rough for you?” You feel her lips on yours and your heart begins to race, the dull, throbbing pain on your left fading as she loosens her grip and gently drives her fingertips over your shoulders and along your cheeks.</p>' +
				'<p>Surprisingly: She\'s a good kisser...</p>' +
				'<p>You find yourself returning her affections, pulling her closer as you dance, no, fight with her tongue, a struggle for dominance going on for a minute with no clear winner as the kiss is broken.</p>' +
				'<p>“I want you to fuck me so badly...” Gabby whispers out of breath, her eyes locked on you, fully claimed by the spell. “I hate you...” You feel her fingertips digging painfully into your shoulder. “You are a stupid, meddling, cheating ' + (perYou.isBornMale() ? 'bastard' : 'bitch') + ', and I have never wanted anyone so much, not even Alex.”</p>'
			);
			if (bSarah) md.write('<p>Sarah is sitting next to her, watching.</p>');
			startQuestions();
			addLinkToPlaceC(md, '"Speaking off, where is she?"', Place, 'type=conferencecharmlover3');
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}

		if (sType == "conferencecharmlover3") {
			// Charm Gabby at the conference - Lover 3
			md = WritePlaceHeader(false, 'td-left-med');
			setPlaceKnown('GabbysHouse');
			this.showPerson('gabby13.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>It\'s not an effect you had expected. Gabby is clearly under your spell, but she is neither submissive nor does she really seem to love you, but she is still beholden to follow your orders, as shown when you tell her to let you to let go off you and tell you about Mom.</p>' +
				'<p>“Fine, she is in my home, 11 Amaranth place, keys are in my handbag if you want to get her... however... ”She lies down on the bed and gives herself a slap on the rear. “I\'d much rather be doing something else first...”</p>'
			);
			if (bSarah) md.write('<p>Sarah is sitting next to her, watching.</p>');
			startQuestions();
			startAlternatives(md);
			addLinkToPlaceC(md, 'take the key and leave', Place, 'type=conferencecharmleave');
			if (!bSarah) addLinkToPlaceC(md, 'take her up on her offer', Place, 'type=conferencecharmslave5');
			else addLinkToPlaceC(md, 'take her up on her offer', Place, 'type=conferencecharmslave4');
			endAlternatives(md);
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "conferencecharmmomservant1") {
			// Charm Gabby at the conference - Mom's Servant 1
			this.charmThem(1);
			if (whereItem(67) === 0) PlaceI(67);
			md = WritePlaceHeader();
			this.showPerson('gabby11.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>“I\'ll do what?” Gabby looks outraged. “You can\'t cast that spell on me and just shove me away! I need... I want... Damn you!”</p>' +
				'<p>Again, you feel like she wants to hit you, but can\'t quite bring herself to do so, and you push her further while the spell is still molding her mind.</p>' +
				'<p>“You want to please me, Gabby, do you?”</p>' +
				'<p>Silence.</p>' +
				'<p>“I know you do, and I believe you can serve me best when you serve my mother.”</p>' +
				'<p>“I... I don\'t...“ Gabby stutters, clearly confused.</p>' +
				'<p>“I want you to be the best assistant you can be, read every wish off her lips and do whatever she wants you to do.” There\'s a certain amount of irony in turning her into a slave to the woman she tried to enslave herself, and you like that.</p>' +
				'<p>“But.... but I want to be yours...” Either she has forgotten that she hates you, or she really doesnt want to be Mom\'s servant.</p>'
			);
			if (bSarah) md.write('<p>You are pretty sure you hear Sarah giggling</p>');
			startQuestions();
			addLinkToPlaceC(md, 'she\'ll serve you by serving your Mom', Place, 'type=conferencecharmmomservant2');
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}

		if (sType == "conferencecharmmomservant2") {
			// Charm Gabby at the conference - Mom's Servant 2
			md = WritePlaceHeader();
			this.showPerson('gabby12.jpg');
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>“You will be, and I assign you to serve my Mother, your boss, and in serving her, you\'ll serve me, doesn\'t that make sense?”</p>' +
				'<p>Gabby\'s mind is racing, her expression shifting between rage and confusion as the spell forces her to accept your words as truth.</p>' +
				'<p>“It... does...”</p>' +
				'<p>“So what will you do?”</p>' +
				'<p>“I will serve you by devoting myself to serving Alex and fulfilling her every wish...”</p>' +
				'<p>“Good Girl.”</p>' +
				'<p>Gabby still looks less than pleased with this outcome, but it feels like a fitting punishment for her.</p>' +
				'<p>She probably won\'t be available for quick sex when she is with Mom, well unless...</p>' +
				'<p>No, that\'s a bridge you cross when you get there.</p>'
			);
			if (bSarah) md.write('<p>You are pretty sure you hear Sarah giggling</p>');
			startQuestions();
			if (!this.checkFlag(14)) {
				addQuestionR(md, '"First things first, where\'s Mom?"',
					'“Alex is at my home on 11 Amaranth place, awaiting her full indoctrination.” Gabby reluctantly hands you the keys. “Do with her as you wish.“</p><p>You take the keys and order Gabby to finish whatever business she has here, mostly her interview.</p><p>You will visit later to make sure she is doing as told.',
					"Gabby",
					"setPersonFlag(\\'Gabby\\',14);setPlaceKnown(\\'GabbysHouse\\')"
				);
			} else addLinkToPlaceC(md, 'leave the room', 94, '', 'You gather up what you need and leave through the open door... didn\'t you close it?</p><p>You are not sure, but at least no one walked in on you. ');
			if (bSarah) {
				AddPeopleColumn(md);
				perSarah.showPerson("sarah15.jpg");
			}
			WritePlaceFooter(md);
			return true;		
		}
		return false;
	};
	
	per.showEventTrap = function()
	{
		var perTina = findPerson("Tina");
		var stage = getQueryParam("stage");
		var q1 = getQueryParam("q1");
		var q2 = getQueryParam("q2");
		var q3 = getQueryParam("q3");

		
		if (sType == "gabbyhouseapproach") {
			// Approach the house
			md = WritePlaceHeader();
			addPlaceTitle(md, "Gabby\'s Front Door", "house9-frontdoor.jpg");
			md.write(
				'<p>The door is locked, the windows are blacked out and no one reacts when you ring the doorbell. The place looks empty, though it\'s not like Gabby has any reason to open the door for you to begin with.</p>'
			);
			if (perTina.place == -1) md.write('<p>Tina approaches the house at the same time you do, she looks a little nervous.</p>');
			if (isSpellKnown("Pass")) {
				md.write(
					'<p>It\'s strange, the house actually seems to be warded in some way. There are some similarities to the protections on the Gates mansion, but they are not nearly as strong and, in fact, quite uneven.</p>' +
					'<p>It doesn\'t take you long to develop a feel for the magical energies forming the wards, and after walking around the house once, you notice one spot in particular where it is thin enough for you to effortlessly pass through.</p>'
				);
			}
			startQuestions();
			if (isSpellKnown("Pass")) {
				startAlternatives(md);
				if (nMana < 2) addTextForQuestions(md, '<b>You do not have enough mana to cast pass so you are stuck here</p>', 'center');
				else if (perTina.place != -1) addLinkToPlaceC(md, 'pass into the house', 453, 'type=gabbyhousestudy1', 'It feels a bit like passing through a fragile spider-net. The wards stretch for maybe a second before breaking away and letting you pass through into what looks like Gabby\'s home office.</p><p>The room is very clean and bears similarity\'s to Gabby\'s workplace at the studio. It should be easy to snoop around and find something.', '', "AddMana(-2)");
				else addLinkToPlaceC(md, 'pass into the house', 453, 'type=gabbyhousestudy1', 'You take Tina\'s hand and recast the spell, allowing both of you to walk through the wall into the house.</p><p>It feels a bit like passing through a fragile spider-net. The wards stretch for maybe a second before breaking away and letting you pass through into what looks like Gabby\'s home office.</p><p>The room is very clean and bears similarity\'s to Gabby\'s workplace at the studio. It should be easy to snoop around and find something.', '', "AddMana(-2)");
				addLinkToPlaceC(md, 'not now', 38, '', 'Right... this spot feels a little too obvious. You don\'t really know what you find on the other side of the wall. Maybe you know someone who knows about wards and other magic symbols or could help with any magical traps?', '', "setPersonFlag('Gabby',15)");
				endAlternatives(md);
			} else addLinkToPlaceC(md, 'return to the street', 38);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "gabbyhousestudy1") {
			// In the Study
			md = WritePlaceHeader();
			addPlaceTitle(md, "Gabby\'s House", "livingroom-gabby.jpg");
			md.write(
				'<p>You take the first, steps into the room, careful not to make too much noise, but something is not... right.</p>' +
				'<p>You feel an unpleasant tingle in the back of your neck. The sensation quickly spreads through your entire body with every step taken, and before you are really able to react, you find the strength leaving your body and fall to your knees.</p>'
			);
			if (perTina.place == -1) md.write('<p>You look around and find Tina on her knees as well, her eyes fearfully darting through the room.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'what\'s happening?', Place, 'type=gabbyhousestudy2');
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "gabbyhousestudy2") {
			// In the Study
			md = WritePlaceHeader();
			addPlaceTitle(md, "Gabby\'s Trap", "livingroom-gabby.jpg");
			md.write(
				'<p>This is bad... your head is spinning and your body locked in place. You try to muster enough magical energy for a spell, but can\'t seem to focus your mana. In panic, you look around the room and finally notice the strange markings on every wall, unknown to you, but clearly magical in nature, and after a minute of struggling, Gabby appears in the door.</p>' +
				'<p>“' + perYou.getPersonName() + '... I suspected that someone had spied on us and searched my office, but I had still hoped it wouldn\t be you I\'d find here...”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'look at Gabby', Place, 'type=gabbyhousestudy3');
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "gabbyhousestudy3") {
			// In the Study
			md = WritePlaceHeader();
			this.showPerson("gabby1.jpg");
			addPlaceTitle(md, "Gabby\'s Trap");
			md.write(
				'<p>Gabby\'s eyes seem to burn a hole into you as she looks over your kneeling, helpless body, her voice cold, not unlike Moms when she gives an “I\'m not mad, just disappointed” speech.</p>' +
				'<p>“So I was right, you are using spells from the book of control. Are you also the one responsible for the death of its guardian?”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'She knows of the book?', Place, 'type=gabbyhousestudy4');
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "gabbyhousestudy4") {
			// In the Study
			md = WritePlaceHeader();
			this.showPerson("gabby1.jpg");
			addPlaceTitle(md, "Gabby\'s Trap");
			md.write(
				'<p>“Of course, I do. My ancestors had been involved with Kurndorf, and while I do not share their... ambitions I do keep track of the supernatural Community.” Her expression darkens.</p>' +
				'<p>“When I heard of the murder of Sir Gates, I knew someone must have stolen it, and when Alex began to tell me about the stained shirt and how popular you are suddenly with the girls it was easy to put two and two together.”</p>' +
				'<p>“Now please answer my question: Did you kill Sir Ronald Gates?”</p>'
			);
			startQuestions();
			if (isMurderPath(true)) addLinkToPlaceC(md, '"No, but you witnessed Davy Robbins do it"', Place, 'type=gabbyhousestudy5', '“Davy Robbins?” She tilts her head and you explain that he is a classmate of yours who recently turned out to be a warlock.</p><p>Another Warlock... that\'s even more complications to take care off.”');
			else {
				startAlternatives(md);
				addLinkToPlaceC(md, 'Truth - "Yes, but it was an accident"', Place, 'type=gabbyhousestudy5', '“You just happened to accidentally shoot a man and steal his most priceless possession?”</p><p>“Really, now?', 'Gabby');
				addLinkToPlaceC(md, 'Lie - "No, he was already dead when you arrived at the mansion"', Place, 'type=gabbyhousestudy5', '“And then you just took the book the murderer left behind and ran?” She tilts her head. “I want to believe you, for Alex\'s sake, but I\'m not sure I can.”', 'Gabby');
				endAlternatives(md);
			}
			WritePlaceFooter(md);
			return true;		
		}

		if (sType == "gabbyhousestudy5") {
			// In the Study
			md = WritePlaceHeader();
			this.showPerson("gabby1.jpg");
			addPlaceTitle(md, "Gabby\'s Trap");
			md.write(
				'<p>Gabby sights. “It doesn\'t matter, anyway. The damage is done, but I won\'t let you cause your mother any more grief.</p>'
			);
			startQuestions();
			if (q1 != "asked") addLinkToPlaceC(md, 'Grief? She is using Hypnosis to have sex with her!', Place, 'type=gabbyhousestudy5&q1=asked', '“Your Mother and I had been intimate long before she allowed me to hypnotize her for the first time. I love her dearly and would never force anything sexually on her we hadn\'t agreed on before.”</p><p>Wait what? That\'s completely new to you, Mom surely never mentioned it.</p><p>“We had to keep it a secret because of work regulations, the hypnosis used to be just a little kink of mine she allowed me to live out.”</p><p>You didn\'t know that... but in retrospect a lot of things between them suddenly make a lot more sense...');
			else if (q2 != "asked") addLinkToPlaceC(md, '"But you saw her trying to turn Mom into a slave"', Place, 'type=gabbyhousestudy5&q1=asked&q2=asked', '“I am protecting her, from you!” Your eyes go wide at that statement. “She wouldn\'t have listened to me had I told her that her ' + (perYou.isBornMale() ? 'Son' : 'Daughter') + ' is using magic to enslave people, so I had to get her away from you before you would use that spell on her as well.”', 'Gabby');
			else {
				startAlternatives(md);
				addLinkToPlaceC(md, 'tell her that you would never do that to your own mother (Truth)', Place, 'type=gabbyhousestudy6', '“Maybe not now, but you clearly have a lot less restraint on others. The power of the Dai Chu is tempting to the greatest of minds and, frankly, you are a teenager. Your mind is controlled by your hormones and it wouldn\'t be long until breaking simple taboos no longer suffices.' + (perTina.place == -1 ? ' You even have one of these spellbound girls with you right now!”' : '”'), 'Gabby');
				addLinkToPlaceC(md, 'tell her that you would never do that to your own mother (Lie)', Place, 'type=gabbyhousestudy6',  '“Maybe not now, but you clearly have a lot less restraint on others. The power of the Dai Chu is tempting to the greatest of minds and, frankly, you are a teenager. Your mind is controlled by your hormones and it wouldn\'t be long until breaking simple taboos no longer suffices.' + (perTina.place == -1 ? ' You even have one of these spellbound girls with you right now!”' : '”'), 'Gabby');
				addLinkToPlaceC(md, 'tell her that it\'s not her business', Place, 'type=gabbyhousestudy6', '“Yes it is.” She says flatly. “Or do you expect me to wait until it is my turn to be charmed?”', 'Gabby');
				endAlternatives(md);
			}
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "gabbyhousestudy6") {
			// In the Study
			md = WritePlaceHeader();
			this.showPerson("gabby1.jpg");
			addPlaceTitle(md, "Gabby\'s Trap");
			md.write(
				'<p>This is no use, Gabby has made up her mind, and you are frankly not in the mood to be scolded by her... if you only had a way out...</p>'
			);
			if (perTina.place == -1) {
				md.write(
					'<p>“I figured it out!” Tina Suddenly whispers from behind you. “These sigils may use a special Mana-infused ink, and if I\'m right, I might be able to absorb it. But I need time.”</p>'
				);
			}
			startQuestions();
			addLinkToPlaceC(md, 'ask Gabby what she is planning to do now', Place, 'type=gabbyhousestudy7');
			WritePlaceFooter(md);
			return true;		
		}

		if (sType == "gabbyhousestudy7") {
			// In the Study
			md = WritePlaceHeader();
			this.showPerson("gabby1.jpg");
			addPlaceTitle(md, "Gabby\'s Trap");
			md.write(
				'<p>“Now you will look at this Necklace.”</p>' +
				'<p>Shit.</p>' +
				'<p>“You usually can not put someone into a trance who is not willing, but the sigils are siphoning away your strength and willpower as we speak, and with this trinket, it should only be a mater of time until it works.”</p>' +
				'<p>Double shit.</p>' +
				'<p>You strain against whatever force binds your body, but it\'s of no use, you are held in place, no matter what you do, forced to look forward, forced to watch the necklace... forced to listen to Gabby speak to you, her voice suddenly soft, almost velvety.</p>' +
				'<p>“Shhh... you should relax, ' + perYou.getPersonName() + '. I just want to help your Mom, and I just want to help you, you can <b>trust me</b>.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'grind your teeth and be silent', Place, 'type=gabbyhousestudy8');
			WritePlaceFooter(md);
			return true;		
		}

		if (sType == "gabbyhousestudy8") {
			// In the Study
			md = WritePlaceHeader();
			this.showPerson("gabby1.jpg");
			addPlaceTitle(md, "Gabby\'s Trap");
			md.write(
				'<p>“You can feel your focus fading already, can you? You can feel the need to let your mind drift, let your guard falter.”</p>' +
				'<p>Gabby speaks on, unimpressed by your reaction and keeping a gentle, voice so very much unlike the way she usually speaks to you.”</p>' +
				'<p>“You are safe ' + perYou.getPersonName() + ' no one is here to harm you, no one is here to judge you. You can let yourself fall, you want to let yourself fall. There is no reason to be on your guard, no reason not to <b>trust me</b>...</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Trust... you..."', Place, 'type=gabbyhousestudy9');
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "gabbyhousestudy9") {
			// In the Study
			md = WritePlaceHeader();
			this.showPerson("gabby1.jpg");
			addPlaceTitle(md, "Gabby\'s Trap");
			md.write(
				'<p>You could kick yourself for saying that, it can\'t be that easy for you to fall under her sway, but what choice do you have?</p>' +
				'<p>No one is going to come to rescue you, isn\'t it so? Gabby has as long as she needs to slowly break down your resistance, and how bad could what she has in mind for you really be?</p>' +
				'<p>“No one is going to harm you. No one is bearing you any ill will.” Gabby\'s soft voice echos inside your head. Warm and velvety, washing over your thoughts like a soft, silken blanket. “You will enjoy letting yourself go, ' + perYou.getPersonName() + ' You will enjoy letting your mind drift off to focus on the Necklace, to focus just on my voice.”</p>' +
				'<p>“Remember, you can <b>Trust me</b>.”</p>'
			);
			if (perTina.place == -1) md.write('<p>“I\'m ready.” Tina once again whispers from behind you. ”Just say the word!”</p>');
			startQuestions();
			startAlternatives(md);
			addLinkToPlaceC(md, 'trust her', Place, 'type=gabbyhousestudybadend1');
			addLinkToPlaceC(md, 'continue to struggle', Place, 'type=gabbyhousestudybadend2');
			if (perTina.place == -1) addLinkToPlaceC(md, 'order Tina to break the seals', Place, 'type=gabbyhousestudy10');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "gabbyhousestudybadend1") {
			// Bad ending 1
			md = WritePlaceHeader();
			this.showPerson("gabby-badend1.jpg");
			addPlaceTitle(md, "Trust Her");
			md.write(
				'<p>It took some time to accept that taking the book was a mistake, just like using the spells within for your own selfish ends was, but with the help of Mistress Halliway, you brought your life back on track.</p>' +
				'<p>She helped you study like you never did before, and while your grades aren\'t perfect, you passed the final year and are headed for an internship at the TV studio, where she can, as she puts it, have an eye on you.</p>' +
				'<p>With her help, you freed most of the women you had cast the spell on, it wasn\'t a very nice thing to do that anyway, and oh, she is scheduled to marry your Mother next month! This will make her your Mistress, and your stepmom, which is awesome, of course.</p>' +
				'<p>Still... something feels off. Your life is going pretty great but you can\'t shake the feeling that it\'s all wrong, that you are being cheated out of... something.</p>' +
				'<p>Mistress keeps you on a very tight leash, sometimes literally, and sometimes... just maybe you feel like the control she has over your life is smothering.</p>' +
				'<p>You have to talk to her about it later, she has always means to make that feeling go away, and you enjoy the sessions with her, enjoy being in a trance, under her command.... enjoy to fully... trust her.</p>'
			);
			addRestartLink(md);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "gabbyhousestudybadend2") {
			// Bad ending 2
			md = WritePlaceHeader();
			this.showPerson("gabby-badend2.jpg");
			addPlaceTitle(md, "Struggling");
			md.write(
				'<p>In the next hours... days.... weeks? You are honestly not sure how much time you spend with Gabby, but it\'s an arduous process.</p>' +
				'<p>You sometimes fall into a trance during the evening only to wake up the next morning, and every time it happens, you feel your mind move a little closer to the inevitable end, that moment when you finally break down and accept everything she says to you.</p>' +
				'<p>Hell, you are already not sure how much of your current thoughts are hers and how much are yours, and yet, you still hold on to yourself, to that thought that maybe you can beat her if you resist long enough, that she can\'t do this forever...</p>' +
				'<p>But of course, if Gabby has anything, then it is patience, your struggle will last for a long while and every time you wake up, her victory seems a little closer.</p>' +
				'<p>Still... you hold on, you have to hold on...</p>' +
				'<p>And just maybe... one day it will pay off.</p>'
			);
			startQuestionsOnly();
			addRestartLink(md);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "gabbyhousestudy10") {
			// In the Study
			md = WritePlaceHeader();
			AddMana(10);
			this.showPerson("gabby-charm1.jpg");
			addPlaceTitle(md, "Gabby\'s Trap Broken");
			md.write(
				'<p>Tina absorbs the mana from the sigils and gives it to you, immediately breaking the bonds that hold both of you.</p>' +
				'<p>You feel your strength coming back the moment the ward breaks. Clarity returns to your mind, and the mana within you, up until now scattered and unfocused, begins to untangle, to flow freely once again.</p>' +
				'<p>Gabby must have noticed, and her eyes open wide in fear as she realizes what you are about to do.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'leave the house', Place, 'type=gabbyhousestudy10', 'You don\'t know if Gabby has any other tricks and there\'s no way you loose this chance to charm her.');
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "studycharm1") {
			// Charm her in the study 1
			md = WritePlaceHeader();
			if (whereItem(67) === 0) PlaceI(67);
			this.showPerson("gabby-charm2.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>“Dai Chu, Gabrielle Halliway!” You defiantly shout the words and let your mana crash into her, watching tensely as her eyes begin to lose focus and the first specs of pink glister appear behind them.</p>' +
				'<p>“Please, ' + perYou.getPersonName() + ', You don\'t have to do this! I just... wanted to... I want to...”</p>' +
				"<p>You reach out and take the necklace from Gabby's neck but it falls to the ground as Gabby tries to stop you.</p>"
			);
			startQuestions();
			startAlternatives(md);
			addLinkToPlaceC(md, 'She wants to fuck you', Place, 'type=studycharmlover1');
			addLinkToPlaceC(md, 'She wants to be punished for her behavior', Place, 'type=studycharmslave1');
			addLinkToPlaceC(md, 'She just wants to be with Mom', Place, 'type=studycharmmomservant1');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "studycharmlover1") {
			// Charm her in the study - lover 1
			this.charmThem(2);
			md = WritePlaceHeader();
			this.showPerson("gabby-charmlover1.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>“No!”</p>' +
				'<p>“Of course you do, don\'t you feel it, Gabrielle?” You do your best to speak in a calm voice, though the ordeal has left you somewhat agitated. “Doesn\'t it make you wet just thinking about all the ways I will soon take you? Doesn\'t it make you want to throw off your clothing and Undress!?”</p>' +
				'<p>“Damn you...” Gabby\'s eyes are filled with spite, but her hands are moving by themselves, tearing off her shirt and pushing down her dress. “Please... stop.... this...”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"You couldnt stop it if you wanted to, now. And you don\'t want to"', Place, 'type=studycharmlover2');
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "studycharmlover2") {
			// Charm her in the study - lover 2
			md = WritePlaceHeader();
			this.showPerson("gabby-charmlover2.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>“It\'s too late to stop it now, Gabrielle, and you don\'t want me to stop anyway, do you?”</p>' +
				'<p>“No... I...”</p>' +
				'<p>“Just look at that sexy underwear you are wearing.” You interrupt her. ”You were secretly hoping I would overcome your trap, right?”</p>' +
				'<p>Well, you are pretty sure she wasn\'t, But Maybe you can get her to think she was. “It would be much easier to just be honest and give in.”</p>' +
				'<p>“Honest my ass... I know what game you\'re playing, and... maybe you are...” Gabby\'s face shows a plethora of emotions: Anger, fear, confusion, and slowly growing desire...</p>' +
				'<p>“No... I would never...” She stops mid sentence, her features showing traces of doubt.</p>' +
				'<p>“I really...” She bites her lower lip, chest heaving under heavy breathers.</p>' +
				'<p>Oh fuck it!”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Gabby turns around', Place, 'type=studycharmlover3');
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "studycharmlover3") {
			// Charm her in the study - lover 3
			md = WritePlaceHeader();
			this.showPerson("gabby-charmlover3.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>“You win, ' + perYou.getPersonName() + '!” She leans over the table. “Yes, I want you, I want you to finger my pussy and slap my tits, I want to feel your fucking ' + (perYou.isMaleSex() ? 'cock inside me' : 'cunt against mine') + '! So please, hurry up! If I have to be some stupid teenagers fucktoy I\'m better getting the best fucking pounding of my life out of it!”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'give her what she desires', Place, 'type=studycharmlover4');
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "studycharmlover4") {
			// Charm her in the study - lover 4
			md = WritePlaceHeader(false, isExplicit() ? '' : 'td-left-large');
			this.showPersonX("gabby-charmlover4.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>Gabby is the last person you expected an angry outburst like this from, but at this point, you don\'t mind it at all. She tried to steal your Mother, lured you into a trap and wanted to hypnotize you, so now that she is practically begging for you to take out some of your frustration on her, you gladly follow up.</p>' +
				'<p>She exhales a lustful groan as you pull her hair back and roughly push into her waiting sex, not caring for her comfort as you pin her down and give her exactly what she now craves.</p>' +
				'<p>“Oh yes you fucking teenage ' + (perYou.isBornMale() ? 'Bastard' : 'Bitch') + '... fuckmefuckmefuckme... “ Gabby is almost ferocious in the way she offers herself, spitting expletives and insults to rile you up further and not once stopping until both of you reach a hard-earned, but satisfying climax, her exhausted body falling flat on the table, eyes almost delirious from the workout.</p>' +
				'<p>“Fuck... I hate you so much... but that was almost worth it... almost.”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'tell her to wait here as you look for Mom', 452, '', '“Yes... sure...” She breathes out in exhaustion, obviously having given up on trying to stop you, but when you prepare to leave the room, she calls your attention again.</p><p>“Are you really going to... well...” She bites her lower lip, not daring to finish the thought, and you simply answer with another question.</p><p>“Would you mind if I did now?”</p><p>“No... of course not.” There is an uncomfortable delay before she answers, and you decide to not speak further of it. Maybe you have already made up your mind on the matter, maybe not, but it is no longer her concern.');
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "studycharmslave1") {
			// Charm her in the study - slave 1
			this.charmThem(4);
			md = WritePlaceHeader();
			this.showPerson("gabby-charmslave1.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>“Be quiet and undress, Gabrielle.”</p>' +
				'<p>You bellow the words out with a harshness surprising even yourself and there is really no denying it: Gabby has pissed you off. She tries to turn your mother into her sexslave, lays out a trap for you, tries to Hypnotize you and then has the audacity to lecture you on the responsible usage of magic?!</p>' +
				'<p>“And no, I don\'t need to do this, but I want to, and you will soon want me to do it, to.”</p>' +
				'<p>“' + perYou.getPersonName() + ', Please...” She has already torn off most off her clothing after your initial order, the fear in her eyes slowly mixing with arousal. “I...”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'order her to be quiet and turn around', Place, 'type=studycharmslave2');
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "studycharmslave2") {
			// Charm her in the study - slave 2
			md = WritePlaceHeader();
			this.showPerson("gabby-charmslave2.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>Again, Gabby follows your orders without hesitation, surprisingly, given the early state of her induction, and you feel her tremble as you step closer and draw your fingers over her naked ass, pull back, and bring your hand down harshly.</p>' +
				'<p>“Ahhh!”</p>' +
				'<p>“That was a surprisingly sensual noise, looks like you liked that a little.”</p>' +
				'<p>“That\'s the spell you... uuuuhhhhgn...!”</p>' +
				'<p>Another slap interrupts her, and she bites her lower lip to muffle the noise. Gabby is right, of course, the spell increases her sensitivity, makes her more receptive to your touch, even enjoy the humiliation, but soon, she will no longer care.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'punish her', Place, 'type=studycharmslave3');
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "studycharmslave3") {
			// Charm her in the study - slave 3
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson("gabby-charmslave3.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>You find a sturdy looking ruler almost suspiciously perfect for your needs and bring it down on Gabby\'s ass with a satisfying whack.</p>' +
				'<p>“No, Gabrielle, I believe you want to be punished.” The next strike leaves a red imprint on her ass.</p>' +
				'<p>“In fact, you crave it.”</p>' +
				'<p>*Whack*</p>' +
				'<p>“You get off on it!”</p>' +
				'<p>*Whack*</p>' +
				'<p>“Just look at how wet your pussy is.”</p>' +
				'<p>Gabby doesn\'t answer as you push the ruler into her folds, coat it in her juices and splat those on her ass with the next strike. Her brain focused on processing the onslaught of new sensations flooding her mind.</p>' +
				'<p>“Fuck... this is... fuck...”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'show her how much she likes it', Place, 'type=studycharmslave4');
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "studycharmslave4") {
			// Charm her in the study - slave 4
			md = WritePlaceHeader();
			this.showPerson("gabby-charmslave4.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>You draw your fingertips over her red skin. “-This- will be how you get off from now on.“ She groans as you bring the ruler down again. “Masturbation will no longer suffice, sex will no longer suffice.“ Another strike hits her. ”You need the rush of adrenaline that comes with being treated like a kinky little painslut. You crave to be punished and humiliated like a naughty little slavegirl and you need me to do it.”</p>' +
				'<p>“No, I ahh....ahhhhhhhhhh...”</p>' +
				'<p>You strike her again, and again. Your mind taken over by a formerly unknown instinct to punish this woman, to push her to the limit and make her scream in both pain and pleasure as your spell ravages her mind, and only when she screams her climax into the room, you stop.</p>' +
				'<p>“...You just came, did you?” This was more of a rhetoric question. Her body convulses under your touch and streams of her fluids run down her legs, so it\'s pretty obvious that she is literally cumming her brains out from your treatment.</p>' +
				'<p>“You really came from being spanked by me... maybe you secretly already were a little Painslut.”</p>' +
				'<p>“... Fuck... you, ' + perYou.getPersonName() + '.”</p>' +
				'<p>“I take that as a yes.”</p>' +
				'<p>You have to give it to her, she\'s not someone who easily submits. Even under your spell and with her mind likely all over the place from your treatment, she is still able to spit out some token bile at you.</p>' +
				'<p>But that\'s okay, you never wanted her to submit, just to crave punishment for what she did, and not only are you pretty sure achieved that goal, you have a few ideas to exploit her newfound masochism, but for now, you need to find Mom.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'order Gabby to rest here and leave the room', 452, '', 'Gabby gives a tired and annoyed grunt in response, but remains on the table, not stopping you as you leave the room.');
			WritePlaceFooter(md);
			return true;		
		}

		if (sType == "studycharmmomservant1") {
			// Charm her in the study - Mom's servant 1
			this.charmThem(1);
			md = WritePlaceHeader();
			this.showPerson("gabby-charm3.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>There is something dark in you that wants to claim Gabby as your own, even wants to punish her for that trap, but in the end, you push that feeling deep down and bury it inside you.</p>' +
				'<p>“No, you don\'t want me.” You say, much to her bewilderment. “Well, maybe a little, but I\'m not going to take away my Mom\'s lover.”</p>' +
				'<p>“I don\'t understand...” You can see specs of pink light in her eyes, the spell is starting to affect her mind, awaiting your guidance. “I want to... You can\'t... dammit what am I saying?”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'tell her to be with Mom, and out of your way', Place, 'type=studycharmmomservant2');
			WritePlaceFooter(md);
			return true;		
		}
		
		if (sType == "studycharmmomservant2") {
			// Charm her in the study - Mom's servant 2
			md = WritePlaceHeader();
			this.showPerson("gabby-charm4.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell");
			md.write(
				'<p>“It\'s not like I\'m not grateful, but you can\'t tell me you don\'t want all this.”</p>' +
				'<p>Gabby pulls off her shirt and poses for you in her underwear, her eyes challenging you to come closer only for her to suddenly take a step back from you.</p>' +
				'<p>“Oh hell... what am I doing...? What game are you playing, ' + perYou.getPersonName() + '?”</p>' +
				'<p>“There is no game, you will do everything you can to make my Mom happy, and you will no longer be opposed to me using the spell on people, in fact. You find it quite sexy that I do.”</p>' +
				'<p>“Gabby opens her mouth to protest, but you cut her off with a sudden rush of arousal.”</p>' +
				'<p>“Repeat: I like it when ' + perYou.getPersonName() + ' uses ' + perYou.getHisHer() + ' Magic on other women.”</p>' +
				'<p>“I... ahhh...” She moans heavily. “I like it when ' + perYou.getPersonName() + ' uses ' + perYou.getHisHer() + ' Magic on other women.”</p>' +
				'<p>“' + capitalizeFirstLetter(perYou.getHeShe()) + ' should be able to use his gift however ' + capitalizeFirstLetter(perYou.getHeShe()) + ' wants.”</p>' +
				'<p>“' + capitalizeFirstLetter(perYou.getHeShe()) + ' should... should be able to use his gift how... however ' + capitalizeFirstLetter(perYou.getHeShe()) + ' wants.”</p>' +
				'<p>“I will support ' + perYou.getHimHer() + ' and ' + perYou.getHisHer() + ' mother in all things, I will work hard to serve Alex”</p>' +
				'<p>“I will support ' + perYou.getHimHer() + ' and ' + perYou.getHisHer() + ' mother in all things.” She breathes the words out hastily. “I will work hard to serve A... Alex... Ahhhhhh...”</p>' +
				'<p>You push her arousal as much as you can to make her climax, hopefully imprinting those words on her mind in the process, leaving her heavily gasping for air.</p>' +
				'<p>“This was... intense...” She looks at you, her eyes now fully taken over. “I... actually liked that, I really do like it when you use your magic.”</p>' +
				'<p>There is a certain longing in her eyes, but with the spell being mostly unguided, she shouldn\'t be influenced too much.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'order Gabby to rest here and leave the room', 452, '', 'Gabby won\'t be a problem anymore, you are sure of it, and while she is not happy to be ordered around, she agrees to wait for you to free Mom, even telling you where to find her.</p><p>A part of you wonders if you could have gotten more from her. Sure, she is your mothers lover, but Mom might be willing to share if you...</p><p>No, this is a bridge you cross later.');
			WritePlaceFooter(md);
			return true;		
		}
		
		var perVamp = findPerson("Vampyre");
		if (sType == "vamphelpgabby") {
			// Ask Lilith to help
			md = WritePlaceHeader();
			perVamp.health -= 20;
			if (whereItem(67) === 0) PlaceI(67);
			perVamp.showPerson("vamp2.jpg");
			addPlaceTitle(md, "Lilith\'s Help");
			md.write(
				'<p>On your order, the Vampyre is next to you.</p>' +
				'<p>You don\'t even know how she broke in, but the creature breached the much stronger wards of the Gates mansion, so this must have been easy for her.</p>' +
				'<p>Gabby doesn\'t even have time to scream before the Vampyre is behind her, moving with inhuman speed and sinking its fangs into her neck.</p>' +
				'<p>“A...ah...haaaaa...”</p>' +
				'<p>You watch as her expression changes from horror to ecstasy, a series of pained gasp leading into a long, lascivious moan. Her body twitches, struggles briefly against Lilith\'s embrace... then relaxes... and goes limp.</p>' +
				'<p>You see the necklace must have been torn free and has fallen to the ground.</p>'
			);
			startQuestions();
			startAlternatives(md);
			addLinkToPlaceC(md, 'order Lilith to stop', 452, 'type=vamphelpgabby2&stage=stop');
			addLinkToPlaceC(md, 'just watch', 452, 'type=vamphelpgabby2&stage=watch');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "vamphelpgabby2") {
			// Ask Lilith to help 2
			md = WritePlaceHeader();
			perVamp.showPerson("vamp2.jpg");
			addPlaceTitle(md, "Lilith\'s Help");
			if (stage == "stop") {				
				md.write(
					'<p>Lilith just chuckles coldly as she pulls back from Gabby\'s neck</p>' +
					'<p>“She will live, ' + perYou.getMaster() + '.” She licks over the wound on Gabby\'s neck and Kisses her on the lips, long and intimate, claiming her like a feral beast.</p>' +
					'<p>“It would be a waste to kill her.” She finally turns back to you. ”Her blood has the faintest trace of a witches taste, too weak to affect me, but delicious nonetheless...” She smiles wickedly. ”I have turned her into my Ghoul... Our Ghoul.”</p>'
				);
			} else if (stage == "watch") {
				md.write(
					'<p>Lilith\'s head pulls back with a hiss, her entire body shivering in delight as she turns Gabby around and kisses her on the lips, long and intimate, claiming her like a feral beast.</p>' +
					'<p>“It is done, ' + perYou.getMaster() + '.” She turns her attention back to you. “This woman will longer be a threat to you, quite the opposite, in fact.</p>' +
					'<p>You ask what she has done, and Lilith just smiles wickedly.</p>' +
					'<p>”Her blood has the faintest trace of a witches taste, too weak to affect me, but delicious nonetheless...” She smiles wickedly. ”I have turned her into my Ghoul... Our Ghoul.”</p>'
				);
			} else if (stage == "ghoul") {
				md.write(
					'<p>“A Vampyre\'s servant. A thrall with just as much of a will of her own as I am willing to grant her.” Gabby\'s eyes open again, but they look absent, if not empty. She calmly undresses and knees next to Lilith.</p>' +
					'<p>“She can perform her daily routine as it is needed to not arise suspicion, but her mind is empty unless I will her to think. She will do everything I, or my ' + perYou.getMaster() + ' orders her to do, without question.</p>' +
					'<p>Gabby stares at you with big, empty eyes, and you feel a knot in your stomach. Sure, she trapped you, tried to enslave your Mom... but is this really the fate you had in mind for her?</p>' +
					'<p>Lilith at least seems happy, in a... twisted, evil way. She drives her fingers possessively through Gabby\'s hair and awaits further orders.</p>'
				);
			}
			startQuestions();
			if (stage != "ghoul") addLinkToPlaceC(md, '"A Ghoul?"', 452, 'type=vamphelpgabby2&stage=ghoul');
			addLinkToPlaceC(md, 'order Lilith to free you', 452, 'type=vamphelpgabby3');
			WritePlaceFooter(md);
			return true;		
		}
		if (sType == "vamphelpgabby3") {
			// Ask Lilith to help 2
			md = WritePlaceHeader();
			perVamp.showPerson(perVamp.health <= -100 ? "vamp8c.jpg" : "vamp2.jpg");
			addPlaceTitle(md, "Lilith\'s Help");
			if (perVamp.health <= -100) {
				md.write(
					'<p>“No...”</p>' +
					'<p>Lilith smiles coldly, and the look she is giving you makes your blood freeze.</p>' +
					'<p>“Feeding is my unlife, the power of my soul... and after you fed me so well, her blood was the final bit of power I needed to break free of your pitiful spell.”</p>' +
					'<p>She pushes your motionless body to the ground and straddles you, her lips above yours.</p>' +
					'<p>“I should tear you apart for what you did...” Her voice is a sensual whisper making your skin crawl. “But your spell still holds some influence, and I want you to stay with me...”</p>' +
					'<p>Your body trembles as she kisses you softly on the lips.</p>' +
					'<p>“...as a fellow Vampyre and my eternal lover...”</p>' +
					'<p>You try to protest as she kisses your chin, but your voice fails you.</p>' +
					'<p>“...forever united in darkness.”</p>' +
					'<p>And with those last words, her fangs sink into your neck, a sharp pain followed by orgasmic bliss rushing through your entire body as the world around you fades away...</p>' +
					'<p>...sometime later, you revive as a vampyre and lover of your once slave. Nothing can stop the two of you using the Book, your magic and her savagery. Glenvale is yours to enslave, to feed on and satisfy all your lusts, or at least all her lusts, but they are yours now too.</p>'
				);
				startQuestionsOnly();
				addRestartLink(md);
			} else {
				md.write(
					'<p>“Right, I would not want my ' + perYou.getMaster() + ' to remain helpless, would I?” the Vampyre seems to contemplate something, her piercing stare on you as she licks her teeth and walks forward, faintly drawing her nails over your exposed neck as she moves past towards one of the wards to suddenly break it by using those very nails to tear into the wall.</p>' +
					'<p>Your strength comes back the moment the ward breaks. Clarity returns to your mind, and the mana within you, up until now scattered and unfocused, begins to untangle, to flow freely once again.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'tell Lilith to keep an eye on Gabby and leave the room', 452, '', 'Lilith presses Gabby\'s cheek to her leg and assures you that her “Ghoul” is in good hands. She would never harm her pets, after all, and the way she smiles sends shivers down your spine as you leave the room.', '', "movePerson('Gabby',247)");
			} 
			WritePlaceFooter(md);
			return true;		
		}
		
		return false;
	};
	

	per.showEvent = function()
	{
		var md;
		
		if (sType.indexOf("conference") != -1) return this.showEventConference();
		if ((sType.indexOf("vamphelpgabby") != -1 || sType.indexOf("studycharm") != -1 || sType.indexOf("gabbyhouse") != -1) && isMurderPath()) return this.showEventTrap();
		
		if (Place == 247 && sType == "useghoul") {
			// Use the ghoul
			md = WritePlaceHeader();
			this.showPerson("gabby-ghoul2.jpg");
			addPlaceTitle(md, "Use the Ghoul");
			md.write(
				'<p>Gabby still knows how to use her tongue, maybe even better than before, who knows, but the whole act is still... kinda uncomfortable.</p>' +
				'<p>She never moans or makes any other noise and neither does she show disgust or enjoyment towards what she does.</p>' +
				'<p>She allows you to use her body and returns to her spot when she is done.'
			);
			startQuestions();
			addLinkToPlaceC(md, 'look around the crypt', Place);
			WritePlaceFooter(md);
			return true;		
		}

		if (sType == "meetgabby") {

			// Initial meeting at the TV station
			md = WritePlaceHeader();
			this.showPerson("gabby1.jpg");
			addPlaceTitle(md, "Gabriel Halliway");
			md.write(
				'<p>Gabby gives you a long, scrutinizing look, clearly disapproving of your being here, before she speaks.</p>' +
				'“I believe Alex... your Mother is not at work right now, so may I know what you are doing here, ' + perYou.getPersonName() + '?”</p>' +
				"You tell her that you are just visiting someone, and don't intent to linger to long, and while she still looks annoyed, her features soften a little.</p>" +
				'“We are already behind schedule as it is, so please conduct your business quickly and do not disturb the staff, okay?"</p>'
			);
			startQuestions();
			startAlternatives(md);
			addLinkToPlaceC(md, '"Yes, Ms Halliway"', Place, '', '“Thank you.” She breathes out in relief. “Now if you excuse me there is work I need to attend to.”<br><br>Gabby gives you a polite nod and goes off into the studio.<br><br>You continue on into Madison\'s office...');
			addLinkToPlaceC(md, '"Yes, Gabby"', Place, '', 'Seconds pass in which you are fairly certain Gabby tries to figure out a way to murder you with her eyes and make it look like an accident, but as you stubbornly remain alive, she just releases yet another annoyed sigh and goes off into the studio.<br><br>You continue on into Madison\'s office...');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 415) {
			if (sType == "usegabbyoffice") {
				// Use Gabby in the OFfice
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPerson("gabby-mom4.jpg");
				addPlaceTitle(md, "Using Mom\'s Assistant");
				md.write(
					'<p>“Of course ' + perYou.getPersonName() + '. I\'m happy that she is so willing to help you with your needs.” Mom silences whatever protest Gabby might have with a stern look and order her to turn around and undress for you.</p>' +
					'<p>Gabby\'s face turns deeply red as Mom bends her firmly over the desk and caresses her folds, luring a deep moan from her lips.</p>' +
					'<p>“hmmm...ahh...”</p>' +
					'<p>Gabby bites her lower lip to suppress further noises, trembling and gasping for air as your mothers fingers dig deeper, until she finally turns to you. “She\'s ready for you, Hun.”</p>'
				);
				if (perYou.isMaleSex()) {
					md.write(
						'<p>Your cock is already hard from the display alone, and Mom has a hard time looking away as you take it out and push deeply into her assistants sex.</p>'
					);	
				} else {
					md.write(
						'<p>You are pretty wet yourself from the display alone, and Mom has a hard time looking away as you undress as well, pull Gabby off the desk and pin her underneath you.</p>'
					);	
				}
				md.write(
					'<p>The actual act is quick and dirty. You can\'t spend too much time with the two, but you make sure to thoroughly enjoy Gabby\'s pussy and more than once, Mom needs to remind her to be more quiet when at work.</p>' +
					'<p>She firmly bites her lower lip as her climax approaches, staying mostly silent as you ' +
					(perYou.isMaleSex() ? 'hoot your load into her' : 'grind your sex against hers') +
					', but the struggle to not just shout her climax into the room is clearly visible on her face.</p>'
				);					
				startQuestionsOnly();
				addLinkToPlace(md, 'talk more with them', 415);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "momdesireoffice") {
				// Use Mom in the OFfice
				md = WritePlaceHeader();
				this.showPerson("gabby-mom8.jpg");
				addPlaceTitle(md, "Mom\'s Help");
				md.write(
					'<p>Mom never refuses a chance to help you unwind, and since both women have been horny pretty much since the moment you entered the room, they happily undress for you.</p>' +
					'<p>Mom orders Gabby to go to her knees and prepare her for you while you undress yourself and lock the door, watching the show both of them put on for you.</p>' +
					'<p>Mom in particular enjoys your eyes on her body. She throws her head back with a soft moan, and caresses herself with both hands while Gabby teases her folds with her tongue, only reluctantly moving aside to make way for you.</p>' +
					'<p>By now, Mom is so wet you are able to just '
				);
				if (perYou.isMaleSex()) md.write('press her onto the desk and push into her in one swift motion');
				else md.write('pull her to the floor and slide on top of her in one swift motion');
				md.write(
					', taking her right in front of Gabby, who watches in morbid fascination.</p>' +
					'<p>Gabby may still have mixed feelings about watching you fuck your own Mom in front of her, but even she can\'t help but being swept away by her arousal. Every time you glance aside, you see her furiously fingering herself, eyes locked on you and your Mom as you bring each other to climax.'
				);					
				startQuestionsOnly();
				addLinkToPlace(md, 'talk more with them', 415);
				WritePlaceFooter(md);
				return true;			
			}

			// Hypno Scenes
			if (sType == "lookmomgabby1") {
				// Mom/Gabbu hyno, scene 1, part 1
				md = WritePlaceHeader();
				this.setFlag(3);		// Scene done
				this.showPerson("gabby-mom-hypno1.jpg");
				addPlaceTitle(md, "Watching Mom and Gabby");
				md.write(
					'<p>You were prepared for a lot when you decided to peak into Moms office, but what you see still takes you by surprise.</p>' +
					'<p>Gabby has opened her blouse and is talking softly to Mom, who is seated before her, legs spread suggestively with her eyes glazed over, focused on Gabby\'s necklace.</p>' +
					'<p>“...to clear your thoughts, and let that heavy, drowsy feeling seep into your mind and body. Are you feeling relaxed, Alex?” Gabbys voice vibrates delicately with every spoken word. She\'s completely lacking the hard edge and impatience you usually associate with it, and it seems to have an effect on Mom.</p>' +
					'<p>“Yes, Gabby.... Very relaxed...”</p>' +
					'<p>“Good. “ She brushes her fingertips over Moms bare shoulder. ”I want you to focus only on my voice. You will block out everything else. No stress, no work, no obligations. Only my voice exists for you.”</p>' +
					'<p>“Yes Gabby... no stress, no work, no obligations... only your voice...” You get a knot in your stomach as Mom repeats Gabby\'s orders word for word with a slightly slurred whisper. Just what is she doing with her?</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'keep listening', Place, 'type=lookmomgabby1next1');
				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "lookmomgabby1next1") {
				// Mom/Gabbu hyno, scene 1, part 2
				md = WritePlaceHeader();
				this.showPerson("gabby-mom-hypno2.jpg");
				addPlaceTitle(md, "Keep Watching Mom and Gabby");
				md.write(
					'<p>“Good girl.” A shiver runs through Moms body as Gabby says those words. “Now remember our last sessions, you had to lock those memories away, but they are still there, right?”</p>' +
					'<p>“Yes, Gabby.”</p>' +
					'<p>“So what will you call me, Alex?”</p>' +
					'<p>There is a brief pause before Mom answers, a struggle you know all to well by now, and she clearly didn\'t win.</p>' +
					'<p>“Mistress Halliway.”</p>' +
					'<p>“Good Girl.” Another shiver rushes through Moms Body, and you strangely feel it as well. “And what are you?”</p>' +
					'<p>“I am...” Another brief hiccup, but barely noticeable this time. “... Mistress Halliway\'s sexy little... plaything.”</p>' +
					'<p>“Good.” Gabby smiles wickedly. ”You like being sexy, do you, Alex?”</p>' +
					'<p>“Yes... Mistress Halliway.”</p>' +
					'<p>“And what do you know about being sexy?”</p>' +
					'<p>Again, Mom hesitates for a moment, but her resistance is fading, and she recites the next words steadily and without interruption. “There is nothing as sexy as a woman who is not afraid to show her sexuality... There is nothing as sexy as a woman who is confident in her own body. There is nothing as sexy as a woman who loves and obeys her Mistress.”</p>' +
					'<p>“Repeat it, let those words wash over you, let them become part of your true self.”</p>' +
					'<p>“There is nothing as sexy as a woman who is not afraid to show her sexuality... There is nothing as sexy as a woman who is confident in her own body. There is nothing as sexy as a woman who loves and obeys her Mistress.”</p>' +
					'<p>The words come out easier this time, and Gabby forces Mom to repeat them several times, slow and deliberate, like a mantra. And to your shock, you find your lips are moving with every syllable, and your eyes glued to Gabby\'s necklace.</p>' +
					'<p>Luckily, the effect isn\'t strong. It doesn\'t take a lot of willpower to tear your attention away from the trinket, and being aware of the effect you doubt you\'ll easily fall under its influence, again, but this thing certainly is magical in some way.</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'keep watching, you might “learn” something', Place, 'type=lookmomgabby1next2');
				addLinkToPlace(md, 'get out of here, you know what will follow and you\'ve already seen more than you want to', 372, '', 'You really don\'t need to see where this is going, and you don\'t really want to, either.</p><p>You know what you need to know about Mom\'s condition and you need a plan to get her away from Gabby somehow, that\'s all that\'s important.');
				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "lookmomgabby1next2") {
				// Mom/Gabbu hyno, scene 1, part 3
				md = WritePlaceHeader();
				this.showPerson("gabby-mom-hypno3.jpg");
				addPlaceTitle(md, "Keep Watching Mom and Gabby");
				md.write(
					'<p>Mom is in a trance, and Gabby fully focused on her, so there\'s little risk to be caught, and you might learn more about this strange Necklace and Gabby\'s plans if you just watch them a little longer.</p>' +
					'<p>Well, at least that\'s what you tell yourself.</p>' +
					'<p>On Gabby\'s order, Mom has pulled down her assistants top and begun to slowly circle her tongue around the other woman\'s nipple.</p>' +
					'<p>“See..?” Gabby coos softly. “This wasn\'t so hard, doesn\'t it feel so much better to just obey?”</p>' +
					'<p>“Yes, mistress Halliway...” Moms voice is slurred and absent-minded, her attention focused on Gabby\'s breasts as she pulls the tiny sensitive nipple into her mouth to lure an audible guest from the others lips.</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'keep watching', Place, 'type=lookmomgabby1next3');
				addLinkToPlace(md, 'bail out', 372, '', 'You really don\'t need to see where this is going, and you don\'t really want to, either.</p><p>You know what you need to know about Mom\'s condition and you need a plan to get her away from Gabby somehow, that\'s all that\'s important.');
				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "lookmomgabby1next3") {
				// Mom/Gabbu hyno, scene 1, part 4
				md = WritePlaceHeader();
				this.showPerson("gabby-mom-hypno4.jpg");
				addPlaceTitle(md, "Keep Watching Mom and Gabby");
				md.write(
					'<p>“Very Good.” Gabby leans forward, whispering to Mom. “Now touch my ass, don\'t be shy, a good, sexy woman worships her Mistresses body.”</p>' +
					'<p>“A good, sexy woman worships her... Mistresses Body...” Mom, again, repeats every word and begins to  massage Gabby\'s ass with... rather skilled motions. Gently kneading her buttocks, pulling them apart, and once even giving her assistant a light slap.</p>' +
					'<p>“Hmmm... you love your mistresses ass, do you, Alex?”</p>' +
					'<p>“Yes, Mistress Halliway.” The words now come out without hesitation.</p>' +
					'<p>“Enough to use your tongue to please her, this time?”</p>' +
					'<p>“I... I...” Mom struggles, and you see awareness briefly returning to her eyes.</p>' +
					'<p>“It\'s okay, you are calm, you are relaxed, you are safe.”</p>' +
					'<p>“I... am safe...” Gabby looks briefly annoyed, but overall it seems like Mom\'s resistance is more of a small inconvenience to her than anything else.</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'keep watching', Place, 'type=lookmomgabby1next4');
				addLinkToPlace(md, 'bail out', 372, '', 'You really don\'t need to see where this is going, and you don\'t really want to, either.</p><p>You know what you need to know about Mom\'s condition and you need a plan to get her away from Gabby somehow, that\'s all that\'s important.');
				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "lookmomgabby1next4") {
				// Mom/Gabbu hyno, scene 1, part 5
				md = WritePlaceHeader();
				this.showPerson("gabby-mom-hypno5.jpg");
				addPlaceTitle(md, "Keep Watching Mom and Gabby");
				md.write(
					'<p>We have plenty of days ahead, no need to rush.</p>' +
					'<p>“Yes... Mistress...” Moms voice is sleepy, and the two share a long, tender and surprisingly loving kiss among themselves.</p>' +
					'<p>“You will rest, for now, and not remember anything we just did. Seal it within you until the next session.”</p>' +
					'<p>“Yes... Mistress...”</p>' +
					'<p>You are not sure if you are glad or disappointed this didn\'t go any further, but this is your cue to get out before you are spotted.</p>'
				);
				this.setFlag(24);

				startQuestions();
				addLinkToPlace(md, 'leave the office', 372);
				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "lookmomgabby2") {
				// Mom/Gabbu hyno, scene 2, part 1
				md = WritePlaceHeader();
				this.setFlag(4);		// Scene done
				this.showPerson("gabby-mom-hypno6.jpg");
				addPlaceTitle(md, "Watching Mom and Gabby");
				if (this.checkFlag(3)) {
					md.write(
						'<p>When you arrive at Mom\'s office this night, she has already been put into a trance, legs spread on top of her writing desk, with Gabby in front of her.</p>' +
						'<p>“A sexy woman is not afraid to show her sexuality, a sexy woman is confident in her own body, a sexy woman loves and obeys her mistress, I am a sexy woman.”</p>' +
						'<p>It\'s the mantra you know from the last session, and this time, Mom recites it without delay or hesitation.</p>'
					);
				} else {
					md.write(
						'<p>You... did not expect to find this when you decided to spy on the pair.</p>' +
						'<p>Mom sits on top of her office desk, legs spread with Gabby on the floor in front of her, and while your first reflex is to pull back and not intrude on this rather intimate moment, you quickly notice that something is... off.</p>' +
						'<p>Mom\'s eyes are weirdly unfocused. She is starring off into the distance as if barely taking note of Gabby, and if that is not suspicious enough, the words she keeps repeating certainly are.</p>' +
						'<p>--</p>' +
						'<p>“A sexy woman is not afraid to show her sexuality, a sexy woman is confident in her own body, a sexy woman loves and obeys her mistress, I am a sexy woman.”</p>' +
						'<p>She is speaking the words like a mantra, calm and emotionless as Gabby drives her fingertips along Mom\'s underwear.</p>'
					);					
				}

				startQuestions();
				addLinkToPlace(md, 'stay calm and listen in', Place, 'type=lookmomgabby2next1');
				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "lookmomgabby2next1") {
				// Mom/Gabbu hyno, scene 2, part 1
				md = WritePlaceHeader();
				this.showPerson("gabby-mom-hypno7.jpg");
				addPlaceTitle(md, "Watching Mom and Gabby");
				md.write(
					'<p>“You are making progress Alex.” Gabby coos sensually as she pulls Mom\'s underwear into her folds. “I am proud of you.”</p>' +
					'<p>“T...thank you, Mistress Halliway...” Mom softly breathes out the answer as her body tenses up and begins to tremble under Gabby\'s touch.</p>' +
					'<p>“You do like it when I touch like this, yes?”</p>'
				);
				if (this.checkFlag(3)) {
					md.write(
						'<p>Gabby phrased it as a question, but it felt more like a statement, and you once again have to stop your lips from moving along as Mom repeats the order.</p>'
					);
				} else {
					md.write(
						'<p>Gabby phrased it as a question, but it felt more like a statement, and you don\'t even notice your lips moving along as Mom repeats the words.</p>'
					);					
				}
				md.write(
					'<p>--</p>' +
					'<p>“I like it when you touch me like this... Mistress.”</p>' +
					'<p>Mom\'s head rolls back with a soft moan, her eyes closed as Gabby pushes her underwear to the side.</p>' +
					'<p>“Say it again...” Her lips are close enough to Mom\'s folds to let her breath wash over them, and Gabby slowly drags  the tip of her finger over Mom\'s womanhood as she repeats every word.</p>' +
					'<p>“I like it when you touch me like this, I want to be touched like this,” Her breathing grows more ragged with every syllable, she is gasping for air but dutifully repeats everything Gabby says. ”I want to feel good, I want to surrender myself to mistress Halliway...”</p>'
				);
				startQuestions();
				if (this.checkFlag(3)) addLinkToPlace(md, 'Whisper: ”I want to feel good, I want to surrender myself to mistress Halliway...”', Place, 'type=lookmomgabby2next2');
				else {
					addLinkToPlace(md, 'The necklace tries to get your attention again, but you easily ignore the influence', Place, 'type=lookmomgabby2next3');
					addLinkToPlace(md, 'bail out, you\'ve seen enough', 372, '', 'You really don\'t need to see where this is going, and you don\'t really want to, either.</p><p>You know what you need to know about Mom\'s condition and you need a plan to get her away from Gabby somehow, that\'s all that\'s important.');				
				}
				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "lookmomgabby2next2") {
				// Mom/Gabbu hyno, scene 2, part 2
				md = WritePlaceHeader();
				this.showPerson("gabby-mom-hypno7.jpg");
				addPlaceTitle(md, "Keep Watching Mom and Gabby");
				md.write(
					'<p>Wait... this is not right... Have you been repeating Gabby\'s words as well...?</p>' +
					'<p>It\'s a subtle effect... and now that you\'ve recognized it, you find it easy to block the urge out, but yes, you have, and not only that, your eyes weren\'t focused on the pair, but on Gabbys necklace...</p>' +
					'<p>The effect was subtle, and now that you noticed it, you are easily able to pull your attention away, but this trinket is clearly magical in nature.</p>' +
					'<p>It\'s pretty much what you needed to know, and now that you are aware of the effect, there really is no reason for you to keep watching Mom and Gabby, right?</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'Actually..', Place, 'type=lookmomgabby2next3');
				addLinkToPlace(md, 'Indeed, get out as quick as you can', 372, '', 'You really don\'t need to see where this is going, and you don\'t really want to, either.</p><p>You know what you need to know about Mom\'s condition and you need a plan to get her away from Gabby somehow, that\'s all that\'s important.');				

				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "lookmomgabby2next3") {
				// Mom/Gabbu hyno, scene 2, part 3
				md = WritePlaceHeader();
				this.showPerson("gabby-mom-hypno8.jpg");
				addPlaceTitle(md, "Keep Watching Mom and Gabby");
				md.write(
					'<p>You keep watching with mixed feelings as Gabby begins to peel your Mother out of her clothes, moving with slow, sensual motions and clearly delighting in any inch of bare skin she manages to expose.</p>' +
					'<p>There is no protest and no resistance. Mom\'s eyes remain dazed as Gabby pushes her back against the desk and slowly pulls the last piece of clothes covering Mom\'s body.</p>' +
					'<p>The whole scene is surreal: You watch as your own mother spreads her legs for another woman, gasping softly with every gentle touch to her skin and eagerly presenting herself to someone who is clearly messing with her mind... and all you can think of is:</p>' +
					'<p>She looks really, fucking hot.</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'witness the finale', Place, 'type=lookmomgabby2next4');
				addLinkToPlace(md, 'bail out', 372, '', 'You really don\'t need to see where this is going, and you don\'t really want to, either.</p><p>You know what you need to know about Mom\'s condition and you need a plan to get her away from Gabby somehow, that\'s all that\'s important.');				

				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "lookmomgabby2next4") {
				// Mom/Gabbu hyno, scene 2, part 4
				md = WritePlaceHeader();
				this.showPerson("gabby-mom-hypno9.jpg");
				addPlaceTitle(md, "Keep Watching Mom and Gabby");
				md.write(
					'<p>Gabby pushes her fingers forward, breaching Mom\'s folds and diving deeply into her wetness.</p>' +
					'<p>“Let yourself fall, Alex.” She coos softly. “Lay back, relax, you like it when I finger your pussy.”</p>' +
					'<p>“I... I like it when you finger my pussy...”</p>' +
					'<p>“It makes you feel sexy and submissive, you enjoy feeling sexy and submissive.”</p>' +
					'<p>“I enjoy... enjoy feeling sexy and... ah... and submissive...”</p>' +
					'<p>Mom\'s words barely come out now, interrupted by haggard breathing and sexy moans as Gabby intensifies her attentions, skillfully flicking her tongue over her playthings clit.</p>' +
					'<p>“A sexy woman is not afraid to show her sexuality, a sexy woman is confident in her own body, a sexy woman loves and obeys her mistress.”</p>' +
					'<p>She repeats the mantra once again, and Mom dutifully recites it, once, twice, a third barely cohesive time as her voice begins to crack under her impending climax and finally a fourth time, screaming out the words as she reaches her peak and collapses on the desk, gasping for air.</p>' +
					'<p>“Good girl... you are almost ready.” Gabby rises to her feet and caresses Moms trembling body. “Commit what you have learned to your subconsciousness, but seal it away. You will not remember anything that happened tonight, but it will affect you.”</p>' +
					'<p>“Yes Mistress.”</p>' +
					'<p>Well, that is your cue to leave. Gabby is giving out a few more instructions, but  for now it\'s better if she does not see you.</p>'
				);
				
				this.setFlag(25);

				startQuestions();
				addLinkToPlace(md, 'leave', 372);
				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "calledgabbymistress"){
				md = WritePlaceHeader();
				this.setFlag(26);
				this.showPerson("gabby1.jpg");
				addPlaceTitle(md, "Slip of the Tongue");
				md.write(
					"<p>As soon as the words escape, you realize your mistake. That wasn't what you meant to say, but somehow it slipped right out. Apparently the hypnosis affected you more than you'd thought. Unfortunately, if you had hoped nobody would notice the lapse, you're sadly mistaken.</p>"+
					'<p>"What did you call me?"</p>'+
					"<p>You cringe, as much from her glare as from the mistake. For some reason, it's far harder than normal to stand up to your mom's assistant, and before long you have confessed to spying on them at night. Your mother is horrified, but Gabby takes on a curious expression.</p>"+
					'<p>"You must have a lot of questions for me," she finally says. "Come back tonight and I\'ll answer all your questions then. For now, we have <i>actual</i> work that needs our attention more than a nosy brat."</p>'+
					'<p>Burning with embarassment, you hurry and flee the room.</p>'
				);
				startQuestions();
				addLinkToPlace(md,'leave',372);
				WritePlaceFooter(md);
				return true;
			}
			if( sType == "gabbyofficebadend1"){
				md = WritePlaceHeader();
				this.showPerson("gabby1.jpg");
				addPlaceTitle(md, "Explanation");
				md.write(
					"<p>This time Gabby is all alone, no sign of your mother. Fine. That's ok. You're here to get some answers, and it would just be awkward if your mom was around. Plenty of time to free her once you understand what is going on.</p>"+
					'<p>"Have a seat, '+perYou.getPersonName() + ". I'm sure you have a lot of questions, and the sooner you are comfortable the sooner we can begin.\"</p>"+
					"<p>You sit down across the room from her, curious how she will explain herself. Her expression is serious and level, with little of the usual annoyance she directs your way. You start to ask her what is going on, but are shushed quickly.</p>"+
					'<p>"Hush," she says smoothly, her voice oddly commanding. "No questions yet. Just sit quietly and listen while I explain everything."</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'Nod your head.',415,'type=gabbyofficebadend2');
				WritePlaceFooter(md);
				return true;
			}
			if( sType == "gabbyofficebadend2"){
				md = WritePlaceHeader();
				this.showPerson("gabby1.jpg");
				addPlaceTitle(md, "Understanding");
				//AddImage("spiralPendant.jpg","100%","right");
				md.write(
					'<p>"Good '+perYou.getSex() + ", everything will make sense as long as you just keep listening to my voice. No outbursts, no interruptions, nothing but my voice and my words. Everything will make sense. Everything will be clear. You don't need to think. You can relax now. Let your cares slip away. Just me and my voice, that is all.\"</p>"+
					'<p>You sigh, a weight leaving your shoulders as you allow yourself to relax.</p>'+
					'<p>"Perfect. Exactly like that. You have no thoughts, you have no cares, no concerns. There is only my voice."</p>'+
					'<p>"With every word that I speak, you will accept and understand them as true. You know that I will not lie to you, that you trust me completely. Every word I speak is the truth, and you will believe them completely.</p>'+
					'<p>Faintly, you realize that your lips are moving, repeating her explanation back. No, not an explanation. She is trying to hypnotize you! That jolt returns some awareness, but all of your thoughts move like syrup. The pendant! Your eyes are caught on it, watching the light shine off of it as your sleepy mind is slowly coaxed into trance.</p>'+
					"<p>You struggle to fight the effect. It should be easy to break free. Whatever magic the pendant holds, it is weak compared to the powers you know. Except... this isn't your first exposure. How many times have you willingly subjected yourself to it already, mouthing along as Mistress Halliway slowly instructed your mother? Now, you find those same mantras at your lips again, their words of submission too seductive to ignore.</p>"+
					(perYou.isBornMale()?'':'<p>"You know something, '+perYou.getPersonName()+'?" Gabby says as your awareness of everything that is not Her fades away. "I never noticed just how much like your mother you have grown. If only your attitude wasn\'t so poor..."</p>')
				);
				startQuestions();
				if (perYou.isBornMale()){
					addLinkToPlace(md, "I want to feel good, I want to surrender myself to mistress Halliway", 415, 'type=gabbyofficebadendm');
				}else{
					addLinkToPlace(md, "I want to feel good, I want to surrender myself to mistress Halliway", 415, 'type=gabbyofficebadendf1');
				}
				WritePlaceFooter(md);
				return true;
			}
			if(sType == "gabbyofficebadendm"){
				md=WritePlaceHeader();
				this.showPerson("gabby-badend1.jpg");
				addPlaceTitle(md, "Getting Along Beautifully");
				var perTracy = findPerson("Tracy");
				md.write(
					'<p>Life simply makes more sense once you accept that Mistress Halliway knows what is best in all things. Her relationship with your mother is not concerning in the slightest. The submissive devotion of one woman towards another is a pure and beautiful thing, and you are happy for her to have such a caring Mistress and Lover. The two are perfect together, and you are overjoyed when they announce their upcoming marriage.</p>'+
					(perTracy.isCharmedBy()
						?("<p>At first Tracy is unhappy with the new way of things, especially how deferential you have become, but that's easily fixed once you order her to stop complaining and submit to Mistress Halliway's hypnosis. Everything goes much more smoothly after that. Tracy is still bound by your magic, but has come to realize that she can best carry out your will by loving and serving your Mistress. It always brings a smile on your face to see her on her knees for Mistress Halliway" + (perTracy.getCharmedLevel()>1?", though you never touch her again yourself. Mistress Halliway says siblings should not love one another that way.":'.')+"</p>")
						:"<p>Your sister Tracy is confused and surprised by your mother's new relationship, especially how fast they move in together, but Mistress Halliway is very patient explaining everything. It's no surprise at all that Tracy soon comes to love and serve Mistress Halliway every bit as much as your mother does. Sometimes, when you're feeling naughty, you peek around the corner again and let yourself enjoy watching them fall into trance.</p>")+
					"<p>As for all that magic nonsense, you soon realize that none of it is important. You don't want or need to be in control, so most of your slaves are released back into their normal lives. The book itself is hidden away securely. There just in case, but you would be perfectly happy if you never needed it again. All you want is a normal, industrious life. Just like Mistress Halliway tells you to want.</p>"
				);
				addRestartLink(md);
				WritePlaceFooter(md);
				return true;
			}
			if(sType =="gabbyofficebadendf1"){
				md = WritePlaceHeader();
				this.showPerson("gabby-badend1.jpg");
				addPlaceTitle(md, "Good Girls Get Taught");
				md.write(
					'<p>You are aware without actual awareness. Understanding without thought. Mistress Halliway is explaining things to you, and all you can do is repeat them back. She is beautiful, sensuous. The utter pinacle of womanhood. Someone to emulate, to admire, to love and serve all at the same time. With each line that you speak, your fingers move in and out of your naked slit, deepening your arousal and submission with each thrust. You know this, because Mistress Halliway has told you so.</p>'+
					'<p>"I want to be a good girl," you speak the Truths you have been given. Slowly working them through your slit and your brain.</p>'+
					'<p>"Good girls need to be taught."</p>'+
					'<p>"I will become a good girl."</p>'+
					'<p>"Good girls learn by submitting to their mistress."</p>'+
					'<p>"I am a good girl. I am Mistress Halliway\'s good girl."</p>'+
					'<p>"I am Mistress Halliway\'s submissive toy."</p>'
				);
				startQuestions();
				addLinkToPlace(md, "I obey Mistress Halliway",415,'type=gabbyofficebadendf2');
				WritePlaceFooter(md);
				return true;
			}
			if(sType=="gabbyofficebadendf2"){
				md=WritePlaceHeader();
				this.showPerson("gabby-badend1.jpg");
				addPlaceTitle(md, "Good Girl For Life");
				md.write(
					'<p>Your relationship with Mistress Halliway was much improved once you realized that you needed to submit to your Mistress and her hypnotic corrections as often as possible. All of your old worries soon felt pointless and dull. Magic, slaves, the book? None of those things are actually important once you have your priorities straightened. What you really needed was to accept your Mistress\'s direction in all things, learning how to think and behave as a proper young woman should, all from her generous and patient instruction.</p>'+
					'<p>Soon afterwards she and your mother were married, much to your joy at having your Mistress for a stepmom. Tracy was unsure at first, but with both you and your mother vouching for Mistress it didn\'t take long before your sister had undergone some instruction of her own.</p>'+
					'<p>After graduation you stayed close by, gaining an internship at the TV station where you could be close to the people that mattered most. Keeping together as one happy family under the same roof, serving the same Mistress. Life is bliss, and it is all thanks to Mistress Halliway.</p>'
				);
				addRestartLink(md);
				WritePlaceFooter(md);
				return true;		
			}
		}
		
		if (Place == 161) {
			
			var stage = getQueryParam("stage");
			var nstage;
			
			if (sType == 'gabbyslaverig') {
				if (stage === "") stage = Math.floor(Math.random() * 4) + 1;
				else stage = parseInt(stage, 10);
				md = WritePlaceHeader(false, stage == 2 ? "" : "td-left-med");
				this.showPerson("gabby-bdsm" + stage + "a.jpg");
				addPlaceTitle(md, "Gabby Bound by Bambi");
				md.write(
					'<p>Gabby has been rigged up and her body is trembling in anticipation. She is clearly aroused, as much as it may annoy her, and eagerly awaiting you to play with her.</p>'
				);

				startQuestions();
				nstage = stage + 1;
				if (nstage > 4) nstage = 1;
				addLinkToPlace(md, 'change position', Place, 'type=gabbyslaverig&stage=' + nstage, 'Bambi helps you re-position your toy, explaining knots and techniques to you and making sure you know how to not cut of the flow off blood.</p><p>According to her, you are a natural and might soon be able to do your own ropework.');	
				addLinkToPlace(md, 'play with her', Place, 'type=gabbyslaverigplay&stage=' + stage);
				addLinkToPlace(md, 'fuck her', Place, 'type=gabbyslaverigfuck&stage=' + stage);
				addLinkToPlace(md, 'untie her and leave the cellar', 124, '', 'Bambi helps you undo the ropes and promises to carry out proper aftercare, like tending to any bruises and making sure Gabby is ready for the next session whenever you are.');
				WritePlaceFooter(md);
				return true;			
			}	
			if (sType == 'gabbyslaverigplay') {
				md = WritePlaceHeader(false, stage == 2 ? "" : "td-left-med");
				stage = parseInt(stage, 10);
				this.showPerson("gabby-bdsm" + stage + "b.jpg");
				addPlaceTitle(md, "Playing with the Bound Gabby");
				md.write(
					'<p>You don\'t really have a lot of experience with this aside from a book you once found in the library (It turned out to not belong to the library itself and by now you have a good idea who left it), but Bambi is a good teacher and according to her, you are a natural and learning surprisingly fast.</p>' +
					'<p>Sessions always start of slow. Light flogging, spankings and similar forms of impact play to build up adrenaline and allow her to get used to the rising sensations as you slowly pick up the pace.</p>' +
					'<p>You have no real reason to go soft on her, but at the same time you don\'t want to cause any damage from improper treatment and there is something extremely satisfying to bring her to the edge and back at your leisure, frequently forcing her to climax from the rush of pain alone and reminding her just how much her body enjoys it now, whether she likes it or not.</p>' +
					'<p>Gabby screams, moans and curses under your continued assault and Bambi helps you to strike the right spots and alternate between gentle and rough sensations. Slowly, you are pushing her closer to the edge until she collapses under a final, intense climax, her body coming to rest and her face deeply red as she recovers.</p>'
				);

				startQuestions();
				nstage = stage + 1;
				if (nstage > 4) nstage = 1;
				addLinkToPlace(md, 'change position', Place, 'type=gabbyslaverig&stage=' + nstage, 'Bambi helps you re-position your toy, explaining knots and techniques to you and making sure you know how to not cut of the flow off blood.</p><p>According to her, you are a natural and might soon be able to do your own ropework.');	
				addLinkToPlace(md, 'fuck her', Place, 'type=gabbyslaverigfuck&stage=' + stage);
				addLinkToPlace(md, 'untie her and leave the cellar', 124, '', 'Bambi helps you undo the ropes and promises to carry out proper aftercare, like tending to any bruises and making sure Gabby is ready for the next session whenever you are.');
				WritePlaceFooter(md);
				return true;			
			}	
			if (sType == 'gabbyslaverigfuck') {
				stage = parseInt(stage, 10);
				md = WritePlaceHeader(false, stage == 2 || stage == 4 ? "" : "td-left-med");
				this.showPerson("gabby-bdsm" + stage + "c.jpg");
				addPlaceTitle(md, "Fucking the Bound Gabby");
				md.write(
					'<p>Gabby likes it rough to begin with and sex with her has a tendency to escalate into a struggle who is on top and who is not, but this definitely solves that problem.</p>' +
					'<p>With her body nearly completely bound you can have your way with her however you like, and thanks to the effects of the spell she can\'t help but enjoy it.</p>' +
					'<p>Gabby tries to hold back her moans as you ' + (perYou.isMaleSex() ? 'push into her sex' : 'put the vibrator to her pussy') + ', but there is only so much she can do, and soon, her voice hallows through the Cellar as you bring her helpless body closer to the peak, always making sure to keep her on the edge and occasionally have her beg for it until you finally allow her to cum.</p>'
				);

				startQuestions();
				nstage = stage + 1;
				if (nstage > 4) nstage = 1;
				addLinkToPlace(md, 'change position', Place, 'type=gabbyslaverig&stage=' + nstage, 'Bambi helps you re-position your toy, explaining knots and techniques to you and making sure you know how to not cut of the flow off blood.</p><p>According to her, you are a natural and might soon be able to do your own ropework.');	
				addLinkToPlace(md, 'play with her', Place, 'type=gabbyslaverigplay&stage=' + stage);
				addLinkToPlace(md, 'untie her and leave the cellar', 124, '', 'Bambi helps you undo the ropes and promises to carry out proper aftercare, like tending to any bruises and making sure Gabby is ready for the next session whenever you are.');
				WritePlaceFooter(md);
				return true;			
			}	
		}
		
		else if (Place != 452) return false;
		
		var clv = this.getCharmedLevel();
		
		if (sType == "gabbyrecharm1") {
			md = WritePlaceHeader();
			if (clv == 1) this.showPerson("gabby-recharm1.jpg");
			else if (clv == 4) this.showPerson("gabby-recharm2.jpg");
			else this.showPerson("gabby16.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell - Again");
			md.write(
				'<p>“W...what are you doing?” Gabby\'s body twitches after you have re-cast the spell, her eyes quickly loosing focus as a barrage of new sensations rapidly overtakes her mind, opening it up to new orders.</p>' +
				'<p>“P...please stop this... I... I can\'t think, everything\'s so... so... ohhh”</p>' +
				'<p>She looses her train of thought with a soft moan and just helplessly stares at you, her body trembling from the rush of arousal as her mind gets ready to be shaped however you want.</p>'
			);

			startQuestions();
			if (clv != 4) addLinkToPlace(md, 'you still want to punish her', Place, 'type=gabbyrecharmslave');
			if (clv != 2) addLinkToPlace(md, 'you want her to desire you', Place, 'type=gabbyrecharmlover');
			if (clv != 1) addLinkToPlace(md, 'you want her to be with your Mom', Place, 'type=gabbyrecharmservant');
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "gabbyrecharmslave") {
			md = WritePlaceHeader();
			this.charmThem(4);
			this.showPerson("gabby-recharm4.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell - Again");
			md.write(
				'<p>“Turn around.” You order her, cutting of whatever protest she may have been about to give with a harsh “Do it!” as you take away whatever clothes she might have left.</p>' +
				'<p>“I had to realize that I have let you off too easy the last time. You need to be properly punished to be able to atone for your sins, and I am sure that you agree.”</p>' +
				'<p>You bring your hand harshly down on Gabby\'s ass before she is able to respond, her entire body twitching forward with a surprised gasp.</p>' +
				'<p>“Stop this! I...” Aaahhh!”</p>' +
				'<p>“Nope.” You say flatly, striking her again. “I know you want to be punished.” The next strike leaves a red imprint on her ass.</p>' +
				'<p>“In fact, you crave it.”</p>' +
				'<p>*Whack*</p>' +
				'<p>“You get off on it!”</p>' +
				'<p>*Whack*</p>' +
				'<p>“Just look at how wet your pussy is.”</p>' +
				'<p>Gabby doesn\'t answer as you push your fingers into her folds, coat it in her juices and splat those on her ass with the next strike. Her brain focused on processing the cascade of new sensations flooding her mind.</p>' +
				'<p>-This- will be how you get off from now on.“ She groans as you spank her again. “Masturbation will no longer suffice, sex will no longer suffice.“ Another strike hits her. ”You need the rush of adrenaline that comes with being treated like a kinky little painslut. You crave to be punished and humiliated like a naughty little slavegirl and you need me to do it.”</p>' +
				'<p>“Please, I ahh....ahhhhhhhhhh...”</p>' +
				'<p>You spank her harshly, bringing your hand down again, and again. Your mind taken over by a formerly unknown instinct to punish this woman, to push her to the limit and make her scream in both pain and ecstasy as your spell ravages her mind, and only when she screams her climax into the room, you stop.</p>' +
				'<p>“...You just came, did you?” This was more of a rhetoric question. Her body convulses under your touch and streams of her fluids run down her legs, so it\'s pretty obvious that she is literally cumming her brains out from your treatment.</p>' +
				'<p>“You really came from being spanked by me... maybe you secretly already were a little Painslut.”</p>' +
				'<p>“Gabby groans in response, her body trembling in the afterglow of what must have been a pretty intense orgasm, and you give her some time to adjust to her new mindset.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'punish her more', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "gabbyrecharmlover") {
			md = WritePlaceHeader();
			this.charmThem(2);
			this.showPerson("gabby-recharm3.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell - Again");
			md.write(
				'<p>“It is time to change things a little, and I am sure you feel the same, after all, you have wanted us to fuck for a while now, right?”</p>' +
				'<p>Gabby at first looks utterly dumbstruck as you say that, then angry. “I have not, I...” Her words trails off as the spell adjust her mind to your words.</p>' +
				'<p>“You have.” You state simply, using the confusion to take of whatever clothes remain. “You want me to fuck you like a beast, you crave to feel my ' + (perYou.isMaleSex() ? 'cock inside your pussy' : 'cunt against your pussy') + ', you want nothing more than to...</p>' +
				'<p>“Damn you!” She tries to slap you, but you know her well enough to expect it by now and catch her hand midair. “Stop fucking with my head like this and... and...” She stops... breathing heavily and starring at you in a mix of rage and desire for several heartbeats. “...and start fucking my pussy?”</p>' +
				'<p>“Oh to hell with it...You win, ' + perYou.getPersonName() + '!” She pulls you closer, her lips close to yours. “Yes, I want you, I want you to finger my pussy and slap my tits, I want to feel your fucking cock inside me/cunt against mine! So please, hurry up! If I have to be some stupid teenagers fucktoy I\'m better getting the best fucking pounding of my life out of it!”</p>'
			);

			startQuestions();
			addLinkToPlace(md, this.getCharmedLevel() != 1 ? 'fuck her more' : 'talk to her more', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "gabbyrecharmservant") {
			md = WritePlaceHeader();
			this.charmThem(1);
			this.showPerson("gabby-recharm3.jpg");
			addPlaceTitle(md, "Gabby Under A Charm Spell - Again");
			md.write(
				'<p>As fun as it was to mess with her, you do believe that Gabby should be at Mom\'s side, as she always has been, as her ' + (!isMurderPath() ? 'faithful little slave' : 'devoted lover') + '.</p>' +
				'<p>“But... but don\'t you want me anymore?” Gabby looks crushed for a few seconds, almost as if she is close to begging you to keep her until she catches herself.</p>' +
				'<p>“Oh hell... what am I doing...? ' + (!isMurderPath() ? 'I don\'t want to be her slave!' : 'I love Alex but...') + '” She grinds her teeth. “What game are you playing, ' + perYou.getPersonName() + '?”</p>' +
				'<p>“There is no game, you will do everything you can to make my Mom happy, and you will not be opposed to me using my magic on people, in fact. You find it quite sexy that I do.”</p>' +
				'<p>“Gabby opens her mouth to protest, but you cut her off with a sudden rush of arousal.”</p>' +
				'<p>“Repeat: I like it when ' + perYou.getPersonName() + ' uses ' + perYou.getHisHer() + ' Magic on other women.”</p>' +
				'<p>“I... ahhh...” She moans heavily. “I like it when ' + perYou.getPersonName() + ' uses ' + perYou.getHisHer() + ' Magic on other women.”</p>' +
				'<p>“' + capitalizeFirstLetter(perYou.getHeShe()) + ' should be able to use ' + perYou.getHisHer() + ' gift however ' + perYou.getHeShe() + ' wants.”</p>' +
				'<p>“' + capitalizeFirstLetter(perYou.getHeShe()) + ' should... should be able to use ' + perYou.getHisHer() + ' gift how... however ' + perYou.getHeShe() + ' wants.”</p>' +
				'<p>“I will support ' + perYou.getHimHer() + ' and ' + perYou.getHisHer() + ' mother in all things, I will work hard to serve Alex”</p>' +
				'<p>“I will support ' + perYou.getHimHer() + ' and ' + perYou.getHisHer() + ' mother in all things.” She breathes the words out hastily. “I will work hard to serve A... Alex... Ahhhhhh...”</p>' +
				'<p>You push her arousal as much as you can to make her climax, imprinting those words on her mind in the process and leaving her heavily gasping for air.</p>' +
				'<p>“This was... intense...” She looks at you, her eyes now fully taken over. “I... actually liked that, I really do like it when you use your magic.”</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'fuck her more', Place);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == 'gabbylovergloat') {
			md = WritePlaceHeader();
			this.showPerson("gabby16.jpg");
			addPlaceTitle(md, "Gloating");
			md.write(
				'<p>“Fuck you, ' + perYou.getPersonName() + '.” Gabby rolls her eyes and tries her best to ignore you from now on, but your presence clearly riles her up.</p>' +
				'<p>She looks moody and annoyed, but also really horny, her eyes occasionally shifting to you and her fingers twitching to her folds, but it doesn\'t look like she wants to give you the satisfaction of having to touch herself.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'not enough', Place);			
			addLinkToPlace(md, 'leave the house', 38);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == 'gabbyloverxxx') {
			md = WritePlaceHeader();
			this.showPerson("gabby15.jpg");
			addPlaceTitle(md, "Fucking Gabby");
			md.write(
				'<p>“Okay.” Gabby tries not to show it, but she is genuinely excited to hear that. You see her pose shifting slightly, and she licks her upper lip.</p>' +
				'<p>“Let\'s get this over... Ach to hell with the pretense. Just fuck me, please?”</p>'
			);

			startQuestions();
			if (perYou.isMaleSex()) {
				addLinkToPlace(md, 'fuck her ass', Place, 'type=gabbyloverfuckass');	
				addLinkToPlace(md, 'fuck her mouth', Place, 'type=gabbyloverbj');	
			} else {
				addLinkToPlace(md, 'order her to eat you out', Place, 'type=gabbyloverbj');	
				if (perYou.FindItem(45) > 0) addLinkToPlace(md, 'fuck her with a strap-on', Place, 'type=gabbyloverstraponfuck');				
			}
			addLinkToPlace(md, 'just fuck her', Place, 'type=gabbyloverfuck');
			addLinkToPlace(md, '"Actually, you -are- just here to gloat"', Place, 'type=gabbylovergloat2');
			addLinkToPlace(md, '"Not now", and leave the house', 38);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == 'gabbyloverfuckass') {
			md = WritePlaceHeader();
			this.showPersonRorX("gabby17.jpg");
			addPlaceTitle(md, "Fucking Gabby\'s Ass");
			md.write(
				'<p>Sex with Gabby is generally rough, intense and a struggle to keep up with her, but great if you need to work up a sweat and take your frustrations out on someone, she definitely does so on you.</p>' +
				'<p>Gabby knew what you were planning to do with the lube and puts up a bit of a fight, but actually surrenders unusually fast and quickly finds herself on all fours with your cock sliding into her tight rear.</p>' +
				'<p>She moans as you place a slap on her ass and push into her, keeping her body pinned to the bed and roughly rocking your hip. She groans lustfully, her expression a mix of pain and lust as you speed up and grinding her fingers deeper into the sheets with every passing second until she actually reaches her peak before you do and shouts her climax into the room with a litany of assorted profanities right as you unload your own climax into her.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'that\'s not enough', Place);
			addLinkToPlace(md, 'leave the house', 38);
			WritePlaceFooter(md);
			return true;			
		}
	
		if (sType == 'gabbyloverbj') {
			md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-med' : '');
			if (perYou.isMaleSex())	this.showPersonRorX("gabby18.jpg");
			else this.showPerson("gabby20.jpg");
			addPlaceTitle(md, "Fucking Gabby\'s Mouth");
			if (perYou.isMaleSex())	{
				md.write(
					'<p>Gabby is not as enthusiastic about a blowjob as she is about more direct forms of sex, but her lust usually wins out and it takes little convincing for her to get on her knees and service you.</p>' +
					'<p>Her method can best be described as sloppy and aggressive, with hard, jerky motions and a lot spit as her lips and tongue roll over your cock, focused on getting you to climax and shoot your load onto her face as quick as possible.</p>' +
					'<p>And she\'s pretty good at that.</p>'
				);
			} else {
				md.write(
					'<p>Gabby is not as enthusiastic about eating you out as she is about more direct forms of sex, but her lust usually wins out and it takes little convincing for her to get on her knees and service you.</p>' +
					'<p>She is aggressive and sloppy, using her fingers more than her tongue and not interested in drawing things out, but you have to admit... she is really good at what she does.</p>' +
					'<p>She figured out where your most sensitive areas are in record time and knows how to stimulate them with amazing precision, usually making you cum in record time, though not really being very sensual about it.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, 'that\'s not enough', Place);
			addLinkToPlace(md, 'leave the house', 38);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == 'gabbyloverfuck') {
			md = WritePlaceHeader(false, perYou.isMaleSex() ? '' : 'td-left-med');
			if (perYou.isMaleSex()) this.showPersonRorX("gabby19.jpg");
			else this.showPerson("gabby20.jpg");
			addPlaceTitle(md, "Fucking Gabby");
			md.write(
				'<p>Gabby may not be deeply in love with you, but she still wants you to enjoy yourself and come back to her, and you found that she can be surprisingly affectionate after having her urges satisfied.</p>' +
				'<p>This time is no different, Gabby and you roll around the bed, constantly shifting who is on top and who gets pinned down, and the more you go, the more aggressive she gets, pulling your hair, digging her fingers into your skin and even slapping your ass if given the opportunity.</p>' +
				'<p>You really don\'t know if she has always secretly been like that or your spell awakened that side, but you have to admit that having sex with her is a rush like few others and having her come to rest in your sore arms in the end not an unpleasant finale.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'that\'s not enough', Place);
			addLinkToPlace(md, 'leave the house', 38);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == "gabbyloverstraponfuck") {
			md = WritePlaceHeader();
			this.showPerson("gabby21.jpg");
			addPlaceTitle(md, "Fucking Gabby with a Strap-On");
			md.write(
				'<p>Using your strap-on on Gabby is equally satisfying and exhausting, and it almost makes you appreciate all the work some men must be putting into sex regularly.</p>' +
				'<p>You usually change position often, but in most cases things end up with Gabby either face down on the ground as you aggressively pound away or her riding you to climax.</p>' +
				'<p>In either case, it is satisfying to watch her impale herself on the fake cock, and Gabby clearly enjoys herself as well.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'that\'s not enough', Place);
			addLinkToPlace(md, 'leave the house', 38);
			WritePlaceFooter(md);
			return true;			
		}			
		
		if (sType == 'gabbylovergloat2') {
			md = WritePlaceHeader();
			this.showPerson("gabby16.jpg");
			addPlaceTitle(md, "Gloating");
			md.write(
				'<p>“Fuck you, ' + perYou.getPersonName() + '.” Gabby rolls her eyes and tries her best to ignore you from now on, but your presence clearly riles her up.</p>' +
				'<p>She looks moody and annoyed, as well as really horny, her eyes occasionally shifting to you and her fingers twitching to her folds, but it doesn\'t look like she wants to give you the satisfaction of having to touch herself.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'that\'s not enough', Place);
			addLinkToPlace(md, 'leave the house', 38);
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType == 'gabbyslavefuck') {
			md = WritePlaceHeader(false, perYou.isMaleSex() ? '' : 'td-left-med');
			if (perYou.isMaleSex()) this.showPersonRorX("gabby19.jpg");
			else this.showPerson("gabby20.jpg");
			addPlaceTitle(md, "A Quickie with Gabby");
			md.write(
				'<p>Thanks to your conditioning, Gabby gets off more from the rush of pain than from sex itself, and it shows in the way she treats you in bed.</p>' +
				'<p>Sex with her is generally rough, intense and a struggle to keep up with her, but great if you need to work up a sweat and take your frustrations out on someone, she definitely does so on you.</p>' +
				'<p>You roll around in the sheets, pull hair, spank each other and waste little time on kisses or foreplay. Both of you tend to end up with a few bruises, but you have yet to injure each other, and you doubt it will happen.</p>' +
				'<p>Gabby may not be deeply in love with you, but she wants still wants you to enjoy yourself and come back to her, and you found that she can be surprisingly affectionate after having her urges satisfied.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'that\'s not enough', Place);
			addLinkToPlace(md, 'leave the house', 38);
			WritePlaceFooter(md);
			return true;			
		}
		
		return false;
	};

	// Can you chat with Gabby or someone else
	per.showPersonChatCharmed = function(md)
	{
		if (Place == 452 && this.isHere() && sType == "") {
			if (this.getCharmedLevel() == 2) {
				// Lover
				addLinkToPlace(md, '"Here to Gloat"', Place, 'type=gabbylovergloat');
				addLinkToPlace(md, '"Here to Fuck"', Place, 'type=gabbyloverxxx');	
			} else if (this.getCharmedLevel() == 4) {
				addLinkToPlace(md, 'have a quickie', Place, 'type=gabbyslavefuck');
				if (isCharmedBy("Bambi") && checkPlaceFlag("Hotel", 9)) addLinkToPlace(md, 'have Bambi rig her up in the Hotel Cellar', 161, 'type=gabbyslaverig', 'You quickly take Gabby over to the Hotel tell Bambi what you want. Bambi is fast, as usual, and within a few minutes, she has Gabby locked into an elaborate rope harness for your enjoyment.',  '', 'WaitHereOnly(2)');				
			}
			if (!this.checkFlag(17)) {
				addQuestionR(md, 'ask her about the necklace',
					'“It\'s a family heirloom, or was until recently.” Gabby is still rather bitter about you taking it.</p>' +
					'<p>“Apparently, the warlock Kurndorf handed out these and other trinkets to those loyal to him, including some of my ancestors.”</p><p>' +
					(isMurderPath() ? '“I didn\'t think I would ever use it and only took it out after the murder of Sir Gates... Funny how using it only caused you to come after me earlier, is it?”'
										 : '“I have been using it for about a year to improve my standing in the studio and prepare Alex for my plan, and without your meddling, I would have taken over that place and...” She breathes out...</p>' +
											'<p>“Of course, I no longer need such ambitions as I am now your loyal plaything instead... which is just as great.”'),
					"",
					"setPersonFlag(\\'Gabby\\',17)"
				);
			} else if (!this.checkFlag(18)) {
				addQuestionR(md, 'ask about her ancestors',
					'“I\'m not sure how much you know about Glenvale\'s history, but the Halliways were servants of Kurndorf. Minor warlocks and nobles who pledged their fealty to him early and were rewarded with a small degree of power over the commoners during his reign.”</p>' +
					'<p>“They were the ones who built what is now the Gates mansion, but lost everything when their “Master” died. They tried to hold on to whatever power they had left but in the end were forced to flee overnight, taking whatever trinkets they could carry with them.”</p><p>' +
					(isMurderPath() ? '“I have tried to distance myself from them and their deeds for most of my life, and the moment I use their legacy I fall under the spell of a warlock myself... Ironic, isn\'t it?”'
										 : 'Truth be told, I have always envied them for their magic and power, even if it meant servitude to Kurndorf, though of course I never thought I\'d end up like them if I actually make use of their legacy...'),
					"",
					"setPersonFlag(\\'Gabby\\',18)"
				);
			} else if (!this.checkFlag(19)) {
				addQuestionR(md, 'ask about her relationship with your Mom',
					(isMurderPath() ? '“I truly love her and confessed it about a year ago.”</p>' +
											'<p>“Alex was hesitant at first due to our work, but we started dating and one thing slowly led to another. She wanted to tell you and Tracy about it, but I asked her not to, for now.”</p>' +
											'<p>“I... regret using our hypnosis sessions to bring her under my will and justifying it with my fear of you. I went too far when I saw how much control I had, left you no choice but to come after me and tainted something beautiful we shared.”'
										 : '“I was so close to...” She stops mid sentence and grinds her teeth. “What is there to say? I actually used to love her and confessed it a year ago, but she wanted to keep our relationship professional.”</p>' +
											'<p>“I knew that my ancestors were rumored to be warlocks, but... unlike you I apparently lacked the talent needed to learn any spells, so I used what I had from them over the course of the last year to make her mine, not as a lover, but a slave.”</p>' +
											'<p>“And then someone like you succeeds with ease where I failed and interferes at the last minute...”'),
					"",
					"setPersonFlag(\\'Gabby\\',19)"
				);
			}
			// Sleeping
			if (this.getCharmedLevel() == 2) {
				// Lover
				addSleepLink(md, "take her to bed", "Sleeping with Gabby",
					'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%">Even Gabby gets tired at one point, and that provides one of the rare opportunities for both of you to peacefully share the bed together, at least until tomorrow.',
					this.getImg('gabby-bed1.jpg'), true, '', '', '', "overflow-y:hidden"
				);	
			} else if (this.getCharmedLevel() == 4) {
				addSleepLink(md, "take her to bed", "Sleeping with Gabby",
					'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%">You decide to go to sleep for the night, which in this case means you are sleeping in her bed, while she sleeps in front of it, chained to the bedpost.',
					this.getImg('gabby-bed2.jpg'), true, '', '', '', "overflow-y:hidden"
				);				
			} else if (this.getCharmedLevel() == 1) {
				addSleepLink(md, "Spend the night at Gabby's home", "Sleeping at Gabby's Home",
					'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%">Gabby isn\'t really happy with you being here, but she always has a guest-bed ready for you to use.<br>During the night, you are woken up by noises from Gabby\'s bedroom, and as you go to investigate, you find her masturbating furiously with a thick dildo.<br>You are certain she looks at you for a brief moment, but never says anything as you watch her bring herself to climax and silently go back to your bed before she recovers from it.',
					this.getImg('gabby-bed3.jpg'), true, '', '', '', "overflow-y:hidden"
				);			
			}			
		}
	};
	
	// Can you chat with Gabby or womeone else
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 247 && this.isHere() && sType === "") {
			// Ghoul
			addLinkToPlace(md, "use the ghoul", Place, 'type=useghoul');
			return;
		}
		if (Place == 415 && sType === "") {
			
			var bCanArrest = isArrestPossible();
			if (!perYou.checkFlag(12) && !this.checkFlag(1) && !isArrestPossible()) {
				// Now impossible to get arrested
				addQuestionC(md, 'ask about the book on Hypnosis', "Gabby", 101);
			} else if (perYou.checkFlag(12) && checkPersonFlag("Monique", 17) && !this.checkFlag(1)) addQuestionC(md, 'ask about the book on Hypnosis from the library', "Gabby", 100);
		}

		if (this.isCharmedBy()) return this.showPersonChatCharmed(md);
		
		// Are we after one of the hypno scenes
		if (!(this.checkFlag(3) || this.checkFlag(4))) return;

		// Looking for information in her office
		if (Place == 372 && !isDay()) addLinkToPlace(md, "check Gabby\'s Office", 417);
		if (Place == 417) {
			if (!this.checkFlag(6)) {
				addQuestionR(md, 'look around the office',
					'You are pretty sure that Gabby will notice if as much as a single speck of dust it\'s not where it\'s supposed to be, which limits your options to really snoop around, but do find her day planner on the work desk.',
					"",
					"setPersonFlag(\\'Gabby\\',6)"
				);
			} else if (!this.checkFlag(7)) {
				addQuestionR(md, 'check her Day planner',
					(isMurderPath() ? 
						'Lucky for you, the wonders of modern smartphone apps have either not reached Gabby, or been deemed unreliable by her. Either way, you quickly flip towards the last pages to find out what she will be doing this week.</p>' +
						'<p>Most of it is predictable. Meetings, work time, breaks, exercise and sleep at a schedule she seems to repeat almost every day. You do, however, find several entries in the past months simply marked as “Test/Necklace” or something similar, often with notes like “success, failure, use less/more pressure” or other additions added later.</p>' +
						'<p>The entries pick up in frequency in the last two weeks, and right now, pretty much every night after the studio closes is marked “Necklace/Alex” in her planner.</p>' +
						'<p>Gabby is obviously using the necklace you saw to hypnotize your Mom during this time! You may be able to confront her alone once Mom has been placed in a trance, but you will need to find out more about the necklace fist. Maybe someone with knowledge of hypnotic techniques or Kurndorf-era trinkets could tell you more?'
					: 'Lucky for you, the wonders of modern smartphone apps have either not reached Gabby, or been deemed unreliable by her. Either way, you quickly flip towards the last pages to find out what she will be doing this week.</p>' +
						'<p>Most of it is predictable. Meetings, work time, breaks, exercise and sleep at a schedule she seems to repeat almost every day, there is, however, an item of interest on the list:</p>' +
						'<p>One entry has been neatly crossed out  and replaced with a new one: “Mayoral press gathering/Sarah Gates interview”.</p>' +
						'<p>Apparently, she had a reporter assigned to interview Sir Ronald\'s niece at a press gathering organized by Mayor Thomas, but he called in sick, and with the team stretched thin thanks to her efforts she\'ll have to go herself.</p>' +
						'<p>This is really useful information. Gabby will be at the town hall, alone, and if you play your cards right, you\'ll be able to catch and charm her before she returns to the studio.</p>' +
						'<p>The event is... tomorrow at 6:00 pm and apparently closed to the public... that doesn\'t leave you a lot of time to prepare.'),
					"",
					"setPersonFlag(\\'Gabby\\',7)"
				);
			}
		}
		
		// Looking elsewhere
		
		// Common to all paths
		// Victoria
		if (Place == 197 && !this.checkFlag(5) && !this.checkFlag(10) && !this.checkFlag(8)) {
			addQuestionR(md, 'ask Victoria if she knows anything about that necklace',
				'“I am Sorry, but there are reports of at least 5 dozen different magical necklaces in the area around Glenvale alone. I will see if I can find anything befitting your description, but it will take time, maybe too much.”',
				"Victoria",
				"setPersonFlag(\\'Gabby\\',5)"
			);
		}
		
		// Mr Beasley
		if (Place == 11 && perBeasley.isCharmedBy() && !this.checkFlag(9) && !this.checkFlag(8)) {
			if (perBeasley.dress == "Bimbo1") {
				addQuestionR(md, 'ask Ms Beasley about Gabby\'s necklace',
					'“Uhhhh, a necklace you say?” Miss Beasley giggles happily. “I totes love jewelry, you think it\'ll look prittys on my tittys?” Miss Beasley laughs about her own wordplay, and you have to admit to yourself that you may have gone a little overboard with her transformation.”',
					"MrBeasley",
					"setPersonFlag(\\'Gabby\\',9);setQueryParams()"
				);
			} else if (perBeasley.dress == "Bimbo2") {
				addQuestionR(md, 'ask Ms Beasley about Gabby\'s necklace',
					'“Uhhh, Hypnosis... and magic trinkets?” Miss Beasley scratches the back of her head. “Yes, yes I, like, used to know real lots \'bout that... I think...”</p>' +
					'<p>You ask if there is anything she can remember, and Miss Beasley contemplates almost painfully long.</p>' +
					'<p>“Uh... sorry...” Her head sinks down in a moment of frustration. ”All I can think of is how much I want you to fuck me, or how much I like being fucked in general...” There is a brief moment of annoyance on her face, but it is quickly washed away by a cheerful smile.</p>' +
					'<p>“Sorry, don\'t know \'bout this stuff anymore, but I know lots \'bout fucking! Would you like to ask me something \'bout that, ' + perYou.getPersonName() + '?”</p>' +
					'<p>You really did a number on your teachers brain with that spell. There\'s no useful information to get here.',
					"MrBeasley",
					"setPersonFlag(\\'Gabby\\',9);setQueryParams()"
				);
			} else if (perBeasley.dress == "Male") {
				if (sType === "") {
					addLinkToPlace(md, 'ask Mr Beasley about Gabby\'s necklace', Place, 'type=gabbyaskbeasley2',
						'“You have found one of Kurndorfs psychomancy charms?” Your Teacher looks at you incredulously. “I had thought those to have been long lost... where have you seen it? I need... I mean you will need one if you want to make the most of your hypnotic abilities, ' + perYou.getPersonName() + '.',
						"MrBeasley"
					);
				} else if (sType === "gabbyaskbeasley2") {
					addLinkToPlace(md, 'order Mr Beasley to tell you more', Place, 'type=gabbyaskbeasley3',
						'“Yes, yes, of course.” Mr Beasley grovels before you. “You see, Kurndorf was powerful, but even he needed underlings to do his dirty work.” Mr. Beasley folds his hands in front of himself.</p>' +
						'<p>“To ensure they would be able to keep the common peasants under control, he had a series of trinkets crafted and imbued them with a spell.”',
						"MrBeasley"
					);
				} else if (sType === "gabbyaskbeasley3") {
					addLinkToPlace(md, 'ask about the spell', Place, 'type=gabbyaskbeasley4',
						'“Basic psychomancy. Like the Dai Chu, but self-sustained and on a much smaller scale.” He explains in his “arrogant teacher” voice. “People who are exposed to these trinkets, the longer the better, would be more inclined to trust the wearer, let down their guards, be swayed by his or her words...”</p>' +
						'<p>“They can not really “enthrall” a person, but a skilled Hypnotist gaining someones trust, could easily breach their mental defenses and use it to implant triggers or subtly change ones behavior... the possibilities are astonishing...”',
						"MrBeasley"
					);
				} else if (sType === "gabbyaskbeasley4") {
					addLinkToPlace(md, 'ask about how to overcome it', Place, 'type=gabbyaskbeasley5',
						'Beasley seems to be lost in his thoughts, likely basking in lecherous fantasies of what using the necklace would allow him to do to the girls in his class, and you have to roughly shake him out of them.</p>' +
						'<p>“My apologies, ' + perYou.getMaster() + '.” He straightens himself again</p>' +
						'<p>“Well, As I said, the necklace is merely implanting an idea, little more. Once you become aware of the effect, a small amount of focus is pretty much all that is needed to shake it off. Well, unless you are already deeply under the hypnotists influence, that is.” He sneers.</p>' +
						'<p>“Kurndorf would obviously not hand out anything that could be used against him in any way. An inexperienced attacker might be thrown of guard by its effects, possibly expecting a trap or experiencing uncertainty, but this is nothing a strong willed mind like yours can not overcome once aware of the influence, I am sure, ' + perYou.getMaster() + '”',
						"MrBeasley"
					);
				} else if (sType == "gabbyaskbeasley5") {
					addQuestionR(md, '"How could Gabby have found one of these trinkets?"',
						'“Didn\'t you know? The Halliway Family used to be minor nobles serving Kurndorf, Percy Halliwell, the last recorded member of his line to live in Glenvale, likely got as much from what is now the Gates...” He speaks the name with utter disdain. “...mansion as he could carry before he ran away.”</p>' +
						'<p>“When my own Ancestors took residence, they found barely anything of use... to think a trinket of such importance was right here in Glenvale, I could have...” He stops mid sentence as if fighting with himself before going back to groveling.</p>' +
						'<p>“Of course, whatever former ambitions I may have had now take second place to yours, ' + perYou.getMaster() + '. And I hope you continue to see my use.” His eyes focus on you wantonly, ' + (perYou.isBornMale() ? 'and you kinda know how the girls in class must have felt with him.' : 'with that creepy lecherous look you know so well from him, but he is a lot less unsettling now that he\'s under your control.'),
						"MrBeasley",
						"GabbyGotInformation()"
					);
				}
			} else if (perBeasley.dress == "Bondage") {
				if (sType === "") {
					addLinkToPlace(md, 'ask Miss Beasley about Gabby\'s necklace', Place, 'type=gabbyaskboundbeasley2',
						'“You want me to tell you more about a Necklace you saw being used to hypnotize someone?” Miss Beasley looks like she struggles with herself, and it\'s obvious she doesn\'t want to help you out.</p>' +
						'<p>“Why should I... why...” She curses under her breath, her lips beginning to form words she never gets to say until she finally gives up with a frustrated sigh.”</p>' +
						'<p>“I presume this is an order ”' + perYou.getMaster() + '?””',
						"MrBeasley"
					);
				} else if (sType === "gabbyaskboundbeasley2") {
					if (!checkPersonFlag("MrBeasley", 13)) {
						addQuestionR(md, 'of course it is, and just for that attitude she will also strip naked and bend over the desk',
							'Miss Beasley protests, even as her body is already following your orders, and she looks seriously embarrassed as she leans over her desk and spreads her legs for you.',
							"",
							"setPersonFlag(\\'MrBeasley\\',13)"
						);
					}
					addLinkToPlace(md, 'order her to tell you everything', Place, 'type=gabbyaskboundbeasley3',
						'“Of course, ' + perYou.getMaster() + '.” Miss Beasley breathes out. “You see, Kurndorf was powerful, but even he needed underlings to do his dirty work, and he had to ensure they would be able to keep the common peasants under control.” She begins to explain.</p>' +
						'<p>“So, he had a series of trinkets crafted and imbued them using a simple spell.”',
						"MrBeasley"
					);
				} else if (sType === "gabbyaskboundbeasley3") {
					if (perBeasley.checkFlag(13)) {
						if (getQueryParam("tease") === "") {
							addQuestionR(md, 'tease her while she speaks',
								'You can feel her tense up in anticipation when you move your fingers towards her folds and slowly drag them along the sensitive surface, and while Miss Beasley may grind her teeth, her new body clearly enjoys the attention just as much as you enjoy the cute little gasp escaping her lips and the way her voice begins to tremble as she speaks on.',
								'',
								"addQueryParams(\\'tease=true\\')"
							);
						}
					}
					addLinkToPlace(md, 'let her tell you about the spell', Place, 'type=gabbyaskboundbeasley4',
						'“Basic psychomancy. Like the Dai Chu, but self-sustained and on a much smaller scale.” She explains, doing her best to sound calm. “People who are exposed to these trinkets, the longer the better, would be more inclined to trust the wearer, let down their guards, be swayed by his or her words...”</p>' +
						'<p>“They can not really “enthrall” a person, but a skilled Hypnotist gaining someones trust, could easily breach their mental defenses and use it to implant triggers or subtly change ones behavior... the possibilities would be...” Her mind seems to trail off...',
						"MrBeasley"
					);
				} else if (sType === "gabbyaskboundbeasley4") {
					if (perBeasley.checkFlag(13)) {
						if (getQueryParam("spank") === "") {
							addQuestionR(md, 'give her a good spanking',
								'Miss Beasley\'s body twitches forward with a loud, sensuous moan the moment your hand connects with her rear.</p>' +
								'<p>“Dammit, don\'t...” Whatever protest she may have had is silenced by a second slap to her other cheek, followed by a third and a forth, each one forcing a soft, euphonious noise from your teachers lips.</p>' +
								'<p>“Curse this body...” Miss Beasley breathes through her teeth as you grant her a moment of respite and softly drive your fingertips over the reddening flesh. “Why does this have to feel so...” She angrily grinds her teeth together before finishing the sentence, but you have a good idea of what she tried to say by the way her folds are dampening.',
								"",
								"addQueryParams(\\'spank=true\\')"
								
							);
						}
					}						
					addLinkToPlace(md, 'tell her to focus and continue', Place, perBeasley.checkFlag(13) ? 'type=gabbyaskboundbeasley5' : '',
						'“My apologies, ' + perYou.getMaster() + '.” Her exposed body shivers a little.</p>' +
						'<p>“They have a weakness, of course, the necklace is merely implanting an idea, little more. Once you become aware of the effect, a small amount of focus is pretty much all that is needed to shake it off. Well, unless you are already deeply under the hypnotists influence, that is.” She shifts a little on the desk as she speaks.</p>' +
						'<p>“Kurndorf would obviously not hand out anything that could be used against him in any way. An inexperienced attacker might be thrown of guard by its effects, possibly expecting a trap or experiencing uncertainty, but it\'s nothing a strong willed mind like yours can\'t overcome once aware of the influence, I am sure, ' + perYou.getMaster() + '”',
						"MrBeasley",
						perBeasley.checkFlag(13) ? "" : "GabbyGotInformation()"
					);
				} else if (sType == "gabbyaskboundbeasley5") {
					addQuestionR(md, 'ask if she wants to be rewarded',
						'“Thank you for your help, Miss Beasley.” You put a strong emphasis on the honorific, much to her annoyance. “Would you like me to reward you?”</p>' +
						'<p>The former man desperately tries to muffle her moans as you begin to drive your fingers over her exposed sex, shivering delightfully with every small movement and yet unwilling to lower herself to actually ask for relieve.</p>' +
						'<p>Of course, her new body betrays her. Your fingers push deeper into the damp tunnel and every single motion makes her twitch and tense up violently, her body shaking as wave after wave of those pleasant little shocks rushes through her but still biting her lower lip and not speaking up even as she is close to climax.</p>' +
						'<p>“Still sure you do not want a reward, Miss Beasley?” You stop moving and watch the struggle on your teachers face.”</p>' +
						'<p>“Alright.” You pull your fingers away, and for a second, you are sure she would crack, but to her credit, she remains silent.</p>' +
						'<p>“Oh, you are of course not allowed to reward yourself.” You casually mention as you wipe her juices from your fingers. “You will not be allowed to touch yourself or otherwise climax for the rest of the day, understood?”</p>' +
						'<p>“Y...yes, ' + perYou.getMaster() + '...”</p>' +
						'<p>“Good girl.”',
						"",
						"GabbyGotInformation()"
					);
				}
			}
		} else 	if (Place == 436 && checkPersonFlag("AdeleRoss", 6) && !this.checkFlag(8)) {
			// Ask Adele
			if (sType === "") {
				addLinkToPlace(md, 'ask Adele if she knows anything about that necklace', Place, 'type=gabbyaskadele2',
					'“Actually, yes, I do. I had expected Beasley to use something like this, so I\'ve read up on these trinkets to find out how to counter them.”</p>' +
					'<p>“See, the Warlock Kurndorf granted his most loyal followers various trinkets to help them spread his influence. Bracelets, necklaces, staffs and rods... all of them strong enough to influence the normal populace, but never as strong as that they could become a threat to himself, and if I am right, your mothers assistant is using a basic psychomancy charm.</p>' +
					'<p>It\'s not quite mind control, but it works on similar principles to the spell you are using.”',
					"AdeleRoss"
				);
			} else if (sType == "gabbyaskadele2") {
				addLinkToPlace(md, '"How exactly does it work?"', Place, 'type=gabbyaskadele3',
					'“An “idea” is placed in the minds of those affected by it, usually that the wearer is trustworthy and likable, leading people to be at ease and dropping their guard around them, possibly even making them think twice about attacking. There are limitations, though.”</p>' +
					'<p>“Eye contact with the trinket needs to be established, the longer the better, and the effects are easily shaken off once you know about them. It won\'t enthrall anyone just by being worn, but it likely helped this woman to convince your mother to allow herself be hypnotized.”',
					"AdeleRoss"
				);
			} else if (sType == "gabbyaskadele3") {
				addQuestionR(md, '"Are there any defenses?"',
					'“Usually not. Some who fought those wielding these trinkets reported a strong feeling of unease, as if they are about to make a grave mistake by attacking, but it can apparently be easily overcome if your conviction is strong enough, so you basically just need to really want to charm her, I\'m sure you can manage that.”',
					"AdeleRoss",
					"GabbyGotInformation()"
				);
			} 

		} else if (Place == 192 && isCharmedBy("Sarah") && !this.checkFlag(8)) {
				// Ask Sarah
				if (sType === "") {
					addLinkToPlace(md, 'ask Sarah if she knows anything about that necklace', Place, 'type=gabbyasksarah2',
						'“I should know something about this.” Sarah moves to get a book. Magic trinkets were part of my early training before uncle Ronnie... her voice breaks as she speaks, Sarah looks close to tears for about a second before the pink glow flares up behind her eyes and a carefree smile returns to her face. “Uh... where was I... oh yes! The Warlock Kurndorf granted his most loyal followers various trinkets to help them spread his influence. Bracelets, necklaces, staffs and rods... all of them strong enough to influence the normal populace, but never as strong as that they could become a threat to himself.” She turns the book around and points to a drawing of a familiar looking piece of jewelry.</p>' +
						'<p>“If I am right, your little hypnotist is using a basic psychomancy charm, not quite mind control, but it works on similar principles to the Dai Chu.”',
						"Sarah"
					);
				} else if (sType == "gabbyasksarah2") {
					addLinkToPlace(md, '"How exactly does it work?"', Place, 'type=gabbyasksarah3',
						'“An “idea” is placed in the minds of those affected by it, usually that the wearer is trustworthy and likable, leading people to be at ease and dropping their guard around them, possibly even making them think twice about attacking. There are limitations, though.”</p>' +
						'<p>“Eye contact with the trinket needs to be established, the longer the better, and the effects are easily shaken off once you know about them. It won\'t enthrall anyone just by being worn, but it likely helped this woman to convince your mother to allow herself be hypnotized.”',
						"Sarah"
					);
				} else if (sType == "gabbyasksarah3") {
					addQuestionR(md, '"Are there any defenses?"',
						'“Usually not. Some who fought those wielding these trinkets reported a strong feeling of unease, as if they are about to make a grave mistake by attacking, but it can apparently be easily overcome if ones conviction is strong enough.” Sarah closes the book.</p>' +
						'<p>And you are the strongest and most wonderful person I know, ' + perYou.getMaster() + '"',
						"Sarah",
						"GabbyGotInformation()"
					);
				} 
			} else if (!isMurderPath() && this.checkFlag(7) && !this.checkFlag(13)) {
			// Apprentice/Conspiracy paths only
			if (isPersonHere("Mayor") && isCharmedBy("Mayor")) {
				if (sType === "" && !this.checkFlag(10)) {
					addLinkToPlace(md, 'ask Mayor Thomas about the press gathering', Place, 'type=askmayorconference2',
						'“Oh yes, the press gathering.” Beatrice answers dispassionately, and you get the feeling she is a little disappointed that you are not here for sex. “I was supposed to promote a project of mine in the city outskirts, but I fear questions regarding the recent influx of strange events will steal most of the attention away from it, and...” She stops halfway, her eyes going wide!”</p>' +
						'<p>“You wish to attend, right, ' + perYou.getMaster() + '?” Her interest perks up quickly, realizing she might have a chance to please you. “For the most part, we have only invited journalists from various publications. It\'s far from the event I intent to present you with, but there are a few socialites scheduled to attend to raise public interest, as well.” She is literally pushing her chest out now and giving you the bedroom eyes. “There\'s no one nearly as influential and useful to you as I am, of course, but if you have your eye on anyone just say the word!”',
						"Mayor"
					);
				} else if (sType == "askmayorconference2") {
					addLinkToPlace(md, 'tell her about Gabby', Place, 'type=askmayorconference3',
						'“The representative of MC channel 4? Consider it done.” The Mayor doesn\'t even ask why you would want to charm her, and you don\'t feel the need to tell her the whole story anyway.</p>' +
						'<p>“I will find a way to isolate her from the rest of the attendees and make sure that you receive a VIP pass with full access to the entire facility.” She is practically brimming with enthusiasm. “Just make sure to be here before <b>6:00 PM ' + (this.checkFlag(23) ? 'today' : 'tomorrow') + '</b> and I will also ensure that you look the part.”</p>' +
						'<p>“Look the part?” You ask, and the Mayor nods.</p>' +
						'<p>“It is still an upper class event, but with your natural radiance, my influence and the right attire, no one will question your right to be there, I promise, ' + perYou.getMaster() + '!”</p>' +
						'<p>Well you didn\'t even consider that you shouldn\'t just walk in there with your casual attire, but it seems mayor Thomas has thought of that. Now only one question remains, <b>are you ready to deal with Gabby and the Necklace?</b>',
						"Mayor",
						"setPersonFlag('Gabby',10)"
					);
				} else if (sType == "askmayorconference3") {
					startAlternatives(md);
					addQuestionR(md, 'you still have something to take care off, leave for now',
						'There are still a few things you need to do before you face Gabby, but Mayor Thomas assures you that everything will be ready once you return.</p>' +
						'<p>Just make sure to be in Mayor Thomas\'s office before <b>6:00 PM ' + (this.checkFlag(23) ? 'today' : 'tomorrow') + '</b>, the event can not be rescheduled at this point.',
						"Mayor",
						"setQueryParams()"
					);
				}
				if (this.checkFlag(23) && Place == 110) {
					if (sType === "" || sType == "askmayorconference3") {
						addPopupLinkToPlaceC(md, 'wait at the Town hall till 6:00 pm and get ready for the event', 110, 'type=waitconfmayor2', "Waiting for the Conference",
							'<img src="Images/Items/' + (perYou.isBornMale() ? 'suit' : 'dress') + '.jpg" style="width:25%;float:left;margin-right:5px" alt="Dress">' +
							'You spend the rest of the day getting ready for the event, forming a plan with Mayor Thomas, picking out a nice ' + (perYou.isBornMale() ? 'suit' : 'dress') + ' to wear and of course having a shower...'
						);
						if (sType == "askmayorconference3") endAlternatives(md);
					}			
				}
			}
			if (isPersonHere("Sarah")) {
				if (sType === "" && !this.checkFlag(11)) {
					addLinkToPlace(md, 'ask Sarah about the interview with Gabby', Place, 'type=asksarahconference2',
						'Sarah eyes you curiously when asked about the upcoming event before asking you to have a seat and talk.</p>' +
						'<p?“I am indeed scheduled to make an appearance during that event. The Gates Family has always donated generously to the city, after all.” She folds her hands on her lap. ”These events tend to be dull, so I usually take Lauren as my “plus one” with me to provide some entertainment.” You see Lauren shiver from the corner of your eye, and Sarah smile sweetly to her before turning back to you. “But now you have me curious, so...” She folds her fingers in her lap. “Why is my uncles apprentice/my ally interested in this event? You surely don\'t just want to mingle with the press there.”',
						"Sarah"
					);
				} else if (sType == "asksarahconference2") {
					addLinkToPlace(md, 'tell her about Gabby\'s plans', Place, 'type=asksarahconference3',
						'You lay out what you have seen with as little graphical detail as possible, telling Sarah about the necklace, Gabby\'s attempts to hypnotize your mother and about your plan to isolate Gabby at the event and get the necklace.</p>' +
						'<p>“Your mothers assistant is quite the wicked little woman, it seems.” Sarah chuckles. “Alright, I will gladly take you with me to the event, but I want to be there when you use the spell.”',
						"Sarah"
					);
				} else if (sType == "asksarahconference3") {
					addLinkToPlaceC(md, '"The Spell?"', Place, 'type=asksarahconference4',
						'“The Dai chu, you do intend to use it to turn that naughty little hypnotist into your personal slut, right?”</p>' +
						'<p>You did not expect Sarah to be that direct about it, and your surprise must have been written on your face.</p>' +
						(checkPersonFlag("Sarah", 9) ? '“You have attempted to use it on me, remember? Don\'t worry, I don\'t blame you for trying, but I certainly want to see what happens when the spell works.”' : '') +
						(isCharmedPath() ? '“You are the first apprentice my uncle took on in decades, you can\'t blame me for taking an interest in you.” Sarah smiles. “Don\'t worry, I don\'t tattle. Uncle Ronnie may believe that magic is meant to help and defend, and I agree, but why shouldn\'t we amuse ourselves on occasion?”' :
												 '“I believe that you are well aware by now, that I have taken a keen interest in my ally\'s exploits.” Sarah explains nonchalantly. “And of all the spells you know, this one interests me the most, for obvious reasons.”'),
						"Sarah"
					);
				} else if (sType == "asksarahconference4") {
					addLinkToPlaceC(md, '"So, you do me a favor if I do you a favor?"', Place, '',
						'“Exactly. It is a simple exchange of gifts, and you will find that those trades are very important within the supernatural community, is it not so, Lauren?”</p>' +
						'<p>You don\'t know why Sarah defers to her maid for this question, or why Lauren seems to shift uncomfortably before answering. “It is as my Lady says. The exchange of gifts and favors is taken very seriously. It makes and breaks  alliances, and accepting or handing out favors without offering or taking anything in return can lead to... unfortunate situations.”</p>' +
						'<p>“It may seem egoistic to you, but I will not be able to assist you without a favor in return, so what do you say?”',
						"Sarah",
						"setPersonFlag('Gabby',11)"
					);				
				}
				if (this.checkFlag(11) && !this.checkFlag(12)) {
					startAlternatives(md);
					addLinkToPlace(md, 'You don\'t mind her watching, but no interference', Place, '',
						'“Of course not.” Sarah looks positively giddy with excitement. “I promise to not speak or interfere until the spell has finished claiming the woman. You have my word.”',
						"Sarah",
						"setPersonFlag('Gabby',12)"
					);	
					addLinkToPlace(md, 'No deal, you prefer to do this alone', Place, '',
						'“This is unfortunate.” Sarah\'s breathes out a disappointed sigh. “But my offer stands, I will be here in case you change your mind.”',
						"Sarah"
					);
					endAlternatives(md);
				}
				if (this.checkFlag(12)) {
					if (sType === "" && !this.checkFlag(10)) {
						addLinkToPlace(md, 'ask if Sarah knows anything about that necklace', Place, 'type=asksarahconference5',
							'“Yes, I have been thinking about it as well, and I may know how to overcome it.” Sarah motions for Lauren to fetch a book. “Magic trinkets were part of my early training... before uncle Ronnie decided I was not ready.” There is some bitterness in Sarah\'s voice as she flips through the pages. “The Warlock Kurndorf granted his most loyal followers various trinkets to spread his influence. Bracelets, necklaces, staffs and rods... all of them strong enough to influence the normal populace, but never as strong as that they could become a threat to himself.” She turns the book around and points to a drawing of a familiar looking piece of jewelry.</p>' +
							'<p>“If I am right, your little hypnotist is using a basic psychomancy charm, not quite mind control, but it works on similar principles to the Dai Chu.”',
							"Sarah"
						);
					} else if (sType === "asksarahconference5") {
						addLinkToPlaceC(md, '"How exactly does it work?"', Place, 'type=asksarahconference6',
							'“An “idea” is placed in the minds of those affected by it, usually that the wearer is trustworthy and likable, leading people to be at ease and dropping their guard around them, possibly even making them think twice about attacking. There are limitations, though.”</p>' +
							'<p>“Eye contact with the trinket needs to be established, the longer the better, and the effects are easily shaken off once you know about them. It won\'t enthrall anyone just by being worn, but it likely helped this woman to convince your mother to allow herself be hypnotized.”',
							"Sarah"
						);
					} else if (sType === "asksarahconference6") {
						addLinkToPlaceC(md, '"Are there any defenses?"', Place, 'type=asksarahconference7',
							'“Usually not. Some who fought those wielding these trinkets reported a strong feeling of unease, as if they are about to make a grave mistake by attacking, but it can apparently be easily overcome if ones conviction is strong enough.”',
							"Sarah"
						);
					} else if (sType === "asksarahconference7") {
						addLinkToPlaceC(md, '"Anything else?"', Place, 'type=asksarahconference8',
							'“No, for all I care, we may begin preparations.” Sarah smiles mischievously. ”I invite you to stay here until we are ready to leave, and I am sure we will find a nice suit/dress to make you presentable at the event.”</p>' +
							'<p>“If there is anything left you feel you need to do, remember to be here before <b>6:00 PM ' + (this.checkFlag(23) ? 'today' : 'tomorrow') + '</b>. I will not be able to delay my departure.”',
							"Sarah",
							"GabbyGotInformation()"
						);
					} else if (sType == "asksarahconference8") {
						startAlternatives(md);
						addQuestionR(md, 'leave for now',
							'“Very well, Lauren shall make sure the door is open for you during the day. Just be here in time.”',
							"Mayor",
							"setQueryParams()"
						);
					}
					if (this.checkFlag(23)) {
						if (sType === "" || sType == "asksarahconference8") {
							addPopupLinkToPlaceC(md, 'wait with Sarah and get ready', 110, 'type=waitconfsarah2', "Waiting for the Conference",
								'<img src="Images/Items/' + (perYou.isBornMale() ? 'suit' : 'dress') + '.jpg" style="width:25%;float:left;margin-right:5px" alt="Dress">' +
								'You spend the rest of the day getting ready with Sarah, who takes great pleasure in making sure you “look the part” by picking out a ' + (perYou.isBornMale() ? 'suit' : 'dress') + ' from her surprisingly big collection.</p>' +
								'<p>Time flies by as you go over the plan again, you will pose as a servant who is filling in for Lauren, which should give you enough freedom to move around in Sarah\'s name.</p>' +
								'<p>When the time of the interview comes, Sarah will take you with her, but you\'ll probably have to hurry, as Gabby will most likely recognize you.'
							);
							if (sType == "asksarahconference8") endAlternatives(md);
						}			
					}
				}
			}
		}
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 452 && this.isHere()) {
			if (this.getCharmedLevel() == 2) {
				md.write(
					'<p>Gabby eyes you as walk into the room, she tries to look unimpressed, but you can see her pressing her tights together uncomfortably.</p>' +
					'<p>"Oh, it\'s you... are you here to gloat or here to fuck?"</p>'
				);
			} else if (this.getCharmedLevel() == 4) {
				md.write(
					'<p>Gabby always looks like she barely tolerates your presence.</p>' +
					'<p>She usually doesn\'t ask for you to play with her unless it has been a few days since your last visit, but her eyes follow you intently, and she is clearly hoping you\'ll take the first step.</p>'
				);			
			} else if (this.getCharmedLevel() == 1) {
				md.write(
					'<p>Gabby doesn\'t like you being in her home, but she won\'t chase you out, either.</p>'
				);				
			}
		}
		if (Place == 415 && sType === "" && !perYou.checkFlag(12) && !this.checkFlag(1) && !isArrestPossible()) {
			md.write(
				'<p>You notice through the door to Gabby\'s small office there is a large book on her desk. What attracted your attention is that it is a book about hypnosis, and that Gabby is wearing a new spiral pendant, the stereotypical symbol of the hypnotist. You would guess she is interested in hypnotherapy, or in performing on stage...</p>'
			);
		}
	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		if (sType != "gabbyhousestudy10" && (sType.indexOf("gabbyhousestudy") != -1 || sType.indexOf("vamphelpgabby") != -1)) {
			addComments("You are unable to move, you cannot cast spells or use any items");
			return "handled";
		}
		
		// Using/Examining the Silver Ring
		if (no == 32) {
			if (cmd == 1) {
				// Examine the Silver Ring
				if (sType.indexOf("conferencetalkjulie") != -1) {
					noeffectSilverRing();
					return "handled";
				}
			}
			return '';
		}
		
		// Casting the clairvoyance spell
		if (no == 15 && cmd == 2) {

			if (Place == 412 && sType == "meetgabby")
			{
				// Initial meeting
				if (CastClairvoyanceSpell()) {
					addComments('The spell reveals there is something magical about her necklace');
					return "handled";
				}
			}
			return '';
		}

		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// Mom/Gabby hypno scene
			if (Place == 412 && sType == "meetgabby") {
				addComments(
					"You whisper the words and begin to cast the spell but something... is not right. A strange feeling of dread washes over you, as if it would be a really bad idea to use that spell now...</p>" +
					"<p>Maybe Gabby has some sort of protection in place? You can't risk it, better learn more about her and the necklace, first."
				);
				return "handled";
			}
			if ((Place == 97 || Place == 98) && sType.indexOf("conference") != -1) {
				if (sType == "conferencegabby") CastCharmSpell("Gabby", Place, 4, 'type=conferencecharm1');
				else addComments("You are in a room full of Reporters and Camera Teams, better not risk it.");
				return "handled";
			}
			if (Place == 453 && sType == "gabbyhousestudy10") {
				CastCharmSpell("Gabby", Place, 4, 'type=studycharm1');
				return "handled";
			}	
			if (Place == 452 && this.isHere() && this.isCharmedBy() && sType == "") {
				CastCharmSpell("Gabby", Place, 4, '', '', 'type=gabbyrecharm1');
				return "handled";
			}	
		}

		return "";		// do nothing
	};
}
