/****************************************************************
		Madison
****************************************************************/
function ExitMagnet(no)
{
	Leave();
	findPerson("Madison");
	if (whereItem(38) == 0) moveItem(38, 45);		// Add the item to the Kitchen
	per.setFlag(5);		// Flag that you did not charm her
	
	if (no == 1) setComments('<img src="Images/' + per.getImg('madison-face.jpg') + '" style="float:right;width:20%;margin-bottom:1em;margin-left:5px"><b>Madison</b><br>"Thanks for understanding", and she leaves you to do more deliveries');
	else if (no == 2) setComments('<img src="Images/' + per.getImg('madison-face.jpg') + '" style="float:right;width:20%;margin-bottom:1em;margin-left:5px"><b>Madison</b><br>"Sorry", and she leaves you alone with the broken prize');
	else setComments('<img src="Images/' + per.getImg('madison-face.jpg') + '" style="float:right;width:20%;margin-bottom:1em;margin-left:5px"><b>Madison</b><br>"No way, I\'m not that sort of girl", and she leaves you alone with the broken prize');
	
	dispPlace(45, '');
}

function RepliesMadison(nR)
{
	var perMadison = per;
	//var perZoey = findPerson("Zoey");
	setQueryParams('');
	var hr = getHour();

	if (nR == 100)	{
		if (!perMadison.checkFlag(9)) {
			// First time asking about her
			addComments(
				'You ask Madison about the other delivery girl, Zoey,</p>' +
				'<p>"' + perYou.getMaster() + ' you will really like Zoey! She is cute, bisexual and dating Nina and a guy in accounting, not at the same time.</p>'
			);
			if (hr != 12 && (hr < 16 || hr > 17)) {
				addComments(
					'<p>She\'s real busy most of the time, if you want to meet her, you know <i>meet her</i> you can sometimes catch her at lunch time, or more often at the end of the work day. I\'ll send you a message when I next see her!"</p>' +
					'<p>Ok, you will have to come back another time.</p>'
				);
				perMadison.setFlag(11);
			} else {
				addComments(
					'<p>Hey, I just saw her a little while ago, I\'ll call her to visit, can I watch, or take part?"</p>' +
					'<p>Your slave Madison is the naughty girl, isn\'t she? Of course you agree!</p>'
				);
				setQueryParams('type=madisonzoey');
			}

		} else {
			// Later visits
			if ((hr == 12) || (hr == 16 || hr == 17)) {
				addComments(
					'<p>"Hey, I just saw her a little while ago, I\'ll call her to visit, can I watch, or take part?"</p>' +
					'<p>Your slave Madison is the naughty girl, isn\'t she? Of course you agree!</p>'
				);
				setQueryParams('type=madisonzoey');
			} else {
				addComments(
					'<p>"' + perYou.getMaster() + ' sorry Zoey is out on a delivery now."</p>'
				);
			}
		}
		perMadison.setFlag(9);
		perMadison.setFlag(10);
	}
	else if (nR == 101)	{
		if ((hr == 12) || (hr == 16 || hr == 17)) {
			addComments(
				'<p>"Hey, I just saw her a little while ago, I\'ll call her to visit, can I watch, or take part?"</p>' +
				'<p>Your slave Madison is the naughty girl, isn\'t she? Of course you agree!</p>'
			);
			Place = 414;
			setQueryParams('type=visitzoey');
		} else {
			addComments(
				'<p>"' + perYou.getMaster() + ' sorry Zoey is out on a delivery now."</p>'
			);
		}
	}

	return true;
}

function Enjoy412(msg)
{
	Leave(true);
	if (!msg) WriteComments("You sate youself on Madison's body and leave her satisfied but wanting more");
	else WriteComments(msg);
	dispPlace(371, "");
}

