/****************************************************************
Pamela (Church Wall Girl)
 ****************************************************************/
function RepliesPamela(nR)
{
	var pCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 13901)
	{
		per.setFlag(2);
		if (!pCharm) //NOT charmed
		{
			addComments('<p>"Well, ' + myName + ', as you can see," she says gesturing towards the stone wall next to her,</p><p>"I am the grounds keeper here.  I maintain the gardens along the walls and within the grounds of the church."  She smiles at you warmly.  "My my, but aren\'t you a curious one."</p>');
		}
		else  // CHARMED
		{
			addComments('<p>"My duties were once to maintain the grounds along the walls and within the grounds of the church, ' + myName + ', but that was of course before you cured me of my disease and showed me my true purpose," she says, lust flaring in her eyes as she runs her hand along her bare breast.</p><p>"I used to pour all I had into maintaining the gardens within...  now I pour all that I have into pleasuring my one, true ' + myName + '."');
		}
	}
	else if (nR == 15102)
	{
		if (!pCharm) //Not Charmed
		{
			addComments('<p>"Another way in?  Why?  Did Mother Superior stop your explorations?" she says with a glint of mirth.</p><p>"Forgive her if she is overprotective of our lovely church."  With that she goes back to her trimming, completely dismissing the matter.  You stand there for a moment dumbstruck - then you realize she never really answered your question.');
			per.setFlag(3);
		} else {
			addComments('<p>"Of course ' + myName + ', I owe you my life and will repay that debt any way that I can." She casts her eyes downward as she turns to lead you through a small gate hidden within the wall, opening it with an old skeleton key.');
			setPlaceKnown("ChurchSecretDoor"); //Has now shown you the way into the Church
			Place = 319;
		}
	}
	else if (nR == 18305) //Asking about the relic
	{
		var perS = findPerson("Desiree");
		perS.setQuestRelic(10);
		addComments('<p>"I\'m sorry, ' + myName + '.  I wouldn\'t know anything about that.  You may need to ask one of the Nuns.  I do know that Mother Superior is very protective of <i>something</i>...  Perhaps that is what she\'s been hiding."</p>');
	}
	else if (nR == 18335)
	{
		var perD = findPerson("Desiree");
		perD.setQuestRelic(36);
		if (!pCharm) //Not Charmed
		{
			addComments('<p>"That\'s kind of you to offer, but I\'m sure she will recover on her own.  For now she has decided it best to take some time off and rest."</p>');
		} else {
			addComments('<p>"I knew you would be willing to help, ' + myName + '!" She says, absently running her hands over her body at the though of your <i>help</i>.  "She has told everyone that she is taking some time to recover.  Could you heal her as well?" She asks lustfuly. "It would mean so much to those of us here..."</p>');
		}
		if (!checkPersonFlag("Daria", 4)) setPersonFlag("Daria", 4); //Set Mother Superior as "sick"
	}
	else if (nR == 100) //Asking about the van again
	{
		per.setFlag(17);
		addComments('<p>"You are in luck, he is due back tomorrow morning. Until then you can ' + (pCharm ? 'spend the night with me' : 'sleep on my couch') + ' and I\'ll ask him in the morning to give you a lift.');
	}
	else if (nR == 101) //Asking about a way out
	{
		per.setFlag(17);
		per.setFlag(16);
		addComments('<p>"Well there are regular deliveries made to the church and I also get the occasional package. I know the driver and can probably ask him to give you a lift back to town. He won\'t be here until tomorrow morning but you can ' + (pCharm ? 'spend the night with me' : 'sleep on my couch') + ' and I\'ll ask in the morning."');
	}	
	return true;
}


