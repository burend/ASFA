/****************************************************************
Sister Desiree (NUN)

Sister Desiree’s SMS to you upon she first fails to get the relic:

My Lord! I have returned from the mission you have sent me on! I am waiting for your arrival at our usual place!

Sister desiree’s SMS to you upon she gets the Rosary:

My Lord! I have been a faithful servant! I brought what you asked for! I am waiting obediently for your arrival even if I have to wait here for hours! I am not going to move an inch away just to show you how loyal I am!

****************************************************************/
function RepliesSisterDesiree(nR)
{
	var perSister = per;
	//var pCharm = per.isCharmedBy();
	var myName = perSister.getYourNameFor();

	if (nR == 14110)
	{
		addComments('<p>Sister Desiree looks at you with an amazing intensity for a brief moment.  "May the Lord bless and keep you, child." She says, laying a hand on your shoulder.');
		if (perSister.other < 9) {
			//Only add the mana ONCE (the first time you "thank her"
			AddMana(8);
			addComments('</p><p>You feel a small surge in power as she does and you gain 8 mana.');
			if (isMurderPath()) perYou.addCorruption(-5);
			else perYou.addCorruption(-3);
		}
		perSister.other = 10;
	}
	else if (nR == 18309)
	{
		per.setQuestRelic(10);	//Set to "Have asked the right person"
		addComments('<p>"' + myName + '! How did you learn of that?  Yes, this church does protect a relic of my <i>prior faith</i>, but I did not think it would be of any use to you.  Oh please, ' + myName + '," She begs.  "Show me the error of my ways."</p>');
	}
	else if (nR == 18310)
	{
		per.setQuestRelic(15);  //Do you know where it is NOW
		addComments('<p>"Oh ' + myName + '!" She says, attempting to speak between the spikes of pleasure she feels.  "I... I believe my old Mother Superior protects it...  She...  She must hide it somewhere."</p>');

	}
	else if (nR == 18315)
	{
		per.setQuestRelic(20);  //Get it for me
		per.place = 1000;  //Set the Disciple as "Out and About"
		Place = 319;  //Put you back in the Empty Church Courtyard
		addComments('<p>"Yes, ' + myName + '.  Of course.  I will not fail you!" She states, the power of her faith almost overwhelming.  Within moments she has donned enough of her habit to not arouse suspicion and has disappeared into the church.</p>');
		startTimedEvent("ReturnDesiree()", 288);
	}
	else if (nR == 18320)  //Did you fail me
	{
		per.setQuestRelic(23);
		addComments('<p>"Oh please forgive me, ' + myName + '.  I am not worthy of your attention.  Not worthy of your worship.  I have failed you!" She cries out in anguish, pulling at her hair as it to tear it out of her head.</p><p>"Please, forgive me!  Teach me more of your way so that I may once again be in your favor!" She cries.</p>');
	}
	else if (nR == 18323) // Why couldn't you find it
	{
		per.setQuestRelic(25);
		addComments('<p>She tries to speak between racks of pleasure.  "I followed her for some time, ' + myName + '.  And inquired as discretely as I could...  But she never revealed it to me and I could not find it on my own..." Further speech is interrupted by a powerful orgasm.</p>');
	}
	else if (nR == 18325) // Did she say anything
	{
		per.setQuestRelic(28);
		addComments('<p>"All she would say is that she keeps it locked away in a safe place very close." She cries out again in pleasure.  "I searched the church, but I could not search her room.  She would never allow me in."</p>');
	}
	else if (nR == 18328) // I'll find it myself
	{
		per.setQuestRelic(30);
		addComments('<p>"Thank you for forgiving me, ' + myName + '.  Your message truly must be worshiped." She cries, her faith restored.  "Please, if there is any other way I may serve you..." She says, her eyes awash in devotion.</p>');
	}
	else if (nR == 18330)
	{
		per.setQuestRelic(33);
		addComments('<p>"Would her rosary work, ' + myName + '?" She asks, elated to be able to serve.  "She has worn it all the years that I have known her."</p>');
	}
	else if (nR == 18333)
	{
		per.setQuestRelic(35);  //Get it for me
		per.place = 1000;  //Set the Disciple as "Out and About"
		Place = 319;  //Put you back in the Empty Church Courtyard
		addComments('<p>"Yes, ' + myName + '.  Of course.  I will not fail you this time!" She states, once again almost overwhelming you with the power of her conviction.  Within moments she has donned enough of her habit to not arouse suspicion and once again disappeared into the church.</p>');
		removeTimedEvent("ReturnDesiree()");   // Reset, in case the previous version (for 18315) has not expired
		startTimedEvent("ReturnDesiree()", 288);
	}
	else if (nR == 18335) //Has the Rosary for you
	{
		per.setQuestRelic(38);
		PlaceI(44, 332); //Put the Rosary there with the Desiree Sex Page
		addComments('<p>"Oh yes," She cries, bringing herself to orgasm as you watch.  "Here you are, my ' + myName + ', my Angel.  Have I pleased you?"</p>');
	}
	else if (nR == 18340)
	{
		per.setQuestRelic(41);
		addComments('<p>"Oooooh," She moans...  "It was simple... I gave her a bit of hemlock infused tea.  Did you know it grows in an overgrown <i>wild</i> area just outside of town?"</p>');
		if (!checkPlaceFlag("WildRanges", 2)) {
			//Haven't already cast Clairvoyance to find Hemlock
			setPlaceFlag("WildRanges", 2);
			PlaceI(58, 26); //Put Hemlock @ Wild Ranges
		}
	}
	else if (nR == 1368) //Mother Superior giving Sister Desiree Stuff
	{
		perYourBody.DropAllItems("Desiree");

		addComments(
			'<p>"Yes, Mother Superior.  I will hold on to these for you. Thank you."</p>' +
			"<p>You give Desiree what you were carrying.</p>"
		);
	}
	else if (nR == 136) //Asking her about stuff but she's not charmed yet
	{
		per.setFlag(7);
		addComments('<p>"I don\'t see how you would know of such things," She says suspiciously.  "Nor do I see how that is any of your business."</p>');
	}
	else if (nR == 137) //Mother Superior giving you stuff
	{
		perSister.DropAllItems("You");

		addComments('<p>You pickup the items you had given Sister Desiree when you were possessing the Mother Superior</p>');
	}
	else if (nR == 3000)
	{
		//<ask about moving the ghost>
		if (Place == 384) bChatLeft = false;
		setPersonFlag("Ghost", 13);
		if (!perSister.isCharmedBy()) {
			addComments(
				'You ask Sister Desiree about ghosts and what keeps them tied to a particular place, and if they can move from that place,</p>' +
				'<p>"At one time I knew much on this, but now I have placed my faith in God and my service to the Church. I will not discuss such ungodly things now"'
			);

		} else {
			addComments(
				'You ask your disciple about ghosts and what keeps them tied to a particular place, and if they can move from that place.</p>' +
				'<p>Desiree asks you a series of insightful questions and gets the full details about Nurse Keana. She smiles,</p>' +
				'<p>"Please allow me a little time to investigate this ' + myName + '. With a little time and speaking carefully to some old contacts I am sure I can work out exactly what is needed. I will call you when I have discovered what is needed, it should be tomorrow!"'
			);
		}
	}
	return true;
}

