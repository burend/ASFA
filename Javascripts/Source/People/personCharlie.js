/**********************************************
Charlie
Manager at the Gym
Two versions, Male and Female (see dress)
***********************************************/
function CharlieConvinced(reassure)
{
	findPerson("AmyRoss");
	per.other = nTime;
	if (reassure === true) per.setFlag(8);
}
	
function initialiseCharlie()
{
	addPerson("Charlie", 0, "Charlie", "Female", false);
	
	per.nBreakLimit = 3;
	per.isConvinced = function() { return this.other > this.nBreakLimit; };
	
	per.getPersonAddress = function() { return this.isCharmedBy() ? 'Kings Gym, 2 Cherise Rd, Glenvale' : ''; };
	
	// Gender
	per.getPersonGender = function() { return this.dress == "Female" ? "woman" : "man"; };
	per.isBornMale = function() { return this.checkFlag(1); };

	per.getPossessionFace = function() { return "home1"; };
	
	per.whereNow = function()
	{
		if (sType.indexOf("meetcharlie") != -1 || sType.indexOf("charmcharlie") != -1 || Place == 434 || (Place == 269 && sType == "charliepool")) return Place;
		return this.place;
	};
	
	per.passTimeDay = function() {
		this.setFlag(4, false);
		if (this.place == 261) this.setFlag(12);		// Ready for jail finale
		return '';
	};
	
	per.showEventPopup = function()
	{
		return false;
	};
	
	per.showEvent = function()
	{
		var md, sHe, sHis, sHim, sUhe, perAmy;
		
		if (Place == 269 && sType == "charliepool") {
			WaitHereOnly(6);
			md = WritePlaceHeader();
			this.showPerson("pool.jpg");
			addPlaceTitle(md, "Swimming with Charlie");
			md.write(
				'<p>Charlie joins you for a swim, initially suggests a swimming race for a few lengths of the pool. You refuse for now, suggest more swimming together for fun!</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'say goodbye to Charlie after the swim', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "charliebambi") {
			// Discipline with Bambi	
			sHe = this.getHeShe();
			sHis = this.getHisHer();
			sUhe = capitalize(sHe);
			sHim = this.getHimHer();
			WaitHereOnly(3);		// 30 mins
			md = WritePlaceHeader();
			this.showPerson("break-discipline-pick.jpg");
			addPlaceTitle(md, "Bambi\'s Discipline");
			md.write(
				'<p>You tell Charlie that you want to take ' + sHim + ' to see Bambi'
			);
			if (!this.checkFlag(11)) {
				md.write(
					' and ' + sHe + ' says, "You mean the barmaid at the hotel?"</p>' +
					'<p>You tell Charlie yes and that Bambi is a loyal friend and you want the two to meet and discuss something. Charlie is curious and agrees to go with you to the Broken Inn Hotel. When you arrive Bambi takes you both to the cellar and takes the lead,</p>' + 
					'<p>"Charlie, ' + perYou.getLord() + ' is my one and only ' + perYou.getMaster() + ' and I want you to join me as a loyal slave of them." Charlie starts to say something, and Bambi hands ' + sHim + ' something, it is a ball-gag. She continues,</p>' +
					'<p>"Slaves only speak when their ' + perYou.getMaster() + ' allow it. I see you need to be taught proper discipline. Put it on". Charlie looks at you but then immediately back at Bambi, you can see ' + sHe + ' has decided this is some sort of game and then puts on the gag!</p>'
				);
			} else {
				md.write(
					' and Charlie is happy to see her again. It seems Charlie enjoyed ' + sHis + ' last training session. When you arrive you go with Bambi to the cellar and Charlie immediately puts on the ball-gag again.</p>'
				);
			}
			md.write(
				'<p>Bambi asks you, "' + perYou.getLord() + ' how do you want me to discipline this slave?" She picks up a riding crop, "Something physical, or maybe something public?"</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'physical', Place, 'type=charliebambipyhsical' + (this.checkFlag(11) ? '2' : '1'));
			addLinkToPlaceC(md, 'public', Place, 'type=charliebambipublic');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charliebambipyhsical1" || sType == "charliebambipyhsical2") {
			// Discipline with Bambi	
			sHe = this.getHeShe();
			sHis = this.getHisHer();
			sUhe = capitalize(sHe);
			sHim = this.getHimHer();
			this.setFlag(11);
			WaitHereOnly(6);		// 1Hr
			var wd = this.dress == "Male" && isExplicit() && Math.random() < 0.5
			md = WritePlaceHeader();
			if (this.dress == "Male") this.showPersonRorX("break-discipline1" + (wd ? "a" : "b") + ".jpg");
			else this.showPersonRandom("break-discipline" + (sType == "charliebambipyhsical1" ? "1" : "2"), sType == "charliebambipyhsical1" ? 3 : 2);
			addPlaceTitle(md, "Bambi\'s Physical Discipline");
			md.write(
				'<p>Bambi ties up Charlie and uses her riding crop to lightly whip Charlie, slowing increasing the force of the blows. After a while she asks Charlie who is ' + sHis + ' ' + perYou.getMaster() + ', making it clear there is only one answer permitted.</p>'
			);
			this.other += 1;
			if (this.other >= this.nBreakLimit) {
				// Done, Charlie will now talk about Amy
				md.write(
					'Charlie cries out, "' + perYou.getPersonName() + ' is my ' + perYou.getMaster() + '. You immediately ask ' + sHim + ' then in that case tell me about Amy! Charlie seems to reach a decision and starts talking while Bambi continues her attentions,,</p>' +
					'<p>"Amy had been working for me, ahh, in a different way. Since whatever happened she has been a lot more...ow..sensual. She has been visiting customers homes to give private massages for a while, ahhh, but since then she has been having sex with them too. Not that she was charging for it, just having sex with people she liked, and since then she likes almost everyone. Ouch!". ' + sUhe + ' pauses and continues,</p>' +
					'<p>"Once I learned that I have been charging extra for her massages and directing people to her more interested in the post-massage games. Ahhhh" What! Charlie has been pimping out Amy! You are outraged, if anyone pimps out...I mean no-one pimps out your friends! You direct Bambi to strike harder and tell Charlie that ' + sHe + ' will not be doing that anymore!</p>' +
					'<p>It is time to decide, will you get Charlie to arrange a meeting with Amy, you can try to convince her of your good intentions, or \'protect\' her with the charm spell. You could also ask Charlie to reassure Amy of your good intentions so she is more receptive.</p>'
				);
			} else {
				// Not trusting enough yet
				md.write(
					'You realise after a while that Charlie is resisting. For a moment ' + sHe + ' says "Amy is..Ahhh...it\'s bad...I cannot..." but that is all. You have made some progress but you will have to try again later.</p>' +
					'<p>You think it is best to end the session and leave Charlie for a while and probably try again tomorrow.</p>'
				);
			} 
			startQuestions();
			if (this.other >= this.nBreakLimit) {
				addLinkToPlaceC(md, 'tell Charlie to arrange a meeting with Amy', 124, '', 'You tell Charlie to arrange a meeting with Amy and end the trance. Charlie immediately says ' + sHe + ' will set something up with Amy <b>tomorrow</b> and you leave ' + sHim + ' for now', '', 'CharlieConvinced()');
				addLinkToPlaceC(md, 'tell Charlie to reassure Amy', 124, '', 'You tell Charlie to talk to Amy and reassure her of your friendship and good intentions and end the trance. Charlie immediately says ' + sHe + ' will talk to Amy for you, but says it will take a while. You tell Charlie to NOT arrange any more private massages for Amy', '', 'CharlieConvinced(true)');
			} else addLinkToPlaceC(md, 'have Bambi untie Charlie and leave for now', 124);
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charliebambipublic") {
			// Public with Bambi	
			sHe = this.getHeShe();
			sHis = this.getHisHer();
			sUhe = capitalize(sHe);
			sHim = this.getHimHer();
			WaitHereOnly(6);		// 1Hr
			md = WritePlaceHeader();
			this.showPersonRandom("break-public1", this.dress == "Male" ? 3 : 2);
			addPlaceTitle(md, "Bambi\'s Physical Discipline");
			md.write(
				'<p>Bambi ties up Charlie then walks ' + sHim + ' outside of the Hotel, '
			);
			if (this.dress == "Male") md.write('and then ties him up to a wall at the side of the Hotel, clearly visible to passersby, and completely naked.');
			else md.write('and takes her to a nearby park area and secures her to a tree, gagged, naked and visible to all');
			md.write('.</p><p>Bambi then proceeds to slap Charlie, explaining that as a slave this is all ' + sHe + ' deserves and needs. After a while she asks Charlie who is ' + sHis + ' ' + perYou.getMaster() + ', making it clear there is only one answer permitted.</p>');
			this.other += 1;
			if (this.other >= this.nBreakLimit) {
				// Done, Charlie will now talk about Amy
				md.write(
					'Charlie cries out, "' + perYou.getPersonName() + ' is my ' + perYou.getMaster() + '. You immediately ask ' + sHim + ' then in that case tell me about Amy! Charlie seems to reach a decision and starts talking while Bambi continues her attentions,,</p>' +
					'<p>"Amy had been working for me, ahh, in a different way. Since whatever happened she has been a lot more...ow..sensual. She has been visiting customers homes to give private massages for a while, ahhh, but since then she has been having sex with them too. Not that she was charging for it, just having sex with people she liked, and since then she likes almost everyone. Ouch!". ' + sUhe + ' pauses and continues,</p>' +
					'<p>"Once I learned that I have been charging extra for her massages and directing people to her more interested in the post-massage games. Ahhhh" What! Charlie has been pimping out Amy! You are outraged, if anyone pimps out...I mean no-one pimps out your friends! You direct Bambi to strike harder and tell Charlie that ' + sHe + ' will not be doing that anymore!</p>' +
					'<p>It is time to decide, will you get Charlie to arrange a meeting with Amy, you can try to convince her of your good intentions, or \'protect\' her with the charm spell. You could also ask Charlie to reassure Amy of your good intentions so she is more receptive.</p>'
				);
			} else {
				// Not trusting enough yet
				md.write(
					'You realise after a while that Charlie is resisting. For a moment ' + sHe + ' says "Amy is..Ahhh...it\'s bad...I cannot..." but that is all. You have made some progress but you will have to try again later.</p>' +
					'<p>You think it is best to end the session and leave Charlie for a while and probably try again tomorrow.</p>'
				);
			} 
			startQuestions();
			if (this.other >= this.nBreakLimit) {
				addLinkToPlaceC(md, 'tell Charlie to arrange a meeting with Amy', 124, '', 'You tell Charlie to arrange a meeting with Amy and end the trance. Charlie immediately says ' + sHe + ' will set something up with Amy <b>tomorrow</b> and you leave ' + sHim + ' for now', '', 'CharlieConvinced()');
				addLinkToPlaceC(md, 'tell Charlie to reassure Amy', 124, '', 'You tell Charlie to talk to Amy and reassure her of your friendship and good intentions and end the trance. Charlie immediately says ' + sHe + ' will talk to Amy for you, but says it will take a while. You tell Charlie to NOT arrange any more private massages for Amy', '', 'CharlieConvinced(true)');
			} else addLinkToPlaceC(md, 'have Bambi untie Charlie and leave for now', 124);
			WritePlaceFooter(md);
			return true;
		}		
		
		if (Place == 261) {
			if (sType == "charliejail") {
				// Arrested
				WaitHereOnly(12);		// 1Hr
				this.moveThem(261);
				setPlaceKnown("JailCell");
				md = WritePlaceHeader();
				this.showPerson("break-jail1.jpg");
				addPlaceTitle(md, "Charlie Under Arrest");
				md.write(
					'<p>You decide to talk Kerry Batton up on her idea, and you give her a call to arrange things. Within 15 minutes there is a commotion and then ' + getPoliceChief() + ' Batton arrives and tells Charlie that she is under arrest for prostitution and procuring prostitution. Charlie looks shocked and denies ever prostituting herself, and the after a pause, or anyone else.</p>' +
					'<p>As Charlie is taken away, ' + getPoliceChief() + ' Batton asks you to visit the police station to give evidence. You know there is no evidence to give, but this is just her playing to any people nearby. You agree and make your way separately to the police station.</p>' +
					'<p>When you arrive at the station you are asked to wait for a bit and then directed to the jail cells. In the cell area you see Charlie in one of the cells, her clothes in some disarray. ' + getPoliceChief() + ' Batton whispers to you that they had to do a <b>thorough</b> frisk search but then leaves you with Charlie for a bit. Charlie make no attempt to adjust her clothes, actually she exposes herself a bit more. She nervously tells you,</p>' +
					'<p>"Don\'t worry ' + perYou.getPersonName() + ', they have nothing on me for prostitution, I have never done anything like that.". You ask her about the other charge, and she clearly ignores you,</p>' +
					'<p>"I have called a lawyer and I am sure this can be sorted out soon. Thanks for visiting." You wonder if you should push on the procuring, but before you ask ' + getPoliceChief() + ' Batton returns and asks you to join her outside.</p>' +
					'<p>You follow and talk to Kerry and she assures you that they will now cross the lines here, but she will thoroughly interrogate Charlie, especially as she had been odd about the procuring charge. Kerry says that Charlie\'s lawyer is due soon and that it would be best if you leave for a while. She can at least keep Charlie here overnight and that if you return tomorrow Kerry should of gotten somewhere with her.</p>' +
					'<p>Alright, you agree and say you will return tomorrow and ask Kerry to tell Charlie you will be back later.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'leave Charlie for now', 168);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charliejailfinale") {
				// Arrested Final
				sHe = this.getHeShe();
				sHim = this.getHimHer();
				sUhe = capitalize(sHe);
				WaitHereOnly(12);		// 1Hr
				this.moveThem(435);
				this.setFlag(4);
				setPlaceKnown("JailCell");
				this.other = this.nBreakLimit + 1;
				md = WritePlaceHeader();
				this.showPerson("break-jail3.jpg");
				addPlaceTitle(md, "Charlie\'s Arrest");
				md.write(
					'<p>You ask about Charlie and ' + getPoliceChief() + ' Batton tells you that she cannot really keep Charlie any longer, there is no evidence of her being a prostitute and she will not fabricate evidence. Kerry does say she is suspicious that Charlie is involved somehow, possibly as a pocurer or similar but again there is no evidence. She has a number of times mentioned your support for Charlie and unwillingness to give evidence against her. Kerry takes you to Charlie and leaves you with her for a while. Charlie looks at you,</p>' +
					'<p>"Thanks for all your support ' + perYou.getPersonName() + ' I will make sure to thank you properly later..." but she is interrupted when Kerry returns and tells her she is free to go.</p>' +
					'<p>You walk with Charlie back towards her home and gym, and on the way you ask her about the procuring charge. She hesitates but she seems to reach a decision and starts talking,</p>' +
					'<p>"Amy had been working for me, in a different way. Since whatever happened she has been a lot more...sensual. She has been visiting customers homes to give private massages for a while, but since then she has been having sex with them too. Not that she was charging for it, just having sex with people she liked, and since then she likes almost everyone.". ' + sUhe + ' pauses and continues,</p>' +
					'<p>"Once I learned that I have been charging extra for her massages and directing people to her more interested in the post-massage games." What! Charlie has been pimping out Amy! You are outraged, if anyone pimps out...I mean no-one pimps out your friends!</p>' +
					'<p>By this time you have reached the Gym, it is time to decide, will you get Charlie to arrange a meeting with Amy, you can try to convince her of your good intentions, or \'protect\' her with the charm spell. You could also ask Charlie to reassure Amy of your good intentions so she is more receptive.</p>'
				);
				startQuestions();
				addLinkToPlaceC(md, 'tell Charlie to arrange a meeting with Amy', 435, '', 'You tell Charlie to arrange a meeting with Amy and end the trance. Charlie immediately says ' + sHe + ' will set something up with Amy <b>tomorrow</b> and you leave ' + sHim + ' for now', '', 'CharlieConvinced()');
				addLinkToPlaceC(md, 'tell Charlie to reassure Amy', 435, '', 'You tell Charlie to talk to Amy and reassure her of your friendship and good intentions and end the trance. Charlie immediately says ' + sHe + ' will talk to Amy for you, but says it will take a while. You tell Charlie to NOT arrange any more private massages for Amy', '', 'CharlieConvinced(true)');
				WritePlaceFooter(md);
				return true;
			}
		}
			
		// Charlies office/Home
		if (Place == 434) {
		
			if (sType == "charliehypno" || sType == "charliehypno1") {
				// Hypno in the office
				sHe = this.getHeShe();
				sHis = this.getHisHer();
				sUhe = capitalize(sHe);
				sHim = this.getHimHer();
				WaitHereOnly(6);		// 1Hr
				md = WritePlaceHeader();
				if (this.dress == "Male") this.showPersonRorX("break-hypno" + (this.checkFlag(9) && sType == "charliehypno" ? "2" : "1") + ".jpg");
				else this.showPerson("break-hypno" + (this.checkFlag(9) && sType == "charliehypno" ? "2" : "1") + ".jpg");
				addPlaceTitle(md, "Hypnotising Charlie");
				if (!this.checkFlag(9) || sType == "charliehypno1") {
					// First time
					setQueryParams('type=charliehypno1');
					this.setFlag(9);
					setPlaceKnown("CharliesOffice");
					md.write(
						'<p>Charlie says "Let\'s go to my office, we will not be interrupted there". ' + sUhe + ' leads you to an area at the back of the gym, explaining that this part is ' + sHis + ' family home, and how ' + sHe + ' had built the Gym as an addition some years ago.</p>' +
						'<p>When you arrive Charlie asks you to wait for a moment and a few minutes later ' + sHe + ' has changed out of their gym-wear into something more appropriate for an office.</p>' +
						'<p>You ask Charlie to sit and relax and you start talking calmly, and evenly, as you explain you want to put ' + sHim + ' into a hypnotic trance. The charm spell Charlie is under makes ' + sHim + ' willing and responsive but ' + sHe + ' asks why you want to do this. You explain it is was way to make you closer, a game of sorts. Charlie relaxes immediately ' + sHis + ' clothing falling away with ' + sHis + ' and your gentle touch. In a relatively short time Charlie is in the hypnotic trance.</p>'
					);					
				} else {
					// Second time
					md.write(
						'<p>Charlie again takes you to ' + sHis + ' office but this time does not bother the change. Instead ' + sHe + ' just removes ' + sHe + ' clothing entirely and sits on the edge of the desk ready for you.</p>' + 
						'<p>You start talking to Charlie and very quickly ' + sHe + ' falls into the hypnotic trance.</p>'
					);
				}
				// Common
				md.write(
					'<p>Quietly you talk to Charlie, emphasising your friendship and how much ' + sHe + ' trusts you, reinforcing the effects of the charm spell. After a while you talk about how much you are friends with Amy and how she trusts you as well and how much you trust her. '
				);
				this.other += this.nBreakLimit - 1;
				if (this.other >= this.nBreakLimit) {
					// Done, Charlie will now talk about Amy
					md.write(
						'Charlie seems to reach a decision and starts talking,</p>' +
						'<p>"Amy had been working for me, in a different way. Since whatever happened she has been a lot more...sensual. She has been visiting customers homes to give private massages for a while, but since then she has been having sex with them too. Not that she was charging for it, just having sex with people she liked, and since then she likes almost everyone.". ' + sUhe + ' pauses and continues,</p>' +
						'<p>"Once I learned that I have been charging extra for her massages and directing people to her more interested in the post-massage games." What! Charlie has been pimping out Amy! You are outraged, if anyone pimps out...I mean no-one pimps out your friends!</p>' +
						'<p>It is time to decide, will you get Charlie to arrange a meeting with Amy, you can try to convince her of your good intentions, or \'protect\' her with the charm spell. You could also ask Charlie to reassure Amy of your good intentions so she is more receptive.</p>'
					);
				} else {
					// Not trusting enough yet
					md.write(
						'You realise after a while that Charlie is resisting. For a moment ' + sHe + ' says "Amy is...it\'s bad...I cannot..." but that is all. You have made some progress but you will have to try again later.</p>' +
						'<p>You think it is best to end the trance and leave Charlie for a while and probably try again tomorrow.</p>'
					);
				} 
		
				startQuestions();
				if (this.other >= this.nBreakLimit) {
					addLinkToPlaceC(md, 'tell Charlie to arrange a meeting with Amy', 435, '', 'You tell Charlie to arrange a meeting with Amy and end the trance. Charlie immediately says ' + sHe + ' will set something up with Amy <b>tomorrow</b> and you leave ' + sHim + ' for now', '', 'CharlieConvinced()');
					addLinkToPlaceC(md, 'tell Charlie to reassure Amy', 435, '', 'You tell Charlie to talk to Amy and reassure her of your friendship and good intentions and end the trance. Charlie immediately says ' + sHe + ' will talk to Amy for you, but says it will take a while. You tell Charlie to NOT arrange any more private massages for Amy', '', 'CharlieConvinced(true)');
				} else addLinkToPlaceC(md, 'end the trance and leave Charlie for now', 435);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		// Charlie's Office/Home or the Gym in general (usually the locker room)
		if (Place == 434 || Place == 435) {
			if (sType == "charlietransformgendermale") {
				CastTransform(1);
				this.dress = "Female";
				md = WritePlaceHeaderNIP(true, '', 'black');
				showPopupWindow("Transformation",
					addImageRandomString('GenericSex/tgm2f', oImages.GenericSex.tgm2f, "50%") +
					'You cast the spell and Charlie cries out and he strips off his clothing. As you watch his body changes, growing plusher and you see his cock shrinking. His chest expands as you see large breasts grow and his face softens to a feminine appearance.</p>' +
					'<p>As you watch <i>her</i> tattoos change colour and seem to just become paint on <b>her</b> skin. Now <b>she</b> is very definitely female, nothing masculine is left, she is completely a woman!</p>' +
					'<p>She looks quite confused...</p>' +
					'<div style="clear:both;">' +
					addOptionLink("string", 'look at <b>her</b>', "dispPlace(Place,'type=charlietransformgendermale2')", "chatblock") +
					'</div>',
					'', '', true, true
				);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charlietransformgendermale2") {
				md = WritePlaceHeaderNIP(true, '', 'black');
		
				showPopupWindow("Transformed",
					this.addPersonString("transform.jpg", "height:max%", "right") +
					'Charlie\s body is clearly female and you ask her about her body paint and how she feels,</p>' +
					'<o>"It is strange, I do not know why I have this on, I will have to have a shower. But I feel great ' + perYou.getPersonName() + ', do I look great?"</p>' +
					'<p>Charlie seems to not remember she was a male, the spell has twisted her mind as well as her body, which is great! You tell her she is looking fine as always, she smiles and heads off to the showers.',
					'dispPlace()', '', true
				);
				setQueryParams("");
				WritePlaceFooter(md);
				return true;
			}	
			if (sType == "charlietransformgenderfemale") {
				md = WritePlaceHeaderNIP(true, '', 'black');
				this.dress = "Male";
				showPopupWindow("Transformation",
					addImageRandomString('GenericSex/tgf2m', oImages.GenericSex.tgf2m, "50%") +
					'You cast the spell and Charlie\'s cries out and she strips off her clothing. As you watch her body changes, growing more muscular and you see a cock growing between her legs. Her chest shrinks as her large breasts recede to a masculine chest and her face hardens to a equally masculine appearance.</p>' +
					'<p>As you watch <i>his</i> body you see markings start to form, markings all over <i>his</i> body looking very muck like extensive tattoos.</p>' +
					'<p>Charlie looks quite confused...</p>' +
					'<div style="clear:both;">' +
					addOptionLink("string", 'look at <b>him</b>', "dispPlace(Place,'type=charlietransformgenderfemale2')", "chatblock") +
					'</div>',
					'', '', true, true
				);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "charlietransformgenderfemale2") {
				md = WritePlaceHeaderNIP(true, '', 'black');
				showPopupWindow("Transformed",
					this.addPersonString("transform.jpg", "height:max%", "right") +
					'Charlie\s body is clearly male and you ask him about his tattoos and how he feels,</p>' +
					'<o>"It is strange, I forget when I got these, I must have been really, really drunk." He poses, "They do look good, don\'t they ' + perYou.getPersonName() + '?"</p>' +
					'<p>Charlie seems to not remember he was female, the spell has twisted his mind as well as his body, which is great. You tell him they look good as always, he smiles and heads off to the showers.',
					'dispPlace()', '', true
				);
				setQueryParams("");
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "meetcharliecharmed") {
				// Later meetings
				sHe = this.getHeShe();
				sHis = this.getHisHer();
				perAmy = findPerson("AmyRoss");
				this.setFlag(4);
				md = WritePlaceHeader();
				if (Place == 435) {
					this.showPerson("gym2.jpg");
					addPlaceTitle(md, "Charlie in the Locker Room");
					md.write('<p>When you step in you see ');
					if (this.dress == "Male") md.write('he is working on something but as you enter he starts to remove his top.</p>');				
					else md.write('she is working on something but as you enter she pulls off her top.</p>');	
				} else {
					this.showPerson("office1.jpg");
					addPlaceTitle(md, "Charlie in " + sHis + " Office");
					md.write('<p>When you step in you see ');
					if (this.dress == "Male") md.write('he is working on some papers but as you enter he starts to remove his top.</p>');				
					else md.write('she is working on some papers but as you enter she stand and sits on her desk. She pulls apart her top, exposing her breasts.</p>');						
				}
				if (this.checkFlag(5) && !perAmy.checkFlag(8) && !perAmy.isCharmedBy()) {
					if (!this.checkFlag(6) && !this.checkFlag(7) && !this.checkFlag(8) && this.checkFlag(5)) md.write('<p>You still have to work out how to convince Charlie to tell you more about Amy. You should check around with other people for ideas.</p>');
					else if (this.other < this.nBreakLimit) md.write('<p>You have worked out some ideas to convince Charlie but so far ' + sHe + ' is not willing to help you with Amy.</p>');
					else md.write('<p>Charlie is convinced to help you with Amy.</p>');
				}

				// Common to both genders
				startQuestions();
				if (!this.checkFlag(5)) {
					this.addQuestionR(md, 'ask about Amy',
						'Charlie replies, &quot;I am sorry but I promised Amy&quot;</p>' +
						'<p>Alright, this is getting frustrating, you are going to have to try something more radical. but what? You will have to consult with someone about manipulating the mind or about convincing the body</p>',
						"setPersonFlag(\\'Charlie\\', 5)"
					);
				} else if (this.other < this.nBreakLimit) {
					// Seeking Amy
					if (this.checkFlag(7)) addLinkToPlaceC(md, 'take Charlie to see Bambi', 161, 'type=charliebambi');		
					if (this.checkFlag(6)) {
						if (this.dress == "Female") addLinkToPlaceC(md, 'call ' + getPoliceChief() + ' Batton to have Charlie arrested', 261, 'type=charliejail');
						else addTextForQuestions(md, "Charlie is a man so " + getPoliceChief() + " Batton's idea will not work");
					}
					if (this.checkFlag(8)) addLinkToPlaceC(md, 'ask to speak to Charlie in a quiet room', 434, 'type=charliehypno');
					
				} else if (!perAmy.checkFlag(9) && !perAmy.isCharmedBy()) {
					// Can arrange a meeting with Amy!
					if ((!perAmy.checkFlag(8) && !perAmy.isCharmedBy()) || (perAmy.checkFlag(7) && !(perAmy.isCharmedBy() || perAmy.checkFlag(9)))) {
						if (!perAmy.checkFlag(10)) {
							addPopupLinkC(md, 'ask Charlie to setup a meeting with Amy', 'Amy!',
								perAmy.addPersonString("!pick.jpg", "40%", "right") +
								'You eagerly head off to see Amy and as you reach the place you suddenly bump into someone, it is Amy! As you step back you notice her hair is different...' +
								addLinkToPlaceC("string", 'no, she is a brunette as always', 435, 'type=meetamygym', 'Don\'t be silly, Amy is a brunette as she has always been!', "", '', "width:40%;margin-left:10%") +
								addLinkToPlaceC("string", 'she is now a blonde!', 435, 'type=meetamygym', 'Wow, Amy has dyed her hair, she is now a blonde!', "", "findPerson('AmyRoss').dress='Blonde'", "width:40%;margin-left:10%"),
								false, '', true
							);	
						} else addLinkToPlaceC(md, 'ask Charlie to setup a meeting with Amy', 435, 'type=meetamygym');
					} else this.addQuestionR(md, 'ask about Amy',	'Charlie replies, &quot;I doing my best but it takes some time, give me a few days to talk her around&quot;');
				} else if (!isPlaceKnown("CharliesHouse") || !isPlaceKnown("CharliesOffice")) {
					this.addQuestionR(md, 'ask about meeting Charlie somewhere else',
						(Place == 435 ? 'Charlie' : 'Charlie leads you through the gym to ' + sHis + ' office and') +
						' opens a drawer and hands you a key,</p>' +
						'"A key to the front door, but the security system will only allow the door to open when the Gym is closed. Visit me anytime you like!"',
						"setPlaceKnown(\\'CharliesOffice\\');setPlaceKnown(\\'CharliesHome\\')"
					);
				}
				
				if (this.getCharmedLevel() == 2) addLinkToPlaceC(md, 'suggest some benefits', Place, 'type=charliegymsex');
				addLinkToPlaceC(md, 'leave Charlie and the Gym', 37);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "charliegymsex") {
				// Sex at the Gym		
				md = WritePlaceHeader(false, isExplicit() && perYou.isMaleSex() ? '' : 'td-left-med');
				if (this.dress == "Male") {
					if (perYou.isMaleSex()) this.showPersonRandomRorX("gym-sexb", 2);
					else this.showPersonRorX("gym-sexga.jpg");
				} else {
					if (perYou.isMaleSex()) this.showPersonRandomRorX("gym-sexb", isExplicit() ? 2 : 1);
					else this.showPersonRandomRorX("gym-sexg", isExplicit() ? 3 : 1);
				}
				addPlaceTitle(md, "Friends with Benefits");
				md.write(
					'<p>You tell Charlie that you are friends with benefits and that why not take some of those benefits now. Charlie removes any remaining clothing and then helps you to quickly strip from your clothes. Charlie proves to be a skilled and passionate \'friend\'.</p>'
				);

				startQuestions();
				addLinkToPlaceC(md, 'talk more to Charlie', Place, 'type=meetcharliecharmed');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "charliebj") {
				// Charlie gives a Blowjob/lick
				if (!isExplicit()) {
					md = WritePlaceHeader(false, !isExplicit() && !perYou.isMaleSex() ? '' : 'td-left-med');
					this.showPersonRandom("home-bj-give-" + (perYou.isMaleSex() ? "b" : "g"), perYou.isMaleSex() ? 2 : 1);
				} else {
					md = WritePlaceHeader(false, this.isMaleSex() ? '' : 'td-left-med');
					if (this.isMaleSex() && !perYou.isMaleSex()) this.showPerson("home-bj-give-ga.jpg");
					else {
						if (!perYou.isMaleSex() && Math.random() < 0.5) this.showPersonRandomRorX("gym-sexg", 3);
						else this.showPersonRandomX("home-bj-give-" + (perYou.isMaleSex() ? "b" : "g"), perYou.isMaleSex() ? 2 : 1);
					}
				}
				addPlaceTitle(md, "Charlie");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>Charlie gives you a blowjob.</p>'
					);

				} else {
					md.write(
						'<p>Charlie licks you.</p>'
					);
				}
				startQuestionsOnly();
				addLinkToPlace(md, 'talk more to Charlie', Place);
				addLinkToPlace(md, 'leave the house', 37);
				WritePlaceFooter(md);
				return true;
			} 
			
			if (sType == "charliebjyou") {
				// You give a blowjob/lick
				if (this.isMaleSex()) {
					md = WritePlaceHeader();
					if (isExplicit() && perYou.isMaleSex()) this.showPersonX("home-bj-take-" + (perYou.isMaleSex() ? "b" : "g") + "a.jpg");
					else this.showPerson("home-bj-take-" + (perYou.isMaleSex() ? "b" : "g") + "a.jpg");

				} else {
					md = WritePlaceHeader(false, 'td-left-med');
					this.showPerson("home-bj-take-" + (perYou.isMaleSex() ? "b" : "g") + "a.jpg");
				}
				addPlaceTitle(md, "Charlie");
				if (this.isMaleSex()) {
					md.write(
						'<p>You give Charlie a blowjob.</p>'
					);

				} else {
					md.write(
						'<p>You lick Charlie\'s pussy.</p>'
					);
				}
				startQuestionsOnly();
				addLinkToPlace(md, 'talk more to Charlie', Place);
				addLinkToPlace(md, 'leave the house', 37);
				WritePlaceFooter(md);
				return true;
			} 
			
			if (sType == "charliefuck") {
				// fuck Charlie
				if (this.isMaleSex()) {
					md = WritePlaceHeader();
					this.showPersonRorX("home-fuck-take-" + (perYou.isMaleSex() ? "b" : "g") + "a.jpg");
				} else {
					md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
					if (isExplicit()) this.showPersonRandomX("home-fuck-take-" + (perYou.isMaleSex() ? "b" : "g"), perYou.isMaleSex() ? 3 : 1);
					else this.showPersonRandom("home-fuck-take-" + (perYou.isMaleSex() ? "b" : "g"), perYou.isMaleSex() ? 2 : 1);
				}
				addPlaceTitle(md, "Charlie");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>You fuck Charlie.</p>'
					);

				} else {
					md.write(
						'<p>You fuck Charlie with your strap-on.</p>'
					);
				}				
				startQuestionsOnly();
				addLinkToPlace(md, 'talk more to Charlie', Place);
				addLinkToPlace(md, 'leave the house', 37);
				WritePlaceFooter(md);
				return true;
			} 
			
			if (sType == "charliefuckyou") {
				// Charlie fucks you (male Charlie only)
				md = WritePlaceHeader();
				if (perYou.isMaleSex() && isExplicit()) this.showPersonX("home-fuck-give-ba.jpg");
				else this.showPersonRandom("home-fuck-give-" + (perYou.isMaleSex() ? "b" : "g"), perYou.isMaleSex() ? 2 : 1);

				addPlaceTitle(md, "Charlie");
				if (perYou.isMaleSex()) {
					md.write(
						'<p>Charlie fucks your ass.</p>'
					);

				} else {
					md.write(
						'<p>Charlie fucks you</p>'
					);
				}	
				startQuestionsOnly();
				addLinkToPlace(md, 'talk more to Charlie', Place);
				addLinkToPlace(md, 'leave the house', 37);
				WritePlaceFooter(md);
				return true;
			} 	
			
			if (sType == "charlie69") {
				// 69 with Charlie (felame Charlie only)
				md = WritePlaceHeader(false, 'td-left-med');
				if (perYou.isMaleSex()) this.showPersonRandomRorX("home-69-b", isExplicit() ? 2 : 1);
				else this.showPersonRandom("home-69-g", 1);

				addPlaceTitle(md, "Charlie");
				md.write(
					'<p>You have a 69 with Charlie.</p>'
				);
				startQuestionsOnly();
				addLinkToPlace(md, 'talk more to Charlie', Place);
				addLinkToPlace(md, 'leave the house', 37);
				WritePlaceFooter(md);
				return true;
			} 				
			
			if (sType == "charlietitfuck") {
				// tit-fuck her
				md = WritePlaceHeader(false, isExplicit() ? "td-left-med" : "");
				this.showPersonRorX("home-tf-ba.jpg");
				addPlaceTitle(md, "Charlie");
				md.write(
					'<p>You fuck Charlie\'s tits.</p>'
				);

				startQuestionsOnly();
				addLinkToPlace(md, 'talk more to Charlie', Place);
				addLinkToPlace(md, 'leave the house', 37);
				WritePlaceFooter(md);
				return true;
			}
			
		}
		
		// The Gym in general, not including office/home
		if (Place != 435) return false;
		
		if (sType == "meetcharlie" || sType == "meetcharliemale") {
			// Initial meeting
			this.setFlag(2);
			this.setFlag(4);
			md = WritePlaceHeader();
			if (sType == "meetcharliemale") {
				this.dress = "Male";
				this.setFlag(1);
				setQueryParams("type=meetcharlie");
			}
			this.showPerson("gym1.jpg");
			addPlaceTitle(md, "Meeting Charlie");
			md.write('<p>You are directed to a locker room where you are told Charlie is getting ready for a session. When you step in you see ');
			if (this.dress == "Male") {
				md.write(
					'he has finished getting ready and was just about to leave. Immediately your impression is of a handsome, well-built man but the main thing you get is tattoos. He is extensively covered with a \'tribal?\' or \'celtic\' style of tattoos, coiled lines around his body.</p>'
				);				
			} else {
				md.write(
					'she is ready, dressed in her gym gear. Your impression is she is an attractive latino woman, with a nice figure and well toned.</p>'
				);				
			}
			// Common to both genders
			sHe = this.getHeShe();
			sHis = this.getHisHer();
			md.write(
				'<p>Charlie looks at you in a friendly way and asks,</p>' +
				'<p>"Hi! I\'m Charlie King, how can I help you?", but then ' + sHe + ' eye\'s narrow. You introduce yourself and say you are looking for Amy. Immediately ' + sHis + ' expression hardens and ' + sHe + ' says,</p>' +
				'<p>"Yes, I have heard of you ' + perYou.getPersonName() + ', Amy has mentioned you in the past, and then something about helping her recently. She has also made it clear she does not want to see you, or her sisters yet."</p>' +
				'<p>There is something off in the way Charlie explains this, but you cannot quite say what it is. You explain how Amy is your friend and just want to meet her and check that she is fine. Charlie seems to look at you with <b>more</b> hostility, and tersely says,</p>' +
				'<p>"You dare to say I am mistreating Amy! This is my Gym, wholly owned and managed. Get out, and I will tell the front desk you are no longer permitted in here. Leave now or I will call the police"</p>' +
				'<p>' + (isCharmedBy("OfficerBatton") ? 'The threat of the police does not matter given Kerry is your loyal slave, ' : 'The threat of the police does concern you, ') +
				'but being barred from the Gym seems the most pressing concern. What can you do?</p>'
			);
			startQuestions();
			addLinkToPlaceC(md, 'leave the Gym', 37, '', '', '', "setPlaceFlag('CheriseRd',6)");
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "meetcharlieinvisible") {
			// Find Charlie invisible
			md = WritePlaceHeader();
			sHe = this.getHeShe();
			sHis = this.getHisHer();			
			this.showPerson("charm0.jpg");
			addPlaceTitle(md, "Invisibly Meeting Charlie");
			md.write('<p>You find Charlie again, ' + sHe + ' is getting ready for a session, and ' + sHe + ' is completely unaware of your presence.</p>');
			startQuestions();
			addLinkToPlaceC(md, 'leave the Gym', 37);
			WritePlaceFooter(md);
			return true;
		}		

		if (sType == "charmcharlie1") {
			// Charm at the Gym 1
			md = WritePlaceHeader();
			setPlaceFlag("CheriseRd", 6, false);
			this.showPerson("charm1.jpg");
			addPlaceTitle(md, "Charlie Under A Charm Spell");
			sHe = this.getHeShe();
			sHis = this.getHisHer();
			sHim = this.getHimHer();
			if (getQueryParam("invisible") == "true") {
				md.write(
					'<p>You have no choice here, there is no other way to convince Charlie to let you see Amy, so you cast the charm spell. As you do the invisibility spell fades and Charlie sees you,</p>' +
					'<p>"I told you to leave...but your are here, was I getting ready, so did I change my mind? Should I continue changing?" Charlie starts to remove ' + sHis + ' top, even though ' + sHe + ' had probably just put it on. The arousal from the spell is encouraging ' + sHim + ' to expose ' + sHim + 'self.</p>' +
					'<p>As ' + sHe + ' does you \'remind\' ' + sHim + ' that you are a very good friend of Amy and as they are also Amy\'s friend then that means you are friends too. Charlie looks uncertain, ' + sHis + ' protectiveness of Amy is clearly quite strong, so you decide to avoid mentioning Amy for a bit.</p>' +
					'<p>You again emphasise how close friends <b>we</b> are, and Charlie asks "Are we...really?"</p>'
				);
			} else {
				md.write(
					'<p>You have little choice here, there is no other way to convince Charlie to let you see Amy, so you cast the charm spell.</p>' +
					'<p>Charlie hesitates and you ask if they were getting ready, maybe they should continue changing. Charlie starts to remove ' + sHis + ' top, even though ' + sHe + ' had probably just put it on. The arousal from the spell is encouraging ' + sHim + ' to expose ' + sHim + 'self.</p>' +
					'<p>As ' + sHe + ' does you \'remind\' ' + sHim + ' that you are a very good friend of Amy and as they are also Amy\'s friend then that means you are friends too. Charlie looks uncertain, ' + sHis + ' protectiveness of Amy is clearly quite strong, so you decide to avoid mentioning Amy for a bit.</p>' +
					'<p>You again emphasise how close friends <b>we</b> are, and Charlie asks "Are we...really?"</p>'
				);
			}

			startQuestions();
			addLinkToPlaceC(md, '"Yes, very close"', Place, 'type=charmcharlie2');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmcharlie2") {
			// Charm at the Gym 2
			md = WritePlaceHeader();
			this.showPerson("charm2.jpg");
			sHe = this.getHeShe();
			sHis = this.getHisHer();
			sHim = this.getHimHer();
			addPlaceTitle(md, "Charlie Under A Charm Spell");
			
			md.write(
				'<p>Charlie continues to remove ' + sHis + ' clothing, but looks confused, the spell is making ' + sHim + ' extremely aroused and confused. You continue and explain more about how close you are and how ' + sHe + ' trusts you completely.</p>' +
				'<p>Again Charlie looks unsure and asks,</p>' +
				'<p>"Are you sure we are <i>only</i> friends?"</p>' +
				'<p>You can see ' + sHe + ' is accepting your words and ' + sHis + ' resistance has faded, the arousal of the spell ' + (this.dress == "Male" ? 'clear in his stiffening cock' : 'plain in her stiff nipples') + '. You answer,</p>'
			);

			startQuestions();
			if (perYou.isBornMale() && this.dress == "Male") addLinkToPlaceC(md, 'just friends', Place, 'type=charmcharlie3nosex');
			addLinkToPlaceC(md, '"Friends with benefits"', Place, 'type=charmcharlie3');
			WritePlaceFooter(md);
			return true;
		}
		if (sType == "charmcharlie3" || sType == "charmcharlie3nosex") {
			// Charm at the Gym 3
			sHe = this.getHeShe();
			sHis = this.getHisHer();
			sHim = this.getHimHer();			
			if (sType != "charmcharlie3nosex") {
				md = WritePlaceHeader(false, isExplicit() && perYou.isMaleSex() ? '' : 'td-left-med');
				this.charmThem(2);
				if (this.dress == "Male") {
					if (perYou.isMaleSex()) this.showPersonRandomRorX("gym-sexb", 2);
					else this.showPersonRorX("gym-sexga.jpg");
				} else {
					if (perYou.isMaleSex()) this.showPersonRandomRorX("gym-sexb", isExplicit() ? 2 : 1);
					else this.showPersonRandomRorX("gym-sexg", isExplicit() ? 2 : 1);
				}
				addPlaceTitle(md, "Charlie Under A Charm Spell");
			
				md.write(
					'<p>You tell Charlie that you are friends with benefits and that why not take some of those benefits now. Charlie removes any remaining clothing and then helps you to quickly strip from your clothes. Charlie proves to be a skilled and passionate \'friend\'.</p>'
				);
			} else {
				md = WritePlaceHeader();
				this.showPerson("charm3.jpg");
				addPlaceTitle(md, "Charlie Under A Charm Spell");
			
				md.write(
					'<p>You assure Charlie that you are friends only and Charlie looks a little disappointed and says something indicating the possibility of more.</p>'
				);				
			}
			md.write(
				'<p>Now Charlie is firmly under the spell you ask ' + sHim + ' again where is Amy. Immediately ' + sHis + ' expression changes, not hostile as before but more embarrassed,</p>' +
				'<p>"I can\'t...Amy and her work...I can\'t...", and ' + sHis + ' expression firms, "Sorry ' + perYou.getPersonName() + ' I cannot tell you, yet...I need to work it out with Amy"</p>' +
				'<p>You can see this is something of great importance to Charlie, and ' + sHis + ' will is strong enough to overcome the effects of the spell. You are going to have to work out some way of convincing Charlie or just plain breaking ' + sHis + ' will and completely submit to you. At the moment you do not quite know how to proceed and will have to leave this for another time. Probably it would be best to return another day and see if the spell has affected Charlie more.</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'leave Charlie for now', Place);
			WritePlaceFooter(md);
			return true;
		}
						
		return false;
	};
	
	per.showDancing = function()
	{
		var md = WritePlaceHeader();
		this.showPersonRandom("poledance", 1);
		addPlaceTitle(md, "Charlie's Dance");
		if (this.isMan()) md.write('<p>Charlie is wearing a sort of football uniform complete with eye makeup. He puts on an athletic strip-tease to the approval of the audience. He is well built and fit and has a cock large enough to be a porn star!</p>');
		else md.write('<p>Charlie is wearing a colourful outfit of fishnets and a minimum of other clothes. She does an athletic strip-tease and rather expertly throws herself around the pole!!</p>');
	
		md.write('<p>After Charlie sits with you for a while, largely ignoring the other people, just concentrating on you.</p>');
		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after Charlie\'s dance', Place);
		WritePlaceFooter(md);
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (Place == 434 && sType === "") return this.showPerson(this.isConvinced() ? "office1.jpg" : "home1.jpg", '', '', '', '', false, "string");		
		return '';
	};
	
	per.showPersonTextHere = function(md)
	{
		if (this.other >= this.nBreakLimit) return;
		if (Place == 168 && this.checkFlag(5) && !this.checkFlag(6) && isPersonHere("OfficerBatton") && isCharmedBy("OfficerBatton")) {
			md.write('<p>You wonder if ' + getPoliceChief() + ' Batton may have some ideas to convince Charlie to tell you about Amy. Possibly arrest ' + this.getHimHer() + '?</p>');
		} else if (Place == 161 || Place == 124 || Place == 182) {
			if (isPersonHere("Bambi") && isCharmedBy("Bambi") && this.checkFlag(5) && !this.checkFlag(7)) md.write('<p>You wonder if Bambi has some ideas to convince Charlie to tell you about Amy. She is very skilled and experienced in many kinky things.</p>');
		} else if (Place == 434) {
			// Charlie's home (at night)	
			md.write('<p>Charlie is relaxing in ' + this.getHisHer() + (this.isMan() ? ' living room ' : ' bedroom') + ', pleased to see you.</p>');
		}
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (this.other <= this.nBreakLimit) {
			// Asking forideas to convince Charlie
			if (Place == 161 || Place == 124 || Place == 182) {
				if (this.checkFlag(5) && !this.checkFlag(7) && isPersonHere("Bambi") && isCharmedBy("Bambi")) {
					findPerson("Bambi").addQuestionR(md, 'ask Bambi for some ideas for Charlie',
						'Bambi replies, "We could try and discipline your reluctant slave" and she picks up a riding-crop. "After all slaves should be obedient to their ' + perYou.getMaster() + '"</p><p>She continues, "' + 
						(!checkPlaceFlag("Hotel", 9) ? 'Unfortunately I do not have any appropriate place for teaching slaves at this time". You will have to consider this later, once something can be setup. Bambi addresses you again,</p>' +
																'<p>"We could try something <b>public</b> with your slave if you wish". You are unsure what she means but you can always try bringing Charlie to her and see!' :
								'I can start teaching them anytime you like in our play-room...as in the dungeon. Maybe try something <b>public</b> as well!". You make arrangements to bring Charlie to her once you are ready.'),
						"setPersonFlag(\\'Charlie\\', 7)"
					);				
				}
			}
			if (Place == 168) {
				if (this.checkFlag(5) && !this.checkFlag(6) && isPersonHere("OfficerBatton") && isCharmedBy("OfficerBatton")) {
					findPerson("OfficerBatton").addQuestionR(md, 'ask Kerry for some ideas for Charlie',
						getPoliceChief() + ' Batton replies, "' +
						(this.dress == "Male" ? 'I am sorry, Charlie King has a clean record, I cannot see any way to help you with this ' + perYou.getMaster() + '. I will have my officers be alert for any opportunities"' :
														'I think I could arrange to have her arrested, we have recently been trying to control illegal prostitution in Glenvale and we can claim and anonymous tip-off she was selling extra services."</p>' +
														'<p>You make arrangements that you will call them when you want to have her arrested.'),
						"setPersonFlag(\\'Charlie\\', 6)"
					);
				} else if (this.checkFlag(12) && this.place == 261) addLinkToPlaceC(md, 'ask Kerry about Charlie', 261, 'type=charliejailfinale');
			}
			if (Place == 11 && this.checkFlag(5) && !this.checkFlag(8) && isPersonHere("MrBeasley") && isCharmedBy("MrBeasley")) {
				findPerson("MrBeasley").addQuestionR(md, 'ask ' + per.getPersonName() + ' for some ideas for Charlie',
					per.getPersonName() + 
					(per.checkFlag(10) ? ' giggles, "How would I know", she looks confused for a moment, then again she does that often, "What about that hip...hyp...spirally mind stuff. They will be all slavey and hot for you?". Using some hypnosis sounds like a good idea but you do not expect any more help from this bimbo!' :
					(per.checkFlag(11) ? ' looks at you suggestively, "Fuck em until they agree, the spell will have them hot and ready. If they still refuse hypnotise them until they agree and then fuck them again". Maybe not the first, your think, but using hypnosis could work!' :
					(per.checkFlag(12) ? ' hesitates, "Hypnotise them until they are willing, and spank them until they agree". Hypnosis could work you think, maybe not the spanking, though it would work on ' + per.getPersonName() + ' if it were needed!' :
					'"There are a few things, but I would suggest a course of hypnosis. Their mind will already be malleable from the charm spell so hypnosis should be easy" You have to agree, hypnosis sounds like a good idea.'))),
					"setPersonFlag(\\'Charlie\\', 8)"
				);
			}
		}
		
		if (Place == 435 && this.place == 435 && sType === "") {		
			// The Gym during business hours
			if (!this.checkFlag(2)) {
				addPopupLinkC(md, 'ask around to find Charlie', 'Locker Room',
					'<img src="Images/gymlockerroom.jpg" class="imgpopup">' +
					'You are told Charlie is currently in one of the locker rooms and you head there quickly. As you turn the corner into the room you see..</p>' +
					(this.dress == "male" ? '' : addLinkToPlaceC("string", 'an attractive latino woman', Place, 'type=meetcharlie', '', "", '', "width:50%;margin-left:10%")) +
					addLinkToPlaceC("string", 'a handsome tattooed man', Place, 'type=meetcharliemale', '', "", '', "width:50%;margin-left:10%"),
					false, '', true
				);
			} else if (sType === "" && checkPlaceFlag("CheriseRd", 6) && isInvisible()) addLinkToPlaceC(md, 'find Charlie', Place, 'type=meetcharlieinvisible', 'You carefully look around for Charlie, making sure the spell stays up until you find Charlie changing in a locker room');
			else if (!this.checkFlag(4)) {
				addLinkToPlaceC(md, 'ask at the front desk where Charlie is', Place, 'type=meetcharliecharmed', 'You are directed to a locker room again where is Charlie working out');
				if (isPlaceKnown("CharliesOffice")) addLinkToPlaceC(md, 'check Charlie\'s office', 434, this.isConvinced() ? '' : 'type=meetcharliecharmed');
			}
		}
		
		if (Place != 434 || sType !== "") return;
		
		// Charlie's home or office, ONLY after convincing
		var sHe, sHis, sHim, sUhe;
		sHe = this.getHeShe();
		sHis = this.getHisHer();
		sUhe = capitalize(sHe);
		sHim = this.getHimHer();
		var bOffice = isShopOpen(4, 2, true);
		
		if (perYou.isMaleSex()) {
			addLinkToPlace(md, 'fuck Charlie', Place, 'type=charliefuck');
			if (this.isMaleSex()) addLinkToPlace(md, 'have Charlie fuck you', Place, 'type=charliefuckyou');
			if (!this.isMaleSex()) addLinkToPlace(md, 'have a 69 with Charlie', Place, 'type=charlie69');
			addLinkToPlace(md, 'have ' + sHim + ' give you a blowjob', Place, 'type=charliebj');
			if (this.isMaleSex()) addLinkToPlace(md, 'give Charlie a blowjob', Place, 'type=charliebjyou');
			else addLinkToPlace(md, 'lick Charlie\'s pussy', Place, 'type=charliebjyou');
			if (!this.isMan()) addLinkToPlace(md, 'get a tit-fuck', Place, 'type=charlietitfuck');
		} else {
			if (perYou.FindItem(45) > 0) addLinkToPlace(md, 'fuck Charlie with your strap-on', Place, 'type=charliefuck');
			if (this.isMaleSex()) addLinkToPlace(md, 'have Charlie fuck you', Place, 'type=charliefuckyou');
			if (!this.isMaleSex()) addLinkToPlace(md, 'have a 69 with Charlie', Place, 'type=charlie69');
			addLinkToPlaceO(md, 'ask ' + sHim + ' to lick you', Place, 'type=charliebj');
			if (this.isMaleSex()) addLinkToPlace(md, 'give Charlie a blowjob', Place, 'type=charliebjyou');
			else addLinkToPlace(md, 'lick Charlie\'s pussy', Place, 'type=charliebjyou');			
		}
		
		if (bOffice) return;
		
		this.addDancingLink(md, 'talk to Charlie about dancing in the club',
			'You ask Charlie about dancing at the Avernus club and ' + sHe + ' cautiously answers,</p>' +
			'<p>&quot;I am fit enough and know some of the moves...alright I will!&quot; and with that you call Jade to arrange a dance for Charlie.'
		);	
		this.addSleepLink(md, "sleep with Charlie", "Sleeping with Charie",
			'<p style="position:absolute;left:25%;top:5%;cursor:pointer;font-size:1.1em;width:40%"><b>You talk to Charlie about sleeping with ' + sHim + ' and Charlie welcomes you to ' + sHis + ' bed.</b>',
			"bed1.jpg", false, 434, '', 'In the morning Charlie has already left the bed to open up the Gym and you see ' + sHim + ' in the office area so you go and meet ' + sHim + ' there.'
		);
	};
	
	// Cast a spell/use an item
	per.handleItem = function(no, cmd)
	{
		// Examining the Soul Bound Crystal [Ring]
		if (cmd == 1 && (no == 52 || no == 64)) {
			var s = getSoulBoundCrystal(no);
			if (s != '') {
				if (this.isHere()) {
					examineItem(no, 'The ' + s + ' vibrates softly the closer you get to Charlie.');
					return "handled";
				}
			}
		}
		
		// Casting the transform spell
		if (no == 18 && cmd == 2) {

			if (this.isHere()) {
				if (!this.isCharmedBy()) {
					addComments("The spell washes over " + this.getHimHer() + " but nothing happens, you seem to need a magical link to " + this.getHimHer() + '.');
					return "handled";
				}
				if (sType.indexOf("charmcharlie") != -1) {
					addComments("The spell washes over " + this.getHimHer() + " but nothing happens, it is too soon after you charmed " + this.getHimHer() + '.');
					return "handled";					
				}
				if (!CastTransform(1, true)) return "handled";

				// It can be cast
				ClearComments();
				dispPlace(Place, 'type=charlietransformgender' + this.dress.toLowerCase());
				return "nofooter";
			}
		}
		
		// Casting the charm spell
		if (cmd == 2 && no == 14) {
			if ((Place == 434 || Place == 435) && this.isHere()) {
				// At the Gym
				if (perYou.checkFlag(19) || !this.isMan()) CastCharmSpell("Charlie", Place, 1, 'type=charmcharlie1' + (isInvisible() ? '&invisible=true' : ''));
				else addComments("The spell fails to work on Charlie as the spell only affects the feminine.");
				return "handled";
			}
		}
		
		return "";		// do nothing
	};
	
	
	// Phone Calls
	
	per.isPhoneable = function() {
		// Can you call them?
		if (this.isCharmedBy() && this.isMan() && Place == 440 && !checkPersonFlag("MissLogan", 1) && per.getCharmedLevel() == 2) return true;		
		return checkPlaceFlag("Hotel", 11) && Place == 269 && this.other >= this.nBreakLimit;
	};

	per.callThem = function() {
		// Miss Logan not bred and is a breeder
		if (Place == 440) gotoPlace(Place, 'type=missloganbreeder&who=' + this.uid, 'You tell Ms. Logan that you have someone in mind to help impregnate her, and after placing the call the two of you wait for their arival.');
		else if (isDay()) WriteComments('You call Charlie to invite ' + this.getHimHer() + ' to join you at the pool for a swim, and ' + this.getHeShe() + ' answers, "I\'d love to but I have classe to run at my Gym, but how about tonight?" You have no problems and agree to do this another time.');
		else {
			gotoPlace(Place, 'type=charliepool');
			receiveCall('', 'You call Charlie to invite ' + this.getHimHer() + ' to join you at the pool for a swim, and ' + this.getHeShe() + ' answers, "Sure I\'ll be there soon"');
			WriteCommentsFooter(bChat, bChatLeft);
		}
	};
	
	per.addPersonPhoneCall = function() {
		if (!this.isCharmedBy()) return false;
		
		var perAmy = findPerson("AmyRoss");
		if (perAmy.isCharmedBy() || perAmy.checkFlag(9)) return false;
		if (this.hoursCharmed() > 1 && !perAmy.checkFlag(4) && isDay() && Place != 435) {
			// SMS 32, 1 hour after charming Charlie, daytime
			// Actually a SMS for Amy but dependent on first charming Charlie
			if (makeCall(true, 31)) perAmy.setFlag(4);
		}
		if (this.other >= this.nBreakLimit && isEvening() && !perAmy.checkFlag(6)) {
			// SMS 33, evening after convincing Charlie
			// Actually a SMS for Amy
			if (makeCall(true, 33)) perAmy.setFlag(6);
		}
		if (this.other >= this.nBreakLimit && isMorning() && isPlaceKnown("CharliesHouse") && !this.checkFlag(12)) {
			// SMS 39, invitation to home
			if (makeCall(true, 39)) this.setFlag(12);
		}		
		return false;
	};
	
	per.isSMSImageDressVersion = function(id) { return id == 39; };
	
	per.getPersonSMS = function(id) {
		if (id == 39) return receiveSMS('Charlie', 'Why not visit my home tonight, you can come over anytime at night', 'sms1.jpg');
		return '';
	};

};

