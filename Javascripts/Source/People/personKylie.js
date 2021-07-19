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
		// At the school oval weekdays 12-2pm
		if (sType == "streetmeet1" || sType == "streetmeet2") return Place;
		var nd = Math.floor(nTime / 288) % 7;
		return (getHour() >= 12 && getHour() < 14 && nd < 6) ? 144 : Place == 401 ? Place : 400;
	};
	
	per.passTimeDay = function() {
		this.setFlag(6, false);
		return '';
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;
		
		if (this.checkFlag(13) && !this.checkFlag(14)) {
			this.setFlag(14);
			showPopupWindow("What to Do?",
				findPerson("Brandi").addPersonString("what.jpg", "height:max%", "right") +
				'You are confused about Aunt Brandi, the charm spell has no effect on her, but she is a complete skeptic about the occult and seems to own nothing that may remotely be a protective charm!</p>' +
				'<p>She is controlling of her daughter and very stubborn, but has a definitely sexual side and voyeuristic bent <b>but</b> will not let Kylie do anything to watch. She may be actively dating but conceals it from Kylie.</p>' +
				'<p>What is happening here? You are going to have to ask someone else, at least try to talk to Mom about this carefully. Maybe others may suggest something too?'
			);
			return true;
		}

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
		if (Place == 401 && !this.checkFlag(10) && this.isHere()) {
			// First visit to her bedroom
			this.setFlag(10);
			showPopupWindow("Kylie's Bedroom",
				this.addPersonString("changing.jpg", "height:max%", "right") +
				'You ask Kylie to lead you to her bedroom, somewhat more loudly you say \"to study\" and you hear Aunt Brandi respond \"leave the door open\" and Kylie agrees and smiles.</p>' +
				'<p>Kylie takes you to her room and without asking you to look away she quickly changes into a pink nightdress, you see she has red panties and a slim pink bra.</p>' +
				'<p>She smiles and poses modeling for you for a moment, before she sits on the bed and gestures for you to join her. She grabs a book and hands it to you so you can appear to be studying in case Aunt Brandi looks in and she almost certainly will!'				
			);
			return true;
		}
		return false;
	};

	per.showEventLounge = function()
	{
		var md;
		
		if (sType == "kylieflashlounge") {
			md = WritePlaceHeader();
			this.showPersonRandom("lounge-flash", 2);
			addPlaceTitle(md, "A Quick Flash");
			md.write(
				'<p>While Aunt Brandi is out of the room Kylie quickly lifts up her top and a slim bra exposing her petite breasts. She starts to lower her shorts too, showing her panties, but quickly does them up and lowers her top as you hear Aunt Brandi nearby.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'smile and whisper "Cute as always"', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "kyliefucklounge") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("lounge-fuckb", isExplicit() ? 6 : 1);
			else this.showPersonRandom("bedroom-fuckg", 2);
			addPlaceTitle(md, "Getting Closer to your Cousin");
			md.write(
				'<p>You lean in and kiss Kylie, and now you are free to go as far as you wish with her at home!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'you relax with Kylie afterwards', Place);
			WritePlaceFooter(md);
			return true;
		}			
		if (sType == "kyliebjlounge") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("lounge-bjb", isExplicit() ? 4 : 1);
			else this.showPersonRandomRorX("lounge-bjg", isExplicit() ? 1 : 1);
			addPlaceTitle(md, "Kylie Gives you a Different Kiss");
			md.write(
				'<p>Kylie gives you a blowjob</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'you relax with Kylie afterwards', Place);
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};

	per.showEventBedroom = function()
	{
		var md;

		if (sType == "kylieflashbed") {			
			md = WritePlaceHeader();
			this.showPersonRandom("bedroom1-flash", 2);
			addPlaceTitle(md, "A Quick Flash");
			md.write(
				'<p>Kylie quickly checks the doorway and pulls down her nightgown showing her bra and then her petite breasts. She smiles and you comment "Definitely worth studying"</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'she smiles and redresses', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "kyliekissbed") {
			md = WritePlaceHeader();
			this.showPersonRandom("bedroom1-kiss", 2);
			addPlaceTitle(md, "A Quick Kiss");
			md.write(
				'<p>You lean in and kiss Kylie, she happily responds but she seems to be keeping an eye on the doorway</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'she smiles and discusses study for a bit', Place);
			WritePlaceFooter(md);
			return true;
		}	
		if (sType == "kyliefuckbed") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("bedroom-fuckb", isExplicit() ? 3 : 1);
			else this.showPersonRandom("bedroom-fuckg", 2);
			addPlaceTitle(md, "Getting Closer to your Cousin");
			md.write(
				'<p>You lean in and kiss Kylie, and now you are free to go as far as you wish with her at home!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'you relax with Kylie afterwards', Place);
			WritePlaceFooter(md);
			return true;
		}			
		if (sType == "kyliebjbed") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("bedroom-bjb", isExplicit() ? 2 : 1);
			else this.showPersonRandomRorX("bedroom-bjg", isExplicit() ? 4 : 2);
			addPlaceTitle(md, "Kylie Gives you a Different Kiss");
			md.write(
				'<p>Kylie gives you a blowjob</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'you relax with Kylie afterwards', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		return false;
	};

	per.showEvent = function()
	{
		if (Place == 400) return this.showEventLounge();
		if (Place == 401) return this.showEventBedroom();
		
		var md;
		
		// Anywhere
		if (sType == "streetmeet1") {
			md = WritePlaceHeader();
			this.setFlag(6);
			this.showPersonRandom("kylie-street-1", 2);
			addPlaceTitle(md, "Walking with Cousin Kylie");
			md.write(
				'<p>Kylie joins you from a nearby house, you assume her home. She is wearing a sheer white dress that is almost transparent in the bright sunlight. You are fairly sure she is wearing <i>nothing</i> else!</p>' +
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
				'<p>Kylie leads you to a nearby pathway between the homes, an access-way to some walking paths. After a quick check that there is no-one else around, she removes her dress with ease. She is not wearing a thing aside from the sheer dress!</p>' +
				'<p>"Well Cuz, you do not just have to look" She smiles as she starts to remove your clothing...</p>' +
				'<p>There is a certain sort of excitement in stripping off in public to have sex with your cousin. This area is not exactly private and you keep wondering if some person walking their dog or going shopping will come along to witness the two of you. But that is part of the excitement, the thrill and Kylie is completely in to it.</p>'
			);
			if (!checkPersonFlag("Brandi", 1)) md.write('<p>You notice Kylie glance over at a house nearby, you see a figure clearly in the window.</p>');
			else if (!checkPersonFlag("Brandi", 2)) md.write('<p>After Kylie put her clothes back on, and then jumps up and waves at someone in the backyard of her house. You are fairly sure who it is...</p>');
			else md.write('<p>You see her glancing occasionally towards her home, as if hoping her mother would be one of those walking along and see her daughter! You do notice Aunt Brandi is outside exercising but seems very focused on her routine.</p>');
			startQuestions();
			if (!checkPersonFlag("Brandi", 1)) addLinkToPlace(md, 'look at the person Kylie glanced at', Place, 'type=seebrandi1');
			else if (!checkPersonFlag("Brandi", 2)) addLinkToPlace(md, 'wave at Aunt Brandi', Place, 'type=seebrandi2');
			else addLinkToPlace(md, 'watch Aunt Brandi\'s workout', Place, 'type=seebrandi3');
			this.addDancingLink(md, 'talk to Kylie about dancing at the club?"', 
				'You talk to Kylie about the Avernus club and about if she wants to have some fun and dance there,</p>' +
				'<p>&quot;Sounds like fun Cuz, I still have the outfit I last used there!&quot; Last used? You ask her and she grins but refuses to explain, so you call Jade to arrange a dance for Kylie.'
			);
			addLinkToPlace(md, 'sometime later...say goodbye for now', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 269) {
			// Pool
			if (sType == "kyliepool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPersonRandom("pool", 2);
				addPlaceTitle(md, "Swimming with Kylie");
				md.write(
					'<p>Kylie arrives, dressed in a cute pink bikini, smiling broadly as she shows off her swimsuit and her figure.</p>'
				);
				if (this.checkFlag(4)) {
					md.write(
						'<p>Kylie mentions her \'tied up\' SMS and suggests something \'interesting\' as there are some ropes nearby securing some equipment, and they could be used \'differently\'?</p>' 
					);
				}
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=kyliepoolsex');
				if (this.checkFlag(4)) addLinkToPlaceC(md, "do something 'interesting'", Place, 'type=kyliepoolroughsex');
				addLinkToPlaceC(md, 'say goodbye to Kylie', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "kyliepoolsex") {
				md = WritePlaceHeader();
				if (!isExplicit() || !perYou.isMaleSex()) this.showPerson("pool-sex.jpg");
				else this.showPersonRandomX("pool-sexb", 2);
				addPlaceTitle(md, "Being Discrete and Private with Kylie");
				md.write(
					'<p>You ask your cousin to play with you more privately, and she seductively removes most of her swimsuit and kneels on a sub-lounge waiting for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Kylie', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "kyliepoolroughsex") {
				md = WritePlaceHeader();
				if (!isExplicit() || !perYou.isMaleSex()) this.showPerson("pool-roughsex.jpg");
				else this.showPersonRandomX("pool-roughsexb", 2);
				addPlaceTitle(md, "'Interesting' Games with Kylie");
				md.write(
					'<p>Kylie goes and gets some red rope and offers you her hands to tie up. She also insists you keep hold of one end of the rope like a leash to control her.</p>' +
					'<p>You play bondage games with her, though more sex games than anything playful. Kylie is quite clear in what she wants and for you to do to her, but still she \'plays\' at being the reluctant submissive rather well.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Kylie', Place);
				WritePlaceFooter(md);
				return true;
			}			
			return false;
		}
		
		if (Place != 144) return false;
		
		// School Sports Fields
		
		if (sType.substr(0, 5) == "charm") {
			// Charm spell
			md = WritePlaceHeaderNP();
			var idx = parseInt(sType.charAt(5), 10) + 1;
			this.showPerson("kylie" + idx + ".jpg");
			addPlaceTitle(md, "Cousin Kylie Under a Charm Spell");

			if (sType == "charm1") {

				md.write(
					'<p>You call out to your cousin Kylie and ask her to join you for a little. She looks at you and smiles,</p>' +
					'<p>"Sure ' + perYou.getPersonName() + ' but don\'t think that we are going to be \'Kissing Cousins\', family is out of the question!". She is smiling, this is more her way of joking around with you than a warning.</p>' +
					'<p>You do not agree though with her, she is virtually a stranger and very cute, so you tell her "Dai Chu Kylie!"</p>' +
					'<p>She looks at you oddly, "Ehhh what was that Cuz" and she glances around and you see the other players have left the court and you are almost alone now. She continues,</p>' +
					'<p>"Cuz, we are not really close family are we", and she partly pulls down the back of her shorts. "It is strange, I really feel like I would like to get to know you better, so maybe a little making out and touching..."</p>' +
					'<p>Wow, she has fallen under the spell quickly, maybe she already liked you a bit</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'touch her', 144, "type=charm2");
				WritePlaceFooter(md);
				return true;

			}
			if (sType == "charm2") {

				md.write(
					'<p>You reach out to touch her tantalising ass, but she laughs and almost dances away as she pulls up her shorts. She gestures to you in a \'come this way\' fashion and leads you to a partly secluded bench. You start to talk to her about obedience, but she laughs,</p>' +
					'<p>"Hey Cuz, who wants to talk about boring who is in charge stuff. I am more interested in talk of who is on <i>top</i>!"</p>' +
					'<p>Your immediate thought is what is it with the women of your family, everyone wants to be in charge. As you think this she sits rather provocatively, pulling aside her shorts showing her cleanly shaven pussy and a lack of panties.</p>' +
					'<p>"Well Cuz, isn\'t this a better thing to talk about. How about you kiss your cousin, in a more <i>personal</i> way?"</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'kiss your cousin', 144, "type=charm3");
				WritePlaceFooter(md);
				return true;

			}
			if (sType == "charm3") {
				if (!this.checkFlag(2)) {
					PlaceI(5);
					this.setFlag(2);
				}
				md.write(
					'<p>Kylie guides you to kiss her <i>intimately</i> and passionately! Together you explore and enjoy each others bodies. As children you may of last hugged, but now as adults you can truly embrace each other.</p>' +
					'<p>Later you dress and Kylie <i>mostly</i> does, her shorts removed and showing her delightful ass for your, and her, enjoyment.</p>' +
					'<p>As she shows off to you, Kylie stumbles and picks up something partially buried in the sand of the volleyball court</p>' +
					'"It\'s one of these silly things, carved by someone who knows nothing about art!", and she drops the familiar looking stone.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'sit for a while with your cousin', 144);
				WritePlaceFooter(md);
				return true;
			}
		}
			
		if (sType == "kisskylie") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("sportfields-bjb", isExplicit() ? 3 : 1);
			else this.showPersonRandomRorX("bedroom-bjg", isExplicit() ? 2 : 1);

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
		if (sType == "fuckkylie") {
			md = WritePlaceHeader();
			this.showPersonRandomRorX("sportfields-sexb", isExplicit() ? 4 : 1);

			addPlaceTitle(md, "'Wrestle' Kylie");

			md.write(
				'<p>The two of you move to a somewhat secluded area behind a few bushes and you pull Kylie closer, your lips touching as you exchange a tender kiss.</p>' +
				'<p>“Hmh, That was great, cuz, but you suggested getting physical and wrestling me to the ground.” Kylie looks around to make sure no one is able to see you two, for now, and slips off her shorts and lifts her top.</p>' +
				'<p>Yes, even under your spell she is the one giving the orders, you\'ve gotten used to it by now.</p>' +
				'<p>“You know we are easily spotted here?” You ask, and your Cousin gives you an exited grin while her fingers begin to tease her pussy </p>' +
				'<p>“Just means we need to hurry a little, get over here and show me how you can make me submit to you”</p>'
			);

			startQuestions();
			if (isShopOpen(2)) addLinkToPlace(md, "enter the School", 70);
			if (isPlaceKnown("Park")) addLinkToPlace(md, "walk into the park", 63);
			addLinkToPlace(md, "return to the front of the school", 9);
			WritePlaceFooter(md);
			return true;
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
			'</p><p>While she is familiar and knows how to dance she is not the consummate pro, but neither is she a newbie. She dances, well strips, well and you and the crowd appreciate her performance.</p>' +
			'<p>After she she redresses and joins you for a little, but she does not stay for long, saying something about getting home before her Mom does.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after she leaves', Place);
		WritePlaceFooter(md);	
	};
	
	// Text shown in a location
	per.showPersonTextHere = function(md)
	{
		if (Place == 144 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) {
				md.write(
					'<p>Kylie is waiting for you near the courts,<br>' +
					'"Hey Cuz, how about we explore the term \'Kissing Cousins\'?"</p>'
				);
			} else {
				md.write(
					'<p>Your cousin Kylie is over at the volleyball court, playing a game with some friends. She flashes you a cute smile.</p>'
				);
			}
		}
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (sType !== "") return;
		var perAunt;
		if (Place == 144 && this.isHere() && sType === "" && this.isCharmedBy()) {
			addLinkToPlace(md, "kiss your cousin", 144, 'type=kisskylie');
			if (perYou.isMaleSex()) addLinkToPlace(md, "'wrestle' with your cousin", 144, 'type=fuckkylie');
			return;
		}
		if (Place == 400 && this.isHere() && sType === "") {
			perAunt = findPerson("Brandi");
			addLinkToPlace(md, "Kylie lifts her top", Place, 'type=kylieflashlounge');
			if (perAunt.isCharmedBy() || !isAtLocation(400, perAunt.whereNow())) {
				// Aunt Brandi not charmed and not here
				addLinkToPlaceC(md, "ask Kylie for a different kiss", Place, 'type=kyliebjlounge');
				addLinkToPlaceC(md, "make love with your cousin", Place, 'type=kyliefucklounge');
			}
		}
		if (Place == 401 && this.isHere() && sType === "") {
			perAunt = findPerson("Brandi");
			addLinkToPlace(md, "Kylie lifts her top", Place, 'type=kylieflashbed');
			addLinkToPlace(md, "kiss Kylie", Place, 'type=kyliekissbed');
			this.addQuestionRF(md, 11, "ask about her mother, Aunt Brandi", 
				'She says "Mom is Mom I am not sure what you want to know. She is really fit and really stubborn. She always gets her way in our arguments.</p>' +
				'<p>You ask about if she is dating or anything like that and Kylie says, "She does out at times but never talks about it to me. You know she does not want me to date at all, if she had her way I would be a virgin and never ever do anything with anyone!", she smiles.</p>'
			);
			if (perAunt.checkFlag(12)) {
				this.addQuestionRF(md, 12, "ask about her Aunt Brandi and her attitude to the occult", 
					'She says "I\'m not sure, she just has never believed in that sort of stuff. Actually she has always been a bit harsh on people who believe that sort of thing"'
				);
			}
			if (perAunt.checkFlag(13) && this.checkFlag(12)) {
				this.addQuestionRF(md, 13, "ask about Aunt Brandi when she looked in", 
					'She says "You mean how she looked, flustered. I have seen her watching me with friends and her fantasies are quite active and imaginative I assume. Women in my family have an active sex-drive so I would guess she was turned-on. She still does not want me to actually <b>do</b> anything but she seems to like the thought of what I might get up to"</p>' +
					'<p>She smiles and leans towards you exposing her cleavage...'
				);
			}	
			if (perAunt.isCharmedBy()) {
				// Aunt Brandi is charmed
				addLinkToPlaceC(md, "ask Kylie for a different kiss", Place, 'type=kyliebjbed');
				addLinkToPlaceC(md, "make love with your cousin", Place, 'type=kyliefuckbed');
				
				this.addSleepLinkRandom(md, "sleep with your cousin", "Sleeping with Kylie",
					'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Kylie to bed for the night.</b>',
					'bed', 2, true
				);
				this.addDancingLink(md, 'talk to Kylie about dancing at the club?"', 
					'You talk to Kylie about the Avernus club and about if she wants to have some fun and dance there,</p>' +
					'<p>&quot;Sounds like fun Cuz, I still have the outfit I last used there!&quot; Last used? You ask her and she grins but refuses to explain, so you call Jade to arrange a dance for Kylie.'
				);				
			}
		}
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
	
	// Phone calls
	
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
			receiveCall('', 'You call Kylie and invite her to join you at the pool for a swim, and she immediately answers, "Sure Cuz, sounds like fun!"');
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
		if (!this.checkFlag(9) && checkPersonFlag("AuntBrandi", 4) && !isDay()) {
			if (makeCall(true, 293)) this.setFlag(9);
		}		
		return false;
	};
	
	per.getPersonSMS = function(id) {
		if (id == 290) return receiveSMS('Kylie', 'Hey cuz, give me a call sometime. I am often free in the mornings, or can get free. Next time you are near Cherise Rd let\'s hook up', 'kyliesms1.jpg');
		if (id == 291) return receiveSMS('Kylie', '\"Sorry, tied up now\", hahaha! Seriously, from a fun night a while ago!', 'kyliesms2.jpg');
		// 292 is handled by Aunt Brandi
		if (id == 293) return receiveSMS('Kylie', 'Mom told me I cannot speak to you or see you anymore. Well I have a way to not speak, but no blindfolds...', 'kyliesms3a.jpg') + receiveSMS('Kylie', 'That would be fun, but we can also just ignore her and do other fun things!', 'kyliesms3b.jpg');
		return '';
	};

}
