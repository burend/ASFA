// Place: History Classroom - search books
// Common books in the History Classroom

function ShowPlace27(stype)
{
	var md = WritePlaceHeader();

	// General search
	var perTitus = findPerson("MsTitus");
	var perAbby = findPerson("Abby");
	var perVamp = findPerson("Vampyre");
	var perMonique = findPerson("Monique");

	// Which general book is available?
	var nBook = 0;
	if (stype == "settlement") nBook = 1;
	else if (stype == "hidden") nBook = 2;
	else if (stype == "crypt") nBook = 3;
	else if (stype == "gem") nBook = 4;
	else if (stype == "greek") nBook = 5;
	else if (stype == "stears") nBook = 7;
	else if (stype == "rituals") nBook = 8;
	else if (stype == "bookhydromancy") nBook = 9;
	else if (stype == "bookpharma") nBook = 10;
	else if (stype == "bookwitches") nBook = 11;
	else if (!checkPlaceFlag("HistoryClassroom", 10) && !perYou.checkFlag(29) && isSpellKnown("Clairvoyance")) nBook = 9;
	else if ((perKurndorf.getQuestCrypt() === 17 || perYou.getQuestAftane() === 60) && (!isPlaceKnown("Crypt") && !checkPlaceFlag("Crypt", 2))) nBook = 3; //Kurndorf's Crypt
	else if (perAbby.getQuestDragonGem() === 0 && Math.random() < 0.6 && perYou.getExperience() > 0) nBook = 4;	//Dragon Gem
	else if (perTitus.other == 10 || !checkPlaceFlag("HistoryClassroom", 5)) nBook = 1;
	else if (!checkPlaceFlag("HistoryClassroom", 11) && perVamp.other >= 50) nBook = 10;
	else if (!checkPlaceFlag("HistoryClassroom", 6) && (perYou.FindItem(32) > 0 || perVamp.other >= 50)) nBook = 5;
	else if (!checkPlaceFlag("HistoryClassroom", 12) && checkPersonFlag("Jessica", 5)) nBook = 11;
	else if (isDemonFreed() && !checkPlaceFlag("HistoryClassroom", 7)) nBook = 6;
	else if (!checkPlaceFlag("HistoryClassroom", 9) && (isPlaceKnown("HotelCellar") || (!checkPlaceFlag("Hotel", 8) && perDavy.other >= 6))) nBook = 8;

	// The Book
	switch (nBook) {

	case 0:
		// Nothing in particular
		addPlaceTitle(md, 'History Books in the Bookcase', "books.jpg");
		md.write('<p>There are a number of books about history, but you can find nothing useful at the moment, ');
		switch(Math.floor(Math.random() * 6)) {
			case 0: md.write('you see the book "The Witch Cults of Glenvale" but you have read it before.'); break;
			case 1: md.write('you briefly look at a work "Fairy Magic" but it is little more than a collection of old tales of the faerie folk like the ballad of "Tam Lane" or that of "True Thomas".'); break;
			case 2: md.write('aside from works you have previously studied.'); break;
			case 3: md.write('you see a fictional novel accidentally on the shelf, "The Queen of Air and Fire" but it is a science-fiction story of aliens using psionics to assume the role of faerie folk.'); break;
			case 4: md.write('some works on early Chinese settlers in the Glenvale area.'); break;
			case 5: md.write('you see a book you have read a few times on ghost sightings in Glenvale.'); break;
		}
		md.write('</p><p>You should try again another time when you have a better idea what to look for or books have been returned.</p>');
		break;

	case 1:
		// The Settlement of Glenvale
		addPlaceTitle(md, 'History Book "The Settlement of Glenvale"', "books.jpg");
		setPlaceFlag("HistoryClassroom", 5);
		md.write(
			'<p>There are a number of books about history, one of which is titled, "The Settlement of Glenvale"</p>' +
			'<p>You sit down and read the story.</p>' +

			'<p><em>Glenvale was conquered in the same year that General Mitchell ' +
			'defeated the ' + (isBritish() ? 'Scots' : 'Spanish') + '. After the land was declared English soil, ' +
			'settlers arrived carrying their meager goods and tools to level ' +
			'and farm the fields. Times were tough for the settlers, who fought ' +
			'raids against the ' + (isBritish() ? 'Scots' : 'Spanish') + ', then later against a satanic cult. The ' +
			'first settlers survived these harsh conditions until the year ' +
			'1795, when something destroyed the settlement overnight.</p>' +

			'<p>The town remained vacant for thirty-two years before new settlers arrived. Whatever happened to those original townsfolk is a mystery.</em></p>'
		);

		// The stuck pages
		if (perTitus.other == 10)
		{
			perTitus.other = 11; //Have read of the history for her
			setPlaceFlag("HistoryClassroom", 1);  //open up the "extra pages" options
		}

		//  Checking to see if you have seen/read the extra pages
		if (checkPlaceFlag("HistoryClassroom", 3))
		{
			md.write('<p>The two formerly hidden pages still cling to each other, evidently unwilling to part company.');
		} else if (checkPlaceFlag("HistoryClassroom", 2)) {
			md.write('<p><b>You notice two pages of the book have stuck together from the damp.</b></p>');
		} else if (checkPlaceFlag("HistoryClassroom", 1))	{
			md.write('<p><b>For the first time you notice that two pages of the book seemed to be stuck together.</b></p>');
			setPlaceFlag("HistoryClassroom", 2);
			PlaceI(6, 27); // place a stone in the room
			md.write('<p>A rock falls from the top shelf. The stone looks kind of strange.</p>');
		}
		break;

	case 2:
		//  Hidden Pages - BOOK: The Settlement of Glenvale; hidden pages
		addPlaceTitle(md, 'History Book "The Settlement of Glenvale" Extra Pages', "books.jpg");
		setPlaceFlag("HistoryClassroom", 3); // Have Read the hidden pages
		if (!isPlaceKnown("SacredClearing")) setPlaceKnown("SacredClearing");	// Know about the Sacred Clearing
		if (!isPlaceKnown("Tunnel")) setPlaceKnown("Tunnel"); // Know about the Tunnel to the Sacred clearing

		md.write(
			'<p>There are a number of books about history, one of which is titled, "The Settlement of Glenvale"</p>' +
			'<p>By peeling apart the moldy pages you read,</p>' +

			'<p><i>Later a mansion was built over the site of the earlier ' +
			'settlers and a the old cellar tunnel was sealed.  Small stones ' +
			'were then placed to remember those ages. Some time later, the ' +
			'third mayor of Glenvale named the site the "Sacred Clearing", ' +
			'unwittingly sanctifying a space already steeped in power and mystery.</i></p>'
		);
		break;

	case 3:
		// The Death of Kurndorf.
		addPlaceTitle(md, 'History Book "The Death of Kurndorf"', "books.jpg");
		if (!checkPlaceFlag("Crypt", 2)) setPlaceFlag("Crypt", 2); // Can now dig for the crypt tablet puzzle in Wild Reaches, then enter crypt
		if (perKurndorf.getQuestCrypt() == 17) perKurndorf.setQuestCrypt(18); //Increment Bambi Path so that you've "read the book"

		md.write(
			'<p>There are a number of books about history, one of which is titled, "The Death of Kurndorf"</p>' +
			'<p>You sit down and read the story.</p>' +

			'<p><em>Kurndorf stood no more. Women, corrupted by his spirit, ' +
			'wailed at his passing - while others, now free of his spell, wept ' +
			'and railed at the heavens for forgiveness of the acts comitted ' +
			'while under his sway. And yet more looked around, suspicious that the ' +
			'monster might rise again to possess another. The sermon was brief, ' +
			'the clergy unwilling to give the devil within the coffin his last rites.</p>' +
			'<p>Upon the crypt the priests laid a tablet of strange ' +
			'scripture and then prayed over the crypt to seal the tomb. As the ' +
			'voices died and the prayer came to an end, the tablet shook in fierce anger.</em></p>' +

			'<p><em>It was deemed that no one should ever decipher that scripture ' +
			'nor move the tablet that imprisons Kurndorf\'s spirit in the most ' +
			'magical and wild of places, so far removed from what was left of their colony.</em></p>'
		);
		break;

	case 4:
		// The Gem of the Dragon
		addPlaceTitle(md, 'History Book "The Gem of the Dragon."', "books.jpg");
		if (perAbby.getQuestDragonGem() === 0) {
			perAbby.setQuestDragonGem(1);	// Have Heard of the Dragon Gem
			perYou.startQuest(3);
		}

		md.write(
			'<p>There are a number of books about history, one of which is titled, "The Gem of the Dragon"</p>' +

			'<p>You sit down and read the story, it is a long story of a hero Duncan fighting against ' +
			'an evil cult spreading darnkess and foul corruption. One section attracts your interest,</p>' +

			'<p><em>Learning of the evil, Duncan broke into that secret, cursed place and ' +
			'yanked the gem from the dragon\'s eye. We gaped in horror as the ' +
			'glow of the gem brightened in his hand. Wraiths appeared in the hateful mirrors but Duncan did not waver even though we ' +
			'could smell the stench of his burning flesh. He carried it out to ' +
			'the road, each step an agony, until he reached a vase. The searing ' +
			'gem stuck to his flesh as if it did not want to slide into that ' +
			'prison. With a cry to break the hardest soul, Duncan pushed the ' +
			'gem into the vase, taking strips of skin with it. He turned to ' +
			'us, looked down at his hands, then collapsed.</em></p>' +

			'<p><em>We have never forgotten that long day and we pray that ' +
			'nobody ever rediscovers the evil possible with the power of the gem. A sense of dread fills our ' +
			'hearts when we think about why there was only one gem there and what foulness has laid claim to it.</em></p>'
		);
		break;

	case 5:
		// Greek Mythology
		addPlaceTitle(md, 'History Book "Greek Mythology"', "booksgreek.jpg");
		setPlaceFlag("HistoryClassroom", 6);
		perVamp.setFlag(10);
		md.write(
			'<p>There are a number of books about history and mythology, one of which is titled, "Greek Mythology"</p>' +
			'<p>You sit down and read some of the legends, and you notice some previous student has marked parts of the text.</p>' +

			'<p><em>The Furies were from the <b>underworld</b> and the female spirits of justice and vengence, servants of Hades and Persephone.</p>' +
			'<p>They had many types depending on the crime being punished...</em> reading on one part leaps out <em>...the Arae were the bringers of curses and <b>magical bindings</b>.</p>' +
			'<p>The furies take the form of a harpy, a winged woman, usually ugly and shrill. Shrines and items dedicated to protect from them or appease them usually bear an image of a harpy.</em></p>' +
			'<p>The text referring to items has an arrow pointing to it in pen and the text <i>"where, where?"</i></p>' +

			'<p>Another part that is marked talks about the <b>Empusae spirits and servants of Hecate</b>, Goddess of Witches, Necromancy, Ghosts, and of crossroads and other passages. The Empusae are female spirits who stalk travellers and drink their blood and eat their flesh.</p>' +
			'<p>They have may things in common with the traditional vampire myths, protections include the sacred wood of the hawthorn tree and branches of holly and herbs like garlic.</p>' +
			'<p>You see the word "vampire" heavily underlined.</p>'
		);
		break;

	case 6:
		// Nothing in particular EXCEPT a missing book
		setPlaceFlag("HistoryClassroom", 7);
		addPlaceTitle(md, 'History Books in the Bookcase, Some Missing', "books.jpg");
		md.write(
			'<p>There are a number of books about history, but you can find nothing useful at the moment, you should try again another time when you have a better idea what to look for.</p>' +
			'<p>As you start to turn away you notice a gap in a shelf, a missing book. You look at a simple catalogue of the books in the bookcase, and you think it is the book "The Demons of Glenvale" but it is difficult to be sure. The catalogue is incomplete and there are books present here not in the catalogue.</p>'
		);
		break;

	case 7:
		// Letter from Mrs Stears
		AddImage("stears_letter.png");
		addPlaceTitle(md, 'Letter from Mrs Stears');
		md.write(
			'<p>It is a personal letter from the blacksmith\'s wife Mrs. Stears to the regional minister describing the chaos in the area during the apex of the Kurndorf cult</p>' +
			"<p>After the letter was received by the church, district officials were notified and within a month Carl Kurndorf " +
			"was killed by a lone gunman. There is no mention of who the gunman was or what happened to him. Many of the townfolk," +
			"including Mrs. Stears, were directed to the district asylum.</p>"
		);
		break;

	case 8:
		// Rituals at the Broken Inn
		setPlaceFlag("HistoryClassroom", 9);
		setPlaceFlag("Hotel", 8);
		addPlaceTitle(md, 'Rituals under the Broken Inn', "books.jpg");
		md.write(
			'<p>You come across a short document from an eye-witness to a ritual during the time of the Kurndorf cults.</p>' +
			'<p>It describes a blasphemous ritual intending to summon a demon held underneath the Broken Inn, either in a cave or maybe a basement of some sort. The ritual was unsuccessful but the eye-witness seems certain they have been successful in the past.</p>'
		);
		break;
		
	case 9:
		// Hydromancy
		setPlaceFlag("HistoryClassroom", 10);
		perYou.setFlag(29);
		addPlaceTitle(md, '"Following the Water"', "UI/books/hydromancybook.jpg");
		md.write(
			'<p>This book is about scrying using reflections in water or hydromancy, an art long practised thoughout history. Hydromancy can give visions of the past, present or future.</p>' +
			'<p>It talks about how you need to develop your natural <b>clairvoyant</b> abilities and while meditating on a reflective pool or large bowl of water you should concentrate and gather your <b>mana</b>. You will then get visions of other places and even other times. It mentions also that the nature of the visions are often random but relate to the mental state of the diviner and the location they attempt the ritual at. It also mentions how hydromancy is less of a strain than other forms of clairvoyance.</p>'
		);
		break;	
		
	case 10:
		// Pharmakopiea
		setPlaceFlag("HistoryClassroom", 11);
		addPlaceTitle(md, '"Pharmakopoeia"', "UI/books/herbbook.jpg");
		md.write(
			'<p>This book is about herb lore, most of it is about traditional curatives, treatments for illnesses and other domestic use of herbs. A significant part also discusses the use of herbs in wutch-craft, or other occult practises. There is a dry comment that this is to help identify the practitioners not as a guide for use, but that is unlikely given the details it goes into.</p>' +
			'<p>One part that attracts your interest is where it discusses vampires, and how the only certain way to lay one to rest is to put a stake of hawthorn wood through the heart of the fiend. It does dryly mention this is best done when they are sleeping in their grave.</p>'
		);
		break;	
		
	case 11:
		// Witches of Pennsylvania
		setPlaceFlag("HistoryClassroom", 12);
		addPlaceTitle(md, '"Witches of Pennsylvania"', "UI/books/witchbook.jpg");
		md.write(
			'<p><i>Since William Penn presided over the state\'s only official witch trial in 1684, witchcraft and folk magic have been a part of the history of the Keystone State. English and German settlers brought their beliefs in magic with them from the Old World--sometimes with dangerous consequences.</i></p?>' +
			'<p>This book goes in detail into the history of witches in the US state of Pennsylvania. An interesting historic piece but as you are not in Pennsylvania and more interested in the practise of witchcraft then the history.</p>'
		);
		break;	
	}

	 //  Extra point to insert more Mana Rocks - change variables as appropriate
	if (perYou.isQuestStarted(1) && perYourBody.FindItem(5) === 0 && nMana < 15 && whereItem(5) === 0)
	{
		if (isPlaceKnown("Museum") && !checkPlaceFlag("Museum", 2))
		{
			setPlaceFlag("Museum", 2);
			PlaceI(5, 27);
			md.write('<p>You notice that a stone is embedded into a bookend.</p>');
		} else if (checkPlaceFlag("Hotel", 4) && !checkPlaceFlag("Hotel", 5)) {
			PlaceI(5, 27);
			setPlaceFlag("Hotel", 5);
			md.write('<p>A rock falls from the top shelf. The stone looks kind of strange.</p>');
		}
	}

	// Questions
	startQuestions();
	if (nBook == 1) {
		if (checkPlaceFlag("HistoryClassroom", 1) || checkPlaceFlag("HistoryClassroom", 2) || checkPlaceFlag("HistoryClassroom", 3)) addLinkToPlaceO(md, "read the extra pages", 27, "type=hidden");
	}

	addLinkToPlaceO(md, "search the rest of the classroom", 10);
	addLinkToPlace(md, "exit the room?", 70);

	WritePlaceFooter(md);
}