// Jesse and Legion

var perJesse;

function isDemonFreed() { return perKurndorf.getQuestSeance() >= 70; }
function isDemonInTown() { return perKurndorf.getQuestSeance() >= 70 && perJesse.getDemonPath() < 500; }
function isDemonQuestDone() { return perJesse.getDemonPath() >= 500; }
function isDemonBound() { return perJesse.checkFlag(12); }
function isDemonGone() { return perJesse.getDemonPath() == 900; }
function isJesseOk() { return perJesse.getDemonPath() >= 600; }

/****************************************************************
Jesse (Girl @ Hotel) Response Base
or
Demon Legion
****************************************************************/
function RepliesJesse(nR)
{
	//var bCharm = per.isCharmedBy();
	var myName = per.getYourNameFor();
	var perD = findPerson("Desiree");

	/****************************************************************
	Jesse
	****************************************************************/
	if (nR == 12101)
	{
		perJesse.place = 161;
		perKurndorf.setQuestSeance(20);
		Place = 161; //Move you to the cellar with her
		bChatLeft = false;
		addComments('"A secret place sounds exciting. Sure, why not have a little bit of adventure.  There\'s nothing else to do around here," she says, smiling at you.<br>');
	}
	else 	if (nR == 12200)
	{
		perJesse.setDemonPath(602);
		addComments('"Dont\' worry about her, she is not very talkative, but she is really helpful and cute," she says, smiling at you. Once again the thrall, or Lucy, says nothing, just looks at Jesse with a look of complete devotion.');
	}
	else 	if (nR == 12201)
	{
		perJesse.setDemonPath(603);
		addComments('"A bit off, maybe I got a cold as well, but probably just a hangover. I think I remember you helping out at times, thank you" she says, smiling at you and she leans over and gives you a kiss on the cheek.');
		if (perJesse.checkFlag(6)) addCommnts('</p><p>Jesse suddenly looks down and turns away from you and grabs piece of clothing and holds it in front of her waist. For a moment you thought you may of seen a bulge forming, does she have a cock like you saw in that photo? You are sure when she was ill you saw her naked enough and there was nothing like that there. Maybe it can appear at will, or accident?');
	}
	else 	if (nR == 12202)
	{
		perJesse.setDemonPath(604);
		addComments('"Weird things, but they are probably dreams...I mean I am not some sort of slut...was I?" she asks a little hesitantly. You reassure her that it must have been a dream, there is no way <b>she</b> was a slut.');
	}
	
	/****************************************************************
	Demon in Jesse
	****************************************************************/
	else if (nR == 14410)
	{
		addComments('<p>"Call us?" she asks.  "Ah, yes...  We are <b>LEGION</b>," she says, the name shaking you to your core with its weight.  "But you may use this body\'s name...  Call Us Jesse.  Yes... We like that name."</p>');
		perJesse.setDemonPath(11);
	}
	else if (nR == 14431)
	{
		perJesse.setDemonPath(35); // Demon Path
		addComments('<p>"Why do you ask, ' + myName + '?  Can\'t We just be enjoying ourselves in this beautiful park your people have made here?" She asks.</p>');
	}
	else if (nR == 1841)
	{
		if (!perJesse.checkFlag(1))
		{
			perJesse.setFlag(1);
			addComments('<p>"You aren\'t the only one who can steal the will of those around them.  This," She says, running her hand through her pet\'s hair.  "This is within Our power... to completely enthrall a creature to Our will.  The process is quite pleasurable, We assure you."</p>');
		}
		else
		{
			perJesse.setFlag(2);
			addComments('<p>"It was very simple, ' + myName + '," She says beckoning you closer and pushing her thrall away as she turns your attention to you.</p><p>"Would you like to find out?" She whispers... "We can show you how it feels."');
		}
		setPersonFlag("Mom", 2);
	}
	else if (nR == 1842)
	{
		bChat = false;
		Place = 63;  //Put you back in the Park Pathway
		setQueryParams();
		perJesse.place = 10;  //Put Jesse back in "Out and About"
		perJesse.setDemonPath(50);  //Move "demon Path" forward to start the countup to the next encounter
		movePerson("Seraphina", 282);

		addComments('<p>Jesse, or rather Legion, hisses her contempt at you as you once again shrug off the haze that was clouding your mind.</p><p>"This much We know, and you shall regret the shirking of Our attentions." It hisses, draping a few clothes over her body and dragging off her thrall and leaving you alone once again.</p>');

	}
	else if (nR == 1843)
	{
		perJesse.setFlag(3); //Asked the question
		addComments('<p>"Oh that one?" She asks, feigning innocence and then flashing an almost predatory smile.  "We left her with another friend of Ours.  She should keep them both busy for a while."</p>');
	}
	else if (nR == 1844)
	{
		perJesse.setFlag(3, false); //Reset her to the normal picture
		perJesse.setFlag(4);  //Have resisted her temptation at home as well
		IncreaseMomsArousal(1, 2);
		if (perJesse.getDemonPath() < 65) perJesse.setDemonPath(65); //Advance the Demon Path
		addComments(
			'<p>"Fine." She hisses, a flash of anger crossing her face before quickly regaining her composure.  "Look what you do to Us ' + myName + '.  We are <i>not</i> used to my advances being so easily ignored. - Besides, that is not what We are here for."</p>' +
			'<p>She smiles,<br/>"At least your dear mother is very susceptible to simple hypnotic suggestions. You know people will not do anything against their will while in a trance and it makes some glamours and other such enchantments easier. She will not remember except in her dreams. Ahh so willing..."</p>'
		);

	}
	else if (nR == 1845)
	{
		perJesse.setFlag(5); //Have asked about your Mom
		if (perJesse.getDemonPath() < 65) perJesse.setDemonPath(65); //Advance the Demon Path
		IncreaseMomsArousal(1, 2);
		addComments(
			'<p>"Your Mother?" She asks, almost amused with herself. "Don\'t worry.  We have done nothing to any of your family.  Nothing beyond a simple glamour to mask my somewhat less than \"presentable\" appearance."</p>' +
			'<p>You remember how your mother looked and again ask the demons,<br/>"She is very susceptible to simple hypnotic suggestions. You know people will not do anything against their will while in a trance and it makes some glamours and other such enchantments easier. She will not remember except in her dreams. Ahh so willing..."</p>' +
			'<p>You try to pry further but the demon just smiles.'
		);
	}
	else if (nR == 1848) // Wants to give you the stone.
	{
		if (perYourBody.NoItems < perYourBody.MaxItems) // Have room
		{
			bChat = false;
			addComments(
				perJesse.addPersonFace() +
				'<p>"Here you are..." She says lustfully as she hands over the stone.</p>' +
				'<p>"We will find you when you have the relic. We believe it is being held at the <i>church</i>." She hisses in contempt.  "We can not go there.  Get it for Us and We will contact you when you have it." She says as she leaves you.</p>'
			);

			if (perJesse.checkFlag(8))
			{
				perYourBody.PutItem(5);
				perJesse.setFlag(8, false); //No longer wants to give you the stone
			}

			if (!isPlaceKnown("Church")) setPlaceKnown("Church");	//Know about the church now
			if (!isPlaceKnown("Graveyard")) setPlaceKnown("Graveyard");	//Know about the graveyard now
			Place = 45; // Put you back in the Kitchen
			perJesse.place = 10; // Put the Demon back "Out and About"
			perJesse.setDemonPath(100); //Advance the Demon path to start the wait for you to get the relic
			perD.setQuestRelic(5);	//Start the "artifact" path
		}
		else addComments('<p>"Oh, We would love to give it to you ' + myName + ', but We don\'t think you could carry it.  Perhaps if you made room in your backpack..."</p>');

	}
	else if (nR == 18421)
	{
		addComments('<p>"Mmmm..." She moans, before finally pushing her pet away long enough to turn and face you. "Yes, ' + myName + '.  Do you have something for Us?"</p>');
		perJesse.setFlag(1 , false);  // No longer distracted
	}
	else if (nR == 18422)
	{
		addComments('<p>"Why We wanted it is no concern of yours, ' + myName + '.", she says, evidently not pleased to be interrupted for such questions.</p><p>"We wanted it, and you agreed to get it.  Now, do you have it for Us?"</p>');
		perJesse.setFlag(2); // Have asked the question
	}
	else if (nR == 18423)
	{
		addComments('<p>"We are not entirely sure." She says, blatantly lying to your face.</p><p>"All that concerns you is that once it is Ours, We will no longer remain in your pathetic little town."</p>');
		perJesse.setFlag(3); // Have asked the question
	}
	else if (nR == 18424)
	{
		addComments('<p>"We are creatures of law, not pure chaos, although We do revel in chaos.  We have given our word.  Our word is law.  We shall leave your town and do no harm..."</p><p>Then, she eyes her pet for a moment.  "We shall even leave <i>this</i> to you," She says, running her hands through her thrall\'s hair.</p><p>"As a... gift.  Now, do you have it?"</p>');
		perJesse.setFlag(4); // Have asked the question
		perJesse.setFlag(8); // Thrall will now give you a stone after Jesse leaves
	}
	else if (nR == 18425)
	{
		addComments('<p>"Mmm...  We have found this particular thrall to be most..." She says. The thrall\'s sightless eyes turn to you, and it says, "Sensitive to our talents". It speaks with Jesse\'s voice.</p>');
		perJesse.setFlag(5);
	}
	else if (nR == 18426) //v184 - 2nd - offset 6
	{
		addComments('<p>"Mmm..." She sighs. "Now, where where We?  Ah yes, do you have the relic ' + myName + '?" She asks.</p>');
		perJesse.setFlag(5, false);
	}
	else if (nR == 14465)
	{
		perJesse.setDemonPath(70);
		addComments('<p>"Please," She hisses, a unpleasant look crossing her face.  "We told you to call Us Jesse.  That is the name of this... <i>flesh</i>."  She says, running her hands up and down the body and momentarily distracted by the experience.  "Allow me to explain..."</p>');

	}
	else if (nR == 14470)
	{
		perJesse.setDemonPath(75);
		perJesse.setFlag(8); //Wants to give you the stone.
		addComments('<p>"We need something.  Something We can not get on Our own.  But you... You could get it for Us.  And in return we could do something for you.  Perhaps give you something that you need to further your own goals?"</p>');
	}
	else if (nR == 144151) //Told her you don't have it
	{
		bChat = false;
		addComments('<p>"Then what are you doing here wasting Our time." She demands. "We know you have it.  Now bring it to us!" She says, literally kicking you out of the room.</p>');
		Place = 124; //Put you back in the Hotel Bar
	}
	else if (nR == 481) //Have the Artifact and are Giving it to her
	{
		perD.setQuestRelic(100);	//Church Relic Path - You have handed it over
		perJesse.setFlag(5, false);
		perJesse.setFlag(1, false);
		if (!checkPersonFlag("Mom", 2)) IncreaseMomsArousal(1, 2);

		if (perJesse.checkFlag(11)) {
			//You anointed the Relic with the Holy Water
			perJesse.setDemonPath(500); //Demon is trapped in the Relic
			perJesse.setTimeFreed(nTime);
			perJesse.setFlag(12);
			perJesse.place = 375;		// Room 113 as herself
			if (!isMurderPath()) {
				setPlaceKnown("FrenchClassroom");
				movePerson("MsJones", 145);
				movePerson("Anita", 195);		// Place Anita at the General Store
			}

			perYourBody.DropItem(48); // Drop the relic in the room
			setPersonFlag("Lucy", 1);
			getBaseItemObj(48).image = 'artifact3.jpg';
			
			addComments('<p>Jesse reaches out and snatches the anointed relic from your hands, then screams in pain.  A storm of red flashes before your eyes, swirling violently around Jesse and into the relic as <i>Legion</i> is drawn out of its host.</p><p>You hear a faint sigh from the demon as it is drawn into the relic "...jones..."</p>');

		} else {
			//You DIDN'T annoint it with Holy Water
			perJesse.setDemonPath(900); //Demon has LEFT the game.
			perJesse.place = 900;
			setQueryParams('type=left');
			if (!isMurderPath()) {
				setPlaceKnown("FrenchClassroom");
				movePerson("MsJones", 145);
				movePerson("Anita", 195);		// Place Anita at the General Store
			}
			//Remove the Relic from the game.
			perYourBody.RemoveItem(48);

			addComments('<p>"Oh yes...  this pleases Us." She hisses in delight, then flashing her eyes at you.</p><p>"You have served your purpose...  Normally I would kill you now, but according to our <i>agreement</i>", spitting the word with utter contempt</p><p>"We will instead leave this town.  Do NOT search for Us ' + myName + '.  Otherwise Our agreement is void."</p><p>Moments later, she has vanished.</p>');
		}

	}
	else if (nR == 19000)
	{
		perJesse.setFlag(9);
		addComments('<p>"Leanne, who is that?", and you tell her about your friend that she had taken as a thrall.</p><p>"Ahh, that one, names of mortals mean little to us.",  she says and looks at you with a smirk.</p><p>"Would you offer us another to take instead?", she laughs "Not that it matters, it is not in our power to restore, just to take."</p>');

	}
	return true;
}

