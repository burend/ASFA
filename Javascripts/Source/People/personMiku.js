/**********************************************
Miku
the catgirl familiar

- No Master/Mistress Tag during the "She seems strangely casual about that“ part.
- The “Spend the night in your room” option after Miku moved in doesn't show up.
- Keanna won't stop following me after I brought her to the attic, None of her interactions with Miku trigger.

***********************************************/

function returnMiku()
{
	movePerson('Miku', 408);
}

function initialiseMiku()
{
	// Miku
	addPerson("Miku", 0, "Miku", '', false);

	per.isPersonInfo = function() { return this.other < 0; };
	per.getPersonInfo = function() {
		if (this.other == -100) {
			return this.addPersonString("mikucat4.jpg", "height:max%", "right") +
				"<p>Miku has settled in nicely into both your home and her new role as your familiar, though you are not exactly clear on the details of the later, yet.</p>" +
				"<p>The exact nature of her new abilities is still uncertain, but seems to be largely based on modifying spells you are able to use. For now, Miku is able to transform into a cat at will and often uses this ability to roam around at night and spy on the neighborhood for you. She is able to assume a fully human form as well, but prefers to stay as a human/cat hybrid when inside the house, and on occasion will display distinctively catlike behavior and instincts.</p>" +
				"<p>Miku has become deadly loyal to you, but still retains most of her free will. She can and will refuse orders if she doesn't feel like it, which is often the case, still won't speak about her time before moving to Glenvale, and still needs a lot of pushing to help with chores around the house, though it is getting better. She gets along well with Mom, Tracy and the other girls, but everyone under a charm-spell is prone to at one point become her plaything for a while.";
		}
		return this.addPersonString("miku7.jpg", "height:max%", "right") +
			"Of all the curious things about Miku, one probably stands out the most: How is that skinny girl able to eat so much?</p>" +
			"<p>To say she has a healthy appetite is an understatement, and ever since Miku moved in, you regularly have you restock the fridge in order to keep up with her raids.</p>" +
			"<p>On the plus side, she is a decent cook and does help out around the house, albeit reluctantly and not nearly as much as you would like.</p>" +
			"<p>Miku spends most of her time, when not at school, either studying in her room or on the internet, apparently doing research and arguing on witchcraft message boards.</p>" +
			"<p>You have come to know her a little better, but she keeps quiet about her family or life before making the move to Glenvale, and while you found her usually polite and restrained demeanor to not be entirely for show, Miku has a rather filthy mouth and can be very outspoken about her sexuality and opinions when she does not deem it to be a necessity to hold back, like most of the times when she is alone with you.";
	};

	per.getPossessionFace = function() { return this.other == -100 ? "mikuface-cat" : "mikuface"; };


	per.whereNow = function() {
		var hr = getHour();
		if (this.place != -1 && this.checkFlag(33) && ((hr > 5 && hr < 9) || (hr > 11 && hr < 16))) return 45;
		return this.place;
	};

	per.passTimeDay = function() {
		if (this.place === 0) {
			if (isCharmedBy("Abby")) this.place = 394;
		} else {
			findPerson("Ghost");
			if (this.place == 408 && per.place == 408) this.setFlag(30);
			this.setFlag(34, false);
			this.setFlag(35, false);
		}
		return '';
	};

	per.isPlaceImageRight = function()
	{
		return (Place == 394 && this.place == 394) || (Place == 45 && this.isHere() && sType === "");
	};

	per.showPlaceImageRight = function(md)
	{
		if (Place == 394 ) this.showPerson("miku2.jpg");
		else if (Place == 45) {
			if (getHour() < 12) this.showPerson("mikuface-kitchen1.jpg");
			else this.showPerson("mikuface-kitchen1.jpg");
		}
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 408 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) return this.showPersonString("mikucat5.jpg");
			if (this.other == -1) return this.showPersonString("miku9.jpg");
			return this.showPersonString("miku8.jpg");
		}
		return '';
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 408 && this.isHere()) {
			if (this.other == -100) {
				md.write(
					'<p>Your familiar, Miku, turns around and greets you with a polite bow. “Hello, ' + perYou.getPersonName() + ' Do you need my assistance with anything?”</p>'
				);
			} else if (this.other != -1) {
				md.write(
					'<p>Miku made sure to look as innocent as she can with her cute smile and pigtails, but you have really learned to be on your guard around her.</p>'
				);
			}  else {
				md.write(
					'<p>Miku stops what she was doing and greets you with a well executed curtsy when you enter the guestroom. “Hello, ' + perYou.getPersonName() + ' Any progress in your research?”</p>'
				);
			}
		} else if (Place == 45 && this.isHere()) md.write('<p>Miku is preparing some food and waves to you as you enter the room.</p>');
	};

	per.showEventPopup = function()
	{
		if (sType == "mikunightevent1")
		{
			// Night Encounter 1
			this.setFlag(23);
			showPopupWindow("Restless Night...",
				this.addPersonString("miku18.jpg", "height:max%", "right") +
				'You wake up in the middle of the night to get a glass of water and hear suspicious noises from the attic.</p>' +
				'<p>You open the door just a little and see Miku on her bed with a rather thick vibrator spreading her folds. She doesn\'t seem to notice you, or pretends not to, and you watch her for a few minutes as she pleasures herself with the toy before deciding to not stretch your luck and heading back to bed.',
				"sleepForNight()"
			);
			setQueryParams('');
			return true;
		}

		if (sType !== "") return false;
		
		// Futa reaction
		if (Place == 408 && this.isHere() &&!this.checkFlag(36) && perYou.isFuta(true) && !perYou.isBornMale()) {
			this.setFlag(36);
			showPopupWindow("Miku And Your Changes",
				this.addPersonString("mikucat5.jpg", "height:max%", "right") +
				'Something is... different about you."</p>' +
				'<p>Miku prowls around you like a, well, cat from the moment you enter the attic. "Your Aura has changed and it reminds me of... you have used the transformation spell on yourself, have you?"</p>' +
				'<p>You are surprised how easily she noticed, and confirm her suspicion by unceremoniously unpacking your new cock.</p>' +
				'<p>"What the..." Miku jumps back, then curiously inches closer. "You know a forbidden, potentially dangerous spell powered by a bound, possibly equally dangerous soul... and you use it to give yourself a cock?"</p>' +
				'<p>Miku kinda makes it sound like a bad thing, but she quickly shakes her head when you ask if she disapproves of what you did..</p>' +
				'<p>"I am not sure I am mentally able to really disapprove of anything you do, and I would never have been able to find out what I am without you using that spell. But I am still your familiar, I remember what almost happened during my transformation, and I..." She seems to almost struggle with the next words. "Fuck. I am worried about what might happen to you."</p>' +
				'<p>"You are the most important person in my life and I\'m scared shitless thinking about some ancient soul walking through the door wearing your body."</p>' +
				'<p>There is something in you that wants to put her in her place for criticizing you, but she has a point. You promise her to be careful and look for other means to power the spell.</p>' +
				'<p>"That is all I had hoped to hear." Miku smiles and knees down before you. "And since you already have it, it would be such a waste to not use it, on my ass, I mean." She looks up to you with puppy eyes... or kitty eyes. "Please?"'
			);
			return true;
		}	

		if (Place == 394 && this.place == 394 && !this.checkFlag(1)) {
			this.setFlag(1);
			showPopupWindow("Abby and Miku",
				this.addPersonString("miku1.jpg", "height:max%", "right") +
				"You are surprised to find that Abby already has a visitor when you arrive at her desk, and you easily recognize the girl as Miku Nakamoto-Richards, another Senior-Year student at Glenvale Grammar.</p>" +
				"<p>In the year since she had transferred to the school, Miku has often been the subject of gossip and rumors among many of the other students, especially Catherine and Amy.</p>" +
				"<p>She's a smart girl, polite and liked by most teachers, but pretty much a loner and known to be a little eccentric. Right now, she is wearing her very own school uniform, one of several she owns with some of them bordering on fetish cosplay.</p>" +
				"<p>She is said to have asked questions in biology class that made even Ms Logan blush with a completely innocent expression, and once nearly broke a students nose for telling her she's “So kawaii!” and calling her “Miku-chan”.</p>" +
				"<p>There are a lot of rumors floating around, especially regarding her sexuality, but there is little people actually know about her, and Miku seems to like it that way.</p>" +
				"<p>Still, one thing that is undeniable is that she is really cute, and you wonder just how many of the more scandalous rumors are true, or could be made true."
			);
			return true;
		}

		if (Place == 408 && this.place == 408) {
			// First encounter in the Attic
			if (!this.checkFlag(6)) {
				this.setFlag(6);
				this.charmedTime = nTime;
				showPopupWindow("Miku in the Attic",
					this.addPersonString("miku7.jpg", "height:max%", "right") +
					'<p>As you enter the guestroom, you find none other than Miku, standing in front of a mirror in a new uniform, which just happens to be short enough to flash her panties to you as she bends forward to supposedly do her make-up.</p>' +
					'<p>She pretends to not notice you for a few seconds before you cough to get her attention and she turns around to face you.</p>' +
					'<p>“Ah, finally home I see.” She performs an elaborate curtsy with probably one of the sweetest smiles you have ever seen. “I was wondering if you would show up at all, it looked like you were ready to fuck Abby for days straight when I left.”</p>'
				);
				return true;
			}
			// Meeting after Jesse visits
			if (!this.checkFlag(25) && this.checkFlag(24)) {
				this.setFlag(25);
				showPopupWindow("Miku Looks Worried",
					this.addPersonString("miku19.jpg", "height:max%", "right") +
					'<p>Miku looks tense as you enter the room, to put it mildly, her eyes immediately focusing on you. “That... thing is gone, is it?”</p>' +
					'<p>You assure her that Legion is gone and you stroke a truce of sorts with it, and it seems to put her somewhat at ease.</p>' +
					'<p>“I have never felt anything so powerful and... evil.” She paces through the room. “You need to find a way to deal with it... not just shoo it away, but deal with it for good.”</p>'
				);
				return true;
			}
			// Meeting about Keana
			if (!this.checkFlag(29) && this.checkFlag(30) && wherePerson("Ghost") == 408) {
				this.setFlag(29);
				this.setFlag(30, false);
				showPopupWindow("Miku and Keana",
					this.addPersonString("miku19.jpg", "height:max%", "right") +
					'<p>Miku is carefully observing Keana\'s ghostly shape as you enter the room and only slowly turns her attention to you.</p>' +
					'<p>“She is not very talkative, but from what I have gathered she is yours... sort of?”</p>' +
					'<p>You give Miku a short summary about Keana, her haunting of the hospital, how you bound her and why you decided to relocate her to your home. Miku listens with a mixture of astonishment and disbelieve to your tale, and finally throws her arms up in defeat.</p>' +
					'<p>“Fine... If she has to pick this room to haunt then so be it. It is not like she will take up space and this is not even one of the stranger things happening right now.” She folds her arms with a smirk. “But you really do fuck everything that moans, right?”</p>'
				);
				return true;
			}
			// Meeting about Keana
			if (!this.checkFlag(31) && this.checkFlag(29) && this.checkFlag(30) && wherePerson("Ghost") == 408 && this.other == -100) {
				this.setFlag(31);
				showPopupWindow("Your Familiar and the Ghost",
					this.addPersonString("mikucat4.jpg", "height:max%", "right") +
					'<p>The room feels...different when you enter, almost charged with a strange, supernatural presence while faint, sensual moans seem to reecho from every corner.</p>' +
					'<p>Keana\'s body is spread out on the bed and her face a grimace of lust and ecstasy while Miku has both hands stretched out and seems lost in deep focus. You try to speak to her, but she interrupts you with a harsh gesture, telling you to be quiet and watch.</p>' +
					'<p>Miku circles her fore- and middle fingers and you watch as Keana\'s body seems to be taken by an intense wave of pleasure, her lips spreading in a silent moan which echoes through the entire room a second later, and Miku, seemingly pleased with the effect, begins to let her hand vibrate slightly.</p>' +
					'<p>You observe Keana\'s ethereal body twitching on the sheets, her fingers clawing into the fabric, pulling it to her for a second only to lose focus and have them phase through again when another wave hits her.</p>' +
					'<p>Miku grins proudly and Keana\'s body jerks into an arch the moment her two fingers point upwards. She holds her second hand out with her palm up and allows it to tremble slightly, the motion directly affecting the ghostly woman, sending blissful shivers through her entire body which seem to rise in intensity with every second until she erupts into a climax powerful enough for even you to feel it.</p>' +
					'<p>Keana looks like she is heavily gasping for air, probably more of a reflex, but slowly calming down after Miku lowered her arms.</p>' +
					'<p>After a few seconds of resting, she floats towards Miku and presses a kiss to her lips, giving you a wink before phasing out to rest.</p>'
				);
				return true;
			}
			// Meeting the Vampyre
			if (!this.checkFlag(26) && isPersonHere("Vampyre")  && this.other == -100) {
				this.setFlag(26);
				showPopupWindow("Your Familiar and the Vampyre",
					"<img src='Images/People/VampyreLilith/vampbg.png' class='imgpopup' alt='Vampyre'>" +
					'<p>Miku tenses up the moment you and Lilith enter the attic, and you see her immediately bare her fangs towards the Vampyre with a loud hiss for about a second before she realizes what she just did and covers her lips with one hand.</p>' +
					'<p>“You have a malkblood as a pet?” Lilith asks with contempt in her voice. “They are not to be trusted, ' + perYou.getMaster() + '. You should put it in a bag and drown it in the nearest pond.”</p>' +
					'<p>“I am not to be trusted?!?” The comment seems to rile Miku up only more and she seems ready to pounce Lilith, but focuses on you instead. “This creature smells of death, she will betray you first chance she gets.”</p>' +
					'<p>“I have been nothing but honest about my intentions to my beloved ' + perYou.getMaster() + ', and still, ' + perYou.getHeShe() + ' seems to believe that I will make an exceptional servant.”Lilith smirks.” Maybe you are just worried that I will make you obsolete.”</p>' +
					'<p>You interrupt the pair before things have any chance of escalating and reaffirm your trust in Miku towards Lilith, as well as ordering her to treat your familiar with the respect she deserves, to which the vampyre reluctantly agrees.</p>' +
					'<p>It looks like not even the charm-spell will make these two get along anytime soon, though.</p>'
				);
				return true;
			}
		}

		if (Place == 45 && this.isCharmedBy() && (wherePerson("Mom") != 154 || isCharmedBy("Mom")) && (getHour() > 11 && getHour() < 16) && !this.checkFlag(33) && (wherePerson("Tracy") == 45 || wherePerson("Tracy") == 156)) {
			this.setFlag(33);
			findPerson("Tracy");
			var s = this.addPersonString("mikulunch2.jpg", "height:max%", "right") +
				'Something is rustling behind the kitchen-counter when you enter the room, and Tracy greets you with a light smirk on her lips.</p>' +
				'<p>“Hey little ' + per.getYourNameFor() + ', we\'re preparing lunch, care to help us?”</p>' +
				'<p>You look over the counter and see Miku in front of the fridge, on all fours, naked, and with a huge cucumber suggestively held in her mouth as she waves up to you.</p>' +
				'<p>Your eyes move to Tracy, and probably sensing what you intent to ask, she goes ahead.</p><p>';
			if (per.isCharmedBy("You")) s += '“She\'s quite cute, lil\' ' + per.getYourNameFor() + ',” She winks to you. “I\'ll have to work harder if I want to compete with her for your affection.”';
			else s += '“I don\'t mind, Mom might, but she is out of the house and the more girls willing to tease you, the better.”';
			s += 'There is a chuckle from the fridge, and Miku rises to her feet. “I figured you would like a change in dress-code, now that you have the run of the house.” She walks up to you, and whispers to your ear. “I\'ll hide the ears down here, just in case, they are harder to explain to possible strangers than a bunch of naked girls.”';
			showPopupWindow("Lunchtime!", s);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		if (sType === "") return false;

		var md, perAbby;
		
		if (Place == 40) {
			// Shower scenes
			if (sType == "showermiku") {
				md = WritePlaceHeader();
				addPlaceTitle(md, "Shower Interrupted By Miku", 'bath-home1.jpg');
				md.write(
					'<p>You are about to turn on the water when hear a knock on the door, followed by Miku\'s voice.</p>' +
					'<p>“Is anyone in there right now? And if there is, should I wait outside?”</p>'
				);
				startQuestions();
				addLinkToPlace(md, "tell her to wait", Place, 'type=showermikufinish');
				if (this.isCharmedBy()) addLinkToPlace(md, "allow her to come in", Place, 'type=showermikuenterc');
				else addLinkToPlace(md, "Allow her to come in", Place, 'type=showermikuenteru');
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showermikufinish") {
				md = WritePlaceHeader();
				perYou.showPerson("shower.jpg");
				addPlaceTitle(md, "Showering Alone");
				md.write(
					'<p>“Got it.”</p>' +
					'<p>Miku waits patiently until you are done and, to your surprise, doesn\'t even try to peek.</p>' +
					'<p>You catch a glimpse of her bathing suit when you finally leave the room, but not much else.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'leave the bathroom', 45);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showermikuenteru") {
				md = WritePlaceHeader();
				this.showPerson("miku-shower2.jpg");
				addPlaceTitle(md, "Showering with Miku");
				md.write(
					'<p>Miku seems surprised that you are already naked for about a second, but then proceeds into the bathroom unbothered, even making sure to have a long look at your body and specifically your ' + (perYou.isMaleSex() ? 'cock' : 'breasts') + ' as she waits for her turn.</p>' +
					'<p>It\'s strange to have someone watch you as intently as she does without making a single attempt at small talk or any indication that she wants to take it further, but in a way, it\'s also strangely arousing and you find yourself posing just a little more than once.</p>' +
					'<p>She obviously noticed that and gives you a sly grin as you leave the shower before entering herself, not bothered by your presence but also not taking off the bathing suit.</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'leave the bathroom', 45);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showermikuenterc") {
				md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
				if (perYou.isMaleSex()) this.showPerson("miku-shower3m.jpg");
				else this.showPerson("miku-shower3f.jpg");
				addPlaceTitle(md, "Showering with Miku");
				md.write(
					'<p>“I had hoped you would say that...” Miku peels herself out of her bathing suit on the way to the shower and gently wraps her arms around you, purring out the next word. “...' + perYou.getMaster() + '”</p>' +
					'<p>Miku eagerly nestles against your body, her arms wrapping around you and her lips pressing tender kisses to your chest and neck before you even get to turn on the water. She is very affectionate today and luckily didn\'t develop an aversion to water after her transformation. You enjoy the sensation of her soft skin rubbing against yours as you spread soap all over each other, but it quickly becomes obvious that she wants more.</p>' +
					'<p>“Well. Have you been a good Kitty?”</p>'
				);
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You whisper the words into her ear after pinning her body against the wall, your hard cock rubbing against her from behind, making her shiver and unwillingly emit a soft purr.</p>' +
						'<p>“The best!”</p>' +
						'<p>You chuckle softly as you feel her hip rubbing against you and finally slide into her.</p>' +
						'<p>You can\'t be as rough with her as she usually likes it on the slippery floor, but Miku seems to be more than happy to take it slow today, gasping and moaning softly with every motion of your hip and visibly trembling as you draw your fingers over her skin and further stoke her arousal by teasing her clit.</p>' +
						'<p>Her climax is a lot more subdued than usual, and yours follows shortly after, leaving both of you to rest in each others arms under the stream of warm water.</p>'
					);
				} else {
					md.write(
						'<p>You whisper the words into her ear after pinning her against the wall, drawing your soapy breasts over her back as she softly purrs out the answer:</p>' +
						'<p>“The best!”</p>' +
						'<p>Miku eagerly returns your affections, caressing your skin, kissing your neck and simply pushing against your body to spread the soap. You are taking turns using the shower head and your fingers to stimulate each other. Each motion driving you closer and closer to the peak until your finally share your climax and come to rest in each others arms.</p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, 'finish the shower together and get dressed', 40);
				WritePlaceFooter(md);
				return true;			
			}			
			return false;
		}


		if (Place == 394 && sType == "charmmiku1") {
			// Charm at the Aquarium Information Desk 1
			md = WritePlaceHeader();
			this.unCharmThem();		// Does not 'take'
			this.showPerson("miku2.jpg");
			addPlaceTitle(md, "Miku Under a Spell?");
			md.write(
				'<p>“Dai Chu, Miku!” You silently whisper the incantation and guide your mana into Miku\'s body in well practiced motions, though surprisingly, she doesn\'t react much at first, just looking around briefly as if she heard a faint noise.</p>' +
				'<p>You decide to observe for now. Miku\'s attention remains focused on Abby, but something seems to bother her after a while, and you watch as she curiously drives her fingers through her hair, down her neck and over her chest with a sensual gasp.</p>' +
				'<p>“Are you alright Miku?” Abby finally realizes that Miku has stopped paying attention to her and began to meticulously touch her own body, only stopping to answer her friends question.</p>' +
				'<p>“Yes. I am just... feeling a little hot...”</p>' +
				'<p>“Ohhh, that\'s how I felt the day I met ' + perYou.getPersonName() + '!” Abby beams. “' + (perYou.isBornMale() ? 'He' : 'She') + ' came in and murmured something and suddenly I felt really good and really wanted to assist ' + perYou.getHimHer() + ' with -everything- and it was a good thing, too, because up until then I was in a kinda grumpy mood because on the way to work there was this jerk with the green umbrella and he actually...”</p>' +
				'<p>Miku interrupts her by suddenly taking a step forward and pressing two fingers to Abby\'s lips. “It is alright, I just need to... sit down for a moment and try... something.” She looks at you. “You are ' + perYou.getPersonName() + ', right? Would you mind if I open my top a little?”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, "you don't mind that at all", 394, 'type=charmmiku2');
			WritePlaceFooter(md);
			return true;

		} else if (Place == 394 && sType == "charmmiku2") {
			// Charm 2
			md = WritePlaceHeader();
			this.showPerson("miku3.jpg");
			addPlaceTitle(md, "Miku Under a Spell");
			md.write(
				'<p>“Thank you.” Miku gives you a radiant smile as she opens the top of her uniform, allows herself to fall onto a nearby couch and, without a second of hesitation, takes off her panties.</p>' +
				'<p>You watch her with a grin as her eyes close and she wordlessly begins to finger herself, for once leaving Abby completely speechless.</p>' +
				'<p>“This is no good...” Miku exhales with a frustrated gasp, one hand still in-between her legs while the other begins to rummage through her pocket.” Where did, I... here it is!”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'leave her alone for now and watch the show', 394, 'type=charmmiku3');
			WritePlaceFooter(md);
			return true;

		} else if (Place == 394 && sType == "charmmiku3") {
			// Charm 3
			md = WritePlaceHeader();
			this.showPersonRorX("miku4.jpg");
			addPlaceTitle(md, "Miku Under a Spell");
			md.write(
				'<p>Miku actually carries a small vibrator in her pocket, so it looks like at least some rumors aren\'t completely unfounded. At least under the spell, she has no hesitation to spread her legs for you and Abby and press the little pink toy to her clit. “This is better....”</p>' +
				'<p>The two of you watch in silent fascination as Miku pleasures herself, her body sinking deeper into the couch with a series of cute moans while she circles the vibrator over her clit and slides it past her folds.</p>' +
				'<p>She is twitching with every little motion her hand makes while shamelessly putting on a show for you, her breathing slowly increasing in pace as she sensually winds herself on the couch and her motions grow faster, more erratic. You could almost swear she is not doing something like this for someone else for the first time.</p>' +
				'<p>“' + perYou.getPersonName() + '...” She suddenly calls out to you in a lust filled voice without opening her eyes. “Please help me cum... I need you... please...”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'help her', 394, 'type=charmmiku4');
			WritePlaceFooter(md);
			return true;

		} else if (Place == 394 && sType == "charmmiku4") {
			// Charm 4
			md = WritePlaceHeader(false, 'td-left-large');
			this.showPersonRorX("miku5.jpg");
			addPlaceTitle(md, "Miku Under a Spell");
			md.write(
				'<p>No one should say you are not one to help a maiden in distress, and after she begged so nicely it would be cruel to not help her finish.</p>' +
				'<p>Miku eagerly presents her pussy to you as you approach and you gladly push your fingers into her wet mound, twisting them a little and finally pushing in and out with rough, rapid motions.</p>' +
				'<p>“Yes... just like.... ahhhhhhh!” Miku almost screams in pure bliss from your touch, both of her hands clawing into the couch while her entire body convulses from her climax, and as she finally opens her eyes you have a few seconds to recognize the... green glow of the spell... right before you feel the spell infused mana rushing into your hand and back into your body...</p>'
			);
			AddMana(10);
			startQuestions();
			addLinkToPlaceC(md, '"Wait, what?"', 394, 'type=charmmiku5');
			WritePlaceFooter(md);
			return true;

		} else if (Place == 394 && sType == "charmmiku5") {
			// Charm 5
			md = WritePlaceHeader();
			this.showPersonRorX("miku6.jpg");
			addPlaceTitle(md, "Miku Under a Spell");
			md.write(
				'<p>It\'s too late to react now, the sudden rush of arousal hits you like a train and for a moment, you share some of Miku\'s climax. You feel your senses blur as a pleasant shiver spreads from your arm through your entire body, sending little electric shocks straight into your mind and muddling your thoughts.</p>' +
				'<p>You briefly notice Miku walking away from you with a sly grin, while Abby does her best to keep you from falling over.</p>' +
				'<p>You also notice that Abby\'s closeness is very enticing. Her smell, her warmth, her wonderful naked body close to yours... you know you can take her whenever you want, and you want her now...!</p>'
			);
			this.moveThem(408);
			startQuestions();
			startAlternatives(md);
			addLinkToPlaceC(md, 'give in and fuck Abby right where she stands', 394, 'type=charmmiku6a');
			addLinkToPlaceC(md, 'try to fight the urge', 394, 'type=charmmiku6b');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;

		} else if (Place == 394 && sType == "charmmiku6a") {
			// Give In
			md = WritePlaceHeader(false, perYou.isMaleSex() ? '' : 'td-left-large');
			perAbby = findPerson("Abby");
			perAbby.showPerson(perYou.isMaleSex() ? "abby13.jpg" : "abby14.jpg");
			addPlaceTitle(md, "Give In");
			md.write(
				'<p>You throw Abby onto the couch, nearly tear off your clothes and, simply put, fuck her.</p>' +
				'<p>You never wanted someone like this... needed someone like this! Abby is grinding her hip against yours as much as you allow her to while you pin her head down and roughly ' + (perYou.isMaleSex() ? 'push your cock in and out of her pussy' : 'grind your pussy against her lips') + '. Carnal lust and desire take over your mind with every motion, and despite the fact that you couldn\'t care less for her pleasure, her body reacts beautifully to your assault, screaming, moaning, clawing into the couch each time an orgasm wrecks through her and always ready for another round.</p>' +
				'<p>When your mind finally begins to clear, you look and feel like you just had one of the most intense physical workouts ever, but the memory of what exactly happened is weirdly blurry.</p>' +
				'<p>You are not sure if or how long Miku had been watching the two of you, but by now, she is clearly gone, and you are left confused about what she did.</p>'
			);
			startQuestions();
			WritePlaceFooter(md);
			return true;

		} else if (Place == 394 && sType == "charmmiku6b") {
			// Resisted
			md = WritePlaceHeader();
			this.setFlag(3);
			perAbby = findPerson("Abby");
			perAbby.showPerson("abby12.jpg");
			addPlaceTitle(md, "Resisting");
			md.write(
				'<p>You push Abby away and try to fight your rising desire, maybe control it, but it takes every ounce of will to not just grab her right where she stands and fuck her silly.</p>' +
				'<p>Your body feels like it is kept in a perpetual pre-climax, muscles twitching, heart racing, your mind filling with images of tits, cocks and pussies.</p>' +
				'<p>Part of you just wants to give in to these urges, and you are not sure what allows you to power through it, but whether it is the fear of loosing control or a desire to not give in to whatever that little minx did to you, you manage to clear your mind after... you are not sure how long.</p>' +
				'<p>Abby is looking at you with visible concern and only relaxes a little after you assure her you are alright, and Miku is, of course, nowhere to be seen.</p>'
			);
			startQuestions();
			WritePlaceFooter(md);
			return true;

		} else if (Place == 192 && sType == "asksarahmiku") {
			// Ask Sarah about Miku
			md = WritePlaceHeader();
			findPerson("Lauren").showPerson("lauren12.jpg");
			addPlaceTitle(md, "Asking Sarah about Miku");
			md.write(
				'<p>“A girl who might be distantly related to outsiders? An intriguing concept, is it not?” She looks to Lauren, who nods demurely.</p>' +
				'<p>“Well, our Family holds extensive records about the spellcasters we have met in our fights against Kurndorfs followers and other dangers, as well as any special skills they might posses...” She thoughtfully pulls in her lower lip, then turns to Lauren.</p>' +
				'<p>“Lauren, I believe the books we need are on the topmost shelf, gather them for us!“</p>' +
				'<p>“Yes, my Lady...” Lauren hesitantly moves towards the shelf, but not further, and nervously looks to Sarah.</p>' +
				'<p>“Lauren,” Sarah says sternly. ”We do not have all day, please hurry.”</p>' +
				'<p>The maid breathes out a defeated sigh, and as she climbs the bookshelf you get a good look at the reason for her hesitation: a lack of panties offering a good look at what is under her already much to short maid outfit.</p>' +
				'<p>It takes Lauren a bit of moving around to find the book she seeks, in part thanks to Sarah\'s less than optimal guidance, and as she finally hands it over, her head is a deep shade of red.</p>' +
				'<p>“This book is written in a very old dialect, I have a rough idea what we are looking for, but it will take us some time to find it.” She once again turns to Lauren. “Please, prepare some tea and a light snack for us, I am -very- interested in the girls special ancestry, and we may be here for a while.”</p>' +
				'<p>For a second, you think you see Lauren shiver uneasily, but as usual she quickly does as her mistress tells her.</p>'
			);
			startQuestions();
			addQuestionR(md, 'look through the book with Sarah',
				'“I believe this is what we are looking for.”After what felt like an eternity trying to understand ancient texts, Sarah presents you with a page detailing the nature of “familiars”.</p>' +
				'<p>“Witches are often said to be in league with familiars, and while assumptions what those supposedly are differed widely around the world, my ancestors note that those found in this part of the country were often feytouched humans.”</p>' +
				'<p>You point out that Miku is Japanese, but Sarah makes a rather compelling point that her family has been living here for a few generations  and it is not unlikely that creatures like the Sidhe and Kami share similar origins to begin with. The familiars in the book had an immense fine control of Mana, able to use it to shift form or manipulate spells to a large degree, but were unable to generate it themselves and suspect-able to be controlled, they were pretty much bred as servants to Warlocks and Witches. However, since Miku\'s bloodline has been diluted over the centuries, you would have to find a way to basically “Transform” her body to be more like the familiars of old.</p>' +
				'<p>You thank Sarah for her help, and she assures you that it has been a pleasure for her, only asking that you inform her more about any developments with “the feytouched girl” in return. ',
				"Sarah",
				"setPersonOther(\\'Miku\\',-10);setQueryParams()"
			);
			WritePlaceFooter(md);
			return true;

		}

		if (Place == 45) {
			if (sType == "tracymikulunch") {
				// Lunch with Tracy and Miku
				md = WritePlaceHeader();
				this.setFlag(34);
				var perTracy = findPerson("Tracy");
				var bLover = perTracy.getCharmedLevel() == 2;
				if (bLover) perTracy.showPerson("tracylunch1.jpg");
				else perTracy.showPerson(perTracy.isCharmedBy("You") ? "tracylunch2.jpg" : "tracylunch3.jpg");
				addPlaceTitle(md, "Lunch with Tracy and Miku");
				md.write(
					'<p>You and Tracy help out around the kitchen by cutting vegetables, stirring the meals and preparing the dishes while Miku happily coordinates your efforts. (Meaning: she is ordering you and Tracy around and really enjoying it)</p>'
				);
				if (bLover) {
					md.write(
						'<p>Miku really knows what she is doing, but the two make it hard for you to concentrate. There isn\'t a  single minute where Tracy won\'t stretch herself seductively or “accidentally” spill something on her breasts while Miku will crawl over the counter because it\'s “faster” or just happen to need to squeeze her naked body against you because she “needs” to reach a certain cabinet.</p>' +
						'<p>It\'s a wonder you get anything done, but you do, and you just happen to have some time to spare until everything is ready.</p>'
						);
				} else {
					md.write(
						'<p>Miku really knows what she is doing, and despite her tendency to crawl over the kitchen counter and slightly... eccentric ways to pass the time, it doesn\'t take long until everything just needs to cook a few minutes longer to be ready and you have some time to spare.</p>'
					);
				}
				startQuestions();
				addQuestionR(md, 'wait for the meal to be ready and eat',
					'You talk to both your sister and Miku for a while as you prepare the Table and dishes before you call down the other girls and have lunch together.</p>' +
					'<p>Miku gives you a kiss to the cheek and returns to the attic afterwards.',
					"",
					"setQueryParams()"
				);
				if (perTracy.getCharmedLevel() == 1) addLinkToPlace(md, 'let Miku and Tracy have some fun', 45, 'type=tracymikuafterlunch1');
				else addLinkToPlace(md, 'tell the girls to bend over the counter and present their asses', 45, 'type=tracymikuafterlunch2');
				if (bLover) {
					AddPeopleColumnMed(md);
					this.showPerson("mikulunch4.jpg");
				}
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "tracymikuafterlunch1") {
				// After Lunch with Tracy and Miku (Tracy not lover charmed)
				md = WritePlaceHeader();
				var perTracy = findPerson("Tracy");
				perTracy.showPerson("tracymikulunch1.jpg");
				addPlaceTitle(md, "Tracy and Miku Having Fun");
				md.write(
					'<p>You stay near the oven to stir the pots, and after a few moments of watching you, Miku turns to face your sister.</p>' +
					'<p>“Hey Tracy,” There is a mischievous gleam in her eyes. “Shall we have some fun while we wait?”</p>' +
					'<p>“Sure, what do you have in mind?”</p>' +
					'<p>“Oh, you will see.”</p>' +
					'<p>Miku takes Tracy\'s hand, sits down on a chair and pulls her into her lap. “It is good that you no longer wear clothes.” Her arms begin to wrap around your sisters body while she drags her fingertips over her skin. “It saves us a lot of time.”</p>' +
					'<p>Tracy exhales a surprised gasp, and you are pretty sure Miku uses her Mana to stimulate her the same way she often does when she is with you and watch from the corner of your eye as Tracy\'s body tenses up.</p>' +
					'<p>“W...what are you doing...” Tracy gasps as Miku\'s hands slip between her legs and pull them apart to reveal her glistering wetness to you, her chest heaving slightly.</p>' +
					'<p>“Testing your little ' + (perYou.isBornMale() ? 'brothers' : 'sisters') + ' resolve.” Miku gives you a wink, and her fingers push over your sisters nub and right into her slit, rolling back and forth over her intimate parts and luring sweet, passionate moans from her lips.</p>' +
					'<p>Miku was not kidding when she said she is testing you, and the two are hard to ignore. Tracy seems completely lost in her pleasure, her body sensually arched back against Miku and twitching with every moan, gasp and other noise she lures out of her while your body can\'t help but react to the sensuous display.</p>' +
					'<p>You feel your ' + (perYou.isMaleSex() ? ((perYou.isBornMale() ? 'manhood' : 'girl-cock') + ' pushing against your pants') : 'folds dampen') + ', and In the final moments, Miku places a hand on Tracy\'s mouth to muffle her moans while her fingers push deeply into your sisters body in rough, rapid motions to drive her towards a powerful climax.</p>' +
					'<p>As the two finally settle down, Tracy rolls her head to the side to share a tender kiss with Miku, and you just know that you will need a cold shower after lunch...</p>'
				);
				startQuestionsOnly();
				addLinkToPlace(md, 'have a quick shower', 45);
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "tracymikuafterlunch2") {
				// After Lunch with Tracy and Miku (Tracy lover charmed)
				md = WritePlaceHeader();
				findPerson("Tracy").showPerson("tracymikulunch2.jpg");
				addPlaceTitle(md, "Tracy and Miku Afters");
				md.write(
					'<p>For the last 30 minutes, the two have been acting as if they are in a sort of competition who of them is able to tease you better. (It may even be that way, Tracy and Miku get along well, but you know your sister can also get a little jealous, and Miku likes to needle her about it occasionally) and it\'s time to pay them back a little.</p>' +
					'<p>Miku and Tracy both line up on the counter, and you make sure to give both their asses a firm slap and berate them for taunting you like this, but judging from their giggling, they don\'t really plan on changing their behavior.</p>' +
					'<p>Though it\'s not like you actually want them to, you\'d miss opportunities like this if they did.</p>' +
					(perYou.isMaleSex() ? '“Well,” You finally begin. “Since you two are to blame for my hard on, one of you will help me get rid of it, and that one is...”' :
											'“Okay, you two kittens had your fun with me...” You walk between both of them and knead their asses with both hands. “And now it\'s my turn to play a little...')
				);
				startQuestionsOnly();
				if (perYou.isMaleSex()) {
					addLinkToPlace(md, 'enjoy Miku\'s Ass', 45, 'type=mikusass');
					addLinkToPlace(md, 'enjoy Tracy\'s Pussy', 45, 'type=tracyspussy');
				} else addLinkToPlace(md, 'give both of them a good spanking', 45, 'type=tracymikuspanking');
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "mikusass") {
				// After Lunch with Tracy and Miku (Miku's Ass)
				md = WritePlaceHeader();
				this.showPerson("mikulunch5.jpg");
				addPlaceTitle(md, "Miku\'s Ass");
				md.write(
					'<p>“Miku!” You announce your decision by firmly slapping both hands on her ass, and using your thumbs to spread her buttocks.</p>' +
					'<p>Tracy protests at first, but you quickly calm her down by allowing her to spread the lube over your cock and promising to make it up to her another time.</p>' +
					'<p>Yes, you now always have a tube of lube in the kitchen, it\'s needed quite often.</p>' +
					'<p>You finally push both hands against Miku\'s shoulders and roughly press her body against the counter before squeezing your lubed shaft into her rear with a groan, enjoying the tightness around you while your hip begins to roll forward</p>' +
					'<p>Tracy watches in fascination as Miku\'s fingers cling to the edge of the counter with what can only be described as a feline growl. Her face switches between pain, lust and pleasure, and you see from the corner of your eye how Tracy\'s fingers move between her legs as she begins to touch herself as well.</p>' +
					'<p>You place an encouraging slap on your sisters ass and trail your lube covered fingertips over her warm skin towards her pucker, and soon, the two girls lustful moans drown out nearly everything else as you roughly push your cock into Miku\'s rear and your fingers play with your sisters pucker.</p>' +
					'<p>Tracy is the first to reach her climax, feverishly rubbing her clit while her body twitches on the counter, and shortly after, you shoot your load into Miku\'s ass the moment her own orgasm takes her as well.</p>' +
					'<p>The three of you enjoy the afterglow until lunch is finally ready, and you get to sit down and eat... well, you and Tracy sit, at least.</p>'

				);
				startQuestionsOnly();
				addLinkToPlace(md, 'lunch is over', 45);
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "tracyspussy") {
				// After Lunch with Tracy and Miku (Tracy's Pussy)
				md = WritePlaceHeader();
				findPerson("Tracy").showPerson("tracymikulunch3.jpg");
				addPlaceTitle(md, "Tracy\'s Pussy");
				md.write(
					'<p>“Tracy!” You announce your decision by slowly drawing your fingers along your sisters folds and watching her shudder under your touch.</p>' +
					'<p>“Miku emits an audible groan, pulls her face into a disappointed pout and tells you to better give your sister a good pounding so she has something fun to watch at least.</p>' +
					'<p>Tracy blows her a cheeky kiss in response, and of course, you intent to not disappoint either of them.</p>' +
					'<p>Tracy spreads her legs and stretches herself as you open your pants, and her body shivers in anticipation when you begin to slowly drag the tip of your cock over her folds and clit and finally thrust into her waiting mound.</p>' +
					'<p>Your sister moans loudly as you bury the entire length of your shaft inside her with one swift motion, one hand pulling Miku a little closer while the other pins Tracy\'s neck to the counter.</p>' +
					'<p>You begin to roll your hip back and forth against your sisters ass and place a slap on Miku\'s butt-cheek. Both girls clearly approve, judging from the noise, and after a few slow thrusts to warm up, you are now taking Tracy with rough, fast strokes while one of your hands has pushed deeply into Miku\'s warm sex.</p>' +
					'<p>The two girls fill the room with a variety of lewd noises: moaning, gasping and occasionally letting out a cute yelp when you slap their rears. You make sure to keep both their arousal at peak, and while Tracy is the first who reaches her peak, Miku and yourself are not far behind and you pull back to spread your load all over your sisters ass-cheeks as you cum.</p>' +
					'<p>And not a moment to soon, the clocks signals that dinner is ready, and while Miku eagerly “cleans” Tracy\'s rear with her tongue, you take your food out of the oven and call everyone in for lunch.</p>'
				);
				startQuestionsOnly();
				addLinkToPlace(md, 'lunch is over', 45);
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "tracymikuspanking") {
				// After Lunch with Tracy and Miku (Spanking)
				md = WritePlaceHeader();
				findPerson("Tracy").showPerson("tracymikulunch2.jpg");
				addPlaceTitle(md, "A Spanking...A Spanking");
				md.write(
					'<p>You strike both the girls asses in a swift upward motion to send them into a jiggle.</p>' +
					'<p>“You two are impossible, you know that?” You place another, harsher strike on Miku\'s rear, and she moans in delight. “You know what naughty girls get?”</p>' +
					'<p>Tracy gasps as you slap her rear again, though you are more careful with her than with Miku. “Don\'t pretend you don\'t like it, sis....” She answers in a teasing voice, and it earns her another light spanking.</p>' +
					'<p>“Not the point.” You knead their rears and finally slip your fingers into both their folds. “Now be good girls for a change and let me blow of some steam.”</p>' +
					'<p>The two of them giggle, but are soon interrupted as you focus on the mana within them to heighten their sensitivity, sending them close to their peak for a few seconds only to draw back a little and listen to their frustrated moans as you spank them once more.</p>' +
					'<p>“This is cruel...” Tracy breathes out, and Miku follows up. “I love it.”</p>' +
					'<p>You chuckle softly and turn your attention back to your playthings, carefully alternating between light spankings (Heavier for Miku, she likes it a little more rough), stimulating their clits and pushing your fingers into their heat.</p>' +
					'<p>Soon, their screams and moans fill the kitchen, with both girls breathing heavily and holding each others hand.</p>' +
					'<p>With lunch almost ready, it is time to finish up.</p>'
				);
				startQuestionsOnly();
				addLinkToPlace(md, 'allow them to cum', 45, 'type=tracymikuspankingcum');
				addLinkToPlace(md, 'don\'t let them cum', 45, 'type=tracymikuspankingnocum');
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "tracymikuspankingcum") {
				// After Lunch with Tracy and Miku (Spanking)
				md = WritePlaceHeader();
				findPerson("Tracy").showPerson("tracymikulunch2.jpg");
				addPlaceTitle(md, "A Spanking...A Spanking");
				md.write(
					'<p>You push both hands deeply into their wetness to find their most sensitive spots, and with a little jolt of mana, send them, over the edge, their bodies tensing up simultaneously as they share a powerful climax and slowly come to rest, though it takes another slap before they thank you in unison.</p>' +
					'<p>Finally, you call the other girls and get to sit down and enjoy lunch together, on pillows, obviously.</p>'
				);
				startQuestionsOnly();
				addLinkToPlace(md, 'lunch is over', 45);
				WritePlaceFooter(md);
				return true;
			}

			if (sType == "tracymikuspankingnocum") {
				// After Lunch with Tracy and Miku (Spanking)
				md = WritePlaceHeader();
				findPerson("Tracy").showPerson("tracymikulunch2.jpg");
				addPlaceTitle(md, "A Spanking...A Spanking");
				md.write(
					'<p>You push the pair close to their peaks, let the sensation linger briefly and then simply withdraw and turn to the cooking pots.</p>' +
					'<p>Both girls seem confused at first, and after it took them a moment to gather their thoughts, Tracy is the first to speak. “But... we are not done!”</p>' +
					'<p>“Yes we are,” You smile to her. “This is a punishment, remember?” There is a brief moment of awkward silence and it looks like Tracy is about to protest, but Miku suddenly bursts out laughing. “You are learning, ' + perYou.getPersonName() + '. I love it when you play the strict mistress.”</p>' +
					'<p>Tracy seems less happy with what you did, but Miku shushes her, and whatever she just whispered to your sister seems to have lightened up her mood enough to let things go...</p>' +
					'<p>Conspiracy in your own house...! You have to give them another spanking, soon, but for now it\'s time to sit down and enjoy lunch... on pillows.</p>'
				);
				startQuestionsOnly();
				addLinkToPlace(md, 'lunch is over', 45);
				WritePlaceFooter(md);
				return true;
			}
		}

		if (Place != 408) return false;

		if (sType == "transformcat0") {
			md = WritePlaceHeader();
			this.showPerson("miku9.jpg");
			addPlaceTitle(md, "Transforming Miku");
			md.write(
				'<p>“Wait, we don\'t know exactly what this spell will do with my body, right?” You stop the incantation, and Miku grins as you admit you don\'t. “Well, I guess that means you are in luck.”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Miku turns around towards the mirror', 408, 'type=transformcat1');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformcat1") {
			md = WritePlaceHeader();
			this.showPerson("miku10.jpg");
			addPlaceTitle(md, "Transforming Miku");
			md.write(
				'<p>“I really like these clothes, and it would be a pity if something happens to them, right?” You watch Miku as she leans forward and pulls her panties down, wiggles her hips and lets them slide down to her knees. “You don\'t mind if I strip first?”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Not at all."', 408, 'type=transformcat2');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformcat2") {
			md = WritePlaceHeader();
			this.showPerson("miku11.jpg");
			addPlaceTitle(md, "Transforming Miku");
			md.write(
				'<p>“Great.” Miku spins around and lifts her skirt up to playfully wave it from side to side.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"You are not stalling, are you?"', 408, 'type=transformcat3');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformcat3") {
			md = WritePlaceHeader();
			this.showPerson("miku12.jpg");
			addPlaceTitle(md, "Transforming Miku");
			md.write(
				'<p>“I wouldn\'t dare.” Miku lets the skirt fall down and slowly begins to pull down her top.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'watch her', 408, 'type=transformcat4');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformcat4") {
			md = WritePlaceHeader();
			this.showPerson("miku13.jpg");
			addPlaceTitle(md, "Transforming Miku");
			md.write(
				'<p>“But this is my last striptease as a free woman, so shut up, and enjoy it!” She laughs and pulls the rest of the uniform down, folding her arms and teasingly wiggling her chest.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'make a “Zipper over your mouth” motion and enjoy the show', 408, 'type=transformcat5');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformcat5") {
			md = WritePlaceHeader();
			this.showPerson("miku14.jpg");
			addPlaceTitle(md, "Transforming Miku");
			md.write(
				'<p>Miku throws you a kiss and her uniform to the side while she performs a little spin to give you a good view of her body, something you have been waiting to get for a while now.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Looking Sexy"', 408, 'type=transformcat6');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformcat6") {
			md = WritePlaceHeader();
			this.showPerson("miku15.jpg");
			addPlaceTitle(md, "Transforming Miku");
			md.write(
				'<p>“I know!” Miku grins and lets herself fall into a nearby armchair, spreading out all limbs and stretching herself with a long, drawn out hum.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'compliment her', 408, 'type=transformcat7');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformcat7") {
			md = WritePlaceHeader();
			this.showPerson("miku16.jpg");
			addPlaceTitle(md, "Transforming Miku");
			md.write(
				'<p>“That was great!” You tell her, and Miku implies a short bow before taking off her collar, stockings and panties, straightening herself and looking at you.</p>' +
				'<p>“Thank you, I think I am ready now, let us proceed.”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'finish the incantation', 408, 'type=transformcat8');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformcat8") {
			md = WritePlaceHeader();
			this.showPerson("miku17.jpg");
			addPlaceTitle(md, "Transforming Miku");
			md.write(
				'<p>Miku closes her eyes as you once again cast the spell, and you feel the vibration of the Soul-bound crystal intensifying when you begin to draw on the power of the soul trapped within. You can feel the Mana spread through her form and begin the transformation.</p>' +
				'<p>“This feels... good, different to before, it... ohhhh!” Miku suddenly emits a sensual moan, her head rolling back as she gasps for air.</p>' +
				'<p>You ask if she is alright, and Miku quickly nods</p>' +
				'<p>“I didn\'t expect it to feel so... goooood....” Miku\'s fingers dig into the armchair while her body violently twitches around. You watch as goosebumps form all over her skin and her pussy-lips begin to shine with moistness, the smell of sex growing stronger, assaulting your senses as you begin to see the first changes on Miku\'s body, her teeth turning into sharp fangs and black fur spreading out from her neck over her upper body.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'the soul within the Crystal reaches out to her', 408, 'type=transformcat9');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformcat9") {
			md = WritePlaceHeader();
			AddImage("quartzglow1.jpg");
			addPlaceTitle(md, "Transforming Miku");
			md.write(
				'<p>You do not notice it at first, but the presence within the Soul-bound Crystal grows stronger as Miku\'s Transformation progresses, and soon, you feel the malice emanating from it, the will to wrest control of Miku\'s Transformation, probably Miku herself away from you.</p>' +
				'<p>You focus all your willpower on the Crystal to suppress it while Miku winds herself on the Armchair, her body convulsing with every subtle change, gasping moaning, screaming in pleasure. The fey-blood is strengthening, and you realize you need to act now and bind her to your will before it runs out of control.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'focus on suppressing the influence of the crystal first', 408, 'type=transformbadend');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "transformbadend") {
			md = WritePlaceHeader();
			this.showPerson("mikucat7.jpg");
			addPlaceTitle(md, "Overwhelmed");
			md.write(
				'<p>You focus all your energy into fighting the influence of the trapped soul, but you are unable to keep it from growing stronger and slowly tear control of the transformation and possibly Miku\'s mind away from you. Worse, you feel your mana draining and realize too late that Miku is actively drawing it from you now to further strengthen herself.</p>' +
				'<p>You make a last attempt to interrupt the spell, but it is no good, the last of your mana leaves your body and you feel a wave of satisfaction emit from the bound soul as a flash of light blinds you and the spell comes to an end.</p>' +
				'<p>As your vision clears, Miku looks different, her posture, her expression, her very aura has changed, and as she speaks, her voice has an unpleasant rasp to it.</p>' +
				'<p>“You did not bind me, and the one you thought to have imprisoned overpowered your will...” She says matter of factly, her eyes focused on you like a cat seizing up its prey as she approaches you with a weirdly sensual sway of her hip.</p>' +
				'<p>You try to back away from her, but your mind is taken by a near supernatural fear freezing you in place, and with a single, swift motion, she is suddenly right in front of you.</p>' +
				'<p>“Have no fear.” She whispers, and as her lips move close to yours you feel small strands of mana leashing out at your skin. “I may no longer feel the desire to serve you, but I still like you, and I want you to be my ' + perYou.getWitch() + '.”</p>' +
				'<p>You are unable to reply before her lips touch yours and your thoughts are drowned in a wave of pleasure. Soon, you return the kiss, carefully at first, but it does not take long until you eagerly dance with her tongue while your body melts into her embrace.</p>' +
				'<p>You notice how your thoughts are fading, your mind, no your very soul being consumed by your desires, but as she pushes you into the armchair and straddles you, you no longer care. Your arms wrap around the girl to pull her naked body against yours, unwilling to let her go as she drains the last independent thoughts from your mind...</p>'
			);
			addRestartLink(md);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmikucat1") {
			md = WritePlaceHeader();
			AddImage("quartzglow2.jpg");
			addPlaceTitle(md, "Charming Miku, your Familiar");
			md.write(
				'<p>You force the additional mana into Miku\'s body and her eyes open wide, instantly glowing in a bright green as the spell mixes with the mana already within her, reforming her body and seeping into her mind to bind her to you.</p>' +
				'<p>You feel the frustration from the soul within the Crystal as its influence over Miku wanes and your will overpowers it, and finally, with a bright flash of light, the transformation is completed.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'rub your eyes', 408, 'type=charmmikucat2');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmikucat2") {
			md = WritePlaceHeader(false, 'td-left-large');
			this.showPerson("mikucat1.jpg");
			addPlaceTitle(md, "Charming Miku, your Familiar");
			md.write(
				'<p>You are momentarily blinded by the light, and as your vision clears Miku is... gone...</p>' +
				'<p>Well, not quite, in her place a black cat is lazily lounging on the armchair, curiously looking at you and her surroundings before jumping off and walking around the room.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Miku?"', 408, 'type=charmmikucat3');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmikucat3") {
			md = WritePlaceHeader();
			this.showPerson("mikucat2.jpg");
			addPlaceTitle(md, "Charming Miku, your Familiar");
			md.write(
				'<p>Did the Transformation fail.... or succeed too well? Luckily, Miku does not leave you enough time to truly entertain these thoughts. The cats green eyes flare up and you watch as its body transforms back into the girl you know... well, mostly.</p>' +
				'<p>“Nyao...?” Miku looks around confused for a moment, then shakes her head. “Why did I... oh!” She drives her fingers over her new pair of cat ears and licks over her somewhat sharpened teeth.</p>' +
				'<p>“I am a fucking catgirl...” She laughs and turns to you. “A Japanese catgirl, no less. But It worked, I can feel your mana flowing through my body! I am able to sense and manipulate it. I am not sure to what extend, but this is exhilarating!”</p>' +
				'<p>You ask her if she feels any different, and it looks like she has to think about this for a moment.</p>' +
				'<p>“I think I am still me, well aside from a strange craving to hunt for meat and get belly-rubs...” She looks to you intently. “And a newfound sense of purpose.”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Purpose?"', 408, 'type=charmmikucat4');
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "charmmikucat4") {
			md = WritePlaceHeader(false, 'td-left-large');
			this.other = -100;
			this.showPerson("mikucat3.jpg");
			addPlaceTitle(md, "Charming Miku, your Familiar");
			md.write(
				'<p>“Yes, to help and assist you, my ' + perYou.getWitch(true) + '.” She smiles and lovers her head demurely. “I am your familiar now, I am spellbound to you and there are no doubts left that this is what I want to be. And I am not sure it is really only the spell making me feel this way.” Her smile turns into a smirk. “I also want you to finally fuck me, that is not a particularly new feeling, though.”</p>' +
				'<p>You reach out with one hand to caress her cheek, and she tenderly nuzzles into your palm.</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, '"I\'ll be happy to."', 408);
			WritePlaceFooter(md);
			return true;
		}

		if (sType == "fuck") {
			// Anal, male player
			md = WritePlaceHeader(false, 'td-left-large');
			this.showPersonRorX("mikusex1.jpg");
			addPlaceTitle(md, "Your Familiar\'s Ass");
			md.write(
				'<p>“You pull Miku closer and she immediately locks your lips into a deep kiss, playfully teasing your tongue with her own while you squeeze her buttocks with both hands, kneading them briefly and pulling them apart.</p>' +
				'<p>“Ohhh... are your hands implying what I think they are implying?” Miku asks with a wide grin, and as you confirm her suspicion, she wastes no time dragging you to the bed.</p>' +
				'<p>“You know how to make a girl happy, just let me take care of this.” Miku quickly helps you out of your clothes and uses her tongue and hands with well practiced motions to get you hard and apply lube, which you found she always has a bottle of next to the bed, just in case.</p>' +
				'<p>She turns around, and in a single, quick motion, you unceremoniously push your entire length into her tight rear.</p>' +
				'<p>Miku releases a brief, decidedly feline, groan of discomfort when you pin her head down, place a firm slap onto her cheeks and begin to slowly push in and out of her ass. You enjoy her tightness and the way her muscles twitch while you pick up pace, and soon she begs you to go even harder, grab her hair and slap her face.</p>' +
				'<p>It is often quite a workout to satisfy her desires, but in the end, she always enjoys a powerful climax and happily snuggles up against you with a soft purr.</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, 'talk more with Miku', 408);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "bj") {
			// Oral, male/female
			md = WritePlaceHeader(false, perYou.isMaleSex() ? '' : 'td-left-large');
			if (perYou.isMaleSex()) this.showPersonRorX("mikusex2b.jpg");
			else this.showPerson("mikusex2g.jpg");
			addPlaceTitle(md, "Your Familiar\'s Mouth");
			if (perYou.isMaleSex()) {
				md.write(
					'<p>Miku pretty much knows what you want of her the moment you order her to knee down, and she eagerly licks her lips in anticipation.</p>' +
					'<p>You unzip your pants and begin to stroke your manhood, while she moves her arms to her back and opens her mouth wide on your order, barely moving until you are ready to simply push into her mouth.</p>' +
					'<p>You have quickly learned that Miku likes it a rough and were worried about her sharp teeth, at first, but the two of you have learned to adjust and she is pretty good at it. One of your hands is taking a hold of her hair, the other reaching for her cat ear to keep her head in place as you push your cock directly into her throat and rest for a few seconds. You hear gagging noises and a groan of discomfort, but overall, you know she is able to take your entire length with no problems, and after remaining like this for a few seconds, you begin to move your hip back and forth.</p>' +
					'<p>Miku looks up to you with her eyes wide open, and you can feel her unusually rough tongue shifting around to caress the underside of your cock. The sensation is simply amazing! You suspect that she is using small concentrations of mana to heighten your sensitivity, and it only drives you to push into her even harder.</p>' +
					'<p>You occasionally allow her a moment to catch her breath, but never fully stop pushing in and out of her mouth until you feel your climax approaching and Miku straightens her body in expectation, sticking out her tongue just as you pull back and spray your load into her mouth and over her face.</p>'
				);
			} else {
				md.write(
					'<p>You quickly undress and tell Miku that you need her help to unwind a little before you simply let yourself fall onto her bed and beckon her closer.</p>' +
					'<p>Miku doesn\'t need a lot of convincing to join you and crawls onto the bed on all fours with a playful purr on her lips, her eyes focused on you as if moving in on her prey while she spreads your legs and slowly drives her tongue over your folds, sending a pleasant shiver into your body.</p>' +
					'<p>Miku doesn\'t have quite the experience in pleasing women as she claims to have with men, and you were worried about her teeth at first. But she is still skilled when it comes to using her, unusually rough, tongue on you, playfully flicking it over your clit while her fingers spread your folds to tease you further.</p>' +
					'<p>It doesn\'t take her much to get you wet and even less time to make you moan and gasp for air, her tongue feeling unusually rough and you suspect that she occasionally sends small sparks of mana into you to raise your sensitivity, and it\'s hardly something you would complain about.</p>' +
					'<p>As you reach your climax, you find yourself covered in sweat and your body trembling all over while Miku snuggles up against your side, with a very relaxing purr.</p>'
				);
			}
			startQuestionsOnly();
			addLinkToPlaceC(md, 'talk more with Miku', 408);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "toysher") {
			// Use toys on her, female player
			md = WritePlaceHeader(false, isExplicit() ? 'td-left-large' : '');
			this.showPersonRorX("mikusex4.jpg");
			addPlaceTitle(md, "Toying With Your Familiar");
			md.write(
				'<p>You guide Miku to the bed, and with a light shove, she lets herself falls back and teasingly spreads out her limps for you.</p>' +
				'<p>“I like it when you are forceful.” She coos happily as you strip out of your own clothes and crawl on top of her, your lips resting above hers.</p>' +
				'<p>“And I like to be forceful.” You barely touch her lips during your brief kiss before your own slide down to her chin and you press both hands on her shoulders to lift your body back up. Your fingertips slide down while you focus on the mana in her body and strengthen the spell over her.</p>' +
				'<p>Miku might have a lot more control over your spell than anyone, but it is still your spell, and with a little focus, you easily raise her arousal to a point where it is hard for her to fight back.</p>' +
				'<p>You spread Miku\'s legs in a single, swift motion and watch as her expression changes. Her eyes widening, her lips parting as she gasps for air, and her chest starting to twitch with every breather taken while you trail your fingers over her folds and flick over her clit. A smile forming on your lips as you reach into her toy-box, take out one of her toys and begin to insert it into her.</p>' +
				'<p>In the next minutes, you make sure to keep Miku\'s arousal at peak, trying out one toy after another from nipple clamps to small suction cups and watching her with delight as she twitches, moans, screams in a weirdly feline way and begs occasionally, continuously being driven close to her peak but never quite allowed to reach it, until you finally decide to push her over the edge and realize just how loud this petite woman can be.</p>'
			);
			startQuestionsOnly();
			addLinkToPlaceC(md, 'talk more with Miku', 408);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "toysyou") {
			// Use her toys on you, female player
			md = WritePlaceHeader(false, 'td-left-large');
			this.showPerson("mikusex3.jpg");
			addPlaceTitle(md, "Your Familiar Toys with You");
			md.write(
				'<p>Miku helps you strip, guides you to lay down on her bed and crawls on top of you. You gasp as her fingers interlock with yours and she pushes your arms down above your head, both your lips meeting for a soft kiss while you feel her grip relaxing, and before you are really able to say anything, both your hands have been shackled to the bedpost.</p>' +
				'<p>“Just trust me, you will love this.”</p>' +
				'<p>Her lips remain close to your own as she whispers those words, and as she once again kisses you, you feel the familiar sensation of mana seeping into your body. Within seconds, your heartbeat quickens and you feel your folds twitching. Miku\'s body feels... closer, more present, every single motion of her slender form amplified a thousandfold as her fingertips slide over your armpits to your side and back up, and as her thumbs flick over your nipples, it\'s like a burst of electricity is shot into your body.</p>' +
				'<p>Green and pink streams of glowing mana have formed between your lips and disperse as she pushes her body up and breaks the kiss, leaving you gasping for air, your tongue subconsciously trailing over your lips, desperate to feel her again.</p>' +
				'<p>Miku grins down to you, her fingertips sending shivers through your entire body as she drives them over your stomach and spreads your legs to expose your folds to her.</p>'
			);
			if (!isDay() && wherePerson("Ghost") == 408) {
				md.write(
					'<p>Your eyes are unfocused and your mind still taken by the flood of sensations, but you can see Keana\'s ghostly form floating over you after Miku beckoned the so far passive ghost over to help her out.</p>' +
					'<p>You moan as her fingers take solid form to knead your breasts while Miku presses a little vibrator against your clit, and from then on, the two of them greatly enjoy toying with you. Minutes pass and you are carried from one climax to the next as Miku plays with a variety of beads, clamps and vibrators. 2 pairs of hands caress your body and 2 pairs of lips cover your skin in soft kisses.</p>' +
					'<p>As they are finally done with you are barely able to think straight for a while, basking in the afterglow of your last climax with one of your girls in each arm while your mind slowly clears.</p>'
				);
			} else {
				md.write(
					'<p>You get a glimpse of the long, ribbed vibrator a second before she pushes it into your folds and your body begins to strain violently against the shackles with a loud moan. Two clamps snap close around your nipples, but at this point you barely feel any pain, just the sudden rush of adrenaline pushing you even deeper into ecstasy.</p>' +
					'<p>Miku seems pleased with your reaction, her fingers circling around your navel, leaving small tickles of mana in its wake, and as she drives down your stomach and briefly graces your clit, the sudden jolt she sends into your body is enough to push you into your first climax.</p>' +
					'<p>More are to follow as she continues to play with you, switching toys, caressing your skin and covering your body in warm kisses.</p>' +
					'<p>As your last orgasm hits, you are barely able to get up, gasping heavily for air as Miku crawls into your arms and snuggles against you, emitting a soft, relaxing purr while your mind drifts off.</p>'
				);
			}
			startQuestionsOnly();
			addLinkToPlaceC(md, 'talk more with Miku', 408);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 45 && this.isHere()) {
			if (getHour() > 11 && !this.checkFlag(34) && sType === "") addLinkToPlaceC(md, 'help Miku and Tracy prepare lunch', 45, 'type=tracymikulunch');
			return;
		}

		if (Place == 394) {

			if (this.isHere() && !this.checkFlag(2)) {
				addQuestionR(md, 'greet the pair',
					'The two of them greet you, but while Abby instantly shifts the topic towards her &quot;relationship&quot; with you, you are still not really getting much of a word in.</p>' +
					'<p>At least she is praising you quite a lot, and while Miku occasionally shoots you a curious glance, she remains mostly focused on her friend.',
					"",
					"setPersonFlag(\\'Miku\\',2)"
				);
			} else if (sType == "charmmiku6a") {
				addQuestionR(md, 'ask Abby what happened',
					'&quot;We had the best sex ever!&quot; Abby answers surprisingly concise, you must have taken more out of her than you realize. &quot;You were really passionate, enthusiastic and unusually, well, rough, did Miku do something to you?&quot;</p>' +
					'<p>She likely did, but you are honestly not sure what.',
					"Abby",
					"setPersonFlag(\\'Miku\\',4);setQueryParams()"
				);
			} else if (sType == "charmmiku6b") {
				addQuestionR(md, 'ask Abby what happened',
					'&quot;Well... something seemed to affect Miku and she suddenly started masturbating, and then you looked like you really needed to masturbate, too, but didn&rsquo;t.&quot;</p>' +
					'<p>&quot;Maybe it has something to do with what you did the day we met? I often have felt the need to touch myself since then, especially when I think of you, just the other day I was showing a group of  visitors around, so I had to get dressed again, stupid outdated regulations, you know? And there was...&quot;' +
					'<p>You quickly interrupt Abby before she is able to really get going again, the last thing you need now is another endless torrent of words...',
					"Abby",
					"setPersonFlag(\\'Miku\\',4);setQueryParams()"
				);
			} else if (this.checkFlag(4) && !this.checkFlag(5) && wherePerson("Abby") == 394) {
				addQuestionR(md, 'ask if Miku has any Magical skills Abby knows of',
					'&quot;No... well, she is very interested in the occult, but she does not often talk about it... actually, she does not talk a lot in general when we are together, I wonder why, I mean, come to think of it, she must be leading an exciting life, one day, we were out shopping and when we entered that clothing ' + getShopStore() + ', you know, the one close to the antique ' + getShopStore() + ' where they sell those cute lamps, actually, did I tell you my mom once...&quot;</p>' +
					'<p>You once again have to interrupt Abby before she gets too caught up in what she wanted to say, and you somehow have a good idea why Miku never speaks much when the two are together.',
					"Abby",
					"setPersonFlag(\\'Miku\\',5)"
				);
			}
			return;
		}
		if (Place == 408 && this.isHere()) {
			switch (this.other) {
			case 0:
				addQuestionR(md, 'ask Miku why she is here',
					'&quot;I figured I might as well pay you a visit, learn a little more about the person who magically enslaved one of my best friends and probably may be my own future ' + perYou.getMaster() + ' as well.&quot;',
					"Miku",
					"setPersonOther(\\'Miku\\',1)"
				);
				return;

			case 1:
				addQuestionR(md, 'she seems strangely casual about that',
					'&quot;Abby needed to get laid.&quot; Miku answers bluntly. &quot;She is a really great girl, helpful, good-looking, really extroverted, but she tends to overthink the whole &quot;sex&quot; thing, get needlessly attached and scare potential partners away.&quot;</p>' +
					'&quot;Something uncomplicated is just what she needs, and as long as you treat her well, I don&rsquo;t mind if she\'s yours.” She looks you over.</p>' +
					'&quot;And as far as the ones with an affinity for Magic I\'ve met so far go, you seem like a more interesting choice for a ' + perYou.getMaster() + '.&quot;',
					"Miku",
					"setPersonOther(\\'Miku\\',2)"
				);
				return;

			case 2:
				addQuestionR(md, 'ask her what she did back at the aquarium',
					'“You mean when you tried, and failed, to turn me into your personal sexslave?” Miku gives you a cheeky grin. “I am not sure myself, I think I used the mana you infused me with to transfer my own arousal to you? It\'s the first time someone actually used a spell on me and I just...winged it?”</p>' +
					'<p>She seems pretty proud of that.</p>' +
					'<p>“If it\'s any consolation, the spell was already dispersing and would have likely failed anyway, I seem to have an affinity for Mana, but I can not hold or generate it.”',
					"Miku",
					"setPersonOther(\\'Miku\\',3)"
				);
				return;

			case 3:
				addQuestionR(md, 'an affinity for Mana?',
					'“Yes, I can sense it if I am close to someone, I know some of our teachers and library staff have become affected by spells in the past days, and I know of at least one student who is likely a warlock... he creeps me out, though, his mana feels... wrong.”</p><p>' +
					(isCharmedBy("Tracy") ? '“Miku smirks” I also know that you charmed your sister, good choice, I bet she is great in bed.”' :
												 '“I can also see that you have yet to charm your sister, why the hesitation? She is sexy.”'),
					"Miku",
					"setPersonOther(\\'Miku\\',4)"
				);
				return;

			case 4:
				startAlternatives(md);
				if (isCharmedBy("Tracy", "Davy")) {
					addQuestionR(md, 'tell her you didn\'t charm Tracy',
						'“Well, someone did and is likely having lots of fun fucking her, so you might want to be careful when she is around.”',
						"Miku",
						"setPersonOther(\\'Miku\\',5)"
					);
				}
				if (isCharmedBy("Tracy", "You")) {
					if (getCharmedLevel("Tracy") == 1) {
						addQuestionR(md, 'tell her it\'s only to protect her, you don\'t have sex with her',
							'“Sure, and watching her parade her cute naked ass around the house is just a bonus, hmh?” She smirks.”</p>' +
							'<p>“Sooner or later you are going to give in to temptation, why torture yourself and delay it?”',
							"Miku",
							"setPersonOther(\\'Miku\\',5)"
						);
					} else {
						addQuestionR(md, 'confirm it, you are having sex with your sister',
							'"She is a cutie is she?" Miku has a wide grin on her face. "I would do the same if she was my sister, so your secret is safe with me."</p>' +
							'<p>"If you are bothering to keep it secret, that is."',
							"Miku",
							"setPersonOther(\\'Miku\\',5)"
						);
					}
				}
				if (!isCharmedBy("Tracy")) {
					addQuestionR(md, 'she\'s your sister, of course you won\'t charm her!',
						'Miku scoffs. “It\'s just sex, use protection so she won\'t get pregnant and enjoy yourself. You can\'t tell me you don\'t want her, she seems like the teasing type to me.”<p>' +
						'<p>You tell her to drop the topic, and Miku just shrugs. “It\'s your choice, really, just giving advice.”',
						"Miku",
						"setPersonOther(\\'Miku\\',5)"
					);
				}
				addQuestionR(md, 'what you do with your family is not her business',
					'“It\'s okay, I\'m not judging, it\'s your family, and you may be as perverted or conservative with them as you want to be.”</p>' +
					'<p>You glare at Miku and she finally falls quiet on the topic.',
					"Miku",
					"setPersonOther(\\'Miku\\',5)"
				);
				endAlternatives(md);
				return;

			case 5:
				addQuestionR(md, 'ask her more about her abilities',
					'“It is likely hereditary, but does not manifest in every generation, at least my parents pretend to not know what I\'m talking about when I ask about it.” Miku pulls an annoyed face.</p>' +
					'<p>I have done a lot of digging online about magic and the history of witchcraft, joined a few message boards where people claim to have been affected by spells, and finally decided to make the move to Glenvale, a town with one of the most colorful magical histories in the country.”</p>' +
					'<p>“It turned out to be a good decision, by the way. This is probably the only place where a schoolteacher holds an entire lesson about Mana and how to acquire it.” she chuckles. “Mr Beasley is a good source of information if you do it right, but when I tried to use one of these...” She holds up a rustic stone. “...in the wild ranges, the mana generated just... well, faded.”</p>' +
					'<p>She offers the stone to you. “You can have it, by the way, it should make up for the Mana you lost when you tried to control my mind and have sex with me.” Miku smiles sweetly. ”You pervert.”',
					"Miku",
					"setPersonOther(\\'Miku\\',6)"
				);
				return;

			case 6:
				if (perYourBody.NoItems < perYourBody.MaxItems) {
					addQuestionR(md, 'take the stone',
						'You take the stone and feel like you should argue the whole “pervert” thing, but she kind of has a point, and Miku does seem strangely okay with you trying to take over her mind.</p>' +
						'<p>“Great, so, now that this is settled, let us talk about me moving in and you finding a way to actually succeed in turning me into your personal sex-slave slash girlfriend.”',
						"Miku",
						"setPersonOther(\\'Miku\\',7);perYourBody.PutItem(6)"
					);
				} else {
					addQuestionR(md, 'take the stone',
						'You take the stone and feel like you should argue the whole “pervert” thing, but she kind of has a point, and Miku does seem strangely okay with you trying to take over her mind.</p>' +
						'<p>As you try to put the stone into your bag, you find it already overloaded, so you simply place it on a cupboard.',
						"Miku",
						"setPersonOther(\\'Miku\\',7);PlaceI(6)"
					);
				}
				return;

			case 7:
				addQuestionR(md, 'she wants to be charmed?',
					'“What, are you surprised someone actually wants to be your toy?” Miku chuckles bemused. “Well, it is not completely altruistic, of course.”</p>' +
					'<p>“By finding out how to charm me, you will likely also find out more about my bloodline and abilities, probably even help me find my full potential, and if you can do that, I\'ll happily be your plaything.”</p>' +
					'<p>You are not fully convinced this is a trade she would willingly make, so she elaborates further.</p>' +
					'<p>“Well, I also really enjoyed the little taste of being under your spell, and Abby looks happy, too. It\'s a pretty blissful experience: a clear purpose, no concern what “polite society” may think of your sexuality or fetishes, and sex will always feel amazing, no matter how absolutely mediocre the spellcasters actual performance may be.”</p>' +
					'<p>Miku smiles sweetly, and you decide to not comment on the clear jab towards you, she\'ll see.',
					"Miku",
					"setPersonOther(\\'Miku\\',8)"
				);
				return;

			case 8:
				addQuestionR(md, 'wait, moving in?',
					'You ask if you heard correctly and Miku confirms it. “I am willing to put my entire life into your hands, that is quite a commitment. So yes, I want to get to know you first, see what kind of person, ' + perYou.getWitch(true) + ' or lover you are.”</p>' +
					'<p>You pry further if this will not be a problem with her parents or current lodgings, and Miku shakes her head. “Let us just say I do not have much contact with my parents right now and it is for the better, okay?” She seems a little annoyed by the topic.</p>' +
					'<p>“I am not going to beg, but this is non-negotiable, if you want to put me under your spell, I want to know if you are suited to have me. And I believe that I am a pretty good catch, even without my potential magic skills. “Miku spins around with a grin.”',
					"Miku",
					"setPersonOther(\\'Miku\\',9)"
				);
				return;

			case 9:
				startAlternatives(md);
				if (isCharmedBy("Mom")) {
					addQuestionR(md, '"Alright, we have a deal, you can live here, It\'s not like anyone will protest"',
						'“Yes, I noticed you are pretty much the ' + perYou.getMaster() + ' of this house, good call, by the way.” She winks to you and smiles happily. “I will gather my things and get the room ready. This will be exciting!”',
						"Miku",
						"movePerson(\\'Miku\\',999);setPersonOther(\\'Miku\\',-1);startTimedEvent(\\'returnMiku()\\',12)"
					);
				} else {
					addQuestionR(md, '"Alright, I will have to discuss this with my Mom, but it should not be a problem"',
						'“You have yet to charm your Mother?” Miku looks at you incredulously. “You do know she is really hot, right?”',
						"Miku",
						"setPersonOther(\\'Miku\\',10)"
					);
				}
				addQuestionR(md, '"No deal, Money is tight as it is without her freeloading"',
					'“Hmh, a pity, but as I said, I will not beg, and there are other spellcasters to turn to.”</p>' +
					'<p>Miku looks disappointed, but remains firm in her stance. “Goodbye, and good luck with your harem building.”</p>' +
					'<p>She gives you a polite bow and leaves the room, likely not to be seen again.',
					"Miku",
					"movePerson(\\'Miku\\',1000);setPersonOther(\\'Miku\\',-1)"
				);
				endAlternatives(md);
				return;

			case 10:
				startAlternatives(md);
				addQuestionR(md, '"She\'s my mother, for god\'s sake!"',
					'This suggestion is not even funny, you shut down any form of discussion Miku might want to start over the topic and she accepts it, reluctantly. She does point out, however that you sooner or later will have to make a choice when your mom finds out more about what you are doing.</p>' +
					'<p>Finally, she leaves to get her belongings.',
					"Miku",
					"movePerson(\\'Miku\\',999);setPersonOther(\\'Miku\\',-1);startTimedEvent(\\'returnMiku()\\',12)"
				);
				addQuestionR(md, '"She is kinda sexy, is she...?"',
					'Miku notices your hesitation and grins, pointing out that you are in a unique position to fulfill any desire you may have and should do so, as well as how everything will be much easier once everyone in the house is under your control.</p>' +
					'<p>You have to admit that she has a point... but still, you are talking about your mother here.</p>' +
					'<p>For now, though, Miku doesn\'t press the issue further and leaves to gather her things.',
					"Miku",
					"movePerson(\\'Miku\\',999);setPersonOther(\\'Miku\\',-1);startTimedEvent(\\'returnMiku()\\',12)"
				);
				endAlternatives(md);
				return;

			case -10:
				addQuestionR(md, 'review your findings with Miku',
					'“So, you say one of my ancestors was someones familiar? Like a Raven? I am not going to grow feathers, am I?” Miku doesn\'t look like she is entirely convinced, but after you lay out everything you found out, she seems to accept the possibility.</p>' +
					'<p>“So, my bloodline has been bred to serve those who are able to generate mana... not what I had hoped for, but this explains a lot.”</p>' +
					'<p>You ask if she is sure she still wants to go through with this, and Miku gives a determined nod.</p>' +
					'<p>“Yes I am.” She chuckles. “Outside of the bedroom, I have never been a particularly submissive girl, even if my parents -really- wanted me to be. And yet, there is something that draws me to you. I have felt it in others, too, like sir Gates when I visited him shortly after arriving in Glenvale or more recently...” She swallows as if having a hard time saying it “...Davy Robins. But you... there is something special about you, and I\'m pretty sure others feel that as well, so If I\'m to be anyone\'s familiar, then I choose to be yours, that much control I am able to exert over my life.” She says with determination.</p>' +
					'<p>“And who knows what we are going to unleash, the thought that I may be close to unlock my true potential is exciting.”',
					"Miku",
					"setPersonOther(\\'Miku\\',-11)"
				);
				return;

			case -11:
				if (!isSpellKnown("Transform")) {
					addQuestionR(md, '"I still need to find a spell able to transform you, though"',
						'“Right, then hurry up and find it!” Miku blurts out in excitement, then smiles sweetly” Uhm... please?”',
						"Miku"
					);
				} else if (perYourBody.FindItem(52) === 0 || perKurndorf.getQuestRitual() < 200) {
					addQuestionR(md, '"We still need a Soul-bound Crystal"',
						'“I wish I would know what that is, but I will check the message boards if anyone does while you do your thing running around.”',
						"Miku"
					);
				} else {
					addQuestionR(md, '"Well, we have everything we need for the transformation"',
						'“Right.” Miku takes a calming breather and steadies herself. “This is it then, I... think I am as ready as I will ever be for this, let us do this.”',
						"Miku",
						"setPersonOther(\\'Miku\\',-20)"
					);
				}
			}
			if (this.other < 0 && this.other > -20) {
				// Moved in but not completed the research
				addQuestionRO(md, 'spend some time with Miku',
					'You spend some time comparing your findings and chatting for about an hour. Miku is rather inquisitive regarding your sex-life, and while you make sure to not spill every secret about your harem, she does manage to learn more about you than you learn about her, you believe.',
					"Miku",
					"WaitHereOnly(12)"
				);
				if (!this.checkFlag(8)) {
					addQuestionR(md, 'ask why she is acting so different at school or among other people',
						'“It is what people expect of a girl, is it not? Guys like to feel like they are these great pussy-conquerors, so us girls are supposed to pretend to be all shy and pure and hard to get so they keep that illusion.”</p>' +
						'<p>' + (perYou.isMaleSex() ? '“Uh, no offense, by the way.”' : '“You probably know what this is like, right?”') + '</p>' +
						'<p>“If you dare to admit that you actually like sex, you are immediately branded a slut, obviously have no standards and fuck everyone because people are fucking idiots.” She emits an annoyed sigh, the topic seems to hit close to home.</p>' +
						'<p>“With you, though, I simply do not feel the need to... hide my tastes. You are running around using magic to get people to have sex with you, after all, and we are kind of working on turning me into your plaything as well.”</p>' +
						'<p>“So, it is just nice to not bother for a change.”',
						"Miku",
						"setPersonFlag(\\'Miku\\',8)"
					);
				}
				if (!this.checkFlag(16)) {
					addQuestionR(md, 'ask about her family',
						'“My father is a fairly strict company man and my mother a submissive housewife to him, they are not here, I am quite happy they are not, and this is all I\'m willing to say for the moment.”',
						"Miku",
						"setPersonFlag(\\'Miku\\',16)"
					);
				}
				if (wherePerson("Ghost") == 408 && !this.checkFlag(22)) {
					addQuestionR(md, 'ask how she gets along with her Roommate',
						'“Well, she\'s quiet, barely visible when you are not here and always naked.</p>' +
						'<p>I have lived with worse people, but I wish she would warn me before she suddenly starts reading over my shoulder or walks through me.”',
						"Miku",
						"setPersonFlag(\\'Miku\\',22)"
					);
				}

			} else if (this.other == -100) {
				// Moved in and transformed
				addQuestionRO(md, 'spend some time with Miku',
					'You spend about an hour chatting with Miku, and she briefs you on what she sees during the night, points towards sexy, and usually lonely, women in the neighborhood and shares any new insights she gained online, while you tell her about your newest conquest and any progress in your many endeavors throughout the city.',
					"Miku",
					"WaitHereOnly(12)"
				);
				if (!this.checkFlag(20)) {
					addQuestionR(md, 'ask what it feels like being a cat',
						'“Unusual, you act more on instinct, rely on new senses... I have spent one night hunting and toying with a mouse and it felt absolutely exhilarating.”</p>' +
						'<p>“In a way, the whole world feels different and it is strange how easily I got used to it.”</p>' +
						'<p>You ask if she will always look like this now, and she shakes her head.</p>' +
						'<p>“Luckily not... I would have to beat the weeaboos at school off with a stick if I ran around like this...” She chuckles.</p>' +
						'<p>“I am able to assume human form if I want to, but this feels simply the most comfortable to me now.”',
						"Miku",
						"setPersonFlag(\\'Miku\\',20)"
					);
				}
				// After second event with Keana
				if (!this.checkFlag(32) && this.checkFlag(31)) {
					addQuestionR(md, 'what did you and Keana just do?',
						'Well, I remembered how you mentioned Ghosts being manifestations of Mana, so I figured I might be able to manipulate her ethereal body if I focus on that aspect and we decided to try it out.” She grins. “I would say the experiment was a full success.”',
						"Miku",
						"setPersonFlag(\\'Miku\\',32)"
					);
				}
				// After meeting the vampyre
				if (!this.checkFlag(27) && this.checkFlag(26)) {
					addQuestionR(md, 'ask Miku about Lilith',
						'“Everything in my being tells me to be weary around her.” Miku answers in a grim voice. “And you should be, too.”</p>' +
						'<p>“She is a predator, she will not be controlled forever and you should drive a stake into her heart as soon as you are able to.”',
						"Miku",
						"setPersonFlag(\\'Miku\\',27)"
					);
				}
				// Sex options
				if (perYou.isMaleSex()) {
					addLinkToPlace(md, 'use her ass', 408, 'type=fuck');
					addLinkToPlace(md, 'give her some milk', 408, 'type=bj');
				} else {
					addLinkToPlace(md, 'let her use her toys on you', 408, 'type=toysyou');
					addLinkToPlace(md, 'use her toys on her', 408, 'type=toysher');
					addLinkToPlace(md, 'let her use her tongue', 408, 'type=bj');
				}
				if (perYou.checkFlag(50) && perYou.checkFlag(52)) addLinkToPlace(md, 'ask Miku to stop the transfromation', Place, 'type=mikuendtransform');
				this.addDancingLink(md, 'talk to Miku about dancing in the club',
					'You discuss with Miku about dancing at the Avernus club. She answers,</p>' +
					'<p>&quot;Sounds like fun ' + this.getYourNameFor() + '!&quot; and with that you call Jade to arrange a dance for Miku.'
				);
				this.addSleepLink(md, "spend the night with Miku", "",
					"<p style='position:absolute;top:62%;left:2%;cursor:pointer;margin-top:-12px;font-size:x-large'><b>Going to Bed with Miku</b></p>" +
					'<p style="position:absolute;left:2%;top:65%;cursor:pointer;font-size:1.1em;width:50%">You spend the night in the attic and Miku, naked as she is, happily snuggles into your arms with a soft purr',
					'mikucat6.jpg'
				);
			}
		}

		
		if (sType === "" && (this.other == -1 || this.other == -2)) {
			if (!this.checkFlag(7) && isPersonHere("Victoria") && isCharmedBy("Victoria")) {
				addQuestionR(md, 'ask Victoria about Miku',
					'“I have heard my father talk of warlocks and witches with special abilities, but it was never a focus of his research, so I fear I do not have much to offer when it comes to information about this subject, ' + perYou.getMaster() + '.” Victoria explains calmly. “I apologize for disappointing you, but I shall begin research on the matter immediately, if you so wish.”</p>' +
					'<p>You tell Victoria to do so, but decide to keep your own investigations going nevertheless.',
					"Victoria",
					"setPersonFlag(\\'Miku\\',7)"
				);
			}
			if (!this.checkFlag(9) && isPersonHere("Gypsy")) {
				addQuestionR(md, 'ask Esmeralda about Miku',
					'Esmeralda humms briefly, mixes her cards and murmurs a phrase in a foreign language.</p>' +
					'<p>“An unlikely warrior, someone powerful, but chained, and the blood of the one responsible for these chains... find these, and you have the information you seek.”</p>' +
					'<p>You ask her if she could be less cryptic, and her answer is a simple “No.”',
					"Gypsy",
					"setPersonFlag(\\'Miku\\',9)"
				);
			}
			if (!this.checkFlag(10) && isPersonHere("MrBeasley") && isCharmedBy("MrBeasley")) {
				addQuestionR(md, 'ask Mr. Beasley about Miku',
					'“Ah, little Miku, such a sweet student...” Mr Beasley seems lost in a daydream for a moment before you shake him out of it. “Right, she may be of a special bloodline, like my apprentice is, ' + perYou.getMaster() + ', but I fear I can not tell you more. Davy or someone in his family might be able to.',
					"MrBeasley",
					"setPersonFlag(\\'Miku\\',10)"
				);
			}
			if (!this.checkFlag(11) && isPersonHere("Davy") && isDavyDefeated()) {
				addQuestionR(md, 'ask Davy about Miku',
					'You figured it\'s worth a shot, remove the gag from Davy mouth and explain to him that you have a few questions, and cooperating now would make his future life much easier.</p>' +
					'<p>Davy\'s answer is to tell you rather aggressively to go fuck yourself, as well as a threat of what he will do with you and your family once he is free and something more you did not understand because you had the gag back in by then.</p>' +
					'<p>You will have to get your answer elsewhere and make a mental note to tell Bambi to factor Davy\'s behavior into the next session.',
					"Davy",
					"setPersonFlag(\\'Miku\\',11)"
				);
			}
			if (!this.checkFlag(12) && isPersonHere("Monique") && Place == 8) {
				addQuestionR(md, 'ask Monique about Miku',
					'Monique hums briefly and types something into the computer, then shakes her head. “Most of the books in our library were written by people for whom every witch had special abilities, finding something specific without knowing what exactly we are looking for seems like a lost cause, I\'m sorry.',
					"Monique",
					"setPersonFlag(\\'Miku\\',12)"
				);
			}
			/*
			<Ask Jessica about Miku> (Only when friendly)

			“A girl able to feel and manipulate mana, but unable to generate her own?” Jessica muses. “Well, I have a theory. During my time, in the days after the opening of the hellgate, the veil separating the worlds was thin around Glenvale, and even weak spellcasters could easily summon lesser demons and fey creatures. Some of those intermingled with the local populace, seduced and impregnated mortal women, whose children often showed a great affinity for magic.”
			“This girl may very well be a descendant of one of these women, though her bloodline has likely been diluted heavily in the past centuries, which would explain her problems.”

			“I do not, however, know how these families developed during my imprisonment, so you might need help from someone with actual records of those special bloodlines to know what exactly she is, maybe someone whose family has a long history with the arcane, like the one who used to guard the book.”
			*/
			if (!this.checkFlag(13) && isPersonHere("Tina")) {
				if (isCharmedBy("Tina")) {
					addQuestionR(md, 'ask Tina about Miku',
						'“Oh, she must belong to one of the special bloodlines my brother was looking for!” Tina says, exited that she is able to be of use to you.</p>' +
						'<p>“I have already told you about our families bloodline, but Davy believes there are others in Glenvale who have special abilities as well.”</p>' +
						'<p>You ask if she knows more about these people, and Tina eagerly nods.</p>' +
						'<p>“I do, ' + perYou.getMaster() + '! There are many tales from around the world of humans mating with creatures from beyond what is called the “Veil” a barrier between our world and others.”The offspring of these unions have often been the source of powerful bloodlines, and Glenvale had especially many of those, but in-between the witch hunts and their blood diluting over time, not a lot of them survived till today.”</p>' +
						'<p>You ask if she has more information about those people, and Tina shakes her head. “No, ' + perYou.getMaster() + ', but I have heard my brother speaking on the phone about the Gates family likely keeping records about this, and I believe he was devising a plan to obtain them.”</p>' +
						'<p>This is finally really useful information, and Tina is beaming with pride as you compliment her, eagerly asking if there is anything more she may do for you and invitingly putting her body on display.',
						"Tina",
						"setPersonFlag(\\'Miku\\',13);setPersonOther(\\'Miku\\',-2)"
					);
				} else if (!isCharmedBy("MrsRobbins", "Davy")) {
					addQuestionR(md, 'ask Tina about Miku',
						'“Well, you did help me with mom, and it seems my stupid brother is so afraid of you finding him, that he has left us alone...” Tina considers for a moment, then sights. “This feels like backstabbing my family, but I\'ll tell you what I can.”</p>' +
						'<p>“There are several bloodlines with ties to magic around the world, and especially in Glenvale thanks to the town\'s history, and most of these can in one way or another be traced back to the union of human servants and creatures summoned from beyond what is called the “veil”, a sort of barrier between our world and others. So, this girl may have someone like this in her ancestry.”</p>' +
						'<p>You ask how she knows all this, and after a moment of hesitation, Tina replies.</p>' +
						'<p>“Davy has been obsessed with finding out who in Glenvale might posses such powerful bloodlines or simply magic at all. He told me to inform him whenever I find someone who has, but right now, he can bite me, for all I care.” Tina scoffs.</p>' +
						'<p>“Wait, I actually once heard him talk on the phone about the Gates family, and how they must keep records of the various bloodlines they encountered, I believe he even had a plan to get these records.”',
						"Tina",
						"setPersonFlag(\\'Miku\\',13);setPersonOther(\\'Miku\\',-2)"
					);
				}
			}
			if (!this.checkFlag(14) && isPersonHere("MsJones") && isCharmedBy("MsJones")) {
				addQuestionR(md, 'ask Ms. Jones about Miku',
					'“So Ms. Nakamoto is able to sense mana and knows when someone is under a spell... well, this explains her interest in me.” Ms Jones chuckles.</p>' +
					'<p>“There are only a few of these people left, but she may have a creature from beyond the veil somewhere in her ancestry.”</p>' +
					'<p>You ask Ms Jones to elaborate, and she offers the following explanation.</p>' +
					'<p>“When I was the demons host, it took great joy in its attempts to breed better servants. It would often summon lesser demons, fey creatures, and sometimes other things to mate with captive and enthralled women who bore their children.”</p>' +
					'<p>Ms Jones expression shows that, like most of her possession, it is not a pleasant memory, but she speaks on.</p>' +
					'<p>“Of course, Legions machinations here are not the source of all of these bloodlines around the world, but most can trace their special powers back to someone who offered her body, or had her body offered to one of these creatures.”</p>' +
					'<p>You ask if there is a way to bring out the full potential of Miku\'s blood, and Ms Jones thinks for a moment.</p>' +
					'<p>“If you had a means to Transform her body, it could be used to strengthen the influence of her outsider bloodline... of course, it is advisable to find out what you are going to set free, first, and I doubt the library has records of these, but maybe someone well versed in magical history like the Gates family, has.”',
					"MSJones",
					"setPersonFlag(\\'Miku\\',14);setPersonOther(\\'Miku\\',-2)"
				);
			}

		}
		if (sType ==="" && this.other == -2 && (Place == 17 || Place == 192) && !this.checkFlag(15)) {
			if (isCharmedPath() && Place == 17) {
				addQuestionR(md, 'ask ' + perGates.getPersonNameShort() + ' for information about special bloodlines',
					'My ' + capitalizeFirstLetter(perYou.getSex()) + ', you are having interesting adventures it seems, It reminds me of my youth.” Sir Gates muses.</p>' +
					'<p>“There are few records of the various magical bloodlines, but my Family has fought the machinations of Kurndorfs followers, and their attempts to bring him back for a long time.” He puffs on his pipe, slowly rises to his feet and heads towards a bookshelf. “They have kept many records, and quite a few of these pertain the abilities of those among them possessing special bloodlines. I do believe I remember... ah here it is.”</p>' +
					'<p>“He takes out an old, but very well maintained, book and carefully flips the pages until he finally finds what he was looking for.',
					"SirRonald",
					"setPersonFlag(\\'Miku\\',15);setPersonOther(\\'Miku\\',-3)"
				);
			} else if (isMurderPath() && Place == 192 && isPersonHere("Sarah")) {
				addQuestionR(md, 'ask Sarah for information about special bloodlines',
					'“A girl able to sense and manipulate mana, but unable to generate it? That sounds fascinating, ' + perYou.getMaster() + '!”</p>' +
					'<p>You ask Sarah if her family has kept any records about witches with special bloodlines, and she considers for a moment.</p>' +
					'<p>“Not directly, no, but uncle Ronnie often told me about our families sacred duty to fight those misusing the gift of magic, like the followers of Kurndorf, and I know we have extensive records of those we fought and their abilities.” She smiles brightly. “Which, of course, now rightfully belong to my beloved ' + perYou.getMaster() + ', just as my heart and soul.”</p>' +
					'<p>You commend Sarah on her devotion to you, eliciting a blissful gasp as you caress her cheek.</p>' +
					'<p>“There is a lot to read through, but I have a rough idea what you might be looking for, ' + perYou.getMaster() + ', so leave it all to me!” The gesture seems to have filled her with even more enthusiasm, and before you are able to say anything more, Sarah has already vanished in the library.',
					"Sarah",
					"setPersonFlag(\\'Miku\\',15);setPersonOther(\\'Miku\\',-3)"
				);
			} else if (isConspiracyPath() && Place == 192 && isPersonHere("Sarah") && sType === "") addLinkToPlace(md, 'ask Sarah for information about special bloodlines', 192, 'type=asksarahmiku');
		}
		if (this.other == -3 && (Place == 17 || Place == 192)) {
			if (isCharmedPath() && Place == 17) {
				addQuestionR(md, 'take a look at what he found',
					'“There are several records about witches and warlocks using so called familiars all over the world. Records regarding their nature differ, but there are many cases, especially around Glenvale, where the familiar turned out to be a feytouched, human, bred to be able to manipulate mana at much finer degrees than most spellcasters, but unable to generate it on their own and thus reliant on an actual witch to provide it.” He shows you the pages in the book, though they are written in a rather old dialect, and you have to rely on his word on most parts.</p>' +
					'<p>“As time passed and knowledge of the veil and what is behind it faded, fewer and fewer of these creatures were able to cross over, but many of their bloodlines remain, and this girl of yours may very well be a descendant from one of them.”</p>' +
					'<p>“So, Miku may be a familiar?” You ask. “But she is Japanese.”</p>' +
					'<p>“Different nations have different legends, like the Sidhe of western and the Kami of eastern mythology. However, at the core, many can be traced back to the same origins. Not to mention that only very few people these days are purely of a single nationality and you have mentioned that her family lived here for a few generations.”</p>' +
					'<p>You ask if it would be possible to help her awaken her abilities fully, but Sir Gates seems to dislike that idea. “You would need to find a way to transform her body to be more like the familiars of old to realize her full potential, which is nigh impossible.”</p>' +
					'<p>“And likely for the better, too, it would only make her a target for less savory spellcasters.”',
					"SirRonald",
					"setPersonOther(\\'Miku\\',-10)"
				);
			} else if (isMurderPath() && Place == 192 && isPersonHere("Sarah")) {
				addQuestionR(md, 'pass the Time until Sarah is back',
					'You use the time while Sarah scours the library to familiarize yourself with the Mansions layout, musing on how huge it is, especially with Sir Gates living alone for most of the time.</p>' +
					'<p>It could technically be yours now, just as the Gates family fortune, but for now, you can not be too open about it without raising suspicions. Not to mention if you should even go that far after what you did...</p>' +
					'<p>You are taken out of your thoughts by Sarah\'s voice, who finally seems to have concluded her search and awaits you on her knees with one of the books held out for you.</p>' +
					'<p>“I think this is what you are looking form ' + perYou.getMaster() + ', this entry talks about a witches familiar, and while assumptions what those supposedly are differed widely around the world, my ancestors note that those found in this part of the country were indeed often feytouched humans.”</p>' +
					'<p>You point out that Miku is Japanese, but Sarah makes a rather compelling point that her family has been living here for a few generations and it is not unlikely that creatures like the Sidhe and Kami share similar origins to begin with. The Familiars in the book had an immense fine control of Mana, able to use it to shift form or manipulate spells to a large degree, but were unable to generate it themselves and suspect-able to be controlled. They were pretty much bred as servants to Warlocks and Witches. However, since Miku\'s bloodline has been diluted over the centuries, you would have to find a way to basically “Transform” her body to be more like the familiars of old.</p>' +
					'<p>“You thank Sarah for the effort, and she happily gazes up to you.” Everything for you, my beloved ' + perYou.getMaster() + '. I will be here in case you have more need of me.”',
					"Sarah",
					"setPersonFlag(\\'Miku\\',15);setPersonOther(\\'Miku\\',-10)"
				);
			}
		}
	};

	per.showEventSleep = function(wt)
	{
		if ((Place == 46 || Place == 170) && this.place == 408 && this.other < 0 && this.other > -20 && !this.checkFlag(23) && wt > 24) {
			// Night encounter
			passTime(true);
			passTime(true);
			dispPlace(46, "type=mikunightevent1");
			return true;
		}
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("!poledance", 1);
		addPlaceTitle(md, "Miku's Dance");
		md.write(
			'<p>Miku steps up dressed in what must have once been her school uniform, or at least a costume of a uniform. She very much acts the role of a slutty schoolgirl for her performance. You do wonder about the chain though...</p>' +
			'<p>After she sits with you for a while, offering you her chain like it is a leash. No one seems to be bothered, the Avernus club is quite familiar with these sort of domination games.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};


	per.handleItem = function(no, cmd)
	{
		// Using/Examining the Silver Ring
		if (no == 32) {
			if (cmd == 1) {
				// Examine the Silver Ring
				if (this.isHere() && this.isCharmedBy()) {
					examineSilverRingStart();
					addComments(
						'<p>It seems to be reacting to Miku\'s presence... getting warmer the closer you get.</p>' +
						'</td></tr></table>'
					);
					return "handled";
				}
			}
		}

		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// At the Aquarium Information Desk and she is present?
			if (Place == 394 && this.place == 394) {
				CastCharmSpell("Miku", 394, 1, 'type=charmmiku1');
				return "handled";
			} else if (Place == 408 && sType !== "transformcat9") {
				// Attic before completely ready
				addComments('You already know that this won\'t work, and until you have figured out why, you would just waste your Mana.');
				return "handled";
			} else if (sType == "transformcat9") {
				CastCharmSpell("Miku", 408, 1, 'type=charmmikucat1');
				return "handled";
			}
		}

		// Examining the Soul Bound Crystal
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere() && this.other == -20) {
					examineItem(no, 'The ' +  s + ' vibrates softly the closer you get to Miku.');
					return "handled";
				}
			}
		}

		// Casting the transform spell
		if (no == 18 && cmd == 2) {

			// In the Attic
			if (Place == 408 && this.isHere()) {
				if (this.other == -100) {
					addComments("You have already transformed Miku!");
					return "handled";
				}
				if (this.other != -20) return '';
				if (!CastTransform(1, true)) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(Place, 'type=transformcat0');
				return "nofooter";
			}
		}
		return "";		// do nothing
	};

	// Phone calls
	per.addPersonPhoneCall = function() {
		// Received shortly after Miku moves in around 12:00 o clock
		if (!this.checkFlag(17) && this.other < 0 && getHour() == 12 && this.isCharmedBy()) {
			if (makeCall(true, 270)) {
				this.setFlag(17);
				this.setFlag(35);
			}
		}
		// Received one day later around 12:00 o clock
		if (this.checkFlag(17) && !this.checkFlag(18) && !this.checkFlag(35) && Math.floor((nTime - this.charmedTime) / 12) > 24 && getHour() == 12) {
			if (makeCall(true, 271)) this.setFlag(18);
		}
		// Received once mom is charmed or out of the house at 12:00 o clock
		if (!this.checkFlag(19) && !this.checkFlag(35) && (isCharmedBy("Mom") || wherePerson("Mom") != 154) && getHour() == 12 && this.checkFlag(18)) {
			if (makeCall(true, 272)) {
				this.setFlag(19);
				this.setFlag(35);
			}
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		if (id == 270) return receiveSMS('Miku', 'Something hot and wet awaits you when you are back home (&#94;__&#94;)', 'mikusms1.jpg');
		if (id == 271) return receiveSMS('Miku', 'It turns out, your sister does like something long and tasty to nibble on. We are leaving some for you. ( &#94; . &#x7E; )', 'mikusms2.jpg');
		if (id == 272) return receiveSMS('Miku', 'Me and Tracy will be in the Kitchen the next days during lunchtime, hope you find the time to join us.', 'mikusms3.jpg');
		return '';
	};
}