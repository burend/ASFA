/****************************************************************
		Hannah the Mechanic Responses

****************************************************************/
function RepliesHannah(nR)
{
	var pCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 279) {
		if (getPersonOther("MrsGranger") > 0 && getPersonOther("MrsGranger") < 58) {
			setPersonOther("MrsGranger", 58);
			if (wherePerson("MrsGranger") == 275.5) movePerson("MrsGranger", 278);
		}

		var perAbby = findPerson("Abby");
		perAbby.setQuestDragonGem(10);	//  Dragon Gem Variable = Dragon Gem is in mechanics shop
		perYou.completeQuest(3);

		moveItem(29, 1000);  // "Deletes" The vase as opened
		PlaceI(35, 279);   // Puts the Dragon Gem in the Mechanics Shop

		if (!pCharm) addComments('<p>"Hannah looks the vase over for a minute.  "Hmm.  I think we can get this open," she agrees, putting the vase into a vise. That doesn\'t seem to be enough so she pulls out a cutting torch. The metal melts until it the vase opens and a gem falls out.');
		else addComments('<p>Hannah smiles. "I believe I may be of service, ' + myName + '." She says, a shiver of pleasure running down her spine as she leaps into action at your command.  Minutes and a cutting torch later, the vase finally breaks - letting loose the small gem inside.');
	}
	return true;
}

function HannahBikeRide(call)
{
	carRide("Hannah", (call === true ? "Hannah arrives shortly after your call and" : "Hannah") + " helps you put on the helmet and safety gear, and a few minutes later, your hot biker Girlfriend heads out to the street.</p><p>It&rsquo;s something that would be really awesome, would you not have to hold on to your dear life every time she sees an opportunity to show off or go full speed. Nevertheless, you always reach your goal safely and Hannah says goodbye with a deep, passionate kiss before storing the helmet and driving back to her " + (isShopOpen(0) ? "workshop." : "apartment."));
}

// Initialise

