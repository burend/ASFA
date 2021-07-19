/****************************************************************
				 Mrs Robbins Reponse Bank
 ****************************************************************/
function RepliesMrsRobbins(nR)
{
	var bCharm = per.isCharmedBy("You");
	var myName = per.getYourNameFor();
	var bDCharm = per.isCharmedBy("Davy");
	var perG = per;
	var perT = findPerson("Tina");

	if (nR == 500)  // Where is Davy's bedroom?
	{
		addComments('"Oh, it is down the hall, second on the left", she gestures towards the room."');
		setPlaceKnown("DavysRoom");
	}
	else if (nR == 640)  // v64 = Mrs Robbins Path
	{
		if (!bDCharm) addComments('"Davy? He was here earlier and mentioned your name. Then he said something like \'Dai Chu\' and everything went blank. I woke up to see you here."');
		else addComments('"Oh Davy," Mrs. Robbins murmurs to herself. "My son. He is such a good boy. He knows how to treat his mother."');
		perG.setFlag(1);
	}
	else if (nR == 613) {
		// Have you seen Mr Beasley   //  NOT YET IMPLIMENTED
		if (bDCharm) addComments('"Your teacher? I don\'t even know the man, I\'m sure my darling Davy has never met with him here."');
		else addComments('"Your teacher? I don\'t even know the man, I\'m sure Davy has never met with him here."');
		perG.setFlag(3);
	}
	else if (nR == 631) {
		// v63 = Mrs Robbins CHARMED path
		perT.other = 3;
		addComments('');
	}
	else if (nR == 5901) {
		// v59 = Blue Bottle Path - Set to One by Monique when she tells you about the Robbins
		perDavy.setQuestBlueBottle(2);
		if (!bCharm) {
			if (bDCharm) {
				// still under davy's spell
				addComments('"Davy has never acted strangely," says Mrs. Robbins, rubbing her crotch. "But I never realised how attractive my son was until he opened the blue bottle today."');
			}	else addComments('"Davy?  Well, he did begin acting strangely after he opened the blue bottle.  That\'s when he said those words..." she says, trying to remember what happened after that.');
		} else {
			addComments('"Yes, ' + myName + '.  It began when he opened the bottle this morning.  I believe that\'s when he enslaved me, ' + myName + ', because I don\'t remember much between then and when I my true ' + myName + ' took me."');
		}
	}
	else if (nR == 5902) {
		perDavy.setQuestBlueBottle(3);
		if (!bCharm) {
			if (bDCharm) {
				// still under davy's spell
				addComments('"Our special heirloom. Why are you asking so many questions about Davy?  Does he know you\'re here?"');
			}	else addComments('"Our special heirloom. That bottle has been passed down through my family for generations. Since... well, a long time, at the very least!"');
		}	else {
			addComments('"It is an heirloom of my family, ' + myName + '.  Or, at least, it was.  Now all that I am, and all that I have is yours, ' + myName + '.  Take anything you like.');
			if (!perT.isCharmedBy()) addComments(' Including my daughter if she suits you. Yes!  You must take her ' + myName + '!  She must learn what it means to serve you as I do."');
			else addComments('"');
		}
	}
	else if (nR == 6100) {
		// v61 = Tina Charmed
		addComments('"Oh yes, ' + myName + '!  She has a young and supple body that I\'m sure would please you, ' + myName + ', plus my son Davy mentioned something about her being a witch.  I\'m sure she would make an excellent <i>slave</i> for you," she says getting rather excited. "I threw her into the bedroom so Davy could take her when he got back.  Please, ' + myName + ', take her before my unworthy son returns!  He does not deserve her!"');
	}
	else if (nR == 5903) {
		perDavy.setQuestBlueBottle(4);
		if (!bCharm) {
			if (bDCharm) {
				// still under davy's spell
				addComments('"I don\'t have it anymore.  I sold it for ' + sCurrency + '2000 to that ' + perGates.getPersonName() + ' fellow.  I\'m sure Davy will be very pleased with me.  He may even fuck me again.  Mmmm..." She trails off, evidently lost in memory.');
			}	else addComments('"Oh, I\'m sorry ' + myName + '. When Davy opened the bottle he acted so odd. I thought that he was sick then he said those strange words <i>Dai Chu</i> and I loved him more than a mother should. After he left, ' + perGates.getPersonName() + ' came by and offered me ' + sCurrency + '2,000 for the bottle. So I... I sold it to make Davy happy about the money."');
		} else {
			addComments('"Oh, I\'m sorry ' + myName + '!" she says, getting down on her knees to beg forgiveness. "If I had known I was to be <i>your</i> slave instead of my worthless son Davy I would never have...  I...  I sold it, ' + myName + ' - to ' + perGates.getPersonName() + '. I gave all the money to Davy.  Otherwise it would be yours, just as I am."');
		}
	}
	return true;
}


