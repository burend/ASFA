// Event: Meet Kate Granger at the path in the Park

// You just leave her there but not pissed off (much)
function LeaveKate4(plc)
{
	var perKate = findPerson("Kate");
	if (perKate.place !== Place && Place != 4) return dispPlace(plc);

	perKate.other = 999;	// Remove Kate from Game, save the message about her mother of course
	perKate.place = 1000;		// Put her "Out and About"
	perKate.charmThem(4, "Davy");	// now charmed by Davy
	perKate.setFlag(4);		// pissed her off
	
	if (!perYou.isBornMale()) PlaceI(3, plc);  // put Kate's address in the park.
	else if (!checkPlaceFlag("Park", 3)) {
		// Puts a stone in the Wild Ranges
		setPlaceFlag("Park", 3);
		PlaceI(5, 26);
	}
	
	var s;
	if (plc != 63) s = '<p>As you leave, you see Kate ride off';
	else s = '<p>You just leave Kate, and you see she rides off when you ignore her';

	if (!perYou.isBornMale()) s += '. You notice a piece of paper slips out of her bag, an envelope addressed to her from the school, it has her home address on it.</p>';
	else s += '.</p>';
	s += '<p>As you leave you notice a kite stuck in a tree, some kid must have lost it recently.</p>';
	gotoPlace(plc, '', s);
}
	
// The actual meeting
function ShowPlace4(stype)
{
	var perKate = findPerson("Kate");
	var md = WritePlaceHeader(false, perKate.other == 3 ? "td-left-med" : "");

	if (perKate.other == 4) {
		// Offer to study with her (bonus image)
		perKate.showPerson("kate1d.jpg");
		
		addPlaceTitle(md, "Kate Granger Leaving");

		md.write(
			'<p>"Yes," replies Kate. "That sounds like a great idea. I\'ll meet you there, don\'t take too long!"</p>' +
			'<p>She suddenly cries out "Oww" and her hand grabs at her skirt giving you a glimpse of her panties. She smiles, a little embarrassed and says, "Sorry, just some insect, it\'s gone now" and she gets on her bike and rides off.</p>' +
			'<p>Your immediate thought was that you would have happily kissed the bite better, but you were not foolish enough to say it, even in jest. You remember how Kate has treated inappropriate flirting and has been known to slap or even hit those who will not take no for an answer.</p>'
		);
		if (perKate.place == 63) md.write('<p>As you follow her you notice a kite stuck in a tree, some kid must have lost it recently.</p>');
		
		startQuestions();
		if (perKate.place == 63) addLinkToPlace(md, "walk after Kate to the park pathway?", 63);
		else addLinkToPlace(md, "walk after Kate to the park entrance?", 47);
		
		perKate.place = 3; // Move Kate to the Library
		
	} else {
		// Rest of the encounter
		if (perKate.other < 1) perKate.showPerson("kate1a.jpg");
		else if (perKate.other == 1) perKate.showPerson("kate1b.jpg");
		else if (perKate.other == 3) perKate.showPerson("kate1c.jpg");
		
		addPlaceTitle(md, "Kate Granger");
		
		if (!perKate.checkFlag(25)) {
			showPopupWindow("Kate Granger",
				perKate.addPersonString("kate0.jpg", "height:max%", "right") +
				'The one and only Kate Granger is standing right in front of you. The cutest and prettiest girl you know! She’s the source of many school gossips, because she is the type of girl who is unreachable and untouchable by the normal guys. Rumours say that she still hasn’t dated anyone in school, but Davy says otherwise. He brags about Kate being his girl, but you would never believe him. She is just too good for him! You never asked Kate about this as she looses her temper at the smallest things and you don’t want to ruin your friendship with her.<br><br>' +
				'Her golden locks and green eyes are just simply amazing. Her petite curves and beautifully shaped, round tits are just enough to make you horny for her in an instant, not to mention that sly look she gives you. You know she’s out of your league, but you have to try! You gotta have her somehow!',
				"setPersonFlag('Kate',25)"
			);
		}
		
		md.write(
			'<p>Everyone says that Kate is the school nerd. She joined Glenvale High two years ago and, for a while, every guy tried to hit on her. ' +
			'Some rumors got around that she was available, and that jerk <b>Davy Robbins</b> claimed to have to have gotten ' +
			'into her ' + (isBritish() ? 'knickers' : 'pants') + '. That was before you knew her better and you cannot see how that could be true. Davy has always seemed to be a bit of a timid letch to you, then again he always got on well with Mr Beasley at school, as they say \'like is drawn to like\'.</p>' +
			'<p>Despite the rumours and what others think, she is okay if you speak to her the right way, a little aggressive, more likely to slap than yell. You have become friends with her, though you would like it to be more.</p>' +
			'<p>Kate almost collides with you as you greet her. She is in a hurry and doesn\'t have time to waste on idle chit chat. ' +
			'You wonder whether you should see her another time, when she is not in as much of a rush.</p>');

		if (perKate.other < 1) {
			md.write(
				'<p>"Hello ' + perYou.getPersonName() + '." She says and tries to get back on her bike. ' +
				'You prevent her from escaping and she humphs her annoyance.</p>');
		}

		startQuestions();

		if (perKate.other < 3) startAlternatives(md);
		if (perKate.other === 0) addQuestionC(md, 'ask Kate what\'s up', "Kate", 540);
		if (perKate.other < 1) addQuestionC(md, 'ask her why she\'s hurrying', "Kate", 5401);
		else if (perKate.other === 1) addQuestionC(md, 'tell Kate that you got an A+ in mathematics', "Kate", 541);
		if (perKate.other < 3)	{
			addQuestionC(md, 'insult her and ask her if she is Davy\'s bitch', "Kate", 5402);
			endAlternatives(md);
		} else if (perKate.other === 3) addOptionLinkC(md, "ask Kate to meet at you at the library", "setPersonOther('Kate', 4);dispPlace()");
		
		if (perKate.place == 63) addOptionLink(md, "go to the park pathway?", "LeaveKate4(63)");
		else  addOptionLink(md, "go to the park bridge?", "LeaveKate4(216)");
	}

	WritePlaceFooter(md);
}