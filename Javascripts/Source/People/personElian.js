/****************************************************************
Demon Elian
****************************************************************/

/***************** Initialise ******************************************************************************/
function initialiseElian()
{
	// Esmeralda the New Age Store Owner
	addPerson("Elian", 500, "Elian", "Succubus", false);
	
	per.getPossessionFace = function() { return "Catherine!clubtalk1c"; };
	
	per.getPersonName = function(full) {
		return this.checkFlag(11) || this.dress == "Succubus" ? "Elian" : "Rachael";
	};
	per.getPersonNameShort = function() { return this.getPersonName(); };
	
	per.whereNow = function() {
		if (this.checkFlag(18) && !this.isCharmedBy()) return 500;
		if (sType === "showerelian" || sType == "elianpoolmeet") return Place;		// Pool event
		if (Place == 282 && (getHour() > 21 || this.checkFlag(12))) return 0;	// Only here after midnight
		return this.place;
	};
	
	per.visitThem = function() { this.other = nTime; };
	
	per.getPersonAddress = function() { return this.checkFlag(3)  ? 'unknown' : ''; };

	per.passTimeDay = function() {
		if (this.checkFlag(15)) {
			this.setFlag(7, false);
			this.setFlag(6, false);
		}
		return '';
	};
	
	per.passTimeNight = function() {
		this.setFlag(12, false);
		this.setFlag(23, false);
		this.setFlag(24, false);
		return '';
	};
	
	// Images
	per.isPlaceImageRight = function()
	{
		// At the club
		return (Place == 282 && this.checkFlag(2) && this.isHere() && sType === "");
	};

	per.showPlaceImageRight = function(md)
	{
		this.showPersonRandom("club1", 2, undefined, undefined, undefined, !this.checkFlag(3) ? "Familiar Customer" : this.getPersonName());
		this.visitThem();
	};
	
	per.showEventPopup = function()
	{
		if (Place == 500 && sType == "elianteleporttruename") {
			showPopupWindow("Elian\'s Lair",
				this.addPersonString("Succubus!demon2.jpg", "height:max%", "right") +
				'You appear back in that place you first met Elian feeling very uncertain in this unknown place. You see in the distance a figure, is it her, you think it is as it seems to be how you remember her from your first visit.</p>' +
				'<p>The room gets darker and you can see nothing, and a moment later you are standing back in the Sacred Clearing, were you rejected, or is it just not possible this <b>version</b> and you will have to return when she is ready.',
				'dispPlace(141)'
			);
			return true;			
		}
		
		if (sType == "dreamdemoncome") {
			this.setFlag(1);
			showPopupWindow("Demon of Your Dreams",
				this.addPersonString("dreamdemoncome.jpg", "height:max%", "right") +
				'Your dreams are heavily erotic, filled with the sensation of a woman\'s body hotly entwined with yours. At the end you see her clearly. the demonic woman you saw in a clairvoyant vision. Huskily she says,</p>' +
				'<p>"Come to me, to the <i>thin clearing</i> in darkness and <b>teleport</b> while thinking of my name, <b>Elian</b>"</p>' +
				'<p>Your dream fades as she embraces you again, leaving you with the feeling of hot, passionate lips and an almost irresistable desire to run to that place and be at her side, forever...<p>' +
				'<p>You wake sweating and aroused, certain that was not <i>just</i> a dream, it was a message and probably <b>very</b> dangerous!'
			);
			return true;
		}
		
		return false;
	};
	
	per.getDefences = function()
	{
		// Challenge 1
		// 43 gina necklace
		// 44 rosary
		// 46 pamela's bracelet
		// 48 relic
		// 49 holy water
		var ndef = perYou.checkFlag(18) && nMana > 19 ? 1 : 0;
		if (perYourBody.FindItem(43) > 0) {
			ndef++;
			if (this.checkFlag(23)) ndef++;
		}
		if (perYourBody.FindItem(44) > 0) ndef++;
		if (perYourBody.FindItem(46) > 0) {
			ndef++;
			if (this.checkFlag(24)) ndef++;
		}
		return ndef;
	};
	
	per.showDefencesWarning = function(no)
	{
		if (this.getDefences() >= no) return 'you are feeling confident in your defences.';
		return 'you wonder if you have enough to protect yourself from Elian\'s challenge, but surely you must?' + (isDemonBound() ? ' You do recall how you <b>tricked</b> Legion, maybe something similar could work here?' : '');
	};
	
	per.showDefences = function(no)
	{
		var dn = 0;
		var s = 'you can feel your defences activate, ';
		if (perYou.checkFlag(18) && nMana > 19) {
			s += 'a surge in your mana as you use your training to block her attack';
			dn++;
		}
		if (dn >= no) return s;
		if (perYourBody.FindItem(43) > 0) {
			s += (dn > 0 ? dn == (no - 1) ? ' and ' : ', ' : '') + 'the necklace feels hot';
			dn++;
		}
		if (dn >= no) return s;		
		if (perYourBody.FindItem(44) > 0) {
			s += (dn > 0 ? dn == (no - 1) ? ' and ' : ', ' : '') + 'Pamela\'s bracelet tingles';
			dn++;
		}
		if (dn >= no) return s;		
		if (perYourBody.FindItem(46) > 0) {
			s += (dn > 0 ? dn == (no - 1) ? ' and ' : ', ' : '') + 'the rosary stirs on its own';
			dn++;
		}
		return s;
	};
	
	per.showEvent = function()
	{
		var md, nm;
		
		if (Place == 40) {
			// Shower scenes
			if (sType == "showerelian") {
				md = WritePlaceHeader();
				this.showPersonRandom("bath", 2);
				addPlaceTitle(md, "Company in your Bath");
				if (this.checkFlag(25)) {
					md.write(
						'<p>You decide to run a bath and relax and when you step into the bathroom you see a bath has already been run and Elian is once more waiting there for you, she smiles,</p>' +
						(this.checkFlag(28) ? '<p>"Some personal service for the one who beat me, join me?"</p>' : '<p>"A truce for now, even I need a bath after all. Join me?"</p>') +
						'<p>No matter what, you need to be careful around her but taking a hot bath with a hot demon does sound rather tempting...so of course you do!</p>'						
					);					
				} else {
					md.write(
						'<p>You decide to run a bath and relax and when you step into the bathroom you see a bath has already been run and Elian is waiting there for you, she smiles,</p>' +
						(this.checkFlag(28) ? '<p>"Some personal service for the one who beat me, join me?"</p>' : '<p>"A truce for now, even I need a bath after all. Join me?"</p>') +
						'<p>No matter what, you need to be careful around her but taking a hot bath with a hot demon does sound rather tempting...so of course you do!</p>'						
					);	
				}
				this.setFlag(25);
				startQuestions();
				addLinkToPlace(md, 'get out of the bath and get dressed', 45, '', 'As you do and look back, Elian has gone without a word or sound');
				WritePlaceFooter(md);
				return true;			
			}
		}
		
		if (sType == "elianteleportbad") {
			// Elian Demon Bad ending
			md = WritePlaceHeader(false, "", "black");
			perYou.charmThem(4, "Demon");
			nMana = 0;
			updateLeftBar();

			this.showPerson("ending-demonslave.jpg");

			addPlaceTitle(md, "Demon\'s Slave", '', 0, false, 'white');

			md.write(
				'<p>You appear somewhere in darkness, hot, cloying darkness. A feminine presence embraces you and kisses you passionately on your lips.</p>' +
				'<p>You feel a wave of magic wash over you, overpowering any and all of your defenses' +
				(getQueryParam("naile") == "true" ? ', despite using the trick Jade told you about. Then again maybe you do not have the right defenses' : '') +
				', the woman steps back and you clearly see her, your Mistress, your one and only purpose in life!</p>' +
				'<p>She whispers, "Now cum for me my slave, my thrall!"</p>' +
				'<p>Your mind, your will, your sanity is washes away in the cataclysmic orgasm that wracks your....your Mistresses thrall\'s body!</p>' +
				'<p>You are a demon\'s plaything, happily serving her every desire without thought, without will. Better luck next time...</p>'
			);

			addRestartLink(md);
			WritePlaceFooter(md, '', true, true);
			return true;
		}

		if (sType == "naileteleportok") {
			// Elian Demon Bad ending
			md = WritePlaceHeader(false, "", "black");
			this.setFlag(2);
			this.place = 282;
			this.showPerson("demondefended.jpg");
			this.dress = "Catherine";

			addPlaceTitle(md, "Demon\'s Slave, Almost...", '', 0, false, 'white');

			md.write(
				'<p>You appear somewhere in darkness, hot, cloying darkness. A feminine presence embraces you and kisses you passionately on your lips.</p>' +
				'<p>You feel a wave of magic wash over you, <b>almost</b> overpowering your defenses, the woman steps back and you clearly see her, your Mistress, no...the demon who called to you.</p>' +
				'<p>She whispers, "Now cum for me my slave, my thrall!"</p>' +
				'<p>You tell her <b>"No"</b> and ' + (nMana > 9 ? 'cast the charm spell on her. The spell does nothing, washing over her' : 'smile') + '.</p>' +
				'<p>She looks puzzled, ignoring you and starts checking some of the items near her, a rod, a skull and other things. Twice you feel a wave of magic and you realise she is trying to overpower you, failing each time.</p>' +
				'<p>She softly speaks, "So a ' + perYou.getWitch() + ' of some power. Having you as my helplessly ' + (perYou.isMaleSex() ? 'cumming' : 'orgasming') + ' slave-toy will be so much sweeter...Go from here, I will take you another way"</p>' +
				'<p>She gestures with her clawed hand...</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'you disappear, leaving her presence', 141);
			WritePlaceFooter(md, '', true, true);
			return true;
		}	
			
		if (Place == 269 && isDay() && !this.checkFlag(7) && (sType === "" || sType == "elianpoolmeet")) {
			if ((this.checkFlag(5) && !this.checkFlag(15)) || (this.checkFlag(15) && Math.random() < 0.1)) {
				md = WritePlaceHeader();
				this.setFlag(7);
				setQueryParams("type=elianpoolmeet");
				if (!this.checkFlag(15)) {
					this.showPerson("poola.jpg");
					addPlaceTitle(md, "Rachael in the Pool");
					md.write(
						'<p>You see the pool is currently empty, except for Rachael. You see she is leaning against one end of the pool, more like she is posed for a photoshoot than a person going for a swim.</p>' +
						'<p>She looks at you with an odd expression, is it longing, passion or something else. You take it as a passionate look given her recent SMS and approach her. She softly says,</p>' +
						'<p>"Not yet, not here" and she climbs out of the pool and seductively walks towards the changing room.</p>'
					);
				} else {
					this.showPersonRandom("pool", 2);
					addPlaceTitle(md, "Elian in the Pool");
					md.write(
						'<p>You see the pool is currently empty, except for Elian. She smiles softly says,</p>' +
						'<p>"A truce for now lets just have some fun in the polls" and she playfully splashes you. You splash her back and have a fun time as if she were any normal girl.</p>' +
						'<p>After a time she says she has to leave for "beauty sleep" and hops out of the pool and walks toward the changing rooms...</p>'
					);					
				}
				startQuestionsOnly();
				addLinkToPlaceC(md, 'watch her leave', Place);
				WritePlaceFooter(md, '', true, true);
				return true;
			}
		}
		
		if (Place == 281 && sType == "elianconfront") {
			// Conrfont about Elian
			this.setFlag(11);
			md = WritePlaceHeader();
			this.showPerson("cluboutside1.jpg");

			addPlaceTitle(md, "Elian and Rachael");

			md.write(
				'<p>You tell Rachael about a demon named Elian you had met and how she looks a lot like her, and Jade says she <i>is</i> Elian. Rachael stands smiling and gestures for you to follow and heads for the exit. You hesitate, but need to resolve this and follow her.</p>' +
				'<p>Outside the club you see Rachael down a small side alley sitting on an access stair, or more likely a sort of fire-escape. It is quite well lit here from the neon lights of the club but still it is chillingly reminiscent of that hot place where you met Elian. You also notice it is surprisingly warm, but your thoughts are interrupted when she speaks to you, softly as always,</p>' +
				'<p>"Yes, of course, <b>part</b> of my name is Elian, but Rachael is just as much my name here. Only <b>true names</b> matter, you can call me what you want here."</p>' +
				'<p>You hesitate, and they ask who summoned her and what she wants here. She smiles,</p>' +
				'<p>"No one summoned me, then again <b>you</b> summoned me in your dreams. I an not seeking a <i>Legion</i> of perversions, I only seek small things. Slaves to worship me, just as you seek out. I am seeking you and you are seeking me. The dance of seduction and slavery"</p>' +
				'<p>You suggest there may be something else she wants. You remember some of Jade\'s words, and ask about a <b>contract</b>. She looks at you,</p>' +
				'<p>"Aside from your eternal worship and unquestioning loyalty? There are a <i>Legion</i> of things I could ask but there is nothing that you have at this time."</p>' +
				'<p>Now you know who she actually is but what can you do about her?'
			);
			if (isDemonQuestDone() || isDemonBound()) md.write(' As you contemplate this she smiles "I have no interest in relics from a certain Church"</p>');

			startQuestions();
			addLinkToPlace(md, 'leave Elian for now', Place, '', 'When you glance back you notice Elian is gone');
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		
		if (Place != 282) return false;
		
		if (!this.checkFlag(12) && ((this.checkFlag(4) && !this.checkFlag(15)) || (this.checkFlag(15) && Math.random() < 0.08)) && !this.checkFlag(6) && sType === "") {
			md = WritePlaceHeader();
			this.setFlag(6);
			if (this.checkFlag(15)) {
				this.showPerson("poledanceb.jpg");
				addPlaceTitle(md, "Elian Dancing");
				md.write(
					'<p>As you enter the club you glance at the stage and are stopped in your tracks. You see the Elian on the stage dressed in an elegant dress in a techno inspired state design of neon lights. The dress does not stay on for very long as she performs a rather traditional strip-tease, but still very erotic.</p>' +
					'<p>After her dance she joins you briefly but explains she has to leave for a little while to deal with someone, interest that this means she has others she tempting or enslaving?</p>'
				);
				if (isPersonHere("Vampyre")) md.write('<p>You notice Lilith did not even look at Elian\'s dance.</p>');				
			} else {
				this.showPerson("poledancea.jpg");
				addPlaceTitle(md, "Rachael Dancing");
				md.write(
					'<p>As you enter the club you glance at the stage and are stopped in your tracks. You see the young woman who calls herself Rachael on the stage. She is performing a very erotic strip-tease, slow and sensual. She looks at you and you see she is holding a toy, it looks like a black sheep or lamb. She must have a thing for them, give that SMS she sent you.</p>' +
					'<p>After her dance she joins you for a drink, the toy is nowhere to be seen. You ask her about it and her SMS, and she just mentions it is related to one of the meanings of her name. The way she says this is a bit playful and you do not believe her for a minute.</p>'
				);
				if (isPersonHere("Vampyre")) md.write('<p>You notice Lilith did not even look at Rachael\'s dance.</p>');
			}
			startQuestionsOnly();
			addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
			WritePlaceFooter(md);
			return true;
		}
		
		if (sType == "talkinclubchallenge") {
			// Talk to Elian - start of Challenge
			md = WritePlaceHeader();
			this.setFlag(12);
			this.setFlag(14);
			this.showPerson("challenge-start.jpg");

			addPlaceTitle(md, "A Challenge");

			md.write(
				'<p>You go to sit with Rachael...Elian or whatever you should call her now, but as you do she gestures for you to join her in a private booth. When you get there you see she has some of the cuffs people use in bondage play. She puts them on in a sort of display of submission and as she does you notice her face is a little different. This cute blonde appearance cannot be her true form, what you saw in that other place must be her actual features. The glamour that changes her look must require some concentration and she seems excited and it must be subtly altering the illusion.</p> ' +
				'<p>She tells you seductvely, "I know you want me as your slave, and I want you as my slave" she smile seductively, "What are we going to do about it? You need to know my full name to control me and I need you to accept my offer of passion and enslavement."</p>' + 
				'<p>She shakes her wrists and the chains jingle. "I propose a deal, in exchange for a series of intimacies, if you survive with your own will I will give you a part of my name."</p>' +
				'<p>This does not sound particularly fair as it seems <b>one failure</b> will mean your complete enslavement, but in return you gain a part of her name. You say this and she smiles again,</p>' +
				'<p>"Fair, you expect fairness from me. I promise you I will fill my part completely, and allow you to enslave me if you learn my full name. I will not deceive you in any way but I will do my best to make you my compliant love slave! I offer one thing, Elian is the first part of my full name!"</p>' +
				'<p>One thing crosses your mind she referred to you as a \'love slave\' while previously she has talked of you as a thrall, a slave-toy. You are unsure what she meant here, but still you agree to her challenge, it does seem the only way to deal with her, enslave or be enslaved. You ask her for her first challenge. She smiles and simply repies,</p>' +
				'<p>"Kiss me" but you remember Legion tried the same and almost took you then and there. When you decide to try this you will need to have defences, <b>significant defences</b>.</p>' +
				'<p>She smiles "If you are not ready yet, I could buy you a drink?"</p>'
			);

			startQuestions();
			addLinkToPlaceC(md, 'do the first challenge, kiss her', Place, 'type=elianchallenge1');
			addLinkToPlaceC(md, 'have a drink with her', Place, 'type=eliandrink&id=1');
			addLinkToPlace(md, 'leave her for now and consider your options', Place, '', 'When you glance back you notice Elian is gone');
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		
		var ndef;
		if (sType == "elianchallenge1") {
			// Challenge 1
			ndef = this.getDefences();
			md = WritePlaceHeader();
			this.setFlag(12);
			this.setFlag(15);
			this.setFlag(7, false);
			this.setFlag(6, false);
			
			this.showPerson(ndef > 1 ? "challenge1.jpg" : "challenge-fail.jpg");

			if (ndef > 1) {
				addPlaceTitle(md, "Challenge Won");

				md.write(
					'<p>You decide you are ready to try the challenge, confident in your protections and lean in and kiss Elian. You feel an immediate rush of desire and ' + this.showDefences(2) + '. After a lengthly embrace of unrestrained and passionate kissing, Elian pushes you back gently. She smiles,<p>' +
					'<p>"As I expected from a powerful and attractive ' + perYou.getWitch() + ', you can resist my basic controls". She sighs and continues, "Such a good kisser, you will make a wonderful love slave"</p>' +
					'<p>You reply, "You will make a cute demon play-thing and sex-toy", she laughs, "Promises, promises" and then looks at you seriously. She leans over and whispers in your ear "Iscariot"</p>' +
					'<p>She stands and leaves the table and a moment later you lose sight of her. It seems you have survived and know now the next part of her name. You wonder how many more parts there are?</p>' +
					'<p>It does cross your mind that the next challenge here will be harder still but ' + this.showDefencesWarning(3) + '.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'return to the bar', Place);
			} else {
				addPlaceTitle(md, "Challenge Unprepared For");

				md.write(
					'<p>You decide you are ready to try the challenge and lean in and kiss Elian. As you do so you feel an immediate rush of passion and a very strange feeling as if your will, your very thoughts are being drawn out of your mouth into hers. One of your last free thoughts is you <b>certainly did not have enough defences for this</b>.</p>' +
					'<p>Then again that does not matter as your Mistress is so beautiful, she is everything you desire in life and you will do anything for her. Elian smiles almost whistfully,</p>' +
					'<p>"I am surprised you were so easy to enslave my love. I was hoping for a series of challenging seductive encounters before I finally make you my slave...Follow me".</p>' +
					'<p>Your Mistress attaches a chain to your neck and leads you out of the club to your new life, past other people who think nothing of a beautiful woman leading a slave though the Avernus CLub....</p>'
				);
				startQuestionsOnly();
				addRestartLink(md);
			}
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		
		if (sType == "elianchallenge2") {
			ndef = this.getDefences();
			md = WritePlaceHeader();
			this.setFlag(12);
			this.setFlag(16);
			
			this.showPerson(ndef > 2 ? "challenge2.jpg" : "challenge-fail.jpg");

			if (ndef > 2) {
				addPlaceTitle(md, "Challenge Won");

				md.write(
					'<p>You decide you are ready to try the challenge, confident in your protections and lean in and kiss Elian and let your hands wander lightly caressing her thighs and then breasts. You feel an immediate rush of desire but that is all as Elian passionately kisses you. Somehow you realise she has removed her outer dress and is only in her underwear, making her more available to your touch, but only touch. She is very responsive and moans delightfully and you can see no evidence she is acting.</p>' +
					'<p>After a while Elian pushes you back gently, and you notice she seems to be fully clothed again. She licks her lips and smiles,<p>' +
					'<p>"As I hoped from a powerful and attractive ' + perYou.getWitch() + ', you can resist my stronger controls". She sighs and continues, "So good, you will make a wonderful lover and slave"</p>' +
					'<p>You reply, "You will make a perfect demon lover and slave", she smiles, "Yes I would" and then looks at you seriously. She leans over and whispers in your ear "Agos"</p>' +
					'<p>She stands and leaves the table and a moment later you lose sight of her. You have survived again and know another part of her true name.</p>' +
					'<p>It does cross your mind that the next challenge here will be harder still but ' + this.showDefencesWarning(4) + '.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'return to the bar', Place);
			} else {
				addPlaceTitle(md, "Challenge Unprepared For");

				md.write(
					'<p>You decide you are ready to try the challenge and lean in and kiss Elian and start to caress her body. As you do so you feel an immediate rush of passion and a very strange feeling as if your will, your very thoughts are being drawn out of your mouth into hers. One of your last free thoughts is you <b>certainly did not have enough defences for this</b>.</p>' +
					'<p>Then again that does not matter as your Mistress is so beautiful, she is everything you desire in life and you will do anything for her. Elian smiles,</p>' +
					'<p>"I am surprised you were not so difficult to enslave my love. I was hoping for more of a challenge before I finally made you my slave...Follow me".</p>' +
					'<p>Your Mistress attaches a chain to your neck and leads you out of the club to your new life, past other people who think nothing of a beautiful woman leading a slave though the Avernus CLub....</p>'
				);
				startQuestionsOnly();
				addRestartLink(md);
			}
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		
		if (sType == "elianchallenge3") {
			ndef = this.getDefences();
			md = WritePlaceHeader();
			this.setFlag(12);
			this.setFlag(17);
			
			this.showPerson(ndef > 3 ? "challenge3.jpg" : "challenge-fail.jpg");

			if (ndef > 3) {
				addPlaceTitle(md, "Challenge Won");

				md.write(
					'<p>You decide you are ready to try the challenge, confident in your protections and see somehow Elian is almost completely naked in and start to kiss her and then work down to her breasts and start to work lower. You feel an immediate rush of desire but that is all as Elian passionately sighs and asks for more. She moans and writhes delightfully and soon you are licking her pussy, her clit and using your fingers to explore deeper. With surprising speed she orgasms intensely, one of the strongest you have seen in a partner. She groans and looks at you with a grin, and she almost throws you onto your back. You realise your clothes are missing and she '
				);
				if (perYou.isMaleSex()) md.write(' and she wraps her lips around your already hard member. She gives you arguably the best blowjob of your life until you cum hard into her mouth.');
				else md.write(' and she now moves to your wet pussy, lickng you with almost supernatural skill (well maybe not \'almost\') until you cry out your orgasm.');
				md.write(
					'</p><p>Elian pushes you back gently. She smiles,<p>' +
					'<p>"You taste wonderful my soon to be ' + perYou.getWitch() + 'slave. Such a pity you resisted, surely it would be more fun to be my slave?". She sighs.</p>' +
					'<p>You reply, "You are one hot demon, why not just tell me your full name and beome my slave", she laughs, "Not yet I still want you" and then looks at you seriously. She leans over and whispers in your ear "Omi"</p>' +
					'<p>She stands and leaves the table and a moment later you lose sight of her. It seems you have survived and know now the next part of her name. You wonder how many more parts there are?</p>' +
					'<p>It does cross your mind that the next challenge here will be harder still but ' + this.showDefencesWarning(5) + '.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'return to the bar', Place);
			} else {
				addPlaceTitle(md, "Challenge Unprepared For");

				md.write(
					'<p>You decide you are ready to try the challenge and lean in and see somehow Elian is almost completely naked. You start to kiss her and then work down to her breasts and start to work lower. As you do so you feel an immediate rush of passion and a very strange feeling as if your will, your very thoughts are being drawn out of your mouth into hers. One of your last free thoughts is you <b>certainly did not have enough defences for this</b>.</p>' +
					'<p>Then again that does not matter as your Mistress is so beautiful, she is everything you desire in life and you will do anything for her. Elian smiles almost whistfully,</p>' +
					'<p>"You were not easy enslave my love but I had hoped you could last a bit longer before I finally made you my slave...Follow me".</p>' +
					'<p>Your Mistress attaches a chain to your neck and leads you out of the club to your new life, past other people who think nothing of a beautiful woman leading a slave though the Avernus CLub....</p>'
				);
				startQuestionsOnly();
				addRestartLink(md);
			}
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		
		if (sType == "elianchallenge4") {
			ndef = this.getDefences();
			md = WritePlaceHeader();
			this.setFlag(12);
			this.setFlag(18);
			
			this.showPerson(ndef > 4 ? "challenge4.jpg" : "challenge-fail.jpg");

			if (ndef > 4) {
				addPlaceTitle(md, "Challenge Won and...!");

				md.write(
					'<p>You decide you are ready to try the challenge, confident in your protections and lean in and kiss Elian and she then straddles you, continuing to kiss you. You feel an immediate rush of desire but that is all as Elian passionately kisses you and her clothing disappears and then yours ' 
				);
				if (perYou.isMaleSex()) md.write('and you feel Elian mount your hardening member and start to ride you, cowgirl style. You do not last long, but nor does she, and you both cum hard.');
				else md.write('and she starts to rub her pussy against yours, tribbing as it is called. Neither of you last long and you orgasm hard with her.');
				md.write(
					'</p><p>Elian pushes you back gently. She smiles,<p>' +
					'<p>"That was wonderful, you have won the last part of my name". She sighs and whispers, "Sayla", so her true name is ElianIscariotAgosOmiSayla!</p>' +
					'<p>Elian stands, her clothes are mostly back on somehow and waits...</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'what is she waiting for?', Place, 'type=elianchallengewon');
			} else {
				addPlaceTitle(md, "Challenge Unprepared For");

				md.write(
					'<p>You decide you are ready to try the challenge and lean in and see somehow Elian is almost completely naked. You start to kiss her and then she straddles you. As she does you feel an immediate rush of passion and a very strange feeling as if your will, your very thoughts are being drawn out of your mouth into hers. One of your last free thoughts is you <b>certainly did not have enough defences for this</b>.</p>' +
					'<p>Then again that does not matter as your Mistress is so beautiful, she is everything you desire in life and you will do anything for her. Elian smiles almost whistfully,</p>' +
					'<p>"You were not easy enslave my love, you lasted until the final test, I am so happy..Follow me".</p>' +
					'<p>Your Mistress attaches a chain to your neck and leads you out of the club to your new life, past other people who think nothing of a beautiful woman leading a slave though the Avernus CLub....</p>'
				);
				startQuestionsOnly();
				addRestartLink(md);
			}
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		
		if (sType == "elianchallengewon") {
			md = WritePlaceHeader();
			this.showPerson("challenge-won.jpg");

			addPlaceTitle(md, "Challenge Finished!");

			md.write(
				'<p>Elian seems to be waiting for you but you are not sure what for, is there something needed to finalise this, beyond knowing her full name, some ritual, some token, something? You are no expert in demons though you know more than you used given everything with Kurndorf and Jade now!</p>' +
				'<p>When you hesitate Elian smiles and says, "Another time then when you work out what you want, or who. I will not return here until you decide and visit me where we first met"</p>' +
				'<p>She stands and her clothes are now fully on and she slowly leaves the table and unusually she is clearly visible as she passes though the club and leaves the exit.</p>' +
				'<p>It seems you have won her true name but what is needed now to complete the contract, assuming you actually want to do this?</p>'
			);
			startQuestions();
			addLinkToPlace(md, 'return to the bar', Place);
			WritePlaceFooter(md, '', true, true);
			return true;
		}		
		
		if (sType == "talkinclub") {
			// Talk to Elian
			md = WritePlaceHeader();
			nm = this.getPersonName();
			this.setFlag(12);
			this.showPerson("clubtalk0.jpg");

			addPlaceTitle(md, "Talking to " + nm);

			md.write(
				'<p>You sit with ' + nm + ' and talk for a while with her. As always she is very attentive and firty, cute in an odd and intense way.</p>' +
				'<p>She suggests she could buy you a drink...</p>'
			);

			startQuestions();
			if (this.checkFlag(14)) {
				if (!this.checkFlag(15)) addLinkToPlaceC(md, 'do the first challenge, kiss her', Place, 'type=elianchallenge1');
				else if (!this.checkFlag(16)) addLinkToPlaceC(md, 'do the second challenge, touch her', Place, 'type=elianchallenge2');
				else if (!this.checkFlag(17)) addLinkToPlaceC(md, 'do the third challenge, lick her', Place, 'type=elianchallenge3');
				else if (!this.checkFlag(18)) addLinkToPlaceC(md, 'do the fourth and final challenge, fuck her', Place, 'type=elianchallenge4');
			}
			if (this.checkFlag(9) && !this.checkFlag(11)) addLinkToPlaceC(md, 'ask Rachael if she knows Elian or <b>is</b> Elian?', 281, 'type=elianconfront');
			addLinkToPlaceC(md, 'have a drink with ' + nm, Place, 'type=eliandrink&id=1');
			addLinkToPlace(md, 'leave ' + nm + ' for now', Place, '', 'When you glance back you notice ' + nm + ' is gone');
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		if (sType == "eliandrink") {
			// Drinking with Elian 1 and 2
			md = WritePlaceHeader();
			var id = parseInt(getQueryParam("id"), 10);
			nm = this.getPersonName();
			this.showPersonRandom("clubtalk1", 3);

			addPlaceTitle(md, "Drinking with " + nm);

			switch(id) {
				case 1:
					md.write(
						'<p>You have a drink with ' + nm + ' it is surprisingly strong despite it looking like red wine, but it must be some sort of cocktail.</p>' +
						'<p>' + nm + ' talks to you but the drink makes it hard to focus on her words, despite this she is quite fascinating.</p>'
					);
					break;
				case 2:
					md.write(
						'<p>You do not notice the strength of the drink this time, you just feel warn and a bit turned on. ' + nm + ' chats with you but her workds just wash over you. She is very, very cute...</p>'
					);
					break;
			}
			startQuestions();
			if (id == 2) addLinkToPlaceC(md, 'have another drink with ' + nm, Place, 'type=eliandrinkbadend');
			else addLinkToPlaceC(md, 'have another drink with ' + nm, Place, 'type=eliandrink&id=' + (id + 1));
			addLinkToPlace(md, 'enough for now, excuse yourself and leave ' + nm, Place, '', 'When you glance back you notice ' + nm + ' is gone');
			WritePlaceFooter(md, '', true, true);
			return true;
		}	
		
		if (sType == "eliandrinkbadend") {
			// Elian Drinking Bad ending
			md = WritePlaceHeader(false, "td-left-large");
			nm = this.getPersonName();
			perYou.charmThem(4, "Demon");
			nMana = 0;
			updateLeftBar();
			this.showPerson("clubtalkend.jpg");
			addPlaceTitle(md, "Drunken Slave");
			md.write(
				'<p>You lose track of the night but seem to remember going somewhere with ' + nm + ', stripping off your clothing and <b>all</b> other items. You remember passionately entwined naked bodies hotly pleasuring each other and climaxing over and over.</p>' +
				'<p>You wake and see Elian lying next to you, your Mistress and lover, the <b>only</b> thought in your head is to please her. Your body aches for her touch and she looks at you smiling, "Now you are my slave, forever!" and you agree, anything to please your Mistress.</p>' +
				'<p>You are a demon\'s plaything, happily serving her every desire without thought, without will. Better luck next time...</p>'
			);
			startQuestionsOnly();
			addRestartLink(md);
			WritePlaceFooter(md, '', true, true);
			return true;
		}
		return false;
	};
	
	per.showPersonTextHere = function(md)
	{
		if (sType === "" && Place == 282 && this.isHere()) {
			if (!this.checkFlag(3)) md.write('<p>You see a young woman sitting at the bar drinking, she looks familiar but you cannot place her.</p>');
			else md.write('<p>You see Rachael sitting at the bar, at least that is the name she is using here.</p>');
		}
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 280 && sType === "") {
			var perJade = findPerson("Jade");
			if (perJade.checkFlag(5) && perJade.isHere()) {
				// Questions and bargains
				if (this.checkFlag(1) && !perJade.checkFlag(7)) addQuestionC(md, 'ask about Elian', "Jade", 667);
				if (this.checkFlag(10) && !this.checkFlag(9)) addQuestionC(md, 'ask if she knows Rachael', "Jade", 672);
				if (this.checkFlag(18) && !this.checkFlag(26)) addQuestionC(md, 'ask about demon contracts', "Jade", 673);
			}
		} else if (sType === "" && Place == 282 && this.isHere()) {
			if (!this.checkFlag(3)) {
				addPopupLinkC(md, 'talk to the familiar woman', "Really Familiar",
					this.addPersonString("clubtalk1a.jpg", "height:max%", "right") +
					'You approach the young woman and she smiles and invites you to sit with her. She has odd, intensely blue eyes, and she seems attracted to you. You certainly feel attracted to her but she is naggingly familiar, and it is becoming very annoying.</p>' +
					'<p>You talk with her a bit, introducing yourself, but she avoids giving her name for a while. When you directly ask she smiles,</p>' +
					'<p>"Well, you can call me Rachael here, or should I use Catherine, no Rachael", well it is clearly not her actual name, but that will have to do for now.</p>' +
					'<p>You chat more, and try asking some questions to try to work out where you have met before. She smiles, but there is an edge to it, not from amusement, and she speaks softly,</p>' +
					'<p>"Yes, we have met before, I was dressed differently, and the lighting was much darker", you ask her where it was. All she would say that it was far from here and refuses to explain more.<p>' +
					'<p>You talk and she becomes more flirtatious, but then she pulls back, "Maybe another time, when we are ready". She quickly exchanges phone numbers with you and with that your encounter is over. When you glance back at her, Rachael is gone.' +
					(isPersonHere("Vampyre") ? '</p><p>You notice Rachael ignored Lilith and equally Lilith ignored Rachael' : ''),
					false, 'setPersonFlag("Elian",3);setPersonFlag("Elian",12);dispPlace()'
				);
				this.shown = false;
			} else {
				if (this.checkFlag(11) && !this.checkFlag(14)) addLinkToPlace(md, "talk to " + this.getPersonName(), Place, "type=talkinclubchallenge");
				else addLinkToPlace(md, "talk to " + this.getPersonName(), Place, "type=talkinclub");
			}
		}
	};

	// Cast a spell on them or use an item
	per.handleItem = function(no, cmd)
	{
		var wwho;

		// The pistol
		if (no == 9 && cmd == 2 && this.checkFlag(11)) {
			if (sType == "elianconfront" || (sType == "talkinclub" || sType == "eliandrink")) {
				if (!this.checkFlag(13)) {
					addComments(
						'You reach down and touch the handle of pistol and a thought from somewhere comes to mind,</p>' +
						'<p>"Five rounds rapid chaps" but then you think, is she even mortal, would a bullet do anything, and more importantly would you want to. She seems to only be interested in you after all!</p>' +
						'<p>You take you hand off the pistol and you see Rachael...that is Elian...smile. You decide, it will be so much better to control that smile than just to kill it.'
					);
				} else {
					addComments(
						'You doubt really the pistol would be of any use and you would prefer to control her, not kill her'
					);
					
				}
				return "handled";	
			}
		}
		
		// Casting the clairvoyance spell
		if (no == 15 && cmd == 2) {

			if (this.isHere && Place == 282) {
				// In the Avernus Club when she is there
				if (CastClairvoyanceSpell()) {
					this.setFlag(10);
					addComments('<p>The spell reveals something strange, Rachael is not human.</p>');
					return "handled";
				}
			}
		}
		
		// Casting the charm spell
		else if (no == 14 && cmd == 2) {

			// Avernus Club
			if (Place == 282 && this.isHere()) {
				// Drinking at the club
				addComments("You try to cast the spell but there are so many people around, so loud, it is too difficult to focus it on any one person");
				return "handled";
			}
			if (Place == 269 && this.isHere()) {
				// Pool event
				this.setFlag(10);
				addComments("You try to cast the spell but it simply fails. You smell a faint odour of sulphur but it immediately passes.</p><p>Rachael smiles, &quot;I\'m not that easy...or that submissive&quot;");
				return "handled";
			}			
		}

		return "";		// do nothing
	};	
	
	per.addPersonPhoneCall = function() {
		if (!this.checkFlag(3)) return false;
		
		if (Place != 282 && Place != 283 && this.hoursSince() > 12 && !isDay()) {
			if (!this.checkFlag(4)) {
				if (makeCall(true, 350)) this.setFlag(4);
			} else if (!this.checkFlag(5)) {
				if (makeCall(true, 351)) this.setFlag(5);
			} else if (!this.checkFlag(8) && this.checkFlag(7)) {
				if (makeCall(true, 349)) this.setFlag(8);
			}
			// Challenge related SMS's, should generally be received the night after a successful challenge
			if (!this.checkFlag(20) && this.checkFlag(15)) {
				if (makeCall(true, 348)) this.setFlag(20);
			} else if (!this.checkFlag(21) && this.checkFlag(16)) {
				if (makeCall(true, 347)) this.setFlag(21);
			} else if (!this.checkFlag(22) && this.checkFlag(17)) {
				if (makeCall(true, 346)) this.setFlag(22);
			}
		}
		return false;
	};
	
	per.getPersonSMS = function(id) {
		switch(id) {
			case 350: 
				return receiveSMS('a lamb', 'I am feeling lost, can you find me?', 'sms1.jpg');
			case 351: 
				return receiveSMS('a lamb', 'I am lost without you, why don\'t you come to me', 'sms2.jpg');
			case 349: 
				return receiveSMS('a lamb', 'Cheers, let\'s have a drink', 'sms3.jpg');
			case 348: 
				return receiveSMS('Mistress', 'There is so much more than kissing if you just surrender. Now you must touch me...', 'sms4.jpg');	
			case 347: 
				return receiveSMS('Mistress', 'Your touch is wonderful and you will do it more if you just surrender. Now you will lick me and I you', 'sms5.jpg');
			case 346: 
				return receiveSMS('Mistress', 'You taste delicious and I will taste you over and over if you just surrender. Now for the last one, you will fuck me', 'sms6.jpg');					
		}
		return '';
	};
}
