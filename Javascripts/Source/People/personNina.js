/****************************************************************
		Nins
****************************************************************/

function RepliesNina(nR)
{
	var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();

	if (nR == 2600)
	{
		setPlaceKnown("CelesteRd");
		setPlaceKnown("NinasApartment");
		addComments('"Oh, ' + myName + ', it is apartment 12 at the Celeste Apartments, please come and visit any evening!"');
	}
	return true;
}


// Initialise
function initialiseNina()
{
	// Nina
	addPerson("Nina", 371, "Nina", '', false);
	
	per.Replies = RepliesNina;
	
	per.getPersonAddress = function() { return isPlaceKnown("NinasApartment") ? 'Apartment 12, 42 Celeste Rd' : ''; };
	
	per.whereNow = function() { return isShopOpen() ? this.place : 462; };
	
	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		if (!this.isCharmedBy()) {
			return this.addPersonString("nina0.jpg", "height:max%", "right") +
				"The receptionist of the TV station is the typical airhead blonde who you imagine has got her job because she sucks dicks well. She is even constantly chewing a damned chewing gum which not only makes your presumption of her more real but it’s really annoying just to be near her. Not even mentioning that she is mostly on the phone chatting to whoever she pleases to ignoring visitors or customers like yourself.";
		} else {
			return this.addPersonString("nina9.jpg", "height:max%", "right") +
				"Nina, the receptionist at the station sure has an irritating personality even after you tackled her brains and emotions a little. Now she doesn’t hang on the phone so much as she used to do, instead she’s trying to prove her worth to you by throwing herself at your feet and nagging you by always asking questions or telling you ideas how she could serve. You amuse yourself  by putting her in risky situations like you ordered her to suck her pen in the sluttiest way she possibly can when a visitor comes by or to have slight orgasms while talking on the phone. You even had her jump around in the hall like a frog once, holding important documents in her mouth ( no one but you were there to see ). Nina enjoys being your empty headed puppet, but you are afraid she could not comprehend or carry out complex missions like spying for you or !!!!.<br><br>" +
				"And you only wanted get your revenge on her for being so rude to you back then! However, it looks she is so simple minded that she takes your punishments as compliments and continues to be an annoying slut rather than understanding you and your wishes , so if you have some free time you should train Nina to be your personal whore!";
		}
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 462 && this.isHere() && sType === "") return this.showPerson("nina-home1.jpg", '', '', '', '', false, "string");
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 97 && isShopOpen(0) && sType === "") md.write('<p>Angela joins you and gets a cup of coffee for herself.</p>');
		else if (Place == 462 && this.isHere()) {
			md.write(
				'<p>Nina greets you, and invites you in, but the bimbo makes no pretense of offering refreshments, she just offers herself.</p>'
			);
		}
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;

		if (Place == 371 && this.place == 371 && !this.checkFlag(2) && this.isHere()) {
			this.setFlag(2);
			showPopupWindow("Receptionist",
				this.addPersonString("nina0.jpg", "height:max%", "right") +
				"The receptionist of the TV station is the typical airhead blonde who you imagine has got her job because she sucks dicks well. She is even constantly chewing a damned chewing gum which not only makes your presumption of her more real but it’s really annoying just to be near her. Not even mentioning that she is mostly on the phone chatting to whoever she pleases to ignoring visitors or customers like yourself.<br><br>" +
				"As you impatiently wait in one of the chairs in front of her desk you decide that you should teach this bimbo some manners! It is an open place for visitors though and people come and go" +
				(isSpellKnown("Charm") ? " so you should be careful with using your powers here!" : ".")
			);
			return true;

		}
		return false;
	};

	per.showEvent = function()
	{
		var md;
		
		if (Place == 269) {
			if (sType == "ninapool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("nina-pool.jpg");
				addPlaceTitle(md, "Swimming with Nina");
				md.write(
					'<p>Nina arrives and changes into her yellow bikini, or at least mostly into it. She flirts with you, making it clear she wants to do more than swim.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=ninapoolsex');
				addLinkToPlaceC(md, 'say goodbye to Nina', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "ninapoolsex") {
				md = WritePlaceHeader();
				this.showPerson("nina-pool-sex.jpg");
				addPlaceTitle(md, "More Than Swimming With Nina");
				md.write(
					'<p>You accept her advances, and she pulls off the rest of her bikini ready for you to take her!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Nina', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 462) {
			if (sType == "ninafuck") {
				// Sex scenes at her home
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRandom("nina-home-sexb", 2);
				else this.showPerson("nina-home-sexg.jpg");
				addPlaceTitle(md, "Nina");
				md.write(
					'<p>You enjoy yourself with Nina\'s body</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'talk more with Nina', Place);
				addLinkToPlace(md, 'exit the apartment', 456);
				WritePlaceFooter(md);
				return true;
			}

		}

		if (Place != 371) return false;

		if ((isDay() && nFromPlace == 359 && this.isCharmedBy() && isCharmedBy("Zoey") && !this.checkFlag(3)) || sType == "ninazoey" || sType == "ninazoey2") {
			md = WritePlaceHeader(false, 'td-left-large');
			if (!this.checkFlag(3)) {
				this.setFlag(3);
				setQueryParams('type=ninazoey');
			}
			this.showPerson("ninazoey1.jpg");
			addPlaceTitle(md, "Slaves Practising");
			if (sType == "ninazoey") {
				md.write(
					'<p>You see the reception area is empty, Nina is not at her desk. You assume she is on a break and go to check the small break room your Mom once took you to when visiting. Before you take a few steps you hear some voices coming from the room so you check it out. The room has some large plants and some tea and coffee machines. It also has a naked Nina and a naked Zoey! You hear them whispering and hear Nina say,</p>' +
					'<p>"Don\'t worry, ' + perYou.getHeShe() + ' won\'t mind, it\'s like we are, you know, practising. So we are really good for ' + perYou.getHimHer() + '"</p>' +
					'<p>Zoey notices you and smiles, but Nina is very intent on seducing her and does not see you. Interesting, you remember Madison saying something about how "Nina really likes Zoey". You would guess the arousal of the Charm spell is letting them try things they may not of before. Alright, time to take some control here, so you interrupt,</p>' +
					'<p>"Nina! Yes you may by all means practise with Zoey, but you must ask my permission!"</p>' +
					'<p>Nina looks startled and stammers an apology and asks if they can practise for you? You of course agree and you watch the two as they caress and play with each others bodies. Nina is clearly besotted with Zoey, but while it seems Zoey likes her, it seems Zoey is more interested in performing for your enjoyment.</p>' +
					'<p>After a time you tell them that they have had enough practise and it is time to put their training to good use, on you!</p>'
				);
			} else {
				md.write(
					'<p>You tell Zoey that it is time for another practise session with Nina. You both step out to the reception area, leaving a disappointed Madison behind.</p>' +
					'<p>You tell Nina "Practise makes perfect" and she immediately understands and heads for the break room, shedding her clothing.</p>' +
					'<p>In the break room you make sure they get plenty of practise in pleasuring each other, but mainly in pleasuring yourself.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, 'let them finish and return to the reception with Nina', Place);
			WritePlaceFooter(md);
			return true;

		}

		if (sType == "please") {
			md = WritePlaceHeader(false, "td-left-med");

			if (Math.random() < 0.5) this.showPerson("nina7.jpg");
			else this.showPerson("nina8.jpg");

			addPlaceTitle(md, "Nina Under a Spell");

			md.write(
				'<p>"I think its time for another lesson Nina," you say, looking around to see if anyone else is close by. For the time being, the coast seem to be clear.</p>' +
				'<p>Nina quickly sheds her few pieces of clothing, an act she is getting rather good at doing quite quickly.</p>' +
				'<p>"Yes ' + perYou.getMaster() + '!" she says, an excited look passing through her eyes at the thought of pleasing you.  "Take me ' +
				'again.  Use me like the <i>slave</i> I am.  Please, ' +	perYou.getMaster() + '!" she begs.</p>' +
				'<p>"I would do <i>anything</i> for you, ' + perYou.getMaster() + '!" she stammers between moans of pleasure as she administers to your every need.</p>' +
				'<p>"You and your pleasure are all I live for now," she moans as she brings you to climax.</p>' +
				'<p>"As it should be, Nina, my little minx," you say, smiling as she almost orgasms from your praise.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "clean up and speak with your minx some more", 371);
			addLinkToPlace(md, "leave the station", 359);
			WritePlaceFooter(md);
			return true;

		}
		
		if (sType == "charm1") {
			// Charm Nina 1
			md = WritePlaceHeader();

			this.showPerson("nina2.jpg");
			addPlaceTitle(md, "Nina Under a Spell");

			md.write(
				'<p>Preoccupied, she doesn\'t notice you casting the spell.  But as her eyes begin to glow her her words trail off, mid sentence.  Turning off the phone, she stares at you, suddenly speachless.</p>' +
				'<p>"You alright, Miss?" you ask, trying to look as if her sudden flirtatious advances were completely unnoticed.</p>' +
				'<p>"Miss? Please," she says as with more than a little attitude. "Please...  Call me Nina. All my...  my friends call me Nina," she finally manages to get out.</p>' +
				'<p>"Okay, Nina it is," you say, giving her a warm, inviting smile. "But you didn\'t answer my question, Nina.  Are you feeling alright?"</p>' +
				'<p>"Feeling?  Oh, yes," she says, obviously feeling very distracted.  "I feel fine.  Better than fine, actually. You... You know... I\'m not sure how to say this..."</p>' +
				'<p>You smile at her sudden attack of shyness.  "Come now, Nina.  Just spit it out." Never hurts to assert your influence here.</p>'
			);
			if (!perYou.isBornMale()) md.write('<p>"Well, it\'s a...  Has anybody ever told you that you\'re really cute?" she asks, giving you flashbacks to what you wish your high school had been like.</p>');
			else md.write('<p>"Well, it\'s...  It\'s just that...  I\'m usually not...  Normally I prefer girls...  I mean I don\'t dislike boys, but you know..."</p>');
			md.write(
				'<p>You step up to her, close enough to smell her perfume, jasmine if you\'re not mistaken.  She almost shakes in response to your closeness.  "Are you saying that you\'re attracted to me, Nina?" you ask, keeping her gaze with an intense look in her eyes.</p>' +
				'<p>It has the desired effect, as she barely manages a whisper.  "Uhmm.  yea - Yes..."</p>' +
				'<p>"Well then," you say as you step nearer and, taking her head gently in your hands, you give her a deep, passionate kiss. Her body immediately responds to your touch as her tongue begins exploring your mouth. Moments later you pull away, leaving her gasping for more.</p>' +
				'<p>Stepping back from her, your eyes roam up and down her body, examining your newest acquisition.  She seems to respond to your inspection, straightening her posture a bit. ' +
				'"Like what you see?" she asks.  "Want to see more?"</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"As a matter of fact I do. Take off your shirt for me."', Place, 'type=charm2slave');
			if (perYou.checkFlag(26)) addLinkToPlaceC(md, '"Of course I do, you are very desirable."', Place, 'type=charm2gf');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charm2slave") {
			// Charm Nina 2 (Slave)
			this.charmThem(4);
			md = WritePlaceHeader();

			this.showPerson("nina3s.jpg");
			addPlaceTitle(md, "Nina Being Enslaved By A Spell");

			md.write(
				'<p>"Like this?" she says as she opens her shirt and pushes out her chest for impact.</p>' +
				'<p>"Just like that, Nina," you say, praising her and smiling as you ' +
				'notice her visceral reaction, her face beginning to flush.  "Very good girl."</p>' +
				'<p>"Thank you," she says, her shyness beginning to reassert itself. "I... I\'m usually not this... this... forward with people."</p>' +
				'<p>"Really?" you ask as you step up and run your hands along her very well-toned stomach.  "Well then, Nina.  Why are you being so... ' +
				'forward... with me then?"  Then you begin lightly kissing her neck from behind her.</p>' +
				'<p>"I... I..." she stammers, her body reacting of its own volition to the soft touch of your lips.</p>' +
				'<p>"There is just... <i>something</i> about me, isn\'t there Nina?" you ask, knowing full well she is now absolute putty in your hands.</p>' +
				'<p>"Ye... Yes..." she whispers.  "Something... about you. So powerful. No one has ever made me feel this way."</p>' +
				'<p>"Powerful. That\'s right Nina," you whisper in her ear.  "There is something ' +
				'about me.  Something you literally can\'t resist.  In fact," you say as you begin to step back away from her, leaving her breathless. ' +
				'"I am so irresistible that you <i>have</i> to do whatever I say.  And I\'ll prove it."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Take off your bra for me, Nina."', Place, 'type=charm3slave');

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charm2gf") {
			// Charm Nina 2 (Girlfriend)
			this.charmThem(2);
			
			md = WritePlaceHeader();
			this.showPerson("nina3g.jpg");

		  addPlaceTitle(md, "Nina Being Seduced By A Spell");

			md.write(
				'<p>"Like this?" she says as she opens her shirt and pushes out her chest for impact.</p>' +
				'<p>"Just like that, Nina," you say, praising her and smiling as you ' +
				'notice her visceral reaction, her face beginning to flush.  "Very good girl."</p>' +
				'<p>"Thank you," she says, her shyness beginning to reassert itself. ' +
				'"I... I\'m usually not this... this... forward with people."</p>' +
				'<p>"Really?" you ask as you step up and run your hands along her ' +
				'very well-toned stomach.  "Well then, Nina.  Why are you being so... ' +
				'forward... with me then?"  Then you begin lightly kissing her neck from behind her.</p>' +
				'<p>"I... I..." she stammers, her body reacting of its own volition to the soft touch of your lips.</p>' +
				'<p>"There is just... <i>something</i> about me, isn\'t there Nina?" ' +
				'you ask, knowing full well she is now absolute putty in your hands.</p>' +
				'<p>"Ye... Yes..." she whispers.  "Something... about you. So powerful. No one has ever made me feel this way."</p>' +
				'<p>"Powerful. That\'s right Nina," you whisper in her ear.  "There is something ' +
				'about me.  Something you literally can\'t resist.  In fact," you ' +
				'say as you begin to step back away from her, leaving her breathless. ' +
				'"I am so irresistible that you <i>have</i> to do whatever I say.  And I\'ll prove it."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Take off your bra for me, Nina."', Place, 'type=charm3gf');

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charm3slave") {
			// Charm Nina 3 (Slave)
			md = WritePlaceHeader();

			this.showPerson("nina4.jpg");
			addPlaceTitle(md, "Nina Under a Spell");

			md.write(
				'<p>She smiles at you as she removes her shirt and begins to pull down her bra, ' +
				'exposing herself for your viewing pleasure.</p>' +

				'<p>"You <i>like</i> this, don\'t you Nina." you say, making what would normally ' +
				'have been a question into more of a command - a command that slips straight into ' +
				'her oh-so-malleable mind.  "You like displaying yourself for me, doing things ' +
				'for me that would wouldn\'t do for <i>anyone</i> else."</p>' +

				'<p>She simply moans as the command turns what little fear and apprehension she ' +
				'was still feeling into pure pleasure as she realizes that she <i>does</i> like ' +
				'showing herself off to you.</p>' +

				'<p>"That\'s what I thought," you say, smiling. "And why is that, Nina?  Why do ' +
				'you like showing yourself off to me?" A confused look flashes across her face ' +
				'as she tries in vain to understand why she is suddenly feeling so aroused.</p>' +

				'<p>"Because you know it pleases me, Nina," you say, smiling at the look of relief ' +
				'that crosses her face.  "You would do anything to please me.  Wouldn\'t you, Nina?"</p>' +

				'<p>"Yes.  Yes, of course I would," she says as your words are incorporated into her new worldview.</p>' +

				'<p>"Well then, that means that <i>my</i> happiness is more important that your own, ' +
				'isn\'t it," you say directly to her subconscious.  "In fact, you would be willing to ' +
				'do anything if you knew it would make me happy.  Wouldn\'t you, Nina."</p>' +

				'<p>"Why don\'t you finish taking that bra off and show me that beautiful body of yours."</p>'
			);

			startQuestions();

			addLinkToPlace(md, 'wait for her to obey you', Place, 'type=charm4slave');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charm3gf") {
			// Charm Nina 3 (Girlfriend)
			md = WritePlaceHeader();
			this.showPerson("nina4.jpg");
			addPlaceTitle(md, "Nina Under a Spell");

			md.write(
				'<p>She smiles at you as she removes her shirt and begins to pull down her bra, ' +
				'exposing herself for your viewing pleasure.</p>' +

				'<p>"You <i>like</i> this, don\'t you Nina." you say, making what would normally ' +
				'have been a question into more of a command - a command that slips straight into ' +
				'her oh-so-malleable mind.  "You like displaying yourself for me, doing things ' +
				'for me that would wouldn\'t do for <i>anyone</i> else."</p>' +

				'<p>She simply moans as the command turns what little fear and apprehension she ' +
				'was still feeling into pure pleasure as she realizes that she <i>does</i> like ' +
				'showing herself off to you.</p>' +

				'<p>"That\'s what I thought," you say, smiling. "And why is that, Nina?  Why do ' +
				'you like showing yourself off to me?" A confused look flashes across her face ' +
				'as she tries in vain to understand why she is suddenly feeling so aroused.</p>' +

				'<p>"Because you know it pleases me, Nina," you say, smiling at the look of relief ' +
				'that crosses her face.  "You would do anything to please me.  Wouldn\'t you, Nina?"</p>' +

				'<p>"Yes.  Yes, of course I would," she says as your words are incorporated into her new worldview.</p>' +

				'<p>"Well then, that means that <i>my</i> happiness is more important that your own, ' +
				'isn\'t it," you say directly to her subconscious.  "In fact, you would be willing to ' +
				'do anything if you knew it would make me happy.  Wouldn\'t you, Nina."</p>' +

				'<p>"Why don\'t you finish taking that bra off and show me that beautiful body of yours."</p>'
			);

			startQuestions();

			addLinkToPlace(md, 'wait for her to obey you', Place, 'type=charm4gf');

			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charm4slave") {
			// Charm Nina 4 (Slave)
			md = WritePlaceHeader();

			this.showPerson("nina5.jpg");
			addPlaceTitle(md, "Nina Under a Spell");

			md.write(
				'<p>"Anything for you..." she says, her voice quickly beginning to drip with sex.</p>' +

				'<p>You step near her again and begin to run your hands up and down her body, savoring ' +
				'the feel of her oh-so-supple skin.  "That\'s right, Nina...  anything.  Now kiss me."</p>' +

				'<p>In a flash she had her arms up and around you, her mouth firmly pressed up against ' +
				'yours as her tongue explores your mouth.  Her body reacts to your every touch as her ' +
				'moans begin to slip out between her kisses.</p>' +

				'<p>You enjoy the attention of your newest slave, and then slip away - realizing that you\'re ' +
				'not quite done with this one.</p>' +

				'<p>"So Nina..." you begin.  "Yes?" she whispers demurely.  "What is the most important ' +
				'thing in your life?"</p>' +

				'<p>"You are..." she says, her look of adoration beginning to win you over.</p>' +

				'<p>"And what would you do if you knew it would make me happy?" - - "Anything..." she says.</p>' +

				'<p>"And is there anything you would deny me, Nina?" you ask as you hold her possessively ' +
				'in your arms.  - - "No, nothing," she says.</p>'
			);

			startQuestions();

			addLinkToPlaceC(md, '"And what does that make you, Nina?"', 371, 'type=charm5slave');

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charm4gf") {
			// Charm Nina 4 (Girlfriend)
			md = WritePlaceHeader();
			this.showPerson("nina5.jpg");
			addPlaceTitle(md, "Nina Under a Spell");

			md.write(
				'<p>"Anything for you..." she says, her voice quickly beginning to drip with sex.</p>' +

				'<p>You step near her again and begin to run your hands up and down her body, savoring ' +
				'the feel of her oh-so-supple skin.  "That\'s right, Nina...  anything.  Now kiss me."</p>' +

				'<p>In a flash she had her arms up and around you, her mouth firmly pressed up against ' +
				'yours as her tongue explores your mouth.  Her body reacts to your every touch as her ' +
				'moans begin to slip out between her kisses.</p>' +

				'<p>You enjoy the attention of your newest slave, and then slip away - realizing that you\'re ' +
				'not quite done with this one.</p>' +

				'<p>"So Nina..." you begin.  "Yes?" she whispers demurely.  "What is the most important ' +
				'thing in your life?"</p>' +

				'<p>"You are..." she says, her look of adoration beginning to win you over.</p>' +

				'<p>"And what would you do if you knew it would make me happy?" - - "Anything..." she says.</p>' +

				'<p>"And is there anything you would deny me, Nina?" you ask as you hold her possessively ' +
				'in your arms.  - - "No, nothing," she says.</p>'
			);

			startQuestions();

			addLinkToPlaceC(md, '"And what does that make you, Nina?"', 371, 'type=charm5gf');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charm5slave") {
			// Charm Nina 5 (Slave)
			md = WritePlaceHeader();

			this.showPerson("nina6.jpg");
	
			var myName = perYou.getMaster();
			addPlaceTitle(md, "Nina Under a Spell");

			md.write(
				'<p>A flash of inspiration crosses her face.  "That would make me your...  slave," she says, ' +
				'as she sits back on the desk completely displaying herself for you and drawing out the word ' +
				'"slave" as if trying on a new dress and finding she just loves the way it feels.</p>' +

				'<p>You smile down at her as you press yourself against her, feeling your own desire for her '
			);

			if (perYou.isMaleSex()) md.write('growing');
			else md.write('dripping down your leg');

			md.write(
				'.</p><p>"And what does that make me?" you ask, expecting the obvious.</p>' +
				'<p>"My ' + myName + '." she says with a certainty that tells you she is completely and totally <i>yours</i>.</p>' +
				'<p>Then, showing a surprising amount of initiative, she reaches out and '
			);

			if (perYou.isMaleSex()) md.write(' frees your member, guiding you into her inviting snatch.  "Oh yes, Master. Take me.  Use me.  Tell me how to please you."</p>');
			else md.write(' begins to pull your pants down, diving in and devouring you with a willingness that more than makes up for her lack of experience.  "Oh yes, Mistress.  Use me.  Teach me how to please you."</p>');

			startQuestions();
			addLinkToPlace(md, "let Nina get more presentable, then speak with her some more", 371);
			addLinkToPlace(md, "leave the station", 359);

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charm5gf") {
			// Charm Nina 5 (Girlfriend)
			md = WritePlaceHeader();
			this.showPerson("nina6.jpg");
	
			var myName = perYou.getMaster();
			addPlaceTitle(md, "Nina Under a Spell");

			md.write(
				'<p>A flash of inspiration crosses her face.  "That would make me your...  slave," she says, ' +
				'as she sits back on the desk completely displaying herself for you and drawing out the word ' +
				'"slave" as if trying on a new dress and finding she just loves the way it feels.</p>' +

				'<p>You smile down at her as you press yourself against her, feeling your own desire for her '
			);

			if (perYou.isMaleSex()) md.write('growing');
			else md.write('dripping down your leg');

			md.write(
				'.</p><p>"And what does that make me?" you ask, expecting the obvious.</p>' +
				'<p>"My ' + myName + '." she says with a certainty that tells you she is completely and totally <i>yours</i>.</p>' +
				'<p>Then, showing a surprising amount of initiative, she reaches out and '
			);

			if (perYou.isMaleSex()) md.write(' frees your member, guiding you into her inviting snatch.  "Oh yes, Master. Take me.  Use me.  Tell me how to please you."</p>');
			else md.write(' begins to pull your pants down, diving in and devouring you with a willingness that more than makes up for her lack of experience.  "Oh yes, Mistress.  Use me.  Teach me how to please you."</p>');

			startQuestions();
			addLinkToPlace(md, "let Nina get more presentable, then speak with her some more", 371);
			addLinkToPlace(md, "leave the station", 359);

			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var img = this.showPersonRandom("poledance", 4);
		addPlaceTitle(md, "Nina\'s Dance");
		md.write('<p>Your bimbo slave Nina happily takes the stage, dressed in ');
		if (img.indexOf("poledancea") != -1) md.write('some sexy white lingerie');
		else if (img.indexOf("poledanceb") != -1) md.write('a hawiian inspired outfit');
		else if (img.indexOf("poledancec") != -1) md.write('a fetish military sort of outfit');
		else md.write('Daisy Duke style hot-pants with a skimpy top');
		md.write(
			'<p>. Nina knows how to dance for her lover and performs well. You do not think she has danced much in public before, but she is really only dancing for you and is quite focused on you. This is clear to the other audience members but she is a cute blonde so they seem to forgive that.</p>' +
			'<p>After she collects her tips and offers them to you, but you know Jade has a performance fee for you, and you feel Nina earned them!</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);	
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 462 && this.isHere() && sType === "") {
			// Nina's apartment
			addLinkToPlaceC(md, 'teach her some more', Place, 'type=ninafuck');
			this.addDancingLink(md, 'talk to Nina about dancing in the club',
				'You ask your bimbo slave Nina about dancing at the Avernus club for you,</p>' +
				'<p>&quot;Of course ' + this.getYourNameFor() + ' anything to please you!&quot; and with that you call Jade to arrange a dance for Nina.'
			);
			this.addSleepLink(md, "bed Nina", "Sleeping with Nina",
				'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Nina to bed for the night.</b>',
				'bed1.jpg', true, '', '', '', "overflow-y:hidden"
			);
		}

		if (Place != 371) return;
		
		if (sType == "byesuitcase2") {
			// After delivering the suitcase
			var stage = getQueryParam("stage");
			if (stage === "") addLinkToPlace(md, 'listen in on her', Place, 'type=byesuitcase2&stage=stage1', 'You know better by now than to try to get Nina\'s attention while she\'s on the phone, but maybe you can get some information out of her if you listen in, she\'s ignoring you anyway.</p><p>“Yes, she\'s even staying at night with her assistant, and they are the only ones who do so!”</p><p>“Exactly, I just know the two are, like, totally having an affair! Bet that whole thing\'s just some excuse, so they can fuck all night without their spouses or kids or whatever knowing.”</p><p>“Oh they are close, that little slavedriver has had the Manager around her finger for, like, weeks! And we suffer her whip now!”</p><p>“No... not like this...” Nina laughs. “Though, that would explain, like, sooo much, you know?”</p><p>“No... I\'d totally like to spy on them, but I\'d have to be able to pass through walls to get in at night... Bet I\'d get quite the show, though.”</p><p>There is a large pause from Nina, so it seems it\'s now the other persons turn to tell a story...</p><p>“Really, with her? Ugh, isn\'t she, like... 50 or something and....”</p><p>Another pause.</p><p>“No way! You have to tell me everything!”</p><p>Well, the topic has shifted so you might as well leave now. It looks like you have to find other means to learn more about what the two are doing.');
			if (stage === "" || stage == "stage1") addLinkToPlace(md, 'talk to her', Place, this.isCharmedBy() ? 'type=byesuitcase2&stage=stage2' : '', (!this.isCharmedBy("You") ? 'The only confirmation that she even notices you, is her patented “How dare you try to make me do my job” glare before she returns her attention to the phone.' : '“Oh, I\'ll have to call you back!” Nina perks up immediately when you approach her and whispers into the phone. “Yes, my ' + (perYou.isBornMale() ? 'Ma' : 'Mi') + '... Boss is here, I\'ll call you later!”</p><p>Nina quickly stops the call and gives you her undivided attention. “I\'m so sorry for the delay, ' + perYou.getMaster() + ', can I, like...” her voice takes a sultry tone, and she begins suggestively nibbling on her Pen. “...do anything for you?”'));
			else if (stage == "stage2") addLinkToPlace(md, 'ask her about the current events', Place, 'type=byesuitcase2&stage=stage3', '“Ugh...A few days back we just had people talking about ghosts sightings, more people than usual, you know?” Nina sighs.” But now there was this, like, weird tremor roughly around the Broken arms Inn area and shortly afterwards, people have gone missing and they are, totally trying to fabricate some supernatural magic connection between the two and the manager has the entire newsteam investigate it.”</p><p>“As if magic is real, you know?” She seductively licks her lips for you.');
			else if (stage == "stage3") addLinkToPlace(md, 'She doesn\'t believe in Magic?', Place, 'type=byesuitcase2&stage=stage4', '“Nope, never seen anything magical in Glenvale, and believe me, ' + perYou.getMaster() + ', I\'m totally smart enough to, like, recognize magic when it\'s used.” She rolls her shoulders back to push her cleavage forward as she speaks. “I\'ve seen all the Harry Potter movies, after all.”');
			else if (stage == "stage4") addLinkToPlace(md, '"So there\'s a lot to do?"', Place, 'type=byesuitcase2&stage=stage5', '“Naaaah...” No one\'s doing overtime hours except for the manager and her assistant, and...” She leans in conspiratorial.” ...If you ask me it\'s just, so they can get away from their families for a while to, like, you know...” She whispers. “Totally have sex!”');
			else if (stage == "stage5") addLinkToPlace(md, 'What makes her think that?', Place, 'type=byesuitcase2&stage=stage6', 'Have you seen the way the manager looks at Miss Halliway of late? She\'s, like, totally smitten, I can see that! I bet if you find a way to get inside the studio at night you\'ll find them all over each other!”');
			else if (stage == "stage6") addLinkToPlace(md, 'Tell Nina to have an eye on the two keep you informed', Place, '', 'Nina may be a complete ditz, but at least when it comes to office gossip you are probably able to trust her instincts. So, you make sure to tell her to keep an Eye on Gabby and your mother, and inform you if she finds any prove for her suspicions, while you will start your own investigation as well.');
		}
		
		if (sType !== "" || !isShopOpen()) return;
		
		if (this.isCharmedBy("You")) {
			// Nina Charmed
			this.addDancingLink(md, 'talk to Nina about dancing in the club',
				'You ask your bimbo slave Nina about dancing at the Avernus club for you,</p>' +
				'<p>&quot;Of course ' + this.getYourNameFor() + ' anything to please you!&quot; and with that you call Jade to arrange a dance for Nina.'
			);
			if (!isPlaceKnown("NinasApartment")) addQuestionC(md, 'ask Nina where she lives', "Nina", 2600);
			addLinkToPlace(md, "give Nina another lesson in how to please you", 371, 'type=please');
		} else if (!this.checkFlag(1)) addQuestionR(md, 'introduce yourself', 'The receptionist glares at you for a moment, then goes back to her conversation.  Eavesdropping, you learn that her name is Nina, and confirming your first impression. She is chatting to someone about some party last night and who wore what and who liked who.', 'Receptionist Nina', "setPersonFlag(\\'Nina\\', 1);");

	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// TV Station Recention
			if (Place == 371 && this.isHere()) {
				if (!this.checkFlag(1)) addComments("You do not know her name, so the spell will not work.");
				if (!isSpellKnown("Shielded Charm")) {
					//Don't know shielded charm
					addComments('The reception area of a Radio and Television station is much to public a place to cast this.');
				} else CastCharmSpell("Nina", 371, 4, 'type=charm1'); // CHARM Nina (Radio/Tv Recpetionist), slave level
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
			if (isDay()) WriteComments("You call Nina to invite her to join you at the pool for a swim, but she is real sorry that she has to work, and asks for a rain-check?");
			else {
				gotoPlace(Place, 'type=ninapool');
				receiveCall('', 'You call Nina to invite her to join you at the pool for a swim, and she immediately answers, "Totally!!" and she hangs up. You gather this means she will be here soon.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};


	per.addPersonPhoneCall = function() {
		if (this.isCharmedBy() && isNight() && !this.checkFlag(4)) {
			// SMS night (should be the first night after charming her)
			if (makeCall(true, 230)) this.setFlag(4);
		}
		if (!this.checkFlag(5) && this.isCharmedBy() && checkPersonFlag("Mom", 34) && !per.checkFlag(32) && !isDay() && Math.floor(per.hoursCharmed() / 24) == 2) {
			// SMS prompting about checking on Mom
			if (makeCall(true, 231)) this.setFlag(5);
		}
		if (checkPersonFlag("Gabby", 8) && !this.checkFlag(6) && isMurderPath()) {
			// SMS prompting about Mom and Gabby leaving
			if (makeCall(true, 232)) {
				this.setFlag(6);
				setPlaceKnown("GabbysHouse");
			}
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		if (id == 230) return receiveSMS('Nina', 'Hi there, ' + perYou.getMaster() + ', I just can\'t cook, it gets all over me..', 'ninasms1.jpg');
		if (id == 231) return receiveSMS('Nina', 'Heeeeeyyy!!  Ms Halliway is talking about some breakthrough tonight, thought you might want to hear this.', this.isCharmedBy("You") ? 'ninasms2.jpg' : '', this.isCharmedBy("You") ? "80%" : "") + (this.isCharmedBy("You") ? receiveSMS('Nina', 'Missing u, btw. :-*') : '');
		if (id == 232) return receiveSMS('Nina', perYou.getMaster() + '! Ms. Halliway and the Manager just left the studio with a huge suitcase. They wouldn\'t tell anyone why, but I\'ve spied on them when they ordered a Taxi to 11 Amaranth Pl!', 'ninasms3.jpg') + receiveSMS('Nina', 'I bet they are gonna F-U-C-K. :D');
		return '';
	};
}
