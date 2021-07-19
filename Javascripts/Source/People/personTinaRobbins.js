/*
Introduction to Tina Robbins:
The bedroom is occupied by a brunette young girl. She must be Tina, the one Mrs. Robbins talked about. According to her, Tina is Davy’s sister. That means that she can posess some kind of magical knowledge just like his brother. It looks like the two didn’t really like each other because Tina is trapped in this room. She looks tired and exhausted and looks at you with weary eyes. Maybe she could be of use to you. You are sure she would be more than willing to help against his evil brother.

*/
/****************************************************************
			Tina (Davy's Sister)  Reponse Bank
 ****************************************************************/
function RepliesTina(nR)
{
	var perT = per;
	//var bCharm = perT.isCharmedBy();
	var myName = perT.getYourNameFor();

	if (nR == 100) 
	{
		addComments(
			"<img src='Images/ward.jpg' style='width:20%;float:right;margin:0 0 2em 5px' alt='Ward'>" +
			"You ask Tina about the symbol you saw on the sign at the access road, and draw a qick sketch</p><p>&quot;Oh yes, that is variously called a witch mark or a witch ward. A mark of power that can stop a true witch or warlock in their tracks. The fact you were repelled mean you are becoming one now&quot;"
		);
		perT.setFlag(3);
	}
	else if (nR == 620)  // v62 = Tina Robbins Path
	{
		addComments('"Oh ' + myName + ', something strange is happening to my family. As soon as I arrived home from college Mom grabbed me and locked me in here. She even took most of my clothing saying I would not be needing them."');
		perT.setFlag(13);
	}
	else if (nR == 621)
	{
		addComments(
			'"I can\'t find one. Every time I tried to leave Mom threw me back into here and raved about my little brother Davy wanting me. My mom took my cellphone so I could not call anyone, and I do not have any other computers."' +
			'<br><br>You wonder about making a call to someone for help, but it seems clear Davy has learned spells and there may be secrets to them here. There is no way you can explain about this stuff to someone like your mother, so it is best if you can work out something here and find your own way out.'
		);
		perT.setFlag(14);
	}
	else if (nR == 612) // v61 = Tina CHARMED path
	{
		perT.other = 4;
		addComments('"I\'ve never tried. I suppose if they had a spell cast onto them or they were magical I may be able to try."');
	}
	else if (nR == 613)
	{
		perT.setFlag(15);
		addComments(
			'"He has been obsessing over the warlock Kurndorf as of late. He was reading up a lot on the legendary book of spells the warlock was supposed to have, but he seemed to give up on that for now. He was researching the warlock himself, his life and death. One time he mentioned something called <b>Hellgate</b> and also a witch named <b>Jessica</b>. I have seen him meeting with his teacher Mr. Beasley often at the library I think they were working on this stuff together."<br><br>' +
			'"All of this was aside from his usual obsession, our neighbour Kate Granger. Silly, he has no chance with her, she is athletic, smart and forthright, everything Davy is not!"<br><br>' +
			'Some of this last was from her annoyance at what is happening to her, Davy is certainly smart, but you agree he is no match for Kate, despite his claims of romantic conquest.'
		);
	}
	else if (nR == 6410)
	{
		var perG = findPerson("MrsRobbins");
		addComments('"As you wish ' + myName + '," she says, and begins to concentrate.  Then her eyes seem to flash for just a moment and you can feel your own power grow, if only slightly.</p><p>"Oh ' + myName + '! I think that it worked!  I removed the spell from my Mother and passed the spell\'s energy to you (5 mana)."');
		if (perG.isCharmedBy("Davy"))
		{
			perT.other = 4;
			AddMana(5);  // Add 5 mana
			perG.unCharmThem();	// Set Mrs Robbins to be free of Davy's Charm Spell
			perG.setFlag(1, false);	// Set Mrs Robbins so you can ask her about Davy again
		}
	}
	else if (nR == 8950)
	{
		if (isCharmedBy("Tracy", "Davy"))
		{
			AddMana(5);  // Add 5 mana
			var perSis = findPerson("Tracy");
			perSis.unCharmThem();  // Set Your Sister free of Davy's Charm Spell
			perSis.moveThem(1);  // Moves Sister back to your house
		}
		addComments('"Yes ' + myName + ', as you command," she says, immediately beginning to concentrate on your sister.  Moments later you feel the power being passed to you (5 mana).</p><p>As soon as the spell is lifted, Tracy gasps - her face a mixture of disgust and terror - and ' + (Place == 176 ? 'then runs out of the house, holding her head.' : 'collapses on the couch holding her head.'));
		if (Place != 176) {
			addComments('</p>You ask Tina to return to her home for now so you can talk with Tracy. Tina nods her head and quietly leaves your home.');
			this.place = 83;
		}
	}	
	else if (nR == 1650)
	{
		if (isCharmedBy("Mayor", "Davy"))
		{
			AddMana(5);  // Add 5 mana
			charmPerson("Mayor", 0);  // Set Mayor Thomas free of Davy's Charm Spell
		}
		addComments('"Yes ' + myName + ', as you command," she says, immediately beginning to concentrate on the Mayor.  Moments later you feel the power being passed to you (5 mana).</p>');
		if (Place != 176) {
			addComments('</p>You ask Tina to return to her home for now so you can talk with the Mayor. Tina nods her head and quietly leaves the office.');
			this.place = 83;
		}
	}
	else if (nR == 18150)
	{
		AddMana(5);  // Add 5 mana
		var perE = findPerson("Ellie");
		perE.unCharmThem();	// Ellie freed from Davy's control
		perE.place = 420;
		if (Place != 176) addComments('"Yes ' + myName + ', as you command," she says, and begins to concentrate on Ellie. A moment later Ellie looks very upset and grabs her clothing and runs out of the room, dressed in sheer pale blue lingerie. You do not have time to attempt anything as she runs out. A thought passes your mind, about how fast she is for a near naked woman!. You feel a surge of mana as Tina transfers the mana from the spell to you (5 mana).');
		else addComments('"Yes ' + myName + ', as you command," she says, and she walks up to Davy\'s room. A moment later you see an upset Ellie run out of the room, dressed in sheer pale blue lingerie, clutching her clothes. She runs out of the house looking upset and confused, you do not have time to attempt anything as she runs out. A thought passes your mind, about how fast she is for a near naked woman!. A minute later Tina returns and you feel a surge of mana as she transfers the mana from the spell to you (5 mana).</p>');
	}
	else if (nR == 18151)
	{
		addComments(
			'"Yes ' + myName + ', as you command," she says, and begins to concentrate on Ellie. A momemt later Ellie looks very confused and before you can do anything, she steps over to you and slaps you hard, and then looks horrified,</p><p>"I\'m sorry, I do not know what came over me, I know I had to hurt someone, I do not remember who."</p>' +
			'<p>Tears come to her eyes and she runs back toward the park entrance.</p></td></tr></table>'
		);
		AddMana(5);
		var perE = findPerson("Ellie");
		perE.unCharmThem();	// Ellie freed from Davy's control
		perE.moveThem(420);
	}
	else if (nR == 18152)
	{
		addComments(
			'<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over Ms Jones.</p>' +
			'<p>She looks momentarily confused, and then smiles. You are surprised at how little she reacts.</p>' +
			'</td></tr></table>'
		);
		setPersonFlag("MsJones", 1);
		AddMana(5);				
	}
	return true;
}


