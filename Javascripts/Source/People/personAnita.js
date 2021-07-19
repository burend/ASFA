/**********************************************
Anita
***********************************************/
function LeaveLair()
{
	// Anita flees town
	movePerson("Anita", 9999);
}
function MoveAnitaToBedroom()
{
	findPerson("Anita");
	if (per.place != 46) per.place = per.checkFlag(9) ? 46 : 45;
}
function MoveAnitaToCellar()
{
	movePerson("Davy", 999);
	movePerson("Bambi", 124);		// Just in case she had headed off to the punish event
}

function initialiseAnita()
{
	// Anita
	addPerson("Anita", 0, "Anita");
	
	per.getYourNameFor = function() { return perYou.getSir(); };
	per.getPersonName = function(full) {
		if (full === true) return this.name;
		return this.getCharmedLevel() == 3 ?  "Your slut" : (this.sCharmedBy == "You" ? "Slave " + this.name : this.name);
	};

	per.whereNow = function() {
		if (Place == 142) return Place;
		// When Bambi is guarding, she is in the Cellar in the daytimes, 6am to 9pm, 1hr overlap with Bambi
		var p = per;
		if (this.place == 161 && !isShopOpen(3, 2, true) && checkPersonFlag("Bambi", 7)) {
			per = p;
			return 46;		// Bambi is on night guard duty
		}
		per = p;
		return this.place;
	};
	
	per.passTimeDay = function() {
		if (this.place == 1000 && !this.checkFlag(10)) {
			this.setFlag(11);
			this.place = 195;		// Return to the general store
		}
		return '';
	};

	// Popup evets for Anita
	per.showEventPopup = function()
	{
		if (sType !== "") return false;
		if (Place == 46 && this.place === 46 && this.checkFlag(8) && !this.checkFlag(6)) {
			// Anita is in your bedroom after killing Davu (murder path only), end of event she will stay here
			this.setFlag(6);
			showPopupWindow("Anita is here?",
				this.addPersonString("anita9b.jpg", "height:max%", "right") +
				'<p>"' + this.getYourNameFor() + ', I did as you ordered, I removed the traitor Davy and took him into the deep woods and killed him. He is now in a shallow grave where he will never be fpund."</p>' +
				'<p>As I ordered, I told her to take care of Davy...this violent woman must have took that in the way of such people and thought I meant to eliminate the threat, and the person! Another body now in your quest for the magic of the Book!</p>' +
				'<p>Well, you do not know what to do here, Anita is looking at you confused, so you think it best to calm her down. You congratulate her on completing her mission and otherwise tell her to remain here so you can monitor her better, and prevent any similar misunderstandings. Also she looks darned cute in that lingerie.'
			);
			return true;
		}
		return false;
	};
	
		// Events for Anita
	per.showEvent = function()
	{
		var md, hs, myName;
		
		if (Place == 161) {
			if (sType == "anitaguardfuck") {
				// Sex while guarding
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPerson("anitaguard-fucka.jpg");
				addPlaceTitle(md, "Anita\'s Attendance");
				md.write(
					'<p>“Anita come and attend me!” and Anita presents herself for inspection, but you are interested in something more hands-on and tell her that in no uncertain terms.</p>' +
					'<p>"Yes ' + this.getYourNameFor() + '!" and she removes some of her clothing and presents herself for a more intimate inspection! You thoroughly inspect her, to your mutual pleasure!</p>'
				);
				startQuestions();
				addLinkToPlace(md, "allow her to resume her duty", Place);
				WritePlaceFooter(md);
				return true;				
			}
			return false;
		}
		
		if (Place == 40) {
			// Shower scenes
			if (sType == "showeranita") {
				md = WritePlaceHeader();
				this.showPerson("anita-shower1.jpg");
				addPlaceTitle(md, "Shower Interrupted By Anita");
				md.write(
					'<p>“' + this.getYourNameFor() + '!” Anita enters the room with a towel slung around herself and salutes you. “I will...” she hesitates a moment, her eyes hungrily moving over your naked body. “I will stand guard, make sure you are not disturbed.”</p>' +
					'<p>There is an awkward moment of silence, Anita pulls in her lower lip briefly, then adds. “The towel is... just to avoid suspicion... ' + this.getYourNameFor() + '!” Another pause follows, and she looks about ready to pounce on you, but restrains herself.</p>' +
					'<p>“I will turn around now.”</p>'
				);
				startQuestions();
				addLinkToPlace(md, "allow her to carry on", Place, 'type=showeranitacarryon');
				addLinkToPlace(md, "reassign her into the shower", Place, 'type=showeranitareassign');
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showeranitacarryon") {
				md = WritePlaceHeader();
				this.showPerson("anita-shower2.jpg");
				addPlaceTitle(md, "Showering Guarded");
				md.write(
					'<p>Anita salutes you, turns around, albeit very reluctantly, and dutifully keeps her eyes on the entrance to the bathroom, well, most of the time at least. She is casting furtive glances at you through the mirror, “accidentally” drops the towel halfway through and had clearly hoped you would order her to do more than just stand guard, but, considering the usual effect of the spell, she remains remarkably restrained and allows you to have a shower in peace without being disturbed for once.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'get out of the shower and dressed', 40);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showeranitareassign") {
				md = WritePlaceHeader();
				this.showPerson("anita-shower3.jpg");
				addPlaceTitle(md, "Showering with Anita");
				md.write(
					'<p>“Yes ' + this.getYourNameFor() + '!” The towel flies off into the bathroom and Anita is standing next to you in record time, back straight, hands behind her back.</p>' +
					'<p>“What kind of task do you wish me to perform? Oral pleasure? Vaginal penetration? Anal stimulation?”</p>' +
					'<p>Anita is always straight to the point when it comes to sex, and as much as she enjoys it, she doesn\'t exactly see foreplay or her own pleasure as essential, but maybe that can be changed over time.</p>' +
					'<p>She is confused as you order her to sit down take the shower head and start masturbating, even more when you tell her to put on a show and make it sexy, something she rarely does.</p>' +
					'<p>Her first attempts are awkward, as expected. Anita is trying to strike sexy poses and finger herself, but she is far too stiff and even with her arousal increased obviously only follows your orders, so you try a different approach.</p>' +
					'<p>You take on a harsher, more commanding tone and order her to spread her legs and show her pussy, which she does without hesitation. You then proceed to order her to “fingerfuck her cunt” in front of you, even belittling her when she fails to immediately begin and setting a clear rhythm for her:</p>' +
					'<p>In, Out! In Out! One, Two! One Two! You do your best to channel your inner drill instructor and order her to go faster, even insult her at several points, which only seems to arouse her even more and pushes her further and further.</p>' +
					'<p>It was a bit of a gamble, but the harsher tone and strong language really do get her off, and you are probably lucky the shower drowns out most of her moans as she nears her climax.</p>' +
					'<p>“' + this.getYourNameFor() + ', permission to ahh, permission to cum, ' + this.getYourNameFor() + '! Please!” She doesn\'t slow down in her motions and it\'s doubtful she will without a clear order, so you give her a stern nod, top it off by calling her a “Fucking Slut” and enjoy the sight as she winds herself on the shower floor, twitching and moaning lewdly under what must have been an intense climax.</p>' +
					'<p>You are not sure you could get away insulting her like this when she is not horny, but you have to admit it was fun to see her cut loose like this, and it did give you a little more insight into what turns her on.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'finish the shower together and get dressed', 40);
				WritePlaceFooter(md);
				return true;			
			}			
			return false;
		}
	
		if (Place == 269) {
			if (sType == "anitapool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("anita-pool.jpg");
				addPlaceTitle(md, "Swimming with Anita");
				md.write(
					'<p>Anita arrives, oddly she is dressed partly in a wet-suit, not a swimsuit. She apologises, "Sorry ' + this.getYourNameFor() + ', I do not have anything for recreation, but I do have this for water operations." and she salutes.</p>' +
					'<p>Odd, but that\'s Anita, and you cannot do much about that, so you order her to go swimming with you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here, order her to do more', Place, 'type=anitapoolsex');
				addLinkToPlaceC(md, 'say goodbye to Anita', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "anitapoolsex") {
				md = WritePlaceHeader();
				this.showPerson("anita-pool-sex.jpg");
				addPlaceTitle(md, "Private with Anita");
				md.write(
					'<p>You order Anita to do a more personal operation, and she seductively removes most of her wet-suit and lies back waiting for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Anita', Place);
				WritePlaceFooter(md);
				return true;
			}
			return false;
		}
		
		if (Place == 195) {

			if (sType == "charmanitastore1") {
				// Anita Charmed 1
				myName = this.getYourNameFor();
				md = WritePlaceHeader();
				removeTimedEvent("movePerson('Anita',1000)");
				this.place = 9999;	// Gone (if you do not follow through)
				this.showPerson("anita10b.jpg");
				addPlaceTitle(md, "Shopper Under A Charm Spell");

				md.write(
					'<p>You are a little argry at the way this woman insulted you, and you recite the spell, and tell her,</p>' +
					'<p>"The only slut I see here is you!"</p>' +
					'<p>She looks at you angrily, "Fuck off...' + myName + '...I mean you ' + (perYou.isMaleSex() ? 'bastard' : 'bitch') + '...you are not my commander..."</p>' +
					'<p>She hesitates as the spell takes affect, but it would seem she is a member of the military, but something there seems wrong from how she was acting before, and you suspect she is more member of some sort of para-military group or militia. She starts to reach into her handbag as you firmly tell her,</p>' +
					'<p>"Shut up! I will call you a slut, a bitch or whatever I choose, you are mine to command and do not forget it!"</p>' +
					'<p>She starts to take something from her handbag, you are sure it was a pistol of some sort, but she drops it and turns to face you. Her expression a mixture of anger and lust,</p>' +
					'<p>"' + myName + '...sorry...what, I am not that, I am a <b>patriot</b> and I follow my orders, and you are not my commander!"</p>' +
					'<p>You could hear the way she said <b>patriot</b> that is was key to her identity and was almost shouted. You think you should take it easier on trying to dominate her until the spell has influenced her more. You ask her,</p>' +
					'<p>"Yes, you are a loyal patriot, but why then are you wearing <i>that</i> dress?"</p>' +
					'<p>She hesitates and runs her hands over her dress, pulling at the hem of her short and tight dress. You see then why when wearing such a dress you did not see the lines of underwear, she is not wearing any. Her pussy is bare and clean shaven. She shivers, your think more a small orgasm than the cold of exposing herself. As she does the straps of her dress slip. She looks at you confused,</p>' +
					'<p>"' + myName + '...' + (perYou.isMaleSex() ? 'bastard' : 'bitch') + '...I am in public, umm undercover, and have to wear normal clothing, and this is all I had available. I need provisions for the rest of my journey..."</p>' +
					'<p>That is enough, you have given her enough time, but do you want go hard or soft?</p>'
				);

				// Questions
				startQuestions();
				addLinkToPlaceC(md, '"Look at yourself slut!"', Place, 'type=charmanitastore2&hard=true');
				if (perYou.checkFlag(26)) addLinkToPlaceC(md, '"Well done fellow patriot"', Place, 'type=charmanitastore2&hard=false');
				addLinkToPlace(md, 'return to the front of the ' + getShopStore(), 195, '', 'You leave her thinking to come back to her later, but a moment later you see her run past you looking very confused. You try to chase after her but she is too fast. You doubt you will ever find her again!');
				WritePlaceFooter(md);
				return true;

			} 
			
			if (sType == "charmanitastore2") {
				// Anita Charmed 2
				myName = this.getYourNameFor();
				hs = getQueryParam("hard");
				md = WritePlaceHeader();
				this.showPerson("anita10c.jpg");
				if (hs == "true") {
					this.charmThem(3);
					addPlaceTitle(md, "Dominating a Slut");

					md.write(
						'<p>You can feel her intense arousal and forcibly tell her,</p>' +
						'<p>"You are not wearing any underwear and you are exposing yourself to me. You are a slut who wants nothing more than sex."</p>' +
						'<p>Despite her arousal she starts to deny your words, but makes no effort to cover herself. You ignore her words. You step towards her and with a light touch pull on the dislodged straps of her dress and it falls down to her waist.</p>' +
						'<p>"Embrace being a slut, there is nothing wrong with it. Sex is fun and you really enjoy it, don\'t you?"</p>' +
						'<p>She slumps to the ground and replies in confusion,</p>' +
						'<p>"Well, of course I love fucking...but I am a..."</p>' +
						'<p>You quickly interrupt her, it is clear she is about to say <b>patriot</b>,</p>' +
						'<p>"slut! OF course you are, it is your only wish and desire, to be someone\'s sex-toy and plaything, with no concern other than sex!"</p>' +
						'<p>She starts to mutter something about her mission, and you tell her,</p>' +
						'<p>"Like any slut your mission is to have as much sex as you can."</p>' +
						'<p>The spell has not completely controlled her, yet, and you can see some sense of her duty still trying to surface. You make a last push,</p>'
					);
					// Questions
					startQuestions();
					addLinkToPlaceC(md, '"Enough talk, let\'s fuck"', Place, 'type=charmanitastore3&hard=' + hs);

				} else {
					addPlaceTitle(md, "A Patriot Under <i>Your</i> Command");

					md.write(
						'<p>She looks confused at your words, and you continue to reinforce,</p>' +
						'<p>"You resisted my intimidation well patriot, I was sent here to test your resolve and loyalty"</p>' +
						'<p>Suddenly she looks immensely relieved and she slumps to the floor,</p>' +
						'<p>"I have done well ' + myName + ', thank you, thank you, I am...was feeling so arous...angry."</p>' +
						'<p>She stretches her arms up in her relief and her dress starts to slip down, the straps had already fallen away from her shoulders. She does not seem to care in the mizture of her relief and the arousal coursing though her from the spell. You decide to exert your authority more,</p>' +
						'<p>"Well patriot...what is your given name?", she looks up at you, "Anita ' + myName + ' as you know, another test?.", and you continue, "I have been been told to assign you to a new duty. Your previous task has been compromised, so you are now assigned to my command!"</p>' +
						'<p>She sits up smiling, her dress falls almost completely down, and she asks</p>' +
						'<p>"What will my duties be ' + myName + ', is there anything you need \'handled\' now?"</p>'
					);

					// Questions
					startQuestions();
					addLinkToPlaceC(md, '"Yes, there is..."', Place, 'type=charmanitastore3&hard=' + hs);

				}
				addLinkToPlace(md, 'return to the front of the ' + getShopStore(), 195);
				WritePlaceFooter(md);
				return true;

			}
			
			if (sType == "charmanitastore3") {
				// Anita Charmed 3
				myName = this.getYourNameFor();
				hs = getQueryParam("hard");
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPerson("anita10db.jpg");
				else this.showPerson("anita10dg.jpg");
				var subo;
				if (hs == "true") {
					subo = "slut";
					addPlaceTitle(md, "A Sluts\' Mission");
					md.write('<p>For a moment you are unsure what she is going to do, but she smiles as she drops to her knees ');
				} else {
					subo = "subordinate";
					addPlaceTitle(md, "Anita\'s New Duty");
					md.write('<p>Anita eagerly moves to do her new duty as she drops to her knees ');
				}

				if (perYou.isMaleSex()) {
					// Blowjob/Fuck
					md.write(
						'and undoes your trousers and takes your stiff cock into her mouth. She proceeds to give you a skilled blowjob until you explode in her mouth. She swallows and then asks,</p>' +
						'<p>"Would ' + myName + ' now like my ass or pussy?"</p>' +
						'<p>You of course reply "Both!"</p>' +
						'<p>You sate yourself on your new ' + subo + 's body, and she also experiences considerable pleasure, both from the effects of the spell and also as she seems to very, very much like sex!</p>'
					);
				} else {
					// Cunnilingus
					md.write(
						'and undoes your pants and with a little hesitation licks your pussy. She is probably not experienced with a woman but still she makes you come quickly to a shuddering climax. She then asks,</p>' +
						'<p>"Would ' + myName + ' now like my ass or pussy or shall I do that again?"</p>' +
						'<p>You of course reply "All of them!"</p>' +
						'<p>You sate yourself on your new ' + subo + 's body, and she also experiences considerable pleasure, despite, or maybe because of her lack of experience with women.</p>'
					);
				}
				if (hs == "true") {
					this.moveThem(45);
					md.write(
						'<p>After, you tell her,</p>' +
						'<p>"You are a true slut. Why don\'t you go back to my home and wait for me in my bedroom, make sure to put something sexy on."</p>' +
						'<p>You tell her your address and remind her to dress before leaving. She looks at you, and you realise the spell has fully taken control of her, she is now your personal slut.</p>'
					);
				} else {
					if (whereItem(47) == 252) moveItem(47, 195);
					else if (whereItem(47) === 0) PlaceI(47, 195);
					setPlaceKnown("AnitasLair");
					this.moveThem(252);
					md.write(
						'<p>After, you ask Anita where she is currently staying, and she mentions she has found an abandoned storeroom at the school near the French classroom and she is bunking down there now. You tell her to return there and you will meet her there later to discuss her duties.</p>' +
						'<p>She smiles, "Like my last \'duty\'?", and you gravely nod your head, "And more".</p>' +
						'<p>Anita quickly redresses, not that she has much to put on, and she leaves the ' + getShopStore() + ' with her groceries.</p>' +
						'<p>As you follow her out, you notice there are some new items for sale in the ' + getShopStore() + ', a range of sporting goods, it looks like Leanne is expanding the range of items for sale.</p>'
					);
				}

				// Questions
				startQuestions();
				addLinkToPlace(md, 'return to the front of the ' + getShopStore(), 195);
				WritePlaceFooter(md);
				return true;			
			}
			return false;
		}
		
		if (Place == 252 && this.isHere()) {
			if (sType == "deploy") {
				// Move her to your bedroom
				md = WritePlaceHeaderNI();
				this.showPerson("anita6.jpg");
				addPlaceTitle(md, "Anita\'s Deployment");

				this.moveThem(45);
				md.write(
					'<p>You tell Anita that you have new orders for her, and she stands to attention. You walk around, inspecting her assets, and tell her,</p>' +
					'<p>"Soldier, I need you to redeploy as a guard for myself. Go to my home and wait for me in my bedroom, make sure to wear something appropriate. You will be undercover as my girlfriend, so wear something sexy."</p>' +
					'<p>You tell her your address and remind her to dress before leaving. She looks at you, and replies "Yes ' + this.getYourNameFor() + '!"</p>' +
					'<p>She quickly gathers some gear and dresses and leaves you with a salute.</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'return to Ms Jones\' office', 145);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "freed") {
				// Freed via Silver Ring
				md = WritePlaceHeaderNI();
				this.showPerson("anita4.jpg");
				addPlaceTitle(md, "Anita\'s Lair");

				md.write(
					'<p>Anita looks puzzled, her clothes covering little of her body. She rests the shotgun on her shoulder and asks you,</p>' +
					'<p>"Who the hell are you, why have you brought me here! Did you drug me, is that why I feel this hatred towards you, despite I have never seen you before!"</p>' +
					'<p>You point out that <i>she</i> is the one with the weapon and put your hands up. She looks startled and seems to just then realise she is holding the shotgun, and continues talking,</p>' +
					'<p>"Well I guess you are right, I can see some of my gear around here too. I must have really, really got drunk last night!! So did we....you know...?"</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, '"No, no I just found you here in this storeroom"', 145, '', '&quot;Well then, excuse me while I get dressed and get the hell out of here, I was only supposed to be in the town overnight, I need to get going&quot;<br>With that she kicks you out of the storeroom.', 'Anita', 'LeaveLair()');
				addLinkToPlace(md, 'return to Ms Jones\' office', 145, '', '', '', 'LeaveLair()');
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "shotjump" || sType == "shotcharm") {
				md = WritePlaceHeaderNI();
				this.showPerson("anita1.jpg", "height:max");
				addPlaceTitle(md, "Shot!");

				if (sType == "shotjump") {
					md.write(
						'<p>You leap at Anita, with the idea of wrestling the gun from her in her confusion, but her expression immediately hardens at the threat. ' +
						'Anita immediately reacts, the shotgun swings up and there is a devastating roar as the blast hits you in the chest. You collapse, your life blood pouring from the wound.</p>'
					);

				} else {
					md.write(
						'<p>You read a spell.... but it nothing happens, she must already be under the effects of a charm spell.</p>' +
						'<p>Anita immediately reacts to your words, the shotgun swings up and there is a devastating roar as the blast hits you in the chest. You collapse, your life blood pouring from the wound.</p>'
					);
				}
				md.write(
					'<p>You can\'t believe that after all this play the ' +
					'game has ended this way. Your life ebbs away and all you can ' +
					'think of is revenge in the afterlife.</p>' +
					'<p>Better luck next time...</p>'
				);

				addRestartLink(md);
				WritePlaceFooter(md);
				return true;
			}
			
			// Charmed
			if (sType === "anita5") {
				// Anita Charmed 1
				md = WritePlaceHeaderNI();
				this.showPerson(sType + ".jpg");
				addPlaceTitle(md, "Anita Under <i>Your</i> Charm Spell");
				myName = this.getYourNameFor();
				md.write(
					'<p>You tell her,<br>"No we did not <i>last night</i>" and she looks at you unsure why you stressed <i>last night</i>. She looks like she is about to ask you something, and you recite the words of the charm spell.</p>' +
					'<p>Anita looks startled, and swings the shotgun so it is ready, but she is not directly pointing it at you. She asks in an urgent manner,</p>' +
					'<p>"Did you hear that, I am sure I heard the word of command, but you are not my commander"</p>' +
					'<p>It would seem Anita here is a member of the military, but something there seems wrong, and you suspect she is more member of some sort of para-military group or militia, especially how she talked before. Still it does not matter at all what sort of unit or group she is with, your answer is the same,</p>' +
					'<p>"Yes I am a soldier! How dare you forget!"</p>' +
					'<p>She hesitates, but the power of the spell works itself through her mind, she stutters,</p>' +
					'<p>"' + myName + '...sorry...' + myName + '"</p>' +
					'<p>You look at her partially clothed body and smile, and order her,</p>' +
					'<p>"Don\'t forget again, for your punishment, remove your clothing, now!"</p>' +
					'<p>Anita hesitates, but the quickly removes her jacket and stands there before you, completely naked, holding her shotgun.</p>' +
					'<p>"Yes ' + myName + '"</p>' +
					'<p>You need to exert more control over her, especially as she is still armed.</p>'
				);

				// Questions
				startQuestions();
				addLinkToPlaceC(md, '"Put the weapon down!"', Place, 'type=anita6');
				WritePlaceFooter(md);
				return true;
			}
			if (sType === "anita6") {
				// Anita Charmed 2
				md = WritePlaceHeaderNI();
				this.showPerson(sType + ".jpg");
				addPlaceTitle(md, "Anita Under <i>Your</i> Charm Spell");

				md.write(
					'<p>You order Anita to put the shotgun down and she hesitates, you order her again, and she engages the safety, then carefully puts the shotgun down.</p>' +
					'<p>You think \'Good she is disarmed\', except you see her get something from a bag and when she stands up facing away from you, she is holding a pistol. While you appreciate the view of her from behind (and her behind) you again order her to disarm. She replies immediately,</p>' +
					'<p>"You cannot do that! No commander of mine would order me to be defenceless!"</p>' +
					'<p>You realise that this is an important point for her and decide not to press the matter, and tell her,</p>' +
					'<p>"Yes of course, I was just checking your dedication. You must obey my orders in every other way, no matter what I order you to do!"</p>' +
					'<p>Again without hesitation, she replies,</p>' +
					'<p>"I will do absolutely <i>anything</i> you order, <i>anything</i>, just order me"</p>'
				);

				// Questions
				startQuestions();
				addLinkToPlaceC(md, 'Order her "Prove it!"', Place, 'type=anita7');
				WritePlaceFooter(md);
				return true;
			}
			if (sType === "anita7" || sType == "proveit") {
				// Anita Charmed 3
				if (sType === "anita7") md = WritePlaceHeaderNI();
				else md = WritePlaceHeader();
				myName = this.getYourNameFor();
				if (sType === "proveit") this.setFlag(7);
				if (!isExplicit()) this.showPerson(sType === "proveit" ? "lair-proveit.jpg" : "anita7b.jpg");
				else if (perYou.isMaleSex()) this.showPersonRandomX("anita7b", 5);
				else this.showPersonRandomX("anita7g", 2);
				addPlaceTitle(md, "Anita\'s Proof");
				md.write('<p>For a moment you reconsider your order, given Anita\'s shown violence, but she drops to her knees ');
				if (perYou.isMaleSex()) {
					// Blowjob
					md.write(
						'and undoes your trousers and takes your stiff cock into her mouth. She proceeds to give you a skilled blowjob until you explode in her mouth. She swallows and then asks,</p>' +
						'<p>"Would ' + myName + ' now like my ass or pussy?"</p>' +
						'<p>You of course reply "Both!"</p>' +
						'<p>You sate yourself on your new subordinates body, and she also experiences considerable pleasure, both from the effects of the spell and also as she seems to very, very much like sex!</p>'
					);
				} else {
					// Cunnilingus
					md.write(
						'and undoes your pants and with a little hesitation licks your pussy. She is probably not experienced with a woman but still she makes you come quickly to a shuddering climax. She then asks,</p>' +
						'<p>"Would ' + myName + ' now like my ass or pussy or shall I prove myself again?"</p>' +
						'<p>You of course reply "All of them!"</p>' +
						'<p>You sate yourself on your new subordinates body, and she also experiences considerable pleasure, despite, or maybe because of her lack of experience with women.</p>'
					);
				}

				// Questions
				startQuestions();
				if (isMurderPath() && perGates.other == 600 && !this.checkFlag(4)) addLinkToPlaceC(md, "ask her about the killing of " + perGates.getPersonNameShort(), Place, '', 'You ask her about what happened at the mansion</p><p>&quot;' + myName + '! Sorry ' + myName + ', I do not remember that well, my memory is not clear. I am sure my last commander ordered the execution of an enemy, but it was ordered by his superior. I did as ordered, as I always will, ' + myName + '&quot;</p><p>It is a little chilling her casual reply about the murder, as if it is something normal for her...</p>', 'Anita', "setPersonFlag('Anita',4)");
				else addLinkToPlace(md, 'talk more to Anita', Place);
				WritePlaceFooter(md);
				return true;
			}
			return false;
		}
		
		if ((Place != 46 && Place != 161) || !this.isHere()) return false;
		// Bedroom/Cellar only
		
		var herName = this.getPersonName();
		var bC = Math.random() < 0.5;
				
		if (sType == "anitaprivate") {
			// Being private with Anita in the bedroom
			md = WritePlaceHeader();
			this.showPerson("home-private.jpg");
			addPlaceTitle(md, herName + " In Your Bedroom");

			// Description
			md.write('<p>' + capitalize(herName) + ' kneels on the bed, making herself available for her ' + perYou.getMaster() + '.</p>');

			// Questions
			startQuestions();

			if (perYou.isMaleSex()) {
				addLinkToPlaceO(md, 'order her that you will fuck her', Place, 'type=anitafuck');
				addLinkToPlaceO(md, 'order her that you will fuck her ass', Place, 'type=anitafuckanal');
				addLinkToPlaceO(md, 'order her that you will fuck her tits', Place, 'type=anitatitfuck');
			} else if (perYourBody.FindItem(45) > 0) addLinkToPlaceO(md, 'order her that you will fuck her with your strap-on', Place, 'type=anitafuck');
			addLinkToPlaceO(md, 'order her to ' + (perYou.isMaleSex() ? 'give you a blowjob' : 'lick you'), Place, 'type=anitabj');
			this.addSleepLink(md, "take " + herName + " to bed for the night", "Bedding " + herName,
				'<p style="position:absolute;left:50%;top:70%;cursor:pointer;font-size:1.1em;width:50%;color:white">As you prepare to go to bed for the night you order ' + herName + ' to join you in bed.',
				"bed.jpg", false, 46);
			addLinkToPlaceO(md, 'finish talking to Anita', 46);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "anitafuck") {
			// Fuck her
			md = WritePlaceHeader();
			this.setFlag(7);
			if (perYou.isMaleSex()) {
				this.showPersonRandomRorX("anita15b", isExplicit() ? 4 : 2);
				addPlaceTitle(md, "Fucking " + herName);
			} else {
				this.showPersonRandom("home-sex-strapon", 2);
				addPlaceTitle(md, "Fucking " + herName + " with your strap-on");
			}

			md.write(
				'<p>Sex with Anita is a very straightforward affair. You make room on the bed, undress each other and go at it.</p>' +
				'<p>Anita doesn\'t really like excessive tenderness and once called foreplay an “inefficient waste of time”, since she is always wet and ready for you to begin with, but she is slowly opening up to the idea that there is more to it than a quick way to get off.</p>' +
				'<p>You pin Anita onto the bed and both of you sate your desires on each others bodies. Your ' + (perYou.isMaleSex() ? 'manhood slides into her wetness' : 'your sex grinds against hers') + ' with rough, rapid motions, and you grin every time the stoic shell of your subordinate cracks a little more and she allows herself to softly moan or dig her fingers into the bed-sheet under another wave of pleasure.</p>' +
				'<p>In the end, both of you finally collapse on top of each other after sharing a mutual climax, and you even get to see one of Anita\'s rare smiles when you confirm to her that she fulfilled her “duty” to your fullest approval.</p>'
			);
			
			// Questions
			startQuestions();
			addLinkToPlaceO(md, 'finish talking to Anita', 46);

			WritePlaceFooter(md);
			return true;
		} 
		if (sType == "anitafuckanal") {
			// Fuck her ass
			md = WritePlaceHeader();
			this.setFlag(7);
			this.showPersonRandomRorX("home-sex-anal", isExplicit() ? 6 : 1);
			addPlaceTitle(md, "Fucking " + herName + "\'s ass");

			md.write(
				'<p>Sex with Anita is a very straightforward affair. You make room on the bed, undress each other and go at it.</p>' +
				'<p>Anita doesn\'t really like excessive tenderness and once called foreplay an “inefficient waste of time”, since she is always wet and ready for you to begin with, but she is slowly opening up to the idea that there is more to it than a quick way to get off.</p>' +
				'<p>You pin Anita onto the bed and both of you sate your desires on each others bodies. Your manhood slides into her tight rear with rough, rapid motions, and you grin every time the stoic shell of your subordinate cracks a little more and she allows herself to softly moan or dig her fingers into the bed-sheet under another wave of pleasure.</p>' +
				'<p>In the end, both of you finally collapse on top of each other after sharing a mutual climax, and you even get to see one of Anita\'s rare smiles when you confirm to her that she fulfilled her “duty” to your fullest approval.</p>'
			);
			
			// Questions
			startQuestions();
			addLinkToPlaceO(md, 'finish talking to Anita', 46);

			WritePlaceFooter(md);
			return true;
		} 
		if (sType == "anitatitfuck") {
			// Fuck her tits
			md = WritePlaceHeader();
			this.setFlag(7);
			this.showPersonRandomRorX("home-sex-tf", 1);
			addPlaceTitle(md, "Fucking " + herName + "\'s Tits");

			md.write(
				'<p>Sex with Anita is a very straightforward affair. You make room on the bed, undress each other and go at it.</p>' +
				'<p>Anita doesn\'t really like excessive tenderness and once called foreplay an “inefficient waste of time”, since she is always wet and ready for you to begin with, but she is slowly opening up to the idea that there is more to it than a quick way to get off.</p>' +
				'<p>You pin Anita onto the bed and both of you sate your desires on each others bodies. Your manhood slides between her modest tits with rapid motions, as she squeezes her brests together, licking and kissing where she can.</p>' +
				'<p>In the end, you finally cum over her breasts, and you even get to see one of Anita\'s rare smiles when you confirm to her that she fulfilled her “duty” to your fullest approval.</p>'
			);
			
			// Questions
			startQuestions();
			addLinkToPlaceO(md, 'finish talking to Anita', 46);

			WritePlaceFooter(md);
			return true;
		} 		
		
		if (sType == "anitabj") {
			// Blowjob/Lick
			md = WritePlaceHeader();
			this.setFlag(7);
			if (isExplicit()) {
				if (perYou.isMaleSex()) this.showPersonRandomX("anita7b", 7);
				else this.showPersonRandomX("anita7g", 3);
			} else if (perYou.isMaleSex()) this.showPerson("anita7b.jpg");
			else this.showPerson("anita7g.jpg");

			addPlaceTitle(md, "Anita Serving You");

			md.write(
				'<p>“Soldier!” You address Anita, and she immediately jumps off the bed and stands at attention.</p>' +
				'<p>“' + this.getYourNameFor() + '!”</p>' +
				'<p>“I need you to get on your knees and ' + (perYou.isMaleSex() ? 'suck my cock' : 'lick my pussy') + ', it\'s a delicate mission, but I am sure you are up to the task.”</p>' +
				'<p>“Delicate indeed, ' + this.getYourNameFor() + '!” Anita has a wide grin on her face as she pulls you closer and opens your pants, her eyes lingering on your ' + (perYou.isMaleSex() ? 'half erect shaft' : 'exposed sex') + ' for a second before her lips finally wrap around ' + (perYou.isMaleSex() ? 'the tip' : 'your clit') + ' and she begins to go to work.</p>' +
				'<p>Anita is very direct in her approach. She knows how to please a ' + (perYou.isMaleSex() ? 'man' : 'woman') + ', but is usually focused on the “Mission results” rather than enjoying herself on the way there. Always eager to bring you to climax as quickly as possible and get her “reward”.</p>' +
				'<p>It might be a good idea for the future to train a little, so she will drag things out, maybe act a little more slutty. But for now you enjoy her attentions while she quickly brings you to climax and ' + (perYou.isMaleSex() ? 'takes a load of her reward into her mouth' : 'licks her reward from your folds') + '.</p>'
			);

			// Questions
			startQuestions();
			addLinkToPlaceO(md, 'finish talking to Anita', 46);

			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "recharmanita1") {
			// Re-charm Anita
			clv = this.getCharmedLevel();
			if (clv != 4) this.charmThem(4);
			else this.charmThem(3);
			md = WritePlaceHeader();
			this.showPerson("anita14g.jpg");
			addPlaceTitle(md, "Re-assigning Anita\s Ass");

			md.write(
				'<p>You decide to give Anita a new set of orders, and as the spell courses through her again you tell her.</p>' +
				'<p>"Remember Anita, I will call you a slut, a bitch, patriot or whatever I choose, you are mine to command and do not forget it!"</p>' +
				'<p>She starts to take something from her handbag, you are sure it was a pistol of some sort, but she drops it and turns to face you. Her expression a mixture of anger and lust,</p>' +
				'<p>"' + this.getYourNameFor() + '...sorry...yes, I follow my orders, and you are my commander!"</p>' +
				'<p>That is enough, you have given her enough time, but do you want go hard or soft?</p>'
			);

			// Questions
			startQuestions();
			if (clv != 3) addLinkToPlaceC(md, '"Look at yourself slut!"', Place, 'type=recharmanita2');
			if (clv != 4) addLinkToPlaceC(md, '"Well done fellow patriot"', Place, 'type=recharmanita2');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "recharmanita2") {
			// Re-charm Anita 2
			clv = this.getCharmedLevel();
			md = WritePlaceHeader();
			this.showPerson("anita-recharm2.jpg");
			addPlaceTitle(md, "Anita Re-assigned");
			switch (this.getCharmedLevel()) {
				case 3:
					// Slut
					md.write(
						'<p>You can feel her intense arousal and forcibly tell her,</p>' +
						'<p>"You are not wearing any underwear and you are exposing yourself to me. You are a slut who wants nothing more than sex."</p>' +
						'<p>Despite her arousal she starts to deny your words, but makes no effort to cover herself. You ignore her words. You step towards her and with a light touch pull on the dislodged straps of her lingerie and it falls down to her waist.</p>' +
						'<p>"Embrace being a slut, there is nothing wrong with it. Sex is fun and you really enjoy it, don\'t you?"</p>' +
						'<p>She slumps to the ground and replies in confusion,</p>' +
						'<p>"Well, of course I love fucking...but I am a..."</p>' +
						'<p>You quickly interrupt her, it is clear she is about to say <b>patriot</b>,</p>' +
						'<p>"slut! OF course you are, it is your only wish and desire, to be someone\'s sex-toy and plaything, with no concern other than sex!"</p>' +
						'<p>She starts to mutter something about her mission, and you tell her,</p>' +
						'<p>"Like any slut your mission is to have as much sex as you can."</p>'
					);
					break;
				case 4:
					// Slave Soldier
					md.write(
						'<p>"You have been serving me well patriot, I was sent here to test your resolve and loyalty"</p>' +
						'<p>Suddenly she looks immensely relieved and she slumps to the floor,</p>' +
						'<p>"I have done well ' + this.getYourNameFor() + ', thank you, thank you, I am...was feeling so arous...angry."</p>' +
						'<p>She stretches her arms up in her relief and her lingerie starts to slip down, the straps had already fallen away from her shoulders. She does not seem to care in the mizture of her relief and the arousal coursing though her from the spell. You decide to exert your authority more,</p>' +
						'<p>"Well patriot...what is your given name?", she looks up at you, "Anita ' + this.getYourNameFor() + ' as you know, another test?.", and you continue, "I have been been told to assign you to a new duty. Your previous task has been compromised, so you are now assigned to my command!"</p>' +
						'<p>She sits up smiling, her lingerie falls almost completely down, and she asks</p>' +
						'<p>"What will my duties be ' + this.getYourNameFor() + ', is there anything you need \'handled\' now?"</p>'
					);					
					break;
			}
			startQuestionsOnly();
			addLinkToPlaceC(md, "that is enough for now", Place);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};


	// Questions for Anita
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 161 && this.isHere() && sType === "") {
			// Guarding in the cellar, generally
			addLinkToPlaceC(md, 'tell Anita to attend to you now', Place, 'type=anitaguardfuck');
			return;
		}
		if (Place == 45 || !this.isCharmedBy("You") || !this.isHere()) return;

		if ((sType == "anitaprivate" || Place != 46) && isDavyDefeated() && perDavy.place == 184 && !perDavy.isDead() && this.checkFlag(7) && !this.checkFlag(8) && isCharmedBy("Bambi")) {
			setPlaceFlag("Hotel", 8);		// Fallback in case the seance path has not started
			startAlternatives(md, "You consider if Anita can help you with Davy");
			if (isMurderPath()) {
				addPopupLinkC(md, '"Anita I want you to <i>take care</i> of Davy"', "Anita Leaves",
					this.addPersonString("anita1.jpg", "height:max%", "right") +
					"You decide it would be a good idea to have Anita guard Davy now you are confident of her loyalty. " + (isMurderPath() ? "While she was his slave, you" : "You") + " are now sure she will obey you only, so you tell her to go and take care of Davy and tell her where she is and if Bambi questions her to ask her to contact yourself. Anita answers with a salute,</p>" +
					'<p>"Yes ' + this.getYourNameFor() + ', I will take care of that bastard who pretended to be my commander!"</p>' +
					'<p>There was a lot of venom in her words, you are assured that she has no residual loyalty for him. You are worried she might be a little rough, but then again Davy deserves some rough treatment!</p>' +
					'<p>With that Anita dresses in her fatigues and packs her gear and guns and with no further words she leaves.',
					false, 'setPersonFlag("Anita",8);perDavy.health=0;perDavy.moveThem(1000);movePerson("Anita",999);movePerson("Bambi",124);startTimedEvent("MoveAnitaToBedroom()", 36);dispPlace();', undefined, "background-color:white;color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;"
				);
			} else {
				addPopupLinkC(md, '"Anita I want you to <i>take care</i> of Davy"', "Anita Obeying...",
					this.addPersonString("anita1.jpg", "height:max%", "right") +
					"You decide it would be a good idea to have Anita guard Davy now you are confident of her loyalty. " + (isMurderPath() ? "While she was his slave, you" : "You") + " are now sure she will obey you only, so you tell her to go and take care of Davy and tell her where she is and if Bambi questions her to ask her to contact yourself. Anita answers with a salute,</p>" +
					'<p>"Yes ' + this.getYourNameFor() + ', I will take care of that bastard who pretended to be my commander!"</p>' +
					'<p>There was a lot of venom in her words, you are assured that she has no residual loyalty for him. You are worried she might be a little rough and ask her to confirm her assignment,</p>' +
					'<p>"Yes ' + this.getYourNameFor() + ', I will kill the bastard, dispose of the body and return here!"</p>' +
					'<p>Ummm, that is not it, and you realise she is probably a bad choice to watch over him and leave that task to Bambi. You order Anita to forget the order and remain here. You had forgotten how casually violent Anita is...',
					false, 'setPersonFlag("Anita",8);dispPlace();', undefined, "background-color:white;color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;"
				);
			}
			addPopupLinkC(md, '"Anita I want you to <i>look after</i> Davy"', "Anita Leaves",
				this.addPersonString("anita9a.jpg", "height:max%", "right") +
				"You decide it would be a good idea to have Anita guard Davy now you are confident of her loyalty. While she was his slave, you are now sure she will obey you only, so you tell her to go and take care of Davy and tell her where she is and if Bambi questions her to ask her to contact yourself. Anita answers with a salute,</p>" +
				'<p>"Yes ' + this.getYourNameFor() + ', I will take care of that bastard who pretended to be my commander, and ensure he will not interfere with you!"</p>' +
				'<p>There was a lot of venom in her words, you are assured that she has no residual loyalty for him. You are worried she might be a little rough and ask her to confirm her assignment,</p>' +
				'<p>"Yes ' + this.getYourNameFor() + ', I will speak to Bambi and arrange to imprison that bastard. I will ensure he never interfere with you!"</p>' +
				'<p>You confirm with her that you so not want him harmed and she acknowledges. With that Anita dresses in a tight green dress only, with no underwear at all. She makes sure you can see this clearly, and as she packs her gear she invites you to visit and inspect her more, and how she secures Davy. She salutes and leaves, her dress barely covering her privates, a private\'s privates.',
				false, 'setPersonFlag("Anita",8);movePerson("Anita",999);startTimedEvent("MoveAnitaToCellar()", 12);dispPlace();', undefined, "background-color:white;color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;"
			);
			endAlternatives(md);
		}
	};

	per.showPersonTextHere = function(md)
	{
		if (Place == 161 && this.isHere() && perDavy.isHere() && wherePerson("Bambi") != 161 && sType === "") md.write('<p>Your rival Davy is bound against one wall, guarded by your loyal slave Anita.</p>');
		else if (this.whereNow() == 46 && (sType == "tessplaymore" || sType == "tanikafuck" || sType == "tanikabj")) md.write('<p>Anita stands at the door, dutifully making sure that no one is able to bust in and try to assassinate you or disturb your sexy-time. She is surprisingly stern and focused for someone under the Dai chu, but you do occasionally catch her giving you wistful looks, hoping that it will be her turn soon.</p>');
	};
	
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			
			if (Place == 142) {
				// Anita's ambush
				ShotByAnita();
				return "nofooter";
				
			} else if (Place == 195 && this.isHere()) {
				// The General Store
				if (!isSpellKnown("Shielded Charm")) addComments("Don't cast the spell here, the " + getShopStore() + " is still open and it\'s too public.");
				else if (!this.checkFlag(5)) addComments("You do not know her name, so the spell will not work.");
				else CastCharmSpell("Anita", Place, 4, 'type=charmanitastore1');
				return "handled";
				
			} else if (Place == 46 && this.isHere()) {
				// Your bedroom to re-charm
				CastCharmSpell("Anita", Place, 4, 'type=recharmanita1', '', 'type=recharmanita1');
				return "handled";
				
			} else if (Place == 252 && this.isHere()) {
				// Anita's Lair
				if (!this.isCharmedBy("You") && !this.isCharmedBy("Davy")) CastCharmSpell("Anita", Place, 4, "type=anita5");
				else if (!this.isCharmedBy("You") && this.isCharmedBy("Davy")) gotoPlace(Place,"type=shotcharm");
				else addComments('You read a spell.... but it fizzles.');
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
		if (Place == 269 && (this.place == 46 || this.place == 161)) {
			if (this.whereNow() != 46) WriteComments("You reconsider asking Anita, she is on her guard duty and she would never take time off for a swim, you will have to try another time.");
			else {
				gotoPlace(Place, 'type=anitapool');
				receiveCall('', 'You call Anita to order her to join you at the pool for a swim, and she answers, "Yes ' + this.getYourNameFor() + '.');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};
}
