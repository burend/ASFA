/****************************************************************
	Mayor Thomas
****************************************************************/
function RepliesMayorThomas(nR)
{
	var perMT = per;
	var bCharm = perMT.isCharmedBy();
	var myName = perMT.getYourNameFor();
	var perK = findPerson("OfficerKhan");

	if (nR == 100) //ask about the security guard
	{
		setPersonFlag("Gina", 2);	// Know her name
		addComments('"Quite a lot of people have complained about the security at the museum. We only have a small museum but some of the exhibits are very valuable, particularly those in the asian and eqyptology sections. The guard Gina James is very skilled and I completely trust her." recites the Mayor, sounding like she is repeating a press-release.');
	}
	else if (nR == 81000) // t8 = Letter from Davy to Beasley - Evidence on Beasley for murder
	{
		addComments('<p>"You found some evidence on Beasley," cries the mayor. "Congratulations, and thank you for your help ' + myName + '."</p>');
		perYourBody.DropItem(8, 1000);  // Remove it from Game...  Also able to check to see if this event has happened
	}
	else if (nR == 6104) //v61 == 4 Means Tina Robbins can unCharm People
	{
		perMT.place = 176; // Put the Mayor at the Robbins Residence
		addComments('<p>"Good idea ' + myName + '. Mr. Beasley is probably there right now and I could question him about the book.  Besides, I would love to see Davy very much," she says, suddenly very distracted for obvious reasons.</p><p>She escorts you out of her office and then leaves Town Hall, heading for the Robbin\'s house.</p>');
		Place = 95;
	}
	else if (nR == 5310) //v53 = Officer Khan Investigation Path
	{
		if (perK.other < 10)
		{
			perK.other = 10;
			AddCash(20);
			if (perMT.other < 5) perMT.other = 5;	//Only advance if she is still under Davy's Control
			if (!bCharm) {
				//NOT CHARMED
				addComments('<p>"Oh, so you want to help. Well, we suspect that a teacher from your school, Mr. Beasley stole an ancient book. If you find Mr. Beasley or the book then come back here immediately. Don\'t trust anyone else. Tell me where we can find the suspect or bring me the book. Here is ' + sCurrency + '20 to help you along the way."');
			} else {
				addComments('<p>"You want to help out ' + myName + '? Of course, anything you wish. The police suspect that a teacher from your school, Mr. Beasley stole an ancient book.  But please be careful ' + myName + ', I don\'t know what I would do if you were to get hurt.  Oh! Here, take this ' + sCurrency + '20 to help you along the way."');
			}

		}
	}
	else if (nR == 1603)  //v16 = Mayor Normal Path
	{
		perMT.other = 4;
		if (isMurderPath())  {
			// Sir Ronald DEAD
			addComments('"Nice meeting you, I\'m sure, but I have important business to get to. An important citizen was murdered this afternoon and an object of great value was stolen. So if you have business with me, please be brief."');
		}	else {
			//  Sir Ronald Apprentice Path
			addComments("Nice meeting you, I\'m sure.  I apologize for being blunt, but I am in the middle of something.  Was there an issue you wanted to discuss?");
		}
	}
	else if (nR == 1601)
	{
		perMT.other = 10; // Set to have apologized -- Can no longer Un-Charm her w/ Tina
		addComments('"That is disappointing. Well goodbye, and don\'t bother coming back here unless you have something worth my attention."');
	}
	else if (nR == 1602)
	{
		addComments('<p>"You have it?  How did you... Never mind, I don\'t want to know.  All I care about is getting that book back to its rightful owner. Do you have it on you now?" she asks, a little too eagerly.  "Just give it to me and this whole episode can be forgotten about."</p>');
		perMT.other += 1;  // sets v16 to either 6 or 11.
	}
	else if (nR == 1606) // don't have the book ON me at the moment.
	{
		perMT.setFlag(6);
		addComments('A flash of anger crosses her face for an instant, but is quickly replaced with a caring smile.  "That\'s okay, ' + myName + '.  Just bring it to me and I\'ll take care of everything else.  Perhaps even a reward for finding it!"');
	}
	else if (nR == 16999) // Have the book w/ me.
	{
		perMT.setFlag(6);
		addComments('"Yes, this is it!  Davy will be so pleased with me, maybe even fuck me again!"');
		Place = 991;
	}
	else if (nR == 1650)
	{
		bChat = false;
		addComments(perMT.addPersonFace());
		perMT.place = 110;  // Puts the Mayor back in her office
		if (!bCharm)
		{
			addComments('"Yes...  Yes.  I should get back to work." She says turning slowly to leave and obviously still quite confused.');
		}
		else
		{
			addComments('<p>"Yes.  Yes ' + myName + '. I will meet you at my office. Visit me soon... please?" She says longingly. She redresses and leaves the house with a passionate glance.</p>');
		}
		Place = 176;
	}
	else if (nR == 13400) //CLOSING the Museum
	{
		perMT.place = 1000; // Put the Mayor OUT OF HER OFFICE
		movePerson("Gina", 302); // Put Museum Guard Gina @ Home
		setPlaceFlag("Museum", 8);	// CLOSE The Museum
		startTimedEvent("ReturnMayor();", 12);

		if (getPersonOther("MrsGranger") === 5) setPersonOther("MrsGranger", 4); //Put her back at home ready to be sent back to the Museum
		if (wherePerson("MrsGranger") === 1) movePerson("MrsGranger", 177);  //Put Mrs Granger physically AT home

		if (!isPlaceKnown("GinasHouse") && whereItem(42) != 304) PlaceI(42, 304); //Put Gina's address in the Security Office if not already known
		Place = 95; // Put you back in the reception area (The Mayor is no longer there)
		addComments('"Yes, of course, ' + myName + '.  I will go do that immediately!" says the Mayor, overexcited to finally have some way of serving her ' + myName + '... Other than the obvious method, of course.');
	}
	else if (nR == 13401) //Opening the Museum
	{
		perMT.place = 1000; // Put the Mayor OUT OF HER OFFICE
		startTimedEvent("ReturnMayor();", 12);
		movePerson("Gina", 0); // Put Museum Guard Gina BACK at the MUSEUM
		setPlaceFlag("Museum", 8, false);	// OPEN The Museum
		Place = 95; // Put you back in the reception area (The Mayor is no longer there)
		addComments('"Anything for you ' + myName + '.  I will go re-open the Museum myself!" says the Mayor, jumping into action at your command.');
	}
	else if (nR == 44201) //Opening the Old Basement
	{
		setPlaceFlag("Hospital", 4);	// Give key to the old basement
		addComments('"Yes, of course, here is a key to the basement" says the Mayor, as she takes a key from her desk drawer.');
	}
	else if (nR == 44202) //Opening the Construction Site
	{
		setPlaceFlag("Park", 5);	// Give key to the old basement
		addComments('"Yes, of course, just a moment", she calls Angela in and asks her to get a spare key from John\'s office. A little later Angela returns and gives a key to you.');
	}
	else if (nR == 9900) {
		// Emily now at the town hall
		movePerson("Emily", 99);
		addComments(
			'“Welcome ' + perYou.getMaster() + ', I called you here because I wanted you to know I followed up on your instruction to get you fresh recruits.”' +
			'“That\'s good,” you reply “So what have you got for me?”' +
			'“Well I\'ve hired a new head of Human Resources, her name is Emily Primrose. If you charm her then it will make the process of hiring new recruits for you to enslave much easier!” The Mayor gives you a big satisfied smile “I can set up a meeting with her telling to expect a new intern.”'
		);
	}

	return true;
}

