// Event: Take Bambi to room - Charmed version

function ShowPlace182(stype)
{
	var md = WritePlaceHeader();

	var perBambi = findPerson("Bambi");
	var myLord = perBambi.getYourNameFor();
	var myName = perYou.getMaster();
	var be = perBambi.checkFlag(16) ? "be" : "";

	if (stype == "bambichat1") {
		// Chat about her career
		perBambi.showPerson("bambi16" + be + ".jpg");
		addPlaceTitle(md, "Bambi\'s Career");
		perBambi.setFlag(2);

		md.write(
			"<p>As you make your way to the back of the bar, the room where usually you and Bambi spend your intimate time, you see the riding crop again and you become curious about Bambi’s past with visitors. Bambi smiles and asks if she can change into something more appropriate. You give permission, and she returns a little while later dressed in some lovely lingerie,</p>" +
			'<p>"All right, Bambi! Talk to me about your career at the Hotel. The stuff you were doing with customers in this room.", you ask Bambi after she closed the door behind you.</p>' +
			'<p>"I was an escort, more or less, ' + myLord + '! I entertained them, I gave them what they wanted for their money! Regularly I slept with them or gave them a blowjob.", she answers in a reserved voice.</p>' +
			'<p>"Any fetishes involved? Anything interesting?", you ask your slave. While you do this you sit down in the couch in the middle of the room and order her to kneel next to it. She obliges without a word.</p>' +
			'<p>"' + myLord + '! I was a slut… I am not proud of what I’ve did back then. Please…I don’t want you to know how many men I had sex with or what kind of sick things I had to for them.", Bambi begs and breaks down. She’s almost crying, clearly disturbed by the topic.</p>' +
			'<p>"Answer me! I don’t care what kind of person you were. Now you are mine, you have a new personality and a new purpose. So, out with it!", you push her more.</p>' +
			'<p>"As you wish, ' + myLord + '! I am your humble servant! There were some clients who liked BDSM and we roleplayed that I was the mistress and they were the slaves. Other times I was a caring girlfriend whom they only liked to talk to. There were a few men who liked hardcore things like caning and bondaging. Oddly though, my most bizarre experience was with a young man who wanted to watch movies with me while both of us were naked and eating fruits only. We didn’t have sex or anything, just sitting next to each other on the couch without clothes. He was a strange guy…", she looks up to you, her eyes vibrate with a purple glow. You can see she is trying to hold herself from crying and trying to show you respect and obedience.</p>' +
			'<p>"Hmm…odd. You seemed to like this when we first met.", you put one hand on her head and play with her hair a bit.</p>' +
			'<p>"As I have mentioned I did not care who I slept with, I just wanted money to support myself better. I didn’t want to talk about this, because I was afraid that you would throw me away if you knew about more about my past self.", Bambi answers with long pauses as she is enjoying your hand against her face, carefully putting her head next to your palm, fondling her nose to it and closing her eyes in the action. She is like a purring kitten enjoying the moment.</p>' +
			'<p>"You have to be honest with me! I am going to use you for many things and I can’t have you lying to me. I have told you… I am not mad at you for who you were, but if you ever hold me back any information you know I will be unforgiving and disappointed. You don’t want that, do you?", you playfully stroke her hair, then grab a handful of it and turn her head to face yours. Bambi opens her eyes and looks at you with honest love, the fear and skepticism  are gone from her face.</p>' +
			'<p>"I understand! I won’t fail you again, I promise ' + myLord + '!", she firmly states.</p>' +
			"<p>Both of you stand up (Bambi after you, of course) and you pull yourself towards her and kiss her neck. After a minute or two the kisses turn into slow, soft bites.</p>" +
			'<p>"So let it be!", you say after you are finished.</p>'
		);


	} else if (stype === "") {
		// Entered the room with her
		perBambi.showPerson("bambi17" + be + ".jpg");

		if (perBambi.checkFlag(4)) perBambi.showPersonAnon("bambimother.jpg", "40%");

		addPlaceTitle(md, "Bambi's Room");
		md.write(
			'<p>Bambi is so overwhelmed by your invitation to the bedroom.  She can\'t wait to show you just how good a slave she can be, quickly preparing herself for your use.</p>' +
			'<p>"Oh ' + myLord + '," she says in a soft moan. "I\'ve never loved anyone as much as I love you. Please command me ' + myName + ', I live to serve you, and only you..."</p>'
		);

		if (!perBambi.checkFlag(8)) {
			// Just charmed her, haven't taken the stone yet
			md.write('<p>You notice a familiar stone in Bambi\'s room.  It would seem that such stones make excellent paper weights... or book ends.</p>');
		} else if (!perBambi.checkFlag(4)) {
			// Just charmed her, haven't taken the stone yet
			md.write('<p>You glance to the place where you saw the stone earlier. Nearby you see a framed photo of Bambi and an older woman.</p>');
		}

		startQuestions("Accept her devotion and...");
		addLinkToPlace(md, 'enjoy Bambi\'s services', 182, 'type=bambifuck');
		if (perYou.isMaleSex()) addLinkToPlace(md, 'get a blowjob', 182, 'type=bambibj');
		else addLinkToPlace(md, 'have her lick you', 182, 'type=bambibj');

	} else if (stype == "bambifuck") {
		// Fuck her
		if (perYou.isMaleSex()) perBambi.showPersonRandomRorX("bambi7b" + be, isExplicit() ? 4 : 2);
		else perBambi.showPersonRandomRorX("bambi7g" + be, isExplicit() ? 2 : 1);

		addPlaceTitle(md, "Bambi");

		md.write(
			'<p>Bambi pushes you onto the couch, straddles you in a single fluent motion and moves her lips close to yours. “I am so happy to be of service again, my ' + perYou.getLord() + '...” She purrs out the last word in a deep, sensual voice, places her arms on your shoulders and presses her beautiful, naked body against yours. “Please, allow your faithful servant to tend to your needs...”</p>' +
			'<p>You like how she uses these words to drag the moment out for precious seconds, allowing the subtle scent of her perfume to fill your nose and the warmth of her breath to caress your skin as the tension slowly builds up until you finally get to taste her sweet lips in a long, tender kiss.</p>' +
			'<p>And what a kiss it is.</p>' +
			'<p>Your tongues mingle, lips touch, soft, muffled gasps fill the room. Bambi has a way of subtly guiding you along, taking the lead often without you even realizing it and letting your body melt away under her tender care.</p>' +
			'<p>With each passing minute another piece of your clothes hits the floor, and every inch of exposed skin unveils new ways for her to fulfill desires you did not even know you had and guide you deeper into a sensual haze of lust, pleasure and just a sliver off pain to spice things up.</p>' +
			'<p>By the time ' + (perYou.isBornMale() ? 'your manhood finally pushes into her' : 'you are finally grinding your folds against hers') + ', the actual act feels like an afterthought. A grand finale to Bambi\'s performance as you both prepare to share a last, intense climax and collapse in each other arms to bask in the afterglow.</p>'
		);			

	} else if (stype == "bambibj") {
		// Oral
		if (perYou.isMaleSex()) perBambi.showPersonRandomRorX("bambi12b" + be, isExplicit() ? 4 : 1);
		else perBambi.showPersonRandomRorX("bambi12g", isExplicit() ? 2 : 1);

		addPlaceTitle(md, "Bambi");
		if (perYou.isMaleSex()) {
			md.write(
				'<p>A blowjob doesnt even get close to fully utilize Bambi\'s skills, but it is a good way to pass a few minutes when you are at the hotel and time is short, and Bambi certainly knows how to make the most of it.</p>' +
				'<p>Bambi treats your shaft as if it is the most delicious treat she ever had.</p>' +
				'<p>Her tongue expertly caresses your manhood, circling the tip and teasing the most sensitive veins in-between short bouts where she roughly forces the entire length into her throat and bobs her head back and forth, always alternating between sloppy and sensual, rough and tender, completely devoted to your pleasure and certain you are enjoying yourself immensely.</p>' +
				'<p>You want these moments to last forever, and while Bambi is able to drag them out, if you want her to, she also takes delight in her ability to suddenly and unexpectedly push you over the edge, and with a sudden rush of a thousand small electric shocks hitting your body, you unload your seed into your slave\'s mouth.</p>'
			);
		} else {
			md.write(
				'<p>Limiting Bambi to licking your pussy doesn\'t even get close to fully utilizing her skills, but it is a good way to pass a few minutes when you are at the hotel and time is short, and Bambi certainly knows how to make the most of it.</p>' +
				'<p>Bambi treats your pussy as if it is the most delicious treat she ever had. Her tongue expertly caresses your folds, circling the little nub and teasing your most intimate areas in-between short bouts where her fingers enter your twitching sex to roughly stimulate your most sensitive spots, always alternating between sloppy and sensual, rough and tender, completely devoted to your pleasure and certain you are enjoying yourself immensely.</p>' +
				'<p>You want these moments to last forever, and while Bambi is able to drag them out, if you want her to, she also takes delight in her ability to suddenly and unexpectedly push you over the edge, and with a sudden rush of a thousand small electric shocks hitting your body, you reach your peak, tensing up under the intense  rush of pleasure as Bambi leaps up your juices.</p>'
			);			
		}
	}

	//*******************************************************************
	// Common questions when meeting charmed Bambi
	startQuestions(stype !== "" ? "Afterwards..." : "");

	if (!perBambi.checkFlag(8)) {
		// Just charmed her, haven't taken the stone yet
		addQuestionCO(md, 'grab the stone off the desk', "Bambi", 10701);
	} else if (!perBambi.checkFlag(4)) {
		// Saw the picture
		addQuestionC(md, '"Nice photo Bambi, who is she?"', "Bambi", 10702);
	}

	if (nMana >= 50 && wherePerson("Donna") === 0) addQuestionC(md, '"Have there been any new guests I should know about, my pet?"', "Bambi", 11900);
	if (perKurndorf.getQuestCrypt() == 6) addQuestionC(md, '"Do you know anything about Kurndorf?"', "Bambi", 2206);
	else if (perKurndorf.getQuestCrypt() == 10) addQuestionC(md, '"How do I find Kurndorf\'s grave?"', "Bambi", 2210);

	if (!isDay()) {
		if (wherePerson("Lauren") != 269 && ((wherePerson("Diane") > 0 && !checkPersonFlag("MrsGranger", 1)) || !isArrestPossible()) && !perBambi.checkFlag(6)) addQuestionC(md, '"Anything interesting happening at the hotel?"', "Bambi", 11901);

		perBambi.addSleepLink(md, "go to bed for the night with Bambi", "",
			"<p style='position:absolute;top:5%;left:2%;cursor:pointer;margin-top:-12px;font-size:x-large;color:black;text-shadow:-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;'><b>Going to Bed with Bambi</b></p>" +
			'<p style="position:absolute;right:2%;bottom:4%;cursor:pointer;font-size:1.1em;width:50%">Bambi invites you to stay for the night so she can serve you and show her considerable talents. You do not need another invitation as Bambi lies down ready to show you her devotion.',
			"bambi15" + be + ".jpg", true, 124, '', 'In the morning you join Bambi for breakfast in the bar', "background-color:#FFFAEA;top:10%;left:5%;width:85%;height:80%;padding:0"
		);
	}
	addLinkToPlace(md, 'go back down to the bar', 124);

	WritePlaceFooter(md);
}