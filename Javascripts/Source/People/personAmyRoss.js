// Amy Ross

function initialiseAmyRoss()
{
	// Amy Ross
	addPerson("Amy Ross", 0, "Amy", 'Brunette', false);
	
	per.getPersonNameShort = function() { return "Amy"; };	
	
	per.getPersonAddress = function() { return "5 Cherise Rd, Glenvale"; };

	per.getPossessionFace = function() { return "amy" + this.getSuffix('u') + "-face"; };
	
	per.getSuffix = function(def) {
		if (def === undefined) def = '';
		if (this.getCharmedLevel() == 4) return 's';
		if (this.isCharmed()) return 'g';
		return this.checkFlag(9) ? 'u' : def;
	};
	per.isBlonde = function() { return this.dress === "Blonde"; };
	
	per.passTimeDay = function() {
		this.setFlag(13, false);
		this.setFlag(14, false);
		return '';
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 437 && this.isHere() && sType === "") {
			// Amy at Home
			return this.showPerson("home" + this.getSuffix() + "1.jpg", '', '', '', '', false, "string");
		}		
		return '';
	};

	per.showEventPopup = function()
	{
		if (sType !== "") return false;
		
		// Initial meeting at the Gym
		if (Place == 435 && !this.checkFlag(2) && !this.checkFlag(1) && !this.isCharmedBy("MrBeasley")) {
			this.setFlag(2);
			this.other = nTime;
			showPopupWindow("Amy",
				"<img src='Images/People/Amy/Brunette/amy0.jpg' style='position:absolute;width:100%;bottom:0' alt='Amy'>" +
				"</p><p style='position:absolute;top:5%;left:1%;cursor:pointer;line-height:0.9em'><b>The gym is busy at the moment, then again it is always busy. There is the sound of grunts and some music in another room, probably 'Eye of the Tiger'.<br><br>" +
				"You see to one side your friend Amy from school. She works here part-time running simple classes or working at the desk. She does not get very much money but gets a free membership and unrestricted use of the gym for her family.<br><br>" +
				"While you have never dated Amy and she is strictly a friend, you can still admire the view as she works out!</b>",
				undefined, "background-color:#8FC1C0;padding:0 0 0 0"
			);
			return true;
		}
		
		if (Place == 436 && this.place == 437 && !this.checkFlag(11)) {
			this.setFlag(11);
			if (wherePerson("AdeleRoss") == 900 || wherePerson("AdeleRoss") == 436) movePerson("AdeleRoss", 999);
			showPopupWindow("Amy at Home",
				this.addPersonString("home0" + (this.isCharmedBy() ? "c" : "u") + ".jpg", "height:max%", "right") +
				"When you arrive in the Ross house you see Amy and Catherine, they appear to have been talking. Amy is not dressed in much, and Catherine looks like she was getting ready for a party or something like that. They both cheerily welcome you and Catherine gives you a hug \"Thanks for bringing Amy home\"</p>" +
				"<p>Amy smiles, stands and excuses herself, explaining that she is going to her bedroom, and suggests that you may like to join her. Catherine smiles knowingly...",
				"dispPlace(Place,'type=catherineleaves')", '', true
			);
			return true;
		}
		return false;
	};
	
	per.showEvent = function()
	{
		var md, sSfx, no, bWide;
		
		if (Place == 269) {
			if (sType == "amypool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson("pool" + this.getSuffix() + ".jpg");
				addPlaceTitle(md, "Swimming with Amy");
				md.write(
					'<p>Amy arrives looking very cute in her swimsuit</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=amypoolsex');
				addLinkToPlaceC(md, 'say goodbye to Amy', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "amypoolsex") {
				md = WritePlaceHeader();
				this.showPersonRorX("pool" + this.getSuffix() + "-sex.jpg");
				addPlaceTitle(md, "Being Discrete and Private with Amy");
				md.write(
					'<p>You ask your cute friend to play with you more privately, and she seductively removes most of her swimsuit waiting for you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Amy', Place);
				WritePlaceFooter(md);
				return true;
			}
			return false;
		}
		if (Place == 11) {
			if (sType == 'askamycatherine') {
				// Fallback event if you failed to free Amy and Catherine			
				md = WritePlaceHeader();
				this.showPerson("amycatherinebeasley2.jpg");
				addPlaceTitle(md, "Amy and Catherine");
				md.write(
					'<p>You ask ' + perBeasley.getPersonName() + ' about Amy and Catherine and where they are. You see ' + perBeasley.getHimHer() + ' hesitate but the spell overcomes any reluctance ' + perBeasley.getHeShe() + ' has,</p>' +
					'<p>"They are currently staying with me as my sla...guests" and you insist ' + perBeasley.getHeShe() + ' call them to join you both here. With great reluctance ' + perBeasley.getHeShe() + ' agrees and makes a terse phone call. Within about 15 minutes they come into the classroom, stripping off their clothing and posing together for ' + perBeasley.getPersonName() + ', almost ignoring you.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'let them leave and talk more to ' + perBeasley.getPersonName(), Place);
				WritePlaceFooter(md);
				return true;				
			}
			if (sType == 'askamycatherinefreed') {
				// Fallback event if you failed to free Amy and Catherine, NOW freed!
				this.unCharmThem();				// Free her
				this.setFlag(1);					// Has been freed
				this.moveThem(435);				// To Gym
				unCharmPerson("Catherine");	// Free her
				setPersonFlag("Catherine", 1);// Has been freed
				movePerson("Catherine", 436);	// To home
				setPlaceKnown("CheriseRd");	// Know of Cherise Rd
				setPlaceKnown("AmaranthPl");	// Know of Amaranth Pl
				
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPerson("amycatherinebeasley1.jpg");
				addPlaceTitle(md, "Amy and Catherine Freed");
				md.write(
					'<p>Amy and Catherine both look shocked as they realise something of what has happened, and then see Catherine look angrily at ' + perBeasley.getPersonName() + '.</p>' +
					'<p>You can see it is pointless discussing anything with Catherine and Amy, they look very confused. You tell them to leave and you will talk to them later about what has happened and that you will deal with ' + perBeasley.getPersonName() + '. Quickly they gather their clothing and leave the classroom.</p>' +
					'<p>' + perBeasley.getPersonName() + ' looks after them with lust, longing and some regret, and you tell ' + perBeasley.getHimHer() + ' that ' + perBeasley.getHeShe() + ' is going to regret what ' + perBeasley.getHeShe() + ' did to them. ' + capitalize(perBeasley.getHeShe()) + ' just tells you "No I will not"</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'let them leave and talk more to ' + perBeasley.getPersonName(), Place);
				WritePlaceFooter(md);
				return true;				
			}
			return false;
		}
		if (Place == 427 && sType == "amydyehair") {
			// Dye her hair
			WaitHereOnly(6);		// 1 hr
			this.setFlag(14);
			if (this.dress == "Blonde") this.dress = "Brunette";
			else this.dress = "Blonde";
			md = WritePlaceHeader();
			AddImage("dye-female.jpg");
			addPlaceTitle(md, "Dyeing Amy's Hair");
			var nmc = findPerson("Charley").getPersonNameShort();
			md.write(
				'<p>You talk to Amy about cute in the past she looked with ' + (this.isBlonde() ? "blonde" : "brunette") + ' hair and suggest visiting ' + nmc + "'s salon.</p>" +
				'<p>Amy agrees and you both head over to the Salon and Charley has a free spot to fit Amy in and dye her hair.</p>' +
				'<p>Some time later you return with Amy, her hair now ' + (this.isBlonde() ? "blonde" : "brunette") + '!</p>'
			);					
			startQuestions();
			addLinkToPlaceC(md, 'you return home with Amy', nFromPlace);
			WritePlaceFooter(md);
			return true;	
		}
		if (Place == 435) {
			if (sType == "meetamygym") {
				// Arranged meeting at the Gym
				WaitHereOnly(3);		// 30 mins
				this.setFlag(10);
				md = WritePlaceHeader();
				this.showPerson("gym1u.jpg");
				addPlaceTitle(md, "Meeting Amy");
				md.write(
					'<p>You see Amy, finally, she is dressed in gym-wear, you are not sure if she was working out, teaching a lesson or what. Before Mr. Beasley\'s attempt to control her she did a lot of things around here. Then again, it sounds like she has been doing a lot more since then too, you are surprised but the hypnotic trances must have brought out her innate sexuality. Either that or she was just hiding it before, possibly a reaction to Catherine\'s overt..well what else do you call it...nymphomania.</p>'
				);					
				if (this.checkFlag(8)) {
					md.write(
						'<p>Amy seems genuinely happy to see you and she steps up and give you a hug,</p>' +
						'<p>"' + perYou.getPersonName() + ' it is good to see you again. Charlie has been able to explain things, I now understand it was not Catherine\'s fault or yours, just that slime Mr. Beasley!". It seems Amy has the same opinion of Mr.Beasley as her sister!</p>' +
						'<p>You chat with Amy for a while, and you can see she is really happy and friendly and at times she almost seems flirtatious, either her sexuality is still elevated, or she is looking at you differently than before.</p>'
					);					
				} else {
					md.write(
						'<p>Amy seems happy to see you but she is a bit reserved as she looks at you,</p>' +
						'<p>"' + perYou.getPersonName() + ' it is good to see you again. Charlie has tried to explain things, but I am not sure, it must have been Catherine\'s fault, she often suggested I participate in her sex games, even with her, you know girl/girl...Still I agree with Charlie I need to get over it and we can talk more about it."</p>' +
						'<p>It seems she is willing to meet again, but that is all, it seems if you want anything more you will have to do something more radical. You think it may be time to "protect" her magically.</p>'
					);	
				}
				startQuestions();
				if (this.checkFlag(8)) addLinkToPlaceC(md, 'talk to Amy about you and her', Place, 'type=meetamygymgirlfriend');
				else addLinkToPlaceC(md, 'chat with Amy and leave after a good chat', Place, '', 'You have a good chat with Amy, catching up on innocent things but you are unsure when you will be able to meet her again, if ever');
				WritePlaceFooter(md);
				return true;				
			}
			if (sType == "meetamygymgirlfriend") {
				// Arranged meeting at the Gym - make her a lover
				md = WritePlaceHeader();
				this.showPerson("gym2u.jpg");
				this.moveThem(437);
				this.setFlag(9);
				addPlaceTitle(md, "Amy and You");
				md.write(
					'<p>You tell Amy that Catherine had told you that she thought Amy liked you more than she had confessed before. You then tell Amy that you really like her and have been trying hard to help her since that thing with Catherine and the teacher. You avoid saying Mr. Beasley\'s name, you could see from her expression she did not want you to.</p>' +
					'<p>"Well ' + perYou.getPersonName() + ' things are really confusing now, but alright, let\'s talk more about it at my home. I think it is time I returned there and had it out with Catherine and Adele. Give me a while, and then we can talk more about this"</p>' +
					'<p>She did not refuse and without using the charm spell too!</p>'
				);					
				addLinkToPlaceC(md, 'agree to meet her later', Place);
				WritePlaceFooter(md);
				return true;				
			}			
			
			if (sType == "charmamy1") {
				// Charm Amy at the Gym 1
				md = WritePlaceHeader();
				this.showPerson("gym-charm1.jpg");
				addPlaceTitle(md, "Amy Under a Charm Spell");
				md.write(
					'<p>You decide it is best to "protect" Amy and also this will ensure she can be re-united with her sisters. You tell yourself that, not that you want your friend as your charmed ' + (this.checkFlag(8) ? 'girlfriend' : 'slave') +'.</p>' +
					'<p>You recite the spell and you see Amy immediately react as her eyes flash green but her attitude only slightly changes. You ask Amy how she is feeling and in particular towards you. You tell her...</p>'
				);
				startQuestions();
				if (this.checkFlag(8)) addLinkToPlaceC(md, '"I love you, do you love me?"', Place, 'type=charmamy2');
				else addLinkToPlaceC(md, '"You want to obey me don\'t you?"', Place, 'type=charmamy2');
				WritePlaceFooter(md);
				return true;				
			}	
			if (sType == "charmamy2") {
				// Charm Amy at the Gym 2
				sSfx = this.getSuffix();
				md = WritePlaceHeader();
				this.showPerson("gym-charm2" + sSfx + ".jpg");
				addPlaceTitle(md, (sSfx == "s" ? "Slave " : "") + "Amy Under a Charm Spell");
				if (sSfx == "s") {
					// Slave
					md.write(
						'<p>You know Amy does not completely trust you again so you will have to make her a cute, obedient slave. You will have to conceal this from Catherine, not that she will probably mind a lot but it is easiest and safest to avoid any possible issues..</p>' +
						'<p>You talk to your friend about the idea of trusting you completely, and that she needs to follow your words and instructions to avoid any further problems with other people like that teacher.<p>' +
						'<p>Amy nods her head and asks "What should we do now ' + perYou.getPersonName() + '?" You contemplate if you should tell her to call you ' + perYou.getMaster() + '?</p>'
					);
				} else {
					// Girlfriend
					md.write(
						'<p>Amy smiles and almost stutters as she replies, "You know I love you as a friend", and you tell her you love her, but not that way but as a ' + perYou.getManWoman() + ' love a woman. She blushes and removes some of her gym clothes as part of her answer,</p>' +
						'<p>"I do as well, ' + perYou.getPersonName() + ' I have for a while now" Her words are a bit painful, you have charmed her to get her to confess, it is not like you won her but you charmed her. Still she is you lover, your girlfriend now.</p>'
					);
				}
				startQuestions();
				if (sSfx == "g") addLinkToPlaceC(md, 'embrace your girlfriend', Place, 'type=charmamy3');
				else addLinkToPlaceC(md, '"In private call me ' + perYou.getMaster() + '"', Place, 'type=charmamy3');
				WritePlaceFooter(md);
				return true;				
			}	
			if (sType == "charmamy3") {
				// Charm Amy at the Gym 3
				sSfx = this.getSuffix();
				md = WritePlaceHeader();
				this.showPerson("gym-charm3" + sSfx + ".jpg");
				addPlaceTitle(md, (sSfx == "s" ? "Slave " : "") + "Amy Under a Charm Spell");
				if (sSfx == "s") {
					// Slave
					md.write(
						'<p>You tell Amy to call you ' + perYou.getMaster() + ' in private, but in public with others around to still call you by name. She nods her head in agreement and kneels before you,</p>' +
						'<p>"Protect me and love me and I will obey you in all things. I will call you anything you like ' + perYou.getMaster() + '!"<p>' +
						'<p>With that declaration Amy is your cute friend and slave!</p>'
					);
				} else {
					// Girlfriend
					md.write(
						'<p>You embrace Amy and say words of love again, feeling guilty, but it is done, she is your cute girlfriend now and you are content with it!</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, 'it is time to consummate your relationship', Place, 'type=amygymsex');
				WritePlaceFooter(md);
				return true;				
			}	
			if (sType == "amygymsex") {
				// Charm Amy at the Gym
				this.moveThem(437);
				md = WritePlaceHeader(false, 'td-left-med');
				if (perYou.isMaleSex()) this.showPersonRandomRorX("gym-sexb", isExplicit() ? 2 : 1);
				else this.showPersonRandom("gym-sexg", 2);
				addPlaceTitle(md, "Working Out with Amy");
				md.write(
					'<p>You embrace Amy passionately for the first time, you have day dreamed of this a number of times, though often with Catherine present as well...Putting that thought aside you kiss Amy, who kisses you back passionately.</p>' +
					'<p>Some time later you discuss with Amy returning home, and she agrees and asks you to meet her there later to give her time to discuss this with Catherine and Adele. Well not <i>this</i> but about returning home and so on.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'agree to meet her there later', Place);
				WritePlaceFooter(md);
				return true;				
			}
			return false;
		}
		if (Place != 437) return false;
	
		sSfx = this.getSuffix();
		var bBlonde = this.isBlonde();
		
		if (sType == "amyhomefuck") {
			// Fuck her at home
			if (bBlonde) {
				if (!isExplicit()) {
					md = WritePlaceHeader(false, 'td-left-med');
					//med - homea-sex-fuckga
					//med - homeg-sex-fucka
					//med - homes-sex-fucka
					//med - homeu-sex-fucka
					if (!perYou.isMaleSex() && Math.random() < 0.5) this.showPerson("homea-sex-fuckga.jpg");
					else this.showPerson("home" + sSfx + "-sex-fucka.jpg");
				} else {
					//''  - homea-sex-fuckba, homea-sex-fuckbb, homea-sex-fuckbc
					//med - homea-sex-fuckga, homea-sex-fuckgb
					//med - homeg-sex-fuckba, homeg-sex-fuckbb
					//med - homes-sex-fuckba, homes-sex-fuckbb, homes-sex-fuckbc
					//med - homeu-sex-fuckba, homeu-sex-fuckbab, homeu-sex-fuckbc
					if (!perYou.isMaleSex()) {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPersonRandomX("homea-sex-fuckg", 2);
					} else if (Math.random() < 0.4) {
						md = WritePlaceHeader();
						this.showPersonRandomX("homea-sex-fuckb", 3);
					} else {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPersonRandomX("home" + sSfx + "-sex-fuckb", sSfx == "g" ? 2 : 3);
					}
				}
			} else {
				if (!isExplicit()) {
					md = WritePlaceHeader(false, 'td-left-med');
					//med - homea-sex-fuckga
					//med - homeg-sex-fucka
					//med - homes-sex-fucka
					//med - homeu-sex-fucka
					this.showPerson("home" + sSfx + "-sex-fucka.jpg");
				} else {
					//med - homea-sex-fuckba. homea-sex-fuckbb, homea-sex-fuckbc, homea-sex-fuckbd, homea-sex-fuckbe (c)
					//med - homea-sex-fuckga
					//med - homeu-sex-fuckba
					md = WritePlaceHeader(false, 'td-left-med');
					if (!perYou.isMaleSex()) this.showPersonX("homea-sex-fuckga.jpg");
					else if (sSfx == "u" && Math.random() < 0.25) this.showPersonX("homeu-sex-fuckba.jpg");
					else this.showPersonRandomX("homea-sex-fuckb", sSfx == "u" ? 4 : 5);
				}	
			}
			addPlaceTitle(md, sSfx == "s" ? "Fucking Amy" : "Making Love to Amy");
			md.write(
				'<p>You embrace Amy passionately, and you kiss her, and she kisses you back passionately.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'talk more to Amy', Place);
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "amyhomebj") {
			// Blowjob at home
			if (bBlonde) {
				if (!isExplicit()) {
					md = WritePlaceHeader();
					this.showPerson("home" + (sSfx == "u" ? "a" : "c") + "-sex-bj" + (perYou.isMaleSex() ? "b" : "g") + "a.jpg");
				} else {
					//'' 	- homea-sex-bjba, homea-sex-bjbb
					//med - homec-sex-bjba, homec-sex-bjbb, homec-sex-bjbc
					//med - homea-sex-bjga,homea-sex-bjgb,homea-sex-bjgc
					//med - homeu-sex-bjba, homeu-sex-bjbb
					if (sSfx == "u" && Math.random() < 0.6 && perYou.isMaleSex()) {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPersonRandomX("homeu-sex-bjb", 2);
					} else if (perYou.isMaleSex()) {
						if (sSfx == "u" || Math.random() < 0.5) {
							md = WritePlaceHeader();
							this.showPersonRandomX("homea-sex-bjb", 2);
						} else {
							md = WritePlaceHeader(false, 'td-left-med');
							this.showPersonRandomX("homec-sex-bjb", 3);							
						}
					} else {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPersonRandomX("homea-sex-bjg", 3);
					}
				}
			} else {
				if (!isExplicit()) {
					if (perYou.isMaleSex()) {
						md = WritePlaceHeader(false, 'td-left-med');
						this.showPerson("home" + (sSfx == "u" ? "u" : "c") + "-sex-bjba.jpg");
					} else {
						md = WritePlaceHeader();
						this.showPerson("homea-sex-bjga.jpg");
					}
				} else {
					//''  - homea-sex-bjba, homea-sex-bjbb
					//med - homea-sex-bjga, homea-sex-bjgb
					md = WritePlaceHeader(false, perYou.isMaleSex() ? '' : 'td-left-med');
					this.showPersonRandomX("homea-sex-bj" + (perYou.isMaleSex() ? "b" : "g"), 2);
				}
			}
			addPlaceTitle(md, sSfx == "s" ? "Amy\'s Service" : "Amy Giving You Some Attention");
			if (sSfx == "s") md.write('<p>Slave Amy kneels down at your order, and gives you a surprisingly expert ' + (perYou.isMaleSex() ? 'blowjob' : 'licking') + '.<p>');
			else md.write('<p>Amy agrees to give you a little attention and kneels down and gives you a surprisingly expert ' + (perYou.isMaleSex() ? 'blowjob' : 'licking') + '.<p>');
			startQuestions();
			addLinkToPlaceC(md, 'talk more to Amy', Place);
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "amyhometitfuck") {
			// Fuck her at home
			md = WritePlaceHeader(false, isExplicit() && this.dress == "Brunette" ? 'td-left-med' : '');
			this.showPersonRorX("home" + sSfx + "-sex-tf.jpg");
			addPlaceTitle(md, (sSfx == 's' ? 'Slave' : 'Your Cute Girlfriend') + " Amy\'s Tits");
			if (sSfx == "s") md.write('<p>Slave Amy kneels down at your order, exposing her breasts and massages, masturbates your cock with her tits.<p>');
			else md.write('<p>Amy agrees to give you a little attention with her breasts and kneels down and give you a skilled tit-fuck!<p>');

			startQuestions();
			addLinkToPlaceC(md, 'talk more to Amy', Place);
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "amyadelethreesome1") {
			// Threesome (start)
			md = WritePlaceHeader();
			this.showPerson("Setting/amyadele-bed1" + (sSfx == "u" ? "u" : "c") + "ca.jpg");
			addPlaceTitle(md, "Amy and Adele");
			md.write(
				'<p>You call Adele to join Amy and yourself '
			);
			if (sSfx == "u") {
				if (this.checkFlag(12)) md.write(', you know better that to try anthing more than talk. Adele of course would, but Amy made it clear she will not!</p>');
				else md.write(' and you start to suggest something closer that talking, and Amy looks at you sternly. That would be a firm NO.</p>');
				this.setFlag(12);
			} else md.write('and she steps in and embraces her sister, bpth of them looking at you as if to ask "What now?"</p>');
			
			startQuestionsOnly();
			if (this.isCharmedBy()) {
				addLinkToPlaceC(md, 'watch them together', Place, 'type=amyadelethreesomeles');
				addLinkToPlaceC(md, 'join them', Place, 'type=amyadelethreesomeyou');
			}
			addLinkToPlace(md, 'let Adele leave and talk more to Amy', Place);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "amyadelethreesomeles") {
			// Threesome (lesbian)
			if (isBritish()) bWide = (bBlonde && !isExplicit()) || (!bBlonde && isExplicit());
			else bWide = !bBlonde && !isExplicit();
			md = WritePlaceHeader(false, bWide ? 'td-left-med' : '');
			if (isBritish()) no = bBlonde && !isExplicit() ? 5 : bBlonde ? 2 : isExplicit() ? 1 : 3;
			else no = bBlonde ? 1 : isExplicit() ? 1 : 3;
			this.showPersonRandomRorX("Setting/amyadele-lesbian", no);
			addPlaceTitle(md, "Watching Amy and Adele");
			md.write(
				'<p>You ask Amy and Adele to show some sisterly affection...</p>'
			);
			
			startQuestionsOnly();
			addLinkToPlaceC(md, 'join them', Place, 'type=amyadelethreesomeyou');
			addLinkToPlace(md, 'let Adele leave and talk more to Amy', Place);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "amyadelethreesomeyou") {
			// Threesome (you join in)
			md = WritePlaceHeader(false, (perYou.isMaleSex() && bBlonde && isExplicit() && isBritish()) || (perYou.isMaleSex() && !bBlonde && !isBritish() && !isExplicit()) ? "td-left-med" : "");
			if (bBlonde) {
				// UK
				// non-ex - no image
				// ex - amyadeleyou-ba, amyadeleyou-bb, amyadeleyou-bc, amyadeleyou-bd
				// US
				// non-ex - amyadeleyou-ga, amyadeleyou-gb, maybe amyadele-lesbiana
				// ex - amyadeleyou-ba, amyadeleyou-bb
				if (perYou.isMaleSex()) {
					if (isExplicit()) this.showPersonRandomX("Setting/amyadeleyou-b", isBritish() ? 3 : 2);
					else if (Math.random() < 0.5) this.showPerson("threesomea.jpg");
					else AddImage("GenericSex/threesome any a.jpg");					
				} else if (!isExplicit() && !isBritish()) this.showPersonRandomX("Setting/amyadeleyou-g", 2);
				else if (Math.random() < 0.5) this.showPerson("threesomea.jpg");
				else AddImage("GenericSex/threesome any a.jpg");
			} else {
				// UK
				// non-ex - amyadeleyou-ba
				// ex - amyadeleyou-ba, amyadeleyou-bc, amyadeleyou-bd, and amyadele-lesbiana works
				// US
				// non-ex - amyadeleyou-ba
				// ex - amyadeleyou-ba, amyadeleyou-ba, amyadeleyou-ba(wide)
				if (perYou.isMaleSex()) {
					if (!isExplicit()) this.showPerson("Setting/amyadeleyou-ba.jpg");
					else this.showPersonRandomX("Setting/amyadeleyou-b", isBritish() ? 4 : 3);
				} else if (Math.random() < 0.5) this.showPerson("threesomea.jpg");
				else AddImage("GenericSex/threesome any a.jpg");				
			}
			addPlaceTitle(md, "Amy, Adele and You");
			md.write(
				'<p>You join the sisters why watch when you can get involved!</p>'
			);
			
			startQuestionsOnly();
			addLinkToPlace(md, 'let Adele leave and talk more to Amy', Place);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		}		
		if (sType == "amycatherinethreesome1") {
			// Threesome (start)
			md = WritePlaceHeader();
			this.showPersonRandom("amycatherine-bed1" + (sSfx == "u" ? "u" : "c") + (isCharmedBy("Catherine") ? "c" : "u"), bBlonde ? 1 : 2);
			addPlaceTitle(md, "Catherine and Amy");
			md.write(
				'<p>You call Catherine to join Amy and yourself and eagerly she comes in, shedding her clothes. It is clear she has wanted to be imtimate with her sister Amy for a long time! '
			);
			if (sSfx == "u") {
				if (this.checkFlag(12)) md.write('Unfortunately you know that you have to restrain Catherine, Amy made it clear she is not interested!</p>');
				else md.write('You start to suggest something closer that talking, and Catherine immediately agrees and embraces Amy, but Amy looks at you sternly and shakes her head. That would be a firm NO.</p>');
				this.setFlag(12);
			} else md.write('Catherine embraces her sister, both of them looking at you but Catherine is already starting to touch Amy...</p>');
			
			startQuestionsOnly();
			if (this.isCharmedBy()) {
				addLinkToPlaceC(md, 'watch them together', Place, 'type=amycatherinethreesomeles');
				addLinkToPlaceC(md, 'join them', Place, 'type=amycatherinethreesomeyou');
			}
			addLinkToPlace(md, 'ask Catherine to leave and talk more to Amy', Place);
			addLinkToPlace(md, 'leave the bedroom', 436);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "amycatherinethreesomeles") {
			// Threesome (lesbian)
			md = WritePlaceHeader();
			if (!isExplicit()) this.showPersonRandom("amycatherine-lesbianc" + (sSfx == "u" ? "u" : "c"), bBlonde ? 1 : 2);
			else if (bBlonde) this.showPersonRandomX("amycatherine-lesbianc" + (sSfx == "u" ? "u" : "c"), 1);
			else this.showPersonRandomX("amycatherine-lesbian", isCharmedBy("Catherine") ? 1 : 2);
			addPlaceTitle(md, "Watching Catherine and Adele");
			md.write(
				'<p>You ask Amy and Catherine to show some sisterly affection and Catherine enthusiastically and passionately embraces her sister...</p>'
			);
			
			startQuestionsOnly();
			addLinkToPlaceC(md, 'join them', Place, 'type=amycatherinethreesomeyou');
			addLinkToPlace(md, 'ask Catherine to leave and talk more to Amy', Place);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "amycatherinethreesomeyou") {
			// Threesome (you join in)
			md = WritePlaceHeader(false, !isExplicit() ? "" : "td-left-med");
			if (isExplicit() && perYou.isMaleSex()) {
				if (!bBlonde) this.showPersonX("amycatherineyou-b" + (sSfx == "u" ? "u" : "c") + ".jpg");
				else this.showPersonX("amycatherineyou-ba.jpg");
			} else if (bBlonde) {
				if (perYou.isMaleSex()) this.showPerson("amycatherineyou-ba.jpg");
				else this.showPerson("amycatherineyou-gu.jpg");
			} else if (!bBlonde && Math.random() < 0.5) this.showPerson("amycatherineyou-b" + (sSfx == "u" ? "u" : "c") + ".jpg");
			else if (Math.random() < 0.5) this.showPerson("threesomea.jpg");
			else AddImage("GenericSex/threesome1.jpg");					

			addPlaceTitle(md, "Amy, Catherine and You");
			md.write(
				'<p>You join the sisters why watch when you can get involved!</p>'
			);
			
			startQuestionsOnly();
			addLinkToPlace(md, 'ask Catherine to leave and talk more to Amy', Place);
			addLinkToPlace(md, 'leave the house', 37);
			WritePlaceFooter(md);
			return true;
		}				
		
		if (sType == "amyplaydate") {
			// Go out a play with amy
			passTimeNight();
			md = WritePlaceHeader();
			this.showPersonRandom("sport", 3);
			addPlaceTitle(md, "Playing with Amy");
			md.write(
				'<p>You suggest going out for for a while with Amy. She smiles and asks if you can play a game with her. For a moment Catherine\'s voice echos in your head, but you know it is not that sort of \'play\'. Amy is athletic and enjoys a range of sports.</p>' +
				'<p>You have a fun time with Amy and before you know it evening is approaching so you return back to her home.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'arrive back at Amy\'s home', Place);
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "amydate") {
			// Go out a play with amy
			this.setFlag(13);
			WaitHereOnly(4);
			md = WritePlaceHeader();
			this.showPersonRandom("date", 4);
			addPlaceTitle(md, "Dating Amy");
			md.write(
				'<p>You invite Amy to go out on a date and she happily agrees. She spends a while getting ready but eventually you head out for the evening with her.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'later you arrive back at Amy\'s home', Place);
			WritePlaceFooter(md);
			return true;				
		}

		if (sType == "recharmamyhome1") {
			// Re-charm Amy at Home 1
			md = WritePlaceHeader();
			this.showPerson("home" + sSfx + "-charm1.jpg");
			addPlaceTitle(md, "Amy Under a Charm Spell - Again");
			md.write(
				'<p>You decide to alter Amy\'s "protection" Amy...well there is no denying it, your influence and control over your friend.</p>' +
				'<p>You recite the spell and you see Amy again react as her eyes flash green but her attitude only slightly changes. You ask Amy how she is feeling and in particular towards you. You tell her...</p>'
			);
			startQuestions();
			if (sSfx != "g") addLinkToPlaceC(md, '"I love you, do you love me?"', Place, 'type=recharmamyhome2', '', '', "charmPerson('AmyRoss',2)");
			else addLinkToPlaceC(md, '"You want to obey me don\'t you?"', Place, 'type=recharmamyhome2', '', '', "charmPerson('AmyRoss',4)");
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "recharmamyhome2") {
			// Re-charm Amy at Home 2
			md = WritePlaceHeader();
			this.showPerson("home" + sSfx + "-charm2.jpg");
			addPlaceTitle(md, (sSfx == "s" ? "Slave " : "") + "Amy Under a Charm Spell");
			if (sSfx == "s") {
				// Slave
				md.write(
					'<p>You know Amy does not completely trust you again so you will have to make her a cute, obedient slave. You will have to conceal this from Catherine, not that she will probably mind a lot but it is easiest and safest to avoid any possible issues..</p>' +
					'<p>You talk to your friend about the idea of trusting you completely, and that she needs to follow your words and instructions to avoid any further problems with other people like that teacher.<p>' +
					'<p>Amy nods her head and asks "What should we do now ' + perYou.getPersonName() + '?" You contemplate if you should tell her to call you ' + perYou.getMaster() + '?</p>' +
					'<p>You tell Amy to call you ' + perYou.getMaster() + ' in private, but in public with others around to still call you by name. She nods her head in agreement and kneels before you,</p>' +
					'<p>"Protect me and love me and I will obey you in all things. I will call you anything you like ' + perYou.getMaster() + '!"<p>' +
					'<p>With that declaration Amy is your cute friend and slave!</p>'
				);
			} else {
				// Girlfriend
				md.write(
					'<p>Amy smiles and almost stutters as she replies, "You know I love you as a friend", and you tell her you love her, but not that way but as a ' + perYou.getManWoman() + ' love a woman. She blushes and removes some of her gym clothes as part of her answer,</p>' +
					'<p>"I do as well, ' + perYou.getPersonName() + ' I have for a while now" Her words are a bit painful, you have charmed her to get her to confess, it is not like you won her but you charmed her. Still she is you lover, your girlfriend now.</p>' +
					'<p>You embrace Amy and say words of love again, feeling guilty, but it is done, she is your cute girlfriend now and you are content with it!</p>'
				);
			}
			startQuestions();
			addLinkToPlaceC(md, 'consummate your changed relationship', Place, 'type=amyhomefuck');
			WritePlaceFooter(md);
			return true;				
		}
		
		if (sType == "charmamyhome1") {
			// Charm Amy at Home 1
			md = WritePlaceHeader();
			this.showPerson("home" + sSfx + "-charm1.jpg");
			addPlaceTitle(md, "Amy Under a Charm Spell");
			md.write(
				'<p>You decide it is best to "protect" Amy and there is no denying it, to better influence and even control your friend as your charmed girlfriend or maybe slave?</p>' +
				'<p>You recite the spell and you see Amy immediately react as her eyes flash green but her attitude only slightly changes. You ask Amy how she is feeling and in particular towards you. You tell her...</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Reinforce things and say "I love you Amy"', Place, 'type=charmamyhome2', '', '', "charmPerson('AmyRoss',2)");
			addLinkToPlaceC(md, '"You want to obey me don\'t you?"', Place, 'type=charmamyhome2', '', '', "charmPerson('AmyRoss',4)");
			WritePlaceFooter(md);
			return true;				
		}	
		if (sType == "charmamyhome2") {
			// Charm/Re-charm Amy at Home 2
			md = WritePlaceHeader();
			this.showPerson("home" + sSfx + "-charm2.jpg");
			addPlaceTitle(md, (sSfx == "s" ? "Slave " : "") + "Amy Under a Charm Spell");
			if (sSfx == "s") {
				// Slave
				md.write(
					'<p>You know Amy does not completely trust you again so you will have to make her a cute, obedient slave. You will have to conceal this from Catherine, not that she will probably mind a lot but it is easiest and safest to avoid any possible issues..</p>' +
					'<p>You talk to your friend about the idea of trusting you completely, and that she needs to follow your words and instructions to avoid any further problems with other people like that teacher.<p>' +
					'<p>Amy nods her head and asks "What should we do now ' + perYou.getPersonName() + '?" You contemplate if you should tell her to call you ' + perYou.getMaster() + '?</p>'
				);
			} else {
				// Girlfriend
				md.write(
					'<p>Amy smiles and almost stutters as she replies, "You know I love you as a friend", and you tell her you love her, but not that way but as a ' + perYou.getManWoman() + ' love a woman. She blushes and removes some of her gym clothes as part of her answer,</p>' +
					'<p>"I do as well, ' + perYou.getPersonName() + ' I have for a while now" Her words are a bit painful, you have charmed her to get her to confess, it is not like you won her but you charmed her. Still she is you lover, your girlfriend now.</p>'
				);
			}
			startQuestions();
			if (sSfx == "g") addLinkToPlaceC(md, 'embrace your girlfriend', Place, 'type=charmamyhome3');
			else addLinkToPlaceC(md, '"In private call me ' + perYou.getMaster() + '"', Place, 'type=charmamyhome3');
			WritePlaceFooter(md);
			return true;				
		}	
		if (sType == "charmamyhome3") {
			// Charm/Re-charm Amy at Home 3
			md = WritePlaceHeader();
			this.showPerson("home" + sSfx + "-charm3.jpg");
			addPlaceTitle(md, (sSfx == "s" ? "Slave " : "") + "Amy Under a Charm Spell");
			if (sSfx == "s") {
				// Slave
				md.write(
					'<p>You tell Amy to call you ' + perYou.getMaster() + ' in private, but in public with others around to still call you by name. She nods her head in agreement and kneels before you,</p>' +
					'<p>"Protect me and love me and I will obey you in all things. I will call you anything you like ' + perYou.getMaster() + '!"<p>' +
					'<p>With that declaration Amy is your cute friend and slave!</p>'
				);
			} else {
				// Girlfriend
				md.write(
					'<p>You embrace Amy and say words of love again, feeling guilty, but it is done, she is your cute girlfriend now and you are content with it!</p>'
				);
			}
			startQuestions();
			addLinkToPlaceC(md, 'it is time to consummate your changed relationship', Place, 'type=amyhomefuck');
			WritePlaceFooter(md);
			return true;				
		}	
		
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		var img = this.showPersonRandom("poledance", 4);
		addPlaceTitle(md, "Amy's Dance");
		if (img.indexOf("poledanced") != -1) md.write('<p>Amy takes the stage dressed in police uniform. You wonder if she borrowed it from her sister Adele. It is a bit tight on her and Adele is a bit taller and more...endowed, so probably not!</p>');
		else md.write('<p>Amy takes the stage dressed in a version of exotic dancing wear!</p>');
		md.write(
			'<p>Amy is not an experienced dancer but she is fit and athletic, entertaining the audience well. Amy is a lot more focused on you than the general audience, dancing almost as your private dancer!</p>' +
			'<p>After she collects her tips and offers them to you, but you know Jade has a performance fee for you, and Amy deserves them.</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 437) {
			if (this.isHere()) {
				// Home
				var sfx = this.getSuffix();
				if (sfx == "u") md.write('<p>Your cute girlfriend Amy is waiting for you, dressed seductively in lingerie</p>');
				else if (sfx == "g") md.write('<p>Your cute charmed girlfriend Amy is waiting for you, dressed seductively in lingerie</p>');
				else md.write('<p>Your slave Amy is waiting for you' + addVisible(', and as you enter she greets you "Welcome ' + perYou.getMaster() + ' we are in private here') + '!"</p>');
			} else md.write('<p>Amy\'s bedroom is furnished in an old somewhat gothic style. Amy has always said she rather liked it that way.</p>');
			if (wherePerson("Catherine") == 436) {
				md.write('<p>You briefly hear a noise, it sounded like Catherine\'s voice');
				if (wherePerson("AdeleRoss") == 436) md.write(' and then Adele, it sounds like they are arguing');
				md.write('.</p>');
			} else if (wherePerson("AdeleRoss") == 436) md.write('<p>You briefly hear a noise, it sounded like Adele\'s voice.</p>');
		}
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (sType === "" && Place == 11 && perBeasley.isHere() && perBeasley.checkFlag(3) && !this.checkFlag(1) && perBeasley.isCharmedBy()) addLinkToPlace(md, "ask " + perBeasley.getPersonName() + " where are Amy and Catherine", Place, 'type=askamycatherine');
		else if (sType === "" && Place == 437 && this.isHere()) {
			// Amy's room
			var sSfx = this.getSuffix();
			if (sSfx == "u") {
				// Uncharmed Girlfriend options
				if (isDay()) addLinkToPlaceC(md, 'go out with your girlfriend Amy', Place, 'type=amyplaydate');
				else if (!this.checkFlag(13)) addLinkToPlaceC(md, 'take Amy out on a date', Place, 'type=amydate');
			}
			if (checkPersonFlag("Charley", 1)) {
				if (!this.checkFlag(14)) {
					if (isShopOpen(2, 0, true)) addLinkToPlaceC(md, 'ask Amy to dye her hair ' + (this.isBlonde() ? "brunette" : "blonde"), 427, 'type=amydyehair');
					else addLinkToPlace(md, 'ask Amy to dye her hair ' + (this.isBlonde() ? "brunette" : "blonde"), Place, '', 'The hair salon is not open at the moment, you should discuss this another time');
				} else addLinkToPlace(md, 'ask Amy to dye her hair ' + (this.isBlonde() ? "brunette" : "blonde"), Place, '', 'Amy has already dted her hair once today, ask again another day');
			}
			if (perYou.isMaleSex()) {
				addLinkToPlace(md, sSfx == "s" ? 'fuck your slave' : 'make love to Amy', Place, 'type=amyhomefuck');
				addLinkToPlaceO(md, (sSfx == "s" ? 'order' : 'ask') + ' Amy to give you a blowjob', Place, 'type=amyhomebj');
				addLinkToPlaceO(md, (sSfx == "s" ? 'order' : 'ask') + ' Amy to give you a tit-fuck', Place, 'type=amyhometitfuck');
			} else {
				addLinkToPlace(md, sSfx == "s" ? 'fuck your slave Amy' : 'make love to Amy', Place, 'type=amyhomefuck');
				addLinkToPlaceO(md, (sSfx == "s" ? 'order' : 'ask') + ' Amy to lick you', Place, 'type=amyhomebj');
			}
		
			if (getCharmedLevel("AdeleRoss") == 4 && wherePerson("AdeleRoss") == 436) addLinkToPlace(md, 'call for Adele to join you', Place, 'type=amyadelethreesome1');
			if (wherePerson("Catherine") == 436) addLinkToPlace(md, 'call for Catherine to join you', Place, 'type=amycatherinethreesome1');
			
			this.addDancingLink(md, sSfx == "s" ? 'order Amy to dance for you in the club' : 'talk to Amy about danding in the club',
				'You ask Amy about the Avernus club and about dancing there for you,</p>' +
				'<p>&quot;Sure ' + this.getYourNameFor() + ', it sounds like fun!&quot; and with that you call Jade to arrange a dance for Amy.'
			);
			this.addSleepLink(md, "go to bed with Amy", "Sleeping with your cute " + (sSfx == "s" ? "slave" :  "girlfriend"),
				'<p style="position:absolute;left:10%;top:10%;cursor:pointer;font-size:1.1em;width:40%"><b>You take Amy to bed for the night.</b>',
				'home' + this.getSuffix() + '-bed1.jpg', true, '', '', '', "overflow-y:hidden"
			);
		}
	};
	
	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		// Using/Examining the Silver Ring
		if (no == 32) {
			if (cmd == 2) {
				// Use the Silver Ring
				if (Place == 74 || Place == 75) {
					// Mr Beasley threesome with Catherine and Amy
					addComments('<p>You clasp the ring with your fist. It flickers for a moment but nothing happens, maybe the spell affecting the girls is too recently cast and still washing through their bodies and minds.</p></td></tr></table>');
					return "handled";
				}
				else if (Place == 76 && !checkPersonFlag("AmyRoss", 1)) {
					// Mr Beasley threesome with Catherine and Amy
					AddMana(10);
					addComments('<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over Catherine and Amy.</p></td></tr></table>');
					dispPlace(76, "type=freed");
					return "handled";
				} else if (Place == 11 && sType == "askamycatherine") {
					// Fallback with Catherine and Amy
					AddMana(10);
					addComments('<p>You clasp the ring with your fist. It glows and, within moments, it absorbs the mana powering the <i>charm</i> over Catherine and Amy.</p></td></tr></table>');
					dispPlace(Place, "type=askamycatherinefreed");
					return "handled";
				}
			}
		}
		// Casting the charm spell
		else if (no == 14 && cmd == 2) {
			if (Place == 11 && sType == "askamycatherinefreed") {
				addComments("The spell fails, it is difficult to cast it on just one of the girls the residual effects of " + perBeasley.getPersonName() + " influence is blocking the spell, you will have to try another time.");
				return "handled";
			}
			// Beasley Threesome
			if (Place == 74 || Place == 75) {
				addComments("The spell fails, it is difficult to cast it on just one of the three and the girls are clearly under the influence of Mr. Beasley's charm spell.");
				return "handled";
			}
			if (Place == 76) {
				if (this.checkFlag(3)) addComments('You realise that trying to charm them here with Mr. Beasley present would be a very bad idea and you cannot target Mr. Beasley only.');
				else addComments("The spell fails, the girls are clearly under the influence of Mr. Beasley's charm spell and it is diffuclt to only target Mr. Beasley.");
				return "handled";
			}
			if (Place == 435 && sType == "meetamygym") {
				CastCharmSpell("AmyRoss", Place, this.checkFlag(8) ? 2 : 4, 'type=charmamy1');
				return "handled";
			}
			// Girlfriend Amy OR Charmed Amy
			if (Place == 437 && this.isHere()) {
				if (!this.isCharmed()) {
					setCommentsNoClick(
						'<div style="margin-top:1em;margin-bottom:1em;margin-left:2em;margin-right:2em;cursor:default;">' +
						'<table><tr><td width="80%"><p>You look at your girlfriend Amy and wonder if you should...protect..her.</p>'
					);
					addOptionLink("comments", 'No, she is already perfect!', "dispPlace(undefined,'','<img src=\\\'Images/" + this.getImg('amyu-face.jpg') + "\\\' style=\\\'width:20%;float:right;margin-bottom:1em;margin-left:5px\\\' alt=\\\'Amy\\\'>You change your mind, Amy is a lovely girfriend, there is no need to change things by charming her.')");
					addOptionLink("comments", 'Yes, she needs to be...protected', "CastCharmSpell('AmyRoss',437,1,'type=charmamyhome1')");
					addComments('</td><td width="20%"><img src="Images/' + this.getImg('amyu-face.jpg') + '" style="width:95%;" alt="Amy"></td></tr></table>');
				} else CastCharmSpell("AmyRoss", Place, this.checkFlag(8) ? 2 : 4, '', '', 'type=recharmamyhome1');
				return "handled";
			}
		}

		return "";		// do nothing
	};
	
	
	// Phone Calls
	
	per.isPhoneable = function() {
		// Can you call them?
		return this.checkFlag(1) && !(this.isCharmedBy() || this.checkFlag(9));
	};

	per.callThem = function() {
		if (!this.isCharmedBy() && !this.checkFlag(9)) {
			receiveCall('', 'You call Amy but there is no answer. A minute later you receive a terse text message \"later, please\"');
			WriteCommentsFooter(bChat, bChatLeft);
		} else if (Place == 269) {
			gotoPlace(Place, 'type=amypool');
			receiveCall('', 'You call Amy to invite her to join you at the pool for a swim, and she happily agrees.');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};

	per.isSMSImageDressVersion = function(id) { return id > 34; };
	
	per.addPersonPhoneCall = function() {
		if ((nTime - this.other) > 25 && this.checkFlag(2) && !this.checkFlag(3)) {
			// SMS 30, 25 turns after first meeting her at the gym
			if (makeCall(true, 30)) this.setFlag(3);
		}
		if (this.isCharmedBy() || this.checkFlag(9)) return false;
		if (this.checkFlag(4) && !this.checkFlag(6) && !isDay()) {
			// SMS 32, evening after first SMS after charming Charlie
			if (makeCall(true, 32)) this.setFlag(6);
		}
		if (!this.checkFlag(7) && this.checkFlag(8) && this.hoursSince() > 120) {
			// SMS 34, evening 5 days after reassuring started
			if (makeCall(true, 34)) this.setFlag(7);
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		if (id == 30) {
			// SMS 1, 20 turns after charming her
			return receiveSMS('Amy', 'Here I am with my last client. She asked about special services, stop telling people that', 'sms1.jpg') +
				receiveSMS('Amy', 'Oops &#128517; sorry ' + perYou.getPersonName() + ' I sent last 2 wrong no 2 yours. A job thing pls delete &#128540;') +
				replyToSMS('ok but was that Kates mum') +
				receiveSMS('Amy', 'Yeah a massage at home &#128513; delete ok you know private');
		}
		if (id == 31) return receiveSMS('Amy', 'Charlie tells me you were looking for me, ' + findPerson("Charlie").getHeShe() + ' was a bit odd and insistent I do not talk to you. Please, not now, its difficult', 'sms2.jpg');
		if (id == 32) return receiveSMS('Amy', 'Hey ' + perYou.getPersonName() + ' did we message before, my phone got reset and I forget...I am just heading out to do a massage. I hope they are nice and friendly', 'sms3.jpg');
		if (id == 33) return receiveSMS('Amy', 'Hey ' + perYou.getPersonName() + ' Charlie was talking about you...do\'nt worry about me I am ok', 'sms4.jpg');
		if (id == 34) return receiveSMS('Amy', perYou.getPersonName() + ' I was just thinking of you. Let\'s get together soon', 'sms5.jpg');
		return '';
	};	
}
