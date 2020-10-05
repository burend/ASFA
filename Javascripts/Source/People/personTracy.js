/****************************************************************
			Sister Tracy
 ****************************************************************/
function RepliesTracy(nR)
{
	//var bCharm = per.isCharmedBy();
	//var myName = per.getYourNameFor();
	var sibling = 'Sis';
	if (perYou.isBornMale()) sibling = 'Bro';

	if (nR == 1408) //v14 = Serving Mr Beasley - gave him the book and ask her for help
	{
		setBeasleyServant(9);
		addComments('"So my brat sibling needs help. About time that you asked. Maybe we should go to the library. There is sure to be information there."');
	}
	else if (nR == 1412)
	{
		if (!isPlaceKnown("WildRanges")) setPlaceKnown("WildRanges");	// Access to Wild Ranges
		setBeasleyServant(32);
		addComments('"Mr. Beasley? Mana? Well, yes, I heard something about stones in the wild ranges but you must not think of Mr. Beasley as a bad man. He did nothing to me, he was just there when I spoke with Davy last."');
	}
	else if (nR == 8901) // v89 = Normal Sister Tracy Path
	{
		per.other = 2;
		addComments(
			'You mention to her about the meeting with Davy at school and ask if she as seen him around.</p>' +
			'<p>"No, no ' + sibling + '" she says. "Why do you ask? You know Mom dislikes him after that stuff with Kate."</p>' +
			'<p>"Hey Sis," you reply. "I am looking for him and I thought I heard you say his name when looking at your phone?"</p>' +
			'<p>"No..a friend was just being daffy, you know stupid! But...well, last I saw he was in the shopping mall, and he...  I don\'t want to talk about it." She says and changes the topic, asking you about how your friend Amy is.'
		);
		if (perYou.isBornMale()) addComments('</p><p>After a bit she comments "What\'s with boys your age anyway?" but does not explain.');
	}
	else if (nR == 8902)
	{
		per.other = 3;
		if (wherePerson("Mom") === 0) movePerson("Mom", 154);
		addComments('"Not much. Mom said she wants to talk to you, though. You ought to find her, she was in her room last I saw."');
	}

	else if (nR == 8906)
	{
		Place = 45;
		per.place = 176; 	// Move Tracy to the Robbins house
		bChat = false;
		addComments(per.addPersonFace() + '"Oh, Davy wants me! I\'m on my way," she says exuberantly and rushes out of the house.');
	}

	return true;
}

function TracyMorningAfterDavyEventDone()
{
	movePerson("Tracy", 1);
	setPersonFlag("Tracy", 9);
	if (Place == 45) dispPlace();
}

function afterSexTracy(md, perMom)
{
	if (perMom.extra[0] != -1) {
		if (perMom.place == 154 && !perMom.checkFlag(28)) {
			// Mom is at home
			if (perMom.extra[0] !== 0) {
				IncreaseMomsArousal(1);
				perMom.setFlag(28);
			}
			md.write('<p>At one time you are sure you heard the bedroom door close, maybe you left it accidentally open and it swung shut?</p>');
		}
	}
	startQuestions();
	if (!isDay()) {
		addPopupLink(md, "go to bed for the night with Tracy", "Going to Bed with Tracy",
			'</p><img src="Images/People/Tracy/tracy11a.jpg" style="position:absolute;width:100%;bottom:0" alt="Tracy">' +
			'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">As you you lie with Tracy after your love making, she asks you a little nervously, "Why not spend the night..with me?". You cannot refuse your sister the way she is looking as she lies there next to you.',
			true, "WaitforForDayNight();gotoPlace(122,'type=breakfast');", false, undefined, "background-color:white;color:black;top:10%;left:5%;width:85%;height:80%;padding:0");
	}
}