function JesseNonTG()
{
	perJesse.setFlag(6, false);
	addSMS(perJesse.place == 8 ? 62 : 60);
	usePhone('sms');
	receiveCall("Legion",
		'Your phone chimes that a new SMS has arrived, and the voice continues in the active call,</p>' +
		'<p>"Hmm look at this slut, her tongue gives our body great pleasure. So susceptible to glamours and simple charms, she thinks she is with her lover. We will play with this one until ' +
		(perJesse.place == 8 ? 'come here' : 'have it for us') +
		'. Mmmmmm"</p>' +
		'<p>The phone call disconnects', true
	);
	WriteCommentsFooter(false);
}

function JesseTG()
{
	perJesse.setFlag(6);
	addSMS(perJesse.place == 8 ? 63 : 61);
	usePhone('sms');
	receiveCall("Legion",
		'Your phone chimes that a new SMS has arrived, and the voice continues in the active call,</p>' +
		'<p>"Look at us cumming down this sluts thoat. A simple <b>transformation</b> and so pleasurable. Ugggg the sluts ass is tight on our cock now and her groans are a joy to our ears. ' +
		'Even a ' + perYou.getWitch() + ' like you can do this...uhhhhh...all you need is the spell...uhhhh...and the Mirrors.....' +
		'Ummm...ugggg...take it you slut...take it all....uhhhhh....cummmmming....Huhhhh...We will play with this one until you ' +
		(perJesse.place == 8 ? 'cum here...like we did...' : 'have it for us') +
		'... clean it slut..."</p>' +
		'<p>The phone call disconnects.', true
	);
	WriteCommentsFooter(false);
}