// Initialise
function initialiseMrsRobbins()
{
	// Mrs Robbins
	addPerson("Mrs. Robbins", 176, "Geraldine", '', false);
	per.charmThem(1, "Davy");
	
	per.Replies = RepliesMrsRobbins;
	
	per.getPersonAddress = function() { return this.checkFlag(2) ? '36 Yoolaroo Dr, Glenvale' : ''; };
	
	per.getPersonName = function(full) { return full !== true && this.isCharmedBy("You") ? "Slave Geraldine" : this.name; };
	
	per.getPossessionFace = function() { return this.isCharmedBy("You") ? 'robbinsc-face' : 'robbinsu-face'; };
	
	per.whereNow = function()
	{
		if (this.place == 176 && Place == 82 && this.isCharmedBy("You") && isCharmedBy("Tina", "You")) return Place;
		return this.place;
	};
	
	per.isPersonInfo = function() { return this.isCharmedBy("You"); };
	per.getPersonInfo = function() {
		if (Place == 176 && isCharmedBy("Tina")) {
			return this.addPersonString("robbins8b.jpg", "height:max%", "right") +
				"Geraldine and Tina Robbins, mother and daughter of the Robbins family. You have taken them from Davy and made them your own.<br><br>" +
				"Each has their own qualities, Tina is beautiful and knows the way of witches and the occult. Geraldine is pretty, mostly ignorant of the occult, but she is determined and domineering...when you let her.";
			
		} else {
			return this.addPersonString("robbins5.jpg", "height:max%", "right") +
				"Mrs Robbins has been charmed by her very own son! You knew she acted weird when you asked about Davy. She talked like she was obsessed about him! An effect that only the mind control spell brings out. Now, she’s only interested in you and being your servant. After you broke Davy’s spell it was the most logical step to bring Mrs Robbins under your power. However, she’s dumb as a rock and is no big use to you. She doesn’t know anything about the world of magic and what her son’s plans were. In compensation of her lack of knowledge she offered the house and everything in it, even her daughter to you!</p>" +
				"<p>She told you that the tales were true, the Robbins family really is a descendant of Kurndorf and they were a force to be reckoned with in the last century. Their power has decreased in the years, that’s why they needed to sell the mansion that now Richard Gates owns.</p>" +
				"<p>Mrs Robbins ushers you in the house immediately after you rang the bells. She is eager to serve you in all the ways possible!";
		}
	};
	
	per.showEventPopup = function()
	{
		if (sType !== "") return false;
		
		// Initial encounter
		if (Place == 176 && !this.checkFlag(2)) {
			// See the security guard
			showPopupWindow("Mrs. Robbins",
				this.addPersonString("robbins0.jpg", "height:max%", "right") +
				"Mrs Robbins, the mother of your nemesis Davy has a lot common with her son. She’s rude, pompous and doesn’t make a good first impression in you. Mrs Robbins must be around her early 40’s but she keeps herself in good shape. Something is odd though, as if you feel some kind of force around her.</p>" +
				"<p>The house itself is large and radiates wealth with all the exotics statues, paintings and furnitures. You can only see glimpses of the house and rooms because Mrs Robbins is always on guard and stopping you from further exploring the house on your own. You should talk to her, she’s Davy’s mother after all. She must know something!</p>" +
				"<p>Before you can ask her she frowns at you and tersely introduces herself as Geraldine Robbins. Her speech is polite but similarly terse as she says,</p>" +
				(perYou.isBornMale() ?
					'"My daughter is not receiving callers, <i>ever</i> again", and you see her glance at a bedroom door down the hall leading from the room you are in. She almost loses interest in you, seeming to be thinking about something more appealing.' :
					'"My darling son did not send you did he? Well he should of!", and you see her glance at a bedroom door down the hall leading from the room you are in. She reaches out to touch your shoulder, "Why not wait somewhere more comfortable for him?"'),
				"setPersonFlag('MrsRobbins',2)"
			);
			return true;
		}
		
		// Entering Mrs Robbins Bedroom with Tina and you are female and Geraldine is charmed by Davy
		if (Place != 82 || sType !== "" || !this.isCharmedBy("Davy") || checkPlaceFlag("RobbinsHouse", 9) || perYou.isBornMale()) return false;
		
		setPlaceFlag("RobbinsHouse", 9);
		showPopupWindow("Mrs Robbins",
			this.addPersonString("robbins.jpg", "height:max%", "right") +
			(getPersonOther("Tina") === 0 ? 
				'Mrs. Robbins screams, "Another girl for my lovely son! In you go to my bedroom you bitch and don\'t come out until Davy has cast his pretty spell."' :
					'Mrs. Robbins throws you back into the bedroom. "I told you to get into the bedroom you bitch!  Davy hasn\'t come home to claim you yet and you\'re not leaving till he does!') +
			'<br><br>She slams and locks the door to the bedroom');
		return true;

	};
	
	// Events for Geraldine
	per.showEvent = function()
	{
		var md, perTina;
	
	
		if (Place == 269) {
			if (sType == "geraldinepool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("robbins-pool.jpg");
				addPlaceTitle(md, "Swimming with Geraldine");
				md.write(
					'<p>Geraldine arrives, dressed in a pink bikini, and she seductively poses for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=geraldinepoolsex');
				addLinkToPlaceC(md, 'say goodbye to Geraldine', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "geraldinepoolsex") {
				md = WritePlaceHeader();
				this.showPerson("robbins-pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Geraldine");
				md.write(
					'<p>You ask Geraldine to play with you more privately, and she seductively removes most of her swimsuit and lies back waiting for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Geraldine', Place);
				WritePlaceFooter(md);
				return true;
			}
		} else if (Place == 176) {
		
			if (sType == 'charmgeraldine1') {
				md = WritePlaceHeader();

				PlaceI(8, 72); // put Davy's Envelope to Mrs Beasley in Teachers Lounge

				this.showPerson("robbins2.jpg");
				addPlaceTitle(md, "Mrs. Robbins Under A Charm Spell");
				md.write(
					'<p>"What was that, my dear?" Mrs. Robbins asks absently as her eyes begin to take on the characteristic color of your new slaves.</p>' +
					'<p>Mrs. Robbins has fallen under the power of your spell. At first she denies the desire building up throughout her body. She stutters for a moment then ceases to talk, too bothered by the new sensations prickling across her skin.</p>'
				);
				startQuestions();
				addLinkToPlace(md, "wait for the spell to take effect", Place, 'type=charmgeraldine2');
				addLinkToPlace(md, "exit the house", 43);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == 'charmgeraldine2') {
				md = WritePlaceHeader();

				this.showPerson("robbins3.jpg");
				addPlaceTitle(md, "Mrs. Robbins Under A Charm Spell");
				md.write(
					'<p>No longer able to restrain herself, Mrs. Robbins slides her fingers between the folds of her blouse.</p>' +
					'<p>"I feel so odd," she manages to explain before a ripple of desire makes her body shiver. ' +
					'"You really must excuse me ' + perYou.getPersonName() + ', but I\'m afraid I must go to the bathroom for a little while," she says.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, "tell her to stay", Place, 'type=charmgeraldine3');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == 'charmgeraldine3') {
				md = WritePlaceHeader();

				this.showPerson("robbins4.jpg");
				addPlaceTitle(md, "Mrs. Robbins Under A Charm Spell");

				md.write('<p>"Oh ' + perYou.getPersonName() + '," Mrs. Robbins begins removing her blouse. "I\'m so glad you came to visit me today. I really get quite lonely sometimes and having ');
				if (perYou.isMan()) md.write('a man');
				else md.write('another woman');
				md.write(' with me is so exciting. Tell me, do you ever think of how much more experienced older women are?"</p>');

				if (isCharmedBy("MrsGranger")) // Have Charmed Mrs Granger
				{
					md.write('<p>"Yes," you say with a knowing grin. "I hear they <i>really</i> know how to please in bed if properly motivated."</p>');
				}
				else  //  Haven't Charmed her
				{
					md.write('<p>You gulp a response, "I... ah... never really thought about it before, Mrs. Robbins. I suppose older women could be fun."</p>');
				}
				startQuestions();
				addLinkToPlace(md, "wait for her to seduce you", Place, 'type=charmgeraldine4');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == 'charmgeraldine4') {
				md = WritePlaceHeader();
				
				this.showPerson("robbins5.jpg");
				addPlaceTitle(md, "Geraldine Under A Charm Spell");
				md.write(
					'<p>"You silly ' + perYou.getSex() + ' If we are going to get to know each other a lot better then I insist that you call me by my first name: Geraldine."</p>' +
					'<p>Geraldine removes her top and steps out of her jeans.  She leans back enticingly. "What do you think, ' + perYou.getPersonName() + '?" she asks. ' +
					'"I can see by your expression that we are going to have a lot of fun here."</p>'
				);
				startQuestions();
				addLinkToPlace(md, "order her to fondle her breasts", Place, 'type=charmgeraldine5');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == 'charmgeraldine5') {
				md = WritePlaceHeader(false, 'td-left-med');

				this.showPerson("robbins6.jpg");
				addPlaceTitle(md, "Geraldine Under A Charm Spell");
				md.write(
					'<p>"My breasts! I thought that you would never ask, ' + perYou.getPersonName() + '," she says, leaning in close. "Here you go, my darling. For your lips only."</p>' +
					'<p>Suddenly Geraldine loses her breath. A wave of lust ripples throughout her body, removing her last independent thoughts.  She hops onto the table.</p>' +
					'<p>"Ahh..." she moans. "I can\'t stand it anymore. Please fuck me you adorable ' + perYou.getSex() + '! Fuck me until I scream."</p>'
				);
				startQuestions();
				addLinkToPlace(md, "take the woman", Place, 'type=charmgeraldine6');
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == 'charmgeraldine6') {
				md = WritePlaceHeader();
				perTina = findPerson("Tina");

				if (perYou.isMaleSex()) {
					if (isExplicit()) this.showPersonRandomX("robbins7b", 2);
					else this.showPersonRorX("robbins7b.jpg");
				} else this.showPersonRorX("robbins7g.jpg");

				addPlaceTitle(md, "Geraldine Under A Charm Spell");

				md.write(
					'<p>Geraldine Robbins spreads her legs for you. In moments you embrace to begin a frenzy of love making. Even as you fall back exhausted, the woman still pleads for you. ' +
					'"Please, ' + perYou.getPersonName() + '," she says.  "I\'ll do anything for more. All you have to do is ask and I\'ll please you in any way you want.  Just give me more!"</p>' +
					'<p>"No more," you reply.  "I\'ve had enough.  For now."  Then your eyes pick up an almost predatory sheen as you move in for the kill.</p>' +
					'<p>"But you are right about one thing, Geraldine...  You <i>will</i> do anything for me, wont\'t you. Anything I say, anything at all."  She only nods in agreement.  "What does that make you, Geraldine?" you ask.' +
					'<p>She thinks for but a second, as if she already knew the answer before you even asked.  "Your slave," she purrs, crawling towards you.' +
					'<p>"And what does that make me?" you ask, closing the net permanently around your newly acquired slave.' +
					'<p>"My ' + perYou.getMaster() + '," she says, relishing her newfound role in your relationship.<p>' +
					'<p>"What do you live for, Slave?" you ask her forcefully.</p>' +
					'<p>"I live to serve. I exist for your pleasure. I obey without question.  I belong to you! ' + perYou.getMaster() + '..." she says, rolling the last word over her tongue as if it was a treat just for her to say it in your presence.' +
					'<p>"Excellent," you say, reaching down and running your hand through her hair possessively.'
				);
				startQuestions();
				if (perTina.isCharmedBy()) {
					addPopupLinkToPlace(md, 'talk more with her', 176, '', "Tina...",
						perTina.addPersonString("tina10.jpg", "height:max%", "right") +
						'You start to ask Geraldine something and you hear a door open and you see Tina walk into the room. She steps over to a drinks cabinet and pours all three of you a glass of red wine. She toasts you,<br><br>' +
						'"My ' + perYou.getMaster() + '! Take us as you desire". She then addresses her mother, "Mom, I am returning to my bedroom, except when ' + perYou.getMaster() + ' requires us"',
						'setPlaceKnown("TinasRoom");movePerson("Tina",83)', '', true
					);				
				} else addLinkToPlaceC(md, 'talk more with her', 176);
				addLinkToPlace(md, "exit the house", 43);
				WritePlaceFooter(md);
				return true;
			}				
		}
		
		if (Place != 82) return false;
		
		var herName = this.getPersonName();
		perTina = findPerson("Tina");
		
		if (sType == "geraldineprivate") {
			// Enter the room
			md = WritePlaceHeader();
			if (perTina.isCharmedBy()) this.showPerson("robbins9b.jpg");
			else this.showPerson("robbins9a.jpg");
			addPlaceTitle(md, "Geraldine in Davy's Bedroom");

			md.write(
				'<p>You tell Mrs Robbins that it would be nice to speak to her privately. She smiles and leads you into ' + (perTina.isHere() ? 'a' : 'her') + ' bedroom.</p>' +
				'<p>She sits on her bed and asks, "Well, we didn\'t just come here to talk did we?"</p>'
			);

			// Questions
			startQuestions("You didn't, you came here to...");

			if (perYou.isMaleSex()) {
				addLinkToPlace(md, 'fuck her', Place, 'type=geraldinefuck');
				addLinkToPlace(md, 'get a blowjob', Place, 'type=geraldinebj');
			} else {
				addLinkToPlace(md, 'have her lick you', Place, 'type=geraldinebj');
				addLinkToPlace(md, 'have sex with her', Place, 'type=geraldinefuck');
			}
			this.addDancingLink(md, 'talk to Geraldine about dancing in the club',
				'You ask Geraldine about the Avernus club and before finish she says,</p>' +
				'<p>&quot;I have not been...oh dancing ' + perYou.getMaster() + ' certainly!&quot;. You ask her what she meant by \'have not been\' and she replies,</p>' +
				'<p>"' + perYou.getMaster() + ' I used to regularly go to the club on their BDSM play nights, but not for a while now". For now you decide to leave it and you call Jade to arrange a dance for Geraldine. Jade agrees but comments "Domme Geraldine dancing...".'
			);
			if (!perTina.isHere()) {
				this.addSleepLink(md, "go to bed for the night with Geraldine", "Bedding Geraldine",
					'You call Geraldine to join you. She is very happy, and puts on a show for you, dressing up and then stripping for you.<br><br>One thought crosses your mind before you lie down for the night, why does she own a dominatrix style outfit?',
					"robbins12a.jpg", true, 82, '', 'When you wake in the morning Geraldine has left to prepare breakfast.'
				);
			}
			addLinkToPlace(md, 'return to the living room', 176);
			addLinkToPlace(md, 'leave the house', 43);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "geraldinefuck") {
			// Fuck her
			md = WritePlaceHeader(false, perYou.isMaleSex() ? "td-left-med" : "");
			if (isExplicit()) {
				if (perYou.isMaleSex()) this.showPersonRandomX("robbins11b", 5);
				else this.showPersonRandomX("robbins11g", 2);
			} else {
				if (perYou.isMaleSex()) this.showPerson("robbins11b.jpg");
				else this.showPerson("robbins11g.jpg");
			}

			addPlaceTitle(md, herName);

			if (perYou.isMaleSex()) {
				md.write(
					'<p>“You will undress. You will bend over your bed, and you will present your pussy to me, understood?”</p>' +
					'<p>Pretty much from the first time Geraldine had given herself to you, you noticed how she reacts best to a firm voice and harsher treatment, and you were surprised how naturally both came to you after spending some time with her.</p>' +
					'<p>“Yes, ' + perYou.getMaster() + '!” Geraldine trembles with excitement as she hastily throws her clothes away, and when she finally bends over and spreads her legs, her folds are already dripping with need.</p>' +
					'<p>“So horny...” You draw your fingers through her slit and smear her juices over her ass. “What do you think your son would say, seeing you offering your needy snatch to his rival?”</p>' +
					'<p>“He\'d be furious, ' + perYou.getMaster() + '!” Geraldine shakes her ass impatiently. “That stupid boy can only wish he would make me feel the way you do!”</p>' +
					'<p>It\'s almost eerie how completely Geraldine has given herself and by extend her family to you. Davy is your enemy, and so he is hers, family bonds or not.</p>' +
					'<p>“You want him to see you, do you?” You place a harsh slap on her ass and open your pants. “You want him to watch as I make you scream and beg on his own bed.”</p>' +
					'<p>“Yes, ' + perYou.getMaster() + '!” Geraldine twitches under the strike and you immediately push your cock into her wetness, mercilessly pounding away.</p>' +
					'<p>“And you want him to watch as I make you cum over and over again, isn\'t that so?” Another strike to her butt-cheeks makes her yowl in delight while you pick up the pace, taking her with increased roughness.</p>' +
					'<p>“Oh yes, ' + perYou.getMaster() + '! Yesyesyes!”</p>' +
					'<p>“Then cum for me, Slave!” You strike her ass again and Geraldine groans in pure bliss. “Show me how much you enjoy my cock.”</p>' +
					'<p>“Yes ' + perYou.getMaster() + '!” “Thank you ' + (perYou.isBornMale() ? 'Mastahhhh' : 'Mistreeeh') + '...!”</p>'
				);
			} else {
				md.write(
					'<p>Pretty much from the first time Geraldine gave herself to you, you had noticed how she reacts best to a firm voice and harsher treatment, and you were surprised how naturally both came to you after spending some time with her.</p>' +
					'<p>“You will undress yourself, Slave, and you will help me out of my clothes, carefully.“ You put emphasis on the last word, Geraldine has a habit of getting a little too enthusiastic and you don\'t want to risk walking home with torn clothes.</p>' +
					'<p>Of course, your slave does as she is told, her hands shaky as she slowly peels you out of your clothes and her eyes still impatiently following your every motion when she is finally done.</p>' +
					'<p>You watch her body shiver in pleasure when you commend her on the good work, and her eyes follow you impatiently as you walk across the room and sit down on her bed with a cocky smirk.</p>' +
					'<p>“And now, you will show me just how good an experienced woman can be, slave.”</p>' +
					'<p>“Gladly!” Geraldine darts forward like a beast unleashed and pulls you to the edge of the bed, her tongue and lips tasting your bare skin as her hands begin to explore every inch of your body.</p>' +
					'<p>You gasp softly as the sucks in your little nub and places a kiss right above your bellybutton, and your body shudders in delight when she begins to massage and lick your breasts. Geraldine clearly knows how to touch another woman, and soon, you find yourself close to orgasm, her fingers deeply embedded within your sensitive sex while she watches your every motion, eyes completely mesmerized as your head rolls back and your first climax washes over you.</p>' +
					'<p>You take a moment to catch your breath, but it doesn\'t look as if Geraldine is done just yet. Her fingers shift a little, and as her  lips begin to touch your neck, you know  she will tend to you tirelessly until either you or she is unable to go on, and that can take a while.</p>'
				);
			}
			
			// Questions
			startQuestions();
			addLinkToPlace(md, "'talk' more to Slave Geraldine", 82, 'type=geraldineprivate');
			addLinkToPlace(md, 'return to the living room', 176);
			addLinkToPlace(md, 'leave the house', 43);

			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "geraldinebj") {
			// Blowjob/Lick
			if (isExplicit()) {
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) {
					if (perTina.isCharmedBy() && Math.random() < 0.5) this.showPersonRandomX("robbins10bsolo", 3);
					else this.showPersonRandomX("robbins10b", 5);
				} else this.showPersonRandomX("robbins10g", 2);
			} else {
				md = WritePlaceHeader(false, perYou.isMaleSex() ? "td-left-med" : "");
				if (perYou.isMaleSex()) this.showPersonRandom("robbins10b", 2);
				else this.showPerson("robbins10g.jpg");
			}

			addPlaceTitle(md, herName);

			if (perYou.isMaleSex()) {
				md.write(
					'<p>“What do you think we came here to do, slave?” You take a handful of Geraldine\'s hair and harshly push her face against your crotch, much to the woman\'s delight.</p>' +
					'<p>“To have dirty sex in my bedroom, ' + perYou.getMaster() + '.” Your slave coos and rubs her face lovingly against the bulge in your pants.</p>' +
					'<p>“You would like that, would you?” You take a step back but keep the grip on her hair up to force her off the bed and to kneel in front of you. “Sucking off your son\'s rival, taking ' + perYou.getHisHer() + ' cock into your throat...”</p>' +
					'<p>“Yes... oh so much yes!” She twitches impatiently, her hands fiddling with your zipper until she finally frees the already half erect shaft.</p>' +
					'<p>“Imagine him seeing you now...” She doesn\'t even react to your words, her lips and tongue are eagerly sliding all over your manhood, and the moment you are finally fully erect, she pushes you all the way down into her throat.</p>' +
					'<p>“So eager, so horny...” You push her head forward the last few millimeters and her lips wrap around the base. “So very enthusiastic.”</p>' +
					'<p>It may be a residual effect of her time under Davy\'s spell, but Geraldine loves dirty talk like this and is genuinely turned on by it. So what started as a few off remarks, have turned into an integral part of your time with her.</p>' +
					'<p>Geraldine gags up after a few seconds, and you pull back to allow her to breath in only to push right back into her, quickly falling into a comfortable rhythm until you finally reach your peak and unload yourself into her throat.</p>'
				);
			} else {
				md.write(
					'<p>“What do you think we came here to do, slave?” You take a handful of Geraldine\'s hair and harshly push her face against your crotch, much to the woman\'s delight.</p>' +
					'<p>“To have dirty sex in my room, Mistress. Your slave coos and lovingly rubs her face against the fabric covering your crotch.</p>' +
					'<p>“You would like that, would you?” You take a step back but keep the grip on her hair up to force her to kneel in front of you. “Licking the pussy of your son\'s rival, spilling her juices all over your slutty face.”</p>' +
					'<p>“Yes... oh so much yes!” She twitches impatiently and begins to undress you, eager to taste your skin.</p>' +
					'<p>“Imagine him seeing you now...” She doesn\'t even react to your words. Her lips and tongue eagerly wander all over your skin, kissing your thighs, licking your ass, slowly moving up inch by inch and finally pushing her face in-between your legs.</p>' +
					'<p>“So eager, so horny...” You drive your fingers through her hair and spread your legs just enough for her tongue to reach your clit. “So very enthusiastic.”</p>' +
					'<p>It may be a residual effect of her time under Davy\'s spell, but Geraldine loves dirty talk like this and is genuinely turned on by it. So what started as a few off remarks, have turned into an integral part of your time with her.</p>' +
					'<p>You gasp softly under her attention and make sure to hold her head in place, though it isn\'t really needed at all. Geraldine\'s arms pull around your legs as if afraid you might be the one to let go and her tongue eagerly explores your folds and teases your clit, expertly raising your arousal until you gasp and moan under her skillful motions, keeping one hand on her head and your fingers wrapped around her hair until you finally reach your peak.</p>' +
					'<p>“Good girl... now make sure to clean it all up.”</p>'
				);
			}

			// Questions
			startQuestions();
			addLinkToPlace(md, "'talk' more to Slave Geraldine", 82, 'type=geraldineprivate');
			addLinkToPlace(md, 'return to the living room', 176);
			addLinkToPlace(md, 'leave the house', 43);

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "foursome") {
			md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? "td-left-med" : "");
			WaitHereOnly(6);		// 30 minutes

			// Foursome with Mayor Thomas, Tina, Mrs Robbins and you
			var perMayor = findPerson("Mayor");
			if (perYou.isMaleSex() && isExplicit()) perMayor.showPersonX("mayorrobbinsb.jpg");
			else perMayor.showPerson("mayorrobbins.jpg");

			addPlaceTitle(md, "All-in Playtime");

			md.write(
				'<p>You invite Geraldine, Tina and Mayor Thomas to join you in the bedroom to indulge in some group play.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "leave the bedroom", 176);

			AddPeopleColumnMed(md);
			this.showPerson("robbinsmayor.jpg");
			
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("!poledance", 2);
		addPlaceTitle(md, "Geraldine\'s Dance");
		md.write(
			'<p>Geraldine is wearing a dominatrix inspired outfit and you can see she wear it with easy familiarity. Also a number of audience members call out to \'Mistress\'. You are unsure if this is playing along to the theme or actual familiarity.</p>' +
			'<p>EGeralidine is not so much a dancer here but more like an athletic cosplayer, acting out her role. Not so much stripping as disciplining.</p>' +
			'<p>After she joins you lookng happy and aroused. You ask her more about her previous visits here, and she promises to tell you more another time.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 82 && !isPersonHere("Tina") && sType === "" && this.isCharmedBy("You")) {
			// Mrs Robbins Bedroom and Tina is NOT here 
			this.addSleepLink(md, "go to bed for the night with Geraldine", "Bedding Geraldine",
				'You call Geraldine to join you. She is very happy, and puts on a show for you, dressing up and then stripping for you.<br><br>One thought crosses your mind before you lie down for the night, why does she own a dominatrix style outfit?',
				"robbins12a.jpg", true, 82, '', 'When you wake in the morning Geraldine has left to prepare breakfast.'
			);
			
		} else if (Place == 176 && this.isHere() && sType === "") {
			//  Robbins Home Conversation Options for Geraldine/Charmed or not Charmed
			var perTina = findPerson("Tina");
			if (perDavy.other > 0 && !this.checkFlag(3)) addQuestionC(md, '"Mrs Robbins, has Davy been meeting Mr Beasley recently?"', "MrsRobbins", 613);
			if (perDavy.getQuestBlueBottle() == 1) addQuestionC(md, '"Mrs Robbins, has Davy been acting strangely recently?"', "MrsRobbins", 5901);
			else if (perDavy.getQuestBlueBottle() == 2) addQuestionC(md, '"Do you know anything about a blue bottle?"', "MrsRobbins", 5902);
			else if (perDavy.getQuestBlueBottle() == 3) addQuestionC(md, '"Can I see it?  The bottle?"', "MrsRobbins", 5903);

			//  if Mrs Robbins still Chamred by Davy && you're male && NOT INVISIBLE
			if (this.isCharmedBy("Davy")) {
				// She is charmed by Davy
				if (!isInvisible()) {
					if (perYou.isBornMale()) {
						// Male and visible
						addPopupLink(md, perTina.checkFlag(1) ? 'go to Mrs Robbins bedroom' : "check the bedroom", "Mrs. Robbins",
							this.addPersonString("robbins1m.jpg", "height:max%", "right") +
							'<p>Mrs. Robbins blocks your way to her bedroom.</p>' +
							'<p>"No way! That room is locked for Da...a reason. You won\'t get in there while I\'m around."</p>' +
							'<p>She rudely pushes you away from the door and tells you<br>"It is time you left my house"',
							false, "Leave(true);"
						);
					}  else {
						// Female and visible
						addLinkToPlace(md, perTina.checkFlag(1) ? 'go to Mrs Robbins bedroom' : "check the bedroom", 82, '', '', '', 'ThrownToBedroom()');
					}
				} else {
					// Invisible
					addLinkToPlace(md, "check the bedroom", 82, 'While the invisibility spell lasts you walk behind Mrs. Robbins and enter the bedroom quickly so she does not notice. As you do the spell immediately ends.');
				}
			} else if (!this.isCharmedBy()) {
				// Not charmed at all, 
				if (isInvisible()) {
					// Invisible
					addLinkToPlace(md, "check the bedroom", 82, 'While the invisibility spell lasts you walk behind Mrs. Robbins and enter the bedroom quickly so she does not notice. As you do the spell immediately ends.');
				} else {
					// Visible, still blocks you though
					addPopupLink(md, perTina.checkFlag(1) ? 'go to Mrs Robbins bedroom' : "check the bedroom", "Mrs. Robbins",
						this.addPersonString("robbins1m.jpg", "height:max%", "right") +
						'<p>Mrs. Robbins blocks your way to her bedroom.</p>' +
						'<p>"Excuse me, but you are a visitor to my house, you cannot just wander around. If you have nothing else to discuss then please leave."</p>',
						false, "Leave(true);"
					);
				}
			} else {
				//  Charmed by you!
				var bTinaAwake = perTina.isCharmedBy() && !(perTina.isVampyre() && (isDay() || !perTina.checkFlag(6)));
				if (!isPlaceKnown("DavysRoom")) addQuestionC(md, '"Where is Davy\'s room?"', "MrsRobbins", 500);
				addLinkToPlace(md, "'talk' to Slave Geraldine privately", 82, 'type=geraldineprivate');
				if (bTinaAwake) {
					addLinkToPlaceC(md, 'take both into Slave Geraldine\'s bedroom', 82, 'type=motherdaughter');
					if (wherePerson("Mayor") == 176 && isCharmedBy("Mayor", "You")) addLinkToPlaceC(md, '"Let\'s <i>all</i> of us have some fun"', 82, 'type=foursome');
				}
				if (!perTina.isCharmedBy() && !perTina.checkFlag(13)) addQuestionC(md, '"Geraldine, is your daughter home?"', "MrsRobbins", 6100);
			}

		}
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 176 && this.isHere() && !isInvisible()) {
			//Invisibility is NOT ON
			var bDCharm = this.isCharmedBy("Davy");
			var perTina = findPerson("Tina");			
			if (this.isCharmedBy("You") && perTina.isCharmedBy()) {
				// Both Charmed
				md.write('<p?Geraldine and Tina Robbins are keen to see you return to their home. The ladies look like they are ready to do whatever you ask.');
			} else if (this.isCharmedBy("You")) {
				// Just Mom Charmed
				md.write('<p>Geraldine Robbins looks at you with hunger in her eyes, obviously happy that you\'ve returned, and more than willing to do anything you ask.');
			}	else {
				// Mom not charmed
				if (perYou.isBornMale() || !bDCharm) md.write('<p>On entering the front door you meet with the family\'s mother. Not being used to visitors, Mrs Robbins frowns at you. Her speech is polite but terse as she asks you what you want.');
				else {
					if (checkPlaceFlag("RobbinsHouse", 9)) md.write('<p>On entering the front door you meet Mrs Robbins again, she moves step between you and the front door, "Now you sneaky little bitch, get back in the bedroom and wait there for my darling Davy!"');
					else md.write('<p>On entering the front door you meet with the family\'s mother. Not being used to visitors, Mrs Robbins is acting friendly towards you, and reaches out to touch your shoulder, "Why not wait somewhere more comfortable for my darling Davy?".');
				}
			}
			if (this.isCharmedBy("You") && wherePerson("Ellie") == 81) md.write(' Geraldine tells you that a girl is here visiting her son and has gone into his room, She gestures to the room.');

			md.write('</p>');
		}
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Mrs Robbins is ALONE
			if (Place == 176 && this.isHere()) {
				var bDCharm = isCharmedBy("MrsRobbins", "Davy");
				if (wherePerson("Mayor") == 176)	{
					if (!isCharmedBy("MrsRobbins", "You")) {
						if (isSpellKnown("Shielded Charm")) {
							// Shielded Charm Known
							addComments("This gathering is a little too intimate, even for Shielded Charm.");
						}	else addComments("Can't cast that here, its too public.");
					}
				} else if (!this.isCharmedBy())	{
					// Mrs Robbins after freed from Davy
					CastCharmSpell("MrsRobbins", Place, 1, 'type=charmgeraldine1');
				} else if (bDCharm) addComments('You attempt to cast the spell, but if fails to take effect... Evidently she is already under the effects of a charm spell...  Someone <i>else\'s</i> spell.');
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
			gotoPlace(Place, 'type=geraldinepool');
			receiveCall('', 'You call Geraldine to invite her to join you at the pool for a swim, and she answers that it is agreeable and will be there in a while.');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	per.addPersonPhoneCall = function() {
		if (this.hoursCharmed() > 24 && !this.checkFlag(4) && Place != 176) {
			// SMS 300, 1 day after charming her
			if (makeCall(true, 300)) this.setFlag(4);
		}
		if (this.hoursCharmed() > 48 && isCharmedBy("Tina") && !this.checkFlag(5) && Place != 176) {
			// SMS 301, 2 day after charming her AND Tina
			if (makeCall(true, 301)) this.setFlag(5);
		}		
		return false;
	};
	per.getPersonSMS = function(id) {
		if (id == 300) return receiveSMS('Geraldine', 'Tina took this of me last Halloween', 'robbinssms1.jpg');
		if (id == 301) return receiveSMS('Geraldine', 'This is from a party last year. Not what I really like, but how about we do this to Tina?', 'robbinssms2.jpg');
		return '';
	};
}