// Initialise
function initialiseTracy()
{
	// Tracy
	addPerson("Tracy", 0, "Tracy", '', false);
	per.charmThem(1, "Davy");
	per.Replies = RepliesTracy;

	per.getPersonAddress = function() { return "16 Kollam St, Glenvale"; };

	per.getPersonName = function(full) {
		if (full === true) return this.name;
		return this.isCharmedBy("You") > 0 ? "Liberated Tracy" : "Tracy, your sister";
	};
	
	per.getYourNameFor = function() { return perYou.isBornMale() ? "Bro" : "Sis"; };

	per.getPossessionFace = function() { return "tracy9"; };

	per.whereNow = function() {
		if (this.place === 1) {
			if (this.other > 3 && this.other < 8 && this.isCharmed() && !this.isCharmedBy()) return 156;
			else if (isDay()) return 45;
			if (perJesse.whereNow() == 6) return 45;
			if (Place == 45 && getQueryParam("event") == "tracysnack") return 45;
			if (Place == 122 && sType !== "") return Place;
			if (getHour() <= 6) return 122;
			return 374;
		}
		return this.place;
	};
	
	per.passTimeDay = function() {
		this.setFlag(1, false);
		if (this.checkFlag(20)) {
			this.setFlag(21);
			this.setFlag(20, false);
		} else if (this.checkFlag(21)) {
			this.setFlag(22);
			this.setFlag(21, false);
		} else if (this.checkFlag(22)) {
			this.setFlag(23);
			this.setFlag(22, false);
		} else {
			this.setFlag(24);
			this.setFlag(23, false);
		}
		return '';
	};
	
	per.addPlaceImageLeft = function(lit)
	{
		if (getQueryParam("event") === "tracysnack") return this.showPersonRandom("tracy6", 2, '', '', '', '', 0, true, "string");
		return '';
	};

	per.showEventSleep = function(wt, plc, s, param)
	{
		if ((Place == 46 || Place == 170) && this.isCharmedBy("Davy") && !perYou.checkFlag(18) && wt > 24 && !this.checkFlag(6) && this.place !== 0 && isSpellKnown("Charm")) {
			// Tracy Bad end start, in your own bed or with Tess
			passTime(true);
			passTime(true);
			dispPlace(46, "type=tracyevent1&plc=" + Place);
			return true;
		}
		return false;
	};

	per.showEventPopup = function()
	{
		var sibling;

		if (Place == 45) {
			sibling = 'Sis';
			if (perYou.isBornMale()) sibling = 'Bro';

			if (this.other === 0 && perYou.getExperience() > 3 && perGates.other != 499 && sType === "")	{
				// Sister Tracy is now at home
				this.other = 1;
				this.place = 1;
				setPersonFlagAfterTime("Tracy", 3, true, Math.floor(Math.random() * 24) + 24);
				showPopupWindow("Your Sister Tracy is Home",
					this.addPersonString("tracy0.jpg", "height:max%", "right") +
					'When you walk in your front door, you see your older sister Tracy is back home. She must have just been changing and decided to get some ice cream from the kitchen, she loves ice cream. She is wearing very little as is her habit, she has little modesty and she is a bit of a tease at times. She brightly says,<br><br>' +
					'"Hi there little ' + sibling + ', want some? ice cream that is.", yes she\'s a bit of a tease and yes you do want some.<br><br>' +
					'Tracy is your older sister by two years, and she always wants to be \'on top\' and you have often argued with her. Despite this you get on well with her, she is helpful, funny and energetic.<br><br>' +
					'She works a couple of part-time jobs and studies part-time towards a business degree at college. Recently she has not been going to her jobs or studying, you think she has started a new relationship and is spending a lot of time with them, but she is keeping it secret from Mom and you.' +
					(perYou.health < 100 && !this.checkFlag(7) ?
						'</p><p>You follow Tracy into the kitchen, and she notices your slight limp, she asks what happened and you tell her about the drain but do not mention Davy. She looks at you concerned,</p>' +
						'<p>"Alright young ' + perYou.getManWoman() + ' get into the bathroom and I\'ll check it out. Take off your shoes and pants and wash the area before I check it out, I\'ll follow in a few minutes."</p>' +
						'<p>Tracy took a first aid course a few years ago and she has assumed the role of the family nurse ever since. Well, there is nothing you can do about it, Tracy will not take no for an answer and you should get your ankle checked, so you head into the bathroom...'
						: ''
					), perYou.health < 100 && !this.checkFlag(7) ? "gotoPlace(45,'type=firstaid1')" : "dispPlace()"
				);
				return true;

			} else if (this.isHere() && this.other !== 0 && perYou.health < 100 && !this.checkFlag(7) && sType === "")	{
				// Sister Tracy first aid
				showPopupWindow("Tracy your Older Sister",
					this.addPersonString("tracy1b-" + (isDay() ? "day" : "night") + ".jpg", "height:max%", "right") +
					'When you walk in your front door, you see Tracy is sitting in the kitchen, and she notices your slight limp, she asks what happened and you tell her about the drain but do not mention Davy. She looks at you concerned,</p>' +
					'<p>"Alright young ' + perYou.getManWoman() + ' get into the bathroom and I\'ll check it out. Take off your shoes and pants and wash the area before I check it out, I\'ll follow in a few minutes."</p>' +
					'<p>Tracy took a first aid course a few years ago and she has assumed the role of the family nurse ever since. Well, there is nothing you can do about it, Tracy will not take no for an answer and you should get your ankle checked, so you head into the bathroom...',
					"gotoPlace(45,'type=firstaid1')"
				);
				return true;

			} else if (this.isHere() && perYou.isShot() && !this.checkFlag(8)) {
				// Sister Tracy greeting after you return home after being shot
				this.setFlag(8);

				showPopupWindow("Tracy Looks Worried",
					this.addPersonString("tracyshot" + (this.isCharmedBy("You") ? "2" : "1") + "-" + (isDay() ? "day" : "night") + ".jpg", "height:max%", "right") +
					'You see Tracy looking upset as you approach, but as she sees you she suddenly looks much happier. She leaps to her feet and hugs you,</p>' +
					'<p>"Silly Little ' + sibling + ', don\'t get me all worried like that. Mom and I were called to the hospital and you were lying there unconscious...We thought the worst until they told us you were fine and would recover quickly. I wanted to stay, so did Mom but they told us to return home and wait until they called. Then you came home all on your own!!"</p>' +
					'<p>She hugs you again, "Be careful my dear ' + (perYou.isBornMale() ? 'brother' : 'sister') + '" She steps back and mentions that she was given your possessions and that she put them in your room. She then says,</p>' +
					'<p>"You should go see Mom", and yes you should.'
				);
				return true;

			} else if (sType == "firstaid1") {
				setQueryParams('');
				this.setFlag(7);
				perYou.health += 5;
				showPopupWindow("Tracy\'s First Aid",
					this.addPersonString("tracy-bath1.jpg", "height:max%", "right") +
					'In the bathroom you remove your shoes and pants and start to wash your ankle in the bathtub. It is still quite painful, and you internally curse Davy. You hear Tracy behind you and you turn around and sit on the edge of the bath. Surprised you see Tracy is naked wrapped in a towel. For a moment she looks thoughtful but then smiles and tells you,</p>' +
					'<p>"No inappropriate ideas Little ' + sibling + ', I just needed to have a bath, so I\'ll check you out and then you can get out of here!". That is more like Tracy, no modesty and a big tease!</p>' +
					'<p>She kneels, keeping her towel covering all the interesting bits, but it does not stop you trying to peek at times as she examines your ankle...',
					"gotoPlace(45, 'type=firstaid2')"
				);
				return true;

			} else  if (sType == "firstaid2") {
				setQueryParams('');
				showPopupWindow("Tracy\'s First Aid",
					this.addPersonString("tracy-bath2.jpg", "height:max%", "right") +
					'Tracy announces that there is no problems with your ankle, and suggests some simple painkillers until it gets better. Still, your ankle feels a little better, sore but better. You thank her, and Tracy smiles,</p>' +
					'<p>"Ok time to get out of here Little ' + sibling + ', but you know I saw you looking, or trying to look. Since you thanked me you can inappropriately check me out too". With that she pulls away her towel so it covers her front, exposing her lovely ass. She grabs one of your shoes and throws it at you laughing,</p>' +
					'<p>"Now get out of here!"</p>',
					"dispPlace(45)"
				);
				return true;

			} else  if (sType == "snack1") {
				setQueryParams('');
				showPopupWindow("A Snack with Tracy",
					this.addPersonString("tracy1d.jpg", "height:max%", "right") +
					'Tracy meets you after her quick shower and has slipped on some simple clothes. She starts to make some kind of ice cream treat, she loves ice cream.<br><br>' +
					'She seems a lot happier now, either the memories are fading or that shower was very refreshing. She jokes around a bit with you and then tries to balance a spoon on her nose, successfully.<br><br>' +
					'As she does you notice her pants are starting to slip down and you can see she is not wearing any panties. She notices your glance and lightly says,<br><br>' +
					'"You know when that Davy was...talking...to me once he said that he really wanted his older sister, you know...wanted to fuck her...Do you think all siblings fantasise about their older sisters?"<br><br>' +
					'You notice her pants slip a little more...',
					"gotoPlace(45, 'type=snack2')"
				);
				return true;

			} else if (sType == "snack2") {
				setQueryParams('');
				showPopupWindow("Whoops!",
					this.addPersonString("tracy1e.jpg", "height:max%", "right") +
					'Tracy pants slip down completely to her ankles when she turns to eat some ice cream. She looks back at you,<br><br>' +
					'"I am sure they do, like big sisters sometimes day-dream about their younger siblings"<br><br>' +
					'She quickly pulls up her pants and completely changes the topic and makes a joke about something different as she passes you some ice cream.<br><br>' +
					'You realise the moment has passed, and that it seems her experience being charmed has slightly affected her, but is it for the better?',
					"dispPlace('','')"
				);
				return true;

			}

			// Greeting events for people in the house when Mom is not at home
			var bTracyHere = this.whereNow() == 45 || this.whereNow() == 156;
			if (wherePerson("Mom") == 154 || !bTracyHere) return false;
			var perTess = findPerson("Tess");
			var perTanika = findPerson("MrsTanika");
			var perAnita = findPerson("Anita");

			// First meeting with Tess at home?
			if (perTess.place == 45 && !perTess.checkFlag(7)) {
				// Tracy meets Tess
				showPopupWindow("",
					perTess.addPersonString("tess21.jpg", "height:max%", "right") +
					"<p style='text-align:center;margin-top:-12px;font-size:x-large'><b>Tess with Tracy</b></p>" +
					'As you enter the ' + (nFromPlace == 44 ? 'front door of your home' : 'living room') + ', you hear some voices in conversation, your mother is talking to someone,</p>' +
					'<p>"What do you see in my Little ' + (perYou.isBornMale() ? 'Bro' : 'Sis') + '?" you hear Tracy ask.</p>' +
					'<p>"I love ' + perYou.getHimHer() + ' it was love at first sight!" and you recognise the voice as Mrs. Adams, that is Tess.</p>' +
					'<p>Tracy continues, "While not that it matters, what about your husband? It\'s not like you need ' + perYou.getPersonName() + '?", Tracy is teasing Tess, so you step in and say "Tracy please go easy on Tess!"</p>' +
					'<p>Tess sees you and almost leaps to her feet in her happiness, and immediately trips over. You smile and help your beautiful klutz to her feet as Tracy watches. Tess glances at her and to make a point embraces you and kisses you passionately.</p>' +
					'<p>Tracy tells Tess, "Well I\'ll speak to Mom and I\'m sure she will agree eventually, welcome here, visit any time you like", from her expression she seems to genuinely likes Tess.</p>' +
					'<p>Tess smiles at your mother and then looking you she says, "I will wait for you in your <i>bedroom</i>" and she leaves you with your mother. Tracy looks at you and just says,<br><br>' +
					'"You are one lucky ' + perYou.getSex() + '"',
					"setPersonFlag('Tess',7);movePerson('Tess',46)"
				);
				return true;
			}
			if (perTanika.place == 45 && !perTanika.checkFlag(2) && !isDay()) {
				// Tanika here
				var clvT = perTanika.getCharmedLevel();
				// Commom part
				var s = perTanika.addPersonString("meettracy.jpg", "height:max%", "right") +
					'When you enter the living room Tracy greets you, "You are in trouble little ' + (perYou.isBornMale() ? 'Bro' : 'Sis') + ', one of your teachers is here! It is Mrs. Ice Queen, she\'s just in the toilet". She used a nickname she used for Mrs. Tanika back when she attended your school.</p>' +
					'<p>A moment later Mrs. Tanika returns smiling,</p>' +
					'<p>"' + perYou.getPersonName() + '! I have been having a chat with my ex-student Tracy..."</p>' +
					'<p>and Tracy almost interrupts, "and Mrs. Tanika tells me that you promised that she could temporarily sleep here on our couch, something about an argument with her husband and how you offered. Really, you should have asked Mom first!" she looks over at Mrs. Tanika. You remember in the past your mother had some arguments with Mrs. Tanika, some dispute when Mom was doing some volunteer work at the school. You would not be surprised it was just that they both have...forceful personalities. Mrs. Tanika smiles at you,</p>';

				if (clvT == 2) {
					// Lover
					s += '"Well, ' + perYou.getPersonName() + ' is a good student, except for ' + perYou.getHisHer() + ' grades, and I am sure I can tutor ' + perYou.getHimHer() + ' to repay, there are some ' + (perYou.isMaleSex() ? ' particularly \'hard\' problems' : '\'oral\' quizzes') + ' I can help with"</p>';
				} else {
					// slave
					s += '"' + (!perYou.isBornMale() ? 'Mistre..Miss' : 'Master...Mister') + ' ' + perYou.getPersonName() + ' is my best student and I am sure I can tutor ' + perYou.getHimHer() + ' however they want of me"</p>';
				}
				s += 'Tracy chuckles and mentions something about talking to Mom but was sure it will be ok, and she goes into the kitchen to get some ice cream, asking if you want some too, but you are too distracted. Mrs Tanika leans over an whispers "I packed some lingerie, let me model them for you" and she heads over to your room.';
				showPopupWindow("Mrs Tanika with Tracy", s, "setPersonFlag('MrsTanika',2);movePerson('MrsTanika',46)", "color:black;background-color:white");
				return true;
			}
			if (perAnita.place == 45 && !perAnita.checkFlag(9)) {
				// Tracy meets Anita
				showPopupWindow("Anita with Tracy",
					perAnita.addPersonString("anita9c.jpg", "height:max%", "right") +
					'As you enter the ' + (nFromPlace == 44 ? 'front door of your home' : 'living room') + ', you hear Tracy talking,</p>' +
					'<p>"What is you relationship with my Little ' + (perYou.isBornMale() ? 'Bro' : 'Sis') + '?"</p>' +
					'<p>You quickly decide that you must get involved and call out to Tracy, "Tracy, let me explain!", as you frantically try to work out how to explain Anita. Anita of course just makes it worse,</p>' +
					'<p>"Commander, I am here as you ordered!", Tracy exclaims or is it laughs, "Commander, ordered?"</p>' +
					'<p>You look pointedly at Anita, "Anita, very funny. Tracy, Anita is a bit of a nut about military things and gets carried away. We are just working together on a history project at school about...militia organisations in the 20th century. she is going to overnight sometimes, her home is under going major renovations?"</p>' +
					'<p>Tracy comments "I\'m sure you will be working together on an <b>organ</b>isation. Well Commander Little ' + (perYou.isBornMale() ? 'Bro' : 'Sis') + ', what are your orders?" and she laughs as she waves and goes into her room.</p>',
					"setPersonFlag('Anita',9);movePerson('Anita',46)", "background-color:white;color:black;text-shadow:-1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;"
				);
				return true;
			}
			return false;
		}

		if (Place == 46 && sType == "tracyevent1")
		{
			// Tracy Bad Ending 1
			this.setFlag(6);
			showPopupWindow("Woken up...",
				this.addPersonString("tracyevent1.jpg", "height:max%", "right") +
				'<p>Strange noises wake you up in the middle of the night, and as your eyes begin to adjust to the darkness, you are barely able to make out a feminine looking silhouette in your room.</p>' +
				'<p>"Hello?" You drowsily call out, but the figure remains silent and unmoving, which is suspicious enough to jolt you awake and almost hammer your fist onto the switch of the nightlight.',
				"dispPlace(46,'type=tracyevent2&plc=" + getQueryParam("plc") + "')"
			);
			setQueryParams('');
			return true;
		}
		
		// Futa reaction
		if (Place == 122 && !this.checkFlag(14) && perYou.isFuta(true) && !perYou.isBornMale() && this.getCharmedLevel() == 2 && sType === "") {
			this.setFlag(14);
			showPopupWindow("Tracy and Your Changes",
				this.addPersonString("tracy16.jpg", "height:max%", "right") +
				'"This..." Tracy stares at your cock as you undress in front of her. "...is definitely one of the stranger things to happen of late... which is saying something."</p>' +
				'<p>Your sister seems curiously unphased by your new addition, and  when you ask her if she likes it, she gives you a cheeky grin.</p>' +
				'<p>"I may have fantasized once or twice about being penetrated by you, little Sis, I just thought it would be with a strap on."</p>' +
				'<p>You decide to not ask for how long she had those fantasies, and Tracy doesn\'t seem to put much thought into her comment, anyway and prefers to pull you into her bed.</p>' +
				'<p>"I don\'t care about what\'s between your legs." Her eyes are full of love as she cuddles up to you and slowly traces her fingertips over your hardening shaft. "I want to have fun with my Sis, and I think we can have a lot of fun with this."'
			);
			return true;
		}			
		return false;
	};

	per.showBedroomEvent = function()
	{
		var sibling;
		
		// Events in Tracy's bedroom
		if (sType == "listendavy1") {
			WritePlaceHeader();
			this.showPerson("tracy12.jpg");
			addPlaceTitle(md, "Spying on Tracy");
			this.setFlag(9);
			this.place = 1;
			md.write(
				'<p>It sounds like Tracy is on the phone, and while you usually wouldn\'t spy on your sister like that, her behavior of late has been very strange and you have to know what is going on.</p>' +
				'<p>“No, ' + perYou.getHeShe() + ' caught me when I tried to take it,” You hear her say. “And now ' + perYou.getHeShe() + '\'s locking the door...”</p>' +
				'<p>Is she talking about last night? You open the door a little just as she turns around, you notice with a light blush that she has opened her Jacket.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "keep listening", 122, 'type=listendavy2');
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "listendavy2") {
			sibling = 'sister';
			if (perYou.isBornMale()) sibling = 'brother';

			WritePlaceHeader();
			this.showPerson("tracy13.jpg");
			addPlaceTitle(md, "Spying on Tracy");
			md.write(
				'<p>“I\'m so sorry I have disappointed you, I\'ll try harder and...” There is a small pause, and Tracy suddenly shouts.</p>' +
				'<p>“NO!”</p>' +
				'<p>You pull back a little, hoping she did not see you, but she continues to speak.</p>' +
				'<p>“I mean, you don\'t need to send ' + (isMurderPath() ? 'that woman' : 'someone') + ' after ' + perYou.getHimHer() + '...”</p>' +
				'<p>Another pause follows, and your heart begins to pound faster.</p>' +
				'<p>“Of course not, but ' + perYou.getHeShe() + '\'s my little ' + sibling+ '! Just give me a few days and I...”</p>' +
				'<p>Another pause, and Tracy breathes out in relief and lets herself fall back on the bed.</p>'
			);
			startQuestions();
			addLinkToPlace(md, "keep listening", 122, 'type=listendavy3');
			WritePlaceFooter(md);
			return true;

		} 
		
		if (sType == "listendavy3") {
			WritePlaceHeader(false, 'td-left-large');
			this.showPerson("tracy14.jpg");
			addPlaceTitle(md, "Spying on Tracy");
			md.write(
				'<p>“Thank you! I promise there will be no need to hurt ' + perYou.getHimHer() + '! And once you have the book you can speak with ' + perYou.getHimHer() + ' and ' + perYou.getHeShe() + '\'ll finally see you as the wonderful person you are, we could even have a threesome!”</p>' +
				'<p>Tracy seems to relax a little, and you can hear her breath growing more heavy as she listens to the person on the phone, her voice playful and teasing as she speaks.</p>' +
				'<p>“Yes, I am touching myself... always thinking of all the dirty things we did the day you said those words to me...” She pushes her panties to the side and... this might be a good time to stop looking...</p>'
			);
			startQuestions();
			startAlternatives(md);
			addLinkToPlace(md, "keep listening, and looking", 122, 'type=listendavy4look');
			addLinkToPlace(md, "don't look, but keep listening", 122, 'type=listendavy4nolook');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;

		} 
		
		if (sType == "listendavy4look" || sType == "listendavy4nolook") {
			WritePlaceHeader(false, 'td-left-large');
			if (sType == "listendavy4look") this.showPerson("tracy15.jpg");
			else addPlaceImage(md, 'bedroom8.jpg');
			addPlaceTitle(md, sType == "listendavy4look" ? "Spying on Tracy" : "Listening to Tracy");
			if (sType == "listendavy4look") {
				md.write(
					'<p>You really shouldn\'t be doing that. Sure, Tracy has never someone who is ashamed of her sexuality, quite the opposite, really, but there have always been boundaries between the two of you, and watching her touch herself like this just feels... wrong... and exciting...</p>' +
					'<p>And kind of hot.</p>' +
					'<p>Your heart beats faster as she begins to slowly caress her folds and run two fingers over her clit, and you listen to her as she describes every motion she makes in a playfully sensual voice.</p>' +
					'<p>Tracy pulls in her lower lip to stifle a moan, stretching her body out on the bed while she slowly picks up the pace.</p>' +
					'<p>By the time she is close to reaching her peak, you have almost forgotten why you were here in the first place. She no longer tries to muffle her voice now, moaning freely into the phone while her petals begin to twitch visibly and a short climax rushes through her body.</p>' +
					'<p>“Yes, that was great...” There is a brief pause where she catches her breath before she speaks on. “Of course! Talk to you soon!” She smacks her lips for a kiss. “I love you, Davy!”</p>' +
					'<p>Davy...</p>' +
					'<p>A cold shiver runs through you as you hear the name and your mind is pulled back into reality.</p>' +
					'<p>Right, Tracy\'s mind is under the Dai Chu, you can\'t afford to forget that, and now you know that Davy Robbins must be the one who did it... and that thought alone makes you...</p>'
				);

			} else {
				md.write(
					'<p>Your sister touching her... private parts while under someone else\'s control is really not something you want to see, and you quickly pull back from the door and focus on her voice alone.</p>' +
					'<p>Tracy begins to describe what she is doing, but, to your luck, is cut short by the person on the other end of the line, and clearly disappointed.</p>' +
					'<p>“Oh... you are with her...” She sighs briefly, but it doesn\'t seem to be a permanent blow to her mood. “Of course! Talk to you soon!” She smacks her lips for a kiss. “I love you, Davy!”</p>' +
					'<p>Davy...</p>' +
					'<p>A cold shiver runs through you as you hear the name and quickly return to the kitchen.</p>' +
					'<p>You had suspected it, but now it\'s clear... Davy Robbins has taken over the mind of your sister.... and that thought alone makes you...</p>'
				);
			}
			startQuestions();
			startAlternatives(md);
			addLinkToPlace(md, "...angry! You have to protect your family", 122, 'type=listendavy5angry');
			addLinkToPlace(md, "...jealous! Tracy is yours", 122, 'type=listendavy5jealous');
			endAlternatives(md);
			WritePlaceFooter(md);
			return true;
		} 
		
		if (sType == "listendavy5angry" || sType == "listendavy5jealous") {

			WritePlaceHeader();
			this.showPerson("tracy16.jpg");
			addPlaceTitle(md, "Finished Spying on Tracy");
			if (sType == "listendavy5angry") {
				md.write(
					'<p>If there was ever any doubt that Davy is dangerous, it\'s gone now. He openly moved against you via your family, and you have to fight back if you don\'t want mom and yourself to fall under his control like Tracy.</p>' +
					'<p>Of course, the question is: how? Davy has a head-start, he likely has put other women in Town under his control, and he seems to know the ways of magic better than you do.</p>' +
					'<p>You need to increase your power, learn new spells and find a way to free Tracy. You know there are people who could help you, with the right persuasion.</p>' +
					'<p>The Dai Chu is a way to even the odds, maybe you had your reservations using it, maybe not, but it looks like you will need it if you want to fight back.</p>' +
					'<p>At least it seems like Tracy has given you a few days time to organize. Better make use of them.</p>'
				);

			} else {
				md.write(
					'<p>So, Davy knows you have the book and wants to take it from you...</p>' +
					'<p>You don\'t know what his ultimate plan is, but now that you have finally begun to learn magic and gather power, you are not going to let him take that away from you, and if someone is going to charm your sister, it will be you.</p>' +
					'<p>Of course, to do so, you have to find a way to remove Davy\'s spell from her first.</p>' +
					'<p>Tracy has bought you a few days before Davy\'s next move, and you need to use those to bring more people under your control and increase your power and influence in the city.</p>' +
					'<p>The Dai Chu can make you the most powerful person in the entire city, and you will not let Davy get in your way and steal what is yours, including Tracy.</p>'
				);
			}
			startQuestions();
			addLinkToPlace(md, "return to the kitchen", 45);
			WritePlaceFooter(md);
			return true;
		}
		
		var perMom = findPerson("Mom");
		var perTanika = findPerson("MrsTanika");
		var perTess = findPerson("Tess");
		var perAnita = findPerson("Anita");

		if (sType == "breakfast") {
			// Breakfast with Tracy
			md = WritePlaceHeader();
			this.showPerson("tracy-breakfast1.jpg");
			addPlaceTitle(md, "Breakfast with Tracy");
			md.write(
				'<p>In the morning you wake in Tracy\'s arms and kiss her. Sometime later, you have a light breakfast with her in her room, chatting and joking around.'
			);
			startQuestions();
			addLinkToPlace(md, "go to the kitchen", 45);
			addLinkToPlace(md, "go to your bedroom", 46);
			addLinkToPlace(md, "exit the house", 44);
			WritePlaceFooter(md);
			return true;

		} else if (sType == "charm") {
			// End of the lover charm process
			md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
			if (perYou.isMaleSex()) this.showPersonRandom("tracy10b", 3);
			else if (isExplicit()) this.showPersonRandomRorX("tracysex1g", 2);
			else this.showPerson("tracysex1g.jpg");
			addPlaceTitle(md, "Making Love to Tracy");
			md.write(
				'<p>You take Tracy\'s hand and lead her to her bedroom. She silently kisses you as she removes ' +
				'your clothing and what remains of hers. She whispers "We do not want Mom to interrupt"</p>' +
				'<p>You passionately make love to Tracy enjoying the forbidden fruit of your sister!</p>'
			);
			if (perMom.extra[0] != -1) {
				md.write('<p>After, you do wonder at her words about your mother, do you really now want her to find out and get involved?');
				if (perMom.extra[0] !== 0) IncreaseMomsArousal(1, 4);
				else 	md.write(' The difficulty is you have no idea how to breach it with her, and using the charm spell...you are really unsure.');
				md.write('</p>');

				// Charmed Tracy, and Mom-incest ok
				startQuestions();
				addLinkToPlaceC(md, '"Well...', 45, '', 'As you leave Tracy&rsquo;s room you consider your mother and what to do');
				addLinkToPlaceC(md, '"No, she is my mother!"', 45, '', 'As you leave Tracy&rsquo;s room you reject the idea of anything involving your mother', '', 'IncreaseMomsArousal(-1)');
			} else startQuestions();
			addLinkToPlace(md, "go to the kitchen", 45);
			addLinkToPlace(md, "go to your bedroom", 46);
			addLinkToPlace(md, "exit the house", 44);
			WritePlaceFooter(md);
			return true;			

		} else if (sType === "calltesssusan") {
			// Foursome with Tess + Tanika
			md = WritePlaceHeader();
			this.showPerson("tracyfoursome1.jpg");
			addPlaceTitle(md, "Calling In Tess and Susan");
			md.write(
				'<p>You tell Tracy to remain where she is and quickly go to your room to get Tess and Susan.</p>' +
				'<p>Tracy is, at first, not really keen on sharing you with other girls, especially Susan, and it takes you a bit of convincing to get her to open up to the idea. In the end, though, she is happy when you are happy, and even a little exited to be with Tess.</p>' +
				'<p>Tess happily embraces your sister, and after a brief moment of reluctance, the two share a tender kiss. It\'s more for your benefit than theirs, really, but you know the two get along well, and Tracy takes no small enjoyment out of slowly removing what little clothes Tess had on herself and expose the other woman\'s body to you.</p>'
			);
			var clvT = perTanika.getCharmedLevel();
			if (clvT == 2) md.write('<p>You pull Susan into a warm embrace and gently drive one hand through her hair. Your usually oh so confident teacher is probably the most nervous woman in the room, but her doubts quickly melt away as you pull her into a deep kiss and assure her that she, too, will have a lot of fun, experience with other women or not. She quietly nods to you and steels herself as you help her remove the few clothes she is wearing and guide her towards the bed.</p>');
			else if (clvT == 3 || clvT == 4) {
				md.write(
					'<p>You take a hold of Susan\'s hair and pull her near you, your lips close to her ear as you once again remind her of her place: She is here to provide entertainment for you and your sister, a ' + (clvT == 4 ? 'slave' : 'Fucktoy') + ' who is using her tongue, hands and pussy to fulfill others desires, and should be thankful when her own are met in the process.</p>' +
					'<p>Susan shivers in your arms with every whispered word, and her spellbound mind happily accepts everything you tell her. She reassures you of her love and loyalty several times as she takes off her clothes, and demurely waits for your permission to join in as you move towards the bed.</p>'
				);
			}
			md.write(
				'<p>The four of you use the next hour to explore each others bodies. Skin touching skin, lips trading tender kisses, sensual moans and the scent of arousal slowly filling the room every passing minute.</p>' +
				'<p>Tracy and Tess are mostly focused on you, but it doesn\'t take a lot to get them to enjoy each others attention as well, and under your guidance, Tess makes your sister climax more than once.</p>'
			);
			if (clvT == 2) md.write('<p>You even get to see Tracy trade kisses with Susan, to your surprise. Your teacher is very eager to make sure both you and your sister, as well as Tess are left satisfied, and after a bit of motivating, Tracy helps you return the favor.</p>');
			else {
				md.write(
					'<p>Susan is reluctant to take initiative without permission, but you make sure that your ' + (clvT == 4 ? 'slave' : 'Fucktoy') + ' is making ' + (clvT == 4 ? 'herself' : 'itself') + ' useful. You guide her to please both Tess and Tracy, occasionally slapping her rear or pushing her face forward into someones crotch.</p>' +
					'<p>To your surprise, Tracy actually chastises you at one point for treating her that way and you had to tone it down a bit. You had expected her to be more eager to take revenge on the hated teacher as well, but ultimately, she is just a far too nice person, not that you don\'t love her for it.</p>'
				);
			}
			md.write('<p>At the end, all for of you are entangled in each others arms, exhausted from the pleasure and several orgasms, but blissfully happy.</p>');

			afterSexTracy(md, perMom);
			addLinkToPlace(md, "go to the kitchen", 45);
			addLinkToPlace(md, "go to your bedroom", 46);
			addLinkToPlace(md, "exit the house", 44);
			WritePlaceFooter(md);
			return true;

		} else if (sType === "callanita") {
			// Foursome with Tess + Tanika
			md = WritePlaceHeader(false, isExplicit() ? '' : 'td-left-med');
			this.showPersonRorX("tracyanita1.jpg");
			addPlaceTitle(md, "Calling In Anita");
			sibling = perYou.isBornMale() ? 'brother' : 'sister';
			md.write(
				'<p>“Commander! Ma\'am!” Anita is quick to enter the room as you call for her, and salutes both you and Tracy, who barely noticeably rolls her eyes back. “You require my assistance?”</p>' +
				'<p>“Indeed!” You move both arms behind your back and lift your chin. “Subcommander Tracy intents to give her ' + sibling + ' a blowjob, and your duty is to assist her.”</p>' +
				'<p>A few seconds pass in which Tracy\'s eyes now very visibly roll back and Anita seems to asses if this is really an appropriate order to give, and of course her conclusion is: Absolutely!</p>' +
				'<p>The two shove each other around somewhat as they knee down before you. Tracy usually gets along with everyone, but she can be a little jealous if she has to share her ' + sibling + 's cock, and Anita is just too headstrong to give up any space, but after some tense, wordless negotiating, and you opening your pants to give them something else to focus on, the little dispute is quickly forgotten.</p>' +
				'<p>The two trap your manhood between their lips and you enjoy the sensation of their tongues immensely as both of them leave trails of saliva all over your sensitive skin and playfully circle around the tip to lap up any spurts of precum.</p>' +
				'<p>They both try to take you into their mouth simultaneously, but this time, Anita backs away to let Tracy go first, and you enjoy the warm wetness of her mouth for a few moments before she passes you on to Anita.</p>' +
				'<p>See? They can get along.</p>' +
				'<p>The two girls now take turns tending to you, and when one pair of lips wraps around your shaft, the other quickly moves to the base or plays with your scrotum to assist.</p>' +
				'<p>You try to hold your climax back to savor the sight and sensations just a little longer, but Tracy is, as usual, only encouraged as she notices it, and Anita simply follows her lead, so it\'s only a matter of time until you have to pull your shaft from their lips and spray your seed onto both faces with a loud groan.</p>' +
				'<p>You take a moment to catch your bearings after that, and order Anita to clean Tracy\'s face with her tongue, before you send her back to guard the door.</p>'
			);

			afterSexTracy(md, perMom);
			addLinkToPlace(md, "go to the kitchen", 45);
			addLinkToPlace(md, "go to your bedroom", 46);
			addLinkToPlace(md, "exit the house", 44);
			WritePlaceFooter(md);
			return true;			

		} else if (sType === "taste") {
			// Taker into her bedroom (lover charm)
			md = WritePlaceHeader();
			this.showPerson(perYou.isMaleSex() ? "tracysex2b.jpg" : "tracysex2g.jpg");
			addPlaceTitle(md, "Tasting Tracy");
			md.write(
				'<p>Tracy has been really good to you, so it\'s only fair that you repay some of it.</p>' +
				'<p>You tell her to remain where she is and slip onto the bed, slowly moving closer to her and spreading her legs.</p>' +
				'<p>Tracy gasps as you drag your tongue along her folds and flick it over her little nub, and you proceed to caress her tights, slide your fingertips to her side and tenderly drag them over her stomach and back down, each motion making her shiver in delight.</p>' +
				'<p>When you push the first fingers inside her, she is already delightfully wet, and you hear a lewd moan from your sisters lips, the moment you begin to move them.</p>' +
				'<p>Tracy hastily stifles the noise as good as she is able to while your fingers begin to seek her most sensitive spots and your lips wrap around her clit.</p>' +
				'<p>There is another series of sensual moans from her, muffled this time, but audible nevertheless as you flick four tongue along her jewel, playfully circling it and occasionally sucking it in-between your lips and letting it plop free, and each little motion makes her body twitch and wind itself on the bed.</p>' +
				'<p>As her climax draws closer, she finds it visibly harder to hold back, you feel one of her hand sliding over your head, briefly before she slams it onto the bed and digs her fingers into her sheets while she presses her other hand firmly on her lips, and as she finally reaches her peak, her body arches through in a blissful shudder, desperate to not make too much noise but clearly enjoying every second of it.</p>'
			);

			afterSexTracy(md, perMom);
			addLinkToPlace(md, "go to the kitchen", 45);
			addLinkToPlace(md, "go to your bedroom", 46);
			addLinkToPlace(md, "exit the house", 44);
			WritePlaceFooter(md);
			return true;			

		} else if (sType === "makelove") {
			// Female 'Make Love'
			md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
			sibling = perYou.isBornMale() ? 'brother' : 'sister';
			if (!perYou.isMaleSex()) this.showPersonRandom("tracy10g", 2);
			else this.showPersonRandom("tracy10b", 3);
			addPlaceTitle(md, "Making Love to Tracy");
			if (!perYou.isMaleSex()) {
				md.write(
					'<p>You crawl onto the bed and on top of Tracy and press your lips to hers to share a long, tender Kiss. You enjoy the sensation of her warm body pressed against yours, your tongues dancing passionately and her fingertips caressing your back.</p>' +
					'<p>Deep within you, both of you know that what you do is frowned upon, but that only drives you further, makes it all the more exciting to taste the forbidden fruit before you and share those tender moments with your beloved big sister.</p>' +
					'<p>Tracy gasps as you break the kiss and rolls her head back to breath in while your own lips wander down, nibbling on her neck and collarbone, gently biting into her shoulder and flicking your tongue over her nipples. Each motion is drawing another sensual noise from her lips, you caress her breasts, slide your fingertips over her sides, and finally spread your legs to expose her damp nether lips.</p>' +
					'<p>The is a brief pause where the two of you look into each others eyes before you press your folds against hers and slowly begin to grind back and forth.</p>' +
					'<p>It\'s easy to get lost in the moment as the minutes fly by. You begin to increase the speed of your thrusts, adjusting them to make sure to stimulate her clit while your hands caress her body, and more than once, both of you need to find a way to muffle the others moans as you push closer to your peak.</p>' +
					'<p>When the moment comes, your lips touch one last time for a deep kiss as your orgasms rush through your bodies. Muffled moans filling the room and quickly dying down as the intense sensations subside.</p>' +
					'<p>You stay with your sister and hold her in your arms a little longer to feel her warmth. Yes, what you do might be forbidden, but it feels damn good.</p>'
				);
			} else {
				md.write(
					'<p>Taking your sister\'s hand both of you walk into her bedroom. Letting you enter first, she closes the door before she walks up to you and wraps her arms around your neck. “We don\'t want Mom to interrupt,” she smiles before she kisses you. Her lips part as the tip of her tongue brushes across your lips. Coaxing your tongue out she groans as she continues to passionate embrace. Her crotch rubbing up against your cock as she reaches down to pull up your shirt.</p>' +
					'<p>Tracy\'s lips break the kiss to pull your shirt overhead, quickly pressing themselves into your chest. She continues to tease you with the occasional brushing of her tongue against your flesh. Her natural drive to be \'in charge\' quickly exploding in her mind, but the goal is far different. Her \'in charge\' mentality focused solely on your pleasure. To show her ' + sibling + ' how she loves ' + perYou.getHimHer() + ' like the ' + perYou.getManWoman() + ' that ' + perYou.getHeShe() + ' is! Her desire mixing into the taboo scenario she finds herself in under the control of your spell only drives her further.</p>' +
					'<p>Her lavished attentions are broken for a moment as she takes off her own top. Her chin cocks downward and she coyly looks at you as she reaches behind to to unfasten her bra, “I want to feel you cum inside me, ' + perYou.getPersonName() + '. I want you to cum inside your sister and lover.”</p>' +
					'<p>Tracy turns around and bends over. She stares back at you, her hair cascading over her face as she begins to lower her panties and show you her pussy. Without hesitation you take off your own pants but are denied the instant gratification of plunging into your sister. Darling Tracy has other ideas as she turns back around to face you.</p>' +
					'<p>You have only your spell and the manipulations you applied to your sister to blame for this, but given the situation can you really complain? Her voice is low and seductive as she commands you, “Lay back on the bed. I want you to see my face while we make love.” Her slender fingers gently push you back onto the bed before she climbs on top of you. All you can do is admire the view as she naturally takes control of the situation. Her hands reaching down to guide your cock into her awaiting hole.</p>' +
					'<p>As the head of your cock slides into her she gasps as her head leans back, “Oh god you feel so good inside of me. Only my brother could fill me so completely. I will always be your lover.” Slowly she grinds herself against your crotch, staring down at you. She leans down and whispers into your ear, “I don\'t want Mom to come in and ruin our fun, ' + perYou.getPersonName() + '. Just let me take care of you.”</p>' +
					'<p>She reacts sensually to you, embracing in passionate kisses as she gradually begins sliding herself along the length of your cock. At other times she stares down at you as she slowly works your cock with her pussy. She wants you to see her as your lover and you as her lover. Her hips slowly rock to from side to side and she impales herself upon your length, working her body in a slow and tender manner for your mutual pleasure.</p>' +
					'<p>She leans forward and thrusts her tongue into your mouth as she moans deeply. Her body shudders from her orgasm, yet she doesn\'t pause in her manipulations upon you. Within moments her her second you feel your own body react as your cum explodes into her awaiting pussy. The warm sensation flowing into her causing her to gasp as she stares down at you, “Oh god yes, cum inside your sister, ' + perYou.getPersonName() + '.”</p>' +
					'<p>As your orgasm subsides she kisses you once more before nuzzling against you. Her lips lightly kissing your chest as she basks in the wonderful sensation of your lovemaking. As your cock slowly shrinks inside of her she smiles, “I love you, my little ' + sibling + '.”</p>'
				);
			}
			afterSexTracy(md, perMom);
			addLinkToPlace(md, "go to the kitchen", 45);
			addLinkToPlace(md, "go to your bedroom", 46);
			addLinkToPlace(md, "exit the house", 44);
			WritePlaceFooter(md);
			return true;			

		} else if (sType === "bj") {
			// Taker into her bedroom (lover charm)
			md = WritePlaceHeader();
			if (isExplicit()) this.showPersonRandomRorX(perYou.isMaleSex() ? "tracysex1b" : "tracysex1g", 2);
			else this.showPerson(perYou.isMaleSex() ? "tracysex1b.jpg" : "tracysex1g.jpg");
			addPlaceTitle(md, "Tracy\'s Tongue");
			if (perYou.isMaleSex()) {
				md.write(
					'<p>Your body always tingles all over when you are so close to your sister, the risk of being discovered, the rush of adrenaline knowing you are doing something very forbidden, the intoxicating sensation of her body pressed against yours, her heart racing as you look into each others eyes, and finally the small explosion of electricity when you share the first kiss of the day.</p>' +
					'<p>Tracy is a good kisser, you had suspected it for a long time, but feeling her tongue playfully intermingle with yours, brushing over your lips only to suddenly pull back... it\'s something else.</p>' +
					'<p>Tracy wordlessly looks into your eyes after the kiss, and as you try to say something, she  shushes you by placing a finger to your lips with a playful grin.</p>' +
					'<p>Her lips briefly brush over yours again before she slides of the bed, motions for you to spread your legs, and begins to slowly caress  your manhood.</p>' +
					'<p>You hum softly as Tracy\'s lips touch your shaft and watch her tongue trail up along the entire length.</p>' +
					'<p>Tracy rarely breaks eye contact as she takes your manhood into her hand and begins to move it to her mouth, playfully licking around the tip before she guides it past her lips.</p>' +
					'<p>You look down to your sister and caress her cheek while her head rolls back and forth, her eyes still lovingly focused on yours while your cock slips in and out of her mouth. It\'s quite a sight and almost enough to get you close to climax by itself, but the sensation of her soft lips sliding over you certainly helps.</p>' +
					'<p>As she feels your peak approaching, she pulls back and begins to stroke your shaft in quick, rapid motions to push you over the edge, making sure you get a good look of your cum falling on her face.</p>'
				);

			} else {
				md.write(
					'<p>Your body always tingles all over when you are so close to your sister, the risk of being discovered, the rush of adrenaline knowing you are doing something very forbidden, the intoxicating sensation of her body pressed against yours, her heart racing as you look into each others eyes, and finally the small explosion of electricity when you share the first kiss of the day.</p>' +
					'<p>Tracy is a good kisser, you had suspected it for a long time, but feeling her tongue playfully intermingle with yours, brushing over your lips only to suddenly pull back... it\'s something else.</p>' +
					'<p>Tracy wordlessly looks into your eyes after the kiss, and as you try to say something, she  shushes you by placing a finger to your lips with a playful grin.</p>' +
					'<p>Her lips briefly brush over yours again before she slides of the bed, motions for you to spread your legs, and places a finger on your clit while using her other hand to spread your folds.</p>' +
					'<p>You bite your lower lip to muffle a moan as Tracy begins to caress your sensitive parts and she motions you to be quiet as her fingers move deeper inside to your wetness.</p>' +
					'<p>Your big sister doesn\'t take long to find your most sensitive spots, teasing them with her fingertips and using her tongue to tickle your clit, every second making it harder to stifle your voice, harder to focus on being quiet instead of just letting it all out.</p>' +
					'<p>As you reach your peak, you have to place one hand to your mouth to suppress your moans, and Tracy happily watches you as your body tenses up under the intense sensations.</p>' +
					'<p>As the feelings subside, you let yourself fall back on the bed ans Tracy quietly crawls into your arms, sharing some of her experience with another kiss.</p>'
				);
			}

			afterSexTracy(md, perMom);
			addLinkToPlace(md, "go to the kitchen", 45);
			addLinkToPlace(md, "go to your bedroom", 46);
			addLinkToPlace(md, "exit the house", 44);
			WritePlaceFooter(md);
			return true;			

		} else if (sType === "tracysex" || sType == "waketracy") {
			// Taker into her bedroom (lover charm)
			sibling = 'Sis';
			if (perYou.isBornMale()) sibling = 'Bro';			
			md = WritePlaceHeader();
			this.showPerson("tracy16.jpg");
			if (sType == "waketracy") {
				addPlaceTitle(md, "Waking Tracy");
				md.write(
					'<p>You ggently wake Tracy and she groggily opens her eyes, "Hey little ' + sibling + ', did you have something you wanted to \'talk\' about?"</p>'
				);				
			} else {
				addPlaceTitle(md, "Making Love to Tracy");
				md.write(
					'<p>You guide Tracy into her room and the two of you silently kiss as she removes your clothes and what little remains of hers.</p>' +
					'<p>“Let\'s be quiet.” She whispers conspiratorially. “We do not want mom to interrupt.”</p>' +
					'<p>You nod, quickly close the door, and as you turn around, your sister is already on the bed, her eyes on you as she seductively licks her fingers.</p>'
				);
			}
			if (perMom.place != 154) {
				md.write(
					'<p>You don\'t really have to be all that secretive anymore as long as you are in your own home, but you admit it is part of the appeal.</p>'
				);
			}

			startQuestions();
			addLinkToPlace(md, "make love to Tracy", 122, 'type=makelove');
			addLinkToPlace(md, "enjoy your sister's tongue", 122, 'type=bj');
			addLinkToPlace(md, "taste your sister", 122, 'type=taste');
			if (perTess.isCharmedBy() && perTess.whereNow() == 46 && perTanika.isCharmedBy() && perTanika.whereNow() == 46) addLinkToPlace(md, "call in Tess and Susan", 122, 'type=calltesssusan');
			if (perYou.isMaleSex() && perAnita.isCharmedBy() && perAnita.whereNow() == 46) addLinkToPlace(md, "call in Anita", 122, 'type=callanita');
			this.addDancingLink(md, 'talk to Tracy about dancing in the club',
				'You talk with Tracy about exotic dancing and the Avernus club you have been to. She grins,</p>' +
				'<p>&quot;I am not saying I have been there Little ' + sibling + ' despite they do have some great male strippers at times. I think I would really like to give it a try, can you arrange it?.&quot; and with that you call Jade to arrange a dance for Tracy, not mentioning she is your sister.'
			);
			
			if (!isDay()) {
				addPopupLink(md, "go to bed for the night with Tracy", "Going to Bed with Tracy",
					'</p><img src="Images/People/Tracy/tracy11a.jpg" style="position:absolute;width:100%;bottom:0" alt="Tracy">' +
					'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">As you you lie with Tracy after your love making, she asks you a little nervously, "Why not spend the night..with me?". You cannot refuse your sister the way she is looking as she lies there next to you.',
					true, "WaitforForDayNight();gotoPlace(122,'type=breakfast');", false, undefined, "background-color:white;color:black;top:10%;left:5%;width:85%;height:80%;padding:0");
			}
			addLinkToPlace(md, "go to the kitchen", 45);
			addLinkToPlace(md, "go to your bedroom", 46);
			addLinkToPlace(md, "exit the house", 44);
			WritePlaceFooter(md);
			return true;
		}

		return false;
	};
	
	per.showEvent = function()
	{
		if (Place == 122) return this.showBedroomEvent();
		
		if (Place == 45 && this.checkFlag(6) && !this.checkFlag(9) && this.place == 1) {
			this.place = 122;
			startTimedEvent('TracyMorningAfterDavyEventDone()', 3);
		}
		
		var md, sibling;
		
		if (Place == 40) {
			// Shower scenes
			if (sType == "showertracy") {
				md = WritePlaceHeader();
				sibling = 'sis';
				if (perYou.isBornMale()) sibling = 'bro';

				if (this.isCharmedBy()) this.showPerson("tracy-shower1b.jpg");
				else this.showPerson("tracy-shower1a.jpg");
				addPlaceTitle(md, "Shower Interrupted By Tracy");
				md.write(
					'<p>After a few minutes you hear three knocks on the door, followed by your sister\'s voice.</p>' +
					'<p>“I\'m coming in, little ' + sibling + ', so turn around, or don\'t if youre feeling naughty.”</p>' +
					'<p>Tracy gives you some time to react, a precaution she has adapted after walking in on you with ' + (perYou.isMaleSex() ? 'your cock in your hand' : 'the shower head between your legs') + ' once, and enters the bathroom.</p>' +
					'<p>“Looking good.” She looks you over with a jokingly exaggerated motion and begins to take of her shirt. “I\'ll be up next, but take your time.”</p>' +
					'<p>Your sister has always enjoyed teasing you like this. You are far too used to it to be embarrassed by her antics and regardless of your feelings for her, you can at least appreciate the view.</p>'
				);
				startQuestions();
				addLinkToPlace(md, "finish up and get dressed", Place, 'type=showertracyfinish');
				if (this.isCharmedBy()) addLinkToPlace(md, "suggest using the shower together", Place, 'type=showertracyshare');
				if (this.getCharmedLevel() == 2) addLinkToPlace(md, 'pull her into the shower and Kiss her', 40, 'type=showertracykiss');
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showertracyfinish") {
				md = WritePlaceHeader();
				sibling = 'Sis';
				if (perYou.isBornMale()) sibling = 'Bro';

				if (this.isCharmedBy()) this.showPerson("tracy-shower2b.jpg");
				else this.showPerson("tracy-shower2a.jpg");
				addPlaceTitle(md, "Shower Interrupted By Tracy");
				md.write(
					'<p>“I\'ll hurry up, just try to keep your hands to yourself until I\'m done.”</p>' +
					'<p>“No promises.”</p>' +
					'<p>Tracy chuckles at your rebuttal and steps into the shower right after you are out. You make sure to quickly dress up, but inevitably catch a good look off her.</p>' +
					'<p>Not that she seems to mind.</p>'
				);
				startQuestions();
				addLinkToPlace(md, 'leave the bathroom', 45);
				WritePlaceFooter(md);
				return true;			
			}
			if (sType == "showertracyshare") {
				md = WritePlaceHeader();
				sibling = 'Sis';
				if (perYou.isBornMale()) sibling = 'Bro';

				if (perYou.isMaleSex()) this.showPerson("tracy-shower3m.jpg");
				else this.showPerson("tracy-shower3f.jpg");
				addPlaceTitle(md, "Sharing the Shower with Tracy");
				md.write(
					'<p>You start to make up some excuse about saving water, but Tracy just ignores it, steps into the shower while you talk and brightly smiles at you.</p>' +
					'<p>“Why not? Sounds like fun!”</p>' +
					'<p>She inevitably nestles her naked body against yours as you soap her back, and at one point even teasingly rubs her rear against your crotch, making fun of you when she feels you ' + (perYou.isMaleSex() ? 'getting hard' : 'tremble a little') + '.</p>' +
					'<p>Still, sexual teasing aside, It actually is a lot of fun. You are fooling around with each other, cracking jokes and laughing heartily the whole time. Tracy even helps you towel down afterwards, once again making sure to press her slender body against yours in an all too suggestive way.</p>'
				);
				if (this.getCharmedLevel() == 1) md.write('<p>It\'s not really a sexual experience per se, but you have to admit that at times like this you wonder if this is really all you want out of your relationship with her, and if it\'s even all that she wants, for that matter.</p>');
				else md.write('<p>It all ends with your sister giving you a kiss on the lips, thanking you for all the fun she is having of late and making you promise to later visit her in her room for an “encore”.</p>');
				startQuestions();
				addLinkToPlace(md, 'get out of the shower and get dressed', 40);
				WritePlaceFooter(md);
				return true;			
			}	
			if (sType == "showertracykiss") {
				md = WritePlaceHeader(false, perYou.isMaleSex() ? 'td-left-med' : '');
				sibling = 'sis';
				if (perYou.isBornMale()) sibling = 'bro';

				if (perYou.isMaleSex()) this.showPerson("tracy-shower4m.jpg");
				else this.showPerson("tracy-shower4f.jpg");
				addPlaceTitle(md, "Sharing the Shower with Tracy");
				md.write(
					'<p>You simply step out of the shower, pull Tracy under the stream of warm water and give her a long, drawn out kiss.</p>' +
					'<p>Everything melts together into a perfect moment: the feeling of your sister\'s naked skin pressed against yours, the sensation of warm water running over your shoulders... Every intention you had to actually clean up is immediately forgotten, and seconds later, you are nestling against Tracy\'s back and push her against the wall.</p>'
				);
				if (perYou.isMaleSex()) {
					md.write(
						'<p>“I\'ve had naughty fantasies of you doing this... you know?” Tracy coos playfully and impatiently rubs her body against you. “All the time.”</p>' +
						'<p>You\'re not sure if she is teasing you again or actually speaking the truth, but you also don\'t want to waste this moment by asking her. For now, you rather position yourself behind your sister and draw your already erected manhood over her folds.</p>' +
						'<p>“Come on ' + sibling + ' don\'t make me... ahhhh!”</p>' +
						'<p>Tracy releases a loud moan the moment you slide into her and hastily places her hand on her mouth to muffle it.</p>' +
						'<p>“Hmh! Hmmm...”</p>' +
						'<p>You wrap your harms around her and begin to rock your hips, keeping her pinned against the wall and your body nestled against hers, enjoying her tightness and warmth.</p>' +
						'<p>Of course, it turns out that shower sex is a lot harder than porn makes it look. You don\'t really have much of a foothold on the soapy floor and need to make sure to keep the water out of your eyes while your sister does her best to keep her lips shut and muffle her voice to not attract any attention, but you won\'t allow this to detract from living out a long held fantasy, and after some awkward tumbling and at one point almost falling over, you settle into a comfortable rhythm.</p>' +
						'<p>Tracy\'s climax comes fast, and your grip tightens the moment you feel her body tense up in your arms and her head rolling back to rest on your shoulder. Her muffled moans are drowned out by the sound of running water but still enough to push you over the edge as well, sharing your climax with her.</p>'
					);
				} else {
					md.write(
						'<p>You\'re not sure if she is teasing you again or actually speaking the truth, but you also don\'t want to waste this moment by asking her. For now, you rather wrap your arms around your sister, guide the shower-head right down to her folds and activate the massage setting.</p>' +
						'<p>Tracy releases a loud moan as the hard water-stream rushes over her clit and quickly places one hand on her mouth to muffle any further noises, which happens to be a good call.</p>' +
						'<p>She twitches and buckles in your grasp as you play with the intensity of the setting, change the trajectory of the stream and sometimes take it off to douse the rest of her body in a gust of warm water until you finally feel her tense up in your grasp, firmly press against your body, and climax in your arms with a series of cute muffled moans.</p>' +
						'<p>“Wow...”</p>' +
						'<p>It\'s all she gets out before you share another kiss with her, and after a moment of just enjoying the water together, Tracy\'s lips form a mischievous grin as she slips onto her knees and drives her thumbs over your folds...</p>' +
						'<p>It seems you\'ll be here for a while.</p>'
					);
				}
				startQuestions();
				addLinkToPlace(md, 'enjoy the rest of the shower and finish up', 40);
				WritePlaceFooter(md);
				return true;			
			}	
			return false;
		}
		
		if (Place == 269) {
			if (sType == "tracypool") {
				WaitHereOnly(6);
				md = WritePlaceHeader();
				this.showPerson(this.isCharmedBy("You") ? "tracy-poolc.jpg" : "tracy-poolu.jpg");
				addPlaceTitle(md, "Swimming with Tracy");
				md.write(
					'<p>Tracy arrives and changes into her swimsuit, but suggest you sit in the hot-tub area than the main pool.</p>' +
					'<p>You have a fun time relaxing in the hottub with your sister Tracy.</p>'
				);
				startQuestions();
				if (this.isCharmedBy("You") && this.getCharmedLevel() == 2) addLinkToPlaceC(md, 'it is fairly private here...', Place, 'type=tracypoolsex');
				addLinkToPlaceC(md, 'say goodbye to Tracy', Place);
				WritePlaceFooter(md);
				return true;
			}
			if (sType == "tracypoolsex" || sType == "tracypoolsexcharm") {
				md = WritePlaceHeader();
				this.showPerson("tracy-poolc-sex.jpg");
				if (sType == "tracypoolsexcharm") {
					addPlaceTitle(md, "More Than Swimming With Your Lover Tracy");
					md.write(
						'<p>You take Tracy into your arms and whisper that it is private here, and she understands your suggestion. She removes the rest of her bikini and you make love with your sister for the first time, a delicious taboo combined with some exhibitionism here in the hottub!</p>'
					);
				} else {
					addPlaceTitle(md, "More Than Swimming With Tracy");
					md.write(
						'<p>You mention to Tracy that it is quite private here, and she grins as she understands your suggestion. She removes the rest of her bikini ready to have a private \'chat\' as you have at home!</p>'
					);				
				}
				startQuestions();
				addLinkToPlaceC(md, 'later...say goodbye to Tracy', Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		
		if (Place == 46 && sType == "tracyevent2") {
			md = WritePlaceHeader();
			sibling = 'Sis';
			if (perYou.isBornMale()) sibling = 'Bro';

			this.showPerson("tracyevent2.jpg");
			addPlaceTitle(md, "Sleepover?");
			var plc = getQueryParam("plc");		// Where did you sleep, 46 on own, 170 with Tess
			md.write(
				'<p>Tracy is standing close to your cabinets and looks at you like a deer caught in headlights, awkwardly fiddling with her hands before finally speaking up.</p>' +
				'<p>"Hey little ' + sibling + ', I\'m sorry I woke you up." She stretches herself and presents her body to you invitingly and gives you a sweet smile over the shoulder.. "I\'ve really been having problems sleeping of late, and was wondering if you would mind if I crawl into your bed."</p>' +
				'<p>"It always helped when we were kids."</p>' +
				'<p>You are... surprised by her request, to say at least. The two of you have not shared a bed for a long time for obvious reasons, and while Tracy has pretty much enjoyed teasing you from the first day she realized ' + (perYou.isBornMale() ? 'boys found her attractive' : 'you are into girls') + ', there are lines she would usually not cross.</p>' +
				(plc == "170" ? 'You look to the side and see Tess stir a little, but it does seem like she\'s a heavy sleeper and not bothered by the conversation, and it\'s not like she would protest your decision anyway.' : '') + '</p>'
			);
			startQuestions();
			addOptionLinkC(md, "deny her request", "WaitforForDayNight('<p>You tell Tracy you are sorry, but this is not something you are comfortable with, and while she pulls a pouty lip, and for a moment seems to desperately try to find another reason to stay, she finally accepts your decision and leaves your room.</p>" +
				"<p>The whole encounter was... weird. There was something unsettling about the way Tracy acted, and after she left you decide to lock your door just to be sure, and feel it&rsquo;s a good idea to keep doing so the following nights.')"
			);
			addPopupLinkC(md, "invite her in", "Tracy joins you",
				'<img src="Images/People/Tracy/tracy11a.jpg" style="position:absolute;width:100%;bottom:0" alt="Tracy">' +
				'<p style="position:absolute;left:2%;top:2em;cursor:pointer;font-size:1.1em;width:66%">“Thank you little ' + sibling + '!” Tracy happily crawls into your bed and presses a soft kiss to your cheek before her warm body nestles against yours and her arms tenderly pull you into a hug.<br><br>' +
				'You wrap the two of you in your blanket, pull her closer and turn of the light, but it takes you a while to get back to sleep like this. Your sisters warm breath brushing against your neck is almost as distracting as the feel of her soft, bare skin against yours, but after a while, you finally drift off to sleep.',
				true, "WaitforForDayNight();gotoPlace(45,'type=tracyevent3');", false, undefined, "background-color:white;color:black;top:10%;left:5%;width:85%;height:80vh;padding:0"
			);
			WritePlaceFooter(md);
			return true;
		}
		if (Place == 45 && sType == "tracyevent3")
		{
			md = WritePlaceHeader();
			sibling = 'Sis';
			if (perYou.isBornMale()) sibling = 'Bro';

			this.showPersonRorX("tracyevent3.jpg");

			addPlaceTitle(md, "Something seems to be Missing");

			perYou.showPerson('charmedbydavy-enslaved.jpg', "30%");

			// Tracy Bad Ending End and Game Over
			md.write(
				'<p>The first thing you notice when you wake up is that Tracy is gone, but she has always been an early riser, so nothing is really out of the ordinary... until you realize that the book missing as well.</p>' +
				'<p>Panic begins to spread in your gut as you look around your room and find nothing. Tracy must have taken it while you slept... but why would she do that?</p>' +
				'<p>You don\'t bother dressing before you leave the room and quickly head towards the Kitchen in hopes of confronting your sister, and are instead greeted by Davy, who is standing in front of the kitchen table with the book spread out on it and your mother kneeing before him, enthusiastically sucking his cock.</p>' +
				'<p>Good morning, ' + perYou.getPersonName() + '!” He greets you with a cocky smile and your mother gags as he forces her head down to the base of his shaft.“You have a lovely family.”</p>' +
				'<p>You know you need to act fast, run, cast the charm, maybe charge him, but Tracy is suddenly behind you and holds you in place. You manage to shake her off quickly, but it is already too late...</p>' +
				'<p>“Dai Chu, ' + perYou.getPersonName() + '!” You have no chance to react and immediately feel a wave of warmth rushing though your body the moment he finished the phrase. Your ' + (perYou.isMaleSex() ? 'manhood hardens' : 'folds are getting wet') + ' as your body is flooded with new sensations, making it harder to think every passing second.</p>' +
				'<p>“Davy you... fucking...” You vision blurs and reality changes before your eyes, Davy suddenly doesn\'t seem to be that bad a person actually, in fact, he is quite handsome, why did you never...NO!</p>' +
				'<p>You try to force that thought out of your mind, it is not real, not yours, you know the spell is messing with your head!</p>' +
				'<p>“I have to thank you, ' + perYou.getPersonName() + '.” Davy speaks again, and his voice suddenly bears a deep, sensual timbre sending shivers down your spine. “Getting the book from the old man would have been much harder than this, so, ' + (perYou.isBornMale() ? 'while I usually prefer to take women, I will honor your effort by making an exception to properly reward you.' : 'once the spell has turned you into my little slaveslut, I will properly reward you.') + ' Undress!”</p>' +
				'<p>There is a force behind the command ushered, and while you do not want to take of your clothes, your hands betray you and tear off what little you are wearing.</p>' +
				'<p>“I will not be your slave...” The words were supposed to come out strong, defiant, and certainly not like the desperate whimper you actually managed to muster. Also, why would you want to be defiant? Davy has such commanding presence and wonderful voice... He is the perfect master and you don\'t really remember anymore to ever not have been attracted to him.</p>' +
				'<p>“But you are already, aren\'t you, lil ' + sibling + '?” Tracy coos happily from behind and Davy confirms it. “You are already a slave, ' + perYou.getPersonName() + '.” The words reecho within your head and every attempt to block them out is failing. “You are my slave. You will do whatever I want, ' + (perYou.isMaleSex() ? 'and only fuck whenever I want' : 'and I will fuck you whenever I want') + '.”</p>' +
				'<p>The words hammer into your mind and the sensation of it almost makes you climax. You feel your mind starting to spin, and as your vision clears, you finally notice the faint pink glow in your mothers and sisters eyes, a symbol of their bound with the most wonderful man you have ever known.</p>' +
				'<p>“Master...” You say happily, and as he beckons you closer, you eagerly follow up and knee next to your mother and sister in front of his perfect cock, ready to embrace a new, happy life of servitude.	</p>'
			);

			addRestartLink(md);
			WritePlaceFooter(md);
			return true;
		}

		// Breakfast (not strictly a Tracy event but a flag of hers is used
		if (Place == 45 && sType == "breakfast") {

			// Breakfast with people here
			// TODO: add Tanika, Anita and more variety
			md = WritePlaceHeader();
			setQueryParams('');
			passTime(false, true);
			var perMom = findPerson("Mom");
			perMom.setFlag(16);
			var perTess = findPerson("Tess");

			this.setFlag(1);
			var p = this;
			var img;
			if (perMom.place != 154) img = "sister";
			else if (this.place != 1) img = "mom";
			else img = Math.random() < 0.5 ? (perTess.place == 46 ? (Math.random() < 0.6 ? "sister" : "tess") : "sister") : (perTess.place == 46 ? (Math.random() < 0.6 ? "mom" : "tess") : "mom");
			if (img == "mom") {
				img = perMom.getArousal() > 0 ? "mom-breakfast2.jpg" : "mom-breakfast1.jpg";
				p = perMom;
			}
			else if (img == "tess") {
				img = Math.random() < 0.5 ? "tess-breakfast1.jpg" : "tess-breakfast2.jpg";
				p = perTess;
			}
			else img = this.isCharmedBy("You") ? "tracy-breakfast1.jpg" : "tracy-breakfast2.jpg";
			p.showPerson(img);
			var w = perMom.place != 154 ? "Tracy" : this.place != 1 ? "Mom" : "Mom and Tracy";
			if (perTess.place == 46 && perMom.place == 154 && this.place == 1) w = "Tess, " + w;
			else if (perTess.place == 46) w += " and Tess";

			addPlaceTitle(md, "Breakfast with your family");
			md.write('<p>Before you head out for the day you decide to have a quick breakfast with ' + w + ' ');
			switch(img) {
				case "mom-breakfast1.jpg":
					md.write('and you see Mom is wearing a floral pattern dress. During breakfast she spills something on it and mutters how she will have to change.</p>');
					break;
				case "mommom-breakfast2.jpg":
					md.write('and you see Mom has not yet dressed before breakfast, and is just wearing some underwear. When you comment she just smiles, and sits down to eat.</p>');
					break;
				case "tracy-breakfast1.jpg":
					md.write('and your sister dressed rather cutely in her rather skimpy nightie.</p>');
					break;
				case "tracy-breakfast2.jpg":
					md.write('and when the food is ready you have to go get your sister as she is still in the bathroom. She does not respond to a knock on the door so you open it, and she is doing her hair, completely naked!</p>');
					break;
				case "tess-breakfast1.jpg":
				case "tess-breakfast2.jpg":
					md.write('and when you go to get Tess you see she has just had a shower and thrown something on for breakfast. Your only thought is \'Wow\'</p>');
					break;
			}
			md.write('<p>After breakfast you say your goodbyes to ' + w + ' for the day.</p>');
			startQuestions();
			addLinkToPlace(md, 'tidy up after breakfast', 45, '');
			addLinkToPlace(md, 'leave your house', 44);

			WritePlaceFooter(md);
			return true;
		}

		if (sType === "" && Place == 45 && nFromPlace == 374 && !isDay() && this.isCharmedBy() && Math.random() < 0.15) setQueryParams('event=tracysnack');

		if (Place == 45 || Place == 269 || Place == 374) {

			sibling = 'Sis';
			if (perYou.isBornMale()) sibling = 'Bro';
			
			if (sType == "tracycharmhome1") {
				// Charm Tracy at Home 1
				md = WritePlaceHeader();

				this.showPersonDN("tracy2.jpg", "height:max");
				addPlaceTitle(md, "Tracy Under a Charm Spell");
				md.write(
					'<p>You cast the spell on your sister. Immediately Tracy falls under the influence of desire. Against her basic ' +
					'instinct she begins to have strong, erotic feelings towards you and very quickly starts becoming visibly aroused.</p>' +
					'<p>&quot;' + perYou.getPersonName() + '&quot; Tracy exclaims. &quot;I can\'t believe it but I\'m getting ' +
					'that feeling again, but this time it\'s not for Davy. It\'s for you. This isn\'t right! You are my little '
				);
				if (perYou.isBornMale()) md.write('brother');
				else md.write('sister and I\'m not a lesbian');
				md.write('. I have to stop!&quot;</p>');

				startQuestionsOnly();
				addLinkToPlaceC(md, "tell your sister not to worry", Place, 'type=tracycharmhome2');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "tracycharmhome2") {
				// Charm Tracy at Home 2
				md = WritePlaceHeader();
				this.showPersonDN("tracy3.jpg");
				addPlaceTitle(md, "Tracy Under a Desire Spell");
				md.write(
				  '<p>&quot;I have to <i>not</i> worry?&quot; asks Tracy, confused by the emotions and lust overwhelming her mind. ' +
				  '&quot;I shouldn\'t worry about anything, should I? Especially when ' +
				  'I feel so hot, so horny. You feel the same for me, don\'t you ' + perYou.getPersonName() + '? Please say that you love me.&quot;</p>'
				);

				startQuestionsOnly();
				addLinkToPlace(md, "reassure Tracy that you love her as her " + (perYou.isBornMale() ? 'brother' : 'sister'), Place, 'type=tracycharmhome3');
				addLinkToPlace(md, "<b>tell</b> Tracy that you love her as a " + perYou.getManWoman(), Place, 'type=tracycharmhome3incest');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "tracycharmhome3" || sType == "tracycharmhome3incest") {
				// Charm Tracy at Home 3
				md = WritePlaceHeader();
				sibling = perYou.isBornMale() ? 'brother' : 'sister';
				
				if (sType === "tracycharmhome3" && perYou.checkFlag(26)) {
					
					this.showPersonDN("tracy4a.jpg");
					addPlaceTitle(md, "Tracy Under a Desire Spell");
					setPersonFlag("Mom", 25);

					// No incest, she is your sister
					md.write(
						'<p>Your heart beats faster as you watch her strip. ' +
						'Tenderly, you reach for her shoulders, intending to give ' +
						'her the most meaningful hug of your lives but you ' +
						'remember she is your sister and back away.</p>' +
						'<p>&quot;No, Tracy!&quot; you order. &quot;We are not ' +
						'going to... Do not desire me! I mean, you don\'t want me like that ' +
						'anymore and everything is alright. Play with yourself and enjoy it&quot;</p>' +
						'<p>&quot;Whatever you say,&quot; replies your sister, ' +
						'absorbing the new orders like water into a sponge. ' +
						'&quot;I have such a considerate ' + sibling + '.&quot; ' +
						'Tracy no longer craves you and contentedly strokes herself.</p><p>A close call.</p>'
					);
					startQuestionsOnly();
					
				} else {
					// Lovers!
					this.showPersonDN("tracy4b.jpg");
					addPlaceTitle(md, "Tracy Under a Desire Spell");
					this.charmThem(2);
					
					if (sType === "tracycharmhome3") md.write('<p>You try to tell Tracy to calm down and not desire you, but you can see your words have no effect on her, your ability to control the spell and her are limited. You have no choice, you have to instead take her as your lover.</p>');
				
					md.write(
						'<p>Your heart beats faster as you watch her strip. Tenderly, you reach for her shoulders, intending to give ' +
						'her the most meaningful hug of your lives fully aware she is your sister but you no longer care.</p>' +
						'<p>&quot;Tracy, I love you&quot; you tell her and then you kiss her, no ' + sibling + 'ly kiss, but one as her lover!</p>' +
						'<p>&quot;Nothing matters aside from our love as a ' + perYou.getManWoman() + ' and a woman&quot;</p>' +
						'<p>&quot;I love you too&quot; replies your sister, absorbing the new orders like water into a sponge. ' +
						'&quot;I do not care that you are my ' + sibling + ', I love you.&quot;</p>'
					);
					startQuestionsOnly();
					addLinkToPlace(md, "take her to her bedroom", 122, 'type=charm');
				}

				// Common questions
				addLinkToPlace(md, "go to your bedroom", 46);
				addLinkToPlace(md, "exit the house", 44);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "tracycharmpool1") {
				// Charm Tracy at Home 1
				md = WritePlaceHeader();

				this.showPerson("tracy2-pool.jpg", "height:max");
				addPlaceTitle(md, "Tracy Under a Charm Spell At The Pool");
				md.write(
					'<p>As you watch your sister Tracy sitting there in the hottub, you decide it is time, and you cast the charm spell. Immediately Tracy falls under the influence of desire. Against her basic ' +
					'instinct she begins to have strong, erotic feelings towards you and very quickly starts becoming visibly aroused. She stands up in the hottub pulling at her bikini top amlost removing it.</p>' +
					'<p>"' + perYou.getPersonName() + '" Tracy exclaims. "I can\'t believe it but I\'m getting that feeling again, but this time it\'s not for Davy. It\'s for you. This isn\'t right! You are my little ' +
					(perYou.isBornMale() ? 'brother' : 'sister and I\'m not a lesbian') + '. I have to stop!"</p>' +
					'<p>Despite her words she removes her bikini top, sort of holding it in front of her but it also looks like she is pinching herself. As usual she is smiling.</p>'
				);

				startQuestionsOnly();
				addLinkToPlaceC(md, "tell your sister not to worry", Place, 'type=tracycharmpool2');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "tracycharmpool2") {
				// Charm Tracy at Pool 2
				md = WritePlaceHeader();
				this.showPerson("tracy3-pool.jpg");
				addPlaceTitle(md, "Tracy Under a Charm Spell At The Pool");
				md.write(
				  '<p>"I have to <i>not</i> worry?" asks Tracy, confused by the emotions and lust overwhelming her mind.</p>' +
				  '<p>"I shouldn\'t worry about anything, should I? Especially when I feel so hot, so horny. You feel the same for me, don\'t you ' + perYou.getPersonName() + '? Please say that you love me."</p>' +
				  '<p>She is standing here, her pert breasts exposted and trim figure clear in her small bikini, or what remains of it. She is your sister, your beloved sister, but...</p>'
				);

				startQuestionsOnly();
				addLinkToPlaceC(md, "reassure Tracy that you love her as her " + (perYou.isBornMale() ? 'brother' : 'sister'), Place, 'type=tracycharmpool3');
				addLinkToPlaceC(md, "<b>tell</b> Tracy that you love her as a " + perYou.getManWoman(), Place, 'type=tracycharmpool3incest');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "tracycharmpool3" || sType == "tracycharmpool3incest") {
				// Charm Tracy at Pool 3
				md = WritePlaceHeader();
				sibling = perYou.isBornMale() ? 'brother' : 'sister';
				
				if (sType === "tracycharmpool3" && perYou.checkFlag(26)) {
					
					this.showPerson("tracy4a-pool.jpg");
					addPlaceTitle(md, "Your Sister Tracy Under a Desire Spell At The Pool");
					setPersonFlag("Mom", 25);

					// No incest, she is your sister
					md.write(
						'<p>Your heart beats faster as you watch her strip further. Tenderly, you reach for her shoulders, intending to give ' +
						'her the most meaningful hug of your lives but you remember she is your sister and back away.</p>' +
						'<p>"No, Tracy!" you tell her. "We are not going to... Do not desire me! I mean, you don\'t want me like that ' +
						'anymore and everything is alright. Play with yourself and enjoy it"</p>' +
						'<p>"Whatever you say" replies your sister, absorbing the new orders like water into a sponge. ' +
						'&quot;I have such a considerate ' + sibling + '.&quot; ' +
						'Tracy no longer craves you and contentedly strokes herself.</p>' +
						'<p>A close call. It would be best is she returns home, away from you for now. Even if she is your sistter this has got you a little wound up and it is best she is not around to make it worse.</p>'
					);
					startQuestionsOnly();
					
				} else {
					// Lovers!
					this.showPerson("tracy4b-pool.jpg");
					addPlaceTitle(md, "Tracy Under a Desire Spell At The Pool");
					this.charmThem(2);
					
					if (sType === "tracycharmhome3") md.write('<p>You try to tell Tracy to calm down and not desire you, but you can see your words have no effect on her, your ability to control the spell and her are limited. You have no choice, you have to instead take her as your lover.</p>');
				
					md.write(
						'<p>Your heart beats faster as you watch her strip. Tenderly, you reach for her shoulders, intending to give ' +
						'her the most meaningful hug of your lives fully aware she is your sister but you no longer care.</p>' +
						'<p>"Tracy, I love you" you tell her and then you kiss her, no ' + sibling + 'ly kiss, but one as her lover!</p>' +
						'<p>"Nothing matters aside from our love as a ' + perYou.getManWoman() + ' and a woman"</p>' +
						'<p>"I love you too" replies your sister, absorbing the new orders like water into a sponge. ' +
						'"I do not care that you are my ' + sibling + ', I love you."</p>'
					);
					startQuestionsOnly();
					addLinkToPlace(md, "make love to your sister here", Place, 'type=tracypoolsex');
					addLinkToPlace(md, "go home with Tracy, to her bedroom", 122, 'type=charm');
				}

				// Common questions
				addLinkToPlace(md, "say goodbye to Tracy for now", 269);
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "recharm1") {
				// Re-charm Tracy
				clv = this.getCharmedLevel();
				if (clv != 1) this.charmThem(1);
				else this.charmThem(2);
				md = WritePlaceHeader();
				if (Place == 269) this.showPerson("tracy2-pool.jpg");
				else this.showPersonDN("tracy2.jpg");
				addPlaceTitle(md, "Tracy Under A Charm Spell - Again");
				md.write(
					'<p>Once again you cast the spell on your sister. Immediately Tracy falls under the influence of desire. Against her basic ' +
					'instinct she begins to have strong, erotic feelings towards you and very quickly starts becoming visibly aroused.</p>' +
					'<p>&quot;' + perYou.getPersonName() + '&quot; Tracy exclaims. &quot;I can\'t believe it but I\'m getting ' +
					'that feeling again, it\'s for you. This isn\'t right! You are my little '
				);
				if (perYou.isBornMale()) md.write('brother');
				else md.write('sister and I\'m not a lesbian');
				md.write('. I have to stop!&quot;</p>');

				startQuestionsOnly();
				if (clv != 1) addLinkToPlace(md, "reassure Tracy that you love her as her " + (perYou.isBornMale() ? 'brother' : 'sister'), Place, 'type=recharm2');
				if (clv != 2) addLinkToPlace(md, "<b>tell</b> Tracy that you love her as a " + perYou.getManWoman(), Place, 'type=recharm2');
				WritePlaceFooter(md);
				return true;
			}
			
			if (sType == "recharm2") {
				// Re-charm Tracy 2
				clv = this.getCharmedLevel();
				md = WritePlaceHeader();
				if (Place == 269) this.showPerson("tracy4a-pool.jpg");
				else this.showPersonDN("tracy4a.jpg");
				addPlaceTitle(md, "Tracy Under A Charm Spell - Again");
				sibling = perYou.isBornMale() ? 'brother' : 'sister';
				switch (this.getCharmedLevel()) {
					case 1:
						// Brother/Sister
						md.write(
							'<p>Your heart beats faster as you watch her strip. ' +
							'Tenderly, you reach for her shoulders, intending to give ' +
							'her the most meaningful hug of your lives but you ' +
							'remember she is your sister and back away.</p>' +
							'<p>&quot;No, Tracy!&quot; you order. &quot;We are not ' +
							'going to... Do not desire me! I mean, you don\'t want me like that ' +
							'anymore and everything is alright. Play with yourself and enjoy it&quot;</p>' +
							'<p>&quot;Whatever you say,&quot; replies your sister, ' +
							'absorbing the new orders like water into a sponge. ' +
							'&quot;I have such a considerate ' + sibling + '.&quot; ' +
							'Tracy no longer craves you and contentedly strokes herself.</p><p>A close call.</p>'
						);
						break;
					case 2:
						// Lover
						md.write(
							'<p>Your heart beats faster as you watch her strip. Tenderly, you reach for her shoulders, intending to give ' +
							'her the most meaningful hug of your lives fully aware she is your sister but you no longer care.</p>' +
							'<p>&quot;Tracy, I love you&quot; you tell her and then you kiss her, no ' + sibling + 'ly kiss, but one as her lover!</p>' +
							'<p>&quot;Nothing matters aside from our love as a ' + perYou.getManWoman() + ' and a woman&quot;</p>' +
							'<p>&quot;I love you too&quot; replies your sister, absorbing the new orders like water into a sponge. ' +
							'&quot;I do not care that you are my ' + sibling + ', I love you.&quot;</p>'
						);						
						break;
				}
				startQuestionsOnly();
				if (Place == 269) addLinkToPlaceC(md, "go home with Tracy", 45);
				else addLinkToPlaceC(md, "talk more to her", Place);
				WritePlaceFooter(md);
				return true;
			}
		}
		return false;
	};
	
	per.showDancing = function()
	{
		var img;
		if (!this.checkFlag(12)) img = this.showPersonString("poledanceb.mp4");
		else img = this.showPersonString("poledancea.jpg");
		var md = WritePlaceHeader(false, img.indexOf("poledanceb") != -1 ? 'td-left-med' : '');
		md.write(img);
		addPlaceTitle(md, "Tracy\'s Dance");
		md.write('<p>You wait eagerly for Tracy, she was quite eager to try dancing her and you are equally eager to see her!</p>');

		if (img.indexOf("poledanceb") != -1) {
			md.write(
				'<p>Tracy steps out in lingerie and does a very erotic dance, not really a strip-tease as she largely keeps the lingerie on. You notice one of the audience members filming her dance and she seems to be equally dancing for you and the camera.</p>' +
				'<p>After she whispers to the camera man and then joins you. You ask about the camera, and she grims "I got a friend to record it for us..later at home"</p>'
			);			
		} else {
			md.write(
				'<p>You you see Tracy is wearing a sort of bunny-girl costume, not quite a playboy bunny and certainly not the Easter Bunny. She does an erotic dance, not really a strip-tease, she keeps the lingerie mostly on for the dance.</p>' +
				'<p>After she joins you for a little while and then whispers to you, "You know what rabbits are good at...see you at home", and she leaves.</p>'
			);
		}

		startQuestions();
		addLinkToPlaceC(md, 'enjoy the club after her dance', Place);
		WritePlaceFooter(md);	
		this.setFlag(12);
	};
	
	per.showPersonChat = function(bGeneral, md)
	{
		if (Place == 45) {
			if (sType === "" && this.checkFlag(6) && !this.checkFlag(9) && this.place == 122) addLinkToPlaceC(md, 'listen in on your sister\'s conversation', 122, 'type=listendavy1');
			else {
				if (this.place == 1 && !this.isHere()) {
					if (this.isCharmedBy()) addLinkToPlace(md, "go to Tracy\'s bedroom", 122, '', '', '', "Leave45()");
					else addLinkToPlace(md, "go to Tracy\'s bedroom", Place, '', 'Tracy usually has her bedroom door locked, and it is still...');
				}
			}
		}

		if (this.place != 1) return; // TRACY is not @ HOME

		if (this.other > 3 && this.other < 8 && this.isCharmed() && !this.isCharmedBy() && Place == 45) {
			// Is Tracy in the Laundry??
			addLinkToPlace(md, 'go to the laundry', 156, '', '', '', "Leave45()");
			return;
		}
		if ((Place == 45 || Place == 374) && this.isHere() && sType === "") {
			if (this.other == 1) addQuestionC(md, '"Hey Tracy, do you know where Davy is?"', "Tracy", 8901);
			else if (this.other == 2) addQuestionC(md, '"Is anything is going on, Tracy?"', "Tracy", 8902);

			if (this.isCharmedBy("Davy") && getPersonOther("Tina") >= 4) {
				// Can Tina Robbins De-Charm ppl?
				if (per.place != -1) addQuestionC(md, '"Hey Tracy, Davy said he wanted you to meet him at his house."', "Tracy", 8906);
			}
			if (getBeasleyServant() == 8) addQuestionC(md, '"Can you help me find the meaning of <i>Dai Chu</i>?"', "Tracy", 1408);
			else if (getBeasleyServant() == 31) addQuestionC(md, '"Did Mr. Beasley say anything about mana when you spoke with him?"', "Tracy", 1431);
			if (this.isCharmedBy("You") && this.getCharmedLevel() == 2) {
				// Tracy is charmed by you
				addLinkToPlaceC(md, "'talk' to Tracy in her bedroom", 122, 'type=tracysex', '', '', "Leave45()");
			}
			if (checkPersonFlag("Gabby", 16)) {
				if (!this.checkFlag(11)) {
					if (!isMurderPath()) {
						addQuestionR(md, '"Did you know that Mom and Gabby were together?"',
							'“She never told me, but I had my suspicions. They make a cute couple though, do they? Mom really deserves to be with someone after the debacle with Dad...”</p>' +
							'<p>“Oh, I wonder which one of them is on top. That seems like a point of contention with their personalities.”',
							"Tracy",
							"setPersonFlag(\\'Tracy\\',11)"
						);
					} else {
						addQuestionR(md, '"What do you think about Gabby being here?"',
							'"She\'s been a lot more easy to get along with of late, and Mom deserves to have someone to be with after the debacle with Dad.”</p>' +
							'<p>“But it\'s curious how Gabby occasionally slips and calls her Mistress, I have always pegged her as more of a dominant type.”',
							"Tracy",
							"setPersonFlag(\\'Tracy\\',11)"
						);
					}
				}
			}
		}
	};
	
	per.showPersonTextHere = function(md)
	{
		// Robbins House
		if (Place == 176 && this.isHere()) {
			// Is Tracy in the room?
			md.write('<p>Tracy asks where Davy is. She evidently couldn\'t find him anywhere in the house.</p>');
		}
		
		// Home
		if (Place == 45 && this.place == 122 && this.checkFlag(6) && !this.checkFlag(9)) md.write('<p>You hear Tracy\'s voice from her bedroom, it sounds like she is talking to someone.</p>');

		if (this.place != 1) return; // TRACY is not @ HOME
		
		var sibling;

		if (this.whereNow() == Place && (Place == 45 || Place == 374)) {
			// Kitchen/Lounge
			if (this.getCharmedLevel() > 0 && this.isCharmedBy("You")) {
				// Sister is CHARMED
				sibling = 'Sis';
				if (perYou.isBornMale()) sibling = 'Bro';
				if (getQueryParam("event") === "tracysnack") md.write('<p>Tracy follows you into the kitchen to get some ice cream from the fridge, and asks you "Hey ' +sibling + ' want some?". The way she poses herself you know she does not mean ice cream.</p>');
				else if (isInvisible()) md.write('<p>Your sister is happily doing some cleaning in the kitchen, probably from a snack she made for herself.</p>');
				else if (this.getCharmedLevel() == 2) md.write('<p>Your sister and lover is happy to see you. No longer inhibited, she walks around the house without clothes.</p>');
				else md.write('<p>Your sister is pleased to see you. No longer inhibited, she walks around the house without clothes.<br><br>\"Hi ' + perYou.getPersonName() + '. You would not believe how much fun I have been having since you told me how to enjoy myself. Here\'s to you my beautiful sibling.\"<br><br>You smile at your sister and wonder whether you should take her like the rest of your harem. You choose not to do it yet. There are more important things to attend to.</p>');
			}	else {
				//  Sister is NOT CHARMED
				if (getBeasleyServant() == 31) md.write('<p>You know that Tracy spoke to Mr. Beasley but you don\'t care. You have to get the book back and find out about magic.</p>');
				else if (!this.isCharmedBy("Davy")) {
					// Freed from Davy's control
					if (!this.checkFlag(2)) {
						this.setFlag(2);
						setPersonFlag("Mom", 25);
						showPopupWindow("Tracy Freed",
							this.addPersonString(isDay() ? "tracy1c.jpg" : "tracy1a-night.jpg", "height:max%", "right") +
							'Tracy greets you. "Oh thank god you are here," she says. "I can\'t believe what I have been through. I have such terrible memories of serving that loathsome boy Davy Robbins. He did all sorts of disgusting things to me."<br><br>' +
							'You study your sister. The spell seems to have been completely lifted from her.<br><br>' +
							'Tracy continues "Look, I feel dirty, let me get a quick shower, when I get out let me make you a treat to thank you again." and she leaves to go to the bathroom.<br><br>' +
							'a little time passes....',
							"gotoPlace(45, 'type=snack1')"
						);
					} else md.write('<p>Tracy greets you, she is happy to see you, she is grateful for you freeing her, but she will not talk any more about her experiences with Davy Robbins.</p>');
				} else if (this.other > 0 && this.other < 4)	{
					md.write('<p>Your sister Tracy\'s busy here. She\'s the older sibling by two years, which has led to some disputes in the past. Still, she keeps herself on the big-sister high ground.</p>');
				}
			}

		} else if (Place == 45 && this.whereNow() == 374) {
			// Tracy in the kounge room
			 md.write('<p>You can see Tracy is in the living room watching TV.</p>');
		}

		if (Place == 45 || this.isHere()) {
			sibling = 'Sis';
			if (perYou.isBornMale()) sibling = 'Bro';
			
			if (Place == 154) {
				// Tracy in the Laundry
				md.write('<p>Tracy is singing in the laundry.</p>');
			}
			var perMadison = findPerson("Madison");
			if (perJesse.getDemonPath() == 60 && perJesse.place != 6) {
				//Demon Encounter Primed but not HERE yet
				md.write('<p>"Hey ' + sibling + '," She says in your general direction.  "Mom wanted to see you about something."</p>');
			}
			
			if (perMadison.checkFlag(1) && nFromPlace != 46 && !perMadison.checkFlag(2) && !perMadison.checkFlag(3)) {
				md.write('<p>"Hey ' + sibling + '," she calls, "You had a delivery, some prize from a contest, the delivery-girl put it in your room"</p>');
				perMadison.setFlag(2);
			}
			if (perMadison.checkFlag(1) && nFromPlace != 46 && !perMadison.checkFlag(2) && !perMadison.checkFlag(3)) perMadison.setFlag(3);

			if (wherePerson("Miku") == 408 && !this.checkFlag(10)) {
				//Miku arrived
				md.write('<p>"Hey ' + sibling + ', a cute girl from our school showed up and said you\'ll want to meet her. She\'s been pretty insistent, so mom let her stay in the attic guestroom and wait for you."</p>');
				this.setFlag(10);
			}
		}

	};
	
	per.handleItem = function(no, cmd)
	{
		// Casting the charm spell
		if (no == 14 && cmd == 2) {

			if ((Place == 45 || Place == 374) && this.isHere()) {
				// The Kitchen/Lounge room
				if (!this.isCharmedBy("Davy")) {
					// If NOT UNDER Davy's Charm Spell (can be yours...)
					CastCharmSpell("Tracy", Place, 1, 'type=tracycharmhome1', '', 'type=recharm1');
				} else addComments('You attempt to cast the spell, but if fails to take effect... Evidently your sister is already under the effects of a charm spell...  Someone <i>else\'s</i> spell.');
				return "handled";
			}
			if (Place == 156) {
				//Tracy in the Laundry
				addComments('You attempt to cast the spell, but if fails to take effect... Evidently Tracy is already under the effects of a charm spell...  Someone <i>else\'s</i> spell.');
				return "handled";
			}
			if (sType == "tracypool") {
				// The Kitchen/Lounge room
				if (!this.isCharmedBy("Davy")) {
					// If NOT UNDER Davy's Charm Spell (can be yours...)
					CastCharmSpell("Tracy", Place, 1, 'type=tracycharmpool1', '', 'type=recharm1');
				} else addComments('You attempt to cast the spell, but if fails to take effect... Evidently your sister is already under the effects of a charm spell...  Someone <i>else\'s</i> spell.');
				return "handled";
			}
		}

		return "";		// do nothing
	};
	

	per.isPhoneable = function() {
		// Can you call them?
		return checkPlaceFlag("Hotel", 11) && Place == 269;
	};

	per.callThem = function() {
		if (Place == 269) {
			if (isCharmedBy("Davy")) WriteComments("You call Tracy to invite her to join you at the pool for a swim, but she says she is busy, maybe another time.");
			else {
				gotoPlace(Place, 'type=tracypool');
				receiveCall('', 'You call Tracy to invite her to join you at the pool for a swim, and she immediately answers, "Sure, Little ' + this.getYourNameFor() + ', love to, see you in a bit!"');
				WriteCommentsFooter(bChat, bChatLeft);
			}
		}
	};
	
	per.addPersonPhoneCall = function() {
		if (this.place == 1 && this.checkFlag(3)) {
			// SMS 1, few hours after first 'meeting' her
			if (makeCall(true, 20)) this.setFlag(3, false);
		} else if (this.place == 1 && this.checkFlag(5)) {
			// SMS 2, few hours after charming Sister Desiree
			if (makeCall(true, 21)) this.setFlag(5, false);
		}
		return false;
	};
	per.getPersonSMS = function(id) {
		if (id == 20) {
			return receiveSMS('Tracy', 'Hey Lea, just about to shower, hope nobody is peeking. How was your last date?', 'tracysms1-day.jpg') +
				receiveSMS('Tracy', 'Naughty little ' + this.getYourNameFor() + ' I sent this to the wrong number, lol, have fun');
		}
		if (id == 21) return receiveSMS('Tracy', 'Hey little ' + this.getYourNameFor() + ' I heard you visited the Church recently. Like this old Halloween costume of mine?', 'tracysms3.jpg');
		if (id == 23) return receiveSMS('Tracy', 'Hi! Did you mail-order anything? A package just came in for you. I\'ve put it in your room, but there\'s no sender and the delivery girl couldn\'t tell me who it\'s from, either.' + (isCharmedBy("Madison") ? 'Btw. She asked me to tell you to call her with that longing, desperate look in her eyes. Just how many girlfriends do you have?' : ''));
		return '';
	};
}