/*****************************************
  John Adams
****************************************/
function RepliesJohnAdams(nR)
{
	var perJ = per;
	//var bCharm = perJ.isCharmedBy();
	var myName = perJ.getYourNameFor();
	var perT = findPerson("Tess");

	if (nR == 10301) // v103 = John Adams CHARMED Path
	{
		PlaceI(32, 230);
		perJ.setFlag(1);
		addComments('"Of course, ' + myName + '.  Everything I have is yours.  I took this from the museum to show it to my wife, I believe it may be magical as it seemed to glow when it was near the talking worm."</p>');
	}
	else if (nR == 10400) // v104 = John Adams NORMAL Path
	{
		perJ.other = 1;
		addComments(
			'<p>"Oh right, Tess told you about my collection. Yes I am thinking of donating my discoveries to the museum," John says, pleased that you have asked him about his hobby.</p><p>"Here, let me show you a very special piece. It\'s an old silver ring and if I didn\'t know better I say it almost glowed when it was near that worm thing...Odd, it now seems to be glowing again...and more when it is near Tess."</p>' +
			'<p>"I found it in an estate auction of an old Glenvale family where the last member died with no heirs. The ring was hidden in an old box in a secret compartment along with some old papers. Once referred to the ring as the \'free\' ring and another as \'the ring of the inner eye\', but nothing more. It is quite an old design but hard to date, it could be centuries old, or made last year, though I am sure it is more likely to be centuries."</p>'
		);
	}
	else if (nR == 10401)
	{
		perJ.other = 2;
		addComments('<p>"I\'m sorry ' + myName + ' but it really belongs to the museum," John says.</p>');
	}
	else if (nR == 10402)
	{
		if (!(whereItem(32) !== 0 || perYourBody.FindItem(32) > 0)) {
			//Have not already placed the ring, or picked it up
			if (perJ.other < 5) perJ.other = 5;
			perJ.setFlag(7);
			PlaceI(32, 230);
			bChatLeft = false;
			addComments('<p>Tess jumps her husband to snatch the ring out of his hand. As the lovely klutz she is, she drops it. Fortunately she does just before John grabs it back from her.</p>');
		}
	}
	else if (nR == 10405)
	{
		perJ.setFlag(8);
		if (perJ.other < 6) perJ.other = 6; // Remove option to get ring from John if you begin this line first.
		addComments('<p>"Of course I like the way she is dressed," he says, eyeing you suspiciously and obviously wondering why you brought it up.</p><p>"Although she keeps changing outfits today. Why do you ask?"</p>');
	}
	else if (nR == 10406)
	{
		perJ.setFlag(8);
		perJ.other = 7;
		addComments('<p>"I don\'t believe it," he says in suprise.</p><p>"Then again she has never dressed in sexy clothes before. I was beginning to like the new and improved Tess. Not likely though." His pride and self-confidence flare up for a moment as he glares at you.</p><p>"Prove it." He says defiantly.</p>');
	}
	else if (nR == 10408)
	{
		perJ.other = 9;
		perT.other = 28; //Tess Dressed up as NUN
		addComments('<p>John moves forward to strike you, his anger suddenly flaring as he realises how much control you have over his wife.  "Get the HELL out of my house, you freak!" He bellows.</p>');
	}
	else if (nR == 10409)
	{
		if (perYourBody.PutItem(32)) {
			this.charmedTime = nTime;
			perJ.other = 10;
			addComments(
				'“I can\'t just give the city\'s property away!” John narrows his eyes. “This could cost me my job and...”</p>' +
				'<p>“But it\'s just a ring and you told me no one but you had seen it, yet, right?” John is startled as Tess interrupts him.</p>' +
				'<p>“Yes but...”</p>' +
				'<p>“So, why don\'t we trade it with one of mine, give him/her that old trinket and I...” She whispers something into John\'s ear that certainly got his attention, and you notice his cheeks taking on a deep blush as his eyes dart around between you, the ring and Tess, who has a very suggestive smile on her lips.</p>' +
				'<p>“Fine, take it and leave my house.” He glares at you as he hands you the ring. “And this better concludes whatever business you have with my wife, too, or I swear the police will get involved.”'
			);
			if (wherePerson("MsJones") == 242) movePerson("MsJones", isMurderPath() ? 0 : 145);
		} else addComments("Wait a moment, you do not think you can carry anything more, better drop off something first");
	}
	return true;
}

