/****************************************************************
	NURSE MEGAN
 ****************************************************************/

// Initialise

function initialiseNurseMegan()
{
	// Nurse Megan
	addPerson("Nurse Megan", 275, "NurseMegan", '', false);
	
	per.isPersonInfo = function() { return true;	};
	per.getPersonInfo = function() {
		if (!this.isCharmedBy()) {
			return this.addPersonString("megan1b.jpg", "height:max%", "right") +
				(this.checkFlag(2) ? 'Nurse Megan, the dedicated ICU nurse' 
										 : 'The dedicated ICU nurse, you do not know her name');
		} else {
			return this.addPersonString("megan5.jpg", "height:max%", "right") +
				'Slave Megan, the dedicated ICU Nurse and your loyal slave';
		}
	};
	
	per.getPersonNameShort = function() { return this.checkFlag(2) ? this.name : "the nurse"; };
	
	per.getPossessionFace = function() { return "megan-face"; };
	
	per.showEvent = function()
	{
		var md;
			
		if (Place == 269 && this.isHere() && sType === "") {
			md = WritePlaceHeader();
			// Megan at the pool 1
			this.place = 275;		// Gone back to hospital
			var perKhan = findPerson("OfficerKhan");
			if (perKhan.place != 213 && !perKhan.isDead()) perKhan.moveThem(435);
			
			this.showPerson("megan-pool1.jpg");
			addPlaceTitle(md, "Hotel Pool");
			md.write(
				'<p>Following Bambi\'s tip you walk into the pool and you see the two girls she talked about, a lovely pair of women wearing skimpy bikinis..</p>' +
				'<p>You can immediately see they are probably lovers, the way their attention is focused on each other and they way they gently touch each other at times. You hear a smattering of conversation and it is the exchange of intimacies you would hear from any two lovers.</p>' +
				'<p>They start kissing, oblivious to your presence.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'cough to attract their attention', 269, 'type=meganpool2');
			addLinkToPlace(md, "go to the Hotel Bar", 124);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 269 && sType === "meganpool2") {
			md = WritePlaceHeader();
			// Megan at the pool 2
			this.showPerson("megan-pool2.jpg");
			addPlaceTitle(md, "Hotel Pool");
			setPlaceKnown("HospitalICU");		// Know about the ICU
			md.write(
				'<p>One of the girls glances at you, and then resumes kissing her girlfriend. After a little you hear the one in the striped bikini say,</p>' +
				'<p>"I should leave, my shift in the ICU is due to start soon" they kiss and the other girl says "Don\'t let me catch you flirting at the gym again, at least with anyone other than me. Especially that Cheryl, such an athletic little minx, pity about her personality.."</p>' +
				'<p>They step out of the pool and start to towel each other dry in a sensual and intimate if not quite sexual way. After a while, the one who spoke leaves the pool area, and as she passes you she whispers "Enjoyed it?"</p>' +
				'<p>This just increases your desire for this woman, you will have to see if you can visit the ICU at the Glenvale Hospital.</p>'
			);
			startQuestions();
			startQuestions();
			addLinkToPlace(md, "go to the Hotel Bar", 124);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place != 275) return false;
		
		if (sType == "megandisplay") {
			md = WritePlaceHeader(false, 'td-left-large');

			this.showPersonRorX("megan7.jpg");
			addPlaceTitle(md, "Megan Displayed for your Pleasure");
			
			md.write('<p>The young nurse poses on the bed, legs spread.  "I live to serve, ' + perYou.getMaster() + '," she says.  "Please, use me."</p>');

			startQuestions();
			addLinkToPlaceC(md, '"That\'s a good slave," you say.  "Now come over here."', Place, "type=megansex");
			addLinkToPlace(md, "return to the hospital reception", 214);

			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
		
		if (sType == "megansex") {
			md = WritePlaceHeader(false, isExplicit() && perYou.isMaleSex() ? "" : "td-left-large");

			this.showPersonRorX(perYou.isMaleSex() ? "megan9b.jpg" : "megan9g.jpg");

			addPlaceTitle(md, "Megan Caring for You");
			if (perYou.isMaleSex()) md.write('<p>The young nurse pleasures you with her body and her mouth, she is eager to serve, but strangely inexperienced. Afterwards you ask and she explains, "' + perYou.getMaster() + ' I usually take women as my lovers".</p>');
			else {
				md.write('<p>The young nurse pleasures you expertly with her body and her mouth. So expertly you assume she regularly takes women as her lover. When you ask she tells you that she only seldom takes a man as her lover</p>');
				if (isExplicit(true) && whereItem(45) === 0) {
					PlaceI(45, 391);
					md.write('<p>Megan talks a little about her lover and the ways she has love them. She tells you that she had recently bought a toy, and insists that you must have it as a gift, and use it with her at sometime. She briefly steps out and returns with her gift for you.</p>');
				}
			}

			startQuestions();
			addLinkToPlace(md, "return to the hospital reception", 214);
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
		
		if (sType == "charmmegan1") {
			md = WritePlaceHeader();

			this.showPerson("megan2.jpg");
			addPlaceTitle(md, "Megan Falling for It");

			md.write(
				'<p>Your spell fills the nurse\'s mind and she gives you a look that seems a little more friendly than is required of hospital staff.</p>' +
				'<p>Catching the look, you decide she\'s going to be easy to put under, so you might as well have fun with it.</p>' +
				'<p>"Say, what\'s your name, gorgeous?" you ask with a big lecherous leer.</p>' +
				'<p>"Wow, that\'s not a very good pick-up line," she says, laughing at you.  "Maybe you should tell me your name first."</p>' +
				'<p>"Well, my friends call me ' + perYou.getPersonName() + ', and my many lovers call me ' + perYou.getMaster() + '. If you want to be my lover, I could just call you slave, but otherwise..."</p>' +
				'<p>"Megan," she says quickly.  "Are you just full of pick-up lines?"' +
				'<p>"I\'m a regular dispenser," you say, drawing another laugh.  You leer again, and say, "Of all sorts of things."'
			);

			startQuestions();
			addLinkToPlaceC(md, '"Would you like me to show you what kind of things?"', Place, 'type=charmmegan2');
			WritePlaceFooter(md, "Script by Tilde");			
			return true;
		}
		
		if (sType == "charmmegan2") {
			md = WritePlaceHeader();

			this.showPerson("megan3.jpg");
			addPlaceTitle(md, "Megan Falling for It");

			md.write('<p>Pretending to let an exasperated sigh, Megan says, "Sure, I\'ll bite.  What kinds of things do you dispense?');
			if (perYou.isBornMale()) md.write('  I\'ll call security if you say sperm.');
			md.write('"</p><p>You lean forward, ');
			if (!perYou.isBornMale()) md.write(' giving her an enticing view of your cleavage, ');
			md.write(
				'and with a rapacious smile purr, "Pleasure."</p>' +
				'<p>Megan hoots with laughter, though her gaze lingers on your body.  "And how, exactly, do you do that?"</p>' +
				'<p>"Let me see your breasts," you say.</p>' +
				'<p>"I can\'t believe I\'m doing this," she chuckles ruefully as she unbuttons her front and pulls down her bra to give you a good look.  "Now, could you explain-"</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'Interrupt her again', Place, 'type=charmmegan3');
			WritePlaceFooter(md, "Script by Tilde");		
			return true;
		}
		
		if (sType == "charmmegan3") {
			md = WritePlaceHeader();

			this.showPerson("megan4.jpg");
			addPlaceTitle(md, "Megan Falling for You");

			md.write(
				'<p>"Wow, you are so absolutely sexy, Megan.  Do you know I can see in your eyes ' +
				'how badly you want me?" you say, curious how hard you can push the spell and still keep her under your power.</p>' +
				'<p>Embarrassed, she doesn\'t look you in the eye.  The nurse\'s jacket is set aside, forgotten.</p>' +
				'<p>"So tell me, Megan, how did it feel when I called you sexy?"</p>' +
				'<p>She smiles again, in spite of her embarrassment.  "Okay, that was a little pleasurable."</p>' +
				'<p>"How about when I told you to show off and you obeyed?  Or when I told you ' +
				'how you wanted me and you knew it was right?  Did that make you feel pleasure as well?"</p>' +
				'<p>She doesn\'t answer; she just stands there avoiding your gaze.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'Press the advantage', Place, 'type=charmmegan4');
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
	
		if (sType == "charmmegan4") {
			md = WritePlaceHeader();

			this.showPerson("megan5.jpg");
			addPlaceTitle(md, "Megan Falling for You");

			md.write(
				'<p>You step so close that she can feel your breath on her skin when you say, "Sit back, Megan." ' +
				'She sits back, and removes the bra without your even recommending it.  Still, her look is ' +
				'uncertain and you\'re pleased that you\'ve extended the enslavement process this long.  She ' +
				'didn\'t look like she\'d put up any kind of fight at all.</p>' +
				'<p>"You look a little nervous, Megan," you say, still leering.</p>' +
				'<p>"It\'s just, I know you\'re no good for me," she tries to explain.  "You\'ve got lame ' +
				'pick-up lines and you look at me like I\'m some kind of toy."</p>' +
				'<p>"And even with all that, it makes you feel good when I tell you to sit back and ' +
				'you obey," you finish for her.</p>' +
				'<p>"I...yeah.  Pretty much," she admits.  You take off your shirt and she freezes up, ' +
				'a mix of too frightened and too impassioned to move.</p>' +
				'<p>"Well, you\'ve got it all wrong," you say.  "Nothing I said was a lame pick-up ' +
				'line.  They were all dead-to-rights truth."</p>' +
				'<p>"But...you really call your lovers \'slave\' to their faces?"</p>' +
				'<p>"Oh yes," you say.  "They love it."  You put a hand on your nipple and she watches, ' +
				'entranced, as you poke at it, wiggle it, pinch it.  "You were also wrong about me being no good for you."</p>' +
				'<p>"Oh," she says, her attention too consumed to even question you.</p>' +
				'<p>Suddenly you lean close, your lips a hair\'s breadth from hers.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, '"And why do I look at you like a toy?"', Place, 'type=charmmegan5');
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
		
		if (sType == "charmmegan5") {
			md = WritePlaceHeader();

			this.showPerson("megan6.jpg");
			addPlaceTitle(md, "Megan Fallen Under");

			md.write(
				'<p>She can\'t help herself; she leans forward and kisses you.  Her hands work up and down your body and your remaining clothes are quickly discarded.</p>' +
				'"' + perYou.getMaster() + '," she cries. "Oh, ' + perYou.getMaster() + ', ' + perYou.getMaster() + '."  She sits back and grins at you.  "You look at me that way because I am a toy.  But I\'m your toy, and that makes all the difference in the world."</p>' +
				'"That\'s a good slave," you say.  "Now come over here."</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'finish and return to the hospital reception', 214);
			WritePlaceFooter(md, "Script by Tilde");
			return true;
		}
		return false;
	};
	
	// Items
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			
			if (Place == 269 && this.isHere()) {
				addComments("You do not either of their names, so the spell will not work.");
				return "handled";
			}
			
			if (Place == 275 && this.isHere()) {
				if (!isSpellKnown("Shielded Charm")) {
					// Don't know Shielded Charm Yet
					addComments('Don\'t cast the spell here. It is too public.');
				} else if (!this.checkFlag(2)) addComments("You do not the nurses name, so the spell will not work.");
				else CastCharmSpell("NurseMegan", Place, 1, 'type=charmmegan1'); //Charm the Nurse
				return "handled";
			}
		}
		return '';
	};
}
