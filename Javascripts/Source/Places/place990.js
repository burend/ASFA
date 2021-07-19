// Bad Ending - Davy charms female player

function ShowPlace990()
{
	var md = WritePlaceHeader(false, isExplicit() && stage == "end" ? "td-left-large" : "");

	var stage = getQueryParam("stage");
	if (perYou.folder.indexOf("Nobody") != -1) perDavy.showPerson("davy2.jpg");
	else if (stage === "") perYou.showPerson("charmedbydavy-start.jpg");
	else if (isExplicit() && stage == "end") {
		if (!perYou.isBornMale()) perYou.showPersonX("charmedbydavy-enslaved.jpg");
		else perYou.showPerson("charmedbydavy-enslaved.jpg");
	} else perYou.showPerson("charmedbydavy-resisting.jpg");

	if (stage === "") {
		addPlaceTitle(md, "Hotel Room 101");

		md.write('<p>Davy looks angry as you intrude on his activity. "You are really beginning to annoy me," he says, then you hear him whisper <i>"Dai Chu ' + perYou.getPersonName() + '"</i>.</p>');

		if (perYou.isBornMale()) {
			md.write('<p>"Congratulations ' + perYou.getPersonName() + '," he says, "You are are now my loyal slave."</p>');
			md.write('<p>"Hello," says Kate, smiling a welcome to you. "Have you come to join in the fun?"</p>');

			md.write('<p>A strange sensation comes over you, filling your loins with desire. Passion wells up, destroying your inhibitions, and you start to remove your clothes.</p>');

		} else {
			md.write('<p>"Congratulations ' + perYou.getPersonName() + '," he says, leering at your body. "You are are now my loyal slave."</p>');
			md.write('<p>"Hello," says Kate, smiling a welcome to you. "Have you come to join in the fun?"</p>');

			md.write('<p>A strange sensation comes over you, filling your loins and breasts with desire. Passion wells up, destroying your inhibitions, and you start to remove your clothes.</p>');
		}
		if (perYou.checkFlag(18) && nMana > 19) md.write('<p>Groggily you can feel how all this is wrong, as the magic in you and the spell conflict with each other.</p>');
		else perYou.charmThem(4, "Davy");
		startQuestions('You must:');
		if (perYou.checkFlag(18) && nMana > 19) addLinkToPlaceO(md, "no!, try to fight the spell", 990, 'stage=resist');
		addLinkToPlaceO(md, "remove all your clothes.", 990, 'stage=end');

	} else if (stage === "resist") {
		AddMana(-20);
		addPlaceTitle(md, "Resisting Davy\'s Spell");
		md.write('<p>The mana in you surges as you struggle to resist the spell. You suddenly feel the spell vanish and your mana is drained by the struggle.</p>');
		md.write('<p>Davy has not noticed as he continues to fuck Kate...</p>');
		startQuestions();
		addLinkToPlace(md, "go back to the bar", 124);

	} else {
		perYou.setFlag(31);
		addPlaceTitle(md, "Davy\'s Loyal Slave");

		if (perYou.isBornMale()) {
			md.write(
				'<p>“Stop resisting already!” Davy shouts with an irritated voice when he catches your attempt to fight his spell, and the force behind his command causes your concentration to slip.</p>' +
				'<p>“Do you think that you are able to withstand my power? Do you really believe that you are my rival? My equal? You are nothing!”</p>' +
				'<p>The words crash into your mind like a train and shatter your last resistance.</p>' +
				'<p>“You are an amateur playing with forces you don\'t even understand, the pure idea that you might be on my level is a joke!”</p>' +
				'<p>You can practically feel your mind changing with every word as your confidence drains away, and of course, he is right... How could a lowly novice warlock like you even hope to stand up to one as powerful as him?</p>' +
				'<p>You fall to your knees as the realization hits you: It is just as he says.</p>' +
				'<p>Davy is leagues above you. A warlock of an ancient bloodline with power you could never even dream to achieve, smart, experienced and so very handsome...</p>' +
				'<p>How could you not see sooner that you should have wanted nothing more than to serve this wonderful man? How could you oppose him like this?</p>' +
				'<p>At least Davy seems to be able to relax now that you are groveling before him and no longer a threat, and you gaze at him with adoration as he grasps Kate\'s hair and drags her in front of you.</p>' +
				'<p>“This is why you were here right? To steal my bitch.” He chuckles coldly.” As if you even could!”</p>' +
				'<p>He pushes Kate\'s head to the ground right in front of your crotch, moves behind her, and without a second of delay pushes his cock into her pussy.</p>' +
				'<p>“You love hat, right, bitch?” He begins to harshly rock his hip forward and once again takes a hold of her hair. “Tell him!”</p>' +
				'<p>Kate looks at you with glassy eyes as he pulls her head back to align with yours, her face a grimace of pain and lust while your former enemy pounds into her right in front of you.</p>' +
				'<p>“Yes, Davy! I love it, ' + perYou.getPersonName() + '! I love it when he fucks my pussy! I love being his horny bitch!”</p>' +
				'<p>She almost screams the words out in pure lust, panting and moaning heavily every time Davy\'s hip collides with her rear while you watch the two. The woman you wanted, the one you thought you loved has been claimed by a superior warlock, and you can only watch as he satisfies her in ways you never could.</p>' +
				'<p>Never in your life have you felt this mortified.... and this aroused... Kate will never be yours now, but at least you are allowed to watch as Davy, your new Master, fucks her in front of you, again and again...</p>'
			);
		} else {
			md.write(
				'<p>“Stop resisting already!” Davy shouts with an irritated voice when he catches your attempt to fight his spell, and the force behind his command causes your concentration to slip.</p>' +
				'<p>“Do you think that you are able to withstand my power? Do you really believe that you are my rival? My equal?”</p>' +
				'<p>Davy\'s voice is shaking as he angrily pushes Kate off his lap, and despite your best attempts to fight back the desire building within you, your body betrays you.</p>' +
				'<p>“You are nothing, ' + perYou.getPersonName() + '!”</p>' +
				'<p>You tremble as he speaks your name, and when you try to back away from him, you lose your balance and fall flat on your rear.</p>' +
				'<p>“You are not even worth being my slave, you will be a toy for me to stick my cock into!”</p>' +
				'<p>His words hammer into your mind, and while you desperately try to push him away, you find you lack the strength, well, more of the will to do so.</p>' +
				'<p>“Not even able to struggle? Good.” He takes a hold of your hair, and despite your feeble attempts to suppress his influence, you find your heart racing faster the moment he pushes your face against his cock.</p>' +
				'<p>“Now, open your whoremouth and savor this, bitch, because it is the closest you will ever get to tasting Kate\'s pussy!”</p>' +
				'<p>Everything in you just screams to clamp your teeth shut, but of course you don\'t. Your lips open wide without even taking a moment to think about it and your tongue rolls out in anticipation for what is to come next, and Davy doesn\'t even wait a second before he roughly forces himself into your mouth.</p>' +
				'<p>“Finally...” Davy\'s voice relaxes a little, and you gag as the tip of his cock pushes against your throat and the grip around your hair tightened to keep your head in place. “I wanted to do this ever since that party where you tried to steal Kate from me.”</p>' +
				'<p>Your head begins to spin from the lack of oxygen, leaving you all the more suggestible to his orders. “You like that, cockslut? I know you do!” He forces his Tip into your throat and your lips wrap around the base of his cock. “You will crave having my cock in your holes, it will be all you live for, and you only get it when you are nice and obedient.”</p>' +
				'<p>Your mind absorbs every single word as the spell claims you fully and a new truth begins to take root: Davy is right. He has defeated you fair and square and the least you can do is to gracefully bow to the superior warlock and let him fuck your mouth, ass and pussy whenever he wants to.</p>' +
				'<p>Your new master is very rough when he finally begins to move his hip, but you can\'t really blame him after all you have put him through. He holds your head in place, just rams his cock into your mouth over and over, and what began as painful and uncomfortable, even nauseating at first, quickly changes with every stroke.</p>' +
				'<p>Your head is still spinning and tears have started to well in your eyes, and yet you are happy. Davy, the most powerful warlock of Glenvale is using your mouth for his pleasure and deep down you know that this is all you ever wanted.</p>' +
				'<p>You brace yourself as you notice his impeding climax, and when he finally pulls out and your face is hit by a load of salty cum... you know that this is the happiest day in your life.</p>'
			);
		}
		addRestartLink(md);
	}
	WritePlaceFooter(md);
}