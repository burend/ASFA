/****************************************************************
Jenny - Waitress @ Cafe Responses
****************************************************************/
function RepliesJenny(nR)
{
	if (nR == 9601)
	{
		per.other = 2;
		addComments('"Depends on your price range, hon. I recommend the bratwurst, for ' + sCurrency + '4.00.  I love a good bratwurst."<br>');
	}
	else if (nR == 9602)
	{
		if (nMoney > 3) {
			per.other = 3;
			AddCash(-4);
			addComments('You pay ' + sCurrency + '4 for the bratwurst. Jenny asks you to step over to the counter as she gets the bratwurst from a small storeroom. It appears to be a sausage that smells faintly of beer.');
			Place = 203; // Move you to the "Charmable" location
		}
		else addComments('"Looks like you don\'t have enough for that, hon."');
	}
	else if (nR == 2000)
	{
		setPlaceKnown("JennysApartment");
		addComments('<p>Jenny answers, "Of course, ' + perYou.getMaster() + ', it is Apartment 32, on 42 Celeste Rd. Please visit me when I am not working here!"</p>');
	}
	return true;
}

function LeaveMinJenny()
{
	dispPlace(194, "");
	WriteComments('You leave the cafe and Jenny to deal with the spell.<br/>She will be affected by the spell but you have chosen to not try to reinforce or guide her so the effect will be minimal.');
}

