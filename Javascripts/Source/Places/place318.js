// Place: Church Interior

function ShowPlace318(stype)
{
	var md = WritePlaceHeader();
	var perMS = findPerson("Daria");
	
	if (stype == "stopped") {
		// chalice
		//	 '<p>"And just what do you think you\'re doing, young ' + perYou.getManWoman() + '.  That is church property!  Would you like me to call the Police?" she demands, wrenching the chalice from your hands. "I suggest you leave!"</p>'
		// walk to x
		//  addComments('A strong willed older woman appears before you wagging her finger as if to wield a sword against you.  "And just where do you think <i>you\'re</i> going?" she asks.  "You have no business other than here in this place of God."</p>');

		var s = '';
		switch(getQueryParam("from")) {
			case "chalice":
				s = '<p>As you try to pick up the chalice you are interrupted by a voice,</p>' +
					'<p>"And just what do you think you\'re doing, young ' + perYou.getManWoman() + '.  That is church property!  Would you like me to call the Police?" she demands, wrenching the chalice from your hands. "I suggest you leave!"</p>';
					break;
			case "15102":
				//'go to the church courtyard'
				s = 'You walk towards the archway that leaves towards the churches courtyard, but you are interrupted by a voice and you see s strong willed older woman appears before you wagging her finger as if to wield a sword against you.</p>' +
					'<p>"And just where do you think <i>you\'re</i> going?" she asks.  "You have no business other than here in this place of God."</p>';
					break;
			case "15103":
				//'walk down the stairs in the back'
				s = 'You see some stairs leading into a cellar or something and walk towards them, but you are interrupted by a voice and you see s strong willed older woman appears before you wagging her finger as if to wield a sword against you.</p>' +
					'<p>"And just where do you think <i>you\'re</i> going?" she asks.  "You have no business other than here in this place of God."</p>';
					break;
			case "15104":
				//'walk down the hall to the cloisters'
				s = 'You see an archway leading into the churches cloisters and decide to explore, but you are interrupted by a voice and you see s strong willed older woman appears before you wagging her finger as if to wield a sword against you.</p>' +
					'<p>"And just where do you think <i>you\'re</i> going?" she asks.  "You have no business other than here in this place of God."</p>';
					break;
		}
		showPopupWindow("Mother Superior",
			perMS.addPersonString("mothersuperior1c.jpg", "height:max%", "right") +	s +
			"You recognise her as the Mother Superior, a figure of great power and authority, the Nun in charge of all the nuns here at this Church, and this particular person is a one of a kind woman. You can’t really tell her age due to the clothes she’s wearing hides 90 percent of her face and body. If you would have to guess though, she is around her late thirties or early forties. You know that she’s been the head of the local church for years now, but faith was never your thing so you always avoided this place.<br><br>" +
			"Apart from her title, you don’t even know her real name! She’s wearing the traditional nun’s uniform and she always wear a rosary or amulet around her neck. Though she’s mysterious and strong willed and would be extremely tough to crack her you cannot take your mind off her!<br><br>" +
			"Imagine; a loyal devotee through religion and a stalwart warrior to your cause. She could be your lieutenant or officer in your harem who would issue discipline and order between your girls while you are busy."
		);
		setQueryParams();
	}

	// Title
	addPlaceTitle(md, "Lady of Our Heavenly Father", "church2.jpg");

	// Description
	if (isCharmedBy("Desiree") && isCharmedBy("Daria") && isCharmedBy("Pamela")) {
		md.write(
			'<p>For all of its visible magnificence the church still seems almost completely empty. No visitors, no nuns to come across with. That’s Daria’s work as she dedicated this whole building to you and only you. She closed the gates to tourists, locals and anyone else who wanted to visit the church. Gone are Sunday’s masses or religious visitors who wish to pray. The church proper is completely yours to explore or just sit down and enjoy the silence and the place’s aura.</p>' +
			'<p>The immaculate sanctuary of your very own church where Mother Superior spends her time praying to you every hour. Your other household slaves, Pamela and Desiree come here often to join her daily routine.</p>'
		);
	} else md.write('<p>The immaculate sanctuary of the church.  The wooden pews are intricately carved and the stained glass windows present bright images that almost seem to come alive and step out before you.</p><p>For all of its visible magnificence the church still seems almost completely deserted; almost as if there were only ghosts left to care for such an amazing building.</p>');
	

	 // Mother Superior has appeared && you are NOT INVISIBLE && NOT POSSESSION
	 // && Mother Superior is NOT POISONED
	if ((checkPlaceFlag("Church", 5) || checkPlaceFlag("Church", 7)) && !isPossess("Daria") && !checkPersonFlag("Daria", 4)) {
		if (!isInvisible()) md.write('<p>You see Mother Superior glaring at you from the far corner of the room, her gaze virtually burning a hole in your chest.  You aren\'t going to get anywhere as long as she is watching.</p>');
		else md.write('<p>You see Mother Superior sitting in the far corner of the room, she is scanning the church for any impudent souls, like you...</p>');
	}

	// Choices
	//**********************************************************************
	startQuestions();

	// INVISIBILITY OR POSSESSION is cast **OR** Mother Superior has been Poisoned (so she won't stop you)
	addLinkToPlace(md, "sit on a pew for a while", '', '', 'You kill some time taking in the holy atmosphere in the churches quiet grandure', '', 'WaitHere(5);');
	if (isInvisible() || isPossess() || checkPersonFlag("Daria", 4) || checkPersonFlag("Daria", 4))
	{
		addLinkToPlace(md, 'go to the church courtyard', 319);
		addLinkToPlace(md, 'walk down the stairs in the back', 321);
		addLinkToPlace(md, 'walk down the hall to the cloisters', 406, '', isInvisible() ? 'Your invisibility fades as you cross the archway...' : '');
		
	} else {
		var id = checkPlaceFlag("Church", 7) ? -1 : 1;
		addQuestionCO(md, 'go to the church courtyard', "Daria", id * 15102);
		addQuestionCO(md, 'walk down the stairs in the back', "Daria", id * 15103);
		addQuestionCO(md, 'walk down the hall to the cloisters', "Daria", id * 15104);
	}

	if (!isPossess()) {
		//Possession is NOT CAST
		addLinkToPlace(md, 'leave the church', 317);
	}
	
	if ((checkPlaceFlag("Church", 5) || checkPlaceFlag("Church", 7)) && !isPossess("Daria") && !checkPersonFlag("Daria", 4)) {
		//MS stopped you and you're NOT INVISIBLE
		AddPeopleColumnMed(md);
		findPerson("Daria").showPerson(isInvisible() ? "mothersuperior1b.jpg" : "mothersuperior1a.jpg");
	}

	WritePlaceFooter(md);
}