// Mr Beasley Threesome with students 1

function ShowPlace74()
{
	var md = WritePlaceHeader();

	perBeasley.setFlag(3);
	perBeasley.place = 11;
	var bCharmed = perBeasley.isCharmedBy();

	perBeasley.showPerson("beasley2.jpg");
	addPlaceTitle(md, "Mr. Beasley\'s Office");

	if (bCharmed) {
		md.write(
			'<p>Your slave, Mr. Beasley has company. Two of your friends, the sisters Catherine and Amy, they look like they have fallen under a spell.</p>' +
			'<p>You quickly interrupt and Mr Beasley looks at you,</p>' +
			'<p>"New slaves for you ' + perYou.getMaster() + ', almost ready for my...your pleasure.</p>'
		);

		startQuestions();
		addLinkToPlaceC(md, '"What is happening here Mr. Beasley"', 76, 'type=freed');

	} else {

		// Amy Ross
		findPerson("AmyRoss").charmThem(4, "MrBeasley");
		// Catherine Ross
		findPerson("Catherine").charmThem(4, "MrBeasley");

		md.write(
			'<p>Mr. Beasley has company. Two of your friends, the sisters Catherine and Amy, have fallen under a spell. The girls are redefining the term "teacher\'s pet" as they lounge over your enemy.</p>' +
			'<p>The teacher turns to you. "So ' + perYou.getPersonName() + ', you have decided to return.'
		);

		if (isBeasleyServant()) md.write('I did promise you would regret it if you did so now you are going to become my slave. Dai Chu ' + perYou.getPersonName() + '!" he yells.</p>');
		else md.write(' Now you\'re going to regret ever finding this book. <i>Dai Chu ' + perYou.getPersonName() + '</i>!" he yells.</p>');

		if ((perYou.checkFlag(18) && nMana > 19) || perYourBody.FindItem(43) > 0 || perYourBody.FindItem(46) > 0) {
			if (perYourBody.FindItem(43) === 0 && perYourBody.FindItem(46) === 0) AddMana(-20);
			md.write('<p>For a moment you expect something to happen but everything is the same.  It appears that the spell has failed, but Mr. Beasley hasn\'t noticed.</p>');

			startQuestions();
			addLinkToPlaceC(md, "talk to Mr. Beasley", 75);
			addLinkToPlace(md, "exit the room", Place, '', 'You cannot abandon your friends, and Mr. Beasley has the Book!');
		} else {
			md.write(
				'<p>It looks like Mr Beasley has not wasted any time to put what he learned from the book to use. Catherine and Amy both greet you at his side as you enter the room, their clothes halfway torn off and their eyes filled with blissful devotion.</p>' +
				'<p>The two of them are redefining the term “Teachers Pet” right before your eyes as they lounge over your enemy, and worse: he was expecting you.</p>' +
				'<p>“Dai Chu, ' + perYou.getPersonName() + '!” He speaks the incantation before you are able to react, and you are filled with dread as the warm tingle of his mana begins to spread through your body.</p>'
			);
			startQuestions("You must");
			addLinkToPlace(md, "remove your clothes.", 973);
		}
	}

	WritePlaceFooter(md);
}