/**********************************************
Attourney Tamara Averina
Town Hall City Attorney
/***********************************************/

function initialiseTammy()
{
	addPerson("Tammy", 0, "Tammy");
	
	per.getYourNameFor = function() {
		var clv = this.getCharmedLevel();
		if (clv == 0) return perYou.getPersonName();
		if (clv == 2) return "Lover";
		return perYou.getMaster();
	};
	
	per.getPersonName = function(full) {
		return this.getCharmedLevel() == 2 ? "Tammy" : "Tamara";
	};
	
	per.whereNow = function()
	{
		if (getDay(true) == "Fri" && isShopOpen(0)) return isPlaceKnown("TammyOffice") ? 101 : (getHour() > 11 ? 999 : 0);
		return 0;
	};
	
	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		var clv = this.getCharmedLevel();
		if (clv == 0) {
			// Uncharmed
			return this.addPersonString("meeting.jpg", "height:max%", "right") +
				"Tamara, or Tammy as Emily calls her, is the attorney retained by the city to consult for legal matters. Attractive but somewhat strict with little interest outside of work.";
		} else {
			// Charmed
			return this.addPersonString("office-charm3.jpg", "height:max%", "right") +
				"Your slave " + this.getPersonName() + " is the city attorney, happy to consult with you on matters of sex and submission.";
		}
	};
	
	per.showEventPopup = function()
	{
		if (Place == 101) {

			if (sType === "meettammy")	{
				// Tamara/Tammy is here and Emily introduces you
				setPlaceKnown("TammyOffice");
				showPopupWindow("The City Attorney",
					this.addPersonString("meeting.jpg", "height:max%", "right") +
					'Emily leads you to an office, currently there is no sign indicating who the office belongs to. Emily comments that Angela will arrange a name plate shortly. She knocks on the door and leads you in without waiting for a reply.</p>' +
					'<p>You see an attractive blonde woman dressed in red who stands as you enter, she looks at you a little coldly. Before she says anything Emily says,</p>' +
					'<p>"Tammy, this is ' + perYou.getPersonName() + ' ' + perYou.getHeShe() + ' is in charge of quite a lot around here and I thought you should meet!"</p>' +
					'<p>The woman looks a little annoyed at Emily, and tells you, "My name is Tamara Averina, but Emily insists on calling me Tammy. Is there anything I can do for you?"</p>' +
					'<p>You give a non-committal greeting while thinking about the many things she will be doing for you! Tamara is almost dismissive explaining she has work to do and sits at her desk, clearly expecting you to leave.'
				);
				return true;
			}
		}
		return false;
	};
	
	per.showEvent = function()
	{
		var md, clv, nm;
		
		if (Place != 101) return false;
	
		clv = this.getCharmedLevel();
		nm = this.getPersonName();
		var perEmily = findPerson("Emily");
		
		if (sType == "charmtammy1") {
			// Charm Tammy 1
			perEmily.setFlag(5);		// Suppress
			md = WritePlaceHeader();
			this.showPerson("office-charm1.jpg");
			addPlaceTitle(md, "Tamara Under a Charm Spell");

			md.write(
				'<p>You quietly say “Dai Chu Tamara and even after many uses of this spell you are surprised at the receptiveness of Tamara\'s mind you feel your power quickly taking hold and decide to push on quickly.</p>' +
				'<p>“It is rather hot in this office isn\'t it.” You say to her and call for Emily, who must of been watching as she instantly enters the office and starts to remove her clothing saying to you,</p>' +
				'<p>"This is really hot, let me observe for a while and see how hot it gets"</p>' +
				'<p>Tamara seems distracted and only glances at Emily and does not seem to notice her lack of clothes and her not so subtle innuendo. She tells you hesitantly,</p>' +
				'<p>"I should get back to work..." and you firmly tell her...</p>'
			);
				
			startQuestions();
			if (perYou.checkFlag(26)) addLinkToPlaceC(md, '“All work makes for a dull life <b>Tammy</b> let\'s have some fun”', Place, 'type=charmtammy2slut');
			addLinkToPlaceC(md, '“Everyone has their duties, and the Mayor has assigned you to me”', Place, 'type=charmtammy2');
			AddPeopleColumn(md);
			perEmily.showPerson("watching.jpg");
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmtammy2" || sType == "charmtammy2slut") {
			// Charm Tammy 2
			if (sType == "charmtammy2slut") {
				this.charmThem(2);
				clv = 2;
				nm = this.getPersonName();
			}
			md = WritePlaceHeader();
			this.showPerson("office-charm2.jpg");
			addPlaceTitle(md, nm + " Under a Charm Spell");
			if (clv == 4) {
				// Slave
				md.write(
					'<p>“Duties? I have the work I have been hired for..." She trails away, distracted by the effects of the spell. You explain to her, reinforcing the spell and shaping the effects of the spell on her,</p>' +
					'<p>"The Mayor has asked to to closely supervise you, and that you must obey me in all things and strictly submit to whatever I ask". She hesitates, "Submit...I mean.." and Emily moans from nearby and says "Yes, we must submit, it is so very, very hot"</p>' +
					'<p>Tamara says, "I can follow instructions and obey my superiors...and I am feeling so very hot"</p>'
				);
			} else {
				// Slutty GF
				md.write(
					'<p>“Dull, but I am here to work...my name is not..." and Emily laughs nearby "You are so Tammy a cute, hot blonde!" and you reinforce this,</p>' +
					'<p>“Everyone needs some fun and you can always catch up with work another time. It is so much better being fun and carefree Tammy my happy friend and lover!"</p>' +
					'<p>“I barely know you...but I have so little fun..."</p>'
				);				
			}
			startQuestions();
			addLinkToPlaceC(md, clv == 2 ? '"Let\'s have some fun Tammy!"' : '"A test of your obedience, strip for me"', Place, 'type=charmtammy3');
			AddPeopleColumn(md);
			perEmily.showPerson("watching.jpg");
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmtammy3") {
			// Charm Tammy 3
			md = WritePlaceHeader();
			if (clv == 4) {
				// Slave
				this.showPerson("office-charm3.jpg");
				addPlaceTitle(md, nm + " Under a Charm Spell");				
				md.write(
					'<p>“Strip, that is not part of my duties..." and you immediately emphasise that <b>everything</b> is part of her duties and how she must be completely loyal, obedient and submissive,</p>' +
					'<p>She starts to strip and as she does she comments "Like I am a slave to my work" and you agree "A slave, my slave, who will obey any order to do anything"</p>' +
					'<p>In short order she is standing before you completely naked and no look of reluctance in her face, a slave for you to use in any way you wish. You see her look at Emily and back at you and Emily smiles back and you tell her,</p>' +
					'<p>"Emily is completely under my orders as well, a fellow slave, but she is not in charge of you, <b>I am</b>" and with that Tamara replies "Yes ' + perYou.getMaster() + '"</p>'
				);
			} else {
				// Slutty GF
				this.showPerson("emilythreesomea.jpg");
				addPlaceTitle(md, nm + " Under a Charm Spell with Emily assisting");
				md.write(
					'<p>Tamara, now Tammy starts to remove her clothes and she asks, "So what does that make us...and her" as she looks at Emily as she also starts removing her clothing. You reply,</p>' +
					'<p>"You are my fun, sexy lover, and Emily there is someone we invite in for some fun now and then". With that Tammy smiles and walks over and embraces Emily but you see a hint more of rivalry than passion. After a little the two naked women are lying on the floor, Tammy definitely on top and Emily not really caring one way or the other.</p>' +
					'<p>You join them for a fun time, Tammy making sure you pay more attention to her but Emily also make sure to get some of your attention and some of Tammy\'s as well!</p>'
				);				
			}
			startQuestions();
			addLinkToPlaceC(md, 'talk more to ' + nm, Place);
			addLinkToPlace(md, 'return to reception', 95);
			if (clv == 4) {
				AddPeopleColumn(md);
				perEmily.showPerson("watching.jpg");
			}
			WritePlaceFooter(md);
			return true;
		}	
		
		if (sType == "tammyfuck") {
			// Fuck her
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("office-sex-fuckb", isExplicit() ? 4 : 1);
			else this.showPerson("office-sex-fuckga.jpg");
			
			addPlaceTitle(md, "Fucking " + nm);

			if (perYou.isMaleSex()) {
				md.write(
					'<p>“Yes ' + this.getYourNameFor() + '!” ' + nm + ' says with glee</p>' +
					'<p>She immediately takes her panties off and lays down on the floor for you. You take her from behind and pound away until you are done.</p>'
				);
			} else {
				md.write(
					'<p>“Yes ' + this.getYourNameFor() + '!” '  + nm + ' says  with glee</p>' +
					'<p>She immediately takes her panties off and lays down on the floor for you. You take her there until you both orgasm loudly.</p>'
				);
			}
			
			// Questions
			startQuestions();
			addLinkToPlaceC(md, 'talk more to ' + nm, Place);
			addLinkToPlace(md, 'leave the office', 95);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "tammytitfuck") {
			// Fuck her
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRandomRorX("office-sex-tfb", isExplicit() ? 2 : 1);
			else this.showPerson("office-sex-tfga.jpg");

			addPlaceTitle(md, nm + "\s Tits");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>“Yes ' + this.getYourNameFor() + '!” ' + nm + ' says with glee</p>' +
					'<p>She immediately takes her panties off and lays down on the floor for you. You take her from behind and pound away until you are done.</p>'
				);
			} else {
				md.write(
					'<p>“Yes ' + this.getYourNameFor() + '!” ' + nm + ' says with glee</p>' +
					'<p>She immediately takes her panties off and lays down on the floor for you. You take her there until you both orgasm loudly.</p>'
				);
			}
			
			// Questions
			startQuestions();
			addLinkToPlaceC(md, '“I have more for you”', Place);
			addLinkToPlace(md, 'leave the office', 95);
			WritePlaceFooter(md);
			return true;
		} 		
		
		if (sType == "tammybj") {
			// Blowjob/Lick
			md = WritePlaceHeader();
			this.showPersonRandomRorX("office-sex-bj" + (perYou.isMaleSex() ? "b" : "g"), isExplicit() ? (perYou.isMaleSex() ? 4 : 2) : 1);
			addPlaceTitle(md, nm + "\s Oral");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>“Yes, of course ' + this.getYourNameFor() + '!”</p>' +					
					'<p>' + nm + ' kneels down on the floor and begins sucking your cock with great care and attention.</p>'
				);
			} else {
				md.write(
					'<p>“Yes, of course ' + this.getYourNameFor() + '!”</p>' +
					'<p>' + nm + ' kneels down on the floor and pulls down your pants and panties, and begins licking your pussy with great care and attention.</p>'
				);
			}

			// Questions
			startQuestions();
			addLinkToPlaceC(md, 'talk more to ' + nm, Place);
			addLinkToPlace(md, 'leave the office', 95);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "tammythreesome") {
			// Threesome with Emily
			md = WritePlaceHeader();
			this.showPersonRandom("emilythreesome", 2);
			addPlaceTitle(md, "Having Fun with Tammy and Emily");

			md.write(
				'<p>You call Emily to join you and Tammy and she enthusiastically strips off her clothes and those of Tammy. They pose waiting for your to join in te fun!</p>'			
			);

			// Questions
			startQuestions();
			addLinkToPlaceC(md, 'talk more to ' + nm, Place);
			addLinkToPlace(md, 'leave the office', 95);
			WritePlaceFooter(md);
			return true;
		}		
					
		if (sType == "recharm1") {
			// Re-charm Tammy
			clv = this.getCharmedLevel();
			if (clv != 4) this.charmThem(4);
			else this.charmThem(2);
			this.setFlag(2, false);
			this.setFlag(3, false);
			md = WritePlaceHeader();
			this.showPerson("recharm1.jpg");
			addPlaceTitle(md, nm + " Under A Charm Spell - Again");
			md.write(
				'<p>Once again you cast the spell on ' + nm + '. Immediately she falls under the influence of the spell, her face looking like she is entering into a trance almost, an unusual effect for the spell!</p>' +
				'<p>You tell ' + nm + ' calmly to keep in the feel of a trance...</p>'
			);

			startQuestionsOnly();
			if (clv != 4) addLinkToPlace(md, '“Everyone has their duties, and the Mayor has assigned you to me”', Place, 'type=recharm2');
			if (clv != 2) addLinkToPlace(md, '“All work makes for a dull life <b>Tammy</b> let\'s have some fun”', Place, 'type=recharm2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "recharm2") {
			// Re-charm Tammy 2
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			if (clv == 4) {
				// Slave
				this.showPerson("recharm2.jpg");				
				addPlaceTitle(md, nm + " Under a Charm Spell - Again");				
				md.write(
					'<p>“Strip, that is not part of my duties..." and you immediately emphasise that <b>everything</b> is part of her duties and how she must be completely loyal, obedient and submissive,</p>' +
					'<p>She starts to strip and as she does she comments "Like I am a slave to my work" and you agree "A slave, my slave, who will obey any order to do anything"</p>' +
					'<p>In short order she is standing before you completely naked and no look of reluctance in her face, a slave for you to use in any way you wish. You see her look at Emily and back at you and Emily smiles back and you tell her,</p>' +
					'<p>"Emily is completely under my orders as well, a fellow slave, but she is not in charge of you, <b>I am</b>" and with that Tamara replies "Yes ' + perYou.getMaster() + '"</p>'
				);
			} else {
				// Slutty GF
				perEmily.setFlag(5, false);
				this.showPerson("recharm2.jpg");
				addPlaceTitle(md, nm + " Under a Charm Spell Again, with Emily assisting");
				md.write(
					'<p>Tamara, now Tammy starts to remove her clothes and she asks, "So what does that make us...and her" as she looks at Emily as she also starts removing her clothing. You reply,</p>' +
					'<p>"You are my fun, sexy lover, and Emily there is someone we invite in for some fun now and then". With that Tammy smiles and walks over and embraces Emily but you see a hint more of rivalry than passion. After a little the two naked women are lying on the floor, Tammy definitely on top and Emily not really caring one way or the other.</p>' +
					'<p>You join them for a fun time, Tammy making sure you pay more attention to her but Emily also make sure to get some of your attention and some of Tammy\'s as well!</p>'
				);				
			}
			startQuestionsOnly();
			addLinkToPlaceC(md, "talk more to her", Place);
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 101 && this.isHere() && this.isCharmedBy() && sType === "") {
			var clv = this.getCharmedLevel();
			if (perYou.isMaleSex()) {
				addLinkToPlaceC(md, '“Let\'s Fuck”', Place, 'type=tammyfuck');
				addLinkToPlaceC(md, '"Suck my Cock"', Place, 'type=tammybj');
				addLinkToPlaceC(md, '“Let me fuck your tits”', Place, 'type=tammytitfuck');
			} else {
				addLinkToPlaceC(md, '"Lick me"', Place, 'type=tammybj');
				addLinkToPlaceC(md, '“Let\'s Fuck”', Place, 'type=tammyfuck');
				addLinkToPlaceC(md, '“Let me play with your tits”', Place, 'type=tammytitfuck');
			}
			if (clv == 2) addLinkToPlace(md, 'ask Emily in to have some fun with Tammy', Place, 'type=tammythreesome');
			else if (clv == 4 && !this.checkFlag(3)) {
				addQuestionR(md, 'ask Emily in to have some fun with Tammy',
					'As you call for Emily you see Tamara look at you steadily "I obey you in your orders, but Emily is not in charge of me" You may be able to push the point but decide that it may be better if she were more <b>fun loving</b>!',
					'',
					"setPersonFlag(\\'Tammy\\',3)"
				);	
			}
			if (clv == 2 && !this.checkFlag(2)) {
				addQuestionR(md, 'talk to Tammy about dancing in the club',
					'Tamara looks at you "I am up for a lot of fun things but I do not like dancing, how about something else fun?" You may be able to push the point but decide that it may be better if she were more <b>obedient</b>!',
					'',
					"setPersonFlag(\\'Tammy\\',2)"
				);				
			} else {
				this.addDancingLink(md, 'talk to slave Tamara about dancing in the club',
					'You tell Tamara about the Avernus club and being an obedient slave and dancing there for you,</p><p>&quot;Yes ' + perYou.getMaster() + ', I am no dancer but whatever you ask!&quot; and with that you call Jade to arrange a dance for Tamara.'
				);
			}
		}
	};
	
	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{	
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Tammy's Office
			if (Place == 101 && this.isHere())  {
				CastCharmSpell("Tammy", Place, 4, 'type=charmtammy1', '', 'type=recharm1');
				return "handled";
			}			
		}
		return "";		// do nothing
	};
	
	// Phone calls
	
	per.addPersonPhoneCall = function() {
		// Only if she is charmed
		if (!this.isCharmedBy()) return false;
		
		if (getDay(true) == "Fri" && isMorning() && !this.checkFlag(1)) {
			if (makeCall(true, 334)) this.setFlag(1);
		}	
		return false;
	};

	per.getPersonSMS = function(id) {
		switch(id) {
			// Technically from Emily
			case 333: return receiveSMS('Emily', 'Just snapped this pic of Tammy', 'sms1.jpg');
			// From her, friday morning after she was charmed as a reminder
			case 334: return receiveSMS(this.getPersonName(), 'I hope to see you ' + this.getYourNameFor() + ' in the office later?', 'sms2.jpg');
		}
		return '';
	};
}
