/**********************************************
Kylie
Your cousin
***********************************************/

function initialiseKylie()
{
	// Kylie
	addPerson("Kylie", 0, "Kylie", '', false);
	
	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		var s = this.addPersonString("kylie1a.jpg", "height:max%", "right");
		if (this.isCharmedBy()) {
			return s +
			'<p>You were surprised to find out that Kylie already had a thing for you even before you used the charm on her, though it explains all the teasing she so much enjoyed putting you through ever since you met her again.</p>' +
			'<p>Speaking off, she still is a little tease and you are really starting to see a pattern with the women of your family here.</p>' +
			'<p>The two of you are slowly getting reacquainted when you are at school, and she enjoys flashing her breasts or underwear to you whenever she feels unwatched, but overall, may be one of the least submissive girls under your spell.</p>' +
			'<p>She is energetic, funny and usually the one to take charge when you have the time to be more intimate, and it\'s something you have grown to like about her.</p>';
		}
		return s + "Kylie is your cute cousin who you have not seen for years.<br><br>An athletic and outgoing young woman.";
	};
	
	per.whereNow = function() {
		// At the shool oval weekdays 12-2pm
		if (sType == "streetmeet1" || sType == "streetmeet2") return Place;
		var nd = Math.floor(nTime / 288) % 7;
		return (getHour() >= 12 && getHour() < 14 && nd < 6) ? 144 : this.place;
	};
	
	per.passTimeDay = function() {
		this.setFlag(6, false);
		return '';
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 144 && !this.checkFlag(1) && this.isHere()) {
			// See Kylie
			this.setFlag(1);
			showPopupWindow("Familiar Girl playing Volleyball",
				this.addPersonString("kylie0.jpg", "height:max%", "right") +
				"Over on the volleyball court you see a game has just finished and one of the players is a familiar looking girl, and for a moment you stop to admire her cute figure. You cannot quite place her, what class you have met her in, maybe she is a new student here? Then you remember, whoops, she is Kylie a younger cousin of yours!<br><br>" +
				"Her family recently moved to Glenvale but they has been estranged from your family for many years, some argument with your Mom many years ago. You know Mom visited a while ago so they have probably sorted that out. At the time you were too busy researching some occult works trying to locate references to the Book to go visit with Mom and Tracy.<br><br>" +
				"If you had realised Cousin Kylie had grown up to be so cute, you would have definitely visited! You step over making a small wave of the hand and she calls out,<br><br>" +
				'"Hi there, you\'re my cousin ' + perYou.getPersonName() + ' aren\'t you? Nice to see you again after so many years! Do you play? We meet here from lunch most school days", she says gesturing at the net.<br><br>' +
				'Well you would certainly like to play, but maybe not the way she meant!'
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (sType == "streetmeet1") {
			md = WritePlaceHeader();
			this.setFlag(6);
			this.showPersonRandom("kylie-street-1", 2);
			addPlaceTitle(md, "Walking with Cousin Kylie");
			md.write(
				'<p>Kylie joins you from a nearby house, you assume her home. She is wearing a sheer white dress that is almost transparent in the bright sunlight. You are fairly sure she is weaing <i>nothing</i> else!</p>' +
				'<p>"Hey Cuz! Care to chat, walk or maybe go somewhere private, not my place, Mom\'s home"</p>'
			);
			startQuestions();
			if (!this.checkFlag(7)) {
				addQuestionR(md, 'ask "Why not visit your place?"',
					'&quot;Mom has made it clear about what I can an can\'t do at home, and having a ' + perYou.getSex() + ' visit is a big no-no!"</p>'  +
					'<p>You say that you are her cousin and as far as Aunt Brandi is concerned you can just be visiting family. Kylie grins, &quot;More than just visiting Cuz! Well you will have to ask her yourself sometime.&quot;</p>' +
					'<p>Ok, you will have to ask your Mom sometime to arrange a visit, it seems Kylie in not willing to now.',
					"Kylie",
					"setPersonFlag(\\'Kylie\\',7)"
				);
			}
			addLinkToPlaceC(md, '"let\'s go somewhere private"', Place, 'type=streetmeet2');
			addLinkToPlace(md, 'say goodbye for now', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "streetmeet2") {
			md = WritePlaceHeader();
			this.showPersonRandom("kylie-street-2", 3);
			addPlaceTitle(md, "Private Times with Cousin Kylie");
			md.write(
				'<p>Kylie leads you to a nearby pathway betten the homes, an access-way to some walking paths. After a quick check that there is no-one else around, she removes her dress with ease. She is not wearing a thing aside from the sheer dress!</p>' +
				'<p>"Well Cuz, you do not just have to look" She smiles as she starts to remove your clothing...</p>' +
				'<p>There is a certain sort of excitement in stripping off in public to have sex with your cousin. This area is not exactly private and you keep wondering if some person walking their dog or going shopping will come along to witness the two of you. But that is part of the excitment, the thrill and Kylie is completely in to it.</p>'
			);
			if (!checkPersonFlag("Brandi", 1)) md.write('<p>You notice Kylie glance over at a house nearby, you see a figure clearly in the window.</p>');
			else if (!checkPersonFlag("Brandi", 2)) md.write('<p>After Kylie put her clothes back on, and then jumps up and waves at someone in the backyard of her house. You are fairly sure who it is...</p>');
			else md.write('<p>You see her glancing occasionally towards her home, as if hoping her mother would be one of those walking along and see her daughter!</p>');
			startQuestions();
			if (!checkPersonFlag("Brandi", 1)) addLinkToPlace(md, 'look at the person Kylie glanced at', Place, 'type=seebrandi1');
			else if (!checkPersonFlag("Brandi", 2)) addLinkToPlace(md, 'wave at Aunt Brandi', Place, 'type=seebrandi2');
			this.addDancingLink(md, 'talk to Kylie about dancing at the club?"', 
				'You talk to Kylie about the Avernus club and about if she wants to have some fun and dance there,</p>' +
				'<p>&quot;Sounds like fun Cuz, I still have the outfit I last used there!&quot; Last used? You ask her and she grins but refuses to explain, so you call Jade to arrange a dance for Kylie.'
			);
			addLinkToPlace(md, 'sometime later...say goodbye for now', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "kyliepool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("kylie-pool.jpg");
			addPlaceTitle(md, "Swimming with Kylie");
			md.write(
				'<p>Kylie arrives, dressed in a cute pink bikini, smiling broadly as she shows off her swimsuit and her figure.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=kyliepoolsex');
			addLinkToPlaceC(md, 'say goodbye to Kylie', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "kyliepoolsex") {
			md = WritePlaceHeader(false, 'td-left-large');
			this.showPerson("kylie-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Kylie");
			md.write(
				'<p>You ask your cousin to play with you more privately, and she seductively removes most of her swimsuit and kneels on a sub-lounge waiting for you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Kylie', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 144) {
			if (sType == "kiss") {
				md = WritePlaceHeader();
				this.showPersonRorX(perYou.isMaleSex() ? "kylie5b.jpg" : "kylie5g.jpg");

				addPlaceTitle(md, "Kiss Kylie");

				md.write(
					'<p>The two of you move to a somewhat secluded area behind a few bushes and you pull Kylie closer, your lips touching as you exchange a tender kiss.</p>' +
					'<p>“Hmh, That was great, cuz, but not the type of kiss I had in mind.” Kylie looks around to make sure no one is able to see you two, for now, and slips onto her knees, quickly taking off your pants and ordering you to sit down.</p>' +
					'<p>Yes, even under your spell she is the one giving the orders, you\'ve gotten used to it by now.</p>' +
					'<p>“You know we are easily spotted here?” You ask, and your Cousin gives you an exited grin while her fingers begin to tease your ' + (perYou.isMaleSex() ? 'cock' : 'pussy') + '.</p>' +
					'<p>“Just means we need to hurry a little.”</p>'
				);
				if (perYou.isMaleSex()) {
					md.write(
						'<p>And with that, her soft lips wrap around your manhood and slide forward almost to the base with a softly vibrating hum. It\'s surprising how good your Cousin is at this, she may lack the finesse and experience of older women, but she knows the basics well and is able to use her tongue to improve the experience.</p>' +
						'<p>You remain somewhat vigilant while Kylie\'s head bobs up and down, but aside from a few students hurrying to the locker rooms in the distance, the field is empty, and soon you don\'t really care for them ether.</p>' +
						'<p>Kylie shifts her position a little, and boy, she wasn\'t kidding about hurrying up, you warn her about your approaching climax, and as it hits, she eagerly takes in every single drop, cleaning your shaft with a few quick laps of her tongue and pressing a kiss to the tip.</p>'
					);
				} else {
					md.write(
						'<p>And with that, her soft lips wrap around your clit to suck it in and allow her to teasingly flick her tongue over it. It\'s surprising how good your Cousin is at this, she may lack the finesse and experience of other women, but she knows the basics well and is able to use her tongue to improve the experience.</p>' +
						'<p>You remain somewhat vigilant while Kylie\'s tongue begins to slide over your folds and her fingers push into you, but aside from a few students hurrying to the locker rooms in the distance, the field is empty, and soon you don\'t really care for them ether.</p>' +
						'<p>Kylie shifts her position a little, and boy, she wasn\'t kidding about hurrying up, her fingers massaging along your inner walls while she focuses her tongue fully on your clit to push you to your climax, and as it hits, she eagerly cleans your mound with a few quick laps of her tongue and presses a kiss to your clit.</p>'
					);
				}

				startQuestions();
				if (isShopOpen(2)) addLinkToPlace(md, "enter the School", 70);
				if (isPlaceKnown("Park")) addLinkToPlace(md, "walk into the park", 63);
				addLinkToPlace(md, "return to the front of the school", 9);
				WritePlaceFooter(md);
				return true;
			}
		}
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPerson("poledancea.jpg");
		addPlaceTitle(md, "Kylies\'s Dance");
		md.write(
			'<p>Kylie appears dressed in a \'naughty schoolgirl\' sort of outfit. A bit close to the mark but it is a popular sort of outfit for these sort of things. You rapidly realise she is completely familiar and experienced with this sort of dancing.'
		);
		if (this.checkFlag(4)) md.write(' Then again from that text of her tied-up you would guess she has been to this club before, probably a lot!');
		md.write(
			'</p><p>While she is familar and knows how to dance she is not the consumate pro, but neither is she a newbie. She dances, well strips, well and you and the crowd appreciate her performance.</p>' +
			'<p>After she she redresses and joins you for a little, but she does not stay for long, saying something about getting home before her Mom does.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after she leaves', Place);
		WritePlaceFooter(md);	
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Sports Fields
			if (Place == 144 && this.isHere())  {
				if (isSpellKnown("Shielded Charm") && this.checkFlag(1)) {
					// Know shielded Charm
					CastCharmSpell("Kylie", 144, 1, "type=charm1");
				} else addComments('Don\'t cast the spell here. It is too public.');
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	per.isPhoneable = function() {
		// Can you call them?
		return this.isCharmedBy() && this.checkFlag(3);
	};

	per.callThem = function() {
		if (!isDay() || getHour() > 12 || this.checkFlag(6)) {
			WriteComments("You call Kylie, but there is no answer.");
			this.setFlag(5);
		} else if (Place == 269 && checkPlaceFlag("Hotel", 11)) {
			gotoPlace(Place, 'type=kyliepool');
			receiveCall('', 'You call Kylie and invite her to join you at the pool for a swim, and she mmediately answers, "Sure Cuz, sounds like fun!"');
			WriteCommentsFooter(bChat, bChatLeft);
			
		} else if (!isOutside()) WriteComments("You call Kylie, but there is no answer, you should try again somewhere else. Your phone is not the best and you are getting a poor signal here inside.");
		else if (Place != 37) WriteComments("You call Kylie, and speak to her, but she says she has only a little free time, and asks you to meet her on Cherise Rd, but to call once you get there");
		else {
			gotoPlace(Place, 'type=streetmeet1');
			receiveCall('', 'You call Kylie and she immediately answers, and says she will be there in a minute!');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	per.addPersonPhoneCall = function() {
		if (!this.checkFlag(3) && this.isCharmedBy() && getHour() < 12) {
			if (makeCall(true, 290)) this.setFlag(3);
		}
		if (!this.checkFlag(4) && this.checkFlag(5)) {
			if (makeCall(true, 291)) this.setFlag(4);
		}
		if (!this.checkFlag(8) && checkPersonFlag("AuntBrandi", 2) && !isDay()) {
			if (makeCall(true, 292)) this.setFlag(8);
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		if (id == 290) return receiveSMS('Kylie', 'Hey cuz, give me a call sometime. I am often free in the mornings, or can get free. Next time you are near Cherise Rd let\'s hook up', 'kyliesms1.jpg');
		if (id == 291) return receiveSMS('Kylie', '\"Sorry, tied up now\", hahaha! Seriously, from a fun night a while ago!', 'kyliesms2.jpg');
		if (id == 292) return receiveSMS('Kylie', 'Snapped this earlier, thought you might like it. Mom though I was texting someone as I walked in on her \"accidentally\"', 'brandisms1.jpg');		
		return '';
	};

}
