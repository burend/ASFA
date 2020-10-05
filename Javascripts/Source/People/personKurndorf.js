/****************************************************************
Kurndorf

Introduction to Kurndorf:

It’s the legend himself, the evil Kurndorf! Even in the afterlife he has not given up and is still hellbent on getting the whole world to serve him. His ghostly appearance is horrifying and magical at the same time. You have to beat this guy or else he will rule this town instead of you, and we all know it would terrible for all these women to be his slaves instead of yours, right? How can you outsmart one of the most powerful warlock in the world, though? You will always need to be on edge when dealing with this guy, who knows what he is capable of, even if he is just a ghost.

****************************************************************/
var perKurndorf;	// Kurndorf

// Quests
function isRitualComplete() { return perKurndorf.getQuestRitual() >= 200; }

// Conversation
function RepliesKurndorf(nR)
{
	var myName = perYou.getPersonName();
	var mySex = perYou.getSex();
	var perJessica = findPerson("Jessica");

	if (nR == 14301)
	{
		bChat = false;
		addComments('<p>"Yes, ' + myName + ', I know who you are," he says, never taking his eyes off of the Witch. "Who do you think helped you get as far as you have?"');
		perKurndorf.setQuestGhost(5);
		perKurndorf.setQuestSeance(51);
	}
	else if (nR == 14305)
	{
		bChat = false;
		addComments('<p>"Simply, my ' + mySex + '," he says, turning to look you in the eye.  You can\'t help but feel a shiver run down your spine.</p><p>"How else was I going to get someone to summon my spirit so that I may <i>live again</i>!!"</p>');
		perKurndorf.setQuestGhost(10);
		if (perYourBody.FindItem(41) === 0) //Does NOT have the Aftane of the DEAD
		{
			Place = 997; // Move you to the GAME OVER PAGE
			perKurndorf.setQuestGhost(999);  //GAME OVER
		}

	}
	else if (nR == 14310)
	{
		bChat = false;
		addComments(
			'<p>"I see," he says, smiling at you, which would have been disarming were it not for the flare of his temper a moment before.</p>' +
			'<p>"Then again..." he says, turning his attention to Jessica. "I could always achieve my revenge in... other ways.  I do have <i>some</i> tricks up my sleeve even after all these years."</p>'
		);
		perKurndorf.setQuestGhost(15);

	}
	else if (nR == 14315)
	{
		perKurndorf.setQuestGhost(20);
		perJesse.setDemonPath(1);

	}
	else if (nR == 14320 || nR == 14321)
	{
		if (nR == 14321) {
			addComments(
				'“Or you will do what, ' + perYou.getPersonName() + '?”</p>' +
				'<p>“I may not be able to take your body, but I will not let the opportunity for revenge you so kindly offered me pass.”'
			);
		}
		perKurndorf.setQuestGhost(21);
		perKurndorf.setQuestSeance(70);  //Séance Path
		perJessica.place = 161;
	}
	else if (nR == 14325)
	{
		perJesse.setDemonPath(10); //Demon Path
		bChatLeft = false;
		addComments('<p>"You\'re inquiring as to the disposition of a man who was killed 200 years ago and is now floating incorporeally with no hope of final release?"</p>');
		perKurndorf.setQuestGhost(49);
	}
	else if (nR == 27100) //v27 Séance Path - questions after its over
	{
		perKurndorf.setQuestSeance(105);
		addComments('<p>"Simple, my ' + mySex + '.  Even though that treacherous little imp broke the prison spell, this space is still <i>between</i> worlds enough for me to continue to exist here."</p>');
	}
	else if (nR == 27105) //v27 Séance Path - questions after its over
	{
		if (perJessica.isRival()) perKurndorf.setQuestSeance(110);
		else perKurndorf.setQuestSeance(120);
		addComments('<p>Kurndorf grumbles for a moment, then his spirits lighten slightly.</p><p>"No, in fact, I can not leave this place.  Were I to try, my spirit would quickly fade back into the netherworld.  It would seem that I have simply traded one hell for another."</p>');
	}
	else if (nR == 27110) //v27 Séance Path - questions after its over
	{
		perKurndorf.setQuestSeance(115);
		addComments('<p>“Strong emotions are fleeting sources of magical energy, if you know how to harness them, that is.”</p><p>“That arrogant creature overwhelmed her mind with lust, but underestimated her will, and her impending climax provided that bitch with the power she needed to free herself.”</p>');
	}
	else if (nR == 27115) //v27 Séance Path - questions after its over
	{
		perKurndorf.setQuestSeance(120);
		addComments('<p>“Indeed.” The ghost grins.</p><o>“Every time one of your slaves screams your name in the night while fingering her pussy, her own lust powers the very spell keeping her mind ensnared.”</p>“It\'s beautiful, is it not?”</p>');
	}
	else if (nR == 14350) //v143 Kurndorf Path - moving on AFTER the Séance
	{
		perKurndorf.setQuestGhost(55);
		addComments('<p>"Why did I help?" he asks, seemingly pondering the question for a moment.</p><p>"Well...  I suppose I could say it was to foil that treacherous imp.  Or I could say that it was to save your life.  But would you believe me, regardless of what I said?"</p>');
	}
	else if (nR == 14355)
	{
		perKurndorf.setQuestGhost(60);
		addComments('<p>"Simple, my ' + mySex + '.  If I hadn\'t stopped you, that imp would have sucked your soul from you body and devoured it - leaving you a soulless thrall with no will of your own.  And certainly no <i>magic</i>," he says, emphasising the last point.</p>');
	}
	else if (nR == 14360)
	{
		perKurndorf.setQuestGhost(65);
		addComments('<p>He smiles at you. "Very observant of you, my ' + mySex + '.  Quite right."  He stops and looks at you, seemingly considering his options for a short while.</p><p>"Yes, you might just do after all," he says finally.  "I saved you because I think you may be able to help me."</p>');
	}
	else if (nR == 14365)
	{
		perKurndorf.setQuestGhost(70);
		addComments('<p>"Out of the goodness of your heart?" he asks sarcastically.  "No, I suppose that would be too much to expect.  Perhaps because I can teach you more <b>Magic</b> - the kind that puts your little tricks to shame."</p>');
	}
	else if (nR == 14370)
	{
		perKurndorf.setQuestGhost(75);
		addComments('<p>"In return?" he says, pausing. "Well...  Revenge on that little imp would be nice.  Or perhaps even that Witch," he says, small flares of anger turning his ghostly image a shade of red - then he seems to calm down a bit.</p><p>"No, in the end all I would request is a new body.  No, not <i>yours</i> - but someones, even a mundane body devoid of magic would still have <i>life</i>."</p>');
	}
	else if (nR == 14375)
	{
		perKurndorf.setQuestGhost(80);
		addComments('<p>Kurndorf looks at you, all humour gone from his visage.</p><p>"My ' + mySex + ', I would do <i>anything</i> to live once more." Then he seems to lighten a bit.</p><p>"Now, shall I begin my tutelage or shall you leave me here to fend for myself?"</p>');
	}
	else if (nR == 14380)
	{
		perKurndorf.setQuestGhost(85);
		addComments('<p>"Well, among other things..." he says pausing to consider his words carefully.</p><p>"How would you like to learn the same ritual that I was <i>about</i> to cast before I was so rudely interrupted?"</p>');
	}
	else if (nR == 143100)
	{
		perKurndorf.setQuestGhost(100);
		addComments('<p>"Excellent!" Kurndorf exclaims. "You have made the right choice."</p>');

		//Setting up the Ritual Locations and Items
		if (!isPlaceKnown("Church")) setPlaceKnown("Church");	//Church Known
		if (!isPlaceKnown("NewAgeStore")) setPlaceKnown("NewAgeStore");	//New Age Shop
		if (!isPlaceKnown("Graveyard")) setPlaceKnown("Graveyard");	//Graveyard known

		PlaceI(50, 45); //Salt Shaker in your kitchen (Done)
		PlaceI(51, 318); //Ritual Chalice @ the Church Congregation (Done)
		PlaceI(53, 321); //Silver Dagger  @ the Church Storeroom (Done)
		PlaceI(59, 242); //Chalk @ the teachers lounge (Done)
	}
	else if (nR == 143101) // Researching Invisibility
	{
		perKurndorf.setQuestGhost(102);
		addComments('<p>"You can\'t get them all?  Surely someone as resourceful as you could find a way to get around any problem that might arise," Kurndorf says almost derisively.  Whose side is this guy on?</p>');

	}
	else if (nR == 143102) // Researching Invisibility
	{
		perKurndorf.setQuestGhost(103);
		addComments(
			'<p>Kurndorf takes a deep breath, an empty gesture for a ghost. "I suppose I could teach you a minor little cantrip that may be helpful. You <i>do</i> have the book, don\'t you?"</p>' +
			'<p>He continues with soft laugh, "There is a payment of course". You feel a ghostly hand ' + (perYou.isMan() ? 'cup you balls and cock' : 'caress your breasts') + ' <b>through</b> your clothes. He finishes, "Even in death passion remains"'
		);
	}
	else if (nR == 143103)
	{
		perKurndorf.setFlag(23);
		addComments('<p>You firmly refuse after all you are helping him, and Kurndor sighs, "It is as you say...let me teach you the cantrip"</p>');
	}
	else if (nR == 143105) // BEGIN Quips during the ritual
	{
		perKurndorf.setQuestGhost(105);
		addComments('<p>"Oh I never teach a student <i>everything</i> I know, otherwise what reason would they have to keep their teacher around?"</p>');

	}
	else if (nR == 143110) //Quips during the ritual
	{
		perKurndorf.setQuestGhost(110);
		addComments('<p>He looks at you and, for a second, you almost think he\'s going to lose his temper.  "No, its an ancient incantation...  Now <b>say it</b>."</p>');

	}
	else if (nR == 143115) // Quips during the ritual
	{
		perKurndorf.setQuestGhost(115);
		addComments('<p>"What? Oh, yes. Of course I meant you, what else would I have meant?  You won\'t be able to help me get a body later if you fail during the ritual.  Now, back to the task at hand."</p>');

	}
	else if (nR == 143120) // Quips during the ritual
	{
		perKurndorf.setQuestGhost(120);
		addComments('<p>"<i><b>Peasants Progress</i></b>, my ' + mySex + ', must you interrupt!?" he says, losing his composure for but a moment.  "Blood is the most powerful of fluids, a <i>little</i> bit goes a <i>long</i> way.  Now, <b>prick</b>!"</p>');

	}
	else if (nR == 143125) // Quips during the ritual
	{
		perKurndorf.setQuestGhost(125);
		addComments('<p>"But we are soooo close, now <b>finish</b>!" he says, almost drooling in anticipation.  <i>So close to what?</i> you wonder.</p>');

	}
	else if (nR == 14900) //v149 - Beginning of the ritual
	{
		perKurndorf.setQuestRitual(5);
		addComments('<p>"Remember..." he says curtly.  "Now that we have begun - we must see this through to the end."</p>');
	}
	else if (nR == 14420) //Demon Path - Kurndorf stopping you from succumbing to the demon
	{
		perJesse.setDemonPath(20);
	}
	return true;
}

