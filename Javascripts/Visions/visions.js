/*
Object for events, keys
available- a function returning true/false to select if the event is available to be seen (optional)
eg
	available: function() { return isSpellKnown("Charm"); },
image		- an image in Images/Visions or Images/Visions/Explicit to be shown on the left
width		- width of the image, '', 'med', 'large' (optional, defaults to td-left standard col)
title		- Title fo the event page
text		- html encoded text, NOTE / must be encoded as \/
button	- label for the button show for the event (optional)
event		- a child object, identical structure that will be shown when the button is clicked (flag/available are ignored)
nostart	- if true then no standard text is shown before the 'text' field above (optional)
noend		- if true then no standard text is shown after the 'text' field above (optional)
nomore	- if true then no more bisions after this (optional)
*/
var oVisions = {
"plot": [
	{
		id: 1,
		image: "drain.jpg",
		title: "A Key Vision",
		text: "Your vision is centered on a gutter with water running down it. Something drops into the water and is swept down into the drain. A voice curses and says,<br>" +
				'"How the hell do I get that? Maybe I can get something at the shops, which way are they...ok back to Kollam..."'
	},
	{
		id: 2,
		image: "rocks.jpg",
		title: "A Key Vision",
		text: "You are looking down a large fissure in some rocks and there is a glint of something metallic at the bottom. You hear a yourn woman,<br>" +
				'"Nuts! Where did it go...I have gotta get back to work, I\'ll come back later to search"'
	},
	{
		id: 3,
		image: "Images/People/Elian/Succubus/demon1a.jpg",
		title: "A Demonic Vision",
		text: "The vision is of darkness, but slowly a light illuminates a person, a woman with goat-like horns. You can almost feel the heat, both from your sudden and intense arousal and from where she is. The walls start to subtly glow with the heat.</p>" +
				"<p>She looks directly at you and gestures for you to follow. She walks towards a brighter area...",
		button: "the vision follows her...",
		event : {
			id: 4,
			image: "Images/People/Elian/Succubus/demon1c.jpg",
			title: "Demonic Promise",
			noend: true,
			nomore: true,
			button: "your vision clears, but you can still hear her voice echoing...",
			text: "The woman...well...there is little reason to deny it now...the demon...sits on a chair gesturing with a claw-like hand. She says,<p>" +
					'<p>"Come to me", and you immediately orgasm intensely. She softly laughs and beckons for you to come to her. You feel your arousal growing again, and a sense of fear of who and what you are viewing and lusting after.</p>' +
					"<p>Abruptly the vision ends and you are returned back to your senses, the arousal and fear remain. You wonder if you will see the demon again, and feel sure you will, at least in your <b>dreams</b>"
		}
	},
	{
		id: 5,
		image: "Images/People/Mom/mom28.jpg",
		title: "It\'s Mom",
		width: "med",
		nostart: true,
		text: "The picture in the water begins to take shape, It's a garden, probably behind a large house and completely walled off from the neighbors.</p>" +
				"<p>Slowly, the image clears up, and you see a naked woman sunbathing, older, but very much in shape and...</p><br>" +
				"<p>She looks like she is enjoying herself, calmly smearing sunscreen on her body and not paying much attention to anything around her until Gabby's voice calls out from the house, ordering her over.</p>" +
				"<p>“Yes, Mistress, I will move back inside.”</p>" +
				"<p>Her expression goes from serene to blank the moment Gabby had finished speaking, and as Mom rises to her feet, her motions are almost robotic.</p>" +
				"<p>She moves towards an area you can't see, and the vision blurs into a new scene.</p>",
		event : {
			id: 6,
			image: "Images/People/Gabby/gabby-mom2.jpg",
			title: "Mom",
			nostart: true,
			noend: true,
			nomore: true,
			button: "your vision clears, but you can still hear her voice echoing...",
			text: "It's a bedroom, again not a place you have seen before, and feint moans are getting louder as the image takes shape until you see Gabby, legs spread and straddling Mom, who is eagerly lapping at her assistants folds.</p>" +
					'<p>“Hmmmmyes... you love to lick pussy, right Alex?”</p>' +
					'<p>“Yes... love to... lick pussy...” Mom\'s eyes are glassy, she barely stops licking in order to speak but is otherwise completely focused on her task.</p>' +
					'<p>“And you love being mind... ohhh... mindless.”</p>' +
					'<p>“Love... being mindless.”</p>' +
					'<p>“A slave.”</p>' +
					'<p>“A slave.”</p>' +
					'<p>“A toy.”</p>' +
					'<p>“A toy.”</p>' +
					'<p>“You love to make your mistress cum.”</p>' +
					'<p>“Love... make mistress... cum.”</p>' +
					'<p>“You will always obey her.”</p>' +
					'<p>“Always... obey... Mistress.”</p>' +
					'<p>“You will alw... ohhh that is a good spot... keep going!”</p>' +
					'<p>“Yes mistress!”</p>' +
					'<p>Gabby head rolls back with a long, blissful moan and the image fades out, your startled reflection showing up on the water.'
		}
	},
	{
		id: 7,
		image: "Images/People/Jesse/vision1.jpg",
		title: "Legion",
		text: "The vision is very clear and you see an indistinct woman dominating another, face sitting is it, but she is standing. There is no doubt in your mind the dominant woman is <b>Legion</b>, somehow it is absolutely certain!</p>" +
				"<p>You see the kneeling woman's eyes are blank as she struggles to pleasure Legion's pussy, and as the vision starts to fade you hear Legion say,</p>" +
				'<p>"Enjoying watching my thrall as I am enjoying her struggles?" and the vision instantly ends',
		button: "the vision is over",
		noend: true,
		nomore: true
	}
],
"light": [
	{
		image: "bimbo1a.jpg",
		title: "A Vision of a Blonde Goddess",
		text: "You are watching a blonde woman slowly walking down some stairs. She is completely naked, and very curvy. Her breasts do not jiggle, they seem to be masterpieces of the plastic surgeons art. While you are reluctant to use the word 'bimbo' it is still a term that comes to mind...</p>" +
				"<p>As you think this, she looks at you and you start a little guiltily, did she hear you in some way. You realise it seems you are looking through someone elses eyes, and maybe they said something. She beckons to you and sexily walks away...",
		button: "the vision shifts",
		event : {
			image: "bimbo1b.jpg",
			title: "More of the Blonde Vision",
			text: "Your vision shifts and your see the blonde woman standing somewhere, probably on a balcony overlooking the sea. She seems to have sort of dressed, well she has some very high boots or maybe latex-like leggings. Neither would surprise you, this is certainly a sexually charged encounter.</p>" +
					"<p>She looks at you but says nothing, her slim but exaggerated busty figure emphasised against the sea and sky. You hear the person you are seeing through, or is it that you think it yourself...</p>" +
					'<p>"A gorgeous cock ornament, a perfect fuck-toy"'
		},
	},
	{
		image: "bimbo1c.jpg",
		title: "Vision in a Bikini",
		text: "A woman is before you, clad <i>mostly</i> in a bikini, with large probably enhanced breasts. You are not quite sure her nationality but is crosses your mind that she demonstrates the word \'bimbo\' does not need to refer to a blonde."
	},
	{
		image: "bimbo1d.jpg",
		title: "Mirrored Bikini",
		text: "The woman before you is admiring herself in a mirror, posing and pouting, the epitome of the word 'bimbo'. She is proud of her appearance and has clearly invested a lot of time and money to perfect it.</p>" +
				"<p>She would clearly take being called a bimbo as a compliment, possibly she is not an air-head, possibly she is, that does not matter, she is what she wants to be and whar she wants others to desire!"
	},
	{
		image: "bimbo1e.jpg",
		width: "large",
		title: "Diversity",
		text: "You see a group of women of different ethnicities, but all naked and with gorgeous bodies. You are grateful that the vision has given you this vision of beauty"
	},
	{
		available: function() { return isDemonFreed(); },
		image: "demon1b.jpg",
		title: "Chained Heat",
		text:	"You see a woman dressed oddly, is it fancy dress? She is almost naked with a chain stretched between her legs. You see her moving it back and forth, sliding it along the folds of her groin. She is smiling as she enjoys the sensation, then she bites her lip as her body gently shudders in a mild orgasm.</p>" +
				"<p>She looks directly at you and you smell the strong odour of sulphur. She looks you up and down appraisingly and licks her lips as she resumes moving the chain and closes her eyes again..."
	},
	{
		available: function() { return perYou.checkFlag(23); },
		image: "ghost1a.gif",
		title: "Ghostly Vision",
		text:	"You see a woman lying in bed masturbating herself, with an aparition floating about her. A ghostly presence, male from the member you can see erect and pointing at her.</p>" +
				"<p>Until recently you would have dismissed this as somehow the spell is showing the woman's fantasy, but you know ghosts are real. Is the ghost attracted to her arousal, or is it creating her arousal?"
	},
	{
		available: function() { return perYou.checkFlag(23); },
		image: "ghost1b.jpg,ghost1c.jpg",
		title: "Ghostly Vision",
		width: "large",
		text:	"What on earth...a woman being fucked by a ghost? Or possibly a person or other being partly invisible. For what you see she may be asleep or at least in an altered state like a hypnotic trance, then again maybe she is also finding it hard to believe what is happening. Then again from her cries and the flush on her skin she seems to be really enjoying what is happening.</p>" +
				"<p>Until recently you would have dismissed this as somehow the spell is showing the woman's fantasy, but you know ghosts are real."
	},
	{
		available: function() { return perYou.checkFlag(23); },
		image: "ghost1d.jpg",
		title: "A Spirited Vision",
		text:	"You see a woman lying..somewhere..masturbating herself, but you see a whisp of something approaching her, smoke or mist. The vapour forms into an approximately human shape, probably female. The shape, the spirit envelopes the woman and seems to be breathed in by her in a climactic shuddering of her body. Was this some sort of possession, or a ritual of communions with spirits? You just cannot tell from what you are seeing.</p>" +
				"<p>Until recently you would have dismissed this as somehow the spell is showing the woman's fantasy, but you know ghosts are real. Was this spirit attracted to her arousal, or was this a ritual of summoning?"
	},
	{
		image: "family1a.jpg,family1b.jpg,family1c.jpg,family1d.jpg,family1e.jpg",
		title: "Family",
		text:	"Your vision is of two naked women, and you have a complete certainty that they are mother and daughter. This certainty must be from the spell, but they do have a familiar likeness, and are very pretty!</p>" +
				"<p>You feel they are inviting you to join them in a taboo threesome, a very tempting propostion. What is this spell trying to do, tempt you into paths that you may otherwise avoid?"
	},
	{
		image: "futa1a.jpg",
		width: "med",
		title: "A Woman with a Cock",
		text:	"You see a woman of african ethnicity standing over a large breasted woman. The very notable thing is the standing woman has a cock! You are not sure if she also has a pussy or is a shemale, but you are fairly certain she has both.</p>" +
				"<p>While it seems the demons can do these sort of physical changes, there must be some others out there like this as well"
	},
	{
		image: "lesbian1a.jpg",
		title: "Lesbians Playing",
		text: "You see two lovely women having sex, one licking the other with some skill and enthusiasm. Lesbians enjoying each others bodies, a beautiful sight to behold."
	},
	{
		image: "lesbian1b.jpg,lesbian1c.jpg,lesbian1d.jpg",
		width: "med",
		title: "Lesbians Playing",
		text: "The three ladies before you are enjoying each other, mutually licking each other in a postion called a daisy-chain, a position you have always liked the idea of, if not from real-life. A lovely and passionate sight to behold!."
	},
	{
		image: "futa1b.jpg,futa1c.jpg",
		width: "med",
		title: "A Woman with a Cock",
		text:	"You see a naked woman, and she very obviously is different, she has a cock! You are not sure if she also has a pussy or is a shemale, but you are fairly certain she has both.</p>" +
				"<p>While it seems the demons can do these sort of physical changes, there must be some others out there like this as well"
	},
	{
		available: function() { return isPlaceKnown("Church"); },
		image: "nun1a.jpg",
		title: "A Nun",
		text:	"You see a nun, somewhere in a church and she appears to be changing her habit, you would have thought she would be doing this in her room not in the church itself. It then crosses your mind that the way she is looking that this is more a seductive strip-tease than a simple change of clothing.</p>" +
				"<p>Then she confirms your thoughts as she speaks to someone, \"Every bride of Christ has to have their wedding-night...\". As your vision starts to fade you have to wonder who she was talking to and how much you would like it to be yourself..."
	},
	{
		available: function() { return isPlaceKnown("Church"); },
		image: "nun1b.jpg",
		title: "Two Nuns Bathing",
		text:	"Your vision shows two young nuns, well you assume they are due to their elaborate hat, or is it head-dress? They are not otherwise wearing anything but a pile of clothing nearby looks like some habits but it is hard to see, your attention of firmly on the young and beautiful naked women.</p>" +
				"<p>To your disappointment they just seem to be just bathing, nothing naughtier...maybe another time...",
		event : {
			image: "nun1e.jpg",
			title: "Two Nuns",
			text: "It seems it a little later and the two nuns have finished bathing, and they are sitting somewhere nearby on the grass. Things seem a bit less innocent, they way they are sitting and holding each other. Then again it may just be your dirty mind, they do nothing clearly sexual but they are very friendly..."
		}
	},
	{
		available: function() { return isPlaceKnown("Church"); },
		image: "nun1c.jpg",
		width: "large",
		title: "A Lost Nun",
		text:	"Your vision is almost surreal, a dark and misty forest, with a almost naked Nun walking through it. How could she of ended up here without her habit in what appears a wild forest, unlikely to be near her church.</p>" +
				"<p>As she is walking you can hear ominous noises and she is looking around anxiously. The vision starts to fade as you notice her nipples stiffen...",
		event : {
			image: "nun1d.jpg",
			width: "large",
			title: "A Nun Lost in Desire",
			text: "Things come more sharply into view and you see the same nun furiously masturbating, muttering, \"No, not there...\" and it is now clear that the previous vision was seeing her fantasy, her day-dream of desire.</p>" +
					"<p>She cries out \"No, not there!\" as she orgasms and immediately your vision fades..."
		}
	},
	{
		image: "other1.jpg",
		title: "Maid",
		text:	"You see before you a woman, a maid, she is large breasted, full lipped and dressed in a stylised uniform. Is she some kind of exotic performer, a person playing dress-up for their lover, or is there actually a place with maids like this? If there is such a place you would very much like to visit it, or create such a place for yourself."
	},
	{
		image: "pregnant1a.jpg,pregnant1c.jpg",
		title: "Pregnant Vision",
		text: "The two women you see are both heavily pregnant and posing for someone, looking directly at you it seems. You wonder, are they friends coincidentally pregnant at the same time, or do they share a lover and are both pregnant to the same lucky person. They even look similar enough that it crosses your mind they may be sisters, but that is probably more a fantasy than reality, a very pleasant fantasy"
	},
	{
		image: "pregnant1b.jpg",
		title: "Pregnant Vision",
		text: "The woman you see is outside somewhere, naked and heavily pregnant and she seems completely comfortable with that. You feel she is a nudist who loves living without clothing and who enjoys being pregnant and showing off her lovely body and swollen belly. You have to admit to enjoying the view..."
	},
	{
		image: "sex1a.jpg",
		width: "med",
		title: "A coupling",
		text:	"The vision isquite straight-forward, a cute redish haired woman being fucked by a man. It is hard to see any context, the area is very white, you can only really see the couple and little else.."
	},
	{
		image: "sex1b.gif,sex1c.gif",
		width: "med",
		title: "Fucking",
		text:	"You see a couple passionately fucking, your hear nothing but sounds of their passion. There is nothing to indicate who, where or why, just a simple vision of sex!"
	},
	{
		image: "sex1d.jpg,sex1e.jpg",
		width: "med",
		title: "Symmetrical Docking ",
		text:	"Three people, a man and two women together and the man has just cum over the women\'s breasts as they were standing preseed together. One of the women start to lick the cum off the other womans breasts..."
	},
	{
		available: function() { return getPersonOther("Vampyre") >= 60; },
		image: "vampire1b.jpg",
		title: "Vampyre",
		text:	"Another vampyre! You see clearly another female vampyre, very sexy but that seems to be a way they seduce and feed on their prey...though a lot of said prey may not object...if they live through the feeding."
	},
	{
		available: function() { return getPersonOther("Vampyre") >= 60; },
		image: "vampire1d.jpg",
		title: "Vampyre",
		text:	"A vampyre but she is posed in such a way you wonder if she is a normal person modeling as a vampire for a movie or other photoshoot. You find this a lot less appealing now you know vampyes are real!"
	},
	{
		available: function() { return getPersonOther("Vampyre") >= 60; },
		image: "vampire1c.jpg",
		title: "A Bloody Vampyre",
		button: "she speaks...",
		text:	"Your vision is distorted,  you cannot make out anything other than the person before you. She is a vampyre, you have no doubt, just like you know the blood running down her body is someone elses, that of her last prey.</p>" +
				"<p>She is completely naked, holding a goblet of blood, you would almost say a cliche pose, except that she <b>is</b> a vampyre and that is someones blood. She looks up at <b>you</b>...",
		event : {
			image: "vampire1a.jpg",
			title: "A Bloody Vampyre",
			text: "She speaks to you, \"You desire me, you want me\" and she speaks the truth, or is it she is making it true with her words...</p>" +
					"<p>\"Seek me out, I will give you such passion and pleasure as your blood feeds me and covers my body. You will die in exquisite pleasure...for me...and for you...\" Her words shock you in their callous passion, but also in how much you desire her and want to go to her. You are thankful you have no idea where she is, and yet you want to go to her..."
		}
	}
],
"mixed": [
	{
		image: "bimbo2a.jpg",
		title: "Kinky Blonde",
		text: "You see a lovely platinum haired woman in light bondage, more a submissive position that a bound one, blindfolded with wrist-cuffs. She says huskily \"Master do whatever you want to me\", and a male voice replies,</p>" +
				"<p>\"Quiet you bimbo slave, your mouth is for sucking cock, your breasts are for tit-fucking and that is all!\"</p>" +
				"<p>She nods her head, excited by this dominant play..."
	},
	{
		image: "bimbo2b.jpg",
		title: "Blonde Slave?",
		text: "Before you is a blonde woman, the willing submissive of the person you are looking at her through. She has a chain leash and large, probably fake breasts, not that that really matters here.</p>" +
				"<p>The woman picks up the chain and offers it to you, but as she does the vision starts to recede...</p>"
	},
	{
		image: "family2a.jpg,family2b.jpg,family2c.jpg",
		title: "Bound Family",
		text:	"Your vision is of two naked women, both in light bondage, and you have a complete certainty that they are mother and daughter. This certainty must be from the spell, but they do have a familiar likeness, and are very pretty!</p>" +
				"<p>You feel that they are here for you to play with, a game of dominaton, submission and taboo sex. You heartily wish you could play this game, but this is only a vision, a very tempting vision..."
	},
	{
		image: "family2d.jpg,family2e.jpg",
		title: "Bound Sisters",
		text:	"Your vision is of two naked young women, both gagged and bound. You have a complete certainty that they are sisters, this must be from the spell, but they do have a familiar likeness, and are very pretty!</p>" +
				"<p>You feel that they are here for you to play with, a game of domination, submission and taboo sex. You heartily wish you could play this game, but this is only a vision, a very tempting vision..."
	},
	{
		available: function() { return checkPersonFlag("Jade", 1); },
		image: "femdom2a.jpg",
		title: "Dominatrix and her Slave",
		text:	"A leather clad woman and a bound, naked man, a scene that cries out some domination and submission play. A dominatrix and her customer most likely, but for the brieft duration of the vision you cannot tell."
	},
	{
		image: "lesbian2a.gif",
		width: "med",
		title: "Dominant and Submissive Lesbian Play",
		text: "Two women in light bondage are being inspected by a latex-clad mistress wearing a large strap-on. A domination/submissive game between the ladies, all completely consensual, kinky and fun!"
	},
	{
		image: "lesbian2b.gif",
		width: "med",
		title: "Dominant Facesitting",
		text: "A woman is being licked by another, but in a dominant way, riding her face and working her hips. This is clearly one woman exerting some dominance over the other, power-play not anything more non-consensual."
	},	
	{
		image: "lesbian2c.jpg",
		title: "A Slave and her Mistress",
		text: "A woman in bondage, tied and gagged but looking surpisingly happy. Kneeling over her is another woman, her Mistress and clearly the person who tied her up. They are both looking at you, it seems they are either performing for another person, or someone who is witnessing their play.</p>" +
				"<p>Unfortunately you see little more as the vision starts to fade, just that they seem to be really, really enjoying themselves..."
	},
	{
		image: "pregnant2a.jpg,pregnant2b.jpg",
		title: "Pregnant Slave",
		text: "The woman you see is headily pregnant and is clearly the submissive 'slave' of someone, the bearer of her Masters child."
	}
],
"hard": [
	{
		image: "bimbo3a.jpg",
		title: "Bound Red-Headed Slave",
		text: "The woman before you is a slave, no doubt about that. She is bound with a ring-gag in her mouth, and her arms tied behind her back. She has red, probably dyed hair and large breasts and she is looking at you imploringly.</p>" +
				"<p>You think this is a sort of dominance and submission play, but then you hear a voice, \"Bimbo's are for fucking, especially red haired one's\". Maybe this is a game but their voice did not sound playful...</p>" 
	},
	{
		image: "family3a.gif",
		width: "large",
		title: "Sister Slaves",
		text:	"The two women you see are sisters, there is no doubt in your mind, or is it knowledge from the spell. No matter, they are sisters, bound together and being punished by their Master. Whipped as they kiss each other, both loving and hating what is happening to them.</p>" +
				"<p>You cannot help but feel jealous of what you are seeing, desiring to be in the place of their Master, or is it you want someone else in their place, a different sister..."
	},
	{
		available: function() { return checkPersonFlag("Jade", 1); },
		image: "femdom3a.jpg",
		title: "Dominatrix and her Slave",
		text:	"A naked woman and an imprisoned naked man, a scene that cries out some domination and submission play. A dominatrix and her customer most likely, but for the brieft duration of the vision you cannot tell."
	},
	{
		image: "pregnant3a.jpg",
		title: "Pregnant Slave",
		text: "The woman you see is heavily pregnany and bound and gagged. You get no impression this is a game or some kind, she is a slave, impregnated by her Master or captor. You have no idea where she is, possibly she is asian but that tells you little.</p>" +
				"<p>It does cross your mind, is what you are doing to your slaves any better...Yes, it is but..."
	}
]
};