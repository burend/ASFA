// Kate
/* State
	if (perKate.isCharmedBy("You") && clv == 2) {
		// Charmed Kate, Lover
	} else if (perKate.isCharmedBy("You")) {
		// Charmed Kate, slave		
	} else if (perKate.checkFlag(22)) {
		// Lover (uncharmed)
	} else if (perKate.checkFlag(23)) {
		// Ally (uncharmed, not lover) - told her you would protect her, not I love you
	} else if ((perMG.other == 50 && perMG.checkFlag(1)) && (plcMG == 275.5 || plcMG == 278) && stype === "") {
		// Mrs Granger @ hospital and you meet Kate in her room
		// Charmed initially unless you free he
	} else if (!perMG.checkFlag(1) && perKate.other == 7 && stype === "") {
		// Meeting in her room after you pick up the vase (alternate to meeting afyer Mrs Granger is in the hospital)
		// Charmed initially unless you free her
	} else {
		// initial meetings uncharmed
	}
*/

// Free Kate from Davy's control
function FreeKate()
{
	var perKate = findPerson("Kate");
	perKate.setFlag(31);	// Have ever freed her from Davy
	perKate.unCharmThem();	// Freed her from Davy
}

// Does Kate trust you?
// Only possible either in bedroom if she is sent to kill you and freed or after defeating Davy
// must have chatted, ogled, won bet and freed her at least once and NEVER pissed her off (ie ignored or insulted her)
function isKateTrusting()
{
	var perKate = findPerson("Kate");
	if (perKate.isCharmedBy("Davy") || !perKate.checkFlag(4) || perKate.checkFlag(12)) return false;			// Under Davy's control or you pissed her off
	return (perKate.checkFlag(1) && perKate.checkFlag(2) && perKate.checkFlag(5) && perKate.checkFlag(11) && perKate.checkFlag(31));
}

function KatesHome()
{
	movePerson("Kate", 139.5);
	startTimedEvent("KatesGone()", 4);
	if (Place == 35) {
		// Are you visible?
		if (!isInvisible() && !perYou.checkFlag(16)) {
			Place = 35;
			setQueryParams('type=clobberedvisible');
		} else {
			Place = 139;
			setQueryParams('type=katepacking');
		}
	}
}

function KatesGone()
{
	if (!isCharmed("Kate")) movePerson("Kate", 9999);
}

// You just leave her from the study puzzle, but not pissed off (much)
function LeaveKate7()
{
	var perKate = findPerson("Kate");
	perKate.other = 999;	// Remove Kate from Game, save the message about her mother of course
	perKate.place = 1000;		// Put her "Out and About"
	perKate.charmThem(4, "Davy");		// now charmed by Davy
	perKate.setFlag(4);		// Really pissed her off!!!
	if (!checkPlaceFlag("Park", 3)) {
		// Puts a stone in the Wild Ranges
		setPlaceFlag("Park", 3);
		PlaceI(5, 26);
	}
	setPlaceKnown("GrangerHouse"); // Sets it so that you will always know where Kate's house is
	setPlaceKnown("Alley");  //Know the Alley
	
	gotoPlace(3, '', '<p>You just leave Kate, and she storms off when you ignore her. You notice in her rush a piece of paper slips out of her bag, an envelope addressed to her from the school, it has her home address on it.</p>');
}

function examineKatePhoto()
{
	bChat = false;
	WriteComments('<table><tr><td style="vertical-align:top;width:40%"><img src="Images/People/Kate/holidayphoto1.jpg" style="width:95%;" alt="Photo"></td><td><p>An older image of Kate, she is a brunette in the image and as long as you have known her she has beem blonde.</p><p>You have no idea who the other woman is, probably an old friend of Kate?</p></td></tr></table>');
}

function AlbumQuestions(md, alb, page)
{
	md.write('<br></div>');
	var last = alb == 1 ? 16 : 4;
	if (page != last) addLinkToPlace(md, 'next page', Place, 'type=album' + alb + '&page=' + (page + 1), '', '', '', "hailblock' style='width:200px; margin-top:14px;");
	if (page != 1) addLinkToPlace(md, 'previous page', Place, 'type=album' + alb + '&page=' + (page - 1), '', '', '', "hailblock' style='width:200px; margin-top:14px;");
	addLinkToPlace(md, 'close the album', Place, '', '', '', '', "optionblock' style='width:200px;margin-left:5px;margin-right:auto;border-left-width:0;margin-top:14px;");
	md.write('</td><td style="vertical-align:top; width:50%; padding:0; position:relative;">');
}

//  ******************** Kate Granger Path  *******************
// ************************************************************
function RepliesKate(nR)
{
	var perKate = per;
	//var bCharm = perKate.isCharmedBy();
	//var myName = perKate.getYourNameFor();

	if (nR == 540) // Done
	{
		if (Math.random() < 0.5) addComments('<p>"What\'s up! I don\'t have time for such silly nonsense! Let me pass imbecile!"</p>');
		else addComments('<p>"What\'s up! What do you mean \'What\'s up\'??  I can\'t believe this, get out of my way you simpleton!"</p>');
		if (perKate.other < 1) {
			perKate.other = 0.5;
		}
	}
	else if (nR == 5401) // Done
	{
		if (perKate.other < 1) perKate.other = 1;
		addComments('<p>"If you must know. I\'m studying for the mathematics exam next week."</p>');
	}
	else if (nR == 5402)
	{
		perKate.other = 999;  // Remove Kate from Game, save the message about her mother of course
		perKate.place = 1000;	// Put her "Out and About"

		if (perYou.isBornMale()) {
			PlaceI(5, 26); // Puts a stone in the Wild Ranges
			setPlaceFlag("Park", 3);
		}

		Place = 63;

		addComments('<p>"I heard what that juvenile said about me and it was horrible. You have a filthy mind and I never want to see you again!" she cries, turning to run away');

		if (!perYou.isBornMale())
		{
			addComments(
				' then, surprisingly, turns around again and begins frantically digging through her backpack for something.' +
				'  "Here," she says with tears welling up in her eyes.  "Davy said I had to give my address to all the girls that I knew so <i>take it</i>!"  Then, finally, she turns and runs away.  You can hear her begin to cry as she goes.'
			);
			PlaceI(3, 63);  // put Kate's address in the park.
		}
		else addComments('.</p><p>As she leaves you notice a kite stuck in a tree, some kid must have lost it recently.</p>');
	}
	else if (nR == 541)
	{
		if (perKate.other < 3) perKate.other = 3;
		addComments('<p>"You got an A+! Excellent! I didn\'t know. Do you think that we could study together?"</p>');
	}
	else if (nR == 543)
	{
		if (perKate.other < 4) perKate.other = 4;
		perKate.place = 3; // Set Kate @ Library
		addComments('<p>"Yes," replies Kate. "That sounds like a great idea. I\'ll meet you there, don\'t take too long!"</p>');
		Place = 63;
	}
	else if (nR == 5410)
	{
		perKate.other = 11;
		addComments('<p>"Davy told me not to say anything about it. After he... he said something about a Dai Chu, whatever that is. It was when we were... you know.. Davy told me that Mr Beasley taught him some magic and they found a stone buried in the park. I can\'t remember much more than that because it was all a blur."</p>');
	}
	else if (nR == 5411)
	{
		perKate.other = 12;
		perKate.place = 1000;  //Put Kate "Out and about" to wait for your encounter at her house
		addComments('<p>"You really think so?" says Kate. "I\'m so glad you agree. I\'ll meet you back at my house."</p>');
		dispPlace(47, ''); //Put you back in the "Empty Park" with Kate gone
	}
	else if (nR == 3201) //Called from the Silver Ring if you "uncharm" Kate in the Park
	{
		perKate.other = 12; //Advance her plot to "go home"
		perKate.place = 1000; //Put her back in the "out and about" and ready to head home for next encounter
		addComments('<p>"Oh my god!" Kate cries as you free her from Davy\'s control.  "The things he made me do!  I can\'t believe this, its not possible!" She says, running away from you before you can do anything to stop her.</p>');
	}
	else if (nR == 5415)
	{
		addComments('<p>"I met Davy on the way here. He said that magical word again and now I realize how much I love him. He even ordered me to give you something."</p>');
		perKate.other = 50;
	}
	return true;
}