function DropTheSkull(nSkull)
{
	perYourBody.DropItem(57, 342);
	perKurndorf.setFlag(8);
	if (nSkull == 1) perKurndorf.setFlag(18);
	else perKurndorf.setFlag(18, false);

	gotoPlace(342);
}

// Initialise
function initialiseKurndorf()
{
	// Kurndorf
	perKurndorf = addPerson("Kurndorf", 0, 'Kurndorf', '', false);
	per.extra = [0, 0, 0, 0];		// expanded arbitrary data
	per.Replies = RepliesKurndorf;
	per.getPersonGender = function() { return "man"; };
	per.getPersonName = function() { return "Ghost of Kurndorf"; };
	per.getPossessionFace = function() { return "kurndorf"; };
	
	per.getQuestRitual = function() { return this.extra[0]; };
	per.setQuestRitual = function(no) { this.extra[0] = no; };
	per.getQuestSeance = function() { return this.extra[2]; };
	per.setQuestSeance = function(no) { this.extra[2] = no; };
	per.getQuestGhost = function() { return this.extra[1]; };
	per.setQuestGhost = function(no) { this.extra[1] = no; };
	per.getQuestCrypt = function() { return this.extra[3]; };
	per.setQuestCrypt = function(no) { this.extra[3] = no; };

	per.showEvent = function()
	{
		var md;

		// Left after the initial meeting
		if (Place == 141 && sType == 'banshee') {
			// Annoyed Kurndorf!
			md = WritePlaceHeader(false, 'td-left-large');
			AddImage("monstera.png");
			addPlaceTitle(md, "Fury of a Ghost");
			md.write(
				'<p>You ignore the ghost and decide this is just wrong, walking towards the front of the mansion intent on taking a taxi home. As you do, you see the ghost look at you with a furious expression as you disobey it.</p>' +
				'<p>It steps well away from the mansion and you feel a strange sensation, as if something <i>tears</i>, and the ghost flickers and vanishes.</p>' +
				'<p>You think it must have just left, and resume walking, but then you hear a piercing scream, and you are frozen in your tracks, your body refusing to move. You see another figure appear from the trees, an unearthly female figure, and you remember some of the myths and legends. You remember the stories of the women of the Sidhe from Irish mythology, the banshee, an unearthly being whose cry means the death of any who hears it. She scfeams again, and the blackness of death envelops you.</p>' +
				'<p>As the final darkness descends, you think you should have tried following the ghosts instructions, or been nicer to ' + perGates.getPersonName() + '...</p>'
			);
			addRestartLink(md);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "learninvisibility") {
			if (isRunes()) {
				Research("Spell", "Dest", "kurndorf.jpg", 342);
				return;
			}
			md = WritePlaceHeader(false, 'td-none');

			addPlaceTitle(md, "Kurndorf\'s Tutelage");

			md.write(
				'<form method="POST" name="FormChar">' +
				'<p>What does it mean to be unseen? Enter the correct word to find the spell:</p>' +
				'<p><input type="text" size="20" name="research">'
			);
			md.write('<input type="button" name="button" value="please" onClick="ResearchOLD(\'I\',document.FormChar.research.value)"></p></form><p>');
			addLinkToPlace(md, 'Never mind...', 342);
			
			AddRightColumnLarge(md);
			AddImage("kurndorf.jpg");
			WritePlaceFooter(md);
			return true;
		}
	
		if (Place != 342) return false;
		
		if (sType == 'examineskull') {
			md = WritePlaceHeader();

			/* General Description */
			addPlaceTitle(md, "Using the Skull", "Items/skull1.jpg");

			/* Description */
			md.write(
				'<p>Which skull you use in the ritual <i>may</i> have a very important impact on <i>how</i> the spell turns out.</p>' +
				'<p style="text-align:center;font-size:small">This is your only warning</i></p>'
			);
			
			startQuestions('Which skull do you place on the altar?');

			if (perKurndorf.checkFlag(3)) addOptionLink(md, 'Skull from the Church catacombs', 'DropTheSkull(3)');
			if (perKurndorf.checkFlag(2)) addOptionLink(md, 'Skull from the Graveyard', 'DropTheSkull(2)');
			if (perKurndorf.checkFlag(1)) addOptionLink(md, 'Skull from the Kurndorf\'s Tomb', 'DropTheSkull(1)');

			addLinkToPlace(md, "Never mind...", Place);

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "kurndorfprice") {
			md = WritePlaceHeader(false, 'td-left-med');

			this.setFlag(22);
			this.showPersonRandom("sex1", 2);
			addPlaceTitle(md, "Paying Kurndorf\'s Price");

			md.write(
				'<p>You feel his ghostly hands on you crudely stroking and caressing you but he quick stops and then resumes more carefully, almost considerate and caring. You wonder if it is that in life he was so used to sex with people who where under the charm spell that he only remembered being with people who where very aroused always, who were \'easy\' to pleasure.</p>' +
				'<p>His touches become more and more intimate, and you feel more and more aroused. You feel the touch of a cold, rigid member against your ' + (perYou.isMan() ? 'ass' : 'pussy') + ' seeming to ignore your clothing, just as his hands do.</p>' +
				'<p>You feel him thrust in and you hear him gently laugh and say something arcane you do not recognise. You feel a flash of magic but it washes over your defences. Did Kurndorf try to control you, or was it some sort of pleasure enhancement? Knowing Kurndorf from the old stories it could easily be either of them.</p>' +
				'<p>You ask what that was and he just whispers, "My member" as he continues thrusting and caressing you. Uncertain but still aroused you accept his attentions and hear him whispering arcane things. Quicker than you expected you ' + (perYou.isMaleSex() ? 'cum, spraying into your underwear' : 'orgasm wetly') + ' as you feel his etherial cum blast into your ' + (perYou.isMan() ? 'ass' : 'womb') + '. Again he calls out something arcane and magic washes over you, but nothing happens, you are sure you are defended after all?</p>' +
				'<p>Kurndorf pulls away leaving you standing there, fully clothed but a feeling of his ectoplasm in you.</p>'
			);
			
			startQuestions();
			addLinkToPlace(md, "shudder and fix your clothing", Place);
			WritePlaceFooter(md);
			return true;
			
		}
		
		if (sType == "kurndorfpricebadend") {
			perYou.setFlag(31);
			md = WritePlaceHeader(false, 'td-left-med');

			this.setFlag(22);
			this.showPersonRandom("sex1", 2);
			addPlaceTitle(md, "Paying Kurndorf\'s Price");

			md.write(
				'<p>You feel his ghostly hands on you crudely stroking and caressing you but he quick stops and then resumes more carefully, almost considerate and caring. You wonder if it is that in life he was so used to sex with people who where under the charm spell that he only remembered being with people who where very aroused always, who were \'easy\' to pleasure.</p>' +
				'<p>His touches become more and more intimate, and you feel more and more aroused. You feel the touch of a cold, rigid member against your ' + (perYou.isMan() ? 'ass' : 'pussy') + ' seeming to ignore your clothing, just as his hands do.</p>' +
				'<p>You feel him thrust in and you hear him gently laugh and say something arcane you do not recognise. You feel a flash of magic wash through you and a feeling of intense arousal and you immediately ' + (perYou.isMaleSex() ? 'cum' : 'orgasm') + '.</p>' +
				'<p>He continues thrusting and caressing you and you ' + (perYou.isMaleSex() ? 'cum' : 'orgasm') + ' over and over uncontrollably as hear him whispering arcane things. After an unknown time you feel his etherial cum blast into your ' + (perYou.isMan() ? 'ass' : 'womb') + '. Again he calls out something arcane and magic washes through you.</p>' +
				'<p>Kurndorf pulls away and you look at him as he says,/p>' +
				'<p>"There are other ways to regain life, ' + (!perYou.isMan() ? '' : 'my seed will change you and soon you will ripen into the perfect woman. I will seed your new womb and ') + ' you will bear your Master\'s child, and he will be my new body, my new life!</p>' +
				'<p>He laughs, and you cannot help be horrified as you think of your <b>lack of magical defences</b>, but then amused at your Master\'s pleasure...</p>'
			);
			
			startQuestions();
			addRestartLink(md);
			WritePlaceFooter(md);
			return true;
			
		}
		
		return false;
	};
	
}