function initialisePamela()
{
	// Pamela
	addPerson("Pamela", 326, "Pamela", 'Piper', false);
	per.Replies = RepliesPamela;
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		if (!this.checkFlag(1)) return "the Grounds Keeper";
		return this.isCharmedBy() ? "Slave Pamela" : "Pamela, Garden Caretaker";
	};
	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		var s = this.addPersonString("pamela0.jpg", "height:max%", "right");
		if (this.isCharmedBy()) {
			return s + 'Pamela is no fairy as it turned out. She doesn’t even know anything about the magic world nor the necklace she was wearing! However, her soft and calm nature makes you feel at home when you visit her. She’s always bringing some kind of gift to you whenever you go to her shed, let it be sweets, small toys or some fine wine. Actually, she told you about a monk who makes his own wine. It’s a small business, mostly related to the church and it’s fold, but it’s quite tasty and cheap so Pamela always have some in her larder stored away just for you!<br><br>' +
				'She is greeting you into her place at the moment, the mentioned bottle of wine on the table, waiting for you to consume it or you could taste your slave’s other, sweet "offerings"!';
		} else {
			return s + 'Pamela, the red haired girl in front of you is the gardener of the church.';
		}
	};

	per.getPersonAddress = function() { return this.checkFlag(1) ? 'Groundskeeper Cottage, Church grounds' : ''; };

	per.passTimeDay = function() {
		if (this.checkFlag(17)) {
			this.setFlag(17, false);
			if (isAtLocation(317)) return "In the distance you hear a van, and realise you must have missed the delivery van Pamela talked about";
		}
		return '';
	};
	
	
	per.showEventPopup = function()
	{
		// Lift with the delivery vam
		if (sType == "vanlift") {
			this.setFlag(17, false);
			showPopupWindow("An awkward lift",
				"<img src='Images/van.jpg' style='float:right;width:45%;margin-left:5px' alt='Van'><p>" +
				(this.isCharmedBy() ? 'You spend the night in Pamela\'s arms' : 'You spend the night on Pamela\'s couch') +
				' and share a simple but tasty breakfast. Pamela then tells you it is almost time and you step out and wait for a little while.</p> ' +
				'<p>A white delivery van arrives and Pamela walks over and had a brief chat with the driver and the tells you it is ok and to get in the passenger seat. As you approach she quickly steps over and whispers to you, "Don\'t be offended, he is quite shy"<p>' +
				'<p>She was not kidding, during the ride the driver barely looks at you and says nothing. After what feels like a long drive you arrive at the TV Station, and he haltingly asks you to get out.<p>' +
				'<p>You do and he nervously gestures, a wave? Immediately he drives into some staff only service area.</p>'
			);			
			return true;
		}
		
		if (Place == 320 && !this.checkFlag(4) && isDay() && nFromPlace != 326) {
			this.setFlag(4);
			showPopupWindow(this.checkFlag(1) ? "Pamela working" : "Groundskeeper",
				this.addPersonString("pamela-working1.jpg", "height:max%", "right") +
				"You see an old wagon or cart and " +
				(this.checkFlag(1) ? 'Pamela is working on it' :	'a young woman is working on it') + 
				' probably to set it up as a sort of display piece. She is climbing over it and unintentionally gives you a clear view up her skirt. She notices your glance and starts and as she does appears to catch her top on a wooden railing, tearing her clothing.</p>' +
				'<p>She shakes her head and gives you an embarrassed wave and walks over to the small shed to change into some spare clothes.</p>'
			);			
			return true;			
		}
		
		if (sType == "pamelatransformbodypiper") {
			CastTransform(1);
			this.dress = "Lauren";	
			showPopupWindow("Transformed",
				this.addPersonString("transform.jpg", "height:max%", "right") +
				'Pamela\'s body starts to subtly change, filling out and becoming rounder, and her breast growing. Her face completely changes as if a different person is standing in front of you.<p>' +
				'<p>You tentatively as if she is alright and she replies and she is definitely still Pamela, still an attractive red-head and the same person she was before',
				'dispPlace()'
			);
			return true;
		}	
		if (sType == "pamelatransformbodylauren") {
			CastTransform(1);
			this.dress = "Piper";
			showPopupWindow("Transformed",
				this.addPersonString("transform.jpg", "height:max%", "right") +
				'Pamela\'s body starts to subtly change, her breasts shrinking, and her figure slimming down. Her face changes as if a different person is standing in front of you.<p>' +
				'<p>You tentatively as if she is alright and she replies and she is definitely still Pamela, still an attractive red-head and the same person she was before',
				'dispPlace()'
			);
			return true;
		}

		return false;
	};
	
	per.showEvent = function()
	{
		var md;
		
		if (Place == 269 && sType == "pamelapool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("pamela-pool.jpg");
			addPlaceTitle(md, "Swimming with Pamela");
			md.write(
				'<p>Pamela arrives, dressed in a bikini, and you have a pleasant swim together.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=pamelapoolsex');
			addLinkToPlaceC(md, 'say goodbye to Pamela', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "pamelapoolsex") {
			md = WritePlaceHeader();
			this.showPerson("pamela-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Pamela");
			md.write(
				'<p>You ask Pamela to play with you more privately, and she seductively removes most of her swimsuit and lies back waiting for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Pamela', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place != 326) return false;
		
		if (sType === "curepamela") {
			md = WritePlaceHeader();
			if (!isDay()) this.showPerson("pamela6c.jpg");
			else this.showPerson(this.checkFlag(8) ? "pamela6b.jpg" : "pamela6a.jpg");
			addPlaceTitle(md, "Curing Slave Pamela Again");

			md.write(
				'<p>Your Slave smiles up at you as desire flashes across her face.  "Well, ' + this.getYourNameFor() + ', I did feel a flush of heat when you approached."</p>' +
				'<p>"I thought as much," you say. "Perhaps we have not yet completely driven the disease out of your system."</p>' +
				'<p>She stretches out along the bench, pulling open her butt cheeks for easy access. "Would you like to <i>treat</i> me once again, ' + this.getYourNameFor() + '?  I can feel myself become more and more <i>yours</i> every time, ' + this.getYourNameFor() + '.  And I love it," she says, desire and fulfillment dripping off of her as much as the smell of sex.</p>' +
				'<p>"Please take me, ' + this.getYourNameFor() + '," she begs.  "I want every ounce of me to be <i>yours</i>!"</p>' +
				'<p>Who wouldn\'t be excited by that kind of devotion...  especially if it translated into her lovemakeing - as it does... <i>every</i> time.</p>'
			);

			startQuestions();
			if (perYou.isMaleSex()) {
				addLinkToPlace(md, 'take her as she begs', Place, 'type=pamelafuck');
				if (isExplicit(true)) addLinkToPlace(md, 'take her mouth', Place, 'type=pamelabj');
			} else {
				addLinkToPlace(md, 'ask her to lick you', Place, 'type=pamelabj');
				addLinkToPlace(md, 'make love to her', Place, 'type=pamelafuck');
			}
			addLinkToPlace(md, 'talk to Pamela some more', 326);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "pamelanecklace") {
			md = WritePlaceHeader();
			this.showPerson("pamela10.jpg", '', '', '', '', true);
			addPlaceTitle(md, "Pamela\'s Necklace");
			md.write(
				'<p>You ask her about her necklace, and she explains,</p>' +
				'<p>"The necklace was a gift from my mother, she said it is ancient. It can be made into a pair of bracelets or a necklace"</p>'
			);

			if (perYourBody.PutItem(46, true)) {
				AddMana(5);
				md.write(
					'<p>She takes the necklace off and separates the necklace quickly forming the bracelets. She put one on her wrist and the other she slides on yours and she tenderly kisses your hand. You feel a small surge of magic and she continues,</p>' +
					'<p>"Now we are linked, heart to heart, soul to soul"</p>' +
					'<p>While poetic you have no idea what this actually means, you will have to research this.</p>'
				);
				this.setFlag(8);
			} else {
				AddMana(5);
				md.write(
					'<p>She takes the necklace off intending to give you it, but you just cannot manage to carry anything else. You should ask her again when you can carry more.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, 'talk to Pamela some more', 326);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "pamelabj" || sType == "pamelafuck" || sType == "pamelabj") {
			if (sType == "pamelabj") {
				// Blowjob/lick
				md = WritePlaceHeader(false, 'td-left-med');
				if (perYou.isMaleSex()) {
					this.showPersonRandomX("pamela8b", 2);
					addPlaceTitle(md, "Curing Slave Pamela Again");
					md.write('<p>You tell Pamela to use her mouth to pleasure you. She skillfully takes your length into her mouth  and you do not take long to release into her mouth. She swallows and lies back and says, "Thank you ' + this.getYourNameFor() + '".</p>');
				} else {
					this.showPersonRorX("pamela8g.jpg");
					addPlaceTitle(md, "Curing Slave Pamela Again");
					md.write('<p>You tell Pamela to use her tongue to pleasure you and while she is not very experienced she does have some skill she makes you reach the peak of ecstasy quickly. After she lies back and says, "Thank you!".</p>');
				}

			} else if (sType == "pamelafuck") {
				// fuck her
				md = WritePlaceHeader(false, 'td-left-med');
				if (perYou.isMaleSex()) {
					this.showPersonRorX("pamela9b.jpg");
					addPlaceTitle(md, "Curing Slave Pamela Again");
					md.write('<p>You readily agree to take her and you sink you manhood into her delightful pussy, ramming into her over and over. You feel her shudder in her release and that is the final straw and you pour your passion into her depths.</p>');
				} else {
					this.showPerson("pamela9g.jpg");
					addPlaceTitle(md, "Curing Slave Pamela Again");
					md.write('<p>You readily agree and explore her body and after a while climb into place so she can lick you as you lick her. She is somewhat tentative but seems to have some experience and with some pointer she is able to make you reach your climax, and then you ensure she also reaches her peak.</p>');
				}
			} else if (sType == "pamelabj") {
				// Blowjob/lick
				md = WritePlaceHeader(false, 'td-left-med');
				if (perYou.isMaleSex()) {
					this.showPersonRandomX("pamela8b", 2);
					addPlaceTitle(md, "Curing Slave Pamela Again");
					md.write('<p>You tell Pamela to use her mouth to pleasure you. She skillfully takes your length into her mouth  and you do not take long to release into her mouth. She swallows and lies back and says, "Thank you ' + this.getYourNameFor() + '".</p>');
				} else {
					this.showPersonRorX("pamela8g.jpg");
					addPlaceTitle(md, "Curing Slave Pamela Again");
					md.write('<p>You tell Pamela to use her tongue to pleasure you and while she is not very experienced she does have some skill she makes you reach the peak of ecstasy quickly. After she lies back and says, "Thank you!".</p>');
				}

			} else if (sType == "pamelafuck") {
				// fuck her
				md = WritePlaceHeader(false, 'td-left-med');
				if (perYou.isMaleSex()) {
					this.showPersonRorX("pamela9b.jpg");
					addPlaceTitle(md, "Curing Slave Pamela Again");
					md.write('<p>You readily agree to take her and you sink you manhood into her delightful pussy, ramming into her over and over. You feel her shudder in her release and that is the final straw and you pour your passion into her depths.</p>');
				} else {
					this.showPerson("pamela9g.jpg");
					addPlaceTitle(md, "Curing Slave Pamela Again");
					md.write('<p>You readily agree and explore her body and after a while climb into place so she can lick you as you lick her. She is somewhat tentative but seems to have some experience and with some pointer she is able to make you reach your climax, and then you ensure she also reaches her peak.</p>');
				}
			}
			if (!this.checkFlag(8)) {
				// Give necklace
				md.write('<p>You notice the necklace she is wearing and you can feel a hint of magic from it.</p>');
				startQuestions();
				addLinkToPlaceC(md, 'Ask about her necklace', Place, 'type=pamelanecklace');

			} else startQuestions();
			addLinkToPlace(md, 'talk to Pamela some more', 326);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmpamela1") {
			this.setFlag(3, false);
			md = WritePlaceHeader();
			this.showPerson("pamela2.jpg");

			addPlaceTitle(md, "Groundskeeper Pamela Under a Spell");

			md.write('<p>The Groundskeeper turns to you as a sly smile begins to cross her face.  "I\'m sorry, what did you just say?" she asks.');
			if (!this.checkFlag(1)) {
				this.setFlag(1);
				md.write(' "My name is Pamela, by the way. Its...  nice...  to meet you." She stammers.');
			}
			md.write(
				'</p><p>"Me?  Just now?" you ask, pretending to not know what she was talking about.</p>' +
				'<p>"Yes..." she says, as you hear her gulp back the rising desire flowing through her. ' +
				'"Just...  now..." she finally gets out.</p>' +
				'<p>You pause for a moment, allowing the spell to strengthen its hold over her as you decide ' +
				'what to say next.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Oh, I was just asking if you were feeling all right...  Your face seems a bit...<i>flushed</i>."', Place, 'type=charmpamela2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmpamela2") {
			md = WritePlaceHeader();
			this.showPerson("pamela3.jpg");

			addPlaceTitle(md, "Groundskeeper Pamela Under a Spell");

			md.write(
				'<p>"You do seem to be getting rather <i>hot</i>," you say to her suggestively.  "Those clothes aren\'t ' +
				'too restrictive are they?"</p>' +

				'<p>"What, these?" she asks, lowering her shirt and fanning her breasts.  "No, ' +
				'these clothes are usually rather cool.  They help me to keep from overheating while I work."</p>' +

				'<p>Then a flash of inspiration hits you.  "Wait.  You\'re the gardener right?" you ask, suddenly very concerned.</p>' +

				'<p>"Yes, why?" she says, the urges coursing through her causing her to become very confused.</p>' +

				'<p>"Its just that I had heard of an illness that has only recently been discovered," you say, lying through your ' +
				'teeth and enjoying the effect your presence is having on your new plaything.  "Its symptoms include an increase ' +
				'in body temperature,  flushing of the skin, and the sudden onset on extreme sexual desire."</p>' +
				'<p>"You <i>are</i> feeling these things, <b>aren\'t</b> you, Pamela," you say, more of a statement than a question.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'wait for her to answer you', Place, 'type=charmpamela3');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmpamela3") {
			md = WritePlaceHeader();
			this.showPerson("pamela4.jpg");

			addPlaceTitle(md, "Groundskeeper Pamela Under a Spell");

			md.write(
				'<p>"Yes," she says, "Oh yes!"  She pushes her arms together, jutting out her delicious ' +
				'chest for you to gaze at.  "An illness?  How could I have caught it? ' +
				'Is there a cure? Can you help me?" she cries, quickly losing hope as the spell rages through her body.</p>' +

				'<p>You give her a moment, letting the feelings and doubts simmer within her mind.  "There ' +
				'<i>is</i> a cure... but I\'m not sure you\'ll like it. Of course, if you don\'t let me help you, ' +
				'the alternative could be even worse," you say, feigning concern as best ' +
				'you can given the effect her desire is having on your own.</p>' +

				'<p>"No, tell me!  Anything!" she cries through tightly sealed eyes and barely suppressed moans as a ' +
				'small reflection lets you know that her tears are starting to fall. ' +
				'Whether tears of fear or of pure lust you\'re not sure.</p>' +

				'<p>"Well..." you pause for dramatic effect.  "There is only one cure.  You must have sex with someone. ' +
				'And you must do so <i>very</i> quickly - otherwise it could be too late."</p>' +

				'<p>"But there is a catch," you say, sinking in your hooks.  "While it <i>will</i> cure the ' +
				'disease, it will also bind you to the person who cured you.  You will be their... well, for lack ' +
				'of a better term, <i>Slave</i>. Completely unable to resist their slightest command." ' +
				'You aren\'t sure if your attempt at feigning concern is working ' +
				'anymore - but then again you\'re not sure if Pamela is in any condition to be able to tell the difference	either.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Do you want me to help you, Pamela?"', Place, 'type=charmpamela4');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmpamela4") {
			md = WritePlaceHeader();
			this.showPerson("pamela5.jpg");

			addPlaceTitle(md, "Groundskeeper Pamela Under a Spell");

			md.write(
				'<p>She takes only a moment before she turns to you and, with pure lust in her eyes, begs you to take her.</p>' +

				'<p>"You are sure," you ask, keeping her at arm\'s length as the tries to pull you against her.  "You <i>want</i> ' +
				'me to take you, knowing full well that you will become my slave?" ' +

				'- - "Yes," she says, trying to kiss you.</p>' +

				'<p>"You know that it will leave you completely unable to resist me?  Leave you as little more than a object that ' +
				'I could use in <i>any</i> way that I want?" ' +

				'- - "Yes," she says, more in earnest as she begins pulling off your clothes.</p>' +

				'<p>"And you will submit yourself to me?  Willingly, knowing that it was <i>your</i> choice?  Your choice to ' +
				'become my plaything, my pet, my loyal slave.  Devoted to me and my <i>desire</i> above all other things in ' +
				'your life?" you ask, no longer even attempting to hide the devilish smile from your face or your voice. ' +

				'- - "YES!" she cries out. "Cure me!  Claim me!  Take me!  I am yours!"</p>' +

				'<p>"Please...  ' + perYou.getMaster() + '," she pleads, submitting to slavery before you ' +
				'even begin to "cure" her.  The act of which you find exceptionally pleasurable as she releases all the pent up ' +
				'sexual energy that she had been collecting during her service at the church.</p>' +

				'<p>"You are <i>mine</i> now," you say as she lies beneath you... ' +
				'to which she simply replies "Yes, ' + perYou.getMaster() + ', oh yes..."</p>'
			);

			startQuestions();
			if (!isPlaceKnown("ChurchSecretDoor") && checkPlaceFlag("Church",7)) addQuestionC(md, '"Show me how you get into the church, Slave."', "Pamela", 15102);
			addLinkToPlaceC(md, 'talk to Pamela some more', 326);
			addLinkToPlace(md, 'walk back around to the Church doors', 317);
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPerson("!poledancea.jpg");
		addPlaceTitle(md, "Pamela's Dance");
		md.write(
			'<p>Pamela arrives wearing some very skimpy lingerie, and gives an odd, almost animalistic performance. She is certainly not experienced but she is still very good!</p>' +
			'<p>After she sits with you for a while quietly. She looks a little embarrassed but when you ask she confesses to enjoying the performance..</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (sType === "" && Place == 326 && this.isHere()) {
			var perSister = findPerson("Desiree");
			if (!this.checkFlag(1)) {
				addPopupLinkC(md, 'introduce yourself to the young lady', "Pamela, the groundskeeper",
					this.addPersonString("pamela0.jpg", "height:max%", "right") +
					'You assume that red haired girl in front of you is the gardener of the church, because of the equipments around her place. She doesn’t talk much and has a shy personality, but she’s quite the looker! Her vixen red hair only enhances her compelling face. The green make up around her eyes and the clothes she sports reminds you of fairies from the old tales. Maybe she is one? Who knows? You’ve seen witches, warlocks and demons, so God knows what kind of creatures are there in the big world. You can never be sure!<br><br>' +
					'"Nice to meet you, ' + perYou.getPersonName() + ', my name is Pamela," she says, brushing a little dirt off of her hands.<br><br>' +
					'"We don\'t get too many visitors out here. What brings you to our lovely little piece of heaven?"<br><br>' +
					'You do not say it, but you would think that Pamela is the most lovely thing you have seen here, and she is heaven in your eyes. Pickup lines aside, she seems genuinely friendly and sweet.<br><br>' +
					'You do notice her necklace, at first glance a simple piece of costume jewelery, but you see it is actually made of semi-precious stones',
					false, "setPersonFlag('Pamela', 1);dispPlace();"
				);
			} else if (this.checkFlag(1) && !this.checkFlag(2)) addQuestionC(md, '"And what do you do around here?"', "Pamela", 13901);
			else if (perSister.getQuestRelic() == 5) {
				// Demon has asked for the artifact
				addQuestionC(md, '"Where is the Relic this church protects?"', "Pamela", 18305);
			}
			
			if (perSister.getQuestRelic() == 35 && perSister.whereNow() === 332) {
				//Desiree is back from getting the rosary
				addQuestionC(md, '"Tell me what happened, perhaps I can help."', "Pamela", 18335);
			}

			if (this.checkFlag(1) && this.checkFlag(2) && !isPlaceKnown("ChurchSecretDoor") && checkPlaceFlag("Church", 7)) {
				if (this.isCharmedBy()) {
					addQuestionC(md, '"Show me how you get into the church, Slave."', "Pamela", 15102);
				} else if (!this.checkFlag(3)) {
					addQuestionC(md, '"Pamela, do you know of any other way to get into the church?"', "Pamela", 15102);
				}
			}

			if (this.isCharmedBy()) {
				addLinkToPlaceC(md, '"You aren\'t feeling any symptoms again, are you?"', Place, 'type=curepamela');
				if (!this.checkFlag(17)) {							
					this.addDancingLink(md, 'talk to Pamela about dancing in the club',
						'You discuss with Pamela about how healthy dancing is and how you can arrange for her to dance at the Avernus club. She answers cautiously,</p>' +
						'<p>&quot;I suppose I could ' + this.getYourNameFor() + ' as you say it will be good for my body!&quot; and with that you call Jade to arrange a dance for Pamela.'
					);
					this.addSleepLink(md, "ask Pamela to spend the night", "",
						"<p style='position:absolute;top:3%;left:25%;width:65%;cursor:pointer;margin-top:-12px;font-size:x-large;color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white'><b>Sleeping over with Pamela</b></p>" +
						'<p style="position:absolute;left:20%;top:5%;cursor:pointer;font-size:1.1em;width:65%;color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white">You ask Pamela about spending the night, to help care for her.<br>' +
						'Pamela is a little embarrassed but agrees a little coyly. A little later as she is waiting for you to join her in bed you could no longer call her coy!',
						'pamela-bed1.jpg'
					);
				}
			}
			// Stuck!
			if (perYou.isStuck() && this.checkFlag(1)) {
				if (this.checkFlag(17)) {
					addOptionLink(md, 'kill time and then spend the night until the delivery van arrives', "sleepForNight(359,'','type=vanlift')");
				} else {
					if (this.checkFlag(16)) addQuestionC(md, '"Pamela, is that delivery van due again sometime?"', "Pamela", 100);
					else addQuestionC(md, '"Pamela, do you know a way to get back to town, I am out of money?"', "Pamela", 101);
				}
			}
		}
	};
	
	// Items
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			
			if (Place == 326 && this.isHere()) {
				//Church Groundskeeper Pamela
				CastCharmSpell("Pamela", Place, 1, 'type=charmpamela1');
				return "handled";
			}
			return "";
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
				dispPlace(Place, 'type=pamelatransformbody' + this.dress.toLowerCase());
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
			gotoPlace(Place, 'type=pamelapool');
			receiveCall('', 'You call Pamela to invite her to join you at the pool for a swim and how it will be good for her health. She answers that she would love to and will call a taxi and be there shortly.');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	per.addPersonPhoneCall = function() {
		if (this.hoursCharmed() > 24 && !this.checkFlag(15)) {
			// SMS 151, 1 day after charming her
			if (makeCall(true, 151)) this.setFlag(15);
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		if (id == 151) return receiveSMS('Pamela', 'I was just thinking of you, I may be feeling the symptoms again. Please visit me', 'pamelasms1.jpg');
		return '';
	};
}