// Initialise
function initialiseJenny()
{
	// Jenny
	addPerson("Jenny", 196, "Jenny", "", false);
	
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		return this.isCharmedBy() ?  "Jenny, Your Slave" : "Jenny, Your Waitress";
	};
	per.Replies = RepliesJenny;

	per.getPersonGender = function() { return this.checkFlag(4) ? "futa" : "woman"; };

	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		var s = "<p>" + this.addPersonString(this.isCharmedBy() ? "jenny1c.jpg" : "jenny1b.jpg", "height:max%", "right") + "Jenny, the popular waitress at the Bavaria Hut, ";
		if (this.isCharmedBy()) {
			return s + "Jenny, the most popular waitress at the Bavaria Hut, has devoted herself to you with surprising enthusiasm and is happy to take customer satisfaction to new highs whenever you visit her.</p>" +
				"<p>She has grown up bilingual in the " + (isBritish() ? "UK" : "US") + " as the daughter of German immigrants and easily switches between both languages with little effort, but you quickly found out that she has a habit of slipping into German when irritated, horny, or both.</p>" +
				"<p>In fact, Jenny loves using German to talk dirty during sex and has an impressively vulgar vocabulary that you will need some time to learn, though the intent behind her words is usually rather obvious.</p>" +
				"<p>She has a stunning body and loves to show it off, which she knows draws many customers to the Restaurant and affords her some leeway to get free meals for you and personally tend to your needs whenever you visit; and being under your spell has only increased her exhibitionist nature.</p>" +
				"<p>She is now far more likely to act on those impulses, and you know she's skipping on underwear even more often than before and will sometimes even wear butplugs and similar toys at work.";
		} else return s + "the beautiful idol of the restaurant.";
	};

	per.getPersonAddress = function() { return isPlaceKnown("JennysApartment") ? 'Apartment 32, 42 Celeste Rd' : ''; };	

	per.whereNow = function()
	{
		if (this.checkFlag(3) && !isWeekDay()) return 467;		// Alison works the weekends
		if (Place == 203) return Place;
		return isShopOpen(4, 0, true) ? this.place : 467;
	};
	
	// Popup events for Jenny
	per.showEventPopup = function()
	{
		if (perYou.isFuta(true) && !this.checkFlag(4) && gameState.bLastSex && this.isHere() && sType === "") {
			// After first sex scene with her as a futa
			this.setFlag(4);
			var s;
			if (this.isFuta()) s = '“It works just like mine, does it?” She asks, her eyes on the limb shaft between your legs. “Growing hard, shooting out loads of cum...”';
			else s = '“Does it... function just like a man\'s?” She asks, her eyes on the limb shaft between your legs. “Does it grow hard, I mean?”';
			s += '</p><p>You encourage her to try it out, and after a brief pause, she\'s on her knees and your new manhood grows under her gentle touch.</p>' +
					'<p>“This is so weird...” Jenny is apprehensive at first, but her curiosity quickly gets the better of her, and soon she is jerking you off all too eagerly.</p>' +
					'<p>“I\'m at work... on my knees... jerking off the cock of a -woman- who has turned me into her sexslave...” She takes one hand away and guides you into her mouth, most of your shaft vanishing in her tight throat until she has to gasp for air.</p>' +
					'<p>“And it\'s turning me on... macht mich so richtig geil...”</p>' +
					'<p>Jenny clearly knows what she is doing. She\'s getting more and more into it with every lick, kiss and stroke, and so fascinated by your new tool that she almost completely forgets to talk dirty for most of the time. Her eyes are always expectantly on the tip until you are no longer able to hold back and the first load of your cum sprays onto her face.</p>' +
					'<p>“Wow...” She uses two fingers to taste your cum, somewhat apprehensive, at least until the pink glow in her eyes flares up again.</p>' +
					'<p>“Lecker...” She greedily scoops up more from her face and even laps up the remaining drops from your tip.</p>';
			if (!this.isFuta()) s += '<p>“You taste amazing! Are... are you able to give a cock like this to... other girls as well, ' + perYou.getMaster() + '? Just curious.”';
			showPopupWindow("Jenny\'s Reaction to Your Changes",
				this.addPersonString("jenny8b.jpg", "height:max%", "right") +
				'<p>Jenny\'s eyes widen in surprise when you reveal the newest “addition” to your body to her. She is apprehensive of your cock at first, but clearly curious.</p>' + s
			);				
			return true;	
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (Place == 269 && sType == "jennypool") {
			WaitHereOnly(4);
			md = WritePlaceHeader();
			this.showPerson("jenny-pool" + (this.checkFlag(4) ? "-futa" : "") + ".jpg");
			addPlaceTitle(md, "Swimming with Jenny");
			md.write(
				'<p>Jenny arrives, dressed in a black bikini, you think it is made of leather, an unexpected side of her.</p>' +
				(this.checkFlag(4) ? "<p>You notice she tends to cover the bulge in her crothch from others, she seems embarrassed to show <i>others</i> her new cock.</p>" : "")
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=jennypoolsex');
			addLinkToPlaceC(md, 'say goodbye to Jenny', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "jennypoolsex") {
			md = WritePlaceHeader();
			this.showPerson("jenny-pool-sex" + (this.checkFlag(4) ? "-futa" : "") + ".jpg");
			addPlaceTitle(md, "Being Discrete and Private with Jenny");
			md.write(
				'<p>You ask your lovely watressy, and she seductively removes most of her swimsuit and lies back waiting for you.' +
				(this.checkFlag(4) ? " her cock stiffening as she uncovers it." : "") +
				'</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Jenny', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 203) {
			if (sType == "charmjenny1") {
				// Charm Jenny 1
				md = WritePlaceHeader();
				this.showPerson("jenny12.jpg");

				addPlaceTitle(md, "Jenny Charmed");
				md.write(
					'<p>The restaurant is always filled with guests, no matter the time of day, but not so much that there isn\'t a quiet corner to find where you can weave the shielded charm in peace and always have a good view of the area.</p>' +
					'<p>Jenny doesn\'t really notice anything at first. Her cheeks flush a little and you see a shiver run through her as strains of your mana connect to her skin, but she still does her best to brush it off and tend to the customers even as the need must be building up inside her.</p>' +
					'<p>Over the next minutes, however, things begin to change.</p>' +
					'<p>People stop ordering food or refills while even new arrivals forget what they came in for and just take out their phones or talk with each other. Jenny has an increasingly hard time getting anyone\'s attention and customers often look right through her when she tries to address them. She\'s clearly growing increasingly irritated, and by now, and the way the spell builds up her arousal isn\'t helping.</p>' +
					'<p>"Himmelherrgottnochmal...."</p>' +
					'<p>You hear her silently curse in German after yet another customer ignores the check she waves in front of his face, and as she takes a step back from the table, you see her fingers twitch to her crotch and her head rolling back with a frustrated sigh.</p>' +
					'<p>She looks about to rush out of the eating area when her eyes suddenly meet yours.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'smile at her', Place, 'type=charmjenny2');
				addLinkToPlace(md, 'leave the restaurant and Jenny as she gets used to the spell?', 194, "", "", "", "LeaveMinJenny()");			
				WritePlaceFooter(md);
				return true;
			}	
			
			if (sType == "charmjenny2") {
				// Charm Jenny 2
				md = WritePlaceHeader();
				if (this.other == 1) {
					this.other = 2;
					AddCash(20);
				}

				this.showPerson("jenny3.jpg");

				addPlaceTitle(md, "Jenny Charmed");

				this.charmThem(4);

				md.write(
					'<p>"Du..."</p>' +
					'<p>Jenny\'s eyes fixate on you, irritation and lust visible as she approaches.</p>' +
					'<p>"Warum bist du ' + (perYou.isMan() ? 'der' : 'die') + ' einzige der/die mich noch beachtet? Dein Blick bohrt sich regelrecht in..."</p>' +
					'<p>She stops when she realizes that you didn\'t understand a word she said and effortlessly falls back into fluid English with only the faintest hint of an accent.</p>' +
					'<p>"Sorry... Why are you the only one who still notices me? What is going on here?"</p>' +
					'<p>Jenny releases an involuntary moan, her body shaken when a small wave of pleasure forces her to sit down.</p>' +
					'<p>“And why am I feeling like I...” She shakes her head with a frustrated grunt.” What is happening to me?”</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, "tell her", Place, 'type=charmjenny3');
				WritePlaceFooter(md);
				return true;
			}	
			
			if (sType == "charmjenny3") {
				// Charm Jenny 3
				md = WritePlaceHeader();
				this.showPerson("jenny4.jpg");

				addPlaceTitle(md, "Jenny Charmed");
				md.write(
					'<p>“Would you believe me when I tell you that your mind is being bound to me?” You ask innocently. “That the other customers don\'t notice you because you are meant to be mine alone?”</p>' +
					'<p>“Ja ne... is klar!” Jenny rolls her eyes with a chuckle. “Do you know how often I hear lines like this? How many times a day people try to get me to pull down my blouse or lift my skirt with a weird story?”</p>' +
					'<p>“And yet,” You answer. “This time you actually want to do it.”</p>' +
					'<p>Jenny is clearly struggling with herself when you say those words, and for a moment, it seems like she is about to get up and rush off when the pink glow in her eyes suddenly flares up and she unceremoniously opens her bodice to let her ample breasts fall free.</p>' +
					'<p>“Gott, that felt good...” Jenny eagerly squeezes her breasts and releases a long, relieved sigh. “I always “actually want to do it”, but I\'m not allowed to do more than tease a little.” Her eyes focus back on you curiously. “I am risking my job if I do more, but since I am being “bound” to you...” She chuckles as she speaks out the word, still not fully believing it even with the spell clearly affecting her behavior. “You will probably now try to explain why I shouldn\'t worry.”</p>'
				);

				startQuestions();
				addLinkToPlace(md, "encourage her to do even more", 203, "type=charmjenny4");
				WritePlaceFooter(md);
				return true;
			}	
			
			if (sType == "charmjenny4") {
				// Charm Jenny 4
				md = WritePlaceHeader();
				this.showPerson("jenny14.jpg");

				addPlaceTitle(md, "Jenny Charmed");
				md.write(
					'<p>Jenny obviously enjoys the idea of showing off. Her body is shivering when you remind her that no one even blinked when she took out her tits, and that no matter what she does right now, there will be no repercussion because no one will remember it aside from you, so why not go all the way?</p>' +
					'<p>“Latürnich!” Jenny laughs as she rises with a single, seductive motion, hands resting on the chair. “You are telling me that I could even put my skirt aside...” She does just that, revealing that she\'s not actually wearing underwear at work. “.,.and spank my ass...” Her hand goes down on her ass several times, the noise and her audible gasps actually startling a few customers nearby. “And no one takes note?”</p>' +
					'<p>You watch as Jenny expectantly looks around the room, but to her surprise, and disappointment, even those who had heard her have already turned their attention elsewhere.</p>' +
					'<p>“Och menno... ” She pouts as she turns to you. “...I finally get to do this and no one sees it...”</p>'
				);

				startQuestions();
				addLinkToPlace(md, "remind her that you see it", 203, "type=charmjenny5");
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "charmjenny5") {
				// Charm Jenny 5
				md = WritePlaceHeader();
				this.showPerson("jenny10.jpg");

				addPlaceTitle(md, "Jenny Charmed");
				md.write(
					'<p>“You... you do.” The pink glow in her eyes flares up again. “Y...you really are binding me to you, are you?” Jenny draws her fingers over her slightly reddened but-cheeks, her eyes only on you. “...twisting my mind to be your Slave... deine dauergeile Sklavin...” She seems to almost taste the words on her lips. “...making me expose myself...right in front of all these people...”</p>'
				);

				startQuestions();
				addLinkToPlace(md, "order her to pleasure herself", 203, "type=charmjenny6");
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == "charmjenny6") {
				// Charm Jenny 6
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPerson("jenny5.jpg");

				addPlaceTitle(md, "Jenny Charmed");
				md.write(
					'<p>Jenny turns around to face the other customers without hesitation, her bodice and skirt falling to the floor as she bends over one of the benches and spreads her legs for you.</p>' +
					'<p>“Oh Gott, this is so hot...” Jenny gasps as her fingers push into her already damp folds, her eyes wandering over the people in front of her. “I really shouldn\'t do this but...”</p>' +
					'<p>“But you want to.” You interrupt her with a slap to her ass, coaxing a moan from her lips. “You want me to watch as you fingerfuck yourself in front of your customers for me.”</p>' +
					'<p>The spell makes your words seep into her mind, using her own kinks against her and twisting them for your purpose, her fingers moving faster and faster as lust and desire erode the last of her inhibitions.</p>' +
					'<p>“Scheisse... du....” She screams out under a wave of magically amplified pleasure. Loud enough that a few customers actually notice her for a brief moment with their eyes widened in shock before apathy overtakes them again. “You are right...please watch me...” She is panting heavily now. “Bitte bitte sieh mir dabei zu, wie ich meine geile, feuchte Brosche poliere!”</p>' +
					'<p>With the last barriers having fallen, Jenny\'s reaction to the spell becomes visceral. Her speech slips from German to English and back as she swears, moans and begs for more while her fingers switch between her pussy and ass. You don\'t understand every word, but the intent behind them is pretty clear.</p>' +
					'<p>“Mir kommt\'s gleich!” Jenny\'s body convulses before you. “I\'m cumming! Please watch me cum, ' + (perYou.isMan() ? 'Meister' : 'Herrin') + '! Please watch me cum in front of all those people...”</p>'
				);

				startQuestions();
				addLinkToPlace(md, "watch her climax", Place, "type=charmjenny7");
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == "charmjenny7") {
				// Charm Jenny 6
				md = WritePlaceHeader();
				this.showPerson("jenny15.jpg");

				addPlaceTitle(md, "Jenny Charmed");
				md.write(
					'<p>obviously enjoys making a big show of it, and she is left visibly exhausted, breathing in heavily and spitting out multilingual expletives as she basks in the afterglow.</p>' +
					'<p>It takes her a moment to recover before her eyes return to you, now full of love and devotion with a soft pink glow showing your hold over her mind.</p>' +
					'<p>“Finally ready to mine?” You ask her, and Jenny nods with a dreamy smile.</p>' +
					'<p>“Wann du willst, wo du willst und wie du willst.” She looks at you with glassy eyes, then chuckles in embarrassment upon remembering you don\'t understand her. “Sorry.” She straightens herself to kneel before you. “Yes, ' + perYou.getMaster() + '. I should have seen that you are so much more than the others hitting on me. Bitte bitte lass mich deine Sklavin sein... Please allow me to be yours.”</p>'
				);

				startQuestions();
				addLinkToPlace(md, "accept her devotion and allow her to get back to work", 194, "", "Jenny is overjoyed when you claim her as you own and only very hesitantly puts her waitress outfit back on upon being reminded that the spell will end soon.</p><p>She gives you a kiss goodbye and promises that she will have something special for you on your next visit before darting off to collect something to clean the bench and chair while you take your leave.");
				WritePlaceFooter(md);
				return true;
			}				
		}
				
		if (Place == 467) {
			if (sType == "jennyfuck") {
				// Sex scenes at her home
				md = WritePlaceHeader(false, 'td-left-med');
				if (perYou.isMaleSex()) this.showPersonRandomRorX("home-sex-fuckb", isExplicit() ? 2 : 1);
				else this.showPerson("home-sex-fuckga.jpg");
				addPlaceTitle(md, "Jenny");
				md.write(
					'<p>You enjoy yourself with Jenny</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk more with Jenny', Place);
				addLinkToPlace(md, 'exit the apartment', 456);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "jennybj") {
				// Sex scenes at her home
				md = WritePlaceHeader(false, isExplicit() && !perYou.isMaleSex() ? 'td-left-med' : '');
				if (isExplicit()) this.showPersonRandomX("home-sex-bj" + (perYou.isMaleSex() ? "b" : "g"), perYou.isMaleSex() ? 3 : 2);
				else this.showPerson("home-sex-bj.jpg");
				addPlaceTitle(md, "Jenny");
				md.write(
					'<p>You enjoy yourself as Jenny ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lcks you') + '</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk more with Jenny', Place);
				addLinkToPlace(md, 'exit the apartment', 456);
				WritePlaceFooter(md);
				return true;
			}			
			if (sType == "jennytitsfuck") {
				// Sex scenes at her home
				md = WritePlaceHeader();
				this.showPersonRandomRorX("home-sex-tf", isExplicit() ? 2 : 1);
				addPlaceTitle(md, "Jenny");
				md.write(
					'<p>You enjoy yourself with Jenny\s breasts</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk more with Jenny', Place);
				addLinkToPlace(md, 'exit the apartment', 456);
				WritePlaceFooter(md);
				return true;
			}
		}

		if (Place != 196 || !isShopOpen(4, 0, true)) return false;

		// Sex scenes at the Restaurant with Jenny
		if (sType == "jennybj") {
			// Blowjob/lick
			md = WritePlaceHeader(false, 'td-left-med');
			if (perYou.isMaleSex()) this.showPersonRorX("jenny8b.jpg", isExplicit() ? "" : "height:max");
			else this.showPersonRorX("jenny8g.jpg");
			addPlaceTitle(md, "Bavaria Hut");
			md.write(
				'<p>You order some food, a medium drink, and your slave-waitress under the table while you eat, and Jenny is all too happy to provide you with all three requests.</p>' +
				'<p>To your surprise, she\'s quite experienced with this and you have a hard time just focusing on your meal while her tongue all too eagerly ' + (perYou.isMaleSex() ? ' slides all over your cock and her lips place adoring kisses to the tip.' : 'circles around your clit and trace your folds.') + '</p>' +
				'<p>It\'s always unfortunate that you never have the time to fully enjoy your waitress before someone would complain about the slow service and look for her, but Jenny turned out to be fairly experienced and it never takes her long to actually finish you off.</p>' +
				'<p>Talk about German efficiency.</p>' +
				'<p>You take a hold of her pigtails as your climax approaches, and she eagerly ' + (perYou.isMaleSex() ? 'wraps her lips around your meat and swallows every drop' : 'laps up every drop of your juices') + ' with a joyful expression on her face. She even makes sure to properly clean you after she\'s done, asking you to enjoy the rest of your meal and promising to be back in a moment to clean up.</p>'
			);
			addLinkToPlace(md, 'exit the restaurant', 194);
			WritePlaceFooter(md);
			return true;

		} else if (sType == "jennyanal") {
			// Anal
			md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() && this.getPersonGender() == "futa" ? '' : 'td-left-med');
			if (perYou.isMaleSex()) this.showPersonRorX("jenny7b" + (this.getPersonGender() == "futa" ? "-futa" : "") + ".jpg");
			else AddImageRandom("GenericSex/Explicit/sex-ff anal strapon ", 2);
			addPlaceTitle(md, "Bavaria Hut");
			md.write(
				'<p>“Oh, yes please! Ich liebe es, wenn du meinen Arsch fickst, ' + (perYou.isMan() ? 'Meister' : (perYou.getPersonGender() == "woman" ? 'Herrin' : 'Herrin')) + '.”</p>' +
				'<p>You still don\'t fully understand her when she talks dirty in German, but since she is pushing up her skirt and invitingly bending over the table for you, ' + (this.getPersonGender() == "futa" ? 'her own cock dangling down between her legs' : '') + ', you are going to assume that she approves of your choice.</p>' +
				'<p>You don\'t have that much time before she is missed, so you skip foreplay, make sure to thoroughly lube your ' + (perYou.isMaleSex() ? 'cock' : 'dildo') + ' and unceremoniously enter her tight ass with a single, rough shove.</p>' +
				'<p>“Oh Gott! Dein harter, ' + (perYou.isMan() ? 'Schwanz' : (perYou.getPersonGender() == "woman" ? 'Gummyschwanz' : 'Schwanz')) + ' fühlt sich so gut an, ' + (perYou.isMan() ? 'Meister' : 'Herrin') + '...”</p>' +
				'<p>The words come out strained in-between needy moans and definitely sound encouraging, so you settle into a rough rhythm of deep, fast thrusts and place a hard slap onto your slave\'s ass.</p>' +
				'<p>“Jajayesyesyes!” The slap only seems to drive her further into the zone, and Jenny has an audibly hard time keeping her voice low. “Please spank me, ' + perYou.getMaster() + '! Bitte versohl mir meinen geilen Sklavinnenhintern! Ramm deinen Schwanz in mein enges Arschloch und versohl mir den Hintern!”</p>' +
				'<p>You understood “Please spank me” and you are happy to oblige. Your hand comes down on her ass over and over as you pound her roughly from behind. Perhaps you are letting yourself get carried away by her lewd display, but Jenny certainly enjoys herself and is still somehow mindful enough to keep the noise somewhat down.</p>' +
				'<p>“Fuck... scheisse... Ich komme... I\'m cumming!” Jenny has to bite into her hand to muffle her voice enough to not attract the whole restaurant. Her body convulses before you with a barely muffled groan before collapsing on the table' + (this.getPersonGender() == "futa" ? ', spurts of cum from her own cock dripping onto the floor below' : '') + '.</p>' +
				'<p>' + (perYou.isMaleSex() ? 'You embed your entire length into her and let your own orgasm flow into her ass while she is still trying to recover,' : 'You feel like you almost came yourself just watching her,') + ' and for a brief moment both of you are just standing there, panting heavily and basking in the afterglow until it\'s time for Jenny to return to her job with her ass still red under her skirt for the rest of her shift.</p>'
			);
			addLinkToPlace(md, 'exit the restaurant', 194);
			WritePlaceFooter(md);
			return true;

		} else if (sType == "titsfuck") {
			// Tits Fuck (Male only)
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPersonRorX(this.getPersonGender() == "futa" && !isExplicit() ? "jenny9b-futa.jpg" : "jenny9b.jpg", "height:max");
			addPlaceTitle(md, "Bavaria Hut");
			md.write(
				'<p>You instead ask Jenny to use her breasts to pleasure you. This seems to be something she is quite familiar with and she uses her ample bosom to please you until you release all over her breasts and face.</p>'
			);
			addLinkToPlace(md, 'exit the restaurant', 194);
			WritePlaceFooter(md);
			return true;

		} else if (sType == "transformcock") {
			// Futa transformation
			CastTransform(1);
			md = WritePlaceHeader(true, '', 'black');
			if (!this.checkFlag(4)) {
				this.setFlag(4);
				showPopupWindow("Transformation",
					'<img src="Images/GenericSex/xf-futa-blonde.jpg" style="width:35%;float:left;margin-right:6px;margin-top:1em;margin-bottom:2em" alt="futa">' +
					'<p>You cast the spell and Jenny cries out something inarticulate in German and pulls away what little clothing she has on. You see a large cock growing from her groin above where her pussy is.</p>' +
					'<p>As she groans you can distinctly hear someone laughing but it is drowned out as Jenny cries out in ecstasy as her new cock spasms in her first male ejaculation.</p>' +
					'<p>Jenny seems remarkably pleased with her new cock but you cannot help but wonder if it was a good thing, but then again as you watch her stroking her new cock you put these worries out of your mind.'
				);
			} else {
				this.setFlag(4, false);
				showPopupWindow("Transformation",
					'<img src="Images/GenericSex/xf-futa-blonde.jpg" style="width:35%;float:left;margin-right:6px;margin-top:1em;margin-bottom:2em" alt="futa">' +
					"<p>You cast the spell and Jenny cries out something inarticulate in German and pulls away what little clothing she has on. You see a large cock dissapearing from her groin above where her pussy is.</p>" +
					"<p>As she groans you can distinctly hear someone laughing but it is drowned out as Jenny cries out in ecstasy as her pussy spasms in her female ejaculation.</p>" +
					"<p>Jenny seems remarkably pleased with her pussy but you cannot help but wonder if it was a good thing, but then again as you watch her fingering her pussy you put these worries out of your mind."
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
		this.showPersonRandom("poledance", 2);
		addPlaceTitle(md, "Jenny's Dance");
		md.write(
			'<p>Jenny is wearing club-wear, some may call it \'club slut wear\', you would think this means she likes going out to nightclubs but probably not here in Glenvale! She is a fairly skilled dancer, but not a very experienced stripper, so she more dances provocatively and mostly ignores the pole. Still, she is sexy and entertaining!</p>' +
			'<p>After she sits with you for a while, attentively serving you as needed!</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 467 && this.isHere() && sType === "") return this.showPerson("home1.jpg", '', '', '', '', false, "string");
		else if (Place == 203 && this.isHere() && sType === "") return this.showPerson("jenny2.jpg", '', '', '', '', false, "string");
		else if (Place == 196 && this.isHere() && sType === "") {
			var bLogan = wherePerson("MissLogan") == 196;
			var bEvt1 = this.isCharmedBy() && !bLogan && this.hoursCharmed() > 12 && !this.checkFlag(2);
			if (this.isCharmedBy()) {
				if (bEvt1 || bLogan) return this.showPerson("jenny6b.jpg", "", '', '', '', false, "string");
				return this.showPersonArray(this.getPersonGender() == "futa" ? ["jenny6d.jpg"] : ["jenny6a.jpg", "jenny6c.jpg"], "44vw", '', '', '', false, "string");
			} else if (bLogan) return this.showPerson("jenny1b.jpg", '', '', '', '', false, "string");
			return this.showPerson("jenny1a.jpg", "50vw", '', '', '', false, "string");
		}
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 467 && this.isHere()) {
			if (isVisible()) md.write('<p>Jenny welcomes you, and invites you in. She asks if there is anything she can get you, a drink, her body, anything?</p>');
			else md.write('<p>Jenny is home relaxing.</p>');
		} else if (Place == 203 && this.isHere() && sType === "") {
			md.write(
				'<p>The young couple vacate the restaurant.  Jenny, moves quickly to clear their table, ' +
				'the novelty size mug of beer sloshing gently. She catches you staring at her, ' +
				'and balances the mug on her leg. &quot;Do you need anything, ' + (perYou.isMan() ? 'sir' : 'ma\'am') + '?&quot;</p>'
			);
		} else if (Place == 196 && this.isHere() && sType === "") {
			var bEvt1 = this.isCharmedBy() && wherePerson("MissLogan") != 196 && this.hoursCharmed() > 12 && !this.checkFlag(2);

			if (this.isCharmedBy()) {
				// Charmed Jenny
				if (bEvt1) {
					this.setFlag(2);
					md.write(
						'<p>As Jenny, your personal waitress, is standing at attention behind your back, you try to choose from one of the courses. You cannot seem to pick one to your liking and turn your attention to Jenny.</p>' +
						'<p>"Bring me the today’s menu!", you order causally. Jenny, like a good slave acknowledges your demand and runs to fulfill it the best she can.</p>' +
						'<p>You wait for a few minutes, realizing you probably don’t have that much money to spend on some fancy food. You need the money for other things than just to waste them on something expensive. Jenny returns with a plate and starts to serve it to you.</p>' +
						'<p>"' + perYou.getMaster() + ', it\'s the house\'s speciality! Bratwurst with bread and some beer! I hope it’s to your liking!", she says, trying to prove herself to you. You thank her and you begin to consume the dish that has been just served to you. Jenny takes a few steps backwards from your table and carefully looks around. After a few silent moments, you hear her mellow voice in that slight German accent that you oh so love to hear.</p>' +
						'<p>"' + perYou.getPersonName() + '! I just wanted to mention that you don’t have to pay for the meal. Not for this one you eat at the moment or the ones you will eat in the future. Take it as a gift of the house.", she smiles, but you feel a little nervousness in her voice. You put down the half eaten wurst from your hand and look at her.</p>' +
						'<p>"I hope it’s not a problem to you. I don’t want you to fall into some mess because of me…"</p>' +
						'<p>"No, not all my ' + perYou.getMaster() + '! This is all for you! I wanted to make you happy and I thought through what can I offer you. This is what I came up with; free food and an isolated table far from the other, annoying guests.", Jenny objects first and after that she tries to convince you.</p>' +
						'<p>"Don’t worry about anything! I’m the restaurant’s favourite and prettiest waitress, they like me! They won’t notice a thing! I just wanted make myelf useful to you… I know I’m not some high profile police ' + getOfficer(false) + ' or the mayor, but I wanted to help you.", her pretty smile rolls to wail. You direct her to come close to you with your eyes (you don’t need words anymore, she knows what to do) and give a playful spank on her ass. Her confused face makes you laugh out loud.</p>' +
						'<p>"You did well Jenny! I’m impressed! You have done well!", you pause for a little while Jenny’s smile returns. Her face now glows with pride.</p>' +
						'<p>"Now, please let me finish this delicious meal! I’ve got to hurry because I’ve got important things to do.". Jenny, after heavily nodding to every word you said returns to her place, a few steps away from you, but just in reach if you would need anything from her. She quietly waits on you as you finish your meal in peace.</p>'
					);
				} else {
					md.write('<p>You enter the Bavaria Hut and you notice Jenny is at the front waiting for customers to come in, holding a menu sheet in her hands.');
					if (isVisible()) {
						md.write(
							' When she sees you, she runs to you and clasp her hands with yours and gently drags you through the main area of the building. When you two finally arrive, you realize you’re at the private part of the Cafe where only reserved guests can stay. It seems Jenny knew you would need some privacy so she arranged that this room would be all yours to use. ' +
							'You can talk with her or have a nice breakfast or dinner anytime without anyone disturbing you.</p>' +
							'<p>As you sit down to your table, Jenny gives you the menu. As you run through the menu she massages your head trying get your attention. You feel that her libido is going crazy and is all over the place!</p>' +
							'<p>"Hello my love," she says, "I recomend the Jägerschnitzel with Fries, the Bratwurst with Sauerkraut and having the waitress ' +
							(perYou.isMaleSex() ? 'suck your cock' : 'lick your pussy') + ' while you enjoy your meal."'
						);
					} else md.write('.</p>');
				}

			} else {
				// Uncharmed Jenny
				if (isVisible()) {
					md.write(
						'<p>You enter the cafe and look around for a seat. You ' +
						'examine the menu and realise that you may not have enough ' +
						'money to purchase most of the "authentic German cuisine." ' +
						'There is a young couple finishing their coffee in the far right corner.</p>' +
						'<p>The waitress approaches you.</p>'
					);
				} else md.write('<p>The restaurant is quite busy and the waitress is at the from waiting on customers.</p>');
			}
		}
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 467 && this.isHere() && sType === "") {
			// Jenny's apartment
			addLinkToPlaceO(md, 'accept the offer of her body', Place, 'type=jennyfuck');
			addLinkToPlaceO(md, 'accept but ask her to serve you with her mouth', Place, 'type=jennybj');			
			if (perYou.isMaleSex()) addLinkToPlaceO(md, 'accept and ask for her breasts', Place, 'type=jennytitsfuck');

			this.addDancingLink(md, 'talk to Jenny about dancing in the club',
				'You ask Jenny to dance for you at the Avernus club and she answers,</p>' +
				'<p>&quot;Yes of cournse ' + this.getYourNameFor() + ', whatever you want!&quot; and with that you call Jade to arrange a dance for Jenny.',
				false
			);	
			this.addSleepLink(md, "go to bed with Jenny", "Sleeping with Jenny",
				'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Jenny to bed for the night.</b>',
				'bed1.jpg', true, '', '', '', "overflow-y:hidden"
			);
			return;
		}
		
		// At the restaurant
		if (Place == 196 && this.isHere() && sType === "") {

			if (this.isCharmedBy()) {
				// Charmed Jenny
				if (perYou.isMaleSex()) {
					addLinkToPlaceO(md, 'accept her offer', 196, 'type=jennyanal');
					if (isVisible()) addTextForQuestions(md, 'or maybe you would prefer to sample');
					addLinkToPlaceO(md, 'her breasts', 196, 'type=titsfuck');
					addLinkToPlaceO(md, 'her mouth', 196, 'type=jennybj');
				} else {
					addLinkToPlaceO(md, 'accept her offer', 196, 'type=jennybj');
					if (perYourBody.FindItem(45) > 0) {
						// own the strap-on
						if (isVisible()) addTextForQuestions(md, 'or maybe you would prefer to sample');
						addLinkToPlaceO(md, 'her ass', 196, 'type=jennyanal');
					}
				}
				if (this.checkFlag(3) && !isPlaceKnown("JennysApartment")) addQuestionC(md, 'ask Jenny where she lives', "Jenny", 2000);

			} else {
				// Uncharmed Jenny
				if (this.other === 0) {
					addPopupLinkC(md, 'talk to the waitress', "Your Waitress, Jenny",
						this.addPersonString("jenny0.jpg", "height:max%", "right") +
						"As you stroll through the German restaurant for a seat you come across a pretty waitress. She’s the definition of the German beauty with slim, tall body, long legs and golden locks. " +
						"Her eyes and smile also betray her of the pure German heritage she has. She escorts you to your table and gives you the menu.<br><br>" +
						"She doesn’t hold much interest in you, you’re just an another customer. However, you imagine her as your slave in your head, serving you food and waiting on you all day. You would no longer have to worry about where and what to eat and you wouldn’t have to pay for it anymore. You could just come in anytime if you can make her change her mind about you" +
						(isSpellKnown("Charm") ? ", but it’s too public so you have to watch out what you are doing around here!" : "") +
						"<br><br>Your daydream is interrupted as she speaks to you,<br>" +
						'"Welcome to Bavaria Hut! I\'m Jenny, what can I get you?"',
						false, "setPersonOther('Jenny', 1);dispPlace();"
					);
				} else if (this.other == 1) addQuestionC(md, 'ask the waitress what she recommends', "Jenny", 9601);
				else if (this.other == 2) addQuestionCO(md, 'buy a bratwurst for ' + sCurrency + '4', "Jenny", 9602);
			}

		}

	};

	// Cast a spell on Jenny
	per.handleItem = function(no, cmd)
	{
		// Examining the Soul Bound Crystal
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere()) {
					if (!this.isCharmedBy()) examineItem(no, 'The ' +  s + ' trembles weakly, you suspect you need a magical link to Jenny before it will work.');
					else examineItem(no, 'The ' +  s + ' vibrates softly the closer you get to Jenny.');
					return "handled";
				}
			}
		}

		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// At the Restaurant public area and she is present?
			if (Place == 196 && this.isHere()) {
				if (this.other === 0) addComments("You do not know her name, so the spell will not work.");
				else if (!isSpellKnown("Shielded Charm")) addComments("Don't cast the spell here.  Its too public.");
				else CastCharmSpell("Jenny", 203, 1, 'type=charmjenny1');
				return "handled";
			}
			//Restaurant back room
			if (Place == 203 && (this.whereNow() == 196 || this.whereNow() == 203)) {
				CastCharmSpell("Jenny", 203, 1, 'type=charmjenny1');
				return "handled";
			}
		}

		// Casting the transform spell
		if (no == 18 && cmd == 2) {

			// In the Restaurant
			if ((Place == 203 || Place == 196) && this.isHere()) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over her but nothing happens, you seem to need a magical link to her");
					return "handled";
				}
				if (!CastTransform(1, true)) return "handled";

				ClearComments();
				dispPlace(Place, 'type=transformcock');
				return "nofooter";
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls
	per.isPhoneable = function() {
		// Can you call them?
		// Miss Logan not bred and is a breeder
		if (Place == 440 && !checkPersonFlag("MissLogan", 1) && per.getCharmedLevel() == 2 && this.isFuta()) return true;
		// Swimming
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.isCharmedBy();
	};

	per.callThem = function() {
		if (Place == 440) gotoPlace(Place, 'type=missloganbreeder&who=' + this.uid, 'You tell Ms. Logan that you have someone in mind to help impregnate her, and after placing the call the two of you wait for their arival.');
		else if (Place == 269) {
			if (this.whereNow() !== 0) WriteComments("You call Jenny to invite her to join you at the pool for a swim, but she replies, but someone else picks up and says Alison is busy serving customers and for you to call back later.");
			else {
				gotoPlace(Place, 'type=jennypool');
				receiveCall('', 'You call Jenny to invite her to join you at the pool for a swim, and she answers pleasantly, "Certaintly!" and promises to join you soon.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};
}