// Initialise

function initialiseJesse()
{
	// Jesse and Legion
	perJesse = addPerson("Jesse", 0, "Jesse", '', false);
	per.setFlag(6);
	per.extra = [0, 0, 0];		// expanded arbitrary data
	per.getPersonName = function() { return this.getDemonPath() > 1 && this.getDemonPath() < 500 ? "Demon Jesse" : "Jesse"; };
	per.Replies = RepliesJesse;
	per.getDemonPath = function() { return this.extra[1]; };
	per.setDemonPath = function(no) { this.extra[1] = no; };
	per.getTimeFreed = function() { return this.extra[2]; };
	per.setTimeFreed = function(no) { this.extra[2] = no; };

	per.getPossessionFace = function() {
		if (isDemonInTown()) return "jesse-dface";
		if (this.getDemonPath() >= 500 && this.getDemonPath() < 600) return "jesse-sickface";
		return "jesse1b";
	};
	
	per.passTimeDay = function() {
		var dp = this.getDemonPath();
		if (dp > 500 && dp < 505) this.setDemonPath(dp + 1);
		else if (dp == 505) this.setDemonPath(600);		// Recovered!
		return '';
	};
	
	per.isPlaceImageRight = function() {
		if (Place == 375 && this.isHere() && sType === "" && this.getDemonPath() >= 500 && this.getDemonPath() < 600) return true;
		return false;
	};
	
	per.showPlaceImageRight = function(md) {
		this.showPerson("jesse-sickface.jpg", undefined, undefined, undefined, undefined, undefined, md);
	};
	
	per.showEventPopup = function()
	{
		if (Place == 375 && this.getDemonPath() == 600) {
			showPopupWindow("Jesse Has Recovered",
				this.addPersonString("jesse11.jpg", "height:max%", "right") +
				"You open the door to room 113 and you see Jesse standing there next to the thrall, she looks a little consused,</p>" +
				'<p>"Oh, ' + perYou.getPersonName() + '...Hi there, can I help you...what about that secret room...did we drink a lot or something like that, I do not remember a lot...Come in!"</p>' +
				'<p>As you step in you see Jesse is stanfing close to the thrall, resting an arm over her shoulders. She notices, and says,</p>' +
				'<p>"I do not think you have met Lucy here, she is a very close friend of mine...", she heistates, "I must really be hung-over, I do not remember your last name Lucy...Faller...Thaller...sorry I am still feeling off colour" The Thrall does not say anything in reply.<p>' +
				'<p>You are quite sure Jesse did not know Lucy before and this is some residual effect of the possession, a possession she seems to have no memory of! You distract Jesse with a lie about a wild party in the cellar and how you are not surprised she has no memory. Jesse smiles,</p>' +
				'<p>"I suppose that explains it, I am not really that sort of party-girl, but I suppose every once in a while!"',
				'perJesse.setDemonPath(601)'
			);
			return true;
		}
		return false;
	};
	
	per.showEvent = function()
	{
		var md, perSera;
		
		if (Place == 269 && sType == "jessepool") {
			WaitHereOnly(4);
			md = WritePlaceHeader();			
			if (!this.checkFlag(7)) {
				this.showPerson("jesse-pool.jpg");
				addPlaceTitle(md, "Swimming with Jesse");
				md.write(
					'<p>Jesse brightly agrees to a swim and she changes into a cute bikini and you go for a fun swim with her. As you look at her sitting on the edge of the pool after getting out, you are stuck with how cute she is looking!</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'say goodbye to Jesse for now', Place, '', 'Jesse waves goodbye as she leaves you to return to her room', '', "setPersonFlag('Jesse',7)");
			} else {
				var perLucy = findPerson("Lucy");
				perLucy.showPerson("lucy-pool.jpg");
				addPlaceTitle(md, "Swimming with Lucy");
				md.write(
					'<p>Jesse apologies that she is feeling unwell and suggest you go with Lucy instead. You feel a but unsure but agree</p>' +
					'<p>You go to the pool while Lucy changes and after a little a woman joins you, she looks a bit like the thrall, but her hair is different as is her general bearing. You realise this is Lucy, she must be using one of the minor glamours the demon-kind use, as Legion used with your Mom.</p>' +
					'<p>Lucy sits on the edge of the pool, she seems to have litte interest in swimming, but silently make it clear she is interested in <i>you</i>.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'give in to her desire...and yours', Place, 'type=lucypoolsex');
				addLinkToPlaceC(md, 'take Lucy the Thrall back to the hotel room', 375, '', '', '', "setPersonFlag('Jesse',7,false)");
			}
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 374 && this.place == 6) {
			// Event: Jesse visiting to bargain for the relic
			md = WritePlaceHeader(false, this.checkFlag(3) ? "" : "td-left-large");

			var myName = perYou.getPersonName();
			
			if (wherePerson("Miku") == 408) setPersonFlag("Miku", 24);

			// PICTURE REFERENCES
			if (this.checkFlag(3)) this.showPerson('jesse9.jpg');
			else this.showPerson("jesse8.jpg");

			/* TITLE LINE */
			addPlaceTitle(md, "Your Visitor in the Living Room");

			/* Description */
			md.write('<p>When you enter your living room you know who is there before you even lay eyes on her.  Her <i>scent</i> gives her away.  You steel yourself against her influence as best you can as you enter.</p>');

			if (this.getDemonPath() == 60) // Just walked in on her
			{
				this.setDemonPath(61); //Advance Path
				md.write('<p>"Hello there, ' + myName + '.  May we speak for a moment?" she asks, her voice not quite as sultry as you seem to recall it usually was when she was trying to seduce you.</p>');
			}
			if (this.checkFlag(3) && this.getDemonPath() < 65)
			{
				md.write('<p>"Concerned for my little thrall\'s safety, ' + myName + '?" she asks.  "Why?  Have you changed your mind about me?  Do you want me?" she asks, as her strength of her scent almost triples in intensity, making your head swoon.  "Would you like to... Kiss me?" she asks, wetting her lips.</p>');
			}
			else if (this.getDemonPath() == 70)
			{
				md.write(
					'<p>"I am here to declare a truce," she says.  "That is why I resisted the urge to enthrall your oh-so-tasty mother.  Her... <i>innocence</i> smells so sweet.  Not an easy thing to pass up."</p>' +
					'<p>The look on your face at her thinly veiled threat must have given her pause.  "I give you my word," she says in the most honest tone you have heard the creature use.  "As long as our truce lasts, I shall do no harm to your family.  I am a creature of habit,' + myName + ', and my word is binding."</p>'
				);
			}
			else if (this.getDemonPath() == 75)
			{
				md.write(
					'<p>"There is a special...  locket.  That We need.  But it is guarded in a place that we can not go.  We need this locket.  Get it for Us and we will leave you and your town to its own devices."</p>' +
					'<p>"And in return, We will give you this," she says, brandishing a small old stone in her hand that looks very familiar.  "We know you want this...  Your type always wants this..." she says, instinctually lacing her voice with a hint of lust.</p>'
				);
			}

			/* Dialogue Options */
			//**********************************************************************
			startQuestions();

			if (!this.checkFlag(3) && !this.checkFlag(4) && this.getDemonPath() < 65) addQuestionC(md, '"What happened to your pet?"', "Jesse", 1843);
			else if (!this.checkFlag(4))
			{
				addLinkToPlace(md, 'Give in to temptation and <i>kiss</i> her', 995);
				addQuestionC(md, '"Shove off, <i>Legion</i>.  I will not fall for that trick."', "Jesse", 1844);
			}

			if (!this.checkFlag(5) && this.getDemonPath() < 65) {
				addQuestionC(md, '"What did you do to my Mother?"', "Jesse", 1845);
			}

			if (this.getDemonPath() == 65) addQuestionC(md, '"Why are you here, <i>Legion</i>?"', "Jesse", 14465);
			else if (this.getDemonPath() == 70) addQuestionC(md, '"Fine then.  What do you want for this truce?"', "Jesse", 14470);

			if (this.checkFlag(8)) {
				// She wants to give you the stone
				addQuestionCO(md, 'Take the stone from her hand', "Jesse", 1848);
			}
		
			addLinkToPlace(md, 'walk to the kitchen', 45);
			addLinkToPlace(md, 'leave your house', 44);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "threatenlegion1") {
			md = WritePlaceHeader();

			if (this.place == 2) this.showPerson("jesse00p.jpg");	//Park
			else if (this.place == 6) this.showPerson("jesse00h.jpg");	//Hotel

			addPlaceTitle(md, "Threatening <i>Legion</i>");

			md.write(
				'<p>You raise the gun and, seeing your brandishing the weapon, Legion covers herself a little, though her thrall\'s efforts continue, and suddenly her eyes stop glowing.</p>' +
				'<p>The smell of sex still lies heavy in the air - small surprise with the thrall still putting on her show - but you suddenly don\'t feel so urgently aroused by it anymore.</p>' +
				'<p>"I..." she says.  "What was I... we were at the circle, doing that séance game, and then a ghost really appeared."</p>' +
				'<p>You gulp.  Inside that body, even subsumed by the demon\'s influence, Jesse is still alive... and still innocent.</p>' +
				'<p>Suddenly she sees the gun, her lack of decent clothes, and the thrall.  She is about to cry out, but instead she gives you a wry smile under red-gleaming eyes.</p>'
			);

			startQuestions();
			addLinkToPlace(md, "wait for her to speak", Place, 'type=threatenlegion2');
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
		if (sType == "threatenlegion2") {
			md = WritePlaceHeader(false, this.place == 2 ? "td-left-large" : "");
			perSera = findPerson("Seraphina");

			if (this.place == 2) perSera.showPerson("thrall1-1.jpg");	//Park
			else if (this.place == 6) this.showPerson("jesse10.jpg");	//Hotel

			addPlaceTitle(md, "Threatening <i>Legion</i>");

			md.write(
				'<p>"It wouldn\'t be as delectable for Us to let her panic," Legion says.  "Far better to feel her innocence around Us, like bathing in fine scented soapsss."</p>' +
				'<p>You smile back, grateful in spite of yourself for not having to deal with the panic of a victim of your dark experiment.  "I think you smell good enough already," you say before you can stop yourself.</p>' +
				'<p>Her thrall continues to play and lick at her Mistress, and the effect of the aroma you have been breathing without worry for the past minute hits you all at once.  Your eyes are drawn to Jesse\'s - No, you tell yourself, the demon\'s - succulent lips and you find you are wetting your own'
			);
			if (!perYou.isMaleSex()) md.write(' with your fingers');
			md.write(
				'.</p>"Indeed," she says.  "You like Us a great deal, don\'t you?  Lower that silly toy, ' + perYou.getPersonName() + '.  You wouldn\'t want to hurt Our vessel.  Or Us, for that matter..."</p>' +
				'<p>You avoid her gaze, afraid that she will draw you in, but you put away the gun.  You try to tell yourself it\'s only to protect Jesse."</p>'
			);

			startQuestions();
			if (this.place == 2) addLinkToPlace(md, 'Continue speaking with... Jesse...', 63, 'type=jessepark');	//Park
			else if (this.place == 6) addOptionLink(md, "Continue speaking with... Jesse...", "GoRoom113()");	//Hotel
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}

		if (sType == "jessepark") {
			// Event: Meet Demon Jesse at the Park
			md = WritePlaceHeader(false, !this.checkFlag(1) ? "td-left-large" : "");

			var myName = perYou.getPersonName();
			perSera = findPerson("Seraphina");
			perSera.charmThem("Demon");
			
			// Images
			if (!this.checkFlag(1)) perSera.showPerson("thrall1-1.jpg");
			else perSera.showPerson("thrall1-2.jpg");

			// TITLE LINE
			addPlaceTitle(md, "Encounter with a Demon");

			// Description
			md.write(
				'<p>You walk around a small bunch of trees and are greeted by a sight that would normally cause you to wonder what lottery you had won.</p>' +
				'<p>If you didn\'t know what was <i>hiding</i> in the beautiful creature before you, that is.</p>'
			);

			if (this.getDemonPath() == 30)
			{
				this.setDemonPath(31);
				md.write(
					'<p>"Well, well..." you hear the creature almost hiss.  "What a surprise running into you here, ' + myName + '."' +
					' As your eyes betray your desire and begin to wander over the sight before you the demon in Jesse continues.  "I\'m sorry ' + myName + ', should I introduce you to my little pet here?"</p>' +
					'<p>You recognize her \'pet\' as the young woman...Serena? Seraphina?...that you met in the Wild Ranges while she was hiking.</p>'
				);
			}

			if (this.checkFlag(1)) //Asked her what she did
			{
				md.write(
					'<p>The thrall begins to minister to her Mistress.  Within seconds the strong scent of Jesse\'s <i>scent</i> begins to assail your senses.</p>' +
					'<p>You can feel yourself quickly losing control, the power of the demon once again beginning to assert itself over your mind.  Kurndorf\'s warning echoes in your ears, but the longer you hover within reach of her, the less that voice is able to overcome her influence.</p>'
				);

				if (this.checkFlag(2))
				{
					md.write('<p>"Come to Us, ' + myName + '," she hisses into your ear. "Kiss Us, ' + myName + '," she says, her eyes and her smell drawing you in.</p>');
				}
			}

			// Dialogue Options
			//**********************************************************************
			startQuestions();

			if (!this.checkFlag(2))
			{
				if (!this.checkFlag(1)) addQuestionC(md, '"How?  What did you do to her?"', "Jesse", 1841);
				else addQuestionC(md, '"How did you do it?  Enthrall them?"', "Jesse", 1841);

				if (this.getDemonPath() == 31) addQuestionC(md, '"What are you doing here, Jesse?"', "Jesse", 14431);
				addLinkToPlace(md, 'leave Jesse to her fun', 63);
			}
			else
			{
				addQuestionC(md, '"Shove off, Legion.  I <i>know</i> what you are, remember?"', "Jesse", 1842);
				addLinkToPlace(md, 'Kiss the creature', 995);
			}

			WritePlaceFooter(md);
			return true;
		}
		
		if (Place != 375) return false;
		
		// Sex scenes in Room 113 with the Thrall Lucy without Jesse
		if (sType == "checkjesse") {
			// Have Given in to the Thrall's administrations
			md = WritePlaceHeader(false, 'td-none');
			addPlaceTitle(md, "Checking on Jesse");
			md.write(
				'<p>You decide to check on how Jesse is at the moment...</p>'
			);
			var s = this.showPersonArray(['jesse-sick1.jpg', 'jesse-sick2.jpg', 'jesse-sick3.jpg', 'jesse-sick4.jpg'], "80%", 'center');
			if (s.indexOf('jesse-sick1.jpg') != -1) {
				// Bathroom
				md.write(
					'<p>Jesse is lying on the bath, she has been sick and has washed herself. She looks weak and is awake but any attempt to talk to her only gets simple responses like "ok", "sure" but nothing more. You help her back to bed and she falls asleep immediately.</p>'
				);
				
			} else {
				// Bed
				md.write(
					'<p>Jesse is asleep in the bed, you try to gently wake her, but she does not respond. She seems to be otherwise well, just exhausted..</p>'
				);
			}
			
			startQuestions();
			addLinkToPlace(md, 'that is enough', 375);
			addLinkToPlace(md, 'walk back to the bar', 124);
			addLinkToPlace(md, 'leave the hotel', 123);
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	// Questions for Jesse
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 124) {
			// Introduction
			if (!this.checkFlag(10) && !isNight()) {
				addPopupLinkC(md, 'introduce yourself to the girl', "Jesse",
					this.addPersonString("jesse1c.jpg", "height:max%", "right") +
					"You approach the girl, as you do she gestures to you to step out of the noisy bar and you leave with her to the nearby beer-garden.<br><br>" +
					'"Hi there ' + perYou.getPersonName() + '," says the young girl. "My name is Jesse. This place is so boring. I wish that there was something exciting to do around here."<br><br>' +
					'Now if this was your friend Catherine speaking you would have taken what she said as a proposition, but Jesse seems so innocent, it was more like an invitation to play a game. You ask her why she is here if it is so boring,<br><br>' +
					'"I\'m here in town with my father, while he is here on business. He thought I would enjoy it here while he is off in his meetings, there are a lot of stories about witches and ghosts around here and I love those spooky stories!"<br><br>' +
					'You look at her innocent smile, and you suspect she may get more than \'spooked\' here in town.',
					false, "setPersonFlag('Jesse', 10);dispPlace();"
				);
			}
			// Seance start
			if (perKurndorf.getQuestSeance() == 19 && this.checkFlag(10) && !isNight()) {
				if (isCharmedBy("Bambi")) addQuestionC(md, '"Hey Jesse, wanna see a <i>secret room</i> I found?"', "Jesse", 12101);
				else {
					addPopupLinkC(md, '"Hey Jesse, wanna see a <i>secret room</i> I found?"', "Jesse",
						findPerson("Bambi").addPersonString("bambi8.jpg", "width:15%", "right") +
						'"A secret place sounds exciting. Sure, why not have a little bit of adventure.  There\'s nothing else to do around here," she says, smiling at you.</p>' +
						'<p>As you say this you notice ' + (findPerson("Bambi").other > 0 ? 'Bambi' : 'the barmaid') + ' looking at you and you realise it may be tricky getting down to the cellar with Jesse without her noticing.</p>' +
						'<p>For now you will have to delay your plans with Jesse, at least until you have ensured the loyalty of the hotel staff. You apologise to Jesse and tell her you got a message and have to do something first. She looks disappointed and makes you promise to come back later and she her the secret place.',
						false
					);
				}
			}
		}
		
		if (Place == 45 && this.whereNow() == 6) {
			//Demon is here
			addLinkToPlaceC(md, 'check on your <i>visitor</i> in the living room', 374, '', '', '', "Leave45()");
		} 

		if (Place != 375 || sType !== "") return;
		
		if (!isDemonBound()) {
			// Dialogue with Legion
			if (this.checkFlag(1)) {
				//If she is distracted
				addQuestionC(md, 'Interrupt her - "Uhm...  May we talk?"', "Jesse", 18421);
			} else if (this.getDemonPath() < 500 && !this.checkFlag(5)) {
				//Available to talk && not captured in artifact
				if (this.getDemonPath() == 151) addQuestionC(md, '"I\'m afraid I don\'t have it <i>on</i> me."', "Jesse", 144151);

				if (!this.checkFlag(9)) addQuestionC(md, '"Restore Leanne first!"', "Jesse", 19000);
				if (!this.checkFlag(2)) addQuestionC(md, '"Why did you want this thing again?"', "Jesse", 18422);
				if (!this.checkFlag(3)) addQuestionC(md, '"What does it do?"', "Jesse", 18423);
				if (!this.checkFlag(4)) addQuestionC(md, '"If I give it to you, then you are bound by <i>contract</i> to leave and do no harm here. Right?"', "Jesse", 18424);

				if (!this.checkFlag(5)) addQuestionC(md, '"Don\'t let me keep you from enjoying your <i>pet</i>"', "Jesse", 18425);
				if (perYourBody.FindItem(48) > 0) addQuestionCO(md, 'give <i>Legion</i> the relic', "Jesse", 481);	// Have the Catholic Relic

			} else if (this.checkFlag(5)) {
				//Enjoying herself
				addQuestionCO(md, 'give her a moment and enjoy the show', "Jesse", 18426);
			}
			return;
		}
		
		//Dialogue/Action options with Jesse after the exorcism
		if (this.getDemonPath() >= 500 && this.getDemonPath() < 600) {
			// While sick
			addLinkToPlace(md, 'check on Jesse', 375, 'type=checkjesse');
			return;
		}
		// Recovered!
		if (this.getDemonPath() == 601) addQuestionC(md, 'ask about Lucy', "Jesse", 12200);
		else if (this.getDemonPath() == 602) addQuestionC(md, '"How are you feeling"', "Jesse", 12201);
		else if (this.getDemonPath() == 603) addQuestionC(md, '"Do you remember anything more of the \'party\'"', "Jesse", 12202);
		else if (checkPlaceFlag("Hotel", 11)) addLinkToPlaceC(md, '"Jesse, feeling up to going for a swim?"', 269, 'type=jessepool');

	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Hotel Cellar
			if (Place == 161 && this.isHere()) {
				//Jesse is still here
				addComments('You cast the spell but it seems to bounce off of her, it is like she is immune somehow...  She seems so...  innocent.');
				return "handled";
			} 
			// Hotel Room 113
			if (Place == 375) {
				// Jesse + Thrall
				if (this.getDemonPath() < 500) {
					// Demon + Thrall is here
					addComments('You attempt to cast the spell, but if fails to take effect... Evidently the spell is not powerful enough to affect a demon.');
				} else addComments('You attempt to cast the spell, but if fails to take effect Jesse is still affected by the aftermath of her possession.</p><p>The thrall, has no will or apparently a soul and the spell is not needed, and also does not work.');
				return "handled";
			}
			// Pool
			if (Place == 269 && sType == "jessepool") {
				addComments('You attempt to cast the spell, but if fails to take effect Jesse is still affected by the aftermath of her possession.');
				return "handled";
			}
			// During the ritual
			if (Place == 340 || Place == 341 || (Place == 63 && sType == "jessepark") || (Place == 374 && this.isHere())) {
				addComments('You attempt to cast the spell, but if fails to take effect... Evidently the spell is not powerful enough to affect a demon.');
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	per.addPersonPhoneCall = function() {
		if (this.getDemonPath() == 150 && this.place == 10) {
			if (!this.checkFlag(14)) {
				if (makeCall(false, "unknown",
					'"Hello," says the voice, and a familiar chill runs down your spine. "We know you have it...We want it... We have been watching you.  We are waiting for you at the Broken Inn Hotel.  Bring it to us..."' +
					'"We can feel it ummm, just like we can feel this slut on our...mmmmmm"<br><br>' +
					addOptionLink("string", 'clit?', "setTimeout(JesseNonTG, 100)") +
					addOptionLink("string", 'cock?', "setTimeout(JesseTG, 100)")
				)) {
					this.moveThem(8);  // Put the Demon @ the hotel
					this.setFlag(13, false);
					this.setFlag(14);
					wanderLeanne();
					return true;
				}
			} else {
				if (makeCall(false, "unknown", '"Hello," says the voice, and a familiar chill runs down your spine. "We know you have it... We have been watching you.  We are waiting for you at the Broken Inn Hotel.  Bring it to us..."')) {
					this.moveThem(8);  // Put the Demon @ the hotel
					wanderLeanne();
					return true;
				}
			}
		} else if (this.checkFlag(13)) {
			if (makeCall(false, "unknown",
					'"Very close, you are getting very close...," says the voice, and a familiar chill runs down your spine. "We can feel it, just like we can feel this slut on our...mmmmmm"<br><br>' +
					'You cannot quite make out what she said next, her moan made it hard to hear...Was it....' +
					addOptionLink("string", 'clit?', "setTimeout(JesseNonTG, 100)") +
					addOptionLink("string", 'cock?', "setTimeout(JesseTG, 100)")
				)) {
				this.setFlag(13, false);
				this.setFlag(14);
				return true;
			}
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		if (id == 60) return receiveSMS('...', 'pussy slut', 'jessesms1.jpg');
		if (id == 61) return receiveSMS('...', 'cock slut', isExplicit() ? 'Explicit/jessesms1dg.jpg' : 'jessesms1.jpg');
		if (id == 62) return receiveSMS('...', 'pussy slut', 'jessesms3.jpg');
		if (id == 63) return receiveSMS('...', isExplicit() ? 'cock slut' : 'cum drinking cock slut', isExplicit() ? 'Explicit/jessesms3dg.jpg' : 'jessesms3dg.jpg');
		return '';
	};
}