function ReturnDesiree()
{
	findPerson("Desiree");
	if (per.place == 1000 && (per.getQuestRelic() == 35 || per.getQuestRelic() == 20)) {
		per.place = 332; //Put Sister Desiree back in her spot @ the Church
		if (per.getQuestRelic() == 20) perJesse.setFlag(13);
		return true;
	}
	return false;
}


/***************** Initialise ******************************************************************************/

function initialiseSisterDesiree()
{
	// Sister Desiree
	addPerson("Desiree", 332, "Desiree", '', false);
	per.Replies = RepliesSisterDesiree;
	
	per.getPersonName = function(full) { return this.isCharmedBy() && full !== true ? "Desiree, Disciple of Desire" : "Sister Desiree"; };
	
	per.getQuestRelic = function() { return this.extra[0]; };
	per.setQuestRelic = function(no) { this.extra[0] = no; };
	
	per.isPersonInfo = function() { return this.isCharmedBy();	};
	per.getPersonInfo = function() {
		if (checkPersonFlag("Daria", 12)) {
			return this.addPersonString("sister0.jpg", "height:max%", "right") +
			"Desiree, the young nun at the church, is a loyal member of the Cult of Flesh. A fanatic group seeing you as their " + (perYou.isBornMale() ? "God" : "Goddess") + ". She sees you as the most powerful being in existence and happily accepted her role in serving you.<br><br>" +
			"Not long after Mother Superior has been enslaved by you, she created this new religious group that dedicates themselves to you. The first one to join was Desiree. Now, as a priestess of The Faith of Flesh she spends all her time praying to you when you are not around the church. If you happen to be there, then she just blindly follows you, murmuring things you don’t understand under her cloak.<br><br>" +
			"It is such a bizarre feeling. There is woman who believes that you are some kind of demigod. You cannot hush away the thought that maybe you’ve gone a bit too far in this \"mind control everyone you ever come across\" plan of yours…";
		}
		return this.addPersonString("sister0.jpg", "height:max%", "right") +
			"Sister Desiree is a loyal priestess to your will. She prays to you and for your health every hour as she says. It looks like the charm spell made her more religious, but her sole purpose now is to serve you, her god. Yes, somehow you managed to alter her personality and now she looks up to you as the most powerful being in the world. She referred you mostly as her " + perYou.getLord() + ", but more frequently as her God. You feel satisfied with yourself, you have a young girl who adores you as her divine " + perYou.getMaster() + ". Not many people can say that about themselves!<br><br>" +
			"Your faithful nun gave you explicit details about the church and talked about life in the monastery. She briefly mentioned her trainings and how the Mother Superior rules over the church with iron fist. She begged you to come to her anytime to tell her your problems or have a confession (even though she told you that you will never have anything to repent, because you are perfect).";
	};
	
	per.getPersonAddress = function() { return this.other > 4 ? 'Lady of our Heavenly Father Church' : ''; };

	per.getPossessionFace = function() { return 'sister3'; };

	per.showEventPopup = function()
	{
		if (Place == 94 || Place == 2) {
			// Is Sister Desiree looking for the relic or the rosary
			if (this.place == 1000) {
				if (ReturnDesiree()) removeTimedEvent("ReturnDesiree()");
				return true;
			}
		}

		if (Place == 332 && !this.checkFlag(2)) {
			this.setFlag(2);
			showPopupWindow("The Good Sister",
				this.addPersonString("sister0.jpg", "height:max%", "right") +
				"A blonde nun appears right in front of you from the cloisters. She must be one of the sisters due to her similar uniform to the Mother Superior. You didn’t know these brides of Christ could look so good!<br><br>" +
				"This one must be a novice, because she is holding a bunch of books and a crucifix and is clearly surprised  to see visitors. You have caught her off guard and she stumbles over something in the courtyard. The sister doesn’t mind your presence as ahe gets back up and goes on to murmur a prayer."
			);
			return true;
		}
		return false;
	};

	per.showEvent = function()
	{
		var md;

		if (Place == 384) {
			
			if (sType == "watchdiscipline") {
				// Daria disciplines Desiree
				var idx = Math.floor(Math.random() * 4);
				md = WritePlaceHeader(false, idx === 0 ? 'td-left-large' : '');
				this.showPerson("discipline" + String.fromCharCode(idx + 97) + ".jpg");

				addPlaceTitle(md, "Disciplining Desiree");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>You decide to watch instead of taking control of the action. You order Daria to discipline Desiree all while you enjoy the scene. Without wasting a second, Daria pulls out the Holy Bible, which she considers trash and useless. She grabs Desiree by the cloak and yanks her dress off. The naked flesh of Desiree brings you joy, but the fun doesn’t stop there. As hard as she can, Daria hits the other nun on the butt. Never stopping, she does this until you say otherwise. They both remain silent, not even a grunt leaves their mouth. Soon the blossoming acolyte’s ass is as red as a tomato. You know it is time stop there as you do not wish to damage your slaves too much. They both rise up, ready to receive their next blessing from you.</p>'
					);
				} else {
					md.write(
						'<p>You decide to watch instead of taking control of the action. You order Daria to discipline Desiree all while you enjoy the scene. Without wasting a second, Daria pulls out the Holy Bible, which she considers trash and useless. She grabs Desiree by the cloak and yanks her dress off. The naked flesh of Desiree brings you joy, but the fun doesn’t stop there. As hard as she can, Daria hits the other nun on the butt. Never stopping, she does this until you say otherwise. They both remain silent, not even a grunt leaves their mouth. Soon the blossoming acolyte’s ass is as red as a tomato. You know it is time stop there as you do not wish to damage your slaves too much. They both rise up, ready to receive their next blessing from you.</p>'
					);
				}
				startQuestionsOnly();
				addQuestionR(md, '"Mother Superior, has Sister Desiree been disciplined enough?"',
					'You ask about Sister Desiree in a pointed way, really indicating "Yes, she has" and Daria understands,</p>' +
					'<p>"Desiree, for now your discipline is over, please leave us for your other duties, but I may recall you in future"</p>' +
					'<p>With that Sister Desiree leaves Daria\'s chambers',
					"",
					"movePerson(\\'Desiree\\',332)",
					""
				);
				addLinkToPlace(md, "talk more to them", Place);
				WritePlaceFooter(md);
				return true;
			} 
			
			if (sType == "bjdesiree") {
				// BJ in Mother Superior's office
				md = WritePlaceHeader();
				if (isExplicit()) this.showPersonRandomX(addBGSuffix("cloisters-bj"), perYou.isMaleSex() ? 4 : 2);
				else this.showPerson("cloisters-bj.jpg");

				addPlaceTitle(md, "Teaching Your Disciple");

				md.write(
					'<p>You teach your disciple of your ways of passion, all while watched by Daria, her Mother Superior.</p>'
				);
				startQuestionsOnly();
				addLinkToPlace(md, "talk more to them", Place);
				WritePlaceFooter(md);
				return true;				
			}
			if (sType == "fuckdesiree") {
				// Fuck in Mother Superior's office
				md = WritePlaceHeader();
				if (isExplicit()) this.showPersonRandomX(addBGSuffix("cloisters-fuck"), 2);
				else this.showPerson("cloisters-fuck.jpg");

				addPlaceTitle(md, "Teaching Your Disciple");

				md.write(
					'<p>You teach your disciple of your ways of passion, all while watched by Daria, her Mther Superior.</p>'
				);
					
				startQuestionsOnly();
				addLinkToPlace(md, "talk more to them", Place);
				WritePlaceFooter(md);
				return true;					
			}
		}
		
		if (Place == 332) { 
			
			if (sType == "discipline") {
				var perMS = findPerson("Daria");
				perMS.setFlag(5);
				perMS.moveThem(384);
				this.moveThem(384);

				md = WritePlaceHeader(false, "td-none", '', '', '', this.NoItems === 0);
				addPlaceTitle(md, "Disciplining Desiree, the Disciple of Desire");

				md.write('<p>');
				this.showPerson("sister12a.jpg", "50%", "right");
				md.write(
					'You focus on Daria\'s thoughts about Desiree and hope that your disciple can help you with the Mother Superior. You think about applying some discipline to her, and think about spanking, light caning, and other hands-on ways.</p>' +
					'<p>While you do this, Daria re-dresses, picks up some sort of pointer or baton, and walks out of the vestry. You hear her slightly confused thoughts,</p>' +
					'<p><i>"I must...speak to Desiree and chastise her for her reluctance to obey...my orders"</i></p>' +
					'<p>As she walks you focus on the <i>\'obey\'</i> part of that thought, and the importance of submission to authority. Before you realise it, Daria and you are in the courtyard, standing before Sister Desiree who is kneeling in praying. You hear Desiree whisper "...' + perYou.name + '...", and as she does Daria, her Mother Superior sternly speaks,</p>' +
					'<p>"Sister Desiree, enough of this talk of a revelation and your private prayer out here. You have your duties, and it is time for me to apply some discipline..."</p>' +
					'<p>You try to interrupt and focus on <b>\'her ass\'</b> and Daria continues, "your behind as nothing else is working. Bend over and raise the hem of your habit!"</p>' +
					'<p>Sister Desiree looks a little surprised, "Mother Superior I know my duties, and those I owe to you" and she does exactly as ordered, leaning against a tree and exposing her ass. Daria and you can both see she is not wearing any underwear at all! Daria\'s only thought is <i>"uncomfortable, but convenient"</i></p>' +
					'<p><b>Smack</b>, "Pray for forgiveness Sister", <b>smack</b>, "Follow my orders, Sister". You try to focus on \'and lick my pussy\' but Daria ignores you, it would seem that was a leap too far.</p>' +
					'<p>Sister Desiree groans, "Ohh yes, Mother Superior", <b>smack</b>, "Please Mother Superior", <b>smack</b> "Ohhh, yes Mother Superior, yes, yes!"</p>' +
					'<p>As she very obviously orgasms you can see she was covertly rubbing herself to the smacks, and she finally calls out "Thank you Mother Superior!", and Daria stops, looking at her confused.</p>' +
					'<p>You can feel Daria\'s arousal, and how very, very much she enjoyed that, but she quickly starts to repress her feelings, and you try to focus on the pleasure of disciplining Sister Desiree and the other things Sister Desiree can do to her. ' +
					'As you do the feelings from Daria and your hearing fades, but the last thing you hear is "follow me"...</p>'
				);

				startQuestions("Your vision fades");
				addOptionLink(md, "...and the spell ends", "Dispossession()");
				WritePlaceFooter(md);
				return true;
			}			
		
			if (sType == "absolution") {
				md = WritePlaceHeader();

				this.showPerson("sister11.jpg");
				addPlaceTitle(md, "Absolution of Your Sins");

				md.write(
					'<p>The young nun places a hand on your head and prays:</p>' +
					'<p>"Lord God, your humble servant asks that you absolve this young ' + perYou.getManWoman() + ' of ' + perYou.getHisHer() + ' sins.  We ask your understanding, for the flesh is weak, o Lord."  She stops a moment, and under a light breath of wind you think you hear her whisper, "The flesh is so weak." ' +
					'She continues, "Free this ' + perYou.getManWoman() + ' from the bondages of past wrongdoing and in the fullness of time lift us all to your heavenly kingdom.  All this we ask in the name of our Lord, Jesus Christ.  Amen."</p>' +
					'<p>"Amen," you say, not wanting her to know you only did this to avoid being caught in your lie.</p>' +
					'<p>Strangely enough, you feel as if the weight of your sins has been lifted from you.  Why, you don\'t feel guilty about enslaving all those women at all anymore!</p>'
				);
				if (isMurderPath() && perGates.other != 600) md.write('<p>Still, you cannot help but remember that horrible expression on ' + perGates.getPersonName() + '\'s face when the gun went off. You do not really think your sin can be washed away so easily.</p>');
				md.write('<p>You make a mental note to visit church - or at least this nun - more often in the future.</p>');

				// Dialogue Options
				//**********************************************************************
				startQuestions();

				if (this.other < 10) addQuestionC(md, '"Thank you, Sister"', "Desiree", 14110);

				addLinkToPlace(md, "speak with her further", 332);
				addLinkToPlace(md, "leave her be", 319);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "recite") {
				md = WritePlaceHeader();
				
				if (this.getQuestRelic() == 35 && !checkPersonFlag("Daria", 4)) {
					//Desire has the Rosary and Poisoned Mother Superior to get it.
					setPersonFlag("Daria", 4); //Set Mother Superior as "sick"
				}

				if (isExplicit()) {
					if (Math.random() < 0.5) this.showPersonRandomX(addBGSuffix("courtyard-bj"), perYou.isMaleSex() ? 1 : 3);
					else this.showPersonX(addBGSuffix("courtyard-fuck") + "a.jpg");
				} else {
					if (Math.random() < 0.5) this.showPerson("courtyard-bj.jpg");
					else this.showPerson("courtyard-fuck.jpg");
				}

				addPlaceTitle(md, "Desiree, Disciple of Desire");

				md.write(
					'<p>Your loving disciple lies back at the edge of the hedge maze. "I still feel the scripture written within me," she purrs, tempting you with her posture and sultry tones.  "But I must feel it in my flesh, my Angel, my ' + perYou.getMaster() + '."</p>' +
					'<p>You show her what you have learned of desire and pleasure'
				);
				if (isCharmedBy("Bambi") > 0) {
					//if Bambi's charmed
					md.write(', and teach her a few methods you learned from a professional back at the hotel');
				}

				md.write('.  You leave her blissfully sated, feeling complete, ecstatic, heavenly.</p>');
				if (this.getQuestRelic() >= 35 && this.getQuestRelic() <= 40) {
					//Here with the relic
					md.write('<p>You notice that she has a rosary wrapped around her arm that she did not have before.  Could it be from the Mother Superior?</p>');
				}
				/*
				<i recommend for later use that if you teach your disciple some of Bambi's pro seduction techniques
				it ought to unlock her ability to  bring you someone she's convinced to join your "faith."
				*/

				startQuestions();

				// Demon Relic Questions
				if (this.getQuestRelic() >= 5)	{
					if (this.getQuestRelic() == 10) addQuestionC(md, '"Do you know where the relic is now?"', "Desiree", 18310);
					else if (this.getQuestRelic() == 15) addQuestionC(md, '"I want that relic.  Find it for me."', "Desiree", 18315);
					else if (this.getQuestRelic() == 23) addQuestionC(md, '"What happened.  Why couldn\'t you find it?"', "Desiree", 18323);
					else if (this.getQuestRelic() == 25) addQuestionC(md, '"Did she say anything?"', "Desiree", 18325);
					else if (this.getQuestRelic() == 28) addQuestionC(md, '"I\'ll find it myself."', "Desiree", 18328);
					else if (this.getQuestRelic() == 30) addQuestionC(md, '"Could you get me something of hers?  Something very important to her?"', "Desiree", 18330);
					else if (this.getQuestRelic() == 33) addQuestionC(md, '"Perfect! Find a way to get it for me."', "Desiree", 18333);
					else if (this.getQuestRelic() > 33 && this.getQuestRelic() < 38) addQuestionC(md, '"Is that it, wrapped around your arm?  The <i>personal</i> item I need?"', "Desiree", 18335);
					else if (this.getQuestRelic() > 33 && this.getQuestRelic() <= 40) addQuestionC(md, '"How did you get it?  The Rosary?"', "Desiree", 18340);
				}

				if (checkPlaceFlag("Church", 5)) {
					//Have tried to explore Mother Superior's Room
					if (this.getQuestRelic() == 28 || this.getQuestRelic() == 30) {
						//@ I'll do it myself or afterwards if you haven't already tried her room
						addQuestionC(md, '"She stopped me as well.  Can you get me a personal item of hers?"', "Desiree", 18330);
					}
				}

				addLinkToPlace(md, 'resume speaking with your Disciple', 332);
				WritePlaceFooter(md);
				return true;
			}
			
		}

		if (Place == 444) {
			if (sType == "desiree1") {
				md = WritePlaceHeader();
				this.moveThem(443);
				this.showPerson("sisterh2.jpg");
				addPlaceTitle(md, "Sister or is it Maid Desiree");
				md.write(
					'<p>You follow Desiree into an empty office and while she has information about Keana, at the moment all that is on your mind is "Wy is she dressed like that?", so you ask! She poses cutely, curtsies and answers,</p>' +
					'<p>"Don\'t you like it? I got a part-time job here as a cleaner so I could investigate, but this is the only uniform I had that was appropriate. The admin staff were amused but told me to wear something more appropriate in future."</p>' +
					'<p>You reassure your disciple that you like the outfit and ask her what she has found out about Keana.</p>' +
					'<p>"I spoke to some staff here, especially the Nurse Sandra you mentioned. I spoke to my old friends, they were surprised to hear from me again, and I think I understand. Keana is just stuck in the basement, it is difficult for ghosts to cross boundaries like doorways on their own unless it is part of their \'route\' when they wander and haunt. In this case I can free her and allow you to take her where-ever you want, like you have with me..."</p>' +
					'<p>She goes on to explain a little more and that she will meet you in the basement tonight to release Keana. You thank her and are about to leave, you see her unbuttoning the top of her uniform and she asks,</p>' +
					'<p>"Is there anything else I can offer, something personal?"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, '"Of course my disciple"', 444, "type=desiree2");
				addLinkToPlaceC(md, '"Not now"', 444);
				WritePlaceFooter(md);
				return true;
			} else if (sType == "desiree2") {
				md = WritePlaceHeader();
				this.showPerson("sisterh3.jpg");
				addPlaceTitle(md, "Maid Desiree");
				md.write(
					'<p>You accept Sister...Maid Desiree\'s offering!</p>' +
					'<p>Afterwards you redress and arrange to meet her tonight in the basement.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'leave the office', 444);
				AddPeopleColumnLarge(md);
				this.showPersonRandom("sisterh4", 2);
				WritePlaceFooter(md);
				return true;
			}
		}
		if (Place == 443) {
			var myName = this.getYourNameFor();
			if (!isDay() && this.isHere()) setQueryParams('type=freeghost1');		// For save games
			if (sType == "freeghost1") {
				md = WritePlaceHeader();
				this.moveThem(332);		// Returns to the church
				this.showPerson("sisterh5.jpg");
				addPlaceTitle(md, "Sister Desiree and Keana");
				//TODO: entering the old basement is free if you do not have the key?
				md.write(
					'<p>You see Sister Desiree waiting for you outside the basement and you go in with her. She has a quick look around and then puts down a large bad she is carrying. There are a few electronic items, you recognise an expensive camera but the other bits are not familiar. She consults the gear and sets up the camera, and the starts to remove her clothing. You query why, not that you do not enjoy seeing her lovely body,</p>' +
					'<p>"' + myName + ' it is necessary, but also an offering for your pleasure. May I continue?"</p>' +
					'<p>You agree and after she is completely naked she puts on a bit of clothing, it looks like the \'dogcollar\' of a catholic priest. You can see if you ask she will just tell you it is necessary, but you think it is more because she wants to!</p>' +
					'<p>When she is ready you feel a chill and one of the electronic devices beeps, and you see Keana is standing nearby draped in estoplasm.</p>'
				);
				startQuestions("It is time..");
				addLinkToPlaceC(md, '"Desiree do it!"', 443, "type=freeghost2");
				AddPeopleColumnLarge(md);
				findPerson("Ghost").showPerson("ghostnurse3.jpg");
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "freeghost2") {
				md = WritePlaceHeader();
				this.showPerson("sisterh6.jpg");
				addPlaceTitle(md, "Sister Desiree and Keana");
				md.write(
					'<p>Desiree recites something in Latin while looking directly at Keana. She then steps towards Keana as if to embrace her. Keana fades from sight but her ectoplasm swirls and wraps around Desiree almost like she is embracing Desiree back.</p>' +
					'<p>You see indentations form in Sister Desiree\'s breasts like some invisible hands are cupping her breasts, then a nipple moves as if is it pinched. Sister Desiree sighs and leans her head to one side as if her neck is being kissed. Hand marks form on her ass and back on her breasts as she moans,</p>' +
					'<p>"' + myName + ' we are ready, come and claim us, take her body as she takes mine, and she will be bound to you."</p>' +
					'<p>It is difficult to refuse a beautiful woman moaning with desire and telling you to take her, and why should you refuse, they are both yours already!</p>'
				);
				startQuestions("There is nothing to consider");
				addLinkToPlaceO(md, 'take them', 443, "type=freeghost3");
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "freeghost3") {
				md = WritePlaceHeader();
				setPersonFlag("Ghost", 15);
				this.showPersonRorX("sisterh7.jpg");
				addPlaceTitle(md, "Claim Desiree and Keana");
				md.write(
					'<p>You embrace them, one woman of flesh and blood, warm and passionate, one woman of ectoplasm and the ether, cool but filled with desire. Passions both hot and cold, but equally full of eager desire and lust.</p>' +
					'<p>Afterwards and you separate, you see Desiree dressing and then she turns off the camera...umm you had completely forgotten the camera, it will have recorded everything! You ask Desiree for the recording and she promises to send you a copy as soon as she has it edited.</p>' +
					'<p>Sister Desiree tells you to take Keana by the hand and lead her where you want and she will follow you anywhere, just like Desiree promises to do as well, anytime!</p>'
				);
				startQuestions();
				addLinkToPlaceO(md, 'Sister Desiree leaves', 443);
				WritePlaceFooter(md);
				return true;
			}
		}
		
				
		if (sType == "endgame1desiree") {
			// End Game - Sister Desiree AND Mother Superior is not charmed
			md = WritePlaceHeader();
			this.showPerson("pregnant.jpg");			
			addPlaceTitle(md, "A Very Contagious Lesson for Sisters?");

			md.write(
				'<p>One day you visit your devoted acolyte Desiree at the church and meet her in the courtyard you first met her, She makes a exaggerated pose and removes most of her habit showing she has been devoted learning from Miss. Logan!</p>'
			);
			
			startQuestions();	
			// Add pregnancies/other
			addEndGamePregnancies(md);		
			WritePlaceFooter(md);
			return true;				
		}
		
		
		if (Place != 332) return false;
		
		if (sType == 'charmdesiree1') {
			md = WritePlaceHeader();

			if (this.other === 0) this.other = 5;  //Advance Normal Path to "introduced"
			this.setFlag(13, false);
			setPersonFlagAfterTime("Tracy", 5, true, 36);
			
			this.showPerson("sister3.jpg");
			addPlaceTitle(md, "A Crisis of Faith");
			md.write(
				'<p>The sister is lost in prayer and does not hear the words of your spell.  All the same, you see the telltale ' +
				'glow in her eyes and you feel the mana coiling out to draw her under.  Remembering the firm will of the Mother ' +
				'Superior, you decide to proceed cautiously; a nun might be able to resist this devilish power.</p>' +
				'<p>"Sister," you say.  "I actually came here today to offer you counsel.  Even from without the building I felt ' +
				'the wavering of a troubled soul, and felt called to seek it out.  Tell me, Sister.  Are you the one I have sought? ' +
				'Have you been feeling doubts in your heart?"</p>' +
				'<p>Desiree is dumbstruck for a moment at your declaration.  You maintain your look of concern, but inwardly you laugh. ' +
				'Your lie has confused her, and in her moments of confusion the spell is opening her to you, making her more pliable.</p>' +
				'<p>"Are you... you are some manner of holy ' + perYou.getManWoman() + '? ' +
				'You do not look it, but... I cannot deny you speak the truth.  I have felt doubts, and... base desires."</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Tell me of these desires, Desiree.  I only wish to help you."', Place, 'type=charmdesiree2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == 'charmdesiree2') {
			md = WritePlaceHeader();

			this.showPerson("sister4.jpg");

			addPlaceTitle(md, "A Crisis of Faith");
			md.write(
				'<p>The Sister does not seem to notice that you have called her by name, informally. ' +
				'She says, "I dream, sometimes.  I dream of... illicit relations with a ' + perYou.getManWoman() +
				' and wake in a hot sweat with a... sinful wetness upon my bed.  I... Mother Superior tells me that these feelings will pass, ' +
				'but I... I..." ' +
				'<p>"A ' + perYou.getManWoman() + ', you say?" you ask, honestly interested.  "Tell me, Desiree: Does ' +
				'this ' + perYou.getManWoman() + ' look like me?"</p>' +
				'<p>"A little, I suppose," she says.</p>' +
				'<p>"She has already been having the dreams," you mutter to yourself, inwardly enjoying the ' +
				'hell out of this ruse.  "But is she ready for her destiny?"</p>' +
				'<p>"Destiny?" she squeaks.  "What are you talking about?"</p>' +
				'<p>"You know that Sisters do not display their bodies for pleasure.  It is taboo," you say, and she nods.  "Now, for the holy ' +
				'outsider who knows your deepest heart, for the ' + perYou.getManWoman() + ' whose body you have already ' +
				'felt in dreams.  Break this taboo."</p>' +
				'<p>At first, she tries to resist, her hand hesitating over the folds of her holy vestments.  Her eyes meet yours, and she gulps ' +
				'and pulls up, now revealing shin, now thigh, and at last the lacy covering for her untarnished maidenhood.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'Demand, "More"', Place, 'type=charmdesiree3');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == 'charmdesiree3') {
			md = WritePlaceHeader();

			this.showPerson("sister5.jpg");

			addPlaceTitle(md, "A <i>New</i> Faith");
			md.write(
				'<p>Now the upper portion of her vestments part for you, revealing her perfect breasts.  "I..." she stammers. ' +
				'"It is taboo.  I will be-"</p>' +
				'<p>"Fear not," you say.  "I only needed to know that you were ready to make a leap of faith before I told you ' +
				'the truth: I am the Lord\'s Angel of Desire.  I have come to deliver the scripture."</p>' +
				'<p>The worry melts away from Sister Desiree\'s face.  It all makes sense, now: no wonder she feels such joy at ' +
				'your nearness, if you are an angel.  No wonder she has felt arousal, even as a nun, when dreaming of your coming. ' +
				'"What is this scripture?" she asks eagerly.  "Tell me!"</p>' +
				'<p>"This scripture is not told," you say.  "It is <i>felt</i>."</p>' +
				'<p>"Then...how do I learn the scripture?" she asks, her breathing coming a little heavier now in anticipation ' +
				'of your answer.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Feel my holy Word within you."', Place, 'type=charmdesiree4');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == 'charmdesiree4') {
			md = WritePlaceHeader();

			this.showPerson("sister6.jpg");

			addPlaceTitle(md, "A <i>New</i> Faith");
			md.write(
				'<p>Completely taken in by your deception, Desiree opens herself to your spell\'s power ' +
				'and lets out a contented sigh as it heightens her desires, fills her with pleasure at ' +
				'your nearness, erases her few rebellious thoughts.</p>' +
				'<p>She parts her robes entirely and fondles herself, no longer caring about or even seeing her surroundings. ' +
				'"Oh, bliss!" she cries, when she has momentarily sated herself.  "Please, if you are an angel then ' +
				'' + perYou.getMaster() + ' cannot truly be your name.  What am I to call you, now ' +
				'that I know what you are?"</p>' +
				'<p>"Just call me ' + perYou.getMaster() + '," you laugh.  "Everyone else does. ' +
				'Now, I must remind you of a teaching of your Mother Superior."</p>' +
				'<p>"Yes, ' + perYou.getMaster() + '?"</p>' +
				'<p>"It is not enough to know the scripture in your heart," you say with an evil grin.</p>'
			);


			startQuestions();
			addLinkToPlaceC(md, '"You must put it to work in the world."', Place, 'type=charmdesiree5');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == 'charmdesiree5') {
			md = WritePlaceHeader();

			this.showPerson("sister7.jpg");

			addPlaceTitle(md, "Sister Desiree Under a Spell");
			md.write(
				'<p>Desiree trembles so hard at your words that she collapses.  "All is well," she assures you, ' +
				'fondling herself.  "I am merely preparing myself for your coming, ' + perYou.getMaster() + '." ' +
				'<p>As she says, by the time you lay a hand on her there are slick drops rolling bead-to-bead down her rosary.</p>' +
				'<p>It is astonishing how skilled she seems.  Her hands and tongue seem to seek out just the perfect spot without effort. ' +
				'She is obviously a virgin, which leaves you to wonder if perhaps those dreams of hers were truly prophetic.  Perhaps she ' +
				'truly has been practicing in her sleep every night, just for you.</p>' +
				'<p>"Desiree," you say, when you and she lay exhausted just within the hedge-maze.  "You must spread the Word."</p>' +
				'<p>"I understand, ' + perYou.getMaster() + '," she says breathlessly.  "This is my destiny. ' +
				'I will do all I can for you."</p>'
			);
			startQuestions();
			addLinkToPlace(md, "Clean up and exit the hedge maze", 319);
			WritePlaceFooter(md);
			return true;
		}
		
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("!poledance", 3);
		addPlaceTitle(md, "Desiree\'s Dance");
		md.write(
			'<p>You see Sister Desiree...well here just Desiree...walk onto the stage with another woman, another beautiful blonde. You guess someone paired them together for the dance assuming they are a good match, and that they are!</p>' +
			'<p>Desiree is a surpisingly good dancer and dances well with her partner. This is not a sex-show so it is not some lesbian play, but two beautiful blonde women stripping and dancing. At the end of the dance the sight of the two of them there, naked blonde goddesses is almost a divine revelation.</p>' +
			'<p>After Desiree joins you, dressed in casual clothing, not her habit. You ask about her partner and if you can introduce her and she regretfully tells you she has no idea who she is. Apparently she left the club immediately after the performance.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};

	per.isPlaceImageRight = function()
	{
		return Place == 444 && this.place == 444 && this.checkFlag(3);
	};

	per.showPlaceImageRight = function(md)
	{
		if (this.place == 444) this.showPerson("sisterh1.jpg");
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 444 && this.isHere() && this.checkFlag(3) && sType === "") {
			md.write(
				'<p>You see down one corridor someone standing in an office doorway beckoning to you. It is Sister Desiree, dressed quite differently, is that a maid uniform?</p>'
			);
		}
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 444 && this.isHere() && this.checkFlag(3)) addLinkToPlaceO(md, "follow Desiree", 444, 'type=desiree1');
	};
	
	per.checkEndGamePregnancy = function()
	{
		return this.isCharmedBy() && !checkPersonFlag("Daria", 12) ? "endgame1desiree" : "";
	};

	// Items
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			
			if (Place == 332 && this.isHere()) {
				//Sister Desiree in the Church Courtyard
				CastCharmSpell("Desiree", Place, 1, 'type=charmdesiree1');
				return "handled";
			}
		}
		return "";		// do nothing
	};
	
	// Phone calls
	
	per.isPhoneable = function() {
		// Can you call them?
		return checkPersonFlag("Sofia", 14) && !checkPersonFlag("Sofia", 15) && Place == 14;
	};

	per.callThem = function() {
		if (Place == 14) {
			gotoPlace(Place, 'type=pickupbible');
			receiveCall('', 'You call Sister Desiree and tell her it is time and to join you at the Mansion\'s Garage Ofice. A while later you hear a knock on the door...');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	per.addPersonPhoneCall = function() {
		if (this.place == 444 && getHour() > 11 && !this.checkFlag(3)) {
			if (makeCall(true, 150)) this.setFlag(3);
		}
		return false;
	};

	per.getPersonSMS = function(id) {
		if (id == 150) return receiveSMS('Your disciple', this.getYourNameFor() + ' I am ready for you at the hospital. As an offering I give you the sight of me preparing for you in my cell', 'sistersms1.jpg');
		return '';
	};

}