// Initialise
function initialiseMadison()
{
	// Madison
	addPerson("Madison", 0, "Madison", '', false);
	per.Replies = RepliesMadison;

	per.isPersonInfo = function() { return this.isCharmedBy(); };
	per.getPersonInfo = function() {
		return this.addPersonString("madison15o.jpg", "height:max%", "right") +
			'Well, it looks like Madison is quite a nasty little tigress in bed. She regularly changes her clothes, each time a dress that pleases your sexual hunger more. She often teases you by appearing half naked already when you just have entered her workplace. You ordered her to continue her job as a mail and package carrier to avoid unnecessary attention from the townsfolk. She agreed and playfully added that she will personally bring any mail or packages of yours to your house without wearing any underwear. She mentioned that she will also bring an "appetite that only you can soothe".' +
			'Again, aside from her pantyhose she’s fully naked, she sensed that you were coming and wanted to surprise you.';
	};
	
	per.getPersonAddress = function() { return isPlaceKnown("MadisonsApartment") ? 'Apartment 26, 42 Celeste Rd' : ''; };	

	per.whereNow = function() 
	{
		if (Place == 412 || Place == 414 || Place == 413 || sType == "madisondelivery1" || sType == "madisondelivery2") return Place;
		if (!this.checkFlag(16) && !this.checkFlag(17)) {
			var hr = getHour();
			if (((hr >= 6 && hr < 9) || (hr >= 20) || getDay(true) == "Sun") && !isPlaceKnown("MadisonsApartment")) return 456;
		}
		if (!isShopOpen()) return 465;
		return this.place;
	};
	
	per.getNextDress = function(drs) {
		this.other++;
		if (this.other > 2) this.other = 0;
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 465 && this.isHere()) {
			if (sType === "") return this.showPerson("madisonhome" + (this.other + 6) + "a.jpg", '', '', '', '', false, "string");
			else if (sType === "madisonstrip") return this.showPerson("madisonhome" + (this.other + 6) + "b" + (this.checkFlag(13) ? 'be' : '') + ".jpg", '', '', '', '', false, "string");
		}
		return '';
	};
	
	per.isPlaceImageRight = function()
	{
		return Place == 456 && this.isHere();
	};

	per.showPlaceImageRight = function(md)
	{
		this.showPerson("madisonhome1a.jpg");
	};

	per.showEventPopup = function()
	{
		if (Place != 412) this.setFlag(10, false);
		
		if (Place == 456 && this.isHere()) {
			if (!this.checkFlag(16)) {
				this.setFlag(16);
				this.setFlag(17);
				setPlaceKnown('MadisonsApartment');
				if (this.isCharmedBy()) {
					showPopupWindow("Madison!",
						this.addPersonString("madisonhome1b.jpg", "height:max%", "right") +
						'You hear a familiar squeal the moment you enter the apartment foyer and almost immediately someone pulls you into a hug.</p>' +
						'<p>“' + perYou.getMaster() + '! Uh, I mean, ' + perYou.getPersonName() + '!” Madison looks around and smiles at you conspiratorially. “What brings you to my apartment... is it what I hope it is?”</p>' +
						'<p>Come to think of it, you never bothered to ask for Madison\'s home address. Well, there was never a need with her being permanently on call, so you tell her truthfully that you are here to see one of your other girls, which doesn\'t bother her in the sightliest.</p>' +
						'<p>“Gifford? Well, you are a huge improvement over the jerk she has been seeing lately.” Madison slowly releases you from her hug. “But since you\'ll be around the area you really have to... I mean, I would really love to see you drop in, if you like... ' + perYou.getMaster() + '.” She quietly adds the final work with a wink.</p>' +
						'<p>“I haven\'t thanked you nearly enough.”' +
						addOptionLink("string", 'visit Madison in her apartment', "bPopupShown=false;dispPlace(465,'','Madison rubs her hands together gleefully and pulls you into her a apartment, once again reassuring you that she is willing to fulfill your -every- desire.')", "chatblock", "width:30%;margin-left:10%") +
						addOptionLink("string", 'leave for now and visit later', "bPopupShown=false;dispPlace(456,'','Madison looks disappointed for a moment, but you assure her that you intent to visit, if she continues to be a good little servant to you, and instantly brighten her mood.')", "chatblock", "width:30%;margin-left:10%"),
						'', '', true, true, true
					);
				} else if (this.checkFlag(4)) {
					showPopupWindow("Madison?",
						this.addPersonString("madisonhome1a.jpg", "height:max%", "right") +
						'<p>You are almost run over by a familiar girl coming out of one the doors, and even without her uniform you quickly recognize Madison, the girl who had delivered, and broken, your stereo a while back.</p>' +
						'<p>“I... I\'m so sorry, I didn\'t see you and... Oh! You are ' + perYou.getPersonName() + '.” Madison is clearly embarrassed now. “Sorry again, you must think I am a complete klutz now, but I swear I usually get from a to b without breaking things... or people.”</p>' +
						'<p>You assure her that no harm was done, and she smiles awkwardly. “Thank you. I\'m still waiting for a word from the insurance company regarding your stereo, by the way, but I\'ll keep you informed as soon as I hear anything new about the incident.”'
					);
				} else {
					showPopupWindow("Madison?",
						this.addPersonString("madisonhome1a.jpg", "height:max%", "right") +
						'<p>You don\'t really have time to react when a door opens right to your left and the person rushing out of it runs into you.</p>' +
						'<p>There is a thud and a short moment of staggering, but you somehow manage to keep your balance and prevent both of you from falling over, and the girl who ran into you looks at you wide-eyed.</p>' +
						'<p>“Oh my!” She takes a step away from you. “I\'m so sorry, I was in a hurry and didn\'t think anyone was in the foyer... you are not hurt, are you?”</p>' +
						'<p>You finally get a good look at the unwilling assailant, and she does seem familiar... and really cute. If you could only remember her name....</p>' +
						'<p>“I\'m okay.” You reassure her. “Say, we have met, have we?”</p>' +
						'<p>“Maybe, I work for station 550\'s delivery service, so I get around town a lot, my name\'s Madison.”</p>' +
						'<p>“I\'m ' + perYou.getPersonName() + ', It\'s a pleasure.”</p>' +
						'<p>“Likewise.” She smiles to you. ”I need to be on my way, but again, I\'m really sorry for running into you, I\'m usually not that much of a klutz, I swear.”'
					);				
				}
				return true;
			}
		} else if (nFromPlace == 456 && this.whereNow() == 456) this.setFlag(17);
		return false;
	};

	per.passTimeDay = function() 
	{
		if (this.checkFlag(12) && !isCharmedBy("Zoey")) this.setFlag(12, false);
		this.setFlag(16, false);
		return "";
	};

	per.showEvent = function()
	{
		var md;
		
		if (sType == "callmadison") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			if (!perYou.isMaleSex()) this.showPerson("madison-call-g.jpg");
			else this.showPersonRorX("madison-call-b.jpg");
			addPlaceTitle(md, "Delivery Call-Girl Madison");
			md.write(
				'<p>Madison arrives and she exclaims,</p>' +
				'<p>"Well ' + perYou.getMaster() + ' one delivery girl as ordered, and one orgasm for delivery!"</p>' +
				'<p>She takes you over to a nearby grassy area and strips off her clothing, and looks at you, "Do you have a <i>' + (perYou.isMaleSex() ? 'package' : 'slot') + '</i> for me to make my delivery?"</p>' +
				'<p>You do and remove some of your clothing and let her deliver her service to you, a skilled if very public ' + (perYou.isMaleSex() ? 'blowjob' : 'pussy-lick') + '.</p>'
			);
			startQuestions();
			this.addDancingLink(md, 'ask Madison to dance for you in the club',
				'You ask your delivery-girl about dancing in the Avernus club and that you want her to dance for you there tonight,</p>' +
				'<p>&quot;Yes of course ' + perYou.getMaster() + ' anytime!&quot; and with that you call Jade to arrange a dance for Madison.'
			);			
			addLinkToPlace(md, 'let Madison continue on her way', Place);
			AddRightColumnMed(md);
			this.showPerson("madison11.jpg");
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269) {
			if (sType == "madisonpool") {
				md = WritePlaceHeader(false, 'td-left-large');
				this.showPerson("madison-pool.jpg");
				addPlaceTitle(md, "Pool-Girl Madison");
				md.write(
					'<p>Madison arrives and quickly changes into her swimsuit, or at least part of it!</p>' +
					'<p>You have a fun time relaxing and playing with your delivery-girl!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'let\'s have some more fun...', Place, 'type=madisonpoolsex');
				addLinkToPlaceC(md, 'say goodbye to Madison', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "madisonpoolsex") {
				var bStrap = !perYou.isMaleSex() && perYou.FindItem(45) > 0;
				md = WritePlaceHeader(false, bStrap ? '' : 'td-left-large');
				if (bStrap) this.showPersonX("pool-sex-strapon.jpg");
				else this.showPerson("madison-pool-sex" + (this.checkFlag(13) ? '-be' : '') + ".jpg");
				addPlaceTitle(md, "More Fun with Madison");
				md.write('<p>You ask your delivery girl to have some more intimate fun, and she seductively removes most of her bikini, ready for you!');
				if (bStrap) md.write(' You get from your bag your strap-on and tell Madison it is time for some pool-side plastic fun!');
				else md.write('</p>');
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Madison', Place);
				WritePlaceFooter(md);
				return true;
			}			
		}
		
		if (Place == 45 && sType == "madisondelivery1") {
			// Event: Radio MC550 Prize part 1
			md = WritePlaceHeader();
			this.showPerson("madison2.jpg");

			addPlaceTitle(md, "Radio MC550 Prize");

			if (getQueryParam("met") == "true") md.write('<p>You open the door to leave and remember you heard someone knocking. Standing there is');
			else md.write('<p>Opening the door you are greeted by');
			
			md.write(
				'a young lady who looks to be in her mid twenties. At first you don’t understand why she’s here and what she wants, but after a quick look you realize she must be the one who brings you your prize you won with the radio puzzle. Judging by her uniform (which fits her rather sexily) and the package she is carrying you think she is working for the TV station.</p>' +
				'<p>You hastily greet and let the pretty blonde into your house.</p>' +
				'<p>"Special delivery," she says. "I\'m Madison. You are the lucky winner of our radio station\'s contest. Today\'s prize is a stereo."</p>'
			);

			startQuestions();
			addLinkToPlace(md, "ask Madison to bring the stereo inside", Place, 'type=madisondelivery2');
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 45 && sType == "madisondelivery2") {
			// Event: Radio MC550 Prize part 2
			md = WritePlaceHeader();
			if (whereItem(38) == 0) moveItem(38, 45);		// Add the item here

			this.showPerson("madison3.jpg");

			addPlaceTitle(md, "Radio MC550 Prize");

			if (perYou.getQuestRustyKey() == 7) perYou.setQuestRustyKey(8);

			md.write(
				'<p>Madison tries to carry the equipment inside. Her high heels catch on the step, and before you can rescue her she drops the package.</p>' +
				'<p>"Oh my!" she says. "I\'m so sorry. Please don\'t tell the radio station what happened! It will be the end of my job if they find out."</p>' +
				'<p>You open the package. Inside the stereo is okay but the speakers are a mess. You open a speaker causing a small magnet to fall out.</p>'
			);

			startQuestions();
			startAlternatives(md, "You could choose <b>one</b> of the following");
			addOptionLink(md, "Well, there is nothing that can be done, tell Madison to leave", 'ExitMagnet(1)');
			addOptionLink(md, "angrily tell Madison to leave", 'ExitMagnet(2)');
			addOptionLinkC(md, '"Well, you could make it up to me in another way"', 'ExitMagnet(3)');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 465) {
			if (sType == "charmmadisonapartment1") {
				// Event: Charm Madison in her apartment
				setPlaceKnown('MadisonsApartment');
				md = WritePlaceHeader();
				this.showPerson("madisonhome2.jpg");
				addPlaceTitle(md, "Madison Under A Charm Spell");
				md.write(
					'<p> "What did... I... Um... Sorry?" She stammers, her demeanor towards you instantly changing as the spell begins to set in.</p>' +
					'<p>"You know," she starts in after a moment to \'regain\' her senses. "You\'re kinda cute and all... and I\'m seriously sorry about running you over, so... why don\'t you come inside and we\'ll see if I can make it up to you?”"</p>' +
					'<p>"Thank you, and yes, you really need to watch out where you are going," you say as you follow her into her apartment, trying to look upset, when it was pretty much a stroke of luck to run into a cute girl like her.</p>' +
					'<p>Who is about to be all yours.</p>' +
					'<p>"I know, I know..." she says, eyeing you up and down as if she\'s about to jump you right here and now. "Tell you what... you tell me what you want me to do to make up for it and I\'ll do it."</p>' +
					'<p>The flash of the spell in her eyes tells you that you could literally ask for anything and she would do it... but what\'s the point of rushing things...</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '”Lift your shirt and show me your breasts”', Place, 'type=charmmadisonapartment2');
				WritePlaceFooter(md);
				return true;				
			}
			if (sType == "charmmadisonapartment2") {
				// Event: Charm Madison in her apartment
				md = WritePlaceHeader();
				this.showPerson("madisonhome3.jpg");
				addPlaceTitle(md, "Madison Under A Charm Spell");
				md.write(
					'<p>She hesitates for only a moment before the heightened desire from the spell banishes all modesty that may have gotten in the way. "Anything you say," she says, flashing you a grin, and moments later she not only has her shirt and bra lifted up but has also opened her pants and revealed her underwear to you.</p>' +
					'<p>You\'re not sure if she even realizes how far she has already fallen. "Not a bad start," you say, challenging her for more.</p>' +
					'<p>"Oh yeah," she says, rising to the bait. "Not enough for you, huh? Good thing you\'re so cute. Normally I wouldn\'t dare do stuff like this," she says, her voice completely missing the concern that you would expect in that statement. "So, what else do I have to do to make up for it?"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Display yourself for my viewing pleasure”', Place, 'type=charmmadisonapartment3');
				WritePlaceFooter(md);
				return true;				
			}	
			if (sType == "charmmadisonapartment3") {
				// Event: Charm Madison in her apartment
				md = WritePlaceHeader();
				this.showPerson("madisonhome4.jpg");
				addPlaceTitle(md, "Madison Under A Charm Spell");
				md.write(
					'<p>A devilish smile crosses her face as she completely strips of her pants and knees on the bed seductively. "Does this please you... ' + perYou.getMaster() + '?" she asks playfully.</p>' +
					'<p>You smile at her word choice. "Yes, in fact it does," you say with an evil grin. "As a matter of fact, lets keep the ' + perYou.getMaster() + ' thing going, shall we?" you say as you inspect the nubile young form before you.</p>' +
					'<p>"As you wish, ' + perYou.getMaster() + '," she says, almost purring this time. "Is there anything else I can do to please ' + perYou.getMaster() + '?"</p>' +
					'<p>"Well, there was one thing..." you say, stepping up and running your hands across her warm and inviting flesh.</p>' +
					'<p>Her body instantly reacts to your touch, a soft moan escaping her lips as you tease her nipples and your hand runs down into her pantyhose to her moist snatch. "Do you like being my slave?" you whisper into her ear.</p>' +
					'<p>"Yessss..." she whispers in return as her body shudders with orgasm from your attention.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'take it to the next level', Place, 'type=charmmadisonapartment4');
				WritePlaceFooter(md);
				return true;				
			}
			if (sType == "charmmadisonapartment4") {
				// Event: Charm Madison in her apartment
				md = WritePlaceHeader();
				this.showPerson("madisonhome5.jpg");
				addPlaceTitle(md, "Madison Under A Charm Spell");
				md.write(
					'<p>"Oh my god," she says as you step away from her. "No one has ever made me feel like that." And you watch as she shudders from just thinking about the orgasm she just experienced. "You have to do that again."</p>' +
					'<p>"I don\'t have to do anything," you say forcefully. "You are my slave, remember? You said it yourself."</p>' +
					'<p>"But, but," she stutters, looking like a toddler that just had her favorite toy taken away.</p>' +
					'<p>"But nothing, slave. I am your ' + perYou.getMaster() + ' now, and you will do anything and everything I say just for the hope of pleasure the likes of which I just gave you." Fear and doubt flash across her face as you continue. "Remember, you are the one who wants to make up to me..."</p>' +
					'<p>"Besides," you say, stepping up and running your hand down over her breast. "It is not as if you didn\'t like being my slave and that was for just a moment. Think of what it would be like to be my slave... permanently. You\'d like that, wouldn\'t you."</p>' +
					'<p>It takes her a moment, but she eventually whispers... "Yes," ever-so-quietly.</p>' +
					'<p>"Yes... what?" you whisper flatly in her ear.</p>' +
					'<p>"Yes ' + perYou.getMaster() + '," she says, finally looking you in the eye before you give her a deep, deep kiss. You can feel her body shudder from yet another orgasm as she finally gives in and accepts her fate.</p>' +
					'<p>"What do you wish of me, ' + perYou.getMaster() + '?" she asks finally.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'enjoy Madison\'s tongue', Place, 'type=madisonoral');
				addLinkToPlaceC(md, 'enjoy Madison\'s body', Place, 'type=madisonsex');
				addLinkToPlace(md, 'tell Madison to wear something sexy and get ready for you', Place, '', '"Of course, ' + perYou.getMaster() + ', give me a moment to undress... and feel free to watch."', 'Madison');
				WritePlaceFooter(md);
				return true;				
			}	
			if (sType == "madisonknock") {
				// Event: Knock on Madison's door and she is not charmed
				md = WritePlaceHeader();
				this.showPerson("madisonhome1a.jpg");
				addPlaceTitle(md, "Madison's Apartment");
				md.write(
					'<p>Madison opens the door and greets you with a friendly smile. She asks if you need anything, but it doesn\'t look like she has any intent to chat or even ask you inside.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'you just wanted to say hello and be on your way', 456);
				WritePlaceFooter(md);
				return true;					
			}
			
			if (sType == "madisonoral") {
				// Oral sex in her apartment
				md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-med' : '');
				this.showPersonRorX(perYou.isMaleSex() ? "madisonsex7.jpg" : "madisonsex10.jpg");
				addPlaceTitle(md, "Madison's Tongue");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>Madison\'s eyes follow your hands as you slowly unbuckle your belt, and you watch her twitch and pull in her lower lip in anticipation while you take out your manhood and slowly stroke it in front of her.</p>' +
						'<p>She\'s cute when she desperately tries to restrain herself and wait for your orders, nervously gnawing on her lower lip as you drag the moment out a little longer and keeping her spellbound eyes locked on the slowly hardening shaft in your hands.</p>' +
						'<p>When you finally tell her to get on her knees and open wide, she almost falls over in her haste and you simply take a hold of her hair and push her face against your crotch before she has fully recovered.</p>' +
						'<p>Madison eagerly rubs her face against your cock and exhales a content sigh before her lips wrap around the tip and her head pushes forward.</p>' +
						'<p>You keep one hand on her hair and let her work. Madison isn\'t able to deepthroat you, yet, but she is surprisingly skilled and always takes to the task with a lot of enthusiasm. Her head is bobbing back and forth with lewd, muffled moans, her tongue eagerly traces every vein along your shaft and, of course, she eagerly swallows every single drop when you finally unload your seed into her mouth and makes sure to thank you for doing so.</p>' +
						'<p>Like the good, spellbound little slave she is.</p>'
					);
				} else {
					md.write(
						'<p>Madison\'s eyes follow your hands as you slowly unbuckle your belt, and you watch her twitch and pull in her lower lip in anticipation while you reveal your pussy and begin to slowly caress your folds.</p>' +
						'<p>She\'s cute when she desperately tries to restrain herself and wait for your orders, nervously gnawing on her lower lip as you drag the moment out a little longer and keeping her spellbound eyes locked on your petals while you coat your fingers in your own moisture.</p>' +
						'<p>When you finally remove your clothes and tell her to knee in front of you, she almost trips in her haste to follow up and you simply take a hold of her hair and push her face against your crotch before she has fully recovered.</p>' +
						'<p>Madison eagerly runs her tongue through your folds, inhales your scent and exhales a content sigh before her lips wrap around your clit and her tongue begins to circle the little nub.</p>' +
						'<p>You keep one hand on her head and let her work. Madison has little actual experience with other women but she has always fantasized about it, specifically some of her coworkers, and consistently takes to the task with a lot of enthusiasm. Her head moves back and forth with lewd, muffled moans, her tongue eagerly caresses every millimeter of your folds and clit and, of course, she eagerly cleans up every single drop of your juices when you finally reach your peak and makes sure to thank you for being allowed to do so.</p>' +
						'<p>Like the good, spellbound little slave she is.</p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, 'talk more with Madison', Place);
				WritePlaceFooter(md);
				return true;					
			}	
			
			if (sType == "madisonsex") {
				// Sex in her apartment
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPersonRorX(perYou.isMaleSex() ? "madisonsex8.jpg" : "madisonsex1.jpg");
				addPlaceTitle(md, "Madison's Body");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>Madison almost squeals when you order her to strip fully and present herself to you on the bed, hastily throwing off  what remains of her current outfit and rushing into the bedroom.</p>' +
						'<p>You take your time to undress while you follow her, and when you enter the room,  she is already resting on all fours, her body bend forward on the bed and her legs lewdly spread to give you a good view of her exposed, wet folds.</p>' +
						'<p>“' + perYou.getMaster() + '... please...” Her voice shivers ever so slightly as you approach, and you watch her entire body tense up the moment you run your fingers over her well-rounded ass.</p>' +
						'<p>“Please what?” You begin to knead both buttocks with your hands, your hip aligning with hers.</p>' +
						'<p>“Please fuck me!” She speaks with a firm, albeit rather husky voice. “I want to feel... I...I mean, I beg you to put your dick inside me!”</p>' +
						'<p>You chuckle softly, Madison has taken to her role as your slave better than many other girls under your spell, and despite her begging and impatience, you know she relishes the moments where you tease and deny her.</p>' +
						'<p>But of course, she also relishes the times you just straight up fuck her, and this is what you intent to do now.</p>' +
						'<p>Her inner walls tightly squeeze your manhood as you push into her wetness and slowly, you begin to roll your hip back and forth against her body.</p>' +
						'<p>Madison coos lewdly and digs her fingers into the bed-sheet below, bracing herself as you pick up the pace and your motions grow faster and rougher, both of your hands holding on to her hip while the spellbound little tigress moans and screams her lust into the room until both of you reach your climax and you unload yourself into her warm embrace. </p>'
					);
				} else {
					md.write(
						'<p>Madison almost squeals when you order her to strip fully and present herself to you on the bed, hasty throwing off  what remains of her current outfit and rushing into the bedroom.</p>' +
						'<p>You take your time to undress while you follow her, and when you enter the room,  she is already resting on all fours, her body bend forward on the bed and her legs lewdly spread to give you a good view of her dripping wet folds.</p>' +
						'<p>“Mistress... please...” Her voice shivers ever so slightly as you approach, and you watch her entire body tense up the moment you run your fingers over her well-rounded ass.</p>' +
						'<p>“Please what?” You begin to knead her buttocks, driving your fingertips up to the small of her back and back down, your thumbs brushing past her folds.</p>' +
						'<p>“Please fuck me!” She speaks with a firm, albeit rather husky voice, her body shivering under your touch. “I want to... I mean, I beg you to make me cum!”</p>' +
						'<p>You chuckle softly, Madison has taken to her role as your slave better than many other girls under your spell, and despite her begging and impatience, you know she relishes the moments where you tease and deny her.</p>' +
						'<p>But of course, she also relishes the times the two of you just straight up fuck, so you crawl up next to her on the bed and deeply push your fingers into her warm opening, enjoying the sensation of her inner walls tightly constricting around your hand while you move deeper into her wetness and slowly you begin to push in and out of her.</p>' +
						'<p>Madison coos lewdly and digs her fingers into the bed-sheet below, bracing herself as you pick up the pace and your motions grow faster and rougher, twisting your hand and massaging her most sensitive spots while the spellbound little tigress moans and screams her lust into the room until she reaches her climax, the first of many for both of you.</p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, 'talk more with Madison', Place);
				WritePlaceFooter(md);
				return true;					
			}
			
			if (sType == "madisonstraponfuck") {
				// Strap-on sex
				md = WritePlaceHeader();
				this.showPersonRorX("madisonsex2.jpg");
				addPlaceTitle(md, "Madison's Apartment");
				md.write(
					'<p>“You remember this one, right?” You take out your strap-on with a smirk and watch as a pleasant shiver runs through Madison\'s body.</p>' +
					'<p>“Ohhh... how could I forget?” She slowly runs her tongue over her lips, eyes focused on the toy. “Are we going to use it, Mistress?”</p>' +
					'<p>“You bet.”</p>' +
					'<p>“I can\'t wait!”</p>' +
					'<p>You have Madison help you out of your clothes and attach the strap on to your hip, watching as she fumbles her way around the zippers, buttons and straps with shaky hands in her attempts to strip you down as fast as possible.</p>' +
					'<p>“Impatient?”</p>' +
					'<p>“Always, Mistress!”</p>' +
					'<p>The last pieces of cloth finally hits the floor and Madison fastens the leather straps in place, her head still on level with your crotch and the pink shine in her eyes flaring up as they focus on the toy cock.</p>' +
					'<p>You order her to make sure it is nice and wet before you use it and watch as Madison\'s tongue trails around the rubber cock to make sure that every little inch is covered in a fine layer of saliva before you, satisfied with her work, let yourself fall on a nearby chair and pull her into your lap for the main event.</p>' +
					'<p>Madison moans softly as she aligns her folds with the tip of your rubber-cock, briefly teasing her clit with it before she pushes her body down and drives the toy as deeply into her tight embrace as she is able to.</p>' +
					'<p>You wrap your arms around the girl and allow her to pick the pace, one hand playing with her little nub while her body begins to roll back and forth against the plastic phallus and every motion forces  another lewd noise from the spellbound girl\'s lips.</p>' +
					'<p>“Mistress I...I...”</p>' +
					'<p>You feel her body tremble in your embrace, her muscles twitching as her climax begins to build up and decide to give her one last push by wrapping one hand around her neck and pulling her close to you while your other hand firmly rubs her clit, keeping her close to you and sending her into an intense, and certainly loud climax.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'you just wanted to say hello and be on your way', 456);
				WritePlaceFooter(md);
				return true;					
			}
			
			if (sType == "callmadisonzoey") {
				// Madison/Zoey threesome in the apartment - start
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPerson("madisonzoey1.jpg");
				addPlaceTitle(md, "Madison and Zoey");
				md.write(
					'<p>Zoey must have been nearby, it takes only a few minutes before she rings the doorbell and you let her in, much to Madison\'s delight. She pulls Zoey into the bedroom, throws her on the bed before the other woman had any chance to say something and quickly removes her clothes.</p>' +
					'<p>Zoey on her end, seems taken aback by her coworkers enthusiasm. An attempt to speak is muffled by a sudden kiss, and she soon finds herself pinned naked under Madison\'s body, who makes sure to spread her legs and expectantly looks to you over her shoulder.</p>' +
					'<p>“We are ready, ' + perYou.getMaster() + '!”</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'have both girls tend to you', Place, 'type=callmadisonzoeytend');
				addLinkToPlace(md, 'let your delivery girls put on a show', Place, 'type=callmadisonzoeyshow');
				addLinkToPlace(md, 'say goodbye to Zoey', Place, '', 'Zoey happily leaves, suggesting you can always call for another "delivery"');
				WritePlaceFooter(md);
				return true;					
			}
			if (sType == "callmadisonzoeytend") {
				// Madison/Zoey threesome in the apartment - tend
				md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
				if (perYou.isMaleSex()) this.showPerson("madisonzoey2.jpg");
				else this.showPersonRorX("madisonzoey4.jpg");
				addPlaceTitle(md, "Madison and Zoey Tending to You");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You have used the time to undress as well and, having moved to the edge of the bed, beckon the two delivery girls towards your half erect manhood.</p>' +
						'<p>Madison is the first to reach out for it, tracing her tongue around the tip while Zoey wordlessly follows her lead and affectionately licks the base and fondles your ballsack.</p>' +
						'<p>Your manhood hardens quickly under their combined care and you enjoy the sensation of their soft lips squeezing your shaft amidst them and their tongues tracing every sensitive vein. You gasp as your manhood reaches its full length, and as your own arousal grows, so does theirs.</p>' +
						'<p>Soon, soft moans and the scent of sex fill the room, and you have one hand on each of the girls heads as they swap your cock between each other, taking you inside for several strokes and passing you on while the other kisses another part of your body.</p>' +
						'<p>When your climax finally rushes through your body you make sure to spray your load onto both of them, watching in delight as Madison shares it with her spellbound coworker in a deep, sensual kiss.</p>'
					);
				} else {
					md.write(
						'<p>You crawl onto the bed and both of your girls eagerly pull you into their embrace, trading sensual kisses with you and tenderly caressing your skin, their soft lips slowly exploring every inch of your body.</p>' +
						'<p>You allow yourself to fall back into their mutual embrace and let your spellbound slaves tend to your needs. Both of them are wonderfully experienced, but Madison is, as expected, the more active of the two, often guiding and commanding Zoey around, who dutifully and eagerly follows her lead.</p>' +
						'<p>You on occasion have to remind the little minx that Zoey is your pet, and not hers, and she will sheepishly tone it down before getting swept away by her passion again.</p>' +
						'<p>And it is easy to get swept away...</p>' +
						'<p>The smell of sex intensifies as the minutes pass. Eager lips touch your neck as gentle fingers caress your folds and clit, and you find yourself trading passionate affections with both girls while your tongue tastes their folds and lips, your nose takes in their scent and your lips release lewd moans whenever the blissful rush of another climax ravages your body anew.</p>' +
						'<p>In the end, the three of you come to rest on the bed, both girls resting next to you, bodies pressed against yours and their spellbound, eager eyes lingering on yours, hoping to go for just one more round.</p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, 'talk more with Madison and Zoey', Place, 'type=callmadisonzoey');
				WritePlaceFooter(md);
				return true;					
			}	
			if (sType == "callmadisonzoeyshow") {
				// Madison/Zoey threesome in the apartment - show
				md = WritePlaceHeader();
				this.showPerson("madisonzoey3.jpg");
				addPlaceTitle(md, "Madison and Zoey Giving You a Show");
				md.write(
					'<p>“' + perYou.getMaster() + ' wants us to put on a show, Maddy.” Zoey turns her attention back to her coworker, who replies with a devilish grin.</p>' +
					'<p>“Then let\'s not keep ' + perYou.getHimHer() + ' waiting...”</p>' +
					'<p>Madison\'s fingers intertwine with Zoey\'s as she pushes the girls arms to the bed and the two share a deep kiss, long and passionate this time, drawing out every second into a sensual dance as their tongues playfully mingle and you watch their nubile bodies pressed against each other.</p>' +
					'<p>Madison clearly takes charge, her knee parting Zoey\'s thighs to expose her folds, and the other girls head rolls back with a soft gasp as her lips begin to wander down and place soft kisses on her neck and collarbones, sucking in her nipples and playfully rolling her tongue along the areola.</p>' +
					'<p>The two are suspiciously familiar with each other by now, and you can feel your manhood straining against your pants/Folds dampen slowly as you watch them.</p>' +
					'<p>Madison releases Zoey\'s hands and gives you a cheeky smile as she pulls her fingertips back over the other girls arms, and Zoey shivers visibly as she drags them along her armpits, kneads her breasts and pushes herself up to straddle her.</p>' +
					'<p>In the next 20 minutes, the two bring each other to several mutual orgasms. Madison straddles Zoeys face and pushes the girls lips against her sex, and Zoey dutifully tends to her coworkers needs, wrapping her arms around Maddy\'s thighs and skillfully caressing her sex. Blissful moans and gasps begin to fill the room. Madison is quick to repay the favor with a own tongue, and as the minutes pass both of them seem to almost get lost in their mutual pleasures, to the point that you may finally have to step in and stop them, or maybe join yourself...</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'talk more with Madison and Zoey', Place, 'type=callmadisonzoey');
				WritePlaceFooter(md);
				return true;					
			}				
		}

		if (Place != 412) return false;
		
		if (sType == "madisonstrip") {
			// Event: Madison Strips at Work
			md = WritePlaceHeader();

			this.showPerson(this.checkFlag(13) ? "madison18be.jpg" : "madison18.jpg");
			addPlaceTitle(md, "Madison at Work");

			md.write('<p>Madison removes all her clothing except her leggings and begs you,<br/>&quot;' + perYou.getMaster() + ' please...&quot;</p>');

			startQuestions();
			addLinkToPlace(md, 'play with her', Place, 'type=madisonsexplay');
			addLinkToPlace(md, 'return to the station reception', 371);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "madisonsexplay") {
			// Event: Play with Madison
			md = WritePlaceHeader();
			this.showPerson(this.checkFlag(13) ? "madison25be.jpg" : "madison25.jpg");
			addPlaceTitle(md, "Playing with Madison");
			md.write(
				'<p>“Please what?“ You move closer to her, pushing your hip between Madison\'s legs and sliding your fingertips over her thigh, her body shivering under your touch.</p>' +
				'<p>“Please fuck me!”</p>' +
				'<p>She breathes the words out with a devilish grin on her lips and you can see the pink light flare up the moment her gaze meets yours, her eyes completely enraptured and her entire body trembling in anticipation of what you might do with her.</p>' +
				'<p>But you take your time, trailing your fingers over her side, tenderly kissing her neck and listening as she releases increasingly  frustrated little sighs.</p>' +
				'<p>Madison is impatient, eager to feel more of you, touch you and once more experience the pleasures you have to offer, and of course this makes it all the more enjoyable to tease her a little longer.</p>' +
				'<p>“' + perYou.getMaster() + '...” She begins, but you interrupt her with a simple gesture.</p>' +
				'<p>“Patience.” You place two fingers on her lips and slowly draw them down to her breasts” You are mine to play with as I see fit, remember?”</p>' +
				'<p>Madison releases a frustrated whimper as you run your fingertips further down to the thin fabric covering her folds, press firmly against her clit and focus on the spell to send a little wave of blissful heat into her body.</p>' +
				'<p>“Ahhhh...”</p>' +
				'<p>It\'s enough to make her tremble all over, her hands clinging to the edge of the desk as you begin to move your fingers and draw another lewd moan from her lips.</p>' +
				'<p>”Ohhh.... yesss...”</p>' +
				'<p>Of course, you don\'t stop here. Madison eagerly spreads her legs, and you run your thumb over her clit and press the fabric of her pantyhose into her folds, twisting your hand and every so slowly increasing her arousal.</p>' +
				'<p>Soon, your little plaything seems to be barely able to keep herself from jumping you. The fabric covering her sex has been stained with her juices and her body shudders and trembles under every little wave of pleasure you grant her, it\'s time to decide how to finish this.</p>' +
				'<p>You give Madison a moment to recover, and she all too happily thanks you, multiple times, before leaving to get a change of clothes she had stashed in her locker.</p>'
			);
			startQuestions();
			startAlternatives(md);
			addLinkToPlace(md, 'allow her to climax', Place, 'type=madisonallow');
			addLinkToPlace(md, 'pull back and deny her', Place, 'type=madisondeny');
			if (perYou.isMaleSex()) addLinkToPlace(md, 'fuck her on the desk', Place, 'type=madisonfuck');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "madisonallow") {
			// Event: Play with Madison - let her cum
			md = WritePlaceHeader();
			this.showPerson(this.checkFlag(13) ? "madison27be.jpg" : "madison27.jpg");
			addPlaceTitle(md, "Playing with Madison");
			md.write(
				'<p>You push the stained fabric as deeply into her sex as it allows it and begin to run your fingers roughly over her folds and clit.</p>' +
				'<p>The mana within her body does the rest. You have to remind Madison more than once that her colleagues might hear her if she is too loud, and more than once, she desperately muffles her moans for a while, only for her attempts to fall apart the moment you push her over the edge and all her passion is released into a loud cacophony of lewd noises the moment her climax rushes through her trembling form.</p>' +
				'<p>You listen carefully to make sure no one is coming to check on you, but Nina is probably on the phone, again, and if anyone else heard her it doesn\'t seem like they care.</p>' +
				'<p>You give Madison a moment to recover, and she all too happily thanks you, multiple times, before leaving to get a change of clothes she had stashed in her locker.</p>'
			);
			startQuestions();
			addOptionLink(md, 'give Madison some time to recover and return to the station reception', "Enjoy412('Madison gives you a brief kiss goodbye and you leave to allow her to get a change of clothes and return to her work.')");
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "madisondeny") {
			// Event: Play with Madison - denial
			md = WritePlaceHeader();
			this.showPerson(this.checkFlag(13) ? "madison26be.jpg" : "madison26.jpg");
			addPlaceTitle(md, "Playing with Madison");
			md.write(
				'<p>You make sure to bring her as close to the edge as possible, letting her bask in the pre-climax for a few precious seconds before suddenly pulling back and allowing the spells influence to subside.</p>' +
				'<p>“' + perYou.getMaster() + '?” Madison takes a moment to catch herself and realize what you did, her eyes suddenly going wide. “W...Wait, you can\'t just leave me like that!”</p>' +
				'<p>“Of course I can, I practically own you, remember?”</p>' +
				'<p>“But... “ Madison stammers like a kid not getting desert. “But...”</p>' +
				'<p>“No buts!” You interrupt her. “Remember our arrangement, your pleasure is mine to give and take as I see fit.”</p>' +
				'<p>“Y...yes, ' + perYou.getMaster() + '...” Madison struggles for a moment, then sighs and lowers her head in shame, though her sour mood does not last for long. “I understand, and I will of course work even harder for you to earn it next time!”</p>' +
				'<p>“That\'s what I want to hear!” you tell her, and Madison smiles, knowing she has pleased you. ”But for now you better get your spare clothes, I will call you when I need you.”</p>' +
				'<p>“Yes ' + perYou.getMaster() + '!”</p>'
			);
			startQuestions();
			addOptionLink(md, 'give Madison some time to recover and return to the station reception', "Enjoy412('Madison gives you a brief kiss goodbye and you leave to allow her to get a change of clothes and return to her work.')");
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "madisonfuck") {
			// Event: Play with Madison - fuck
			md = WritePlaceHeader();
			if (!isExplicit()) this.showPerson("madison28.jpg");
			else this.showPersonX(this.checkFlag(13) ? "madison28be.jpg" : "madison28.jpg");
			addPlaceTitle(md, "Playing with Madison");
			md.write(
				'<p>You push both of Madison\'s legs together and pull off her leggings in a single, sudden motion, to finally fully expose her sex and before she even had time to react, your pants were already down on the ground and the tip of your cock pressed against her glistering petals.</p>' +
				'<p>You don\'t really want to waste anymore time here. Your manhood was painfully pushing against the confines of your pants to begin with while you watched your little plaything squirm and moan, so you push into her depths with no further delay or hesitation.</p>' +
				'<p>Something Madison surely appreciates.</p>' +
				'<p>Her legs wrap around your waist, and as you settle into a rough, fast pace rhythm you have to remind her more than once to keep her voice down if she does not want to attract too much attention, something she remembers to do for maybe a few seconds.</p>' +
				'<p>Lucky for you, Nina never really cares for what you do in here and there are not many others working in this part of the station, so you don\'t mind that Madison basically screams her passion into the room as the two of you finally reach your peak and you unload yourself into her tightness.</p>'
			);
			startQuestions();
			addOptionLink(md, 'give Madison some time to recover and return to the station reception', "Enjoy412('Madison gives you a brief kiss goodbye and you leave to allow her to get a change of clothes and return to her work.')");
			WritePlaceFooter(md);
			return true;
		}			
		
		if (sType == "madisonzoey") {
			// Event: Madison and Zoey at Work
			md = WritePlaceHeader();
			var perZoey = findPerson("Zoey");
			var bZDay = getHour() < 16;

			this.showPerson(this.checkFlag(13) ? "madison17be.jpg" : "madison17.jpg");
			addPlaceTitle(md, "Madison and Zoey");

			// Zoey visits
			md.write('<p>Madison makes a quick phone call, and a few minutes later Zoey walks in ');
			if (bZDay) md.write('dressed in her uniform, she was probably just having a quick lunch');
			else md.write('dressed casually, she mist of changed out of her uniform ready to go home');
			md.write(
				'. She looks at Madison\'s partially dressed state, and at yourself.</p>' +
				'<p>"Hey Maddy, is this the ' + (perYou.getManWoman() != 'man' ? 'girl' : 'guy') + ' you were talking about, your ' + perYou.getMaster() + '?"</p>' +
				'<p>Madison looks at you,</p>' +
				'<p>"' + perYou.getMaster() + ' I told her about you, after all she is going to be your slave as well!"</p>' +
				'<p>Zoey shakes her head, "Maddy, I told you I am not into all that ' + perYou.getMaster() + ' and slave thing. You and your ' + (perYou.getManWoman() != 'man' ? 'woman' : 'man') + ' can play your games, and I\'ll play mine. I think I will go and see if Nina is interested in a game or two."</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'return to the station reception', 371);

			AddRightColumnLarge(md);
			if (bZDay) perZoey.showPerson("zoey1-noon.jpg");
			else perZoey.showPerson("zoey1-afternoon.jpg");
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformbreasts") {
			// BE Transformation
			CastTransform(1);
			md = WritePlaceHeader(true, '', 'black');
			if (!this.checkFlag(13)) {
				this.setFlag(13);
				showPopupWindow("Transformation",
					'<img src="Images/GenericSex/be c.gif" style="width:50%;float:left;margin-right:6px;margin-top:1em;margin-bottom:2em" alt="BE">' +
					'<p>You cast the spell and Madison cries out, "What the hell is happening?" and pulls apart her top. You see her breasts swelling, growing larger and larger, her modest sized breasts growing to be quite large.</p>' +
					'<p>As she groans you thought you heard some laughing but maybe it was Nina. Madison gasps as her breasts stop growing, and she remarks,<p>' +
					'<p>"Well, if this is permanent, I am going to need a new wardrobe.", and she rips her top off and continues, "How about giving them a spin!". You happily give them that and more.</p>'
				);
			} else {
				this.setFlag(13, false);
				showPopupWindow("Transformation",
					'<img src="Images/GenericSex/bs d.gif" style="width:50%;float:left;margin-right:6px;margin-top:1em;margin-bottom:2em" alt="BE">' +
					'<p>You cast the spell and Madison cries out, "What the hell is happening?" and pulls apart her top. You see her breasts diminishing, becoming smaller and smaller, her huge sized breasts growing to a modest size.</p>' +
					"<p>As she groans you thought you heard some laughing but maybe it was Nina. Madison gasps as her breasts stop diminishing, and she remarks,<p>" + '<p>"Well, if this is permanent, I am going to need my old clothes back.", and she discards her loose top off and continues, "How about giving them a spin!". You happily give them that and more.</p>'
				);
			}
			setQueryParams("");
			WritePlaceFooter(md, '', true, true);
			return true;
		}

		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var img = this.showPersonRandom("!poledance", 3);
		addPlaceTitle(md, "Madison's Dance");
		md.write(
			'<p>Madison steps on the stage in a ' + (img.indexOf("poledancea") != -1 ? 'maid costume' : img.indexOf("poledanceb") != -1 ? 'tight dress' : 'cheerleader outfit') + ', not that she keeps it on for very long. She does an energetic dance and looks very happy during it, like she is always you ask her to do something. She does her best to deliver you a good time!</p>' +
			'<p>After she sits with you happily for a while, chatting with you and other people here and there, she is either very friendly or a regular here!</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 45 && sType === "") {
			if (isDay() && perYou.getQuestRustyKey() == 7) addLinkToPlaceC(md, 'answer the door', Place, 'type=madisondelivery1');
		} else if (Place == 465 && this.isHere()) {
			if (sType === "") {
				addLinkToPlaceC(md, 'have her show you another outfit', Place, '', '“I have just the thing!” Madison claps her hands gleefully and runs towards the wardrobe. “Feel free to watch, I\'ll only need a moment!”', 'Madison', "findPerson('Madison').getNextDress()");
				addLinkToPlaceC(md, 'have her remove some more clothing', Place, 'type=madisonstrip', '“Gladly, ' + perYou.getMaster() + '.” Madison smiles brightly and puts on a bit of a show as she strips out of most of her attire, always making sure you get a good look at her.');
			}
			if (sType === "" || sType === "madisonstrip") {
				addLinkToPlaceC(md, 'enjoy Madison\'s tongue', Place, 'type=madisonoral');
				addLinkToPlaceC(md, 'enjoy Madison\'s body', Place, 'type=madisonsex');
				if (!perYou.isMaleSex() && perYou.FindItem(45) > 0) addLinkToPlace(md, 'take her with your strap on', Place, 'type=madisonstraponfuck');
				
				this.addDancingLink(md, 'ask Madison to dance for you in the club',
					'You ask your delivery-girl about dancing in the Avernus club and that you want her to dance for you there tonight,</p>' +
					'<p>&quot;Yes of course ' + perYou.getMaster() + ' anytime!&quot; and with that you call Jade to arrange a dance for Madison.'
				);
				this.addSleepLink(md, "spend the night with Madison", "Sleeping with Madison",
					'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>Madison is exited to be able to spend the entire night with you, and when you enter the bedroom she already awaits you wearing nothing but stockings, some jewelry and a suggestive smile.<br><br>' +
					'The sweet aroma of scented candles has already filled the room, and as she begins to dim the light, you know that none of you will get a lot of rest tonight, not that you mind.</b>',
					this.checkFlag(13) ? 'bed2.jpg' : 'bed1.jpg', true, '', '', '', "overflow-y:hidden"
				);
			}
		}
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 465 && this.isHere() && sType === "") md.write('<p>Madison poses for you in one of her many sexy outfits and looks ready to pounce on you the moment you\'ll finally allow her to do so.</p>');
	};	
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Examining the Soul Bound Crystal
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere()) {
					if (!this.isCharmedBy()) examineItem(no, 'The ' +  s + ' trembles weakly, you suspect you need a magical link to Madison before it will work.');
					else examineItem(no, 'The ' +  s + ' vibrates softly the closer you get to Madison.');
					return "handled";
				}
			}
		}

		// Using/Examining the Silver Ring
		if (no == 32) {
			if (cmd == 1) {
				// Examine the Silver Ring
				if (Place == 412 && this.isCharmedBy() && sType != "meetgabby") {
					examineSilverRingStart();
					addComments(
						'<p>It seems to be reacting to Madison\'s presence... getting warmer the closer you get.</p>' +
						'</td></tr></table>'
					);
					return "handled";
				}
			}
		}

		// Casting the charm spell
		else if (no == 14 && cmd == 2) {

			// Doorstep
			if (sType == "madisondelivery1") {
				addComments('Are you crazy?  She\'s out in front of your house! Invite her inside where it\'s more private.');
				return "handled";
			}

			// Inside your house
			if (sType == "madisondelivery2") {
				if (CastCharmSpell("Madison", 355, 1)) {
					// CHARM Madison (the delivery Girl)
					if (!isPlaceKnown("TVStation")) setPlaceKnown("TVStation");		//Know about the Radio Station
				}
				return "handled";
			}

			if (Place == 413) {
				// Madison (at her office)
				CastCharmSpell("Madison", 355, 1, "place=office");
				return "handled";
			}
			
			if (Place == 465 || (Place == 456 && this.isHere())) {
				// Madison (in the apartment foyer)
				CastCharmSpell("Madison", 465, 1, "type=charmmadisonapartment1");
				return "handled";
			}				
		}

		// Casting the transform spell
		else if (no == 18 && cmd == 2) {

			// In her office at the TV Station pr at home
			if (Place == 412 || Place == 465) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her");
					return "handled";
				}
				if (!CastTransform(1, true)) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(Place, 'type=transformbreasts');
				return "nofooter";
			}
		}
		return "";		// do nothing
	};

	per.isPhoneable = function() {
		// Can you call them?
		return this.isCharmedBy() && !this.isHere() && this.checkFlag(6);
	};

	per.callThem = function() {
		if (Place == 269) {
			gotoPlace(Place, 'type=madisonpool');
			receiveCall('', 'You call Madison to invite her to join you at the pool for a swim, and she immediately answers, "' + (isShopOpen() ? 'Sure, I can take a break, see you soon' : 'Sure, I can use a dip') + '"');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (!isShopOpen()) WriteComments("You call Madison but there is no answer, you would guess she is at home and the number you have for her is probably her work number.");
		else if (!isOutside()) WriteComments("You call Madison but there is no answer, you should try again somewhere else. Your phone is not the best and you are getting a poor signal here inside.");
		else {
			gotoPlace(Place, 'type=callmadison');
			receiveCall('', 'You call Madison and she immediately answers, and promises to be there in 15 minutes or she is your slave for life, which she is!');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};

	per.addPersonPhoneCall = function() {
		if (isShopOpen() && this.checkFlag(7) && !this.checkFlag(8)) {
			// SMS 1, few hours after first visit at her work
			if (makeCall(true, 70)) this.setFlag(8);
		} else if (this.checkFlag(11) && !this.checkFlag(12)) {
			var hr = getHour();
			if ((hr == 12 && Math.random() < 0.1) || (hr == 16 || hr == 17)) {
				// SMS 2, Zoey is there
				if (makeCall(true, 71)) this.setFlag(12);
			}
		} else if (isMorning() && !this.checkFlag(14) && this.isCharmedBy()) {
			// SMS 1
			if (makeCall(true, 72)) this.setFlag(14);
		} else if (isNight() && !this.checkFlag(15) && this.isCharmedBy()) {
			// SMS 2
			if (makeCall(true, 73)) this.setFlag(15);
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		if (id == 72) return receiveSMS('Madison', 'Good morning ' + perYou.getMaster() + ', I love a hot shower!', 'sms1.jpg');
		if (id == 73) return receiveSMS('Madison', 'Good night ' + perYou.getMaster() + '...', 'sms2.jpg');
		return '';
	};

}
