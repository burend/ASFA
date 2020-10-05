/**********************************************
Sofia
Gate's Chauffeur
***********************************************/

function initialiseSofia()
{
	// Sofia
	addPerson("Sofia", 0, "Sofia", 'Missy');
	per.name = per.getPersonNameShort();

	per.isPersonInfo = function() { return true; };
	per.getPersonInfo = function() {
		var s = this.addPersonString("sofia_intro.jpg", "height:max%", "right");
		if (!this.isCharmedBy()) {
			if (isMurderPath()) {
				return s + "Sofia is the Gates family’s chauffeur. The girl is a great example of latino beauty, though she doesn’t speak english well and is very vigilant and cautious. As if she is hiding something… You can’t really get anything useful out of her other than that she was fond of Sir Gates and is close with Sarah. Clearly there is more than employer-employee relationship here. She says she was away when Master Ronald was murdered, but now she devotes all her time to protect and be there for Sarah in these hard times." +
					"Sofia is hesitant to answer even the simplest questions and raves about something else usually. This doesn’t stop you from wanting to enslave her. Not only she has a rocking body, but maybe you could her skills for your own needs. Come on…who doesn’t want a personal chauffeur who carries you around town like some kind of celebrity.";
			}
			return s + "Angelica is the Gates family’s chauffeur. The girl is a great example of latino beauty, she is friendly but particularly intellectual.";
			
		}
		if (isMurderPath()) return s + "Sofia was a keen servant to the Gates family. Her kind and shy persona only is only rivaled by her intense devotion to them. Now that you’ve learned her past, you understand why she was so defensive and alarmed. Now that she is under your command, she showed a great deal of emotion; a passionate and sensitive nature. She explained that it’s part of her latino blood and part . It’s just who she is. Overall, she is a humble and timid girl, yet she can be immensely vocal for things she cares about; which is obviously you now. You know if someone would only just look at you nastily, she would be the first to jump in and protect you. You feel she could have been a close friend if the circumstances were different, but you were \"forced\" to charm her. Still, it isn’t that bad. She is loyal, ambitious, very emphatic and one of your more exotic lover in bed. You decided to have Sofia work for your as your personal driver, which she eagerly accepted. It’s not a bad life when a stunningly beautiful woman looks after you every day.";
		else return s + "Angelica is the family chauffeur of the Gates family, but now she is also your private busty bimbo babe!";
	};
	
	per.getPersonName = function(full) { return (full !== true && this.sCharmedBy == "You" ? "Slave " : "") + (isMurderPath() ? "Sofia" : "Angelica"); };
	per.getPersonNameShort = function() { return isMurderPath() ? "Sofia" : "Angelica"; };
	per.getYourNameFor = function() {
		var clv = this.getCharmedLevel();
		if (clv <= 0) return perYou.getPersonName();
		return isMurderPath() ? perYou.getMaster() : perYou.isMan() ? 'Daddy' : 'Mommy';
	};
	per.getPersonAddress = function() { return this.checkFlag(1) ? 'Gate\'s Mansion Garage' : ''; };
	per.getPossessionFace = function() { return "sofiafail"; };

	per.showEventPopup = function()
	{
		// Initial meeting in the Garage Office
		if (Place == 14 && !this.checkFlag(1)) {
			this.setFlag(1);
			this.name = this.getPersonNameShort();
			if (isMurderPath()) {
				showPopupWindow("Chauffeur",
					this.addPersonString("sofia_office_noncharmed.jpg", "height:max%", "right") +
					'A dark skinned lady is sitting on a desk.  It’s easy to realize that she is the chauffeur of the family. She is wearing that kind of uniform after all! How come you have never seen this woman before? You have been in the Gates mansion several times, yet somehow you cannot recollect of seeing such a babe around. Strange indeed. Also worthy to note that her face suggest that she is hispanic, which is a rare ethnic around here. Why didn’t Sir Ronald mention her to you raises even more questions.<br><br>' +
					'Though all your suspicions become subsidiary when you lay your eyes on her enormous breasts. It’s obvious that they are so huge that they hardly fit in her dress properly! The shirt she is wearing doesn’t really hold and it’s not buttoned on the top. She is the definition of a busty woman! It doesn’t end there, her whole body seems perfect for some groping! She is not extremely skinny nor too bulky. A perfect specimen for your taste!'
				);
			} else {
				showPopupWindow("Chauffeur",
					this.addPersonString("meet.jpg", "height:max%", "right") +
					'A dark skinned lady is sitting on a desk.  It’s easy to realize that she is the chauffeur of the family. She is wearing that kind of uniform after all! How come you have never seen this woman before? You have been in the Gates mansion several times, yet somehow you cannot recollect of seeing such a babe around. Strange indeed. Also worthy to note that her face suggest that she is hispanic, which is a rare ethnic around here. Why didn’t Sir Ronald mention her to you raises even more questions.</p>' +
					'<p>As you look at her she takes off her jacket and all your suspicions become subsidiary when you lay your eyes on her enormous breasts. It’s obvious that they are so huge that they hardly fit in her top properly! The top she is wearing is stretched almost to bursting. She is the definition of a busty woman! It doesn’t end there, her whole body seems perfect for some groping! She is not extremely skinny nor too bulky. A perfect specimen for your taste!</p>' +
					'<p>She is clearly aware of your appreciative looks and poses for a moment and you are sure you hear her laugh or maybe giggle.'
				);
			}
			return true;
		}

		if (Place == 14 && this.isHere() && sType == "charm") {
			if (!perYou.isQuestStarted(7)) {
				perYou.startQuest(7);
				if (isMurderPath()) {
					showPopupWindow("Chauffeur",
						"<p><img src='Images/People/Sofia/Missy/sofia_ring.jpg' style='width:50%;float:right;margin-left:5px' alt='Failed!'>" +
						'Damn! The spell doesn’t work on her! How can that be? She must have something protecting her against spells like this.</p>' +
						'<p>Sofia scolds you, "Very…very bad ' + perYou.getPersonName() + '! Master Gates…advirtió…warned me against people like you! You won’t succeed, I am protected…el hijo de puta…You don’t try this again bastardo!", she is giving you the finger, revealing a silver ring. She must have gotten it from Sir Ronald!</p>' +
						'<p>You will never have a chance to charm Sofia while she is wearing that ring! You need to take it off from her. Maybe if you would know her personality better. You need to understand her in order to find a solution to this, but it is obvious that she is reluctant. You don’t even know anything about this lady! Just suspicions! You have to find someone who at least knows something about her. Someone who knows everyone in town...</p>'
					);
				} else {
					showPopupWindow("Chauffeur",
						this.addPersonString("charm-failed.jpg", "height:max%", "right") +
						"Well Angelica is new and you doubt Sir Ronald will notice if you are discrete, so you cast the spell.</p>" +
						'Damn! The spell doesn’t work on her! How can that be? She must have something protecting her against spells like this. You can see nothing clearly protecting her and doubt she has any talent that could be defending her!'
					);
				}
			} else if (isMurderPath()) addComments("<img src='Images/People/Sofia/Missy/sofia_ring.jpg' style='width:50%;float:right;margin:0 5px 1em 0' alt='Failed!'>Remember the ring!");
			else addComments(this.addPersonFace() + "You still do not know what is protecting her!");
			return true;
		}

		if (Place == 14 && sType == 'breakin') {
			this.addPersonPhoneCall();
			if (bNewSMS) newSMS();
		}

		if (Place == 95 && this.checkFlag(11) && !this.checkFlag(12) && isCharmedBy("Angela")) {
			var perAngela = findPerson("Angela");
			var myName = perAngela.getYourNameFor();
			this.setFlag(12);

			showPopupWindow("Angela Helping",
				perAngela.addPersonString("!angela14.jpg", "height:max%", "right") +
				'<p>You close the office door and would be on your way out when you see Angela waiting for you. She comes to you, after the regular greeting ' + (perAngela.getCharmedLevel() == 2 ? ' by giving you an enthusiastic kiss' : ', which means she kisses your hand, like a subject does to her ' + perYou.getLord()) + ' and after that she starts to talk,</p>' +
				'<p>"' + myName + '! I’ve heard your conversation with Miss Thomas. I’m sorry, I couldn’t help myself and the walls are too thin anyway.", she pleads and waits for your reaction. You don’t mind that a bit, you know she just wants to please you. Sje continues,</p>' +
				'<p>"I know of a ' + this.name + '. She is a hispanic woman in her mid twenties. She was the personal driver to ' + perGates.getPersonNameShort() + ' Gates. Is she the one you are looking for?" she asks.</p>',
				"dispPlace(95)"
			);
			return true;
		}

		if (Place == 168 && sType == "waiting") {
			setPlaceKnown("PoliceInterrogationRoom");
			this.setFlag(24);
			this.moveThem(175);
			showPopupWindow("Anticipation",
				this.addPersonString("sofiadaydream.jpg", "height:max%", "right") +
				'<p>You sit down into Kerry’s chair while she is away, putting your feet on her desk and loudly whistling away. You turn on the ' + getPoliceChief() + '’s computer and play some online browser games to kill time.</p>' +
				'<p>What to do with Sofia once you put her in place? She could help you in some many ways…, but the most obvious one is to continue her job, but as YOUR driver from now on. It would be convenient to have her drive you around and would spare a lot of your precious time. As you contemplate your plans and dreams on how to use your future slave, Kerry enters the station with Sofia in handcuffs. The police chief escorts her through the office and drops Sofia in the interrogation room. After that she to comes to you.</p>' +
				'<p>"It’s done as you wished. The ring’s off her finger! She is quite furious though. I thought she is a meek and easy to break type of person, but she knows how to fight for herself! I will guard you personally while you are in there with her! Be careful, that kitty can still bite!"</p>'
			);
			return true;
		}

		return false;
	};

	per.showEvent = function()
	{
		var md, nm;
		
		if (sType == "sofiapool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("sofia-pool.jpg");
			addPlaceTitle(md, "Swimming with " + this.name);
			md.write(
				'<p>You ask Bambi to get ' + this.name + ' a spare bikini and she quickly finds one for ' + this.name + ', who changes into it, ready to serve you in any way you wish!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'she is willing to do more..', Place, 'type=sofiapoolsex');
			addLinkToPlaceC(md, 'say goodbye to ' + this.name, Place);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "sofiapoolsex") {
			md = WritePlaceHeader();
			this.showPerson("sofia-pool-sex.jpg");
			addPlaceTitle(md, "Being Discrete and Private with " + this.name);
			md.write(
				'<p>You ask ' + this.name + ' for more with her privately, and she seductively removes most of her swimsuit and plays with her large breasts for your pleasure.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later...say goodbye to ' + this.name, Place);
			WritePlaceFooter(md);
			return true;
		}

		if (Place == 110 && sType =='asksofia1') {
			this.setFlag(11);
			md = WritePlaceHeader(false, 'td-left-med');
			findPerson("Mayor").showPerson("mayor12.jpg");
			addPlaceTitle(md, "Assistance from the Mayor");

			md.write(
				'<p>You ask Mayor Thomas about Sofia, the chauffeur at the Gates\'s Mansion, and she replies,</p>' +
				'<p>"Give me a moment ' + perYou.getMaster() + '! I\'m looking through the database right now! We have information on everyone who lives in Glenvale!"</p>' +
				'<p>Amused you ask her "Heh! You have anything interesting on me? and you smile to yourself, while Miss Thomas chuckles at your "original" joke and then replies,</p>' +
				'<p>"Oh yes! That you are the finest ' + (perYou.isBornMale() ? 'lad' : 'joker') + ' in the land and we should all appreciate that we know you. The greatest honor to us is when we can talk to you or you give us a task. Yep, it’s written here!" she smiles. Her smile suddenly wanes away, panic draws on her face.</p>' +
				'<p>You ask, "What’s wrong?" and she answers,</p>' +
				'<p>"' + perYou.getMaster() + '! I don’t- I don’t understand! There’s no one named Sofia in here! I’m so deeply sorry!" she still doesn’t give up, looking around, typing furiously, trying every possibility.</p>' +
				'<p>You find it hard to understand why Sofia would not be there, "Wha- How can that be?"</p>' +
				'<p>Mayor Thomas finally answers, "That means that she is unregistered or goes by an another name. Do you know anything else about this woman?"</p>' +
				'<p>You tell her "Nope, I thought you would be the one who can enlighten me…"</p>' +
				'<p>Mayor Thomas answers, "I will rally all your slaves! We will find this \'Sofia\' and will bring her to you. She will not get away, I promise. I will search every stone, every house if I need to. I will…" you stop Miss Thomas ranting with a single handwave. She silences in an instant and focuses on listening you.</p>' +
				'<p>"There’s no need for that. I know where Sofia stays and I certainly don’t need any unwanted attention. I don’t want you marching through the whole town with a whole bunch of slaves for one woman. I will have her in an another way then." your solid voice-tone calms her down. Mayor Thomas fixes her wrinkled blouse and changes from a frightened woman into a stone-cold slave in a second.</p>' +
				'<p>"Mayor Thomas: I understand! Thank you for showing me the way, my ' + perYou.getMaster() + '! I am at your command!</p>' +
				'<p>"Don’t worry! You’ve done what you can. Now go back to your work.", you tell her.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'go to the reception', 95);
			WritePlaceFooter(md, '', false, true);
			return true;
		}

		if (Place == 95 && sType =='asksofia2') {
			this.setFlag(13);
			md = WritePlaceHeader();
			findPerson("Angela").showPerson("!angela1c.jpg");
			addPlaceTitle(md, "Angela Explains");
			var perAngela = findPerson("Angela");
			var myName = perAngela.getYourNameFor();

			md.write(
				'<p>You ask Angela about Sofia and she happily answers,</p>' +
				'<p>"We met at the hair saloon a while ago. I don’t know when it was, but I haven’t seen in her in a while. I only met her like, twice maybe."</p>' +
				'<p>You ask Angela, "Tell me everything you know about her!"</p>' +
				'<p>"Of course! I live to serve! Sofia seemed on edge, she was shy and nervous. She didn’t talk much at first, but opened up as we waited for our hair to be done. She said she was grateful to the Gates for being so generous with her, giving her work and bed to sleep and that she is utterly loyal to them. She briefly mentioned her job to them; she drives them around wherever they need to go and service them in any way they want. The other staff members didn’t like her, she was an outsider to them who quickly rose through their ranks, becoming Ronald’s pet, as they liked to call her. She wanted to prove them wrong, that she is a hard working woman just like them, but her tryings fell on deaf ears."</p>' +
				'<p>That is interesting, you query her, "Very strange…did she have an accent? Could she speak proper english?"</p>' +
				'<p>"To my knowledge, yes. She spoke fluently and without problem. Why do you ask, my ' + myName + '?</p>' +
				'<p>You answer, "Never mind. This girl is just becoming more interesting in every second. What else can you tell me? Something to help me catch her!"</p>' +
				'<p>Angela tells you "She said she still haven’t got used to getting up very early in the morning. She has a daily routine which involves her leaving her office at 8:00 AM. She told me she goes around town and buys breakfast for Sir Gates, that usually includes groceries, freshly baked breads and such. She returns 10:00 AM with the food and prepares them for Ronald."</p>' +
				'<p>Great!You tell Angela "You can’t imagine how much you helped me. Now I’m going need some help on breaking into her house…I need to know her secrets!"</p>' +
				'<p>Angela looks pleased, "I’m sure someone at the police station would be more than eager to help you ' + perYou.getMaster() + '! You should talk to them."</p>' +
				'<p>You agree, "Great idea!"</p>' +
				'<p>Angela is overjoyed, "My pleasure ' + myName + '! It feels so good being yours, my clit’s already wet just by this conversation! And I will be happy if Sofia will be added to your regiment of slaves. She seemed like such a nice, kind hearted, but troubled girl who needs your \'help\'".</p>' +
				'<p>With that you spank Angela on her bottom and let her return to her duty. She is already in awe that she pleased you.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'talk more to Angela', 95);
			WritePlaceFooter(md, '', false, true);
			return true;
		}

		if (Place == 168) {
			if (sType =='asksofia3') {
				this.setFlag(14);
				md = WritePlaceHeader();
				findPerson("OfficerBatton").showPerson("polbsofia1.jpg");
				addPlaceTitle(md, "Police Assistance");

				md.write(
					'<p>You ask Kerry, "Babe! I need your help. I want to charm someone, but she is wearing a powerful ring that protects her from me. I need to learn more about her, so I’m going to break into her house in the morning. I need your help on this."</p>' +
					'<p>Kerry Batton replies, "I understand ' + (perYou.isBornMale() ? 'Sir' : 'Ma\'am') + '! Though there is no need for that! I can just send some officers and drag her to you. We will ensure that she is held tightly while you cast your spell on her. I will personally…" Kerry doesn’t finish her thoughts. You wave her down too and tell her,</p>' +
					'<p>"Jeez! Why are you all so harsh and brutish! I was asking for discretion, not public parade with everyone in town involved in it…I swear you are the same as Miss Thomas sometimes." you roll your eyes to Kerry, who, for a moment, looked sheepishly lost in herself, but quickly shakes that feeling off and  says,</p>' +
					'<p>"Forgive me ' + perYou.getMaster() + '! I wanted the easiest way for you! I only live just so you can have a better life. I understand why don’t want a big thing out of this. Command me what to do!", Kerry softly, like an angel, smiles.</p>' +
					'<p>You are content with her reply, "All right! As I have told you, I want to break into her place. I feel there’s something dark going around her, that’s why I want you to be on the lookout. If I find any evidence that might help bring her here without using force, then I want you to bring her in. And I mean only YOU. I don’t want any other officers or people involved."</p>' +
					'<p>Kerry Batton nods her head, "Sounds like a plan, ' + perYou.getMaster() + '! Would it be better if I could give you more time by distracting her during her shopping?" she offers you a great advice. However you can’t take any risks and answer,</p>' +
					'<p>"No, don’t do that. I think she would recognise you, you are the police chief of the town after all! What you can do is follow her from a distance and drop me a text when she is heading home so I can know when to leave."</p>' +
					'<p>Kerry Batton nods, "It will be done as you wished! I’m so lucky that you chose me to serve in this operation. I won’t let you down!". Officer Kerry cheers and hugs you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'Kerry has a last point', 168, 'type=asksofia4');
				addLinkToPlaceC(md, 'finish talking to Kerry', 168);
				WritePlaceFooter(md, '', false, true);
				return true;
			}
			if (sType =='asksofia4') {
				md = WritePlaceHeader();
				findPerson("OfficerBatton").showPerson("polbsofia1.jpg");
				addPlaceTitle(md, "Further Police Assistance");

				md.write(
					'<p>Kerry explains, "' + perYou.getMaster() + '. Before you go, I advise you to be careful. I know you have many different spells you can use, but breaking into someone’s house is dangerous. Just promise me you will be safe, my ' + perYou.getMaster() + '."</p>' +
					'<p>You reply, "Don’t worry about me, I will be fine. How do you know about my different types of spells?". Kerry answers,</p>' +
					'<p>"I have my ways…I’ve been asking around your other slaves and been reading a lot about magic lately. I’ve read about a spell that could help you while you search the house. I don’t know it’s name or how to obtain it, but it’s been described as a spell that let’s it’s user see things that are hidden to the normal eye…"</p>' +
					'<p>She has a point, you answer, "Yes… It’s a somewhat common spell. Thanks for mentioning it, it may prove useful to me during my exploration of Sofia’s secrets."</p>' +
					'<p>Kerry seems enthusiastic, "I’ve learned so much about this exciting new world already! Ever since I’m your property I have this urge to study and open mind. Is this a side effect of your powers, ' + perYou.getMaster() + '?"</p>' +
					'<p>You tell her, "I can’t really tell for sure. It affects every mind differently, my slave."</p>' +
					'<p>"Well, when you are finished with Sofia maybe we can talk about my findings privately?" the policewoman strokes your chest softly and puts on a mischievous smirk.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'finish talking to Kerry', 168);
				WritePlaceFooter(md);
				return true;
			}

			if (isMurderPath() && this.checkFlag(15) && !this.checkFlag(24) && sType === "") {
				md = WritePlaceHeader();
				findPerson("OfficerBatton").showPerson("polbsofia1.jpg");
				addPlaceTitle(md, "Next Stage of the Plan for Sofia");

				md.write(
					'<p>You see Kerry Batton when you enter the Police Station, "Done! Thank you for your help in the investigation, officer!"</p>' +
					'<p>"It was my pleasure ' + perYou.getPersonName() + '! You know…my job is to protect and serve!" Kerry salutes to you, she looks a bit exhausted. She must have arrived back to the station recently."</p>' +
					'<p>You tell her, "Let’s get to the point, my dear slut! Sofia is illegally staying here, in Glenvale. I’ve found fake passports and files that supports my theory. She was hiding in a secret room in her office during the investigation of Mr Gates’s mysterious death. Her diary details her days here; how she came here and why."</p>' +
					'<p>Kerry Batton nods, "I knew something fishy was going around with that gal! What do you need me to do?"</p>' +
					'<p>You order her, "Arrest her, charge her with illegal tresspassing to our country. You’ve got your evidence in her bedroom, you don’t need a warrant or anything else."</p>' +
					'<p>Kerry stands, "I understand. I’m leaving right now! Wait here ' + (perYou.isBornMale() ? 'Sir' : 'Madam') + '! It won’t take long. I will put her into our interrogation room just next to my office, so she will be all alone. You can safely use your spell on her."</p>' +
					'<p>You remind her, "Don’t forget to confiscate the ring she’s wearing. That’s the thing that gave me all the trouble at the first place!"</p>' +
					'<p>"Yes, ' + perYou.getMaster() + '!", Kerry answers with a salute, and storms out of the police station with one thing on her mind; bring Sofia to you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'wait for them to return', 168, 'type=waiting');
				WritePlaceFooter(md, '', false, true);
				return true;
			}
		}

		if (Place == 175 && this.isHere()) {
			if (sType === "") {
				md = WritePlaceHeader();
				this.showPerson("sofiainterrogation.jpg");
				addPlaceTitle(md, "Sofia in the Interrogaton Room");

				if (!this.checkFlag(25)) {
					this.setFlag(25);
					md.write(
						'<p>A raging and desperate looking Sofia stands next to the oval-desk used for questioning suspects. She is in her everydays clothes, looking even more elegant than usual. Her mad face is just an icing to the cake. You’ve driven her into a corner and she has nothing to protect her from you now. You tell her,</p>' +
						'<p>"You gave me quite a headache, Sofia! With that ring of yours, but now I know the truth about you, I know who you are." Sofia cuts into your speech.</p>' +
						'<p>"Spare me with your monologue! I know what will happen to me, but please, I ask you of one favor! Don’t hurt Sarah, I beg of you! She and Master Ronald helped me in my darkest days, I owe them my life."</p>' +
						'<p>You answer, "Still loyal to the end I see! That’s a rare and remarkable feat nowadays! Don’t worry, I will \'protect\' Sarah!' + (isMurderPath(true) ? '" You continue with a lie, "' : ' ') + 'I’ve killed her uncle after all and she must feel lonely. Yes, I did it! It was an accident, I didn’t want that to happen, but I can’t turn back time…and the poor man’s death was inevitable anyways. There are far more dangerous people out there than me." you ramble about Mr Beasley, Davy and Kurndorf to Sofia in a few short sentences. Sofia’s shocked face turns to sorrow first and into anger later. She says,</p>' +
						'<p>"You killed Senor Gates?! Que condenar al infierno! But… I guess…I can’t do anything about it now either…If there are far more evil men out there as you have said, and I heard of this Kurndorf before from Sarah, then I can only pray that Sarah only falls into your hands rather than theirs. At least I get to be with her again…" Sofia turns silent. You give her time to process everything. Her sudden realisation of her hopeless situation sinks into her mind.</p>' +
						'<p>"There’s no turning back, nowhere to go…I’m tired of running</p>' +
						'<p>' + perYou.getPersonName() + '… Will I feel anything? Am I going to be still me?" you see that Sofia finally given up all hope and accepted her fate. Her questions hit you, because you still don’t understand how your powers work on others. You decide to tell her the truth,</p>' +
						'<p>"I don’t know. I haven’t figured it out yet. You will be completely happy in your service to me. Your only goal will be to do everything I tell you to do, but the spell affects each person differently. Your thoughts will change, but I believe it will be still you...just under my control."</p>' +
						'<p>"Let’s get this over with…I will still hate you for the rest of my life…" Sofia growls at you as a final comeback. You know it’s not going to be true.</p>'
					);
				} else {
					md.write(
						'<p>A raging and desperate looking Sofia stands next to the oval-desk used for questioning suspects. She is in her everydays clothes, looking even more elegant than usual. Her mad face is just an icing to the cake. You’ve driven her into a corner and she has nothing to protect her from you now.</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, 'exit the interrogation room', 168);
				WritePlaceFooter(md);
				return true;
			}
			if (sType === "charm1") {
				md = WritePlaceHeader();
				this.showPerson("sofia_charm1.jpg");
				addPlaceTitle(md, "Sofia Under a Charm Spell");

				md.write(
					'<p>You cast your spell and wait what happens next. It doesn’t take much time to see the difference in Sofia. She looks at you with wild eyes, like a predator to it’s pray, ready to jump any second. Little moans here and there leaves her mouth. She is starting to feel the spell’s effect. She pushes herself towards you, thus her boobs have a hard time staying in the bra.</p>'
				);

				startQuestions();
				addLinkToPlace(md, 'wait further in silence', 175, 'type=charm2');
				WritePlaceFooter(md, '', false, true);
				return true;
			}
			if (sType === "charm2") {
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPerson("sofia_charm2.jpg");
				addPlaceTitle(md, "Sofia Under a Charm Spell");

				md.write(
					'<p>Sofia becomes aroused every passing minute. Gasping for air, she climbs the table and removes the jacket she was wearing.</p>' +
					'<p>"Hmm… All those silly thoughts fade away, mi amor… " Sofia can’t hold herself any longer. Her nipples are visible, erect and fall out the bra. She doesn’t care about that. She purrs like a hungry kitten. The position she takes reminds you of one…</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, '"You are one hot slut, you know that?"', 175, 'type=charm3');
				WritePlaceFooter(md, '', false, true);
				return true;
			}
			if (sType === "charm3") {
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPerson("sofia_charm2.jpg");
				addPlaceTitle(md, "Sofia Under a Charm Spell");

				md.write(
					'<p>"Soy un esclavo, mi amor…I understand everything now. What’s my life, my duty…" Sofia speaks her mother language like she is reading some kind of poem. It’s music to your ears. You take your time to listen what she is saying, but suddenly she tears her shirt off. Sofia pulls up her bra, finally, her breasts open to you. She holds them to you like some kind of an offering.</p>' +
					'<p>"Por favor…use me… I can’t hold it much longer…" she begs.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, perYou.isMaleSex() ? '"Swear your allegiance to me, slave. Suck my cock now!"' : '"Swear undying loyalty to me now, slave! Use your mouth!"', 175, 'type=charm4');
				WritePlaceFooter(md, '', false, true);
				return true;
			}
			if (sType === "charm4") {
				md = WritePlaceHeader(false, perYou.isMaleSex() ? isExplicit() ? 'td-left-med' : '' : 'td-left-large');
				if (perYou.isMaleSex()) this.showPersonRorX("sofia_charm_male1.jpg");
				else this.showPerson("sofia_charm_female1.jpg");
				addPlaceTitle(md, "Sofia Under a Charm Spell");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>Sofia obeys your order without hesitation. She kneels down and starts to suck your cock. The joy this brings to you can’t be described. You are definitely in heaven right now. She services your cock like it’s some kind of an instrument and she plays the most beautiful song you ever heard during a blowjob. The sound her mouth makes just add to the effect.</p>' +
						'<p>"Yo, Sofia… me entrego … a .. ti… para siempre… Amo" she stops between each word to satisfy you with her lips. Though you did not ask her to swear loyalty to you in spanish, it actually sounds more sensual and passionate. Her loyal and caring personality just becomes even more submissive.</p>'
					);
				} else {
					md.write(
						'<p>Sofia obeys your order without hesitation. She kneels down and slowly caressing your clit with her mouth in the process. You lay on the chair and enjoy her service. Her commitment is inspiring. She twirls her tongue like a professional and uses her hands to help your vagina relax. As if that wasn’t enough to convince you of her skills, her muffled voice can be heard when she takes short pauses.</p>' +
						'<p>"Yo, Sofia… me entrego … a .. ti… para siempre… Ama!" You pull her closer to you and kiss her. She swear her loyalty to you in spanish, which sounds even more sensual and passionate than english. You can feel your own juice from taste of her lips. You’ve let this kitty grow into a tigress!</p>'
					);
				}

				startQuestions();
				addLinkToPlace(md, perYou.isMaleSex() ? 'keep on enjoying the experience' : 'let her finish pleasuring you!', 175, 'type=charm5');
				WritePlaceFooter(md, '', false, true);
				return true;
			}
			if (sType === "charm5") {
				md = WritePlaceHeader();
				if (perYou.isMaleSex()) this.showPersonRorX("sofia_charm_male2.jpg");
				else this.showPerson("sofia_charm_female2.jpg");
				addPlaceTitle(md, "Sofia Under a Charm Spell");

				if (perYou.isMaleSex()) {
					md.write(
						'<p>This is it then. This is literally an awesome blowjob you are receiving. You gently help Sofia by placing your hand on her head and push it to her limits. She chokes on your dick several times, but doesn’t give up. Sofia would be on your dick all day if you wish, but all good things come to an end. You can’t hold it anymore and let your glorious load land on her face. She playfully finish you off and smiles while she eats your spunk from her face. With that done, she looks up, waiting for your orders. She would go for a second round if you would not be depleted! You’ve let this kitty grow into a tigress!</p>'
					);
				} else {
					md.write(
						'<p>After you break the kiss, Sofia continues her duty as your slave and finishes what she started. Loud moans and long silences follow. This is your victory show and you want to enjoy it as much as you can! The exotic Sofia shoves her face into your pussy and after a while of that, she goes to work on your erect nipples. She sucks on them and returns to sucking your pussy. That’s her working routine for the rest of the intercouse. You loose track of time and when you are finally ready to cum, she cums with you. Sweet juices flow from each of your bodies, Sofia swallowing yours eagerly.</p>'
					);
				}

				startQuestions();
				addLinkToPlaceC(md, '"Heh! That was amazing! I’m going to need this regularly!"', 175, 'type=charmend');
				WritePlaceFooter(md, '', false, true);
				return true;
			}
			if (sType === "charmend") {
				md = WritePlaceHeader();
				this.showPerson("sofia_charm_ending.jpg");
				addPlaceTitle(md, "Sofia Under a Charm Spell");
				this.moveThem(14);
				perYou.completeQuest(7);

				md.write(
					'<p>"I’m always ready, ' + perYou.getMaster() + '! My body is strong and my appetite is constant!” she cleans herself off. Your freshly acquired slave squeezes her boobs for the final time for you to enjoy. She is the definition of a latin lover!</p>' +
					'<p>You ask her, "What to do with you now? How can I use you?"</p>' +
					'<p>Sofia replies, "What you have always wanted, ' + perYou.getMaster() + '. I can feel it, you want me to be your personal chauffeur. I would gladly take that role. I would be more than happy if I could accompany you on your journeys."</p>' +
					'<p>You are surprised at her words, "How did you know what I had planned for you?"</p>' +
					'<p>"I’m Mexican, not stupid ' + perYou.getPersonName() + '. It was obvious since the first time you laid your eyes on me. You dreamed about me being in your service. I saw that.", she has a witty sense of humour and you like it so far. Her shy nature has opened up a bit, she’s braver than before. You guess she would only speak to you in this manner, not anyone else.</p>' +
					'<p>You tell her, "Hey! No need to be so harsh! I can still punish you anytime remember?"</p>' +
					'<p>"Yes! I know, sorry I have to learn my place! I’m adjusting! I will be waiting for you every morning at your house, my ' + perYou.getMaster() + '! If I’m not there, then I’m at my office, waiting for your further commands!"</p>' +
					'<p>Of course you answer "Sounds great, but risky. What if anyone notices a luxurious car in front of my house?"</p>' +
					'<p>Sofia says, "Si, ' + perYou.getPersonName() + '! It’s a problem, but what about I park inside your house’s garage and wait for you there? Your mother takes the family car away to her workplace I presume?"</p>' +
					'<p>You correct her, "No, we do not currently own a car, Mom walks to work. So that should work. Give me your number. I may have to call you for help sometimes. Here’s the keys to my garage! Ohh and don’t worry about those charges. Everything’s arranged. You are no longer a suspect."</p>' +
					'<p>Sofia bursts out in joy, saying prayers to you in spanish and hugging you for a long time. You gave her a new life, a fresh start. After that you exchange numbers with her. The two of you chat about some small matters, but ultimately, you tell her to get back to work. With a hot farewell kiss, she leaves and goes back to her office. You now own a personal driver, all to yourself!</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'leave the interrogation room', 168);
				WritePlaceFooter(md, '', false, true);
				return true;
			}
		}
		
		if (sType == "sofialimosex") {
			md = WritePlaceHeader();
			this.showPersonRandom("sofia-limosex", 2);
			addPlaceTitle(md, this.name + " in the Backseat");

			md.write(
				'<p>You ask ' + this.name + ' to join you in the backseat of the limo. Dutifully she joins you, her expression clearly shows she knows what her duties will be.</p>'
			);

			startQuestionsOnly();			
			// General sex scene in the limo
			addLinkToPlace(md,'"' + this.name + ', time to sit in my lap"', Place, 'type=sofialimofuck');
			addLinkToPlace(md,'"' + this.name + ', help me get comfortable"', Place, 'type=sofialimobj');
			if (perYou.isMaleSex()) addLinkToPlace(md,'"' + this.name + ', let me park something in your cleavage"', Place, 'type=sofialimotitfuck');
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		if (sType == "sofialimofuck") {
			md = WritePlaceHeader(false, !isExplicit() && perYou.isMaleSex() ? '' : 'td-left-large');
			if (perYou.isMaleSex()) this.showPersonRorX("sofia-limosex-fuckb.jpg");
			else this.showPerson("sofia-limosex-fuckg.jpg");
			addPlaceTitle(md, "Riding " + this.name);

			md.write(
				'<p>You tell ' + this.name + ' it is time for her to sit on your lap, in a somewhat intimate way.</p>'
			);

			startQuestionsOnly();
			addLinkToPlaceC(md, 'continue on your way', Place);
			WritePlaceFooter(md, '', false, true);
			return true;
		}
		
		if (sType == "sofialimobj") {
			md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-large' : '');
			if (perYou.isMaleSex()) this.showPersonRorX("sofia-limosex-bjb.jpg");
			else this.showPersonRorX("sofia-limosex-bjg.jpg");
			addPlaceTitle(md, this.name + "\'s Comfort");

			md.write(
				'<p>You ask ' + this.name + ' to help you get comfortable, and she kneels down ready to make you feel a lot more relaxed.</p>'
			);

			startQuestionsOnly();
			addLinkToPlaceC(md, 'continue on your way', Place);
			WritePlaceFooter(md, '', false, true);
			return true;
		}
		
		if (sType == "sofialimotitfuck") {
			md = WritePlaceHeader();
			if (isExplicit()) this.showPersonRandomX("sofia-limosex-titfuck", 2);
			else this.showPerson("sofia-limosex-titfuck.jpg");
			addPlaceTitle(md, "Parking in " + this.name + "\'s Cleavage");

			md.write(
				'<p>You discuss parking with ' + this.name + ', and she gestures towards a garage. You instead gesture at her large breasts and suggest parking your cock <i>there</i>!</p>'
			);

			startQuestionsOnly();
			addLinkToPlaceC(md, 'continue on your way', Place);
			WritePlaceFooter(md, '', false, true);
			return true;
		}
		if (Place != 14) return false;
		
		if (sType == "sofiafuck") {
			md = WritePlaceHeader(false, 'td-left-large');
			if (perYou.isMaleSex()) this.showPerson("sofia-officesex-fuckb.jpg");
			else this.showPerson("sofia-officesex-fuckg.jpg");
			addPlaceTitle(md, "Riding " + this.name);

			md.write(
				'<p>There is more than one way to go for a ride with ' + this.name + ', and some do not even need you to leave the office.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'talk more with ' + this.name, Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "sofiabj") {
			md = WritePlaceHeader(false, perYou.isMaleSex() ? '' : 'td-left-large');
			if (perYou.isMaleSex()) this.showPersonRorX("sofia_charm_male1.jpg");
			else this.showPerson("sofia_charm_female1.jpg");
			addPlaceTitle(md, this.name + "\'s Lift");

			md.write(
				'<p>You ask ' + this.name + ' to give you a lift, she moves to get her keys and then sees you removing your clothing. She realises what you want her to lift and she steps over and kneels down ready to lift <i>you</i>.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'talk more with ' + this.name, Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "sofiatitfuck") {
			md = WritePlaceHeader();
			if (isExplicit()) this.showPersonRandomX("sofia-officesex-titfuck", 2);
			else this.showPerson("sofia-officesex-titfuck.jpg");
			addPlaceTitle(md, "Parking in " + this.name + "\'s Cleavage");

			md.write(
				'<p>You discuss parking with ' + this.name + ', and she gestures towards the garage. You instead gesture at her large breasts and suggest parking your cock <i>there</i>!</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'talk more with ' + this.name, Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "pickupbible") {
			md = WritePlaceHeader();
			this.showPerson("pickup.jpg");
			addPlaceTitle(md, "Sister Desiree Here For the Bible");

			md.write(
				'<p>Angelica smies and walks over to the door and opens the heavy door. Outside you see Sister Desiree standing there fully in her habit, looking very holy and proper. Angelica asks her in and how she can help the nun, and Desiree answers,</p>' +
				'<p>"I am sorry, Mother Superior sent me to apologise but the Holy Bible we sent you a while ago has a small problem. We has said it was to have been blessed by a priest but we accidentally sent you the wrong one. It is just an ordinary book."</p>' +
				'<p>Angelica fetches her bible from upstairs and as she does Sister Desiree steps over and kisses you, she can barely keep her hands off of you. She steps back a moment before Angelica returns and asks for the book. She makes a pretense to examine it, and says,</p>' +
				'<p>"My dear, I will take this back to the Church and have it blessed immediately and will return it as soon as possible. It may be a day or two at most. Again my sincere apologies, let me pray for you and offer my blessings"</p>' +
				'<p>Angelica lights a candle and they both pray, you can see Angelica is devout and a bit sorry to be deceiving her like this, and resolve to actually return the book to her once you have made her your personal bimbo chauffeur.</p>' +
				'<p>They finish praying and Sister Desiree puts the book under her robes and prepares to leave.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'say goodbye to Sister Desiree', Place, '', 'As soon as she leaves you can feel a subtle change in the room, the power of the spell on the book is gone.', '', "setPersonFlag('Sofia',15)");
			AddPeopleColumn(md);
			findPerson("Desiree").showPerson("pickup.jpg");
			WritePlaceFooter(md);
			return true;			
		}
		
		if (sType === "angelicacharm1") {
			md = WritePlaceHeader();
			perYou.completeQuest(7);
			this.showPerson("sofia-office-charm1.jpg");
			addPlaceTitle(md, "Angelica Under a Charm Spell");

			md.write(
				'<p>You cast your spell now that her protection has been removed and suggest to Angelica that she is feeling hot and needs to loosen her clothing.</p>' +
				'<p>Angelica immediately removes her cap and pulls off her top suductively. With her rather flirtaceous manner it is possible she is just playing, but her eyes are glinting with the spell. She asks you,</p>' +
				'<p>"I am really hot, I am not sure this is enough for me?"</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'agree she is one hot slut', Place, 'type=angelicacharm2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType === "angelicacharm2") {
			md = WritePlaceHeader();
			this.showPerson("sofia-office-charm2.jpg");
			addPlaceTitle(md, "Angelica Under a Charm Spell");

			md.write(
				'<p>You expected Angelica to react or comment on you calling her a slut but she just laughs and fully exposes her large breasts and almost presents them to you, saying,</p>' +
				'<p>"Hotter than that little girl in the mansion, hotter than you can handle!" You are not sure she is hotter than Sarah or at least in a different way, but you are not about to say that. Instead you agree she is one hot piece of ass, and she laughs,</p>' +
				'<p>"And tits, the best money could buy and my lips and everything else I could afford!". This confirms your suspicion she has been enhanced and you tell her...'
			);

			startQuestions();
			addLinkToPlaceC(md, '"You are one hot bimbo slut"', Place, 'type=angelicacharm3');
			WritePlaceFooter(md);
			return true;
		}
		if (sType === "angelicacharm3") {
			md = WritePlaceHeader();
			this.showPerson("sofia-office-charm3.jpg");
			addPlaceTitle(md, "Angelica Under a Charm Spell");

			md.write(
				'<p>Angelica giggles and is about to say something, probably denying she is a bimbo and you continue before she does,</p>' +
				'<p>"A hot, sexy woman who loves fast cars, partying and sex. A complete bimbo, and there is nothing wrong with that. Who needs any intellectual pursuits when you look that good!"</p>' +
				'<p>The words clearly have impact on her and they are not far from the truth anyway from what you know of her. You push a bit further,</p>' +
				'<p>"What you really need is someone to care for you and tell you what to do, to be your ' + this.getYourNameFor() + ', your ' + perYou.getMaster() + ', to make all the decisions as you just enjoy yourself!". Angelica smiles,</p>' +
				'<p>"Well I like that, I never really wanted to do much besides have fun, "' + this.getYourNameFor() + '" so lets do this, tell me what now, let\'s fuck!"</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, perYou.isMaleSex() ? '"Hell yeah bimbo, put those lips to good use on my cock!"' : '"Hell yeah bimbo, live up to your name and be an angel of a licker!"', Place, 'type=angelicacharm4');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType === "angelicacharm4") {
			md = WritePlaceHeader();
			if (perYou.isMaleSex()) this.showPersonRorX("sofia_charm_male1.jpg");
			else this.showPerson("sofia_charm_female1.jpg");
			addPlaceTitle(md, "Bimbo Angelica Under a Charm Spell");

			if (perYou.isMaleSex()) {
				md.write(
					'<p>Angelica obeys your order without hesitation. She kneels down and starts to suck your cock. The joy this brings to you can’t be described. You are definitely in heaven right now. She services your cock like it’s some kind of an instrument and she plays the most beautiful song you ever heard during a blowjob. The sound her mouth makes just add to the effect.</p>'
				);
			} else {
				md.write(
					'<p>Angelica obeys your order without hesitation. She kneels down and slowly caressing your clit with her mouth in the process. You lay on the chair and enjoy her service. Her commitment is inspiring. She twirls her tongue like a professional and uses her hands to help your vagina relax. As if that wasn’t enough to convince you of her skills, her muffled voice can be heard when she takes short pauses.</p>'
				);
			}
			md.write(
				'<p>You pull her closer to you and kiss her and your enbrace becomes more and more passionate as you enjoy each others bodies though several mutual orgasms.</p>' +
				'<p>After Angelica tells you she will quit her job here and move in with you, and you realise ' + perGates.getPersonNameShort() + ' is sure to become suspicious of what happened to his new chauffeur. Instead you tell her to keep working here, after all it is more money for her to look good with and a limo for you to play with...sometimes.<p>' +
				'<p>Angelica of course agrees but tells you she usually works in the mornings but is always free in the afternoons and evenings. She then asks "What now ' + this.getYourNameFor() + '?"</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'consider what to tell your bimbo to do next', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType !='breakin') return false;

		if (getHour() > 9) {
			// Ran out of time!
			ClearComments();
			md = WritePlaceHeader(false, 'td-left-med');
			this.showPerson("sofiafail.jpg");
			addPlaceTitle(md, "Too Late!");
			md.write(
				'<p>You hear a car arriving and parking inside the garage. Damn! You are too late, Sofia is back! A few silent moment passes as you try think your way out of this, but suddenly you hear Sofia’s hig-heeled shoes rapidly clacking and withing a second, she is standing in front of you.</p>' +
				'<p>"You?! Here?!! I should have known better…you won’t leave me alone won’t you?" she huffs and puffs. Sofia angrily puts her hands on her waist and blocks the exit.</p>' +
				'<p>"Well! You will never get me, you bastard! I see no other choice, I have to move on!" with her sentence finished, Sofia shuts the door behind her and runs away. Before you could realise what’s happening she already hopped in the car and you hear tires screeching and an engine running. She drives away! Sofia left and you are pretty sure you will never see her again. What a shame! She could have been a trustworthy servant…</p>'
			);
			this.moveThem(999);
			startQuestions();
			addLinkToPlace(md, 'leave the garage', 15);
			WritePlaceFooter(md);
			return true;
		}

		if (this.checkFlag(18) && this.checkFlag(19) && this.checkFlag(22)) {
			// Done! Found everything
			md = WritePlaceHeader();
			this.setFlag(15);
			addPlaceTitle(md, "Complete!", "steeldoor.jpg");
			md.write(
				'<p>Okay! You’ve got enough evidence against Sofia. You organize everything back to it’s place, as if you were never here and exit through the front door! Now it’s the time to put the second part of your plan in motion!</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'get out of here', 15);
			WritePlaceFooter(md);
			return true;
		}

		var sArea = getQueryParam("area");

		if (sArea == "office") {

			md = WritePlaceHeader(false, 'td-left-med');
			addPlaceTitle(md, "Sofia\'s Office", "sofiasoffice.jpg");

			md.write(
				'<p>The room looks like a small work station with few basic furniture, a coffee table, chairs, some houseplants and one or two paintings. There is a door which leads to the upper floor of the place. That is where Sofia’s bedroom is located. Other than that there’s another wooden door that connects the office with garage, where the family’s cars are stored.</p>'
			);
			if (this.isCharmedBy()) {
				md.write(
					'<p>Sofia is not here in her office. She must be out doing some errands. The office is just as you have remembered; bright and colorful. There\'s nothing remotely interesting upstairs to you and you don\'t want to rummage Sofia\'s bedroom again.</p>'
				);
			}

			startQuestions();
			addLinkToPlace(md, 'examine the coffee table', 14, 'type=breakin&area=office', "<img src=\\'Images/Items/coffeetable.jpg\\' style=\\'width:50%;float:right;margin:0 0 1em 5px\\' alt=\\'Table\\'>Aside from a few books and magazines, there’s nothing interesting on the coffee table. It looks pretty cool though, but that doesn’t help you now.", '', '', undefined, undefined, true);
			addLinkToPlace(md, 'check the wooden door', 14, 'type=breakin&area=office', "<img src=\\'Images/woodendoor.jpg\\' style=\\'width:25%;float:right;margin:0 0 1em 5px\\' alt=\\'Door\\'>You are pretty sure there’s nothing relevant at the other side of that door at the moment. You will run out of time if you mess around too much. You can explore the Garage later.", '', '', undefined, undefined, true);
			if (whereItem(61) === 0) addLinkToPlace(md, 'look at the houseplants', 14, 'type=breakin&area=office', "<img src=\\'Images/Items/houseplants.jpg\\' style=\\'width:50%;float:right;margin:0 0 1em 5px\\' alt=\\'Plants\\'>Small green plants occupy one of the shelf. It looks like Sofia has been taking good care of them. They give the room a warm feeling and nice colour. There is shiny object behind of them.", '', "setPersonFlag('Sofia',16)", undefined, undefined, true);
			else addLinkToPlace(md, 'look at the houseplants', 14, 'type=breakin&area=office', "<img src=\\'Images/Items/houseplants.jpg\\' style=\\'width:50%;float:right;margin:0 0 1em 5px\\' alt=\\'Plants\\'>Small green plants occupy one of the shelf. It looks Sofia has been taking good care of them. They give the room a warm feeling and nice colour.", '', '', undefined, undefined, true);
			if (!this.isCharmedBy()) {
				if (whereItem(61) === 0 && this.checkFlag(16)) addLinkToPlace(md, 'inspect the shiny object', 14, 'type=breakin&area=office', "<img src=\\'Images/Items/brasskeyontable.jpg\\' style=\\'width:50%;float:right;margin:0 0 1em 5px\\' alt=\\'Key\\'>What do we have here… some kind of key, hidden behind one of the plants.", '', "PlaceI(61,14)", undefined, undefined, true);
				addLinkToPlace(md, 'go upstairs', 14, 'type=breakin&area=upstairs');
			}
			WritePlaceFooter(md);
			return true;
		}

		if (sArea == "upstairs") {

			md = WritePlaceHeader(false, 'td-left-med');
			AddImage("sofiasbedroom.jpg");
			if (this.checkFlag(17)) AddImage("Items/briefcase.jpg", "50%");
			addPlaceTitle(md, "Sofia\'s Bedroom");

			md.write(
				'<p>This must be Sofia’s bedroom. It has a great cozy feel to it and a relaxing vibe fills the air. It’s small, but comfy and Sofia has a great taste in colour.</p>'
			);

			startQuestions();
			addLinkToPlace(md, 'look under the bed', 14, 'type=breakin&area=upstairs', "<img src=\\'Images/Items/briefcase.jpg\\' style=\\'width:50%;float:right;margin:0 0 2em 5px\\' alt=\\'Briefcase\\'>After a few moments of rummaging through the boxes which are under Sofia’s bed you find a briefcase. It’s locked.", '', "setPersonFlag('Sofia',17)", undefined, undefined, true);
			addPopupLink(md, "inspect laptop", "Emails",
				"<img src='Images/sofiasemail.png' style='width:100%;margin:0 0 1em 0' alt='Email'>" +
				"There’s a Laptop at the end of the nightstand, connected to a power dispenser. The computer is on, so you decide to dive into Sofia’s letters. Upon a thorough search through her emails, you find a compromising letter sent to Sarah Gates from Sofia! It’s only a few days old, so it must have been written after the death of Sir Gates.",
				true, "setPersonFlag('Sofia',19)"
			);
			addLinkToPlace(md, 'check out the wardrobe', 14, 'type=breakin&area=upstairs', "<img src=\\'Images/wardrobe.jpg\\' style=\\'width:50%;float:right;margin:0 0 2em 5px\\' alt=\\'Wardrobe\\'>There are dresses, shoes, boxes all perfectly organized inside the wardrobe. There are also at least 2 or 3 copies of the same uniform Sofia is wearing as  the chauffeur dress. These must be the reserved ones. Hmm…wait, there’s something else that catches your eyes! There are small scratch marks behind one of the shelf. You can’t see clearly what it is, but it must be something worth investigating!", '', "setPersonFlag('Sofia',20)", undefined, undefined, true);
			if (this.checkFlag(21)) addLinkToPlace(md, 'enter secret area', 14, 'type=breakin&area=secretroom');
			addLinkToPlace(md, 'go downstairs', 14, 'type=breakin&area=office');
			WritePlaceFooter(md);
			return true;
		}

		if (sArea == "secretroom") {

			md = WritePlaceHeader(false, 'td-left-med');
			addPlaceTitle(md, "Sofia\'s Bedroom", "sofiassecretroom.jpg");

			md.write(
				'<p>The hidden room feels more like a great hideaway spot rather than an actual room. It’s quite obvious that someone lived here for a while. There are food and books packed together in a corner and a hastily made bed has been used several times. You decide to scour trough the columns of book. Most of them are fictional novels, travel guides or spiritual essays, but one book catches your attention. It’s Sofia’s handwritten diary!</p>'
			);

			startQuestions();
			addPopupLink(md, "read the diary", "Sofia\'s Diary",
				"<img src='Images/sofiasdiary.jpg' style='width:100%;margin:0 0 1em 0' alt='Diary'>" +
				"Sofia’s diary details her experiences in a new country as an outsider. Her life seems to be a harsh one, all alone in an unkown world and now one of her closest friend is dead. You feel a bit emphatic towards her and understand her motives after you’ve read into her diary.",
				true, "setPersonFlag('Sofia',22)"
			);
			addLinkToPlace(md, 'return to the bedroom', 14, 'type=breakin&area=upstairs');
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var nm = this.getPersonNameShort();
		this.showPersonRandom("poledance", 2);
		addPlaceTitle(md, this.getPersonName() + "'s Dance");
		md.write(
			'<p>' + nm + ' arrives wearing some very skimpy lingerie, and gives an odd, almost animalistic performance. She is certainly not experienced but she is still very good!</p>' +
			'<p>After she sits with you for a while quietly. She looks a little embarrassed but when you ask she confessess to enjoying the performance..</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};


	// Cast a spell on them
	per.handleItem = function(no, cmd)
	{
		if (cmd != 2) return "";

		if (no == 14) {
			// Casting the charm spell
			// At the Garage and she is present?
			if (Place == 14 && this.isHere() && !this.isCharmedBy()) {
				if (!this.checkFlag(2)) {
					addComments("You do not know her name, so the spell will not work.");
					return "handled";
				}
				if (isMurderPath() || !this.checkFlag(15)) {
					ClearComments();
					dispPlace(Place, "type=charm");
					return "nofooterconverse";
				} else {
					ClearComments();
					CastCharmSpell("Sofia", Place, 1, "type=angelicacharm1");
					return "nofooterconverse";					
				}
			}
			if (Place == 175 && this.isHere()) {
				ClearComments();
				CastCharmSpell("Sofia", 175, 1, "type=charm1");
				return "nofooterconverse";
			}
		} else if (no == 11) {
			// Casting the Pass spell
			// At the Garage and she is present and ready to break-in
			if (Place == 15) {
				if (isMurderPath()) {
					if ((getHour() > 7 && getHour() < 10) && this.checkFlag(14) && !this.checkFlag(15) && this.whereNow() != 999) {
						this.setFlag(23, false);
						ClearComments();
						dispPlace(14, "type=breakin&area=office");
						return "nofooterconverse";
					} else {
						// another time, so no!
						if (this.isCharmedBy()) addComments("Upon entering the Garage area through the main door after Sofia has been charmed and she is not currently there.</p><p>The Player can only stay at the office, the upstairs area is not interesting to them anymore.");
						else addComments("It is too dangerous, Sofia could return anytime");
						return "handled";
					}
				}
			}
		} else if (no == 61 && Place == 14 && this.checkFlag(17) && sType == 'breakin' && getQueryParam("area") == "upstairs") {
			addComments("<img src='Images/files.jpg' style='width:50%;float:right;margin:0 0 1em 5px' alt='Files'>The key fits the lock and the briefcase cracks open! There are dozens of files inside and among them there is a fake passport too. You read some of these and it turns out that Sofia had trouble with the law before! She crossed the country’s border illegally and authorities were looking for her! The documents all date back about a year ago, that would explain why you or Mayor Thomas didn’t know her! She is a newcomer to this country!");
			this.setFlag(18);
			return "handled";
		} else if (no == 15 && Place == 14 && !this.checkFlag(21) && sType == 'breakin' && getQueryParam("area") == "upstairs") {
			addComments("<img src='Images/hiddendoor.jpg' style='width:25%;float:right;margin:0 0 1em 5px' alt='Door'>The whole wardrobe is rigged to a mechanism! The shelf reveals a small switch. As you push it, the wardrobe splits open with a loud squeak. It leads to a secret area.");
			this.setFlag(21);
			return "refresh";
		}
		return "";		// do nothing
	};

	per.showPersonChat = function(bGeneral, md)
	{
		if (isMurderPath()) return this.showPersonChatMurder(bGeneral, md);
		return this.showPersonChatApprentice(bGeneral, md);
	};

	per.showPersonChatApprentice = function(bGeneral, md)
	{
		if (Place == 14 && this.isHere() && sType === "") {
			if (this.isCharmedBy()) {
				// General sex scene
				addLinkToPlace(md,'"Angelica, time for a ride"', Place, 'type=sofiafuck');
				addLinkToPlace(md,'"Angelica, give me a lift"', Place, 'type=sofiabj');
				if (perYou.isMaleSex()) addLinkToPlace(md,'"Angelica, let me park something in your cleavage"', Place, 'type=sofiatitfuck');
				this.addSleepLink(md, "take Angelica upstairs to bed for the night", "Bedding Angelica",
					'<p style="position:absolute;left:30%;bottom:2em;cursor:pointer;font-size:1.1em;width:65%">You take upstairs to her bedroom and tell her to strip and get ready for you. She gets ready to take you wherever you wish this night.',
					'sofia-bed.jpg'
				);

			} else {
				// Uncharmed
				if (!this.checkFlag(2)) {
					addQuestionR(md, '"Ohhh….hi! The name\'s ' + perYou.getPersonName() + '! I haven’t seen you around before."',
						'"Hi there, I\'m Angelica! My parents call me Angie but I prefer the full Angelica, as I am an Angel of a..." and she licks her lips in an exaggerated way. She then laughs and then continues,</p>' +
						'<p>"Did the Boss..I mean ' + perGates.getPersonNameShort() + ' send you for a ride?" she smiles again and put her hands on her hips and looks you up and down.</p>' +
						'<p>She is rather flirtaceous, and you get the impression she may not be particularly interested in intellectual discussions of the occult, but you may be just leaping to assumptions.',
						"Chauffeur Angelica",
						"setPersonFlag(\\'Sofia\\',2)"
					);
				} else if (!this.checkFlag(3)) {
					addQuestionR(md, '"Who are you?"',
						'"I am the new family chauffeur, I only started recently. The last chauffeur had to leave suddenly. The boss seemed bummed out from what I could see, but I do not think he was boning her. I think they just got on really well." she hesitates,</p>' +
						'<p>"Sorry I did not mean to be disrespecful or nothing, I like ' + perGates.getPersonNameShort() + ' and all! So are you here for a ride?"</p>' +
						'<p>Definitely a flirt!',
						"Chauffeur Angelica",
						"setPersonFlag(\\'Sofia\\',3)"
					);
				} else if (!this.checkFlag(4)) {
					addQuestionR(md, '"No I am ' + perGates.getPersonNameShort() + '\'s student I am just exploring"',
						'"Oh, neat, I was never much into books and that stuff, there are more fun things to do than read" she hesitates again,</p>' +
						'<p>"Sorry again, great you like it I just prefer cars and parties!" she pauses :"The boss does not need me much around here, mainly in the mornings so I have all afternoon to get ready for a fun night!"</p>' +
						'<p>Alright you had been hesitating to use the word but she is a bimbo, no two ways about it. Not that there is anything wrong with that, especially for someone about to join your harem!',
						"Chauffeur Angelica",
						"setPersonFlag(\\'Sofia\\',4);"
					);					
				} else if (!this.checkFlag(5)) {
					addQuestionR(md, '"What do you think about Sarah?"',
						'She replies, &quot;I like her! she is a smart lady. By the way she is <b>actually</b> his neice not his young piece of ass. Such a nice..."</p>' +
						'<p>"Sorry again..." and you tell her it is fine and to continue and she looks around theatrically, "She has a great figure and she is such a dominant slut, she is my kind of girl!"',
						"Chauffeur Angelica",
						"setPersonFlag(\\'Sofia\\',5)"
					);
				} else if (!this.checkFlag(6)) {
					addQuestionR(md, '"What about her relationship with Lauren?"',
						'She replies, "Everyone needs a big titted submissive don\'y they?" and she smiles as she briefly cups her breasts laughing!',
						"Chauffeur Angelica",
						"setPersonFlag(\\'Sofia\\',6)"
					);
				}
				if (perYou.isQuestStarted(7)) {
					if (!this.checkFlag(7)) {
						addQuestionR(md, '"Did ' + perGates.getPersonNameShort() + ' give you a gift?"',
							'She replies, "Sort of, he knows I go to church and arranged a special, blessed Bible for me! Really nice of him!"</p>' +
							'<p>You ask to see it, and she looks coy, and asks for your phone number, and says "I\'ll send you some pics later but not now."</p>' +
							'<p>You doubt you will get anything more from her on this now',
							"Chauffeur Angelica",
							"setPersonFlag(\\'Sofia\\',7)"
						);
					}
				}			
			}
		}
		if (!this.isCharmedBy()) {
			if (Place == 192 && sType === "") {
				if (this.checkFlag(2)) {
					if (!this.checkFlag(26)) {
						addQuestionR(md, '"What can you tell me about Angelica, the family chauffeur?"',
							'Sarah tells you, &quot;What a nosy little apprentice you are! Uncle Ronnie only recently hired her after Sofia left us. He was quite upset, he rather liked Sofia. I do not think he spent too long picking Angelica, he is not really into bimbos and she really lives that lifestyle. I like her for that, but she is good as a chauffeur and that is all Uncle Ronnie hired her for.&quot;</p>' +
							'<p>You agree on how much of a flirt she seems to be and her somewhat \'inflated\' appearance. Sarah grins and answers,</p>' +
							'<p>"Dont\'t you think about doing anything magical to her. Uncle Ronne has her protected, he gave her a bible saying it was from the Holy Mother over at the church, but it has some sort of protection on it. Make sure it stays with her or at least in her rooms, if it were removed I am sure she would be completely vulnerable"</p>' +
							'<p>She does not wink or anything overt like that but with that fairly clear instruction she did not have to!',
							"Sarah",
							"setPersonFlag(\\'Sofia\\',26);setPersonFlag(\\'Sofia\\',11)"
						);
					}
				}
			}			
			if (Place == 17 && sType === "") {
				if (this.checkFlag(2)) {
					if (!this.checkFlag(12)) {
						addQuestionR(md, '"What can you tell me about Angelica, the family chauffeur?"',
							perGates.getPersonNameShort() + ' looks at you dismissively, " Do not bother with her, she is just an employee, she has nothing to do with our work and the occult"',
							perGates.getPersonNameShort(),
							"setPersonFlag(\\'Sofia\\',12)"
						);
					}
				}
			}
			if (Place == 384 && sType === "" && this.checkFlag(11) && !this.checkFlag(14) && isCharmedBy("Daria")) {
				// Mother Superior post charm, with/without Sister Desiree
				addQuestionR(md, '"Daria can you help me with the bible that was given to Angelica?"',
					'You explain to Daria that you need to bring Angelia into your service but you need for a time to remove the bible that was given to her by the Church. Daria replies,</p>' +
					'<p>"Of course, ' + perYou.getLord() + ', when you are ready I will send Sister Desiree to retrieve the bible to be blessed. Please <b>call her</b> and she will join you there for your holy mission!"</p>',
					"Daria",
					"setPersonFlag(\\'Sofia\\',14)"
				);
			}
			if (Place == 332 && sType === "" && this.checkFlag(11) && isPersonHere("Desiree") && !this.checkFlag(13)) {
				// Sister Desiree, pre/post charm 
				addQuestionR(md, '"Can you help me with Angelica\'s Bible?"',
					(isCharmedBy("Desiree") ?
						'You explain to Sister Desiree that you need to remove the Bible she was given from the church for a time and ask her to assst. Regretfully she answers,<p>' +
						'<p>"I am sorry but Mother Superior does not allow her nuns to leave the grounds of the church. I would do anything for you, if you were to ask her permission I would be happy to help you!"' :
						'You explain to Sister Desiree that you suspect there is a problem with the bible that was given to Angelica, and if possible could a replacement be arranged. She looks at you regretfully,</p>' +
						'<p>"I am sorry but Mother Superior does not allow her nuns to leave the grounds of the church, you will have to seek her permission"'),	
					"Sister Desiree",
					"setPersonFlag(\\'Sofia\\',13)"
				);
			}	
		}
	}
	
	per.showPersonChatMurder = function(bGeneral, md)
	{
		if (Place == 14 && this.isHere() && sType === "") {
			var ss = perYou.isMaleSex() ? "señor" : "señorita";
			if (this.isCharmedBy()) {
				// Charmed
				if (!this.checkFlag(9)) {
					addQuestionR(md, '"I’m a little bit worried..."',
						'You ask Sofia &quot;I’m a little bit worried. Won’t the people gossip about me if they see me in car like this?&quot;</p>' +
						'<p>Sofia answers, &quot;Don’t, mi ' + (perYou.isBornMale() ? 'amo' : 'Señora') + '! The windows are darkened, no one can see through them! And they will think that I still drive Sarah around and not you anyway. They don’t care.&quot;</p>' +
						'<p>You then ask, &quot;What about you? The townsfolk hardly even know you, if only one of them start to question your actions and behaviour then it would cause a lot of pain to me.&quot;</p>' +
						'<p>Sofia answers &quot;You worry too much ' + perYou.getPersonName() + '! You have more important matters to care about. These are things that I will take care of. You will never get into trouble while I’m around. Just let me put my skills at your service and be your driver…and sirvienta…I mean your servant.&quot;',
						"Sofia",
						"setPersonFlag(\\'Sofia\\',9)"
					);
				} else if (!this.checkFlag(10)) {
					addQuestionR(md, '"You speak our language very well. How come?"',
						'&quot;Sofia: Gracias, mi ' + (perYou.isBornMale() ? 'amo' : 'Señora') + '! I had big dreams when I decided to come here. You see, back in my home country, México, there was no chance I could live the life I wanted to be. The poverty grew while the opportunities became thinner each passing day. I knew I had to leave. So I started to self educate myself in many things, for example your language. My ambitious plan was to become a citizen here and go to university…I yearned to become a lawyer.&quot;</p>' +
						'<p>You query, &quot;Lawyer, huh? That’s a far stretch from where you are now.&quot;</p>' +
						'<p>Sofia answers &quot;I…emm…you are correct, as always…in everything. Still, this chica ain’t that stupid as she look and can still be an asset to you!&quot; Sofia playfully shows her body with her hands. She continues.</p>' +
						'<p>&quot;I don’t care about my stupid dreams anymore. I want nothing else than to be of service to you and if that means all I will do for the rest of my life is drive you around then I will do it with the biggest smile on my face. I just wanted to point out that I have a brain that you can also use anytime!&quot; Sofia grins like a little devil.</p>' +
						'<p>You say &quot;I know…I know. Maybe one day, if I’m in a good mood, I will let you fulfill some of those old ambitions you had. I could always use a well educated girl like yourself you see…&quot;</p>' +
						'<p>Sofia answers &quot;I hope so. I didn’t come this far and become your slave to not fulfill my destiny! I’m going to climb the ranks of your harem and become a head-slave to you!&quot; Sofia proudly presents her wish to you. You know she is half-joking, but you like the idea of having some kind of order in your harem.',
						"Sofia",
						"setPersonFlag(\\'Sofia\\',10)"
					);
				} else {
					// General sex scene
					addLinkToPlace(md,'"Sofia, time for a ride"', Place, 'type=sofiafuck');
					addLinkToPlace(md,'"Sofia, give me a lift"', Place, 'type=sofiabj');
					if (perYou.isMaleSex()) addLinkToPlace(md,'"Sofia, let me park something in your cleavage"', Place, 'type=sofiatitfuck');
					this.addSleepLink(md, "take Sofia upstairs to bed for the night", "Bedding Sofia",
						'<p style="position:absolute;left:30%;bottom:2em;cursor:pointer;font-size:1.1em;width:65%">You take upstairs to her bedroom and tell her to strip and get ready for you. She gets ready to take you wherever you wish this night.',
						'sofia-bed.jpg'
					);
				}
			} else {
				// Uncharmed
				if (!this.checkFlag(2)) {
					addQuestionR(md, '"Ohhh….hi! The name\'s ' + perYou.getPersonName() + '! I haven’t seen you around before."',
						'&quot;¿Quién eres?! ¿Qué haces aquí?!&quot;, the woman barks at you in language you don&rsquo;t understand. It&rsquo;s spanish. She looks startled and it feels like you have caught her in a middle of something. Her expressions changes quickly and continues in broken english.</p>'  +
						'She continues, &quot;Sorry ' + ss + '. No hablo muy bien ingles…I don&rsquo;t speak english good…I’m Sofia. How I help you?&quot;, she calms down a bit. Now she seems more terrified you of than being angry. She nervously tip-toes and gathers her thoughts.',
						"Chauffeur Sofia",
						"setPersonFlag(\\'Sofia\\',2)"
					);
				} else if (!this.checkFlag(3)) {
					addQuestionR(md, '"Who are you?"',
						'&quot;I be driver to Master Gates. He be my el Jefe…I work for him…Coche…Carro…I mean car! You know!&quot;, Sofia gestures and acts like she is driving a car, even making weird sounds with her mouth. It’s obvious you won’t get a lot of information from her.',
						"Chauffeur Sofia",
						"setPersonFlag(\\'Sofia\\',3)" + (!isMurderPath() ? ";setPersonFlag(\\'Sofia\\',4);setPersonFlag(\\'Sofia\\',5)" : "")
					);
				} else if (!this.checkFlag(4)) {
					addQuestionR(md, '"I’m sorry for your loss..."',
						'&quot;I&rsquo;m sorry for your loss. I didn’t know Sir Ronald well, but he seemed like a nice person.&quot; you lie. Maybe you could get some emotion out of her with this topic.</p>' +
						'<p>She replies &quot;Sí! Ronald fue un gran hombre! He was special…and I was not here when he died…es una pena…I could not help him…I be away far!&quot; The raven-haired woman’s emotions look very real. She grasps the back of one of the chairs in her nervousness. It is clear that she is in a lot of pain..',
						"Chauffeur Sofia",
						"setPersonFlag(\\'Sofia\\',4)"
					);
				} else if (!this.checkFlag(5)) {
					addQuestionR(md, '"What do you mean? You were with Sarah?"',
						'She replies, &quot;Please ' + ss + '! I don’t want to talk anymore…about it! ¿En qué puedo ayudarle? Can I help you in anything else?&quot;. Sofia takes deep breaths between each sentence, like she is checking each word a thousand times before saying them.</p>' +
						'<p>You decide to drop the subject. She is of no use to you in this form anyways. The language differences only make it harder to cooperate.',
						"Chauffeur Sofia",
						"setPersonFlag(\\'Sofia\\',5)"
					);
				} else if (this.checkFlag(5)) {
					if (!this.checkFlag(6)) {
						addQuestionR(md, '"What do you think about Sarah?"',
							'She replies, &quot;I like her! ' + (isMurderPath() ? 'She is my boss now. ' : '') + 'La señora Sarah is a kind lady! She shows  gran simpatía…to me!&quot; Sofia is filled joy and smiles dreamily to herself.',
							"Chauffeur Sofia",
							"setPersonFlag(\\'Sofia\\',6)"
						);
					}
					if (!this.checkFlag(7) && (isMurderPath() && checkPersonFlag("Lauren", 1)) || (!isMurderPath() && checkPersonFlag("Lauren", 10))) {
						addQuestionR(md, '"What about her relationship with Lauren?"',
							'She replies, &quot;No…no… ' + ss + '.  That is not your business. Leave this alone por favor!&quot;, her overprotective nature turns her into like a mother who is defending her child. She won’t discuss this matter with you further.',
							"Chauffeur Sofia",
							"setPersonFlag(\\'Sofia\\',7)"
						);
					}
					if (!this.checkFlag(8)) {
						addQuestionR(md, '"Can you show me around the garage? Can I see the cars?"',
							'She replies, &quot;Absolutely not! Only señora Sarah or someone who…she aprobar…you see... only who she approves!&quot; Sofia’s fierce loyalty to her employers is admirable, but her stubbornness are getting on your nerves!',
							"Chauffeur Sofia",
							"setPersonFlag(\\'Sofia\\', 8)"
						);
					}
				}
			}
		}
		if (Place == 110 && wherePerson("Mayor") == 110 && !this.checkFlag(11) && perYou.isQuestStarted(7) && isCharmedBy("Mayor") && sType === "") addLinkToPlaceC(md, '"Do you know a woman named Sofia, my dear slave?"', 110, 'type=asksofia1');
		if (Place == 95 && this.checkFlag(12) && !this.checkFlag(13)) addLinkToPlaceC(md, '"Yes! Where do you know her from?"', 95, 'type=asksofia2');
		if (Place == 168 && this.checkFlag(13) && !this.checkFlag(14) && wherePerson("OfficerBatton") == 168) addLinkToPlaceC(md, 'discuss your plans for Sofia', 168, 'type=asksofia3');
		if (Place == 192 && sType === "") {
			if (this.checkFlag(1)) {
				if (isCharmedBy("Sarah") && !this.isCharmedBy() && !this.checkFlag(27)) {
					addQuestionR(md, '"Sarah, can you help me bring Sofia under my control?"',
						'You ask &quot;Sarah, can you help me bring Sofia under my control? She is wearing a ring that protects her from my spells.&quot;</p>' +
						'<p>Sarah answers &quot;Please, believe me ' + perYou.getMaster() + ' I really want to help, but some part of me inside protests against charming my beloved friend. I can’t really understand my feelings myself too, but I’m afraid I am no use to you…&quot;</p>' +
						'<p>You tell her, &quot;You are my slave…I don’t understand. You have to obey if I tell you something. What’s wrong with you?!&quot;</p>' +
						'<p>Sarah pleads, &quot;I beg of you, ' + perYou.getMaster() + ' to forgive me! It looks like there’s still a side of me left that you can’t control… or at least parts of my old self remains. I will have to look into further, but it’s just that I can’t open my mouth and tell you anything when I think about Sofia…&quot;</p>' +
						'<p> You tell her,  &quot;I’m disappointed in you, Sarah. We will have to return to this matter one day soon. Rarely do my slaves reject my orders…You are a strong person… &quot;</p>' +
						'<p>Sarah replies,  &quot;My uncle taught me a lot of things. This must be one of his tricks that I’m not fully under your control. About Sofia…I know what’s coming is inevitable. She will join me soon, I know you will find a way, ' + perYou.getMaster() + '. Again, forgive me for that I can’t aid you more. &quot;',
						"Sarah",
						"setPersonFlag(\\'Sofia\\',27)"
					);
				}
			}
		}
	};

	per.isPhoneable = function() {
		if (checkPlaceFlag("Hotel", 11) && Place == 269 && this.isCharmedBy()) return true;
		return perYou.isQuestComplete(7) && isOutside() && isMurderPath(); 
	};

	per.callThem = function()
	{
		if (Place == 269) {
			var bMurder = isMurderPath();
			if ((bMurder && (getHour() > 7 && getHour() < 10)) || (!bMurder && getHour() >= 8 && getHour() < 13)) WriteComments("You call " + this.name + " to invite her to join you at the pool for a swim, but there is no answer, she must be out driving");
			else {
				gotoPlace(Place, 'type=sofiapool');
				receiveCall('', 'You call ' + this.name + ' to invite her to join you at the pool for a swim, and she answers, "I\'ll be there".');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}			

		if (!isMurderPath()) return;
		// Phone them for a lift
		WaitHereOnly(3);
		carRide('Sofia',
			'Sofia arrives shortly after your call. She’s pretty precise and you didn’t have to wait for her too long. She closes the door for you and after saluting to you, she occupies the driver’s seat and turns her head. &quot;Where do you wish to go?&quot;',
			'. After you have chosen a selected designation and you arrive at said destination.</p><p>After opening the door for you and waits for you to ready yourself, Sofia hops back into the car and drives off to let you stay low profile.'
		);
	};

	per.addPersonPhoneCall = function() {
		if (isMurderPath()) {
			if (Place == 14 && !this.checkFlag(23) && sType == 'breakin' && isMurderPath() && (nTime % 288) > 113) {
				// Warning SMS from Officer Batton
				if (makeCall(true, 210)) this.setFlag(23);
			}
			return false;
		}
		if (Place != 14 && this.checkFlag(7) && !this.checkFlag(9)) {
			// Holy book SMS
			if (makeCall(true, 143)) this.setFlag(9);
		}
		if (Place != 14 && this.isCharmedBy() && this.hoursCharmed() > 12 && !isDay() && !this.checkFlag(10)) {
			// Holy book returned SMS
			if (makeCall(true, 144)) this.setFlag(10);
		}		
		return false;
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			case 143: return receiveSMS('Angelica', 'Lovely right? The good book handed to me by the holy mother herself!', 'sms1.jpg') + replyToSMS('Holy cow!');
			case 144: return receiveSMS('Bimbo Angelica', 'The cute nun just returned my bible!', 'sms2.jpg');
		}
		return '';
	};
	
	per.isSMSImageDressVersion = function(id) { return id == 143; };

}
