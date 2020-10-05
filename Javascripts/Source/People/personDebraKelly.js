/*
Introduction to Debra:

The dotted dressed girl is an exotic beauty for sure! She must have some asian blood in her, but you can’t really tell from that far, you have to come closer to her. You should strike up a conversation with her, who knows, maybe she is as sweet as her body! You can’t really recognise this lady that means she must be a newcomer. This could make friends with her a lot easier. She looks a bit lonely and numb, sitting all alone on a park bench. You can’t really leave a woman alone to  herself and feeling sad, you are a gentleman after all! Go ahead and talk to her, if nothing else, she could be a great "bedwarmer” for a night or two!

Introduction to Janet:

The house is right where Debby told you. A strange smell hit you as enter the front door, the smell of old and new mixed together. As Janet opens the door you now understand where the smell oridebrated from. The two sisters are still in the middle of the packing into the house process. There are boxes lying around, plastic drapes separating the rooms from each other and a lot of empty spaces waiting to be filled with furnitures. Janet looks a bit like Debra, but stands on her own as a pretty girl. She has some kind of sluttiness vibe around her which makes her interesting. She sports some simple clothes and her hair is bit messy from all the packing. You open your hand waiting for her to shake it. She seems very polite which contradicts those impressions you first felt about her.

*/

/****************************************************************
Debra Kelly
****************************************************************/
function RepliesDebra(nR)
{
	var myName = per.getYourNameFor();

	if (nR == 4000) // v40 = Know Debra's Kollam St Address
	{
		addComments('"Really?  I live in number 22.  Why don\'t you come to visit my sister and me sometime? You will have to excuse the mess, we are still unpacking and setting up the house."');
		setPlaceKnown("KellyHouse"); // know her address
		per.setFlag(1);	 // Have "introduced yourself"
		addComments('You now know Debra & Kelly\'s address.');
	}
	if (nR == 6501)
	{
		addComments('Whatever you say, my ' + myName + '.  If I find anything that may be magical I will return here and wait for you.');
		per.setFlag(3);
		per.place = 1000;
	}
	else if (nR == 6006)
	{
		moveDavyToHotel2();
		addComments('"I met someone by the name of Davy about ten minutes ago. He mentioned something about the school sporting grounds and then going to a hotel."');
		setPlaceKnown("SchoolField");
	}
	else if (nR == 7000)
	{
		setQueryParams();
		per.place = 87;
		bChat = false;
		addComments('You tell your puppy to enjoy herself, and leave her playing in the park.');
		Place = 63;
	}
	return true;
}

