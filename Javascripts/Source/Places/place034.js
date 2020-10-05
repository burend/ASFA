// Place: Meet Mrs Granger at the Wild Ranges

function ShowPlace34(type)
{
	var md = WritePlaceHeader();

	var perMG = findPerson("MrsGranger");
	var herName = perMG.getPersonName();
	var clv = perMG.getCharmedLevel();
	var sDH = clv == 1 ? "Dear" : "Hon";
	perMG.place = 177; // Send her home
	perMG.other = 2.2;

	// Image
	if (type == "bj") {
		if (isExplicit()) perMG.showPersonX(perYou.isMaleSex() ? "!grangerstones3b.jpg" : "!grangerstones3g.jpg");
		else perMG.showPerson("!grangerstones3.jpg");
	} else if (type == "reward") perMG.showPerson("!grangerstones2a.jpg");
	else if (type == "mind") perMG.showPerson("!grangerstones2b.jpg");
	else perMG.showPerson(clv == 1 ? "!grangerstones1b.jpg" : "!grangerstones1a.jpg");

	// *************************************************************************

	addPlaceTitle(md, herName + " Studying the Wild Ranges");

	if (type == "bj") {

		if (perYou.isMaleSex()) md.write('<p>You agree and she eagerly unzips your trousers and you quickly realise she is very, very skilled at this. You try to enjoy her skills but she is so very skilled and eager that you quickly fill her mouth with your cum. She swallows with no reservations and some pleasure.</p>');
		else md.write('<p>You agree and she eagerly unzips your pants and pulls them down and pushes your panties aside and you quickly realise she is not inexperiences at this. You are surprised by her skills and she is very eager. Her tongue and fingers quickly make you orgasm and she happily licks up all your juices</p>');
		md.write('<p>"Thanks ' + sDH + ', I should get back and run that analysis, if that is ok with you?"</p>');
		startQuestions();

	} else if (type == "reward") {

		md.write(
			'<p>You tell Mrs. Granger that you are pleased with her study here and that she deserves a reward. She looks eagerly at you, and you tell her to pleasure herself for both of your enjoyment.</p>' +
			'<p>She looks a little surprised, clearly expecting a more personal touch from you. Still, she eagerly touches herself and brings herself to a fast, intense orgasm.</p>' +
			'<p>"Thanks Hon, you must be feeling hot, why don&apos;t you let me take care of that?"</p>' +
			'<p>She licks her lips while kneeling in front of you.</p>'
		);
		startQuestions();
		addLinkToPlaceO(md, "let her pleasure you", 34, 'type=bj');

	} else if (type == "mind") {

		md.write(
			'<p>You ask what she is suggesting, but the way she is standing and touching herself it seems clear at least partly what she wants,</p>' +
			'"I know you and Kate and I do not get involved in her relationships...it is just dear that...you do find me attractive and as long as we never tell anyone else, and <i>never</i> tell Kate. We can..play here."</p>'
		);
		startQuestions();
		addLinkToPlaceC(md, '"I won\'t tell Kate"', 34, 'type=bj');

	} else {

		md.write('<p>You approach Mrs. Granger and you see she had just been starting to pack away some of her archaeology equipment when you arrived. ');
		if (clv == 1) md.write('She stands to greet you and you see she is dresses quite..simply. She happily says,');
		else md.write('As she sees you she stands and poses for you seductively. She eagerly says,');
		md.write(
			'</p><p>"' + sDH + ', it&apos;s wonderful to see you, I was just about finished here, maybe we can go back to my place and I can ' + (clv == 1 ? 'help you' : 'make you real happy') + '."</p>' +
			'<p>You ask about her findings and if she has found anything more about this place that has been the center of magic for the area. She looks a bit disappointed when you ignore her offer,</p>' +
			'<p>"This is an interesting site ' + sDH + ', but I need to do some computer analysis of the resistivity scans, it won&apos;t take long but I need access to the University computers from my home."</p>'
		);
		if (clv == 1) {
			md.write(
				'<p>Mrs. Granger looks around from side to side in a theatrical way,</p>' +
				'<p>"It is very private here, and there is no chance Kate might interrupt us, no matter what we do?"</p>'
			);
		} else md.write('<p>Maybe you can gruntle your slightly disgruntled servant, or you can just meet her back at her home later.</p>');
		startQuestions();
		if (clv == 1) addLinkToPlaceC(md, '"What did you have on your mind?"', 34, 'type=mind');
		else addLinkToPlaceO(md, "reward Mrs. Granger", 34, 'type=reward');
	}

	// Common choice
	addLinkToPlaceO(md, "let her return home?", 26);

	WritePlaceFooter(md);
}