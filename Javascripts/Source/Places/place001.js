// Start of the game

// attribute: type
// "" 		= first screen
// "intro2"	= next screen

function ShowPlace1()
{
	var md = WritePlaceHeader(sType !== "", sType !== "" ? "" : "td-none");

	switch (sType) {

	case "":

		addPlaceTitle(md, "The Start of an Adventure", "", 0, true);
		if (isScreenSmall()) findPerson("AmyRoss").showPerson("amyhall.jpg");
		md.write(
			"<p style='clear:both'>You begin your adventure as a senior-year student from Glenvale Secondary, a school famous for its high academic achievers and its teachers\' poor sense of humour. " +
			"Every year at least one student graduates to go on to Harvard, Edinburgh or Oxford university. Expectations for staff and students are high and those who falter soon retire from the pressures of the county\'s finest educational institution.</p>" +
			"<p>You cringe a little as you walk down the school's main hallway. Your grades are borderline and several teachers are beginning to ask questions about your ability to make it through your final year.</p>" +
			'<p>"Hi ' + perYou.getPersonName() + '!"</p><p>Glancing up, your thoughts are interrupted and you see your good friend Amy. She is dressed in the optional school uniform, optional meaning that only a few of the more serious students, like Amy, choose to wear it. You and Amy exchange a few words, but you are clearly distracted and Amy does not want to be late for her part-time job at the Gym. She brightly waves goodbye and you part.</p>' +
			"<p>In your last class, Mr. Beasley, your history teacher, talked about the darker era of Glenvale: a time when the cult of Carl Kurndorf enticed, or as many rumors tell <i>enthralled</i>, many of the young townsfolk into performing unmentionable acts. The cult spread like wildfire among the community until regional officials stepped in. The police arrested Kurndorf but, due to " +
			"the lack of evidence and the uncommon generosity of Magistrate Anthony Melin, Kurndorf was released.</p>" +
			"<p>Chaos and calamity spread through the town amidst rumors of magic and debauchery. There were even rumors that Kurndorf possessed a book that enabled him to turn even his most critical foes to his side. Though few people nowadays believe in magic, you do. Stories from your family abound with tales of magic and the occult. The scattered descriptions of the book have led you to believe it could be the <i>Sacred Book of Control</i> the grimoire that is said to contain all the secrets of manipulating and controling the mind and even the body.</p>" +
			"<p>Mr Beasley has several times mentioned an extra-credit assignment on the Kurndorf happenings and especially on details of the <i>'Sacred Book of Control'</i>. <b>You've decided to check the History Classroom for some information</b>, given the selection of books about local history that can be found there.</p>"
		);

		startQuestions("You move on to the");
		addLinkToPlace(md, "History Classroom", 1, 'type=intro2', '', '', '', 'moveblock');

		if (!isScreenSmall()) {
			AddRightColumnLarge(md);
			findPerson("AmyRoss").showPerson("amyhall.jpg");
		}
		break;

	case "intro2":

		addPlaceTitle(md, "Who was that?", "", 0, true);
		perDavy.showPerson("davy0.jpg", "20%", "right");

		md.write(
			"<p><b>Bump,</b> lost in your own thoughts, you walk into another student, causing them to stumble forward a step, you apologise.</p>" +
			'<p>"Watch it, <b>asshole!</b>" they yell at you.</p>' +
			"<p>Recognising the voice, you glance up to see Davy Robbins looking at your with his patent-pending arrogant sneer. Not eliciting a response, he rolls his eyes and scoffs at you, then walks away with an equally arrogant swagger, shoving against your shoulder as he passes by you.</p>" +
			"<p>Earlier you overheard him bragging to some other students about his so-called 'conquest' of Kate Granger, <b>as if!</b> You recall a recent party you had gone to where you heard Kate mention some movie starring Bruce Lee and were able to strike up a conversation with her. After a few minutes of trading favorite scenes from old kung fu movies, you noticed you were being watched from the corner of the room by Davy. His older sister, Tina, seemed to have noticed him shadowing Kate as well and confronted him. While you couldn't hear what she said, Davy left the party in an indignant huff. Kate had meanwhile started speaking to some other friends and you lost the opportunity to get to know her better.</p>" +
			"<p style='margin-bottom:0px'>You feel something brush up against your leg, and spot an old piece of parchment resting against your shoe. Picking it up you find that you have found a document that had gone missing recently from the History Classroom. It is a personal letter from the blacksmith's wife Mrs. Stears to the regional minister describing the chaos in the area during the apex of the Kurndorf cult:</p>"
		);

		AddImage('stears_letter.png', '45%', 'center');
		md.write(
			"<p style='margin-top:-1em'>After the letter was received by the church, district officials were notified and within a month Carl Kurndorf " +
			"was killed by a lone gunman. There is no mention of who the gunman was or what happened to him. Many of the townfolk," +
			"including Mrs. Stears, were directed to the district asylum.</p>" +
			"<p>You try to catch-up with Davy but lose him outside the school, not far from your home. You are not sure what you wanted - accusing him of theft or asking where he got the letter; you decide that you must learn more about these strange events surrounding this mysterious figure known as Kurndorf. You also want to learn more about what he has to do with the Sacred Book of Control..</p>" +
			"<p>Everything you have learned so far has only caused your curiosity to grow more and more.</p>"
		);

		startQuestions("Some places to start your investigation are");
		addOptionLink(md, "back at School", "Place=9;showRightBar(-2);setTimeout('gotoPlace(9)')", 'moveblock');
		addOptionLink(md, "at the Glenvale Library", "Place=2;showRightBar(-2);setTimeout('gotoPlace(2)')", 'moveblock');

		md.write("<br>");
		break;

	}

	WritePlaceFooter(md); //, '', true, true, true);
	setTimeout('hideRightBar()', 10);
}