// Initialise

function initialiseKateGranger()
{
	// Kate
	addPerson("Kate", Math.random() < 0.7 ? 63 : 216, "Kate");
	per.Replies = RepliesKate;

	per.getPersonName = function(full) {
		if (full === true) return "Kate Granger";
		var clv = this.getCharmedLevel();
		if (clv == 2) return "Kate";
		return clv == 4 ? "Slave Kate" : "Kate Granger";
	};
	per.getPersonAddress = function() { return isPlaceKnown("GrangerHouse") ? '34 Yoolaroo Dr, Glenvale' : ''; };
	
	per.isLover = function() { return nc === true ? this.checkFlag(22) : this.checkFlag(22) || this.getCharmedLevel() == 2; };	

	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		if (!this.isCharmed() || !this.isCharmedBy("You")) {
				return this.addPersonString("kate16a.jpg", "height:max%", "right") +
					 "Kate, your classmate and the hottest girl at school. She is smart but violent, but still you like her!";

		} else if (this.getCharmedLevel() == 4) {
			return this.addPersonString("kate18ca.jpg", "height:max%", "right") +
					 "Whew! It was a wild ride, but you finally caught Kate! She’s your humble slave now, just the rest of girls you own. How long have you been dreaming about this moment. One of the prettiest girl in school is yours. Davy Robbins will no longer be an issue so Kate and you can have some time to spend together. She is just great in bed as you have imagined! You guess her mother has taught her well in the ways of pleasing a man. You should try a threesome with them one day!<br><br>" +
					 "Kate is sitting on her bed as you have instructed her. She doesn’t like to talk unless you ask her something. She’s like a living statue waiting for your commands. You like it when she bows to you, she makes it so damn erotic! You just can’t wait to jump on her!";

		} else {
			return this.addPersonString("kate16a.jpg", "height:max%", "right") +
					 "Kate has always been your crush for years now. She’s the hottest girl in the school and a caring friend as you have heard from others. It’s been a long journey, but you managed to charm her to become your girlfriend. She still has bad memories of being Davy’s slave thus she can be a bit emotional at times. You reassured her that she is safe with you and Davy is no longer a threat to her. You jokingly added that by being your girlfriend she’s technically the queen of your harem and domain. At first she laughed at the idea, but as she got to know you better by time she is interested in ruling along your side. Actually, she’s not like the rest of your girls. She has a free will ( more or less ) and she has her own emotions and feelings that’s not always about you. It is because she’s girlfriend, not your slave. You like this relationship so far. You are still the dominant one in this affair and she’s very loyal to you and your cause, but she has the mind of her own. It’s so good to have someone that you can trust and can help you out or just someone who you can talk to!<br><br>" +
					 "The two of you share a long, mouthful kiss when you enter the Granger house. Kate offers you fresh drinks and snacks all while she ushers you to sit down on her bed. She sits on your lap and clasps her hands around your back. You can tell she’s been waiting for you all day, between kisses and hugs she asks about how your day went and what kind of new girl have you added to your army of slaves. The perfect girlfriend, she so thoughtful of you! You are in heaven!";
		}
	};

	per.isPlaceImageRight = function() { return this.isHere() && (this.whereNow() == 47 || this.whereNow() == 3 || this.whereNow() == 63 || this.whereNow() == 216); };
	per.showPlaceImageRight = function() {
		if (Place == 3) this.showPerson("kate3a.jpg", "100%", "", "", "Kate");
		else if (Place == 63 || Place == 216) this.showPerson("kate5.jpg", "100%", "", "kate1a.jpg");
		else if (Place == 47) this.showPerson("kate5.jpg", "100%", "", "kate4a.jpg");
	};

	per.whereNow = function() {
		if (this.place === 1) {
			if (this.other >= 15 && this.isCharmedBy("Davy")) return 108;
			return 139;
		}
		return Math.floor(this.place);
	};
	per.getPossessionFace = function() { return "kate5"; };
	
	per.showEventPopup = function()
	{		
		if (Place == 139 && this.checkFlag(23) && this.checkFlag(24) && !this.checkFlag(29)) {
			this.setFlag(29);
			showPopupWindow("Kate is Home",
				this.addPersonString("kate16g.jpg", "height:max%", "right") +
				"When you enter Kate's room run see she is adjusting her clothes, exposing her panties. For a moment you expect her punish you, but she just smiles and sits down.</p>" +
				'<p>She tells you "I was visiting Mama recently and I went to workout at the gym. Charlie there knew you and spoke fondly, I did not know you knew each other. Was it Amy, Charlie is close to her? Anyway, that decided it for me, and I am back home and we are good now."</p>' +
				'<p>You look at her and she seems to mean it. While things are not as you would of wanted, you are at least friends again.'
			);
			return true;
		}
		return false;
	};

	// Events (current only her bedroom)
	per.showEvent = function()
	{
		var md, clv;
		
		if (Place == 7 && this.place == 3) {
			// Study Puzzle at the Library Study Area
			md = WritePlaceHeader();
			this.showPerson("kate3a.jpg");
			addPlaceTitle(md, "Study Area");

			md.write(
				'<p>"I\'m so glad that you can help," says Kate. "I have a terrible puzzle that\'s so impossible that I\'ll be here forever if I have to do it alone."</p>' +
				'<p>You look at the desk and see the puzzle. It looks bloody difficult.</p>' +
				'<p>Kate sees you hesitate. "You will help me, won\'t you? I... I need a friend."</p>'
			);

			startQuestions();
			addLinkToPlaceO(md, "try the puzzle", 12);
			addOptionLink(md, "go to the library reception?", "LeaveKate7()");
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "katepool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson(this.isCharmedBy("You") ? "kate-poolc.jpg" : "kate-poolu.jpg");
			addPlaceTitle(md, "Swimming with Kate");
			md.write(
				'<p>Kate arrives and changes into her bikini, looking stunning, has she done something with her hair?</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'say goodbye to Kate', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 139 || Place == 35) {
			var page, dn;
			if (sType == "album1") {
				md = WritePlaceHeader(true, '', '#F8F8FF', '', 'UI/photoalbum.jpg');
				page = parseInt(getQueryParam("page"), 10);
				dn = (page % 5) !== 0 ? "day" : "night";
				md.write(
						'<div style="text-align:left;margin: 20px 20px 20px 30px;width:95%;color:black">' +
						'<br><img src="UI/' + dn + '.png" style="position:absolute;left:3%;top:5%" width="42" height="42" alt="' + dn + '">' +
						'<table class="table-main">' +
						'<tr><td style="vertical-align:top; width:50%; padding:0; position:relative;">');

				switch(page) {
					case 1:
						addPlaceTitle(md, "Our Trip to Paradise", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p>The album has photos for a holiday Kate took with some friends last year. There are some hand-written notes for each picture, you do not think Kate wrote them, it appears she went with a couple of friends from her old home town and school.</p>' +
							'<p><b>Day 1 - arrival</b><br>' +
							'<i>Our rooms in paradise, Kate is as conservative as ever, cute but conservative.</i>' +
							'</p><p>You did not realise is that Kate was a brunette then as you look at the first picture. There are a few pictures on each page but you focus on the more interesting ones.</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday1-1.jpg", "height:85vh", "right");
						break;
					case 2:
						addPlaceTitle(md, "Day 1 - A quick swim", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>We go for a quick swim, Kate you know it is a clothing optional beach!</i>' +
							'<br>another hand continues<br>' +
							'<i>Yeah loosen up Miss Bookworm!</i></p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday1-2.jpg", "height:85vh", "right");
						break;
					case 3:
						addPlaceTitle(md, "Day 1 - Lunch at the Pool", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>Great food and some cute guys and girls!</i>' +
							'</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday1-3.jpg", "height:85vh", "right");
						break;
					case 4:
						addPlaceTitle(md, "Day 1 - Tour of the Island", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>We splurged out for a sports car experience and a tour of the island. Hot, fast times for all!</i>' +
							'</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday1-4.jpg", "height:85vh", "right");
						break;
					case 5:
						addPlaceTitle(md, "Day 1 - Evening", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>When we got back from the bar, Kate was waiting for us, all concerned about us drinking or doing other things! Miss Proper lectured us but we will get her to go with us tomorrow!</i>' +
							'</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday1-5.jpg", "height:85vh", "right");
						break;
					case 6:
						addPlaceTitle(md, "Day 2 - Playful Kate", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>Kate is a lot more playful today, she flashed us her panties on the way to breakfast!</i>' +
							'</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday2-1.jpg", "height:85vh", "right");
						break;
					case 7:
						addPlaceTitle(md, "Day 2 - Swimming Race", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>We all decided to have a swimming race. Kate is always a sucker for a bet!. Still she gave us a nice pose before the race</i>' +
							'</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday2-2.jpg", "height:85vh", "right");
						break;
					case 8:
						addPlaceTitle(md, "Day 2 - Penalty", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>Kate lost the race and her first penalty was this racy bikini for lunchtime. Don\'t deny it Kate, you loved it!</i>' +
							'</p>');
						AlbumQuestions(md, 1, page);
						this.showPersonRandom("katepicsday2-3", 2, "height:85vh", "right");
						break;
					case 9:
						addPlaceTitle(md, "Day 2 - Playing", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>We all relaxed this afternoon together, Kate paid up the final penalty, no swimsuit at all! Yay!!!</i>' +
							'<br>another hand continues<br>' +
							'<i>We did the same too, but I haven\'t worn a swimsuit since we arrived!</i></p>');
						AlbumQuestions(md, 1, page);
						this.showPersonRandom("katepicsday2-4", 2, "80%", "right");
						break;
					case 10:
						addPlaceTitle(md, "Day 2 - Fancy Dress Party", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>We all went to a fancy dress party tonight, and posed for some sexy pictures!</i>' +
							'</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday2-5.jpg", "height:85vh", "right");
						break;
					case 11:
						addPlaceTitle(md, "Day 2 - Night", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>Spoil sport Kate left once the party got more interesting, and keys changed hands and people got serious! Late night she was waiting for us and demanded we tell her everything that happened and we did!</i>' +
							'</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday2-6.jpg", "height:85vh", "right");
						break;
					case 12:
						addPlaceTitle(md, "Day 3 - Hot breakfast", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>Finally talked Kate into loossening up more, she decided to go \'no panties\' today!</i>' +
							'</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday3-1.jpg", "height:85vh", "right");
						break;
					case 13:
						addPlaceTitle(md, "Day 3 - Swimming", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>Kate you minx, stripping off without being asked!</i>' +
							'</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday3-2.jpg", "height:85vh", "right");
						break;
					case 14:
						addPlaceTitle(md, "Day 3 - Relaxed Lunch", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>Kate has really loosened up, this is her during lunch!</i>' +
							'</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday3-3.jpg", "80%", "right");
						break;
					case 15:
						addPlaceTitle(md, "Day 3 - Party", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>Another party tonight, Kate in her sexy costume, popping out of her top!</i>' +
							'</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday3-4.jpg", "height:85vh", "right");
						break;
					case 16:
						addPlaceTitle(md, "Day 3 - After Party", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>Kate when we got back, lets keep this PG so no telling what she was doing with her fingers and some fruit!</i></p>' +
							'<p>That appears to be all there is, the album end there clearly part-way through the trip. There must be another album!</p>');
						AlbumQuestions(md, 1, page);
						this.showPerson("katepicsday3-5.jpg", "height:85vh", "right");
						this.setFlag(8);
						break;
				}
				md.write("</td></tr></table></div></div>");
				md.write('<div id="commentdiv" class="comment_content_trans' + (gameState.bCommentLL ? '_ll' : '') + '" onclick="ClearComments();"></div>');
				writePageFooter(md);
				return true;

			} else if (sType == "album2") {
				md = WritePlaceHeader(true, '', '#F8F8FF', '', 'UI/photoalbum.jpg');
				page = parseInt(getQueryParam("page"), 10);
				dn = (page % 5) !== 0 ? "day" : "night";
				md.write(
						'<div style="text-align:left;margin: 20px 20px 20px 30px;width:95%;color:black">' +
						'<br><img src="UI/' + dn + '.png" style="position:absolute;left:3%;top:5%" width="42" height="42" alt="' + dn + '">' +
						'<table class="table-main">' +
						'<tr><td style="vertical-align:top; width:50%; padding:0; position:relative;">');

				switch(page) {
					case 1:
						addPlaceTitle(md, "Our Trip to Paradise<br>Kate\'s Eyes Only, no Mothers!", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><p>This is the continuation of the holiday trip from the other album clearly intended for private viewing only.</p>' +
							'<p><b>Day 4 - Getting ready</b><br>' +
							'<i>Kate is really getting into the trip, a quick picture I took of her preparing herself for the day!</i></p>');
						AlbumQuestions(md, 2, page);
						this.showPerson("katepicsday4-1.jpg", "80%", "right");
						break;
					case 2:
						addPlaceTitle(md, "Day 4 - Swimming", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>No swimsuits today! All the better to hook-up with some cute guy or girl!</i>' +
							'<br>another hand continues<br>' +
							'<i>Which we did!! We all did!!</i></p>');
						AlbumQuestions(md, 2, page);
						this.showPerson("katepicsday4-2.jpg", "80%", "right");
						break;
					case 3:
						addPlaceTitle(md, "Day 4 - What is 2some plus 1some", '', 0, true);
						if (perYou.isMaleSex()) md.write('<div style="height:55%;height:55vh"><p><i>They held the camera for us, who could refuse us cuties.</i></p>');
						else md.write('<div style="height:55%;height:55vh"><p><i>A passerby was happy to take some photos of us having fun</i></p>');
						AlbumQuestions(md, 2, page);
						if (isExplicit()) this.showPersonRandomX(perYou.isMaleSex() ? "katepicsday4-3b" : "katepicsday4-3g", perYou.isMaleSex() ? 4: 2, "80%", "right");
						else this.showPerson(perYou.isMaleSex() ? "katepicsday4-3b.jpg" : "katepicsday4-3g.jpg", "80%", "right");
						break;
					case 4:
						addPlaceTitle(md, "Day 4 - Mistress Kate", '', 0, true);
						md.write(
							'<div style="height:55%;height:55vh"><p><i>End of the trip, packing to leave and Kate snapped. You had enough of us teasing, penalties and other games. Here she is punishing us</i>' +
							'<br>another hand continues<br>' +
							'<i>Please Mistress, punish me anytime!</i></p>' +
							'<p>That would seem to be the end of the albums and the trip, unfortunately!</p>'
						);
						AlbumQuestions(md, 2, page);
						this.showPersonRorX("katepicsday4-4.jpg", "height:85vh", "right");
						break;
				}

				md.write("</td></tr></table></div></div>");
				md.write('<div id="commentdiv" class="comment_content_trans' + (gameState.bCommentLL ? '_ll' : '') + '" onclick="ClearComments();"></div>');
				writePageFooter(md);
				return true;

			}
		}

		if (Place != 139 && Place != 108) return false;

		// Her bedroom with her present
		this.setFlag(6);		// Visited her in her room
		var perMG = findPerson("MrsGranger");
		perMG.setFlag(9, false);
		if (perMG.checkFlag(13)) {
			perMG.setFlag(12, false);
			perMG.setFlag(13, false);
		}
		var plcMG = perMG.whereNow();

		if (sType == "freed") {
			// Freed from Davy, at least for a little while
			md = WritePlaceHeader();
			if (getQueryParam("plc") === "") {
				if (perDavy.other == 6) perDavy.other = 7;
			}
			this.place = 1000;  //Put her "out and about" again (leaves immediately)
			var bFreedBefore = getQueryParam("before") === "true";
			FreeKate();
			if (!isDavyDefeated()) {
				if ((this.other == 999 || this.other < 15) && isPlaceKnown("MechanicsShop"))	{
					this.place = Math.random() < 0.5 ? 47 : 421; // Put Kate in Park pathway
					if (this.place == 421) setPlaceKnown("DuckPond");
					this.other = 10;
				}
			}
			AddMana(5);

			this.showPerson("kate17d.jpg");
			addPlaceTitle(md, "Kate Freed from Davy\'s Control!");

			if (getQueryParam("by") === "Tina") md.write('<p>Tina concentrates and, within moments, she absorbs the mana powering the <i>charm</i> over Kate.</p>');
			else md.write('<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over Kate.</p>');
			md.write(
				'<p>"I can\'t <i>believe</i> this!" She cries out as she dashes for the door.  "He did it <i>again</i>!  That <i><b>ASSHOLE</i></b>!!"</p>' +
				'<p>She immediately goes to leave, clearly with the intent of exacting revenge on Davy.</p>'
			);

			startQuestions();
			if (bFreedBefore) {
				addLinkToPlaceC(md, "&quot;Wait!! I can protect you from Davy!&quot;", 139, "type=waitprotect");
				addLinkToPlaceC(md, "&quot;Wait!! I love you!&quot;", 139, "type=waitlove");
			}
			if (plcMG === 177) addLinkToPlace(md, "let her go and look for Mrs Granger", 177, '', '', '', "charmPerson('Kate',4,'Davy')");
			addLinkToPlace(md, "let her go and follow her out of the house", 43, '', '', '', "charmPerson('Kate',4,'Davy')");
			WritePlaceFooter(md);
			return true;

		} else if (sType == "waitprotect") {
			// "Wait!!! - I can protect you"
			md = WritePlaceHeader();

			this.showPerson("kate17f.jpg");
			addPlaceTitle(md, "Kate Hesitates");
			this.setFlag(13);

			md.write(
				'<p>You call out to Kate, "Wait, don\'t go I love you and I can protect you!"</p>' +
				'<p>She hesitates and looks at you with a smile,  "I..don\'t know how to answer that, I am so angry at that <b>bastard</b> I just want to pound his face ');

			if (isKateTrusting()) {
				md.write(
					'but I do like you too, and maybe I was starting to fall... It is just Davy has messed with me and my emotions I do not know what to do.</p>');

				startQuestions();

				if (perYourBody.FindItem(43) !== 0) {
					// You have the silver necklace
					addLinkToPlaceC(md, "&quot;I can give you this necklace&quot;", 139, "type=waitprotectnecklace");
				}
				addLinkToPlaceC(md, "&quot;I can protect you by casting Charm on you&quot;", 139, "type=waitprotectcharm");

			} else {
				this.setFlag(12);
				md.write(
					'but I do not trust you. You seem to have some of the same abilities as Davy does and I do not know what you can or have done with them. Maybe I was starting to fall for you, but this has messed us around and I doubt I can ever trust someone with those powers ever again.</p>' +
					'<p>You try to reassure her of your feelings and that you will never used your magic on her but she is too angry and confused. She looks at you and resumes walking out, intent on her revenge against Davy.</p>'
				);
				startQuestions();

			}

			if (plcMG === 177) addLinkToPlace(md, "let her go and look for Mrs Granger", 177, '', '', '', "charmPerson('Kate',4,'Davy')");
			addLinkToPlace(md, "let her go and follow her out of the house", 43, '', '', '', "charmPerson('Kate',4,'Davy')");

			WritePlaceFooter(md);
			return true;


		} else if (sType == "waitprotectcharm") {
			// "Wait!!! - I can charm you"
			md = WritePlaceHeader();

			this.showPerson("kate17d.jpg");
			addPlaceTitle(md, "Kate Refuses");

			this.setFlag(12);
			md.write(
				'<p>You tell her you know something of how Davy did what he did to her and can protect her by using the same spell on her, but just to protect her, doing nothing more. She replies suspiciously,</p>' +
				'<p>"I see, but I could never let anyone have that sort of power over me ever again. No one, not you, Davy, anyone!!"</p>' +
				'<p>You see you have lost any trust she had in you, she turns her back on you and leaves the room, certainly going to punish Davy.</p>');

			startQuestions();
			if (plcMG === 177) addLinkToPlace(md, "let her go and look for Mrs Granger", 177, '', '', '', "charmPerson('Kate',4,'Davy')");
			addLinkToPlace(md, "let her go and follow her out of the house", 43, '', '', '', "charmPerson('Kate',4,'Davy')");

			WritePlaceFooter(md);
			return true;


		} else if (sType == "waitprotectnecklace") {
			// "Wait!!! - give necklace"
			md = WritePlaceHeader();
			perYourBody.DropItem(43, "Kate");
			this.setFlag(15);
			this.place = 124;

			this.showPerson("kate17i.jpg");
			addPlaceTitle(md, "Give Kate the Necklace");

			md.write(
				'<p>You show Kate the heirloom necklace you are wearing and without explaining how you got it, you describe how it protects from magic spells being cast on you. You remove it and offer it to her. She looks surprised, them smiles,</p>' +
				'<p>"I do not know how to thank you! I will properly \'thank\' you later, once I have beaten Davy and heard him beg to apologise to me!"</p>' +
				'<p>I am not sure where he is at the moment, he has been very cautious, he said how afraid of you he was, but also mentioned his mentor protecting him. If I find him before you I will call you. Do not dare attack him without me, I must punish him myself!"</p>' +
				'<p>She quickly kisses you on your lips, and then runs out of the room to hunt down Davy.</p>'
			);

			startQuestions();
			if (plcMG === 177) addLinkToPlace(md, "let her go and look for Mrs Granger", 177);
			addLinkToPlace(md, "let her go and follow her out of the house", 43);

			WritePlaceFooter(md);
			return true;


		} else if (sType == "waitlove") {
			// "Wait!!! - I love you"
			md = WritePlaceHeader();

			if (isKateTrusting()) this.showPerson("kate17f.jpg");
			else this.showPerson("kate17d.jpg");
			addPlaceTitle(md, "Kate Hesitates");

			md.write(
				'<p>You call out to Kate, "Wait, don\'t go I love you and want to help you!"</p>' +
				'<p>She hesitates and looks at you with a smile,  "I..don\'t know how to answer that, I am so angry at that <b>bastard</b> I just want to pound his face ');

			if (isKateTrusting()) {
				md.write(
					'but I do like you too, and maybe I was starting to fall... It is just Davy has messed with me and my emotions I do not know what to do.</p>' +
					'<p>You once again try to reassure her of your feelings and she looks at you,</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "&quot;I love you, everything I have been doing is to help you!&quot;", 139, "type=waitloveyou");
				addLinkToPlaceC(md, "&quot;I love you, I will defeat Davy!&quot;", 139, "type=waitlovewait");

			} else {
				this.setFlag(12);
				md.write(
					'but I do not trust you. You seem to have some of the same abilities as Davy does and I do not know what you can or have done with them. Maybe I was starting to fall for you, but this has messed us around and I doubt I can ever trust someone with those powers ever again.</p>' +
					'<p>You try to reassure her of your feelings and that you will never used your magic on her but she is too angry and confused. She looks at you and resumes walking out, intent on her revenge against Davy.</p>'
				);
				startQuestions();
			}

			if (plcMG === 177) addLinkToPlace(md, "let her go and look for Mrs Granger", 177, '', '', '', "charmPerson('Kate',4,'Davy')");
			addLinkToPlace(md, "let her go and follow her out of the house", 43, '', '', '', "charmPerson('Kate',4,'Davy')");

			WritePlaceFooter(md);
			return true;


		} else if (sType == "waitlovewait") {
			// "Wait!!! - I love you" - "I love you, I will defeat Davy!"
			md = WritePlaceHeader();

			this.showPerson("kate17d.jpg");
			addPlaceTitle(md, "Kate Leaves");

			md.write(
				'<p>You tell Kate, "I do love you and I am working to defeat Davy and rob him of his powers. Just wait here and I will call for you when he is beaten."</p>' +
				'<p>Kate smiles and replies, "Thank you, but the only person who is going to beat Davy is me!" and she walks out of the room.');

			startQuestions();

			if (plcMG === 177) addLinkToPlace(md, "let her go and look for Mrs Granger", 177, '', '', '', "charmPerson('Kate',4,'Davy')");
			addLinkToPlace(md, "let her go and follow her out of the house", 43, '', '', '', "charmPerson('Kate',4,'Davy')");

			WritePlaceFooter(md);
			return true;

		} else if (sType == "waitloveyou") {
			// "Wait!!! - I love you" - "I love you, everything I have been doing is to help you!"
			md = WritePlaceHeader();

			this.showPerson("kate17f.jpg");
			addPlaceTitle(md, "Kate");

			md.write(
				'<p>You tell Kate, "Everything I have been doing is to help you, I love you!"</p>' +
				'<p>She looks at you smiling and replies, "I might love you as well, but...I should go..."</p>');

			startQuestions();
			addLinkToPlace(md, "kiss her", 139, "type=waitlovekiss");

			if (plcMG === 177) addLinkToPlace(md, "let her go and look for Mrs Granger", 177, '', '', '', "charmPerson('Kate',4,'Davy')");
			addLinkToPlace(md, "let her go and follow her out of the house", 43, '', '', '', "charmPerson('Kate',4,'Davy')");

			WritePlaceFooter(md);
			return true;

		} else if (sType == "waitlovekiss") {
			// "Wait!!! - I love you" - "Kiss Her"
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson(perYou.isMaleSex() ? "kate17gb.jpg" : "kate17gg.jpg");
			addPlaceTitle(md, "A Kiss");

			md.write(
				'<p>You take the uncertain Kate in your arms and you kiss her. She hesitates for a moment and then returns your kiss.</p>' +
				'<p>After a time you part and Kate looks calmer, the anger gone from her face, and she says,</p>' +
				'<p>"After everything with Davy this is so confusing, but I do want to thank you properly"</p>' +
				'<p>You look at her, she is unusually nervous, she is usually very clear minded, if impulsive.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "embrace her", 139, "type=waitloveembrace");

			if (plcMG === 177) addLinkToPlace(md, "let her go and look for Mrs Granger", 177, '', '', '', "charmPerson('Kate',4,'Davy')");
			addLinkToPlace(md, "let her go and follow her out of the house", 43, '', '', '', "charmPerson('Kate',4,'Davy')");

			WritePlaceFooter(md);
			return true;

		} else if (sType == "waitloveembrace") {
			// "Wait!!! - I love you" - "Embrace"
			md = WritePlaceHeader(false, isExplicit() || perYou.isMaleSex() ? 'td-left-med' : '');
			this.setFlag(14);
			this.place = 124;

			var img = "";
			if (isExplicit()) img = this.showPersonRandomX(perYou.isMaleSex() ? "kate17hb" : "kate17hg", 2);
			else this.showPerson(perYou.isMaleSex() ? "kate17hb.jpg" : "kate17hg.jpg");
			addPlaceTitle(md, "Passionate Embrace");

			md.write(
				'<p>You take Kate into your arms and passionately kiss her, and you both start to strip each others clothing. You touch her large breasts and she sighs in passion, but when you touch her lower down, she shys away, and says,</p>' +
				'<p>"For now just let me please you...another time for...you know.."</p>');
			if (perYou.isMaleSex()) {
				if (img.indexOf("kate17hba.jpg") != -1) {
					md.write(
						'<p>Kate has you place your cock between her breasts and you fuck her ample cleavage. She seems quite skilled at this, and you quickly cum, splattering over her face and tits.</p>'
					);
				} else {
					md.write(
						'<p>Kate kneels and gives you a practised blowjob, clearly not her first time by a long way. You quickly cum, splattering her face and tits.</p>'
					);
				}
			} else {
				md.write(
					'<p>Kate has you lie back and she leans in and starts licking your pussy. She is remarkably skilled and you quickly orgasm hard on her face.</p>'
				);
			}
			md.write(
				'<p>Kate looks at you and smiles and she quickly re-dresses. Once dressed she tells you,</p>' +
				'<p>"I will be back soon, once I have beaten Davy for what he did to me!"</p>' +
				'<p>Before you can complain or warn her she leaves the room.</p>');

			startQuestions();

			if (plcMG === 177) addLinkToPlace(md, "let her go and look for Mrs Granger", 177, '', '', '', "charmPerson('Kate',4,'Davy')");
			addLinkToPlace(md, "let her go and follow her out of the house", 43, '', '', '', "charmPerson('Kate',4,'Davy')");

			WritePlaceFooter(md);
			return true;
		}

		// A 'group' of events with common questions, must use if else if etc blocks from here
		if (sType == "katepacking") {

			if (!isInvisible() && !perYou.checkFlag(16)) {
				// NOT hidden
				gotoPlace(35, 'type=clobberedvisible');
				return true;
			}
			// You are hidden
			md = WritePlaceHeader();
			this.showPerson("kate18a.jpg");
			addPlaceTitle(md, "Kate Packing");

			md.write('<p>Kate has arrived back home and she is quickly packing some things. She seems to have first changed her clothes elsewhere in the house before entering the room.</p>');
			if (isInvisible()) md.write('<p>You are waiting in the room, quiet and invisible.</p>');
			else if (perYou.checkFlag(16)) md.write('<p>You are quietly hiding in the wardrobe.</p>');

			startQuestions();

		} else if (sType == "charm1" || sType == "charm1v") {
			// Charm her
			md = WritePlaceHeader(false, sType == "charm1" || !this.checkFlag(23) ? '' : 'td-left-large');
			this.place = 1;
			this.showPerson(sType == "charm1" ? "kate18b.jpg" : this.checkFlag(23) ? "kate18bv1.jpg" : "kate18bv2.jpg");
			addPlaceTitle(md, "Kate Under a Charm Spell");

			if (sType == "charm1") {
				md.write(
					'<p>You wait for a moment until Kate is putting some items into a bag and making a little noise. As quietly as you can you recite "Dai Chu Kate", the spell of charming.</p>' +
					'<p>Kate looks around and says "..again..??" and her face flushes and a look of arousal passes across her features. Somehow she looks confused and also like it is Deja-Vu all over again. ' +
					'With that you are quite certain she is under the influence of the spell and '
				);
				if (perYou.checkFlag(16)) {
					perYou.setFlag(16, false);
					md.write('step out of hiding');
				} else {
					checkInvisible();
					md.write('drop the invisibility spell');
				}
			} else {
				md.write(
					'<p>Kate looks around and says "..again..you..??" and her face flushes and a look of arousal passes across her features. Somehow she looks confused and also like it is Deja-Vu all over again. ' +
					'With that you are quite certain she is under the influence of the spell '
				);
			}
			md.write(
				' and she looks at you, "' + perYou.getPersonName() + ' what is happening?" and she starts to involuntarily remove her clothing.</p>' +
				'<p>You consider if you earlier annoyance at Kate is justified, or have you calmed down.</p>'
			);

			// Choices
			startQuestions();
			addLinkToPlaceC(md, '"Bitch, you must call me ' + perYou.getMaster() + '!"', 139, sType == "charm1v" ? "type=charm2v" : "type=charm2");
			if (perYou.checkFlag(26)) addLinkToPlaceC(md, '"It is just you are in love with me"', 139, sType == "charm1v" ? "type=charm2v" : "type=charm2", '', '', "charmPerson('Kate', 2);");


		} else if (sType == "charm2" || sType == "charm2v") {
			md = WritePlaceHeader(false, sType == "charm2" || this.checkFlag(23) ? '' : 'td-left-large');
			if (sType == "charm2") this.showPersonRandom("kate18c", 2);
			else this.showPerson(this.checkFlag(23) ? "kate18cv1.jpg" : "kate18cv2.jpg");
			setPersonFlag('MrsGranger', 12, false);

			if (this.getCharmedLevel() == 2) {
				// Lover
				addPlaceTitle(md, "Kate Falling for a Charm Spell");
				md.write(
					'<p>You tell Kate, "Have you changed your mind, you do trust me, and care for me, don\'t you?"</p>' +
					'<p>You words subtly shape her thoughts as the spell courses through her body and mind, She continues removing her clothing, out of some residual memory of the previous times she had been charmed. ' +
					'She says "No, I don\'t trust..." and you interrupt her, "fully trust me, but you care for me."</p>' +
					'<p>She looks uncertain, and you continue "I do love you, and you can trust me absolutely". Kate looks at you, the spell erasing some of her concerns and doubts.</p>'
				);
				// Choices
				startQuestions();
				addLinkToPlaceC(md, '"Do you love me"', 139, sType == "charm2v" ? "type=charm3v" : "type=charm3");

			} else {
				// Slave
				addPlaceTitle(md, "Enslaving Kate");
				md.write(
					'<p>You firmly tell her "Kate! You may only call me ' + perYou.getMaster() + '!". She looks shocked and starts to walk towards you, clearly intent on striking you. You tell her "Stop!" and she hesitates as the spell shapes her thoughts.</p>' +
					'<p>You continue "You are violent and ungrateful for everything I have tried to do for you!". She starts walking again and you repeat "Stop! You will obey"</p>' +
					'<p>Kate hesitates and you continue "You <b>must</b> obey instantly and without thought, strip your clothing!"</p>' +
					'<p>Kate struggles to resist, but finally removes her clothing, looking at you unsure.</p>'
				);
				// Choices
				startQuestions();
				addLinkToPlaceC(md, '"Obey me slave"', 139, sType == "charm2v" ? "type=charm3v" : "type=charm3");
			}


		} else if (sType == "charm3" || sType == "charm3v") {
			md = WritePlaceHeader();
			this.showPerson("kate18d.jpg");

			if (this.getCharmedLevel() == 2) {
				// Lover
				addPlaceTitle(md, "Kate Falling for a Charm Spell");
				md.write(
					'<p>Kate answers, "Well I did like you, but all this with Davy...", and you reply,</p>' +
					'<p>"Be honest Kate, I love you, and you do love me", your answer is meant as a statement, not a question. Kate\'s expression changes,</p>' +
					'<p>"I think I do love you ' + perYou.getPersonName() + ' I think I was just confused with that bastard Davy!", she pauses and continues "I do love you!"</p>' +
					'<p>You can see he mind is made up, both because of the spell and you think due to her confused feelings. You notice her eyes change, the glow of magic recedes, and now you think of it, when she was charmed by Davy you never noticed anything about her eyes.</p>'
				);
				// Choices
				startQuestions();
				addLinkToPlace(md, 'make love to her', 139, "type=charm4");
			} else {
				// Slave
				addPlaceTitle(md, "Enslaving Kate");
				md.write(
					'<p>Kate looks angry as you call her a slave, but you reinforce your words, "Yes, an obedient, submissive slave!"</p>' +
					'<p>Her eyes flare and then the glow of magic recedes, you wonder if you went too far and prepare yourself for a lot of pain, but Kate says,</p>' +
					'<p>"Yes my ' + perYou.getMaster() + ' I will do <i>anything</i> you need or desire"</p>' +
					'<p>She is completely under your control, it would seem her repeated charming by Davy has made it simpler to charm her again and your words have had an increased effect. She is your slave.</p>'
				);

				// Choices
				startQuestions();
				addLinkToPlace(md, "take your slave", 139, "type=charm4");
			}

		} else if (sType == "charm4") {
			md = WritePlaceHeader();
			this.showPerson("kate18e.jpg");

			if (this.getCharmedLevel() == 2) {
				// Lover
				addPlaceTitle(md, "Loving Kate");
				md.write(
					'<p>You make love to Kate, she is a highly passionate lover, partially from the residue of the spell, but mostly from her nature.</p>'
				);
			} else {
				// Slave
				addPlaceTitle(md, "Fucking your Slave Kate");
				md.write(
					'<p>You take your slave, sating yourself on her body, caring little about her pleasure, but the spell ensures her arousal and easy orgasm.</p>'
				);
			}

			startQuestions();
			addLinkToPlaceC(md, "talk to " + this.getPersonName(), 139);

		} else if (sType == "bedroomforeplay") {

			clv = this.getCharmedLevel();
			if (clv === 0) {
				// Lover
				md = WritePlaceHeader(false, perYou.isMaleSex() && !isExplicit() ? "" : "td-left-med");
				this.showPersonRandomRorX("kate-home-lover-foreplay-" + (perYou.isMaleSex() ? "b" : "g"), isExplicit() ? (perYou.isMaleSex() ? 3 : 1) : 1);
				addPlaceTitle(md, "Arousing Kate");
				md.write(
					'<p>You embrace your lover, kissing her passionately. You both start to remove your closing and teasing each other with hands, mouths and toys.</p>'
				);
				startQuestions();
				addLinkToPlace(md, "now it is time to make love with Kate", 139, "type=bedroomsex&after=foreplay");
			} else if (clv == 2) {
				// Charmed Lover
				md = WritePlaceHeader(false, perYou.isMaleSex() && !isExplicit() ? "td-left-med" : "");
				if (isExplicit()) {
					if (perYou.isMaleSex())	{
						md = WritePlaceHeader();
						this.showPersonRandomX("kate-home-charmedlover-foreplay-b", 4);
					} else {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPersonRandomX("kate17hg", 2);
					}
				} else {
					md = WritePlaceHeader(false, perYou.isMaleSex() ? "td-left-med" : "");
					this.showPersonRandom("kate-home-charmedlover-foreplay-" + (perYou.isMaleSex() ? "b" : "g"), 1);
				}
				addPlaceTitle(md, "Arousing You Charmed Lover Kate");
				md.write(
					'<p>You embrace your charmed lover, kissing her passionately. You both start to remove your closing and teasing each other with hands, mouths and toys.</p>'
				);
				startQuestions();
				addLinkToPlace(md, "now it is time to make love with Kate", 139, "type=bedroomsex&after=foreplay");
				
			} else {
				// Slave
				if (perYou.isMaleSex())	{
					md = WritePlaceHeader();
					this.showPersonRandomRorX("kate-home-charmedslave-foreplay-b", isExplicit() ? 4 : 1);
				} else {
					if (isExplicit()) {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPersonRandomX("kate17hg", 2);
					} else {
						md = WritePlaceHeader();
						this.showPerson("kate-home-charmedslave-foreplay-ga.jpg");
					}
				}
				addPlaceTitle(md, "Slave Kate Serving You");
				md.write(
					'<p>You tell your slave to pleasure you and ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick your pussy') + '.</p>'
				);
				startQuestions();
				addLinkToPlace(md, "now take your slave", 139, "type=bedroomsex&after=foreplay");
				
			}
			if (perYou.FindItem(45) > 0 && !perYou.isMaleSex()) addLinkToPlace(md, 'you could take it to the next level with your strap-on', Place, 'type=bedroomstrapon');
			
		} else if (sType == "bedroomstrapon") {

			md = WritePlaceHeader(false, 'td-left-med');
			this.showPersonX("kate-home-strapon.jpg");
			addPlaceTitle(md, "Another Toy");
			
			if (clv === 0) {
				// Lover
				md.write(
					'<p>You take out your strap-on to continue the foreplay, and Kate suggests you move to the couch she has in her room.  You both move over there and you fuck her with your strap-on</p>'
				);
			} else if (clv == 2) {
				// Charmed Lover
				md.write(
					'<p>You take out your strap-on to continue the foreplay, and Kate suggests you move to the couch she has in her room.  You both move over there and you fuck her with your strap-on</p>'
				);
			} else {
				// Slave
				md.write(
					'<p>You take out your strap-on and tell Kate to lie on the couch in her room. She lies down and you fuck her with your strap-on</p>'
				);
			}
			
		} else if (sType == "bedroomsex") {

			clv = this.getCharmedLevel();
			var after = getQueryParam("after");
			if (clv === 0) {
				// Lover
				md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
				this.showPersonRandomRorX("kate-home-lover-sex-" + (perYou.isMaleSex() ? "b" : "g"), perYou.isMaleSex() ? (isExplicit() ? 4 : 3) : 1);
				addPlaceTitle(md, "Loving Kate");
				md.write(
					'<p>You make love to Kate, she is a highly passionate lover, partially from the residue of her time charmed by Davy, but mostly from her nature.</p>'
				);
			} else if (clv == 2) {
				// Charmed Lover
				md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? '' : 'td-left-med');
				this.showPersonRandomRorX("kate-home-charmedlover-sex-" + (perYou.isMaleSex() ? "b" : "g"), perYou.isMaleSex() ? (isExplicit() ? 4 : 2) : (isExplicit() ? 2 : 1));
				addPlaceTitle(md, "Loving Your Charmed Lover Kate");
				md.write(
					'<p>You make love to Kate, she is a highly passionate lover, partially from the residue of the spell, but mostly from her nature.</p>'
				);
			} else {
				// Slave
				if (perYou.isMaleSex()) {
					if (isExplicit()) {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPersonRandomX("kate-home-charmedslave-sex-b", 5);
					} else {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPersonRandom("kate-home-charmedslave-sex-b", 1);						
					}
				} else {
					if (isExplicit()) {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPersonRandomX("kate-home-charmedslave-sex-g", 2);
					} else {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPerson("kate-home-charmedslave-sex-ga.jpg");						
					}					
				}
				addPlaceTitle(md, "Fucking your Slave Kate");
				md.write(
					'<p>You take your slave, sating yourself on her body, caring little about her pleasure, but the spell ensures her arousal and easy orgasm.</p>'
				);
			}

			startQuestions();
			addLinkToPlaceC(md, "talk more to " + this.getPersonName(), 139);

		} else return false;		// Other events

		// Common for place 139
		if (plcMG === 177) addLinkToPlace(md, "look for Mrs Granger", 177);
		addLinkToPlace(md, "exit the house", 43);

		WritePlaceFooter(md);
		return true;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("poledance", 1);
		addPlaceTitle(md, "Kate\'s Dance");
		md.write(
			'<p>Kate confidently takes the stage, and her athletic abilities more than make up for any lack of experience she may have. For a person you considered nerdy and bookish, she throws herself around the pole like a pro, and stripping with little reserve. The only small issue is she is dancing for you, not the audience, but you can hardly complain about that!</p>' +
			'<p>After she dresses and sits with you for a while, and she comments how martial arts training can come in useful in many ways!</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);	
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 139 && this.isHere() && sType === "") {
			if (this.isCharmedBy("You") || ((this.checkFlag(22) || this.checkFlag(23)) && !this.checkFlag(18))) {
				// Her bedroom post davy and not a special encounter
				if (!this.checkFlag(7) || (this.checkFlag(8) && !this.checkFlag(9))) {
					addPopupLinkC(md, 'ask about her holiday photos you had once discussed', "Photos",
						this.addPersonString("holidayphoto2.jpg", "height:max%", "right") +
						'You ask Kate about her holiday photos that you had discussed. Kate smiles and walks over and rummages in her wardrobe, and returns with two photo albums, actual physical albums with printed photos! She puts them down on the side table near you.</p>' +
						'<p>She also takes out a photo from one of her notebooks and she shows it to you, saying it is a favourite one of some of her friends, but one not for parents to see.</p>' +
						(wherePerson("Diane") != 0 ? '<p>You notice one of her friends looks a lot like Diane White, the ' + getProsecutor() + ', and Kate says the woman was an older friend she had met on holidays, and her name is Diane! It must be the same person!</p>' : ''),
						false, "setPersonFlag('Kate',7);setPersonFlag('Kate',8);setPersonFlag('Kate',9)"
					);
				}
				if (this.checkFlag(7)) addLinkToPlace(md, 'look at the ' + (this.checkFlag(9) ? 'first ' : '') + 'photo album', Place, 'type=album1&page=1');
				if (this.checkFlag(9)) addLinkToPlace(md, 'look at the second photo album', Place, 'type=album2&page=1');
			}
		}
	}

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
	
			if (Place == 108) {
				//Kate @ her house waiting to kill you
				addComments('You attempt to cast the spell, but if fails to take effect... Evidently Kate is already under the effects of a charm spell...  Someone <i>else\'s</i> spell.');
				return "handled";
			}
			if (Place == 267) {
				// Post Defeat of Davy
				dispPlace(Place, 'kateko101');	//Move you to the Kate knocks you the fuck out page
				return "nofooter";
			}
			if (Place == 36) {
				//Kate in the Park
				if (!this.isCharmedBy("Davy")) {
					//only do this if she is still IN the park
					gotoPlace(47, 'type=clobbered');
					return "nofooter";
				} else {
					addComments('You attempt to cast the spell, but if fails to take effect... Evidently Kate is already under the effects of a charm spell...  Someone <i>else\'s</i> spell.');
					return "handled";
				}
			}
			// Her bedroom
			if (Place == 139) {
				if (!this.isCharmedBy("You")) {
					if (this.isCharmedBy("Davy")) {
						// Kate is charmed by Davy
						addComments('You attempt to cast the spell, but if fails to take effect... Evidently your target is already under the effects of a charm spell...  Someone <i>else\'s</i> spell.');
						return "handled";
					} else if (this.checkFlag(15)) {
						// Kate has the necklace
						addComments('You read a spell.... but nothing happens as Kate is wearing the necklace.');
						return "handled";
					} else if (this.checkFlag(22) || this.checkFlag(23)) {
						setCommentsNoClick(
							'<div style="margin-top:1em;margin-bottom:1em;margin-left:2em;margin-right:2em;cursor:default;">' +
							'Really!! You went to all that effort and you just want to charm her?'
						);
						addOptionLink("comments", 'No', "dispPlace(undefined,'','No, Kate is fine as she is')");
						addOptionLink("comments", 'Yes I do!', "CastCharmSpell('Kate',139,4,'type=charm1v','You cast the spell and you catch Kate by surprise...')");
						return "handled";
					} else if (this.checkFlag(18)) {
						// Kate's a Bitch
						// Are you hidden?
						if (isInvisible() || perYou.checkFlag(16)) {
							// Yes, hidden
							CastCharmSpell("Kate", 139, 4, 'type=charm1');
							return "nofooter";
						} else {
							// You are visible in some way
							gotoPlace(35, 'type=clobberedvisible');
							return "nofooter";
						}
					} else {
						// You try to cast charm and she can see you in some way (or hear you)
						gotoPlace(35, 'type=clobbered');
						return "nofooter";
					}
				} else {
					addComments('Kate is already charmed by you!');
					return "handled";
				}
			}
			//Pond
			if (Place == 421) {
				if (!isSpellKnown("Shielded Charm")) {
					// Don't know Shielded Charm Yet
					addComments('Don\'t cast the spell here. It is too public.');
					return "handled";
				} else {
					if (this.isHere()) {
						if (!this.isCharmedBy("Davy")) {
							//only do this if she is still IN the park
							gotoPlace(47, 'type=clobbered');
							return "nofooter";
						} else {
							addComments('<p>You recite the spell, it fails, it seems she is under the effect of a charm spell by someone else.</p>');
							return "handled";
						}
					}
				}
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls
	// ids 241-249 are reserved for photos only
	
	per.isPhoneable = function() {
		// Can you call them?
		return checkPlaceFlag("Hotel", 11) && Place == 269;
	};

	per.callThem = function() {
		if (Place == 269) {
			if (!this.checkFlag(22) && !this.checkFlag(23) && !this.isCharmedBy("You")) WriteComments("You try to call Kate to invite her to join you at the pool for a swim, but there is no answer.");
			else {
				gotoPlace(Place, 'type=katepool');
				receiveCall('', 'You call Kate to invite her to join you at the pool for a swim, and she agrees to meet you there shortly');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};

	per.addPersonPhoneCall = function() {
		if (Place != 139 && Place != 177 && this.place == 1 && this.other == 7 && Math.floor((nTime - this.charmedTime) / 12) >= 1 && !this.checkFlag(26)) {
			// SMS 1, one hour after arriving home after her mother hurt/you pick up the vase
			if (makeCall(true, 240)) this.setFlag(26);
		}
		if (this.place == 1000 && this.checkFlag(24)) {
			// Uncertain
			if (checkPersonFlag("MrsGranger", 16) && this.hoursCharmed("skip") >= 24) {
				// Asked her mother
				if (!isDay() && !this.checkFlag(37)) {
					if (makeCall(true, 255)) {
						this.setFlag(37);		// Initial SMS after uncertain
						this.charmedTime = nTime;
					}
				}
				// Davy imprisoned
				else if (!isDay() && !this.checkFlag(38) && perDavy.place == 161) {
					if (makeCall(true, 256)) {
						this.setFlag(38);		// Second SMS after uncertain
						this.charmedTime = nTime;
					}
				}
				// Ok now
				else if (!isDay() && !this.checkFlag(39) && isCharmedBy("Charlie") && Place != 35 && Place != 177) {
					if (makeCall(true, 257)) {
						this.setFlag(39);		// Last SMS after uncertain
						this.charmedTime = nTime;
						this.place = 1;
						this.setFlag(23);	// Now uncharmed (and unprotected) ally
					}
				}				
			}
		} 
		return false;
	};
	per.getPersonSMS = function(id) {
		if (id == 240) return receiveSMS('Kate', 'Hey ' + perYou.getPersonName() + ' can we meet? I am at my place, please can you come here?');
		if (id > 240 && id < 250) return receiveSMS('', '', (isExplicit(true) ? 'Explicit/' : '') + 'katephoto' + (id - 240) + (isExplicit() ? (id < 247 ? '.gif' : '.jpg') : (id < 245 ? '.gif' : '.jpg')));
		if (id == 255) return receiveSMS('Kate', 'Umm, Hi ' + perYou.getPersonName() + ' Mama told me to call you...I am staying with a friend <b>not</b> in Glenvale. Please give me some more time.', 'sms2.jpg');
		if (id == 256) return receiveSMS('Kate', 'Hi ' + perYou.getPersonName() + ' someone told me you have Davy a prisoner, thanks! He deserves anything you do to him!', 'sms3.jpg');
		if (id == 257) return receiveSMS('Kate', 'Hey ' + perYou.getPersonName() + ', Mama told me to tell you I am back in town and give you a show. I am ok with you now...I am sure this is not what she meant by a show, but TaDa!', 'sms4.jpg') + receiveSMS("Kate", "Come by and visit some time");
		return '';
	};
}
