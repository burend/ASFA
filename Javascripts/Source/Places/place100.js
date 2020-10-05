// Event: Town Hall meetings
// - eventa-eventn = with Mayor + Kristin

function ShowPlace100(stype)
{
	var td = '';
	if (stype.substr(0, 5) == "event") {
		if (((stype == "eventk" || stype == "eventl" || stype == "eventm") && !isExplicit()) || stype == "eventn" || stype == "eventd") td = 'td-left-large';
	}

	var md = WritePlaceHeader(false, td);

	var perAngela = findPerson("Angela");
	var clvA = perAngela.getCharmedLevel();
	var perKristin = findPerson("Kristin");
	var perMayor = findPerson("Mayor");
	var myName = perYou.getMaster();
	var myNameA = clvA == 4 ? myName : 'my Love';

	switch (stype) {

	case "eventa":

		// Just entered
		perKristin.showPerson("!kristinevent1.jpg");
		if (!perMayor.checkFlag(4)) {
			perYou.setFlag(9);
			perYou.setBankBalance(perYou.getBankBalance() + 100);
		}
		perMayor.setFlag(4);
		addPlaceTitle(md, "Town Hall Meeting");
		md.write(
			'<p>You quickly run trough the halls and floors up to the mayor’s office. You smile briefly at Angela’s salute and you enter the finely decorated office. Behind the desk sits Mayor Thomas as usual, but in front of her is none other than Kristin, the bank manager. She’s dressed in a completely different outfit she usually wears. It’s a simple butter colored garment with black stockings. Elegant yet free and natural, typical of Kristin! They were in a middle of a conversation when you barged in.</p>' +
			'<p>They both stand up and greet you in unison,</p>' +
			'<p>"Welcome, ' + myName + '! I’ve been waiting for you!", says Mayor Thomas excitedly as she removes a pair of glasses. You have never seen her wearing glasses before..<p>'
		);

		startQuestions();
		addLinkToPlaceC(md, '"Kristin! What is going here? Some kind of meeting I don’t know about?"', Place, 'type=eventc');
		addLinkToPlaceC(md, '"Beatrice what is it with the glasses?"', Place, 'type=eventb');
		break;

	case "eventb":

		// Glasses
		perKristin.showPerson("!kristinevent1.jpg");
		addPlaceTitle(md, "The Mayors Glasses");
		md.write(
			'<p>You ask Mayor Thomas about her glasses, and she smiles at you,</p>' +
			'<p>"I normally wear contacts ' + myName + ', but I lost one recently. Angela is arranging a replacement set for me, but for now I have to wear my glasses."</p>' +
			'<p>She leans over and softly says "Is that it..." and seems to look on the floor for her lost contact for a brief moment. As she does her short skit rides up and she adjusts her panties to completely expose herself to you. You realise she is just putting on a show for you, competing for your attention with Kristin.<p>'
		);

		startQuestions();
		addLinkToPlaceC(md, '"Kristin! What is going here? Some kind of meeting I don’t know about?"', Place, 'type=eventc');
		break;

	case "eventc":

		// Next
		perKristin.showPerson("!kristinevent1.jpg");
		addPlaceTitle(md, "Town Hall Meeting");
		md.write(
			'<p>You ask your slaves cockily what is happening, and Mayor Thomas responds,</p>' +
			'<p>"Don’t worry, ' + myName + '! We just talked about the future of the town now that you have brought Kristin under your control too!", the Mayor tries to soften you up, she still doesn’t know you are just acting.</p>' +
			'<p>You reply, "All right, share your thoughts with me! Kristin, with each new information the lovely Mayor gives me, you get rid of a single portion of your dress and orgasm each time."</p>' +
			'<p>Kristin replies, "Of course, my dear ' + myName + '!", she looks at the mayor, who’s a little bit confused.</p>' +
			'<p>You order Mayor Thomas, "Go ahead!"</p>' +
			'<p>She immediately resumes, "' + myName + ', Kristin and I have discussed that money won’t be a problem to you anymore. We will have a close relationship with each other and will monitor your financial things. Kristin has transferred some money into your account as a start.", pleads Beatrice, as if she’s in trouble. Well, she still thinks she has offended you by not telling you about her meeting with Kristin.</p>'
		);

		startQuestions();
		addLinkToPlaceC(md, '"Kristin, you know the drill..."', Place, 'type=eventd');
		break;

	case "eventd":

		// Next
		perKristin.showPerson("!kristinevent2.jpg");
		addPlaceTitle(md, "Town Hall Meeting");
		md.write(
			'<p>Kristin gets in position and seductively leans closer to you. She lets herself loose and like a wild animal, and is already on all fours, her firm bottock is pointing at your direction. She starts to finger herself.</p>' +
			'<p>Mayor Thomas continues, "Also, we have planned a collaboration where we would donate a large sum of money to your bank account through small, fake accounts and "charity profiles" so no one will notice a thing.", your puppet mayor keenly tries to impress you. Kristin on the other hand...</p>'
		);

		startQuestions();
		addLinkToPlaceC(md, '"Whoops, Kristin you are fast! "', Place, 'type=evente');
		break;

	case "evente":

		// Next
		perKristin.showPerson("!kristinevent3.jpg");
		addPlaceTitle(md, "Town Hall Meeting");
		md.write(
			'<p>Kristin heatedly gets rid of the top of her dress. She already had an orgasm, but she kept it quiet, what a nice slave she is! She did not want to disturb your conversation with the mayor.</p>' +
			'<p>Mayor Thomas continues, "We have also talked about a fundraiser or politically important event that could be financially backed by the bank where a lot of important people would attend. They would be in one place and with a tightened security force we could trap them and have them ready for you to enslave them."</p>'
		);

		startQuestions("You compliment the mayor’s cleverness");
		addLinkToPlaceC(md, '"Great idea! I love the way you think, my little slave!"', Place, 'type=eventf');
		break;

	case "eventf":

		// Next
		perKristin.showPerson("!kristinevent4.jpg");
		addPlaceTitle(md, "Town Hall Meeting");
		md.write(
			'<p>Miss Thomas flushes and timidly looks at you. Meanwhile Kristin is already on the floor, masturbating furiously and begging you to take her..</p>' +
			'<p>Mayor Thomas continues, "We tried our best and our main goal is to make you feel safe in this town and also help you any way we can with the town’s management. We want take off some of the weight from your shoulders, we understand how hard it is to rule over your kingdom.", Mayor Thomas is at a loss of words, she is still overwhelmed by your previous compliment.</p>'
		);

		startQuestions("You ask Mayor Thomas");
		addLinkToPlaceC(md, '"Kingdom?"', Place, 'type=eventg');
		break;

	case "eventg":

		// Next
		perKristin.showPerson("!kristinevent5.jpg");
		addPlaceTitle(md, "Town Hall Meeting");
		md.write(
			'<p>You ask Mayor Thomas, "Kingdom? Like in medieval times or something like that?", you glance curiously between the mayor who’s still sitting on the desk and Kristin who’s busy trying to be the best nude model for your viewing pleasure.</p>' +
			'<p>Mayor Thomas answers, "Yes ' + myName + ', after all, soon the whole town will be your people, your servants, your objects or whatever you like to call them…"</p>'
		);

		startQuestions("Kristin tells you...");
		addLinkToPlaceC(md, '"Or at least the women will be!"', Place, 'type=eventh');
		break;

	case "eventh":

		// Next
		perKristin.showPerson("!kristinevent6.jpg");
		addPlaceTitle(md, "Town Hall Meeting");
		md.write(
			'<p>Kristin interrupts the Mayor, "Or at least the women will be!", she says, winking at you, still in feeling the pleasures of orgasms, she steadidly fingers her pussy.</p>' +
			'<p>Mayor Thomas answers, "This town will be your flock, your herd of slaves who will live the rest of their lives by your command. We thought you are going to need some help organizing them.", your mayor tries to impress you with her soothing yet cool voice."</p>' +
			'<p>You reply, "Yes, you are right my dear and those ideas that you have told me are good!", you step closer to Kristin and cup her breasts. She’s still visibly quivers from those three consecutive orgasms she had. ' +
			'She kisses your finger and wipes the sweat from her face with one hand. Now, you got what you wanted, they told you all the things that interest you. It is time to resume your quest and let your slaves return to their work.</p>' +
			'<p>You tell them, "Alright, you two get to work already! I ain’t keeping you around to have sex with you all the time!", you laugh at your own joke. Both of them stand up, Kristin puts her clothes on while Miss Thomas waits, standing next to her, she fixes her hair and waits for your further commands. Kristin, still sweating, rapidly puts back her dress, her nylon stockings however has split during her sexual journey, and now there’s hole on her left side of the stockings After your two slaves stand in attention, ready for your next instructions, you give both of them a kiss on the cheek and...</p>'
		);

		startQuestions();
		addLinkToPlace(md, 'well, while the two are here...', Place, 'type=eventj');
		addLinkToPlace(md, 'call in Angela for a full meeting', Place, 'type=eventi');
		break;

	case "eventi":

		// Foursome
		AddImage("GenericSex/foursomea.jpg");
		addPlaceTitle(md, "Full Town Hall Meeting");
		md.write(
			'<p>You tell the Mayor to bring Angela in to join the meeting. Before Mayor Thomas can call out Angela steps into the office, she was clearlu evesdropping on the meeting.</p>' +
			'<p>"Yes ' + myNameA + ' how can I help you?"</p>' +
			'<p>Kristin tells her, "' + myName + ' is hot, I mean feeling ready from a little show I gave ' + perYou.getHimHer() + ', so we are going to do our best to please ' + perYou.getHimHer() + '"</p>' +
			'<p>You can see Mayor Thoma smile as she realises what is happening as well. All three of them seductively strip each other until they are ready for you...</p>' +
			'<p>Sometime later as you are all re-dressing, you remember the Kingdom discussion and have to think "It is good to be the ' + (perYou.isBornMale() ? 'King' : 'Queen') + '!"</p>'
		);

		startQuestions();
		addLinkToPlace(md, 'exit the Town Hall', 94);
		WritePlaceFooter(md);
		return;

	case "eventj":

		// Threesome 1
		perKristin.showPerson("!kristinevent7.jpg");
		addPlaceTitle(md, "Town Hall Meeting");
		md.write(
			'<p>You tell them, "Then again, I can spare some time for sex!".</p>' +
			'<p>Kristin is still a little tired from before but she still eagerly starts to strip again. Mayor Thomas steps over offering to help you out of your clothing. As she does Kristin starts to help her out of her clothing.</p>' +
			'<p>Naked they stand before you, and Mayor Thomas asks, "So who first ' + myName +'?"</p>'
		);

		startQuestions();
		if (perYou.isMaleSex()) {
			addLinkToPlace(md, 'Mayor Thomas', Place, 'type=eventk');
			addLinkToPlace(md, 'Kristin', Place, 'type=eventl');
		}
		addLinkToPlace(md, 'Neither, both at once', Place, 'type=eventm');
		WritePlaceFooter(md);
		return;

	case "eventk":

		// Threesome (Mayor focus)
		perKristin.showPersonRorX(!perYou.isMaleSex() ? "!kristinevent8g.jpg" : "!kristinevent8bb.jpg");
		addPlaceTitle(md, "Mayor Thomas and Kristin");
		md.write(
			'<p>You enjoy your slaves, paying particular attention to Mayor Thomas, but indulging in both of their bodies.</p>'
		);

		startQuestions();
		if (isExplicit() && perYou.isMaleSex()) addLinkToPlace(md, 'Finish!', Place, 'type=eventn');
		addLinkToPlace(md, 'dress and exit the Town Hall', 94);
		WritePlaceFooter(md);
		return;

	case "eventl":

		// Threesome (Kristin focus)
		perKristin.showPersonRorX(!perYou.isMaleSex() ? "!kristinevent8g.jpg" : "!kristinevent8ba.jpg");
		addPlaceTitle(md, "Kristin and Mayor Thomas");
		md.write(
			'<p>You enjoy your slaves, paying particular attention to Kristin, but indulging in both of their bodies.</p>'
		);

		startQuestions();
		if (isExplicit() && perYou.isMaleSex()) addLinkToPlace(md, 'Finish!', Place, 'type=eventn');
		addLinkToPlace(md, 'dress and exit the Town Hall', 94);
		WritePlaceFooter(md);
		return;

	case "eventm":

		// Threesome (Both)
		perKristin.showPersonRorX(!isExplicit() || !perYou.isMaleSex() ? "!kristinevent8g.jpg" : "!kristinevent8bc.jpg");
		addPlaceTitle(md, "Mayor Thomas and Kristin Together");
		md.write(
			'<p>You enjoy your slaves, indulging yourself equally with their bodies.</p>'
		);

		startQuestions();
		if (isExplicit() && perYou.isMaleSex()) addLinkToPlace(md, 'Finish!', Place, 'type=eventn');
		addLinkToPlace(md, 'dress and exit the Town Hall', 94);
		WritePlaceFooter(md);
		return;

	case "eventn":

		// Threesome After (Male only and Explicit only)
		perKristin.showPersonX("!kristinevent9.jpg");
		addPlaceTitle(md, "After the Town Hall Meeting");
		md.write(
			'<p>Sometime later as you look at your slaves covered in your cum, you remember the Kingdom discussion and have to think, "It is good to be the King!"</p>'
		);

		startQuestions();
		addLinkToPlace(md, 'dress and exit the Town Hall', 94);
		WritePlaceFooter(md);
		return;
	}

	// **********************************************************************************
	startQuestions();

	addLinkToPlace(md, 'exit the Town Hall', 94);

	if (stype.substr(0, 5) == "event") {
		AddRightColumnLarge(md);
		if (stype == "eventb") perMayor.showPerson("mayorevent2.jpg", "95%", "right");
		else perMayor.showPerson("mayorevent1.jpg", "95%", "right");
	}

	WritePlaceFooter(md);
}