function initialiseJohnAdams()
{
	// John Adams
	addPerson("John Adams", 0 , "JohnAdams", "Male", false);
	per.Replies = RepliesJohnAdams;

	per.getPersonGender = function() { return this.checkFlag(4) ? "woman" : "man"; };
	per.getNextDress = function(drs) { return this.checkFlag(4) ? (this.checkFlag(6) ? "Female2" : "Female1") : "Male"; };

	per.getPersonName = function(full) {
		if (full !== true) return this.checkFlag(5) ? "Joan" : "John";
		else {
			if (this.checkFlag(5)) return this.isCharmedBy() ? "Joan Adams, your Slave" : "Joan Adams";
			return this.isCharmedBy() ? "John Adams, your Slave" : "John Adams";
		}
	};
	per.getPersonNameShort = function() { return this.checkFlag(5) ? "Joan" : "John"; };
	
	per.getPersonAddress = function() { return isPlaceKnown("AdamsHouse") ? '2121 Rathdown Rd, Glenvale' : ''; };

	per.getPossessionFace = function() {
		if (this.isCharmedBy()) return "john11";
		return "john10";
	};
	per.isPersonInfo = function() { return this.isCharmedBy(); };
	per.getPersonInfo = function() {
		if (this.dress == "Male") {
			return "<img src='Images/People/JohnAdams/Male/john3.jpg' class='imgpopup' alt='John'>" +
				"John is your slave, the once proud husband of Tess now finally joined her in serving your wishes. A male slave could come in handy once in a while, especially after all those girls you have enslaved. Maybe John could be your harem guard or even better, he could be your bodyguard. You could always use one.";
		} else {
			return "<img src='Images/People/JohnAdams/" + this.dress + "/john3.jpg' class='imgpopup' alt='John'>" +
				this.getPersonName(true) + " is your slave, the once proud husband of Tess now finally joined her in serving your wishes. Now <b>she</b> is a " + (this.checkFlag(6) ? 'slim woman' : 'very large breasted woman') + " who has joined your harem!";
		}			
	};
	
	per.showEventPopup = function()
	{
		if (Place == 229 && sType == "exitdistract") {
			this.setFlag(9);
			this.charmedTime = nTime;
			this.other = 10;
			addComments(
				'<p style="margin-top: 0em; margin-bottom: 0.5em;font-size:large;cursor: pointer;"><b>John Adams</b></p><p>' +
				'“Who do you think you are, ordering my wife ar...” John doesn\'t get to finish the sentence before Tess once again tackles him to the ground and, in lieu of anything better to do, initiates a deep and passionate kiss.</p>' +
				'<p>“Tess?!? Stop, I...” John\'s eyes widen when he feels his wives hand inside his pants and around his manhood.</p>' +
				'<p>“Why are you...” Another kiss muffles his voice, but while Tess is really pulling out all the stops to keep him occupied, you know it will only keep his attention for so long and quickly take your leave with the ring in tow.'
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md, plcT;
		var nmJ = this.getPersonName(false);

		if (Place == 269 && sType == "johnpool") {
			WaitHereOnly(4);
			md = WritePlaceHeader();
			this.showPerson("john-pool.jpg");
			addPlaceTitle(md, "Swimming with " + nmJ + "");
			if (this.isMaleSex()) {
				md.write(
					'<p>John arrives dressed more in shorts, but says he can change into bathers when you decide to swim. He takes a seat to have a chat first</p>'
				);
			} else {
				if (this.checkFlag(6)) md.write('<p>' + nmJ + ' arrives dressed in a blue bikini to your surprise, <i>she</i> has really take to this "being a woman thing".</p>');
				else md.write('<p>' + nmJ + ' arrives dressed in a white bikini to your surprise, <i>she</i> has really take to this "being a woman thing".</p>');
			}
			startQuestions();
			if (this.getCharmedLevel() == 2) addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=johnpoolsex');
			addLinkToPlaceC(md, 'chat and say goodbye to ' + nmJ, Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "johnpoolsex") {
			md = WritePlaceHeader();
			this.showPerson("john-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with " + nmJ);
			md.write(
				'<p>You ask ' + nmJ + ' to play with you more privately, and '
			);
			if (this.isMaleSex()) md.write('he seductively removes his shorts and top, ready for you.</p>');
			else md.write('she does an awkward strip-tease, still self-conscious of her breasts and <i>not</i> being a man.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to ' + nmJ, Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place != 230 && Place != 231) return false;
		
		if (sType == "johncharm1") {
			md = WritePlaceHeader();

			this.showPerson("john2.jpg");

			addPlaceTitle(md, "Charmed John Adams");

			md.write(
				'<p>It\'s time to see how well the alterations you\'ve made to the Dai Chu really work. You speak the words and weave the altered spell in front of John, who at first seems to be largely confused by it.</p>' +
				'<p>“Uh, did you just... say something?”</p>' +
				'<p>You hope that everything worked as planned and wait in silence for the pink glow to form, which obviously unsettles him...</p><p>' +
				(this.other < 8 ? '“Okay, listen, it\'s not like I don\'t want to be welcoming to my wife\'s friends, but this... is...”' 
									 :	'“Okay, listen, ' + perYou.getPersonName() + '. You come into my house, apparently blackmailing my wife, threatening me and now you are just standing there and... and...') +
				'</p><p>John is interrupted when his body is shaken by a sudden wave of pleasure, his position shifting to hide the growing bulge in his pants as the spell begins to take hold of his mind.</p>' +
				'<p>“What... have you done? I feel weird... my mind.” Tess is about to rush to his side, but stops immediately when you tell her that everything is fine.</p>' +
				'<p>“Tess...?” John looks at his wife in disbelieve as it suddenly hits him. “Those words!” He turns to you. “Those words are some sort of magic! You used them on my wife and now you\'ve used them on me to make us... make me...”</p>' +
				'<p>Well, this is a good question, what do you want from John once the spell is finished?</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'you want him to desire you', 230, 'type=johncharmdesire');
			addLinkToPlace(md, 'tou want him to serve you, but not sexually', 230, 'type=johncharmserve');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "johncharmdesire") {
			md = WritePlaceHeader();
			this.other = 20;
			if (this.getCharmedLevel() == 1) this.charmThem(2);
			
			this.showPerson("john3.jpg");

			addPlaceTitle(md, "Charmed John Adams");

			md.write(
				'<p>“...make you fall deeply in love with me?” You interrupt him. “Make you want to fuck me? To want nothing more but to undress and feel my lips on your own? My hands all over your body? ' + (perYou.isMaleSex() ? 'cock inside your ass' : 'My pussy around your cock') + '?”</p>' +
				'<p>His hands slip under his shirt as you put emphasis on undress. There is a brief smile on his lips as your words conjure up lewd images in his mind, but it quickly fades.</p>' +
				'<p>“Stop! Please, I\'m not ' + (perYou.isMan() ? 'into men' : 'cheating on Tess') + '!”</p>'
			);
			addLinkToPlace(md, 'push him', 230, 'type=johncharmdesirepush');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "johncharmdesirepush") {
			md = WritePlaceHeader();
			this.showPerson("john3.jpg");

			addPlaceTitle(md, "Charmed John Adams");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>“Your massive hard-on tells another story.” You mock him. “Don\'t tell me you\'ve never had that fantasy of having a threesome with Tess and another guy.”</p>' +
					'<p>John remains suspiciously silent, the struggle written on his face.</p>' +
					'<p>“I thought so.” You slowly approach him with a smile. “Now imagine taking it further. You are in the heat of the moment, three warm, naked bodies intertwined, moaning, writhing, gasping... You have not known whose hands have been caressing you for a while now, whose lips had kissed your neck, but suddenly, he is on top of you...”</p>' +
					'<p>John Trembles as you stop right in front of him, he tries to speak but only gets out stuttered noises.</p>' +
					'<p>“His fingertips slide over your chest...”</p>' +
					'<p>You move your hands under his shirt to take it off, facing no resistance.</p>' +
					'<p>“...and his lips move in for what promises to be an amazing, passionate Kiss...”</p>' +
					'<p>John just stares at you, his jaw unhinged, his lips trembling and his mind trying to sort through what must be very conflicting feelings. The spell is so close to erase the last shred of his will to resist that you are sure all you need is one more push.</p>' +
					'<p>“Would you turn him away, John.” Your fingers drive over his bulge as you move to open his pants “Would you turn me away?”</p>'
				);
			} else {	
				md.write(
					'<p>“You wouldn\'t be doing anything with me Tess hadn\'t been doing for a while.”</p>' +
					'<p>John turns to Tess with an incredulous look on his face after your reveal, and Tess, while shifting uncomfortably, gives him a confirming nod.</p>' +
					'<p>“It\'s true, hun. I love you, but Mistress is making me feel things I\'ve never thought possible. When we are together, it\'s just... well...”</p>' +
					'<p>“...the most amazing sex imaginable.” Tess blushes heavily when you interrupt her, but again, she nods sheepishly, much to the dismay of her husband.</p>' +
					'<p>“And we\'d like you to join us, John.” That certainly got his attention. “Don\'t say you\'ve never fantasized about a threesome with Tess and another woman.”</p>' +
					'<p>“I... I did, but I... but you...” John clearly tries to muster a coherent thought, but his mind is caught up in the struggle between his new, magic induced love and, more importantly, lust for you and his last shreds of clarity reminding him of what you are doing.</p>' +
					'<p>“Imagine this,” He moans softly as you slide your hands under his shirt. “...two pairs of hands on your skin, two pairs of tits pressed against you...” He doesn\'t struggle as you expose his chest.”Two pairs of lips on your cock.”</p>' +
					'<p>You draw out a blissful gasp by emphasizing the last word, his breath heavy as you place your arms on his shoulders and look deeply into his eyes. “And all you need to do is to be mine, to devote yourself to me just like Tess did.”</p>' +
					'<p>His gaze doesn\'t even flinch towards his wife as you speak her name, swirls of pink light indicating that all it\'ll take is one final push for the spell to consume him.</p>' +
					'<p>“Would you really want to turn that away, to turn me away?”</p>'
				);
			}
			addLinkToPlace(md, 'wait for his answer', 230, 'type=johncharmdesirewait');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "johncharmdesirewait") {
			md = WritePlaceHeader();
			this.showPerson("john4.jpg");

			addPlaceTitle(md, "Charmed John Adams");

			md.write(
				'<p>“No...” He whispers the answer just as his pants fall down to his ankles, prompting a bemused smirk from you.</p>' +
				'<p>“I didn\'t catch that, John, a little louder.”</p>' +
				'<p>“N... no!” He stammers. “I wouldn\'t turn you away! My... my cock feels so hard just thinking about what you just said! I must have you, please!”</p>' +
				'<p>A quick motion frees his manhood from the confines of his underpants and, to his credit, it\'s quite the package. Tess is a lucky woman indeed.</p>' +
				'<p>“Then will you devote yourself to me and my pleasure just as Tess did?” He gasps as your fingertips slide over his shaft. “Will you be mine with all your heart.”</p>' +
				'<p>“Yes, ' + perYou.getMaster() + '.” John doesn\'t hesitate this time. Fear and doubt have vanished from his eyes to be replaced with hungry passion and a desire to please you.</p>' +
				'<p>“I\'m yours, my wife is yours, whatever I own is yours.” A dreamy smile play on his lips.” Please allow me to show my love.”</p>'
			);

			addLinkToPlace(md, 'talk to John a bit more', 230);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "johncharmserve") {
			md = WritePlaceHeader();
			this.other = 20;

			this.showPerson("john3.jpg");

			addPlaceTitle(md, "Charmed John Adams");

			md.write(
				'<p>“I don\'t want anything sexual from you.” You interrupt him. “And neither do you want it from me.”</p>' +
				'<p>John is taken aback by your words; clearly torn between his spell induced desire for you and the part that is still trying to resist your magic.</p>' +
				'<p>“But you are... but I need...”</p>' +
				'<p>“You need to serve me.” You once again cut in. “And you will. In fact, it is your soul desire in life to make sure that me and Tess are happy.”</p>' +
				'<p>John looks like a deer caught in headlights. His cock is pressing painfully against the confines of his pants and the pink glow in his eyes flashes up as your words dig into his mind, twisting his perception of himself to accommodate to your desires.</p>' +
				'<p>Sometimes it looks like he tries to say something, to beg you to take him or maybe even muster enough strength to tell you to stop, but every time he does another wave of blissful pleasure derails his train of thought.</p>' +
				'<p>“It\'s all you want, John. To be useful to me. To serve me and make sure that Tess and I are happy together, right?”</p>' +
				'<p>A last flash of pink lights up in his eyes, and from the way John groans and bends over he might need to change his pants after this, but as he looks back up to you his eyes only show loving devotion.</p>' +
				'<p>“Whatever you want of me, ' + perYou.getMaster() + '.” He finally speaks. “I live to serve you.”</p>'
			);
			addLinkToPlace(md, wherePerson("Tess") == 230 ? 'talk to the Adamses a bit more' : 'talk to John a bit more', 230);
			WritePlaceFooter(md);
			return true;
		}		
		
		if (sType == "johnsexenjoy") {
			// John only
			md = WritePlaceHeader(false, this.dress == "Male" ? 'td-left-med' : '');
			if (this.isMan()) this.showPerson("john-sex1.gif");
			else this.showPerson("john4.jpg");
			plcT = wherePerson("Tess");

			addPlaceTitle(md, "Making Love with " + nmJ + " Adams");

			if (this.isMaleSex()) {
				// Male John
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You take John into the Adams\' bedroom to enjoy some time with your male lover, time he is overjoyed to share with you. As you close the door John is quick to take off his shirt and cast it off to the side. Casually you discard your own shirt as the man steps toward you. His eyes drinking in the sight of your masculine body while his fingers tenderly brush along your chest. “I\'ve missed you,” he whispers. John\'s lips instinctively press against your chest in a foray of passionate kisses. A man possessed with the need to drink in the feeling and taste of his lover\'s skin.</p>' +
						'<p>Moaning from the inflamed actions of your lover, your hand wraps around the back of his head to caress and encourage his attention upon your body. He fumbles with your pants for a moment before releasing your cock from their confines. His head slipping from your fingers as his lips traverse down the front of your chest. Already anticipating his next act you once again moan as John wraps his lips around your cock. Focused upon your pleasure his head pulls back as his lips nurse the head of your cock, almost nursing it. It takes little time for your body to further respond as your cock stands fully erect.</p>' +
						'<p>John lovingly explores your cock with his mouth, slowly edging himself further along your length. A deep moan escapes you as he lovingly tends to you. But you can\'t simply let John spend all his time focused on you... you want to play with him. As he accepts more of your cock into his mouth you let out a slight gasp as you try to speak, “Strip for me and kneel on the bed.”</p>' +
						'<p>Hesitantly he stops his attentions upon your flesh to comply with your wishes. His own cock springs to life as his pants hit the floor. As if anticipating what you want he turns and kneels on hands and knees upon the bed with his ass facing you. While you enjoy the view a mischievous thought comes to mind you simply must do. As you move behind him you hold your cock up before letting it fall between his ass cheeks. Your left hand reaching down to pull his torso up. Teasingly you whisper into his hear, “I have other ideas, lover.”</p>' +
						'<p>Moving to wrap your hand around John\'s cock you slowly begin to stroke over the surface. The warm and soft skin gliding beneath your fingers. He moans and leans back against you, absently stroking your length with the cheeks of his rear. “I want you to cum for me,” you growl into his ear.</p>' +
						'<p>He smiles within the throes of his bliss at your hand stroking his cock. Easily taking to the rhythm of your hand to stroke your cock resting between his cheeks. His chest sliding off to the side to allow him to look at you. An arm reaches behind him in effort to hold your face close to his.</p>' +
						'<p>“Oh ' + perYou.getPersonName() + ',” he gasps as his orgasm begins. Your hand quickly aiming up as the first thick rope of cum explodes from John\'s cock, landing across his chest and a small portion of your cheek. A second and third follow, striking John\'s chest as you continue to milk his cock. Absently his arm retracts from you as he wipes the cum from your cheek. Without a pause he cleans it from his finger, “You are such a wonderful lover, ' + perYou.getPersonName() + '...”</p>' +
						'<p>You chuckle slightly as you tell him you must leave. Unfortunately you have other matters to attend to but will be back. You hear John confess his love and desire for you to come back as soon as you can, leaving him to clean up the mess of his orgasm.</p>'
					);
				} else {
					md.write(
						'<p>John swoops you off your feet in a way you imagine he must have done it with Tess several times before and carries you to the large marital bed in the middle of the room.</p>' +
						'<p>You can see what Tess likes about him.</p>' +
						'<p>He practically worships your body whenever you take him here, always undressing you as if he is unwrapping a precious gift and covering your body in tender affections along the way.</p>' +
						'<p>His hands explore every inch of your skin as he unveils it: massaging your breasts after he takes of your shirt, tracing your legs after your pants are gone and lingering for a curiously long time at your feet to give you a gentle massage which you didn\'t know you wanted until he started.</p>' +
						'<p>“Don\'t forget about the rest of me, lover.”</p>' +
						'<p>John smiles bashfully, and it doesn\'t take much more than you beckoning him closer with a simple gesture for him to let go of your feet and crawl on top of you.</p>' +
						'<p>You can feel him spread your legs and the tip of his shaft resting against your folds. He waits for you to give him an approving nod and finally slides into you.</p>' +
						'<p>Missionary with a man might not sound like the most exiting thing for a girl who has super kinky slave sex all the time, but frankly, it has its charm. You like the feeling of his warm body pressing you down, of his lips, close enough to your own to feel each other\'s breath, and of course, of his cock pushing deeply into you in gentle motions...</p>' +
						'<p>John repeatedly confesses his love for you in-between sloppy kisses, ' + (plcT == 231 ? 'never making a mention of Tess.' : 'Never even looking at Tess, who is sitting next to the bed with a mix of arousal and jealousy on her face and her fingers between her legs.') + ' He is focused on you, and you alone, eager to pleasure you and with some guidance skilled enough to bring you to climax right before he reaches his own and cums inside you.</p>' +
						'<p>You both take a moment to bask in the afterglow, trading a last, deep kiss before you have to get dressed again.</p>'
					);
					//if (wherePerson("Tess") == 230) md.write('<p>You ask Tess to leave so you and John can speak privately. After she leaves little speaking takes place as you make love with John. He repeatedly confesses his love to you making no mention of Tess.</p>');
					//else md.write('<p>You ask John to speak privately in the bedroom. Little speaking takes place as you make love with John. He repeatedly confesses his love to you making no mention of Tess.</p>');
				}
			} else {
				// Female John
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You take ' + nmJ + ' into the Adams\' bedroom to enjoy some time with your female lover, time she is overjoyed to share with you. As you close the door ' + nmJ + ' is quick to take off her top and cast it off to the side. Casually you discard your own shirt as the woman steps toward you. Her eyes drinking in the sight of your masculine body while her fingers tenderly brush along your chest. “I\'ve missed you,” she whispers. ' + nmJ + '\'s lips instinctively press against your chest in a foray of passionate kisses. A woman possessed with the need to drink in the feeling and taste of her lover\'s skin.</p>' +
						'<p>Moaning from the inflamed actions of your lover, your hand wraps around the back of her head to caress and encourage her attention upon your body. She fumbles with your pants for a moment before releasing your cock from their confines. Her head slipping from your fingers as her lips traverse down the front of your chest. Already anticipating her next act you once again moan as ' + nmJ + ' wraps her lips around your cock. Focused upon your pleasure her head pulls back as her lips nurse the head of your cock, almost nursing it. It takes little time for your body to further respond as your cock stands fully erect.</p>' +
						'<p>' + nmJ + ' lovingly explores your cock with her mouth, slowly edging herself further along your length. A deep moan escapes you as she lovingly tends to you. But you can\'t simply let ' + nmJ + ' spend all her time focused on you... you want to play with her. As she accepts more of your cock into her mouth you let out a slight gasp as you try to speak, “Strip for me and kneel on the bed.”</p>' +
						'<p>You chuckle slightly as you tell her you must leave. Unfortunately you have other matters to attend to but will be back. You hear ' + nmJ + ' confess her love and desire for you to come back as soon as you can.</p>'
					);
				} else {
					if (plcT == 231) md.write('<p>You ask Tess to leave so you and ' + nmJ + ' can speak privately. After she leaves little speaking takes place as you make love with ' + nmJ + '. She repeatedly confesses her love to you making no mention of Tess.</p>');
					else md.write('<p>You ask ' + nmJ + ' to speak privately in the bedroom. Little speaking takes place as you make love with ' + nmJ + '. She repeatedly confesses her love to you making no mention of Tess.</p>');
				}					
			}

			startQuestions();
			addLinkToPlace(md, plcT == 231 ? 'talk to the Adamses a bit more' : 'talk to ' + nmJ + ' a bit more', 231);
			addLinkToPlace(md, 'exit the Adams home', 229);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "johnsexfuckyou") {
			// John only fucking you
			md = WritePlaceHeader(false, this.dress == "Male" && !perYou.isFuta() ? 'td-left-med' : '');
			if (this.isMan()) {
				if (perYou.isMaleSex()) this.showPerson("john-sex2m.gif");
				else if (perYou.isFuta()) this.showPerson("john-sex2f.gif");
				else this.showPersonRandom("john-sex2g", 2);
			} else AddImageRandom("GenericSex/Explicit/sex-fm anal strapon ", 3);
			plcT = wherePerson("Tess");

			addPlaceTitle(md, nmJ + " Adams Fucking You");

			if (this.isMaleSex()) {
				// Male John
				md.write(
					'<p>John gets ready to carry you to the bed, but today, this is not what you want from him.</p>' +
					'<p>“I said: Fuck me.” You rub your ass against his crotch. “As in, right here, against the wall, and as rough as you like”</p>' +
					'<p>It actually seems to take John a moment to process what you have just demanded off him. Tess certainly isn\'t a woman who would ask for rough sex and John doesn\'t strike you as the type of guy who would initiate it even if he wanted to.</p>' +
					'<p>Luckily, you have the means to help him along.</p>' +
					'<p>You focus on the mana inside John\'s body and use it to increase his arousal, making him crave your body more than he already does. He breathes out a husky moan, his breath quickening with every second as his body, and cock, react to the sudden stimuli, but he still seems to need one last push.</p>' +
					'<p>“Now.”</p>' +
					'<p>You speak the word in a firm, commanding voice, and seconds later find yourself pinned against the wall.</p>' +
					'<p>John impatiently fiddles with your clothing, his hands shaking as he does his best to undress at least your lover body without tearing anything and ' + (perYou.isMan() ? 'barely taking the time to apply some lube you made sure is at hand for such situations.' : (!perYou.isFuta() ? 'only barely stopping long enough to check if you are wet before his cock slides into you' : 'Barely stopping to reach past your cock and make sure your pussy is wet before sliding into you')) + '.</p>' +
					'<p>And damn, he feels good inside your ' + (perYou.isMan() ? 'ass' : 'pussy') + '</p>' +
					'<p>It obviously won\'t make you give up on girls, but knowing that you can stop him at any point, and he will obey makes it a lot easier to just enjoy his relentless, deep thrusts and the weight of his body pressing you against the wall.</p>' +
					'<p>“Ohhh... just like that...”</p>' +
					(plcT != 231 ? '<p>It\'s of course not like John needed any more encouragement. His mind is lost in the haze of lust, pleasure and pure carnal need amplified by the spells hold on him. You know that nothing matters to him but this moment. Not his job, not his pride and not even his wife, and that knowledge turns you on to no end.</p>' :
										'<p>You sneak a sideways peak towards Tess, who watches the show in wide-eyed amazement. It\'s obviously that she has never seen her husband like this, but if the way she occasionally bites into her thumbnail and rubs her legs together is any indication, she wouldn\'t mind trading places with one of you.</p>') +
					'<p>' + (plcT != 231 ? 'All he is able to focus on is how to please you.' : 'John, on his end, ignores her completely.') + ' His arms wrap around your body and his fingers seek out your ' + (perYou.isMan() ? 'cock, slick fingers now feverishly jerking you off' : (!perYou.isFuta() ? 'clit, two fingers now feverishly rubbing over the little nub' : 'cock, slick fingers now feverishly jerking you off')) + ' and luring a cascade of soft moans from your lips as the combined assault of his rough trusts and passionate kisses to the back of your neck drive you over the edge into a loud, intense climax.</p>' +
					'<p>You can feel John\'s body twitch. His load shooting into you but his cock showing no sign of softening. Your shared climax fades, but he is still hard, still deep inside you and ready to go another round if you so wish.</p>'
				);
			} else {
				// Female John, so using a strap-on on you
				md.write('<p>You ask ' + nmJ + ' to speak privately in the bedroom. Little speaking takes place as you make love with ' + nmJ + '. She repeatedly confesses her love to you making no mention of Tess.</p>');					
			}

			startQuestions();
			addLinkToPlace(md, plcT == 231 ? 'talk to the Adamses a bit more' : 'talk to ' + nmJ + ' a bit more', 231);
			addLinkToPlace(md, 'exit the Adams home', 229);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "johnsexbjthem") {
			// John only
			md = WritePlaceHeader();
			if (this.isMan()) {
				if (perYou.isMan()) this.showPerson("john-sex3m.gif");
				else this.showPerson("john-sex3f.gif");
			} else if (perYou.isMan()) AddImageRandom("GenericSex/Explicit/sex-ff lick ", 7);
			else AddImageRandom("GenericSex/sex-mf lick", 3);
			plcT = wherePerson("Tess");

			addPlaceTitle(md, "Sucking " + nmJ + " Adams");

			if (this.isMaleSex()) {
				// Male John
				md.write(
					'<p>You\'ve never been particularly interested in men, or dicks, that\'s true, but there was always a certain curiosity about it and now that you can try out every kink in the book to your hearts content you feel like it shouldn\'t be limited to women.</p>' +
					'<p>You slip a hand into Johns pants to grab his cock and order him to follow you, guiding him to the bed and slowly walking in a circle until he is standing with his back to it.</p>' +
					'<p>And then you give him a firm shove.</p>' +
					'<p>He is taken by surprise, arms flaying as he falls back into the sheets with a grunt and barely able to recover from the shock before you are on top of him.</p>' +
					'<p>“Ever imagined ' + (plcT != 231 ? 'that as a married man you\'d get to' : 'your wife would get to watch you') + ' receive a blowjob from ' + (perYou.isMan() ? 'another guy' : (!perYou.isFuta() ? 'a hot teenage girl' : 'a dickgirl')) + '?” You tease him as you pull down his pants and watch his cock plopping free in front of your face.</p>' +
					'<p>“That someone else\'s lips would be around your cock again?”</p>' +
					'<p>John moans softly as your tongue slides over his manhood and sheepishly shakes his head to your question. Granted, you are probably not all that good at this, lack of experience and all, but under the dai chu, every stroke of your tongue must be setting off a dozen tiny explosions inside him, and you make sure that ' + (plcT != 231 ? 'he' : 'Tess') + ' has a good view of what you are doing.</p>' +
					'<p>And indeed, he/Tess watches curiously as you take him into your mouth and tease him with slow, measured motions. He twitches every time you find a sensitive area, moaning blissfully when you play with his balls and occasionally leaking drops of salty precum for you to lick off.</p>' +
					'<p>Over time, you develop a feeling for this. Using techniques you\'ve seen from your ' + (perYou.isMaleSex() ? 'other girls' : 'Porn collection') + ' and the general control you have through the Dai-chu, you make him edge close to the peak quite a few times, only to draw it out and enjoy his pleading moans and inability to just take more from you.</p>' +
					'<p>When you finally have enough, all it takes are a few strokes with your hand to make him shoot out his load in several powerful streaks, staining himself, the bed and even your cheek with cum.</p>' +
					(plcT == 231 ? '<p>You look to the side to see Tess starring at you; eyes widened, lower lip pulled inside and definitely not sure what to make of that situation. Nevertheless, she is happy when you call her over and pull her into a deep kiss, the taste of her husbands cock still on your lips and tongue as the two of you put on a show for him.</p>' : '')
				);
			} else {
				// Female John, so lick her pussy
				md.write('<p>You ask ' + nmJ + ' to speak privately in the bedroom. Little speaking takes place as you make love with ' + nmJ + '. She repeatedly confesses her love to you making no mention of Tess.</p>');
			}

			startQuestions();
			addLinkToPlace(md, plcT == 231 ? 'talk to the Adamses a bit more' : 'talk to ' + nmJ + ' a bit more', 231);
			addLinkToPlace(md, 'exit the Adams home', 229);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "johnsexfuckthem") {
			// John only
			md = WritePlaceHeader(false, 'td-left-med');
			if (this.isMan()) {
				if (perYou.isMaleSex()) this.showPerson("john-sex4m.gif");
				else this.showPerson("john-sex4f.gif");
			} else this.showPerson("john4.jpg");
			plcT = wherePerson("Tess");

			addPlaceTitle(md, "Fucking " + nmJ + " Adams");

			if (this.isMaleSex()) {
				// Male John
				md.write(
					'<p>John has ' + (perYou.isMan() ? 'no experience having another men as his lover' : (perYou.isFuta() ? 'obviously no experience with lovers who have both a pussy and cock' : 'apparently no experience with a woman using a strap-on')) + ', and while you are no expert on the subject yourself, yet, you certainly don\'t mind taking charge.</p>' +
					'<p>You order John to lie down on the bed and take a bottle of lube from the nightstand, generously applying it to ' + (perYou.isMaleSex() ? 'your cock' : 'the Strap-on') + ' in slow, measured strokes for him to watch as a teaser of what\'s to come. You are savoring the tension and nervous look on his face as you approach the bed and push he legs back, as you tell him to relax and watch his fingers digging into the sheets when you align the tip with his plucker.</p>' +
					'<p>“Relax, this will feel good.” You speak in a calm voice and increase his arousal to make sure he won\'t tense up and hurt himself. “You know that you can trust me.”</p>' +
					'<p>John gives you a slow nod, his posture relaxing visibly, eyes closing with a blissful sight as the well lubed shaft begins to slowly penetrate his backdoor, inch by inch sliding into the tight tunnel.</p>' +
					'<p>John moans lewdly as you start to move. His muscles squeeze ' + (perYou.isMaleSex() ? 'your cock delightfully' : 'the well lubed toy') + ' with every motion as you take hold of his ankles and lean forward, looming over him to claim his ass ' + (plcT != 231 ? 'right here on his martial bed' : 'right in front of his wife') + ' with slow, forceful thrusts.</p>' +
					'<p>It doesn\'t take a lot to push him over the edge like this. His cock is slapping against your stomach and spreading increasingly large droplets of precum with every thrust, husky moans turn into desperate gasps for air as unfamiliar sensations build up in his body and finally, he reaches his peak.</p>' +
					'<p>His climax is sending white streaks of cum flying everywhere even after you had stopped thrusting into him, creating quite a mess ' + (perYou.isMaleSex() ? 'that you happily add to by pulling out and shooting your own load over him' : 'that you happily scoop up with two fingers for him to lick clean') + '.</p>'
				);
			} else {
				// Female John
				md.write('<p>You ask ' + nmJ + ' to speak privately in the bedroom. Little speaking takes place as you make love with ' + nmJ + '. She repeatedly confesses her love to you making no mention of Tess.</p>');				
			}

			startQuestions();
			addLinkToPlace(md, plcT == 231 ? 'talk to the Adamses a bit more' : 'talk to ' + nmJ + ' a bit more', 231);
			addLinkToPlace(md, 'exit the Adams home', 229);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "johntesssex") {
			// Threesome John + Tess
			md = WritePlaceHeader(false, this.isMan() ? 'td-left-med' : '');
			if (this.isMan()) {
				if (perYou.isMaleSex()) this.showPerson("john-tess-sex1m.jpg");
				else this.showPerson("john-tess-sex1f.jpg");
			} else if (perYou.isMaleSex()) AddImage("GenericSex/sex-mff threesome a.jpg");
			else AddImage("GenericSex/foursomea.jpg");

			addPlaceTitle(md, "Making Love with the Adamses");

			if (!this.isMan()) md.write('<p>You join the Adamses in their love making and for a long time you learn what it could be like to be married. Both ' + nmJ + ' and Tess confess over and over that they are madly in love with you and declare their servitude forever.</p>');
			else {
				md.write(
					'<p>You have always wanted a taste of what married life is like, and both John and Tess are all to eager to let you take part in theirs.</p>' +
					'<p>You know the young couple already had an active sex-life before you put them under your spell, and with the mana keeping them pretty much in a perpetual state of arousal, your presence alone seems to be enough to make them forget everything outside the bedroom for hours if need be.</p>' +
					'<p>Both Tess and John become rather adventurous when offered the opportunity to involve you as a third partner, and you often find yourself swept away by their enthusiasm and shared passion.</p>' +
					(perYou.isMaleSex() ?
						'<p>One moment, Tess is sandwiched between you and her husband, moaning in ecstasy as you both thrust into her, the next, her eager lips are wrapped around one of your cocks while the other tends to her pussy in various positions.</p>' +
					   '<p>One thing never changes, though, aside from Tess sometimes stumbling over her own legs or accidentally kicking something off the nightstand. No matter whether, your lips are around her clit or his cock while the other tends to your own manhood or both John and Tess are indulging you with their tongues and lips, their spellbound eyes are always on you.</p>' :
						'<p>One moment, you are on top of Tess, her arms around you and lips locked into a wild kiss while Johns cock is pushing deeply into your pussy, the next, you are straddling her face and enjoying her eager tongue while trading kisses with John or watching him satisfy her.</p>' +
						'<p>One thing never changes, though, aside from Tess sometimes stumbling over her own legs or accidentally kicking something off the nightstand. No matter whether both you and her are indulging John\'s manhood with your tongues, your lips are around her nipples as she rides him or both their hands are exploring every inch of your body to push you closer and closer to your peak, their spellbound eyes are always on you.</p>') +
					'<p>Both of them never stop reaffirming their love for you, always thanking you for every orgasm they reach and pledging their eternal love and servitude in the aftermath.</p>'
				);
			}
			

			startQuestions();
			addLinkToPlace(md, 'talk to the Adamses a bit more', 231);
			addLinkToPlace(md, 'exit the Adams home', 229);
			WritePlaceFooter(md);
			return true;
		}		

		if (sType == "johntransformgender1") {
			CastTransform(1);
			md = WritePlaceHeader(true, '', 'black');
			showPopupWindow("Transformation",
				'<img src="Images/GenericSex/tg a.gif" style="width:50%;float:left;margin-right:6px;margin-top:1em;margin-bottom:2em" alt="TG">' +
				'You cast the spell and John cries out and he strips off his clothing. As you watch his body changes, growing plusher and you see his cock shrinking. His chest expands as you see large breasts grow and his face softens to a feminine appearance.</p>' +
				'<p>As you watch <i>her</i> figure changes, becoming slimmer, her breasts shrinking. It seems to settle for a moment and then fills out again as if it is uncertain on it\'s final form, but no matter what John is a <b>he</b>, now <b>she</b> is very definitely female, nothing masculine is left, she is completely a woman!</p>' +
				'<p>She looks quite confused, has John been affected mentally by this? How does John\'s form finally settle down?</p>' +
				'<div style="clear:both;">' +
				addOptionLink("string", 'large breasted figure', "setPersonFlag('JohnAdams',4);dispPlace(Place,'type=johntransformgender2')", "chatblock") +
				addOptionLink("string", 'slim figure', "setPersonFlag('JohnAdams',4);setPersonFlag('JohnAdams',6);dispPlace(Place,'type=johntransformgender2')", "chatblock") +
				'</div>',
				'', '', true, true
			);
			setQueryParams("");
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		if (sType == "johntransformgender2") {
			md = WritePlaceHeader(true, '', 'black');
			if (this.checkFlag(6)) this.dress = "Female2";
			else this.dress = "Female1";
	
			showPopupWindow("Transformation",
				'<img src="Images/People/JohnAdams/' + this.dress + '/xf1.jpg" class="imgpopup" alt="TG2">' +
				(!this.checkFlag(6) ?
					'John\'s body shifts, fills out and her breasts grow very large, and she sits there, cradling them. You would guess G cup...you notice his clothing was also changed by the spell but it hard to say exactly how.'
				:	'John\s body shift, growing slimmer and feminine with slight breasts. Her hair grows longer and you notice his clothing was also changed by the spell but it hard to say exactly how.') +
				' She says,</p><p>"I feel different, but I do not quite know how. I remember my job, my family, my...wife...but these seem..wrong. I am...also finding it hard to remember some other things, my wifes name...my name...Adams is my last name. Joe..John..Joan..John seems best but this body does not belong to a John...</p>' +
				'<p>She seems to be in a bit of a confused state, her memories were affected, this is an opportunity to help or manipulate as you prefer. So you tell her what her name is...' +				
				addOptionLink("string", '"John"', "setPersonFlag('JohnAdams',5,false);dispPlace(Place,'type=johntransformgender3')", "chatblock") +
				addOptionLink("string", '"Joan"', "charmPerson('JohnAdams',2);setPersonFlag('JohnAdams',5);dispPlace(Place,'type=johntransformgender3')", "chatblock"),
				'', '', true, true
			);
			setQueryParams("");
			WritePlaceFooter(md, '', true, true);
			return true;
		}	
		if (sType == "johntransformgender3") {
			md = WritePlaceHeader(true, '', 'black');
			showPopupWindow("Transformation",
				'<img src="Images/People/JohnAdams/' + this.dress + '/xf2.jpg" class="imgpopup" alt="TG3">' +
				(!this.checkFlag(5) ? 
					'You tell her that her name is John, and your slave and lover. You make no mention of Tess, and emphasise <b>her</b> devotion to you.' :
					'You tell <b>her</b> that her name is Joan, you large breasted slut and devoted slave. You stress that she has never been married and you are all she desires.'
				) +
				'</p><p>She looks at you, her confusion lifting and she stands and asks to excuse her as she goes and dresses again. She bends over and picks up her clothing and steps out for a few minutes to dress. It sounds like she has some difficulty dressing and you offer to assist. She refuses and a few minutes later rejoins you.',
				'dispPlace()', '', true
			);
			setQueryParams("");
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		if (sType == "johntransformgendermale") {
			CastTransform(1);
			this.setFlag(4, false);
			this.setFlag(5, false);
			this.setFlag(6, false);
			this.dress = "Male";
			md = WritePlaceHeader(true, "", "black");
			showPopupWindow("Transformation",
				'<img src="Images/GenericSex/tg b.gif" style="width:50%;float:left;margin-right:6px;margin-top:1em;margin-bottom:2em" alt="TG">' +
				"You cast the spell and John cries out and he strips off his clothing. As you watch his body changes, growing firmer and you see his cock growing. His chest diminshes as you see large breasts dissapear and his face hardens to a masculine appearance.</p>"
			);
			setQueryParams("");
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPerson("poledancea.jpg");
		addPlaceTitle(md, this.getPersonName(false) + "'s Dance");
		if (this.isMaleSex()) {
			md.write(
				'<p>John is dressed in a sort of Zorro or similar inspired gear, with a mask and a whip. He has clearly done something like this before, possibly dancing for Tess?</p>' +	
				'<p>After he sits with you for a while, pleased at the audiences reactions and your attention.</p>'
			);
		} else {
			md.write(
				'<p>' + this.getPersonName() + ' is uncertain as she steps onto the stage, probably more familar with watching such dances than performing them. She is dressed ' + (this.dress == 'Female2' ? 'a sort of cheerleader outfit' : 'a green fishnet sort of outfit') + '. Initially uncertain her confidence improves and she does an effective strip-tease.</p>' +	
				'<p>After she sits with you for a while, pleased at the audiences reactions and your attention, but still a bit confused.</p>'
			);			
		}
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after ' + this.getHisHer() + ' dance', Place);
		WritePlaceFooter(md);
	};

	per.handleItem = function(no, cmd)
	{	
		// Examining the Soul Bound Crystal [Ring]
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere()) {
					examineItem(no, 'The ' + s + ' vibrates softly the closer you get to ' + this.getPersonName(false) + '.');
					return "handled";
				}
			}
		}

		// Casting the transform spell
		if (no == 18 && cmd == 2) {

			// At the Adams home
			if (this.isHere()) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over him but nothing happens, you seem to need a magical link to him");
					return "handled";
				}
				if (wherePerson("Tess") == 230) {
					addComments("Tess is here, you should do this when she is not around");
					return "handled";
				}
				if (!CastTransform(1, true)) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(Place, this.checkFlag(4) ? 'type=johntransformgendermale' : 'type=johntransformgender1');
				return "nofooter";
			}
		}
		
		// Casting the charm spell
		else if (no == 14 && cmd == 2) {
			// Adams' Residence
			if (Place == 230) {
				if (perYou.checkFlag(19)) CastCharmSpell("JohnAdams", 230, 1, 'type=johncharm1');
				else addComments("The spell fails to work on John Adams as the spell only affects the feminine.");
				return "handled";
			}
		}
		return '';
	};

	// Phone calls
	per.isPhoneable = function() {
		// Can you call them?
		// Miss Logan not bred and is a breeder
		if (this.isCharmedBy() && this.isMan() && Place == 440 && !checkPersonFlag("MissLogan", 1) && per.getCharmedLevel() == 2) return true;
		// Swimming
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.isCharmedBy() && this.place == 230;
	};

	per.callThem = function() {
		if (Place == 440) gotoPlace(Place, 'type=missloganbreeder&who=' + this.uid, 'You tell Ms. Logan that you have someone in mind to help impregnate her, and after placing the call the two of you wait for their arival.');
		else if (Place == 269) {
			gotoPlace(Place, 'type=johnpool');
			receiveCall('', 'You call ' + nmJ + ' to invite him to join you at the pool for a swim, and he answers, "Sure, why not!" and promises to be there soon.');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	per.addPersonPhoneCall = function() {
		if (!this.isCharmedBy()) {
			if (Place != 230 && (nTime - this.charmedTime) > 12 && !this.checkFlag(10) && (this.checkFlag(9) || (this.checkFlag(8) && this.other > 9))) {
				// SMS 320, 1hr after being kicked out of Adams home, technically from Tess
				if (makeCall(true, 320)) this.setFlag(10);
			}
		}
		return false;
	};
}
