// Place: Your Living room

function ShowPlace374()
{
	var md;
	
	if (perJesse.whereNow() == 6) {
		// Event: Jesse visiting to bargain for the relic
		md = WritePlaceHeader(false, perJesse.checkFlag(3) ? "" : "td-left-large");

		var myName = perYou.getPersonName();
		
		if (wherePerson("Miku") == 408) setPersonFlag("Miku", 24);

		// PICTURE REFERENCES
		if (perJesse.checkFlag(3)) perJesse.showPerson('jesse9.jpg');
		else perJesse.showPerson("jesse8.jpg");

		/* TITLE LINE */
		addPlaceTitle(md, "Your Visitor in the Living Room");

		/* Description */
		md.write('<p>When you enter your living room you know who is there before you even lay eyes on her.  Her <i>scent</i> gives her away.  You steel yourself against her influence as best you can as you enter.</p>');

		if (perJesse.getDemonPath() == 60) // Just walked in on her
		{
			perJesse.setDemonPath(61); //Advance Path
			md.write('<p>"Hello there, ' + myName + '.  May we speak for a moment?" she asks, her voice not quite as sultry as you seem to recall it usually was when she was trying to seduce you.</p>');
		}
		if (perJesse.checkFlag(3) && perJesse.getDemonPath() < 65)
		{
			md.write('<p>"Concerned for my little thrall\'s safety, ' + myName + '?" she asks.  "Why?  Have you changed your mind about me?  Do you want me?" she asks, as her strength of her scent almost triples in intensity, making your head swoon.  "Would you like to... Kiss me?" she asks, wetting her lips.</p>');
		}
		else if (perJesse.getDemonPath() == 70)
		{
			md.write(
				'<p>"I am here to declare a truce," she says.  "That is why I resisted the urge to enthrall your oh-so-tasty mother.  Her... <i>innocence</i> smells so sweet.  Not an easy thing to pass up."</p>' +
				'<p>The look on your face at her thinly veiled threat must have given her pause.  "I give you my word," she says in the most honest tone you have heard the creature use.  "As long as our truce lasts, I shall do no harm to your family.  I am a creature of habit,' + myName + ', and my word is binding."</p>'
			);
		}
		else if (perJesse.getDemonPath() == 75)
		{
			md.write(
				'<p>"There is a special...  locket.  That We need.  But it is guarded in a place that we can not go.  We need this locket.  Get it for Us and we will leave you and your town to its own devices."</p>' +
				'<p>"And in return, We will give you this," she says, brandishing a small old stone in her hand that looks very familiar.  "We know you want this...  Your type always wants this..." she says, instinctually lacing her voice with a hint of lust.</p>'
			);
		}

		/* Dialogue Options */
		//**********************************************************************
		startQuestions();

		if (!perJesse.checkFlag(3) && !perJesse.checkFlag(4) && perJesse.getDemonPath() < 65) addQuestionC(md, '"What happened to your pet?"', "Jesse", 1843);
		else if (!perJesse.checkFlag(4))
		{
			addLinkToPlace(md, 'Give in to temptation and <i>kiss</i> her', 995);
			addQuestionC(md, '"Shove off, <i>Legion</i>.  I will not fall for that trick."', "Jesse", 1844);
		}

		if (!perJesse.checkFlag(5) && perJesse.getDemonPath() < 65) {
			addQuestionC(md, '"What did you do to my Mother?"', "Jesse", 1845);
		}

		if (perJesse.getDemonPath() == 65) addQuestionC(md, '"Why are you here, <i>Legion</i>?"', "Jesse", 14465);
		else if (perJesse.getDemonPath() == 70) addQuestionC(md, '"Fine then.  What do you want for this truce?"', "Jesse", 14470);

		if (perJesse.checkFlag(8)) {
			// She wants to give you the stone
			addQuestionCO(md, 'Take the stone from her hand', "Jesse", 1848);
		}
		
	} else {
		
		// Living Room
		var perTracy = findPerson("Tracy");
		var clvT = perTracy.getCharmedLevel("You");
		var plcTracy = perTracy.whereNow();
		if (plcTracy == 374) {
			md = WritePlaceHeader();
			if (perTracy.isCharmedBy("You") > 0) 	perTracy.showPersonRandomDN("tracy5", isDay() ? 1 : 2);
			else perTracy.showPersonRandomDN("tracy1", 2);
			addPlaceTitle(md, "Tracy in the Living Room");
		} else {
			md = WritePlaceHeader(false, 'td-left-med');
			addPlaceTitle(md, "Your Living Room", 'livingroom8.jpg');
		}
		
		md.write(
			'<p>Your living room, fairly standard, the only notable thing is the large TV.</p>'
		);


		startQuestions();
		
		var img;
		var js = '';
		var msg = '';
		if (clvT > 0 && isCharmedBy("Mom") && !checkPersonFlag("Mom", 33) && plcTracy == 374) {
			img = findPerson("Mom").getImg("momtv1.mp4");
			js = 'setPersonFlag("Mom",33)';
			msg = 'As you sit with Tracy to watch the video she tells you</p><p>"This is a video I found recently, I thought you might like it"<p><p>The video is of Mom with some woman you do not recognise! Tracy grins "Well I found it in her room..."';
		} else if (clvT > 0 && plcTracy == 374) {
			if (perTracy.checkFlag(12) && (Math.random() < 0.2 || !perTracy.checkFlag(13))) {
				perTracy.setFlag(13);
				img = perTracy.getImg("poledanceb.mp4");
				msg = 'You kill some time watching a video with Tracy, and she suggests watching the video of her dance at the club.';
			} else {
				var ex = isExplicit() && Math.random() < 0.6;
				img = perTracy.getImg((ex ? "Explicit/" : "") + "tracytv" + Math.ceil(Math.random() * 4) + ".gif");
				msg = 'You kill some time watching a video with Tracy, although you quickly see you are watching a show <b>of</b> Tracy. You look at her and she smiles cheekily.';
			}
		} else {
			img = "tv" + (plcTracy == 374 ? ("plain" + Math.ceil(Math.random() * oImages.fixed.tvplain)) : ("kink" + Math.ceil(Math.random() * oImages.fixed.tvkink))) + ".jpg";
			if (plcTracy != 374) {
				if (img.indexOf("tvkink1") != -1 || img.indexOf("tvkink2") != -1) msg = 'You spend some time catching up on the news on TV, although not the station you would watch with Mom around.';
				else msg = 'You spend some time watcing a video, but not the sort you would watch with Mom around.';
			} else msg = 'You kill some time watching a TV show with Tracy';
		}
		addWatchTVLink(md, "watch some TV", "TV Time" + (plcTracy == 374 ? " with Tracy" : ""), msg,	img, js);
	}

	// Common choices
	addLinkToPlace(md, 'walk to the kitchen', 45);
	addLinkToPlace(md, 'leave your house', 44);

	WritePlaceFooter(md);
}