function initialiseHannah()
{
	// Hannah the Mechanic
	addPerson("Hannah", 279, "Hannah");
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		return this.isCharmedBy() ? "Slave Hannah" : "The Mechanic";
	};
	per.Replies = RepliesHannah;
	per.isPersonInfo = function() { return this.isCharmedBy(); };
	per.getPersonInfo = function() {
		return this.addPersonString("hannah3s.jpg", "height:max%", "right") +
			"Hannah, the biker girl is yours to use any and all ways possible! It wasn’t difficult to turn her to your side, you even went that far to let her keep this attitude of hers fully, thus she is still a rebel at heart. In contrast, she became so confidently loyal to you in a short period of time that she offered her chopper, her most precious thing to you use. She even pressed on becoming your personal driver who will take you anywhere on her bike (which now you own)! What is it if ain’t love at first sight between you and her?<br><br>" +
			"Hannah is dressed as in her usual attire when you open the garage door to visit her and her little shop. Though she  is quickly out of her clothes and waits on your next orders. She leans back on a bike she’s currently working on, so you can have a better view of her naked flesh.";
	};

	per.getPersonAddress = function() { return this.isCharmedBy() ? 'above the Mechanics Workshop, Glenvale Shopping Center' : ''; };


	per.whereNow = function() {
		if (this.place != 279) return this.place;
		if (isShopOpen(0)) return this.place;
		return 237;
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 457 && this.isHere() && !isPersonHere("Camryn") && sType === "") {
			return this.showPersonString("camrynsapartment.jpg");
		}
		return '';
	};

	per.isPlaceImageRight = function() {
		return ((Place == 168 || (Place == 457 && wherePerson("Camryn") == 457 && !isCharmedBy("Camryn"))) && this.isHere()) || (Place == 172 && this.place == 168);
	};

	per.showPlaceImageRight = function(md) {
		this.showPerson("hannah-pface.jpg", undefined, undefined, undefined, undefined, undefined, md);
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		// Meeting at Camryn's Apartment
		if (Place == 457 && !this.checkFlag(8)) {
			this.setFlag(8);
			showPopupWindow( "Hannah",
				this.addPersonString("camrynsapartment.jpg", "height:max%", "right") +
				'"Hannah almost drags you inside as you arrive on Camryn\'s floor and gives you a strong hug.</p>' +
				'<p>“Thank you for coming, I was really at my wits end and...“ She stops talking as she realizes she has been fondling your butt-cheeks and pulls herself away.</p>' +
				'<p>“Sorry, your presence makes it hard to concentrate on anything but sex, which is usually great but can become irritating, do you think we could...”</p>' +
				'<p>You tell Hannah to focus and explain what\'s wrong, and the order seems to actually help her do just that.</p>' +
				'<p>"Right, sorry. Short version: my sisters scumbag of a boyfriend has stolen my bike, and her. They have been gone for over a day, and I have no idea where they are."'
			);
			return true;
		}
		
		if (Place == 279 && !this.checkFlag(1)) {
			// Initial meeting at the Mechanics Shop
			this.setFlag(1);
			showPopupWindow( "Hannah the Mechanic",
				this.addPersonString("hannah0.jpg", "height:max%", "right") +
				"The workshop is owned by a charming brunette girl named Hannah. She is the striking example of a biker girl. Wild, badass and digs bikes.<br><br>" +
				"Just by looking at her you know you need to have her! The black biker gang jacket she’s almost wearing shows the strongest part of her body; her tits. She is way too cool to even wear a bra, or that what is she is thinking. She is busy fixing a bike and doesn’t notice you at first.<br><br>A badass biker chick " +
				(isSpellKnown("Charm") ? "sure won’t be an easy prey and the place is public also." : "is not usually your type but you could make an exception for her!")
			);
			return true;
		}
		
		if (Place != 237 && Place != 279) return false;		// Not at her place/shop
		if (!this.isHere()) return false;		// Not here

		if (!isMurderPath() && wherePerson("Camryn") == 457 && !this.checkFlag(17)) {
			this.setFlag(17);
			showPopupWindow( "Riding with Hannah",
				'“' + perYou.getPersonName() + '! I\'m glad you\'re here.” Hannah is in a very good mood as you enter the workshop and she quickly cleans some oil from her hands and takes off her jacket to greet you. “I have something for you, catch.” She throws you a motorcycle helmet.</p>' +
				'<p>“The Police returned my bike, Camryn\'s back  home safe as well, and it\'s all thanks to you.” She beams. ”So, I\'ve bought a set of safety gear for you and, as promised, will be your personal driver and take you wherever you want to go from now on. Well, almost.”</p>' +
				'<p>You are curious if she will let you drive, and she shakes her head.</p>' +
				'<p>“I know you never sat on one of these, and you can not mess with my head enough to make this seem like a good idea, ' + perYou.getMaster() + '.” She grins. “I\'ll happily give you driving lessons, but until you know what you are doing you\'ll have to settle for the bitch seat.”</p>' +
				'<p>“Bitch seat?” You tilt your head to the side and Hannah smiles innocently.</p>' +
				'<p>“I did not invent the terminology, ' + perYou.getMaster() + '. Now come on, try it on.”'
			);
			return true;
		}
		
		// Futa reaction
		if (!this.checkFlag(18) && perYou.isFuta(true) && !perYou.isBornMale()) {
			this.setFlag(18);
			showPopupWindow("Hannah and Your Changes",
				this.addPersonString("hannah7bb.jpg", "height:max%", "right") +
				'You decide to surprise Hannah, waiting for her knee before you and open your pants just to have your already half erect new cock literaly snap up into her face.</p>' +
				'<p>"Wow!" Hannah\'s head twitches back in surprise. "Is that a real..." She wastes absolutely no time to take your new manhood into her hands and stroke it. "This is a real cock!"</p>' +
				'<p>You ask her if she likes it, and she beams up to you.</p>' +
				'<p>"I love it!" Hannah kisses the tip affectionately. "I mean, I now like pussy, at least your pussy, too. But there is just... something great about getting pounded hard by a real, hard cock and I can\'t believe that you actually magicked one onto you!"</p>' +
				'<p>Hannah\'s eyes are full of devotion as she looks up to you.</p>' +
				'<p>"You are the best Mistress an involuntarily spellbound loveslave could hope for!"'
			);
			return true;
		}	

		return false;
	};

	per.showEvent = function()
	{
		var md, bMoniqueWaiting;

		// Return her to apartment/shop when you leave Camryn's place
		if (Place != 457 && this.place == 457) {
			if (wherePerson("Camryn") == 457) this.place = 279;
		}
		
		if (Place == 269 && sType == "hannahpool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("hannah-pool.jpg");
			addPlaceTitle(md, "Swimming with Hannah");
			md.write(
				'<p>Hannah arrives, dressed in a gold bikini, and she suggest you sit in the hot-tub to have a chat.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=hannahpoolsex');
			addLinkToPlaceC(md, 'say goodbye to Hannah', Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "hannahpoolsex") {
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson("hannah-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with Hannah");
			md.write(
				'<p>The hot-tub is quite private, so you suggest to Hannah they you can play in another way, and she seductively removes all of her swimsuit and leans against the side of the tub waiting for you to take her.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to Hannah', Place);
			WritePlaceFooter(md);
			return true;
		}


		if (Place == 237) {
			if (sType == "iwantyou") {
				// Repeat sex in the apartment general
				bMoniqueWaiting = wherePerson("Monique") == Place;
				md = WritePlaceHeader();
				this.showPerson("hannah12.jpg");

				addPlaceTitle(md, "I Want You");

				md.write(
					'<p>Hannah looks gorgeous, and you are not in the mood for long small-talk or even to waste time heading to her room, so you simply tell her to strip and bend over the stairs while you begin to undress yourself.</p>' +
					'<p>“Impatient again, ' + perYou.getMaster() + '?” Hannah grins and turns around while casually throwing her top away and removing her Pants. She is not wearing any underwear, which speeds things up, so you waste no time to drive your fingers over her already wet folds' + (!perYou.isMaleSex() ? ', attach your trusty strap on' : '') + ' and push into her waiting mound.</p>' +
					'<p>Hannah moans lewdly, pressing her cheek against the stairs and eagerly grinding her hip against your crotch. “Hrrrnnnyesss... Fuck me hard, ' + (perYou.isMaleSex() ? 'boy' : 'girl') + '!”</p>' +
					'<p>“What was that, slave?” You place a rough slap on Hannah\'s rear and take a hold of her hair. She purrs in delight.</p>' +
					'<p>“Sorry, ' + perYou.getMaster() + '! Please fuck your slave hard!” There is something undeniably mischievous in her voice. “Spank her more and show her her place!”</p>' +
					'<p>You chuckle softly at her non-attempt at acting, but it\'s okay to be played when you know you are... and when you are the one with the charm-spell to begin with, so you play her little game and place another slap on her rear. “Oh, I will.” You lean forward and whisper to your pet, telling her that she is yours to use as you please and better remember it while you take her with fast, firm strokes to sate both your own and her fantasy.</p>' +
					'<p>In the end, you both collapse exhausted after she reaches a powerful climax. You probably are going to feel the results of this workout in the morning, but it was worth it.</p>'
				);
				if (((nTime % 288 + 1) / 12) == 8) {
					md.write(
						'<p>“Monique had returned home at one point during your session, you noticed her almost shining red face as she climbed over the two of you and headed to her room, probably masturbating furiously after what she had witnessed.</p>'
					);
				} else if (bMoniqueWaiting) {
					md.write(
						'<p>“You think you\'ve seen Monique in the doorway at one point, sheepishly watching you and maybe even doing more, but apparently not having dared to ask to join in.”</p>'
					);
				}

				startQuestions();
				addLinkToPlace(md, "talk more to Hannah", 237);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "service") {
				// Threesome with Monique
				md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
				findPerson("Monique").showPerson(perYou.isMaleSex() ? "moniquehannah1.jpg" : "moniquehannah2.jpg");

				addPlaceTitle(md, "Servicing Your Ride");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>You lazily stretch out on Monique\'s bed and on your order, both women make a bit of a show undressing each other in front of it, and Hannah especially enjoys teasing the still slightly nervous Monique while removing her clothes, giving her breasts a squeeze from behind or pulling her slip between her folds before simply pushing her onto the bed next to you.</p>' +
						'<p>The three of you trade kisses, and it doesn\'t take the pair long until your manhood is standing firmly at attention and you order Monique to straddle your face, while Hannah is the first to ride your cock.</p>' +
						'<p>Both women eagerly follow their orders, getting into position to ride you and soon filling the room with lustful moans. Hannah wild and passionate, making sure to savor every little motion, while Monique moans cutely every time your tongue flick over her dripping folds and clit and as their lust increases, so seems their affection for each other, the two best friends turned slavesisters starting to kiss passionately and eagerly as their mutual climaxes build up, until they both, with a little help from you, reach their peak simultaneously.</p>'
					);
				} else {
					md.write(
						'<p>You announce that you need to take a shower and it seems by now you don\'t even need to issue any orders for the pair to line up and offer their assistance in whatever way you might need it.</p>' +
						'<p>Within a few moments, the two have you undressed, gotten rid of their own clothes, prepared the shower for you and are beaconing for you to join in.</p>' +
						'<p>You enjoy the attentions of the pair immensely, Monique is still rather reserved, but with Hannah around to push her a little, you get to see a wilder side you didn\'t expect the librarian to have in her as her lips and fingers explore your body.</p>' +
						'<p>Hannah, on her end, seems eager to experiment with her newfound love for “lesbian lovemaking” as she puts it, squeezing your breasts and teasing your sex with her tongue, fingers and the water stream from the shower alike. She may lack experience with women, but is a fast learner, quickly driving you to the first of what shall soon be several orgasms this evening.</p>'
					);
				}


				startQuestions();
				addLinkToPlace(md, "talk more to Hannah", 237);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 279 || Place == 237 || Place == 284) {
			if (sType == "sextf") {
				// Tit-fuck, shop/apartment/bedtroom
				var hs = (Place == 279) ? "shop" : "home";
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRandomRorX(hs + "-sex-tf", isExplicit() && Place != 279 ? 2 : 1);
				else this.showPerson(hs + "-sex-tfa.jpg");

				addPlaceTitle(md, "Parking Your Cock");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>You sit down '  + (Place == 279 ? 'on a toolbox' : 'on the bed') + ' and Hannah kneels before you and takes ot your cock and works your hardening member so you are fully aroused. She slides forward utill your cock is resting between her breasts. She looks up at you and keeps eye contact ask she firmly presses her ample breast together and rubs your cock with them.</p>' +
						'<p>You can tell she has done this before and she also seems to enjoy it as she works your cock. You eventually lose control and cum over her large tits! Hannah smiles and starts to lick the cum off her tits as best she can.</p>'
					);
				} else {
					md.write(
						'<p>You show Hannah your strap-on and you sit down '  + (Place == 279 ? 'on a toolbox' : 'on the bed') + '. Hannah seens amused at the idea of a tit-fuck with a strap-on. Never the less, she seems quite expert, though probably on the \'real thing\'.</p>'
					);
				}

				startQuestions();
				addLinkToPlace(md, "talk more to Hannah", Place);
				WritePlaceFooter(md);
				return true;
			}			
		}
		
		if (Place == 284 && sType == "catcharide") {
			// Sex in her room at the apartment
			md = WritePlaceHeader();
			if (isExplicit()) this.showPersonRandomX(perYou.isMaleSex() ? "hannah10b" : "hannah10g", 3);
			else this.showPerson(perYou.isMaleSex() ? "hannah10b.jpg" : "hannah10g.jpg");

			addPlaceTitle(md, "Catch A Ride With Hannah");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>You pull Hannah into your lap and she immediately kisses you deeply, her naked body rubbing against your own and wasting no time taking off whatever clothes you may still be wearing, even without being ordered to do so.</p>' +
					'<p>“You have no idea how much I want you to fuck me, master...” She breathes out in a haughty whisper, her body trembling in anticipation. “Still not sure how you did it... but you are the best ride I ever had.”</p>' +
					'<p>You jokingly tell your pet that you are just a natural before you order her to turn and straddle your lap, and after she complied, pull her closer against your chest and rub the tip of your manhood against her folds.</p>' +
					'<p>“Hmmmm... yes... just like this....” Hannah gasps and eagerly pushes her body down to impale herself on your cock, rolling her hip forward a few times and quickly picking up the pace.</p>' +
					'<p>You give her breasts a good squeeze, trailing your fingers over her bare skin and finally wrap your arms firmly around her body to pull her close, one hand gently on her neck, the other resting on her clit to stimulate her further, luring a loud groan of pleasure from her lips.</p>' +
					'<p>It doesn\'t take long for her to reach her peak that way, and she almost screams out her lust into the room as it finally happens, collapsing happily in your lap and turning her head just enough to give you a gentle kiss.</p>'
				);
			} else {
				md.write(
					'<p>You are not even fully seated yet as Hannah just grabs you, presses your back against the couch and comes to rest on top of you, muffling any form of potential protest with a deep, passionate kiss.</p>' +
					'<p>“Wow...” You have to take a breather when she finally withdraws and begins to nibble on your neck and shoulder. “So eager, my pet?”</p>' +
					'<p>“I can\'t help myself, oh my mistress.” Hannah answers with a grin while she takes your top off and her fingers begin to trail around your nipples. “You are like a.... grand Buffet of treats I never even dreamed of trying without knowing how good they taste.”</p>' +
					'<p>“Well,” You laugh. ”Feel free to indulge."</p>' +
					'<p>“Yes Mistress!”</p>' +
					'<p>She playfully massages your breasts, occasionally flicking her tongue over your nipples and teasingly biting you before slowly making her way down, placing a kiss above your bellybutton and  taking off the rest of your clothes and underwear before drawing her tongue all the way over your folds and flicking over your clit.</p>' +
					'<p>You give her an approving moan and grab her hair to roughly push her face against your mound briefly, but pull her toward you before she is able to continue.</p>' +
					'<p>“We do this all the time in the workshop, here I want something else.” You spin her around and rest on top of her body, giving her hair another pull to make her expose her neck to your lips as you begin to grind your clit and pussy against hers.</p>' +
					'<p>Hannah seems confused at first, then curious, and finally enthusiastic as she realizes what you are doing. Soft moans escape her lips while your body rocks back and forth, your fingers caressing her skin and your lips covering her body with kisses until she begins to tremble below you, stretching out her arms and allowing you to fully take charge and drive her to her climax.</p>' +
					'<p>“That was new...” She whispers as you come to rest on top of her.</p>' +
					'<p>“You like it?”</p>' +
					'<p>“I loved it! It\'s great to have someone press their tits against mine while they fuck me, Mistress.” She grins to you and presses a kiss to your lips.</p>'
				);
			}

			startQuestions();
			addLinkToPlace(md, "talk more to Hannah", 284);
			addLinkToPlace(md, "leave Hannah\'s room", 237);
			addLinkToPlace(md, "leave the apartment", 194);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 161) {
			var perJessica = findPerson("Jessica");
			if (sType == "cutting") {
				// Hannah to cut the chains
				md = WritePlaceHeader();
				this.showPerson(this.isCharmedBy() ? "hannah8b.jpg" : "hannah8a.jpg");
				addPlaceTitle(md, "Hannah freeing Jessica");

				md.write('<p>Hannah packs some tools and a cutting torch and loads then into a small pickup truck. She regretfully mentions being unable to fit them on her Harley.</p>');

				if (this.isCharmedBy()) {
					md.write(
						'<p>A short drive and you arrive at the Hotel. Hannah notices a truck and says it belongs to a friend of hers and asks if she can visit her friend after the job. You see no reason to refuse and give your slave permission.</p>' +
						'<p>You lead her into the cellar, and Hannah looks at you with a smile when she sees Jessica, "So more a rigging failure then, or is she a slave of yours?". She checks over the chains and binding of Jessica. and tells you,</p>' +
						'<p>"How did this happen? There are no joins in the cuffs or the gag. I do not see how you could have got these on her ' + perYou.getMaster() + ', but I do hear the barmaid upstairs is quite experienced with this sort of thing.<br><br>' +
						'Ok, I can cut the chains and cuffs and remove the gag no problems just a few quick cuts. I can also loosen then a little so they can be removed so your slave here will be more accessible. That will be a little harder."'
					);
				} else {
					md.write(
						'<p>A short drive and you arrive at the Hotel. Hannah notices a truck and says it belongs to a friend of hers and that she plans to look them up after the job.</p>' +
						'<p>You lead her into the cellar, and Hannah looks at you with a smile when she sees Jessica, "So more a rigging failure then". She checks over the chains and binding of Jessica. and tells you,</p>' +
						'<p>"How did this happen? There are no joins in the cuffs or the gag. I do not see how you could have got these on her....Well it is none of my business, but I do hear the barmaid upstairs is quite experienced with this sort of thing. Not my thing!<br><br>' +
						'Ok, I can cut the chains and cuffs and remove the gag no problems just a few quick cuts, costing ' + sCurrency + '10. I can also loosen then a little so they can be removed, and reapplied later for more games. That will be a little harder, and cost ' + sCurrency + '50."'
					);
					if (nMoney < 10) md.write('<p>Unfortunately you do not have enough money for either of these choices.</p>');
				}
				md.write(
					'<p>Jessica would be a strong ally if let free. She\'s a true witch, even with some of her power drained, a good source of information who has already pledged herself to you and, most importantly, will probably be very thankful.</p>' +
					'<p>However...  promise or not, she would not be under your control, and you remember what Kurndorf said about those shackles suppressing her magic power. It\'s obviously not enough to allow you to charm her, but if you tell Hannah to just cut the chains and keep the wrist-cuffs on, it would be easy to keep her locked up in the hotel cellar and, some dark part within you ponders, maybe even have some fun with her, make her your personal little witch-toy...</p>'
				);
				startQuestions();

				if (this.isCharmedBy()) {
					addLinkToPlace(md, 'fully remove the bindings to release Jessica', 161, 'type=cut2');
					addLinkToPlaceO(md, 'cut the chains, but keep the cuffs, collar and gag in place', 161, 'type=cut1');
				} else if (nMoney >= 10) {
					addLinkToPlace(md, 'fully remove the bindings to release Jessica', 161, 'type=cut2');
					if (nMoney >= 50) addLinkToPlace(md, 'cut the chains, but keep the cuffs, collar and gag in place', 161, 'type=cut1');
					else addTextForQuestions(md, 'You do not have enough money to loosen the chains', "center");
				}
				addLinkToPlaceC(md, '"Not now Hannah"', 124, '', 'Hannah tells you she will return to her workshop after a quick drink with her friend');

				AddPeopleColumnMed();
				perJessica.showPersonRandom("jessica2c", 6, "100%", "", "", "Bound Witch");

				WritePlaceFooter(md);
				return true;

			} else if (sType == "cut1" || sType == "cut2") {
				var bWitchSlave = false;
				md = WritePlaceHeader();
				if (sType == "cut1") {
					// Witch-toy
					bWitchSlave = true;
					if (!this.isCharmedBy()) AddCash(-50);
					perJessica.setRivalry(-1);
					this.showPerson(this.isCharmedBy() ? "hannah8b.jpg" : "hannah8a.jpg");
					addPlaceTitle(md, "Enslaving Jessica");

					if (this.isCharmedBy()) {
						md.write(
							'<p>Jessica\'s eyes widen when you give the order, but aside from a few angry grunts and muffled protests there is nothing she can do to stop you, and Hannah isn\'t deterred either.</p>' +
							'<p>“You will love being ' + perYou.getMaster() + '\'s, slave.” She says while she cuts, trims and adjusts the bindings, adding a smaller, removable chain to lock Jessica\'s arms behind her back, but otherwise making sure she could be tied into any position you desire. “At the latest when he does his magic trick on your mind.”</p>' +
							'<p>Jessica emits a contemptuous grunt, knowing full well that you can\'t charm her, yet, but that, too, won\'t change her position, and soon, Hannah happily presents her to you.</p>' +
							'<p>“All done. You can play with her as much as you like, now.”</p>' +
							'<p>Hannah leaves with your permission to seek out her friend for a drink, and you are left alone with Jessica, who just... stares at you with a myriad of emotions on her face.</p>' +
							'<p>Anger, betrayal, pain... all obvious reactions to be expected, but even with the gag denying her the ability to speak, the most prominent thing she wants to know is obvious:</p>' +
							'<p>“Why?”</p>'
						);
					} else {
						md.write(
							'<p>You ask Hannah to loosen the binding of Jessica so they can be removed without cutting, but to leave them on Jessica. Hannah looks at you curiously and then asks Jessica if this is alright. Jessica is still gagged so cannot directly answer but vigorously shaked her head. Hannah looks at you sternly,</p>' +
							'<p>"There are games, and then there are things that are too serious for me. Look I\'ll do it, but I\'ll tell Bambi the barmaid to check in and if things are not good and consensual she will call the police, right!"</p>' +
							'<p>Yet with this she cuts, trims and adjusts the bindings and looks at you and Jessica, "That is it, I want nothing more of this, I am out of here!"</p>' +
							'<p>Hannah leaves with your permission to seek out her friend for a drink, and you are left alone with Jessica, who just... stares at you with a myriad of emotions on her face.</p>' +
							'<p>Anger, betrayal, pain... all obvious reactions to be expected, but even with the gag denying her the ability to speak, the most prominent thing she wants to know is obvious:</p>' +
							'<p>“Why?”</p>'
						);
					}
					startQuestionsOnly();
					addLinkToPlace(md, 'because you can\'t trust her', Place, 'type=cut2answer1');
					addLinkToPlace(md, 'because she\'s more useful as a slave than an ally', Place, 'type=cut2answer2');
					addLinkToPlace(md, 'because you can', Place, 'type=cut2answer3');
					addLinkToPlace(md, 'you don\'t have to explain yourself to her', Place, 'type=cut2answer4');

					AddPeopleColumnLarge();
					if (perJessica.isHere() || sType == "cut2") {
						if (bWitchSlave) perJessica.showPersonRandom("jessica3", 2, "100%", "", "", "Witch-Toy");
						else if (sType == "cut2") perJessica.showPerson("jessica2d.jpg", "100%", "", "", "Freed Witch");
						else perJessica.showPersonRandom("jessica2c", 6, "100%", "", "", "Bound Witch");
					}

					WritePlaceFooter(md);
					return true;

				} else if (sType == "cut2") {
					// Free Jessica
					perJessica.setRivalry(3);
					perJessica.place = 183;
					if (!this.isCharmedBy()) AddCash(-10);
					this.showPerson(this.isCharmedBy() ? "hannah8b.jpg" : "hannah8a.jpg");
					addPlaceTitle(md, "Jessica Freed");
					var myLord = perJessica.getYourNameFor();

					if (this.isCharmedBy()) {
						md.write(
							'<p>You order Hannah to completely free Jessica. It is a very quick process and less than 5 minutes later, Jessica is completely free of her bindings. While Hannah is cutting you quickly borrow from the barmaid some clothing for Jessica</p>' +
							'<p>Hannah packs to leave as Jessica dressed and tells you "Pease return to me ' + perYou.getMaster() + '" and leaves.</p>' +
							'<p>Jessica says, "Thank you ' + myLord + ' I am grateful you freed me, those bindings completely blocked all my abilities, I was completely powerless. ' + myLord + ' I see that woman is one of your servants, so she is no danger to us. I need to find a place of safety as well, but there is something else I need to do first. I shall meet you upstairs, ' + myLord + '"</p>' +
							'<p>You can see she wants to get out of here as soon as she can and almost runs out of the cellar.</p>'
						);
					} else {
						md.write(
							'<p>You ask Hannah to completely free Jessica. It is a very quick process and less than 5 minutes later, Jessica is completely free of her bindings. While Hannah is cutting you quickly borrow from the barmaid some clothing for Jessica</p>' +
							'<p>Hannah packs to leave as Jessica dressed and tells you "Take care with your games in future" and leaves.</p>' +
							'<p>Jessica says, "Thank you ' + myLord + ' I am grateful you freed me, those bindings completely blocked all my abilities, I was completely powerless. ' + myLord + ' did you intend to do anything about the woman just here, she knows about me and may spread rumours? I need to find a place of safety as well, but there is something else I need to do first. I shall meet you upstairs, ' + myLord + '"</p>' +
							'<p>You can see she wants to get out of here as soon as she can and almost runs out of the cellar. You can still just see Hannah and could attempt a spell if you wanted.</p>'
						);
					}	
					startQuestions();
					addLinkToPlace(md, 'look around the cellar more', 161);
					addLinkToPlace(md, 'go back up to the hotel bar', 124);

					AddPeopleColumnLarge();
					if (perJessica.isHere() || sType == "cut2") {
						if (bWitchSlave) perJessica.showPersonRandom("jessica3", 2, "100%", "", "", "Witch-Toy");
						else if (sType == "cut2") perJessica.showPerson("jessica2d.jpg", "100%", "", "", "Freed Witch");
						else perJessica.showPersonRandom("jessica2c", 6, "100%", "", "", "Bound Witch");
					}

					WritePlaceFooter(md);
					return true;
				}
			}
		}

		if (Place != 279 && Place != 161) return false;

		if (sType == "charmhannah1") {
			// Charm stage 1 (initial casting of the spell)
			bMoniqueWaiting = wherePerson("Monique") == Place;
			md = WritePlaceHeader();
			this.showPerson(Place == 161 ? "hannah2c.jpg" : "hannah2s.jpg");
			addPlaceTitle(md, "Hannah Under a Charm Spell");

			if (Place == 161) {
				md.write(
					'<p>You catch up with Hannah outside in the parking lot near some trucks, and fortunately the vehicles are empty and block the view of the Hotel, creating a private place for now. You recite the spell and watch her.</p>' +
					'<p>Hannah stops in her tracks as you begin to guide the strains of mana into her body, and after a few seconds of trying to adjust to the new sensations flooding her, she spots you, her cheeks flushing with a deep red.</p>' +
					'<p>"What is... you just did something... did you?"</p>' +
					'<p>You smile as her eyes focus on you and you recognize the familiar pink sheen starting to form. Her breathing slowly increases in pace as the spell begins to work through her body, leaving her barely able to stop her hands from pushing up her shirt.</p>'
				);
			} else if (bMoniqueWaiting) {
				md.write(
					'<p>“This spell is weird, ' + perYou.getMaster() + '...” Monique muses as while she examines the runes on the stone.” It supposedly is called “Neo One” which most likely means “shielded”, but it feels like the base of pretty much everything it builds up on is missing...”</p>' +
					'<p>“Maybe it builds up on... another spell?” You ask, and after a second of thinking, Monique\'s eyes brighten up.</p>' +
					'<p>“Of course! You are a genius, ' + perYou.getMaster() + '.” Monique flips a few pages in the book, makes a few notes, and finally explains to you. “This is not a spell itself, but an addition to the Dai Chu, to create a zone around the target that will make everyone around loose interest in what is happening to it during the charm!”</p>' +
					'<p>Monique seems exited and you can tell why, with a spell like this, you could charm people in public spaces, and it seems easy enough for someone who has as much practice with the basic charm as you to cast.</p>' +
					'<p>You look outside to the people passing by the workshop... and then to Monique\'s friend, who is completely focused on her bike. A wicked smile forms on your lips as you begin to focus your mana and cast the new incantation, directing it towards the pretty mechanic.</p>'
				);
			} else {
				md.write(
					'<p>"A Daitchu? You might want to elaborate on that.... re....quest..."</p>' +
					'<p>Hannah\'s voice trails off as you begin to guide the strains of mana into her body, and after a few seconds of trying to adjust to the new sensations flooding her, her cheeks flush with a deep red.</p>' +
					'<p>"What is... you just did something... did you?"</p>' +
					'<p>You smile as her eyes focus on you and you recognize the familiar pink sheen starting to form. Her breathing slowly increases in pace as the spell begins to work through her body and her fingers begin to subconsciously play with her jackets zipper.</p>'
				);
			}

			startQuestions();
			addLinkToPlaceC(md, Place == 161 ? "tell her to continue" : bMoniqueWaiting ? "watch what happens" : "tell her to pull down the zipper", Place, 'type=charmhannah2');
			WritePlaceFooter(md);
			return true;

		} else if (sType == "charmhannah2") {
			// Charm 2
			bMoniqueWaiting = wherePerson("Monique") == Place;
			md = WritePlaceHeader();
			this.showPerson(Place == 161 ? "hannah3c.jpg" : "hannah3s.jpg");
			addPlaceTitle(md, "Hannah Under a Charm Spell");
			if (Place == 161) {
				md.write(
					'<p>She looks down in amazement as she finds herself following your order without hesitation, quickly taking off her shirt and throwing it to the side.</p>' +
					'<p>“How are you... doing.... ohhhh...</p>' +
					'<p>You watch in delight as her body is taken by another wave of blissful pleasure, her head rolling back with a long, drawn out moan while she squeezes her breasts and begins to caress her upper body.</p>' +
					'<p>“So... fucking... horny...” She breathes the words out and glares at you intently, her hands starting to push down her Jeans while she moves to give you a good view of her backside.</p>' +
					'<p>“I... I suddenly want to drag you back into Bambi\'s Cellar and just ravage you... wait...” The glow in her eyes briefly flares up as another lustful shudder washes through her. “I want you to drag me back into that cellar and ravage me...” her eyes widen as the realization sets in.</p>' +
					'<p>“You are trying to turn me into some sort of sexslave!”</p>'
				);
			} else if (bMoniqueWaiting) {
				md.write(
					'<p>Hannah gasps softly and looks around for a moment, her head rolling to the side as she catches you and Monique looking at her. She doesn\'t seem to notice her fingers moving to her Jackets zipper.</p>' +
					'<p>“Oh, you are testing it on Hannah!” Monique exclaims giddily, and quickly covers her lips, watching in fascination as the Mechanics eyes begin to show the first traces of the familiar pink glow.</p>' +
					'<p>“Testing what, Monique?” Hannah pulls down the zipper of her Jacket and it does not look like she even realizes it, though her body language clearly shows her rising arousal.</p>' +
					'<p>“Oh, you\'ll see! It\'ll feel amazing.” Monique quickly moves behind you and takes a submissive kneeling position, her cheeks slightly flushed, and she bites her lower lip as Hannah\'s  body is taken by a wave of blissful pleasure, the mechanics head rolling back with a long, drawn out moan as she squeezes her breasts and begins to caress her upper body.</p>' +
					'<p>“Why... am I so... fucking... horny...” Hannah breathes the words out and glares at you intently, her hands starting to open her Jeans before twitching to the side and clinging to the seat of her bike. “What have you two done to me?”</p>' +
					'<p>“What do you think I did to you, Hannah?” You possessively drive a hand through Monique\'s hair and caress her cheek.</p>' +
					'<p>“I...” Hannah looks stunned. “I think I suddenly want to throw you to the floor and just ravage you... no, wait...” The glow in her eyes briefly flares up as another lustful shudder washes through her. “I want you to throw me to the floor and ravage me...” her eyes focus on the kneeling Monique and widen as the realization sets in.</p>' +
					'<p>“You have turned Monique into some sort of sexslave and now you\'re trying the same with me!”</p>'
				);

			} else {
				md.write(
					'<p>She looks down in amazement as she finds herself following your order without hesitation, the sides of her jacket falling back to reveal her bare breasts underneath.</p>' +
					'<p>“How are you... doing.... ohhhh...</p>' +
					'<p>You watch in delight as her body is taken by another wave of blissful pleasure, her head rolling back with a long, drawn out moan while she squeezes her breasts and begins to caress her upper body.</p>' +
					'<p>“So... fucking... horny...” She breathes the words out and glares at you intently, her hands starting to open her Jeans before twitching to the side and clinging to the seat of her bike.</p>' +
					'<p>“I... I suddenly want to throw you to the floor and just ravage you... no, wait...” The glow in her eyes briefly flares up as another lustful shudder washes through her. “I want you to throw me to the floor and ravage me...” her eyes widen as the realization sets in.</p>' +
					'<p>“You are trying to turn me into some sort of sexslave!”</p>'
				);
			}
			startQuestions();
			addLinkToPlaceC(md, 'confirm her theory', Place, 'type=charmhannah3');
			WritePlaceFooter(md);
			return true;

		}  else if (sType == "charmhannah3") {
			// Charm 3
			bMoniqueWaiting = wherePerson("Monique") == Place;
			md = WritePlaceHeader();
			this.showPerson(Place == 161 ? "hannah4c.jpg" : "hannah4s.jpg");

			addPlaceTitle(md, "Hannah Under A Charm Spell");

			if (Place == 161) {
				md.write(
					'<p>“I\'m not “trying”, Hannah.” She shudders as you speak her name to reinforce the spells hold. “Take off your pants.”</p>' +
					'<p>You expect her to struggle against the spell after you confirm her suspicions, but if any, it only seems to make her calm down a little and regard you with a curious gaze while she follows your order and pulls down her pants with a slow, sensual motion.</p>' +
					'<p>“Your slave...” She speaks the words as if tasting them on her lips and faces you.</p>' +
					'<p>“Sounds fun, let\'s do this.”</p>'
				);
			} else if (bMoniqueWaiting) {
				md.write(
					'<p>“I\'m not “trying”, Hannah.” She shudders as you speak her name to reinforce the spells hold. “Monique, help her take off her pants.”</p>' +
					'<p>You expect her to struggle against the spell after you confirm her suspicions, but if any, it only seems to make her calm down a little and regard Monique with a curious gaze as the librarian obediently pushes her back onto her bike and pulls down her pants.”</p>' +
					'<p>“' + (perYou.isBornMale() ? 'His' : 'Her') + ' slave... huh?” She speaks the words as if tasting them on her lips and rises to her feet, her last remains of willpower still struggling against your influence. “Kinky bitch...”</p>' +
					'<p>“Yessss...” Monique coos happily to Hannah, who now focuses on you.</p>' +
					'<p>“Alright, sounds fun, let\'s do this.”</p>'
				);
			} else {
				md.write(
					'<p>“I\'m not “trying”, Hannah.” She shudders as you speak her name to reinforce the spells hold. “Take off your pants.”</p>' +
					'<p>You expect her to struggle against the spell after you confirm her suspicions, but if any, it only seems to make her calm down a little and regard you with a curious gaze while she follows your order and pulls down her pants with a slow, sensual motion.</p>' +
					'<p>“Your slave...” She speaks the words as if tasting them on her lips and rises to her feet.</p>' +
					'<p>“Sounds fun, let\'s do this.”</p>'
				);

			}

			startQuestions();
			addLinkToPlaceC(md, '"Just like that?"', Place, 'type=charmhannah4');
			WritePlaceFooter(md);
			return true;

		} else if (sType == "charmhannah4") {
			// Charm 4 (end)
			bMoniqueWaiting = wherePerson("Monique") == Place;
			this.setFlag(2);
			md = WritePlaceHeader();
			this.showPerson(Place == 161 ? "hannah5c.jpg" : "hannah5s.jpg");

			addPlaceTitle(md, "Hannah Under A Charm Spell");

			if (Place == 161) {
				md.write(
					'<p>Well, it was not like you had intended for her to have a particular say in the matter, but her instant submission does come as a surprise to you, and Hannah seems to gain no small amount of pleasure out of having derailed you a little.</p>'
				);
				if (perYou.isMaleSex()) md.write('“Whatever you did is making me horny as hell and I\'m suddenly unable to think about anything but how you might pin me against my bike and fuck me as roughly as you can. If you can do that by waving your fingers, I want to see what you can do with your cock."');
				else md.write('“I have no idea what you did to me, but I\'ve never been into girls and now believe you are the hottest bitch to ever come in here and unable to think of anything but how you might grab my hair and shove my lips against your pussy, and it\'s frankly driving me nuts.”');
				md.write(
					'</p><p>She leans against one of the trucks and looks over her shoulder with a hungry gaze.</p>' +
					'<p>“So... “ She goes on, her voice sultry, dripping with sex and need as the magic claims her mind fully.” If you want a servant: Here I am. Claim me, fuck me, make me yours for as long as you like. I\'ll be whatever you need me to be... ' + perYou.getMaster() + '.”</p>' +
					'<p>She chuckles softly as the last word rolls of her lips, her eyes daring you to come closer, as does the way she teasingly wiggles her ass into your direction.</p>' +
					'<p>As you, however, follow up on her invitation, you feel a weird shiver running down your back.</p>' +
					'<p>You turn around and check the parking lot and driver seats again, but there is definitely no one around...</p>' +
					'<p>...and yet, you feel like someone is watching you...</p>' +
					'<p>Perhaps using magic this much is starting to draw attention to you, but before you are able to follow up on that feeling, you find that Hannah has apparently lost her patience and decided to just approach you herself.</p>' +
					'<p>She turns you around to face her, roughly presses you against one of the trucks and gives you a deep kiss, passionate enough to make you forget your worries and think about what is to come once you have her for yourself in private instead.</p>' +
					'<p>You tell her to head back to the workshop and await your visit and she eagerly obeys, promising to always be prepared to “Check your fluids” and “Give your chassis a proper stress-test”.</p>' +
					'<p>As she drives off, the feeling of being watched is gone... and yet, you can\'t quite shake off the memory.</p>'
				);
			} else if (bMoniqueWaiting) {
				md.write(
					'<p>Well, it was not like you had intended for her to have a particular say in the matter, but her instant submission, even with Monique nearby, does come as a surprise to you, and Hannah seems to get no small amount of pleasure out of having derailed you a little.</p>'
				);
				if (perYou.isMaleSex()) md.write('“Boy, you\'ve turned one of the most nervous girls I know into your slut and whatever you did to us is making me horny as hell. I\'m suddenly unable to think about anything but how you might pin me against my bike and fuck me as roughly as you can. If you can do that by waving your fingers, I want to see what you can do with your cock."');
				else md.write('“Girl, you\'ve turned one of the most nervous girls I know into your slut and while I have no idea what you did to us, I\'ve never been into girls and yet believe now that you are the hottest bitch to ever come in here. I\'m unable to think of anything but how you might grab my hair and shove my lips against your pussy, and it\'s frankly driving me nuts.”');
				md.write(
					'</p><p>She rolls back her shoulders to let the leather Jacket fall down, taking a step forward and focusing on you with a hungry gaze.</p>' +
					'<p>“So... “ She goes on, her voice sultry, dripping with sex and need as the magic claims her mind fully.” If you want a servant: Here I am. Claim me, fuck me, make me yours for as long as you like. I\'ll be whatever you need me to be... ' + perYou.getMaster() + '.”</p>' +
					'<p>She chuckles softly as the last word rolls of her lips, her eyes daring you to come closer while she pushes her hip to the side and slips both thumbs into her panties.</p>' +
					'<p>As you, however, follow up on her invitation, you feel a weird shiver running down your back.</p>' +
					'<p>You turn around and the only people you see are customers passing by the workshop, completely oblivious to what is happening inside thanks to the shield.</p>' +
					'<p>...and yet, you feel like someone is watching you...</p>' +
					'<p>Perhaps using magic this much is starting to draw attention to you, but before you are able to follow up on that feeling, you find that Hannah has apparently lost her patience and decided to just approach you herself.</p>' +
					'<p>She turns you around to face her and gives you a deep kiss, before almost dragging you and Monique to the back of the workshop, suggesting that the three of you commemorate her entry into your Harem properly.</p>'
				);
			} else {
				md.write(
					'<p>Well, it was not like you had intended for her to have a particular say in the matter, but her instant submission does come as a surprise to you, and Hannah seems to get no small amount of pleasure out of having derailed you a little.</p><p>'
				);
				if (perYou.isMaleSex()) md.write('“Whatever you did is making me horny as hell and I\'m suddenly unable to think about anything but how you might pin me against my bike and fuck me as roughly as you can. If you can do that by waving your fingers, I want to see what you can do with your cock.');
				else md.write('“I have no idea what you did to me, but I\'ve never been into girls and now believe you are the hottest bitch to ever come in here and unable to think of anything but how you might grab my hair and shove my lips against your pussy, and it\'s frankly driving me nuts.”');
				md.write(
					'</p><p>She rolls back her shoulders to let the leather Jacket fall down, taking a step forward and focusing on you with a hungry gaze.</p>' +
					'<p>“So... “ She goes on, her voice sultry, dripping with sex and need as the magic claims her mind fully.” If you want a servant: Here I am. Claim me, fuck me, make me yours for as long as you like. I\'ll be whatever you need me to be... ' + perYou.getMaster() + '.”</p>' +
					'<p>She chuckles softly as the last word rolls of her lips, her eyes daring you to come closer while she pushes her hip to the side and slips both thumbs into her panties.</p>' +
					'<p>As you, however, follow up on her invitation, you feel a weird shiver running down your back.</p>' +
					'<p>You turn around and the only people you see are customers passing by the workshop, completely oblivious to what is happening inside thanks to the shield.</p>' +
					'<p>...and yet, you feel like someone is watching you...</p>' +
					'<p>Perhaps using magic this much is starting to draw attention to you, but before you are able to follow up on that feeling, you find that Hannah has apparently lost her patience and decided to just approach you herself.</p>' +
					'<p>She turns you around to face her and gives you a deep kiss, before almost dragging you to the back of the workshop.</p>' +
					'<p>The two of you properly commemorate her entry into your Harem, and you soon forget about the strange feeling you had, but you can\'t quite shake of the memory afterwards.</p>'
				);
			}

			startQuestions();
			if (Place == 161) addLinkToPlace(md, "check the cellar", 161);
			else {
				addLinkToPlaceC(md, "talk to Hannah some more", 279);
				addLinkToPlace(md, "exit the workshop", 194);
			}
			WritePlaceFooter(md);
			return true;

		} else if (sType == "hannahcheck") {
			// Oral sex in the garage
			bMoniqueWaiting = wherePerson("Monique") == Place;
			md = WritePlaceHeader(false, isExplicit() && !perYou.isMaleSex() ? "td-left-large" : "");
			this.showPersonRorX(perYou.isMaleSex() ? isExplicit() ? "hannah7bb.jpg" : "hannah7b.jpg" : "hannah7g.jpg");
			addPlaceTitle(md, "Hannah\s Checkup");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>“Right away, Master, I do pride myself in speedy service and quality work.”</p>' +
					'<p>Hannah speaks with a wide grin as she moves behind you and presses both hands into your back.</p>' +
					'<p>“I will need to perform a thorough check of your equipment, of course” She explains as she pushes you towards a more secluded area of the workshop and knees down in front of you. “I trust your other girls have been keeping the injector in good shape?”</p>' +
					'<p>Hannah manages to keep up both her “talking to a customer” voice and a straight face, all while opening your pants and getting ready to pull down your underwear, so you do your best to follow up, explaining to her that the “injector” has seen a lot of use and might require some effort to get a good sample from.</p>' +
					'<p>“Promises, promises...” Hannah purrs playfully while she pulls your underwear down, her eyes almost mesmerized as they hungrily focus on your manhood.</p>' +
					'<p>It seems to take her some willpower to get back “into character”, the pink glow flaring up briefly.</p>' +
					'<p>“Well, a good cleaning will be needed master,” She licks her upper lip for emphasis. “Could you please hold my hair so it is out of the way?”</p>' +
					'<p>“Like this?” You collect her hair in your fist.</p>' +
					'<p>“Hmmm... harder, please.” She replies with a pleasant hum and begins to work on your growing erection, looking up to you mischievously while her tongue flicks over the tip and her fingers caress your shaft.</p>' +
					'<p>You chuckle softly and comply, roughly grabbing her hair and even pushing her face against your crotch. Hannah gives you a delightful purr and  she moves both hands behind her back, rolling her head to wrap her lips around your cock and, to your surprise, proceeding to take it in all the way to the base.</p>' +
					'<p>She stays like that for a few seconds and takes a long breather as she moves back, her tongue pressed against the underside of your tip and her eyes a little dazed as she looks up to you with a clear challenge in them, and you gladly follow up on it.</p>' +
					'<p>You tighten the hold on your servants hair and she moans in delight as you press her head against your crotch again, pushing your cock into her mouth and guiding her head up and down, using her lips, throat and tongue to satisfy your desires, and, if her approving moans are any indication, her own.</p>' +
					'<p>When you finally reach your peak, she eagerly takes in every drop, commenting playfully how your fluids are all in good condition, though pointing out that you should definitely come by for regular checkups.</p>' +
					'<p>You agree.</p>'
				);
			} else {
				md.write(
					'<p>“Right away, Mistress, I do pride myself in speedy service and quality work.”</p>' +
					'<p>Hannah speaks with a wide grin as she moves behind you and presses both hands into your back.</p>' +
					'<p>“I\'m not entirely familiar handling this type of chassis, but I have watched many educational instruction videos since you made me your dykeslave.</p>' +
					'<p>“So, you have been watching lesbian porn?”</p>' +
					'<p>“Educational. Instruction. Videos!” She emphases every word. “This is my version of the story, and I will stick to it, Mistress.”</p>' +
					'<p>Hannah pushes you towards a more secluded area of the workshop and eagerly begins to undress you. “Besides, I have a pussy myself and I know how to play with it.” She gives you a playful wink and slips onto her knees to take a teasing lick along your folds.</p>' +
					'<p>You rest on a workbench and place one leg on your slaves shoulder with a wry smirk, and while it\'s true that Hannah has little experience when it comes to being with another woman, she is still very eager and submits to your guidance quickly.</p>' +
					'<p>You grab her hair and pull her closer against your folds, guiding her to lick your clit and encouraging her to use her fingers more, and with a little help, she quickly brings you to orgasm.</p>' +
					'<p>“You\'re a fast learner, my pet.” You say as you caress her hair. “Though we will need to practice more.”</p>' +
					'<p>“As you wish, my Mistress.” She places a soft kiss to your clit and pulls back with a grin. “No one should say I\'m not dedicated to good customer service.”</p>'
				);
			}
			startQuestions();
			addLinkToPlaceC(md, "talk to Hannah some more", 279);
			WritePlaceFooter(md);
			return true;

		}
		if (sType == "service") {
			// Threesome with Monique
			md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
			findPerson("Monique").showPerson(perYou.isMaleSex() ? "moniquehannah1.jpg" : "moniquehannah2.jpg");

			addPlaceTitle(md, "Servicing Your Ride");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Hannah seems willing to pounce on you here and now, not really caring for and maybe even enjoying the possibility of being caught, but in the End, Monique convinces her that it is better to head back into the apartment.</p>' +
					'<p>“You\'re right, a ride like this deserves our full attention.” Hannah leads you up some stairs into a small apartment and wastes little time ushering you into one of the bedrooms.</p>' +
					'<p>“Soo, miss nervous bookworm.” Hannah folds her arms underneath her ample bust and focuses on Monique. “It seems you have been able to gather extensive experience with this particular Model, any tips for the newly enslaved?”</p>' +
					'<p>Monique blushes heavily, and it takes her a moment to respond. “I\'m... pretty sure this is not so different to your usual visitors.”</p>' +
					'<p>“It is.” Hannah laughs and motions for you to head to the bed. “He is the first to ask me for a threesome with you and actually get it.”</p>' +
					'<p>“Monique bites her lower lip and Hannah seems to enjoy having the last word in their little banter, celebrating her victory by pushing you on the bed and opening your belt. “Well, let\'s see what you\'ve been withholding from me.”</p>' +
					'<p>Hannah finally takes off your pants while Monique moves behind you to help you with your top and pushes your body down against the bed, leaning forward to give your Shaft a good lick, and both women eagerly squeeze it between their lips and tongues.</p>' +
					'<p>“Wait!” Hannah suddenly interrupts. “I want to ride that dick before we make him cum.”</p>' +
					'<p>There is a brief moment of silence until she seemingly realizes something, looking to you with Puppy dog eyes. “Uhm, please, master?”</p>' +
					'<p>You chuckle softly, but see absolutely no harm in letting her do that (well, quite the opposite, really) ordering Monique to straddle you and position her pussy for you to lick and play with while Hannah enjoys her ride.</p>' +
					'<p>Both women eagerly follow their orders, getting into position to ride you and soon filling the room with lustful moans. Hannah wild and passionate, making sure to savor every little motion, while Monique moans cutely every time your tongue flick over her dripping folds and clit and as their lust increases, so seems their affection for each other, the two best friends turned slave-sisters starting to kiss passionately and eagerly as their mutual climaxes build up until they both, with a little help from you, reach their peak simultaneously.</p>'
				);
			} else {
				md.write(
					'<p>Hannah seems willing to pounce on you here and now, not really caring for and maybe even enjoying the possibility of being caught, but in the End, Monique convinces her that it is better to head back into the apartment.</p>' +
					'<p>“Well, I guess the mistress must be feeling dirty now, I sure do.” Hannah remarks with a wink to the visibly relieved Monique as she leads the two up some stairs into what is apparently their apartment and straight to the shower, most of her clothes dropping on the way.</p>' +
					'<p>You watch from the door frame as Monique finishes stripping out if the remainder of her clothes and is taken by surprise by Hannah, who suddenly pulls her close into a deep, long kiss.</p>' +
					'<p>“So this is what it feels like...” Hannah muses to Monique, who just stares at her wide-eyed, her face taking a deep shade of red, struggling to find words.</p>' +
					'<p>“I... think you broke her...” you remark jokingly, and Hannah laughs. “Hey, it\'s her fault that I\'m suddenly into girls now.”</p>' +
					'<p>“Didn\'t see you struggle against it much...” Monique retorts, and Hannah has a hard time calming her laughter.</p>' +
					'<p>“No... I guess not...” She pulls Monique lovingly into the shower and motions for you to join in as well, so they can “Give your ride a thorough cleaning.”</p>' +
					'<p>You enjoy the attentions of the pair immensely, Monique is still rather reserved, but with Hannah around to push her a little, you get to see a wilder side you didn\'t expect the Librarian to have in her as her lips and fingers explore your body.</p>' +
					'<p>Hannah, on her end, seems eager to experiment with her newfound love for “lesbian lovemaking” as she puts it, squeezing your breasts and teasing your sex with her tongue, fingers and the water stream from the shower alike. She may lack experience, but is a fast learner, quickly driving you to the first of what shall soon be several orgasms this evening.</p>'
				);
			}


			startQuestions();
			addLinkToPlace(md, "talk more to Hannah", 237);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 279 && sType === "" && this.isHere()) {
			// Mechanics shop
			if (this.isCharmedBy()) {
				addLinkToPlaceC(md, "tell Hannah she can \"Check your fluids\" now", Place, "type=hannahcheck");
				if (wherePerson("Monique") == Place) addLinkToPlaceC(md, "tell Monique and Hannah to \"Service my ride\"", Place, "type=service");
			}
			if (whereItem(29) == 279) addQuestionC(md, 'ask Hannah to break the vase', "Hannah", 279);	// If you gave the vase to Hannah
			if (isRitualComplete() && getPersonOther("Jessica", 1) == 2) addLinkToPlaceC(md, '"Could you help me cut some chains"', 161, "type=cutting");
		}
		if ((Place == 279 || Place == 237) && sType === "" && this.isHere() && this.isCharmedBy()) {
			if (this.checkFlag(17)) addOptionLinkC(md, '"Take me somewhere on your bike"', 'HannahBikeRide(false)');
			if (this.checkFlag(16)) addLinkToPlaceC(md, '"Let\'s Visit Camryn"', 457, '', '&quot;I&rsquo;d like to check up on her, too and should be able to squeeze some time into my schedule, let&rsquo;s go.&quot;&lt;/p&gt;&lt;p&gt;Hannah helps you put on the helmet and safety gear, and the two of you head to the Celeste road apartment to visit her sister.', '', "movePerson('Hannah',457)");
			if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceC(md, '"Can we find somewhere to park my ' + (perYou.isMaleSex() ? '' : 'plastic') + 'cock"', 237, 'type=sextf');
		}
		if (Place == 237 && sType === "" && this.isHere()) {
			// At their apartment
			var perMonique = findPerson("Monique");
			var clvM = perMonique.getCharmedLevel();
			if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceC(md, '"I want you, now"', 237, 'type=iwantyou');
			if (perMonique.isHere() && clvM > 1) addLinkToPlaceC(md, 'tell Monique and Hannah to "Service your ride"', 237, 'type=service');
			addLinkToPlace(md, 'enter Hannah\'s room', 284);			
		} else if (Place == 457 && this.isHere()) {
			// Camryn's Apartment
			if (!isPersonHere("Camryn")) {
				// Only Hannah is here
				if (!this.checkFlag(9)) {
					addQuestionR(md, 'she never mentioned her sister',
						'“You never asked, and I often don\'t even remember that Monique is in the next room when we are together.“ Hannah smiles, her mind briefly trailing off before she quickly focuses again.</p>' +
						'<p>"Her name is Camryn, she\'s my younger sister by two years, but we are not much alike.“ Hannah guides you into the living room and motions for you to sit down.</p>' +
						'<p>“I was always quite rebellious, hung out with what many deemed the wrong people, disobeyed my parents and even dropped out of school, and she was kind of expected to make up for it.”</p>' +
						'<p>You give an understanding nod and tell her to go on.</p>' +
						'<p>“So, Camryn was always polite, did what mom and dad told her, studied a lot, and now that she\'s out of school, she already has a stable, if boring, office job at a reputable company.”',
						"Hannah",
						"setPersonFlag(\\'Hannah\\',9)"
					);
				}
				if (this.checkFlag(9) && !this.checkFlag(10)) {
					addQuestionR(md, 'ask about the boyfriend',
						'“He\'s an asshole.” Hannah says flatly.</p>' +
						'<p>“I\'ve hung out with a lot of people who are considered a bad influence, but they were good people at the core, but he... he\'s arrogant, contemptuous, and likely involved in a lot of shady shit.” She sighs.</p>' +
						'<p>“I told Cam to ditch him, but she snapped at me, told me I was always allowed to make mistakes and live the life I wanted so I don\'t get to judge her for her decisions...”',
						"Hannah",
						"setPersonFlag(\\'Hannah\\',10)"
					);
				}
				if (this.checkFlag(10) && !this.checkFlag(11)) {
					addQuestionR(md, '"So, What exactly happened?"',
						'"Gary, no wait, Gil... Glenn... Scumbag said he wanted to talk it out with me, get to know each other over a drink to break the ice.“</p>' +
						'<p>“I figured he just wanted to get us drunk and take advantage of it, but also that I could just drink him under the table anyway and teach him a lesson, but I wasn\'t halfway through the first glass when I passed out and woke up hours later with my bike-keys and wallet missing.”</p>' +
						'<p>You interject that he likely drugged her, and Hannah nods with a grim expression, her eyes suddenly very focused, as if barely affected by the spell.</p>' +
						'<p>“Camryn was gone, too and left her smartphone here, so I had no way to contact her. I thought they were doing a Joyride and was ready to wait and give them a what for... but it\'s been over a day, and now I\'m worried sick.',
						"Hannah",
						"setPersonFlag(\\'Hannah\\',11)"
					);
				}
				if (this.checkFlag(11) && !this.checkFlag(12)) {
					startAlternatives(md);
					addQuestionR(md, 'ask what you can do to help',
						'“You are a ' + perYou.getWitch(true) + ', right? I figured if anyone can find her fast enough it\'s you.”</p>' +
						'<p>“There are a lot of personal items here, maybe you have a tracking spell, or a way to contact the Items owner.” Hannah sounds hopeful.</p>' +
						'<p>“I\'ll do anything for you if you manage to help me find her, be your bitch, your lover, your personal driver... okay I\'ll happily be all these things anyway, but with even more passion and enthusiasm!”',
						"Hannah",
						"setPersonFlag(\\'Hannah\\',12)"
					);
					addQuestionR(md, 'ask what you\'ll get out of helping her',
						'“You\'d not be a fucking ass...” Hannah looks genuinely angry as she rises to her feet, and for a moment, it even looks like she is able to overcome the charm.</p>' +
						'<p>The glow in her eyes flares up and you see the struggle play out on her face before her mind is overpowered again, her eyes returning to normal, looking at you with adoration.</p>' +
						'<p>“Of course I\'ll reward you, ' + perYou.getMaster() + '! I\'ll be whatever you want me to be, Your driver, your personal slut, your lover.</p>' +
						'<p>You point out that she is all of this anyway if you want her to be, and once again, you see the anger flare up in her eyes, but she finally has an idea.</p>' +
						'<p>“You\'ll get Camryn!” She rises to her feet and gets you a photo of a good-looking girl with dark hair. “She\'s inexperienced, but young and sexy, and if you get her back, she is naturally yours.”',
						"Hannah",
						"setPersonFlag(\\'Hannah\\',12);setPersonFlag(\\'Hannah\\',13)"
					);
					endAlternatives(md);
				}
				if (this.checkFlag(12) && !this.checkFlag(14)) {
					addQuestionR(md, 'tell her about the possession spell and agree to help',
						'You explain the possession spell to Hannah, how it works, and that you indeed need a personal item of hers, and Hannah leaves to get a small trinket.</p>' +
						'<p>“Just be careful with her body, okay? We don\'t know where she will be and how Scumbag will react if she acts up.”</p><p>' +
						(this.checkFlag(13) ? '“She\'ll make a good slave for you, but only if you bring her home safely, ' + perYou.getMaster() + '.”' : '“Oh, and thank you.” She gives you a peck on the cheek. “I\'m glad to have met you, and I\'m not only saying this because you control my mind... possibly.”'),
						"Hannah",
						"setPersonFlag(\\'Hannah\\',14);PlaceI(63);"
					);
				}
				if (this.checkFlag(12) && !this.checkFlag(14) && !this.checkFlag(15)) {
					addQuestionR(md, 'tell her you\'ll consider it',
						'Hannah slumps down in defeat and buries her face in her hands. “Just... don\'t consider too long, every day we wait puts her into more danger.”',
						"Hannah",
						"setPersonFlag(\\'Hannah\\',15)"
					);
				}
			} else if (sType === "") {
				// Camryn's Apartment with both present
				addQuestionR(md, 'send Hannah back to ' + (isShopOpen(0) ? 'the shop' : 'her apartment'),
					'“I... guess I do still have a lot of work to do, do I?” Hannah sighs and looks at you longingly as she dresses herself.</p>' +
					'<p>“Take good care of ' + perYou.getHimHer() + ', Cam, and please visit me if you find the time, ' + perYou.getMaster() + '.”</p>' +
					'<p>The two of you share a kiss and Hannah hesitantly leaves the apartment, leaving you and Camryn alone. ',
					"Hannah",
					"movePerson(\\'Hannah\\',279)"
				);
				addLinkToPlace(md, 'ask Hannah to take you back to ' + (isShopOpen(0) ? 'the shop' : 'her apartment'), isShopOpen(0) ? 279 : 237, '',
					'“You have to leave already?” Camryn looks disappointed, but you assure her that you will be back to see her soon, and Hannah adds that she intents to take good care of you, which somewhat makes her feel better.</p>' +
					'<p>The two of you share a goodbye kiss before you leave the apartment with Hannah and she takes you back to the workshop.'
				);
			}
		} else if (Place == 456 && this.checkFlag(14) && !checkPlaceFlag("CelesteRd", 3)) {
			addQuestionRO(md, 'pickup the stone',
				'You reach in and try to get the stone but just knock over the bin. The stone tumbles out as you right the bin.',
				"",
				"setPlaceFlag(\\'CelesteRd\\',3);" + (isConspiracyPath() ? "PlaceI(6)" : "PlaceI(5)")
			);
		} else if (Place == 284) {
			// In her bedroom
			addLinkToPlaceC(md, 'catch a ride', 284, 'type=catcharide');
			if (perYou.isMaleSex() || perYourBody.FindItem(45) > 0) addLinkToPlaceC(md, '"Can we find somewhere to park my ' + (perYou.isMaleSex() ? '' : 'plastic') + 'cock"', 237, 'type=sextf');
			this.addSleepLink(md, "go to bed for the night with Hannah", "Going to bed with Hannah",
				'<p style="position:absolute;left:15%;top:6%;cursor:pointer;font-size:1.1em;width:75%;color:white">You notice that night has fallen, and tell Hannah that you will spend the night with her.</p>',
				'home-bed.jpg'
			);
		}
	};

	per.showPersonTextHere = function(md)
	{
		if (this.whereNow() == 279 && Place == 279 && wherePerson("Monique") != 279) {
			// Hannah in the Mechanics Shop
			if (isInvisible()) {
				md.write(
					'<p>The place is very clean for a mechanics shop. Parts, tools and cars are reasonably well-kept and you walk through the office to the workshop without picking up any grease or dirt.</p>' +
					'<p>Hannah, the mechanic is working on a motorcycle as you walk in.</p>'
				);
			} else if (!this.isCharmedBy()) {
				md.write(
					'<p>The place is very clean for a mechanics shop. Parts, tools and cars are reasonably well-kept and you walk through the office to the workshop without picking up any grease or dirt.</p>' +
					'<p>Hannah, the mechanic, turns to you with her "talking to the customer" smile.  "Can I help you with something?" she asks.</p>'
				);
			} else {
				md.write(
					'<p>Since the Hannah’s enslavement, the mechanical shop belongs to you. It’s a well-kept workshop that once was a garage. Though it is relatively clean, you always come here with a thought that you will need a change of clothes when you leave.</p>' +
					'<p>Hannah seems excited that you have returned. "How may this humble servant be of service, ' + perYou.getMaster() + '? Perhaps you would like me to... check your fluids?" she asks, a hint of mischief in her eyes. It is true that she a servant of yours, but that she would be humble? You don’t think so… She can still be a nasty little animal, a part that she only brings out in bed.</p>'
				);
			}
		} else if (this.whereNow() == 457 && Place == 457 && wherePerson("Camryn") == 457) {
			if (isCharmedBy("Camryn")) {
				md.write(
					'<p>The two sisters embrace each other as you enter the apartment and share a long, sensual kiss, more for your benefit than theirs, before welcoming you in unison.</p>'
				);
			} else {
				md.write(
					'<p>Hannah looks at you expectantly with a knowing smile, but otherwise keeps quiet and waits for you to make the first move.</p>'
				);
			}
		} else if (Place == 456 && this.checkFlag(14) && !checkPlaceFlag("Apartments", 3)) md.write('<p>You notice discarded in a waste-bin a familiar looking stone.</p>');
		else if (Place == 168 && this.isHere()) md.write('<p>Hannah is already here and speaking to '  + getPoliceChief() + ' Batton, who does her best to try to calm the agitated woman.</p>');
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonName();
		this.showPersonRandom("!poledance", 2);
		addPlaceTitle(md, "Hannah\'s Dance");
		md.write(
			'<p>' + nm + ' takes the stage dressed in a version of exotic dancing wear!</p>' +
			'<p>' + nm + ' is not an experienced dancer but her figure and large breasts clearly appeal to the audience. ' + nm + ' is a lot more focused on you than the general audience, dancing almost as your private dancer!</p>' +
			'<p>After ' + this.getHeShe() + ' collects ' + this.getHisHer() + ' tips and offers them to you, but you know Jade has a performance fee for you, and ' + nm + ' deserves ' + this.getHisHer() + ' tips.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after ' + this.getHisHer() + ' dance', Place);
		WritePlaceFooter(md);
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Mechanics Shop
			if (Place == 279 && this.isHere())  {
				if (isSpellKnown("Shielded Charm")) {
					// Know shielded Charm
					CastCharmSpell("Hannah", Place, 1, 'type=charmhannah1');
				} else addComments('Don\'t cast the spell here. It is too public.');
				return "handled";
			}
			// Hotel Cellar
			if (Place == 161) {
				if (sType == "cutting" && !isCharmedBy("Hannah")) {
					addComments('You should wait until after Hannah has done her job for you.');
					return "handled";
				} else if (sType == "cut1" || sType == "cut2") {
					CastCharmSpell("Hannah", Place, 1, 'type=charmhannah1', 'You follow Hannah, hoping for a private place to <i>speak</i> to her. She reaches an area of the parking lot...');  // charm Hannah
					return "handled";
				}
			}
		}
		return "";		// do nothing
	};

	// Phone calls
	per.isPhoneable = function() {
		return this.checkFlag(17) || (checkPlaceFlag("Hotel", 11) && Place == 269 && this.isCharmedBy());
	};

	per.callThem = function()
	{
		if (Place == 269) {
			// Time for a swim
			gotoPlace(Place, 'type=hannahpool');
			receiveCall('', 'You call Hannah to invite her to join you at the pool for a swim, and she happily agrees' + (isShopOpen(0) ? ' business is slow, she will close the shop for a while.' : '.'));
			WriteCommentsFooter(bChat, bChatLeft);
		} else {
			// Phone them for a lift
			WaitHereOnly(3);
			HannahBikeRide(true);
		}
	};


	per.addPersonPhoneCall = function() {
		if (this.hoursCharmed() > 12 && getHour() > 5 && !this.checkFlag(2)) {
			// SMS 1, morning after being charmed
			if (makeCall(true, 180)) this.setFlag(2);
		} else if (this.hoursCharmed() > 12 && getHour() > 9 && !this.checkFlag(3) && this.checkFlag(2)) {
			// SMS 2, that evening
			if (makeCall(true, 181)) this.setFlag(3);
		} else if (this.hoursCharmed() > 36 && getHour() > 17 && !this.checkFlag(5)) {
			// SMS from Monique 1 day after the last one
			if (makeCall(true, 190)) this.setFlag(5);		// Note: this is a SMS from Monique

		} else if (this.hoursCharmed() > 72 && isDay() && !this.checkFlag(4)) {
			// SMS 3, 3 days after charmed
			if (makeCall(true, 182)) this.setFlag(4);
		} else if (this.checkFlag(6) && !this.checkFlag(7)) {
			if (makeCall(false, "",
					'Your phone rings and Hannah\'s number is on the display. You take the call,<br><br>' +
					'<b>Hannah</b><br>' +
					'"' + perYou.getPersonName() + '? Oh, I\'m so glad I\'ve reached you.“ Hannah\'s voice sounds agitated at the other end of the line. “I need help, ideally magical help. Do you know how to get to the apartment complex at Celeste Road?“<br><br>' +
					'You know those rather well, cheap but usually clean apartments run by a local company. Your family would have likely moved there, had you not been able to keep your house on Kollam Street.<br><br>' +
					'The quickest way to reach Celeste rd is following Oakpine Road to the museum and turn right, and Hannah is glad you know the way so well.<br><br>' +
					'"From the Museum on, It\'s the first large building along the road, just look for Camryn Gifford\'s apartment and I\'ll let you in.“<br><br>' +
					'You ask what exactly happened, but Hannah tells you she doesn\'t want to talk about it on the phone, so you agree to make your way over to her.<br><br>' +
					'With that she hangs up.'))
			{
				this.setFlag(7);
				setPlaceKnown("CelesteRd");
				setPlaceKnown("CamrynsApartment");
				return true;
			}
		} else if (wherePerson("Camryn") == 457 && !this.checkFlag(16)) {
				// SMS of Camryn's return home
				if (makeCall(true, 183)) this.setFlag(16);
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		switch(id) {
			case 180: return receiveSMS('Tenacious Diva', 'Monique told me you like to start the day with a pair of tits, so: Good morning, my sexy ' + perYou.getMaster() + '.', 'hannahsms1.jpg') +
								  receiveSMS('Tenacious Diva', 'PS: If you already happen to have a good pair of tits next to you, plz send Pics!');
			case 181: return receiveSMS('Tenacious Diva', 'And some sexy ass to tug you in for the night. Naughty dreams from me and Monique (she is holding the phone camera) ;)', 'hannahsms2.jpg');
			case 182: return receiveSMS('Tenacious Diva', 'I\'ve been looking through old pictures and wondering if you would like it if I cut my hair short again.', 'hannahsms3.jpg') +
								  replyToSMS("Keep it long, I like having more to hold onto.") +
								  receiveSMS('Tenacious Diva', 'Good answer, ' + perYou.getMaster() + '! Now I\'m having dirty thoughts again... Hoping to see you soon! :-*');
			case 183: return receiveSMS('Tenacious Diva', 'Hey, your ' + perYou.getMaster() + 'ness. The police say Camryn is free to go and she should be home by now. I\'ll gladly drive you there, but also told her of your help and that you may want to check up on her, so she\'ll be expecting you if you want to spend some time with her alone first. ;)');
		}
		return '';
	};

}