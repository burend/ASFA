// Place: Your Living room

function ShowPlace374()
{
	var md;
		
	// Living Room
	var perTracy = findPerson("Tracy");
	var clvT = perTracy.getCharmedLevel("You");
	var plcTracy = perTracy.whereNow();
	var perVamp = findPerson("Vampyre");
	var bVampHere = perVamp.isHere();
	if (plcTracy == 374) {
		md = WritePlaceHeader();
		if (perTracy.isCharmedBy("You") > 0) 	perTracy.showPersonRandomDN("tracy5", isDay() ? 1 : 2);
		else perTracy.showPersonRandomDN("tracy1", 2);
		addPlaceTitle(md, "Tracy " + (bVampHere ? "and Lilith " : "") + "in the Living Room");
	} else if (perVamp.isHere()) {
		md = WritePlaceHeader();
		perVamp.showPersonRandom("lounge", 2);
		addPlaceTitle(md, "Lilith in the Living Room");
	} else {
		md = WritePlaceHeader(false, 'td-left-med');
		addPlaceTitle(md, "Your Living Room", 'livingroom8.jpg');
	}
	
	md.write(
		'<p>Your living room, fairly standard, the only notable thing is the large TV.</p>' +
		'<p>Tracy likes to hangout here in the evenings watching some videos or just playing games. Mom seldom comes in here, she has commented she does not care for watching TV.</p>'
	);
	if (bVampHere) {
		md.write('<p>Lilith is sitting on a plush chair in one corner of the room. She looks surprisingly relaxed');
		if (plcTracy == 374) {
			md.write(' and Tracy seems to get on well with her chatting away at time with Lilith. Well she talks and Lilith listens mostly.');
		}
		md.write('</p>');
	}

	startQuestions();
	
	if (bVampHere) addLinkToPlaceC(md, "talk to Lilith", Place,'type=chatvampyre');
	var img;
	var js = '';
	var msg = '';
	if (clvT > 0 && isCharmedBy("Mom") && !checkPersonFlag("Mom", 33) && plcTracy == 374) {
		img = findPerson("Mom").getImg("!momtv1.jpg");
		js = 'setPersonFlag("Mom",33)';
		msg = 'As you sit with Tracy to watch the video she tells you</p><p>"This is a video I found recently, I thought you might like it"<p><p>The video is of Mom with some woman you do not recognise! Tracy grins "Well I found it in her room..."';
	} else if (plcTracy == 374 && bVampHere && (!perVamp.checkFlag(30) || Math.random() < 0.2)) {
		img = perVamp.getImg(getImageO("movie", undefined, undefined, perVamp) + ".jpg");
		//img = perVamp.addPersonRandomString("movie");
		//img = perVamp.getImg(getImagePicked(img, "movie") + ".jpg");
		if (!perVamp.checkFlag(30)) {
			msg = 'Tracy puts a movie on and says to Lilith, "This is that movie I told you about. The actress looks just like you!"</p><p>She is quite right but she neglected to mention it is a porn movie!';
			js = 'setPersonFlag("Vampyre",30)';
		} else msg = 'Tracy puts a movie on and says to Lilith, "This is another movie with that actress!", and yes it is another porn movie!';
	} else if (clvT > 0 && plcTracy == 374) {
		if (perTracy.checkFlag(12) && (Math.random() < 0.2 || !perTracy.checkFlag(13))) {
			perTracy.setFlag(13);
			img = perTracy.getImg("poledanceb.mp4");
			msg = 'You kill some time watching a video with Tracy, and she suggests watching the video of her dance at the club.';
		} else {
			var ex = isExplicit() && Math.random() < 0.6;
			img = perTracy.getImg((ex ? "Explicit/" : "") + "tracytv" + Math.ceil(Math.random() * 5) + ".mp4");
			msg = 'You kill some time watching a video with Tracy, although you quickly see you are watching a show <b>of</b> Tracy. You look at her and she smiles cheekily.';
		}
	} else {
		img = "tv" + (plcTracy == 374 ? ("plain" + Math.ceil(Math.random() * oImages.fixed.tvplain)) : ("kink" + Math.ceil(Math.random() * oImages.fixed.tvkink))) + ".jpg";
		if (plcTracy != 374) {
			if (img.indexOf("tvkink1") != -1 || img.indexOf("tvkink2") != -1) msg = 'You spend some time catching up on the news on TV, although not the station you would watch with Mom around.';
			else msg = 'You spend some time watching a video, but not the sort you would watch with Mom around.';
		} else msg = 'You kill some time watching a TV show with Tracy';
	}
	addWatchTVLink(md, "watch some TV", "TV Time" + (plcTracy == 374 ? " with Tracy" : ""), msg,	img, js);

	// Common choices
	addLinkToPlace(md, 'walk to the kitchen', 45);
	addLinkToPlace(md, 'leave your house', 44);
	
	// Other people
	if (plcTracy == 374 && bVampHere) {
		AddPeopleColumn(md);
		perVamp.showPersonRandom("lounge", 2);
	}

	WritePlaceFooter(md);
}