// Initialise Debra Kelly
function initialiseDebraKelly()
{
	// Debra Kelly
	addPerson("Debra Kelly", 87, "DebraKelly", "", false);
	per.Replies = RepliesDebra;
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		var clv = this.getCharmedLevel();
		if (clv == 2) return "Debra";
		if (this.checkFlag(8)) return "Puppy Debbie";
		return this.isCharmedBy() ? "Puppy Debra" : this.name;
	};
	per.getPersonAddress = function() { return isPlaceKnown("KellyHouse") ? '22 Kollam St, Glenvale' : ''; };

	per.isPersonInfo = function() { return this.isCharmedBy(); };
	per.getPersonInfo = function() {
		if (this.getCharmedLevel() == 1) {
			return this.addPersonString("debra11b.jpg", "height:max%", "right") +
				'Debby really likes to be your pet, quite literally! She showed great interest in becoming your lapdog and so you fulfilled her wishes! Kind of! You can always bring her out of this puppy personality, but why should you? Both of you really enjoy this, you have your very own human pet and Debra can focus on her ' + perYou.getMaster() + '. She has a sister, Janet, who is the one who looks after the two of them. Debra said that her sister is interested in their family’s heritage and legacy. There are some hints that their family has something to do with Kurndorf. You should definitely check her out and talk about it!<br><br>' +
				'You fondle Deb’s hazelbrown hair as she is sitting on your lap, naked. Perfectly obedient, like a dog. She knows that you need some quiet time to yourself, so she doesn’t bother you with her questions. You love these relaxing minutes, without anything to worry about. Just you and a beautiful naked girl on your lap, waiting to serve you, her ' + perYou.getMaster() + '.';
		} else {
			return this.addPersonString("debra11d-day.jpg", "height:max%", "right") +
				"Debra is the lovely young woman you met in the Park. She is now your lovely girlfriend, happy to spend time with you in conversation or in a more intimate way.";
		}
	};
	
	per.whereNow = function()
	{
		if (!isDay() && this.place === 87) return 0;		// Not at the park at night
		if (Place == 114 || sType == "debrawalkpark" || sType == "debratennis" || sType == "debratennissex") return Place;
		if (Place == 44 && (sType == "walkies" || sType == "debraskateboarding1" | sType == "debraskateboarding2")) return Place;
		return this.place;
	};
	
	per.passTimeDay = function() {
		this.setFlag(9, false);
		if (Place == 114) {
			Place = 112;
			return "In the morning Debra lead you to the lounge room for breakfast";
		}
		return '';
	};

	per.showEvent = function()
	{
		var md, herName, clv;
		
		if (Place == 269) {
			if (sType == "debrapool") {
				WaitHereOnly(4);
				md = WritePlaceHeader();
				this.showPerson("pool.jpg");
				addPlaceTitle(md, "Swimming with Debra");
				md.write(
					'<p>Debra arrives, dressed in a pink and white bikini, and happily waits for you, to chat or something else.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=debrapoolsex');
				addLinkToPlaceC(md, 'chat and say goodbye to Debra', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "debrapoolsex") {
				md = WritePlaceHeader();
				this.showPerson("pool-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Debra");
				md.write(
					'<p>You ask your large breasted security guard to play with you more privately, and she seductively removes most of her swimsuit and lies back waiting for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Debra', Place);
				WritePlaceFooter(md);
				return true;
			}
		}

		if (Place == 87) {
			// Debra in the Park
			
			if (sType == "charmdebrapark1") {
				// Puppy Charm at the Park 1
				md = WritePlaceHeader();
				this.showPerson("debra2.jpg");
				addPlaceTitle(md, "Debra Kelly under a Charm Spell");
				md.write(
					'<p>"I\'m sorry, what did... you... say...?" Debra asks, slowing as the spell begins to take effect. ' +
					'You smile as the customary pink hue begins to shine through her eyes.  She will soon be yours, ' +
					'another pet in your harem.  Which gives you an idea.</p>' +
					'<p>"I said, don\'t you just love animals, Debra?" you continue as if nothing has happened.</p>' +
					'<p>"What?  Animals?" she asks, still confused by the new sensations coursing through her body and mind - opening ' +
					'both of them to suggestion, making her virtual putty in your hands.</p>' +
					'<p>"Yes.  Animals.  Pets.  The kind that follow you around, always obeying your commands, and worshipping ' +
					'their owners like their own personal gods.  Like man\'s best friend," you say. "Don\'t you just love pets?"</p>' +
					'<p>"Yes...  Love pets..." she moans, the strength of her newly discovered feelings beginning to overwhelm her.</p>' +
					'<p>"I bet you\'d love to <i>be</i> a pet,too," you say to her, then notice how distracted she is getting.</p>' +
					'<p>"Perhaps you should sit down, Debra.  You seem a little light headed.  We wouldn\'t want you to fall, now would we?"</p>' +
					'<p>She stands, too confused and aroused to come to a conclusive decision on her own, but not ready to submit.</p>'
				);

					
				// Choices
				startQuestions();
				addLinkToPlace(md, "order her to <i>SIT</i>", Place, 'type=charmdebrapark2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmdebrapark2") {
				// Puppy Charm at the Park 2
				md = WritePlaceHeader();

				this.showPerson("debra3.jpg");
				addPlaceTitle(md, "Debra Kelly under a Charm Spell");
				md.write(
					'<p>Debra sways on her feet, but doesn\'t fall.  She stares at you, eyes glazed.</p>' +
					'<p>"Mmm... Not a pet," she mutters.</p>' +
					'<p>"No?" You smile.  "You\'re a good girl though, aren\'t you? A good girl who always does as she is told."</p>' +
					'<p>Her brow furrowed, Debra is deep in thought.  "Yes?"</p>' +
					'<p>You pause to enjoy the moment, then start to chip away at her resolve. "Yes, you\'re a good girl. In fact...  I bet you\'re going to start playing with yourself right now, aren\'t you."</p>'
				);

				//**********************************************************************
				startQuestions();
				addLinkToPlaceC(md, '"Play with yourself, Debra"', Place, 'type=charmdebrapark3');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmdebrapark3") {
				// Puppy Charm at the Park 3
				md = WritePlaceHeader();
				this.showPerson("debra4.jpg");

				/* TITLE LINE */
				addPlaceTitle(md, "Debra Kelly under a Charm Spell");
				/* Description */
				md.write(
					'<p>"Play with myself?  That would be...  I shouldn\'t.  I\'m in public...  should I?" she asks, hands already ' +
					'snaking down to rub her clit, sending even more waves of mind-numbing pleasure through her.</p>' +
					'<p>"A real woman wouldn\'t do that in public.  But you\'re not a real woman, are you Debra... you\'re my pet."</p>' +
					'<p>"Your pet?" she asks, between moans.</p>' +
					'<p>"That\'s right, my pet. My dog, my toy, my bitch. A slut who always obeys her <i>Owner</i>."</p>' +
					'<p>"Owner?  But people can\'t be owned..."</p>' +
					'<p>"People?" you ask.  "People are independent, strong women in complete control of their actions.  You aren\'t in control ' +
					'anymore, Debra.  You can feel the pleasure can\'t you?  I\'m causing that pleasure, Debra...  I am the reason you can\'t ' +
					'control yourself."</p>'
				);

				/* Dialogue Options */
				startQuestions();
				addLinkToPlaceC(md, "tell Debra what she is", Place, 'type=charmdebrapark4');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmdebrapark4") {
				// Puppy Charm at the Park 4
				md = WritePlaceHeader();
				//  PICTURE REFERENCES
				this.showPerson("debra6.jpg");

				// TITLE LINE
				addPlaceTitle(md, "Debra Kelly under a Charm Spell");
				md.write(
					'<p>"You\'re not a woman anymore, Debra.  From now on you are just an animal, a plaything, ' +
					'a pet.  It\'s okay for pets to pleasure themselves when they have their <i>Owner\'s</i> permission.  You want ' +
					'to pleasure yourself, you like feeling this good - don\'t you Debra?"</p>' +
					'<p>"Okay for pets to feel this way. To do this.  Yes..." she moans, losing herself to your suggestions.</p>' +
					'<p>"Good girl, Debra" you say, sending another wave of pleasure through her body.  "You\'re going to cum ' +
					'soon aren\'t you Debra, and when you do your transformation will be complete.  You will no longer be a ' +
					'woman, will you.  You will be an animal, a pet, a thing, a possession. <i>My possession</i>.  You want that, ' +
					'don\'t you Debra?  You want to be owned - need to be owned.  To be nothing more than an object ' +
					'for your ' + perYou.getMaster() + '\'s pleasure, to have no purpose in life ' +
					'other than to serve your ' + perYou.getMaster() + ' as best you can. That is all you will live for from now on."</p>' +
					'<p>You can tell that she is moments away from orgasm, the tiny part of her that is still fighting you quickly dying under your assault.</p>'
				);

				/* Dialogue Options */
				startQuestions();
				addLinkToPlaceC(md, "order Debra to SIT", Place, 'type=charmdebrapark5');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmdebrapark5") {
				// Puppy Charm at the Park 5
				md = WritePlaceHeader();
				/*  PICTURE REFERENCES */
				this.showPerson("debra5.jpg");

				/* General Description */
				/* TITLE LINE */
				addPlaceTitle(md, "Debra Kelly under a Charm Spell");
				var myName = perYou.getMaster();
				/* Description */
				md.write(
					'<p>"Yes!" she moans, orgasming at your command - her new reality finally washing over her in the ' +
					'overwhelming wave of pleasure.  She begins barking as the orgasm washes away the last traces of her will.</p>' +
					'<p>When she recovers she looks around, a sense of loss in her eyes.  For a moment you wonder if ' +
					'something went wrong, then she looks up at you. ' +
					'"Please," she begs "Please, will you be my ' + myName + '?"  She kneels at your feet, clothes ' +
					'forgotten behind her.  "Please, I have no purpose without someone to own me. ' +
					'Who will I love?  Who will I worship?"</p>' +
					'<p>You smile down at her, and pat her on the head - running your hand through her dark hair.  "Of ' +
					'course, my pet.  I will take good care of you.  You belong to me now.  I <i>own</i> you."</p>' +
					'<p>She smiles a slow smile and looks up at you.  "Oh thank you, ' + myName + '. ' +
					'I will be the most loyal, loving pet.  I will do anything you ask and I promise to never disobey you...  I owe you ' +
					'everything ' + myName + '; without you I am nothing."</p>' +
					'<p>You can hardly take it anymore, and pull her up to you and kiss her.  She responds, passionately ' +
					'running her hands over your body.</p>' +
					'<p>You feel her need for you, her desire.  Then, pushing her back to her knees you unzip your pants. ' +
					'"Now, my pet.  Worship your <i>' + myName + '</i> like the good little bitch you are," you command, looking down at her.</p>'
				);

				if (perYou.isMaleSex()) md.write('<p>"Oh Yes, ' + perYou.getMaster() + '!" she cries, immediately taking you in her mouth and attempting to give you the best blowjob she can, licking and sucking gleefully - happy to serve her ' + perYou.getMaster() + '.</p>');
				else md.write('<p>"Oh Yes, Mistress!" she cries, diving at your muff, her sudden hunger for you even more evident - her tongue immediately seeking out the best ways to pleasure her Mistress.</p>');
				md.write('<p>You hear her sigh a mixture of pleasure and contentment as she takes to her task.');

				// Dialogue Options
				//**********************************************************************
				startQuestions();
				addLinkToPlace(md, "finish and tell her to STAY", 87);
				WritePlaceFooter(md);
				return true;
			}		
			
			if (sType === "parkwalkies") {
				// Play in the Park
				WaitHereOnly(3);
				md = WritePlaceHeader(false, isExplicit() ? 'td-left-med' : '');
				this.showPersonRorX("walkies-park.jpg");
				addPlaceTitle(md, "Taking Your Pet To Play In the Park");

				md.write(
					'<p>You tell your loyal little pet that you will go back to the park to have a run and play. You both walk back to the park, she follows contentedly behind you, completely naked except her her shoes.</p>' +
					'<p>You pass a few people who look shocked, at both her nudity and her clear submission to you.</p>' +
					'<p>At the park Debra plays around, happy to have your complete attention and to be out at the Park again.</p>'
				);
				if (isExplicit()) {
					md.write(
						'<p>After a little she gives you a nice little show of how she likes to play, using a dildo to play with her hot pussy!</p>'
					);
				}

				// Choices
				startQuestions();
				addQuestionCO(md, 'leave your puppy to play here in the park', "DebraKelly", 7000);
				addLinkToPlace(md, 'return to the Kelly\'s home', 112);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "goodgirl") {
				md = WritePlaceHeader();
				this.showPerson(Math.random() < 0.5 ? "debra5.jpg" : "debra7.jpg");
				herName = this.getPersonName();
				addPlaceTitle(md, "Your Pet, " + herName);
				md.write(
					'<p>Your loyal little pet immediately runs to your side and kneels at your feet, eagerly waiting to service you in any way you may desire.</p>' +
					'<p>"Oh thank you ' + perYou.getMaster() + '!" Debra cries. "I\'ve been a good girl. ' + perYou.getMaster() + ' is happy with me.' +
					'Within moments you can smell the heat coming from her moistening snatch as her hands pull up her dress and she begins to fondle her breasts.' +
					'"Oh ' + perYou.getMaster() + ', is there anything else your little bitch can do to please you?  Will you take me now?  Or," she says with a honeyed tongue,' +
					'"Perhaps ' + perYou.getMaster() + ' would like me to <i>worship</i> at your feet once more?"</p>' +
					'<p>You look around.  Nobody else is in the park.</p>'
				);

				// Choices
				startQuestions();
				if (perYou.isMaleSex()) {
					addLinkToPlace(md, 'give her a bone', Place, 'type=goodgirlfuck');
					addLinkToPlace(md, 'put a bone between her tits', Place, 'type=goodgirltitfuck');
					addLinkToPlace(md, 'lick the bone', Place, 'type=goodgirlbj');
				} else {
					addLinkToPlace(md, 'lap dog!', Place, 'type=goodgirlbj');
					if (perYourBody.FindItem(45) > 0) addLinkToPlace(md, 'give her a plastic bone', Place, 'type=goodgirlfuck');
				}
				addLinkToPlaceC(md, '"Walkies"', Place, 'type=walkies');
				if (isCharmedBy("JanetKelly") && this.checkFlag(2)) addLinkToPlaceC(md, '"Home time"', Place, 'type=home');
				addLinkToPlace(md, 'finish up and play with Debra some more', 87);
				if (isPlaceKnown("WildRanges")) addLinkToPlace(md, 'enter the wild ranges', 26);		// Do you know about the Wild Ranges?
				addLinkToPlace(md, 'walk to the main park pathway?', 63);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "goodgirlbj") {
				// Blowjob/lick
				md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-med' : '');
				if (perYou.isMaleSex()) {
					this.showPersonRorX("park-bjba.jpg");
					addPlaceTitle(md, "Your Pet Licking a Bone");
				} else {
					this.showPersonRandomRorX("park-bjg", isExplicit() ? 4 : 2);
					addPlaceTitle(md, "Your Pet Lapping At Something Moist");
				}
				md.write('<p>"Worship me, my little bitch in heat," you say, dropping your pants in front of her.</p>');
				if (perYou.isMaleSex()) md.write('<p>"Oh yes, ' + perYou.getMaster() + '!" she cries, immediately taking you in her mouth and lovingly giving you the best blowjob she can, licking and sucking gleefully - happy to serve her Master.</p>');
				else md.write('<p>"Oh yes, Mistress!" she cries, diving at your muff, her sudden hunger for you even more evident - Her tongue lovingly and gleefully lapping up every drop that her skillful attentions arouse.</p>');
				md.write('<p>You hear her moan, a mixture of pleasure and contentment as she devotes herself to her joyous task.');

				// Choices
				startQuestions();
				addLinkToPlace(md, 'finish up and play with Debra some more', 87);
				if (isPlaceKnown("WildRanges")) addLinkToPlace(md, 'enter the wild ranges', 26);		// Do you know about the Wild Ranges?
				addLinkToPlace(md, 'walk to the main park pathway?', 63);
				WritePlaceFooter(md);
				return true;
			}	
			
			if (sType == "goodgirlfuck") {
				// fuck her
				herName = this.getPersonName();
				if (perYou.isMaleSex()) {
					md = WritePlaceHeader(false, 'td-left-med');
					if (isExplicit() && Math.random() < 0.7) this.showPersonRandomX("park-fuckb", 1);
					else this.showPersonRandom("park-fuck", 3);
					addPlaceTitle(md, "Giving Your Pet Your Bone");
					md.write('<p>You tell ' + herName + ' it is time for some doggy-style and you sink you manhood into her delightful pussy, ramming into her over and over. You feel her shudder in her release and that is the final straw and you pour your passion into her depths.</p>');
				} else {
					md = WritePlaceHeader();
					this.showPersonX("park-fuckga.jpg");
					addPlaceTitle(md, "Giving Your Pet Your Plastic Bone");
					md.write('<p>You put on your strap-on and tell ' + herName + ' that it is time for some doggy-style!</p>');
				}

				// Choices
				startQuestions();
				addLinkToPlace(md, 'finish up and play with Debra some more', 87);
				if (isPlaceKnown("WildRanges")) addLinkToPlace(md, 'enter the wild ranges', 26);		// Do you know about the Wild Ranges?
				addLinkToPlace(md, 'walk to the main park pathway?', 63);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "goodgirltitfuck") {
				// tit-fuck her
				md = WritePlaceHeader();
				this.showPerson("park-tfa.jpg");
				addPlaceTitle(md, "Giving Your Pet Your Bone Between Her Tits");
				md.write('<p>You put your cock between her tits and tell your loyal puppy to play with it.</p>');

				// Choices
				startQuestions();
				addLinkToPlace(md, 'finish up and play with Debra some more', 87);
				if (isPlaceKnown("WildRanges")) addLinkToPlace(md, 'enter the wild ranges', 26);		// Do you know about the Wild Ranges?
				addLinkToPlace(md, 'walk to the main park pathway?', 63);
				WritePlaceFooter(md);
				return true;
			}			
			
			if (sType === "walkies") {
				// Walkies
				md = WritePlaceHeader();
				this.setFlag(2);
				this.showPersonRandom("walkies", 3);

				addPlaceTitle(md, "Taking Your Pet, " + this.getPersonName() + " for a walk");
				md.write('<p>You tell your loyal little pet that it is time to walk her like a good little puppy. You both walk for a while around the area, she follows contentedly behind you, completely naked except her her shoes.</p><p>You pass a few people who look shocked, at both her nudity and her clear submission to you.</p>');

				// Choices
				startQuestions("Where will you walk to:");
				addLinkToPlace(md, 'walk her back to the path where you met her', 87);
				WritePlaceFooter(md);
				return true;

			} else if (sType === "home") {
				// Walkies
				md = WritePlaceHeader();
				this.place = 112;
				this.showPersonRandom("walkies", 3);

				addPlaceTitle(md, "Taking Your Pet, " + this.getPersonName() + " home");
				md.write(
				'<p>You tell your loyal little pet that it is time to go back home, she looks excited at the idea of returning to her house. She happily follows you as you leave the park, still completely naked except her shoes, but she does pick her her clothing the bring back with her, the thought of wearing them does not seen to cross her mind.</p>' +
				'<p>You arrive with her to her house on Kollam Street and she eagerly runs into the house ahead of you...</p>');

				// Choices
				startQuestions("Where will you walk to:");
				addLinkToPlace(md, 'follow her inside', 112);
				addLinkToPlace(md, 'leave her for now', 44);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType === "debrawalkpark") {
				// Walk in the Park (GF)
				WaitHereOnly(3);
				md = WritePlaceHeader();
				this.showPersonRandom("park-walk", 2);
				addPlaceTitle(md, "Taking Your Girlfriend Debra for a Walk In the Park");

				md.write(
					'<p>You take Debra for a walk in the park, it seems to be a place she likes and the weather is nice. She changes into a cute dress and you walk arm in arm with her there.</p>' +
					'<p>In the park you reach a formal flower display and Debra stands near it looking very pretty. The term \'spanish rose\' comes to mind as you look at your beautiful girlfriend.</p>'
				);

				// Choices
				startQuestions('if that is all...');
				addLinkToPlace(md, 'return to the Kelly\'s home', 112);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "recharmdebrapark1") {
				// Recharm in the park (was GF now puppy)
				this.charmThem(1);
				md = WritePlaceHeader();
				this.showPerson("park-recharm1.jpg");
				addPlaceTitle(md, "Debra under a Charm Spell, Again");
				md.write(
					'<p>It crosses you mind while looking at Debra hee in the par, how she is another pet in your harem.  Which gives you an idea and you recast the charm spell on her,</p>' +
					'<p>"Don\'t you just love animals, Debra?" you continue as if nothing has happened.</p>' +
					'<p>"What?  Animals?" she asks, still confused by the new sensations coursing through her body and mind - opening ' +
					'both of them to suggestion, making her virtual putty in your hands.</p>' +
					'<p>"Yes.  Animals.  Pets.  The kind that follow you around, always obeying your commands, and worshipping ' +
					'their owners like their own personal gods.  Like man\'s best friend," you say. "Don\'t you just love pets?"</p>' +
					'<p>"Yes...  Love pets..." she moans, the strength of her newly discovered feelings beginning to overwhelm her.</p>' +
					'<p>"I bet you\'d love to <i>be</i> a pet,too," you say to her, then notice how distracted she is getting.</p>' +
					'<p>"Perhaps you should sit down and play with yourself, Debra.  You seem a little light headed and you feel very turned on at the idea don\'t you.  We wouldn\'t want you to fall, now would we?"</p>' +
					'<p>She hesitates, "No?" You smile.  "You\'re a good girl though, aren\'t you? A good girl who always does as she is told."</p>' +
					'<p>Her brow furrowed, Debra is deep in thought.  "Yes?"</p>' +
					'<p>You pause to enjoy the moment, then start to chip away at her resolve. "Yes, you\'re a good girl. In fact...  I bet you\'re going to start playing with yourself right now, aren\'t you."</p>' +
					'<p>"Play with myself?  That would be...  I shouldn\'t.  I\'m in public...  should I?" she asks, hands already ' +
					'snaking down to rub her clit, sending even more waves of mind-numbing pleasure through her.</p>' +
					'<p>"A real woman wouldn\'t do that in public.  But you\'re not a real woman, are you Debra... you\'re my pet."</p>' +
					'<p>"Your pet?" she asks, between moans.</p>' +
					'<p>"That\'s right, my pet. My dog, my toy, my bitch. A slut who always obeys her <i>Owner</i>."</p>' +
					'<p>"Owner?  But people can\'t be owned..."</p>' +
					'<p>"People?" you ask.  "People are independent, strong women in complete control of their actions.  You aren\'t in control ' +
					'anymore, Debra.  You can feel the pleasure can\'t you?  I\'m causing that pleasure, Debra...  I am the reason you can\'t control yourself."</p>'
				);

				// Choices
				startQuestions();
				addLinkToPlaceC(md, "order Debra to SIT", Place, 'type=recharmdebrapark2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "recharmdebrapark2") {
				// Recharm in the park (was GF now puppy)
				md = WritePlaceHeader();
				var myName = perYou.getMaster();
				this.showPerson("park-recharm2.jpg");
				addPlaceTitle(md, "Debra, your Puppy");

				md.write(
					'<p>"Yes!" she moans, orgasming at your command - her new reality finally washing over her in the ' +
					'overwhelming wave of pleasure.  She begins barking as the orgasm washes away the last traces of her will.</p>' +
					'<p>When she recovers she looks around, a sense of loss in her eyes.  For a moment you wonder if ' +
					'something went wrong, then she looks up at you. ' +
					'"Please," she begs "Please, will you be my ' + myName + '?"  She kneels at your feet, clothes ' +
					'forgotten behind her.  "Please, I have no purpose without someone to own me. ' +
					'Who will I love?  Who will I worship?"</p>' +
					'<p>You smile down at her, and pat her on the head - running your hand through her dark hair.  "Of ' +
					'course, my pet.  I will take good care of you.  You belong to me now.  I <i>own</i> you."</p>' +
					'<p>She smiles a slow smile and looks up at you.  "Oh thank you, ' + myName + '. ' +
					'I will be the most loyal, loving pet.  I will do anything you ask and I promise to never disobey you...  I owe you ' +
					'everything ' + myName + '; without you I am nothing."</p>' +
					'<p>You can hardly take it anymore, and pull her up to you and kiss her.  She responds, passionately ' +
					'running her hands over your body.</p>' +
					'<p>You feel her need for you, her desire.  Then, pushing her back to her knees you unzip your pants. ' +
					'"Now, my pet.  Worship your <i>' + myName + '</i> like the good little bitch you are," you command, looking down at her.</p>'
				);

				if (perYou.isMaleSex()) md.write('<p>"Oh Yes, ' + perYou.getMaster() + '!" she cries, immediately taking you in her mouth and attempting to give you the best blowjob she can, licking and sucking gleefully - happy to serve her ' + perYou.getMaster() + '.</p>');
				else md.write('<p>"Oh Yes, Mistress!" she cries, diving at your muff, her sudden hunger for you even more evident - her tongue immediately seeking out the best ways to pleasure her Mistress.</p>');
				md.write('<p>You hear her sigh a mixture of pleasure and contentment as she takes to her task.');

				// Choices
				startQuestions();
				addLinkToPlace(md, 'return to the Kelly\'s home', 112);
				WritePlaceFooter(md);
				return true;
			}							
		}
		
		if (Place == 44) {
			// Kollan St
			clv = this.getCharmedLevel();
			if (sType === "walkies") {
				// Walkies
				md = WritePlaceHeader();
				this.setFlag(2);
				this.showPersonRandom("walkies", 3);

				addPlaceTitle(md, "Taking Your Pet, " + this.getPersonName() + " for a Walk");
				md.write('<p>You tell your loyal little pet that it is time to walk her like a good little puppy. You both walk for a while around the area, she follows contentedly behind you, completely naked except her her shoes.</p><p>You pass a few people who look shocked, at both her nudity and her clear submission to you.</p>');

				// Choices
				startQuestions("Where will you walk to:");
				if (isDay()) addLinkToPlaceC(md, 'take your puppy for a run in the park', 87, 'type=parkwalkies');
				addLinkToPlace(md, 'return to the Kelly\'s home', 112);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType === "debraskateboarding1") {
				// Skateboarding
				md = WritePlaceHeader();
				this.setFlag(9);
				WaitHereOnly(6);
				this.showPersonRandom("skaterchick1", 2);

				addPlaceTitle(md, "Skateboarding with Debra");
				md.write(
					'<p>Debra says there is a good place not far from here for skateboarding. She quick changes into some cute gear and grabs to boards and safety gear. You walk to the place just up Kollan Stret, and she excitedly talks about her board, tricks and so on. She is clearly no poser, but a skilled skater. You on the other hand, you are no novice but nothing on the level she is talking about.<p>' +
					'<p>When you arrive you both skate for a while, you try to bust out some tricks, but you can quickly see Debra completely out-classes you. After a while you just watch her admiringly.</p>' +
					'<p>Debra does a complex trick, finishing in a spin that ends with her facing away from you, Debra looks back at you and says,</p>' +
					'<p>"Like my Backside?" and she smiles. You know that she technically referred to her trick, a backside, but this was also meant as a double entendre. You are amused as she speaks a little more, referring to \'gyrating\', \'getting boned\', \'grinding\' and ending with saying there is a sick funbox nearby.</p>' +
					'<p>While all skater terms, this was more an invitation...</p>'
				);
				
				// Choices
				startQuestions();
				addLinkToPlaceC(md, 'grab her backside near the funbox', Place, 'type=debraskateboardingsex');
				addLinkToPlace(md, 'return to the Kelly\'s home', 112);
				WritePlaceFooter(md);
				return true;
			}	
			if (sType === "debraskateboardingsex") {
				// Skateboarding
				md = WritePlaceHeader();
				this.showPersonRandom("skaterchick2", 2);

				addPlaceTitle(md, "Debra\'s Backside");
				md.write(
					'<p>You ask Debra to show you her backside..trick, and she lead you to a slightly more private area, at least a bit more out of sight than where you were.</p>' +
					'<p>Debra strips off her clothing and for a moment poses with her skateboard, but then puts it aside to embrace you, and let\'s you grab her backside, and more!</p>'
				);
				
				// Choices
				startQuestions();
				addLinkToPlace(md, 'return to the Kelly\'s home', 112);
				WritePlaceFooter(md);
				return true;
			}		
		}
		if (Place == 144) {
			if (sType == "debratennis") {
				// Tennis
				md = WritePlaceHeader();
				this.setFlag(9);
				WaitHereOnly(6);
				this.showPerson("tennis1.jpg");

				addPlaceTitle(md, "Playing Tennis with Debra");
				md.write(
					'<p>You invite Debra out to play a game of tennis as you saw some rackets earlier, and she brightly agrees says she has always enjoyed playing, but comments she is only a mediocre player. She quickly gets changed and gets the gear and you head off to the tenns courts at Glenvale High. You are a student there so there is no problem using the courts, and when you get there no one at all is paying. Tennis does not seem that popular at school.</p>' +
					'<p>You play a game with Debra, you are definitely the better player, but not that much. Still it is enough to win the game, but Debra is quite athletic, she just lacks practise.</p>' +
					'<p>After the game you sit with her and have a drink she brought and you do notice how beautiful she is with the fine sheen of sweat and flushed from the exercise. You are completely alone out here and you could try an make a move. Try...the spell pretty much assures success but...</p>'
				);
				
				// Choices
				startQuestions();
				addLinkToPlaceC(md, 'kiss Debra', Place, 'type=debratennissex');
				addLinkToPlace(md, 'return to the Kelly\'s home', 112);
				WritePlaceFooter(md);
				return true;				
			}
			if (sType == "debratennissex") {
				// After Tennis
				md = WritePlaceHeader();
				this.showPerson("tennis2" + (perYou.isMaleSex() ? "b" : "g") + ".jpg");

				addPlaceTitle(md, "Playing with Debra");
				md.write(
					'<p>You kiss Debra and she returns it passionately, and the kiss grows more and more passionate. Quickly you both lose your clothing and it is now time to \'' + (perYou.isMaleSex() ? 'ball one' : 'love one') + '\'</p>' +
					'<p>After a passionate, public encounter you both redress and kiss again. You gather your gear and return back to Debra\'s home.</p>'
				);
				
				// Choices
				startQuestions();
				addLinkToPlace(md, 'return to the Kelly\'s home', 112);
				WritePlaceFooter(md);
				return true;				
			}			
		}
		
		if (Place == 114) {
			// Garden/TV Room
			clv = this.getCharmedLevel();
			if (sType == "debrafuck") {
				// Doggy-style/Join
				md = WritePlaceHeader(false,  (!perYou.isMaleSex() && isExplicit()) || (!isDay() && clv == 2) ? '' : 'td-left-med');
				if (!isDay() && !perYou.isMaleSex() && isExplicit()) this.showPersonRandomXDN(clv == 2 ? "home-fucklg" : "home-fuckdg", clv == 2 ? 2 : 1);
				else if (isDay() && !perYou.isMaleSex() && isExplicit() && clv == 1) this.showPersonX("park-fuckga.jpg");
				else if (isDay() && isExplicit() && perYou.isMaleSex() && Math.random() < 0.7) this.showPersonRandomX("park-fuckb", 1);
				else this.showPersonRandomDN(clv == 2 ? "home-fuckl" : "home-fuckd", 3);
				if (clv == 2) addPlaceTitle(md, isDay() ? "Join " + this.getPersonName() + " in the Garden" : "Join " + this.getPersonName() + " in the TV Room" );
				else addPlaceTitle(md, "Taking Your Pet, " + this.getPersonName());

				if (clv == 2) {
					// Lover Debra
					if (isDay()) md.write('<p>Debra looks at you expectantly and quietly undoes her clothing and whispers "Janet is just inside". You are not sure if this is a warning to be quiet or an expression of voyeuristic arousal.</p>');
					else md.write('<p>You join Debra in the TV Room, and she looks at you expectantly and quietly undoes her nightie and whispers "Janet is just outside". You are not sure if this is a warning to be quiet or an expression of voyeuristic arousal.</p>');
					if (perYou.isMaleSex()) md.write('You embrace your lover and make love to her until you cum into her orgasming body.</p>');
					else md.write('You embrace your lover and make love to her until your mutual orgasms.</p>');
				} else {
					// Puppy Debra
					md.write('<p>You tell your loyal little pet that it is time breed her like the good little bitch she is. ');
					if (perYou.isMaleSex()) md.write('You mount her and fuck her hard until you cum into your hot little bitch.</p>');
					else md.write('You put on your strap-on and mount her. You fuck her hard until you both orgasm loudly.</p>');
				}
				// Choices
				startQuestions();
				addLinkToPlace(md, 'talk more to ' + this.getPersonName(), Place);
				addLinkToPlace(md, 'return to the lounge room', 112);

				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "debrabj") {
				// Blowjob
				// nonex home-bjgla-night
				// nonex home-bjgda-night
				// ex home-bjga, home-bjgb, home-bjgc
				md = WritePlaceHeader(false, isDay() && isExplicit() && perYou.isMaleSex() ? 'td-left-med' : '');
				if (isDay()) {
					if (perYou.isMaleSex()) {
						if (isExplicit()) this.showPersonX("park-bjba.jpg");
						else if (clv == 2) this.showPerson("home-bjbla-day.jpg");
						else this.showPerson("park-bjba.jpg");
					} else if (isExplicit()) this.showPersonRandomX("park-bjg", 4);
					else if (clv == 1) this.showPerson("home-bjgda-day.jpg");
					else this.showPersonRandom("park-bjg", 2);
				} else {
					if (perYou.isMaleSex()) this.showPersonDN((clv == 2 ? "home-bjbl" : "home-bjbd") + "a.jpg");
					else if (isExplicit()) this.showPersonRandomX("home-bjg", 3);
					else this.showPerson("home-bjgla-night.jpg");
				}
				if (clv == 2) addPlaceTitle(md, isDay() ? "Join " + this.getPersonName() + " in the Garden" : "Join " + this.getPersonName() + " in the TV Room" );
				else addPlaceTitle(md, this.getPersonName() + ", the lap dog");


				if (clv == 2) {
					// Lover Debra
					md.write('You embrace your lover and ask if she would pleasure you orally. Debra agrees and kneels before you and ');
					if (perYou.isMaleSex()) md.write('gives you a skilled blowjob.</p>');
					else md.write('gives you a remarkable skilled licking!</p>');
				} else {
					// Puppy Debra
					md.write('<p>You tell your loyal little pet to put her tongue to use and ');
					if (perYou.isMaleSex()) md.write('give you a blowjob. She eagerly kneels before her ' + perYou.getMaster() + ' and take your cock into her mouth.</p>');
					else md.write('lick you like a good dog. She eager kneels before you and licks your pussy.</p>');
				}
				// Choices
				startQuestions();
				addLinkToPlace(md, 'talk more to ' + this.getPersonName(), Place);
				addLinkToPlace(md, 'return to the lounge room', 112);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "debratitsfuck") {
				// Doggy-style/Join
				md = WritePlaceHeader();
				if (!isDay() && isExplicit()) this.showPersonX("home-tfa.jpg");
				else this.showPersonDN(clv == 2 ? "home-tfl.jpg" : "home-tfd.jpg");
				if (isDay()) addPlaceTitle(md, "Tit-fucking " + this.getPersonName() + " in the Garden");
				else addPlaceTitle(md, "Tit-fucking " + this.getPersonName() + " in the TV Room");		

				if (clv == 2) {
					// Lover Debra
					md.write('<p>You embrace your lover and then she exposes her breasts and takes your hard cock between then. You cannot help to compare to her sisters larger breasts but Debra\'s are amply large enough and you avoid mentioning any comparison.</p>');
				} else {
					// Puppy Debra
					md.write('<p>You tell your loyal little pet that you want her you serve you with her breasts. Your goot little bitch eagerly puts your hard cock between her tits, and masturbates them with cute little whining noises. She is really getting into this puppy game so you avoid comparing to her sisters much larger breasts!</p>');
				}
				// Choices
				startQuestions();
				addLinkToPlace(md, 'talk more to ' + this.getPersonName(), Place);
				addLinkToPlace(md, 'return to the lounge room', 112);
				WritePlaceFooter(md);
				return true;
			}
		}
		if (Place != 112) return false;
		
		// Kelly House lounge room
		if (sType == "charmdebra1") {
			// Charm Debra 1
			md = WritePlaceHeader();
			this.showPersonDN("debra13a.jpg");

			addPlaceTitle(md, "Debra Under a Spell");

			md.write(
			  '<p>Debra falls under the spell, and she looks uncertain and speaks hesitantly,</p>' +
			  '<p>"Woof..I mean what was that..you know ' + perYou.getPersonName() + ' you really have some animal magnetism..no, no, no animals..I mean, why don\'t you cum..ah..'
			 );
				
			if (isDay()) md.write('come out here and join with..uh join me."</p><p>You answer, "Yes, I would love to cum out there with you".');
			else md.write('come with me in the TV room..uh join me."</p><p>You answer, "Yes, I would love to cum with you".');
			
			md.write(
			 ' As you approach you notice she is tugging on her clothing and the lower part of her dress rides up, exposing her lovely bottom. She smiles at you,</p>' +
			  '<p>"So ' + perYou.getPersonName() + ' do you have a girlfriend?"</p>'
			);

			startQuestions();
			addLinkToPlace(md, isDay() ? 'join her outside' : 'join her in the TV room', 112, 'type=charmdebra2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charmdebra2") {
			// Charm Debra 2
			md = WritePlaceHeader();
			this.showPersonDN("debra13b.jpg");

			addPlaceTitle(md, "Debra Under a Spell");

			if (isDay()) {
				md.write(
				  '<p>You step outside into the garden with Debra, and she looks at you very seductively. She has little on her mind except the arousal from the spell. She hesitantly says,</p>' +
				  '<p>"Would you like to..pet..I mean kiss me?"</p>' +
				  '<p>No reply is needed, you take her into your arms and kiss your new charming and charmed lover. Your embrace becomes more passionate and you make love to Debra on the garden wall. You wonder if the neighbours saw anything, but you do not care, Debra is now yours!</p>'
				);
			} else {
				md.write(
				  '<p>You step into the partially furnished entertainment room with Debra, and she looks at you very seductively. She has little on her mind except the arousal from the spell. She hesitantly says,</p>' +
				  '<p>"Would you like to..pet..I mean kiss me?"</p>' +
				  '<p>No reply is needed, you take her into your arms and kiss your new charming and charmed lover. Your embrace becomes more passionate and you make love to Debra on the couch. You wonder if Janet was watching, but you do not care, Debra is now yours!</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, isDay() ? 'return inside' : 'return to Janet', 112);
			addLinkToPlace(md, 'exit the house', 44);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "recharmdebrahome1") {
			// Recharm in the kitchen (was puppy, now GF)
			this.charmThem(2);
			md = WritePlaceHeader();
			this.showPerson("home-recharm1.jpg");
			addPlaceTitle(md, "Puppy Debra under a Charm Spell, Again");

			md.write(
				'<p>While you loyal puppy Debra is cute and amusing, you decide to try something else. Debra was very cute and pleasant to talk to when you met her in the park, so maybe you could normalise your relationship, under the effects of the charm spell that is. As you decide this you smell something from in the home, Janet must have just cooked something, probably little more than a snack.</p>' +
				'<p>You tell Debra to come with you into the kitchen and point to the counter and the bits left over there. She playfully smears herself with some leftover cream looking rather sexy but that is not the idea you had.</p?' +
				'<p>You cast the charm spell on her again, and tell her that she is after all a <b>girl</b> and your <b>girlfriend</b> and how she was going to prepare something for the two of you. She looks at you curiously, the <b>puppy</b> and the <b>girl</b> mixing in her mind and the sudden arousal from the spell. She whines, or is it groans,</p>' +
				'<p>"But the playful little dog...where did she go? Did you say <b>girlfriend</b>...am I your girlfriend..."</p>'
			);

			// Choices
			startQuestions();
			addLinkToPlace(md, '"Yes, Girlfriend"', Place, 'type=recharmdebrahome2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "recharmdebrahome2") {
			// Recharm in the kitchen (was puppy now GF)
			md = WritePlaceHeader();
			this.showPerson("home-recharm2.jpg");
			addPlaceTitle(md, "Debra, your Girlfriend under a Charm Spell, Again");

			md.write(
			  '<p>You tell her that she is your girlfriend and suggest she should put on an apron as she has spilled something on herself. She smiles and wipes it off and put on an apron.</p>' +
			  '<p>She looks at you very seductively as she licks a spoon clean. She has little on her mind except the arousal from the spell. She hesitantly says,</p>' +
			  '<p>"Would you like to..pet..I mean kiss me?"</p>' +
			  '<p>No reply is needed, you take her into your arms and kiss your new charming and charmed lover. Your embrace becomes more passionate and you make love to Debra on kitchen counter! You wonder if Janet was watching, but you do not care, Debra is now your charmed lover!</p>'
			);

			// Choices
			startQuestions();
			addLinkToPlace(md, 'return to the lounge roome', 112);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};

	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var img;
		if (this.getCharmedLevel() == 1) img = this.showPerson("poledanced.jpg");
		else img = this.showPersonRandom("poledance", 2);
		addPlaceTitle(md, this.getPersonName() + "\'s Dance");
		if (this.getCharmedLevel() == 1) {
			md.write(
				'<p>Earlier, with Janet\'s help you dressed Debra in a costume from Debra\'s wardrobe, a sort of playboy bunny thing. It amused you to have your puppy dressed as a bunny! When Debra arrives she has already stripped herself of most of the costume leaving collar and cuffs and the stockings, nothing else. She looks happy, but you wonder about her trip here from home, naked and at night!</p>' +
				'<p>She does an cvited and emergetic dance, not a strip-tease as she is already naked, but enteraining and she seems to really enjoy it!</p>' +
				'<p>After she looks excited and really happy, sitting with you, though you have to make her sit next to you, not at your feet.</p>'
			);			
		} else if (img.indexOf("poledancea") != -1) {
			md.write(
				'<p>Debra is dressed in a sort of playboy bunny outfit, not exactly but of that thene. She smiles at you but you can tell she is a bit nervous but she seems happy enough to dance for you here. It is clear as she dances she is danving her for lover not the audience. She does well but not quite as well as other dancers.</p>' +
				'<p>After she looks happy, but it is the happiness of a girlfriend pleasing her lover.</p>'
			);			
		} else {
			md.write(
				'<p>Debra is dressed in some lingerie, or maybe it is some very sheer club-wear, if so it is more likely something of Janet\'s but it seems to fit her very well. She smiles at you but you can tell she is a bit nervous but she seems happy enough to dance for you here. It is clear as she dances she is danving her for lover not the audience. She does well but not quite as well as other dancers.</p>' +
				'<p>After she looks happy, but it is the happiness of a girlfriend pleasing her lover.</p>'
			);
		}
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	// Questions for Debra
	per.showPersonChat = function(bGeneral, md)
	{
		if (sType !== "" || !this.isHere()) return;
				
		if (Place != 87) return;
		
		if (!isPlaceKnown("KellyHouse")) addQuestionC(md, 'tell her you live on Kollam St too', "DebraKelly", 4000);
		else if (!this.checkFlag(7) && !this.isCharmedBy()) {
			addPopupLinkC(md, 'chat with Debra', "Chatting with Debra",
				this.addPersonString("debra1c.jpg", "height:max%", "right") +
				'You talk to Debra for a while about little that matters, of Glenvale and about her, really just getting to know her a little better.</p> ' +
				'<p>While you talk you notice she has a habit of tugging on the hem of her dress, enphasising how short it is and to a lesser degree her figure and cleavage. You are unsure if the is a deliberate ploy or just some old habit.</p>' +
				'<p>She does seem to know Glenvale quite well as she deftly and politely refuses your offer of a tour, or at least a walk around town. She does seem pleased with the offer but mentions something vague about things she has to do.</p>' +
				'<p>She changes the topic a points out a person walking a pair of dogs and she comments "Nice puppies". A crude or is it flirtaceous...no crude...thought crosses your mind about saying how her puppies are nicer...but you refrain from saying it.',
				true, "setPersonFlag('DebraKelly',7);WaitHere();");
		}
		if (canMoveDavyToHotel2()) addQuestionC(md, 'ask ' + this.getPersonName() + ' if she has seen Davy Robbins', "DebraKelly", 6006);
		if (this.isCharmedBy()) {
			if (!this.checkFlag(3)) addQuestionC(md, '"fetch magic artifacts ' + this.getPersonName() + '"', "DebraKelly", 6501);
			addLinkToPlace(md, 'tell ' + this.getPersonName() + ' she has been a GOOD GIRL', Place, 'type=goodgirl');
		} else if (checkPersonFlag("JanetKelly", 1) && !this.checkFlag(6)) {
			// Have met Janet
			startAlternatives(md, "You are undecided what to tell Debra...");
			addPopupLinkC(md, '"I met your sister, she needs help unpacking"', "Debra returning home",
				this.addPersonString("debra1b.jpg", "height:max%", "right") +
				'Debra frowns a little, "I suppose I have been avoiding it a little, ok, enough then for this walk. Why not visit sometime to help us?"' +
				'<br><br>With that she starts to leave, though she briefly hesitates as she gets her dress caught on a bush. She re-adjusts her dress and you see a lovely glimpse of her thigh.',
				true, "setPersonFlag('DebraKelly', 6);movePerson('DebraKelly',112);dispPlace();");
			addTextForQuestions(md, "then again as you notice a man walking his dog nearby...", "center");
			addLinkToPlaceC(md, '"It is a lovely day here in the park!"', 87, '', '&quot;Yes it is, I think I will walk around for a bit more&quot; You also mention the dog-walker and how you like dogs, she smiles and agrees.', "Debra", "setPersonFlag('DebraKelly', 6);");
			endAlternatives(md);
		}
	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			// Janet @ Debra & Janet Kelly's Residence
			if ((Place == 112 || Place == 114) && this.isHere()) {
				var perJ = findPerson("JanetKelly");
				var clvJ = perJ.getCharmedLevel();
				//if (this.getCharmedLevel() === 0) {
					if (clvJ === 0) {
						if (isSpellKnown("Shielded Charm")) {
							if (this.getCharmedLevel() === 0) CastCharmSpell("DebraKelly", 112, 2, 'type=charmdebra1', '', 'type=recharmdebrahome1');
							else return "";		// Default to Janet handling here
						} else addComments('With the two sisters here you cannot cast the spell, you will have try something else.');
					} else if (this.isCharmedBy() && this.getCharmedLevel() == 2 && perYou.checkFlag(26)) addComments("While you might be able to alter the charm spell Debra is under, you get the feeling that you need to do this somewhere else, more public.");
					else CastCharmSpell("DebraKelly", 112, 2, 'type=charmdebra1', '', 'type=recharmdebrahome1');
					return "handled";
				//}
			}
			
			// Debra Kelly in Park ONLY if Shielded Charm
			else if (Place == 87 && this.isHere()) {
				if (isSpellKnown("Shielded Charm")) {
					if (this.isCharmedBy() && this.getCharmedLevel() == 1 && perYou.checkFlag(26)) addComments("While you might be able to alter the charm spell Debra is under, you get the feeling that you need to do this somewhere else, more homely.");
					else CastCharmSpell("DebraKelly", Place, 1, 'type=charmdebrapark1', '', 'type=recharmdebrapark1');
				} else addComments("Don't cast the spell here. It is too public.");
				return "handled";
			} else if (Place == 44 && this.isHere()) {
				if (this.isCharmedBy() && perYou.checkFlag(26)) {
					if (this.getCharmedLevel() == 1) addComments("While you might be able to alter the charm spell Debra is under, you get the feeling that you need to do this somewhere else, more homely.");
					else addComments("While you might be able to alter the charm spell Debra is under, you get the feeling that you need to do this somewhere else, more natural.");
				}
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
			gotoPlace(Place, 'type=debrapool');
			receiveCall('', 'You call Debra to invite her to join you at the pool for a swim, and she answers enthusiasticaly, "Yes please!" and hangs up. You take that to mean she will be there soon.');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
}