function ReturnMayor()
{
	findPerson("Mayor");
	if (per.place >= 1000) per.place = 110;
}

// Initialise
function initialiseMayorThomas()
{
	// Mayor Thomas
	addPerson("Mayor", 0, "Mayor");
	per.Replies = RepliesMayorThomas;
	
	per.getPersonName = function(full) { return full !== true && this.isCharmedBy("You") ? "Mayor Thomas, your Slave" : "Mayor Thomas"; };
	per.getPersonAddress = function() { return checkPlaceFlag("ShoppingCenter", 6) ? 'Penthouse, Haven Apartments' : ''; };
		
	per.getPossessionFace = function() { return "mayor6a"; };

	per.isPersonInfo = function() { return this.isCharmedBy("You"); };
	per.getPersonInfo = function() {
		var s = this.addPersonString((this.isCharmedBy() ? "mayor6" : "mayor1") + ".jpg", "height:max%", "right");
		if (isMurderPath()) {
			// On Murder Path
			return s + "Now that you’ve learned she was under Davy’s control you finally understand why she acted so weird. After you freed her, you knew the wisest thing to do is to turn her onto your side. You realized that she could be a valuable asset to your future plans.</p>" +
				"<p>So, now you are the happy owner of the pretty leader of the town. She told you between two orgasms that she wants to order and boss people around in your name and would gladly be your puppet mayor while you rule over the town. It’s a dream of hers that you can actually fulfill.</p>" +
				"<p>You visit her evey once in a while in person, but she keeps in touch with you through the phone or computer. She keeps you up to date on anything important worth mentioning.";
		} else {
			return s + "You are the happy owner of the pretty leader of the town. She told you between two orgasms that she wants to order and boss people around in your name and would gladly be your puppet mayor while you rule over the town. As a slave of yours, she regularly looses her head and becomes nervous on the smallest matters. That’s her overachieving personality trying to please you. It’s the spell that made her this madly loyal. You know if you ever would ask her something she would gladly carry out those orders with ruthless precision.</p>" +
				"<p>She keeps you up to date on anything important worth mentioning through phone or the computer, so you don’t miss anything.</p>";
		}
	};
	
	per.whereNow = function() {
		if (Place == 110 || (this.place === 0 || this.place == 110)) return isShopOpen(0) ? this.place : 473;
		return this.place;
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 473 && this.isHere() && sType === "") return this.showPerson("mayor-home.jpg", '', '', '', '', false, "string");
		return '';
	};
	
	per.passTimeDay = function() {
		if (this.other > 0 && this.other < 3) this.other = 3;
		return '';
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		switch(Place) {
		case 95:
			if (this.checkFlag(5) && !this.checkFlag(7) && this.sCharmedBy == "You" && isCharmedBy("Angela") && isCharmedBy("OfficerBatton") && isCharmedBy("Emily")) {
				// Conversation with male player
				findPerson("Emily");
				if (per.hoursCharmed() > 48) {
					findPerson("Angela");
					showPopupWindow( "Mayor Beatrice Thomas",
						this.addPersonString("law.jpg", "height:max%", "right") +
						"You see Mayor Thomas and Angela in deep conversation when you arrive, and they both start to strip for you without your even asking. Mayor Thomas is excited and tells you,<br>" +
						'"' + perYou.getMaster() + ' we have been talking, now that Elily is with us you control the Town Hall. ' + getPoliceChief() + ' Batton is already on side so we were discussing how you could use this <b>control"</b>.</p>' +
						'"Sir! Everything\'s fine. Although I noticed that Angela is under your influence too, I\'ve seen her cute eyes have a purple glow.", she says normally. You grab her and play with a lock of her brown hair.<br><br>' +
						'<p>You take her to mean other than how you have been using them as such, and ask her to explain more, "Of course ' + perYou.getMaster() + ', we can start shaping the town itself to meet your interests. We can alter local laws and ordinances. We can have the police stop enforcing some laws."</p>' +
						'<p>You are not quite sure the sort of things she is talking about, but this is the sort of power and control the mayor of Glenvale would think of. You ask her for some suggestions. Angela suggests,</p>' + 
						'<p>"My love, we...Mayor Thomas...could repeal the laws against public nudity allowing us and your other women to display themselves for your pleasure whereever we are"<p>' +
						'<p>Mayor Thomas then says, "More significant things we weould have to be discrete, we do not want to attract national attention. So we could not legalise incest for example, we could make it so ' + getPoliceChief() + ' Batton never enforeces those laws. Unfortunately there are limits here, for now!"<p>' +
						'<p>That last bit seems to indicate Mayor Thomas has as desire to expand your power, and hers and you will have to take care to keep her restrained, at leat \'for now\'.',
						"setPersonFlag('Mayor',7)"
					);
					return true;
				}
			}
			break;

		case 110:
			if (!this.checkFlag(1)) {
				// Introduction for Mayor Thomas
				this.setFlag(1);
				if (isMurderPath()) {
					showPopupWindow("Mayor Beatrice Thomas",
						this.addPersonString("mayor1.jpg", "height:max%", "right") +
						"You have heard a lot about Beatrice Thomas, the mayor of the town, but this is the first time you have seen her in flesh, but you know your mother has regularly worked out at the gym with her. She used to be a lawyer before she ran for the mayors office. Some people say she cheated on her campaign by using a large sum of money from an unknown backer. She used the money to repair the hospital and improve the health-care, but also to reinforce herself as the perfect candidate for the job.<br><br>" +
						"She’s only been mayor for 3 months, but the townsfolk already gossip about her being rude and cold to her workers and neglecting her work.<br><br>" +
						"As you stand in her well decorated office, you feel that something is not right. She looks gorgeous, but her grim face tells you that she doesn’t like visitors. Especially the likes of you."
					);
				} else {
					showPopupWindow("Mayor Beatrice Thomas",
						this.addPersonString("mayor1.jpg", "height:max%", "right") +
						"You know that Beatrice Thomas, the current mayor was a lawyer before she made it into politics. She used to visit the local gym where your Mom worked out too so you've seen her sometimes. She always looked so organized and well dressed, but she did not speak much and had that distant attitude.<br><br>" +
						"She has been the mayor for 3 months now, but her reputation as a lady with iron will had not changed much. She gets and does what she wants, and nobody would dare talk back to her.<br><br>" +
						"As you stand in her well decorated office, her cool eyes watching you, you feel little around her. She lazily juggling a pencil between her hands and doesn’t seem to be happy that you disturbed her work."
					);
				}
				return true;
			} else if (this.checkFlag(3) && !this.checkFlag(2) && this.sCharmedBy == "You" && isCharmedBy("Angela")) {
				if (perYou.isBornMale()) {
					// Conversation with male player
					showPopupWindow( "Mayor Beatrice Thomas",
						this.addPersonString("mayor6.jpg", "height:max%", "right") +
						"You make a quick glance at Angela while you rush through the reception to the mayor’s office , she instantly smiles and waves you back, happly acknowledges you as the boss around here. You don’t even have to close the door anymore. You can freely visit Beatrice Thomas, no one is going to question you anymore here.<br><br>" +
						'" How\'s my little mayor slut\'s doing?", you ask casually. Ms. Thomas stands up and greets you with full attention.<br><br>' +
						'"Sir! Everything\'s fine. Although I noticed that Angela is under your influence too, I\'ve seen her cute eyes have a purple glow.", she says normally. You grab her and play with a lock of her brown hair.<br><br>' +
						'"Does that bother you?", you ask in a little more menacing tone.<br><br>' +
						'"Not at all Sir, you can have anyone you want and I\'ll still remain the jolliest mayor in all over the world, because what makes you happy that makes me happy too. Plus Angela is a good help and together we can serve you better.", she whispers into your ear and touches your bulging erection. You let go of her hair.<br><br>' +
						'"When you\'re not here ' + perYou.getPersonName() + ', we always talk about you! We chat about how busy, how important, how powerful you are. And we will be there, at your side when you conquer the whole town!"<br><br>' +
						"You sit back to the chair after you give her a long kiss. She doesn\'t care about the mess you made to her dress. Why should she?! This place is your domain and you can do whatever you want!",
						"setPersonFlag('Mayor',2)"
					);
					return true;
				} else {
					// Conversation with female player
					showPopupWindow("Mayor Beatrice Thomas",
						this.addPersonString("mayor6b.jpg", "height:max%", "right") +
						"You make a quick glance at Angela while you rush through the reception to the mayor’s office , she instantly smiles and waves you back, happly acknowledges you as the boss around here. You don’t even have to close the door anymore. You can freely visit Beatrice Thomas, no one is going to question you anymore here.<br><br>" +
						'"How\'s my little mayor slut\'s doing?", you ask casually. Ms. Thomas stands up and greets you with full attention.<br><br>' +
						'"Ma\'am! Everything\'s fine. Although I noticed that Angela is under your influence too, I’ve seen her cute eyes have a purple glow.", she says normally. You grab her and push your hand through her panty down to her pussy. She does the same to you and with her free hand and starts to pinch your nipple.<br><br>' +
						'"Does that bother you?", you ask in a little more menacing tone.<br><br>' +
						'" Not at all Ma\'am, you can have anyone you want and I\'ll still remain the jolliest mayor in all over the world, because what makes you happy that makes me happy too. Plus Angela is a good help and together we can serve you better.", she whispers into your ear. You stop touching her and push her away gently.<br><br>' +
						'"When you\'re not here ' + perYou.getPersonName() + ', we always talk about you! We chat about how busy, how important, how powerful you are. And we will be there, at your side when you conquer the whole town!"<br><br>' +
						"You sit back to the chair after you give her a long kiss. She doesn\'t care about the mess you made to her dress. Why should she?! This place is your domain and you can do whatever you want!",
						"setPersonFlag('Mayor',2)"
					);
					return true;
				}
			}
			break;

			case 239: ReturnMayor(); break;
		}
		return false;
	};

	per.showEvent = function()
	{
		if (Place == 269 && sType == "mayorpool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("mayor-pool.jpg");
			addPlaceTitle(md, "Swimming with Beatrice");
			md.write(
				'<p>Mayor Thomas arrives and changes into an orange bikini, and when she come out she ask that for now to please call her by her given name, Beatrice. You see no reason to refuse and agree, and she happily goes for a swim with you.</p>' +
				'<p>After Beatrice looks around at the almost empty pool and looks at you suggestively?</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=mayorpoolsex');
			addLinkToPlaceC(md, 'say goodbye to Beatrice', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "mayorpoolsex") {
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson("mayor-pool-sex.jpg");
			addPlaceTitle(md, "More Than Swimming With Beatrice");
			md.write(
				'<p>You accept her advances, and she pulls off most of her bikini ready for you to take her!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Beatrice', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 473 || Place == 110) {
			var bOffice = Place == 110;
			
			if (sType == "bj") {
				// Blowjob/lick
				if (perYou.isMaleSex()) {
					if (isExplicit()) {
						md = WritePlaceHeader();
						this.showPersonRandomX("mayor11b", bOffice ? 4 : 3, "height:max", '', '', '', bOffice ? 0 : 1);
					} else {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPerson("mayor11b.jpg");
					}
					addPlaceTitle(md, "Meeting the Mayor\s Mouth");
					md.write(
						'<p>Like a skilled porn star, she treasures your cock like it’s the Holy Grail. Her head bobbing up and down, left and right. Miss Thomas is trying to keep up with tempo you dictate, but ultimately she exhausts herself. You let your load all over her face and body, some of it will definitely stuck in her hair, but she doesn’t mind. Miss Thomas, the head of Glenvale is just like the rest of your slaves; she lets out a tired sigh and collapses between your feet. To your surprise, she starts to kiss them and after a few seconds she is back on sucking your cock again. Looks like she is ready for round two! You thrust your manhood into her mouth to the point when she gags a little. It seems she a bit more experienced than you thought so. Your remaining cum lands again on her face and she joyfully licks her mouth.</p>'
					);

				} else {
					md = WritePlaceHeader(false, bOffice || !isExplicit() ? 'td-left-med' : '');
					if (bOffice || !isExplicit()) this.showPerson("mayor11g.jpg");
					else this.showPersonRandomX("mayor-home-sex-g", 2);
					addPlaceTitle(md, "Meeting the Mayor\s Mouth");
					md.write(
						'<p>Miss Thomas swirls her tongue like she has been doing it for years, but that’s not exactly the case. After you tell her on how you want to be „amused” today, she hops off from the desk and kneels before your chair. You open your legs and grab her head and toss her between your laps. She unzips your skirt and lowers herself to your treasured vagina. She treats it and you like you are a royalty, her tongue moving up and down. At one point she switches her focus to your other hole. She licks it perfectly clean and when she finishes, she stands up and swallows the juice left on her fingers. You zip back your skirt while she returns to her desk, resting a bit after the fun.</p>'
					);
				}
				addLinkToPlace(md, 'talk to the Mayor', Place);
				if (bOffice) addLinkToPlace(md, 'go to the reception', 95);
				else addLinkToPlace(md, 'exit the apartment', 471);
				WritePlaceFooter(md);
				return true;

			} else if (sType == "fuck") {
				// fuck her
				if (perYou.isMaleSex()) {
					if (isExplicit()) {
						md = WritePlaceHeader();
						if (!bOffice) this.showPersonRandomX("mayor-home-fuck-b", 2);
						else this.showPersonRandomX("mayor10b", 3);
					} else {
						md = WritePlaceHeader(false, 'td-left-med');
						if (bOffice) this.showPerson("mayor10b.jpg");
						else this.showPerson("mayor-home-sex.jpg");
					}
					addPlaceTitle(md, "Meeting the Mayor\s Pussy");
					md.write(
						'<p>You grab one of her shoulders and spin her around. Miss Thomas understands your needs and bends over, half of her body is on the desk. You ready to pound her ass, but at the last minute, you turn your attention and dick to her other hole. You put your penis right into her asshole and you push it right until your slave squeals with pain and joy. The act keeps going for ten-fifteen minutes, during this time she never changes her position. Her asshole becomes wider with each push, soon she no longer feels pain only just pleasure. She puts both hands on her asscheeks, trying to rip them apart so you can enjoy the experience better. Your personal plaything even blows you at the end, swallowing your spunk like her life’s depending on it. Miss Thomas tells you she will not wash herself tonight and will dream of you and this glorious sex you just gave her.</p>'
					);

				} else {
					if (perYou.FindItem(45) > 0) {
						// Strap-on fuck
						md = WritePlaceHeader();
						this.showPersonX("mayor-home-fuck-g.jpg");							
					} else if (bOffice || !isExplicit()) {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPersonRorX("mayor10g.jpg");
					} else {
						md = WritePlaceHeader();
						this.showPersonRandomX("mayor-home-sex-g", 2);						
					}
					addPlaceTitle(md, "Meeting the Mayor\s Body");
					md.write(
						'<p>Just by looking at you, Miss Thomas knows what you want. She grabs a long, black dildo from one drawers and puts it in her mouth to make it wet. All the while you grab her waist and pull her down to floor level. You join your slave, who, after wetting the dildo, puts it into where it belongs, her pussy. The other side of the dildo’s just waiting for you. You squat and push the toy’s end into your own vagina. With the aid of Miss Thomas, you quickly reach your climax and your slave waits for you to recover from the shivers it gave. After both of you are finished, she licks the remaining pussy juice stuck on the dildo. She says she will keep it that way, unwashed, so the smell will always remind her of you.</p>'
					);
				}
				addLinkToPlace(md, 'talk to the Mayor', Place);
				if (bOffice) addLinkToPlace(md, 'go to the reception', 95);
				else addLinkToPlace(md, 'exit the apartment', 471);
				WritePlaceFooter(md);
				return true;
				
			} else if (sType == "threesomeangela") {
				// threesome with Angela
				var perAngela = findPerson("Angela");
				var myNameA = perAngela.getCharmedLevel() == 4 ? perYou.getMaster() : "my Love";
				if (perYou.isMaleSex()) {
					if (isExplicit()) {
						var rnd = Math.random() < 0.5;
						md = WritePlaceHeader(false, rnd ? 'td-left-med' : '');
						this.showPersonX(rnd ? "mayorangelayou-bb.jpg" : "mayorangelayou-ba.jpg");
					} else {
						md = WritePlaceHeader();
						this.showPerson("mayorangelayou-b.jpg");
					}
				} else {
					md = WritePlaceHeader(false, 'td-left-med');
					this.showPersonRorX("mayorangelayou-g.jpg");
				}
				addPlaceTitle(md, "Meeting the Mayor and Angela");
				md.write(
					'<p>Mayor Thomas uses the intercom on her desk and calls Angels "Came in here Angela,", then to you, "Well she will after you do, and I do!".</p>' +
					'<p>A moment later Angela enters into the room, looking at you and asks, "How can I help you ' + myNameA + '?" assuming correctly you were the actual person summoning her.</p>' +
					'<p>Mayor Thomas tells her "You will attend to ' + perYou.getMaster() + ' and myself, and pleasure us as much as we want". You allow her this little bit of dominance over Angela, it is likely this is how things are developing here in the office since both were charmed and their sexual desired heightened. Besides it is arousing, but you do want to exert some control here,</p>' +
					'<p>"Yes Angela, you will please <b>me</b> and also Miss Thomas", showing your position and that the Mayor is another slave.</p>' +
					'<p>Angela does her best to please the both of you, and Miss Thomas assists in pleasuring you. Miss Thomas orders Angela around and tries to make it that you are fucking her, and Angela is helping. For now you allow her this little game.</p>'
				);
				addLinkToPlace(md, 'talk to the Mayor', 110);
				addLinkToPlace(md, 'go to the reception', 95);
				WritePlaceFooter(md);
				return true;
				
			} else if (sType == "threesomediane") {
				// threesome with Diane
				if (!isExplicit()) {
					md = WritePlaceHeader();
					this.showPersonRandom("mayordiane", 2);					
				} else {
					md = WritePlaceHeader(false, 'td-left-med');
					if (perYou.isMaleSex()) this.showPersonX("mayordiane-b.jpg");
					else this.showPersonX("mayordiane-g.jpg");
				}
				addPlaceTitle(md, "The Mayor with Diane");
				md.write(
					'<p>You give your lovely lawyer a call and ask her to come upstairs from her apartment and join the Mayor and yourself. A few minutes later she arrives, you now have the two leaders of the town, law enforcement and the civil authority, ready for your pleasure.</p>' +
					'<p>You feel a rush as you look down at the two authorities of the town ' + (perYou.isMaleSex() ? 'servicing your cock' : 'licking your pussy and breasts') + ', it is such a orgasmic feeling of control and power!</p>' +
					'<p>Afterwards you have to convince yourself to restrain these sort of thoughts and feelings, this is the way that led to the corruption and downfall of Kurndorf.</p>'
				);
				addLinkToPlace(md, 'talk to the Mayor', Place);
				addLinkToPlace(md, 'follow Diane to her apartment', 467);
				addLinkToPlace(md, 'exit the apartment', 471);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 110 || Place == 176) {
			if (sType == "charmmayor1") {
				// Charm Mayor Thomas 1
				md = WritePlaceHeader();

				if (Place == 176)	this.showPerson("mayor3.jpg");	// @ Robbins House
				else this.showPerson("mayor7.jpg");	// @ Mayor's Office

				if (wherePerson("MrsTanika") === 0) {
					movePerson("MrsTanika", 242);
					if (!isMurderPath()) movePerson("MsJones", 145);
				}

				addPlaceTitle(md, "Mayor Thomas Charmed");
				md.write(
					'<p>The spell immediately takes hold of the mayor, extracting her inhibitions before your eyes...</p>' +
					'<p>"Oh god!" she cries, pulling her shirt open. "I feel so fucking horny." She turns a suddenly predatory grin your way. "I bet that you have never had a woman like me before."</p>'
				);
				
				startQuestions();
				addLinkToPlace(md, "watch the spell take over", Place, 'type=charmmayor2');
				if (Place == 176) addLinkToPlace(md, "exit the house?", 43);
				else addLinkToPlace(md, "exit the town hall", 94);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmmayor2") {
				// Charm Mayor Thomas 2
				md = WritePlaceHeader();
				if (Place == 176) this.showPerson("mayor4.jpg");	// @ Robbins House
				else this.showPerson("mayor8.jpg");	 		// @ Mayor's Office

				addPlaceTitle(md, "Mayor Thomas Charmed");
				if (Place == 176) {
					// At the Robbins house
					md.write('<p>The Mayor\'s passion is amazing. Without hesitation she reaches into her handbag to pull out a blue dildo.  Her left hand slides down between her legs and she begins to enjoy herself.</p>');
				} else {
					// In her office
					md.write('<p>The Mayor\'s passion is amazing. Without hesitation she reaches into her desk to pull out a massive purple dildo.  Her left hand slides down between her legs and she begins to enjoy herself.</p>');
				}
				md.write('<p>"It has been sooo long," she moans as much to herself as to you. "Please. Please give me what you\'ve got. Uhhh."</p>');

				startQuestions();
				addLinkToPlaceC(md, 'talk more with the mayor', Place);
				if (Place == 176) {
					addQuestionC(md, 'order the mayor to return to her office', "Mayor", 1650);
					addLinkToPlace(md, "exit the house?", 43);
				} else {
					addLinkToPlace(md, "exit the town hall", 94);
				}
				WritePlaceFooter(md);
				return true;
			}			
		}
		
		// Trio event at the Town Hall
		if (Place != 110) {
			this.setFlag(6, false);
			return false;
		}
		
		if (sType == "askmore") {
			// Ask more of her, in her office
			md = WritePlaceHeader(false, "td-left-large");
			this.showPerson("mayor9.jpg");
			addPlaceTitle(md, this.getPersonName());

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Miss Thomas jumps up onto the table with a nasty, sex hungry smile. She knows what’s coming. It’s either you take her right where she is, the desk, or let her suck you off.</p>' +
					'<p>"Master, tell me how do you wish to be pleasured today? I want what you want. As always, it’s your call Master.”</p>'
				);
			} else {
				md.write(
					'<p>Miss Thomas jumps up onto the table with a rigorous roar and a nasty smile. She knows what will happen now. It’s either you make love to her or she is going to pleasure you, but one thing is sure; she is here to make sure you enjoy every second of it.</p>' +
					'<p>"My Mistress. Tell me how do you wish to be pleasured today? Maybe something regular like me licking your phenomenally sweet pussy or you want to make it special and fuck each other’s brains out? As always, it’s your call Mistress.”</p>'
				);
			}

			// Questions
			startQuestions();
			if (perYou.isMaleSex()) {
				addLinkToPlace(md, 'take her on her desk', Place, 'type=fuck');
				addLinkToPlace(md, 'take her mouth', Place, 'type=bj');
			} else {
				addLinkToPlace(md, 'ask her to lick you', Place, 'type=bj');
				addLinkToPlace(md, 'make love to her', Place, 'type=fuck');
			}
			if (isCharmedBy("Angela")) addLinkToPlace(md, 'have her call in Angela', Place, 'type=threesomeangela');
			addLinkToPlace(md, 'talk to the Mayor', Place);
			addLinkToPlace(md, 'go to the reception', 95);
			WritePlaceFooter(md);
			return true;
		}

		var perBatton = findPerson("OfficerBatton");
		var perKristin = findPerson("Kristin");
		var md;

		// Meeting stage 2
		if (sType == "trio2") {
			md = WritePlaceHeader();

			this.showPerson("trioeventmayor2.jpg");
			addPlaceTitle(md, "Improvement");
			md.write(
				'<p>Mayor Thomas replies, "Right to the point, I love you for it ' + perYou.getMaster() + '! The girls will update you on the things going around right now. Let me just serve you now, my one and only ' + perYou.getMaster() + '!"</p>' +
				'<p>' + getPoliceChief() + ' Kerry reports to you, "I’ve been learning a lot about occultism and wizardry lately. I wanted to be prepared ' + perYou.getMaster() + '!"</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Oh and what did you learn?"', 110, 'type=trio3');
			AddPeopleColumnLarge(md);
			md.write('<table><tr><td style="width:50%">');
			perKristin.showPerson("!trioeventkristin1.jpg", '99%');
			md.write('</td><td style="width:50%">');
			perBatton.showPerson("trioeventoffbatton1.jpg", '99%');
			md.write('</td></tr></table>');
			WritePlaceFooter(md);
			return true;
		}
		// Meeting stage 3
		if (sType == "trio3") {
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPerson("trioeventmayor3b.jpg");
			else this.showPersonRorX("trioeventmayor3g.jpg");
			addPlaceTitle(md, "Police Report");
			md.write(
				'<p>You ask Kerry, "Oh and what did you learn?", but before she answers you take up the Mayor\'s offer, and you lick the sweet juice coming from the brunette slut’s clit. ' + getPoliceChief() + ' Batton answers you while starting to remove her clothing,</p>' +
				'<p>"That the world is full wonderful things. Things I never even took seriously before you charmed me! For example; did you know that the witches of Eastwick were actually real. Or that there are actual witch and vampire hunter groups and they’ve been in war with vampires for centuries now..."</p>' +
				'<p>Glancing up you see she is watching you and Mayor Thomas lustfully. You also see Kristin is sitting and watch intently while playing with herself.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"You sure did your homework, Kerry!"', 110, 'type=trio4');
			AddPeopleColumnLarge(md);
			md.write('<table><tr><td style="width:50%">');
			perKristin.showPerson("!trioeventkristin2.jpg", '99%');
			md.write('</td><td style="width:50%">');
			perBatton.showPerson("trioeventoffbatton2.jpg", '99%');
			md.write('</td></tr></table>');
			WritePlaceFooter(md);
			return true;
		}
		// Meeting stage 4
		if (sType == "trio4") {
			md = WritePlaceHeader();

			this.showPersonRorX(perYou.isMaleSex() ? "trioeventmayor4b.jpg" : "trioeventmayor4g.jpg");
			addPlaceTitle(md, "Police Report");
			md.write(
				'<p>You praise your police slave, "You sure did your homework, Kerry!", meanwhile the mayor ' + (perYou.isMaleSex() ? 'smacks her lips around your boner' : 'sucks eagerly at your clit') + ' and starts doing what’s she is best at!</p>' +
				'<p>' + getPoliceChief() + ' Kerry replies, "Ohh, yes! This had to be done in order to protect you, ' + perYou.getMaster() + ', from danger, be it any kind of threat."</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"I see"', 110, 'type=trio5');
			AddPeopleColumnLarge(md);
			md.write('<table><tr><td style="width:50%">');
			perKristin.showPerson("!trioeventkristin3.jpg", '99%');
			md.write('</td><td style="width:50%">');
			perBatton.showPerson("trioeventoffbatton3.jpg", '99%');
			md.write('</td></tr></table>');
			WritePlaceFooter(md);
			return true;
		}
		// Meeting stage 5
		if (sType == "trio5") {
			md = WritePlaceHeader();

			this.showPersonRorX(perYou.isMaleSex() ? "trioeventmayor5b.jpg" : "trioeventmayor4g.jpg");
			addPlaceTitle(md, "Police Report");
			md.write(
				'<p>' + getPoliceChief() + ' Kerry answers you, "An another piece of important information I have to tell you is that during my research, I’ve read a lot about a renegade female witch group who were very active during the time of Kurndorf’s reign. They were allies with him, but they somehow dissapeared after the fall of the mighty warlock. The interesting part is that, there have been recent activities in the neighbouring town, Somerton, that shows signs that these witches are maybe back."</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Well, we can’t base anything on rumors..."', 110, 'type=trio6');
			AddPeopleColumnLarge(md);
			md.write('<table><tr><td style="width:50%">');
			perKristin.showPerson("!trioeventkristin4.jpg", '99%');
			md.write('</td><td style="width:50%">');
			perBatton.showPerson("trioeventoffbatton5.jpg", '99%');
			md.write('</td></tr></table>');
			WritePlaceFooter(md);
			return true;
		}
		// Meeting stage 6
		if (sType == "trio6") {
			md = WritePlaceHeader();

			this.showPersonRorX(perYou.isMaleSex() ? "trioeventmayor5b.jpg" : "trioeventmayor4g.jpg");
			addPlaceTitle(md, "Police Report");
			md.write(
				'<p>"Well, we can’t base anything on rumors...What did you have in mind, my dear officer?", you ask Kerry, but suddenly, Kristin, who was silent during the whole conversation starts to talk. She already disrobed herself and is frantically caresses her cleavage.</p>' +
				'<p>"' + perYou.getMaster() + '... I have a good reputation in Somerton, have some contacts there. I took the liberty to ask them for any information, news about these witch sightings. I had to be subtle and careful, so it takes time until I receive anything, but I’m on it."</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Thank you, Kerry...and Kristin."', 110, 'type=trio7');
			AddPeopleColumnLarge(md);
			md.write('<table><tr><td style="width:50%">');
			perKristin.showPerson("!trioeventkristin5.jpg", '99%');
			md.write('</td><td style="width:50%">');
			perBatton.showPerson("trioeventoffbatton5.jpg", '99%');
			md.write('</td></tr></table>');
			WritePlaceFooter(md);
			return true;
		}
		// Meeting stage 7
		if (sType == "trio7") {
			md = WritePlaceHeader();

			if (perYou.isMaleSex()) this.showPersonRorX("trioeventmayor6b.jpg");
			else this.showPerson("trioeventmayor6g.jpg");
			addPlaceTitle(md, "Police Report");
			md.write(
				'<p>"Thank you, Kerry...and Kristin. You’ve pleased me well today. If these reports are true, then we will have to defend Glenvale from these witch-bitches.", ' + (perYou.isMaleSex() ? 'you thrust even more' : 'you sigh from the delightful tongue of the mayor') + ', Miss Thomas savors every single second of it, moaning.</p>' +
				'<p>Kerry and Kristin in a unison: Yes ' + perYou.getMaster() + '!</p>' +
				'<p>You tell them, "It is crucial that you take this seriously, girls. Inform me with every tiny detail you come across!". Suddenly, the telephone rings. Kerry jumps up to answer it, but it’s just Angela asking for something irrelevant so the ' + getPoliceChief().toLowerCase() + ' hangs the phone.</p>' +
				'<p>Kristin replies, "Of course, ' + perYou.getMaster() + ', this is our life goal now. To serve."</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Fine, Miss Thomas. I’ve had my fun!"', 110, 'type=trio8');
			AddPeopleColumnLarge(md);
			md.write('<table><tr><td style="width:50%">');
			perKristin.showPerson("!trioeventkristin5.jpg", '99%');
			md.write('</td><td style="width:50%">');
			perBatton.showPerson("trioeventoffbatton6.jpg", '99%');
			md.write('</td></tr></table>');
			WritePlaceFooter(md);
			return true;
		}
		// Meeting stage 8 - Finished
		if (sType == "trio8") {
			md = WritePlaceHeader();


			this.setFlag(5);		// Meeting over
			AddCash(500);
			this.showPerson("trioeventmayor6g.jpg");
			perKristin.showPerson("!trioeventkristin6.jpg");
			perBatton.showPerson("trioeventoffbatton6.jpg", '50%');
			addPlaceTitle(md, "Police Report");
			md.write(
				'<p>"Fine, Miss Thomas. I’ve had my fun! Now let’s get dressed ladies, we’ve got work to do!", you slap your slave on the butt and let yourself off of her.</p>' +
				'<p>While the Mayor finishes herself and ' + getPoliceChief() + ' Batton lies exhausted on the desk, Kristin comes close to you, confidently stating the following,</p>' +
				'<p>"Here’s ' + sCurrency + '500, secured for you, in cash. Not traceable, all yours to spend. It’s not much, but it’s only just the taste of what’s to come for you Master. Have fun!"</p>' +
				'<p>Kristin hands you an envelope with 500 dollars to use as you wish. You leave the office first, followed by Kristin and Kerry. Ellie silently follows Kristin and the three of them leave the building.  Angela grins as she sees the joy on your face. It’s always amusing to visit the Mayor.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Thank you ladies I have to go"', 94);

			WritePlaceFooter(md);
			return true;
		}

		if (!this.checkFlag(5) && (checkPersonFlag("Ellie", 3) || checkPersonFlag("Angela", 10))) {
			// Trio Event Start in the Mayors Office
			md = WritePlaceHeader();
			var q1 = getQueryParam("q1");
			var q2 = getQueryParam("q2");
			var q3 = getQueryParam("q3");

			setPersonFlag("Ellie", 6);		// Complete Ellie's part of the event in case you decide to teleport out of here for some silly reason

			if (sType == 'trio1q1') {
				this.showPerson("trioeventmayor1.jpg");
				addPlaceTitle(md, "Questioning the Mayor");

				md.write(
					'<p>You ask the Mayor about the redesign, and Mayor Thomas replies,</p>' +
					'<p>"What exactly did you have in mind, ' + perYou.getMaster() + '?"</p>' +
					'<p>You reply, "You know, just the usual. Some renovation to the building, upgrade the computers and devices and some staff improvement. I mean I like Angela a lot, but come on...she is all alone here...and I am always glad to see new faces..."</p>' +
					'<p>Mayor Thomas smiles, "Ohh, I see ' + perYou.getMaster() + '! I will work on these. I will bring you fresh recruits to enslave. I’m going to declare an intern program for young trainees and hire them!"</p>'
				);

			} else if (sType == 'trio1q2') {
				perBatton.showPerson("trioeventoffbatton1.jpg");
				addPlaceTitle(md, "Questioning Kerry");
				md.write(
					'<p>You ask Kerry, "Baby, where’s the uniform? You know you look hot in them..." and she replies,</p>' +
					'<p>"Ohh, yes ' + perYou.getMaster() + '! I had to change to prevent any suspicion from the people. I thought this civilian outfit would still be to your liking..."</p>' +
					'<p>"Oh, yes it is...you don’t even know how much it is to my liking...", you answer sinisterly, like some kind of evil super villain.</p>'
				);
			} else if (sType == 'trio1q3') {
				perKristin.showPerson("!trioeventkristin1.jpg");
				addPlaceTitle(md, "Questions Kristin");
				md.write(
					'<p>You ask Kristin, "I met Ellie outside. She is your secretary now as I heard". Kristin replies,</p>' +
					'<p>"I needed someone who I can trust and who serve me underneath your regime. She’s great at maintaining relationships and also a good talker. I bring her with me to meetings and events, so she can keep the people company. I hope you didn’t have other plans with her, ' + perYou.getMaster() + ', because if so then of course she is yours to use."</p>' +
					'<p>You reply, "No, you did the right thing. You need some helping hands anyways, you can keep her for now."</p>'
				);
			} else {
				this.showPerson("trioeventmayor1.jpg");
				addPlaceTitle(md, "Meeting your Slaves");
				md.write(
					'<p>This is a sight for sore eyes! Three beautiful ladies and all yours.</p>' +
					'<p>Kristin and Kerry are sitting right in front the mayor’s desk. You notice that Kerry changed her uniform into a dress. Kristin is looking fancy as usual and the Mayor is already on her desk, focusing on the other two, talking to them. They do their regular greetings, each of them hugging and kissing you and are now patiently waiting for you to act.</p>'
				);
			}
			startQuestions();
			if (q1 == 'asked' && q2 == 'asked' && q3 == 'asked') addLinkToPlaceC(md, '"All right, girls! What’s the news? Why am I called here?"', 110, 'type=trio2');
			if (q1 != 'asked') addLinkToPlaceC(md, '"Mayor, this place really could use some redesign"', 110, 'type=trio1q1&q1=asked&q2=' + q2 + '&q3=' + q3);
			if (q2 != 'asked') addLinkToPlaceC(md, '"Kerry, where’s the uniform?"', 110, 'type=trio1q2&q2=asked&q1=' + q1 + '&q3=' + q3);
			if (q3 != 'asked') addLinkToPlaceC(md, '"Kristin, I met Ellie outside..."', 110, 'type=trio1q3&q3=asked&q2=' + q2 + '&q1=' + q1);
			AddPeopleColumnLarge(md);
			md.write('<table><tr><td style="width:50%">');
			if (sType == 'trio1q1') {
				perKristin.showPerson("!trioeventkristin1.jpg", '99%');
				md.write('</td><td style="width:50%">');
				perBatton.showPerson("trioeventoffbatton1.jpg", '99%');
			} else if (sType == 'trio1q2') {
				this.showPerson("trioeventmayor1.jpg", '99%');
				md.write('</td><td style="width:50%">');
				perKristin.showPerson("!trioeventkristin1.jpg", '99%');
			} else if (sType == 'trio1q3') {
				this.showPerson("trioeventmayor1.jpg", '99%');
				md.write('</td><td style="width:50%">');
				perBatton.showPerson("trioeventoffbatton1.jpg", '99%');
			} else {
				perKristin.showPerson("!trioeventkristin1.jpg", '99%');
				md.write('</td><td style="width:50%">');
				perBatton.showPerson("trioeventoffbatton1.jpg", '99%');
			}
			md.write('</td></tr></table>');
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPerson("poledancea.jpg");
		addPlaceTitle(md, "Beatrice\'s Dance");
		md.write(
			'<p>Mayor Thoms has arranged for a sort of disco inspired staging for her dance. As she starts you have to admire her figure and her costume. You hear some people nearby commenting "she looks a lot like the Mayor" and "Yeah, only if". You realise it would be best to avoid making this a regular performance with such a public figure as Mayor Thomas dancing here!</p>' +
			'<p>You enjoy her performance, while you would not say she is particular experienced, her confidence and superb figure make up for lack of skill.!</p>' +
			'<p>After she joins you briefly but she is also aware of avoiding too much notice and quickly leaves.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);	
	};
	
	per.showPersonTextHere = function(md)
	{
		// Robbins House
		if (Place == 176 && this.isHere()) {
			if (!this.isCharmedBy("You")) // Mayor is here, NOT charmed
			{
				if (this.isCharmedBy("Davy")) {
					md.write('<p>Mayor Thomas greets you at the door, asking where Davy is. ');
					if (isCharmedBy("Tina") && !isCharmedBy("MrsRobbins", "You")) {
						// Tina is charmed, Mom is not.
						md.write('Tina Robbins, only half clad, is waiting for your instructions.');
					}
					md.write("</p>");
				} else md.write('<p>Mayor Thomas stand there, freed from Davy\'s control, with a look of sheer confusion on her face.  "What? - How did I get here?" She asks.</p>');
			}
			else {
				// Here AND Charmed by YOU
				md.write('<p>Mayor Thomas wants you so much that she pleads for you to take her. Tina Robbins is pleased to have served you so well.</p>');
			}
		}
		if (Place == 473 && sType === "") {
			// Beatrice's apartment
			if (this.isHere()) {
				if (isVisible()) md.write('<p>Mayor Thomas is waiting for you, wearing a slinky dress, a party dress really.</p>');
				else md.write('<p>Mayor Thomas is listening to some music. She is wearing a slinky dress, a party dress really.</p>');
			}
		}
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 471 && isPlaceKnown("MayorApartment")) addLinkToPlace(md, "visit Beatrice's apartment", 473);
		else if (Place == 176 && this.isHere()) {
			if (sType === "") {
				//  Mayors Conversation Options
				if (!this.isCharmedBy("Davy")) {
					// Mayor is here && Freed from Davy's Spell
					addQuestionC(md, 'tell Mayor Thomas to return to her office', "Mayor", 1650);
				}
			}
		} else if (this.isHere() && this.isCharmedBy() && sType === "") {
			// Common qustions when charmed by you
			if (perGates.checkFlag(6) && !isPlaceKnown("AvernusClub")) {
				addQuestionR(md, '"Is there a gentlemans club in Glenvale?"',
					'You ask her about the gentlemans\'s club you were told about. Mayor Thomas almost rolls her eyes,</p>' +
					'<p>"Yes, yes, unfortunately. It is not I object to such places but there was so much resistance from the council, the police and do-gooders around town!"</p>' +
					'<p>She gives you directions to the club, it is located in a side street off the shopping center. The club is open late at night until the early hours and is by invitation only. She quickly makes a phone call, and tells you,</p>' +
					'<p>"You are now my personal guest for the club, you can visit any time you want"',
					"Mayor",
					"setPlaceKnown(\\'AvernusClub\\')"
				);
			}
			if (!isPlaceKnown('MayorsApartment')) {
				addQuestionR(md, '"Where do you live?"',
					'You ask your Mayor-slave about her home,</p>' +
					'<p>"Do you know the Haven apartments in the town center? I own them as an investment and I live in te penthouse apartment. I was never one for gardens and suburbs, I much prefer a luxurious fully serviced apartment."</p>' +
					'<p>You understand her feelings there, but you do prefer a house and yard. You make arrangements with Mayor Thomas to visit and she gives you a card allowing you access at all times, to the apartment and to her.',
					"Mayor",
					"setPlaceKnown(\\'MayorsApartment\\')"
				);
			}
			if (Place == 110) {
				// Limited to the Mayor's office
				if (this.checkFlag(7)) {		// Law discussion
					// Public Nudity
					if (!checkPersonFlag("Glenvale", 37)) {
						addPopupLinkC(md, "discuss laws on public nudity", "Nudity",
							this.addPersonString("law-nudist.jpg", "height:max%", "right") +
							"You discuss with Mayor Thomas about her ideas of changing the laws here in Glenvale and particularly about Angela\'s suggestion to allow public nudity.</p>" +
							'<p>"Certainly ' + perYou.getMaster() + ' I will start the process and in the meanwhile tell Kerry to stop enforcing the law. Once sorted I will have Angela arrange to advertise it, discretely and locally"',
							true, 
							"setPersonFlag('Glenvale',37);setPersonOther('Glenvale',nTime)"
						);
					}
				}
			}
			else if (Place == 473) {
				// Her's apartment
				addLinkToPlace(md, 'ask Mayor Thomas for more of her body', Place, 'type=fuck');
				if (isExplicit(true)) addLinkToPlace(md, 'ask Mayor Thomas to do more to your body', Place, 'type=bj');
				if (isPlaceKnown("DianesApartment") && wherePerson("Diane") == 467) addLinkToPlace(md, 'Diane should be home, invite her to join in', Place, 'type=threesomediane');
				this.addSleepLink(md, "bed the Mayor", "Sleeping with Beatrice",
					'<p style="position:absolute;left:5%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Beatrice to bed, and she strips naked, explaining she never wears anything to bed!</b>',
					'mayor-bed.jpg', true, '', '', '', "overflow-y:hidden"
				);
			} 
		}
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Using/Examining the Silver Ring
		if (no == 32) {
			if (cmd == 1) {
				// Examine the Silver Ring
				if (this.isHere() && this.isCharmed()) {
					examineSilverRingStart();
					addComments(
						'<p>It seems to be reacting to Mayor Thomas\'s presence... getting warmer the closer you get.</p>' +
						'</td></tr></table>'
					);
					return "handled";
				}
			}
		}
		
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Mayor's Office
			if (Place == 110 && this.isHere())  {
				// If Mayor is Here
				if (this.other == 3) {
					// not introduced
					addComments('You should speak to her first!');
				} else if (!isCharmedBy("Mayor", "Davy")) {
					// Mayor is NOT under Davy's Control
					CastCharmSpell("Mayor", Place, 1, 'type=charmmayor1');
				} else addComments('You attempt to cast the spell, but if fails to take effect... Evidently Mayor Thomas is already under the effects of a charm spell...  Someone <i>else\'s</i> spell.');
				return "handled";
			}
			
			// Mrs Robbins home and she is here
			else if (Place == 176 && this.isHere()) {
				//Mrs Robbins Still Charmed by Davy?
				if (isCharmedBy("MrsRobbins", "Davy"))	{
					if (!this.isCharmed()) {
						// Mayor is FREE
						CastCharmSpell("Mayor", Place, 1, 'type=charmmayor1');
					}	else addComments('You attempt to cast the spell, but if fails to take effect... Evidently she is already under the effects of a charm spell...  Someone <i>else\'s</i> spell.');
					return "handled";
				}
				else // Mrs Robbins is FREE from Davy
				{
					if (isCharmedBy("MrsRobbins", "You")) {
						// Mrs Robbins is already charmed by you
						CastCharmSpell("Mayor", Place, 1, 'type=charmmayor1');
						return "handled";
					}
				}
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
			if (isShopOpen(0)) WriteComments("You call the Mayor to invite her to join you at the pool for a swim, but Angela answers to apologies that the Mayor is busy in a meeting and maybe you could try again later?");
			else {
				gotoPlace(Place, 'type=mayorpool');
				receiveCall('', 'You call Mayor Thomas to invite her to join you at the pool for a swim, there is no answer so you try an SMS, this time she responds that she will meet you there.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};
}