// Initialise
function initialiseTina()
{
	// Tina
	addPerson("Tina", 82, "Tina", "Normal");
	per.Replies = RepliesTina;
	
	per.isVampyre = function() { return this.dress == "Vampyre"; };
	
	per.getPersonName = function(full) { return full === true ? "Tina Robbins" : this.name; };

	per.getPersonAddress = function() { return this.checkFlag(1)  ? '36 Yoolaroo Dr, Glenvale' : ''; };
	
	per.isPersonInfo = function() { return this.isCharmedBy(); };
	per.getPersonInfo = function() {
		var s = this.addPersonString("tina6.jpg", "height:max%", "right");
		if (this.isVampyre()) {
			s += "Tina was no match for your powers. She gave in quickly and without a fight. She has a spell that could be useful against your foes. She can break any mind control spell and can bring out anyone who’s trapped in one. Now you understand why Davy was afraid of Tina. She could thwart his plans by setting free his minions from under his control.<br><br>" +
			"Tina knew that Davy was plotting something, but was unable to stop her mother from locking her away in the bedroom and guarding her ready for Davy to take her.";
			
		} else {
			s += "Tina was no match for your powers. She gave in quickly and without a fight. She has a spell that could be useful against your foes. She can break any mind control spell and can bring out anyone who’s trapped in one. Now you understand why Davy was afraid of Tina. She could thwart his plans by setting free his minions from under his control.<br><br>" +
			"Tina knew that Davy was plotting something, but was unable to stop her mother from locking her away in the bedroom and guarding her ready for Davy to take her.";
		}
		if (isCharmedBy("MrsRobbins")) {
			s += " Now, with both of them under your power, you can plot your next move against Davy. Sadly, the Robbins girls don’t know much about Davy’s powers, but they can help you in other ways. You just have to think of a plan!<br><br>" +
				"Tina is standing next to her mother, both of them waiting for your wishes. The once proud and wealthy family is on it’s knees, serving only you!";
		}
		return s;
	};
	
	per.whereNow = function()
	{
		if (this.place == 83 && Place == 176) return Place;
		if (isPossess() && this.place == -1) return perYou.place;
		return this.place;
	};
	
	per.passTimeDay = function() {
		this.setFlag(5, false);
		if (this.place == -1) {
			this.place = 83;
			if (Place != 83) return "<p>Tina tells you she is feeling very tired, and has to return to her room until night falls once again.</p>";
		} else if (this.isVampyre() && this.place != 83) this.place = 83;
		return '';
	};

	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 82 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) return this.showPersonString("tina6.jpg");
			return this.showPersonString("tina1.jpg");
		} else if (Place == 83 && this.isHere() && sType === "") {
			if (isDay() || this.checkFlag(5)) return this.showPersonString("tina11day.jpg");
			if (this.isVampyre()) return this.showPersonString(Math.random() < 0.5 ? "tina11nighta.jpg" : "tina11nightb.jpg");
			return this.showPersonString("tina11night.jpg");
		}
		return '';
	};

	per.isPlaceImageRight = function()
	{
	
		if (this.place == -1 && (sType === '' || sType.indexOf("gabbyhousestudy") != -1 || sType == "visitellie")) {
			// With you
			SetRightColumnSize("");
			return true;
		}
		return false;
	};

	per.showPlaceImageRight = function(md)
	{
		this.showPerson("tina-talk.jpg", undefined, undefined, undefined, undefined, undefined, md);
		
		if (sType == "gabbyhousestudy10" || (sType.indexOf("gabbyhousestudy") == -1 && sType.indexOf("vamphelpgabby") == -1)) {
			var b = false;
			var p;
			var plc;
			for (var i = 0; i < arPeople.length - 2; i++) {
				p = arPeople[i];
				if (p.uid == this.uid || p.isDead()) continue;
				plc = p.whereNow();
				if (p.isCharmedBy("You") && (plc == -1 || plc == Place) && !p.isVampyre() && p.health > 0) {
					b = true;
					break;
				}
			}			
			md.write('<div style="clear:both;">');
			addOptionLink(md, "talk to Tina", "findPerson('Tina').chatTina()", b && this.isVampyre() ? "bloodblock" : "chatblock", "width:90%;max-width:90%;position:relative;top:-0.5em");
		}
		md.write('</div>');
	};
	
	// She is fed on
	per.fedUponEvent = function(perV) {
		// Vampyre feeds on her
		var md = WritePlaceHeaderNIP(false, "", "black");
		this.dress = "Vampyre";		// She is turned!
		this.showPerson("embrace1.jpg", "height:max");
		this.setFlag(5);		// unconscious
		this.place = 83;
		setPlaceKnown("TinasRoom");		// Fallback

		addPlaceTitle(md, "Vampyre Feeds on Tina", '', 0, false, 'white');

		md.write(
			'<p>Tina looks uncertainly, and you reassure her as the vampyre approaches with lust on her face. With no hesitation, she embraces Tina and sinks her fangs into Tina\'s neck.</p>' +
			'<p>Tina cries out, you are unsure if it is pain or lust, as the vampyre drinks her blood. You realise the vampyre is getting carried away, drinking more and more. You try to pull her away and she snarls "Witch blood" and sinks her teeth back into Tina\'s neck. Tina cries out in pain, not lust!.</p>' +
			'<p>Again you pull the vampyre away and order her to stop now! She looks furious and but for the spell binding her to you she would of clearly ripped you to bloody shreds!</p>'
		);
		startQuestionsOnly(undefined, 'white', md);
		addLinkToPlace(md, "check on Tina", Place, "type=embrace2");
		WritePlaceFooter(md);
		return true;
	};
	
	// On entering a church
	per.enterChurch = function(plc, s)
	{
		this.place = 83;
		return '<p style="text-align:center"><b>Tina Stops</b></p><p>' + this.showPerson("tina-stopped.jpg", "20%", 'right;margin-bottom:1em', '', '', false, undefined, "string") +
				s + ', Tina stops, and says,<br><br>"This place is holy, I cannot enter here anymore. I will wait for you at home"';
	};
	
	// Event, called from showEvent but also in one case directly
	per.feedOnEvent = function(ps)
	{
		var md = WritePlaceHeaderNIP(false, "", "black");

		var perF = findPerson(ps);
		var herName = perF.getPersonName();

		if (perF.health < 100) {
			// No Feeding
			this.showPerson("tina-stopped.jpg");

			addPlaceTitle(md, "Tina and " + herName, '', 0, false, 'white');

			if (perF.health <= 60) {
				// Someone injured
				md.write(
					'<p>Tina looks at ' + herName + ' and tells you,</p>' +
					'<p>"They are injured and may not live through my feeding. I will not feed on them."</p>'
				);
				startQuestionsOnly(undefined, 'white', md);

			} else {

				// A person fed on before
				md.write(
					'<p>Tina looks at ' + herName + ' and looks at you,</p>' +
					'<p>"I will not feed on this one, they are already weakened and it would harm them for me to feed on them."</p>'
				);
				startQuestionsOnly(undefined, 'white', md);
			}

		} else {
			// Feeding
			AddMana(5);
			this.health += 20;
			if (this.health > 100) this.health = 100;
			perF.health -= 20;
			
			// Feeding ok
			this.showPerson("tinafeed.jpg");

			addPlaceTitle(md, "Tina Feedng on " + herName, '', 0, false, 'white');

			md.write(
				'<p>' + herName + ' looks uncertainly, and you reassure them as Tina approaches with desire on her face. With no hesitation, she embraces ' + herName + ' and sinks her fangs into ' + herName + '\'s neck.</p>' +
				'<p>After a surprising short time, the Tina looks up at you, still holding ' + herName + '. Her face is still full of lust, but different. She steps away from ' + herName + ' who looks strange, a mixture of ecstasy and complete exhaustion, and they immediately sit down.</p>' +
				'<p>Tina looks at you, "My thirst has receded, but my other lusts are rising. Please take me!"</p>'
			);
			startQuestionsOnly(undefined, 'white', md);
			addLinkToPlace(md, "satisfy her lust", Place, "type=tinavampfuck&who" + perF.uid, '', '', '', "bloodblock");
		}

		addOptionLink(md, "enough of that", "setQueryParams('');DoReturn()", "bloodblock");

		WritePlaceFooter(md);
	};	
	
	// Popup events for Tina
	per.showEventPopup = function()
	{
		// First glimpse
		if (Place == 43 && !this.checkFlag(4) && !isSpellKnown("Charm")) {
			// First glimpse
			this.setFlag(4);	// Show once!
			showPopupWindow("Is That Tina?",
				this.addPersonString("tina-talk.jpg", "height:max%", "right") +
				'As you step out of the alley you notice an attractive young woman in the distance, you think it is Tina, Davy Robbins older sister. but you are not sure, you have only met her once.</p>' +
				'<p>She is getting into a car, she must be getting a ride from a friend. Interesting, does this mean she lives near here, or is it her friend that does? She calls out to someone "...back soon..." and gets into the car and they drive off.'
			);
			return true;
		}
		if (sType !== "") return false;

		// Ask about helping Jessica in the Cellar
		if (Place == 83 && !isDay() && this.isVampyre() && !this.checkFlag(5) && !this.checkFlag(6)) {
			// Tina is awake
			this.setFlag(6);
			showPopupWindow("Tina is awake!",
				this.addPersonString("tina7a.jpg", "height:max%", "right") +
				'You see a familiar woman who looks a little like Tina looking at you. Her eyes are pale and you see two vampiric fangs in her mouth. She says,</p>' +
				'<p>"' + this.getYourNameFor() + ', I am yours always, but I am unsure what happened."</p>' +
				'<p>She sounds like Tina, possibly this is the cloak the vampyre Lilith talked about, that Tina at least unconsciously feels different and so she is now projecting somehow this altered appearance.</p>' +
				'<p>You talk to her, both to assure yourself that she is Tina, and also to explain what happened as she seems to have little memory of her revival. She does not really understand what has happened, while she knows much of the occult this must not include much on vampiric lore. She tells you,</p>' +
				'<p>"' + this.getYourNameFor() + ', I will explore what has happened to me, but I am yours to command still."'
			);
			return true;
		}
		
		// See Davy in the cellar
		if (Place == 161 && this.place == -1 && perDavy.isHere()) {
			if (this.isVampyre() && !this.checkFlag(10)) {
				this.setFlag(8);
				this.setFlag(10);
				if (!perDavy.isMaleSex()) this.setFlag(9);
				showPopupWindow("Tina the Vampyre and Davy",
					this.addPersonString("!tina-follower5.jpg", "height:max%", "right") +
					'“I can smell my brother...” Tina rushes down the stairs into the cellar, and her eyes immediately focus on the bound ' + perDavy.getSex() + ', a predatory smile on her face. </p>' +
					'<p>You catch up with her as she is already next to him, driving her fingertips over her brothers exposed ' + (perDavy.isMaleSex() ? 'chest' : 'breasts') + '.</p>' +
					'<p>“Don\'t be afraid, little brother, don\'t you recognize your big sister?” Tina\'s veil fades briefly, exposing her original appearance and pale skin to the terrified Davy. “You smell so good... I want... I need to....”</p>' +
					'<p>“Tina!”</p>' +
					'<p>You call out to the girl seconds before her fangs reach Davy\'s neck, and she jerks away from her brother with a surprised gasp, briefly clutching her head and quickly backing away from ' + perDavy.getHimHer() + '.</p>' +
					'<p>“I... I\'m sorry...” She sinks her head in shame. “Lilith... the Vampire was right about witchblood. I\'m used to your scent, but ' + (perDavy.isMaleSex() ? 'his' : 'hers') + ' is still so enticing, and seeing ' + perDavy.getHimHer() + ' helpless, like injured prey...” She shakes her head. “I will... have to learn to control these urges, thank you for stopping me from doing something I would have regretted.”'
				);
			} else if (!this.checkFlag(9) && !perDavy.isMaleSex()) {
				this.setFlag(9);
				showPopupWindow("Tina and Davy",
					perDavy.addPersonString("davycellar-bound1a.jpg", "height:max%", "right") +
					'“I don\'t understand... didn\'t you say my brother is here, ' + perYou.getMaster() + '?” Davy looks like he is about to die of shame as you explain to his sister what you did, and after a moment of awkward silence, Tina bursts into laughter.</p>' +
					'<p>“You... transformed him into a girl?” She tries her best to contain herself, stiffing the laughter into a giggle.</p>' +
					'<p>"I\'m sorry. I should not laugh about my brothers predicament... but you should absolutely make him wear some skimpy outfit and parade him around school, so he finally knows what it\'s like to have some lecherous teenager\'s eyes on him all the time.”'
				);
			} else if (!this.checkFlag(8) && !this.checkFlag(9)) {
				this.setFlag(8);
				showPopupWindow("Tina and Davy",
					perDavy.addPersonString("davycellar-bound1.jpg", "height:max%", "right") +
					'“You got him...” Tina looks genuinely relieved to see her brother tied up like this. “I was always kind of worried that he might one day show up and try to take me away from you, ' + perYou.getMaster() + ', and it\'s good to know that he won\'t be able to use his spell on me or Mom anymore.”</p>' +
					'<p>Tina thanks you with a long, drawn out kiss on the lips right in front of her brother, and you can see the jealousy burn in his eyes as she breaks off and smiles to him knowingly.<p>' +
					'<p>“I can feel some Mana in him.” She adds, regarding her brother with a look of contempt. “He restores it every morning, and since you have proven to use it so much better, I would gladly transfer it to you.”'
				);				
			}
			return true;			
		}
		return false;
	};

	per.addFreeOptions = function(md)
	{	
		if (this.other < 4) return;
		
		//  In the Robbins House (living room) and Tina can UN-CHARM people
		if (isPersonHere("Mayor") && isCharmedBy("Mayor", "Davy")) {
			// Free the Mayor
			addQuestionC(md, 'tell Tina to free Mayor Thomas from Davy\'s control', "Tina", 1650);
		}
		if (isPersonHere("Tracy") && isCharmedBy("Tracy", "Davy")) {
			// Free your Sister Tracy
			if (Place == 45) {
				addPopupLinkToPlace(md, 'tell Tina to free your sister Tracy from Davy\'s control', Place, '', "Tina Frees Tracy",
					per.addPersonString("tracy1a-day.jpg", "height:max%", "right") +
					'"Yes ' + perYou.getMaster() + ', as you command," she says, immediately beginning to concentrate on your sister.  Moments later you feel the power being passed to you (5 mana).</p><p>As soon as the spell is lifted, Tracy gasps - her face a mixture of disgust and terror - and collapses on the couch holding her head.' +
					'</p>You ask Tina to return to her home for now so you can talk with Tracy. Tina nods her head and quietly leaves your home.',
					'movePerson("Tina",83);AddMana(5);unCharmPerson("Tracy")', '', true
				);				
			} else addQuestionC(md, 'tell Tina to free your sister Tracy from Davy\'s control', "Tina", 8950);
		}
		if (isPersonHere("Ellie") && isCharmedBy("Ellie", "Davy")) {
			// Free Ellie
			if (Place == 176) addQuestionC(md, 'tell Tina to free Ellie from Davy\'s control', "Tina", 18150);
			else if (Place == 81) addLinkToPlaceC(md, 'tell Tina to free Ellie from Davy\'s control', 81, 'type=ellie10b', 'Tina concentrates');
			else if (Place == 421) addQuestionC(md, 'tell Tina to free Ellie from Davy\'s control', "Tina", 18151);
			else if (Place == 430) addLinkToPlaceC(md, 'tell Tina to free Ellie from Davy\'s control', 430, 'type=elliefreed&by=Tina', 'Tina concentrates');
			else if (Place == 423) addLinkToPlaceC(md, 'tell Tina to free Ellie from Davy\'s control', 423, 'type=ellie22', 'Tina concentrates');
		}
		else if (isPersonHere("MsJones") && !isCharmed("MsJones") && !checkPersonFlag("MsJones",1) && checkPersonFlag("MsJones", 17)) addQuestionC(md, 'tell Tina to free Ms. Jones', "Tina", 18152);
		else if (Place == 74 || Place == 75) addQuestionR(md, "tell Tina to free Amy and Catherine", 'You ask Tina to free your friends and she concentrates but skakes her head in failure, maybe the spell affecting the girls is too recently cast and still washing through their bodies and minds. Maybe try again in a few minutes?');
		else if (Place == 36 && (wherePerson("Kate") == 47 || wherePerson("Kate") == 421))  //Kate In the PARK
		{
				if (checkPersonFlag("Kate", 31)) addLinkToPlaceC('ask Tina to free Kate from Davy\'s control', 36, 'type=freed&by=Tina&before=true');
				else addLinkToPlaceC(md, 'ask Tina to free Kate from Davy\'s control', 36, 'type=freed&by=Tina&before=');
		}
		else if (Place == 76 && !checkPersonFlag("AmyRoss", 1)) {
			// Mr Beasley threesome with Catherine and Amy
			addLinkToPlaceC(md, "tell Tina to free Amy and Catherine", 76, 'type=freed', 'Tina concentrates and, within moments, she absorbs the mana powering the <i>charm</i> over Catherine and Amy.', '', 'AddMana(10)');
		}
		else if ((Place == 108 || Place == 139) && wherePerson("Kate") == Place && isCharmedBy("Kate", "Davy")) //Kate @ Home
		{
			if (checkPersonFlag("Kate", 31)) addLinkToPlaceC(md, 'ask Tina to free Kate from Davy\'s control', 139, 'type=freed&by=Tina&before=true');
			else addLinkToPlaceC(md, 'ask Tina to free Kate from Davy\'s control', 139, 'type=freed&by=Tina&before=');
		}
		else if (Place == 145 && !isCharmed("MsJones") && !checkPersonFlag("MsJones",1))
		{
			addQuestionR(md, "tell Tina to free Ms. Jones", 
				'Tina concentrates and, within moments, she absorbs the mana powering the <i>charm</i> over Ms Jones.</p>' +
				'<p>Ms. Jones looks momentarily confused, and then smiles. You are surprised at how little she reacts.',
				'',
				"setPersonFlag(\\'MsJones\\',1);AddMana(5)"
			);
		} else if (isPersonHere("OfficerBatton") && isCharmedBy("OfficerBatton", "!You"))
		{
			// Officer Batton charmed by Davy
			addLinkToPlaceC(md, "tell Tina to free " + getPoliceChief() + " Batton", 168, 'type=freebatton&by=Tina', 'Tina concentrates and, within moments, she absorbs the mana powering the <i>charm</i> over the police chief...');
		} else if (Place == 184)
		{
			if (perDavy.other != 8 && perDavy.getQuestBlueBottle() != 20 && perDavy.getQuestBlueBottle() != 21) {
				// Have not used the ring or blue bottle on him
				AddMana(20);
				perDavy.other = 8; //Hide the 'go to room 101' entry.
				addComments('<p>You clasp the ring with your fist. It glows, far brighter than ever before, and you have to shield your eyes.  Across the room you hear Davy give a strangled grunt, as mana flows from him to you.');
				if ((perDavy.checkFlag(5) && (!perDavy.checkFlag(6) && !perDavy.checkFlag(7))) || perDavy.checkFlag(8)) {
					// Unconscious or restrained
					addQuestionR(md, "tell Tina to free Davy", 
						'Tina concentrates and she staggers, whispering "The power!", and after a tine she absorbs the mana powering the <i>charm</i> over Davy. Across the room you hear Davy give a strangled grunt, as mana flows from him to you through Tina.',
						'',
						"perDavy.other=8;AddMana(20)"
					);					
				} else addLinkToPlaceC(md, "tell Tina to free Davy", 267, '', 'Tina concentrates and she staggers, whispering "The power!", and after a tine she absorbs the mana powering the <i>charm</i> over Davy. Across the room you hear Davy give a strangled grunt, as mana flows from him to you through Tina.', '', 'perDavy.other=8;AddMana(20)');
			} else WriteComments('You have already drained him of his power');
			return;
		}

	};
	
	per.drainPerson = function(id)
	{
		if (id == "Davy") {
			this.setFlag(12);
			perDavy.setFlag(13,false);
			if (!perDavy.checkFlag(14)) {
				perDavy.setFlag(14);
				AddMana(5);
			} else if (!perDavy.checkFlag(15)) {
				perDavy.setFlag(15);
				AddMana(5);
			} else if (!perDavy.checkFlag(16)) {
				perDavy.setFlag(16);
				AddMana(5);
			}
		}
		AddMana(5);
	};
	
	per.chatTina = function()
	{
		// Chat to her while she is your follower
		var md = WritePlaceHeaderNIP();
		this.showPerson("tina-talk.jpg");
		addPlaceTitle(md, "Chatting with Tina");
		md.write(
			'<p>You stop for a moment to talk to Tina.</p>'
		);
		startQuestionsOnly();
		// Feed/Pleasure
		var p;
		var plc;
		for (var i = 0; i < arPeople.length - 2; i++) {
			p = arPeople[i];
			if (p.uid == this.uid || p.isDead()) continue;
			plc = p.whereNow();
			if (p.isCharmedBy("You") && (plc == -1 || plc == Place) && !p.isVampyre() && p.health > 0) {
				// Add query to have Tina feed on them
				if (this.isVampyre()) addLinkToPlace(md, "feed on " + p.getPersonNameShort(), Place, "type=feedOn&by=" + this.uid + "&who=" + p.uid, '', '', '', "bloodblock");
				if (!p.isMaleSex()) addLinkToPlace(md, "pleasure " + p.getPersonNameShort(), Place, "type=" + (this.isVampyre() ? "tinapleasurevamp" : "tinapleasure") + "&who=" + p.uid, '', '', '', "chatblock");
			}
		}
		if (Place == 161 && perDavy.isHere()) {
			addLinkToPlaceC(md, 'pleasure Davy', Place, 'type=tinapleasuredavy');
			if (perDavy.checkFlag(13)) {
				addQuestionR(md, 'ask Tina to drain mana from Davy',
					'Tina mentions that Davy is able to restore his mana every morning, so it might be a nice bonus to defeating him that she gives that Mana to you once a day.</p>' +
					'<p>“Of course, ' + perYou.getMaster() + ', It\'s not like he actually needs it.”</p>' +
					'<p>Tina focuses for a brief moment, and you feel ' +
					(!perDavy.checkFlag(14) && !perDavy.checkFlag(15) && !perDavy.checkFlag(16) ? 'a definite flow of magic from Davy, a significant amount!' : 'a small amount of mana rushing into your body. It\'s not much, possibly due to the circumstances he is in, but still useful.') +
					(!this.checkFlag(12) ? '</p><p>You consider that you could ask Tina to do this once Davy recovers, and to do this you will have to <b>talk to Tina</b> to request it.</p>' : ''),
					"",
					"findPerson(\\'Tina\\').drainPerson(\\'Davy\\')"
				);
			} else {
				addQuestionR(md, 'ask Tina to drain mana from Davy',
					'Tina mentions that Davy is able to restore his mana every morning, so it might be a nice bonus to defeating him that she gives that Mana to you once a day.</p>' +
					'<p>Tina apologizes. “I can\'t extract any more Mana from him, and he only restores his reserves in the morning.”</p>'
				);
			}
		}
		this.addFreeOptions(md);
	
		if (perYou.checkFlag(50) && perYou.checkFlag(52)) addLinkToPlace(md, 'ask Tina to stop the Transformation', Place, 'type=tinaendtransform');

		if (checkPlaceFlag("Park", 6) && !this.checkFlag(3)) addQuestionC(md, 'ask about the symbol on the sign you saw', "Tina", 100);
		if (!this.checkFlag(2)) {
			addQuestionR(md, 'ask "You mentioned the sign?"',
				'She replies, &quot;Ignore the old tales of the devil&rsquo;s mark, but witches do bear a mark on them somewhere. It will usually look like a small tattoo but only to someone with the sight, the vision of one who wields magic.&quot;</p><p>You ask if she has such a mark, she smiles &quot;You will see&quot;',
				"Tina",
				"setPersonFlag(\\'Tina\\',2)"
			);
		}
		if (checkPlaceFlag("Hotel", 11) && Place == 269) addLinkToPlace(md, 'ask Tina is she would like to go for a swim', Place, 'type=tinapool');
		
		// General Questions
		addQuestionR(md, '"I need to do something else, please return home"',
			'"Of course ' + perYou.getMaster() + '"',
			"Tina",
			"movePerson(\\'Tina\\',83)",
			""
		);
		
		addLinkToPlace(md, 'continue on', Place, sPlaceParams);
		WritePlaceFooter(md);
	};
	
	// Events for Tina
	per.showEvent = function()
	{
		var md, w, p;
		
		if (Place == 40) {
			// Shower scenes
			if (sType == "showertina") {
				md = WritePlaceHeader();
				this.showPerson("!tina-shower1.jpg");
				addPlaceTitle(md, "Showering with Tina");
				md.write(
					'<p>Tina\'s eyes nervously dart between you and the broken bathroom door as you undress in front of her. She is a little hesitant, biting her lower lips as you step into the shower and even leaving her underwear on when she finally follows suit.</p>' +
					'<p>Of course, her modestly doesn\'t last long. You pull your little witch under the stream of warm water, driving your fingers over her skin to further stoke her arousal, push her naked body against yours and feel her shiver in your arms as you remind her again that she is yours to use however you please and that it\'s not in her right to hesitate or hide anything if you don\'t allow her to.</p>' +
					'<p>Your words have the desired effect on her. Tina gasps as a pleasant shiver runs through her. She reaffirms her devotion to you, and as you release her from your grasp, she makes a little show out of taking off the remainder of her underwear for you, posing sensually under the stream of water before finally offering her body for you to enjoy as you please.</p>' +
					'<p>And you know a lot of ways to do just that.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'get out of the shower and get dressed', 45);
				WritePlaceFooter(md);
				return true;			
			}
		}
		
		if (sType == "feedOn" && getQueryParam("by") == this.uid) {
			this.feedOnEvent(sWho);
			return true;
		}
		
		if (sType == "tinapleasure") {
			w = sWho;
			p = findPerson(w);
			md = WritePlaceHeader(false, "td-left-med");
			this.showPerson("!tina-follower1.jpg");

			addPlaceTitle(md, "Tina\'s Service");

			md.write(
				'<p>“I will gladly do whatever my ' + perYou.getMaster() + ' desires of me.” Tina looks at ' + p.getPersonNameShort() + ' for a few seconds, and you see her briefly pulling in her lower lip as she steps forward and takes off her clothes, obviously a little nervous.</p>' +
				'<p>You order ' + p.getPersonNameShort() + ' to play along and let Tina take the lead, watching as the girl undresses her partner and begins to drive her hands over the freshly exposed skin, guiding the woman to lie down on the ground and crawling on top of her.</p>' +
				'<p>' + p.getPersonNameShort() + ' gasps softly under the girls touch, her eyes are focused on you even now as Tina Spreads her legs and kisses her thighs, and you see her shivering visibly as the girl\'s lips move closer to her folds.</p>' +
				'<p>You hear a long, sensuous moan the moment Tina\'s tongue reaches her partner\'s clit, and even considering the effect of the spell It is obvious the two put on a bit of a show for your enjoyment. ' + p.getPersonNameShort() + ' winds her body on the floor, twitching and gasping for air, moaning lewdly as she gets closer to her climax, and finally, Tina stops to look at you.</p>' +
				'<p>“She is well-prepared, ' + perYou.getMaster() + ', do you want to join us?</p>'
			);
			startQuestionsOnly();
			startAlternatives(md);
			addLinkToPlace(md, "join in", Place, 'type=tinapleasurejoin&who=' + w);
			addLinkToPlace(md, "let Tina do the honours", Place, 'type=tinapleasuretina&who=' + w);
			endAlternatives(md);
			WritePlaceFooter(md);		
			return true;
		}
		if (sType == "tinapleasurejoin") {
			w = sWho;
			p = findPerson(w);
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonX("!tina-follower2m.jpg");
			else this.showPersonRorX("!tina-follower2f.jpg");

			addPlaceTitle(md, "Joining Tina\'s Service");

			md.write(
				'<p>As much as you love to watch your magical little slut do her thing, you can\'t just stand on the sidelines and keep watching after that show.</p>' +
				'<p>Tina spreads ' + p.getPersonNameShort() + '\'s legs to present the woman\'s sex to you and moves out of the way as you close in, ' + (perYou.isMaleSex() ? 'unceremoniously open your pants and push' : 'knee down before her and insert your fingers') + ' into her waiting mound.</p>' +
				'<p>Her folds easily open for your ' + (perYou.isMaleSex() ? 'cock' : 'fingers') + ', welcoming you inside and squeezing you tightly as you begin to thrust into her, every motion making her shiver lustfully while Tina keeps her pinned down, massaging her breasts and trading sloppy kisses.</p>' +
				'<p>It doesn\'t take long for the two of you to make ' + p.getPersonNameShort() + ' reach her peak, and you make sure she thanks Tina for her valiant efforts.</p>'
			);
			if (!this.checkFlag(11)) {
				this.setFlag(11);
				md.write('<p>You consider that you could ask Tina to do this to others, and you will then <b>talk to Tina</b> to request it.</p>');
			}
			startQuestionsOnly();
			addLinkToPlace(md, "continue on your way", Place);
			WritePlaceFooter(md);		
			return true;
		}
		if (sType == "tinapleasuretina") {
			w = sWho;
			p = findPerson(w);
			md = WritePlaceHeader(false, "td-left-med");
			this.showPersonX("!tina-follower3.jpg");

			addPlaceTitle(md, "Watching Tina\'s Service");

			md.write(
				'<p>You want to watch this show to the end and order Tina to go all the way to make ' + p.getPersonNameShort() + ' climax for your pleasure, and your magical little slut is all too happy to oblige.</p>' +
				'<p>Tina goes down on ' + p.getPersonNameShort() + ' with renewed vigor, inserting her fingers into the woman\'s well-prepared folds as her tongue keeps circling the little nub to make her partner scream out in pleasure and push her closer and closer to her peak with every motion.</p>' +
				'<p>The other woman\'s eyes are still on you as she climaxes, and you make sure she properly thanks Tina for her valiant efforts, making the girl blush happily.</p>'
			);
			if (!this.checkFlag(11)) {
				this.setFlag(11);
				md.write('<p>You consider that you could ask Tina to do this to others, and you will then <b>talk to Tina</b> to request it.</p>');
			}
			startQuestionsOnly();
			addLinkToPlace(md, "continue on your way", Place);
			WritePlaceFooter(md);		
			return true;
		}	
		
		if (sType == "tinapleasurevamp") {
			w = sWho;
			p = findPerson(w);
			md = WritePlaceHeader(false, "td-left-med");
			this.showPerson("!tina-follower1.jpg");

			addPlaceTitle(md, "Tina\'s Service");

			md.write(
				'<p>“I will gladly do whatever my ' + perYou.getMaster() + ' desires of me.” You see a bit of Lilith in the way Tina approaches ' + p.getPersonNameShort() + '. Her motions are slow and sensual, almost predatory in the way her eyes fixate on the woman, and she is probably even taking a little pleasure from the look of unease on the ' + p.getPersonNameShort() + '\'s face as she flashes her teeth.</p>' +
				'<p>You order ' + p.getPersonNameShort() + ' to play along and let Tina take the lead, watching as the dhampir undresses her partner and begins to drive her hands over the freshly exposed skin, guiding the woman to lie down on the ground and crawling on top of her.</p>' +
				'<p>' + p.getPersonNameShort() + ' gasps in surprise as Tina\'s fangs dig into her inner thigh. You expect her to struggle, but the effect of the bite only seems to arouse her even more. Her eyes loose focus, and she is trembling visibly as she stretches her body out before Tina and offers herself to the halfblood\'s tender affections.</p>' +
				'<p>A long, sensuous moan echoes into the room as Tina begins to tend to her partner\'s clit, and you are seriously not sure how much of the show the two put on is the result of the spell or the result of Tina\'s new powers. ' + p.getPersonNameShort() + ' winds her body on the floor, twitching and gasping for air, moaning lewdly as she gets closer to her climax until finally, Tina stops to look at you.</p>' +
				'<p>“She is well-prepared, ' + perYou.getMaster() + ', do you want to join us?</p>'
			);
			startQuestionsOnly();
			startAlternatives(md);
			addLinkToPlace(md, "join in", Place, 'type=tinapleasurevampjoin&who=' + w);
			addLinkToPlace(md, "let Tina do the honours", Place, 'type=tinapleasurevamptina&who' + w);
			endAlternatives(md);
			WritePlaceFooter(md);		
			return true;
		}
		if (sType == "tinapleasurevampjoin") {
			w = sWho;
			p = findPerson(w);
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonX("!tina-follower2m.jpg");
			else this.showPersonRorX("!tina-follower2f.jpg");

			addPlaceTitle(md, "Joining Tina\'s Service");

			md.write(
				'<p>As weirdly sexy as it is to just watch the dhampire do her thing, you can\'t just stand on the sidelines and keep watching after that show.</p>' +
				'<p>Tina spreads ' + p.getPersonNameShort() + '\'s legs to present the woman\'s sex to you and moves out of the way as you close in, ' + (perYou.isMaleSex() ? 'unceremoniously open your pants and push' : 'knee down before her and insert your fingers') + ' into her waiting mound.</p>' +
				'<p>Her folds easily open for your ' + (perYou.isMaleSex() ? 'cock' : 'fingers') + ', welcoming you inside and squeezing you tightly as you begin to thrust into her, every motion making her shiver lustfully while Tina keeps her pinned down, her teeth digging briefly into ' + p.getPersonNameShort() + '\'s shoulder, drawing blood and causing her to groan in a strange mix of pain and pleasure.</p>' +
				'<p>It doesn\'t take long for the two of you to drive ' + p.getPersonNameShort() + ' to a powerful climax, and you make sure she thanks Tina for her valiant efforts.</p>'
			);
			if (!this.checkFlag(11)) {
				this.setFlag(11);
				md.write('<p>You consider that you could ask Tina to do this to others, and you will then <b>talk to Tina</b> to request it.</p>');
			}
			startQuestionsOnly();
			addLinkToPlace(md, "continue on your way", Place);
			WritePlaceFooter(md);		
			return true;
		}
		if (sType == "tinapleasurevamptina") {
			w = sWho;
			p = findPerson(w);
			md = WritePlaceHeader(false, "td-left-med");
			this.showPersonX("!tina-follower3.jpg");

			addPlaceTitle(md, "Watching Tina\'s Service");

			md.write(
				'<p>You want to watch this show to the end, so you order Tina to go all the way to make ' + p.getPersonNameShort() + ' climax for your pleasure, and your sexy little dhampire is all too happy to oblige.</p>' +
				'<p>Tina goes down on ' + p.getPersonNameShort() + ' with renewed vigor, inserting her fingers into the woman\'s well-prepared folds as her tongue keeps circling the little nub, making ' + p.getPersonNameShort() + ' scream out lustfully and pushing her closer and closer to her peak with every motion.</p>' +
				'<p>As ' + p.getPersonNameShort() + ' finally climaxes, Tina\'s fangs dig into her skin one last time, making her groan in pain and pleasure as a plethora of different sensations washes over her, leaving her exhausted, but very much satisfied.</p>'
			);
			if (!this.checkFlag(11)) {
				this.setFlag(11);
				md.write('<p>You consider that you could ask Tina to do this to others, and you will then <b>talk to Tina</b> to request it.</p>');
			}
			startQuestionsOnly();
			addLinkToPlace(md, "continue on your way", Place);
			WritePlaceFooter(md);		
			return true;
		}	

		if (sType == "tinapleasuredavy") {
			md = WritePlaceHeader();
			if (perDavy.isMaleSex()) this.showPersonX("!tina-follower4m.jpg");
			else this.showPersonX("!tina-follower4f.jpg");

			addPlaceTitle(md, "Tina Pleasures Davy");

			md.write(
				'<p>“You are too kind to ' + perDavy.getHimHer() + ', ' + perYou.getMaster() + '. Tina looks at her ' + (perDavy.isMaleSex() ? 'brother' : 'transformed brother') + ' with contempt as she approaches ' + perDavy.getHimHer() + ', his prior actions definitely not forgotten.</p>' +
				'<p>“But maybe I should thank him, after all, it is only thanks to his greed and foolishness that I learned how amazing it is to be your slave.”</p>' +
				'<p>Her words are clearly meant to rattle Davy, and judging from the look of utter defeat on ' + perDavy.getHisHer() + ' face as Tina begins to caress ' + (perDavy.isMaleSex() ? 'his cock' : 'her folds') + ', they don\'t fail to hit their mark.</p>' +
				'<p>“Don\'t look at me like that, little ' + (perDavy.isMaleSex() ? 'brother' : 'sister') + '.” Tina\'s lips move close to Davy\'s ear as her fingers begin to move. “You get what you always dreamed off when you spied on me in the shower: Your big sister rubbing your ' + (perDavy.isMaleSex() ? 'cock' : 'pussy') + ' and making you cum, while I get to have amazing sex with my ' + perYou.getMaster() + ', over and over again.”</p>' +
				'<p>Davy brings out a mean streak you usually don\'t get to see from Tina, and one she definitely has from her mother. The girl not only lays out in graphic detail how the two of you are having sex, she embellishes a good deal of it, too, making you wonder if you should take notes for later.</p>' +
				'<p>It may be more humiliating for Davy than anything Bambi comes up with, but the effect it has on him can\'t be denied.</p>' +
				'<p>' + (perDavy.isMaleSex() ? 'He is rockhard' : 'She is practically dripping') + ' under Tina\'s touch, trying ' + perDavy.getHisHer() + ' best to not show ' + perDavy.getHisHer() + ' arousal and failing miserably under Tina\'s continued attention until ' + perDavy.getHeShe() + ' is no longer able to hold back and climaxes onto ' + perDavy.getHisHer() + ' sisters hand.</p>'
			);
			if (!this.checkFlag(11)) {
				this.setFlag(11);
				md.write('<p>You consider that you could ask Tina to do this again, and then you will have to <b>talk to Tina</b> to request it.</p>');
			}
			startQuestionsOnly();
			addLinkToPlace(md, "continue on your way", Place);
			WritePlaceFooter(md);		
			return true;
		}
		
		if (Place == 269 && sType == "tinapool") {
			md = WritePlaceHeader();
			this.showPerson("tina-pool.jpg");
			addPlaceTitle(md, "Tina at the Pool");
			if (this.isVampyre()) {
				if (!this.checkFlag(7)) {
					md.write(
						'<p>Tina nods a little hesitantly, "Yes ' + perYou.getMaster() + ', it is just some of the old legends of vampires and water...", and she rummages around in her large handbag. To your surpise she takes out a purple bikini and there and then she changes into it, not bothering to go into the changingroom. Well Tina has shown no modesty around you since you met her. Tentatively she steps into the water, and looks relieved, nothing unusual happens.</p>' +
						'<p>You have a pleasant time relaxing and playing with Tina, though she prefers to keep to the darker end of the pool where the lighting is subdued at this time of night</p>'
					);
					this.setFlag(7);
				} else {
					md.write(
						'<p>Tina nods a little hesitantly, "Yes ' + perYou.getMaster() + '", and she rummages around in her large handbag. To your surpise she takes out a purple bikini and there and then she changes into it, not bothering to go into the changingroom. Well Tina has shown no modesty around you since you met her. She still seems uncertain about the water but again nothing unusual happens, maybe as this would not class as \'running water\'?</p>' +
						'<p>You have a pleasant time relaxing and playing with Tina, though she prefers to keep to the darker end of the pool where the lighting is subdued at this time of night</p>'
					);					
				}
			} else {
				md.write(
					'<p>Tina nods , "Yes ' + perYou.getMaster() + '", and she rummages around in her large handbag. To your surpise she takes out a black bikini and there and then she changes into it, not bothering to go into the changingroom. Well Tina has shown no modesty around you since you met her.</p>' +
					'<p>You have a pleasant time relaxing and playing with Tina, and after she takes some time under the shower cleaning off. She seems to really enjoy the shower!!</p>'
				);			
			}
			startQuestions();
			addLinkToPlaceC(md, 'continue on', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		// Sex with the Tina after feeding
		if (sType == "tinavampfuck") {
			w = sWho;  // Who else is here, ie just go fed on
			md = WritePlaceHeaderNIP(false, perYou.isMaleSex() ? "" : "td-left-med", "black");

			if (perYou.isMaleSex()) this.showPerson("tina-sexba.jpg");
			else this.showPersonRandomRorX("tina-sexg", isExplicit() ? 2 : 1);

			addPlaceTitle(md, "Tina \'s  Lust", '', 0, false, 'white');
			md.write(
				'<p>The feeding seems to have a profound effect on the young dhampire, and whatever semblance of self-control she displayed seconds ago evaporates the moment you embrace her.</p>' +
				'<p>Tina\'s hands are shaking as she impatiently undresses you. She is eagerly inhaling your scent as her lips cover every inch of exposed skin with soft kisses until suddenly, her fangs dig into your soft flesh.</p>' +
				'<p>You feel a piercing rush of pain, gasping in surprise as Tina recoils from you in shock over what she did and just stares at you, eyes wide and lips trembling. Both of you seem unsure how to react for a moment while a pleasant, tingly sensation spreads from the bite all over your body, followed by a feeling of lightheaded euphoria and finally pure, undiluted desire.</p>' +
				'<p>The pain is forgotten the moment you pull her into a kiss, but the rush of Adrenalin remains. You are forceful and demanding, ignoring the strange, metallic taste in her mouth as you push her to the ground, ' + (perYou.isMaleSex() ? 'turn her body around and position yourself behind her' : 'and move to lay on top of her') + '.</p>' +
				'<p>There is no struggle. Tina eagerly submits to your will and offers herself to you, breathing out rough, almost animalistic moans as you ' + (perYou.isMaleSex() ? 'take her from behind' : 'push your fingers into her pussy') + ' and begging you to go even harder, to slap her ass and pull her hair, to claim her body and show your dominance over her mind until you finally both reach your peak.</p>' +
				'<p>The climax is sobering. You feel your euphoria die down but still a little lightheaded, and from the looks of it, Tina will need a moment to recuperate from the act as well. <Girl Tina fed from> in the meantime still looks dazed from the feeding but has witnessed the whole act, and it looks like it left her desiring more from you, too.</p>'
			);
			startQuestionsOnly(undefined, 'white', md);
			addOptionLink(md, "enough of that", "setQueryParams('');DoReturn()", "bloodblock");

			WritePlaceFooter(md);
			return true;
		}
		
		if (this.isHere()) {
			if (sType == "embrace2") {
				// Vampyre feeds on her, result
				md = WritePlaceHeaderNIP(false, "", "black");
				this.showPerson("embrace2.jpg", "height:max");

				addPlaceTitle(md, "Hurt Tina", '', 0, false, 'white');

				md.write(
					'<p>Tina in unconscious and looking very pale. You carry her onto her bed and take out your phone to call an ambulance. As you do a cool hand touches your shoulder, you turn and see the vampyre Lilith,</p>' +
					'<p>"The blood of a witch is irresistable to a vampyre and I took too much. She will be dead in a few minutes."</p>' +
					'<p>It is strange, she looks almost sorry, if also still full of a mixture of rage and lust. She looks at Tina and back at you,</p>' +
					'<p>"If you value this one I can save her, the witch blood left in her, and that I have in me I can combine and restore some to her. She will be changed."</p>' +
					'<p>You ask what she means by changed. Lilith smiles, her usual cruel smile,</p>' +
					'<p>"She will become more like me, alive still but less of a mortal witchling, more a Darkling Witch, a Dhampir". You are unsure about these terms, except you have heard a Dhampir is some sort of half-blood vampire. You ask her to explain more. She looks steadily at you,</p>' +
					'<p>"There is no time, do you want her or will you give her to death?". Well there is little choice is there and you tell Lilith to proceed.</p>'
				);
				startQuestionsOnly(undefined, 'white', md);
				addLinkToPlace(md, "Lilith embraces Tina", Place, 'type=embrace3');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "embrace3") {
				// Vampyre feeds on her, result
				md = WritePlaceHeaderNIP(false, "td-left-med", "black");
				this.showPerson("embrace3.jpg");
				addPlaceTitle(md, "Embracing Tina", '', 0, false, 'white');

				md.write(
					'<p>Lilith strips off her clothing and as she does you see a subtle shift about her, as if her features slightly change. Her expression is less that of a predator, softening just a little. She looks at you a smiles, less cruel and almost with amusement,</p>' +
					'<p>"Vampyres cloak their prey\'s minds and shape their perceptions so to help them drop their guard. Sometimes this is subtle, sometimes gross, sometimes deliberate, but mostly unconscious."</p>' +
					'<p>She embraces the pale and limp Tina and carefully sinks her fangs into Tina\'s neck. You can feel a surge of magic in the room, and then you hear Tina sharply draw in a breath and she starts to raggedly breathe. Lilith stops biting her, continuing her embrace but making it more and more sensual. She moves to nibbling and biting on Tina\'s nipples, looking at you as she does to gauge your reaction or is it your approval.</p>' +
					'<p>Tina moans in lust and pain, and leans down and bites Lilith on her shoulder. You see blood trickling down and then a flash of mana pour into you as Tina drains mana from Lilith and gives it to you. She pulls back and you can clealy see fangs in her mouth, and she looks at you imploringly. You know she wants, needs, you to join them, but you feel reluctant. The two vampiric lovers before you, the blood and the near death all make for a disturbing scene. Tina needs you here and it is your fault what has happened, you allowed Lilith to feed on her. You remove your clothing and lean over and kiss Tina, but as you do Lilith bites you on your thigh in her vampiric idea of foreplay.</p>' +
					'<p>A strange time of passion follows, a mixture of pain, blood and sex with two women, one an otherworldly immortal vampyre and one who may now be joining her in that state.</p>' +
					'<p>After, Tina lies on the bed, you are not sure if she is asleep or unconscious. Lilith assures you she will wake, but not until the following night, as she will. She looks still strange, less cruel but almost as if this meant something, but what you do not know. As you ponder asking her, she informs you she must rest and leaves the room.</p>'
				);
				AddMana(10);
				movePerson("Vampyre", 247);
				startQuestionsOnly(undefined, 'white', md);
				addLinkToPlace(md, "leave her for now", 176);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 141 && sType === "" && !checkPlaceFlag("SacredClearing", 2) && this.isVampyre() && this.isHere() && !isPersonHere("Vampyre")) {
			findPerson("Vampyre");
			if (per.isMonstersInSacredClearing()) {
				// Guarding against monsters, and only Tina.
				md = WritePlaceHeaderNIP(true, '', 'black');
				showPopupWindow("Tina and the <i>Too Thin</i> Sacred Clearing",
					"<img src='Images/People/Tina/Vampyre/tina-attack1.jpg' class='imgpopup' alt='TimaVamp'>" +
					"You see movement in the darkness, and Tina moves to position herself between you and whatever it is. She seems to do this instinctively, and as she does the movement hesitates.<br><br>" +
					"With inhuman speed Tina moves, and there is an explosion of blood and gore and you see her standing covered in the blood of whatever that was. She looks at you confused, she does not know how or why she did that. The blood coating her fades away amd you feel a faint surge of mana while she redresses.<br><br>" +
					"She resumes her place at your side",
					'AddMana(5);dispPlace()', "left:5%;width:85%"
				);
				setPlaceFlag("SacredClearing", 2);
				WritePlaceFooter(md);
				return true;
			}
		}

		if (Place == 82 || Place == 83) {
			if (sType == "play") {
				// Tina plays with herself in the bedroom
				md = WritePlaceHeader(false, "td-any");
				var myName = perYou.getMaster();

				if (this.isVampyre()) this.showPersonRandom("tina7", 2, "height:max");
				else this.showPerson("tina7.jpg", "height:max");

				addPlaceTitle(md, "Tina");

				md.write(
					'<p>Tina slowly leans back against the bed as you order to to play with yourself. Squeezing her breast she smiles as her left hand quickly slides down to her pussy. Her fingers quickly begin stroking her clit as her breathing hastens from her open display of obedience and visual pleasure. The hand upon her breast begins pinching and tugging at her nipple.</p>' +
					'<p>Moaning, Tina thrusts her hips up toward you in an inviting way. Her hope that her display will incite you to fuck her. Continuing to rub her clit, she abandons her breasts and spreads the lips of her cunt apart to expose the damp flesh beneath. She shifts her attention away from her clit and quickly buries two fingers into her cunt. She gasps out, “Please ' + perYou.getMaster() + ', fuck me! My pussy belongs to you!”</p>' +
					'<p>Smiling at her words you continue to watch her furiously piston her fingers into her hole. Unconsciously her hips thrust upward as she works her hand into her wet hole. Her arousal reaching such a level that you can audibly hear her pussy from her arousal as the room is filled with her scent. She thrashes about as her orgasm hits, screaming loudly as her body is consumed by the very sensation washing over her.</p>' +
					'<p>She remains motionless for a few seconds afterward, basking in the wonderful afterglow of her orgasm. Lethargically she props herself up as the fingers buried in her cunt slip into her mouth. Noisily she sucks them clean, hoping to incite you to use her mouth as well. Once she has them cleaned.</p>'
				);
				if (perYou.isMaleSex()) md.write('<p>“I must clean up my fingers like I would clean my ' + perYou.getMaster() + '\'s cock after it has been inside me,” she smiles sweetly.</p>');

				startQuestions();
				addLinkToPlaceC(md, "talk to Tina", Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "submit") {
				// Tina submits in the bedroom
				w = !this.isVampyre() && isExplicit() && perYou.isMaleSex();		// ACtually this means NOT wide
				if (this.isVampyre() && isExplicit() && perYou.isMaleSex()) w = false;
				md = WritePlaceHeader(false, w ? "" : "td-left-large");

				if (isExplicit() && perYou.isMaleSex()) this.showPersonRandomX("tina8", this.isVampyre() ? 1 : 2);
				else this.showPerson("tina8.jpg");

				addPlaceTitle(md, "Tina\'s Submission");

				md.write(
					'<p>You order Tina to submit and she happily agrees, quickly removing your clothes and eyeing you anxiously.</p>' +
					'<p>"I am yours, ' + perYou.getMaster() + '. How may I serve..." she asks, her voice dripping with desire.</p>' +
					'<p>You take her in every way possible, Tina following your every command in a frenzy of sexual energy.</p>' +
					'<p>Eventually, and more than a little reluctantly, you pull yourself away from your magical little slut.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, "talk to Tina", Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		if (Place == 82) {
			if (sType == "charmtina1") {
				// Charm in Mrs Robbins Bedroom 1
				md = WritePlaceHeader();
				this.other = 1;
				this.showPerson("tina2.jpg");
				addPlaceTitle(md, "Tina Robbins Under a Spell");

				md.write(
					'<p>You cast the charm spell on Tina Robbins. Surprise registers on her face as she learns what you have done to her. "Oh please no!" ' +
					'She exclaims. "I didn\'t think that you could use magic too. You\'re not going to make me do things against my will, are you? Please don\'t."</p>' +
					'<p>As you wait for the spell to take effect you see that Tina\'s eyes are changing to a different colour. A pale green colour dilutes her pupils, seeking her soul.</p>' +
					'<p>Tina looks puzzled. "I should have known that you are another ' + perYou.getWitch() + ' but you don\'t have the sign. Maybe because you are new to the craft. ' +
					'I have to let Davy know, he was trying to find out about all people of witch-blood in town." ' +
					'She jumps up and walks to the door, raising her hand to knock loudly and calls out "Mom!"</p>'
				);

				startQuestions();

				addLinkToPlaceC(md, "order Tina to get back on the bed?", Place, 'type=charmtina2');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmtina2") {
				// Charm in Mrs Robbins Bedroom 2
				md = WritePlaceHeader();
				this.showPerson("tina3.jpg");

				addPlaceTitle(md, "Tina Robbins Under a Spell");

				md.write(
					'<p>You command the girl, "Stop! Do not tell your brother or mother, Tina. You are now my loyal and obedient slave, so you will serve and protect me from your brother".</p><p>You then hear from outside the bedroom Mrs. Robbins call out '
				);
				if (isCharmedBy("MrsRobbins", "Davy")) md.write('"Quiet Tina, My lovely Davy will be here for you soon enough!"</p>');
				else md.write('"Yes Tina?", and Tina replies, "It is alright Mom ' + perYou.getPersonName() + ' just told a bad joke.". Mrs. Robbins replies, "Alright dear, play nice!"</p>');
				md.write(
					'<p>Tina turns to look at you and you continue, "Now, tell me what you are."</p>' +
					'<p>"I am your slave, ' + perYou.getMaster() + '.  I obey only you. My life is yours.  I obey you in all things.  Use me however and whenever you wish."</p>' +
					'<p>You are pleased with the spell\'s effects, but you wonder why Tina\'s eyes are turning green. You order her to tell you.</p>' +
					'<p>"My eyes are green because of my heritage, ' + perYou.getMaster() + '. All of my family are born with magic in their blood, though not all of us know how to use it."</p>' +
					'<p>"We have the power of mana that regenerates our lives every day. Once we use what we have we must wait for the next day. Some of my kin are very powerful, like Davy.  Compared to him, or you ' + perYou.getMaster() + ', my powers are barely worth mentioning."</p>'
				);

				startQuestions();
				if (!this.checkFlag(2)) {
					addQuestionR(md, 'ask "You mentioned the sign?"',
						'She replies, &quot;Ignore the old tales of the devil&rsquo;s mark, but witches do bear a mark on them somewhere. It will usually look like a small tattoo but only to someone with the sight, the vision of one who wields magic.&quot;</p><p>You ask if she has such a mark, she smiles &quot;You will see&quot;',
						"Tina",
						"setPersonFlag(\\'Tina\\',2)"
					);
				}
				addLinkToPlaceC(md, "order Tina to give you what little mana she has?", Place, 'type=charmtina3');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmtina3") {
				// Charm in Mrs Robbins Bedroom 3
				md = WritePlaceHeader(false, "td-left-large");
				this.showPerson("tina4.jpg");
				if (this.other < 2) // advance the Tina Charmed Path
				{
					this.other = 2;  // has taken her mana
					AddMana(8);
				}
				addPlaceTitle(md, "Tina Robbins Under a Spell");

				md.write(
					'<p>"Yes ' + perYou.getMaster() + '," Tina says.  "My mana is yours. It is only a little, but it should help you to bring another person to serve you as much as I do.' +
					'<p>Do you wish to take me now my ' + perYou.getMaster() + '?" she asks, inviting you to use her body in any way you might want.</p>' +
					'<p>Tina Robbins is an enticing figure. Your fingers stray to your '
				);
				if (perYou.isMaleSex()) md.write('crotch');
				else md.write('pussy');
				md.write(' as you watch her undress and display her body for you.  Something about a willing slave begging to be used begins to push you over the edge.</p>');

				startQuestions();
				addLinkToPlace(md, "take Tina Robbins like the slave she is?", Place, 'type=charmtina4');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charmtina4") {
				// Charm in Mrs Robbins Bedroom 4
				md = WritePlaceHeader(false, "td-left-large");
				this.showPerson("tina5.jpg");

				addPlaceTitle(md, "Tina Robbins Under a Spell");

				md.write(
				  '<p>Your press your body into the inviting Tina and she responds with a long passionate kiss. Her hands are ' +
				  'everywhere, exploring your skin, stripping your clothes. A low growl issues from Tina\'s lips as you reach for one of ' +
				  'her breasts. Then, in a frenzy, she falls to her knees and spreads legs. You slide one finger into her pussy. She is more than ready.</p>'
				);

				startQuestions();
				if (isCharmedBy("MrsRobbins", "You")) {
					addPopupLinkToPlace(md, "enjoy yourself?", 83, '', "Not here...",
						this.addPersonString("tina10.jpg", "height:max%", "right") +
						'You reach out for your slave Tina, and she looks at you with an odd expression, a look of complete certainty,<br><br>' +
						'"Mom is free of Davy", and you nod in agreement and once again reach for her. She shakes her head,<br><br>' +
						'"Please, not here, let\'s go to my bedroom". You follow her to a nearby bedroom and when you get there she opens a side table and pours some red wine for you both and toasts you,<br><br>' +
						'"My ' + perYou.getMaster() + '! Take me as you desire"', 'setPlaceKnown("TinasRoom");movePerson("Tina",83)', '', true
					);				
				} else addLinkToPlace(md, "enjoy yourself?", 82);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "motherdaughter") {
				md = WritePlaceHeader(false, "td-any");
				WaitHereOnly(6);		// 30 minutes

				// Mother/Daughter Threesome
				if (perYou.isMaleSex()) this.showPersonRandomRorX("robbinsthreesomeb", isExplicit() && !this.isVampyre()  ? 2 : 1, "height:max");
				else this.showPerson("robbinsthreesomeg.jpg", "height:max");

				addPlaceTitle(md, "Mother/Daughter Time");

				md.write(
					'<p>Both mother and daughter happily guide you into the bedroom together, eagerly covering your body in tender affections and removing your clothes.</p>' +
					'<p>Tina is a little more hesitant, mostly focused on your pleasure and desires, but, submissive as she is, easily gets carried away by her mothers domineering personality and shameless enthusiasm, growing bolder and more passionate every minute you are together.</p>' +
					'<p>Geraldine, on her end, practically offers her daughter up to you. Whenever she is not tending to you, she is often trading sloppy, tongue heavy kisses with the girl and always makes sure that Tina presents herself well. Shoulders back, tits out, legs spread, back arched, ass up... it\'s one of the very few times you allow her to somewhat take charge and she always savors the opportunity to make sure her daughter is looking her best whichever way you may decide to take her.</p>' +
					'<p>And you know plenty of ways to enjoy the pair. Sometimes you actively pleasure one or both of them with hands or lips, sometimes you just lean back and let them tend to you and sometimes you just have wild sex with one of them while the other watches. Both mother and daughter never fail to do their utmost to please you, and you have come to quite enjoy your visits to the Robbin\'s residence.</p>'
				);

				startQuestions();
				addLinkToPlace(md, "leave the bedroom", 176);
				WritePlaceFooter(md);
				return true;
			}

		}
		return false;
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (!this.isHere() || sType !== "") return;
		if (this.isVampyre() && (isDay() || !this.checkFlag(6))) return;
		
		var perGeraldine = findPerson("MrsRobbins");
		
		if (Place == 82) {
			// In Mrs Robbins Bedroom
			this.setFlag(1);

			if (!this.checkFlag(13)) addQuestionC(md, '"Why are you in the bedroom"', "Tina", 620);
			else if (!this.checkFlag(14)) {
				if (!perGeraldine.isCharmedBy("Davy")) {
					// Ok to leave
					addQuestionR(md, "Don\'t worry, your mother is ok now", "You tell Tina that her mother is ok now, she is free of Davy&rsquo;s influence and she can leave the room. Tina seems uncertain and says that she will see later but she thanks you for whatever you did.", "Tina", "setPersonOther(\\'Tina\\',2);");
				} else {
					// Locked in
					addQuestionC(md, '"Is there any way out?"', "Tina", 621);
				}
			} else if (this.checkFlag(15)) addQuestionC(md, '"What has been happening with Davy recently"', "Tina", 613);

			if (this.other > 3 && perGeraldine.isCharmedBy("Davy")) {
				//Tina can "Uncharm" and Mother is still charmed
				addQuestionC(md, '"Tina, I want you to try and remove the spell cast on your mother."', "Tina", 6410);
			}
			if (perGeraldine.isCharmedBy("Davy") && !perYou.isBornMale()) {
				if (isDay()) addLinkToPlace(md, "wait", '', '', 'You wait for a time with Tina and night starts to fall. Once you think you heard Mrs. Robbins softly talking, you would guess on the phone but otherwise nothing happens.', '', 'WaitforForDayNight();bChat=false;');
				else {
					addPopupLinkToPlace(md, "wait", 992, '', "Tired...",
						'<p style="position:absolute;left:35%;top:1em;cursor:pointer;font-size:1.1em;width:62%"><b>The evening drags on and Tina lies down on the bed besides you. You know going to sleep is a bad idea but you cannot stop yourself, and you doze off...</b>',
						'', 
						"top:10vh;left:5%;width:85%;height:80vh;padding:0;background-color:white;color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;background-image:url(Images/People/Tina/Normal/" + (this.isCharmedBy() ? "tina9" : "robbinsbadenda") + ".jpg);background-size:100%;background-repeat:no-repeat;background-position:left bottom",
						true
					);
				}
			}
			
		} 
		if (Place == 82 || Place == 83) {
			
			if (this.other == 2) addQuestionC(md, '"Can you take the mana from other people as well?"', "Tina", 612);
		
			if (this.isCharmedBy()) {
				addLinkToPlaceC(md, '"Play with yourself for me, Tina."', Place, 'type=play');
				addLinkToPlaceC(md, '"You are mine to use whenever, and <i>however</i> I want... always remember that, Tina."', Place, 'type=submit');
			}
		
			if (checkPlaceFlag("Park", 6) && !this.checkFlag(3)) addQuestionC(md, 'ask about the symbol on the sign you saw', "Tina", 100);
		}
		
		if (this.isCharmedBy()) {
			if (this.place == 83) {
				if (perYou.checkFlag(50) && perYou.checkFlag(52)) addLinkToPlace(md, 'ask Tina to stop the Transformation', Place, 'type=tinaendtransform');
				addQuestionR(md, 'Tina, "Please come with me"',
					'"Of course ' + perYou.getMaster() + '"',
					"Tina",
					"bChatLeft=" + !this.isVampyre() + ";movePerson(\\'Tina\\',-1)"
				);
				if (checkPersonFlag("Gabby", 15) && !isCharmedBy("Gabby") && wherePerson("Gabby") == 415) {
					addQuestionR(md, 'ask Tina to help you break into Gabby\'s home',
						'Tina\'s knowledge of arcane symbols and her ability to absorb magic might be handy in disabling the wards or any trap you might find, this makes her your first and probably best choice for breaking in, and Tina is eager to be of use to you.</p>' +
						'<p>The two of you agree to meet at Gabby\'s house when you are ready to stage your break-in.',
						"Tina",
						"movePerson(\\'Tina\\',-1)"
					);
				}
			} else if (this.place != -1) this.addFreeOptions(md);
			if (!this.checkFlag(11)) {
				// Feed/Pleasure
				var p;
				var plc;
				for (var i = 0; i < arPeople.length - 2; i++) {
					p = arPeople[i];
					if (p.uid == this.uid || p.isDead()) continue;
					plc = p.whereNow();
					if (p.isCharmedBy("You") && (plc == -1 || plc == Place) && !p.isVampyre() && p.health > 0) {
						// Add query to have Tina pleasure them
						if (p.uid == "misslogan" && p.getCharmedLevel() == 1) continue;
						if (!p.isMaleSex()) addLinkToPlace(md, "ask Tina to pleasure " + p.getPersonNameShort(), Place, "type=" + (this.isVampyre() ? "tinapleasurevamp" : "tinapleasure") + "&who=" + p.uid, '', '', '', "chatblock");
					}
				}
				if (Place == 161 && perDavy.isHere() && sType == "checkdavy") {
					addLinkToPlaceC(md, 'pleasure Davy', Place, 'type=tinapleasuredavy');
					if (perDavy.checkFlag(13)) {
						addQuestionR(md, 'ask Tina to drain mana from Davy',
							'Tina mentions that Davy is able to restore his mana every morning, so it might be a nice bonus to defeating him that she gives that Mana to you once a day.</p>' +
							'<p>“Of course, ' + perYou.getMaster() + ', It\'s not like he actually needs it.”</p>' +
							'<p>Tina focuses for a brief moment, and you feel a small amount of mana rushing into your body. It\'s not much, possibly due to the circumstances he is in, but still useful.' +
							(!this.checkFlag(12) ? '<p>You consider that you could ask Tina to do this once Davy recovers, and to do this you will have to <b>talk to Tina</b> to request it.</p>' : ''),
							"",
							"setPersonFlag(\\'Tina\\',12);perDavy.setFlag(13);AddMana(5)"
						);
					} else {
						addQuestionR(md, 'ask Tina to drain mana from Davy',
							'Tina mentions that Davy is able to restore his mana every morning, so it might be a nice bonus to defeating him that she gives that Mana to you once a day.</p>' +
							'<p>Tina apologizes. “I can\'t extract any more Mana from him, and he only restores his reserves in the morning.”</p>'
						);
					}
				}
			}
		}
		if (Place == 82 || Place == 83) {
			if (!isDay() && this.isCharmedBy() && perGeraldine.isCharmedBy("You")) {
				this.addSleepLink(md, "go to bed for the night with Tina", "Going to Bed with Tina",
					'<p style="position:absolute;left:35%;top:1em;cursor:pointer;font-size:1.1em;width:62%">You tell your beautiful slave that you will sleep here tonight. She lies down awaiting you.',
					'tina9.jpg', true
				);
			}
		}
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 82 && this.isHere()) {
			var perGeraldine = findPerson("MrsRobbins");
			if (perGeraldine.isCharmedBy("Davy") && !perYou.isBornMale()) {
				md.write('<p>Mrs. Robbins has thrown you into her bedroom and locked the door. You check the window to find it barred. There is no way out and Davy is sure to come home soon to subject you to his power.</p>');
			}

			if (this.other === 0) {
				md.write('<p>Another girl is in the room with you, dressed only in her underwear. After some tense minutes she introduces herself as Tina, Davy\'s sister. You have met her before at a party but clearly she has no memory of you. ');
				if (perGeraldine.isCharmedBy("Davy")) {
					md.write('Like you Tina is trapped, waiting for Davy to arrive home.</p>');
					if (!checkPlaceFlag("RobbinsHouse", 9) && !perYou.isBornMale()) {
						showPopupWindow("Mrs Robbins",
							perGeraldine.addPersonString("robbins1m.jpg", "height:max%", "right") +
							'Mrs. Robbins screams, "Another girl for my lovely son! In you go to my bedroom you bitch and don\'t come out until Davy has cast his pretty spell."' +
							'<br><br>She slams and locks the door to the bedroom');
						setPlaceFlag("RobbinsHouse", 9);
					}
				}
				md.write('<p>She looks at you uncertainly, "You are not <i>with</i> Davy, I could feel it"');

			}	else if (this.isCharmedBy()) {
				// if Tina is Charmed
				md.write('<p>Tina Robbins is anxious to do your bidding. She begins rubbing herself in excitement.</p><p>"Command me, ' + perYou.getMaster() + '! I live to serve and obey you in all things!');
				if (perGeraldine.isCharmedBy("Davy")) {
					if (!checkPlaceFlag("RobbinsHouse", 9) && !perYou.isBornMale()) {
						setPlaceFlag("RobbinsHouse", 9);
						showPopupWindow("Mrs Robbins",
							perGeraldine.addPersonString("robbins1m.jpg", "height:max%", "right") +
							'Mrs. Robbins throws you back into the bedroom. "I told you to get into the bedroom you bitch!  Davy hasn\'t come home to claim you yet and you\'re not leaving till he does!' +
							'<br><br>She slams and locks the door to the bedroom');
					}
				}
			} else {
				// meaning HAVE spoken w/ her but is NOT charmed
				if (perGeraldine.isCharmedBy("Davy")) {
					md.write('<p>Tina Robbins is still sitting on the bed, apparently having accepted her fate. ');
					if (perYou.isBornMale()) md.write(' Now both of you are trapped, waiting for Davy to enslave you.');

					if (!perYou.isBornMale()) {
						if (!checkPlaceFlag("RobbinsHouse", 9)) {
							setPlaceFlag("RobbinsHouse", 9);
							showPopupWindow("Mrs Robbins",
								perGeraldine.addPersonString("robbins1m.jpg", "height:max%", "right") +
								'Mrs. Robbins throws you back into the bedroom. "I told you to get into the bedroom you bitch!  Davy hasn\'t come home to claim you yet and you\'re not leaving till he does!' +
								'<br><br>She slams and locks the door to the bedroom'
							);
						}

					}
				} else {
					if (this.other >= 2) md.write('<p>Tina Robbins is still sitting on the bed, avoiding her mother. She will get over it but for now she is essentially hiding out here. ');
					else md.write('<p>Tina Robbins is still sitting on the bed, apparently having accepted her fate. ');
				}
			}

			// ***************************************************************

			md.write('</p>');
		} 
		// Her bedroom
		else if (Place == 83 && this.isHere()) {
			if (this.checkFlag(5) && !this.checkFlag(6)) md.write('<p>Tina is still recovering in her bed.</p>');
			else if (isDay()) {
				if (this.isVampyre()) md.write('<p>Tina is sleeping in her bed, lightly bound to ensure she remembers when she wakes up that she is yours, and not just a predator.</p>');
				else md.write('<p>Tina waits for you, naked and beautifully lit by the sunlight streaming through the window.</p>');
			} else {
				if (this.isVampyre()) md.write('<p>Tina is waiting for you, drinking some wine, possibly tring to satisfy her thirst for something else.</p>');
				else md.write('<p>Tina is dressed in some lovely white lingerie, ready to strip at a moments notice.</p>');
			}
		}
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Tina Robbins in the Bedroom
			if (Place == 82 && this.isHere()) {
				CastCharmSpell("Tina", 82, 1, 'type=charmtina1');
				return "handled";
			}
		}
		return "";		// do nothing
	};


}
