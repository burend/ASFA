/**********************************************
Doctor Tina
***********************************************/

function initialiseDoctorKay()
{
	// Doctor Tina
	addPerson("Doctor Kay", 0, "DoctorKay", '', false);
	
	per.getPersonNameShort = function() { return this.checkFlag(2) ? this.name : "the nurse"; };
	
	per.whereNow = function() {
		if (this.place === 0) return 0;
		if ((isShopOpen(2) && getHour() > 12) || sType.indexOf("followntina") != -1) return 69;
		else if (isShopOpen(2)) return 445;
		if (!isDay() && this.isCharmedBy()) return 181;
		return 0;
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 69 && this.isHere() && sType === "") return this.showPerson("tinasch2b.jpg", '', '', '', '', false, "string");
		if (Place == 181 && this.isHere() && sType === "") return this.showPerson("tinahotelbed2.jpg", '', '', '', '', false, "string");
		return '';
	};
	
	per.showEventPopup = function()
	{
		//  Meet Tina at the School
		if (Place == 70 && !this.checkFlag(1) && isShopOpen(2) && checkPersonFlag("Catherine", 10)) {
			// First meeting, after Catherine + Amy and AFTER the morning after the meeting at the construction site
			this.setFlag(1);
			this.place = 69;
			showPopupWindow("Who is that?",
				"<img src='Images/People/DoctorKay/tinaprofalt.jpg' class='imgpopup' alt='Nurse'>" +
				"You see a girl you don’t recognise walking down the corridor.</p>" +
				"<p>She seems to be heading to the Nurse’s Office, and she certainly looks like a nurse. You remember that Catherine said she was taking a leave from her job as the school nurse, she just did not want to have to confront 'that slime Beasley'</p>" +
				"<p>Do you try and follow her or wait and ask Catherine?</p>" +
				addOptionLink("string", 'follow', "dispPlace(69,'type=followntina')", "chatblock", "width:50%;margin-left:10%") +
				addOptionLink("string", 'leave and ask Catherine', ";dispPlace(70,'', '" + this.addPersonFace(true) + "You decide you&rsquo;ll have to ask Catherine next time you see her as to who the stand-in nurse is. On the other hand you wonder to yourself whether you could find anything out at the hospital.')", "chatblock", "width:50%;margin-left:10%"),
				'', '', true, true
			);
			return true;
		}
		//  Meet Tina at the Hotel Pool
		if (Place == 269 && !this.checkFlag(2) && !this.checkFlag(5) && isDay() && checkPersonFlag("Catherine", 10) && this.checkFlag(4)) {
			// First meeting, after Catherine + Amy and AFTER talking to Bambi about her
			this.setFlag(5);
			showPopupWindow("The Nurse Bambi Mentioned?",
				"<img src='Images/People/DoctorKay/tinapoolpre1.jpg' class='imgpopup' alt='Nurse'>" +
				"You emerge into the sunlight around the pool and start looking for the new girl you have heard about from Bambi.</p>" +
				"<p>After a moment adjusting your eyes you realise there is someone on the far side of the pool who appears to be finishing dressing prior to leaving. You start around the pool towards her...",
				"dispPlace(Place,'type=drkaypool2')", '', true
			);
			return true;
		}
		if (sType == "drkaypool2") {
			showPopupWindow("The Nurse Bambi Mentioned?",
				"<img src='Images/People/DoctorKay/tinapoolpre2.jpg' class='imgpopup' alt='Nurse'>" +
				"As you start to go around the pool to try and talk to her she finishes changing and leaves.</p>" +
				"<p>Before she goes you cannot help but feel she has been assessing you as much as you have been assessing her – giving you pause for thought.</p>" +
				"<p>You are fairly sure that she will be going over to the school to cover Catherine’s shift – the only question is should you follow her to the school right now or do something more pressing.",
				"", '', true
			);
			return true;
		}
		return false;
	};
	
	per.showEvent = function()
	{
		var md;
		
		if (Place == 181) {
			if (sType == "drtinafun1") {
				md = WritePlaceHeader(false, 'td-left-med');
				this.showPerson("tinahotelbed3.jpg");
				addPlaceTitle(md, "Fun with Dr. Tina");
				md.write(
					'<p>You decide that there is time to have some fun before settling down for the night.</p>' +
					'<p>As she starts to undress you catch her looking at you longingly whilst nibbling on her finger. Realising that she is as excited as you are you start towards her.</p>'
				);
				startQuestions();
				if (perYou.isMaleSex()) addLinkToPlaceC(md, 'approach her', Place, 'type=drtinafunmale&stage=stage1');
				else addLinkToPlaceC(md, 'approach her', Place, 'type=drtinafunfemale&stage=stage1');
				WritePlaceFooter(md);
				return true;				
			}
			var stage = getQueryParam("stage");
			if (sType == "drtinafunmale") {
				md = WritePlaceHeader(false, stage == 'stage1' || (!isExplicit() && stage != "stage2" && stage != "stage6" && stage != "stage7" && stage != "stage8") ? '' : 'td-left-med');
				switch (stage) {
					case "stage1": 
						this.showPerson("tinahotelbed4.jpg"); 
						break;
					case "stage2": 
						this.showPersonRorX("tinahotelbed5.jpg");
						break;
					case "stage3": 
						this.showPersonRorX("tinahotelbed6.jpg"); 
						break;
					case "stage4": 
						if (!isExplicit()) this.showPerson("tinahotelbed9.jpg");
						else this.showPersonX("tinahotelbed7.jpg");
						break;
					case "stage5":
						if (!isExplicit()) this.showPerson("tinahotelbed9.jpg");
						else this.showPersonX("tinahotelbed10.jpg");
						break;
					case "stage6": 
						this.showPerson("tinahotelbed12.jpg"); 
						break;
					case "stage7": 
						this.showPersonRorX("tinahotelbed13.jpg"); 
						break;
					case "stage8": 
						if (!isExplicit()) this.showPerson("tinahotelbed13.jpg");
						else this.showPersonX("tinahotelbed14.jpg"); 
						break;
				}
				addPlaceTitle(md, "Fun with Dr. Tina");
				switch (stage) {
					case "stage1":
						md.write(
							'<p>As you reach the bed you see that Tina is now just in her lingerie and holding a tub of lube –</p>' +
							'<p>“I hoped you would be paying me a visit to me tonight so I have prepared myself on the off chance you would come.”</p>' +
							'<p>As you reach the bed and settle down next to her she hurriedly puts the jar away.</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'go another round', Place, 'type=drtinafunmale&stage=stage2');
						break;
					case "stage2":
						md.write(
							'<p>Having put the jar away she quickly hooks your jeans down and starts to suck rapidly… the prospect of what is to follow meaning that in no time at all you are ready for the first part of proceedings.</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'go more', Place, 'type=drtinafunmale&stage=stage3');
						break;
					case "stage3":
						md.write(
							'<p>With little ceremony and great speed you find that you are both naked and that Tina has jumped on top of you.</p>' +
							'<p>As you lose yourself in the pleasure of the moment you let Tina take control and before long she has you kneeling on the bed taking care of her every need.</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'go more', Place, 'type=drtinafunmale&stage=stage4');
						break;
					case "stage4":
						md.write(
							'<p>On any normal day you would quite happily continue like this for the whole time but you cannot help but have you mind wander back to the little jar and what Tina has prepared for you.</p>' +
							'<p>With a sense of anticipation you slowly pull back and lie back on the bed and savour the moment as Tina finally offers herself to you completely.</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'go more', Place, 'type=drtinafunmale&stage=stage5');
						break;
					case "stage5":
						md.write(
							'<p>With a gasp she lowers herself gently onto you again giving herself to you entirely. As she slowly gets used to the feeling she suggests that you should once again take charge.</p>' +
							'<p>Never being one to refuse the wish of a lady you take her at her word and spin her around before starting in earnest in taking your pleasure with her.</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'go more', Place, 'type=drtinafunmale&stage=stage6');
						break;
					case "stage6":
						md.write(
							'<p>As you continue to couple like a pair of rabbits you realise that you won’t be able to continue for much longer at this pace.</p>' +
							'<p>Realising that you won’t hold out much longer Tina pulls off you and lays herself out beneath you.</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'go more', Place, 'type=drtinafunmale&stage=stage7');
						break;
					case "stage7":
						md.write(
							'<p>With a feeling of bliss you feel you orgasm approaching and cum all over her face.</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'go more', Place, 'type=drtinafunmale&stage=stage8');
						break;
					case "stage8":
						md.write(
							'<p>As you finish she starts to clean up having swallowed as much as she can.</p>' +
							'<p>"So are you staying with me tonight ' + perYou.getPersonName() + ' or do you have other things to do?"</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'talk more to Tina', Place);
						break;						
				}
				WritePlaceFooter(md);
				return true;				
			}			
			if (sType == "drtinafunfemale") {
				md = WritePlaceHeader(false, stage == "stage4" ? '' : 'td-left-med');
				switch (stage) {
					case "stage1": this.showPerson("tinahotelbedalt1.jpg"); break;
					case "stage2": this.showPerson("tinahotelbedalt2.jpg"); break;
					case "stage3": this.showPerson("tinahotelbedalt3.jpg"); break;
					case "stage4": this.showPerson("tinahotelbedalt4.jpg"); break;
					case "stage5": this.showPerson("tinahotelbedalt5.jpg"); break;
					case "stage6": this.showPerson("tinahotelbedalt6.jpg"); break;
				}
				addPlaceTitle(md, "Fun with Dr. Tina");
				switch (stage) {
					case "stage1":
						md.write(
							'<p>You are both on the bed and help each other to rapidly strip off all of your clothes.</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'go another round', Place, 'type=drtinafunfemale&stage=stage2');
						break;
					case "stage2":
						md.write(
							'<p>You feel yourself getting wetter and wetter with anticipation as she finally pulls your shorts all the way off whilst massaging your butt.</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'go more', Place, 'type=drtinafunfemale&stage=stage3');
						break;
					case "stage3":
						md.write(
							'<p>With minimal ceremony Tina pushes you back on the bed and starts to lap away at your pussy, sending your mind into overdrive.</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'go more', Place, 'type=drtinafunfemale&stage=stage4');
						break;
					case "stage4":
						md.write(
							'<p>Before too long you decide it is only fair to return the favour so slide yourself down the bed so that you can get a taste straight from the source.</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'go more', Place, 'type=drtinafunfemale&stage=stage5');
						break;
					case "stage5":
						md.write(
							'<p>Before too long you are scissoring with each other and things are rapidly coming to a head..</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'go more', Place, 'type=drtinafunfemale&stage=stage6');
						break;
					case "stage6":
						md.write(
							'<p>As you finally feel the pressure building up inside Tina spins you up onto your hands and knees and with a combination of adroit fingers and nimble tongue brings you to a shuddering climax.</p>' +
							'<p>"So are you staying with me tonight ' + perYou.getPersonName() + ' or do you have other things to do?"</p>'
						);
						startQuestionsOnly();
						addLinkToPlaceC(md, 'talk more to Tina', Place);
						break;						
				}
				WritePlaceFooter(md);
				return true;				
			}			
		}
		
		if (Place == 269 && sType == "drtinapool") {
			WaitHereOnly(4);
			md = WritePlaceHeader();			
			this.showPerson("tinapool.jpg");
			addPlaceTitle(md, "Swimming with Tina");
			md.write(
				'<p>You ask Tina is she is interested in a swim, and she enthusiastically agrees, and meets you near one of the seats at the edge of the pool</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"let\'s have some more fun"', Place, 'type=drtinapoolsex');
			addLinkToPlaceC(md, 'return to the hotel room', 181);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 269 && sType == "drtinapoolsex") {
			md = WritePlaceHeader();			
			this.showPerson("tinapoolsex.jpg");
			addPlaceTitle(md, "Pool Fun with Tina");
			md.write(
				'<p>The seating is quite private so you suggest some more \'intimate\' fun. Of course Tina agrees!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'return to the hotel room', 181);
			WritePlaceFooter(md);
			return true;
		}
		
		if (Place == 445) {
			if (sType == "carryonwaiting") {
				this.setFlag(7);
				md = WritePlaceHeader();			
				this.showPerson("tkhospital1.jpg");
				addPlaceTitle(md, "What a Carry On");
				md.write(
					'<p>You decide to go along to her office and wait for her there. As you go down the corridor you start to wonder what exactly is going on around here as something doesn’t quite seem right – the sights are reminiscent of something…</p>' +
					'<o>Flummoxed and unable to put your finger on what is causing this feeling you reach the office that Matron told you about and go inside to wait.</p>' +
					'<p>As you shut the door and sit down to wait in the office you feel as if you have left behind whatever it was that was giving you an odd feeling – for now at any rate – and wait with eager anticipation for Tina to return.</p>' +
					'<p>Finally the door opens and Tina enters.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'she addresses you', 445, 'type=carryonwaiting2');
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "carryonwaiting2") {
				md = WritePlaceHeader();			
				this.showPerson("tkhospital2.jpg");
				addPlaceTitle(md, "Carry On Doctor");
				md.write(
					'<p>"Oh, hi ' + perYou.getPersonName() + ', Catherine has told me all about you. I have been looking forward to meeting you."</p>' +
					'<p>"Oh really", you reply, rather stunned that if she knows all about you she is not more concerned.</p>' +
					'<p>Seeing your look of confusion, she continues:</p>' +
					'<p>"So, what is it going to be – I have the same idea as Catherine – you could always control me or if you want me to Carry On Nursing I can do and you will still get all the benefits – and some more besides."</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'let her carry on', 445, 'type=doctortinacharmhospitalend', 'You decide that it could be interesting to let Tina continue doing what she has been doing so you do not charm her.</p><p>When she realises your decision her face lights up with a smile like the Cheshire cat’s.</p><p>Oh ' + perYou.getPersonName() + ' thank you, I am sure you won’t regret this.</p><p>I haven’t got time to explain what I actually do here right now, but I do have time for something else if you do…');
				WritePlaceFooter(md);
				return true;			
			}	
			if (sType == "doctortinacharmhospital1") {
				md = WritePlaceHeader();			
				this.showPerson("tkhospital3.jpg");
				addPlaceTitle(md, "Doctor kay Under a Charm Spell");
				md.write(
					'<p>You decide that whatever it is that Tina was doing is not as important as ensuring your total control over her. She shudders as the charm takes effect.</p>' +
					'<p>Tina starts to undress, matching you for speed or perhaps even bettering you. Her desire for you spurring her every move.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'tell her to remove mpre', 445, 'type=doctortinacharmhospital2');
				WritePlaceFooter(md);
				return true;				
			}
			if (sType == "doctortinacharmhospital2") {
				md = WritePlaceHeader();			
				this.showPerson("tkhospital3.jpg");
				addPlaceTitle(md, "Doctor Kay Under a Charm Spell");
				md.write(
					'<p>As her shirt and bra fall away you watch on delightedly waiting for the opportune moment to join in with the fun.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'join her', 445, 'type=doctortinacharmhospital3');
				WritePlaceFooter(md);
				return true;				
			}
			if (sType == "doctortinacharmhospital3") {
				md = WritePlaceHeader(false, 'td-left-med');			
				this.showPerson("tkhospital5.jpg");
				addPlaceTitle(md, "Doctor Kay Under a Charm Spell");
				md.write(
					'<p>Finally, when she only has stockings and suspenders left you stand up and start to move towards her.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'approach her', 445, 'type=doctortinacharmhospital4');
				WritePlaceFooter(md);
				return true;				
			}	
			if (sType == "doctortinacharmhospital4") {
				md = WritePlaceHeader(false, perYou.isMaleSex() && !isExplicit() ? '' : 'td-left-med');			
				if (perYou.isMaleSex()) this.showPersonRorX("tkhospital6a.jpg");
				else this.showPerson("tkhospital6b.jpg");
				addPlaceTitle(md, "Doctor Kay Under a Charm Spell");
				md.write(
					'<p>As you reach her she leans back and opens herself up to you, an offering which you gratefully accept, starting to sate the lust that has been building since you found out about her from Catherine.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'take her', 445, 'type=doctortinacharmhospital5');
				WritePlaceFooter(md);
				return true;				
			}	
			if (sType == "doctortinacharmhospital5") {
				md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
				if (perYou.isMaleSex() && isExplicit()) this.showPersonX("tkhospital7a.jpg");
				else this.showPerson("tkhospital7b.jpg");
				addPlaceTitle(md, "Doctor Kay Under a Charm Spell");
				if (perYou.isMaleSex()) md.write('<p>She bounces up higher than usual and drops back down with a sultry moan as you slide into her rear. Seemingly spurred on by this she goes faster and faster and her moans get louder and louder.</p>');
				else md.write('<p>Looking into each other’s faces you desperately start rubbing one out seemingly in a sprint race to see who can be first to finish. After what seems like no time at all you realise that you are both nearing completion.</p>');
				startQuestions();
				addLinkToPlaceC(md, 'take her', 445, 'type=doctortinacharmhospital6');
				WritePlaceFooter(md);
				return true;				
			}	
			if (sType == "doctortinacharmhospital6") {
				md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-med' : '');
				if (perYou.isMaleSex() && isExplicit()) this.showPersonX("tkhospital8a.jpg");
				else this.showPerson("tkhospital8b.jpg");
				addPlaceTitle(md, "Doctor Kay Under a Charm Spell");
				if (perYou.isMaleSex()) md.write('<p>She rolls off you on the bed and you jump up to stand behind her and continue your tryst. Still you continue to pound away at her arse, as you go on so her moans increase driving you faster still into her.</p>');
				else md.write('<p>With a loud moan you come at the same time as Tina, who rolls backwards onto the bed displaying herself for you in all her glory. Panting, you give her a final look packed with desire and then turn away to start to dress.</p>');
				startQuestions();
				addLinkToPlaceC(md, perYou.isMaleSex() ? 'take her' : "get dressed", 445, perYou.isMaleSex() ? 'type=doctortinacharmhospital7' : 'type=doctortinacharmhospitalend');
				WritePlaceFooter(md);
				return true;				
			}	
			if (sType == "doctortinacharmhospital7") {
				md = WritePlaceHeader(false, isExplicit() ? 'td-left-med' : '');			
				this.showPersonRorX("tkhospital9a.jpg");
				addPlaceTitle(md, "Doctor Kay Under a Charm Spell");
				md.write(
					'<p>Eventually you pull out of her and indicate that you are finally reaching the end, so she spins round on the bed and places her mouth next to you to catch as much as possible. Finally sated you both stand up and start to dress.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'get dressed', 445, 'type=doctortinacharmhospitalend');
				WritePlaceFooter(md);
				return true;				
			}				
			if (sType == "doctortinacharmhospitalend") {
				md = WritePlaceHeader(false, 'td-left-med');			
				this.showPerson("tkhospitalend.jpg");
				addPlaceTitle(md, this.isCharmedBy() ? "Doctor Kay Under a Charm Spell" : "Doctor Kay");
				if (this.isCharmedBy()) {
					md.write(
						'<p>Tina looks up at you as you get up to leave,</p>' +
						'<p>Thank you ' + perYou.getMaster() + '. I will see you at the hotel later once I have stopped everything I was doing here."</p>' +
						'<p>"Well done Tina" you reply, and as you walk door you cannot but wonder what it is you have foregone by charming her when you did not need to.</p>'
					);
				} else {
					md.write(
						'<p>Having finished dressing you turn and look at the door before finally getting up.</p>' +
						'<p>As you get up to leave Tina looks up at you smiling:</p>' +
						'<p>"You can come and visit me here any time ' + perYou.getPersonName() + '. If you come and find me at the hotel one evening I can explain some of the things that happen here if you like. I daren’t show you them before you know what to expect."</p>' +
						'<p>"Alright Tina, I’ll see you later", you answer and walk out the door.</p>'
					);
				}
				startQuestions();
				addLinkToPlaceC(md, 'leave her for now', 444);
				WritePlaceFooter(md);
				return true;				
			}
		}
		
		if (Place != 69) return false;
		
		if (sType == "followntina") {
			md = WritePlaceHeader();
			setPlaceKnown("NursesOffice");
			this.showPerson("tinasch1a.jpg");
			addPlaceTitle(md, "Other School Nurse");
			md.write(
				'<p>You reach the door just in time before she can close it.</p>' +	
				'<p>She looks you up and down with a puzzled expression as there is evidently nothing wrong.	</p>' +
				'<p>"Who are you?", she asks.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'you tell her your name', Place, 'type=followntina2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "followntinalater") {
			md = WritePlaceHeader();
			this.showPerson("tinasch1a.jpg");
			addPlaceTitle(md, "Other School Nurse");
			md.write(
				'<p>You open the door and you see the nurse, or is it doctor, standing there with a puzzled expression as there is evidently nothing wrong.</p>' +
				'<p>"Who are you?", she asks.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'you tell her your name', Place, 'type=followntina2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "followntina2") {
			md = WritePlaceHeader();
			this.setFlag(2);
			this.showPerson("tinasch2a.jpg");
			addPlaceTitle(md, "Other School Nurse");
			md.write(
				'<p>"' + perYou.getPersonName() + '" you reply, and ask what is she doing here, Catherine is the school nurse.</p>' +
				'<p>She moves to close the door and have you leave again as there is nothing wrong with you.</p>' +
				'<p>Again you ask about Catherine and if she is replacing your friend. She smiles,</p>' +
				'<p>“I’m Dr. Kay, Katrina Kay, though my friends normally call me Tina. Catherine asked me to cover for her as a favour.”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'leave her', 70, '', 'As you stand there puzzling over Catherine\'s absence she shuts the door on you leaving you standing in the hallway.</p><p>You realise that you will have to go and find her at the hospital, unless you can speak to Catherine in the meantime in the hope that she can give you any idea as to where to find her.');
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "doctortinacharm1") {
			md = WritePlaceHeader();
			this.showPerson("tinasch2c.jpg");
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>You recite the spell as quietly as you can and Doctor Kay reacts mildly. Her eyes do not change, but something definitely happened, she must be under the spell.</p>' +	
				'<p>Do you want to push her or ease her in by making her think you are here for a check up?</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'push her', Place, 'type=doctortinacharmpush1');
			addLinkToPlaceC(md, 'check-up', Place, 'type=doctortinacharmexam1');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmpush1") {
			md = WritePlaceHeader();
			this.charmThem(4);
			this.showPerson("tinasch3b.jpg");
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>You concentrate hard and explain the new state of play to her.</p>' +
				'<p>"Strip for me Tina, embrace your new inner self"</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'further', Place, 'type=doctortinacharmpush2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmpush2") {
			md = WritePlaceHeader();
			this.showPerson("tinasch3c.jpg");
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>You tell her, "Keep going, be my obedient nurse."</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'further still', Place, 'type=doctortinacharmpush3');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmpush3") {
			md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-med' : '');
			if (perYou.isMaleSex() && isExplicit()) this.showPersonX("tinasch3e.jpg");
			else this.showPerson("tinaschalt3.jpg");
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>As you tire of watching you decide you cannot wait any longer and bend her over.</p>' +
				'<p>You tell her, "How do you like your new role Tina, my assessment won\'t take long."</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '"Roll Over"', Place, 'type=doctortinacharmpush4');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmpush4") {
			md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-med' : '');
			if (perYou.isMaleSex() && isExplicit()) this.showPersonX("tinasch3f.jpg");
			else this.showPerson("tinaschalt2.jpg");			
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>As you instructed Tina rolls over...</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'just one more nudge', Place, 'type=doctortinacharmpush5');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmpush5") {
			md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-med' : '');
			if (perYou.isMaleSex() && isExplicit()) this.showPersonX("tinasch3g.jpg");
			else this.showPerson("tinaschalt1.jpg");			
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>As she loses herself further and further into your power you know you cannot last long.</p>' +
				'<p>Suddenly you spin her round and face her.</p>' +
				'<p>You tell her, "What a wonderful find you are Tina. One of these days I may have to find another job for you or take you home."</p>' +
				'<p>She replies, "Thank you ' + perYou.getMaster() + ', if I am not working here or at the Hospital you can find me at the hotel or at my evening job".</p>' +
				'<p>As you return to the school corridor you wonder what she meant by “Evening Job”</p>' +
				'<p><b>No more content in this release</b></p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'leave her for now', 70);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmexam1") {
			md = WritePlaceHeader();
			this.charmThem(1);
			this.showPerson("tinasch3b.jpg");
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>You realise you need an excuse in case anyone is in the corridor listening, and you need it fast...</p>' +
				'<p>"Well Tina, I am the head ' + perYou.getSex() + ' and I\'ve been asked to welcome you to the school."</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Tina responds "Come In"', Place, 'type=doctortinacharmexam2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmexam2") {
			md = WritePlaceHeader();
			this.showPerson("tinasch3c.jpg");
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>As you step in Tina says,</p>' +
				'<p>"Oh, I\'ve heard all about you from Catherine, she\'s told me what to expect and I am looking forward to it."</p>' +	
				'<p>Even though you are certain you hit her with the charm this seems a little odd. She seems to be stripping of her own volition.</p>' +	
				'<p>Puzzled you ask:</p>' +
				'<p>“What do you mean: ”Looking forward to it?” Do you mean you wanted this?”</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'she replies...', Place, 'type=doctortinacharmexam3');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmexam3") {
			md = WritePlaceHeader();
			this.showPerson("tinasch3i.jpg");
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>She tells you, "Why do you think I was slow shutting the door ' + perYou.getPersonName() + '."</p>' +
				'<p>Before you can adjust you see she has stripped down and moves in front of you.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Tina continues', Place, 'type=doctortinacharmexam4');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmexam4") {
			md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-med' : '');
			if (perYou.isMaleSex() && isExplicit()) this.showPersonX("tinasch3d.jpg");
			else this.showPerson("tinaschalt1.jpg");			
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>As she steadies herself in front of you you wonder what hidden agenda she might have, but as Tina gets to work you cease wondering and just sit back and relax.</p>' +	
				'<p>“That\'s wonderful. And you say Catherine put you up to this?”</p>' +	
				'<p>Tina lifts her head and looks you in the eye.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Tina continues', Place, 'type=doctortinacharmexam5');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmexam5") {
			md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-med' : '');
			if (perYou.isMaleSex() && isExplicit()) this.showPersonX("tinasch3e.jpg");
			else this.showPerson("tinaschalt2a.jpg");			
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>Slowly she turns around.</p>' +
				'<p>"Oh, she told me everything, and I have been looking forward to this".</p>' +
				'<p>With that she slides back to you with a satisfied grin on her face.</p>' +	
				'<p>As she turns around you notice the signet ring on her finger and wonder just how much of this is forced and how much is voluntary. Not that that is very important as you are far too preoccupied at this moment in time.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Tina continues', Place, 'type=doctortinacharmexam6');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmexam6") {
			md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-med' : '');
			if (perYou.isMaleSex() && isExplicit()) this.showPersonX("tinasch3f.jpg");
			else this.showPerson("tinaschalt2.jpg");			
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>As she feels you tensing up she jumps turns around for a final flourish.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'Tina continues', Place, 'type=doctortinacharmexam7');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmexam7") {
			md = WritePlaceHeader(false, perYou.isMaleSex() && isExplicit() ? 'td-left-med' : '');
			if (perYou.isMaleSex() && isExplicit()) this.showPersonX("tinasch3g.jpg");
			else this.showPerson("tinaschalt3.jpg");			
			addPlaceTitle(md, "Tina Under a Charm Spell");
			md.write(
				'<p>You come to a shuddering conclusion and are waiting breathlessly.</p>' +
				'<p>As you are both starting to clear up and you start to be able to concentrate fully again in the aftermath of your tryst you realise she is still calling you by your first name.</p>' +
				'<p>As you get your breath back you decide you have to ask about the ring.</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'ask Tina', Place, 'type=doctortinacharmexam8');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmexam8") {
			md = WritePlaceHeader(false, 'td-left-med');
			if (perYou.isMaleSex() && isExplicit()) this.showPerson("tinasch3h.jpg");
			else this.showPerson("tinaschalt5.jpg");				
			addPlaceTitle(md, "Tina Not Under a Charm Spell");
			md.write(
				'<p>You finally corral your thoughts and ask her:</p>' +
				'<p>“So what happened there then?”</p>' +
				'<p>She looks at you like the cat that got the cream and answers:</p>' +
				'<p>"I organised this with Catherine. My signet ring gave me protection so we both got what we wanted, and you still have me always but next time we meet you will have the same choice to make as you did with Catherine."</p>' +
				'<p>As you realise the import of her words you realise you haven’t asked the key question:</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, '“So where will I find you?”', Place, 'type=doctortinacharmexam9');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "doctortinacharmexam9") {
			md = WritePlaceHeader();
			this.showPerson("tinasch3i.jpg");
			addPlaceTitle(md, "Tina");
			md.write(
				'<p>Tina explains "I work shifts as a nurse covering both here to help Catherine and my main job at the hospital and am staying at the hotel until I can find somewhere better…</p>' +
				'<p>And at night I do earn some money on the side; if you don’t mind my continuing that line of work."</p>' +
				'<p>As you ponder these last statements you realise she has quietly slipped out the door and gone back to work around the school.</p>' +
				'<p>She should present a pleasant addition to your menagerie. Whilst you are unsure yet as to whether there is space for her at home you are fairly confident that you know where to find her at night even if she is not at the hotel or hospital.</p>' +
				'<p><b>No more content in this release</b></p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'leave her for now', 70);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "drtinafuck") {
			md = WritePlaceHeader(false, 'td-left-med');
			if (perYou.isMaleSex() && isExplicit()) this.showPerson("tinasch3h.jpg");
			else this.showPerson("tinaschalt5.jpg");				
			addPlaceTitle(md, "Getting a Check-up");
			md.write(
				'<p>You ask Dr Tina for a checkup, and for a moment she looks concerned as the professional she is, but she quickly realises you mean something more intimate.</p>' +
				'<p>You thoroughly checkout, up and down, the body of the lovely doctor.</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'talk more to Tina', Place);
			WritePlaceFooter(md);
			return true;
		}
		return false;
	};
	
	per.showPersonTextHere = function(md)
	{
		if (Place == 69) {
			if (!this.isHere()) md.write('<p>It seems Dr. Kay is not here at the moment, then again the position of School Nurse is only part-time. She must be somewhere else.</p>');
			else md.write('<p>Dr. Tina Kay is here, ready to give you a checkup.</p>');
		} else if (Place == 181 && this.isHere()) {
			md.write(
				'<p>You knock on the door of Tina’s room and here her shout from inside to “come on in”.</p>' +
				'<p>As you enter you see Tina kneeling on the bed getting her clothes ready for the next day.</p>'
			);
		}
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 69 && this.isHere() && this.isCharmedBy() && sType === "") {
			addLinkToPlaceC(md, 'ask Dr. Tina for a checkup', 69, 'type=drtinafuck');
		} else if (Place == 181 && this.isHere() && sType === "") {
			addLinkToPlaceC(md, 'have some fun', Place, 'type=drtinafun1');
			if (checkPlaceFlag("Hotel", 11)) addLinkToPlaceC(md, '"Let\'s go for a swim?"', 269, 'type=drtinapool');
			addSleepLink(md, "go to bed for the night with Tina", "Sleeping with Tina",
				'<p style="position:absolute;left:5%;top:75%;cursor:pointer;font-size:1.1em;width:90%">' +
				'You lie down with Tina and settle down for what turns out to be a surprisingly good nights rest. When you wake in the morning you realise that you are lying in the bed alone and that Tina’s uniform is no longer in the wardrobe… She must be on the early shift. Rousing yourself you dress and head back to the lobby.',
				this.getImg('tinahotelbedsleep.jpg')
			);
		}
	};
	
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {
			// Nurses Office
			if (Place == 69 && this.isHere()) {
				if (!this.checkFlag(2)) addComments("You do not know her name, the spell will not work!");
				else if (!isSpellKnown("Shielded Charm")) addComments("It is too public here, the door is open and students regularly pass by");
				else CastCharmSpell("DoctorKay", 69, 4, 'type=doctortinacharm1');
				return "handled";
			}
			// Hotel Pool
			if (Place == 269 && this.isHere()) {
				if (!this.checkFlag(2)) addComments("You do not know her name, the spell will not work!");
			}
			if (Place == 445) {
				if (sType == 'carryonwaiting') addComments("Don\'t be impatient, let her speak!");
				else if (sType == 'carryonwaiting2') CastCharmSpell("DoctorKay", Place, 4, 'type=doctortinacharmhospital1');
				return "handled";
			}
		}
		return '';
	};
}
